import { useState } from 'react';
import { deriveSubtaskSteps, isSubtaskSatisfied } from '../../data/orientation-selector';
import SubtaskStepDetail from './SubtaskStepDetail';
import OrientationActions from '../orientation/OrientationActions';
import { TaskStepper, SubtaskStepper } from '../orientation/OrientationSteppers';

// One-step-at-a-time flow over a sequentially-locked task chain: Task stepper
// (numbered pills) → Subtask stepper (lettered chips) → <SubtaskStepDetail> for
// the previewed step → the 3-action footer. Extracted from OrientationSheet so
// the Orientation sheet and the Prophetic Path node popup share one preview
// engine (see orientation/CONTEXT.md).
//
// Every step is visible; only the TRUE current step (host-supplied
// currentTaskIndex / currentSubtaskIndex) is actionable. The operator can
// browse ahead (locked — primary disabled, "Complete prior steps") or back
// (satisfied — primary stays "Completed" but ENABLED as the revert control;
// clicking calls onRevert with the previewed step). Secondaries lock unless
// viewing the current step.
//
// Props:
//   items          — decorated [{ task, state, label }] rows (deriveBoardSequence
//                    .tasks or decorateTaskChain(...).items)
//   resetKey       — identity of the chain (project id, node|phase|module …);
//                    preview snaps back to the current step when it — or either
//                    current index — changes
//   getCrumbParts  — (task) => breadcrumb parts for the previewed task
//   onMarkDone / onNotApplicable / onNotToday
//                  — act on the TRUE current step; hosts read it off their own
//                    model, never the preview (same contract as before)
//   onRevert       — (task, subtask) => un-complete the previewed satisfied step
//   renderShell    — ({ body, footer }) => host chrome; defaults to the
//                    Orientation sheet's body/footer wrappers
//   todayKey       — OPTIONAL Islamic-day key (see islamic-day-store.js). When
//                    supplied, subtask-level `snoozedUntilDayKey` is honoured:
//                    the flow advances past a step deferred today and its chip
//                    renders `snoozed` (amber) instead of the positional
//                    done/locked verdict. Omitted (Orientation) ⇒ inert —
//                    identical to today's behaviour.
function defaultShell({ body, footer }) {
  return (
    <>
      <div className="pp-slideup__body os-sheet__body">{body}</div>
      <div className="os-sheet__footer">{footer}</div>
    </>
  );
}

