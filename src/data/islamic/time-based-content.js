// Time-based Islamic content for the Prophetic Path timeline sidebar.
// Keyed by PropheticPath node id × phase (before / during / after).
//
// Amanah Gate: every Arabic source below is reused from already-vetted
// repo entries (AYAH_BANNER_DATA, ONGOING_DUA). Phase-only intent text
// (no Arabic) is permitted as a graceful fallback.

import { AYAH_BANNER_DATA } from './ayah-banner-data';
import { ONGOING_DUA } from './islamic-data';

// Convenience: AYAH_BANNER_DATA → DuaSection-shaped { title, arabic, trans, meaning, source }
function ayahDua(bannerKey, title) {
  const b = AYAH_BANNER_DATA[bannerKey];
  if (!b) return null;
  return {
    title,
    arabic: b.arabic,
    trans: '',
    meaning: b.translation,
    source: b.source,
  };
}

// English-only intent prompt (no fabricated Arabic).
function intent(title, meaning) {
  return { title, meaning };
}

const SALAH_AYAH = ayahDua('faith_salah', 'Ayah for the Prayer Window');

// Adhan-response dua — recited after hearing the muezzin (Bukhari 614).
// Promised the Prophet's ﷺ shafa'ah on the Day of Resurrection.
const ADHAN_RESPONSE = {
  title: 'Dua After the Adhan',
  arabic: 'اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ وَالصَّلاَةِ الْقَائِمَةِ آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ',
  trans: '',
  meaning: 'O Allah, Lord of this perfect call and of the prayer to be established, grant Muhammad ﷺ al-Wasilah and al-Fadilah, and raise him to the Praised Station which You promised him.',
  source: 'Sahih al-Bukhari 614',
};

const PRAYER_NODE_TEMPLATE = {
  before: {
    intent: intent(
      'Set Your Niyyah',
      'Settle the body, perform wudu if needed, face the qiblah, and silently set the intention for this prayer.',
    ),
    adhanResponse: ADHAN_RESPONSE,
  },
  during: {
    ayah: SALAH_AYAH,
    dhikr: ONGOING_DUA,
  },
  after: {
    intent: intent(
      'Linger in Dhikr',
      'Do not rise immediately. Pause for tasbih and istighfar before returning to the day.',
    ),
  },
};

