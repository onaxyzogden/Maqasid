// Keyed lookup of prayer step sequences for the "During" guide.
// Adding a new prayer = adding one entry here + a per-prayer data file +
// a matching nb_salah_<key>.json grounding corpus at repo root.
//
// Prayers absent from this map fall through to the <ComingSoonShell> in
// PrayerHeroDuring. An optional `headline` overrides the default
// "How to pray {label} Fard (…)" title — used for Tahajjud, which is nafl.

import { ISHA_STEPS, POSTURES_PER_RAKAH as ISHA_PPR } from "./isha-during";
import { FAJR_STEPS, POSTURES_PER_RAKAH as FAJR_PPR } from "./fajr-during";
import { DHUHR_STEPS, POSTURES_PER_RAKAH as DHUHR_PPR } from "./dhuhr-during";
import { ASR_STEPS, POSTURES_PER_RAKAH as ASR_PPR } from "./asr-during";
import { MAGHRIB_STEPS, POSTURES_PER_RAKAH as MAGHRIB_PPR } from "./maghrib-during";
import { TAHAJJUD_STEPS, POSTURES_PER_RAKAH as TAHAJJUD_PPR } from "./tahajjud-during";

export const PRAYER_SEQUENCES = {
  fajr: {
    steps: FAJR_STEPS,
    postures: FAJR_PPR,
    rakahCount: 2,
    label: "Fajr",
    labelAr: "فجر",
    fardRakahSummary: "2 rakʿāt",
  },
  dhuhr: {
    steps: DHUHR_STEPS,
    postures: DHUHR_PPR,
    rakahCount: 4,
    label: "Dhuhr",
    labelAr: "ظهر",
    fardRakahSummary: "4 rakʿāt",
  },
  asr: {
    steps: ASR_STEPS,
    postures: ASR_PPR,
    rakahCount: 4,
    label: "Asr",
    labelAr: "عصر",
    fardRakahSummary: "4 rakʿāt",
  },
  maghrib: {
    steps: MAGHRIB_STEPS,
    postures: MAGHRIB_PPR,
    rakahCount: 3,
    label: "Maghrib",
    labelAr: "مغرب",
    fardRakahSummary: "3 rakʿāt",
  },
  isha: {
    steps: ISHA_STEPS,
    postures: ISHA_PPR,
    rakahCount: 4,
    label: "Isha",
    labelAr: "عشاء",
    fardRakahSummary: "4 rakʿāt",
  },
  tahajjud: {
    steps: TAHAJJUD_STEPS,
    postures: TAHAJJUD_PPR,
    rakahCount: 2,
    label: "Tahajjud",
    labelAr: "تهجّد",
    fardRakahSummary: "2 rakʿāt per unit",
    // Nafl, not fard — override the default "How to pray … Fard" title.
    headline: "How to pray Tahajjud — 2 rakʿāt at a time",
  },
};
