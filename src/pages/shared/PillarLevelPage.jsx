import { useState, useEffect, useMemo, useRef } from 'react';
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
const LEVEL_COLORS = { core: '#C8A96E', growth: '#4ab8a8', excellence: '#8b5cf6' };

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
  pillarKey: initialPillarKey,
  pillarModuleMap = {},
  boardPrefix,
  storageKey,
  ensureProjects,
  pillars = [],
  levelRoutes = {},
  levelDescriptions,
}) {
  // Local submodule state — initialised from the wrapper page's prop, then
  // updated in-place on tab click so the page never unmounts on submodule switch.
  const [pillarKey, setPillarKey] = useState(initialPillarKey);
  const [subsegTask, setSubsegTask] = useState(null);

  const [activeLevel, setActiveLevelRaw] = useState(() => {
    const saved = safeGet(storageKey, 'core');
    return VALID_LEVELS.includes(saved) ? saved : 'core';
  });

  const slideDirRef = useRef(null);

  const setActiveLevel = (key) => {
    const prevIdx = VALID_LEVELS.indexOf(activeLevel);
    const nextIdx = VALID_LEVELS.indexOf(key);
    if (prevIdx !== nextIdx) slideDirRef.current = nextIdx > prevIdx ? 'left' : 'right';
    setActiveLevelRaw(key);
    if (storageKey) safeSet(storageKey, key);
  };

  const ensureProjectsFn = useProjectStore(ensureProjects);
  const getProject = useProjectStore((s) => s.getProject);
  const projects = useProjectStore((s) => s.projects);
  const loadTasks = useTaskStore((s) => s.loadTasks);

  useEffect(() => {
    ensureProjectsFn();
    // After seeding, explicitly reload tasks. The projects-dep effect below
    // won't re-fire when the project already existed in the store (AppShell
    // preloads all projects on startup), leaving the store stale if localStorage
    // was cleared between visits. Read store state directly — no subscription.
    const currentProjects = useProjectStore.getState().projects;
    for (const lvl of VALID_LEVELS) {
      const boardId = `${boardPrefix}_${pillarKey}_${lvl}`;
      if (currentProjects.some((p) => p.id === boardId)) loadTasks(boardId);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    for (const lvl of VALID_LEVELS) {
      const boardId = `${boardPrefix}_${pillarKey}_${lvl}`;
      if (projects.some((p) => p.id === boardId)) loadTasks(boardId);
    }
    // reason: boardPrefix is caller-stable for a given page; deps narrowed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects, pillarKey, loadTasks]);

  const boardId = `${boardPrefix}_${pillarKey}_${activeLevel}`;
  const project = getProject(boardId);

  // Keep the last-rendered project so the UI never goes blank mid-switch.
  const lastProjectRef = useRef(project);
  if (project) lastProjectRef.current = project;
  const displayProject = project || lastProjectRef.current;
  const displayProjectId = project ? boardId : lastProjectRef.current?.id;

  // Two-layer cross-fade on level switch.
  const [prevProject, setPrevProject] = useState(null);
  const prevTimerRef = useRef(null);
  const trackedBoardIdRef = useRef(boardId);
  useEffect(() => {
    if (trackedBoardIdRef.current === boardId) return;
    const outgoingProject = getProject(trackedBoardIdRef.current);
    trackedBoardIdRef.current = boardId;
    if (outgoingProject) {
      setPrevProject(outgoingProject);
      clearTimeout(prevTimerRef.current);
      prevTimerRef.current = setTimeout(() => setPrevProject(null), 320);
    }
  }, [boardId, getProject]);

  const moduleId = pillarModuleMap[pillarKey] ?? pillarKey;
  // Reverse map: moduleId → pillarKey (e.g. 'salat' → 'salah')
  const moduleToKey = useMemo(() => {
    const m = {};
    for (const [k, v] of Object.entries(pillarModuleMap)) m[v] = k;
    return m;
  }, [pillarModuleMap]);
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
        onSegmentClick={(clickedPillarId) => {
          const nextKey = moduleToKey[clickedPillarId] || clickedPillarId;
          if (nextKey === pillarKey) return;
          const nextRoute = pillars.find((p) => p.id === clickedPillarId)?.route;
          setPillarKey(nextKey);
          if (nextRoute) window.history.replaceState(null, '', nextRoute);
        }}
        onSubsegClick={(taskId, pillarId) => {
          const key = moduleToKey[pillarId] || pillarId;
          const proj = getProject(`${boardPrefix}_${key}_${activeLevel}`);
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
          accentColor={LEVEL_COLORS[activeLevel] || subsegTask.project.color}
        />
      )}
      <div className="fpb-layout">
        <div className="fpb-content">
          {prevProject && prevProject.id !== displayProjectId && (
            <div key={prevProject.id} className="fpb-content__layer fpb-content__layer--out">
              <ProjectBoard projectId={prevProject.id} project={prevProject} hideFilter hideViewSwitcher />
            </div>
          )}
          {displayProject ? (
            <div key={displayProjectId} className="fpb-content__layer fpb-content__layer--in">
              <ProjectBoard projectId={displayProjectId} project={displayProject} hideFilter hideViewSwitcher />
            </div>
          ) : (
            <div className="fpb-content__layer" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <SkeletonCard />
              <SkeletonCard />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
