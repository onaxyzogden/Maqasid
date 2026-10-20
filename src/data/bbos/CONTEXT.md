# BBOS

## Purpose
BBOS pipeline configuration — stages, task definitions, role access, and Islamic grounding per stage. Powers the Barakah Business Operating System pipeline UI and logic.

## File Inventory
| File | Role |
|------|------|
| bbos-named-gates.js | The five gates the Factory docs name, evaluated purely from task `bbosFieldData`: `STAGE_GATES` (CRD amanah + viability, OUT baseline, DEL preship, OPT constraint), `GATE_RULES`, `evaluateStageGates(stageId, tasks)` → `{ status, gates }` (status ranked none < clear < conditions < incomplete < blocked), `gateMoveRefusal(project, tasks, record)` → evaluation or null. Blocked/incomplete always refuse (no override: ★ disqualifier, 5+ flags, Viability fail, 2+ IC fails, TYPE A); conditions need a `'conditions'` entry with that `gateId` this cycle, all resolved; acknowledgements must be in `record.acknowledged`. Shared by the store and both dashboards. Tested in `__tests__/bbos-named-gates.test.js` |
| bbos-gate-log.js | Pure helpers for `project.bbosGateLog` (entries are only ever added): `buildGateEntry` (refuses an empty basis, an unknown decision or a missing stage), `appendGateEntry`, `gateEntriesForStage` (newest first), `openConditions(log, stageId, cycle)` (unresolved conditions entries). Decision `'resolved'` closes a conditions entry via `resolvesId` (refuses unknown, non-conditions or already-resolved targets; takes stage/cycle from the target). Decision `'reversed'` (Undo) points at its target via `reversesId`. The target must be the **last** log entry and a proceed, halt or cycle, which also blocks a double reversal. `reverseGateDecision(project, entryId, { basis, by })` appends it and restores the pipeline: stage for proceed, rejection fields cleared for halt, cycle + stage for cycle. It returns the same object if refused. `isReversed(log, id)`. Conditions entries may carry `gateId` and `resolverRole`; a `'resolved'` entry for a role-bound condition is refused unless `record.by` is that role. Proceed/cycle entries carry `acknowledged` (array). Tested in `__tests__/bbos-gate-log.test.js` |
| bbos-pipeline.js | Stage definitions (IDY through OPT — 9 stages: IDY/CRD/STR/OFR/OUT/SLS/DEL/RET/OPT) with metadata, order, and transitions |
| bbos-task-definitions.js | Task templates assigned to each pipeline stage |
| bbos-role-access.js | Role-based access control per stage (who can view/edit/approve) |
| bbos-stage-islamic.js | Islamic grounding per stage — ayat, hadith, and maqasid alignment references |

## Dependencies
- Stores: consumed by `src/store/` BBOS-related stores
- Data: `bbos-stage-islamic.js` references ayat data; other files are self-contained config
