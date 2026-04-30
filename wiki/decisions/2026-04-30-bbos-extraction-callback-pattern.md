---
title: "@ogden/ui-components v0.2.0 — BBOS extraction with callback + render-prop pattern"
date: 2026-04-30
type: decision
status: accepted
supersedes: []
extends: [2026-04-30-ogden-ui-components-github-direct]
---

# @ogden/ui-components v0.2.0 — BBOS extraction with callback + render-prop pattern

## Context

v0.1.0 shipped the maqasid surface (LevelNavigator, MaqasidComparisonWheel,
IslamicTerm + 9 satellites). v0.2.0 expands the package with the BBOS
Project template — both the project-creation dialog (`BbosProjectTemplatePicker`)
and the full BBOS dashboard system that runs once a BBOS project exists
(`BbosFullDashboard`, `BbosTaskPanel`, `BbosRolePicker`, `BbosRoleBadge`).
This is the largest extraction the package has absorbed: ~190 KB of JSX/CSS
plus ~250 KB of data files (`bbos-task-definitions.js` alone is 189 KB).

The MILOS-side coupling was heavy and asymmetric to the v0.1.0 work:
`BbosTaskPanel` alone pulled 5 stores (`useTaskStore`, `useAuthStore`,
`useAppStore`, `usePeopleStore`, `useProjectStore`) plus the AI service chain
(`ai-client`, `ai-settings`, `prompt-builder`, `response-parser`). All of it
had to be stripped without breaking ~60 existing import sites.

## Decisions

### 1. Subpath import — `@ogden/ui-components/bbos`

The package now exposes two entries: `.` (maqasid surface, unchanged from
v0.1.0) and `./bbos` (BBOS surface). Vite library mode is configured with
multi-entry build; `package.json` `exports` field gates resolution.

```json
"exports": {
  ".":           { "import": "./dist/index.es.js", "require": "./dist/index.cjs.js" },
  "./bbos":      { "import": "./dist/bbos.es.js",  "require": "./dist/bbos.cjs.js" },
  "./style.css": "./dist/ogden-ui-components.css",
  "./bbos.css":  "./dist/ogden-ui-components-bbos.css"
}
```

**Why:** the BBOS surface adds ~250 KB of data. Atlas and Moontrance consumers
that don't render BBOS shouldn't pay the cost. Subpath imports + `cssCodeSplit`
keep the maqasid surface lean.

**How to apply:** consumers import BBOS surface explicitly:
`import { BbosFullDashboard } from '@ogden/ui-components/bbos';
import '@ogden/ui-components/bbos.css';`. The maqasid imports keep working
unchanged.

### 2. Callback-based store mutations (not wrapped Zustand)

The package owns no Zustand store access for BBOS. Consumers pass `tasks`,
`project`, `user`, `members`, `employees`, `assignee` as props, and emit:

- `onUpdateTask(taskId, patch)`
- `onFieldUpdate(taskId, fieldId, value)`
- `onMoveTask(projectId, taskId, columnId, idx, columns)`
- `onAddProjectMember(projectId, employeeId)`
- `onRejectStage(projectId, reasonId, role)`
- `onUnrejectStage(projectId)`

callbacks back to the consumer's store layer.

**Why:** unlike the maqasid surface where singleton stores (`wheelHoverStore`,
`mithaqStore`) had to remain shared across the package boundary for hover
sync and ritual state to work, BBOS state is *per-project* — there's no
cross-component identity to preserve. Wrapping it in package-owned Zustand
would couple Atlas/Moontrance to MILOS's task/project schema. Callbacks let
each consumer wire its own persistence model.

**How to apply:** any future BBOS feature that needs state should be added
as a prop callback, not as a package-internal store.

### 3. Callback-based AI streaming

The package emits a single `onRequestAiDraft({ taskDef, projectId, signal,
onDelta, onComplete, onError }) → void` callback. The consumer wires the
actual AI client (MILOS uses its `streamCompletion + buildPrompt +
parseAiResponse + getAiConfig` chain).

