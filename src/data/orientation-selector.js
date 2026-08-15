// Orientation screen selector — picks the single next subtask to recommend and
// builds the seven-pillar carousel model.
//
// Ranking respects necessity tier (Daruriyyat/Hajiyyat/Tahsiniyyat): each pillar
// is ranked by its OWN first-incomplete tier ratio, never a cross-tier blend.
// A pillar's core work must be exhausted before its growth work counts toward
// ranking, and growth before excellence. Pillars are then ranked ascending by
// that ratio (least-progressed-at-its-active-tier first).
//
// Within a pillar+tier, work is SEQUENTIALLY LOCKED: a board (project) holds an
// ordered list of tasks, each an ordered list of subtasks, and only the first
// not-yet-complete task — and within it the first not-yet-satisfied subtask — is
// actionable. Everything else is visible but locked. Chain order is the CURATED
// SEED ORDER (`task.seedOrder`, see orderBoardTasks), falling back to persisted
// array order for tasks that have none; the display label `task.n` is never
// consulted for sequencing.
//
// TWO orders, both declared elsewhere and both honoured here. Which BOARD a
// pillar surfaces is the canonical module order (see orderPillarBoards) — the
// order the pillar's modules appear in the level navigators and the sidebar.
// Which TASK that board surfaces is the curated seed chain above. Neither is
// alphabetical, and neither is array order.
//
// "Not today" snoozes the whole current task, so its board drops out
// for the day and selection falls through to the next actionable board in the
// pillar, then to the next pillar.
//
// The Prophetic Path node popup defers a single STEP instead ("Not now" writes
// snoozedUntilDayKey on the subtask). That never drops the board: the chain
// advances past the step, and past the whole task once no step in it is
// reachable today (see isTaskDeferredToday). The two are kept apart on purpose
// — a whole-task snooze is "not this board today", a step defer is "not this
// step now".
//
// Pure functions only — no React, no Zustand subscriptions. Callers pass in
// `projects`/`tasksByProject` snapshots read from the stores.

import { MAQASID_CORE_PILLARS, getPillarById, getPillarBoardSegments } from './maqasid';
import { resolveSubmoduleFromProject } from './maqasid-resolve';
import { getProjectLevel } from '../store/task-store';

export const TIERS = ['core', 'growth', 'excellence'];

export const TIER_META = {
  core: { label: 'Core', ar: 'Daruriyyat' },
  growth: { label: 'Growth', ar: 'Hajiyyat' },
  excellence: { label: 'Excellence', ar: 'Tahsiniyyat' },
};

export function isSubtaskSatisfied(subtask) {
  return !!(subtask?.done || subtask?.notApplicable);
}

export function isSubtaskSnoozedToday(subtask, todayKey) {
  return !!(subtask?.snoozedUntilDayKey && todayKey && subtask.snoozedUntilDayKey === todayKey);
}

export function isSubtaskEligible(subtask, todayKey) {
  if (!subtask) return false;
  if (isSubtaskSatisfied(subtask)) return false;
  if (isSubtaskSnoozedToday(subtask, todayKey)) return false;
  return true;
}

// A task is complete when every one of its subtasks is satisfied (done or N/A).
// A task with zero subtasks has no actionable work, so `every` → true treats it
// as complete and the chain walks past it rather than stalling.
export function isTaskComplete(task) {
  return (task?.subtasks ?? []).every(isSubtaskSatisfied);
}

// Task-level snooze mirrors the subtask version: set aside for exactly one
// Islamic day (see islamic-day-store.js). "Not today" writes this on the task.
export function isTaskSnoozedToday(task, todayKey) {
  return !!(task?.snoozedUntilDayKey && todayKey && task.snoozedUntilDayKey === todayKey);
}

// A task is DEFERRED for today when it still has real work but none of it is
// reachable now — every unsatisfied subtask was set aside with the popup's
// per-step "Not now". Deliberately NOT completion: isTaskComplete stays the
// honest "all satisfied" verdict, and getPillarTierSubtaskStats keeps counting
// progress off isSubtaskSatisfied alone, so a deferred task can never inflate a
// pillar ratio.
//
// Task-level `snoozedUntilDayKey` is EXCLUDED on purpose. That is Orientation's
// "Not today", and it works by dropping the whole BOARD out of selection via
// deriveBoardSequence's `actionable` flag — the cross-pillar fall-through
// depends on the chain NOT advancing past it. Only subtask-level deferral
// (which Orientation never writes) rolls the chain forward.
export function isTaskDeferredToday(task, todayKey) {
  const subs = task?.subtasks ?? [];
  if (subs.length === 0) return false;
  if (subs.every(isSubtaskSatisfied)) return false; // genuinely complete
  return !subs.some((st) => isSubtaskEligible(st, todayKey));
}

