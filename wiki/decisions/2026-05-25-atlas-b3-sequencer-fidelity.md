---
title: "Atlas B3 sequencer — three ecological-fidelity slices"
type: decision
date: 2026-05-25
tags: [atlas, livestock, rotation, grazing, polyface, animal-units, season, forage, spine, workitem, ecology, non-covenant]
status: accepted
superseded_by: null
---

# Atlas B3 sequencer — three ecological-fidelity slices

## Context

The B3 rotational-grazing sequencer is fully shipped: a forward-dated move
calendar (`computeMoveCalendar`), honored `targetRestDays`, rotation-aware
carrying capacity (`rotationCapacityMath`), a per-move provisioning kit
(`rotationMoveMaterials`), spine `WorkItem`s with `precedesAuto` chaining
(`rotationSequenceSpineSync`), readiness criteria, and an editable adherence
companion. While confirming it was complete, exploration surfaced **three
places where the sequencer used a simplifying heuristic that a richer sibling
card already modelled but the sequencer ignored**. The steward selected **all
three** as the next slices.

All three are **additive and non-covenant** — B is ecological correctness only;
"capacity" = animal-unit grazing load, never financial. No schema/store-action/
migration: follower tiers ride existing `species[]`, follower provenance is a
string suffix (not a new field), and season-awareness is an optional calendar
parameter that defaults to no adjustment. Each slice was committed the instant
it verified (rebased-branch discipline on `feat/atlas-permaculture`).

## Decision

### Slice 1 — Multi-species AU rollup (mean AU factor)

The sequencer's animal-unit math counted only `paddock.species[0]`: a paddock
listing cattle + sheep + poultry contributed AU as if it were cattle alone.
`MultiSpeciesPlannerCard` already rolls AU across *all* listed species (even
area split). **Math identity:** even-split per-paddock AU =
`headPerHa × areaHa × (1/n) × Σ AU_FACTORS[sp]` =
`headPerHa × areaHa × mean(AU_FACTORS over species)`. So "sum AU across all
species (even split)" collapses to **replacing the single
`AU_FACTORS[species[0]]` factor with the mean AU factor across all listed
species** — demand and supply both convert `headPerHa → AU` through the same
factor, so the carrying-capacity ratio stays internally consistent.

- **`speciesData.ts`** — new pure helper `paddockMeanAuFactor(species:
  LivestockSpecies[]): number` (returns `0` for an empty list, else the
  arithmetic mean of `AU_FACTORS[sp] ?? 0`; unknown species count as `0` in the
  mean). Lifted to a shared helper so the rotation math and the planner card
  cannot diverge.
- **`rotationCapacityMath.ts`** — `auLoad` now uses `paddockMeanAuFactor`
  (guard `species.length === 0 || headPerHa <= 0`).
- **`rotationMoveMaterials.ts`** — `paddockAnimalUnits` same swap; the docstrings
  that *promised* the `species[0]` heuristic were updated together so the two
  modules still agree.
- `MultiSpeciesPlannerCard`'s inline per-species breakdown left as-is (it needs
  the per-species rows for display) — the helper de-dupes only the *aggregate*
  path the rotation math uses. Single-species paddocks are unchanged
  (mean == that one factor).

### Slice 2 — Season-aware rest periods (calendar-level)

`requiredRestDays` and the move calendar used a fixed species-recovery floor
regardless of season. `ForageQualitySeasonalCard` already models the summer
protein slump (regrowth slows → rest should lengthen). **Seam choice:** keep
`requiredRestDays` and the **rest-compliance %** (floor-based) untouched so the
goal-tree criterion `livestock-rotation-rest-compliance-pct` does not churn.
Season-awareness applies to the **move calendar dates** only — a move whose
graze ends in a summer-slump month rests longer before the next graze.

- **New `forageSeasonMath.ts`** (pure) — lifted the NH cool-season crude-protein
  archetype (`NH_PROTEIN`) + hemisphere flip (`shiftSouthern`) out of
  `ForageQualitySeasonalCard` into shared exports;
  `seasonalRestMultiplier(monthIdx0to11, opts?) = clamp(peakProtein /
  monthProtein, 1, 1.6)` rounded to 2 dp (`MAX_SEASONAL_REST_MULTIPLIER = 1.6`).
  Flush months → ~1.0; Jul/Aug slump → clamp to 1.6. Also
  `isSouthernHemisphere(boundary)` deriving the hemisphere from the parcel
  centroid latitude via `turf.centroid` (same derivation
  `ForageQualitySeasonalCard` uses), so spine dates match the card's curve.
