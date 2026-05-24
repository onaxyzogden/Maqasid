---
title: "Atlas Multi-Steward Human Context Model"
type: decision
date: 2026-05-24
tags: [atlas, observe, human-context, steward, project-members, vision, schema, moontrance]
status: accepted
---

# Atlas Multi-Steward Human Context Model

## Context

The OBSERVE-stage **Human Context module** (Module 1 — Steward Survey +
Indigenous/Regional Context + Vision) modelled the steward as a **single object**
throughout the stack (`visionStore.steward`, `HumanContextPayload.steward`, the
PDF/markdown exports, and the demo seed). A piece of land is rarely stewarded by
one person — a couple, a family, or a cohort. Moontrance is explicitly a
**community** project. The single-steward assumption was therefore conceptually
wrong and had to become a **multi-steward** model.

The operator's words: *"Current config, especially the Human Context module
assumes that there's only one steward who will contribute to the project. That
is wrong."*

## Decision

Four design choices were locked with the operator before implementation:

1. **Array + roles** — multiple stewards, each tagged with a domain
   `StewardRelationship` (`lead | co-steward | family | ally | contributor`),
   deliberately distinct from the app-permission `ProjectRole`
   (`owner | designer | reviewer | viewer`).
2. **Hybrid vision split** — personal attributes live **per steward**; the
   vision *package* is **shared at project level** (`sharedVision`), but each
   steward may also record their **own** `personalVision` + `personalExperienceGoals`.
3. **Auto-derive roster from live `project_members`** — the steward roster is
   derived from the existing `memberStore` (DB-backed `project_members`,
   `ProjectMemberRecord` keyed by `userId`); the rich profile fields are an
   **overlay** layered on top per `userId` (`visionStore.stewardProfiles`), not
   a freestanding duplicate array. A single selector `useStewardRoster(projectId)`
   joins the two.
4. **No persist migration** — `visionStore` reshaped freely; persist bumped to
   **v4** with a no-op migrate that simply drops the old `steward` (existing
   local data is disposable); demo re-seeded.

### Architectural tension resolved

`visionStore` is **localStorage-only**; `memberStore` is **API-only and requires
auth**. In the common offline/demo flow there is no auth and no backend members,
so a pure auto-derive would render an empty module. Resolved with a thin
**local member fallback**: `memberStore.seedLocalMembers(records)` (no-op guard)
plus the builtin seed injecting 2 synthetic `ProjectMemberRecord`s
(Yousef = owner/lead, Amina = designer/co-steward) and matching
`stewardProfiles` + `sharedVision`. Real projects continue to `fetchMembers`
from the API. **Both paths feed the same `useStewardRoster` selector.**

### Covenant framing preserved

Per the operator's standing constraints, the demo `sharedVision` keeps the
Islamic covenant language — `guidingValues` include *Amanah (trust/stewardship)*;
`constraints` include *"No interest-bearing finance (qard hasan / donation /
in-kind only)"* and the Conservation Halton 30 m setback. No CSRA / salam
advance-purchase framing was introduced.

## Scope of change (16 files + 1 new)

**Store / selector:** `visionStore.ts` (stewardProfiles + sharedVision, persist
v4), `memberStore.ts` (seedLocalMembers), new
`v3/observe/modules/human-context/roster.ts`.

**Schema:** `export.schema.ts` (`StewardPayload` + `HumanContextPayload.stewards[]`
+ sibling `vision` package + `totals.stewardCount/totalHoursPerWeek`),
`project.schema.ts` (`stewardNames[]` forward-compat; legacy `stewardName` kept
because the separate `apps/atlas-ui` legacy app + migration 021 still read it).

**Derivations + tests:** `derivations.ts` (per-steward completeness / archetype /
hours + roster rollups `rosterCapacityHours` / `rosterCompleteness` /
`stewardCount`; vision counts read `sharedVision`), `derivations.test.ts`.

**UI:** `StewardSurveyDetail.tsx` (v3) + `StewardSurveyCard.tsx` (legacy v2, still
live via DashboardRouter — **rewritten in place, not deleted**, per the
preserve-legacy memory) render the roster with per-steward editors;
`VisionDetail.tsx` edits the shared package once; `HumanContextDashboard.tsx` +
`ObserveHub.tsx` summarize the roster (count / names / combined capacity);
`MembersTab.tsx` shows a steward badge for members who have a profile.

**Exports:** `humanContextReport.ts` (PDF — per-steward sections + shared vision +
roster KPIs), `DiagnosisReportExport.tsx` (markdown — iterates stewards).

**Seed:** `builtinSampleObserveData.ts` (`seedVision` injects 2 demo members +
profiles + shared vision; idempotency keyed on `stewardProfiles` presence).

## Verification

- `@ogden/shared` build: exit 0.
- `apps/api` typecheck: exit 0.
- `apps/web` typecheck: clean for all touched files; the only 3 errors are
  **pre-existing and unrelated** (`StepBoundary.tsx`, two `plan/layers` host-union
  tests) — none in any steward file. (Web `tsc --noEmit` OOMs at default heap;
  must run with `NODE_OPTIONS=--max-old-space-size=8192`.)
- Human-context derivations suite: **17/17 pass** (focused vitest run).
- Live dev-server / on-map visual verification with a real project: **deferred**
  (documented Windows WebGL capture hang) — runtime evidence is the typecheck +
  unit suite + shared/api builds.

## Notes / deferred

- Migration 021 (`metadata.stewardName`) left intact — consumed only by the
  separate legacy `apps/atlas-ui` app; `stewardName` retained in
  `project.schema.ts` with `stewardNames[]` added alongside.
- The legacy `features/observe/StewardSurveyCard.tsx` could **not** be delegated
  to the v3 `StewardSurveyDetail` (different routing: `project` prop vs TanStack
  `useParams`), so it was made roster-aware in place.
- Live multi-steward edit-persistence + MembersTab badge confirmed structurally,
  not via screenshot.

Committed `7c61f9d9` (16 files, +1325 / −667) on `feat/atlas-permaculture`.
