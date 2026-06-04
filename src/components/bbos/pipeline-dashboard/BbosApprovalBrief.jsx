// BBOS Pipeline Dashboard - Stage Approval Brief modal (left nav + sections).
// Portal + body scroll-lock. Write-actions inert this pass (local state only).
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Ornament, SPill } from "./primitives";

const READINESS = [
  { key: "rl", label: "Governing When", tone: "complete", c: "var(--bpd-complete)",
    text: "You are applying the criteria to yourself with the same rigour you would apply to someone else." },
  { key: "rr", label: "Present But Not Rested", tone: "gold", c: "var(--bpd-gold)",
    text: "You are looking for a path through the Amanah Gate rather than honestly assessing whether you should enter." },
];

export default function BbosApprovalBrief({ stage, briefSections, onClose }) {
  const identity = stage.brief?.identity || {};
  const [sec, setSec] = useState("covenant");
  const [fd, setFd] = useState(() => ({
    project: identity.project || "",
    operator: identity.operator || "",
    client: identity.client || "",
    date: new Date().toLocaleDateString("en-CA"),
    decision: null,
    rl: false,
    rr: false,
  }));
  const up = (k, v) => setFd((p) => ({ ...p, [k]: v }));

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  const nextStage = String(parseInt(stage.n, 10) + 1).padStart(2, "0");
  const gateOpts = [
    { key: "proceed", label: `Proceed to Stage ${nextStage}`, sub: "Routing conditions met",
      c: "var(--bpd-complete)", cd: "var(--bpd-complete-dim)" },
    { key: "conditions", label: "Proceed with Conditions", sub: "Gaps must be resolved before next stage begins",
      c: "var(--bpd-gold)", cd: "var(--bpd-gold-dim)" },
    { key: "halt", label: "Halt / Route to Rejection", sub: "Automatic disqualifier triggered",
      c: "var(--bpd-red)", cd: "var(--bpd-red-dim)" },
  ];

  const PROJECT_FIELDS = [
    { label: "Project Name", key: "project" },
    { label: "Operator", key: "operator" },
    { label: "Client", key: "client" },
    { label: "Date Prepared", key: "date" },
  ];

  const body = () => {
    if (sec === "project") return (
      <div className="bpd-col" style={{ gap: 16 }}>
        <div className="bpd-brief__docref">Document Ref: SAB-{stage.code}-{fd.date}-[REF]</div>
        {PROJECT_FIELDS.map((f) => (
          <div key={f.key}>
            <div className="bpd-brief__field-label">{f.label}</div>
            <input className="bpd-brief__input" value={fd[f.key]} onChange={(e) => up(f.key, e.target.value)} />
          </div>
        ))}
      </div>
    );
    if (sec === "covenant") return (
      <div className="bpd-col" style={{ gap: 18 }}>
        <div className="bpd-brief__covenant-card">
          <span className="bpd-orn bpd-orn--abs bpd-orn--brief"><Ornament size={100} opacity={1} /></span>
          <div className="bpd-brief__covenant-label-row">
            <span className="bpd-brief__covenant-sigil">{"⧁"}</span>
            <span className="bpd-brief__covenant-label">Opening Dua · {stage.name}</span>
          </div>
          <div className="bpd-brief__covenant-ar">{stage.dua.arabic}</div>
          <div className="bpd-brief__covenant-tr">{stage.dua.meaning}</div>
        </div>
        {stage.attributes.map((a, i) => (
          <div key={i} className="bpd-brief__attr">
            <div className="bpd-brief__attr-text">{a}</div>
          </div>
        ))}
        <div className="bpd-brief__readiness">
          <div className="bpd-brief__readiness-head">
            <span className="bpd-brief__readiness-head-label">Opening Readiness Check</span>
          </div>
          <div className="bpd-brief__readiness-grid">
            {READINESS.map((it, i) => (
              <div
                key={it.key}
                className={i === 0 ? "bpd-brief__readiness-cell bpd-brief__readiness-cell--bordered" : "bpd-brief__readiness-cell"}
                data-checked={fd[it.key] ? "true" : "false"}
                data-tone={it.tone}
                onClick={() => up(it.key, !fd[it.key])}
              >
                <div className="bpd-brief__readiness-label" style={{ "--c": it.c }}>
                  <span>{fd[it.key] ? (i === 0 ? "✓" : "◐") : "○"}</span>{it.label}
                </div>
                <div className="bpd-brief__readiness-text">{it.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
    if (sec === "gate") return (
      <div className="bpd-col" style={{ gap: 14 }}>
        {gateOpts.map((opt) => (
          <div
            key={opt.key}
            className="bpd-brief__gate-opt"
            data-selected={fd.decision === opt.key ? "true" : "false"}
            style={{ "--c": opt.c, "--c-dim": opt.cd }}
            onClick={() => up("decision", opt.key)}
          >
            <div className="bpd-brief__gate-radio">
              {fd.decision === opt.key && <div className="bpd-brief__gate-radio-dot" />}
            </div>
            <div>
              <div className="bpd-brief__gate-label">{opt.label}</div>
              <div className="bpd-brief__gate-sub">{opt.sub}</div>
            </div>
          </div>
        ))}
        <textarea className="bpd-brief__gate-textarea" placeholder="Record the specific basis for the routing decision..." />
        <button className="bpd-btn-gold bpd-btn-gold--approve">⧁  Approve & Advance Stage</button>
      </div>
    );
    return <div className="bpd-empty">Section: {sec}</div>;
  };

  const activeLabel = briefSections.find((s) => s.id === sec)?.label;

  const overlay = (
    <div className="bpd-modal-overlay bpd-modal-overlay--brief">
      <div className="bpd-modal-scrim bpd-modal-scrim--brief" onClick={onClose}>
        <div className="bpd-modal bpd-modal--brief" onClick={(e) => e.stopPropagation()}>
          <div className="bpd-modal__head">
            <div className="bpd-modal__head-left">
              <span style={{ color: "var(--bpd-gold)", lineHeight: 0 }}><Ornament size={32} opacity={0.6} /></span>
              <div>
                <div className="bpd-modal__eyebrow">BBOS · Stage Approval Brief · {stage.code}</div>
                <div className="bpd-modal__title">{stage.n} — {stage.name}</div>
              </div>
            </div>
            <div className="bpd-modal__head-right">
              <SPill status={stage.status} />
              <button className="bpd-modal__close" onClick={onClose}>×</button>
            </div>
          </div>
          <div className="bpd-brief__body">
            <div className="bpd-brief__nav">
              {briefSections.map((s) => (
                <button
                  key={s.id}
                  className="bpd-brief__navbtn"
                  data-active={sec === s.id ? "true" : "false"}
                  onClick={() => setSec(s.id)}
                >
                  <span className="bpd-brief__navbtn-icon">{s.icon}</span>
                  <span className="bpd-brief__navbtn-label">{s.label}</span>
                </button>
              ))}
            </div>
            <div className="bpd-brief__content">
              <div className="bpd-brief__section-label">{activeLabel}</div>
              {body()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(overlay, document.body);
}
