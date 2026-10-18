// BBOS Pipeline Dashboard - left rail (header + cycle progress + stage nodes).
import { useEffect, useRef } from "react";
import { Arc, Ornament } from "./primitives";
import { gateNodeIcon, layerVars } from "./palette";
import { rowActivation } from '../../../lib/row-activation';

// StageNode is a <button>, so its children are spans (phrasing content only);
// the CSS gives them their block/flex layout.
function StageNode({ stage, isSelected, onClick }) {
  const isLocked = stage.status === "locked";
  return (
    <button
      type="button"
      className="bpd-stagenode"
      data-selected={isSelected ? "true" : "false"}
      data-locked={isLocked ? "true" : "false"}
      aria-current={isSelected ? "true" : undefined}
      aria-disabled={isLocked ? "true" : undefined}
      aria-label={`Stage ${stage.n} ${stage.name}, ${isLocked ? "locked" : `${stage.progress}% complete`}`}
      style={layerVars(stage.layer)}
      {...rowActivation(() => !isLocked && onClick(stage))}
    >
      <span className="bpd-stagenode__row">
        <Arc pct={stage.progress} status={stage.status} size={36} />
        <span className="bpd-stagenode__body">
          <span className="bpd-stagenode__head">
            <span className="bpd-stagenode__n">{stage.n}</span>
            <span className="bpd-stagenode__name">{stage.name}</span>
          </span>
          <span className="bpd-stagenode__tagline">{stage.tagline}</span>
        </span>
        {stage.status === "active" && <span className="bpd-stagenode__pulse" />}
      </span>
      {stage.status !== "locked" && (
        <span className="bpd-stagenode__gate" data-gate={stage.gate.status}>
          <span className="bpd-stagenode__gate-icon">{gateNodeIcon(stage.gate.status)}</span>
          {stage.gate.label}
        </span>
      )}
    </button>
  );
}

export default function BbosPipelineRail({ vm, selectedId, onSelect }) {
  const { stages, meta } = vm;
  const active = stages.find((s) => s.id === meta.activeStageId);
  const pct = meta.totalStages ? (meta.doneCount / meta.totalStages) * 100 : 0;
  const listRef = useRef(null);

  // On mobile the list is a horizontal strip; keep the selected stage in view.
  // block: "nearest" leaves the vertical desktop list alone when it is visible.
  useEffect(() => {
    const node = listRef.current?.querySelector('[data-selected="true"]');
    node?.scrollIntoView?.({ block: "nearest", inline: "nearest" });
  }, [selectedId]);

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
      <nav className="bpd-rail__list" aria-label="BBOS stages" ref={listRef}>
        {stages.map((s) => (
          <StageNode key={s.id} stage={s} isSelected={selectedId === s.id} onClick={onSelect} />
        ))}
      </nav>
      <div className="bpd-rail__foot">
        <div className="bpd-rail__foot-dot" />
        <span className="bpd-rail__foot-text">Stage 09 returns to Stage 01</span>
      </div>
    </div>
  );
}
