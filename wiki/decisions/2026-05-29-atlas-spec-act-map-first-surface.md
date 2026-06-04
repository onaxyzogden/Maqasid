---
title: "ADR — Map-first Act surface (promote prototype to live)"
type: decision
date: 2026-05-29
status: Implemented (data-layer rework; map-first surface pending)
deciders: Yousef
supersedes: null
related: [2026-05-29-atlas-spec-plan-output-enum, 2026-05-29-atlas-spec-offline-sync-priority-queues]
tags: [olos, atlas, adr, act, field-actions, map-first]
---

# ADR 7 — Map-first Act surface

## Status
Implemented — 2026-05-30 (Act data-layer rework, Phases 0–4; accepted 2026-05-29)

> **Scope note (honest):** the Act **data-layer rework** this ADR hosts — typed per-record sync, the 5-tier priority queue, the §6 conflict model, and the Keep-mine/Keep-server resolution UI — is fully landed and verified. The **map-first surface promotion**, this ADR's original *headline* decision, remains sequenced as separate, not-yet-built work (per the original "commit the direction now, sequence the build" call). Do not read this status as "the map-first Act surface shipped."

## Context
The spec defines Act as mobile-first and map-first: the map fills the viewport, with View A (objective execution) and View B (all-tasks dashboard) floating as bottom-sheets (mobile) or side-panels (tablet/desktop). The Handoff Index ratifies "View A must ship with the Act map view — a single unit" and "the three-panel Plan layout must not be applied to Act."

The Act surface is described by **two mid-rename sibling specs**: Field Actions Center v1.1 (map view + verifier UX + Observe-feed table) and Act Command Center v1.1 (source-tagging data model + 4-value `task_type` + companion-spec wiring). Neither standalone is complete, and the CTA label differs between them.

Current code state: the live `/act/field-action` is **rail-with-map** (`ActFieldActionLayout.tsx`); the map-first surface exists only as a throwaway prototype at `/act/tier-prototype`. The live surface is the divergent one.

## Options considered
- **A. Promote map-first to live, retire rail-with-map, reconcile the sibling specs** (recommended).
- B. Keep rail-with-map as the production surface (contradicts ratified spec).
- C. Commit to the direction now but sequence the build after the Phase 3 data-layer work.

## Decision
Promote the map-first surface to the live Act surface and retire rail-with-map. Reconcile the sibling specs: **Act Command Center = authoritative data model**, **Field Actions Center = authoritative map + verifier UX**, unified under the name "Field Actions Center". The CTA standardises to **"Launch Field Actions Center"**. The direction is committed now; the build may be sequenced to follow the Phase 3 data-layer additions (source tags, `task_type`, `cycle_id`).

## Rationale
The spec and ratified decisions are unambiguous, and the prototype already proves the direction. The honest caveat is that this is the heaviest UI lift in the set, so decoupling "commit to direction" from "ship the rework" lets data-layer work proceed without blocking on the surface.

## Consequences
- Meaningful Act-surface rework plus a CTA-label reconciliation.
- Resolves the two-source-of-truth ambiguity for the Act stage.
- Sequencing note: pair the surface promotion with the Phase 3 schema additions in ADRs 2 and 9.
- **Home of the typed-record sync rework that ADR 12 depends on.** Verification (2026-05-29) found FieldAction/proof data syncs as opaque per-project versioned-blobs, which erases the semantic tier ADR 12's 5-tier priority queue needs. This Act data-layer rework is where persistence moves to typed per-record sync ops (carrying `source_type` + `cycle_id`); sequence ADR 12's queue + divergence-gate work into it, after ADR 2.

## Implementation
**Phases 0–4 of the data-layer rework landed 2026-05-29 → 2026-05-30 (Phase 0 commit `d2937cdf`; Phase 1 commit `b604d02a`; Phase 2 commit `707cc16e`; Phase 3 commit `3605dddb`; Phase 4 commits `6f4cd06c` [conflict list/resolve API + contracts] → `7309504c` [live-Postgres integration tests] → client conflict orchestration [`apiClient` methods + `connectivityStore` persist/reconcile + `syncService` resolution] → `e28ed6cb` [dedicated `/conflicts` panel + route + badge link]; all local).** The rework is sequenced as five gated slices: Phase 0 foundation (ADR 2 `cycleId` + 4-value `taskType` + `sourceObjectiveType`/`observedAt` discriminators + Zustand migrate infra - DONE, zero transport change); Phase 1 typed per-record sync transport (`synced_records` table + `act-records` endpoint + client typed-record path - DONE; `FLAGS.SYNC_STATE_BLOBS`-gated so inert until enabled, never-clobber preserved per record, verified vs live Postgres); Phase 2 the 5-tier divergence-first priority queue (ADR 12) - DONE (`SyncPriority` + `derivePriority` + a single `compareQueuedOps` that `getAll`/`getBatch` share; divergence unconditional tier 1; zero IndexedDB migration via in-memory sort, missing-priority ops sort lowest; divergence proof photo + diverged record both enqueue at priority 1; 39 sync tests green incl. preserved per-record/blob no-clobber); Phase 3 the section-6 conflict model - DONE (migration `048`: durable append-only `sync_log` audit written on every 409 + `failed_records` escalation queue; the server resolves keyed on `observed_at` under ratified LWW - `auto_resolved` only where provably non-destructive [`localObserved <= serverObserved`, tie → server per section 6.1], else `escalated`, and the server **never applies the stale local payload**; the client adopts `serverRev` either way, surfaces only `escalated`, suppresses `auto_resolved`; the silent init-clobber gap is closed in `hydrateActRecords`/`hydrateProjectStateBlobs` via a pending-op dirty check that skips + warns rather than overwriting un-synced local edits [`mergeDesignFeatures` left out of scope]; 21 web sync tests + 4 live-Postgres integration cases green, the per-record/blob no-clobber invariants preserved); **Phase 4 the Keep-mine/Keep-server resolution UI — DONE**: `connectivityStore.conflictedStores` now persists + reconciles (plus a `resolveConflict` action); the `OfflineBanner` renders the conflict-count badge with a "Review & resolve →" link; a dedicated auth-gated `/conflicts` panel (`apps/web/src/conflicts/SyncConflictsPage.tsx`) lists each conflicted record with its **local-vs-server** payloads and Keep-mine / Keep-server buttons wired through `syncService` to the server resolve endpoint (flips the `sync_log` row to `resolved`, drops the `failed_records` row); 5 happy-dom component tests render the populated resolution surface, and badge → panel navigation + the panel render were screenshot-verified in preview on 2026-05-30 (the dev DB had no seeded escalations, so the populated surface rests on the component tests). Phase 4 gate met; **program DoD met**. The map-first **surface** promotion (this ADR's headline decision) stays sequenced after the data layer, per the original "commit direction, sequence the build" call. Logged: [[log]] (2026-05-29).

## Connections
- Review: [[2026-05-29-olos-new-spec-suite-review]]
- Related: [[2026-05-29-atlas-spec-plan-output-enum]], [[2026-05-29-atlas-spec-offline-sync-priority-queues]], [[2026-05-29-atlas-spec-spiral-cycle-id-propagation]]
- Existing ADRs: [[2026-05-25-atlas-act-command-centre]], [[2026-05-27-atlas-act-tier-shell-prototype]]
- Memory: [[project_act_tier_shell]]
