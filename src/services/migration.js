// Migration service — runs synchronously before React mounts
// Schema version: 5.0 — unified contacts model

import { listKeys } from './storage';
import { repairBoardTasks, taskHasState } from './mojibake';
import { genSubtaskId } from './id';

const PREFIX = 'bbiz_';
const SCHEMA_VERSION = '5.0';
const MOJIBAKE_FLAG = 'mojibake_titles_repaired';
const DEDUPE_FLAG = 'seed_dedupe_v1';
const FOLDIN_FLAG = 'seed_subtask_foldin_v1';
const ORDER_V2_FLAG = 'seed_subtask_order_v2';
const RENAME_FLAG = 'seed_subtask_rename_v1';
const ORDER_V3_FLAG = 'seed_subtask_order_v3';

// Tasks deleted from the seed files on 2026-07-27 as duplicates of a sibling on
// the same board. Titles are byte-for-byte copies taken from the seed file
// BEFORE deletion — the seed<->storage join is exact title equality, so these
// strings are the only handle on the stored rows.
// See wiki/decisions/2026-07-27-milos-ummah-task-dedupe.md
const REMOVED_SEED_TASKS = {
  ummah_community_growth: [
    'Build a community dispute resolution (sulh) mechanism',
    'Establish a community education institution (halaqa or weekend school)',
    'Build a youth mentorship programme — invest in the next generation of community leaders',
    'Establish a community treasury or waqf — build institutional financial sustainability',
  ],
  'ummah_moontrance-land_excellence': [
    'Develop a replicable Islamic land stewardship model — document, teach, and support new projects',
  ],
};

// Curated subtask order for the four tasks that received a subtask folded back
// in from the removed duplicates above. The boot backfill already DELIVERS a new
// seed subtask by title (project-store.js), but it appends at the END and runs on
// requestIdleCallback after mount — so on an existing board the folded rows would
// land last and stay there, and a migration that only re-ordered would be undone
// by that append. This one-shot therefore performs the insertion itself, in seed
// order, before React mounts; afterwards the backfill's set difference is empty.
//
// Hardcoded rather than derived from the seed file on purpose: the seed modules
// are lazy-loaded (seed-hydrator.js) and runMigrations() sits on the pre-mount
// boot path, so importing the 14k-line Ummah seed here would regress d9ca679.
// The drift guard in src/data/seed-tasks/__tests__/subtask-foldin.test.js
// deep-equals this table against the seed so it cannot silently diverge.
// Approval gate: stages/implement-subtask-foldin-review.md
export const FOLDED_SUBTASK_ORDER = {
  ummah_community_growth: {
    'Establish a community dispute resolution (sulh) process — prevent conflicts from escalating': [
      'Identify 2-3 respected, neutral community members to serve as sulh mediators',
      'Draft a simple sulh process document — how disputes are reported, mediated, and resolved',
      "Establish a referral network for cases beyond the community's capacity",
      'Present the sulh process to the community and gain buy-in from leadership',
      'Handle the first dispute through the sulh process — learn from the experience',
      'Train additional mediators and establish an annual rotation to prevent burnout',
    ],
    'Establish community education — launch a regular halaqa or weekend Islamic school programme': [
      'Assess the educational gaps in your community — survey members on what they want to learn',
      'Recruit a qualified teacher or scholar to lead the educational programme',
      'Design a structured curriculum with clear learning outcomes',
      'Secure a venue and set a consistent weekly schedule for the halaqa or school',
      'Launch the first session and establish a welcoming, structured learning environment',
      'Collect feedback after the first month and adjust the programme based on community input',
    ],
    'Develop a comprehensive youth programme rooted in Islamic identity': [
      'Survey youth to understand their actual needs, struggles, and aspirations',
      'Recruit and train youth mentors from within the community',
      'Launch a biweekly youth halaqa addressing real-life challenges',
      'Integrate sports, social activities, and creative outlets into the youth programme',
      'Create a youth leadership pipeline — identify, develop, and deploy young leaders',
      'Review the programme after three months — assess impact and refine the approach',
    ],
    'Establish a community treasury (bayt al-mal) for collective financial strength': [
      'Audit current community finances — income, expenses, and gaps',
      'Establish separate funds for operations, emergency aid, and development',
      'Implement transparent financial reporting to the community',
      'Launch a regular giving programme to build sustainable income',
      'Explore establishing a community waqf (endowment) for long-term sustainability',
      'Form a waqf committee with financial, legal, and community representation',
      'Draft the waqf deed — define the purpose, beneficiaries, and management structure',
    ],
  },
};

