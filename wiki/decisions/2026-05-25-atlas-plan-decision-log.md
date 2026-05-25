---
title: "Atlas Plan — Decision Log (authored records behind review verbs)"
type: decision
date: 2026-05-25
status: accepted
tags: [atlas, plan, observe, architecture, persistence, command-centre, decision-log]
superseded_by: null
---

# Atlas Plan — Decision Log (authored records behind review verbs)

## Context

Phase 1 ([[2026-05-25-atlas-plan-impact-flags]], commit `48702c66`) shipped **Plan
Reviews**: every recorded observation flagged `planImpact: possible|likely` surfaces as a
triage card where a steward records a *thin* decision — one of six operational verbs
(`no-change｜update-plan｜request-observation｜create-act-task｜pause-act｜escalate`) plus a
free-text note, persisted in `planImpactReviewStore`. That closed the Observe→Plan loop but
**records intent only**: the verb sits on the review run and nothing consumes it.

Phase 2 adds the **Decision Log** — the durable, *authored* record behind those verbs. A
decision captures the full reasoning a steward stands behind: **verb + headline + rationale
+ assumptions + trade-offs + source observations + status + dates**. It is the keystone the
roadmap calls "feeds everything downstream": Phase 3 will read *accepted* decisions (esp.
`create-act-task`) to generate Act Work Packages. Phase 2 itself still **records only** — no
plan mutation, no work-package generation, no Act handoff.

**Locked decisions (confirmed with the operator):** (1) **Origin = promote + standalone** —
a *reviewed* Plan Review card gains a "Log decision →" action that pre-fills a draft from the
flag + review; stewards can also author a decision from scratch on the Decision Log page (the
log does not depend on a flag existing). (2) **Status = `draft｜accepted｜superseded｜
rejected`** — full lifecycle: a rejection record *and* a supersession chain. (3) **Decision
field = verb + free-text headline** — reuse Phase 1's six `PlanReviewDecision` verbs as the
structured signal Phase 3 keys off, plus a free-text headline summarizing the specific call.

## Decision

Unlike Phase 1's derived-flag / persisted-thin-run split, a decision is **authored whole**,
so the store holds complete `PlanDecision` records (mirroring `createdByProject` in
`observationNeedStore`, not a catalog/run split). Derivation logic stays pure and
unit-testable (sorting + the promote-from-flag / superseding mappings).

Shipped as a single commit on `feat/atlas-permaculture` (committed immediately on verify,
per the externally-rebased-branch rule), commit **`c36bb5a6`**:

- **`v3/plan/decisions/planDecision.ts`** (pure) — re-uses `PlanReviewDecision` +
  `PLAN_REVIEW_DECISIONS` + `PLAN_REVIEW_DECISION_LABEL` from `../impact/planImpactFlag.js`
  as the decision **verb** (does not redefine the taxonomy). Adds `PlanDecisionStatus`
  (`draft|accepted|superseded|rejected`) + `PLAN_DECISION_STATUS_LABEL` +
  `PLAN_DECISION_STATUSES` (display order) + a `STATUS_RANK` map; `PlanDecisionSource`
  (`{observationId, title, module: ObserveModule}` — a snapshot at link time);
  `PlanDecision` (id, projectId, verb, headline, rationale, assumptions, tradeoffs, status,
  sources[], `affectedModule?: PlanModule`, `supersedesId?`, createdAt, updatedAt,
  decidedAt?); pure `emptyPlanDecision(projectId)`, `buildDecisionFromFlag(flag, review)`
  (verb = `review.decision ?? 'no-change'`, rationale = `review.note`, single source
  snapshot, status draft), `buildSupersedingDraft(prev)` (copies reasoning, sets
  `supersedesId`, clones sources), and `sortDecisions(decisions)` (STATUS_RANK then
  `updatedAt` desc). No store access → unit-testable.
- **`store/planDecisionStore.ts`** — persisted under `ogden-plan-decisions` v1,
  `byProject: Record<projectId, Record<decisionId, PlanDecision>>`, copied structure from
  `planImpactReviewStore` (`patch` + `now()` helpers, `partialize: {byProject}`,
  `rehydrateWithLogging`). Actions `getDecision`/`create`/`update` (stamps `updatedAt`)/
  `setStatus` (stamps `decidedAt` for accepted|rejected)/`remove` (drafts)/
  `supersede(projectId, oldId)` → marks old `superseded` + creates a seeded draft, returns
  the new id.
- **`lib/syncManifest.ts`** — registered `ogden-plan-decisions` in `SYNCED_STORES`
  (byProject) — the coverage-guard test fails the build for any unregistered persisted
  `ogden-` store.
- **`v3/plan/decisions/usePlanDecisions.ts`** — `usePlanDecisions(projectId)` (sorted) +
  `usePlanDecisionCounts(projectId)` (`{draft, accepted, superseded, rejected, total}`) for
  the sidebar badge (badge shows the draft count).
