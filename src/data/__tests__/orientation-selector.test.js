import { describe, it, expect } from 'vitest';
import {
  isSubtaskSatisfied,
  isSubtaskEligible,
  isSubtaskSnoozedToday,
  isTaskComplete,
  isTaskSnoozedToday,
  isTaskDeferredToday,
  isTaskSettledToday,
  findCurrentTaskIndex,
  findCurrentSubtaskIndex,
  taskPillState,
  subtaskChipState,
  orderBoardTasks,
  orderPillarBoards,
  decorateTaskChain,
  deriveBoardSequence,
  deriveSubtaskSteps,
  getPillarTierSubtaskStats,
  getPillarActiveTierRatio,
  findActiveBoardInPillarTier,
  findNextEligibleSubtask,
  recommendOrientation,
  buildOrientationCarousel,
} from '../orientation-selector';
import { MAQASID_CORE_PILLARS, getPillarBoardSegments } from '../maqasid';
import { getPillarBoardIds } from '../submodule-registry';

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

describe('task-level predicates (sequential locking)', () => {
  it('isTaskComplete is true only when every subtask is satisfied', () => {
    expect(isTaskComplete(task('t', [subtask('a', { done: true }), subtask('b', { notApplicable: true })]))).toBe(true);
    expect(isTaskComplete(task('t', [subtask('a', { done: true }), subtask('b')]))).toBe(false);
    // A subtask-level snooze does NOT satisfy — the task is still incomplete.
    expect(isTaskComplete(task('t', [subtask('a', { snoozedUntilDayKey: TODAY })]))).toBe(false);
  });

  it('a task with no subtasks is treated as complete (nothing to do — walk past it)', () => {
    expect(isTaskComplete(task('t', []))).toBe(true);
  });

  it('isTaskSnoozedToday tracks the task-level snooze key against today', () => {
    expect(isTaskSnoozedToday(task('t', [subtask('a')], { snoozedUntilDayKey: TODAY }), TODAY)).toBe(true);
    expect(isTaskSnoozedToday(task('t', [subtask('a')], { snoozedUntilDayKey: '2026-07-22' }), TODAY)).toBe(false);
    expect(isTaskSnoozedToday(task('t', [subtask('a')]), TODAY)).toBe(false);
  });

  it('isTaskDeferredToday: unfinished work, none of it reachable today', () => {
    const t = task('t', [subtask('a', { done: true }), subtask('b', { snoozedUntilDayKey: TODAY })]);
    expect(isTaskDeferredToday(t, TODAY)).toBe(true);
    // still incomplete — deferral is not completion
    expect(isTaskComplete(t)).toBe(false);
    // one step still reachable ⇒ not deferred
    expect(isTaskDeferredToday(task('t', [subtask('a', { snoozedUntilDayKey: TODAY }), subtask('b')]), TODAY)).toBe(false);
    // omitting todayKey makes it inert
    expect(isTaskDeferredToday(t)).toBe(false);
  });

  it('isTaskDeferredToday: a finished task is complete, never deferred', () => {
    expect(isTaskDeferredToday(task('t', [subtask('a', { done: true })]), TODAY)).toBe(false);
    expect(isTaskDeferredToday(task('t', []), TODAY)).toBe(false);
  });

  it('isTaskDeferredToday ignores the TASK-level snooze — that drops the board, not the step', () => {
    const t = task('t', [subtask('a')], { snoozedUntilDayKey: TODAY });
    expect(isTaskDeferredToday(t, TODAY)).toBe(false);
    expect(isTaskSnoozedToday(t, TODAY)).toBe(true);
  });

  it('isTaskSettledToday covers both complete and deferred', () => {
    expect(isTaskSettledToday(task('t', [subtask('a', { done: true })]), TODAY)).toBe(true);
    expect(isTaskSettledToday(task('t', [subtask('a', { snoozedUntilDayKey: TODAY })]), TODAY)).toBe(true);
    expect(isTaskSettledToday(task('t', [subtask('a')]), TODAY)).toBe(false);
  });
});

