# BBOS Pipeline Components — CONTEXT.md

## Purpose
Barakah Business Operating System pipeline UI: stage visualization, role-based access, and structured task panels.

## File Inventory
| File | Description |
|------|-------------|
| BbosFullDashboard.jsx | Unified stage dashboard: Two-Factory layout (Research/Asset), Assembly Gate, StageScoreCard, task groups by prefix |
| BbosFullDashboard.css | Factory section tints, assembly gate bar, locked/cleared states, task card styles |
| _(BbosPipelineHeader — removed)_ | Stage navigation now handled by LevelNavigator in `components/shared/` with `gateIndicators` prop for 00A/01B patch stages |
| BbosRoleBadge.jsx | Role abbreviation badge styled with role.color and role.bg |
| BbosRolePicker.jsx | Dropdown picker for BBOS roles (all/OP/FD/etc.); uses BbosRoleBadge |
| BbosTaskPanel.jsx | Full task detail panel: purpose, theological rationale, field forms, G-Label, AI draft |
| BbosTaskPanel.css | Task panel layout, slide-in sidebar, mobile full-screen overlay |
| pipeline-dashboard/ | Redesigned BBOS dashboard (preview, behind `bbosNewDashboard` flag) — see subfolder below |

## Subfolder: pipeline-dashboard/ (redesigned dashboard — preview build)
Self-contained visual redesign. Components read **only** the view-model from the adapter — never live stores (this pass). Gated behind the OFF-by-default `bbosNewDashboard` app-store flag (persisted as `bbiz_bbos_new_dash`, sync-excluded). `DashboardView.jsx` branches to `BbosPipelineDashboard` when the flag is ON.
| File | Description |
|------|-------------|
| BbosPipelineDashboard.jsx | Root: `.bpd` shell — 240px rail + center overview + modal mounts; holds selected/exec/brief state |
| BbosPipelineDashboard.css | ALL scoped styles + `.bpd` CSS-var palette (scoped dark theme — does NOT leak globally) + keyframes + scrollbar |
| BbosPipelineRail.jsx | Left rail: header/cycle progress + StageNode list + footer |
| BbosStageOverview.jsx | Center pane: governing attributes, du'a, gate card, two CTAs |
| BbosExecView.jsx | Execution View modal (portal) — tabs; retrospective OPT shows Metrics/BHI/Restoration |
| BbosApprovalBrief.jsx | Approval Brief modal (portal) — covenant, readiness, gate decision |
| primitives.jsx | Shared JSX components: Ornament, SPill, Arc, Spirit, Dot |
| palette.js | JSX-free color/label helpers (inline `--c`/`--c-dim`/`--c2` custom-prop maps + label fns) |
| adapter/bbos-dashboard-adapter.js | **PUBLIC seam**: `buildPipelineViewModel({ project, bbosFilter })` — the one module the follow-up swaps mock→live |
| adapter/bbos-dashboard-mock.js | Throwaway OLOS/Atlas example seed, re-keyed into the VM shape |

## Store/Data Dependencies
- **task-store**: `getTask()`, `updateTask()`, `updateBbosFieldData()`, `deleteTask()`
- **auth-store**: user
- **data/bbos-pipeline.js**: stage definitions
- **data/bbos-task-definitions.js**: `getBbosTaskDef()` (fields, validation, AI draft config)
- **data/bbos-role-access.js**: `getTaskAccessLevel(bbosRole, bbosTaskType)`

## Key Patterns
- **Two-Factory model**: Tasks classified by prefix — Research (S, V, FP) vs Asset (A, AF, IC)
- **Assembly Gate**: Research tasks must all be Done before Asset tasks unlock for editing
- **StageScoreCard**: Dynamic weighted scoring (5 signals × 5 pts → % → verdict) per stage
- Tasks have `bbosTaskType` field (e.g., 'IDY-S1', 'CRD-V1') linking to task definitions
- `bbosFieldData` object maps field IDs to user-entered values
- AI draft status: `_aiDraftStatus` ('none', 'pending', 'accepted', 'rejected')
- G-Label assignment via `task.gLabel` field
- Collapsible rationale section (theological context)
- Local field state with debounced saves (300ms)
- Form field types: textarea, text, select, number — mapped from task definition
- Mobile: full-screen overlay; desktop: slide-in-right sidebar
- Sub-stage progress indicators in pipeline header (✓/◐/○)

## Gotchas
- AI draft generation streams via `@services/ai/ai-client` (`streamCompletion`); prompts are built by `@services/ai/prompt-builder`. Provider config lives in `@services/ai/ai-settings`.
- Stage-level divine attributes are owned by `bbos-stage-islamic.js` and pulled into the task panel via `getBbosStageIslamic(def.stage)`. Task definitions no longer carry per-task `governingAttributes` / `attrMeaning` — don't reintroduce them.
- Validation flags from task definition shown as alert cards
- Role access levels: 'V' (view-only), 'E' (edit), '-' (hidden)
