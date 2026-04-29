import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Moon,
  Sparkles,
  Sunrise,
  Briefcase,
  Sun,
  SunMedium,
  Sunset,
  HardHat,
  ArrowRight,
  BookOpen,
  Play,
  Bed,
  BedDouble,
  Home,
  Star,
  MoonStar,
  UtensilsCrossed,
  Users,
  HandHeart,
  Soup,
  Plane,
  MapPin,
} from 'lucide-react';
import { useSettingsStore } from '@store/settings-store';
import { useProjectStore } from '@store/project-store';
import { useTaskStore } from '@store/task-store';
import { useThresholdStore } from '@store/threshold-store';
import { useFastingStore } from '@store/fasting-store';
import { useTravelStore } from '@store/travel-store';
import { useIslamicDayStore, DAILY_CEREMONY_MODULES } from '@store/islamic-day-store';
import { usePrayerTimes } from '@hooks/usePrayerTimes';
import { MODULES, PRIORITIES } from '@data/modules';
import { MAQASID_PILLARS } from '@data/maqasid';
import {
  buildTasksForNode,
  buildUserProjectsForScope,
  getModuleGroups,
  inferNodeFromHour,
  submodulesForNode,
  LEVEL_LABEL,
  LEVEL_FULL_LABEL,
  isRamadan as isHijriRamadan,
  isEidFitr,
  isEidAdha,
} from '@data/prophetic-path-submodules';
import {
  getSubmoduleDisplayLabel,
  getSubmodulePillarColor,
  getPillarSubmoduleIds,
} from '@data/submodule-registry';
import DashboardTaskCard from '@components/shared/DashboardTaskCard';
import TaskDetailPanel from '@components/work/TaskDetailPanel';
import ProjectSlideUp from '@components/work/ProjectSlideUp';
import SubmoduleSlideUp from './SubmoduleSlideUp';
import PrayerSlideUp from './PrayerSlideUp';
import PropheticPathBanner from './PropheticPathBanner';
import './PropheticPath.css';

// Maqasid level → accent colour (mirrors PillarLevelDashboard.LEVEL_COLORS).
const LEVEL_COLOR = { 1: '#C8A96E', 2: '#4ab8a8', 3: '#8b5cf6' };

// Resolve a pillar-chip label to its canonical Maqasid accent color.
// NODES uses a mix of `sidebarLabel` (Faith/Life/…), `id` (e.g. 'ummah'), and
// editorial labels (e.g. 'Soul'). We try each lookup and return null for
// unmatched labels so the chip falls back to its `data-tone` styling.
const _PILLAR_ACCENT_BY_KEY = (() => {
  const out = {};
  for (const p of MAQASID_PILLARS) {
    out[p.id.toLowerCase()] = p.accentColor;
    if (p.sidebarLabel) out[p.sidebarLabel.toLowerCase()] = p.accentColor;
    if (p.universalLabel) out[p.universalLabel.toLowerCase()] = p.accentColor;
  }
  // Legacy "Ummah" label may persist in seed data or saved state — alias
  // back to the canonical "Community" accent so chips still resolve a colour.
  out['ummah'] = out['community'] || null;
  return out;
})();
function resolvePillarAccent(label) {
  if (!label) return null;
  return _PILLAR_ACCENT_BY_KEY[label.toLowerCase()] || null;
}

// Nodes that open the PrayerSlideUp (Before/During/After tabs) instead of
// toggling inline satellite expansion. Tahajjud is included per the
// "all prayer-like nodes" decision, even though it lacks a standard window.
const PRAYER_NODE_IDS = new Set(['fajr', 'dhuhr', 'asr', 'maghrib', 'isha', 'tahajjud']);

// Every spine node's Before/After satellite opens the opening/closing
// Threshold ceremony. Each node maps to the module whose ceremony it
// triggers — prayer nodes route to `faith-salah`, fasting nodes to
// `faith-siyam`, transitional rest nodes to `health-physical`, work
// transitions to `work`. Inline satellite expansion still fires alongside
// the modal so the task surface remains visible behind the ceremony.
const THRESHOLD_MODULE_BY_NODE = {
  fajr: 'faith-salah',
  dhuhr: 'faith-salah',
  asr: 'faith-salah',
  maghrib: 'faith-salah',
  isha: 'faith-salah',
  tahajjud: 'faith-salah',
  witr: 'faith-salah',
  duha: 'faith-salah',
  jumuah: 'faith-salah',
  'eid-prayer': 'faith-salah',
  'after-asr': 'faith-salah',
  'istijabah-hour': 'faith-salah',
  sahari: 'faith-siyam',
  'maghrib-iftar': 'faith-siyam',
  'isha-taraweeh': 'faith-siyam',
  bedtime: 'health-physical',
  'qiyam-rest': 'health-physical',
  qaylulah: 'health-physical',
  morning: 'work',
  'midday-labor': 'work',
};
// Backwards-compat: any node id present as a key in THRESHOLD_MODULE_BY_NODE
// is a threshold trigger — both prayer + non-prayer.
const isThresholdTriggerNode = (nodeId) =>
  Object.prototype.hasOwnProperty.call(THRESHOLD_MODULE_BY_NODE, nodeId);

// Map each timeline node to the Aladhan `timings` key it anchors on.
// Aladhan returns Fajr, Sunrise, Dhuhr, Asr, Sunset, Maghrib, Isha, Imsak,
// Midnight, Firstthird, Lastthird — we consume the five salawat plus
// Sunrise / Lastthird for the transition nodes.
// `offsetMin` shifts a labor/transition node's *effective* anchor forward from
// its prayer key (only used for active/next/past math; the displayed time is
// still the raw prayer time). Without this, midday-labor would tie with dhuhr
// and never become active. 15 min mirrors PHASE_DURING_MIN in the right rail.
const NODE_TIMING = {
  isha:           { key: 'Isha',      label: null },
  witr:           { key: 'Isha',      label: 'Witr',     offsetMin: 45 },
  bedtime:        { key: 'Isha',      label: 'Bedtime',  offsetMin: 60 },
  'qiyam-rest':   { key: 'Lastthird', label: 'Qiyam Rest', offsetMin: -90 },
  tahajjud:       { key: 'Lastthird', label: 'Last Third' },
  sahari:         { key: 'Imsak',     label: 'Sahari' },
  fajr:           { key: 'Fajr',      label: null },
  duha:           { key: 'Sunrise',   label: 'Duha',     offsetMin: 20 },
  'eid-prayer':   { key: 'Sunrise',   label: 'Eid Prayer', offsetMin: 30 },
  morning:        { key: 'Sunrise',   label: 'Sunrise',  offsetMin: 60 },
  qaylulah:       { key: 'Dhuhr',     label: 'Qaylulah', offsetMin: -45 },
  dhuhr:          { key: 'Dhuhr',     label: null },
  jumuah:         { key: 'Dhuhr',     label: 'Jumu\u02bbah' },
  'midday-labor': { key: 'Dhuhr',     label: 'After Dhuhr', offsetMin: 15 },
  asr:            { key: 'Asr',       label: null },
  'after-asr':    { key: 'Asr',       label: 'After Asr', offsetMin: 30 },
  'istijabah-hour': { key: 'Maghrib', label: 'Hour of Istijabah', offsetMin: -60 },
  maghrib:        { key: 'Maghrib',   label: null },
  'maghrib-iftar': { key: 'Maghrib',  label: 'Iftar' },
  'isha-taraweeh': { key: 'Isha',     label: 'Taraweeh', offsetMin: 30 },
};

