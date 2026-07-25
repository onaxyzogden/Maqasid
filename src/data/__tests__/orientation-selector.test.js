import { describe, it, expect } from 'vitest';
import {
  isSubtaskSatisfied,
  isSubtaskEligible,
  isSubtaskSnoozedToday,
  getPillarTierSubtaskStats,
  getPillarActiveTierRatio,
  findFirstEligibleInPillarTier,
  findNextEligibleSubtask,
  recommendOrientation,
} from '../orientation-selector';

const TODAY = '2026-07-23';

function subtask(id, overrides = {}) {
  return { id, title: id, done: false, ...overrides };
}

function task(id, subtasks, overrides = {}) {
  return { id, title: id, order: 0, subtasks, ...overrides };
}

function project(id) {
  return { id, columns: [] };
}

// health has submodules health-physical/mental/safety/social; only physical
// is seeded here — that's intentional, exercises the "other submodules have
// zero tasks at this tier" path.
function buildFixture() {
  const projects = [
    project('health_physical_core'),
    project('health_physical_growth'),
    project('faith_salah_core'),
    project('faith_salah_growth'),
    project('intellect_learning_core'),
  ];

  const tasksByProject = {
    health_physical_core: [
      task('t-health-core', [
        subtask('s1', { done: true }),
        subtask('s2'),
        subtask('s3', { snoozedUntilDayKey: TODAY }),
      ]),
    ],
    health_physical_growth: [
      task('t-health-growth', [subtask('s4')]),
    ],
    faith_salah_core: [
      task('t-faith-core', [
        subtask('s5', { done: true }),
        subtask('s6', { notApplicable: true }),
      ]),
    ],
    faith_salah_growth: [
      task('t-faith-growth', [subtask('s7')]),
    ],
    intellect_learning_core: [],
  };

  return { projects, tasksByProject };
}

describe('subtask eligibility predicates', () => {
  it('done and notApplicable both count as satisfied', () => {
    expect(isSubtaskSatisfied(subtask('a', { done: true }))).toBe(true);
    expect(isSubtaskSatisfied(subtask('a', { notApplicable: true }))).toBe(true);
    expect(isSubtaskSatisfied(subtask('a'))).toBe(false);
  });

  it('snoozedUntilDayKey matching today marks it snoozed, other days do not', () => {
    expect(isSubtaskSnoozedToday(subtask('a', { snoozedUntilDayKey: TODAY }), TODAY)).toBe(true);
    expect(isSubtaskSnoozedToday(subtask('a', { snoozedUntilDayKey: '2026-07-22' }), TODAY)).toBe(false);
  });

  it('eligible excludes satisfied and snoozed-today, but snooze does not satisfy', () => {
    const snoozed = subtask('a', { snoozedUntilDayKey: TODAY });
    expect(isSubtaskEligible(snoozed, TODAY)).toBe(false);
    expect(isSubtaskSatisfied(snoozed)).toBe(false);
  });
});

describe('getPillarTierSubtaskStats / getPillarActiveTierRatio', () => {
  it('aggregates done/total across a pillar tier, snoozed subtasks still count toward total', () => {
    const { projects, tasksByProject } = buildFixture();
    const stats = getPillarTierSubtaskStats('health', 'core', projects, tasksByProject);
    expect(stats).toEqual({ done: 1, total: 3 });
  });

  it('falls through to growth once core is fully satisfied (done + N/A)', () => {
    const { projects, tasksByProject } = buildFixture();
    // faith_salah_core is 1 done + 1 N/A = 2/2 satisfied -> active tier should be growth
    const active = getPillarActiveTierRatio('faith', projects, tasksByProject);
    expect(active.tier).toBe('growth');
    expect(active).toMatchObject({ done: 0, total: 1 });
  });

  it('a tier with zero seeded tasks is treated as satisfied, not stuck at ratio 0', () => {
    const { projects, tasksByProject } = buildFixture();
    // intellect_learning_core has no tasks at all (0/0 at core, 0/0 at growth/excellence too)
    const active = getPillarActiveTierRatio('intellect', projects, tasksByProject);
    expect(active).toEqual({ tier: 'excellence', ratio: 1, done: 0, total: 0 });
  });

  it('stays on core while it has incomplete, non-satisfied subtasks', () => {
    const { projects, tasksByProject } = buildFixture();
    const active = getPillarActiveTierRatio('health', projects, tasksByProject);
    expect(active.tier).toBe('core');
    expect(active.ratio).toBeCloseTo(1 / 3);
  });
});

