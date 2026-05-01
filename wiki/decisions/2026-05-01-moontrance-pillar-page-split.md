---
title: "Moontrance Pillar Page split from Ummah wrapper"
type: decision
date: 2026-05-01
---

# Moontrance Pillar Page split from Ummah wrapper

## Context
The three Moontrance submodule pages (Land, Seasonal, Residency) at `/app/moontrance-{land,seasonal,residency}` rendered the **Ummah** LevelNavigator (Ummah / Neighbors / Community) at the top of the page instead of the Moontrance navigator. The pages still live in `src/pages/ummah/` per the legacy-location note in [src/pages/moontrance/CONTEXT.md](src/pages/moontrance/CONTEXT.md), and all three were thin wrappers around `UmmahPillarPage`, which hard-coded `UMMAH_PILLARS` into `PillarLevelPage`.

## Decision
Introduce [src/pages/ummah/MoontrancePillarPage.jsx](src/pages/ummah/MoontrancePillarPage.jsx) — a sibling wrapper to `UmmahPillarPage` that feeds the Moontrance constants (`MOONTRANCE_PILLARS`, `MOONTRANCE_LEVEL_ROUTES`, `MOONTRANCE_STORAGE_KEY`, `MOONTRANCE_ENSURE_PROJECTS` from [src/pages/moontrance/MoontraceLevelNavigator-constants.js](src/pages/moontrance/MoontraceLevelNavigator-constants.js)) into the same generic `PillarLevelPage`. The three Moontrance sub-page wrappers now delegate to it. `UMMAH_PILLAR_MODULE_MAP` in `UmmahPillarPage` was trimmed of its three orphaned `moontrance-*` entries.

`boardPrefix="ummah"` is preserved in the new wrapper because the project store seeds Moontrance Kanban boards under `ummah_moontrance-*` (documented in `src/pages/moontrance/CONTEXT.md` "Board ID Note"). Changing the prefix would orphan all existing tasks.

The Moontrance segment labels in `MOONTRANCE_PILLARS` were also shortened from `"Moontrance Land/Seasonal/Residency"` to `"Land/Seasonal/Residency"` per Yousef's preference — the page topbar already reads "Moontrance — Land", so the prefix on each segment was redundant.

## Files Changed
- **New**: [src/pages/ummah/MoontrancePillarPage.jsx](src/pages/ummah/MoontrancePillarPage.jsx)
- **Edited**: [src/pages/ummah/MoontraceLandPage.jsx](src/pages/ummah/MoontraceLandPage.jsx), [MoontranceSeasonalPage.jsx](src/pages/ummah/MoontranceSeasonalPage.jsx), [MoontranceResidencyPage.jsx](src/pages/ummah/MoontranceResidencyPage.jsx) — all re-pointed to `MoontrancePillarPage`.
- **Edited**: [src/pages/ummah/UmmahPillarPage.jsx](src/pages/ummah/UmmahPillarPage.jsx) — removed `moontrance-*` entries from the pillar→module map.
- **Edited**: [src/pages/moontrance/MoontraceLevelNavigator-constants.js](src/pages/moontrance/MoontraceLevelNavigator-constants.js) — segment labels shortened.

## Verification
`npm run lint` (ESLint + grounding-strict + audit:inline-refs) clean, `npm test` 56/56, browser preview confirmed Land / Seasonal / Residency segments render on `/app/moontrance-land` with task list intact and no regression on Ummah pages.
