---
title: "BBOS Gate Conditions: Resolved by Record, and Open Ones Block Advance"
type: decision
date: 2026-10-17
status: accepted
tags: [bbos, gate, store, record, conditions]
superseded_by: null
---

# BBOS Gate Conditions: Resolved by Record, and Open Ones Block Advance

## Context

[[2026-10-17-bbos-gate-decision-log]] made Proceed-with-Conditions a real entry in `project.bbosGateLog`, but left two gaps open: a recorded condition could not be marked resolved, and it did not stop the next Advance. The operator was asked whether open conditions should **block** or only **warn** on Advance, and chose **block**.

## Decision

- **Resolution is its own entry.** A new decision type, `'resolved'`, is added to the log (`GATE_DECISIONS = proceed | conditions | halt | resolved`). Its `resolvesId` points at the conditions entry it closes, and it needs its own written basis. The conditions entry is never edited: the log stays add-only.
  - `buildGateEntry` takes `stageId` and `cycle` from the target entry, so a resolution always sits with the condition it closes.
  - It returns null when `resolvesId` is missing or unknown, when the target is not a conditions entry, or when the target is already resolved, so a condition cannot be resolved twice.
  - Every entry now carries `resolvesId` (null unless `'resolved'`).
- **`openConditions(log, stageId, cycle)`** is a pure helper that returns the unresolved conditions entries for one stage and cycle, oldest first. The adapter exposes it as `brief.gate.openConditions`.
- **Scoped to the current cycle.** Only conditions from `project.bbosCycle || 1` gate the stage. Conditions from earlier cycles stay in the record but do not block.
- **Open conditions block Advance.** This is enforced in two places:
  - **Brief (UI):** with Proceed selected and open conditions present, the Approve & Advance button is disabled. A note says how many conditions must be marked resolved first, so the disabled button explains itself.
  - **Store:** `advanceBbosStage` refuses a recorded advance (one with a `record`) while the stage it leaves has open conditions in this cycle.
- **Resolving in the Brief.** An "Open conditions" panel above the decision options lists each open condition with its text, time and role. "Mark resolved" opens a required basis field; Record Resolution stays disabled until a basis is written. It records at once (nothing moves, so there is no confirm step), and the Gate record shows the entry as "Condition resolved", with a "Resolves" line quoting the condition.
- **Resolving is allowed on any stage**, because it moves no stage.

## Consequences

- A condition is now a promise with a visible close: who resolved it, when, and on what basis.
- The store guard only applies to recorded advances. The legacy record-less advance (ProjectBoard, BbosFullDashboard) bypasses it, as it bypasses the log itself. Routing those callers through a record is a later step. *(Done: [[2026-10-17-bbos-legacy-gate-record-path]].)*
- Halt is not blocked by open conditions; a stage can still be routed to rejection.
- Verified: 319 tests, lint and build green. In preview, IDY with a recorded condition blocked Advance; marking it resolved with a basis cleared the block, and Advance moved IDY→CRD.

See [[bbos-pipeline]].
