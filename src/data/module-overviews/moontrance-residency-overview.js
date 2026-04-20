// Residency module — Overview cards + Maqasid framework data.
// Long-term community formation, residency model, trust-building, permanence.
// Quranic text grounded via quran.ai MCP (fetch_quran + fetch_translation,
// editions: ar-simple-clean, en-abdel-haleem) for ayat 59:9, 49:13, 42:38.

export const OVERVIEW = [
  {
    id: 'hijrah-jadidah',
    name: 'Hijrah Jad\u012Bdah',
    arabic: '\u0647\u062C\u0631\u0629 \u062C\u062F\u064A\u062F\u0629',
    meaning: 'A New Migration',
    order: 1,
    ayahKey: '59:9',
    ayahArabic:
      '\u0648\u0627\u0644\u0630\u064A\u0646 \u062A\u0628\u0648\u0621\u0648\u0627 \u0627\u0644\u062F\u0627\u0631 \u0648\u0627\u0644\u0625\u064A\u0645\u0627\u0646 \u0645\u0646 \u0642\u0628\u0644\u0647\u0645 \u064A\u062D\u0628\u0648\u0646 \u0645\u0646 \u0647\u0627\u062C\u0631 \u0625\u0644\u064A\u0647\u0645',
    ayahTranslation:
      'Those who were already firmly established in their homes and firmly rooted in faith, who love those who migrated to them...',
    description:
      'The Ansar of Madinah did not merely tolerate the Muhajirun \u2014 they loved them, shared with them, and built a new society together. MTC residency follows this model: founding families who commit to the land, welcome newcomers, and build permanent community. This is hijrah in its truest sense \u2014 not flight from something, but migration toward a life aligned with purpose.',
    conditions: [
      'Founding families commit to a minimum residency period with clear expectations',
      'Newcomers are welcomed and integrated through a structured onboarding process',
      'Shared resources and mutual aid are formalised, not left to goodwill alone',
      'The community covenant is signed and understood before residency begins',
      'No family is isolated \u2014 communal spaces, shared meals, and regular check-ins are standard',
    ],
    virtues: [
      'The Ansar-Muhajirun bond is the prophetic model for intentional community formation',
      'Families who migrate for the sake of Allah find provision they did not expect (Quran 65:2-3)',
      'Children raised in intentional Muslim community develop stronger identity and belonging',
      'A new hijrah community becomes a living proof of Islamic social architecture',
    ],
  },
  {
    id: 'shura-hukm',
    name: 'Sh\u016Br\u0101 & \u1e24ukm',
    arabic: '\u0634\u0648\u0631\u0649 \u0648\u062D\u0643\u0645',
    meaning: 'Consultation & Governance',
    order: 2,
    ayahKey: '42:38',
    ayahArabic:
      '\u0648\u0627\u0644\u0630\u064A\u0646 \u0627\u0633\u062A\u062C\u0627\u0628\u0648\u0627 \u0644\u0631\u0628\u0647\u0645 \u0648\u0623\u0642\u0627\u0645\u0648\u0627 \u0627\u0644\u0635\u0644\u0627\u0629 \u0648\u0623\u0645\u0631\u0647\u0645 \u0634\u0648\u0631\u0649 \u0628\u064A\u0646\u0647\u0645',
    ayahTranslation:
      '...who respond to their Lord, keep up the prayer, conduct their affairs by mutual consultation...',
    description:
      'Permanent community requires governance, and Islamic governance is built on shura (consultation). MTC residency establishes a governance structure where decisions affecting the community are made collectively, leadership rotates or is accountable, and the covenant is the constitution. No single family or personality dominates.',
    conditions: [
      'Community governance structure documented and agreed upon before first residents arrive',
      'Regular shura meetings with documented decisions and transparent follow-through',
      'Leadership accountability mechanisms \u2014 no permanent, unchecked authority',
      'Conflict resolution process established and known to all residents',
      'Financial transparency: all community funds, expenses, and allocations are visible to residents',
    ],
    virtues: [
      'Shura is listed alongside salah as a quality of the believers (Quran 42:38)',
      'Governance by consultation prevents tyranny and builds collective ownership',
      'Transparent financial management builds trust that sustains community through difficulty',
      'A well-governed Muslim community becomes a model others seek to replicate',
    ],
  },
  {
    id: 'taaruf-tamkin',
    name: 'Ta\u2018\u0101ruf & Tamk\u012Bn',
    arabic: '\u062A\u0639\u0627\u0631\u0641 \u0648\u062A\u0645\u0643\u064A\u0646',
    meaning: 'Knowing One Another & Establishment',
    order: 3,
    ayahKey: '49:13',
    ayahArabic:
      '\u064A\u0627 \u0623\u064A\u0647\u0627 \u0627\u0644\u0646\u0627\u0633 \u0625\u0646\u0627 \u062E\u0644\u0642\u0646\u0627\u0643\u0645 \u0645\u0646 \u0630\u0643\u0631 \u0648\u0623\u0646\u062B\u0649 \u0648\u062C\u0639\u0644\u0646\u0627\u0643\u0645 \u0634\u0639\u0648\u0628\u0627 \u0648\u0642\u0628\u0627\u0626\u0644 \u0644\u062A\u0639\u0627\u0631\u0641\u0648\u0627',
    ayahTranslation:
      'People, We created you all from a single man and a single woman, and made you into races and tribes so that you should get to know one another...',
    description:
      'Permanent community is built on genuine knowing \u2014 ta\u2018aruf. Diverse families from different backgrounds, cultures, and professional worlds come together not despite their differences but because of them. Tamkin (establishment) follows: once the community knows itself, it can establish institutions, traditions, and infrastructure that endure beyond any single generation.',
    conditions: [
      'Diversity of background, profession, and culture is actively sought in resident selection',
      'Structured ta\u2018aruf activities during the first year of residency \u2014 shared meals, stories, work',
      'Community traditions established collaboratively, not imposed by founders',
      'Institutional infrastructure (education, worship, governance) designed for generational continuity',
      'Waqf or trust structure ensures the community outlasts its founding generation',
    ],
    virtues: [
      'Allah made diversity so that we might know one another \u2014 not tolerate, but genuinely know',
      'A community built on ta\u2018aruf is resilient against the tribalism Islam came to abolish',
      'Institutions designed for permanence become sadaqah jariyah for the founders',
      'The community that establishes itself on these principles becomes a city on a hill \u2014 visible, undeniable',
    ],
  },
];

export const MAQASID = {
  label: 'Residency',
  necessities: [
    'Community covenant signed and understood by all founding residents',
    'Governance structure (shura-based) documented and operational',
    'Basic infrastructure: housing, worship space, water, and food access for all residents',
  ],
  needs: [
    'Structured onboarding and ta\u2018aruf programme for new residents',
    'Conflict resolution and accountability mechanisms active',
    'Financial transparency and community fund management in place',
  ],
  embelishments: [
    'Full residency model with year-round families and institutional infrastructure',
    'Waqf endowment generating surplus for broader community benefit',
    'Replicable model documented for other Muslim communities to adapt',
  ],
};
