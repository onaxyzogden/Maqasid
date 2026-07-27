---
title: "Ummah Task Dedupe — Five Removals, and the Orphan-Prune Migration They Require"
type: decision
date: 2026-07-27
status: accepted
tags: [milos, seed-tasks, ummah, content, data-migration, dedupe]
superseded_by: null
---

# Ummah Task Dedupe — Five Removals, and the Orphan-Prune Migration They Require

## Context

[[2026-07-27-milos-seed-order-curation]] deferred this explicitly: curating `seq` on
`ummah_community_growth` and `ummah_moontrance-land_excellence` kept each duplicated pair **adjacent**
so the redundancy was visible rather than buried, and stopped there — *"deduplication is a content
change and was not made."*

**The deferral's count was wrong and is corrected here.** It said four pairs on `community_growth`
and **two** on `moontrance-land_excellence`; the seed file holds four and **one**. The honest figure
is **5 removals across 10 tasks**, not six. (The prior debrief also said "six.")

One finding governs the whole shape of this work:

**The seed↔storage join is exact `title` string equality.** `backfillAndStripSeeds()`
([project-store.js:126,159](src/store/project-store.js:126)) and `hydrateTask`/`stripSeedFields`
([seed-hydrator.js:99,156](src/services/seed-hydrator.js:99)) all key on the title. Task `id` is
random (`genTaskId()`), so the title is the *only* handle on a stored row. Two consequences:

1. **Renaming a surviving task breaks the join** and appends a duplicate. So survivors keep their
   titles **byte-for-byte**; this change is removals only, no re-titling, no description edits.
2. **Deleting a seed entry leaves a permanent orphan.** The backfill does
   `const seed = seedMap[t.title]; if (!seed) return t;` — there is no prune anywhere in the
   codebase. The orphan keeps its last-reconciled numeric `seedOrder`, so it **stays inside the
   curated chain at a stale slot and still blocks sequential locking if incomplete**, while rendering
   **bare** — its description, sources and tier were stripped from storage at seed time and can no
   longer be re-hydrated. **The dedupe is therefore incomplete without a prune migration.**

## Decision

### 1. Five removals. No merges, no re-titling.

Each pair loses one member outright. Removed content is recorded here in full so nothing disappears
silently.

**`ummah_community_growth` — 10 tasks → 6**

| Removed | Kept | Why the survivor |
|---|---|---|
| "Build a community dispute resolution (sulh) mechanism" (10 sources) | **"Establish a community dispute resolution (sulh) process — prevent conflicts from escalating"** (13) | Richer grounding; concrete named steps (identify 2–3 mediators → draft process doc → community buy-in → first dispute → rotation) |
| "Establish a community education institution (halaqa or weekend school)" (12) | **"Establish community education — launch a regular halaqa or weekend Islamic school programme"** (12) | Hadith-grounded description (the three ongoing deeds); growth-tier-shaped subtasks (survey → recruit teacher → venue → launch → month-one feedback). "Institution + curriculum design" is excellence-tier ambition sitting on a growth board |
| "Build a youth mentorship programme — invest in the next generation of community leaders" (10) | **"Develop a comprehensive youth programme rooted in Islamic identity"** (11) | Broader and richer; mentorship survives *inside* it as subtask 2 ("Recruit and train youth mentors from within the community") |
| "Establish a community treasury or waqf — build institutional financial sustainability" (10) | **"Establish a community treasury (bayt al-mal) for collective financial strength"** (14) | Richest task on the board; its subtask 5 already reaches waqf ("Explore establishing a community waqf (endowment)…"). **One edit to the survivor:** `priority: 'medium'` → `'high'`, inheriting the removed task's priority — a community treasury is not a medium-priority concern |

**`ummah_moontrance-land_excellence` — 5 tasks → 4**

| Removed | Kept | Why the survivor |
|---|---|---|
| "Develop a replicable Islamic land stewardship model — document, teach, and support new projects" (11) | **"Build a replicable Islamic land stewardship model that other communities can adopt and adapt"** (14) | Richer grounding; the open-source-toolkit framing is more concrete. **Bonus:** the removed task's subtask 5 duplicated the board's own standalone task *"Establish an intergenerational stewardship succession plan"* — removing it resolves a second, task-vs-subtask overlap |

**`seq` renumbered** so each board is again a complete `0..n-1` permutation (the curation ratchet fails
otherwise); relative curated order is preserved, the survivors simply compact:

- `ummah_community_growth` → **0** sulh process · **1** education launch · **2** youth programme ·
  **3** women's programming · **4** dawah & outreach · **5** bayt al-mal
- `ummah_moontrance-land_excellence` → **0** closed-loop · **1** surplus food · **2** replicable model ·
  **3** succession plan

### 2. Content casualties, named rather than silently dropped

