// Curated Quranic wisdom payloads for non-Faith module wheels.
//
// Each entry: { arabic, english, citation }. Pattern matches
// FAITH_PILLAR_WISDOM (src/data/faith-pillar-wisdom.js) — short evocative
// excerpts surfaced by WheelWisdomTooltip after a 1s sustained hover.
//
// All Arabic and English text below was fetched verbatim from the Muslim
// Scholar canonical corpus (NotebookLM `1c17b03b` / quran.com via MCP) on
// 2026-04-25. Arabic edition: ar-simple-clean. English edition:
// en-sahih-international. Per the Amanah Gate, no Quranic text on this
// page was produced from memory.
//
// `moontrance` and `ogden` entries remain stubs — they map to internal
// system semantics (CSRA tiers, project tools), not Maqasid life domains,
// and a top-level Moontrance MODULE_ATTRS entry must be authored before
// citation work proceeds (see decision 2026-04-25-milos-pre-test-tier-1-fixes).

const stub = (label) => ({
  arabic: '',
  english: `Wisdom for ${label} is being curated. Reflection coming soon.`,
  citation: '',
});

export const PILLAR_WISDOM = {
  health: {
    physical: {
      arabic: 'وَلَا تُلْقُوا بِأَيْدِيكُمْ إِلَى التَّهْلُكَةِ',
      english: '"And do not throw [yourselves] with your [own] hands into destruction."',
      citation: "Qur'an 2:195",
    },
    mental: {
      arabic: 'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ',
      english: '"By the remembrance of Allah hearts are assured."',
      citation: "Qur'an 13:28",
    },
    safety: {
      arabic: 'الَّذِي أَطْعَمَهُم مِّن جُوعٍ وَآمَنَهُم مِّنْ خَوْفٍ',
      english: '"Who has fed them from hunger and made them safe from fear."',
      citation: "Qur'an 106:4",
    },
    social: {
      arabic: 'إِنَّ أَكْرَمَكُمْ عِندَ اللَّهِ أَتْقَاكُمْ',
      english: '"The most noble of you in the sight of Allah is the most righteous."',
      citation: "Qur'an 49:13",
    },
  },
  intellect: {
    learning: {
      arabic: 'اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ',
      english: '"Recite in the name of your Lord who created."',
      citation: "Qur'an 96:1",
    },
    thinking: {
      arabic: 'هَلْ يَسْتَوِي الَّذِينَ يَعْلَمُونَ وَالَّذِينَ لَا يَعْلَمُونَ',
      english: '"Are those who know equal to those who do not know?"',
      citation: "Qur'an 39:9",
    },
    cognitive: {
      arabic: 'وَلَا تَقْفُ مَا لَيْسَ لَكَ بِهِ عِلْمٌ',
      english: '"Do not pursue that of which you have no knowledge."',
      citation: "Qur'an 17:36",
    },
    professional: {
      arabic: 'لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا',
      english: '"To test you as to which of you is best in deed."',
      citation: "Qur'an 67:2",
    },
  },
  family: {
    marriage: {
      arabic: 'وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً',
      english: '"He placed between you affection and mercy."',
      citation: "Qur'an 30:21",
    },
    parenting: {
      arabic: 'يَا بُنَيَّ لَا تُشْرِكْ بِاللَّهِ',
      english: '"O my son, do not associate [anything] with Allah."',
      citation: "Qur'an 31:13",
    },
    kinship: {
      arabic: 'وَاتَّقُوا اللَّهَ الَّذِي تَسَاءَلُونَ بِهِ وَالْأَرْحَامَ',
      english: '"Fear Allah, through whom you ask one another, and the wombs."',
      citation: "Qur'an 4:1",
    },
    home: {
      arabic: 'وَاللَّهُ جَعَلَ لَكُم مِّن بُيُوتِكُمْ سَكَنًا',
      english: '"Allah has made for you from your homes a place of rest."',
      citation: "Qur'an 16:80",
    },
  },
  wealth: {
    earning: {
      arabic: 'كُلُوا مِن طَيِّبَاتِ مَا رَزَقْنَاكُمْ',
      english: '"Eat from the good things which We have provided for you."',
      citation: "Qur'an 2:172",
    },
    financial: {
      arabic: 'لَمْ يُسْرِفُوا وَلَمْ يَقْتُرُوا وَكَانَ بَيْنَ ذَٰلِكَ قَوَامًا',
      english: '"When they spend, [they do so] not excessively or sparingly but are ever, between that, [justly] moderate."',
      citation: "Qur'an 25:67",
    },
    ownership: {
      arabic: 'لَا تَأْكُلُوا أَمْوَالَكُم بَيْنَكُم بِالْبَاطِلِ',
      english: '"Do not consume one another\'s wealth unjustly."',
      citation: "Qur'an 4:29",
    },
    circulation: {
      arabic: 'كَيْ لَا يَكُونَ دُولَةً بَيْنَ الْأَغْنِيَاءِ مِنكُمْ',
      english: '"So that it will not be a perpetual distribution among the rich from among you."',
      citation: "Qur'an 59:7",
    },
  },
  environment: {
    resource: {
      arabic: 'وَكُلُوا وَاشْرَبُوا وَلَا تُسْرِفُوا',
      english: '"Eat and drink, but be not excessive."',
      citation: "Qur'an 7:31",
    },
    waste: {
      arabic: 'إِنَّ الْمُبَذِّرِينَ كَانُوا إِخْوَانَ الشَّيَاطِينِ',
      english: '"Indeed, the wasteful are brothers of the devils."',
      citation: "Qur'an 17:27",
    },
    ecosystem: {
      arabic: 'وَمَا مِن دَابَّةٍ فِي الْأَرْضِ ... إِلَّا أُمَمٌ أَمْثَالُكُم',
      english: '"There is no creature on the earth or bird that flies with its wings except [that they are] communities like you."',
      citation: "Qur'an 6:38",
    },
    sourcing: {
      arabic: 'كُلُوا مِمَّا فِي الْأَرْضِ حَلَالًا طَيِّبًا',
      english: '"Eat from whatever is on earth [that is] lawful and good."',
      citation: "Qur'an 2:168",
    },
  },
  ummah: {
    collective: {
      arabic: 'وَاعْتَصِمُوا بِحَبْلِ اللَّهِ جَمِيعًا وَلَا تَفَرَّقُوا',
      english: '"Hold firmly to the rope of Allah all together and do not become divided."',
      citation: "Qur'an 3:103",
    },
    neighbors: {
      arabic: 'وَالْجَارِ ذِي الْقُرْبَىٰ وَالْجَارِ الْجُنُبِ',
      english: '"The near neighbor, the neighbor farther away."',
      citation: "Qur'an 4:36",
    },
    community: {
      arabic: 'إِنَّمَا الْمُؤْمِنُونَ إِخْوَةٌ',
      english: '"The believers are but brothers."',
      citation: "Qur'an 49:10",
    },
  },
  moontrance: {
    'moontrance-land':      stub('Moontrance Land'),
    'moontrance-seasonal':  stub('Moontrance Seasonal'),
    'moontrance-residency': stub('Moontrance Residency'),
  },
  ogden: {
    bbos:    stub('BBOS'),
    milos:   stub('MILOS'),
    atlas:   stub('Atlas'),
  },
};

export default PILLAR_WISDOM;
