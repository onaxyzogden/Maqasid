---
title: "MILOS — BBOS Exec View: Download/Upload wiring + adaptive tabs"
type: decision
created: 2026-06-18
tags: [milos, bbos, pipeline-dashboard, ux, exec-view]
status: accepted
---

# MILOS — BBOS Exec View: Download/Upload wiring + adaptive tabs

## Context

The BBOS Execution View modal (`BbosExecView`) had two gaps after the pipeline
dashboard was shipped:

1. **The "Import Stage Pack (JSON)" paste-button was inert.** "Parse & Stage for Review"
   called `setImportOpen(false)` only — explicitly deferred with a comment ("All
   write-actions are inert this pass"). Meanwhile, identical Download/Upload logic
   already existed in the ProjectBoard header (`handleStageDownload` /
   `handleStageUpload` via `src/services/bbos-template.js`).

2. **All four tabs were always rendered** regardless of whether the tab had content
   for the current stage. IDY shows empty Asset Factory and Execution tabs because all
   IDY tasks are `S`/`PATCH` prefix (research only; no `A`/`AF`/`IC` deliverables, no
   `executionTasks`).

## Decisions

### 1. Wire Import + add Download and Upload buttons

The Research Factory tab now has:
- **↓ Download `STAGE_ID`** — calls `downloadStageBundleTemplate(stage.id, stageDefs,
  existingTasks)` (same service as ProjectBoard). Pre-fills with existing task field
  data so the operator can see what is already captured before editing.
- **↑ Upload `STAGE_ID`** — opens a hidden `<input type="file" accept=".json">`, reads
  the file, validates via `validateStageBundleTemplate`, merges via
  `importStageBundleTemplate` → `taskStore.updateTask`. Mirrors `handleStageUpload` in
  ProjectBoard exactly.
- **Paste-Import trigger** — existing dashed-border box is kept; the "Parse & Stage for
  Review" button now runs the same validate+merge pipeline as the upload path.
- **Inline feedback** — `parseSuccess` (teal) and `parseError` (red) shown in the
  download row and inside the paste panel respectively; both cleared on next open.

`projectId` was added as a new prop to `BbosExecView`; `BbosPipelineDashboard` passes
`project.id` down.

### 2. Adaptive tabs — hide tabs with no content for the current stage

The non-retro tabs array is now conditionally built:

```js
[
  { id: "research", ... },                          // always
  ...(exec.assetItems?.length > 0 ? [assets] : []),
  ...(exec.executionTasks?.length > 0 ? [execution] : []),
  { id: "gate", ... },                              // always
]
```

- **Research Factory** and **Gate Check** are always present (always have content for
  non-retro stages).
- **Asset Factory** appears only when `exec.assetItems` is non-empty (`A`/`AF`/`IC`
  prefix tasks — starts at CRD).
- **Execution** appears only when `exec.executionTasks` is non-empty (execution-layer
  stages OUT, SLS, DEL only).
- Retro (OPT) tabs are unchanged — all three retro tabs always render.

By stage:

| Stage | Research | Assets | Execution | Gate |
|---|---|---|---|---|
| IDY | ✓ | — | — | ✓ |
| CRD / STR / OFR / RET | ✓ | ✓ | — | ✓ |
| OUT / SLS / DEL | ✓ | ✓ | ✓ | ✓ |
| OPT | metrics / BHI / restoration (unchanged) |

## Implementation

- **`BbosExecView.jsx`** — `useRef`, `handleDownload`, `handleUpload`, `handleParse`
  (wired), `parseError`/`parseSuccess` state, `projectId` prop, download/upload buttons
  + hidden file input, adaptive tabs array.
- **`BbosPipelineDashboard.jsx`** — passes `projectId={project.id}` to BbosExecView.
- **`BbosPipelineDashboard.css`** — `.bpd-dl-row`, `.bpd-dl-btn`, `.bpd-dl-btn__stage`,
  `.bpd-parse-result--ok`, `.bpd-parse-result--err`.

## Reused services

- `downloadStageBundleTemplate`, `validateStageBundleTemplate`,
  `importStageBundleTemplate` from `src/services/bbos-template.js` — unchanged.
- `getBbosTaskDefsByStage` from `src/data/bbos/bbos-task-definitions.js` — unchanged.
- `useTaskStore` / `taskStore.updateTask` — unchanged.

## Verification

- `npm run build` ✓ · `npm run lint` ✓ (grounding ratchets at 0) · `npm test` ✓
  (77 passed).
- Preview DOM checks: "↓ Download IDY" button present; import trigger icon ↑; stage
  mismatch error ("this bundle is for 'CRD', but the active stage is 'IDY'") and parse
  error (malformed JSON) both surface inline; no console errors.

## Related

- [[milos]]
- [[bbos-pipeline]]
- [[2026-06-05-milos-islamic-layer-rail]] — prior MILOS pipeline dashboard pass
