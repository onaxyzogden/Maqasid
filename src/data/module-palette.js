// Per-module palette used by the Maqasid Comparison Wheel.
// One hex per level (core/growth/excellence) per module. Hex values are
// sampled from the existing `*-progress-fill--light/growth/excellence` CSS
// classes so the wheel's color language matches each module's bento grid.
//
// Faith hex values reproduce the hardcoded palette from FaithLevelOverview
// so consolidating through this table is a pure refactor.

export const MODULE_PALETTE = {
  faith:       { core: '#C8A96E', growth: '#4AB8A8', excellence: '#8E7CC3' },
  life:        { core: '#3DA58C', growth: '#7FB8A0', excellence: '#C8A96E' },
  intellect:   { core: '#6B8EBF', growth: '#8FA7C7', excellence: '#C8A96E' },
  family:      { core: '#C27A7A', growth: '#D8A49B', excellence: '#C8A96E' },
  wealth:      { core: '#7A9E4E', growth: '#A3B87A', excellence: '#C8A96E' },
  environment: { core: '#4F8F6E', growth: '#86B39A', excellence: '#C8A96E' },
  ummah:       { core: '#8A6BB8', growth: '#AE95CE', excellence: '#C8A96E' },
  moontrance:  { core: '#5C8A7B', growth: '#89B09E', excellence: '#C8A96E' },
};

export default MODULE_PALETTE;
