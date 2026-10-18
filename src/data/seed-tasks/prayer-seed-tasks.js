// Prayer seed tasks — derived at import time from FAITH_SEED_TASKS via
// Option-A duplication: every generic Salah sunnah tagged `prayer-phase:before`
// or `prayer-phase:after` is copied into ALL five prayers' matching phase
// board (plus tahajjud when transition tags indicate it). Prayer-specific
// tasks (e.g. `prayer:fajr`, `transition:tahajjud-waking`) land only in
// their inferred home.
//
// Outputs PRAYER_SEED_TASKS shape: { prayer_{prayer}_{phase}: [task, ...] }
// Boards are defined in @data/prayer-pillars; this file only produces tasks.
//
// Main-phase tasks (`prayer-phase:main`) and untagged tasks stay in
// `faith_salah_*` untouched — this module never mutates FAITH_SEED_TASKS.

import { FAITH_SEED_TASKS } from './faith-seed-tasks.js';
import { PRAYER_PILLARS, PRAYER_PHASE_KEYS } from '../prayer-pillars.js';

const ALL_PRAYERS = PRAYER_PILLARS.map((p) => p.id); // includes tahajjud

const SALAH_SOURCES = ['faith_salah_core', 'faith_salah_growth', 'faith_salah_excellence'];

