---
title: "Atlas Observe — 'Observation Needs' reframe (execution)"
type: decision
date: 2026-05-25
status: accepted
tags: [atlas, observe, architecture, stage-boundaries, refactor, ui]
superseded_by: null
---

# Atlas Observe — "Observation Needs" reframe (execution)

## Context

[[2026-05-25-atlas-observe-needs-reframe]] produced a **spec only** for converting the
Observe Command Centre's `FieldObjective` system into an `ObservationNeed` system (Observe
manages recorded observations + expresses observation *needs*, but does **not** assign work
— that belongs to Plan → Act). Its §7 laid out a 7-step staged refactor. This session
**executes** that mechanical refactor (the generative "Raise observation need" action, §7
step 5, is deferred).

## Decision

Land the rename + strip-assignment + lifecycle-collapse + `?need=` deep-link + folder moves
+ docs as **three green commits** on `feat/atlas-permaculture` (committed immediately, per
the externally-rebased-branch rule):

1. **`c57a96a8` — content.** Rename all identifiers in place (`FieldObjective`→
   `ObservationNeed`, `ObjectiveStatus`→`ObservationNeedStatus`, `CompletionRule`→
   `RecordingRule`, `evaluateObjectiveCompletion`→`evaluateObservationRecorded`,
   `AssignedObjectivesPanel`→`OpenObservationNeedsPanel`, `Objective*` focus pieces→
   `Capture*`, etc.); strip `assignee`/`ObjectiveAssignee`/`dueAt` + review states; collapse
   lifecycle to `open → in-progress → recorded` (+`resolved`); add `origin`/
   `sourceObservationId?`/`reason`/`trigger?`/`planImpact?`; collapse the capture footer to a
   single **"Record observation"** button; deep-link key `?objective=`→`?need=`.
2. **`69345beb` — moves.** `git mv` files to new paths (`v3/objectives/`→
   `v3/observation-needs/`, `v3/observe/objective/`→`v3/observe/capture/`,
   `store/fieldObjectiveStore.ts`→`store/observationNeedStore.ts`,
   `command/ObjectiveMapMarkers.tsx`→`CaptureMapMarkers.tsx`,
   `command/AssignedObjectivesPanel.tsx`→`OpenObservationNeedsPanel.tsx`) + fix every import
   path and the remaining function/export names (`CaptureEvidenceCapture`,
   `CaptureMapMarkers`).
3. **`0d4a485a` — docs.** Rewrite `OBSERVATION-NEEDS-WORKSPACE.md` from "spec / not yet
   implemented" into the **live reference** (current code paths, the landed persist-key
   migration, the one remaining follow-on); delete `OBJECTIVE-WORKSPACE.md`; mark the reframe
   **DONE** in `BACKLOG-v3.1.md`.

### Key execution choices

- **Regrouped the spec's 5 commits into 3 green ones.** The original per-slice plan couldn't
  compile in isolation (the type rename cascades through ~16 files), so the rename was done
  **in place first** (Commit 1, builds green) and the **file moves second** (Commit 2,
  pure path/name churn) — each commit independently green.
- **Persist-key migration via module-load `portLegacyPersist()`.** The store now persists
  under `ogden-observation-needs` at `version: 2`. Because the *key itself* changed (not just
  the shape), zustand's `migrate` can't see the old blob — so a module-load function reads
  the legacy `ogden-field-objectives` key, remaps statuses (`not-started`→`open`,
  `evidence-submitted`→`in-progress`, `complete`→`recorded`, `needs-review`→`in-progress`),
  and writes the new key, so in-progress field state survives the rename.
- **The view model keeps its `.objective` property name** (`ObservationNeedView.objective`)
  to minimize churn across the panels that read it.

## Rationale

Committing each green slice immediately is mandatory on `feat/atlas-permaculture` (it is
force-rebased out-of-band; uncommitted work gets wiped). Rename-in-place-then-move keeps each
commit reviewable and bisectable, and avoids a large half-finished rename living
uncommitted.

## Consequences

- `FieldObjective` and its assignment/review lifecycle are now fully removed from the code —
  the `2026-05-24-atlas-objective-driven-workspace` model is superseded in code (that ADR
  stays `accepted` for history; the `OBJECTIVE-WORKSPACE.md` doc it referenced is deleted).
- The deep link is `?need=<id>` end to end. The observe route still has no `validateSearch`,
  so the param is read loosely in `ObserveLayout`.
- **Deferred follow-on:** the generative "Raise observation need" action (spec §5b/§7 step 5)
  — the `ObservationNeed` entity already carries `origin`/`sourceObservationId`/`reason`, so
  only the action UI is unbuilt.
- **Verification debt carried forward:** unit tests (22/22 on `observationNeed.test.ts`) +
  type-clean touched files (the 3 pre-existing baseline `tsc` errors —
  `StepBoundary.tsx`/`HostUnion*.test.tsx` — block a full production build but are unrelated);
  live preview not run (auth + WebGL + Windows capture wall, per
  [[2026-05-19-atlas-preview-screenshot-verification-standard]]).

## Connections

- [[2026-05-25-atlas-observe-needs-reframe]] — the spec this executes
- [[2026-05-24-atlas-objective-driven-workspace]] — the `FieldObjective` model now superseded in code
- [[olos]] — the project this reframes (Observe stage)
