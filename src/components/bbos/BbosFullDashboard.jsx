// MILOS wrapper for the BbosFullDashboard exported from
// `@ogden/ui-components/bbos`. The package component is pure UI; this wrapper
// reads MILOS stores for tasks + project mutations, and injects the polished
// MILOS task card / G-label badge via render-props.

import { useMemo } from 'react';
import { BbosFullDashboard as PackageBbosFullDashboard } from '@ogden/ui-components/bbos';
import { useTaskStore } from '../../store/task-store';
import { useProjectStore } from '../../store/project-store';
import DashboardTaskCard from '../shared/DashboardTaskCard';
import GLabelBadge from '../shared/GLabelBadge';

export default function BbosFullDashboard({ project, bbosFilter, onSelectTask, onStageAdvance }) {
  const tasksByProject = useTaskStore((s) => s.tasksByProject);
  const tasks = useMemo(
    () => tasksByProject[project.id] || [],
    [tasksByProject, project.id],
  );

  const rejectBbosPipeline = useProjectStore((s) => s.rejectBbosPipeline);
  const unrejectBbosPipeline = useProjectStore((s) => s.unrejectBbosPipeline);

  return (
    <PackageBbosFullDashboard
      project={project}
      tasks={tasks}
      bbosFilter={bbosFilter}
      onSelectTask={onSelectTask}
      onStageAdvance={onStageAdvance}
      onRejectStage={(projectId, reasonId, role) =>
        rejectBbosPipeline(projectId, reasonId, role)}
      onUnrejectStage={(projectId) => unrejectBbosPipeline(projectId)}
      renderTaskCard={({ cardProps, body }) => (
        <DashboardTaskCard {...cardProps}>{body}</DashboardTaskCard>
      )}
      renderGLabelBadge={({ gLabel }) => <GLabelBadge gLabel={gLabel} size="sm" />}
    />
  );
}