export default function SequentialStepFlow({
  items = [],
  currentTaskIndex = -1,
  currentSubtaskIndex = -1,
  resetKey = '',
  getCrumbParts,
  onMarkDone,
  onNotApplicable,
  onNotToday,
  onRevert,
  renderShell = defaultShell,
  todayKey = null,
}) {
  // Which task/subtask the operator is *looking at*. Snaps to the true current
  // step whenever the chain advances (mark done / revert) or a different chain
  // mounts under the same host. Uses React's "adjust state during render" reset
  // pattern (not an effect) so it resyncs synchronously before paint — no
  // mid-chain flash, no cascading effect (orientation/CONTEXT.md gotcha).
  const [preview, setPreview] = useState({ taskIndex: -1, subtaskIndex: -1 });
  const [syncedTo, setSyncedTo] = useState(null);
  const syncKey = `${resetKey} ${currentTaskIndex} ${currentSubtaskIndex}`;
  if (syncedTo !== syncKey) {
    setSyncedTo(syncKey);
    // A fully-satisfied chain (currentTaskIndex -1) opens on its LAST step so
    // the operator lands on finished work they can browse — and revert.
    const ti = currentTaskIndex >= 0 ? currentTaskIndex : items.length - 1;
    const si = currentTaskIndex >= 0
      ? currentSubtaskIndex
      : Math.max((items[ti]?.task?.subtasks?.length ?? 0) - 1, 0);
    setPreview({ taskIndex: ti, subtaskIndex: si });
  }

  if (items.length === 0) return null;

  // --- Preview derivations (browse within the locked chain) ---
  // Clamp both indices into range — a stale index from a longer previous chain
  // must not overrun a shorter one.
  const clampedTask = Math.min(Math.max(preview.taskIndex, 0), items.length - 1);
  const previewedTask = items[clampedTask]?.task ?? null;
  const previewedSteps = previewedTask
    ? deriveSubtaskSteps(previewedTask, todayKey)
    : { currentSubtaskIndex: -1, steps: [] };
  const stepCount = previewedSteps.steps.length;
  const clampedSub = stepCount > 0 ? Math.min(Math.max(preview.subtaskIndex, 0), stepCount - 1) : -1;
  const previewedSubtask = previewedSteps.steps[clampedSub]?.subtask ?? null;
  const previewedSubtasks = previewedTask?.subtasks ?? [];
  // Same definition as buildOrientationCarousel's taskStats (satisfied count),
  // so the progress number is identical when viewing the current task.
  const previewedTaskStats = {
    done: previewedSubtasks.filter(isSubtaskSatisfied).length,
    total: previewedSubtasks.length,
  };

  // Are we looking at the true current step, one ahead (locked), or one behind
  // (already satisfied — every non-current, non-ahead step is, since current is
  // the FIRST unsatisfied step)? A chain with no current step at all
  // (currentTaskIndex -1) is entirely behind.
  //
  // A step deferred today (`snoozed`) is DISPATCHED, not pending, so it is
  // classified behind rather than ahead even though findCurrentSubtaskIndex
  // has skipped past it. Without this: deferring the LAST eligible step of a
  // task drives currentSubtaskIndex to -1 while currentTaskIndex stays >= 0,
  // every step in the task reads "ahead", and the whole footer locks with no
  // way back to the deferred step — a genuine dead end.
  const previewedSnoozed = previewedSteps.steps[clampedSub]?.state === 'snoozed';
  const chainComplete = currentTaskIndex < 0;
  const viewingCurrent =
    !chainComplete && clampedTask === currentTaskIndex && clampedSub === currentSubtaskIndex;
  const viewingAhead =
    !chainComplete && !previewedSnoozed &&
    (clampedTask > currentTaskIndex ||
      (clampedTask === currentTaskIndex && clampedSub > currentSubtaskIndex));
  const viewingBehind = !viewingCurrent && !viewingAhead;
  const primaryLabel = viewingCurrent
    ? 'Mark done'
    : viewingAhead
    ? 'Complete prior steps'
    : previewedSnoozed
    ? 'Resume step'
    : 'Completed';
  // The primary stays enabled on a satisfied OR deferred step — both are the
  // revert control (deferred: un-defer; satisfied: un-complete).
  const primaryDisabled = viewingAhead || (viewingBehind && !previewedSubtask);
  const secondaryDisabled = !viewingCurrent;
  const handlePrimary = viewingCurrent
    ? onMarkDone
    : () => onRevert?.(previewedTask, previewedSubtask);

  // Clicking a task pill jumps the whole preview to that task's current step;
  // clicking a subtask chip moves within the previewed task.
  const handlePreviewTask = (i) => {
    const t = items[i]?.task;
    const derived = t ? deriveSubtaskSteps(t, todayKey) : { currentSubtaskIndex: -1, steps: [] };
    // No current step means the task is settled — either finished, or every
    // remaining step was deferred and the chain has rolled past it. In the
    // deferred case land on the first deferred step rather than step 0: the pill
    // is amber precisely because there is work set aside here, and opening on an
    // already-finished step above it would contradict that. A genuinely complete
    // task has no deferred step, so it still opens at 0, unchanged.
    const deferred = derived.steps.findIndex((s) => s.state === 'snoozed');
    const cur = derived.currentSubtaskIndex >= 0 ? derived.currentSubtaskIndex : deferred;
    setPreview({ taskIndex: i, subtaskIndex: cur < 0 ? 0 : cur });
  };
  const handlePreviewSubtask = (j) => {
    setPreview((p) => ({ ...p, subtaskIndex: j }));
  };

  // Steppers appear only when there is more than one task / subtask to show.
  const taskStepperEl =
    items.length > 1 ? (
      <TaskStepper items={items} previewTaskIndex={clampedTask} onPreview={handlePreviewTask} />
    ) : null;
  const subtaskStepperEl =
    stepCount > 1 ? (
      <SubtaskStepper items={previewedSteps.steps} previewSubtaskIndex={clampedSub} onPreview={handlePreviewSubtask} />
    ) : null;

  const body = (
    <SubtaskStepDetail
      crumbParts={getCrumbParts ? getCrumbParts(previewedTask) : []}
      task={previewedTask}
      subtask={previewedSubtask}
      taskStats={previewedTaskStats}
      taskStepper={taskStepperEl}
      subtaskStepper={subtaskStepperEl}
    />
  );

  const footer = (
    <OrientationActions
      onMarkDone={handlePrimary}
      onNotApplicable={onNotApplicable}
      onNotToday={onNotToday}
      primaryLabel={primaryLabel}
      primaryDisabled={primaryDisabled}
      secondaryDisabled={secondaryDisabled}
    />
  );

  return renderShell({ body, footer });
}
