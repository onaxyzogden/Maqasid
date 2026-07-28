---
phase: implement
slug: prayer-order
status: review
amanah: neutral-positive
created: 2026-07-27 00:00
---

# Review Gate: implement — prayer-order

## Summary

`wiki/decisions/2026-07-27-milos-seed-order-curation.md` deferred one item: prayer-board ordering,
on the grounds that prayer boards are *generated* rather than hand-authored. This gate covers closing
it. **It re-orders a worship surface**, which is why it is here rather than shipped as a routine fix.

The deferral's wording was too generous. Measured, the generator did not merely leave prayer
uncurated — it emitted **actively wrong** `seq`, and the surface where that order matters most never
consulted it at all.

## What was measured before the change

`buildPrayerSeedTasks()` copies faith tasks with `out[boardId].push({ ...task })`. The spread carries
the **source faith board's** `seq`, curated for a 14-task board and meaningless on a 1–3 task prayer
board. Across all 18 generated boards:

| Symptom | Extent |
|---|---|
| Out of range | all 12 `before`/`after` boards — `prayer_fajr_before` was `[4, 8, 9]` on 3 tasks |
| Duplicate | `prayer_fajr_after` was `[5, 5, 0]` |
| **Inversion** | on **all five** `_after` boards the excellence-tier "Memorise the prophetic supplications specific to each prayer" (`seq 0`) sorted **ahead of** the core "Complete the post-prayer adhkar after every salah" (`seq 5`) |
| No `seq` | the six `_during` boards |

The inversion is the reason this is a worship-surface change and not a cleanup: under sequential
locking the operator opening any prayer's After window was handed a memorisation task as step 1, with
the core adhkar locked behind it.

Second, independent defect: `buildPrayerPhaseTasks` (`NodePhaseSlideUp.jsx`) reads exactly one board
and handed it to `decorateTaskChain`, which deliberately does not sort. The prayer stepper therefore
rendered in raw `localStorage` order. The two defects masked each other.

## What changes in the seed data

A final pass in the generator overwrites the inherited `seq` with each board's own `0..n-1` position.
The default is **emission order**, already tier-ascending (`SALAH_SOURCES` runs core → growth →
excellence), which fixes the inversion on its own and is right for 15 of 18 boards. The six `_during`
boards keep the order they already had and now hold it explicitly.

Three boards are re-ordered because the **clock** disagrees with emission order. Every title listed
already lives on that board — nothing is reclassified:

| Board | Was | Now | Why |
|---|---|---|---|
| `prayer_fajr_before` | pre-prayer sunnah, waking du'a, Sayyid al-Istighfar | **waking du'a**, pre-prayer sunnah, Sayyid al-Istighfar | you wake before you take siwak and make wudu |
| `prayer_maghrib_before` | pre-prayer sunnah, evening adhkar | **evening adhkar**, pre-prayer sunnah | the evening adhkar are recited between Asr and Maghrib — before Maghrib's own preparation |
| `prayer_isha_after` | post-prayer adhkar, pre-sleep sunnah, memorise | post-prayer adhkar, memorise, **pre-sleep sunnah** | the pre-sleep sunnah genuinely ends the night; the memorisation task is not time-bound |

**No title is edited anywhere.** The seed↔storage join is exact `title` string equality, so a rename
would orphan the stored row. `description` and `sources[]` are untouched, so the grounding ratchets
structurally cannot move. `classifyTask` is untouched — no task changes boards. `PRAYER_GUIDE` stays
private and no fiqh is authored.

## Why no storage migration

`prayer` is a `PILLAR_LOADERS` key, so `backfillAndStripSeeds()` **reconciles** `seedOrder` on every
boot — the contract established by the seed-order curation ADR. A seed-file `seq` edit reaches
already-stored boards by itself. Unlike the subtask fold-in, no one-shot was written and none is
needed. Verified live: after one reload the five spot-checked boards had reconciled, with every task
`id` preserved, every `done` count 0, and `order` untouched.

**Reversal path:** revert the commit. The next boot reconciles `seedOrder` back to the previous
values. Nothing is deleted, no flag is set, no completion state is at risk.

## Files Modified

- `src/data/seed-tasks/prayer-seed-tasks.js` — exported `PRAYER_ORDER_OVERRIDES`, `curateBoardOrder()`,
  and the final pass at the end of `buildPrayerSeedTasks()`.
- `src/components/islamic/NodePhaseSlideUp.jsx` — the single-board read wrapped in `orderBoardTasks`.
- `src/data/orientation-selector.js` — **comments only, no logic change**: which caller sorts and
  which must not.
- `src/data/seed-tasks/__tests__/seed-order.test.js` — `PRAYER_SEED_TASKS` added to `PILLARS`.
- `src/data/seed-tasks/__tests__/prayer-order.test.js` — new, 5 tests.
- CONTEXT.md updates in `src/data/seed-tasks/`, `src/components/orientation/`, `src/components/islamic/`.

## Amanah Gate

- [x] Halal purpose confirmed — correcting the order in which an operator is walked through
      prayer-window adhkar and sunnah, so a core obligation is not gated behind an excellence-tier
      step.
- [x] No riba/gharar. No financial content is near this change.
- [x] **No fiqh authored, no revelation text altered.** Each of the three overrides moves an existing
      task to where the clock already places it; no task changes boards; no title, description or
      source entry is edited.
- [x] Itqan standard met — the fix is applied at the destination rather than by re-classifying source
      tasks; the override table is pinned to the seed by a set-equality drift guard; prayer is now
      inside the same ratchet as every other board, so this cannot silently regress.
- [x] Existing tests still pass — `npm test` **215 across 11 files** (was 208/10), composite
      `npm run lint` green (ESLint 0, grounding-strict conforming, inline-refs `0 ≤ 0` across 2052
      subtasks, glyphs 41), `npm run build` ✓ 1.31s.

## Key Decisions

1. **Curate at the destination, not by reclassifying the source.** The inherited `seq` is meaningless
   on a prayer board; the board's own position is assigned last and wins.
2. **Emission order is the default; only three boards are overridden.** Emission order is already
   tier-ascending, so the semantic inversion is fixed without an override table for 15 boards.
3. **All 18 boards curated, including the six `_during`** — they never render as a stepper
   (`PrayerHeroDuring` owns that tab), but leaving them uncurated would have kept prayer partially
   outside the ratchet, which is how `[5,5,0]` shipped.
4. **An unlisted title ranks to the end rather than throwing** — a newly tagged `faith_salah_*` task
   can never break the build. The drift guard is what makes a stale override loud.

## Open Questions

- None outstanding. Scope, order policy, and `_during`-board coverage were each put to the operator
  before implementation and answered.

## Reviewer Notes

[Space for human reviewer to annotate]

## Decision

- [x] **Approved** — approved in-session by the operator on 2026-07-27 (plan approval covering this
      generator curation and the popup comparator fix).
- [ ] **Rejected** — rework needed (see notes above)
