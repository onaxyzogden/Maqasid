/**
 * AYAH_BANNER_DATA — contextual Quran ayah / Hadith for every module & submodule page.
 *
 * Key convention:
 *   PillarLevelPage  → `${boardPrefix}_${pillarKey}`   e.g. "faith_salah", "life_physical"
 *   LevelOverviewPage → `${boardPrefix}_${level}`      e.g. "life_core", "environment_excellence"
 *   PillarBoard      → `${modulePrefix}_${pillarKey}`  e.g. "wealth_earning"
 *   Ummah pages      → injected directly as "ummah_*"
 *
 * Quran text: ar-simple-clean (quran.ai)  |  Translation: Abdel-Haleem (quran.ai)
 * Hadith Arabic texts are from known canonical sources; see individual source citations.
 *
 * Grounded with quran.ai: fetch_quran & fetch_translation (ar-simple-clean, en-abdel-haleem)
 * for all Quran references listed below.
 */

// ─── Module accent colours ──────────────────────────────────────────────────
const FAITH       = '#C8A96E';
const LIFE        = '#4ab8a8';
const INTELLECT   = '#3b82f6';
const FAMILY      = '#f472b6';
const WEALTH      = '#22c55e';
const ENVIRONMENT = '#84cc16';
const UMMAH       = '#8b5cf6';

