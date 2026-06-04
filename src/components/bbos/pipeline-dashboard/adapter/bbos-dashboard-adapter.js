// BBOS Pipeline Dashboard - ADAPTER (the single data seam).
// ===========================================================================
// Components in pipeline-dashboard/ consume ONLY buildPipelineViewModel().
// They never touch live stores directly. This is deliberate: the follow-up
// wiring pass swaps the body of buildPipelineViewModel() from the mock seed to
// a live-store reader WITHOUT changing this signature, so every component stays
// untouched. Keep this file as the one place that knows where data comes from.
//
// ---- THE CONTRACT (PipelineVM) --------------------------------------------
// PipelineVM = {
//   meta: { cycle, doneCount, totalStages, activeStageId, briefSections },
//   stages: StageVM[]
// }
// StageVM = {
//   id, order, code, n, name, tagline, layer, status, progress,
//   attributes: string[],
//   dua: { arabic, translit, meaning },
//   gate: { label, status },
//   execution: ExecVM,
//   brief: { identity: { project, operator, client } }
// }
// ExecVM = {
//   type,                                  // import_review | execution_tracking | field_execution | retrospective_dashboard
//   spiritualOpen: { attr, note },
//   spiritualGate: { attr, note },
//   researchItems: ItemVM[],
//   assetItems: ItemVM[],
//   executionTasks: TaskVM[] | undefined,  // execution-type stages only
//   gateChecks: { id, label, passed }[] | undefined,
//   metrics | bhi | restorationItems       // retrospective (OPT) only
// }
// ItemVM = { id, taskType|null, label, glabel|null, status, desc, content|null }
//
// ---- LIVE SOURCES the follow-up maps FROM (named so the seam is explicit) --
//   * BBOS_STAGES / BBOS_LAYERS ............... stage list, order, layer
//   * DashboardView bbosMetrics pattern ....... per-stage status / progress
//   * getBbosStageIslamic(id) ................. attributes, dua, readiness
//   * getBbosTaskDefsByStage(id) .............. partition S/V/FP -> research,
//                                               A/AF/IC -> asset
//   * getBbosTaskDef / task.gLabel / bbosFieldData . label, glabel, content, status
//   * StageScoreCard signals + getBbosStageIslamic . gate { label, status }
//   * rejectBbosPipeline / onStageAdvance / bbosCycle . brief gate decision
// ===========================================================================

import { buildMockPipelineViewModel } from "./bbos-dashboard-mock";

/**
 * Build the dashboard view-model. Single seam between data and UI.
 *
 * Phase 1 (this pass): returns the throwaway mock seed.
 * Follow-up pass: read live stores here, keyed by `project` + `bbosFilter`,
 * returning the SAME PipelineVM shape. Callers do not change.
 *
 * @param {{ project?: object, bbosFilter?: string }} [opts]
 * @returns {PipelineVM}
 */
export function buildPipelineViewModel(opts = {}) {
  const { project, bbosFilter } = opts;
  // Referenced now so the signature is stable and lint-clean; the live pass
  // will key the store reads off these instead of discarding them.
  void project;
  void bbosFilter;
  return buildMockPipelineViewModel();
}

/**
 * @typedef {object} PipelineVM
 * @property {object} meta
 * @property {StageVM[]} stages
 */

/**
 * @typedef {object} StageVM
 * @property {string} id
 * @property {number} order
 * @property {string} status
 * @property {number} progress
 */
