---
title: "Atlas — UniversalDomain shared enum + module-id migration utility (slice 1 of the universal-domain refactor)"
type: decision
date: 2026-05-26
status: accepted
tags: [atlas, olos, shared-schema, packages-shared, universal-domains, zustand-persist, migration, architecture]
superseded_by: null
---

# Atlas — UniversalDomain shared enum + module-id migration utility (slice 1)

## Context

ADR [[2026-05-25-atlas-universal-domains]] adopted the **16 universal domains**
as OLOS's canonical land-project vocabulary and recorded the forward direction:
retire the stage-local `ObserveModule` / `PlanModule` / `ActModule` enums in
favour of a shared `UniversalDomain` enum in `@ogden/shared`. The refactor was
explicitly future, separately-approved work. This is the first of those
follow-on approvals — but only for the **two foundation pillars** named in the
prior session's debrief:

1. Define the shared enum (Zod, labels, ordering) in `@ogden/shared`.
2. Author + unit-test the versioned `byProject` localStorage migration
   *utility* so that, when the later cutover lands and
   `apps/web/src/v3/{observe,plan,act}/types.ts` is rebased onto
   `UniversalDomain`, in-flight projects' persisted blobs are remapped from
   module ids to domain ids without data loss.

Both pillars must exist before any consumer code is touched, otherwise the
cutover risks corrupting localStorage. This ADR records the shape of slice 1.

## Decision

Slice 1 is **shared-package-only** and **purely additive**. Five new files
under `atlas/packages/shared/src/` + one barrel edit; zero edits in
`apps/web` or `apps/api`; no `persist.version` bumps; no consumer of the new
exports wired yet.

- **`schemas/universalDomain.schema.ts`** — Zod enum of the 16 kebab-case
  domain ids (`vision-intent`, `land-base`, `climate`, `topography`,
  `hydrology`, `soil`, `ecology`, `plants-food`, `animals-livestock`,
  `built-infrastructure`, `access-circulation`, `energy-resources`,
  `people-governance`, `economics-capacity`, `risk-compliance`,
  `monitoring-records`). Mirrors the `ProjectType` pattern in
  `schemas/project.schema.ts`.
- **`constants/universalDomain.ts`** — `UNIVERSAL_DOMAINS` ordered list,
  `UNIVERSAL_DOMAIN_LABELS`, `UNIVERSAL_DOMAIN_PURPOSE`. Mirrors the
  `STRUCTURE_WATER_GAL_PER_DAY` / `OUTPUTS_BY_TYPE` lookup-table pattern.
- **`lib/moduleDomainMap.ts`** — three primary-only mapping tables
  (`OBSERVE_MODULE_TO_DOMAIN` 7, `PLAN_MODULE_TO_DOMAIN` 15,
  `ACT_MODULE_TO_DOMAIN` 8) derived from the ADR's current→universal mapping
  table, plus `mapLegacyModuleId(stage, moduleId)` resolver. Legacy id
  strings are duplicated literals — the shared package must not depend on
  the web app.
