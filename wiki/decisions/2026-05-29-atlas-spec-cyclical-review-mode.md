---
title: "ADR — Cyclical Review Mode (two-mode gates, Observe updates, review tags)"
type: decision
date: 2026-05-29
status: Accepted
deciders: Yousef
supersedes: null
related: [2026-05-29-atlas-spec-feeds-into-data-model, 2026-05-29-atlas-spec-stage-flow-direction]
tags: [olos, atlas, adr, plan, review-mode, spiral, gates]
---

# ADR 11 — Cyclical Review Mode

## Status
Accepted — 2026-05-29

## Context
Because Plan is a spiral, tier-access gates must behave differently on a first pass vs a later cycle (Plan Navigation Spec §2.8):
- **Initial completion:** hard gates — a tier is inaccessible until prerequisites are genuinely complete.
- **Cyclical review:** soft gates — previously completed tiers become review checkpoints (amber refresh icon), all are accessible; tiers never reached stay hard-gated.

The flow has two screens: **Screen 1 (review entry)** — a modal stating the specific Observe change ("Soil pH at Zone 2 dropped from 6.4 to 5.8"), the flagged objectives, and "Begin Review" / "Dismiss for now"; **Screen 2 (confirmation)** — a "Decision confirmed" (green) or "Decision updated" (blue) badge plus a summary line, with downstream effects listed. The detail panel in review mode adds an **OBSERVE UPDATES section (2b, between MAP ACTIVATION and YOUR DECISIONS)**. Cycle transition is explicit-action-only, resets `review_status` to null, and increments `cycle_id`.

Current code state: `PlanReviewsPage.tsx` exists for impact-flag triage — a different feature. No cycle-review mode with soft gates, no per-item Review tags.

## Options considered
- **A. Adopt the two-mode model as specified; drive flagging from `feeds_into`** (recommended).
- B. Approximate review mode by reusing the existing impact-flag triage page.

## Decision
Adopt cyclical Review Mode as specified: two gate modes, Screen 1 / Screen 2, the OBSERVE UPDATES detail-panel section (2b), and `review_status` reset on explicit cycle transition. Amber objective flagging is **data-derived from `feeds_into`** (ADR 5): objectives whose items feed into a changed Observe domain are the ones flagged. This is a distinct mode layered on top of the existing Plan Reviews (impact-flag triage), which stays.

## Rationale
The spec is now fully detailed (gate-state table, both screens, badge language), so there's no ambiguity to design around. Reusing impact-flag triage (option B) would conflate two genuinely different features. Sourcing the flags from `feeds_into` keeps the trigger logic in one place.

## Consequences
- A new Plan mode, built together with ADR 5's reverse-direction `feeds_into` wiring.
- Coexists with `PlanReviewsPage` — clarify in code which feature owns which surface.
- Depends on ADR 2 (`cycle_id`) for the cycle-transition / `review_status` reset semantics.

## Connections
- Review: [[2026-05-29-olos-new-spec-suite-review]]
- Related: [[2026-05-29-atlas-spec-feeds-into-data-model]], [[2026-05-29-atlas-spec-stage-flow-direction]], [[2026-05-29-atlas-spec-spiral-cycle-id-propagation]], [[2026-05-29-atlas-spec-plan-output-enum]]
- Existing surfaces: PlanReviewsPage.tsx, PlanRevisionBanner.tsx (code)
