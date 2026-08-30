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
  // Friday and ʻĪd are not bigger Dhuhrs: each authors its own ceremony in
  // MODULE_ATTRS rather than opening on "Before Standing in Salah".
  jumuah: 'jumuah',
  'eid-prayer': 'eid-prayer',
  'after-asr': 'family',
  'istijabah-hour': 'istijabah-hour',
  sahari: 'faith-siyam',
  'maghrib-iftar': 'faith-siyam',
  'isha-taraweeh': 'faith-siyam',
  bedtime: 'health-physical',
  'qiyam-rest': 'health-physical',
  // The midday rest is a single hinge in one day, not the body-as-project
  // threshold 'health-physical' is authored for.
  qaylulah: 'qaylulah',
  // Both travel nodes had no key at all and fell through to the Work threshold
  // (NodePhaseSlideUp: THRESHOLD_MODULE_BY_NODE[id] || moduleId || 'work').
  'traveler-departure': 'traveler-departure',
  'traveler-arrival': 'traveler-arrival',
  morning: 'work',
  'midday-labor': 'work',
};

// Any node id present as a key in THRESHOLD_MODULE_BY_NODE is a threshold
// trigger — both prayer + non-prayer.
export const isThresholdTriggerNode = (nodeId) =>
  Object.prototype.hasOwnProperty.call(THRESHOLD_MODULE_BY_NODE, nodeId);