- **`lib/moduleDomainMigration.ts`** — `migrateByProjectModuleKeys<T>()`, a
  pure, framework-agnostic helper that takes
  `{ byProject: Record<ProjectId, Record<LegacyModuleId, T>> }` and returns
  the same shape with the inner axis collapsed to `UniversalDomain`. Shape
  mismatch → `null` (Zustand falls back to defaults — same posture as
  `closedLoopStore.ts`' v1→v2). Unknown module ids drop with
  `console.warn`. Collisions warn + last-wins (see the data-loss note
  below).
- **`tests/universalDomain.test.ts`** — 23-test Vitest suite covering schema
  parse, label/purpose coverage, mapping completeness (7 + 15 + 8 = 30
  legacy ids, no extras), the no-collision invariant for Observe, the
  *documented* collisions for Plan and Act, and the migration utility's
  shape narrowing, remap, drop-unknown-with-warn, multi-project, empty,
  defensive-null-inner, and collision-warn paths.
- **`src/index.ts`** — barrel re-exports three new lines so consumers can
  write `import { UniversalDomain, UNIVERSAL_DOMAIN_LABELS,
  migrateByProjectModuleKeys } from '@ogden/shared'`.

**Explicit non-goal for this slice:** *no edits* to
`apps/web/src/v3/{observe,plan,act}/types.ts`, the 89 importer files of the
stage-local enums, the affinity tables, `deriveActivatedModules`, the
compass configs, the Command Centre tabs, or any `apps/web/src/store/*Store.ts`
`persist.version` / `migrate`. Step 3 (separately approved) does the cutover
in a single coherent commit that depends on the artifacts this slice ships.

## Important finding — Plan & Act collisions are real (data-loss surface)

The original ADR mapping table marked `*` cross-contributions but did not
quantify how many legacy module ids share the same primary domain after the
mapping collapses. Slice 1's coverage tests surfaced the exhaustive list:

- **Observe** (7 → 7): no collisions.
- **Plan** (15 → 11), three collision groups:
  - `access-circulation`: `dynamic-layering`, `zone-circulation`
  - `built-infrastructure`: `structures-subsystems`, `machinery`
  - `ecology`: `regeneration-monitor`, `habitat-allocation`, `biodiversity-monitor`
- **Act** (8 → 6), two collision groups:
  - `built-infrastructure`: `build`, `maintain`
  - `monitoring-records`: `tracker`, `review`

The naive utility shipped here is **last-wins + warn** on collision, which
IS lossy. Step 3 (the cutover that wires this into Zustand `persist.migrate`)
**must supply a merge strategy per store** — typically by deep-merging the
inner value `T` or by concatenating arrays — when the colliding stage is
Plan or Act. Observe is collision-free and can use this utility directly.
Both `moduleDomainMap.ts` and `moduleDomainMigration.ts` carry doc-comment
callouts; the test suite locks in the exact collision sets so a future remap
edit can't silently change them.

## Rationale

- **Foundations before cutover.** The migration utility is the safety
  artifact that lets step 3 flip module ids to domain ids in one commit
  without corrupting in-flight `byProject` localStorage. Shipping the
  utility now, reviewed and unit-tested, removes that risk from step 3.
- **Additive-only is review-friendly.** Slice 1 adds exports nothing reads
  yet, so it cannot regress any of the 89 importer files. The barrel edit
  is exercised by `tsc --noEmit` across the web + api apps to confirm
  resolution.
- **Primary-only mapping over split-into-multiple-domains.** Splitting
  persisted evidence-index maps across multiple domains is ambiguous (the
  integer indices have no domain dimension) and would risk data loss too —
  worse, silently. The primary-only mapping makes the loss surface
  enumerable (and the test locks it in).
- **Pure utility, no Zustand dep.** Keeping the migration function pure and
  framework-agnostic means it tests cleanly in shared and works for any
  caller (api, future stores, ad-hoc scripts).

## Alternatives considered

- **Bundle slice 1 + step 3 in one session.** Rejected — the cutover
  touches ~89 importer files plus stage-local enums + affinity tables +
  derived module activation; that's a multi-day refactor that must be its
  own sliced commit chain, not bolted onto a foundation.
- **Split-across-domains migration.** Rejected — see Rationale; ambiguous
  for evidence-index maps, makes the data-loss surface invisible.
- **Keep stage-local enums + add a domain *grouping* layer.** Rejected
  upstream in ADR [[2026-05-25-atlas-universal-domains]] — three divergent
  sources of truth plus a fourth grouping layer is more surface, not less.

## Consequences / future work

- **Step 3 (separately approved, not started):** wire
  `migrateByProjectModuleKeys` into each of the 6 module-keyed persist
  stores (`observeCompassStore`, `planCompassStore`, `actCompassStore` plus
  the matching `*HowChecksStore`s), bumping `persist.version` on each;
  rebase `v3/{observe,plan,act}/types.ts` onto `UniversalDomain`; rework
  the affinity tables, `deriveActivatedModules`, the compass configs, and
  Command Centre tabs; build a `project-type → primary-domains` emphasis
  map. The Plan/Act collision groups identified above require a per-store
  merge strategy (concatenate / deep-merge) before the cutover lands.
- **Under-represented domains** flagged in the parent ADR (Land Base,
  Access/Circulation, Energy/Resource Flows, People/Governance,
  Risk/Compliance, Monitoring) become first-class once step 3 lands —
  slice 1 makes them addressable but does not yet expose them.

## Verification

- `npx vitest run` inside `atlas/packages/shared`: **370/370 tests pass**
  (the new 23-test `universalDomain.test.ts` + the 347 pre-existing).
- `npx tsc --noEmit` inside `packages/shared`: clean.
- `npx tsc --noEmit` inside `apps/web` (8 GB heap — plain tsc OOMs on this
  project) and `apps/api`: clean — the barrel edit doesn't break any
  existing import path.
- Atlas commit `e65ce7ea` on `feat/atlas-permaculture`, 6 files
  (+614/−0), staged by explicit path. Foreign WIP in the working tree
  (capital-partner PDF, financial store/UI, ZoneSomSidebar, slice3
  auto-needs patch, `.superpowers/`, `_sweep_out.txt`, `tsc_chk.txt`,
  `tsc_phase4.txt`, two phasing-budgeting tests, etc.) **not staged**.
- Pushed `e61c7489..e65ce7ea` after `git fetch` (ahead-1 / behind-0).

## Connections

- Parent direction: [[2026-05-25-atlas-universal-domains]]
- Concept: [[olos-universal-domains]]
- Entity: [[olos]]
- Branch / push discipline: [[project_branch_rebase]],
  [[feedback_commit_immediately_on_rebased_branches]]
- Step 3 (future, not started) — the cutover that wires the utility +
  rebases the stage-local enums.
