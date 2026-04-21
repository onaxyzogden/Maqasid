import { Sunrise, Sun, CloudSun, Sunset, Moon, Star } from 'lucide-react';

// Six prayer-like nodes on the Prophetic Path. Tahajjud is not in the five
// fard prayers but gets the same three-phase treatment in the slide-up.
export const PRAYER_PILLARS = [
  { id: 'fajr',     label: 'Fajr',     Icon: Sunrise,  route: null },
  { id: 'dhuhr',    label: 'Dhuhr',    Icon: Sun,      route: null },
  { id: 'asr',      label: 'Asr',      Icon: CloudSun, route: null },
  { id: 'maghrib',  label: 'Maghrib',  Icon: Sunset,   route: null },
  { id: 'isha',     label: 'Isha',     Icon: Moon,     route: null },
  { id: 'tahajjud', label: 'Tahajjud', Icon: Star,     route: null },
];

// Three-phase carousel for the slide-up. Shape mirrors LEVELS in
// LevelNavigator so we can pass as `customLevels`.
export const PRAYER_LEVELS = [
  {
    key: 'before',
    label: 'BEFORE',
    subtitle: '(PRE-PRAYER)',
    title: 'Before',
    desc: 'Pre-prayer sunan: preparation, wudu, rawatib, adhkar.',
    color: '#C8A96E',
    routeSuffix: 'before',
  },
  {
    key: 'during',
    label: 'DURING',
    subtitle: '(IN-PRAYER)',
    title: 'During',
    desc: 'The prayer itself. Silence other things.',
    color: '#4ab8a8',
    routeSuffix: 'during',
  },
  {
    key: 'after',
    label: 'AFTER',
    subtitle: '(POST-PRAYER)',
    title: 'After',
    desc: 'Post-prayer sunan: tasbih, adhkar, prophetic supplications.',
    color: '#8b5cf6',
    routeSuffix: 'after',
  },
];

export const PRAYER_PHASE_KEYS = PRAYER_LEVELS.map((l) => l.key);

export const PRAYER_LEVEL_COLORS = {
  before: '#C8A96E',
  during: '#4ab8a8',
  after:  '#8b5cf6',
};

export const PRAYER_BOARD_PREFIX = 'prayer';

// 18 boards: 6 prayers × 3 phases. `during` boards exist for structural
// consistency with the FLN pattern but are never rendered as kanban — the
// PrayerLevelPage overrides with PrayerHeroDuring when activeLevel === 'during'.
export const PRAYER_BOARDS = PRAYER_PILLARS.flatMap((pillar) =>
  PRAYER_LEVELS.map((level) => ({
    id: `prayer_${pillar.id}_${level.key}`,
    name: `${pillar.label.toUpperCase()} — ${level.key.toUpperCase()}`,
    color: level.color,
    icon: 'HeartHandshake',
    description: `${pillar.label}: ${level.key}-prayer`,
    moduleId: null,
  }))
);