These subtasks existed only on removed tasks and are gone. Recorded as **fold-in candidates for a
later pass**; deliberately *not* folded in now, so the diff stays a clean removal a human can review:

- "Establish a referral network for cases beyond the community's capacity"
- "Design a structured curriculum with clear learning outcomes"
- "Form a waqf committee…" / "Draft the waqf deed…"
- "Review the programme after three months"
- "Establish a waqf endowment to fund perpetual land stewardship operations"

### 3. A one-shot prune migration, guarded by "did the operator touch this?"

New in [migration.js](src/services/migration.js), following the existing `MOJIBAKE_FLAG` idiom:

- Flag `seed_dedupe_v1` (stored `bbiz_seed_dedupe_v1`), so it runs exactly once.
- A literal `REMOVED_SEED_TASKS` table of the five titles, **copied from the seed file before
  deletion** — since the join is the title string, these strings are the only handle on the rows.
- `pruneRemovedSeedTasks(tasks, removedTitles, boardId)` is **pure** and therefore unit-testable
  without localStorage; it returns the *same array reference* when nothing matches. The impure
  runner reads `tasks_{boardId}`, prunes, writes back, sets the flag.
- **Safety guard:** a matching task is deleted **only if untouched**. The predicate is
  `taskHasState()` — which already existed, module-private, in [mojibake.js](src/services/mojibake.js)
  for picking the survivor of a title collision, and is here **exported rather than re-implemented**.
  It covers `completedAt`, `dueDate`, `notes`, checklist items, attachments, a non-`to_do` column,
  and any subtask that is `done`, `notApplicable` or snoozed. Deliberately generous: a false positive
  leaves a stale row the operator can delete by hand; a false negative destroys their work.
- A touched duplicate is **left in place** and named via `console.info` so the operator can remove it
  deliberately.
- **Ordering:** runs after `repairMojibakeTaskTitles()` (it depends on exact titles having been
  restored) and before hydration. Order-independent w.r.t. `backfillAndStripSeeds` — a leftover
  orphan is simply skipped by the backfill either way.
- **Approval gate:** `stages/implement-ummah-dedupe-review.md`, per the CI/CD rule that data
  migrations need a `stages/` doc. Marked approved in-session.

## Consequences

- The two Ummah boards carry no redundant work; `community_growth` is a 6-step chain and
  `moontrance-land_excellence` a 4-step chain.
- **This is destructive to storage by design.** Verified before running: all 15 tasks on both boards
  were untouched on this machine (`subDone: 0`, all in `_to_do`, `completedAt: null`,
  `createdAt === updatedAt`), so the prune cost no operator progress. **Another install holding
  progress on a removed task is not covered** — there the guard fires, the row survives as a bare
  orphan, and the operator is told.
- Reversal path: restore the five task objects to the seed file, revert the `seq` renumbering, and
  clear `bbiz_seed_dedupe_v1`. Storage rows already pruned do not come back, but re-seeding recreates
  them from the restored seed entries.
- `seedOrder` in storage is reconciled on the next boot, so both boards renumber without any manual
  step. Stale `order` values survive on the rows but no longer govern anything (see
  [[2026-07-27-milos-board-order-single-authority]]).

## Verification

- `npm test` **180/180** across 8 files, including a new guard test
  (`src/data/seed-tasks/__tests__/ummah-dedupe.test.js`) asserting the five removed titles never
  reappear, both boards hold exactly their survivors **in curated order**, and the treasury task is
  `priority: 'high'`; plus `src/services/__tests__/seed-dedupe-prune.test.js` pinning the pure helper
  (untouched → removed; **9 parameterized "touched" cases each veto the delete**; non-matching input
  returns the same array reference; no-op on empty/null).
- `npm run lint` composite green (eslint 0 errors, grounding-strict pass, inline-refs `0 ≤ 0` across
  2047 subtasks / 8 pillars, glyphs up to date at 41). `npm run build` ✓.
- **Preview, against the operator's real localStorage:** after one reload `bbiz_seed_dedupe_v1` is
  `"1"`; `bbiz_tasks_ummah_community_growth` holds **6** tasks with `seedOrder` a complete `0..5` and
  `bbiz_tasks_ummah_moontrance-land_excellence` **4** with `0..3`; all five removed titles absent from
  storage and from the DOM. Both boards render their survivors as `01…06` / `01…04` in curated order.
  Screenshot captured.

## Amanah Gate

**Neutral–positive.** Removing duplicated halal task content so the operator is not asked to do the
same work twice; the richer-grounded member of each pair survives untouched, and the removed
subtasks are named here rather than vanishing. No fiqh authored, no revelation text touched, no
capital surface. Itqan: the destructive half runs behind a written approval gate, a one-shot flag,
and a guard that refuses to delete anything the operator has worked on.