describe('current-step finders (array order, never priority/n)', () => {
  it('findCurrentTaskIndex returns the first not-complete task in ARRAY order', () => {
    const tasks = [
      task('t-a', [subtask('a', { done: true })]), // complete
      task('t-b', [subtask('b')]),                 // current
      task('t-c', [subtask('c')]),                 // locked
    ];
    expect(findCurrentTaskIndex(tasks)).toBe(1);
  });

  it('ignores priority and n — order is purely positional', () => {
    const tasks = [
      task('t-low', [subtask('low1')], { priority: 'low', n: 3 }),
      task('t-urgent', [subtask('urg1')], { priority: 'urgent', n: 1 }),
    ];
    // Old behaviour surfaced the urgent task; sequential locking surfaces index 0.
    expect(findCurrentTaskIndex(tasks)).toBe(0);
  });

  it('findCurrentTaskIndex returns -1 when every task is complete', () => {
    expect(findCurrentTaskIndex([task('t', [subtask('a', { done: true })])])).toBe(-1);
  });

  it('findCurrentTaskIndex walks past a task whose every remaining step is deferred', () => {
    const tasks = [
      task('t-a', [subtask('a', { done: true }), subtask('b', { snoozedUntilDayKey: TODAY })]),
      task('t-b', [subtask('c')]),
    ];
    expect(findCurrentTaskIndex(tasks, TODAY)).toBe(1);
    // omitting todayKey reproduces the old "first not-complete" behaviour
    expect(findCurrentTaskIndex(tasks)).toBe(0);
  });

  it('findCurrentTaskIndex does NOT walk past a task-level snooze — that drops the board instead', () => {
    const tasks = [
      task('t-a', [subtask('a')], { snoozedUntilDayKey: TODAY }),
      task('t-b', [subtask('b')]),
    ];
    expect(findCurrentTaskIndex(tasks, TODAY)).toBe(0);
  });

  it('findCurrentSubtaskIndex returns the first not-satisfied subtask; -1 when all satisfied', () => {
    expect(findCurrentSubtaskIndex(task('t', [subtask('a', { done: true }), subtask('b'), subtask('c')]))).toBe(1);
    expect(findCurrentSubtaskIndex(task('t', [subtask('a', { done: true }), subtask('b', { notApplicable: true })]))).toBe(-1);
  });

  it('findCurrentSubtaskIndex skips a subtask deferred today when todayKey is passed', () => {
    const t = task('t', [subtask('a', { snoozedUntilDayKey: TODAY }), subtask('b')]);
    expect(findCurrentSubtaskIndex(t, TODAY)).toBe(1);
    // omitting todayKey reproduces the old "first not-satisfied" behaviour
    expect(findCurrentSubtaskIndex(t)).toBe(0);
  });
});

