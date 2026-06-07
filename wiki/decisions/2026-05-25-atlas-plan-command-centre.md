---
title: "Atlas Plan — Plan Command Centre (mirror of the Observe Command Centre)"
type: decision
date: 2026-05-25
status: accepted
tags: [atlas, plan, observe, command-centre, ui, dashboard-shell, routing]
superseded_by: null
---

# Atlas Plan — Plan Command Centre (mirror of the Observe Command Centre)

## Context

Observe already had a full-bleed **Command Centre** ([[2026-05-24-atlas-observe-command-centre]])
— an aggregate "run the stage" surface composed as a fixed dashboard shell: a module-tab strip,
a three-column body (sidebar | map | right rail), and a bottom-tray carousel — all driven by one
`activeModule` lens. Plan, by contrast, had only its per-module pages plus a compass; the Plan
compass centre and the header "Plan" segment did **not** open into any command centre (Observe's
do). The steward asked to "develop a command centre for Plan based on the Observe Command Centre
layout" so the whole Plan stage can be surveyed at once, every panel filtered by a chosen Plan
module, and the decisions needing work reached in one click.

**Three product choices locked with the steward (AskUserQuestion):** (1) **Bottom tray = hybrid
(modules + decisions)** — tabs are the 15 Plan modules with compass progress; the tray lists the
**open (draft) Plan decisions** filtered by the active module. (2) **Entry = mirror Observe
exactly** — the Plan compass centre unlocks into the command centre **and** the header "Plan"
segment routes to `plan/command-centre` (at 100%; otherwise `plan/compass`). (3) **Right rail =
Plan-analog trio** — decision/activity **timeline** · per-module **readiness** (verified %) ·
**gaps** (modules at 0% or unreviewed impact flags).

## Decision

Build a new `apps/web/src/v3/plan/command/` folder that mirrors `v3/command/` one-for-one, and
**reuse the Observe shell stylesheet directly** (`import css from
'../../command/ObserveCommandCentrePage.module.css'`) so the layouts stay pixel-identical and only
the *content* is Plan-specific. This is a purely **read-only composition surface** over existing
data + a route + two small entry-point edits — no new store, schema, or model.

Shipped as a single commit on `feat/atlas-permaculture` (committed immediately on verify, per the
externally-rebased-branch rule), commit **`f4e8fcca`** (13 files, +979):

### New components (`apps/web/src/v3/plan/command/`)

- **`PlanCommandCentrePage.tsx`** — the grid shell, modelled on `ObserveCommandCentrePage`. State:
  `activeModule: PlanModule | null`, layer toggles (`showData`/`showDesign`/`showBoundary`),
  `sidebarCollapsed`, `selectedId`. Reads `usePlanCompassData(projectId)` + `usePlanDecisions`.
  `filteredViews = activeModule ? views.filter(v => v.objective.id === activeModule) : views`;
  `moduleDecisions` filtered by `affectedModule`; **tray = drafts only** (the work-to-do). Nav
  helpers: back→`plan/compass`, launch→`plan/workspace/$decisionId`, record→`plan/decisions`,
  Act→`act`.
- **`PlanModuleTabs.tsx`** — "All Modules" lens + one tab per compass view, each with its
  `objective.accent` dot, `objective.icon`, short `PLAN_MODULE_LABEL`, and `progress.pct`; a
  "Compass" back control. (Uses the short label because the compass `objective.label` is the long
  form — keeps 15 tabs compact.)
- **`PlanMapSidebar.tsx`** — module-filter chip, real layer toggles (Plan data / design elements /
  site boundary), the shared base-map switcher (`BASEMAP_OPTIONS`/`useBasemapStore`), collapse
  control, and a forward CTA into Act.
- **`PlanSiteMapPanel.tsx`** — `DiagnoseMap` render-prop hosting `PlanDataLayers` (read-only,
  `editable={false}`) + `DesignElementLayers` (`view="vision"`), both scoped to `activeModule`;
  "Filtered to" chip + `PlanMapLegend`. **Decisions aren't spatial**, so the map carries Plan
  geometry focused by the lens — not decision pins.
- **`PlanMapLegend.tsx`** — Plan layer legend (mirror of `ObserveMapLegend`).
- **`OpenPlanDecisionsPanel.tsx`** — the bottom-tray carousel; each draft tile is itself the launch
  button (`role="button"` + Enter/Space → `plan/workspace/$decisionId`), showing the affected-module
  dot/label, status badge, headline, rationale, verb tag, and source count. First-class **empty
  state** with a "Record a decision →" CTA (decisions are often sparse).
- **`PlanDecisionTimelinePanel.tsx`** — rail #1; one event per decision (icon by status), grouped
  into Today/Yesterday/date buckets, newest-first. Informational (non-clickable) for visual parity.
- **`PlanModuleReadinessPanel.tsx`** — rail #2; per-module verified `%` rows + a "Stage verified"
  total. The Plan analog of Observe's evidence-library panel.
