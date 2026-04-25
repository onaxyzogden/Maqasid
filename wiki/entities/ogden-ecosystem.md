---
title: "OGDEN Ecosystem"
type: entity
subtype: meta-module
status: scaffolded
created: 2026-04-24
updated: 2026-04-24
---

# OGDEN Ecosystem

A meta-module inside MILOS that tracks the convergence of the three OGDEN systems —
[[bbos-pipeline|BBOS]], [[milos]], and [[olos|Atlas]] — into the realization of
Moontrance. It is not a Maqasid pillar; it sits below the Moontrance pillar in
the sidebar as a standalone section.

## Why it exists

BBOS, MILOS, and Atlas each advance on their own roadmaps, but Moontrance — the
covenant-grounded land + community + worship outcome — only emerges when the
three interlock. Before this module, there was no single surface that showed the
**journey of the ecosystem itself**. Each tool had a status page; the
integration did not.

OGDEN Ecosystem is that surface.

## Structure

### Sub-pillars (3)

| Sub-pillar | Represents | Route |
|---|---|---|
| BBOS | [[bbos-pipeline]] — 8-stage covenant pipeline for Islamic business | `/app/ogden-bbos` |
| MILOS   | [[milos]] — this project; the operating system for the Seven Maqasid | `/app/ogden-milos` |
| Atlas | [[olos]] — geospatial land intelligence (CSRA readiness) | `/app/ogden-atlas` |

Moontrance itself is intentionally **not** a sub-pillar — it is the target the
three sub-pillars produce.

### Levels (custom display copy; internal keys preserved)

Internal keys remain `core | growth | excellence` so that shared components
(`LevelNavigator`, `LevelOverviewPage`, `useModulesProgress`, board id patterns)
work unchanged. The display copy is overridden per level via `levelDescriptions`:

| Internal key | Display | Meaning |
|---|---|---|
| `core` | **Foundation** | Each system stood up — BBOS, MILOS, Atlas operating independently |
| `growth` | **Integration** | Systems wired together — shared data, shared gates, shared covenant |
| `excellence` | **Realization** | The ecosystem delivers Moontrance — land, community, and worship in one flow |

Routes: `/app/ogden-foundation`, `/app/ogden-integration`, `/app/ogden-realization`.

### Boards

9 project boards seeded lazily by `ensureOgdenProjects` in `src/store/project-store.js`:
`ogden_{bbos|maqasid|atlas}_{core|growth|excellence}`. Empty by design — journey
tasks are filled in later sessions.

## Theme

- Accent colour: `#7E6EAD` (indigo/violet)
- Icon: Lucide `Orbit`
- Sub-pillar icons: `Briefcase` (BBOS) · `Compass` (Maqasid) · `Globe2` (Atlas)

## File map

| File | Purpose |
|---|---|
| `src/data/ogden-ecosystem.js` | Sub-pillars, level routes, level copy, accent, storage key, ensure-projects selector |
| `src/data/modules.js` | 3 module entries (`ogden-bbos`, `ogden-milos`, `ogden-atlas`) |
| `src/data/icon-registry.js` | `Orbit`, `Briefcase`, `Globe2` registered |
| `src/data/module-palette.js` | `ogden` theme entry |
| `src/store/project-store.js` | `OGDEN_BOARDS` + `ensureOgdenProjects` action |
| `src/pages/ogden/OgdenLevelOverview.jsx` | Wraps shared `LevelOverviewPage` (no comparison wheel in v1) |
| `src/pages/ogden/OgdenFoundationPage.jsx`<br>`OgdenIntegrationPage.jsx`<br>`OgdenRealizationPage.jsx` | Tier wrappers |
| `src/pages/ogden/OgdenPillarPage.jsx` | Sub-pillar host (wraps shared `PillarLevelPage`) |
| `src/pages/ogden/OgdenBbosPage.jsx`<br>`OgdenMilosPage.jsx`<br>`OgdenAtlasPage.jsx` | Sub-pillar routes |
| `src/pages/ogden/CONTEXT.md` | Module inventory |
| `src/components/layout/Sidebar.jsx` | Standalone "OGDEN Ecosystem" group below the `MAQASID_PILLARS` loop |
| `src/App.jsx` | 6 routes registered after Moontrance block |

## Design decisions

- **Sidebar placement:** standalone group below the Moontrance pillar row, not a
  9th entry in `MAQASID_PILLARS`. Rationale: OGDEN is not a Maqasid; mixing it
  in would misrepresent the taxonomy.
- **No comparison wheel in v1.** `MaqasidComparisonWheel` is hardcoded to the 8
  Maqasid lobes — reusing it for 3 OGDEN sub-pillars would misrepresent the data.
  A 3-lobe variant is deferred.
- **Internal level keys unchanged.** The `levelDescriptions` prop on the shared
  `LevelOverviewPage` already supports display-copy overrides, so no changes to
  `LevelNavigator` were required. This keeps every downstream selector, storage
  key, and board-id convention intact.

## Deferred (not in v1)

- Journey task content for all 9 boards
- 3-lobe `OgdenEcosystemWheel` variant
- `ExcellenceCardsComponent` equivalent for OGDEN
- Glossary entries for `ogden-bbos`, `ogden-milos`, `ogden-atlas` IslamicTerm tooltips
- OGDEN Hub marketing site as a 4th sub-pillar (explicitly out of scope)

## See also
- [[bbos-pipeline]] · [[milos]] · [[olos]]
- [[covenant-architecture]]
- [[2026-04-22-icon-registry-consolidation]] (icon registry pattern reused here)
