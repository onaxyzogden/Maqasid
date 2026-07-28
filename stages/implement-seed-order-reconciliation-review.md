---
phase: implement
slug: seed-order-reconciliation
status: review
amanah: neutral
created: 2026-07-27 00:00
---

# Review Gate: implement — seed-order-reconciliation

## Summary

Seed-order curation (the follow-up flagged in
`wiki/decisions/2026-07-26-milos-orientation-sequential-locking.md`) requires that a curated task
order actually reaches boards that **already exist in the operator's localStorage**, not just fresh
installs. This gate covers the persisted-data change that makes that possible.

**What changes in stored data:** exactly one integer field per seeded task — `seedOrder`.

Today `backfillAndStripSeeds()` sets `seedOrder` **only when it is missing**
(`project-store.js:151`), so re-ordering a seed file never propagates to an existing board. The
change makes that assignment a **reconciliation**: on every boot, a task whose title matches a seed
entry has its `seedOrder` set to that seed's canonical order. This mirrors the pre-existing
`backfillBbosOrder()` (`project-store.js:221-241`), which already reconciles `seedOrder` for BBOS
boards on every boot — so the pattern, the write cadence, and the risk profile are already in
production for one board family and are simply being extended to pillar boards.

## Why this is non-destructive

- **No data is deleted or overwritten except `seedOrder` itself.** Task titles, subtasks, `done`,
  `notApplicable`, `completedAt`, `snoozedUntilDayKey`, notes, tags, and user-created tasks are all
  untouched by this change.
- **User-created tasks are not affected at all** — they have no seed title match, so the
  reconciliation skips them, and the chain sort places them after the curated seed chain.
- **No progress is lost or reset.** Re-ordering the chain can change *which step is surfaced next*
  on a partially-complete board (a completed-but-later task stays complete; an incomplete-but-now-
  earlier task becomes the current step). That is the intended effect of curation, not data loss.
- **Idempotent and reversible.** Re-running produces the same result; reverting the seed data
  reverts the stored order on the next boot.
- No storage-quota risk: an integer replaces an integer.

## Files Modified

- `src/store/project-store.js` — `seedTasks()` honours an explicit `seq` on seed data;
  `backfillAndStripSeeds()` reconciles `seedOrder` instead of only filling it when undefined.
- `src/data/orientation-selector.js` — `deriveBoardSequence()` walks the board's tasks in canonical
  order (`seedOrder ?? (SEED_MAX + order)`, stable, index tiebreak) instead of raw persisted array
  order. `decorateTaskChain()` is deliberately left unsorted (the node-popup pool spans projects).
- `src/data/__tests__/orientation-selector.test.js` — sort coverage.
- `src/data/seed-tasks/__tests__/` — new permutation conformance test for `seq`.
- `src/data/seed-tasks/*-seed-tasks.js` — `seq` values on core-tier boards (content curation; no
  `description`/`sources` touched, so the grounding ratchets cannot move).

## Amanah Gate

- [x] Halal purpose confirmed — ordering existing halal task content so the operator meets
      prerequisites before dependents; no new fiqh is authored.
- [x] No riba/gharar concerns — no capital, sale, or contract surface.
- [x] Itqan standard met — the order is governed by a written rubric (dependency → obligation
      before recommendation → interior before exterior → low-friction first → keep authored order),
      recorded in the decision record rather than left to authoring accident.
- [ ] Existing tests still pass — to be confirmed at the Phase 4 gate (`npm test`, `npm run lint`,
      `npm run build`).

## Key Decisions

1. Curated order is expressed as an explicit `seq` integer on seed tasks, **not** by physically
   moving 150-line task objects inside 8k–20k-line files — the diff must be reviewable by a human
   reading covenant content.
2. `seq` is guarded by a permutation conformance test (values must be exactly `0..n-1` per board),
   so partial coverage, gaps, or duplicates fail the suite rather than silently mis-ordering.
3. The chain sorts by `seedOrder`, aligning it with every kanban/list/dashboard surface, which
   already sorted that way — the orientation chain was the sole outlier.

## Open Questions

- The kanban and list views will visibly reorder to match the curated chain. Assumed desirable
  (they and the chain should not disagree); flag if not.

## Reviewer Notes

[Space for human reviewer to annotate]

## Decision

- [x] **Approved** — approved in-session by the operator on 2026-07-27 (plan approval covering the
      `stages/` gate for this reconciliation).
- [ ] **Rejected** — rework needed (see notes above)
