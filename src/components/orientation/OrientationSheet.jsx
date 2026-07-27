import { createPortal } from 'react-dom';
import { useState } from 'react';
import { X, Check } from 'lucide-react';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { getPillarLabel, getSubmoduleLabel } from '../../data/maqasid';
import { TIER_META, deriveSubtaskSteps, isSubtaskSatisfied } from '../../data/orientation-selector';
import SubtaskStepDetail from '../shared/SubtaskStepDetail';
import OrientationActions from './OrientationActions';
import { TaskStepper, SubtaskStepper } from './OrientationSteppers';
// Base slide-up chrome (.pp-slideup__*). OrientationSheet.css layers the
// orientation-specific content on top and must load after it — its panel
// overrides win on equal specificity by source order.
import '../work/ProjectSlideUp.css';
import './OrientationSheet.css';

// Bottom sheet for one Maqasid domain's current step. Built on the shared
// popup chrome (ProjectSlideUp.css): portal to <body>, backdrop, focus trap +
// Escape via useFocusTrap, role=dialog / aria-modal. Purely presentational — the
// container decides which card is shown and what each action does; `card` is the
// engine's card shape (see buildOrientationCarousel). The step internals (crumb,
// title, tags, Now box, Why & how, Evidence) render via the shared
// <SubtaskStepDetail> — also used by the Prophetic Path node popup drill-in.
//
// Sequential locking: every task/subtask in the current board is shown via a
// Task stepper + Subtask stepper, but only the true current step is actionable.
// This host owns a `preview` index so the operator can browse ahead/back; the
// actions stay pinned to the true current step (disabled + relabelled while
// previewing anything else). See orientation/CONTEXT.md.
export default function OrientationSheet({ card, valuesLayer, onMarkDone, onNotApplicable, onNotToday, onClose }) {
  // Hook runs unconditionally (before the null guard); active only when a card
  // is present so it never traps focus on an empty portal.
  const panelRef = useFocusTrap(!!card, onClose);

  // Which task/subtask the operator is *looking at*. Snaps to the true current
  // step whenever the card advances (mark done) or a different domain opens.
  // Uses React's "adjust state during render" reset pattern (not an effect) so
  // it resyncs synchronously before paint — no mid-chain flash, no cascading
  // effect. Hooks stay above the null guard to keep hook order stable.
  const [preview, setPreview] = useState({ taskIndex: -1, subtaskIndex: -1 });
  const [syncedTo, setSyncedTo] = useState(null);
  const cardProjectId = card?.project?.id ?? null;
  const currentTaskIndex = card?.currentTaskIndex ?? -1;
  const currentSubtaskIndex = card?.currentSubtaskIndex ?? -1;
  const syncKey = `${cardProjectId} ${currentTaskIndex} ${currentSubtaskIndex}`;
  if (syncedTo !== syncKey) {
    setSyncedTo(syncKey);
    setPreview({ taskIndex: currentTaskIndex, subtaskIndex: currentSubtaskIndex });
  }

  if (!card) return null;
  const { pillar, tier, submoduleId, task, subtask, hasEligible, board } = card;

  const enLabel = getPillarLabel(pillar, valuesLayer);
  const tierLabel = TIER_META[tier]?.label ?? '';
  const clusterLabel = getSubmoduleLabel(submoduleId, pillar.id);
  const hasStep = hasEligible && !!subtask;

  // --- Preview derivations (browse-ahead within the locked chain) ---
  const boardTasks = board?.tasks ?? [];
  // The task under view (falls back to the current task when out of range).
  const previewedTask = boardTasks[preview.taskIndex]?.task ?? task;
  const previewedSteps = previewedTask
    ? deriveSubtaskSteps(previewedTask)
    : { currentSubtaskIndex: -1, steps: [] };
  // Clamp the previewed subtask into range — a stale index from a longer
  // previous task must not overrun a shorter one.
  const stepCount = previewedSteps.steps.length;
  const clampedSub = stepCount > 0 ? Math.min(Math.max(preview.subtaskIndex, 0), stepCount - 1) : -1;
  const previewedSubtask = previewedSteps.steps[clampedSub]?.subtask ?? subtask;
  const previewedSubtasks = previewedTask?.subtasks ?? [];
  // Same definition as buildOrientationCarousel's taskStats (satisfied count),
  // so the progress number is identical when viewing the current task.
  const previewedTaskStats = {
    done: previewedSubtasks.filter(isSubtaskSatisfied).length,
    total: previewedSubtasks.length,
  };

  // Are we looking at the true current step, one ahead (locked), or one behind
  // (already done)? Only the current step is actionable.
  const viewingCurrent = preview.taskIndex === currentTaskIndex && clampedSub === currentSubtaskIndex;
  const viewingAhead =
    preview.taskIndex > currentTaskIndex ||
    (preview.taskIndex === currentTaskIndex && clampedSub > currentSubtaskIndex);
  const primaryLabel = viewingCurrent ? 'Mark done' : viewingAhead ? 'Complete prior steps' : 'Completed';
  const actionsDisabled = !viewingCurrent;

  // Clicking a task pill jumps the whole preview to that task's current step;
  // clicking a subtask chip moves within the previewed task.
  const handlePreviewTask = (i) => {
    const t = boardTasks[i]?.task;
    const cur = t ? deriveSubtaskSteps(t).currentSubtaskIndex : -1;
    setPreview({ taskIndex: i, subtaskIndex: cur < 0 ? 0 : cur });
  };
  const handlePreviewSubtask = (j) => {
    setPreview((p) => ({ ...p, subtaskIndex: j }));
  };

  // Steppers appear only when there is more than one task / subtask to show.
  const taskStepperEl =
    boardTasks.length > 1 ? (
      <TaskStepper items={boardTasks} previewTaskIndex={preview.taskIndex} onPreview={handlePreviewTask} />
    ) : null;
  const subtaskStepperEl =
    previewedSteps.steps.length > 1 ? (
      <SubtaskStepper items={previewedSteps.steps} previewSubtaskIndex={clampedSub} onPreview={handlePreviewSubtask} />
    ) : null;

  return createPortal(
    <div className="pp-slideup__root os-sheet">
      <button type="button" className="pp-slideup__backdrop" aria-label="Close" onClick={onClose} />
      <div
        ref={panelRef}
        className="pp-slideup__panel os-sheet__panel"
        role="dialog"
        aria-modal="true"
        aria-label={`${enLabel} — current step`}
      >
        <div className="pp-slideup__header">
          <span
            className="pp-slideup__swatch os-sheet__swatch"
            style={{ background: `var(--pillar-${pillar.id})` }}
            aria-hidden="true"
          />
          <div className="pp-slideup__title-wrap">
            <span className="os-sheet__ar" dir="rtl" lang="ar">{pillar.arabicRootAr}</span>
            <h2 className="pp-slideup__title os-sheet__en">{enLabel}</h2>
          </div>
          <button type="button" className="pp-slideup__close" onClick={onClose} aria-label="Close">
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        {hasStep ? (
          <>
            <div className="pp-slideup__body os-sheet__body">
              <SubtaskStepDetail
                crumbParts={[tierLabel, clusterLabel]}
                task={previewedTask}
                subtask={previewedSubtask}
                taskStats={previewedTaskStats}
                taskStepper={taskStepperEl}
                subtaskStepper={subtaskStepperEl}
              />
            </div>

            <div className="os-sheet__footer">
              <OrientationActions
                onMarkDone={onMarkDone}
                onNotApplicable={onNotApplicable}
                onNotToday={onNotToday}
                primaryLabel={primaryLabel}
                disabled={actionsDisabled}
              />
            </div>
          </>
        ) : (
          <>
            <div className="pp-slideup__body os-sheet__body">
              <div className="os-sheet__clear">
                <Check size={22} className="os-sheet__clear-icon" aria-hidden="true" />
                <p className="os-sheet__clear-title">Nothing left in {enLabel} today</p>
                <p className="os-sheet__clear-sub">Come back after Maghrib for a fresh day.</p>
              </div>
            </div>
            <div className="os-sheet__footer os-sheet__footer--single">
              <button type="button" className="orient-actions__btn" onClick={onClose}>Close</button>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
