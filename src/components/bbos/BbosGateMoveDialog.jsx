import { useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight, RefreshCw } from 'lucide-react';
import { useProjectStore } from '../../store/project-store';
import { useTaskStore } from '../../store/task-store';
import { openConditions } from '../../data/bbos/bbos-gate-log';
import { evaluateStageGates, gateMoveRefusal } from '../../data/bbos/bbos-named-gates';
import { getBbosRole } from '../../data/bbos/bbos-role-access';
import './BbosFullDashboard.css';

// The legacy gate-move dialog: Advance to the next stage, or, from the final
// stage (nextStage null), close the cycle and start the next from Identity.
// Either way it takes a written basis, and conditions still open on the stage
// this cycle must be marked resolved (each with its own basis) first.
// onConfirm({ basis, acknowledged }) hands the record to the caller, which
// moves the store.
//
// Named gates (bbos-named-gates.js): the stage's Factory-doc gates are shown
// with their status and the doc's own reasons. Blocked or incomplete gates
// hold Confirm, with no override. A gate in conditions is recorded here as a
// conditions entry that names the gate (and, for an Amanah escalation, the
// Owner as its only resolver). A clear gate's acknowledgements must be ticked.
// Confirm uses the same gateMoveRefusal the store does.
//
// Portalled to document.body: a transformed ancestor in ProjectBoard would
// otherwise trap the fixed overlay inside the content column.
const NO_TASKS = [];
const STATUS_LABEL = { clear: 'Clear', conditions: 'Conditions', incomplete: 'Incomplete', blocked: 'Blocked' };
const roleName = (id) => getBbosRole(id).label.toLowerCase();

