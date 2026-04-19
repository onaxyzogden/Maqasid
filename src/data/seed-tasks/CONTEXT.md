# Seed Tasks

## Purpose
Initial task templates seeded when a pillar project is created. Each file exports an array of starter tasks with titles, descriptions, and default metadata for its respective pillar.

## File Inventory
| File | Role |
|------|------|
| faith-seed-tasks.js | Starter tasks for Faith (Din) pillar projects |
| life-seed-tasks.js | Starter tasks for Life (Nafs) pillar projects |
| family-seed-tasks.js | Starter tasks for Family (Nasl) pillar projects |
| intellect-seed-tasks.js | Starter tasks for Intellect (Aql) pillar projects |
| wealth-seed-tasks.js | Starter tasks for Wealth (Mal) pillar projects |
| environment-seed-tasks.js | Starter tasks for Environment pillar projects |

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
