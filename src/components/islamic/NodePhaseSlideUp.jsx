import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowLeft, X } from 'lucide-react';
import { useSettingsStore } from '@store/settings-store';
import { useTaskStore } from '@store/task-store';
import { useThresholdStore } from '@store/threshold-store';
import { useFocusTrap } from '@hooks/useFocusTrap';
import {
  buildTasksForNode,
  getModuleGroups,
  LEVEL_FULL_LABEL,
} from '@data/prophetic-path-submodules';
import { findNextEligibleSubtask, isSubtaskSatisfied } from '@data/orientation-selector';
import { PRAYER_BOARD_PREFIX } from '@data/prayer-pillars';
import { computeTodayKey } from '@/utils/islamic-day-key';
import '@components/work/ProjectSlideUp.css';
import CeremonySummary from './CeremonySummary';
import PrayerHeroDuring from './PrayerHeroDuring';
import SubtaskStepDetail from '../shared/SubtaskStepDetail';
import OrientationActions from '../orientation/OrientationActions';
import { MirrorCard, PPTaskCard } from './PropheticPathMirror';
import { PRAYER_NODE_IDS, THRESHOLD_MODULE_BY_NODE } from './prophetic-path-constants';
import './PropheticPath.css';
import './NodePhaseSlideUp.css';

// The single entry point for a Prophetic Path node. Replaces the old
// Before/After satellite buttons, which CSS hid on every node that was not
// currently active — so on most of the day's timeline the opening and closing
// thresholds were unreachable.
//
// Non-prayer nodes:
//   Before → opening threshold ceremony preview only (CeremonySummary)
//   During → the node's content (MirrorCard) + ALL of the node's tasks
//   After  → closing threshold ceremony preview only (CeremonySummary)
// Prayer nodes:
//   Before → that window's tasks · During → inline prayer guide (PrayerHeroDuring) · After → tasks
//
// Tasks for non-prayer nodes are deliberately consolidated onto During (the
// whole node pool, phase-agnostic) so the Before/After tabs stay pure threshold
// previews — see wiki decision 2026-07-25-milos-prayer-popup-consolidation.
//
// Tapping a task row drills into an inline Orientation-style step detail
// (<SubtaskStepDetail> + the 3-action footer) INSIDE this popup — no hand-off
// to TaskDetailPanel. The drill-in is keyed by { projectId, taskId } and every
// row/subtask fact is re-derived live from phaseTasks each render, so store
// mutations (mark done / doesn't apply / snooze) advance the Now step in place.

const PHASES = [
  { id: 'before', label: 'Before' },
  { id: 'during', label: 'During' },
  { id: 'after', label: 'After' },
];

// For a prayer node the phase board IS the phase: `prayer_{id}_{before|during|
// after}` is seeded per prayer per window, so read it directly instead of
// inferring the set through buildTasksForNode's matchers.
//
// Inference both misses and bleeds here. It misses because PRAYER_BOARDS ship
// `moduleId: null` (prayer-pillars.js), and buildTasksForNode's project filter
// drops any board with no canonical submodule — which silently hid all 49
// seeded prayer-phase tasks from this popup on every prayer, every tab. It
// bleeds because the per-node content matchers are keyword-based: Tahajjud's
// include /siwak|rawatib|witr/, so opening the faith-salah pool to it would
// pull other prayers' tasks into its windows. The board is ground truth.
function buildPrayerPhaseTasks(prayerId, phase, projects, tasksByProject, submoduleName) {
  const projectId = `${PRAYER_BOARD_PREFIX}_${prayerId}_${phase}`;
  const project = (projects || []).find((p) => p.id === projectId);
  if (!project) return [];
  return (tasksByProject?.[projectId] || [])
    .filter((t) => !t.completedAt)
    .map((t) => ({
      id: t.id,
      projectId,
      title: t.title,
      priority: t.priority || 'medium',
      dueDate: t.dueDate || null,
      columnId: t.columnId,
      subtasks: t.subtasks || [],
      tags: t.tags || [],
      // Prayer boards are keyed by window, not by Maqasid level. Leave _level
      // unset rather than letting it default to 3 ("Tahsiniyyat") — that would
      // assert a classification the data never makes, and would label Fajr's
      // mu'akkadah rawatib an embellishment. PPTaskCard omits the chip.
      _level: null,
      _submoduleId: 'faith-salah',
      _submoduleName: submoduleName,
      _project: project,
    }));
}