// Per-prayer Sunni orthopraxy — rakah counts follow Bukhari/Muslim.
// Each structure row becomes one task (note → subtask); each key reminder
// becomes one task. Populates the six `prayer_{pillar}_during` boards.
const PRAYER_GUIDE = {
  fajr: {
    structure: [
      {
        kind: 'Sunnah before',
        count: 2,
        note: 'Light and brief. "Better than the world and all it contains." (Muslim)',
        tier: 'T1',
        amanahRationale: "Aishah (RA) in Sahih Muslim 725 reports the Prophet \uFDFA said the two pre-Fajr rak'at are dearer to him than the world and all it contains \u2014 no other sunnah rawatib carries this wording.",
        why: "The two rak'at before Fajr are the only rawatib the Prophet \uFDFA described as 'dearer than the world and all it contains.' Short, easy, and carrying a reward no wealth in the world can buy.",
        how: "Pray two light rak'at at home or at the masjid before the iqamah for Fajr \u2014 the Prophet \uFDFA kept them brief. Recommended recitation: Surat al-Kafirun in the first, Surat al-Ikhlas in the second (Sahih Muslim 726).",
        sources: [
          {
            kind: 'hadith',
            ref: 'Sahih Muslim 725',
            arabic: 'عَنْ عَائِشَةَ، عَنِ النَّبِيِّ ﷺ قَالَ \u201Cرَكْعَتَا الْفَجْرِ خَيْرٌ مِنَ الدُّنْيَا وَمَا فِيهَا\u201D. وَفِي رِوَايَةٍ: \u201Cلَهُمَا أَحَبُّ إِلَيَّ مِنَ الدُّنْيَا جَمِيعًا\u201D.',
            translation: "Aishah (RA) reported that the Prophet \uFDFA said about the two rak'at of Fajr (the pre-dawn sunnah): \"They are better than the world and all it contains\" \u2014 and in another narration: \"They are dearer to me than the whole world.\"",
            relevance: 'direct',
            provenanceTier: 'Bayyinah',
            hadithGrade: 'Sahih',
            rationale: "Explicit prophetic valuation of the two pre-Fajr rak'at above the world entire \u2014 the operative basis for their T1 priority."
          }
        ]
      },
      {
        kind: 'Farḍ',
        count: 2,
        note: 'Recite aloud. The longest recitation of the day.',
        tier: 'T1',
        amanahRationale: "Abu Barza al-Aslami in Sahih Muslim 461 narrates the Prophet \uFDFA recited sixty to a hundred verses in Fajr \u2014 the Quranic command of Quran 17:78 names Fajr recitation as 'witnessed' by the angels.",
        why: "Fajr is the only fard with two rak'at carrying the longest recitation of the day \u2014 aloud, witnessed by the angels of night and day (Quran 17:78). It sets the vocal tone and mental attention for everything that follows.",
        how: "As imam or praying alone, recite aloud in both rak'at of the fard. Choose a longer surah than you would for Dhuhr or Asr \u2014 the Prophet \uFDFA's practice ranged from 60 to 100 verses. If leading others, scale down gently rather than rushing.",
        sources: [
          {
            kind: 'hadith',
            ref: 'Sahih Muslim 461',
            arabic: 'كَانَ رَسُولُ اللَّهِ ﷺ يَقْرَأُ فِي الْفَجْرِ بِالسِّتِّينَ إِلَى الْمِائَةِ.',
            translation: "Abu Barza al-Aslami (RA) reported: The Messenger of Allah \uFDFA used to recite in the Fajr prayer from sixty to one hundred verses.",
            relevance: 'direct',
            provenanceTier: 'Bayyinah',
            hadithGrade: 'Sahih',
            rationale: "Establishes the prophetic length of Fajr recitation (60\u2013100 verses) \u2014 direct basis for 'the longest recitation of the day.'"
          },
          {
            kind: 'quran',
            ref: 'Quran 17:78',
            arabic: 'أَقِمِ الصَّلَاةَ لِدُلُوكِ الشَّمْسِ إِلَىٰ غَسَقِ اللَّيْلِ وَقُرْآنَ الْفَجْرِ ۖ إِنَّ قُرْآنَ الْفَجْرِ كَانَ مَشْهُودًا',
            translation: "Establish prayer at the decline of the sun [from its meridian] until the darkness of the night, and [also] the recitation of Fajr. Indeed, the recitation of Fajr is ever witnessed.",
            relevance: 'direct',
            provenanceTier: 'Bayyinah',
            rationale: "Quran names Fajr recitation specifically as 'witnessed' \u2014 the theological weight behind its prolonged aloud recitation."
          }
        ]
      },
    ],
    keys: [
      'Never skip the 2 sunnah — the Prophet ﷺ kept them even while travelling.',
      'No voluntary prayer between Fajr and sunrise.',
    ],
  },
  dhuhr: {
    structure: [
      {
        kind: 'Sunnah before',
        count: 4,
        note: 'Prayed as two sets of two.',
        tier: 'T1',
        amanahRationale: "Umm Habiba (RA) in Sahih Muslim 728a reports the Prophet \uFDFA promised a house in Paradise for whoever preserves twelve rakʿat of rawātib daily \u2014 four before Dhuhr anchor that count.",
        why: "The four rakʿat before Dhuhr are part of the twelve daily rawātib the Prophet \uFDFA guaranteed a house in Paradise for. They mark the shift from the morning's labor to the axis of the day and quiet the heart before the fard.",
        how: "Pray four rakʿat in two sets of two (two tasleems), not as a single block of four. Keep recitation moderate \u2014 longer than the fard's silent recitation is not required. Pray them as close to the adhan as your circumstances allow.",
        sources: [
          {
            kind: 'hadith',
            ref: 'Sahih Muslim 728a',
            arabic: 'عَنْ أُمِّ حَبِيبَةَ قَالَتْ قَالَ رَسُولُ اللَّهِ ﷺ \u201Cمَنْ صَلَّى اثْنَتَىْ عَشْرَةَ رَكْعَةً فِي يَوْمٍ وَلَيْلَةٍ بُنِيَ لَهُ بِهِنَّ بَيْتٌ فِي الْجَنَّةِ\u201D. قَالَتْ أُمُّ حَبِيبَةَ: فَمَا تَرَكْتُهُنَّ مُنْذُ سَمِعْتُهُنَّ مِنْ رَسُولِ اللَّهِ ﷺ.',
            translation: "Umm Habiba (RA) reported: The Messenger of Allah \uFDFA said, \"Whoever prays twelve rakʿat during the day and night, a house in Paradise will be built for him because of them.\" Umm Habiba said: I never abandoned them after I heard this from the Messenger of Allah \uFDFA.",
            relevance: 'direct',
            provenanceTier: 'Bayyinah',
            hadithGrade: 'Sahih',
            rationale: "Establishes the twelve daily rawātib \u2014 including the 4 before Dhuhr \u2014 as the set the Prophet \uFDFA promised a house in Paradise for."
          }
        ]
      },
      {
        kind: 'Farḍ',
        count: 4,
        note: 'Silent recitation.',
        tier: 'T1',
        amanahRationale: "Khabbab ibn al-Aratt in Sahih al-Bukhari 759 reports that the companions knew the Prophet \uFDFA's recitation in Dhuhr and Asr only by the movement of his beard \u2014 the silent recitation is directly prophetic.",
        why: "Dhuhr's fard is silent because its inward khushūʿ is the work. The tongue does not lead; the heart does. Bukhari 759 shows the companions inferring the Prophet's \uFDFA recitation only from the motion of his beard.",
        how: "Recite al-Fatihah and a surah silently in both of the first two rakʿat. Recite al-Fatihah alone in the last two. Do not move your lips loudly enough for others to hear \u2014 internal presence is the standard.",
        sources: [
          {
            kind: 'hadith',
            ref: 'Sahih al-Bukhari 759',
            arabic: 'عَنْ خَبَّابٍ قَالَ كُنَّا نَعْرِفُ قِرَاءَةَ النَّبِيِّ ﷺ فِي الظُّهْرِ وَالْعَصْرِ بِاضْطِرَابِ لِحْيَتِهِ.',
            translation: "Khabbab (RA) reported: We used to recognise the recitation of the Prophet \uFDFA in Dhuhr and Asr by the movement of his beard.",
            relevance: 'direct',
            provenanceTier: 'Bayyinah',
            hadithGrade: 'Sahih',
            rationale: "Direct companion testimony that the Prophet \uFDFA recited silently in Dhuhr and Asr \u2014 the operative basis for silent recitation."
          }
        ]
      },
      {
        kind: 'Sunnah after',
        count: 2,
        note: 'From the confirmed rawātib.',
        tier: 'T1',
        amanahRationale: "The two rakʿat after Dhuhr are part of the twelve daily rawātib established by Sahih Muslim 728a \u2014 among the set the Prophet \uFDFA guaranteed a house in Paradise for.",
        why: "Two rakʿat after Dhuhr complete the Dhuhr rawātib set (4+2) and count toward the twelve daily. They let the heart settle before the rest of the day's demands rush back in.",
        how: "Pray two light rakʿat immediately after the fard salam, preferably at home. Ibn Umar (RA) noted the Prophet \uFDFA prayed these at home rather than at the masjid.",
        sources: [
          {
            kind: 'hadith',
            ref: 'Sahih Muslim 728a',
            arabic: 'عَنْ أُمِّ حَبِيبَةَ قَالَتْ قَالَ رَسُولُ اللَّهِ ﷺ \u201Cمَنْ صَلَّى اثْنَتَىْ عَشْرَةَ رَكْعَةً فِي يَوْمٍ وَلَيْلَةٍ بُنِيَ لَهُ بِهِنَّ بَيْتٌ فِي الْجَنَّةِ\u201D.',
            translation: "Umm Habiba (RA) reported: The Messenger of Allah \uFDFA said, \"Whoever prays twelve rakʿat during the day and night, a house in Paradise will be built for him because of them.\"",
            relevance: 'direct',
            provenanceTier: 'Bayyinah',
            hadithGrade: 'Sahih',
            rationale: "The two rakʿat after Dhuhr sit inside the twelve-rakʿat rawātib promise \u2014 same hadith anchors the after-count as the before-count."
          }
        ]
      },
    ],
    keys: [
      'All recitation is silent — internal presence (khushūʿ) is the work.',
      "The 4+2 rawātib are mu'akkadah (confirmed) — schedule around them, not after them.",
    ],
  },
  asr: {
    structure: [
      {
        kind: 'Sunnah before',
        count: 4,
        note: "Ghair mu'akkadah — meritorious but optional.",
        tier: 'T2',
        amanahRationale: "Ibn Umar (RA) in Jami at-Tirmidhi 430 / Abu Dawud 1271 reports the Prophet \uFDFA said, \"May Allah have mercy on one who prays four (rakʿat) before Asr\" \u2014 a duʿāʾ of mercy rather than a command, placing these at T2 (ghair muʾakkadah).",
        why: "Four rakʿat before Asr are not part of the twelve muʾakkadah rawātib, but the Prophet \uFDFA invoked Allah's mercy specifically on those who pray them. A non-obligatory rampart against Asr's heedlessness.",
        how: "Pray four rakʿat in two sets of two (two tasleems). Skip without guilt if the iqāmah is close \u2014 these are meritorious, not confirmed. The sunnah is that the Prophet's \uFDFA mercy-duʿāʾ reaches whoever establishes the pattern.",
        sources: [
          {
            kind: 'hadith',
            ref: 'Jami at-Tirmidhi 430',
            arabic: 'عَنِ ابْنِ عُمَرَ قَالَ قَالَ رَسُولُ اللَّهِ ﷺ \u201Cرَحِمَ اللَّهُ امْرَأً صَلَّى قَبْلَ الْعَصْرِ أَرْبَعًا\u201D.',
            translation: "Ibn Umar (RA) reported: The Messenger of Allah \uFDFA said, \"May Allah have mercy on one who prays four (rakʿat) before Asr.\"",
            relevance: 'direct',
            provenanceTier: 'Bayyinah',
            hadithGrade: 'Hasan',
            rationale: "Direct prophetic duʿāʾ for those who pray four before Asr \u2014 the textual basis for the practice; graded Hasan, hence T2 rather than T1."
          }
        ]
      },
      {
        kind: 'Farḍ',
        count: 4,
        note: 'Silent recitation.',
        tier: 'T1',
        amanahRationale: "Khabbab ibn al-Aratt in Sahih al-Bukhari 759 testifies that the Prophet \uFDFA's recitation in Dhuhr and Asr was silent \u2014 the same hadith grounding Dhuhr's fard applies here.",
        why: "Asr is the \"middle prayer\" guarded by Allah's own command (Quran 2:238). Its fard is silent because its work is inward \u2014 the heart's attentiveness at the turning of the day.",
        how: "Recite al-Fatihah and a surah silently in both of the first two rakʿat. Recite al-Fatihah alone in the last two. Pray it while the sun is still strong-white, before it yellows.",
        sources: [
          {
            kind: 'hadith',
            ref: 'Sahih al-Bukhari 759',
            arabic: 'عَنْ خَبَّابٍ قَالَ كُنَّا نَعْرِفُ قِرَاءَةَ النَّبِيِّ ﷺ فِي الظُّهْرِ وَالْعَصْرِ بِاضْطِرَابِ لِحْيَتِهِ.',
            translation: "Khabbab (RA) reported: We used to recognise the recitation of the Prophet \uFDFA in Dhuhr and Asr by the movement of his beard.",
            relevance: 'direct',
            provenanceTier: 'Bayyinah',
            hadithGrade: 'Sahih',
            rationale: "Companion testimony that Asr's fard is silent \u2014 the operative basis for the practice."
          },
          {
            kind: 'quran',
            ref: 'Quran 2:238',
            arabic: 'حَافِظُوا عَلَى الصَّلَوَاتِ وَالصَّلَاةِ الْوُسْطَىٰ وَقُومُوا لِلَّهِ قَانِتِينَ',
            translation: "Guard strictly the prayers, and [especially] the middle prayer, and stand before Allah devoutly obedient.",
            relevance: 'contextual',
            provenanceTier: 'Bayyinah',
            rationale: "Quranic singling out of the \"middle prayer\" \u2014 identified in the majority opinion as Asr \u2014 giving it heightened weight among the five."
          }
        ]
      },
    ],
    keys: [
      'The "middle prayer" — guard it. (al-Baqarah 2:238)',
      'No voluntary prayer after ʿAṣr until Maghrib.',
      'Pray it while the sun is still strong-white, before it yellows.',
    ],
  },
  maghrib: {
    structure: [
      {
        kind: 'Farḍ',
        count: 3,
        note: 'Aloud in the first two rakʿahs, silent in the third.',
        tier: 'T1',
        amanahRationale: "The three-rakʿah Maghrib fard with aloud recitation in the first two is established mutawatir practice, transmitted through every generation from the Prophet \uFDFA \u2014 the witr of the day's fara\u02BEid.",
        why: "Maghrib is the witr of the day \u2014 odd-numbered, aloud, and short. It marks the seam between the labor-day and the night, and its aloud recitation restores the public voice of worship after Dhuhr and Asr's silent turns.",
        how: "Recite al-Fatihah and a surah aloud in the first two rakʿat. Recite al-Fatihah alone, silently, in the third. Pray promptly \u2014 Maghrib's window is the shortest of the five.",
        sources: [
          {
            kind: 'hadith',
            ref: 'Sahih al-Bukhari 765',
            arabic: 'عَنْ جُبَيْرِ بْنِ مُطْعِمٍ قَالَ سَمِعْتُ النَّبِيَّ ﷺ يَقْرَأُ فِي الْمَغْرِبِ بِالطُّورِ.',
            translation: "Jubayr ibn Mutʿim (RA) reported: I heard the Prophet \uFDFA reciting Surat at-Tur in the Maghrib prayer.",
            relevance: 'direct',
            provenanceTier: 'Bayyinah',
            hadithGrade: 'Sahih',
            rationale: "Direct prophetic example of aloud recitation in Maghrib \u2014 and of choosing a mid-length surah rather than the shortest available."
          }
        ]
      },
      {
        kind: 'Sunnah after',
        count: 2,
        note: 'Recommended: Surah al-Kāfirūn + al-Ikhlāṣ.',
        tier: 'T1',
        amanahRationale: "The two rakʿat after Maghrib are among the twelve muʾakkadah rawātib (Sahih Muslim 728a). Ibn Majah 1166 and Tirmidhi 431 record the Prophet \uFDFA reciting al-Kafirun and al-Ikhlas in them.",
        why: "Two rakʿat after Maghrib sit inside the twelve-rakʿat daily rawātib promise. Al-Kafirun and al-Ikhlas together declare both what we disown and what we affirm \u2014 a fitting close to the day's worship.",
        how: "Pray two rakʿat immediately after the fard salam, ideally at home. Recite al-Kafirun in the first, al-Ikhlas in the second \u2014 both short, letting the heart linger on meaning rather than length.",
        sources: [
          {
            kind: 'hadith',
            ref: 'Sunan Ibn Majah 1166',
            arabic: 'عَنِ ابْنِ عُمَرَ قَالَ كَانَ رَسُولُ اللَّهِ ﷺ يَقْرَأُ فِي الرَّكْعَتَيْنِ بَعْدَ الْمَغْرِبِ بِـ\u201Cقُلْ يَا أَيُّهَا الْكَافِرُونَ\u201D وَ\u201Cقُلْ هُوَ اللَّهُ أَحَدٌ\u201D.',
            translation: "Ibn Umar (RA) reported: The Messenger of Allah \uFDFA used to recite in the two rakʿat after Maghrib: \"Qul ya ayyuha al-kafirun\" (Surat al-Kafirun) and \"Qul huwa Allahu ahad\" (Surat al-Ikhlas).",
            relevance: 'direct',
            provenanceTier: 'Bayyinah',
            hadithGrade: 'Sahih',
            rationale: "Prophetic practice for the two-rakʿat rawātib after Maghrib \u2014 direct basis for the recommended surahs."
          },
          {
            kind: 'hadith',
            ref: 'Sahih Muslim 728a',
            arabic: 'عَنْ أُمِّ حَبِيبَةَ قَالَتْ قَالَ رَسُولُ اللَّهِ ﷺ \u201Cمَنْ صَلَّى اثْنَتَىْ عَشْرَةَ رَكْعَةً فِي يَوْمٍ وَلَيْلَةٍ بُنِيَ لَهُ بِهِنَّ بَيْتٌ فِي الْجَنَّةِ\u201D.',
            translation: "Umm Habiba (RA) reported: The Messenger of Allah \uFDFA said, \"Whoever prays twelve rakʿat during the day and night, a house in Paradise will be built for him because of them.\"",
            relevance: 'contextual',
            provenanceTier: 'Bayyinah',
            hadithGrade: 'Sahih',
            rationale: "Anchors the two rakʿat after Maghrib within the twelve-rakʿat daily rawātib \u2014 the same hadith sets Dhuhr's 4+2 and Fajr's 2."
          }
        ]
      },
    ],
    keys: [
      "Pray promptly — Maghrib's window is the shortest of the day.",
      'No four-rakʿah farḍ here; its witr-count is the 3.',
      'If time allows before iqāmah, pray 2 light rakʿahs — the Prophet ﷺ permitted this.',
    ],
  },
  isha: {
    structure: [
      {
        kind: 'Sunnah before',
        count: 4,
        note: 'Optional — two sets of two if time permits.',
        tier: 'T3',
        amanahRationale: "The four rakʿat before Isha are not among the twelve muʾakkadah rawātib; they are a meritorious but not confirmed sunnah \u2014 hence T3 (Niyyah) rather than T1/T2.",
        why: "Four rakʿat before Isha do not carry the muʾakkadah weight of Fajr's 2 or Dhuhr's 4+2. They are for the one whose schedule and energy allow a richer entry into the night's fard.",
        how: "If time and energy permit, pray four rakʿat in two sets of two before the Isha iqāmah. Skip without concern when tired or pressed for time \u2014 the fard and its two confirmed rawātib are the priority.",
        sources: [
          {
            kind: "hadith",
            ref: "Sahih al-Bukhari 627",
            arabic: "بَيْنَ كُلِّ أَذَانَيْنِ صَلاَةٌ، بَيْنَ كُلِّ أَذَانَيْنِ صَلاَةٌ، ثُمَّ قَالَ فِي الثَّالِثَةِ: لِمَنْ شَاءَ",
            translation: "There is a prayer between the two Adhans (Adhan and Iqama). [The Prophet said this thrice, then on the third he added:] For the one who wants to pray.",
            relevance: "direct",
            provenanceTier: "Bayyinah",
            hadithGrade: "Sahih (agreed upon — Bukhari and Muslim)",
            rationale: "The canonical anchor for any optional pre-fard nafl. Establishes that praying between the adhan and iqama for any salah — including Isha — is a meritorious sunnah open to whoever wishes; grounds the optional 4 rakʿat before Isha as a non-muʾakkadah but prophetically encouraged practice.",
            ratNote: "Verified against sunnah.com 2026-04-26 — Bukhari 627 and Muslim 838 both confirmed (Muslim 838 = USC-MSA Book 4 Hadith 1822, same narration under older edition numbering). Earlier PDF references to Bukhari 597/600 reflect the same narration in pre-Fath edition numbering."
          }
        ]
      },
      {
        kind: 'Farḍ',
        count: 4,
        note: 'Aloud in the first two rakʿahs, silent in the last two.',
        tier: 'T1',
        amanahRationale: "The four-rakʿah Isha fard with aloud recitation in the first two is mutawatir prophetic practice, transmitted through every generation. Abu Hurayra in Sahih al-Bukhari 657 narrates that the Prophet \uFDFA considered praying Isha in congregation among the heaviest on hypocrites \u2014 its weight in the covenant is distinct.",
        why: "Isha closes the day's fard. Aloud in the first two rakʿat, silent in the last two. The Prophet \uFDFA said there is no prayer heavier on the hypocrites than Fajr and Isha \u2014 their presence in congregation is a live test of sincerity.",
        how: "Recite al-Fatihah and a surah aloud in the first two rakʿat. Recite al-Fatihah alone, silently, in the last two. Pray in congregation if possible \u2014 one of the two prayers the Prophet \uFDFA named as hardest on the hypocrites.",
        sources: [
          {
            kind: 'hadith',
            ref: 'Sahih al-Bukhari 657',
            arabic: 'عَنْ أَبِي هُرَيْرَةَ قَالَ قَالَ رَسُولُ اللَّهِ ﷺ \u201Cلَيْسَ صَلَاةٌ أَثْقَلَ عَلَى الْمُنَافِقِينَ مِنَ الْفَجْرِ وَالْعِشَاءِ، وَلَوْ يَعْلَمُونَ مَا فِيهِمَا لَأَتَوْهُمَا وَلَوْ حَبْوًا\u201D.',
            translation: "Abu Hurayra (RA) reported: The Messenger of Allah \uFDFA said, \"No prayer is heavier on the hypocrites than Fajr and Isha; if they knew what reward lies in them, they would come to them even crawling.\"",
            relevance: 'direct',
            provenanceTier: 'Bayyinah',
            hadithGrade: 'Sahih',
            rationale: "Prophetic diagnostic: Isha's congregation is one of two live tests of sincerity \u2014 raising its covenantal weight above ordinary fard."
          }
        ]
      },
      {
        kind: 'Sunnah after',
        count: 2,
        note: 'Confirmed rawātib.',
        tier: 'T1',
        amanahRationale: "The two rakʿat after Isha are part of the twelve muʾakkadah rawātib (Sahih Muslim 728a) \u2014 among the set the Prophet \uFDFA guaranteed a house in Paradise for.",
        why: "Two rakʿat after Isha complete the twelve daily rawātib. They seal the fard circle of the day and prepare the heart for either immediate witr or the night's rest.",
        how: "Pray two light rakʿat after the fard salam, ideally at home. Keep them short \u2014 the Prophet \uFDFA's practice was brevity at this hour.",
        sources: [
          {
            kind: 'hadith',
            ref: 'Sahih Muslim 728a',
            arabic: 'عَنْ أُمِّ حَبِيبَةَ قَالَتْ قَالَ رَسُولُ اللَّهِ ﷺ \u201Cمَنْ صَلَّى اثْنَتَىْ عَشْرَةَ رَكْعَةً فِي يَوْمٍ وَلَيْلَةٍ بُنِيَ لَهُ بِهِنَّ بَيْتٌ فِي الْجَنَّةِ\u201D.',
            translation: "Umm Habiba (RA) reported: The Messenger of Allah \uFDFA said, \"Whoever prays twelve rakʿat during the day and night, a house in Paradise will be built for him because of them.\"",
            relevance: 'direct',
            provenanceTier: 'Bayyinah',
            hadithGrade: 'Sahih',
            rationale: "The two rakʿat after Isha sit inside the twelve-rakʿat rawātib promise \u2014 direct textual basis for their muʾakkadah status."
          }
        ]
      },
      {
        kind: 'Witr',
        count: '1, 3, 5, 7 or 9',
        note: 'Odd-numbered. Delay it to tahajjud only if you are certain to rise.',
        tier: 'T1',
        amanahRationale: "Witr is established by Abu Dawud 1422 / Sahih Muslim 752 as a distinct night-sealing prayer ordered by the Prophet \uFDFA: \"Make witr your last prayer of the night.\" Its odd-number structure is prophetic.",
        why: "Witr is the seal of the night's prayer \u2014 odd by commanded design, because Allah is One and loves the odd (Bukhari 6410, Muslim 2677). Delaying it to tahajjud is only sunnah for those certain to rise; otherwise pray it before sleep.",
        how: "Pray 1, 3, 5, 7 or 9 rakʿat before sleep (or in tahajjud if certain to rise). The Prophet's \uFDFA common pattern was 3: two with a salam then one, or three together with one tashahhud at the end. Qunūt in witr is sunnah; the duʿāʾ of al-Hasan ibn Ali is narrated by Abu Dawud.",
        sources: [
          {
            kind: 'hadith',
            ref: 'Sahih Muslim 752',
            arabic: 'عَنِ ابْنِ عُمَرَ قَالَ قَالَ رَسُولُ اللَّهِ ﷺ \u201Cاجْعَلُوا آخِرَ صَلَاتِكُمْ بِاللَّيْلِ وِتْرًا\u201D.',
            translation: "Ibn Umar (RA) reported: The Messenger of Allah \uFDFA said, \"Make witr the last of your prayers at night.\"",
            relevance: 'direct',
            provenanceTier: 'Bayyinah',
            hadithGrade: 'Sahih',
            rationale: "Direct prophetic command that witr be the seal of night prayer \u2014 the operative basis for praying it last, whether after Isha or after tahajjud."
          },
          {
            kind: 'hadith',
            ref: 'Sunan Abi Dawud 1422',
            arabic: 'عَنْ أَبِي أَيُّوبَ قَالَ قَالَ رَسُولُ اللَّهِ ﷺ \u201Cالْوِتْرُ حَقٌّ عَلَى كُلِّ مُسْلِمٍ، فَمَنْ أَحَبَّ أَنْ يُوتِرَ بِخَمْسٍ فَلْيَفْعَلْ، وَمَنْ أَحَبَّ أَنْ يُوتِرَ بِثَلَاثٍ فَلْيَفْعَلْ، وَمَنْ أَحَبَّ أَنْ يُوتِرَ بِوَاحِدَةٍ فَلْيَفْعَلْ\u201D.',
            translation: "Abu Ayyub (RA) reported: The Messenger of Allah \uFDFA said, \"Witr is a duty on every Muslim; whoever wishes to pray witr with five, let him do so; whoever wishes to pray witr with three, let him do so; whoever wishes to pray witr with one, let him do so.\"",
            relevance: 'direct',
            provenanceTier: 'Bayyinah',
            hadithGrade: 'Sahih',
            rationale: "Direct prophetic basis for the odd-rakʿat options (1, 3, 5) in witr \u2014 anchoring the flexibility in the structure row."
          }
        ]
      },
    ],
    keys: [
      'Witr seals the night — do not sleep without it.',
      'Best prayed in the first third of night unless you plan tahajjud.',
      'Qunūt in witr is sunnah; the duʿāʾ of al-Ḥasan ibn ʿAlī is narrated by Abū Dāwūd.',
    ],
  },
  tahajjud: {
    structure: [
      {
        kind: 'Qiyām',
        count: 'Pairs of 2',
        note: "Two rakʿahs at a time — the Prophet ﷺ's standard unit.",
        tier: 'T1',
        amanahRationale: "Ibn Umar (RA) in Sahih al-Bukhari 990 / Sahih Muslim 749 reports the Prophet \uFDFA said, \"Night prayer is two by two.\" The pair-of-two unit is the operative prophetic form.",
        why: "Pairs of two are the prophetic unit of the night. Each salam returns the heart to awareness, lets breath settle, and marks the next two rakʿat as a fresh act \u2014 not a marathon to be rushed.",
        how: "Pray each unit as two rakʿat with one salam. The Prophet \uFDFA advised: if you fear dawn, pray one rakʿah as witr to make what you prayed odd. Begin with two light rakʿat before lengthening.",
        sources: [
          {
            kind: 'hadith',
            ref: 'Sahih al-Bukhari 990',
            arabic: 'عَنِ ابْنِ عُمَرَ أَنَّ رَجُلًا سَأَلَ النَّبِيَّ ﷺ عَنْ صَلَاةِ اللَّيْلِ فَقَالَ \u201Cصَلَاةُ اللَّيْلِ مَثْنَى مَثْنَى، فَإِذَا خَشِيَ أَحَدُكُمُ الصُّبْحَ صَلَّى رَكْعَةً وَاحِدَةً تُوتِرُ لَهُ مَا قَدْ صَلَّى\u201D.',
            translation: "Ibn Umar (RA) reported: A man asked the Prophet \uFDFA about night prayer. He said, \"Night prayer is two by two (rakʿat); and if one of you fears the approach of dawn, let him pray one rakʿah as witr to make odd what he has prayed.\"",
            relevance: 'direct',
            provenanceTier: 'Bayyinah',
            hadithGrade: 'Sahih',
            rationale: "Direct prophetic instruction that night prayer is structured as pairs of two \u2014 the operative basis for the unit."
          },
          {
            kind: 'hadith',
            ref: 'Sahih Muslim 767b',
            arabic: 'عَنْ أَبِي هُرَيْرَةَ قَالَ قَالَ رَسُولُ اللَّهِ ﷺ \u201Cإِذَا قَامَ أَحَدُكُمْ مِنَ اللَّيْلِ فَلْيَفْتَتِحْ صَلَاتَهُ بِرَكْعَتَيْنِ خَفِيفَتَيْنِ\u201D.',
            translation: "Abu Hurayra (RA) reported: The Messenger of Allah \uFDFA said, \"When one of you rises at night, let him begin his prayer with two light rakʿat.\"",
            relevance: 'contextual',
            provenanceTier: 'Bayyinah',
            hadithGrade: 'Sahih',
            rationale: "Prophetic instruction to open the night with two light rakʿat \u2014 anchoring the 'begin light, then lengthen' form of the pair."
          }
        ]
      },
      {
        kind: 'Recommended',
        count: '8 + witr',
        note: 'The Prophet ﷺ did not exceed 11 rakʿahs in Ramaḍān or outside it. (Bukhārī)',
        tier: 'T1',
        amanahRationale: "Aishah (RA) in Sahih al-Bukhari 1147 / Sahih Muslim 738 says the Prophet \uFDFA did not exceed eleven rakʿat \u2014 inside Ramadan or outside it. The 8 + 3 witr pattern is the prophetic ceiling.",
        why: "Aishah (RA) reports the Prophet \uFDFA never exceeded eleven rakʿat at night, in Ramadan or outside it. The 8+3 pattern is the prophetic ceiling \u2014 a quality cap rather than a quantity target.",
        how: "Pray eight rakʿat in four pairs of two, then witr (typically three \u2014 two then one, or three together). Lengthen recitation, rukūʿ, and sujūd rather than adding rakʿat \u2014 the Prophet's \uFDFA night prayer was known for its depth, not its count.",
        sources: [
          {
            kind: 'hadith',
            ref: 'Sahih al-Bukhari 1147',
            arabic: 'عَنْ عَائِشَةَ أَنَّهَا سُئِلَتْ كَيْفَ كَانَتْ صَلَاةُ رَسُولِ اللَّهِ ﷺ فِي رَمَضَانَ فَقَالَتْ \u201Cمَا كَانَ رَسُولُ اللَّهِ ﷺ يَزِيدُ فِي رَمَضَانَ وَلَا فِي غَيْرِهِ عَلَى إِحْدَى عَشْرَةَ رَكْعَةً\u201D.',
            translation: "Aishah (RA) was asked how the prayer of the Messenger of Allah \uFDFA was in Ramadan. She said, \"The Messenger of Allah \uFDFA did not exceed eleven rakʿat, in Ramadan or outside of it.\"",
            relevance: 'direct',
            provenanceTier: 'Bayyinah',
            hadithGrade: 'Sahih',
            rationale: "Direct companion testimony on the prophetic ceiling of eleven rakʿat (8 qiyām + 3 witr) \u2014 the operative basis for the recommended count."
          }
        ]
      },
    ],
    keys: [
      'Best in the last third of the night — "Our Lord descends to the lowest heaven…" (Bukhārī)',
      'Begin with 2 light rakʿahs, then lengthen.',
      'If you kept witr after ʿIshāʾ, do not repeat it — "no two witrs in one night."',
    ],
  },
};

