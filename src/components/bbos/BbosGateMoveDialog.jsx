import { useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight, RefreshCw } from 'lucide-react';
import { useProjectStore } from '../../store/project-store';
import { openConditions } from '../../data/bbos/bbos-gate-log';
import './BbosFullDashboard.css';

// The legacy gate-move dialog: Advance to the next stage, or, from the final
// stage (nextStage null), close the cycle and start the next from Identity.
// Either way it takes a written basis, and conditions still open on the stage
// this cycle must be marked resolved (each with its own basis) first.
// onConfirm({ basis }) hands the record to the caller, which moves the store.
//
// Portalled to document.body: a transformed ancestor in ProjectBoard would
// otherwise trap the fixed overlay inside the content column.
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
  const ready = !!basis.trim() && openConds.length === 0;

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
    onConfirm({ basis: basis.trim() });
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
                {resolvingId === c.id ? (
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
        {openConds.length > 0 ? (
          <p className="bfd__modal-blocked" role="note">
            {isCycle ? 'Closing the cycle' : 'Advance'} is blocked: {openConds.length} open condition{openConds.length === 1 ? '' : 's'} must be marked resolved first.
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
