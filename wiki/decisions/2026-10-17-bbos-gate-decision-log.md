---
title: "BBOS Gate Decision Log: The Basis Is Kept With the Decision"
type: decision
date: 2026-10-17
status: accepted
tags: [bbos, gate, store, persistence, record]
superseded_by: null
---

# BBOS Gate Decision Log: The Basis Is Kept With the Decision

## Context

[[2026-10-17-bbos-dashboard-honest-controls]] made the gate basis required and put a confirm step before Advance/Halt. It held one thing back: the basis and closing reflection were not saved, because that needed a change to the project-store signature. The operator approved that change, and asked for Proceed-with-Conditions to be logged on top of it. Before this, that option's button read "Logged — No Stage Change" while staying disabled, so nothing was ever logged.

## Decision

- **A log you only add to:** `project.bbosGateLog`, an array on the project, persisted in `bbiz_projects`. Existing entries are never edited or removed. Each entry looks like this: `{ id: 'gd_…', at, cycle, stageId, decision: 'proceed'|'conditions'|'halt', basis, conditions, reasonId, toStageId, closingNote, by }`.
- **Pure helpers in `src/data/bbos/bbos-gate-log.js`** (`buildGateEntry`, `appendGateEntry`, `gateEntriesForStage`), tested without `localStorage`.
  - An entry is refused if the basis is empty, the stage is missing, or the decision type is unknown.
  - Fields are kept only where they belong: conditions on a conditions entry, a reason on a halt, a target stage on a proceed.
- **The store signatures are extended without breaking anything.**
  - `advanceBbosStage(projectId, stageId, record?)` and `rejectBbosPipeline(projectId, reasonId, reviewer?, record?)` take an optional trailing record. The legacy callers (ProjectBoard, BbosFullDashboard) pass none, so they are unchanged.
  - The new `logBbosGateDecision(projectId, record)` records a decision without moving the stage. It is a no-op on a project that is rejected or not on BBOS.
- **Proceed with Conditions is a real record.**
  - It needs written conditions and a basis.
  - It has no confirm step, because it moves nothing.
  - It clears the form, shows a status line, and leaves the Brief open.
- **The decisions are visible.** A "Gate record" list in the Brief's Stage Decision section shows the stage's own entries, newest first. Each shows the decision, cycle, time and role, then the reason, basis, conditions and closing note. The data comes through the adapter (`brief.gate.log`), so the single data seam holds.
- **Attribution:** `by` is the acting BBOS role. `'all'` is the view-everything filter, not a person, so it is recorded as unattributed (null).

## Consequences

- The written basis of a covenant routing decision now outlives the click. A Halt keeps its reason and basis alongside `rejectedAt`.
- Recorded conditions do **not** block the next Advance, and there is no way to mark them resolved yet. Gating Advance on open conditions is a later decision.
- The Stewardship Closing note is saved only with a stage decision, not on its own.
- Brief project fields, readiness checks and Exec View notes are still not persisted.

See [[bbos-pipeline]].
