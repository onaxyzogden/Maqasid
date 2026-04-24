---
title: "Atlas — Palette/Chrome Separation, Perimeter Tool Layout, Split-Pane Switcher"
type: decision
project: olos
created: 2026-04-24
status: shipped
tags: [ui, ux, design-system, tokens, map, atlas]
---

# Atlas — Palette / Perimeter / Split-Pane Switcher

Three related surface changes in the Atlas map view, shipped in a single
session across consecutive PRs. Recorded together because they share one
design-scholar consultation thread and reinforce each other in the final
UI.

## Context

The Atlas map canvas had accumulated three separate usability taxes:

1. **Chrome blurred with data.** The warm biophilic palette
   (earth/sage/water/gold) used as UI tokens was the same palette used
   for map layers. Headers, sidebars, and panel surfaces competed
   visually with satellite imagery and zone polygons, violating the
   Scholar principle *Map Data ≠ UI Signifier*.
2. **Left edge obstructed.** Seven floating tool controls stacked
   vertically at `top:132 left:12` obscured a ~80 × 320 px column of
   the map canvas.
3. **Split-screen chrome collided.** When `SplitScreenCompare` was
   active, its internal basemap switcher (5 labeled pills, ~310 px
   wide) overflowed the right pane by ~45 px and its top-right
   position overlapped the primary pane's `.floatingControls`
   (Redraw Boundary + stats) at z-index 5 > split-pane's z-index 3 —
   so the switcher was either hidden or visually merged with primary
   chrome depending on ratio.

## Decision

### Part A — Chrome/Biophilic Token Separation

Introduced a neutral earth-tinted chrome scale distinct from the
biophilic map palette, in `apps/web/src/styles/tokens.css`:

```css
--color-chrome-bg:             #1f1d1a;
--color-chrome-bg-translucent: rgba(31, 29, 26, 0.97);
--color-chrome-bg-overlay:     rgba(31, 29, 26, 0.72);
--color-elevation-highlight:   rgba(255, 255, 255, 0.06);

/* Gold split for WCAG-friendly active UI states */
--color-gold-brand:  #c4a265;   /* brand logomark only */
--color-gold-active: #e0b56d;   /* active UI controls (passes AA on chrome bg) */

/* Info decoupled from water (so map-water tokens stay map-water) */
--color-info-500:    #5b8eaf;
```

Repointed `--color-header-bg` and `--color-sidebar-bg` to the
chrome token; added a dark-mode elevation lift
(`--color-surface: #2a2420`, `--color-surface-raised: #342d26`).
Swept 28 hardcoded `rgba(26, 22, 17, X)` inline strings across 17
consumer files to the token — no visual change, one source of truth.

**Regression:** MapLoadingOverlay lost its 0.72 → 0.95 page dimming
under the translucent token; fixed by routing the overlay to
`--color-chrome-bg-overlay` instead. Dedicated opacity token prevents
future regressions.

### Part B — Perimeter Tool Layout

Per NotebookLM Modern-UI Scholar consultation, replaced the 7-item
left column with a **perimeter strategy**:

- **Left spine** (`LeftToolSpine.tsx`, 40 px wide icon rail):
  Cross-section, Viewshed, Measure, Historical + OSM (folded into
  one "Layers" popover), microclimate/windbreak/restoration/etc.
- **Top-right cluster** (set-and-forget view context):
  `ViewModeSwitcher` (2D/2.5D/3D), `SplitScreenToggle`,
  `MapStyleSwitcher` — stacked vertical at `top:56 right:60`.
- **Bottom-center** (`DomainFloatingToolbar`) unchanged.

Footprint on left edge: ~80 × 320 px → ~40 × 200 px (≈ 60 % smaller).

When split is active, the primary-cluster `ViewModeSwitcher` and
`MapStyleSwitcher` are conditionally suppressed
(`!splitScreenActive && …`) so they don't overlap the split pane or
project title. Only `SplitScreenToggle` remains so users retain an
exit affordance.

### Part C — Split-Pane Basemap Switcher

Inside `SplitScreenCompare.tsx`, replaced the 5-pill labeled switcher
with an icon-only Lucide variant (`Satellite`, `Mountain`,
`MountainSnow`, `Map`, `Layers`) at 28 × 28 px, wrapped in
`DelayedTooltip` (800 ms, bottom). Container uses
`maxWidth: calc(100% - 24px) + flexWrap: wrap` so the switcher
gracefully degrades from 1 row (pane ≥ ~30 %) to multi-row
(pane < ~30 %) rather than clipping.

Relocated from `top:12 right:12` → **`top:12 left:12`** (top-LEFT
corner of the split pane, adjacent to the divider) after discovering
the right-anchored placement collided with `.floatingControls`
(z-index 5 vs split pane's z-index 3). Unambiguous visual ownership
by the split pane; 103 px horizontal clearance from `.floatingControls`
at default 50 % split.

Active state uses `rgba(224,181,109,0.22)` bg + `#e0b56d` border
matching `.spine-btn[data-active="true"]` — shared signifier
vocabulary across left spine and split-pane switcher.

### Part D — Divider Drag Selection Fix

`SplitScreenCompare.tsx` drag handler now calls `e.preventDefault()`
on mousedown and sets `document.body.style.userSelect = 'none'` (plus
`-webkit-` prefix) while `draggingRef.current === true`. Restored on
`mouseup`. Previously, dragging the divider highlighted sidebar
labels, panel titles, and map legends as the pointer crossed them.

## Consequences

**Positive**
- Clear visual hierarchy: chrome ≠ map data, reinforced by token
  namespace (`--color-chrome-*` vs `--color-earth-*` / `--color-sage-*`
  / etc.).
- Map canvas visible area grew by ~60 % on left edge.
- Split-pane chrome no longer collides with primary chrome at any
  ratio (15 %–85 %).
- Drag interactions feel intentional — no accidental text selection.
- Active states share one gold token (`--color-gold-active`) across
  all interactive chrome, passing WCAG AA on dark chrome bg.

**Deferred**
- OKLCH rework of the 13 zone-identity polygon hues (equal perceived
  lightness) — out of scope for this pass.
- Lifting `splitPct` from `SplitScreenCompare` local state into
  `mapStore` — would enable finer-grained primary-cluster repositioning
  but adds cross-component coupling.
- ActiveToolChip (center-top live-metric chip during measurement) —
  mentioned in perimeter plan, not implemented.
- Map-label halo sweep for sage/water labels over satellite.

## Files Affected

**Tokens / palette (swept):**
- `apps/web/src/styles/tokens.css`
- `apps/web/src/styles/dark-mode.css`
- `apps/web/src/app/index.css`
- 17 consumer files swept from inline `rgba(26, 22, 17, X)` to
  `var(--color-chrome-bg-translucent)` (measure/OSM/history/GAEZ/soil
  overlays, CommandPalette, PublicPortalShell, zone/hydrology/climate
  panel CSS modules, etc.)

**Perimeter layout:**
- `apps/web/src/features/map/LeftToolSpine.tsx` (new)
- `apps/web/src/features/map/DataLayersPopover.tsx` (new)
- `apps/web/src/features/map/MapView.tsx` (cluster placement +
  `!splitScreenActive` conditional)

**Split-pane switcher + drag:**
- `apps/web/src/features/map/SplitScreenCompare.tsx`
- `apps/web/src/features/map/MapLoadingOverlay.module.css`

## Related

- [[olos]]
- UX Scholar NotebookLM ID `995a59d1-be39-4173-9709-473f2665e64b`
  (cited in audit file `design-system/ogden-atlas/ui-ux-scholar-audit.md`)
