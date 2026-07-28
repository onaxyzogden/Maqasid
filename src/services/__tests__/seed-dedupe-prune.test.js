// Prune of tasks whose seed entry was deleted as a duplicate (2026-07-27).
//
// The contract this file pins: a pristine seeded copy is deleted, a copy the
// operator has worked on is NEVER deleted. The second half matters more — a
// missed prune leaves a bare orphan the operator can delete by hand, a wrong
// prune destroys work that cannot be recovered (description/sources/tier are
// stripped from storage by design, so nothing can rebuild a pruned task's
// completion state).
//
// Approval gate: stages/implement-ummah-dedupe-review.md
// Rationale: wiki/decisions/2026-07-27-milos-ummah-task-dedupe.md

import { describe, it, expect } from 'vitest';
import { pruneRemovedSeedTasks } from '../migration';

const BOARD = 'ummah_community_growth';
const TODO = `col_${BOARD}_to_do`;
const DOOMED = 'Build a community dispute resolution (sulh) mechanism';
const KEEPER = 'Establish a community dispute resolution (sulh) process — prevent conflicts from escalating';

// A pristine seeded task, exactly as backfillAndStripSeeds leaves it.
const seeded = (title, over = {}) => ({
  id: `tsk_${title.slice(0, 6)}`,
  projectId: BOARD,
  columnId: TODO,
  title,
  notes: '',
  dueDate: null,
  completedAt: null,
  subtasks: [{ id: 's1', title: 'a' }, { id: 's2', title: 'b' }],
  checklist: [],
  attachments: [],
  seedOrder: 0,
  order: 0,
  ...over,
});

const titles = (tasks) => tasks.map((t) => t.title);

describe('pruneRemovedSeedTasks', () => {
  it('removes an untouched duplicate and leaves its survivor alone', () => {
    const { next, removed, kept } = pruneRemovedSeedTasks(
      [seeded(DOOMED), seeded(KEEPER)], [DOOMED], BOARD
    );
    expect(titles(next)).toEqual([KEEPER]);
    expect(removed).toEqual([DOOMED]);
    expect(kept).toEqual([]);
  });

  it('never touches a task that is not in the removed list', () => {
    const tasks = [seeded(KEEPER), seeded('Something the operator wrote')];
    const { next, removed } = pruneRemovedSeedTasks(tasks, [DOOMED], BOARD);
    expect(next).toBe(tasks); // same reference — caller skips the write
    expect(removed).toEqual([]);
  });

  // Each of these is operator input. All of them must veto the delete.
  const touched = [
    ['a ticked subtask', { subtasks: [{ id: 's1', title: 'a', done: true }] }],
    ['a not-applicable subtask', { subtasks: [{ id: 's1', title: 'a', notApplicable: true }] }],
    ['a snoozed subtask', { subtasks: [{ id: 's1', title: 'a', snoozedUntilDayKey: '2026-07-28' }] }],
    ['a completion', { completedAt: '2026-07-20T00:00:00.000Z' }],
    ['a move out of To Do', { columnId: `col_${BOARD}_done` }],
    ['a note', { notes: 'started this with the masjid committee' }],
    ['a due date', { dueDate: '2026-08-01' }],
    ['a checklist item', { checklist: [{ id: 'c1', text: 'ring Imam', done: false }] }],
    ['an attachment', { attachments: [{ id: 'a1', name: 'draft.pdf' }] }],
  ];

  for (const [what, over] of touched) {
    it(`keeps a duplicate carrying ${what}`, () => {
      const { next, removed, kept } = pruneRemovedSeedTasks(
        [seeded(DOOMED, over), seeded(KEEPER)], [DOOMED], BOARD
      );
      expect(titles(next)).toEqual([DOOMED, KEEPER]);
      expect(removed).toEqual([]);
      expect(kept).toEqual([DOOMED]);
      expect(next).toHaveLength(2);
    });
  }

  it('prunes the untouched copies and keeps the touched one in the same pass', () => {
    const other = 'Establish a community education institution (halaqa or weekend school)';
    const { next, removed, kept } = pruneRemovedSeedTasks(
      [seeded(DOOMED, { notes: 'in progress' }), seeded(other), seeded(KEEPER)],
      [DOOMED, other],
      BOARD
    );
    expect(titles(next)).toEqual([DOOMED, KEEPER]);
    expect(removed).toEqual([other]);
    expect(kept).toEqual([DOOMED]);
  });

  it('is a no-op on empty or malformed input', () => {
    expect(pruneRemovedSeedTasks([], [DOOMED], BOARD).removed).toEqual([]);
    expect(pruneRemovedSeedTasks(null, [DOOMED], BOARD).next).toBe(null);
    const tasks = [seeded(DOOMED)];
    expect(pruneRemovedSeedTasks(tasks, [], BOARD).next).toBe(tasks);
  });
});
