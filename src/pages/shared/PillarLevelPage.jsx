import { PillarLevelPage as PackagePillarLevelPage } from '@ogden/ui-components';
import { useProjectStore } from '@store/project-store';
import { useTaskStore } from '@store/task-store';
import { useAyahBanner } from '@hooks/useAyahBanner';
import ProjectBoard from '@components/work/ProjectBoard';
import TaskDetailPanel from '@components/work/TaskDetailPanel';

// Null-rendering component — keeps useAyahBanner in its own mount/unmount lifecycle.
function AyahBannerEffect({ boardPrefix, pillarKey }) {
  useAyahBanner(`${boardPrefix}_${pillarKey}`);
  return null;
}

export default function PillarLevelPage({
  pillarKey,
  pillarModuleMap,
  boardPrefix,
  storageKey,
  ensureProjects,
  pillars,
  levelRoutes,
  levelDescriptions,
}) {
  const ensureProjectsFn = useProjectStore(ensureProjects);
  const getProject = useProjectStore((s) => s.getProject);
  const projects = useProjectStore((s) => s.projects);
  const loadTasks = useTaskStore((s) => s.loadTasks);

  return (
    <PackagePillarLevelPage
      pillarKey={pillarKey}
      pillarModuleMap={pillarModuleMap}
      boardPrefix={boardPrefix}
      storageKey={storageKey}
      pillars={pillars}
      levelRoutes={levelRoutes}
      levelDescriptions={levelDescriptions}
      getProject={getProject}
      onMount={(boardIds) => {
        ensureProjectsFn();
        const currentProjects = useProjectStore.getState().projects;
        boardIds.forEach((id) => {
          if (currentProjects.some((p) => p.id === id)) loadTasks(id);
        });
      }}
      onBoardChange={(boardId) => {
        if (projects.some((p) => p.id === boardId)) loadTasks(boardId);
      }}
      renderBoard={({ boardId, project }) => (
        <ProjectBoard projectId={boardId} project={project} hideFilter hideViewSwitcher />
      )}
      renderTaskPanel={({ taskId, project: proj, accentColor, onClose }) => (
        <TaskDetailPanel
          project={proj}
          projectId={proj.id}
          taskId={taskId}
          onClose={onClose}
          bbosRole={proj.bbosRole || 'all'}
          accentColor={accentColor}
        />
      )}
      renderAyahEffect={({ boardPrefix: bp, pillarKey: pk }) => (
        <AyahBannerEffect boardPrefix={bp} pillarKey={pk} />
      )}
    />
  );
}
