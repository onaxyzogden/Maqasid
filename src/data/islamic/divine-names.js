// Canonical registry of the Divine Names used across MILOS.
//
// One entry per Name — arabic, a single canonical transliteration, an English
// title, a one-sentence plain-language gloss, and a structured source.
//
// Before this file existed, every module re-authored its own gloss for the same
// Name (Al-Hafiz appeared 8 times with 6 different opening paragraphs) and the
// BBOS stage attributes carried no source at all. Module data now stores only
// `{ nameKey, description }` — the Name itself is owned here.
//
// `source` mirrors the seeded-subtask grounding schema (docs/grounding-schema.md):
//   kind            'quran' | 'hadith'
//   ref             human-readable citation
//   arabic          the cited text
//   translation     English rendering
//   relevance       'direct' | 'contextual' | 'thematic'
//   provenanceTier  'Bayyinah' (explicit attestation) | 'Qarina' (supporting
//                   indication — the verbal or participial form is attested but
//                   the definite Name form rests on the Tirmidhi enumeration)
//   rationale       why this citation attests this Name
//
// Honesty rule: where a Name's only basis is the enumeration in Jami' at-Tirmidhi
// 3507 — which hadith scholarship treats as a narrator's addition rather than
// prophetic text — the tier is 'Qarina' and the rationale says so. No citation is
// manufactured to make a Name look better attested than it is.
//
// `inNinetyNine: false` marks Names MILOS uses that sit outside the Tirmidhi
// enumeration. They are still attested; they are simply not on that list.

const ENUM = "Jami' at-Tirmidhi 3507";
const ENUM_NOTE =
  "The definite Name form rests on the Tirmidhi enumeration, which hadith scholarship treats as a narrator's addition rather than prophetic text.";

