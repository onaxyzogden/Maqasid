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
import { BBOS_STAGES } from "../../../data/bbos/bbos-pipeline";
import { buildPipelineViewModel } from "./adapter/bbos-dashboard-adapter";
import BbosPipelineRail from "./BbosPipelineRail";
import BbosStageOverview from "./BbosStageOverview";
import BbosExecView from "./BbosExecView";
import BbosApprovalBrief from "./BbosApprovalBrief";
import "./BbosPipelineDashboard.css";

const EMPTY_TASKS = [];

export default function BbosPipelineDashboard({ project, bbosFilter }) {
  const tasks = useTaskStore((s) => s.tasksByProject[project.id] || EMPTY_TASKS);
  const advanceBbosStage = useProjectStore((s) => s.advanceBbosStage);
  const rejectBbosPipeline = useProjectStore((s) => s.rejectBbosPipeline);
  const vm = useMemo(
    () => buildPipelineViewModel({ project, bbosFilter, tasks }),
    [project, bbosFilter, tasks],
  );

  // Default selection mirrors the mockup (third stage); fall back to first.
  const [selectedId, setSelectedId] = useState(() => vm.stages[2]?.id || vm.stages[0]?.id || null);
  const [execStage, setExecStage] = useState(null);
  const [briefStage, setBriefStage] = useState(null);

  const selected = vm.stages.find((s) => s.id === selectedId) || null;

  return (
    <div className="bpd">
      <BbosPipelineRail vm={vm} selectedId={selectedId} onSelect={(s) => setSelectedId(s.id)} />
      <div className="bpd-main">
        {selected
          ? <BbosStageOverview stage={selected} onOpenBrief={setBriefStage} onOpenExec={setExecStage} />
          : <div className="bpd-main__empty">Select a stage to begin</div>}
      </div>
      {execStage && <BbosExecView stage={execStage} onClose={() => setExecStage(null)} />}
      {briefStage && (
        <BbosApprovalBrief
          stage={briefStage}
          briefSections={vm.meta.briefSections}
          onAdvance={() => {
            const idx = BBOS_STAGES.findIndex((s) => s.id === briefStage.id);
            const next = BBOS_STAGES[idx + 1];
            // Last stage (OPT) advance = cycle start, deferred to a later pass.
            if (next) advanceBbosStage(project.id, next.id);
            setBriefStage(null);
          }}
          onReject={(reasonId) => { rejectBbosPipeline(project.id, reasonId); setBriefStage(null); }}
          onClose={() => setBriefStage(null)}
        />
      )}
    </div>
  );
}
