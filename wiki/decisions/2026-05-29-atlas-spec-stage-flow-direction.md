---
title: "ADR — Plan-first spiral cycle vs Observe-first sequence"
type: decision
date: 2026-05-29
status: Accepted
deciders: Yousef
supersedes: null
related: [2026-05-29-atlas-spec-spiral-cycle-id-propagation, 2026-05-29-atlas-spec-cyclical-review-mode]
tags: [olos, atlas, adr, ia, spiral, plan]
---

# ADR 1 — Stage-flow direction (Plan-first spiral cycle)

## Status
Accepted — 2026-05-29

## Context
The spec re-frames the OLOS lifecycle from a one-time linear sequence into a **recurring spiral**: Plan is the entry point for every new project and every new cycle; one revolution is Plan → Act → Observe; Observe deltas trigger Plan revision; a new cycle begins (Plan Navigation Spec §2.8.1; Handoff Index §1.2).

Current code state: the 3-stage IA (Observe / Plan / Act) is shipped — TanStack routes plus sidebar labels (`V3LifecycleSidebar.tsx`); the legacy 7-stage lifecycle is retired (the `project_lifecycle_retirement` memory note is stale and predates the rename). Route order `observe → plan → act` is alphabetical and does not encode cycle direction. The cycle substrate exists for Observe and WorkItem.

## Options considered
- **A. Ratify the Plan-first spiral as doctrine** (recommended).
- B. Treat the spiral as a documentation framing only, with no doctrinal commitment.
- C. Re-order routes/IA to physically express Plan-first direction.

## Decision
Ratify the Plan-first spiral as binding doctrine. Plan is the canonical entry point for every project and every cycle; one revolution is Plan → Act → Observe; Observe deltas drive Plan revision. The 3-stage IA stays as shipped. No route re-ordering is required — alphabetical route order is cosmetic and does not need to bear cycle direction.

## Rationale
This is a posture and data-model commitment, not a UI rewrite. The IA is already aligned with the spec; the only thing being ratified is the cycle *direction* and the "Plan is entry" rule, both of which downstream decisions (cycle_id propagation, cyclical Review Mode) presuppose. Re-ordering routes would add churn for no user-visible benefit.

## Consequences
- Establishes the doctrinal frame that ADR 2 (cycle_id) and ADR 11 (cyclical Review Mode) build on.
- No immediate code change; the commitment is enforced by the cycle substrate and the gate-mode logic, not by route order.
- Documentation: refresh the stale `project_lifecycle_retirement` note to reflect Observe / Plan / Act.

## Connections
- Review: [[2026-05-29-olos-new-spec-suite-review]]
- Related: [[2026-05-29-atlas-spec-spiral-cycle-id-propagation]], [[2026-05-29-atlas-spec-cyclical-review-mode]]
- Concept: [[olos-universal-domains]]
- Memory to refresh: [[project_lifecycle_retirement]]
