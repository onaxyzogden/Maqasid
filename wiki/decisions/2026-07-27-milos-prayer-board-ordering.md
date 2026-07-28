---
title: "MILOS — prayer-board ordering: curate at the destination, and make the popup actually sort"
type: decision
date: 2026-07-27
project: MILOS
status: accepted
amanah: neutral-positive
tags: [milos, seed-tasks, prayer, ordering, sequential-locking]
---

# Prayer-board ordering

Closes the **last** open item on [[2026-07-27-milos-seed-order-curation]]'s deferred list:

> **Prayer-board ordering** — prayer boards are *generated* from `FAITH_SEED_TASKS`; their order
> comes from the generator, not a hand-authored array.

Its two siblings were closed the same day by [[2026-07-27-milos-ummah-task-dedupe]] and
[[2026-07-27-milos-board-order-single-authority]]. Operator direction: *"the prayer-board generator
ordering, the last item still open from the seed-order curation deferral."*

## Context — the deferral was too generous to itself

"Their order comes from the generator" implied *uncurated but harmless*. Measured, it was worse than
uncurated: the generator emitted **actively wrong** `seq`, and the surface where that order matters
most never consulted it at all. The two defects masked each other — fixing either alone would have
looked fine or made things visibly worse.

### Defect 1 — every copied task carried its SOURCE board's `seq`

`buildPrayerSeedTasks()` copies tasks out of `FAITH_SEED_TASKS` with `out[boardId].push({ ...task })`
([prayer-seed-tasks.js](../../src/data/seed-tasks/prayer-seed-tasks.js)). The spread carries `seq`,
which was curated for a 14-task faith board and is meaningless on a 1–3 task prayer board. Measured
across all 18 generated boards before the fix:

| Symptom | Extent |
|---|---|
| Out of range | **all 12** `before`/`after` boards — e.g. `prayer_fajr_before` was `[4, 8, 9]` on 3 tasks |
| Duplicate | `prayer_fajr_after` was **`[5, 5, 0]`** — two tasks sharing one `seedOrder` |
| **Semantic inversion** | on **all five** `_after` boards the *excellence*-tier "Memorise the prophetic supplications specific to each prayer" (`seq 0`) sorted **ahead of** the *core* "Complete the post-prayer adhkar after every salah" (`seq 5`) |
| No `seq` at all | the **six** `_during` boards — array-order fallback, correct today only by accident of the private `PRAYER_GUIDE` literal |

The inversion is the one that mattered. Under sequential locking, the operator opening any prayer's
After window was handed a memorisation task as step 1 and the core adhkar as step 2 — the chain
locked behind an excellence-tier step. The generator also iterates `FAITH_SEED_TASKS` in **array**
order, which is not its curated order (`faith_salah_core`'s `seq` in array order is
`[1,0,3,6,2,4,5,8,9,10,11,7,12,13]`), so emission order was not inheriting curation either.

### Defect 2 — the prayer popup never sorted

`buildPrayerPhaseTasks` ([NodePhaseSlideUp.jsx](../../src/components/islamic/NodePhaseSlideUp.jsx))
reads exactly one board out of `tasksByProject` and handed it straight to `decorateTaskChain`, which
**deliberately does not sort** ([orientation-selector.js](../../src/data/orientation-selector.js)).
So the prayer stepper rendered in raw `localStorage` order and ignored the chain entirely.

`decorateTaskChain`'s board-free design is *correct* — for the **non-prayer** node pool, which spans
projects, where `seedOrder` is cross-board meaningless. The prayer branch is the exception: it owns
exactly one board, so `seedOrder` is meaningful across it and it belongs behind `orderBoardTasks`.

### Test gap — this is how `[5, 5, 0]` shipped

`seed-order.test.js` never imported `PRAYER_SEED_TASKS`. Prayer sat outside **both** the permutation
invariant and the curation ratchet that guard the other 90 boards. (`grounding.test.js` already has a
prayer bucket, so the precedent for testing generated prayer data existed.)

## Decision

### 1. Curate at the destination, in the generator — the board's own position wins

A new final pass in `buildPrayerSeedTasks()` **overwrites** the inherited `seq` with each board's own
`0..n-1` position, applied once every board is fully populated:

```js
for (const boardId of Object.keys(out)) out[boardId] = curateBoardOrder(boardId, out[boardId]);
```

