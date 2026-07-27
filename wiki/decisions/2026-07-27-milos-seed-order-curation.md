---
title: "Seed-Order Curation — Curated `seq` for the Sequential-Locking Chain"
type: decision
date: 2026-07-27
status: accepted
tags: [milos, orientation, sequential-locking, seed-tasks, curation, data-migration]
superseded_by: null
---

# Seed-Order Curation — Curated `seq` for the Sequential-Locking Chain

## Context

[[2026-07-26-milos-orientation-sequential-locking]] made a board's task chain **ordered**: the
current task is the first non-complete task, everything after it is locked-but-previewable. Its own
closing line named the debt: *"Seed array order is now load-bearing but was authored as an unordered
set, not a dependency chain… seed-order curation is a named follow-up, not done here."*

So the operator was being locked into an order **nobody chose**. `health_physical_core` opened with
*"Audit your diet"* and put *"Identify and remove harmful substances — tobacco, alcohol, processed
foods"* last, purely because that is how the array was typed.

Four findings shaped the fix:

1. **`seedOrder` already existed** on every persisted task (set to the seed array index at seed
   time), but `backfillAndStripSeeds()` assigned it **only when missing** — so re-ordering a seed
   file reached **fresh installs only**, never a board already in `localStorage`.
2. **Every kanban/list/dashboard surface already sorted by `seedOrder ?? order`.** The orientation
   chain was the **sole outlier** — it walked raw persisted array order. The two already diverged
   whenever the backfill appended a newly-introduced seed task (appended at array end, stamped with
   its true `seedOrder`).
3. `backfillAndStripSeeds()` runs on **every boot** (idle-deferred; only its size logging is
   one-shot flagged), and `backfillBbosOrder()` **already reconciles `seedOrder` every boot** for
   BBOS boards. So the propagation mechanism was in production already — for one board family.
4. Scale: 87 hand-authored boards / ~430 tasks, of which **28 are `_core`** — and core is the only
   tier orientation surfaces for a pillar until that pillar's core is complete.

## Decision

**1. Curated order is an explicit `seq` integer on the seed task — not a physical array re-order.**
Moving 150-line task objects around inside 8k–20k-line seed files would produce a diff no human can
review, and this is covenant content that must be reviewable. `seq` is one added line per task; the
whole curation lands as **+176 insertions, 0 deletions** across 7 seed files.

**2. `seq` → `seedOrder` → the chain sorts by it.**
- `project-store.js` gains `seedChainOrder(seedTask, arrayIndex)` = `seq` when present, else the
  array index (so an uncurated board behaves exactly as before). Used by `seedTasks()` and by both
  branches of `backfillAndStripSeeds()`.
- `backfillAndStripSeeds()` now **reconciles** (`if (t.seedOrder !== seed._seedIndex)`) instead of
  only filling when undefined — same contract as `backfillBbosOrder()`. Editing `seq` in a seed file
  therefore re-orders boards **that already live in the operator's localStorage**, on the next boot.
- `orientation-selector.js` gains `orderBoardTasks(tasks)`; `deriveBoardSequence` walks its output.
  Key = `seedOrder`, else `1e6 + (order ?? index)` so **user-created tasks land after the whole
  curated chain**; sort is stable with an index tiebreak. `decorateTaskChain` is deliberately left
  **unsorted** — the Prophetic Path node-popup pool spans projects, where `seedOrder` is meaningless
  across boards.
- `task.n` remains a **display label only**, as locked by the prior ADR.

**3. A permutation conformance test guards the second source of truth.**
`src/data/seed-tasks/__tests__/seed-order.test.js`: a board either has **no `seq` at all** (falls
back to array order) or a **complete permutation of `0..n-1`**. Partial coverage, gaps, duplicates,
non-integers and out-of-range values all fail with a descriptive message. A second test is a
**curation ratchet**: no `*_core` board may be uncurated.

**4. The rubric.** Applied per board, in order; the first rule that decides, decides:

1. **Dependency** — a task that is a precondition for another precedes it. (Learning goes first only
   when it is genuinely preconditional — you cannot distribute zakah without knowing the eight
   recipients — not when the act is self-evident harm removal.)
2. **Obligation before recommendation** — fard/wajib before sunnah before T3 aspiration; harm
   removal (a prohibition) before positive practice.
