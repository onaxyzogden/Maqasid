# Five-Node Content Split Migration — Approval Gate

**Date drafted:** 2026-08-29
**Status:** review
**Prepared by:** Claude Code (MILOS V2.1)
**Scope:** `src/services/migration.js` — `pruneRelocatedSeedRows()`

---

## Why this needs a gate

This pass **deletes one row from the operator's stored boards in `localStorage`**
(prefix `bbiz_`). Per `CLAUDE.md` → *CI/CD Safety Flags*, a data migration
requires a `stages/` approval doc — so this exists even though the blast radius
is a single subtask on a single board. It is the narrowest migration this repo
has shipped, and it is written that way on purpose.

It is the second pass of the same date. The first,
[implement-node-content-split-review.md](implement-node-content-split-review.md),
retired ten boards' worth of duplicated prayer tasks under
`seed_node_content_split_v1`. That flag is consumed; this one is
`seed_node_content_split_v2`.

## What changed in the seed, and why storage needs a pass

Last pass removed `buildTasksForNode()`'s silent whole-pool fallback — the line
that showed a node the entire pillar's tasks when its own matcher found nothing.
That was correct, and it exposed the gap it had been hiding. Measured by running
the real seed modules through the real `buildTasksForNode()` over all 93 seeded
boards, five non-prayer nodes had no content of their own:

| node | rendered before | verdict |
|---|---|---|
| `jumuah` | 3 tasks | **none of them the Friday cluster** |
| `eid-prayer` | 1 task | and it was **jumuah's** |
| `qaylulah` | 1 | thin |
| `traveler-departure` | 1 | thin |
| `traveler-arrival` | 9 | **all nine wrong** (`family_home` rows) |

Four of the five defects were matcher or registry bugs and are fixed in
`src/data/prophetic-path-submodules.js` — no storage consequence. The content
gaps were filled by **adding** tasks, which the boot backfill
(`backfillAndStripSeeds()`) delivers on its own by title diff.

**Only one row had to move.** The duʻaʻ of return was a subtask of the travel
hub task on `faith_salah_growth`. The return is its own threshold — it now has
its own node, its own task and its own ceremony — so that subtask is now the
first subtask of the new arrival task. It has to leave its old parent, or the
operator sees it **twice on the same board** on the next boot: bare under the
travel hub, whole under the arrival task the backfill appends.

## What it does

**Flag:** `bbiz_seed_node_content_split_v2` — one-shot, set unconditionally once
the pass has run so it can never fire twice.

**Boards touched:** one, and only this one.

| board | task | subtask removed |
|---|---|---|
| `faith_salah_growth` | `Travel with the Prophet’s ﷺ structure` | `Recite the duʻaʻ of return on coming home` |

The join is exact title equality. Both strings above are byte-for-byte copies of
the seed as it stood before this change.

## What it does NOT do

- **The hub task is not renamed and is not pruned.** `Travel with the Prophet’s
  ﷺ structure` keeps its title and its place on `faith_salah_growth`; the
  seed↔storage join on it is intact. Only the one subtask moves. (Three *other*
  titles were renamed in this pass — the qaylulah adab task, the travel
  concessions task and the arrival task — but all three are titles that have
  **never shipped**, so no stored row can be joined to them and none needs a
  prune.)
- **Nothing is deleted from the app.** The duʻaʻ of return is not removed from
  the seed — it is the first subtask of the new arrival task on the same board.
  Only the relocated copy goes away.
- **A row the operator has worked on is never deleted.** The pass reuses
  `pruneRemovedSeedSubtasks()`, which guards every removal with
  `subtaskHasState(st)` — the same predicate the mojibake dedup uses to pick a
  survivor, imported rather than re-implemented so the two cannot drift. Someone
  who ticked the return duʻaʻ keeps that row, beside its replacement, and a
  console line names every kept title so they can delete it by hand. Losing
  their progress silently is the worse failure.
- **No other board, key, or flag is read or written.**

## Ordering within `runMigrations()`

It runs immediately after `pruneSplitSeedRows()`, i.e. last. Same reason as every
prune in this file: it must precede React mount, because the boot backfill
appends the new arrival task — carrying this same subtask — on the same boot,
and a board holding both would show the retired row beside its replacement.

## Blast radius if it is wrong

- **Worst realistic case:** the hub title drifts and the pass matches nothing.
  Result: the duʻaʻ of return shows twice on `faith_salah_growth` — visibly
  wrong, not destructive, and fixable by a later pass.
- **Worst unrealistic case:** a title collision deletes a subtask the operator
  wanted. Bounded three ways: the board allowlist is one board, the task
  allowlist is one task on it, and `subtaskHasState()` means a row with any
  progress on it is never a candidate.
- **Not recoverable by re-running.** The flag is one-shot; a mistake needs a new
  flag and a new pass, not a retry.

## Verification performed

- `npm test` — **309 tests across 18 files pass**, including the new
  `src/data/__tests__/five-node-content.test.js` (each of the five nodes renders
  exactly its own titles; no title shared between any two of them; `eid-prayer`
  no longer claims the Friday task; `traveler-arrival` no longer claims the
  family home board) and the new ceremony case in
  `src/components/islamic/__tests__/prophetic-path-constants.test.js` (each of
  the five resolves to its own ceremony, none opens on "Before Standing in
  Salah", none falls through to the Work threshold, and all five openings are
  distinct).
- `npm run lint` — grounding `[STRICT] OK: 0 ≤ ratchet 0` on all eight pillars,
  `audit:inline-refs` at its 0 ratchet, `divine-names: OK — 106 names, 126
  module attributes, all attested` (+10 confirms all five ceremonies × 2 Names
  registered).
- `npm run build` — clean.
- Replay against real storage with `bbiz_seed_node_content_split_v2` cleared —
  see the session record for observed removed/kept counts.

## Approval

- [ ] Reviewed by Yousef
- [ ] Approved to ship
