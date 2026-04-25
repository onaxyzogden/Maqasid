#!/usr/bin/env node
// Backfill 9 Quran references that appear inline in subtask `description` prose
// but were missing from the structured `sources` array. Quran data fetched via
// MCP server 10afb233 (ar-simple-clean + en-abdel-haleem). Hadith refs deferred
// to a separate scholar-grounded pass.
//
// Strategy: locate each subtask by its title (unique enough within its pillar)
// then insert the new structured entry before the `],\n          description:`
// closing of the sources array. Run with --write to apply.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const WRITE = process.argv.includes('--write');

const TARGETS = [
  {
    pillar: 'faith',
    titleAnchor: "title: 'Study Tawhid al-Rububiyyah \\u2014 Lordship of Allah'",
    entry: quran('29:61-63',
      'وَلَئِن سَأَلْتَهُم مَّنْ خَلَقَ السَّمَاوَاتِ وَالْأَرْضَ وَسَخَّرَ الشَّمْسَ وَالْقَمَرَ لَيَقُولُنَّ اللَّهُ ۖ فَأَنَّىٰ يُؤْفَكُونَ ۝ اللَّهُ يَبْسُطُ الرِّزْقَ لِمَن يَشَاءُ مِنْ عِبَادِهِ وَيَقْدِرُ لَهُ ۚ إِنَّ اللَّهَ بِكُلِّ شَيْءٍ عَلِيمٌ ۝ وَلَئِن سَأَلْتَهُم مَّن نَّزَّلَ مِنَ السَّمَاءِ مَاءً فَأَحْيَا بِهِ الْأَرْضَ مِن بَعْدِ مَوْتِهَا لَيَقُولُنَّ اللَّهُ ۚ قُلِ الْحَمْدُ لِلَّهِ ۚ بَلْ أَكْثَرُهُمْ لَا يَعْقِلُونَ',
      'If you ask the disbelievers who created the heavens and earth and who harnessed the sun and moon, they are sure to say, "God." Then why do they turn away from Him? It is God who gives abundantly to whichever of His servants He will, and sparingly to whichever He will: He has full knowledge of everything. If you ask them, "Who sends water down from the sky and gives life with it to the earth after it has died?" they are sure to say, "God." Say, "Praise belongs to God!" Truly, most of them do not use their reason.'),
  },
  {
    pillar: 'faith',
    titleAnchor: "title: 'Memorise the Salawat upon the Prophet (Allahumma salli ala Muhammad)'",
    entry: quran('33:56',
      'إِنَّ اللَّهَ وَمَلَائِكَتَهُ يُصَلُّونَ عَلَى النَّبِيِّ ۚ يَا أَيُّهَا الَّذِينَ آمَنُوا صَلُّوا عَلَيْهِ وَسَلِّمُوا تَسْلِيمًا',
      'God and His angels bless the Prophet- so, you who believe, bless him too and give him greetings of peace.'),
  },
  {
    pillar: 'faith',
    titleAnchor: "title: 'Learn the du\\'a between the Yemeni corner and the Black Stone'",
    entry: quran('2:201',
      'وَمِنْهُم مَّن يَقُولُ رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
      'others pray, "Our Lord, give us good in this world and in the Hereafter, and protect us from the torment of the Fire."'),
  },
  {
    pillar: 'family',
    titleAnchor: "title: 'Understand the rulings on maintaining ties with non-Muslim relatives'",
    entry: quran('60:8-9',
      'لَّا يَنْهَاكُمُ اللَّهُ عَنِ الَّذِينَ لَمْ يُقَاتِلُوكُمْ فِي الدِّينِ وَلَمْ يُخْرِجُوكُم مِّن دِيَارِكُمْ أَن تَبَرُّوهُمْ وَتُقْسِطُوا إِلَيْهِمْ ۚ إِنَّ اللَّهَ يُحِبُّ الْمُقْسِطِينَ ۝ إِنَّمَا يَنْهَاكُمُ اللَّهُ عَنِ الَّذِينَ قَاتَلُوكُمْ فِي الدِّينِ وَأَخْرَجُوكُم مِّن دِيَارِكُمْ وَظَاهَرُوا عَلَىٰ إِخْرَاجِكُمْ أَن تَوَلَّوْهُمْ ۚ وَمَن يَتَوَلَّهُمْ فَأُولَٰئِكَ هُمُ الظَّالِمُونَ',
      'and He does not forbid you to deal kindly and justly with anyone who has not fought you for your faith or driven you out of your homes: God loves the just. But God forbids you to take as allies those who have fought against you for your faith, driven you out of your homes, and helped others to drive you out: any of you who take them as allies will truly be wrongdoers.'),
  },
  {
    pillar: 'wealth',
    titleAnchor: "title: 'Execute the exit \u2014 submit resignations, close accounts, or terminate contracts'",
    entry: quran('65:2-3',
      'فَإِذَا بَلَغْنَ أَجَلَهُنَّ فَأَمْسِكُوهُنَّ بِمَعْرُوفٍ أَوْ فَارِقُوهُنَّ بِمَعْرُوفٍ وَأَشْهِدُوا ذَوَيْ عَدْلٍ مِّنكُمْ وَأَقِيمُوا الشَّهَادَةَ لِلَّهِ ۚ ذَٰلِكُمْ يُوعَظُ بِهِ مَن كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ ۚ وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا ۝ وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ ۚ وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ ۚ إِنَّ اللَّهَ بَالِغُ أَمْرِهِ ۚ قَدْ جَعَلَ اللَّهُ لِكُلِّ شَيْءٍ قَدْرًا',
      'When they have completed their appointed term, either keep them honourably, or part with them honourably. Call two just witnesses from your people and establish witness for the sake of God. Anyone who believes in God and the Last Day should heed this: God will find a way out for those who are mindful of Him, and will provide for them from an unexpected source; God will be enough for those who put their trust in Him. God achieves His purpose; God has set a due measure for everything.'),
  },
  {
    pillar: 'wealth',
    titleAnchor: "title: 'Make sincere tawbah \u2014 regret, cease, and resolve not to return'",
    entry: quran('65:2',
      'وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا',
      'God will find a way out for those who are mindful of Him.'),
  },
  {
    pillar: 'wealth',
    titleAnchor: "title: 'Allocate remaining funds to variable expenses and discretionary spending'",
    entry: quran('7:31',
      'يَا بَنِي آدَمَ خُذُوا زِينَتَكُمْ عِندَ كُلِّ مَسْجِدٍ وَكُلُوا وَاشْرَبُوا وَلَا تُسْرِفُوا ۚ إِنَّهُ لَا يُحِبُّ الْمُسْرِفِينَ',
      'Children of Adam, dress well whenever you are at worship, and eat and drink [as We have permitted] but do not be extravagant: God does not like extravagant people.'),
  },
  {
    pillar: 'ummah',
    titleAnchor: "title: 'Distribute your zakat directly to eligible recipients in your community'",
    entry: quran('9:60',
      'إِنَّمَا الصَّدَقَاتُ لِلْفُقَرَاءِ وَالْمَسَاكِينِ وَالْعَامِلِينَ عَلَيْهَا وَالْمُؤَلَّفَةِ قُلُوبُهُمْ وَفِي الرِّقَابِ وَالْغَارِمِينَ وَفِي سَبِيلِ اللَّهِ وَابْنِ السَّبِيلِ ۖ فَرِيضَةً مِّنَ اللَّهِ ۗ وَاللَّهُ عَلِيمٌ حَكِيمٌ',
      'Alms are meant only for the poor, the needy, those who administer them, those whose hearts need winning over, to free slaves and help those in debt, for God\'s cause, and for travellers in need. This is ordained by God; God is all knowing and wise.'),
  },
  {
    pillar: 'ummah',
    titleAnchor: "title: 'Research the land history \u2014 previous use, chemical applications, and indigenous vegetation'",
    entry: quran('99:4',
      'يَوْمَئِذٍ تُحَدِّثُ أَخْبَارَهَا',
      'on that Day, it will tell all'),
  },
];

