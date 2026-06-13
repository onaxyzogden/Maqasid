---
title: "Atlas — Community work-management layer: Intentional Community Plan decisions spawn dated work, steward confirms, Act executes"
type: decision
date: 2026-06-12
status: implemented
tags: [atlas, olos, ecovillage, intentional-community, work-spine, act, tier-shell, plan, sovereign-steward, amanah]
superseded_by: null
---

# Atlas — Community work-management layer

## Context

Steward objective: **"Ensure Intentional Community planning and
implementation can be managed via OLOS without relying on external project
management tools."** Plan authored on Fable 5, execution delegated to
Opus 4.8 / Sonnet 4.6 subagents per a per-phase model-routing table; the
steward approved the Session Execution Plan before any code.

"Intentional Community" is the **`ecovillage`** project type (display label
"Ecovillage (Intentional Community)"). It already had deep Plan-side
structure — 31 objectives, 19 Tier-0, 9 bespoke captures with pure decoders
(LegalGovernance, ProvisionBalance, ConflictFramework, CarryingCapacity,
Landscape, SocialFabric, InfraCondition, AdaptiveManagement, ExitSuccession)
and 4 standing eco-protocols — but none of it produced dated work. The
just-closed livestock layer ([[2026-06-11-atlas-livestock-work-management-layer]])
provided the exact missing shape: generation engine → proposal store →
`confirmProposal` → WorkItem spine → unified Act schedule. The audit found
that layer nearly domain-neutral already; the livestock-specific parts were
the generator, the cadence catalogue, the store's hardcoded config, and the
input adapter.

**Six binding steward decisions (AskUserQuestion, pre-plan):**
1. Scope includes two NEW captures: `SettlementPlanCapture`
   (ev-s7-settlement-plan) and `OnboardingCapture` (ev-s7-onboarding).
2. Store architecture = shared factory `createWorkPlanStore(config)`;
   livestock re-based with **zero behavior change** (existing suites pin it,
   zero test-file edits).
3. Settlement c5 "not self-reported" acknowledgement = hard validity gate.
4. Trial residency work = end-of-trial review only (no mid-trial cadence).
5. Settlement c6 population maximum = manual entry + display-only derived
   scheduled total (no live carrying-capacity coupling).
6. Settlement c3 arrival criteria = independent register, display-only
   seeded from c2 thresholds, bakes on first edit.

## Decision

Reuse the livestock architecture wholesale by **extracting it into a
domain-neutral factory**, then instantiating a second (community) domain
beside it. Generation stays structurally advisory: community proposals live
in their own store and cannot reach the spine except through the operator's
`confirmProposal`.

```
resolveProjectProtocols (∩ COMMUNITY_PROTOCOL_CADENCES) ─┐
decodeConflictFramework / AdaptiveManagement /            │ adapter   generateCommunityWorkPlan()   communityWorkPlanStore
ProvisionBalance ratify / Steward invites / LegalGov c7 / ┼────────▶  pure, packages/shared  ─diff─▶ proposed│confirmed│dismissed
ExitSuccession c5 / settlementPhasesFrom /                │           rules + 90d instances              │ confirmProposal (ONLY spine writer)
onboardingPipelineFrom (actEvidenceStore.visionFormData) ─┘                                              ▼
                                                            workItemStore (source:'community-plan', id cmw__*,
                                                            generatedFromCommunityPlan = instance key)
```

