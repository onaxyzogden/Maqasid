# Wealth Pages — CONTEXT.md

## Purpose
Wealth pillar pages -- WealthDashboard (main dashboard with CeremonyGate, dimension cards, progress tracking) plus 4 sub-pages (Earning, Financial, Ownership, Circulation). Each sub-page renders a pillar header and overview cards for its specific dimension.

## File Inventory
| File | Description |
|------|-------------|
| WealthDashboard.jsx | Main Wealth pillar dashboard -- CeremonyGate entry, dimension cards, progress tracking |
| WealthDashboard.css | Styles for WealthDashboard layout and cards |
| WealthEarningPage.jsx | Earning dimension sub-page -- halal income and livelihood |
| WealthFinancialPage.jsx | Financial dimension sub-page -- budgeting, savings, financial planning |
| WealthOwnershipPage.jsx | Ownership dimension sub-page -- asset management and stewardship |
| WealthCirculationPage.jsx | Circulation dimension sub-page -- sadaqah, zakat, and wealth distribution |

## Dependencies
- Stores: `useIslamicStore`, `usePillarStore`
- Components: `src/components/islamic/` (CeremonyGate, ThresholdModal, ReadinessCheck), `src/components/dashboard/`
- Data: `src/data/pillar-dashboard-data.js`, `src/data/islamic-data.js`
