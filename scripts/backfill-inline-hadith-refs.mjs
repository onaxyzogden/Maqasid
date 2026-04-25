#!/usr/bin/env node
// Phase 2 — backfill 13 inline-cited hadith refs into structured `sources[]`.
// Canonical text retrieved from NotebookLM Muslim Scholar (1c17b03b) over two
// queries (ref-based + content-based). Where Muslim Scholar flagged ref→text
// mapping uncertainty (Tirmidhi 2007, Bukhari 5267), the entry preserves the
// seed-cited ref and uses the closest-match canonical text; rationale
// explicitly notes sunnah.com verification recommended.
//
// Run with --write to apply.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const WRITE = process.argv.includes('--write');

function hadith({ ref, arabic, translation, hadithGrade, ratNote }) {
  const rationale = ratNote
    ? `Hadith cited inline in this subtask's description; backfilled into structured sources via NotebookLM Muslim Scholar canonical-text retrieval. ${ratNote}`
    : "Hadith cited inline in this subtask's description; backfilled into structured sources via NotebookLM Muslim Scholar canonical-text retrieval.";
  return `            {
              kind: "hadith",
              ref: ${JSON.stringify(ref)},
              ${arabic ? `arabic: ${JSON.stringify(arabic)},\n              ` : ''}translation: ${JSON.stringify(translation)},
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: ${JSON.stringify(hadithGrade)},
              rationale: ${JSON.stringify(rationale)},
            },
`;
}