**Why:** AI infrastructure varies wildly by app — endpoint, auth, prompt
template, response shape. Hardcoding an OpenAI client in the package would
force every consumer to either match MILOS's contract exactly or fork.
Treating AI as a behavior callback keeps the package agnostic.

**How to apply:** the package never imports anything from `@anthropic-ai/sdk`,
`openai`, or any AI provider. Streaming is the consumer's problem — the
package only knows how to render the streamed text and parse the final result
when the caller reports completion.

### 4. Render-prop pattern for shared MILOS UI

Three MILOS-private components have been left in MILOS rather than absorbed:
`DashboardTaskCard`, `GLabelBadge`, `GLabelPicker`. The package accepts
render-props for each:

- `renderTaskCard?({ cardProps, body }) → ReactNode`
- `renderGLabelBadge?({ gLabel }) → ReactNode`
- `renderGLabelPicker?({ value, onChange }) → ReactNode`

Each has a minimal fallback in the package so standalone consumers can mount
the dashboard without writing card code.

**Why:** `DashboardTaskCard` carries MILOS-specific theming and motion that
other consumers may not want (or may want to replace). Render-props let MILOS
keep its polished card while Atlas/Moontrance can supply their own. The
package fallback covers the "I just want the dashboard to render" case.

### 5. `seedBbosTasks` lifted out of MILOS `project-store`

The 9-task BBOS seed array (one per stage, `IDY-S1` … `OPT-S1`) was previously
inline in MILOS's `project-store.js` `createProject` action. It moves to
`@ogden/ui-components/bbos` as `seedBbosTasks({ projectId, makeId, columns })`
returning the task array.

**Why:** the seed shape is the single source of truth for the BBOS pipeline
contract — Atlas and Moontrance need the exact same 9 stages with the exact
same `bbosTaskType` values to render correctly. Keeping it in MILOS would
mean either copy-paste drift or three apps importing from MILOS.

**How to apply:** consumer's `createProject` action calls
`seedBbosTasks({ projectId, makeId, columns })` and persists the returned
array via the consumer's preferred mechanism. MILOS's call site:

```js
import { seedBbosTasks as buildBbosSeedTasks } from '@ogden/ui-components/bbos';

function seedBbosTasks(projectId, columns) {
  const storageKey = `tasks_${projectId}`;
  const existing = safeGetJSON(storageKey, []);
  if (existing.length > 0) return true;
  const seeded = buildBbosSeedTasks({ projectId, makeId: genTaskId, columns });
  return safeSet(storageKey, seeded);
}
```

### 6. Pure data + service files re-exported with one-liners

The 6 BBOS data/service files have no MILOS coupling
(`bbos-pipeline`, `bbos-task-definitions`, `bbos-role-access`,
`bbos-stage-islamic`, `bbos-template`, `bbos-export`). MILOS-side files
collapse to one line each: `export * from '@ogden/ui-components/bbos';`.

**Why:** the same singleton-instance reasoning as the v0.1.0
wheelHoverStore/mithaqStore decision — re-exporting forces both MILOS and
package code paths to resolve to the same module instance, so things like
`bbos-pipeline.STAGES` are referentially equal across the boundary.

## Verification

- `npm run build` (1.47s, no errors) — emits both entry bundles +
  `ogden-ui-components.css` + `ogden-ui-components-bbos.css`
- `npm run lint` chain (ESLint + grounding-strict + audit:inline-refs) —
  all 3 ratchets at 0