// Settled = nothing left to do on this task today, whether because it is
// finished or because every remaining step was deferred. This is what the chain
// walks past; `isTaskComplete` is what progress counts.
export function isTaskSettledToday(task, todayKey) {
  return isTaskComplete(task) || isTaskDeferredToday(task, todayKey);
}

// Index of a board's current task = first task (in ARRAY ORDER) not yet settled
// for today. -1 ⇒ nothing left on the board. Array order is the whole sequence;
// priority and `task.n` are never consulted here.
//
// `todayKey` is OPTIONAL and behaviour-preserving when omitted: with a falsy
// key, isSubtaskEligible(st, undefined) reduces to !isSubtaskSatisfied(st), so
// isTaskDeferredToday can only return false and the predicate collapses to the
// original !isTaskComplete(t). Same opt-in pattern as findCurrentSubtaskIndex.
export function findCurrentTaskIndex(tasks, todayKey) {
  return (tasks ?? []).findIndex((t) => !isTaskSettledToday(t, todayKey));
}

// Index of the current subtask within a task = first ELIGIBLE subtask (not
// satisfied, and not deferred today). -1 ⇒ nothing actionable in this task
// right now. `todayKey` is OPTIONAL: every existing caller omits it, and
// isSubtaskEligible(st, undefined) is byte-identical to the old "first
// not-satisfied" rule (isSubtaskSnoozedToday short-circuits on a falsy
// todayKey) — so this signature change is behaviour-preserving for them.
// A caller that DOES pass todayKey (the node popup's per-subtask "Not now")
// gets the flow advancing past a step deferred today instead of stalling on it.
export function findCurrentSubtaskIndex(task, todayKey) {
  return (task?.subtasks ?? []).findIndex((st) => isSubtaskEligible(st, todayKey));
}

// Display state of a task pill relative to the board's current task.
//
// The deferred check comes FIRST, mirroring subtaskChipState below and for the
// same reason one level up: once findCurrentTaskIndex walks past a task whose
// every remaining step was deferred, that task sits BEHIND the current index,
// and the positional rule on the next line would paint it done/green — work
// that was set aside, not finished.
//
// Task-level snooze (Orientation's "Not today") never advances the index, so it
// is still resolved in the `index === currentTaskIndex` branch.
export function taskPillState(index, currentTaskIndex, task, todayKey) {
  if (isTaskDeferredToday(task, todayKey)) return 'snoozed';
  if (currentTaskIndex < 0 || index < currentTaskIndex) return 'done';
  if (index > currentTaskIndex) return 'locked';
  return isTaskSnoozedToday(task, todayKey) ? 'snoozed' : 'current';
}

// Display state of a subtask chip relative to the current subtask. `subtask` /
// `todayKey` are OPTIONAL: a caller that omits them gets the pure positional
// verdict (Orientation's historical behaviour — todayKey is never threaded
// through buildOrientationCarousel on purpose, so subtask-level snooze stays
// inert there). A caller that passes them gets `snoozed` checked FIRST — a
// step deferred with "Not now" sits BEHIND the current index once the flow
// advances past it, so the positional rule alone would paint it done/green.
export function subtaskChipState(index, currentSubtaskIndex, subtask, todayKey) {
  if (isSubtaskSnoozedToday(subtask, todayKey)) return 'snoozed';
  if (currentSubtaskIndex < 0 || index < currentSubtaskIndex) return 'done';
  if (index > currentSubtaskIndex) return 'locked';
  return 'current';
}

// Spreadsheet-style label (A…Z, AA, AB, …) so a long chain never produces a
// non-letter glyph past 'Z'. Labels the SUBTASK steps: the outline reads
// numbered tasks (1, 2, 3…) with lettered steps (A, B, C…) beneath them. Seeded
// tasks top out at 8 subtasks, but a user can add more, so the wrap past 'Z'
// stays.
function alphaLabel(index) {
  let n = index;
  let out = '';
  do {
    out = String.fromCharCode(65 + (n % 26)) + out;
    n = Math.floor(n / 26) - 1;
  } while (n >= 0);
  return out;
}

