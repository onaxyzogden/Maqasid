// Tahajjud step sequence — voluntary (nafl) night prayer, prayed in units of
// two rakʿāt. This guide shows a single two-rakʿah unit. Assembled from the
// shared prayer-during-builder (recitations verbatim from the verified
// isha-during.js). Grounded in nb_salah_tahajjud.json.
//
// Structure confirmed against PRAYER_GUIDE (seed-tasks/prayer-seed-tasks.js):
// night prayer is offered two rakʿāt at a time, each unit sealed with its own
// salām; ʿĀʾishah (may Allah be pleased with her) reported the Prophet ﷺ did not
// exceed eleven rakʿāt in the night (including Witr). Recitation aloud or soft is
// by the worshipper's choice — it is not fard, so the sequence is authored with
// voluntaryNight phrasing (no "Fard" header).

import { buildPrayerSequence } from "./prayer-during-builder";

const seq = buildPrayerSequence({
  rakahCount: 2,
  audibleRakahs: [],
  voluntaryNight: true,
  closingNote:
    "Turn the head right, then left to end the unit with one salām. Pray as many two-rakʿah units as you wish — the Prophet ﷺ did not exceed eleven rakʿāt in the night, including Witr. Seal the night with an odd Witr if you did not already pray it after Isha.",
});

export const TAHAJJUD_STEPS = seq.steps;
export const TAHAJJUD_TOTAL_STEPS = seq.totalSteps;
export const POSTURES_PER_RAKAH = seq.posturesPerRakah;
