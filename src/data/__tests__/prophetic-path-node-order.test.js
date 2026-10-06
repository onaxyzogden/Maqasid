import { describe, it, expect } from 'vitest';
import { buildTasksForNode, TOD_SUBMODULES } from '../prophetic-path-submodules';
import { FAITH_SEED_TASKS } from '../seed-tasks/faith-seed-tasks';
import { INTELLECT_SEED_TASKS } from '../seed-tasks/intellect-seed-tasks';
import { WEALTH_SEED_TASKS } from '../seed-tasks/wealth-seed-tasks';

// Regression (2026-10-06, audit rule R4): node pools sorted by level → seed
// priority → due date, so within a level `priority` scrambled every board's
// curated chain — Morning showed "Close the morning by praying Dhuhr" (seq 7)
// before "Learn the conditions that invalidate salah" (seq 2). The order is now
// level → operator due date → board (node's submodule order) → seedOrder.

const SEEDS = { ...FAITH_SEED_TASKS, ...INTELLECT_SEED_TASKS, ...WEALTH_SEED_TASKS };
const boardIds = Object.keys(SEEDS).filter((id) => id.split('_').length >= 3);
const PROJECTS = boardIds.map((id) => {
  const [pillar, mod] = id.split('_');
  return { id, moduleId: `${pillar}-${mod}`, name: id };
});
// Stored boards carry `seedOrder` (= seed `seq`); array order is deliberately
// reversed so the test cannot pass by accident on insertion order.
const stored = () => Object.fromEntries(boardIds.map((id) => [
  id,
  SEEDS[id].map((t, i) => ({
    id: `${id}#${i}`, title: t.title, priority: t.priority, tags: t.tags || [],
    subtasks: t.subtasks, columnId: 'todo', seedOrder: t.seq ?? i,
  })).reverse(),
]));
const pool = (tasks, nodeId = 'morning') => buildTasksForNode(nodeId, PROJECTS, tasks, { limit: 1000 });
const seqOf = (row) => SEEDS[row.projectId].find((t) => t.title === row.title).seq;

describe('node order follows the curated chain', () => {
  it('never shows two tasks from one board out of seq order (every non-prayer node)', () => {
    const PRAYER = new Set(['fajr', 'dhuhr', 'asr', 'maghrib', 'isha', 'tahajjud']);
    const tasks = stored();
    const broken = [];
    for (const nodeId of Object.keys(TOD_SUBMODULES).filter((n) => !PRAYER.has(n))) {
      const rows = pool(tasks, nodeId);
      rows.forEach((a, i) => rows.slice(i + 1).forEach((b) => {
        if (a.projectId === b.projectId && seqOf(a) > seqOf(b)) broken.push(`${nodeId}: "${a.title}" before "${b.title}"`);
      }));
    }
    expect(broken).toEqual([]);
  });

  it('puts Morning\'s salah learning steps before the morning routine tasks', () => {
    const titles = pool(stored()).map((r) => r.title);
    expect(titles.indexOf('Learn the conditions that invalidate salah'))
      .toBeLessThan(titles.indexOf('Close the morning by praying Dhuhr at its first time'));
  });

  it('keeps levels first and groups boards in the node\'s submodule order within a level', () => {
    const rows = pool(stored());
    const order = TOD_SUBMODULES.morning.submodules;
    for (let i = 1; i < rows.length; i++) {
      const a = rows[i - 1];
      const b = rows[i];
      expect(a._level).toBeLessThanOrEqual(b._level);
      if (a._level === b._level) {
        expect(order.indexOf(a._submoduleId)).toBeLessThanOrEqual(order.indexOf(b._submoduleId));
      }
    }
  });

  it('lets an operator due date pull a task ahead within its level', () => {
    const tasks = stored();
    const late = tasks.faith_salah_core.find((t) => t.title === 'Close the morning by praying Dhuhr at its first time');
    late.dueDate = '2026-10-07';
    expect(pool(tasks)[0].title).toBe(late.title);
  });

  it('places operator-created tasks after the curated chain of their board', () => {
    const tasks = stored();
    tasks.faith_salah_core.unshift({ id: 'mine', title: 'My own morning salah task', priority: 'urgent', tags: [], subtasks: [], columnId: 'todo', order: 0 });
    const salah = pool(tasks).filter((r) => r.projectId === 'faith_salah_core').map((r) => r.title);
    expect(salah.at(-1)).toBe('My own morning salah task');
  });
});
