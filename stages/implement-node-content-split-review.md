# Node Content Split Migration — Approval Gate

**Date drafted:** 2026-08-29
**Status:** review
**Prepared by:** Claude Code (MILOS V2.1)
**Scope:** `src/services/migration.js` — `pruneSplitSeedRows()`

---

## Why this needs a gate

This pass **deletes rows from the operator's stored boards in `localStorage`**
(prefix `bbiz_`) — whole tasks on ten boards, and one subtask on an eleventh.
Per `CLAUDE.md` → *CI/CD Safety Flags*, a data migration requires a `stages/`
approval doc. Deletion is the sharpest thing a migration can do, so the contract
below matters more than usual.

## What changed in the seed, and why storage needs a pass

Two defects, one cause: content that belonged to one node was being shown on
others.

**1. The prayer nodes shared their Before/After tasks.** `classifyTask()` in
`src/data/seed-tasks/prayer-seed-tasks.js` ended with a fallthrough that copied
any phase-tagged Faith task onto **all five daily prayers**. Three tasks hit it,
so every prayer's Before/After tabs showed the same content — Asr Before was
*only* the shared task and nothing else. That fallthrough now returns `[]`, and
each prayer has its own derived rawatib plus hand-authored, prayer-specific
tasks.

**2. Hour of Acceptance had no task of its own.** The practice existed as a
single **subtask** — `Make duʻaʻ in the last hour before Maghrib on Friday` —
buried inside `Honor the Friday Sunan` on `faith_salah_growth`. Nothing in the
seed matched the node, so `buildTasksForNode` fell back to the whole Salah pool
and the node rendered twenty generic Salah tasks. That subtask is now its own
task, `Keep the hour of istijabah — the last hour before Maghrib on Friday`, on
the same board, and the whole-pool fallback is gone.

Seed edits do not reach a board that already exists in storage. The boot
backfill (`backfillAndStripSeeds()`, `src/store/project-store.js`) appends new
tasks and subtasks by title diff but **never removes** one. Without this pass the
retired rows would sit on those boards forever: each holding a slot in the
curated chain, blocking sequential locking, and rendering bare — their
description, `sources` and `tier` live in the bundle and can no longer be
hydrated from the board they were removed from. The istijabah row would also be
visible **twice** on the same board: bare under its old parent, whole under its
new one.

## What it does

**Flag:** `bbiz_seed_node_content_split_v1` — one-shot, set unconditionally once
the pass has run so it can never fire twice. Both halves share it; they are two
halves of one change, and a second flag would only add a second way to get the
ordering wrong.

**Boards touched:** eleven, and only these.

### Half one — whole tasks (ten boards)

| board | titles removed |
|---|---|
| `prayer_{fajr,dhuhr,asr,maghrib,isha}_before` | `Observe the pre-prayer sunnah before every salah (siwak, wudu, adhan response)` |
| `prayer_{fajr,dhuhr,asr,maghrib,isha}_after` | `Complete the post-prayer adhkar after every salah (istighfar, tasbih, Ayat al-Kursi)`<br>`Memorise the prophetic supplications specific to each prayer` |

### Half two — one subtask (one board)

| board | task | subtask removed |
|---|---|---|
| `faith_salah_growth` | `Honor the Friday Sunan — Jumuʻah is the eid of the week` | `Make duʻaʻ in the last hour before Maghrib on Friday` |

The join is exact title equality in both halves — the strings above are
byte-for-byte copies of the seed as it stood before the change.

## What it does NOT do

- **Nothing is deleted from the app.** The three generic tasks keep their home on
  `faith_salah_core` and `faith_salah_excellence`, and those boards are not
  touched. The istijabah subtask is not removed from the seed either — it is the
  first subtask of the new task on the same board. Only duplicated or relocated
  copies go away.
- **A row the operator has worked on is never deleted.** The task prune guards
  every removal with `taskHasState(t, boardId)`; the subtask prune guards with
  `subtaskHasState(st)` — the same predicates the mojibake dedup uses to pick a
  survivor, imported rather than re-implemented so they cannot drift. Someone who
  completed the generic adhkar task on Fajr keeps that row, beside the new
  Fajr-specific one, and a console line names every kept title so they can delete
  it by hand. Losing their progress silently is the worse failure.
- **No other board, key, or flag is read or written.**

## Ordering within `runMigrations()`

It runs **last**, after `renameSeedSubtaskTitles()` and
`alignReorderedSubtasksV3()`. Those two passes join on subtask titles inside rows
this one may delete, so running the prune first would leave them nothing to
match; running it last is a no-op for them either way, since they are
flag-guarded and have already fired. It must still precede React mount, for the
same reason `pruneDedupedSeedTasks()` does: the backfill appends the new
per-prayer tasks and the new istijabah task on the same boot, and a board holding
both would show the retired row beside its replacement.

## Blast radius if it is wrong

- **Worst realistic case:** a title string drifts and the pass matches nothing.
  Result: the retired rows stay as bare orphans — the status quo before this
  change, visibly wrong but not destructive. The set-equality drift guard in
  `src/data/seed-tasks/__tests__/prayer-order.test.js` fails loudly on any
  retitle, which is what keeps this from happening quietly.
- **Worst unrealistic case:** a title collision deletes a row the operator
  wanted. Bounded by the state guards — a row with any progress on it is never a
  candidate — and by the board allowlist, which cannot reach the Faith pillar
  boards where the generic titles actually live. The subtask half is narrower
  still: it only touches subtasks of one named task on one named board.
- **Not recoverable by re-running.** The flag is one-shot; a mistake would need a
  new flag and a new pass, not a retry.

## Verification performed

- `npm test` — including the cross-board title uniqueness guard (`shares no task
  title across two prayer before/after boards`), the set-equality drift guard
  over all twelve before/after override tables, and the new no-fallback guards in
  `src/data/__tests__/prophetic-path-no-fallback.test.js`
- `npm run lint` — `[STRICT] Pass` and inline-refs `0 ≤ 0` held across every
  authored and derived subtask
- Replay against real storage with `bbiz_seed_node_content_split_v1` cleared —
  see the session record for the observed removed/kept counts

## Approval

- [ ] Reviewed by Yousef
- [ ] Approved to ship
