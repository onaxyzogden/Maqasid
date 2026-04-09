# Faith Pages — CONTEXT.md

## Purpose
Faith pillar pages -- FaithDashboard (main dashboard with CeremonyGate, module seeding, progress tracking) plus 8 sub-pages covering the three tiers (Core, Growth, Excellence) and five pillars of Islam (Shahada, Salah, Zakah, Sawm, Hajj). Each sub-page renders a pillar header and overview cards for its specific dimension.

## File Inventory
| File | Description |
|------|-------------|
| FaithDashboard.jsx | Main Faith pillar dashboard -- CeremonyGate entry, dimension cards, progress tracking |
| FaithDashboard.css | Styles for FaithDashboard layout and cards |
| FaithCorePage.jsx | Core dimension sub-page -- foundational faith practices |
| FaithGrowthPage.jsx | Growth dimension sub-page -- developing faith habits |
| FaithExcellencePage.jsx | Excellence dimension sub-page -- ihsan-level faith refinement |
| FaithShahadaPage.jsx | Shahada sub-page -- testimony of faith dimension |
| FaithSalahPage.jsx | Salah sub-page -- prayer dimension |
| FaithZakahPage.jsx | Zakah sub-page -- purification of wealth dimension |
| FaithSawmPage.jsx | Sawm sub-page -- fasting dimension |
| FaithHajjPage.jsx | Hajj sub-page -- pilgrimage dimension |

## Dependencies
- Stores: `useIslamicStore`, `usePillarStore`
- Components: `src/components/islamic/` (CeremonyGate, ThresholdModal, ReadinessCheck), `src/components/dashboard/`
- Data: `src/data/pillar-dashboard-data.js`, `src/data/islamic-data.js`
