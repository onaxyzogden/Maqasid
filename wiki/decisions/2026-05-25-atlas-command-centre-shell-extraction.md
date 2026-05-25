---
title: "Atlas — Extract a shared Command Centre shell (retire by-hand CSS-import mirroring)"
type: decision
date: 2026-05-25
status: accepted
tags: [atlas, observe, plan, act, command-centre, ui, dashboard-shell, refactor, css-modules, dry]
superseded_by: null
---

# Atlas — Extract a shared Command Centre shell (retire by-hand CSS-import mirroring)

## Context

Three stage Command Centres existed — Observe, Plan, Act
([[2026-05-24-atlas-observe-command-centre]], [[2026-05-25-atlas-plan-command-centre]],
[[2026-05-25-atlas-act-command-centre]]) — each built by **hand-mirroring** the one before it. Every
page rendered the **byte-identical** full-bleed grid scaffold (`<div className={css.shell}>` →
module-tabs / `<div className={css.body} data-sidebar>` with sidebar｜map｜`<div className={css.rail}>`
/ `<div className={css.bottomTray}>`), and every Plan/Act component reached across folders with a
brittle `import css from '../../command/ObserveCommandCentrePage.module.css'` — a single ~1,246-line
**Observe-named** stylesheet imported sideways by **25 files** spanning all three stages. The
scaffold, the module-tab strip, the map legend, and the map sidebar were near-duplicated three times;
only the domain wiring (module taxonomy, labels, layer toggles, status word, brand) differed. A
fourth stage would have meant a fourth hand-copy.

This is the same precedent `StageCompassView.tsx` already set for the compass — a pure presentational
shell fed by thin per-stage wrappers. The refactor extracts the shared Command Centre structure into
stage-agnostic primitives so a future stage **composes** from shared parts rather than copying.

**Three decisions locked with the steward (AskUserQuestion):**
1. **Maximal scope** — unify the shell **and** the module-tabs **and** the map-legend **and** the
   map-sidebar. (Site-map panels and bottom-tray panels stay per-stage — genuinely divergent in data
   and rendering.)
2. **Keep thin per-stage wrappers (no deletion)** — every existing component keeps its file, name,
   and prop interface; its body just delegates to the shared primitive. Honours the no-deletion rule
   ([[feedback_no_deletion]]) and keeps per-stage call sites stable.
3. **Split the CSS shell-vs-domain classes** — move the genuinely shared (shell/layout) classes into
   a new neutral sheet; leave Observe-only classes in a trimmed Observe sheet; repoint imports so
   Plan/Act no longer import the Observe-named file.

This is a **pure refactor**: no route, data, behaviour, or visual change.

## Decision

Create `apps/web/src/v3/command/shell/` holding four stage-agnostic primitives + one new neutral
stylesheet. Each existing per-stage component becomes a thin wrapper injecting its domain config; the
three pages keep all state/hooks/filters/nav helpers and only swap their `return` JSX to the shared
shell. Sliced into four commits, each compiling/verifying/committing on its own.

- **`CommandCentreShell.tsx`** — the grid scaffold as `ReactNode` slot props
  (`tabs｜sidebar｜siteMap｜rail｜tray` + `sidebarCollapsed`), rendering the exact existing structure.
  Act passes its `aside.aside`-wrapped ops stack as the `rail` slot unchanged.
- **`CommandCentreModuleTabs.tsx`** — "All Modules" lens + one tab per compass view (accent dot,
  icon, label, `progress.pct`) + "Compass" back control; `moduleLabel?` map + `statusWord`
  ('verified' for Observe/Plan vs 'done' for Act).
- **`CommandCentreMapLegend.tsx`** — generic legend rows from injected dot+label maps.
- **`CommandCentreMapSidebar.tsx`** — shared sidebar shell; a `layers[]` array absorbs the
  2-vs-3-vs-2 toggle difference (Observe markers+boundary; Plan data+design+boundary; Act
  data+boundary); hosts the shared `BASEMAP_OPTIONS`/`useBasemapStore` switcher internally.
