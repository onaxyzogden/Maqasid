import { Check, Clock, Lock, Moon } from 'lucide-react';
import './OrientationSteppers.css';

// Two "you-are-here" rails for the sequential-locking model. Every step is
// visible; only the true current step is actionable, but any step is clickable
// to *preview* its detail (browse ahead or back). The host owns the preview
// index and the store writes — these are purely presentational + a click-out.
//
// State AND label come straight from the selector: deriveBoardSequence ->
// tasks[{state, label}] and deriveSubtaskSteps -> steps[{state, label}], each
// (done | current | locked | snoozed — snoozed only when the host passes
// todayKey; the node popup does, Orientation does not). Tasks are numbered
// (1, 2, 3…) and their steps lettered (A, B, C…), the ordinary outline reading.
// Neither rail computes its own label — one scheme, one source. See
// orientation/CONTEXT.md.

const TASK_STATE_WORD = {
  done: 'done',
  current: 'current step',
  locked: 'locked',
  snoozed: 'set aside today',
};

const SUBTASK_STATE_WORD = {
  done: 'done',
  current: 'current step',
  locked: 'locked',
  snoozed: 'set aside today',
};

// A step behind you collapses to a check; a step ahead keeps its label plus a
// small lock (previewable, not actionable); the current step shows just its
// label. `snoozedNode` lets each rail choose its own deferred glyph: a whole
// TASK set aside collapses to a moon (nothing to distinguish within it), but a
// deferred STEP keeps its letter — the operator still needs to know which step
// it is — and gains a small clock, echoing the "Not now" button's own icon.
function stepContent(state, label, snoozedNode = null) {
  if (state === 'done') return <Check size={14} aria-hidden="true" />;
  if (state === 'snoozed') return snoozedNode;
  return (
    <>
      <span className="os-step__label">{label}</span>
      {state === 'locked' && <Lock size={11} aria-hidden="true" className="os-step__lock" />}
    </>
  );
}

// Numbered pills, one per task in the board's chain. Shown only when a board has
// more than one task (host-gated; guarded here too for safety).
export function TaskStepper({ items = [], previewTaskIndex, onPreview }) {
  if (items.length < 2) return null;
  return (
    <div className="os-stepper" role="group" aria-label="Tasks in this domain">
      {items.map(({ state, label, task }, i) => (
        <button
          key={task?.id ?? i}
          type="button"
          className={
            `os-stepper__pill os-stepper__pill--${state}` +
            (i === previewTaskIndex ? ' os-stepper__pill--previewing' : '')
          }
          aria-current={i === previewTaskIndex ? 'step' : undefined}
          aria-label={`Task ${label}: ${task?.title ?? ''} (${TASK_STATE_WORD[state] ?? state})`}
          onClick={() => onPreview?.(i)}
        >
          {stepContent(state, label, <Moon size={13} aria-hidden="true" />)}
        </button>
      ))}
    </div>
  );
}

// Lettered chip rail, one per subtask of the previewed task. Shown only when a
// task has more than one subtask.
export function SubtaskStepper({ items = [], previewSubtaskIndex, onPreview }) {
  if (items.length < 2) return null;
  return (
    <div className="os-chips" role="group" aria-label="Steps in this task">
      {items.map(({ state, label, subtask }, i) => (
        <button
          key={subtask?.id ?? i}
          type="button"
          className={
            `os-chip os-chip--${state}` +
            (i === previewSubtaskIndex ? ' os-chip--previewing' : '')
          }
          aria-current={i === previewSubtaskIndex ? 'step' : undefined}
          aria-label={`Step ${label}: ${subtask?.title ?? ''} (${SUBTASK_STATE_WORD[state] ?? state})`}
          onClick={() => onPreview?.(i)}
        >
          {stepContent(
            state,
            label,
            <>
              <span className="os-step__label">{label}</span>
              <Clock size={11} aria-hidden="true" className="os-step__defer" />
            </>
          )}
        </button>
      ))}
    </div>
  );
}
