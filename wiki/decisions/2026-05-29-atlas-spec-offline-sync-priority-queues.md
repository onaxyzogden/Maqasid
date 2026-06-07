---
title: "ADR — Offline sync 5-tier priority queue with divergence-priority"
type: decision
date: 2026-05-29
status: Implemented
deciders: Yousef
supersedes: null
related: [2026-05-29-atlas-spec-act-map-first-surface]
tags: [olos, atlas, adr, offline-sync, priority-queue, divergence]
---

# ADR 12 — Offline sync 5-tier priority queue

## Status
Implemented — 2026-05-30 (accepted 2026-05-29)

## Context
The Offline Sync Spec v1.0 defines a dual-track IndexedDB sync (structured data first, photo blobs after) with a **priority queue** and an unconditional divergence-priority rule: priority-1 records sync before all other queued items regardless of `created_at`. Conflict resolution is last-write-wins (later `observed_at`, tie → server), justified by a single-steward assumption. The spec is **internally inconsistent on the queue depth**: §3.3 (schema) says priorities 1–4, while §5 enumerates 1–5; the 5-tier list is canonical.

Current code state: substrate exists — `apps/web/src/lib/syncQueue.ts` (IndexedDB), `syncService.ts` (circuit breaker), `blobSync.ts` (binary), `proofPhotoStore.ts`. Priority ordering and the divergence-priority gate need verification against the spec's 5-tier list.

## Options considered
- **A. Ratify the 5-tier ordering; resolve the §3.3/§5 contradiction in favour of 5; verify the shipped queue** (recommended).
- B. Implement the §3.3 4-tier schema.

## Decision
Ratify the **5-tier** priority queue and treat the §5 list as canonical:
1. Divergence (highest, unconditional — syncs before all others regardless of `created_at`)
2. Baseline survey
3. Non-baseline survey
4. Monitoring proof
5. Implementation proof

Verify the shipped `syncQueue.ts` ordering against this list and confirm the divergence-priority gate is enforced. **Conflict resolution: ratify the shipped _local-preserving last-write-wins_ — never silently clobber local, surface conflicts, preserve the losing record — as canonical (single-steward assumption holds; resolves the open decision below — see the 2026-05-29 Amendment).**

## Rationale
The 5-tier list is the more complete and more recently reasoned of the two, and divergence-priority is load-bearing (divergence evidence must reach Observe ahead of routine proofs). Resolving in favour of 5 avoids encoding the spec's contradiction into the queue.

## Consequences
- ~~Possible priority-field migration if the shipped queue currently uses 4 tiers.~~ **Resolved by verification (2026-05-29): the shipped queue uses 0 tiers (pure FIFO), so the 5-tier model is a build, not a migration.** See Verification below.
- Multi-user merge UI remains deferred (single-steward assumption holds).
- **Full 5-tier implementation deferred** — depends on ADR 2 (`cycle_id` + a source-tag discriminator on FieldAction) and ADR 7 (typed per-record Act sync replacing opaque versioned-blob sync). It is not a standalone `syncQueue.ts` change.
- **Resolved 2026-05-29 (last-write-wins):** ratified the shipped *local-preserving last-write-wins* as canonical — conflicts are surfaced and local is never silently clobbered. The spec's literal `observed_at`-LWW (with its `sync_log` + data-loss escalation + Keep-mine/Keep-server UI) becomes the target for ADR 7's typed per-record sync; the canonical Offline Sync Spec §2/§6.1 was reconciled to match. See the Amendment below.
- **Doc cleanup to track (non-blocking):** reconcile Offline Sync Spec §3.3 to 5 tiers to match §5. *(Accepted into the canonical source doc 2026-05-29 — changes baked in, doc clean.)*

## Verification — 2026-05-29 (Claude)
ADR 12's action item ("verify the shipped `syncQueue.ts` ordering … and confirm the divergence-priority gate is enforced") was executed read-only. **Verdict: the canonical 5-tier priority queue is not implemented at any layer.** The shipped layer is a *failure-retry* FIFO queue — only failed writes enqueue; the live path hits the API first — and the records the tiers refer to sync as opaque per-project versioned-blobs, so semantic tier is erased at the sync boundary.

| Requirement (§5) | Shipped state | Evidence |
|---|---|---|
| 5-tier priority ordering | Absent — FIFO by `timestamp`; no `priority` on `QueuedOperation` | `syncQueue.ts:32-42`, `:146-148`, `:178` |
| Divergence syncs first (gate) | Not enforced — the divergence flag rides inside the whole-project `ogden-field-actions` blob, pushed by a generic debounced subscriber blind to the divergence | `syncService.ts:1283-1320`, `:1239-1273`; `fieldActionStore.ts:403-425` |
| Tiers 2-5 (surveys, monitoring, implementation proof) | Not representable — `taskType` / `divergenceFlag` / `monitoringKind` collapse to `storeType: 'state-blob'` | `syncManifest.ts:539/546/499` |
| Dual-track (structured before blobs) | Not enforced — single FIFO queue | `blobSync.ts` |
| Last-write-wins | Ratified 2026-05-29 (now canonical) — server-wins-on-init + 409-surfaced, local not clobbered (revision-based; no `observed_at` field exists) | `syncService.ts:904`, `:1058-1077` |
| `cycle_id` on FieldAction | Does not exist | `fieldAction.schema.ts` |

