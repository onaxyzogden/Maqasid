---
title: "Atlas Plan — Plan Impact Flags (Observe→Plan review triage)"
type: decision
date: 2026-05-25
status: accepted
tags: [atlas, plan, observe, architecture, derived-state, persistence, command-centre]
superseded_by: null
---

# Atlas Plan — Plan Impact Flags (Observe→Plan review triage)

## Context

The observation-needs reframe established an explicit invariant: Observe **surfaces** a
`planImpact` flag (`none｜possible｜likely`) on a need but **never acts on it** — Plan
reviews + decides, Act assigns ([[2026-05-25-atlas-observe-needs-reframe]],
[[2026-05-25-atlas-observe-needs-execution]]). The field was captured on
`ObservationNeed` but **no `plan/` code consumed it** — a repo-wide grep confirmed
`planImpact` had no Plan-side reader. The Observe→Plan loop was half-wired and dangling.

This session was preceded by a **gap-analysis + roadmap** pass (no code) that reframed
the existing 15-module Plan build as the "Plan Initiation" surface and identified the
**Plan Operation** layer (impact flags → decisions → work packages → Act handoff) as the
real gap. Phase 1 — Plan Impact Flags — was chosen as the keystone first slice because
the primitive already existed and it closes the dangling loop.

**Locked decisions (confirmed with the operator):** (1) a dedicated **Plan Reviews**
route `plan/review` (the nucleus of the future Plan Operation Command Centre), not a
compass panel or PlanLayout rail; (2) neutral user-facing label **"Plan Reviews"**
(Initiation/Operation stays internal code framing); (3) **plain operational decision
verbs** (no-change / update-plan / request-observation / create-act-task / pause-act /
escalate) — stewardship framing deferred; (4) persistence via the **versioned-blob
byProject** path mirroring `observationNeedStore`; (5) Phase 1 **records intent only** —
no plan mutation, no Act work, no pause (Phases 2/3).

## Decision

Flags are **derived, not persisted** — recomputed each render from observation-need
views, exactly like auto-needs ([[2026-05-25-atlas-observe-needs-auto]]). Only the
**review run-state** (status + decision + note) persists, mirroring the catalog/run split
of observation needs. The flag id **is** the need id, so a flag and its review join by id.

Shipped as a single commit on `feat/atlas-permaculture` (committed immediately on verify,
per the externally-rebased-branch rule), commit **`48702c66`** (9 files, +989):

- **`v3/plan/impact/planImpactFlag.ts`** (pure) — `PlanReviewDecision` (the 6 verbs),
  `PlanReviewStatus = 'open' | 'reviewed'`, derived `PlanImpactFlag`, persisted
  `PlanReviewRun` + `emptyPlanReviewRun()`, `PLAN_REVIEW_DECISION_LABEL`/`_DECISIONS`,
  and pure `derivePlanImpactFlags(views)` — keeps views where `planImpact` is
  `possible|likely` **and** run status is `recorded|resolved`; sorts likely-before-possible
  then `recordedAt` desc. No store access → unit-testable.
- **`store/planImpactReviewStore.ts`** — persisted under `ogden-plan-impact-reviews` v1,
  `byProject: Record<projectId, Record<flagId, PlanReviewRun>>`, copied structure from
  `observationNeedStore` (`patch` + `now()` helpers, `partialize: {byProject}`,
  `rehydrateWithLogging`). Actions `getReview`/`setDecision`/`setNote`/`reopen`.
- **`lib/syncManifest.ts`** — registered the store in `SYNCED_STORES` (byProject) — the
  coverage-guard test fails the build for any unregistered persisted `ogden-` store.
- **`v3/plan/impact/usePlanImpactFlags.ts`** — view-model hook joining derived flags with
  their persisted runs (`PlanImpactFlagView`) + `usePlanImpactFlagCounts` for the nav badge.
