---
phase: implement
slug: node-own-tasks
status: review
amanah: positive
created: 2026-10-17 00:00
---

# Review Gate: implement — node-own-tasks

## Summary

After the Hour of Acceptance fix (#54), the operator asked why a node would ever show another node's
tasks, and whether other nodes borrowed. An audit of every non-prayer Prophetic Path node against
the seeds found borrowing in seven nodes, plus a fallback that could make any node borrow later:

| Node | Was showing | Cause |
|---|---|---|
| Eid Prayer | the Jumuʻah task ("…the eid of the week") | Its two ʻĪd tasks sit on `faith_siyam_core`, which was outside the node's scope; `/\beid\b/` then caught the Jumuʻah title |
| Traveler Arrival | the whole Travel task + 9 home tasks | One task spanned both travel nodes; `home` / `return` keywords |
| Traveler Departure | the return du'a too | Same shared task |
| Maghrib Iftar / Isha Taraweeh | the whole Ramadan task (iftar, taraweeh, Laylat al-Qadr), and Iftar also showed "conditions that break the fast" | One task spanned three nodes; `break.*fast` keyword |
| Jumuʻah | "Memorise the adhkar recited in salah" | `salawat` keyword |
| Bedtime | the Qiyam-rest task and the post-prayer adhkar | `sleep` and `Ayat al-Kursi` keywords |
| Qiyam-rest | the Tahajjud waking protocol | Broad keyword |
| *(any node)* | its whole scope once its own tasks were done | Finished tasks left the pool, so the "matched nothing" fallback fired |

## Decisions (operator's choices)

1. **Own tasks only.** On non-prayer nodes, a task carrying `transition:` tags is shown only if one of
   them is a tag the node's matchers name. Prayer nodes (Fajr…Tahajjud) keep their behaviour, because
   they deliberately take tasks routed to their window.
2. **All done → own tasks, ticked.** Finished tasks stay in a node's pool. The node shows its open own
   tasks, or, when all are finished, its finished own tasks. It never falls back to its scope; a test
   pins that every node owns something.
3. **Witr keeps the post-Witr adhkar task** (claimed explicitly); **Bedtime claims the pre-sleep
   sunnah** (explicitly).
4. **Eid:** `faith-siyam` is added to the node's scope. No new content.
5. **Split, not step-filter:** the shared tasks are split into tasks of their own.
   - Ramadan → *Break the fast with the Prophet's ﷺ iftar duʻaʻ* (renamed; two iftar steps),
     *Stand the nights of Ramadan in taraweeh*, and *Seek Laylat al-Qadr in the last ten nights*
     (one moved step each).
   - Travel → *Travel with the Prophet's ﷺ structure* (departure and en-route steps) plus
     *Return home from travel with the Prophet's ﷺ sunnah*:
     1. Do not return to your family unannounced at night. New; Sahih al-Bukhari 5244 and 1801.
     2. Recite the duʻaʻ of return on coming home. Moved.
     3. Begin at the masjid with two rakʿat before going home. New; Sahih al-Bukhari 3088.
6. **Keywords tightened:**
   - Traveler Arrival keeps only return-from-journey wording;
   - Jumuʻah drops `salawat`;
   - Iftar drops `break.*fast`;
   - Bedtime drops the Ayat al-Kursi / Quls keyword.

**Deviation to note:** Laylat al-Qadr turned out to be a date banner, not a task node. Its task is
carried by the Taraweeh node, the Ramadan night-prayer node, which now claims
`transition:laylat-al-qadr`.

## What changes in stored data

Migration flag `seed_node_split_v1`, `applyNodeSplitV1()` / pure `applyNodeSplit()`, driven by the
literal `NODE_SPLIT` table. It touches **two boards** (`faith_siyam_core`, `faith_salah_growth`), and
on each it applies these steps in order:

| Step | Action |
|---|---|
| Rename | `Observe Ramadan…` → `Break the fast…`, only if the new title is not already stored |
| Untag | Strip `transition:isha-taraweeh` / `transition:laylat-al-qadr` from the iftar task and `transition:traveler-arrival` from Travel (hydration only adds tags) |
| Insert | The three new tasks if missing: slim shape, To Do, `seedOrder` from the seed |
| Move | Taraweeh, Laylat al-Qadr and return-du'a rows travel **by reference** (same `id`, `done`, snooze). An existing row of the same title absorbs one, done if either was |
| Align | New tasks get the seed step order; missing steps are created fresh |
| Complete | `reconcileBoardCompletion` on the board — **promotion only** |

The seed renumbers `faith_siyam_core` (ʻĪd tasks 6,7 → 8,9) and appends the return task at
`faith_salah_growth` seq 12.

### Why this is non-destructive

- Nothing with `done: true` is deleted, and moved rows keep their ticks.
- Operator-created tasks and steps are untouched. A rename never overwrites an existing task of that
  title.
- No task is reopened.
- The pass is idempotent: a second run returns the same array (tested), and the flag stops a rerun.

### Known behavioural consequences

- A one-step task whose step was already ticked arrives in Done; for example, Taraweeh if the old
  taraweeh step was ticked.
- The iftar task can move to Done if its two iftar steps were done.
- The return task is open (two of its three steps are new).

**Reversal path:** revert the seed, engine and migration commit, then clear
`bbiz_seed_node_split_v1`. The renamed task would orphan until hand-renamed, and the new tasks would
stay as bare orphans; nothing is pruned. No completion state is at risk.

### The pass-2 drift guard

The 2026-10-05 pass-2 tables still name `Observe Ramadan…` with four steps, and pass 2 still runs
first on boards that haven't had it. Its drift guard now reads the seed through `NODE_SPLIT`:
renamed titles resolve, and the steps moved out are expected gone. The migration itself is
unchanged.

## Grounding impact

- Moved steps keep their sources byte-for-byte.
- The new steps cite Sahih al-Bukhari 5244, 1801 and 3088. The texts were checked against the
  fawazahmed0/hadith-api edition (via GitHub; the CDN is blocked here) and added to `hadith.js`
  (additive only: 0 changed).
- Ratchets: `lint:grounding-strict` 0 errors, `audit:inline-refs` green.

## Files modified

- `src/data/prophetic-path-submodules.js`: the own-tasks rule, the done-state, `PRAYER_NODE_IDS`,
  `isRoutedElsewhere`, the Eid scope and the matcher changes.
- `src/data/seed-tasks/faith-seed-tasks.js`: the splits, the new return task, and the `seq` and tag
  updates.
- `src/services/migration.js`: `NODE_SPLIT`, `applyNodeSplit()`, `applyNodeSplitV1()` and the wiring.
- Tests:
  - `src/services/__tests__/node-split.test.js` (new);
  - `prophetic-path-node-matching.test.js`: no-borrow, no leaks, done-state;
  - `seed-order-audit-v2.test.js`: split-aware guard.
- `src/data/hadith.js`: three entries.

## Amanah Gate

- [x] Halal purpose: each node teaches the practice of its own moment. New steps rest on sahih
      narrations; no revelation text is altered.
- [x] No riba or gharar concerns.
- [x] Itqan:
  - moved content is byte-for-byte;
  - the literal table is drift-guarded;
  - every node is tested to own content and to show no task routed elsewhere.
- [x] Tests: `npm test` 399/399. `npm run lint` and `npm run build` pass.

## Reviewer Notes

## Decision
- [ ] **Approved** — proceed to next stage
- [ ] **Rejected** — rework needed (see notes above)
