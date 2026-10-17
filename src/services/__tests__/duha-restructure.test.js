// Duha level restructure (2026-10-05).
//
// The contract this file pins: "Learn the time window for Duha prayer" MOVES from
// the Excellence task to the head of the Growth task carrying its own `id` and
// `done`; the retired "3 times this week" row goes only when it holds no
// progress; nothing the operator added is ever dropped; a second run is a no-op.
//
// The second half is the drift guard: DUHA_GROWTH_ORDER is a hardcoded copy of
// the seed order (the boot path cannot import the lazy-loaded seed modules), so
// it is deep-equalled against the seed here.
//
// Approval gate: stages/implement-duha-restructure-review.md

import { describe, it, expect } from 'vitest';
import { FAITH_SEED_TASKS } from '../../data/seed-tasks/faith-seed-tasks';
import {
  restructureDuhaSubtasks,
  DUHA_GROWTH_BOARD,
  DUHA_EXCELLENCE_BOARD,
  DUHA_GROWTH_TASK,
  DUHA_EXCELLENCE_TASK,
  DUHA_MOVED_SUBTASK,
  DUHA_RETIRED_SUBTASK,
  DUHA_GROWTH_ORDER,
} from '../migration';

const INTENT = 'Set the intention before each Duha as sadaqah for every joint';
const PRAY5 = "Pray 2 rak'at of Duha at least 5 days this week";
const BUILD4 = "Build toward 4 rak'at of Duha consistently";
const ANCHOR = 'Anchor Duha to a fixed time block in your daily schedule';
const DAILY = 'Gradually increase to daily practice';

const sub = (title, over = {}) => ({ id: `sub_${title.slice(0, 6)}`, title, done: false, ...over });

// Boards as an operator who seeded before 2026-10-05 holds them.
const oldGrowth = (over = {}) => [
  { id: 'tsk_other', title: 'Some other growth task', subtasks: [sub('x')] },
  {
    id: 'tsk_g', title: DUHA_GROWTH_TASK,
    subtasks: [sub(PRAY5, over.pray5), sub(INTENT), sub(BUILD4), sub(ANCHOR), ...(over.extra || [])],
  },
];
const oldExcellence = (over = {}) => [
  {
    id: 'tsk_e', title: DUHA_EXCELLENCE_TASK,
    subtasks: [
      sub(DUHA_MOVED_SUBTASK, { id: 'sub_learn', ...over.learn }),
      sub(DUHA_RETIRED_SUBTASK, over.three),
      sub(DAILY),
      ...(over.extra || []),
    ],
  },
];

const titlesOf = (tasks, title) => tasks.find((t) => t.title === title).subtasks.map((s) => s.title);