export default function BbosGateMoveDialog({ project, fromStage, nextStage, onConfirm, onClose }) {
  const logBbosGateDecision = useProjectStore((s) => s.logBbosGateDecision);
  const [basis, setBasis] = useState('');
  const [resolvingId, setResolvingId] = useState(null);
  const [resolveBasis, setResolveBasis] = useState('');
  const [resolvedCount, setResolvedCount] = useState(0);

  const cycle = project.bbosCycle || 1;
  const openConds = openConditions(project.bbosGateLog, fromStage.id, cycle);
  // The acting role is the gate-log attribution; 'all' names no one.
  const role = project.bbosRole;
  const gateBy = role && role !== 'all' ? role : null;

  const isCycle = !nextStage;
  const title = isCycle ? `Complete cycle ${cycle}` : `Advance to ${nextStage.label}`;
  const tasks = useTaskStore((s) => s.tasksByProject[project.id] || NO_TASKS);
  const [acked, setAcked] = useState([]);
  const [recordingGate, setRecordingGate] = useState(null);
  const [condText, setCondText] = useState('');
  const [condBasis, setCondBasis] = useState('');
  const evaluation = evaluateStageGates(fromStage.id, tasks);
  const gateRefusal = gateMoveRefusal({ ...project, bbosStage: fromStage.id }, tasks, { acknowledged: acked });
  const gateConds = (gateId) => (project.bbosGateLog || []).filter(
    (e) => e.decision === 'conditions' && e.stageId === fromStage.id && e.cycle === cycle && e.gateId === gateId,
  );
  const holding = evaluation.gates.filter((g) => g.status === 'blocked' || g.status === 'incomplete');
  const ready = !!basis.trim() && openConds.length === 0 && !gateRefusal;

  const toggleAck = (id) => setAcked((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id]));

  const handleRecordConditions = (g) => {
    if (!condText.trim() || !condBasis.trim()) return;
    logBbosGateDecision(project.id, {
      decision: 'conditions',
      stageId: fromStage.id,
      basis: condBasis.trim(),
      conditions: condText.trim(),
      gateId: g.id,
      resolverRole: g.condition?.resolverRole || null,
      by: gateBy,
    });
    setRecordingGate(null);
    setCondText('');
    setCondBasis('');
  };

  const handleRecordResolution = () => {
    if (!resolvingId || !resolveBasis.trim()) return;
    logBbosGateDecision(project.id, {
      decision: 'resolved',
      resolvesId: resolvingId,
      basis: resolveBasis.trim(),
      by: gateBy,
    });
    setResolvingId(null);
    setResolveBasis('');
    setResolvedCount((n) => n + 1);
  };

  const handleConfirm = () => {
    if (!ready) return;
    onConfirm({ basis: basis.trim(), acknowledged: acked });
    onClose();
  };

  return createPortal(
    <div className="bfd__modal-overlay" onClick={onClose}>
      <div className="bfd__modal bfd__modal--advance" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={title}>
        <div className="bfd__modal-head">
          {isCycle ? <RefreshCw size={18} /> : <ArrowRight size={18} />}
          <span>{title}</span>
        </div>
        <p className="bfd__modal-desc">
          {isCycle
            ? `Close cycle ${cycle} at ${fromStage.label} and start cycle ${cycle + 1} from Identity. The decision and its basis are added to the gate record and cannot be edited.`
            : `Move the pipeline from ${fromStage.label} to ${nextStage.label}. The decision and its basis are added to the gate record and cannot be edited.`}
        </p>

        {evaluation.gates.length > 0 && (
          <section className="bfd__named-gates" aria-label="Named gates">
            <div className="bfd__open-conds-head">Named gates · {fromStage.label}</div>
            {evaluation.gates.map((g) => {
              const recorded = gateConds(g.id);
              return (
                <div key={g.id} className={`bfd__named-gate bfd__named-gate--${g.status}`}>
                  <div className="bfd__named-gate-head">
                    <span className="bfd__named-gate-name">{g.name}</span>
                    <span className={`bfd__named-gate-status bfd__named-gate-status--${g.status}`}>{STATUS_LABEL[g.status]}</span>
                  </div>
                  <div className="bfd__open-cond-meta">{g.cite}</div>
                  {g.reasons.length > 0 && (
                    <ul className="bfd__named-gate-reasons">
                      {g.reasons.map((r) => <li key={r}>{r}</li>)}
                    </ul>
                  )}
                  {g.status === 'conditions' && recorded.length === 0 && (
                    recordingGate === g.id ? (
                      <>
                        <label className="bfd__modal-field">
                          <span className="bfd__modal-field-label">Conditions (required)</span>
                          <textarea className="bfd__modal-textarea" rows={2} value={condText} onChange={(e) => setCondText(e.target.value)} />
                        </label>
                        <label className="bfd__modal-field">
                          <span className="bfd__modal-field-label">Basis for recording these conditions (required)</span>
                          <textarea
                            className="bfd__modal-textarea"
                            rows={2}
                            value={condBasis}
                            onChange={(e) => setCondBasis(e.target.value)}
                            placeholder="The findings the conditions are recorded on..."
                            autoFocus
                          />
                        </label>
                        {g.condition?.resolverRole && (
                          <p className="bfd__modal-hint">Only the {roleName(g.condition.resolverRole)} can mark these conditions resolved.</p>
                        )}
                        <div className="bfd__modal-actions">
                          <button className="bfd__modal-cancel" type="button" onClick={() => setRecordingGate(null)}>Cancel</button>
                          <button
                            className="bfd__modal-confirm bfd__modal-confirm--go"
                            type="button"
                            onClick={() => handleRecordConditions(g)}
                            disabled={!condText.trim() || !condBasis.trim()}
                          >
                            Record conditions
                          </button>
                        </div>
                      </>
                    ) : (
                      <button
                        className="bfd__modal-cancel bfd__open-cond-btn"
                        type="button"
                        onClick={() => { setRecordingGate(g.id); setCondText(g.condition?.text || ''); setCondBasis(''); }}
                      >
                        Record these conditions
                      </button>
                    )
                  )}
                  {g.status === 'conditions' && recorded.length > 0 && (
                    <p className="bfd__modal-hint">Conditions recorded. See Open conditions below.</p>
                  )}
                  {g.status === 'clear' && (g.acknowledgements || []).map((a) => (
                    <label key={a.id} className="bfd__named-gate-ack">
                      <input type="checkbox" checked={acked.includes(a.id)} onChange={() => toggleAck(a.id)} />
                      <span>{a.label}</span>
                    </label>
                  ))}
                </div>
              );
            })}
          </section>
        )}

        {openConds.length > 0 && (
          <section className="bfd__open-conds" aria-label="Open conditions">
            <div className="bfd__open-conds-head">
              Open conditions · {openConds.length} to resolve before {isCycle ? 'closing the cycle' : 'advancing'}
            </div>
            {openConds.map((c) => (
              <div key={c.id} className="bfd__open-cond">
                <div className="bfd__open-cond-text">{c.conditions}</div>
                <div className="bfd__open-cond-meta">
                  Recorded {new Date(c.at).toLocaleString()}{c.by ? ` · ${c.by}` : ''}
                </div>
                {c.resolverRole && c.resolverRole !== gateBy ? (
                  <p className="bfd__modal-hint" role="note">
                    Awaiting the {roleName(c.resolverRole)}&rsquo;s decision. Only the {roleName(c.resolverRole)} can resolve this condition.
                  </p>
                ) : resolvingId === c.id ? (
                  <>
                    <label className="bfd__modal-field">
                      <span className="bfd__modal-field-label">Basis for resolving this condition (required)</span>
                      <textarea
                        className="bfd__modal-textarea"
                        rows={2}
                        value={resolveBasis}
                        onChange={(e) => setResolveBasis(e.target.value)}
                        placeholder="What closed this gap, and where it is evidenced..."
                        autoFocus
                      />
                    </label>
                    <div className="bfd__modal-actions">
                      <button className="bfd__modal-cancel" type="button" onClick={() => { setResolvingId(null); setResolveBasis(''); }}>
                        Cancel
                      </button>
                      <button className="bfd__modal-confirm bfd__modal-confirm--go" type="button" onClick={handleRecordResolution} disabled={!resolveBasis.trim()}>
                        Record Resolution
                      </button>
                    </div>
                  </>
                ) : (
                  <button
                    className="bfd__modal-cancel bfd__open-cond-btn"
                    type="button"
                    onClick={() => { setResolvingId(c.id); setResolveBasis(''); }}
                  >
                    Mark resolved
                  </button>
                )}
              </div>
            ))}
          </section>
        )}

        {resolvedCount > 0 && (
          <p className="bfd__modal-status" role="status">
            {resolvedCount} condition{resolvedCount === 1 ? '' : 's'} marked resolved and added to the gate record.
          </p>
        )}

        <label className="bfd__modal-field">
          <span className="bfd__modal-field-label">
            {isCycle ? 'Basis for closing the cycle (required)' : 'Basis for the routing decision (required)'}
          </span>
          <textarea
            className="bfd__modal-textarea"
            rows={3}
            value={basis}
            onChange={(e) => setBasis(e.target.value)}
            placeholder={isCycle ? 'Record the specific basis for closing this cycle...' : 'Record the specific basis for advancing this stage...'}
          />
        </label>
        {holding.length > 0 ? (
          <p className="bfd__modal-blocked" role="note">
            {isCycle ? 'Closing the cycle' : 'Advance'} is held by the {holding.map((g) => g.name).join(' and ')}. See Named gates above; there is no override.
          </p>
        ) : openConds.length > 0 ? (
          <p className="bfd__modal-blocked" role="note">
            {openConds.every((c) => c.resolverRole && c.resolverRole !== gateBy)
              ? `${isCycle ? 'Closing the cycle' : 'Advance'} is held until the ${roleName(openConds[0].resolverRole)} resolves ${openConds.length} condition${openConds.length === 1 ? '' : 's'}.`
              : `${isCycle ? 'Closing the cycle' : 'Advance'} is blocked: ${openConds.length} open condition${openConds.length === 1 ? '' : 's'} must be marked resolved first.`}
          </p>
        ) : gateRefusal ? (
          <p className="bfd__modal-hint">
            {evaluation.gates.some((g) => g.status === 'conditions' && gateConds(g.id).length === 0)
              ? 'Record the conditions for each gate in conditions, then resolve them, to enable Confirm.'
              : 'Tick each acknowledgement to enable Confirm.'}
          </p>
        ) : !basis.trim() && (
          <p className="bfd__modal-hint">Write the basis to enable {isCycle ? 'Confirm cycle close' : 'Confirm advance'}.</p>
        )}
        <div className="bfd__modal-actions">
          <button className="bfd__modal-cancel" type="button" onClick={onClose}>
            Cancel
          </button>
          <button className="bfd__modal-confirm bfd__modal-confirm--go" type="button" onClick={handleConfirm} disabled={!ready}>
            {isCycle ? 'Confirm cycle close' : 'Confirm advance'}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
