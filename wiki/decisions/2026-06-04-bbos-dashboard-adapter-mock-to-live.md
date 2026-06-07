---
title: "BBOS Redesigned Dashboard Adapter: Mock → Live Wiring (Mappable Concepts)"
type: decision
date: 2026-06-04
status: accepted
tags: [bbos, ui, dashboard, adapter, data-wiring, redesign, scoring]
superseded_by: null
---

# BBOS Redesigned Dashboard Adapter: Mock → Live Wiring (Mappable Concepts)

## Context

The redesigned [[bbos-pipeline]] dashboard shipped 2026-06-04 as an adapter-driven visual shell behind the OFF-by-default `bbosNewDashboard` flag (see [[2026-06-04-bbos-redesigned-dashboard-adapter-shell]]). Its components consume **only** a view-model from a single seam — `buildPipelineViewModel(...)` — which initially returned a throwaway OLOS/Atlas mock. The seam existed precisely so the follow-up could swap the source mock→live as one module change, not a rewrite. This decision records that follow-up: replacing the adapter body with a live-store reader for the *mappable* concepts, returning the **same `PipelineVM` shape** so consuming components stay untouched.

## Decision

Replace `buildPipelineViewModel`'s body with a live reader for every concept that has a clean live equivalent, for stages IDY→RET. The signature gains a `tasks` argument (`buildPipelineViewModel({project, bbosFilter, tasks})`) so the adapter stays a **pure, unit-testable function** while the component owns the Zustand subscription; static data modules (`BBOS_STAGES`, `getBbosStageIslamic`, `getBbosTaskDefsByStage`, the new `scoreStage`) are imported directly inside the adapter.

Two user-confirmed scope decisions:

1. **Gate scoring extracted to a shared module.** `STAGE_SCORE_SIGNALS` + `countNonEmpty` + the verdict thresholds moved verbatim from `BbosFullDashboard.jsx` into **`src/data/bbos/bbos-stage-score.js`**, exporting `scoreStage(stageId, taskMap)` → `{totalPts, maxPts, pct, verdict, signals:[{label,pts}]}`. Imported by **both** the legacy dashboard and the new adapter — single source of truth, no drift.
2. **OPT retrospective stays inert.** Only the per-stage done/total signal exists live; the mock's benchmarks/trends, Barakah Health Index, and Restoration items have no live source. Rail / Overview / Research / Asset / Gate are wired live for IDY→RET; OPT's execution block is reused from the mock (`buildMockPipelineViewModel()`).

### Live mappings (IDY→RET)

| VM field | Live source |
|---|---|
| `status` (complete/active/available) | index of `project.bbosStage` in `BBOS_STAGES` |
| `progress` 0–100 | done task-defs / total defs per stage (`taskMap[def.id]` in Done col or `completedAt`) |
| `attributes[]` | `getBbosStageIslamic(id).attrs` → `Name · Title` (fallback: split `stage.attrs`) |
| `dua{arabic,translit,meaning}` | `getBbosStageIslamic(id).dua` (translit from live `trans`) |
| `spiritualOpen/Gate` | `attrs[0]`/`attrs[1]` → `{attr, note:body}` |
| `gate.status` | `scoreStage().verdict` + stage status (complete→passed; active QUALIFIED→passed, BLOCKED→pending, else in_review; available→pending) |
| `gate.label`, `tagline` | static domain maps in adapter (not in live data) |
| `researchItems`/`assetItems` | `getBbosTaskDefsByStage(id)` partitioned by `subLevel` prefix (S/V/FP/PATCH→research, A/AF/IC→asset) |
| item `status` | filed (done) / in_review (has field data) / pending |
| item `content` | non-empty `def.fields` joined as `label: value` |
| `gateChecks[]` | `scoreStage().signals` → `{id, label, passed: pts>=4}` |
| `meta.cycle/activeStageId` | `project.bbosCycle`/`bbosStage` |

Inert (mock-fed): OPT metrics/BHI/restoration; typed `executionTasks`; most of the Approval Brief.

## Rationale

- **Single-module swap, signature preserved.** Consuming components (rail, overview, ExecView, ApprovalBrief) needed no change — the seam held. `BbosPipelineDashboard.jsx` added one `useTaskStore` subscription and passes `tasks` into the memoized adapter call.
- **Shared `scoreStage` prevents drift.** The legacy `StageScoreCard` and the new gate both compute from the same signal table. Extraction is purely lexical (signals close over only `splitLines` + `countNonEmpty`), so legacy behavior is preserved.
- **Pure adapter, real test.** A contract test (`pipeline-dashboard/__tests__/adapter.test.js`, 8 cases) feeds a synthetic project + tasks and asserts the full VM shape, status derivation, gate-verdict mapping, research/asset partition, and live `dua.translit` — guarding the seam without a DOM.

## Alternatives Considered

- **Wire OPT retrospective + typed exec forms now** — rejected: no live source for BHI/restoration/benchmarks or the typed posting/call_log/proof_capture models; deferred to keep this pass clean.
- **Keep scoring duplicated in the adapter** — rejected: guarantees drift between the two dashboards' gate verdicts.
- **Subscribe to the store inside the adapter** — rejected: would make the seam impure and untestable; the component owns the subscription instead.

## Consequences

- With the flag ON, the new dashboard's rail, Stage Overview, and Execution View (research/asset/gate) are **live** for IDY→RET. OPT retrospective, typed exec tasks, and brief content remain inert/mock, flagged for the next pass.
- The adapter remains the single seam; gate scoring is now shared via `bbos-stage-score.js`.
- **Deferred to next pass:** OPT live metrics/BHI/restoration; typed execution tasks (posting/call_log/proof_capture); rich per-task content renderers; full Approval Brief wiring (covenant/findings/constraints/gate-decision actions); cycle-completion/close-cycle; "proceed with conditions" gate state; JSON stage-pack import; decision on retiring `BbosFullDashboard` at parity.

## Verification (2026-06-04)

`npm test` ✓ 70 passing (62 prior + 8 new contract tests). `npm run lint` ✓ (grounding strict + inline-refs ratchet 0) and `npm run build` ✓ (only pre-existing chunk-size/dynamic-import warnings). Preview-verified with screenshots on a synthetic BBOS project at stage CRD: **flag ON** → rail shows IDY complete + CRD active (live ✓ Amanah Gate, 100% progress from 2 done tasks), Stage Overview renders live governing attributes (Al-Musawwir/Al-Mudabbir) + duʿāʾ, live tasks surface (CRD-S3 "Integrity Proof Audit", CRD-V1 "Viability Gate Results", OFR-A1 "The Promise"); **flag OFF** → legacy `BbosFullDashboard` renders unchanged via shared `scoreStage` (StageScoreCard QUALIFIED; CRD-S3 shows injected STRONG status). Zero console errors. Synthetic preview project cleaned from localStorage afterward.

## Connections

- [[bbos-pipeline]] — the entity this dashboard visualizes
- [[2026-06-04-bbos-redesigned-dashboard-adapter-shell]] — the prior pass this completes (the adapter seam this swaps)
- [[milos]] — host application
- [[covenant-architecture]] — governing philosophy (gate verdicts, duʿāʾ per stage)
