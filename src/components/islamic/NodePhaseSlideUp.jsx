import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useSettingsStore } from '@store/settings-store';
import { useTaskStore } from '@store/task-store';
import { useThresholdStore } from '@store/threshold-store';
import { useFocusTrap } from '@hooks/useFocusTrap';
import {
  buildTasksForNode,
  getModuleGroups,
  LEVEL_FULL_LABEL,
  projectTaskRow,
} from '@data/prophetic-path-submodules';
import {
  decorateTaskChain,
  findCurrentSubtaskIndex,
  findCurrentTaskIndex,
  orderBoardTasks,
  TIER_META,
  TIERS,
} from '@data/orientation-selector';
import { getSubmoduleBoardId } from '@data/submodule-registry';
import { PRAYER_BOARD_PREFIX } from '@data/prayer-pillars';
import { computeTodayKey } from '@/utils/islamic-day-key';
import '@components/work/ProjectSlideUp.css';
import CeremonyFlow from './CeremonyFlow';
import PrayerHeroDuring from './PrayerHeroDuring';
import SequentialStepFlow from '../shared/SequentialStepFlow';
import { MirrorCard } from './PropheticPathMirror';
import { educationSubmoduleIds } from './prophetic-path-education';
import { PRAYER_NODE_IDS, THRESHOLD_MODULE_BY_NODE } from './prophetic-path-constants';
import './PropheticPath.css';
import './NodePhaseSlideUp.css';

// The single entry point for a Prophetic Path node. Replaces the old
// Before/After satellite buttons, which CSS hid on every node that was not
// currently active — so on most of the day's timeline the opening and closing
// thresholds were unreachable.
//
// Non-prayer nodes:
//   Before → the full opening ceremony, inline (CeremonyFlow)
//   During → the node's content (MirrorCard); its Action view is the stepper
//   After  → the full closing ceremony, inline (CeremonyFlow)
// Prayer nodes:
//   Before → that window's stepper · During → inline prayer guide
//   (PrayerHeroDuring) · After → that window's stepper
//
// Tasks for non-prayer nodes are deliberately consolidated onto During (the
// whole node pool, phase-agnostic) so the Before/After tabs stay pure ceremony
// surfaces — see wiki decision 2026-07-25-milos-prayer-popup-consolidation.
//
// Every task surface here is the shared one-step-at-a-time engine
// (<SequentialStepFlow>, also the Orientation sheet's): numbered task pills,
// lettered subtask chips, one step detail, and the 3-action footer pinned to
// the TRUE current step — the old tap-a-row drill-in is gone. Store mutations
// re-derive the chain live each render, so mark done / revert advance in place.

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
//
// Completed tasks are NOT filtered out — the stepper shows the whole chain
// (done pills collapse to checks) and browsing back onto one is how revert
// works. The Maghrib daily reset clears prayer boards for the new day.
//
// Sorted through `orderBoardTasks` — the ONE comparator, never an inline
// `a.seedOrder - b.seedOrder`. This pool is a SINGLE board, so `seedOrder` is
// meaningful across it; the unsorted path below is only correct for the merged
// cross-project pool that non-prayer nodes build. Without this the stepper ran
// on raw localStorage order and ignored the curated chain entirely — see
// wiki/decisions/2026-07-27-milos-prayer-board-ordering.md. Note the Maghrib
// reset collapses `order` to 0 (task-store.js), so `seedOrder` is the only
// stable ordering these boards have.
function buildPrayerPhaseTasks(prayerId, phase, projects, tasksByProject, submoduleName) {
  const projectId = `${PRAYER_BOARD_PREFIX}_${prayerId}_${phase}`;
  const project = (projects || []).find((p) => p.id === projectId);
  if (!project) return [];
  return orderBoardTasks(tasksByProject?.[projectId] || [])
    .map((t) => ({
      id: t.id,
      projectId,
      title: t.title,
      priority: t.priority || 'medium',
      dueDate: t.dueDate || null,
      columnId: t.columnId,
      subtasks: t.subtasks || [],
      tags: t.tags || [],
      snoozedUntilDayKey: t.snoozedUntilDayKey || null,
      // Prayer boards are keyed by window, not by Maqasid level. Leave _level
      // unset rather than letting it default to 3 ("Tahsiniyyat") — that would
      // assert a classification the data never makes, and would label Fajr's
      // mu'akkadah rawatib an embellishment.
      _level: null,
      _submoduleId: 'faith-salah',
      _submoduleName: submoduleName,
      _project: project,
    }));
}

