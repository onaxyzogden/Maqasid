---
title: "MILOS — LevelNavigator pillar segments become stacked rows on mobile"
type: decision
date: 2026-07-01
status: accepted
tags: [ui, mobile, responsive, css, level-navigator]
superseded_by: null
---

# MILOS — LevelNavigator pillar segments become stacked rows on mobile

> [!note] Amended 2026-07-02
> The mobile row's **internal geometry** described below (horizontal `[label | bar]` row with a
> 92 px / 76 px label column) was restyled the next day into a two-row DashboardTaskCard-style
> card (numbered accent badge + bold title over a full-width 44 px bar) — see
> [[2026-07-02-milos-levelnav-dtc-card-rows]]. Everything else here remains in force: the global
> doubled-class anchor, the app-wide scope, the 767 px / 479 px breakpoints, the 44 px tap-target
> requirement, and the CSS-only / no-fork approach.

## Context

The `LevelNavigator` pillar segment strip (the FAITH / HEALTH / INTELLECT / FAMILY /
WEALTH / ENVIRONMENT / COMMUNITY row under "Core Higher Objectives") was unusable on
phones. Measured live at a 375px viewport on `/app`:

- 7 pillar columns squeezed into ~239px → **27px per column**.
- Each task subsegment collapsed to a **1px-wide tap target** (vs the ~44px WCAG touch
  minimum) — measured `.fln__subseg` at 1px × 14px.
- Every pillar label truncated to a single ambiguous letter — "F…" rendered for *both*
  Faith and Family.

`LevelNavigator` is an **external GitHub dependency** — `@ogden/ui-components`
(`github:onaxyzogden/ogden-ui-components#v0.1.0`, [package.json:22](package.json)), adopted
per [[2026-04-30-ogden-ui-components-github-direct]] — so its source is not editable
in-repo. The package's own `@media (max-width: 700px)` only rearranges the *outer* level
panels; it never touches the inner segment row. That was the gap.

The same horizontal strip — and the same cramping — appears on **three further surfaces that
do not render under `.flo`**: the pillar-submodule pages
([PillarLevelPage](src/pages/shared/PillarLevelPage.jsx)), the prayer page
([PrayerLevelPage](src/pages/shared/PrayerLevelPage.jsx), via `PrayerLevelNavigator`), and
the legacy BBOS pipeline-stage navigator in
[ProjectBoard](src/components/work/ProjectBoard.jsx). Any fix scoped to `.flo` would leave
those broken.

## Decision

Restyle the segment row into **full-width vertical stacked rows** at ≤767px, via pure CSS
overrides in a MILOS-owned **global** stylesheet
[src/styles/level-navigator-responsive.css](src/styles/level-navigator-responsive.css),
imported once at the app entry ([src/main.jsx](src/main.jsx)) immediately **after** the
package's own `@ogden/ui-components/style.css`. No package fork, no JSX/DOM change. Each
segment becomes one row: `[label | progress bar]`, with the bar grown to 44px tall so
subsegs inherit tappable height and take `rowWidth / N` width instead of 1px.

Scope: **every LevelNavigator strip app-wide** — not just the `.flo` surfaces (dashboard +
7 pillar-overview pages), but also the pillar-submodule pages (`PillarLevelPage`), the
prayer page (`PrayerLevelPage` via `PrayerLevelNavigator`), and the legacy BBOS
pipeline-stage navigator (`ProjectBoard`). The rule targets the package's own class names
through a **doubled-class anchor** `.fln__segments.fln__segments` (specificity `0,2,0`;
descendants `0,3,0`), so it reaches every instance regardless of which MILOS wrapper
rendered it — including instances that render the package component directly and bypass the
shared `LevelNavigator.jsx` wrapper. A single `@media (max-width: 767px)` block plus a
`@media (max-width: 479px)` narrow-phone tweak that trims the label column so bars keep
useful width. The earlier `.flo`-scoped block in `LevelOverviewPage.css` was **removed as
redundant** — the global rule is now the single source of truth.

## Rationale

