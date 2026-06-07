// BBOS Pipeline Dashboard - center pane: stage overview (attributes, dua, gate).
import { Ornament, SPill } from "./primitives";
import { gateStatusLabel, layerVars } from "./palette";

export default function BbosStageOverview({ stage, onOpenBrief, onOpenExec }) {
  const isComplete = stage.status === "complete";
  const execState = stage.status === "active" ? "active" : isComplete ? "complete" : "default";

  return (
    <div className="bpd-overview" style={layerVars(stage.layer)}>
      <div className="bpd-overview__head">
        <div>
          <div className="bpd-overview__eyebrow">Stage {stage.n} · {stage.code}</div>
          <h1 className="bpd-overview__title">{stage.name}</h1>
          <div className="bpd-overview__tagline">{stage.tagline}</div>
        </div>
        <div className="bpd-overview__head-right">
          <SPill status={stage.status} />
          <div className="bpd-overview__progress">
            <div className="bpd-overview__progress-track">
              <div className="bpd-overview__progress-fill" style={{ width: `${stage.progress}%` }} />
            </div>
            <span className="bpd-overview__progress-pct">{stage.progress}%</span>
          </div>
        </div>
      </div>

      <div className="bpd-attrcard">
        <span className="bpd-orn bpd-orn--abs bpd-orn--attr"><Ornament size={80} opacity={1} /></span>
        <div className="bpd-attrcard__label-row">
          <span className="bpd-attrcard__sigil">{"⧁"}</span>
          <span className="bpd-attrcard__label">Governing Attributes</span>
        </div>
        <div className="bpd-attrcard__attrs">
          {stage.attributes.map((a, i) => (
            <div key={i} className="bpd-attrcard__attr">{a}</div>
          ))}
        </div>
        <div className="bpd-attrcard__dua">
          <div className="bpd-attrcard__dua-ar">{stage.dua.arabic}</div>
          <div className="bpd-attrcard__dua-tr">{stage.dua.meaning}</div>
        </div>
      </div>

      <div className="bpd-gatestrip" data-gate={stage.gate.status}>
        <div>
          <div className="bpd-gatestrip__label">Stage Gate</div>
          <div className="bpd-gatestrip__name">{stage.gate.label}</div>
        </div>
        <div className="bpd-gatestrip__status" data-gate={stage.gate.status}>
          {gateStatusLabel(stage.gate.status)}
        </div>
      </div>

      {stage.status !== "locked" && (
        <div className="bpd-overview__actions">
          <button className="bpd-btn bpd-btn--brief" data-complete={isComplete ? "true" : "false"} onClick={() => onOpenBrief(stage)}>
            {isComplete ? "◫  View Approval Brief" : "◫  Open Approval Brief"}
          </button>
          <button className="bpd-btn bpd-btn--exec" data-state={execState} onClick={() => onOpenExec(stage)}>
            {isComplete ? "◉  Review Execution Record" : "◉  Open Execution View  →"}
          </button>
        </div>
      )}
    </div>
  );
}
