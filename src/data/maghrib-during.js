// Maghrib fard step sequence — 3 rakʿāt; recited aloud (jahrī) in rakʿāt 1–2,
// silently in rakʿah 3. Assembled from the shared prayer-during-builder
// (recitations verbatim from the verified isha-during.js). Grounded in
// nb_salah_maghrib.json.
//
// Structure confirmed against PRAYER_GUIDE (seed-tasks/prayer-seed-tasks.js):
// 3 rakʿāt (mutawātir — the witr of the day), first tashahhud after rakʿah 2,
// final tashahhud + salām after rakʿah 3.

import { buildPrayerSequence } from "./prayer-during-builder";

const seq = buildPrayerSequence({ rakahCount: 3, audibleRakahs: [1, 2] });

export const MAGHRIB_STEPS = seq.steps;
export const MAGHRIB_TOTAL_STEPS = seq.totalSteps;
export const POSTURES_PER_RAKAH = seq.posturesPerRakah;
