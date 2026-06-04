---
title: "Atlas: per-stratum × per-type standing-protocol catalogue"
type: decision
date: 2026-06-03
status: accepted
tags: [protocols, plan, catalogue, shared, atlas, amanah]
superseded_by: null
---

# Atlas: per-stratum × per-type standing-protocol catalogue

## Context

[[olos]] already had a working **protocol engine**: a `StandardProtocolTemplate`
of the form **IF _condition_ → THEN _response_** (typed `threshold | judgment |
cyclical | freeform`, with a `severityTier` response posture). When a protocol's
trigger is recognised in Act, `evaluateAndRaiseFlags` raises an
`ObjectiveReviewFlag` that becomes an assignable task. **The
"protocols-as-task-triggers" mechanism the steward wanted already existed** —
what was missing was *content and coverage*.

Only **10 templates** existed (`standardTemplates.ts`), all scoped to two
livestock enterprises (`sheep_beef | poultry`) via `enterpriseScope`. There are
**7 universal strata** (`s1-project-foundation` … `s7-phasing-resourcing`) and
**14 project types** (homestead … livestock_operation), with no protocol
coverage for the strata or for any non-livestock type.

The steward's brief: "having protocols in place that serve as triggers for tasks
is super useful." Refined via clarifying questions to: **deliverable** = an
authoring scaffold + fully-drafted examples; **coverage** = universal protocols
+ per-type deltas; **content** = drafted from regenerative/permaculture best
practice for steward review, with the steward the final authority on thresholds
and wording.

## Decision

Mirror the **proven objective-resolution architecture**
([[2026-05-29-atlas-spec-catalogue-driven-content]],
[[2026-05-29-atlas-spec-secondary-layer-plugin-model]]) for protocols rather
than invent a new one. A project's resolved protocol set is:

```
universal protocols            (every project, all 7 strata)
  + primary-type protocols     (the project's primary type)
  + each compatible secondary's additive protocols   (deduped by id)
  + each compatible secondary's patches              (amend, never replace)
```

resolved by the new pure `resolveProjectProtocols.ts` — a twin of
`resolveProjectObjectives.ts` that **reuses the same `relationshipMatrix`**
(`isCompatibleSecondary` / `getActiveTensions`), so a pairing that is
incompatible for objectives is incompatible for protocols too. Sort is **stratum
ordinal (S1→S7) → source layer (universal < primary < secondary) → authored
order**; ids dedup; patches concatenate onto the target and skip-on-missing
(recorded in provenance, never thrown).

**Schema extension** (`protocol.schema.ts`, all back-compat):
- `ProtocolSource = z.enum(['universal','primary','secondary'])`.
- Optional `stratumId` (the authoring stratum, drives the sort), `source`,
  `sourceTypeId`, `scopeNotes`.
- `enterpriseScope` made **optional** — the legacy 10 livestock templates keep
  it; per-type entries omit it.
- `ProtocolPatchRecordSchema` `{ targetTemplateId, secondaryTypeId,
  conditionAmendment?, responseAmendment?, scopeNote?, ref? }` for secondary
  amendments.

**Content drafted** (`constants/protocol/catalogues/`): `universal.ts` (22
protocols across all 7 strata) + one file per project type, dispatched through
`index.ts` (`getPrimaryProtocolCatalogue` / `getSecondaryProtocolCatalogue`) —
the single wiring point. Vertical-slice types (homestead, silvopasture) deep;
the remaining 12 + secondary-only `residential` at a consistent baseline depth.
A markdown **authoring guide** (`docs/protocols/protocol-authoring-guide.md`)
captures the reusable scaffold so the steward can extend coverage.

**Steward-locked shape (AskUserQuestion):** universal + per-type deltas (the
objective model); I draft full reviewable content (not stubs); the steward is
final authority on thresholds and wording.

## Rationale

