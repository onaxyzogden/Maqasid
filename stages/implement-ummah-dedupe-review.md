---
phase: implement
slug: ummah-dedupe
status: review
amanah: neutral
created: 2026-07-27 00:00
---

# Review Gate: implement — ummah-dedupe

## Summary

`wiki/decisions/2026-07-27-milos-seed-order-curation.md` recorded, but deliberately did not fix, five
duplicated task pairs on two Ummah boards. Curation kept each pair adjacent so the redundancy was
visible; deduplication is a **content** change and needed operator review. This gate covers both the
seed-content removal and the **persisted-data migration** it requires.

**This is a destructive migration.** Unlike the seed-order reconciliation gate, it does not adjust a
field — it **deletes whole task objects** from the operator's `localStorage`.

### What is removed from the seed data (5 tasks)

`ummah_community_growth` (10 → 6):

| Removed | Survivor that covers it |
|---|---|
| "Build a community dispute resolution (sulh) mechanism" | "Establish a community dispute resolution (sulh) process — prevent conflicts from escalating" (13 sources vs 10) |
| "Establish a community education institution (halaqa or weekend school)" | "Establish community education — launch a regular halaqa or weekend Islamic school programme" (hadith-grounded description; growth-tier-shaped subtasks) |
| "Build a youth mentorship programme — invest in the next generation of community leaders" | "Develop a comprehensive youth programme rooted in Islamic identity" (broader; mentorship survives as its subtask 2) |
| "Establish a community treasury or waqf — build institutional financial sustainability" | "Establish a community treasury (bayt al-mal) for collective financial strength" (14 sources vs 10; its subtask 5 already reaches waqf) |

`ummah_moontrance-land_excellence` (5 → 4):

| Removed | Survivor that covers it |
|---|---|
| "Develop a replicable Islamic land stewardship model — document, teach, and support new projects" | "Build a replicable Islamic land stewardship model that other communities can adopt and adapt" (14 sources vs 11); also resolves a task-vs-subtask overlap with the board's standalone succession-plan task |

One survivor is edited: the bayt al-mal task's `priority` moves `'medium'` → `'high'`, inheriting the
removed task's priority. No title, description, subtask, or `sources` text is edited anywhere — every
survivor keeps its title **byte-for-byte**, because the seed↔storage join is exact title equality
(`project-store.js:126,159`; `seed-hydrator.js:99,156`) and a rename would orphan the stored task and
append a duplicate.

## Why the storage migration is necessary

Deleting a seed entry alone is **not** safe. `backfillAndStripSeeds()` does
`const seed = seedMap[t.title]; if (!seed) return t;` — there is no prune anywhere in the codebase.
A stored task whose seed entry disappears becomes a permanent orphan that:

- keeps its last-reconciled numeric `seedOrder`, so it **stays inside the curated chain at a stale
  slot** and still **blocks sequential locking** while incomplete; and
- renders **bare** — `description`, `sources` and `tier` were stripped from storage by design and can
  no longer be hydrated, so the operator sees an ungrounded task with no reference text.

So the removal is paired with a one-shot prune.

## What the migration deletes from stored data

`src/services/migration.js`, one-shot flag `seed_dedupe_v1` (stored `bbiz_seed_dedupe_v1`), keyed by
an explicit literal table of the five removed titles per board — **not** a generic "prune anything
without a seed match" sweep, which would silently delete operator-renamed or mojibake-corrupted
tasks.

**Safety guard — a matching task is deleted only if it is untouched:**

- no subtask marked `done`,
- `completedAt === null`,
- still sitting in `col_{boardId}_to_do`.

A touched duplicate is **left in place** and reported via `console.info`. It becomes a bare orphan the
operator can delete by hand — losing their work silently is the worse failure.

**Measured state before the change (read from this machine's localStorage on 2026-07-27):** all 15
tasks across both boards are untouched — `subDone: 0`, all in `_to_do`, `completedAt: null`,
`createdAt === updatedAt`. So the guard is expected to be a no-op here and all five are pruned.

**Reversal path:** revert the seed-file commit and clear `bbiz_seed_dedupe_v1`; the next boot's
`backfillAndStripSeeds()` re-appends the five tasks by title with fresh ids and their canonical
`seedOrder`. Completion state on a pruned task is *not* recoverable — which is why the guard exists.

## Files Modified

- `src/data/seed-tasks/ummah-seed-tasks.js` — 5 task objects removed; `seq` renumbered to a complete
  `0..5` / `0..3` permutation on the two boards; one `priority` bump.
- `src/services/migration.js` — `pruneRemovedSeedTasks()` (pure, unit-tested) + one-shot runner and
  the removed-title table.
- `src/services/__tests__/` — prune unit test (untouched → removed; touched → kept).
- `src/data/seed-tasks/__tests__/` — guard test: the removed titles are absent and the boards hold
  6 / 4 tasks.

## Amanah Gate

- [x] Halal purpose confirmed — removing duplicated task content so the operator is not asked to do
      the same work twice; no fiqh authored, no revelation text touched, no capital surface.
- [x] No riba/gharar concerns — no capital, sale, or contract surface. The waqf/bayt al-mal content
      is retained, not removed: the survivor is the richer of the two treasury tasks.
- [x] Itqan standard met — survivors chosen on stated criteria (grounding density, tier fit,
      subsumption), each removal recorded in the decision record with its rationale, and the subtasks
      lost with the removed tasks named explicitly rather than dropped silently.
- [ ] Existing tests still pass — to be confirmed at the Phase 4 gate (`npm test`, `npm run lint`,
      `npm run build`).

## Key Decisions

1. **Clean removal, not a merge.** Folding the removed tasks' unique subtasks into the survivors
   would produce 7-subtask tasks and an unreviewable diff. The orphaned subtasks are named in the ADR
   as fold-in candidates for a later pass: "Establish a referral network for cases beyond the
   community's capacity" · "Design a structured curriculum with clear learning outcomes" · "Form a
   waqf committee…" / "Draft the waqf deed…" · "Review the programme after three months" ·
   "Establish a waqf endowment to fund perpetual land stewardship operations".
2. **Identify tasks by `seq`, not by title, when editing the seed file** — the edit was applied by a
   line-anchored script keyed on the unique `seq` integer, so no em-dash/cp1252 title matching was
   involved in a 20.9k-line file.
3. **Explicit removal table over a generic orphan sweep** — see above.

## Open Questions

- None outstanding. The survivor choices and the youth-pair judgment (dedupe vs keep both) were put
  to the operator before implementation and answered.

## Reviewer Notes

[Space for human reviewer to annotate]

## Decision

- [x] **Approved** — approved in-session by the operator on 2026-07-27 (plan approval covering the
      `stages/` gate for this dedupe and its prune migration).
- [ ] **Rejected** — rework needed (see notes above)
