---
title: "Atlas — Livestock work-management layer: Plan decisions spawn dated work, steward confirms, Act executes"
type: decision
date: 2026-06-11
status: accepted
tags: [atlas, olos, livestock, work-spine, act, tier-shell, plan, sovereign-steward, amanah]
superseded_by: null
---

# Atlas — Livestock work-management layer

## Context

Steward objective: **"Ensure livestock planning and implementation can be
managed via OLOS without relying on external project management tools."**
Scoped via AskUserQuestion: deliverable = build the work-management layer;
Plan decisions GENERATE dated work (advisory — steward confirms, never
silent automation); scope = ALL livestock-bearing project types.

OLOS already had every PM *primitive* but no PM *surface*: the WorkItem
spine (`workItem.schema.ts`, additive `.passthrough()` covenant) with
rotation moves already generated into it by `rotationSequenceSpineSync`;
completion writers (`fulfilWithGenericProof` / `confirmTypedProofMatch`);
pure Tier-0 capture decoders (`decodeHusbandry` / `decodeGrazing` /
`decodeLivestockIntent`); per-type standing protocols
(`resolveProjectProtocols`). Missing: (1) an engine turning those decisions
into dated recurring work, (2) a proposal→confirm lifecycle, (3) a work
schedule surface in the forward-IA Act tier shell.

## Decision

**Proposal layer feeding the existing spine** (two candidate designs
reconciled): generation is structurally advisory — proposals live in their
own store and CANNOT reach the spine except through the operator's
`confirmProposal`.

```
resolveProjectProtocols ─┐
decodeGrazing/Husbandry/ ┤ adapter   generateLivestockWorkPlan()      livestockWorkPlanStore
Intent (actEvidenceStore)┼────────▶  pure, packages/shared    ─diff─▶ proposed│confirmed│dismissed
paddocks + project type ─┘           rules + 90d instances                 │ confirmProposal (ONLY spine writer)
                                                                           ▼
                         matchLivestockFulfillment ◀──────── workItemStore (source:'livestock-plan')
                         (±7d move/proof match)              livestockMoveLogStore / proof records
```

### Phase 1 — shared engine (`packages/shared/src/livestockWork/`), commit `47aef520`
- `livestockWork.schema.ts`: `LivestockWorkKind` (13 kinds + custom);
  `LivestockWorkRuleSchema` (stable key
  `lvp__<sourceKind>__<sourceId>[__species][__paddockId]`, provenance
  `sourceProtocolId`/`sourceObjectiveId`/`captureMode`, recurrence,
  seasonalWindow, `inputsHash` fnv1a change-detection); instance key
  `<ruleKey>__<dueDate>`.
