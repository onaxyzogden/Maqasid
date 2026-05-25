---
title: "Atlas Plan→Act — data-derived progress segments + soft gate"
type: decision
date: 2026-05-25
tags: [atlas, plan, act, progress, gating, stage-gate, objectives, data-derived, ui, zustand]
status: accepted
superseded_by: null
---

# Atlas Plan→Act — data-derived progress segments + soft gate

## Context

The prior round (`d33d6e15`) made the **Observe** stage's progress reflect *real
user progress*: each Observe objective became a pure predicate over persisted
Zustand store data, the `LevelNavigator` carousel + `ObserveModuleBar` light up
from real `PillarTask[]`, a soft `StageGateOverlay` shows a dismissible
"N objectives left" card with **Continue anyway**, and `ObserveReadyCue` enables
"Ready to Plan →" exactly when all required objectives are met.

The stage-progress segments existed for Plan too but were still **decorative** —
they did not track whether the steward had actually authored a coherent design.
This round applies the **same data-derived pattern to the Plan stage**, so the
Plan carousel/module-bar reflect real design progress and a soft **Plan→Act**
gate guides the steward to finish the core design essentials before moving to
Act. Same motivation as Observe: *guide users to complete the necessary steps in
a stage before they move to the next stage.*

Locked decisions (steward-confirmed via AskUserQuestion in the prior planning
session):
- **Required set = "core design essentials"** — required objectives on **4 Plan
  modules only**: `water-management`, `zone-circulation`, `plant-systems`,
  `phasing-budgeting`. Every other Plan module carries **optional** objectives
  (raise % but don't gate).
- **Add `PlanReadyCue`** ("Plan essentials · N%" + "Ready to Act →"), mirroring
  `ObserveReadyCue`.
- **Reuse the soft-gate + override mechanism**; **data-derived only** (pure
  predicates over store data — no manual How-checks).

## Decision

Mirror `v3/observe/progress/` one-for-one for Plan, light up the shared Plan
bottom bar (which Observe's bespoke bar did not require), and reuse the generic
override store.

### 1. Plan objectives engine — `apps/web/src/v3/plan/progress/`

- **`objectives.ts`** (pure — no React, no store imports): `PlanProgressInput`
  data bag, `EMPTY_PLAN_INPUT`, `PlanObjective`, `PLAN_OBJECTIVES:
  Record<PlanModule, PlanObjective[]>`, `evaluateModule(objectives, input,
  module)`, `evaluatePlan(input)`. Each `PillarTask` carries
  `columnId: done ? 'plan_done' : 'plan_to_do'` (drops straight into
  `LevelNavigator`'s `taskColorFn`); module `complete = requiredTotal > 0 ?
  requiredDone === requiredTotal : true`.
  - **Required predicates:** water-management `waterNodeCount > 0`;
    zone-circulation `zoneCount > 0 || pathCount > 0`; plant-systems
    `guildCount > 0 || cropAreaCount > 0`; phasing-budgeting
    `phaseCount > 0 || workItemCount > 0`.
  - **Optional predicates (raise % only):** water network (`waterNodeCount>=3`),
    zone path, plant succession (`successionPlanned` — an *independent* field, so
    the "optional alone doesn't complete the module" test holds), structures
    (`builtProposedCount>0`), soil (`soilFlowCount>0`), livestock
    (`paddockCount>0`), principle (`principleMetCount>0`).
  - Modules with no authoring store carry no objectives this round: goal-compass,
    dynamic-layering, machinery, cross-section-solar, regeneration-monitor,
    habitat-allocation, biodiversity-monitor.
- **`usePlanProgress.ts`** — the only React/store layer. Subscribes to **raw**
  store fields (per the zustand selector-stability rule — no freshly-allocated
  arrays from selectors), filters each flat array by `.projectId`
  (and `byProject[projectId]` for `successionPathStore`/`principleCheckStore`),
  assembles the input bag in a **single `useMemo`**, calls `evaluatePlan`.
- **`__tests__/objectives.test.ts`** — 9 tests (Observe's 8 + a 5th
  evaluateModule case for an optional-only module).

### 2. Light up Plan segments + the shared bottom bar

- **`V3LevelNavBridge.tsx`** — added `PLAN_PILLARS` (from `PLAN_MODULES` +
  `PLAN_MODULE_LABEL`) + `PLAN_GATE_AFTER_SEGMENT = "biodiversity-monitor"` (last
  Plan module). Calls `usePlanProgress(projectId)` **before** the early return
  (hooks rule). Extended the provider `pillars` / `pillarTasks` / `gateIndicators`
  ternaries with a `stage === "plan"` branch (Plan→Act diamond `afterSegmentId:
  'biodiversity-monitor'`, `label: 'Act'`, status from `requiredComplete` /
  `doneCount`); extended `handleSegmentClick` for `levelKey === "plan"`.
- **Shared bottom bar (the one real difference from Observe).** Observe uses a
  bespoke `ObserveModuleBar` reading `ctx.pillarTasks`; Plan uses the **shared**
  `ModuleBar` which renders a passive `.tileBar` placeholder unless given a
  `renderTileIndicator` render-prop. New
  `apps/web/src/v3/_shared/moduleNav/ModuleProgressIndicator.tsx` reads
  `ctx.pillarTasks[module]` + `ctx.taskColorFn` and renders the subseg row as
  **non-button `<div>`s** (the tile is already a `<button>` → no nested buttons).
  `PlanModuleBar` passes `renderTileIndicator={(m) => <ModuleProgressIndicator
  module={m} />}`. Observe's bespoke bar is untouched.

### 3. Soft Plan→Act gate + override

- **`stageGateOverrideStore.ts`** — widened the union to
  `export type StageGate = 'observe-to-plan' | 'plan-to-act';`. The generic
  per-project `byProject: Record<string, Partial<Record<StageGate, boolean>>>`
  already supports this — **no other change, no persist version bump.**
- **New `apps/web/src/v3/act/StageGateOverlay.tsx`** — uses
  `usePlanProgress(projectId)` + override gate `'plan-to-act'`; returns null if
  `requiredComplete || overridden || !projectId`; else a scrim card listing the
  remaining required labels with **Go to Plan** + **Continue anyway** (sets the
  override). Reuses the existing `../plan/StageGateOverlay.module.css`.
- **`ActLayout.tsx`** — wrapped the canvas `DiagnoseMap` in a
  `position:relative` host (it had none) and mounted `<StageGateOverlay />`.

### 4. PlanReadyCue

- **New `apps/web/src/v3/plan/components/PlanReadyCue.tsx` + `.module.css`**
  mirroring `ObserveReadyCue`: "Plan essentials · N%", the remaining required
  list, "Ready to Act →" enabled exactly when `requiredComplete`, navigating to
  `/v3/project/$projectId/act`. Mounted in `PlanLayout.tsx`'s right rail via a
  fragment beside `PlanChecklistAside`.

## Rationale

- **Mirror Observe one-for-one** — the pattern is proven; copying its shape keeps
  the two stages maintainable in parallel and the predicates auditable.
- **Data-derived only** — completion is a pure function of persisted store data,
  so segments, gate, and cue all stay in sync the moment the last required
  objective is satisfied; no manual How-checks to drift out of date.
- **Reuse the generic override store** — `byProject` already keys arbitrary gate
  names, so widening the union is a 1-line, migration-free change.
- **Non-button subseg divs** — the shared `ModuleBar` tile is a `<button>`;
  rendering the indicator as `<div>`s avoids invalid nested-button HTML.
- **Soft, never blocking** — routes stay open; the gate is guidance with a
  persisted **Continue anyway**, matching the Observe round.

## Alternatives Considered

- **Required objectives on every Plan module** — rejected by the operator:
  "core design essentials" (4 modules) is the meaningful gate; the rest raise %
  without gating.
- **A bespoke `PlanModuleBar` mirroring `ObserveModuleBar`** — rejected: the
  shared `ModuleBar` already exists and only needed the `renderTileIndicator`
  seam, so a fork would re-introduce divergence.
- **Manual How-check-driven progress** — rejected: kept guidance-only; segments
  + gate + cue are data-derived, as in Observe.

## Consequences

- New folder `apps/web/src/v3/plan/progress/` (engine + hook + tests) mirrors
  `v3/observe/progress/`.
- New shared `ModuleProgressIndicator` is now available for any stage using the
  shared `ModuleBar` (Act could adopt it later).
- `evaluateModule` needed a 3rd `module` param (Observe inferred the module from
  `objectives[0]?.module`, which fails for empty-objective modules).
- **Plan correction (discovery):** the Plan bottom bar would *not* auto-light by
  copying Observe — the shared `ModuleBar` needs the explicit render-prop; and
  `ActLayout` lacked a `position:relative` canvas wrapper, so the overlay needed
  one added.
- Foreign WIP from concurrent sessions was left unstaged per the no-deletion /
  rebased-branch discipline; only the 14 own files were committed by name.

## Verification

- `corepack pnpm --filter @ogden/web run typecheck` (8 GB heap script — the plain
  `lint` `tsc` OOMs at default heap) — own files type-clean; only the **3 known
  pre-existing unrelated errors** remain (`StepBoundary.tsx(365,7)`,
  `HostUnionContextMenu.test.tsx(58,36)`, `HostUnionDrilldownCard.test.tsx(25,36)`),
  none in the 14 files of this change.
- Vitest: **17/17** — new Plan `objectives.test.ts` **9/9** + existing Observe
  `objectives.test.ts` **8/8** green.
- Live preview deferred behind the documented auth + seeded-project + headless-
  WebGL wall (the `:3001` API is `ECONNREFUSED` offline) — honestly flagged, not
  faked, per CLAUDE.md.
- Committed `047c06f9` ("feat(atlas): data-derived Plan progress + soft Plan→Act
  gate", 14 files, +914/−27) on `feat/atlas-permaculture` (own files staged by
  name; 15 foreign-WIP entries left unstaged). Pushed after fetch + divergence
  check.

## Connections

- [[olos]] — the Atlas/OLOS app this ships in (Plan + Act stages)
- [[2026-05-24-atlas-observe-command-centre]] — the Observe-stage progression
  spine this round's Plan equivalent mirrors
- [[2026-05-24-atlas-objective-driven-workspace]] — the objective-workspace
  pattern that established data-derived completion for Observe
- [[maqasid-al-shariah]] — land stewardship under the Environment maqsid