// Sort key floor for tasks with no `seedOrder` (user-created tasks on a pillar
// board). Curated seed chain first, user additions after, each group keeping
// its own relative order.
const USER_TASK_ORDER_FLOOR = 1e6;

// Canonical chain order for ONE board. `seedOrder` is the curated seed index —
// written at seed time from the seed task's `seq` (falling back to its array
// position) and reconciled on every boot by project-store's backfill, so a
// curated re-order reaches boards that already exist in localStorage. Tasks
// without it (user-created) sort after the whole seed chain. Ties keep array
// order: Array.prototype.sort is stable, and the explicit index tiebreak makes
// that guarantee local rather than implied.
//
// Board-scoped ON PURPOSE — a merged cross-project pool must keep its build
// order, since `seedOrder` is only meaningful within one board. That is the
// Prophetic Path node popup's NON-prayer branch, which pools a whole node's
// tasks across projects. Its prayer branch owns exactly one board
// (`prayer_{id}_{phase}`) and so does call this. See decorateTaskChain below.
export function orderBoardTasks(tasks) {
  const list = tasks ?? [];
  return list
    .map((task, index) => ({
      task,
      index,
      key: typeof task?.seedOrder === 'number'
        ? task.seedOrder
        : USER_TASK_ORDER_FLOOR + (typeof task?.order === 'number' ? task.order : index),
    }))
    .sort((a, b) => a.key - b.key || a.index - b.index)
    .map((row) => row.task);
}

// Canonical BOARD order within one pillar — `orderBoardTasks`'s sibling, one
// level up. Board ids are `{pillar}_{segment}_{level}`, and the segment order
// comes from `getPillarBoardSegments`: the same module order the pillar is
// presented in everywhere else (the level navigators, the sidebar, and
// `PILLAR_SUBMODULES` in submodule-registry.js all agree with it).
//
// This walk used to be `id.localeCompare`, which is not an order anyone
// declared — it is just how the strings happen to sort. That put Hajj ahead of
// Shahada on Faith, Circulation ahead of Earning on Wealth, Home ahead of
// Marriage on Family, and Mental ahead of Physical on Health: six of the seven
// pillars opened Orientation on the wrong module.
//
// A board whose segment is NOT in the pillar's canonical list sorts after the
// whole list, ties broken by id so the walk stays deterministic. That covers
// user-created boards and the nine `ummah_moontrance-*` boards, which sit under
// the `ummah_` prefix without being one of the Maqasid.
export function orderPillarBoards(pillarId, projects) {
  const segments = getPillarBoardSegments(pillarId);
  const list = projects ?? [];
  return list
    .map((project, index) => {
      const rank = segments.indexOf(String(project?.id ?? '').split('_')[1] ?? '');
      return { project, index, rank: rank === -1 ? segments.length : rank };
    })
    .sort((a, b) => a.rank - b.rank
      || String(a.project?.id ?? '').localeCompare(String(b.project?.id ?? ''))
      || a.index - b.index)
    .map((row) => row.project);
}

// Decorate an ordered task list with stepper display state + position labels —
// the [{ task, state, label }] shape TaskStepper renders. Tasks are NUMBERED
// (1, 2, 3…); their subtasks are lettered one level down. Takes the list in
// the order it is given — it does NOT sort, so every caller that owns a single
// board must pass it through orderBoardTasks first (NodePhaseSlideUp's prayer
// branch does). Board-free so a merged cross-project pool (the same popup's
// non-prayer branch) can use it too.
export function decorateTaskChain(tasks, todayKey) {
  const list = tasks ?? [];
  const currentTaskIndex = findCurrentTaskIndex(list, todayKey);
  return {
    currentTaskIndex,
    items: list.map((task, i) => ({
      task,
      state: taskPillState(i, currentTaskIndex, task, todayKey),
      label: String(i + 1),
    })),
  };
}

