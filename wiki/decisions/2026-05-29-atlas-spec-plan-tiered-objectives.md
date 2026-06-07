---
title: "ADR — 7-tier objective graph as Plan substrate"
type: decision
date: 2026-05-29
status: Accepted
deciders: Yousef
supersedes: null
related: [2026-05-29-atlas-spec-domain-as-tag-vs-backbone, 2026-05-29-atlas-spec-catalogue-driven-content]
tags: [olos, atlas, adr, plan, tiers, objectives, cutover]
---

# ADR 3 — 7-tier objective graph as Plan substrate

## Status
Accepted — 2026-05-29

## Context
The spec organises Plan around 7 dependency-gated tiers (T0–T6; T3 = "Foundation Decisions", cycle-neutral), each objective carrying `prerequisite_objective_ids[]`, `parallel_with_ids[]`, and `checklist_items[]` (Plan Navigation Spec; Secondary Layer Spec §1).

Current code state: schema and routing are shipped — `packages/shared/src/schemas/plan/planTierObjective.schema.ts` (`tierId`, `prerequisiteObjectiveIds`, `parallelGroupId`, `checklist`, `outputKind`, `feedsInto`) and the tier shell at `/plan/tier/$tierId/objective/$objectiveId`. Content authoring is at fixture level only ("every tier has at least one objective"); the per-objective content for the 16 universal + per-type objectives has not landed. The legacy 15-module Plan still exists.

## Options considered
- A. Adopt substrate; **cut over per-tier as content lands, behind a feature flag** (recommended).
- B. Adopt substrate but hold the legacy Plan live until all 7 tiers are fully authored, then cut over in one move.
- C. Keep both surfaces indefinitely.

## Decision
Adopt the 7-tier graph as the Plan substrate (already shipped) and commit to retiring the legacy 15-module Plan via **incremental, per-tier cutover behind a feature flag**, starting with T0–T2 so Phase 1's "<10 min create-to-first-survey" baseline can be validated without waiting for T3–T6 content.

## Rationale
The substrate is done; the real decision is the legacy retirement, and a big-bang cutover (option B) blocks Phase 1 validation on the slowest content. Incremental cutover lets the make-or-break Phase 1 path ship and be instrumented early. A feature flag keeps the transitional dual-surface period controlled.

## Consequences
- A transitional window where some Plan surfaces are tier-based and some legacy — managed by a feature flag, with a tracked retirement checklist per tier.
- Content authoring (universal + per-type objectives) and the catalogue loader (ADR 8) become the critical-path work, not infrastructure.
- Legacy domain-as-nav retirement is folded in here (see ADR 6).

## Connections
- Review: [[2026-05-29-olos-new-spec-suite-review]]
- Related: [[2026-05-29-atlas-spec-domain-as-tag-vs-backbone]], [[2026-05-29-atlas-spec-catalogue-driven-content]], [[2026-05-29-atlas-spec-plan-output-enum]]
