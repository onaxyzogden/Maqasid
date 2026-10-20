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
//
// Closing a cycle at the final stage is a 'cycle' entry: logged in the cycle
// it closes, on the stage it closes from, with toStageId 'IDY' (the next
// cycle's first stage). The store increments the cycle after appending it.
//
// Undo is a record too: a 'reversed' entry points at the move it undoes
// (reversesId) and the pipeline is put back. Only the last entry in the log,
// and only a move (proceed, halt, cycle), can be reversed.
//
// Named gates (bbos-named-gates.js): a conditions entry may name the gate it
// answers (gateId) and the one role allowed to resolve it (resolverRole, e.g.
// 'OW' for an Amanah escalation). A resolved entry from any other role is
// refused. A move records the gate acknowledgements it was made on.
import { genGateDecisionId } from '../../services/id';

export const GATE_DECISIONS = ['proceed', 'conditions', 'halt', 'resolved', 'cycle', 'reversed'];
const REVERSIBLE = ['proceed', 'halt', 'cycle'];

const isResolved = (log, conditionsId) =>
  (log || []).some((e) => e.decision === 'resolved' && e.resolvesId === conditionsId);

/** True when a 'reversed' entry undoes the entry with this id. */
export const isReversed = (log, id) =>
  (log || []).some((e) => e.decision === 'reversed' && e.reversesId === id);

/**
 * Build one log entry. Returns null when the record is not loggable
 * (unknown decision, missing stage, or an empty basis). A 'resolved' record
 * must point at an existing, still-open conditions entry on the project; it
 * takes that entry's stage and cycle.
 *
 * @param {object} project — the project the decision belongs to
 * @param {{ stageId?: string, decision: 'proceed'|'conditions'|'halt'|'resolved'|'cycle', basis: string,
 *           conditions?: string, reasonId?: string, toStageId?: string,
 *           resolvesId?: string, closingNote?: string, by?: string|null,
 *           gateId?: string, resolverRole?: string, acknowledged?: string[] }} record
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
    if (target.resolverRole && record.by !== target.resolverRole) return null;
    stageId = target.stageId;
    cycle = target.cycle;
    resolvesId = target.id;
  }
  let reversesId = null;
  if (record.decision === 'reversed') {
    const log = project?.bbosGateLog || [];
    const target = log[log.length - 1];
    if (!target || target.id !== record.reversesId || !REVERSIBLE.includes(target.decision)) return null;
    stageId = target.stageId;
    cycle = target.cycle;
    reversesId = target.id;
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
    toStageId: record.decision === 'proceed' ? record.toStageId || null
      : record.decision === 'cycle' ? 'IDY' : null,
    resolvesId,
    reversesId,
    gateId: record.decision === 'conditions' ? record.gateId || null : null,
    resolverRole: record.decision === 'conditions' ? record.resolverRole || null : null,
    acknowledged: record.decision === 'proceed' || record.decision === 'cycle'
      ? (Array.isArray(record.acknowledged) ? [...record.acknowledged] : []) : null,
    closingNote: record.decision === 'resolved' || record.decision === 'reversed' ? null : text(record.closingNote),
    by: record.by || null,
  };
}

/** Return the project with the record appended, or unchanged if not loggable. */
export function appendGateEntry(project, record) {
  const entry = buildGateEntry(project, record);
  if (!entry) return project;
  return { ...project, bbosGateLog: [...(project.bbosGateLog || []), entry] };
}

/**
 * Undo the last move: put the pipeline back where that entry found it and
 * append a 'reversed' entry. Returns the project unchanged when refused.
 * (A target that is already reversed is never last, so the last-entry rule
 * also stops a double reversal.)
 */
export function reverseGateDecision(project, entryId, { basis, by = null } = {}) {
  const log = project?.bbosGateLog || [];
  const target = log[log.length - 1];
  const logged = appendGateEntry(project, { decision: 'reversed', reversesId: entryId, basis, by });
  if (logged === project) return project;
  if (target.decision === 'proceed') return { ...logged, bbosStage: target.stageId };
  if (target.decision === 'halt') return { ...logged, rejectedAt: null, rejectionReason: null, rejectedBy: null };
  return { ...logged, bbosCycle: target.cycle, bbosStage: target.stageId };
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
