---
phase: implement
slug: subtask-foldin
status: review
amanah: positive
created: 2026-07-27 00:00
---

# Review Gate: implement — subtask-foldin

## Summary

`wiki/decisions/2026-07-27-milos-ummah-task-dedupe.md` removed five duplicated Ummah tasks and named
six subtasks that lived **only** on those tasks as fold-in candidates for a later pass. This gate
covers that pass: the six are restored, and a one-shot **reorders the operator's stored subtask
arrays** so the restored steps land where they belong in the sequence.

**This migration is non-destructive.** Unlike the dedupe prune, it deletes nothing. It rewrites the
`subtasks` array of four tasks on one board, preserving every existing subtask row's `id` and `done`
flag, and never drops a row — including subtasks the operator added themselves.

### What is restored to the seed data

Five become new subtask rows on `ummah_community_growth`, re-inserted **byte-for-byte** from
`git show ba18259^:src/data/seed-tasks/ummah-seed-tasks.js`:

| Restored subtask | Host task (`seq`) | Index | Count |
|---|---|---|---|
| "Establish a referral network for cases beyond the community's capacity" | sulh process (`0`) | 2 | 5 → 6 |
| "Design a structured curriculum with clear learning outcomes" | community education (`1`) | 2 | 5 → 6 |
| "Review the programme after three months — assess impact and refine the approach" | youth programme (`2`) | 5 | 5 → 6 |
| "Form a waqf committee with financial, legal, and community representation" | bayt al-mal (`5`) | 5 | 5 → 7 |
| "Draft the waqf deed — define the purpose, beneficiaries, and management structure" | bayt al-mal (`5`) | 6 | (same task) |

The sixth — "Establish a waqf endowment to fund perpetual land stewardship operations and new
acquisitions" — is **merged, not added**. It duplicates "Create a land endowment fund that generates
income for perpetual stewardship operations", which already sits on the sibling `seq 3` task of
`ummah_moontrance-land_excellence` and is already described as "structured as a waqf or charitable
trust". Adding it as a row would put two endowment subtasks on two tasks of one board — precisely the
redundancy the dedupe removed. Instead that existing subtask gains the Khaybar waqf hadith
(`Sahih al-Bukhari 2737`) in its `sources[]` and three `**How?**` steps it lacked: endowment purposes
covering acquisition of new land and training new communities, and a separate board of mutawallis.

No task is added or removed; `seq` is untouched on both boards. No **title** is edited anywhere —
titles are the seed↔storage join key (`project-store.js:159`, `seed-hydrator.js:122`), and a rename
would orphan the stored row.

## Why the storage migration is necessary

New seed subtasks *do* reach existing boards on their own — `backfillAndStripSeeds()`
(`project-store.js:172-181`) appends them by title on every boot. But it **appends at the end**,
ignoring seed position. On the operator's existing board, "Design a structured curriculum with clear
learning outcomes" would therefore land as step 6 of the education task — after "Collect feedback
after the first month". The subtask stepper is sequential, so that is a real defect, not cosmetics.

A migration that merely reordered would not work either: `runMigrations()` runs synchronously before
React mounts, while the backfill runs later on `requestIdleCallback`. A pre-mount reorder would be a
no-op, followed by a wrong-order append. So the one-shot **performs the insertion itself**, in seed
order, before mount — after which the backfill's set difference is empty and it does nothing.

## What the migration writes

`src/services/migration.js`, one-shot flag `seed_subtask_foldin_v1` (stored
`bbiz_seed_subtask_foldin_v1`), keyed by an explicit literal table `FOLDED_SUBTASK_ORDER` of the four
affected task titles and their full ordered subtask-title lists — not a generic "align every board to
its seed" sweep. The table is a literal rather than derived from the seed file because the seed files
are lazy-loaded (`seed-hydrator.js:17-25`) and importing a 14k-line module into the pre-mount boot
path would regress the startup-seeding guard from `d9ca679`.

For each listed task, the pure helper `alignSubtaskOrder()` rebuilds `subtasks` by walking the ordered
title list — reusing the existing stored row (**keeping its `id` and its `done` flag**) where the title
matches, creating `{ id: genSubtaskId(), title, done: false }` where it does not. Any stored subtask
**not** in the list is treated as operator-created and appended at the end, preserving relative order.
Nothing is ever dropped.

**Safety guard — a task is skipped entirely if any of its stored subtasks is `done`.** This is
belt-and-braces: `done` travels with the title through the rebuild, so a reorder cannot lose progress.
But a skipped task still receives the new rows from the boot backfill (appended at the end), so the
content always arrives; only the ordering degrades. Skips are reported via `console.info`.

