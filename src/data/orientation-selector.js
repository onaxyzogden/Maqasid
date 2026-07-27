// Orientation screen selector — picks the single next subtask to recommend and
// builds the seven-pillar carousel model.
//
// Ranking respects necessity tier (Daruriyyat/Hajiyat/Tahsiniyat): each pillar
// is ranked by its OWN first-incomplete tier ratio, never a cross-tier blend,
// then ascending by that ratio (least-progressed-at-its-active-tier first).
//
// Within a pillar+tier, work is SEQUENTIALLY LOCKED: a board (project) holds an
// ordered list of tasks, each an ordered list of subtasks, and only the first
// not-yet-complete task — and within it the first not-yet-satisfied subtask — is
// actionable. Everything else is visible but locked. Order is ARRAY ORDER of
// `tasksByProject[boardId]`; the display label `task.n` is never consulted for
// sequencing. "Not today" snoozes the whole current task, so its board drops out
// for the day and selection falls through to the next actionable board in the
// pillar, then to the next pillar.
//
// Pure functions only — no React, no Zustand subscriptions. Callers pass in
// `projects`/`tasksByProject` snapshots read from the stores.

import { MAQASID_CORE_PILLARS, getPillarById } from './maqasid';
import { resolveSubmoduleFromProject } from './maqasid-resolve';
import { getProjectLevel } from '../store/task-store';

export const TIERS = ['core', 'growth', 'excellence'];

export const TIER_META = {
  core: { label: 'Necessities', ar: 'Daruriyyat' },
  growth: { label: 'Needs', ar: 'Hajiyat' },
  excellence: { label: 'Excellence', ar: 'Tahsiniyat' },
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

// Index of a board's current task = first task (in ARRAY ORDER) not yet
// complete. -1 ⇒ every task is complete (the board is done). Array order is the
// whole sequence; priority and `task.n` are never consulted here.
export function findCurrentTaskIndex(tasks) {
  return (tasks ?? []).findIndex((t) => !isTaskComplete(t));
}

// Index of the current subtask within a task = first not-satisfied subtask.
// -1 ⇒ the task is complete.
export function findCurrentSubtaskIndex(task) {
  return (task?.subtasks ?? []).findIndex((st) => !isSubtaskSatisfied(st));
}

// Display state of a task pill relative to the board's current task. `snoozed`
// is latent under cross-board selection (a board whose current task is snoozed
// is skipped, not surfaced) but kept so the model — and any future surface that
// does show it — stays honest.
export function taskPillState(index, currentTaskIndex, task, todayKey) {
  if (currentTaskIndex < 0 || index < currentTaskIndex) return 'done';
  if (index > currentTaskIndex) return 'locked';
  return isTaskSnoozedToday(task, todayKey) ? 'snoozed' : 'current';
}

// Display state of a subtask chip relative to the current subtask.
export function subtaskChipState(index, currentSubtaskIndex) {
  if (currentSubtaskIndex < 0 || index < currentSubtaskIndex) return 'done';
  if (index > currentSubtaskIndex) return 'locked';
  return 'current';
}

// Spreadsheet-style label (A…Z, AA, AB, …) so a long task chain never produces a
// non-letter glyph past 'Z'.
function taskLetter(index) {
  let n = index;
  let out = '';
  do {
    out = String.fromCharCode(65 + (n % 26)) + out;
    n = Math.floor(n / 26) - 1;
  } while (n >= 0);
  return out;
}

// The full ordered task chain for one board, each task carrying its stepper
// display state + letter label. `actionable` is true only when the board has a
// current task that is NOT snoozed today — i.e. there is a step to act on now.
export function deriveBoardSequence(project, tasks, todayKey) {
  const list = tasks ?? [];
  const currentTaskIndex = findCurrentTaskIndex(list);
  const currentTask = currentTaskIndex >= 0 ? list[currentTaskIndex] : null;
  const actionable = currentTaskIndex >= 0 && !isTaskSnoozedToday(currentTask, todayKey);
  const { submoduleId } = resolveSubmoduleFromProject(project);
  return {
    projectId: project?.id ?? null,
    submoduleId: submoduleId ?? null,
    currentTaskIndex,
    actionable,
    tasks: list.map((task, i) => ({
      task,
      state: taskPillState(i, currentTaskIndex, task, todayKey),
      letter: taskLetter(i),
    })),
  };
}

// The ordered subtask "steps" of a task, each with its chip display state.
export function deriveSubtaskSteps(task) {
  const currentSubtaskIndex = findCurrentSubtaskIndex(task);
  return {
    currentSubtaskIndex,
    steps: (task?.subtasks ?? []).map((subtask, i) => ({
      subtask,
      state: subtaskChipState(i, currentSubtaskIndex),
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
// outranks excellence — this is the fiqh triage (Daruriyyat > Hajiyat >
// Tahsiniyat), not just "don't blend tiers within one pillar". Ties within a
// tier break by ratio ascending (least-progressed pillar first).
function rankPillars(projects, tasksByProject) {
  return MAQASID_CORE_PILLARS
    .map((pillar) => ({ pillar, ...getPillarActiveTierRatio(pillar.id, projects, tasksByProject) }))
    .sort((a, b) => TIER_RANK[a.tier] - TIER_RANK[b.tier] || a.ratio - b.ratio);
}

// The board (project) a pillar+tier should surface right now under sequential
// locking. Boards are walked id-deterministically; a fully-complete board (no
// current task) is skipped. The FIRST board whose current task is actionable
// today wins. If none is actionable but some have only a snoozed current task,
// the first such board is returned as a display fallback (its `seq.actionable`
// is false) — callers that need real work check `seq.actionable` and fall
// through. Returns { project, seq } or null when the pillar+tier has no
// incomplete board at all.
export function findActiveBoardInPillarTier(pillarId, tier, projects, tasksByProject, todayKey) {
  const tierProjects = getPillarProjectsAtTier(pillarId, tier, projects)
    .slice()
    .sort((a, b) => a.id.localeCompare(b.id));
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
