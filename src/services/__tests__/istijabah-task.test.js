// Hour of Acceptance task (2026-10-16).
//
// The contract this file pins: on a board seeded before 2026-10-16, the
// Jumuʻah task loses its istijabah routing tag and its last-hour du'a step; the
// new "Seek the Hour of Acceptance on Friday" task is inserted with that step
// (same `id`, same `done`) after three fresh ones; a Jumuʻah task whose only
// open step was the moved one is promoted to Done; a second run is a no-op.
//
// The second half is the drift guard: the migration's literal titles, tags and
// seq are copies of the seed (the boot path cannot import the lazy-loaded seed
// modules), so they are compared against the seed here.
//
// Approval gate: stages/implement-istijabah-hour-task-review.md

import { describe, it, expect } from 'vitest';
import { FAITH_SEED_TASKS } from '../../data/seed-tasks/faith-seed-tasks';
import {
  seedIstijabahTask,
  ISTIJABAH_BOARD,
  ISTIJABAH_JUMUAH_TASK,
  ISTIJABAH_TASK,
  ISTIJABAH_TAG,
  ISTIJABAH_MOVED_SUBTASK,
  ISTIJABAH_TASK_SEED,
  ISTIJABAH_ORDER,
} from '../migration';

const NOW = '2026-10-16T12:00:00.000Z';
const COLUMNS = [
  { id: 'col_todo', name: 'To Do' },
  { id: 'col_doing', name: 'In Progress' },
  { id: 'col_done', name: 'Done' },
];
const JUMUAH_STEPS = [
  'Make ghusl, use miswak, and apply perfume before Jumuʻah',
  'Walk to the masjid in the earliest hour',
  'Recite Surah al-Kahf on Friday',
  'Listen attentively to the khutbah — no speaking',
  'Increase salawat on the Prophet ﷺ on Friday',
];
const sub = (title, over = {}) => ({ id: `sub_${title.slice(0, 8)}`, title, done: false, ...over });

// The Salah Growth board as an operator who seeded before 2026-10-16 holds it.
const oldBoard = ({ done = [], duaDone = false, column = 'col_todo' } = {}) => [
  { id: 'tsk_other', title: 'Some other growth task', columnId: 'col_todo', order: 0, subtasks: [sub('x')] },
  {
    id: 'tsk_j', title: ISTIJABAH_JUMUAH_TASK, columnId: column, order: 1, completedAt: null,
    tags: ['salah', 'sunnah', 'jumuah', 'friday', 'transition:jumuah', ISTIJABAH_TAG],
    subtasks: [
      ...JUMUAH_STEPS.map((t) => sub(t, { done: done.includes(t) })),
      sub(ISTIJABAH_MOVED_SUBTASK, { id: 'sub_dua', done: duaDone }),
    ],
  },
];
const find = (tasks, title) => tasks.find((t) => t.title === title);

