// Node split (2026-10-17).
//
// The contract this file pins, on boards seeded before 2026-10-17:
// - the Ramadan task is renamed to its iftar title and hands its taraweeh and
//   Laylat al-Qadr steps to two new tasks, each step keeping its `id` and tick;
// - the Travel task hands its return du'a to a new return-home task, which
//   gains two fresh steps around it;
// - routing tags that moved are stripped from the old tasks;
// - a task whose remaining steps are all done is promoted to Done;
// - nothing else changes, and a second run is a no-op.
//
// The second half is the drift guard: NODE_SPLIT is a literal copy of the seed
// (the boot path cannot import the lazy-loaded seed modules).
//
// Approval gate: stages/implement-node-own-tasks-review.md

import { describe, it, expect } from 'vitest';
import { FAITH_SEED_TASKS } from '../../data/seed-tasks/faith-seed-tasks';
import {
  applyNodeSplit,
  NODE_SPLIT,
  RAMADAN_OLD_TITLE,
  RAMADAN_IFTAR_TASK,
  TARAWEEH_TASK,
  LAYLAT_AL_QADR_TASK,
  TRAVEL_TASK,
  RETURN_TASK,
} from '../migration';

const NOW = '2026-10-17T12:00:00.000Z';
const COLUMNS = [{ id: 'col_todo', name: 'To Do' }, { id: 'col_doing', name: 'In Progress' }, { id: 'col_done', name: 'Done' }];
const sub = (title, over = {}) => ({ id: `sub_${title.slice(0, 10)}`, title, done: false, ...over });
const find = (tasks, title) => tasks.find((t) => t.title === title);

const IFTAR_STEPS = ["Learn the du'a for breaking the fast", 'Make the iftar duʻaʻ at the moment of breaking the fast'];
const TARAWEEH_STEP = 'Stand the night with taraweeh in faith and seeking reward';
const LQ_STEP = 'Seek Laylat al-Qadr in the last ten nights with the Prophet’s ﷺ duʻaʻ';
const DEPART_STEPS = [
  'Recite the duʻaʻ of travel on mounting the conveyance',
  'Say takbir at every ascent and tasbih at every descent',
  'Shorten Dhuhr / Asr / Isha to two rakʿat (qasr)',
  'Combine prayers (jamʻ) when the journey requires it',
];
const RETURN_STEP = 'Recite the duʻaʻ of return on coming home';

const oldSiyam = ({ iftarDone = false, taraweehDone = false } = {}) => [
  { id: 'tsk_other', title: 'Take suhur — the pre-dawn meal of barakah', columnId: 'col_todo', order: 0, subtasks: [sub('x')] },
  {
    id: 'tsk_ram', title: RAMADAN_OLD_TITLE, columnId: 'col_todo', order: 1, completedAt: null,
    tags: ['siyam', 'sunnah', 'ramadan', 'transition:maghrib-iftar', 'transition:isha-taraweeh', 'transition:laylat-al-qadr'],
    subtasks: [
      ...IFTAR_STEPS.map((t) => sub(t, { done: iftarDone })),
      sub(TARAWEEH_STEP, { id: 'sub_tar', done: taraweehDone }),
      sub(LQ_STEP, { id: 'sub_lq' }),
    ],
  },
];
const oldSalah = ({ returnDone = false } = {}) => [
  {
    id: 'tsk_trv', title: TRAVEL_TASK, columnId: 'col_todo', order: 0, completedAt: null,
    tags: ['salah', 'sunnah', 'travel', 'qasr', 'transition:traveler-departure', 'transition:traveler-arrival'],
    subtasks: [...DEPART_STEPS.map((t) => sub(t)), sub(RETURN_STEP, { id: 'sub_ret', done: returnDone })],
  },
];
const run = (tasks, board) => applyNodeSplit(tasks, NODE_SPLIT[board], board, COLUMNS, NOW);

