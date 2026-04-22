// Fajr fard step sequence — one entry per posture-transition.
// Grounded in nb_salah_fajr.json. Arabic text verified against Qur'an 1
// (al-Fatihah) and authenticated hadith for tasbih/tashahhud/salam wording.
//
// Fajr fard = 2 rakʿāt. Recitation is audible (jahrī) in both rakʿāt. Only
// one tashahhud (final) after rakʿah 2. Qunut al-Fajr is intentionally
// omitted — its ruling varies across schools (see grounding file note).
//
// Shape per step:
//   id:       stable unique id
//   rakah:    1..2 | null
//   posture:  matches a key in postures/index.js
//   label:    { ar, en }
//   recitations: ordered array of { key, ar, translit, meaning, optional? }
//   note:     optional body/gaze cue (brief, one line)

export const FAJR_STEPS = [
  // ── Rakah 1 ─────────────────────────────────────────────────────────
  {
    id: "r1-qiyam",
    rakah: 1,
    posture: "qiyam",
    label: { ar: "القيام", en: "Standing" },
    recitations: [
      {
        key: "takbir",
        ar: "اللَّهُ أَكْبَر",
        translit: "Allāhu akbar",
        meaning: "God is greater",
      },
      {
        key: "thana",
        ar: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلَا إِلَهَ غَيْرُك",
        translit: "Subḥānaka Allāhumma wa biḥamdika, wa tabāraka-smuka, wa taʿālā jadduka, wa lā ilāha ghayruk",
        meaning:
          "Glory be to You, O Allah, and praise. Blessed is Your name, exalted is Your majesty, and there is none worthy of worship besides You.",
        optional: true,
      },
      {
        key: "taawwudh",
        ar: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيم",
        translit: "Aʿūdhu billāhi mina-sh-shayṭāni-r-rajīm",
        meaning: "I seek refuge in Allah from the accursed Shayṭān.",
      },
      {
        key: "fatihah",
        ar: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۝ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۝ الرَّحْمَٰنِ الرَّحِيمِ ۝ مَالِكِ يَوْمِ الدِّينِ ۝ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ۝ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ۝ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
        translit:
          "Bismillāhi-r-raḥmāni-r-raḥīm · Al-ḥamdu lillāhi rabbi-l-ʿālamīn · Ar-raḥmāni-r-raḥīm · Māliki yawmi-d-dīn · Iyyāka naʿbudu wa iyyāka nastaʿīn · Ihdina-ṣ-ṣirāṭa-l-mustaqīm · Ṣirāṭa-l-ladhīna anʿamta ʿalayhim ghayri-l-maghḍūbi ʿalayhim wa lā-ḍ-ḍāllīn",
        meaning:
          "In the name of Allah, the Most Merciful, the Most Compassionate. All praise is due to Allah, Lord of all worlds. The Most Merciful, the Most Compassionate. Master of the Day of Judgment. You alone we worship, and You alone we ask for help. Guide us to the straight path — the path of those You have blessed, not of those who have incurred wrath, nor of those who have gone astray.",
      },
      {
        key: "surah",
        ar: "سورة قصيرة (مثل الإخلاص)",
        translit: "A short surah (e.g., al-Ikhlāṣ)",
        meaning: "Any additional surah after al-Fātiḥah — recited audibly in Fajr.",
      },
    ],
    note: "Raise hands to the ears at takbīr, then fold right over left on the chest. Recitation is audible.",
  },
  {
    id: "r1-ruku",
    rakah: 1,
    posture: "ruku",
    label: { ar: "الركوع", en: "Bowing" },
    recitations: [
      {
        key: "tasbih-ruku",
        ar: "سُبْحَانَ رَبِّيَ الْعَظِيم",
        translit: "Subḥāna rabbiya-l-ʿaẓīm",
        meaning: "Glory be to my Lord, the Most Great.",
      },
    ],
    note: "Say three times. Back flat, hands gripping the knees, gaze to the place of sujūd.",
  },
  {
    id: "r1-itidal",
    rakah: 1,
    posture: "itidal",
    label: { ar: "الاعتدال", en: "Rising" },
    recitations: [
      {
        key: "samia-allahu",
        ar: "سَمِعَ اللَّهُ لِمَنْ حَمِدَه",
        translit: "Samiʿa-llāhu liman ḥamidah",
        meaning: "Allah hears the one who praises Him.",
      },
      {
        key: "rabbana-wa-laka-l-hamd",
        ar: "رَبَّنَا وَلَكَ الْحَمْد",
        translit: "Rabbanā wa laka-l-ḥamd",
        meaning: "Our Lord, and to You is all praise.",
      },
    ],
  },
  {
    id: "r1-sujud-1",
    rakah: 1,
    posture: "sujud",
    label: { ar: "السجود", en: "Prostration" },
    recitations: [
      {
        key: "tasbih-sujud",
        ar: "سُبْحَانَ رَبِّيَ الْأَعْلَى",
        translit: "Subḥāna rabbiya-l-aʿlā",
        meaning: "Glory be to my Lord, the Most High.",
      },
    ],
    note: "Seven points touch the ground: forehead, nose, both palms, both knees, both feet. Say three times.",
  },
  {
    id: "r1-jalsah",
    rakah: 1,
    posture: "jalsah",
    label: { ar: "الجلسة", en: "Sitting between prostrations" },
    recitations: [
      {
        key: "rabbi-ghfir-li",
        ar: "رَبِّ اغْفِرْ لِي",
        translit: "Rabbi-ghfir lī",
        meaning: "My Lord, forgive me.",
      },
    ],
  },
  {
    id: "r1-sujud-2",
    rakah: 1,
    posture: "sujud",
    label: { ar: "السجود الثاني", en: "Second prostration" },
    recitations: [
      {
        key: "tasbih-sujud",
        ar: "سُبْحَانَ رَبِّيَ الْأَعْلَى",
        translit: "Subḥāna rabbiya-l-aʿlā",
        meaning: "Glory be to my Lord, the Most High.",
      },
    ],
  },

  // ── Rakah 2 ─────────────────────────────────────────────────────────
  {
    id: "r2-qiyam",
    rakah: 2,
    posture: "qiyam",
    label: { ar: "القيام", en: "Standing" },
    recitations: [
      {
        key: "fatihah",
        ar: "الفاتحة",
        translit: "al-Fātiḥah",
        meaning: "Recite al-Fātiḥah again (see Rakʿah 1) — audibly.",
      },
      {
        key: "surah",
        ar: "سورة قصيرة",
        translit: "A short surah",
        meaning: "A second additional surah, also recited audibly.",
      },
    ],
  },
  { id: "r2-ruku", rakah: 2, posture: "ruku", label: { ar: "الركوع", en: "Bowing" }, recitations: [{ key: "tasbih-ruku", ar: "سُبْحَانَ رَبِّيَ الْعَظِيم", translit: "Subḥāna rabbiya-l-ʿaẓīm", meaning: "Glory be to my Lord, the Most Great." }] },
  { id: "r2-itidal", rakah: 2, posture: "itidal", label: { ar: "الاعتدال", en: "Rising" }, recitations: [{ key: "samia-allahu", ar: "سَمِعَ اللَّهُ لِمَنْ حَمِدَه", translit: "Samiʿa-llāhu liman ḥamidah", meaning: "Allah hears the one who praises Him." }, { key: "rabbana-wa-laka-l-hamd", ar: "رَبَّنَا وَلَكَ الْحَمْد", translit: "Rabbanā wa laka-l-ḥamd", meaning: "Our Lord, and to You is all praise." }] },
  { id: "r2-sujud-1", rakah: 2, posture: "sujud", label: { ar: "السجود", en: "Prostration" }, recitations: [{ key: "tasbih-sujud", ar: "سُبْحَانَ رَبِّيَ الْأَعْلَى", translit: "Subḥāna rabbiya-l-aʿlā", meaning: "Glory be to my Lord, the Most High." }] },
  { id: "r2-jalsah", rakah: 2, posture: "jalsah", label: { ar: "الجلسة", en: "Sitting between prostrations" }, recitations: [{ key: "rabbi-ghfir-li", ar: "رَبِّ اغْفِرْ لِي", translit: "Rabbi-ghfir lī", meaning: "My Lord, forgive me." }] },
  { id: "r2-sujud-2", rakah: 2, posture: "sujud", label: { ar: "السجود الثاني", en: "Second prostration" }, recitations: [{ key: "tasbih-sujud", ar: "سُبْحَانَ رَبِّيَ الْأَعْلَى", translit: "Subḥāna rabbiya-l-aʿlā", meaning: "Glory be to my Lord, the Most High." }] },
  {
    id: "r2-tashahhud",
    rakah: 2,
    posture: "tashahhud",
    label: { ar: "التشهد الأخير", en: "Final Tashahhud" },
    recitations: [
      {
        key: "attahiyatu",
        ar: "التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُه",
        translit:
          "At-taḥiyyātu lillāhi wa-ṣ-ṣalawātu wa-ṭ-ṭayyibāt · As-salāmu ʿalayka ayyuha-n-nabiyyu wa raḥmatu-llāhi wa barakātuh · As-salāmu ʿalaynā wa ʿalā ʿibādi-llāhi-ṣ-ṣāliḥīn · Ashhadu an lā ilāha illa-llāh wa ashhadu anna Muḥammadan ʿabduhu wa rasūluh",
        meaning:
          "All greetings, prayers, and pure words are for Allah. Peace be upon you, O Prophet, and the mercy of Allah and His blessings. Peace be upon us and upon the righteous servants of Allah. I bear witness that there is no god but Allah, and I bear witness that Muhammad is His servant and messenger.",
      },
      {
        key: "salawat-ibrahimiyyah",
        ar: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيد",
        translit:
          "Allāhumma ṣalli ʿalā Muḥammadin wa ʿalā āli Muḥammad, kamā ṣallayta ʿalā Ibrāhīma wa ʿalā āli Ibrāhīm, innaka ḥamīdun majīd",
        meaning:
          "O Allah, send blessings upon Muhammad and upon the family of Muhammad, as You sent blessings upon Ibrāhīm and the family of Ibrāhīm. Indeed, You are Praiseworthy, Glorious.",
      },
    ],
    note: "Sit back on the left foot, right foot upright, right index finger raised at shahādah. Fajr has only this final tashahhud.",
  },
  {
    id: "r2-salam",
    rakah: 2,
    posture: "salam",
    label: { ar: "التسليم", en: "Closing Salām" },
    recitations: [
      {
        key: "salam",
        ar: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّه",
        translit: "As-salāmu ʿalaykum wa raḥmatu-llāh",
        meaning: "Peace be upon you, and the mercy of Allah.",
      },
    ],
    note: "Turn the head to the right, then to the left. The prayer is now complete.",
  },
];

export const FAJR_TOTAL_STEPS = FAJR_STEPS.length;

// Posture count per rakah — used by the dot indicator.
// Rakah 1: qiyam, ruku, itidal, sujud, jalsah, sujud = 6
// Rakah 2: qiyam, ruku, itidal, sujud, jalsah, sujud, tashahhud, salam = 8
export const POSTURES_PER_RAKAH = { 1: 6, 2: 8 };