// Curated subtask order for two Before/After sequence-correctness fixes (2026-08):
// the adhan-response subtask moves ahead of siwak/wudu on the pre-prayer sunnah
// task, and the Witr Qunut moves ahead of the post-Witr tasbih on the Tahajjud
// after board. Unlike FOLDED_SUBTASK_ORDER above (which folds subtasks orphaned
// by a seed deletion back onto a surviving sibling), this purely re-orders rows
// that already exist on the board — same `alignSubtaskOrder` mechanism, reused.
// The drift guard in src/data/seed-tasks/__tests__/prayer-order.test.js pins the
// pre-prayer-sunnah order against the seed; see wiki/decisions for the Witr one.
const PRE_PRAYER_SUNNAH_ORDER = {
  'Observe the pre-prayer sunnah before every salah (siwak, wudu, adhan response)': [
    "Repeat after the mu'adhdhin and make du'a after the adhan",
    'Use the siwak before wudu and before prayer',
    'Perform wudu thoroughly — wet every part, especially the heels',
    'Use a sutrah (barrier) when praying in an open space',
  ],
};

export const REORDERED_SUBTASK_ORDER = {
  // Generic sunan, duplicated onto all five daily prayers' Before boards by
  // classifyTask() in prayer-seed-tasks.js.
  prayer_fajr_before: PRE_PRAYER_SUNNAH_ORDER,
  prayer_dhuhr_before: PRE_PRAYER_SUNNAH_ORDER,
  prayer_asr_before: PRE_PRAYER_SUNNAH_ORDER,
  prayer_maghrib_before: PRE_PRAYER_SUNNAH_ORDER,
  prayer_isha_before: PRE_PRAYER_SUNNAH_ORDER,
  // "Seal the night with the post-Witr adhkar..." is tagged transition:post-witr,
  // which classifyTask() routes to prayer_tahajjud_after (Witr closes Tahajjud,
  // not Isha, in this app's model).
  prayer_tahajjud_after: {
    "Seal the night with the post-Witr adhkar and last-third du'a": [
      "Recite the Witr Qunut du'a ('Allahumma-hdini fi man hadayt...')",
      "Say 'Subhanal-Malikil-Quddus' three times after Witr, lengthening the third",
      "Make du'a and istighfar in the last third of the night",
    ],
  },
};

// --- 2026-08-27 sequence-correctness pass (Tahajjud waking / Sunan al-Nawm) ---
// Both tasks live on TWO boards: their source board in faith-seed-tasks.js and
// the generated prayer board classifyTask() copies them onto. The 2026-08 pass
// listed only the prayer_* boards and left the Faith-pillar copies in the old
// order; this table lists both so the two surfaces cannot disagree.

const TAHAJJUD_WAKING_ORDER = {
  'Rise for Tahajjud with the prophetic waking protocol': [
    "Recite the wake-during-night du'a of tawhid, hamd, and istighfar",
    'Wipe sleep from the face and recite the last 10 verses of Al-Imran (3:190-200)',
    'Use the siwak before standing for Qiyam',
    'Make wudu before standing for Qiyam',
    "Open Tahajjud with the prophetic istiftah du'a",
  ],
};

const SUNAN_AL_NAWM_ORDER = {
  'Sunan al-Nawm — observe the prophetic etiquette of sleep': [
    'Make wudu before getting into bed',
    'Recite Surah al-Mulk before sleep on at least 4 nights this week',
    'Recite Ayat al-Kursi on going to bed',
    'Sleep on the right side and recite the dua of sleeping',
  ],
};

