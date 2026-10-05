---
phase: implement
slug: duha-restructure
status: review
amanah: positive
created: 2026-10-05 00:00
---

# Review Gate: implement — duha-restructure

## Summary

On the Prophetic Path **Duha** node, the During stepper read:

- 1.1 "Pray 2 rak'at of Duha at least 5 days this week"
- 1.2 "Set the intention before each Duha as sadaqah for every joint"
- 2.1 "Learn the time window for Duha prayer"

**Root cause.** The node merges two seed tasks from different levels, and `buildTasksForNode`
(`src/data/prophetic-path-submodules.js`) sorts its pool by **level first**, then priority, then due date:

| # | Board | Task | Subtasks (before) |
|---|---|---|---|
| 1 | `faith_salah_growth` (L2), seq 4 | "Salat ad-Duha — establish the post-sunrise charity of the joints" | pray 5 days · intention · build to 4 rak'at · anchor to a fixed time |
| 2 | `faith_salah_excellence` (L3), seq 1 | "Pray Duha prayer regularly" | **learn the time window** · **pray 3 times this week** · gradually increase to daily |

The beginner content was authored on the **higher** level. So the prerequisite (when is Duha?)
surfaced after the practice that depends on it. And Excellence asked for *less* (3×/week) than
Growth (5 days). No reordering inside a task could fix that; the content had to move level.

**The fix (operator's choice: restructure levels).**

Growth task, new subtask order. This follows the seed-order rubric from
`wiki/decisions/2026-07-27-milos-seed-order-curation.md`: dependency, then interior before
exterior, then low friction first.

1. Learn the time window for Duha prayer — *moved byte-for-byte from Excellence*
2. Set the intention before each Duha as sadaqah for every joint
3. Pray 2 rak'at of Duha at least 5 days this week
4. Anchor Duha to a fixed time block in your daily schedule
5. Build toward 4 rak'at of Duha consistently

Excellence task "Pray Duha prayer regularly" keeps only **Gradually increase to daily practice**,
which is the one step that goes past Growth. Its How? now starts from Growth's benchmark (5+ days a
week for two weeks) instead of "three times per week". The task description is updated to match.
"Pray Duha at least 3 times this week" is **retired**: it asked for less than the level below it.

No **title** is edited anywhere. Titles are the seed↔storage join key.

## What changes in stored data

Hydration only backfills *fields*, and the boot backfill only *appends* missing seed subtasks at the
end. Without a migration, an existing board would get "Learn the time window" appended **last** on
Growth, and both old rows would stay on Excellence for good. So a one-shot runs before mount:

`src/services/migration.js` — flag `seed_duha_restructure_v1` (stored
`bbiz_seed_duha_restructure_v1`), function `restructureDuhaSeedSubtasks()`, pure core
`restructureDuhaSubtasks()`. It touches **two tasks on two boards and nothing else**:

| Stored row | Action |
|---|---|
| Excellence → "Learn the time window…" | **Moved** onto the Growth task, keeping the same object (its `id` and `done`). If Growth already holds a row of that title, the two merge, and the result is done if either was. If no Growth task is stored, an untouched row is dropped, because the Growth seed delivers a fresh one when that board is seeded. A **done** row is kept in place. |
| Excellence → "Pray Duha at least 3 times this week" | **Removed** if not done. A **done** row is kept as an orphan rather than erasing the operator's record (same policy as `pruneRemovedSeedTasks`). |
| Growth → all subtasks | Rebuilt to the curated order with `alignSubtaskOrder(…, { allowDone: true })`. Rows are reused by reference, so `id`/`done`/snooze cannot change. Operator-added rows are appended at the end. |

The task copies: neither Duha task carries a `prayer-phase:before/after` tag, so `classifyTask()`
copies neither onto a `prayer_*` board. These two boards are the only places the tasks live.

### `allowDone` on `alignSubtaskOrder`

The existing helper skips a whole task when any subtask is done, as a belt-and-braces guard. For
this fix the re-order *is* the deliverable: an operator who already ticked "Pray 2 rak'at…" is
exactly who needs "Learn the time window" moved ahead of it. Rows travel by reference, so progress
cannot be lost. The option defaults to `false`, so every earlier caller behaves as before.

### Why this is non-destructive

