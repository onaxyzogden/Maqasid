---
title: "Wheel band color unification — band follows level, not module"
type: decision
date: 2026-04-28
status: accepted
supersedes: 2026-04-22-wheel-two-axis-color-and-wealth-icon-canon
---

# Wheel band color unification — band follows level, not module

## Context

[2026-04-22-wheel-two-axis-color-and-wealth-icon-canon](2026-04-22-wheel-two-axis-color-and-wealth-icon-canon.md)
introduced a two-axis color model: each module's `MaqasidComparisonWheel`
painted its outer `.mcw-band` ring with a per-module `themeColor` (faith=white,
wealth=green, life=red, etc.) while the inner sectors and hub were keyed to
the universal `levelColor` (gold/teal/violet for Daruriyyat/Hajiyyat/Tahsiniyyat).

In practice this made the level signal the user actually came to read —
"which Shari'ah tier am I on?" — fight with the module's own brand color.
On `/app/faith-core` the gold core fill was visually subordinated to a white
band. Switching levels recolored the inner ring while the band stayed put,
weakening the level switcher's affordance.

## Decision

Collapse the band axis back into the level axis. The wheel paints every
element from a single `palette` derived from `levelColor`. There is no
per-module color override on the wheel.

- `themeColor` prop is removed from `MaqasidComparisonWheel`.
- `themePalette` `useMemo` is deleted; the `mcw-band-level` linearGradient
  now consumes `palette.base` (same source as sectors, hub, needle, aura).
- All 10 caller sites that passed `themeColor: MODULE_PALETTE.<m>.theme`
  (8 module overview pages + `OgdenLevelOverview` + `EcosystemPresentationFrame`)
  drop the prop. The corresponding `MODULE_PALETTE` imports — now unused in
  those files — are removed too.
- `seg.color` per-segment override at the band path stays. That's a
  segment-level concern (focus / single-pillar wheels), not a module-level one.
- `MODULE_PALETTE.<module>.theme` entries remain in `src/data/module-palette.js`
  — still used by sidebar accents and elsewhere. Only the wheel stops reading them.

## Consequences

- Switching the level tab now recolors the *whole* wheel — band, sectors, hub —
  giving the level switcher a stronger visual affordance.
- Modules lose their wheel-level color signature. Their identity is still
  carried by sidebar accents, page accents, and the `--pillar-accent` 2px
  top rule on the LevelOverviewPage shell.
- Single source of truth for wheel color: `levelColor` → `deriveWheelPalette` → `palette`.

## Files touched

- `src/components/faith/MaqasidComparisonWheel.jsx` — drop `themeColor` prop, delete `themePalette`, point band gradient at `palette.base`
- `src/pages/faith/FaithLevelOverview.jsx`
- `src/pages/health/HealthLevelOverview.jsx`
- `src/pages/intellect/IntellectLevelOverview.jsx`
- `src/pages/family/FamilyLevelOverview.jsx`
- `src/pages/wealth/WealthLevelOverview.jsx`
- `src/pages/environment/EnvironmentLevelOverview.jsx`
- `src/pages/ummah/UmmahLevelOverview.jsx`
- `src/pages/moontrance/MoontranceLevelOverview.jsx`
- `src/pages/ogden/OgdenLevelOverview.jsx`
- `src/components/ogden/EcosystemPresentationFrame.jsx`
- `wiki/decisions/2026-04-22-wheel-two-axis-color-and-wealth-icon-canon.md` — partially-superseded marker