// ─── Data ────────────────────────────────────────────────────────────────────
export const AYAH_BANNER_DATA = {

  // ── Faith: Five-Pillar dimension pages (PillarLevelPage) ──────────────────

  faith_shahada: {
    arabic: 'فَاعْلَمْ أَنَّهُ لَا إِلَٰهَ إِلَّا اللَّهُ وَاسْتَغْفِرْ لِذَنبِكَ وَلِلْمُؤْمِنِينَ وَالْمُؤْمِنَاتِ',
    translation: 'Know that there is no god but Allah, and ask forgiveness for your sins and for the sins of believing men and women.',
    source: 'Quran 47:19',
    color: FAITH,
  },

  faith_salah: {
    arabic: 'إِنَّ الصَّلَاةَ تَنْهَىٰ عَنِ الْفَحْشَاءِ وَالْمُنكَرِ ۗ وَلَذِكْرُ اللَّهِ أَكْبَرُ',
    translation: 'Prayer restrains outrageous and unacceptable behaviour. Remembering God is greater.',
    source: 'Quran 29:45',
    color: FAITH,
  },

  faith_zakah: {
    arabic: 'خُذْ مِنْ أَمْوَالِهِمْ صَدَقَةً تُطَهِّرُهُمْ وَتُزَكِّيهِم بِهَا',
    translation: 'Accept a charity from their wealth to cleanse and purify them.',
    source: 'Quran 9:103',
    color: FAITH,
  },

  faith_siyam: {
    arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ كَمَا كُتِبَ عَلَى الَّذِينَ مِن قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ',
    translation: 'You who believe, fasting is prescribed for you, as it was prescribed for those before you, so that you may be mindful of God.',
    source: 'Quran 2:183',
    color: FAITH,
  },

  faith_hajj: {
    arabic: 'وَلِلَّهِ عَلَى النَّاسِ حِجُّ الْبَيْتِ مَنِ اسْتَطَاعَ إِلَيْهِ سَبِيلًا',
    translation: 'Pilgrimage to the House is a duty owed to God by people who are able to undertake it.',
    source: 'Quran 3:97',
    color: FAITH,
  },

  // ── Life: dimension pages (PillarLevelPage) ──────────────────────────────

  life_physical: {
    // Hadith: Sahih al-Bukhari 5199 (hadith of Salman advising Abu al-Darda)
    arabic: 'إِنَّ لِجَسَدِكَ عَلَيْكَ حَقًّا',
    translation: 'Verily, your body has a right over you.',
    source: 'Sahih al-Bukhari 5199',
    color: LIFE,
  },

  life_mental: {
    arabic: 'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ',
    translation: 'Truly it is in the remembrance of God that hearts find peace.',
    source: 'Quran 13:28',
    color: LIFE,
  },

  life_safety: {
    arabic: 'مَن قَتَلَ نَفْسًا بِغَيْرِ نَفْسٍ أَوْ فَسَادٍ فِي الْأَرْضِ فَكَأَنَّمَا قَتَلَ النَّاسَ جَمِيعًا وَمَنْ أَحْيَاهَا فَكَأَنَّمَا أَحْيَا النَّاسَ جَمِيعًا',
    translation: 'If anyone kills a person, it is as if he kills all mankind, while if any saves a life it is as if he saves the lives of all mankind.',
    source: 'Quran 5:32',
    color: LIFE,
  },

  life_social: {
    arabic: 'إِنَّمَا الْمُؤْمِنُونَ إِخْوَةٌ فَأَصْلِحُوا بَيْنَ أَخَوَيْكُمْ',
    translation: 'The believers are brothers, so make peace between your two brothers and be mindful of God.',
    source: 'Quran 49:10',
    color: LIFE,
  },

  // ── Intellect: dimension pages (PillarLevelPage) ─────────────────────────

  intellect_learning: {
    arabic: 'اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ',
    translation: 'Read! In the name of your Lord who created.',
    source: 'Quran 96:1',
    color: INTELLECT,
  },

  intellect_thinking: {
    arabic: 'إِنَّ فِي خَلْقِ السَّمَاوَاتِ وَالْأَرْضِ وَاخْتِلَافِ اللَّيْلِ وَالنَّهَارِ لَآيَاتٍ لِّأُولِي الْأَلْبَابِ',
    translation: 'There truly are signs in the creation of the heavens and earth, and in the alternation of night and day, for those with understanding.',
    source: 'Quran 3:190',
    color: INTELLECT,
  },

  intellect_cognitive: {
    arabic: 'وَقُل رَّبِّ زِدْنِي عِلْمًا',
    translation: "Say, 'Lord, increase me in knowledge!'",
    source: 'Quran 20:114',
    color: INTELLECT,
  },

  intellect_professional: {
    arabic: 'إِنَّ خَيْرَ مَنِ اسْتَأْجَرْتَ الْقَوِيُّ الْأَمِينُ',
    translation: 'The best person you can hire is one who is strong and trustworthy.',
    source: 'Quran 28:26',
    color: INTELLECT,
  },

  // ── Family: dimension pages (PillarLevelPage) ────────────────────────────

  family_marriage: {
    arabic: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً',
    translation: 'Among His signs is that He created spouses from among yourselves for you to live with in tranquillity: He ordained love and kindness between you.',
    source: 'Quran 30:21',
    color: FAMILY,
  },

  family_parenting: {
    arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا قُوا أَنفُسَكُمْ وَأَهْلِيكُمْ نَارًا',
    translation: 'Believers, guard yourselves and your families against a Fire fuelled by people and stones.',
    source: 'Quran 66:6',
    color: FAMILY,
  },

  family_kinship: {
    arabic: 'وَاتَّقُوا اللَّهَ الَّذِي تَسَاءَلُونَ بِهِ وَالْأَرْحَامَ ۚ إِنَّ اللَّهَ كَانَ عَلَيْكُمْ رَقِيبًا',
    translation: 'Be mindful of God, in whose name you make requests of one another. Beware of severing the ties of kinship: God is always watching over you.',
    source: 'Quran 4:1',
    color: FAMILY,
  },

  family_home: {
    // Hadith: Sunan al-Tirmidhi 3895
    arabic: 'خَيْرُكُمْ خَيْرُكُمْ لِأَهْلِهِ وَأَنَا خَيْرُكُمْ لِأَهْلِي',
    translation: 'The best of you is the one who is best to his family, and I am the best of you to my family.',
    source: 'Sunan al-Tirmidhi 3895',
    color: FAMILY,
  },

  // ── Environment: dimension pages (PillarLevelPage) ───────────────────────

  environment_resource: {
    arabic: 'يَا بَنِي آدَمَ خُذُوا زِينَتَكُمْ عِندَ كُلِّ مَسْجِدٍ وَكُلُوا وَاشْرَبُوا وَلَا تُسْرِفُوا ۚ إِنَّهُ لَا يُحِبُّ الْمُسْرِفِينَ',
    translation: 'Children of Adam, dress well whenever you are at worship, and eat and drink but do not be extravagant: God does not like extravagant people.',
    source: 'Quran 7:31',
    color: ENVIRONMENT,
  },

  environment_waste: {
    arabic: 'إِنَّ الْمُبَذِّرِينَ كَانُوا إِخْوَانَ الشَّيَاطِينِ ۖ وَكَانَ الشَّيْطَانُ لِرَبِّهِ كَفُورًا',
    translation: 'Those who squander are the brothers of Satan, and Satan is most ungrateful to his Lord.',
    source: 'Quran 17:27',
    color: ENVIRONMENT,
  },

  environment_ecosystem: {
    arabic: 'ظَهَرَ الْفَسَادُ فِي الْبَرِّ وَالْبَحْرِ بِمَا كَسَبَتْ أَيْدِي النَّاسِ لِيُذِيقَهُم بَعْضَ الَّذِي عَمِلُوا لَعَلَّهُمْ يَرْجِعُونَ',
    translation: 'Corruption has flourished on land and sea as a result of people\'s actions and He will make them taste the consequences of some of their own actions so that they may turn back.',
    source: 'Quran 30:41',
    color: ENVIRONMENT,
  },

  environment_sourcing: {
    arabic: 'يَا أَيُّهَا النَّاسُ كُلُوا مِمَّا فِي الْأَرْضِ حَلَالًا طَيِّبًا وَلَا تَتَّبِعُوا خُطُوَاتِ الشَّيْطَانِ',
    translation: 'People, eat what is good and lawful from the earth, and do not follow Satan\'s footsteps.',
    source: 'Quran 2:168',
    color: ENVIRONMENT,
  },

  // ── Faith: level overview pages (LevelOverviewPage) ──────────────────────

  faith_core: {
    arabic: 'لَّيْسَ الْبِرَّ أَن تُوَلُّوا وُجُوهَكُمْ قِبَلَ الْمَشْرِقِ وَالْمَغْرِبِ وَلَٰكِنَّ الْبِرَّ مَنْ آمَنَ بِاللَّهِ وَالْيَوْمِ الْآخِرِ',
    translation: 'Goodness does not consist in turning your face towards East or West. The truly good are those who believe in God and the Last Day...',
    source: 'Quran 2:177',
    color: FAITH,
  },

  faith_growth: {
    arabic: 'وَالْمُؤْمِنُونَ وَالْمُؤْمِنَاتُ بَعْضُهُمْ أَوْلِيَاءُ بَعْضٍ ۚ يَأْمُرُونَ بِالْمَعْرُوفِ وَيَنْهَوْنَ عَنِ الْمُنكَرِ',
    translation: 'The believers, both men and women, support each other; they order what is right and forbid what is wrong.',
    source: 'Quran 9:71',
    color: FAITH,
  },

  faith_excellence: {
    arabic: 'وَمِنَ النَّاسِ مَن يَشْرِي نَفْسَهُ ابْتِغَاءَ مَرْضَاتِ اللَّهِ ۗ وَاللَّهُ رَءُوفٌ بِالْعِبَادِ',
    translation: 'There is also a kind of person who gives their life to please God, and God is most compassionate to His servants.',
    source: 'Quran 2:207',
    color: FAITH,
  },

  // ── Life: level overview pages (LevelOverviewPage) ───────────────────────

  life_core: {
    arabic: 'وَأَنفِقُوا فِي سَبِيلِ اللَّهِ وَلَا تُلْقُوا بِأَيْدِيكُمْ إِلَى التَّهْلُكَةِ ۛ وَأَحْسِنُوا ۛ إِنَّ اللَّهَ يُحِبُّ الْمُحْسِنِينَ',
    translation: 'Spend in God\'s cause: do not contribute to your destruction with your own hands, but do good, for God loves those who do good.',
    source: 'Quran 2:195',
    color: LIFE,
  },

  life_growth: {
    arabic: 'وَلَقَدْ كَرَّمْنَا بَنِي آدَمَ وَحَمَلْنَاهُمْ فِي الْبَرِّ وَالْبَحْرِ وَرَزَقْنَاهُم مِّنَ الطَّيِّبَاتِ وَفَضَّلْنَاهُمْ عَلَىٰ كَثِيرٍ مِّمَّنْ خَلَقْنَا تَفْضِيلًا',
    translation: 'We have honoured the children of Adam and carried them by land and sea; We have provided good sustenance for them and favoured them specially above many of those We have created.',
    source: 'Quran 17:70',
    color: LIFE,
  },

  life_excellence: {
    arabic: 'لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا',
    translation: 'God does not burden any soul with more than it can bear.',
    source: 'Quran 2:286',
    color: LIFE,
  },

  // ── Intellect: level overview pages (LevelOverviewPage) ──────────────────

  intellect_core: {
    arabic: 'يَرْفَعِ اللَّهُ الَّذِينَ آمَنُوا مِنكُمْ وَالَّذِينَ أُوتُوا الْعِلْمَ دَرَجَاتٍ',
    translation: 'God will raise up, by many degrees, those of you who believe and those who have been given knowledge.',
    source: 'Quran 58:11',
    color: INTELLECT,
  },

  intellect_growth: {
    arabic: 'قُلْ هَلْ يَسْتَوِي الَّذِينَ يَعْلَمُونَ وَالَّذِينَ لَا يَعْلَمُونَ ۗ إِنَّمَا يَتَذَكَّرُ أُولُو الْأَلْبَابِ',
    translation: "'How can those who know be equal to those who do not know?' Only those who have understanding will take heed.",
    source: 'Quran 39:9',
    color: INTELLECT,
  },

  intellect_excellence: {
    arabic: 'إِنَّمَا يَخْشَى اللَّهَ مِنْ عِبَادِهِ الْعُلَمَاءُ ۗ إِنَّ اللَّهَ عَزِيزٌ غَفُورٌ',
    translation: 'It is those of His servants who have knowledge who stand in true awe of God. God is almighty, most forgiving.',
    source: 'Quran 35:28',
    color: INTELLECT,
  },

  // ── Family: level overview pages (LevelOverviewPage) ────────────────────

  family_core: {
    arabic: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ',
    translation: 'Among His signs is that He created spouses from among yourselves for you to live with in tranquillity: He ordained love and kindness between you. There truly are signs in this for those who reflect.',
    source: 'Quran 30:21',
    color: FAMILY,
  },

  family_growth: {
    arabic: 'وَالَّذِينَ يَقُولُونَ رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا',
    translation: "Those who pray, 'Our Lord, give us joy in our spouses and offspring. Make us good examples to those who are aware of You'.",
    source: 'Quran 25:74',
    color: FAMILY,
  },

  family_excellence: {
    arabic: 'إِنَّ أَكْرَمَكُمْ عِندَ اللَّهِ أَتْقَاكُمْ ۚ إِنَّ اللَّهَ عَلِيمٌ خَبِيرٌ',
    translation: 'In God\'s eyes, the most honoured of you are the ones most mindful of Him: God is all knowing, all aware.',
    source: 'Quran 49:13',
    color: FAMILY,
  },

  // ── Environment: level overview pages (LevelOverviewPage) ────────────────

  environment_core: {
    arabic: 'وَلَا تُفْسِدُوا فِي الْأَرْضِ بَعْدَ إِصْلَاحِهَا وَادْعُوهُ خَوْفًا وَطَمَعًا ۚ إِنَّ رَحْمَتَ اللَّهِ قَرِيبٌ مِّنَ الْمُحْسِنِينَ',
    translation: 'Do not corrupt the earth after it has been set right — call on Him fearing and hoping. The mercy of God is close to those who do good.',
    source: 'Quran 7:56',
    color: ENVIRONMENT,
  },

  environment_growth: {
    arabic: 'وَالْأَرْضَ وَضَعَهَا لِلْأَنَامِ',
    translation: 'He set down the Earth for His creatures.',
    source: 'Quran 55:10',
    color: ENVIRONMENT,
  },

  environment_excellence: {
    arabic: 'وَإِذْ قَالَ رَبُّكَ لِلْمَلَائِكَةِ إِنِّي جَاعِلٌ فِي الْأَرْضِ خَلِيفَةً',
    translation: "When your Lord told the angels, 'I am putting a steward on earth.'",
    source: 'Quran 2:30',
    color: ENVIRONMENT,
  },

  // ── Wealth: dimension pages (PillarBoard) ────────────────────────────────

  wealth_earning: {
    arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا لَا تَأْكُلُوا أَمْوَالَكُم بَيْنَكُم بِالْبَاطِلِ إِلَّا أَن تَكُونَ تِجَارَةً عَن تَرَاضٍ مِّنكُمْ',
    translation: 'You who believe, do not wrongfully consume each other\'s wealth but trade by mutual consent.',
    source: 'Quran 4:29',
    color: WEALTH,
  },

  wealth_financial: {
    arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا تَدَايَنتُم بِدَيْنٍ إِلَىٰ أَجَلٍ مُّسَمًّى فَاكْتُبُوهُ',
    translation: 'You who believe, when you contract a debt for a stated term, put it down in writing.',
    source: 'Quran 2:282',
    color: WEALTH,
  },

  wealth_ownership: {
    arabic: 'آمِنُوا بِاللَّهِ وَرَسُولِهِ وَأَنفِقُوا مِمَّا جَعَلَكُم مُّسْتَخْلَفِينَ فِيهِ',
    translation: 'Believe in God and His Messenger, and give out of what He has made you custodians of.',
    source: 'Quran 57:7',
    color: WEALTH,
  },

  wealth_circulation: {
    arabic: 'مَّثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنبَتَتْ سَبْعَ سَنَابِلَ فِي كُلِّ سُنبُلَةٍ مِّائَةُ حَبَّةٍ',
    translation: 'Those who spend their wealth in God\'s cause are like grains of corn that produce seven ears, each bearing a hundred grains.',
    source: 'Quran 2:261',
    color: WEALTH,
  },

  // ── Ummah: pages (injected directly) ─────────────────────────────────────

  ummah_family: {
    arabic: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً',
    translation: 'Among His signs is that He created spouses from among yourselves for you to live with in tranquillity: He ordained love and kindness between you.',
    source: 'Quran 30:21',
    color: UMMAH,
  },

  ummah_neighbors: {
    // Hadith: Sahih al-Bukhari 6014
    arabic: 'مَا زَالَ جِبْرِيلُ يُوصِينِي بِالْجَارِ حَتَّى ظَنَنْتُ أَنَّهُ سَيُوَرِّثُهُ',
    translation: 'Jibril kept on advising me about neighbours until I thought he would make them heirs.',
    source: 'Sahih al-Bukhari 6014',
    color: UMMAH,
  },

  ummah_community: {
    arabic: 'وَلْتَكُن مِّنكُمْ أُمَّةٌ يَدْعُونَ إِلَى الْخَيْرِ وَيَأْمُرُونَ بِالْمَعْرُوفِ وَيَنْهَوْنَ عَنِ الْمُنكَرِ ۚ وَأُولَٰئِكَ هُمُ الْمُفْلِحُونَ',
    translation: 'Be a community that calls for what is good, urges what is right, and forbids what is wrong: those who do this are the successful ones.',
    source: 'Quran 3:104',
    color: UMMAH,
  },

  ummah_collective: {
    arabic: 'وَاعْتَصِمُوا بِحَبْلِ اللَّهِ جَمِيعًا وَلَا تَفَرَّقُوا',
    translation: "Hold fast to God's rope all together; do not split into factions.",
    source: 'Quran 3:103',
    color: UMMAH,
  },
};
