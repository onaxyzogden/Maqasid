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

## Addendum — 2026-07-27, same day: growth + excellence curated, ratchet widened to all boards

The deferral below was closed in a follow-up session rather than a later one. Measured inventory
corrected the deferral's figure: **62 boards / 251 tasks**, not 59 — faith 10, health 8, intellect 8,
family 8, wealth 8, environment 8, ummah 12. Every suffix is `growth` or `excellence`; there is no
third uncurated tier.

- **Same rubric, no amendments.** No new rule was needed for the higher tiers; the rubric's five
  rules resolved all 62 boards. Rule 5 (keep authored order) decided 8 boards outright, which now
  carry an explicit identity permutation — "already correct" is recorded, not merely assumed.
- **Representative outcomes.** `ummah_neighbors_growth` — *never gossip about your neighbour* (rule 2,
  harm removal) moves ahead of *share food*, which is urgent but a positive practice.
  `family_marriage_growth` — *conflict resolution from the Sunnah* then *return to family after Asr*
  precede the weekly marriage meeting and the shared book (rules 2 → 4). `environment_ecosystem_growth`
  — *learn your local ecosystem* moves first as a genuine precondition for *plant native species*
  (rule 1). `intellect_cognitive_growth` — habit-formation science first (precondition), then Quran
  memorisation ahead of Deep Work blocks (rule 2 outranking rule 4). `ummah_moontrance-land_growth` —
  water → soil → planting → habitat → community work days, the permaculture dependency chain (rule 1).
  `ummah_community_growth` (10) — sulh before institution-building; its **four duplicated task pairs**
  were kept adjacent rather than silently deduplicated (see deferred, below).
- **The ratchet now covers every board, not just core.** `seed-order.test.js`'s second test dropped
  its `_core` filter: any hand-authored board across all three tiers that lacks `seq` fails the
  suite, so **a new board must arrive curated**. The permutation test is unchanged.
- **Verification.** `npm test` 163/163; `npm run lint` composite green (inline-refs `0 ≤ 0`, glyphs
  up to date); `npm run build` ✓. Seed-file diff is **+251 insertions / 0 deletions, every added line
  a `seq:` line** (verified by filtering the diff for non-`seq` additions — none). Migration
  re-verified at runtime: all 62 growth/excellence boards were already in `localStorage` with
  `seedOrder` = array order; after one reload `family_marriage_growth` read `2,4,0,3,1` and
  `ummah_community_growth`, `faith_salah_growth`, `environment_sourcing_growth`,
  `intellect_cognitive_growth` all matched their curated mappings exactly. `orderBoardTasks`, invoked
  live in the running app against real stored data, returned the curated chain for
  `family_marriage_growth`. **No screenshot this pass** — the Browser pane was not displayed, so the
  screenshot tool timed out; verification is runtime/DOM-level, and the rendering path itself is
  unchanged code already screenshot-verified on core boards above.
- **Not a defect, worth recording:** the LevelNavigator segment bar (`fln__subseg`) groups by tag and
  sorts by priority — it is *not* a chain surface and deliberately does not follow `seq`.

Board totals after this addendum: **90 hand-authored boards curated** (28 core + 62 growth/excellence).

## Deferred (named, not done)

- ~~**Growth + excellence boards (59)**~~ — **closed by the addendum above** (62 boards, same day).
- ~~**`ummah_community_growth` carries four duplicated task pairs** (education, sulh, youth, treasury)
  and `ummah_moontrance-land_excellence` two (replicable stewardship model)~~ — **closed same day** by
  [[2026-07-27-milos-ummah-task-dedupe]]. Note the count recorded here was wrong:
  `moontrance-land_excellence` carries **one** pair, not two, so the honest figure is **5 removals
  across 10 tasks**, not six.
- ~~**Prayer-board ordering** — prayer boards are *generated* from `FAITH_SEED_TASKS`; their order
  comes from the generator, not a hand-authored array.~~ — **closed same day** by
  [[2026-07-27-milos-prayer-board-ordering]], which found the wording above too generous: the
  generator did not merely leave prayer uncurated, it emitted **actively wrong** `seq`. Every copied
  task carried its *source* faith board's value — out of range on all 12 `before`/`after` boards,
  **duplicated** on `prayer_fajr_after` (`[5,5,0]`), absent on the six `_during` boards, and inverted
  on **all five** `_after` boards, where the excellence-tier memorisation task sorted **ahead of** the
  core post-prayer adhkar. Compounding it, `buildPrayerPhaseTasks` handed its single board to the
  non-sorting `decorateTaskChain`, so the prayer stepper ignored the chain entirely. All 18 generated
  boards are now curated in the generator and inside this file's ratchet. **Board totals: 108.**
- ~~**Pre-existing wart:** drag-reordering a *seeded* task on the kanban writes `order`, but seeded
  boards sort by `seedOrder`, so the drag has no lasting effect~~ — **closed same day** by
  [[2026-07-27-milos-board-order-single-authority]], which also found that the claim above ("every
  kanban/list/dashboard surface already sorted by `seedOrder ?? order`" → *the chain and the boards
  now agree*) held on **one** surface only: six component copies used `seedOrder ?? order` while
  `orderBoardTasks` uses `seedOrder ?? 1e6 + order`, so **user-created** tasks still sorted before the
  curated chain on the boards and after it in the chain.