- **CSS-only override is the established pattern** — MILOS already restyles the package via
  `.flo`-scoped selectors (e.g. `.flo .fln__center-title`); specificity `0,2,0` beats the
  package's single-class `0,1,0` rules. Follows the precedent set by
  [[2026-06-19-bbos-pipeline-dashboard-light-mode]] (MILOS-side override of a themed
  component, no source change).
- **Global doubled-class anchor over per-wrapper `.flo` scoping** — the strip is rendered by
  several components, and some (`PrayerLevelNavigator`, per-pillar `*LevelNavigator.jsx`)
  render the package component directly rather than through the shared `LevelNavigator.jsx`
  wrapper. A wrapper-import or `.flo`-scoped rule would miss them. Anchoring on the package's
  own `.fln__segments` class (doubled for `0,2,0` specificity, beating the package's `0,1,0`
  base regardless of stylesheet order) reaches every instance and any future one, with no
  per-site wiring. Imported after the package CSS as belt-and-suspenders for equal-specificity
  ties.
- **767px breakpoint** is the project's dominant threshold (37 existing uses, matches
  `useMobile`'s 768px and the tokens in `src/styles/tokens.css`), so the change is
  consistent with the rest of the responsive system.
- **Stacked rows over a horizontal scroller or a dropdown** — every pillar stays visible at
  once (no hidden state, no horizontal scroll discovery problem), labels are fully legible,
  and the existing subseg tap/colour behaviour (`taskColorFn`, `.fln__segment-col--current`
  tint) is preserved untouched.

## Alternatives Considered

- **Horizontal scroll strip** — keeps the row shape but hides pillars off-screen and buries
  the subseg targets behind a scroll gesture; rejected for discoverability.
- **Collapse to a `<select>` / dropdown of pillars** — loses the at-a-glance progress
  comparison that is the whole point of the strip; rejected.
- **Fork `@ogden/ui-components` to add the mobile layout** — heavier, couples MILOS to a
  package release cycle for a MILOS-only presentation concern; rejected in favour of the
  existing override pattern.
- **Per-wrapper `.flo` scoping (the original fix)** — covers only the 2 surfaces under
  `.flo`; misses the pillar-submodule, prayer, and BBOS strips, and any instance that renders
  the package component directly. Superseded here by the global rule (the `.flo` block was
  deleted).

## Consequences

- Mobile ≤767px: every LevelNavigator strip is a vertical list of full-width rows; subsegs go
  from 1px × 14px to ~23px × 44px; labels de-truncate.
- Desktop ≥768px: original horizontal row **unchanged** — the media query is off above 767px.
- **One global stylesheet is the single source of truth** for the mobile strip; the redundant
  `.flo`-scoped block was deleted from `LevelOverviewPage.css`. Any future LevelNavigator
  render site is covered automatically, with no per-site wiring.
- Any future `@ogden/ui-components` change to the `.fln__segments` / `.fln__segment-*` class
  names would break these overrides — the coupling to the package's internal class names is
  the maintenance cost accepted here (same fragility as all package overrides).
- Verified live at 375px on the dashboard `/app`: `flex-direction: column`, bar 44px,
  subsegs ~23 × 44px, all 7 labels legible — confirmed by computed-style inspection
  (`preview_eval`) **and** a screenshot of the stacked strip. Desktop re-checked at 994px
  (`flex-direction: row`, layout intact). With the `.flo` block removed, this dashboard proof
  exercises the new global rule directly. The pillar-submodule / prayer / BBOS strips render
  the identical `.fln__segments` DOM under the same route-agnostic global rule; they sit
  behind an unrelated multi-step ceremony gate / specific project state, so they were
  confirmed by mechanism + code parity rather than individually screen-captured.

## Connections

- [[milos]] — the affected product
- [[2026-04-30-ogden-ui-components-github-direct]] — why `LevelNavigator` is external and
  restyled by override rather than edited in place
- [[2026-06-19-bbos-pipeline-dashboard-light-mode]] — precedent: MILOS-side CSS override of
  a shared component, verified by computed-style inspection when the screenshot tool hung
