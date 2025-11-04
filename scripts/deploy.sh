#!/usr/bin/env bash

set -euo pipefail

# Chemin absolu de la racine du projet (scripts/..).
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "Installing dependencies..."
npm ci

echo "Building production bundle..."
npm run build

echo "Keeping development dependencies for now (adjust if needed)."
# Pour ne conserver que les dépendances de prod après le build :
# npm prune --omit=dev

if command -v pm2 >/dev/null 2>&1; then
  PM2_PROCESS_NAME="${PM2_PROCESS_NAME:-portfolio}"
  if pm2 describe "$PM2_PROCESS_NAME" >/dev/null 2>&1; then
    echo "Restarting pm2 process '${PM2_PROCESS_NAME}'."
    pm2 restart "$PM2_PROCESS_NAME"
  else
    echo "Starting pm2 process '${PM2_PROCESS_NAME}'."
    pm2 start npm --name "$PM2_PROCESS_NAME" -- start
  fi
else
  echo "pm2 not found. Start the app manually with 'npm run start'."
fi

echo "Deployment steps completed."
