// Keyed lookup of prayer step sequences for the "During" guide.
// Adding a new prayer = adding one entry here + a per-prayer data file +
// a matching nb_salah_<key>.json grounding corpus at repo root.
//
// Prayers absent from this map fall through to the <ComingSoonShell> in
// PrayerHeroDuring.

import { ISHA_STEPS, POSTURES_PER_RAKAH as ISHA_PPR } from "./isha-during";
import { FAJR_STEPS, POSTURES_PER_RAKAH as FAJR_PPR } from "./fajr-during";

export const PRAYER_SEQUENCES = {
  isha: {
    steps: ISHA_STEPS,
    postures: ISHA_PPR,
    rakahCount: 4,
    label: "Isha",
    labelAr: "عشاء",
    fardRakahSummary: "4 rakʿāt",
  },
  fajr: {
    steps: FAJR_STEPS,
    postures: FAJR_PPR,
    rakahCount: 2,
    label: "Fajr",
    labelAr: "فجر",
    fardRakahSummary: "2 rakʿāt",
  },
};