// Day-of-week branching: Fridays render `jumuah` + `istijabah-hour` and hide
// `dhuhr` (jumuah replaces it). Non-Fridays render `dhuhr` and hide both
// Friday-only nodes. This is the only day-of-week split in the spine.
function isFriday(date = new Date()) {
  return date.getDay() === 5;
}

const FRIDAY_ONLY_NODE_IDS = new Set(['jumuah', 'istijabah-hour']);
const NON_FRIDAY_HIDE_ON_FRIDAY = new Set(['dhuhr']);

// Fasting-state branching: when today is a fastable day (Ramadan OR Sunnah-
// fast day per isFastableDay), surface iftar at maghrib. When isRamadan,
// surface taraweeh after isha. The iftar node lights up on Mon/Thu, Ayyam
// al-Bid, Arafah, Ashura/Tasua even without flipping the manual override —
// the user is invited into the optional fast.
const FASTABLE_DAY_NODE_IDS = new Set(['maghrib-iftar']);
const RAMADAN_ONLY_NODE_IDS = new Set(['isha-taraweeh']);

// Eid branching: on Eid al-Fitr (1 Shawwal) or Eid al-Adha (10 Dhul-Hijjah),
// `eid-prayer` replaces the duha slot. Tashreeq (11–13 Dhul-Hijjah) does NOT
// re-render eid-prayer — its takbir + dhikr content overlays via TIME_CONTENT.
const EID_ONLY_NODE_IDS = new Set(['eid-prayer']);
const NON_EID_HIDE_ON_EID = new Set(['duha']);

// Travel branching: on travel days `jumuah` is not obligatory — the traveler
// prays Dhuhr (qasr) instead. So when traveling on a Friday, suppress jumuah
// and surface dhuhr; istijabah-hour still applies. Qasr framing for the four-
// rakʿat prayers is content-only (see TIME_CONTENT TRAVELER_NOTES).
const TRAVEL_HIDE_NODE_IDS = new Set(['jumuah']);

function getActiveNodeTiming(date = new Date(), {
  isFastableDay: fastableDay = false,
  isRamadan: ramadan = false,
  isEid = false,
  isTraveling = false,
} = {}) {
  const friday = isFriday(date);
  const out = {};
  for (const [id, spec] of Object.entries(NODE_TIMING)) {
    // Friday/travel inversion: when traveling on Friday, dhuhr returns and
    // jumuah hides — overrides the default Friday filter for these two ids.
    if (friday && !isTraveling && NON_FRIDAY_HIDE_ON_FRIDAY.has(id)) continue;
    if (!friday && FRIDAY_ONLY_NODE_IDS.has(id)) continue;
    if (friday && isTraveling && TRAVEL_HIDE_NODE_IDS.has(id)) continue;
    if (FASTABLE_DAY_NODE_IDS.has(id) && !fastableDay) continue;
    if (RAMADAN_ONLY_NODE_IDS.has(id) && !ramadan) continue;
    if (EID_ONLY_NODE_IDS.has(id) && !isEid) continue;
    if (isEid && NON_EID_HIDE_ON_EID.has(id)) continue;
    out[id] = spec;
  }
  return out;
}

function effectiveAnchorMs(spec, timings, today) {
  const ms = timeToMs(timings[spec.key], today);
  if (ms == null) return null;
  return ms + (spec.offsetMin ?? 0) * 60_000;
}

// Canonical ordering used for past/upcoming calculation.
const PRAYER_ORDER = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

function stripTz(str) {
  return typeof str === 'string' ? str.replace(/\s*\(.*\)/, '') : '';
}

function formatTime12(raw) {
  const clean = stripTz(raw);
  if (!/^\d{1,2}:\d{2}/.test(clean)) return '';
  const [hh, mm] = clean.split(':').map(Number);
  const period = hh >= 12 ? 'PM' : 'AM';
  const h12 = ((hh + 11) % 12) + 1;
  return `${h12}:${String(mm).padStart(2, '0')} ${period}`;
}

function formatMs12(ms) {
  if (ms == null) return '';
  const d = new Date(ms);
  const hh = d.getHours();
  const mm = d.getMinutes();
  const period = hh >= 12 ? 'PM' : 'AM';
  const h12 = ((hh + 11) % 12) + 1;
  return `${h12}:${String(mm).padStart(2, '0')} ${period}`;
}

function timeToMs(raw, today) {
  const clean = stripTz(raw);
  if (!/^\d{1,2}:\d{2}/.test(clean)) return null;
  const [h, m] = clean.split(':').map(Number);
  const d = new Date(today);
  d.setHours(h, m, 0, 0);
  return d.getTime();
}

// Compute the nodeId whose anchor time is soonest in the future, wrapping
// around midnight. Tahajjud at 03:00 beats Fajr at 05:00 when now is 02:35.
// Returns null if no node has a usable anchor time.
// Compute the node whose anchor is the most-recent past anchor — i.e. now
// sits inside [thisNodeAnchor, nextNodeAnchor). Applies to all 8 nodes so
// Tahajjud / Morning / Midday-Labor can be 'active' during their window.
function computeActiveNodeId(timings, opts = {}) {
  if (!timings) return null;
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const ONE_DAY = 24 * 60 * 60 * 1000;
  let bestId = null;
  let bestDiff = Infinity;
  for (const [nodeId, spec] of Object.entries(getActiveNodeTiming(now, opts))) {
    const ms = effectiveAnchorMs(spec, timings, today);
    if (ms == null) continue;
    let diff = now.getTime() - ms;
    if (diff < 0) diff += ONE_DAY; // anchor later today → count as yesterday's occurrence
    if (diff < bestDiff) {
      bestDiff = diff;
      bestId = nodeId;
    }
  }
  return bestId;
}

function computeNextNodeId(timings, opts = {}) {
  if (!timings) return null;
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const ONE_DAY = 24 * 60 * 60 * 1000;
  let bestId = null;
  let bestDiff = Infinity;
  for (const [nodeId, spec] of Object.entries(getActiveNodeTiming(now, opts))) {
    const ms = effectiveAnchorMs(spec, timings, today);
    if (ms == null) continue;
    let diff = ms - now.getTime();
    if (diff <= 0) diff += ONE_DAY; // already passed today → tomorrow's occurrence
    if (diff < bestDiff) {
      bestDiff = diff;
      bestId = nodeId;
    }
  }
  return bestId;
}

