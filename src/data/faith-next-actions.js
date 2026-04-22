// Per-pillar "Next action" prompts for the Faith module wheel.
// Keyed by pillar id, then by level. Shown in the sector-adjacent pop-out card
// when the user hovers a sector and the pillar is not yet at 100%.
export const FAITH_NEXT_ACTIONS = {
  shahada: { core: 'Renew the Shahada', growth: 'Deepen tawḥīd study', excellence: 'Teach the creed' },
  salat:   { core: 'Establish Fajr on time', growth: 'Pray with khushūʿ', excellence: 'Night prayer rhythm' },
  zakat:   { core: 'Calculate Zakat', growth: 'Regular Sadaqah habit', excellence: 'Endow a Waqf' },
  siyam:   { core: 'Ramadan preparation', growth: 'Weekly Sunnah fasts', excellence: 'Dawood-style fasting' },
  hajj:    { core: 'Save for Hajj', growth: 'Umrah readiness', excellence: 'Serve pilgrims' },
};

export default FAITH_NEXT_ACTIONS;
