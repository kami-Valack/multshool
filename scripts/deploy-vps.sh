#!/usr/bin/env bash
# Deploy Multshool stack to VPS and run a smoke check.
# Usage:
#   ./scripts/deploy-vps.sh ubuntu@18.205.17.161 /Users/valack/Downloads/ms-academy-system-key.pem
set -euo pipefail

REMOTE="${1:-ubuntu@18.205.17.161}"
KEY="${2:-$HOME/Downloads/ms-academy-system-key.pem}"
REMOTE_DIR="${3:-/home/ubuntu/multshool}"
PUBLIC_HOST="${PUBLIC_HOST:-${REMOTE#*@}}"

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [ ! -f "$KEY" ]; then
  echo "SSH key not found: $KEY" >&2
  exit 1
fi
chmod 400 "$KEY" 2>/dev/null || true

SSH=(ssh -i "$KEY" -o StrictHostKeyChecking=accept-new -o IdentitiesOnly=yes)

echo "==> Syncing project to $REMOTE:$REMOTE_DIR"
"${SSH[@]}" "$REMOTE" "mkdir -p '$REMOTE_DIR'"
rsync -az --delete \
  --exclude '.git' \
  --exclude 'node_modules' \
  --exclude '*/node_modules' \
  --exclude 'vendor' \
  --exclude '*/vendor' \
  --exclude '.next' \
  --exclude '*/.next' \
  --exclude '__pycache__' \
  -e "ssh -i $KEY -o StrictHostKeyChecking=accept-new -o IdentitiesOnly=yes" \
  "$ROOT/" "$REMOTE:$REMOTE_DIR/"

echo "==> Preparing .env + docker compose on VPS (PUBLIC_HOST=$PUBLIC_HOST)"
"${SSH[@]}" "$REMOTE" "PUBLIC_HOST='$PUBLIC_HOST' REMOTE_DIR='$REMOTE_DIR' bash -s" <<'EOF'
set -euo pipefail
cd "$REMOTE_DIR"

if [ ! -f .env ]; then
  cp .env.example .env
fi

# Force browser-facing URLs to the VPS public host
sed -i.bak \
  -e "s|^PUBLIC_HOST=.*|PUBLIC_HOST=$PUBLIC_HOST|" \
  -e "s|^NEXT_PUBLIC_USERS_API_URL=.*|NEXT_PUBLIC_USERS_API_URL=http://$PUBLIC_HOST:8000/api|" \
  -e "s|^NEXT_PUBLIC_STUDENT_API_URL=.*|NEXT_PUBLIC_STUDENT_API_URL=http://$PUBLIC_HOST:8001/api|" \
  -e "s|^NEXT_PUBLIC_SCHOOL_API_URL=.*|NEXT_PUBLIC_SCHOOL_API_URL=http://$PUBLIC_HOST:8003/api|" \
  -e "s|^NEXT_PUBLIC_ADMIN_API_URL=.*|NEXT_PUBLIC_ADMIN_API_URL=http://$PUBLIC_HOST:8002/api|" \
  -e "s|^NEXT_PUBLIC_BILLING_API_URL=.*|NEXT_PUBLIC_BILLING_API_URL=http://$PUBLIC_HOST:8004/api|" \
  .env || true

# Ensure PUBLIC_HOST line exists
grep -q '^PUBLIC_HOST=' .env || echo "PUBLIC_HOST=$PUBLIC_HOST" >> .env

if ! command -v docker >/dev/null 2>&1; then
  echo 'Docker not found — installing...'
  curl -fsSL https://get.docker.com | sudo sh
  sudo usermod -aG docker ubuntu || true
fi
sudo systemctl enable --now docker || true

echo '==> docker compose up --build -d'
cd "$REMOTE_DIR"
sudo docker compose up --build -d

echo '==> Waiting for Users API...'
for i in $(seq 1 90); do
  if curl -sf "http://127.0.0.1:8000/api/documentation" >/dev/null 2>&1; then
    echo "Users API ready after ${i} attempts"
    break
  fi
  sleep 5
done

echo '==> Smoke checks'
for url in \
  http://127.0.0.1:8000/api/documentation \
  http://127.0.0.1:8001/api/documentation \
  http://127.0.0.1:8002/api/documentation \
  http://127.0.0.1:8003/api/documentation \
  http://127.0.0.1:3000 \
  http://127.0.0.1:3001 \
  http://127.0.0.1:8080/painel_admin.html
do
  code=$(curl -s -o /dev/null -w '%{http_code}' "$url" || true)
  echo "$code  $url"
done

sudo docker compose ps
EOF

echo "==> Done. Frontends: http://$PUBLIC_HOST:3000 and http://$PUBLIC_HOST:3001"
