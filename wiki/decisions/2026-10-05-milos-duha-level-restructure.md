---
title: "MILOS — Duha's beginner steps move down to Growth; ordering audit filed"
type: decision
date: 2026-10-05
status: accepted
tags: [milos, prophetic-path, seed-tasks, ordering, migration, duha]
supersedes: []
superseded_by: []
---

# Duha level restructure

## Context

Operator, on the Prophetic Path Duha node: *"Task 1.1 says to Pray 2 rak'at of Duha at least 5
days this week. Task 1.2 says Set the intention before each Duha as sadaqah for every joint. Task
2.1 says Learn the time window for Duha prayer."* So the prerequisite came after the practice that
depends on it.

`buildTasksForNode` sorts a node's pool by **level first**. Task 1 was the Growth (L2) task "Salat
ad-Duha — establish…". Task 2 was the Excellence (L3) task "Pray Duha prayer regularly", which held
the beginner material: learn the window, pray 3×/week, build to daily. Excellence also asked for
**less** than Growth (3×/week vs 5 days). Reordering inside a task cannot fix a level-placement
error, so the content had to move.

## Decision

1. **Growth Duha task, new order:** learn the time window (moved byte-for-byte from Excellence) →
   intention → pray 2 rak'at 5 days → anchor to a fixed time → build toward 4 rak'at. This applies
   the [[2026-07-27-milos-seed-order-curation]] rubric: dependency, then interior before exterior,
   then low friction.
2. **Excellence keeps only "Gradually increase to daily practice"**, now starting from Growth's
   benchmark. "Pray Duha at least 3 times this week" is retired. Its one unique source (Abu
   Hurayrah's three things, Bukhari) is appended byte-for-byte to the daily-practice subtask, so
   no grounding is lost.
3. **One-shot migration** `seed_duha_restructure_v1` (`restructureDuhaSeedSubtasks` in
   `src/services/migration.js`). It moves the stored row (same `id`/`done`), removes the retired
   row unless it is done, and re-orders Growth with `alignSubtaskOrder(…, { allowDone: true })`.
   The new `allowDone` option exists because here the re-order *is* the fix. Rows travel by
   reference, so progress cannot be lost. Default behaviour is unchanged for every earlier caller.
4. **System-wide audit, report only.** `scripts/audit-task-order.mjs` →
   `stages/research-task-order-audit-draft.md`. It covers 111 boards and 16 non-prayer nodes, with
   five heuristic rules: learn-after-practice, level regression, near-duplicates, node order vs
   `seq`, and node fallback. The operator chose to review the findings before any further fixes.

## Consequences

- An operator whose Growth Duha task was fully done sees it reopen on the new first step. That's
  the same behaviour as any new seed subtask, and intended.
- The Excellence Duha task is now a single subtask. Whether it should gain more grounded content
  is open (see the gate doc).
- **Structural finding, not fixed:** node pools never consult `seq`. Within a level, `priority`
  decides the order (R4: 28 cases). Fixing it means adding `seedOrder` as a tie-break in
  `buildTasksForNode`, which is a separate decision.
- Gate: `stages/implement-duha-restructure-review.md`.

## Verification

`npm test` 314/314 (18 files), including a node-order regression test that fails 3/3 against the
pre-fix seed. `npm run lint` and `npm run build` are green. Live check in Chromium with three
sessions: fresh install, old layout with the migration blocked (stepper opens on "Set the
intention", with the learn step stuck last at E), and old layout migrated (opens on A "Learn the
time window"; the done "Pray 2 rak'at" keeps its id and tick; Excellence trimmed). Screenshotted.
