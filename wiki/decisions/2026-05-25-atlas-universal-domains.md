---
title: "Atlas — Adopt 16 universal domains as the canonical land-project taxonomy (3 stages, replace stage-local modules)"
type: decision
date: 2026-05-25
status: accepted
tags: [atlas, olos, domains, taxonomy, lifecycle, observe-plan-act, shared-schema, architecture, direction-setting]
superseded_by: null
---

# Atlas — Adopt 16 universal domains as the canonical land-project taxonomy (3 stages, replace stage-local modules)

## Context

A design proposal (`OLOS Universal Domains for Land-Based Projects`) argues that
OLOS ([[olos]]) should organise every land-based project around **16 universal
domains** that recur across the lifecycle — the domain stays fixed, only the stage
*verb* changes (Observe = document, Plan = decide, Act = execute + verify) — with
**project-type emphasis** foregrounding a subset per project type. The domain set
and the verb model are written up as the concept [[olos-universal-domains]].

The codebase today does the opposite. Each stage owns an **independent,
stage-local module taxonomy**, defined web-only in `apps/web/src/v3/{stage}/types.ts`:

- **Observe — 7:** `human-context`, `built-environment`, `macroclimate-hazards`,
  `topography`, `earth-water-ecology`, `sectors-zones`, `swot-synthesis`.
- **Plan — 15:** `goal-compass`, `dynamic-layering`, `water-management`,
  `zone-circulation`, `structures-subsystems`, `machinery`, `livestock`,
  `plant-systems`, `soil-fertility`, `cross-section-solar`, `phasing-budgeting`,
  `principle-verification`, `regeneration-monitor`, `habitat-allocation`,
  `biodiversity-monitor`.
- **Act — 8:** `tracker`, `build`, `maintain`, `livestock`, `harvest`, `review`,
  `network`, `schedule`.

These are joined only by affinity tables — `OBSERVE_TO_PLAN_AFFINITY`
(`plan/conflicts/planConflict.ts`) and the per-type `PROJECT_TYPE_MODULE_AFFINITY`
ranking (`act/data/projectTypeModuleAffinity.ts`). `@ogden/shared` exports only
`ProjectType`; there is no shared domain/module enum. The split was deliberate
(e.g. Plan's `affectedModule` is steward-set, *not* auto-mapped from an Observe
module — a documented "taxonomy gap" in [[2026-05-25-atlas-plan-decision-log]]).

This decision was prompted while building out Stage Zero
([[2026-05-25-atlas-stage-zero-lean-trim]]) — the question of "at what altitude do
we ask, and against what taxonomy" surfaced the need for one canonical vocabulary.

**Three choices locked with the steward (AskUserQuestion):**
1. **Deliverable = concept doc / ADR only** — no code this session.
2. **Keep 3 stages** (Observe/Plan/Act); do not revive Operate as a 4th stage.
3. **Replace** — the forward direction is to retire the stage-local enums in favour
   of the 16 universal domains as the single source of truth.

## Decision

Adopt the **16 universal domains** ([[olos-universal-domains]]) as OLOS's canonical
land-project vocabulary. Specifically:

- **Three stages, not four.** Observe → Plan → Act remain the lifecycle; Report is
  a sibling surface. The proposal's **Operate** stage is **not** revived — its
  monitor/maintain/improve verbs fold into Act (`maintain`/`tracker`/`review`/
  `schedule`) + Report. (Consistent with [[project_lifecycle_retirement]].)
- **Replace, don't overlay.** The forward direction is to make a single shared
  `UniversalDomain` enum (in `@ogden/shared`) the **source of truth** for all three
  stages, retiring the independent `ObserveModule` / `PlanModule` / `ActModule`
  enums. Each stage specialises a domain by its **verb**; each project type
  specialises by **emphasis** (which domains foreground first).
- **This session records the decision and the mapping only.** No code is changed.
  The migration is explicitly future, separately-approved work (see Consequences).

## Current → Universal mapping

How today's stage-local modules collapse into the 16 domains (source files:
`apps/web/src/v3/{observe,plan,act}/types.ts`):

| # | Universal domain | Observe | Plan | Act |
|---|---|---|---|---|
| 1 | Vision & Project Intent | — (Stage Zero vision profile) | `goal-compass`, `principle-verification`* | — |
| 2 | Land Base & Boundaries | — (boundary import) | — | — |
| 3 | Climate & Microclimate | `macroclimate-hazards`* | `cross-section-solar`* | — |
| 4 | Topography & Landform | `topography` | — | — |
| 5 | Hydrology & Water | `earth-water-ecology`* | `water-management` | `maintain`* |
| 6 | Soil & Subsurface | `earth-water-ecology`* | `soil-fertility` | — |
| 7 | Ecology & Biodiversity | `earth-water-ecology`* | `habitat-allocation`, `biodiversity-monitor`, `regeneration-monitor` | — |
| 8 | Plants, Crops & Food Systems | — | `plant-systems` | `harvest` |
| 9 | Animals, Livestock & Wildlife | — | `livestock` | `livestock` |
| 10 | Built Infrastructure | `built-environment` | `structures-subsystems`, `machinery`* | `build`, `maintain`* |
| 11 | Access, Circulation & Logistics | `sectors-zones`* | `zone-circulation`, `dynamic-layering`* | — |
| 12 | Energy, Materials & Resource Flows | — | `cross-section-solar`*, `machinery`* | — |
| 13 | People, Roles & Governance | `human-context` | — | `network` |
| 14 | Economics & Capacity | — | `phasing-budgeting` | `schedule`* |
| 15 | Risk, Compliance & Suitability | `macroclimate-hazards`*, `swot-synthesis`* | `principle-verification`* | `review`* |
| 16 | Monitoring, Records & Feedback | `swot-synthesis`* | `regeneration-monitor`*, `biodiversity-monitor`* | `tracker`, `review`* |

