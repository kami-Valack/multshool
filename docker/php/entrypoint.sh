#!/usr/bin/env bash
set -euo pipefail

cd /var/www/html

echo "[entrypoint] Waiting for MySQL at ${DB_HOST:-mysql}:${DB_PORT:-3306}..."
until mysqladmin ping \
  -h"${DB_HOST:-mysql}" \
  -P"${DB_PORT:-3306}" \
  -u"${DB_USERNAME:-multshool}" \
  -p"${DB_PASSWORD:-multshool}" \
  --silent 2>/dev/null; do
  sleep 2
done
echo "[entrypoint] MySQL is ready."

if [ ! -f vendor/autoload.php ]; then
  echo "[entrypoint] Installing Composer dependencies..."
  composer install --no-interaction --prefer-dist --optimize-autoloader
fi

mkdir -p storage/framework/{cache,sessions,views} storage/logs bootstrap/cache
chmod -R ug+rwx storage bootstrap/cache || true

if [ -z "${APP_KEY:-}" ]; then
  if ! grep -qE '^APP_KEY=base64:.+' .env 2>/dev/null; then
    echo "[entrypoint] Generating APP_KEY..."
    php artisan key:generate --force --no-interaction || true
  fi
fi

if [ "${SKIP_MIGRATE:-0}" != "1" ]; then
  php artisan config:clear --no-interaction || true
  php artisan route:clear --no-interaction || true
  php artisan view:clear --no-interaction || true

  echo "[entrypoint] Running migrations..."
  php artisan migrate --force --no-interaction || {
    echo "[entrypoint] WARNING: migrate failed (retrying once)..."
    sleep 3
    php artisan migrate --force --no-interaction || true
  }
else
  echo "[entrypoint] SKIP_MIGRATE=1 — skipping migrations."
fi

echo "[entrypoint] Starting: $*"
exec "$@"
