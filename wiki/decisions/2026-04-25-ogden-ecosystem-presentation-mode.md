---
title: "OGDEN Ecosystem Presentation Mode"
type: decision
status: accepted
date: 2026-04-25
---

# OGDEN Ecosystem Presentation Mode

## Context

A 2:45 video script (`KAS_Ecosystem_Intro_Production.md`) calls for an
interactive component showing **BBOS, OLOS (Atlas), MILOS** flowing into
**MTC (Moontrance)** during a recorded narration. Beats are timed: full
view → zoom → highlight each system → convergence → calm hold.

## Decision

Reuse the existing `MaqasidComparisonWheel` (already rendering the three
OGDEN sub-pillars at `/app/ogden-integration`) inside a **fullscreen
Presentation Frame** with a hands-free keyboard sequencer. Do not build a
new "rivers into ocean" diagram.

Route: `/present/ogden` — mounted at top level (outside `AppShell`), so
sidebar/topbar do not appear in OBS capture. A `body.is-presenting` class
hides any leaked chrome as a belt-and-suspenders measure.

## Implementation

**New files**
- `src/pages/ogden/OgdenPresentationPage.jsx`
- `src/components/ogden/EcosystemPresentationFrame.{jsx,css}`

**Wheel additions (additive props, no behavior change at other routes)**
- `forceHover` — programmatic segment highlight
- `forceConverged` — all three sectors lit + hub aura ignites
- `centerLabelOverride` — replaces the at-rest hub label (used: "MOONTRANCE")
- `seg.color` — per-segment fill override (BBOS gold, OLOS green, MILOS white)
- `seg.tooltipText/tooltipLabel/tooltipWidth/tooltipHeight` — replaces the
  "Next" hover card with descriptive copy, anchored bottom-center to avoid
  left-sector clipping

**Keyboard map**
| Key | Beat |
|---|---|
| `0` / `Esc` | Reset / calm |
| `1` `2` `3` | Highlight BBOS / OLOS / MILOS |
| `4` | Convergence (all three lit + hub ignition) |
| `z` / `Z` | Zoom in (1.6×) / out |
| `→` / `Space` | Auto-advance through 0→1→2→3→4→0 |
| `i` | Toggle on-screen beat indicator (off by default) |

## Why this approach

- **Recording-ready in hours, not days.** The wheel already supports
  hover-driven highlight, needle rotation, ignition aura. Wrapping it
  costs three new files; building a new diagram would be 1–2 days.
- **Pure additive props.** `forceHover` / `forceConverged` /
  `seg.color` fall back to existing behavior when unset. No regressions
  at `/app/ogden-integration` or any pillar wheel.
- **Bottom-center tooltip override.** Sector-adjacent positioning clipped
  for left-half sectors (OLOS at midangle 150°). Anchoring descriptive
  tooltips at fixed `(CX - w/2, 440)` solved it without growing the SVG
  viewBox.

## Out of scope

- A bespoke "three rivers into ocean" diagram (deferred — wheel suffices).
- SVG-internal zoom (CSS transform on the stage container is sufficient
  for OBS capture).
- A distinct Amanah Gate overlay beyond the existing Mithaq ring.

## Rollback

Delete the three new files; revert the additive prop changes in
`MaqasidComparisonWheel.{jsx,css}` and `MaqasidNextActionCard.{jsx,css}`.
No store, data, or routing-shape changes elsewhere.