// For a given node + timings snapshot, return { time, state } where state is
// 'active' | 'next' | 'past' | 'upcoming' | null. 'active' is driven by the
// hook's activePrayer (canonical 5 only). 'next' is computed locally across
// ALL nodes so Tahajjud / Morning / Midday-Labor can take the next slot.
function deriveNodeTiming(nodeId, timings, activeNodeId, nextNodeId) {
  const spec = NODE_TIMING[nodeId];
  if (!spec || !timings) return { time: '', label: spec?.label || null, state: null };
  const today = new Date();
  const anchorMs = effectiveAnchorMs(spec, timings, today);
  const time = spec.offsetMin ? formatMs12(anchorMs) : formatTime12(timings[spec.key]);

  let state = null;
  if (nodeId === activeNodeId) {
    state = 'active';
  } else if (nodeId === nextNodeId) {
    const leadMs = anchorMs != null ? anchorMs - Date.now() : Infinity;
    state = leadMs > 0 && leadMs <= 10 * 60 * 1000 ? 'next-soon' : 'next';
  } else if (anchorMs != null) {
    state = anchorMs < Date.now() ? 'past' : 'upcoming';
  }

  return { time, label: spec.label, state };
}

function statusLabel(s) {
  return s === 'done' ? 'Done' : s === 'in-progress' ? 'In Progress' : 'To Do';
}

function deriveStatus(task) {
  const cols = task._project?.columns || [];
  const doneCol = cols.find((c) => c.id.endsWith('_done'))?.id;
  const progressCol = cols.find((c) => c.id.endsWith('_progress'))?.id;
  if (task.columnId === doneCol) return 'done';
  if (task.columnId === progressCol) return 'in-progress';
  return 'todo';
}

function formatDue(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  const now = new Date();
  const days = Math.ceil((d - now) / 86400000);
  if (days < 0) return { text: 'Overdue', colorVar: 'var(--danger)' };
  if (days === 0) return { text: 'Today', colorVar: 'var(--warning)' };
  if (days <= 3) return { text: `${days}d`, colorVar: 'var(--warning)' };
  return { text: d.toLocaleDateString('en', { month: 'short', day: 'numeric' }), colorVar: 'var(--text3)' };
}

