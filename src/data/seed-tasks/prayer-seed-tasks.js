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

const FIVE_DAILY = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
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
            rationale: "The canonical anchor for any optional pre-fard nafl. Establishes that praying between the adhan and iqama for any salah — including Isha — is a meritorious sunnah open to whoever wishes; grounds the optional 4 rakʿat before Isha as a non-muʾakkadah but prophetically encouraged practice. NotebookLM Muslim Scholar canonical-text retrieval; modern sunnah.com numbering Bukhari 627 / Muslim 838 (Muslim Scholar PDF used an older edition listing the same narration under Bukhari 597/600 and Muslim 1822) — sunnah.com cross-reference verification recommended in scholar polish."
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

  // Generic sunan — duplicate across all five daily prayers.
  const phase = hasBefore ? 'before' : 'after';
  return FIVE_DAILY.map((p) => `prayer_${p}_${phase}`);
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
