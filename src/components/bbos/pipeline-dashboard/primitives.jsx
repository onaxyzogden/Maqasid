// BBOS Pipeline Dashboard - shared visual primitives (JSX only).
// Color/label helpers live in palette.js so this file exports components only
// (satisfies the react-refresh "only export components" lint rule).
import { itemVars, statusLabel, statusVars } from "./palette";

export function Ornament({ size = 48, opacity = 0.12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" style={{ opacity }}>
      <polygon points="24,2 46,13 46,35 24,46 2,35 2,13" fill="none" stroke="currentColor" strokeWidth="0.8" />
      <polygon points="24,8 40,16 40,32 24,40 8,32 8,16" fill="none" stroke="currentColor" strokeWidth="0.5" />
      <polygon points="24,14 34,19 34,29 24,34 14,29 14,19" fill="none" stroke="currentColor" strokeWidth="0.4" />
      <circle cx="24" cy="24" r="4" fill="none" stroke="currentColor" strokeWidth="0.6" />
      <line x1="24" y1="2" x2="24" y2="46" stroke="currentColor" strokeWidth="0.3" />
      <line x1="2" y1="24" x2="46" y2="24" stroke="currentColor" strokeWidth="0.3" />
    </svg>
  );
}

export function SPill({ status, small }) {
  return (
    <span className={small ? "bpd-spill bpd-spill--sm" : "bpd-spill"} style={statusVars(status)}>
      {statusLabel(status)}
    </span>
  );
}

export function Arc({ pct, status, size = 36 }) {
  const r = 14, c = 2 * Math.PI * 14;
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" style={statusVars(status)}>
      <circle className="bpd-arc-track" cx="18" cy="18" r={r} fill="none" strokeWidth="2.5" />
      {pct > 0 && (
        <circle
          className="bpd-arc-prog" cx="18" cy="18" r={r} fill="none" strokeWidth="2.5"
          strokeDasharray={`${(pct / 100) * c} ${c}`} strokeLinecap="round"
          transform="rotate(-90 18 18)"
        />
      )}
    </svg>
  );
}

export function Spirit({ attr, note, lg }) {
  return (
    <div className={lg ? "bpd-spirit bpd-spirit--lg" : "bpd-spirit"}>
      <span className="bpd-orn bpd-orn--abs bpd-orn--spirit"><Ornament size={56} opacity={1} /></span>
      <div className="bpd-spirit__row">
        <span className="bpd-spirit__sigil">{"⧁"}</span>
        <div>
          <div className="bpd-spirit__attr">{attr}</div>
          <div className="bpd-spirit__note">{note}</div>
        </div>
      </div>
    </div>
  );
}

export function Dot({ status }) {
  return <div className="bpd-dot" data-status={status} style={itemVars(status)} />;
}
