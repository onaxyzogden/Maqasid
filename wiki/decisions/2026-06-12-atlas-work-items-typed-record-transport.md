---
title: "Atlas — Work spine durability: move ogden-work-items from versioned-blob to typed-record transport"
type: decision
date: 2026-06-12
status: accepted
tags: [atlas, olos, work-spine, sync, typed-record, conflict-resolution, sovereign-steward]
superseded_by: null
---

# Atlas — `ogden-work-items` → typed-record transport (option i)

## Context

The WorkItem spine (`workItemStore`, persist key `ogden-work-items`) is the
union-superset store for all schedulable work, and since the livestock
work-management layer ([[2026-06-11-atlas-livestock-work-management-layer]])
it routinely carries dozens of dated rows per project. It syncs today as a
**versioned blob**: one opaque JSONB row per (project, storeKey) in
`project_state_blobs` (migration 027), whole-store last-writer-wins via
`rev`/`baseRev` with a 409 on stale PUT
(`syncManifest.ts:779` — `blob('ogden-work-items', useWorkItemStore,
'projectId-tagged', 4, tagged('items'))`).

Three costs, now material:

1. **Silent whole-store conflict loss** — two devices editing different rows
   (steward reschedules in the field, carer-side marks done at the desk)
   collide at blob granularity; one side's *entire* edit set is dropped with
   no trace. Worst-possible trust failure for a schedule.
2. **No server-side queries** — "what's due this week for project X" requires
   deserialising the blob; blocks any future carer view, reporting, or
   notification surface.
3. **No per-row visibility path** — a carer can never be shown *their* rows
   without full project-blob access.

The typed-record transport already exists and is proven: per-record rows in
`synced_records` (migration 047; PK (project_id, store_key, record_id);
denormalised `observed_at`/`source_type`/`cycle_id`/`task_type` columns),
per-record LWW on `observed_at` with **steward-escalated** conflicts
(migration 048: `sync_log` + `failed_records`; server-newer auto-resolves,
local-newer is escalated for explicit resolution, never auto-applied).
Five stores already ride it (`ogden-field-actions`, `ogden-observe-feed`,
`ogden-observe-data-points`, `ogden-observe-cycles`,
`ogden-olos-proof-records`/`-verification-records`), so hydration, WS fan-out,
queueing, and the server endpoint are registration-only for a new store.

## Decision

**Option i — transport-only promotion.** `ogden-work-items` moves from
`versioned-blob` to `typed-record` in `syncManifest.ts`. The client store
remains the source of truth; *who writes* does not change, only how rows
travel. No new tables, no new routes.

Mechanics:

- **New shape helper `recordTaggedArray(field)`** — the existing four shapes
  (`recordArray`, `recordKeyedMap`, `recordByInnerField`) all serve
  `byProject` stores; `workItemStore` is `projectId-tagged` (flat `items`
  array, each row carrying `projectId`). The new shape enumerates
  `state.items.filter(r => r.projectId === pid)` with `recordId = String(r.id)`
  and upserts by row id on apply, leaving other projects' rows untouched.
- **Meta mapping** — `extractRecordMeta` reads `observedAt`/`sourceType`/
  `taskType` best-effort; WorkItem rows denormalise `observed_at ← updatedAt`,
  `source_type ← source` (e.g. `'livestock-plan'`, `'rotation-sequence'`),
  `task_type ← kind`, enabling server-side due/status/source queries without
  payload parsing.
- **Migration** — follow the `ogden-paths` versioned-blob → typed promotion
  precedent (study it before implementation). Existing `project_state_blobs`
  rows for `ogden-work-items` are read once for hydration safety, then the
  store pushes per-record; the blob row is left inert (no destructive server
  migration — if one proves necessary it requires a `stages/` approval doc
  per the CI/CD safety covenant).
- **`serverId`-gated** — local-only projects (no server uuid) keep working
  purely locally, exactly as today.

## Covenant seams (unchanged, load-bearing)

- `livestockWorkPlanStore.confirmProposal` remains the ONLY proposal→spine
  writer; `fulfilWorkItem`/`fulfilWithGenericProof`/`confirmTypedProofMatch`
  remain the only completion writers; dismissed-stays-dismissed; no
  auto-confirm. The transport never writes through these seams — it moves
  rows the seams already wrote.
- Conflict escalation is **steward-resolved, never auto-applied** (the
  migration-048 semantics) — sovereign-steward preserved at the sync layer.

## UX requirement (binding on the implementation slice)

Escalated conflicts must surface **inside the Act work panel** as a pinned
"Needs your decision" section, following the existing needsReview-proposals
pattern — not in a buried sync log. The resolution moment lives where the
work lives.

## Alternatives rejected

- **(ii) First-class `olos_work_items` table mirroring `olos_act_tasks`**
  (migration 043: 12-state lifecycle, `assignee_id`, PostGIS, requireRole
  RBAC): biggest lift; creates two competing task models with no convergence
  story; drifts toward server-side writers, putting the confirm/fulfil seams
  at re-plumbing risk; its UX payoff (server-enforced per-carer views)
  requires carer *accounts*, which don't exist (`project_members` has no
  field-worker role). Deferred, not foreclosed — option i's per-record rows
  are exactly the shape a future "my work only" endpoint needs.
- **(iii) Hybrid blob-canonical + server read mirror**: cheapest, but
  eventually-consistent (two viewers can see different "same" schedules),
  fixes nothing about whole-blob conflict loss, and adds a driftable second
  representation. Stopgap, not a destination.

## Open follow-ons

1. **Carer accounts** — whether carers become `project_members` (new
   read+mark-done role) or the carer strip stays informational. The main fork
   to any future option-ii layer.
2. **`olos_act_tasks` relationship** — spine absorbs it vs. separate domains
   (designed installation tasks vs. operational work). Undecided.
3. **`ogden-livestock-work-plan` (proposals store)** — stays versioned-blob
   for now; promote in a later pass if proposal-level conflicts surface.

## Provenance

Direction discussed in-chat 2026-06-12 (three options + UX-lens follow-up);
steward approved option i ("go"). Implementation slice planned separately and
gated on its own approval.