// Education pool for ONE submodule at ONE level, already curriculum-ordered by
// seed order via orderBoardTasks — the same reasoning buildPrayerPhaseTasks
// uses for prayer windows (this pool is a whole board, so seed order IS the
// curriculum order; buildTasksForNode's level/priority/due sort exists only
// because its keyword-filtered slice has no meaningful seed order). Completed
// rows are kept, also matching the prayer branch: the stepper shows the whole
// chain, done pills collapse to checks, and browsing back onto one is how
// revert works. `projectTaskRow`'s canonicalId override addresses the board BY
// submodule id directly, since that is exactly what selected it — deriving it
// back from project.moduleId would be a pointless round-trip.
//
// One level at a time, not the union of all three: concatenated, faith-salah
// alone runs to 30 task pills. Split, no rail exceeds 14.
function buildSubmoduleStudyTasks(submoduleId, level, projects, tasksByProject, submoduleNameById) {
  if (!submoduleId || !level) return [];
  const boardId = getSubmoduleBoardId(submoduleId, level);
  const project = boardId ? (projects || []).find((p) => p.id === boardId) : null;
  if (!project) return [];
  return orderBoardTasks(tasksByProject?.[boardId] || [])
    .map((t) => projectTaskRow(t, project, submoduleNameById, submoduleId));
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
  const completeOpening = useThresholdStore((s) => s.completeOpening);
  const completeClosing = useThresholdStore((s) => s.completeClosing);
  const toggleSubtask = useTaskStore((s) => s.toggleSubtask);
  const updateSubtask = useTaskStore((s) => s.updateSubtask);

  const [phase, setPhase] = useState('before');
  const moduleGroups = useMemo(() => getModuleGroups(node.id), [node.id]);
  const [moduleId, setModuleId] = useState(() => moduleGroups[0]?.id || null);
  const [viewMode, setViewMode] = useState('action');

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

  // Education scope: submodule ids available for this node/moduleGroup, the
  // operator's pick among them (if any), and the active one derived DURING
  // RENDER (react-hooks/set-state-in-effect stays clean, and a stale pick
  // from a module-group switch can never survive a render). Skipped entirely
  // on prayer nodes — they have no Education tab.
  const educationSubs = useMemo(
    () => (isPrayerNode ? [] : educationSubmoduleIds(node.id, moduleId)),
    [isPrayerNode, node.id, moduleId],
  );
  const [selectedSubmoduleId, setSelectedSubmoduleId] = useState(null);
  const activeSubmoduleId = educationSubs.includes(selectedSubmoduleId)
    ? selectedSubmoduleId
    : (educationSubs[0] || null);

  // Per-level pools for the active submodule, plus which levels still hold
  // unfinished work. `findCurrentTaskIndex >= 0` is the same "has work left"
  // verdict the stepper itself uses, so the opening level can never disagree
  // with the chain the operator then sees.
  const [selectedLevel, setSelectedLevel] = useState(null);
  const educationByLevel = useMemo(() => {
    if (isPrayerNode || !activeSubmoduleId) return {};
    return Object.fromEntries(TIERS.map((level) => [
      level,
      buildSubmoduleStudyTasks(activeSubmoduleId, level, projects, tasksByProject, submoduleNameById),
    ]));
  }, [isPrayerNode, activeSubmoduleId, projects, tasksByProject, submoduleNameById]);

  // Active level derived DURING RENDER, same as activeSubmoduleId above: an
  // explicit pick always wins, otherwise open on the first level with work
  // left, then the first level seeded at all, then core. Deriving rather than
  // syncing in an effect means a submodule switch re-resolves the level in the
  // same render — a stale pick from the previous submodule can never be shown.
  //
  // An explicit pick wins even when that level has no board: refusing it would
  // make the pill click do nothing at all, with no clue why. Selecting it shows
  // the empty-level message instead, and the pills stay put to switch back.
  const levelsWithTasks = TIERS.filter((l) => (educationByLevel[l]?.length ?? 0) > 0);
  const levelWithWork = levelsWithTasks
    .find((l) => findCurrentTaskIndex(educationByLevel[l], todayKey) >= 0);
  const activeLevel = TIERS.includes(selectedLevel)
    ? selectedLevel
    : (levelWithWork || levelsWithTasks[0] || 'core');
  const educationTasks = educationByLevel[activeLevel] || [];

  const getCrumbParts = (task) => [
    task?._level != null ? LEVEL_FULL_LABEL[task._level] : null,
    task?._submoduleName,
  ];

  // Live chain derivation — no snapshots. Rebuilt from the given row pool each
  // render, so a store mutation advances (or reopens) the current step in
  // place. Both pools span projects; every handler reads the row's own
  // projectId, never a shared board id. Factored so Action (phaseTasks) and
  // Education (educationTasks) share one engine instead of two hand-rolled
  // handler sets that could drift.
  const makeFlowProps = (rows, viewKey) => {
    const chain = decorateTaskChain(rows, todayKey);
    const currentRow = chain.currentTaskIndex >= 0
      ? chain.items[chain.currentTaskIndex].task
      : null;
    const currentSubtaskIndex = currentRow ? findCurrentSubtaskIndex(currentRow, todayKey) : -1;
    const currentSubtask = currentRow && currentSubtaskIndex >= 0
      ? currentRow.subtasks[currentSubtaskIndex]
      : null;

    // Same store actions as Orientation. toggleSubtask never sets task
    // completedAt, so acting on the last step keeps the row in the chain —
    // the stepper stays put and shows the satisfied state (no auto-navigation).
    const handleMarkDone = () => {
      if (!currentRow || !currentSubtask) return;
      toggleSubtask(currentRow.projectId, currentRow.id, currentSubtask.id);
    };
    const handleNotApplicable = () => {
      if (!currentRow || !currentSubtask) return;
      updateSubtask(currentRow.projectId, currentRow.id, currentSubtask.id, { notApplicable: true });
    };
    // Subtask-level snooze — "Not now" defers only the step in front of the
    // operator, not the whole task (which would paint the task pill amber for
    // work that might otherwise be actionable). The chip reads snoozed
    // (amber, not done-green — see subtaskChipState) and the flow advances to
    // the next eligible step.
    const handleNotToday = () => {
      if (!currentRow || !currentSubtask) return;
      updateSubtask(currentRow.projectId, currentRow.id, currentSubtask.id, { snoozedUntilDayKey: todayKey });
    };
    // Revert acts on the PREVIEWED step the flow hands back: un-doing a done
    // step routes through toggleSubtask (a Done-column task also travels back
    // to its previous column); a "doesn't apply" step just clears the flag; a
    // deferred step clears snoozedUntilDayKey so "Resume step" un-defers it.
    const handleRevert = (task, subtask) => {
      if (!task || !subtask) return;
      if (subtask.done) {
        toggleSubtask(task.projectId, task.id, subtask.id);
      } else if (subtask.notApplicable) {
        updateSubtask(task.projectId, task.id, subtask.id, { notApplicable: false });
      } else if (subtask.snoozedUntilDayKey) {
        updateSubtask(task.projectId, task.id, subtask.id, { snoozedUntilDayKey: null });
      }
    };

    return {
      items: chain.items,
      currentTaskIndex: chain.currentTaskIndex,
      currentSubtaskIndex,
      resetKey: `${node.id}|${phase}|${moduleId ?? ''}|${viewKey}`,
      getCrumbParts,
      onMarkDone: handleMarkDone,
      onNotApplicable: handleNotApplicable,
      onNotToday: handleNotToday,
      onRevert: handleRevert,
      todayKey,
    };
  };

  // The ceremony runs fully inline in the Before/After tabs — no more hand-off
  // to the globally-mounted ThresholdModal. Completing records to the same
  // threshold-store actions the modal uses; the popup stays open and the key
  // bump remounts the flow fresh (step 0, selections cleared).
  const [ceremonyRun, setCeremonyRun] = useState(0);
  const handleCeremonyComplete = (type) => {
    if (type === 'opening') completeOpening(thresholdModuleId);
    else completeClosing(thresholdModuleId);
    setCeremonyRun((n) => n + 1);
  };

  // The scrolling tab body. Rendered through a helper so the stepper phases can
  // pair it with a pinned footer while keeping the tabpanel semantics.
  const tabPanel = (children) => (
    <div
      className="pp-phase-panel__body"
      role="tabpanel"
      id={`pp-phase-body-${phase}`}
      aria-labelledby={`pp-phase-tab-${phase}`}
      tabIndex={-1}
    >
      {children}
    </div>
  );

  const flowProps = makeFlowProps(phaseTasks, 'action');
  // The level belongs in the reset key: switching tier swaps the whole chain,
  // and a preview index carried over from the previous tier would point into a
  // board the operator is no longer looking at.
  const educationFlowProps = educationTasks.length > 0
    ? makeFlowProps(educationTasks, `education|${activeSubmoduleId ?? ''}|${activeLevel}`)
    : null;

  // Both pill rows live OUTSIDE SequentialStepFlow's renderShell. Inside, they
  // would disappear whenever a level happened to be unseeded — taking away the
  // very control needed to switch back off it.
  const educationPills = (
    <div className="pp-edu-switches">
      {educationSubs.length > 1 && (
        <div className="pp-pill-switch" role="tablist" aria-label="Submodule">
          {educationSubs.map((id) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={activeSubmoduleId === id}
              className="pp-pill-switch__btn"
              data-active={activeSubmoduleId === id || undefined}
              onClick={() => setSelectedSubmoduleId(id)}
            >
              {submoduleNameById[id] || id}
            </button>
          ))}
        </div>
      )}
      <div className="pp-pill-switch" role="tablist" aria-label="Level">
        {TIERS.map((level) => (
          <button
            key={level}
            type="button"
            role="tab"
            aria-selected={activeLevel === level}
            className="pp-pill-switch__btn"
            data-active={activeLevel === level || undefined}
            onClick={() => setSelectedLevel(level)}
          >
            {TIER_META[level].label}
          </button>
        ))}
      </div>
    </div>
  );

  // Rendered only when the node has education scope at all; MirrorCard's
  // EducationList fallback then fires solely for an unscoped node, which is the
  // case it was written for.
  const educationContent = educationSubs.length > 0 ? (
    <div className="pp-phase-detail">
      {educationPills}
      {educationFlowProps ? (
        <SequentialStepFlow
          {...educationFlowProps}
          renderShell={({ body, footer }) => (
            <>
              {body}
              <div className="pp-phase-detail__footer pp-phase-detail__footer--inline">
                {footer}
              </div>
            </>
          )}
        />
      ) : (
        <p className="pp-mirror-empty">Nothing seeded at this level yet.</p>
      )}
    </div>
  ) : null;

  let middle;
  if (phase === 'during') {
    middle = tabPanel(isPrayerNode ? (
      // The prayer itself — its own Before/During/After sunan surfaced inline
      // (rakaʿat, postures, adhkar) rather than a hand-off to a separate view.
      <PrayerHeroDuring pillarKey={node.id} />
    ) : (
      <MirrorCard
        node={node}
        tasks={phaseTasks}
        onSelectProject={onSelectProject}
        onSelectSubmodule={onSelectSubmodule}
        phaseLabel="Now"
        viewMode={viewMode}
        moduleGroups={moduleGroups}
        moduleId={moduleId}
        onViewMode={setViewMode}
        onModuleId={setModuleId}
        showProjects={false}
        taskContent={phaseTasks.length > 0 ? (
          // Inline shell: the stepper lives inside the mirror card, so its
          // actions sit at the end of the card content rather than pinned to
          // the panel edge.
          <SequentialStepFlow
            {...flowProps}
            renderShell={({ body, footer }) => (
              <div className="pp-phase-detail">
                {body}
                <div className="pp-phase-detail__footer pp-phase-detail__footer--inline">
                  {footer}
                </div>
              </div>
            )}
          />
        ) : null}
        // Education mirrors Action's shell over ONE level of the selected
        // submodule's curriculum, opening on the first level with work left.
        // Null only for a node with no education scope at all, where MirrorCard
        // falls back to EducationList's submodule picker.
        educationContent={educationContent}
      />
    ));
  } else if (isPrayerNode) {
    // Prayer Before/After: that window's board as a stepper, actions pinned
    // below the scrolling body — same layout as the Orientation sheet.
    middle = phaseTasks.length === 0
      ? tabPanel(<p className="pp-mirror-empty">No tasks queued for this window.</p>)
      : (
        <SequentialStepFlow
          {...flowProps}
          renderShell={({ body, footer }) => (
            <>
              {tabPanel(<div className="pp-phase-detail">{body}</div>)}
              <div className="pp-phase-detail__footer">{footer}</div>
            </>
          )}
        />
      );
  } else {
    // Non-prayer Before/After: the full ceremony, inline. The task chain lives
    // on During (see the phaseTasks note above). The key remounts the flow on
    // tab/module switch or after a completion, resetting its step state.
    const ceremonyType = phase === 'before' ? 'opening' : 'closing';
    middle = tabPanel(
      <div className="pp-ceremony-embed">
        <CeremonyFlow
          key={`${thresholdModuleId}|${ceremonyType}|${ceremonyRun}`}
          moduleId={thresholdModuleId}
          type={ceremonyType}
          onComplete={() => handleCeremonyComplete(ceremonyType)}
        />
      </div>,
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

          {middle}
        </div>
      </div>
    </div>,
    document.body,
  );
}
