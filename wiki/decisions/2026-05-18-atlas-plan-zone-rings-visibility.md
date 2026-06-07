---
title: "Atlas Plan: zone-rings visibility — basemap-agnostic casing on PlanZoneRingsOverlay"
type: decision
date: 2026-05-18
status: accepted
tags: [atlas, plan, permaculture, zones, map, visibility, yagni]
superseded_by: null
---

# Atlas Plan: zone-rings visibility — basemap-agnostic casing on PlanZoneRingsOverlay

## Context

A steward reported the v3 map "frequency rings" were hard to see. The
original brief approved a full treatment (paint + label fix + per-zone
legend with hover emphasis). Implementation initially targeted
`ZonesOverlay.tsx` (the computed Mollison Zone 0–5 overlay) plus a new
`zoneEmphasisStore` and a BaseMapCard zone sub-legend, with a temporary
`diagnose-preview` route to view it.

Steward feedback then revealed a **mis-targeting**: the legend/sub-legend
appeared but the on-map visual did not change. Root cause (confirmed by
code + runtime evidence): `ZonesOverlay` is mounted only on the
dead-routed `DiagnosePage`. On the surfaces the steward actually uses
(Observe / Plan), the `zones` toggle gates steward-drawn permaculture
polygons (`ObserveAnnotationLayers` `human-zones`), and the
automatically-appearing concentric rings on **Plan** are drawn by
`PlanZoneRingsOverlay` (gated on the separate `zoneRings` "Design audit
rings" toggle). The whole hover/sub-legend apparatus optimised a
component the steward never sees.

## Decision

Scope down to the minimal fix on the **correct** surface, and remove the
speculative machinery.

**Kept (the actual fix):** `PlanZoneRingsOverlay.tsx` gained a white
casing line (`plan-zone-rings-line-casing`, solid, opacity 0.55) beneath
the coloured dashed ring, zoom-interpolated widths (casing 4→6 px, line
2→4 px, was a flat 1.5 px), line opacity 0.65→0.95, and a
zoom-interpolated label (text-size 10→13, halo 1.2→1.8, allow-overlap so
all ring labels show). The white casing makes the stroke read on dark
satellite imagery and light/paper basemaps alike — verified in-browser on
both. `ZonesOverlay.tsx` kept its analogous paint/casing/label
improvements (strictly-better, harmless) but was **decoupled** from the
hover store.

**Removed (speculative coupling + scaffolding):** `zoneEmphasisStore.ts`
deleted; BaseMapCard zone sub-legend + hover wiring reverted; `COLORS` /
`LABELS` returned to module-private in `concentric.ts` (no remaining
importers); temporary `diagnose-preview` route and its import removed.

## Rationale

The static casing + opacity + label treatment passively solves the actual
problem the steward reported (telling adjacent rings apart on any
basemap). The per-zone hover-emphasis solved the same problem with far
more machinery — a cross-tree Zustand bridge wired to a component not
mounted on live surfaces — which is latent rot, not value. Removing it is
a net simplification. `ZonesOverlay`'s paint improvement is retained
rather than reverted because Diagnose is an unbuilt stage that may be
reused (per `feedback_no_deletion.md`), and the improved code is harmless
where it sits; reverting would only guarantee rework.

## Alternatives Considered

- **Re-point the hover sub-legend onto `PlanZoneRingsOverlay`** —
  rejected: that overlay is 3–5 rings around Z0 anchors; a cross-tree
  hover store for it is over-engineering for a problem the static paint
  already solves.
- **Revert the `ZonesOverlay` paint changes too** — rejected: strictly
  better, harmless, and Diagnose may be reused; reverting just creates
  future rework.
- **Keep the temp `diagnose-preview` route** — rejected: pure
  verification scaffolding pointing at a dead page; zero long-term value.

## Consequences

- The Plan-stage "Design audit rings" (`zoneRings` toggle) are now legible
  on satellite and light basemaps without per-basemap tinting.
- No cross-tree hover machinery remains; the BaseMapCard legend is back to
  plain on/off rows.
- Net working-tree delta for this task is now part of the rebased
  `feat/atlas-permaculture` history already on origin (the branch is
  rebased out-of-band; the remote already carries `CASING_LAYER`).
- Verification: `pnpm --filter web typecheck` clean (exit 0) before and
  after the cleanup; in-browser confirmation of casing legibility on
  satellite + street basemaps via injected synthetic rings (no local
  project carries a Z0 zone, so the overlay is data-empty regardless —
  geometry is parcel-independent). WebGL screenshot of a real seeded
  project was not possible (renderer unresponsive under load) — a known
  environment limitation, documented honestly rather than asserted.

## Connections

- [[olos]] — Atlas Plan module; this changes the zone-rings overlay paint
- [[2026-05-16-atlas-zone-seed-z4-z5]] — sibling change to the shared
  ring-band pipeline feeding `PlanZoneRingsOverlay`
- [[maqasid-al-shariah]] — land stewardship serves the environment maqasid
