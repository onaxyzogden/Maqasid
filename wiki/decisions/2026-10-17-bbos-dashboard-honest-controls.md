---
title: "BBOS Dashboard: Honest Controls and a Protected Gate Decision"
type: decision
date: 2026-10-17
status: accepted
tags: [ui, ux, accessibility, bbos, gate]
superseded_by: null
---

# BBOS Dashboard: Honest Controls and a Protected Gate Decision

## Context

A UX audit (`/ux-engine:ux-audit`) of the redesigned BBOS pipeline dashboard (`src/components/bbos/pipeline-dashboard/`, behind `bbosNewDashboard`) found three P0s:

1. Most write controls in the Execution View had no `onClick`. "Close Cycle" looked like it worked and did nothing.
2. Typed text was uncontrolled, never saved, and one scrim click threw it away. This included the gate basis, which is the written record of a covenant routing decision.
3. Approve & Advance and Halt fired on one click, with no basis required and no confirmation.

## Decision

- **No dead primary controls.** A control is either wired to a store or rendered `disabled` with a visible "Not wired in this preview: nothing is saved yet" note (the `NOT_WIRED` constant in `BbosExecView.jsx`). This extends the honesty the Brief already showed with "Close Cycle (deferred)". Wired now: Mark Reviewed & File → `taskStore.moveTask` to the Done column.
- **The gate decision needs a written basis and a second step.** The basis textarea is controlled and required. The action button opens an inline confirm that restates the stage move before `onAdvance()` / `onReject(reasonId)` fire.
- **One shared dialog hook.** `useBpdDialog({ onClose, dirty })` owns scroll-lock, focus in and restore, Esc, the Tab trap, and the discard prompt. Every close path goes through `requestClose`, so the prompt can't be bypassed.
- **A11y baseline:** a `:focus-visible` gold ring instead of a blanket `outline:none`, AA tertiary contrast tokens, real buttons and radio/checkbox roles instead of clickable divs.

## Held

The basis and closing reflection are **not persisted**. Saving them needs `advanceBbosStage` / `rejectBbosPipeline` in project-store to take a basis argument, an architecture touch held for the operator's separate approval. Until then the dirty guard stops silent loss but does not keep a record.

## Consequences

- Future preview controls in this dashboard must follow the disabled + `NOT_WIRED` pattern, never a styled button with no handler.
- New modals in the folder should use `useBpdDialog` rather than re-implementing Esc and focus handling.
- Still open from the audit: Proceed-with-Conditions logging, a read-only overview for locked stages, mobile layout, FieldGrid labels, a gate-check three-state legend, arrow-key nav for radiogroups and tabs, and an Undo toast for Advance.

See [[bbos-pipeline]].
