# Subtask Rename + Reorder Migration — Approval Gate

**Date drafted:** 2026-08-27
**Status:** review
**Prepared by:** Claude Code (MILOS V2.1)
**Scope:** `src/services/migration.js` — `renameSeedSubtaskTitles()` and
`alignReorderedSubtasksV3()`

---

## Why this needs a gate

These two passes **mutate the operator's stored boards in `localStorage`**
(prefix `bbiz_`). Per `CLAUDE.md` → *CI/CD Safety Flags*, a data migration
requires a `stages/` approval doc. Seed edits alone never reach a board that
already exists in storage, so without these passes the Tahajjud and Sunan
al-Nawm corrections are visible only to a brand-new install.

## What it does

**Pass 1 — `renameSeedSubtaskTitles()`** (flag `bbiz_seed_subtask_rename_v1`)

One rename, on the Sunan al-Nawm task, on its single board
(`faith_salah_growth`):

| old title | new title |
|---|---|
| `Recite Ayat al-Kursi as the last thing said before sleep` | `Recite Ayat al-Kursi on going to bed` |

The old title asserted something *Sahih al-Bukhari* 5010 does not say — 5010
says only that Ayat al-Kursi is recited *when he goes to bed*. It is al-Bara'
(*Sahih al-Bukhari* 247) who is told to make the sleeping du'a **the last words
you say**. The old title therefore contradicted the sibling subtask that
follows it. Renaming corrects the claim; the reorder then puts the du'a last.

**Pass 2 — `alignReorderedSubtasksV3()`** (flag `bbiz_seed_subtask_order_v3`)

Reorders subtasks to match `REORDERED_SUBTASK_ORDER_V3` on three boards:

- `faith_salah_core` + `prayer_tahajjud_before` — the Tahajjud waking chain,
  now du'a-first, with a **new** `Make wudu before standing for Qiyam` step
- `faith_salah_growth` — Sunan al-Nawm, now ending on the right-side sleeping
  du'a

Only three, not four: Sunan al-Nawm carries `transition:bedtime` but **no**
`prayer-phase:*` tag, and `classifyTask()` returns `[]` for a task with neither
`before` nor `after`. It is therefore never copied onto `prayer_isha_after`, and
`faith_salah_growth` is its only board. The Tahajjud task, which does carry
`prayer-phase:before`, exists on both of its listed boards.

## What it touches, and what it cannot touch

- **Reads and rewrites:** `subtasks[]` arrays of exactly the two named tasks on
  exactly the three named boards. Nothing else on any board is read or written.
- **Preserved:** every subtask `id` and every `done` flag. The rename rewrites
  the title in place; the reorder joins stored rows by title and reuses them.
- **Created:** one row, for the new wudu step, via `alignSubtaskOrder`'s
  existing `i === -1` branch (`done: false`, fresh id).
- **Never deleted:** user-created subtasks not in the order table are appended
  after the ordered ones, never dropped.
- **Skipped entirely:** the reorder skips any task carrying a *completed*
  subtask, so an in-progress night is never re-sequenced under the operator.
  The rename deliberately does **not** skip those — see below.
- **Never touched:** task-level fields, other boards, other pillars,
  completion history, the spiritual record.

## Ordering is load-bearing

`renameSeedSubtaskTitles()` **must** run before `alignReorderedSubtasksV3()`.
`alignSubtaskOrder` joins on title: an unrenamed row would read as both
*missing* (a fresh row is created for the new title) and *user-created* (the
old row is appended) — a visible duplicate Ayat al-Kursi entry with the
completion split across two rows. This is why the rename is a separate
primitive with its own flag, and why it is **not** skipped for tasks with
completed subtasks: renaming a completed row is precisely what preserves that
completion.

`renameSeedSubtasks()` also refuses to rename when a row already sits under
the target title, so a re-run or a partially-migrated board cannot collide.

## Reversibility

**Not automatically reversible.** Both passes are one-shot, gated on their own
flag, and there is no down-migration. Recovery paths:

1. Re-running is a no-op (flags set; and both primitives are idempotent even
   with flags cleared).
2. To re-run deliberately, clear `bbiz_seed_subtask_rename_v1` and
   `bbiz_seed_subtask_order_v3`.
3. A pre-migration board can only be restored from an export/backup taken
   before first load of this build.

Blast radius if wrong: subtask ordering and one title on two tasks. No task is
deleted, no completion is lost, no other pillar is reachable from this code
path.

## Verification performed

- `npm test` — full suite, including the two new drift guards in
  `src/data/seed-tasks/__tests__/prayer-order.test.js` (the V3 order table must
  match the seed exactly; every rename's new title must exist in the seed and
  its old title must not) and the Duha exclusion regression in
  `src/data/__tests__/prophetic-path-duha-exclusion.test.js`
- `npm run lint` — ESLint + `lint:grounding-strict` + `audit:inline-refs`,
  both ratchets held at 0 with the new wudu subtask and the added
  *Sahih al-Bukhari* 247 source
- `npm run build`
- Browser check with both flags cleared, against a board written by the
  previous build

## Decision

- [ ] **Approved** — migration may ship
- [ ] **Rejected** — reason:
