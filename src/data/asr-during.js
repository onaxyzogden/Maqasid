// Asr fard step sequence — 4 rakʿāt, recited silently (sirrī) throughout.
// Assembled from the shared prayer-during-builder (recitations verbatim from the
// verified isha-during.js). Grounded in nb_salah_asr.json.
//
// Structure confirmed against PRAYER_GUIDE (seed-tasks/prayer-seed-tasks.js):
// 4 rakʿāt, first tashahhud after rakʿah 2, final tashahhud + salām after rakʿah 4.
// Asr is "the middle prayer" (al-ṣalāt al-wusṭā) singled out in Qurʾan 2:238;
// mechanically identical to Dhuhr.

import { buildPrayerSequence } from "./prayer-during-builder";

const seq = buildPrayerSequence({ rakahCount: 4, audibleRakahs: [] });

export const ASR_STEPS = seq.steps;
export const ASR_TOTAL_STEPS = seq.totalSteps;
export const POSTURES_PER_RAKAH = seq.posturesPerRakah;
