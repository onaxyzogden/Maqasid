// BBOS gate-decision record.
// ---------------------------------------------------------------------------
// Every routing decision made at a stage gate (proceed, proceed with
// conditions, halt) is appended to `project.bbosGateLog` with the written
// basis it was made on. The basis is the record: the decision is closed on the
// findings, not on momentum. Pure helpers so project-store stays thin and the
// shape is testable without localStorage.
//
// Conditions are closed the same way they were opened: by a new 'resolved'
// entry that points at the conditions entry (resolvesId) with its own basis.
// Nothing already in the log is ever edited.
import { genGateDecisionId } from '../../services/id';

export const GATE_DECISIONS = ['proceed', 'conditions', 'halt', 'resolved'];

const isResolved = (log, conditionsId) =>
  (log || []).some((e) => e.decision === 'resolved' && e.resolvesId === conditionsId);

/**
 * Build one log entry. Returns null when the record is not loggable
 * (unknown decision, missing stage, or an empty basis). A 'resolved' record
 * must point at an existing, still-open conditions entry on the project; it
 * takes that entry's stage and cycle.
 *
 * @param {object} project — the project the decision belongs to
 * @param {{ stageId?: string, decision: 'proceed'|'conditions'|'halt'|'resolved', basis: string,
 *           conditions?: string, reasonId?: string, toStageId?: string,
 *           resolvesId?: string, closingNote?: string, by?: string|null }} record
 */
export function buildGateEntry(project, record) {
  if (!record || !GATE_DECISIONS.includes(record.decision)) return null;
  const basis = (record.basis || '').trim();
  if (!basis) return null;
  const text = (v) => {
    const t = (v || '').trim();
    return t || null;
  };

  let stageId = record.stageId;
  let cycle = project?.bbosCycle || 1;
  let resolvesId = null;
  if (record.decision === 'resolved') {
    const log = project?.bbosGateLog || [];
    const target = log.find((e) => e.id === record.resolvesId);
    if (!target || target.decision !== 'conditions' || isResolved(log, target.id)) return null;
    stageId = target.stageId;
    cycle = target.cycle;
    resolvesId = target.id;
  }
  if (!stageId) return null;

  return {
    id: genGateDecisionId(),
    at: new Date().toISOString(),
    cycle,
    stageId,
    decision: record.decision,
    basis,
    conditions: record.decision === 'conditions' ? text(record.conditions) : null,
    reasonId: record.decision === 'halt' ? record.reasonId || null : null,
    toStageId: record.decision === 'proceed' ? record.toStageId || null : null,
    resolvesId,
    closingNote: record.decision === 'resolved' ? null : text(record.closingNote),
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

/**
 * Conditions recorded at this stage in this cycle that no 'resolved' entry
 * has closed yet, oldest first. These block the stage's Advance; earlier
 * cycles are history and do not.
 */
export function openConditions(log, stageId, cycle) {
  return (log || []).filter(
    (e) => e.decision === 'conditions' && e.stageId === stageId && e.cycle === cycle && !isResolved(log, e.id),
  );
}
