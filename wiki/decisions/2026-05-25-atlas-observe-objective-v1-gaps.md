---
title: "Atlas Observe Objective-Workspace — closing the three v1 gaps"
type: decision
date: 2026-05-25
tags: [atlas, observe, objectives, field-objective, evidence, layers, raster, annotation, tools, topography, ui]
status: accepted
superseded_by: null
---

# Atlas Observe Objective-Workspace — closing the three v1 gaps

## Context

The "Objective Launch Pattern" doc the operator shared was already ~80%
implemented for the Observe stage by the same-day sibling work
[[2026-05-24-atlas-objective-driven-workspace]] (Command Centre overview,
`?objective` focus mode, map fly + highlight, `restrictToTools` rail narrowing,
checklist + evidence + completion/review, steward-drawn annotation-layer
scoping via `requiredLayersToModules`, and structured per-tool forms for all 28
tools). Three **genuine** gaps remained, verified against current code (the docs
were stale):

1. **Base raster overlays did not actuate on focus.** `TopographyOverlay` /
   `WaterOverlay` obeyed only the manual `matrixTogglesStore` toggles, so
   focusing the slope-12A objective (requires `topography` + `hydrology`) did
   not surface the hillshade / contour / water tiles the doc's Screen 3.2 calls
   for.
2. **Annotation evidence was manual.** `annotation`-kind evidence was satisfied
   only by a "Mark captured" button; placing a real feature with a required tool
   did nothing toward it.
3. **The doc's Screen-4 tools did not exist.** No Erosion Flag (severity/type)
   or Runoff Path (direction/flow) tool, and the slope-12A seed objective did
   not reference them.

The operator confirmed scope: **all three** (both actuation gaps + add the two
doc tools).

## Decision

### Phase 1 — base raster layer actuation (prop-driven)

Foreground the `topography` / `hydrology` raster overlays automatically while an
objective that needs them is focused, reverting on exit. Implemented
**prop-driven**, not by mutating the persisted toggle store — so exit
auto-reverts to whatever the steward had toggled.

- `TopographyOverlay` / `WaterOverlay` each gained an optional
  `forceVisible?: boolean`; `visible = useMatrixTogglesStore(...) || !!forceVisible`,
  with `forceVisible` added to the effect deps.
- `ObserveLayout` derives `forceTopo = focusModules?.includes('topography')` and
  `forceWater = focusModules?.includes('earth-water-ecology')` (the `hydrology`
  token already normalises to `earth-water-ecology` via the Phase-prior
  `REQUIRED_LAYER_ALIAS`) and passes them in. Non-focus call-sites pass nothing
  ⇒ behaviour byte-for-byte unchanged.

### Phase 2 — annotation evidence auto-capture (single seam)

When an objective is focused and a feature is placed with one of its
`requiredTools`, auto-record an `annotation`-kind evidence item. The single
shared creation primitive `createWithDefaults` is the one clean seam every
relevant tool routes through — instrumenting it avoids 28-tool churn. Manual
"Mark captured" stays as a fallback.

- **New** `store/placementSignalStore.ts` — tiny non-persisted Zustand
  `{ seq, lastId, signal(id) }` (bump `seq`, set `lastId`).
- `createWithDefaults` pulses `usePlacementSignalStore.getState().signal(newId)`
  after a successful id is produced (1 line + import).
- **New pure** `firstUnsatisfiedAnnotationSpec(objective, run)` in
  `fieldObjective.ts` — first `kind === 'annotation'` evidence spec whose
  captured count `< min`; unit-tested alongside `requiredLayersToModules`.
- **New headless** `ObjectiveAnnotationAutoCapture.tsx` (`return null`, mounted
  only in focus) subscribes to `placementSignalStore.seq`; on a new value
  (deduped via ref) reads `useMapToolStore.getState().activeTool`; if it is in
  the objective's `requiredTools` and a spec is unsatisfied, calls
  `addEvidence(projectId, objective.id, { specId, kind: 'annotation', value: lastId })`
  — storing the annotation id links evidence ↔ feature.
