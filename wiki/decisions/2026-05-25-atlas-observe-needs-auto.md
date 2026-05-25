---
title: "Atlas Observe — auto-generated observation needs (gaps + stale data)"
type: decision
date: 2026-05-25
status: accepted
tags: [atlas, observe, architecture, derived-state, persistence, field-verification]
superseded_by: null
---

# Atlas Observe — auto-generated observation needs (gaps + stale data)

## Context

[[2026-05-25-atlas-observe-needs-generative]] landed the *manual/follow-up* create path
but **deferred §5c — system-generated needs**: Observe should itself notice where
attention is owed and surface a need without anyone asking. Two live signals already
existed in the codebase and only needed to be read:

1. **Coverage gaps** — a domain with **zero** field records. `useEvidenceCounts`
   already returns one row per Observe domain; `n === 0` is a gap.
2. **Stale data** — a layer whose time-decayed evidence has fallen back to
   `unverified`. [[2026-05-23-atlas-field-verification-axis]]
   (`computeFieldVerification`, half-life 3yr) already produces a per-layer
   `level`; `level === 'unverified'` is stale.

**Locked decisions (confirmed with the operator):** signal scope = **both** gaps +
stale; dismissal = **observe or dismiss**; surfacing = **same grid, `Auto` badge**.

## Decision

Auto-needs are **derived, not persisted** — recomputed each render and merged into the
shared catalog with `origin: 'auto'`. Only their **run-state** persists (the existing
`byProject` slice), keyed by **deterministic ids** so a cleared auto-need stays cleared
across reloads:

- `auto-gap-<rowKey>-<projectId>`
- `auto-stale-<layerType>-<projectId>`

Shipped as commit slices on `feat/atlas-permaculture` (committed immediately, per the
externally-rebased-branch rule):

1. **`1dde1936`** — pure `autoObservationNeeds.ts` (`buildAutoNeed`,
   `detectCoverageGapNeeds`, `detectStaleNeeds`, `meanCenter`, `isDismissedAutoNeed`)
   + `ObservationNeedOrigin` widened to include `'auto'` + shared `minimalCapturePackage()`
   factored out of `buildRaisedNeed` + 11 tests (38 total green).
2. **`0e1a7a5d`** — `useEvidenceCounts` rows gain `key` + `module`; `useObservationNeeds`
   reads both signals, computes a shared `center`, runs both detectors, and appends the
   auto-needs to the catalog before mapping runs.
3. **Display layer (Auto badge + Dismiss + suppression) — implemented but parked
   uncommitted** as `slice3-auto-needs-display.patch`. It is entangled at the hunk level
   with an in-flight Observe dashboard-shell rework (foreign WIP across the same three
   command files + 3 untracked deps) and cannot be committed in isolation; it will land
   with that shell. See Consequences.
4. **`c29d23f4`** — docs: `OBSERVATION-NEEDS-WORKSPACE.md` §5c moves to **live**;
   `BACKLOG-v3.1.md` marks §5c DONE.

### Key choices

- **Suppression at the display layer, not the hook.** `isDismissedAutoNeed(view)` (auto
  + run status `recorded` | `resolved`) is applied in `ObserveCommandCentrePage` so
  cleared auto-needs drop off the carousel/map/timeline — but the **singular**
  `useObservationNeed(projectId, needId)` (which reuses the plural hook to resolve the
  Capture Workspace by id) still resolves the id mid-record. If the hook itself dropped
  dismissed auto-needs, recording one would break its own workspace mid-session.
- **Deterministic ids over random.** A recorded/dismissed auto-need must stay cleared
  across reloads even though the need object is re-minted each render, so the id is a
  pure function of signal + project, not `crypto.randomUUID()`.
- **Reuse the run-state slice; no new persisted store.** Auto-needs ride the existing
  `byProject` run-state; nothing about the auto-need itself is persisted.
- **`isDismissedAutoNeed` takes a structural param**, not the hook's view type, to avoid
  an import cycle between the detector module and `useObservationNeeds`.

## Rationale

The two signals were already computed for other surfaces (GapsPanel, the
field-verification axis); §5c is mostly *reading* them and minting needs. Keeping
auto-needs derived/ephemeral mirrors the existing GapsPanel/`useFieldVerification`
recompute pattern and avoids a stale persisted mirror of a live signal.

## Consequences

- Opening the Command Centre on a sparse or aging project now shows actionable,
  self-generated needs that disappear once recorded or dismissed — no curation.
- **Display layer parked uncommitted.** The detection + catalog merge are live and
  committed, so auto-needs already appear in the grid; the `Auto` badge, `Dismiss`
  button, and display-layer suppression sit in `slice3-auto-needs-display.patch`
  (with a `.README.md` mapping which hunks are §5c vs the foreign shell) until the
  dashboard-shell rework commits.
- **v1 limitation:** once a deterministic id is `recorded`/`resolved` it stays
  suppressed even if the same signal recurs later (re-decay). Re-raising on re-decay
  is a follow-on.
- **Still deferred:** editing/deleting raised needs; per-observation target geometry
  (auto-needs target the mean/site centre); backend persistence.
- **Verification:** 38/38 unit tests (`autoObservationNeeds.test.ts` + `observationNeed.test.ts`);
  touched files type-clean (pre-existing baselines — `StepBoundary.tsx`,
  `ObserveAnnotationLayers.tsx` waterRouter, `HostUnion*.test.tsx` — are unrelated and
  foreign); live preview not run (auth + WebGL + Windows capture wall, per
  [[2026-05-19-atlas-preview-screenshot-verification-standard]]).

## Connections

- [[2026-05-25-atlas-observe-needs-generative]] — the manual/follow-up create path this extends
- [[2026-05-25-atlas-observe-needs-execution]] — the reframe both build on
- [[2026-05-23-atlas-field-verification-axis]] — the stale-data signal source
- [[olos]] — the project this extends (Observe stage)
