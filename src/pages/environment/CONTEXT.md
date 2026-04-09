# Environment Pages — CONTEXT.md

## Purpose
Environment pillar pages -- EnvironmentDashboard (main dashboard with CeremonyGate, dimension cards, progress tracking) plus 4 sub-pages (Resource, Waste, Ecosystem, Sourcing). Each sub-page renders a pillar header and overview cards for its specific dimension.

## File Inventory
| File | Description |
|------|-------------|
| EnvironmentDashboard.jsx | Main Environment pillar dashboard -- CeremonyGate entry, dimension cards, progress tracking |
| EnvironmentDashboard.css | Styles for EnvironmentDashboard layout and cards |
| EnvironmentResourcePage.jsx | Resource dimension sub-page -- resource stewardship and conservation |
| EnvironmentWastePage.jsx | Waste dimension sub-page -- waste reduction and responsible disposal |
| EnvironmentEcosystemPage.jsx | Ecosystem dimension sub-page -- ecological balance and biodiversity |
| EnvironmentSourcingPage.jsx | Sourcing dimension sub-page -- ethical and sustainable sourcing |

## Dependencies
- Stores: `useIslamicStore`, `usePillarStore`
- Components: `src/components/islamic/` (CeremonyGate, ThresholdModal, ReadinessCheck), `src/components/dashboard/`
- Data: `src/data/pillar-dashboard-data.js`, `src/data/islamic-data.js`