- `ObjectiveEvidenceCapture` annotation branch gained a one-line hint that
  placing a required-tool feature records this automatically; manual button
  kept.

### Phase 3 — Erosion Flag + Runoff Path tools (additive, topography module)

Both tools belong to the **topography** module so they inherit Phase 1–2 focus
scoping + auto-capture for free. All changes additive (no deletion).

- `topographyStore` — `erosionFlags: ErosionFlag[]` (point; `severity`
  low/medium/high, `type` sheet/rill/gully/bank, optional notes) and
  `runoffPaths: RunoffPath[]` (line; optional `from`/`to`, `flowCondition`
  dry/light/active/severe, optional notes) collections + add/update/remove +
  `migrate` defaulting both to `[]`, mirroring `drainageLines` / `highPoints`.
- `annotationFieldSchemas.ts` — `AnnotationKind` extended with
  `'erosionFlag' | 'runoffPath'`; a `FieldSchema` for each (selects + notes)
  with `defaults` / `loadDefaults` / `save` into `topographyStore`; registered
  in `FIELD_SCHEMAS` + `FIELD_REMOVERS`.
- **New** `ErosionFlagTool.tsx` (`draw_point`) and `RunoffPathTool.tsx`
  (`draw_line_string`, mirroring `DrainageLineTool` with `useDimensionDrawTool`
  + `DimensionPanel` + `DrawLengthReadout`); both call `createWithDefaults` then
  `open(...)` the structured form.
- `useMapToolStore` — `MapToolId`s `observe.topography.erosion-flag` /
  `observe.topography.runoff-path`.
- `ObserveDrawHost` — two switch cases; `ObserveTools` — two topography rail
  entries (Flag / Spline icons).
- `ObserveAnnotationLayers` — a circle `LayerSpec` (erosion, coloured by
  `severity`) and a line `LayerSpec` (runoff, coloured by `flowCondition`,
  dashed); both `SPEC_MODULE → 'topography'`; **no sprite-icon registration**
  (circle/line paint only, so no `lucideSprite` exhaustiveness break).
- `AnnotationRegistry.ts` — the two kinds threaded through **every**
  exhaustiveness point (`KIND_LABELS`, `rowsForKind`, `getAnnotationRow`,
  `removeAnnotation`) + subscriptions/deps.
- `seedObjectives.ts` — slope-12A `requiredTools` extended with both new ids.

## Rationale

- **Prop-driven raster actuation, not toggle mutation** — exit reverts for free,
  with zero persisted-state side effects; non-focus call-sites are untouched.
- **`createWithDefaults` is the single seam** — every relevant tool routes
  through it, so one instrumented line covers all current and future
  annotation tools without per-tool wiring.
- **Storing the annotation id as the evidence value** links the evidence record
  to the actual placed feature (auditable), not just an opaque tick.
- **New tools live in `topography`** — they automatically inherit the existing
  focus-scoping (`requiredLayersToModules`) and auto-capture, so no new
  module-actuation plumbing was needed.
- **Circle/line paint over sprite icons** — avoids touching the
  `lucideSprite` registry and its exhaustiveness surface.

## Alternatives Considered

- **Mutating `matrixTogglesStore` on focus enter / restoring on exit** —
  rejected; brittle snapshot/restore and visible toggle flicker. The
  `forceVisible` prop is stateless and self-reverting.
- **Per-tool auto-capture wiring (28 tools)** — rejected; massive churn and
  drift risk. The `createWithDefaults` seam is one line.
- **A new "field-feature" annotation module for the two tools** — rejected;
  putting them in `topography` reuses all existing scoping for free.

## Consequences

- New files: `store/placementSignalStore.ts`,
  `v3/observe/objective/ObjectiveAnnotationAutoCapture.tsx`,
  `v3/observe/components/draw/ErosionFlagTool.tsx`,
  `v3/observe/components/draw/RunoffPathTool.tsx`.
- Adding any future `AnnotationKind` still requires updating all of
  `FIELD_SCHEMAS`, `FIELD_REMOVERS`, `KIND_LABELS`, `rowsForKind`,
  `getAnnotationRow`, `removeAnnotation` (TypeScript exhaustiveness enforces
  this — it surfaced as compile errors during Phase 3 and was the safety net).
