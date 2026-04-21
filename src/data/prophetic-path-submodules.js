// Time-of-day → submodule mapping for the Prophetic Path planner.
// Each key is a PropheticPath node id (see src/components/islamic/PropheticPath.jsx).
// Each value is a list of canonical submodule ids to pull tasks from for that window.
//
// Canonical submodule ids follow MAQASID_PILLARS.subModuleIds in src/data/maqasid.js:
//   faith-shahada | faith-salah | faith-zakah | faith-siyam | faith-hajj
//   life-physical | life-mental | life-safety | life-social
//   intellect-learning | intellect-thinking | intellect-cognitive | intellect-professional
//   family-marriage | family-parenting | family-kinship | family-home | family-office
//   wealth-earning | wealth-financial | wealth-ownership | wealth-circulation
//   env-resource | env-waste | env-ecosystem | env-sourcing
//   work | money | people | office | tech
//
// Iterate freely — this file is the single source of truth for which modules
// surface at which time of day.

// Each entry is either a plain array of canonical submodule ids (legacy shape)
// or a richer object: { submodules, matchers }.
//   - submodules: pre-filter scope (same as the legacy array form)
//   - matchers:   array of RegExp that a task TITLE must match against.
//                 If at least one matcher hits, the task is included.
//                 If matchers filter out every task, buildTasksForNode falls
//                 back to the unfiltered submodule pool for that node.
//
// Matchers below are drafted from each node's descriptive text. Iterate freely.
export const TOD_SUBMODULES = {
  isha: {
    submodules: ['faith-salah', 'faith-siyam', 'life-mental', 'family-home'],
    matchers: [
      /\bnight\b/i,
      /\b(?:evening|bedtime|sleep|before\s+sleep)\b/i,
      /\b(?:tahajjud|qiyam(?:\s*al-?layl)?|witr|isha)\b/i,
      /\b(?:third|last\s+third)\s+of\s+the\s+night\b/i,
      /\b(?:wind\s*down|rest|stillness|surrender)\b/i,
      /\b(?:evening\s+adhkar|adhkar.*(?:night|sleep|evening))\b/i,
    ],
  },
  tahajjud: {
    submodules: ['faith-salah', 'intellect-thinking'],
    matchers: [
      /\btahajjud\b/i,
      /\bqiyam(?:\s*al-?layl)?\b/i,
      /\bnight\s+prayer\b/i,
      /\b(?:du['ʿ]?a|dua|supplication|munajat)\b/i,
      /\b(?:reflect|contemplat|tafakkur|meditat)/i,
      /\b(?:guidance|istikhara|decision)\b/i,
      /\bkhushu['ʿ]?\b/i,
    ],
  },
  fajr: {
    submodules: ['faith-shahada', 'faith-salah', 'life-physical'],
    matchers: [
      /\b(?:fajr|dawn|sunrise|pre-?dawn)\b/i,
      /\bmorning\s+(?:routine|adhkar|supplication)/i,
      /\b(?:quran|qur['ʾ]?an|recit)/i,
      /\b(?:dhikr|remembrance|adhkar)\b/i,
      /\bwudu\b/i,
      /\b(?:begin|start).*\bday\b/i,
      /\btawhid\b/i,
      /\bshahada\b/i,
    ],
  },
  morning: {
    submodules: ['intellect-professional', 'wealth-earning', 'work', 'intellect-learning'],
    matchers: [
      /\b(?:work|project|task|deliverable|goal)\b/i,
      /\b(?:productiv|focus|deep\s+work)/i,
      /\b(?:learn|stud|read|skill|knowledge|course)/i,
      /\b(?:career|profession|job|role)\b/i,
      /\b(?:earn|income|business|revenue|client|customer)\b/i,
      /\b(?:plan|schedul|prioriti[sz]e|roadmap)/i,
      /\b(?:meeting|email|communicat)/i,
      /\bcraft|mastery|excellence\b/i,
    ],
  },
  dhuhr: {
    submodules: ['faith-salah', 'life-social', 'people'],
    matchers: [
      /\b(?:dhuhr|zuhr|midday|noon)\b/i,
      /\b(?:reset|realign|refocus|recenter|pause|break)\b/i,
      /\b(?:intention|niyyah|purpose|mission)\b/i,
      /\b(?:prayer\s+on\s+time|five\s+daily\s+prayers|salah)\b/i,
      /\b(?:colleague|team|coworker|social|character|akhlaq)/i,
      /\b(?:honest|truthful|trust|amanah)/i,
    ],
  },
  asr: {
    submodules: ['faith-salah', 'wealth-earning', 'wealth-financial', 'intellect-cognitive'],
    matchers: [
      /\b(?:asr|afternoon|late\s+afternoon)\b/i,
      /\b(?:close\s*out|wrap|complete|finish|finali[sz])/i,
      /\b(?:review|reflect|evaluat|audit)/i,
      /\b(?:financ|invest|budget|debt|riba|zakat|zakah)/i,
      /\b(?:halal|haram)\b/i,
      /\b(?:income|earning|wealth)/i,
      /\b(?:discipline|habit|consistency)/i,
    ],
  },
  maghrib: {
    submodules: ['faith-salah', 'family-marriage', 'family-parenting', 'family-kinship', 'family-home'],
    matchers: [
      /\b(?:maghrib|sunset|dusk|evening)\b/i,
      /\b(?:family|spouse|wife|husband|child|children|parent|kin|sibling|relative)\b/i,
      /\b(?:dinner|iftar|meal)/i,
      /\b(?:home|household|household\s+adhkar)\b/i,
      /\b(?:transition|end.*day|close.*day)\b/i,
      /\b(?:marriage|parenting|tarbiyah)/i,
    ],
  },
};

// project.moduleId → canonical submodule id.
// Mirrors the logic in src/store/task-store.js (resolveSubmoduleFromProject)
// but in reverse-lookup form so we can filter projects by TOD target.
export const MODULE_ID_TO_SUBMODULE_ID = {
  // Faith (project moduleIds use legacy short forms)
  shahada: 'faith-shahada',
  salat: 'faith-salah',
  zakat: 'faith-zakah',
  siyam: 'faith-siyam',
  hajj: 'faith-hajj',
  // Life
  physical: 'life-physical',
  mental: 'life-mental',
  safety: 'life-safety',
  social: 'life-social',
  // Intellect
  learning: 'intellect-learning',
  thinking: 'intellect-thinking',
  cognitive: 'intellect-cognitive',
  professional: 'intellect-professional',
  // Family
  marriage: 'family-marriage',
  parenting: 'family-parenting',
  kinship: 'family-kinship',
  home: 'family-home',
  'family-office': 'family-office',
  // Wealth
  earning: 'wealth-earning',
  financial: 'wealth-financial',
  ownership: 'wealth-ownership',
  circulation: 'wealth-circulation',
  // Standalone / BBOS-Biz
  work: 'work',
  money: 'money',
  people: 'people',
  office: 'office',
  tech: 'tech',
};

// Hour-range fallback for when no active prayer window is returned by
// usePrayerTimes. Returns the PropheticPath node id.
export function inferNodeFromHour(date = new Date()) {
  const h = date.getHours() + date.getMinutes() / 60;
  if (h < 4) return 'isha';
  if (h < 5.5) return 'tahajjud';
  if (h < 7) return 'fajr';
  if (h < 12) return 'morning';
  if (h < 15) return 'dhuhr';
  if (h < 18) return 'asr';
  if (h < 20) return 'maghrib';
  return 'isha';
}

// Project id encodes Maqasid level via suffix. 1 = Daruriyyat, 2 = Hajiyyat, 3 = Tahsiniyyat.
export function levelFromProjectId(projectId) {
  if (!projectId) return 3;
  if (projectId.endsWith('_core')) return 1;
  if (projectId.endsWith('_growth')) return 2;
  if (projectId.endsWith('_excellence')) return 3;
  return 3;
}

export const LEVEL_LABEL = { 1: 'L1', 2: 'L2', 3: 'L3' };
export const LEVEL_FULL_LABEL = {
  1: 'Daruriyyat',
  2: 'Hajiyyat',
  3: 'Tahsiniyyat',
};

const PRIORITY_RANK = { urgent: 0, high: 1, medium: 2, low: 3 };

// Build the sorted task list for a given TOD node.
//   nodeId         — one of the keys in TOD_SUBMODULES
//   projects       — array from useProjectStore().projects
//   tasksByProject — object from useTaskStore().tasksByProject
//   limit          — optional cap on returned rows (default 8)
// Returns: [{ id, projectId, title, priority, dueDate, _level, _submoduleId, _submoduleName }]
// Normalise a TOD entry (array or object) to { submodules, matchers }.
function resolveEntry(nodeId) {
  const raw = TOD_SUBMODULES[nodeId];
  if (!raw) return { submodules: [], matchers: null };
  if (Array.isArray(raw)) return { submodules: raw, matchers: null };
  return {
    submodules: raw.submodules || [],
    matchers: (raw.matchers && raw.matchers.length > 0) ? raw.matchers : null,
  };
}

function titleMatches(title, matchers) {
  if (!matchers) return true;
  const t = title || '';
  for (const re of matchers) {
    if (re.test(t)) return true;
  }
  return false;
}

export function buildTasksForNode(nodeId, projects, tasksByProject, options = {}) {
  const { limit = 8, submoduleNameById = {} } = options;
  const { submodules: targetSubmodules, matchers } = resolveEntry(nodeId);
  if (targetSubmodules.length === 0) return [];
  const targetSet = new Set(targetSubmodules);

  const matchingProjects = (projects || []).filter((p) => {
    const canonical = MODULE_ID_TO_SUBMODULE_ID[p.moduleId] || p.moduleId;
    return canonical && targetSet.has(canonical);
  });

  // Collect all open tasks in the submodule scope (unfiltered pool).
  const scopePool = [];
  for (const project of matchingProjects) {
    const tasks = tasksByProject?.[project.id] || [];
    const canonical = MODULE_ID_TO_SUBMODULE_ID[project.moduleId] || project.moduleId;
    for (const t of tasks) {
      if (t.completedAt) continue;
      scopePool.push({
        id: t.id,
        projectId: project.id,
        title: t.title,
        priority: t.priority || 'medium',
        dueDate: t.dueDate || null,
        columnId: t.columnId,
        subtasks: t.subtasks || [],
        tags: t.tags || [],
        _level: levelFromProjectId(project.id),
        _submoduleId: canonical,
        _submoduleName: submoduleNameById[canonical] || canonical,
        _project: project,
      });
    }
  }

  // Apply content-matchers; if the filter leaves zero rows, fall back to the
  // unfiltered scope pool so the user still sees something for that window.
  let rows = scopePool;
  if (matchers) {
    const matched = scopePool.filter((r) => titleMatches(r.title, matchers));
    rows = matched.length > 0 ? matched : scopePool;
  }

  rows.sort((a, b) => (
    (a._level - b._level)
    || (PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority])
    || (new Date(a.dueDate || 8640000000000000) - new Date(b.dueDate || 8640000000000000))
  ));

  // Dedupe by (normalized title + level) — legacy migrations sometimes leave
  // overlapping boards (e.g., faith_sawm_core + faith_siyam_core) with
  // identical seed tasks. Keep the first occurrence in sorted order.
  const seen = new Set();
  const deduped = [];
  for (const row of rows) {
    const key = `${row._level}|${(row.title || '').trim().toLowerCase()}`;
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(row);
    if (deduped.length >= limit) break;
  }
  return deduped;
}