describe('stepper display-state helpers', () => {
  it('taskPillState: done before current, current at, locked after', () => {
    const t = task('t', [subtask('a')]);
    expect(taskPillState(0, 1, t, TODAY)).toBe('done');
    expect(taskPillState(1, 1, t, TODAY)).toBe('current');
    expect(taskPillState(2, 1, t, TODAY)).toBe('locked');
  });

  it('taskPillState: the current task reads snoozed when snoozed today', () => {
    const snoozed = task('t', [subtask('a')], { snoozedUntilDayKey: TODAY });
    expect(taskPillState(1, 1, snoozed, TODAY)).toBe('snoozed');
  });

  it('taskPillState: a complete board (currentTaskIndex -1) marks every pill done', () => {
    expect(taskPillState(0, -1, task('t', []), TODAY)).toBe('done');
  });

  it('taskPillState: a deferred task the chain walked past reads snoozed, not done', () => {
    const deferred = task('t', [subtask('a', { done: true }), subtask('b', { snoozedUntilDayKey: TODAY })]);
    // index 0 sits BEHIND currentTaskIndex 1 — the positional rule alone would say 'done'
    expect(taskPillState(0, 1, deferred, TODAY)).toBe('snoozed');
    // and inert without todayKey
    expect(taskPillState(0, 1, deferred)).toBe('done');
  });

  it('subtaskChipState: done / current / locked by position', () => {
    expect(subtaskChipState(0, 1)).toBe('done');
    expect(subtaskChipState(1, 1)).toBe('current');
    expect(subtaskChipState(2, 1)).toBe('locked');
    expect(subtaskChipState(0, -1)).toBe('done'); // task complete → all done
  });

  it('subtaskChipState: a step deferred today reads snoozed only when todayKey is passed', () => {
    const deferred = subtask('a', { snoozedUntilDayKey: TODAY });
    // positionally "behind" current (index 0 < currentSubtaskIndex 2) — would
    // read done without the subtask+todayKey args, which is the bug.
    expect(subtaskChipState(0, 2, deferred, TODAY)).toBe('snoozed');
    expect(subtaskChipState(0, 2, deferred)).toBe('done'); // no todayKey → inert, matches Orientation
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

describe('deriveBoardSequence', () => {
  it('labels each task with its state + number and flags the board actionable', () => {
    const p = project('wealth_earning_core');
    const tasks = [
      task('t-a', [subtask('a', { done: true })]), // complete → done
      task('t-b', [subtask('b')]),                 // current
      task('t-c', [subtask('c')]),                 // locked
    ];
    const seq = deriveBoardSequence(p, tasks, TODAY);
    expect(seq.projectId).toBe('wealth_earning_core');
    expect(seq.currentTaskIndex).toBe(1);
    expect(seq.actionable).toBe(true);
    expect(seq.tasks.map((t) => t.state)).toEqual(['done', 'current', 'locked']);
    expect(seq.tasks.map((t) => t.label)).toEqual(['1', '2', '3']);
  });

  it('is not actionable when the current task is snoozed today', () => {
    const p = project('wealth_earning_core');
    const seq = deriveBoardSequence(p, [task('t', [subtask('a')], { snoozedUntilDayKey: TODAY })], TODAY);
    expect(seq.currentTaskIndex).toBe(0);
    expect(seq.actionable).toBe(false);
    expect(seq.tasks[0].state).toBe('snoozed');
  });

  it('a fully-complete board has currentTaskIndex -1 and is not actionable', () => {
    const p = project('wealth_earning_core');
    const seq = deriveBoardSequence(p, [task('t', [subtask('a', { done: true })])], TODAY);
    expect(seq.currentTaskIndex).toBe(-1);
    expect(seq.actionable).toBe(false);
  });

  it('rolls forward past a task whose every remaining step was deferred today', () => {
    const p = project('wealth_earning_core');
    const seq = deriveBoardSequence(p, [
      task('t-a', [subtask('a', { done: true }), subtask('b', { snoozedUntilDayKey: TODAY })]),
      task('t-b', [subtask('c')]),
    ], TODAY);
    expect(seq.currentTaskIndex).toBe(1);
    expect(seq.actionable).toBe(true);
    // A is set aside for the day, NOT finished — its pill must not read done.
    expect(seq.tasks.map((t) => t.state)).toEqual(['snoozed', 'current']);
  });

  it('a board whose every task is deferred has currentTaskIndex -1 and is not actionable', () => {
    const p = project('wealth_earning_core');
    const seq = deriveBoardSequence(p, [
      task('t-a', [subtask('a', { snoozedUntilDayKey: TODAY })]),
      task('t-b', [subtask('b', { snoozedUntilDayKey: TODAY })]),
    ], TODAY);
    expect(seq.currentTaskIndex).toBe(-1);
    expect(seq.actionable).toBe(false);
  });
});

describe('orderBoardTasks (curated seed order)', () => {
  it('sorts a board by seedOrder, not by persisted array position', () => {
    const tasks = [
      task('t-third', [subtask('a')], { seedOrder: 2 }),
      task('t-first', [subtask('b')], { seedOrder: 0 }),
      task('t-second', [subtask('c')], { seedOrder: 1 }),
    ];
    expect(orderBoardTasks(tasks).map((t) => t.id)).toEqual(['t-first', 't-second', 't-third']);
  });

  it('keeps array order when no task carries a seedOrder (uncurated board)', () => {
    const tasks = [task('t-a', [subtask('a')]), task('t-b', [subtask('b')]), task('t-c', [subtask('c')])];
    expect(orderBoardTasks(tasks).map((t) => t.id)).toEqual(['t-a', 't-b', 't-c']);
  });

  it('places user-created tasks (no seedOrder) after the whole curated seed chain', () => {
    const tasks = [
      task('t-user-early', [subtask('a')], { order: 0 }),
      task('t-seed-last', [subtask('b')], { seedOrder: 9 }),
      task('t-user-late', [subtask('c')], { order: 1 }),
      task('t-seed-first', [subtask('d')], { seedOrder: 0 }),
    ];
    expect(orderBoardTasks(tasks).map((t) => t.id))
      .toEqual(['t-seed-first', 't-seed-last', 't-user-early', 't-user-late']);
  });

  it('is stable for equal keys and tolerates a null list', () => {
    const tasks = [
      task('t-a', [subtask('a')], { seedOrder: 1 }),
      task('t-b', [subtask('b')], { seedOrder: 1 }),
    ];
    expect(orderBoardTasks(tasks).map((t) => t.id)).toEqual(['t-a', 't-b']);
    expect(orderBoardTasks(null)).toEqual([]);
  });

  it('deriveBoardSequence walks the curated order — the current step follows seedOrder', () => {
    const p = project('health_physical_core');
    const tasks = [
      // Persisted array order says this open task is first; curation says it is third.
      task('t-late', [subtask('a')], { seedOrder: 2 }),
      task('t-early', [subtask('b')], { seedOrder: 0 }),
      task('t-mid', [subtask('c')], { seedOrder: 1 }),
    ];
    const seq = deriveBoardSequence(p, tasks, TODAY);
    expect(seq.tasks.map((t) => t.task.id)).toEqual(['t-early', 't-mid', 't-late']);
    expect(seq.currentTaskIndex).toBe(0);
    expect(seq.tasks[0].task.id).toBe('t-early');
    expect(seq.tasks.map((t) => t.state)).toEqual(['current', 'locked', 'locked']);
  });

  it('decorateTaskChain stays unsorted — the cross-project popup pool keeps its build order', () => {
    const pool = [
      task('t-b', [subtask('a')], { seedOrder: 5 }),
      task('t-a', [subtask('b')], { seedOrder: 0 }),
    ];
    expect(decorateTaskChain(pool, TODAY).items.map((i) => i.task.id)).toEqual(['t-b', 't-a']);
  });
});

describe('orderPillarBoards (canonical module order)', () => {
  it('walks Faith as Shahada → Salah → Zakah → Siyam → Hajj, not alphabetically', () => {
    // Alphabetically these ids read hajj, salah, shahada, siyam, zakah — which
    // is why Orientation used to open Faith on a Hajj task. Shuffled on input
    // so neither array order nor id order can pass this by accident.
    const projects = [
      project('faith_siyam_core'),
      project('faith_hajj_core'),
      project('faith_shahada_core'),
      project('faith_zakah_core'),
      project('faith_salah_core'),
    ];
    expect(orderPillarBoards('faith', projects).map((p) => p.id)).toEqual([
      'faith_shahada_core',
      'faith_salah_core',
      'faith_zakah_core',
      'faith_siyam_core',
      'faith_hajj_core',
    ]);
  });

  it('orders every other pillar by its declared modules, not by id', () => {
    const first = (pillarId, ids) => orderPillarBoards(pillarId, ids.map(project))[0].id;
    // Each list is given in ALPHABETICAL order, so a passing assertion proves
    // the sort moved something.
    expect(first('health', ['health_mental_core', 'health_physical_core', 'health_safety_core', 'health_social_core']))
      .toBe('health_physical_core');
    expect(first('intellect', ['intellect_cognitive_core', 'intellect_learning_core', 'intellect_professional_core', 'intellect_thinking_core']))
      .toBe('intellect_learning_core');
    expect(first('family', ['family_home_core', 'family_kinship_core', 'family_marriage_core', 'family_parenting_core']))
      .toBe('family_marriage_core');
    expect(first('wealth', ['wealth_circulation_core', 'wealth_earning_core', 'wealth_financial_core', 'wealth_ownership_core']))
      .toBe('wealth_earning_core');
    expect(first('environment', ['environment_ecosystem_core', 'environment_resource_core', 'environment_sourcing_core', 'environment_waste_core']))
      .toBe('environment_resource_core');
    expect(first('ummah', ['ummah_collective_core', 'ummah_community_core', 'ummah_neighbors_core']))
      .toBe('ummah_collective_core');
  });

  it('sorts Community canonically, so Neighbors precedes Community', () => {
    const projects = ['ummah_community_core', 'ummah_neighbors_core', 'ummah_collective_core'].map(project);
    expect(orderPillarBoards('ummah', projects).map((p) => p.id))
      .toEqual(['ummah_collective_core', 'ummah_neighbors_core', 'ummah_community_core']);
  });

  it('puts a board with no canonical segment after the whole declared list', () => {
    // The Moontrance boards sit under the `ummah_` prefix without being one of
    // the Maqasid, so they must never outrank a real Community module.
    const projects = [
      project('ummah_moontrance-land_core'),
      project('ummah_neighbors_core'),
      project('ummah_collective_core'),
    ];
    expect(orderPillarBoards('ummah', projects).map((p) => p.id))
      .toEqual(['ummah_collective_core', 'ummah_neighbors_core', 'ummah_moontrance-land_core']);
  });

  it('breaks ties among unknown segments by id, so the walk stays deterministic', () => {
    const projects = [
      project('ummah_moontrance-seasonal_core'),
      project('ummah_moontrance-land_core'),
      project('ummah_collective_core'),
    ];
    expect(orderPillarBoards('ummah', projects).map((p) => p.id)).toEqual([
      'ummah_collective_core',
      'ummah_moontrance-land_core',
      'ummah_moontrance-seasonal_core',
    ]);
  });

  it('tolerates an unknown pillar and a null list', () => {
    const projects = [project('nope_b_core'), project('nope_a_core')];
    // No declared order at all → every board is unranked, id decides.
    expect(orderPillarBoards('nope', projects).map((p) => p.id)).toEqual(['nope_a_core', 'nope_b_core']);
    expect(orderPillarBoards('faith', null)).toEqual([]);
  });

  it('agrees with submodule-registry for all seven pillars (drift guard)', () => {
    // getPillarBoardSegments derives from maqasid.js `subModuleIds`;
    // getPillarBoardIds derives from PILLAR_SUBMODULES in submodule-registry.js.
    // The selector reads the first because the second imports page constants —
    // this pins the two declarations together so the copies cannot rot apart.
    for (const pillar of MAQASID_CORE_PILLARS) {
      const boardIds = getPillarBoardIds(pillar.id, 'core');
      const fromSegments = getPillarBoardSegments(pillar.id)
        .map((segment) => `${pillar.id}_${segment}_core`)
        // subModuleIds also carries non-board entries (`sources`,
        // `family-office`, `work`/`money`/…); keep only what is a real board.
        .filter((id) => boardIds.includes(id));
      expect(fromSegments).toEqual(boardIds);
    }
  });
});

describe('deriveSubtaskSteps', () => {
  it('marks done/current/locked chips and reports the current index', () => {
    const t = task('t', [subtask('x', { done: true }), subtask('y'), subtask('z')]);
    const { currentSubtaskIndex, steps } = deriveSubtaskSteps(t);
    expect(currentSubtaskIndex).toBe(1);
    expect(steps.map((s) => s.state)).toEqual(['done', 'current', 'locked']);
    expect(steps.map((s) => s.subtask.id)).toEqual(['x', 'y', 'z']);
    // Steps are LETTERED, one level under the numbered task chain.
    expect(steps.map((s) => s.label)).toEqual(['A', 'B', 'C']);
  });

  it('with todayKey, a deferred step reads snoozed and the flow advances past it', () => {
    const t = task('t', [
      subtask('x', { done: true }),
      subtask('y', { snoozedUntilDayKey: TODAY }),
      subtask('z'),
    ]);
    const { currentSubtaskIndex, steps } = deriveSubtaskSteps(t, TODAY);
    expect(currentSubtaskIndex).toBe(2);
    expect(steps.map((s) => s.state)).toEqual(['done', 'snoozed', 'current']);
  });
});

describe('findActiveBoardInPillarTier / findNextEligibleSubtask', () => {
  it('returns the pillar+tier board whose current task is actionable', () => {
    const { projects, tasksByProject } = buildFixture();
    const found = findActiveBoardInPillarTier('health', 'core', projects, tasksByProject, TODAY);
    expect(found.project.id).toBe('health_physical_core');
    expect(found.seq.actionable).toBe(true);
    expect(found.seq.currentTaskIndex).toBe(0);
  });

  it('surfaces Shahada over Hajj when both are actionable (the reported bug)', () => {
    const projects = [project('faith_hajj_core'), project('faith_shahada_core')];
    const tasksByProject = {
      faith_hajj_core: [task('t-hajj', [subtask('a')])],
      faith_shahada_core: [task('t-shahada', [subtask('b')])],
    };
    const found = findActiveBoardInPillarTier('faith', 'core', projects, tasksByProject, TODAY);
    expect(found.project.id).toBe('faith_shahada_core');
    expect(found.seq.actionable).toBe(true);
  });

  it('falls through to the next CANONICAL board once Shahada is complete, not the next alphabetical one', () => {
    const projects = ['faith_hajj_core', 'faith_salah_core', 'faith_shahada_core'].map(project);
    const tasksByProject = {
      faith_hajj_core: [task('t-hajj', [subtask('a')])],
      faith_salah_core: [task('t-salah', [subtask('b')])],
      faith_shahada_core: [task('t-shahada', [subtask('c', { done: true })])],
    };
    const found = findActiveBoardInPillarTier('faith', 'core', projects, tasksByProject, TODAY);
    expect(found.project.id).toBe('faith_salah_core');
  });

  it('skips a fully-complete board and returns the next incomplete one (cross-board)', () => {
    const projects = [project('wealth_earning_core'), project('wealth_saving_core')];
    const tasksByProject = {
      // 'earning' sorts before 'saving' but is complete → skipped.
      wealth_earning_core: [task('t-done', [subtask('a', { done: true })])],
      wealth_saving_core: [task('t-open', [subtask('b')])],
    };
    const found = findActiveBoardInPillarTier('wealth', 'core', projects, tasksByProject, TODAY);
    expect(found.project.id).toBe('wealth_saving_core');
    expect(found.seq.actionable).toBe(true);
  });

  it('skips a board whose current task is snoozed and returns an actionable sibling board', () => {
    const projects = [project('wealth_earning_core'), project('wealth_saving_core')];
    const tasksByProject = {
      wealth_earning_core: [task('t-snoozed', [subtask('a')], { snoozedUntilDayKey: TODAY })],
      wealth_saving_core: [task('t-open', [subtask('b')])],
    };
    const found = findActiveBoardInPillarTier('wealth', 'core', projects, tasksByProject, TODAY);
    expect(found.project.id).toBe('wealth_saving_core');
    expect(found.seq.actionable).toBe(true);
  });

  it('when every incomplete board is snoozed, returns the first as a non-actionable display fallback', () => {
    const projects = [project('wealth_earning_core'), project('wealth_saving_core')];
    const tasksByProject = {
      wealth_earning_core: [task('t1', [subtask('a')], { snoozedUntilDayKey: TODAY })],
      wealth_saving_core: [task('t2', [subtask('b')], { snoozedUntilDayKey: TODAY })],
    };
    const found = findActiveBoardInPillarTier('wealth', 'core', projects, tasksByProject, TODAY);
    expect(found.project.id).toBe('wealth_earning_core');
    expect(found.seq.actionable).toBe(false);
  });

  it('returns null when the pillar+tier has no incomplete board', () => {
    const projects = [project('wealth_earning_core')];
    const tasksByProject = {
      wealth_earning_core: [task('t', [subtask('a', { done: true })])],
    };
    expect(findActiveBoardInPillarTier('wealth', 'core', projects, tasksByProject, TODAY)).toBeNull();
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

describe('recommendOrientation — sequential selection', () => {
  it('ranks the least-progressed pillar first and surfaces its current step', () => {
    const { projects, tasksByProject } = buildFixture();
    const rec = recommendOrientation({ projects, tasksByProject, todayKey: TODAY });
    expect(rec.reason).toBe('ranked');
    expect(rec.pillar.id).toBe('health');
    expect(rec.tier).toBe('core');
    expect(rec.subtask.id).toBe('s2');
    expect(rec.wasSetAside).toBe(false);
  });

  it('surfaces the FIRST task in array order, not the most-urgent (behaviour change)', () => {
    const projects = [project('wealth_earning_core')];
    const tasksByProject = {
      wealth_earning_core: [
        task('t-low', [subtask('low1')], { order: 0, priority: 'low' }),
        task('t-urgent', [subtask('urg1')], { order: 5, priority: 'urgent' }),
        task('t-high', [subtask('hi1')], { order: 1, priority: 'high' }),
      ],
    };
    const rec = recommendOrientation({ projects, tasksByProject, todayKey: TODAY });
    expect(rec.task.id).toBe('t-low'); // array index 0 wins; priority is ignored
    expect(rec.subtask.id).toBe('low1');
  });

  it('advances to the next task in the chain once the current task is complete', () => {
    const projects = [project('wealth_earning_core')];
    const tasksByProject = {
      wealth_earning_core: [
        task('t-a', [subtask('a1', { done: true })]), // complete
        task('t-b', [subtask('b1'), subtask('b2')]),  // current
      ],
    };
    const rec = recommendOrientation({ projects, tasksByProject, todayKey: TODAY });
    expect(rec.task.id).toBe('t-b');
    expect(rec.subtask.id).toBe('b1');
  });

  it('task-level snooze on the top-ranked pillar falls through to the next pillar', () => {
    const projects = [project('wealth_earning_core'), project('faith_salah_core')];
    const tasksByProject = {
      // wealth is least-progressed (0/2 → ratio 0) so it ranks first, but its
      // only current task is snoozed today → no actionable board in the pillar.
      wealth_earning_core: [task('t-w', [subtask('w1'), subtask('w2')], { snoozedUntilDayKey: TODAY })],
      // faith core is 1/2 (ratio 0.5) and actionable.
      faith_salah_core: [task('t-f', [subtask('f1', { done: true }), subtask('f2')])],
    };
    const rec = recommendOrientation({ projects, tasksByProject, todayKey: TODAY });
    expect(rec.pillar.id).toBe('faith');
    expect(rec.subtask.id).toBe('f2');
    expect(rec.reason).toBe('ranked');
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

  it('pillar override targets that pillar and flags wasSetAside when it is not top-ranked', () => {
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

  it('returns null when nothing is actionable anywhere today', () => {
    const projects = [project('health_physical_core')];
    const tasksByProject = {
      health_physical_core: [task('t1', [subtask('s1', { done: true })])],
    };
    expect(recommendOrientation({ projects, tasksByProject, todayKey: TODAY })).toBeNull();
  });
});

describe('buildOrientationCarousel', () => {
  it('returns one card per core pillar, in canonical order', () => {
    const { projects, tasksByProject } = buildFixture();
    const { cards } = buildOrientationCarousel({ projects, tasksByProject, todayKey: TODAY });
    expect(cards).toHaveLength(MAQASID_CORE_PILLARS.length);
    expect(cards.map((c) => c.pillar.id)).toEqual(MAQASID_CORE_PILLARS.map((p) => p.id));
  });

  it('flags exactly the pillar recommendOrientation would surface', () => {
    const { projects, tasksByProject } = buildFixture();
    const { cards, recommendedPillarId } = buildOrientationCarousel({ projects, tasksByProject, todayKey: TODAY });
    const rec = recommendOrientation({ projects, tasksByProject, todayKey: TODAY });
    expect(recommendedPillarId).toBe(rec.pillar.id); // 'health'
    const flagged = cards.filter((c) => c.isRecommended);
    expect(flagged).toHaveLength(1);
    expect(flagged[0].pillar.id).toBe('health');
  });

  it('recommended card carries the board sequence, current indices, steps and progress', () => {
    const { projects, tasksByProject } = buildFixture();
    const { cards } = buildOrientationCarousel({ projects, tasksByProject, todayKey: TODAY });
    const health = cards.find((c) => c.pillar.id === 'health');
    expect(health.hasEligible).toBe(true);
    expect(health.seeded).toBe(true);
    expect(health.tier).toBe('core');
    expect(health.subtask.id).toBe('s2');
    // t-health-core: s1 done, s2 open, s3 snoozed(subtask) -> current is s2 (index 1)
    expect(health.currentTaskIndex).toBe(0);
    expect(health.currentSubtaskIndex).toBe(1);
    expect(health.board.currentTaskIndex).toBe(0);
    expect(health.board.tasks[0].label).toBe('1');
    expect(health.board.tasks[0].state).toBe('current');
    // subtask-level snooze is inert now: s3 shows as a locked step, not skipped
    expect(health.steps.map((s) => s.state)).toEqual(['done', 'current', 'locked']);
    expect(health.taskStats).toEqual({ done: 1, total: 3 });
  });

  it('pillars with no actionable work carry hasEligible:false and null board/task/subtask', () => {
    const { projects, tasksByProject } = buildFixture();
    const { cards } = buildOrientationCarousel({ projects, tasksByProject, todayKey: TODAY });
    // family/wealth/environment/ummah have no seeded projects in the fixture
    const family = cards.find((c) => c.pillar.id === 'family');
    expect(family.hasEligible).toBe(false);
    // No projects at all -> unseeded, so the card shows "no steps yet" rather
    // than masquerading as a caught-up "nothing left for today".
    expect(family.seeded).toBe(false);
    expect(family.board).toBeNull();
    expect(family.task).toBeNull();
    expect(family.subtask).toBeNull();
    expect(family.currentTaskIndex).toBe(-1);
    expect(family.steps).toEqual([]);
    expect(family.taskStats).toEqual({ done: 0, total: 0 });
  });

  it('a pillar whose seeded tasks are all complete stays seeded:true (caught up, not empty)', () => {
    // One board, its only subtask done -> hasEligible:false but seeded:true, so
    // the card renders "nothing left for today", not "no steps yet".
    const projects = [project('health_physical_core')];
    const tasksByProject = {
      health_physical_core: [task('t1', [subtask('s1', { done: true })])],
    };
    const { cards } = buildOrientationCarousel({ projects, tasksByProject, todayKey: TODAY });
    const health = cards.find((c) => c.pillar.id === 'health');
    expect(health.hasEligible).toBe(false);
    expect(health.seeded).toBe(true);
  });

  it('recommendedPillarId is null when nothing is actionable anywhere today', () => {
    const projects = [project('health_physical_core')];
    const tasksByProject = {
      health_physical_core: [task('t1', [subtask('s1', { done: true })])],
    };
    const { cards, recommendedPillarId } = buildOrientationCarousel({ projects, tasksByProject, todayKey: TODAY });
    expect(recommendedPillarId).toBeNull();
    expect(cards.every((c) => !c.isRecommended)).toBe(true);
  });
});
