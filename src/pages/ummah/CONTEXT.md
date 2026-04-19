# Ummah Pages — CONTEXT.md

## Purpose
Ummah pillar pages (pillar 7 — Hifz al-Ummah). UmmahDashboard is the pillar entry at `/app/pillar/ummah`
and shows the three social sub-modules: Collective, Neighbors, Community. The Moontrance sub-pages
(MoontraceLandPage, MoontranceSeasonalPage, MoontranceResidencyPage) live here as a **legacy location**
after the Ummah→Moontrance split (2026-04-19); their routes and pillar are now under the Moontrance pillar.
The Moontrance pillar dashboard itself is at `src/pages/moontrance/`.

## File Inventory

### Ummah (pillar 7 — active scope)
| File | Description |
|------|-------------|
| UmmahDashboard.jsx | Main Ummah pillar dashboard — sub-module cards + framework accordions for collective/neighbors/community |
| UmmahDashboard.css | Shared layout styles — also imported by MoontraceDashboard |
| UmmahLevelNavigator.jsx | Level navigator for collective, neighbors, community sub-modules |
| FamilyPage.jsx | Legacy route `/app/family` — household and immediate family circle |
| Neighbors.jsx | Neighbors sub-page — neighborly duties and local ties |
| Community.jsx | Community sub-page — masjid, local organizations, civic engagement |
| CollectivePage.jsx | Collective sub-page — broader ummah and global Muslim solidarity |

### Moontrance (pillar 8 — legacy location, routes owned by Moontrance pillar)
| File | Description |
|------|-------------|
| MoontraceLandPage.jsx | Land acquisition, soil stewardship, water systems, regenerative agriculture |
| MoontranceSeasonalPage.jsx | Seasonal participation pathway — planting, tending, harvest, reflection |
| MoontranceResidencyPage.jsx | Long-term community formation, residency model, trust-building, permanence |
| UmmahPillarPage.jsx | Shared pillar-level page component (used by both ummah sub-pages) |

## Route Ownership
- Ummah sub-pages: `/app/collective`, `/app/neighbors`, `/app/community` → Ummah pillar
- Moontrance sub-pages: `/app/moontrance-land`, `/app/moontrance-seasonal`, `/app/moontrance-residency` → Moontrance pillar
- Moontrance dashboard: `/app/pillar/moontrance` → `src/pages/moontrance/MoontraceDashboard.jsx`

## Dependencies
- Stores: `useProjectStore` (via UmmahLevelNavigator → ensureUmmahProjects)
- Components: `src/components/shared/` (OverviewCards, MaqasidTable, LevelNavigator)
- Data: `src/data/module-overviews/` (collective, neighbors, community, moontrance-*)