// The full ordered task chain for one board, each task carrying its stepper
// display state + number label. `actionable` is true only when the board has a
// current task that is NOT snoozed today — i.e. there is a step to act on now.
export function deriveBoardSequence(project, tasks, todayKey) {
  const list = orderBoardTasks(tasks);
  const { currentTaskIndex, items } = decorateTaskChain(list, todayKey);
  const currentTask = currentTaskIndex >= 0 ? list[currentTaskIndex] : null;
  const actionable = currentTaskIndex >= 0 && !isTaskSnoozedToday(currentTask, todayKey);
  const { submoduleId } = resolveSubmoduleFromProject(project);
  return {
    projectId: project?.id ?? null,
    submoduleId: submoduleId ?? null,
    currentTaskIndex,
    actionable,
    tasks: items,
  };
}

// The ordered subtask "steps" of a task, each with its chip display state and
// its LETTER label (A, B, C…) — the level below decorateTaskChain's numbers.
// `todayKey` optional — see findCurrentSubtaskIndex / subtaskChipState.
export function deriveSubtaskSteps(task, todayKey) {
  const currentSubtaskIndex = findCurrentSubtaskIndex(task, todayKey);
  return {
    currentSubtaskIndex,
    steps: (task?.subtasks ?? []).map((subtask, i) => ({
      subtask,
      state: subtaskChipState(i, currentSubtaskIndex, subtask, todayKey),
      label: alphaLabel(i),
    })),
  };
}

// Projects belonging to a pillar at a given necessity tier. Project ids
// follow `{pillar}_{moduleSlug}_{level}` (see task-store.js:getProjectLevel).
export function getPillarProjectsAtTier(pillarId, tier, projects) {
  return projects.filter(
    (p) => p.id?.startsWith(`${pillarId}_`) && getProjectLevel(p.id) === tier
  );
}

// { done, total } across every subtask in every task in every project the
// pillar owns at `tier`. Aggregated pillar-wide (not per-submodule), so a
// submodule with zero seeded tasks at this tier does not block the others.
export function getPillarTierSubtaskStats(pillarId, tier, projects, tasksByProject) {
  const tierProjects = getPillarProjectsAtTier(pillarId, tier, projects);
  let done = 0;
  let total = 0;
  for (const project of tierProjects) {
    const tasks = tasksByProject[project.id] || [];
    for (const task of tasks) {
      for (const subtask of task.subtasks || []) {
        total += 1;
        if (isSubtaskSatisfied(subtask)) done += 1;
      }
    }
  }
  return { done, total };
}

// The pillar's own first-incomplete tier and its ratio. A tier with total===0
// is treated as satisfied (nothing was ever seeded there) so ranking falls
// through to the next tier instead of getting stuck reporting "0/0" forever.
// Returns { tier, ratio, done, total } — ratio is 1 when the pillar has no
// open work anywhere (fully complete, or entirely unseeded).
export function getPillarActiveTierRatio(pillarId, projects, tasksByProject) {
  let stats = { done: 0, total: 0 };
  let tier = TIERS[TIERS.length - 1];
  for (const t of TIERS) {
    stats = getPillarTierSubtaskStats(pillarId, t, projects, tasksByProject);
    tier = t;
    if (stats.done < stats.total) {
      return { tier, ratio: stats.done / stats.total, ...stats };
    }
  }
  return { tier, ratio: stats.total === 0 ? 1 : stats.done / stats.total, ...stats };
}

const TIER_RANK = { core: 0, growth: 1, excellence: 2 };

// Necessities-first, system-wide: every pillar still working through its own
// core tier outranks every pillar that has moved on to growth, which in turn
// outranks excellence — this is the fiqh triage (Daruriyyat > Hajiyyat >
// Tahsiniyyat), not just "don't blend tiers within one pillar". Ties within a
// tier break by ratio ascending (least-progressed pillar first).
function rankPillars(projects, tasksByProject) {
  return MAQASID_CORE_PILLARS
    .map((pillar) => ({ pillar, ...getPillarActiveTierRatio(pillar.id, projects, tasksByProject) }))
    .sort((a, b) => TIER_RANK[a.tier] - TIER_RANK[b.tier] || a.ratio - b.ratio);
}