- **`CommandCentreShell.module.css`** — the new neutral shared sheet.

**The CSS split is usage-audit-driven, not name-guessed.** Every class in
`ObserveCommandCentrePage.module.css` was classified by **actual usage** across the three command
folders (17 importers; static `css.X` + dynamic `css[`prefix_…`]`). This corrected the plan's
name-guessed keep-list: several Observe-*named* classes (`objCard*`, `carousel`, `statList*`,
`gapList*`, `timelineList*`) are in fact **shared** by all three trays/rails and moved to the neutral
sheet. Genuinely Observe-only classes (`mod*` dashboards, `status_*`/`origin_*`/`prio_*` need badges,
`raiseForm*`, `objProgress*`, `objCardActions`/`dismissBtn`/`iconBtn`/`cardDismiss`/`confirmPrompt`/
`removeConfirmBtn`) stayed in a trimmed Observe sheet (~1,035 lines of dead/shared classes removed).

**Mixed consumer resolved by two-import split, not duplication.** `OpenObservationNeedsPanel` needs
both the shared scaffold and the Observe-only need affordances, so it imports both sheets
(`css` = Observe, `shell` = neutral) — consistent with how Plan/Act tray panels already consume the
shared sheet.

## Consequences

- A fourth stage composes the Command Centre from shared primitives + a thin wrapper; no more
  byte-for-byte hand-copy.
- No file imports the Observe-named sheet *sideways* any more — Plan/Act/shared panels import the
  neutral `CommandCentreShell.module.css`; only Observe's own panels (and the mixed
  `OpenObservationNeedsPanel`) touch the trimmed Observe sheet.
- **CSS modules are not typechecked**, so correctness of the split was established by an exhaustive
  token-resolution audit: every `css.X`/`shell.X` reference across all importers resolves to exactly
  one definition in the correct sheet (zero missing). `prio_low` was confirmed absent in the
  *original* too (only `prio_high`/`prio_medium`); the `?? ''` fallback preserves prior behaviour.

## Verification

- **Typecheck** (`tsc --noEmit` from `apps/web`): **zero errors** across all four slices.
- **Tests**: `HeaderStageSpine.test.tsx` (12) + `actWorkItemModule.test.ts` (5) = **17/17 green**.
- **Token audit**: 83 neutral classes + 26 Observe classes; all 20 `shell.X` + 83 `css.X` neutral
  refs + 17 static + 3 dynamic-prefix Observe refs resolve — zero missing in either direction.
- **Live preview not run** — `preview_screenshot` reliably times out on the MapLibre WebGL canvas and
  the preview sits behind the auth wall (disclosed, not faked). For a pure CSS-module split this is
  validated by import resolution + the token audit rather than a screenshot.

## Git note (external-rebase interaction)

`feat/atlas-permaculture` is rebased out-of-band ([[project_branch_rebase]]). During Slice 4 the new
neutral sheet was discovered already committed at its path by a **foreign** commit
`53a0e7a0 fix(web): stop Command Centre carousel clipping card bottoms` — an external rebase had
incorporated a byte-identical neutral sheet, so `git add` found nothing to stage for it. The
committed content is the complete 825-line sheet with every class the importers need; the working
tree matched HEAD. Slice 4's other 17 files committed as `0a867f35`.

## Slices / commits (on `feat/atlas-permaculture`)

1. `17cdf034` — extract shared `CommandCentreShell` grid scaffold + rewire the 3 pages' `return`.
2. `bcf34536` — unify Command Centre module-tabs + map-legend (+ 6 wrappers).
3. `049cc83d` — unify Command Centre map sidebar (+ 3 wrappers).
4. `0a867f35` — split Command Centre CSS into a shared neutral sheet + repoint all imports (neutral
   sheet itself landed via foreign `53a0e7a0`).

Builds on [[2026-05-24-atlas-observe-command-centre]], [[2026-05-25-atlas-plan-command-centre]],
[[2026-05-25-atlas-act-command-centre]]; none superseded (the per-stage wrappers and ADRs stay
accepted — this factors out their shared substrate).