describe('Hour of Acceptance migration', () => {
  it('moves the du\'a step onto a new task, keeping its id and tick', () => {
    const { next, report } = seedIstijabahTask(oldBoard({ duaDone: true }), COLUMNS, NOW);
    const task = find(next, ISTIJABAH_TASK);
    expect(task.subtasks.map((s) => s.title)).toEqual(ISTIJABAH_ORDER[ISTIJABAH_TASK]);
    const moved = task.subtasks[3];
    expect(moved.id).toBe('sub_dua');
    expect(moved.done).toBe(true);
    expect(task.subtasks.slice(0, 3).every((s) => s.done === false)).toBe(true);
    expect(task).toMatchObject({
      projectId: ISTIJABAH_BOARD, columnId: `col_${ISTIJABAH_BOARD}_to_do`, seedOrder: 7, order: 2, completedAt: null,
    });
    expect(report).toMatchObject({ inserted: true, moved: true, untagged: true });
  });

  it('strips the routing tag and the step from the Jumuʻah task', () => {
    const { next } = seedIstijabahTask(oldBoard(), COLUMNS, NOW);
    const j = find(next, ISTIJABAH_JUMUAH_TASK);
    expect(j.tags).not.toContain(ISTIJABAH_TAG);
    expect(j.tags).toContain('transition:jumuah');
    expect(j.subtasks.map((s) => s.title)).toEqual(JUMUAH_STEPS);
  });

  it('promotes the Jumuʻah task when the moved step was its only open one', () => {
    const { next, report } = seedIstijabahTask(oldBoard({ done: JUMUAH_STEPS }), COLUMNS, NOW);
    const j = find(next, ISTIJABAH_JUMUAH_TASK);
    expect(j.columnId).toBe('col_done');
    expect(j.completedAt).toBeTruthy();
    expect(report.promoted).toBe(1);
  });

  it('never reopens or otherwise touches other tasks', () => {
    const board = oldBoard();
    const { next } = seedIstijabahTask(board, COLUMNS, NOW);
    expect(find(next, 'Some other growth task')).toBe(board[0]);
  });

  it('merges into an existing new-task row instead of duplicating it', () => {
    const board = [...oldBoard({ duaDone: true }), {
      id: 'tsk_new', title: ISTIJABAH_TASK, columnId: 'col_todo', order: 2, tags: [...ISTIJABAH_TASK_SEED.tags],
      subtasks: [sub(ISTIJABAH_MOVED_SUBTASK, { id: 'sub_fresh' })],
    }];
    const { next } = seedIstijabahTask(board, COLUMNS, NOW);
    expect(next.filter((t) => t.title === ISTIJABAH_TASK)).toHaveLength(1);
    const dua = find(next, ISTIJABAH_TASK).subtasks.filter((s) => s.title === ISTIJABAH_MOVED_SUBTASK);
    expect(dua).toHaveLength(1);
    expect(dua[0]).toMatchObject({ id: 'sub_fresh', done: true });
  });

  it('creates a fresh du\'a step when the operator had deleted it', () => {
    const board = oldBoard();
    board[1] = { ...board[1], subtasks: board[1].subtasks.slice(0, 5) };
    const { next } = seedIstijabahTask(board, COLUMNS, NOW);
    expect(find(next, ISTIJABAH_TASK).subtasks.map((s) => s.title)).toEqual(ISTIJABAH_ORDER[ISTIJABAH_TASK]);
  });

  it('is a no-op on a second run and on an empty board', () => {
    const { next: once } = seedIstijabahTask(oldBoard({ duaDone: true }), COLUMNS, NOW);
    expect(seedIstijabahTask(once, COLUMNS, NOW).next).toBe(once);
    const empty = [];
    expect(seedIstijabahTask(empty, COLUMNS, NOW).next).toBe(empty);
  });
});

describe('Hour of Acceptance seed drift guard', () => {
  const seeds = FAITH_SEED_TASKS[ISTIJABAH_BOARD];
  const seed = seeds.find((t) => t.title === ISTIJABAH_TASK);

  it('matches the seed task\'s steps, tags, priority and seq', () => {
    expect(seed.subtasks.map((s) => s.title)).toEqual(ISTIJABAH_ORDER[ISTIJABAH_TASK]);
    expect(seed.tags).toEqual(ISTIJABAH_TASK_SEED.tags);
    expect(seed.priority).toBe(ISTIJABAH_TASK_SEED.priority);
    expect(seed.seq).toBe(ISTIJABAH_TASK_SEED.seq);
  });

  it('the Jumuʻah seed no longer carries the tag or the step', () => {
    const j = seeds.find((t) => t.title === ISTIJABAH_JUMUAH_TASK);
    expect(j.tags).not.toContain(ISTIJABAH_TAG);
    expect(j.subtasks.map((s) => s.title)).toEqual(JUMUAH_STEPS);
  });
});
