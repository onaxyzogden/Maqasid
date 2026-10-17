// Task-order audit, pass 3 (2026-10-06): three within-task re-orders.
// Pins the migration contract (ids and ticks travel, operator rows kept, second
// run is a no-op) and deep-equals AUDIT_V3_ORDER against the seeds, because the
// table is a hardcoded literal (the boot path cannot import the seed modules).
//
// Approval gate: stages/implement-task-order-audit-pass-3-review.md

import { describe, it, expect } from 'vitest';
import { FAITH_SEED_TASKS } from '../../data/seed-tasks/faith-seed-tasks';
import { HEALTH_SEED_TASKS } from '../../data/seed-tasks/health-seed-tasks';
import { ENVIRONMENT_SEED_TASKS } from '../../data/seed-tasks/environment-seed-tasks';
import { AUDIT_V3_ORDER, seedOrderAuditV3 } from '../migration';

const SEEDS = { ...FAITH_SEED_TASKS, ...HEALTH_SEED_TASKS, ...ENVIRONMENT_SEED_TASKS };

// The pre-2026-10-06 orders, as stored on an existing board.
const OLD_PERM = { health_social_core: [1, 0, 2, 3], faith_shahada_core: [0, 2, 1, 3], environment_sourcing_core: [0, 2, 3, 1] };
const oldBoards = () => Object.fromEntries(Object.entries(AUDIT_V3_ORDER).map(([boardId, table]) => {
  const [[title, order]] = Object.entries(table);
  return [boardId, [
    { id: 'other', title: 'Some other task', subtasks: [{ id: 'x', title: 'x', done: false }] },
    { id: `tsk_${boardId}`, title, subtasks: OLD_PERM[boardId].map((k) => ({ id: `${boardId}#${k}`, title: order[k], done: false })) },
  ]];
}));
const titlesOf = (tasks) => tasks[1].subtasks.map((s) => s.title);

describe('seedOrderAuditV3', () => {
  it('lands each task on the curated order', () => {
    const next = seedOrderAuditV3(oldBoards());
    for (const [boardId, table] of Object.entries(AUDIT_V3_ORDER)) {
      expect(titlesOf(next[boardId])).toEqual(Object.values(table)[0]);
    }
  });

  it('keeps every row object, so ids and ticks travel', () => {
    const boards = oldBoards();
    const initiate = boards.health_social_core[1].subtasks[0];
    initiate.done = true;
    const next = seedOrderAuditV3(boards);
    expect(next.health_social_core[1].subtasks[1]).toBe(initiate);
    expect(next.health_social_core[0]).toBe(boards.health_social_core[0]);
  });

  it('appends operator-added subtasks at the end', () => {
    const boards = oldBoards();
    boards.faith_shahada_core[1].subtasks.splice(1, 0, { id: 'mine', title: 'My own step', done: false });
    expect(titlesOf(seedOrderAuditV3(boards).faith_shahada_core).at(-1)).toBe('My own step');
  });

  it('is idempotent and ignores boards that are not stored', () => {
    const first = seedOrderAuditV3(oldBoards());
    expect(seedOrderAuditV3({ ...oldBoards(), ...first })).toEqual({});
    expect(seedOrderAuditV3({})).toEqual({});
  });
});

describe('pass-3 drift guard', () => {
  for (const [boardId, table] of Object.entries(AUDIT_V3_ORDER)) {
    for (const [title, order] of Object.entries(table)) {
      it(`${boardId} / "${title.slice(0, 40)}…" matches the seed`, () => {
        const task = SEEDS[boardId].find((t) => t.title === title);
        expect(task, 'task missing from the seed').toBeDefined();
        expect(task.subtasks.map((s) => s.title)).toEqual(order);
      });
    }
  }
});
