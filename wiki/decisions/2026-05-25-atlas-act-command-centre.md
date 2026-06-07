---
title: "Atlas Act — Act Command Centre (mirror of Observe/Plan, weather tile kept)"
type: decision
date: 2026-05-25
status: accepted
tags: [atlas, act, observe, plan, command-centre, ui, dashboard-shell, routing, work-items, weather]
superseded_by: null
---

# Atlas Act — Act Command Centre (mirror of Observe/Plan, weather tile kept)

## Context

Observe and Plan already had full-bleed **Command Centres**
([[2026-05-24-atlas-observe-command-centre]], [[2026-05-25-atlas-plan-command-centre]]) — an
aggregate "run the stage" surface composed as a fixed dashboard shell: a module-tab strip, a
three-column body (sidebar | map | right rail), and a bottom-tray carousel — all driven by one
`activeModule` lens. Act (execution), by contrast, had only its per-module pages plus a compass;
the Act compass centre and the header "Act" segment did **not** open into any command centre. The
steward asked to "develop a command centre for Act but make sure to keep the weather tile" so the
whole Act stage can be run at once — every panel filtered by a chosen Act module, every open work
item one click from where it's actioned — **without losing the weather tile** that today lives in
the Act operations rail.

**Three product choices locked with the steward (AskUserQuestion):** (1) **Bottom tray = open work
items** — the todo + in-progress `WorkItem`s (the tracker spine) filtered by the active module,
each tile launching into `/act/$module`. (2) **Right rail = reuse the full Act ops stack** — mount
the existing `WeatherStrip` (**the weather tile to keep**) + `TodaysPriorities` + `AlertsPanel` +
`UpcomingEvents`, so the operational feel **and** the weather tile are preserved by reuse, not
rebuild. (3) **Entry = mirror Observe/Plan exactly** — the Act compass centre unlocks into the
command centre **and** the header "Act" segment routes to `act/command-centre` (at 100%; otherwise
`act/compass`).

## Decision

Build a new `apps/web/src/v3/act/command/` folder that mirrors `v3/plan/command/` one-for-one, and
**reuse the Observe shell stylesheet directly** (`import css from
'../../command/ObserveCommandCentrePage.module.css'`) so the layout stays pixel-identical and only
the *content* is Act-specific. This is a purely **read-only composition surface** over existing data
+ a route + two small entry-point edits + one pure mapping helper — no new store, schema, or model.

Shipped as a single commit on `feat/atlas-permaculture` (committed immediately on verify, per the
externally-rebased-branch rule), commit **`dbc52020`** (12 files, +828).

### New components (`apps/web/src/v3/act/command/`)