const NODES = [
  {
    id: 'maghrib',
    cardStyle: 'primary',
    eyebrow: 'Sunset',
    eyebrowTone: 'primary',
    title: 'Maghrib Prayers',
    titleTone: 'on-surface',
    body: 'Transitioning from work to family. The close of the active day.',
    pillars: [
      { label: 'Faith', tone: 'primary' },
      { label: 'Family', tone: 'secondary' },
    ],
    Icon: Sunset,
    markerTone: 'primary',
  },
  {
    id: 'maghrib-iftar',
    cardStyle: 'subtle',
    eyebrow: 'Iftar',
    eyebrowTone: 'secondary',
    title: 'Break the Fast',
    titleTone: 'on-surface',
    body: 'The thirst is gone, the veins are moistened, and the reward is fixed if Allah wills — the iftar moment carries an answered du\u02bba.',
    pillars: [
      { label: 'Faith', tone: 'secondary' },
      { label: 'Health', tone: 'secondary' },
    ],
    Icon: Soup,
    markerTone: 'secondary',
  },
  {
    id: 'isha',
    cardStyle: 'muted',
    eyebrow: 'Late Night',
    eyebrowTone: 'variant',
    title: 'Isha & Rest',
    titleTone: 'on-surface',
    body: 'Preparation for the final third of the night. A time of stillness and surrender.',
    pillars: [{ label: 'Faith', tone: 'secondary' }],
    Icon: Moon,
    markerTone: 'muted',
  },
  {
    id: 'isha-taraweeh',
    cardStyle: 'subtle',
    eyebrow: 'Taraweeh',
    eyebrowTone: 'secondary',
    title: 'Stand the Night in Ramadan',
    titleTone: 'on-surface',
    body: 'Whoever stands the nights of Ramadan in faith, seeking reward, has all prior sins forgiven — the night prayer of this month.',
    pillars: [
      { label: 'Faith', tone: 'secondary' },
      { label: 'Community', tone: 'secondary' },
    ],
    Icon: BookOpen,
    markerTone: 'secondary',
  },
  {
    id: 'witr',
    cardStyle: 'subtle',
    eyebrow: 'Witr',
    eyebrowTone: 'secondary',
    title: 'Salat al-Witr',
    titleTone: 'on-surface',
    body: 'Seal the night with the odd prayer the Prophet \uFDFA never abandoned in residence or travel.',
    pillars: [{ label: 'Faith', tone: 'secondary' }],
    Icon: Star,
    markerTone: 'secondary',
  },
  {
    id: 'bedtime',
    cardStyle: 'muted',
    eyebrow: 'Bedtime',
    eyebrowTone: 'variant',
    title: 'Sunan al-Nawm',
    titleTone: 'on-surface',
    body: 'Wudu, dhikr, right side. Sealing the day in the way of the Prophet ﷺ.',
    pillars: [
      { label: 'Faith', tone: 'secondary' },
      { label: 'Health', tone: 'secondary' },
    ],
    Icon: BedDouble,
    markerTone: 'muted',
  },
  {
    id: 'qiyam-rest',
    cardStyle: 'subtle',
    eyebrow: 'Qiyam Rest',
    eyebrowTone: 'secondary',
    title: 'Sleep with Niyyah',
    titleTone: 'on-surface',
    body: 'The deliberate sleep aimed at rising for tahajjud — even if you do not wake, the niyyah is recorded as charity.',
    pillars: [{ label: 'Faith', tone: 'secondary' }],
    Icon: MoonStar,
    markerTone: 'secondary',
  },
  {
    id: 'tahajjud',
    cardStyle: 'divine',
    eyebrow: 'Divine Moment',
    eyebrowTone: 'tertiary',
    title: 'Tahajjud',
    titleTone: 'tertiary',
    body: 'The sacred dialogue in the depths of night. Seeking profound guidance.',
    pillars: [
      { label: 'Soul', tone: 'tertiary' },
      { label: 'Faith', tone: 'tertiary' },
    ],
    Icon: Sparkles,
    markerTone: 'tertiary',
    pulse: true,
  },
  {
    id: 'sahari',
    cardStyle: 'subtle',
    eyebrow: 'Sahari',
    eyebrowTone: 'secondary',
    title: 'Pre-Dawn Meal',
    titleTone: 'on-surface',
    body: 'There is barakah in suhur — and the meal before dawn distinguishes our fast from those before us.',
    pillars: [
      { label: 'Faith', tone: 'secondary' },
      { label: 'Health', tone: 'secondary' },
    ],
    Icon: UtensilsCrossed,
    markerTone: 'secondary',
  },
  {
    id: 'fajr',
    cardStyle: 'primary',
    eyebrow: 'Dawn',
    eyebrowTone: 'primary',
    title: 'Fajr Prayers',
    titleTone: 'on-surface',
    body: 'The start of the spiritual day. Greeting the light with remembrance.',
    pillars: [
      { label: 'Faith', tone: 'primary' },
      { label: 'Health', tone: 'secondary' },
    ],
    Icon: Sunrise,
    markerTone: 'primary',
  },
  {
    id: 'duha',
    cardStyle: 'subtle',
    eyebrow: 'Duha',
    eyebrowTone: 'secondary',
    title: 'Salat ad-Duha',
    titleTone: 'on-surface',
    body: 'Two rakʿahs after the sun has risen — the charity of every joint, the Prophet\u2019s ﷺ enjoinment to Abu Hurayrah.',
    pillars: [
      { label: 'Faith', tone: 'secondary' },
      { label: 'Health', tone: 'secondary' },
    ],
    Icon: Sun,
    markerTone: 'secondary',
  },
  {
    id: 'eid-prayer',
    cardStyle: 'primary',
    eyebrow: 'Eid',
    eyebrowTone: 'primary',
    title: 'Salat al-\u02bb\u012Bd',
    titleTone: 'on-surface',
    body: 'The two rak\u02bbahs of the festival prayer — sunan mu\u02bbakkadah of Ramadan\u2019s seal and the day of sacrifice. The takbir continues.',
    pillars: [
      { label: 'Faith', tone: 'primary' },
      { label: 'Community', tone: 'secondary' },
    ],
    Icon: Sparkles,
    markerTone: 'primary',
  },
  {
    id: 'morning',
    cardStyle: 'subtle',
    eyebrow: 'Morning',
    eyebrowTone: 'secondary',
    title: 'Official Start of Day',
    titleTone: 'on-surface',
    body: 'Engagement with the world. Productivity, work, and social affairs.',
    pillars: [
      { label: 'Intellect', tone: 'secondary' },
      { label: 'Wealth', tone: 'secondary' },
    ],
    Icon: Briefcase,
    markerTone: 'secondary',
  },
  {
    id: 'qaylulah',
    cardStyle: 'subtle',
    eyebrow: 'Qaylulah',
    eyebrowTone: 'secondary',
    title: 'Midday Rest',
    titleTone: 'on-surface',
    body: 'A short pre-Dhuhr nap. The Prophet ﷺ rested before noon — strength stored for the labor that follows.',
    pillars: [
      { label: 'Health', tone: 'secondary' },
    ],
    Icon: Bed,
    markerTone: 'secondary',
  },
  {
    id: 'dhuhr',
    cardStyle: 'primary',
    eyebrow: 'Mid-day',
    eyebrowTone: 'primary',
    title: 'Dhuhr Prayers',
    titleTone: 'on-surface',
    body: 'A spiritual reset amidst the hustle. Realignment with primary purpose.',
    pillars: [{ label: 'Faith', tone: 'primary' }],
    Icon: Sun,
    markerTone: 'primary',
  },
  {
    id: 'jumuah',
    cardStyle: 'primary',
    eyebrow: 'Friday',
    eyebrowTone: 'primary',
    title: "Jumu\u02bbah",
    titleTone: 'on-surface',
    body: 'The weekly congregation — ghusl, white clothes, miswak, surah al-Kahf, abundant salawat. Jumu\u02bbah replaces dhuhr today.',
    pillars: [
      { label: 'Faith', tone: 'primary' },
      { label: 'Community', tone: 'secondary' },
    ],
    Icon: Users,
    markerTone: 'primary',
  },
  {
    id: 'midday-labor',
    cardStyle: 'subtle',
    eyebrow: 'Midday Labor',
    eyebrowTone: 'secondary',
    title: 'Livelihood & Stewardship',
    titleTone: 'on-surface',
    body: 'The post-Dhuhr execution window. Earning rizq with ihsan and serving the community that surrounds the work.',
    pillars: [
      { label: 'Wealth', tone: 'secondary' },
      { label: 'Community', tone: 'secondary' },
    ],
    Icon: HardHat,
    markerTone: 'secondary',
  },
  {
    id: 'asr',
    cardStyle: 'primary-flat',
    eyebrow: 'Afternoon',
    eyebrowTone: 'primary',
    title: 'Asr Prayers',
    titleTone: 'on-surface',
    body: 'Continued focus and wrapping up daily worldly duties.',
    pillars: [
      { label: 'Faith', tone: 'primary' },
      { label: 'Health', tone: 'secondary' },
    ],
    Icon: SunMedium,
    markerTone: 'primary',
  },
  {
    id: 'after-asr',
    cardStyle: 'subtle',
    eyebrow: 'After Asr',
    eyebrowTone: 'secondary',
    title: 'Return to Family',
    titleTone: 'on-surface',
    body: 'The Prophet ﷺ returned home after Asr — quality time with spouse and children before sunset.',
    pillars: [
      { label: 'Family', tone: 'secondary' },
    ],
    Icon: Home,
    markerTone: 'secondary',
  },
  {
    id: 'istijabah-hour',
    cardStyle: 'subtle',
    eyebrow: 'Istijabah',
    eyebrowTone: 'secondary',
    title: 'Hour of Acceptance',
    titleTone: 'on-surface',
    body: 'The last hour before Maghrib on Friday — the hour in which no Muslim asks Allah for good but it is granted.',
    pillars: [{ label: 'Faith', tone: 'secondary' }],
    Icon: HandHeart,
    markerTone: 'secondary',
  },
];

// Ephemeral event nodes — not time-anchored, surface for a 60-minute window
// after a travel toggle flip. Rendered above the regular spine row.
const EVENT_TRIGGER_WINDOW_MS = 60 * 60 * 1000;

const EVENT_NODES = [
  {
    id: 'traveler-departure',
    cardStyle: 'subtle',
    eyebrow: 'Departure',
    eyebrowTone: 'secondary',
    title: 'Begin the Journey',
    titleTone: 'on-surface',
    body: 'On mounting the conveyance, the Prophet \uFDFA said takbir three times and recited the du\u02bba\u02bb of travel. Begin with His name; on Him alone you rely.',
    pillars: [
      { label: 'Faith', tone: 'secondary' },
      { label: 'Ummah', tone: 'secondary' },
    ],
    Icon: Plane,
    markerTone: 'secondary',
  },
  {
    id: 'traveler-arrival',
    cardStyle: 'subtle',
    eyebrow: 'Arrival',
    eyebrowTone: 'secondary',
    title: 'Return Home',
    titleTone: 'on-surface',
    body: 'Returning, the Prophet \uFDFA said: \u201C\u02bbA\u02beibun, ta\u02beibun, \u02bbabidun, li-rabbina hamidun\u201D — turning back, repenting, worshipping, praising our Lord.',
    pillars: [
      { label: 'Faith', tone: 'secondary' },
      { label: 'Family', tone: 'secondary' },
    ],
    Icon: MapPin,
    markerTone: 'secondary',
  },
];