function hasTag(task, tag) {
  return Array.isArray(task.tags) && task.tags.includes(tag);
}

function findPrayerSpecificTag(task) {
  if (!Array.isArray(task.tags)) return null;
  for (const prayer of ALL_PRAYERS) {
    if (task.tags.includes(`prayer:${prayer}`)) return prayer;
  }
  return null;
}

// Decide which boards a task should be copied into.
// Returns array of boardIds, or [] if the task stays in faith_salah_*.
function classifyTask(task) {
  const tags = task.tags || [];

  // Main-phase + untagged → stay in faith_salah_*
  const hasBefore = tags.some((t) => t === 'prayer-phase:before');
  const hasAfter  = tags.some((t) => t === 'prayer-phase:after');
  if (!hasBefore && !hasAfter) return [];

  // Explicit prayer-specific attribution wins over generics.
  const specific = findPrayerSpecificTag(task);
  if (specific) {
    const phase = hasBefore ? 'before' : 'after';
    return [`prayer_${specific}_${phase}`];
  }

  // Tahajjud-specific transitions.
  if (hasTag(task, 'transition:tahajjud-waking')) return ['prayer_tahajjud_before'];
  if (hasTag(task, 'transition:post-witr'))       return ['prayer_tahajjud_after'];

  // Time-of-day transitions map to a single prayer.
  if (hasTag(task, 'transition:waking') || hasTag(task, 'transition:morning-adhkar')) {
    return ['prayer_fajr_before'];
  }
  if (hasTag(task, 'transition:evening-adhkar')) {
    return ['prayer_maghrib_before'];
  }
  if (hasTag(task, 'transition:pre-sleep')) {
    return ['prayer_isha_after'];
  }
  if (hasTag(task, 'transition:end-of-morning')) {
    return ['prayer_dhuhr_before'];
  }
  if (hasTag(task, 'transition:duha')) {
    return ['prayer_fajr_after'];
  }
  if (hasTag(task, 'transition:qaylulah')) {
    return ['prayer_dhuhr_before'];
  }
  if (hasTag(task, 'transition:after-asr')) {
    return ['prayer_asr_after'];
  }
  if (hasTag(task, 'transition:bedtime')) {
    return ['prayer_isha_after'];
  }
  if (hasTag(task, 'transition:witr')) {
    return ['prayer_isha_after'];
  }
  if (hasTag(task, 'transition:qiyam-rest')) {
    return ['prayer_isha_after'];
  }
  if (hasTag(task, 'transition:sahari')) {
    return ['prayer_fajr_before'];
  }
  if (hasTag(task, 'transition:jumuah')) {
    return ['prayer_dhuhr_before'];
  }
  if (hasTag(task, 'transition:maghrib-iftar')) {
    return ['prayer_maghrib_before'];
  }
  if (hasTag(task, 'transition:isha-taraweeh')) {
    return ['prayer_isha_after'];
  }
  if (hasTag(task, 'transition:laylat-al-qadr')) {
    return ['prayer_tahajjud_before'];
  }
  if (hasTag(task, 'transition:eid-prayer')) {
    return ['prayer_fajr_after'];
  }
  if (hasTag(task, 'transition:traveler-departure')) {
    return ['prayer_dhuhr_before'];
  }
  if (hasTag(task, 'transition:traveler-arrival')) {
    return ['prayer_maghrib_after'];
  }

  // A phase-tagged Faith task with no prayer-specific attribution stays on its
  // own faith_salah_* board. It used to be copied onto all five daily prayers,
  // which is exactly why every prayer node showed the same three tasks — the
  // per-prayer content is authored below in PRAYER_PHASE_TASKS instead.
  return [];
}