// The board (project) a pillar+tier should surface right now under sequential
// locking. Boards are walked in CANONICAL MODULE ORDER (see orderPillarBoards),
// so Faith reads Shahada → Salah → Zakah → Siyam → Hajj, exactly as the pillar
// is presented everywhere else; a fully-complete board (no current task) is
// skipped. The FIRST board whose current task is actionable today wins. If none
// is actionable but some have only a snoozed current task, the first such board
// is returned as a display fallback (its `seq.actionable` is false) — callers
// that need real work check `seq.actionable` and fall through. Returns
// { project, seq } or null when the pillar+tier has no incomplete board at all.
export function findActiveBoardInPillarTier(pillarId, tier, projects, tasksByProject, todayKey) {
  const tierProjects = orderPillarBoards(pillarId, getPillarProjectsAtTier(pillarId, tier, projects));
  let fallback = null;
  for (const project of tierProjects) {
    const seq = deriveBoardSequence(project, tasksByProject[project.id] || [], todayKey);
    if (seq.currentTaskIndex < 0) continue; // board complete — skip
    if (seq.actionable) return { project, seq };
    if (!fallback) fallback = { project, seq }; // snoozed current task — display only
  }
  return fallback;
}

// Next eligible subtask within an already-known task (held-task continuity —
// after Mark done/Doesn't apply, stay on the same task if it has more work).
export function findNextEligibleSubtask(task, todayKey) {
  if (!task) return null;
  return (task.subtasks || []).find((st) => isSubtaskEligible(st, todayKey)) || null;
}

// Shape a recommendation from a resolved { project, seq }: the surfaced step is
// the board's current task and, within it, its current (first not-satisfied)
// subtask. Keeps the historical return keys so consumers are unchanged.
function boardRecommendation({ reason, wasSetAside, entry, found, rankedPillars }) {
  const { seq, project } = found;
  const task = seq.tasks[seq.currentTaskIndex].task;
  const csi = findCurrentSubtaskIndex(task);
  return {
    reason,
    wasSetAside,
    pillar: entry.pillar,
    tier: entry.tier,
    submoduleId: seq.submoduleId ?? task.submoduleId,
    project,
    task,
    subtask: csi >= 0 ? task.subtasks[csi] : null,
    pillarStats: entry,
    rankedPillars,
  };
}

// Picks the single subtask to recommend right now.
//   heldTaskKey      — { projectId, taskId } of the task currently in view,
//                       for continuity: stay on it while it still has an
//                       eligible subtask rather than re-ranking pillars.
//   overridePillarId — "Something else" — user picked a pillar directly.
//   todayKey         — Islamic-day key (see islamic-day-store.js), governs
//                       snooze expiry.
// Returns null when nothing is actionable anywhere today.
export function recommendOrientation({ projects, tasksByProject, heldTaskKey, overridePillarId, todayKey }) {
  if (heldTaskKey?.projectId && heldTaskKey?.taskId) {
    const heldTask = (tasksByProject[heldTaskKey.projectId] || [])
      .find((t) => t.id === heldTaskKey.taskId);
    const subtask = findNextEligibleSubtask(heldTask, todayKey);
    if (subtask) {
      const project = projects.find((p) => p.id === heldTaskKey.projectId);
      const { pillarId, submoduleId } = resolveSubmoduleFromProject(project);
      const rankedPillars = rankPillars(projects, tasksByProject);
      const pillarStats = rankedPillars.find((r) => r.pillar.id === pillarId) || null;
      return {
        reason: 'held',
        wasSetAside: false,
        pillar: getPillarById(pillarId),
        tier: getProjectLevel(heldTaskKey.projectId),
        submoduleId: submoduleId ?? heldTask.submoduleId,
        project,
        task: heldTask,
        subtask,
        pillarStats,
        rankedPillars,
      };
    }
  }

  const rankedPillars = rankPillars(projects, tasksByProject);
  const targetEntry = overridePillarId
    ? rankedPillars.find((r) => r.pillar.id === overridePillarId)
    : rankedPillars[0];

  if (targetEntry) {
    const found = findActiveBoardInPillarTier(
      targetEntry.pillar.id, targetEntry.tier, projects, tasksByProject, todayKey
    );
    if (found && found.seq.actionable) {
      return boardRecommendation({
        reason: overridePillarId ? 'override' : 'ranked',
        wasSetAside: !!overridePillarId && overridePillarId !== rankedPillars[0]?.pillar.id,
        entry: targetEntry,
        found,
        rankedPillars,
      });
    }
  }

  // Fall-through: the target pillar has nothing actionable today (fully done or
  // its current tasks are all snoozed) — move to the next ranked pillar. This is
  // the cross-pillar switch the "Not today" flow relies on.
  for (const entry of rankedPillars) {
    if (targetEntry && entry.pillar.id === targetEntry.pillar.id) continue;
    const found = findActiveBoardInPillarTier(entry.pillar.id, entry.tier, projects, tasksByProject, todayKey);
    if (found && found.seq.actionable) {
      return boardRecommendation({ reason: 'ranked', wasSetAside: false, entry, found, rankedPillars });
    }
  }

  return null;
}

