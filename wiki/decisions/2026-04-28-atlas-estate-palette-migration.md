---
title: "Atlas — Estate Palette Migration (warm-brown → estate dark-green/gold/sage)"
type: decision
date: 2026-04-28
status: accepted
tags: [atlas, design-system, color, accessibility, css-variables]
sources: 0
---

# ADR — Atlas Estate Palette Migration

## Context

The user described the existing warm-brown Atlas chrome (`#1a1611` bg, `#c4a265` gold-on-brown gradients, `#9a8a74` muted text) as "revolting" and shared a reference HTML mock (`OGDEN Atlas｜Project Command Home.html`) showing a dark-estate aesthetic — near-black green base, thin gold borders, sage-green active state, parchment text, Cormorant Garamond display serif, translucent `card-dark` panels with backdrop blur.

Two things needed to happen together:
1. The **entire site** repainted to the estate palette in both `data-theme="dark"` and `data-theme="light"`.
2. The **per-project Dashboard Overview** (`/v3/project/:projectId/home`) restyled to mirror the mock — circular icon nav items, Next-3-Actions / Readiness Summary cards, gold/sage accent system, serif display headings.

## Decision

Adopt the estate palette across all chrome surfaces. Map polygon palettes (zone fills, hydrology, soil, sectors) stay untouched per the UX-Scholar 2026-04-23 rule that biophilic hues are reserved for map data.

### Token surface (estate palette, dark mode)

| Token | Value | Use |
|---|---|---|
| `--color-bg` | `#0b0e0c` | App body |
| `--color-chrome-bg` | `#0a0d0b` | Sidebar/topbar (chrome stays dark in light mode too) |
| `--color-surface` | `#14181a` | Panels / cards (translucent variant `rgba(20,24,22,0.75)` + `backdrop-filter: blur(4px)`) |
| `--color-border` | `rgba(212,175,95,0.18)` | Card / chrome dividers |
| `--color-primary` | `#d4af5f` | Brand gold |
| `--color-primary-hover` | `#e0b56d` | |
| `--color-on-primary` | `#2a2018` | **NEW** — dark ink for foreground on gold (8.5:1 vs prior 2.23:1 white-on-gold) |
| `--color-accent` | `#8fc89a` | Sage active state |
| `--color-on-accent` | `#1a2418` | **NEW** — dark ink for foreground on sage (sage too light to carry white at AA) |
| `--color-text` | `#f3ecd7` | Parchment headings/body |
| `--color-text-muted` | `#cfc9b8` | |
| `--color-text-subtle` | `#a59f8c` | Section labels (uppercase) |
| `--font-display` | `'Cormorant Garamond', 'Playfair Display', serif`, weight 500, +0.01em | Logo, hero, card titles |
| `--font-sans` | `Inter, system-ui, …` | Body |

Light-mode counterpart kept high-contrast and stone-cool: bg `#f6f4ee`, surface `#ffffff`, primary `#b08a3a` (darker gold for AA on white), accent `#5a8a5a`, text `#1f231e`, muted `#5a5443`, subtle `#7d7864`. Chrome stays dark (`#0a0d0b`) in both modes so the estate frame reads as one continuous wrapper around the canvas.

### a11y — fixed white-on-gold

`Button.module.css` `.primary` previously rendered `color: #fff` on a `var(--color-primary)` fill. Once `--color-primary` resolved to the estate gold `#d4af5f` (or its OKLCH equivalent `oklch(0.75 0.10 82)` → `#cea861`), the contrast collapsed to **2.23:1** — flagged by axe. Same problem on `.accent` (sage) which is too light to carry white text at AA.

Resolution: introduced `--color-on-primary: #2a2018` and `--color-on-accent: #1a2418` tokens, mirrored across light, dark, and OKLCH branches. Buttons now use `color: var(--color-on-primary, #2a2018)` — verified live via `getComputedStyle` against the rendered `Continue Project` button: `rgb(42,32,24)` on `rgb(212,175,95)` ≈ **8.5:1**. Same approach used in HomeHero `.btnPrimary`, DiagnoseMap toolBtn `[data-active="true"]`, and the four collaboration / template / structure-properties primary CTAs.

### Two-phase implementation

**Phase 1 — Tokens (foundation):**
- `apps/web/src/styles/tokens.css` — added Cormorant Garamond to the Google Fonts import; retuned light-mode root tokens (cool stone palette); introduced `--color-on-primary` / `--color-on-accent`; added `--color-brand` alias (legacy v3 sidebar token).
- `apps/web/src/styles/dark-mode.css` — full rewrite of both the explicit `[data-theme="dark"]` block and the `@media (prefers-color-scheme: dark)` block; OKLCH `@supports` branch kept in sync with hex fallbacks.