export const TIME_CONTENT = {
  fajr:    PRAYER_NODE_TEMPLATE,
  dhuhr:   PRAYER_NODE_TEMPLATE,
  asr:     PRAYER_NODE_TEMPLATE,
  maghrib: PRAYER_NODE_TEMPLATE,
  isha:    PRAYER_NODE_TEMPLATE,
  sahari: {
    before: {
      intent: intent(
        'Wake for the Pre-Dawn Meal',
        'If fasting today, rise before Imsak and prepare suhur. Even outside Ramadan, the predawn window carries barakah for those who eat with niyyah.',
      ),
    },
    during: {
      intent: intent(
        'Eat with Barakah',
        'The Prophet \uFDFA said: "Take suhur, for in suhur there is barakah" (Bukhari 1923). Eat unhurried, drink water, and let the meal become an act of worship.',
      ),
    },
    after: {
      intent: intent(
        'Stop and Approach Fajr',
        'The gap between suhur and Fajr was about fifty ayat in the Prophet\u2019s practice (Bukhari 1921). Make wudu, prepare for Fajr, and let dhikr fill the remaining minutes.',
      ),
    },
  },
  tahajjud: {
    before: {
      intent: intent(
        'Wake for the Last Third',
        'Rise gently, perform wudu, and approach the prayer with humility — this is the hour of nearness.',
      ),
    },
    during: {
      ayah: ayahDua('faith_salah', 'Ayah for the Night Prayer'),
      dhikr: ONGOING_DUA,
    },
    after: {
      intent: intent(
        'Seal the Night',
        'Close with witr and quiet munajat. Let the silence carry into Fajr.',
      ),
    },
  },
  morning: {
    before: {
      intent: intent(
        'Open the Day',
        'Recite the morning adhkar after Fajr; let dhikr precede the first email or task.',
      ),
    },
    during: {
      ayah: ayahDua('life_mental', 'Ayah for the Working Hours'),
      dhikr: ONGOING_DUA,
    },
    after: {
      intent: intent(
        'Close the Morning',
        'Pause work as Dhuhr enters. Pray on the first time and let the prayer reset the day.',
      ),
    },
  },
  'midday-labor': {
    before: {
      intent: intent(
        'Renew Niyyah for Rizq',
        'Restate the intention to earn halal rizq with ihsan and to serve the community around the work.',
      ),
    },
    during: {
      ayah: ayahDua('wealth_earning', 'Ayah for Earning'),
      dhikr: ONGOING_DUA,
    },
    after: {
      intent: intent(
        'Wrap with Gratitude',
        'Close out tasks, offer alhamdulillah for what was earned, and prepare to transition to Asr.',
      ),
    },
  },
  duha: {
    before: {
      intent: intent(
        'Wait for the Sun to Rise',
        'Hold off until the karahah window has passed — about 15–20 minutes after sunrise — then perform wudu and set the niyyah for Salat ad-Duha.',
      ),
    },
    during: {
      intent: intent(
        'Pray Two Rakʿahs',
        'The charity of every joint. Two rakʿahs in the forenoon, with quiet presence — Abu Hurayrah\u2019s threefold counsel from the Prophet ﷺ.',
      ),
    },
    after: {
      intent: intent(
        'Carry Duha into the Day',
        'Let the lightness of these two rakʿahs accompany the start of work. Begin with Bismillah.',
      ),
    },
  },
  qaylulah: {
    before: {
      intent: intent(
        'Wind Down for Qaylulah',
        'A short pre-Dhuhr rest. The Prophet ﷺ rested before noon — strength stored for the labor and the night prayer that follow.',
      ),
    },
    during: {
      intent: intent(
        'Rest Briefly',
        'Twenty to forty minutes is enough. Lie on the right side; let the body release the morning before Dhuhr arrives.',
      ),
    },
    after: {
      intent: intent(
        'Rise to Dhuhr',
        'On waking, give thanks (alhamdulillah alladhi ahyana), make wudu, and move to the Dhuhr salah.',
      ),
    },
  },
  'after-asr': {
    before: {
      intent: intent(
        'Close the Workday',
        'Wrap loose ends. The Sunnah after Asr is to return home — finish what is in front of you and step away from the desk.',
      ),
    },
    during: {
      intent: intent(
        'Be Present at Home',
        'The Prophet ﷺ rotated his afternoons among his family. Sit with spouse and children — eye contact, listening, presence.',
      ),
    },
    after: {
      intent: intent(
        'Approach Maghrib Together',
        'Bring the household toward the sunset prayer. Adhkar of the evening begin as Maghrib nears.',
      ),
    },
  },
  witr: {
    before: {
      intent: intent(
        'Niyyah for Witr',
        'Renew the intention to seal the night with witr — "Make witr the last of your night prayer" (Bukhari 998).',
      ),
    },
    during: {
      intent: intent(
        'Pray the Odd Prayer',
        'Pray witr — one, three, or five rak\u02bbahs (Abu Dawud 1422). The Prophet \uFDFA never abandoned witr in residence or travel.',
      ),
    },
    after: {
      intent: intent(
        'Defer or Sleep on Witr',
        'If confident of waking for tahajjud, you have already completed witr — let it be your last rak\u02bbah of the night unless you re-witr later (Muslim 755).',
      ),
    },
  },
  'qiyam-rest': {
    before: {
      intent: intent(
        'Set the Niyyah to Rise',
        'Before sleep, intend clearly to wake for tahajjud. Even if you do not wake, the niyyah is recorded and your sleep becomes charity (Nasa\u2019i 1787).',
      ),
    },
    during: {
      intent: intent(
        'Sleep with Allah on the Tongue',
        'Satan ties three knots on the head of every sleeper (Bukhari 1142) — dhikr, wudu, and prayer untie them in turn. Sleep with the last words being dhikr.',
      ),
    },
    after: {
      intent: intent(
        'Allah Descends in the Last Third',
        'On waking, remember: Allah descends to the lowest heaven in the last third of the night, asking who calls so He may answer (Bukhari 1145). Rise to qiyam.',
      ),
    },
  },
  jumuah: {
    before: {
      intent: intent(
        'Prepare for Jumu\u02bbah',
        'Ghusl is compulsory for every adult Muslim attending Jumu\u02bbah (Bukhari 880). Add miswak, perfume, and your best clothes. Walk to the masjid early — every step is a year of fasting and qiyam in reward (Tirmidhi 496).',
      ),
    },
    during: {
      intent: intent(
        'Recite Surah al-Kahf and Listen to the Khutbah',
        'Whoever recites Surah al-Kahf on Friday, light shines for him until the next Friday (Mishkat 2175, Hasan). Listen attentively to the khutbah — the one who speaks during it has gained nothing (Bukhari 934).',
      ),
    },
    after: {
      intent: intent(
        'Increase Salawat on the Prophet \uFDFA',
        '"Among the most excellent of your days is Friday — invoke abundant blessings upon me on it" (Abu Dawud 1047, Sahih). Make istighfar and du\u02bba\u02bb after Jumu\u02bbah, and let the salawat continue through the day.',
      ),
    },
  },
  'istijabah-hour': {
    before: {
      intent: intent(
        'Approach the Last Hour Before Maghrib',
        'There is an hour on Friday in which no Muslim asks Allah for good but it is granted (Bukhari 935, Muslim 852a). Many scholars place it in the last hour before Maghrib — wind down work and turn to du\u02bba\u02bb.',
      ),
    },
    during: {
      intent: intent(
        'Make Sustained Du\u02bba\u02bb',
        'Sit in dhikr and du\u02bba\u02bb until Maghrib. The hour is brief — the Prophet \uFDFA gestured with his hand to show its shortness (Bukhari 935). Pour out every need with conviction of acceptance.',
      ),
    },
    after: {
      intent: intent(
        'Close the Friday on the Prayer of Sunset',
        'Move directly into Maghrib. The week\'s most precious hour just passed — let alhamdulillah be the seal.',
      ),
    },
  },
  bedtime: {
    before: {
      intent: intent(
        'Wudu Before Sleep',
        'Perform wudu, dust off the bed, and lie on the right side — the sunan al-nawm preserve the night and the soul (Bukhari 247, 6314).',
      ),
    },
    during: {
      intent: intent(
        'Bismika Allahumma',
        'Recite the dua before sleep — "In Your name, O Allah, I die and I live" (Bukhari 6320). Add Ayat al-Kursi and the three Quls if you can.',
      ),
    },
    after: {
      intent: intent(
        'Carry the Adhkar Until Sleep',
        'Let the last words on your tongue be dhikr. The Prophet ﷺ taught that the soul that sleeps in dhikr is in the keeping of Allah.',
      ),
    },
  },
  'maghrib-iftar': {
    before: {
      intent: intent(
        'The Last Minutes of the Fast',
        'The fasting person has a du\u02bba\u02bb that is not rejected at the moment of breaking the fast (Ibn Majah 1753). Hold the niyyah firm — the muscles tighten, the throat is dry, and the reward is being recorded.',
      ),
    },
    during: {
      intent: intent(
        'Break the Fast on Dates and Water',
        'The Prophet \uFDFA broke fast on fresh dates, then dried dates, then water (Abu Dawud 2356). On breaking, say: "Dhahaba al-zama\u02bbu wa abtallat al-uruq, wa thabata al-ajr in sha\u02bb Allah" — the thirst is gone, the veins are moistened, and the reward is fixed if Allah wills (Abu Dawud 2358).',
      ),
    },
    after: {
      intent: intent(
        'Pray Maghrib Without Delay',
        'Move from iftar to Maghrib quickly — the Prophet \uFDFA prayed Maghrib immediately after breaking fast. Eat lightly so the prayer is unhurried.',
      ),
    },
  },
  'isha-taraweeh': {
    before: {
      intent: intent(
        'Prepare for the Standing of Ramadan',
        'Whoever stands the nights of Ramadan in faith, seeking reward, has all prior sins forgiven (Bukhari 37). Make wudu fresh, take a mushaf if you can, and intend to stand with the imam.',
      ),
    },
    during: {
      intent: intent(
        'Stand With the Imam Until He Finishes',
        'Whoever prays qiyam with the imam until he leaves, the reward of standing the entire night is written for him (Tirmidhi 806, Sahih). Long Quran recitation is sunan — the Prophet \uFDFA prayed long.',
      ),
    },
    after: {
      intent: intent(
        'Seal With Witr',
        'The Prophet \uFDFA never abandoned witr. Make it the last prayer of your night — and if you intend to rise for tahajjud, witr can wait until then.',
      ),
    },
  },
  'traveler-departure': {
    before: {
      intent: intent(
        'Set the Niyyah for Travel',
        'Travel is a piece of punishment — the traveler is restless from food, drink, and sleep, so he hastens back when his need is fulfilled (Sahih al-Bukhari 1804). Begin with niyyah, taqwa, and provision for those you leave behind.',
      ),
    },
    during: {
      intent: intent(
        'Du\u02bba\u02bb of Travel',
        'On mounting the conveyance, the Prophet \uFDFA said: "Allahu akbar, Allahu akbar, Allahu akbar — Subhana alladhi sakhkhara lana hadha wa ma kunna lahu muqrinin, wa inna ila rabbina la-munqalibun. Allahumma inna nas\u02beluka fi safarina hadha al-birra wa al-taqwa\u2026" (Sahih Muslim 1342). On every ascent, takbir; on every descent, tasbih (Sahih al-Bukhari 2993).',
      ),
    },
    after: {
      intent: intent(
        'Carry the Allowance',
        'Shorten Dhuhr / Asr / Isha to 2 rakʿat (Sahih al-Bukhari 1102, Sahih Muslim 685). Combine prayers when needed (Sahih al-Bukhari 1107). Permission to defer the fast remains until you return (Q 2:184).',
      ),
    },
  },
  'traveler-arrival': {
    before: {
      intent: intent(
        'Approach with Gratitude',
        'On the road back, the Prophet \uFDFA would say takbir at every ascent — letting the body rehearse what the heart already knew: every step home is a gift.',
      ),
    },
    during: {
      intent: intent(
        'Du\u02bba\u02bb of Return',
        'On returning, he \uFDFA said: "\u02bbA\u02beibun, ta\u02beibun, \u02bbabidun, li-rabbina hamidun" — turning back, repenting, worshipping, praising our Lord (Sahih al-Bukhari 1797, Sahih Muslim 1345). Pray two rakʿat in the masjid before entering the home (Sahih al-Bukhari 443).',
      ),
    },
    after: {
      intent: intent(
        'Resume the Resident\u2019s Routine',
        'Qasr ends when you return — pray the four-rakʿat prayers in full again. Make up any deferred fasts within the year. Greet your family with peace.',
      ),
    },
  },
  'eid-prayer': {
    before: {
      intent: intent(
        'Prepare for the \u02bb\u012ad Like the Prophet \uFDFA',
        'On \u02bb\u012ad al-Fitr, eat an odd number of dates before going out (Bukhari 953). On \u02bb\u012ad al-Adha, delay the first meal until after the prayer (Tirmidhi 542). Both days: ghusl, best clothes, perfume, and takbir on the road. Pay Zakat al-Fitr before the Fitr prayer (Bukhari 1503).',
      ),
    },
    during: {
      intent: intent(
        'Pray on the Musalla, Raise the Takbir',
        'The Prophet \uFDFA went out to the open ground for \u02bb\u012ad and led the people in prayer before the khutbah (Bukhari 956). Ibn \u02bbUmar would raise the takbir audibly in the marketplace on these days (Bukhari 970). On \u02bb\u012ad al-Adha and the days of Tashreeq, the takbir muqayyad continues after every fard salah.',
      ),
    },
    after: {
      intent: intent(
        'Return by a Different Route',
        'The Prophet \uFDFA would return from the \u02bb\u012ad prayer by a route different from the one he took going (Bukhari 986, Tirmidhi 541) — so the earth bears witness on more paths. On \u02bb\u012ad al-Adha, the udhiyyah (sacrifice) follows the prayer (Bukhari 5545, 5573); the meat is shared with family, neighbors, and the poor.',
      ),
    },
  },
};

