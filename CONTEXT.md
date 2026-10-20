# Maqasid OS V2.1 — Root Context (Layer 1 Task Router)

## Workspace Map

| If your task involves… | Go to workspace | Read first |
|---|---|---|
| Building features, fixing bugs, modifying UI or logic | `src/` | `src/CONTEXT.md` |
| Reading or updating project documentation, principles | `docs/` | `docs/CONTEXT.md` |
| Tracking tasks, reviewing lessons, project status | `tasks/` | `tasks/CONTEXT.md` |
| Finding lost files, maintaining CONTEXT.md routing | `scripts/` | `python scripts/pathfinder.py --help` |
| Checking style guides, voice docs, component specs | `references/` | `references/CONTEXT.md` |
| Reviewing staged output, approving deliverables | `stages/` | `stages/CONTEXT.md` |
| Personal notes, journals, brainstorms | `notes/` | `notes/CONTEXT.md` |
| Marketing website, landing pages, static HTML | `website/` | `website/CONTEXT.md` |
| Atlas land intelligence app (submodule) | `atlas/` | `atlas/README.md` |
| Browsing accumulated knowledge, decisions, synthesis | `wiki/` | `wiki/SCHEMA.md` |

## Project Entry Points
- **App bootstrap**: `index.html` → `src/main.jsx` → `src/App.jsx` (router + route definitions)
- **Build config**: `vite.config.js`, `eslint.config.js`
- **Dependencies**: `package.json` (React 19, Zustand 5, Router 7, Vite 8, dnd-kit, Lucide, date-fns)
- **Workflow principles**: `docs/principles.md` (Amanah Gate, Itqan, Sidq, verification rules)
- **Marketing website**: `website/index.html` (pure static HTML, no build)
- **Atlas app (OLOS)**: `atlas/` (git submodule → `onaxyzogden/atlas`, pnpm + Turborepo). Geospatial land intelligence app; React 18 + TypeScript + Vite + MapboxGL + Fastify + PostgreSQL/PostGIS; domain atlas.ogden.ag. Develop in the atlas repo directly — the submodule is for reference.
- **LLM Wiki**: `wiki/index.md` (persistent knowledge base — decisions, entities, concepts, synthesis)

## Build, Test & Grounding
```bash
npm run dev                     # Start Vite dev server
npm run build                   # Production build
npm run lint                    # Grounding gate: ESLint + lint:grounding-strict + audit:inline-refs
npm run lint:eslint             # ESLint only (flat config, eslint.config.js)
npm run preview                 # Preview production build
npm test                        # Vitest — schema/grounding conformance tests
npm run lint:grounding          # Informational pillar-level grounding report
npm run lint:grounding-strict   # Fails on legacy-string sources or schema errors
npm run audit:inline-refs       # Fails when description prose cites a ref missing from sources[] (ratchet at 0)
```

Grounding tooling (added 2026-04-25): every seeded subtask must have `sources` as a structured array `[{ kind, ref, translation, relevance, provenanceTier, rationale, ... }]` (per [wiki/decisions/2026-04-18-milos-grounding-two-axis.md](wiki/decisions/2026-04-18-milos-grounding-two-axis.md)). All 8 pillars are migrated; legacy-string entries are forbidden going forward. The grounding test in [src/data/seed-tasks/__tests__/grounding.test.js](src/data/seed-tasks/__tests__/grounding.test.js) ratchets per-pillar legacy counts at 0; the inline-refs auditor in [scripts/audit-inline-refs.mjs](scripts/audit-inline-refs.mjs) ratchets at 0 (closed via [wiki/decisions/2026-04-25-milos-inline-refs-hadith-backfill.md](wiki/decisions/2026-04-25-milos-inline-refs-hadith-backfill.md)). Run `npm test` and `npm run lint` after any seed-task edit.

## Naming
- Reference docs: kebab-case descriptive (`style-guide.md`, `voice-and-tone.md`)
- Journal entries: `YYYY-MM-DD.md` in `notes/journal/`
- Stage gate files and status values: `stages/CONTEXT.md`