- **`v3/plan/decisions/PlanDecisionLogPage.tsx` + `.module.css`** — a **shelled** child
  route (renders inside the project shell with the sidebar, like `/plan/review`; not in the
  full-bleed allowlist). "New decision" button; sections grouped by status (Drafts →
  Accepted → Superseded → Rejected). Editable DraftCard (verb buttons, headline input, three
  reasoning textareas, optional `affectedModule` select, read-only source chips, Accept /
  Reject / Delete); read-only RecordedCard (verb + headline + fields + source chips + status
  badge + decidedAt; accepted cards show **Supersede →**).
- **`v3/plan/impact/PlanReviewsPage.tsx`** (the bridge) — a reviewed card gains a
  **"Log decision →"** button: `create(projectId, buildDecisionFromFlag(flag, review))` then
  navigates to `plan/decisions`. Purely additive (verb/note/Reopen untouched).
- **`routes/index.tsx`** — `v3PlanDecisionLogRoute` at `plan/decisions`, registered next to
  `v3PlanReviewRoute` and **before** `plan/$module` (static before param).
- **`v3/components/V3LifecycleSidebar.tsx`** — "Decision Log" entry peer to "Plan Reviews"
  in the Plan group, draft-count badge from `usePlanDecisionCounts`.

### Key choices

- **Authored-whole record, not catalog/run.** A decision is new information the steward
  authors in full; there is no live source to re-derive it from, so the store holds complete
  records (mirrors `observationNeedStore.createdByProject`, not Phase 1's derived-flag split).
- **Reuse the six Phase 1 verbs as the structured signal.** The verb is what Phase 3 keys
  off; the free-text headline carries the specific call. No new taxonomy.
- **Source = snapshot at link time.** `PlanDecisionSource` copies `{observationId, title,
  module}` so the log reads correctly even if the source need later changes.
- **`affectedModule` is steward-set, not auto-mapped.** `ObserveModule` (the source's
  taxonomy) ≠ `PlanModule`; the optional `affectedModule: PlanModule` is chosen in the form
  to aid Phase-3 work-package routing, never auto-derived across the taxonomy gap.
- **Supersession marks immediately.** Creating a superseding draft marks the old decision
  `superseded` at once (simple, predictable) rather than a deferred mark-on-accept link.

## Rationale

The Decision Log is the durable record the roadmap names as "feeds everything downstream."
Building it as an authored-whole store with pure helpers keeps the new machinery minimal and
testable, reuses the house versioned-blob + `byProject` conventions, and reuses Phase 1's
verb taxonomy so Phase 3 has a clean structured signal (`create-act-task` on an accepted
decision) without prejudging the work-package shape. Recording intent only keeps Phase 2
small and unblocks Phase 3.

## Consequences

- A steward can author a decision from scratch or promote one from a reviewed Plan Review;
  decisions carry verb + headline + rationale + assumptions + trade-offs + source snapshots
  + status, move through draft → accepted/rejected, and support a supersession chain — all
  persisted and surviving reload. The sidebar shows a draft-count badge.
- **Phase 2 is intent-only.** Accepting a decision does **not** generate Act Work Packages,
  mutate any of the 15 Plan modules, pause Act, or create observation needs — that wiring is
  Phase 3 (Work Packages + Plan→Act handoff). The Decision Log + Plan Reviews are the
  nucleus of the future Plan Operation Command Centre.
- **Verification:** 14/14 unit tests (`planDecision.test.ts` — `emptyPlanDecision`,
  `buildDecisionFromFlag` incl. the `?? 'no-change'` fallback, `buildSupersedingDraft`,
  `sortDecisions` grouping + `updatedAt` desc + no-mutation, status-label completeness) plus
  the existing syncManifest coverage guard; my Phase 2 files are type-clean. Four
  **pre-existing, unrelated** `tsc` errors persist in files outside this changeset
  (`features/project/wizard/StepBoundary.tsx`, `v3/plan/impact/__tests__/
  planImpactFlag.test.ts`, `v3/plan/layers/__tests__/HostUnion{ContextMenu,DrilldownCard}.
  test.tsx`) — same baseline documented in Phase 1. Browser flow verified end-to-end
  (New → fill → Accept → persist to `ogden-plan-decisions` localStorage; Supersede chain;
  Plan Reviews "Log decision →" bridge with source chip back to Observe; all test mutations
  cleaned from localStorage afterward). Committed `c36bb5a6` and pushed
  `97cf2472..c36bb5a6` after fetch + divergence check (1 ahead / 0 behind).

## Connections

- [[2026-05-25-atlas-plan-impact-flags]] — Phase 1; supplies the six verbs + the reviewed-card bridge this promotes from
- [[2026-05-25-atlas-observe-needs-reframe]] — established the `planImpact` invariant (Observe surfaces, Plan decides)
- [[2026-05-25-atlas-observe-needs-auto]] — the authored-whole `createdByProject` slice pattern this mirrors
- [[2026-05-25-atlas-plan-to-act-data-derived-gate]] — the adjacent Plan-stage progress/gate work
- [[olos]] — the project this extends (Plan stage; second Plan Operation slice)
