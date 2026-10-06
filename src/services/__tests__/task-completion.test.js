// A task's column and completedAt follow its steps (2026-10-06). Before this,
// ticking the last step in Orientation or a Prophetic Path node never set
// completedAt or moved the card to Done, so the board and every dashboard
// count disagreed with the steppers.
//
// Approval gate: stages/implement-task-completion-sync-review.md

import { describe, it, expect, beforeAll, beforeEach } from 'vitest';
import {
  allSubtasksSatisfied, syncTaskCompletion, reconcileBoardCompletion, placeMovedTask,
} from '../task-completion';

const COLS = [
  { id: 'todo', name: 'To Do' },
  { id: 'prog', name: 'In Progress' },
  { id: 'done', name: 'Done' },
];
const NOW = '2026-10-06T10:00:00.000Z';
const sub = (id, over = {}) => ({ id, title: id, done: false, ...over });
const task = (subtasks, over = {}) => ({ id: 't1', title: 'T', columnId: 'todo', order: 0, completedAt: null, subtasks, ...over });

describe('syncTaskCompletion', () => {
  it('completes a task once every step is done', () => {
    const t = syncTaskCompletion(task([sub('a', { done: true }), sub('b', { done: true })]), COLS, NOW);
    expect(t).toMatchObject({ columnId: 'done', completedAt: NOW });
  });

  it('counts "doesn\'t apply" as satisfied', () => {
    const t = syncTaskCompletion(task([sub('a', { done: true }), sub('b', { notApplicable: true })]), COLS, NOW);
    expect(t.columnId).toBe('done');
  });

  it('leaves a partly finished task where it is', () => {
    const t0 = task([sub('a', { done: true }), sub('b')]);
    expect(syncTaskCompletion(t0, COLS, NOW)).toBe(t0);
  });

  it('reopens a Done task into the column before Done when a step is no longer satisfied', () => {
    const t = syncTaskCompletion(task([sub('a', { done: true }), sub('b')], { columnId: 'done', completedAt: NOW }), COLS, NOW);
    expect(t).toMatchObject({ columnId: 'prog', completedAt: null });
  });

  it('never touches a task with no steps (manual card moves stand)', () => {
    const t0 = task([], { columnId: 'done', completedAt: NOW });
    expect(syncTaskCompletion(t0, COLS, NOW)).toBe(t0);
    const t1 = task([]);
    expect(syncTaskCompletion(t1, COLS, NOW)).toBe(t1);
  });

  it('keeps an existing completedAt and does nothing on a board without a Done column', () => {
    const t = syncTaskCompletion(task([sub('a', { done: true })], { completedAt: '2026-01-01T00:00:00.000Z' }), COLS, NOW);
    expect(t.completedAt).toBe('2026-01-01T00:00:00.000Z');
    const t0 = task([sub('a', { done: true })]);
    expect(syncTaskCompletion(t0, [{ id: 'x', name: 'Backlog' }], NOW)).toBe(t0);
  });

  it('promoteOnly never reopens', () => {
    const t0 = task([sub('a')], { columnId: 'done', completedAt: NOW });
    expect(syncTaskCompletion(t0, COLS, NOW, { promoteOnly: true })).toBe(t0);
  });
});

describe('placeMovedTask', () => {
  it('appends a completed task to the end of Done and puts a reopened one first', () => {
    const tasks = [
      { id: 'd1', columnId: 'done', order: 0 }, { id: 'd2', columnId: 'done', order: 1 },
      { id: 'x', columnId: 'done', order: 0 }, { id: 'p1', columnId: 'prog', order: 0 },
    ];
    const done = placeMovedTask(tasks, 'x', 'done');
    expect(done.find((t) => t.id === 'x').order).toBe(2);
    const reopened = placeMovedTask([...tasks.slice(0, 2), { id: 'x', columnId: 'prog', order: 9 }, tasks[3]], 'x', 'done');
    expect(reopened.find((t) => t.id === 'x').order).toBe(0);
    expect(reopened.find((t) => t.id === 'p1').order).toBe(1);
  });
});

