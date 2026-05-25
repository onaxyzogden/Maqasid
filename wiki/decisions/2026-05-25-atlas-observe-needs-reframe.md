---
title: "Atlas Observe — 'Observation Needs' reframe (spec)"
type: decision
date: 2026-05-25
status: accepted
tags: [atlas, observe, architecture, stage-boundaries, spec, ui]
superseded_by: null
---

# Atlas Observe — "Observation Needs" reframe (spec)

## Context

A discussion doc (`~/Downloads/OLOS Observe should do two things only.md`, from a session
with another LLM) argues the Observe stage should do **only two things**: (1) manage
recorded observations, and (2) express observation-related *needs* — and must **not**
assign work (people, scheduling, crews, work orders, review). Those belong downstream:
**Plan** decides the response, **Act** assigns and executes.

Grounding the doc against the code confirmed the critique. The Observe Command Centre's
`FieldObjective` system (introduced in [[2026-05-24-atlas-objective-driven-workspace]]) is
**in substance an observation-capture unit** — it completes by capturing photos/notes/
annotations + a checklist + a summary — but it is dressed in Act-stage language:
"Assigned Objectives", `assignee`, `dueAt`, "Submit for review", "Mark complete", reviewer
"Send back". The **real** work-assignment machinery already lives separately in Act (the
`WorkItem` spine, `crewMember`, dependency edges), so Observe's "assignment" is **language
drift, not a duplicated system** — making the correction mostly a reframe plus one new
capability (generative needs).

## Decision

Reframe the Observe Command Centre from an objective/assignment-flavoured workspace into an
**observation-needs workspace**. This session produced a **spec only** (no code):
`apps/web/src/v3/command/OBSERVATION-NEEDS-WORKSPACE.md`, which supersedes
`OBJECTIVE-WORKSPACE.md` (the latter carries a "Superseded by" banner until the rename
lands). Four decisions locked via the user:

1. **Deliverable = spec/doc only.** No code changes this session.
2. **Strip assignment from Observe.** Remove `assignee` / `dueAt` (as a labour deadline) /
   "Submit for review" / "Mark complete" / "Send back". A `dueAt` deadline is replaced by an
   optional **re-observation *trigger*** (a condition like "recheck after next rainfall", not
   a schedule). Lifecycle collapses to `open → in-progress → recorded` (+`resolved`).
3. **Needs come from BOTH** a seeded catalog *and* generatively — a recorded observation (or
   the steward) can raise a follow-up need (`origin: 'seed' | 'follow-up' | 'manual'`,
   `sourceObservationId`, `reason`). Stale-data/coverage-gap auto-needs noted as a follow-on.
4. **Naming = "Observation Needs", renamed at the code level** — `FieldObjective`→
   `ObservationNeed`, `AssignedObjectivesPanel`→`OpenObservationNeedsPanel`,
   `evaluateObjectiveCompletion`→`evaluateObservationRecorded`, folder `v3/objectives/`→
   `v3/observation-needs/`, deep-link `?objective=`→`?need=`, focus pieces `Objective*`→
   `Capture*`. The spec carries the full rename map + a 7-step refactor checklist.

The invariant: Observe **surfaces** a `planImpact` flag but never acts on it — Plan reviews
and decides, Act assigns.

## Rationale

The reframe is low-risk because the underlying mechanism is already observation-capture; the
change is mostly naming, copy, and removing assignment fields. Doing the spec first (rather
than refactoring blind) lets the future code session be mechanical, and keeps the rebased
`feat/atlas-permaculture` branch from carrying a large half-finished rename. Code-level (not
copy-only) renaming was chosen so the codebase stops modelling Observe as task-management at
the type level, matching the doc's developer rule.

## Alternatives Considered

- **Spec deferred / discuss only** — rejected; the user wanted a written, executable spec.
- **UI copy only, keep `FieldObjective` type names** — rejected; leaves the wrong mental
  model in the code.
- **"Observation Requests" as the primary term** — rejected in favour of "Observation
  Needs" / "Open Observation Needs".
- **Keep `assignee`/`dueAt` as optional metadata** — rejected; assignment and scheduling are
  Act concerns, kept out of Observe entirely.
- **Generative-needs from a single source** — rejected; both seeded + generative chosen.

## Consequences

- A future, separately-approved code session executes the rename per the spec's §7 checklist
  (types → store/hook/seed → panel/page → capture components + `?need=` → generative path →
  folder/imports → fold docs). The `?objective=`→`?need=` change is a URL-contract change.
- Partially revises [[2026-05-24-atlas-objective-driven-workspace]] — the `FieldObjective`
  concept and its assignment/review lifecycle are superseded by `ObservationNeed` once the
  code lands; that ADR stays `accepted` for history.
- Stale-data/coverage-gap auto-generated needs (off
  `packages/shared/src/fieldVerification/computeFieldVerification.ts` decay + the GapsPanel)
  are a noted follow-on, out of scope for the first refactor.

## Connections

- [[2026-05-25-atlas-observe-needs-execution]] — the session that executed this spec (the rename landed)
- [[olos]] — the project this reframes (Observe stage)
- [[2026-05-24-atlas-objective-driven-workspace]] — the decision this revises
- [[2026-05-25-atlas-observe-objective-v1-gaps]] — the v1 objective-workspace gaps closed just before this reframe
- [[2026-05-25-atlas-plan-to-act-data-derived-gate]] — sibling Observe/Plan/Act stage-boundary work
