# Moontrance Pages — CONTEXT.md

## Purpose
Moontrance pillar pages (pillar 8 — Hifz al-Ard, order: 8). Created 2026-04-19 when the former Ummah pillar
was split into Ummah (social/community) and Moontrance (land/residency). MoontraceDashboard is the pillar
entry at `/app/pillar/moontrance`.

> The three Moontrance **sub-pages** (MoontraceLandPage, MoontranceSeasonalPage, MoontranceResidencyPage)
> remain in `src/pages/ummah/` as a legacy location. Their routes work correctly — only the dashboard lives here.

## File Inventory
| File | Description |
|------|-------------|
| MoontraceDashboard.jsx | Moontrance pillar dashboard — sub-module cards, milestones, framework accordions, OLOS bridge |
| MoontraceLevelNavigator.jsx | Level navigator for moontrance-land, moontrance-seasonal, moontrance-residency |

## Route
- Pillar dashboard: `/app/pillar/moontrance` → `MoontraceDashboard`
- Sub-module routes (defined in App.jsx, pages in `src/pages/ummah/`):
  - `/app/moontrance-land`
  - `/app/moontrance-seasonal`
  - `/app/moontrance-residency`

## Pillar Definition (`src/data/maqasid.js`)
```js
{
  id: 'moontrance', order: 8, icon: 'Moon',
  arabicRoot: 'Hifz al-Ard', arabicRootAr: 'حفظ الأرض',
  accentColor: '#6E8E5B',
  subModuleIds: ['moontrance-land', 'moontrance-seasonal', 'moontrance-residency'],
  relationship: 'moontrance-atlas',
  readinessAyatKey: 'community',   // temporary — dedicated ayat TBD
}
```

## CSS
`MoontraceDashboard.jsx` imports `../ummah/UmmahDashboard.css` for shared layout classes.
The pillar accent is applied via `--pillar-moontrance` from `src/styles/tokens.css`.

## Dependencies
- Stores: `useProjectStore` (via MoontraceLevelNavigator → `ensureMoontranceProjects`; boards seeded from `MOONTRANCE_BOARDS` with `moontrance_` prefix)
- Components: `src/components/shared/` (OverviewCards, MaqasidTable, LevelNavigator)
- Data: `src/data/module-overviews/` (moontrance-land, moontrance-seasonal, moontrance-residency)
- Seeds: `src/data/seed-tasks/moontrance-seed-tasks.js` (225 subtasks, 9 boards — hard-split from ummah-seed-tasks.js on 2026-05-03)

## Board ID Note
Moontrance Kanban boards (`MOONTRANCE_BOARDS` in `src/store/project-store.js`) use IDs prefixed
`moontrance_<sub>_<level>` (e.g. `moontrance_land_core`). Existing-user localStorage from before the
2026-05-03 hard-split is migrated by `migrateMoontranceBoardIds_v1` (idempotent, gated on the
`bbiz_moontrance_id_migrated_v1` sentinel), which renames `ummah_moontrance-*` → `moontrance_*`,
moves the `tasks_<id>` storage keys, and flips `_ummahModule` → `_moontranceModule` so downstream
filters (Work.jsx, SEEDED_PILLAR_FLAGS, seed-hydrator's `pillarOf`) attribute correctly.
