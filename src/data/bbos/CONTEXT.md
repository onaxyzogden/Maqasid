# BBOS

## Purpose
BBOS pipeline configuration — stages, task definitions, role access, and Islamic grounding per stage. Powers the Barakah Business Operating System pipeline UI and logic.

## File Inventory
| File | Role |
|------|------|
| bbos-gate-log.js | Pure helpers for `project.bbosGateLog` (entries are only ever added): `buildGateEntry` (refuses an empty basis, an unknown decision or a missing stage), `appendGateEntry`, `gateEntriesForStage` (newest first), `openConditions(log, stageId, cycle)` (unresolved conditions entries). Decision `'resolved'` closes a conditions entry via `resolvesId` (refuses unknown, non-conditions or already-resolved targets; takes stage/cycle from the target). Tested in `__tests__/bbos-gate-log.test.js` |
| bbos-pipeline.js | Stage definitions (IDY through OPT — 9 stages: IDY/CRD/STR/OFR/OUT/SLS/DEL/RET/OPT) with metadata, order, and transitions |
| bbos-task-definitions.js | Task templates assigned to each pipeline stage |
| bbos-role-access.js | Role-based access control per stage (who can view/edit/approve) |
| bbos-stage-islamic.js | Islamic grounding per stage — ayat, hadith, and maqasid alignment references |

## Dependencies
- Stores: consumed by `src/store/` BBOS-related stores
- Data: `bbos-stage-islamic.js` references ayat data; other files are self-contained config
