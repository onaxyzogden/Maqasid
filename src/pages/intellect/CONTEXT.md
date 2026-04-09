# Intellect Pages — CONTEXT.md

## Purpose
Intellect pillar pages -- IntellectDashboard (main dashboard with CeremonyGate, dimension cards, progress tracking) plus 4 sub-pages (Learning, Thinking, Cognitive, Professional). Each sub-page renders a pillar header and overview cards for its specific dimension.

## File Inventory
| File | Description |
|------|-------------|
| IntellectDashboard.jsx | Main Intellect pillar dashboard -- CeremonyGate entry, dimension cards, progress tracking |
| IntellectDashboard.css | Styles for IntellectDashboard layout and cards |
| IntellectLearningPage.jsx | Learning dimension sub-page -- knowledge acquisition and study |
| IntellectThinkingPage.jsx | Thinking dimension sub-page -- critical and creative thought |
| IntellectCognitivePage.jsx | Cognitive dimension sub-page -- mental sharpness and memory |
| IntellectProfessionalPage.jsx | Professional dimension sub-page -- career development and expertise |

## Dependencies
- Stores: `useIslamicStore`, `usePillarStore`
- Components: `src/components/islamic/` (CeremonyGate, ThresholdModal, ReadinessCheck), `src/components/dashboard/`
- Data: `src/data/pillar-dashboard-data.js`, `src/data/islamic-data.js`