describe('restructureDuhaSubtasks', () => {
  it('moves the learn step to the head of Growth and retires the 3×/week step', () => {
    const { growthNext, excellenceNext, report } = restructureDuhaSubtasks(oldGrowth(), oldExcellence());
    expect(titlesOf(growthNext, DUHA_GROWTH_TASK)).toEqual(DUHA_GROWTH_ORDER[DUHA_GROWTH_TASK]);
    expect(titlesOf(excellenceNext, DUHA_EXCELLENCE_TASK)).toEqual([DAILY]);
    expect(report).toMatchObject({ moved: true, retired: true, aligned: true });
  });

  it('carries the moved row\'s id and done flag', () => {
    const { growthNext } = restructureDuhaSubtasks(oldGrowth(), oldExcellence({ learn: { done: true } }));
    const learn = growthNext.find((t) => t.title === DUHA_GROWTH_TASK).subtasks[0];
    expect(learn).toMatchObject({ id: 'sub_learn', title: DUHA_MOVED_SUBTASK, done: true });
  });

  it('re-orders even when Growth subtasks are already done, keeping each row object', () => {
    const growth = oldGrowth({ pray5: { done: true, id: 'sub_pray5' } });
    const pray5Row = growth[1].subtasks[0];
    const { growthNext } = restructureDuhaSubtasks(growth, oldExcellence());
    const subs = growthNext.find((t) => t.title === DUHA_GROWTH_TASK).subtasks;
    expect(subs.map((s) => s.title)).toEqual(DUHA_GROWTH_ORDER[DUHA_GROWTH_TASK]);
    expect(subs[2]).toBe(pray5Row);
  });

  it('keeps a done 3×/week row rather than erasing the record', () => {
    const { excellenceNext, report } = restructureDuhaSubtasks(oldGrowth(), oldExcellence({ three: { done: true } }));
    expect(titlesOf(excellenceNext, DUHA_EXCELLENCE_TASK)).toEqual([DUHA_RETIRED_SUBTASK, DAILY]);
    expect(report.keptDone).toEqual([DUHA_RETIRED_SUBTASK]);
  });

  it('never drops subtasks the operator added on either task', () => {
    const { growthNext, excellenceNext } = restructureDuhaSubtasks(
      oldGrowth({ extra: [sub('my own growth step')] }),
      oldExcellence({ extra: [sub('my own excellence step')] }),
    );
    expect(titlesOf(growthNext, DUHA_GROWTH_TASK).at(-1)).toBe('my own growth step');
    expect(titlesOf(excellenceNext, DUHA_EXCELLENCE_TASK)).toEqual([DAILY, 'my own excellence step']);
  });

  it('merges into an existing Growth learn row instead of duplicating it', () => {
    const growth = oldGrowth({ extra: [sub(DUHA_MOVED_SUBTASK, { id: 'sub_existing' })] });
    const { growthNext, report } = restructureDuhaSubtasks(growth, oldExcellence({ learn: { done: true } }));
    const subs = growthNext.find((t) => t.title === DUHA_GROWTH_TASK).subtasks;
    expect(subs.filter((s) => s.title === DUHA_MOVED_SUBTASK)).toHaveLength(1);
    expect(subs[0]).toMatchObject({ id: 'sub_existing', done: true });
    expect(report.merged).toBe(true);
  });

  it('without a stored Growth task, keeps a done learn row and drops an untouched one', () => {
    const done = restructureDuhaSubtasks(null, oldExcellence({ learn: { done: true } }));
    expect(titlesOf(done.excellenceNext, DUHA_EXCELLENCE_TASK)).toEqual([DUHA_MOVED_SUBTASK, DAILY]);
    const untouched = restructureDuhaSubtasks(null, oldExcellence());
    expect(titlesOf(untouched.excellenceNext, DUHA_EXCELLENCE_TASK)).toEqual([DAILY]);
  });

  it('creates the learn row on Growth when Excellence was never seeded', () => {
    const { growthNext, excellenceNext } = restructureDuhaSubtasks(oldGrowth(), null);
    expect(titlesOf(growthNext, DUHA_GROWTH_TASK)).toEqual(DUHA_GROWTH_ORDER[DUHA_GROWTH_TASK]);
    expect(excellenceNext).toBeNull();
  });

  it('is idempotent — a second run returns the same references', () => {
    const first = restructureDuhaSubtasks(oldGrowth(), oldExcellence());
    const second = restructureDuhaSubtasks(first.growthNext, first.excellenceNext);
    expect(second.growthNext).toBe(first.growthNext);
    expect(second.excellenceNext).toBe(first.excellenceNext);
  });

  it('leaves unrelated tasks untouched', () => {
    const growth = oldGrowth();
    const { growthNext } = restructureDuhaSubtasks(growth, oldExcellence());
    expect(growthNext[0]).toBe(growth[0]);
  });
});

describe('Duha seed drift guard', () => {
  const seedTitles = (board, title) =>
    FAITH_SEED_TASKS[board].find((t) => t.title === title).subtasks.map((s) => s.title);

  it('DUHA_GROWTH_ORDER matches the Growth seed exactly', () => {
    expect(seedTitles(DUHA_GROWTH_BOARD, DUHA_GROWTH_TASK)).toEqual(DUHA_GROWTH_ORDER[DUHA_GROWTH_TASK]);
  });

  it('the Excellence seed no longer carries the moved or retired steps', () => {
    const titles = seedTitles(DUHA_EXCELLENCE_BOARD, DUHA_EXCELLENCE_TASK);
    expect(titles).not.toContain(DUHA_MOVED_SUBTASK);
    expect(titles).not.toContain(DUHA_RETIRED_SUBTASK);
  });
});
