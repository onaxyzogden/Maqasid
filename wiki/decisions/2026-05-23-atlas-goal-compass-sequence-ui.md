---
title: "Atlas: Goal-Compass build-sequence visualization (OLOS gap #7)"
type: decision
date: 2026-05-23
status: accepted
tags: [atlas, plan, goal-compass, sequencing-engine, yeomans, permanence, dependency-graph, svg, shared, web]
superseded_by: null
---

# Atlas: Goal-Compass build-sequence visualization (OLOS gap #7)

## Context

The [[olos-story-codebase-map]] (Atlas wiki) listed the **Goal Compass** (story
Ch12 — "capacity-based phases, dependency-driven, Yeomans Scale of Permanence")
as a capability whose *engine was fully shipped but whose UI was missing*.
`runSequencingEngine()` already topologically sorts the chosen interventions by
prerequisite, assigns each a Yeomans permanence phase, and emits ordered
`BuildPhase`/`PhaseTask` rows into `phaseStore`. But the only consumer,
`GeneratedPlanTab.tsx`, rendered flat per-phase tables: it showed *what* sits in
each phase but never the **build order**, the **dependency graph** (which
intervention unblocks which), the **permanence ladder** (climate→soil), or *why*
candidate interventions were skipped — `result.skipped[]` was computed and thrown
away. The steward could read the plan but not *see the sequence*, which is exactly
what the Goal Compass chapter promises.

This was the top remaining OLOS gap after #10 (the field-verification axis,
[[2026-05-23-atlas-field-verification-axis]]) shipped earlier the same day.

Three design forks were deferred to the implementer ("best UX option" on all):
(1) **shape** = a single combined view — permanence swimlanes + dependency arcs +
build-order/start-year, in one bespoke SVG; (2) **placement** = a new "Build
sequence" tab inside the existing Goal-Compass slide-up (after Proposal);
(3) **interaction** = read-only with hover tooltips in v1, plus surfacing the
engine's hidden `skipped[]` reasons as a transparency bonus — no drag/edit.

## Decision

Add a read-only **build-sequence visualization** as the Goal-Compass "Build
sequence" tab: a Yeomans permanence swimlane (climate at top → soil at bottom),
one node per selected intervention in build order, dependency arcs between an
intervention and any prerequisite that is itself selected, per-node start-year
badges, hover tooltips, and a "considered but not scheduled" readout that surfaces
the engine's previously-discarded `skipped[]` reasons.

**Re-run the pure engine; don't read `phaseStore`.** The dependency arcs need
intervention-level `prerequisites: string[]`, which are flattened away when the
engine lowers `SelectedIntervention` → `BuildPhase`/`PhaseTask`. So the card
re-runs the deterministic `runSequencingEngine` in a `useMemo` (it is pure +
side-effect-free) and reads `selected` + `skipped` directly — mirroring exactly
what `GeneratedPlanTab` already does (read `goalTreeStore` goalTree +
`excludedInterventionsByProject`, `siteProfileStore`, filter `INTERVENTION_CATALOG`
by excluded ids, call the engine). Same inputs → same output as the tab the
steward already trusts; no new state, no engine/`phaseStore` change.

Pure-core / view split mirrors the codebase's established convention (testable
layout math with no React/WebGL dependency, then a thin SVG renderer):

- **Pure layout core** — `apps/web/src/v3/plan/engine/goalCompass/goalCompassSequenceLayout.ts`,
  turf-free and React-free:
  - `buildSequenceLayout(selected, generatedPhases): SequenceLayout` → `{ bands, nodes, edges, width, height }`.
  - **Bands**: one per *used* Yeomans phase, ordered by `phaseIndex` (reuses `PHASE_ORDER`/`phaseIndex` from `v3/plan/types.ts`); label + colour borrowed from the matching emitted `BuildPhase` (matched by authored name), with local `PHASE_LABEL`/`PHASE_COLOR` fallbacks so the math is unit-testable with `generatedPhases: []`.
  - **Nodes**: one per `SelectedIntervention`, placed in its band, x-ordered by the array's existing topological order.
  - **Edges**: one per `intervention.prerequisites` id **that is also selected** (dangling prereqs dropped so no edge points at a missing node).
  - Tunable geometry constants (`band height, node radius, x-gap, …`) named in one `LAYOUT` object.
- **View** — `apps/web/src/v3/plan/cards/goal-compass/GoalCompassSequenceCard.tsx`:
  bespoke SVG modeled on `PermanenceLadderCard.tsx` (`<defs>` arrowhead marker,
  Bézier `<path>` edges, node `<g>`+`<circle>`+`<text>`): phase swimlane rects
  with left-edge labels, nodes with start-year badges + truncated names, hover
  highlight on node/edge, native `<title>` tooltips (name/phase/start-year/labor/
  cost/prerequisites), and the `skipped[]` table below.

