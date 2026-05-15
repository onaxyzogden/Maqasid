---
title: "Atlas Observe — explicit Move mode + click-to-select-only"
type: decision
date: 2026-05-15
status: accepted
entities: [olos]
---

# Atlas Observe — explicit Move mode + click-to-select-only

## Context

On the Observe map, a single click on a placed annotation did two surprising
things at once: (1) selection alone made the feature draggable/vertex-editable
(points via `AnnotationDragHandler`, lines/polygons via MapboxDraw
`direct_select` mounted by `SharedVertexEditHandler`), and (2) the same click
immediately popped the editable form/inline popover. Because selection is one
click, a stray click could silently reposition geometry *and* yank the editor
open. User asked for selection to be inert: moving and editing must be
deliberate second actions.

## Decision

Two-part gate, both keyed off an explicit-intent flag rather than mere
selection:

1. **Explicit Move mode.** New ephemeral `moveMode: boolean` on
   `observeSelectionStore` (+ `toggleMoveMode`/`setMoveMode`). Every selection
   mutator (`set`/`add`/`remove`/`toggle`/`clear`) resets `moveMode:false`, so
   any selection change — including map clicks, batch ops, Esc, Clear —
   auto-disarms. A **Move** toggle button on `SelectionFloater` (single
   selection + editable-geometry kinds only, `aria-pressed`, `btnActive`
   styling) is the only way to arm it. `AnnotationDragHandler` bails unless
   `moveMode`; `AnnotationVertexEditHandler` keeps `target` null unless
   `moveMode` (so MapboxDraw never mounts until armed).

2. **Click-to-select-only.** In `ObserveAnnotationLayers` the plain-click
   handler now opens the editor only on a *second* click of the
   already-sole-selected feature; the first click just selects. Shift-click
   multi-toggle and double-click → read-only detail panel are unchanged.

Reset-inside-the-store-action is the load-bearing choice: no click-handler
caller needed updating, and it's impossible to leave Move armed across a
selection change.

## Consequences

- A click selects; reposition/vertex-edit and the editor are deliberate
  follow-ups. Stray clicks no longer mutate geometry or open forms.
- When Move is armed for a line/polygon, MapboxDraw `direct_select` still
  permits whole-body drag in addition to vertex drag — accepted (user chose
  "explicit move mode," not "vertices only").
- Files: `apps/web/src/store/observeSelectionStore.ts`,
  `apps/web/src/v3/observe/components/SelectionFloater.tsx` (+`.module.css`),
  `apps/web/src/v3/observe/components/draw/AnnotationDragHandler.tsx`,
  `apps/web/src/v3/observe/components/draw/AnnotationVertexEditHandler.tsx`,
  `apps/web/src/v3/observe/components/layers/ObserveAnnotationLayers.tsx`.
- Reused `POINT_KINDS`/`LINESTRING_KINDS`/`POLYGON_KINDS` from
  `annotationGeometryRegistry.ts` for the floater's enable predicate.

## Verification

- `tsc --noEmit` (8 GB heap; 4 GB OOMs — environment limit): zero errors in
  all five touched files. One iteration fixed a real
  `noUncheckedIndexedAccess` miss (`single` is `… | undefined`, not
  `… | null`; `!!single` guard). Pre-existing branch errors
  (`ecologyZones`/`EcologyState`, `SuccessionStage`, `dominantStage`) are
  unrelated WIP and out of scope.
- Dev server HMR-compiled all modules; Observe route loads clean (only
  pre-existing `ObserveModuleBar` button-nesting warning).
- Interactive click→select→Move→drag NOT verified: MapLibre canvas not
  scriptable via preview a11y tools and `preview_screenshot` unresponsive
  (30 s timeout). Flagged to user for manual confirmation rather than
  claimed.

## Deferred

- Manual in-browser confirmation of steps: click selects (no popup);
  re-click opens editor; Move arms drag; selecting another feature disarms.
- "Vertices-only" variant for lines/polygons (whole-body drag still allowed
  when armed).
- Scoped to the change only; the in-progress `feat/atlas-permaculture`
  ecology/vegetation refactor in the same working tree was deliberately
  NOT committed.
