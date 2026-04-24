# Ogden Pages — CONTEXT.md

## Purpose
OGDEN Ecosystem meta-module. Tracks the journey of BBOS + MILOS (Maqasid) + Atlas (OLOS) converging to realize Moontrance.

Not a Maqasid pillar — renders as a standalone section in the sidebar below the Moontrance pillar row.

## Levels (display copy override)
Internal keys remain `core | growth | excellence` (for LevelNavigator, board id, progress hook compatibility). Display copy overridden via `OGDEN_LEVELS` in `@data/ogden-ecosystem`:
- Level 1 — **Foundation** (core)   — systems stood up independently
- Level 2 — **Integration** (growth) — systems wired together
- Level 3 — **Realization** (excellence) — ecosystem delivers Moontrance

## Sub-pillars
- `bbos` — Barakah Business Operating System
- `maqasid` — MILOS
- `atlas` — OLOS (land intelligence)

## File Inventory
| File | Purpose |
|---|---|
| `OgdenLevelNavigator.jsx` | Wraps shared LevelNavigator with Ogden sub-pillars + level overrides |
| `OgdenLevelOverview.jsx` | Wraps shared LevelOverviewPage (FLO bento grid); no comparison wheel in v1 |
| `OgdenFoundationPage.jsx` | Tier wrapper — `level="core"` |
| `OgdenIntegrationPage.jsx` | Tier wrapper — `level="growth"` |
| `OgdenRealizationPage.jsx` | Tier wrapper — `level="excellence"` |
| `OgdenPillarPage.jsx` | Sub-pillar board host (wraps shared PillarLevelPage) |
| `OgdenBbosPage.jsx` · `OgdenMaqasidPage.jsx` · `OgdenAtlasPage.jsx` | Sub-pillar routes |

## Routes
- `/app/ogden-foundation` · `/app/ogden-integration` · `/app/ogden-realization`
- `/app/ogden-bbos` · `/app/ogden-maqasid` · `/app/ogden-atlas`

## Data
- `src/data/ogden-ecosystem.js` — pillars, level routes, level copy, accent (`#7E6EAD`)
- `src/data/modules.js` — 3 entries: `ogden-bbos`, `ogden-maqasid`, `ogden-atlas`
- `src/store/project-store.js` — `OGDEN_BOARDS` (9 boards: 3 sub-pillars \u00d7 3 levels), `ensureOgdenProjects()`

## Sidebar
Rendered as a standalone `<div className="pillar-group">` in `Sidebar.jsx` after the `MAQASID_PILLARS.map()` block. Orbit icon, three children (BBOS, Maqasid, Atlas).

## Deferred
- Seed tasks per sub-pillar per level (no `OGDEN_SEED_TASKS` yet)
- Comparison wheel variant (3-lobe; hardcoded 8-lobe MaqasidComparisonWheel is not reused)
- Glossary entries for `ogden-bbos`, `ogden-maqasid`, `ogden-atlas`
