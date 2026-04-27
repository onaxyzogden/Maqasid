// Niyyah Ad-lib â€” feeling vocabulary (á¸¥Äl al-qalb, states of the heart).
// Rooted in Ê¿ilm al-nafs / tazkiyah. Islamic label is the primary surface
// when settingsStore.valuesLayer === 'islamic'; otherwise the universal
// label is shown.
//
// Schema:
//   id               â€” stable key persisted to threshold-store
//   arabic           â€” Arabic term (with á¸¥arakÄt where disambiguating)
//   translit         â€” transliteration (ALA-LC style with macrons)
//   englishIslamic   â€” primary English surface inside the Islamic layer
//   universal        â€” surface for valuesLayer === 'universal'
//   valence          â€” 'positive' | 'negative' (for UI ordering / tone)
//   note             â€” one-line plain-English gloss (tooltip)
//   grounding        â€” optional Quranic / classical reference (flag for
//                      Muslim Scholar NotebookLM citation review before ship)
//   pairsWellWith    â€” optional pillar ids that this feeling tends to
//                      resonate with; used ONLY as a soft surface hint in
//                      the submodule dropdown. Does not gate or exclude
//                      any pillar (per "Never Blacklist Revelation" rule).

export const NIYYAH_FEELINGS = [
  {
    id: 'sakinah',
    arabic: "Ø³ÙŽÙƒÙÙŠÙ†ÙŽØ©",
    translit: "SakÄ«nah",
    englishIslamic: 'Settled tranquility',
    universal: 'Calm',
    valence: 'positive',
    note: "Divinely-sent stillness that descends on the heart.",
    grounding: 'Quran 48:4',
    pairsWellWith: ['faith', 'health', 'moontrance'],
  },
  {
    id: 'inshirah',
    arabic: "Ø§ÙÙ†Ù’Ø´ÙØ±ÙŽØ§Ø­ Ø§Ù„ØµÙŽÙ‘Ø¯Ù’Ø±",
    translit: "InshirÄá¸¥ aá¹£-á¹£adr",
    englishIslamic: 'Expanded chest',
    universal: 'Open',
    valence: 'positive',
    note: "Spacious, unobstructed readiness to receive.",
    grounding: 'Quran 94:1',
    pairsWellWith: ['intellect', 'ummah', 'environment'],
  },
  {
    id: 'tumaninah',
    arabic: "Ø·ÙÙ…ÙŽØ£Ù’Ù†ÙÙŠÙ†ÙŽØ©",
    translit: "á¹¬umaÊ¾nÄ«nah",
    englishIslamic: 'Deep reassurance',
    universal: 'Grounded',
    valence: 'positive',
    note: "Heart at rest through remembrance.",
    grounding: 'Quran 13:28',
    pairsWellWith: ['faith', 'family', 'moontrance'],
  },
  {
    id: 'shukr',
    arabic: "Ø´ÙÙƒÙ’Ø±",
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
    arabic: "Ø®ÙØ´ÙÙˆØ¹",
    translit: "KhushÅ«Ê¿",
    englishIslamic: 'Reverently focused',
    universal: 'Focused',
    valence: 'positive',
    note: "Humble attentiveness; awareness of the Divine gaze.",
    grounding: 'Quran 23:2',
    pairsWellWith: ['faith', 'intellect'],
  },
  {
    id: 'raja',
    arabic: "Ø±ÙŽØ¬ÙŽØ§Ø¡",
    translit: "RajÄÊ¾",
    englishIslamic: 'Hopeful',
    universal: 'Hopeful',
    valence: 'positive',
    note: "Active expectation of Allah's mercy and response.",
    grounding: 'Quran 39:53',
    pairsWellWith: ['faith', 'wealth'],
  },
  {
    id: 'shawq',
    arabic: "Ø´ÙŽÙˆÙ’Ù‚",
    translit: "Shawq",
    englishIslamic: 'Yearning',
    universal: 'Curious',
    valence: 'positive',
    note: "Longing for nearness, for knowledge, for the next step.",
    pairsWellWith: ['intellect', 'ummah'],
  },
  {
    id: 'qabd',
    arabic: "Ù‚ÙŽØ¨Ù’Ø¶",
    translit: "Qabá¸",
    englishIslamic: 'Contracted heart',
    universal: 'Restless',
    valence: 'negative',
    note: "A quiet tightening; unease without clear cause.",
    pairsWellWith: ['faith', 'health', 'moontrance'],
  },
  {
    id: 'dayq',
    arabic: "Ø¶ÙÙŠÙ‚ Ø§Ù„ØµÙŽÙ‘Ø¯Ù’Ø±",
    translit: "á¸Œayq aá¹£-á¹£adr",
    englishIslamic: 'Tightened chest',
    universal: 'Overwhelmed',
    valence: 'negative',
    note: "Capacity is near its limit; simplify before you act.",
    grounding: 'Quran 15:97',
    pairsWellWith: ['health', 'family'],
  },
  {
    id: 'ghaflah',
    arabic: "ØºÙŽÙÙ’Ù„ÙŽØ©",
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
    arabic: "Ø­ÙØ²Ù’Ù†",
    translit: "á¸¤uzn",
    englishIslamic: 'Sorrowful',
    universal: 'Heavy',
    valence: 'negative',
    note: "Grief that seeks gentle pacing and patient company.",
    pairsWellWith: ['family', 'faith'],
  },
  {
    id: 'hayrah',
    arabic: "Ø­ÙŽÙŠÙ’Ø±ÙŽØ©",
    translit: "á¸¤ayrah",
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