export const DIVINE_NAMES = {
  'ar-rahman': {
    name: 'Ar-Raḥmān', name_ar: 'الرحمن', title: 'The Most Gracious', inNinetyNine: true,
    gloss: 'His kindness reaches every creature — sun, rain and sustenance fall on those who thank Him and those who forget Him alike.',
    source: {
      kind: 'quran', ref: 'Quran 55:1', arabic: 'الرَّحْمَٰنُ',
      translation: 'The Most Gracious.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The Name opens Surah Ar-Rahman as a standalone predicate of Allah.',
    },
  },
  'ar-rahim': {
    name: 'Ar-Raḥīm', name_ar: 'الرحيم', title: 'The Most Merciful', inNinetyNine: true,
    gloss: 'A particular, sustained mercy toward those who believe and try — nearer than they have earned, always ready to forgive.',
    source: {
      kind: 'quran', ref: 'Quran 1:3', arabic: 'الرَّحْمَٰنِ الرَّحِيمِ',
      translation: 'The Most Gracious, the Most Merciful.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'Paired with Ar-Rahman in the opening of the Quran as a Name of Allah.',
    },
  },
  'al-malik': {
    name: 'Al-Malik', name_ar: 'الملك', title: 'The Sovereign', inNinetyNine: true,
    gloss: 'The only real king — every other throne is borrowed, and the whole universe is His dominion.',
    source: {
      kind: 'quran', ref: 'Quran 59:23', arabic: 'هُوَ اللَّهُ الَّذِي لَا إِلَٰهَ إِلَّا هُوَ الْمَلِكُ الْقُدُّوسُ',
      translation: 'He is Allah, other than whom there is no deity, the Sovereign, the Pure.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'Named directly in the closing verses of Surah Al-Hashr.',
    },
  },
  'al-quddus': {
    name: 'Al-Quddūs', name_ar: 'القدوس', title: 'The Absolutely Pure', inNinetyNine: true,
    gloss: 'Free of every defect and limitation — purity not as cleanliness but as the absence of anything to correct.',
    source: {
      kind: 'quran', ref: 'Quran 59:23', arabic: 'الْمَلِكُ الْقُدُّوسُ السَّلَامُ',
      translation: 'The Sovereign, the Pure, the Source of Peace.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'Named directly in the closing verses of Surah Al-Hashr.',
    },
  },
  'as-salam': {
    name: 'As-Salām', name_ar: 'السلام', title: 'The Source of Peace', inNinetyNine: true,
    gloss: 'Peace originates in Him and is given from Him — the settledness a heart cannot manufacture for itself.',
    source: {
      kind: 'quran', ref: 'Quran 59:23', arabic: 'السَّلَامُ الْمُؤْمِنُ الْمُهَيْمِنُ',
      translation: 'The Source of Peace, the Giver of Security, the Guardian.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'Named directly in the closing verses of Surah Al-Hashr.',
    },
  },
  'al-mumin': {
    name: "Al-Mu'min", name_ar: 'المؤمن', title: 'The Giver of Security', inNinetyNine: true,
    gloss: 'He makes hearts safe and keeps every promise He has made — security is granted by Him, not secured against Him.',
    source: {
      kind: 'quran', ref: 'Quran 59:23', arabic: 'السَّلَامُ الْمُؤْمِنُ الْمُهَيْمِنُ',
      translation: 'The Source of Peace, the Giver of Security, the Guardian.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'Named directly in the closing verses of Surah Al-Hashr.',
    },
  },
  'al-muhaymin': {
    name: 'Al-Muhaymin', name_ar: 'المهيمن', title: 'The Guardian Overseer', inNinetyNine: true,
    gloss: 'He watches over everything and holds it in view — nothing occurs outside His seeing and safekeeping.',
    source: {
      kind: 'quran', ref: 'Quran 59:23', arabic: 'الْمُؤْمِنُ الْمُهَيْمِنُ الْعَزِيزُ',
      translation: 'The Giver of Security, the Guardian, the Almighty.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'Named directly in the closing verses of Surah Al-Hashr.',
    },
  },
  'al-aziz': {
    name: 'Al-ʿAzīz', name_ar: 'العزيز', title: 'The Almighty', inNinetyNine: true,
    gloss: 'Might that cannot be resisted or overcome — no army, system or circumstance stands against Him.',
    source: {
      kind: 'quran', ref: 'Quran 59:23', arabic: 'الْعَزِيزُ الْجَبَّارُ الْمُتَكَبِّرُ',
      translation: 'The Almighty, the Compeller, the Supreme.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'Named directly in the closing verses of Surah Al-Hashr.',
    },
  },
  'al-jabbar': {
    name: 'Al-Jabbār', name_ar: 'الجبار', title: 'The Compeller and Restorer', inNinetyNine: true,
    gloss: 'From jabr, the setting of a broken bone: His will cannot be resisted, and the same power mends what is broken.',
    source: {
      kind: 'quran', ref: 'Quran 59:23', arabic: 'الْعَزِيزُ الْجَبَّارُ الْمُتَكَبِّرُ',
      translation: 'The Almighty, the Compeller, the Supreme.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'Named directly in the closing verses of Surah Al-Hashr.',
    },
  },
  'al-mutakabbir': {
    name: 'Al-Mutakabbir', name_ar: 'المتكبر', title: 'The Supremely Great', inNinetyNine: true,
    gloss: 'Greatness that belongs to Him alone — the one being for whom supremacy is plain truth rather than arrogance.',
    source: {
      kind: 'quran', ref: 'Quran 59:23', arabic: 'الْعَزِيزُ الْجَبَّارُ الْمُتَكَبِّرُ',
      translation: 'The Almighty, the Compeller, the Supreme.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'Named directly in the closing verses of Surah Al-Hashr.',
    },
  },
  'al-khaliq': {
    name: 'Al-Khāliq', name_ar: 'الخالق', title: 'The Creator', inNinetyNine: true,
    gloss: 'He brings everything into being out of nothing — stars, oceans and people exist because He determined they should.',
    source: {
      kind: 'quran', ref: 'Quran 59:24', arabic: 'هُوَ اللَّهُ الْخَالِقُ الْبَارِئُ الْمُصَوِّرُ',
      translation: 'He is Allah, the Creator, the Originator, the Fashioner.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'Named directly in the closing verses of Surah Al-Hashr.',
    },
  },
  'al-bari': {
    name: "Al-Bāri'", name_ar: 'البارئ', title: 'The Originator', inNinetyNine: true,
    gloss: 'He originates without copying a model — every creature is a first, not a variation on an existing design.',
    source: {
      kind: 'quran', ref: 'Quran 59:24', arabic: 'الْخَالِقُ الْبَارِئُ الْمُصَوِّرُ',
      translation: 'The Creator, the Originator, the Fashioner.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'Named directly in the closing verses of Surah Al-Hashr.',
    },
  },
  'al-musawwir': {
    name: 'Al-Muṣawwir', name_ar: 'المصور', title: 'The Fashioner of Forms', inNinetyNine: true,
    gloss: 'He gives each created thing its own shape, face and colour — form is assigned, never accidental.',
    source: {
      kind: 'quran', ref: 'Quran 59:24', arabic: 'الْخَالِقُ الْبَارِئُ الْمُصَوِّرُ',
      translation: 'The Creator, the Originator, the Fashioner.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'Named directly in the closing verses of Surah Al-Hashr.',
    },
  },
  'al-ghaffar': {
    name: 'Al-Ghaffār', name_ar: 'الغفار', title: 'The Repeatedly Forgiving', inNinetyNine: true,
    gloss: 'He forgives again and again — the intensive form of the Name means repeated forgiveness, not a single pardon.',
    source: {
      kind: 'quran', ref: 'Quran 71:10', arabic: 'اسْتَغْفِرُوا رَبَّكُمْ إِنَّهُ كَانَ غَفَّارًا',
      translation: 'Ask forgiveness of your Lord. Indeed, He is ever a Perpetual Forgiver.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'Allah describes Himself with the intensive form ghaffar in this ayah.',
    },
  },
  'al-qahhar': {
    name: 'Al-Qahhār', name_ar: 'القهار', title: 'The Subduer', inNinetyNine: true,
    gloss: 'Everything is subject to Him and nothing subdues Him — there is no situation He cannot overcome.',
    source: {
      kind: 'quran', ref: 'Quran 13:16', arabic: 'وَهُوَ الْوَاحِدُ الْقَهَّارُ',
      translation: 'And He is the One, the Subduer.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The Name appears as a direct predicate of Allah.',
    },
  },
  'al-wahhab': {
    name: 'Al-Wahhāb', name_ar: 'الوهاب', title: 'The Supreme Bestower', inNinetyNine: true,
    gloss: 'He gives as gift rather than exchange — nothing good you hold was earned into existence.',
    source: {
      kind: 'quran', ref: 'Quran 3:8', arabic: 'وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً إِنَّكَ أَنتَ الْوَهَّابُ',
      translation: 'And grant us mercy from Yourself. Indeed, You are the Bestower.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The Name is addressed to Allah directly in the dua of those firm in knowledge.',
    },
  },
  'ar-razzaq': {
    name: 'Ar-Razzāq', name_ar: 'الرزاق', title: 'The Provider', inNinetyNine: true,
    gloss: 'Every living thing is provided for by Him — the ant in the ground and the fish in the deep are on the same register.',
    source: {
      kind: 'quran', ref: 'Quran 51:58', arabic: 'إِنَّ اللَّهَ هُوَ الرَّزَّاقُ ذُو الْقُوَّةِ الْمَتِينُ',
      translation: 'Indeed, it is Allah who is the Provider, the firm possessor of strength.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The Name appears as an explicit predicate of Allah.',
    },
  },
  'al-fattah': {
    name: 'Al-Fattāḥ', name_ar: 'الفتاح', title: 'The Opener', inNinetyNine: true,
    gloss: 'He opens what is shut — in circumstances, in provision, and in the understanding of a closed heart.',
    source: {
      kind: 'quran', ref: 'Quran 34:26', arabic: 'وَهُوَ الْفَتَّاحُ الْعَلِيمُ',
      translation: 'And He is the Opener, the All-Knowing.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The Name appears as a direct predicate of Allah.',
    },
  },
  'al-alim': {
    name: 'Al-ʿAlīm', name_ar: 'العليم', title: 'The All-Knowing', inNinetyNine: true,
    gloss: 'He knows everything — past, present, what has not happened yet, and the thoughts you have told no one.',
    source: {
      kind: 'quran', ref: 'Quran 2:32', arabic: 'إِنَّكَ أَنتَ الْعَلِيمُ الْحَكِيمُ',
      translation: 'Indeed, it is You who is the All-Knowing, the All-Wise.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The angels address Allah with this Name directly.',
    },
  },
  'al-qabid': {
    name: 'Al-Qābiḍ', name_ar: 'القابض', title: 'The Constrictor', inNinetyNine: true,
    gloss: 'He withholds and narrows — provision, health or ease — for a reason held in His wisdom, not in ours.',
    source: {
      kind: 'hadith', ref: 'Sunan Abi Dawud 3451', arabic: 'إِنَّ اللَّهَ هُوَ الْمُسَعِّرُ الْقَابِضُ الْبَاسِطُ الرَّازِقُ',
      translation: 'Indeed Allah is the Pricer, the Constrictor, the Expander, the Provider.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The Prophet ﷺ names Allah Al-Qabid explicitly in this hadith on market pricing.',
    },
  },
  'al-basit': {
    name: 'Al-Bāsiṭ', name_ar: 'الباسط', title: 'The Expander', inNinetyNine: true,
    gloss: 'He widens what was narrow — sustenance, capacity and relief expand when He extends them.',
    source: {
      kind: 'hadith', ref: 'Sunan Abi Dawud 3451', arabic: 'إِنَّ اللَّهَ هُوَ الْمُسَعِّرُ الْقَابِضُ الْبَاسِطُ الرَّازِقُ',
      translation: 'Indeed Allah is the Pricer, the Constrictor, the Expander, the Provider.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The Prophet ﷺ names Allah Al-Basit explicitly in this hadith on market pricing.',
    },
  },
  'al-khafid': {
    name: 'Al-Khāfiḍ', name_ar: 'الخافض', title: 'The Abaser', inNinetyNine: true,
    gloss: 'He lowers whom He wills — station and standing fall by His decree, not by anyone else holding leverage.',
    source: {
      kind: 'hadith', ref: ENUM, arabic: 'الْخَافِضُ الرَّافِعُ',
      translation: 'The Abaser, the Exalter.',
      relevance: 'direct', provenanceTier: 'Qarina',
      rationale: ENUM_NOTE + ' The act is Quranic — Quran 56:3 describes the Hour as khafidah rafiah.',
    },
  },
  'ar-rafi': {
    name: 'Ar-Rāfiʿ', name_ar: 'الرافع', title: 'The Exalter', inNinetyNine: true,
    gloss: 'He raises whom He wills — the unnoticed are lifted by Him, not by their own positioning.',
    source: {
      kind: 'quran', ref: 'Quran 3:55', arabic: 'يَا عِيسَىٰ إِنِّي مُتَوَفِّيكَ وَرَافِعُكَ إِلَيَّ',
      translation: 'O Jesus, indeed I will take you and raise you to Myself.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: "Allah describes Himself with the active participle rafi'; the definite Name form appears in the Tirmidhi enumeration.",
    },
  },
  'al-muizz': {
    name: 'Al-Muʿizz', name_ar: 'المعز', title: 'The Bestower of Honour', inNinetyNine: true,
    gloss: 'He grants honour to whom He wills, regardless of what the world has decided a person is worth.',
    source: {
      kind: 'quran', ref: 'Quran 3:26', arabic: 'وَتُعِزُّ مَن تَشَاءُ وَتُذِلُّ مَن تَشَاءُ',
      translation: 'You honour whom You will and You humble whom You will.',
      relevance: 'direct', provenanceTier: 'Qarina',
      rationale: 'The act is Quranic in verbal form. ' + ENUM_NOTE,
    },
  },
  'al-mudhill': {
    name: 'Al-Mudhill', name_ar: 'المذل', title: 'The Abaser of Rank', inNinetyNine: true,
    gloss: 'He humbles whom He wills — the removal of standing is His decree, not a settlement of human merit.',
    source: {
      kind: 'quran', ref: 'Quran 3:26', arabic: 'وَتُعِزُّ مَن تَشَاءُ وَتُذِلُّ مَن تَشَاءُ',
      translation: 'You honour whom You will and You humble whom You will.',
      relevance: 'direct', provenanceTier: 'Qarina',
      rationale: 'The act is Quranic in verbal form. ' + ENUM_NOTE,
    },
  },
  'as-sami': {
    name: 'As-Samīʿ', name_ar: 'السميع', title: 'The All-Hearing', inNinetyNine: true,
    gloss: 'Every sound, whisper and unspoken plea reaches Him — no prayer is ever mislaid.',
    source: {
      kind: 'quran', ref: 'Quran 2:127', arabic: 'رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ',
      translation: 'Our Lord, accept this from us. Indeed, You are the All-Hearing, the All-Knowing.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: "Ibrahim and Isma'il address Allah with this Name directly.",
    },
  },
  'al-basir': {
    name: 'Al-Baṣīr', name_ar: 'البصير', title: 'The All-Seeing', inNinetyNine: true,
    gloss: 'Nothing you do is hidden from Him — His sight reaches what no observer, instrument or record could.',
    source: {
      kind: 'quran', ref: 'Quran 42:11', arabic: 'لَيْسَ كَمِثْلِهِ شَيْءٌ وَهُوَ السَّمِيعُ الْبَصِيرُ',
      translation: 'There is nothing like unto Him, and He is the All-Hearing, the All-Seeing.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The Name appears as a direct predicate of Allah.',
    },
  },
  'al-hakam': {
    name: 'Al-Ḥakam', name_ar: 'الحكم', title: 'The Judge', inNinetyNine: true,
    gloss: 'The final arbiter of what is actually right — every dispute will be settled by Him without error.',
    source: {
      kind: 'quran', ref: 'Quran 6:114', arabic: 'أَفَغَيْرَ اللَّهِ أَبْتَغِي حَكَمًا',
      translation: 'Then is it other than Allah I should seek as judge?',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'Allah is designated hakam in the Quran; the definite form is attested in Sunan Abi Dawud 4955.',
    },
  },
  'al-adl': {
    name: 'Al-ʿAdl', name_ar: 'العدل', title: 'The Utterly Just', inNinetyNine: true,
    gloss: 'Perfectly fair — He gives no one less than their due, and no one is wronged by His decree.',
    source: {
      kind: 'hadith', ref: ENUM, arabic: 'الْحَكَمُ الْعَدْلُ',
      translation: 'The Judge, the Just.',
      relevance: 'direct', provenanceTier: 'Qarina',
      rationale: ENUM_NOTE + ' Divine justice itself is Quranic throughout, e.g. Quran 4:40.',
    },
  },
  'al-latif': {
    name: 'Al-Laṭīf', name_ar: 'اللطيف', title: 'The Subtly Kind', inNinetyNine: true,
    gloss: 'His care works through details too fine to notice, arriving at exactly the moment it was needed.',
    source: {
      kind: 'quran', ref: 'Quran 6:103', arabic: 'لَا تُدْرِكُهُ الْأَبْصَارُ وَهُوَ يُدْرِكُ الْأَبْصَارَ وَهُوَ اللَّطِيفُ الْخَبِيرُ',
      translation: 'Vision perceives Him not, but He perceives all vision; and He is the Subtle, the All-Aware.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The Name appears as a direct predicate of Allah.',
    },
  },
  'al-khabir': {
    name: 'Al-Khabīr', name_ar: 'الخبير', title: 'The All-Aware', inNinetyNine: true,
    gloss: 'He knows the inner reality of things, including the motive underneath an action you have explained differently.',
    source: {
      kind: 'quran', ref: 'Quran 6:103', arabic: 'وَهُوَ اللَّطِيفُ الْخَبِيرُ',
      translation: 'And He is the Subtle, the All-Aware.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The Name appears as a direct predicate of Allah.',
    },
  },
  'al-halim': {
    name: 'Al-Ḥalīm', name_ar: 'الحليم', title: 'The Forbearing', inNinetyNine: true,
    gloss: 'He does not hurry to punish — forbearance gives room and time for a person to turn back.',
    source: {
      kind: 'quran', ref: 'Quran 2:225', arabic: 'وَاللَّهُ غَفُورٌ حَلِيمٌ',
      translation: 'And Allah is Forgiving and Forbearing.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The Name appears as a direct predicate of Allah.',
    },
  },
  'al-azim': {
    name: 'Al-ʿAẓīm', name_ar: 'العظيم', title: 'The Magnificent', inNinetyNine: true,
    gloss: 'Greater than the mind has room to hold — magnitude exceeding what imagination can assemble.',
    source: {
      kind: 'quran', ref: 'Quran 2:255', arabic: 'وَهُوَ الْعَلِيُّ الْعَظِيمُ',
      translation: 'And He is the Most High, the Magnificent.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The Name closes Ayat al-Kursi as a direct predicate of Allah.',
    },
  },
  'al-ghafur': {
    name: 'Al-Ghafūr', name_ar: 'الغفور', title: 'The Forgiving', inNinetyNine: true,
    gloss: 'He covers wrongdoing rather than exposing it — ghafr means to conceal, not merely to excuse.',
    source: {
      kind: 'quran', ref: 'Quran 2:173', arabic: 'إِنَّ اللَّهَ غَفُورٌ رَّحِيمٌ',
      translation: 'Indeed, Allah is Forgiving and Merciful.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The Name appears as a direct predicate of Allah.',
    },
  },
  'ash-shakur': {
    name: 'Ash-Shakūr', name_ar: 'الشكور', title: 'The Appreciative', inNinetyNine: true,
    gloss: 'He rewards a small deed far beyond its size, and notices effort no one else recorded.',
    source: {
      kind: 'quran', ref: 'Quran 35:30', arabic: 'إِنَّهُ غَفُورٌ شَكُورٌ',
      translation: 'Indeed, He is Forgiving and Appreciative.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The Name appears as a direct predicate of Allah.',
    },
  },
  'al-ali': {
    name: 'Al-ʿAlī', name_ar: 'العلي', title: 'The Most High', inNinetyNine: true,
    gloss: 'Above all things in power, essence and worth — height that is rank rather than location.',
    source: {
      kind: 'quran', ref: 'Quran 2:255', arabic: 'وَهُوَ الْعَلِيُّ الْعَظِيمُ',
      translation: 'And He is the Most High, the Magnificent.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The Name closes Ayat al-Kursi as a direct predicate of Allah.',
    },
  },
  'al-kabir': {
    name: 'Al-Kabīr', name_ar: 'الكبير', title: 'The Most Great', inNinetyNine: true,
    gloss: 'Greatness beyond any scale that could be used to measure it.',
    source: {
      kind: 'quran', ref: 'Quran 22:62', arabic: 'وَأَنَّ اللَّهَ هُوَ الْعَلِيُّ الْكَبِيرُ',
      translation: 'And because Allah is the Most High, the Most Great.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The Name appears as a direct predicate of Allah.',
    },
  },
  'al-hafiz': {
    name: 'Al-Ḥafīẓ', name_ar: 'الحفيظ', title: 'The Preserver', inNinetyNine: true,
    gloss: 'He keeps and protects what is entrusted to Him — nothing He guards is ever lost.',
    source: {
      kind: 'quran', ref: 'Quran 11:57', arabic: 'إِنَّ رَبِّي عَلَىٰ كُلِّ شَيْءٍ حَفِيظٌ',
      translation: 'Indeed, my Lord is, over all things, a Preserver.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The Name appears in its nominal form as a divine attribute.',
    },
  },
  'al-muqit': {
    name: 'Al-Muqīt', name_ar: 'المقيت', title: 'The Sustainer', inNinetyNine: true,
    gloss: 'He apportions the nourishment and strength each thing needs, and keeps watch over it.',
    source: {
      kind: 'quran', ref: 'Quran 4:85', arabic: 'وَكَانَ اللَّهُ عَلَىٰ كُلِّ شَيْءٍ مُّقِيتًا',
      translation: 'And ever is Allah, over all things, a Keeper.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The Name appears in its nominal form as a divine attribute.',
    },
  },
  'al-hasib': {
    name: 'Al-Ḥasīb', name_ar: 'الحسيب', title: 'The Reckoner', inNinetyNine: true,
    gloss: 'He keeps the full account of every act — nothing is lost from the record and nothing is added to it.',
    source: {
      kind: 'quran', ref: 'Quran 4:6', arabic: 'وَكَفَىٰ بِاللَّهِ حَسِيبًا',
      translation: 'And sufficient is Allah as Accountant.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The Name appears in its nominal form as a divine attribute.',
    },
  },
  'al-jalil': {
    name: 'Al-Jalīl', name_ar: 'الجليل', title: 'The Majestic', inNinetyNine: true,
    gloss: 'Majesty that stops a person in place — greatness met with awe rather than analysis.',
    source: {
      kind: 'hadith', ref: ENUM, arabic: 'الْجَلِيلُ الْكَرِيمُ',
      translation: 'The Majestic, the Generous.',
      relevance: 'direct', provenanceTier: 'Qarina',
      rationale: ENUM_NOTE + ' The root is Quranic as Dhul-Jalali wal-Ikram, Quran 55:78.',
    },
  },
  'al-karim': {
    name: 'Al-Karīm', name_ar: 'الكريم', title: 'The Most Generous', inNinetyNine: true,
    gloss: 'He gives without depletion and without being asked — generosity owing nothing to the recipient.',
    source: {
      kind: 'quran', ref: 'Quran 27:40', arabic: 'فَإِنَّ رَبِّي غَنِيٌّ كَرِيمٌ',
      translation: 'Then indeed, my Lord is Self-Sufficient and Generous.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The Name appears in its nominal form as a divine attribute.',
    },
  },
  'ar-raqib': {
    name: 'Ar-Raqīb', name_ar: 'الرقيب', title: 'The Watchful', inNinetyNine: true,
    gloss: 'Always watching and never inattentive — He sees you in company and He sees you alone.',
    source: {
      kind: 'quran', ref: 'Quran 4:1', arabic: 'إِنَّ اللَّهَ كَانَ عَلَيْكُمْ رَقِيبًا',
      translation: 'Indeed Allah is ever, over you, an Observer.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The Name appears in its nominal form as a divine attribute.',
    },
  },
  'al-mujib': {
    name: 'Al-Mujīb', name_ar: 'المجيب', title: 'The Responsive', inNinetyNine: true,
    gloss: 'He answers every call — sometimes with what was asked for, sometimes with something better.',
    source: {
      kind: 'quran', ref: 'Quran 11:61', arabic: 'إِنَّ رَبِّي قَرِيبٌ مُّجِيبٌ',
      translation: 'Indeed, my Lord is near and responsive.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The Name appears in its nominal form as a divine attribute.',
    },
  },
  'al-wasi': {
    name: 'Al-Wāsiʿ', name_ar: 'الواسع', title: 'The All-Encompassing', inNinetyNine: true,
    gloss: 'His mercy and knowledge are wider than the whole of creation — nothing falls outside their reach.',
    source: {
      kind: 'quran', ref: 'Quran 2:115', arabic: 'إِنَّ اللَّهَ وَاسِعٌ عَلِيمٌ',
      translation: 'Indeed, Allah is all-Encompassing and Knowing.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The Name appears in its nominal form as a divine attribute.',
    },
  },
  'al-hakim': {
    name: 'Al-Ḥakīm', name_ar: 'الحكيم', title: 'The All-Wise', inNinetyNine: true,
    gloss: 'Every decree has a reason held in perfect wisdom, whether or not the reason is disclosed to us.',
    source: {
      kind: 'quran', ref: 'Quran 2:32', arabic: 'إِنَّكَ أَنتَ الْعَلِيمُ الْحَكِيمُ',
      translation: 'Indeed, it is You who is the All-Knowing, the All-Wise.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The angels address Allah with this Name directly.',
    },
  },
  'al-wadud': {
    name: 'Al-Wadūd', name_ar: 'الودود', title: 'The Ever-Loving', inNinetyNine: true,
    gloss: 'His love is warm, steady and inexhaustible — it does not switch off when a person slips.',
    source: {
      kind: 'quran', ref: 'Quran 85:14', arabic: 'وَهُوَ الْغَفُورُ الْوَدُودُ',
      translation: 'And He is the Forgiving, the Affectionate.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The Name appears as a direct predicate of Allah.',
    },
  },
  'al-majid': {
    name: 'Al-Majīd', name_ar: 'المجيد', title: 'The Most Glorious', inNinetyNine: true,
    gloss: 'Glory joined to generosity — everything genuinely magnificent traces back to Him.',
    source: {
      kind: 'quran', ref: 'Quran 11:73', arabic: 'إِنَّهُ حَمِيدٌ مَّجِيدٌ',
      translation: 'Indeed, He is Praiseworthy and Glorious.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The Name appears in its nominal form as a divine attribute. Distinct from Al-Majid (al-Mājid), The Most Noble.',
    },
  },
  'al-baith': {
    name: 'Al-Bāʿith', name_ar: 'الباعث', title: 'The Resurrector', inNinetyNine: true,
    gloss: 'He raises the dead and will wake everyone for an appointment none of them arranged.',
    source: {
      kind: 'quran', ref: 'Quran 22:7', arabic: 'وَأَنَّ اللَّهَ يَبْعَثُ مَن فِي الْقُبُورِ',
      translation: 'And that Allah will resurrect those in the graves.',
      relevance: 'direct', provenanceTier: 'Qarina',
      rationale: 'The act is Quranic in verbal form. ' + ENUM_NOTE,
    },
  },
  'ash-shahid': {
    name: 'Ash-Shahīd', name_ar: 'الشهيد', title: 'The Witness', inNinetyNine: true,
    gloss: 'He is present to everything that happens — the one witness whose testimony is complete.',
    source: {
      kind: 'quran', ref: 'Quran 4:79', arabic: 'وَكَفَىٰ بِاللَّهِ شَهِيدًا',
      translation: 'And sufficient is Allah as Witness.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The Name appears in its nominal form as a divine attribute.',
    },
  },
  'al-haqq': {
    name: 'Al-Ḥaqq', name_ar: 'الحق', title: 'The Absolute Truth', inNinetyNine: true,
    gloss: 'The one reality that does not depend on anything else — and every promise He makes arrives.',
    source: {
      kind: 'quran', ref: 'Quran 22:6', arabic: 'ذَٰلِكَ بِأَنَّ اللَّهَ هُوَ الْحَقُّ',
      translation: 'That is because Allah is the Truth.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The Name appears as a direct predicate of Allah.',
    },
  },
  'al-wakil': {
    name: 'Al-Wakīl', name_ar: 'الوكيل', title: 'The Trustee', inNinetyNine: true,
    gloss: 'Hand Him the matter and He disposes of it better than you could — outcomes are His department.',
    source: {
      kind: 'quran', ref: 'Quran 3:173', arabic: 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ',
      translation: 'Sufficient for us is Allah, and He is the best Disposer of affairs.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The Name appears in its definite form as a divine attribute.',
    },
  },
  'al-qawi': {
    name: 'Al-Qawiyy', name_ar: 'القوي', title: 'The All-Strong', inNinetyNine: true,
    gloss: 'Strength without fatigue — He does not tire, weaken or need to recover.',
    source: {
      kind: 'quran', ref: 'Quran 22:74', arabic: 'إِنَّ اللَّهَ لَقَوِيٌّ عَزِيزٌ',
      translation: 'Indeed, Allah is Powerful and Exalted in Might.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The Name appears in its nominal form as a divine attribute.',
    },
  },
  'al-matin': {
    name: 'Al-Matīn', name_ar: 'المتين', title: 'The Firm', inNinetyNine: true,
    gloss: 'His strength is unshakeable and His plans do not bend under pressure.',
    source: {
      kind: 'quran', ref: 'Quran 51:58', arabic: 'ذُو الْقُوَّةِ الْمَتِينُ',
      translation: 'The firm possessor of strength.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The Name appears in its definite form as a divine attribute.',
    },
  },
  'al-wali': {
    name: 'Al-Walī', name_ar: 'الولي', title: 'The Protecting Friend', inNinetyNine: true,
    gloss: 'A guardian who stays close and does not leave — nearness that is protection, not merely company.',
    source: {
      kind: 'quran', ref: 'Quran 42:9', arabic: 'فَاللَّهُ هُوَ الْوَلِيُّ',
      translation: 'But Allah — He is the Protector.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The Name appears as a direct predicate of Allah. Distinct from Al-Wali (al-Wālī), The Governor.',
    },
  },
  'al-hamid': {
    name: 'Al-Ḥamīd', name_ar: 'الحميد', title: 'The Praiseworthy', inNinetyNine: true,
    gloss: 'All praise terminates in Him — every compliment paid to something beautiful is owed upstream.',
    source: {
      kind: 'quran', ref: 'Quran 14:8', arabic: 'فَإِنَّ اللَّهَ لَغَنِيٌّ حَمِيدٌ',
      translation: 'Indeed, Allah is Free of need and Praiseworthy.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The Name appears in its nominal form as a divine attribute.',
    },
  },
  'al-muhsi': {
    name: 'Al-Muḥṣī', name_ar: 'المحصي', title: 'The Accounter', inNinetyNine: true,
    gloss: 'He has counted everything precisely — every breath, atom and deed is numbered, none of it approximate.',
    source: {
      kind: 'quran', ref: 'Quran 72:28', arabic: 'وَأَحَاطَ بِمَا لَدَيْهِمْ وَأَحْصَىٰ كُلَّ شَيْءٍ عَدَدًا',
      translation: 'And He has encompassed whatever is with them and has enumerated all things in number.',
      relevance: 'direct', provenanceTier: 'Qarina',
      rationale: 'The act is Quranic in verbal form. ' + ENUM_NOTE,
    },
  },
  'al-mubdi': {
    name: "Al-Mubdi'", name_ar: 'المبدئ', title: 'The Initiator', inNinetyNine: true,
    gloss: 'He starts everything from nothing — every beginning traces back to His initiating.',
    source: {
      kind: 'quran', ref: 'Quran 85:13', arabic: 'إِنَّهُ هُوَ يُبْدِئُ وَيُعِيدُ',
      translation: 'Indeed, it is He who originates and repeats.',
      relevance: 'direct', provenanceTier: 'Qarina',
      rationale: 'The act is Quranic in verbal form. ' + ENUM_NOTE,
    },
  },
  'al-muid': {
    name: 'Al-Muʿīd', name_ar: 'المعيد', title: 'The Restorer', inNinetyNine: true,
    gloss: 'He brings back what has ended — the one who began creation will repeat it.',
    source: {
      kind: 'quran', ref: 'Quran 85:13', arabic: 'إِنَّهُ هُوَ يُبْدِئُ وَيُعِيدُ',
      translation: 'Indeed, it is He who originates and repeats.',
      relevance: 'direct', provenanceTier: 'Qarina',
      rationale: 'The act is Quranic in verbal form. ' + ENUM_NOTE,
    },
  },
  'al-muhyi': {
    name: 'Al-Muḥyī', name_ar: 'المحيي', title: 'The Giver of Life', inNinetyNine: true,
    gloss: 'He gives life — to bodies, to dead land after rain, and to hearts that had gone quiet.',
    source: {
      kind: 'quran', ref: 'Quran 30:50', arabic: 'إِنَّ ذَٰلِكَ لَمُحْيِي الْمَوْتَىٰ',
      translation: 'Indeed, that [same One] will give life to the dead.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'Allah is described with the active participle muhyi in this ayah.',
    },
  },
  'al-mumit': {
    name: 'Al-Mumīt', name_ar: 'المميت', title: 'The Giver of Death', inNinetyNine: true,
    gloss: 'He alone appoints the end of every life — death is a decree, never an accident.',
    source: {
      kind: 'quran', ref: 'Quran 15:23', arabic: 'وَإِنَّا لَنَحْنُ نُحْيِي وَنُمِيتُ وَنَحْنُ الْوَارِثُونَ',
      translation: 'And indeed, it is We who give life and cause death, and We are the Inheritor.',
      relevance: 'direct', provenanceTier: 'Qarina',
      rationale: 'The act is Quranic in verbal form. ' + ENUM_NOTE,
    },
  },
  'al-hayy': {
    name: 'Al-Ḥayy', name_ar: 'الحي', title: 'The Ever-Living', inNinetyNine: true,
    gloss: 'Life that never began and never ends — He does not sleep, age or die.',
    source: {
      kind: 'quran', ref: 'Quran 2:255', arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ',
      translation: 'Allah — there is no deity except Him, the Ever-Living, the Sustainer of existence.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The Name opens Ayat al-Kursi as a direct predicate of Allah.',
    },
  },
  'al-qayyum': {
    name: 'Al-Qayyūm', name_ar: 'القيوم', title: 'The Self-Subsisting Sustainer', inNinetyNine: true,
    gloss: 'He stands by Himself and everything else stands by Him — creation would stop if He withdrew.',
    source: {
      kind: 'quran', ref: 'Quran 2:255', arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ',
      translation: 'Allah — there is no deity except Him, the Ever-Living, the Sustainer of existence.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The Name opens Ayat al-Kursi as a direct predicate of Allah.',
    },
  },
  'al-wajid': {
    name: 'Al-Wājid', name_ar: 'الواجد', title: 'The Finder', inNinetyNine: true,
    gloss: 'He lacks nothing and nothing escapes His finding — need is a creaturely condition, never His.',
    source: {
      kind: 'hadith', ref: ENUM, arabic: 'الْوَاجِدُ الْمَاجِدُ',
      translation: 'The Finder, the Noble.',
      relevance: 'direct', provenanceTier: 'Qarina',
      rationale: ENUM_NOTE + ' Divine freedom from need is Quranic, e.g. Quran 35:15.',
    },
  },
  'al-maajid': {
    name: 'Al-Mājid', name_ar: 'الماجد', title: 'The Most Noble', inNinetyNine: true,
    gloss: 'Nobility of character joined to power — greatness that gives rather than takes.',
    source: {
      kind: 'hadith', ref: ENUM, arabic: 'الْوَاجِدُ الْمَاجِدُ',
      translation: 'The Finder, the Noble.',
      relevance: 'direct', provenanceTier: 'Qarina',
      rationale: ENUM_NOTE + ' Distinct from Al-Majid (al-Majīd), The Most Glorious, which is Quranic at 11:73.',
    },
  },
  'al-wahid': {
    name: 'Al-Wāḥid', name_ar: 'الواحد', title: 'The One', inNinetyNine: true,
    gloss: 'One with no second — no partner, no rival, and nothing that shares His nature.',
    source: {
      kind: 'quran', ref: 'Quran 13:16', arabic: 'وَهُوَ الْوَاحِدُ الْقَهَّارُ',
      translation: 'And He is the One, the Subduer.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The Name appears as a direct predicate of Allah.',
    },
  },
  'al-ahad': {
    name: 'Al-Aḥad', name_ar: 'الأحد', title: 'The Indivisible One', inNinetyNine: true,
    gloss: 'One in a way that cannot be divided, added to or compared with anything.',
    source: {
      kind: 'quran', ref: 'Quran 112:1', arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ',
      translation: 'Say: He is Allah, One.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The Name opens Surah Al-Ikhlas as a direct predicate of Allah.',
    },
  },
  'as-samad': {
    name: 'Aṣ-Ṣamad', name_ar: 'الصمد', title: 'The Eternal Refuge', inNinetyNine: true,
    gloss: 'Everyone turns to Him for what they need and He turns to no one — the Source, never a channel.',
    source: {
      kind: 'quran', ref: 'Quran 112:2', arabic: 'اللَّهُ الصَّمَدُ',
      translation: 'Allah, the Eternal Refuge.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The Name appears as a direct predicate of Allah in Surah Al-Ikhlas.',
    },
  },
  'al-qadir': {
    name: 'Al-Qādir', name_ar: 'القادر', title: 'The All-Powerful', inNinetyNine: true,
    gloss: 'Power without qualification — nothing lies outside what He is able to do.',
    source: {
      kind: 'quran', ref: 'Quran 6:65', arabic: 'قُلْ هُوَ الْقَادِرُ عَلَىٰ أَن يَبْعَثَ عَلَيْكُمْ عَذَابًا',
      translation: 'Say: He is the One able to send upon you affliction.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The Name appears in its definite form as a divine attribute.',
    },
  },
  'al-muqtadir': {
    name: 'Al-Muqtadir', name_ar: 'المقتدر', title: 'The Omnipotent', inNinetyNine: true,
    gloss: 'Power that carries through to completion — what He determines is executed exactly.',
    source: {
      kind: 'quran', ref: 'Quran 54:42', arabic: 'فَأَخَذْنَاهُمْ أَخْذَ عَزِيزٍ مُّقْتَدِرٍ',
      translation: 'So We seized them with the seizure of one Exalted in Might and Perfect in Ability.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The Name appears in its nominal form as a divine attribute.',
    },
  },
  'al-muqaddim': {
    name: 'Al-Muqaddim', name_ar: 'المقدم', title: 'The Expediter', inNinetyNine: true,
    gloss: 'He brings forward what He wills — some things arrive early because He advanced them.',
    source: {
      kind: 'hadith', ref: 'Sahih al-Bukhari 1120', arabic: 'أَنْتَ الْمُقَدِّمُ وَأَنْتَ الْمُؤَخِّرُ',
      translation: 'You are the Expediter and You are the Delayer.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The Prophet ﷺ addresses Allah with this Name in the tahajjud supplication.',
    },
  },
  'al-muakhkhir': {
    name: "Al-Mu'akhkhir", name_ar: 'المؤخر', title: 'The Delayer', inNinetyNine: true,
    gloss: 'He holds things back to their appointed time — delay is scheduling, not neglect.',
    source: {
      kind: 'hadith', ref: 'Sahih al-Bukhari 1120', arabic: 'أَنْتَ الْمُقَدِّمُ وَأَنْتَ الْمُؤَخِّرُ',
      translation: 'You are the Expediter and You are the Delayer.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The Prophet ﷺ addresses Allah with this Name in the tahajjud supplication.',
    },
  },
  'al-awwal': {
    name: 'Al-Awwal', name_ar: 'الأول', title: 'The First', inNinetyNine: true,
    gloss: 'Before everything, with nothing before Him — there was no moment in which He was not.',
    source: {
      kind: 'quran', ref: 'Quran 57:3', arabic: 'هُوَ الْأَوَّلُ وَالْآخِرُ وَالظَّاهِرُ وَالْبَاطِنُ',
      translation: 'He is the First and the Last, the Manifest and the Hidden.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The Name appears as a direct predicate of Allah.',
    },
  },
  'al-akhir': {
    name: 'Al-Ākhir', name_ar: 'الآخر', title: 'The Last', inNinetyNine: true,
    gloss: 'After everything, with nothing after Him — He remains when all else has ended.',
    source: {
      kind: 'quran', ref: 'Quran 57:3', arabic: 'هُوَ الْأَوَّلُ وَالْآخِرُ وَالظَّاهِرُ وَالْبَاطِنُ',
      translation: 'He is the First and the Last, the Manifest and the Hidden.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The Name appears as a direct predicate of Allah.',
    },
  },
  'az-zahir': {
    name: 'Aẓ-Ẓāhir', name_ar: 'الظاهر', title: 'The Manifest', inNinetyNine: true,
    gloss: 'Evident through everything He has made — the signs are in plain view for anyone looking.',
    source: {
      kind: 'quran', ref: 'Quran 57:3', arabic: 'هُوَ الْأَوَّلُ وَالْآخِرُ وَالظَّاهِرُ وَالْبَاطِنُ',
      translation: 'He is the First and the Last, the Manifest and the Hidden.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The Name appears as a direct predicate of Allah.',
    },
  },
  'al-batin': {
    name: 'Al-Bāṭin', name_ar: 'الباطن', title: 'The Hidden', inNinetyNine: true,
    gloss: 'Beyond the reach of sight and instrument, yet nearer than anything you can perceive.',
    source: {
      kind: 'quran', ref: 'Quran 57:3', arabic: 'هُوَ الْأَوَّلُ وَالْآخِرُ وَالظَّاهِرُ وَالْبَاطِنُ',
      translation: 'He is the First and the Last, the Manifest and the Hidden.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The Name appears as a direct predicate of Allah.',
    },
  },
  'al-waali': {
    name: 'Al-Wālī', name_ar: 'الوالي', title: 'The Governor', inNinetyNine: true,
    gloss: 'He administers all affairs — every event runs under His governance, not merely His notice.',
    source: {
      kind: 'quran', ref: 'Quran 13:11', arabic: 'وَمَا لَهُم مِّن دُونِهِ مِن وَالٍ',
      translation: 'And they will have besides Him no protector.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The Name appears in its nominal form. Distinct from Al-Wali (al-Walī), The Protecting Friend.',
    },
  },
  'al-mutaali': {
    name: 'Al-Mutaʿālī', name_ar: 'المتعالي', title: 'The Self-Exalted', inNinetyNine: true,
    gloss: 'High above every limitation the mind tries to place on Him.',
    source: {
      kind: 'quran', ref: 'Quran 13:9', arabic: 'عَالِمُ الْغَيْبِ وَالشَّهَادَةِ الْكَبِيرُ الْمُتَعَالِ',
      translation: 'Knower of the unseen and the witnessed, the Grand, the Exalted.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The Name appears as a direct predicate of Allah.',
    },
  },
  'al-barr': {
    name: 'Al-Barr', name_ar: 'البر', title: 'The Source of Goodness', inNinetyNine: true,
    gloss: 'Good to His creation beyond what any of them deserve or have asked for.',
    source: {
      kind: 'quran', ref: 'Quran 52:28', arabic: 'إِنَّهُ هُوَ الْبَرُّ الرَّحِيمُ',
      translation: 'Indeed, it is He who is the Beneficent, the Merciful.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The Name appears as a direct predicate of Allah.',
    },
  },
  'at-tawwab': {
    name: 'At-Tawwāb', name_ar: 'التواب', title: 'The Acceptor of Repentance', inNinetyNine: true,
    gloss: 'He turns toward whoever turns to Him — and He turned first, which is why they were able to turn.',
    source: {
      kind: 'quran', ref: 'Quran 2:37', arabic: 'إِنَّهُ هُوَ التَّوَّابُ الرَّحِيمُ',
      translation: 'Indeed, it is He who is the Accepting of repentance, the Merciful.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The Name appears as a direct predicate of Allah.',
    },
  },
  'al-muntaqim': {
    name: 'Al-Muntaqim', name_ar: 'المنتقم', title: 'The Avenger', inNinetyNine: true,
    gloss: 'He exacts justice from those who persist in wrong — retribution measured, never excessive.',
    source: {
      kind: 'quran', ref: 'Quran 32:22', arabic: 'إِنَّا مِنَ الْمُجْرِمِينَ مُنتَقِمُونَ',
      translation: 'Indeed We, from the criminals, will take retribution.',
      relevance: 'direct', provenanceTier: 'Qarina',
      rationale: 'The act is Quranic in participial form. ' + ENUM_NOTE,
    },
  },
  'al-afuww': {
    name: 'Al-ʿAfuww', name_ar: 'العفو', title: 'The Pardoner', inNinetyNine: true,
    gloss: 'He erases the offence entirely — pardon goes further than forgiveness, leaving no trace to answer for.',
    source: {
      kind: 'quran', ref: 'Quran 4:99', arabic: 'وَكَانَ اللَّهُ عَفُوًّا غَفُورًا',
      translation: 'And ever is Allah Pardoning and Forgiving.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The Name appears in its nominal form as a divine attribute.',
    },
  },
  'ar-rauf': {
    name: "Ar-Ra'ūf", name_ar: 'الرؤوف', title: 'The Most Kind', inNinetyNine: true,
    gloss: 'Tenderness that lightens the load — kindness that stops harm before it lands.',
    source: {
      kind: 'quran', ref: 'Quran 2:143', arabic: 'إِنَّ اللَّهَ بِالنَّاسِ لَرَءُوفٌ رَّحِيمٌ',
      translation: 'Indeed Allah is, to the people, Kind and Merciful.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The Name appears in its nominal form as a divine attribute.',
    },
  },
  'malik-ul-mulk': {
    name: 'Mālik-ul-Mulk', name_ar: 'مالك الملك', title: 'Owner of All Sovereignty', inNinetyNine: true,
    gloss: 'Every kingdom, title and holding is His to give and to take back — ownership elsewhere is custody.',
    source: {
      kind: 'quran', ref: 'Quran 3:26', arabic: 'قُلِ اللَّهُمَّ مَالِكَ الْمُلْكِ تُؤْتِي الْمُلْكَ مَن تَشَاءُ',
      translation: 'Say: O Allah, Owner of Sovereignty, You give sovereignty to whom You will.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'Allah is addressed by this Name directly in the Quran.',
    },
  },
  'dhul-jalali-wal-ikram': {
    name: 'Dhul-Jalāli wal-Ikrām', name_ar: 'ذو الجلال والإكرام', title: 'Lord of Majesty and Honour', inNinetyNine: true,
    gloss: 'Majesty that humbles and generosity that honours, held together in one being.',
    source: {
      kind: 'quran', ref: 'Quran 55:78', arabic: 'تَبَارَكَ اسْمُ رَبِّكَ ذِي الْجَلَالِ وَالْإِكْرَامِ',
      translation: 'Blessed is the name of your Lord, Owner of Majesty and Honour.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The Name appears in its full form as a divine attribute.',
    },
  },
  'al-muqsit': {
    name: 'Al-Muqsiṭ', name_ar: 'المقسط', title: 'The Equitable', inNinetyNine: true,
    gloss: 'He apportions with exact fairness — restoring what was taken and returning each right to its owner.',
    source: {
      kind: 'quran', ref: 'Quran 49:9', arabic: 'وَأَقْسِطُوا إِنَّ اللَّهَ يُحِبُّ الْمُقْسِطِينَ',
      translation: 'And act justly. Indeed, Allah loves those who act justly.',
      relevance: 'contextual', provenanceTier: 'Qarina',
      rationale: 'The root is Quranic, applied there to people. ' + ENUM_NOTE,
    },
  },
  'al-jami': {
    name: 'Al-Jāmiʿ', name_ar: 'الجامع', title: 'The Gatherer', inNinetyNine: true,
    gloss: 'He brings together what was scattered — people, provisions and the whole of creation on one appointed day.',
    source: {
      kind: 'quran', ref: 'Quran 3:9', arabic: 'رَبَّنَا إِنَّكَ جَامِعُ النَّاسِ لِيَوْمٍ لَّا رَيْبَ فِيهِ',
      translation: 'Our Lord, surely You will gather the people for a Day about which there is no doubt.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'Allah is described with the active participle jami in this ayah.',
    },
  },
  'al-ghani': {
    name: 'Al-Ghanī', name_ar: 'الغني', title: 'The Self-Sufficient', inNinetyNine: true,
    gloss: 'He needs nothing from anyone — your worship adds nothing to Him and your neglect takes nothing away.',
    source: {
      kind: 'quran', ref: 'Quran 2:263', arabic: 'وَاللَّهُ غَنِيٌّ حَلِيمٌ',
      translation: 'And Allah is Free of need and Forbearing.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The Name appears in its nominal form as a divine attribute.',
    },
  },
  'al-mughni': {
    name: 'Al-Mughnī', name_ar: 'المغني', title: 'The Enricher', inNinetyNine: true,
    gloss: 'He makes people independent of need — the sufficiency you feel is issued, not achieved.',
    source: {
      kind: 'quran', ref: 'Quran 9:28', arabic: 'وَإِنْ خِفْتُمْ عَيْلَةً فَسَوْفَ يُغْنِيكُمُ اللَّهُ مِن فَضْلِهِ',
      translation: 'And if you fear privation, Allah will enrich you from His bounty.',
      relevance: 'direct', provenanceTier: 'Qarina',
      rationale: 'The act is Quranic in verbal form. ' + ENUM_NOTE,
    },
  },
  'al-mani': {
    name: 'Al-Māniʿ', name_ar: 'المانع', title: 'The Withholder', inNinetyNine: true,
    gloss: 'He prevents what would harm — some things are withheld as protection rather than denial.',
    source: {
      kind: 'hadith', ref: 'Sahih al-Bukhari 844', arabic: 'اللَّهُمَّ لَا مَانِعَ لِمَا أَعْطَيْتَ وَلَا مُعْطِيَ لِمَا مَنَعْتَ',
      translation: 'O Allah, none can withhold what You have given, and none can give what You have withheld.',
      relevance: 'contextual', provenanceTier: 'Qarina',
      rationale: 'The act of withholding is ascribed to Allah in this hadith. ' + ENUM_NOTE,
    },
  },
  'ad-darr': {
    name: 'Aḍ-Ḍārr', name_ar: 'الضار', title: 'The Decreer of Adversity', inNinetyNine: true,
    gloss: 'Adversity comes by His decree, not outside it — nothing reaches a person that He has not written.',
    source: {
      kind: 'quran', ref: 'Quran 6:17', arabic: 'وَإِن يَمْسَسْكَ اللَّهُ بِضُرٍّ فَلَا كَاشِفَ لَهُ إِلَّا هُوَ',
      translation: 'And if Allah should touch you with adversity, there is no remover of it except Him.',
      relevance: 'direct', provenanceTier: 'Qarina',
      rationale: 'The act is Quranic in verbal form. ' + ENUM_NOTE,
    },
  },
  'an-nafi': {
    name: 'An-Nāfiʿ', name_ar: 'النافع', title: 'The Bringer of Benefit', inNinetyNine: true,
    gloss: 'All benefit comes from Him — no cause helps you except by His permission.',
    source: {
      kind: 'quran', ref: 'Quran 10:107', arabic: 'وَإِن يُرِدْكَ بِخَيْرٍ فَلَا رَادَّ لِفَضْلِهِ',
      translation: 'And if He intends for you good, there is no repeller of His bounty.',
      relevance: 'direct', provenanceTier: 'Qarina',
      rationale: 'The act is Quranic. ' + ENUM_NOTE,
    },
  },
  'an-nur': {
    name: 'An-Nūr', name_ar: 'النور', title: 'The Light', inNinetyNine: true,
    gloss: 'The light of the heavens and the earth — He illuminates what is real and what to do next.',
    source: {
      kind: 'quran', ref: 'Quran 24:35', arabic: 'اللَّهُ نُورُ السَّمَاوَاتِ وَالْأَرْضِ',
      translation: 'Allah is the Light of the heavens and the earth.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The Name appears as a direct predicate of Allah.',
    },
  },
  'al-hadi': {
    name: 'Al-Hādī', name_ar: 'الهادي', title: 'The Guide', inNinetyNine: true,
    gloss: 'Guidance is granted by Him, not navigated to — He shows the way and He makes the heart accept it.',
    source: {
      kind: 'quran', ref: 'Quran 25:31', arabic: 'وَكَفَىٰ بِرَبِّكَ هَادِيًا وَنَصِيرًا',
      translation: 'And sufficient is your Lord as a Guide and a Helper.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The Name appears in its nominal form as a divine attribute.',
    },
  },
  'al-badi': {
    name: 'Al-Badīʿ', name_ar: 'البديع', title: 'The Originator of Wonders', inNinetyNine: true,
    gloss: 'He originates without precedent — nothing He made was copied from a prior pattern.',
    source: {
      kind: 'quran', ref: 'Quran 2:117', arabic: 'بَدِيعُ السَّمَاوَاتِ وَالْأَرْضِ',
      translation: 'Originator of the heavens and the earth.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The Name appears in construct form as a divine attribute.',
    },
  },
  'al-baqi': {
    name: 'Al-Bāqī', name_ar: 'الباقي', title: 'The Everlasting', inNinetyNine: true,
    gloss: 'He remains when everything else has passed — permanence belongs to Him alone.',
    source: {
      kind: 'quran', ref: 'Quran 55:26-27', arabic: 'كُلُّ مَنْ عَلَيْهَا فَانٍ وَيَبْقَىٰ وَجْهُ رَبِّكَ ذُو الْجَلَالِ وَالْإِكْرَامِ',
      translation: 'Everyone upon it will perish, and there will remain the Face of your Lord, Owner of Majesty and Honour.',
      relevance: 'direct', provenanceTier: 'Qarina',
      rationale: 'The attribute is Quranic in verbal form. ' + ENUM_NOTE,
    },
  },
  'al-warith': {
    name: 'Al-Wārith', name_ar: 'الوارث', title: 'The Inheritor', inNinetyNine: true,
    gloss: 'Everything returns to Him when its holders are gone — He is the final owner of all of it.',
    source: {
      kind: 'quran', ref: 'Quran 15:23', arabic: 'وَنَحْنُ الْوَارِثُونَ',
      translation: 'And We are the Inheritor.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The Name appears in its nominal form as a divine attribute.',
    },
  },
  'ar-rashid': {
    name: 'Ar-Rashīd', name_ar: 'الرشيد', title: 'The Director to the Right Course', inNinetyNine: true,
    gloss: 'He directs every affair to its right end — the outcome He steers toward is the sound one.',
    source: {
      kind: 'hadith', ref: ENUM, arabic: 'الرَّشِيدُ الصَّبُورُ',
      translation: 'The Guide to the right course, the Patient.',
      relevance: 'direct', provenanceTier: 'Qarina',
      rationale: 'This Name has no individual Quranic or standalone hadith attestation. ' + ENUM_NOTE,
    },
  },
  'as-sabur': {
    name: 'Aṣ-Ṣabūr', name_ar: 'الصبور', title: 'The Patient', inNinetyNine: true,
    gloss: 'He is not hurried by anything — patience without any pressure that would make Him hasten.',
    source: {
      kind: 'hadith', ref: 'Sahih al-Bukhari 6099', arabic: 'لَا أَحَدَ أَصْبَرُ عَلَىٰ أَذًى سَمِعَهُ مِنَ اللَّهِ',
      translation: 'No one is more patient with an offence he hears than Allah.',
      relevance: 'contextual', provenanceTier: 'Qarina',
      rationale: 'The attribute of divine patience is attested here; the definite Name form appears only in the Tirmidhi enumeration.',
    },
  },

  // ---------------------------------------------------------------------------
  // Names MILOS uses that sit outside the Tirmidhi enumeration of ninety-nine.
  // Each is attested in its own right; it simply is not on that list.
  // ---------------------------------------------------------------------------

  'ar-rabb': {
    name: 'Ar-Rabb', name_ar: 'الرب', title: 'The Nurturing Lord', inNinetyNine: false,
    gloss: 'Owner, sustainer and raiser all at once — He does not only possess creation, He brings it to maturity.',
    source: {
      kind: 'quran', ref: 'Quran 1:2', arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
      translation: 'All praise is due to Allah, Lord of the worlds.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The Name is ascribed to Allah in the opening of the Quran and hundreds of times thereafter.',
    },
  },
  'ash-shafi': {
    name: 'Ash-Shāfī', name_ar: 'الشافي', title: 'The Healer', inNinetyNine: false,
    gloss: 'Healing comes from Him — medicine and rest are means He put in place, never the cure itself.',
    source: {
      kind: 'hadith', ref: 'Sahih al-Bukhari 5675', arabic: 'اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَاسَ اشْفِ أَنْتَ الشَّافِي',
      translation: 'O Allah, Lord of mankind, remove the harm and heal — You are the Healer.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The Prophet ﷺ addresses Allah with this Name directly when visiting the sick.',
    },
  },
  'al-muhsin': {
    name: 'Al-Muḥsin', name_ar: 'المحسن', title: 'The Doer of Excellence', inNinetyNine: false,
    gloss: 'He does everything with perfect care and prescribes the same care in everything we do.',
    source: {
      kind: 'hadith', ref: 'Sahih Muslim 1955', arabic: 'إِنَّ اللَّهَ كَتَبَ الْإِحْسَانَ عَلَىٰ كُلِّ شَيْءٍ',
      translation: 'Indeed Allah has prescribed excellence in all things.',
      relevance: 'contextual', provenanceTier: 'Qarina',
      rationale: 'Ihsan is prescribed by Allah and Quran 32:7 says He perfected everything He created; the definite Name form is not in the Tirmidhi enumeration.',
    },
  },
  'al-mudabbir': {
    name: 'Al-Mudabbir', name_ar: 'المدبر', title: 'The Orderer of Affairs', inNinetyNine: false,
    gloss: 'He arranges every matter to its proper end — sequence and timing are managed, not left to drift.',
    source: {
      kind: 'quran', ref: 'Quran 10:3', arabic: 'يُدَبِّرُ الْأَمْرَ مَا مِن شَفِيعٍ إِلَّا مِن بَعْدِ إِذْنِهِ',
      translation: 'He arranges the matter; there is no intercessor except after His permission.',
      relevance: 'direct', provenanceTier: 'Qarina',
      rationale: 'The act is Quranic in verbal form; the definite Name form is not in the Tirmidhi enumeration.',
    },
  },
  'al-jamil': {
    name: 'Al-Jamīl', name_ar: 'الجميل', title: 'The Beautiful', inNinetyNine: false,
    gloss: 'Beautiful in Himself and pleased by beauty — care over how a thing is made is worship, not vanity.',
    source: {
      kind: 'hadith', ref: 'Sahih Muslim 91', arabic: 'إِنَّ اللَّهَ جَمِيلٌ يُحِبُّ الْجَمَالَ',
      translation: 'Indeed Allah is Beautiful and loves beauty.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The Prophet ﷺ ascribes this Name to Allah explicitly.',
    },
  },
  'al-qarib': {
    name: 'Al-Qarīb', name_ar: 'القريب', title: 'The Near', inNinetyNine: false,
    gloss: 'Nearer than the distance any call has to travel — no intermediary is required to reach Him.',
    source: {
      kind: 'quran', ref: 'Quran 2:186', arabic: 'وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ',
      translation: 'And when My servants ask you concerning Me — indeed I am near.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'Allah describes Himself as qarib directly; the nominal form also appears at Quran 11:61.',
    },
  },
  'at-tayyib': {
    name: 'Aṭ-Ṭayyib', name_ar: 'الطيب', title: 'The Pure and Wholesome', inNinetyNine: false,
    gloss: 'Pure in Himself and accepting only what is pure — what is earned or given must be clean at its source.',
    source: {
      kind: 'hadith', ref: 'Sahih Muslim 1015', arabic: 'إِنَّ اللَّهَ طَيِّبٌ لَا يَقْبَلُ إِلَّا طَيِّبًا',
      translation: 'Indeed Allah is Pure and accepts only what is pure.',
      relevance: 'direct', provenanceTier: 'Bayyinah',
      rationale: 'The Prophet ﷺ ascribes this Name to Allah explicitly.',
    },
  },
};