- **`v3/plan/impact/PlanReviewsPage.tsx` + `.module.css`** — a **shelled** child route
  (renders inside the project shell with the sidebar, like `/plan`; not in the full-bleed
  compass allowlist). Open reviews first, then reviewed; each card = module dot + label,
  title, reason, Likely/Possible badge, "View in Observe" link, recordedAt; six decision
  buttons + note textarea; reviewed cards show the recorded decision + note + Reopen.
- **`routes/index.tsx`** — `v3PlanReviewRoute` at `plan/review`, registered **before**
  `plan/$module` so the static path resolves first.
- **`v3/components/V3LifecycleSidebar.tsx`** — "Plan Reviews" entry in the Plan group with
  an open-count badge.

### Key choices

- **Derived flag / persisted run split.** A flag is a pure function of the live
  observation-need state; only the steward's decision + note are new information worth
  persisting. Mirrors the observation-needs and auto-needs patterns rather than inventing
  a parallel store.
- **Flag id = need id.** No separate identity; the review run keys directly off the need
  that raised the flag, so derivation and persistence join trivially.
- **`recorded|resolved` only.** A flag is a *recorded observation that may affect the
  plan* — open/in-progress/anticipated needs are not yet observations, so they don't flag.
- **Shelled route, not full-bleed.** Plan Reviews is a triage list, not a map/compass
  surface; it belongs inside the standard project shell with the nav rail.

## Rationale

The keystone slice closes the explicitly-documented dangling loop with the least new
machinery: the `planImpact` primitive already existed, the catalog/run + versioned-blob
patterns are house conventions, and a derived flag avoids a stale persisted mirror of a
live Observe signal. Recording intent only keeps Phase 1 small and unblocks Phases 2/3
(Decision Log, Work Packages) without prejudging their shape.

## Consequences

- A recorded observation flagged `possible|likely` now appears as a triageable Plan
  Review where a steward records a plain operational decision + note that persists and
  survives reload; the sidebar shows an open-count badge. The Observe→Plan loop is closed.
- **Phase 1 is intent-only.** A decision does **not** yet mutate the plan, create Act
  work, or pause anything — that wiring is Phase 2 (Decision Log) / Phase 3 (Work
  Packages + Plan→Act handoff). Plan Reviews is the nucleus of the future Plan Operation
  Command Centre.
- **Pre-existing tech debt surfaced (not mine):** the `syncManifest` coverage guard fails
  on **7 orphan persisted stores** never registered for sync — `ogden-observation-needs`,
  `ogden-true-north`, `ogden-atlas-{act,observe,plan}-compass`,
  `ogden-atlas-objective-summaries`, `ogden-atlas-stage-gate-override`. Confirmed
  pre-existing via `git show HEAD:…syncManifest.ts` (references none of them); my
  `ogden-plan-impact-reviews` **is** registered and is absent from the failing list.
  Registering them needs a deliberate project-scoped-vs-device-global classification per
  store — out of Phase 1 scope, flagged to the operator as a separate task.
- **Verification:** 11/11 unit tests (`planImpactFlag.test.ts`); `apps/web` `lint`
  (= `tsc --noEmit`) **0 total errors**; browser flow verified end-to-end (flag derives
  from seed data, decision persists to `ogden-plan-impact-reviews` localStorage, Reopen
  reverts status + retains note, sidebar badge updates). Committed `48702c66` and pushed
  `c29d23f4..48702c66` after fetch + divergence check (1 ahead / 0 behind, clean
  fast-forward).

## Connections

- [[2026-05-25-atlas-observe-needs-reframe]] — established the `planImpact` invariant (Observe surfaces, Plan decides)
- [[2026-05-25-atlas-observe-needs-execution]] — added `planImpact` to the `ObservationNeed` entity
- [[2026-05-25-atlas-observe-needs-auto]] — the derived-flag / persisted-run pattern this mirrors
- [[2026-05-25-atlas-plan-to-act-data-derived-gate]] — the adjacent Plan-stage progress/gate work
- [[olos]] — the project this extends (Plan stage; first Plan Operation slice)
