---
title: "Atlas Act→Report — data-derived progress segments + soft gate"
type: decision
date: 2026-05-25
tags: [atlas, act, report, progress, gating, stage-gate, objectives, data-derived, ui, zustand]
status: accepted
superseded_by: null
---

# Atlas Act→Report — data-derived progress segments + soft gate

## Context

Two prior rounds shipped the data-derived progress pattern down the 3-stage spine
(Observe → Plan → Act). **Observe** (`d33d6e15`, [[2026-05-24-atlas-observe-command-centre]])
and **Plan** (`047c06f9`, [[2026-05-25-atlas-plan-to-act-data-derived-gate]]) now both
work the same way: each stage objective is a **pure predicate over persisted Zustand
store data** ("activation event"), the `LevelNavigator` carousel + bottom-bar tiles
light from real `PillarTask[]`, a soft `StageGateOverlay` shows a dismissible
"N objectives left" card with **Continue anyway** (persisted per-project override), and
a "ready cue" enables the forward jump exactly when all required objectives are met.

This round closes the spine by applying the **same pattern to the Act (execution)
stage** — the final lifecycle stage. Act already uses the **shared `ModuleBar`**, so it
reuses the `ModuleProgressIndicator` render-prop built in the Plan round (no new
bottom-bar component needed). The forward target after Act is the **Report** page
(a sibling route, *not* a spine `LEVELS` entry), so the gate guides the steward to log
real execution progress before reviewing outcomes. Same motivation as Observe and Plan:
*guide users to complete the necessary steps in a stage before they move on.*

Locked decisions (steward-confirmed via AskUserQuestion this session):
- **Required set = Tracker only.** `WorkItem.status === 'done'` is the universal
  execution signal across all Act modules, so the single required objective is "at least
  one work item done." Every other Act module carries **optional** objectives (raise %
  but don't gate).
- **Add a soft Act→Report gate.** Mirror the Plan→Act gate but mount the overlay on the
  **Report page** with a new `'act-to-report'` override key.
- **Add `ActReadyCue`** ("Act essentials · N%" + "Ready to Report →"), mirroring
  `PlanReadyCue` / `ObserveReadyCue`.
- **Reuse** the shared `ModuleProgressIndicator`, the generic `stageGateOverrideStore`
  (widen the union — no version bump), and the existing gate CSS; **data-derived only**
  (pure predicates — no manual How-checks).

## Decision

Mirror `v3/plan/progress/` one-for-one for Act, light up the already-shared Act bottom
bar via the existing render-prop, reuse the generic override store, and mount the
forward gate on the **Report** page (because Act is terminal — Report is not a spine
`LEVELS` entry).

### 1. Act objectives engine — `apps/web/src/v3/act/progress/`

- **`objectives.ts`** (pure — no React, no store imports): `ActProgressInput` data bag
  (`workItemDoneCount, phaseCompletedCount, pilotCount, maintenanceEventCount,
  livestockMoveCount, harvestEntryCount, swotCount, hazardCount, contactCount,
  communityEventCount, appropriateTechCount`), `EMPTY_ACT_INPUT`, `ActObjective`,
  `ACT_OBJECTIVES: Record<ActModule, ActObjective[]>`, `evaluateModule(objectives,
  input, module)`, `evaluateAct(input)`. Each `PillarTask` carries
  `columnId: done ? 'act_done' : 'act_to_do'` (drops straight into `LevelNavigator`'s
  `taskColorFn`); module `complete = requiredTotal > 0 ? requiredDone === requiredTotal
  : true`; `percent = total > 0 ? Math.round((doneCount / total) * 100) : 0`.
  - **Required predicate (Tracker only):** `tracker.done` — `workItemDoneCount > 0`.
  - **Optional predicates (raise % only):** `tracker.momentum` (`workItemDoneCount >= 3`,
    an independent threshold); `build` (`phaseCompletedCount > 0 || pilotCount > 0`);
    `maintain` (`maintenanceEventCount > 0`); `livestock` (`livestockMoveCount > 0`);
    `harvest` (`harvestEntryCount > 0`); `review` (`swotCount > 0 || hazardCount > 0`);
    `network` (`contactCount > 0 || communityEventCount > 0`); `schedule`
    (`appropriateTechCount > 0` — no weather store, so the appropriate-tech count is the
    only authoring signal this round). Total = 9 objectives (tracker 2 + 7
    single-objective modules).