function PPTaskCard({ task, index, onSelectTask }) {
  const priority = PRIORITIES.find((p) => p.id === task.priority);
  const status = deriveStatus(task);
  const levelColor = LEVEL_COLOR[task._level] || LEVEL_COLOR[3];
  const subtaskTotal = task.subtasks?.length || 0;
  const subtaskDone = subtaskTotal > 0 ? task.subtasks.filter((s) => s.done).length : 0;

  return (
    <DashboardTaskCard
      taskId={task.id}
      index={index}
      title={task.title}
      span={12}
      status={status}
      accentColor={levelColor}
      statusTint={status === 'in-progress'
        ? { background: 'color-mix(in srgb, #F59E0B 12%, var(--surface))' }
        : undefined}
      onSelectTask={onSelectTask}
      chips={[
        {
          label: `${LEVEL_LABEL[task._level]} · ${LEVEL_FULL_LABEL[task._level]}`,
          className: 'dtc__chip',
          style: { background: `color-mix(in srgb, ${levelColor} 14%, transparent)`, color: levelColor },
        },
        { label: statusLabel(status), className: `dtc__chip dtc__chip--status-${status}` },
        ...(priority ? [{
          label: priority.label,
          className: 'dtc__chip dtc__chip--priority',
          style: { background: priority.bg, color: priority.color },
        }] : []),
      ]}
      subtasks={subtaskTotal > 0
        ? { done: subtaskDone, total: subtaskTotal, color: levelColor }
        : undefined}
      dueDate={formatDue(task.dueDate)}
      tags={[task._submoduleName, ...(task.tags?.slice(1) || [])]}
    />
  );
}

function ProjectRow({ project, onClick }) {
  return (
    <button type="button" className="pp-project-row" onClick={() => onClick(project.id)}>
      <span className="pp-project-row__swatch" style={{ background: project.color || '#70d8c8' }} aria-hidden="true" />
      <span className="pp-project-row__name">{project.name}</span>
      <ArrowRight size={14} strokeWidth={2} className="pp-project-row__chev" />
    </button>
  );
}

function EducationList({ nodeId, moduleId, onSelectSubmodule }) {
  // Prefer the pillar's canonical submodule list (e.g., Wealth → all 4) when
  // moduleId is a registered pillar. Fall back to the node's moduleGroup scope
  // for non-pillar groups like 'community'.
  const pillarSubs = getPillarSubmoduleIds(moduleId);
  const submoduleIds = pillarSubs.length > 0 ? pillarSubs : submodulesForNode(nodeId, moduleId);
  if (!submoduleIds || submoduleIds.length === 0) {
    return <p className="pp-mirror-empty">No submodules for this window.</p>;
  }
  return (
    <div className="pp-project-list">
      {submoduleIds.map((id) => {
        const label = getSubmoduleDisplayLabel(id, id);
        const color = getSubmodulePillarColor(id);
        return (
          <button
            key={id}
            type="button"
            className="pp-project-row"
            onClick={() => onSelectSubmodule?.(id, label)}
          >
            <span
              className="pp-project-row__swatch"
              aria-hidden="true"
              style={{ background: color }}
            />
            <span className="pp-project-row__name">{label}</span>
            <ArrowRight size={14} strokeWidth={2} className="pp-project-row__chev" aria-hidden="true" />
          </button>
        );
      })}
    </div>
  );
}

function MirrorCard({
  node,
  tasks,
  projects,
  onSelectTask,
  onSelectProject,
  onSelectSubmodule,
  phaseLabel = 'Now',
  viewMode,
  moduleGroups,
  moduleId,
  onViewMode,
  onModuleId,
  showProjects,
}) {
  return (
    <aside className="pp-mirror-card">
      <div className="pp-mirror-header">
        <span className="pp-mirror-eyebrow">{phaseLabel} · {node.eyebrow}</span>
        <h4 className="pp-mirror-title">{node.title}</h4>
        <div className="pp-mirror-toggles">
          {moduleGroups && moduleGroups.length > 1 && (
            <div className="pp-pill-switch" role="tablist" aria-label="Objective">
              {moduleGroups.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  role="tab"
                  aria-selected={moduleId === g.id}
                  className="pp-pill-switch__btn"
                  data-active={moduleId === g.id || undefined}
                  onClick={() => onModuleId(g.id)}
                >
                  {g.label}
                </button>
              ))}
            </div>
          )}
          <div className="pp-pill-switch" role="tablist" aria-label="View">
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === 'action'}
              className="pp-pill-switch__btn"
              data-active={viewMode === 'action' || undefined}
              onClick={() => onViewMode('action')}
            >
              <Play size={12} strokeWidth={2.25} />
              Action
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === 'education'}
              className="pp-pill-switch__btn"
              data-active={viewMode === 'education' || undefined}
              onClick={() => onViewMode('education')}
            >
              <BookOpen size={12} strokeWidth={2.25} />
              Education
            </button>
          </div>
        </div>
      </div>
      {viewMode === 'education' ? (
        <EducationList nodeId={node.id} moduleId={moduleId} onSelectSubmodule={onSelectSubmodule} />
      ) : showProjects ? (
        (projects || []).length === 0 ? (
          <p className="pp-mirror-empty">No projects in this scope yet.</p>
        ) : (
          <div className="pp-project-list">
            {projects.map((p) => (
              <ProjectRow key={p.id} project={p} onClick={onSelectProject} />
            ))}
          </div>
        )
      ) : (tasks.length === 0 ? (
        <p className="pp-mirror-empty">No tasks queued for this window.</p>
      ) : (
        <div className="pp-task-list">
          {tasks.map((t, i) => (
            <PPTaskCard
              key={t.id}
              task={t}
              index={i}
              onSelectTask={onSelectTask}
            />
          ))}
        </div>
      ))}
    </aside>
  );
}

