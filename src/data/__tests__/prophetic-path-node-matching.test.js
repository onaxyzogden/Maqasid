import { describe, it, expect } from 'vitest';
import { buildTasksForNode, rowMatches, TOD_SUBMODULES } from '../prophetic-path-submodules';
import { FAITH_SEED_TASKS } from '../seed-tasks/faith-seed-tasks';
import { HEALTH_SEED_TASKS } from '../seed-tasks/health-seed-tasks';
import { FAMILY_SEED_TASKS } from '../seed-tasks/family-seed-tasks';
import { INTELLECT_SEED_TASKS } from '../seed-tasks/intellect-seed-tasks';
import { WEALTH_SEED_TASKS } from '../seed-tasks/wealth-seed-tasks';

// Regression (2026-10-05): node matchers like /\btransition:isha-taraweeh\b/
// name ROUTING TAGS but were only ever tested against titles, so they never
// fired. Taraweeh matched nothing and fell back to its whole 45-task scope.
// Tags are now tested against `transition:` matchers only — broad keyword
// matchers stay title-only so generic tags (`sleep`, `home`) cannot leak
// unrelated tasks onto a node.

const SEEDS = { ...FAITH_SEED_TASKS, ...HEALTH_SEED_TASKS, ...FAMILY_SEED_TASKS, ...INTELLECT_SEED_TASKS, ...WEALTH_SEED_TASKS };
const boardIds = Object.keys(SEEDS).filter((id) => id.split('_').length >= 3);
const PROJECTS = boardIds.map((id) => {
  const [pillar, mod] = id.split('_');
  return { id, moduleId: `${pillar}-${mod}`, name: id };
});
const TASKS = Object.fromEntries(boardIds.map((id) => [
  id,
  SEEDS[id].map((t, i) => ({ id: `${id}#${i}`, title: t.title, priority: t.priority, tags: t.tags || [], subtasks: t.subtasks, columnId: 'todo' })),
]));
const titlesFor = (nodeId) => buildTasksForNode(nodeId, PROJECTS, TASKS, { limit: 1000 }).map((r) => r.title);

describe('node matching reads transition: tags', () => {
  it('Taraweeh shows the Ramadan task instead of falling back to its whole scope', () => {
    expect(titlesFor('isha-taraweeh')).toEqual(['Observe Ramadan with the Prophet’s ﷺ structure']);
  });

  // 2026-10-16: the node used to show the whole Friday Sunan task, whose ghusl,
  // early-walk and khutbah steps are over long before the last hour before
  // Maghrib. It now has a dedicated task, and the Jumuʻah task stays at noon.
  it('the Hour of Istijabah shows only its own task, in prerequisite order', () => {
    const rows = buildTasksForNode('istijabah-hour', PROJECTS, TASKS, { limit: 1000 });
    expect(rows.map((r) => r.title)).toEqual(['Seek the Hour of Acceptance on Friday']);
    expect(rows[0].subtasks.map((s) => s.title)).toEqual([
      'Learn when the Hour of Acceptance falls on Friday',
      'Call upon Allah certain of being answered, with a present heart',
      'Open your duʻaʻ with praise of Allah and salawat, then ask',
      'Make duʻaʻ in the last hour before Maghrib on Friday',
    ]);
    expect(titlesFor('jumuah')).not.toContain('Seek the Hour of Acceptance on Friday');
  });

  it('generic tags do not leak onto nodes through keyword matchers', () => {
    expect(titlesFor('bedtime')).not.toContain('Qaylulah — implement the prophetic midday rest');
  });

  it('every non-prayer node with matchers matches at least one task in its scope (no fallback)', () => {
    const PRAYER = new Set(['fajr', 'dhuhr', 'asr', 'maghrib', 'isha', 'tahajjud']);
    const fallback = Object.entries(TOD_SUBMODULES)
      .filter(([id, e]) => !PRAYER.has(id) && e.matchers)
      .filter(([, e]) => {
        const scope = new Set(e.submodules);
        const pool = PROJECTS.filter((p) => scope.has(p.moduleId)).flatMap((p) => TASKS[p.id]);
        return pool.length > 0 && !pool.some((row) => rowMatches(row, e.matchers));
      })
      .map(([id]) => id);
    expect(fallback).toEqual([]);
  });
});
