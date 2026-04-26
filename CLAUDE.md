# CLAUDE.md — Nexus Engineering GmbH Website

## What Is This?
Marketing website for **Nexus Engineering GmbH** — fiber infrastructure + software/AI company.
React 19 + Vite + Tailwind + i18n (ES/EN/DE).

## Quick Start
```bash
cd ~/Dev/hmr-nexus-webpage
npm run dev          # localhost:5173
npm run build        # build to dist/
```

## Repo & Deploy
- **Local:** `~/Dev/hmr-nexus-webpage/` (and a sibling clone at `~/Dev/nexus-production/` of the same remote, used for deploys)
- **GitHub:** HMR-Nexus/hmr-nexus-webpage (public)
- **Live:** https://hmr-nexus.com (also https://voluble-gumdrop-d9c57f.netlify.app)
- **Domain:** hmr-nexus.com (custom domain on Netlify)

### Deploy Process
The Netlify site is deployed via the `netlify-cli`, NOT auto-deployed from GitHub. Both `~/Dev/hmr-nexus-webpage/` and `~/Dev/nexus-production/` are clones of the same remote — deploys happen from `nexus-production` because that's where `deploy.sh` lives.

```bash
# 1. Push your work to GitHub from hmr-nexus-webpage (your dev clone)
cd ~/Dev/hmr-nexus-webpage
git push origin main

# 2. Sync the deploy clone and run the deploy script
cd ~/Dev/nexus-production
git pull origin main
./deploy.sh    # = npm run build && netlify deploy --prod --dir=dist
```

If `netlify` is not in PATH: `npx --package netlify-cli netlify deploy --prod --dir=dist`.

> ⚠️ Older docs say to `cp -r dist/* ~/Dev/nexus-production/` and git push — that flow is OBSOLETE. Don't do that; you'll commit build artifacts on top of source.

## Key Files
- `src/App.tsx` — Main app
- `src/sections/` — Page sections
- `src/i18n/` — Translations (ES/EN/DE)
- `src/components/` — Shared components

## Chat Widget
Connects to Nexus bot API:
- **URL:** https://hmr-nexus-bot-production.up.railway.app
- **Bot:** @NexusEngineeringBot (Telegram)
- **Engine:** Groq llama-3.3-70b-versatile
