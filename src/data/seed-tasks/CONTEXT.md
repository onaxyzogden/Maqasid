# Seed Tasks

## Purpose
Initial task templates seeded when a pillar project is created. Each file exports an array of starter tasks with titles, descriptions, and default metadata for its respective pillar.

## File Inventory
| File | Role |
|------|------|
| faith-seed-tasks.js | Starter tasks for Faith (Din) pillar projects |
| health-seed-tasks.js | Starter tasks for Health (Nafs) pillar projects |
| family-seed-tasks.js | Starter tasks for Family (Nasl) pillar projects |
| intellect-seed-tasks.js | Starter tasks for Intellect (Aql) pillar projects |
| wealth-seed-tasks.js | Starter tasks for Wealth (Mal) pillar projects |
| environment-seed-tasks.js | Starter tasks for Environment pillar projects |
| ummah-seed-tasks.js | Starter tasks for Ummah pillar projects (incl. Moontrance boards) |
| prayer-seed-tasks.js | Prayer boards — **generated** from `FAITH_SEED_TASKS`, not hand-authored |
| weekly-seed-tasks.js | `weekly_{moduleId}` planning boards (not pillar tiers; outside the `seq` ratchet) |

## Task Schema — `seq` (curated chain order)
A seed task may carry `seq` (integer). It is the **deliberate chain position** of that task on its
board: `project-store.seedChainOrder()` turns it into the persisted `seedOrder`, which the
orientation sequential-locking chain (`orientation-selector.orderBoardTasks`) and every
kanban/list/dashboard surface sort by. A board without any `seq` falls back to array order.

Rules (enforced by `__tests__/seed-order.test.js`, so a violation fails `npm test`):
- A board either has **no `seq` at all**, or **every** task has one forming a complete permutation of
  `0..n-1` — no gaps, no duplicates, no partial coverage. **Adding a task to a curated board means
  giving it a `seq` and renumbering.**
- **All 90 hand-authored boards are curated and ratcheted** (28 core + 62 growth/excellence, 2026-07-27)
  — no board may regress to uncurated, and a **new board must arrive with `seq` already assigned**.
  Prayer boards are generated from `FAITH_SEED_TASKS` and inherit the generator's order.
- Curation rubric, rationale and per-board reasoning:
  [2026-07-27-milos-seed-order-curation](wiki/decisions/2026-07-27-milos-seed-order-curation.md).
- `seq` is **not** persisted onto the task; only the derived `seedOrder` is. Editing `seq` re-orders
  boards that already exist in `localStorage`, because `backfillAndStripSeeds()` reconciles
  `seedOrder` on every boot.

## Gotcha — the seed↔storage join is the exact `title` string

`backfillAndStripSeeds()` ([project-store.js](../../store/project-store.js)) and
`hydrateTask`/`stripSeedFields` ([seed-hydrator.js](../../services/seed-hydrator.js)) all key on
`title`; task `id` is random (`genTaskId()`). Two consequences that bite:

- **Renaming a seed task orphans its stored row** and appends a duplicate on the next boot. Fix a
  typo only with a migration that rewrites the stored title too (see `repairMojibakeTaskTitles`).
- **Deleting a seed task leaves a permanent orphan** — the backfill does `if (!seed) return t;` and
  there is no prune. The orphan keeps its numeric `seedOrder`, so it holds a stale slot in the
  curated chain, still **blocks sequential locking** if incomplete, and renders **bare** (its
  `description`/`sources`/`tier` were stripped from storage and can no longer be re-hydrated).
  A removal therefore needs a one-shot prune in [migration.js](../../services/migration.js) — see
  `REMOVED_SEED_TASKS` / `pruneRemovedSeedTasks`, which deletes a row only when `taskHasState()` says
  the operator never touched it, and the ADR
  [2026-07-27-milos-ummah-task-dedupe](../../../wiki/decisions/2026-07-27-milos-ummah-task-dedupe.md).

Board task counts after the 2026-07-27 dedupe: `ummah_community_growth` **6**,
`ummah_moontrance-land_excellence` **4**.

## Adding a subtask to an existing seed task

Unlike tasks, **new seed subtasks do reach already-seeded boards** — `backfillAndStripSeeds()`
computes the set difference by title and appends what storage lacks, every boot. Two catches:

- **It appends at the END**, ignoring seed position, and it runs on `requestIdleCallback` *after*
  mount. If the subtask's position matters (a sequentially-locked chain — e.g. designing a curriculum
  must not land after collecting first-month feedback), the seed edit alone is not enough: it needs a
  one-shot in [migration.js](../../services/migration.js) that performs the **insertion** itself
  pre-mount. See `FOLDED_SUBTASK_ORDER` / `alignSubtaskOrder` / `foldInSeedSubtasks`, whose order
  table is a **literal** (seeds are lazy-loaded; `runMigrations()` is pre-mount) pinned to this
  directory by the drift-guard test in `__tests__/subtask-foldin.test.js`. **If you re-order or
  rename a subtask on a task listed in that table, update the table — the test will tell you.**
- **Appending to a *completed* task re-opens it** in the orientation chain: `isTaskComplete` is pure
  `subtasks.every(satisfied)`.

Subtask counts on the four `ummah_community_growth` tasks changed by the 2026-07-27 fold-in:
sulh **6**, education **6**, youth **6**, bayt al-mal **7**
([2026-07-27-milos-subtask-foldin](../../../wiki/decisions/2026-07-27-milos-subtask-foldin.md)).

## Subtask Schema
Each subtask may carry:
- `title` (string, required)
- `done` (bool)
- `description` (markdown) — read-only reference text
- `sources` (markdown) — read-only reference citations
- `tier` (`'T1' | 'T2' | 'T3'`) — Amanah Gate Protocol classification; see `wiki/concepts/amanah-gate-protocol.md`. Generated via `scripts/grade-amanah-tiers.mjs` (NotebookLM grader) and applied via `scripts/apply-amanah-tiers.mjs`. T1=Bayyinah (clear proof), T2=Qarina (contextual indication), T3=Aspiration/Niyyah (declared intent).

## Dependencies
- Stores: consumed by task/project creation flows in Zustand stores
- Data: none (pure seed data)
- Hydration: `src/services/seed-hydrator.js` patches `description`, `sources`, and `tier` from here onto user-stored tasks at read time