export default function NodePhaseSlideUp({
  node,
  projects,
  tasksByProject,
  submoduleNameById,
  maghribRaw,
  onSelectProject,
  onSelectSubmodule,
  onClose,
}) {
  const theme = useSettingsStore((s) => s.theme) ?? 'light';
  const setOpeningModuleId = useThresholdStore((s) => s.setOpeningModuleId);
  const setClosingModuleId = useThresholdStore((s) => s.setClosingModuleId);
  const toggleSubtask = useTaskStore((s) => s.toggleSubtask);
  const updateSubtask = useTaskStore((s) => s.updateSubtask);

  const [phase, setPhase] = useState('during');
  const moduleGroups = useMemo(() => getModuleGroups(node.id), [node.id]);
  const [moduleId, setModuleId] = useState(() => moduleGroups[0]?.id || null);
  const [viewMode, setViewMode] = useState('action');
  // { projectId, taskId } of the row drilled into (null = task list). A key,
  // not a snapshot — the row itself is re-found in phaseTasks each render.
  const [detailKey, setDetailKey] = useState(null);

  // Islamic-day key for snooze targeting + eligibility, computed in an effect
  // so the wall-clock read stays out of render (react-hooks/purity) — same
  // sanctioned pattern as Orientation.jsx.
  const [todayKey, setTodayKey] = useState(null);
  useEffect(() => {
    setTodayKey(computeTodayKey(maghribRaw));
  }, [maghribRaw]);

  const panelRef = useFocusTrap(true, onClose);

  const isPrayerNode = PRAYER_NODE_IDS.has(node.id);
  // Prefer the per-node canonical module (faith-salah for prayer nodes etc.)
  // over the user-selected moduleGroup so the ceremony content matches the
  // node's covenant — moduleGroups still steer the task list.
  const thresholdModuleId = THRESHOLD_MODULE_BY_NODE[node.id] || moduleId || 'work';

  const phaseTasks = useMemo(
    () => (isPrayerNode
      ? buildPrayerPhaseTasks(
        node.id,
        phase,
        projects,
        tasksByProject,
        submoduleNameById['faith-salah'] || 'Salah',
      )
      // Non-prayer nodes surface their tasks only on During, so pull the whole
      // node pool (phase: null skips the before/main/after split) and lift the
      // limit so the merged Before+main+After set isn't truncated at 8.
      : buildTasksForNode(node.id, projects, tasksByProject, {
        limit: 20,
        submoduleNameById,
        phase: null,
        moduleId,
      })),
    [isPrayerNode, node.id, phase, projects, tasksByProject, submoduleNameById, moduleId],
  );

  const handleSelectTask = (taskId) => {
    const row = phaseTasks.find((r) => r.id === taskId);
    if (row) setDetailKey({ projectId: row.projectId, taskId: row.id });
  };

  // Tab switches leave the drill-in — each tab is its own task pool, so a held
  // detailKey would either dangle or point at a different window's task.
  const selectPhase = (id) => {
    setPhase(id);
    setDetailKey(null);
  };
  const selectModuleId = (id) => {
    setModuleId(id);
    setDetailKey(null);
  };

  // Live derivation — no snapshots. The decorated row is re-found in the
  // freshly-built phaseTasks each render, so a store mutation advances the Now
  // subtask (or flips to the complete state) without any bookkeeping. If the
  // row leaves the pool entirely, detailRow is null and the body falls back to
  // the task list.
  const detailRow = detailKey
    ? phaseTasks.find((r) => r.id === detailKey.taskId) || null
    : null;
  const nowSubtask = detailRow ? findNextEligibleSubtask(detailRow, todayKey) : null;
  const taskStats = detailRow
    ? {
      done: (detailRow.subtasks || []).filter(isSubtaskSatisfied).length,
      total: (detailRow.subtasks || []).length,
    }
    : null;

  // Same store actions as Orientation's sheet. toggleSubtask never sets task
  // completedAt, so acting on the last step keeps the row in the pool — the
  // drill-in stays put and shows the complete state (no auto-navigation).
  const handleMarkDone = () => {
    if (!detailRow || !nowSubtask) return;
    toggleSubtask(detailRow.projectId, detailRow.id, nowSubtask.id);
  };
  const handleNotApplicable = () => {
    if (!detailRow || !nowSubtask) return;
    updateSubtask(detailRow.projectId, detailRow.id, nowSubtask.id, { notApplicable: true });
  };
  const handleNotToday = () => {
    if (!detailRow || !nowSubtask) return;
    updateSubtask(detailRow.projectId, detailRow.id, nowSubtask.id, { snoozedUntilDayKey: todayKey });
  };

  // Hand off to the globally-mounted ThresholdModal (AppShell) and step out of
  // the way — the ceremony owns the screen from here.
  const beginCeremony = (type) => {
    if (type === 'opening') setOpeningModuleId(thresholdModuleId);
    else setClosingModuleId(thresholdModuleId);
    onClose();
  };

  const taskList = phaseTasks.length === 0 ? (
    <p className="pp-mirror-empty">No tasks queued for this window.</p>
  ) : (
    <div className="pp-task-list">
      {phaseTasks.map((t, i) => (
        <PPTaskCard key={t.id} task={t} index={i} onSelectTask={handleSelectTask} />
      ))}
    </div>
  );

  let body;
  if (detailRow) {
    // Drill-in: inline step detail replaces whichever task list the row was
    // tapped in (prayer Before/After list or non-prayer During mirror list).
    // PrayerHeroDuring and CeremonySummary never reach here — those surfaces
    // have no task rows.
    body = (
      <div className="pp-phase-detail">
        <button
          type="button"
          className="pp-phase-detail__back"
          onClick={() => setDetailKey(null)}
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to tasks
        </button>
        <SubtaskStepDetail
          crumbParts={[
            detailRow._level != null ? LEVEL_FULL_LABEL[detailRow._level] : null,
            detailRow._submoduleName,
          ]}
          task={detailRow}
          subtask={nowSubtask}
          taskStats={taskStats}
        />
      </div>
    );
  } else if (phase === 'during') {
    body = isPrayerNode ? (
      // The prayer itself — its own Before/During/After sunan surfaced inline
      // (rakaʿat, postures, adhkar) rather than a hand-off to a separate view.
      <PrayerHeroDuring pillarKey={node.id} />
    ) : (
      <MirrorCard
        node={node}
        tasks={phaseTasks}
        onSelectTask={handleSelectTask}
        onSelectProject={onSelectProject}
        onSelectSubmodule={onSelectSubmodule}
        phaseLabel="Now"
        viewMode={viewMode}
        moduleGroups={moduleGroups}
        moduleId={moduleId}
        onViewMode={setViewMode}
        onModuleId={selectModuleId}
        showProjects={false}
      />
    );
  } else if (isPrayerNode) {
    // Prayer nodes: tasks only. The per-prayer Sunnah rawatib summary was
    // removed from this popup per user request; the tab label supplies the
    // Before/After context. Rendered as a bare list (no separator wrapper) so
    // it sits flush against the panel body's own padding.
    body = taskList;
  } else {
    // Non-prayer Before/After: threshold ceremony preview only. The task list
    // now lives on During (see the phaseTasks note above).
    body = (
      <CeremonySummary
        moduleId={thresholdModuleId}
        type={phase === 'before' ? 'opening' : 'closing'}
        onBegin={() => beginCeremony(phase === 'before' ? 'opening' : 'closing')}
      />
    );
  }

  return createPortal(
    <div className="prophetic-path pp-phase-slideup" data-theme={theme}>
      <div className="pp-slideup__root">
        <button
          type="button"
          className="pp-slideup__backdrop"
          aria-label="Close"
          onClick={onClose}
        />
        <div
          className="pp-slideup__panel pp-phase-panel"
          role="dialog"
          aria-modal="true"
          aria-label={`${node.title} — before, during, after`}
          ref={panelRef}
        >
          <header className="pp-slideup__header">
            <div className="pp-slideup__title-wrap">
              <span
                className="pp-slideup__swatch"
                style={{ background: isPrayerNode ? '#C8A96E' : '#70d8c8' }}
                aria-hidden="true"
              />
              <h2 className="pp-slideup__title">{node.title}</h2>
            </div>
            <button type="button" className="pp-slideup__close" onClick={onClose} aria-label="Close">
              <X size={18} strokeWidth={2.25} />
            </button>
          </header>

          <div className="pp-phase-panel__tabs">
            <div className="pp-pill-switch" role="tablist" aria-label="Phase">
              {PHASES.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  id={`pp-phase-tab-${p.id}`}
                  aria-selected={phase === p.id}
                  aria-controls={`pp-phase-body-${p.id}`}
                  className="pp-pill-switch__btn"
                  data-active={phase === p.id || undefined}
                  onClick={() => selectPhase(p.id)}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div
            className="pp-phase-panel__body"
            role="tabpanel"
            id={`pp-phase-body-${phase}`}
            aria-labelledby={`pp-phase-tab-${phase}`}
            tabIndex={-1}
          >
            {body}
          </div>

          {detailRow && nowSubtask && (
            <div className="pp-phase-detail__footer">
              <OrientationActions
                onMarkDone={handleMarkDone}
                onNotApplicable={handleNotApplicable}
                onNotToday={handleNotToday}
              />
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