- `protocolCadences.ts`: protocol id → `{recurrence, kind}` catalogue for
  all livestock-bearing types; unknown cyclical → quarterly `custom`
  fallback (surface, don't vanish).
- `expandRecurrence.ts`: deterministic, capped (~200/rule), seasonal
  windows with hemisphere flip.
- `generateLivestockWorkPlan.ts`: pure composer (todayISO injected) over
  protocols + husbandry (welfare→daily feed-water + weekly welfare-check;
  health→annual vaccination anchored to breeding strategy +
  parasite-monitoring; breeding→seasonal windows; records→quarterly
  reconciliation) + grazing (graze-rest-review, contingency-review,
  tree-protection-check). **NO move generation** — rotation moves stay
  owned by `rotationSequenceSpineSync` (no double-booking; tested).
- `diffWorkPlan.ts`: 8-row transition semantics —
  dismissed-stays-dismissed, confirmed-never-mutated
  (`needsReview: 'changed' | 'orphaned'` instead).

### Phase 2 — proposal store + confirm seam (web), commit `47aef520`
- `livestockWorkPlanStore` (persist `ogden-livestock-work-plan` v1,
  projectId-tagged, registered in `syncManifest`): `applyGeneration`
  (diff), `editProposal`, `confirmProposal` / `confirmAll`,
  `dismissProposal` / `restoreProposal`, `resolveReview`.
  `confirmProposal` is **THE ONLY SPINE WRITER** — builds one WorkItem
  (id `lvw__<key>`, source `'livestock-plan'`, provenance fields,
  scopeNotes verbatim into notes) via `useWorkItemStore.addItem`;
  idempotent, reactivates a cancelled row instead of duplicating.
- `livestockWorkInputs.ts` adapter: FormValues → capture decoders →
  + paddock species union + curated protocols (feeds 'Animals' or
  cadenced; scopeNotes VERBATIM) + hemisphere →
  `LivestockWorkGenerationInput`. `generateAndApplyLivestockWork`
  regeneration seam (rolling horizon, no scheduler) — triggered on
  entering the Act work surface, explicit "Refresh proposals", and
  livestock capture saves in Plan.

### Phase 3 — Act tier-shell work surface, commit `6f078652`
`ActWorkSummaryCard` (ops dashboard badges) → `ActWorkPanel` right-rail
drill-down (`?panel=work&workFilter=…`, deep-linkable, joins the rail
precedence chain) with Today/Week tabs, pinned Proposed
(`WorkReviewSection` + `WorkBulkConfirmOverlay`, verbatim cautions) and
Overdue sections, `WorkAgendaList`/`WorkItemRow` (status pill, provenance
chip, variance caption, inline reschedule, undo), map paddock highlight
(`workExecutionStore` + `ActWorkHighlightLayer`), "Log this move" prefill
arming the existing `act.livestock.log-move` tool, "Mark done" generic
proof. `useEventAggregator` includes `'livestock-plan'` rows (legacy page
keeps working). Selectors in `workSelectors.ts` (raw subscribe + useMemo
per the zustand-selector-stability ADR).

### Phase 4 — auto-fulfilment + regen review + tracking, commit `201fffdb`
- `matchLivestockFulfillment` (shared, pure): generalized ±7d matcher —
  earliest-unfulfilled first, first-match-wins, one event proves at most
  one row; move-shaped (direction ⇒ species + destination) vs
  check-shaped (`sourceProtocolId` else `kind`; date proximity alone is
  NOT evidence).
- `useLivestockFulfillmentSync` (mounted in ActWorkPanel): routes matches
  through `confirmTypedProofMatch` with `actualEnd` = the event's field
  date (variance reflects when work HAPPENED). Check-proof pool
  deliberately EMPTY — no typed check log exists, so check-shaped work
  completes only via explicit "Mark done" (never inferred from unrelated
  logs).
- `WorkReviewSection` needsReview resolution: accept-update / keep-mine
  (suppresses same-condition re-flag) / cancel-work (audit row retained).
- `ActWorkProgressCard` per-objective done/open/overdue bars on the ops
  dashboard; "Generated work: N of M done" + work-schedule deep-link in
  `ActTierExecutionPanel` (bare-route navigation because objective-detail
  mode outranks workOpen in the rail precedence chain); Plan-side toast on
  livestock capture save ("N work items proposed — Review in Act",
  deep-link `?panel=work&workFilter=proposed`).

## Covenant constraints (encoded in engine + tests)
1. **Halal gating:** `slaughter-prep` emitted ONLY when the husbandry
   halal pathway is acknowledged (`pathwayAcknowledged === true`). Engine
   reads the gate, never writes it.
2. **Pigs working-role only:** species `'pigs'`/`'pig'` NEVER yields
   slaughter/consumption-pathway work under any input ([[fiqh-pigs-working-role]]).
3. **Sovereign steward:** only spine writer is the operator's
   `confirmProposal`; no subscription auto-confirms; auto-fulfilment is
   record-keeping only (links confirmed work to logged execution).
4. **Verbatim scope notes:** protocol `scopeNotes` (incl. Amanah cautions)
   carried verbatim rules → proposals → spine notes.
5. **No deletion:** all legacy stores/components retained
   (`scheduledLivestockMoveStore`, `EventCalendarCard`,
   `RotationScheduleCard`, …); the legacy RotationScheduleCard ±7d
   matcher coexists — both idempotent over the same back-link field.

## Verification
- `tsc --noEmit` clean (shared + web, `NODE_OPTIONS=--max-old-space-size=8192`).
- Bounded vitest (`--pool=forks`, scoped): shared `livestockWork/` 64/64
  (incl. halal gate, pig guard, no-moves assertion, all 8 diff rows,
  17 matcher tests); web touched suites 234/234 incl. the Phase-4 gate
  e2e (`livestockWorkFulfillment.e2e.test.tsx`: capture → proposals
  [spine untouched] → confirm → due row with provenance → execution
  evidence → done with `actualEnd` = field date, variance +2d, back-link;
  both work shapes; idempotent second pass); syncManifest coverage guard
  112/112.
- **Screenshot proof NOT captured** (preview_screenshot hangs on
  tier-shell map routes, [[project-screenshot-hang]]); Phase-3 visual
  verification was DOM-level (`preview_eval`/`preview_snapshot`) on the
  live panel, disclosed at the time.

## Consequences
- An operator can run livestock planning→execution entirely in OLOS:
  approve Plan decisions → review/confirm proposals in Act → today/week/
  overdue queue with map locate → prefilled move log or mark-done →
  completion + variance, rotation moves untouched.
- Live-preview testing left residue in the operator's browser IndexedDB
  (project `mtc`): 1 confirmed spine row ("Pasture Rest Period",
  `lvw__…`, due 2026-07-01) + 6 proposals still proposed — harmless
  (dismissable in-app), disclosed in the session debrief.
- Phase 5 deferred: month grid, weather glyphs on day headers, carer
  workload summaries, server-side work tables.
