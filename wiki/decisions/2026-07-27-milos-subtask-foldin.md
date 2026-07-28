---
title: "Folding the Dedupe's Six Orphaned Subtasks Back In — Five Rows, One Merge, and the Order One-Shot They Need"
type: decision
date: 2026-07-27
status: accepted
tags: [milos, seed-tasks, ummah, content, data-migration, grounding]
superseded_by: null
---

# Folding the Dedupe's Six Orphaned Subtasks Back In — Five Rows, One Merge, and the Order One-Shot They Need

## Context

[[2026-07-27-milos-ummah-task-dedupe]] removed five duplicated Ummah tasks. Six subtasks lived
**only** on those removed tasks and went with them; that ADR named all six and deferred them
explicitly — *"fold-in candidates for a later pass; deliberately not folded in now, so the diff stays
a clean removal a human can review."* Operator direction this session: **"fold them in."**

Two things the exploration established before any edit:

1. **One of the six was not orphaned content at all.** `Establish a waqf endowment to fund perpetual
   land stewardship operations and new acquisitions` is a near-complete duplicate of
   `Create a land endowment fund that generates income for perpetual stewardship operations`, which
   already sits on a **sibling task of the same board** (`seq 3`, the succession plan) and already
   says *"structured as a waqf or charitable trust"*. Re-adding it as a row would have put two
   endowment subtasks on two tasks of one board — recreating exactly the redundancy the dedupe
   removed.
2. **Delivery to an already-seeded board works, but at the wrong position.**
   `backfillAndStripSeeds()` ([project-store.js:172-181](src/store/project-store.js:172)) appends new
   seed subtasks by title on **every** boot — so the rows *would* arrive — but it appends them at the
   **end** of the stored array, ignoring seed position. Hydration alone would not deliver them at
   all: `hydrateTask` maps over the **stored** array ([seed-hydrator.js:118-134](src/services/seed-hydrator.js:118)),
   so a 6th seed subtask against a 5-row stored array is invisible to it.

The curriculum row is the case that made position load-bearing rather than cosmetic: appended at the
end it lands **after** *"collect feedback after the first month"*, i.e. the operator is told to design
the curriculum after the programme has already run a month. In a sequentially-locked chain that is
not a cosmetic defect.

## Decision

### 1. Five verbatim rows, at curated seed positions — recovered from `ba18259^`

Each object literal was recovered byte-for-byte from `git show ba18259^:src/data/seed-tasks/ummah-seed-tasks.js`
and re-inserted at a chosen index. **No re-titling, no description edits** — per the join rule in the
dedupe ADR, a title becomes a permanent join key the moment it ships.

All five land on `ummah_community_growth`:

| Folded-in subtask | Host task (`seq`) | Index | Why there |
|---|---|---|---|
| `Establish a referral network for cases beyond the community's capacity` | sulh process (`0`) | **2** of 6 | The process document's own step 4 names external referral as the escalation path; building the directory is its follow-through, before the process goes to the community |
| `Design a structured curriculum with clear learning outcomes` | education launch (`1`) | **2** of 6 | After recruiting the teacher, before securing the venue — the case that decided the placement question |
| `Review the programme after three months — assess impact and refine the approach` | youth programme (`2`) | **5** (last) of 6 | A review follows the programme and its leadership pipeline |
| `Form a waqf committee with financial, legal, and community representation` | bayt al-mal (`5`) | **5** of 7 | Directly after *"Explore establishing a community waqf (endowment)…"*, which previously ended the task |
| `Draft the waqf deed — define the purpose, beneficiaries, and management structure` | bayt al-mal (`5`) | **6** (last) of 7 | Explore → form committee → draft deed is a coherent staging, not a repeat of the feasibility charter |

