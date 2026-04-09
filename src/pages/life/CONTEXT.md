# Life Pages — CONTEXT.md

## Purpose
Life pillar pages -- LifeDashboard (main dashboard with CeremonyGate, dimension cards, progress tracking) plus 4 sub-pages (Physical, Mental, Safety, Social). Each sub-page renders a pillar header and overview cards for its specific dimension.

## File Inventory
| File | Description |
|------|-------------|
| LifeDashboard.jsx | Main Life pillar dashboard -- CeremonyGate entry, dimension cards, progress tracking |
| LifeDashboard.css | Styles for LifeDashboard layout and cards |
| LifePhysicalPage.jsx | Physical dimension sub-page -- bodily health and fitness |
| LifeMentalPage.jsx | Mental dimension sub-page -- psychological wellbeing |
| LifeSafetyPage.jsx | Safety dimension sub-page -- personal security and protection |
| LifeSocialPage.jsx | Social dimension sub-page -- social health and relationships |

## Dependencies
- Stores: `useIslamicStore`, `usePillarStore`
- Components: `src/components/islamic/` (CeremonyGate, ThresholdModal, ReadinessCheck), `src/components/dashboard/`
- Data: `src/data/pillar-dashboard-data.js`, `src/data/islamic-data.js`
