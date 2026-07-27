import { Check, Lock, Moon } from 'lucide-react';
import './OrientationSteppers.css';

// Two "you-are-here" rails for the sequential-locking model. Every step is
// visible; only the true current step is actionable, but any step is clickable
// to *preview* its detail (browse ahead or back). The host owns the preview
// index and the store writes — these are purely presentational + a click-out.
//
// State comes straight from the selector: deriveBoardSequence -> tasks[{state,
// letter}] (done | current | locked | snoozed) and deriveSubtaskSteps ->
// steps[{state}] (done | current | locked). See orientation/CONTEXT.md.

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
};

// A step behind you collapses to a check; a whole task set aside shows a moon;
// a step ahead keeps its label plus a small lock (previewable, not actionable);
// the current step shows just its label.
function stepContent(state, label) {
  if (state === 'done') return <Check size={14} aria-hidden="true" />;
  if (state === 'snoozed') return <Moon size={13} aria-hidden="true" />;
  return (
    <>
      <span className="os-step__label">{label}</span>
      {state === 'locked' && <Lock size={11} aria-hidden="true" className="os-step__lock" />}
    </>
  );
}

// Lettered pills, one per task in the board's chain. Shown only when a board has
// more than one task (host-gated; guarded here too for safety).
export function TaskStepper({ items = [], previewTaskIndex, onPreview }) {
  if (items.length < 2) return null;
  return (
    <div className="os-stepper" role="group" aria-label="Tasks in this domain">
      {items.map(({ state, letter, task }, i) => (
        <button
          key={task?.id ?? i}
          type="button"
          className={
            `os-stepper__pill os-stepper__pill--${state}` +
            (i === previewTaskIndex ? ' os-stepper__pill--previewing' : '')
          }
          aria-current={i === previewTaskIndex ? 'step' : undefined}
          aria-label={`Task ${letter}: ${task?.title ?? ''} (${TASK_STATE_WORD[state] ?? state})`}
          onClick={() => onPreview?.(i)}
        >
          {stepContent(state, letter)}
        </button>
      ))}
    </div>
  );
}

// Numbered chip rail, one per subtask of the previewed task. Shown only when a
// task has more than one subtask.
export function SubtaskStepper({ items = [], previewSubtaskIndex, onPreview }) {
  if (items.length < 2) return null;
  return (
    <div className="os-chips" role="group" aria-label="Steps in this task">
      {items.map(({ state, subtask }, i) => (
        <button
          key={subtask?.id ?? i}
          type="button"
          className={
            `os-chip os-chip--${state}` +
            (i === previewSubtaskIndex ? ' os-chip--previewing' : '')
          }
          aria-current={i === previewSubtaskIndex ? 'step' : undefined}
          aria-label={`Step ${i + 1}: ${subtask?.title ?? ''} (${SUBTASK_STATE_WORD[state] ?? state})`}
          onClick={() => onPreview?.(i)}
        >
          {stepContent(state, i + 1)}
        </button>
      ))}
    </div>
  );
}
