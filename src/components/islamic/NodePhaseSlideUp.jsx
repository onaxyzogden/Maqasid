import { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useSettingsStore } from '@store/settings-store';
import { useThresholdStore } from '@store/threshold-store';
import { useFocusTrap } from '@hooks/useFocusTrap';
import {
  buildTasksForNode,
  getModuleGroups,
} from '@data/prophetic-path-submodules';
import { PRAYER_BOARD_PREFIX } from '@data/prayer-pillars';
import '@components/work/ProjectSlideUp.css';
import CeremonySummary from './CeremonySummary';
import PrayerHeroDuring from './PrayerHeroDuring';
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
  onSelectTask,
  onSelectProject,
  onSelectSubmodule,
  onClose,
}) {
  const theme = useSettingsStore((s) => s.theme) ?? 'light';
  const setOpeningModuleId = useThresholdStore((s) => s.setOpeningModuleId);
  const setClosingModuleId = useThresholdStore((s) => s.setClosingModuleId);

  const [phase, setPhase] = useState('during');
  const moduleGroups = useMemo(() => getModuleGroups(node.id), [node.id]);
  const [moduleId, setModuleId] = useState(() => moduleGroups[0]?.id || null);
  const [viewMode, setViewMode] = useState('action');

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
    if (row) onSelectTask(row);
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
  if (phase === 'during') {
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
        onModuleId={setModuleId}
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
                  onClick={() => setPhase(p.id)}
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
        </div>
      </div>
    </div>,
    document.body,
  );
}