The objective layer already solved this exact scaling problem; reusing its
universal/primary/secondary model and its relationship matrix means one source
of truth for compatibility and one mental model for the steward. Numeric limits
stay as `[bracketed tokens]` (never hard numbers) so drafted content is
reviewable without reading as a settled, authoritative figure — the rationale
states the *principle*, the steward supplies the value.

## Alternatives Considered

- **A new bespoke protocol-scoping model** — rejected: needless divergence from
  the objective layer; would split the compatibility source of truth.
- **Replace the legacy livestock templates** — rejected (no-deletion-in-revamps,
  [[project_status]] discipline): `enterpriseScope` + `templatesForEnterprises`
  stay intact; the per-type layer composes *alongside* them.
- **`source` defaulting to `'universal'`** (as first planned) — rejected:
  defaulting would mislabel the legacy enterprise-scoped templates. `source` is
  optional **without** a default; the resolver treats absent `source` as the
  universal sort rank (0); new entries always set it explicitly.

## Amanah

Any protocol whose response touches a **sales channel or advance commitment**
carries the **verbatim** `bayʿ mā laysa ʿindak` caution in `scopeNotes` — the
sale of what one does not yet possess — never stripped or reworded (per the CSA
constraint, [[feedback_csa_in_catalogues]] / global CLAUDE.md). Carried on
`mg-market-channel-advance-sale`, `mg2-surplus-market-channel`,
`agri-experience-presale`, `nur-stock-presale`. A conformance test asserts the
caution survives. Permitted structures remain: charitable donation, restricted
donation, qard ḥasan, in-kind contribution, sponsorship; a post-harvest
membership yield-share may be designed afresh under Scholar Council review.

## Consequences

- Operational strata (S5–S7) carry more protocols than reading/decision strata
  (S1–S4); that asymmetry is expected, not a coverage gap.
- The layer is **pure data + resolver only** — **not yet wired** into Protocol
  Mode UI, the project-creation flow, or persistence. That wiring (the §10.1
  "objective approval → protocol instantiation" trigger) remains deferred per
  [[2026-05-31-atlas-plan-spine-live-reskin]] and the observation-log plan.
- Per-type content is slice-deep + baseline-everywhere; exhaustive depth for all
  14 types and rich secondary-*patch* content are follow-up passes (the shape is
  built).

## Connections

- [[olos]] — the project this lands in (`packages/shared`)
- [[2026-05-29-atlas-spec-catalogue-driven-content]] — the catalogue-as-plugin
  model this mirrors
- [[2026-05-29-atlas-spec-secondary-layer-plugin-model]] — the patch-record /
  secondary-layer model reused for protocols
- [[2026-05-31-atlas-plan-spine-live-reskin]] — the read-only Protocol Mode that
  will consume the resolved set once wired
- [[feedback_csa_in_catalogues]] — the verbatim Amanah scopeNotes rule

## Implementation

Two commits on `feat/atlas-permaculture`, **local only / not pushed** (push only
when asked; externally-rebased-branch discipline):
- `29662ef3` — `feat(protocols)`: schema extension + resolver + universal
  catalogue + 14 per-type catalogues + dispatch index.
- `ad23c711` — `test(protocols)`: catalogue conformance + resolver invariants
  (13 tests) + the authoring guide.

Verified: `packages/shared` `tsc --noEmit` EXIT 0; **13/13** new conformance
tests; **34/34** back-compat (`standardTemplates` 9 + `resolveProjectObjectives`
25 — legacy livestock templates intact), all bounded `pool:'forks'`. Resolver
proof: Homestead + Silvopasture → **31** standing protocols, sorted S1→S7
(universal→primary→secondary within each stratum), `appliedPatchRefs`
`["silvopasture-secondary-patch-1","silvopasture-secondary-patch-2"]`, no active
tensions; universal baseline = 22. UI proof deferred with the UI wiring. Logged
[[log]] (2026-06-03).
