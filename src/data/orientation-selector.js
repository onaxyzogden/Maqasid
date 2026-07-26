// Orientation screen selector — picks the single next subtask to recommend.
//
// Ranking respects necessity tier (Daruriyyat/Hajiyat/Tahsiniyat): each pillar
// is ranked by its OWN first-incomplete tier ratio, never a cross-tier blend.
// A pillar's core work must be exhausted before its growth work counts toward
// ranking, and growth before excellence. Pillars are then ranked ascending by
// that ratio (least-progressed-at-its-active-tier first).
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

// Task urgency ranking for within-tier ordering. Mirrors the app's four
// priority levels (see DashboardView's byPriority map); an unknown or absent
// priority sorts last (rank 9) so it never jumps ahead of an explicit
// Urgent/High task.
const PRIORITY_RANK = { urgent: 0, high: 1, medium: 2, low: 3 };

// First task in a pillar+tier with an eligible (not done/N-A/snoozed-today)
// subtask. Tasks are walked most-urgent-first (priority, then authored `order`)
// so a pillar's Urgent/High work surfaces ahead of lower-priority tasks even
// when the latter were seeded earlier — this is spec §4's "most urgent task".
// Project ordering stays id-deterministic so the same state always recommends
// the same thing.
export function findFirstEligibleInPillarTier(pillarId, tier, projects, tasksByProject, todayKey) {
  const tierProjects = getPillarProjectsAtTier(pillarId, tier, projects)
    .slice()
    .sort((a, b) => a.id.localeCompare(b.id));
  for (const project of tierProjects) {
    const tasks = (tasksByProject[project.id] || [])
      .slice()
      .sort((a, b) =>
        (PRIORITY_RANK[a.priority] ?? 9) - (PRIORITY_RANK[b.priority] ?? 9)
        || (a.order ?? 0) - (b.order ?? 0)
      );
    for (const task of tasks) {
      const subtask = (task.subtasks || []).find((st) => isSubtaskEligible(st, todayKey));
      if (subtask) return { project, task, subtask };
    }
  }
  return null;
}

// Next eligible subtask within an already-known task (held-task continuity —
// after Mark done/Doesn't apply, stay on the same task if it has more work).
export function findNextEligibleSubtask(task, todayKey) {
  if (!task) return null;
  return (task.subtasks || []).find((st) => isSubtaskEligible(st, todayKey)) || null;
}

// Picks the single subtask to recommend right now.
//   heldTaskKey      — { projectId, taskId } of the task currently in view,
//                       for continuity: stay on it while it still has
//                       eligible subtasks rather than re-ranking pillars.
//   overridePillarId — "Something else" — user picked a pillar directly.
//   todayKey         — Islamic-day key (see islamic-day-store.js), governs
//                       snooze expiry.
// Returns null when nothing is eligible anywhere today.
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
    const found = findFirstEligibleInPillarTier(
      targetEntry.pillar.id, targetEntry.tier, projects, tasksByProject, todayKey
    );
    if (found) {
      const { submoduleId } = resolveSubmoduleFromProject(found.project);
      return {
        reason: overridePillarId ? 'override' : 'ranked',
        wasSetAside: !!overridePillarId && overridePillarId !== rankedPillars[0]?.pillar.id,
        pillar: targetEntry.pillar,
        tier: targetEntry.tier,
        submoduleId: submoduleId ?? found.task.submoduleId,
        project: found.project,
        task: found.task,
        subtask: found.subtask,
        pillarStats: targetEntry,
        rankedPillars,
      };
    }
  }

  for (const entry of rankedPillars) {
    if (targetEntry && entry.pillar.id === targetEntry.pillar.id) continue;
    const found = findFirstEligibleInPillarTier(entry.pillar.id, entry.tier, projects, tasksByProject, todayKey);
    if (found) {
      const { submoduleId } = resolveSubmoduleFromProject(found.project);
      return {
        reason: 'ranked',
        wasSetAside: false,
        pillar: entry.pillar,
        tier: entry.tier,
        submoduleId: submoduleId ?? found.task.submoduleId,
        project: found.project,
        task: found.task,
        subtask: found.subtask,
        pillarStats: entry,
        rankedPillars,
      };
    }
  }

  return null;
}

// Builds the full seven-pillar carousel model for the orientation screen.
// Unlike recommendOrientation (which returns the single next subtask), this
// returns one card per Maqasid pillar in canonical order (faith → … → ummah,
// stable like the balance strip), each carrying that pillar's active-tier
// progress and its own most-urgent eligible task/subtask — so every card can
// render independently while exactly one is flagged `isRecommended`.
//
// `recommendedPillarId` is whatever recommendOrientation would surface right
// now (inheriting its fall-through: if the weakest pillar has nothing eligible
// today, the flag moves to the pillar that actually gets recommended). It is
// null when nothing is eligible anywhere — no card is flagged.
//
// Per card:
//   tier/ratio/done/total — from getPillarActiveTierRatio (pillar-wide, the
//                            first tier with open work; 0/0 tiers fall through)
//   project/task/subtask  — this pillar's most-urgent eligible next step, or
//                            null when it has none (all done/N-A/snoozed today)
//   taskStats             — done/total subtasks within that one task (the card
//                            progress bar), not the whole tier
//   hasEligible           — false → render the card's "nothing right now" state
export function buildOrientationCarousel({ projects, tasksByProject, todayKey }) {
  const recommended = recommendOrientation({ projects, tasksByProject, todayKey });
  const recommendedPillarId = recommended?.pillar?.id ?? null;

  const cards = MAQASID_CORE_PILLARS.map((pillar) => {
    const active = getPillarActiveTierRatio(pillar.id, projects, tasksByProject);
    const found = findFirstEligibleInPillarTier(pillar.id, active.tier, projects, tasksByProject, todayKey);
    const task = found?.task ?? null;
    const subtasks = task?.subtasks ?? [];
    let taskDone = 0;
    for (const st of subtasks) if (isSubtaskSatisfied(st)) taskDone += 1;
    const submoduleId = found
      ? (resolveSubmoduleFromProject(found.project).submoduleId ?? found.task.submoduleId ?? null)
      : null;

    return {
      pillar,
      tier: active.tier,
      ratio: active.ratio,
      done: active.done,
      total: active.total,
      submoduleId,
      project: found?.project ?? null,
      task,
      subtask: found?.subtask ?? null,
      taskStats: { done: taskDone, total: subtasks.length },
      hasEligible: !!found,
      isRecommended: pillar.id === recommendedPillarId,
    };
  });

  return { cards, recommendedPillarId };
}