/** Number of registry entries that belong to the Tirmidhi enumeration. */
export const NINETY_NINE_COUNT = Object.values(DIVINE_NAMES).filter(
  (n) => n.inNinetyNine,
).length;

/**
 * Look up one Name. Returns `null` for an unknown key rather than throwing, so a
 * bad key degrades to a missing card instead of a blank ceremony.
 */
export function getDivineName(key) {
  if (!key) return null;
  return DIVINE_NAMES[key] || null;
}

/**
 * Merge a module's `{ nameKey, description }` entries with the registry.
 *
 * The module's `description` is a single authored blend — it leads with what the
 * Name asks of this module and folds the definition in — so the registry `gloss`
 * stays the canonical definition of record but is no longer rendered beside it.
 * `body` is recomposed from description + source line, so consumers written
 * against the old shape (the AI prompt builder, the BBOS dashboard adapter) keep
 * working untouched.
 *
 * Entries that already carry a literal `name` (the universal-values layer, which
 * has principles rather than Names) pass through unchanged.
 */
export function hydrateAttrs(attrs) {
  if (!Array.isArray(attrs)) return attrs;

  return attrs.map((attr) => {
    if (!attr || !attr.nameKey) return attr;

    const entry = DIVINE_NAMES[attr.nameKey];
    if (!entry) {
      if (import.meta.env?.DEV) {
        throw new Error(
          `[divine-names] unresolved nameKey "${attr.nameKey}" — add it to DIVINE_NAMES or fix the module data.`,
        );
      }
      return null;
    }

    const description = attr.description || '';
    const sourceLine = `Source: ${entry.source.ref} — "${entry.source.translation}"`;
    const body = [description, sourceLine].filter(Boolean).join('\n\n');

    return {
      nameKey: attr.nameKey,
      name: entry.name,
      name_ar: entry.name_ar,
      title: entry.title,
      gloss: entry.gloss,
      description,
      source: entry.source,
      inNinetyNine: entry.inNinetyNine,
      body,
    };
  }).filter(Boolean);
}
