---
title: "ADR — Domain is a tag, not a navigation gate"
type: decision
date: 2026-05-29
status: Accepted
deciders: Yousef
supersedes: null
related: [2026-05-29-atlas-spec-plan-tiered-objectives]
tags: [olos, atlas, adr, domains, navigation, ia]
---

# ADR 6 — Domain as tag, not navigation backbone

## Status
Accepted — 2026-05-29

## Context
The spec ratifies that the primary navigation unit is the **objective**, with the 16 universal domains acting as tags/overlays rather than navigation gates. Navigation is Stage → Objective, never Stage → Domain → Objective; the user never selects a domain; overlays load automatically from what the objective requires (Handoff Index ratified decisions).

Current code state: 16 IDs in `packages/shared/src/constants/universalDomain.ts` with 41 v3 imports; stage-local enums are type aliases of `UniversalDomain`; the tier shell is mounted under `/plan/tier/$tierId[/objective/$objectiveId]`. Already converging.

## Options considered
- **A. Ratify; domain stays a tag/overlay; retire any remaining domain-as-nav surfaces** (recommended).
- B. Retain domain as a selectable navigation level.

## Decision
Ratify domain-as-tag. The objective is the navigation unit; domains are overlay tags that load automatically. Any remaining legacy domain-as-navigation surfaces are retired as part of the ADR 3 per-tier cutover.

## Rationale
Code is already aligned (shared enum, type-alias pattern), and the spec is unambiguous. The only open scope is confirming legacy retirement, which is sequenced under ADR 3 rather than as separate work.

## Consequences
- No net-new work beyond the ADR 3 cutover.
- Confirms overlays are objective-driven, which the Plan and Act map-activation behaviours depend on.

## Connections
- Review: [[2026-05-29-olos-new-spec-suite-review]]
- Related: [[2026-05-29-atlas-spec-plan-tiered-objectives]]
- Concept: [[olos-universal-domains]]
- Adjacent: [[2026-05-25-atlas-universal-domains]], [[2026-05-26-atlas-universal-domain-step3-cutover]]