// --- Curated chain order for the generated boards ------------------------
// A copied task carries its SOURCE board's `seq` (the spread at the push
// below), which is meaningless here: `faith_salah_core`'s seq 5 landing on a
// 3-task prayer board is out of range, two source boards can contribute the
// same value, and seq 0 from `faith_salah_excellence` would sort an excellence
// task ahead of the core adhkar. So each board's own position is assigned LAST
// and wins — see wiki/decisions/2026-07-27-milos-prayer-board-ordering.md.
//
// The default is emission order — copied faith tasks, then derived rawatib,
// then authored tasks. That is right for the six `during` boards, whose rows
// arrive in anatomical order already. It is wrong for all twelve before/after
// boards, where three independent sources interleave and only the CLOCK knows
// the sequence, so each of the twelve is listed here in full.
//
// Nothing is reclassified: every title below already lives on that board. A
// complete listing also makes the set-equality drift guard in
// __tests__/prayer-order.test.js total — a title added to or removed from any
// before/after board fails the test rather than silently sorting to the end.
export const PRAYER_ORDER_OVERRIDES = {
  // You wake, then answer the adhan, then pray the rawatib; the morning
  // adhkar anchor closes the approach.
  prayer_fajr_before: [
    "Reclaim the day with the waking du'a and morning adhkar",
    'Answer the Fajr adhan and come to it out of sleep',
    'Pray the two rakʿah sunnah before Fajr',
    "Anchor the morning with Sayyid al-Istighfar and the daily-good du'a",
  ],
  // The adhkar block is said in the seat you prayed in and the tahlil before
  // a word is spoken — both precede the sitting until sunrise.
  prayer_fajr_after: [
    'Complete the Fajr adhkar without leaving your place',
    'Seal Fajr with the tenfold tahlil before you speak',
    'Sit in remembrance after Fajr until sunrise (Ishraq reward)',
    'No voluntary prayer between Fajr and sunrise.',
  ],
  // The window opens first; siwak/wudu and the rawatib follow it, not precede it.
  prayer_dhuhr_before: [
    'Close the morning by praying Dhuhr at its first time',
    'Answer the Dhuhr adhan and renew wudu in the middle of the workday',
    'Pray the four rakʿah sunnah before Dhuhr',
  ],
  // Adhkar before standing, rawatib before returning to work.
  prayer_dhuhr_after: [
    'Complete the Dhuhr adhkar before returning to work',
    'Pray the two rakʿah sunnah after Dhuhr',
  ],
  // The middle prayer is guarded before it is prepared for.
  prayer_asr_before: [
    'Guard al-ṣalāt al-wusṭā — pray ʿAṣr before the sun yellows',
    'Answer the ʿAṣr adhan and take the siwak',
    'Pray the four rakʿah sunnah before ʿAṣr',
  ],
  // The adhkar block, then the refuge duʿāʾ; the no-nafl window closes the tab.
  prayer_asr_after: [
    'Complete the ʿAṣr adhkar as the day turns',
    'Seek refuge from the grave and the Dajjal at the close of ʿAṣr',
    'No voluntary prayer after ʿAṣr until Maghrib.',
  ],
  // The evening adhkar are recited between Asr and Maghrib — i.e. before
  // Maghrib’s own preparation, not after it.
  prayer_maghrib_before: [
    'Recite the evening adhkar between Asr and Maghrib',
    'Answer the Maghrib adhan at once — its window is the shortest',
    'If time allows before iqāmah, pray 2 light rakʿahs — the Prophet ﷺ permitted this.',
  ],
  // Adhkar, then the tenfold tahlil before standing, then the two rakʿat.
  prayer_maghrib_after: [
    'Complete the Maghrib adhkar as the day closes',
    'Recite the tenfold tahlil after Maghrib',
    'Pray the two rakʿah sunnah after Maghrib',
  ],
  // Guarding the hour before the prayer is what guards the prayer.
  prayer_isha_before: [
    'Do not sleep before ʿIshāʾ — enter the night awake',
    'Answer the ʿIshāʾ adhan and prepare with siwak and wudu',
    'Pray the four rakʿah sunnah before ʿIshāʾ',
  ],
  // The night is sealed in order: adhkar, rawatib, witr, the Light Duʿāʾ, sleep.
  prayer_isha_after: [
    'Complete the ʿIshāʾ adhkar and keep the silence after it',
    'Pray the two rakʿah sunnah after ʿIshāʾ',
    'Seal the night with Witr',
    "Recite the Prophetic Light Du'a after Witr",
    'Complete the prophetic pre-sleep sunnah',
  ],
  // When to rise and how to enter, then what one rises toward.
  prayer_tahajjud_before: [
    'Rise for Tahajjud with the prophetic waking protocol',
    'Best in the last third of the night — "Our Lord descends to the lowest heaven…" (Bukhārī)',
    'Begin with 2 light rakʿahs, then lengthen.',
    'Pray Qiyām al-Layl in pairs of two',
  ],
  // What was prayed is sealed, then kept; the no-second-witr note closes the tab.
  prayer_tahajjud_after: [
    "Seal the night with the post-Witr adhkar and last-third du'a",
    'Do not abandon the night prayer once you have begun it',
    'If you kept witr after ʿIshāʾ, do not repeat it — "no two witrs in one night."',
  ],
};

// Assign the board's own 0..n-1 permutation, applying an override if one
// exists. An unlisted title sorts to the end rather than throwing, so a newly
// tagged faith task can never break the build; the drift guard in
// __tests__/prayer-order.test.js is what makes a stale override loud.
function curateBoardOrder(boardId, tasks) {
  const override = PRAYER_ORDER_OVERRIDES[boardId];
  const rank = (t) => {
    const i = override.indexOf(t.title);
    return i === -1 ? override.length : i;
  };
  const ordered = override ? [...tasks].sort((a, b) => rank(a) - rank(b)) : tasks;
  // Spread order matters: our `seq` overwrites the inherited one.
  return ordered.map((t, i) => ({ ...t, seq: i }));
}

// --- UI selector: prayer-specific before/after Sunnah --------------------
// Surfaces each prayer's own rawatib (from PRAYER_GUIDE) for the Prophetic
// Path node popup's Before / After tabs, so the six prayer nodes no longer
// share one generic faith-salah threshold. PRAYER_GUIDE stays private — this
// only reshapes the rows already used to seed the During anatomy boards; it
// authors no new fiqh.

const PRAYER_LABEL_BY_ID = Object.fromEntries(
  PRAYER_PILLARS.map((p) => [p.id, p.label]),
);

// Prayers/phases with no rawatib row (Fajr/Asr "after", Maghrib "before",
// Tahajjud "after") fall back to a grounded reminder already in
// PRAYER_GUIDE[id].keys. Match on an ASCII-safe substring so the text stays
// sourced there rather than duplicated here.
const SUNNAH_FALLBACK_MATCH = {
  'fajr:after': 'No voluntary prayer between Fajr',
  'asr:after': 'No voluntary prayer after',
  'maghrib:before': 'If time allows before',
  'tahajjud:after': 'no two witrs',
};

// Windows where PRAYER_GUIDE[id].keys carries the *approach* to the window —
// what precedes the rakʿat — and the structure row is the prayer itself rather
// than a rawatib around it. Tahajjud is the case: it has no 'Sunnah before'
// row, so its Before tab leads with when to rise and how to enter, then shows
// the Qiyām row as what one rises toward. Needles are ASCII-safe for the same
// cp1252 reason as SUNNAH_FALLBACK_MATCH.
const SUNNAH_LEAD = {
  'tahajjud:before': {
    needles: ['Best in the last third', 'Begin with 2 light'],
    rowsCaption: 'What you rise toward',
  },
};

function normalizeSunnahRow(row) {
  return {
    kind: row.kind,
    count: row.count,
    tier: row.tier || null,
    note: row.note || '',
    why: row.why || '',
    how: row.how || '',
    sources: Array.isArray(row.sources) ? row.sources : [],
  };
}

// phase ∈ 'before' | 'after'. Returns
//   { prayerId, phase, prayerLabel, rows: [normalizedRow, ...], fallbackNote,
//     leadNotes: [string, ...], rowsCaption }
// or null for a non-prayer id / unsupported phase. `rows` is an array so Isha's
// "after" can carry both the 2 rawatib and the Witr row. `leadNotes` precede
// the rows where the window has an approach of its own (see SUNNAH_LEAD).
export function getPrayerPhaseSunnah(prayerId, phase) {
  const guide = PRAYER_GUIDE[prayerId];
  if (!guide || (phase !== 'before' && phase !== 'after')) return null;

  const rows = [];
  if (phase === 'before') {
    const beforeRow =
      guide.structure.find((r) => r.kind === 'Sunnah before') ||
      // Tahajjud has no "Sunnah before" row — its optional night prayer is the
      // Qiyām row itself (startsWith keeps the match ASCII-safe past the 'ā').
      (prayerId === 'tahajjud'
        ? guide.structure.find((r) => r.kind.startsWith('Qiy'))
        : null);
    if (beforeRow) rows.push(normalizeSunnahRow(beforeRow));
  } else {
    const afterRow = guide.structure.find((r) => r.kind === 'Sunnah after');
    if (afterRow) rows.push(normalizeSunnahRow(afterRow));
    // Isha seals the night with Witr — surface it beside the 2 rawatib.
    const witrRow = guide.structure.find((r) => r.kind === 'Witr');
    if (witrRow) rows.push(normalizeSunnahRow(witrRow));
  }

  let fallbackNote = null;
  if (rows.length === 0) {
    const needle = SUNNAH_FALLBACK_MATCH[`${prayerId}:${phase}`];
    if (needle) fallbackNote = guide.keys.find((k) => k.includes(needle)) || null;
  }

  const lead = SUNNAH_LEAD[`${prayerId}:${phase}`];
  const leadNotes = lead
    ? lead.needles.map((n) => guide.keys.find((k) => k.includes(n))).filter(Boolean)
    : [];

  return {
    prayerId,
    phase,
    prayerLabel: PRAYER_LABEL_BY_ID[prayerId] || prayerId,
    rows,
    fallbackNote,
    leadNotes,
    rowsCaption: leadNotes.length > 0 ? lead.rowsCaption : null,
  };
}

// --- Per-prayer Before/After content -------------------------------------
// Until this pass the three generic Salah sunan (pre-prayer preparation,
// post-prayer adhkar, prayer-specific duʿāʾ) were copied onto all five daily
// prayers, so every prayer node's Before/After tabs showed the same list. That
// fan-out is gone (see the end of classifyTask above); what follows replaces it.
//
// Content arrives from two places, in this order:
//   1. DERIVED — buildRawatibTasks() reshapes the rawātib rows PRAYER_GUIDE
//      already carries, through the existing getPrayerPhaseSunnah() selector.
//      No new fiqh is authored there; the sources pass through verbatim.
//   2. AUTHORED — PRAYER_PHASE_TASKS below, written once per prayer. Every
//      subtask carries the same structured `sources` schema as every other seed
//      row, so lint:grounding-strict and audit:inline-refs stay at their 0
//      ratchets.
//
// The generic three are NOT deleted: they keep their home on the faith_salah_*
// boards. Only their copies onto prayer boards go away.

// Shared citations. A source object is immutable data, so the same constant can
// be referenced from several subtasks without any copy step.
const SRC_ADHAN_REPEAT = {
  kind: 'hadith',
  ref: 'Sahih al-Bukhari 611',
  arabic: 'قَالَ رَسُولُ اللَّهِ ﷺ "إِذَا سَمِعْتُمُ النِّدَاءَ فَقُولُوا مِثْلَ مَا يَقُولُ الْمُؤَذِّنُ".',
  translation: 'Narrated Abu Saʿid al-Khudri (RA): Allah’s Messenger ﷺ said, "Whenever you hear the adhan, say what the muezzin is saying."',
  relevance: 'direct',
  provenanceTier: 'Bayyinah',
  hadithGrade: 'Sahih',
  rationale: 'Explicit prophetic command to repeat after the muezzin — the textual basis for answering any adhan.',
};

