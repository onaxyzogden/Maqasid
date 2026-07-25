// Shared builder for prayer "During" step sequences.
//
// The recitation Arabic / transliteration / meaning below are copied VERBATIM
// from the verified isha-during.js (the recitation source of truth, grounded in
// nb_salah_isha.json). This builder assembles them into the exact step shape the
// renderer (PrayerHeroDuring) expects, so registering a new fard/nafl prayer is
// one call instead of a hand-authored 200-line file:
//
//   buildPrayerSequence({ rakahCount, audibleRakahs, voluntaryNight, closingNote })
//     → { steps, posturesPerRakah, totalSteps }
//
// Step shape (per posture-transition), mirroring isha-during.js exactly:
//   { id, rakah, posture, label:{ar,en}, recitations:[{key,ar,translit,meaning,optional?}], note? }
//
// Rules encoded (confirmed against PRAYER_GUIDE in seed-tasks/prayer-seed-tasks.js):
//   - Rakah 1:        takbir → qiyam[thana(opt), taawwudh, fatihah(full), surah]
//                     → ruku → itidal → sujud → jalsah → sujud
//   - Rakah 2:        qiyam[fatihah(repeat), surah] → …postures…
//                     → FIRST tashahhud iff rakahCount >= 3
//   - Rakah 3..N-1:   qiyam[fatihah only] → …postures…
//   - Final rakah N:  qiyam → …postures… → FINAL tashahhud (+ salawat) → salam
//   - audibleRakahs:  1-based rakʿah numbers recited aloud (jahrī); others silent (sirrī).
//   - voluntaryNight: night-nafl phrasing (Tahajjud) — recitation "by choice."
//   - posturesPerRakah is COUNTED from the built steps (no hand-typed drift).
//
// Each recitation is a factory returning a fresh object, so no two steps ever
// share a mutable reference.

// ── Invariant recitation blocks (verbatim from isha-during.js) ──────────────

const takbir = () => ({
  key: "takbir",
  ar: "اللَّهُ أَكْبَر",
  translit: "Allāhu akbar",
  meaning: "God is greater",
});

const thana = () => ({
  key: "thana",
  ar: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلَا إِلَهَ غَيْرُك",
  translit: "Subḥānaka Allāhumma wa biḥamdika, wa tabāraka-smuka, wa taʿālā jadduka, wa lā ilāha ghayruk",
  meaning:
    "Glory be to You, O Allah, and praise. Blessed is Your name, exalted is Your majesty, and there is none worthy of worship besides You.",
  optional: true,
});

const taawwudh = () => ({
  key: "taawwudh",
  ar: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيم",
  translit: "Aʿūdhu billāhi mina-sh-shayṭāni-r-rajīm",
  meaning: "I seek refuge in Allah from the accursed Shayṭān.",
});

const fatihahFull = () => ({
  key: "fatihah",
  ar: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۝ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۝ الرَّحْمَٰنِ الرَّحِيمِ ۝ مَالِكِ يَوْمِ الدِّينِ ۝ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ۝ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ۝ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
  translit:
    "Bismillāhi-r-raḥmāni-r-raḥīm · Al-ḥamdu lillāhi rabbi-l-ʿālamīn · Ar-raḥmāni-r-raḥīm · Māliki yawmi-d-dīn · Iyyāka naʿbudu wa iyyāka nastaʿīn · Ihdina-ṣ-ṣirāṭa-l-mustaqīm · Ṣirāṭa-l-ladhīna anʿamta ʿalayhim ghayri-l-maghḍūbi ʿalayhim wa lā-ḍ-ḍāllīn",
  meaning:
    "In the name of Allah, the Most Merciful, the Most Compassionate. All praise is due to Allah, Lord of all worlds. The Most Merciful, the Most Compassionate. Master of the Day of Judgment. You alone we worship, and You alone we ask for help. Guide us to the straight path — the path of those You have blessed, not of those who have incurred wrath, nor of those who have gone astray.",
});

const tasbihRuku = () => ({
  key: "tasbih-ruku",
  ar: "سُبْحَانَ رَبِّيَ الْعَظِيم",
  translit: "Subḥāna rabbiya-l-ʿaẓīm",
  meaning: "Glory be to my Lord, the Most Great.",
});

const samia = () => ({
  key: "samia-allahu",
  ar: "سَمِعَ اللَّهُ لِمَنْ حَمِدَه",
  translit: "Samiʿa-llāhu liman ḥamidah",
  meaning: "Allah hears the one who praises Him.",
});

const rabbana = () => ({
  key: "rabbana-wa-laka-l-hamd",
  ar: "رَبَّنَا وَلَكَ الْحَمْد",
  translit: "Rabbanā wa laka-l-ḥamd",
  meaning: "Our Lord, and to You is all praise.",
});

const tasbihSujud = () => ({
  key: "tasbih-sujud",
  ar: "سُبْحَانَ رَبِّيَ الْأَعْلَى",
  translit: "Subḥāna rabbiya-l-aʿlā",
  meaning: "Glory be to my Lord, the Most High.",
});

