#!/usr/bin/env bash
set -euo pipefail

cd /app

if [ ! -d node_modules/next ]; then
  echo "[entrypoint] Installing npm dependencies..."
  npm install
fi

echo "[entrypoint] Starting: $*"
exec "$@"