const TARGETS = [
  // 1. Bukhari 5776 — "no tiyarah"
  {
    pillar: 'faith',
    titleAnchor: "title: 'List any superstitious beliefs or practices you hold'",
    entry: hadith({
      ref: 'Sahih al-Bukhari 5776',
      arabic: 'لاَ طِيَرَةَ، وَخَيْرُهَا الْفَأْلُ',
      translation: 'There is no tiyarah (superstitious belief in bird omens), and the best of it is the good omen (al-fa\'l). They asked, "What is al-fa\'l?" He said: "A righteous word that one of you hears."',
      hadithGrade: 'Sahih',
    }),
  },
  // 2. Bukhari 5267 — Prophet's handling of marital tensions
  {
    pillar: 'family',
    titleAnchor: "title: 'Study how the Prophet handled disagreements with his wives from authentic hadith'",
    entry: hadith({
      ref: 'Sahih al-Bukhari 5267',
      translation: 'Umar ibn al-Khattab narrated visiting the Prophet (ﷺ) during his withdrawal from his wives in an attic room. He saw the Prophet lying on a mat that left marks on his side. The Prophet had taken an oath to stay away from his wives for one month, but had not divorced them. When Umar wept at the Prophet\'s austerity compared to the Persians and Romans, the Prophet replied: "Are you not satisfied that they have the world and we have the Hereafter?" The narration illustrates the Prophet\'s patience, justice, and refusal to retaliate harshly during marital disagreements.',
      hadithGrade: 'Sahih',
      ratNote: 'NotebookLM Muslim Scholar identifies the matching content under canonical sunnah.com numbering (Bukhari 5191) — sunnah.com cross-reference verification recommended in scholar polish.',
    }),
  },
  // 3. Muslim 2625 — "increase the broth"
  {
    pillar: 'ummah',
    titleAnchor: 'title: "Begin the habit of sharing food from your regular cooking \u2014 increase portions and send a plate next door"',
    entry: hadith({
      ref: 'Sahih Muslim 2625',
      arabic: 'يَا أَبَا ذَرٍّ إِذَا طَبَخْتَ مَرَقَةً فَأَكْثِرْ مَاءَهَا وَتَعَاهَدْ جِيرَانَكَ',
      translation: 'O Abu Dharr, when you prepare broth, add more water to it, and have regard for your neighbors.',
      hadithGrade: 'Sahih',
    }),
  },
  // 4. Tirmidhi 2007 — neighbor kindness (×1 of 2)
  {
    pillar: 'ummah',
    titleAnchor: 'title: "Continue fulfilling the rights of difficult neighbors \u2014 do not withdraw kindness because they are unkind"',
    entry: hadith({
      ref: 'Jami at-Tirmidhi 2007',
      arabic: 'مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلاَ يُؤْذِ جَارَهُ',
      translation: 'He who believes in Allah and the Last Day should not hurt (trouble) his neighbor.',
      hadithGrade: 'Sahih',
      ratNote: 'NotebookLM Muslim Scholar matched the topical content (neighborly principle) — sunnah.com cross-reference verification recommended for exact ref→text alignment.',
    }),
  },
  // 5. Tirmidhi 1944 — best of neighbors
  {
    pillar: 'ummah',
    titleAnchor: 'title: "Set an explicit personal goal: to be the best neighbor your neighbors have ever had"',
    entry: hadith({
      ref: 'Jami at-Tirmidhi 1944',
      arabic: 'خَيْرُ الْأَصْحَابِ عِنْدَ اللَّهِ خَيْرُهُمْ لِصَاحِبِهِ وَخَيْرُ الْجِيرَانِ عِنْدَ اللَّهِ خَيْرُهُمْ لِجَارِهِ',
      translation: 'The best of companions in the sight of Allah is the one who is best to his companion, and the best of neighbors in the sight of Allah is the one who is best to his neighbor.',
      hadithGrade: 'Sahih (graded sahih by al-Albani)',
    }),
  },
  // 6. Muslim 8 — Hadith of Jibril (ihsan)
  {
    pillar: 'ummah',
    titleAnchor: 'title: "Exceed expectations consistently \u2014 anticipate needs, give without being asked, and surprise with generosity"',
    entry: hadith({
      ref: 'Sahih Muslim 8',
      translation: 'Umar ibn al-Khattab narrated the Hadith of Jibril, in which the Prophet (ﷺ) defined al-Ihsan as: "That you worship Allah as if you are seeing Him, for though you don\'t see Him, He, verily, sees you." Cited as the prophetic definition of excellence — applied to neighborly relations as exceeding the minimum.',
      hadithGrade: 'Sahih',
    }),
  },
  // 7. Bukhari 6011 — believers like one body
  {
    pillar: 'ummah',
    titleAnchor: 'title: "Create a neighborhood fund or collection for supporting neighbors in crisis"',
    entry: hadith({
      ref: 'Sahih al-Bukhari 6011',
      arabic: 'مَثَلُ الْمُؤْمِنِينَ فِي تَوَادِّهِمْ وَتَرَاحُمِهِمْ وَتَعَاطُفِهِمْ مَثَلُ الْجَسَدِ إِذَا اشْتَكَى مِنْهُ عُضْوٌ تَدَاعَى لَهُ سَائِرُ الْجَسَدِ بِالسَّهَرِ وَالْحُمَّى',
      translation: 'The believers in their mutual kindness, compassion and sympathy are like one body; when any part of the body suffers, the whole body responds with sleeplessness and fever.',
      hadithGrade: 'Sahih',
    }),
  },
  // 8. Bukhari 6016 — let him not harm his neighbor
  {
    pillar: 'ummah',
    titleAnchor: 'title: "Resolve every identified harm item \u2014 eliminate noise disturbances, clear shared spaces, fix obstructions"',
    entry: hadith({
      ref: 'Sahih al-Bukhari 6016',
      arabic: 'مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلاَ يُؤْذِ جَارَهُ',
      translation: 'He who believes in Allah and the Last Day should not hurt (trouble) his neighbor.',
      hadithGrade: 'Sahih',
    }),
  },
  // 9. Muslim 2699 — concealing faults
  {
    pillar: 'ummah',
    titleAnchor: "title: \"Never discuss or expose what you observe of your neighbors' private affairs\"",
    entry: hadith({
      ref: 'Sahih Muslim 2699',
      arabic: 'وَمَنْ سَتَرَ مُسْلِمًا سَتَرَهُ اللَّهُ فِي الدُّنْيَا وَالْآخِرَةِ',
      translation: 'Whoever conceals (the faults of) a Muslim, Allah will conceal his faults in this world and the next.',
      hadithGrade: 'Sahih',
    }),
  },
  // 10. Muslim 35 — branches of iman / removing harm
  {
    pillar: 'ummah',
    titleAnchor: 'title: "Walk through every shared space adjacent to your home and note cleanliness, safety, and obstruction issues"',
    entry: hadith({
      ref: 'Sahih Muslim 35',
      arabic: 'الْإِيمَانُ بِضْعٌ وَسِتُّونَ شُعْبَةً ... وَأَدْنَاهَا إِمَاطَةُ الْأَذَى عَنِ الطَّرِيقِ',
      translation: 'Faith (Iman) has over sixty branches ... and the least of which is removing a harmful object from the road.',
      hadithGrade: 'Sahih',
    }),
  },
  // 11. Tirmidhi 2007 — neighbor kindness (×2 of 2)
  {
    pillar: 'ummah',
    titleAnchor: "title: \"Adopt the prophetic principle: never respond to a neighbor's harm with harm\"",
    entry: hadith({
      ref: 'Jami at-Tirmidhi 2007',
      arabic: 'مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلاَ يُؤْذِ جَارَهُ',
      translation: 'He who believes in Allah and the Last Day should not hurt (trouble) his neighbor.',
      hadithGrade: 'Sahih',
      ratNote: 'NotebookLM Muslim Scholar matched the topical content (neighborly principle) — sunnah.com cross-reference verification recommended for exact ref→text alignment.',
    }),
  },
  // 12. Bukhari 2320 — planting a tree (×1 of 2)
  {
    pillar: 'ummah',
    titleAnchor: "title: 'Assign Islamic spiritual themes and key Quranic ayat to each season'",
    entry: hadith({
      ref: 'Sahih al-Bukhari 2320',
      arabic: 'مَا مِنْ مُسْلِمٍ يَغْرِسُ غَرْسًا، أَوْ يَزْرَعُ زَرْعًا، فَيَأْكُلُ مِنْهُ طَيْرٌ أَوْ إِنْسَانٌ أَوْ بَهِيمَةٌ، إِلاَّ كَانَ لَهُ بِهِ صَدَقَةٌ',
      translation: 'There is none amongst the Muslims who plants a tree or sows seeds, and then a bird, or a person or an animal eats from it, but is regarded as a charitable gift (sadaqah) for him.',
      hadithGrade: 'Sahih',
    }),
  },
  // 13. Bukhari 2320 — planting (×2 of 2)
  {
    pillar: 'ummah',
    titleAnchor: "title: 'Organise communal planting days with sadaqah jariyah intention'",
    entry: hadith({
      ref: 'Sahih al-Bukhari 2320',
      arabic: 'مَا مِنْ مُسْلِمٍ يَغْرِسُ غَرْسًا، أَوْ يَزْرَعُ زَرْعًا، فَيَأْكُلُ مِنْهُ طَيْرٌ أَوْ إِنْسَانٌ أَوْ بَهِيمَةٌ، إِلاَّ كَانَ لَهُ بِهِ صَدَقَةٌ',
      translation: 'There is none amongst the Muslims who plants a tree or sows seeds, and then a bird, or a person or an animal eats from it, but is regarded as a charitable gift (sadaqah) for him.',
      hadithGrade: 'Sahih',
    }),
  },
];

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
    const anchorIdx = src.indexOf(titleAnchor);
    if (anchorIdx < 0) {
      console.warn(`[SKIP] ${pillar}: anchor not found → ${titleAnchor.slice(0, 80)}`);
      totalSkipped++;
      continue;
    }
    const closingMarker = '          ],\n          description:';
    const closingIdx = src.indexOf(closingMarker, anchorIdx);
    if (closingIdx < 0) {
      console.warn(`[SKIP] ${pillar}: closing marker not found after ${titleAnchor.slice(0, 60)}`);
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