const SRC_ADHAN_DUA = {
  kind: 'hadith',
  ref: 'Sahih al-Bukhari 614',
  arabic: 'قَالَ رَسُولُ اللَّهِ ﷺ "مَنْ قَالَ حِينَ يَسْمَعُ النِّدَاءَ: اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ وَالصَّلاَةِ الْقَائِمَةِ آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ، حَلَّتْ لَهُ شَفَاعَتِي يَوْمَ الْقِيَامَةِ".',
  translation: 'Narrated Jabir ibn Abdullah (RA): Allah’s Messenger ﷺ said, "Whoever, upon hearing the adhan, says: ‘O Allah, Lord of this perfect call and of the prayer to be established, grant Muhammad al-wasilah and al-fadilah, and raise him to the praiseworthy station which You promised him,’ — my intercession on the Day of Resurrection will be permitted for him."',
  relevance: 'direct',
  provenanceTier: 'Bayyinah',
  hadithGrade: 'Sahih',
  rationale: 'Gives the exact wording of the post-adhan duʿāʾ and ties it to the Prophet’s intercession.',
};

const SRC_SIWAK_NIGHT = {
  kind: 'hadith',
  ref: 'Sahih al-Bukhari 245',
  arabic: 'عَنْ حُذَيْفَةَ قَالَ كَانَ النَّبِيُّ ﷺ إِذَا قَامَ مِنَ اللَّيْلِ يَشُوصُ فَاهُ بِالسِّوَاكِ.',
  translation: 'Narrated Hudhaifa (RA): Whenever the Prophet ﷺ got up at night, he used to clean his mouth with the siwak.',
  relevance: 'direct',
  provenanceTier: 'Bayyinah',
  hadithGrade: 'Sahih',
  rationale: 'Names siwak-on-rising as prophetic habit — the basis for taking it before Fajr and Tahajjud specifically.',
};

const SRC_SIWAK_EVERY_PRAYER = {
  kind: 'hadith',
  ref: 'Sahih al-Bukhari 887',
  arabic: 'قَالَ رَسُولُ اللَّهِ ﷺ "لَوْلاَ أَنْ أَشُقَّ عَلَى أُمَّتِي لأَمَرْتُهُمْ بِالسِّوَاكِ مَعَ كُلِّ صَلاَةٍ".',
  translation: 'Narrated Abu Huraira (RA): Allah’s Messenger ﷺ said, "If I had not found it hard for my followers or the people, I would have ordered them to clean their teeth with siwak for every prayer."',
  relevance: 'direct',
  provenanceTier: 'Bayyinah',
  hadithGrade: 'Sahih',
  rationale: 'Ties the siwak to every prayer, not to one — the operative sunnah wherever a prayer is approached.',
};

const SRC_WUDU_AYAH = {
  kind: 'quran',
  ref: 'Quran 5:6',
  arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا قُمْتُمْ إِلَى الصَّلَاةِ فَاغْسِلُوا وُجُوهَكُمْ وَأَيْدِيَكُمْ إِلَى الْمَرَافِقِ وَامْسَحُوا بِرُءُوسِكُمْ وَأَرْجُلَكُمْ إِلَى الْكَعْبَيْنِ',
  translation: 'O you who have believed, when you rise to [perform] prayer, wash your faces and your forearms to the elbows and wipe over your heads and wash your feet to the ankles.',
  relevance: 'direct',
  provenanceTier: 'Bayyinah',
  rationale: 'Quranic command specifying each limb of wudu — the basis for the obligation and its order.',
};

const SRC_WUDU_HEELS = {
  kind: 'hadith',
  ref: 'Sahih al-Bukhari 165',
  arabic: 'قَالَ أَبُو هُرَيْرَةَ: أَسْبِغُوا الْوُضُوءَ فَإِنَّ أَبَا الْقَاسِمِ ﷺ قَالَ "وَيْلٌ لِلأَعْقَابِ مِنَ النَّارِ".',
  translation: 'Narrated Muhammad ibn Ziyad: I heard Abu Huraira (RA) saying, "Perform the wudu thoroughly, for Abu’l-Qasim ﷺ said: ‘Save your heels from the Hell-fire.’"',
  relevance: 'direct',
  provenanceTier: 'Bayyinah',
  hadithGrade: 'Sahih',
  rationale: 'Prophetic warning naming the heels — the operative basis for washing them fully rather than splashing.',
};

const SRC_SUTRAH_PRACTICE = {
  kind: 'hadith',
  ref: 'Sahih al-Bukhari 494',
  arabic: 'عَنِ ابْنِ عُمَرَ، أَنَّ رَسُولَ اللَّهِ ﷺ كَانَ إِذَا خَرَجَ يَوْمَ الْعِيدِ أَمَرَ بِالْحَرْبَةِ فَتُوضَعُ بَيْنَ يَدَيْهِ، فَيُصَلِّي إِلَيْهَا وَالنَّاسُ وَرَاءَهُ، وَكَانَ يَفْعَلُ ذَلِكَ فِي السَّفَرِ.',
  translation: 'Narrated Ibn Umar (RA): Whenever Allah’s Messenger ﷺ came out on Eid day, he ordered that a short spear be planted in front of him; he would pray facing it with the people behind him, and he did the same while on a journey.',
  relevance: 'direct',
  provenanceTier: 'Bayyinah',
  hadithGrade: 'Sahih',
  rationale: 'Establishes the Prophet’s consistent practice of planting a physical sutrah in open ground.',
};

const SRC_SUTRAH_WARNING = {
  kind: 'hadith',
  ref: 'Sahih al-Bukhari 510',
  arabic: 'قَالَ رَسُولُ اللَّهِ ﷺ "لَوْ يَعْلَمُ الْمَارُّ بَيْنَ يَدَىِ الْمُصَلِّي مَاذَا عَلَيْهِ لَكَانَ أَنْ يَقِفَ أَرْبَعِينَ خَيْرًا لَهُ مِنْ أَنْ يَمُرَّ بَيْنَ يَدَيْهِ".',
  translation: 'Narrated Abu Juhaim (RA): Allah’s Messenger ﷺ said, "If the one passing in front of a praying person knew the magnitude of his sin, he would prefer to wait forty rather than pass in front of him."',
  relevance: 'direct',
  provenanceTier: 'Bayyinah',
  hadithGrade: 'Sahih',
  rationale: 'Gives the weight behind the sutrah — why a worshipper marks his space when he prays outside a masjid.',
};

const SRC_CRAWL_TO_ISHA_FAJR = {
  kind: 'hadith',
  ref: 'Sahih al-Bukhari 615',
  translation: 'Narrated Abu Huraira (RA): Allah’s Messenger ﷺ said, "If the people knew the reward for pronouncing the adhan and for standing in the first row, and found no other way to get it except by drawing lots, they would draw lots; and if they knew the reward of the Zuhr prayer in the early moments of its time, they would race for it; and if they knew the reward of ʿIshāʾ and Fajr in congregation, they would come to them even if they had to crawl."',
  relevance: 'direct',
  provenanceTier: 'Bayyinah',
  hadithGrade: 'Sahih',
  rationale: 'Names ʿIshāʾ and Fajr as the two congregations worth crawling to, and Zuhr as the prayer worth racing to at its first moments.',
};

const SRC_MISSING_ASR = {
  kind: 'hadith',
  ref: 'Sahih al-Bukhari 552',
  translation: 'Narrated Ibn Umar (RA): Allah’s Messenger ﷺ said, "Whoever misses the ʿAṣr prayer, it is as if he lost his family and property."',
  relevance: 'direct',
  provenanceTier: 'Bayyinah',
  hadithGrade: 'Sahih',
  rationale: 'The specific warning attached to ʿAṣr and no other prayer — the basis for guarding this window above the rest of the afternoon.',
};

const SRC_TWO_COOL_PRAYERS = {
  kind: 'hadith',
  ref: 'Sahih al-Bukhari 574',
  translation: 'Narrated Abu Bakr ibn Abi Musa, from his father (RA): Allah’s Messenger ﷺ said, "Whoever prays the two cool prayers (ʿAṣr and Fajr) will enter Paradise."',
  relevance: 'direct',
  provenanceTier: 'Bayyinah',
  hadithGrade: 'Sahih',
  rationale: 'Pairs ʿAṣr with Fajr under one promise — the reward side of the same window the previous narration warns about.',
};

const SRC_MIDDLE_PRAYER = {
  kind: 'quran',
  ref: 'Quran 2:238',
  arabic: 'حَافِظُوا عَلَى الصَّلَوَاتِ وَالصَّلَاةِ الْوُسْطَىٰ وَقُومُوا لِلَّهِ قَانِتِينَ',
  translation: 'Guard strictly the prayers, and [especially] the middle prayer, and stand before Allah devoutly obedient.',
  relevance: 'direct',
  provenanceTier: 'Bayyinah',
  rationale: 'Quranic singling out of the "middle prayer" — identified in the majority opinion as ʿAṣr — giving it heightened weight among the five.',
};

const SRC_MAGHRIB_WINDOW = {
  kind: 'hadith',
  ref: 'Sahih al-Bukhari 559',
  translation: 'Narrated Rafiʿ ibn Khadij (RA): We used to offer the Maghrib prayer with the Prophet ﷺ, and after finishing the prayer one of us could go away and still see as far as the spot where his arrow would fall when shot from a bow.',
  relevance: 'direct',
  provenanceTier: 'Bayyinah',
  hadithGrade: 'Sahih',
  rationale: 'Fixes Maghrib as the prayer prayed while daylight still remains — the textual basis for treating its window as the shortest of the five.',
};

const SRC_NO_SLEEP_BEFORE_ISHA = {
  kind: 'hadith',
  ref: 'Sahih al-Bukhari 568',
  translation: 'Narrated Abu Barza (RA): Allah’s Messenger ﷺ disliked sleeping before the ʿIshāʾ prayer, and talking after it.',
  relevance: 'direct',
  provenanceTier: 'Bayyinah',
  hadithGrade: 'Sahih',
  rationale: 'The one prayer the Prophet ﷺ guarded on both sides — no sleep before it, no idle talk after it.',
};

const SRC_DO_NOT_ABANDON_NIGHT = {
  kind: 'hadith',
  ref: 'Sahih al-Bukhari 1152',
  translation: 'Narrated Abdullah ibn Amr ibn al-ʿĀṣ (RA): Allah’s Messenger ﷺ said to me, "O Abdullah! Do not be like so-and-so, who used to pray at night and then stopped the night prayer."',
  relevance: 'direct',
  provenanceTier: 'Bayyinah',
  hadithGrade: 'Sahih',
  rationale: 'Names abandoning an established night prayer as the failure to avoid — the reason Tahajjud closes with a commitment, not just a duʿāʾ.',
};

const SRC_ISTIGHFAR_AFTER_SALAM = {
  kind: 'hadith',
  ref: 'Sahih Muslim 591',
  arabic: 'كَانَ رَسُولُ اللَّهِ ﷺ إِذَا انْصَرَفَ مِنْ صَلاَتِهِ اسْتَغْفَرَ ثَلاَثًا وَقَالَ "اللَّهُمَّ أَنْتَ السَّلاَمُ وَمِنْكَ السَّلاَمُ، تَبَارَكْتَ يَا ذَا الْجَلاَلِ وَالإِكْرَامِ".',
  translation: 'Thawban (RA) reported: When the Messenger of Allah ﷺ finished his prayer, he begged forgiveness three times and said, "O Allah, You are Peace, and peace comes from You; blessed are You, O Possessor of Glory and Honour."',
  relevance: 'direct',
  provenanceTier: 'Bayyinah',
  hadithGrade: 'Sahih',
  rationale: 'Gives the exact prophetic sequence that opens the post-prayer dhikr block after every salah.',
};

const SRC_TASBIH_33 = {
  kind: 'hadith',
  ref: 'Sahih Muslim 597',
  translation: 'Abu Hurayra (RA) reported: The Messenger of Allah ﷺ said, "Whoever glorifies Allah after every prayer thirty-three times, praises Allah thirty-three times, and exalts Allah thirty-three times — that is ninety-nine — and says to complete the hundred: ‘La ilaha illa Allah, wahdahu la sharika lah, lahul-mulku wa lahul-hamd, wa huwa ʿala kulli shayʾin qadir’ — his sins will be forgiven even if they were like the foam of the sea."',
  relevance: 'direct',
  provenanceTier: 'Bayyinah',
  hadithGrade: 'Sahih',
  rationale: 'Gives the counts and the completing-hundred duʿāʾ of the post-prayer tasbih together with its reward.',
};

const SRC_AYAT_AL_KURSI_AFTER_FARD = {
  kind: 'hadith',
  ref: "Sunan al-Nasa'i al-Kubra 9848",
  translation: 'The Prophet ﷺ said: "Whoever recites Ayat al-Kursi after every obligatory prayer, nothing prevents him from entering Paradise except death."',
  relevance: 'direct',
  provenanceTier: 'Bayyinah',
  hadithGrade: 'Sahih (al-Albani)',
  rationale: 'Attaches the Paradise-promise specifically to post-fard recitation of Ayat al-Kursi.',
};