**Phase 2 — Per-project Dashboard Overview polish:**
- `v3/pages/HomePage.module.css` — radial-gradient ambient texture on `.page`; serif `--font-display` on `.pageTitle` (34px), `.sectionTitle` (22px), `.colTitle` (18px), `.healthScore` (32px), `.helpTitle` (22px); `.section` / `.col` / `.helpBanner` repainted with `--color-panel-card` translucent surface + `border-radius: 14px` + `backdrop-filter: blur(4px)`.
- `v3/components/V3LifecycleSidebar.module.css` — active stage moved from gold inset shadow to sage-tinted pill (`rgba(var(--color-sage-rgb), 0.10)` bg + `0.35` border). Stage index circle inherits the sage tint when active.
- `v3/components/HomeHero.module.css` — bug fix: hero photo backdrop is always dark, so palette-locked the ring text colors (`.ringValue: #f3ecd7`, `.ringDenom: #cfc9b8`) to the dark-mode parchment scale regardless of theme; verdict / title use `var(--color-text)` since they sit on the body side which respects theme.

**Phase 3 — Sweep (Categories A + B):**
- **Category B (visible chrome hardcodes — 9 files):** DiagnoseMap.module.css, MapLoadingIndicator, GroupingToggle, TerrainControls, OsmVectorOverlay, MembersTab, CollaborationPanel, TemplateMarketplace, StructurePropertiesModal — all repainted from `#c4a265` / `#1f1d1a` / `#3d3328` / `#e8dcc8` to `var(--color-gold-brand)` / `var(--color-on-primary)` / `rgba(212,175,95,0.18)` / `var(--color-text)`.
- **Category A (var-fallback hexes — 20 files, 36 replacements via context-aware Python sweep):** brown `#7d6140` / `#6a5236` / `#5a452e` fallbacks → estate gold scale; brown `#312617` / `#1a1611` text fallbacks → estate ink `#1f231e`; brown `#3d3328` / `#634c31` / `#4a3823` border fallbacks → `rgba(82,72,52,0.14)`. Earth-tokens (`--color-earth-*`) and the lib/sectors / lib/tokens.ts / portal/sections / portalStore palettes intentionally left untouched (biophilic data colors).

### Skipped intentionally

- `lib/sectors/*` (solar, wind compass)
- `lib/tokens.ts` (TS palette mirror — needs a careful unified pass)
- `store/portalStore.ts` (brand seed for public portals)
- `features/portal/sections/*` (portal storytelling sections)
- `DiagnoseMap.tsx` map paint properties
- `DomainFloatingToolbar.tsx` `DOMAIN_TINTS` (domain-identity colors)
- All map polygon overlays (ZonesOverlay, WindSectorsOverlay, SectorsOverlay, TopographyOverlay, HomesteadMarker, RelationshipsOverlay, PollinatorHabitatOverlay)

These all fall under the UX-Scholar 2026-04-23 rule: biophilic hues are reserved for map data; chrome stays neutral estate palette.

## Verification

- `tsc --noEmit` (with `NODE_OPTIONS=--max-old-space-size=8192` because the default heap OOMs on this monorepo) — six pre-existing errors in `OperateRail.tsx`, `ProveRail.tsx`, `v3/components/Sparkline.tsx`; **zero** new errors introduced by this work.
- Live DOM probe via `getComputedStyle` on the rendered `Continue Project` primary CTA → `rgb(42,32,24)` on `rgb(212,175,95)` ≈ 8.5:1 (passes WCAG 2.1 AA for normal text, 4.5:1).
- Browser-side axe-core: prior `gold-bg + white-text` 2.23:1 finding no longer present. Remaining contrast warning is `#6e5326` text on `#060807` (an earth-token consumer) — pre-existing, not introduced by this work; earth tokens stay warm per the biophilic-data rule.
- Visual confirmation in preview at desktop width across both `data-theme="light"` and `data-theme="dark"`.

## Consequences

- **Removed:** the warm-brown identity. Site reads as dark estate green-on-gold with sage active accent.
- **Established pattern:** for any future "ink on brand surface" need, use `--color-on-primary` / `--color-on-accent` rather than hard-coding `#fff`. White-on-brand is now considered a contrast smell.
- **Earth palette deliberately preserved:** `--color-earth-*` tokens (used by group-identity badges and the warm-brown end of map cartography) keep their original values. If any earth-* consumer drifts visually, rebind the offender to a neutral token rather than retuning the palette.
- **Light-mode chrome is dark on purpose.** This is unusual but matches the reference mock — the estate frame reads continuous across the theme toggle.
- **Deferred:** `lib/tokens.ts` TS palette mirror, portal sections, and the brand-seed in `portalStore.ts` still hold legacy hex values. Sweeping them needs a careful unified pass and visual review (portal sections in particular have a curated atmospheric palette that may not want to flatten to chrome tokens).

## References

- [[2026-04-23-atlas-ux-scholar-biophilic-data-rule]] — biophilic colors stay on map data, chrome neutralizes
- Plan file: `~/.claude/plans/c-users-my-own-axis-downloads-ogden-atl-silly-wand.md`
- Reference mock: `~/Downloads/OGDEN Atlas｜Project Command Home.html`
