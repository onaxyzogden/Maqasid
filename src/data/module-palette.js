// Per-module palette used by the Maqasid Comparison Wheel.
//
// Two-axis color system:
//
//   1. LEVEL COLORS (core / growth / excellence) — UNIVERSAL across all
//      modules. Drive the `.mcw-seg-current` progress fill and the
//      `LevelNavigator` pills. Every module shows the same three tints:
//        core       = Gold
//        growth     = Green
//        excellence = Purple
//
//   2. MODULE THEME COLOR (`theme`) — one hex per module, INDEPENDENT of
//      level. Drives the `.mcw-band` outer ring of the wheel so each
//      module has its own identifying halo regardless of which level
//      the user is looking at.
//
// Consumers:
//   - `.mcw-seg-current` → `MODULE_PALETTE[x][level]`  (== LEVEL_COLORS[level])
//   - `.mcw-band`        → `MODULE_PALETTE[x].theme`

// Universal level colors — single source of truth.
export const LEVEL_COLORS = {
  core:       '#C8A96E', // Gold
  growth:     '#4AB8A8', // Green
  excellence: '#8E7CC3', // Purple
};

const { core: GOLD, growth: GREEN, excellence: PURPLE } = LEVEL_COLORS;

export const MODULE_PALETTE = {
  faith:       { core: GOLD, growth: GREEN, excellence: PURPLE, theme: '#FFFFFF' },
  life:        { core: GOLD, growth: GREEN, excellence: PURPLE, theme: '#3DA58C' },
  intellect:   { core: GOLD, growth: GREEN, excellence: PURPLE, theme: '#6B8EBF' },
  family:      { core: GOLD, growth: GREEN, excellence: PURPLE, theme: '#C27A7A' },
  wealth:      { core: GOLD, growth: GREEN, excellence: PURPLE, theme: '#7A9E4E' },
  environment: { core: GOLD, growth: GREEN, excellence: PURPLE, theme: '#4F8F6E' },
  ummah:       { core: GOLD, growth: GREEN, excellence: PURPLE, theme: '#8A6BB8' },
  moontrance:  { core: GOLD, growth: GREEN, excellence: PURPLE, theme: '#5C8A7B' },
};

export default MODULE_PALETTE;
