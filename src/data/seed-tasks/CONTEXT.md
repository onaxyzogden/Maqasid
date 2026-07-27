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

## Task Schema — `seq` (curated chain order)
A seed task may carry `seq` (integer). It is the **deliberate chain position** of that task on its
board: `project-store.seedChainOrder()` turns it into the persisted `seedOrder`, which the
orientation sequential-locking chain (`orientation-selector.orderBoardTasks`) and every
kanban/list/dashboard surface sort by. A board without any `seq` falls back to array order.

Rules (enforced by `__tests__/seed-order.test.js`, so a violation fails `npm test`):
- A board either has **no `seq` at all**, or **every** task has one forming a complete permutation of
  `0..n-1` — no gaps, no duplicates, no partial coverage. **Adding a task to a curated board means
  giving it a `seq` and renumbering.**
- All 28 `*_core` boards are curated and ratcheted — core may not regress to uncurated. Growth and
  excellence boards are not yet curated (named follow-up).
- Curation rubric, rationale and per-board reasoning:
  [2026-07-27-milos-seed-order-curation](wiki/decisions/2026-07-27-milos-seed-order-curation.md).
- `seq` is **not** persisted onto the task; only the derived `seedOrder` is. Editing `seq` re-orders
  boards that already exist in `localStorage`, because `backfillAndStripSeeds()` reconciles
  `seedOrder` on every boot.

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
