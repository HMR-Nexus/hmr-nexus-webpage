#!/bin/bash
# Deploy nexus-production to Netlify
set -e

echo "[BUILD] Running production build..."
npm run build

echo "[DEPLOY] Pushing to Netlify..."
if command -v netlify >/dev/null 2>&1; then
  netlify deploy --prod --dir=dist
else
  npx netlify-cli deploy --prod --dir=dist
fi

echo "[DONE] Live at https://hmr-nexus.com"
