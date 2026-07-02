---
title: "BBOS Pipeline Dashboard Follows the Global Light/Dark Toggle"
type: decision
date: 2026-06-19
status: accepted
tags: [ui, theming, bbos, css, light-mode]
superseded_by: null
---

# BBOS Pipeline Dashboard Follows the Global Light/Dark Toggle

## Context

The redesigned ("newer") BBOS pipeline dashboard — the adapter-driven shell behind
the `bbosNewDashboard` / `bbiz_bbos_new_dash` feature flag, living in
`src/components/bbos/pipeline-dashboard/` — was built with a hardcoded dark "cosmic"
palette deliberately scoped to `.bpd` (its CSS comment notes the dark theme must
"NEVER leak into the light global app tokens"). The rest of [[milos]] is light-first
and ships a working global theme toggle: `data-theme` on `<html>`, switched from the
TopBar Sun/Moon button, persisted to `bbiz_theme` (default `light`), managed by
`useSettingsStore`. The consequence: when a user runs the app in light mode, the BBOS
dashboard still rendered as a dark island — jarring and inconsistent. The operator
chose (via clarifying question) that the dashboard should **follow the global toggle**:
light when the app is light, keep the existing cosmic dark when the app is dark.

## Decision

Add **one new scoped CSS block** to
`src/components/bbos/pipeline-dashboard/BbosPipelineDashboard.css` that redefines the
~30 `--bpd-*` custom properties under `[data-theme="light"] .bpd, [data-theme="light"]
.bpd-modal-overlay`. Because the global system sets `data-theme="light"` on `<html>`
and both `.bpd` and the portaled `.bpd-modal-overlay` are descendants of `<html>`, this
descendant selector cleanly overrides the existing (dark) defaults. The dark block is
left untouched as the default, so dark mode is byte-for-byte unchanged. Two small
literal cleanups accompany it: `.bpd-parse-result--err` was changed from the hardcoded
`#e87c7c` to `var(--bpd-red)` (legible in both themes), and a light-only `.bpd-modal`
box-shadow softener replaces the heavy near-black drop shadow over the light frosted
scrim.

## Rationale

The entire dashboard is driven by the `--bpd-*` palette defined in one block;
`palette.js` and every component reference only `var(--bpd-*)` (no color literals in
JS, almost none in the CSS rules). So a single light-palette override re-themes every
surface (rail, overview, exec modal, approval brief, primitives) automatically — no
JSX, store, or component changes required. The light palette preserves the dark
palette's elevation order (page faintly gray → cards near-white → inputs white) so
existing rules that key off `--bpd-bg` (gate-check checkmark, radio dot, modal scrim)
stay correct; accent/status hues are darkened for text legibility on light surfaces
and their `*-dim` companions flip to pale tints, exactly as the existing
`data-[...]` background rules consume them.

## Alternatives Considered

- **Standalone light-mode toggle inside the dashboard** — rejected: duplicates global
  theme state, drifts from the rest of the app, and contradicts the operator's choice
  to follow the global toggle.
- **Keep the dashboard permanently dark** — rejected: the dark island is the very
  inconsistency this work removes.
- **Rewrite components to consume global app tokens directly** — rejected: large,
  risky, and unnecessary; the scoped `--bpd-*` seam already makes re-theming a
  one-block change.

## Consequences

- The newer BBOS dashboard now reads as part of the app in light mode and keeps its
  cosmic identity in dark mode, switching live with the global toggle.
- Future palette work stays a single-block edit; the additive light block is the
  template for any further theme variants.
- Dark mode is provably unchanged (the default block was not edited), so there is no
  regression surface for existing dark users.

## Connections

- [[bbos-pipeline]] — the entity whose redesigned dashboard this re-themes
- [[milos]] — host app providing the global `data-theme` toggle this work follows
