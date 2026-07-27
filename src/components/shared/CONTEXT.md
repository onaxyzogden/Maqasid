# Shared Components — CONTEXT.md

## Purpose
Reusable UI components used across multiple modules: search, labels, tables, tooltips, headers.

## File Inventory
| File | Description | Used By |
|------|-------------|---------|
| SearchPalette.jsx | Cmd+K command palette; searches 5 sources (projects, tasks, modules, people, events); keyboard nav | Global (via AppShell) |
| SearchPalette.css | Palette overlay, result groups, keyboard-active highlight styles | Global (via AppShell) |
| DashboardTaskCard.jsx | Unified clickable task card: subtask bars, field progress, due dates, tags, BBOS custom renderers | BbosFullDashboard, PillarLevelDashboard |
| DashboardTaskCard.css | Task card layout, status colors, hover states | BbosFullDashboard, PillarLevelDashboard |
| IslamicTerm.jsx | Portal-based hover tooltip for Islamic terms; smart positioning (above/below) | Throughout app |
| IslamicTerm.css | Tooltip positioning, portal styles | Throughout app |
| GLabelBadge.jsx | Displays G-Label (integrity label) badge | BbosTaskPanel |
| AmanahTierBadge.jsx | Displays Amanah Gate Protocol tier (T1/T2/T3 — Bayyinah/Qarina/Aspiration) | TaskDetailPanel (subtask row + subtask-detail header), SubtaskStepDetail |
| SubtaskStepDetail.jsx | One subtask ("step") rendered Orientation-style: crumb → **task-stepper slot** → task title/progress → tag row (priority / Amanah tier / Grounded) → **subtask-stepper slot** → Now box → "Why & how" accordion → Evidence accordion; `subtask == null` renders the "nothing left in this task today" complete state. **Renders a Fragment** — host body must supply flex-column + gap. Props `{ crumbParts, task, subtask, taskStats, taskStepper = null, subtaskStepper = null }` — the last two are optional render slots (React nodes) for the sequential-locking rails; a host that omits them (the Prophetic Path node popup) renders byte-identical to before. Purely presentational | OrientationSheet, NodePhaseSlideUp (drill-in) |
| SubtaskStepDetail.css | Step-detail internals moved verbatim from `Orientation(.Sheet).css` — class names keep the historical `os-sheet__` / `orient-evidence__` prefixes (renaming them would touch every override; deferred) | Same |
| SubtaskEvidence.jsx | Lazy-loaded grounding-sources accordion (`label`/`defaultOpen` props), wraps `work/SubtaskSources.jsx` with ChunkErrorBoundary + Suspense. Formerly `orientation/OrientationEvidence.jsx`. Imports `../work/TaskDetailPanel.css` for the `tdp-*` classes SubtaskSources renders into — known cross-folder wart, accepted | SubtaskStepDetail |
| GLabelPicker.jsx | Dropdown picker for G-Labels with descriptions; escape to close | BbosTaskPanel |
| MaqasidTable.jsx | Maqasid framework table (necessities/needs/embellishments rows) | Module pages (Quran, Hadith) |
| OverviewCards.jsx | Card grid for overview items; Quranic ayah/hadith references | FivePillars, module overviews |
| PillarHeader.jsx | Compact pillar label with stewardship phrase and Arabic root | Module page headers |
| PillarHeader.css | Pillar header layout, accent color cascading | Module page headers |
| ViewToggle.jsx | Two-button toggle (Overview/Framework); role="tablist" with aria-selected | Pages with dual views |
| ViewToggle.css | Toggle button styles, active/inactive states | Pages with dual views |

## Store Dependencies
- **app-store** (SearchPalette): `searchOpen`, `setSearchOpen`
- **project-store** (SearchPalette): `projects[]`
- **task-store** (SearchPalette): `searchAllTasks()`
- **contacts-store** (SearchPalette): `contacts[]` for people search
- **office-store** (SearchPalette): `events[]` for event search
- **settings-store** (PillarHeader): `valuesLayer`
- **data/modules.js** (SearchPalette): `MODULES` for module search

## Key Patterns
- **Portal components**: IslamicTerm, SearchPalette use React portal to escape `overflow:hidden`
- **CSS variable cascading**: `--fp-accent`, `--pd-color`, `--ph-color` for dynamic theming
- **Memoized filtering**: SearchPalette filters on min 2 chars
- **Keyboard shortcuts**: Escape, Arrow keys, Enter for navigation
- **Smart tooltip positioning**: IslamicTerm flips above/below based on available space
- **Accessibility**: proper ARIA roles on ViewToggle and SearchPalette

## Gotchas
- IslamicTerm tooltip uses fixed positioning via portal — parent scroll doesn't break it
- SearchPalette has min 2-char threshold before showing results
- MaqasidTable reuses `PillarDashboard.css` styles