describe('findFirstEligibleInPillarTier / findNextEligibleSubtask', () => {
  it('skips snoozed-today subtasks and returns the next eligible one', () => {
    const { projects, tasksByProject } = buildFixture();
    const found = findFirstEligibleInPillarTier('health', 'core', projects, tasksByProject, TODAY);
    expect(found.subtask.id).toBe('s2');
  });

  it('returns null when the only remaining subtask is snoozed today', () => {
    const projects = [project('health_physical_core')];
    const tasksByProject = {
      health_physical_core: [task('t1', [subtask('s1', { snoozedUntilDayKey: TODAY })])],
    };
    expect(findFirstEligibleInPillarTier('health', 'core', projects, tasksByProject, TODAY)).toBeNull();
  });

  it('findNextEligibleSubtask finds another eligible subtask within the same task', () => {
    const t = task('t1', [subtask('a', { done: true }), subtask('b')]);
    expect(findNextEligibleSubtask(t, TODAY)?.id).toBe('b');
  });

  it('findNextEligibleSubtask returns null once every subtask is satisfied', () => {
    const t = task('t1', [subtask('a', { done: true }), subtask('b', { notApplicable: true })]);
    expect(findNextEligibleSubtask(t, TODAY)).toBeNull();
  });
});

describe('recommendOrientation', () => {
  it('ranks the least-progressed pillar first (health at 1/3 beats faith which just fell through to growth 0/1, and intellect at ratio 1)', () => {
    const { projects, tasksByProject } = buildFixture();
    const rec = recommendOrientation({ projects, tasksByProject, todayKey: TODAY });
    expect(rec.reason).toBe('ranked');
    expect(rec.pillar.id).toBe('health');
    expect(rec.tier).toBe('core');
    expect(rec.subtask.id).toBe('s2');
    expect(rec.wasSetAside).toBe(false);
  });

  it('held-task continuity stays on the same task while it has more eligible subtasks', () => {
    const { projects, tasksByProject } = buildFixture();
    const rec = recommendOrientation({
      projects,
      tasksByProject,
      heldTaskKey: { projectId: 'faith_salah_growth', taskId: 't-faith-growth' },
      todayKey: TODAY,
    });
    expect(rec.reason).toBe('held');
    expect(rec.task.id).toBe('t-faith-growth');
    expect(rec.subtask.id).toBe('s7');
  });

  it('falls through to ranking once the held task has no eligible subtasks left', () => {
    const { projects, tasksByProject } = buildFixture();
    // Exhaust the held task's only subtask.
    tasksByProject.faith_salah_growth[0].subtasks[0].done = true;
    const rec = recommendOrientation({
      projects,
      tasksByProject,
      heldTaskKey: { projectId: 'faith_salah_growth', taskId: 't-faith-growth' },
      todayKey: TODAY,
    });
    expect(rec.reason).toBe('ranked');
    expect(rec.pillar.id).toBe('health');
  });

  it('pillar override ("something else") targets that pillar and flags wasSetAside when it is not the top-ranked one', () => {
    const { projects, tasksByProject } = buildFixture();
    const rec = recommendOrientation({
      projects,
      tasksByProject,
      overridePillarId: 'faith',
      todayKey: TODAY,
    });
    expect(rec.reason).toBe('override');
    expect(rec.pillar.id).toBe('faith');
    expect(rec.tier).toBe('growth');
    expect(rec.subtask.id).toBe('s7');
    expect(rec.wasSetAside).toBe(true);
  });

  it('override onto the already-top-ranked pillar does not flag wasSetAside', () => {
    const { projects, tasksByProject } = buildFixture();
    const rec = recommendOrientation({
      projects,
      tasksByProject,
      overridePillarId: 'health',
      todayKey: TODAY,
    });
    expect(rec.wasSetAside).toBe(false);
  });

  it('returns null when nothing is eligible anywhere today', () => {
    const projects = [project('health_physical_core')];
    const tasksByProject = {
      health_physical_core: [task('t1', [subtask('s1', { done: true })])],
    };
    expect(recommendOrientation({ projects, tasksByProject, todayKey: TODAY })).toBeNull();
  });
});
