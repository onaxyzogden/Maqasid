---
title: "Atlas: stewarded pasture/silvopasture regeneration with a livestock readiness gate"
type: decision
date: 2026-05-16
status: accepted
tags: [architecture, atlas, observe, plan, act, livestock, regeneration, gating, covenant]
superseded_by: null
---

# Atlas: stewarded pasture/silvopasture regeneration with a livestock readiness gate

## Context

A troubled part of land — compacted, eroded, bare/disturbed succession,
poor ground cover — cannot host livestock immediately; reviving it to
productive pasture often takes **more than one year**. Atlas already
modelled land state (`resolveZoneVegetation`), had a regeneration engine
(`buildRegenerationPathway` / `REGENERATION_METHODS`), a livestock
toolkit, a phasing/Gantt system, and an established gating idiom
(`relationships/statusGate.ts`, Needs & Yields). But **nothing connected
these into a stewarded journey, and nothing stopped livestock being
placed on land that had not yet recovered.** Recovery timing existed only
implicitly, as revenue offsets.

This is the covenant of *iḥyāʾ al-mawāt* — reviving dead/troubled land —
under the Environment maqsid. The steward must be able to *observe* a
troubled zone, *plan* a multi-year pathway toward pasture/silvopasture,
and *implement* it, with livestock withheld until the steward confirms on
the ground that the land has actually healed.

## Decision

Thread the existing pieces into one **Observe → Plan → Act** workflow and
add only the three genuinely missing parts: a per-zone regeneration
target, rolled-up progress/readiness, and a livestock readiness gate.

**The decisive rule is steward-sovereign and deliberately simple:**

```
ready === !!stewardReadinessConfirmedAt
```

