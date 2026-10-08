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

export default function BbosPipelineDashboard({ project, bbosFilter, onStageSelect }) {
  const tasks = useTaskStore((s) => s.tasksByProject[project.id] || EMPTY_TASKS);
  const advanceBbosStage = useProjectStore((s) => s.advanceBbosStage);
  const rejectBbosPipeline = useProjectStore((s) => s.rejectBbosPipeline);
  const updateProject = useProjectStore((s) => s.updateProject);
  const undoToast = useUndoToast();

  // Gate decisions write to the pipeline; snapshot the fields they touch so
  // the toast's Undo can put the project back exactly as it was.
  const snapshotGate = () => ({
    bbosStage: project.bbosStage,
    rejectedAt: project.rejectedAt ?? null,
    rejectionReason: project.rejectionReason ?? null,
    rejectedBy: project.rejectedBy ?? null,
    bbosDecisions: project.bbosDecisions || [],
  });
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
  const [execStage, setExecStage] = useState(null);
  const [briefStage, setBriefStage] = useState(null);

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
        />
      )}
      {briefStage && (
        <BbosApprovalBrief
          stage={briefStage}
          briefSections={vm.meta.briefSections}
          onAdvance={(decision) => {
            const idx = BBOS_STAGES.findIndex((s) => s.id === briefStage.id);
            const next = BBOS_STAGES[idx + 1];
            // Last stage (OPT) advance = cycle start, deferred to a later pass.
            if (next) {
              const before = snapshotGate();
              advanceBbosStage(project.id, next.id, { ...decision, fromStage: briefStage.id });
              undoToast(`Advanced to ${next.name || next.id}`, () => updateProject(project.id, before));
            }
            setBriefStage(null);
          }}
          onReject={(reasonId, decision) => {
            const before = snapshotGate();
            rejectBbosPipeline(project.id, reasonId, null, { ...decision, fromStage: briefStage.id });
            undoToast("Pipeline routed to rejection", () => updateProject(project.id, before));
            setBriefStage(null);
          }}
          onClose={() => setBriefStage(null)}
        />
      )}
    </div>
  );
}
