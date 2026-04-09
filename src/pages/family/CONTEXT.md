# Family Pages — CONTEXT.md

## Purpose
Family pillar pages -- FamilyDashboard (main dashboard with CeremonyGate, dimension cards, progress tracking) plus 4 sub-pages (Marriage, Parenting, Kinship, Home). Each sub-page renders a pillar header and overview cards for its specific dimension.

## File Inventory
| File | Description |
|------|-------------|
| FamilyDashboard.jsx | Main Family pillar dashboard -- CeremonyGate entry, dimension cards, progress tracking |
| FamilyDashboard.css | Styles for FamilyDashboard layout and cards |
| FamilyMarriagePage.jsx | Marriage dimension sub-page -- spousal relationship and nikah |
| FamilyParentingPage.jsx | Parenting dimension sub-page -- child-rearing and tarbiyah |
| FamilyKinshipPage.jsx | Kinship dimension sub-page -- extended family ties (silat al-rahim) |
| FamilyHomePage.jsx | Home dimension sub-page -- household management and environment |

## Dependencies
- Stores: `useIslamicStore`, `usePillarStore`
- Components: `src/components/islamic/` (CeremonyGate, ThresholdModal, ReadinessCheck), `src/components/dashboard/`
- Data: `src/data/pillar-dashboard-data.js`, `src/data/islamic-data.js`
