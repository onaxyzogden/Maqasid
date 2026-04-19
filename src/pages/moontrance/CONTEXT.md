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
- Stores: `useProjectStore` (via MoontraceLevelNavigator → ensureUmmahProjects; boards seeded with ummah_ prefix, resolved by moduleId)
- Components: `src/components/shared/` (OverviewCards, MaqasidTable, LevelNavigator)
- Data: `src/data/module-overviews/` (moontrance-land, moontrance-seasonal, moontrance-residency)

## Board ID Note
Moontrance Kanban boards (`UMMAH_BOARDS` in project-store.js) have IDs prefixed `ummah_moontrance-*`.
Pillar resolution in Dashboard.jsx and PillarProgressStrip.jsx is fixed to prefer `moduleId` over id prefix,
so these boards correctly attribute to the Moontrance pillar.