3. **Interior before exterior** — self → household → community.
4. **Low-friction before high-commitment** — a one-sitting task before a 90-day programme, so a
   chain never opens with a wall.
5. **Tie-break: keep the authored order** — minimise churn.

**5. All 28 core boards are curated.** Faith 5 · Health 4 · Intellect 4 · Family 4 · Wealth 4 ·
Environment 4 · Ummah 6.

Representative outcomes:
- `health_physical_core` — *remove harmful substances* (rule 2) now first, then diet → sleep →
  movement → screening (rule 1: the physical-health dependency chain).
- `faith_salah_core` (14) — *wudu* precedes *establish the five prayers* (rule 1), then what
  invalidates salah, its adhkar, its sunan, **then** congregation (rule 3, interior→exterior), then
  the daily adhkar cycle in clock order, Tahajjud last (rule 4).
- `ummah_community_core` (10) — personal duties (attend jamaah, mend estrangement, visit the sick,
  janazah, sadaqah) **before** institution-building (establish local congregation, shura, mutual-aid
  system, visible presence) — rule 3 applied to a board that had them interleaved.
- `wealth_ownership_core` — learn ownership rules → confirm title → resolve disputed assets → draft
  the wasiyyah → audit contracts: rule 1 outranks the urgent flag on the will, because a will
  presumes you know what you own.
- Six boards were already correct and keep their authored order as an identity permutation
  (`faith_siyam_core`, `intellect_cognitive_core`, both non-land Moontrance boards, and others).

## Consequences

- The orientation chain and the kanban/list views now **agree** — the outlier is gone.
- Kanban/list ordering on core boards visibly changes to match. Assumed desirable (they should not
  disagree with the chain).
- On a partially-complete board, curation can change **which step is surfaced next** — a
  completed-but-later task stays complete; an incomplete-but-now-earlier task becomes current. That
  is the intent of curation, not data loss.
- The reconciliation is **idempotent and reversible**: revert the `seq` values and the next boot
  reverts the stored order. Approval gate: `stages/implement-seed-order-reconciliation-review.md`.
- `seq` is a second source of truth about order, held honest only by the conformance test — an
  author who adds a task to a curated board **must** give it a `seq` and renumber, or the suite
  fails loudly.

## Verification

- `npm test` **163/163** (14 new: 6 `orderBoardTasks` cases, 8 permutation/ratchet cases).
- `npm run lint` composite **fully green** — eslint 0, grounding-strict pass, inline-refs `0 ≤ 0`,
  glyphs up to date. Curation touches no `description`/`sources`, so the grounding ratchets cannot
  move; `git diff` of the seed files is **`seq:` lines only** (verified by filtering the diff).
- `npm run build` ✓ (pre-existing chunk-size/dynamic-import warnings only).
- **Preview, on already-seeded boards** (this is the migration claim, so it was tested directly):
  `health_physical_core`'s stored `seedOrder` was **manually reverted to array order** in
  `localStorage`, the page reloaded, and the curated order `1,2,3,4,0` came back. The board view then
  rendered `01 Identify and remove harmful substances → 02 diet → 03 sleep → 04 walk → 05 screening`.
  `faith_salah_core`, `wealth_ownership_core`, `ummah_community_core`, `environment_waste_core`
  verified curated in storage. `/app/orientation` now opens Faith on *"Learn the correct method of
  wudu"*, Health on *"Identify sources of haram media"*, Family on *"Remove all haram objects…"*.
  Screenshots captured (both the board and the carousel); console clean.

## Amanah Gate

**Neutral–positive.** Ordering existing halal task content so the operator meets prerequisites and
discharges obligations before recommendations; no fiqh is authored, no revelation text touched, no
capital surface. Itqan: the order is governed by a written rubric rather than authoring accident.

## Deferred (named, not done)

- **Growth + excellence boards (59)** — same rubric, follow-up session. They are uncurated and
  therefore still array-ordered, which the conformance test permits by design.
- **Prayer-board ordering** — prayer boards are *generated* from `FAITH_SEED_TASKS`; their order
  comes from the generator, not a hand-authored array.
- **Pre-existing wart:** drag-reordering a *seeded* task on the kanban writes `order`, but seeded
  boards sort by `seedOrder`, so the drag has no lasting effect. Untouched; flagged only.
