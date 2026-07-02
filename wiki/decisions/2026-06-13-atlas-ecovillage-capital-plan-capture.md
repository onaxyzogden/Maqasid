---
title: "Atlas — EcovillageCapitalPlanCapture: first bespoke financial capture for ev-s7-financial-plan"
type: decision
date: 2026-06-13
status: accepted
tags: [atlas, olos, act, tier-shell, structured-capture, ecovillage, stratum-7, finance, amanah]
superseded_by: null
---

# Atlas — EcovillageCapitalPlanCapture: first bespoke financial capture for ev-s7-financial-plan

## Context

`ev-s7-financial-plan` (ref **EV-S7.5**,
[ecovillage.ts:1279](packages/shared/src/constants/plan/catalogues/ecovillage.ts:1279))
is the ecovillage Stratum-7 communal financial plan: 6 checklist items (c1–c6),
3 decision groups (dg1 [c1,c2] · dg2 [c3,c4,c6] · dg3 [c5]), no `scopeNotes`
field. It was **already a tier-zero member** via the 2026-06-12 workbench-capture
gap-closure ([[2026-06-12-atlas-workbench-capture-gap-closure]]) — but only as a
**generic-textarea-fallback** objective. The steward asked for the **first
bespoke financial capture** to replace that textarea with a structured,
mode-routed surface. This is **not** a new tier-zero membership (no
`tierZeroObjectives.ts` / `ActTierShell.tsx` change); it is an **upgrade** of an
existing member from generic-fallback to a dedicated capture — the inverse of the
ExitSuccessionCapture slice ([[2026-06-10-atlas-exit-succession-capture]]), which
*added* a member.

The objective layer needed **no change** — the catalogue text is byte-untouched.
What was missing was the capture component + its routing through
`DecisionWorkingPanel`. Steward choice (AskUserQuestion): **scope = "ev-s7 Capital
Plan"**, plan-approval = field-structure approval (capture *content* is never
invented — only the structured shape of the operator's own decisions).

## Decision

Built `EcovillageCapitalPlanCapture` on the canonical pure/controlled precedent
(`SettlementPlanCapture` / `OnboardingCapture` / `ProvisionBalanceCapture`) —
**no store, no projectId, advisory only**: `decode(value)` each render
(TOTAL/defensive, never fabricates), emit `onChange(encode(next))`, lossless
encode inverse, ASCII-only, panel chrome owned by `DecisionWorkingPanel`, capture
renders only the active mode body. Six modes routed by `capitalPlanModeFor(itemId)`:

| item | mode | body |
|---|---|---|
| c1 | `capitalRequirement` | total + optional line-item breakdown (`RegisterList`) |
| c2 | `contributionSchedule` | per-contributor rows (channel from the Amanah enum) + scheduled-vs-required derived strip (reads c1 sibling `FormValue`) |
| c3 | `fundStructure` | communal holding structure + signatories |
| c4 | `reportingSchedule` | cadence / recipients / format |
| c6 | `governanceConfirm` | Stratum-1 governance alignment (**soft** gate) |
| c5 | `contributionCommitment` | contributions-committed-before-construction (**hard** gate) |

Wired across the planned files: new `EcovillageCapitalPlanCapture.tsx` +
`.module.css` + test; `workbenchAffordances.ts` (`ev-s7-financial-plan` entry,
`showGroups:true`, `modeFor` → `cp-${m}`); `ActTierZeroWorkbench.tsx`
(`isCapitalPlan` prefix detection + return field); `DecisionWorkingPanel.tsx`
(`isCapitalPlan?` on `DecisionPanelTarget` + mode / validity / gateNote / summary /
body-router arms); `DecisionList.tsx` (six `cp-*` `MODE_LABELS`). **No change** to
`tierZeroObjectives.ts`, `ActTierShell.tsx`, `objectiveActTools.ts`, or the
catalogue — and **no classifier/baseline change** (a bespoke capture still
classifies `workbench-capture`).

## Amanah — structural fiqh guardrail (the load-bearing decision)

This is the **first capture where the fiqh boundary is enforced by data shape, not
prose**. `CAPITAL_CHANNEL_LIST` is a closed enum with **no advance-purchase
channel** — there is structurally no way to express CSRA / salam / pre-sale of
future yield ([[fiqh-surplus-sale-clean]], CSRA erased 2026-05-04, *bayʿ mā laysa
ʿindak*). Permitted channels only: communal member contribution (cost-share),
charitable donation, restricted donation, qard ḥasan (interest-free loan),
in-kind contribution, sponsorship. The c2 `decode` **constrains** any foreign /
stale channel to `''` (a persisted "Advance purchase of future yield" string
cannot round-trip back in). `CAPITAL_SCOPE_NOTES` states the boundary verbatim —
member contributions are cost-sharing among co-owners, not advance sale; any
future yield-share is a **membership benefit** under Scholar Council review — and
is surfaced in the c2 warn block. All three (enum exclusion, scope-notes wording,
c2 verbatim render) are **test-pinned** so a future edit that reintroduces an
advance-purchase channel breaks the suite.

