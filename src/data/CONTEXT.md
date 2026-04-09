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
- `maqasid.js` — MAQASID_PILLARS array (7 pillars), `getPillarById()`, `getPillarLabel()`, `getPillarStewardship()`
- `modules.js` — MODULES array (8 modules: people, work, money, tech, office, family, neighbors, community)

## Key Data Shapes

**Pillar** (maqasid.js):
```js
{ id, order, sidebarLabel, universalLabel, stewardshipLabel, arabicRoot, arabicRootAr, rootAction, accentColor, icon, subModuleIds[], status, relationship, readinessAyatKey }
```

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