- **`PlanGapsPanel.tsx`** — rail #3; lists modules at 0% (from compass views) **and** unreviewed
  Observe→Plan impact flags (`usePlanImpactFlags`, `review.status === 'open'`).

### Entry points (mirror Observe)

- **`routes/index.tsx`** — `v3PlanCommandCentreRoute` at `plan/command-centre`, registered **before**
  `plan/$module` (static path resolves ahead of the `$module` param), exactly as
  `v3ObserveCommandCentreRoute` precedes its module route.
- **`v3/plan/compass/PlanStageCompassPage.tsx`** — replaced the "no Command Centre yet — deferred"
  stub: `ready = data.views.length > 0` (mirrors Observe's current "unlock for now" gate),
  `goCommandCentre` nav, `commandCentre={{ ready, onEnter: goCommandCentre }}` passed to
  `StageCompassView`.
- **`v3/HeaderStageSpine.tsx`** — Plan segment target now mirrors Observe:
  `planData.stage.pct >= 100 ? 'plan/command-centre' : 'plan/compass'`, keeping the active-stage
  no-op guard. (Changes the incomplete-Plan header destination from `/plan` to `/plan/compass`.)

### Key choices

- **Reuse the Observe shell CSS, don't fork it.** Its `shell`/`body`/`rail`/`bottomTray`/tab/`objCard`
  classes are domain-neutral; importing them guarantees layout parity and avoids a forked stylesheet
  drifting from Observe. No companion Plan stylesheet was needed.
- **Tray = drafts only, filtered by `affectedModule`.** The tray surfaces the work-to-do; the rail
  timeline shows all decision activity. `affectedModule` is the existing steward-set field on
  `PlanDecision` (not auto-mapped from `ObserveModule`).
- **Map shows Plan geometry, not decision pins.** Decisions have no coordinates; the map focuses the
  Plan data + Vision design layers by the active module instead.
- **No `V3ProjectLayout` change.** The full-bleed gate already keys on the `command-centre` path
  segment, so `plan/command-centre` renders full-bleed automatically.

## Rationale

Mirroring Observe one-for-one and reusing its shell CSS keeps the new surface minimal, consistent,
and free of layout drift, while composing entirely from data that already exists
(`usePlanCompassData`, `usePlanDecisions`, `usePlanImpactFlags`, the Plan map layers). It gives the
steward a single place to run the Plan stage and a direct path into the Planning Workspace for each
draft decision, without touching any store, schema, or the Observe code.

## Consequences

- The Plan stage now has a full-bleed command centre reachable two ways (compass centre unlock +
  header "Plan" segment at 100%, else `plan/compass`), with every panel filterable by a Plan-module
  lens and each draft decision one click from its workspace.
- **Read-only surface.** No decision-authoring or dismiss/delete actions in the tray (record-intent
  only); no change to the Planning Workspace, the decision/impact stores, or any schema.
- **Verification:** typecheck clean — no new errors in any new `v3/plan/command/*` file or the three
  edited files; the pre-existing foreign-WIP baseline (`planImpactFlag.test.ts`,
  `HostUnion{ContextMenu,DrilldownCard}.test.tsx`) is unchanged. `HeaderStageSpine.test.tsx` 10/10
  (updated the Plan→`plan/compass` expectation; added a Plan→`plan/command-centre` at `pct===100`
  case). **Live preview not run** — the preview server restarted and cleared the auth token; reaching
  the page now requires a password login, which Claude does not perform on the steward's behalf
  (per [[2026-05-19-atlas-preview-screenshot-verification-standard]] the screenshot wall is disclosed,
  not faked). Committed `f4e8fcca` on `feat/atlas-permaculture`.
- **Snapshot caveat:** per the steward's explicit choice, the shared `routes/index.tsx` was committed
  whole, so it also carries foreign uncommitted Phase 5a `PlanConflicts` hunks (import + route) whose
  `conflicts/` folder was **not** in this commit — that import dangles in the snapshot (no pre-commit
  hook, so it didn't block; the working tree is intact and the foreign author's folder lands later).

## Connections

- [[2026-05-24-atlas-observe-command-centre]] — the Observe template this mirrors (shell, interaction model, CSS)
- [[2026-05-25-atlas-plan-decision-log]] — supplies the `PlanDecision` records the tray + timeline read
- [[2026-05-25-atlas-plan-impact-flags]] — supplies the unreviewed impact flags the Gaps panel surfaces
- [[2026-05-25-atlas-plan-to-act-data-derived-gate]] — the adjacent Plan-stage progress/gate work the readiness panel reflects
- [[2026-05-19-atlas-preview-screenshot-verification-standard]] — the preview/verification standard governing the unrun-preview disclosure
- [[olos]] — the project this extends (Plan stage; aggregate run-the-stage surface)