**Registration** (the static two-part house pattern): add
`{ label: 'Build sequence', sectionId: 'plan-goal-compass-sequence' }` to
`MODULE_CARDS['goal-compass']` after Proposal (`v3/plan/types.ts`), plus a lazy
import + switch case in `PlanModuleSlideUp.tsx`.

## Rationale

Re-running the pure engine rather than reading `phaseStore` is the load-bearing
choice: the lowered `BuildPhase`/`PhaseTask` rows are intentionally
intervention-agnostic (they feed the generic Phasing & Budgeting module), so the
prerequisite edges simply do not exist downstream of the engine. Because
`runSequencingEngine` is deterministic and side-effect-free — already proven by
`GeneratedPlanTab` calling it the same way — re-running it in a `useMemo` is safe
and guarantees the diagram matches the Proposal the steward already sees.

The pure-core / SVG-view split keeps the geometry unit-testable without a DOM or
WebGL, which matters because the Plan stage's MapLibre routes hit a documented
WebGL/Windows `preview_screenshot` hang ([[2026-05-19-atlas-preview-screenshot-verification-standard]]).
Authoritative verification therefore lives in the layout unit suite, exercised
both in Vitest and against the live Vite bundle.

Bespoke SVG (no graph library) is the house style — `PermanenceLadderCard`
established the exact marker/Bézier/node idiom, so the new card reuses it rather
than introducing reactflow/d3/dagre.

## Alternatives Considered

- **Read the lowered rows from `phaseStore`** — rejected; `BuildPhase`/`PhaseTask`
  flatten away the intervention-level `prerequisites` the dependency arcs require.
- **Modify `PermanenceLadderCard` to also show the Goal-Compass output** — rejected
  and explicitly left untouched; it visualizes *physically-placed elements*
  bucketed by generic Yeomans rank (a different data source), and conflating the
  two would muddy both. The new card is a separate surface.
- **A graph library (reactflow / d3-dag / dagre)** — rejected; no graph lib exists
  in the repo and the swimlane layout is simple enough for the established bespoke
  SVG pattern.
- **Drag-to-reorder / inline edit in v1** — deferred; read-only first. Exclusions
  are still authored on the Goal-tree card; this surface only reflects them.
- **The `asOf` year-scrubber decay animation** (the stated alternative gap) — not
  built here; noted as a possible follow-on.

## Consequences

- The Goal Compass now has the dependency-graph / permanence-ladder surface the
  story depicts; OLOS gap #7 moves Partial → Full.
- The engine's `skipped[]` reasoning ("Site requirements not met", "Prerequisite
  not selected", "All target criteria already met", "Exceeds available acreage
  budget", "Not authored for project type …") is now visible to the steward
  instead of silently discarded.
- No engine, `phaseStore`, or persisted-state change — purely additive read view.
  `PermanenceLadderCard` untouched.
- Layout constants (band height 70, node radius 8, x-gap 158, half-life-free) are
  first-guesses, named in one `LAYOUT` object for easy tuning.
- **Verification:** layout unit suite **5/5** (band ordering by `phaseIndex`;
  edge drawn only when the prerequisite is also selected, dangling dropped;
  build-order preserved on x; node lands on the band matching its `yeomansPhase`;
  generated-phase label/colour preferred when present). `apps/web` typecheck clean
  back to the documented 3-error pre-existing baseline (zero new errors from the 5
  touched/new files). `buildSequenceLayout` plus the card/types/slide-up modules
  were exercised in the **live Vite browser bundle** via `/@fs` dynamic import —
  band reorder (climate→water→soil), generated-phase colour preference,
  dangling-prereq filtering, build-order x-placement all confirmed on the shipped
  code; the new `plan-goal-compass-sequence` tab is registered after Proposal; no
  console errors. No SVG screenshot was captured (reaching the rendered state needs
  a map-loaded project and the WebGL/Windows capture hang is documented) —
  runtime evidence reported honestly per project policy. Committed `78875305`
  (5 files, +537) on `feat/atlas-permaculture` — not pushed (rebased out-of-band;
  fetch + divergence check first).

## Connections

- [[olos]] — Atlas Plan / Goal Compass module
- [[goal-compass]] — the module this surface completes
- [[olos-story-codebase-map]] — closes gap #7 (Goal-Compass sequencing UI)
- [[2026-05-23-atlas-field-verification-axis]] — sibling same-day OLOS-gap close (#10) on the same `feat/atlas-permaculture` branch
- [[2026-05-19-atlas-preview-screenshot-verification-standard]] — why verification is runtime/DOM, not visual
- [[2026-05-14-atlas-goal-compass]] — the engine + module this UI reads
