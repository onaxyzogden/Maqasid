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
};

export function getTimeContent(nodeId, phase) {
  const node = TIME_CONTENT[nodeId];
  if (!node) return null;
  return node[phase] || node.during || null;
}
