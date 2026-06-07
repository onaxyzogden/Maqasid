---
title: "ADR — Methodology terminology rename (Decisions / Field Actions / Observe)"
type: decision
date: 2026-05-29
status: Accepted
deciders: Yousef
supersedes: null
related: []
tags: [olos, atlas, adr, terminology, rename, telemetry]
---

# ADR 10 — Methodology terminology rename

## Status
Accepted — 2026-05-29

## Context
The rename to display labels **"Decisions / Field Actions / Observe"** (with internal IDs stable) is a methodology stance, not cosmetics: "OLOS is a thinking and deciding process, not a task completion process" (Handoff Index §3b).

Current code state: stage labels read "Observe / Plan / Act" in `V3LifecycleSidebar.tsx` and align with internal IDs; the "Decisions / Field Actions" display labels are not yet applied. "Field Action" terminology already dominates code (318 occurrences); routes use `/plan/decisions`, `PlanDecisionsPage` and `planDecision.ts` exist. "Task" persists in the legacy `WorkItem` schema and the `task_type` field on FieldAction. Telemetry event naming has not been audited.

## Options considered
- **A. Display-label-first migration; internal IDs stable; telemetry audited as a separate slice** (recommended).
- B. Full rename including internal IDs and telemetry in one pass.

## Decision
Apply the rename display-label-first. User-facing labels become Decisions / Field Actions / Observe; internal IDs remain `plan / act / observe`. Leave telemetry event names unchanged **for now** but **audit them as a separate slice** — if events use "task"/"module" naming they outlive the rename and need their own migration ADR. Coordinate with any future i18n layer.

## Rationale
Most of the rename is Plan-stage copy; "Field Action" is already the dominant code term, so the blast radius at the display layer is small. Touching internal IDs and telemetry in the same pass would risk a large, error-prone migration for no user-visible gain. Separating the telemetry audit keeps analytics continuity intact until it's deliberately migrated.

## Consequences
- Cosmetic at the display layer; project-wide for the copy + telemetry audit.
- A follow-up ADR may be required if the telemetry audit finds "task"/"module" event names.
- Legacy `WorkItem` "task" naming is left to unwind with Phase 7.

## Connections
- Review: [[2026-05-29-olos-new-spec-suite-review]]
- Adjacent: [[2026-05-29-atlas-spec-plan-output-enum]], [[2026-05-29-atlas-spec-cyclical-review-mode]], [[2026-05-29-atlas-spec-act-map-first-surface]], [[2026-05-29-atlas-spec-domain-as-tag-vs-backbone]]
- Source: Handoff Index v1.1 §3b
