// Shared Prophetic Path constants.
//
// These live outside `PropheticPath.jsx` so `NodePhaseSlideUp` and
// `PropheticPathMirror` can consume them without importing the page component
// back (which would be a circular import).

// Maqasid level → accent colour (mirrors PillarLevelDashboard.LEVEL_COLORS).
export const LEVEL_COLOR = { 1: '#C8A96E', 2: '#4ab8a8', 3: '#8b5cf6' };

// Nodes whose During phase renders the inline prayer guide (PrayerHeroDuring)
// instead of the generic mirror content, and whose Before/After phases show the
// phase task board only. Tahajjud is included per the "all prayer-like nodes"
// decision, even though it lacks a standard window.
export const PRAYER_NODE_IDS = new Set(['fajr', 'dhuhr', 'asr', 'maghrib', 'isha', 'tahajjud']);

// Every spine node's Before/After phase opens the opening/closing Threshold
// ceremony. Each node maps to the module whose ceremony it triggers — prayer
// nodes route to `faith-salah`, fasting nodes to `faith-siyam`, transitional
// rest nodes to `health-physical`, work transitions to `work`.
export const THRESHOLD_MODULE_BY_NODE = {
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

// Any node id present as a key in THRESHOLD_MODULE_BY_NODE is a threshold
// trigger — both prayer + non-prayer.
export const isThresholdTriggerNode = (nodeId) =>
  Object.prototype.hasOwnProperty.call(THRESHOLD_MODULE_BY_NODE, nodeId);
