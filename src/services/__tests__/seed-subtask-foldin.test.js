// Re-ordering pass that folds a seed subtask into its curated position on an
// already-seeded board (2026-07-27).
//
// The contract this file pins: the rebuild ADDS and MOVES, it never loses. Every
// stored row survives with its own `id` and `done` flag — including rows the
// operator created that the seed knows nothing about, and including duplicate
// titles. A task carrying completed work is left alone entirely.
//
// Approval gate: stages/implement-subtask-foldin-review.md
// Rationale: wiki/decisions/2026-07-27-milos-subtask-foldin.md

import { describe, it, expect } from 'vitest';
import { alignSubtaskOrder } from '../migration';

const TASK = 'Establish community education — launch a regular halaqa or weekend Islamic school programme';
const FOLDED = 'Design a structured curriculum with clear learning outcomes';

const ORDER = {
  [TASK]: ['assess gaps', 'recruit teacher', FOLDED, 'secure venue'],
};

const sub = (title, over = {}) => ({ id: `sub_${title.slice(0, 4)}`, title, done: false, ...over });

const task = (subtasks) => ({ id: 'tsk_edu', title: TASK, subtasks });

const titles = (t) => t.subtasks.map((s) => s.title);

describe('alignSubtaskOrder', () => {
  it('inserts a missing seed subtask at its curated index', () => {
    const before = task([sub('assess gaps'), sub('recruit teacher'), sub('secure venue')]);
    const { next, aligned } = alignSubtaskOrder([before], ORDER);
    expect(titles(next[0])).toEqual(['assess gaps', 'recruit teacher', FOLDED, 'secure venue']);
    expect(aligned).toEqual([TASK]);
  });

  it('reuses the stored row object, so its id and every other field travel with it', () => {
    const original = sub('recruit teacher', { id: 'sub_original', snoozedUntilDayKey: '2026-07-28' });
    const before = task([sub('assess gaps'), original, sub('secure venue')]);
    const { next } = alignSubtaskOrder([before], ORDER);
    // Same object, not a copy — id, done and any operator state are untouchable.
    expect(next[0].subtasks[1]).toBe(original);
    expect(next[0].subtasks.find((s) => s.title === FOLDED).id).toMatch(/^sub_/);
  });

  it('appends an operator-created subtask at the end, in stored order', () => {
    const before = task([
      sub('assess gaps'),
      sub('ring the masjid committee'),
      sub('recruit teacher'),
      sub('book the projector'),
      sub('secure venue'),
    ]);
    const { next } = alignSubtaskOrder([before], ORDER);
    expect(titles(next[0])).toEqual([
      'assess gaps', 'recruit teacher', FOLDED, 'secure venue',
      'ring the masjid committee', 'book the projector',
    ]);
  });

  it('never drops a duplicate title — the extra copy survives as a trailing row', () => {
    const before = task([sub('assess gaps'), sub('assess gaps', { id: 'sub_dup' }), sub('secure venue')]);
    const { next } = alignSubtaskOrder([before], ORDER);
    expect(next[0].subtasks).toHaveLength(5);
    expect(next[0].subtasks.filter((s) => s.title === 'assess gaps')).toHaveLength(2);
    expect(next[0].subtasks.some((s) => s.id === 'sub_dup')).toBe(true);
  });

  it('skips a task carrying a completed subtask and reports it', () => {
    const before = task([sub('assess gaps', { done: true }), sub('secure venue')]);
    const { next, aligned, skipped } = alignSubtaskOrder([before], ORDER);
    expect(next[0]).toBe(before); // untouched
    expect(aligned).toEqual([]);
    expect(skipped).toEqual([TASK]);
  });

  it('returns the same array reference when every listed task is already aligned', () => {
    const tasks = [task([sub('assess gaps'), sub('recruit teacher'), sub(FOLDED), sub('secure venue')])];
    expect(alignSubtaskOrder(tasks, ORDER).next).toBe(tasks);
  });

  it('leaves tasks absent from the order table alone', () => {
    const tasks = [{ id: 'tsk_other', title: 'Something the operator wrote', subtasks: [sub('z'), sub('a')] }];
    const { next, aligned } = alignSubtaskOrder(tasks, ORDER);
    expect(next).toBe(tasks);
    expect(aligned).toEqual([]);
  });

  it('is a no-op on empty or malformed input', () => {
    expect(alignSubtaskOrder([], ORDER).next).toEqual([]);
    expect(alignSubtaskOrder(null, ORDER).next).toBe(null);
    const tasks = [task([sub('assess gaps')])];
    expect(alignSubtaskOrder(tasks, null).next).toBe(tasks);
  });

  it('creates every row when the stored task has no subtasks at all', () => {
    const before = { id: 'tsk_edu', title: TASK };
    const { next } = alignSubtaskOrder([before], ORDER);
    expect(titles(next[0])).toEqual(ORDER[TASK]);
    expect(next[0].subtasks.every((s) => s.done === false && s.id.startsWith('sub_'))).toBe(true);
  });
});
