---
title: "ADR — Plan output 7-value enum (approval gate)"
type: decision
date: 2026-05-29
status: Accepted
deciders: Yousef
supersedes: null
related: [2026-05-29-atlas-spec-plan-tiered-objectives, 2026-05-29-atlas-spec-act-map-first-surface]
tags: [olos, atlas, adr, plan, approval, enum, act-handoff]
---

# ADR 4 — Plan output 7-value enum

## Status
Accepted — 2026-05-29

## Context
The spec names a 7-value Plan **output / approval** status — Approved for Act, Conditionally Approved, Needs More Observation, Needs Professional Review, Redesign Required, Deferred, Rejected (Plan Navigation §5.2; Plan Stage Developer Spec; Handoff Index ratified decisions). Act may only receive Approved or Conditionally Approved handoff packages.

The spec never states a computation algorithm for the 7 values, and it conflates two axes: the Handoff Index line "objective status is computed, not manually set — resolution order complete → active → available → locked" describes the **4-state completion** status, not the 7-value **approval** status. The acceptance criteria give only two partial rules: missing required Observe inputs ⇒ "Needs More Observation", and "Act handoff packages should only be generated from Approved or Conditionally Approved Plan outputs."

Current code state: only the 4-state completion status (`PlanTierObjectiveStatus = locked | available | active | complete`) plus a separate 6-verb `PlanReviewDecision` triage set exist. **No 7-value approval gate.**

## Options considered
- A. Treat the 7 values as a single computed field (no algorithm exists, so not viable as stated).
- B. Treat all 7 as steward-selected (loses the enforcement the spec implies for missing data).
- **C. Two-axis model: keep completion computed; add a separate approval field that is mostly steward-recorded with one computed/enforced value** (recommended).

## Decision
Adopt a **two-axis model**:
1. Keep the existing computed 4-state `status` (locked / available / active / complete) unchanged.
2. Add a distinct `plan_output_status` field carrying the 7 approval values.
   - **Needs More Observation is computed and enforced**: if an objective's `required_observe_inputs` are missing, the system forces this value and the objective cannot be set to Approved.
   - The remaining six (Approved for Act, Conditionally Approved, Needs Professional Review, Redesign Required, Deferred, Rejected) are **steward-recorded decision outcomes**.
   - **Conditionally Approved requires ≥1 named condition.**
3. The Act-handoff gate keys off `plan_output_status`: only **Approved for Act** or **Conditionally Approved** generate a handoff package.

## Rationale
This resolves the spec's internal conflation while honouring both explicit rules. Completion and approval are genuinely different questions ("is the checklist done?" vs "is the decision safe to act on?") and must be separate fields. Enforcing Needs More Observation from data state prevents the documented failure mode of "pretending the decision is ready"; leaving the judgement values to the steward matches the Plan stage's allowed verbs (decide, approve, defer, reject).

## Consequences
- New `plan_output_status` field + the missing-input enforcement rule + per-condition tracking for Conditionally Approved.
- Gives Act a clean, single-field contract for what it may launch.
- This decision is the most synthesised in the suite (constructed from implicit rules); revisit if a later Plan spec publishes an explicit resolution algorithm.

## Connections
- Review: [[2026-05-29-olos-new-spec-suite-review]]
- Related: [[2026-05-29-atlas-spec-plan-tiered-objectives]], [[2026-05-29-atlas-spec-act-map-first-surface]], [[2026-05-29-atlas-spec-feeds-into-data-model]]