- **`useActProgress.ts`** — the only React/store layer. Subscribes to **raw** store
  fields (per the zustand selector-stability rule,
  [[2026-04-26-zustand-selector-stability]] — no freshly-allocated arrays from
  selectors), filters each **flat** array by `.projectId`, handles the **nested**
  `hazardsStore.byProject: { projectId, hazards[] }[]` specially (find the entry by
  `projectId`, count `.hazards`), assembles the input bag in a **single `useMemo`**,
  calls `evaluateAct`. When `!projectId`, returns `evaluateAct(EMPTY_ACT_INPUT)`.
- **`__tests__/objectives.test.ts`** — 9 tests mirroring the Plan suite: empty tracker
  task `act_to_do`; required `tracker.done` met (optional pending, task `act_done`);
  review SWOT-or-hazard via hazard; network via communityEvent; an optional-only module
  (`maintain`) complete with nothing done; evaluateAct empty → 0% / gate closed /
  `remainingRequired` length 1; required met → `requiredComplete` + all modules complete
  + `remainingRequired` 0; an optional count raises % but the gate stays closed;
  everything → 100%.

### 2. Light up Act segments + the shared bottom bar

- **`V3LevelNavBridge.tsx`** — added `ACT_PILLARS` (from `ACT_MODULES` +
  `ACT_MODULE_LABEL`) + `ACT_GATE_AFTER_SEGMENT = "schedule"` (last Act module). Calls
  `useActProgress(projectId)` **before** the early return (hooks rule). Extended the
  provider `pillars` / `pillarTasks` / `gateIndicators` ternaries with a `stage ===
  "act"` branch (Act→Report diamond `afterSegmentId: 'schedule'`, `label: 'Report'`,
  status from `requiredComplete` / `doneCount`); extended `handleSegmentClick` for
  `levelKey === "act"` (routes `/v3/project/$projectId/act` and `/act/$module`).
- **Shared bottom bar (no new component).** Unlike the Plan round — which had to build
  `ModuleProgressIndicator` — Act's `ActModuleBar` already uses the shared `ModuleBar`,
  so lighting it up was just passing the existing render-prop:
  `renderTileIndicator={(m) => <ModuleProgressIndicator module={m} />}`.

### 3. Soft Act→Report gate + override

- **`stageGateOverrideStore.ts`** — widened the union to `export type StageGate =
  'observe-to-plan' | 'plan-to-act' | 'act-to-report';`. The generic per-project
  `byProject: Record<string, Partial<Record<StageGate, boolean>>>` already supports
  this — **no other change, no persist version bump.**
- **New `apps/web/src/v3/pages/ReportStageGateOverlay.tsx`** — mirrors
  `v3/act/StageGateOverlay.tsx` but uses `useActProgress(projectId)` + override gate
  `'act-to-report'`; returns null if `requiredComplete || overridden || !projectId`;
  else a scrim card listing the remaining required label(s) with **Go to Act**
  (`/v3/project/$projectId/act`) + **Continue anyway** (sets the override). Reuses the
  existing `../plan/StageGateOverlay.module.css`.
- **`ReportPage.tsx`** — wrapped the `StageShell` `canvas` content in a
  `position:relative` host (the `css.page` div had no positioned host for the scrim) and
  mounted `<ReportStageGateOverlay projectId={params.projectId ?? null} />` inside it.

### 4. ActReadyCue

- **New `apps/web/src/v3/act/components/ActReadyCue.tsx` + `.module.css`** mirroring
  `PlanReadyCue`: "Act essentials · N%", the remaining required objective list, and a
  "Ready to Report →" button enabled exactly when `requiredComplete`, navigating to
  `/v3/project/$projectId/report`. Mounted in `ActLayout.tsx`'s right rail via a
  fragment beside `ActChecklistAside`.

## Rationale

- **Mirror Plan one-for-one** — the pattern is proven down two stages; copying its shape
  keeps the spine maintainable in parallel and the predicates auditable.
- **Data-derived only** — completion is a pure function of persisted store data, so
  segments, gate, and cue all stay in sync the moment the last required objective is
  satisfied; no manual How-checks to drift out of date.