const rabbiGhfir = () => ({
  key: "rabbi-ghfir-li",
  ar: "رَبِّ اغْفِرْ لِي",
  translit: "Rabbi-ghfir lī",
  meaning: "My Lord, forgive me.",
});

// Full tashahhud — used for the first tashahhud, and for the final tashahhud of
// a two-rakʿah prayer (which has no earlier full recitation to refer back to).
const attahiyatuFull = () => ({
  key: "attahiyatu",
  ar: "التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُه",
  translit:
    "At-taḥiyyātu lillāhi wa-ṣ-ṣalawātu wa-ṭ-ṭayyibāt · As-salāmu ʿalayka ayyuha-n-nabiyyu wa raḥmatu-llāhi wa barakātuh · As-salāmu ʿalaynā wa ʿalā ʿibādi-llāhi-ṣ-ṣāliḥīn · Ashhadu an lā ilāha illa-llāh wa ashhadu anna Muḥammadan ʿabduhu wa rasūluh",
  meaning:
    "All greetings, prayers, and pure words are for Allah. Peace be upon you, O Prophet, and the mercy of Allah and His blessings. Peace be upon us and upon the righteous servants of Allah. I bear witness that there is no god but Allah, and I bear witness that Muhammad is His servant and messenger.",
});

// Abbreviated final tashahhud — used when a first tashahhud already appeared
// (rakahCount >= 3), so the worshipper is pointed back to it.
const attahiyatuRef = () => ({
  key: "attahiyatu",
  ar: "التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ… أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُه",
  translit: "At-taḥiyyātu lillāhi… (as in the first tashahhud)",
  meaning: "Recite the same tashahhud as after rakʿah 2.",
});

const salawat = () => ({
  key: "salawat-ibrahimiyyah",
  ar: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيد",
  translit:
    "Allāhumma ṣalli ʿalā Muḥammadin wa ʿalā āli Muḥammad, kamā ṣallayta ʿalā Ibrāhīma wa ʿalā āli Ibrāhīm, innaka ḥamīdun majīd",
  meaning:
    "O Allah, send blessings upon Muhammad and upon the family of Muhammad, as You sent blessings upon Ibrāhīm and the family of Ibrāhīm. Indeed, You are Praiseworthy, Glorious.",
});

const salam = () => ({
  key: "salam",
  ar: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّه",
  translit: "As-salāmu ʿalaykum wa raḥmatu-llāh",
  meaning: "Peace be upon you, and the mercy of Allah.",
});

// ── Audibility-dependent recitation blocks ──────────────────────────────────

const fatihahRepeat = () => ({
  key: "fatihah",
  ar: "الفاتحة",
  translit: "al-Fātiḥah",
  meaning: "Recite al-Fātiḥah again (see Rakʿah 1).",
});

const fatihahOnly = () => ({
  key: "fatihah",
  ar: "الفاتحة فقط",
  translit: "al-Fātiḥah only",
  meaning: "Recite only al-Fātiḥah — no additional surah is added after the second rakʿah.",
});

const surah = (second) =>
  second
    ? {
        key: "surah",
        ar: "سورة قصيرة",
        translit: "A short surah",
        meaning: "A second additional surah (shorter than the first is traditional).",
      }
    : {
        key: "surah",
        ar: "سورة قصيرة (مثل الإخلاص)",
        translit: "A short surah (e.g., al-Ikhlāṣ)",
        meaning: "Any additional surah after al-Fātiḥah in the first two rakʿāt.",
      };

// ── Notes ───────────────────────────────────────────────────────────────────

const SITTING_NOTE =
  "Sit back on the left foot, right foot upright, right index finger raised at shahādah.";
const DEFAULT_SALAM_NOTE =
  "Turn the head to the right, then to the left. The prayer is now complete.";

function audibilityPhrase(audible, voluntaryNight) {
  if (voluntaryNight) {
    return "Recitation may be aloud or soft — the night prayer is your private audience.";
  }
  return audible ? "Recitation is aloud." : "Recitation is silent.";
}

// ── Builder ─────────────────────────────────────────────────────────────────

/**
 * Assemble a prayer's During step sequence.
 *
 * @param {object}   opts
 * @param {number}   opts.rakahCount     total rakʿāt (2, 3, or 4)
 * @param {number[]} [opts.audibleRakahs=[]]  1-based rakʿāt recited aloud (jahrī)
 * @param {boolean}  [opts.voluntaryNight=false]  night-nafl audibility phrasing (Tahajjud)
 * @param {string}   [opts.closingNote]  overrides the default salam note
 * @returns {{ steps: object[], posturesPerRakah: Record<number, number>, totalSteps: number }}
 */
