import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import SubtaskStepDetail from '../SubtaskStepDetail';

// A task with no subtasks (e.g. the Tahajjud Before reminders) reaches the
// detail as `subtask == null`. It must still read as that task, with the task
// stepper kept so the operator can move to another task.
describe('SubtaskStepDetail with a task that has no steps', () => {
  const task = { id: 't2', title: 'Best in the last third of the night', priority: 'high', subtasks: [] };
  const html = renderToStaticMarkup(
    <SubtaskStepDetail
      crumbParts={['Salah']}
      task={task}
      subtask={null}
      taskStats={{ done: 0, total: 0 }}
      taskStepper={<nav data-testid="task-stepper" />}
    />,
  );

  it('shows the task title', () => {
    expect(html).toContain('Best in the last third of the night');
  });

  it('keeps the task stepper', () => {
    expect(html).toContain('data-testid="task-stepper"');
  });

  it('does not say nothing is left', () => {
    expect(html).not.toContain('Nothing left in this task today');
  });
});

describe('SubtaskStepDetail with no task at all', () => {
  it('shows the calm complete state', () => {
    const html = renderToStaticMarkup(<SubtaskStepDetail task={null} subtask={null} />);
    expect(html).toContain('Nothing left in this task today');
  });
});
