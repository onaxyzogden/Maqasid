# Static Data — CONTEXT.md

## Purpose
Static configuration, content, and seed data organized into thematic subdirectories. No runtime state — all exports are constants or pure lookup functions.

## Routing Table (subdirectories)

| Subdirectory | Content | CONTEXT.md |
|---|---|---|
| `ayat/` | Readiness ayat router + 13 per-pillar Quranic verse files | `ayat/CONTEXT.md` |
| `seed-tasks/` | Initial task templates per pillar (6 files) | `seed-tasks/CONTEXT.md` |
| `bbos/` | BBOS pipeline, task definitions, role access, stage Islamic grounding | `bbos/CONTEXT.md` |
| `islamic/` | Core Islamic data, glossary, five pillars, pillar content, dashboard data | `islamic/CONTEXT.md` |
| `config/` | Domain configs: money categories, contacts, departments, labels, recruitment | `config/CONTEXT.md` |
| `module-overviews/` | Maqasid framework overviews per module (6 files) | — |

## Root-Level Files (stay here)
- `maqasid.js` — `MAQASID_PILLARS` array (**8** entries — the 7 Maqasid + `moontrance`) and `MAQASID_CORE_PILLARS` (the 7, moontrance filtered out — what the orientation carousel and the landing wheel iterate). Helpers: `getPillarById()`, `getPillarForModule()`, `getPillarLabel()`, `getSubmoduleLabel()`, `getPillarStewardship()`, `getPillarDescription()`, `getPillarBoardSegments()`. The three `get*Label`-family helpers plus `getPillarDescription` all take `valuesLayer` and fall back to the Islamic string when no universal variant exists
- `maqasid-resolve.js` — `resolveSubmoduleFromBoardId()` / `resolveSubmoduleFromProject()`, the single place board ids are turned into a `{pillarId, submoduleId}` pair, plus the `FAITH_MODULE_TO_SUBMODULE` short-form table. Imported by `store/task-store.js` and `services/seed-hydrator.js`
- `modules.js` — MODULES array (8 modules: people, work, money, tech, office, family, neighbors, community)

## Board ids ↔ submoduleIds

Board ids are `{pillarId}_{segment}_{level}` (`faith_salah_core`). **A pillar's id is not
its submodule prefix.** Environment's pillar id is `environment` while its `subModuleIds`
are `env-resource`, `env-waste`, `env-ecosystem`, `env-sourcing`; Community's are bare
(`collective`, `neighbors`). So a board id can never be turned back into a submoduleId by
reassembling `${pillarId}-${segment}` — that silently produced `submoduleId: null` for
every Environment board until 2026-08-15.

`getPillarBoardSegments(pillarId)` (maqasid.js) is the bridge: it returns each
`subModuleIds` entry with its prefix stripped, **in the same order and of the same
length**, so a matched segment's index reads straight back into `subModuleIds`. Both
`maqasid-resolve.js` and `orientation-selector.js`'s `orderPillarBoards` key off it. Keep
the two arrays aligned 1:1 — a test in `__tests__/maqasid-resolve.test.js` guards it.

## Key Data Shapes

**Pillar** (maqasid.js):
```js
{ id, order, sidebarLabel, universalLabel, stewardshipLabel, universalStewardship,
  description, universalDescription, arabicRoot, arabicRootAr, rootAction,
  accentColor, icon, subModuleIds[], status, relationship, readinessAyatKey }
```
The `universal*` fields are **optional** — only pillars whose Islamic copy names something
layer-specific carry one (faith, wealth, environment, moontrance for `universalDescription`), and
the helpers fall through to the Islamic string rather than duplicating a neutral sentence that
would silently drift. `description` is the one-line domain sentence shown on the orientation card —
its **only** consumer since the landing page's Seven Maqasid tab section was removed upstream
(2026-07-28). The landing hero wheel still iterates `MAQASID_CORE_PILLARS`, but reads
`stewardshipLabel`, not this field. `PILLAR_DESCRIPTIONS` in
`components/onboarding/PillarFirstEntry.jsx` is a deliberately different (longer, first-run
explainer) voice and is not a duplicate of this field.

**Readiness Ayah** (per binary key):
```js
{ arabic, transliteration, translation, source: 'Surah X:Y', edition, framing }
```

**Seed Task**:
```js
{ title, priority: 'urgent'|'high'|'medium'|'low', tags[] }
```

## Readiness Ayat Routing
1. User answers 6 yes/no readiness questions → binary string (e.g., '100010')
2. `lookupReadinessAyahByKey(readinessAyatKey, binaryKey)` → looks up pillar registry
3. Returns Quranic ayah with Arabic, translation, and framing message
4. Returns `null` if key is '111111' (all YES) — no pause needed

## Naming Conventions
- Readiness files: `{pillar}-readiness-ayat.js`, exports: `READINESS_AYAT_{PILLAR}`
- Seed files: `{pillar}-seed-tasks.js`, exports: `{PILLAR}_SEED_TASKS`