describe('reconcileBoardCompletion (one-time catch-up)', () => {
  const board = () => [
    { id: 'old-done', columnId: 'done', order: 0, completedAt: NOW, subtasks: [sub('a', { done: true })] },
    { id: 'finished', columnId: 'todo', order: 0, completedAt: null, updatedAt: '2026-10-05T08:00:00.000Z', subtasks: [sub('a', { done: true }), sub('b', { notApplicable: true })] },
    { id: 'partial', columnId: 'todo', order: 1, completedAt: null, subtasks: [sub('a', { done: true }), sub('b')] },
    { id: 'dragged', columnId: 'done', order: 1, completedAt: NOW, subtasks: [sub('a')] },
  ];

  it('promotes finished tasks to the end of Done, dated when last touched', () => {
    const { next, promoted } = reconcileBoardCompletion(board(), COLS, NOW);
    expect(promoted).toBe(1);
    expect(next.find((t) => t.id === 'finished')).toMatchObject({ columnId: 'done', completedAt: '2026-10-05T08:00:00.000Z', order: 2 });
  });

  it('leaves partial tasks and manual Done moves alone', () => {
    const before = board();
    const { next } = reconcileBoardCompletion(before, COLS, NOW);
    expect(next.find((t) => t.id === 'partial')).toBe(before[2]);
    expect(next.find((t) => t.id === 'dragged')).toBe(before[3]);
  });

  it('is a no-op on a second run and on boards without a Done column', () => {
    const { next } = reconcileBoardCompletion(board(), COLS, NOW);
    expect(reconcileBoardCompletion(next, COLS, NOW)).toEqual({ next, promoted: 0 });
    const b = board();
    expect(reconcileBoardCompletion(b, [{ id: 'todo', name: 'To Do' }], NOW).next).toBe(b);
  });

  it('agrees with allSubtasksSatisfied', () => {
    expect(allSubtasksSatisfied({ subtasks: [] })).toBe(false);
    expect(allSubtasksSatisfied({ subtasks: [sub('a', { notApplicable: true })] })).toBe(true);
  });
});

// The store wiring, end to end: Orientation's "Mark done" and "Doesn't apply"
// call toggleSubtask / updateSubtask.
describe('task store keeps column and completedAt in step', () => {
  let useTaskStore;
  let useProjectStore;
  beforeAll(async () => {
    const mem = new Map();
    globalThis.localStorage = {
      getItem: (k) => (mem.has(k) ? mem.get(k) : null),
      setItem: (k, v) => mem.set(k, String(v)),
      removeItem: (k) => mem.delete(k),
      key: (i) => [...mem.keys()][i] ?? null,
      get length() { return mem.size; },
      clear: () => mem.clear(),
    };
    ({ useProjectStore } = await import('../../store/project-store'));
    ({ useTaskStore } = await import('../../store/task-store'));
  });
  beforeEach(() => {
    useProjectStore.setState({ projects: [{ id: 'health_physical_core', columns: COLS }] });
    useTaskStore.setState({
      tasksByProject: {
        health_physical_core: [
          { id: 'other', title: 'Other', columnId: 'done', order: 0, subtasks: [] },
          task([sub('a'), sub('b')]),
        ],
      },
    });
  });
  const t1 = () => useTaskStore.getState().tasksByProject.health_physical_core.find((t) => t.id === 't1');

  it('ticking the last step moves the task to Done with a completedAt', () => {
    const { toggleSubtask } = useTaskStore.getState();
    toggleSubtask('health_physical_core', 't1', 'a');
    expect(t1()).toMatchObject({ columnId: 'todo', completedAt: null });
    toggleSubtask('health_physical_core', 't1', 'b');
    expect(t1().columnId).toBe('done');
    expect(t1().completedAt).toBeTruthy();
    expect(t1().order).toBe(1); // after the card already in Done
  });

  it('"Doesn\'t apply" on the last step completes it; clearing it reopens', () => {
    const { toggleSubtask, updateSubtask } = useTaskStore.getState();
    toggleSubtask('health_physical_core', 't1', 'a');
    updateSubtask('health_physical_core', 't1', 'b', { notApplicable: true });
    expect(t1().columnId).toBe('done');
    updateSubtask('health_physical_core', 't1', 'b', { notApplicable: false });
    expect(t1()).toMatchObject({ columnId: 'prog', completedAt: null, order: 0 });
  });

  it('unticking a step of a finished task reopens it', () => {
    const { toggleSubtask } = useTaskStore.getState();
    toggleSubtask('health_physical_core', 't1', 'a');
    toggleSubtask('health_physical_core', 't1', 'b');
    toggleSubtask('health_physical_core', 't1', 'a');
    expect(t1()).toMatchObject({ columnId: 'prog', completedAt: null });
  });

  it('a snooze never moves the card', () => {
    const { updateSubtask } = useTaskStore.getState();
    updateSubtask('health_physical_core', 't1', 'a', { snoozedUntilDayKey: '2026-10-06' });
    expect(t1()).toMatchObject({ columnId: 'todo', completedAt: null });
  });
});