- **`rotationSequenceMath.ts`** — `computeMoveCalendar` gains an optional
  `seasonOpts?: { isSouthern?: boolean }` (last param; absent ⇒ multiplier 1 ⇒
  identical dates, fully back-compatible). When present, the honored rest is
  scaled by `seasonalRestMultiplier(monthOf(moveOutDateISO), seasonOpts)` before
  the idle-gap insertion; new `seasonAdjustedRestDays` field on
  `MoveCalendarEntry` (== `restDaysUntilNextGraze` when no opts). `seasonOpts`
  threaded through `projectRotationSequence`.
- **`rotationSequenceSpineSync.ts`** — `seedRotationSequenceWorkItems` threads
  `seasonOpts`; `pushRotationSequenceToSpine` derives `isSouthern` from the
  project boundary centroid (`isSouthernHemisphere(project.parcelBoundaryGeojson)`)
  so spine dates match the card. Default = no adjustment.
- **`RotationSequenceCard.tsx`** — computes `isSouthern` from the project
  centroid, passes `seasonOpts` into the projection, and renders a small
  "summer rest +Nd" note on slump-month moves (when `seasonAdjustedRestDays >
  restDaysUntilNextGraze`); honesty footnote that the curve is the heuristic
  cool-season archetype.

### Slice 3 — Polyface follower sequencing

One paddock = one move (single herd). `MultiSpeciesPlannerCard` *detects* the
Salatin cattle→sheep→poultry follower stack, but the sequencer never emitted the
follower moves that trail the lead herd. **Model:** when a paddock's species
form a recognized lead→follower stack, the follower herd enters the *same*
paddock a few days behind the lead. Emit derived follower moves additively — **no
schema migration**: follower `WorkItem`s keep `source:'rotation-sequence'` and
encode the tier in the provenance string + title.

- **New `polyfaceFollowerMath.ts`** (pure) — `FOLLOWER_LAG_DAYS = 3` (Salatin
  "3–4 days behind" sanitation window). Niche ordering grazer → mixed → browser
  → mobile (`NICHE_OF` / `TIER_ORDER`); specialists (bees, rabbits) excluded
  from the stack. `computeFollowerTiers(species)` groups the paddock's species
  into ordered tiers by niche (a paddock with ≥2 tiers has a follower stack;
  single-tier returns one tier ⇒ no follower ⇒ sequencer behaves exactly as
  today). `computeFollowerMoves(leadEntry, tiers)` emits, for each follower tier
  `k ≥ 1`, a move at `leadEntry.moveInDateISO + k × FOLLOWER_LAG_DAYS` for the
  lead's `grazeDays`, tagged with tier index + species.
  `computeAllFollowerMoves(calendar, speciesByPaddockId)` rolls up over the
  calendar.
- **`rotationSequenceMath.ts`** — `projectRotationSequence` gains a
  `followerMoves: FollowerMove[]` array (computed via `computeAllFollowerMoves`);
  existing consumers ignoring it are unaffected. Follower logic stays in the new
  module to keep the core calendar lean.
- **`rotationSequenceSpineSync.ts`** — after each lead `WorkItem`, emits follower
  `WorkItem`s when a paddock has ≥2 tiers: provenance gets a `__f<tier>` suffix
  (`rotationFollowerProvenanceId`), id `rs__<followerProvenance>`, title
  `Follower move: <species> behind <leadName> (+<lag>d)`, empty materials/
  equipment kit, same `phaseId`/`linkedFeatureId`. `seedRotationSequenceDependencies`
  separates follower rows (regex `/__f\d+$/`), chains only the leads, then adds
  each follower to its lead's `precedesAuto` list (lead id = `rs__` + provenance
  with the `__f<tier>` suffix stripped). The `__f<tier>` provenance keeps re-push
  idempotent.
- **`RotationSequenceCard.tsx`** — renders follower moves as indented `.followerRow`
  sub-rows under their lead (↳ species labels, dates, "+Nd behind lead").
  `MultiSpeciesPlannerCard`'s detection copy left intact.

## Rationale

- **De-dupe by lifting the shared aggregate path, not by deleting the sibling
  card's inline logic.** Each slice extracts the *aggregate* convention
  (`paddockMeanAuFactor`, `seasonalRestMultiplier`/`NH_PROTEIN`,
  niche-tier grouping) into a pure shared module so the sequencer and the
  sibling card cannot drift, while the sibling cards keep the per-row breakdowns
  they need for display (no-deletion discipline).
- **Backward-compatible by construction.** S1 single-species mean == the old
  factor; S2 `seasonOpts` absent ⇒ multiplier 1 ⇒ identical dates and
  `seasonAdjustedRestDays === restDaysUntilNextGraze`; S3 single-tier paddocks
  emit no followers. Legacy tests stay green untouched.
- **No schema churn.** Follower moves ride existing `species[]` and a provenance
  string suffix; season-awareness is an optional function parameter. No store
  action, no persist-version bump, no migration.