describe('node split — Ramadan', () => {
  it('renames the task, strips the moved tags and keeps the iftar steps', () => {
    const { next } = run(oldSiyam(), 'faith_siyam_core');
    expect(find(next, RAMADAN_OLD_TITLE)).toBeUndefined();
    const iftar = find(next, RAMADAN_IFTAR_TASK);
    expect(iftar.id).toBe('tsk_ram');
    expect(iftar.subtasks.map((s) => s.title)).toEqual(IFTAR_STEPS);
    expect(iftar.tags).toEqual(['siyam', 'sunnah', 'ramadan', 'transition:maghrib-iftar']);
  });

  it('moves the taraweeh and Laylat al-Qadr steps with their ids and ticks', () => {
    const { next } = run(oldSiyam({ taraweehDone: true }), 'faith_siyam_core');
    expect(find(next, TARAWEEH_TASK).subtasks).toEqual([{ id: 'sub_tar', title: TARAWEEH_STEP, done: true }]);
    expect(find(next, LAYLAT_AL_QADR_TASK).subtasks.map((s) => s.id)).toEqual(['sub_lq']);
    // A one-step task whose step was already ticked arrives finished.
    expect(find(next, TARAWEEH_TASK)).toMatchObject({ seedOrder: 6, columnId: 'col_done' });
    expect(find(next, LAYLAT_AL_QADR_TASK)).toMatchObject({ seedOrder: 7, columnId: 'col_faith_siyam_core_to_do' });
  });

  it('promotes tasks left with only done steps', () => {
    const { next } = run(oldSiyam({ iftarDone: true, taraweehDone: true }), 'faith_siyam_core');
    expect(find(next, RAMADAN_IFTAR_TASK).columnId).toBe('col_done');
    expect(find(next, TARAWEEH_TASK).columnId).toBe('col_done');
    expect(find(next, LAYLAT_AL_QADR_TASK).completedAt).toBeNull();
  });

  it('leaves other tasks untouched and is a no-op the second time', () => {
    const board = oldSiyam();
    const { next } = run(board, 'faith_siyam_core');
    expect(next[0]).toBe(board[0]);
    expect(run(next, 'faith_siyam_core').next).toBe(next);
  });
});

describe('node split — Travel', () => {
  it('moves the return du\'a between two fresh steps, keeping its tick', () => {
    const { next } = run(oldSalah({ returnDone: true }), 'faith_salah_growth');
    const ret = find(next, RETURN_TASK);
    expect(ret.subtasks.map((s) => s.title)).toEqual(NODE_SPLIT.faith_salah_growth.tasks[0].steps);
    expect(ret.subtasks[1]).toMatchObject({ id: 'sub_ret', done: true });
    expect(ret.subtasks[0].done).toBe(false);
    const trv = find(next, TRAVEL_TASK);
    expect(trv.subtasks.map((s) => s.title)).toEqual(DEPART_STEPS);
    expect(trv.tags).not.toContain('transition:traveler-arrival');
  });

  it('does nothing on an empty board', () => {
    const empty = [];
    expect(run(empty, 'faith_salah_growth').next).toBe(empty);
  });
});

describe('node split drift guard', () => {
  const seedTask = (board, title) => FAITH_SEED_TASKS[board].find((t) => t.title === title);

  for (const [board, spec] of Object.entries(NODE_SPLIT)) {
    for (const nt of spec.tasks) {
      it(`${board} / "${nt.title}" matches the seed`, () => {
        const seed = seedTask(board, nt.title);
        expect(seed.subtasks.map((s) => s.title)).toEqual(nt.steps);
        expect(seed.tags).toEqual(nt.tags);
        expect(seed.priority).toBe(nt.priority);
        expect(seed.seq).toBe(nt.seq);
      });
    }
    it(`${board}: renamed tasks exist under the new title only, moved tags and steps are gone`, () => {
      for (const { from, to } of spec.renames) {
        expect(seedTask(board, from)).toBeUndefined();
        expect(seedTask(board, to)).toBeDefined();
      }
      for (const { task, tags } of spec.untag) {
        for (const tag of tags) expect(seedTask(board, task).tags).not.toContain(tag);
      }
      for (const mv of spec.moves) {
        expect(seedTask(board, mv.from).subtasks.map((s) => s.title)).not.toContain(mv.subtask);
      }
    });
  }
});
