# Atlas — Plan polygon-fill (hex) tree stamping

**Date:** 2026-05-13
**Repo:** atlas
**Module:** apps/web · v3/plan/canvas
**Status:** shipped

## Context

Continuous-point + spacing-snap (2026-05-12 / 2026-05-13) made
single-click planting smooth, with a canopy ring + same-category
neighbour rejection. Planting a 50-tree orchard one click at a time was
still slow. The next ergonomic gap was bulk placement.

## Decision

Add a second stamp mode for fill-eligible point design-element kinds —
those with `defaultSpacingM` set in `elementCatalog.ts` (today: oak,
pine, apple, shrub). Two modes coexist:

- `free` (default) — existing single-click + canopy-ring flow.
- `fill` — steward draws a polygon mask; the system stamps points on a
  hex / quincunx centroid grid at `defaultSpacingM`, clipping to the
  parcel and skipping any cell within an existing same-category point's
  drip line. The polygon itself is consumed, not persisted.

A floating two-chip strip (`•` / `▦`) appears when a fill-eligible kind
is armed; it disappears for non-eligible kinds (paddock, swale, road,
etc.). Mode lives in a tiny `useStampModeStore` Zustand atom so the
picker (mounted in PlanLayout) and the draw hook (mounted under both
canvases) share the same value without prop drilling.

A skip-count toast (`Stamped N, skipped M`) reuses the existing
`PlanStampToast` (renamed from `TreeRejectionToast`), differentiated by
estate-gold vs fired-clay tint.

## Implementation

- New: `v3/plan/canvas/stampModeStore.ts` — single `'free' | 'fill'`
  atom. Mirrors `utilityConflictStore` pattern in the same draw folder.
- New: `v3/plan/canvas/StampModePicker.tsx` — bottom-centre two-chip
  strip; renders only when active tool resolves to a spec with
  `drawMode === 'draw_point'` && `defaultSpacingM`.
- Modified: `v3/plan/canvas/draw/useDesignElementDrawTool.ts`
  - `validatePlacement` is now exported (re-used by `stampHexFill`).
  - New file-local `stampHexFill(polygon, spec, projectId,
    parcelBoundary, view)`:
    `cellSide = defaultSpacingM / sqrt(3)` so centroid-to-centroid
    distance ≈ user spacing; filter centroids by polygon containment;
    validate each via `validatePlacement` (boundary clip + same-category
    dedup); enforce inter-stamp spacing within batch via local
    `placedThisRun` loop; build `DesignElement[]` with sequential A→B→C
    labels via `nextLetter(sameKindStart + i)`; call bulk
    `addDesignElements`; dispatch `plan:tree-stamp-summary` event.
  - Hook body branches on `useStampModeStore.mode`:
    `pointFillMode = isPoint && defaultSpacingM && stampMode === 'fill'`
    → enables `useMapboxDrawTool` in `'draw_polygon'` mode and routes
    `onComplete` to `stampHexFill`. `continuousEnabled =
    isPoint && !pointFillMode`. Spacing ring suppressed in fill mode.
- New: bulk insert path
  - `landDesignStore.addMany(projectId, elements)` — single `set()` for
    N elements, vs N individual `add` calls.
  - `builtEnvironmentStoreV2.createMany(inputs)` — symmetric BE V2
    sibling. Not exercised by v1 vegetation kinds (trees route through
    landDesign), shipped for API symmetry so a future BE V2 kind doesn't
    regress to N single inserts.
  - `builtEnvironmentSelectors.addDesignElements` — bulk facade that
    splits inputs by `isStructureClassKind` routing.
- Renamed: `v3/plan/draw/TreeRejectionToast.tsx` →
  `v3/plan/draw/PlanStampToast.tsx` — handles both
  `plan:tree-rejected` (fired-clay) and `plan:tree-stamp-summary`
  (estate-gold) events.
- `PlanLayout.tsx`: replaced `TreeRejectionToast` import with
  `PlanStampToast`, added `<StampModePicker />` mount in the canvas
  overlay slot.

## Why a hex grid (not square)

Hex / quincunx packing places each tree equidistant from six neighbours,
which matches how stewards actually space orchards (no preferred row
direction, even canopy coverage). Square grid is deferred to v2 only if
a steward explicitly asks for it.

## Out of scope (deferred)

- Row stamp (line input → `turf.lineChunk`).
- Square grid as alternative pattern.
- Soft-snap to neighbour boundaries.
- Per-stamp spacing override UI.
- Cross-kind asymmetric spacing.
- Stamp ghost preview before commit (the polygon-finish IS the commit
  for v1).
- BE V2 path is shipped but not exercised — first BE V2 fill-eligible
  point kind will be the real test.

## Verification

- `cd apps/web && NODE_OPTIONS=--max-old-space-size=8192 npx tsc
  --noEmit -p .` — passes (one pre-existing unrelated error in
  `DesignElementLayers.tsx:433`, `Geometry` width).
- Browser pre-flight: arming Oak mounts `[role="group"][aria-label=
  "Stamp mode"]` with two chips; default mode = `free` (• pressed);
  clicking `▦` flips `useStampModeStore.mode` to `'fill'` and updates
  `aria-pressed`. Picker disappears for non-eligible kinds.
- Manual end-to-end polygon draw must be done by a steward — synthetic
  pointer events don't reach MapLibre's draw lifecycle in the preview
  environment.
