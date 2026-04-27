# Health Pages — CONTEXT.md

## Purpose
Health pillar pages (Hifz al-Nafs) -- HealthDashboard (main dashboard with CeremonyGate, dimension cards, progress tracking) plus 4 sub-pages (Physical, Mental, Safety, Social). Each sub-page renders a pillar header and overview cards for its specific dimension.

## File Inventory
| File | Description |
|------|-------------|
| HealthDashboard.jsx | Main Health pillar dashboard -- CeremonyGate entry, dimension cards, progress tracking |
| HealthDashboard.css | Styles for HealthDashboard layout and cards |
| HealthPhysicalPage.jsx | Physical dimension sub-page -- bodily health and fitness |
| HealthMentalPage.jsx | Mental dimension sub-page -- psychological wellbeing |
| HealthSafetyPage.jsx | Safety dimension sub-page -- personal security and protection |
| HealthSocialPage.jsx | Social dimension sub-page -- social health and relationships |

## Dependencies
- Stores: `useIslamicStore`, `usePillarStore`
- Components: `src/components/islamic/` (CeremonyGate, ThresholdModal, ReadinessCheck), `src/components/dashboard/`
- Data: `src/data/pillar-dashboard-data.js`, `src/data/islamic-data.js`