- Nothing with `done: true` is ever deleted.
- No operator-created subtask is touched.
- No task is added, removed, or retitled; `seedOrder` is not touched.
- Idempotent: a second run returns the same array references (tested), and the flag stops it
  re-running anyway.

### Known behavioural consequences

- **A completed Growth Duha task may reopen.** If every Growth subtask was done and the moved
  "Learn the time window" row was not, `isTaskComplete()` (pure `subtasks.every`) turns false, and
  the chain routes back to it. This is the same behaviour the boot backfill already has for any new
  seed subtask, and the intended effect of curation: the prerequisite is now part of the habit.
- **The Excellence Duha task may become complete.** If only the removed rows were undone, it now
  holds only finished rows.
- **The Excellence Duha task now has one subtask.** That's thin for a task, but anything else on
  that level would duplicate Growth. Open question 1 below.

**Reversal path:** revert the seed and migration commit, then clear
`bbiz_seed_duha_restructure_v1`. Moved rows stay on Growth until deleted by hand, since nothing
prunes subtasks. No completion state is at risk.

## Grounding impact

- The moved subtask keeps its sources, tier, rationale and description byte-for-byte.
- The retired subtask's sources were: Quran 93:1-2, Sahih al-Bukhari (Abu Hurayrah's three things)
  and Sahih Muslim (Abu Dharr, charity of the joints). 93:1-2 is still cited on the moved Growth
  step, and the joints hadith is still cited on "Gradually increase to daily practice" (Muslim 720,
  Bukhari 1178). Only the **Abu Hurayrah** narration was unique, so it is now appended
  **byte-for-byte** to the sources of "Gradually increase to daily practice". It supports a
  standing, unbroken practice, and the subtask's Why? and amanahRationale now mention it.
- Ratchets unchanged: `lint:grounding-strict` 0 ≤ 0, `audit:inline-refs` green.

## Files Modified

- `src/data/seed-tasks/faith-seed-tasks.js` — Growth Duha subtasks re-ordered plus the moved one;
  Excellence Duha trimmed to one subtask (one source added, prose updated); Excellence task
  description.
- `src/services/migration.js` — `DUHA_*` constants, `restructureDuhaSubtasks()`,
  `restructureDuhaSeedSubtasks()` wired into `runMigrations()` after the v3 align;
  `alignSubtaskOrder` gains `{ allowDone }`.
- `src/services/__tests__/duha-restructure.test.js` — migration contract and seed drift guard
  (`DUHA_GROWTH_ORDER` deep-equals the seed).
- `src/data/__tests__/prophetic-path-duha-order.test.js` — builds the Duha node from seeds: opens
  on the time window, intention before the first prayer target, no level asks for fewer days.
  Verified to **fail 3/3 against the pre-fix seed**.
- `scripts/audit-task-order.mjs` plus `stages/research-task-order-audit-draft.md` — the
  system-wide audit (report only, nothing auto-fixed).

## Amanah Gate

- [x] Halal purpose confirmed — reordering existing, grounded worship guidance so the operator
      learns when Duha may be prayed before being asked to pray it. No fiqh authored, no revelation
      text altered.
- [x] No riba/gharar concerns — no capital, sale, or contract surface.
- [x] Itqan standard met — the order follows the written rubric; moved content is byte-for-byte;
      the hardcoded migration table is guarded against drift; nothing with progress is discarded.
- [x] Existing tests still pass — `npm test` 314/314 across 18 files, composite `npm run lint`
      green, `npm run build` ✓.

## Key Decisions

1. **Move content between levels, not just reorder.** The node's primary sort key is level, so the
   bug could only be fixed where the content lives.
2. **Retire "3 times this week" rather than move it to Growth.** Growth already sets 5 days; a
   3-day step below it would just be a warm-up nobody needs a separate checkbox for.
3. **Intention before the first prayer target.** Interior before exterior: the niyyah step
   describes what to do *before each* Duha, so it is learned before the 5-day target starts.

## Open Questions

1. Should the Excellence Duha task gain more content (e.g. 8 rak'at, or praying it at the
   preferred time when the heat intensifies)? That would need new grounded subtasks, so it is out
   of scope here.
2. The audit's structural finding (node pools ignore `seq` within a level, R4 × 28) is reported
   only. Fixing it means changing `buildTasksForNode`'s comparator.

## Reviewer Notes

## Decision
- [ ] **Approved** — proceed to next stage
- [ ] **Rejected** — rework needed (see notes above)
