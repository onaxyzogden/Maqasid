# Atlas — Live area / length readout while drawing

**Date:** 2026-05-14
**Repo:** atlas
**Module:** apps/web · v3/observe/components/draw + v3/plan/draw/tools
**Status:** shipped

## Context

Every polygon / polyline annotation tool in Atlas (property boundary,
orchards, paddocks, ecology zones, frost pockets, hazard zones,
building / septic footprints, conventional crops, zones, swales,
fences, contour lines, watercourses, …) accepted vertex clicks but
showed **no spatial feedback** until the geometry was closed. A
steward laying out a 50 m swale or a 2-ha paddock had to guess the
dimensions until the polygon snapped shut, then redraw if they were
off. Two tools (`AreaTool`, `BoundaryTool`) computed `turf.area` on
`draw.update` / `draw.create`, but `draw.update` does **not** fire
while a polygon is mid-draw — only after a feature exists in
`direct_select` edit mode. So even those two only showed area
post-completion.

## Decision

Pump live geometry off MapboxDraw's `draw.render` event (which fires
after every click and every mouse-move rubber-band tick) through
`requestAnimationFrame` coalescing into one shared hook, surface the
result as two tiny presentational components, and wire them into every
polygon / line tool across Observe + Plan.

### Centralised hook — `useMapboxDrawTool`

`apps/web/src/v3/observe/components/draw/useMapboxDrawTool.ts`

Returns `{ geometry, liveArea, liveLength }`. Inside the effect:

1. Subscribe to `draw.render`.
2. For `draw_polygon`: scan `draw.getAll().features` for the polygon
   with the most vertices (covers both the draft polygon during draw
   and direct_select edit). Compute `turf.area(feat)` when the outer
   ring has ≥ 3 coords.
3. For `draw_line_string`: same scan for the LineString with the most
   vertices. Compute `turf.length(feat, { units: 'meters' })` when the
   coords have ≥ 2 vertices.
4. Stash the result in `pendingArea` / `pendingLength` and schedule a
   single `requestAnimationFrame(flush)` per frame. `flush` does the
   `setLiveArea` / `setLiveLength` calls. This caps re-renders at
   ≤ 1 per paint even though `draw.render` fires ~60 Hz during
   mouse-move.
5. Reset to `null` on mode change / disable / unmount.

### Shared readouts

- `DrawAreaReadout` — `> 10 000 m² → "X.XX ha (Y.YY ac)"`, else
  `"N m²"` (mirrors `AreaTool`).
- `DrawLengthReadout` — `> 1000 m → "X.XX km"`, else `"N.N m"`
  (mirrors `DistanceTool`).

Both accept `labelClassName` / `valueClassName` props so they slot
into any tool's CSS module (`ObserveDrawHost.module.css`,
`MapToolbar.module.css`, etc.) without owning their own styling.

### Wired into

**Observe polygon (8):** PastureTool, ConventionalCropTool,
EcologyZoneTool, HazardZoneTool, FrostPocketTool, SepticTool,
BuildingTool, BeV2ExistingTool (polygon kinds via registry).

**Observe line (8):** AccessRoadTool, BuriedUtilityTool,
ContourLineTool, DrainageLineTool, ExistingDrivewayTool, FenceTool,
PowerLineTool, WatercourseTool.

**Plan polygon (4):** WaterCatchmentTool, PaddockTool, CropAreaTool,
ZonePolygonTool.

**Plan line (6):** FenceLineTool, FlowConnectorTool,
MonitoringTransectTool, PathLineTool, UtilityRunTool, WaterSwaleTool.

**Design-element hosts:** `useDesignElementDrawTool` now returns
`{ liveArea, liveLength }`. `PlanDesignElementHost` and
`PlantSystemsDesignElementHost` surface a floating chip with the
appropriate readout for whichever kind is active (orchards /
silvopasture / pasture-mix as polygons; hedgerows / paths / roads /
swales as lines).

### BoundaryTool special case

`BoundaryTool` owns its own MapboxDraw instance (because it seeds
`direct_select` on an existing parcel polygon). Rather than refactor
onto the shared hook and risk breaking the seeded edit path, the
identical `draw.render` + rAF + `turf.area` pump was replicated
inline. The post-completion display also adopts the new
m² / ha / ac unit rule.

## Consequences

- Stewards see real-time area while drawing orchards, paddocks,
  zones, and ecology polygons, and real-time length while drawing
  fences, swales, contours, roads, and utility runs.
- The fix is one new shared hook return value + one new shared
  component + ~3-line wire-up per tool. No per-tool geometry math
  duplicated.
- `draw.render`'s ~60 Hz firehose is throttled to ≤ 1 React render per
  paint via `requestAnimationFrame`, so there's no measurable perf
  regression on mouse-move.
- `direct_select` edit on seeded property boundaries still works
  (no refactor of `BoundaryTool`'s MapboxDraw lifecycle).
- Out of scope: persisting computed area / length onto annotation
  records (existing stores compute on read via `polygonAreaM2()` etc.;
  no schema change); unit-preference (locked to existing
  `> 1 ha → ha + ac` and `> 1 km → km` policies); point-geometry
  readout (no readout — points have no extent).

## Files

- `apps/web/src/v3/observe/components/draw/useMapboxDrawTool.ts` —
  primary edit (liveArea + liveLength pump).
- `apps/web/src/v3/observe/components/draw/DrawAreaReadout.tsx` —
  new.
- `apps/web/src/v3/observe/components/draw/DrawLengthReadout.tsx` —
  new.
- `apps/web/src/v3/observe/components/measure/BoundaryTool.tsx` —
  inline render pump.
- 16 polyline tools + 11 polygon tools + 2 design-element hosts +
  `useDesignElementDrawTool` — wire-up only.