// Traveler-allowance notes — surface in the during-phase of dhuhr / asr /
// isha when `getTimeContent` is called with `{ isTraveling: true }`.
// Qasr (shorten to 2 rakʿat) is established by Q 4:101 and the practice of
// the Prophet ﷺ (Bukhari 1102, Muslim 685). Combining (jam') is permitted
// when needed (Bukhari 1107). Fasting may be deferred (Q 2:184).
const TRAVELER_NOTES = {
  dhuhr: intent(
    "Traveler's Allowance — Qasr",
    'On travel, shorten Dhuhr to 2 rakʿat (Sahih al-Bukhari 1102, Sahih Muslim 685). Dhuhr and Asr may be combined when needed (Sahih al-Bukhari 1107). Pay the rawatib only if leisure permits — the Prophet ﷺ kept only the witr and the 2 sunan of Fajr while traveling.',
  ),
  asr: intent(
    "Traveler's Allowance — Qasr",
    'On travel, shorten Asr to 2 rakʿat (Sahih al-Bukhari 1102, Sahih Muslim 685). Asr may be combined with Dhuhr (jam‘ taqdim or jam‘ ta’khir) when needed (Sahih al-Bukhari 1107).',
  ),
  isha: intent(
    "Traveler's Allowance — Qasr",
    'On travel, shorten Isha to 2 rakʿat (Sahih al-Bukhari 1102, Sahih Muslim 685). Isha may be combined with Maghrib when needed; Maghrib stays at 3 rakʿat — it is not shortened.',
  ),
  sahari: intent(
    "Traveler's Allowance — Permission to Defer",
    'The traveler is given permission to defer the fast and make it up later (Q 2:184). If you choose to fast on travel, suhur barakah still holds; if you choose to defer, mark the makeup days now.',
  ),
  'maghrib-iftar': intent(
    "Traveler's Allowance — Permission to Defer",
    'A traveler who began the day fasting may break the fast on travel without sin (Q 2:184). The Prophet ﷺ did both — fasted some travel days and broke them on others.',
  ),
};

export function getTravelerNote(nodeId) {
  return TRAVELER_NOTES[nodeId] || null;
}

export function getTimeContent(nodeId, phase, opts = {}) {
  const node = TIME_CONTENT[nodeId];
  if (!node) return null;
  const base = node[phase] || node.during || null;
  if (!base) return null;
  if (opts.isTraveling && TRAVELER_NOTES[nodeId] && phase === 'during') {
    return { ...base, travelerNote: TRAVELER_NOTES[nodeId] };
  }
  return base;
}
