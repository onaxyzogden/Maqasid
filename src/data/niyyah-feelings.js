// Niyyah Ad-lib — feeling vocabulary (ḥāl al-qalb, states of the heart).
// Rooted in ʿilm al-nafs / tazkiyah. Islamic label is the primary surface
// when settingsStore.valuesLayer === 'islamic'; otherwise the universal
// label is shown.
//
// Schema:
//   id               — stable key persisted to threshold-store
//   arabic           — Arabic term (with ḥarakāt where disambiguating)
//   translit         — transliteration (ALA-LC style with macrons)
//   englishIslamic   — primary English surface inside the Islamic layer
//   universal        — surface for valuesLayer === 'universal'
//   valence          — 'positive' | 'negative' (for UI ordering / tone)
//   note             — one-line plain-English gloss (tooltip)
//   grounding        — optional Quranic / classical reference (flag for
//                      Muslim Scholar NotebookLM citation review before ship)
//   pairsWellWith    — optional pillar ids that this feeling tends to
//                      resonate with; used ONLY as a soft surface hint in
//                      the submodule dropdown. Does not gate or exclude
//                      any pillar (per "Never Blacklist Revelation" rule).

export const NIYYAH_FEELINGS = [
  {
    id: 'sakinah',
    arabic: "سَكِينَة",
    translit: "Sakīnah",
    englishIslamic: 'Settled tranquility',
    universal: 'Calm',
    valence: 'positive',
    note: "Divinely-sent stillness that descends on the heart.",
    grounding: 'Quran 48:4',
    pairsWellWith: ['faith', 'life', 'moontrance'],
  },
  {
    id: 'inshirah',
    arabic: "اِنْشِرَاح الصَّدْر",
    translit: "Inshirāḥ aṣ-ṣadr",
    englishIslamic: 'Expanded chest',
    universal: 'Open',
    valence: 'positive',
    note: "Spacious, unobstructed readiness to receive.",
    grounding: 'Quran 94:1',
    pairsWellWith: ['intellect', 'ummah', 'environment'],
  },
  {
    id: 'tumaninah',
    arabic: "طُمَأْنِينَة",
    translit: "Ṭumaʾnīnah",
    englishIslamic: 'Deep reassurance',
    universal: 'Grounded',
    valence: 'positive',
    note: "Heart at rest through remembrance.",
    grounding: 'Quran 13:28',
    pairsWellWith: ['faith', 'family', 'moontrance'],
  },
  {
    id: 'shukr',
    arabic: "شُكْر",
    translit: "Shukr",
    englishIslamic: 'Grateful',
    universal: 'Grateful',
    valence: 'positive',
    note: "Recognition of blessing, expressed in action.",
    grounding: 'Quran 14:7',
    pairsWellWith: ['wealth', 'family', 'environment'],
  },
  {
    id: 'khushu',
    arabic: "خُشُوع",
    translit: "Khushūʿ",
    englishIslamic: 'Reverently focused',
    universal: 'Focused',
    valence: 'positive',
    note: "Humble attentiveness; awareness of the Divine gaze.",
    grounding: 'Quran 23:2',
    pairsWellWith: ['faith', 'intellect'],
  },
  {
    id: 'raja',
    arabic: "رَجَاء",
    translit: "Rajāʾ",
    englishIslamic: 'Hopeful',
    universal: 'Hopeful',
    valence: 'positive',
    note: "Active expectation of Allah's mercy and response.",
    grounding: 'Quran 39:53',
    pairsWellWith: ['faith', 'wealth'],
  },
  {
    id: 'shawq',
    arabic: "شَوْق",
    translit: "Shawq",
    englishIslamic: 'Yearning',
    universal: 'Curious',
    valence: 'positive',
    note: "Longing for nearness, for knowledge, for the next step.",
    pairsWellWith: ['intellect', 'ummah'],
  },
  {
    id: 'qabd',
    arabic: "قَبْض",
    translit: "Qabḍ",
    englishIslamic: 'Contracted heart',
    universal: 'Restless',
    valence: 'negative',
    note: "A quiet tightening; unease without clear cause.",
    pairsWellWith: ['faith', 'life', 'moontrance'],
  },
  {
    id: 'dayq',
    arabic: "ضِيق الصَّدْر",
    translit: "Ḍayq aṣ-ṣadr",
    englishIslamic: 'Tightened chest',
    universal: 'Overwhelmed',
    valence: 'negative',
    note: "Capacity is near its limit; simplify before you act.",
    grounding: 'Quran 15:97',
    pairsWellWith: ['life', 'family'],
  },
  {
    id: 'ghaflah',
    arabic: "غَفْلَة",
    translit: "Ghaflah",
    englishIslamic: 'Heedless / distant',
    universal: 'Distant',
    valence: 'negative',
    note: "Drift from remembrance; return through dhikr or community.",
    grounding: 'Quran 7:205',
    pairsWellWith: ['faith', 'ummah', 'environment'],
  },
  {
    id: 'huzn',
    arabic: "حُزْن",
    translit: "Ḥuzn",
    englishIslamic: 'Sorrowful',
    universal: 'Heavy',
    valence: 'negative',
    note: "Grief that seeks gentle pacing and patient company.",
    pairsWellWith: ['family', 'faith'],
  },
  {
    id: 'hayrah',
    arabic: "حَيْرَة",
    translit: "Ḥayrah",
    englishIslamic: 'Bewildered',
    universal: 'Unsure',
    valence: 'negative',
    note: "Seeking direction; a signal to consult and reflect.",
    pairsWellWith: ['intellect', 'faith'],
  },
];

export const NIYYAH_FEELINGS_BY_ID = Object.fromEntries(
  NIYYAH_FEELINGS.map((f) => [f.id, f])
);

export const getFeeling = (id) => (id ? NIYYAH_FEELINGS_BY_ID[id] ?? null : null);

export const getFeelingLabel = (id, valuesLayer = 'islamic') => {
  const f = getFeeling(id);
  if (!f) return null;
  return valuesLayer === 'islamic' ? f.englishIslamic : f.universal;
};