The only discrete, divergence-specific sync op today is the divergence proof photo (`DivergenceCaptureForm.tsx:89-102`, `storeType: 'proof_photo_upload'`); the divergence flag itself is buried in an opaque blob. Building the real 5-tier model requires typed per-record sync ops carrying `source_type` + `cycle_id` — a persistence re-architecture, deferred to ADR 2 then ADR 7 (see Consequences).

## Amendment — 2026-05-29 (last-write-wins resolved)
The "Open decision for Yousef (last-write-wins)" is resolved: **ratify the shipped local-preserving last-write-wins as the canonical conflict strategy.** A sync conflict never silently overwrites local data — it is surfaced (Connectivity badge) and the local copy is retained; the client adopts the server revision for the next push rather than clobbering. (`blobSync.ts:54-68`, `syncService.ts:1035-1077`; asserted by `syncServiceConflict.test.ts:58-65`, `syncServiceBlob.test.ts:78-81`.)

**Why ratify rather than conform the code to literal LWW:**
- The spec frames last-write-wins as a *single-steward simplification*, not a hard requirement, and §6 already mandates a durable `sync_log`, data-loss escalation to `failed_records`, and a Keep-mine/Keep-server UI. The shipped no-clobber behaviour is the **conservative end of the spec's own design**, not a violation of it.
- The shipped conflict path is **revision-based, not timestamp-based** — there is no `observed_at` field in the client `ProjectStateBlob` contract. Conforming to literal `observed_at`-LWW would (a) be *less* safe (silent discard of local edits on a timestamp race) and (b) presuppose the typed per-record persistence that does not exist yet (today every record rides the opaque versioned-blob transport).

**Handoff to ADR 7 (typed per-record Act sync), after ADR 2 (`cycle_id`):** implement the full spec §6 model *within* a never-clobber envelope — auto-resolve by `observed_at` only where provably non-destructive, otherwise escalate + surface + log — and provide the durable `sync_log` and Keep-mine/Keep-server UI the spec specifies. This is where literal LWW (if still wanted) would land, per-record, not in `syncQueue.ts`.

**Residual gap (revisit in the ADR 7 rework, not now):** init-time hydration does server-wins **unconditionally, silently, and unlogged** (`syncService.ts:891-1017` `mergeDesignFeatures`, `:1118-1178` `hydrateProjectStateBlobs`) — the one place shipped is *less* safe than the ratified invariant. When sync moves to typed per-record ops, init-time conflicts should also be logged/surfaced rather than silently clobbering un-synced local edits.

**Canonical source reconciled:** Offline Sync Spec v1.0 §2 (executive summary) and §6.1 (conflict model) were updated to state *local-preserving last-write-wins* (tracked change accepted 2026-05-29), so the spec and this ADR agree. §6.1's escalation/`sync_log` cells, the single-steward call-out, and the §9.2/§11 Keep-mine/Keep-server criteria already matched and were left as-is.

**No code change:** the shipped behaviour and its tests already encode this decision; nothing in `atlas/` was modified.

## Implementation — 2026-05-30
The full 5-tier priority queue and the §6 conflict model landed across the ADR 7 program (sequenced after ADR 2's `cycleId`), all local on `feat/atlas-permaculture`:
- **Phase 2 (commit `707cc16e`)** — `SyncPriority = 1|2|3|4|5` + `derivePriority` + a single `compareQueuedOps` shared by `getAll`/`getBatch`; divergence is unconditional tier 1, and dual-track ordering puts structured `typed-record` ops before `proof_photo_upload` blobs at equal priority. Unit tests pin ordering = **[divergence, baseline survey, non-baseline survey, monitoring, implementation]** and divergence preempting an older backlog. No IndexedDB migration (in-memory sort; missing-priority ops sort lowest).
- **Phase 3 (commit `3605dddb`, migration `048`)** — durable append-only `sync_log` audit written on **every** 409 + the `failed_records` escalation queue; the server resolves on `observed_at` under the ratified *local-preserving* LWW (`auto_resolved` only where provably non-destructive, tie → server per §6.1; else `escalated`; the stale local payload is **never** applied). The silent init-clobber gap is closed via a pending-op dirty check in hydration.
- **Phase 4 (commits `6f4cd06c` conflict list/resolve API + contracts, `7309504c` live-Postgres integration tests, the client conflict orchestration [`apiClient` methods + `connectivityStore` persist/reconcile + `syncService` resolution], and `e28ed6cb` the dedicated `/conflicts` Keep-mine/Keep-server panel reached from the `OfflineBanner` badge)** — delivered the steward resolution surface the spec's §9.2/§11 specify.

The never-clobber invariants and their tests were preserved throughout. Logged: [[log]] (2026-05-30 program-close entry). This ADR is now **implemented**.

## Connections
- Review: [[2026-05-29-olos-new-spec-suite-review]]
- Related: [[2026-05-29-atlas-spec-act-map-first-surface]], [[2026-05-29-atlas-spec-spiral-cycle-id-propagation]]
- **Build prerequisites (deferred 5-tier implementation):** [[2026-05-29-atlas-spec-spiral-cycle-id-propagation]] (`cycle_id` + source tag) then [[2026-05-29-atlas-spec-act-map-first-surface]] (typed per-record Act sync). Verified 2026-05-29 — not implemented; see Verification section.
- Source: OLOS_Offline_Sync_Spec_v1.0; existing substrate syncQueue.ts, syncService.ts, blobSync.ts, proofPhotoStore.ts