const SRC_AYAT_AL_KURSI = {
  kind: 'quran',
  ref: 'Quran 2:255',
  arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ',
  translation: 'Allah — there is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth.',
  relevance: 'direct',
  provenanceTier: 'Bayyinah',
  rationale: 'Ayat al-Kursi itself — the verse named in the narration above as the post-prayer recitation.',
};

const SRC_REFUGE_FOUR = {
  kind: 'hadith',
  ref: 'Sahih Muslim 588',
  arabic: 'عَنْ أَبِي هُرَيْرَةَ أَنَّ رَسُولَ اللَّهِ ﷺ كَانَ يَقُولُ "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، وَمِنْ عَذَابِ النَّارِ، وَمِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ، وَمِنْ فِتْنَةِ الْمَسِيحِ الدَّجَّالِ".',
  translation: 'Abu Hurayra (RA) reported: The Messenger of Allah ﷺ used to say, "O Allah, I seek refuge in You from the punishment of the grave, and from the punishment of the Fire, and from the trial of life and death, and from the trial of the false messiah (al-Masih ad-Dajjal)."',
  relevance: 'direct',
  provenanceTier: 'Bayyinah',
  hadithGrade: 'Sahih',
  rationale: 'Direct prophetic formula for refuge from the four matters — the operative text for sealing a prayer with an eschatological plea.',
};

const SRC_TENFOLD_TAHLIL = {
  kind: 'hadith',
  ref: 'Jami at-Tirmidhi 3474',
  arabic: 'عَنْ أَبِي ذَرٍّ قَالَ قَالَ رَسُولُ اللَّهِ ﷺ "مَنْ قَالَ فِي دُبُرِ صَلَاةِ الْفَجْرِ وَهُوَ ثَانٍ رِجْلَيْهِ قَبْلَ أَنْ يَتَكَلَّمَ: لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، يُحْيِي وَيُمِيتُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، عَشْرَ مَرَّاتٍ، كُتِبَ لَهُ عَشْرُ حَسَنَاتٍ، وَمُحِيَتْ عَنْهُ عَشْرُ سَيِّئَاتٍ، وَرُفِعَ لَهُ عَشْرُ دَرَجَاتٍ، وَكَانَ يَوْمَهُ ذَلِكَ فِي حِرْزٍ مِنْ كُلِّ مَكْرُوهٍ، وَحُرِسَ مِنَ الشَّيْطَانِ".',
  translation: 'Abu Dharr (RA) reported: The Messenger of Allah ﷺ said, "Whoever says after the Fajr prayer, while still seated with his legs folded, before speaking: ‘La ilaha illa Allah wahdahu la sharika lah, lahul-mulku wa lahul-hamd, yuhyi wa yumit, wa huwa ʿala kulli shayʾin qadir’ ten times — ten good deeds will be written for him, ten bad deeds erased, ten degrees raised for him, and he will be in a fortress against every disliked thing on that day, and guarded from Shaytan."',
  relevance: 'direct',
  provenanceTier: 'Bayyinah',
  hadithGrade: 'Hasan',
  rationale: 'The tenfold tahlil said before speaking, at the seated moment after the prayer — narrated for Fajr, and carried by parallel narration to Maghrib as the day’s other hinge.',
};

const SRC_LIGHT_DUA = {
  kind: 'hadith',
  ref: 'Sahih Muslim 763',
  arabic: 'عَنِ ابْنِ عَبَّاسٍ قَالَ كَانَ النَّبِيُّ ﷺ إِذَا قَامَ يُصَلِّي مِنْ جَوْفِ اللَّيْلِ يَقُولُ "اللَّهُمَّ اجْعَلْ فِي قَلْبِي نُورًا، وَفِي لِسَانِي نُورًا، وَاجْعَلْ فِي سَمْعِي نُورًا، وَاجْعَلْ فِي بَصَرِي نُورًا، وَاجْعَلْ مِنْ خَلْفِي نُورًا، وَمِنْ أَمَامِي نُورًا، وَاجْعَلْ مِنْ فَوْقِي نُورًا، وَمِنْ تَحْتِي نُورًا. اللَّهُمَّ أَعْطِنِي نُورًا".',
  translation: 'Ibn Abbas (RA) reported: When the Prophet ﷺ rose to pray in the depth of the night, he would say, "O Allah, place light in my heart, light in my tongue, light in my hearing, light in my sight, light behind me, light before me, light above me, and light below me. O Allah, grant me light."',
  relevance: 'direct',
  provenanceTier: 'Bayyinah',
  hadithGrade: 'Sahih',
  rationale: 'Direct prophetic duʿāʾ for light on every bodily and directional axis — the text of the Light Duʿāʾ.',
};

const SRC_ANGELS_AT_FAJR = {
  kind: 'hadith',
  ref: 'Sahih al-Bukhari 648',
  translation: 'Narrated Abu Huraira (RA): I heard Allah’s Messenger ﷺ saying, "The reward of a prayer in congregation is twenty-five times greater than that of a prayer offered alone. The angels of the night and the angels of the day gather at the time of the Fajr prayer."',
  relevance: 'direct',
  provenanceTier: 'Bayyinah',
  hadithGrade: 'Sahih',
  rationale: 'Names Fajr as the hour when both shifts of angels are present — the reason the dawn congregation is weighted above the others.',
};

// The post-prayer adhkar are one prophetic block, but where that block lands in
// the day differs per prayer. Generate it once and let each prayer supply its
// own framing, rather than shipping five boards one identical task.
function postPrayerAdhkarTask(prayerId, { title, description, seatHow, kursiHow }) {
  return {
    title,
    priority: 'high',
    tags: ['salah', 'sunnah', 'prayer-phase:after', `prayer:${prayerId}`],
    description,
    subtasks: [
      {
        title: 'Say Astaghfirullah three times immediately after the salam',
        done: false,
        tier: 'T1',
        amanahRationale: 'Sahih Muslim 591 — the Prophet ﷺ never ended a salah without this sequence.',
        why: 'Even the Prophet ﷺ sought forgiveness after every prayer, acknowledging that no salah is free of shortcoming. The duʿāʾ that follows names Allah as the source of peace and sets the posture for the rest of the block.',
        how: seatHow,
        sources: [SRC_ISTIGHFAR_AFTER_SALAM],
      },
      {
        title: 'Recite the tasbih of 33/33/34 before you stand',
        done: false,
        tier: 'T2',
        amanahRationale: 'Sahih Muslim 597 preserves both the counts and the foam-of-the-sea promise tied to this post-prayer dhikr.',
        why: 'Two minutes of counted dhikr after a fard carries a promise of forgiveness like the foam of the sea. It is the prophetic bridge between the salam and whatever the day asks next.',
        how: 'Stay seated. Count on the knuckles of the right hand: SubhanAllah ×33, Alhamdulillah ×33, Allahu Akbar ×33, then complete the hundredth with "La ilaha illallah wahdahu la sharika lah, lahul-mulku wa lahul-hamd, wa huwa ʿala kulli shayʾin qadir."',
        sources: [SRC_TASBIH_33],
      },
      {
        title: 'Recite Ayat al-Kursi after the fard',
        done: false,
        tier: 'T2',
        amanahRationale: "Sunan al-Nasa'i al-Kubra 9848 (authenticated by al-Albani): whoever recites it after every fard, only death separates him from Paradise.",
        why: 'One verse, one minute, and the door to Paradise opens. No other single sunnah after the salam carries so direct a promise.',
        how: kursiHow,
        sources: [SRC_AYAT_AL_KURSI_AFTER_FARD, SRC_AYAT_AL_KURSI],
      },
    ],
  };
}

