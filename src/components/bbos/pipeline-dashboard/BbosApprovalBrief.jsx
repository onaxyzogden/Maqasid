// BBOS Pipeline Dashboard - Stage Approval Brief modal (left nav + sections).
// Portal; scroll-lock, Esc, focus and the unsaved-typing guard come from
// useBpdDialog. Content is assembled live in the adapter (stage.brief.*); the
// gate section drives the pipeline via onAdvance/onReject, but only after a
// written basis and an explicit confirm step — both moves are irreversible.
// Proceed-with-conditions goes through onLogConditions: recorded, no stage
// change. Every decision carries { basis, closingNote, conditions } into the
// project's bbosGateLog, shown back here as the stage's Gate record.
// Open conditions (this cycle, unresolved) are listed above the decision and
// block Advance until each is marked resolved with its own written basis;
// onResolveCondition adds a 'resolved' entry and moves nothing.
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Ornament, SPill } from "./primitives";
import { itemVars, iLabel } from "./palette";
import { useBpdDialog } from "./useBpdDialog";
import { BBOS_REJECTION_REASONS } from "../../../data/bbos/bbos-pipeline";
import { getBbosRole } from "../../../data/bbos/bbos-role-access";
import { icAssetLine } from "../../../data/bbos/bbos-ic-assets";

// Keyboard activation for the div-based radio/checkbox controls.
const onActivate = (fn) => (e) => {
  if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fn(); }
};

const DECISION_LABEL = {
  proceed: "Proceeded",
  conditions: "Proceed with Conditions",
  halt: "Halted",
  resolved: "Condition resolved",
  cycle: "Cycle closed",
  reversed: "Reversed",
};

