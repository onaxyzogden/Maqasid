---
title: "Atlas Plan: Silvopasture host arc follow-ups (A1/A2/A3)"
type: decision
date: 2026-05-15
status: accepted
tags: [architecture, atlas, plan, agroforestry, livestock, data]
superseded_by: null
---

# Atlas Plan: Silvopasture host arc follow-ups (A1/A2/A3)

## Context

The first-class silvopasture-host feature
([[2026-05-15-atlas-silvopasture-host]]) shipped with three named
follow-ups in its "Deferred" list: (1) the click-to-inspect popover
only resolved `design-element` hosts, never `cropStore`
`type==='silvopasture'` polygons; (2) selecting a host gave no on-map
indication of which orchards / paddocks / guilds belonged to it;
(3) there was no inspector affordance to re-pin a member to a
different host — membership could only change by editing geometry.
These were the remaining usability gaps in an otherwise-complete
feature.

## Decision

Close all three (A1/A2/A3) additively, with no data migration and no
change to the pure resolver's semantics:

- **A1 — Popover crop-area symmetry.** Generalise the
  `SilvopasturePopover` selection guard from a `design-element`-only
  branch to a resolver that builds the encoded host id from *either*
  a selected design element (`encodeHostId('design-element', el.id)`)
  or a selected crop area (`encodeHostId('crop-area', area.id)`), then
  looks it up in `resolveSilvopastureHosts(...)`. Mirrors the
  symmetric `host.source` branch already proven in
  `SilvopastureHostsCard`.

- **A2 — On-map member outline.** A self-contained overlay component
  `SilvopastureMemberOutline` (own `silvo-member-*` GeoJSON source +
  dashed accent line / transparent-fill circle layers), mounted in
  `VisionLayoutCanvas` next to the popover. When the selection is a
  silvopasture host it resolves members via `resolveMembers` and draws
  a non-interactive outline; renders nothing otherwise. Mirrors the
  utility-conflict-halo pattern (separate stroke layer, idle-retry +
  dispose cleanup) rather than cross-layer feature-state injection.

- **A3 — Re-pin affordance.** An optional `silvopastureId` select
  field added to the paddock / crop-area / guild inline edit schemas,
  with an explicit "Auto (spatial)" → `undefined` choice. Host options
  come from a new pure helper `listHostsForSelection(hosts)` (label =
  `name (PLAN|CROP)`); the field/save-patch are factored into
  `silvopastureField()` / `silvopastureSavePatch()` so schema builders
  stay store-free (callers pass precomputed options).

## Rationale

- **Self-contained outline overlay (A2)** keeps the cross-store
  highlight in one place and avoids coupling to `PlanDataLayers`
  internals or threading feature-state across the per-kind layer
  stack — lower risk, single home, proven halo pattern.
- **Precomputed `hostOptions` into pure schema builders (A3)** keeps
  `inlineEditSchemas.ts` free of store imports; call sites
  (`PlanDataLayers` module helper via `getState()`,
  `PlanSelectionFloater` via `pd.projectId`) own the resolution.
- **Empty `silvopastureField()` when no hosts** avoids surfacing a
  dead selector on parcels with zero silvopasture polygons.

## Alternatives Considered

- **Cross-layer feature-state for the member outline** — rejected:
  invasive across the per-kind layer stack; the separate-stroke halo
  pattern is already proven and isolated.
- **Stores read inside schema builders** — rejected: would couple the
  pure schema module to Zustand; precomputed options keep it testable.
- **`collectMemberIds` driving feature-state** — the planned helper
  was added and exported as a documented deliverable but the overlay
  used a geometry-projection approach instead; helper retained for a
  future feature-state consumer.

## Consequences

- No data migration: `silvopastureId?` already existed on all four
  member stores from the parent ADR; A3 only exposes it.
- `silvopastureField()` returns an explicit `FieldSpec[]` (imported
  from `inlineFormStore`), not an `as const` tuple — the readonly
  tuple was not assignable to the mutable `InlineFormPayload.fields`
  (caught by `tsc`, fixed before commit).
- Verified: `tsc --noEmit` clean; vitest 802/802 (baseline held);
  `vite build` clean; Plan stage mounts on MTC with all three changes
  live and console silent.
- Not verified: interactive click-through of the popover / outline /
  re-pin flows — those live on the MapLibre canvas and stores are not
  exposed on `window`, so they were not driven visually. The mount
  path that loads the same code is clean.
- Closes parent-ADR deferred items 1–3. Still deferred: a true
  multi-host pin selector (current selector is single-host) and
  Part B (phenology fold-in — gated, conditional spec only).

## Connections

- [[2026-05-15-atlas-silvopasture-host]] — parent feature; this closes
  its deferred list
- [[olos]] — Atlas Plan stage; where this ships
