---
title: "ADR — feeds_into driving Plan tags and cyclical Review tags"
type: decision
date: 2026-05-29
status: Accepted
deciders: Yousef
supersedes: null
related: [2026-05-29-atlas-spec-cyclical-review-mode]
tags: [olos, atlas, adr, plan, feeds-into, review-tags]
---

# ADR 5 — `feeds_into` driving Plan tags AND cyclical Review-tag mechanism

## Status
Accepted — 2026-05-29

## Context
Each Plan checklist item carries a `feeds_into` field expressing its downstream consequence. The spec uses it for two things: the green "feeds into →" tags in the Plan detail panel (Handoff Index ratified decisions), and — in cyclical review — to determine which objectives get flagged for re-assessment when downstream Observe data changes.

Current code state: `feedsInto: string[]` exists on `PlanDecisionChecklistItem` and renders as chips in `DecisionChecklist.tsx`. The cyclical Review-tag wiring is not yet built.

## Options considered
- **A. Ratify the field; wire the cyclical half so Review flags are data-derived from `feeds_into`** (recommended).
- B. Author Review flags manually per objective, independent of `feeds_into`.

## Decision
Ratify `feeds_into` as the single source for both behaviours. The existing green-tag rendering stays. Extend it so that, in cyclical review mode, when an Observe domain's data changes, the objectives whose checklist items `feed_into` that domain are the ones flagged amber "Review". The Review-tag mechanism is therefore **data-derived**, not hand-authored.

## Rationale
A single authored field driving both the forward (consequence tag) and reverse (review trigger) directions keeps the model coherent and avoids a parallel hand-maintained mapping that would drift. It makes ADR 11's cyclical Review Mode effectively fall out of the same data.

## Consequences
- `feeds_into` and ADR 11 are effectively one decision and should be built together.
- Requires a resolver from "changed Observe domain" → "items that feed into it" → "objectives to flag".
- Authoring discipline: every checklist item with a real downstream consequence must populate `feeds_into`, or its objective won't be flagged on the relevant change.

## Connections
- Review: [[2026-05-29-olos-new-spec-suite-review]]
- Related: [[2026-05-29-atlas-spec-cyclical-review-mode]], [[2026-05-29-atlas-spec-plan-tiered-objectives]], [[2026-05-29-atlas-spec-spiral-cycle-id-propagation]]