### Phase 0 — factory extraction (commit `66cc8348`)
- NEW `apps/web/src/store/createWorkPlanStore.ts` (476 lines): the entire
  proposal lifecycle lifted verbatim from `livestockWorkPlanStore.ts`,
  parameterized by `WorkPlanStoreConfig<R, I>` = `{ persistName,
  proposalIdPrefix, workItemIdPrefix, source, provenanceField,
  extraSpineFields?(instance, edited) }` over structural rule/instance
  bases. Factory owns persist (idb), `applyGeneration` (diffWorkPlan +
  same-hash same-reference preservation + suppressedReviewFor dedup),
  edit/confirm/confirmAll/dismiss/restore/`resolveReview` (all 3 arms;
  `extraSpineFields` routed through BOTH `buildWorkItem` and the
  accept-update spine patch). Provenance value = the INSTANCE KEY string
  (real livestock behavior preserved over the plan sketch's boolean).
- `livestockWorkPlanStore.ts` re-based as a 99-line thin instantiation; all
  public exports preserved via aliases. `diffWorkPlan` genericized
  `<T extends WorkPlanInstanceLike>` (type-only).
- Gate: 84 tests across 10 livestock pinning suites green with ZERO
  test-file edits (steward decision 2 honored).

### Phase 1 — shared schema + cadences (commit `c5128317`)
- NEW `packages/shared/src/schemas/communityWork/communityWork.schema.ts`:
  `CommunityWorkKind` (governance-meeting, commons-review, adaptive-review,
  five-year-review, member-ratification, onboarding-step, legal-review,
  settlement-milestone, custom); `CommunityWorkSourceKind` (protocol,
  governance, adaptive, membership, legal, settlement, onboarding);
  recurrence = `WorkItemRecurrence ∪ {once, fortnightly, biannual,
  every-5-years}` — **proposal-layer only, never written to the spine**.
- NEW `constants/communityWork/protocolCadences.ts`:
  `COMMUNITY_PROTOCOL_CADENCES` maps `eco-governance-decision-cadence` and
  `eco-common-land-stewardship` → quarterly. The threshold/judgment
  protocols (`eco-shared-resource-load`, `eco-member-capacity-balance`) are
  deliberately absent — event-driven, not calendar-generable.
- `expandRecurrence.ts` gained additive `anchorDatesInRange()` (existing
  body byte-identical).

### Phase 2 — pure generator (commit `250d724e`)
- NEW `packages/shared/src/communityWork/generateCommunityWorkPlan.ts`
  (978 lines): pure `(input) → {rules, instances}`; rule keys
  `cwp__<sourceKind>__<sourceId>[__discriminators]`; one-off instance key
  `<ruleKey>__once`; horizon 90d.
- Seven sources: (a) ConflictFramework review cadence (check-in /
  governance meeting / annual / full / five-year — the governance cadence
  **supersedes** the eco-governance protocol rule); (b) AdaptiveManagement
  annual review (anchor month from the timing option string, facilitator →
  suggestedCarer) + five-year comprehensive; (c) protocols ∩
  `COMMUNITY_PROTOCOL_CADENCES`, scopeNotes verbatim; (d) member
  ratification one-offs from ProvisionBalance pending ratify members, with
  steward team-member invites as fallback ONLY when the ratify capture is
  absent; (e) aggregate legal-review one-offs from LegalGovernance c7
  uncleared advice gates and ExitSuccession c5 'off' toggles
  (**presence-gated** — the decoders seed defaults); (f) settlement
  milestones from `settlementPhasesFrom` (dated rows only,
  `explicitDueDate` HASHED so a date edit flags `needsReview 'changed'`);
  (g) onboarding steps × pending members from `onboardingPipelineFrom`
  (12-step/member cap, includes the end-of-trial review step).
- One-off hash rule: explicit dates hashed; synthesized fallback dates
  (today+14 for undated membership/legal work) NOT hashed — no churn on
  regeneration. Fortnightly = even-epoch-week Mondays; biannual = Jan 1 +
  Jul 1; every-5-years = founding-year-anchored.
- 49 covenant tests (option→recurrence tables verbatim, supersede rules,
  key/hash stability, purity, empty→empty).

### Phase 3 — two new captures (commit `53a4227a`)
- NEW `SettlementPlanCapture.tsx` (1002 lines + CSS): c1 cohort,
  c2 habitability thresholds, c3 independent arrival-criteria register
  (display-only seed from c2, bakes on first edit), c4 phase schedule (the
  engine payload), c6 capacity fit (manual maxPopulation + display-only
  derived scheduled total), c5 enforcement with the
  **`notSelfReportedAck` hard validity gate** and the objective scope note
  verbatim ("Habitability thresholds must be verified by someone other than
  the arriving household. Self-certification is not sufficient.").
- NEW `OnboardingCapture.tsx` (907 lines + CSS): c1 application steps,
  c2 trial (duration + expectations/review criteria, NO mid-trial cadence),
  c3 membership criteria/confirmation, c4 orientation modules,
  c6 two verbatim confirm toggles (community agreements, dispute-resolution
  pathway — both required), c5 mentorship. No member roster — members come
  from ProvisionBalance/Steward on the engine side.
- Pure exports `settlementPhasesFrom` / `onboardingPipelineFrom` feed the
  generator. Registration additive across workbenchAffordances /
  DecisionList / ActTierZeroWorkbench / DecisionWorkingPanel; content
  source binding = the ecovillage catalogue, titles verbatim, decode never
  seeds defaults. 101 new capture/routing tests.

### Phase 4 — store + adapter + sync (commit `953ca7a7`)
- `workItem.schema.ts`: additive `'community-plan'` source +
  `generatedFromCommunityPlan` optional field; NO schemaVersion bump.
- NEW `communityWorkPlanStore.ts` (95 lines): factory instantiation —
  persist `ogden-community-work-plan`, ids `cwp-`/`cmw__`, no
  extraSpineFields.
- NEW `features/community/communityWorkInputs.ts`:
  `buildCommunityWorkGenerationInput` (decoder-routed, presence gates,
  supersede rules, foundingYear from createdAt);
  `generateAndApplyCommunityWork(projectId): number` (sole effect:
  `applyGeneration` — never the spine; returns proposed count);
  `isCommunityCaptureForm` (false for `ev-s7-financial-plan` — Amanah).
- Triggers mirror livestock: ActWorkPanel mount + Refresh;
  PlanTierShell capture-save branch with the "N work item(s) proposed —
  review in Act" toast deep-linking `?panel=work&workFilter=proposed`.
- `syncManifest.ts`: one `blob()` registration beside livestock (stays
  versioned-blob per the typed-record ADR follow-on). 66 new tests
  (covenant mirror + adapter gating).

### Phase 5 — UI wiring (commit `5fe88b09`)
- `workSelectors.ts` exports `GENERATED_PLAN_SOURCES = ['livestock-plan',
  'community-plan']`; the three narrow source gates widened
  (ActWorkProgressCard, ActTierExecutionPanel rollup, useEventAggregator —
  event id `${source}:${id}`, byte-identical for livestock rows).
  `isLivestockWork` untouched: the fulfillment sync stays livestock-only by
  design (community check-proof pool is empty; community rows complete via
  explicit Mark done).
- `WorkReviewSection` refactored around an inner `WorkReviewList`,
  subscribing BOTH stores; domain headings ("Livestock plan" / "Community
  plan") only when both domains have proposals — single-domain markup
  identical to before, pinned by the existing tests.
  `WorkBulkConfirmOverlay` props widened structurally to
  `{instance: {title, scopeNotes?}}`; Amanah verbatim-caution block
  unchanged. 5 additive dual-store test cases.

### Phase 6 — verification (commit `a23e7b5e`)
- NEW deterministic e2e
  `features/community/__tests__/communityWorkLifecycle.e2e.test.tsx`
  (5 tests): captures → generation → confirm (cmw__ rows, source +
  instance-key provenance, dated milestone) → `fulfilWithGenericProof` →
  regeneration leaves confirmed rows byte-identical and dismissed
  proposals dismissed.

## Covenant constraints (encoded in engine + tests)

- **Sovereign steward:** `confirmProposal` (factory-owned) is the ONLY
  proposal→spine writer for both domains; no auto-confirm anywhere;
  generation only refreshes proposals via `diffWorkPlan`.
- **Dismissed-stays-dismissed; confirmed-never-mutated** (flagged
  `needsReview` instead) — factory-owned, pinned by both domains' suites.
- **scopeNotes VERBATIM** rule → proposal → spine notes; the settlement
  self-certification scope note surfaces verbatim in the capture.
- **Amanah:** `ev-s7-financial-plan` is deliberately NOT a generation
  source; no advance-purchase/CSRA/salam framing anywhere; ratification and
  onboarding work uses membership framing; contractor/landowner invites are
  not members and generate nothing.
- **No deletion:** generic workbench path intact for all other objectives;
  every livestock public export preserved.

## Verification

- Shared sweep (livestockWork + communityWork + schemas): 14 files,
  213/213. Web sweep (stores, tier-shell work UI, captures, routing,
  features, syncManifest): 111 files, 1237/1237.
- `@ogden/shared` tsc fully clean; web tsc exactly the 4 pre-existing
  errors (syncServiceWorkItemsFallback ×1, WorkConflictSection tests ×3) —
  no new ones.
- No screenshot proof: the tier-shell preview hang is deterministic
  (standing disclosure); verification is happy-dom + tsc + static.
- Cumulative new coverage this layer: ~239 tests (49 generator + 18 schema
  + 14 anchorDates + 101 captures/routing + 26 store covenant mirror + 40
  adapter gating + 5 e2e — minus overlaps counted per suite).

## Consequences

- A steward with an Ecovillage (Intentional Community) project records
  community decisions (governance cadence, adaptive management, member
  ratification, legal sign-off gates, phased settlement, onboarding
  pipeline) in structured Tier-0 captures and runs the resulting dated work
  from the same unified Act schedule as livestock work — no external PM
  tool.
- Adding a THIRD work domain is now config + generator + adapter only: the
  lifecycle (proposals, confirm seam, review section, calendar, sync) is
  factory- and `GENERATED_PLAN_SOURCES`-driven.

## Out of scope / deferred

- `ev-s7-financial-plan` capture and any financial-instrument work
  generation (Amanah — needs Scholar Council framing).
- Mid-trial check-in cadence (steward chose end-of-trial only; additive
  later). Live carrying-capacity coupling for settlement c6.
- Typed-record promotion of the two proposal stores (both stay
  versioned-blob, per [[2026-06-12-atlas-work-items-typed-record-transport]]
  follow-on 3).
- Threshold/judgment protocol surfacing (`eco-shared-resource-load`,
  `eco-member-capacity-balance`) — event-driven, not calendar work.
- S5 map-based ev- captures (cluster layout, communal systems, etc.).

## Provenance

Steward brief 2026-06-12 ("Make plan using Fable 5 and use Opus 4.8 and
Sonnet 4.6 for execution"); six scope decisions via AskUserQuestion; plan
approved via plan-mode gate. Seven commits on atlas `main`: `66cc8348`,
`c5128317`, `250d724e`, `53a4227a`, `953ca7a7`, `5fe88b09`, `a23e7b5e`.
Not pushed — push awaits the steward.
