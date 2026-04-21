// Prayer seed tasks — derived at import time from FAITH_SEED_TASKS via
// Option-A duplication: every generic Salah sunnah tagged `prayer-phase:before`
// or `prayer-phase:after` is copied into ALL five prayers' matching phase
// board (plus tahajjud when transition tags indicate it). Prayer-specific
// tasks (e.g. `prayer:fajr`, `transition:tahajjud-waking`) land only in
// their inferred home.
//
// Outputs PRAYER_SEED_TASKS shape: { prayer_{prayer}_{phase}: [task, ...] }
// Boards are defined in @data/prayer-pillars; this file only produces tasks.
//
// Main-phase tasks (`prayer-phase:main`) and untagged tasks stay in
// `faith_salah_*` untouched — this module never mutates FAITH_SEED_TASKS.

import { FAITH_SEED_TASKS } from './faith-seed-tasks';
import { PRAYER_PILLARS, PRAYER_PHASE_KEYS } from '../prayer-pillars';

const FIVE_DAILY = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
const ALL_PRAYERS = PRAYER_PILLARS.map((p) => p.id); // includes tahajjud

const SALAH_SOURCES = ['faith_salah_core', 'faith_salah_growth', 'faith_salah_excellence'];

// Per-prayer Sunni orthopraxy — rakah counts follow Bukhari/Muslim.
// Each structure row becomes one task (note → subtask); each key reminder
// becomes one task. Populates the six `prayer_{pillar}_during` boards.
const PRAYER_GUIDE = {
  fajr: {
    structure: [
      { kind: 'Sunnah before', count: 2, note: 'Light and brief. "Better than the world and all it contains." (Muslim)' },
      { kind: 'Farḍ', count: 2, note: 'Recite aloud. The longest recitation of the day.' },
    ],
    keys: [
      'Never skip the 2 sunnah — the Prophet ﷺ kept them even while travelling.',
      'No voluntary prayer between Fajr and sunrise.',
    ],
  },
  dhuhr: {
    structure: [
      { kind: 'Sunnah before', count: 4, note: 'Prayed as two sets of two.' },
      { kind: 'Farḍ', count: 4, note: 'Silent recitation.' },
      { kind: 'Sunnah after', count: 2, note: 'From the confirmed rawātib.' },
    ],
    keys: [
      'All recitation is silent — internal presence (khushūʿ) is the work.',
      "The 4+2 rawātib are mu'akkadah (confirmed) — schedule around them, not after them.",
    ],
  },
  asr: {
    structure: [
      { kind: 'Sunnah before', count: 4, note: "Ghair mu'akkadah — meritorious but optional." },
      { kind: 'Farḍ', count: 4, note: 'Silent recitation.' },
    ],
    keys: [
      'The "middle prayer" — guard it. (al-Baqarah 2:238)',
      'No voluntary prayer after ʿAṣr until Maghrib.',
      'Pray it while the sun is still strong-white, before it yellows.',
    ],
  },
  maghrib: {
    structure: [
      { kind: 'Farḍ', count: 3, note: 'Aloud in the first two rakʿahs, silent in the third.' },
      { kind: 'Sunnah after', count: 2, note: 'Recommended: Surah al-Kāfirūn + al-Ikhlāṣ.' },
    ],
    keys: [
      "Pray promptly — Maghrib's window is the shortest of the day.",
      'No four-rakʿah farḍ here; its witr-count is the 3.',
      'If time allows before iqāmah, pray 2 light rakʿahs — the Prophet ﷺ permitted this.',
    ],
  },
  isha: {
    structure: [
      { kind: 'Sunnah before', count: 4, note: 'Optional — two sets of two if time permits.' },
      { kind: 'Farḍ', count: 4, note: 'Aloud in the first two rakʿahs, silent in the last two.' },
      { kind: 'Sunnah after', count: 2, note: 'Confirmed rawātib.' },
      { kind: 'Witr', count: '1, 3, 5, 7 or 9', note: 'Odd-numbered. Delay it to tahajjud only if you are certain to rise.' },
    ],
    keys: [
      'Witr seals the night — do not sleep without it.',
      'Best prayed in the first third of night unless you plan tahajjud.',
      'Qunūt in witr is sunnah; the duʿāʾ of al-Ḥasan ibn ʿAlī is narrated by Abū Dāwūd.',
    ],
  },
  tahajjud: {
    structure: [
      { kind: 'Qiyām', count: 'Pairs of 2', note: "Two rakʿahs at a time — the Prophet ﷺ's standard unit." },
      { kind: 'Recommended', count: '8 + witr', note: 'The Prophet ﷺ did not exceed 11 rakʿahs in Ramaḍān or outside it. (Bukhārī)' },
    ],
    keys: [
      'Best in the last third of the night — "Our Lord descends to the lowest heaven…" (Bukhārī)',
      'Begin with 2 light rakʿahs, then lengthen.',
      'If you kept witr after ʿIshāʾ, do not repeat it — "no two witrs in one night."',
    ],
  },
};

