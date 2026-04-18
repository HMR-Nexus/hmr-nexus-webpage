# HMR Nexus Webpage — Rebrand Log

## v1.0.0 — NEXUS Brand System (Apr 2026)

**Full rebrand from "Nothing-inspired dark mode" to NEXUS Brand System v1.**
Based on the brand guidelines authored in Claude Design (`Brand Guidelines.html`, `src/*.jsx`).

### Principles
- **Direct. Technical. Calm. Understated. Self-aware.**
- Composition: **70 % ink · 25 % paper · 5 % laser**
- "Say less. Mean more."

### Palette
| Token | Hex | Use |
|---|---|---|
| `ink` | `#0A0B0D` | 70 % of any composition — surfaces, text |
| `graphite` | `#1A1C20` | Elevated surfaces on dark |
| `paper` | `#F5F3EE` | 25 % — primary light surface, body type |
| `bone` | `#EAE6DC` | Subtle surface / dividers |
| `mist` | `#9A9A94` | Secondary text · captions |
| `laser` | `#C6FF3D` | 5 % accent — the pulse. Never body. |
| `signal.*` | green / amber / red | Functional UI status ONLY — never brand/marketing |

### Typography
- **Display** — Space Grotesk (300 / 400 / 500 / 700), tracking down to `-0.055em` at D1
- **Text** — Inter (15 / 1.55)
- **Mono** — JetBrains Mono (11 / 0.08em tracking for tags, 0.14em for labels)

### Phases

**Phase 1 — Foundation** (commit 255707c)
- Tailwind config: full palette swap, type scale (`d1/d2/h1/h2/h3/body-lg/body/caption/mono-label`), letter-spacing tokens, `bg-laser`, `text-paper`, etc.
- CSS: new `:root` tokens (`--ink/--paper/--laser/--rule/--f-display/--f-mono/--f-text`) + utilities `.mono-tag`, `.mono-label`, `.section-head`, `.dot-accent`, `.rule-top/bottom`.
- Legacy `nd-*` + `nexus-blue` tokens remapped to brand colors so transitional components don't break.
- Google Fonts: Doto + Space Mono → Space Grotesk + Inter + JetBrains Mono.
- Favicon regenerated on ink with laser mark.
- Rewrite: `Navbar`, `Hero`, `Footer`.

**Phase 2 — Sections** (commit e0191bc)
- `Services` — two disciplines (01.1 Fibre, 01.2 Software), numbered items, mono-label.
- `Products` — featured hero + 3 satellite cards. Laser = live, amber = beta, grey = roadmap.
- `Portfolio` — case-file cards (`CASE · 001 · NE3`), giant hero metric, pulse dot for active.
- `Stats` — 4-col metric rail with ruled borders, mono unit labels.
- `TeamSection` — huge laser initials, editorial role labels, experience chips.
- `Contact` — section-head + brief card, laser CTA, inline `[SENT] / [ERROR]` tags.
- `TrustBanner` — mono rail with credentials label + separator dots. No icons.
- `Values` — inline principles rail: `PRINCIPLES · 01 Quality · 02 Innovation · 03 Service`.
- `LiveGrid`, `MouseGlow`, `DualMap` — legacy `#0066ff` blue remapped to laser `#C6FF3D`.

**Phase 3 — Identity & content**
- New `NexusLockup` React component (symbol + wordmark + super) from `marks.jsx` spec.
  - `NexusSymbol` — geometric crosshair + inner dot.
  - `NexusWordmark` — NEXUS in Space Grotesk 500 with `-0.05em` tracking, HMR · ENGINEERING super in JB Mono 0.22em.
  - Variants: `horizontal | vertical | wordmark | symbol`.
- `Navbar` + `Footer` now use `NexusLockup` instead of ad-hoc text.
- `ChatWidget` — full rebrand: no rounded bubbles/avatars, uses `NX` / `YOU` mono tags, laser submit button, `ASK NEXUS` FAB.
- `WhatsAppButton` — editorial square button (brand ink + laser W, pulse ring).
- **Copy pass** across `en/de/es`:
  - Hero: `"Glasfaser, präzise."` (bilingual signature headline).
  - Badges / titles / subtitles rewritten with voice guide ("Say less. Mean more.").
  - Examples: "Fibre, from plan to splice. Measured in metres."; "We write the software we use on site. We sell what works."; "On time, or we call you."
  - i18n keys kept stable — only values replaced. No DOM breakage.
- New OG image (1200×630) on ink with D1 `Glasfaser, präzise.` + technical metadata + 70/25/5 bar.
- Public asset `public/nexus_logo.png` (transparent, 2048×2048).

### Infra kept intact
Vite + React + TypeScript, framer-motion, i18n (ES/DE/EN), Formspree, Netlify CSP, Railway chat bot, sitemap, robots, JSON-LD, WhatsApp deep-link.

### Known follow-ups
- Logo raster `public/logo.png` / `public/logo-full.png` still reference legacy artwork (used by `apple-touch-icon`).
- `DualMap` visual could benefit from deeper brand treatment (SVG flags still in native colors — intentional).
- Consider generating favicon PNGs for legacy Android/iOS beyond the inline SVG.
- Dark/light mode decision — brand is dark-first, no light mode planned.

### Build
```
✓ built in ~1.4s
dist/assets/index-*.css   87.71 kB │ gzip: 15.15 kB
dist/assets/index-*.js   437.14 kB │ gzip: 142.15 kB
```