`curateBoardOrder` returns `ordered.map((t, i) => ({ ...t, seq: i }))` — spread order is load-bearing,
our `seq` overwrites the inherited one.

The **default is emission order**, which is already tier-ascending because `SALAH_SOURCES` runs
core → growth → excellence. That alone fixes the inversion, and is right for 15 of the 18 boards. The
six `_during` boards, which had no `seq` at all, keep the order they already had — sunnah-before →
farḍ → sunnah-after → witr → reminders — but now hold it **explicitly** rather than by array-order
accident.

### 2. Three overrides, and only where the clock disagrees

`PRAYER_ORDER_OVERRIDES` is an exported literal keyed by board id, listing titles in intended order.
Nothing is reclassified: every title listed already lives on that board.

| Board | Was (emission order) | Now | Why |
|---|---|---|---|
| `prayer_fajr_before` | pre-prayer sunnah, waking du'a, Sayyid al-Istighfar | **waking du'a**, pre-prayer sunnah, Sayyid al-Istighfar | you wake before you take siwak and make wudu |
| `prayer_maghrib_before` | pre-prayer sunnah, evening adhkar | **evening adhkar**, pre-prayer sunnah | the evening adhkar are recited *between Asr and Maghrib* — before Maghrib's own preparation, not after it |
| `prayer_isha_after` | post-prayer adhkar, pre-sleep sunnah, memorise | post-prayer adhkar, memorise, **pre-sleep sunnah** | the pre-sleep sunnah genuinely ends the night; the memorisation task is not time-bound, so it yields the last slot despite being excellence tier |

An **unlisted** title ranks to the end rather than throwing, so a newly tagged `faith_salah_*` task
can never break the build. The drift guard (below) is what makes a stale override loud instead of
silent.

### 3. Route the prayer popup through the one comparator

`buildPrayerPhaseTasks` now wraps its single-board read in `orderBoardTasks(...)` — reusing the app's
single comparator rather than inlining `a.seedOrder - b.seedOrder`, per
[[2026-07-27-milos-board-order-single-authority]]. `decorateTaskChain` stays unsorted; both it and
`orderBoardTasks` gained comments stating precisely which caller is which, since "does not sort" read
as a blanket rule and is the reason this was missed.

Worth recording: the Maghrib daily reset sets `order: 0` on every reverted task
([task-store.js](../../src/store/task-store.js)), so on prayer boards `seedOrder` is the **only**
stable ordering — the `order` fallback is collapsed by design.

### 4. Prayer joins the ratchet

`PRAYER_SEED_TASKS` is added to `seed-order.test.js`'s `PILLARS`, so all 18 generated boards are now
inside the permutation invariant **and** the curation ratchet, alongside the 90 hand-authored ones.
A new `__tests__/prayer-order.test.js` adds the generator-specific guards that file cannot express:

- `seq === array index` on every board — proves no inherited value survives;
- no duplicate `seq` on `prayer_fajr_after` — the pinned regression;
- every `_after` board opens on the core adhkar with the memorisation task strictly after it;
- the three clock overrides land;
- **drift guard** — each `PRAYER_ORDER_OVERRIDES` entry's title set deep-equals its board's actual
  title set, both directions. Retitling or retagging a `faith_salah_*` task fails loudly instead of
  silently degrading that board back to emission order. Same shape as `FOLDED_SUBTASK_ORDER`'s guard
  in [[2026-07-27-milos-subtask-foldin]].

## Why no migration

`prayer` is a `PILLAR_LOADERS` key ([seed-hydrator.js](../../src/services/seed-hydrator.js)), so
`backfillAndStripSeeds()` **reconciles** `seedOrder` on every boot
([project-store.js](../../src/store/project-store.js)) — the contract established by
[[2026-07-27-milos-seed-order-curation]]. A seed-file `seq` edit therefore reaches already-stored
boards by itself. Unlike the subtask fold-in, this needed no one-shot, and none was written.

## Not touched

- **`classifyTask`** — no task changes boards. This re-orders rows the file already ships.
- **`PRAYER_GUIDE`** — stays private; no fiqh is authored here.
- **Every title, everywhere** — the seed↔storage join is exact `title` string equality and a rename
  orphans the stored row.
- **`description` / `sources`** — untouched, so the grounding ratchets structurally cannot move.

## Verification

- **Seed level:** all 18 boards print a clean `[0,1,2,…]`; **0 non-conforming**. Before the fix,
  `prayer_fajr_after` printed `[5,5,0]`.
