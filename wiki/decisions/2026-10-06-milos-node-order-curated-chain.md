---
title: "MILOS — Prophetic Path nodes follow each board's curated chain, not seed priority"
type: decision
date: 2026-10-06
status: accepted
tags: [milos, prophetic-path, ordering, seed-tasks]
supersedes: []
superseded_by: []
---

# Node order follows the curated chain

Closes audit rule R4 from [[2026-10-05-milos-task-order-audit-pass-2]].

## Context

`buildTasksForNode` sorted a node's pool by level, then **seed priority**, then due date. Within a
level, `priority` therefore overrode every board's curated `seq`. Morning showed "Close the morning
by praying Dhuhr" (seq 7) before "Learn the conditions that invalidate salah" (seq 2), and the
audit counted 13 such cases. The Kanban, Orientation and Education already followed the chain
through `orderBoardTasks`; only nodes disagreed.

## Decision

These were operator choices, made by selection:

**level → operator due date (earliest first) → board, in the node's own submodule order →
`seedOrder`**

- Seed `priority` is no longer a sort key.
- A due date is a deliberate operator choice, so it still pulls a task ahead within its level.
- The chain key is computed exactly as `orderBoardTasks` does: `seedOrder`, else user-created
  tasks after the chain by `order` or index. A node therefore cannot contradict the Kanban.

## Consequences

- R4 went from 13 to 0, and the audit's structural note now treats any R4 row as a regression.
- **Trade-off accepted:** boards are grouped, so an urgent task on a later board waits behind the
  whole earlier board's chain on that node. With the popup capped at 20 tasks, a long node such
  as Morning (36 tasks) reaches later boards' Growth tasks only after the earlier boards' Core
  chains.
- No stored data changes, so no migration or approval gate was needed.

## Verification

- New `src/data/__tests__/prophetic-path-node-order.test.js` covers every non-prayer node in
  chain order, due-date pull-ahead and user tasks after the chain. All 5 tests fail against the
  old sort.
- `npm test` 340/340, lint and build green.
- Live check: the Morning node opens on "Learn the correct method of wudu…", the Salah board's
  seq 0.
