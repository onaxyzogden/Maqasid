# ADR — Plan-strata objective titles read as end-state goals, not imperative tasks

**Date:** 2026-05-31
**Project:** [[olos]] (atlas)
**Status:** accepted
**Branch:** `feat/atlas-permaculture`

## Context

Every Plan-strata objective renders its `.title` as the objective name across the
steward-facing surface (`ObjectiveHeader`, `ObjectiveCard`, `NextUpCard`,
`ObjectiveDetailPanel`, the strata/spine panels). The authored titles were phrased as
**imperative tasks** — "Survey terrain & topography", "Define water strategy", "Design
access & circulation" — so the Plan stage read as a to-do list rather than a set of
outcomes to reach. The operator wanted the Plan stage to read as **goals / objectives**:
the end-state the steward is working toward.

The per-objective work instructions still live in `checklist[].label`, `focusedQuestion`,
and `completionGate`; those stay task-like by design. Only the headline `title` changed.

## Decisions

1. **Title voice = achieved end-state outcome.** Each title is now phrased as the result
   reached, with a quality adjective where it adds meaning, not an action to perform:
   - **Survey / Map / Assess** (observation) -> "A clear read of …" / "A mapped picture
     of …" (e.g. "Survey terrain & topography" -> "A clear read of terrain & topography").
   - **Define / Confirm / Decide** (decision) -> the settled framework itself (e.g.
     "Define water strategy" -> "A sound, resilient water strategy"; "Confirm project
     direction & feasibility" -> "A confirmed, feasible project direction").
   - **Design** (system design) -> the designed system, ready to build (e.g. "Design
     access & circulation" -> "An efficient access & circulation design"; "Design
     monitoring & observation system" -> "A working monitoring & observation system").
   - **phasing / resourcing / register** -> the completed plan/register (e.g. "Define
     risk & contingency register" -> "A complete risk & contingency register").

2. **Scope = all 12 catalogues (~199 titles).** Every `obj({...})` title in
   `packages/shared/src/constants/plan/catalogues/` was reworded — `universal.ts` (19) plus
   every primary/secondary type file (silvopasture 31, residential 6, regenFarm 13,
   nursery 8, orchard 30, agritourism 29, ecovillage 31, wellness 32), including
   dormant/unbuilt project types, so the voice is consistent everywhere. `PatchRecord`
   objects carry no `title` and were untouched.

3. **Provenance = code diverges, `ref:` retained.** Display titles now **intentionally
   diverge from the verbatim spec catalogues** (RegenFarm Objective Catalogue v1.3,
   Silvopasture, etc.). The `ref:` pointer on each objective (`U-S2.1`, `SILV-S4.4`, …) is
   **unchanged** and remains the provenance link back to the source spec; only the display
   string was reworded. No `id`, `ref`, `source`, `stratumId`, `focusedQuestion`,
   `checklist`, `decisionGroups`, `completionGate`, `actHandoff`, or `parameterGroup` was
   touched.

4. **Constraints honoured.** ASCII-only copy (straight quotes, " - " for dashes); titles
   kept concise (heading-length); domain nouns and `&`-pairings preserved so each title
   still maps to its `ref`/`focusedQuestion`/`completionGate`. The ecovillage financial
   titles ("financial contribution & shared economics model", "communal financial plan &
   contribution schedule") were reworded with ordinary-finance voice only — **no
   investor / CSRA / advance-purchase framing** was introduced (standing fiqh constraint).

## Notes

- **`stratumObjectives.ts` is stale dead code.** `PLAN_STRATUM_OBJECTIVES` (the 8-item
  Slice-1.1 skeleton) has no live importers — it was superseded by the catalogues. Per
  "no deletion in revamps" it stays on disk and was left untouched (its titles were NOT
  reworded); a future reader should treat the catalogues, not this file, as the live
  source of objective titles.
- **No string coupling.** All live keys/selectors use `objective.id`; no code matches on
  `title`. The catalogue conformance test asserts schema/id/ref/layer invariants only and
  never pins title text, so the rewording is test-safe.

## Verification

- `packages/shared` `tsc --noEmit` exit 0 (no new errors).
- Catalogue conformance suite `catalogues.test.ts` **75/75** green.
- Grep confirms zero remaining imperative-verb title prefixes across `catalogues/`.

See [[olos]] · session log [[log 2026-05-31]] · re-skin ADR
[[2026-05-31-atlas-plan-spine-live-reskin]].
