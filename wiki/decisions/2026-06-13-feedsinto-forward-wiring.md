---
title: "Atlas — feedsInto forward-traceability wiring complete + full-participation conformance lock"
type: decision
date: 2026-06-13
status: accepted
tags: [atlas, olos, plan, catalogues, traceability, feedsInto, conformance-test, baseline-ratchet]
superseded_by: null
---

# Atlas — feedsInto forward-traceability wiring complete + full-participation conformance lock

## Context

OLOS Plan objectives are wired in **two directions**:

- **Backward gating** — `STRATUM_PREREQS` → `prerequisiteObjectiveIds`. Every S4+
  objective is provably gated on its prior-stratum reads/decisions. Fully wired and
  test-enforced (`spineGate.conformance.test.ts`, `spineTraceability.conformance.test.ts`).
  Untouched by this work.
- **Forward feeds** — `feedsInto: string[]` on each checklist item ("*this read/decision
  is consumed by that downstream objective*"), surfaced as the **"Feeds" chips** in the
  Plan DecisionChecklist + Act tier shell. This was the incomplete channel.

The steward's request — "*Review every objective and task and ensure they are all wired
to the downstream objectives and tasks that rely on them*" — resolved (via AskUserQuestion)
to: **complete the forward `feedsInto` channel as data across all catalogues, verify the
task layer, and strengthen the conformance test from a 5-consumer floor to a full
participation invariant.**

This **implements the forward half of** [[2026-05-29-atlas-spec-feeds-into-data-model]]
(which ratified `feeds_into` as the single source for both the forward consequence chips
and the reverse cyclical Review flags). The forward chips now have complete data.

The 2026-06-11 traceability audit (`STRATUM_TRACEABILITY_AUDIT_2026-06-11.md`, §5/§9.1)
declared the forward channel "almost entirely unwired." That was **partly stale** by
2026-06-13: universal S2/S3 items had been wired in the interim. The accurate
pre-change state, verified against live code:

| Layer | `feedsInto` before |
|---|---|
| `universal.ts` S2 + S3 | wired (~31 edges) |
| `universal.ts` S1 / S4 / S5 / S6 | empty (S1 had prose `feedNote`s only) |
| `universal.ts` S7 | terminal — correct |
| All 14 per-type catalogues | **zero `feedsInto` anywhere** |

## Decision

**1. `feedsInto` is display-only — never a gate.** A dangling target degrades to a
raw-id label; zero behavioural/lock blast radius. (Contrast `prerequisiteObjectiveIds`,
which silently locks an objective forever if it references a dropped id.) This is why a
full sweep was safe to apply as authoring judgment.

**2. The wiring invariant ("fully wired").** For every objective `O`:
- **Outbound (S1–S6)** — `O` has ≥1 checklist item declaring ≥1 `feedsInto` target,
  OR `O` is an allowlisted `terminalObjectives` entry.
- **Inbound (S4–S7)** — `O` is the target of ≥1 upstream item, OR `O` is an allowlisted
  `rootObjectives` entry.

Stratum scoping is deliberate: **outbound stops at S6** (S7 is the terminal phasing tier,
nothing downstream to feed); **inbound starts at S4** because `feedsInto` targets are S4–S7
by construction (the universal forward-target menu + same-catalogue later objectives), so
S1 (project entry) and S2–S3 (land/systems reading, i.e. observation *inputs*) are sources
of the forward graph, not sinks. Asserting inbound on S2–S3 would force a wholesale
two-stratum root exemption that encodes a structural truth as noise. The full force of the
invariant lands on **S4/S5/S6** — every decision/design objective must be both informed by
≥1 upstream item and inform ≥1 downstream objective.

**3. Per-edge derivation methodology** (priority order): (a) existing prose cites
(`feedNote`/`feedHint` or downstream checklist text already naming the relationship —
encoded verbatim); (b) the prereq graph (forward edge = inverse of `prerequisiteObjectiveIds`
at item granularity); (c) domain affinity (soil→soil-improvement, hydrology→water-strategy,
terrain→zones/access, capacity bands→s7-phase1/resource-plan, etc.). Targets constrained to
{universal} ∪ {same-catalogue}. No new prose authored — `feedsInto` is structural wiring only.

**4. Enforcement via the established baseline/ratchet idiom** (mirrors
`completionPathGaps.baseline.json`). Allowlists live in
`packages/shared/src/constants/plan/__tests__/feedsIntoCoverage.baseline.json`. Anything
unwired and not allowlisted fails `spineTraceability.conformance.test.ts`. Stale-guard
assertions reject any allowlist entry that no longer earns its keep (id not authored / out
of its stratum band / has since become wired or fed), so the baseline cannot rot.

## Outcome

Every S1–S6 objective across `universal.ts` + all 14 per-type catalogues now feeds ≥1
downstream objective; every S4–S7 objective is fed by ≥1 upstream item. **1327 feed-bearing
checklist items** across the catalogues (universal 78, silvopasture 154, agritourism 159,
conservation 140, offGrid 129, livestockOperation 122, marketGarden 110, orchard 78,
ecovillage 73, wellness 70, regenFarm 69, education 51, homestead 43, residential 32,
nursery 19).

**Zero terminal allowlist entries** (outbound is fully wired — no S1–S6 orphans). **Five
root allowlist entries**, each a genuine structural root:

- `mgd-s6-adaptive-management`, `ofg-s6-adaptive-management` — S6 end-of-season
  feedback-loop protocols; their only conceivable inbound is same-stratum S6 monitoring,
  which strictly-later forbids; all items feed S7.
- `con-s6-external-relations-compliance` — S6 external-relations/compliance system seeded
  from universal stakeholder context + the regulatory/funding environment, not any
  same-catalogue earlier-stratum survey.
- `silv-sec-s4-stock-infrastructure`, `lvs-sec-s4-stock-infrastructure` — additive
  secondary (livestock) layer **entry decisions** at S4; the additive layer begins at S4 and
  carries no S1–S3 reads of its own, so it has no upstream feeder.

Two genuine inbound misses were **wired rather than allowlisted** (an upstream read exists):
- `orch-s5-tree-protection` ← `orch-s2-landscape-context-c1` ("Map surrounding land uses
  within 2km") — mapping adjacent bushland/reserves is what surfaces the rabbit/deer/possum/
  wallaby browsing pressure the tree guards counter.
- `mgd-s5-propagation-nursery` ← `mgd-s1-production-targets-sales-c2` (volume targets →
  transplant quantity) + `mgd-s4-crop-rotation-bed-layout-c2` (rotation interval →
  succession/propagation timing).

**Conformance test strengthened.** The prior 5-consumer floor (kept) is now supplemented by
four new assertions in `spineTraceability.conformance.test.ts`: outbound participation,
inbound participation, stale-terminal guard, stale-root guard. Suite count 14 → 18.

**Task layer re-verified (no gaps):**
- `actToolCoverage.test.ts` (17) + `completionPathAudit.ratchet.test.ts` (5) green —
  objective→Act-tool wiring unaffected (feedsInto is orthogonal).
- OLOS-tier `requiredInputs` chains (observe→plan→act, per domain) are **generated** by
  `requiredInputsForStage` via `buildObjectiveId(domain, upstream-stage)`, so every
  `objectiveId` resolves by construction. Added a referential-resolution guard to
  `src/tests/olos.test.ts` (34 → 35) to lock this against future drift.

## Verification

- `spineTraceability.conformance` + `catalogues`: 138/138 (bounded `--pool=forks`).
- **Negative check:** removing the sole feeder of `orch-s5-tree-protection` made the
  inbound assertion fail listing exactly `orch-s5-tree-protection (s5-system-design)`;
  restored → green.
- Full `@ogden/shared` suite: **80 files / 1368 tests green.**
- `@ogden/shared` `tsc --noEmit` (8 GB heap): clean (the package's own `lint` script).
- `src/tests/olos.test.ts`: 35/35.

## Scope / non-goals

- No `prerequisiteObjectiveIds` / gating change. No prose authored. No Act-tool catalogue
  change. No runtime behaviour change (display-only).
- Amanah: clean — structural wiring of internal objective relationships; no riba/gharar
  surface, no capital-channel/CSA framing touched.
- Not committed — branch `main`; working tree carries the wiring edits + the new baseline.
  Push/commit awaits steward (standing rule).

## Files

- `packages/shared/src/constants/plan/catalogues/{universal + 14 per-type}.ts` — feeds added.
- `packages/shared/src/constants/plan/__tests__/feedsIntoCoverage.baseline.json` — new.
- `packages/shared/src/constants/plan/__tests__/spineTraceability.conformance.test.ts` — +4 assertions.
- `packages/shared/src/tests/olos.test.ts` — +1 requiredInputs resolution guard.
- `FEEDS_INTO_WIRING_2026-06-13.md` — reviewable wiring artifact (atlas root).

Supersedes §5 + §9.1 of `STRATUM_TRACEABILITY_AUDIT_2026-06-11.md`.