- `npm test` — 56/56 pass
- Browser smoke at `/app/work` (this worktree's preview, port 5173):
  - "+ New Project" → `BbosProjectTemplatePicker` modal opens with name input,
    Pillar select, Submodule select, Standard/BBOS Pipeline type buttons
  - Selected "BBOS Pipeline" + name "Smoke Test BBOS" → Create → redirected
    to `/app/work/proj_3Ep1vahMBlah`
  - `BbosFullDashboard` rendered all 9 stages; IDY shows 5 task cards
    (Raw Intake Capture, Normalised Intake Packet, Gap Check, Routing Decision,
    Input Integrity Gate); Stage Health Score "BLOCKED 12% · 3/25 pts"
  - Clicked IDY-S1 card → `BbosTaskPanel` opened in `tdp-overlay` portal
  - Edited textarea `btp-field-capitalDeclaration` with smoke-test value;
    `localStorage.bbiz_tasks_proj_3Ep1vahMBlah` confirmed `bbosFieldData =
    { capitalDeclaration: "smoke-test-value-..." }`; IDY-S1 card rerendered
    with "1/6 17%" reflecting the field edit
  - `rejectBbosPipeline`/`unrejectBbosPipeline` store actions verified
    intact; the wrapper passes them as `onRejectStage`/`onUnrejectStage`
    callback props (passthrough — package owns the reject UI which is gated
    behind stage-readiness)
- Screenshot tool was unresponsive (timed out at 30s twice), so verification
  proof is the structured snapshot returned by `preview_snapshot` rather
  than an image

## Files touched

**Package** (`onaxyzogden/ogden-ui-components`):
- `src/components/bbos/{BbosFullDashboard, BbosTaskPanel, BbosRolePicker,
  BbosRoleBadge, BbosProjectTemplatePicker}.{jsx,css}` — refactored from
  MILOS source with all store/AI imports stripped, callback props in place
- `src/services/bbos/{bbos-template, bbos-export, seedBbosTasks}.js`
- `src/data/bbos/{bbos-pipeline, bbos-task-definitions, bbos-role-access,
  bbos-stage-islamic}.js`
- `src/bbos.js` — new subpath entry barrel
- `vite.config.js` — multi-entry lib build with per-entry CSS asset routing
- `package.json` — `exports` field with `./bbos` and `./bbos.css`; bumped
  to `0.2.0`
- `dist/` — rebuilt + committed (both ESM/CJS entries + both CSS bundles)
- `README.md` — BBOS section added with mounting examples
- Tag `v0.2.0` pushed

**MILOS** (this worktree):
- `package.json` — pin bumped to `#v0.2.0`
- `src/main.jsx` — `import '@ogden/ui-components/bbos.css'` added
- `src/components/bbos/BbosFullDashboard.jsx` — converted to wrapper
- `src/components/bbos/BbosTaskPanel.jsx` — converted to wrapper (binds AI
  callback to existing `streamCompletion + buildPrompt + parseAiResponse`
  chain; `renderGLabelPicker` injects MILOS's `GLabelPicker`)
- `src/components/bbos/BbosRolePicker.jsx` — one-line re-export
- `src/components/bbos/BbosRoleBadge.jsx` — one-line re-export (already was)
- `src/data/bbos/{bbos-pipeline, bbos-task-definitions, bbos-role-access,
  bbos-stage-islamic}.js` — one-line re-exports
- `src/services/bbos-template.js`, `src/services/bbos-export.js` —
  one-line re-exports
- `src/store/project-store.js` — `seedBbosTasks` delegates to
  `buildBbosSeedTasks` from the package (~30 LOC delta); call site updated
  to pass `project.columns` (was `project.columns[0].id`)
- `src/pages/modules/Work.jsx` — replaced inline modal (lines 208-322,
  ~115 LOC removed) with `<BbosProjectTemplatePicker />`; dropped
  `Workflow` icon import and `PILLAR_OPTIONS` constant + 4 modal-state
  fields

**Files NOT touched** (kept as MILOS-private):
- `src/components/shared/{DashboardTaskCard, GLabelBadge, GLabelPicker,
  ScopeGate, ErrorBoundary}.jsx` — injected via render-props
- `src/services/ai/*` — AI client stays in MILOS; package consumes via
  `onRequestAiDraft` callback

## Carry-forward

- Atlas + Moontrance adoption deferred — they need a concrete BBOS surface
  (e.g., per-paddock BBOS pipeline for OLOS investments) before adoption
  pays off
- The package's render-prop fallbacks are intentionally minimal (smaller
  card body, plain `<select>` for G-label). Atlas/Moontrance will likely
  want their own polished render-props once they adopt
- `BbosProjectTemplatePicker` accepts `pillarOptions` /
  `submoduleOptionsForPillar` / `getSubmoduleDisplayLabel` as props with
  defaults — Atlas/Moontrance can ship their own taxonomies without
  modifying the package