function TimelineNode({
  node,
  expandedSlot,
  onToggle,
  projects,
  tasksByProject,
  submoduleNameById,
  onSelectTask,
  onSelectProject,
  onSelectSubmodule,
  onOpenPrayer,
  timing,
}) {
  const { Icon, pulse } = node;
  const isPrayerNode = PRAYER_NODE_IDS.has(node.id);
  const isExpanded = !isPrayerNode && expandedSlot !== null;
  const mirrorId = `pp-mirror-${node.id}`;

  const moduleGroups = useMemo(() => getModuleGroups(node.id), [node.id]);
  const [moduleId, setModuleId] = useState(() => moduleGroups[0]?.id || null);
  const [viewMode, setViewMode] = useState('action');

  const setOpeningModuleId = useThresholdStore((s) => s.setOpeningModuleId);
  const setClosingModuleId = useThresholdStore((s) => s.setClosingModuleId);
  const isThresholdNode = isThresholdTriggerNode(node.id);
  // Prefer the per-node canonical module (faith-salah for prayer nodes etc.)
  // over the user-selected moduleGroup so the ceremony content matches the
  // node's covenant — moduleGroups still steer the inline task list.
  const thresholdModuleId = THRESHOLD_MODULE_BY_NODE[node.id] || moduleId || 'work';

  // Universal Before/After ceremony: every spine node now opens the Threshold
  // modal (opening on Before, closing on After). For non-prayer nodes the
  // inline phase-filtered task list also expands behind the modal, so when
  // the user dismisses the ceremony the relevant tasks are already visible.
  const handleBeforeClick = () => {
    if (isThresholdNode) setOpeningModuleId(thresholdModuleId);
    if (!isPrayerNode) onToggle(node.id, 'before');
  };
  const handleAfterClick = () => {
    if (isThresholdNode) setClosingModuleId(thresholdModuleId);
    if (!isPrayerNode) onToggle(node.id, 'after');
  };

  const phaseTasks = useMemo(() => {
    if (!isExpanded) return [];
    return buildTasksForNode(node.id, projects, tasksByProject, {
      limit: 8,
      submoduleNameById,
      phase: expandedSlot,
      moduleId,
    });
  }, [isExpanded, node.id, projects, tasksByProject, submoduleNameById, expandedSlot, moduleId]);

  const showProjects = node.id === 'midday-labor' && expandedSlot === 'main' && viewMode === 'action';
  const scopeProjects = useMemo(() => {
    if (!showProjects) return [];
    const pillarSubs = getPillarSubmoduleIds(moduleId);
    const scopeIds = pillarSubs.length > 0 ? pillarSubs : submodulesForNode(node.id, moduleId);
    return buildUserProjectsForScope(projects, scopeIds);
  }, [showProjects, projects, node.id, moduleId]);

  const handleSelectTask = (taskId) => {
    const row = phaseTasks.find((r) => r.id === taskId);
    if (row) onSelectTask(row);
  };

  const mirror = isExpanded ? (
    <div id={mirrorId}>
      <MirrorCard
        node={node}
        tasks={phaseTasks}
        projects={scopeProjects}
        onSelectTask={handleSelectTask}
        onSelectProject={onSelectProject}
        onSelectSubmodule={onSelectSubmodule}
        phaseLabel={slotLabel(expandedSlot)}
        viewMode={viewMode}
        moduleGroups={moduleGroups}
        moduleId={moduleId}
        onViewMode={setViewMode}
        onModuleId={setModuleId}
        showProjects={showProjects}
      />
    </div>
  ) : null;
  return (
    <div
      className="pp-node"
      data-expanded={isExpanded || undefined}
      data-prayer-state={timing?.state || undefined}
    >
      <div className="pp-marker" data-tone={node.markerTone} data-prayer-state={timing?.state || undefined}>
        <Icon className="pp-marker-icon" size={12} strokeWidth={2.25} />
      </div>
      <div className="pp-node-stack">
        {(isThresholdNode || !isPrayerNode) && (
          <>
            <button
              type="button"
              className="pp-satellite"
              data-slot="before"
              aria-expanded={!isPrayerNode && expandedSlot === 'before'}
              aria-controls={isPrayerNode ? undefined : mirrorId}
              onClick={handleBeforeClick}
            >
              Before
            </button>
            {!isPrayerNode && expandedSlot === 'before' && mirror}
          </>
        )}
        <button
          type="button"
          className="pp-card"
          data-style={node.cardStyle}
          data-prayer-state={timing?.state || undefined}
          aria-expanded={isPrayerNode ? undefined : expandedSlot === 'main'}
          aria-controls={isPrayerNode ? undefined : mirrorId}
          onClick={() => (isPrayerNode ? onOpenPrayer(node.id) : onToggle(node.id, 'main'))}
        >
          {node.cardStyle === 'divine' && <div className="pp-card-glow" aria-hidden="true" />}
          <div className="pp-card-hover" aria-hidden="true" />
          <div className="pp-card-body">
            <span className="pp-eyebrow" data-tone={node.eyebrowTone}>
              {pulse && <span className="pp-pulse-dot" aria-hidden="true" />}
              {node.eyebrow}
              {timing?.time && (
                <span className="pp-time-chip" data-state={timing.state || undefined}>
                  {timing.time}
                  {timing.label && <span className="pp-time-chip__label">{` · ${timing.label}`}</span>}
                </span>
              )}
              {!timing?.time && timing?.label && (
                <span className="pp-time-chip pp-time-chip--anchor">{timing.label}</span>
              )}
              {timing?.state === 'active' && <span className="pp-time-chip__badge">Current</span>}
              {(timing?.state === 'next' || timing?.state === 'next-soon') && <span className="pp-time-chip__badge pp-time-chip__badge--next">Next</span>}
            </span>
            <h3 className="pp-title" data-tone={node.titleTone}>
              {node.title}
            </h3>
            <p className="pp-body-text">{node.body}</p>
            <div className="pp-pillars">
              {node.pillars.map((p, i) => {
                const accent = resolvePillarAccent(p.label);
                return (
                  <span
                    key={i}
                    className="pp-pillar-chip"
                    data-tone={p.tone}
                    style={accent ? { '--chip-accent': accent } : undefined}
                  >
                    {p.label}
                  </span>
                );
              })}
            </div>
          </div>
        </button>
        {!isPrayerNode && expandedSlot === 'main' && mirror}
        {(isThresholdNode || !isPrayerNode) && (
          <>
            <button
              type="button"
              className="pp-satellite"
              data-slot="after"
              aria-expanded={!isPrayerNode && expandedSlot === 'after'}
              aria-controls={isPrayerNode ? undefined : mirrorId}
              onClick={handleAfterClick}
            >
              After
            </button>
            {!isPrayerNode && expandedSlot === 'after' && mirror}
          </>
        )}
      </div>
    </div>
  );
}

function slotLabel(slot) {
  if (slot === 'before') return 'Before';
  if (slot === 'after') return 'After';
  return 'Now';
}

