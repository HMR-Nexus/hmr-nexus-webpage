#!/bin/bash
# Deploy nexus-production to Netlify
set -e

echo "[BUILD] Running production build..."
npm run build

echo "[DEPLOY] Pushing to Netlify..."
netlify deploy --prod --dir=dist

echo "[DONE] Live at https://hmr-nexus.com"
