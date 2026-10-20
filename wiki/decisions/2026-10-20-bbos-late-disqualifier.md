---
title: "BBOS Late ★ Disqualifier: a Banner and a Hold on Every Stage After CRD"
type: decision
date: 2026-10-20
status: accepted
tags: [bbos, gate, store, amanah, banner]
superseded_by: null
---

# BBOS Late ★ Disqualifier: a Banner and a Hold on Every Stage After CRD

## Context

[[2026-10-19-bbos-named-gates]] evaluates the Amanah gate only when the project leaves CRD. Its first known limit: a ★ disqualifier (CRD-FP02 Q3, Q5 or Q8) answered YES after the project has left CRD is not acted on, though the doc says "Reject immediately". The operator approved `.claude/plans/bbos-late-disqualifier.md`, with two choices: add an `amanah_disqualifier` rejection reason, and ship as PR B stacked on PR A (#73, which lands #72 on main).

## Decision

- **The evaluator holds the stage.** `lateDisqualifier(stageId, tasks)` in `bbos-named-gates.js` returns an `amanahLate` gate, `blocked`, for any stage after CRD (by `BBOS_STAGES` order) while CRD-FP02 holds a ★ YES. Its reasons keep "automatic disqualifier" and "Reject immediately" as written. `evaluateStageGates` puts it first, so every caller holds without new wiring: `gateMoveRefusal` (store `advanceBbosStage` and `startNewBbosCycle`), the Brief's Named gates panel and Proceed lock, the legacy `BbosGateMoveDialog`, and the stage strip. At CRD the existing Amanah gate stands alone; before CRD nothing is added.
- **No override.** Acknowledgements and resolved conditions do not clear it. The only ways out are answering the ★ question NO (a correction of the record) or Halt.
- **A banner on both dashboards.** `BbosLateDisqualifierBanner` shows the gate's name, reasons and cite, unworded, plus "Advancing and closing the cycle are held on every stage after CRD. There is no override." It shows on every stage view while the project is after CRD with a ★ YES and is not rejected. It writes nothing.
- **Halt is offered, through the existing flows.** A new reason `amanah_disqualifier` ("Amanah ★ disqualifier") in `BBOS_REJECTION_REASONS`. Redesigned dashboard: Halt opens the Brief on the current stage with Halt and that reason chosen, focus in the basis field. Legacy: Halt opens the existing Reject modal with that reason, from any stage filter. Both append a `'halt'` entry through `rejectBbosPipeline`; no past `bbosGateLog` entry is edited.

## Deviations from the plan

- **One shared banner component**, not one per dashboard. Each dashboard maps its own colour tokens onto it.
- **`role="region"`, not `role="alert"`.** The banner stays up on every stage view; an alert would be re-announced on each mount.
- **The legacy green "stage ready" strip is hidden** while the late gate holds; the blocked strip shows "Tasks done, but Advance is held by the Amanah Gate (on file from CRD) above. There is no override."
- **The legacy halt is recorded at `bbosStage`**, the pipeline's current stage, not at the filtered stage being viewed, and the modal says so.

## Consequences

- A project after CRD with a ★ YES on file cannot Advance or Close Cycle; the store refuses as well as the UI.
- Verified: 553 tests (new evaluator and store tests written first), lint and build green. Screenshot-checked in preview: the legacy banner and Reject modal (reason pre-selected, Confirm disabled until a basis is written, "Recorded at Structure"); the redesigned banner and Brief (Proceed locked, Halt and the Amanah reason pre-selected). Fixture restored; no halt was recorded.
- **Follow-ups, not built here:**
  - Halt role-gating differs: the legacy banner offers Halt only to the Owner of CRD-V1 (or the "all" role), the redesign to any role.
  - The legacy Reject modal has no Escape handling or focus restore (the shared `Modal.jsx` would fix both).
  - The CRD rail still shows "✓ Amanah Gate", which is historically true but may read as current.
  - The legacy `BbosGateMoveDialog` with Confirm disabled by the late gate was not screenshotted (it needs every STR task Done); its lock comes from the same `gateMoveRefusal`, covered by tests.

See [[bbos-pipeline]].
