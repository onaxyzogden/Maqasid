---
phase: implement
slug: istijabah-hour-task
status: review
amanah: positive
created: 2026-10-16 00:00
---

# Review Gate: implement — istijabah-hour-task

## Summary

The operator reported that the **Hour of Acceptance** node on the Prophetic Path showed the wrong
tasks. It showed the whole "Honor the Friday Sunan — Jumuʻah is the eid of the week" task. That task
had been tagged `transition:istijabah-hour` on 2026-10-05, so all six of its steps appeared:

| Step | Fits the last hour before Maghrib? |
|---|---|
| Make ghusl, use miswak, and apply perfume before Jumuʻah | ❌ before the noon prayer |
| Walk to the masjid in the earliest hour | ❌ before the noon prayer |
| Recite Surah al-Kahf on Friday | ~ any time on Friday |
| Listen attentively to the khutbah — no speaking | ❌ noon only |
| Increase salawat on the Prophet ﷺ on Friday | ~ any time on Friday |
| Make duʻaʻ in the last hour before Maghrib on Friday | ✅ the hour itself |

A node can only show whole tasks, so the fix has to be in the content.

## The fix (operator's choices)

- **A dedicated task** on `faith_salah_growth`, `seq` 7, placed right after the Jumuʻah task:
  "Seek the Hour of Acceptance on Friday", tagged `transition:istijabah-hour`. Its steps follow the
  seed-order rubric: dependency, then interior before exterior, then the practice.
  1. **Learn when the Hour of Acceptance falls on Friday.** New, T1.
     - Sunan Abi Dawud 1048: seek it in the last hour after ʿAsr. Sahih per al-Albani.
     - Jami at-Tirmidhi 489: supporting only. Al-Tirmidhi calls its chain gharib.
  2. **Call upon Allah certain of being answered, with a present heart.** New, **T2**.
     - Jami at-Tirmidhi 3479: Hasan per al-Albani; Daʿif per Zubair ʿAli Zaʾi; gharib per
       al-Tirmidhi. That disagreement is why it is marked Qarina, not Bayyinah.
  3. **Open your duʻaʻ with praise of Allah and salawat, then ask.** New, T1.
     - Jami at-Tirmidhi 3477: hasan sahih.
  4. **Make duʻaʻ in the last hour before Maghrib on Friday.** **Moved byte-for-byte** from the
     Jumuʻah task.
- **The Jumuʻah task** keeps its five daytime steps and `transition:jumuah`. It loses
  `transition:istijabah-hour` and the moved step, and its description no longer lists the
  last-hour duʻaʻ.
- `faith_salah_growth` is renumbered: Witr 7→8, sleep 8→9, Tahajjud 9→10, travel 10→11.
- The operator declined a fourth step ("wait in remembrance till Maghrib") because its grounding is
  thinner.

No title is edited. Titles are the seed↔storage join key.

## What changes in stored data

The boot backfill would append the new task by itself, with a fresh, unticked copy of step 4. Two
things still need a one-shot before mount:
- Hydration only ever **adds** seed tags, so the stored Jumuʻah task would keep its istijabah tag.
- Nothing prunes stored subtasks, so the old step 4 would stay on the Jumuʻah task with its tick.

`src/services/migration.js` adds flag `seed_istijabah_task_v1` (stored as
`bbiz_seed_istijabah_task_v1`), the function `applyIstijabahTask()`, and its pure core
`seedIstijabahTask()`. It is wired into `runMigrations()` after pass 3 and before the completion
catch-up. It touches **one board** (`tasks_faith_salah_growth`):

| Stored row | Action |
|---|---|
| Jumuʻah task `tags` | `transition:istijabah-hour` removed; the other tags kept |
| New task | Inserted if missing: slim shape, To Do column, `seedOrder` 7, `order` after the last task |
| Jumuʻah → "Make duʻaʻ in the last hour…" | **Moved** by reference (same `id`, `done`, snooze). If the new task already holds that title, the two merge, done if either was done. |
| New task's subtasks | Aligned to the curated order with `alignSubtaskOrder(…, { allowDone: true })`, which creates the three new steps |
| Completion | `reconcileBoardCompletion` on this board: **promotion only**. A Jumuʻah task whose last open step was the moved one moves to Done. |

### Why this is non-destructive

- Nothing with `done: true` is deleted, and the moved row keeps its tick.
- No operator-created task or subtask is touched. Other tasks on the board are returned by reference.
- No task is reopened, and no title changes.
- The pass is idempotent: a second run returns the same array (tested). The flag also stops it
  re-running.

### Known behavioural consequences

- The new task is open, because three of its steps are new. An operator who had ticked the old
  last-hour step sees it ticked as step 4.
- The Jumuʻah task may move to Done if the moved step was its only open one.
- The Jumuʻah node is unchanged apart from losing step 4. Its matchers never matched the new title.

**Reversal path:** revert the seed and migration commit, then clear `bbiz_seed_istijabah_task_v1`.
The new task would stay stored as a bare orphan until deleted by hand, because nothing prunes
tasks. No completion state is at risk.

## Grounding impact

- The moved step keeps its sources byte-for-byte (Sahih al-Bukhari 935).
- New sources are Sunan Abi Dawud 1048, Jami at-Tirmidhi 489, 3477 and 3479. The Arabic and English
  were checked against the fawazahmed0/hadith-api edition, the same dataset `scripts/fetch-hadith.py`
  reads, fetched from GitHub because the CDN is blocked in this environment.
- The offline hadith cache gains `bukhari:935`, `abudawud:1048`, `tirmidhi:489` and `tirmidhi:3477`.
  The change is additive only: 0 existing entries changed. The popup now shows their full text
  instead of "View on sunnah.com".
- Ratchets are unchanged: `lint:grounding-strict` 0 errors, `audit:inline-refs` green.

## Files modified

- `src/data/seed-tasks/faith-seed-tasks.js`: the new task, the Jumuʻah tag, step and description,
  and the `seq` renumber.
- `src/services/migration.js`: the `ISTIJABAH_*` constants, `seedIstijabahTask()`,
  `applyIstijabahTask()` and the `runMigrations()` wiring.
- `src/services/__tests__/istijabah-task.test.js`: the migration contract plus a seed drift guard.
- `src/data/__tests__/prophetic-path-node-matching.test.js`: the node now shows only its own task,
  in order. The old assertion pinned the bug.
- `src/data/hadith.js`: four cache entries.

## Amanah Gate

- [x] Halal purpose confirmed. The node now teaches when and how to make duʻaʻ in the hour of
      acceptance, from named narrations. No revelation text is altered, and fiqh differences on the
      exact time are stated, not settled.
- [x] No riba or gharar concerns.
- [x] Itqan standard met:
  - every grade split is recorded in `ratNote`;
  - the weaker chain is marked Qarina/T2;
  - the moved content is byte-for-byte;
  - the migration's literal table is guarded against drift.
- [x] Existing tests still pass (see the PR for counts).

## Open questions

1. A node whose matchers find nothing falls back to its **whole scope pool**, which for this node is
   every Salah and Shahada task. If an operator completes the new task, that fallback could show
   unrelated tasks here again on a later Friday. It is reported only; changing the fallback affects
   every node.

## Reviewer Notes

## Decision
- [ ] **Approved** — proceed to next stage
- [ ] **Rejected** — rework needed (see notes above)