export const REORDERED_SUBTASK_ORDER_V3 = {
  // "Rise for Tahajjud..." is tagged transition:tahajjud-waking, which
  // classifyTask() routes to prayer_tahajjud_before. `Make wudu before standing
  // for Qiyam` is NEW in the seed: alignSubtaskOrder's `i === -1` branch creates
  // the row, so listing it here is the whole delivery mechanism.
  faith_salah_core: TAHAJJUD_WAKING_ORDER,
  prayer_tahajjud_before: TAHAJJUD_WAKING_ORDER,
  // "Sunan al-Nawm..." carries transition:bedtime but NO prayer-phase:* tag,
  // and classifyTask() returns [] for a task with neither before nor after —
  // so it is never copied onto prayer_isha_after and faith_salah_growth is its
  // only board. Listing the prayer board here would be dead weight the
  // prayer-order drift guard correctly rejects.
  // Runs AFTER renameSeedSubtaskTitles: `Recite Ayat al-Kursi on going to bed`
  // is a rename of `...as the last thing said before sleep`, and this table
  // joins on the NEW title.
  faith_salah_growth: SUNAN_AL_NAWM_ORDER,
};

// Subtask titles corrected in the seed after users already had rows in storage.
// A rename is NOT a re-order: alignSubtaskOrder joins on title, so an unrenamed
// stored row would be read as "ordered title missing" (it creates a fresh row)
// AND as "unrecognised user row" (it appends the old one) — a visible
// duplicate. This must therefore run FIRST, rewriting the title in place so the
// row keeps its `id` and its `done`.
export const SEED_SUBTASK_RENAMES = {
  faith_salah_growth: {
    'Sunan al-Nawm — observe the prophetic etiquette of sleep': {
      'Recite Ayat al-Kursi as the last thing said before sleep':
        'Recite Ayat al-Kursi on going to bed',
    },
  },
};

function read(key) {
  try { return JSON.parse(localStorage.getItem(PREFIX + key)); }
  catch (e) { console.warn('[bbiz:migration] read failed:', key, e); return null; }
}
function write(key, val) {
  try { localStorage.setItem(PREFIX + key, JSON.stringify(val)); }
  catch (e) {
    console.warn('[bbiz:migration] write failed:', key, e);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('bbiz:storage-error', {
        detail: { key, error: e, source: 'migration' },
      }));
    }
  }
}

const AVATAR_COLORS = [
  '#4ab8a8', '#8b5cf6', '#ec4899', '#f59e0b',
  '#14b8a6', '#22c55e', '#6366f1', '#06b6d4',
  '#ef4444', '#f97316', '#3b82f6', '#0ea5e9',
];

function avatarColor(id = '') {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = id.charCodeAt(i) + ((h << 5) - h);
  return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length];
}