const formatAt = (iso) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? ""
    : d.toLocaleString(undefined, { year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
};

const NAMED_STATUS = { clear: "Clear", conditions: "Conditions", incomplete: "Incomplete", blocked: "Blocked" };
const roleName = (id) => getBbosRole(id).label.toLowerCase();

export default function BbosApprovalBrief({ stage, briefSections, onAdvance, onReject, onLogConditions, onResolveCondition, onClose, initialDecision = null, initialReasonId = null, canHalt = true }) {
  const identity = stage.brief?.identity || {};
  const gate = stage.brief?.gate || null;
  const readiness = stage.brief?.covenant?.readiness || null;
  const readinessRows = readiness?.rows || [];
  // Opened from the late-disqualifier banner: straight to the gate, Halt chosen.
  const [sec, setSec] = useState(initialDecision ? "gate" : "covenant");
  const [reasonId, setReasonId] = useState(initialReasonId);
  const [fd, setFd] = useState(() => ({
    project: identity.project || "",
    operator: identity.operator || "",
    client: identity.client || "",
    date: new Date().toLocaleDateString("en-CA"),
    decision: initialDecision === "halt" && !canHalt ? null : initialDecision,
  }));
  const up = (k, v) => setFd((p) => ({ ...p, [k]: v }));
  // Held at the root so switching sections doesn't drop what was written; saved
  // to bbosGateLog with the decision the operator makes at the gate.
  const [basis, setBasis] = useState("");
  const [closingNote, setClosingNote] = useState("");
  const [conditions, setConditions] = useState("");
  // { at, kind: 'conditions'|'resolved' } — the last record made without a stage change.
  const [recorded, setRecorded] = useState(null);
  const [resolvingId, setResolvingId] = useState(null);
  const [resolveBasis, setResolveBasis] = useState("");
  const [confirming, setConfirming] = useState(false);
  // Named gates: the acknowledgements ticked for this proceed, and the gate
  // whose conditions were pre-filled (its id and resolver go on the entry).
  const [acked, setAcked] = useState([]);
  const [condGate, setCondGate] = useState(null);
  const conditionsRef = useRef(null);
  // Opened on Halt: the basis is the one step left, so bring it into view.
  useEffect(() => {
    if (initialDecision !== "halt") return;
    const id = requestAnimationFrame(() => {
      const el = document.getElementById("bpd-brief-basis");
      el?.scrollIntoView({ block: "center" });
      el?.focus();
    });
    return () => cancelAnimationFrame(id);
  }, [initialDecision]);
  const [dirty, setDirty] = useState(false);
  const { ref: dialogRef, requestClose, onKeyDown } = useBpdDialog({ onClose, dirty });

  // Live next-stage number off the gate VM; null on the final stage (OPT),
  // where "proceed" closes the cycle (a 'cycle' entry) and returns to Identity.
  const hasNext = !!gate?.nextStageN;
  // A BLOCKED gate verdict locks "proceed" — the stage cannot advance past a
  // failed gate. Conditions (no stage change) and Halt stay available.
  const gateBlocked = gate?.verdict === "BLOCKED";
  // A blocked or incomplete named gate locks "proceed" too, with no override.
  const namedHolding = !!gate?.named?.holding;
  const namedStatus = gate?.named?.status;
  const namedWaiting = !namedHolding && !!gate?.named && (
    gate.named.unrecorded.length > 0 || gate.named.acknowledgements.some((a) => !acked.includes(a.id)));
  const gateOpts = [
    { key: "proceed",
      label: hasNext ? `Proceed to Stage ${gate.nextStageN}` : "Close Cycle",
      sub: namedHolding
        ? "Locked — held by a named gate below. There is no override."
        : gateBlocked
          ? "Locked — gate verdict is BLOCKED. Resolve the unmet signals in Findings first."
          : namedWaiting
            ? "Waiting on named gates: record their conditions or tick the acknowledgements below"
            : hasNext ? "Routing conditions met" : "Cycle closes; the pipeline returns to Identity",
      locked: gateBlocked || namedHolding,
      c: "var(--bpd-complete)", cd: "var(--bpd-complete-dim)" },
    { key: "conditions", label: "Proceed with Conditions", sub: "Gaps must be resolved before next stage begins",
      c: "var(--bpd-gold)", cd: "var(--bpd-gold-dim)" },
    // Only the Owner of the Amanah Proof Audit, CRD-V1 (OW, ST), or the "all" view may halt;
    // the store refuses anyone else (canHaltBbosPipeline).
    { key: "halt", label: "Halt / Route to Rejection",
      sub: canHalt ? "Automatic disqualifier triggered" : "Only the Owner or Strategist role can halt the pipeline.",
      locked: !canHalt,
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
            <label className="bpd-brief__field-label" htmlFor={`bpd-brief-${f.key}`} style={{ display: "block" }}>{f.label}</label>
            <input id={`bpd-brief-${f.key}`} className="bpd-brief__input" value={fd[f.key]} onChange={(e) => up(f.key, e.target.value)} />
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
                    role="checkbox"
                    aria-checked={!!fd[key]}
                    tabIndex={0}
                    onClick={() => up(key, !fd[key])}
                    onKeyDown={onActivate(() => up(key, !fd[key]))}
                  >
                    <div className="bpd-brief__readiness-label" style={{ "--c": "var(--bpd-complete)" }}>
                      <span aria-hidden="true">{fd[key] ? "✓" : "○"}</span>{r.attr}{r.attrTitle ? ` · ${r.attrTitle}` : ""}
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
      // advance, halt -> reject (with a reason), conditions -> recorded with
      // no stage change. A written basis is required for every decision.
      const hasBasis = basis.trim().length > 0;
      // Block rule: Advance waits until every open condition is resolved.
      const openConds = gate?.openConditions || [];
      const advanceBlocked = decision === "proceed" && openConds.length > 0;
      // Named gates hold Proceed the way the store does: a blocked or
      // incomplete gate (no override), conditions not yet recorded for their
      // gate, or an acknowledgement not ticked.
      const named = gate?.named || { gates: [], holding: false, unrecorded: [], acknowledgements: [], actingRole: null };
      const acksMissing = named.acknowledgements.filter((a) => !acked.includes(a.id));
      const namedHold = named.holding || named.unrecorded.length > 0 || acksMissing.length > 0;
      const decisionReady =
        canAct &&
        ((decision === "proceed" && !advanceBlocked && !gateBlocked && !namedHold) ||
          (decision === "halt" && reasonId) ||
          (decision === "conditions" && conditions.trim().length > 0));
      const actionReady = decisionReady && hasBasis;
      const log = gate?.log || [];
      const actionLabel =
        decision === "halt"
          ? "⧁  Halt & Route to Rejection"
          : decision === "conditions"
            ? "⧁  Record Conditions — No Stage Change"
            : hasNext
              ? "⧁  Approve & Advance Stage"
              : "⧁  Approve & Close Cycle";
      const reasonLabel = BBOS_REJECTION_REASONS.find((r) => r.id === reasonId)?.label;
      // Undo is offered for 15 seconds afterwards; it adds a 'reversed'
      // entry, so the decision itself always stays in the gate record.
      const undoNote = "You can Undo it for 15 seconds afterwards; the decision stays in the gate record.";
      const confirmText =
        decision === "halt"
          ? `Halt at Stage ${stage.n} — ${stage.name} and route to Rejection for "${reasonLabel}"? This stops the pipeline. ${undoNote}`
          : hasNext
            ? `Advance from Stage ${stage.n} — ${stage.name} to Stage ${gate?.nextStageN}? This moves the pipeline forward. ${undoNote}`
            : `Close this cycle at Stage ${stage.n} — ${stage.name} and return the pipeline to Identity for the next cycle? ${undoNote}`;
      const choose = (key) => { if (canAct && !gateOpts.find((o) => o.key === key)?.locked) { up("decision", key); setConfirming(false); setRecorded(null); } };
      const record = { basis, closingNote, conditions, acknowledged: acked };
      const fireAction = () => {
        if (!actionReady) return;
        if (decision === "proceed") onAdvance?.(record);
        else if (decision === "halt") onReject?.(reasonId, record);
      };
      // Conditions don't move the pipeline, so no confirm step: record it, clear
      // the written fields, and keep the Brief open showing the new entry.
      const recordConditions = () => {
        if (!actionReady) return;
        onLogConditions?.({
          basis, closingNote, conditions, decision: "conditions",
          gateId: condGate?.id || null, resolverRole: condGate?.resolverRole || null,
        });
        setBasis("");
        setConditions("");
        setCondGate(null);
        setClosingNote("");
        up("decision", null);
        setDirty(false);
        setRecorded({ at: new Date().toISOString(), kind: "conditions" });
      };
      // Resolving is its own add-only entry with its own basis. It moves no
      // stage, so it is allowed on any stage; the written basis and the
      // explicit Record button are the confirm.
      const applyGateConditions = (g) => {
        up("decision", "conditions");
        setConditions(g.condition?.text || g.reasons.join(" "));
        setCondGate({ id: g.id, name: g.name, resolverRole: g.condition?.resolverRole || null });
        setConfirming(false);
        setRecorded(null);
        setDirty(true);
        requestAnimationFrame(() => {
          conditionsRef.current?.scrollIntoView({ block: "center" });
          conditionsRef.current?.focus();
        });
      };
      const toggleAck = (id) => { setAcked((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id])); setConfirming(false); };
      const startResolve = (id) => { setResolvingId(id); setResolveBasis(""); setRecorded(null); };
      const cancelResolve = () => { setResolvingId(null); setResolveBasis(""); };
      const recordResolution = () => {
        if (!resolvingId || !resolveBasis.trim()) return;
        onResolveCondition?.(resolvingId, resolveBasis);
        cancelResolve();
        setDirty(!!(basis.trim() || conditions.trim() || closingNote.trim()));
        setRecorded({ at: new Date().toISOString(), kind: "resolved" });
      };
      const logById = Object.fromEntries(log.map((e) => [e.id, e]));
      const reversedIds = new Set(log.filter((e) => e.decision === "reversed").map((e) => e.reversesId));
      return (
        <div className="bpd-col" style={{ gap: 14 }}>
          {gate && (
            <div className="bpd-brief__gate-verdict" data-active={canAct ? "true" : "false"}>
              <span className="bpd-brief__gate-verdict-label">{gate.label}</span>
              <span className="bpd-brief__gate-verdict-value">
                {namedStatus && namedStatus !== "clear" && namedStatus !== "none"
                  ? namedStatus.toUpperCase()
                  : gate.verdict || "—"}
              </span>
            </div>
          )}
          {!canAct && (
            <div className="bpd-empty">
              This stage is not active &mdash; the routing decision is read-only.
            </div>
          )}
          {named.gates.length > 0 && (
            <section className="bpd-col" style={{ gap: 8 }} aria-labelledby="bpd-brief-named-label">
              <div className="bpd-brief__field-label" id="bpd-brief-named-label">Named gates · Factory docs</div>
              {named.gates.map((g) => (
                <div key={g.id} className="bpd-brief__named" data-status={g.status}>
                  <div className="bpd-brief__named-head">
                    <span className="bpd-brief__named-name">{g.name}</span>
                    <span className="bpd-brief__named-status">{NAMED_STATUS[g.status]}</span>
                  </div>
                  <div className="bpd-brief__log-meta">{g.cite}</div>
                  {g.assets?.length > 0 && (
                    <ul className="bpd-brief__named-assets" aria-label={`Assets checked for ${g.name}`}>
                      {g.assets.map((a) => {
                        const l = icAssetLine(a);
                        return (
                          <li key={`${a.list}-${a.index}`} className="bpd-brief__named-asset" data-tone={l.tone}>
                            <span className="bpd-brief__named-asset-list">{l.list}</span>
                            <span className="bpd-brief__named-asset-name">{l.name}</span>
                            <span className="bpd-brief__named-asset-pill">{l.label}</span>
                            {l.detail && <span className="bpd-brief__named-asset-detail">{l.detail}</span>}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                  {g.reasons.length > 0 && (
                    <ul className="bpd-brief__named-reasons">
                      {g.reasons.map((r) => <li key={r}>{r}</li>)}
                    </ul>
                  )}
                  {canAct && named.unrecorded.some((u) => u.id === g.id) && (
                    <button type="button" className="bpd-brief__confirm-btn bpd-brief__open-btn" onClick={() => applyGateConditions(g)}>
                      Record these conditions
                    </button>
                  )}
                  {canAct && g.status === "clear" && (g.acknowledgements || []).map((a) => (
                    <label key={a.id} className="bpd-brief__named-ack">
                      <input type="checkbox" checked={acked.includes(a.id)} onChange={() => toggleAck(a.id)} />
                      <span>{a.label}</span>
                    </label>
                  ))}
                </div>
              ))}
            </section>
          )}
          {openConds.length > 0 && (
            <section className="bpd-brief__open" aria-labelledby="bpd-brief-open-label">
              <div className="bpd-brief__field-label" id="bpd-brief-open-label">
                Open conditions · {openConds.length} to resolve before the next stage
              </div>
              <ol className="bpd-brief__log-list">
                {openConds.map((c) => (
                  <li key={c.id} className="bpd-brief__open-item">
                    <div className="bpd-brief__log-line"><span className="bpd-brief__log-key">Condition</span>{c.conditions}</div>
                    <div className="bpd-brief__log-meta" style={{ marginTop: 4 }}>
                      Recorded {formatAt(c.at)}{c.by ? ` · ${c.by}` : ""}
                    </div>
                    {c.resolverRole && c.resolverRole !== named.actingRole ? (
                      <div className="bpd-brief__basis-hint" role="note">
                        Awaiting the {roleName(c.resolverRole)}&rsquo;s decision. Only the {roleName(c.resolverRole)} can resolve this condition.
                      </div>
                    ) : resolvingId === c.id ? (
                      <div className="bpd-col" style={{ gap: 8, marginTop: 10 }}>
                        <label className="bpd-brief__field-label" htmlFor={`bpd-brief-resolve-${c.id}`} style={{ display: "block" }}>
                          Basis for resolving this condition (required)
                        </label>
                        <textarea
                          id={`bpd-brief-resolve-${c.id}`}
                          className="bpd-brief__gate-textarea"
                          placeholder="What closed this gap, and where it is evidenced..."
                          value={resolveBasis}
                          onChange={(e) => setResolveBasis(e.target.value)}
                          autoFocus
                        />
                        {!resolveBasis.trim() && (
                          <div className="bpd-brief__basis-hint" style={{ marginTop: 0 }}>
                            Write the basis to enable Record Resolution. It is added to the gate record and cannot be edited.
                          </div>
                        )}
                        <div className="bpd-brief__confirm-row" style={{ marginTop: 0 }}>
                          <button type="button" className="bpd-brief__confirm-btn" onClick={cancelResolve}>Cancel</button>
                          <button
                            type="button"
                            className="bpd-brief__confirm-btn bpd-brief__confirm-btn--go"
                            style={{ "--c": "var(--bpd-complete)" }}
                            disabled={!resolveBasis.trim()}
                            onClick={recordResolution}
                          >
                            Record Resolution
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button type="button" className="bpd-brief__confirm-btn bpd-brief__open-btn" onClick={() => startResolve(c.id)}>
                        Mark resolved
                      </button>
                    )}
                  </li>
                ))}
              </ol>
            </section>
          )}
          {canAct && gateBlocked && (
            <div className="bpd-brief__blocked" role="status">
              {gate.label || "This gate"} is BLOCKED &mdash; advancing is locked until the
              unmet signals in Findings are resolved. You can still record conditions{canHalt ? ", or halt and route to rejection" : ""}.
            </div>
          )}
          <div className="bpd-col" style={{ gap: 14 }} role="radiogroup" aria-label="Routing decision">
            {gateOpts.map((opt) => (
              <div
                key={opt.key}
                className="bpd-brief__gate-opt"
                data-selected={decision === opt.key ? "true" : "false"}
                data-locked={opt.locked ? "true" : undefined}
                style={{ "--c": opt.c, "--c-dim": opt.cd }}
                role="radio"
                aria-checked={decision === opt.key}
                aria-disabled={canAct && !opt.locked ? undefined : "true"}
                tabIndex={canAct && !opt.locked ? 0 : -1}
                onClick={() => choose(opt.key)}
                onKeyDown={onActivate(() => choose(opt.key))}
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
          </div>
          {decision === "halt" && (
            <div className="bpd-col" style={{ gap: 8 }} role="radiogroup" aria-labelledby="bpd-brief-reason-label">
              <div className="bpd-brief__field-label" id="bpd-brief-reason-label">Rejection Reason (required)</div>
              {BBOS_REJECTION_REASONS.map((r) => (
                <div
                  key={r.id}
                  className="bpd-brief__gate-opt"
                  data-selected={reasonId === r.id ? "true" : "false"}
                  style={{ "--c": "var(--bpd-red)", "--c-dim": "var(--bpd-red-dim)" }}
                  role="radio"
                  aria-checked={reasonId === r.id}
                  tabIndex={0}
                  onClick={() => { setReasonId(r.id); setConfirming(false); }}
                  onKeyDown={onActivate(() => { setReasonId(r.id); setConfirming(false); })}
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
            <>
              <label className="bpd-brief__field-label" htmlFor="bpd-brief-conditions" style={{ display: "block" }}>
                Conditions to resolve before the next stage begins (required)
              </label>
              <textarea
                id="bpd-brief-conditions"
                ref={conditionsRef}
                className="bpd-brief__gate-textarea"
                placeholder="List each gap and what closes it..."
                value={conditions}
                onChange={(e) => setConditions(e.target.value)}
              />
              <div className="bpd-brief__basis-hint">
                This is recorded in the stage&rsquo;s gate record. It does not change the pipeline stage.
                {condGate && ` Recorded against the ${condGate.name}.`}
                {condGate?.resolverRole && ` Only the ${roleName(condGate.resolverRole)} can mark it resolved.`}
              </div>
            </>
          )}
          <label className="bpd-brief__field-label" htmlFor="bpd-brief-basis" style={{ display: "block" }}>
            Basis for the routing decision (required)
          </label>
          <textarea
            id="bpd-brief-basis"
            className="bpd-brief__gate-textarea"
            placeholder="Record the specific basis for the routing decision..."
            value={basis}
            onChange={(e) => { setBasis(e.target.value); setConfirming(false); }}
            disabled={!canAct}
          />
          {decision === "proceed" && canAct && namedHold && (
            <div className="bpd-brief__blocked" role="note">
              {named.holding
                ? `${hasNext ? "Advance" : "Closing the cycle"} is held by the ${named.gates.filter((g) => g.status === "blocked" || g.status === "incomplete").map((g) => g.name).join(" and ")}. See Named gates above; there is no override.${canHalt ? " Halt is still available above." : ""}`
                : named.unrecorded.length > 0
                  ? `Record the conditions for the ${named.unrecorded.map((g) => g.name).join(" and ")}, then resolve them, to enable ${hasNext ? "Advance" : "Close Cycle"}.`
                  : `Tick each acknowledgement under Named gates to enable ${hasNext ? "Advance" : "Close Cycle"}.`}
            </div>
          )}
          {advanceBlocked && canAct && (
            <div className="bpd-brief__blocked" role="note">
              {openConds.every((c) => c.resolverRole && c.resolverRole !== named.actingRole)
                ? `${hasNext ? "Advance" : "Closing the cycle"} is held until the ${roleName(openConds[0].resolverRole)} resolves ${openConds.length} condition${openConds.length === 1 ? "" : "s"}.`
                : `${hasNext ? "Advance" : "Closing the cycle"} is blocked: ${openConds.length} open condition${openConds.length === 1 ? "" : "s"} must be marked resolved first.`}
            </div>
          )}
          {decisionReady && !hasBasis && (
            <div className="bpd-brief__basis-hint">Write the basis for this decision to enable the button.</div>
          )}
          {confirming && actionReady ? (
            <div
              className="bpd-brief__confirm"
              role="alertdialog"
              aria-labelledby="bpd-brief-confirm-text"
              style={decision === "halt"
                ? { "--c": "var(--bpd-red)", "--c-dim": "var(--bpd-red-dim)" }
                : { "--c": "var(--bpd-complete)", "--c-dim": "var(--bpd-complete-dim)" }}
            >
              <div className="bpd-brief__confirm-text" id="bpd-brief-confirm-text">{confirmText}</div>
              <div className="bpd-brief__confirm-row">
                <button type="button" className="bpd-brief__confirm-btn" onClick={() => setConfirming(false)}>Cancel</button>
                <button type="button" className="bpd-brief__confirm-btn bpd-brief__confirm-btn--go" onClick={fireAction} autoFocus>
                  {decision === "halt" ? "Confirm Halt" : hasNext ? "Confirm Advance" : "Confirm Cycle Close"}
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              className="bpd-btn-gold bpd-btn-gold--approve"
              disabled={!actionReady}
              onClick={decision === "conditions" ? recordConditions : () => setConfirming(true)}
            >
              {actionLabel}
            </button>
          )}
          {recorded && (
            <div className="bpd-brief__recorded" role="status">
              {recorded.kind === "resolved" ? "Condition resolved" : "Conditions recorded"} {formatAt(recorded.at)}. The stage has not changed.
            </div>
          )}
          <div className="bpd-brief__log">
            <div className="bpd-brief__field-label">Gate record</div>
            {log.length === 0 ? (
              <div className="bpd-brief__log-empty">No decisions recorded for this stage yet.</div>
            ) : (
              <ol className="bpd-brief__log-list">
                {log.map((e) => (
                  <li
                    key={e.id}
                    className={`bpd-brief__log-entry${reversedIds.has(e.id) ? " bpd-brief__log-entry--reversed" : ""}`}
                    data-decision={e.decision}
                  >
                    <div className="bpd-brief__log-head">
                      <span className="bpd-brief__log-decision">
                        {DECISION_LABEL[e.decision] || e.decision}
                        {reversedIds.has(e.id) && <span className="bpd-brief__log-tag">(reversed)</span>}
                      </span>
                      <span className="bpd-brief__log-meta">
                        Cycle {e.cycle} · {formatAt(e.at)}{e.by ? ` · ${e.by}` : ""}
                      </span>
                    </div>
                    {e.decision === "halt" && e.reasonId && (
                      <div className="bpd-brief__log-line">
                        <span className="bpd-brief__log-key">Reason</span>
                        {BBOS_REJECTION_REASONS.find((r) => r.id === e.reasonId)?.label || e.reasonId}
                      </div>
                    )}
                    {e.decision === "resolved" && (
                      <div className="bpd-brief__log-line">
                        <span className="bpd-brief__log-key">Resolves</span>
                        {logById[e.resolvesId]?.conditions || e.resolvesId}
                      </div>
                    )}
                    {e.decision === "reversed" && (
                      <div className="bpd-brief__log-line">
                        <span className="bpd-brief__log-key">Undoes</span>
                        {DECISION_LABEL[logById[e.reversesId]?.decision] || e.reversesId}
                        {logById[e.reversesId] ? ` · ${formatAt(logById[e.reversesId].at)}` : ""}
                      </div>
                    )}
                    <div className="bpd-brief__log-line"><span className="bpd-brief__log-key">Basis</span>{e.basis}</div>
                    {e.conditions && (
                      <div className="bpd-brief__log-line"><span className="bpd-brief__log-key">Conditions</span>{e.conditions}</div>
                    )}
                    {e.closingNote && (
                      <div className="bpd-brief__log-line"><span className="bpd-brief__log-key">Closing</span>{e.closingNote}</div>
                    )}
                  </li>
                ))}
              </ol>
            )}
          </div>
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
          <textarea
            className="bpd-brief__gate-textarea"
            aria-label="Closing reflection"
            placeholder="Record any closing reflection on honest stewardship for this stage..."
            value={closingNote}
            onChange={(e) => setClosingNote(e.target.value)}
          />
          <div className="bpd-brief__basis-hint">Saved with the stage decision you make in Stage Decision.</div>
        </div>
      );
    }
    return <div className="bpd-empty">Section: {sec}</div>;
  };

  const activeLabel = briefSections.find((s) => s.id === sec)?.label;

  const overlay = (
    <div className="bpd-modal-overlay bpd-modal-overlay--brief">
      <div className="bpd-modal-scrim bpd-modal-scrim--brief" onClick={requestClose}>
        <div
          ref={dialogRef}
          className="bpd-modal bpd-modal--brief"
          role="dialog"
          aria-modal="true"
          aria-labelledby="bpd-brief-title"
          tabIndex={-1}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={onKeyDown}
        >
          <div className="bpd-modal__head">
            <div className="bpd-modal__head-left">
              <span style={{ color: "var(--bpd-gold)", lineHeight: 0 }} aria-hidden="true"><Ornament size={32} opacity={0.6} /></span>
              <div>
                <div className="bpd-modal__eyebrow">BBOS · Stage Approval Brief · {stage.code}</div>
                <div className="bpd-modal__title" id="bpd-brief-title">{stage.n} — {stage.name}</div>
              </div>
            </div>
            <div className="bpd-modal__head-right">
              <SPill status={stage.status} />
              <button type="button" className="bpd-modal__close" aria-label="Close Approval Brief" onClick={requestClose}>×</button>
            </div>
          </div>
          <div className="bpd-brief__body">
            <nav className="bpd-brief__nav" aria-label="Brief sections">
              {briefSections.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className="bpd-brief__navbtn"
                  data-active={sec === s.id ? "true" : "false"}
                  aria-current={sec === s.id ? "true" : undefined}
                  onClick={() => setSec(s.id)}
                >
                  <span className="bpd-brief__navbtn-icon" aria-hidden="true">{s.icon}</span>
                  <span className="bpd-brief__navbtn-label">{s.label}</span>
                </button>
              ))}
            </nav>
            {/* Typing anywhere in a section arms the discard prompt on close. */}
            <div className="bpd-brief__content" onInput={() => setDirty(true)}>
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