- **Gates:** `npm test` **215 passed across 11 files** (was 208/10); composite `npm run lint` green —
  ESLint 0, grounding-strict conforming, inline-refs `0 ≤ 0` across 2052 subtasks / 8 pillars (prayer
  bucket 0), glyphs 41 up to date; `npm run build` ✓ 1.31s.
- **Storage level, live after one reload:** the boot reconciliation delivered the change with no
  migration — `prayer_fajr_after` → `seedOrder 0,1,2` (duplicate gone, core adhkar first),
  `prayer_fajr_before` → `1,0,2`, `prayer_maghrib_before` → `1,0`, `prayer_isha_after` → `0,2,1`,
  `prayer_asr_after` → `0,1`. Every task `id` preserved, every `done` count 0, `order` untouched.
  The stored **array** order still differs from the curated order — direct evidence that the popup
  comparator fix is what makes the curation visible.
- **UI, screenshots captured this pass.** `/app/work/prayer_asr_after/tasks` renders **01** Complete
  the post-prayer adhkar / **02** Memorise the prophetic supplications — the inversion is gone.
  `/app/work/prayer_fajr_before/tasks` renders **01** Reclaim the day with the waking du'a / **02**
  pre-prayer sunnah / **03** Sayyid al-Istighfar — the override applied, and applied against a stored
  array order of `1,0,2`, so the comparator is demonstrably doing the work.
- **No screenshot of the Prophetic Path node popup itself** — reaching it means passing
  `CeremonyGuard`'s Daily Niyyah, and both ways past it write to the operator's daily spiritual
  record. Declined for the same reason as [[2026-07-27-milos-subtask-foldin]], and disclosed rather
  than worked around. The popup's fix is covered by the Work-board evidence above (same comparator,
  same data) plus the test suite.

## Amanah Gate

- [x] **Halal purpose** — correcting the order in which an operator is walked through prayer-window
      adhkar and sunnah, so the core obligation is not gated behind an excellence-tier step.
- [x] **No riba/gharar.** No financial content anywhere near this change.
- [x] **No fiqh authored, no revelation text altered.** Each of the three overrides moves an existing
      task to where the clock already places it. No task changes boards, no title, description or
      `sources[]` entry is edited, and `PRAYER_GUIDE` is untouched.
- [x] **Itqan** — the fix is at the destination (where the ordering is meaningless) rather than by
      re-classifying source tasks; the override table is pinned to the seed by a set-equality drift
      guard; prayer is inside the same ratchet as every other board so this cannot silently regress.
- [x] **Existing tests pass** — 215/11, composite lint green, build ✓.

## Risks accepted

| Risk | Mitigation |
|---|---|
| An override title drifts from `faith-seed-tasks.js` and the board silently degrades to emission order | the drift guard — set equality, not membership, so both directions fail |
| A later `faith_salah_*` retag lands a new task on an overridden board | `-1 → end` keeps the build valid; the drift guard fails the suite so it gets curated deliberately |
| The order changes under an operator mid-day | it changes *to* the curated one; no task is added, removed or re-boarded, and the daily reset clears only checkboxes |
| `seq` on the six `_during` boards conflicts with `PrayerHeroDuring` | that tab renders the inline guide, not the board — `seq` only affects the Work-board view of those six |

## Files

- `src/data/seed-tasks/prayer-seed-tasks.js` — `PRAYER_ORDER_OVERRIDES`, `curateBoardOrder`, final pass.
- `src/components/islamic/NodePhaseSlideUp.jsx` — single-board read wrapped in `orderBoardTasks`.
- `src/data/orientation-selector.js` — comments only, no logic: which caller sorts and which must not.
- `src/data/seed-tasks/__tests__/seed-order.test.js` — prayer added to `PILLARS`.
- `src/data/seed-tasks/__tests__/prayer-order.test.js` — new, 5 tests.
- Gate doc: `stages/implement-prayer-order-review.md`.

## Related

- [[2026-07-27-milos-seed-order-curation]] — the deferral this closes; the `seq` mechanism and rubric.
- [[2026-07-27-milos-board-order-single-authority]] — why `orderBoardTasks` is the only comparator.
- [[2026-07-27-milos-subtask-foldin]] — the drift-guard pattern, and the same Daily Niyyah disclosure.
- [[2026-07-25-milos-prayer-popup-consolidation]] — why the popup reads prayer boards directly.
