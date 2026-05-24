---
title: "Atlas Objective-Driven Observe Workspace — the assignment is the entry point"
type: decision
date: 2026-05-24
tags: [atlas, observe, command-centre, objectives, field-objective, evidence, gating, routing, ui]
status: accepted
superseded_by: null
---

# Atlas Objective-Driven Observe Workspace — the assignment is the entry point

## Context

The "OLOS Stage Command Center" doc frames the Observe stage as an
**objective-driven workspace**: a steward should never hunt for the right
screen, layer, or tool — the *assignment itself* is the entry point. Launching
an assigned objective loads a purpose-built task environment (map centred on the
area, the objective's tools in the rail, its checklist + evidence requirements,
and the completion logic).

The same-day sibling work [[2026-05-24-atlas-observe-command-centre]] built the
*shell* this lives in: it scaffolded the `observe/command-centre` route, the
Stage-Compass center-unlock mechanic, and the aggregate awareness panels (site
map, evidence/gaps, the 7 embedded module dashboards). But "objectives" in that
work were the two pre-existing **module-keyed, non-location-bound** notions
(`ObserveObjective` predicates + `CompassObjective` wheel nodes). There was no
discrete, location-bound, assignable field-work item, no focused execution
surface, and no evidence-capture / completion loop. This session built that
missing layer.

## Decision

Introduce a fourth, deliberately-named concept and the two-mode workspace
around it.

### Naming (collision-avoidance)

| Type | What it is | Where |
| --- | --- | --- |
| `ObserveObjective` | pure predicates over store counts | `v3/observe/progress/objectives.ts` |
| `CompassObjective` | compass-wheel nodes | `v3/compass/observeCompassConfig.ts` |
| **`FieldObjective`** | **discrete, location-bound, assignable field-work package** | `v3/objectives/fieldObjective.ts` |

User-facing label for a `FieldObjective` is simply **"Objective"**; cards live
under "Assigned Objectives".

### Data layer — static catalog / mutable run split

Mirrors the compass evidence/checks model.

- `v3/objectives/fieldObjective.ts` — the `FieldObjective` type, run + evidence
  types, and the **pure** `evaluateObjectiveCompletion(objective, run)` helper
  (`pct` weights each *active* gate equally; `canSubmit` requires all gates met).
- `v3/objectives/seedObjectives.ts` — `SEED_FIELD_OBJECTIVES`: 8 objectives
  across modules at coordinates inside the `mtc` parcel, each wiring
  `module → requiredTools` / `requiredLayers`. Every `requireSummary: true`
  objective also carries a required **note-kind** evidence spec id `summary`
  (1:1) — see the note-as-summary decision below.
- `store/fieldObjectiveStore.ts` — persisted Zustand keyed
  `byProject[projectId][objectiveId]` (persist name `ogden-field-objectives`,
  v1). Owns **only** the mutable run state (`checkedChecklist`, `evidence`,
  `summary`, `status`, `updatedAt`); the catalog is never persisted. Mutators
  `toggleCheck` / `addEvidence` / `removeEvidence` / `setSummary` / `setStatus`
  stamp `updatedAt`.
- `v3/objectives/useFieldObjectives.ts` — joins catalog + run + completion eval
  into `FieldObjectiveView[]` for every consumer.

### Screen 1 — ungated Command Centre overview