- **Tracker-only required set** — `WorkItem.status === 'done'` is the one execution
  signal common to every Act module, so it is the meaningful gate; the other modules
  raise % without gating.
- **Reuse the generic override store** — `byProject` already keys arbitrary gate names,
  so widening the union is a 1-line, migration-free change.
- **Soft, never blocking** — routes stay open; the gate is guidance with a persisted
  **Continue anyway**, matching Observe and Plan.

## Alternatives Considered

- **Required objectives on every Act module** — rejected by the operator: Tracker
  (`work item done`) is the universal execution signal; the rest raise % without gating.
- **A bespoke Act bottom bar / new indicator component** — unnecessary: Act already uses
  the shared `ModuleBar`, so the Plan round's `ModuleProgressIndicator` render-prop drops
  straight in.
- **Mounting the gate on a later spine stage (as Plan did on Act)** — impossible: Act is
  terminal and Report is a sibling route, not a `LEVELS` entry, so the overlay mounts on
  the Report page itself with the new `'act-to-report'` key.
- **Manual How-check-driven progress** — rejected: kept guidance-only; segments + gate +
  cue are data-derived, as in Observe and Plan.

## Consequences

- New folder `apps/web/src/v3/act/progress/` (engine + hook + tests) mirrors
  `v3/plan/progress/` and `v3/observe/progress/` — the spine is now uniform end-to-end.
- The Act→Report gate establishes the pattern for guiding into a **sibling route** (not
  a spine stage), reusable for any future terminal-stage → artifact-page handoff.
- `ModuleProgressIndicator` (built in the Plan round) is now reused by a second
  shared-`ModuleBar` stage with zero new code — validating that seam.
- **Store-shape caution recorded:** `hazardsStore` is nested
  `byProject: { projectId, hazards[] }[]` (find by `projectId`, count `.hazards`); every
  other Act store is a flat `.projectId` array (`workItemStore.items`,
  `phaseStore.phases`, `pilotPlotStore.pilots`, `maintenanceLogStore.events`,
  `livestockMoveLogStore.events`, `harvestLogStore.entries`, `swotStore.swot`,
  `networkStore.contacts`, `communityEventStore.events`, `appropriateTechStore.items`).
- Foreign WIP from concurrent sessions was left unstaged per the no-deletion /
  rebased-branch discipline; only the 11 own files were committed by name.

## Verification

- `corepack pnpm --filter @ogden/web run typecheck` (8 GB heap script — the plain
  `lint` `tsc` OOMs at default heap) — own files type-clean; only the **3 known
  pre-existing unrelated errors** remain (`StepBoundary.tsx(365,7)`,
  `HostUnionContextMenu.test.tsx(58,36)`, `HostUnionDrilldownCard.test.tsx(25,36)`),
  none in the 11 files of this change.
- Vitest: **26/26** — new Act `objectives.test.ts` **9/9** + existing Plan **9/9** +
  Observe **8/8** green.
- Live preview deferred behind the documented auth + seeded-project + headless-WebGL
  wall: the web tab bounced to the auth-gated render and the console showed
  `role: viewer` / `You do not have access to this project` (the `:3001` API rejects the
  dummy token), so owner-role screenshots were **blocked, not faked**, per CLAUDE.md.
  The deferred screenshot debt (Plan segments lighting + Plan→Act diamond + Act→Report
  flow) carries forward to an owner-seeded environment.
- Committed `bbaa016a` ("feat(atlas): data-derived Act progress + soft Act→Report gate",
  11 files, +762/−14) on `feat/atlas-permaculture` (own files staged by name; foreign
  WIP left unstaged). Pushed `94c26dee..bbaa016a` after fetch + divergence check.

## Connections

- [[olos]] — the Atlas/OLOS app this ships in (Act + Report stages)
- [[2026-05-25-atlas-plan-to-act-data-derived-gate]] — the Plan-stage round this Act
  equivalent mirrors (and whose `ModuleProgressIndicator` it reuses)
- [[2026-05-24-atlas-observe-command-centre]] — the Observe-stage progression spine that
  established the data-derived pattern
- [[2026-04-26-zustand-selector-stability]] — the raw-subscription rule `useActProgress`
  follows
- [[maqasid-al-shariah]] — land stewardship under the Environment maqsid
