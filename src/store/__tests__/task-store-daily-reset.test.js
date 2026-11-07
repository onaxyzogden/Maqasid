import { describe, it, expect, beforeEach } from 'vitest';

/** A Map-backed localStorage for node. */
function memoryStorage() {
  const m = new Map();
  return {
    get length() { return m.size; },
    key: (i) => [...m.keys()][i] ?? null,
    getItem: (k) => (m.has(k) ? m.get(k) : null),
    setItem: (k, v) => m.set(k, String(v)),
    removeItem: (k) => m.delete(k),
    clear: () => m.clear(),
  };
}

globalThis.localStorage = memoryStorage();
const { useTaskStore } = await import('../task-store');
const { useProjectStore } = await import('../project-store');

const COLUMNS = [
  { id: 'col_todo', name: 'To Do' },
  { id: 'col_doing', name: 'In Progress' },
  { id: 'col_done', name: 'Done' },
];

const PRAYER_BOARD = 'prayer_fajr_before';
const WORK_BOARD = 'work_ops_core';

function task(overrides = {}) {
  return {
    id: 'tsk_1',
    title: 'Pray the two rakʿah before Fajr',
    columnId: 'col_todo',
    completedAt: null,
    subtasks: [
      { id: 'st_1', title: 'Make wudu', done: false },
      { id: 'st_2', title: 'Face the qiblah', done: false },
    ],
    ...overrides,
  };
}

function seed(boards) {
  useProjectStore.setState({
    projects: Object.keys(boards).map((id) => ({ id, name: id, columns: COLUMNS })),
  });
  useTaskStore.setState({ tasksByProject: boards });
}

const read = (board) => useTaskStore.getState().tasksByProject[board][0];

beforeEach(() => {
  localStorage.clear();
});

describe('resetDailyCadenceTasks on a prayer board', () => {
  it('clears a done step', () => {
    seed({ [PRAYER_BOARD]: [task({ subtasks: [{ id: 'st_1', done: true }] })] });
    useTaskStore.getState().resetDailyCadenceTasks();
    expect(read(PRAYER_BOARD).subtasks[0].done).toBe(false);
  });

  it('clears a "Doesn\'t apply" step', () => {
    seed({ [PRAYER_BOARD]: [task({ subtasks: [{ id: 'st_1', done: false, notApplicable: true }] })] });
    useTaskStore.getState().resetDailyCadenceTasks();
    expect(read(PRAYER_BOARD).subtasks[0].notApplicable).toBeFalsy();
  });

  it('clears a snoozed step and a snoozed task', () => {
    seed({
      [PRAYER_BOARD]: [task({
        snoozedUntilDayKey: '2026-11-08',
        subtasks: [{ id: 'st_1', done: false, snoozedUntilDayKey: '2026-11-08' }],
      })],
    });
    useTaskStore.getState().resetDailyCadenceTasks();
    expect(read(PRAYER_BOARD).subtasks[0].snoozedUntilDayKey).toBeFalsy();
    expect(read(PRAYER_BOARD).snoozedUntilDayKey).toBeFalsy();
  });

  it('moves a Done task back to the first column and clears completedAt', () => {
    seed({ [PRAYER_BOARD]: [task({ columnId: 'col_done', completedAt: '2026-11-06T18:00:00.000Z' })] });
    useTaskStore.getState().resetDailyCadenceTasks();
    expect(read(PRAYER_BOARD).columnId).toBe('col_todo');
    expect(read(PRAYER_BOARD).completedAt).toBeNull();
  });

  it('clears completedAt on a task that carries it outside the Done column', () => {
    seed({ [PRAYER_BOARD]: [task({ columnId: 'col_doing', completedAt: '2026-11-06T18:00:00.000Z' })] });
    useTaskStore.getState().resetDailyCadenceTasks();
    expect(read(PRAYER_BOARD).completedAt).toBeNull();
    expect(read(PRAYER_BOARD).columnId).toBe('col_todo');
  });

  it('persists the reset board to storage', () => {
    seed({ [PRAYER_BOARD]: [task({ subtasks: [{ id: 'st_1', done: true }] })] });
    useTaskStore.getState().resetDailyCadenceTasks();
    const stored = JSON.parse(localStorage.getItem(`bbiz_tasks_${PRAYER_BOARD}`));
    expect(stored[0].subtasks[0].done).toBe(false);
  });
});

describe('resetDailyCadenceTasks on a non-daily board', () => {
  it('leaves a Done work task in Done with its steps ticked', () => {
    seed({
      [WORK_BOARD]: [task({
        columnId: 'col_done',
        completedAt: '2026-11-06T18:00:00.000Z',
        subtasks: [{ id: 'st_1', done: true, notApplicable: false }],
      })],
    });
    useTaskStore.getState().resetDailyCadenceTasks();
    expect(read(WORK_BOARD).columnId).toBe('col_done');
    expect(read(WORK_BOARD).completedAt).toBe('2026-11-06T18:00:00.000Z');
    expect(read(WORK_BOARD).subtasks[0].done).toBe(true);
  });
});

describe('resetDailyCadenceTasks on a persisted board that is not loaded in memory', () => {
  it('resets the stored prayer board when the app has not opened that board yet', () => {
    seed({ [WORK_BOARD]: [task()] });
    localStorage.setItem('bbiz_tasks_prayer_dhuhr_before', JSON.stringify([
      task({ columnId: 'col_done', completedAt: '2026-11-06T18:00:00.000Z', subtasks: [{ id: 'st_1', done: true }, { id: 'st_2', notApplicable: true }] }),
    ]));
    useTaskStore.getState().resetDailyCadenceTasks();
    const stored = JSON.parse(localStorage.getItem('bbiz_tasks_prayer_dhuhr_before'));
    expect(stored[0].subtasks[0].done).toBe(false);
    expect(stored[0].subtasks[1].notApplicable).toBeFalsy();
    expect(stored[0].completedAt).toBeNull();
    expect(stored[0].columnId).not.toBe('col_done');
  });

  it('leaves a stored non-daily board alone', () => {
    seed({});
    localStorage.setItem('bbiz_tasks_wealth_zakat', JSON.stringify([task({ columnId: 'col_done', subtasks: [{ id: 'st_1', done: true }] })]));
    useTaskStore.getState().resetDailyCadenceTasks();
    const stored = JSON.parse(localStorage.getItem('bbiz_tasks_wealth_zakat'));
    expect(stored[0].columnId).toBe('col_done');
    expect(stored[0].subtasks[0].done).toBe(true);
  });
});
