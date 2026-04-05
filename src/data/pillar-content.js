// Pillar dashboard content: Necessities / Needs / Embelishments (Daruriyyat / Hajiyyat / Tahsiniyyat)
// Each entry maps a subModuleId to its three-column content rows.
// Rows align index-by-index: necessities[0] pairs with needs[0] and embelishments[0].
// If a column has fewer items than others, extra rows render that cell as empty.

export const PILLAR_CONTENT = {
  faith: [
    {
      subModuleId: 'five-pillars',
      necessities: [
        'Shahada — Sincere belief and oral declaration of the faith.',
        'Salat — Ritual purity (Wudu), facing the Kaaba, and specific daily timings.',
        'Zakat — Ownership of wealth above a minimum threshold (Nisab) for one year.',
        'Sawm — Abstaining from food/drink/bad habits from dawn to sunset during Ramadan.',
        'Hajj — Physical health and financial means to travel to Mecca.',
      ],
      needs: [
        'Establishes identity, purpose, and monotheism.',
        'Spiritual discipline, mindfulness, and direct connection to God.',
        'Social justice, purification of wealth, and poverty alleviation.',
        'Self-restraint, spiritual growth, and empathy for the hungry.',
        'Universal brotherhood, unity, and a spiritual "reset" or rebirth.',
      ],
      embelishments: [
        'Voluntary prayers (Sunnah/Nawafil)',
      ],
    },
    {
      subModuleId: 'quran',
      necessities: ['Literacy / Translation'],
      needs: ['Divine Guidance'],
      embelishments: ['Memorization, beautiful recitation'],
    },
    {
      subModuleId: 'hadith',
      necessities: ['Scholarly verification'],
      needs: ['Clarification of law/ethics'],
      embelishments: [],
    },
  ],

  life: [],
  intellect: [],

  family: [
    { subModuleId: 'family', necessities: [], needs: [], embelishments: [] },
    { subModuleId: 'neighbors', necessities: [], needs: [], embelishments: [] },
    { subModuleId: 'community', necessities: [], needs: [], embelishments: [] },
  ],

  wealth: [
    { subModuleId: 'money', necessities: [], needs: [], embelishments: [] },
    { subModuleId: 'work', necessities: [], needs: [], embelishments: [] },
    { subModuleId: 'office', necessities: [], needs: [], embelishments: [] },
    { subModuleId: 'tech', necessities: [], needs: [], embelishments: [] },
    { subModuleId: 'people', necessities: [], needs: [], embelishments: [] },
  ],

  environment: [],
};
