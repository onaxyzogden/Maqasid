---
title: "BBOS gate Undo is a recorded reversal, never a deletion"
type: decision
date: 2026-10-17
status: accepted
project: milos
tags: [bbos, gate-log, undo, amanah]
---

# BBOS gate Undo is a recorded reversal, never a deletion

## Context

Main's UX audit (`4673e6d`) gave the redesigned BBOS dashboard Undo toasts on Advance and Reject. That Undo put back a snapshot of the whole project, so it also deleted the decision just recorded. When PR #56 caught up with main, the operator chose "gate log wins" ([[2026-10-17-bbos-gate-decision-log]]): `bbosGateLog` is only ever added to, so a snapshot Undo could not stay. The toasts were dropped. The operator then asked for them back on top of the gate log.

## Decision

Undo puts the pipeline back and **adds** a `'reversed'` entry that points at the undone decision. Nothing in the log is deleted. The operator chose this over the alternatives ("Add a 'reversed' entry (Recommended)").

- **Pure helpers (`src/data/bbos/bbos-gate-log.js`)**
  - `'reversed'` joins `GATE_DECISIONS`. New entry field `reversesId`, null on every other decision.
  - `buildGateEntry` accepts a reversal only when the target is the **last entry in the log** and is a `proceed`, `halt` or `cycle`. That one rule also rules out a double reversal, reversing a reversal, and reaching back past later decisions. The entry takes the target's stage and cycle. It still needs a basis.
  - `reverseGateDecision(project, entryId, { basis, by })` adds the entry and restores the pipeline:
    - proceed: `bbosStage` goes back to the stage it left
    - halt: `rejectedAt`, `rejectionReason` and `rejectedBy` are cleared
    - cycle: `bbosCycle` and `bbosStage` go back to the closing cycle at OPT
    - If the reversal is refused, it returns the same object.
  - `isReversed(log, id)`.
- **Store:** `reverseBbosGateDecision(projectId, entryId, { basis, by })`. It works on any BBOS project and is deliberately not blocked by `rejectedAt`, because undoing a Halt has to work on a rejected project.
- **Redesigned dashboard:** Advance, Halt and Close Cycle show an info toast with Undo (15s, `useUndoToast` with `duration`). Messages: "Advanced to Stage NN — Name", "Pipeline routed to rejection", "Cycle N closed — Cycle N+1 begins". A toast appears only if the move actually wrote its entry, so a move refused for open conditions shows none. The fixed basis is "Undone from the confirmation toast moments after the decision." and is attributed to the acting role.
- **Gate record:** a `Reversed` entry shows "Undoes <decision> · <time>". The undone entry stays in place, struck through and dimmed, with a "(reversed)" tag.
- **Confirm copy:** the inline confirm used to say "cannot be undone here", which is no longer true. It now says Undo is available for 15 seconds and that the decision stays in the gate record.

## Amanah

The record of each decision stays whole. A reversal is a decision in its own right, with its own time, basis and attribution, so the log never claims something happened differently from how it did.

## Out of scope

- The legacy BbosFullDashboard / ProjectBoard Advance, Reject and Complete Cycle get no Undo. Main never had one there either.
- Reversing anything other than the last decision. Correcting an older decision is a new gate decision, not an Undo.

## Verification

- 431 tests pass (5 new reversal tests). Lint and build are green.
- Preview on the test project:
  - Proceed STR→OFR, then Undo: back at STR, with a `reversed` entry pointing at the Proceed.
  - Halt, then Undo: rejection fields null.
  - Close Cycle at OPT (IDY / cycle 2), then Undo: back at OPT / cycle 1.
  - A toast left to expire leaves the log unchanged.
  - Screenshots of all three Gate records. No console errors.

## Observation (not acted on)

During testing the default 6s toast window was easy to miss. It ran out between ordinary tool round-trips more than once. **Resolved:** gate toasts now stay up 15s (`GATE_UNDO_MS`). A "Reverse last decision" control in the Brief was considered and not built. It would allow reversing long after the decision, which is a different act from an immediate correction, and it would need its own basis input rather than the fixed toast basis. Reversing an older decision stays a matter for a fresh gate decision with its own basis.
