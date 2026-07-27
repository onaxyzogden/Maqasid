// Dhuhr fard step sequence — 4 rakʿāt, recited silently (sirrī) throughout.
// Assembled from the shared prayer-during-builder (recitations verbatim from the
// verified isha-during.js). Grounded in nb_salah_dhuhr.json.
//
// Structure confirmed against PRAYER_GUIDE (seed-tasks/prayer-seed-tasks.js):
// 4 rakʿāt, first tashahhud after rakʿah 2, final tashahhud + salām after rakʿah 4.

import { buildPrayerSequence } from "./prayer-during-builder";

const seq = buildPrayerSequence({ rakahCount: 4, audibleRakahs: [] });

export const DHUHR_STEPS = seq.steps;
export const DHUHR_TOTAL_STEPS = seq.totalSteps;
export const POSTURES_PER_RAKAH = seq.posturesPerRakah;
