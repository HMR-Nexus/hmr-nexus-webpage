# HMR Nexus Webpage — Rebrand Log

## v1.1.0 — Official logos + accent correction (Apr 2026)

**Corrected: accent is signal orange `#FF4D2E`, not laser green.**
Driven by the official logo set (`public/logos/*.svg`) and the canonical Landing Page bundle.

### Accent swap
| Was | Is |
|---|---|
| `#C6FF3D` (laser green) | `#FF4D2E` (signal orange) |

Global replacement across `tailwind.config.js`, `src/index.css`, all `.tsx`, CSS, JSX, JSON, HTML. The token name `laser` is kept (it's semantic for "the pulse") but now resolves to orange.

### Official logo set
Added `/public/logos/` with 13 SVG variants from `logos-nexus.zip`:
- `nexus-lockup--{mono,ink-on-paper,paper-on-ink}.svg`
- `nexus-symbol--{accent,accent-arrow,mono-white,mono-black,ink-on-paper,paper-on-ink}.svg`
- `nexus-wordmark--{accent,ink-accent-x,ink-on-paper,paper-on-ink}.svg`

### Symbol geometry — CORRECTED
Previous: crosshair + inner dot (from `marks.jsx` default).
Current: **stylized N monogram** — two vertical bars (9×42 each) + diagonal slab, per the official SVG.

`NexusSymbol` / `NexusLockup` rewritten to render the canonical geometry with an `accent` prop for the diagonal color.

### Hero — canonical copy
Headline changed across `en/de/es`:
```
Glasfaser, rebuilt
around software.
```
Italic on "rebuilt" (from bundle); accent color on "software." Matches the canonical Landing Page bundle-src.

Badge now: `● HMR · ENGINEERING GMBH`

### Favicon
Inline SVG rebuilt with official N monogram (paper bars + orange diagonal on ink).
`apple-touch-icon` now points to `/logos/nexus-symbol--paper-on-ink.svg`.

### OG image
Regenerated 1200×630 on ink with the N monogram (paper + orange) + canonical headline.

---

## v1.0.0 — NEXUS Brand System (Apr 2026)

Full rebrand from "Nothing-inspired dark mode" to NEXUS Brand System v1.

### Principles
- **Direct. Technical. Calm. Understated. Self-aware.**
- Composition: **70 % ink · 25 % paper · 5 % accent**
- "Say less. Mean more."

### Palette
| Token | Hex | Use |
|---|---|---|
| `ink` | `#0A0B0D` | 70 % — surfaces, text |
| `graphite` | `#1A1C20` | Elevated surfaces |
| `paper` | `#F5F3EE` | 25 % — light surface, body |
| `bone` | `#EAE6DC` | Subtle surface / dividers |
| `mist` | `#9A9A94` | Secondary text · captions |
| `laser` (accent) | `#FF4D2E` | 5 % — the pulse. Never body. |
| `signal.*` | green / amber / red | Functional UI status ONLY |

### Typography
- **Display** — Space Grotesk (300/400/500/700), tracking down to `-0.055em` at D1
- **Text** — Inter (15 / 1.55)
- **Mono** — JetBrains Mono

### Phases

**Phase 1 — Foundation**
- Tailwind: palette swap, type scale, letter-spacing tokens
- CSS tokens + utilities `.mono-tag`, `.section-head`, `.dot-accent`, `.rule-*`
- Fonts swap (Doto + Space Mono → Space Grotesk + Inter + JetBrains Mono)
- Rewrite: Navbar, Hero, Footer

**Phase 2 — Sections**
- Services (two disciplines, numbered items)
- Products (featured + 3 satellites, status dots)
- Portfolio (case files `CASE · 001..`)
- Stats (4-col metric rail)
- TeamSection (huge accent initials)
- Contact (brief-style form)
- TrustBanner, Values (mono rails)
- LiveGrid/MouseGlow repainted to accent

**Phase 3 — Identity & voice**
- NexusLockup component (symbol + wordmark + super)
- ChatWidget fully rebranded (`ASK NEXUS` FAB, `NX`/`YOU` mono tags)
- WhatsAppButton rebranded (square ink + accent W)
- i18n rewrite across en/de/es with voice guide
- OG image + `nexus_logo.png`

**Phase 4 — Correction (v1.1.0)**
- Accent swap to signal orange (see top)
- Official SVG logo set integrated
- N monogram geometry corrected
- Hero headline canonicalized

### Infra kept intact
Vite + React + TypeScript, framer-motion, i18n (ES/DE/EN), Formspree, Netlify CSP, Railway chat bot, sitemap, robots, JSON-LD, WhatsApp deep-link.

### Build
```
✓ built in ~1.3s
dist/assets/index-*.css   ~87 kB │ gzip: ~15 kB
dist/assets/index-*.js   ~437 kB │ gzip: ~142 kB
```

### Known follow-ups
- `public/logo.png` / `logo-full.png` raster files still from legacy — replace when rasterized brand versions available.
- DualMap SVG flags in native colors (intentional).
- Favicons PNG for legacy Android — current SVG inline covers modern devices.
