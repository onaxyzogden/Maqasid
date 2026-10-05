import { describe, it, expect } from 'vitest';
import { buildTasksForNode } from '../prophetic-path-submodules';
import { FAITH_SEED_TASKS } from '../seed-tasks/faith-seed-tasks';

// Regression (2026-10-05): the Duha node's stepper read "1.1 Pray 2 rak'at of
// Duha at least 5 days this week … 2.1 Learn the time window for Duha prayer".
// The node sorts its pool by level, and the learn step was authored on the
// Excellence task while the practice step sat on Growth. It now opens the Growth
// task. See stages/implement-duha-restructure-review.md.

const BOARDS = ['faith_salah_core', 'faith_salah_growth', 'faith_salah_excellence'];
const PROJECTS = BOARDS.map((id) => ({ id, moduleId: 'salat', name: id }));
const TASKS = Object.fromEntries(BOARDS.map((id) => [
  id,
  FAITH_SEED_TASKS[id].map((t, i) => ({
    id: `${id}#${i}`, title: t.title, priority: t.priority, tags: t.tags, subtasks: t.subtasks, columnId: 'todo',
  })),
]));

const duhaSteps = () => buildTasksForNode('duha', PROJECTS, TASKS, { limit: 20 })
  .flatMap((row) => row.subtasks.map((s) => ({ level: row._level, title: s.title })));

const perWeek = (title) => {
  const m = /\b(\d+|three|five)\s+(?:days|times)\b/i.exec(title);
  if (/\bdaily\b/i.test(title)) return 7;
  if (!m) return null;
  return { three: 3, five: 5 }[m[1].toLowerCase()] ?? Number(m[1]);
};

describe('Duha node order', () => {
  it('opens with learning the time window', () => {
    expect(duhaSteps()[0].title).toBe('Learn the time window for Duha prayer');
  });

  it('places the intention before the first prayer target', () => {
    const titles = duhaSteps().map((s) => s.title);
    expect(titles.indexOf('Set the intention before each Duha as sadaqah for every joint'))
      .toBeLessThan(titles.indexOf("Pray 2 rak'at of Duha at least 5 days this week"));
  });

  it('never asks for fewer days a week at a higher level', () => {
    const steps = duhaSteps().map((s) => ({ ...s, n: perWeek(s.title) })).filter((s) => s.n != null);
    for (const hi of steps) {
      for (const lo of steps) {
        if (lo.level < hi.level) expect(hi.n).toBeGreaterThanOrEqual(lo.n);
      }
    }
  });
});
