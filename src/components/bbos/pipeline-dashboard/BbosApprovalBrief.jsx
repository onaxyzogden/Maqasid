// BBOS Pipeline Dashboard - Stage Approval Brief modal (left nav + sections).
// Portal + body scroll-lock. Content is assembled live in the adapter
// (stage.brief.*); the gate section drives the pipeline via onAdvance/onReject.
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Ornament, SPill } from "./primitives";
import { itemVars, iLabel } from "./palette";
import { BBOS_REJECTION_REASONS } from "../../../data/bbos/bbos-pipeline";

export default function BbosApprovalBrief({ stage, briefSections, onAdvance, onReject, onClose }) {
  const identity = stage.brief?.identity || {};
  const gate = stage.brief?.gate || null;
  const readiness = stage.brief?.covenant?.readiness || null;
  const readinessRows = readiness?.rows || [];
  const [sec, setSec] = useState("covenant");
  const [reasonId, setReasonId] = useState(null);
  const [fd, setFd] = useState(() => ({
    project: identity.project || "",
    operator: identity.operator || "",
    client: identity.client || "",
    date: new Date().toLocaleDateString("en-CA"),
    decision: null,
  }));
  const up = (k, v) => setFd((p) => ({ ...p, [k]: v }));

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  // Live next-stage number off the gate VM; null on the final stage (OPT),
  // where "proceed" would mean a cycle restart (deferred to a later pass).
  const hasNext = !!gate?.nextStageN;
  const gateOpts = [
    { key: "proceed",
      label: hasNext ? `Proceed to Stage ${gate.nextStageN}` : "Close Cycle (deferred)",
      sub: hasNext ? "Routing conditions met" : "Cycle restart is not wired in this pass",
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
        {readinessRows.length > 0 && (
          <div className="bpd-brief__readiness">
            <div className="bpd-brief__readiness-head">
              <span className="bpd-brief__readiness-head-label">Opening Readiness Check</span>
              {readiness?.frame && (
                <div className="bpd-brief__readiness-text" style={{ marginTop: 6 }}>{readiness.frame}</div>
              )}
            </div>
            <div className="bpd-brief__readiness-grid">
              {readinessRows.map((r, i) => {
                const key = `rd_${r.id || i}`;
                return (
                  <div
                    key={key}
                    className={i % 2 === 0 ? "bpd-brief__readiness-cell bpd-brief__readiness-cell--bordered" : "bpd-brief__readiness-cell"}
                    data-checked={fd[key] ? "true" : "false"}
                    data-tone="complete"
                    onClick={() => up(key, !fd[key])}
                  >
                    <div className="bpd-brief__readiness-label" style={{ "--c": "var(--bpd-complete)" }}>
                      <span>{fd[key] ? "✓" : "○"}</span>{r.attr}{r.attrTitle ? ` · ${r.attrTitle}` : ""}
                    </div>
                    <div className="bpd-brief__readiness-text">{r.governing}</div>
                    {r.notYet && (
                      <div className="bpd-brief__readiness-text" style={{ marginTop: 6, color: "var(--bpd-text-tertiary)", fontStyle: "normal" }}>
                        Not yet: {r.notYet}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
    if (sec === "gate") {
      const canAct = !!gate?.canAct;
      const decision = fd.decision;
      // The gate only writes to the pipeline for the active stage. proceed ->
      // advance, halt -> reject (with a reason), conditions is inert/annotated.
      const actionReady =
        canAct &&
        ((decision === "proceed" && hasNext) ||
          (decision === "halt" && reasonId));
      const actionLabel =
        decision === "halt"
          ? "⧁  Halt & Route to Rejection"
          : decision === "conditions"
            ? "⧁  Logged — No Stage Change"
            : "⧁  Approve & Advance Stage";
      const fireAction = () => {
        if (!actionReady) return;
        if (decision === "proceed") onAdvance?.();
        else if (decision === "halt") onReject?.(reasonId);
      };
      return (
        <div className="bpd-col" style={{ gap: 14 }}>
          {gate && (
            <div className="bpd-brief__gate-verdict" data-active={canAct ? "true" : "false"}>
              <span className="bpd-brief__gate-verdict-label">{gate.label}</span>
              <span className="bpd-brief__gate-verdict-value">{gate.verdict || "—"}</span>
            </div>
          )}
          {!canAct && (
            <div className="bpd-empty">
              This stage is not active &mdash; the routing decision is read-only.
            </div>
          )}
          {gateOpts.map((opt) => (
            <div
              key={opt.key}
              className="bpd-brief__gate-opt"
              data-selected={decision === opt.key ? "true" : "false"}
              style={{ "--c": opt.c, "--c-dim": opt.cd }}
              onClick={() => { if (canAct) up("decision", opt.key); }}
            >
              <div className="bpd-brief__gate-radio">
                {decision === opt.key && <div className="bpd-brief__gate-radio-dot" />}
              </div>
              <div>
                <div className="bpd-brief__gate-label">{opt.label}</div>
                <div className="bpd-brief__gate-sub">{opt.sub}</div>
              </div>
            </div>
          ))}
          {decision === "halt" && (
            <div className="bpd-col" style={{ gap: 8 }}>
              <div className="bpd-brief__field-label">Rejection Reason (required)</div>
              {BBOS_REJECTION_REASONS.map((r) => (
                <div
                  key={r.id}
                  className="bpd-brief__gate-opt"
                  data-selected={reasonId === r.id ? "true" : "false"}
                  style={{ "--c": "var(--bpd-red)", "--c-dim": "var(--bpd-red-dim)" }}
                  onClick={() => setReasonId(r.id)}
                >
                  <div className="bpd-brief__gate-radio">
                    {reasonId === r.id && <div className="bpd-brief__gate-radio-dot" />}
                  </div>
                  <div>
                    <div className="bpd-brief__gate-label">{r.label}</div>
                    <div className="bpd-brief__gate-sub">{r.description}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {decision === "conditions" && (
            <div className="bpd-empty">
              Proceed-with-conditions is recorded for the operator&rsquo;s notes only and
              does not change the pipeline stage.
            </div>
          )}
          <textarea className="bpd-brief__gate-textarea" placeholder="Record the specific basis for the routing decision..." />
          <button
            className="bpd-btn-gold bpd-btn-gold--approve"
            disabled={!actionReady}
            onClick={fireAction}
          >
            {actionLabel}
          </button>
        </div>
      );
    }
    if (sec === "findings") {
      const findings = stage.brief?.findings || [];
      const passed = findings.filter((f) => f.passed).length;
      return (
        <div className="bpd-col" style={{ gap: 8 }}>
          {findings.length === 0 ? (
            <div className="bpd-empty">No gate signals defined for this stage.</div>
          ) : (
            <div className="bpd-checklist" style={{ marginTop: 0 }}>
              <div className="bpd-checklist__label">Gate Signals · {passed}/{findings.length} satisfied</div>
              {findings.map((f) => (
                <div key={f.id} className="bpd-checklist__item">
                  <div
                    className="bpd-checklist__box"
                    style={{
                      background: f.passed ? "var(--bpd-complete)" : "transparent",
                      borderColor: f.passed ? "var(--bpd-complete)" : "var(--bpd-border-mid)",
                    }}
                  />
                  <span className="bpd-checklist__text">{f.label}</span>
                  <span className="bpd-checklist__text" style={{ marginLeft: "auto", color: f.passed ? "var(--bpd-complete)" : "var(--bpd-text-tertiary)" }}>
                    {f.pts} pts
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
    if (sec === "constraints") {
      const c = stage.brief?.constraints;
      if (c?.kind === "holdlist") {
        if (!c.holdItems && !c.g72Check) {
          return <div className="bpd-empty">No hold list filed yet. File the OPT Hold List &amp; Guardrails (OPT-S5) to record what must not change this cycle.</div>;
        }
        return (
          <div className="bpd-col" style={{ gap: 12 }}>
            {c.holdItems && (
              <div className="bpd-brief__attr">
                <div className="bpd-brief__field-label">Hold List — Frozen Elements</div>
                <div className="bpd-brief__attr-text" style={{ whiteSpace: "pre-wrap", fontStyle: "normal", marginTop: 6 }}>{c.holdItems}</div>
              </div>
            )}
            {c.g72Check && (
              <div className="bpd-brief__attr">
                <div className="bpd-brief__field-label">G7.2 — Stewardship Score Gate</div>
                <div className="bpd-brief__attr-text" style={{ fontStyle: "normal", marginTop: 6 }}>{c.g72Check}</div>
              </div>
            )}
          </div>
        );
      }
      const unmet = c?.unmet || [];
      return (
        <div className="bpd-col" style={{ gap: 8 }}>
          {unmet.length === 0 ? (
            <div className="bpd-empty">No outstanding constraints — every gate signal for this stage is satisfied.</div>
          ) : (
            <div className="bpd-checklist" style={{ marginTop: 0 }}>
              <div className="bpd-checklist__label">Outstanding before this gate passes</div>
              {unmet.map((f) => (
                <div key={f.id} className="bpd-checklist__item">
                  <div className="bpd-checklist__box" />
                  <span className="bpd-checklist__text">{f.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
    if (sec === "assets") {
      const { researchItems = [], assetItems = [] } = stage.brief?.assets || {};
      const total = researchItems.length + assetItems.length;
      if (total === 0) return <div className="bpd-empty">No assets defined for this stage.</div>;
      const groups = [
        { label: "Research Factory — S-Outputs", items: researchItems },
        { label: "Asset Factory — Deliverables", items: assetItems },
      ].filter((g) => g.items.length);
      return (
        <div className="bpd-col" style={{ gap: 14 }}>
          {groups.map((g) => (
            <div key={g.label} className="bpd-col" style={{ gap: 8 }}>
              <div className="bpd-brief__field-label">{g.label}</div>
              {g.items.map((a) => (
                <div key={a.id} className="bpd-brief__attr">
                  <div className="bpd-row__title-line">
                    <span className="bpd-row__label">{a.label}</span>
                    {a.glabel && <span className="bpd-row__glabel">{a.glabel}</span>}
                    <span className="bpd-row__status" style={{ ...itemVars(a.status), marginLeft: "auto" }}>{iLabel(a.status)}</span>
                  </div>
                  {a.content && (
                    <div className="bpd-brief__attr-text" style={{ whiteSpace: "pre-wrap", fontStyle: "normal", marginTop: 6 }}>{a.content}</div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      );
    }
    if (sec === "closing") {
      const verdict = stage.brief?.gate?.verdict;
      const proj = stage.brief?.closing?.project;
      return (
        <div className="bpd-col" style={{ gap: 12 }}>
          <div className="bpd-brief__attr">
            <div className="bpd-brief__field-label">Stage Verdict</div>
            <div className="bpd-brief__attr-text" style={{ fontStyle: "normal", marginTop: 6 }}>{verdict || "Not yet scored"}</div>
          </div>
          <div className="bpd-brief__covenant-tr" style={{ lineHeight: 1.8 }}>
            {proj ? `${proj} — ` : ""}This stage is closed before Allah on the basis of the findings above, not on the basis of momentum. What was filed is what is real; what is unmet remains unmet.
          </div>
          <textarea className="bpd-brief__gate-textarea" placeholder="Record any closing reflection on honest stewardship for this stage..." />
        </div>
      );
    }
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
