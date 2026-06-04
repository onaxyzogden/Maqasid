// BBOS Pipeline Dashboard - left rail (header + cycle progress + stage nodes).
import { Arc, Ornament } from "./primitives";
import { gateNodeIcon, statusVars } from "./palette";

function StageNode({ stage, isSelected, onClick }) {
  const isLocked = stage.status === "locked";
  return (
    <div
      className="bpd-stagenode"
      data-selected={isSelected ? "true" : "false"}
      data-locked={isLocked ? "true" : "false"}
      style={statusVars(stage.status)}
      onClick={() => !isLocked && onClick(stage)}
    >
      <div className="bpd-stagenode__row">
        <Arc pct={stage.progress} status={stage.status} size={36} />
        <div className="bpd-stagenode__body">
          <div className="bpd-stagenode__head">
            <span className="bpd-stagenode__n">{stage.n}</span>
            <span className="bpd-stagenode__name">{stage.name}</span>
          </div>
          <div className="bpd-stagenode__tagline">{stage.tagline}</div>
        </div>
        {stage.status === "active" && <div className="bpd-stagenode__pulse" />}
      </div>
      {stage.status !== "locked" && (
        <div className="bpd-stagenode__gate" data-gate={stage.gate.status}>
          <span className="bpd-stagenode__gate-icon">{gateNodeIcon(stage.gate.status)}</span>
          {stage.gate.label}
        </div>
      )}
    </div>
  );
}

export default function BbosPipelineRail({ vm, selectedId, onSelect }) {
  const { stages, meta } = vm;
  const active = stages.find((s) => s.id === meta.activeStageId);
  const pct = meta.totalStages ? (meta.doneCount / meta.totalStages) * 100 : 0;

  return (
    <div className="bpd-rail">
      <div className="bpd-rail__head">
        <span className="bpd-orn bpd-orn--abs bpd-orn--rail"><Ornament size={80} opacity={1} /></span>
        <div className="bpd-rail__eyebrow">BBOS</div>
        <div className="bpd-rail__title">Barakah Business OS</div>
        <div className="bpd-rail__sub">
          {active ? `Active: Stage ${active.n} — ${active.name}` : "All stages complete"}
        </div>
        <div className="bpd-rail__cycle">
          <div className="bpd-rail__cycle-row">
            <span className="bpd-rail__cycle-label">Cycle {meta.cycle}</span>
            <span className="bpd-rail__cycle-count">{meta.doneCount} / {meta.totalStages}</span>
          </div>
          <div className="bpd-rail__cycle-track">
            <div className="bpd-rail__cycle-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>
      <div className="bpd-rail__list">
        {stages.map((s) => (
          <StageNode key={s.id} stage={s} isSelected={selectedId === s.id} onClick={onSelect} />
        ))}
      </div>
      <div className="bpd-rail__foot">
        <div className="bpd-rail__foot-dot" />
        <span className="bpd-rail__foot-text">Stage 09 returns to Stage 01</span>
      </div>
    </div>
  );
}