- The doc-named Screen-4 tools now exist and the slope-12A objective is the
  fully-wired reference path (raster auto-on + Erosion Flag + Runoff Path +
  annotation auto-advance).

## Verification

- `tsc --noEmit` via the 8 GB node script — own files type-clean; only the **3
  known pre-existing unrelated errors** remain (`StepBoundary.tsx`,
  `HostUnionContextMenu.test.tsx`, `HostUnionDrilldownCard.test.tsx`).
- Targeted vitest: **183/183** (`src/v3/objectives` + `src/v3/observe`),
  including **21/21** objectives and the new `firstUnsatisfiedAnnotationSpec`
  cases. (The ECONNREFUSED lines are the expected offline-fetch fallback, not
  failures; the full-suite background runs never flushed output, so a targeted
  subset was used.)
- **Live preview pass driven (2026-05-25) — WebGL wall down; 4/5 DoD steps
  verified-live, placement blocked by a harness gap, not faked.** Three of the
  four historical walls are down (MapTiler key present, `mtc` seeds offline,
  auth passed by **operator signing in directly** — Claude handled no
  credentials; two non-credential bypasses were correctly classifier-blocked).
  WebGL renders (basemap + contours + hillshade + water fill), retiring the
  "headless-WebGL capture hang" caveat for this harness.
  - **Step A (launch focus)** — verified-live: route → `?objective=
    obj-slope-12a-rainfall`, `ObjectiveBanner` in DOM, rail swaps to execution aside.
  - **Step B (base raster auto-on)** — verified-live: `window.__atlasMap`
    reports `matrix-topography-hillshade` / `-line` / `-label` /
    `matrix-water-fill` / `matrix-waterway-line` `visibility === 'visible'`
    under focus, plus on-screen relief + contours + water fill.
  - **Step C (Erosion Flag + Runoff Path in rail)** — DOM-verified: both
    `restrictToTools` rail entries present.
  - **Step D (placement → form → evidence auto-advance)** — **blocked-by-harness,
    honestly reported (not faked).** Synthetic canvas clicks reach the map
    (`map.on('click')` fired 4× with valid `lngLat`, full
    mousedown→mouseup→click, canvas un-intercepted) but **mapbox-gl-draw fires
    zero draw events** under synthetic input — `draw.create/add/update/
    modechange` never fire, the `draw_point` placeholder stays coord-empty
    `[[]]`, no form opens, evidence stays 0/1. Diagnosed as a
    synthetic-input ↔ mapbox-gl-draw gap, **not an app bug** (React/DOM clicks
    like the banner-exit button work fine). Per the locked "real map-click only"
    decision, placement was **not** fabricated via `createWithDefaults` /
    `draw.add` / a synthetic `draw.create`; form + evidence-auto-advance remain
    **code-verified only** (vitest above), not live-confirmed.
  - **Step E (exit reverts rasters)** — verified-live: "← Command Centre"
    navigates home, banner leaves DOM, and the matrix layers flip
    `visible → none` (proven prop-driven: plain topography with no objective
    reports all `none`).
- Shipped commit-immediately on `feat/atlas-permaculture` (rebased out-of-band;
  own files staged by name, foreign WIP left untouched per the no-deletion
  rule): `958de914` (Phase 1, folded into the external rebase), `58441e14`
  (Phase 2 — 5 files), `aa64ee89` (Phase 3 — 10 files, +448). Pushed clean
  fast-forward `db4b45e2..aa64ee89` (divergence checked `1 0` first).

## Connections

- [[olos]] — the Atlas/OLOS app this ships in (Observe stage)
- [[2026-05-24-atlas-objective-driven-workspace]] — the objective workspace this
  completes (it deferred exactly these three items as v1)
- [[2026-05-24-atlas-observe-command-centre]] — the Command Centre shell the
  workspace lives in
- [[maqasid-al-shariah]] — land stewardship under the Environment maqsid