- **Covenant-clean.** Pure ecology + schedule. "Capacity" stays animal-unit
  only; no riba/gharar/CSRA/salam/investor/financing/cost-of-capital/
  yield-as-return/ROI semantics anywhere in the touched files (the only grep hit
  is the existing negation guard docstring in `rotationSequenceSpineSync.ts`).

## Alternatives Considered

- **S1: sum per-species AU explicitly in the rotation math** — rejected; the
  even-split identity proves it collapses to the mean factor, so a single helper
  swap keeps demand/supply consistent without duplicating the planner card's
  per-species loop.
- **S2: also stretch `requiredRestDays` / the rest-compliance %** — rejected;
  that would churn the goal-tree criterion `livestock-rotation-rest-compliance-pct`.
  Season-awareness is confined to calendar dates.
- **S3: a new `WorkItem` field / source for followers** — rejected; a provenance
  suffix is migration-free and keeps re-push idempotent. Computing followers in
  the card per-entry (accurate per-cycle dates) while also exposing
  `followerMoves` on the projection for spine/consumers avoids a `cycleIndex`
  gap in the projection rollup.

## Consequences

- New pure modules `forageSeasonMath.ts` (S2) and `polyfaceFollowerMath.ts` (S3);
  new shared helper `paddockMeanAuFactor` in `speciesData.ts` (S1).
- `MoveCalendarEntry` carries `seasonAdjustedRestDays`; `RotationSequenceProjection`
  carries `followerMoves`. Both additive.
- The spine now contains follower `WorkItem`s (`__f<tier>` provenance) for
  multi-tier paddocks; the dependency seeder is follower-aware so followers do
  not pollute the lead chain.
- `RotationSequenceCard` shows season-stretched rest notes and follower sub-rows.

## Verification

- **tsc** (`apps/web`, 8 GB heap) — only the **3 known pre-existing baseline
  errors** remain (`StepBoundary.tsx(365,7)` ReactNode;
  `HostUnionContextMenu.test.tsx(58,36)`; `HostUnionDrilldownCard.test.tsx(25,36)`),
  none in the slice files.
- **Targeted vitest** — S1 `rotationCapacityMath` + `rotationMoveMaterials` +
  `speciesData`; S2 `forageSeasonMath` (11) + `rotationSequenceMath`; S3
  `polyfaceFollowerMath` + `rotationSequenceSpineSync` + `rotationSequenceMath`
  (47) — all green.
- **Livestock feature sweep** (authoritative for these slices) —
  `vitest run src/features/livestock`: **18 files / 192 tests, all green** (incl.
  `polyfaceFollowerMath` 9, `forageSeasonMath` 11, `speciesData` 4, plus every
  existing livestock test — rotation engine, editors, adherence, regeneration,
  water, etc.; no regressions). The `ECONNREFUSED :3000` noise is the harmless
  builtin-samples fetch fallback.
- **Full apps/web sweep** — does **not complete in this environment**: it hangs
  in worker teardown immediately after the network-fetch file
  `src/tests/layerFetcher.test.ts` (`fetchAllLayers`, ~9 s/test), reproducibly
  across two runs (with and without `--test-timeout=25000`, so the stall is in
  teardown, not a test body). Unrelated to these pure-math/presentation slices.
  The only test failure observed before the hang was the **pre-existing,
  unrelated `src/lib/__tests__/syncManifest.test.ts` (1 failed)** — untouched by
  this work (no dirty state; last commit `15612b75`), matching the "1
  pre-existing-unrelated fail" noted in earlier full sweeps.
- **Covenant grep** over every edited/new file — clean (only the negation guard
  docstring).
- **Live preview** (`web` :5200 + `api` :3001 both running) — `/v3/project/mtc/plan`
  renders with the MapTiler canvas (no WebGL hang) and the Livestock module is
  reachable; **no console errors from the slice modules** (only pre-existing
  `[SYNC] Initial sync failed: ApiError: Request validation failed` from
  `syncService.ts`). The new card UI (season "summer rest +Nd" notes + follower
  sub-rows) only renders when a multi-species paddock + a rotation plan spanning
  summer-slump months is seeded; the `mtc` project has no such seeded data, so
  the additive UI elements were not visually confirmed in-preview — honestly
  flagged, not faked (vitest + tsc are authoritative).
- Commits on `feat/atlas-permaculture`: `53cb208b` (S1), `16b8c615` (S2),
  `bac8877d` (S3, 8 files +546/−28), own files staged by name; foreign WIP from
  concurrent sessions left unstaged per rebased-branch discipline.

## Connections

- [[olos]] — the Atlas/OLOS app this ships in (Plan stage, livestock module)
- [[2026-05-23-atlas-field-verification-axis]] — the B-series template
  (pure math → card → cross-reg → criterion) these slices extend
- [[maqasid-al-shariah]] — land stewardship under the Environment maqsid