Subtask counts become **6 / 6 / 6 / 7** on those four tasks; `seq 3` (women's programming) and
`seq 4` (dawah) are untouched at 5. No task was added or removed, so `seq` is unchanged and the
permutation ratchet is untouched.

**Known reading, flagged not fixed.** The three-month review's prose is mentorship-pair-specific
(*"re-match pairs"*, *"mentors and mentees"*) while its new host is the broader youth programme. Not
off-scope — that task's subtask 2 is *"Recruit and train youth mentors from within the community"* —
but it reads narrower than its siblings. Kept verbatim, per the fold-in decision, rather than
silently rewritten.

### 2. The sixth is **merged**, not added

The existing endowment subtask ([ummah-seed-tasks.js:14315](src/data/seed-tasks/ummah-seed-tasks.js:14315))
absorbed what the removed one carried and it lacked:

- **`sources[]`** gained the Khaybar waqf narration (`Sahih al-Bukhari 2737`, `hadithGrade: "Sahih"`,
  `provenanceTier: "Bayyinah"`, `relevance: "direct"`) alongside its existing Quran 2:261 / 3:180 /
  Bukhari 1410 entries. This is the classical waqf proof text and the surviving subtask did not have
  it.
- **`description`** grew from 7 to 8 `**How?**` steps: the endowment's purposes now name **acquiring
  further land** and **training new communities to steward it** (it previously covered operations and
  maintenance only), and a new step requires a **separate board of mutawallis**, distinct from the
  land's operational leadership, with written investment and disbursement policies — *the people who
  spend the returns should not be the same people who govern the corpus.*

**Title untouched** — it is the join key. Description edits propagate for free: `stripSeedFields`
keeps `description` out of storage, so `hydrateTask` repatches it from the seed on every read. The
land board's shape is unchanged at 4 tasks × 5 subtasks.

**Inline-refs discipline:** the new prose carries **no** collection-name-plus-number strings.
`scripts/audit-inline-refs.mjs` ratchets at 0 and matches bare alternations
(`Bukhari|Muslim|Tirmidhi|…` followed by digits), so citing in prose is a needless risk. Refs belong
in `sources[]`.

### 3. A one-shot that performs the insertion itself

The backfill appends at the end, and it runs on `requestIdleCallback` **after** mount — so a
pre-mount migration that merely *re-ordered* would be a no-op followed by a wrong-order append. The
one-shot therefore does the insertion, before mount, after which the backfill's set difference finds
nothing to append.

New in [migration.js](src/services/migration.js), following the `pruneDedupedSeedTasks` pattern
exactly:

- Flag `seed_subtask_foldin_v1` (stored `bbiz_seed_subtask_foldin_v1`), independent of
  `SCHEMA_VERSION`.
- A **literal** `FOLDED_SUBTASK_ORDER = { boardId: { taskTitle: [...ordered subtask titles] } }`
  covering only the four affected tasks. Literal for the same reason `REMOVED_SEED_TASKS` is: seed
  modules are **lazy-loaded by dynamic `import()`** and `runMigrations()` runs synchronously **before
  React mounts** ([main.jsx:23](src/main.jsx:23)), so importing the 14k-line `ummah-seed-tasks.js`
  here would drag it into the boot path and regress `d9ca679`. **Exported**, so the drift guard test
  can compare it against the seed.
- **Pure exported helper `alignSubtaskOrder(tasks, orderTable)`.** For each listed task it rebuilds
  `subtasks` by walking the ordered title list, **reusing the stored row object** where the title
  matches (so `id`, `done`, snooze keys and anything else travel untouched) and creating
  `{ id: genSubtaskId(), title, done: false }` otherwise. Rows the seed does not know about — the
  operator's own — are appended at the end in their stored order. It returns the **same array
  reference** when nothing changed.
- **Duplicate-safe by construction:** the match uses a `taken[]` bitmap over the stored array, not a
  `Map<title, row>`. Each ordered slot consumes at most one stored row, so a board carrying two rows
  with the same title keeps both — one in place, one trailing. A `Map` would have silently eaten the
  second.
- **Guard:** a task with any `done === true` subtask is skipped entirely and named via `console.info`.
  Belt-and-braces, since `done` travels with the title in the rebuild anyway; and a skipped task still
  receives the new rows from the backfill (appended at the end), so **content is never lost — only
  ordering degrades**.
- Wired into `runMigrations()` immediately after `pruneDedupedSeedTasks()`: the removed tasks must be
  gone and titles already mojibake-repaired before the table is matched by title.
- **Drift guard test** deep-equals every `FOLDED_SUBTASK_ORDER` entry against the seed's actual
  subtask titles, and asserts the table covers exactly the tasks that received a folded row. The
  table is hardcoded; without this it can silently diverge from the seed and re-order a live board to
  a stale sequence. This is the most important test in the change.

### 4. Unrelated latent bug fixed in passing — the backfill's length gate

[project-store.js:175](src/store/project-store.js:175) guarded the new-subtask append with
`if (seedSubs.length > storedSubs.length)`. The set-difference filter below it plus
`if (newSubs.length > 0)` was already the correct and complete condition. The length gate meant any
task where the operator had added **even one subtask of their own** would have stored length ≥ seed
length and therefore **silently never receive another seed subtask again**, on any pillar, forever.
Dropped. It changes nothing observable today — nothing on the Ummah boards is user-modified — which
is precisely why it could sit there unnoticed.

## Consequences

- No content from the dedupe is lost, and no new duplication was introduced: the one subtask that
  would have duplicated is merged into its twin instead of added beside it.
- **Appending a subtask re-opens a finished task.** `isTaskComplete`
  ([orientation-selector.js:51-53](src/data/orientation-selector.js:51)) is pure
  `subtasks.every(satisfied)`, so growing a completed task's array puts it back in the sequential
  chain. Every subtask on both boards was untouched here (`subDone: 0`, all `_to_do`), so it did not
  bite — it is why the one-shot carries the `done` guard, and it is now recorded in
  `src/components/orientation/CONTEXT.md` for the next author who grows a seed task.
- The dedupe ADR's deferral is closed and marked as such in place.
- Reversal path: delete the five literals and revert the merged subtask's `sources`/`description`,
  then clear `bbiz_seed_subtask_foldin_v1`. Rows already written to storage do not disappear — they
  become orphaned subtask rows on a live task, which nothing prunes (subtask-level orphans render
  bare, exactly like task-level ones).

## Verification

- `npm test` **208/208 across 10 files** (was 180/8). Two new files:
  `src/services/__tests__/seed-subtask-foldin.test.js` — 9 cases pinning that the rebuild **adds and
  moves but never loses** (row-object identity asserted with `toBe`; operator-created rows appended;
  duplicate titles both survive; a `done` task skipped and reported; same-reference no-op; malformed
  input safe) — and `src/data/seed-tasks/__tests__/subtask-foldin.test.js` — position + sources per
  folded row, the merge pinned (no second endowment subtask anywhere on the land board; the survivor
  carries `Sahih al-Bukhari 2737` and the mutawalli/acquisition/training steps; land board still
  4 × 5), plus the drift guard.
- `npm run lint` composite green: eslint 0, grounding-strict *"all entries conform to two-axis schema
  (0 empty-array under ratchet 0)"*, inline-refs **0 ≤ 0** across 2052 subtasks / 8 pillars, pillar
  glyphs up to date (41). `npm run build` ✓ 1.42s, and `seed-ummah-*.js` is still its own ~1,400 kB
  **lazy** chunk — confirming `migration.js` did not pull the seed into the boot path.
- **Live, against the operator's real `localStorage`.** Before: flag `null`, all four arrays at 5,
  every subtask `id` recorded. After **one reload**: `bbiz_seed_subtask_foldin_v1 === '1'`, arrays at
  **6 / 6 / 6 / 7**, **every original subtask `id` preserved and in order**, new rows at the curated
  indices — including the critical *inserted-not-appended* case, `sub_dIae` sitting at index 2
  between the two pre-existing rows on the education task.
  `bbiz_tasks_ummah_moontrance-land_excellence` still 4 tasks, succession task still 5 subtasks.
- **Hydration proven in-page** (`import('/src/services/seed-hydrator.js')` → `preloadBoardSeeds`):
  the curriculum row hydrates at index 2 with refs `["Quran 96:1-5","Quran 20:114"]` and a 1,264-char
  description — i.e. it renders **grounded, not bare**; the endowment subtask hydrates with refs
  `["Quran 2:261","Quran 3:180","Sahih al-Bukhari 1410","Sahih al-Bukhari 2737"]`, `mutawallis`
  present, 8 numbered steps.
- **No screenshot of the subtask stepper, and this is a real gap, not a tooling failure.** The board
  UI at `/app/community` sits behind `CeremonyGuard`'s Daily Niyyah, and the only two ways past it —
  `completeNiyyah(...)` and `skipNiyyah()` ([NiyyahAct.jsx:170-187](src/components/islamic/NiyyahAct.jsx:170))
  — both **write to the operator's daily spiritual record**. I declined to forge a niyyah for a
  screenshot; `/app/orientation` is unguarded but surfaces only per-pillar "NOW" cards, none of them
  an affected task. A screenshot of the ceremony gate was captured instead. Verification is therefore
  **storage-level and hydration-level**, stated plainly rather than dressed up as a visual check.

## Amanah Gate

**Neutral–positive.** Restoring halal task content that a deduplication pass dropped, so no work the
operator was previously offered is silently lost; the one genuinely redundant item is merged rather
than re-duplicated. No fiqh authored — the five rows are verbatim prior content, and the only new
prose is the merged endowment's governance steps, which state a stewardship separation-of-duties
principle rather than a ruling. The Khaybar narration added to `sources[]` is the classical waqf
proof text, cited with grade and tier per the two-axis schema
([[2026-04-18-milos-grounding-two-axis]]). No capital surface, no sale-of-what-one-does-not-possess:
the endowment is a waqf corpus funded from held assets, not an advance purchase, so the standing
*bayʿ mā laysa ʿindak* constraint (CSRA/salam erased 2026-05-04) is untouched. Itqan: the storage half runs behind a written approval gate
(`stages/implement-subtask-foldin-review.md`), a one-shot flag, a guard that refuses to touch a task
the operator has begun, and a drift test that fails loudly if the hardcoded table ever stops matching
the seed.