// Hand-authored per-prayer Before/After tasks, keyed by board id. These replace
// the three generic Salah tasks that used to be copied onto every prayer.
const PRAYER_PHASE_TASKS = {
  prayer_fajr_before: [
    {
      title: 'Answer the Fajr adhan and come to it out of sleep',
      priority: 'high',
      tags: ['salah', 'sunnah', 'prayer-phase:before', 'prayer:fajr'],
      description: 'Fajr is the only adhan that calls you out of sleep, and the only one whose call carries an extra line for the sleeper. Answering it — with the tongue, with the siwak, and with your feet — is what turns waking into arrival.',
      subtasks: [
        {
          title: 'Repeat the Fajr adhan, including the line that belongs to it alone',
          done: false,
          tier: 'T2',
          amanahRationale: 'Sahih al-Bukhari 611 commands repeating what the mu’adhdhin says; Sahih al-Bukhari 614 gives the duʿāʾ that follows and the intercession promised for it.',
          why: 'The Fajr adhan is the only one addressed to someone still asleep. Repeating it aloud is how you answer the call rather than merely hear it, and the Prophet ﷺ tied the duʿāʾ that follows to his own intercession.',
          how: 'Repeat each phrase after the mu’adhdhin, including "as-salatu khayrun min an-nawm" — prayer is better than sleep — which is said in the Fajr adhan and no other. At "Hayya ʿala as-salah" and "Hayya ʿala al-falah" say "La hawla wa la quwwata illa billah." Then send salawat and make the post-adhan duʿāʾ.',
          sources: [SRC_ADHAN_REPEAT, SRC_ADHAN_DUA],
        },
        {
          title: 'Take the siwak the moment you rise, before wudu',
          done: false,
          tier: 'T1',
          amanahRationale: 'Sahih al-Bukhari 245 names siwak on rising from the night as the Prophet’s ﷺ own habit.',
          why: 'Fajr is the prayer you come to straight from sleep. The Prophet ﷺ cleaned his mouth with the siwak whenever he rose in the night — the mouth that will recite aloud at dawn is purified first.',
          how: 'Keep a siwak within reach of where you sleep, not in the bathroom cupboard. Use it the moment you sit up, before rinsing the mouth in wudu, and again before the iqamah.',
          sources: [SRC_SIWAK_NIGHT, SRC_SIWAK_EVERY_PRAYER],
        },
        {
          title: 'Come to Fajr in congregation even if you must crawl',
          done: false,
          tier: 'T2',
          amanahRationale: 'Sahih al-Bukhari 615 names ʿIshāʾ and Fajr as the two congregations worth crawling to; Sahih al-Bukhari 648 explains why — both shifts of angels are present.',
          why: 'Of the five, only ʿIshāʾ and Fajr are described as worth crawling to. Fajr is the hour when the angels of the night and the angels of the day are both present, and the congregation is witnessed by both.',
          how: 'Decide the night before: where you will pray Fajr, and what time you must leave. If the masjid is genuinely out of reach, pray it in congregation at home with whoever is awake rather than alone.',
          sources: [SRC_CRAWL_TO_ISHA_FAJR, SRC_ANGELS_AT_FAJR],
        },
      ],
    },
  ],

  prayer_fajr_after: [
    postPrayerAdhkarTask('fajr', {
      title: 'Complete the Fajr adhkar without leaving your place',
      description: 'The Fajr salam is not a signal to stand. The prophetic block — istighfar, the tasbih, Ayat al-Kursi — is said seated, and at Fajr it opens straight into the morning adhkar and the sitting until sunrise.',
      seatHow: 'Before rising, before speaking, before reaching for the phone: say "Astaghfirullah" three times, then "Allahumma anta as-salam, wa minka as-salam, tabarakta ya dhal-jalali wal-ikram." Stay in your seat — at Fajr the whole morning block follows from here.',
      kursiHow: 'After the tasbih, recite Ayat al-Kursi slowly. At Fajr, follow it with al-Ikhlas, al-Falaq and an-Nas before moving into the morning adhkar.',
    }),
    {
      title: 'Seal Fajr with the tenfold tahlil before you speak',
      priority: 'medium',
      tags: ['salah', 'sunnah', 'dua', 'prayer-phase:after', 'prayer:fajr'],
      description: 'One duʿāʾ, ten times, said in the seat you prayed in and before a word is spoken to anyone — and the day is placed in a fortress.',
      subtasks: [
        {
          title: 'Say the tenfold tahlil while still seated, legs folded, before speaking',
          done: false,
          tier: 'T2',
          amanahRationale: 'Jami at-Tirmidhi 3474 (hasan) narrates this specifically for the seated moment after Fajr, before speech.',
          why: 'The conditions are as specific as the reward: still seated, legs folded, before a word is said. Ten repetitions buy ten good deeds, ten sins erased, ten degrees raised, and a day guarded from Shaytan.',
          how: 'Do not stand or speak after the salam. Counting on your fingers, say ten times: "La ilaha illa Allah wahdahu la sharika lah, lahul-mulku wa lahul-hamd, yuhyi wa yumit, wa huwa ʿala kulli shayʾin qadir."',
          sources: [SRC_TENFOLD_TAHLIL],
        },
      ],
    },
  ],

  prayer_dhuhr_before: [
    {
      title: 'Answer the Dhuhr adhan and renew wudu in the middle of the workday',
      priority: 'high',
      tags: ['salah', 'sunnah', 'prayer-phase:before', 'prayer:dhuhr'],
      description: 'Dhuhr is the prayer the working day argues with. Answering its adhan, renewing wudu properly rather than splashing, and marking your space are what keep it a prayer rather than an interruption you rushed.',
      subtasks: [
        {
          title: 'Repeat the Dhuhr adhan and make the post-adhan duʿāʾ',
          done: false,
          tier: 'T2',
          amanahRationale: 'Sahih al-Bukhari 611 and 614 — repeat after the mu’adhdhin, then ask for al-wasilah.',
          why: 'Dhuhr arrives mid-task, and the adhan is the one thing that will not wait for you to finish. Answering it out loud is how the transition begins in the tongue before it begins in the feet.',
          how: 'Stop what you are doing and repeat each phrase after the mu’adhdhin — at the two "Hayya" calls say "La hawla wa la quwwata illa billah." Then send salawat and make the post-adhan duʿāʾ. The Prophet ﷺ said those who knew the reward of Zuhr at its first moments would race for it.',
          sources: [SRC_ADHAN_REPEAT, SRC_ADHAN_DUA, SRC_CRAWL_TO_ISHA_FAJR],
        },
        {
          title: 'Renew wudu thoroughly — wet every part, especially the heels',
          done: false,
          tier: 'T1',
          amanahRationale: 'Quran 5:6 commands the limbs of wudu; Sahih al-Bukhari 165 names the heels as the neglected part.',
          why: 'Midday wudu is the one most often rushed — done between meetings, at a sink with a queue behind it. A defective wudu invalidates the prayer, and the Prophet ﷺ singled out precisely the part a hurried person misses.',
          how: 'Do not compress it. Wash hands, rinse mouth and nose, wash the face, both arms to the elbows, wipe head and ears, then both feet to the ankles — water between the toes and fully around each heel.',
          sources: [SRC_WUDU_AYAH, SRC_WUDU_HEELS],
        },
        {
          title: 'Use a sutrah when you pray Dhuhr away from a masjid',
          done: false,
          tier: 'T2',
          amanahRationale: 'Sahih al-Bukhari 494 — the Prophet ﷺ had a barrier planted in front of him in open ground and on journeys.',
          why: 'Dhuhr is the prayer most often prayed in a room that belongs to someone else — an office, a corridor, a corner of a shop. A sutrah marks the space as a musalla, and the Prophet ﷺ warned severely against passing in front of a worshipper.',
          how: 'Before the takbir, put something roughly a forearm high directly in front of you — a bag, a chair, a wall — and stand close to it. If nothing is available, draw a line on the ground.',
          sources: [SRC_SUTRAH_PRACTICE, SRC_SUTRAH_WARNING],
        },
      ],
    },
  ],

  prayer_dhuhr_after: [
    postPrayerAdhkarTask('dhuhr', {
      title: 'Complete the Dhuhr adhkar before returning to work',
      description: 'The temptation at Dhuhr is to give the salam and stand straight back into the day. The prophetic block is short enough to fit and is what keeps the prayer from being swallowed by the task it interrupted.',
      seatHow: 'Do not stand at the salam. Say "Astaghfirullah" three times, then "Allahumma anta as-salam, wa minka as-salam, tabarakta ya dhal-jalali wal-ikram" — before you reach for the phone or the door.',
      kursiHow: 'After the tasbih, recite Ayat al-Kursi slowly enough that you hear the meaning, then pray the two rakʿat that follow Dhuhr before you return to work.',
    }),
  ],

  prayer_asr_before: [
    {
      title: 'Guard al-ṣalāt al-wusṭā — pray ʿAṣr before the sun yellows',
      priority: 'high',
      tags: ['salah', 'sunnah', 'prayer-phase:before', 'prayer:asr'],
      description: 'ʿAṣr is the prayer the Qur’an singles out and the prayer the Prophet ﷺ attached the sharpest warning to. It falls at the hour the afternoon is least willing to give up.',
      subtasks: [
        {
          title: 'Pray ʿAṣr while the sun is still strong-white',
          done: false,
          tier: 'T1',
          amanahRationale: 'Quran 2:238 commands guarding "the middle prayer"; Sahih al-Bukhari 552 attaches to ʿAṣr a warning given to no other prayer.',
          why: 'No other prayer is named in the Qur’an for special guarding, and no other carries the warning that missing it is like losing your family and your property. The afternoon is exactly when attention is weakest — which is why it is the one commanded by name.',
          how: 'Set the boundary before the window opens: know when ʿAṣr enters and what you will stop doing. Pray it while the sun is still strong-white, not once it has begun to yellow.',
          sources: [SRC_MIDDLE_PRAYER, SRC_MISSING_ASR],
        },
        {
          title: 'Hold ʿAṣr and Fajr together — the two cool prayers',
          done: false,
          tier: 'T2',
          amanahRationale: 'Sahih al-Bukhari 574 pairs ʿAṣr with Fajr under a single promise of Paradise.',
          why: 'The two prayers hardest to keep — one at the edge of sleep, one at the edge of the working afternoon — are paired under one promise. Keeping ʿAṣr is half of it.',
          how: 'Track them as a pair for a week: did Fajr and ʿAṣr both happen in their window? Fix whichever one is failing, not the schedule around it.',
          sources: [SRC_TWO_COOL_PRAYERS],
        },
      ],
    },
    {
      title: 'Answer the ʿAṣr adhan and take the siwak',
      priority: 'medium',
      tags: ['salah', 'sunnah', 'prayer-phase:before', 'prayer:asr'],
      description: 'ʿAṣr arrives when the day is already long. The adhan response and the siwak are the two smallest acts that re-enter you into worship from tiredness.',
      subtasks: [
        {
          title: 'Repeat the ʿAṣr adhan and make the post-adhan duʿāʾ',
          done: false,
          tier: 'T2',
          amanahRationale: 'Sahih al-Bukhari 611 and 614.',
          why: 'By ʿAṣr the adhan is easy to let pass as background sound. Repeating it is what makes it a call you answered rather than noise you heard.',
          how: 'Repeat each phrase after the mu’adhdhin, saying "La hawla wa la quwwata illa billah" at the two "Hayya" calls, then send salawat and make the post-adhan duʿāʾ.',
          sources: [SRC_ADHAN_REPEAT, SRC_ADHAN_DUA],
        },
        {
          title: 'Use the siwak before ʿAṣr',
          done: false,
          tier: 'T2',
          amanahRationale: 'Sahih al-Bukhari 887 — the Prophet ﷺ would have commanded siwak at every prayer had it not been a hardship.',
          why: 'The mouth by mid-afternoon carries the whole day in it. The siwak is the smallest possible act of preparation, and the Prophet ﷺ tied it to every prayer, not just the ones near sleep.',
          how: 'Keep a siwak where you make wudu at work. Use it before rinsing the mouth, and again before the iqamah.',
          sources: [SRC_SIWAK_EVERY_PRAYER],
        },
      ],
    },
  ],

  prayer_asr_after: [
    postPrayerAdhkarTask('asr', {
      title: 'Complete the ʿAṣr adhkar as the day turns',
      description: 'ʿAṣr is the hinge of the day. The prophetic block is said here as everywhere, and it opens into the window in which the evening adhkar are recited.',
      seatHow: 'Stay seated at the salam. Say "Astaghfirullah" three times, then "Allahumma anta as-salam, wa minka as-salam, tabarakta ya dhal-jalali wal-ikram." Nothing after ʿAṣr is so urgent that it cannot wait for this.',
      kursiHow: 'After the tasbih, recite Ayat al-Kursi. From here the window to Maghrib is the window of the evening adhkar — do not stand up into something else.',
    }),
    {
      title: 'Seek refuge from the grave and the Dajjal at the close of ʿAṣr',
      priority: 'medium',
      tags: ['salah', 'sunnah', 'dua', 'prayer-phase:after', 'prayer:asr'],
      description: 'The middle prayer is where the day tips toward its end. Sealing it with the refuge from the four matters roots the afternoon in what the day is actually moving toward.',
      subtasks: [
        {
          title: 'Recite the refuge from the four matters',
          done: false,
          tier: 'T2',
          amanahRationale: 'Sahih Muslim 588 preserves the Prophet’s ﷺ own wording; Quran 2:238 is why ʿAṣr in particular is the prayer to attach it to.',
          why: 'ʿAṣr is the prayer the Qur’an singles out and the one that turns the day toward evening. Sealing it with refuge from the grave, the Fire, the trial of life and death, and the Dajjal keeps the afternoon honest about where it is heading.',
          how: 'Before the final salam — or immediately after it, if that is how you learned it — recite "Allahumma inni aʿudhu bika min ʿadhabil-qabr, wa min ʿadhabin-nar, wa min fitnatil-mahya wal-mamat, wa min fitnatil-masihid-dajjal." Repeat it daily until it is memorised.',
          sources: [SRC_REFUGE_FOUR, SRC_MIDDLE_PRAYER],
        },
      ],
    },
  ],

  prayer_maghrib_before: [
    {
      title: 'Answer the Maghrib adhan at once — its window is the shortest',
      priority: 'high',
      tags: ['salah', 'sunnah', 'prayer-phase:before', 'prayer:maghrib'],
      description: 'Maghrib is the one prayer whose window closes while you are still deciding. The Companions finished it with enough daylight left to see an arrow fall — that is the pace it asks for.',
      subtasks: [
        {
          title: 'Move to Maghrib the moment the adhan begins',
          done: false,
          tier: 'T1',
          amanahRationale: 'Sahih al-Bukhari 559 — the Companions prayed Maghrib with the Prophet ﷺ while daylight still remained.',
          why: 'Every other prayer forgives a few minutes of hesitation. Maghrib does not: its window is the shortest of the five, and the sunnah is to have finished while light still remains, not to have started as the last of it goes.',
          how: 'Have wudu ready before the adhan, not after it. When it begins, stop and go — food, screens and conversation all resume afterwards.',
          sources: [SRC_MAGHRIB_WINDOW],
        },
        {
          title: 'Repeat the Maghrib adhan and make the post-adhan duʿāʾ',
          done: false,
          tier: 'T2',
          amanahRationale: 'Sahih al-Bukhari 611 and 614.',
          why: 'Answering the adhan takes the length of the adhan itself, and it is the act that carries the Prophet’s ﷺ intercession. Even at the shortest window there is room for it.',
          how: 'Repeat each phrase after the mu’adhdhin while you move — saying "La hawla wa la quwwata illa billah" at the two "Hayya" calls — then send salawat and make the post-adhan duʿāʾ.',
          sources: [SRC_ADHAN_REPEAT, SRC_ADHAN_DUA],
        },
      ],
    },
  ],

  prayer_maghrib_after: [
    postPrayerAdhkarTask('maghrib', {
      title: 'Complete the Maghrib adhkar as the day closes',
      description: 'Maghrib closes the day’s account. The prophetic block is said here and then the two rakʿat follow — preferably at home, which is where the Prophet ﷺ prayed them.',
      seatHow: 'Stay in your place at the salam. Say "Astaghfirullah" three times, then "Allahumma anta as-salam, wa minka as-salam, tabarakta ya dhal-jalali wal-ikram," before the evening resumes.',
      kursiHow: 'After the tasbih, recite Ayat al-Kursi, then al-Ikhlas, al-Falaq and an-Nas — the evening pairing for the hinge of the day.',
    }),
    {
      title: 'Recite the tenfold tahlil after Maghrib',
      priority: 'medium',
      tags: ['salah', 'sunnah', 'dua', 'prayer-phase:after', 'prayer:maghrib'],
      description: 'The same duʿāʾ that guards the day after Fajr guards the night after Maghrib — said ten times, in the seat you prayed in.',
      subtasks: [
        {
          title: 'Say the tenfold tahlil before leaving the musalla',
          done: false,
          tier: 'T2',
          amanahRationale: 'Jami at-Tirmidhi 3474 (hasan) narrates the tenfold tahlil for the seated moment after the prayer, before speech; the repo pairs it with Maghrib as the day’s other hinge alongside Fajr.',
          why: 'Fajr and Maghrib are where day and night meet. This one duʿāʾ, repeated ten times, is narrated with ten good deeds, ten sins erased, ten degrees raised, and protection from Shaytan for the hours that follow.',
          how: 'Before standing, count on your fingers and say ten times: "La ilaha illa Allah wahdahu la sharika lah, lahul-mulku wa lahul-hamd, yuhyi wa yumit, wa huwa ʿala kulli shayʾin qadir."',
          sources: [SRC_TENFOLD_TAHLIL],
        },
      ],
    },
  ],

  prayer_isha_before: [
    {
      title: 'Do not sleep before ʿIshāʾ — enter the night awake',
      priority: 'high',
      tags: ['salah', 'sunnah', 'prayer-phase:before', 'prayer:isha'],
      description: 'ʿIshāʾ is the only prayer the Prophet ﷺ guarded on both sides: no sleeping before it, no idle talk after it. Most missed ʿIshāʾ prayers are lost to a nap, not to a decision.',
      subtasks: [
        {
          title: 'Refuse the pre-ʿIshāʾ nap',
          done: false,
          tier: 'T1',
          amanahRationale: 'Sahih al-Bukhari 568 — the Prophet ﷺ disliked sleeping before ʿIshāʾ and talking after it.',
          why: 'The evening nap is the single most common way ʿIshāʾ is lost, and the dislike is narrated explicitly. Guarding the hour before the prayer is what guards the prayer.',
          how: 'If you are tired between Maghrib and ʿIshāʾ, stay upright: walk, read, or pray the rawatib. Take qaylulah at midday instead, where the sunnah puts it.',
          sources: [SRC_NO_SLEEP_BEFORE_ISHA],
        },
        {
          title: 'Come to ʿIshāʾ in congregation even if you must crawl',
          done: false,
          tier: 'T2',
          amanahRationale: 'Sahih al-Bukhari 615 names ʿIshāʾ and Fajr as the two congregations worth crawling to.',
          why: 'ʿIshāʾ shares with Fajr the description of a congregation worth crawling to. Both are the ones tiredness argues against, which is exactly why they are named.',
          how: 'Fix the time you leave rather than the time you intend to go. If the masjid is out of reach, gather whoever is at home and pray it in congregation there.',
          sources: [SRC_CRAWL_TO_ISHA_FAJR],
        },
      ],
    },
    {
      title: 'Answer the ʿIshāʾ adhan and prepare with siwak and wudu',
      priority: 'medium',
      tags: ['salah', 'sunnah', 'prayer-phase:before', 'prayer:isha'],
      description: 'The last fard of the day is the one most often prayed carelessly. The preparation is the same as every prayer; the reason to insist on it is tiredness.',
      subtasks: [
        {
          title: 'Repeat the ʿIshāʾ adhan and make the post-adhan duʿāʾ',
          done: false,
          tier: 'T2',
          amanahRationale: 'Sahih al-Bukhari 611 and 614.',
          why: 'Answering the adhan is the cheapest sunnah of the night and carries the Prophet’s ﷺ intercession. Fatigue is not a reason to skip a sunnah measured in seconds.',
          how: 'Repeat each phrase after the mu’adhdhin, saying "La hawla wa la quwwata illa billah" at the two "Hayya" calls, then send salawat and make the post-adhan duʿāʾ.',
          sources: [SRC_ADHAN_REPEAT, SRC_ADHAN_DUA],
        },
        {
          title: 'Take the siwak and renew wudu for the last fard of the day',
          done: false,
          tier: 'T2',
          amanahRationale: 'Sahih al-Bukhari 887 ties siwak to every prayer; Quran 5:6 and Sahih al-Bukhari 165 govern the wudu itself.',
          why: 'The wudu most likely to be skimped is the last one of the day. The heels are the part the tired person misses, and the Prophet ﷺ named them by warning.',
          how: 'Use the siwak, then make wudu without compressing it — face, arms to the elbows, head and ears, then both feet to the ankles with water fully around each heel.',
          sources: [SRC_SIWAK_EVERY_PRAYER, SRC_WUDU_AYAH, SRC_WUDU_HEELS],
        },
      ],
    },
  ],

  prayer_isha_after: [
    postPrayerAdhkarTask('isha', {
      title: 'Complete the ʿIshāʾ adhkar and keep the silence after it',
      description: 'The Prophet ﷺ disliked idle talk after ʿIshāʾ. The prophetic block is the last thing said in the musalla, and what follows it is the night’s own sunan, not conversation.',
      seatHow: 'Stay seated at the salam. Say "Astaghfirullah" three times, then "Allahumma anta as-salam, wa minka as-salam, tabarakta ya dhal-jalali wal-ikram" — and let the talking end there.',
      kursiHow: 'After the tasbih, recite Ayat al-Kursi. Then move to the two rakʿat that follow ʿIshāʾ and to witr, without opening a conversation in between.',
    }),
    {
      title: "Recite the Prophetic Light Du'a after Witr",
      priority: 'medium',
      tags: ['salah', 'sunnah', 'dua', 'prayer-phase:after', 'prayer:isha'],
      description: 'The duʿāʾ the Prophet ﷺ made when he rose in the depth of the night asks for light on every axis of the body. Said after witr, it frames the whole night in Nur.',
      subtasks: [
        {
          title: 'Learn the Light Duʿāʾ one direction at a time',
          done: false,
          tier: 'T3',
          amanahRationale: 'Sahih Muslim 763 narrates Ibn Abbas’s account of the Prophet’s ﷺ night-prayer duʿāʾ enumerating light in every direction.',
          why: 'It is a prophetic cosmology of illumination — heart, tongue, hearing, sight, and every direction around the body placed under Allah’s light before sleep.',
          how: 'Memorise it over a week, one direction per day. After witr — or in the final sujud of tahajjud — recite it slowly, holding each source of light in mind.',
          sources: [SRC_LIGHT_DUA],
        },
      ],
    },
  ],

  prayer_tahajjud_after: [
    {
      title: 'Do not abandon the night prayer once you have begun it',
      priority: 'medium',
      tags: ['salah', 'sunnah', 'prayer-phase:after', 'prayer:tahajjud'],
      description: 'The failure the Prophet ﷺ warned Abdullah ibn Amr about was not praying too little at night. It was starting and then stopping.',
      subtasks: [
        {
          title: 'Set the smallest night prayer you can keep every night',
          done: false,
          tier: 'T2',
          amanahRationale: 'Sahih al-Bukhari 1152 — "Do not be like so-and-so, who used to pray at night and then stopped."',
          why: 'The named failure is abandonment, not brevity. A short qiyam kept nightly is closer to the sunnah than a long one kept for a week and then dropped.',
          how: 'Before you sleep again, fix the floor: two rakʿat you will pray every night regardless of how the day went. Lengthen from there only once the floor has held for a month.',
          sources: [SRC_DO_NOT_ABANDON_NIGHT],
        },
      ],
    },
  ],
};

