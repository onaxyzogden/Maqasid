import { ShieldOff } from 'lucide-react';
import './BbosLateDisqualifierBanner.css';

// The late ★ disqualifier banner, shared by both dashboards. `gate` is the
// amanahLate result from lateDisqualifier() (bbos-named-gates.js); its name,
// reason and cite are shown as written, never re-worded. The banner writes
// nothing: the store already refuses Advance and Close Cycle through
// gateMoveRefusal, and there is no override. Halt only opens the dashboard's
// own confirm flow (the Brief, or the Reject modal) with the Amanah reason
// chosen, so the halt entry is appended there, with its written basis.
export default function BbosLateDisqualifierBanner({ gate, onHalt, canHalt = true }) {
  if (!gate) return null;
  return (
    // A region, not an alert: the banner stays up on every stage view, and
    // an alert would be announced again on each mount.
    <div className="bld" role="region" aria-labelledby="bld-title">
      <ShieldOff size={20} className="bld__icon" aria-hidden="true" />
      <div className="bld__body">
        <div className="bld__title" id="bld-title">{gate.name}</div>
        {gate.reasons.map((r) => (
          <p key={r} className="bld__reason">{r}</p>
        ))}
        <p className="bld__hold">
          Advancing and closing the cycle are held on every stage after CRD. There is no override.
        </p>
        <p className="bld__cite">{gate.cite}</p>
      </div>
      {canHalt ? (
        <button type="button" className="bld__halt" onClick={onHalt}>
          <ShieldOff size={14} aria-hidden="true" /> Halt &amp; route to rejection…
        </button>
      ) : (
        <p className="bld__no-halt">Only the Owner of the Amanah Proof Audit can halt the pipeline.</p>
      )}
    </div>
  );
}