function quran(ref, arabic, translation) {
  return `            {
              kind: "quran",
              ref: "Quran ${ref}",
              arabic: "${arabic}",
              translation: ${JSON.stringify(translation)},
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Verse cited inline in this subtask's description; backfilled into structured sources for SubtaskSources panel rendering.",
            },
`;
}

let totalApplied = 0;
let totalSkipped = 0;
const byPillar = {};

const grouped = {};
for (const t of TARGETS) (grouped[t.pillar] ||= []).push(t);

for (const [pillar, targets] of Object.entries(grouped)) {
  const file = path.join(ROOT, 'src/data/seed-tasks', `${pillar}-seed-tasks.js`);
  let src = fs.readFileSync(file, 'utf8');
  let pillarApplied = 0;

  for (const { titleAnchor, entry } of targets) {
    // Match anchor as substring (exact, including escapes already encoded)
    const anchorIdx = src.indexOf(titleAnchor);
    if (anchorIdx < 0) {
      console.warn(`[SKIP] ${pillar}: anchor not found → ${titleAnchor.slice(0, 60)}…`);
      totalSkipped++;
      continue;
    }
    // Find the closing of THIS subtask's sources array: the next
    //   "          ],\n          description:"
    // after the anchor.
    const closingMarker = '          ],\n          description:';
    const closingIdx = src.indexOf(closingMarker, anchorIdx);
    if (closingIdx < 0) {
      console.warn(`[SKIP] ${pillar}: closing marker not found after anchor`);
      totalSkipped++;
      continue;
    }
    src = src.slice(0, closingIdx) + entry + src.slice(closingIdx);
    pillarApplied++;
    totalApplied++;
  }

  if (pillarApplied > 0) {
    if (WRITE) fs.writeFileSync(file, src);
    byPillar[pillar] = pillarApplied;
  }
}

console.log(`\nBackfill ${WRITE ? 'WRITTEN' : 'DRY-RUN'}: ${totalApplied} applied, ${totalSkipped} skipped`);
console.log('Per pillar:', byPillar);
if (!WRITE) console.log('\nRe-run with --write to apply.');