- **`ActCommandCentrePage.tsx`** — the grid shell, modelled on `PlanCommandCentrePage`. State:
  `activeModule: ActModule | null`, `showData`/`showBoundary`, `sidebarCollapsed`, `selectedId`.
  Reads `useActCompassData(projectId)` + `useWorkItemStore((s) => s.items)` (raw subscription, derived
  in `useMemo` per the selector-stability rule). `filteredViews = activeModule ? views.filter(v =>
  v.objective.id === activeModule) : views`; `openItems` = `projectId` + `todo|in-progress`; **tray**
  = `openItems` filtered by `actWorkItemModule` against the lens; `ready = views.length > 0 &&
  views.every(v => v.progress.pct === 100)`. Nav helpers: back→`act/compass`, launch→`act/$module`
  (the item's module from `actWorkItemModule`), schedule/tracker→`act/$module`, Report→`report`.
- **`ActModuleTabs.tsx`** — "All Modules" lens + one tab per compass view, each with its
  `objective.accent` dot, `objective.icon`, short `ACT_MODULE_LABEL`, and `progress.pct`; a "Compass"
  back control.
- **`ActMapSidebar.tsx`** — module-filter chip, **two** layer toggles (Act execution + site boundary
  — Act has no design layer, so two not three), the shared base-map switcher
  (`BASEMAP_OPTIONS`/`useBasemapStore`), collapse control, ready status line, and a forward CTA
  **"Go to Report →"**.
- **`ActSiteMapPanel.tsx`** — `DiagnoseMap` render-prop hosting `ActDataLayers` (read-only execution
  overlays) scoped to `activeModule` (no `DesignElementLayers`); "Filtered to" chip + `ActMapLegend`.
  **Work items aren't all spatial**, so the map carries Act execution geometry focused by the lens —
  not work-item pins (same rationale as Plan's decisions).
- **`ActMapLegend.tsx`** — Act module/execution-layer legend (mirror of `PlanMapLegend`).
- **`OpenWorkItemsPanel.tsx`** — the bottom-tray carousel; each open work-item tile is itself the
  launch button (`role="button"` + Enter/Space → `onLaunch(item)` → `act/$module`), showing the
  module dot/label (via `actWorkItemModule`), a status badge (todo/in-progress; `blocked` surfaced
  distinctly), the title, and schedule/date meta. First-class **empty state** with a "Go to Tracker
  →" CTA.

### New pure helper

- **`actWorkItemModule.ts`** — `actWorkItemModule(item: WorkItem): ActModule` maps a work item to one
  of the 8 Act modules from its `source` provenance (mirrors `ActDataLayers`' `SOURCEKIND_MODULE`
  idea): `maintenance→maintain`; `scheduled-livestock-move`/`rotation-sequence`→`livestock`;
  `nursery-batch`/`cover-crop`/`tree-planting`/`agroforestry`/`habitat-feature`→`build`; everything
  else (`goal-compass`/`field-task`/`manual`)→`tracker` (the cross-module execution spine).
  `WorkItem` has no `affectedModule` field (unlike `PlanDecision`), so the module is **derived** from
  provenance. Pure + unit-tested (`actWorkItemModule.test.ts`, 5/5). Used by the tray filter, the
  tile dot, and `launchItem`.

### Weather tile kept by reuse

The right rail mounts the four existing Act ops panels inside the ops-aside surface (`import aside
from '../ops/ActOpsAside.module.css'`, wrapped in `<div className={aside.aside}>`) — the panels
self-wrap in `.panel` and depend on that parent surface, so spacing matches the live `/act/$module`
ops dashboard exactly: `WeatherStrip` (**the weather tile to keep**, projectId-scoped, always on) +
`TodaysPriorities` + `AlertsPanel` (both already treat `activeModule === null` as "all modules", so
the lens drives them for free) + `UpcomingEvents`. **No new weather/forecast code** — the existing
`WeatherStrip`/`WeatherForecastCard`/`useForecast` are reused untouched, as is the per-module
`/act/$module` view and its weather tile.

### Entry points (mirror Observe/Plan)

- **`routes/index.tsx`** — `v3ActCommandCentreRoute` at `act/command-centre`, registered **before**
  `v3ActModuleRoute`'s `$module` (static path resolves ahead of the param), exactly as
  `v3PlanCommandCentreRoute` precedes its module route.
- **`v3/act/compass/ActStageCompassPage.tsx`** — replaced the "no Command Centre yet — deferred"
  stub: `ready = data.views.length > 0` (mirrors Observe/Plan's "unlock for now" gate),
  `goCommandCentre` nav, `commandCentre={{ ready, onEnter: goCommandCentre }}` passed to
  `StageCompassView`.
- **`v3/HeaderStageSpine.tsx`** — Act segment target now mirrors Observe/Plan:
  `actData.stage.pct >= 100 ? 'act/command-centre' : 'act/compass'`, keeping the active-stage no-op
  guard. (Changes the incomplete-Act header destination from `/act` to `/act/compass`.)

### Key choices

- **Reuse the Observe shell CSS, don't fork it.** Its `shell`/`body`/`rail`/`bottomTray`/tab/`objCard`
  classes are domain-neutral; importing them guarantees layout parity and avoids a forked stylesheet
  drifting from Observe/Plan. No companion Act stylesheet was needed.
- **Reuse the ops stack, don't rebuild the rail.** The steward's "keep the weather tile" is honoured
  by mounting the real `ActOpsAside` panels — the weather tile is the *same* component, not a copy.
- **Tray = open work items, filtered by `actWorkItemModule`.** The tray surfaces the work-to-do; the
  module is derived from `source` because `WorkItem` carries no module field.
- **Map shows Act execution geometry, not work-item pins.** Work items aren't all spatial; the map
  focuses the `ActDataLayers` execution overlays by the active module instead.
- **No `V3ProjectLayout` change.** The full-bleed gate already keys on the `command-centre` path
  segment, so `act/command-centre` renders full-bleed automatically.

## Rationale

Mirroring Observe/Plan one-for-one and reusing both the shell CSS and the Act ops panels keeps the
new surface minimal, consistent, and free of layout drift, while honouring the steward's explicit
"keep the weather tile" by reuse rather than rebuild. It composes entirely from data that already
exists (`useActCompassData`, `useWorkItemStore`, the Act map layers, the four ops panels), giving the
steward a single place to run the Act stage and a direct path into `/act/$module` for each open work
item — without touching any store, schema, or the Observe/Plan code.

## Consequences

- The Act stage now has a full-bleed command centre reachable two ways (compass centre unlock +
  header "Act" segment at 100%, else `act/compass`), with every panel filterable by an Act-module
  lens, each open work item one click from where it's actioned, and **the weather tile preserved**.
- **Read-only surface.** No work-item authoring/editing/dismiss in the tray (launch-only); no change
  to the work-item/ops stores, the per-module `/act/$module` view, or any schema.
- **Verification:** typecheck clean — **zero new errors** in any new `v3/act/command/*` file or the
  three edited files. The foreign-WIP baseline **shifted out-of-band** this session (the branch was
  rebased externally): it is now 4 errors in `src/pages/NewProjectPage.tsx` (lines 103/120) +
  `src/features/project/wizard/types.ts` (line 1) — **none are in this work**. `HeaderStageSpine.test.tsx`
  12/12 (added Act→`act/compass` while incomplete + Act→`act/command-centre` at `pct===100`);
  `actWorkItemModule.test.ts` 5/5 — **17 tests green**. **Live preview not run** — the preview server
  is behind the auth wall and `preview_screenshot` reliably times out on the MapLibre WebGL canvas
  (per [[2026-05-19-atlas-preview-screenshot-verification-standard]] the screenshot wall is disclosed,
  not faked). Committed `dbc52020` on `feat/atlas-permaculture`, staged by explicit path — each edited
  file's `git diff` was confirmed to carry only this change before staging, so no foreign WIP was
  bundled.

## Connections

- [[2026-05-24-atlas-observe-command-centre]] — the original Observe template (shell, interaction model, CSS)
- [[2026-05-25-atlas-plan-command-centre]] — the immediate Plan template this mirrors one-for-one
- [[2026-05-25-atlas-act-to-report-data-derived-gate]] — the adjacent Act-stage progress/gate work; the "Go to Report →" CTA lands on its gated Report page
- [[2026-05-19-atlas-preview-screenshot-verification-standard]] — the preview/verification standard governing the unrun-preview disclosure
- [[olos]] — the project this extends (Act stage; aggregate run-the-stage surface)
