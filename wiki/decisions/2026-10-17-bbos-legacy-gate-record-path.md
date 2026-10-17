---
title: "BBOS Legacy Dashboard: Advance and Reject Go Through the Gate Record"
type: decision
date: 2026-10-17
status: accepted
tags: [bbos, gate, record, legacy-dashboard, projectboard]
superseded_by: null
---

# BBOS Legacy Dashboard: Advance and Reject Go Through the Gate Record

## Context

[[2026-10-17-bbos-gate-conditions-resolution]] left one gap open. The legacy dashboard (`BbosFullDashboard`, shown inside `ProjectBoard` when `bbiz_bbos_new_dash` is `'false'`) advanced and rejected without a record. So it wrote nothing to `project.bbosGateLog`, and it bypassed the store's open-conditions guard. The operator asked to route the ProjectBoard advance through the record path, and chose to list open conditions in the dialog and resolve them inline. They then asked for Reject to be included.

## Decision

- **Advance opens a dialog.** "Advance to X" no longer moves the stage at once. The dialog has, in order:
  - a list of the stage's open conditions (current cycle), each with an inline **Mark resolved** behind its own required basis, which logs a `'resolved'` entry;
  - a status line counting what was resolved;
  - a required **basis for the routing decision**;
  - a blocked note while conditions remain open.

  **Confirm advance** is enabled only when the basis is written and no conditions are open. It calls `onStageAdvance({ basis })`.
- **ProjectBoard follows the store.** `handleStageAdvance(record)` passes `{ basis, stageId, by }` to `advanceBbosStage`. It moves the BBOS filter and active stage only if the store actually advanced, so the view never runs ahead of a refused move.
- **Reject needs a basis too.** The Reject modal adds a required basis. Confirm calls `rejectBbosPipeline(id, reasonId, gateBy, { basis, stageId })`, which logs a `halt` entry.
- **Attribution matches the new dashboard.** The 'all' view is no role, so `by` and `rejectedBy` are null there. In preview, the first wiring passed the raw role as reviewer, and the store's `record.by ?? reviewer` fallback logged `by: "all"`. That was fixed before commit.
- **Complete Cycle is unchanged.** With no next stage, the button still confirms and calls `startNewBbosCycle`. It records nothing.
- **Modals are portalled.** Both legacy modals render through `createPortal(…, document.body)`. ProjectBoard's `.pb-content__layer--in` has a `transform`, which made `position: fixed` resolve inside the content column and clipped the overlay. This was already true for Reject before this change.

## Consequences

- Every UI gate move except Complete Cycle now leaves a record with a basis, and open conditions block Advance in both dashboards.
- The store test `src/store/__tests__/project-store-bbos-gate.test.js` (3 tests) covers recorded advance, refusal and then success after resolution, and recorded reject. It stubs `localStorage` before importing the store.
- Verified: 322 tests, lint and build green. In preview:
  - Advance listed the open condition and stayed blocked; Mark resolved required a basis; Confirm then moved CRD→STR, and the log reads conditions → resolved → proceed.
  - Reject stayed disabled without a basis, then logged a `halt` (withdrawal) entry with `by: null`.
  - Both overlays cover the full viewport.
- **Open (not changed here):** the legacy view offers "Advance to X" based on the *viewed* stage (`bbosFilter`), not `project.bbosStage`. When you view an earlier, completed stage, its Advance button still shows. This is pre-existing.

See [[bbos-pipeline]].