export function buildPrayerSequence({
  rakahCount,
  audibleRakahs = [],
  voluntaryNight = false,
  closingNote,
} = {}) {
  const hasFirstTashahhud = rakahCount >= 3;
  const jahriPrayer = audibleRakahs.length > 0;
  const steps = [];

  for (let r = 1; r <= rakahCount; r += 1) {
    const isFirst = r === 1;
    const isFinal = r === rakahCount;
    const withSurah = r <= 2;
    const audible = audibleRakahs.includes(r);

    // Opening takbīr (first rakʿah only).
    if (isFirst) {
      steps.push({
        id: "r1-takbir",
        rakah: 1,
        posture: "takbir",
        label: { ar: "تكبيرة الإحرام", en: "Opening takbīr" },
        recitations: [takbir()],
        note: "Raise both hands to the level of the ears (or shoulders), then lower them and fold right over left on the chest to enter qiyam.",
      });
    }

    // Qiyam — recitation varies by rakʿah.
    const qiyamRecs = [];
    if (isFirst) {
      qiyamRecs.push(thana(), taawwudh(), fatihahFull(), surah(false));
    } else if (withSurah) {
      qiyamRecs.push(fatihahRepeat(), surah(true));
    } else {
      qiyamRecs.push(fatihahOnly());
    }

    let qiyamNote;
    if (isFirst) {
      qiyamNote = `Hands folded right over left on the chest. ${audibilityPhrase(audible, voluntaryNight)}`;
    } else if (!withSurah && jahriPrayer && !voluntaryNight) {
      // Flag the switch to silent recitation in an otherwise-aloud prayer (Maghrib r3).
      qiyamNote = "Recited silently.";
    }

    steps.push({
      id: `r${r}-qiyam`,
      rakah: r,
      posture: "qiyam",
      label: { ar: "القيام", en: "Standing" },
      recitations: qiyamRecs,
      ...(qiyamNote ? { note: qiyamNote } : {}),
    });

    // Rukūʿ.
    steps.push({
      id: `r${r}-ruku`,
      rakah: r,
      posture: "ruku",
      label: { ar: "الركوع", en: "Bowing" },
      recitations: [tasbihRuku()],
      ...(isFirst
        ? { note: "Say three times. Back flat, hands gripping the knees, gaze to the place of sujūd." }
        : {}),
    });

    // Iʿtidāl.
    steps.push({
      id: `r${r}-itidal`,
      rakah: r,
      posture: "itidal",
      label: { ar: "الاعتدال", en: "Rising" },
      recitations: [samia(), rabbana()],
    });

    // First sujūd.
    steps.push({
      id: `r${r}-sujud-1`,
      rakah: r,
      posture: "sujud",
      label: { ar: "السجود", en: "Prostration" },
      recitations: [tasbihSujud()],
      ...(isFirst
        ? { note: "Seven points touch the ground: forehead, nose, both palms, both knees, both feet. Say three times." }
        : {}),
    });

    // Jalsah (sitting between the two prostrations).
    steps.push({
      id: `r${r}-jalsah`,
      rakah: r,
      posture: "jalsah",
      label: { ar: "الجلسة", en: "Sitting between prostrations" },
      recitations: [rabbiGhfir()],
    });

    // Second sujūd.
    steps.push({
      id: `r${r}-sujud-2`,
      rakah: r,
      posture: "sujud",
      label: { ar: "السجود الثاني", en: "Second prostration" },
      recitations: [tasbihSujud()],
    });

    // First tashahhud — after rakʿah 2 of a 3+ rakʿah prayer only.
    if (hasFirstTashahhud && r === 2 && !isFinal) {
      steps.push({
        id: "r2-tashahhud",
        rakah: 2,
        posture: "tashahhud",
        label: { ar: "التشهد الأول", en: "First Tashahhud" },
        recitations: [attahiyatuFull()],
        note: SITTING_NOTE,
      });
    }

    // Final tashahhud + closing salām — last rakʿah.
    if (isFinal) {
      steps.push({
        id: `r${r}-tashahhud`,
        rakah: r,
        posture: "tashahhud",
        label: { ar: "التشهد الأخير", en: "Final Tashahhud" },
        recitations: hasFirstTashahhud
          ? [attahiyatuRef(), salawat()]
          : [attahiyatuFull(), salawat()],
        // The sitting posture was already taught at the first tashahhud; only
        // repeat it when this is the prayer's only tashahhud (two-rakʿah prayers).
        ...(hasFirstTashahhud ? {} : { note: SITTING_NOTE }),
      });
      steps.push({
        id: `r${r}-salam`,
        rakah: r,
        posture: "salam",
        label: { ar: "التسليم", en: "Closing Salām" },
        recitations: [salam()],
        note: closingNote || DEFAULT_SALAM_NOTE,
      });
    }
  }

  const posturesPerRakah = {};
  for (const step of steps) {
    posturesPerRakah[step.rakah] = (posturesPerRakah[step.rakah] || 0) + 1;
  }

  return { steps, posturesPerRakah, totalSteps: steps.length };
}
