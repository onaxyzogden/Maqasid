# Ummah Pages — CONTEXT.md

## Purpose
Ummah pillar pages -- UmmahDashboard (main dashboard with CeremonyGate, dimension cards, progress tracking) plus 4 sub-pages (FamilyPage, Neighbors, Community, CollectivePage). Each sub-page renders a pillar header and overview cards for its specific social dimension.

## File Inventory
| File | Description |
|------|-------------|
| UmmahDashboard.jsx | Main Ummah pillar dashboard -- CeremonyGate entry, dimension cards, progress tracking |
| UmmahDashboard.css | Styles for UmmahDashboard layout and cards |
| FamilyPage.jsx | Family dimension sub-page -- household and immediate family circle |
| Neighbors.jsx | Neighbors dimension sub-page -- neighborly duties and local ties |
| Community.jsx | Community dimension sub-page -- masjid, local organizations, civic engagement |
| CollectivePage.jsx | Collective dimension sub-page -- broader ummah and global Muslim solidarity |

## Dependencies
- Stores: `useIslamicStore`, `usePillarStore`
- Components: `src/components/islamic/` (CeremonyGate, ThresholdModal, ReadinessCheck), `src/components/dashboard/`
- Data: `src/data/pillar-dashboard-data.js`, `src/data/islamic-data.js`