// --- Derived Before/After content from PRAYER_GUIDE ----------------------
// getPrayerPhaseSunnah() above already answers "what is the sunnah around this
// prayer, in this phase" — rawatib rows with their sources, a grounded note for
// the four windows that have no rawatib, and Tahajjud's approach notes. It was
// written for exactly this and had no consumer. buildRawatibTasks() reshapes
// its answer into board tasks. No new fiqh is authored here: `note`, `why`,
// `how` and `sources` pass through verbatim.

// A row's own label ("Sunnah before · 4 rakʿahs") is fine on a During board,
// where the prayer is the page context. On a Before/After board the title has
// to name the prayer, because the cross-board uniqueness guard — and the reader
// — need to tell Dhuhr's four from ʿIshāʾ's four.
const RAWATIB_TITLE = {
  'fajr:before:Sunnah before': 'Pray the two rakʿah sunnah before Fajr',
  'dhuhr:before:Sunnah before': 'Pray the four rakʿah sunnah before Dhuhr',
  'dhuhr:after:Sunnah after': 'Pray the two rakʿah sunnah after Dhuhr',
  'asr:before:Sunnah before': 'Pray the four rakʿah sunnah before ʿAṣr',
  'maghrib:after:Sunnah after': 'Pray the two rakʿah sunnah after Maghrib',
  'isha:before:Sunnah before': 'Pray the four rakʿah sunnah before ʿIshāʾ',
  'isha:after:Sunnah after': 'Pray the two rakʿah sunnah after ʿIshāʾ',
  'isha:after:Witr': 'Seal the night with Witr',
  'tahajjud:before:Qiyām': 'Pray Qiyām al-Layl in pairs of two',
};

// A window's grounded note (no rawatib, or Tahajjud's approach) becomes a
// subtask-less reminder — the same shape PRAYER_GUIDE[id].keys already emits on
// the During boards, and exempt from the grounding lint for the same reason:
// it is a one-line reminder, not a practice with steps.
function sunnahReminderTask(prayerId, phase, title) {
  return {
    title,
    priority: 'medium',
    tags: ['salah', 'sunnah', `prayer-phase:${phase}`, `prayer:${prayerId}`, 'reminder'],
  };
}

function buildRawatibTasks(prayerId, phase) {
  const sunnah = getPrayerPhaseSunnah(prayerId, phase);
  if (!sunnah) return [];

  const tasks = [];

  // Tahajjud's Before window leads with when to rise and how to enter, then
  // shows the Qiyām row as what one rises toward — same order the selector
  // returns it in.
  for (const note of sunnah.leadNotes) {
    tasks.push(sunnahReminderTask(prayerId, phase, note));
  }

  for (const row of sunnah.rows) {
    const subtask = { title: row.note, done: false };
    if (row.tier) subtask.tier = row.tier;
    if (row.why) subtask.why = row.why;
    if (row.how) subtask.how = row.how;
    if (row.sources.length > 0) subtask.sources = row.sources;
    tasks.push({
      title:
        RAWATIB_TITLE[`${prayerId}:${phase}:${row.kind}`] ||
        `${row.kind} · ${row.count}`,
      priority: 'high',
      tags: ['salah', 'sunnah', `prayer-phase:${phase}`, `prayer:${prayerId}`],
      subtasks: [subtask],
    });
  }

  if (sunnah.fallbackNote) {
    tasks.push(sunnahReminderTask(prayerId, phase, sunnah.fallbackNote));
  }

  return tasks;
}

function buildPrayerSeedTasks() {
  const out = {};
  for (const pillar of PRAYER_PILLARS) {
    for (const phase of PRAYER_PHASE_KEYS) {
      out[`prayer_${pillar.id}_${phase}`] = [];
    }
  }

  for (const sourceBoardId of SALAH_SOURCES) {
    const tasks = FAITH_SEED_TASKS[sourceBoardId] || [];
    for (const task of tasks) {
      const targets = classifyTask(task);
      for (const boardId of targets) {
        // Slim copy — seed shape (id/columnId are added by store at seed-time).
        out[boardId].push({ ...task });
      }
    }
  }

  // Populate during boards from PRAYER_GUIDE.
  for (const pillar of PRAYER_PILLARS) {
    const guide = PRAYER_GUIDE[pillar.id];
    if (!guide) continue;
    const boardId = `prayer_${pillar.id}_during`;
    const baseTags = ['salah', 'prayer-phase:during', `prayer:${pillar.id}`];
    for (const row of guide.structure) {
      const subtask = { title: row.note, done: false };
      if (row.tier) subtask.tier = row.tier;
      if (row.amanahRationale) subtask.amanahRationale = row.amanahRationale;
      if (row.why) subtask.why = row.why;
      if (row.how) subtask.how = row.how;
      if (row.sources) subtask.sources = row.sources;
      out[boardId].push({
        title: `${row.kind} · ${row.count} rakʿah${row.count === 1 ? '' : 's'}`,
        priority: 'high',
        tags: [...baseTags],
        subtasks: [subtask],
      });
    }
    for (const key of guide.keys) {
      out[boardId].push({
        title: key,
        priority: 'medium',
        tags: [...baseTags, 'reminder'],
      });
    }
  }

  // Populate the twelve before/after boards with content that belongs to that
  // prayer and no other: first the rawatib derived from PRAYER_GUIDE, then the
  // hand-authored tasks. This is what replaced the fan-out in classifyTask().
  for (const pillar of PRAYER_PILLARS) {
    for (const phase of ['before', 'after']) {
      const boardId = `prayer_${pillar.id}_${phase}`;
      if (!out[boardId]) continue;
      out[boardId].push(...buildRawatibTasks(pillar.id, phase));
      for (const task of PRAYER_PHASE_TASKS[boardId] || []) {
        out[boardId].push({ ...task });
      }
    }
  }

  // Curate LAST, once every board is fully populated — this is what replaces
  // the inherited source-board `seq` and gives the six `during` boards (which
  // never had one) an explicit permutation instead of an array-order fallback.
  for (const boardId of Object.keys(out)) {
    out[boardId] = curateBoardOrder(boardId, out[boardId]);
  }

  return out;
}

export const PRAYER_SEED_TASKS = buildPrayerSeedTasks();

// Diagnostic helper — exposed for one-off console checks.
export function prayerSeedSummary() {
  const rows = Object.entries(PRAYER_SEED_TASKS)
    .map(([k, v]) => [k, v.length])
    .sort((a, b) => b[1] - a[1]);
  return rows;
}
