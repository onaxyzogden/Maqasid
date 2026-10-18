// BBOS Pipeline Dashboard - redesigned shell (root).
// ---------------------------------------------------------------------------
// Route-reachable from DashboardView behind the bbosNewDashboard flag. Reads
// its entire view-model from buildPipelineViewModel() - the single data seam.
// This pass is mock-driven; the follow-up swaps the adapter source to live
// stores without touching this component. The dark "cosmic" theme is scoped to
// the .bpd root (see BbosPipelineDashboard.css) and does not leak globally.
import { useMemo, useState } from "react";
import { useTaskStore } from "../../../store/task-store";
import { useProjectStore } from "../../../store/project-store";
import { useUndoToast } from "../../../hooks/useUndoToast";
import { BBOS_STAGES } from "../../../data/bbos/bbos-pipeline";
import { buildPipelineViewModel } from "./adapter/bbos-dashboard-adapter";
import BbosPipelineRail from "./BbosPipelineRail";
import BbosStageOverview from "./BbosStageOverview";
import BbosExecView from "./BbosExecView";
import BbosApprovalBrief from "./BbosApprovalBrief";
import "./BbosPipelineDashboard.css";

const EMPTY_TASKS = [];
const UNDO_BASIS = "Undone from the confirmation toast moments after the decision.";
// A gate decision is weightier than a routine delete, and the operator may still
// be reading the Brief when the toast lands, so its Undo stays up longer than 6s.
const GATE_UNDO_MS = 15000;

const stageTitle = (id) => {
  const idx = BBOS_STAGES.findIndex((s) => s.id === id);
  return `Stage ${String(idx + 1).padStart(2, "0")} — ${BBOS_STAGES[idx]?.label || id}`;
};

export default function BbosPipelineDashboard({ project, bbosFilter, onStageSelect }) {
  const tasks = useTaskStore((s) => s.tasksByProject[project.id] || EMPTY_TASKS);
  const advanceBbosStage = useProjectStore((s) => s.advanceBbosStage);
  const startNewBbosCycle = useProjectStore((s) => s.startNewBbosCycle);
  const rejectBbosPipeline = useProjectStore((s) => s.rejectBbosPipeline);
  const logBbosGateDecision = useProjectStore((s) => s.logBbosGateDecision);
  const reverseBbosGateDecision = useProjectStore((s) => s.reverseBbosGateDecision);
  const undoToast = useUndoToast();
  // The acting role is the attribution; 'all' is the view-everything filter,
  // which names no one, so it records as unattributed.
  const reviewer = project.bbosRole && project.bbosRole !== "all" ? project.bbosRole : null;

  // Run a gate move, then offer Undo only if it actually wrote its entry (a
  // move refused for open conditions writes nothing and gets no toast). Undo
  // appends a 'reversed' entry; the decision itself stays in the record.
  const lastEntry = () =>
    useProjectStore.getState().projects.find((p) => p.id === project.id)?.bbosGateLog?.at(-1) || null;
  const moveWithUndo = (decision, move, message) => {
    const beforeId = lastEntry()?.id;
    move();
    const entry = lastEntry();
    if (!entry || entry.id === beforeId || entry.decision !== decision) return;
    undoToast(message(entry), () =>
      reverseBbosGateDecision(project.id, entry.id, { basis: UNDO_BASIS, by: reviewer }),
    { duration: GATE_UNDO_MS });
  };
  const vm = useMemo(
    () => buildPipelineViewModel({ project, bbosFilter, tasks }),
    [project, bbosFilter, tasks],
  );

  // Selection is two-way bound to the parent's bbosFilter when onStageSelect is
  // provided (the route case): bbosFilter is the single source of truth, so the
  // rail/center pane and the header Download/Upload buttons stay in lock-step —
  // a rail click flows up via onStageSelect and comes back down as bbosFilter,
  // and external changes (cycle reset, advance) are reflected automatically with
  // no effect needed. When uncontrolled, fall back to local state seeded from
  // the filter (or the mockup default, third stage).
  const filterId = vm.stages.find((s) => s.id === bbosFilter)?.id || null;
  const fallbackId = filterId || vm.stages[2]?.id || vm.stages[0]?.id || null;
  const [localId, setLocalId] = useState(fallbackId);
  // Modals hold a stage *id* and read the stage off the live VM, so a task filed
  // inside the Execution View re-renders its row as Filed without reopening.
  const [execStageId, setExecStageId] = useState(null);
  const [briefStageId, setBriefStageId] = useState(null);
  const execStage = vm.stages.find((s) => s.id === execStageId) || null;
  const briefStage = vm.stages.find((s) => s.id === briefStageId) || null;
  const setExecStage = (s) => setExecStageId(s?.id ?? null);
  const setBriefStage = (s) => setBriefStageId(s?.id ?? null);

  const selectedId = onStageSelect ? (filterId || fallbackId) : localId;
  const handleSelect = (s) => {
    if (onStageSelect) onStageSelect(s.id);
    else setLocalId(s.id);
  };

  const selected = vm.stages.find((s) => s.id === selectedId) || null;

  return (
    <div className="bpd">
      <BbosPipelineRail vm={vm} selectedId={selectedId} onSelect={handleSelect} />
      <div className="bpd-main">
        {selected
          ? <BbosStageOverview stage={selected} onOpenBrief={setBriefStage} onOpenExec={setExecStage} />
          : <div className="bpd-main__empty">Select a stage to begin</div>}
      </div>
      {execStage && (
        <BbosExecView
          stage={execStage}
          onClose={() => setExecStage(null)}
          onSubmitGate={() => { setBriefStage(execStage); setExecStage(null); }}
          projectId={project.id}
          columns={project.columns}
        />
      )}
      {briefStage && (
        <BbosApprovalBrief
          stage={briefStage}
          briefSections={vm.meta.briefSections}
          // Each move carries its record (basis, closing note) into bbosGateLog.
          onAdvance={(record) => {
            const idx = BBOS_STAGES.findIndex((s) => s.id === briefStage.id);
            const next = BBOS_STAGES[idx + 1];
            const gated = { ...record, stageId: briefStage.id, by: reviewer };
            // Proceed from the last stage (OPT) closes the cycle: logged as a
            // 'cycle' entry, and the pipeline returns to Identity.
            if (next) {
              moveWithUndo("proceed", () => advanceBbosStage(project.id, next.id, gated),
                () => `Advanced to ${stageTitle(next.id)}`);
            } else {
              moveWithUndo("cycle", () => startNewBbosCycle(project.id, gated),
                (e) => `Cycle ${e.cycle} closed — Cycle ${e.cycle + 1} begins`);
            }
            setBriefStage(null);
          }}
          onReject={(reasonId, record) => {
            moveWithUndo("halt",
              () => rejectBbosPipeline(project.id, reasonId, reviewer, { ...record, stageId: briefStage.id }),
              () => "Pipeline routed to rejection");
            setBriefStage(null);
          }}
          // Proceed-with-conditions: recorded, no stage change, Brief stays open.
          onLogConditions={(record) => logBbosGateDecision(project.id, { ...record, stageId: briefStage.id, by: reviewer })}
          // Resolving a condition is its own entry pointing at it; no stage change.
          onResolveCondition={(resolvesId, basis) =>
            logBbosGateDecision(project.id, { decision: "resolved", resolvesId, basis, by: reviewer })}
          onClose={() => setBriefStage(null)}
        />
      )}
    </div>
  );
}
