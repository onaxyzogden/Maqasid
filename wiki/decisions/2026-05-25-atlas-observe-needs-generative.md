---
title: "Atlas Observe — generative 'Raise observation need' action"
type: decision
date: 2026-05-25
status: accepted
tags: [atlas, observe, architecture, ui, store, persistence]
superseded_by: null
---

# Atlas Observe — generative "Raise observation need" action

## Context

[[2026-05-25-atlas-observe-needs-execution]] landed the `ObservationNeed` reframe but
**deferred** the generative "Raise observation need" action (spec §5b / §7 step 5). Every
need still came from the static seed catalog (`seedObservationNeeds.ts`); the
`ObservationNeed` entity already carried `origin: 'seed' | 'follow-up' | 'manual'`, `reason`,
`sourceObservationId?`, `trigger?`, and `planImpact?` — the data model was ready, only the
**create path** (store slice + hook merge + form UI) was missing.

This session builds that create path, making Observe self-feeding: recording one observation
can spawn the next.

## Decision

Land the create path as **four green commits** on `feat/atlas-permaculture` (committed
immediately, per the externally-rebased-branch rule):

1. **`b3492475` — store + hook + builder + tests.** Add a `createdByProject:
   Record<projectId, ObservationNeed[]>` slice + `createNeed(projectId, need)` action to the
   observation-need store (persist bumped `version: 2 → 3`; `migrate` defaults the slice to
   `{}` for `fromVersion < 3`; `partialize` widened to `{ byProject, createdByProject }`).
   `useObservationNeeds` merges `seedObservationNeedsForProject(projectId)` with the created
   slice into one catalog, then maps runs over it (downstream unchanged). Add the pure
   `buildRaisedNeed(input, ctx)` builder + 5 tests (27 total green).
2. **`d6de57ee` — Capture Workspace follow-up CTA.** New shared presentational
   `RaiseNeedForm` (title, reason, priority, trigger, plan-impact; optional module picker).
   `CaptureExecutionAside` hosts a "Raise follow-up need" affordance that mints a `follow-up`
   need with `sourceObservationId` = the parent need's id, persists via `createNeed`, and
   **stays in place** with an inline confirmation.
3. **`f2cf1043` — Command Centre manual entry + origin badges.** `OpenObservationNeedsPanel`
   gains a "+ Raise observation need" button (module from the picker, target defaulting to
   the **mean** of existing view centres, fallback site centre) minting a `manual` need; need
   cards render a `seed`/`follow-up`/`manual` origin badge. `projectId` threaded from
   `ObserveCommandCentrePage`.
4. **`b9021a80` — docs.** `OBSERVATION-NEEDS-WORKSPACE.md` moves the generative path from
   "remaining follow-on" to **live**; `BACKLOG-v3.1.md` marks the action DONE.

### Key choices

- **A generated need is a new entity, so it needs its own persisted slice.** The store held
  *run state only* (`byProject`); the hook mapped *only seeds*. Rather than fold generated
  needs into either, a separate `createdByProject` slice keeps the seed catalog immutable and
  the run/catalog split intact — the hook simply concatenates the two catalogs.
- **`buildRaisedNeed` is pure; hosts own id/target/origin/persistence.** The builder takes
  validated form input + a context object and returns an `ObservationNeed`; `crypto.randomUUID()`
  is minted by the caller. This keeps `RaiseNeedForm` store-free and reusable from both
  entry points.
- **A fresh need opens to a clean, not-instantly-recordable workspace.** The built need has
  empty `requiredTools`/`requiredLayers`/`checklist` and a minimal capture package — one
  required `note`-kind "Summary note" evidence + `recordingRule { requireAllRequiredChecklist:
  false, requireAllRequiredEvidence: true, requireSummary: true }`. Because note evidence
  mirrors into `run.summary`, that single textarea satisfies both the evidence gate and the
  summary gate, so the need is recordable with one note and no false "ready to record" state.
- **`sourceObservationId` is a need-to-need link.** In this model "a recorded observation" IS
  a recorded need, so a follow-up's `sourceObservationId` points at the parent need's id.

## Rationale

Committing each green slice immediately is mandatory on `feat/atlas-permaculture` (force-rebased
out-of-band; uncommitted work gets wiped). Keeping the builder pure and the form presentational
makes the two entry points share one code path and keeps the units testable without a store.

## Consequences

- Observe is now self-feeding: a recorded observation can raise a follow-up need, and a
  steward can raise a manual need from the Command Centre. Both persist across reloads
  (localStorage, persist v3).
- **Out of scope (still deferred):** auto-generated needs from stale-data / coverage gaps
  (spec §5c); editing/deleting raised needs (create-only today); backend persistence.
- **Verification:** 27/27 unit tests on `observationNeed.test.ts`; touched files type-clean
  (the pre-existing baseline `tsc` errors — `StepBoundary.tsx`, `HostUnion*.test.tsx`, plus a
  foreign uncommitted `EdgeConnectivityCard.tsx` change — are unrelated); live preview not run
  (auth + WebGL + Windows capture wall, per
  [[2026-05-19-atlas-preview-screenshot-verification-standard]]).

## Connections

- [[2026-05-25-atlas-observe-needs-execution]] — the reframe this builds on
- [[2026-05-25-atlas-observe-needs-reframe]] — the spec (§5b / §7 step 5) this completes
- [[olos]] — the project this extends (Observe stage)