function nanoidLite(len = 12) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let s = '';
  for (let i = 0; i < len; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

// One-shot repair of cp1252-over-UTF-8 mojibake in persisted task/subtask
// titles. The title is the join key that hydrates seed content by title, so a
// stale corrupt title (saved before the seed files were repaired) orphans its
// task from the now-clean seed — bare card, no sources, "Ungrounded". This
// reverses the exact corruption in place so the join re-matches, deduping any
// clean duplicate the idle backfill appended (never dropping a completion or
// snooze). Gated by its own flag, independent of SCHEMA_VERSION, so it runs
// once for existing 5.0 users without re-running the contacts migration.
export function repairMojibakeTaskTitles() {
  if (localStorage.getItem(PREFIX + MOJIBAKE_FLAG) === '1') return;
  let boards = 0;
  for (const key of listKeys('tasks_')) {
    const tasks = read(key);
    if (!Array.isArray(tasks) || tasks.length === 0) continue;
    const boardId = key.slice('tasks_'.length);
    const next = repairBoardTasks(tasks, boardId);
    if (next !== tasks) { write(key, next); boards++; }
  }
  localStorage.setItem(PREFIX + MOJIBAKE_FLAG, '1');
  if (boards) console.info(`[bbiz] mojibake title repair: ${boards} board(s) updated.`);
}

// Remove tasks whose seed entry was deleted as a duplicate. Pure: returns the
// same array reference when nothing is pruned, so callers can skip the write.
//
// Without this, a de-duplicated seed entry leaves a permanent orphan — the boot
// backfill skips any stored task with no title match (`if (!seed) return t`) and
// nothing anywhere prunes it. The orphan keeps its numeric `seedOrder`, so it
// holds a slot in the curated chain and still blocks sequential locking, while
// rendering bare: description/sources/tier live only in the bundle and can no
// longer be hydrated.
//
// A task the operator has worked on is NEVER deleted — `taskHasState` is the
// same predicate the mojibake dedup uses to pick a survivor. A kept duplicate
// becomes a bare orphan they can delete by hand; losing their work silently is
// the worse failure.
export function pruneRemovedSeedTasks(tasks, removedTitles, boardId) {
  if (!Array.isArray(tasks) || !removedTitles?.length) return { next: tasks, removed: [], kept: [] };
  const doomed = new Set(removedTitles);
  const removed = [];
  const kept = [];
  const next = tasks.filter((t) => {
    if (!doomed.has(t?.title)) return true;
    if (taskHasState(t, boardId)) { kept.push(t.title); return true; }
    removed.push(t.title);
    return false;
  });
  return { next: removed.length > 0 ? next : tasks, removed, kept };
}

// One-shot prune of the five duplicated Ummah tasks removed from the seed files
// on 2026-07-27. Runs after the mojibake repair so corrupted titles have already
// been restored to the exact strings this table matches on.
// Approval gate: stages/implement-ummah-dedupe-review.md
export function pruneDedupedSeedTasks() {
  if (localStorage.getItem(PREFIX + DEDUPE_FLAG) === '1') return;
  let removedCount = 0;
  const keptTitles = [];
  for (const [boardId, titles] of Object.entries(REMOVED_SEED_TASKS)) {
    const key = `tasks_${boardId}`;
    const tasks = read(key);
    if (!Array.isArray(tasks) || tasks.length === 0) continue;
    const { next, removed, kept } = pruneRemovedSeedTasks(tasks, titles, boardId);
    keptTitles.push(...kept);
    if (removed.length > 0) { write(key, next); removedCount += removed.length; }
  }
  localStorage.setItem(PREFIX + DEDUPE_FLAG, '1');
  if (removedCount) console.info(`[bbiz] Seed dedupe: ${removedCount} duplicate task(s) removed.`);
  if (keptTitles.length) {
    console.info(
      `[bbiz] Seed dedupe: ${keptTitles.length} duplicate task(s) kept because they carry your progress — ` +
      `delete them by hand if you no longer want them: ${keptTitles.map((t) => `"${t}"`).join(', ')}`
    );
  }
}

// Rebuild each listed task's `subtasks` to the curated seed order. Pure: returns
// the same array reference when nothing changes, so callers can skip the write.
//
// A stored row is REUSED where its title matches — keeping its `id` and its
// `done` flag — and a row is created only for a title with no stored match. A
// stored subtask absent from the order list is user-created: it is appended at
// the end, in its stored order. Nothing is ever dropped, including duplicate
// titles (each ordered slot consumes at most one stored row; leftovers survive
// as trailing rows).
//
// Guard: a task carrying ANY completed subtask is skipped whole. `done` travels
// with the title through the rebuild so a re-order cannot lose progress — this
// is belt-and-braces, and a skipped task still receives the folded rows from the
// boot backfill (appended at the end), so content arrives either way.
export function alignSubtaskOrder(tasks, orderTable) {
  if (!Array.isArray(tasks) || !orderTable) return { next: tasks, aligned: [], skipped: [] };
  const aligned = [];
  const skipped = [];
  const next = tasks.map((t) => {
    const order = orderTable[t?.title];
    if (!order?.length) return t;
    const stored = Array.isArray(t.subtasks) ? t.subtasks : [];
    if (stored.some((s) => s?.done === true)) { skipped.push(t.title); return t; }

    const taken = new Array(stored.length).fill(false);
    const rebuilt = order.map((title) => {
      const i = stored.findIndex((s, idx) => !taken[idx] && s?.title === title);
      if (i === -1) return { id: genSubtaskId(), title, done: false };
      taken[i] = true;
      return stored[i];
    });
    stored.forEach((s, i) => { if (!taken[i]) rebuilt.push(s); });

    const unchanged = rebuilt.length === stored.length && rebuilt.every((s, i) => s === stored[i]);
    if (unchanged) return t;
    aligned.push(t.title);
    return { ...t, subtasks: rebuilt };
  });
  return { next: aligned.length > 0 ? next : tasks, aligned, skipped };
}

// One-shot fold-in of the subtasks that lived only on the tasks pruned above.
// Runs after pruneDedupedSeedTasks so the removed tasks are gone and titles have
// already been mojibake-repaired to the exact strings this table matches on.
// Approval gate: stages/implement-subtask-foldin-review.md
export function foldInSeedSubtasks() {
  if (localStorage.getItem(PREFIX + FOLDIN_FLAG) === '1') return;
  let alignedCount = 0;
  const skippedTitles = [];
  for (const [boardId, orderTable] of Object.entries(FOLDED_SUBTASK_ORDER)) {
    const key = `tasks_${boardId}`;
    const tasks = read(key);
    if (!Array.isArray(tasks) || tasks.length === 0) continue;
    const { next, aligned, skipped } = alignSubtaskOrder(tasks, orderTable);
    skippedTitles.push(...skipped);
    if (next !== tasks) { write(key, next); alignedCount += aligned.length; }
  }
  localStorage.setItem(PREFIX + FOLDIN_FLAG, '1');
  if (alignedCount) console.info(`[bbiz] Seed subtask fold-in: ${alignedCount} task(s) re-ordered.`);
  if (skippedTitles.length) {
    console.info(
      `[bbiz] Seed subtask fold-in: ${skippedTitles.length} task(s) left in their stored order because ` +
      `they carry completed subtasks — the new steps will be appended at the end instead: ` +
      `${skippedTitles.map((t) => `"${t}"`).join(', ')}`
    );
  }
}

// One-shot re-order of subtasks whose seed sequence was corrected after users
// already had rows in storage (2026-08 Before/After sequence-correctness pass).
// Independent of FOLDIN_FLAG/foldInSeedSubtasks — that flag already fired for
// existing users and gates a different fix (orphaned rows, not a re-order), so
// this needed its own flag or those users would never receive the new order.
export function alignReorderedSubtasks() {
  if (localStorage.getItem(PREFIX + ORDER_V2_FLAG) === '1') return;
  let alignedCount = 0;
  const skippedTitles = [];
  for (const [boardId, orderTable] of Object.entries(REORDERED_SUBTASK_ORDER)) {
    const key = `tasks_${boardId}`;
    const tasks = read(key);
    if (!Array.isArray(tasks) || tasks.length === 0) continue;
    const { next, aligned, skipped } = alignSubtaskOrder(tasks, orderTable);
    skippedTitles.push(...skipped);
    if (next !== tasks) { write(key, next); alignedCount += aligned.length; }
  }
  localStorage.setItem(PREFIX + ORDER_V2_FLAG, '1');
  if (alignedCount) console.info(`[bbiz] Subtask sequence fix: ${alignedCount} task(s) re-ordered.`);
  if (skippedTitles.length) {
    console.info(
      `[bbiz] Subtask sequence fix: ${skippedTitles.length} task(s) left in their stored order because ` +
      `they carry completed subtasks: ${skippedTitles.map((t) => `"${t}"`).join(', ')}`
    );
  }
}

// Rewrite stored subtask titles that were corrected in the seed. Pure: returns
// the same array reference when nothing changes.
//
// Unlike alignSubtaskOrder this does NOT skip a task carrying completed
// subtasks. Renaming in place preserves `id` and `done`; skipping would leave
// the old title in storage, and the very next align pass would then create a
// second row under the new title beside it.
export function renameSeedSubtasks(tasks, renameTable) {
  if (!Array.isArray(tasks) || !renameTable) return { next: tasks, renamed: [] };
  const renamed = [];
  const next = tasks.map((t) => {
    const map = renameTable[t?.title];
    if (!map) return t;
    const stored = Array.isArray(t.subtasks) ? t.subtasks : [];
    let touched = false;
    const subtasks = stored.map((st) => {
      const to = map[st?.title];
      if (!to || to === st.title) return st;
      // A row already sitting under the target title means the rename landed
      // some other way (a fresh seed, a manual edit). Leave both alone rather
      // than manufacture a duplicate; the align pass folds the stray row in.
      if (stored.some((o) => o !== st && o?.title === to)) return st;
      touched = true;
      renamed.push(`${st.title} -> ${to}`);
      return { ...st, title: to };
    });
    return touched ? { ...t, subtasks } : t;
  });
  return { next: renamed.length > 0 ? next : tasks, renamed };
}

// One-shot rename pass. MUST run before alignReorderedSubtasksV3, whose order
// table joins on the NEW titles.
// Approval gate: stages/implement-subtask-rename-review.md
export function renameSeedSubtaskTitles() {
  if (localStorage.getItem(PREFIX + RENAME_FLAG) === '1') return;
  let renamedCount = 0;
  for (const [boardId, renameTable] of Object.entries(SEED_SUBTASK_RENAMES)) {
    const key = `tasks_${boardId}`;
    const tasks = read(key);
    if (!Array.isArray(tasks) || tasks.length === 0) continue;
    const { next, renamed } = renameSeedSubtasks(tasks, renameTable);
    if (next !== tasks) { write(key, next); renamedCount += renamed.length; }
  }
  localStorage.setItem(PREFIX + RENAME_FLAG, '1');
  if (renamedCount) console.info(`[bbiz] Subtask rename: ${renamedCount} subtask(s) retitled.`);
}

// One-shot re-order for the 2026-08-27 pass (Tahajjud waking protocol, Sunan
// al-Nawm). Needs its own flag: ORDER_V2_FLAG has already fired for existing
// users, so reusing it would silently skip everyone this fix is for.
// Approval gate: stages/implement-subtask-rename-review.md
export function alignReorderedSubtasksV3() {
  if (localStorage.getItem(PREFIX + ORDER_V3_FLAG) === '1') return;
  let alignedCount = 0;
  const skippedTitles = [];
  for (const [boardId, orderTable] of Object.entries(REORDERED_SUBTASK_ORDER_V3)) {
    const key = `tasks_${boardId}`;
    const tasks = read(key);
    if (!Array.isArray(tasks) || tasks.length === 0) continue;
    const { next, aligned, skipped } = alignSubtaskOrder(tasks, orderTable);
    skippedTitles.push(...skipped);
    if (next !== tasks) { write(key, next); alignedCount += aligned.length; }
  }
  localStorage.setItem(PREFIX + ORDER_V3_FLAG, '1');
  if (alignedCount) console.info(`[bbiz] Subtask sequence fix (v3): ${alignedCount} task(s) re-ordered.`);
  if (skippedTitles.length) {
    console.info(
      `[bbiz] Subtask sequence fix (v3): ${skippedTitles.length} task(s) left in their stored order ` +
      `because they carry completed subtasks: ${skippedTitles.map((t) => `"${t}"`).join(', ')}`
    );
  }
}

export function runMigrations() {
  // Title repair first — before the SCHEMA_VERSION guard below returns early
  // for already-migrated users, and before React mounts / any hydration reads.
  repairMojibakeTaskTitles();
  // Then prune de-duplicated seed tasks: same reasoning (must precede hydration),
  // and it depends on the repair above having restored exact titles.
  pruneDedupedSeedTasks();
  // Then fold the orphaned subtasks back onto their surviving siblings, in the
  // curated seed order. Must follow the prune (the duplicates it deletes are the
  // rows these subtasks came from) and must precede mount, because the boot
  // backfill would otherwise append them at the end of the array.
  foldInSeedSubtasks();
  // Then re-order the two Before/After tasks whose sequence was corrected in the
  // seed after users already had rows in storage. Independent of the fold-in
  // above; order within runMigrations doesn't matter relative to it.
  alignReorderedSubtasks();
  // Then the 2026-08-27 pass. The rename MUST precede the align: the v3 order
  // table joins on the corrected title, and an unrenamed row would be both
  // "missing" (a new row is created) and "user-created" (the old row is
  // appended) — a duplicate on the operator's board.
  renameSeedSubtaskTitles();
  alignReorderedSubtasksV3();

  const version = localStorage.getItem(PREFIX + 'schema_version');
  if (version === SCHEMA_VERSION) return; // already migrated

  const now = new Date().toISOString();
  const contacts = read('contacts_v2') || [];
  const companies = read('contacts_companies') || [];
  const hrRecords = read('contacts_hr') || [];
  const absenceRecords = read('contacts_absence') || [];

  // ── Migrate people_employees → ContactRecord + HRRecord ──
  const employees = read('people_employees') || [];
  for (const emp of employees) {
    const alreadyMigrated = contacts.find((c) => c._legacyId === emp.id);
    if (alreadyMigrated) continue;

    const nameParts = (emp.name || '').trim().split(/\s+/);
    const firstName = nameParts[0] || '';
    const lastName  = nameParts.slice(1).join(' ') || '';
    const conId     = 'con_' + nanoidLite(12);

    contacts.push({
      id:            conId,
      _legacyId:     emp.id,
      entityType:    'person',
      contactType:   'employee',
      status:        emp.status === 'inactive' ? 'archived' : 'active',
      firstName,
      lastName,
      displayName:   '',
      gender:        '',
      dob:           '',
      nationality:   '',
      maritalStatus: '',
      ssn:           '',
      children:      null,
      email:         emp.email   || '',
      phone:         emp.phone   || '',
      privateEmail:  '',
      privatePhone:  '',
      address:       '',
      companyId:     '',
      jobTitle:      emp.role    || '',
      avatarColor:   avatarColor(conId),
      leadSource:    '',
      leadStatus:    'unassigned',
      requestTitle:  '',
      requestDescription: '',
      estimatedBudget: null,
      createdAt:     emp.createdAt || now,
      updatedAt:     emp.updatedAt || now,
      createdBy:     '',
    });

    hrRecords.push({
      id:                   'hr_' + nanoidLite(12),
      contactId:            conId,
      employmentType:       '',
      hiringDate:           emp.startDate || '',
      departmentId:         emp.department || '',
      officeLocation:       '',
      contractEndDate:      '',
      superiorId:           '',
      workingPositionTitle: emp.role || '',
      backgroundCheckStatus: '',
      createdAt:            now,
      updatedAt:            now,
    });

    // Migrate leave balance as vacation plan seed
    if (emp.leaveBalance?.annual) {
      absenceRecords.push({
        id:               'abs_' + nanoidLite(12),
        contactId:        conId,
        type:             'vacation',
        subType:          'annual',
        startDate:        '',
        endDate:          '',
        days:             0,
        note:             'Migrated from leave balance',
        status:           'approved',
        restartCycleDate: '',
        vacationDaysTotal: emp.leaveBalance.annual || 20,
        createdAt:        now,
        createdBy:        '',
      });
    }
  }

  // ── Migrate crm_contacts → ContactRecord ──
  const crmContacts = read('crm_contacts') || [];
  const crmTypeMap = { lead: 'lead', prospect: 'contact', client: 'client', partner: 'contact', other: 'contact' };

  for (const crm of crmContacts) {
    const alreadyMigrated = contacts.find((c) => c._legacyCrmId === crm.id);
    if (alreadyMigrated) continue;

    const nameParts = (crm.name || '').trim().split(/\s+/);
    const firstName = nameParts[0] || '';
    const lastName  = nameParts.slice(1).join(' ') || '';
    const conId     = 'con_' + nanoidLite(12);

    // Ensure the company exists
    let companyId = '';
    if (crm.company) {
      const existing = companies.find((co) => co.name === crm.company);
      if (existing) {
        companyId = existing.id;
      } else {
        const cmpId = 'cmp_' + nanoidLite(12);
        companies.push({
          id:          cmpId,
          name:        crm.company,
          description: '',
          industries:  [],
          website:     '',
          email:       '',
          phone:       '',
          address:     '',
          logoColor:   avatarColor(cmpId),
          status:      'active',
          createdAt:   now,
          updatedAt:   now,
          createdBy:   '',
        });
        companyId = cmpId;
      }
    }

    contacts.push({
      id:            conId,
      _legacyCrmId:  crm.id,
      entityType:    'person',
      contactType:   crmTypeMap[crm.type] || 'contact',
      status:        'active',
      firstName,
      lastName,
      displayName:   '',
      gender:        '',
      dob:           '',
      nationality:   '',
      maritalStatus: '',
      ssn:           '',
      children:      null,
      email:         crm.email   || '',
      phone:         crm.phone   || '',
      privateEmail:  '',
      privatePhone:  '',
      address:       '',
      companyId,
      jobTitle:      crm.role    || '',
      avatarColor:   avatarColor(conId),
      leadSource:    '',
      leadStatus:    'unassigned',
      requestTitle:  '',
      requestDescription: '',
      estimatedBudget: null,
      createdAt:     crm.createdAt || now,
      updatedAt:     crm.updatedAt || now,
      createdBy:     '',
    });
  }

  // ── Write migrated data ──
  if (contacts.length)      write('contacts_v2', contacts);
  if (companies.length)     write('contacts_companies', companies);
  if (hrRecords.length)     write('contacts_hr', hrRecords);
  if (absenceRecords.length) write('contacts_absence', absenceRecords);

  // ── Stamp version (old keys preserved for rollback) ──
  localStorage.setItem(PREFIX + 'schema_version', SCHEMA_VERSION);
  console.info('[bbiz] Migration to schema 5.0 complete.');
}
