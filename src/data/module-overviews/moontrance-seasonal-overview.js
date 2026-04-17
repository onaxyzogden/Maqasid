// Moontrance Seasonal module — Overview cards + Maqasid framework data.
// Seasonal participation pathway: planting, tending, harvest, reflection.
// Quranic text grounded via quran.ai MCP (fetch_quran + fetch_translation,
// editions: ar-simple-clean, en-abdel-haleem) for ayat 6:99, 36:33-35, 14:24-25.

export const OVERVIEW = [
  {
    id: 'ghars',
    name: 'Ghars',
    arabic: '\u063A\u0631\u0633',
    meaning: 'Planting Faith (Spring)',
    order: 1,
    ayahKey: '6:99',
    ayahArabic:
      '\u0648\u0647\u0648 \u0627\u0644\u0630\u064A \u0623\u0646\u0632\u0644 \u0645\u0646 \u0627\u0644\u0633\u0645\u0627\u0621 \u0645\u0627\u0621 \u0641\u0623\u062E\u0631\u062C\u0646\u0627 \u0628\u0647 \u0646\u0628\u0627\u062A \u0643\u0644 \u0634\u064A\u0621',
    ayahTranslation:
      'It is He who sends down water from the sky and with it We produce vegetation of all kinds...',
    description:
      'Spring on Moontrance land is Ghars \u2014 planting faith into the soil. Participants arrive to prepare beds, plant seeds, and establish water systems for the growing season. Every act of planting is framed as sadaqah jariyah: charity that continues to give as long as the plant lives, feeds, and shelters. The daily rhythm is anchored by salah in jama\u2018ah on the land.',
    conditions: [
      'Soil preparation completed before planting begins \u2014 compost, amendments, bed formation',
      'Seed selection prioritises heritage, open-pollinated, and regionally adapted varieties',
      'Water systems tested and operational before the first planting day',
      'Daily salah in jama\u2018ah is the non-negotiable anchor of the seasonal programme',
      'Children participate in age-appropriate planting tasks as tarbiyah',
    ],
    virtues: [
      'Every seed planted with intention is recorded as ongoing charity (Sahih al-Bukhari 2320)',
      'Spring participation builds the physical and spiritual foundation for the entire year',
      'Working the soil together creates bonds that classroom settings cannot replicate',
      'Children who plant and tend develop a visceral understanding of provision (rizq)',
    ],
  },
  {
    id: 'ri-ayah',
    name: 'Ri\u2018\u0101yah',
    arabic: '\u0631\u0639\u0627\u064A\u0629',
    meaning: 'Carrying Through (Summer)',
    order: 2,
    ayahKey: '36:33-35',
    ayahArabic:
      '\u0648\u0622\u064A\u0629 \u0644\u0647\u0645 \u0627\u0644\u0623\u0631\u0636 \u0627\u0644\u0645\u064A\u062A\u0629 \u0623\u062D\u064A\u064A\u0646\u0627\u0647\u0627 \u0648\u0623\u062E\u0631\u062C\u0646\u0627 \u0645\u0646\u0647\u0627 \u062D\u0628\u064B\u0627 \u0641\u0645\u0646\u0647 \u064A\u0623\u0643\u0644\u0648\u0646',
    ayahTranslation:
      'There is a sign for them in the lifeless earth: We give it life and produce grain from it for them to eat...',
    description:
      'Summer is Ri\u2018ayah \u2014 the season of carrying through. The land is alive and demands daily attention: watering, weeding, pest management, and harvest of early crops. This is also the season of diyafah (hospitality) \u2014 Moontrance hosts guests for faith-designed experiences on the land. The rhythm of fajr-to-isha structures every day.',
    conditions: [
      'Daily tending schedule maintained \u2014 irrigation, weeding, pest observation',
      'Guest hospitality programme active \u2014 guided walks, overnight stays, farm-to-iftar',
      'Early harvest begins: herbs, greens, summer vegetables distributed to community',
      'Tarbiyah programming intensifies \u2014 children engaged in daily farm and learning activities',
      'Heat management for workers and guests \u2014 shade, hydration, adjusted work hours',
    ],
    virtues: [
      'The dead earth brought to life is a sign of resurrection \u2014 working the land is tafakkur in action',
      'Hospitality on the land becomes da\u2018wah without a single word spoken',
      'The discipline of daily tending builds sabr (patience) and tawakkul (reliance on Allah)',
      'Sharing the first harvest with neighbours fulfils the sunnah of generosity',
    ],
  },
  {
    id: 'hisab',
    name: '\u1e24is\u0101b',
    arabic: '\u062D\u0650\u0633\u0627\u0628',
    meaning: 'Reckoning (Autumn)',
    order: 3,
    ayahKey: '14:24-25',
    ayahArabic:
      '\u0623\u0644\u0645 \u062A\u0631 \u0643\u064A\u0641 \u0636\u0631\u0628 \u0627\u0644\u0644\u0647 \u0645\u062B\u0644\u0627 \u0643\u0644\u0645\u0629 \u0637\u064A\u0628\u0629 \u0643\u0634\u062C\u0631\u0629 \u0637\u064A\u0628\u0629 \u0623\u0635\u0644\u0647\u0627 \u062B\u0627\u0628\u062A \u0648\u0641\u0631\u0639\u0647\u0627 \u0641\u064A \u0627\u0644\u0633\u0645\u0627\u0621',
    ayahTranslation:
      'Do you not see how God makes comparisons? A good word is like a good tree whose root is firm and whose branches are high...',
    description:
      'Autumn is Hisab \u2014 the reckoning. The main harvest reveals what the year\u2019s stewardship produced. Preservation, seed-saving, and winterisation prepare the land for stillness. This is also a season of honest assessment: what worked, what failed, what must change. The community gathers for shura (consultation) to evaluate the year and plan the next.',
    conditions: [
      'Main harvest completed with proper handling, storage, and distribution',
      'Seed-saving programme active \u2014 heritage varieties preserved for next season',
      'Food preservation: drying, canning, fermentation for winter provision',
      'Infrastructure winterised \u2014 water systems drained, tools maintained, structures secured',
      'Annual community shura held to assess the year and set direction for the next',
    ],
    virtues: [
      'A good tree with firm roots and high branches \u2014 the fruit of patient, principled work',
      'Seed-saving is an act of trust in the future and obedience to the cycle Allah established',
      'Honest self-assessment (muhasabah) applied to land stewardship builds institutional integrity',
      'The community that reckon together grow together \u2014 shura prevents drift',
    ],
  },
  {
    id: 'sukun',
    name: 'Suk\u016Bn',
    arabic: '\u0633\u064F\u0643\u0648\u0646',
    meaning: 'Stillness (Winter)',
    order: 4,
    ayahKey: '30:21',
    ayahArabic:
      '\u0648\u0645\u0646 \u0622\u064A\u0627\u062A\u0647 \u0623\u0646 \u062E\u0644\u0642 \u0644\u0643\u0645 \u0645\u0646 \u0623\u0646\u0641\u0633\u0643\u0645 \u0623\u0632\u0648\u0627\u062C\u0627 \u0644\u062A\u0633\u0643\u0646\u0648\u0627 \u0625\u0644\u064A\u0647\u0627',
    ayahTranslation:
      'Among His signs is that He created spouses from among yourselves for you to live with in tranquillity...',
    description:
      'Winter is Sukun \u2014 stillness. The land rests, and so does the community. This is the season for study, planning, maintenance, and deep reflection. Families gather for indoor learning circles, children continue homeschool immersion, and the leadership team plans the coming year\u2019s programme. The quiet of winter on the land is itself a form of tafakkur.',
    conditions: [
      'Land maintenance: fence repair, tool sharpening, compost turning, infrastructure inspection',
      'Study circles and learning programmes active for adults and children',
      'Next-year planning: crop rotation, guest programme, budget, community goals',
      'Rest and recovery honoured \u2014 no pressure to produce during the stillness season',
      'Community connection maintained through shared meals, prayer, and indoor gatherings',
    ],
    virtues: [
      'Stillness is a sign of Allah \u2014 sukun (tranquillity) is built into the rhythm of creation',
      'A community that rests together avoids burnout and sustains long-term commitment',
      'Winter planning rooted in shura produces better outcomes than reactive decision-making',
      'Children learn that productivity has seasons \u2014 rest is not laziness but obedience to natural rhythm',
    ],
  },
];

export const MAQASID = {
  label: 'Moontrance Seasonal',
  necessities: [
    'Daily salah in jama\u2018ah as the anchor of every seasonal programme',
    'Seasonal calendar aligned with both agricultural and Islamic cycles',
    'Basic safety and provision for all participants in every season',
  ],
  needs: [
    'Full four-season programme operational: planting, tending, harvest, stillness',
    'Guest hospitality and tarbiyah programming integrated into summer season',
    'Annual community shura for assessment and forward planning',
  ],
  embelishments: [
    'Seasonal programme becomes a replicable model for other Muslim land communities',
    'Farm-to-iftar and faith-designed experiences attract national participation',
    'Year-round engagement pathway from seasonal visitor to founding resident',
  ],
};