`*` = the module also contributes to another domain (a many-to-one split).

Two structural findings fall out of the mapping and justify **replace** over
overlay:

- **Bundled Observe modules split across domains.** `earth-water-ecology` alone
  spans **three** domains (Hydrology, Soil, Ecology); `macroclimate-hazards` spans
  Climate + Risk; `swot-synthesis` spans Risk + Monitoring. A universal set
  un-bundles them cleanly.
- **Several domains are under-represented as first-class modules today** — **Land
  Base & Boundaries** (data exists, no module), **Access/Circulation** (only
  partial via `zone-circulation`), **Energy/Resource Flows**, **People &
  Governance** (Observe-only `human-context` + Act `network`), **Risk/Compliance**
  (scattered), and **Monitoring** (split across `*-monitor` + `tracker`/`review`).
  A universal set makes these explicit and consistent across stages.

## Rationale

- **One vocabulary, three verbs** removes the stage-to-stage translation burden
  (the affinity tables exist precisely because the taxonomies don't line up). A
  shared enum makes Observe→Plan→Act traceability structural rather than mapped.
- **Replace, not overlay**, because an overlay would keep the three divergent
  enums *and* add a grouping layer — more surface, not less. The mapping shows the
  16 domains are a strict superset of what the stage-local modules express.
- **Three stages** honours the retiring-lifecycle direction; reviving Operate would
  re-expand the IA the project is deliberately contracting.
- **Project-type emphasis** preserves the Stage Zero intent
  ([[2026-05-25-atlas-stage-zero-lean-trim]]): intake fixes type/intent, and the
  universal domains foreground accordingly without hiding anything.

## Alternatives considered

- **Map-onto-and-keep (overlay).** Add a domain grouping while keeping the
  stage-local enums. *Rejected by the steward* — non-breaking but leaves three
  divergent sources of truth plus a fourth grouping layer.
- **Revive Operate as a 4th stage.** Matches the source doc's table. *Rejected by
  the steward* — contradicts [[project_lifecycle_retirement]]; Operate verbs fold
  into Act + Report instead.
- **Do nothing / keep affinity tables.** Rejected — the tables are a symptom of the
  missing shared vocabulary, not a solution.

## Consequences / migration (future, separately approved)

No behaviour changes from this ADR. When the refactor is approved as its own
session, the expected shape:

1. Define `UniversalDomain` (enum + labels + ordering) in
   `packages/shared/src/` and export it across web/api.
2. Re-base each stage `types.ts` on `UniversalDomain` (verb-specialised views),
   retiring `ObserveModule`/`PlanModule`/`ActModule` as the canonical enums.
3. Rework derived/affinity code: `stage-zero/lib/deriveActivatedModules.ts`,
   `OBSERVE_TO_PLAN_AFFINITY`, `PROJECT_TYPE_MODULE_AFFINITY`, the compass
   (`compass/compassTypes.ts`) and Command-Centre module-tab sources.
4. Build a `project-type → primary-domains` emphasis map (replacing the per-stage
   activation/affinity heuristics) tied to the Stage Zero `project-type` answer.
5. Plan a **persisted-data migration** — localStorage `byProject` stores key on
   module ids (`ogden-*` blobs); a versioned migration must remap old module ids to
   domain ids so in-flight projects survive.
6. Address the under-represented domains (Land Base, Access, Energy/Resource Flows,
   People/Governance, Risk/Compliance, Monitoring) as first-class.

Scope flag: this is large and touches every stage plus shared schema and persisted
data — it must be sliced and verified per the project's commit-immediately /
no-deletion discipline, and is **not** to be started without its own approval.

## Verification

Documentation-only — no build or test applies. Verified by: both wiki pages
created with house-style frontmatter; all `[[wikilinks]]` resolve; `index.md`
Concepts + Decisions tables and the `olos` entity + `log.md` each updated; commit
stages only the intended wiki files. The current→universal mapping was derived from
a read-only exploration of `apps/web/src/v3/{observe,plan,act}/types.ts`,
`plan/conflicts/planConflict.ts`, `act/data/projectTypeModuleAffinity.ts`, and
`packages/shared/src/schemas/`.

## Connections

- Entity: [[olos]]
- Concept: [[olos-universal-domains]]
- Prompted by: [[2026-05-25-atlas-stage-zero-lean-trim]]
- Stage model: [[project_lifecycle_retirement]]
- Affinity tables this would retire are referenced in
  [[2026-05-25-atlas-plan-command-centre]] and [[2026-05-25-atlas-act-command-centre]]
- Documents a future refactor; supersedes nothing yet.
