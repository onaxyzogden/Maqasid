// Land module — Overview cards + Maqasid framework data.
// Land acquisition, soil stewardship (khilafah), water systems, regenerative agriculture.
// Quranic text grounded via quran.ai MCP (fetch_quran + fetch_translation,
// editions: ar-simple-clean, en-abdel-haleem) for ayat 2:30, 7:56, 55:10.

export const OVERVIEW = [
  {
    id: 'khilafah-ard',
    name: 'Khil\u0101fah al-Ar\u1e0d',
    arabic: '\u062E\u0650\u0644\u0627\u0641\u0629 \u0627\u0644\u0623\u0631\u0636',
    meaning: 'Stewardship of the Land',
    order: 1,
    ayahKey: '2:30',
    ayahArabic:
      '\u0648\u0625\u0630 \u0642\u0627\u0644 \u0631\u0628\u0643 \u0644\u0644\u0645\u0644\u0627\u0626\u0643\u0629 \u0625\u0646\u064A \u062C\u0627\u0639\u0644 \u0641\u064A \u0627\u0644\u0623\u0631\u0636 \u062E\u0644\u064A\u0641\u0629',
    ayahTranslation:
      '[Prophet], when your Lord told the angels, \'I am putting a successor on earth...\'',
    description:
      'The human being was placed on earth as khalifah \u2014 steward, not owner. Land acquisition for MTC begins with this framing: every parcel is an amanah (trust) to tend, protect, and pass forward. Due diligence is not merely financial \u2014 it is spiritual, ecological, and generational.',
    conditions: [
      'Land is evaluated for stewardship potential, not just financial return',
      'Soil health, water access, and ecological integrity are primary acquisition criteria',
      'Legal structure protects land from speculative resale or private exploitation',
      'Every acquisition decision passes the khilafah test: would this honour the trust?',
      'Indigenous land rights and prior stewardship are respected and acknowledged',
    ],
    virtues: [
      'The highest title given to humanity by Allah \u2014 khalifah, placed with purpose on the earth',
      'Land tended with this intention becomes a source of ongoing reward (sadaqah jariyah)',
      'A model that proves Muslims can lead in regenerative land stewardship',
      'The earth testifies on the Day of Judgment \u2014 what it witnessed matters',
    ],
  },
  {
    id: 'islah-turbah',
    name: 'I\u1e63l\u0101\u1e25 al-Turbah',
    arabic: '\u0625\u0635\u0644\u0627\u062D \u0627\u0644\u062A\u0631\u0628\u0629',
    meaning: 'Soil Restoration & Regeneration',
    order: 2,
    ayahKey: '7:56',
    ayahArabic:
      '\u0648\u0644\u0627 \u062A\u0641\u0633\u062F\u0648\u0627 \u0641\u064A \u0627\u0644\u0623\u0631\u0636 \u0628\u0639\u062F \u0625\u0635\u0644\u0627\u062D\u0647\u0627',
    ayahTranslation:
      'Do not corrupt the earth after it has been set right...',
    description:
      'Regenerative agriculture is not a modern invention \u2014 it is a return to the Quranic command not to corrupt the earth after Allah set it right. Soil is a living trust: its microbiome, nutrient cycles, and water-holding capacity are signs of Allah that sustain all life. MTC treats soil health as the foundation of everything built on the land.',
    conditions: [
      'Soil testing and baseline assessment before any development or planting',
      'No synthetic fertilisers, pesticides, or practices that degrade soil biology',
      'Cover cropping, composting, and rotational grazing as standard practice',
      'Soil health metrics tracked seasonally \u2014 organic matter, microbial activity, water retention',
      'Every building footprint minimises soil compaction and preserves topsoil',
    ],
    virtues: [
      'The Prophet \uFDFA said: "If a Muslim plants a tree or sows seeds, and then a bird, or a person, or an animal eats from it, it is regarded as charity" (Sahih al-Bukhari 2320)',
      'Healthy soil is the foundation of halal food \u2014 purity begins in the ground',
      'Regenerative practice reverses environmental harm rather than merely slowing it',
      'A living demonstration that Islamic stewardship produces measurable ecological results',
    ],
  },
  {
    id: 'nizam-miyah',
    name: 'Ni\u1e93\u0101m al-Miy\u0101h',
    arabic: '\u0646\u0638\u0627\u0645 \u0627\u0644\u0645\u064A\u0627\u0647',
    meaning: 'Water Systems & Stewardship',
    order: 3,
    ayahKey: '55:10',
    ayahArabic:
      '\u0648\u0627\u0644\u0623\u0631\u0636 \u0648\u0636\u0639\u0647\u0627 \u0644\u0644\u0623\u0646\u0627\u0645',
    ayahTranslation:
      'He set down the earth for all living creatures.',
    description:
      'Water is life, and its stewardship is among the most sacred responsibilities of the khalifah. MTC water systems \u2014 wells, rainwater harvesting, greywater recycling, and irrigation \u2014 are designed for abundance without waste. The Prophet \uFDFA forbade wasting water even when washing at a flowing river; this ethic governs every water decision on the land.',
    conditions: [
      'Water sources assessed and protected before any development begins',
      'Rainwater harvesting infrastructure installed as a primary water strategy',
      'Greywater recycling systems for non-potable agricultural use',
      'No water-intensive practices without a conservation offset plan',
      'Water quality monitored regularly for the safety of people, animals, and crops',
    ],
    virtues: [
      'The Prophet \uFDFA said: "Do not waste water even if you are at a running stream" \u2014 water conservation is sunnah',
      'Water access is a right of every living creature on the land',
      'Well-designed water systems reduce dependency on external infrastructure',
      'A community that stewards its water stewards its future',
    ],
  },
];

export const MAQASID = {
  label: 'Land',
  necessities: [
    'Land acquired through rigorous due diligence with khilafah framing',
    'Basic infrastructure: water access, road access, and legal protection from speculative resale',
    'Soil baseline assessment completed and regeneration plan established',
  ],
  needs: [
    'Regenerative agriculture systems operational \u2014 cover crops, composting, rotational grazing',
    'Water infrastructure: rainwater harvesting, greywater recycling, irrigation',
    'Seasonal land management calendar aligned with agricultural and Islamic cycles',
  ],
  embelishments: [
    'Self-sustaining ecosystem \u2014 land produces more than it consumes',
    'Demonstration site for Islamic regenerative land stewardship',
    'Carbon-negative land management with measurable ecological restoration',
  ],
};
