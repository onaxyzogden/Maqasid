---
title: "Ummah pillar adopts PillarLevelPage pattern"
type: decision
created: 2026-04-17
updated: 2026-04-17
tags: [adr, ummah, pillar, layout, refactor]
status: accepted
---

# Ummah pillar adopts PillarLevelPage pattern

## Status
Accepted — 2026-04-17

## Context
All six Ummah submodule pages (Collective, Neighbors, Community, MTC Land, MTC Seasonal, MTC Residency) rendered a legacy layout consisting of `PillarHeader + ViewToggle + OverviewCards/MaqasidTable`. This layout was inconsistent with the Faith pillar's modern Shahada pattern (`CeremonyGate` → `PillarLevelPage`: compact level navigator + kanban board per core/growth/excellence level). The user wanted parity across the pillar system. The OVERVIEW + MAQASID content was still valuable and needed a new home.

## Decision
Convert all 6 Ummah submodule pages to the shared `PillarLevelPage` pattern. Build the supporting scaffold (`UMMAH_BOARDS`, `ensureUmmahProjects`, `UmmahLevelNavigator`, `UmmahPillarPage`). Relocate the OVERVIEW + MAQASID datasets into a collapsible "Frameworks" section on `UmmahDashboard` — one `<details>` block per submodule, accent-colored from `--mod-*` design tokens.

## Alternatives considered

1. **Leave legacy layout in place.** Rejected — inconsistency across pillars fragments the UX; user explicitly requested parity.
2. **Delete OVERVIEW + MAQASID content.** Rejected — rich Qur'anic grounding and Maqasid-al-Shari'ah mappings are core product value; only the *location* was wrong.
3. **Keep OVERVIEW + MAQASID as a second tab on each submodule page (ViewToggle preserved).** Rejected — ViewToggle was part of what made the legacy layout feel dated; the dashboard is a more natural home for cross-submodule reference material.
4. **Build level-overview pages (`/app/ummah-core` etc.) in this session.** Deferred — user only requested the 6 submodule pages; level-overview pages can be added later using Faith's `LevelOverviewPage` as a template. `UMMAH_LEVEL_ROUTES` currently falls back to `/app/pillar/ummah`.

## Consequences

### Positive
- All 6 submodule pages now render identical structure to `/app/faith-shahada` — compact level navigator + kanban board with 5 seeded tasks × 5 subtasks per level
- Submodule pages reduced to 3-line wrappers — single point of change for future navigator tweaks
- Frameworks reference material concentrated on the pillar hub — easier cross-submodule comparison
- `UMMAH_BOARDS` + `ensureUmmahProjects` now mirror the established FAITH/LIFE/INTELLECT/FAMILY/WEALTH/ENVIRONMENT pattern — all 7 pillars now have consistent store scaffolding

### Negative / trade-offs
- `useAyahBanner('ummah_*')` no longer fires on submodule page mount (was called from all 6 legacy pages) — if the ambient ayah banner matters, needs re-wiring in `UmmahPillarPage` or upstream in `PillarLevelPage`
- Label/id mismatch carried forward: `collective` id displays as "MTC", `community` id displays as "Collective". This reflects the existing `modules.js` data shape and sidebar mapping — not introduced here, but now more visible since the Frameworks section surfaces both id and label together
- Citations in the 450 auto-generated subtask `sources:` fields remain unverified — authored by parallel agents in prior session; hadith isnad and translation accuracy never audited

## Files modified

- `src/store/project-store.js` — added `UMMAH_BOARDS` (18 entries) and `ensureUmmahProjects` action
- `src/pages/ummah/UmmahLevelNavigator.jsx` (new)
- `src/pages/ummah/UmmahPillarPage.jsx` (new)
- `src/pages/ummah/MoontraceLandPage.jsx` — rewritten
- `src/pages/ummah/MoontranceSeasonalPage.jsx` — rewritten
- `src/pages/ummah/MoontranceResidencyPage.jsx` — rewritten
- `src/pages/ummah/CollectivePage.jsx` — rewritten
- `src/pages/ummah/Neighbors.jsx` — rewritten
- `src/pages/ummah/Community.jsx` — rewritten
- `src/pages/ummah/UmmahDashboard.jsx` — added Frameworks section with 6 collapsibles
- `src/pages/ummah/UmmahDashboard.css` — appended `.ummah-framework*` styles

## Verification
`npm run build` passes — 2645 modules transformed, no errors. Runtime walkthrough of `/app/moontrance-land`, `/app/moontrance-seasonal`, `/app/moontrance-residency`, `/app/collective`, `/app/neighbors`, `/app/community`, and `/app/pillar/ummah` still pending user confirmation.

## References
- Plan file: `C:\Users\MY OWN AXIS\.claude\plans\witty-discovering-kite.md`
- Pattern reference: `src/pages/shared/PillarLevelPage.jsx`, `src/pages/faith/FaithShahadaPage.jsx`, `src/pages/faith/FaithPillarPage.jsx`
