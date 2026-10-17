// BBOS gate-decision record.
// ---------------------------------------------------------------------------
// Every routing decision made at a stage gate (proceed, proceed with
// conditions, halt) is appended to `project.bbosGateLog` with the written
// basis it was made on. The basis is the record: the decision is closed on the
// findings, not on momentum. Pure helpers so project-store stays thin and the
// shape is testable without localStorage.
import { genGateDecisionId } from '../../services/id';

export const GATE_DECISIONS = ['proceed', 'conditions', 'halt'];

/**
 * Build one log entry. Returns null when the record is not loggable
 * (unknown decision, missing stage, or an empty basis).
 *
 * @param {object} project — the project the decision belongs to
 * @param {{ stageId: string, decision: 'proceed'|'conditions'|'halt', basis: string,
 *           conditions?: string, reasonId?: string, toStageId?: string,
 *           closingNote?: string, by?: string|null }} record
 */
export function buildGateEntry(project, record) {
  if (!record || !record.stageId || !GATE_DECISIONS.includes(record.decision)) return null;
  const basis = (record.basis || '').trim();
  if (!basis) return null;
  const text = (v) => {
    const t = (v || '').trim();
    return t || null;
  };
  return {
    id: genGateDecisionId(),
    at: new Date().toISOString(),
    cycle: project?.bbosCycle || 1,
    stageId: record.stageId,
    decision: record.decision,
    basis,
    conditions: record.decision === 'conditions' ? text(record.conditions) : null,
    reasonId: record.decision === 'halt' ? record.reasonId || null : null,
    toStageId: record.decision === 'proceed' ? record.toStageId || null : null,
    closingNote: text(record.closingNote),
    by: record.by || null,
  };
}

/** Return the project with the record appended, or unchanged if not loggable. */
export function appendGateEntry(project, record) {
  const entry = buildGateEntry(project, record);
  if (!entry) return project;
  return { ...project, bbosGateLog: [...(project.bbosGateLog || []), entry] };
}

/** Entries for one stage, newest first. */
export function gateEntriesForStage(log, stageId) {
  return (log || []).filter((e) => e.stageId === stageId).slice().reverse();
}