Observed thresholds and the projected timeline are **advisory only** —
they inform the steward ("the land looks recovered", "earliest expected
~2031") but never open or hold the gate. Recovery is a judgement the
steward makes, not one the system infers.

- **New steward-authored store** `regenerationPlanStore` (zundo + persist,
  client-local localStorage, mirrors `zoneStore`): one `RegenerationPlan`
  per `LandZone` (1:1), carrying target state (pasture/silvopasture), a
  baseline vegetation snapshot captured at creation, thresholds, chosen
  pathway method ids, `startedAt`, optional silvopasture canopy config,
  `stewardReadinessConfirmedAt` (the gate flip), and an optional recorded
  `readinessOverride { at, reason }`.
- **One pure shared evaluator** `packages/shared/src/regeneration/
  readinessGate.ts` (exported via `@ogden/shared/regeneration`), mirroring
  `relationships/statusGate.ts` — no React, no store imports, plain
  inputs. Single source of truth for every surface.
- **Thin cross-stage surfaces:** Observe flags troubled zones and offers
  "Start regeneration plan" (snapshots baseline); a map overlay tints
  planned zones by readiness; the Plan livestock card picks
  target/pathway/thresholds, sets `startedAt`, renders a multi-year SVG
  timeline + advisory earliest-livestock date, and surfaces the Act-stage
  "Confirm readiness — unlock livestock"; Act scopes regeneration events
  to the plan.

### Ownership boundary (the critical decision)

`computeRegenerationForcing` already auto-detects barren zones and emits a
synthetic `regen-phase-{projectId}` owned by the auto-design engine
(`runAutoDesign`, wholesale-replaced each run). The new `RegenerationPlan`
is **steward-authored truth in its own store and never writes a
`BuildPhase` row.** It connects to the system obligation through the
pre-built seam `acknowledgedRegenerationZoneIds`: a zone carrying a plan
is contributed to that set, so the forced-barren assignment gate releases
(the steward has now authored an explicit pathway). The obligation is
**adopted, not duplicated** — no double-modelling.

### Livestock readiness gate

Chokepoint: `LivestockPanel.tsx` `handleSave`. Before committing a
paddock, the pending polygon centroid is point-in-polygon tested
(`findBlockingRegenerationPlan`, pure) against every zone whose plan is
not yet steward-confirmed. A hit intercepts with a confirm modal in the
file's existing modal idiom. "Place anyway (override)" records a
`readinessOverride` (with the steward's reason) on the plan, then
proceeds. A non-blocking `RegenerationGateBanner` gives design-time
awareness in the livestock surface. The override is a **per-placement
escape hatch, not a gate disabler** — it does not flip confirmation, so
an overridden-but-unconfirmed zone still intercepts the next placement.
Steward sovereignty is preserved: the gate is never a hard lock.

## Rationale

- **Connective workflow + readiness gate (Approach A)** is the highest
  leverage, lowest risk path: it reuses the regeneration/livestock/
  phasing engines and adds only the missing connective tissue and the one
  gate, with the best long-term UX (a real store + pure evaluator +
  recorded audit, not a thin hack).
- **Pure shared evaluator** keeps the decisive rule testable in isolation
  and identical across Observe, Plan, Act, and the gate — no surface can
  drift from another.
- **Adoption via the existing seam** (not a new `BuildPhase`) is the only
  way to avoid two systems modelling the same barren obligation.
- **Steward-confirmed readiness** (projection advisory only) matches the
  covenant: the trust is the steward's on-the-ground reading, not an
  inferred date — and mirrors the recorded-escape-hatch idiom already
  proven in Needs & Yields.
- **Silvopasture decoupled in v1**: the gate keys only on pasture
  thresholds + steward confirm; the optional canopy config reuses the
  existing succession/temporal infrastructure and is drawn on the
  timeline but never gates grazing — silvopasture is pasture plus an
  optional tree layer, not a stricter gate.

## Alternatives Considered

- **B — Full new module with net-new soil/forage modelling.** Rejected:
  `SoilRegenerationProcessor` + scenario cards already cover the
  modelling; new modelling is speculative and high-risk for no added
  steward value in v1.
- **C — Gate only (no workflow).** Rejected: it solves the symptom
  (livestock on unrecovered land) but not the steward's actual
  "observe, plan, implement" journey.
- **Writing a `BuildPhase` row from the plan.** Rejected: double-models
  the forced-barren obligation already owned by `runAutoDesign`; the
  `acknowledgedRegenerationZoneIds` seam exists precisely to avoid this.

## Consequences

- New client-local store `regenerationPlanStore` (localStorage, like
  `zoneStore`/`phaseStore`) — **no server table or migration in v1.**
- Plan ↔ regeneration-event linkage rides existing schema:
  `observations.regenerationPlanId` (free-form `z.record`) + a zone-
  centroid `location` default — **no `regeneration_events` schema/
  migration change** (migration 015 enums stay CHECK-locked).
- `@ogden/shared` gains a `./regeneration` subpath export; the evaluator
  is the single source of truth — every surface calls it, none reimplement
  the rule.
- The forced-barren auto-design behaviour is **unchanged** for unplanned
  zones; a planned zone simply releases the assignment gate via the
  existing acked-set seam (one production call site:
  `GenerateSiteDesignBar.tsx`).
- No new npm dependencies; the multi-year timeline is custom SVG.
- Selector-stability ADR honoured: stores subscribed raw, filtered in
  `useMemo` (no array-returning getters inside selectors).
- Verified: `apps/web` `tsc --noEmit` clean (`--incremental false`,
  8 GB script); `@ogden/shared` 180/180 (incl. `readinessGate.test.ts`
  9/9); full `apps/web` vitest 928/928 across 74 files, incl. 28 new
  (`regenerationGate` 9, `regenerationPlanStore` 12,
  `regenerationTimeline` 7).
- Deferred: server persistence; ~~multiple plans per zone~~ (lifted in
  v1.1 — see addendum); auto-confirm from observed thresholds
  (intentionally never — steward-sovereign); ~~silvopasture canopy as a
  grazing factor~~ (lifted in v1.1 as an *advisory* indicator only — see
  addendum; it never gates).

## Connections

- [[olos]] — Atlas; spans the Observe, Plan, and Act stages
- [[2026-05-14-auto-design-pipeline]] — owner of the forced-barren
  obligation this plan *adopts* via `acknowledgedRegenerationZoneIds`
  (the integration boundary; no `BuildPhase` written by the plan)
- [[2026-04-26-zustand-selector-stability]] — selector idiom the new
  store and surfaces follow
- [[2026-05-15-atlas-silvopasture-host]] — adjacent silvopasture work;
  this ADR's canopy is decoupled and does not gate grazing in v1

---

## Addendum — v1.1 (2026-05-16): active-plan model + canopy advisory

Two v1 non-goals were lifted under the same covenant. The decisive rule
is **byte-for-byte unchanged**: `ready === !!stewardReadinessConfirmedAt`.
No server persistence (still client-local localStorage).

### A. Multiple plans per zone — "active plan + scenarios"

The 1:1 `RegenerationPlan ↔ LandZone` constraint is relaxed to
**N-plans-per-zone with exactly one active**. The plan row shape is
unchanged — plans simply share a `zoneId`; activeness is tracked
out-of-band by a new persisted `activePlanIdByZone: Record<string,string>`
on `regenerationPlanStore` (persist **`version` 1→2** with a pure
`migrate` that defaults `{}` then backfills each zone's single existing
plan as active — every current single-plan steward is behaviourally
unchanged).

- New actions: `setActivePlan(zoneId, planId)`; `createPlan` auto-actives
  the new plan **iff the zone has no active plan yet** (first-plan-auto-
  active = exactly the old behaviour); `deletePlan` promotes the most-
  recent remaining plan for that zone (by `createdAt`) or clears the map.
- New accessors `getActivePlanForZone` / `getPlansForZone`; selector-
  stability ADR honoured (raw `s.plans`/`s.activePlanIdByZone` subscribe,
  derive in `useMemo`).
- A single DRY helper `selectActivePlans(plans, activePlanIdByZone)` in
  `regenerationGate.ts` (active-resolution with most-recent fallback,
  mirroring the store) feeds **every gate-bearing surface** the active-
  only list: the livestock gate (`findBlockingRegenerationPlan` pure
  signature unchanged), `RegenerationPlanOverlay` (one feature per zone —
  kills the N-overlap bug), `RegenerationGateBanner`, and the Observe
  CTA (`EcologicalDetail` now shows "(N plans)" + "Start another plan").
  **A scenario (non-active) plan never gates.** The
  `acknowledgedRegenerationZoneIds` adoption seam is unchanged and
  correct (≥1 plan of any kind still releases the forced-barren gate).
- `RegenerationPlanCard` groups plan blocks by zone with an
  `ACTIVE`/`Scenario · Set active` affordance and "Start another plan
  for this zone".

### B. Silvopasture canopy as an advisory indicator (covenant-safe)

Canopy is surfaced as **advisory only** — it is computed strictly
*outside* the decisive path and is asserted by a mandatory covenant-guard
test to never touch `ready`, `met`, `unmet`, `thresholdsObservedMet`, or
`projectedReadyDate`.

- `packages/shared/src/regeneration/readinessGate.ts`: optional
  `silvopastureCanopy?: { speciesId; targetCanopyM; canopyAgeYears }`
  input (caller passes the *computed* age — evaluator stays pure/
  deterministic, no `Date.now()`); optional
  `canopyAdvisory?: { currentCanopyM; targetCanopyM; percentToTarget }`
  result derived via `canopyAtAge` (`../succession/growthCurves.js`),
  computed after the decisive `ready` assignment.
- `regenerationTimeline.ts` gains `buildCanopyTrack(config, totalYears)`
  (one point/year from `plantingYearOffset`); `RegenerationPlanCard`'s
  `TimelineSvg` draws an advisory canopy band (dashed target line +
  track polyline) and a canopy editor (species / targetCanopyM /
  plantingYearOffset → `updatePlan`) replacing the old static footnote,
  with a live "Canopy NN% of target — advisory, never gates" line.

### Consequences (v1.1)

- Verified: `apps/web` `tsc --noEmit` clean (`--incremental false`,
  8 GB script, `TSC_EXIT=0`); `@ogden/shared` **185/185** (incl.
  `readinessGate.test.ts` with 5 new canopy-advisory specs + covenant
  guard; original 9 byte-identical); full `apps/web` vitest
  **952/952** across 74 files (new: `selectActivePlans`/active-gate
  specs in `regenerationGate.test.ts` → 16, store active-map/migrate-v2
  specs, `buildCanopyTrack` → 5). Runtime `preview_eval` exercise:
  create-2/auto-active/set-active/delete-promote, v1→v2 migrate
  backfill, scenario-never-blocks, monotonic 9-point canopy track —
  all green.
- The covenant is provably intact: the decisive flip is unchanged for
  every existing input (regression-locked by the original evaluator
  specs staying byte-identical green) and canopy is advisory-only.
- Not committed (branch `feat/atlas-permaculture` is rebased/force-
  pushed out-of-band).