function hasTag(task, tag) {
  return Array.isArray(task.tags) && task.tags.includes(tag);
}

function findPrayerSpecificTag(task) {
  if (!Array.isArray(task.tags)) return null;
  for (const prayer of ALL_PRAYERS) {
    if (task.tags.includes(`prayer:${prayer}`)) return prayer;
  }
  return null;
}

// Decide which boards a task should be copied into.
// Returns array of boardIds, or [] if the task stays in faith_salah_*.
function classifyTask(task) {
  const tags = task.tags || [];

  // Main-phase + untagged → stay in faith_salah_*
  const hasBefore = tags.some((t) => t === 'prayer-phase:before');
  const hasAfter  = tags.some((t) => t === 'prayer-phase:after');
  if (!hasBefore && !hasAfter) return [];

  // Explicit prayer-specific attribution wins over generics.
  const specific = findPrayerSpecificTag(task);
  if (specific) {
    const phase = hasBefore ? 'before' : 'after';
    return [`prayer_${specific}_${phase}`];
  }

  // Tahajjud-specific transitions.
  if (hasTag(task, 'transition:tahajjud-waking')) return ['prayer_tahajjud_before'];
  if (hasTag(task, 'transition:post-witr'))       return ['prayer_tahajjud_after'];

  // Time-of-day transitions map to a single prayer.
  if (hasTag(task, 'transition:waking') || hasTag(task, 'transition:morning-adhkar')) {
    return ['prayer_fajr_before'];
  }
  if (hasTag(task, 'transition:evening-adhkar')) {
    return ['prayer_maghrib_before'];
  }
  if (hasTag(task, 'transition:pre-sleep')) {
    return ['prayer_isha_after'];
  }
  if (hasTag(task, 'transition:end-of-morning')) {
    return ['prayer_dhuhr_before'];
  }

  // Generic sunan — duplicate across all five daily prayers.
  const phase = hasBefore ? 'before' : 'after';
  return FIVE_DAILY.map((p) => `prayer_${p}_${phase}`);
}

function buildPrayerSeedTasks() {
  const out = {};
  for (const pillar of PRAYER_PILLARS) {
    for (const phase of PRAYER_PHASE_KEYS) {
      out[`prayer_${pillar.id}_${phase}`] = [];
    }
  }

  for (const sourceBoardId of SALAH_SOURCES) {
    const tasks = FAITH_SEED_TASKS[sourceBoardId] || [];
    for (const task of tasks) {
      const targets = classifyTask(task);
      for (const boardId of targets) {
        // Slim copy — seed shape (id/columnId are added by store at seed-time).
        out[boardId].push({ ...task });
      }
    }
  }

  // Populate during boards from PRAYER_GUIDE.
  for (const pillar of PRAYER_PILLARS) {
    const guide = PRAYER_GUIDE[pillar.id];
    if (!guide) continue;
    const boardId = `prayer_${pillar.id}_during`;
    const baseTags = ['salah', 'prayer-phase:during', `prayer:${pillar.id}`];
    for (const row of guide.structure) {
      out[boardId].push({
        title: `${row.kind} · ${row.count} rakʿah${row.count === 1 ? '' : 's'}`,
        priority: 'high',
        tags: [...baseTags],
        subtasks: [{ title: row.note }],
      });
    }
    for (const key of guide.keys) {
      out[boardId].push({
        title: key,
        priority: 'medium',
        tags: [...baseTags, 'reminder'],
      });
    }
  }

  return out;
}

export const PRAYER_SEED_TASKS = buildPrayerSeedTasks();

// Diagnostic helper — exposed for one-off console checks.
export function prayerSeedSummary() {
  const rows = Object.entries(PRAYER_SEED_TASKS)
    .map(([k, v]) => [k, v.length])
    .sort((a, b) => b[1] - a[1]);
  return rows;
}
