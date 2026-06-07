---
title: "BBOS Dashboard: OPT Retrospective + Approval Brief Wired Live"
type: decision
date: 2026-06-05
status: accepted
tags: [bbos, ui, dashboard, adapter, data-wiring, redesign, retrospective, approval-brief, gate]
superseded_by: null
---

# BBOS Dashboard: OPT Retrospective + Approval Brief Wired Live

## Context

The mock→live adapter pass ([[2026-06-04-bbos-dashboard-adapter-mock-to-live]]) wired stages IDY→RET live but left two areas inert/mock-fed in the redesigned [[bbos-pipeline]] dashboard: the **OPT retrospective** execution block (`metrics`/`bhi`/`restorationItems`, reused from the OLOS mock) and **most of the Approval Brief** (only project/covenant/gate rendered; findings/constraints/assets/closing fell through to a `bpd-empty` stub; readiness + gate decision were hardcoded/inert). This decision records closing both, keeping the adapter as the single seam — components still consume only the `PipelineVM` from `buildPipelineViewModel(...)`.

## Decision

Assemble both areas live in the adapter and keep the two presentational components dumb. Four user-confirmed scope choices govern the no-clean-source concepts:

1. **Restoration — live empty-state, no synthesis.** Items come from filed OPT-S4 actions (`action1`/`action2`/`action3`) only; no fabricated severity/status tags. Empty array → component empty-state.
2. **Gate decision — live write-actions.** proceed→`advanceBbosStage(nextStageId)`, halt→`rejectBbosPipeline(reasonId)` via a `BBOS_REJECTION_REASONS` picker; proceed-with-conditions has no store action (inert/annotated). Writes are guarded to the **active** stage only (`gate.canAct = status === "active"`).
3. **Constraints — OPT-S5 Hold List at OPT.** `{kind:"holdlist", holdItems, g72Check}` from OPT-S5 field data; all other stages fall back to `{kind:"signals", unmet}` (gate signals scoring `pts < 4`).
4. **Metrics — values only.** CM-1..4 from OPT-S1 as value+unit strings; benchmark/trend/status badges dropped (no live source). BHI hero = live computed average of normalized BHI + live `bhiOverallReading`, replacing the hardcoded "7.7"/"Cycle 1" copy.

### Adapter additions
- `buildOptExecution(taskMap, cycle)` → `{type:"retrospective_dashboard", spiritualOpen, spiritualGate, metrics, bhi, bhiHero, restorationItems}`. BHI values normalized to 0–10 via `normalizeBhi(raw, kind)` for `pct` (÷10), `ten` (as-is), `ratio` ("X/10"→X), all clamped. Hero average excludes unparseable entries; null when no BHI filed.
- `buildBrief(stageId, status, taskMap, items, identity, nextStageN)` → `{identity, covenant:{readiness}, findings, constraints, assets, gate, closing}`. findings/gate.checks from `scoreStage` signals (`passed: pts >= 4`); readiness from `getBbosStageIslamic().readiness`; assets reuse the already-partitioned research/asset items.
- `optField(taskMap, taskId, fieldId)` returns a non-empty field value or null (taskMap keyed by `bbosTaskType`).

### Gate semantics
- The brief stays presentational: the dashboard root subscribes to `advanceBbosStage`/`rejectBbosPipeline` and passes `onAdvance`/`onReject` callbacks. `onAdvance` computes the **next** stage from `BBOS_STAGES` (index+1) — passing the current stage id would be a no-op since `advanceBbosStage(projectId, stageId)` sets `bbosStage = stageId`.
- On the final stage (OPT) there is no next stage; proceed is labelled "Close Cycle (deferred)" and left inert (cycle restart via `startNewBbosCycle` is out of scope this pass).
- The action button is disabled unless `gate.canAct` AND a valid decision is selected (and, for halt, a rejection reason).

## Consequences

- **Positive:** The redesigned dashboard is now fully live end-to-end behind the flag; no mock seed and no fabricated retrospective data remain. The adapter remains the single pure, unit-testable seam (16 adapter cases). Gate verdicts stay consistent with the legacy dashboard via the shared `scoreStage`.
- **Bug surfaced & fixed:** the prior wiring passed the current stage id to `advanceBbosStage` (silent no-op); now resolves the next stage id.
- **Guarded risk:** write-actions mutate real pipeline state, mitigated by the `canAct` active-stage guard; verified only on a synthetic project, cleaned up after.
- **Deferred:** cycle-completion / "Close Cycle" (`startNewBbosCycle`); proceed-with-conditions as a first-class store state; operator/client as real project-schema fields; typed execution-task forms.

## Verification

`npm test` 77 passing (70 prior + 7 new in `adapter.test.js`); `npm run lint` green (grounding strict + inline-refs ratchet 0); `npm run build` green; ESLint 0 errors. Preview (flag ON) on a synthetic OPT project: metrics 72/64/88/31%, BHI hero 8.1 · Cycle 3 · ALIGNED, restoration from filed OPT-S4 actions only, OPT-S5 hold list, gate verdict + radios; proceed advanced STR→OFR, halt set `rejectedAt`+`rejectionReason:"riba"`; flag-OFF legacy `BbosFullDashboard` unchanged. Synthetic data removed afterward; real BBOS project untouched.

## Related

- [[2026-06-04-bbos-dashboard-adapter-mock-to-live]] — the prior pass this completes
- [[2026-06-04-bbos-redesigned-dashboard-adapter-shell]] — the original adapter shell
- [[bbos-pipeline]] — entity page
