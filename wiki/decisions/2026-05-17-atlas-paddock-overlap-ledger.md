---
title: "Atlas Goal Compass — claimed-footprint ledger fixes overlapping auto-generated paddocks"
type: decision
date: 2026-05-17
status: accepted
tags: [atlas, plan, auto-design, geometry, goal-compass]
superseded_by: null
---

# Atlas Goal Compass — claimed-footprint ledger fixes overlapping auto-generated paddocks

## Context

The "Generate site design" action on the Goal Compass proposal page produced
paddock polygons that visibly overlapped on the map — a real defect, not
intended behaviour.

Root cause is in the orchestrator `runAutoDesign`
([apps/web/src/v3/plan/engine/autoDesign/runAutoDesign.ts](../../atlas/apps/web/src/v3/plan/engine/autoDesign/runAutoDesign.ts)),
**not** in the paddock stamper. `stripSubdivide` correctly emits
non-overlapping equal-area strips within a single zone. The overlap arose
because:

1. `runAutoDesign` iterated each selected intervention and called
   `allocateZones(intervention, allocatableZones, …)` against the **full,
   unmodified zone list every iteration** — no ledger tracked footprint
   already consumed by an earlier intervention.
2. `cattle-rotational-grazing` and `small-ruminant-paddock` (and the
   default-archetype `silvopasture-alley` + `integrated-stock-cropland`) are
   all `geometryTemplate: 'tile-strip'`, `preferredCategories: ['livestock']`.
   On a regenerative farm with grazing goals the sequencer selects ≥2; the
   same livestock-flagged pasture zone scores identically for each, so both
   allocate it.
3. `stripSubdivide` tiles the **entire** input polygon — it uses `areaM2`
   only to choose the cell *count*, never to bound the footprint. So each
   intervention laid a full grid over the same geometry → two complete
   paddock grids stacked on top of each other.

Overlapping steward-painted livestock zones are a secondary trigger of the
same missing-ledger gap.

## Decision

Introduce a deterministic **claimed-footprint ledger** in `runAutoDesign`,
applied at the existing pre-subdivision clip seam (mirroring the parcel-clip
pattern already there). **First-wins by sequencing priority; the leftover
cascades** — later paddock interventions subdivide only the area not already
claimed by an earlier one. A starved low-priority herd is acceptable and is
surfaced via the existing `emptyGeometryInterventionIds` channel.

Scoped to area-occupying polygon templates only — `tile-strip` (the reported
defect). Point/line templates (`centroid-point`, `edge-line`,
`contour-line`) are deliberately **not** subtracted.

Two lossless geo helpers added to
[geo.ts](../../atlas/apps/web/src/v3/plan/engine/autoDesign/geo.ts):
`differencePolys` and `unionPolys` over a new `AnyPolyFeature`
(`Feature<Polygon | MultiPolygon>`) — **lossless** (a `MultiPolygon` result is
preserved, not reduced to its largest ring) so a disjoint earlier claim is
never silently dropped from the ledger.

## Rationale

The geometric ledger — not the acreage budget — is the correct fix layer: the
stamper tiles the whole polygon regardless of allocated acres, so tightening
`zoneAllocator`'s greedy/scoring logic would not stop the stack. The clip
seam already performs a parcel intersect, so subtracting `claimed` there is a
minimal, pattern-consistent change. First-wins-cascade was chosen by the user
over proportional split and one-herd-per-zone: it is deterministic
(`sequencing.selected` is already deterministically ordered, ledger mutation
is order-stable), and an under-served low-priority herd is already an
expressible, surfaced outcome.

## Alternatives Considered

- **Proportional split (each intervention gets a share of the zone)** —
  rejected by user; produces fragmented sub-paddocks and complicates the
  acreage story.
- **One herd per zone (hard veto of a second livestock intervention)** —
  rejected; too blunt, discards a viable cascade onto leftover area.
- **Fix in `zoneAllocator` (acreage budget)** — rejected; the stamper tiles
  the whole polygon irrespective of allocated acres, so the overlap survives
  any acreage-budget change.
- **Fix in `stripSubdivide`** — rejected; the stamper is correct in
  isolation (equal-area, non-overlapping within one polygon). The defect is
  cross-intervention orchestration.

## Consequences

- Auto-generated paddocks no longer overlap, whether the trigger is two
  co-selected livestock interventions on one zone or two overlapping
  steward-painted livestock zones.
- A low-priority livestock intervention with no leftover area now reports via
  `emptyGeometryInterventionIds` (existing UI channel) instead of silently
  drawing a stacked grid.
- Determinism preserved (same Observe state + goal tree + start date ⇒
  identical drafts).
- `fill-polygon` / `bbox-rect` remain out of scope — not subtracted from the
  ledger unless a future defect surfaces.
- Live on-map visual confirmation deferred (WebGL canvas undrivable in the
  harness, consistent with the run6 walkthrough constraint); covered instead
  by 51/51 autoDesign vitest incl. 2 new overlap-ratio regression tests.

## Connections

- [[olos]] — Atlas/OLOS, where the fix landed (Plan stage Goal Compass)
- [[2026-05-14-auto-design-pipeline]] — the auto-design pipeline this patches
- [[2026-05-16-atlas-pasture-regeneration]] — shares the
  `acknowledgedRegenerationZoneIds` / forced-barren seam in the same orchestrator
- [[maqasid-al-shariah]] — land stewardship under the Environment maqsid