## Rationale

`SettlementPlanCapture` / `OnboardingCapture` are the two most recent multi-mode
advisory ecovillage-S7 captures; reusing their pure/controlled shape keeps
persistence flowing through the panel's `onRecord` and adds zero store/schema
surface. Encoding the fiqh boundary as a **closed enum** (rather than a prose
warning the operator could ignore) makes the guardrail structural — the safest
possible posture for the project's first money-touching capture, and the reason
the plan-approval-as-field-approval framing is sound (the operator approved a
shape that *cannot* express the forbidden instrument).

## Alternatives Considered

- **Keep the generic textarea** — rejected: the steward explicitly asked for the
  first bespoke financial capture; a textarea cannot enforce the channel enum.
- **Fold into `ev-s4-financial-model`** — rejected: distinct objective (S4
  enterprise model vs S7 communal capital plan); the `cp-` badge namespace is kept
  separate from S4's `fi-` precisely to avoid conflation.
- **Add a "member yield-share" channel now** — rejected on fiqh grounds; any
  yield-share is a membership benefit requiring fresh Scholar Council design when a
  corpus exists, never an advance-purchase line in this capture.

## Verification

- **vitest (bounded `--pool=forks`, `--testTimeout=15000`):** the three affected
  suites **243/243** green — `EcovillageCapitalPlanCapture.test.tsx` (round-trip
  encode/decode, defensive/garbage-tolerant decode, foreign-channel→`''`
  constraint, hard/soft gates, capitalRequiredFrom/scheduledContributionsFrom,
  summaries, Amanah pins); `ActTierZeroWorkbench.test.tsx` 172/172 (new
  capital-plan describe block: `cp-*` badges, c1 routes to the capture not the
  textarea, dividers); `workbenchAffordances.test.ts` (new `cp-` block,
  prefix-guard null for the near-name `ev-s4-financial-model-c1`).
- **One in-gate test fix:** the c1 routing assertion `/Total Phase 1 capital
  requirement/i` collided with the c1 checklist label ("Define total Phase 1
  capital requirement") → multiple-match error; re-anchored on the capture's
  unique AmountRow label "Total founding infrastructure capital required".
- **tsc (`-r typecheck`, 8 GB heap): no new errors in slice files.**
  `packages/shared` + `apps/api` clean; `apps/web` red only on **operator-WIP**
  files (`syncServiceWorkItemsFallback.test.ts`,
  `WorkConflictSection.test.tsx` ×3) — the standing known-red, untouched here.
- **Preview screenshot: not attempted.** The capture is not yet route-mounted, and
  v3 Act/Observe routes mount the full map substrate and hang the headless preview
  ([[project-screenshot-hang]]) — in-browser render is **not** asserted.

## Consequences

- The S7 Ecovillage communal financial plan now routes into the dedicated bespoke
  capture across all 6 decisions; the generic textarea fallback no longer serves
  this objective.
- Establishes the `cp-` badge namespace in `workbenchAffordances` /
  `DecisionList` (distinct from S4's `fi-`).
- **First structural Amanah guardrail** — the fiqh boundary is now enforced by a
  closed channel enum + decode-constraint, test-pinned, not by prose alone. This
  is the template for any future money-touching capture.
- **Committed as `d19ac15f`** on `main` (9 files, +1927/−6, additive) via explicit
  pathspec. Heavy operator out-of-band WIP (a `CommunityMeeting*` feature,
  `ConflictFrameworkCapture`, `ActProtocolDetailPane`, `ProtocolActivationControls`,
  olos schema edits, `routes/index.tsx`, `ActTierObjectiveRail`/`ActTierShell`,
  `actToolCatalog.ts`, `DesignElementLayers.tsx`, `objectiveActTools.ts`) left
  **unstaged and intact**. **NOT pushed** — `main` is canonical; push awaits the
  steward (local `main` ahead of `origin/main` by 60).
- Deferred: in-browser screenshot once a non-hanging preview env exists; remaining
  bespoke financial captures are operator-mockup-driven only.

## Connections

- [[olos]] — the entity this capture extends
- [[project_act_tier_shell]] — the map-centric Act tier-shell pattern (project memory)
- [[2026-06-10-atlas-exit-succession-capture]] — the sibling ecovillage-S7 bespoke
  capture (this slice is its inverse: upgrade-existing-member vs add-member)
- [[2026-06-12-atlas-workbench-capture-gap-closure]] — the slice that first made
  `ev-s7-financial-plan` a tier-zero member (as generic fallback)
- [[fiqh-surplus-sale-clean]] — the surplus-sale-clean / CSRA-erased fiqh boundary
  the channel enum structurally enforces
- [[project-screenshot-hang]] — the documented preview/screenshot limitation
- [[project-structured-capture-on-main]] — the canonical-line rule (continue on
  `main`, push nothing without asking)