// Builds the full seven-pillar carousel model for the orientation screen.
// Unlike recommendOrientation (which returns the single next subtask), this
// returns one card per Maqasid pillar in canonical order (faith → … → ummah,
// stable like the balance strip), each carrying that pillar's active-tier
// progress and its own current board's step chain — so every card can render
// independently while exactly one is flagged `isRecommended`.
//
// `recommendedPillarId` is whatever recommendOrientation would surface right
// now (inheriting its fall-through). It is null when nothing is actionable
// anywhere — no card is flagged.
//
// Per card:
//   tier/ratio/done/total — from getPillarActiveTierRatio (pillar-wide)
//   board                 — the current board's full sequence (see
//                            deriveBoardSequence) when actionable, else null
//   task/currentTaskIndex — the board's current task + its index, or null/-1
//   subtask/currentSubtaskIndex — the current step within that task
//   steps                 — [{ subtask, state }] for the current task
//   taskStats             — done/total subtasks within the current task
//   seeded                — pillar owns ≥1 subtask across any tier; false → the
//                            card renders "no steps yet" instead of "caught up"
//   hasEligible           — false → render the card's "nothing right now" state
export function buildOrientationCarousel({ projects, tasksByProject, todayKey }) {
  const recommended = recommendOrientation({ projects, tasksByProject, todayKey });
  const recommendedPillarId = recommended?.pillar?.id ?? null;

  const cards = MAQASID_CORE_PILLARS.map((pillar) => {
    const active = getPillarActiveTierRatio(pillar.id, projects, tasksByProject);
    const found = findActiveBoardInPillarTier(pillar.id, active.tier, projects, tasksByProject, todayKey);
    // Only an actionable board populates the step fields; a snoozed-only or
    // fully-complete pillar renders identically to "nothing eligible" (task /
    // subtask / board null), so card faces keep their historical behaviour.
    const actionable = !!(found && found.seq.actionable);
    const seq = actionable ? found.seq : null;
    const project = actionable ? found.project : null;

    const currentTaskIndex = seq ? seq.currentTaskIndex : -1;
    const task = seq ? seq.tasks[currentTaskIndex].task : null;
    const subSteps = task ? deriveSubtaskSteps(task) : { currentSubtaskIndex: -1, steps: [] };
    const currentSubtaskIndex = subSteps.currentSubtaskIndex;
    const subtask = task && currentSubtaskIndex >= 0 ? task.subtasks[currentSubtaskIndex] : null;

    const subtasks = task?.subtasks ?? [];
    let taskDone = 0;
    for (const st of subtasks) if (isSubtaskSatisfied(st)) taskDone += 1;

    // "Seeded" = the pillar owns at least one subtask across ANY tier. The
    // active-tier `total` below can be 0 for a fully-complete pillar whose last
    // tier was never populated, so it can't tell "no tasks seeded yet" apart
    // from "all done" — this can. Drives the card's empty-vs-caught-up face so a
    // never-populated pillar never masquerades as "Nothing left for today".
    const seeded = TIERS.some(
      (t) => getPillarTierSubtaskStats(pillar.id, t, projects, tasksByProject).total > 0,
    );

    return {
      pillar,
      tier: active.tier,
      ratio: active.ratio,
      done: active.done,
      total: active.total,
      seeded,
      submoduleId: seq?.submoduleId ?? task?.submoduleId ?? null,
      project,
      board: seq,
      task,
      currentTaskIndex,
      subtask,
      currentSubtaskIndex,
      steps: subSteps.steps,
      taskStats: { done: taskDone, total: subtasks.length },
      hasEligible: actionable,
      isRecommended: pillar.id === recommendedPillarId,
    };
  });

  return { cards, recommendedPillarId };
}
