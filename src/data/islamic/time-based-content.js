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

const PRAYER_NODE_TEMPLATE = {
  before: {
    intent: intent(
      'Set Your Niyyah',
      'Settle the body, perform wudu if needed, face the qiblah, and silently set the intention for this prayer.',
    ),
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
};

export function getTimeContent(nodeId, phase) {
  const node = TIME_CONTENT[nodeId];
  if (!node) return null;
  return node[phase] || node.during || null;
}
