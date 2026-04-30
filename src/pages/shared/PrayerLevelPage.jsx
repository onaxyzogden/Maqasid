import { useState, useEffect, useMemo, useRef } from 'react';
import { useProjectStore } from '@store/project-store';
import { useTaskStore } from '@store/task-store';
import ProjectBoard from '@components/work/ProjectBoard';
import TaskDetailPanel from '@components/work/TaskDetailPanel';
import { SkeletonCard } from '@components/shared/Skeleton';
import PrayerLevelNavigator, { PRAYER_ENSURE_PROJECTS } from '@components/islamic/PrayerLevelNavigator';
import PrayerHeroDuring from '@components/islamic/PrayerHeroDuring';
import {
  PRAYER_PILLARS,
  PRAYER_PHASE_KEYS,
  PRAYER_LEVEL_COLORS,
  PRAYER_BOARD_PREFIX,
} from '@data/prayer-pillars';
import { usePrayerTimes } from '@hooks/usePrayerTimes';

const VALID_LEVELS = PRAYER_PHASE_KEYS; // ['before','during','after']
const PRIORITY_ORDER = { urgent: 0, high: 1, medium: 2, low: 3 };

// Map pillarKey (lowercase) to usePrayerTimes name (capitalised), or null
// if the prayer has no standard window (tahajjud).
const TIMINGS_KEY = {
  fajr: 'Fajr',
  dhuhr: 'Dhuhr',
  asr: 'Asr',
  maghrib: 'Maghrib',
  isha: 'Isha',
};

function parseTimings(timeStr, ref) {
  if (!timeStr) return null;
  const clean = timeStr.replace(/\s*\(.*\)/, '');
  const [h, m] = clean.split(':').map(Number);
  const d = new Date(ref.getFullYear(), ref.getMonth(), ref.getDate());
  d.setHours(h, m, 0, 0);
  return d;
}

function pickDefaultLevel(pillarKey, timings, activePrayer) {
  const key = TIMINGS_KEY[pillarKey];
  if (!key) return 'before'; // tahajjud fallback
  if (activePrayer?.name === key) return 'during';
  const prayerTime = parseTimings(timings?.[key], new Date());
  if (!prayerTime) return 'before';
  return new Date() < prayerTime ? 'before' : 'after';
}

export default function PrayerLevelPage({
  pillarKey: controlledPillarKey,
  onPillarKeyChange,
}) {
  const [internalPillarKey, setInternalPillarKey] = useState(controlledPillarKey);
  const pillarKey = onPillarKeyChange ? controlledPillarKey : internalPillarKey;
  const setPillarKey = onPillarKeyChange || setInternalPillarKey;
  const [subsegTask, setSubsegTask] = useState(null);
  const { timings, activePrayer } = usePrayerTimes();

  const [activeLevel, setActiveLevel] = useState(() =>
    pickDefaultLevel(controlledPillarKey, timings, activePrayer),
  );

  // Re-pick default when the user taps a different prayer segment inside the
  // same slide-up, so Fajr→Dhuhr re-evaluates whether it's before/during/after.
  useEffect(() => {
    setActiveLevel(pickDefaultLevel(pillarKey, timings, activePrayer));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pillarKey]);

  const ensureProjectsFn = useProjectStore(PRAYER_ENSURE_PROJECTS);
  const getProject = useProjectStore((s) => s.getProject);
  const projects = useProjectStore((s) => s.projects);
  const tasksByProject = useTaskStore((s) => s.tasksByProject);
  const loadTasks = useTaskStore((s) => s.loadTasks);

  useEffect(() => {
    ensureProjectsFn();
    const currentProjects = useProjectStore.getState().projects;
    for (const pillar of PRAYER_PILLARS) {
      for (const lvl of VALID_LEVELS) {
        const boardId = `${PRAYER_BOARD_PREFIX}_${pillar.id}_${lvl}`;
        if (currentProjects.some((p) => p.id === boardId)) loadTasks(boardId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    for (const pillar of PRAYER_PILLARS) {
      const boardId = `${PRAYER_BOARD_PREFIX}_${pillar.id}_${activeLevel}`;
      if (projects.some((p) => p.id === boardId)) loadTasks(boardId);
    }
  }, [projects, activeLevel, loadTasks]);

  const boardId = `${PRAYER_BOARD_PREFIX}_${pillarKey}_${activeLevel}`;
  const project = getProject(boardId);

  const lastProjectRef = useRef(project);
  if (project) lastProjectRef.current = project;
  const displayProject = project || lastProjectRef.current;
  const displayProjectId = project ? boardId : lastProjectRef.current?.id;

  // Cross-fade between boards on pillar/level switch.
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

  // Build externalPillarTasks for the navigator — per-pillar list of tasks
  // for the currently active level. Matches PillarLevelPage grouping order.
  const externalPillarTasks = useMemo(() => {
    const out = {};
    for (const pillar of PRAYER_PILLARS) {
      const bid = `${PRAYER_BOARD_PREFIX}_${pillar.id}_${activeLevel}`;
      const raw = tasksByProject[bid] || [];
      const grouped = new Map();
      for (const t of raw) {
        const tag = t.tags?.[0] ?? 'General';
        if (!grouped.has(tag)) grouped.set(tag, []);
        grouped.get(tag).push(t);
      }
      out[pillar.id] = [...grouped.entries()]
        .sort((a, b) => b[1].length - a[1].length)
        .flatMap(([, items]) =>
          [...items].sort(
            (a, b) => (PRIORITY_ORDER[a.priority] ?? 4) - (PRIORITY_ORDER[b.priority] ?? 4),
          ),
        );
    }
    return out;
  }, [tasksByProject, activeLevel]);

  return (
    <div className="fpb-page-wrapper">
      <PrayerLevelNavigator
        compact
        controlledLevel={activeLevel}
        onLevelChange={setActiveLevel}
        currentPillarId={pillarKey}
        pillarTasks={externalPillarTasks}
        onSegmentClick={(clickedPillarId) => {
          if (clickedPillarId === pillarKey) return;
          setPillarKey(clickedPillarId);
        }}
        onSubsegClick={(taskId, pillarId) => {
          const proj = getProject(`${PRAYER_BOARD_PREFIX}_${pillarId}_${activeLevel}`);
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
          accentColor={PRAYER_LEVEL_COLORS[activeLevel] || subsegTask.project.color}
        />
      )}
      <div className="fpb-layout">
        <div className="fpb-content">
          {activeLevel === 'during' ? (
            <div key={`during-${pillarKey}`} className="fpb-content__layer fpb-content__layer--in">
              <PrayerHeroDuring pillarKey={pillarKey} />
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
