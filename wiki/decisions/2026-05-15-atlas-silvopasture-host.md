---
title: "Atlas Plan: Silvopasture as first-class host"
type: decision
date: 2026-05-15
status: accepted
tags: [architecture, atlas, plan, agroforestry, livestock, data]
superseded_by: null
---

# Atlas Plan: Silvopasture as first-class host

## Context

Silvopasture is the agroforestry pattern integrating trees, forage,
and livestock on one parcel. Atlas drew silvopasture as a free-standing
polygon in **two** stores — `designElementsStore` (`kind: 'silvopasture'`)
and the legacy `cropStore` (`type: 'silvopasture'`) — with no structural
relationship to the orchards, guilds, and paddocks that live inside it.
The only prior recognition was one runtime overlap test in
`AgroforestryPatternAuditCard`. There was no shared selector, no map
affordance, and no way to ask "what is inside this silvopasture?".

## Decision

Make silvopasture a first-class host with **hybrid membership**:
spatial overlap is the default; an explicit per-member
`silvopastureId` pin overrides the spatial guess and wins absolutely
(member belongs only to the pinned host regardless of geometry).

Host IDs are namespaced across the two stores as `<source>:<rawId>`
(`design-element:<uuid>` / `crop-area:<uuid>`) via `encodeHostId` /
`decodeHostId`, centralised in
`apps/web/src/features/agroforestry/silvopastureHosts.ts`.

Three UI surfaces: an audit/summary card on the Plan stage
(`SilvopastureHostsCard`), a click-to-inspect map popover
(`SilvopasturePopover`, read-only), and auto-link baked into the
existing draw-finish flow (first overlapping host wins; re-pin from
the inspector deferred).

## Rationale

- **Pure read-side resolver** keeps the relationship derivable without
  migrating data between the two silvopasture stores (additive only).
- **Pin-wins semantics** give stewards an escape hatch when geometry
  is ambiguous (overlapping hosts) without forcing a schema rework.
- **Namespaced host IDs** are required because both stores mint their
  own UUIDs — a bare ID is ambiguous across sources.
- **First-match auto-link** (vs. a multi-host select in the inline
  form) keeps the draw-finish popover lightweight; the inspector is
  the intended place for correction (re-pin UI deferred).

## Alternatives Considered

- **Migrate all silvopasture into one store** — rejected: invasive,
  risks the legacy `cropStore` flavour, and unnecessary for a
  read-time relationship.
- **Spatial-only membership (no pin)** — rejected: ambiguous when a
  member overlaps multiple hosts; stewards need an override.
- **Replace the legacy `AgroforestryPatternAuditCard` overlap test** —
  rejected: kept as-is; the new card/selector are purely additive.

## Consequences

- `silvopastureId?: string` (optional, encoded form) added to
  `Paddock`, `Guild`, `CropArea`, `DesignElement`. No migration —
  optional field, existing persisted records remain valid.
- Auto-link wired into `PaddockTool` (polygon), `GuildTool` (point),
  `CropAreaTool` (only `type==='orchard'`; pin cleared on save if the
  steward switches type), and `useDesignElementDrawTool` (only
  `kind==='orchard'`, polygon-or-point).
- No backend / scheduling dependency: `computeRotationSchedule`
  re-sorts by recovery status, so neither the popover's display sort
  nor store array order affects rotation logic (array order is only a
  stable-sort tiebreaker within identical recovery status).
- Verified: `tsc --noEmit` clean; full vitest suite 766/766 incl. 10
  new in `silvopastureHosts.test.ts`.
- Deferred: `cropStore`-typed silvopasture popover symmetry; map
  member outline indicators; re-pin affordance in the inspector;
  multi-host pin selector.

## Connections

- [[olos]] — Atlas Plan stage; where this ships
- [[2026-05-14-atlas-plant-catalog-consolidation]] — adjacent Plant
  Systems module work this session built on
