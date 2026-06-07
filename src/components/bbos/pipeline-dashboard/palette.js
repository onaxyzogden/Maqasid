// BBOS Pipeline Dashboard - color/label helpers (no JSX).
// ---------------------------------------------------------------------------
// Dynamic colors are expressed as inline CSS custom properties (--c / --c-dim /
// --c2) that reference the scoped palette vars in BbosPipelineDashboard.css.
// No raw color literals live in JS - only var() references to the palette.
// Kept JSX-free so the component files (primitives.jsx etc.) can satisfy the
// react-refresh "only export components" rule.

const V = {
  complete: "var(--bpd-complete)", completeDim: "var(--bpd-complete-dim)",
  active: "var(--bpd-active)", activeDim: "var(--bpd-active-dim)",
  avail: "var(--bpd-avail)", availDim: "var(--bpd-avail-dim)",
  locked: "var(--bpd-locked)", bg3: "var(--bpd-bg3)",
  gold: "var(--bpd-gold)", red: "var(--bpd-red)", teal: "var(--bpd-teal)",
  textSecondary: "var(--bpd-text-secondary)", textTertiary: "var(--bpd-text-tertiary)",
};

// ----- dynamic color var maps (return inline style objects) -----------------
export function statusVars(s) {
  const m = {
    complete: [V.complete, V.completeDim],
    active: [V.active, V.activeDim],
    available: [V.avail, V.availDim],
    locked: [V.locked, V.bg3],
  }[s] || [V.locked, V.bg3];
  return { "--c": m[0], "--c-dim": m[1] };
}

export function itemVars(s) {
  const c = { filed: V.complete, in_review: V.gold, pending: V.textTertiary,
    passed: V.complete, failed: V.red }[s] || V.textTertiary;
  return { "--c": c };
}

export function typeVars(t) {
  const c = { gate_check: V.gold, posting: V.teal, proof_capture: V.active,
    call_log: V.avail, confirmation: V.complete, filing: V.textSecondary }[t] || V.textSecondary;
  return { "--c": c };
}

export function metricVars(status) {
  const c = status === "pass" ? V.complete : status === "warn" ? V.gold : V.red;
  return { "--c": c };
}

export function bhiVars(value) {
  const c = value >= 8 ? V.complete : value >= 7 ? V.gold : V.red;
  return { "--c": c };
}

export function restoVars(severity, status) {
  const c = severity === "critical" ? V.red : severity === "moderate" ? V.gold : V.textSecondary;
  const c2 = status === "resolved" ? V.complete : status === "in_progress" ? V.active : V.textTertiary;
  return { "--c": c, "--c2": c2 };
}

// ----- label helpers --------------------------------------------------------
export const statusLabel = (s) =>
  ({ complete: "Complete", active: "In Progress", available: "Ready", locked: "Locked" }[s] || "Locked");

export const iLabel = (s) =>
  ({ filed: "Filed", in_review: "In Review", pending: "Pending", passed: "Passed", failed: "Failed" }[s] || "—");

export const typeLabel = (t) =>
  ({ gate_check: "Gate Check", posting: "Post & Record", proof_capture: "Proof Capture",
    call_log: "Call Log", confirmation: "Confirm", filing: "Filing" }[t] || t);

export const execTypeLabel = (t) =>
  ({ import_review: "Import & Review", execution_tracking: "Execution & Tracking",
    field_execution: "Field Execution", retrospective_dashboard: "Retrospective Dashboard" }[t] || t);

export const gateStatusLabel = (s) =>
  s === "passed" ? "✓ Passed" : s === "in_review" ? "◐ In Review"
    : s === "pending" ? "○ Pending" : "— Locked";

export const gateNodeIcon = (s) =>
  s === "passed" ? "✓" : s === "in_review" ? "◐" : "○";
