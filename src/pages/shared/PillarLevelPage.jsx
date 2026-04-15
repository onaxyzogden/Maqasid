import { useState, useEffect } from 'react';
import { useProjectStore } from '@store/project-store';
import { useTaskStore } from '@store/task-store';
import { safeGet, safeSet } from '@services/storage';
import LevelNavigator from '@components/shared/LevelNavigator';
import ProjectBoard from '@components/work/ProjectBoard';
import TaskDetailPanel from '@components/work/TaskDetailPanel';
import { SkeletonCard } from '@components/shared/Skeleton';
import { useAyahBanner } from '@hooks/useAyahBanner';
import './PillarLevelPage.css';

const VALID_LEVELS = ['core', 'growth', 'excellence'];

/**
 * Generic pillar-level page — compact level navigator + kanban board.
 *
 * Props:
 *   pillarKey      — board ID segment, e.g. 'physical', 'marriage'
 *   pillarModuleMap — maps pillarKey → moduleId for navigator highlight
 *                    e.g. { physical: 'physical', mental: 'mental', ... }
 *                    For Faith: { salah: 'salat', zakah: 'zakat', ... }
 *   boardPrefix    — e.g. 'life', 'intellect', 'faith'
 *   storageKey     — localStorage key, e.g. 'life_active_tab'
 *   ensureProjects — Zustand selector fn, e.g. (s) => s.ensureLifeProjects
 *   pillars        — array of { id, label, route } passed to LevelNavigator
 *   levelRoutes    — { core: '/app/...', growth: '...', excellence: '...' }
 */
export default function PillarLevelPage({
  pillarKey,
  pillarModuleMap = {},
  boardPrefix,
  storageKey,
  ensureProjects,
  pillars = [],
  levelRoutes = {},
  levelDescriptions,
}) {
  const [subsegTask, setSubsegTask] = useState(null);

  const [activeLevel, setActiveLevelRaw] = useState(() => {
    const saved = safeGet(storageKey, 'core');
    return VALID_LEVELS.includes(saved) ? saved : 'core';
  });

  const setActiveLevel = (key) => {
    setActiveLevelRaw(key);
    if (storageKey) safeSet(storageKey, key);
  };

  const ensureProjectsFn = useProjectStore(ensureProjects);
  const getProject = useProjectStore((s) => s.getProject);
  const projects = useProjectStore((s) => s.projects);
  const loadTasks = useTaskStore((s) => s.loadTasks);

  useEffect(() => { ensureProjectsFn(); }, []);

  useEffect(() => {
    for (const lvl of VALID_LEVELS) {
      const boardId = `${boardPrefix}_${pillarKey}_${lvl}`;
      if (projects.some((p) => p.id === boardId)) loadTasks(boardId);
    }
  }, [projects, pillarKey, loadTasks]);

  const boardId = `${boardPrefix}_${pillarKey}_${activeLevel}`;
  const project = getProject(boardId);
  const moduleId = pillarModuleMap[pillarKey] ?? pillarKey;
  useAyahBanner(`${boardPrefix}_${pillarKey}`);

  return (
    <div className="fpb-page-wrapper">
      <LevelNavigator
        compact
        controlledLevel={activeLevel}
        onLevelChange={setActiveLevel}
        currentPillarId={moduleId}
        pillars={pillars}
        storageKey={storageKey}
        ensureProjects={ensureProjects}
        levelRoutes={levelRoutes}
        levelDescriptions={levelDescriptions}
        onSubsegClick={(taskId, pillarId) => {
          const proj = getProject(`${boardPrefix}_${pillarId}_${activeLevel}`);
          if (proj) setSubsegTask({ taskId, project: proj });
        }}
      />
      {subsegTask?.project && (
        <TaskDetailPanel
          project={subsegTask.project}
          projectId={subsegTask.project.id}
          taskId={subsegTask.taskId}
          onClose={() => setSubsegTask(null)}
          bbosRole={subsegTask.project.bbosRole || 'all'}
        />
      )}
      <div className="fpb-layout">
        <div className="fpb-content">
          {project ? (
            <ProjectBoard projectId={boardId} project={project} hideFilter hideViewSwitcher />
          ) : (
            <div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <SkeletonCard />
              <SkeletonCard />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
