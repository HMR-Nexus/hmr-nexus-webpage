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
- **Local:** `~/Dev/hmr-nexus-webpage/`
- **GitHub:** jarl9801/hmr-nexus-webpage (public)
- **Live:** https://voluble-gumdrop-d9c57f.netlify.app
- **Domain:** hmr-nexus.com

### Deploy Process (⚠️ NOT direct from this repo)
```bash
cd ~/Dev/hmr-nexus-webpage
npm run build
# Copy build output to nexus-production
cp -r dist/* ~/Dev/nexus-production/
cd ~/Dev/nexus-production
git add -A && git commit -m "deploy" && git push
# Netlify auto-deploys from nexus-production repo
```

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