The legacy 100%-complete **page guard** (sibling Slice A `d7355da8`'s "Command
Centre locked" state) was **removed**. `ObserveCommandCentrePage` now renders
fully at any readiness; `ready` only changes emphasis (subtitle copy + the
Plan-readiness banner). Added launch surfaces: per-objective **map markers**
(coloured by `OBSERVE_MODULE_DOT`, ✓ badge when complete) via `SiteMapPanel`,
`AssignedObjectivesPanel` launch cards, and `ObservationTimelinePanel`
(reverse-chron feed derived from run-store events — no separate event log).
Card / marker click navigates to
`/v3/project/$projectId/observe/$module?objective=<id>`.

### Screen 2 — Objective Focus Mode (execution)

Reuses `ObserveLayout`, driven by the `?objective` search param (observe routes
have no `validateSearch`, so it passes through). On entry: `ObjectiveMapFocus`
flies the camera + drops a pulsing highlight ring (child of `DiagnoseMap`);
`ObserveTools restrictToTools={requiredTools}` narrows the left rail (groups
with no allowed tool hidden); the right rail swaps from `ObserveChecklistAside`
to the new `ObjectiveExecutionAside`; `ObjectiveBanner` overlays the map top
with a "← Command Centre" exit.

`ObjectiveEvidenceCapture` renders per `EvidenceSpec.kind`: **photo** (file
picker → data URL + thumbnail strip), **confirmation** (single toggle),
**annotation** (manual "Mark captured" record; auto-detection deferred), **note**
(single textarea).

### Screen 3 — completion / review

The pure helper gates the footer: in-progress / needs-review → **Submit for
review** (enabled only when `canSubmit`; sets `evidence-submitted` + returns to
overview); evidence-submitted → reviewer **Send back** (→ `needs-review`) /
**Mark complete** (→ `complete`); complete → confirmation + "Back to Command
Centre". **Timeline write-back needs no new code** — `ObservationTimelinePanel`
already derives a completion event from `run.status === 'complete' &&
run.updatedAt`.

## Rationale

- **Note doubles as the run summary** — every `requireSummary` objective also
  has a required note-kind evidence spec. The note textarea writes *both* a note
  evidence record *and* `run.summary` (one `handleNoteAdd`: drop the prior note,
  `addEvidence` note, `setSummary`). One input satisfies both the evidence gate
  and the `requireSummary` gate — no double entry, and the tested pure helper is
  untouched.
- **Static-catalog / persisted-run split** — only run state is durable; the
  catalog is code. Mirrors the compass model and keeps `evaluateObjectiveCompletion`
  pure and unit-testable with no store/DOM.
- **Reuse `ObserveLayout`, don't rebuild** — the `?objective` driver + a
  `restrictToTools` prop + a swapped right rail turn the existing module surface
  into the focus surface with no parallel layout.

## Alternatives Considered

- **A new dedicated focus route/page** — rejected; `ObserveLayout` already owns
  the map + tools + rails, so a search-param driver is far less duplication.
- **Separate `summary` field distinct from a note evidence item** — rejected; it
  would force the steward to type the same prose twice. The note-as-summary
  mirror removes the redundancy.
- **A persisted event log for the timeline** — rejected; events are derived from
  run state (evidence items + the complete transition), so no second store.

## Consequences

- New folders/files: `v3/objectives/*` (type/seed/hook), `store/fieldObjectiveStore.ts`,
  `v3/observe/objective/{ObjectiveExecutionAside,ObjectiveEvidenceCapture}.tsx`
  (+ CSS) and the focus-entry pieces in `ObserveLayout`, plus the overview
  panels `AssignedObjectivesPanel` / `ObservationTimelinePanel` / objective
  markers in `SiteMapPanel`. UX spec doc at
  `apps/web/src/v3/command/OBJECTIVE-WORKSPACE.md`.
- **Deferred (data-only for v1):** layer actuation — Observe overlays mount
  unconditionally and `requiredLayers` is recorded but not yet forced-on / dimmed
  (the planned `useObjectiveFocus` snapshot/restore was not needed for v1).
  Evidence is client-only (data URLs in the persisted run store; no upload
  backend). Annotation auto-detection from placed features is deferred.

### ⚠ Contradiction flagged — center-unlock gate vs. ungated overview

This work **relaxes the 100%-complete gate** that the same-day sibling
[[2026-05-24-atlas-observe-command-centre]] established as a core mechanic
("gather at the edge, govern from the center"). The relaxation was
**user-confirmed in the approved plan** ("relax the 100%-complete gating"), but
it is only **partially applied** in the current code:

- The **page** (`ObserveCommandCentrePage`) is now ungated — reachable at any
  readiness by direct URL / deep-link.
- The **Stage-Compass center hotspot** (`ObserveCompassWheel`, sibling Slice B
  `9b77f3cf`) is **still locked until `ready`** (all 7 objectives 100%). At
  `Lock` in Setup mode it is `aria-disabled` and not clickable.

Net effect: below 100%, the ungated Command Centre is reachable by URL/deep-link
but **not** via the compass center — the very doorway the sibling work built. The
two intents (assignment-as-entry-point, available any time vs. center-locked-
until-ready) are in tension. **This ADR does not resolve it** (changing the
wheel is outside the approved scope and is sibling-owned code); it is left as an
operator decision: either (a) unlock the compass center when any objective is
launchable, (b) keep the center gated and treat the ungated page as a
deep-link / direct-URL surface only, or (c) replace the center gate with a
softer "X% ready" affordance. Recorded here so the next session does not assume
the gate was uniformly removed.

## Verification

- Objective unit tests: **11/11** pass (`evaluateObjectiveCompletion` +
  seed-shape).
- `tsc --noEmit` via the 8 GB node script — own files type-clean; only the **3
  known pre-existing unrelated errors** remain (`StepBoundary.tsx`,
  `HostUnionContextMenu.test.tsx`, `HostUnionDrilldownCard.test.tsx`).
- Preview-verified (screenshots): focus mode at 100% (topography), Command
  Centre with a completed objective, and a built-environment focus
  (`obj-photograph-east-gate` → rail shows only Fence + Gate). Completion math
  proven end-to-end: **89%** with photos 0/3, **100%** after 3 photos + reload
  (proves persist + rehydrate).
- Shipped commit-immediately on `feat/atlas-permaculture` (rebased out-of-band;
  own files staged by name, foreign WIP left untouched per the no-deletion
  rule): `c7784e6b` (ungated overview + assigned objectives), `b8fcb06f` (focus
  mode entry), `8792434b` (Plan-rail focus), `9fa7ff86` (execution aside),
  `f53ce95c` (completion/review), `8355fc67` (UX spec).
- **Gotcha:** preview screenshot `UnknownVizError` is a transient map-WebGL
  hiccup — retry succeeds.

## Connections

- [[olos]] — the Atlas/OLOS app this ships in (Observe stage)
- [[2026-05-24-atlas-observe-command-centre]] — same-day sibling work that built
  the Command Centre shell + center-unlock gate this **partially supersedes**
  (see the flagged contradiction above)
- [[2026-05-24-atlas-multi-steward-human-context]] — same-day sibling Observe work
- [[maqasid-al-shariah]] — land stewardship under the Environment maqsid