**Measured state before the change (read from this machine's localStorage on 2026-07-27):** every
subtask on both Ummah boards is untouched — `subDone: 0`, all tasks in `_to_do`, `completedAt: null`.
So the guard is expected to be a no-op here and all four tasks align.

**Known behavioural consequence, not present on this machine:** `isTaskComplete()`
(`orientation-selector.js:51-53`) is pure `subtasks.every(satisfied)`. Adding a subtask to a task
whose subtasks were all done re-opens it and the sequential chain routes back to it, while the Kanban
card stays parked in Done and `taskWeight` still scores it 1.0. Nothing on these boards is complete,
so this does not arise today.

**Reversal path:** revert the seed-file commit and clear `bbiz_seed_subtask_foldin_v1`. The restored
subtask rows are not auto-removed — nothing prunes subtasks — so they would remain as orphaned rows
rendering bare, and would need deleting by hand. No completion state is at risk, since the migration
never clears a `done` flag.

## Second, unrelated fix carried in the same change

`project-store.js:175` gates the backfill's append on `seedSubs.length > storedSubs.length` rather
than on the set difference computed two lines below it. Any task where the operator has added even one
subtask of their own therefore has stored length ≥ seed length and **silently never receives new seed
subtasks**. The outer gate is dropped; the existing `.filter(!storedTitles.has(...))` plus
`if (newSubs.length > 0)` is already the correct condition. This is a latent-bug fix affecting all
pillars. It changes nothing observable on this machine, where no task carries an operator-added
subtask.

## Files Modified

- `src/data/seed-tasks/ummah-seed-tasks.js` — 5 subtask objects re-inserted at the listed indices;
  1 existing subtask gains a source entry and three description steps.
- `src/services/migration.js` — `FOLDIN_FLAG`, `FOLDED_SUBTASK_ORDER`, pure `alignSubtaskOrder()`,
  one-shot `foldInSeedSubtasks()`, wired into `runMigrations()` after `pruneDedupedSeedTasks()`.
- `src/store/project-store.js` — the length gate at :175 dropped.
- `src/services/__tests__/seed-subtask-foldin.test.js` — helper unit test.
- `src/data/seed-tasks/__tests__/subtask-foldin.test.js` — presence/position guard **and** a drift
  guard asserting `FOLDED_SUBTASK_ORDER` deep-equals the seed file's actual subtask titles.

## Amanah Gate

- [x] Halal purpose confirmed — restoring authored, grounded task content so that deduplicating tasks
      did not silently cost the operator six pieces of practical guidance. No fiqh authored, no
      revelation text altered.
- [x] No riba/gharar concerns. The waqf content is expanded, not invented: the committee, deed and
      endowment steps are classical waqf governance, grounded in the Khaybar narration
      (`Sahih al-Bukhari 2737`) and Quran 4:58 / 2:282. No advance-purchase, salam, or CSRA-style
      framing is introduced — capital language stays donation/endowment/qard ḥasan.
- [x] Itqan standard met — every restored object is byte-for-byte the reviewed original rather than
      a paraphrase; the one item that would have created new redundancy is merged instead of added,
      with the reason recorded; the drift guard prevents the hardcoded migration table from silently
      diverging from the seed.
- [x] Existing tests still pass — confirmed at the Phase 3 gate: `npm test` **208/208 across 10
      files** (was 180/8), composite `npm run lint` green (eslint 0, grounding-strict conforming,
      inline-refs `0 ≤ 0` across 2052 subtasks, glyphs 41), `npm run build` ✓ 1.42s with the ummah
      seed still a lazy chunk.

## Key Decisions

1. **Five rows plus one merge, not six rows.** Two of the six overlapped surviving content. The waqf
   deed was kept as a row (explore → form committee → draft deed is a genuine staging beyond the
   feasibility charter the existing subtask asks for); the land endowment was merged (it duplicates a
   subtask on a sibling task of the same board).
2. **Insert at seed position, and make the one-shot do the inserting** — because the backfill appends
   at the end and runs after mount, a reorder-only migration would have been a no-op.
3. **Literal table over a seed-derived one** — no seed import in the pre-mount boot path; the drift
   guard test covers the duplication cost.
4. **The three-month review is kept verbatim** even though its prose is mentorship-pair-specific
   while its host is a broader youth programme. Its host's subtask 2 is "Recruit and train youth
   mentors from within the community", so it is in scope, just narrower in voice than its siblings.
   Rewriting it would have meant authoring new content under cover of a restore.

## Open Questions

- None outstanding. The duplicate handling, the placement strategy and the backfill gate fix were each
  put to the operator before implementation and answered.

## Reviewer Notes

[Space for human reviewer to annotate]

## Decision

- [x] **Approved** — approved in-session by the operator on 2026-07-27 (plan approval covering the
      `stages/` gate for this fold-in and its reorder migration).
- [ ] **Rejected** — rework needed (see notes above)