export default function PropheticPath({ variant }) {
  const appTheme = useSettingsStore((s) => s.theme);
  const theme = variant ?? appTheme ?? 'light';
  const projects = useProjectStore((s) => s.projects);
  const ensureWeeklyProjects = useProjectStore((s) => s.ensureWeeklyProjects);
  const tasksByProject = useTaskStore((s) => s.tasksByProject);
  const loadTasks = useTaskStore((s) => s.loadTasks);
  const niyyahFocus = useThresholdStore((s) => s.niyyahFocus);
  const niyyahPillars = useMemo(
    () =>
      (niyyahFocus || [])
        .filter((id) => id !== '_skipped')
        .map((id) => MAQASID_PILLARS.find((p) => p.id === id))
        .filter(Boolean),
    [niyyahFocus]
  );
  const { timings, hijri, cityName, loading: prayerLoading, error: prayerError, requestLocation } = usePrayerTimes();
  const userOverride = useFastingStore((s) => s.userOverride);
  const computeIsFasting = useFastingStore((s) => s.computeIsFasting);
  const computeIsFastableDay = useFastingStore((s) => s.computeIsFastableDay);
  const travelActive = useTravelStore((s) => s.active);
  const travelStartedAt = useTravelStore((s) => s.startedAt);
  const travelEndedAt = useTravelStore((s) => s.endedAt);
  const getIsTraveling = useTravelStore((s) => s.getIsTraveling);
  const ramadan = isHijriRamadan(hijri);
  // userOverride subscription keeps fasting reactive when the user toggles
  // the manual sunnah-fast switch outside Ramadan. travelActive/startedAt/
  // endedAt likewise force re-renders on travel toggle for qasr filters and
  // event-node trigger windows.
  void userOverride; void travelActive; void travelStartedAt; void travelEndedAt;
  const fasting = computeIsFasting(hijri);
  const fastableDay = computeIsFastableDay(hijri);
  const eid = isEidFitr(hijri) || isEidAdha(hijri);
  const traveling = getIsTraveling();
  // Stable shallow object keyed by primitives — reused across memos so each
  // recomputes only when a flag flips, not on every render.
  const dayFlags = useMemo(
    () => ({ isFasting: fasting, isFastableDay: fastableDay, isRamadan: ramadan, isEid: eid, isTraveling: traveling }),
    [fasting, fastableDay, ramadan, eid, traveling]
  );
  const prayerDegraded = !timings && !prayerLoading;
  const nextNodeId = useMemo(() => computeNextNodeId(timings, dayFlags), [timings, dayFlags]);
  const activeNodeId = useMemo(() => computeActiveNodeId(timings, dayFlags), [timings, dayFlags]);
  const dayNodes = useMemo(() => {
    const friday = isFriday(new Date());
    return NODES.filter((n) => {
      if (friday && !traveling && NON_FRIDAY_HIDE_ON_FRIDAY.has(n.id)) return false;
      if (!friday && FRIDAY_ONLY_NODE_IDS.has(n.id)) return false;
      if (friday && traveling && TRAVEL_HIDE_NODE_IDS.has(n.id)) return false;
      if (FASTABLE_DAY_NODE_IDS.has(n.id) && !fastableDay) return false;
      if (RAMADAN_ONLY_NODE_IDS.has(n.id) && !ramadan) return false;
      if (EID_ONLY_NODE_IDS.has(n.id) && !eid) return false;
      if (eid && NON_EID_HIDE_ON_EID.has(n.id)) return false;
      return true;
    });
  }, [fastableDay, ramadan, eid, traveling]);
  const orderedNodes = useMemo(() => {
    const idx = dayNodes.findIndex((n) => n.id === activeNodeId);
    if (idx <= 0) return dayNodes;
    return [...dayNodes.slice(idx), ...dayNodes.slice(0, idx)];
  }, [activeNodeId, dayNodes]);

  // Ephemeral event-node tick — re-renders once a minute while a travel
  // toggle window is potentially active so the departure/arrival cards
  // disappear when the 60-minute window closes.
  const [eventTick, setEventTick] = useState(0);
  useEffect(() => {
    const inWindow = (ts) => Number.isFinite(ts) && Date.now() - ts < EVENT_TRIGGER_WINDOW_MS;
    if (!inWindow(travelStartedAt) && !inWindow(travelEndedAt)) return undefined;
    const id = setInterval(() => setEventTick((t) => t + 1), 60_000);
    return () => clearInterval(id);
  }, [travelStartedAt, travelEndedAt]);

  // Maghrib daily-reset: when the Islamic day flips (Maghrib crosses), clear
  // daily-cadence task state + ceremony completion so the new day begins
  // fresh. Idempotent — the store no-ops if the key has not changed.
  const rolloverIfMaghribCrossed = useIslamicDayStore((s) => s.rolloverIfMaghribCrossed);
  useEffect(() => {
    if (!timings?.Maghrib) return undefined;
    const compute = () => {
      const today = new Date();
      const day = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const maghribMs = timeToMs(timings.Maghrib, day);
      if (maghribMs == null) return;
      rolloverIfMaghribCrossed({
        maghribMs,
        now: Date.now(),
        hooks: [
          () => useTaskStore.getState().resetDailyCadenceTasks(),
          () => useThresholdStore.getState().resetDailyCeremonies(DAILY_CEREMONY_MODULES),
        ],
      });
    };
    compute();
    const id = setInterval(compute, 60_000);
    return () => clearInterval(id);
  }, [timings?.Maghrib, rolloverIfMaghribCrossed]);

  const eventNodes = useMemo(() => {
    void eventTick;
    const out = [];
    const now = Date.now();
    if (
      traveling
      && Number.isFinite(travelStartedAt)
      && now - travelStartedAt < EVENT_TRIGGER_WINDOW_MS
    ) {
      const n = EVENT_NODES.find((x) => x.id === 'traveler-departure');
      if (n) out.push(n);
    }
    if (
      !traveling
      && Number.isFinite(travelEndedAt)
      && now - travelEndedAt < EVENT_TRIGGER_WINDOW_MS
    ) {
      const n = EVENT_NODES.find((x) => x.id === 'traveler-arrival');
      if (n) out.push(n);
    }
    return out;
  }, [traveling, travelStartedAt, travelEndedAt, eventTick]);
  const activeNode = useMemo(
    () => dayNodes.find((n) => n.id === activeNodeId) || null,
    [activeNodeId, dayNodes]
  );
  const bookends = useMemo(() => {
    if (!timings) return null;
    const fajr = stripTz(timings.Fajr);
    const maghrib = stripTz(timings.Maghrib);
    return fajr && maghrib ? `Fajr ${fajr} — Maghrib ${maghrib}` : null;
  }, [timings]);


  // Weekly boards back the midday-labor + morning Before/After satellites
  // (which now trigger the Threshold modal). Ensure they exist so the
  // weekly-cadence tasks are reachable via direct project routes.
  useEffect(() => {
    ensureWeeklyProjects();
  }, [ensureWeeklyProjects]);

  const [expanded, setExpanded] = useState(() => ({ nodeId: inferNodeFromHour(new Date()), slot: 'main' }));
  // { taskId, project, projectId, levelColor } | null
  const [selectedTask, setSelectedTask] = useState(null);
  // projectId for the slide-up overlay (null = closed)
  const [slideUpProjectId, setSlideUpProjectId] = useState(null);
  // { id, label } for the submodule slide-up overlay (null = closed)
  const [slideUpSubmodule, setSlideUpSubmodule] = useState(null);
  // nodeId for the prayer slide-up overlay (null = closed)
  const [slideUpPrayerNodeId, setSlideUpPrayerNodeId] = useState(null);

  // Hydrate tasks for all relevant projects once on mount. The task store
  // lazily loads tasks per project — ensure every project referenced in the
  // TOD mapping has its tasks in memory so the mirror card isn't empty.
  useEffect(() => {
    (projects || []).forEach((p) => {
      if (!tasksByProject[p.id]) loadTasks(p.id);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects]);

  const submoduleNameById = useMemo(() => {
    const map = {};
    MODULES.forEach((m) => { map[m.id] = m.name; });
    return map;
  }, []);

  const toggleNode = (id, slot) => {
    setExpanded((curr) =>
      curr && curr.nodeId === id && curr.slot === slot ? null : { nodeId: id, slot }
    );
  };

  const openTask = (row) => {
    if (!row) { setSelectedTask(null); return; }
    setSelectedTask({
      taskId: row.id,
      project: row._project,
      projectId: row.projectId,
      levelColor: LEVEL_COLOR[row._level] || LEVEL_COLOR[3],
    });
  };

  return (
    <div className="prophetic-path" data-theme={theme}>
      <main className="pp-main">
        <div className="pp-ambient pp-ambient--teal" aria-hidden="true" />
        <div className="pp-ambient pp-ambient--gold" aria-hidden="true" />

        <div className="pp-content">
          <div className="pp-timeline-col">
            {prayerDegraded && (
              <div
                role="alert"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 12,
                  padding: '10px 14px',
                  marginBottom: 12,
                  border: '1px solid var(--border, #d4b06f44)',
                  borderRadius: 8,
                  background: 'var(--surface-2, rgba(200,169,110,0.08))',
                  color: 'var(--text2, #888)',
                  fontSize: 13,
                }}
              >
                <span>
                  Prayer times unavailable
                  {prayerError ? ` — ${prayerError}` : ' — set city in Settings to ground today\'s rhythm'}.
                </span>
                <button
                  type="button"
                  onClick={requestLocation}
                  style={{
                    padding: '4px 10px',
                    fontSize: 12,
                    border: '1px solid var(--border, #ccc)',
                    borderRadius: 6,
                    background: 'var(--surface, #fff)',
                    color: 'var(--text, #222)',
                    cursor: 'pointer',
                  }}
                >
                  Retry
                </button>
              </div>
            )}
            <PropheticPathBanner hijri={hijri} />
            {(cityName || activeNode || bookends || niyyahPillars.length > 0) && (
              <div className="pp-intro">
                {(cityName || activeNode || bookends) && (
                  <header className="pp-intro__header">
                    {cityName && (
                      <span className="pp-intro__eyebrow">{cityName}</span>
                    )}
                    {activeNode && (
                      <h1 className="pp-intro__hero">{activeNode.title}</h1>
                    )}
                    {bookends && (
                      <p className="pp-intro__bookends">{bookends}</p>
                    )}
                  </header>
                )}
                {niyyahPillars.length > 0 && (
                <div className="pp-niyyah-echo" role="status" aria-label="Today's intention">
                  <span className="pp-niyyah-echo__label">
                    <span className="pp-niyyah-echo__label-en">Today you carry</span>
                    <span className="pp-niyyah-echo__label-ar">نية اليوم</span>
                  </span>
                  <span className="pp-niyyah-echo__chips">
                    {niyyahPillars.map((p) => (
                      <span
                        key={p.id}
                        className="pp-niyyah-echo__chip"
                        style={{
                          borderColor: p.accentColor,
                          color: p.accentColor,
                          background: p.accentColor + '14',
                        }}
                      >
                        {p.sidebarLabel}
                      </span>
                    ))}
                  </span>
                </div>
                )}
              </div>
            )}

            {eventNodes.length > 0 && (
              <div className="pp-spine pp-spine--events">
                {eventNodes.map((node) => (
                  <TimelineNode
                    key={node.id}
                    node={node}
                    expandedSlot={expanded && expanded.nodeId === node.id ? expanded.slot : null}
                    onToggle={toggleNode}
                    projects={projects}
                    tasksByProject={tasksByProject}
                    submoduleNameById={submoduleNameById}
                    onSelectTask={openTask}
                    onSelectProject={setSlideUpProjectId}
                    onSelectSubmodule={(id, label) => setSlideUpSubmodule({ id, label })}
                    onOpenPrayer={setSlideUpPrayerNodeId}
                    timing={null}
                  />
                ))}
              </div>
            )}
            <div className="pp-spine">
              {orderedNodes.map((node) => (
                <TimelineNode
                  key={node.id}
                  node={node}
                  expandedSlot={expanded && expanded.nodeId === node.id ? expanded.slot : null}
                  onToggle={toggleNode}
                  projects={projects}
                  tasksByProject={tasksByProject}
                  submoduleNameById={submoduleNameById}
                  onSelectTask={openTask}
                  onSelectProject={setSlideUpProjectId}
                  onSelectSubmodule={(id, label) => setSlideUpSubmodule({ id, label })}
                  onOpenPrayer={setSlideUpPrayerNodeId}
                  timing={deriveNodeTiming(node.id, timings, activeNodeId, nextNodeId)}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      {selectedTask?.project && (
        <TaskDetailPanel
          project={selectedTask.project}
          projectId={selectedTask.projectId}
          taskId={selectedTask.taskId}
          onClose={() => setSelectedTask(null)}
          bbosRole={selectedTask.project.bbosRole || 'all'}
          accentColor={selectedTask.levelColor}
        />
      )}
      {slideUpProjectId && (
        <ProjectSlideUp
          projectId={slideUpProjectId}
          onClose={() => setSlideUpProjectId(null)}
        />
      )}
      {slideUpSubmodule?.id && (
        <SubmoduleSlideUp
          submoduleId={slideUpSubmodule.id}
          fallbackLabel={slideUpSubmodule.label}
          onClose={() => setSlideUpSubmodule(null)}
        />
      )}
      {slideUpPrayerNodeId && (
        <PrayerSlideUp
          nodeId={slideUpPrayerNodeId}
          onClose={() => setSlideUpPrayerNodeId(null)}
          onSelectTask={openTask}
          onNavigate={setSlideUpPrayerNodeId}
        />
      )}
    </div>
  );
}
