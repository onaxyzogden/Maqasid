---
title: "Atlas Plan: Observe-driven Auto-Design pipeline"
type: decision
date: 2026-05-14
status: accepted
tags: [architecture, atlas, plan, observe, auto-design, geometry, scheduling]
superseded_by: null
---

# Atlas Plan: Observe-driven Auto-Design pipeline

## Context

Goal Compass (see [[2026-05-14-atlas-goal-compass]] and
[[2026-05-14-atlas-goal-compass-templates-and-scheduling]]) already
turns a goal tree + site profile into an ordered, costed
`BuildPhase`/`PhaseTask` proposal via a deterministic
greedy-topological sequencing engine, and `scheduleTasksToCalendar`
already anchors those tasks to a user-chosen start date. Two gaps
remained: the intervention catalog tracked *how much* acreage but not
*where*, and the sequencer emitted no map geometry. The user wanted to
paint current land conditions in Observe (zone category, succession,
ground-cover, permaculture rings) and have OLOS auto-draw the design
features that satisfy the goals into the matching zones, then schedule
the work.

## Decision

Build the generator as a chain of **pure functions** over the existing
stores, with a single impure commit step at the end:

```
runSequencingEngine → zoneAllocator → stampGeometry → DraftShape[]
                    → scheduleTasksToCalendar (existing, untouched)
commitDrafts(DraftShape[]) → landDesignStore / livestockStore (draft:true)
```

- **Catalog augmentation.** Each of the 19 catalog rows gained
  `zoneAffinity` (preferred/avoided categories, succession,
  ground-cover, permaculture ring range) + a `geometryTemplate`
  (`tile-strip | contour-line | edge-line | bbox-rect |
  centroid-point | fill-polygon`).
- **Ground-cover layer.** `LandZone` gained an optional
  `groundCover` field (+ `GROUND_COVER_LABELS`/`COLORS`), painted by a
  new `GroundCoverPaintTool` that tags existing zones (no new
  geometry). `observePrefill` reads it to refine `currentLandCover`.
- **Pure pipeline.** `zoneAllocator` (stable affinity sort, budget
  clamp), per-template `stampGeometry` stampers (strip-subdivide,
  contour-line, low-point fill, centroid, bbox, fill-polygon), and
  `runAutoDesign` orchestrator threading a seeded RNG
  (`projectId + generationId`) so identical inputs ⇒ identical output.
- **Draft plumbing.** Draft rows carry `draft:true` + `generationId`
  (+ `draftClass` on design elements). `generatorDraftStore` holds the
  run pointer and the three review verbs (`commit`, `discard`,
  `discardClass`). Existing read selectors exclude drafts by default;
  the canvas opts in and renders them dashed/translucent
  (`DesignElementLayers` + a static-dashed `poly-line-draft` layer).
- **Surfaces.** `GenerateSiteDesignBar` (start-date picker + Generate,
  mounted in `GeneratedPlanTab`) and a floating `DraftReviewBar`
  (Accept-all / Discard-all / Regenerate / per-class chips + a
  stocking-rate and water-band advisory computed from the draft rows).

## Deviations from the approved plan

1. **No `generated-draft` phase enum value.** The plan proposed adding
   `generated-draft` to the `DesignElement` phase enum. `phase` is a
   strict 8-value Yeomans `PhaseKey` feeding `phaseIndex`/`PHASE_ORDER`
   and the canvas year-gating filter (`phaseIndex(el.phase) <= cap`); a
   9th value would break gating and force a persistence migration.
   Instead the `draft:boolean` the plan already specified for
   Paddock/FenceLine was generalised into optional
   `draft?/generationId?/draftClass?` fields on `DesignElement` +
   `Paddock` + `FenceLine`. Same intent, far smaller blast radius, no
   migration, sequencer/Yeomans gating unchanged. Drafts keep their
   intervention's real `yeomansPhase`.
2. **Structure-class drafts written to `landDesignStore`.** Structure
   kinds (water-tank, compost, shed) are written as draft
   `DesignElement`s in `landDesignStore` rather than the V2 structure
   store for the review MVP. Drafts never leave review without an
   explicit Accept; re-homing accepted structures into
   `builtEnvironmentStoreV2` is Phase 2 work. The plan already
   anticipated structures shipping as a `centroid-point` stub.

## Consequences

- The whole generator is deterministic and side-effect-free until
  `commitDrafts`, so Regenerate is meaningful (same inputs ⇒ same
  output) and Discard is a clean cascade by `generationId`.
- A `commitDrafts` per-intervention routing table maps the 19 catalog
  ids → Paddock / FenceLine / DesignElement (kind, category,
  draftClass); unknown ids fall back to a vegetation shrub element.
- Verified: tsc exit 0, vitest 802/802 across both Phase 5 and Phase 6
  gates. Interactive map flow (paint zones → Generate → Accept/Discard)
  is left for manual browser verification.

## Deferred

- Free-text intent capture; per-zone manual affinity override; live
  regeneration on Observe edit; DB-backed paddock persistence;
  Voronoi/contour-aware subdivision; multi-scenario start-date
  branching; re-homing accepted structure drafts into V2 (Phase 2).
