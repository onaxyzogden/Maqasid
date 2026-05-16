---
title: "Atlas Plan: Zone Seed Anchor seeds full Z0–Z5 (was Z0–Z3)"
type: decision
date: 2026-05-16
status: accepted
tags: [atlas, plan, permaculture, zones, geometry]
superseded_by: null
---

# Atlas Plan: Zone Seed Anchor seeds full Z0–Z5 (was Z0–Z3)

## Context

The Plan module's **Zone Seed Anchor** tool lets a steward click a point on
the map and grow editable Mollison permaculture rings as draft `LandZone`s.
It only seeded **Z0 (home centre) + Z1 / Z2 / Z3** — Zone 4 (forage / woodlot)
and Zone 5 (wild) were never produced by a tool press, so a steward had to
hand-draw them. Every other layer was already Z4/Z5-ready (the
`permacultureZone` type allows `0..5`, `defaultCategoryForZ` maps 4→livestock
/ 5→conservation, `concentric.ts` and `zoneSizeGuide.ts` cover them). The
only gap was the ring-seed pipeline, type-capped to `0|1|2|3` with a 3-entry
band table. There was also a latent inconsistency: the seed/overlay band
table used **Z3 = 100–500 m** while the canonical Mollison ladder uses
**Z3 = 100–300 m, Z4 = 300–600 m**.

## Decision

One Zone Seed Anchor click now seeds the full **Z0–Z5** set (no new button).
**Z5 is a fixed-radius ring** (1200 m outer, a plain annulus — not
parcel-boundary-clipped, like the others). The shared ring-band ladder is
aligned to the canonical Mollison radii: **Z3 100–300 m, Z4 300–600 m
(olive, livestock), Z5 600–1200 m (green, conservation)**.

Implementation collapsed to one exclusion point plus its type consumers:
`ZONE_RING_BANDS` in `apps/web/src/v3/plan/layers/zoneRingConstants.ts`
widened 3→5 bands and its `zLevel` union `1|2|3` → `1|2|3|4|5`; the two
mirroring `zLevel` annotations in `ringSeedGenerator.ts` widened to include
`4|5`. No generator logic changed — the per-band loop, `diff()` annulus /
blocker subtraction, per-Z-level idempotency check, and
`defaultCategoryForZ(zLevel)` were already generic.

## Rationale

`ZONE_RING_BANDS` is the deliberate single source of truth shared between
the editable ring seeder and the read-only `PlanZoneRingsOverlay`, so the
preview rings always match what a seed lays down. Extending the table is the
minimum change that ripples correctly: the overlay now draws **5 rings
instead of 3** and the Z3 ring shrinks 500→300 m automatically, with no
overlay code change. Per-Z-level idempotency (`permacultureZone`) means a
re-run on an already-Z0–Z3-seeded project seeds **only the missing Z4 & Z5**
— a clean opt-in migration path; persisted older projects are not
retroactively modified.

## Alternatives Considered

- **New separate button / tool for Z4–Z5** — rejected: fragments a single
  conceptual action (lay down the Mollison rings) and duplicates anchor
  resolution.
- **Z5 as a parcel-boundary-clipped "wild remainder"** — deferred: seeding
  is deliberately *not* parcel-clipped (the steward trims afterwards via the
  explicit "Trim seeded to parcel" action); a true clipped wild zone is a
  separate future feature. Z5 stays a fixed-radius annulus for now.
- **Leave Z3 at 100–500 m** — rejected: keeps the seed/overlay table
  inconsistent with the canonical Mollison ladder and `zoneSizeGuide.ts`.

## Consequences

- `PlanZoneRingsOverlay` now renders 5 dashed rings (~30/100/300/600/1200 m)
  around every Z0 anchor; the Z3 preview ring moved 500→300 m. This is the
  intended design of the shared constant, not a regression.
- Re-running the seed tool is the opt-in migration for older Z0–Z3 projects
  (adds only Z4 & Z5).
- Verification rested on the running app's **real in-browser modules**
  (`runZoneGenerator('ring-seed')` → 6 zones Z0–Z5, areas strictly
  increasing, Z4 livestock / Z5 conservation; `zoneRingConstants` → 5 bands;
  live tool hint copy updated to "Z0–Z5") plus the green durable-contract
  test (`ringSeedGenerator.test.ts` 13/13) and a clean typecheck. An on-map
  pixel screenshot was **deferred** — the WebGL screenshot renderer was
  unresponsive under load and the live map instance is not exposed on a
  store/global for synthetic seeding; geometry is parcel-independent anyway.

## Connections

- [[olos]] — Atlas Plan module; this changes the Zone & Circulation seed tool
- [[goal-compass]] — sibling Plan-stage module sharing the draft-LandZone pattern
- [[maqasid-al-shariah]] — land stewardship serves the environment maqasid
