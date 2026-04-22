---
title: "Wheel two-axis color model + Wealth submodule icon canon"
type: decision
date: 2026-04-22
status: accepted
---

# Wheel two-axis color model + Wealth submodule icon canon

## Context

Two separate but adjacent fixes landed in one session on `MaqasidComparisonWheel`
and the Wealth module icon set:

1. **Wheel color axes were conflated.** The `.mcw-band` outer ring and
   `.mcw-seg-current` progress fill both derived from a single `levelColor`
   prop, so a module's identity ring shifted color with the active level
   (L1=gold → L2=green → L3=purple). Users couldn't tell Faith from Wealth
   once they left the Core level.
2. **`.mcw-seg-bg` dimming was inverted.** At rest, all background segments
   rendered darker than hovered peers; on hover the focused segment got
   lighter while peers stayed dark. User wanted the opposite: rest = light,
   hover-peer = darker so the hovered sector visually recedes against its
   darkened neighbours.
3. **Wealth submodule icons diverged across surfaces.** Sidebar canon (from
   `modules.js`) used `GitPullRequestCreateArrow` / `ChessKnight` / `Scale` /
   `CircleFadingArrowUp`; the wheel + bento registry
   (`WealthLevelNavigator.jsx`) used `Wallet` / `PiggyBank` / `Scale` /
   `CircleFadingArrowUp`. Two glyphs out of four were inconsistent.
4. **Final swap request.** After canonicalization, Yousef requested that
   Earning & Provision and Circulation & Impact trade glyphs —
   `CircleFadingArrowUp` belongs to Earning (the expanding-rizq metaphor),
   `GitPullRequestCreateArrow` belongs to Circulation (the branching flow
   of zakat/sadaqah).

## Decision

### 1. Two-axis wheel color model

Introduce a per-module `theme` hex independent of level. `module-palette.js`
becomes the single source:

```js
export const LEVEL_COLORS = {
  core:       '#C8A96E', // Gold
  growth:     '#4AB8A8', // Green
  excellence: '#8E7CC3', // Purple
};
// Every module keeps the same core/growth/excellence values (universal).
// The `theme` field differs per module and drives only the outer band.
```

`MaqasidComparisonWheel` accepts a new `themeColor` prop (falls back to
`levelColor` when absent). The SVG gets two CSS vars —
`--mcw-theme-color` / `--mcw-theme-stroke` — and the `#mcw-band-level`
gradient uses `themePalette.base` instead of `palette.base`.

Every `<Module>LevelOverview.jsx` passes
`themeColor: MODULE_PALETTE.<module>.theme` into `wheelExtraProps`.

### 2. `.mcw-seg-bg` dimming inverted

Base `fill-opacity` dropped 0.55 → 0.25 (lighter at rest). A dedicated
`:has(.is-hovered)` rule raises non-hovered peers to 0.9 (darker when a
sibling is focused). The shared peer-dim rule no longer targets
`.mcw-seg-bg`.

### 3. Wealth icon canon

The sidebar icon set (from `src/data/modules.js`) is the canonical default.
After this session's trailing swap, the final canon is:

| Submodule | Glyph |
|---|---|
| Earning & Provision | `CircleFadingArrowUp` |
| Financial Literacy | `ChessKnight` |
| Ownership & Rights | `Scale` |
| Circulation & Impact | `GitPullRequestCreateArrow` |

Propagated to three files: `src/data/modules.js` (sidebar via `ICON_MAP`
lookup), `src/pages/wealth/WealthLevelNavigator.jsx` (wheel + bento +
`LevelNavigator` pills), `src/pages/wealth/WealthDashboard.jsx` (legacy
dashboard kept in sync).

Project-board icons in `store/project-store.js` (`wealth_circulation_*`)
are intentionally left on `CircleFadingArrowUp` — those are board
identity icons keyed on `moduleId`, not submodule icons.

## Consequences

- **Module identity is now preserved across levels.** Faith always renders
  its theme ring (currently white); Wealth always renders `#7A9E4E`; etc.
  The level axis only colors the progress fill.
- **Faith theme tentatively white.** User tried gold, then switched to
  white. Recorded here so future changes don't silently revert.
- **One canonical icon registry per module.** `WEALTH_PILLARS` in
  `WealthLevelNavigator.jsx` is the de-facto registry for wheel + bento;
  `modules.js` is the registry for sidebar. Both now agree, glyph-for-glyph.
- **Sidebar `ICON_MAP` already had both glyphs imported**, so the swap was
  a pure string rename in `modules.js` with no import changes.

## Also in this session (no separate ADR)

- **Dev-only 50% progress simulation** via `VITE_SIMULATE_PROGRESS` env
  var, intercepted once in `useModuleProgress.js`. `.env.local`
  gitignored. Lets visual QA happen without seeding fake tasks into
  Zustand.

## Files touched

- `src/data/module-palette.js` — rewritten with two-axis model
- `src/components/faith/MaqasidComparisonWheel.jsx` — `themeColor` prop + gradient wiring
- `src/components/faith/MaqasidComparisonWheel.css` — seg-bg inversion
- `src/hooks/useModuleProgress.js` — simulation short-circuit
- 8 × `<Module>LevelOverview.jsx` — pass `themeColor` via `wheelExtraProps`
- `src/data/modules.js` — earning ↔ circulation icon swap
- `src/pages/wealth/WealthLevelNavigator.jsx` — canonical `WEALTH_PILLARS`
- `src/pages/wealth/WealthDashboard.jsx` — legacy `PILLARS` kept in sync

## Verification

- `npm run build` clean (2748 modules) at each step.
- Sidebar vs wheel vs bento: all four Wealth submodules render the same
  glyph on every surface.
- Module identity preserved when toggling L1 ↔ L2 ↔ L3 on any module.
