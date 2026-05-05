// Seed tasks for Moontrance pillar submodules (Land · Seasonal · Residency).
// Each submodule has tasks across CORE, GROWTH, and EXCELLENCE boards.
// Tasks are placed in the "To Do" column by default.
//
// Board IDs are `moontrance_<submodule>_<level>` (renamed 2026-05-03 from
// `ummah_moontrance-<submodule>_<level>` as part of the Moontrance hard-split
// from Ummah). The `moduleId` field on each board entry in project-store.js
// remains `moontrance-<submodule>` — the CeremonyGuard moduleId is unchanged.
// Existing-user localStorage is migrated by `migrateMoontranceBoardIds_v1`.

export const MOONTRANCE_SEED_TASKS = {

  // ── MOONTRANCE LAND ──

  moontrance_land_core: [
    {
      title: 'Conduct a comprehensive soil assessment — map soil types, pH, organic matter, and contamination across the entire land parcel',
      priority: 'urgent', tags: ['soil', 'khilafah-al-ard'],
      description: 'Before any planting or building can begin, you must know exactly what the soil holds and what it lacks. Allah placed us as khulafa (stewards) on this earth (Quran 2:30), and a steward who acts without knowledge of what they tend is negligent. This assessment provides the baseline truth about the land\'s condition.',
      subtasks: [
        { title: 'Walk the full land boundary and mark distinct soil zones by colour, texture, and drainage', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:30",
              arabic: "وَإِذْ قَالَ رَبُّكَ لِلْمَلَائِكَةِ إِنِّي جَاعِلٌ فِي الْأَرْضِ خَلِيفَةً",
              translation: "And when your Lord said to the angels, \"Indeed, I will make upon the earth a khalifah (successive authority).\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 7:56",
              arabic: "وَلَا تُفْسِدُوا فِي الْأَرْضِ بَعْدَ إِصْلَاحِهَا",
              translation: "And cause not corruption upon the earth after its reformation.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 1552",
              translation: "The Prophet (peace be upon him) said: \"Whoever cultivates barren land, it belongs to him. And there is no right for an unjust root (one who wrongfully plants on another's land).\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Different soil zones behave differently — sandy patches drain fast while clay sections hold water and compact easily. The Quran speaks of dead land that Allah revives with rain (36:33), but revival requires knowing what lies beneath. Walking every metre of the boundary embeds the land in your memory and your body, transforming you from an abstract owner into a present steward who can speak to every corner of the trust.


**How?**

1. Print or draw a rough map of the land parcel with its boundary lines and any existing features (trees, structures, waterways).
2. Walk the boundary systematically, starting at one corner and working clockwise.
3. At every 20-metre interval, dig a small hole (15-20cm deep), examine the soil colour (dark brown = high organic matter, red = iron-rich, grey = waterlogged), texture (rub between fingers: gritty = sand, smooth = silt, sticky = clay), and note how water sits or drains.
4. Mark each observation point on your map with a code: S for sandy, C for clay, L for loam, W for waterlogged.
5. Note any areas with unusual smells, discolouration, or debris that may indicate contamination.
6. Photograph each sample point with the hole visible for your records.
7. Completion indicator: an annotated map showing distinct soil zones across the entire parcel, with at least one observation per 20-metre section.` },
        { title: 'Collect soil samples from each zone and send for laboratory analysis of pH, nutrients, and contaminants', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 30:41",
              arabic: "ظَهَرَ الْفَسَادُ فِي الْبَرِّ وَالْبَحْرِ بِمَا كَسَبَتْ أَيْدِي النَّاسِ",
              translation: "Corruption has appeared throughout the land and sea because of what the hands of people have earned.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 2:30",
              arabic: "إِنِّي جَاعِلٌ فِي الْأَرْضِ خَلِيفَةً",
              translation: "Indeed, I will make upon the earth a successive authority.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 7:56",
              arabic: "وَلَا تُفْسِدُوا۟ فِى ٱلْأَرْضِ بَعْدَ إِصْلَـٰحِهَا وَٱدْعُوهُ خَوْفًۭا وَطَمَعًا ۚ إِنَّ رَحْمَتَ ٱللَّهِ قَرِيبٌۭ مِّنَ ٱلْمُحْسِنِينَ",
              translation: "do not corrupt the earth after it has been set right- call on Him fearing and hoping. The mercy of God is close to those who do good.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2320",
              translation: "The Prophet (peace be upon him) said: \"There is no Muslim who plants a tree or sows seeds, and then a bird, or a person, or an animal eats from it, except that it is regarded as a charitable gift (sadaqah) for him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Your hands can tell you texture and colour, but they cannot tell you pH, nitrogen levels, phosphorus, potassium, heavy metals, or pesticide residues. Laboratory analysis reveals what the naked eye cannot — and acting on incomplete data risks harming the very earth you seek to restore. The principle of islah (restoration, Quran 7:56) demands precision: you cannot heal what you have not diagnosed.


**How?**

1. For each distinct soil zone identified in your walkthrough, collect a composite sample: take 5-6 small scoops from different points within the zone at a depth of 15cm, mix them in a clean bucket, then bag approximately 500g in a labelled ziplock bag.
2. Label each bag clearly with the zone code, date, and GPS coordinates or map reference.
3. Contact your local agricultural extension office or a certified soil laboratory — most regions have affordable testing services.
4. Request a standard fertility panel (pH, organic matter percentage, nitrogen, phosphorus, potassium, calcium, magnesium) plus a contamination screen (heavy metals, residual herbicides/pesticides).
5. Keep samples cool and deliver within 48 hours for accurate results.
6. When results arrive, create a summary table linking each zone to its lab values.
7. Completion indicator: a lab report for every identified soil zone, with a summary table ready for restoration planning.` },
        { title: 'Research the land history — previous use, chemical applications, and indigenous vegetation', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 7:56",
              arabic: "وَلَا تُفْسِدُوا فِي الْأَرْضِ بَعْدَ إِصْلَاحِهَا وَادْعُوهُ خَوْفًا وَطَمَعًا ۚ إِنَّ رَحْمَتَ اللَّهِ قَرِيبٌ مِّنَ الْمُحْسِنِينَ",
              translation: "do not corrupt the earth after it has been set right — call on Him fearing and hoping. The mercy of God is close to those who do good.",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              rationale: "researching past land corruption — contamination, chemical applications, industrial use — is the first step in fulfilling this command not to add further corruption",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2327",
              translation: "Narrated Rafi` bin Khadij:We worked on farms more than anybody else in Medina. We used to rent the land at the yield of specific delimited portion of it to be given to the landlord. Sometimes the vegetation of that portion was affected by blights etc., while the rest remained safe and vice versa, so the Prophet (ﷺ) forbade this practice. At that time gold or silver were not used (for renting the land). If they provided the seeds, they would get so-and-so much",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 99:4",
              arabic: "يَوْمَئِذٍ تُحَدِّثُ أَخْبَارَهَا",
              translation: "on that Day, it will tell all",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Verse cited inline in this subtask's description; backfilled into structured sources for SubtaskSources panel rendering.",
            },
          ],
          description: `**Why?**

Land carries the memory of everything done to it. Years of monoculture, herbicide application, or industrial use leave invisible legacies in the soil microbiome and chemical profile. Knowing the land's history protects you from planting into contaminated ground and honours the Islamic principle that the earth is a witness (Quran 99:4) — it will testify to what was done upon it. Understanding what came before guides what restoration must address.


**How?**

1. Visit the local council or land registry office and request historical land-use records for your parcel — these often go back decades and note agricultural, industrial, or residential use.
2. Interview neighbours, previous owners, or long-time residents about what they remember: was it cropland, pasture, orchard, or industrial? Were chemicals sprayed regularly?
3. Search historical aerial photographs (many councils or mapping services archive these) to see how the land changed over time.
4. Identify the indigenous plant species that would naturally grow in your region's climate and soil type by consulting local native plant guides or the agricultural extension service.
5. Compare indigenous species to what currently grows on the land — an abundance of certain weeds (e.g., docks, thistles) indicates compaction or nutrient imbalance.
6. Document everything in a single "Land History" file with dates, sources, and findings.
7. Completion indicator: a written land history document covering at least the last 30 years of use, chemical exposure, and native vegetation baseline.` },
        { title: 'Create a soil restoration plan with organic amendments, cover crops, and a phased timeline', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 50:9",
              arabic: "وَنَزَّلْنَا مِنَ السَّمَاءِ مَاءً مُّبَارَكًا فَأَنبَتْنَا بِهِ جَنَّاتٍ وَحَبَّ الْحَصِيدِ",
              translation: "And We have sent down blessed rain from the sky and made grow thereby gardens and grain from the harvest.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 26:7",
              arabic: "أَوَلَمْ يَرَوْا إِلَى الْأَرْضِ كَمْ أَنبَتْنَا فِيهَا مِن كُلِّ زَوْجٍ كَرِيمٍ",
              translation: "Did they not look at the earth — how much We have produced therein from every noble kind?",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 7:56",
              arabic: "وَلَا تُفْسِدُوا۟ فِى ٱلْأَرْضِ بَعْدَ إِصْلَـٰحِهَا وَٱدْعُوهُ خَوْفًۭا وَطَمَعًا ۚ إِنَّ رَحْمَتَ ٱللَّهِ قَرِيبٌۭ مِّنَ ٱلْمُحْسِنِينَ",
              translation: "do not corrupt the earth after it has been set right- call on Him fearing and hoping. The mercy of God is close to those who do good.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 1552",
              translation: "The Prophet (peace be upon him) said: \"Whoever cultivates barren land, it belongs to him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Assessment without a plan is diagnosis without treatment. The soil lab results and land history have revealed what is depleted, contaminated, or compacted — now you must design the cure. Islah al-Turbah (soil restoration) is a direct enactment of Quran 7:56: "Do not cause corruption on the earth after it has been set in order." A phased plan ensures you rebuild the soil biology methodically rather than guessing or overwhelming the land with inputs it cannot absorb.


**How?**

1. For each soil zone, list the specific deficiencies and problems identified (e.g., low pH, depleted organic matter, compaction, heavy metal contamination).
2. Match each problem to an organic amendment: compost for organic matter, lime for low pH, gypsum for sodic clay, biochar for carbon sequestration and contaminant binding, specific cover crops for nitrogen fixation (clover, vetch) or compaction breaking (daikon radish).
3. Sequence the amendments logically — address contamination and pH first, then build organic matter, then introduce living roots.
4. Create a phased timeline: Phase 1 (months 1-3) for critical corrections, Phase 2 (months 4-9) for cover cropping and organic matter building, Phase 3 (months 10-18) for establishing permanent plantings.
5. Estimate quantities and costs for each amendment per zone (e.g., 10 tonnes of compost per hectare at a given price).
6. Identify local sources for each input — prioritise on-site or nearby organic waste streams to keep the system as closed-loop as possible.
7. Completion indicator: a written, phased soil restoration plan with specific amendments, quantities, costs, and a timeline covering at least 18 months.` },
        { title: 'Establish soil health monitoring stations and schedule quarterly testing', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Musnad Ahmad 12902",
              translation: "The Prophet (peace be upon him) said: \"Even if the Hour is about to be established and one of you has a sapling in his hand, let him plant it.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "This hadith affirms the virtue of cultivating the earth and monitoring its health even in the face of uncertainty.",
            },
          ],
          description: `**Why?**

Restoration is not a one-time event but a living process that must be tracked. Without monitoring, you cannot know whether your amendments are working, whether new problems are emerging, or when the soil has reached a healthy baseline. The Prophetic principle of itqan (striving for excellence in every endeavour) requires measurement — you honour the land by observing its response with the same care you gave to the initial assessment.


**How?**

1. Select 3-5 permanent monitoring stations across the land, representing each major soil zone.
2. Mark each station with a durable stake or GPS waypoint so you return to the exact location each time.
3. At each station, take a baseline measurement now: dig a 30cm profile, photograph it, note colour and structure, and collect a sample for lab testing.
4. Record biological indicators at each station: earthworm count per shovel-full, visible fungal hyphae, root depth, and surface crust presence.
5. Create a monitoring log (spreadsheet or notebook) with columns for date, station, pH, organic matter, earthworm count, root depth, and notes.
6. Schedule quarterly visits — set calendar reminders for every 3 months — and send samples to the same lab each time for consistency.
7. Completion indicator: permanent monitoring stations installed, baseline readings recorded, and a quarterly testing schedule in the calendar for the next 2 years.` },
      ],
    },
    {
      title: 'Design a water systems plan — map sources, drainage, and irrigation needs for the entire land parcel',
      priority: 'urgent', tags: ['water', 'nizam-al-miyah'],
      description: 'Water is the lifeblood of any land. Allah says He laid out the earth for His creatures with fruit-laden palms and husked grain (Quran 55:10-12), but none of this grows without intentional water management. This task designs the complete water architecture before a single pipe is laid or swale is dug.',
      subtasks: [
        { title: 'Map all existing water sources — wells, boreholes, streams, springs, and municipal connections', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 21:30",
              arabic: "وَجَعَلْنَا مِنَ الْمَاءِ كُلَّ شَيْءٍ حَيٍّ",
              translation: "And We made from water every living thing.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 54:11-12",
              arabic: "فَفَتَحْنَا أَبْوَابَ السَّمَاءِ بِمَاءٍ مُّنْهَمِرٍ وَفَجَّرْنَا الْأَرْضَ عُيُونًا",
              translation: "Then We opened the gates of the heaven with rain pouring down and caused the earth to burst with springs.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 3477",
              translation: "The Prophet (peace be upon him) said: \"Muslims share in three things: water, pasture, and fire.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

You cannot design a water system for land you do not understand hydrologically. Every water source has a different yield, quality, legal status, and seasonal reliability. The Quran describes water as the origin of every living thing (21:30), and a steward must know exactly where this life-giving resource enters the land. Mapping sources prevents both over-reliance on a single supply and ignorance of resources already present.


**How?**

1. Walk the entire land parcel with a focus on water — look for springs, seeps, wet patches, seasonal streams, ditches, and any installed infrastructure (wells, boreholes, tanks, municipal meter points).
2. For each source found, record its location on your land map, its type, and an estimate of its output (litres per minute for a well or spring, flow rate for a stream).
3. Check legal records for water rights, bore permits, and any easements related to watercourses crossing or bordering your land.
4. Test water quality from each source — at minimum pH, salinity, and microbial contamination — either with a field kit or by sending samples to a lab.
5. Note seasonal variation: ask neighbours or review historical data on whether springs dry up in summer or streams flood in winter.
6. Identify the municipal water connection point and its capacity, pressure, and cost per unit.
7. Completion indicator: an annotated water source map with yield estimates, quality data, legal status, and seasonal notes for every source on or bordering the land.` },
        { title: 'Survey the land topography and mark natural drainage patterns, catchment areas, and flood zones', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 23:18",
              arabic: "وَأَنزَلْنَا مِنَ السَّمَاءِ مَاءً بِقَدَرٍ فَأَسْكَنَّاهُ فِي الْأَرْضِ وَإِنَّا عَلَىٰ ذَهَابٍ بِهِ لَقَادِرُونَ",
              translation: "And We sent down water from the sky in a measured amount and settled it in the earth. And indeed, We are Able to take it away.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 7:57",
              arabic: "وَهُوَ الَّذِي يُرْسِلُ الرِّيَاحَ بُشْرًا بَيْنَ يَدَيْ رَحْمَتِهِ",
              translation: "And it is He who sends the winds as good tidings before His mercy.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 13:17",
              arabic: "أَنزَلَ مِنَ ٱلسَّمَآءِ مَآءًۭ فَسَالَتْ أَوْدِيَةٌۢ بِقَدَرِهَا فَٱحْتَمَلَ ٱلسَّيْلُ زَبَدًۭا رَّابِيًۭا ۚ وَمِمَّا يُوقِدُونَ عَلَيْهِ فِى ٱلنَّارِ ٱبْتِغَآءَ حِلْيَةٍ أَوْ مَتَـٰعٍۢ زَبَدٌۭ مِّثْلُهُۥ ۚ كَذَٰلِكَ يَضْرِبُ ٱللَّهُ ٱلْحَقَّ وَٱلْبَـٰطِلَ ۚ فَأَمَّا ٱلزَّبَدُ فَيَذْهَبُ جُفَآءًۭ ۖ وَأَمَّا مَا يَنفَعُ ٱلنَّاسَ فَيَمْكُثُ فِى ٱلْأَرْضِ ۚ كَذَٰلِكَ يَضْرِبُ ٱللَّهُ ٱلْأَمْثَالَ",
              translation: "He sends water from the sky that fills riverbeds to overflowing, each according to its measure. The stream carries on its surface a growing layer of froth, like the froth that appears when people melt metals in the fire to make ornaments and tools: in this way God illustrates truth and falsehood- the froth disappears, but what is of benefit to man stays behind- this is how God makes illustrations.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 3477",
              translation: "The Prophet (peace be upon him) said: \"Muslims share in three things: water, pasture, and fire.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Water flows downhill, and every contour of the land dictates where it gathers, where it runs, and where it pools. Designing irrigation or planting without understanding natural drainage is like building a house without a foundation — the first heavy rain will expose every mistake. Allah created the earth with mountains as pegs and valleys as channels (Quran 13:17), and working with these natural patterns rather than against them is both more effective and more aligned with the principle of following the fitrah (natural order) of creation.


**How?**

1. Obtain a topographic map or elevation data for your parcel — local councils, satellite data (e.g., LIDAR), or a surveyor can provide this.
2. Walk the land after a rain event and observe where water collects, where it flows, and where it exits the property.
3. Mark natural swales, gullies, low points, and ridgelines on your map.
4. Identify the primary catchment area — the total area from which water drains onto your parcel, including uphill neighbours.
5. Note any flood-prone zones where water pools for extended periods after rain.
6. Mark areas where erosion is visible — bare soil on slopes, gullies deepening, or topsoil washing onto paths.
7. Completion indicator: a topographic drainage map overlaid on your land map, showing flow direction, catchment boundaries, pooling zones, and erosion points.` },
        { title: 'Calculate total water demand for planned crops, trees, livestock, and human use', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 56:68-70",
              arabic: "أَفَرَأَيْتُمُ الْمَاءَ الَّذِي تَشْرَبُونَ أَأَنتُمْ أَنزَلْتُمُوهُ مِنَ الْمُزْنِ أَمْ نَحْنُ الْمُنزِلُونَ",
              translation: "Have you seen the water that you drink? Is it you who brought it down from the clouds, or is it We who bring it down?",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 21:30",
              arabic: "وَجَعَلْنَا مِنَ الْمَاءِ كُلَّ شَيْءٍ حَيٍّ",
              translation: "And We made from water every living thing.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 55:7-9",
              arabic: "وَالسَّمَاءَ رَفَعَهَا وَوَضَعَ الْمِيزَانَ أَلَّا تَطْغَوْا فِي الْمِيزَانِ وَأَقِيمُوا الْوَزْنَ بِالْقِسْطِ وَلَا تُخْسِرُوا الْمِيزَانَ",
              translation: "He has raised up the sky. He has set the balance so that you may not exceed in the balance: weigh with justice and do not fall short in the balance.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2320",
              translation: "The Prophet (peace be upon him) said: \"There is no Muslim who plants a tree or sows seeds, and then a bird, or a person, or an animal eats from it, except that it is regarded as sadaqah for him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A water system designed without knowing total demand will either run dry at the worst moment or waste resources on oversized infrastructure. The Islamic principle of qasd (moderation and purposeful allocation) applies directly: every litre allocated should serve a defined need. Calculating demand ensures you design for sufficiency — not excess and not scarcity — honouring the balance Allah placed in creation (Quran 55:7-9).


**How?**

1. List every planned water user on the land: crop types and area, tree species and number, livestock type and count, and human activities (drinking, cooking, washing, wudu).
2. For each crop and tree, look up the water requirement in litres per square metre per growing season — your agricultural extension office or FAO data provides regional figures.
3. For livestock, use standard daily water consumption rates (e.g., a cow needs 40-80 litres/day, chickens 0.5 litres/day each).
4. For human use, estimate based on the number of people regularly on site and standard daily consumption (approximately 50 litres per person per day for basic needs).
5. Sum all demands and convert to a monthly and annual total.
6. Compare total demand to total supply from your mapped sources — identify any deficit or surplus.
7. Completion indicator: a water budget spreadsheet showing monthly demand versus supply, with any deficit highlighted for mitigation in the system design.` },
        { title: 'Design the irrigation layout — gravity-fed lines, drip zones, swales, and overflow paths', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 16:10",
              arabic: "هُوَ الَّذِي أَنزَلَ مِنَ السَّمَاءِ مَاءً لَّكُم مِّنْهُ شَرَابٌ وَمِنْهُ شَجَرٌ فِيهِ تُسِيمُونَ",
              translation: "It is He who sends down rain from the sky; from it is drink and from it is foliage in which you pasture [animals].",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 54:12",
              arabic: "وَفَجَّرْنَا الْأَرْضَ عُيُونًا فَالْتَقَى الْمَاءُ عَلَىٰ أَمْرٍ قَدْ قُدِرَ",
              translation: "And We caused the earth to burst with springs, and the waters met for a matter already predestined.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The irrigation layout is the circulatory system of the land — it determines which plants thrive, which suffer, and how efficiently every drop is used. A gravity-fed design aligned with natural contours minimises energy use and embodies tawakkul (reliance on the systems Allah built into creation rather than brute-force engineering). Drip irrigation directly to root zones eliminates the waste of broadcast sprinklers, honouring the Prophetic prohibition against israf (waste) even at a flowing river.


**How?**

1. Overlay your planting plan on the topographic drainage map to see which crops and trees sit at which elevations.
2. Identify the highest reliable water source (tank, reservoir, or spring) that can serve as the gravity-fed head — the higher the source, the more area it can irrigate without pumps.
3. Design primary supply lines running along contour lines from the head source, branching into secondary lines for each planting zone.
4. Specify drip irrigation for annual crops and young trees (most water-efficient), and micro-sprinklers only where drip is impractical (e.g., dense ground cover).
5. Integrate swales — shallow, contour-following ditches — on slopes to slow runoff, recharge groundwater, and passively irrigate downhill trees.
6. Plan overflow and emergency drainage paths so heavy rain events do not flood planted areas or erode soil.
7. Completion indicator: a complete irrigation layout drawing showing pipe routes, drip zones, swale locations, overflow paths, and connection to each water source, with estimated material quantities.` },
        { title: 'Identify water harvesting opportunities — roof catchment, earthworks, and grey water reuse', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 50:9",
              arabic: "وَنَزَّلْنَا مِنَ السَّمَاءِ مَاءً مُّبَارَكًا فَأَنبَتْنَا بِهِ جَنَّاتٍ وَحَبَّ الْحَصِيدِ",
              translation: "and how We send blessed water down from the sky and grow with it gardens, the harvest grain.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2327",
              translation: "Narrated Rafi' bin Khadij: We worked on farms more than anybody else in Medina. We used to rent the land at the yield of specific delimited portions of it to be given to the landlord. Sometimes the vegetation of that portion was affected by blights, while the rest remained safe and vice versa, so the Prophet (peace be upon him) forbade this practice.",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "the Prophet's attention to fair water-related agricultural arrangements reflects Islamic concern for responsible water stewardship",
            },
          ],
          description: `**Why?**

Harvesting water that falls freely from the sky is one of the most direct expressions of shukr (gratitude) for Allah's provision. Rain is described in the Quran as blessed water (50:9) that revives dead land — letting it run off unused is a form of ingratitude. Grey water reuse extends the life of water already used once, reflecting the Islamic ethic that nothing should be wasted when it can still serve a purpose.


**How?**

1. Measure the total roof area of every structure on the land (sheds, barns, homes) — each square metre of roof captures approximately 1 litre per millimetre of rainfall.
2. Multiply roof area by your region's average annual rainfall to calculate potential roof catchment volume.
3. Identify locations for storage tanks near each roof — gravity-fed is ideal, so place tanks at the lowest roof gutter point but higher than the areas you want to irrigate.
4. Survey the land for earthwork opportunities: swales on contour, small check dams across gullies, and infiltration basins in low areas that can capture overland flow.
5. Assess grey water sources (kitchen sinks, laundry, wudu water) and design a simple filtration system (gravel, sand, reed bed) to make grey water safe for tree and garden irrigation.
6. Calculate the total additional water available from all harvesting sources and add it to your water budget.
7. Completion indicator: a water harvesting plan with roof catchment volumes, earthwork locations, grey water system design, and updated water budget showing reduced deficit or increased surplus.` },
      ],
    },
    {
      title: 'Establish the legal land trust and Islamic covenant — protect the land from sale, speculation, and misuse',
      priority: 'urgent', tags: ['waqf', 'amanah', 'legal'],
      description: 'Land in Islam is amanah (trust), not a commodity for speculation. Without a legal structure that enshrines stewardship, future generations or external pressures could convert this sacred trust into a market asset. This task creates the legal and covenantal framework that protects the land in perpetuity.',
      subtasks: [
        { title: 'Research Islamic waqf structures and their modern legal equivalents in your jurisdiction', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 5:42",
              arabic: "سَمَّاعُونَ لِلْكَذِبِ أَكَّالُونَ لِلسُّحْتِ ۚ فَإِن جَاءُوكَ فَاحْكُم بَيْنَهُمْ أَوْ أَعْرِضْ عَنْهُمْ ۖ وَإِن تُعْرِضْ عَنْهُمْ فَلَن يَضُرُّوكَ شَيْئًا ۖ وَإِنْ حَكَمْتَ فَاحْكُم بَيْنَهُم بِالْقِسْطِ ۚ إِنَّ اللَّهَ يُحِبُّ الْمُقْسِطِينَ",
              translation: "they listen eagerly to lies and consume what is unlawful... if you do judge between them, judge justly: God loves the just.",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              rationale: "structuring waqf legally must reflect Islamic justice — the structure must be equitable and enforceable, not merely nominal",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2737",
              translation: "Narrated Ibn Umar: Umar bin al-Khattab got some land in Khaibar, so he came to the Prophet (peace be upon him) and asked him to advise him about it. The Prophet said, \"If you like, you can make the land as an endowment (waqf), and give its fruits in charity.\" So Umar gave it in charity as an endowment on the condition that it would not be sold, nor given as a present, nor inherited — but its yield would be given in charity to the poor, to relatives, for freeing slaves, for Allah's cause, to travellers, and guests.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Waqf (Islamic endowment) is one of the oldest and most powerful legal instruments for permanently dedicating an asset to a beneficial purpose. Historically, waqf has protected mosques, hospitals, farms, and water sources for centuries. Understanding how waqf translates into your jurisdiction's legal framework — whether as a charitable trust, community land trust, or conservation easement — is essential before drafting any documents. You must know what is legally enforceable before you can protect the land.


**How?**

1. Study the classical Islamic waqf conditions: the asset must be permanently dedicated, its benefits must flow to a specified purpose, and it cannot be sold, gifted, or inherited as private property.
2. Research your jurisdiction's equivalent structures: community land trusts (CLTs), charitable trusts, conservation easements, or cooperative land ownership.
3. Consult with a solicitor or attorney who specialises in land trusts or charitable organisations to understand which structure best maps to waqf principles.
4. Contact existing Islamic land trusts or waqf boards in your country for precedent documents and lessons learned.
5. Compare each option on key criteria: permanence of protection, governance flexibility, tax implications, and alignment with Islamic principles.
6. Document your findings in a comparison table with pros and cons for each structure.
7. Completion indicator: a written comparison of at least 3 legal structures with a recommendation for the one that best protects the land as waqf-like trust in your jurisdiction.` },
        { title: 'Draft an Islamic covenant document defining the land purpose, permitted uses, and prohibited activities', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:30",
              arabic: "إِنِّي جَاعِلٌ فِي الْأَرْضِ خَلِيفَةً",
              translation: "Indeed, I will make upon the earth a successive authority.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 33:72",
              arabic: "إِنَّا عَرَضْنَا الْأَمَانَةَ عَلَى السَّمَاوَاتِ وَالْأَرْضِ وَالْجِبَالِ فَأَبَيْنَ أَن يَحْمِلْنَهَا وَأَشْفَقْنَ مِنْهَا وَحَمَلَهَا الْإِنسَانُ",
              translation: "Indeed, We offered the Trust to the heavens and the earth and the mountains, and they declined to bear it and feared it; but man bore it.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2737",
              translation: "The Prophet (peace be upon him) said: \"When the land is made waqf, it cannot be sold, given as a gift, or inherited.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A legal structure without a guiding covenant is a body without a soul. The covenant is the document that expresses why this land exists as a trust, what activities honour that purpose, and what is absolutely prohibited. It is the land's constitution — grounded in Quranic principles and the maqasid al-shariah. Without it, future trustees may drift from the original vision, allowing commercial exploitation, chemical farming, or other practices that violate the amanah.


**How?**

1. Open with a preamble stating the Islamic foundation: the land is held as amanah from Allah, stewardship (khilafah) is the guiding principle, and the purpose is to serve the community through regenerative, halal use.
2. Define permitted uses explicitly: regenerative agriculture, food production for community, education, spiritual retreat, wildlife habitat, and water stewardship.
3. Define prohibited activities explicitly: sale of the land for profit, use of synthetic chemicals or GMOs, factory farming, resource extraction (mining, fracking), speculative development, and any activity involving riba (interest-based financing).
4. Include governance provisions: how trustees are appointed, how decisions are made (shura — consultation), and how disputes are resolved.
5. Include a succession clause: what happens if the founding trustees can no longer serve — the covenant must outlive any individual.
6. Have the draft reviewed by both an Islamic scholar familiar with waqf and a solicitor familiar with your jurisdiction's trust law.
7. Completion indicator: a complete covenant document reviewed by both Islamic and legal advisors, ready for adoption by the founding trustees.` },
        { title: 'Register the land trust or covenant with the appropriate legal authority', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 23:8",
              arabic: "وَالَّذِينَ هُمْ لِأَمَانَاتِهِمْ وَعَهْدِهِمْ رَاعُونَ",
              translation: "who are faithful to their trusts and pledges\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 70:32",
              arabic: "وَالَّذِينَ هُمْ لِأَمَانَاتِهِمْ وَعَهْدِهِمْ رَاعُونَ",
              translation: "who are faithful to their trusts and their pledges\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 81:21",
              arabic: "مُّطَاعٍ ثَمَّ أَمِينٍ",
              translation: "he is obeyed there and worthy of trust.",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              rationale: "legal registration embodies the Quranic character of trustworthiness — making the covenant enforceable so future generations cannot break it",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2737",
              translation: "Narrated Ibn Umar: Umar bin al-Khattab got some land in Khaibar, so he came to the Prophet (peace be upon him) and asked him to advise him about it. The Prophet said, \"If you like, you can make the land as an endowment (waqf), and give its fruits in charity.\" So Umar gave it in charity as an endowment on the condition that it would not be sold, nor given as a present, nor inherited — but its yield would be given in charity.",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Umar's formal endowment of the Khaibar land is the Prophetic precedent for legally registering a land covenant to protect it from alienation",
            },
          ],
          description: `**Why?**

A covenant that exists only on paper between individuals has no legal teeth. Registration with the appropriate authority — whether a charities commission, land registry, or court — transforms your intentions into enforceable law. This is the step that ensures the land cannot be sold, rezoned, or misused even if future trustees face financial pressure or external buyers offer large sums. The Quran warns against consuming each other's property unjustly (2:188), and registration is the practical barrier against such consumption.


**How?**

1. Finalise the legal structure chosen from your research (community land trust, charitable trust, etc.) and prepare the formation documents with your solicitor.
2. Gather the required documentation: trust deed or articles of incorporation, covenant document, proof of land ownership, identification of founding trustees, and any required financial disclosures.
3. Submit the formation application to the relevant authority — this is typically the charities commission, companies registrar, or land registry depending on your jurisdiction and chosen structure.
4. Pay any registration fees and respond to follow-up queries from the registrar.
5. Once registered, file a restriction or covenant notation on the land title at the land registry to prevent sale without trustee approval.
6. Obtain certified copies of all registered documents and store them securely in at least two locations.
7. Completion indicator: official registration confirmation, a restriction noted on the land title, and certified copies of all documents stored securely.` },
        { title: 'Appoint founding trustees and establish a shura (consultation) governance process', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 42:38",
              arabic: "وَأَمْرُهُمْ شُورَىٰ بَيْنَهُمْ",
              translation: "And whose affair is [determined by] consultation among themselves.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 3:159",
              arabic: "وَشَاوِرْهُمْ فِي الْأَمْرِ",
              translation: "And consult them in the matter.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

No single person should hold unchecked authority over a communal trust. The Quran commands that affairs be conducted through shura — mutual consultation (42:38). Appointing multiple trustees with clear roles and a transparent decision-making process protects against individual error, corruption, and burnout. The governance structure is what ensures the covenant is lived, not just written.


**How?**

1. Identify 3-7 founding trustees who share the vision, represent diverse skills (agriculture, finance, Islamic knowledge, community organising), and are committed to long-term stewardship.
2. Define trustee roles: chairperson, secretary, treasurer, and any specialist roles (e.g., agricultural advisor, community liaison).
3. Draft a governance document specifying: how meetings are called, quorum requirements, voting procedures (consensus preferred, majority as fallback), and how new trustees are nominated and appointed.
4. Include a conflict-of-interest policy — no trustee may benefit financially from land decisions beyond fair compensation for labour.
5. Establish a regular shura schedule: at minimum quarterly meetings, with additional meetings callable by any two trustees.
6. Create a record-keeping system for meeting minutes, decisions, and financial accounts.
7. Completion indicator: founding trustees formally appointed, governance document signed by all trustees, and the first shura meeting scheduled.` },
        { title: 'Create a public declaration of the land covenant and share it with the local Muslim community', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 22:78",
              arabic: "وَجَاهِدُوا فِي اللَّهِ حَقَّ جِهَادِهِ هُوَ اجْتَبَاكُمْ",
              translation: "And strive for Allah with the striving due to Him. He has chosen you.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 2:30",
              arabic: "إِنِّي جَاعِلٌ فِي الْأَرْضِ خَلِيفَةً",
              translation: "Indeed, I will make upon the earth a khalifah.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2737",
              translation: "Umar ibn al-Khattab said to the Prophet about his land in Khaybar, and the Prophet said: \"If you wish, you may hold it as waqf and give its produce in charity.\" So Umar gave it in charity on the condition that it would not be sold, given as a gift, or inherited.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A trust held in secret serves no communal purpose. Publicly declaring the land covenant invites the community into the vision, builds accountability, generates support, and inspires others to dedicate land or resources for similar purposes. Transparency is a hallmark of amanah — the community has a right to know what this land is for and how it is governed.

**How?**

1. Write a clear, accessible summary of the covenant — not the full legal document, but a 1-2 page explanation of the land's purpose, permitted uses, governance, and how the community can participate.
2. Design a simple announcement document or poster that captures the vision in a compelling format.
3. Present the declaration at a Friday khutbah or community gathering, with trustee representatives available to answer questions.
4. Distribute the summary through the local masjid newsletter, community WhatsApp groups, and social media.
5. Host an open day at the land where community members can visit, walk the site, and ask questions.
6. Create a simple website or webpage with the covenant summary, trustee contact details, and a signup form for those who want to participate.
7. Completion indicator: public declaration made at a community gathering, summary distributed through at least 3 channels, and an open day held at the land.` },
      ],
    },
    {
      title: 'Develop the initial planting plan — select species, map zones, and plant the first season',
      priority: 'urgent', tags: ['planting', 'sadaqah-jariyah'],
      description: 'The Prophet (peace be upon him) said: "If a Muslim plants a tree or sows seeds, and then a bird, or a person, or an animal eats from it, it is regarded as a charitable gift (sadaqah) for him" (Bukhari). This task translates that hadith into a practical, soil-appropriate planting plan for the first growing season.',
      subtasks: [
        { title: 'Research climate zone, frost dates, and growing season length for the land location', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 6:99",
              arabic: "وَهُوَ الَّذِي أَنزَلَ مِنَ السَّمَاءِ مَاءً فَأَخْرَجْنَا بِهِ نَبَاتَ كُلِّ شَيْءٍ",
              translation: "And it is He who sends down rain from the sky, and We produce thereby the growth of all things.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 80:24-32",
              arabic: "فَلْيَنظُرِ الْإِنسَانُ إِلَىٰ طَعَامِهِ أَنَّا صَبَبْنَا الْمَاءَ صَبًّا ثُمَّ شَقَقْنَا الْأَرْضَ شَقًّا فَأَنبَتْنَا فِيهَا حَبًّا",
              translation: "Then let mankind look at his food — how We poured down water in torrents, then We broke open the earth, splitting it with sprouts, and caused to grow within it grain.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2320",
              translation: "The Prophet (peace be upon him) said: \"There is no Muslim who plants a tree or sows seeds, and then a bird, or a person, or an animal eats from it, except that it is regarded as sadaqah for him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Planting without knowing your climate zone is like navigating without a compass. Frost dates determine when seedlings can safely go in the ground, growing season length determines which crops can mature, and climate zone determines which perennial trees and shrubs will survive long-term. Allah created seasons and cycles (10:5) for a reason — aligning your planting with these natural rhythms is both practical wisdom and an act of following the divine order embedded in creation.


**How?**

1. Identify your USDA Hardiness Zone (or equivalent regional system) using your postcode or GPS coordinates on an official mapping tool.
2. Look up the average last spring frost date and first autumn frost date for your area — these define your frost-free growing window.
3. Calculate the growing season length in days between the two frost dates.
4. Note average monthly temperatures and rainfall to understand seasonal water availability.
5. Identify any microclimates on your land — south-facing slopes are warmer, low areas collect frost, walls and buildings create shelter.
6. Cross-reference your soil assessment with climate data to narrow the list of viable species.
7. Completion indicator: a documented climate profile including hardiness zone, frost dates, growing season length, monthly temperature and rainfall averages, and identified microclimates.` },
        { title: 'Select crop, tree, and herb species prioritising native, food-producing, and nitrogen-fixing varieties', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 6:141",
              arabic: "وَهُوَ الَّذِي أَنشَأَ جَنَّاتٍ مَّعْرُوشَاتٍ وَغَيْرَ مَعْرُوشَاتٍ وَالنَّخْلَ وَالزَّرْعَ مُخْتَلِفًا أُكُلُهُ",
              translation: "And He it is who causes gardens to grow, both trellised and untrellised, and palm trees and crops of different kinds of food.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 36:33-36",
              arabic: "وَآيَةٌ لَّهُمُ الْأَرْضُ الْمَيْتَةُ أَحْيَيْنَاهَا وَأَخْرَجْنَا مِنْهَا حَبًّا فَمِنْهُ يَأْكُلُونَ",
              translation: "And a sign for them is the dead earth. We have brought it to life and brought forth from it grain, and from it they eat.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2320",
              translation: "The Prophet (peace be upon him) said: \"There is no Muslim who plants a tree or sows seeds, and then a bird, or a person, or an animal eats from it, except that it is regarded as sadaqah for him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Species selection determines whether the land becomes a thriving, self-sustaining ecosystem or a struggling collection of poorly adapted plants. Prioritising native species honours the fitrah (natural order) of the local ecology. Food-producing species fulfil the sadaqah jariyah principle — every fruit eaten is charity. Nitrogen-fixing species (legumes, certain trees) rebuild soil fertility naturally, reducing dependence on external inputs and closing the loop toward self-sufficiency.


**How?**

1. Start with native species lists from your local agricultural extension, native plant society, or permaculture guild database for your climate zone.
2. Filter for food-producing species: fruit trees (apple, pear, fig, pomegranate, olive — depending on zone), berry bushes, nut trees, and perennial vegetables.
3. Include nitrogen-fixing species in every zone: clover and vetch as ground cover, black locust or alder as support trees, and beans or peas in annual beds.
4. Add medicinal herbs that thrive in your zone: mint, chamomile, rosemary, thyme, black seed (Nigella sativa if climate permits).
5. For each selected species, note: sun requirements, water needs, soil preference, mature size, and years to first harvest.
6. Cross-check every species against your soil restoration plan — do not plant heavy feeders in depleted zones until amendments have taken effect.
7. Completion indicator: a species list of at least 20 varieties with growing requirements, categorised as canopy trees, understory trees, shrubs, ground cover, herbs, and annuals.` },
        { title: 'Map planting zones on the land using permaculture sector and zone analysis', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 55:10-12",
              arabic: "وَالْأَرْضَ وَضَعَهَا لِلْأَنَامِ فِيهَا فَاكِهَةٌ وَالنَّخْلُ ذَاتُ الْأَكْمَامِ وَالْحَبُّ ذُو الْعَصْفِ وَالرَّيْحَانُ",
              translation: "And the earth He laid out for the creatures. Therein is fruit and palm trees having sheaths of dates, and grain having husks and scented plants.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 1552",
              translation: "The Prophet (peace be upon him) said: \"Whoever cultivates barren land, it belongs to him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Permaculture zoning places the most labour-intensive plants closest to where people work and live, and the least demanding elements furthest away. This is not merely efficiency — it reflects the Quranic principle of mizan (balance, 55:7-9), ensuring that human energy, water, and attention are distributed proportionally. Without zoning, you will neglect distant plantings, overwork near ones, and create a disorganised layout that frustrates rather than nourishes.


**How?**

1. Mark the primary access point and any buildings or gathering areas on your land map — this is Zone 0, the centre of human activity.
2. Define Zone 1 (0-10 metres from buildings): herbs, salad greens, and daily-harvest crops that need frequent attention.
3. Define Zone 2 (10-30 metres): fruit trees, berry bushes, composting area, and small livestock if planned.
4. Define Zone 3 (30-100 metres): main crop production, grain, and larger orchards.
5. Define Zone 4 (100+ metres): semi-wild areas, timber trees, foraging, and biodiversity corridors.
6. Define Zone 5 (edges and wild corners): completely unmanaged wildlife habitat — the land's "breathing space."
7. Completion indicator: a zoned planting map overlaid on the land map, with each zone labelled and species assigned to appropriate zones.` },
        { title: 'Source seeds, seedlings, and bare-root trees from organic, non-GMO, and local suppliers', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 6:99",
              arabic: "فَأَخْرَجْنَا بِهِ نَبَاتَ كُلِّ شَيْءٍ فَأَخْرَجْنَا مِنْهُ خَضِرًا",
              translation: "And We produce thereby the growth of all things, and We produce from it greenery.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 14:37",
              arabic: "رَّبَّنَا إِنِّي أَسْكَنتُ مِن ذُرِّيَّتِي بِوَادٍ غَيْرِ ذِي زَرْعٍ عِندَ بَيْتِكَ الْمُحَرَّمِ",
              translation: "Our Lord, I have settled some of my descendants in an uncultivated valley near Your sacred House.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2320",
              translation: "The Prophet (peace be upon him) said: \"There is no Muslim who plants a tree or sows seeds, and then a bird, or a person, or an animal eats from it, except that it is regarded as sadaqah for him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The quality and provenance of your planting material determines the health of everything that grows. Organic, non-GMO seeds carry genetic integrity and are adapted to growing without chemical support. Local suppliers often offer varieties already acclimatised to your region. The Islamic principle of tayyib (wholesome, pure) applies not only to food on the plate but to the very seeds that enter the soil — planting compromised material compromises the entire chain of trust from earth to table.


**How?**

1. Search for certified organic seed companies in your country — prioritise those that grow and select seeds in climates similar to yours.
2. For fruit and nut trees, locate local bare-root nurseries that sell heritage and disease-resistant rootstocks.
3. Contact community seed libraries, seed swaps, or permaculture networks — these often have locally adapted, open-pollinated varieties unavailable commercially.
4. For nitrogen-fixing species, source inoculated seeds (pre-coated with the correct rhizobium bacteria) for maximum nitrogen fixation.
5. Verify that no supplier uses neonicotinoid seed treatments or other chemical coatings — request untreated seed explicitly.
6. Order well in advance of your planting window, as organic and heritage varieties sell out quickly.
7. Completion indicator: all seeds, seedlings, and bare-root trees ordered from verified organic, non-GMO, local sources, with delivery dates aligned to your planting schedule.` },
        { title: 'Plant the first season according to the zoned plan, with proper spacing, mulching, and watering', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 36:33-35",
              arabic: "وَآيَةٌ لَّهُمُ الْأَرْضُ الْمَيْتَةُ أَحْيَيْنَاهَا وَأَخْرَجْنَا مِنْهَا حَبًّا فَمِنْهُ يَأْكُلُونَ وَجَعَلْنَا فِيهَا جَنَّاتٍ مِّن نَّخِيلٍ وَأَعْنَابٍ",
              translation: "And a sign for them is the dead earth. We have brought it to life and brought forth from it grain, and from it they eat. And We placed therein gardens of palm trees and grapevines.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2320",
              translation: "The Prophet (peace be upon him) said: \"There is no Muslim who plants a tree or sows seeds, and then a bird, or a person, or an animal eats from it, except that it is regarded as sadaqah for him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Musnad Ahmad 12981",
              translation: "The Prophet (peace be upon him) said: \"If the Hour is about to be established and one of you has a palm shoot in his hand, and he is able to plant it before it happens, then let him plant it.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

This is the moment where planning becomes reality and the first sadaqah jariyah enters the ground. Every tree and seed planted with the right intention is ongoing charity — but it must also be planted with the right technique. Crowded plants compete and weaken each other, bare soil erodes and loses moisture, and under-watered seedlings die before they establish. Ihsan (excellence) demands that the physical act of planting be as intentional as the spiritual intention behind it.


**How?**

1. Begin with trees and shrubs — they take longest to establish. Dig holes twice the width and the same depth as the root ball, amend with compost, plant at the correct depth (root flare at soil level), and water deeply.
2. Space trees according to their mature canopy size, not their current size — refer to your species list for spacing requirements.
3. Plant ground cover and nitrogen-fixers around tree bases to protect soil and begin building fertility immediately.
4. Sow annual crops in Zone 1 and 2 beds according to seed packet instructions for depth and spacing.
5. Mulch every planted area with 10-15cm of organic mulch (straw, wood chips, or leaf litter) to retain moisture, suppress weeds, and feed soil biology.
6. Set up temporary irrigation (even hand-watering on a schedule) to support establishment until permanent systems are built.
7. Completion indicator: all first-season species planted in their designated zones, mulched, watered, and recorded on the planting map with dates and varieties.` },
      ],
    },
    {
      title: 'Build safety and access infrastructure — fencing, paths, signage, and emergency provisions',
      priority: 'urgent', tags: ['infrastructure', 'safety'],
      description: 'A land stewardship project that people cannot safely access or navigate will fail before it starts. Fencing protects plantings and marks boundaries, paths channel foot traffic away from sensitive areas, signage educates visitors, and emergency provisions protect workers. This is the infrastructure of amanah — making the land safe for everyone who enters it.',
      subtasks: [
        { title: 'Survey and mark the legal land boundary with durable markers or fencing', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 17:12",
              arabic: "وَجَعَلْنَا اللَّيْلَ وَالنَّهَارَ آيَتَيْنِ فَمَحَوْنَا آيَةَ اللَّيْلِ وَجَعَلْنَا آيَةَ النَّهَارِ مُبْصِرَةً لِتَبْتَغُوا فَضْلًا مِّن رَّبِّكُمْ",
              translation: "And We have made the night and day two signs. We erased the sign of the night and made the sign of the day visible that you may seek bounty from your Lord.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 2:30",
              arabic: "إِنِّي جَاعِلٌ فِي الْأَرْضِ خَلِيفَةً",
              translation: "Indeed, I will make upon the earth a khalifah.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2737",
              translation: "Regarding the waqf of Umar: the Prophet said to endow the land and make its produce available as charity — establishing the principle of protecting community land assets.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

 Clear boundary marking prevents disputes, protects relationships with neighbours, and ensures that every improvement you make is within your legal right. Boundary ambiguity has destroyed more community projects than any agricultural challenge. This is a foundational act of justice and good neighbouring that must precede all other infrastructure.

**How?**

1. Obtain the official survey plan or title deed map showing the exact legal boundaries of the parcel.
2. If boundary markers (pegs, stones, fences) already exist, verify them against the survey plan — markers can shift or be removed over time.
3. If boundaries are unclear or disputed, hire a licensed surveyor to re-peg the boundaries with permanent markers.
4. Walk the verified boundary with adjacent neighbours, show them the survey markers, and resolve any questions while relations are good — do not wait for a dispute.
5. Install fencing along boundaries where livestock protection, security, or clarity requires it — prioritise boundaries adjacent to roads, neighbouring farms, and public land.
6. Choose fencing appropriate to purpose: stock-proof fencing for livestock areas, simple post-and-wire for boundary marking, and living hedgerows where possible for ecological benefit.
7. Completion indicator: all legal boundaries verified against the survey plan, marked or fenced, and confirmed with adjacent neighbours.` },
        { title: 'Design and build primary access paths connecting the entrance to key zones', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:148",
              arabic: "فَاسْتَبِقُوا الْخَيْرَاتِ",
              translation: "So race to [all that is] good.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 1914",
              translation: "The Prophet (peace be upon him) said: \"Whoever removes a worldly hardship from a believer, Allah will remove from him one of the hardships of the Day of Resurrection.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Building safe access paths removes physical hardship from the community.",
            },
          ],
          description: `**Why?**

Without defined paths, people walk wherever is convenient — trampling plantings, compacting soil in sensitive areas, and creating erosion channels. Paths are not just functional but educational — they guide visitors through the land in a sequence that tells the story of stewardship. The Quran speaks of Allah making pathways on the earth so that people may find their way (43:10), and well-designed paths on your land serve the same purpose in miniature.


**How?**

1. Identify the primary entrance point and the key destinations: planting zones, water points, gathering area, storage, and compost stations.
2. Route paths along contour lines where possible to minimise erosion — never route a path straight downhill.
3. Design path width for purpose: 1.2 metres minimum for pedestrian access, 2.5 metres for wheelbarrow and small vehicle access.
4. Surface paths with locally available materials: wood chips for low-traffic areas, compacted gravel for main routes, and stepping stones through wet zones.
5. Install simple drainage (cross-drains or water bars) at any point where water might channel along the path surface.
6. Ensure at least one path is accessible for people with mobility limitations — firm surface, gentle gradient, no steps.
7. Completion indicator: primary paths built connecting entrance to all key zones, surfaced appropriately, and accessible for diverse users.` },
        { title: 'Install educational and wayfinding signage throughout the land', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:104",
              arabic: "وَلْتَكُن مِّنكُمْ أُمَّةٌ يَدْعُونَ إِلَى الْخَيْرِ وَيَأْمُرُونَ بِالْمَعْرُوفِ",
              translation: "And let there be [arising] from you a nation inviting to [all that is] good, enjoining what is right.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6010",
              translation: "The Prophet (peace be upon him) said: \"The parable of the believers in their affection, mercy, and compassion for each other is that of a body. When any limb aches, the whole body reacts with sleeplessness and fever.\" Signage communicates care for every visitor.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Signage transforms a piece of land from a private project into a teaching space. Every visitor should be able to understand what they are seeing, why it matters, and how to move through the land respectfully — even without a guide present. The Quranic injunction to "read" (iqra, 96:1) extends beyond books to reading the signs in creation, and your signage helps people do exactly that. It also builds community ownership — people care for what they understand.


**How?**

1. Create a signage plan identifying locations for: entrance welcome sign, zone markers, species identification labels, water feature explanations, and directional arrows at path junctions.
2. Design the entrance sign to include: the land name, its purpose as an Islamic land stewardship project, key rules (no chemicals, no littering, respect plantings), and emergency contact information.
3. For each planting zone, create interpretation signs explaining what is growing, why those species were chosen, and the Islamic principles guiding the approach.
4. Label significant trees and plants with their common name, botanical name, and a brief note on their use or ecological role.
5. Use durable, weather-resistant materials — treated wood, metal, or recycled plastic — and ensure text is large enough to read easily.
6. Include Arabic calligraphy or Quranic references where appropriate to reinforce the spiritual grounding of the project.
7. Completion indicator: signage installed at the entrance, all zone boundaries, key species, path junctions, and water features, with consistent design language throughout.` },
        { title: 'Set up a first aid station, emergency contact board, and basic tool storage', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 5:2",
              arabic: "وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ",
              translation: "And cooperate in righteousness and piety.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 2:195",
              arabic: "وَلَا تُلْقُوا بِأَيْدِيكُمْ إِلَى التَّهْلُكَةِ",
              translation: "And do not throw yourselves with your own hands into destruction.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 3477",
              translation: "The Prophet (peace be upon him) said: \"Muslims share in three things: water, pasture, and fire.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Agricultural work involves sharp tools, heavy lifting, uneven ground, stinging insects, and sun exposure. Having first aid immediately accessible is not optional — it is a duty of care to every person who works on or visits the land. Tool storage prevents theft, injury from scattered equipment, and degradation of expensive implements.

**How?**

1. Purchase a comprehensive outdoor first aid kit including: bandages, antiseptic, burn cream, eye wash, antihistamines (for stings), splints, CPR mask, and a thermal blanket.
2. Mount the first aid kit in a visible, weatherproof location near the main gathering area — a lockable box on a post works well.
3. Create an emergency contact board next to the first aid kit listing: local emergency number, nearest hospital address and phone, land trustees' contact numbers, and the land's exact address or GPS coordinates (critical for directing ambulances).
4. Build or install a lockable tool storage shed or container near the primary work zone — it must be dry, ventilated, and large enough for shovels, rakes, pruners, wheelbarrows, and irrigation supplies.
5. Implement a tool sign-out system so that equipment is tracked and returned after each work session.
6. Conduct a basic risk assessment: identify hazards (slopes, water features, thorny plants, old structures) and note them on the emergency board.
7. Completion indicator: first aid kit installed and stocked, emergency board mounted with current contacts, tool storage operational with a sign-out system, and hazard assessment posted.` },
        { title: 'Establish vehicle access, parking, and a designated gathering or prayer area', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 62:9-10",
              arabic: "فَإِذَا قُضِيَتِ الصَّلَاةُ فَانتَشِرُوا فِي الْأَرْضِ وَابْتَغُوا مِن فَضْلِ اللَّهِ",
              translation: "And when the prayer has been concluded, disperse within the land and seek from the bounty of Allah.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 22:26",
              arabic: "وَطَهِّرْ بَيْتِيَ لِلطَّائِفِينَ وَالْقَائِمِينَ وَالرُّكَّعِ السُّجُودِ",
              translation: "And purify My House for those who perform tawaf and those who stand in prayer and those who bow and prostrate.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 3477",
              translation: "The Prophet (peace be upon him) said: \"Muslims share in three things: water, pasture, and fire.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Community work days, deliveries of amendments and materials, and regular maintenance all require vehicle access. Without a designated parking area, vehicles damage soil, compact planting zones, and create mud ruts that become erosion channels. A gathering area provides a space for shura (consultation), shared meals, and salah (prayer) — reinforcing that this land is not merely a farm but a place of worship and community building.

**How?**

1. Identify the optimal vehicle access route from the public road — choose a path that avoids sensitive planting zones and follows firm ground.
2. Surface the access route with compacted gravel or crushed stone to prevent mud and rutting in wet weather.
3. Designate a parking area near the entrance, large enough for the expected number of vehicles during community work days, surfaced with permeable material (gravel, grass pavers) to allow water infiltration.
4. Select a level, sheltered spot for the gathering area — near water access, away from active work zones, with natural shade from trees or a simple shade structure.
5. Orient a section of the gathering area toward qiblah and keep it clean and level for prayer — a simple ground covering (clean gravel, pavers, or outdoor carpet) suffices.
6. Install a basic handwashing station near the gathering area for wudu and hygiene.
7. Completion indicator: vehicle access route and parking area built, gathering area established with qiblah orientation, and handwashing station installed.` },
      ],
    },
  ],
  moontrance_land_growth: [
    {
      title: 'Establish a composting and soil amendment programme — close the organic waste loop on-site',
      priority: 'high', tags: ['compost', 'islah-al-turbah'],
      description: ' Composting removes organic "waste" from landfill and transforms it into the most valuable input for soil restoration — it is environmental sadaqah in its purest form. This programme closes the nutrient loop so the land feeds itself.',
      subtasks: [
        { title: 'Build a three-bay composting system sized for the land output and community kitchen waste', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 7:58",
              arabic: "وَالْبَلَدُ الطَّيِّبُ يَخْرُجُ نَبَاتُهُ بِإِذْنِ رَبِّهِ",
              translation: "And the good land — its vegetation emerges by permission of its Lord.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 36:33",
              arabic: "وَآيَةٌ لَّهُمُ الْأَرْضُ الْمَيْتَةُ أَحْيَيْنَاهَا",
              translation: "And a sign for them is the dead earth. We have brought it to life.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 1552",
              translation: "The Prophet (peace be upon him) said: \"Whoever cultivates barren land, it belongs to him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A three-bay system (fresh, active, cured) is the backbone of serious composting — it allows continuous processing where one bay is being filled, one is actively decomposing, and one is ready to use. Without this structure, composting becomes a neglected heap that smells, attracts pests, and produces inconsistent material. The system must be sized for both on-site green waste (prunings, crop residues, weeds) and incoming community kitchen scraps, making it a bridge between the land and the wider community.


**How?**

1. Calculate your compost feedstock volume: estimate weekly green waste from the land (prunings, weeds, crop residues) and weekly kitchen scraps from participating households.
2. Size each bay to hold approximately 6 weeks of input — a typical community-scale bay is 1.5m x 1.5m x 1.2m high.
3. Build three bays from durable materials: wooden pallets, concrete blocks, or timber frames with removable front boards for easy turning.
4. Site the system on well-drained ground, accessible by wheelbarrow from all planting zones and from the vehicle access route for deliveries.
5. Create a clear labelling system: Bay 1 (Fresh — currently filling), Bay 2 (Active — turning regularly), Bay 3 (Cured — ready to use).
6. Establish a feedstock collection system: provide covered buckets to participating households and schedule weekly collection or drop-off.
7. Completion indicator: three-bay composting system built, labelled, and receiving feedstock from both on-site operations and community contributors.` },
        { title: 'Train at least 3 community members in hot composting, vermicomposting, and compost tea production', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6502",
              translation: "The Prophet (peace be upon him) said: \"The best of people are those who are most beneficial to people.\"",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan per al-Albani",
              rationale: "Training community members in composting multiplies benefit across the whole community.",
            },
            {
              kind: "hadith",
              ref: "Musnad Ahmad 12902",
              translation: "The Prophet (peace be upon him) said: \"Even if the Hour is about to be established and one of you has a sapling in his hand, let him plant it.\" Soil restoration is a prerequisite to planting.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A composting system that depends on a single person will collapse the moment that person is unavailable. Training multiple community members distributes the knowledge and labour, builds ownership, and ensures continuity. The Quran says "cooperate in righteousness and piety" (5:2), and shared composting knowledge is a practical expression of that cooperation. Hot composting, vermicomposting, and compost tea each serve different purposes and together form a complete soil-feeding toolkit.


**How?**

1. Identify 3 or more committed community members willing to learn and regularly participate in composting operations.
2. Conduct a hands-on hot composting workshop: demonstrate carbon-to-nitrogen ratio (roughly 30:1), proper layering (brown-green-brown), moisture levels (damp sponge feel), and turning schedule (every 3-5 days until temperature drops below 55C).
3. Set up a vermicomposting bin and train participants in feeding worms (kitchen scraps only, no citrus or onions in excess), moisture management, and harvesting castings.
4. Demonstrate compost tea brewing: aerating finished compost in water for 24-48 hours with an aquarium pump to create a microbially-rich liquid feed for plants.
5. Create a simple reference guide (laminated, posted at the composting station) covering ratios, troubleshooting (too wet, too dry, bad smell, pests), and safety.
6. Schedule a rotation so that composting duties are shared and no one person bears the full burden.
7. Completion indicator: at least 3 community members can independently manage hot composting, vermicomposting, and compost tea production, with a posted reference guide and duty rotation in place.` },
        { title: 'Source and apply bulk organic amendments — biochar, rock dust, and aged manure', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 50:9",
              arabic: "وَنَزَّلْنَا مِنَ السَّمَاءِ مَاءً مُّبَارَكًا فَأَنبَتْنَا بِهِ جَنَّاتٍ وَحَبَّ الْحَصِيدِ",
              translation: "And We have sent down blessed rain from the sky and made grow thereby gardens and grain from the harvest.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Musnad Ahmad 12981",
              translation: "The Prophet (peace be upon him) said: \"If the Hour is about to be established and one of you has a palm shoot in his hand, and he is able to plant it before it happens, then let him plant it.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Compost alone cannot restore severely depleted soil in a single season. Biochar provides long-term carbon storage and creates habitat for beneficial soil microbes. Rock dust (basalt, glacial) remineralises soil with trace elements stripped by decades of conventional agriculture. Aged manure adds nitrogen and biological activity. Together with compost, these amendments accelerate the timeline from damaged to healthy soil — working with the natural healing processes Allah embedded in the earth.


**How?**

1. Based on your soil lab results, identify which amendments each zone needs most urgently — biochar for carbon-depleted areas, rock dust for demineralised zones, manure for nitrogen-poor sections.
2. Source biochar from a certified supplier or learn to produce it on-site using a retort kiln from pruning waste — ensure it is "charged" (pre-soaked in compost tea or urine) before application to prevent it from absorbing nutrients away from plants.
3. Source rock dust from a local quarry — basalt dust is the most mineral-rich and widely available.
4. Source aged manure (at least 6 months old) from a local organic farm — never use fresh manure directly on crops due to pathogen and nitrogen burn risk.
5. Calculate application rates: biochar at 2-5 tonnes per hectare, rock dust at 5-10 tonnes per hectare, aged manure at 10-20 tonnes per hectare — adjust based on soil test results.
6. Apply amendments in the order specified in your soil restoration plan, incorporating them into the top 15cm of soil with a broadfork or light tilling.
7. Completion indicator: bulk amendments applied to all zones according to the restoration plan, with quantities and dates recorded in the soil monitoring log.` },
        { title: 'Establish a seed-saving programme to build an on-site, locally adapted seed bank', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 6:95",
              arabic: "إِنَّ اللَّهَ فَالِقُ الْحَبِّ وَالنَّوَىٰ يُخْرِجُ الْحَيَّ مِنَ الْمَيِّتِ وَمُخْرِجُ الْمَيِّتِ مِنَ الْحَيِّ",
              translation: "Indeed, Allah is the cleaver of grain and date seeds. He brings the living out of the dead and brings the dead out of the living.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 39:21",
              arabic: "أَلَمْ تَرَ أَنَّ اللَّهَ أَنزَلَ مِنَ السَّمَاءِ مَاءً فَسَلَكَهُ يَنَابِيعَ فِي الْأَرْضِ ثُمَّ يُخْرِجُ بِهِ زَرْعًا مُّخْتَلِفًا أَلْوَانُهُ",
              translation: "Do you not see that Allah sends down rain from the sky and makes it flow as springs in the earth; then He produces thereby crops of varying colours.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2320",
              translation: "The Prophet (peace be upon him) said: \"There is no Muslim who plants a tree or sows seeds, and then a bird, or a person, or an animal eats from it, except that it is regarded as sadaqah for him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Purchasing seeds every season creates dependency on external suppliers and breaks the natural cycle of plant-soil-seed-plant. Seed saving is one of the oldest agricultural practices and one of the most politically and ecologically powerful — it preserves genetic diversity, builds varieties adapted to your specific land, and ensures food sovereignty.

**How?**

1. Identify the easiest crops to save seed from in your first season: beans, peas, tomatoes, peppers, lettuce, and herbs are all straightforward for beginners.
2. Allow the healthiest, most vigorous plants of each variety to go fully to seed rather than harvesting them for food — this selects for the strongest genetics.
3. Learn the seed-saving technique for each crop type: dry-seeded crops (beans, lettuce) are dried on the plant and threshed; wet-seeded crops (tomatoes, cucumbers) require fermentation to remove the gel coating.
4. Clean seeds thoroughly, dry them completely (10-14 days in a warm, airy space), and store in labelled paper envelopes inside an airtight container with silica gel.
5. Record the variety name, source, date saved, and any notes on performance (yield, disease resistance, flavour) for each seed lot.
6. Store the seed bank in a cool, dark, dry location — a refrigerator is ideal for long-term storage.
7. Completion indicator: seeds saved from at least 10 varieties, cleaned, dried, labelled, and stored in a dedicated seed bank with a catalogue log.` },
        { title: 'Implement green manure cover cropping in all fallow beds between seasons', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 36:33",
              arabic: "وَآيَةٌ لَّهُمُ الْأَرْضُ الْمَيْتَةُ أَحْيَيْنَاهَا وَأَخْرَجْنَا مِنْهَا حَبًّا فَمِنْهُ يَأْكُلُونَ",
              translation: "And a sign for them is the dead earth. We have brought it to life and brought forth from it grain, and from it they eat.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2320",
              translation: "The Prophet (peace be upon him) said: \"There is none amongst the Muslims who plants a tree or sows seeds, and then a bird, or a person or an animal eats from it, but is regarded as a charitable gift for him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Bare soil is wounded soil — exposed to rain erosion, sun degradation, and weed colonisation. Cover cropping between seasons is the agricultural equivalent of bandaging a wound: it protects the soil surface, feeds the soil biology with living root exudates, fixes nitrogen (if leguminous), and adds organic matter when terminated. The Quran describes the earth as a living carpet (71:19), and cover crops are what keep that carpet intact between harvests.


**How?**

1. Identify all beds that will be fallow (not actively cropped) for any period longer than 4 weeks.
2. Select cover crop species based on purpose: crimson clover or field peas for nitrogen fixation, oats or rye for biomass and weed suppression, daikon radish for breaking compaction, and buckwheat for attracting pollinators.
3. Sow cover crops immediately after harvesting the previous crop — do not leave soil bare even for a few weeks.
4. Broadcast seed at the recommended rate (varies by species; typically 2-4 kg per 100 square metres), rake lightly to ensure soil contact, and water if rain is not expected.
5. Allow cover crops to grow for 6-12 weeks, then terminate before they set seed: mow and leave as mulch, or turn under with a broadfork.
6. Wait 2-3 weeks after termination before planting the next crop to allow decomposition to begin.
7. Completion indicator: all fallow beds sown with appropriate cover crops within 2 weeks of harvest, with no bare soil exposed between seasons.` },
      ],
    },
    {
      title: 'Establish the perennial food forest — plant canopy, understory, and ground layers',
      priority: 'high', tags: ['food-forest', 'sadaqah-jariyah'],
      description: 'A food forest mimics the structure of a natural forest ecosystem but with species chosen for human benefit. Once established, it produces food, medicine, timber, and wildlife habitat with minimal ongoing labour. This is the highest expression of sadaqah jariyah on land — an investment that feeds people and creatures for generations after you are gone.',
      subtasks: [
        { title: 'Design the food forest guild layout with at least 7 layers of productive species', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 6:141",
              arabic: "وَهُوَ الَّذِي أَنشَأَ جَنَّاتٍ مَّعْرُوشَاتٍ وَغَيْرَ مَعْرُوشَاتٍ وَالنَّخْلَ وَالزَّرْعَ مُخْتَلِفًا أُكُلُهُ وَالزَّيْتُونَ وَالرُّمَّانَ",
              translation: "And He it is who causes gardens to grow, both trellised and untrellised, and palm trees and crops of different kinds of food and olives and pomegranates.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 55:10-12",
              arabic: "وَالْأَرْضَ وَضَعَهَا لِلْأَنَامِ فِيهَا فَاكِهَةٌ وَالنَّخْلُ ذَاتُ الْأَكْمَامِ",
              translation: "And the earth He laid out for the creatures. Therein is fruit and palm trees having sheaths of dates.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Musnad Ahmad 12981",
              translation: "The Prophet (peace be upon him) said: \"If the Hour is about to be established and one of you has a palm shoot in his hand, and he is able to plant it before it happens, then let him plant it.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A food forest is not a random collection of trees — it is a designed ecosystem that mimics the seven layers of a natural forest: canopy, understory, shrub, herbaceous, ground cover, vine, and root. Each layer occupies a different niche in space and light, maximising production per square metre. Designing with all seven layers ensures no resource (sunlight, water, nutrients) is wasted — reflecting the Quranic principle of mizan (balance) and the Prophetic instruction to not waste even at a flowing river.


**How?**

1. Study food forest design principles from established permaculture resources — the seven-layer model developed by Robert Hart and expanded by Martin Crawford is the standard framework.
2. Select canopy trees (7-15m): fruit and nut species suited to your zone (e.g., walnut, chestnut, apple, pear).
3. Select understory trees (3-7m): smaller fruit trees (plum, cherry, fig, mulberry) and nitrogen-fixers (Siberian pea shrub, autumn olive).
4. Select shrub layer (1-3m): berry bushes (currant, gooseberry, blueberry, raspberry) and medicinal shrubs.
5. Select herbaceous layer: comfrey (nutrient accumulator), mint, lemon balm, and perennial vegetables.
6. Select ground cover: strawberries, creeping thyme, white clover — species that suppress weeds and protect soil.
7. Completion indicator: a complete guild design document showing all seven layers with species selected, spacing calculated, and a planting layout map drawn.` },
        { title: 'Prepare planting sites with deep mulch, compost, and mycorrhizal inoculant', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 50:9",
              arabic: "وَنَزَّلْنَا مِنَ السَّمَاءِ مَاءً مُّبَارَكًا فَأَنبَتْنَا بِهِ جَنَّاتٍ وَحَبَّ الْحَصِيدِ",
              translation: "And We have sent down blessed rain from the sky and made grow thereby gardens and grain from the harvest.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Food forest trees are long-term commitments — a walnut tree may produce for 200 years. Investing in excellent planting preparation ensures each tree has the best possible start, reducing mortality and years to first harvest. Mycorrhizal fungi form symbiotic networks with tree roots, extending their reach for water and nutrients by orders of magnitude. These fungal networks are part of the hidden architecture of creation — unseen but essential, like the spiritual roots that sustain a community.


**How?**

1. For each tree planting site, clear a circle 2 metres in diameter of all grass and weeds — either by sheet mulching (cardboard + thick mulch) 3 months in advance, or by manual removal.
2. Dig a planting hole twice the width and the same depth as the root ball.
3. Mix the excavated soil with finished compost at a 2:1 ratio (soil to compost).
4. Add a handful of mycorrhizal inoculant directly to the root zone — sprinkle it on the roots or in the bottom of the hole where roots will contact it.
5. Backfill with the amended soil mix, water deeply, and apply 15-20cm of wood chip mulch in a ring around the tree, keeping mulch 10cm away from the trunk to prevent rot.
6. Repeat for every tree and large shrub in the food forest layout.
7. Completion indicator: all planting sites prepared with cleared ground, amended soil, mycorrhizal inoculant, and deep mulch, ready for tree planting.` },
        { title: 'Plant canopy and understory trees according to the guild design with proper spacing', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 1552",
              translation: "The Prophet (peace be upon him) said: \"There is none amongst the Muslims who plants a tree or sows seeds, and then a bird, or a person, or an animal eats from it, but it is regarded as a charitable gift (sadaqah) for him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Planting trees is ongoing charity.",
            },
          ],
          description: `**Why?**

The canopy and understory trees are the skeleton of the food forest — everything else grows in relation to them. Planting them first with correct spacing ensures adequate light reaches lower layers as the forest matures.

**How?**

1. Plant during the dormant season (late autumn to early spring) for bare-root trees, or any time the ground is workable for container-grown trees.
2. Follow the guild design map exactly — canopy trees at their specified spacing (typically 8-12 metres apart), understory trees in the gaps (4-6 metres from canopy trees).
3. For each tree, place the root ball in the prepared hole at the correct depth (root flare at soil level), spread roots gently, backfill, and firm the soil with your heel.
4. Water each tree deeply immediately after planting — at least 20 litres per tree.
5. Install a tree guard or stake if the site is exposed to wind or animals.
6. Record each tree on the planting map: species, variety, date planted, and source.
7. Completion indicator: all canopy and understory trees planted, staked where needed, watered, and recorded on the food forest planting map.` },
        { title: 'Interplant shrub, herbaceous, ground cover, and vine layers around established trees', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 53:16",
              arabic: "إِذْ يَغْشَى السِّدْرَةَ مَا يَغْشَىٰ",
              translation: "when the tree was covered in nameless [splendour].",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              rationale: "the Sidrat al-Muntaha — a tree fully covered with layers of growth — reflects the layered, abundant planting that mirrors divine creation",
            },
            {
              kind: "quran",
              ref: "Quran 56:29",
              arabic: "وَطَلْحٍ مَّنضُودٍ",
              translation: "and clustered acacia",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              rationale: "the Quran describes trees of paradise in densely layered, multi-species configurations — this is the ecological ideal the food forest interplanting seeks to embody",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2320",
              translation: "The Prophet (peace be upon him) said: \"There is none amongst the Muslims who plants a tree or sows seeds, and then a bird, or a person or an animal eats from it, but is regarded as a charitable gift for him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The lower layers of the food forest fill the space between and beneath trees, suppressing weeds, fixing nitrogen, accumulating nutrients, and producing food from the first season. Planting these layers early accelerates the forest's development from bare ground to a functioning ecosystem. Each layer serves the others: ground cover protects soil for tree roots, herbs attract pollinators for fruit trees, and nitrogen-fixers feed the whole guild. This interdependence mirrors the Quranic teaching that everything in creation is connected and purposeful (21:16).


**How?**

1. Start with nitrogen-fixers: plant clover or vetch as ground cover around every tree, and shrubby nitrogen-fixers (Elaeagnus, Siberian pea) between tree guilds.
2. Plant berry bushes (currants, gooseberries, raspberries) in the shrub layer, spacing them 1-2 metres apart in the dappled light between canopy trees.
3. Plant comfrey around the drip line of each canopy tree — it mines deep nutrients and produces copious mulch material when cut.
4. Establish ground cover species (strawberries, creeping thyme, white clover) in all remaining bare ground between plantings.
5. Plant vines (grape, kiwi, passionflower) at the base of appropriate support trees or on trellises at the food forest edge.
6. Mulch heavily around all new plantings to retain moisture and suppress competing weeds during establishment.
7. Completion indicator: all seven food forest layers planted in the designed guilds, with no bare soil remaining between plantings.` },
        { title: 'Install a food forest irrigation system and establish a 3-year watering schedule', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 16:10-11",
              arabic: "هُوَ الَّذِي أَنزَلَ مِنَ السَّمَاءِ مَاءً لَّكُم مِّنْهُ شَرَابٌ وَمِنْهُ شَجَرٌ فِيهِ تُسِيمُونَ يُنبِتُ لَكُم بِهِ الزَّرْعَ وَالزَّيْتُونَ وَالنَّخِيلَ وَالْأَعْنَابَ",
              translation: "It is He who sends down rain from the sky; from it is drink and from it is foliage in which you pasture animals. He causes to grow for you thereby the crops, olives, palm trees, and grapevines.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A food forest aims for self-sufficiency, but young trees and shrubs need consistent water for the first 2-3 years to establish deep root systems. Without a planned irrigation system and schedule, you will either overwater (wasting resources and weakening roots) or underwater (killing young trees). The goal is to wean the forest off irrigation as roots deepen — transitioning from human-managed water to rain-fed resilience, trusting in the provision Allah sends from the sky (45:5).


**How?**

1. Install drip irrigation lines to every canopy and understory tree, with emitters at the drip line where feeder roots concentrate.
2. Connect shrub and ground cover zones to micro-sprinkler circuits for broader coverage.
3. Connect the irrigation system to your primary water source (rainwater tank, well, or municipal supply) with a timer for automated scheduling.
4. Year 1 schedule: water deeply (20-40 litres per tree) twice per week during the growing season, reducing to once per week in cool months.
5. Year 2 schedule: reduce to once per week during the growing season, once per fortnight in cool months.
6. Year 3 schedule: water only during prolonged dry spells (more than 2 weeks without rain) — trees should now have deep enough roots to access subsoil moisture.
7. Completion indicator: drip irrigation installed to all trees and shrubs, connected to a timer, with a 3-year watering reduction schedule posted at the irrigation control point.` },
      ],
    },
    {
      title: 'Build rainwater harvesting infrastructure — capture, store, and distribute rainfall across the land',
      priority: 'high', tags: ['rainwater', 'nizam-al-miyah'],
      description: 'Allah describes rain as "blessed water" (Quran 50:9) sent from the sky to revive dead land. Allowing this blessing to run off uncaptured is a form of ingratitude. This task builds the infrastructure to catch, hold, and deliver every possible litre of rainfall to where it is needed most.',
      subtasks: [
        { title: 'Install guttering and downpipes on all roofed structures to channel roof runoff to storage', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 23:18",
              arabic: "وَأَنزَلْنَا مِنَ السَّمَاءِ مَاءً بِقَدَرٍ فَأَسْكَنَّاهُ فِي الْأَرْضِ",
              translation: "And We sent down water from the sky in a measured amount and settled it in the earth.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 15:22",
              arabic: "وَأَرْسَلْنَا الرِّيَاحَ لَوَاقِحَ فَأَنزَلْنَا مِنَ السَّمَاءِ مَاءً فَأَسْقَيْنَاكُمُوهُ",
              translation: "And We have sent the fertilizing winds and sent down water from the sky and given you drink from it.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 3477",
              translation: "The Prophet (peace be upon him) said: \"Muslims share in three things: water, pasture, and fire.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Every roofed structure is a rainfall collection surface. A 100-square-metre roof in an area receiving 800mm of annual rainfall captures 80,000 litres per year — enough to irrigate a significant portion of the food forest. Without guttering, this water splashes off the eaves, erodes the soil at the building foundation, and is lost. Installing guttering is one of the simplest, cheapest, and highest-return water harvesting actions you can take.


**How?**

1. Measure the roof area and gutter run length for every roofed structure on the land (house, shed, barn, storage container).
2. Calculate potential capture volume for each roof: roof area (square metres) multiplied by annual rainfall (metres).
3. Install half-round or rectangular guttering along the lower edge of each roof, sloped at a minimum gradient of 1:200 toward the downpipe position.
4. Install downpipes at each low point, directing water into a first-flush diverter (to discard the first 20 litres of dirty roof wash) and then into a storage tank.
5. Ensure all joints are sealed and the system can handle peak rainfall intensity — size gutters and downpipes based on your region's maximum 5-minute rainfall rate.
6. Test the system with a garden hose running along the roof ridge to simulate rain and check for leaks, overflows, and correct flow direction.
7. Completion indicator: guttering and downpipes installed on all roofed structures, first-flush diverters fitted, and water directed to designated storage points.` },
        { title: 'Install storage tanks sized to capture the full dry-season water deficit', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 56:68-70",
              arabic: "أَفَرَأَيْتُمُ الْمَاءَ الَّذِي تَشْرَبُونَ أَأَنتُمْ أَنزَلْتُمُوهُ مِنَ الْمُزْنِ أَمْ نَحْنُ الْمُنزِلُونَ",
              translation: "Have you seen the water that you drink? Is it you who brought it down from the clouds, or is it We who bring it down?",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 21:30",
              arabic: "وَجَعَلْنَا مِنَ الْمَاءِ كُلَّ شَيْءٍ حَيٍّ",
              translation: "And We made from water every living thing.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2353",
              translation: "The Prophet (peace be upon him) said: \"Do not withhold surplus water so as to prevent pasture from growing.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Capturing rain is pointless without sufficient storage to hold it through dry periods. Your water budget identified a seasonal deficit — the gap between dry-season demand and dry-season rainfall. Storage tanks must bridge that gap entirely, holding enough water from wet months to sustain the land through dry months. Under-sizing tanks means watching water overflow in winter while plants suffer in summer — a failure of planning that dishonours the blessing of rain.


**How?**

1. Review your water budget to determine the total dry-season deficit in litres (dry-season demand minus dry-season rainfall).
2. Add a 20% safety margin to the deficit figure to account for unexpectedly dry years.
3. Choose tank type based on budget and space: polyethylene (affordable, UV-stabilised), ferrocement (durable, can be built on-site), or galvanised steel (long-lasting, more expensive).
4. Position tanks at the highest practical point below each roof collection system to maximise gravity-fed distribution range.
5. Install overflow pipes from each tank directing excess water into swales, infiltration basins, or secondary storage rather than wasting it.
6. Install a simple gauge or sight tube on each tank so water level is visible at a glance.
7. Completion indicator: storage tanks installed with total capacity meeting or exceeding the dry-season deficit plus 20% margin, with overflow directed to productive use.` },
        { title: 'Construct swales on contour across sloped areas to infiltrate overland water flow', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 39:21",
              arabic: "أَلَمْ تَرَ أَنَّ اللَّهَ أَنزَلَ مِنَ السَّمَاءِ مَاءً فَسَلَكَهُ يَنَابِيعَ فِي الْأَرْضِ",
              translation: "Do you not see that Allah sends down rain from the sky and makes it flow as springs in the earth?",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 13:17",
              arabic: "أَنزَلَ مِنَ السَّمَاءِ مَاءً فَسَالَتْ أَوْدِيَةٌ بِقَدَرِهَا",
              translation: "He sent down from the sky rain, and valleys flowed according to their capacity.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 3477",
              translation: "The Prophet (peace be upon him) said: \"Muslims share in three things: water, pasture, and fire.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Swales are shallow ditches dug along contour lines that capture overland water flow and hold it until it infiltrates into the soil. On sloped land, rainfall that is not intercepted runs downhill, carrying topsoil with it and leaving uphill areas dry. Swales reverse this by spreading water horizontally across the slope, recharging groundwater, and passively irrigating trees planted on the downhill berm. This earthwork mimics the natural function of the channels and valleys Allah placed on the earth (13:17).


**How?**

1. Use an A-frame level or laser level to mark contour lines across all sloped sections of the land.
2. Dig swales along these contour lines: typically 30-50cm deep and 60-100cm wide, with the excavated earth placed on the downhill side as a berm.
3. Space swales based on slope steepness: closer together on steeper slopes (every 5-8 metres), wider apart on gentle slopes (every 10-15 metres).
4. Level the bottom of each swale to ensure water spreads evenly along its full length rather than pooling at low points.
5. Plant the downhill berm with trees, shrubs, or deep-rooted perennials that will benefit from the passive irrigation.
6. Mulch the swale bottom with straw or wood chips to prevent erosion and support infiltration.
7. Completion indicator: swales constructed on contour across all sloped areas, berms planted, and the system tested during a rainfall event to confirm water spreads and infiltrates as designed.` },
        { title: 'Build a grey water filtration and reuse system for irrigation', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 7:31",
              arabic: "وَكُلُوا وَاشْرَبُوا وَلَا تُسْرِفُوا إِنَّهُ لَا يُحِبُّ الْمُسْرِفِينَ",
              translation: "And eat and drink, but be not excessive. Indeed, He likes not those who commit excess.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 21:30",
              arabic: "وَجَعَلْنَا مِنَ الْمَاءِ كُلَّ شَيْءٍ حَيٍّ",
              translation: "And We made from water every living thing.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan an-Nasai 326",
              translation: "The Prophet (peace be upon him) passed by Sa'd while he was performing wudu and said: \"What is this extravagance, O Sa'd?\" Sa'd said: \"Is there extravagance in wudu?\" He said: \"Yes, even if you are at a flowing river.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Grey water from sinks, showers, laundry, and wudu contains nutrients (nitrogen, phosphorus, potassium) that plants can use, but also soaps and fats that must be filtered before the water contacts soil and roots. A properly designed grey water system reclaims this resource rather than sending it to the sewer, extending the life of every litre of water used on site. The Islamic ethic of not wasting (la israf) applies to water in all its forms — even after its first use.


**How?**

1. Identify all grey water sources on the land: kitchen sink, bathroom sinks, shower or bath, laundry, and wudu station.
2. Separate grey water plumbing from black water (toilet) — grey water must never be mixed with sewage.
3. Route grey water through a settling tank to remove large particles and fats.
4. Build a constructed wetland or reed bed filter: a shallow, gravel-filled basin planted with reeds (Phragmites) or bulrushes (Typha) that biologically clean the water as it passes through.
5. Direct filtered grey water to subsurface drip irrigation in tree and shrub zones — never spray grey water on edible leaf crops or root vegetables.
6. Ensure the system complies with local regulations on grey water reuse — many jurisdictions have specific rules on treatment levels and application methods.
7. Completion indicator: grey water system installed, tested, and compliant with local regulations, delivering filtered water to designated irrigation zones.` },
        { title: 'Create a water monitoring dashboard tracking rainfall, storage levels, and consumption', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 55:7-9",
              arabic: "وَالسَّمَاءَ رَفَعَهَا وَوَضَعَ الْمِيزَانَ أَلَّا تَطْغَوْا فِي الْمِيزَانِ وَأَقِيمُوا الْوَزْنَ بِالْقِسْطِ وَلَا تُخْسِرُوا الْمِيزَانَ",
              translation: "And the heaven He raised and imposed the balance. That you not transgress within the balance. And establish weight in justice and do not make deficient the balance.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 3477",
              translation: "The Prophet (peace be upon him) said: \"Muslims share in three things: water, pasture, and fire.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

You cannot manage what you do not measure. A monitoring dashboard provides real-time visibility into the land's water balance — how much is coming in (rainfall), how much is stored (tank levels), and how much is going out (irrigation, household use). This data drives informed decisions about when to irrigate, when to conserve, and whether the harvesting system is performing as designed. The principle of itqan (excellence through precision) requires that stewardship be grounded in data, not guesswork.


**How?**

1. Install a rain gauge at a central, unobstructed location on the land — record daily rainfall manually or with an automated data-logging gauge.
2. Record tank levels weekly (or install float-level sensors for continuous monitoring) for every storage tank.
3. Install a flow meter on the main irrigation line to track total water distributed to crops and trees.
4. Create a simple dashboard — a spreadsheet, wall chart, or digital tool — with columns for date, rainfall (mm), tank level (litres), and irrigation used (litres).
5. Calculate weekly water balance: inputs (rainfall captured + any municipal water purchased) minus outputs (irrigation + household use + evaporation losses).
6. Review the dashboard monthly to identify trends: are tanks refilling faster than expected? Is irrigation use higher than the plan?
7. Completion indicator: all monitoring instruments installed, a functional dashboard recording data weekly, and the first monthly review completed with findings documented.` },
      ],
    },
    {
      title: 'Create a biodiversity corridor — connect habitat zones to support wildlife and pollinators',
      priority: 'high', tags: ['biodiversity', 'khalifah'],
      description: 'The Quran says there is no creature on earth or bird that flies with its wings but that they are communities like you (6:38). A land stewardship project that grows food but destroys habitat for other creatures has failed its khilafah mandate. Biodiversity corridors provide continuous habitat for wildlife, pollinators, and beneficial insects across the land.',
      subtasks: [
        { title: 'Map existing wildlife habitat, nesting sites, and movement routes across the land', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 6:38",
              arabic: "وَمَا مِن دَابَّةٍ فِي الْأَرْضِ وَلَا طَائِرٍ يَطِيرُ بِجَنَاحَيْهِ إِلَّا أُمَمٌ أَمْثَالُكُم",
              translation: "And there is no creature on earth or bird that flies with its wings except that they are communities like you.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 24:45",
              arabic: "وَاللَّهُ خَلَقَ كُلَّ دَابَّةٍ مِّن مَّاءٍ",
              translation: "And Allah has created every creature from water.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2466",
              translation: "The Prophet (peace be upon him) told of a man who was forgiven his sins for giving water to a thirsty dog, and warned of a woman who was punished for confining a cat until it died. Both illustrate the Islamic duty of care toward animals.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Before you can connect habitat, you must know what habitat already exists. Even degraded land harbours wildlife — hedgehogs in bramble patches, nesting birds in old trees, frogs in wet ditches, and countless insects in undisturbed soil. Mapping these existing assets prevents you from accidentally destroying habitat during development and reveals the framework onto which new habitat can be grafted. The Quran says "there is not a thing but it celebrates His praise" (17:44) — every creature already praising Allah on your land deserves to be seen and protected.


**How?**

1. Walk the entire land at different times of day (dawn, midday, dusk) over the course of one week, observing and recording all wildlife you see or hear.
2. Note specific habitat features: old trees with cavities (nesting birds, bats), hedgerows, stone walls, log piles, water bodies, long grass areas, and bare ground patches (ground-nesting bees).
3. Look for signs of wildlife even when animals are not visible: droppings, tracks, nests, burrows, feeding damage on plants, and spider webs.
4. Mark each habitat feature and wildlife sighting on your land map with a symbol and date.
5. Identify movement routes — look for worn tracks through vegetation, gaps in hedges or fences that animals use, and corridors of cover connecting different habitat patches.
6. Research which species are native to your region and which are present on your land to understand what is missing.
7. Completion indicator: an annotated wildlife and habitat map showing all existing habitat features, species sightings, and movement routes.` },
        { title: 'Plant native hedgerows and tree lines connecting isolated habitat patches', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 6:141",
              arabic: "وَهُوَ الَّذِي أَنشَأَ جَنَّاتٍ مَّعْرُوشَاتٍ وَغَيْرَ مَعْرُوشَاتٍ وَالنَّخْلَ وَالزَّرْعَ مُخْتَلِفًا أُكُلُهُ",
              translation: "And He it is who produces gardens trellised and untrellised, and date palms, and crops of different shape and taste.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 27:60",
              arabic: "أَمَّنْ خَلَقَ السَّمَاوَاتِ وَالْأَرْضَ وَأَنزَلَ لَكُم مِّنَ السَّمَاءِ مَاءً فَأَنبَتْنَا بِهِ حَدَائِقَ ذَاتَ بَهْجَةٍ",
              translation: "Is He [not best] who created the heavens and the earth and sent down for you rain from the sky, causing to grow thereby gardens of joyful beauty?\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 86:12",
              arabic: "وَالْأَرْضِ ذَاتِ الصَّدْعِ",
              translation: "by the earth that cracks open!",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              rationale: "the image of earth cracking open as seeds germinate — the power of plantings breaking through soil — grounds native hedgerow planting in Quranic wonder",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2320",
              translation: "The Prophet (peace be upon him) said: \"There is none amongst the Muslims who plants a tree or sows seeds, and then a bird, or a person or an animal eats from it, but is regarded as a charitable gift for him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Isolated habitat patches are ecological islands — wildlife trapped in one patch cannot reach food, mates, or shelter in another. Hedgerows and tree lines function as green highways, allowing birds, mammals, insects, and even amphibians to move safely across the landscape. Planting these connectors transforms your land from a collection of fragments into a functioning ecosystem. The Quran describes how Allah sends water to revive dead land and "spread forth every kind of beautiful species in pairs" (22:5) — your corridors enable that spreading.


**How?**

1. Identify the gaps between existing habitat patches on your wildlife map — where are the missing links that, if connected, would allow continuous movement?
2. Design hedgerow routes along field edges, fencelines, or boundaries where they serve double duty as windbreaks, privacy screens, or boundary markers.
3. Select a diverse mix of native species: at least 5 different hedgerow species (e.g., hawthorn, blackthorn, field maple, hazel, dog rose) planted in a staggered double row.
4. Plant bare-root whips during the dormant season (November-March in the Northern Hemisphere) at 30-45cm spacing within each row, with rows 30cm apart.
5. Protect new hedgerows with temporary fencing or tree guards until established.
6. Allow the base of hedgerows to grow wild with native wildflowers and grasses — do not mow to the hedge base.
7. Completion indicator: native hedgerows or tree lines planted along all identified corridor routes, connecting previously isolated habitat patches into a continuous network.` },
        { title: 'Create pollinator habitat — wildflower meadows, bee hotels, and flowering hedgerows', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 16:68-69",
              arabic: "وَأَوْحَىٰ رَبُّكَ إِلَى النَّحْلِ أَنِ اتَّخِذِي مِنَ الْجِبَالِ بُيُوتًا وَمِنَ الشَّجَرِ وَمِمَّا يَعْرِشُونَ ثُمَّ كُلِي مِن كُلِّ الثَّمَرَاتِ",
              translation: "And your Lord inspired to the bee: \"Take for yourself among the mountains, houses, and among the trees and in that which they construct. Then eat from all the fruits.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 6:38",
              arabic: "وَمَا مِن دَابَّةٍ فِي الْأَرْضِ وَلَا طَائِرٍ يَطِيرُ بِجَنَاحَيْهِ إِلَّا أُمَمٌ أَمْثَالُكُم",
              translation: "And there is no creature on earth or bird that flies with its wings except that they are communities like you.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2320",
              translation: "The Prophet (peace be upon him) said: \"There is no Muslim who plants a tree or sows seeds, and then a bird, or a person, or an animal eats from it, except that it is regarded as sadaqah for him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Pollinators are responsible for one in three bites of food humans eat. Without bees, hoverflies, butterflies, and other pollinators, the food forest and crop production will fail regardless of how well the soil is prepared. Pollinator populations are in steep decline globally due to habitat loss and pesticides. Creating dedicated pollinator habitat on your land is both an ecological necessity and a spiritual responsibility — the bee is honoured with its own surah in the Quran (An-Nahl, 16), and Allah inspires the bee to build and to take from every fruit.


**How?**

1. Identify 2-3 areas on the land suitable for wildflower meadows: south-facing, well-drained, and not needed for crop production.
2. Prepare the ground by removing existing vegetation and reducing soil fertility (wildflowers thrive in poor soil; if soil is rich, remove the top 5cm of topsoil).
3. Sow a native wildflower seed mix designed for your region, including species that flower from early spring to late autumn to provide continuous forage.
4. Build or purchase bee hotels — bundles of hollow stems (bamboo, reed) or drilled hardwood blocks — and mount them in sheltered, south-facing locations at 1-1.5m height.
5. Ensure at least some flowering shrubs are included in every hedgerow: blackthorn (early spring), hawthorn (late spring), and dog rose (summer) provide sequential bloom.
6. Maintain wildflower meadows with an annual late-summer cut (after seeds set) — never mow during flowering season.
7. Completion indicator: wildflower meadows established in at least 2 areas, bee hotels installed at 3 or more locations, and flowering species present in all hedgerows providing blooms from spring through autumn.` },
        { title: 'Install water features for wildlife — a pond, birdbaths, and shallow drinking stations', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:164",
              arabic: "وَمَا أَنزَلَ اللَّهُ مِنَ السَّمَاءِ مِن مَّاءٍ فَأَحْيَا بِهِ الْأَرْضَ بَعْدَ مَوْتِهَا وَبَثَّ فِيهَا مِن كُلِّ دَابَّةٍ",
              translation: "And what Allah has sent down from the heavens of rain, giving life thereby to the earth after its lifelessness and dispersing therein every kind of moving creature.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 24:45",
              arabic: "وَاللَّهُ خَلَقَ كُلَّ دَابَّةٍ مِّن مَّاءٍ",
              translation: "And Allah has created every creature from water.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2466",
              translation: "The Prophet (peace be upon him) said: \"A man was once walking on a road when he became very thirsty. He found a well, went down into it, drank, and came out. Then he saw a dog panting and licking the mud from thirst. He went down into the well again and filled his shoe with water and gave it to the dog. Allah thanked him and forgave him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Water is the most critical limiting factor for wildlife. Even a small pond dramatically increases the diversity and abundance of species on a site — amphibians, dragonflies, birds, hedgehogs, and beneficial insects all depend on accessible water.

**How?**

1. Select a location for a wildlife pond: a low point in the landscape where water naturally collects is ideal, partially shaded to prevent excessive algal growth.
2. Dig the pond with varied depths — a shallow shelf (10-20cm) for birds and amphibian access, sloping to a deeper section (60-80cm minimum) that will not freeze solid in winter.
3. Line with a durable, wildlife-safe liner (butyl rubber or puddled clay) and cover with a layer of clean gravel and soil.
4. Plant native aquatic and marginal species: water lily, iris, marsh marigold, and oxygenating plants that keep the water clear.
5. Ensure at least one gently sloping edge so that hedgehogs and other small animals can climb out if they fall in.
6. Install 3-5 birdbaths or shallow drinking stations at different locations across the land, placed near cover (bushes or trees) so birds feel safe drinking.
7. Completion indicator: wildlife pond constructed and planted, at least 3 birdbaths or drinking stations installed across the land, and all water features accessible to small animals.` },
        { title: 'Establish a "Zone 5" wildlife sanctuary — a no-intervention area dedicated entirely to wild nature', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 7:56",
              arabic: "وَلَا تُفْسِدُوا فِي الْأَرْضِ بَعْدَ إِصْلَاحِهَا",
              translation: "And cause not corruption upon the earth after its reformation.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 6:38",
              arabic: "وَمَا مِن دَابَّةٍ فِي الْأَرْضِ وَلَا طَائِرٍ يَطِيرُ بِجَنَاحَيْهِ إِلَّا أُمَمٌ أَمْثَالُكُم",
              translation: "And there is no creature on earth or bird that flies with its wings except that they are communities like you.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 1365",
              translation: "The Prophet (peace be upon him) declared Madinah a sanctuary and said: \"Its trees are not to be cut and its game is not to be hunted.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "This establishes the prophetic precedent for wildlife sanctuaries.",
            },
          ],
          description: `**Why?**

Zone 5 in permaculture design is land left entirely to nature — no harvesting, no management, no human intervention beyond observation. This is the most radical act of trust (tawakkul) a land steward can make: dedicating a portion of the land to Allah's creatures with no expectation of return. The Quran describes how Allah causes every kind of creature to grow (31:10) — Zone 5 gives that creative power uninterrupted space to express itself. It also serves as a living reference point, showing you what the land does when left to its own intelligence.


**How?**

1. Select the area least suited to productive use — steep slopes, wet hollows, rocky ground, or the farthest corner of the property.
2. Aim for at least 10-15% of the total land area dedicated to Zone 5 — smaller is acceptable on very small properties but the principle of dedication remains important.
3. Mark the boundary clearly with posts or a natural hedge so that workers and visitors know not to enter, harvest, or manage this area.
4. Remove any existing litter, debris, or fencing that could harm wildlife, then leave the area completely alone.
5. If the area is currently bare or degraded, you may seed it once with a native species mix to kickstart succession, then step back permanently.
6. Visit the boundary quarterly to observe changes — take photographs from the same points each time to document natural succession over years.
7. Completion indicator: Zone 5 boundary marked, area cleared of human debris, any initial seeding done, and a quarterly photo-observation schedule established.` },
      ],
    },
    {
      title: 'Launch community work days — regular gatherings for collective land stewardship and learning',
      priority: 'high', tags: ['community', 'ummah'],
      description: 'Land stewardship is not a solo endeavour — it is an expression of ummah (community). Regular work days bring people together to labour, learn, eat, and pray on the land, building the social fabric that sustains the project through challenges.',
      subtasks: [
        { title: 'Design a monthly work day programme with seasonal tasks, learning sessions, and shared meals', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 5:2",
              arabic: "وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ",
              translation: "And cooperate in righteousness and piety.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 9:71",
              arabic: "وَالْمُؤْمِنُونَ وَالْمُؤْمِنَاتُ بَعْضُهُمْ أَوْلِيَاءُ بَعْضٍ",
              translation: "The believing men and believing women are allies of one another.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2320",
              translation: "The Prophet (peace be upon him) said: \"There is no Muslim who plants a tree or sows seeds, and then a bird, or a person, or an animal eats from it, except that it is regarded as sadaqah for him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A work day without structure becomes either a social gathering with no productivity or a forced labour session with no joy. Designing a programme that balances physical work, learning, and fellowship ensures people leave feeling they contributed, grew, and connected. Seasonal tasks align the work with what the land actually needs right now, preventing the frustration of doing the wrong job at the wrong time.

**How?**

1. Create an annual calendar of monthly work days, fixed to the same weekend each month for predictability (e.g., first Saturday).
2. For each month, identify the primary seasonal task: winter pruning in January, seed starting in March, planting in April, mulching in June, harvesting in September, composting in November.
3. Plan a 15-20 minute learning session for each work day: a short talk, demonstration, or hands-on workshop on a relevant topic (composting technique, seed saving, tree identification, water system maintenance).
4. Assign meal preparation to a rotating team — keep meals simple, halal, and abundant, with food from the land wherever possible.
5. Schedule each day with clear time blocks: arrival and briefing (30 min), work session 1 (2 hours), learning session (20 min), work session 2 (1.5 hours), shared meal and cleanup (1 hour).
6. Prepare a signup and communication system (WhatsApp group, email list) to confirm attendance and assign tasks in advance.
7. Completion indicator: a 12-month work day programme with seasonal tasks, learning topics, and meal rotation planned, and the first 3 months communicated to the community.` },
        { title: 'Create a volunteer onboarding pack with safety briefing, land map, and task guide', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:195",
              arabic: "وَلَا تُلْقُوا بِأَيْدِيكُمْ إِلَى التَّهْلُكَةِ وَأَحْسِنُوا إِنَّ اللَّهَ يُحِبُّ الْمُحْسِنِينَ",
              translation: "And do not throw yourselves with your own hands into destruction. And do good; indeed, Allah loves the doers of good.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2586",
              translation: "The Prophet (peace be upon him) said: \"None of you truly believes until he loves for his brother what he loves for himself.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

New volunteers arrive with goodwill but no context. Without onboarding, they do not know where to go, what to do, what is dangerous, or why the land is managed the way it is. A clear onboarding pack respects their time, keeps them safe, and channels their energy productively from the first hour. It also communicates the Islamic covenant underpinning the project, ensuring every participant understands they are engaging in an act of ibadah (worship), not just gardening.


**How?**

1. Write a one-page welcome letter explaining the land's purpose, its Islamic covenant foundation, and what volunteers can expect.
2. Create a safety briefing card covering: hazards on site (tools, uneven ground, water features), first aid kit location, emergency contacts, sun and hydration awareness, and any site-specific risks.
3. Include a simplified land map showing: parking, gathering area, toilets, first aid station, tool storage, planting zones, and off-limits areas (Zone 5, sensitive plantings).
4. Write a task guide listing common work day activities with brief instructions: how to mulch correctly, how to plant a tree, how to use the composting system, how to harvest without damaging plants.
5. Add a volunteer agreement covering: commitment to chemical-free practices, respect for the covenant, photography consent, and emergency contact details for the volunteer.
6. Print the pack on durable paper or laminate key cards, and provide a digital version for pre-reading.
7. Completion indicator: onboarding pack created in both print and digital format, reviewed by trustees, and ready for distribution at the next work day.` },
        { title: 'Build partnerships with local masjids, schools, and youth groups for regular participation', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 5:2",
              arabic: "وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ",
              translation: "And cooperate in righteousness and piety.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 3:103",
              arabic: "وَاعْتَصِمُوا بِحَبْلِ اللَّهِ جَمِيعًا وَلَا تَفَرَّقُوا",
              translation: "And hold firmly to the rope of Allah all together and do not become divided.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2320",
              translation: "The Prophet (peace be upon him) said: \"There is no Muslim who plants a tree or sows seeds, and then a bird, or a person, or an animal eats from it, except that it is regarded as sadaqah for him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The land stewardship project must be embedded in the wider community to survive and grow. Masjids provide spiritual grounding and a ready audience of families. Schools bring children who learn fastest and remember longest. Youth groups provide energy and digital outreach capacity. These partnerships transform the land from a private project into a community institution — the kind of waqf asset that serves generation after generation, which is the ultimate goal.


**How?**

1. Draft a partnership proposal explaining the land project, its benefits for each type of partner (spiritual connection for masjids, outdoor education for schools, leadership development for youth), and what participation looks like.
2. Schedule meetings with the imam or committee of at least 3 local masjids to present the proposal and discuss how congregants can participate.
3. Contact local schools (especially those with outdoor education or environmental programmes) to offer the land as a field trip or ongoing project site.
4. Reach out to Muslim youth organisations, scout groups, and university Islamic societies to recruit young volunteers.
5. For each partnership, define a clear, simple commitment: one work day per quarter, one school visit per term, or one youth project per year.
6. Appoint a partnership coordinator from the trustees to maintain relationships and follow up on commitments.
7. Completion indicator: formal or informal partnership agreements in place with at least 2 masjids, 1 school, and 1 youth group, with scheduled participation dates on the calendar.` },
        { title: 'Document and share progress through a land journal, photo diary, and seasonal newsletter', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 96:1-5",
              arabic: "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ خَلَقَ الْإِنسَانَ مِنْ عَلَقٍ اقْرَأْ وَرَبُّكَ الْأَكْرَمُ الَّذِي عَلَّمَ بِالْقَلَمِ عَلَّمَ الْإِنسَانَ مَا لَمْ يَعْلَمْ",
              translation: "Read in the name of your Lord who created — created man from a clinging substance. Read, and your Lord is the Most Generous — who taught by the pen — taught man that which he knew not.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 1631",
              translation: "The Prophet (peace be upon him) said: \"When a person dies, his deeds come to an end except for three: ongoing charity, knowledge that is benefited from, and a righteous child who prays for him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Documentation serves three purposes: accountability to the community, inspiration for supporters, and a historical record for future stewards. People invest their time, money, and du'a in this project — they deserve to see what their investment produces. A photo diary captures the transformation of the land in a way that words alone cannot. The Quran repeatedly invites reflection on the signs of creation (3:190), and your documentation invites the community to witness those signs unfolding on this specific piece of earth.


**How?**

1. Designate a "land journalist" — a trustee or volunteer responsible for documentation.
2. Take photographs from fixed points on the land monthly, capturing the same views through every season to show transformation over time.
3. After each work day, write a brief journal entry: what was accomplished, how many people participated, what was learned, and what comes next.
4. Compile a seasonal newsletter (quarterly) summarising the past 3 months: accomplishments, challenges, upcoming events, volunteer recognition, and a call to action.
5. Distribute the newsletter through partner masjids, schools, and the project's communication channels (email, WhatsApp, website).
6. Archive all photographs, journal entries, and newsletters in an organised digital folder for the permanent record.
7. Completion indicator: monthly photo diary active from fixed points, post-work-day journal entries written for at least 3 consecutive events, and the first seasonal newsletter distributed to all partners and supporters.` },
        { title: 'Establish a children and youth programme teaching Islamic land stewardship through hands-on projects', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 66:6",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا قُوا أَنفُسَكُمْ وَأَهْلِيكُمْ نَارًا",
              translation: "O you who have believed, protect yourselves and your families from a Fire.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 2:30",
              arabic: "إِنِّي جَاعِلٌ فِي الْأَرْضِ خَلِيفَةً",
              translation: "Indeed, I will make upon the earth a khalifah.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2320",
              translation: "The Prophet (peace be upon him) said: \"There is no Muslim who plants a tree or sows seeds, and then a bird, or a person, or an animal eats from it, except that it is regarded as sadaqah for him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 1914",
              translation: "The Prophet (peace be upon him) said: \"He is not one of us who does not show mercy to our young ones and respect to our elders.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Children who grow food, care for soil, and observe wildlife on sacred land carry those experiences for life. A dedicated youth programme ensures the next generation does not merely inherit the land but inherits the knowledge, values, and skills to steward it.

**How?**

1. Design a simple, age-appropriate curriculum: younger children (5-9) focus on planting seeds, watering, bug identification, and nature crafts; older children (10-15) learn composting, pruning, water systems, and the Islamic principles of khilafah and amanah.
2. Assign each child or youth group their own small garden bed or project within the food forest — ownership drives engagement.
3. Link each practical task to an Islamic teaching: planting seeds connects to the hadith on sadaqah jariyah, water conservation connects to the hadith on wudu at a flowing river, composting connects to the prohibition of waste.
4. Host at least one dedicated youth work day per quarter, separate from the main work day, with age-appropriate activities and supervision.
5. Create simple achievement milestones (e.g., "planted my first tree," "harvested my first crop," "learned to make compost") with certificates or badges.
6. Train at least 2 adult volunteers specifically for youth supervision and mentorship.
7. Completion indicator: youth programme curriculum designed, first youth work day held with at least 8 participants, and a mentorship team of at least 2 trained adults in place.` },
      ],
    },
  ],
  moontrance_land_excellence: [
    {
      title: 'Achieve a fully regenerative closed-loop system — zero external inputs, net-positive soil health',
      priority: 'medium', tags: ['regenerative', 'closed-loop'],
      description: 'The ultimate expression of land stewardship is a system that needs nothing from outside and gives back more than it takes. A closed-loop regenerative system produces its own fertility (compost, manure, nitrogen fixation), its own water (rainwater harvesting), its own seed (seed bank), and its own energy — mirroring the self-sustaining perfection of the natural systems Allah created.',
      subtasks: [
        { title: 'Audit all remaining external inputs and create a plan to replace each with an on-site source', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 7:56",
              arabic: "وَلَا تُفْسِدُوا فِي الْأَرْضِ بَعْدَ إِصْلَاحِهَا",
              translation: "And cause not corruption upon the earth after its reformation.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 30:41",
              arabic: "ظَهَرَ الْفَسَادُ فِي الْبَرِّ وَالْبَحْرِ بِمَا كَسَبَتْ أَيْدِي النَّاسِ",
              translation: "Corruption has appeared throughout the land and sea because of what the hands of people have earned.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Musnad Ahmad 12981",
              translation: "The Prophet (peace be upon him) said: \"If the Hour is about to be established and one of you has a palm shoot in his hand, and he is able to plant it before it happens, then let him plant it.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Every bag of compost purchased, every seed packet bought, and every litre of municipal water used represents a dependency on systems outside your control. A closed loop is not merely an ecological ideal — it is a practical strategy for resilience. Supply chains break, prices rise, and corporations change formulas. The Quran describes the earth as providing everything needed for those who dwell upon it (41:10), and a regenerative system proves that truth on a single parcel of land.


**How?**

1. List every external input currently used on the land: purchased compost, fertiliser, seeds, seedlings, mulch material, animal feed, municipal water, fuel, tools, and any other consumables.
2. For each input, identify the potential on-site replacement: purchased compost becomes on-site compost; purchased seeds become saved seeds; municipal water becomes rainwater; purchased mulch becomes chop-and-drop from the food forest.
3. Assess how far each replacement has progressed: fully replaced, partially replaced, or not yet started.
4. For items not yet replaceable (e.g., certain specialist seeds, fuel for equipment), research transition strategies: manual tools to replace powered ones, perennial replacements for annual crops, and community exchange for specialist materials.
5. Set a target date for eliminating each external input, prioritising the most expensive or most ecologically impactful ones first.
6. Create a "Closed-Loop Tracker" document listing each input, its replacement, and the target completion date.
7. Completion indicator: a comprehensive input audit completed, replacement strategies identified for every item, and a phased transition timeline documented in the Closed-Loop Tracker.` },
        { title: 'Integrate small livestock (chickens, bees, or small ruminants) to close the fertility and pest management loop', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 6:142",
              arabic: "وَمِنَ الْأَنْعَامِ حَمُولَةً وَفَرْشًا كُلُوا مِمَّا رَزَقَكُمُ اللَّهُ",
              translation: "And of the livestock are some for burden and some for food. Eat of what Allah has provided for you.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 16:5-8",
              arabic: "وَالْأَنْعَامَ خَلَقَهَا لَكُمْ فِيهَا دِفْءٌ وَمَنَافِعُ وَمِنْهَا تَأْكُلُونَ",
              translation: "And the livestock He has created for you; in them is warmth and numerous benefits, and from them you eat.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 1955",
              translation: "The Prophet (peace be upon him) said: \"Indeed Allah has prescribed ihsan (excellence) in all things. So when you slaughter, slaughter well. Let each one of you sharpen his blade and let him spare suffering to the animal he slaughters.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Plants and animals evolved together — separating them is an industrial aberration. Chickens convert kitchen scraps and garden pests into eggs and high-nitrogen manure. Bees pollinate every flowering crop and tree while producing honey and wax. Small ruminants (sheep, goats) graze cover crops, manage weeds, and produce manure. Integrating animals closes the fertility loop that compost alone cannot fully achieve, and it follows the Quranic model of livestock as provision and blessing (16:5-8).


**How?**

1. Assess which livestock are appropriate for your land size, local regulations, and community capacity to care for them.
2. Start with the easiest and most universally beneficial: a small flock of laying hens (4-8 birds) and 2-3 beehives.
3. For chickens: build or purchase a mobile coop (chicken tractor) that can be moved across the land, allowing chickens to scratch, eat pests, and fertilise a new section each week.
4. For bees: take a beekeeping course, source local nucleus colonies adapted to your climate, and place hives near the food forest and wildflower meadows.
5. If land size permits, consider 2-4 sheep or goats for targeted grazing of cover crops and rough areas — rotational grazing prevents overgrazing and distributes manure evenly.
6. Design the livestock rotation so that animals follow crop harvests: chickens clean up after vegetable harvests, goats graze cover crops before they are turned under.
7. Completion indicator: at least one livestock species integrated into the land system, housed appropriately, and contributing to the fertility and pest management cycle.` },
        { title: 'Commission an independent soil health assessment comparing current results to the original baseline', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 7:58",
              arabic: "وَالْبَلَدُ الطَّيِّبُ يَخْرُجُ نَبَاتُهُ بِإِذْنِ رَبِّهِ وَالَّذِي خَبُثَ لَا يَخْرُجُ إِلَّا نَكِدًا",
              translation: "And the good land — its vegetation emerges by permission of its Lord; but that which is bad — nothing emerges except sparsely, with difficulty.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 26:7",
              arabic: "أَوَلَمْ يَرَوْا إِلَى الْأَرْضِ كَمْ أَنبَتْنَا فِيهَا مِن كُلِّ زَوْجٍ كَرِيمٍ",
              translation: "Did they not look at the earth — how much We have produced therein from every noble kind?",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 1552",
              translation: "The Prophet (peace be upon him) said: \"Whoever cultivates barren land, it belongs to him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Claiming regeneration without evidence is empty words. An independent assessment by a qualified soil scientist provides objective proof that your stewardship has improved — or reveals where more work is needed. Comparing current soil health to the original baseline demonstrates the transformation to the community, funders, and future replicators. The Quran says "bring your proof if you are truthful" (2:111), and in land stewardship, soil data is the proof.


**How?**

1. Hire a qualified, independent soil scientist or accredited laboratory — not the same person or lab that did the original assessment, to ensure impartiality.
2. Collect samples from the exact same monitoring stations established during the CORE phase, using the same methodology.
3. Request the same panel of tests: pH, organic matter percentage, nitrogen, phosphorus, potassium, microbial biomass, earthworm count, and any contaminants tested originally.
4. Request additional indicators of regeneration: aggregate stability (soil structure), water infiltration rate, and mycorrhizal colonisation percentage.
5. When results arrive, create a side-by-side comparison table: baseline values versus current values for every parameter at every monitoring station.
6. Ask the independent assessor to provide a written opinion on the trajectory of soil health.
7. Completion indicator: independent soil assessment completed, side-by-side comparison table produced, and written opinion from the assessor documenting measurable improvement in soil health.` },
        { title: 'Achieve net carbon sequestration — the land absorbs more carbon than all operations emit', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 7:56",
              arabic: "وَلَا تُفْسِدُوا فِي الْأَرْضِ بَعْدَ إِصْلَاحِهَا",
              translation: "And cause not corruption upon the earth after its reformation.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 30:41",
              arabic: "ظَهَرَ الْفَسَادُ فِي الْبَرِّ وَالْبَحْرِ بِمَا كَسَبَتْ أَيْدِي النَّاسِ لِيُذِيقَهُم بَعْضَ الَّذِي عَمِلُوا لَعَلَّهُمْ يَرْجِعُونَ",
              translation: "Corruption has appeared throughout the land and sea because of what the hands of people have earned so He may let them taste part of what they have done that perhaps they will return.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2320",
              translation: "The Prophet (peace be upon him) said: \"There is no Muslim who plants a tree or sows seeds, and then a bird, or a person, or an animal eats from it, except that it is regarded as sadaqah for him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Climate disruption is one of the greatest forms of fasad (corruption) on earth in our time. A regenerative land project that achieves net carbon sequestration actively heals this corruption rather than merely reducing its contribution. Trees, soil organic matter, and biochar lock atmospheric carbon into stable forms for decades or centuries. Quantifying this sequestration provides a concrete metric of the land's contribution to restoring the earth's balance — the mizan that Allah established and commanded us not to transgress (55:7-8).


**How?**

1. Estimate the carbon stored in all trees on the land using standard allometric equations (based on trunk diameter, height, and species — forestry extension services provide these).
2. Calculate carbon stored in soil organic matter by multiplying organic matter percentage (from soil tests) by soil bulk density and depth — typically the top 30cm is measured.
3. Calculate carbon stored in any biochar applied, wood chip mulch, and permanent hedgerows.
4. Sum all carbon storage figures to get total carbon sequestered.
5. Estimate total carbon emissions from all land operations: fuel for any machinery, embodied carbon in purchased inputs, transport of volunteers and materials.
6. Subtract emissions from sequestration to determine if the land is net positive (sequestering more than it emits).
7. Completion indicator: a carbon balance sheet showing total sequestration versus total emissions, demonstrating net carbon sequestration with a positive margin.` },
        { title: 'Document the complete system design as a replicable model for other communities', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 5:2",
              arabic: "وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ",
              translation: "And cooperate in righteousness and piety.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 2:30",
              arabic: "إِنِّي جَاعِلٌ فِي الْأَرْضِ خَلِيفَةً",
              translation: "Indeed, I will make upon the earth a khalifah.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 1631",
              translation: "The Prophet (peace be upon him) said: \"When a person dies, his deeds come to an end except for three: ongoing charity, knowledge that is benefited from, and a righteous child who prays for him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Musnad Ahmad 12981",
              translation: "The Prophet (peace be upon him) said: \"If the Hour is about to be established and one of you has a palm shoot in his hand, and he is able to plant it before it happens, then let him plant it.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

One regenerative land project is a blessing. A replicable model that other Muslim communities can follow is a multiplied blessing — sadaqah jariyah that scales beyond your own boundaries. The Quran says "whoever does a good deed, We shall multiply it for him" (42:23), and documentation is the mechanism of multiplication. Without clear, honest documentation including both successes and failures, each new community starts from scratch rather than building on your experience.


**How?**

1. Write a comprehensive design manual covering every phase: soil assessment, water systems, legal structure, planting plan, composting, food forest, rainwater harvesting, biodiversity, community programme, and closed-loop system.
2. For each phase, include: the Islamic principles guiding the approach, the practical steps taken, the costs incurred, the mistakes made and lessons learned, and the results achieved.
3. Include template documents that other communities can adapt: covenant template, governance document, work day programme template, monitoring log templates, and species selection framework.
4. Photograph and diagram the physical systems: irrigation layout, composting station design, food forest guild layout, swale construction, and grey water system.
5. Publish the manual in accessible formats: PDF for download, website for browsing, and printed copies for communities without reliable internet.
6. Present the model at Islamic conferences, permaculture gatherings, and community events to reach potential replicators.
7. Completion indicator: a complete, published design manual with templates, photographs, and diagrams, available in at least 2 formats and presented at a minimum of one external event.` },
      ],
    },
    {
      title: 'Produce surplus food and resources for community distribution — the land gives more than it consumes',
      priority: 'medium', tags: ['surplus', 'sadaqah'],
      description: 'The measure of a regenerative land project is not what it produces for itself but what it gives away. When the food forest, gardens, and livestock produce more than the stewards need, the surplus becomes direct sadaqah — fresh, halal, tayyib food distributed to those who need it most. This is the point where khilafah al-ard becomes tangible community provision.',
      subtasks: [
        { title: 'Track all harvests by weight, type, and destination to establish a production baseline', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 6:141",
              arabic: "وَهُوَ الَّذِي أَنشَأَ جَنَّاتٍ مَّعْرُوشَاتٍ وَغَيْرَ مَعْرُوشَاتٍ وَالنَّخْلَ وَالزَّرْعَ مُخْتَلِفًا أُكُلُهُ وَالزَّيْتُونَ وَالرُّمَّانَ مُتَشَابِهًا وَغَيْرَ مُتَشَابِهٍ ۚ كُلُوا مِن ثَمَرِهِ إِذَا أَثْمَرَ وَآتُوا حَقَّهُ يَوْمَ حَصَادِهِ",
              translation: "And He it is who produces gardens, trellised and untrellised, and date-palms, and crops of different shape and taste, and olives and pomegranates, similar and different. Eat of their fruit when they bear fruit, and pay the due thereof on the day of its harvest.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 55:10-12",
              arabic: "وَالْأَرْضَ وَضَعَهَا لِلْأَنَامِ * فِيهَا فَاكِهَةٌ وَالنَّخْلُ ذَاتُ الْأَكْمَامِ * وَالْحَبُّ ذُو الْعَصْفِ وَالرَّيْحَانُ",
              translation: "And the earth He laid down for all living creatures. Therein are fruits, and date-palms with sheathed clusters, and grain with husks, and fragrant herbs.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 1553a",
              translation: "The Prophet (peace be upon him) said: \"There is no Muslim who plants a tree or sows seeds, and then a bird, or a person, or an animal eats from it, except that it is regarded as a charitable gift (sadaqah) for him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

You cannot distribute surplus you have not measured. Tracking harvests by weight provides the data needed to identify which crops produce abundantly, which underperform, and how much is available for community distribution versus steward needs. This data also demonstrates the land's productivity to supporters and potential replicators. The principle of itqan (excellence) demands that generosity be measured and intentional, not haphazard.


**How?**

1. Set up a harvest log — a notebook or spreadsheet at the tool station — with columns for date, crop, weight (kg), and destination (steward use, community distribution, seed saving, composting).
2. Invest in a simple hanging scale or digital kitchen scale that lives at the harvest station.
3. Weigh every harvest before it leaves the land, even small ones — consistency matters more than precision.
4. At the end of each month, total each crop's harvest and categorise by destination.
5. At the end of each season, calculate total food produced, total distributed, and the ratio of distribution to production.
6. Identify the top 5 producing crops and the bottom 5 — use this data to refine planting plans for the next season.
7. Completion indicator: harvest log in active use for at least one full growing season, with monthly and seasonal summaries calculated and documented.` },
        { title: 'Establish distribution channels — food bank partnerships, masjid pantries, and direct community shares', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:267",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا أَنفِقُوا مِن طَيِّبَاتِ مَا كَسَبْتُمْ وَمِمَّا أَخْرَجْنَا لَكُم مِّنَ الْأَرْضِ",
              translation: "O you who believe, spend from the good things you have earned and from what We have produced for you from the earth.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 76:8-9",
              arabic: "وَيُطْعِمُونَ الطَّعَامَ عَلَىٰ حُبِّهِ مِسْكِينًا وَيَتِيمًا وَأَسِيرًا * إِنَّمَا نُطْعِمُكُمْ لِوَجْهِ اللَّهِ لَا نُرِيدُ مِنكُمْ جَزَاءً وَلَا شُكُورًا",
              translation: "And they give food, in spite of their love for it, to the poor, the orphan, and the captive. (Saying): We feed you seeking only the Face of Allah — we wish for no reward nor thanks from you.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2374",
              translation: "The Prophet (peace be upon him) said: \"Whoever has extra provisions should give them to one who has no provisions.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Surplus food spoils quickly — without established distribution channels, your abundant harvest rots in crates while families in need go without. Distribution channels must be set up before the surplus arrives, not after. Partnering with food banks, masjid pantries, and direct community share programmes ensures that every kilogram of excess production reaches someone who needs it, fulfilling the Quranic injunction to feed the needy (76:8-9).


**How?**

1. Contact local food banks and community fridges to establish a regular donation arrangement — many accept fresh produce and will provide collection or accept drop-offs on a schedule.
2. Approach masjids in your partnership network to set up a "land pantry" table after jumu'ah (Friday prayer) where fresh produce is available for free.
3. Design a community share programme: families sign up to receive a weekly or fortnightly box of whatever is in season, on a sliding-scale or pay-what-you-can basis.
4. Prioritise distribution to those in most need: single-parent households, refugees, elderly, and low-income families — coordinate with masjid welfare committees to identify recipients.
5. Establish a logistics plan: who harvests, who packs, who delivers, and on which days — this must be reliable, not ad hoc.
6. Track all distributions in your harvest log by channel and approximate number of households reached.
7. Completion indicator: at least 2 distribution channels established and actively receiving surplus produce, with a logistics plan and tracking system in operation.` },
        { title: 'Add value to surplus through preservation — drying, fermenting, and honey production', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 55:10-12",
              arabic: "وَالْأَرْضَ وَضَعَهَا لِلْأَنَامِ فِيهَا فَاكِهَةٌ وَالنَّخْلُ ذَاتُ الْأَكْمَامِ وَالْحَبُّ ذُو الْعَصْفِ وَالرَّيْحَانُ",
              translation: "And the earth He laid [out] for the creatures. Therein is fruit and palm trees having sheaths [of dates] and grain having husks and scented plants.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 1552",
              translation: "The Prophet (peace be upon him) said: \"There is none amongst the Muslims who plants a tree or sows seeds, and then a bird, or a person, or an animal eats from it, but it is regarded as a charitable gift for him.\" Surplus production multiplies this ongoing charity.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Fresh produce is seasonal, but hunger is not. Preservation extends the reach of the land's bounty into winter months and allows surplus from peak harvest to serve the community year-round. Dried herbs, fermented vegetables, preserved fruits, and honey are shelf-stable, nutrient-dense, and carry higher perceived value than fresh produce — they can also generate modest income for the land trust's operating costs. This transforms the land from a seasonal garden into a year-round provider.


**How?**

1. Identify which surplus crops are best suited to preservation: herbs for drying, cucumbers and cabbage for fermenting, fruits for jamming or drying, and honey from on-site hives.
2. Set up a simple drying station: a solar dehydrator (can be built from reclaimed materials) or drying racks in a well-ventilated, shaded space.
3. Learn and practise basic lacto-fermentation: sauerkraut, pickles, and kimchi require only vegetables, salt, and time — no special equipment.
4. If fruit trees are producing surplus, learn water-bath canning for jams and preserves, or simple fruit leather production in the solar dehydrator.
5. Manage beehives for honey harvest: extract honey once per year (late summer), leaving enough for the bees to overwinter, and bottle for distribution or sale.
6. Label all preserved products clearly with ingredients, date, and the land project name.
7. Completion indicator: at least 3 types of preserved products produced from surplus harvest, labelled, stored, and either distributed to the community or available for sale.` },
        { title: 'Host seasonal harvest festivals inviting the wider community to share in the land bounty', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:92",
              arabic: "لَن تَنَالُوا الْبِرَّ حَتَّىٰ تُنفِقُوا مِمَّا تُحِبُّونَ",
              translation: "You will never attain righteousness until you spend from that which you love.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 22:36",
              arabic: "فَكُلُوا مِنْهَا وَأَطْعِمُوا الْقَانِعَ وَالْمُعْتَرَّ",
              translation: "So eat from them and feed the needy — both the contented and the one who asks.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 1956",
              translation: "The Prophet (peace be upon him) said: \"The food of one person suffices for two, the food of two suffices for four, and the food of four suffices for eight.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A harvest festival is the visible, joyful expression of everything the land and community have built together. It invites people who have never visited the land to taste its produce, see its beauty, and feel its purpose. The Prophet (peace be upon him) celebrated the blessings of harvest — Eid al-Adha itself is rooted in the agricultural cycle of provision and sacrifice. A seasonal festival builds public support, attracts new volunteers, inspires other communities, and gives thanks for the provision Allah has sent through the land.


**How?**

1. Schedule harvest festivals at natural peak points: spring planting celebration, midsummer garden tour, autumn harvest gathering, and a winter gratitude meal.
2. Plan each festival as a community event open to all — not just existing volunteers, but the wider neighbourhood, partner masjids, schools, and local organisations.
3. Prepare a spread of food grown on the land: fresh salads, cooked dishes, preserved items, herbal teas, and honey.
4. Offer guided tours of the land showing the food forest, composting system, water harvesting infrastructure, and wildlife areas.
5. Include activities for children: seed planting, scavenger hunts, nature art, and tasting stations.
6. Open with a brief Islamic reflection on gratitude for provision, the role of khilafah, and the vision for the land's future.
7. Completion indicator: at least 2 seasonal harvest festivals held per year, with attendance exceeding the regular volunteer base and positive feedback documented.` },
        { title: 'Publish an annual impact report showing food produced, distributed, and community reached', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:282",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا تَدَايَنتُم بِدَيْنٍ إِلَىٰ أَجَلٍ مُّسَمًّى فَاكْتُبُوهُ",
              translation: "O you who believe, when you contract a debt for a specified term, write it down.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 17:35",
              arabic: "وَأَوْفُوا الْكَيْلَ إِذَا كِلْتُمْ وَزِنُوا بِالْقِسْطَاسِ الْمُسْتَقِيمِ",
              translation: "And give full measure when you measure, and weigh with an even balance.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (peace be upon him) said: \"Whoever treads a path seeking knowledge, Allah will make easy for him the path to Paradise.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

An annual impact report transforms scattered data into a compelling story of what the land has achieved. It is the document that funders, partners, and the community use to evaluate whether the project is fulfilling its covenant. Transparency in reporting is a requirement of amanah — the community entrusted this land to the project, and the project must account for what it has produced, distributed, and learned. A strong impact report also attracts new support and inspires replication.


**How?**

1. Compile data from the full year: total food produced (kg), total food distributed (kg and number of households reached), total volunteer hours, total community events held, and soil health metrics.
2. Calculate key ratios: food distributed as a percentage of total produced, cost per kilogram of food produced, and volunteer hours per kilogram.
3. Include qualitative stories: a family who received weekly produce, a child who planted their first tree, a partnership that deepened through shared work.
4. Include photographs from each season showing the land's transformation and community engagement.
5. Present the report at the annual general meeting of the land trust and distribute to all partners, donors, and supporters.
6. Publish online for public access and submit to any relevant Islamic charity or environmental network databases.
7. Completion indicator: annual impact report published and distributed to all stakeholders, covering the full year's quantitative and qualitative achievements.` },
      ],
    },
    {
      title: 'Develop a replicable Islamic land stewardship model — document, teach, and support new projects',
      priority: 'medium', tags: ['replication', 'dawah'],
      description: 'The greatest impact of this project is not what happens on this one parcel of land but what happens when 10, then 100, then 1000 communities follow the same model. Developing a replicable framework is the scaling mechanism — turning one act of khilafah into a movement.',
      subtasks: [
        { title: 'Distil the project methodology into a step-by-step Islamic Land Stewardship Framework', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 5:2",
              arabic: "وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ ۖ وَلَا تَعَاوَنُوا عَلَى الْإِثْمِ وَالْعُدْوَانِ",
              translation: "And cooperate in righteousness and piety, but do not cooperate in sin and aggression.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 16:90",
              arabic: "إِنَّ اللَّهَ يَأْمُرُ بِالْعَدْلِ وَالْإِحْسَانِ",
              translation: "Indeed, Allah commands justice and excellence.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2674",
              translation: "The Prophet (peace be upon him) said: \"Whoever establishes a good practice in Islam will have its reward and the reward of all who act upon it after him, without that diminishing their rewards in the slightest.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Raw experience is not transferable — methodology is. A step-by-step framework takes everything learned on this land and organises it into a sequence that any community can follow, regardless of their starting point. Without this distillation, each new project must reinvent every solution from scratch. The Quran commands us to "take provision" for the journey (2:197), and this framework is the provision you prepare for communities that will follow.


**How?**

1. Review every phase of the project from CORE through EXCELLENCE and identify the essential steps that any community must take, regardless of geography, climate, or scale.
2. Organise these steps into a sequential framework with clear stages: Assess, Protect, Restore, Plant, Harvest, Distribute, Replicate.
3. For each stage, write a summary of objectives, key actions, common mistakes, and minimum viable outcome.
4. Include decision trees for major choices: what legal structure to use, which livestock to start with, how to size water storage, and which crops to prioritise.
5. Embed Islamic principles at each stage — not as decoration but as the reasoning framework that guides decisions.
6. Test the framework document by having someone unfamiliar with the project read it and attempt to plan a hypothetical land project using only the document.
7. Completion indicator: a complete Islamic Land Stewardship Framework document, tested by at least one external reader, covering all stages from assessment to replication.` },
        { title: 'Create a training programme and mentor network to support new community land projects', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 1631",
              translation: "The Prophet (peace be upon him) said: \"When a man dies, his deeds come to an end except for three: ongoing charity (sadaqah jariyah), beneficial knowledge, or a righteous child who prays for him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Teaching others to steward land is beneficial knowledge that outlives its teacher.",
            },
          ],
          description: `**Why?**

A written framework is necessary but not sufficient. New communities need human guidance — someone who has made the mistakes, solved the problems, and can answer the questions that no document anticipates. A training programme and mentor network provides this human layer, ensuring that knowledge transfers through relationship, not just text. The Islamic tradition of isnad (chains of transmission) applies here: knowledge is most trustworthy when passed from practitioner to practitioner.


**How?**

1. Develop a training curriculum based on the framework: a 6-session course covering assessment, legal protection, soil restoration, planting, water systems, and community building.
2. Train at least 3 experienced stewards from your project as mentors, equipping them to guide new communities through the framework.
3. Offer the training programme in accessible formats: in-person weekend intensives, online webinar series, and self-paced written modules.
4. Create a mentor matching system: new communities are paired with a mentor who has relevant experience (similar climate, scale, or community context).
5. Establish a communication platform (forum, WhatsApp group, or regular video calls) where new and experienced stewards can share questions, solutions, and encouragement.
6. Run a pilot mentorship with one new community project, documenting what works and what needs improvement in the support model.
7. Completion indicator: training curriculum developed, at least 3 mentors trained, one pilot mentorship completed with documented lessons, and a communication platform active.` },
        { title: 'Establish formal partnerships with Islamic organisations to promote land stewardship as a community priority', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:13",
              arabic: "يَا أَيُّهَا النَّاسُ إِنَّا خَلَقْنَاكُم مِّن ذَكَرٍ وَأُنثَىٰ وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا",
              translation: "O mankind, We created you from a male and a female and made you into nations and tribes, that you may know one another.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 3:103",
              arabic: "وَاعْتَصِمُوا بِحَبْلِ اللَّهِ جَمِيعًا وَلَا تَفَرَّقُوا",
              translation: "And hold firmly to the rope of Allah, all together, and do not become divided.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 4919",
              translation: "The Prophet (peace be upon him) said: \"The believers in their mutual kindness, compassion, and sympathy are just like one body. When one limb suffers, the whole body responds to it with wakefulness and fever.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Individual communities can start land projects, but systemic change requires institutional backing. Formal partnerships with Islamic organisations — national charities, scholarly bodies, mosque networks, and Islamic finance institutions — elevate land stewardship from a niche hobby to a recognised priority of the ummah. These partnerships provide access to funding, land, expertise, and the credibility needed to inspire communities who would not otherwise consider a land project.


**How?**

1. Identify the key Islamic organisations in your country or region that have influence, resources, or land: national Islamic charities, waqf boards, mosque umbrella bodies, Islamic finance institutions, and Muslim environmental groups.
2. Prepare a partnership proposal for each type of organisation, tailored to their mission: for charities, emphasise food distribution; for waqf boards, emphasise permanent endowment; for mosque networks, emphasise community building.
3. Present the proposal at conferences, council meetings, and through personal networks — institutional partnerships require relational trust, not just documents.
4. Negotiate specific partnership terms: funding support, land access, volunteer mobilisation, or co-branding of the stewardship framework.
5. Formalise partnerships with signed memoranda of understanding (MOUs) specifying commitments, timelines, and mutual expectations.
6. Report regularly to partners on project outcomes to maintain trust and demonstrate value.
7. Completion indicator: formal partnership agreements signed with at least 2 Islamic organisations, with active collaboration on at least one joint initiative.` },
        { title: 'Establish a waqf endowment to fund perpetual land stewardship operations and new acquisitions', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2737",
              translation: "Umar ibn al-Khattab acquired land at Khaybar and the Prophet (peace be upon him) advised: \"If you wish, you may hold the property as waqf and give its produce as charity — it shall not be sold, inherited, or given away.\" This is the basis for endowed land stewardship.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Waqf is the Islamic institution designed precisely for this purpose — permanently dedicating assets so that their benefits flow forever. A waqf endowment for the land project creates a self-sustaining funding source that does not depend on annual donations, government grants, or individual generosity. The endowment's returns fund operations, maintenance, and — crucially — the acquisition and restoration of additional land.

**How?**

1. Consult with an Islamic finance specialist and a charity lawyer to design a waqf endowment structure that is both shariah-compliant and legally enforceable in your jurisdiction.
2. Define the waqf's beneficiaries and purposes: funding operational costs of existing land projects, acquiring new land for stewardship, training new communities, and distributing surplus food.
3. Seed the endowment with an initial contribution — this can come from the land trust itself (dedicating a portion of any income), founding donors, or a community fundraising campaign.
4. Invest the endowment capital in shariah-compliant instruments (sukuk, halal equity funds, or income-generating property) so that the corpus is preserved and only returns are spent.
5. Establish governance for the waqf: a separate board of mutawallis (waqf managers) with clear investment and disbursement policies.
6. Launch a community awareness campaign about the waqf, inviting ongoing contributions — even small, regular donations compound over time.
7. Completion indicator: waqf endowment legally established, initial capital contributed, investment strategy implemented, and the first disbursement made to fund land stewardship operations.` },
        { title: 'Design an intergenerational stewardship succession plan ensuring the land outlives its founders', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 28:77",
              arabic: "وَأَحْسِن كَمَا أَحْسَنَ اللَّهُ إِلَيْكَ ۖ وَلَا تَبْغِ الْفَسَادَ فِي الْأَرْضِ",
              translation: "And do good as Allah has done good to you, and do not seek corruption in the earth.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 2:30",
              arabic: "إِنِّي جَاعِلٌ فِي الْأَرْضِ خَلِيفَةً",
              translation: "Indeed, I will make upon the earth a successive authority (khalifah).",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 5134",
              translation: "The Prophet (peace be upon him) said: \"If the Hour is about to be established and one of you has a palm shoot in his hand, and he is able to plant it before the Hour is established, let him plant it.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The ultimate test of any stewardship project is whether it survives its founders. Land is permanent; people are not. Without a succession plan, the project is one generation away from collapse — trustees retire, knowledge is lost, and the covenant fades. An intergenerational plan ensures that leadership, knowledge, and commitment transfer smoothly to the next generation, and the next after that. The Quran speaks of those who say "Our Lord, give us from our spouses and offspring comfort to our eyes, and make us leaders of the righteous" (25:74) — this plan is how you answer that du'a in practical terms.


**How?**

1. Establish a youth trustee pipeline: identify young adults (18-25) in the community with interest in land stewardship and invite them into a structured apprenticeship with current trustees.
2. Require that at least one trustee position is always held by someone under 30, ensuring generational representation is built into the governance structure.
3. Create a knowledge transfer programme: each senior trustee mentors a junior trustee in their area of expertise (soil management, water systems, governance, community relations) over a minimum 2-year period.
4. Document all institutional knowledge — not just the framework document, but the informal knowledge: supplier relationships, community dynamics, seasonal quirks of the land, and lessons learned from failures.
5. Build regular succession reviews into the annual governance cycle: every year, the board assesses its succession readiness and identifies gaps.
6. Include a "dead hand" clause in the waqf and trust documents: if all trustees are unable to serve, the covenant specifies how replacement trustees are appointed (e.g., by a named Islamic organisation) to prevent the land from falling into legal limbo.
7. Completion indicator: at least 2 youth apprentice trustees in active mentorship, succession review conducted annually, knowledge transfer programme documented, and dead-hand succession clause included in the legal trust documents.` },
      ],
    },
    {
      title: 'Build a replicable Islamic land stewardship model that other communities can adopt and adapt',
      priority: 'medium', tags: ['model', 'ummah', 'replication'],
      description: 'A single regenerative land project is an oasis. A replicable model is a civilisational shift. This task synthesises the entire Land experience into an open-source, community-tested framework that any Muslim community in any climate can follow — scaling the khilafah al-ard mandate from one parcel to a global movement.',
      subtasks: [
        { title: 'Conduct a post-implementation review identifying what worked, what failed, and what should be done differently', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 59:18",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللَّهَ وَلْتَنظُرْ نَفْسٌ مَّا قَدَّمَتْ لِغَدٍ",
              translation: "O you who believe, fear Allah, and let every soul look to what it has put forth for tomorrow.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 65:2-3",
              arabic: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا * وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ",
              translation: "And whoever fears Allah, He will make for him a way out and will provide for him from where he does not expect.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6018",
              translation: "The Prophet (peace be upon him) said: \"The strong believer is better and more beloved to Allah than the weak believer, while there is good in both.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Honest self-assessment is the foundation of a trustworthy model. If you only document successes, the communities that follow your framework will be blindsided by the failures you omitted. The Quran calls believers to self-accounting (muhasabah, 59:18), and a post-implementation review applies that spiritual practice to the project level. What you learned from failure is often more valuable than what you learned from success — and sharing both is an act of amanah toward those who will follow.


**How?**

1. Gather all trustees, key volunteers, and community partners for a structured review session (half-day minimum).
2. Walk through every phase of the project chronologically: soil assessment, water design, legal structure, planting, composting, food forest, biodiversity, community programme, and closed-loop transition.
3. For each phase, document three things: what worked well and should be replicated, what failed or underperformed and why, and what you would do differently with the benefit of hindsight.
4. Collect honest feedback from community participants, not just leaders — send a simple survey or hold small group discussions.
5. Identify the 5 most important lessons that would save another community significant time, money, or frustration.
6. Write up the review as a candid document, not a promotional piece — include specific numbers, timelines, and costs wherever possible.
7. Completion indicator: a written post-implementation review covering all project phases, incorporating feedback from diverse participants, and identifying the top 5 transferable lessons.` },
        { title: 'Publish an open-source Islamic Land Stewardship Toolkit available for free download', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 41:33",
              arabic: "وَمَنْ أَحْسَنُ قَوْلًا مِّمَّن دَعَا إِلَى اللَّهِ وَعَمِلَ صَالِحًا وَقَالَ إِنَّنِي مِنَ الْمُسْلِمِينَ",
              translation: "And who is better in speech than one who invites to Allah and does righteousness and says, Indeed, I am of the Muslims.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 16:125",
              arabic: "ادْعُ إِلَىٰ سَبِيلِ رَبِّكَ بِالْحِكْمَةِ وَالْمَوْعِظَةِ الْحَسَنَةِ",
              translation: "Invite to the way of your Lord with wisdom and good instruction.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2674",
              translation: "The Prophet (peace be upon him) said: \"Whoever establishes a good practice in Islam will have its reward and the reward of all who act upon it after him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Open-source publication ensures that the model reaches communities who cannot afford consultants, courses, or proprietary frameworks. Making the toolkit freely available is both a spiritual obligation and a strategic choice — the faster the model spreads, the more land comes under regenerative Islamic stewardship, and the greater the collective impact on the earth.

**How?**

1. Compile all project documents into a single, organised toolkit: the stewardship framework, covenant templates, governance documents, planting guides, species selection worksheets, monitoring log templates, water budget calculator, and the post-implementation review.
2. Edit the toolkit for clarity and accessibility — remove jargon, add definitions, and ensure someone with no prior experience can understand each section.
3. Translate the toolkit into at least 2 languages beyond English (prioritise Arabic and the most common language in your region's Muslim community).
4. Design the toolkit as a downloadable PDF with clear formatting, photographs, and diagrams.
5. Publish on a dedicated website with a Creative Commons licence allowing free use, adaptation, and redistribution with attribution.
6. Promote the toolkit through Islamic networks, permaculture communities, environmental organisations, and social media.
7. Completion indicator: toolkit published online in at least 2 languages, with a Creative Commons licence, and promoted through at least 5 distribution channels.` },
        { title: 'Mentor 3 new community land projects through their first year using the toolkit and framework', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 5:2",
              arabic: "وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ",
              translation: "And cooperate in righteousness and piety.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 21:107",
              arabic: "وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ",
              translation: "And We have not sent you, [O Muhammad], except as a mercy to the worlds.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6011",
              translation: "The Prophet (peace be upon him) said: \"You see the believers as regards their being merciful among themselves and showing love among themselves and being kind, resembling one body; so that if any part of the body is not well then the whole body shares the sleeplessness and fever with it.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A toolkit is only as good as its results in the field. Mentoring 3 new communities tests the framework in different contexts — different climates, soils, legal systems, and community dynamics — revealing what is truly universal and what needs local adaptation. This mentorship also builds the human network of experienced stewards who can mentor further communities, creating the exponential growth that a published document alone cannot achieve.


**How?**

1. Recruit 3 communities at different stages of readiness: one with land already secured, one in the process of acquiring land, and one still forming their group — this tests the framework across starting points.
2. Pair each community with a mentor from your project who has relevant experience and is committed to monthly check-ins for 12 months.
3. Provide each community with the full toolkit and walk them through the framework during an initial orientation session (in person or video).
4. Schedule monthly mentorship calls focusing on the phase each community is currently working through — troubleshoot problems in real time rather than waiting for quarterly reviews.
5. Document each community's experience: what they adapted from the framework, what additional challenges they faced, and what support they needed that the toolkit did not provide.
6. After 12 months, convene all 3 communities and the mentoring team for a joint review — compare experiences, extract common lessons, and update the toolkit based on their feedback.
7. Completion indicator: 3 community projects mentored through their first year, experiences documented, and the toolkit updated based on cross-community feedback.` },
        { title: 'Present the model at 3 national or international Islamic and environmental conferences', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 12:108",
              arabic: "قُلْ هَـٰذِهِ سَبِيلِي أَدْعُو إِلَى اللَّهِ ۚ عَلَىٰ بَصِيرَةٍ أَنَا وَمَنِ اتَّبَعَنِي",
              translation: "Say: This is my way; I invite to Allah with insight — I and those who follow me.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 3:110",
              arabic: "كُنتُمْ خَيْرَ أُمَّةٍ أُخْرِجَتْ لِلنَّاسِ تَأْمُرُونَ بِالْمَعْرُوفِ وَتَنْهَوْنَ عَنِ الْمُنكَرِ",
              translation: "You are the best nation produced for mankind. You enjoin what is right and forbid what is wrong.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 2685",
              translation: "The Prophet (peace be upon him) said: \"Convey from me, even if it is one ayah.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Conferences concentrate the people who influence community agendas — scholars, organisers, funders, and activists. Presenting the model at Islamic and environmental conferences plants the idea of Islamic land stewardship in the minds of decision-makers who can mobilise resources and communities at a scale no individual project can reach. The Quran says "invite to the way of your Lord with wisdom and good instruction" (16:125), and a well-prepared conference presentation is a form of dawah — calling people to a good that benefits all of creation.


**How?**

1. Identify relevant conferences: Islamic conventions (ISNA, RIS, MCB events), environmental summits (permaculture convergences, regenerative agriculture conferences), and interdisciplinary forums (faith and ecology gatherings).
2. Submit presentation proposals 6-12 months in advance — most conferences have open call-for-papers or workshop proposal processes.
3. Prepare a compelling 20-30 minute presentation covering: the Islamic theological foundation, the practical methodology, measurable results (soil data, food produced, community engaged), and how other communities can start.
4. Bring physical samples or visual materials: soil comparison jars (before and after), photographs, and a QR code linking to the toolkit download page.
5. Follow up with every interested attendee — collect contact details and send the toolkit within 48 hours.
6. Write a brief report after each conference documenting contacts made, feedback received, and follow-up actions.
7. Completion indicator: presentations delivered at 3 or more conferences, with follow-up reports documenting contacts and outcomes from each event.` },
        { title: 'Establish a global network of Islamic land stewardship projects sharing data, seeds, and knowledge', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 22:41",
              arabic: "الَّذِينَ إِن مَّكَّنَّاهُمْ فِي الْأَرْضِ أَقَامُوا الصَّلَاةَ وَآتَوُا الزَّكَاةَ وَأَمَرُوا بِالْمَعْرُوفِ وَنَهَوْا عَنِ الْمُنكَرِ ۗ وَلِلَّهِ عَاقِبَةُ الْأُمُورِ",
              translation: "those who, when We establish them in the land, keep up the prayer, pay the prescribed alms, command what is right, and forbid what is wrong: God controls the outcome of all events.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2320",
              translation: "The Prophet (peace be upon him) said: \"There is none amongst the Muslims who plants a tree or sows seeds, and then a bird, or a person or an animal eats from it, but is regarded as a charitable gift for him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Isolated projects plateau. A network multiplies. When 10 communities share soil data, the dataset reveals patterns no single project could see. When communities exchange seeds, genetic diversity increases and local adaptation accelerates. When stewards share knowledge, the entire network learns from every individual experiment. This global network is the institutional expression of the Quranic principle that the believers are brothers (49:10) — applied to the shared mission of restoring the earth.


**How?**

1. Create a simple digital platform for the network: a website with member profiles, a shared knowledge base, a discussion forum, and a seed exchange directory.
2. Invite all communities mentored through the framework, plus any projects that have adopted the toolkit independently, to join as founding members.
3. Establish an annual data-sharing protocol: each member project submits soil health data, harvest data, and a brief annual update using a standardised template.
4. Launch a seed exchange programme: members list seeds they have saved and seeds they need, and ship to each other — prioritising locally adapted, open-pollinated varieties.
5. Host an annual virtual gathering (and, when feasible, an in-person summit) where network members present their experiences, troubleshoot challenges, and plan collaborative initiatives.
6. Appoint a network coordinator (funded by the waqf endowment) to maintain the platform, facilitate exchanges, and compile the annual data synthesis.
7. Completion indicator: network platform launched with at least 5 member projects, first annual data submission completed, seed exchange programme active, and first virtual gathering held.` },
      ],
    },
    {
      title: 'Establish an intergenerational stewardship succession plan — ensure the land outlives its founders',
      priority: 'low', tags: ['succession', 'intergenerational', 'waqf'],
      description: 'The ultimate test of Islamic land stewardship is whether the land continues to thrive after the founding generation steps back. An intergenerational succession plan transfers knowledge, responsibility, and authority to the next generation of stewards, ensuring the land remains a productive trust (amanah) for decades and centuries beyond its establishment.',
      subtasks: [
        { title: 'Identify and begin mentoring the next generation of land stewards from the community youth', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 33:72",
              arabic: "إِنَّا عَرَضْنَا الْأَمَانَةَ عَلَى السَّمَاوَاتِ وَالْأَرْضِ وَالْجِبَالِ فَأَبَيْنَ أَن يَحْمِلْنَهَا وَأَشْفَقْنَ مِنْهَا وَحَمَلَهَا الْإِنسَانُ",
              translation: "Indeed, We offered the trust to the heavens and the earth and the mountains, and they declined to bear it and feared it; but man bore it.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 18:46",
              arabic: "وَالْبَاقِيَاتُ الصَّالِحَاتُ خَيْرٌ عِندَ رَبِّكَ ثَوَابًا وَخَيْرٌ أَمَلًا",
              translation: "And the enduring good deeds are better to your Lord for reward and better for hope.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 1631",
              translation: "The Prophet (peace be upon him) said: \"When a person dies, his deeds come to an end except for three: ongoing charity (sadaqah jariyah), beneficial knowledge, or a righteous child who prays for him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) said: "When a person dies, their deeds come to an end except for three: ongoing charity (sadaqah jariyah), beneficial knowledge, and a righteous child who prays for them" (Sahih Muslim 1631). Land stewardship that is passed to the next generation combines all three — the land itself is ongoing charity, the knowledge of how to tend it is beneficial knowledge, and the young stewards who continue the work are the righteous inheritors of a sacred trust. Without deliberate mentorship, the skills and spiritual orientation required for land stewardship are lost within a single generation.


**How?**

1. Identify youth (ages 14-25) in the community who show interest in land work, agriculture, or environmental stewardship — do not wait for them to volunteer; actively recruit and invite.
2. Create a structured apprenticeship programme: weekly hands-on sessions during the growing season covering soil management, planting, water systems, composting, and harvest.
3. Pair each apprentice with an experienced steward for one-on-one mentoring — the relationship is as important as the technical training.
4. Include Islamic land ethics in the programme: study circles on Quranic ayat about stewardship (2:30, 7:56, 55:10), hadith on planting, and the fiqh of waqf.
5. Give apprentices increasing responsibility: a plot to manage independently, a project to lead, a community work day to organise.
6. After 2 years of apprenticeship, invite the most committed youth to join the land governance shura as junior members with voice and vote.
7. Completion indicator: at least 3 youth apprentices actively engaged in the programme, with one having led a community work day independently.` },
        { title: 'Document all land management knowledge in a stewardship manual that can be passed forward', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 96:1-5",
              arabic: "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ * خَلَقَ الْإِنسَانَ مِنْ عَلَقٍ * اقْرَأْ وَرَبُّكَ الْأَكْرَمُ * الَّذِي عَلَّمَ بِالْقَلَمِ * عَلَّمَ الْإِنسَانَ مَا لَمْ يَعْلَمْ",
              translation: "Read in the name of your Lord who created — created man from a clinging substance. Read, and your Lord is the Most Generous — who taught by the pen, taught man that which he knew not.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 39:9",
              arabic: "هَلْ يَسْتَوِي الَّذِينَ يَعْلَمُونَ وَالَّذِينَ لَا يَعْلَمُونَ",
              translation: "Are those who know equal to those who do not know?",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 1631",
              translation: "The Prophet (peace be upon him) said: \"When a person dies, his deeds come to an end except for three: ongoing charity, beneficial knowledge, or a righteous child who prays for him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Oral knowledge dies with its holder. The founding generation of MTC stewards has accumulated years of context-specific wisdom — which beds produce best, when the frost line shifts, how the water table behaves in drought, which amendments work on which soil zones. If this knowledge exists only in their minds, a single retirement, illness, or death creates an irreplaceable loss. A written stewardship manual is the institutional memory of the land — the accumulated intelligence of every season, every experiment, every failure and success, preserved for those who come after.


**How?**

1. Begin with the land map and annotate it with everything that is not visible to the eye: underground water lines, soil zones, drainage patterns, buried infrastructure, and boundary markers.
2. Document the annual calendar: what is planted when, what is harvested when, when compost is turned, when trees are pruned, when the water system is winterised.
3. Record the soil amendment history for each zone: what was applied, when, and what effect it had on subsequent soil tests.
4. Include a troubleshooting section: common problems encountered (pest outbreaks, drainage failures, crop diseases) and the solutions that worked.
5. Add supplier contacts, equipment maintenance schedules, and the locations of all tools, parts, and stored materials.
6. Write in plain language accessible to someone with no prior farming experience — the manual should enable a complete beginner to manage the land competently.
7. Completion indicator: stewardship manual completed, reviewed by at least 2 experienced stewards for accuracy, and stored in both physical and digital formats with the land records.` },
        { title: 'Establish term limits and rotation for land governance roles to prevent institutional stagnation', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 42:38",
              arabic: "وَأَمْرُهُمْ شُورَىٰ بَيْنَهُمْ",
              translation: "And whose affair is [determined by] consultation among themselves. Rotation of governance roles prevents concentration of power and keeps shura alive.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 4:58",
              arabic: "إِنَّ اللَّهَ يَأْمُرُكُمْ أَن تُؤَدُّوا الْأَمَانَاتِ إِلَىٰ أَهْلِهَا",
              translation: "Indeed, Allah commands you to render trusts to those to whom they are due.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophetic model of leadership is one of accountability and service, not permanent authority. Umar ibn al-Khattab (may Allah be pleased with him) famously said: "If a mule stumbles in Iraq, I fear that Allah will ask me why I did not pave the road for it." This level of accountability requires that leaders know their tenure is limited and their performance will be evaluated. Permanent, unaccountable governance — even by well-intentioned founders — leads to institutional stagnation, dependency on individuals, and the gradual erosion of the shura principle that should govern the land.


**How?**

1. Amend the land governance charter to include term limits for all leadership positions: recommend 2-3 year terms with a maximum of 2 consecutive terms.
2. Stagger term expirations so that no more than half the governance body turns over in any single year — continuity is maintained while rotation occurs.
3. Define the election or selection process: how are new leaders nominated, evaluated, and confirmed by the community shura?
4. Create transition documentation requirements: outgoing leaders must produce a handover document covering current projects, pending decisions, financial status, and recommendations.
5. Establish an advisory council of former leaders who remain available for consultation but do not hold decision-making authority — their wisdom is preserved without concentrating power.
6. Conduct a governance health assessment every 2 years: is the shura functioning effectively? Are decisions being made transparently? Do new members feel empowered to contribute?
7. Completion indicator: governance charter amended with term limits, first leadership rotation completed successfully, and governance health assessment conducted.` },
        { title: 'Create a land endowment fund that generates income for perpetual stewardship operations', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:261",
              arabic: "مَّثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنبَتَتْ سَبْعَ سَنَابِلَ فِي كُلِّ سُنبُلَةٍ مِّائَةُ حَبَّةٍ",
              translation: "The example of those who spend their wealth in the way of Allah is like a seed that grows seven spikes; in each spike is a hundred grains.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 3:180",
              arabic: "وَلَا يَحْسَبَنَّ الَّذِينَ يَبْخَلُونَ بِمَا آتَاهُمُ اللَّهُ مِن فَضْلِهِ هُوَ خَيْرًا لَّهُم",
              translation: "And let not those who withhold what Allah has given them of His bounty think it is good for them.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1410",
              translation: "The Prophet (peace be upon him) said: \"There is no day on which the servants wake up except that two angels come down. One of them says, O Allah, give the one who spends a replacement. The other says, O Allah, give the one who withholds destruction.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Volunteer energy is finite. The founding generation works with the passion of builders, but the second and third generations inherit the maintenance — and maintenance without funding is a recipe for decline. A land endowment fund (structured as a waqf or charitable trust) generates annual income from invested capital, ensuring that the land always has resources for soil amendments, infrastructure repair, water system maintenance, and steward compensation. This is the financial expression of sadaqah jariyah — a gift that funds the land's upkeep in perpetuity, long after the original donors have passed.


**How?**

1. Determine the annual operating cost of the land stewardship programme: soil amendments, water, tools, insurance, and a basic stipend for the lead steward.
2. Calculate the endowment principal needed to generate that annual amount at a conservative halal return rate (3-5% from Islamic investment vehicles).
3. Launch an endowment fundraising campaign targeting community members, CSRA shareholders, and supporters who understand the waqf concept.
4. Invest the endowment in Shariah-compliant vehicles: Islamic mutual funds, sukuk, or halal real estate — consult an Islamic finance advisor.
5. Establish a spending policy: only the annual return is spent; the principal is never touched. In years of low return, reduce spending rather than invading the principal.
6. Report endowment performance annually to all donors and the community — transparency builds trust and encourages further contributions.
7. Completion indicator: endowment fund established with initial contributions, invested in Shariah-compliant vehicles, and first annual distribution made to stewardship operations.` },
        { title: 'Conduct a 10-year land health review comparing current conditions to the original baseline', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 30:41",
              arabic: "ظَهَرَ الْفَسَادُ فِي الْبَرِّ وَالْبَحْرِ بِمَا كَسَبَتْ أَيْدِي النَّاسِ",
              translation: "Corruption has appeared throughout the land and sea because of what the hands of people have earned.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 7:56",
              arabic: "وَلَا تُفْسِدُوا فِي الْأَرْضِ بَعْدَ إِصْلَاحِهَا",
              translation: "And do not cause corruption on the earth after its reformation.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 5134",
              translation: "The Prophet (peace be upon him) said: \"If the Hour is about to be established and one of you has a palm shoot in his hand, and he is able to plant it before the Hour is established, let him plant it.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The land itself is the ultimate witness to the quality of stewardship it has received. A 10-year review comparing current soil health, biodiversity, water quality, and productivity to the original baseline assessment provides an objective, measurable verdict on whether the founding generation fulfilled its khalifah mandate. The Quran reminds us that the earth will testify on the Day of Judgment about what occurred upon it (99:4-5) — a 10-year land health review is a voluntary, this-worldly accounting that prepares stewards for that final reckoning.


**How?**

1. Retrieve the original baseline soil, water, and biodiversity assessments conducted during the land's first year.
2. Commission the same laboratory tests on soil samples from the same locations: pH, organic matter, microbial activity, nutrient levels, and contaminant screening.
3. Conduct a biodiversity survey using the same methodology as the original baseline: bird counts, plant species inventories, insect monitoring, and amphibian surveys.
4. Measure water quality in all on-site water features and compare to original readings.
5. Calculate total food production over the decade and compare to projections made in the original planting plan.
6. Present the findings to the community in a formal 10-Year Stewardship Report — celebrate improvements, honestly address declines, and set targets for the next decade.
7. Completion indicator: 10-year land health review completed with side-by-side comparison to baseline, published to the community, and next-decade targets established.` },
      ],
    },
  ],

  // ── MOONTRANCE SEASONAL ──

  // ── CORE — Establish seasonal calendar and foundational programming ──
  moontrance_seasonal_core: [
    {
      title: 'Establish a four-season calendar aligned with agricultural and Islamic cycles',
      priority: 'urgent', tags: ['calendar', 'seasons', 'planning'],
      description: 'Map the four MTC seasons — Ghars (Spring/Planting), Ri\'ayah (Summer/Tending), Hisab (Autumn/Harvest), and Sukun (Winter/Stillness) — onto the local growing calendar and anchor each with its Islamic spiritual themes. This calendar becomes the master schedule for every programme, event, and resource allocation across the year.',
      subtasks: [
        { title: 'Research local frost dates, growing zones, and rainfall patterns to define season boundaries', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 10:5",
              arabic: "هُوَ الَّذِي جَعَلَ الشَّمْسَ ضِيَاءً وَالْقَمَرَ نُورًا وَقَدَّرَهُ مَنَازِلَ لِتَعْلَمُوا عَدَدَ السِّنِينَ وَالْحِسَابَ",
              translation: "It is He who made the sun a shining light and the moon a derived light and determined for it phases — that you may know the number of years and account.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 6:96",
              arabic: "فَالِقُ الْإِصْبَاحِ وَجَعَلَ اللَّيْلَ سَكَنًا وَالشَّمْسَ وَالْقَمَرَ حُسْبَانًا",
              translation: "He causes the dawn to break, and He has made the night for rest and the sun and moon for calculation.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1913",
              translation: "The Prophet (peace be upon him) said: \"Do not fast until you see the crescent moon, and do not break the fast until you see it.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The four MTC seasons must align with real agricultural conditions, not arbitrary calendar quarters. Planting before the last frost kills seedlings; harvesting too late loses crops to weather. Allah says "It is He who sends down rain from the sky; from it is drink and from it is foliage in which you pasture" (16:10) — timing our work to His provision means studying the patterns He set in the land. Getting the dates right is the foundation everything else builds on.


**How?**

1. Identify your USDA hardiness zone (or local equivalent) and record the average last spring frost and first autumn frost dates.
2. Map average monthly rainfall, temperature highs and lows, and daylight hours across the year.
3. Define Ghars (Spring) as the window from last frost through peak planting — typically 8-12 weeks.
4. Define Ri'ayah (Summer) as the main growing and tending period between planting completion and early harvest.
5. Define Hisab (Autumn) as main harvest through first frost, including preservation and seed-saving windows.
6. Define Sukun (Winter) as the dormant period from first frost through pre-spring preparation.
7. Completion indicator: a documented four-season calendar with specific date ranges calibrated to your local conditions.` },
        { title: 'Assign Islamic spiritual themes and key Quranic ayat to each season', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:190",
              arabic: "إِنَّ فِي خَلْقِ السَّمَاوَاتِ وَالْأَرْضِ وَاخْتِلَافِ اللَّيْلِ وَالنَّهَارِ لَآيَاتٍ لِّأُولِي الْأَلْبَابِ",
              translation: "There truly are signs in the creation of the heavens and earth, and in the alternation of night and day, for those with understanding.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 45:5",
              arabic: "وَاخْتِلَافِ اللَّيْلِ وَالنَّهَارِ وَمَا أَنزَلَ اللَّهُ مِنَ السَّمَاءِ مِن رِّزْقٍ فَأَحْيَا بِهِ الْأَرْضَ بَعْدَ مَوْتِهَا وَتَصْرِيفِ الرِّيَاحِ آيَاتٌ لِّقَوْمٍ يَعْقِلُونَ",
              translation: "in the alternation of night and day, in the rain God provides, sending it down from the sky and reviving the dead earth with it, and in His shifting of the winds there are signs for those who use their reason.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2050",
              translation: "Narrated Ibn `Abbas:`Ukaz, Majanna and Dhul-Majaz were marketplaces in the Pre-Islamic period of ignorance. When Islam came, Muslims felt that marketing there might be a sin. So, the Divine Inspiration came: \"There is no harm for you to seek the bounty of your Lord (in the seasons of Hajj).\" (2.198) Ibn `Abbas recited the Verse in this way",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2098",
              translation: "Narrated Ibn `Abbas:`Ukaz, Majanna and Dhul-Majaz were markets in the Pre-Islamic period. When the people embraced Islam they considered it a sin to trade there. So, the following Holy Verse came:-- 'There is no harm for you if you seek of the bounty of your Lord (Allah) in the Hajj season.\" (2.198) Ibn `Abbas recited it like this",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2320",
              arabic: "مَا مِنْ مُسْلِمٍ يَغْرِسُ غَرْسًا، أَوْ يَزْرَعُ زَرْعًا، فَيَأْكُلُ مِنْهُ طَيْرٌ أَوْ إِنْسَانٌ أَوْ بَهِيمَةٌ، إِلاَّ كَانَ لَهُ بِهِ صَدَقَةٌ",
              translation: "There is none amongst the Muslims who plants a tree or sows seeds, and then a bird, or a person or an animal eats from it, but is regarded as a charitable gift (sadaqah) for him.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Hadith cited inline in this subtask's description; backfilled into structured sources via NotebookLM Muslim Scholar canonical-text retrieval.",
            },
          ],
          description: `**Why?**

Without spiritual anchoring, a seasonal farm programme is merely agriculture. MTC exists to make every act of planting, tending, harvesting, and resting an act of worship. Assigning Quranic ayat and themes to each season transforms routine labour into tafakkur (reflection) — participants see dead earth revived in spring (36:33) and understand it as a sign of resurrection, see the good tree rooted deep (14:24-25) and understand it as iman. The spiritual layer is what distinguishes this from any community garden.


**How?**

1. For Ghars (Spring): centre the theme on trust in Allah's provision and sadaqah jariyah — primary ayat 6:99 ("It is He who sends down water from the sky, and We produce thereby the growth of all things") and hadith Bukhari 2320 on planting as ongoing charity.
2. For Ri'ayah (Summer): centre the theme on stewardship, patience, and hospitality — primary ayat 14:24-25 (the good tree parable) emphasising deep roots and consistent fruit.
3. For Hisab (Autumn): centre the theme on gratitude, accountability, and shura — primary ayat 36:33-35 ("And a sign for them is the dead earth. We have brought it to life and brought forth from it grain").
4. For Sukun (Winter): centre the theme on rest, reflection, and trust during apparent stillness — primary ayat 30:21 (sukun/tranquillity) and the sunnah of reflection during quiet times.
5. Create a one-page reference card for each season listing its name, meaning, date range, primary ayat, secondary hadith, and spiritual focus.
6. Review the reference cards with a knowledgeable community member or imam to ensure accuracy of tafsir references.
7. Completion indicator: four season reference cards with verified Quranic themes, printed and ready for display.` },
        { title: 'Define the daily salah-in-jama\'ah structure that anchors every season', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:103",
              arabic: "إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا",
              translation: "Indeed, prayer has been decreed upon the believers at specified times.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 62:9",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا نُودِيَ لِلصَّلَاةِ مِن يَوْمِ الْجُمُعَةِ فَاسْعَوْا إِلَىٰ ذِكْرِ اللَّهِ",
              translation: "O you who believe, when the call to prayer is made on Friday, then proceed to the remembrance of Allah.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 645",
              translation: "The Prophet (peace be upon him) said: \"The prayer in congregation is twenty-seven times superior to the prayer offered by a person alone.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Salah in congregation is the heartbeat of every MTC season — it is what makes this a Muslim community programme rather than simply a farm. By anchoring every working day around jama'ah times, participants internalise that the land work serves the prayer, not the other way around. This structure also creates natural gathering points for instruction, reflection, and community bonding.

**How?**

1. Determine which daily salawat will be prayed on-site based on typical working hours — at minimum Dhuhr and Asr for daytime seasons, adding Fajr for early-morning planting or Maghrib for summer evenings.
2. Designate a clean, sheltered prayer area on the land with qiblah clearly marked, wudu facilities (even if a simple water container and basin), and enough space for the expected group.
3. Build the daily schedule around salah times: work blocks end 10 minutes before adhan, and the next block begins 15 minutes after salah to allow for sunnah and dhikr.
4. Assign a rotating mu'adhin from among participants so everyone shares the honour and responsibility.
5. Prepare a short seasonal dhikr or reflection (2-3 minutes) to follow each congregational prayer, drawn from that season's Quranic theme.
6. Document the salah schedule template so it can be adjusted for each season's daylight hours and prayer times.
7. Completion indicator: a salah-centred daily schedule template with designated prayer area, wudu facilities, and rotating mu'adhin roster.` },
        { title: 'Map seasonal transition rituals and community milestones', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 10:5",
              arabic: "هُوَ الَّذِي جَعَلَ الشَّمْسَ ضِيَاءً وَالْقَمَرَ نُورًا وَقَدَّرَهُ مَنَازِلَ لِتَعْلَمُوا عَدَدَ السِّنِينَ وَالْحِسَابَ",
              translation: "It is He who made the sun a shining light and the moon a derived light and determined for it phases — that you may know the number of years and account [of time].",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 2:189",
              arabic: "يَسْأَلُونَكَ عَنِ الْأَهِلَّةِ قُلْ هِيَ مَوَاقِيتُ لِلنَّاسِ وَالْحَجِّ",
              translation: "They ask you about the new moons. Say: They are measurements of time for the people and for Hajj.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Transitions between seasons are moments of communal meaning — they mark the passage from planting to tending, from harvest to rest. Without intentional marking, these transitions happen invisibly and the community misses opportunities for collective gratitude, reflection, and recommitment. Islam is rich with transitional practices (du'a for new seasons, gratitude for provision, istikharah before new ventures) that can be woven into these moments, deepening the spiritual experience of the agricultural cycle.


**How?**

1. Define a transition event for each seasonal boundary: Ghars Opening (spring kickoff), Ri'ayah Shift (planting complete, tending begins), Hisab Gathering (harvest launch), and Sukun Retreat (winter rest begins).
2. For each transition, design a 2-3 hour gathering that includes: congregational salah, a short talk on the incoming season's Quranic theme, a communal meal, and a practical briefing on the season's tasks.
3. Include a shura (consultation) element at each transition where participants share feedback on the closing season and input on the opening one.
4. Prepare a du'a specific to each transition — e.g., du'a for planting, du'a for harvest, du'a for rest and reflection.
5. Assign a logistics coordinator for each transition event to handle food, space, materials, and communication.
6. Create a checklist for each transition that covers spiritual, logistical, and agricultural preparation items.
7. Completion indicator: four documented transition event plans with assigned coordinators, du'as, and checklists.` },
        { title: 'Create a master resource inventory for all four seasons', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:197",
              arabic: "وَتَزَوَّدُوا فَإِنَّ خَيْرَ الزَّادِ التَّقْوَىٰ",
              translation: "And take provisions, but indeed, the best provision is taqwa (consciousness of Allah).",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 17:29",
              arabic: "وَلَا تَجْعَلْ يَدَكَ مَغْلُولَةً إِلَىٰ عُنُقِكَ وَلَا تَبْسُطْهَا كُلَّ الْبَسْطِ فَتَقْعُدَ مَلُومًا مَّحْسُورًا",
              translation: "And do not make your hand chained to your neck nor extend it completely, lest you become blamed and insolvent.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Each season demands different tools, supplies, and human capacity. Without a master inventory, resources are purchased reactively, budgets overrun, and critical items are missing when needed. The principle of itqan (excellence in execution) requires knowing what you have and what you need before the season demands it. A comprehensive inventory also reveals opportunities for sharing resources with neighbouring projects, embodying the cooperative spirit of the ummah.


**How?**

1. List every category of resource needed across all four seasons: seeds, soil amendments, tools, irrigation supplies, preservation equipment, storage containers, teaching materials, food for gatherings, and cleaning supplies.
2. For each category, note which season it is primarily used in and whether it carries over between seasons.
3. Conduct a physical inventory of what you currently have, noting condition and quantity.
4. Identify gaps — items needed but not yet acquired — and estimate costs for each.
5. Create a seasonal procurement timeline showing when each item must be purchased or prepared, working backwards from need-by dates.
6. Identify items that can be borrowed, shared, or donated rather than purchased, and note potential sources.
7. Completion indicator: a complete four-season resource inventory with gap analysis, cost estimates, and procurement timeline.` },
      ],
    },
    {
      title: 'Launch the Ghars (Spring/Planting) programme — seed selection, soil prep, and planting as sadaqah jariyah',
      priority: 'urgent', tags: ['ghars', 'spring', 'planting', 'sadaqah-jariyah'],
      description: 'Design and execute the spring planting programme grounded in the hadith that planting a tree from which others eat is sadaqah jariyah (Bukhari 2320). This covers seed selection for local conditions, soil preparation, water system installation, and communal planting days that transform agricultural work into ongoing charity.',
      subtasks: [
        { title: 'Select seed varieties suited to local climate, soil, and community food needs', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Musnad Ahmad 12902",
              translation: "The Prophet (peace be upon him) said: \"Even if the Hour is about to be established and one of you has a sapling in his hand, let him plant it.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Selecting and planting seeds is among the noblest acts of hope.",
            },
          ],
          description: `**Why?**

Seed selection determines the entire season's outcome. Choosing varieties unsuited to your soil or climate leads to poor yields, wasted effort, and community discouragement. Allah describes in Surah al-An'am (6:99) how He produces "gardens of grapes and olives and pomegranates, similar yet varied" — the diversity and specificity of creation is a model for thoughtful selection. Matching seeds to local conditions honours the land's nature rather than fighting it, and prioritising community food needs ensures the harvest serves real people.


**How?**

1. Consult your local agricultural extension service or experienced farmers for recommended varieties in your growing zone.
2. Prioritise open-pollinated (non-hybrid) varieties that allow seed-saving for future seasons, supporting long-term sustainability.
3. Survey the community to identify preferred vegetables, herbs, and fruits — cultural food preferences matter for actual consumption and reducing waste.
4. Select a mix of quick-harvest crops (radishes, lettuce, herbs — ready in 30-60 days) and staple crops (tomatoes, squash, beans — full season) so the community sees early results while building toward the main harvest.
5. Source seeds from reputable suppliers, favouring local seed libraries or Islamic farming networks where available.
6. Calculate seed quantities based on planned bed sizes, spacing requirements, and expected germination rates (always order 20% extra).
7. Completion indicator: a finalised seed order or collection with varieties matched to local conditions and community preferences.` },
        { title: 'Prepare soil through composting, testing, and amendment', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 36:33-35",
              arabic: "وَآيَةٌ لَّهُمُ الْأَرْضُ الْمَيْتَةُ أَحْيَيْنَاهَا وَأَخْرَجْنَا مِنْهَا حَبًّا فَمِنْهُ يَأْكُلُونَ وَجَعَلْنَا فِيهَا جَنَّاتٍ مِّن نَّخِيلٍ وَأَعْنَابٍ وَفَجَّرْنَا فِيهَا مِنَ الْعُيُونِ",
              translation: "And a sign for them is the dead earth. We have brought it to life and brought forth from it grain, and from it they eat. And We placed therein gardens of palm trees and grapevines and caused to burst forth therefrom springs.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Healthy soil is the foundation of every crop — no amount of care during the growing season compensates for depleted or unbalanced soil. The Quran draws attention to the earth itself as a sign: "And the earth — We spread it out and cast therein firmly set mountains and made grow therein of every beautiful kind" (50:7). Preparing the soil is an act of partnership with Allah's creation, ensuring the earth can fulfil its purpose of producing food. Skipping soil preparation leads to poor germination, weak plants, and disappointing harvests that undermine community confidence.


**How?**

1. Collect soil samples from multiple locations across the growing area and send them to a soil testing lab for pH, nutrient levels, and organic matter content.
2. While awaiting results, begin building compost from available materials: kitchen scraps, yard waste, manure (aged), and cardboard — layer greens and browns in a 1:3 ratio.
3. When test results arrive, identify deficiencies and select appropriate amendments: lime for acidic soil, sulphur for alkaline, compost for organic matter, bone meal for phosphorus, etc.
4. Apply amendments according to test recommendations, working them into the top 15-20 cm of soil with a broadfork or tiller.
5. Build raised beds if drainage is poor or soil contamination is a concern — fill with a mix of topsoil, compost, and vermiculite.
6. Mulch prepared beds with straw or wood chips to prevent erosion and moisture loss before planting day.
7. Completion indicator: soil tested, amended, and beds prepared with documented amendment records for future reference.` },
        { title: 'Install or verify water systems — irrigation, rainwater collection, and wudu supply', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 56:68-70",
              arabic: "أَفَرَأَيْتُمُ الْمَاءَ الَّذِي تَشْرَبُونَ * أَأَنتُمْ أَنزَلْتُمُوهُ مِنَ الْمُزْنِ أَمْ نَحْنُ الْمُنزِلُونَ * لَوْ نَشَاءُ جَعَلْنَاهُ أُجَاجًا فَلَوْلَا تَشْكُرُونَ",
              translation: "Have you considered the water that you drink? Is it you who brought it down from the clouds, or is it We who bring it down? If We willed, We could make it bitter, so why are you not grateful?",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 21:30",
              arabic: "وَجَعَلْنَا مِنَ الْمَاءِ كُلَّ شَيْءٍ حَيٍّ",
              translation: "And We made from water every living thing.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Ibn Majah 425",
              translation: "The Prophet (peace be upon him) said: \"Do not waste water even if you are performing ablution on the bank of a flowing river.\"",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Water is the most critical resource in agriculture and in worship. The water system must serve both the crops (irrigation) and the people (wudu, drinking). Installing it before planting means crops are watered from day one and the prayer area has functioning wudu facilities, maintaining the salah-centred daily rhythm.

**How?**

1. Assess water sources: municipal supply, well, rainwater potential, and any existing irrigation infrastructure.
2. Design an irrigation layout appropriate to the crop plan — drip irrigation for vegetable beds (conserves water, reduces disease), soaker hoses for borders, and overhead sprinklers only for large open areas.
3. Install a rainwater collection system if feasible: gutters from any on-site structures feeding into food-safe storage tanks, with a first-flush diverter to keep the water clean.
4. Ensure a dedicated wudu water supply near the prayer area — a gravity-fed tank with a tap, or a connected hose with a timer to prevent waste.
5. Test all irrigation zones for even coverage and fix any leaks, blocked emitters, or dry spots before planting.
6. Label all valves and zones clearly so any volunteer can operate the system.
7. Completion indicator: fully operational irrigation system, rainwater collection (if applicable), and wudu water supply, all tested and labelled.` },
        { title: 'Organise communal planting days with sadaqah jariyah intention', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 36:33-35",
              arabic: "وَآيَةٌ لَّهُمُ الْأَرْضُ الْمَيْتَةُ أَحْيَيْنَاهَا وَأَخْرَجْنَا مِنْهَا حَبًّا فَمِنْهُ يَأْكُلُونَ * وَجَعَلْنَا فِيهَا جَنَّاتٍ مِّن نَّخِيلٍ وَأَعْنَابٍ وَفَجَّرْنَا فِيهَا مِنَ الْعُيُونِ * لِيَأْكُلُوا مِن ثَمَرِهِ وَمَا عَمِلَتْهُ أَيْدِيهِمْ ۖ أَفَلَا يَشْكُرُونَ",
              translation: "And a sign for them is the dead earth. We have brought it to life and brought forth from it grain, and from it they eat. And We placed therein gardens of palm trees and grapevines and caused to burst forth therefrom springs — that they may eat of His fruit. And their hands have not produced it, so will they not be grateful?",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 1553a",
              translation: "The Prophet (peace be upon him) said: \"There is no Muslim who plants a tree or sows seeds, and then a bird, or a person, or an animal eats from it, except that it is regarded as a charitable gift for him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2320",
              arabic: "مَا مِنْ مُسْلِمٍ يَغْرِسُ غَرْسًا، أَوْ يَزْرَعُ زَرْعًا، فَيَأْكُلُ مِنْهُ طَيْرٌ أَوْ إِنْسَانٌ أَوْ بَهِيمَةٌ، إِلاَّ كَانَ لَهُ بِهِ صَدَقَةٌ",
              translation: "There is none amongst the Muslims who plants a tree or sows seeds, and then a bird, or a person or an animal eats from it, but is regarded as a charitable gift (sadaqah) for him.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Hadith cited inline in this subtask's description; backfilled into structured sources via NotebookLM Muslim Scholar canonical-text retrieval.",
            },
          ],
          description: `**Why?**

The hadith is explicit: "If a Muslim plants a tree or sows seeds, and then a bird, or a person, or an animal eats from it, it is regarded as a charitable gift (sadaqah) for him" (Bukhari 2320). Communal planting days transform agricultural labour into collective worship — every seed placed in the ground with the right intention becomes ongoing charity. These days also build community bonds, teach practical skills, and create shared ownership of the harvest. Without intentional gathering, planting becomes isolated tasks done by a few, missing the communal dimension that defines MTC.


**How?**

1. Schedule 2-3 planting days across the Ghars season, timed to match crop planting windows (cool-season crops first, warm-season after last frost).
2. Begin each planting day with congregational salah and a brief reminder of the sadaqah jariyah hadith, framing every seed as ongoing charity.
3. Prepare planting stations with clear instructions: seed type, spacing, depth, and watering needs — so participants of all skill levels can contribute.
4. Pair experienced gardeners with newcomers at each station, creating mentorship moments within the work.
5. Provide a communal meal (farm-to-table if possible from existing harvests or preserved food from previous seasons).
6. End each day with a closing du'a for the seeds planted and the community that will benefit from them.
7. Completion indicator: all planned beds planted across the scheduled planting days, with attendance records and participant feedback collected.` },
        { title: 'Document the Ghars season plan with crop maps and planting records', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:282",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا تَدَايَنتُم بِدَيْنٍ إِلَىٰ أَجَلٍ مُّسَمًّى فَاكْتُبُوهُ",
              translation: "O you who believe, when you contract a debt for a specified term, write it down.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 55:10-12",
              arabic: "وَالْأَرْضَ وَضَعَهَا لِلْأَنَامِ * فِيهَا فَاكِهَةٌ وَالنَّخْلُ ذَاتُ الْأَكْمَامِ * وَالْحَبُّ ذُو الْعَصْفِ وَالرَّيْحَانُ",
              translation: "And the earth He laid down for all living creatures. Therein are fruits, and date-palms with sheathed clusters, and grain with husks, and fragrant herbs.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Documentation transforms a single season's effort into repeatable knowledge. Without crop maps showing what was planted where, and records showing varieties, dates, and quantities, next year's team starts from scratch. The Islamic emphasis on ilm (knowledge) includes practical agricultural knowledge — the companions preserved farming wisdom just as they preserved hadith. Good records also enable honest hisab (accounting) during the autumn assessment, showing what succeeded and what needs adjustment.


**How?**

1. Draw a scaled map of the growing area showing every bed, row, and planting zone with compass orientation.
2. Label each zone with the crop variety planted, planting date, seed source, and expected harvest window.
3. Record soil amendments applied to each zone and irrigation zone assignments.
4. Note any companion planting arrangements (e.g., basil with tomatoes, beans with corn) and the reasoning behind them.
5. Create a simple tracking sheet for each crop: planting date, germination date, first true leaves, transplant date (if applicable), and any pest or disease observations.
6. Store all documents in a shared location accessible to all team leads — digital folder and a physical binder on-site.
7. Completion indicator: complete crop map, planting log, and tracking sheets created and shared with the team.` },
      ],
    },
    {
      title: 'Build the Ri\'ayah (Summer/Tending) schedule — daily care, hospitality, and tarbiyah programming',
      priority: 'urgent', tags: ['riyayah', 'summer', 'tending', 'tarbiyah'],
      description: 'Establish the summer tending schedule that balances daily crop care with community engagement, hospitality, and educational programming. Ri\'ayah means care and stewardship — this season teaches participants that consistent, patient tending is both an agricultural necessity and a spiritual practice of trust in Allah\'s timing.',
      subtasks: [
        { title: 'Create a daily care rotation covering watering, weeding, pest monitoring, and harvest checks', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 50:9",
              arabic: "وَنَزَّلْنَا مِنَ السَّمَاءِ مَاءً مُّبَارَكًا فَأَنبَتْنَا بِهِ جَنَّاتٍ وَحَبَّ الْحَصِيدِ",
              translation: "and how We send blessed water down from the sky and grow with it gardens, the harvest grain.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6464",
              translation: "The Prophet (peace be upon him) said: \"The most beloved of deeds to Allah are those that are most consistent (regular), even if they are small.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Crops in summer need daily attention — a single missed watering in peak heat can set plants back weeks, and unchecked pests can destroy a bed overnight. A structured rotation ensures every task is covered every day without burning out any individual. The rotation makes consistency systematic rather than dependent on individual heroics.

**How?**

1. List every daily care task: early morning watering (before heat), weeding of designated beds, pest and disease scouting, harvest checks for ripe produce, compost turning, and tool maintenance.
2. Divide the growing area into zones and assign each zone a care checklist.
3. Create a weekly rotation calendar with 2-3 volunteers per shift, ensuring no one is scheduled more than 3 days per week to prevent burnout.
4. Design a simple check-in/check-out system: volunteers mark completed tasks on a board or shared digital sheet.
5. Include a "concern log" where volunteers note anything unusual — yellowing leaves, new pests, irrigation issues — for the team lead to review.
6. Schedule a weekly walk-through with the full team to assess overall garden health and adjust the rotation as needed.
7. Completion indicator: a published weekly rotation calendar with daily checklists, concern log, and at least one full week successfully executed.` },
        { title: 'Schedule early harvest distribution for quick-maturing crops', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 6:141",
              arabic: "وَآتُوا حَقَّهُ يَوْمَ حَصَادِهِ",
              translation: "And give its [due] right on the day of its harvest. Early distribution of quick-maturing crops fulfils the harvest right to the community.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Quick-maturing crops like radishes, lettuce, and herbs are ready 30-60 days after planting — well before the main autumn harvest. Distributing these early harvests to participants and neighbours builds momentum, demonstrates tangible results, and fulfils the sadaqah jariyah intention established at planting. Early distribution also teaches proper harvesting technique so the community is prepared for the larger Hisab season. Letting early crops over-mature or go to waste contradicts the anti-israf principle at the core of this programme.


**How?**

1. Track maturity dates for all quick-harvest crops planted during Ghars and create a harvest readiness calendar.
2. Train volunteers on proper harvesting techniques for each crop: when to pick, how to cut without damaging the plant, and how to handle produce to maintain freshness.
3. Establish a distribution priority: first to active participants, then to neighbours and local families in need, then to community events and gatherings.
4. Set up a simple harvest station with washing facilities, bags or containers, and a log to record what was harvested and distributed.
5. Announce early harvests through community channels so people can collect their share or request delivery.
6. Save a portion of each harvest for communal meals and the hospitality programme.
7. Completion indicator: at least two early harvests completed with produce distributed, logged, and feedback collected.` },
        { title: 'Integrate tarbiyah (educational) programming into the weekly schedule', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 96:1-5",
              arabic: "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ خَلَقَ الْإِنسَانَ مِنْ عَلَقٍ اقْرَأْ وَرَبُّكَ الْأَكْرَمُ الَّذِي عَلَّمَ بِالْقَلَمِ عَلَّمَ الْإِنسَانَ مَا لَمْ يَعْلَمْ",
              translation: "Read in the name of your Lord who created — created man from a clinging substance. Read, and your Lord is the Most Generous — who taught by the pen — taught man that which he knew not.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (peace be upon him) said: \"Whoever follows a path in pursuit of knowledge, Allah will make easy for him a path to Paradise.\" Tarbiyah programming is a path of beneficial knowledge.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Ri'ayah is not just about crop care — it is about cultivating people alongside plants. Tarbiyah programming weaves Islamic learning into the agricultural work so participants grow in knowledge and faith as the crops grow in the soil. The Quran's parable of the good tree (14:24-25) — "its root firm and its branches in the sky, it produces its fruit all the time by permission of its Lord" — applies to people whose learning is rooted in faith and produces consistent benefit. Without intentional education, the programme remains a garden club rather than a transformative community experience.


**How?**

1. Schedule a weekly halaqah (study circle) on-site, timed after Dhuhr or Asr salah when participants are already gathered.
2. Theme each halaqah around the Ri'ayah season's Quranic focus: stewardship, patience, the good tree parable, and the sunnah of agricultural care.
3. Invite knowledgeable community members — imams, teachers, experienced farmers — to lead sessions on rotating topics.
4. Include practical agricultural education alongside spiritual content: a 15-minute lesson on composting, pest identification, or water conservation tied to an Islamic principle.
5. Design age-appropriate programming for children present: nature walks with Quranic reflection, seed art, plant journals, and simple gardening tasks.
6. Collect participant feedback after each session to refine content and timing.
7. Completion indicator: at least four weekly halaqah sessions delivered with documented topics, attendance, and feedback.` },
        { title: 'Establish a hospitality rhythm for visitors and guests during summer', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 51:24-27",
              arabic: "هَلْ أَتَاكَ حَدِيثُ ضَيْفِ إِبْرَاهِيمَ الْمُكْرَمِينَ * إِذْ دَخَلُوا عَلَيْهِ فَقَالُوا سَلَامًا ۖ قَالَ سَلَامٌ قَوْمٌ مُّنكَرُونَ * فَرَاغَ إِلَىٰ أَهْلِهِ فَجَاءَ بِعِجْلٍ سَمِينٍ * فَقَرَّبَهُ إِلَيْهِمْ قَالَ أَلَا تَأْكُلُونَ",
              translation: "Has the story of the honoured guests of Ibrahim reached you? When they entered upon him and said, Peace! He answered, Peace! (and thought) you are people unknown to me. Then he went to his household and came with a fat roasted calf. And placed it before them, (saying), Will you not eat?",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6018",
              translation: "The Prophet (peace be upon him) said: \"Whoever believes in Allah and the Last Day, let him be generous to his guest.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

 Summer is the peak season for visitors — the land is lush, crops are growing, and community energy is high. A structured hospitality rhythm ensures every visitor is welcomed with excellence, experiences the spiritual dimension of the programme, and leaves with a clear understanding of what MTC offers. Unstructured visitor experiences often feel chaotic and fail to convey the programme's depth.

**How?**

1. Designate one day per week (or fortnight) as "open visit" day when the site is prepared for guests.
2. Assign a hospitality coordinator for each open day responsible for welcoming, guiding, and feeding visitors.
3. Create a standard visitor experience: welcome with salaam and cold water, a guided walk through the growing areas with seasonal commentary, participation in a hands-on task (picking herbs, watering), and a shared meal.
4. Prepare a simple welcome pack: a one-page overview of MTC, the seasonal calendar, and how to get involved.
5. Keep a guest book for visitors to record their reflections — this becomes valuable documentation and feedback.
6. Follow up with every visitor within one week to invite further participation or answer questions.
7. Completion indicator: at least three open-visit days hosted with guest book entries and follow-up contacts made.` },
        { title: 'Monitor crop health and adjust care plans through the summer peak', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 1552",
              translation: "The Prophet (peace be upon him) said: \"There is none amongst the Muslims who plants a tree or sows seeds, and then a bird, or a person, or an animal eats from it, but it is regarded as a charitable gift for him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Careful crop monitoring protects this ongoing charity.",
            },
          ],
          description: `**Why?**

Summer heat, pests, and disease pressure test every planting decision made in spring. Without systematic monitoring, problems escalate from minor issues to crop losses. Monitoring is tying the camel: doing everything within your capacity to protect the crops, while trusting Allah for the outcome. Adjusting care plans based on observed data is itqan (excellence) in action.

**How?**

1. Walk every bed at least twice per week, systematically inspecting leaves (top and bottom), stems, soil moisture, and fruit development.
2. Use a scouting checklist: look for yellowing, wilting, holes in leaves, unusual spots, pest presence (aphids, caterpillars, beetles), and signs of disease (mildew, blight, rot).
3. Record findings in the crop tracking sheets started during Ghars — note date, bed, issue observed, and action taken.
4. Research organic and permissible pest management solutions for any issues found: neem oil, companion planting adjustments, physical barriers, beneficial insect release.
5. Adjust watering schedules based on rainfall, temperature, and plant stress signals — deep watering less often is generally better than shallow daily watering.
6. Hold a weekly team review of monitoring data to identify trends and make collective decisions on interventions.
7. Completion indicator: consistent twice-weekly monitoring records maintained through summer with documented interventions and outcomes.` },
      ],
    },
    {
      title: 'Execute the Hisab (Autumn/Harvest) programme — main harvest, seed-saving, and community assessment',
      priority: 'urgent', tags: ['hisab', 'autumn', 'harvest', 'shura'],
      description: 'Coordinate the main harvest season with an emphasis on gratitude, accountability, and forward planning. Hisab means accounting — this season is about gathering the fruits of the year\'s labour, preserving food and seeds for the future, and conducting an honest community assessment of what worked and what needs to change.',
      subtasks: [
        { title: 'Plan and execute the main harvest across all crop zones', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 6:141",
              arabic: "كُلُوا مِن ثَمَرِهِ إِذَا أَثْمَرَ وَآتُوا حَقَّهُ يَوْمَ حَصَادِهِ",
              translation: "Eat of its fruit when it yields and give its [due] right on the day of its harvest.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The main harvest is the culmination of months of patient work — and it must be handled with the same care as the planting and tending. Allah says "And it is He who produces gardens of trellised and untrellised date-palms, and crops of different shape and taste, and olives and pomegranates, similar and dissimilar. Eat of their fruit when they ripen" (6:141). Harvesting at the right time, in the right way, maximises yield and quality. Rushed or disorganised harvesting leads to bruised produce, missed crops, and waste — all forms of israf that dishonour the season's blessings.


**How?**

1. Review the crop tracking sheets to identify expected harvest windows for each variety and create a harvest calendar.
2. Organise harvest days by zone, starting with the most time-sensitive crops (those at risk of over-ripening or frost damage).
3. Train volunteers on proper harvest technique for each crop: how to pick tomatoes without bruising, cut squash with a clean stem, pull root vegetables without breaking them.
4. Set up a harvest processing station: washing, sorting (by quality and size), weighing, and recording yields for each crop.
5. Distribute fresh harvest according to the established priority: participants, families in need, community events, and preservation.
6. Begin processing crops for preservation immediately — do not let harvested produce sit more than 24 hours unprocessed.
7. Completion indicator: all planned crops harvested, weighed, recorded, and distributed or directed to preservation within 48 hours of picking.` },
        { title: 'Establish seed-saving protocols for open-pollinated varieties', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 6:141",
              arabic: "كُلُوا مِن ثَمَرِهِ إِذَا أَثْمَرَ وَآتُوا حَقَّهُ يَوْمَ حَصَادِهِ",
              translation: "Eat of their fruit when they bear fruit, and pay the due thereof on the day of its harvest.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 80:24-32",
              arabic: "فَلْيَنظُرِ الْإِنسَانُ إِلَىٰ طَعَامِهِ * أَنَّا صَبَبْنَا الْمَاءَ صَبًّا * ثُمَّ شَقَقْنَا الْأَرْضَ شَقًّا * فَأَنبَتْنَا فِيهَا حَبًّا * وَعِنَبًا وَقَضْبًا * وَزَيْتُونًا وَنَخْلًا * وَحَدَائِقَ غُلْبًا * وَفَاكِهَةً وَأَبًّا",
              translation: "Then let mankind look at his food — how We poured down water in torrents, then We broke open the earth, splitting it, and caused to grow therein grain, and grapes and fresh vegetation, and olive and palm trees, and gardens of dense shrubbery, and fruit and grass.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Seed-saving closes the agricultural cycle — what was planted in spring returns to the seed bank for next spring, embodying the Quranic sign of dead earth brought back to life (36:33). Open-pollinated varieties saved properly will produce true-to-type plants next year, reducing costs, building self-sufficiency, and preserving biodiversity.

**How?**

1. Identify which crops were planted from open-pollinated (non-hybrid) seed — only these are suitable for saving.
2. Select the healthiest, most productive plants in each variety as seed parents — never save from weak or diseased plants.
3. Allow seed fruits to fully mature on the plant (beyond eating stage): tomatoes soft and overripe, beans dry in the pod, squash hard-shelled.
4. Harvest seed material and process according to type: wet-process (ferment and rinse) for tomatoes and cucumbers; dry-process (thresh and winnow) for beans, grains, and flowers.
5. Dry seeds thoroughly in a well-ventilated area away from direct sunlight until they snap rather than bend.
6. Label each seed batch with variety name, date saved, parent plant notes, and expected viability period.
7. Completion indicator: labelled seed packets from at least 5 varieties stored in cool, dry, airtight containers with a seed inventory log.` },
        { title: 'Preserve surplus harvest through halal-compliant methods', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5409",
              translation: "The Prophet (peace be upon him) would eat dates and drink water at iftar. The preservation of surplus harvest through halal-compliant drying, fermenting, and storage follows the Prophetic precedent of preparing provisions wisely.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 1552",
              translation: "The Prophet (peace be upon him) said: \"There is none amongst the Muslims who plants a tree or sows seeds, and then a bird, or a person, or an animal eats from it, but it is regarded as a charitable gift for him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Preservation extends the charity of the harvest.",
            },
          ],
          description: `**Why?**

Preservation transforms a seasonal abundance into year-round sustenance. Without it, surplus produce rots within days — pure israf of what Allah provided. The Quran commands "eat of their fruit when they ripen, and give its due on the day of its harvest, and do not be excessive" (6:141). Preservation is the practical fulfilment of "do not be excessive": honouring every tomato, cucumber, and herb by ensuring none goes to waste. Preserved food also supplies the Sukun (winter) season when no fresh harvest is available, and feeds the hospitality programme year-round.


**How?**

1. Assess surplus quantities for each crop and match to appropriate preservation methods: canning, dehydrating, freezing, fermenting, or root cellaring.
2. Ensure all preservation methods and ingredients are halal — no alcohol-based preservation, verify vinegar sources, check any commercial additives.
3. Organise preservation workshops as community events: teach canning safety (proper sterilisation, acidity levels), dehydration technique, and basic fermentation.
4. Process preserves in batches by type, labelling every jar or container with contents, date, and batch number.
5. Conduct proper food safety checks: sealed lids, correct processing times, appropriate storage temperatures.
6. Allocate preserved goods: community pantry stock, distribution to families in need, Sukun season supplies, and next year's hospitality programme.
7. Completion indicator: all surplus harvest preserved, labelled, safety-checked, and allocated with a complete inventory of preserved goods.` },
        { title: 'Conduct the annual community shura assessment of the full seasonal cycle', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 42:38",
              arabic: "وَأَمْرُهُمْ شُورَىٰ بَيْنَهُمْ",
              translation: "And whose affair is determined by consultation among themselves.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 3:159",
              arabic: "وَشَاوِرْهُمْ فِي الْأَمْرِ",
              translation: "And consult them in the matter.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 1714",
              translation: "The Prophet (peace be upon him) never decided a matter without consulting his companions.",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Shura (mutual consultation) is a Quranic command: "And those who have responded to their Lord and established prayer and whose affair is consultation among themselves" (42:38). The autumn assessment is where the community honestly evaluates the year — what grew well, what failed, what systems worked, what relationships strengthened or strained. Without structured shura, problems carry forward silently, resentments build, and the programme stagnates. An honest assessment honours every participant's experience and creates shared ownership of the path forward.


**How?**

1. Schedule the shura gathering after the main harvest is complete but before Sukun begins — participants should feel the accomplishment of harvest while the year is fresh in memory.
2. Prepare a factual summary to present: total yields by crop, volunteer hours logged, events hosted, visitors received, costs incurred, and any incidents.
3. Structure the discussion around four questions: What did we do well? What did we struggle with? What should we change? What should we try next year?
4. Ensure every participant has an opportunity to speak — use a talking stick or structured rounds to prevent domination by a few voices.
5. Assign a note-taker to document all feedback, suggestions, and decisions made during the shura.
6. Identify 3-5 concrete action items for the coming Sukun planning season, each with an assigned owner and timeline.
7. Completion indicator: a documented shura report with participant feedback, quantitative summary, and prioritised action items for the next cycle.` },
        { title: 'Record and archive the complete Hisab season data for future reference', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:282",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا تَدَايَنتُم بِدَيْنٍ إِلَىٰ أَجَلٍ مُّسَمًّى فَاكْتُبُوهُ",
              translation: "O you who believe, when you contract a debt for a specified term, write it down.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 59:18",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللَّهَ وَلْتَنظُرْ نَفْسٌ مَّا قَدَّمَتْ لِغَدٍ",
              translation: "O you who believe, fear Allah, and let every soul look to what it has put forth for tomorrow.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Data without archiving is lost knowledge. Every measurement, observation, and decision from the Hisab season is a lesson for future years — which varieties yielded best, which preservation methods worked, how much food was distributed, and what the community recommended. The Islamic tradition of isnad (chain of transmission) applies to practical knowledge just as it does to hadith: recording who did what, when, and with what results creates an unbroken chain of agricultural wisdom that grows stronger each year.


**How?**

1. Compile all crop tracking sheets, harvest logs, and yield records into a single season report.
2. Add preservation inventory, seed-saving log, and distribution records to the report.
3. Include the shura assessment report with its action items and assigned responsibilities.
4. Photograph the land at season's end — before winter cleanup — for visual documentation of the growing area.
5. Compare this year's data to previous years (if available) to identify trends: improving yields, persistent pest problems, volunteer engagement patterns.
6. Store the archive in both digital format (shared drive or cloud) and physical format (printed binder on-site).
7. Completion indicator: a complete Hisab season archive created, stored in two formats, and accessible to all team leads.` },
      ],
    },
    {
      title: 'Plan the Sukun (Winter/Stillness) season — rest, study circles, maintenance, and next-year preparation',
      priority: 'urgent', tags: ['sukun', 'winter', 'rest', 'planning'],
      description: 'Design the winter programme around the Quranic concept of sukun (tranquillity, 30:21) — a season of intentional rest, deep learning, infrastructure maintenance, and strategic planning. Sukun is not idleness but purposeful stillness, like the earth resting before it brings forth life again in spring.',
      subtasks: [
        { title: 'Establish winter study circle programme focused on land ethics and Islamic ecology', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 22:41",
              arabic: "الَّذِينَ إِن مَّكَّنَّاهُمْ فِي الْأَرْضِ أَقَامُوا الصَّلَاةَ وَآتَوُا الزَّكَاةَ وَأَمَرُوا بِالْمَعْرُوفِ وَنَهَوْا عَنِ الْمُنكَرِ ۗ وَلِلَّهِ عَاقِبَةُ الْأُمُورِ",
              translation: "those who, when We establish them in the land, keep up the prayer, pay the prescribed alms, command what is right, and forbid what is wrong: God controls the outcome of all events.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1358",
              translation: "The Prophet (peace be upon him) said: \"Seeking knowledge is an obligation upon every Muslim.\"",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "a structured winter study circle fulfils this obligation — applying it to land ethics and Islamic ecology grounds the agricultural work in obligatory learning",
            },
          ],
          description: `**Why?**

Winter is the season of deep learning — when hands rest from the soil, minds and hearts engage with the knowledge that will shape next year's work. The Quran repeatedly calls humanity to reflect on creation: "Indeed, in the creation of the heavens and the earth and the alternation of the night and the day are signs for those of understanding" (3:190). Study circles during Sukun connect the practical farming experience to its theological roots, producing participants who understand why they plant, not just how. This depth of understanding is what makes MTC transformative rather than transactional.


**How?**

1. Design a 6-8 week study circle curriculum covering: Islamic land ethics (khalifah, amanah, israf), Quranic agricultural parables, hadith on planting and provision, and contemporary Muslim environmental thought.
2. Select primary texts and supplementary readings — keep sessions accessible to all education levels with a mix of Quranic tafsir, hadith commentary, and practical articles.
3. Schedule weekly sessions in a warm indoor space, timed to follow a congregational salah for natural gathering.
4. Recruit facilitators from among community scholars, experienced participants, or visiting speakers.
5. Include a reflective journaling component: each participant maintains a seasonal reflection journal connecting learning to their personal experience on the land.
6. End the series with a collective vision session where study insights feed directly into next year's planning.
7. Completion indicator: study circle curriculum designed, facilitators confirmed, space booked, and at least four sessions delivered with participant feedback.` },
        { title: 'Conduct infrastructure maintenance and winterisation of the site', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Shu'ab al-Iman al-Bayhaqi 5313",
              translation: "The Prophet (peace be upon him) said: \"Allah loves that when one of you does a job, he does it with excellence (itqan).\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Hasan",
              rationale: "Winterising infrastructure is itqan — caring for tools and structures in their season of rest.",
            },
          ],
          description: `**Why?**

Infrastructure neglected over winter deteriorates — irrigation lines crack in frost, tools rust, structures weaken, and compost piles lose their heat. By spring, what could have been a simple repair becomes a costly replacement. Winterisation is itqan applied to stewardship: protecting the physical assets that the community invested in all year ensures they are ready when Ghars season arrives.

**How?**

1. Drain and disconnect all irrigation lines, hoses, and outdoor water connections before the first hard freeze.
2. Clean, sharpen, oil, and properly store all hand tools — inventory them against the master list and note any that need replacement.
3. Inspect and repair all structures: raised beds, trellises, fences, tool sheds, prayer area shelters, and signage.
4. Turn and insulate compost piles for winter decomposition — cover with a tarp or thick layer of straw to retain heat.
5. Apply winter mulch to perennial beds and overwintering crops to protect root systems.
6. Check and secure any rainwater collection systems — drain if freeze risk is high, or insulate tanks.
7. Completion indicator: all infrastructure winterised, tools inventoried and stored, structures repaired, and a maintenance log completed.` },
        { title: 'Review financial accounts and prepare the next-year budget', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 17:26-27",
              arabic: "وَآتِ ذَا الْقُرْبَىٰ حَقَّهُ وَالْمِسْكِينَ وَابْنَ السَّبِيلِ وَلَا تُبَذِّرْ تَبْذِيرًا * إِنَّ الْمُبَذِّرِينَ كَانُوا إِخْوَانَ الشَّيَاطِينِ",
              translation: "And give the relative his right, and the needy, and the traveler, and do not spend wastefully. Indeed, the wasteful are brothers of the devils.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 25:67",
              arabic: "وَالَّذِينَ إِذَا أَنفَقُوا لَمْ يُسْرِفُوا وَلَمْ يَقْتُرُوا وَكَانَ بَيْنَ ذَٰلِكَ قَوَامًا",
              translation: "And those who, when they spend, are neither extravagant nor miserly, but hold a medium way between those extremes.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1968",
              translation: "The Prophet (peace be upon him) said: \"The best of you is the one who is best in paying off his debts.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Honest financial accounting is a direct expression of amanah (trustworthiness). Every dirham spent on the programme came from community contributions, grants, or earned revenue — the community deserves a transparent accounting of how those funds were used. Preparing next year's budget during Sukun ensures the programme enters spring with financial clarity rather than scrambling for resources at the last moment. Financial transparency also builds donor and participant trust, which is essential for long-term sustainability.


**How?**

1. Compile all income and expense records for the year: donations, grants, sales revenue, seed costs, tool purchases, event expenses, and any other transactions.
2. Categorise expenses by season and type to identify where money was spent and whether allocations matched the plan.
3. Calculate the true cost per kilogram of food produced and per participant served — these metrics reveal programme efficiency.
4. Present the financial summary to the community (at a Sukun gathering or through a written report) with complete transparency.
5. Draft a next-year budget based on this year's actuals, adjusted for planned changes identified in the shura assessment.
6. Identify funding needs and potential sources: community fundraising, grant applications, product sales, or partnerships.
7. Completion indicator: a complete annual financial report shared with the community and a draft next-year budget ready for review.` },
        { title: 'Draft the next-year seasonal plan incorporating shura feedback', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 42:38",
              arabic: "وَأَمْرُهُمْ شُورَىٰ بَيْنَهُمْ",
              translation: "And whose affair is determined by consultation among themselves.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 59:18",
              arabic: "وَلْتَنظُرْ نَفْسٌ مَّا قَدَّمَتْ لِغَدٍ",
              translation: "And let every soul look to what it has put forth for tomorrow.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 4948",
              translation: "The Prophet (peace be upon him) said: \"The one who is consulted is entrusted (with a trust).\"",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The shura assessment produced concrete recommendations — they must be translated into an actionable plan before spring arrives, or they remain good intentions that never materialise. Planning during Sukun respects the season's purpose: stillness is not inaction but preparation. The Quran describes how the dead earth lies still before Allah brings it to life (36:33) — Sukun planning is the stillness before the earth's revival in Ghars. A detailed plan also allows early procurement, volunteer recruitment, and partnership development while there is time to do them well.


**How?**

1. Review the shura assessment action items and categorise them: changes to crop plan, changes to community programming, infrastructure improvements, and operational adjustments.
2. Update the four-season calendar with any date changes based on this year's experience.
3. Draft a revised crop plan incorporating variety changes, bed rotations (never plant the same family in the same bed two years running), and any new crops requested by the community.
4. Plan volunteer recruitment and training needs — identify skills gaps revealed during the year and design pre-season workshops to address them.
5. Schedule pre-Ghars preparation tasks: seed orders, soil testing, early composting, and infrastructure repairs that must be complete before planting.
6. Share the draft plan with key stakeholders for feedback before finalising, allowing a 2-week review period.
7. Completion indicator: a complete next-year seasonal plan incorporating shura feedback, shared for review, and finalised before the Sukun season ends.` },
        { title: 'Nurture community connection through winter gatherings and reflection', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 106:1-4",
              arabic: "لِإِيلَافِ قُرَيْشٍ إِيلَافِهِمْ رِحْلَةَ الشِّتَاءِ وَالصَّيْفِ فَلْيَعْبُدُوا رَبَّ هَٰذَا الْبَيْتِ الَّذِي أَطْعَمَهُم مِّن جُوعٍ وَآمَنَهُم مِّنْ خَوْفٍ",
              translation: "For the accustomed security of the Quraysh — their accustomed security in the winter and summer caravan journeys. Let them worship the Lord of this House, who has fed them against hunger and made them safe from fear.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Without intentional winter gatherings, the community that formed around shared agricultural work disperses during the months when no planting or harvesting occurs. Relationships weaken, newcomers lose connection, and the sense of shared purpose fades. The Quran describes sukun as the tranquillity between spouses (30:21), and the same principle extends to community: stillness is a time for deepening bonds, not severing them. Winter gatherings maintain the relational fabric that makes spring's communal work possible and joyful.


**How?**

1. Schedule at least one community gathering per month during Sukun — potluck dinners, chai evenings, or family days.
2. Theme each gathering around gratitude and reflection: share highlights from the year, express appreciation for volunteers, and celebrate what the community accomplished together.
3. Include practical components: seed catalogue browsing parties (choosing next year's varieties together), preservation tastings (sampling what was canned and dried), and photo slideshows from the seasons.
4. Create space for newcomers to learn about the programme and express interest in joining — Sukun gatherings are the primary recruitment opportunity for next year.
5. Maintain the MTC communication channels with regular winter updates: planning progress, study circle highlights, and reminders of upcoming gatherings.
6. Close the Sukun season with a formal gathering that previews the next-year plan and invites commitments for Ghars participation.
7. Completion indicator: at least three winter gatherings hosted with attendance logged and new participant interest collected.` },
      ],
    },
  ],

  // ── GROWTH — Expand seasonal programming with hospitality, tarbiyah, heritage, shura, and volunteer systems ──
  moontrance_seasonal_growth: [
    {
      title: 'Launch a farm-to-iftar guest hospitality programme tied to the seasonal harvest',
      priority: 'urgent', tags: ['hospitality', 'iftar', 'farm-to-table'],
      description: 'Create a structured hospitality programme that hosts guests for iftar meals prepared from the land\'s own harvest, connecting the food on the table directly to the earth it came from. This programme embodies the Prophetic command to honour guests while demonstrating the full cycle of Islamic land stewardship from seed to plate.',
      subtasks: [
        { title: 'Design the farm-to-iftar concept with menu planning tied to seasonal availability', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 602",
              translation: "The Prophet (peace be upon him) said: \"Whoever believes in Allah and the Last Day, let him honour his guest.\" Farm-to-iftar hospitality is the embodiment of this Prophetic command.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 51:26-27",
              arabic: "فَرَاغَ إِلَىٰ أَهْلِهِ فَجَاءَ بِعِجْلٍ سَمِينٍ فَقَرَّبَهُ إِلَيْهِمْ قَالَ أَلَا تَأْكُلُونَ",
              translation: "Then he turned quickly to his household, brought a roasted calf, and placed it before them saying: Will you not eat?",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A farm-to-iftar programme is only meaningful if the food genuinely comes from the land. Designing menus around seasonal availability ensures authenticity — guests break their fast with food they can see growing in the soil outside, creating a visceral connection between sustenance and the earth Allah provides. The Prophet (peace be upon him) broke his fast with dates and water, the simplest local provision. Menu planning also prevents over-promising: if the summer harvest yields tomatoes and herbs but not grain, the iftar features what the land actually produced, supplemented only where necessary.


**How?**

1. Review the crop plan for each season and identify which harvest items can anchor an iftar menu — salads, soups, roasted vegetables, herb breads, preserved fruits.
2. Design 3-4 seasonal menu templates: a Ghars menu (early greens, herbs, simple dishes), a Ri'ayah menu (summer abundance, diverse plates), a Hisab menu (harvest feast, preserved items), and a Sukun menu (stored preserves, hearty soups).
3. Identify which items must be sourced externally (grains, protein, dairy) and establish halal suppliers.
4. Calculate serving quantities for groups of 15, 30, and 50 to allow flexible event sizing.
5. Test each menu at a small internal gathering before offering it to external guests.
6. Document recipes with the farm-sourced ingredients highlighted so guests understand what came from the land.
7. Completion indicator: four seasonal menu templates tested, costed, and documented with sourcing notes.` },
        { title: 'Build the guest invitation and registration system', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 76:8-9",
              arabic: "وَيُطْعِمُونَ الطَّعَامَ عَلَىٰ حُبِّهِ مِسْكِينًا وَيَتِيمًا وَأَسِيرًا إِنَّمَا نُطْعِمُكُمْ لِوَجْهِ اللَّهِ لَا نُرِيدُ مِنكُمْ جَزَاءً وَلَا شُكُورًا",
              translation: "And they give food in spite of love for it to the needy, the orphan, and the captive, [saying]: We feed you only for the countenance of Allah. We wish not from you reward or gratitude.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Hospitality without structure leads to either over-crowding or empty seats — both dishonour the intention. A registration system ensures every guest is expected, every meal is sized correctly, and every visitor receives personal attention. Registration also captures guest information for follow-up, turning a one-time visit into an ongoing relationship.

**How?**

1. Create a simple registration form (online and paper) collecting: name, contact information, number of guests, any dietary restrictions, and how they heard about the programme.
2. Set capacity limits for each iftar event based on kitchen capacity, seating, and available harvest.
3. Send confirmation messages to registered guests with directions, timing, dress code (outdoor setting), and what to expect.
4. Maintain a guest database for follow-up communications and future invitations.
5. Designate a registration coordinator who monitors sign-ups and communicates capacity status.
6. Build a waitlist system for over-subscribed events, with automatic notification when spots open.
7. Completion indicator: registration system operational with at least one iftar event fully booked through the system.` },
        { title: 'Train a hospitality team in guest welcome, service, and Islamic etiquette', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 51:24-27",
              arabic: "هَلْ أَتَاكَ حَدِيثُ ضَيْفِ إِبْرَاهِيمَ الْمُكْرَمِينَ * إِذْ دَخَلُوا عَلَيْهِ فَقَالُوا سَلَامًا ۖ قَالَ سَلَامٌ",
              translation: "Has the story of the honoured guests of Ibrahim reached you? When they entered upon him and said, Peace! He answered, Peace!",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 4:36",
              arabic: "وَبِالْوَالِدَيْنِ إِحْسَانًا وَبِذِي الْقُرْبَىٰ وَالْيَتَامَىٰ وَالْمَسَاكِينِ وَالْجَارِ ذِي الْقُرْبَىٰ وَالْجَارِ الْجُنُبِ وَالصَّاحِبِ بِالْجَنبِ وَابْنِ السَّبِيلِ",
              translation: "Worship Allah and associate nothing with Him, and to parents do good, and to relatives, orphans, the needy, the near neighbor, the neighbor farther away, the companion at your side, and the traveler.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6018",
              translation: "The Prophet (peace be upon him) said: \"Whoever believes in Allah and the Last Day, let him be generous to his guest.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The guest experience is shaped by the people, not just the food. Generosity means more than a full plate — it means a warm greeting, attentive service, comfortable seating, and a graceful farewell. Training ensures every team member embodies this standard consistently, regardless of which individuals are serving on a given evening. Untrained hospitality often falls into chaos, leaving guests feeling like an imposition rather than an honour.

**How?**

1. Recruit 8-12 community members for the hospitality team, selecting for warmth, reliability, and willingness to serve.
2. Conduct a training session covering: greeting guests with salaam and a smile, guiding them through the site, explaining the MTC programme, serving food with Islamic etiquette (right hand, bismillah), and ensuring no guest leaves without being thanked.
3. Assign roles for each event: greeter, guide, kitchen lead, servers, clean-up crew, and a floater who handles unexpected needs.
4. Practice with a mock iftar — role-play guest arrival, meal service, and departure to identify gaps.
5. Create a hospitality checklist for each role so team members have a reference on the day.
6. Debrief after every iftar event: what went smoothly, what was awkward, and what to improve next time.
7. Completion indicator: hospitality team trained, roles assigned, mock event completed, and at least two real iftar events executed with post-event debriefs.` },
        { title: 'Integrate a guided farm tour into the guest iftar experience', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6019",
              translation: "The Prophet (peace be upon him) said: \"Whoever believes in Allah and the Last Day, let him honour his guest.\" A guided farm tour is an extension of generous hospitality — sharing knowledge alongside food.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Without a farm tour, guests eat a nice meal but miss the transformative connection between the earth and the plate. The tour is where guests see dead earth brought to life (36:33), walk among the crops that will become their food, and hear the Quranic and Prophetic teachings that drive the programme. This is the moment that converts a meal into a da'wah experience — not through preaching but through witnessing. Guests who see the full cycle are far more likely to return, participate, and spread the word.


**How?**

1. Design a 20-30 minute guided walking route through the growing areas, stopping at 4-5 points of interest: seed nursery, main crop beds, composting area, prayer space, and harvest station.
2. Script talking points for each stop that blend agricultural explanation with Islamic reflection — e.g., at the seed nursery, mention the sadaqah jariyah hadith; at the composting area, discuss the cycle of decay and renewal as a sign of resurrection.
3. Train 3-4 tour guides from the hospitality team, ensuring they can answer basic questions about crops, seasons, and the programme.
4. Time the tour to end at the iftar gathering area just before adhan al-Maghrib, so the meal follows naturally from the experience.
5. Include a hands-on element: guests pick a herb or vegetable during the tour that will appear in their meal.
6. Provide a take-home card summarising the MTC seasons and how to get involved.
7. Completion indicator: guided tour route designed, guides trained, and at least two tours delivered with guest feedback collected.` },
        { title: 'Measure hospitality programme impact and gather testimonials', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:13",
              arabic: "يَا أَيُّهَا النَّاسُ إِنَّا خَلَقْنَاكُم مِّن ذَكَرٍ وَأُنثَىٰ وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا",
              translation: "O mankind, indeed We have created you from male and female and made you peoples and tribes that you may know one another. Gathering testimonials deepens mutual knowing (ta'aruf).",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Impact measurement ensures the hospitality programme achieves its spiritual and community-building goals, not just its logistical ones. Testimonials from guests provide authentic evidence of transformation that no internal reporting can match. The Islamic principle of hisab (accounting) applies to community impact just as it does to finances — knowing how many guests were served, how many returned, and how the experience affected them provides the honest assessment needed to improve and to justify continued investment.


**How?**

1. Track quantitative metrics for every iftar event: number of guests, percentage who are first-time visitors vs. returning, cost per guest, and food sourced from the farm vs. purchased.
2. Distribute a brief post-event feedback form (5 questions maximum) covering: overall experience, most memorable moment, likelihood of returning, and interest in deeper involvement.
3. Identify 3-5 guests per season who had particularly meaningful experiences and request recorded or written testimonials with their permission.
4. Compile a seasonal hospitality report combining quantitative data and qualitative testimonials.
5. Share highlights (anonymised where appropriate) through community channels to build programme awareness and volunteer motivation.
6. Use feedback to refine menus, tour content, and hospitality team training before the next season's events.
7. Completion indicator: a complete seasonal hospitality impact report with at least 3 guest testimonials and documented improvements based on feedback.` },
      ],
    },
    {
      title: 'Integrate children\'s tarbiyah programming across all four seasons',
      priority: 'urgent', tags: ['tarbiyah', 'children', 'education', 'family'],
      description: 'Design a year-round children\'s programme that uses the seasonal agricultural cycle as a living classroom for Islamic values, ecological awareness, and practical life skills. Children who plant seeds in spring, tend crops in summer, harvest in autumn, and study in winter internalise the relationship between effort, patience, trust in Allah, and provision in a way no textbook can teach.',
      subtasks: [
        { title: 'Design age-appropriate seasonal curricula for three age groups', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 66:6",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا قُوا أَنفُسَكُمْ وَأَهْلِيكُمْ نَارًا",
              translation: "O you who have believed, protect yourselves and your families from a Fire. Designing age-appropriate tarbiyah curricula fulfils this divine mandate to educate and protect the young.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1358",
              translation: "The Prophet (peace be upon him) said: \"Every child is born upon the fitrah (natural disposition). Then his parents make him a Jew, a Christian, or a Magian.\" Seasonal tarbiyah nurtures the child's fitrah.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Children of different ages learn differently — a 5-year-old engages through sensory exploration and story, a 10-year-old through hands-on projects and responsibility, and a teenager through meaningful contribution and intellectual challenge. A single undifferentiated programme bores older children and overwhelms younger ones. Age-appropriate design ensures every child is challenged and supported at their level.

**How?**

1. Define three age groups: young children (4-7), middle children (8-11), and youth (12-16).
2. For each age group, design seasonal activities: Ghars — sensory planting (young), bed ownership (middle), crop planning leadership (youth). Ri'ayah — nature walks (young), pest scouting teams (middle), irrigation management (youth). Hisab — harvest art (young), weighing and recording (middle), distribution coordination (youth). Sukun — nature stories (young), seed cataloguing (middle), study circle participation (youth).
3. Link each activity to an Islamic value: planting = sadaqah, tending = sabr, harvesting = shukr, resting = tawakkul.
4. Create simple lesson plans for each session with materials lists, Quranic references, and learning objectives.
5. Include journaling or portfolio components so children document their seasonal journey.
6. Train adult facilitators for each age group — ensure at least 2 trained adults per group for safety and quality.
7. Completion indicator: three age-group curricula covering all four seasons, with lesson plans and facilitator guides completed.` },
        { title: 'Create hands-on learning stations that children manage through the growing season', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 495",
              translation: "The Prophet (peace be upon him) said: \"Command your children to pray at the age of seven and discipline them for it at the age of ten.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Hasan Sahih",
              rationale: "Hands-on learning stations cultivate responsibility and practical devotion in children.",
            },
          ],
          description: `**Why?**

Children learn by doing, not watching. A dedicated learning station — a small garden bed, a composting bin, a weather station — that children manage themselves creates ownership and responsibility. When a child waters "their" bed daily all summer and then harvests tomatoes in autumn, the lesson of sabr (patience) and tawakkul (trust) is written into their body and memory, not just their mind. The Quran describes how Allah brings forth grain and grapes and herbs and olives and dates (80:27-29) — children who participate in this process understand these ayat experientially.


**How?**

1. Designate 3-4 learning stations on-site: a children's garden bed (small, raised, easy access), a composting observation station (clear-sided bin showing decomposition), a weather and rain gauge station, and a nature observation journal station.
2. Assign each station to an age group with specific responsibilities: young children observe and water, middle children measure and record, youth manage and troubleshoot.
3. Equip stations with child-sized tools, weather-resistant signage, and data collection sheets appropriate to each age level.
4. Schedule weekly "station time" during regular programme days when children work at their stations with adult support.
5. Create a season-end presentation where each group shares what they learned from their station.
6. Rotate station assignments each season so children experience multiple dimensions of the land over the year.
7. Completion indicator: learning stations built, equipped, and assigned with weekly schedules and at least one season of operation completed.` },
        { title: 'Recruit and train parent-volunteers as tarbiyah facilitators', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (peace be upon him) said: \"Whoever follows a path in pursuit of knowledge, Allah will make easy for him a path to Paradise.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Training parent-volunteers as facilitators multiplies the paths of knowledge in the community.",
            },
          ],
          description: `**Why?**

The children's programme depends on dedicated adults who can facilitate learning, ensure safety, and model Islamic values in real time. Parents are the ideal facilitators because they extend the learning into the home — a parent who teaches composting on Saturday reinforces the lesson at dinner. Parent-facilitators shepherd both their own children and others, multiplying the tarbiyah impact beyond what any hired instructor could achieve.

**How?**

1. Issue a call for parent-volunteers through the MTC community channels, emphasising that no farming expertise is needed — willingness and reliability are the requirements.
2. Conduct a half-day training covering: the seasonal tarbiyah framework, age-group characteristics, safety protocols, Islamic values integration (how to connect each activity to a Quranic ayah or hadith), and basic facilitation skills.
3. Pair each new facilitator with an experienced one for their first two sessions — mentorship builds confidence.
4. Create a simple facilitator handbook with the seasonal curriculum, activity guides, safety checklist, and emergency procedures.
5. Schedule facilitators in pairs, rotating monthly to prevent burnout and allow schedule flexibility.
6. Hold a quarterly facilitator gathering for feedback, training refresher, and mutual encouragement.
7. Completion indicator: at least 8 parent-facilitators trained, paired, and scheduled for the coming season with handbook distributed.` },
        { title: 'Build celebration milestones that mark children\'s seasonal growth', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 94:5-6",
              arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا إِنَّ مَعَ الْعُسْرِ يُسْرًا",
              translation: "For indeed, with hardship [will be] ease. Indeed, with hardship [will be] ease. Celebrating children's seasonal milestones teaches them that effort yields fruit.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Children thrive on recognition and ritual. Marking their progress through the seasons — not with grades but with celebration — reinforces the values of each phase and gives them a sense of journey and accomplishment. The Prophet (peace be upon him) was generous with encouragement toward children, placing them on his lap, asking about their projects, and honouring their efforts. Seasonal milestones create moments of public appreciation that build the child's confidence and identity as a steward of the earth and a contributor to the ummah.


**How?**

1. Define a milestone for each season: Ghars — "First Seed" celebration (child plants and names their first crop), Ri'ayah — "Green Thumb" recognition (sustained weekly care), Hisab — "Harvest Helper" ceremony (participation in the main harvest), Sukun — "Young Scholar" completion (finishing the winter study programme).
2. Design simple certificates or badges for each milestone, incorporating the season's Quranic theme and the child's name.
3. Hold a brief ceremony at each seasonal transition gathering where children receive their milestone recognition in front of the community.
4. Create a "Season Passport" booklet for each child that gets stamped at each milestone, building a visual record of their year-long journey.
5. Invite parents and community elders to attend milestone ceremonies to amplify the sense of occasion and intergenerational connection.
6. Photograph milestone moments (with parental permission) for the community archive and next year's recruitment materials.
7. Completion indicator: milestone system designed with certificates/badges, Season Passports printed, and at least one ceremony successfully conducted.` },
        { title: 'Document children\'s programme outcomes for improvement and replication', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 1631",
              translation: "The Prophet (peace be upon him) said: \"When a man dies, his deeds come to an end except for three: ongoing charity, beneficial knowledge, or a righteous child who prays for him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Documenting children's programme outcomes preserves beneficial knowledge for replication.",
            },
          ],
          description: `**Why?**

Without documentation, the children's programme exists only in the memories of its participants — when facilitators move on, the institutional knowledge leaves with them. Documenting outcomes serves three purposes: it enables honest assessment of what worked (hisab), it provides evidence for funders and supporters, and it creates a replicable model that other communities can adapt. The Islamic tradition of preserving and transmitting beneficial knowledge (ilm nafi') applies directly — a documented tarbiyah programme that can be shared is ongoing sadaqah jariyah for its creators.


**How?**

1. Collect data throughout the year: attendance by age group, activities completed, facilitator-to-child ratios, and parent feedback.
2. Gather qualitative evidence: children's journal entries (with permission), facilitator observations, parent testimonials, and photographs.
3. Assess learning outcomes informally: can children identify plants they grew? Do they reference Islamic values when discussing the land? Have behavioural or attitudinal changes been noticed at home?
4. Compile an annual children's programme report combining quantitative participation data, qualitative stories, facilitator reflections, and parent feedback.
5. Identify successes to strengthen and challenges to address in next year's curriculum revision.
6. Package the programme model (curriculum, facilitator guide, station designs, milestone system) as a shareable resource for other communities.
7. Completion indicator: annual programme report completed with data, stories, and a shareable programme package prepared.` },
      ],
    },
    {
      title: 'Establish a seed-saving heritage programme preserving local and heirloom varieties',
      priority: 'urgent', tags: ['seed-saving', 'heritage', 'biodiversity', 'preservation'],
      description: 'Build a structured seed-saving programme that goes beyond basic seed collection to actively preserve, catalogue, and share heirloom and locally adapted varieties. This programme treats seeds as a trust (amanah) from previous generations — biological heritage that carries the accumulated wisdom of countless growing seasons and must be passed forward.',
      subtasks: [
        { title: 'Establish a seed library with cataloguing and lending system', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 6:95",
              arabic: "إِنَّ اللَّهَ فَالِقُ الْحَبِّ وَالنَّوَىٰ يُخْرِجُ الْحَيَّ مِنَ الْمَيِّتِ وَمُخْرِجُ الْمَيِّتِ مِنَ الْحَيِّ",
              translation: "Indeed, Allah is the cleaver of grain and date seeds. He brings the living out of the dead and brings the dead out of the living.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A seed library transforms individual seed-saving into community infrastructure. When seeds are catalogued, stored, and available for borrowing, every grower in the community gains access to locally adapted, open-pollinated varieties without cost. This directly opposes the commercial seed industry's push toward dependency and embodies the Prophetic principle that natural resources are shared commons. The library also creates accountability — seeds lent out are expected to return with new seeds saved from the harvest, building the collection rather than depleting it.


**How?**

1. Designate a climate-controlled storage space (cool, dry, dark) for the seed library — a refrigerator dedicated to seeds works for small collections, a climate-controlled cabinet for larger ones.
2. Design a cataloguing system: each variety gets a card listing common name, botanical name, source, year saved, growing notes, and estimated viability period.
3. Package seeds in labelled paper envelopes (not plastic, which traps moisture) stored in airtight containers with silica gel packets.
4. Create a lending system: community members can "borrow" seed packets with the agreement to return saved seeds from their harvest, plus a growing report.
5. Maintain a digital inventory spreadsheet tracking what is in stock, what is lent out, and what is returned.
6. Promote the seed library through community channels and at seasonal gatherings.
7. Completion indicator: seed library established with at least 15 catalogued varieties, lending system operational, and at least 5 community members registered as borrowers.` },
        { title: 'Identify and source heirloom varieties with cultural or regional significance', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 56:63-64",
              arabic: "أَفَرَأَيْتُم مَّا تَحْرُثُونَ أَأَنتُمْ تَزْرَعُونَهُ أَمْ نَحْنُ الزَّارِعُونَ",
              translation: "And have you seen that [seed] which you sow? Is it you who makes it grow, or are We the grower?",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Heirloom varieties carry cultural memory — a Palestinian tomato, a Yemeni melon, or a Turkish pepper connects displaced community members to ancestral foodways. These varieties are also often better adapted to specific conditions and more flavourful than commercial hybrids. Preserving them is both ecological stewardship and cultural preservation. The Quran says Allah created "from the earth every noble kind" (31:10) — every distinct variety is part of that noble diversity, and losing it is a loss for the ummah and for creation.


**How?**

1. Survey the community to identify cultural food traditions and the specific varieties associated with them — which vegetables, herbs, and fruits do families remember from their homelands?
2. Research seed exchanges, heritage seed organisations, and international seed banks that carry varieties from Muslim-majority regions.
3. Contact elder community members and immigrant families who may have brought seeds with them or know where to source traditional varieties.
4. Source at least 5 heirloom varieties with documented cultural significance and grow them in a dedicated heritage plot.
5. Record the cultural story behind each variety: where it comes from, what dishes it is used in, and why it matters to the community.
6. Prioritise varieties at risk of being lost — those maintained by only a few growers or no longer commercially available.
7. Completion indicator: at least 5 culturally significant heirloom varieties sourced, grown in a heritage plot, and documented with their cultural stories.` },
        { title: 'Train community members in proper seed-saving techniques for diverse crop types', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (peace be upon him) said: \"Whoever follows a path in pursuit of knowledge, Allah will make easy for him a path to Paradise.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Training community members in seed-saving techniques is a path of beneficial knowledge.",
            },
          ],
          description: `**Why?**

Seed-saving done poorly produces weak, diseased, or untrue-to-type seeds that fail in the next season — undermining confidence in the entire programme. Proper technique varies significantly between crop families: tomato seeds need fermentation, bean seeds need thorough drying, and cross-pollinating crops like squash need isolation. Training the community transforms seed-saving from a mystified specialist skill into common knowledge, fulfilling the Islamic obligation to share beneficial knowledge and building collective resilience.


**How?**

1. Develop a seed-saving workshop series covering the three main categories: wet-processed seeds (tomatoes, cucumbers, melons), dry-processed seeds (beans, peas, grains, flowers), and biennial seeds (carrots, beets, onions — which require overwintering).
2. Schedule workshops during the appropriate harvest window for each crop type — teach tomato seed-saving when tomatoes are ripe, not in abstract.
3. Include hands-on practice at every workshop: participants process seeds themselves under guidance, not just watch a demonstration.
4. Cover isolation distances and hand-pollination techniques for crops that cross-pollinate, ensuring seed purity.
5. Teach proper drying, testing (viability/germination tests), and storage methods with practical demonstrations.
6. Provide each participant with a seed-saving reference card they can take home and use independently.
7. Completion indicator: at least 3 workshops delivered covering all major crop categories, with participants successfully saving seeds independently.` },
        { title: 'Create a seed swap network connecting MTC with other community gardens and farms', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 6:141",
              arabic: "وَهُوَ الَّذِي أَنشَأَ جَنَّاتٍ مَّعْرُوشَاتٍ وَغَيْرَ مَعْرُوشَاتٍ وَالنَّخْلَ وَالزَّرْعَ مُخْتَلِفًا أُكُلُهُ",
              translation: "And He it is who produces gardens, trellised and untrellised, and date-palms, and crops of different shape and taste.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 55:10-12",
              arabic: "وَالْأَرْضَ وَضَعَهَا لِلْأَنَامِ * فِيهَا فَاكِهَةٌ وَالنَّخْلُ ذَاتُ الْأَكْمَامِ",
              translation: "And the earth He laid down for all living creatures. Therein are fruits, and date-palms with sheathed clusters.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 1553a",
              translation: "The Prophet (peace be upon him) said: \"There is no Muslim who plants a tree or sows seeds, and then a bird, or a person, or an animal eats from it, except that it is regarded as a charitable gift for him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

No single garden can maintain the full diversity of varieties a region needs. A seed swap network distributes the preservation effort across multiple sites, reducing the risk of losing a variety to a single bad season. It also builds relationships between Muslim farming communities, creating an ummah-level network of food sovereignty.

**How?**

1. Identify other community gardens, Muslim farms, and urban agriculture projects within a reasonable distance (or connected digitally).
2. Reach out to introduce the MTC seed-saving programme and propose mutual seed exchanges.
3. Organise an annual seed swap event — either in person at a seasonal gathering or by mail for distant partners — where each participant brings labelled seed packets to share.
4. Establish a shared catalogue of what each partner grows and saves, so needs and offerings can be matched efficiently.
5. Create protocols for seed quality: only share seeds that have been properly processed, dried, tested for germination, and accurately labelled.
6. Document the network in a directory with contact information, specialties (which partner grows which varieties), and exchange history.
7. Completion indicator: at least 3 partner organisations identified, one seed swap event completed, and a shared catalogue established.` },
        { title: 'Document the seed-saving heritage programme for publication and replication', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 1631",
              translation: "The Prophet (peace be upon him) said: \"When a man dies, his deeds come to an end except for three: ongoing charity, beneficial knowledge, or a righteous child who prays for him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Documenting seed-saving heritage for publication preserves beneficial knowledge.",
            },
          ],
          description: `**Why?**

A well-documented seed-saving programme becomes a gift to the entire ummah — other communities can replicate it without starting from scratch. Documentation also creates institutional memory that survives volunteer turnover. A published seed-saving guide is beneficial knowledge that continues giving long after the individuals who wrote it have moved on.

**How?**

1. Compile all programme materials: seed library catalogue, cultural variety stories, workshop curricula, seed-saving reference cards, and network directory.
2. Write a programme guide structured for replication: introduction (why Islamic seed-saving matters), setup (how to start a seed library), operations (saving, cataloguing, lending), community building (workshops, swaps, heritage plots), and assessment (measuring success).
3. Include practical appendices: seed-saving technique sheets by crop, storage requirements chart, and template forms for cataloguing and lending.
4. Have the guide reviewed by experienced seed-savers and an Islamic educator to ensure accuracy on both fronts.
5. Publish in accessible formats: PDF for digital sharing, and a printed booklet for distribution at community events.
6. Share with partner organisations, Islamic centres, and agricultural education networks.
7. Completion indicator: a complete programme guide published in digital and print formats, shared with at least 5 organisations.` },
      ],
    },
    {
      title: 'Formalise the community shura assessment process for continuous seasonal improvement',
      priority: 'urgent', tags: ['shura', 'assessment', 'governance', 'feedback'],
      description: 'Develop a structured shura (consultation) process that goes beyond the annual autumn assessment to create ongoing feedback loops, transparent governance, and community-driven decision making. This process ensures the MTC programme is truly governed by its participants, not merely administered to them, fulfilling the Quranic mandate of "amruhum shura baynahum" (42:38).',
      subtasks: [
        { title: 'Design a multi-level shura structure with seasonal and ongoing consultation', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 42:38",
              arabic: "وَأَمْرُهُمْ شُورَىٰ بَيْنَهُمْ",
              translation: "And whose affair is determined by consultation among themselves.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 3:159",
              arabic: "فَبِمَا رَحْمَةٍ مِّنَ اللَّهِ لِنتَ لَهُمْ ۖ وَلَوْ كُنتَ فَظًّا غَلِيظَ الْقَلْبِ لَانفَضُّوا مِنْ حَوْلِكَ ۖ فَاعْفُ عَنْهُمْ وَاسْتَغْفِرْ لَهُمْ وَشَاوِرْهُمْ فِي الْأَمْرِ",
              translation: "So by mercy from Allah, you were lenient with them. And had you been rude and harsh in heart, they would have disbanded from about you. So pardon them and ask forgiveness for them and consult them in the matter.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 4948",
              translation: "The Prophet (peace be upon him) said: \"The one who is consulted is entrusted (with a trust).\"",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A single annual meeting is insufficient for genuine community governance. Issues arise throughout the year, and waiting months to address them breeds frustration and disengagement. A multi-level structure — regular check-ins, seasonal reviews, and the annual shura — ensures that small problems are caught early, medium decisions are made in season, and large strategic questions are addressed with full community input. This mirrors the Islamic governance principle where consultation operates at multiple scales, from household to community to ummah.


**How?**

1. Establish three levels of consultation: weekly informal check-ins (5-10 minutes at the end of work days for operational issues), mid-season reviews (1-2 hour structured sessions at the midpoint of each season), and the annual shura (half-day or full-day strategic gathering during Hisab).
2. Define what decisions belong at each level: daily operational adjustments at check-ins, programme modifications at mid-season reviews, and strategic direction at the annual shura.
3. Assign a shura facilitator (rotating quarterly) who is responsible for gathering agenda items, facilitating discussions, and documenting outcomes.
4. Create templates for each level: a quick-note form for check-ins, a structured agenda for mid-season reviews, and a comprehensive preparation packet for the annual shura.
5. Establish decision-making protocols: consensus for strategic decisions, majority for programme modifications, and team-lead discretion for daily operations.
6. Communicate the shura structure to all participants so they know when, how, and where to raise concerns.
7. Completion indicator: three-level shura structure documented, communicated to the community, and operational through at least one full season.` },
        { title: 'Develop feedback collection tools accessible to all community members', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 42:38",
              arabic: "وَأَمْرُهُمْ شُورَىٰ بَيْنَهُمْ",
              translation: "And whose affair is determined by consultation among themselves.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 49:13",
              arabic: "يَا أَيُّهَا النَّاسُ إِنَّا خَلَقْنَاكُم مِّن ذَكَرٍ وَأُنثَىٰ وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا",
              translation: "O mankind, We created you from a male and a female and made you into nations and tribes, that you may know one another.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2564",
              translation: "The Prophet (peace be upon him) said: \"None of you truly believes until he loves for his brother what he loves for himself.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Not everyone speaks up in group settings. Some community members are shy, some have language barriers, some have schedules that prevent attendance at gatherings. If the shura process only captures the voices of those who show up and speak loudly, it fails the Quranic standard. Accessible feedback tools ensure that quieter voices, newer members, and those with constraints can still contribute their perspective. True consultation means hearing from the full community, not just its most vocal members.


**How?**

1. Create a physical suggestion box at the site — simple, visible, and anonymous — checked weekly by the shura facilitator.
2. Set up a digital feedback form (simple, mobile-friendly) that participants can access anytime with a QR code posted at the site and sent via community channels.
3. Offer one-on-one check-in conversations for members who prefer verbal communication — schedule these quarterly with each active participant.
4. Provide feedback tools in all languages represented in the community — translate forms and designate bilingual volunteers as communication bridges.
5. Create a visual feedback board (smiley faces, stickers, simple ratings) for children and less literate participants.
6. Review all feedback channels weekly and compile themes for the shura facilitator to bring to the appropriate consultation level.
7. Completion indicator: at least three feedback channels operational (physical, digital, verbal) with regular review and theme compilation documented.` },
        { title: 'Create transparent reporting of shura decisions and their implementation', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 42:38",
              arabic: "وَأَمْرُهُمْ شُورَىٰ بَيْنَهُمْ",
              translation: "And whose affair is [determined by] consultation among themselves. Transparent reporting of shura decisions is a requirement of genuine consultation.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Consultation without follow-through is worse than no consultation at all — it raises expectations and then betrays them. When the community gives input and never sees results, trust erodes and participation drops. Transparent reporting closes the loop: every decision made in shura is documented, assigned an owner, given a timeline, and reported on publicly. This is amanah in governance — the community entrusted their input, and the leadership must account for what was done with it.


**How?**

1. After every shura session (at any level), publish a brief summary within 48 hours: what was discussed, what was decided, who is responsible, and by when.
2. Post summaries in the physical notice board at the site and through digital community channels.
3. Create a "Decision Tracker" — a living document that lists every decision, its status (pending, in progress, completed, deferred), and any updates.
4. Review the Decision Tracker at the opening of every mid-season review and annual shura — report on what was accomplished and explain what was not.
5. When a decision cannot be implemented as planned, communicate the reason honestly and invite the community to adjust.
6. Celebrate completed decisions visibly — "You asked for better shade at the prayer area, and it is now installed."
7. Completion indicator: decision summaries published after every shura session, Decision Tracker maintained and reviewed at every mid-season review.` },
        { title: 'Establish a conflict resolution process rooted in Islamic principles', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 8:7",
              arabic: "وَإِذْ يَعِدُكُمُ اللَّهُ إِحْدَى الطَّائِفَتَيْنِ أَنَّهَا لَكُمْ وَتَوَدُّونَ أَنَّ غَيْرَ ذَاتِ الشَّوْكَةِ تَكُونُ لَكُمْ وَيُرِيدُ اللَّهُ أَن يُحِقَّ الْحَقَّ بِكَلِمَاتِهِ وَيَقْطَعَ دَابِرَ الْكَافِرِينَ",
              translation: "Remember how God promised you [believers] that one of the two enemy groups would fall to you: you wanted the unarmed group to be yours, but it was God's will to establish the truth according to His Word and to finish off the disbelievers.",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              rationale: "Allah's priority in establishing the truth through His own means — conflict resolution rooted in Islamic principles mirrors this: truth and justice, not convenience, must govern",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 3587",
              translation: "Narrated Abu Huraira:The Prophet (ﷺ) said, \"The Hour will not be established till you fight a nation wearing hairy shoes, and till you fight the Turks, who will have small eyes, red faces and flat noses; and their faces will be like flat shields. And you will find that the best people are those who hate responsibility of ruling most of all till they are chosen to be the rulers. And the people are of different natures: The best in the pre-Islamic period are the best in Islam. A time will come when any of you will love to see me rather than to have his family and property doubled",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 3588",
              translation: "Narrated Abu Huraira:The Prophet (ﷺ) said, \"The Hour will not be established till you fight a nation wearing hairy shoes, and till you fight the Turks, who will have small eyes, red faces and flat noses; and their faces will be like flat shields. And you will find that the best people are those who hate responsibility of ruling most of all till they are chosen to be the rulers. And the people are of different natures: The best in the pre-Islamic period are the best in Islam. A time will come when any of you will love to see me rather than to have his family and property doubled",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 3589",
              translation: "Narrated Abu Huraira:The Prophet (ﷺ) said, \"The Hour will not be established till you fight a nation wearing hairy shoes, and till you fight the Turks, who will have small eyes, red faces and flat noses; and their faces will be like flat shields. And you will find that the best people are those who hate responsibility of ruling most of all till they are chosen to be the rulers. And the people are of different natures: The best in the pre-Islamic period are the best in Islam. A time will come when any of you will love to see me rather than to have his family and property doubled",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Where people work together, disagreements arise — over resource allocation, programme direction, personal conflicts, or unmet expectations. Without a structured resolution process, conflicts fester, volunteers leave, and community cohesion fractures. Islam provides a clear framework for dispute resolution: direct conversation first (nasihah), then mediation (islah), then community arbitration. Embedding this framework into the programme's governance ensures conflicts are addressed with adab (propriety) and justice rather than avoidance or escalation.


**How?**

1. Document a three-step conflict resolution process: (a) Direct conversation between parties with mutual respect and benefit of the doubt (husn al-dhann), (b) Mediation by a neutral community member trained in Islamic conflict resolution, (c) Arbitration by a panel of 3 respected community members whose decision is binding.
2. Identify and train 3-4 mediators from the community — people known for wisdom, fairness, and discretion.
3. Establish confidentiality protocols: conflict details are shared only on a need-to-know basis, and resolution outcomes are communicated without identifying parties unless necessary.
4. Create a simple reporting mechanism for raising concerns: verbal, written, or through the shura facilitator.
5. Integrate a "community health" check into the mid-season review to surface tensions before they escalate.
6. Educate the full community on the resolution process during orientation so everyone knows it exists and how to access it.
7. Completion indicator: conflict resolution process documented, mediators trained, and the process communicated to all community members.` },
        { title: 'Evaluate shura process effectiveness and refine annually', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 59:18",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللَّهَ وَلْتَنظُرْ نَفْسٌ مَّا قَدَّمَتْ لِغَدٍ",
              translation: "O you who have believed, fear Allah. And let every soul look to what it has put forth for tomorrow. Annual evaluation of the shura process is this forward-looking accountability in practice.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A shura process that never examines itself risks becoming performative — going through the motions of consultation without achieving genuine community governance. Annual evaluation asks hard questions: Are we hearing from everyone? Are decisions actually being implemented? Do participants feel heard? The Islamic principle of muhasabah (self-accounting) applies to institutions just as it does to individuals. A community that honestly assesses its governance practices models the accountability it asks of its members.


**How?**

1. Design an annual shura evaluation survey covering: participation breadth (who is contributing?), satisfaction with process (do people feel heard?), decision implementation rate (what percentage of decisions were completed?), and suggestions for improvement.
2. Distribute the survey to all community members, not just shura attendees — non-attendees' reasons for absence are valuable data.
3. Analyse participation demographics: are women, youth, newcomers, and non-English speakers adequately represented? If not, identify barriers.
4. Review the Decision Tracker's completion rate and identify patterns in delayed or abandoned decisions.
5. Present evaluation findings at the annual shura and facilitate a discussion on process improvements.
6. Implement at least 2 concrete improvements to the shura process each year based on evaluation findings.
7. Completion indicator: annual evaluation survey distributed, analysed, and findings presented with 2+ process improvements adopted.` },
      ],
    },
    {
      title: 'Build a seasonal volunteer coordination system with clear pathways and recognition',
      priority: 'urgent', tags: ['volunteers', 'coordination', 'onboarding', 'recognition'],
      description: 'Create a structured volunteer management system that recruits, onboards, schedules, supports, and recognises volunteers across all four seasons. Volunteers are the lifeblood of MTC — without them, no seed gets planted and no guest gets fed. A well-designed system treats volunteers as valued community members with their own growth journey, not as disposable labour.',
      subtasks: [
        { title: 'Design a volunteer onboarding process that communicates vision and expectations', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (peace be upon him) said: \"Allah, His angels, and the inhabitants of the heavens and earth, even the ant in its hole and the fish, send blessings upon the one who teaches people good.\" A clear volunteer onboarding process teaches people how to do good.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Volunteers who arrive without understanding the programme's Islamic vision and practical expectations either disengage quickly or cause friction with established participants. Proper onboarding transforms a stranger into a community member by communicating what MTC is (a faith-rooted seasonal programme), what it expects (consistency, Islamic etiquette, teamwork), and what it offers (skill development, spiritual growth, community belonging).

**How?**

1. Create a volunteer welcome packet covering: MTC mission and values, the four-season framework, site map and safety information, daily schedule including salah times, expected conduct (adab), and a FAQ.
2. Design a 2-hour onboarding session that includes: a site tour, introduction to current season activities, hands-on participation in a simple task, and a shared meal or chai.
3. Pair every new volunteer with a "buddy" — an experienced participant who answers questions and provides support for the first month.
4. Collect a simple volunteer registration form: contact details, available days, skills or interests, and any needs (accessibility, language, childcare).
5. Schedule onboarding sessions at regular intervals (monthly or at season transitions) rather than ad hoc, to batch the effort and build cohorts.
6. Follow up with every new volunteer after their first week to check in and address any concerns.
7. Completion indicator: onboarding materials created, at least two onboarding sessions conducted, and buddy system operational with documented pairings.` },
        { title: 'Create a flexible scheduling system that respects volunteer capacity', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:286",
              arabic: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا",
              translation: "Allah does not burden a soul beyond that it can bear. Flexible scheduling that respects volunteer capacity reflects this divine principle.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Volunteers are giving their time freely — demanding rigid schedules drives away the very people the programme needs. A flexible system that allows volunteers to choose shifts, swap easily, and adjust their commitment seasonally retains volunteers far longer than one that treats them like employees. The Islamic principle of la yukallifu Allahu nafsan illa wus'aha (2:286 — Allah does not burden a soul beyond its capacity) applies to volunteer management: respect people's real capacity and they will give generously; overburden them and they will disappear.


**How?**

1. Create a weekly shift calendar with defined time blocks (morning, midday, afternoon) and task types (gardening, hospitality, education, administration).
2. Allow volunteers to sign up for shifts through a shared digital calendar or sign-up sheet posted at the site.
3. Build in flexibility: volunteers commit to a minimum of 2 shifts per month but can adjust week by week based on their schedule.
4. Enable shift swaps: when a volunteer cannot make their shift, they can post it for another volunteer to claim.
5. Track attendance without punishing absences — life happens, and a culture of guilt undermines the voluntary spirit.
6. Adjust seasonal expectations: summer may need more hands, winter fewer — communicate this clearly so volunteers can plan.
7. Completion indicator: scheduling system operational with at least one month of usage data showing sign-ups, attendance, and swap activity.` },
        { title: 'Develop skill-building pathways for volunteers across seasons', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (peace be upon him) said: \"Whoever follows a path in pursuit of knowledge, Allah will make easy for him a path to Paradise.\" Skill-building pathways for volunteers are paths of knowledge that lead to both worldly and spiritual growth.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Volunteers who only do repetitive unskilled tasks lose motivation over time. Skill-building pathways give volunteers a growth trajectory — from weeding to composting to crop planning to teaching — that develops their capacity and deepens their commitment. This mirrors the Islamic concept of ihsan (excellence): not just showing up but growing in mastery. When volunteers see themselves developing real skills, they transition from helpers to leaders, building the programme's internal capacity and their own personal development.


**How?**

1. Map the skills needed across the programme: gardening (basic to advanced), food preservation, hospitality service, children's education facilitation, event coordination, and programme administration.
2. Define 3 levels for each skill area: beginner (learning), practitioner (competent), and mentor (can teach others).
3. Create learning opportunities for progression: pair beginners with mentors during regular shifts, offer seasonal workshops for specific skills, and assign practitioner-level tasks that stretch ability.
4. Track each volunteer's skills and interests in their profile — ask during onboarding and update annually.
5. Create "stretch assignments" each season that give ready volunteers a chance to try a new role with support.
6. Recognise skill progression publicly — when a volunteer moves from beginner to practitioner, acknowledge it at a community gathering.
7. Completion indicator: skill pathway document created with at least 5 skill areas mapped, volunteer profiles updated, and at least 3 volunteers progressed to a new level.` },
        { title: 'Implement a volunteer recognition programme that honours contribution', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6026",
              translation: "The Prophet (peace be upon him) said: \"He who does not thank people does not thank Allah.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "A volunteer recognition programme embodies this principle of gratitude.",
            },
          ],
          description: `**Why?**

 Volunteers who feel unseen and unappreciated eventually stop coming. Recognition does not require expensive gifts — it requires sincere acknowledgment of effort and impact. A structured recognition programme ensures that appreciation is consistent and reaches every volunteer, not just the most visible ones. It also models the Islamic value of shukr (gratitude) at the community level.

**How?**

1. Establish regular, informal appreciation practices: thank every volunteer personally at the end of each shift, mention specific contributions (not generic "thanks for helping").
2. Create seasonal recognition moments at transition gatherings: acknowledge each volunteer's contribution that season with a brief public mention.
3. Design an annual "Khalifah Award" for the volunteer who most embodied stewardship, nominated by peers and selected by community vote.
4. Send personal thank-you messages (handwritten cards or thoughtful digital messages) at the end of each season to every active volunteer.
5. Offer tangible tokens of appreciation: a share of the harvest, seeds from the seed library, a jar of preserved food, or a plant from the nursery.
6. Feature volunteer stories in community communications — highlight what brought them to the programme and what they have gained.
7. Completion indicator: recognition practices active at all levels (shift, season, annual), Khalifah Award established, and at least one cycle of seasonal thank-you messages sent.` },
        { title: 'Measure volunteer retention and satisfaction to improve the experience', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 16:97",
              arabic: "مَنْ عَمِلَ صَالِحًا مِّن ذَكَرٍ أَوْ أُنثَىٰ وَهُوَ مُؤْمِنٌ فَلَنُحْيِيَنَّهُ حَيَاةً طَيِّبَةً وَلَنَجْزِيَنَّهُمْ أَجْرَهُم بِأَحْسَنِ مَا كَانُوا يَعْمَلُونَ",
              translation: "Whoever does righteousness, whether male or female, while being a believer — We will surely cause them to live a good life, and We will surely give them their reward according to the best of what they used to do.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 9:105",
              arabic: "وَقُلِ اعْمَلُوا فَسَيَرَى اللَّهُ عَمَلَكُمْ وَرَسُولُهُ وَالْمُؤْمِنُونَ",
              translation: "And say: Work, for Allah will see your work, and so will His Messenger and the believers.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1903",
              translation: "The Prophet (peace be upon him) said: \"Allah does not look at your appearances or your wealth, but He looks at your hearts and your deeds.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

High volunteer turnover is expensive in time, training, and community cohesion. Measuring retention and satisfaction reveals whether the programme is truly serving its volunteers or silently driving them away. Satisfaction surveys uncover issues that volunteers may not raise directly — schedule conflicts, feeling undervalued, lack of skill development, or social exclusion. Without this data, the programme operates on assumptions rather than reality, and fixable problems remain invisible until volunteers simply stop showing up.


**How?**

1. Track volunteer retention data: how many volunteers active at the start of each season are still active at the end? What is the average length of service?
2. Distribute a brief seasonal satisfaction survey (anonymous, 5-7 questions): Do you feel valued? Are you learning new skills? Is the schedule working for you? Would you recommend volunteering here? What would you change?
3. Conduct exit conversations with volunteers who leave — understanding why they stopped is as valuable as understanding why others stay.
4. Analyse data by demographic: are certain groups (youth, parents, newcomers) leaving at higher rates? If so, investigate why.
5. Present findings to the shura and develop targeted interventions for identified issues.
6. Set retention targets and track progress year over year.
7. Completion indicator: retention data tracked for at least one full season, satisfaction survey distributed and analysed, and at least 2 improvement actions implemented based on findings.` },
      ],
    },
  ],

  // ── EXCELLENCE — Full four-season model, year-round pathway, national experiences, distribution network, publication ──
  moontrance_seasonal_excellence: [
    {
      title: 'Package the full four-season model as a replicable framework for other communities',
      priority: 'urgent', tags: ['replication', 'framework', 'documentation', 'scaling'],
      description: 'Transform the MTC four-season model from a single-site operation into a documented, tested, and shareable framework that any Muslim community can adapt to their local conditions. This is the highest expression of sadaqah jariyah through agricultural knowledge — a system that multiplies itself across the ummah.',
      subtasks: [
        { title: 'Audit the current model to identify what is universal and what is site-specific', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 5:2",
              arabic: "وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ وَلَا تَعَاوَنُوا عَلَى الْإِثْمِ وَالْعُدْوَانِ",
              translation: "And cooperate in righteousness and piety, but do not cooperate in sin and aggression. Auditing the model for replicability enables wider cooperation in goodness.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A replicable model must distinguish between principles (universal) and practices (site-specific). The four-season spiritual framework applies everywhere, but planting dates, crop varieties, and gathering sizes vary by location. Without this audit, communities that adopt the model will struggle with inapplicable specifics or, worse, skip the spiritual foundations that make MTC distinct. The Quran describes universal signs in creation (6:99) while acknowledging that "every land has its own produce" — the framework must honour both dimensions.


**How?**

1. List every component of the current MTC model: seasonal calendar, spiritual themes, crop plan, daily salah structure, hospitality programme, tarbiyah curriculum, seed library, shura process, and volunteer system.
2. Classify each component as: (a) universal principle — applies anywhere (e.g., "anchor every season with congregational salah"), (b) adaptable template — structure is transferable but content changes (e.g., "crop plan matched to local growing zone"), or (c) site-specific detail — unique to this location (e.g., "irrigation from the east well").
3. For adaptable templates, identify which variables need local customisation and provide guidance on how to determine them.
4. For site-specific details, note them as examples rather than prescriptions.
5. Validate the classification by asking: "Could a community in a different climate, with different demographics, implement this component with the guidance provided?"
6. Revise any component where the answer is no, adding the flexibility or guidance needed.
7. Completion indicator: a complete component audit with universal/adaptable/site-specific classifications and customisation guidance for all adaptable templates.` },
        { title: 'Write the Seasonal Framework Guide for external audiences', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 1631",
              translation: "The Prophet (peace be upon him) said: \"When a man dies, his deeds come to an end except for three: ongoing charity, beneficial knowledge, or a righteous child who prays for him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Writing a framework guide for external audiences is the dissemination of beneficial knowledge.",
            },
          ],
          description: `**Why?**

The framework guide is the primary vehicle for sharing the MTC model. It must be comprehensive enough to enable implementation without hand-holding, yet accessible enough that a community leader with no farming experience can begin. A poorly written guide wastes the community's accumulated wisdom; an excellent one multiplies it.

**How?**

1. Structure the guide in logical sections: Vision and Values (why MTC exists), The Four Seasons (spiritual and agricultural framework), Getting Started (site assessment, community mobilisation, first-season planning), Season-by-Season Operations (Ghars, Ri'ayah, Hisab, Sukun), Community Programmes (hospitality, tarbiyah, seed heritage, shura), and Sustainability (volunteers, finances, measurement).
2. Write each section with a consistent format: Islamic foundation (ayat, hadith, principle), practical guidance (step-by-step), templates and tools (forms, checklists, calendars), and local adaptation notes.
3. Include real examples from the MTC site — not as prescriptions but as illustrations of the framework in action.
4. Add a "Quick Start" section for communities who want to begin with one season (Ghars) and expand gradually.
5. Have the guide reviewed by at least 3 external readers: an Islamic educator, an experienced farmer, and a community organiser.
6. Design the guide for both print and digital distribution with clear layout, section navigation, and printable templates.
7. Completion indicator: framework guide written, reviewed by 3 external readers, revised based on feedback, and published in print and digital formats.` },
        { title: 'Pilot the framework with at least two external communities and refine based on their experience', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 5:2",
              arabic: "وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ",
              translation: "And cooperate in righteousness and piety.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 3:110",
              arabic: "كُنتُمْ خَيْرَ أُمَّةٍ أُخْرِجَتْ لِلنَّاسِ",
              translation: "You are the best nation produced for mankind.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2674",
              translation: "The Prophet (peace be upon him) said: \"Whoever establishes a good practice in Islam will have its reward and the reward of all who act upon it after him, without that diminishing their rewards in the slightest.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A framework is only proven replicable when someone else successfully replicates it. Piloting with external communities reveals assumptions invisible from the inside — terminology that does not resonate, steps that seem obvious locally but confuse outsiders, and resources assumed available but actually scarce. Pilot communities also become the first nodes in a growing network of faith-rooted seasonal programmes, and their success stories become the most powerful recruitment tool for wider adoption.


**How?**

1. Identify 2-3 potential pilot communities through existing networks: Islamic centres with land access, Muslim community gardens, or faith-based agricultural initiatives.
2. Share the framework guide with pilot community leaders and conduct an introductory workshop (in person or virtual) walking through the model.
3. Assign a MTC mentor to each pilot community for their first season — someone available for monthly calls and responsive to questions.
4. Ask pilots to document their adaptation process: what they changed, what challenges arose, what worked immediately, and what the guide failed to address.
5. Visit each pilot site at least once during their first season (or conduct a thorough virtual walkthrough) to observe and advise.
6. Collect systematic feedback at the end of the pilot season: a structured debrief covering every section of the framework guide.
7. Completion indicator: at least 2 pilot communities have completed one season using the framework, provided detailed feedback, and the guide has been revised based on their experience.` },
        { title: 'Create a digital resource hub for communities implementing the framework', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:104",
              arabic: "وَلْتَكُن مِّنكُمْ أُمَّةٌ يَدْعُونَ إِلَى الْخَيْرِ وَيَأْمُرُونَ بِالْمَعْرُوفِ وَيَنْهَوْنَ عَنِ الْمُنكَرِ",
              translation: "And let there be [arising] from you a nation inviting to [all that is] good, enjoining what is right and forbidding what is wrong. A digital resource hub enables this invitation at scale.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A printed guide is a starting point, but communities need ongoing access to templates, video tutorials, seasonal updates, and peer support. A digital hub provides all of this in a single accessible location, reducing the barrier to implementation and creating a living resource that improves over time. The Islamic concept of waqf (endowment) applies: a digital resource hub is an endowment of knowledge that serves communities continuously without depletion, growing more valuable as more communities contribute their experience.


**How?**

1. Build a simple, mobile-friendly website or shared platform (Google Drive, Notion, or a dedicated site) organised by the framework's sections.
2. Upload all templates, checklists, and forms as downloadable, editable documents.
3. Create short video tutorials for key skills: seed-saving techniques, soil testing, compost building, halaqah facilitation, and shura process walkthrough.
4. Establish a discussion forum or group channel where implementing communities can ask questions, share experiences, and support each other.
5. Maintain a "Success Stories" section featuring pilot communities and their adaptations.
6. Assign a content maintainer who updates resources based on feedback, adds new materials as the framework evolves, and moderates community discussions.
7. Completion indicator: digital hub live with core framework materials, at least 5 downloadable templates, 3 video tutorials, and an active community channel.` },
        { title: 'Establish quality standards for communities using the Seasonal name', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 17:36",
              arabic: "وَلَا تَقْفُ مَا لَيْسَ لَكَ بِهِ عِلْمٌ",
              translation: "And do not pursue that of which you have no knowledge. Establishing quality standards ensures communities using the MTC name do so with verified knowledge and integrity.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

As the framework spreads, quality control becomes essential. A community that uses the MTC name but strips out the Islamic spiritual framework, neglects food safety, or mistreats volunteers damages the reputation of every community in the network. Quality standards protect both the brand and the mission — they ensure that "Seasonal" consistently means a faith-rooted, well-managed, community-serving programme. This is not gatekeeping but guardianship (ri'ayah) of a shared trust.


**How?**

1. Define non-negotiable standards that every Seasonal programme must meet: (a) daily congregational salah anchors every season, (b) Quranic and Prophetic themes are integrated into all programming, (c) shura process is active and documented, (d) food safety protocols are followed, and (e) volunteers are onboarded and recognised.
2. Define recommended practices that are strongly encouraged but adaptable: hospitality programme, children's tarbiyah, seed library, and formal volunteer pathways.
3. Create a simple self-assessment checklist that communities can use annually to evaluate their adherence to standards.
4. Establish a peer review process: communities in the network visit or virtually review each other annually, offering constructive feedback.
5. Design a recognition system: communities meeting all non-negotiable standards receive a "Seasonal Certified" designation.
6. Handle non-compliance with compassion and support — the goal is to help communities meet standards, not to exclude them.
7. Completion indicator: quality standards document published, self-assessment checklist created, and peer review process piloted with at least 2 communities.` },
      ],
    },
    {
      title: 'Design a year-round engagement pathway from first-time visitor to resident steward',
      priority: 'urgent', tags: ['engagement', 'pathway', 'visitor', 'resident', 'retention'],
      description: 'Create a structured journey that guides individuals from their first encounter with MTC through deepening levels of involvement until they become resident stewards who carry the programme forward. This pathway ensures the community grows not just in numbers but in depth of commitment, skill, and spiritual connection to the land.',
      subtasks: [
        { title: 'Map the engagement stages from visitor to resident steward', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:13",
              arabic: "يَا أَيُّهَا النَّاسُ إِنَّا خَلَقْنَاكُم مِّن ذَكَرٍ وَأُنثَىٰ وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا",
              translation: "O mankind, indeed We have created you from male and female and made you peoples and tribes that you may know one another. Mapping engagement stages facilitates progressive ta'aruf (mutual knowing).",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Without a mapped pathway, engagement is random — some visitors return, most do not, and the reasons are unknown. Mapping stages makes the journey intentional: each level of involvement has clear expectations, clear benefits, and a clear invitation to the next level. The Quran describes iman (faith) as something that increases with experience and knowledge (8:2) — the engagement pathway applies this principle to community participation, creating a graduated journey of deepening commitment.


**How?**

1. Define 5 engagement stages: (a) Visitor — attends one event or tour, (b) Participant — joins seasonal activities regularly, (c) Volunteer — commits to regular shifts and training, (d) Leader — takes responsibility for a programme area, and (e) Resident Steward — lives the MTC mission year-round, mentors others, and shapes programme direction.
2. For each stage, define: what the person does (activities and commitments), what they receive (skills, community, spiritual growth), and what signals readiness for the next stage.
3. Create a visual pathway map that participants can see and aspire to — display it at the site and in the welcome packet.
4. Design transition points between stages: a conversation with a leader, a seasonal review, or a formal invitation.
5. Ensure the pathway is accessible — people enter at different points based on their readiness, and progression is self-paced.
6. Avoid exclusionary language — every stage is valued, and remaining at any stage is honourable.
7. Completion indicator: engagement pathway mapped with 5 stages, visualised, and communicated to the community.` },
        { title: 'Build welcome and follow-up systems for each stage of engagement', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:13",
              arabic: "يَا أَيُّهَا النَّاسُ إِنَّا خَلَقْنَاكُم مِّن ذَكَرٍ وَأُنثَىٰ وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا",
              translation: "O mankind, We created you from a male and a female and made you into nations and tribes, that you may know one another.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 15:46",
              arabic: "ادْخُلُوهَا بِسَلَامٍ آمِنِينَ",
              translation: "Enter therein in peace and safety.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6018",
              translation: "The Prophet (peace be upon him) said: \"Whoever believes in Allah and the Last Day, let him be generous to his guest.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

People fall through the cracks between stages. A visitor who enjoyed the iftar but received no follow-up never returns. A volunteer ready to lead but never invited stays stuck. Welcome and follow-up systems close these gaps, ensuring every person at every stage feels seen and invited forward. The Prophet (peace be upon him) noticed individuals in crowds, called people by name, and checked on those who were absent — this personal attention at scale is what the follow-up system replicates.


**How?**

1. For Visitors: send a thank-you message within 48 hours of their visit, including a summary of what they experienced and an invitation to the next event.
2. For Participants: check in monthly, share upcoming seasonal activities, and invite them to a volunteer orientation when they have attended 3+ events.
3. For Volunteers: assign a buddy, schedule quarterly skill-development conversations, and observe readiness signals for leadership.
4. For Leaders: provide mentorship from a senior leader, include in planning conversations, and invite to the annual shura as a contributor (not just attendee).
5. For Resident Stewards: invite to the programme's governance circle, offer teaching and mentorship roles, and recognise their commitment publicly.
6. Automate what can be automated (follow-up emails, event reminders) and personalise what must be personal (stage-transition conversations, mentorship pairings).
7. Completion indicator: follow-up workflows documented and operational for all 5 stages, with at least one complete cycle (visitor through to volunteer invitation) tracked and completed.` },
        { title: 'Create mentorship pairings that accelerate growth along the pathway', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (peace be upon him) said: \"Whoever follows a path in pursuit of knowledge, Allah will make easy for him a path to Paradise.\" Mentorship pairings accelerate growth along the path.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Mentorship is the most effective accelerator of personal and spiritual growth. The Prophetic model was fundamentally mentorship-based — the companions learned by being in the presence of the Prophet (peace be upon him), watching, asking, and practising. At MTC, pairing experienced stewards with newer participants creates personal relationships that transmit not just skills but values, etiquette, and the intangible culture of the programme. People join programmes for the mission but stay for the relationships.


**How?**

1. Identify potential mentors: Leaders and Resident Stewards who have the capacity and temperament to guide others.
2. Train mentors in basic mentorship skills: active listening, asking questions rather than lecturing, being available without being overbearing, and modelling Islamic values in daily interactions.
3. Match mentors with mentees based on complementary skills, shared interests, and practical compatibility (schedule, language, location).
4. Define the mentorship structure: monthly one-on-one conversations, shared work shifts, and a seasonal reflection on growth and goals.
5. Provide mentors with a simple guide: suggested conversation topics, milestones to watch for, and when to recommend a mentee for stage progression.
6. Review mentorship pairings each season and adjust as needed — not every pairing works, and that is normal.
7. Completion indicator: at least 5 mentorship pairings active with documented monthly conversations and at least 1 mentee progressing to a new engagement stage.` },
        { title: 'Design a Resident Steward programme with year-round responsibilities and benefits', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:30",
              arabic: "إِنِّي جَاعِلٌ فِي الْأَرْضِ خَلِيفَةً",
              translation: "Indeed, I will make upon the earth a successive authority (khalifah).",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 33:72",
              arabic: "إِنَّا عَرَضْنَا الْأَمَانَةَ عَلَى السَّمَاوَاتِ وَالْأَرْضِ وَالْجِبَالِ",
              translation: "Indeed, We offered the trust to the heavens and the earth and the mountains.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 1631",
              translation: "The Prophet (peace be upon him) said: \"When a person dies, his deeds come to an end except for three: ongoing charity, beneficial knowledge, or a righteous child who prays for him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Resident Stewards are the backbone of MTC — they carry institutional knowledge, maintain relationships across seasons, and ensure continuity when seasonal participants cycle in and out. Without a formal programme, the most committed people burn out from undefined expectations or drift away when their contribution is taken for granted. A structured Resident Steward programme honours their commitment with clear responsibilities, meaningful benefits, and genuine authority in programme governance.


**How?**

1. Define Resident Steward responsibilities: year-round presence (minimum hours per season), mentorship of at least one participant, leadership of at least one programme area, participation in governance (shura), and contribution to the annual plan.
2. Define Resident Steward benefits: priority access to harvest, dedicated growing space (personal plot within the community garden), skills training opportunities, participation in the programme governance circle, and public recognition as programme leaders.
3. Establish selection criteria: minimum tenure (e.g., 2 full seasonal cycles as a volunteer or leader), demonstrated commitment, community endorsement, and alignment with programme values.
4. Create an invitation process: nomination by current Stewards or self-nomination, reviewed by the governance circle, with a welcoming ceremony at a seasonal transition.
5. Design a yearly Steward retreat: a dedicated day for deep planning, relationship building, and spiritual renewal among the core team.
6. Set a sustainable maximum number of Stewards relative to programme size to ensure the role remains meaningful and manageable.
7. Completion indicator: Resident Steward programme documented with responsibilities, benefits, selection criteria, and at least 3 founding Stewards formally recognised.` },
        { title: 'Measure pathway effectiveness and adjust based on progression data', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 59:18",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللَّهَ وَلْتَنظُرْ نَفْسٌ مَّا قَدَّمَتْ لِغَدٍ",
              translation: "O you who have believed, fear Allah. And let every soul look to what it has put forth for tomorrow. Measuring pathway effectiveness is this forward-looking accountability applied to community engagement.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

An engagement pathway on paper is meaningless if people are not actually progressing through it. Measuring where people are, where they get stuck, and where they drop off reveals the pathway's real strengths and weaknesses. This data-driven approach prevents the programme from congratulating itself on a beautiful framework while participants quietly disengage. The Islamic principle of hisab demands honest accounting of community health, not just community activity.


**How?**

1. Maintain a community roster that tracks each individual's current engagement stage and dates of transition.
2. Calculate progression metrics quarterly: what percentage of visitors become participants? Participants to volunteers? Volunteers to leaders?
3. Identify drop-off points: if 80% of visitors never return, the follow-up system needs work; if volunteers rarely become leaders, the pathway between those stages needs examination.
4. Conduct brief interviews with people at each stage: what is keeping them engaged? What would help them go deeper? What almost made them leave?
5. Compare progression rates across demographics: are certain groups (youth, women, newcomers) progressing at different rates? If so, why?
6. Present findings at the annual shura and implement targeted improvements for the weakest stage transitions.
7. Completion indicator: community roster maintained with stage tracking, quarterly progression metrics calculated, and at least 2 pathway improvements implemented based on data.` },
      ],
    },
    {
      title: 'Develop national-level faith-designed seasonal experiences that attract wide participation',
      priority: 'urgent', tags: ['national', 'events', 'faith-designed', 'scaling'],
      description: 'Create signature seasonal experiences of such quality and spiritual depth that they attract participants from beyond the local community, establishing MTC as a national model for faith-rooted agricultural engagement. These experiences are not merely scaled-up local events but carefully designed encounters that demonstrate what is possible when Islamic values and land stewardship are fully integrated.',
      subtasks: [
        { title: 'Design a signature spring planting retreat that draws regional participation', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 22:27-28",
              arabic: "وَأَذِّن فِي النَّاسِ بِالْحَجِّ يَأْتُوكَ رِجَالًا وَعَلَىٰ كُلِّ ضَامِرٍ يَأْتِينَ مِن كُلِّ فَجٍّ عَمِيقٍ لِّيَشْهَدُوا مَنَافِعَ لَهُمْ",
              translation: "And proclaim to the people the Hajj; they will come to you on foot and on every lean camel from every distant pass, that they may witness benefits for themselves. A planting retreat that draws regional participation echoes this gathering spirit.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A signature event establishes MTC's identity and draws attention from beyond the local community. A spring planting retreat — combining hands-in-soil work with Islamic learning, communal worship, and fellowship — offers something unavailable in conventional agriculture or conventional Islamic programming. It demonstrates the integrated vision in a concentrated, immersive format. The Prophet (peace be upon him) made the annual Hajj a gathering point for the ummah; seasonal retreats can serve a similar unifying function at a regional scale.


**How?**

1. Design a 2-day weekend retreat format: Day 1 — arrival, site tour, Quranic reflection on creation, communal planting session, evening programme (nasheed, storytelling, star-gazing with tafakkur). Day 2 — Fajr in jama'ah, morning planting session, seed-saving workshop, closing shura, and departure.
2. Set capacity at 40-60 participants to maintain intimacy while achieving regional draw — not so large that the experience becomes impersonal.
3. Develop marketing materials that communicate the unique offering: "Plant a tree that outlasts you. Break bread from the earth. Pray where the seeds sleep."
4. Partner with regional Islamic centres, MSAs (Muslim Student Associations), and community organisations to reach beyond the local network.
5. Price the retreat to be accessible: cover costs through a combination of registration fees (sliding scale), sponsorships, and community fundraising.
6. Arrange accommodation: camping on-site (weather permitting), billeting with local families, or nearby affordable lodging options.
7. Completion indicator: retreat programme designed, marketed through at least 5 regional partners, fully registered, and successfully executed with participant evaluations collected.` },
        { title: 'Create an autumn harvest festival that showcases the full-cycle model', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 6:141",
              arabic: "كُلُوا مِن ثَمَرِهِ إِذَا أَثْمَرَ وَآتُوا حَقَّهُ يَوْمَ حَصَادِهِ",
              translation: "Eat of its fruit when it yields and give its [due] right on the day of its harvest. An autumn harvest festival showcases this complete cycle from planting to giving.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The autumn harvest is the most visually compelling and emotionally satisfying moment of the agricultural year — tables overflowing with produce, seed packets neatly labelled, preserved jars gleaming, and a community gathered in gratitude. A harvest festival open to the public is the single best demonstration of what MTC achieves. Visitors who see the full cycle's results — from seed to table to seed again — understand in one afternoon what no brochure can convey. This is da'wah through demonstration, the most powerful kind.


**How?**

1. Design a one-day harvest festival with stations: guided farm tours, pick-your-own areas, preservation demonstrations, seed library showcase, children's activities, and a farm-to-table meal.
2. Include an educational component: short talks on Islamic land ethics, the four-season model, and how other communities can start their own programme.
3. Set up a marketplace: sell surplus produce, preserved goods, seeds, and programme merchandise to generate revenue and visibility.
4. Invite local media, municipal officials, interfaith partners, and agricultural organisations to broaden the audience and build institutional relationships.
5. Coordinate logistics for a larger crowd than regular events: parking, signage, toilets, first aid, food handling permits, and volunteer staffing.
6. Promote widely through social media, local event listings, Islamic centre bulletins, and community organisation newsletters.
7. Completion indicator: harvest festival executed with at least 100 attendees (beyond regular community), media coverage, and documented revenue and feedback.` },
        { title: 'Develop a winter knowledge symposium on Islamic ecology and sustainable agriculture', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 39:9",
              arabic: "هَلْ يَسْتَوِي الَّذِينَ يَعْلَمُونَ وَالَّذِينَ لَا يَعْلَمُونَ",
              translation: "Are those who know equal to those who do not know?",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 20:114",
              arabic: "وَقُل رَّبِّ زِدْنِي عِلْمًا",
              translation: "And say: My Lord, increase me in knowledge.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (peace be upon him) said: \"Whoever treads a path seeking knowledge, Allah will make easy for him the path to Paradise.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Winter is the intellectual season, and a knowledge symposium positions MTC as a thought leader in the intersection of Islamic values and ecological practice. This event gathers scholars, farmers, activists, and community builders to share research, experiences, and vision. It fills a gap in both the Islamic and agricultural landscapes: Muslim environmental thought exists in academic circles but rarely reaches practitioners, and sustainable agriculture conferences rarely centre faith. The symposium bridges these worlds.


**How?**

1. Define the symposium theme: "Faith, Food, and Future: Islamic Perspectives on Sustainable Land Stewardship."
2. Invite 5-7 speakers from diverse backgrounds: Islamic scholars with ecological knowledge, Muslim farmers and permaculturists, food justice advocates, and MTC programme leaders.
3. Design a format that mixes formal presentations (20 minutes each) with panel discussions, breakout workshops, and a closing collective du'a and action planning session.
4. Select a venue that accommodates 80-120 attendees with proper audio-visual equipment, prayer space, and catering.
5. Offer the symposium in hybrid format (in-person and livestreamed) to reach a national audience.
6. Record all sessions and publish them as a free online resource within 30 days of the event.
7. Completion indicator: symposium planned and executed with at least 5 speakers, 80+ attendees (in-person and virtual combined), recorded sessions published, and post-event report distributed.` },
        { title: 'Build partnerships with national Islamic and agricultural organisations', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 5:2",
              arabic: "وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ",
              translation: "And cooperate in righteousness and piety. Building partnerships with national organisations is institutional cooperation in goodness.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

National-level impact requires national-level partnerships. MTC operating alone can achieve local excellence; MTC partnering with ISNA, ICNA, national Muslim farming networks, and agricultural extension services can achieve systemic change. Partnerships provide access to larger audiences, funding opportunities, shared resources, and institutional credibility. The Quran commands "cooperate in righteousness and piety" (5:2) — strategic partnerships are the organisational expression of this cooperation.


**How?**

1. Identify target partners in three categories: national Islamic organisations (ISNA, ICNA, MAS, local council of imams), agricultural organisations (Sustainable Agriculture Research and Education, local extension services, farming cooperatives), and allied movements (food justice organisations, interfaith environmental coalitions, community land trusts).
2. Research each potential partner's mission, programmes, and contact points to identify alignment with MTC values.
3. Prepare a partnership proposal packet: MTC overview, framework guide summary, impact data, and specific partnership opportunities (co-hosting events, co-branding educational materials, cross-promotion, resource sharing).
4. Initiate contact through personal connections where possible — warm introductions convert far better than cold emails.
5. Start with low-commitment collaborations (cross-promotion, speaker exchange) and build toward deeper partnership (co-hosted events, shared programmes) as trust develops.
6. Formalise successful partnerships with a simple MOU (memorandum of understanding) outlining mutual expectations and benefits.
7. Completion indicator: partnership proposals sent to at least 5 organisations, at least 2 partnerships formalised with MOUs, and at least 1 joint activity completed.` },
        { title: 'Create a media and storytelling strategy that elevates MTC nationally', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 14:24-25",
              arabic: "أَلَمْ تَرَ كَيْفَ ضَرَبَ اللَّهُ مَثَلًا كَلِمَةً طَيِّبَةً كَشَجَرَةٍ طَيِّبَةٍ أَصْلُهَا ثَابِتٌ وَفَرْعُهَا فِي السَّمَاءِ تُؤْتِي أُكُلَهَا كُلَّ حِينٍ بِإِذْنِ رَبِّهَا",
              translation: "Have you not considered how Allah presents an example — a good word like a good tree, whose root is firmly fixed and whose branches [high] in the sky? It produces its fruit all the time, by permission of its Lord. A media strategy elevates the good word nationally.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The best programme in the world cannot scale if no one knows about it. A media and storytelling strategy ensures that the MTC story — Muslim communities reviving the earth through faith-rooted seasonal stewardship — reaches the audiences who need to hear it: potential participants, funders, partners, media, and the broader Muslim community. Storytelling is how the ummah has always transmitted knowledge and inspiration; the medium changes (from oral tradition to digital media) but the principle endures.


**How?**

1. Define the core narrative: "Seasonal reconnects Muslim communities to the earth through a four-season pathway of planting, tending, harvesting, and reflecting — rooted in Quran and Sunnah, producing food, knowledge, and community."
2. Create a content calendar aligned with the four seasons: spring planting stories, summer growth updates, autumn harvest celebrations, winter reflection pieces.
3. Produce high-quality visual content: professional photographs of each season's activities, short video documentaries (3-5 minutes each) following participants through a full cycle, and designed infographics explaining the model.
4. Distribute through multiple channels: social media (Instagram and YouTube for visual content, Twitter/X for thought leadership), Muslim media outlets (press releases for events), agricultural publications (framework articles), and the programme's own newsletter.
5. Train community members as storytellers: equip participants to share their own experiences authentically through social media, blog posts, or recorded testimonials.
6. Track media metrics: social media engagement, press coverage, newsletter subscribers, and website traffic, adjusting strategy based on what resonates.
7. Completion indicator: media strategy documented, content calendar active for at least one full season, at least 2 video pieces published, and measurable growth in audience reach.` },
      ],
    },
    {
      title: 'Build a surplus food distribution network that channels MTC harvests to those in need',
      priority: 'urgent', tags: ['distribution', 'food-security', 'surplus', 'sadaqah'],
      description: 'Create a systematic distribution network that ensures surplus harvest from MTC and affiliated programmes reaches families experiencing food insecurity, fulfilling the Quranic command to "give its due on the day of its harvest" (6:141). This network transforms excess into provision, waste into worship, and local production into community food security.',
      subtasks: [
        { title: 'Map local food insecurity and identify distribution partners', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 107:1-3",
              arabic: "أَرَأَيْتَ الَّذِي يُكَذِّبُ بِالدِّينِ فَذَٰلِكَ الَّذِي يَدُعُّ الْيَتِيمَ وَلَا يَحُضُّ عَلَىٰ طَعَامِ الْمِسْكِينِ",
              translation: "Have you seen the one who denies the Recompense? For that is the one who drives away the orphan and does not encourage the feeding of the poor. Mapping food insecurity fulfils the mandate to feed the poor.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Surplus food without a distribution plan either rots or reaches people who do not need it. Mapping food insecurity ensures the harvest goes where it is most needed — to families who struggle to afford fresh produce, to elderly community members who cannot access farmers' markets, to refugees navigating a new food system. The Quran is unambiguous: "And give the relative his right, and the poor and the traveller, and do not spend wastefully" (17:26). Identifying need is the prerequisite to fulfilling this obligation.


**How?**

1. Research local food insecurity data: food bank usage statistics, school free lunch programme rates, and neighbourhood-level food access mapping.
2. Identify existing organisations serving food-insecure populations: food banks, soup kitchens, refugee resettlement agencies, Islamic relief organisations, and community pantries.
3. Visit potential distribution partners to understand their needs: what types of produce do they most need? What quantities can they handle? What delivery logistics work for them?
4. Map the gap between what MTC can produce and what partners can distribute — identify whether additional sourcing partnerships are needed.
5. Assess halal food accessibility in the community: are Muslim families being served by existing food security programmes, or do they face additional barriers?
6. Prioritise distribution partners based on need, alignment with MTC values, and logistical feasibility.
7. Completion indicator: a local food insecurity map created, at least 3 distribution partners identified and visited, and a needs assessment documented for each.` },
        { title: 'Design harvest allocation and logistics protocols for surplus distribution', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 6:141",
              arabic: "وَآتُوا حَقَّهُ يَوْمَ حَصَادِهِ وَلَا تُسْرِفُوا",
              translation: "And give its [due] right on the day of its harvest and be not excessive. Designing harvest allocation protocols ensures the right of the harvest is distributed justly and without waste.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Without clear protocols, surplus distribution is ad hoc — sometimes food reaches people in need, sometimes it does not, and no one can account for the quantities. Protocols ensure consistency, accountability, and dignity. Every kilogram of surplus must be tracked from field to recipient so the community can honestly report its impact and improve its systems. The Quranic emphasis on "giving its due on the day of its harvest" (6:141) implies immediacy and intentionality — surplus should not sit waiting while families go without.


**How?**

1. Define allocation tiers for every harvest: (a) active participants (fair share), (b) surplus distribution to partners, (c) preservation for off-season distribution, (d) seed-saving stock. The tiers ensure participants are fed first but surplus reaches the community immediately.
2. Create a harvest-day distribution workflow: weigh total harvest, allocate participant shares, assess surplus quantity, contact distribution partners to confirm delivery, and dispatch within 24 hours.
3. Establish food safety protocols for distributed produce: wash, inspect, remove damaged items, and transport in clean, food-safe containers.
4. Design a simple tracking form: date, crop, quantity distributed, partner received, and any feedback.
5. Train harvest volunteers on distribution protocols so the system works even when the coordinator is absent.
6. Set up a cold-storage solution (even if basic: coolers with ice) for surplus that cannot be delivered on harvest day.
7. Completion indicator: allocation and logistics protocols documented, tested during at least one harvest, and tracking data collected.` },
        { title: 'Establish partnerships with Islamic food relief organisations for scaled distribution', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6011",
              translation: "The Prophet (peace be upon him) said: \"The parable of the believers in their affection, mercy, and compassion for each other is that of a body. When any limb aches, the whole body responds with sleeplessness and fever.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Partnering with Islamic food relief organisations extends the body's care.",
            },
          ],
          description: `**Why?**

Local distribution is impactful but limited. Partnering with Islamic food relief organisations — who have established logistics, volunteer networks, and recipient databases — multiplies MTC's reach. These partnerships also connect MTC to the broader Islamic food security movement, creating mutual benefit: relief organisations gain access to locally grown, halal produce, and MTC gains distribution infrastructure and community credibility.

**How?**

1. Identify Islamic food relief organisations operating locally and regionally: masjid food pantries, Islamic relief chapters, Muslim food banks, and Ramadan feeding programmes.
2. Approach each with a partnership proposal: MTC provides fresh, locally grown produce on a predictable seasonal schedule; the partner provides distribution infrastructure and recipient access.
3. Negotiate logistics: delivery schedules, minimum quantities, produce types accepted, and communication protocols.
4. Align especially with Ramadan feeding programmes — the harvest calendar can be designed to peak in time for Ramadan iftar distribution, creating a powerful sadaqah cycle.
5. Formalise partnerships with simple agreements covering responsibilities, schedules, and reporting.
6. Share impact data between partners to build a combined picture of community food security contribution.
7. Completion indicator: at least 2 Islamic food relief partnerships formalised with agreements, delivery schedules established, and at least one distribution cycle completed.` },
        { title: 'Train community members as food distribution ambassadors', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 76:8-9",
              arabic: "وَيُطْعِمُونَ الطَّعَامَ عَلَىٰ حُبِّهِ مِسْكِينًا وَيَتِيمًا وَأَسِيرًا * إِنَّمَا نُطْعِمُكُمْ لِوَجْهِ اللَّهِ لَا نُرِيدُ مِنكُمْ جَزَاءً وَلَا شُكُورًا",
              translation: "And they give food, in spite of their love for it, to the poor, the orphan, and the captive. We feed you seeking only the Face of Allah — we wish for no reward nor thanks from you.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 2:267",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا أَنفِقُوا مِن طَيِّبَاتِ مَا كَسَبْتُمْ",
              translation: "O you who believe, spend from the good things you have earned.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2374",
              translation: "The Prophet (peace be upon him) said: \"Whoever has extra provisions should give them to one who has no provisions.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Food distribution is more than logistics — it is a human encounter where dignity, compassion, and Islamic values must be present. Ambassadors trained in both the practical and spiritual dimensions of food distribution ensure that every interaction honours the recipient. The Prophet (peace be upon him) emphasised that charity should be given without making the recipient feel inferior (2:264). Trained ambassadors handle produce with care, deliver with a smile, respect privacy, and represent the MTC mission in every interaction.


**How?**

1. Recruit 8-10 community members willing to commit to distribution shifts during harvest seasons.
2. Conduct a training covering: food safety and handling, delivery logistics, Islamic etiquette of giving (giving with the right hand, not mentioning the charity, maintaining dignity), cultural sensitivity (language, dietary knowledge, respect for circumstances), and programme messaging (how to explain MTC to curious recipients).
3. Assign distribution routes and partner relationships to specific ambassadors so they build consistent connections.
4. Provide ambassadors with branded materials: MTC aprons or badges, information cards about the programme, and a feedback form for recipients.
5. Debrief after each major distribution: what went smoothly, what was difficult, and how can the experience improve for both ambassadors and recipients.
6. Recognise ambassadors at seasonal gatherings for their service in this critical role.
7. Completion indicator: at least 8 ambassadors trained, assigned routes, and active through one harvest-season distribution cycle with debrief completed.` },
        { title: 'Measure distribution impact and report to the community and donors', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:58",
              arabic: "إِنَّ اللَّهَ يَأْمُرُكُمْ أَن تُؤَدُّوا الْأَمَانَاتِ إِلَىٰ أَهْلِهَا",
              translation: "Indeed, Allah commands you to render trusts to those to whom they are due. Measuring and reporting distribution impact is rendering the trust of community resources to its rightful accounting.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Impact measurement completes the cycle of accountability. The community that grew the food, the volunteers who distributed it, and the donors who funded the programme all deserve to know: how much food reached how many people? Did it make a difference? Impact data also drives improvement — identifying which crops are most needed, which distribution channels are most effective, and where gaps remain. Transparent reporting builds the trust that sustains funding and volunteer commitment across years.


**How?**

1. Compile distribution data from tracking forms: total kilograms distributed, number of families served, number of distribution events, and number of partner organisations supplied.
2. Calculate the financial equivalent: what would recipients have paid for the produce at market prices? This demonstrates economic impact beyond the numbers.
3. Collect qualitative feedback: recipient testimonials (anonymous where preferred), partner organisation assessments, and ambassador observations.
4. Produce a seasonal distribution impact report combining quantitative data, qualitative stories, and photographs (with permission).
5. Share the report with the full community at the Hisab shura, with donors and supporters through a dedicated communication, and publicly through media channels.
6. Use the report to set targets for the next year: more kilograms, more families, more partners, or deeper reach within existing relationships.
7. Completion indicator: seasonal distribution impact report published with quantitative data, at least 3 qualitative testimonials, shared with community and at least 2 external audiences.` },
      ],
    },
    {
      title: 'Document the complete Seasonal model for academic publication and institutional sharing',
      priority: 'urgent', tags: ['publication', 'documentation', 'academic', 'institutional'],
      description: 'Produce a comprehensive written account of the Seasonal model suitable for academic journals, institutional reports, and educational curricula. This documentation elevates the model from a community project to a contribution to knowledge — accessible to researchers, policymakers, educators, and community leaders who can study, cite, critique, and build upon it.',
      subtasks: [
        { title: 'Write a case study documenting the model\'s development, implementation, and outcomes', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 96:1-5",
              arabic: "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ * خَلَقَ الْإِنسَانَ مِنْ عَلَقٍ * اقْرَأْ وَرَبُّكَ الْأَكْرَمُ * الَّذِي عَلَّمَ بِالْقَلَمِ * عَلَّمَ الْإِنسَانَ مَا لَمْ يَعْلَمْ",
              translation: "Read in the name of your Lord who created — created man from a clinging substance. Read, and your Lord is the Most Generous — who taught by the pen, taught man that which he knew not.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 2:282",
              arabic: "فَاكْتُبُوهُ",
              translation: "Write it down.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2674",
              translation: "The Prophet (peace be upon him) said: \"Whoever establishes a good practice in Islam will have its reward and the reward of all who act upon it after him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A rigorous case study provides the evidentiary foundation for all other publications. It documents what was done, why, how, and what resulted — with enough detail for others to evaluate the model's claims and consider its applicability to their context. Academic and institutional audiences require evidence, not just inspiration. The Islamic scholarly tradition is built on rigorous documentation and chain of evidence (isnad) — a well-written case study applies this standard to community development practice.


**How?**

1. Structure the case study following standard academic format: Introduction (context and motivation), Literature Review (Islamic ecology, community agriculture, seasonal programming), Methodology (how the model was developed and implemented), Results (participation data, harvest yields, community outcomes), Discussion (what worked, what did not, why), and Conclusion (implications and recommendations).
2. Compile quantitative data from programme records: multi-year participation numbers, harvest yields, distribution quantities, volunteer hours, financial data, and retention rates.
3. Conduct and transcribe semi-structured interviews with 10-15 stakeholders: founding team members, long-term participants, volunteers, distribution partners, and community leaders.
4. Analyse qualitative data for themes: spiritual impact, community building, skill development, food security contribution, and challenges overcome.
5. Write with academic rigour but accessible language — the audience includes both researchers and practitioners.
6. Have the case study reviewed by an academic mentor or peer with experience in community-based research.
7. Completion indicator: case study written (8,000-12,000 words), reviewed by an academic peer, and revised based on feedback.` },
        { title: 'Submit the model to an academic journal in sustainable agriculture or Islamic studies', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 1631",
              translation: "The Prophet (peace be upon him) said: \"When a man dies, his deeds come to an end except for three: ongoing charity, beneficial knowledge, or a righteous child who prays for him.\" Academic publication of the model is dissemination of beneficial knowledge at the highest level.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Academic publication subjects the MTC model to peer review — the most rigorous form of external validation. A published paper enters the permanent scholarly record, available to researchers, students, and policymakers worldwide. It also positions the model within broader academic conversations about faith-based development, community agriculture, and Islamic ecology. The Quran says "Are those who know equal to those who do not know?" (39:9) — contributing to the knowledge base is a form of worship and service.


**How?**

1. Identify 3-5 target journals that publish at the intersection of religion and ecology, community development, or sustainable agriculture: Journal of Agriculture, Food Systems, and Community Development; Worldviews: Global Religions, Culture, and Ecology; Islamic Sciences; or similar.
2. Review each journal's submission guidelines, word limits, formatting requirements, and review timelines.
3. Adapt the case study into a journal article format, sharpening the argument and fitting word limits (typically 6,000-8,000 words for a full article).
4. Write a compelling abstract (200-300 words) that communicates the model's unique contribution: the integration of Islamic spiritual framework with agricultural seasons.
5. Submit to the first-choice journal and prepare for revisions — most papers require at least one round of revision before acceptance.
6. If rejected, revise based on reviewer feedback and submit to the next journal on the list.
7. Completion indicator: article submitted to at least one peer-reviewed journal, with revisions completed if requested.` },
        { title: 'Create a practitioner\'s report for Islamic institutional and community audiences', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:110",
              arabic: "كُنتُمْ خَيْرَ أُمَّةٍ أُخْرِجَتْ لِلنَّاسِ تَأْمُرُونَ بِالْمَعْرُوفِ وَتَنْهَوْنَ عَنِ الْمُنكَرِ ۚ وَتُؤْمِنُونَ بِاللَّهِ",
              translation: "[Believers], you are the best community singled out for people: you order what is right, forbid what is wrong, and believe in God.",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              rationale: "a practitioner's report is how this community communicates its testimony — making its work accessible to institutions and communities so they can carry forward the mission",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1359",
              translation: "The Prophet (peace be upon him) said: \"Every child is born with a true nature (fitrah), and then his parents make him a Jew, a Christian, or a Magian — just as an animal gives birth to a complete animal. Do you find it born mutilated?\"",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "the practitioner's report speaks to this fitrah — calling Muslim institutions back to their innate vocation as stewards of the earth, grounded in the original covenant with creation",
            },
          ],
          description: `**Why?**

Academic papers reach scholars; practitioner reports reach the people who will actually build programmes. Islamic centres, community organisations, and Muslim farming initiatives need a document that speaks their language — practical, values-centred, and action-oriented. A practitioner's report bridges the gap between the academic case study and the framework guide, providing enough evidence to be credible and enough guidance to be useful. This is the document that lands on a community leader's desk and sparks action.


**How?**

1. Write a 15-20 page report structured for practitioners: Executive Summary (1 page), The MTC Model (2-3 pages covering the four seasons and Islamic framework), Impact Evidence (3-4 pages of key data and stories), Implementation Pathway (5-6 pages of practical guidance), and Resources (templates, contacts, further reading).
2. Use clear, non-academic language with generous use of headers, bullet points, pull quotes, and visual elements.
3. Include compelling data visualisations: harvest yield charts, participation growth graphs, distribution impact maps, and before/after photographs.
4. Feature 3-5 participant stories that illustrate the model's human impact — with their permission and in their own words where possible.
5. Design for professional print and digital distribution: branded layout, high-resolution images, and accessible PDF format.
6. Distribute to Islamic institutions, agricultural organisations, and community development networks through direct outreach and event distribution.
7. Completion indicator: practitioner's report written, designed, and distributed to at least 10 target organisations.` },
        { title: 'Develop a university-level curriculum module on faith-rooted seasonal agriculture', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 39:9",
              arabic: "هَلْ يَسْتَوِي الَّذِينَ يَعْلَمُونَ وَالَّذِينَ لَا يَعْلَمُونَ",
              translation: "Are those who know equal to those who do not know?",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 3:110",
              arabic: "كُنتُمْ خَيْرَ أُمَّةٍ أُخْرِجَتْ لِلنَّاسِ تَأْمُرُونَ بِالْمَعْرُوفِ وَتَنْهَوْنَ عَنِ الْمُنكَرِ",
              translation: "You are the best nation produced for mankind. You enjoin what is right and forbid what is wrong.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (peace be upon him) said: \"Whoever treads a path seeking knowledge, Allah will make easy for him the path to Paradise.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Curriculum development embeds the MTC model in educational institutions, reaching future community leaders, farmers, scholars, and activists during their formative years. A well-designed module can be offered in Islamic studies programmes, environmental studies departments, or community development courses. This creates a pipeline of informed individuals who enter the field already understanding the integration of faith and agriculture, rather than having to discover it on their own.


**How?**

1. Design a 4-6 week module suitable for undergraduate or graduate courses, covering: Islamic ecological theology (Quranic and Hadith foundations), seasonal agricultural models (historical and contemporary), community-based participatory agriculture, food sovereignty and Islamic economics, and experiential learning (site visit or garden project).
2. Write detailed lesson plans for each week with learning objectives, assigned readings (from Islamic and agricultural sources), discussion questions, and assessment criteria.
3. Develop a reading list drawing from primary Islamic sources (Quran, hadith collections, classical Islamic agricultural texts like Ibn al-'Awwam) and contemporary scholarship (Ibrahim Ozdemir, Fazlun Khalid, Vandana Shiva).
4. Include a practical component: students design a seasonal programme plan for a hypothetical community, applying the framework to their local conditions.
5. Create a slide deck and instructor's guide to lower the barrier for faculty adoption.
6. Share the module with Islamic studies and environmental studies departments at 5-10 universities.
7. Completion indicator: curriculum module written with lesson plans, reading list, assessment rubrics, and instructor guide, shared with at least 3 university departments.` },
        { title: 'Archive the complete Seasonal documentation in accessible public formats', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 1631",
              translation: "The Prophet (peace be upon him) said: \"When a man dies, his deeds come to an end except for three: ongoing charity, beneficial knowledge, or a righteous child who prays for him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Archiving the complete documentation in accessible public formats is the ultimate preservation of beneficial knowledge.",
            },
          ],
          description: `**Why?**

Knowledge that is not archived is knowledge at risk. Digital files corrupt, websites go offline, organisations dissolve — but well-archived material survives. Archiving the complete MTC documentation in multiple formats and locations ensures that this work outlasts any individual, organisation, or technology platform. A permanent archive is the institutional expression of beneficial knowledge that continues giving.

**How?**

1. Compile the complete documentation set: framework guide, case study, journal article, practitioner's report, curriculum module, all templates and forms, video content, and programme photographs.
2. Organise the archive with a clear table of contents, version numbers, and date stamps for each document.
3. Upload to at least three independent platforms: a dedicated section on the MTC website, an open-access repository (Internet Archive, Zenodo, or an institutional repository), and a shared cloud drive accessible to all partner organisations.
4. Provide materials in multiple formats: PDF (for print and reading), editable documents (for adaptation), and HTML (for web access).
5. License the materials under a Creative Commons licence (CC BY-SA recommended) that allows free use and adaptation with attribution and share-alike.
6. Designate an archive steward responsible for maintaining access, updating materials, and responding to enquiries.
7. Completion indicator: complete documentation set archived in at least 3 locations, licensed under Creative Commons, and a steward assigned with a maintenance schedule.` },
      ],
    },
  ],

  // ── MOONTRANCE RESIDENCY ──

  // ── CORE ── foundational acts of community formation
  moontrance_residency_core: [
    {
      title: "Draft the community covenant (Mithaq) — a binding agreement of mutual rights, duties, and Islamic governance principles",
      priority: 'urgent', tags: ['covenant', 'mithaq', 'governance'],
      description: "The Mithaq is the foundational social contract of the community, modelled on the Prophet's Charter of Madinah. It establishes shared commitments to Islamic governance, mutual aid, conflict resolution, and stewardship of common resources. Without a written covenant, communal life drifts toward informal power structures and unspoken expectations that fracture trust.",
      subtasks: [
        { title: "Study the Sahifat al-Madinah (Charter of Madinah) and extract its structural principles", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:13",
              arabic: "يَا أَيُّهَا النَّاسُ إِنَّا خَلَقْنَاكُم مِّن ذَكَرٍ وَأُنثَىٰ وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا ۚ إِنَّ أَكْرَمَكُمْ عِندَ اللَّهِ أَتْقَاكُمْ ۚ إِنَّ اللَّهَ عَلِيمٌ خَبِيرٌ",
              translation: "People, We created you all from a single man and a single woman, and made you into races and tribes so that you should recognize one another. In God's eyes, the most honoured of you are the ones most mindful of Him: God is all knowing, all aware.",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              rationale: "the Sahifat al-Madinah embodied this verse — building a unified covenant community from diverse tribes, each retaining identity while bound by a shared purpose",
            },
            {
              kind: "quran",
              ref: "Quran 2:143",
              arabic: "وَكَذَٰلِكَ جَعَلْنَاكُمْ أُمَّةً وَسَطًا لِّتَكُونُوا شُهَدَاءَ عَلَى النَّاسِ",
              translation: "We have made you [believers] into a just community, so that you may bear witness [to the truth] before others...",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              rationale: "the Madinah Charter instantiated this — a community acting as a balanced, witnessing body among the diverse peoples of Madinah",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 8",
              translation: "Narrated Ibn 'Umar: Allah's Messenger (ﷺ) said: Islam is based on (the following) five (principles): 1. To testify that none has the right to be worshipped but Allah and Muhammad is Allah's Messenger (ﷺ). 2. To offer the (compulsory congregational) prayers dutifully and perfectly. 3. To pay Zakat (i.e. obligatory charity) . 4. To perform Hajj. (i.e. Pilgrimage to Mecca) 5. To observe fast during the month of Ramadan",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2697",
              translation: "Narrated Aisha:Allah's Messenger (ﷺ) said, \"If somebody innovates something which is not in harmony with the principles of our religion, that thing is rejected",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Sahifat al-Madinah is the first written constitution in Islamic history, established by the Prophet (peace be upon him) upon arrival in Madinah. It codified rights and responsibilities among Muhajirun, Ansar, and non-Muslim residents with remarkable clarity. Studying its structure gives you a prophetic template for how to organise diverse people under a single covenant without erasing their distinct identities or imposing uniformity — it balanced unity of purpose with plurality of origin.


**How?**

1. Obtain a reliable English translation of the Sahifat al-Madinah — Dr. Muhammad Hamidullah's reconstruction is widely regarded as authoritative.
2. Read the full text and categorise each clause by theme: mutual defence, tax obligations, judicial authority, religious freedom, conflict resolution, and expulsion conditions.
3. Note which clauses address internal community relations (between Muslim groups) versus external relations (with non-Muslim residents and outside tribes).
4. Identify the principles that are universal and transferable: collective responsibility, no unilateral war-making, internal arbitration before external escalation, and the Prophet as final arbiter.
5. Write a one-page summary of the structural principles you will carry into your own community covenant.
6. Discuss your findings with at least two other founding members to build shared understanding of the prophetic model.
7. Completion indicator: a written summary of Sahifat al-Madinah principles approved by founding members as the basis for your Mithaq.` },
        { title: "Define the core commitments every founding family must agree to before joining", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 5:1",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا أَوْفُوا بِالْعُقُودِ",
              translation: "O you who believe, fulfill your contracts.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 17:34",
              arabic: "وَأَوْفُوا بِالْعَهْدِ ۖ إِنَّ الْعَهْدَ كَانَ مَسْئُولًا",
              translation: "And fulfill every covenant. Indeed, the covenant is ever questioned about.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 59:9",
              arabic: "وَٱلَّذِينَ تَبَوَّءُو ٱلدَّارَ وَٱلْإِيمَـٰنَ مِن قَبْلِهِمْ يُحِبُّونَ مَنْ هَاجَرَ إِلَيْهِمْ وَلَا يَجِدُونَ فِى صُدُورِهِمْ حَاجَةًۭ مِّمَّآ أُوتُوا۟ وَيُؤْثِرُونَ عَلَىٰٓ أَنفُسِهِمْ وَلَوْ كَانَ بِهِمْ خَصَاصَةٌۭ ۚ وَمَن يُوقَ شُحَّ نَفْسِهِۦ فَأُو۟لَـٰٓئِكَ هُمُ ٱلْمُفْلِحُونَ",
              translation: "Those who were already firmly established in their homes [in Medina], and firmly rooted in faith, show love for those who migrated to them for refuge and harbour no desire in their hearts for what has been given to them. They give them preference over themselves, even if they too are poor: those who are saved from their own souls’ greed are truly successful.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2681",
              translation: "The Prophet (peace be upon him) established the covenant of Madinah (Sahifat al-Madinah) between the Muhajirun, the Ansar, and the Jews, defining mutual rights and obligations in the new community.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A covenant without clear entry commitments becomes a symbolic gesture rather than a binding agreement. The Ansar of Madinah made tangible sacrifices — sharing homes, wealth, and land — before the community could function (Quran 59:9). Defining what each founding family pledges upfront prevents the slow erosion of communal trust that occurs when some members give freely while others consume without contributing. Clarity at the gate protects everyone inside it.


**How?**

1. List the non-negotiable commitments: financial contribution (initial and ongoing), physical presence requirements, participation in shura, adherence to conflict resolution processes, and commitment to shared Islamic values.
2. Distinguish between hard requirements (must be met to join) and soft expectations (encouraged but not grounds for exclusion).
3. Draft each commitment in plain, specific language — avoid vague phrases like "support the community" in favour of measurable terms like "attend monthly shura" or "contribute X% of household income to the common fund."
4. Include an exit clause: what happens to contributions, property, and standing if a family chooses to leave or is asked to leave.
5. Circulate the draft among all prospective founding families for feedback and revision.
6. Revise based on feedback until consensus is reached — remember, the covenant must be something every family signs willingly, not under pressure.
7. Completion indicator: a finalised list of core commitments with written agreement from every founding family.` },
        { title: "Establish the rights guaranteed to every community member within the covenant", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:1",
              arabic: "يَا أَيُّهَا النَّاسُ اتَّقُوا رَبَّكُمُ الَّذِي خَلَقَكُم مِّن نَّفْسٍ وَاحِدَةٍ",
              translation: "O mankind, fear your Lord, who created you from one soul.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 2:188",
              arabic: "وَلَا تَأْكُلُوا أَمْوَالَكُم بَيْنَكُم بِالْبَاطِلِ",
              translation: "And do not consume one another's wealth unjustly.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 4:58",
              arabic: "إِنَّ اللَّهَ يَأْمُرُكُمْ أَن تُؤَدُّوا الْأَمَانَاتِ إِلَىٰ أَهْلِهَا",
              translation: "Indeed, Allah commands you to render trusts to whom they are due.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 1218",
              translation: "The Prophet (peace be upon him) said in his Farewell Sermon: \"Your blood, your property, and your honor are sacred to you as sacred as this day of yours, in this month of yours, in this city of yours.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A covenant that only lists obligations without corresponding rights becomes a tool of control rather than mutual protection. The Prophet (peace be upon him) guaranteed specific rights to every resident of Madinah — security of person, property, and religious practice. Your covenant must do the same: every family that commits to the community must know exactly what they are entitled to receive in return. This reciprocity is what transforms a collection of households into an ummah.


**How?**

1. Draft a rights section covering: physical safety and security, access to shared resources (water, worship space, common land), representation in shura, transparent access to community financial records, right to fair hearing in disputes, and protection from arbitrary expulsion.
2. Include rights specific to vulnerable members: widows, orphans, elderly, and newcomers who may lack established social networks.
3. Address property rights explicitly — what belongs to individuals, what belongs to the community, and how shared property decisions are made.
4. Specify how rights violations are reported, investigated, and remedied.
5. Cross-reference each right with the corresponding obligation from the commitments section to ensure internal consistency.
6. Have at least one person with Islamic legal knowledge review the rights section for alignment with Shariah principles.
7. Completion indicator: a complete rights section integrated into the covenant draft, reviewed for Shariah alignment.` },
        { title: "Include provisions for amendment, dispute resolution, and dissolution", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:35",
              arabic: "وَإِنْ خِفْتُمْ شِقَاقَ بَيْنِهِمَا فَابْعَثُوا حَكَمًا مِّنْ أَهْلِهِ وَحَكَمًا مِّنْ أَهْلِهَا إِن يُرِيدَا إِصْلَاحًا يُوَفِّقِ اللَّهُ بَيْنَهُمَا",
              translation: "And if you fear dissension between the two, send an arbitrator from his people and an arbitrator from her people. If they both desire reconciliation, Allah will cause it between them. Provisions for dispute resolution follow this Quranic model.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

No founding document can anticipate every future circumstance. The community will face situations its founders never imagined, and the covenant must have a mechanism for adaptation without requiring complete renegotiation. Similarly, disputes are inevitable in any human community — the covenant must route them through a structured process rather than leaving them to fester into factionalism. Finally, an honest covenant acknowledges the possibility of dissolution and plans for it with dignity, rather than pretending the community will last forever by default.


**How?**

1. Draft an amendment process: who can propose changes (any member, or only shura?), what threshold is required to adopt them (consensus, two-thirds majority, or simple majority?), and what waiting period exists between proposal and vote.
2. Define a multi-stage dispute resolution process: (a) private resolution between parties, (b) mediation by a mutually agreed third party, (c) formal arbitration by the shura or an external Islamic arbitrator, (d) final decision with binding authority.
3. Specify what constitutes grounds for expulsion and the process required — including the right to be heard, a cooling-off period, and appeal.
4. Include a dissolution clause: if the community disbands, how are shared assets divided? What happens to waqf property? How are outstanding debts settled?
5. Ensure the amendment process itself cannot be amended without a higher threshold (e.g., unanimous consent), preventing a simple majority from rewriting fundamental protections.
6. Review all provisions with founding families and revise until consensus is reached.
7. Completion indicator: amendment, dispute resolution, and dissolution sections added to the covenant and ratified by all founding members.` },
        { title: "Formalise the Mithaq in a signed, witnessed document and distribute copies to all founding families", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 5:1",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا أَوْفُوا بِالْعُقُودِ",
              translation: "O you who believe, fulfill your contracts.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 2:282",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا تَدَايَنتُم بِدَيْنٍ إِلَىٰ أَجَلٍ مُّسَمًّى فَاكْتُبُوهُ ۚ وَلْيَكْتُب بَّيْنَكُمْ كَاتِبٌ بِالْعَدْلِ",
              translation: "O you who believe, when you contract a debt for a specified term, write it down. And let a scribe write it between you in justice.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2681",
              translation: "The Prophet (peace be upon him) established the Sahifat al-Madinah as a written, witnessed covenant between the diverse groups of Madinah, formalizing their rights and responsibilities.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A covenant that exists only as a discussion or digital draft lacks the weight of a solemn commitment. The Quran commands believers to write down their agreements and have them witnessed (Quran 2:282). A physically signed and witnessed document transforms the Mithaq from an intention into a binding social reality. Every family holding a copy ensures transparency and prevents any single person or group from claiming exclusive interpretive authority over the community's founding agreement.


**How?**

1. Compile the final covenant into a single, clearly formatted document with numbered sections for easy reference.
2. Include a preamble stating the covenant's purpose, its grounding in Quran and Sunnah, and the date of ratification.
3. Arrange a formal signing gathering — this is a significant spiritual and social event, not mere paperwork.
4. Have every adult member of each founding family sign the document in the presence of at least two witnesses who are not signatories.
5. The witnesses should also sign, attesting to the voluntary nature of each signature.
6. Produce physical copies for every founding family, plus a master copy held by the designated community record-keeper.
7. Completion indicator: a signed, witnessed Mithaq document with copies distributed to all founding families and a master copy archived.` },
      ],
    },
    {
      title: "Establish the shura governance structure — roles, council formation, and decision-making processes",
      priority: 'urgent', tags: ['shura', 'governance', 'hukm'],
      description: "Governance built on shura (mutual consultation) is a Quranic mandate (42:38), not an optional enhancement. This task creates the institutional architecture for collective decision-making: who sits on the shura council, how they are selected, what authority they hold, and how decisions are made and communicated. Without formal governance, communities default to charismatic authority or wealth-based power.",
      subtasks: [
        { title: "Define the shura council composition — number of seats, eligibility criteria, and term lengths", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 42:38",
              arabic: "وَالَّذِينَ اسْتَجَابُوا لِرَبِّهِمْ وَأَقَامُوا الصَّلَاةَ وَأَمْرُهُمْ شُورَىٰ بَيْنَهُمْ وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ",
              translation: "And those who have responded to their Lord and established prayer and whose affair is determined by consultation among themselves, and from what We have provided them, they spend.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 3:159",
              arabic: "وَشَاوِرْهُمْ فِي الْأَمْرِ",
              translation: "And consult them in the matter.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 4948",
              translation: "The Prophet (peace be upon him) said: \"The one who is consulted is entrusted (with a trust).\"",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The composition of the shura council determines whose voices shape community decisions. If eligibility is too narrow, governance becomes an oligarchy wearing Islamic language. If too broad without structure, meetings become unproductive and decisions stall. The Prophet (peace be upon him) consulted specific companions for their expertise and consulted the entire community on matters affecting everyone. Your council design must replicate this balance: a manageable body of qualified members who genuinely represent the community's diversity.


**How?**

1. Decide on council size based on community population — a ratio of roughly one representative per 5-10 families keeps the body functional while ensuring broad representation.
2. Set eligibility criteria: minimum residency period, demonstrated commitment to community obligations, no outstanding unresolved disputes, and a reputation for trustworthiness (the Islamic concept of 'adalah).
3. Determine whether seats are elected, appointed, or a hybrid — consider reserving some seats for specific constituencies (women, youth, elders, newcomers).
4. Set term lengths (e.g., 2 years) with staggered rotation so institutional memory is preserved while fresh perspectives enter regularly.
5. Define term limits to prevent entrenchment — no member should serve more than two or three consecutive terms.
6. Specify the process for filling vacancies mid-term and for removing members who fail to fulfil their duties.
7. Completion indicator: a written shura council charter specifying composition, eligibility, terms, and succession, approved by founding members.` },
        { title: "Establish the decision-making process — quorum, voting thresholds, and consensus mechanisms", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 42:38",
              arabic: "وَأَمْرُهُمْ شُورَىٰ بَيْنَهُمْ",
              translation: "And whose affair is determined by consultation among themselves.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 4:58",
              arabic: "إِنَّ اللَّهَ يَأْمُرُكُمْ أَن تُؤَدُّوا الْأَمَانَاتِ إِلَىٰ أَهْلِهَا وَإِذَا حَكَمْتُم بَيْنَ النَّاسِ أَن تَحْكُمُوا بِالْعَدْلِ",
              translation: "Indeed, Allah commands you to render trusts to whom they are due and when you judge between people to judge with justice.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 7138",
              translation: "The Prophet (peace be upon him) said: \"Each of you is a shepherd and each of you is responsible for his flock.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Shura without a defined process for reaching decisions is just conversation. The Quran says "and consult them in the matter" (3:159) and "whose affair is consultation among themselves" (42:38), but it does not prescribe a single procedural model — this is left to the community's ijtihad. You must decide: does shura aim for consensus or majority vote? What happens when agreement cannot be reached? Without answering these questions in advance, the first serious disagreement will paralyse the community or be resolved by whoever speaks loudest.


**How?**

1. Define quorum: the minimum number of council members who must be present for any decision to be valid (typically two-thirds of seated members).
2. Decide on the default decision-making method — consensus-seeking with a fallback to supermajority (e.g., 75%) is a common model that honours shura while preventing indefinite deadlock.
3. Categorise decisions by weight: routine operational decisions (simple majority), significant community decisions (supermajority), and covenant amendments (near-unanimous or unanimous).
4. Establish a procedure for when consensus fails: tabling the issue, appointing a smaller committee to propose a compromise, or referring to an external Islamic arbitrator.
5. Define how decisions are recorded, communicated to the community, and implemented — transparency is not optional in Islamic governance.
6. Create a template for meeting agendas and minutes that ensures accountability.
7. Completion indicator: a written decision-making protocol integrated into the shura charter, tested in at least one practice session.` },
        { title: "Assign foundational community roles — amir, treasurer, record-keeper, and welfare coordinator", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:58",
              arabic: "إِنَّ اللَّهَ يَأْمُرُكُمْ أَن تُؤَدُّوا الْأَمَانَاتِ إِلَىٰ أَهْلِهَا",
              translation: "Indeed, Allah commands you to render trusts to whom they are due.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 28:26",
              arabic: "قَالَتْ إِحْدَاهُمَا يَا أَبَتِ اسْتَأْجِرْهُ ۖ إِنَّ خَيْرَ مَنِ اسْتَأْجَرْتَ الْقَوِيُّ الْأَمِينُ",
              translation: "One of them said: O my father, hire him. Indeed, the best one you can hire is the strong and the trustworthy.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 7138",
              translation: "The Prophet (peace be upon him) said: \"Each of you is a shepherd and each of you is responsible for his flock.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Roles create accountability. Without designated responsibility, critical tasks either fall to whoever volunteers most (leading to burnout) or to no one at all (leading to neglect). The Prophet (peace be upon him) appointed specific companions to specific functions — Bilal as mu'adhin, Abu Ubayda as treasurer of the bayt al-mal, Zayd ibn Thabit as scribe. Assigning clear roles with defined authority and reporting obligations ensures the community functions as an institution, not a personality-driven movement.


**How?**

1. Define the amir role: the community's operational leader, responsible for executing shura decisions, representing the community externally, and chairing council meetings. Clarify that the amir is first among equals, not an autocrat — authority is delegated by shura and can be withdrawn.
2. Define the treasurer role: manages all community funds, maintains transparent records accessible to every member, provides monthly financial reports to the shura, and cannot authorise expenditures above a set threshold without council approval.
3. Define the record-keeper role: documents all shura meetings, maintains the covenant and its amendments, archives community correspondence, and ensures institutional memory is preserved.
4. Define the welfare coordinator role: monitors the wellbeing of community members, identifies families in need, coordinates mutual aid, and ensures no one falls through the cracks.
5. Establish reporting lines: each role reports to the shura council at defined intervals.
6. Appoint initial role-holders from among the founding members by shura consensus.
7. Completion indicator: all four foundational roles filled with named individuals, written role descriptions, and a reporting schedule established.` },
        { title: "Create a financial transparency system — shared ledger, regular reporting, and audit mechanism", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:58",
              arabic: "إِنَّ اللَّهَ يَأْمُرُكُمْ أَن تُؤَدُّوا الْأَمَانَاتِ إِلَىٰ أَهْلِهَا وَإِذَا حَكَمْتُم بَيْنَ النَّاسِ أَن تَحْكُمُوا بِالْعَدْلِ",
              translation: "Indeed, Allah commands you to render trusts to those to whom they are due and when you judge between people to judge with justice. A transparent financial ledger is rendering the trust of community wealth justly.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Financial opacity is the single most common cause of community fracture. When members cannot see how their contributions are used, suspicion grows even in the absence of wrongdoing. The Quran's emphasis on recording debts and transactions (2:282) establishes a divine precedent for financial transparency. A shared ledger, regular reporting cycle, and independent audit mechanism are not bureaucratic overhead — they are the trust infrastructure that allows communal financial life to function without resentment or corruption.


**How?**

1. Select a ledger system: a shared spreadsheet, open-source accounting software, or a dedicated community finance tool — the key requirement is that every member can view (but not edit) all transactions at any time.
2. Define income categories: membership contributions, project-specific fundraising, external donations, waqf returns, and any commercial revenue.
3. Define expense categories: infrastructure, maintenance, welfare, education, worship facilities, administration, and reserves.
4. Establish a monthly reporting cycle: the treasurer prepares a summary of income, expenses, and current balances, presented at the shura meeting and distributed to all members.
5. Create an annual audit process: at least two members not involved in financial management review all records, verify balances, and present findings to the community.
6. Define escalation procedures for discrepancies: what happens if audit findings reveal errors or irregularities.
7. Completion indicator: a functioning shared ledger with initial balances recorded, a reporting template created, and an audit schedule published.` },
        { title: "Draft and publish the community's first official shura meeting agenda and conduct the inaugural session", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 42:38",
              arabic: "وَأَمْرُهُمْ شُورَىٰ بَيْنَهُمْ",
              translation: "And whose affair is determined by consultation among themselves.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 3:159",
              arabic: "فَاعْفُ عَنْهُمْ وَاسْتَغْفِرْ لَهُمْ وَشَاوِرْهُمْ فِي الْأَمْرِ ۖ فَإِذَا عَزَمْتَ فَتَوَكَّلْ عَلَى اللَّهِ",
              translation: "So pardon them and ask forgiveness for them and consult them in the matter. And when you have decided, then rely upon Allah.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 4948",
              translation: "The Prophet (peace be upon him) said: \"The one who is consulted is entrusted (with a trust).\"",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The first shura meeting sets the tone and precedent for all governance to come. If it is disorganised, dominated by a few voices, or ends without clear outcomes, it teaches the community that shura is performative rather than functional. Conducting a well-structured inaugural session with a published agenda, equitable participation, recorded minutes, and communicated decisions demonstrates from day one that this community governs itself through consultation, transparency, and collective accountability — not through the personality of a single leader.


**How?**

1. Prepare a written agenda at least one week before the meeting and distribute it to all council members and community members.
2. Include on the agenda: opening with Quran recitation, ratification of the shura charter, appointment of meeting roles (chair, timekeeper, minute-taker), review of the covenant, and any pressing community matters.
3. Set clear time limits for each agenda item to prevent any single topic from consuming the entire meeting.
4. During the session, ensure every council member has opportunity to speak — consider using a structured round-robin format for the first meeting.
5. Record minutes in real time, capturing decisions made, action items assigned, and dissenting views noted.
6. Close the meeting with a summary of decisions and next steps, and distribute the minutes to all community members within 48 hours.
7. Completion indicator: inaugural shura meeting conducted, minutes distributed, and at least three actionable decisions recorded and assigned.` },
      ],
    },
    {
      title: "Recruit and vet founding families — the Ansar-Muhajirun model of intentional community formation",
      priority: 'urgent', tags: ['hijrah', 'recruitment', 'ansar-muhajirun'],
      description: "The community is built on the quality and commitment of its founding families, not on rapid growth. The Prophetic model paired Muhajirun (those who migrated) with Ansar (those who hosted), creating bonds of mutual obligation that transcended tribal identity. Recruitment must be intentional, transparent, and grounded in shared values — not in marketing or desperation to fill land.",
      subtasks: [
        { title: "Define the founding family profile — values, skills, and commitment criteria", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 8:72",
              arabic: "إِنَّ الَّذِينَ آمَنُوا وَهَاجَرُوا وَجَاهَدُوا بِأَمْوَالِهِمْ وَأَنفُسِهِمْ فِي سَبِيلِ اللَّهِ وَالَّذِينَ آوَوا وَّنَصَرُوا أُولَٰئِكَ بَعْضُهُمْ أَوْلِيَاءُ بَعْضٍ",
              translation: "Indeed, those who have believed and emigrated and fought with their wealth and lives in the cause of Allah and those who gave shelter and aided — they are allies of one another. This defines the founding family bond.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Not every interested family is a good fit for a founding cohort, and that is not a judgement on their worth — it is a recognition that founding a community requires specific capacities and commitments that not everyone is in a position to offer at this moment. The Muhajirun who made hijrah to Madinah were distinguished not by wealth or status but by their willingness to sacrifice, adapt, and build. Defining a clear profile prevents the community from accepting members who cannot sustain the founding demands, which protects both the community and the families themselves from a painful mismatch.


**How?**

1. List the values that founding families must demonstrably share: commitment to Islamic governance, willingness to live in close community, acceptance of the covenant's obligations, and readiness to contribute labour and resources during the building phase.
2. Identify practical skills the founding cohort needs collectively (not individually): construction, agriculture, education, healthcare, administration, and conflict mediation.
3. Define minimum commitment criteria: financial contribution capacity, physical relocation timeline, participation in pre-move planning, and agreement to a probationary period.
4. Distinguish between essential criteria (must be met) and desirable criteria (strengthen the cohort but are not disqualifying if absent).
5. Create a one-page founding family profile document that can be shared with prospective members.
6. Have the existing founding members review and approve the profile before recruitment begins.
7. Completion indicator: a published founding family profile document, approved by current founding members, ready for distribution to prospective families.` },
        { title: "Design the vetting process — application, interview, mutual discernment, and trial period", done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 3937",
              translation: "When the emigrants arrived in Madinah, the Prophet (peace be upon him) established a bond of fraternity between the Muhajirun and the Ansar — pairing each newcomer with a host who would share resources and discernment. The vetting process follows this Prophetic precedent of mutual matching.",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic precedent of structured Muhajir/Ansar pairing as a model for mutual discernment between prospective and existing members. Re-verified 2026-05-02 against NotebookLM Muslim Scholar — original ref Sahih al-Bukhari 2533 was incorrect (that hadith concerns mudabbar slave emancipation, unrelated to vetting); corrected to Bukhari 3937 which matches the translation text.",
            },
          ],
          description: `**Why?**

A vetting process protects the community from premature commitments and protects prospective families from joining something that does not match their expectations. The Prophet (peace be upon him) took the Bay'ah (pledge of allegiance) only after thorough explanation of what was being committed to — the pledges at Aqabah were preceded by extensive dialogue, questions, and mutual understanding. Your vetting process is the modern equivalent: a structured journey from initial interest to full membership that gives both parties the information they need to commit wisely.


**How?**

1. Create a written application form that gathers: family composition, Islamic practice background, motivations for joining, skills and professional experience, financial capacity, and any concerns or special needs.
2. Design a two-stage interview process: first, a general introduction meeting with existing founding families (informal, relationship-building); second, a deeper conversation with the shura council covering covenant obligations, governance expectations, and practical logistics.
3. Build in a mutual discernment period (e.g., 3-6 months) during which prospective families attend community gatherings, participate in planning meetings, and spend time on the land without making a binding commitment.
4. Establish clear criteria for acceptance and for declining an application, communicated transparently at the start of the process.
5. Define a trial residency period (e.g., 6-12 months) after acceptance during which membership can be amicably dissolved by either party without financial penalty beyond pro-rated contribution refunds.
6. Document the entire process in a guide that is given to every prospective family at first contact.
7. Completion indicator: a complete vetting process document with application form, interview guides, discernment timeline, and trial period terms, approved by the shura council.` },
        { title: "Conduct outreach through trusted networks — mosques, Islamic organisations, and personal referrals", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:104",
              arabic: "وَلْتَكُن مِّنكُمْ أُمَّةٌ يَدْعُونَ إِلَى الْخَيْرِ",
              translation: "And let there be [arising] from you a nation inviting to [all that is] good. Outreach through trusted networks is targeted da'wah to goodness.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The best founding members come through trusted relationships, not open advertisements. The Prophet (peace be upon him) built the early Muslim community through personal da'wah and trusted networks — Khadijah, Abu Bakr, Uthman, and Ali were all brought in through direct relationship. Cold outreach attracts curiosity-seekers and idealists who may not have the resilience for the demanding founding phase. Trusted networks provide social vetting that complements your formal process and produces candidates who arrive with existing bonds of trust.


**How?**

1. Identify 5-10 trusted nodes in your network: imams, community leaders, Islamic school administrators, and individuals whose judgement you trust regarding character and commitment.
2. Prepare a brief, honest description of the community vision — not a sales pitch but a clear statement of what you are building, what it requires, and what kind of families you are seeking.
3. Share this description personally with each trusted contact and ask them to recommend families they believe would be a genuine fit — not families who merely "seem interested."
4. Attend gatherings at mosques and Islamic organisations to present the vision in person, allowing for questions and honest conversation.
5. Respond to every inquiry with the founding family profile and vetting process guide, setting expectations from the first interaction.
6. Track all inquiries and their status in a simple pipeline: inquiry received, information sent, initial meeting scheduled, discernment period active, application submitted, decision made.
7. Completion indicator: outreach conducted through at least 5 trusted networks, with a pipeline of at least 3-5 prospective families in various stages of engagement.` },
        { title: "Pair prospective Muhajirun families with existing Ansar families for mutual support and mentorship", done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 3937",
              translation: "The Prophet (peace be upon him) established brotherhood (mu'akhah) between the Muhajirun and Ansar upon arriving in Madinah, pairing each emigrant family with a host family for mutual support and mentorship. This is the direct precedent for pairing Muhajirun with Ansar families.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) paired every Muhajir with an Ansari upon arrival in Madinah, creating bonds of brotherhood (mu'akhah) that provided immediate social, economic, and emotional support. This was not symbolic — the Ansar shared their homes, businesses, and even offered to divorce a wife so a Muhajir could marry. While your community may not require that level of sacrifice, the structural principle is essential: newcomers who arrive without an established relationship to an existing family are far more likely to feel isolated, confused, and eventually leave. Pairing creates belonging from day one.


**How?**

1. Identify which existing founding families have the capacity and temperament to serve as Ansar hosts — this requires emotional generosity, patience, and practical resources, not just willingness.
2. Match based on complementary factors: family composition (families with similar-aged children bond more naturally), language, professional background, and temperament.
3. Define the Ansar family's responsibilities: orientation to the land and community, introduction to other families, assistance with practical settlement logistics, and serving as the newcomer's first point of contact for questions and concerns.
4. Define the Muhajir family's responsibilities: proactive engagement, honest communication about struggles, participation in community activities, and respect for the Ansar family's boundaries.
5. Create a structured check-in schedule: weekly for the first month, biweekly for months 2-3, monthly thereafter.
6. Gather feedback from both families at each stage and adjust pairings if the relationship is not functioning well.
7. Completion indicator: every incoming family paired with an Ansar family, with a documented support plan and check-in schedule in place.` },
        { title: "Formalise the founding cohort — conduct a collective bay'ah (pledge) ceremony", done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 1709",
              translation: "The Companions gave bay'ah (pledge of allegiance) to the Prophet (peace be upon him) at Aqabah and under the tree at Hudaybiyyah, committing to mutual support and obedience in good. A collective bay'ah ceremony follows this Prophetic model of communal commitment.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The bay'ah is the moment when individual interest becomes collective commitment. The pledges at Aqabah were not casual agreements — they were solemn, witnessed commitments made with full understanding of the costs and obligations involved. A formal ceremony marking the formation of the founding cohort creates a shared memory, a point of reference, and a spiritual anchor for the community's identity. It transforms a group of families who happen to share a vision into a community that has covenanted before Allah to build something together.


**How?**

1. Schedule the ceremony after all founding families have completed the vetting process and signed the Mithaq — this is not a recruitment event but a ratification of existing commitments.
2. Choose a meaningful location: the community land itself (if accessible), a mosque, or a significant gathering space.
3. Structure the ceremony: opening with Quran recitation (Surah al-Hashr 59:9-10 is particularly appropriate), a reading of the covenant's preamble, individual statements of commitment from each family, collective du'a, and a shared meal.
4. Have each family head publicly affirm their commitment to the covenant in the presence of all other founding families and witnesses.
5. Document the event: photographs, a written record of who was present and what was pledged, and the date.
6. Distribute a commemorative copy of the covenant with all signatures to each family as a tangible reminder of the day.
7. Completion indicator: bay'ah ceremony conducted with all founding families present, documented, and commemorated.` },
      ],
    },
    {
      title: "Establish basic infrastructure — housing, worship space, water, and food systems for founding families",
      priority: 'urgent', tags: ['infrastructure', 'land', 'tamkin'],
      description: "A community cannot form without the physical conditions for dignified life. Before families commit to relocation, the land must provide — at minimum — shelter, clean water, a designated prayer space, and a pathway to food production. This task prioritises function over aesthetics: the goal is habitable, safe, and Shariah-compliant infrastructure that allows families to live, worship, and eat while permanent structures are planned.",
      subtasks: [
        { title: "Assess the land for water access, soil quality, natural shelter, and hazards", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 23:18",
              arabic: "وَأَنزَلْنَا مِنَ السَّمَاءِ مَاءً بِقَدَرٍ فَأَسْكَنَّاهُ فِي الْأَرْضِ ۖ وَإِنَّا عَلَىٰ ذَهَابٍ بِهِ لَقَادِرُونَ",
              translation: "We sent water down from the sky in due measure and lodged it in the earth — We have the power to take it all away if We so wish.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 13:4",
              arabic: "وَفِي الْأَرْضِ قِطَعٌ مُّتَجَاوِرَاتٌ وَجَنَّاتٌ مِّنْ أَعْنَابٍ وَزَرْعٌ وَنَخِيلٌ صِنْوَانٌ وَغَيْرُ صِنْوَانٍ يُسْقَىٰ بِمَاءٍ وَاحِدٍ وَنُفَضِّلُ بَعْضَهَا عَلَىٰ بَعْضٍ فِي الْأُكُلِ ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَعْقِلُونَ",
              translation: "There are, in the land, neighbouring plots, gardens of vineyards, cornfields, palm trees in clusters or otherwise, all watered with the same water, yet We make some of them taste better than others: there truly are signs in this for people who reason.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 67:15",
              arabic: "هُوَ ٱلَّذِى جَعَلَ لَكُمُ ٱلْأَرْضَ ذَلُولًۭا فَٱمْشُوا۟ فِى مَنَاكِبِهَا وَكُلُوا۟ مِن رِّزْقِهِۦ ۖ وَإِلَيْهِ ٱلنُّشُورُ",
              translation: "It is He who has made the earth manageable for you––travel its regions; eat His provision- and to Him you will be resurrected.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Ibn Majah 2473",
              translation: "The Prophet (peace be upon him) said: \"Muslims are partners in three things: water, pasture, and fire.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Every infrastructure decision depends on what the land itself offers and constrains. Building before assessing is how communities waste resources on structures that flood, wells that run dry, and crops that fail. The Quran repeatedly draws attention to the earth as a prepared, purposeful creation (Quran 67:15) — khalifah responsibility begins with understanding what Allah has provided before imposing human plans upon it. A thorough land assessment prevents costly mistakes and reveals opportunities that would otherwise be missed.


**How?**

1. Commission or conduct a water assessment: test existing wells or boreholes for flow rate and water quality, identify natural springs or waterways, and assess rainfall patterns and groundwater levels.
2. Conduct soil testing in multiple locations across the property to determine fertility, drainage, contamination risks, and suitability for agriculture and construction.
3. Walk the entire property and map natural features: elevation changes, flood-prone areas, wind exposure, sun orientation, existing vegetation, and any natural shelter (tree cover, rock formations, existing structures).
4. Identify hazards: erosion-prone slopes, areas with poor drainage, proximity to industrial or agricultural contamination, and any legal encumbrances on land use.
5. Consult local farmers or land managers for historical knowledge about the property and its surroundings.
6. Compile findings into a single land assessment report with maps and photographs.
7. Completion indicator: a comprehensive land assessment report documenting water, soil, topography, and hazards, shared with all founding families and the shura council.` },
        { title: "Establish reliable water supply — well, rainwater harvesting, or municipal connection", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 50:9",
              arabic: "وَنَزَّلْنَا مِنَ السَّمَاءِ مَاءً مُّبَارَكًا فَأَنبَتْنَا بِهِ جَنَّاتٍ وَحَبَّ الْحَصِيدِ",
              translation: "and how We send blessed water down from the sky and grow with it gardens, the harvest grain.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Ibn Majah 2473",
              translation: "The Prophet (peace be upon him) said: \"Muslims are partners in three things: water, pasture, and fire.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Water is the most non-negotiable infrastructure element. Establishing water access before construction begins ensures that every subsequent infrastructure decision is built on a secure foundation rather than a hope that water will be solved later.

**How?**

1. Based on the land assessment, determine the most viable primary water source: existing well (test output and quality), new borehole (engage a licensed driller), rainwater harvesting (calculate roof catchment area needed), or municipal connection (apply for service).
2. Ensure the primary source can supply the estimated founding population — calculate daily needs at approximately 200 litres per person per day for all uses.
3. Install a secondary or backup water source: if the primary is a well, add rainwater tanks; if municipal, install a backup tank with gravity feed.
4. Test water quality through an accredited laboratory for potability — do not assume any source is safe without testing.
5. Install basic filtration and treatment if needed: UV sterilisation, sediment filters, or chlorination systems appropriate to the source.
6. Set up a simple distribution system: at minimum, a tap point accessible to each dwelling and the communal prayer and kitchen areas.
7. Completion indicator: a functioning water supply delivering tested, potable water to all dwelling areas and communal spaces.` },
        { title: "Set up temporary or permanent housing sufficient for all founding families", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 16:80",
              arabic: "وَاللَّهُ جَعَلَ لَكُم مِّن بُيُوتِكُمْ سَكَنًا",
              translation: "And Allah has made for you from your homes a place of rest.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 2:125",
              arabic: "وَإِذْ جَعَلْنَا الْبَيْتَ مَثَابَةً لِّلنَّاسِ وَأَمْنًا",
              translation: "And when We made the House a place of return for the people and a place of security.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 2346",
              translation: "The Prophet (peace be upon him) said: \"Whoever among you wakes up secure in his dwelling, healthy in his body, having food for his day — it is as if the entire world has been gathered for him.\"",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Families will not — and should not — relocate to land where they cannot live in basic dignity. Housing does not need to be permanent or luxurious at the founding stage, but it must provide safety, privacy, weather protection, and enough space for family life including children's sleep, study, and play. The Prophet (peace be upon him) himself lived in modest rooms attached to the masjid in Madinah — simplicity is a virtue, but exposure and overcrowding are not. Providing adequate shelter is the most tangible expression of the community's commitment to its members.


**How?**

1. Survey available options based on budget and timeline: renovating existing structures on the land, prefabricated or modular homes, converted shipping containers, permanent tent or yurt structures, or new construction.
2. Define minimum standards: each family unit must have a private sleeping area, a bathroom or access to sanitary facilities, cooking capability, heating or cooling appropriate to the climate, and secure storage for belongings.
3. Ensure all housing is Shariah-compliant in layout: adequate privacy between family units, separate facilities for unrelated men and women in communal areas, and qiblah orientation considered in design.
4. Prioritise speed and adequacy over perfection — founding-phase housing can be upgraded later; the goal is to be habitable within the community's timeline for first arrivals.
5. Engage qualified tradespeople for electrical, plumbing, and structural work — do not compromise on safety to save costs.
6. Establish a housing allocation process that is transparent and equitable, not based on financial contribution alone.
7. Completion indicator: housing ready for occupancy by all founding families, inspected for safety, and allocated through a transparent process.` },
        { title: "Designate and prepare a communal prayer space (musalla)", done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 450",
              translation: "The Prophet (peace be upon him) first built the masjid upon arriving in Madinah, establishing the prayer space as the centre of community life. Designating and preparing a musalla follows this foundational Prophetic act.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 72:18",
              arabic: "وَأَنَّ الْمَسَاجِدَ لِلَّهِ فَلَا تَدْعُوا مَعَ اللَّهِ أَحَدًا",
              translation: "And [He revealed] that the mosques are for Allah, so do not invoke with Allah anyone.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The first act of the Prophet (peace be upon him) upon arriving in Madinah was to establish the masjid — not as an afterthought but as the foundational institution of community life. The musalla is where the community gathers five times daily, where shura meetings are held, where children learn, and where the bonds of brotherhood are renewed through standing shoulder to shoulder in salah. A community without a dedicated prayer space is a collection of households, not an ummah. This space does not need to be grand, but it must exist and be honoured from day one.


**How?**

1. Select a location that is central and accessible to all dwellings — the musalla should be within easy walking distance for everyone, including elderly members and children.
2. Determine whether to use an existing structure (repurposed building, large room), a temporary structure (tent, marquee), or build a simple dedicated space.
3. Ensure the space is clean, weather-protected, and large enough to accommodate all community members for jumu'ah (Friday) prayer with room for growth.
4. Determine and mark the qiblah direction accurately using a reliable compass or GPS-based qiblah finder.
5. Provide basic amenities: wudu facilities with clean water and drainage, shoe storage, clean floor covering (carpet, rugs, or mats), and a simple sound system if the space is large.
6. Designate a separate area or partition for women that provides equal access to the imam's voice and participation in community gatherings.
7. Completion indicator: a functioning musalla with verified qiblah, wudu facilities, floor covering, and adequate space for the entire founding community.` },
        { title: "Establish initial food production or supply systems — garden, livestock, or cooperative purchasing", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 80:24-32",
              arabic: "فَلْيَنظُرِ الْإِنسَانُ إِلَىٰ طَعَامِهِ * أَنَّا صَبَبْنَا الْمَاءَ صَبًّا * ثُمَّ شَقَقْنَا الْأَرْضَ شَقًّا * فَأَنبَتْنَا فِيهَا حَبًّا",
              translation: "Then let mankind look at his food — how We poured down water in torrents, then We broke open the earth, splitting it, and caused to grow therein grain.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 6:141",
              arabic: "كُلُوا مِن ثَمَرِهِ إِذَا أَثْمَرَ وَآتُوا حَقَّهُ يَوْمَ حَصَادِهِ",
              translation: "Eat of their fruit when they bear fruit, and pay the due thereof on the day of its harvest.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 1553a",
              translation: "The Prophet (peace be upon him) said: \"There is no Muslim who plants a tree or sows seeds, and then a bird, or a person, or an animal eats from it, except that it is regarded as a charitable gift for him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Food security is both a practical necessity and a spiritual aspiration. Even at the founding stage, establishing some level of food production — however small — builds the skills, rhythms, and self-reliance that the community will need as it grows. It also connects families to the earth in a way that grocery shopping never can.

**How?**

1. Based on the soil assessment, identify the most viable immediate food production: raised-bed vegetable gardens, fruit tree planting (long-term investment), poultry for eggs, small livestock (goats or sheep) if land permits, or a combination.
2. Start with high-yield, low-maintenance crops appropriate to the climate and season — leafy greens, herbs, tomatoes, beans, and squash are common starting points.
3. Designate communal garden plots and, if desired, individual family plots — define who maintains what and how harvest is shared.
4. For needs that cannot be grown immediately, establish a cooperative purchasing arrangement: bulk buying from local farms, halal meat sourcing, and shared pantry staples reduce costs and build solidarity.
5. Ensure halal standards are maintained in all food production: proper slaughter methods, no prohibited substances in animal feed, and organic practices where possible.
6. Appoint a food coordinator to manage planting schedules, harvest distribution, and cooperative purchasing logistics.
7. Completion indicator: at least one food production system operational (garden, poultry, or cooperative purchasing) with a coordinator assigned and a 3-month supply plan documented.` },
      ],
    },
    {
      title: "Build the newcomer onboarding process — from first inquiry to full integration",
      priority: 'urgent', tags: ['onboarding', 'integration', 'ta\'aruf'],
      description: "A community that cannot onboard new members effectively will either stagnate or fracture as unprepared newcomers collide with established norms. The onboarding process must systematically move a family from initial curiosity through informed commitment to genuine belonging. This is the community's immune system and its hospitality in one system — filtering for fit while welcoming with open arms those who belong.",
      subtasks: [
        { title: "Create a newcomer information pack — vision, covenant summary, expectations, and FAQ", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 16:125",
              arabic: "ادْعُ إِلَىٰ سَبِيلِ رَبِّكَ بِالْحِكْمَةِ وَالْمَوْعِظَةِ الْحَسَنَةِ",
              translation: "Invite to the way of your Lord with wisdom and good instruction.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 49:13",
              arabic: "يَا أَيُّهَا النَّاسُ إِنَّا خَلَقْنَاكُم مِّن ذَكَرٍ وَأُنثَىٰ وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا",
              translation: "O mankind, We created you from a male and a female and made you into nations and tribes, that you may know one another.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6018",
              translation: "The Prophet (peace be upon him) said: \"Whoever believes in Allah and the Last Day, let him be generous to his guest.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

First impressions shape expectations, and misaligned expectations are the primary reason newcomers leave communities. An information pack ensures every prospective family receives the same accurate, complete picture of what the community is, what it requires, and what it offers — before they invest emotional energy in the idea of joining. This prevents the painful cycle of idealisation followed by disillusionment that plagues intentional communities. Transparency at the gate is the greatest act of hospitality because it respects the family's right to make an informed decision.


**How?**

1. Write a clear, honest vision statement: what the community is building, why, and the Islamic principles that ground it — avoid utopian language and be specific about current realities versus future aspirations.
2. Include a plain-language summary of the Mithaq (full text available on request), highlighting both the commitments required and the rights guaranteed.
3. List practical expectations: financial contributions, participation requirements, governance obligations, lifestyle norms, and conflict resolution processes.
4. Compile a FAQ addressing the most common questions and concerns prospective families raise — housing, schooling, employment, privacy, autonomy, and what happens if they decide to leave.
5. Include photographs of the land, existing infrastructure, and community gatherings to give a realistic visual impression.
6. Have two or three existing members review the pack for accuracy and tone — it should be warm but honest, inviting but not misleading.
7. Completion indicator: a polished newcomer information pack, approved by the shura council, ready for distribution to all prospective families.` },
        { title: "Design a structured orientation programme for newly accepted families", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:13",
              arabic: "يَا أَيُّهَا النَّاسُ إِنَّا خَلَقْنَاكُم مِّن ذَكَرٍ وَأُنثَىٰ وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا",
              translation: "O mankind, indeed We have created you from male and female and made you peoples and tribes that you may know one another. A structured orientation programme facilitates this ta'aruf between new and existing families.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Acceptance is not the end of the journey — it is the beginning of the most vulnerable phase. A newly accepted family must learn the community's rhythms, relationships, governance processes, shared spaces, and unwritten norms in a short period while simultaneously managing the stress of relocation. Without structured orientation, newcomers piece together understanding through trial and error, often making avoidable mistakes that damage relationships before they have had time to form. An orientation programme compresses the learning curve and demonstrates that the community has invested in their success.


**How?**

1. Design a phased orientation spanning the first 90 days: Week 1 (arrival and settling), Weeks 2-4 (introduction to systems and people), Months 2-3 (deeper integration and first contributions).
2. Week 1 content: tour of the land and facilities, introduction to their Ansar family, walkthrough of daily rhythms (prayer times, communal meals, quiet hours), and distribution of practical guides (waste disposal, water usage, emergency contacts).
3. Weeks 2-4 content: attendance at a shura meeting as observers, meeting with the treasurer to understand financial systems, introduction to all community families in structured social settings, and participation in at least one communal work project.
4. Months 2-3 content: assignment of a community role or project based on their skills and interests, feedback conversation with the welfare coordinator, and first formal check-in with the shura council.
5. Assign an orientation coordinator (could be the Ansar family or a dedicated role) responsible for ensuring the programme is followed.
6. Create a simple checklist that tracks completion of each orientation milestone.
7. Completion indicator: a written 90-day orientation programme with weekly milestones, assigned coordinator role, and tracking checklist, approved by the shura council.` },
        { title: "Establish a mentorship system pairing each new family with a settled community family", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 9:71",
              arabic: "وَالْمُؤْمِنُونَ وَالْمُؤْمِنَاتُ بَعْضُهُمْ أَوْلِيَاءُ بَعْضٍ",
              translation: "The believing men and believing women are allies of one another.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 5:2",
              arabic: "وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ",
              translation: "And cooperate in righteousness and piety.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6011",
              translation: "The Prophet (peace be upon him) said: \"The believers, in their mutual kindness, compassion, and sympathy, are just like one body. When one limb suffers, the whole body responds to it with wakefulness and fever.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Formal orientation covers systems and structures, but belonging is built through relationships. A mentorship pairing gives each new family a trusted guide who can answer the questions that are too small for official channels but too important for guesswork: "Where do people usually park?", "Is it okay to play music in my garden?", "Who should I talk to about my child's learning needs?" These micro-questions, left unanswered, create a slow accumulation of alienation. A dedicated mentor family ensures no newcomer has to navigate community life alone during the critical first months.


**How?**

1. Identify settled families willing and suited to serve as mentors — this is an extension of the Ansar-Muhajirun pairing but may involve different families as the community grows beyond the founding cohort.
2. Match based on family composition, interests, and temperament — a young family with toddlers benefits from a mentor family who has navigated community life with small children.
3. Define the mentor family's role: proactive check-ins (not waiting to be asked), invitation to social gatherings, practical assistance with settling in, honest answers to questions about community norms, and confidential space to express concerns.
4. Set a structured check-in cadence: at least weekly for the first month, biweekly for months 2-3, and monthly thereafter until both families agree formal mentorship is no longer needed.
5. Provide mentor families with a brief guide covering common newcomer challenges and how to support without overstepping boundaries.
6. Gather feedback from both families at the 90-day mark and make adjustments if the pairing is not working.
7. Completion indicator: a mentorship programme with matching criteria, mentor guide, check-in schedule, and feedback mechanism, integrated into the onboarding process.` },
        { title: "Create a community orientation handbook covering governance, daily rhythms, and shared norms", done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 69",
              translation: "The Prophet (peace be upon him) said: \"Make things easy for people and do not make them difficult, and give them glad tidings and do not make them run away.\" A comprehensive orientation handbook makes integration easy and welcoming.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Unwritten norms are invisible fences that trip newcomers and breed resentment among established members when new families unknowingly violate them. A handbook makes the implicit explicit, giving every family a single reference document for how community life works in practice. It answers the question "How do we do things here?" without requiring newcomers to ask questions they do not yet know to ask. This is not bureaucracy — it is mercy, because it prevents the embarrassment and conflict that arise from well-meaning ignorance.


**How?**

1. Document governance essentials: how shura works, when meetings occur, how to raise issues, how decisions are communicated, and how to access community financial records.
2. Document daily and weekly rhythms: prayer times and gathering expectations, communal meal schedules, quiet hours, children's outdoor play areas and times, and shared space booking procedures.
3. Document practical norms: waste and recycling procedures, parking, visitor policies, noise expectations, animal management, shared tool usage and return, and emergency procedures.
4. Document social norms: how disputes are raised (not publicly but through the defined process), expectations around gender interactions in shared spaces, and hospitality customs (greeting new visitors, communal cooking rotation).
5. Keep the tone warm and explanatory, not legalistic — explain the "why" behind each norm so newcomers understand the spirit, not just the letter.
6. Include a "Who to Ask" directory with names and roles for common questions.
7. Completion indicator: a printed and digital community handbook, distributed to all current members and included in the newcomer information pack, with a review cycle set for annual updates.` },
        { title: "Implement a 6-month integration review — structured check-in with new families and the shura council", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 59:18",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللَّهَ وَلْتَنظُرْ نَفْسٌ مَّا قَدَّمَتْ لِغَدٍ",
              translation: "O you who have believed, fear Allah. And let every soul look to what it has put forth for tomorrow. A 6-month integration review is structured self-examination for both the family and the community.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Onboarding is not complete when the orientation checklist is ticked off — it is complete when the family genuinely belongs. A 6-month integration review provides a formal moment for both the community and the new family to honestly assess how integration is progressing. It surfaces problems that informal interactions might not reveal: quiet dissatisfaction, unmet needs, unresolved conflicts, or mismatched expectations. Without this structured review, struggling families either leave without explanation or stay while building resentment that eventually erupts in more damaging ways.


**How?**

1. Schedule the review at the 6-month mark after a family's arrival — this is a non-negotiable part of the onboarding process, not an optional follow-up.
2. Prepare a brief questionnaire for the new family covering: sense of belonging, satisfaction with housing and infrastructure, relationship quality with other families, understanding of governance, unresolved concerns, and suggestions for improvement.
3. Separately gather feedback from the mentor family, the welfare coordinator, and at least two other community members who interact regularly with the new family.
4. Conduct the review as a confidential conversation between the new family and a small shura delegation (2-3 members), not a public assessment.
5. Address any concerns raised with specific, actionable plans — vague reassurances are insufficient.
6. If integration is progressing well, formally welcome the family as fully integrated members and celebrate the milestone.
7. Completion indicator: a documented 6-month integration review process with questionnaire, feedback mechanism, and action planning template, integrated into the onboarding system.` },
      ],
    },
  ],

  // ── GROWTH ── deepening community bonds, systems, and resilience
  moontrance_residency_growth: [
    {
      title: "Launch a structured ta'aruf programme — building deep knowing across all community families",
      priority: 'urgent', tags: ['ta\'aruf', 'diversity', 'belonging'],
      description: "Ta'aruf (mutual knowing) is a Quranic imperative: 'We made you into nations and tribes so that you may know one another' (49:13). This is not casual socialising but structured, intentional relationship-building that crosses the natural cliques of family similarity, age, and background. A ta'aruf programme ensures no family exists in isolation within the community and that diversity is experienced as richness rather than friction.",
      subtasks: [
        { title: "Design monthly family exchange gatherings — rotating hosts, structured conversation, shared meals", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:13",
              arabic: "يَا أَيُّهَا النَّاسُ إِنَّا خَلَقْنَاكُم مِّن ذَكَرٍ وَأُنثَىٰ وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا",
              translation: "O mankind, We created you from a male and a female and made you into nations and tribes, that you may know one another.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 49:10",
              arabic: "إِنَّمَا الْمُؤْمِنُونَ إِخْوَةٌ فَأَصْلِحُوا بَيْنَ أَخَوَيْكُمْ",
              translation: "The believers are but brothers, so make reconciliation between your brothers.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2564",
              translation: "The Prophet (peace be upon him) said: \"None of you truly believes until he loves for his brother what he loves for himself.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Left to their own devices, families gravitate toward those most similar to them — same language, same culture, same age group, same economic class. This produces a community that is technically diverse but socially fragmented into cliques. Monthly family exchanges deliberately cross these lines by pairing families who would not naturally spend time together. The shared meal creates intimacy, the structured conversation prevents superficiality, and the rotating format ensures every family hosts and every family is hosted — eliminating status hierarchies embedded in who always gives and who always receives.


**How?**

1. Create a rotation matrix ensuring every family pair meets at least once per year — for a community of 15 families, this means careful scheduling across 12 months.
2. Assign hosting duties on a rotating basis: the host family prepares the meal and the physical space; the visiting family contributes a dish or ingredient.
3. Provide structured conversation starters for each gathering — not therapy-style deep questions but prompts that reveal values, histories, and aspirations: "What did your family do for Eid when you were growing up?", "What skill do you wish you could teach your children?", "What is one thing about this community that surprised you?"
4. Keep gatherings small: two families at a time, plus children. Intimacy requires containment.
5. After each gathering, both families submit a brief, anonymous feedback form: "Did you learn something new about the other family? Did any concerns arise?"
6. Review feedback quarterly and adjust pairings or conversation formats based on what is working and what feels forced.
7. Completion indicator: a 12-month ta'aruf calendar published, first two months of gatherings completed, and feedback mechanism functioning.` },
        { title: "Establish a community storytelling night — families share their hijrah narratives", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 59:9",
              arabic: "وَالَّذِينَ تَبَوَّءُوا الدَّارَ وَالْإِيمَانَ مِن قَبْلِهِمْ يُحِبُّونَ مَنْ هَاجَرَ إِلَيْهِمْ",
              translation: "And those who were settled in the Home (Madinah) and in faith before them love those who emigrated to them.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 8:72",
              arabic: "إِنَّ الَّذِينَ آمَنُوا وَهَاجَرُوا وَجَاهَدُوا بِأَمْوَالِهِمْ وَأَنفُسِهِمْ فِي سَبِيلِ اللَّهِ وَالَّذِينَ آوَوا وَّنَصَرُوا أُولَـٰئِكَ بَعْضُهُمْ أَوْلِيَاءُ بَعْضٍ",
              translation: "Indeed, those who believed and emigrated and fought with their wealth and lives in the cause of Allah, and those who gave shelter and aided — they are allies of one another.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 3937",
              translation: "The Prophet (peace be upon him) established brotherhood (mu'akhah) between the Muhajirun and the Ansar, pairing each emigrant family with a host family from Madinah.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Every family in the community made a hijrah — a migration from the world they knew into this shared experiment. These stories are the community's living heritage, and when they are shared publicly, they create bonds of empathy that transcend daily friction. Hearing why a family left their previous life, what they sacrificed, and what they hope for transforms them from "the family in house 7" into people with depth, courage, and vulnerability. Storytelling nights build the emotional infrastructure that sustains a community through hardship — you endure more for people whose stories you carry in your heart.


**How?**

1. Schedule storytelling nights quarterly — frequent enough to become a tradition, spaced enough to allow preparation and anticipation.
2. Invite 2-3 families per evening to share their hijrah narrative: what brought them here, what they left behind, and what they hope to build.
3. Provide optional guiding questions in advance so families can prepare, but allow freedom in format — some may speak, others may show photographs, and some may have their children contribute.
4. Create a warm, intimate setting: soft lighting, comfortable seating in a circle, tea and light refreshments, and a clear beginning and end to the formal programme.
5. Establish ground rules: what is shared in the circle stays in the circle unless the speaker gives permission, no interruptions during a family's story, and questions are held until the speaker invites them.
6. Archive stories (with permission) in a community memory book — written summaries, not recordings, to encourage honesty over performance.
7. Completion indicator: first storytelling night conducted, at least 3 families participated, feedback gathered, and next event scheduled.` },
        { title: "Create intergenerational and cross-cultural activity groups — gardens, crafts, sports, and learning circles", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:13",
              arabic: "وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا",
              translation: "And made you into nations and tribes, that you may know one another.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 30:22",
              arabic: "وَمِنْ آيَاتِهِ خَلْقُ السَّمَاوَاتِ وَالْأَرْضِ وَاخْتِلَافُ أَلْسِنَتِكُمْ وَأَلْوَانِكُمْ",
              translation: "And among His signs is the creation of the heavens and the earth and the diversity of your languages and your colors.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2586",
              translation: "The Prophet (peace be upon him) said: \"Do not envy one another, do not inflate prices for one another, do not hate one another, do not turn away from one another, and do not undercut one another. Be, O servants of Allah, brothers.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Formal gatherings build respect; shared activities build friendship. A community where the only structured interaction is shura meetings and prayer is one where relationships remain functional rather than affectionate. Activity groups — designed to mix generations, cultures, and skill levels — create the organic connections that make community life joyful rather than merely dutiful. When a teenager helps an elder in the garden, when a Somali mother teaches Palestinian children to cook, when families compete together in a friendly football match — these are the moments that weave the social fabric tighter than any covenant document can.


**How?**

1. Survey all community members for interests and skills they would like to share or develop — cast a wide net: gardening, woodworking, sewing, cooking, martial arts, calligraphy, beekeeping, sports, reading circles, and beyond.
2. Form groups of 5-10 people based on shared interest, deliberately mixing ages, cultures, and family units — no group should be composed entirely of one demographic.
3. Assign each group a weekly or biweekly time slot and a designated meeting space or outdoor area.
4. Rotate group leadership monthly so no single person bears the organisational burden permanently.
5. Provide basic resources for each group's activity from the community fund — seeds for the garden group, tools for the workshop, books for the reading circle.
6. Host a quarterly "showcase" where groups share what they have produced or learned with the wider community.
7. Completion indicator: at least 4 activity groups launched with mixed demographics, regular schedules established, and first quarterly showcase completed.` },
        { title: "Implement a community language and culture exchange — celebrating the diversity within the ummah", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 30:22",
              arabic: "وَمِنْ آيَاتِهِ خَلْقُ السَّمَاوَاتِ وَالْأَرْضِ وَاخْتِلَافُ أَلْسِنَتِكُمْ وَأَلْوَانِكُمْ ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّلْعَالِمِينَ",
              translation: "And among His signs is the creation of the heavens and the earth and the diversity of your languages and your colors. Indeed in that are signs for those of knowledge.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 49:13",
              arabic: "إِنَّ أَكْرَمَكُمْ عِندَ اللَّهِ أَتْقَاكُمْ",
              translation: "Indeed, the most noble of you in the sight of Allah is the most righteous of you.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Musnad Ahmad 23489",
              translation: "The Prophet (peace be upon him) said in his Farewell Sermon: \"There is no superiority of an Arab over a non-Arab, or of a non-Arab over an Arab, except by taqwa.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Quran describes human diversity in language and colour as a sign of Allah's creative power (30:22) and frames knowing one another across tribal and national lines as the purpose of that diversity (49:13). A community that happens to contain Somali, Arab, South Asian, and convert families but never engages with that diversity has missed the Quranic point entirely. A structured language and culture exchange makes diversity a resource rather than a source of misunderstanding — it teaches children that Islam is not the property of any one culture and gives adults the vocabulary to appreciate rather than merely tolerate their neighbours.


**How?**

1. Schedule monthly "Culture Spotlight" evenings where one family or cultural group presents their heritage: traditional food, language basics, cultural practices, and how Islam is expressed in their homeland.
2. Establish informal language exchange partnerships: community members who want to learn Arabic, Somali, Urdu, or any other language spoken in the community are paired with native speakers for weekly practice sessions.
3. Celebrate cultural occasions that do not contradict Islamic principles: harvest festivals, cultural dress days, and traditional crafts workshops.
4. Create a multilingual signage initiative: key community signs (musalla, kitchen, garden, shura hall) are written in all languages represented in the community.
5. Encourage children's participation: cultural show-and-tell at the community school, multilingual storytime, and a "heritage passport" where children collect experiences from each culture.
6. Document recipes, phrases, and cultural practices in a shared community heritage book, contributed to by all families.
7. Completion indicator: at least 3 Culture Spotlight evenings completed, language exchange partnerships active, and multilingual signage installed.` },
        { title: "Conduct an annual ta'aruf audit — assessing the depth of cross-family relationships", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:10",
              arabic: "إِنَّمَا الْمُؤْمِنُونَ إِخْوَةٌ فَأَصْلِحُوا بَيْنَ أَخَوَيْكُمْ",
              translation: "The believers are but brothers, so make reconciliation between your brothers.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 8:63",
              arabic: "وَأَلَّفَ بَيْنَ قُلُوبِهِمْ ۚ لَوْ أَنفَقْتَ مَا فِي الْأَرْضِ جَمِيعًا مَّا أَلَّفْتَ بَيْنَ قُلُوبِهِمْ وَلَـٰكِنَّ اللَّهَ أَلَّفَ بَيْنَهُمْ",
              translation: "And He brought together their hearts. If you had spent all that is in the earth, you could not have brought their hearts together; but Allah brought them together.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2564",
              translation: "The Prophet (peace be upon him) said: \"None of you truly believes until he loves for his brother what he loves for himself.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Ta'aruf is not a programme you launch and forget — it is a living practice that must be measured and nurtured. Without periodic assessment, social cliques re-form, marginalised families drift into isolation, and the community's relational fabric thins without anyone noticing until a crisis exposes the gaps. An annual audit provides the data needed to intervene proactively: which families are well-connected and which are peripheral? Where have misunderstandings calcified into avoidance? Are newcomers integrating or remaining on the margins? You cannot address what you have not measured.


**How?**

1. Design a brief, anonymous survey asking each family to identify: which other families they have shared a meal with in the past year, which families they would feel comfortable asking for help, and whether any unresolved tensions exist.
2. Map the responses into a simple social network diagram — this reveals clusters, bridges, and isolates at a glance.
3. Compare the current map against the previous year's (or the founding baseline) to identify trends: are connections growing or contracting?
4. Identify isolated families and develop specific inclusion plans — additional ta'aruf pairings, activity group invitations, or a check-in from the welfare coordinator.
5. Identify unresolved tensions and route them through the conflict resolution process — a ta'aruf audit that surfaces problems but does not address them breeds cynicism.
6. Present anonymised findings to the shura council with specific recommendations for the coming year's ta'aruf programming.
7. Completion indicator: annual audit completed, social network map produced, isolation and tension interventions planned, and recommendations presented to shura.` },
      ],
    },
    {
      title: "Build robust conflict resolution mechanisms — from prevention to reconciliation",
      priority: 'urgent', tags: ['conflict', 'islah', 'justice'],
      description: "Conflict is inevitable in any community; unresolved conflict is the leading cause of community collapse. Islam provides a comprehensive framework for conflict resolution — from private counsel to formal arbitration — but these tools only work when they are institutionalised before conflict erupts. This task builds a multi-layered conflict resolution system that de-escalates disputes early, adjudicates them fairly, and reconciles relationships afterwards.",
      subtasks: [
        { title: "Train community mediators in Islamic conflict resolution (islah) principles", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:9",
              arabic: "وَإِن طَائِفَتَانِ مِنَ الْمُؤْمِنِينَ اقْتَتَلُوا فَأَصْلِحُوا بَيْنَهُمَا ۖ فَإِن بَغَتْ إِحْدَاهُمَا عَلَى الْأُخْرَىٰ فَقَاتِلُوا الَّتِي تَبْغِي حَتَّىٰ تَفِيءَ إِلَىٰ أَمْرِ اللَّهِ ۚ فَإِن فَاءَتْ فَأَصْلِحُوا بَيْنَهُمَا بِالْعَدْلِ وَأَقْسِطُوا ۖ إِنَّ اللَّهَ يُحِبُّ الْمُقْسِطِينَ",
              translation: "If two groups of the believers fight, you [believers] should try to reconcile them; if one of them is [clearly] oppressing the other, fight the oppressors until they submit to God's command, then make a just and even-handed reconciliation between the two of them: God loves those who are even-handed.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 8",
              translation: "Narrated Ibn 'Umar: Allah's Messenger (ﷺ) said: Islam is based on (the following) five (principles): 1. To testify that none has the right to be worshipped but Allah and Muhammad is Allah's Messenger (ﷺ). 2. To offer the (compulsory congregational) prayers dutifully and perfectly. 3. To pay Zakat (i.e. obligatory charity) . 4. To perform Hajj. (i.e. Pilgrimage to Mecca) 5. To observe fast during the month of Ramadan",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Mediation is a skill, not a personality trait. The Quran instructs believers to reconcile disputing parties (49:9-10) and describes islah (reconciliation) as one of the highest social goods. But good intentions without technique produce mediators who take sides, escalate emotions, or impose solutions that satisfy no one. Training dedicated community members in structured mediation — grounded in Islamic ethics and practical technique — creates the human infrastructure for resolving disputes before they poison communal life.


**How?**

1. Identify 3-5 community members with the temperament for mediation: patience, impartiality, active listening skill, and the trust of diverse community segments.
2. Enrol them in a recognised mediation training programme — many community mediation centres offer 40-hour certification courses adaptable to faith-based contexts.
3. Supplement secular training with Islamic conflict resolution study: the Quranic framework of islah, the Prophet's methods of arbitration, and the jurisprudential principles of sulh (settlement) and tahkim (arbitration).
4. Conduct practice sessions using realistic scenarios drawn from common intentional community conflicts: noise complaints, financial disagreements, children's behaviour, shared space usage, and governance disputes.
5. Establish a code of conduct for mediators: strict confidentiality, mandatory recusal when personally involved, no coercion, and written documentation of agreements.
6. Create a roster of trained mediators accessible to all community members, with a simple process for requesting mediation.
7. Completion indicator: at least 3 community members trained in mediation, a mediator code of conduct adopted, and the roster published to all community members.` },
        { title: "Establish a tiered dispute resolution process — private, mediated, arbitrated, and shura-adjudicated", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:35",
              arabic: "وَإِنْ خِفْتُمْ شِقَاقَ بَيْنِهِمَا فَابْعَثُوا حَكَمًا مِّنْ أَهْلِهِ وَحَكَمًا مِّنْ أَهْلِهَا",
              translation: "And if you fear dissension between the two, send an arbitrator from his people and an arbitrator from her people. A tiered dispute resolution process from private to shura-adjudicated follows this escalating model.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Not all conflicts require the same level of intervention. A disagreement about garden boundaries does not need the shura council, and a serious accusation of covenant violation cannot be resolved by a casual conversation over tea. A tiered system matches the intervention to the severity, preserving relationships at the lowest possible level of formality while ensuring serious matters receive the rigour they demand. Without tiers, communities either ignore small problems until they become big ones, or escalate everything to formal proceedings that feel heavy-handed and adversarial.


**How?**

1. Define Tier 1 (Private Resolution): the disputing parties attempt to resolve the matter directly, following the Quranic injunction to address the person directly before involving others. Provide guidelines for respectful private conversation.
2. Define Tier 2 (Mediated Resolution): if private resolution fails, either party can request a trained mediator. The mediator facilitates conversation but does not impose a solution. Mediation is confidential and voluntary.
3. Define Tier 3 (Arbitrated Resolution): if mediation fails, the matter is referred to a panel of 2-3 respected community members (or an external Islamic arbitrator) who hear both sides and issue a binding decision.
4. Define Tier 4 (Shura Adjudication): reserved for matters affecting the entire community — covenant violations, financial disputes involving community funds, or requests for expulsion. The full shura council hears the case with formal proceedings and recorded minutes.
5. Establish clear escalation criteria: what triggers movement from one tier to the next, and who authorises the escalation.
6. Document the entire process in a conflict resolution guide available to all members.
7. Completion indicator: a written tiered dispute resolution process adopted by the shura council, integrated into the community handbook, and communicated to all members.` },
        { title: "Create a restorative justice framework for post-conflict reconciliation", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:9",
              arabic: "وَإِن طَائِفَتَانِ مِنَ الْمُؤْمِنِينَ اقْتَتَلُوا فَأَصْلِحُوا بَيْنَهُمَا ۖ فَإِن بَغَتْ إِحْدَاهُمَا عَلَى الْأُخْرَىٰ فَقَاتِلُوا الَّتِي تَبْغِي حَتَّىٰ تَفِيءَ إِلَىٰ أَمْرِ اللَّهِ ۚ فَإِن فَاءَتْ فَأَصْلِحُوا بَيْنَهُمَا بِالْعَدْلِ وَأَقْسِطُوا ۖ إِنَّ اللَّهَ يُحِبُّ الْمُقْسِطِينَ",
              translation: "If two groups of the believers fight, you [believers] should try to reconcile them; if one of them is [clearly] oppressing the other, fight the oppressors until they submit to God’s command, then make a just and even-handed reconciliation between the two of them: God loves those who are even-handed.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2704",
              translation: "The Prophet (peace be upon him) said about al-Hasan bin Ali: \"This son of mine is a Sayyid (a noble), and perhaps through him Allah will bring about reconciliation between two great groups of Muslims.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Resolving a dispute is not the same as healing a relationship. A decision can be rendered and accepted while the parties remain bitter, suspicious, and avoidant. The Islamic concept of islah goes beyond adjudication to restoration — rebuilding the trust and mutual regard that conflict damages. Without a restorative framework, resolved disputes leave scar tissue that accumulates over years, creating a community where people are technically at peace but relationally distant. True reconciliation requires structured follow-up that most communities neglect.


**How?**

1. After any Tier 2 or higher resolution, schedule a reconciliation meeting within 2-4 weeks — this is a separate event from the resolution itself, focused not on the dispute but on the relationship.
2. The reconciliation meeting is facilitated by a mediator (not the same one who handled the dispute) and follows a structured format: each party shares what they value about the relationship, acknowledges their own contribution to the conflict, and states what they need going forward.
3. Where appropriate, encourage concrete acts of restoration: a shared meal, a collaborative project, or a public expression of reconciliation (with both parties' consent).
4. Monitor the relationship over the following 3 months through informal check-ins by the welfare coordinator — not to surveil but to ensure the resolution is holding.
5. If reconciliation fails despite good-faith effort, acknowledge this honestly and ensure both parties can coexist respectfully even without restored warmth.
6. Document lessons learned (anonymised) from each significant conflict for the shura council's review — patterns in community conflicts reveal systemic issues that can be addressed structurally.
7. Completion indicator: a restorative justice framework document adopted, first reconciliation meeting conducted, and 3-month follow-up process integrated into the conflict resolution system.` },
        { title: "Establish regular community check-ins to surface tensions before they escalate", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:10",
              arabic: "إِنَّمَا الْمُؤْمِنُونَ إِخْوَةٌ فَأَصْلِحُوا بَيْنَ أَخَوَيْكُمْ ۚ وَاتَّقُوا اللَّهَ لَعَلَّكُمْ تُرْحَمُونَ",
              translation: "The believers are but brothers, so make reconciliation between your brothers. And fear Allah that you may receive mercy.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 4:114",
              arabic: "لَّا خَيْرَ فِي كَثِيرٍ مِّن نَّجْوَاهُمْ إِلَّا مَنْ أَمَرَ بِصَدَقَةٍ أَوْ مَعْرُوفٍ أَوْ إِصْلَاحٍ بَيْنَ النَّاسِ",
              translation: "No good is there in much of their private conversation, except for those who enjoin charity or that which is right or reconciliation between people.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2693",
              translation: "The Prophet (peace be upon him) said: \"Shall I not inform you of something more excellent in degree than fasting, prayer, and charity?\" They said, \"Yes.\" He said, \"It is reconciliation between people, for discord between people is the razor.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Most community conflicts do not begin as dramatic confrontations — they begin as small irritations that are never voiced, accumulate over weeks and months, and eventually erupt in disproportionate reactions. Regular check-ins create a safe, normalised channel for airing concerns early, when they are still manageable. The Prophet (peace be upon him) would check on his companions regularly, asking about their state and wellbeing — this pastoral attention prevented small grievances from becoming community crises. Prevention is always less costly than cure.


**How?**

1. Institute monthly "community temperature" sessions — informal, facilitated gatherings where any member can raise concerns, observations, or appreciations about community life.
2. Use a structured format to keep sessions productive: start with appreciations (what is going well), move to concerns (what needs attention), and close with requests (specific actions someone is asking for).
3. Establish ground rules: speak about your own experience (not accusations), one person speaks at a time, the facilitator ensures quieter voices are heard, and no issue raised in the session is used against the speaker later.
4. Rotate facilitation among trained mediators to prevent any single person from controlling the conversation.
5. Document action items arising from each session and assign responsibility for follow-through.
6. Supplement group sessions with individual welfare check-ins: the welfare coordinator contacts each family privately at least once per quarter to ask how they are genuinely doing.
7. Completion indicator: monthly community check-in sessions established, first three sessions conducted, and individual welfare check-in schedule implemented.` },
        { title: "Document resolved conflicts (anonymised) as community case studies for learning and prevention", done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 1631",
              translation: "The Prophet (peace be upon him) said: \"When a man dies, his deeds come to an end except for three: ongoing charity, beneficial knowledge, or a righteous child who prays for him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Documenting resolved conflicts as case studies preserves beneficial knowledge for the community.",
            },
          ],
          description: `**Why?**

Communities that do not learn from their conflicts are condemned to repeat them. Anonymised case studies transform painful experiences into institutional wisdom — they reveal patterns (e.g., most disputes arise from unclear shared space boundaries, or financial disagreements peak after major infrastructure decisions), suggest preventive measures, and provide realistic training material for new mediators. This practice honours the difficulty of conflict by extracting lasting value from it, rather than burying it in collective amnesia where it waits to resurface in new forms.


**How?**

1. After each Tier 2 or higher resolution (and its reconciliation follow-up), assign the case to a trained mediator who was not involved in the original dispute to write an anonymised case study.
2. The case study format: presenting issue, underlying causes, resolution pathway, outcome, what worked well, what could be improved, and structural recommendations to prevent recurrence.
3. Remove all identifying details — the goal is to capture the pattern, not expose the individuals.
4. Submit the case study to the shura council for review and approval before distribution.
5. Compile case studies into a living document accessible to all mediators and shura members (not published to the general community to protect privacy, even with anonymisation).
6. Review the collection annually to identify recurring patterns and present structural recommendations to the shura.
7. Completion indicator: case study template created, first two case studies written and approved, and an annual review cycle scheduled.` },
      ],
    },
    {
      title: "Implement a comprehensive financial transparency system — from individual contributions to community expenditures",
      priority: 'urgent', tags: ['finance', 'transparency', 'amanah'],
      description: "Financial trust is the load-bearing wall of communal life. When community members cannot see exactly how funds are collected, held, and spent, suspicion fills the information vacuum — even when stewardship is exemplary. This task builds a financial transparency system so thorough that distrust has no ground to grow on. Every dirham in and every dirham out must be traceable, reported, and auditable by any member at any time.",
      subtasks: [
        { title: "Select and deploy a shared financial ledger accessible to all community members", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:58",
              arabic: "إِنَّ اللَّهَ يَأْمُرُكُمْ أَن تُؤَدُّوا الْأَمَانَاتِ إِلَىٰ أَهْلِهَا",
              translation: "Indeed, Allah commands you to render trusts to those to whom they are due. A shared financial ledger renders the trust of community wealth transparent and accountable.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A closed-book financial system, no matter how well-managed, is a trust liability. The Quran commands writing down financial transactions and having them witnessed (2:282) — this is divine accounting policy. A shared ledger that every member can view (but only authorised roles can edit) eliminates the possibility of hidden transactions and removes the burden of trust from individuals. The treasurer is no longer asking you to trust their integrity — they are showing you the numbers and inviting verification. This is transparency as worship, not merely as governance.


**How?**

1. Evaluate ledger options: open-source accounting software (GnuCash, Akaunting), shared spreadsheet (Google Sheets with view-only access for members), or purpose-built community finance tools.
2. Prioritise: real-time accessibility (any member can check balances at any time), edit restrictions (only treasurer and designated backup can modify), complete audit trail (every change logged with timestamp and user), and simplicity (must be understandable by non-accountants).
3. Set up the chart of accounts: income categories (contributions, donations, waqf returns, project revenue) and expense categories (infrastructure, maintenance, welfare, education, worship, administration, reserves, emergency fund).
4. Enter all historical transactions from the community's founding to establish a complete financial record from day one.
5. Train the treasurer and backup administrator on the system, and create a user guide for members explaining how to access and read the ledger.
6. Test the system by having 3-5 community members access it independently and provide feedback on clarity and usability.
7. Completion indicator: shared ledger deployed with all historical data entered, view access confirmed for all members, and user guide distributed.` },
        { title: "Establish monthly financial reporting — income, expenses, balances, and variance analysis", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:58",
              arabic: "إِنَّ اللَّهَ يَأْمُرُكُمْ أَن تُؤَدُّوا الْأَمَانَاتِ إِلَىٰ أَهْلِهَا",
              translation: "Indeed, Allah commands you to render trusts to whom they are due.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 83:1-3",
              arabic: "وَيْلٌ لِّلْمُطَفِّفِينَ * الَّذِينَ إِذَا اكْتَالُوا عَلَى النَّاسِ يَسْتَوْفُونَ * وَإِذَا كَالُوهُمْ أَو وَّزَنُوهُمْ يُخْسِرُونَ",
              translation: "Woe to those who give less than due, who when they take a measure from people take in full, but if they give by measure or weight to them, they cause loss.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 7138",
              translation: "The Prophet (peace be upon him) said: \"Each of you is a shepherd and each of you is responsible for his flock.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A ledger without regular reporting is like a library without a catalogue — the information exists but requires effort to extract. Monthly reports distil the ledger into a narrative that every member can understand without logging in and parsing transaction lines. They answer the questions people actually care about: Are we on budget? Where is our money going? Do we have enough reserves? Is everyone contributing? Regular reporting normalises financial discussion and prevents the dangerous dynamic where money is only discussed during crises.


**How?**

1. Create a monthly report template covering: total income received (broken down by source), total expenses paid (broken down by category), net surplus or deficit for the month, cumulative year-to-date figures, current bank balance, reserve fund balance, and any outstanding obligations.
2. Include a brief narrative section: the treasurer explains significant transactions, unusual variances, and upcoming financial commitments in plain language.
3. Add a contribution compliance section: an anonymised summary showing the percentage of families who are current on contributions, behind, or exempt — no names, but the community has a right to know the overall health of its contribution base.
4. Present the report at the monthly shura meeting and distribute it to all community members within 48 hours.
5. Allow a question period after each presentation — members should be able to ask about any line item without feeling they are accusing anyone of wrongdoing.
6. Archive all monthly reports in a shared folder accessible alongside the ledger.
7. Completion indicator: monthly report template created, first two reports produced and distributed, and question-and-answer process established.` },
        { title: "Create an annual budget process — community-wide input, shura approval, and quarterly review", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 42:38",
              arabic: "وَأَمْرُهُمْ شُورَىٰ بَيْنَهُمْ",
              translation: "And whose affair is [determined by] consultation among themselves. Community-wide budget input and shura approval is consultation applied to financial governance.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Spending without a budget is governance without intention. An annual budget forces the community to collectively decide its priorities: How much goes to infrastructure versus education? What is the appropriate reserve level? Should contributions increase to fund a new project? The budgeting process itself — gathering input, debating priorities, making trade-offs — is shura in its most practical form. It transforms financial management from a treasurer's task into a community exercise in collective stewardship.


**How?**

1. Begin the annual budget cycle 2 months before the fiscal year starts: solicit input from all families on priorities, needs, and concerns through a simple survey or town hall meeting.
2. The treasurer drafts a proposed budget based on projected income (contributions, donations, revenue) and requested expenses, categorised by the chart of accounts.
3. Present the draft budget to the shura council for detailed review and debate — every line item should be justifiable and challenged.
4. After shura approval, present the final budget to the full community at a general meeting, explaining the priorities, trade-offs, and reasoning behind major allocations.
5. Implement quarterly budget reviews: the treasurer compares actual spending against the budget, explains variances, and recommends adjustments if needed. The shura council approves any mid-year budget changes.
6. At year-end, produce an annual financial summary comparing the budget to actual results, with lessons learned for the next cycle.
7. Completion indicator: first annual budget produced through community input and shura approval, quarterly review schedule published, and year-end summary template created.` },
        { title: "Establish an independent audit mechanism — annual review by non-financial community members", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:58",
              arabic: "إِنَّ اللَّهَ يَأْمُرُكُمْ أَن تُؤَدُّوا الْأَمَانَاتِ إِلَىٰ أَهْلِهَا وَإِذَا حَكَمْتُم بَيْنَ النَّاسِ أَن تَحْكُمُوا بِالْعَدْلِ",
              translation: "Indeed, Allah commands you to render trusts to whom they are due and when you judge between people to judge with justice.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 17:35",
              arabic: "وَأَوْفُوا الْكَيْلَ إِذَا كِلْتُمْ وَزِنُوا بِالْقِسْطَاسِ الْمُسْتَقِيمِ",
              translation: "And give full measure when you measure, and weigh with an even balance.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Trust but verify is not a cliche — it is a Quranic principle embedded in the command to have financial transactions witnessed by independent parties (2:282). An independent audit — conducted by community members who are not involved in financial management — provides the verification layer that completes the transparency system. It protects the treasurer from false accusations by demonstrating that their work has been checked and confirmed. It protects the community from errors or misconduct by ensuring a second pair of eyes examines every transaction. Both sides benefit; no one should resist an audit if the books are clean.


**How?**

1. Appoint 2-3 audit committee members from the community who are not involved in financial management — they need not be accountants, but should be numerate, detail-oriented, and trusted by the community.
2. Define the audit scope: verify that all transactions in the ledger are supported by receipts, invoices, or other documentation; confirm that bank balances match ledger balances; check that expenditures were authorised according to the governance process; and review contribution compliance records.
3. Schedule the audit annually, 1-2 months after the fiscal year ends, with a fixed deadline for the audit report.
4. Require the treasurer to provide complete access to all records, bank statements, and supporting documents.
5. The audit committee produces a written report with findings: confirmed accuracy, minor discrepancies, and any significant concerns. The report is presented to the shura council and summarised (without sensitive details) for the community.
6. Define escalation procedures for audit findings that reveal errors or irregularities: minor errors are corrected and documented; significant issues trigger a formal review by the shura council.
7. Completion indicator: audit committee appointed, audit procedures documented, first annual audit completed, and report presented to shura and community.` },
        { title: "Publish a community financial dashboard — real-time visibility into the health of shared resources", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:282",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا تَدَايَنتُم بِدَيْنٍ إِلَىٰ أَجَلٍ مُّسَمًّى فَاكْتُبُوهُ",
              translation: "O you who believe, when you contract a debt for a specified term, write it down.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 4:58",
              arabic: "إِنَّ اللَّهَ يَأْمُرُكُمْ أَن تُؤَدُّوا الْأَمَانَاتِ إِلَىٰ أَهْلِهَا",
              translation: "Indeed, Allah commands you to render trusts to whom they are due.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 7138",
              translation: "The Prophet (peace be upon him) said: \"Each of you is a shepherd and each of you is responsible for his flock.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Monthly reports and annual audits are essential but retrospective — they tell you what happened. A financial dashboard provides real-time visibility into the community's financial health: current balances, contribution status, upcoming obligations, and reserve levels. This is the final layer of transparency, transforming financial management from a periodic event into a continuous, visible reality. When every member can glance at a dashboard and see the community's financial position, rumour and speculation about money have nowhere to take root.


**How?**

1. Design the dashboard to display key metrics at a glance: total community fund balance, reserve fund balance, monthly income versus budget target, monthly expenses versus budget, contribution compliance rate, and any upcoming large expenditures.
2. Use the shared ledger as the data source — the dashboard should pull from the same system the treasurer uses, ensuring consistency.
3. Build the dashboard using accessible tools: a shared Google Sheet with a summary tab, a simple web page updated by the treasurer, or a dedicated dashboard tool if the community has technical capacity.
4. Update the dashboard at least weekly — ideally, it updates automatically as the ledger is updated.
5. Make the dashboard accessible to all community members through the same channel as the ledger (shared folder, community intranet, or physical posting in the shura hall).
6. Include a brief legend explaining what each metric means and what healthy ranges look like — members should be able to interpret the dashboard without financial training.
7. Completion indicator: financial dashboard deployed, accessible to all members, displaying accurate real-time data, and updated at least weekly.` },
      ],
    },
    {
      title: "Build children's education infrastructure — Islamic, academic, and experiential learning",
      priority: 'urgent', tags: ['education', 'children', 'tarbiyah'],
      description: "Children are the community's most precious trust (amanah) and its most important long-term investment. Families will not commit to permanent residency without confidence that their children will receive education that is Islamically grounded, academically rigorous, and enriched by the unique opportunities of community life. This task builds the educational infrastructure — from Quran instruction to outdoor experiential learning — that makes the community a place where children thrive.",
      subtasks: [
        { title: "Establish a community Quran and Islamic studies programme for all age groups", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:104",
              arabic: "**Translation:** Let there arise out of you a group of people inviting to all that is good (Islâm), enjoining Al-Ma‘rûf (i.e. Islâmic Monotheism and all that Islâm orders one to do) and forbidding Al-Munkar (polytheism and disbelief and all that Islâm has forbidden). And it is they who are the successful.",
              translation: "Let there arise out of you a group of people inviting to all that is good (Islâm), enjoining Al-Ma‘rûf (i.e. Islâmic Monotheism and all that Islâm orders one to do) and forbidding Al-Munkar (polytheism and disbelief and all that Islâm has forbidden). And it is they who are the successful.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 46:29",
              arabic: "**Translation:** We sent a group of jinn to you [Prophet] to listen to the Quran. When they heard it, they said to one another, ‘Be quiet!’ Then when it was finished they turned to their community and gave them warning.",
              translation: "We sent a group of jinn to you [Prophet] to listen to the Quran. When they heard it, they said to one another, ‘Be quiet!’ Then when it was finished they turned to their community and gave them warning.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1358",
              translation: "Narrated Ibn Shihab:The funeral prayer should be offered for every child even if he were the son of a prostitute as he was born with a true faith of Islam (i.e. to worship none but Allah Alone). If his parents are Muslims, particularly the father, even if his mother were a non-Muslim, and if he after the delivery cries (even once) before his death (i.e. born alive) then the funeral prayer must be offered. And if the child does not cry after his delivery (i.e. born dead) then his funeral prayer should not be offered, and he will be considered as a miscarriage. Abu Huraira, narrated that the Prophet (ﷺ) said, \"Every child is born with a true faith (i.e. to worship none but Allah Alone) but his parents convert him to Judaism or to Christianity or to Magianism, as an animal delivers a perfect baby animal. Do you find it mutilated?\" Then Abu Huraira recited the holy verses: 'The pure Allah's Islamic nature (true faith i.e. to worship none but Allah Alone), with which He has created human beings",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1643",
              translation: "Narrated `Urwa:I asked `Aisha : \"How do you interpret the statement of Allah,. : Verily! (the mountains) As-Safa and Al-Marwa are among the symbols of Allah, and whoever performs the Hajj to the Ka`ba or performs `Umra, it is not harmful for him to perform Tawaf between them (Safa and Marwa.) (2.158). By Allah! (it is evident from this revelation) there is no harm if one does not perform Tawaf between Safa and Marwa.\" `Aisha said, \"O, my nephew! Your interpretation is not true. Had this interpretation of yours been correct, the statement of Allah should have been, 'It is not harmful for him if he does not perform Tawaf between them.' But in fact, this divine inspiration was revealed concerning the Ansar who used to assume Ihram for worshipping an idol called \"Manat\" which they used to worship at a place called Al-Mushallal before they embraced Islam, and whoever assumed Ihram (for the idol), would consider it not right to perform Tawaf between Safa and Marwa. When they embraced Islam, they asked Allah's Messenger (ﷺ) regarding it, saying, \"O Allah's Apostle! We used to refrain from Tawaf between Safa and Marwa.\" So Allah revealed: 'Verily; (the mountains) As-Safa and Al-Marwa are among the symbols of Allah.' \" Aisha added, \"Surely, Allah's Apostle set the tradition of Tawaf between Safa and Marwa, so nobody is allowed to omit the Tawaf between them.\" Later on I (`Urwa) told Abu Bakr bin `Abdur-Rahman (of `Aisha's narration) and he said, 'I have not heard of such information, but I heard learned men saying that all the people, except those whom `Aisha mentioned and who used to assume Ihram for the sake of Manat, used to perform Tawaf between Safa and Marwa. When Allah referred to the Tawaf of the Ka`ba and did not mention Safa and Marwa in the Qur'an, the people asked, 'O Allah's Messenger (ﷺ)! We used to perform Tawaf between Safa and Marwa and Allah has revealed (the verses concerning) Tawaf of the Ka`ba and has not mentioned Safa and Marwa. Is there any harm if we perform Tawaf between Safa and Marwa?' So Allah revealed: \"Verily As-Safa and Al- Marwa are among the symbols of Allah.\" Abu Bakr said, \"It seems that this verse was revealed concerning the two groups, those who used to refrain from Tawaf between Safa and Marwa in the Pre- Islamic Period of ignorance and those who used to perform the Tawaf then, and after embracing Islam they refrained from the Tawaf between them as Allah had enjoined Tawaf of the Ka`ba and did not mention Tawaf (of Safa and Marwa) till later after mentioning the Tawaf of the Ka`ba",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

 A structured programme ensures every child (and interested adult) has access to qualified instruction in Quran recitation, memorisation, tafsir, and age-appropriate Islamic studies. Without this programme, families must seek instruction externally, which fragments the community's educational identity and places an unnecessary burden on parents who chose this community precisely because of its Islamic foundation.

**How?**

1. Survey the community for existing qualifications: identify residents who are huffaz, have ijazah in Quran recitation, or have formal Islamic studies training — your first teachers may already be among you.
2. Design a tiered curriculum: beginners (Arabic alphabet, basic surah memorisation, foundational aqidah), intermediate (tajwid rules, juz 'amma memorisation, seerah, fiqh of worship), and advanced (extended memorisation, tafsir, hadith sciences, and Islamic ethics).
3. Schedule classes around community rhythms: after Fajr, between Dhuhr and Asr, or on weekends — consult families to find the most widely accessible times.
4. Designate a dedicated learning space within the musalla or a separate classroom, equipped with basic materials: Quran copies, whiteboards, writing supplies, and age-appropriate Islamic books.
5. Establish quality standards: regular progress assessments, recitation reviews, and parent-teacher consultations at least twice per year.
6. For adults who wish to study, create a parallel track: Quran circles, Arabic language basics, and thematic study sessions on topics relevant to community life.
7. Completion indicator: a structured Quran and Islamic studies programme with defined curriculum, assigned teachers, scheduled classes, and at least one full term completed.` },
        { title: "Set up academic instruction — homeschool cooperative, hired tutors, or hybrid model", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 58:11",
              arabic: "يَرْفَعِ اللَّهُ الَّذِينَ آمَنُوا مِنكُمْ وَالَّذِينَ أُوتُوا الْعِلْمَ دَرَجَاتٍ",
              translation: "Allah will raise those who have believed among you and those who were given knowledge, by degrees.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 39:9",
              arabic: "هَلْ يَسْتَوِي الَّذِينَ يَعْلَمُونَ وَالَّذِينَ لَا يَعْلَمُونَ",
              translation: "Are those who know equal to those who do not know?",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (peace be upon him) said: \"Whoever treads a path seeking knowledge, Allah will make easy for him the path to Paradise.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Islamic education feeds the soul; academic education equips the mind. A community that provides one without the other fails its children. The hybrid model — combining the strengths of homeschooling (personalisation, parental involvement, Islamic integration) with cooperative or professional instruction (subject expertise, peer learning, structured progression) — allows the community to offer education that is both Islamically grounded and academically competitive. Parents should never have to choose between their children's deen and their children's dunya — the community's educational infrastructure must provide both.


**How?**

1. Survey parents for their educational preferences and qualifications: some families may already homeschool, some may have teaching credentials, and some may prefer professional instruction for certain subjects.
2. Evaluate the model that best fits your community's size and resources: (a) homeschool cooperative where parents rotate teaching subjects they are qualified in, (b) hired tutors for specialised subjects (maths, sciences, languages), (c) a hybrid of both with a coordinating teacher overseeing curriculum alignment.
3. Select a curriculum framework that aligns with national standards while allowing Islamic integration — many homeschool curricula are modular and can be supplemented with Islamic content.
4. Designate a dedicated classroom space with appropriate furniture, materials, and technology (at minimum: desks, whiteboard, basic reference library, and internet access for research).
5. Establish a school schedule that complements the community's rhythm: start after Fajr programme, break for Dhuhr, and finish in the early afternoon to allow outdoor and experiential learning.
6. Create assessment and progress tracking systems — even informal education needs structured evaluation to ensure children are advancing.
7. Completion indicator: an academic instruction model selected, curriculum adopted, teaching roles assigned, classroom prepared, and first term underway.` },
        { title: "Develop an outdoor and experiential learning programme leveraging the community land", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:190-191",
              arabic: "إِنَّ فِي خَلْقِ السَّمَاوَاتِ وَالْأَرْضِ وَاخْتِلَافِ اللَّيْلِ وَالنَّهَارِ لَآيَاتٍ لِّأُولِي الْأَلْبَابِ * الَّذِينَ يَذْكُرُونَ اللَّهَ قِيَامًا وَقُعُودًا وَعَلَىٰ جُنُوبِهِمْ وَيَتَفَكَّرُونَ فِي خَلْقِ السَّمَاوَاتِ وَالْأَرْضِ",
              translation: "Indeed, in the creation of the heavens and the earth and the alternation of the night and the day are signs for those of understanding — who remember Allah while standing, sitting, and lying on their sides and reflect upon the creation of the heavens and the earth.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 5134",
              translation: "The Prophet (peace be upon him) said: \"If the Hour is about to be established and one of you has a palm shoot in his hand, and he is able to plant it before the Hour is established, let him plant it.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The community's land is its greatest classroom. Children who grow up farming, building, observing ecosystems, and navigating real terrain develop knowledge, confidence, and resilience that no textbook can provide. Experiential learning also gives community-educated children a distinctive advantage: they graduate not only with academic knowledge but with the practical competence to grow food, manage resources, build structures, and live in conscious relationship with the earth — skills increasingly rare and increasingly valuable.

**How?**

1. Identify learning opportunities inherent in the community's land and activities: agriculture (biology, seasons, ecology), construction projects (maths, physics, design), animal husbandry (responsibility, biology), water management (engineering, conservation), and bushcraft (navigation, survival skills, plant identification).
2. Map these opportunities to age-appropriate learning objectives: young children (sensory exploration, basic gardening, animal care), middle children (structured projects with measurable outcomes, basic tool use, science experiments), and teenagers (real contributions to community infrastructure, mentorship under skilled adults, independent projects).
3. Schedule outdoor learning as a regular, non-optional part of the educational week — at least 2-3 sessions per week integrated into the academic calendar.
4. Identify adult mentors for each area: the community gardener leads agricultural education, the builder leads construction-related learning, and so on.
5. Create a portfolio system where children document their experiential learning through journals, photographs, and project reports.
6. Ensure safety protocols are in place: first aid kits, adult supervision ratios, tool safety training, and emergency procedures.
7. Completion indicator: an outdoor learning programme with weekly schedule, assigned mentors, age-appropriate curricula, safety protocols, and portfolio tracking system in place.` },
        { title: "Create a youth mentorship programme pairing teenagers with skilled community elders", done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5090",
              translation: "The Prophet (peace be upon him) said: \"The best of you are those who are best to their families.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "A youth mentorship programme pairing teenagers with skilled elders extends the meaning of family to the community.",
            },
            {
              kind: "quran",
              ref: "Quran 31:13",
              arabic: "وَإِذْ قَالَ لُقْمَانُ لِابْنِهِ وَهُوَ يَعِظُهُ يَا بُنَيَّ لَا تُشْرِكْ بِاللَّهِ",
              translation: "And [mention] when Luqman said to his son while he was instructing him: O my son, do not associate [anything] with Allah. The Luqman model is elder-to-youth tarbiyah.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Teenagers in intentional communities face a unique challenge: they did not choose this life, and as they develop independence, they may struggle with the constraints and intensity of communal living. A mentorship programme gives each teenager a trusted adult outside their own family who can listen, guide, and model purposeful adulthood. This is the Islamic tradition of tarbiyah through relationship — the Prophet (peace be upon him) mentored Anas ibn Malik, Ali ibn Abi Talib, and Usama ibn Zayd through daily proximity and personal attention. A teenager who has a respected elder invested in their growth is far more likely to find meaning in community life than one who feels observed but not known.


**How?**

1. Identify community elders and skilled adults willing to serve as mentors — "elder" here means experienced and respected, not necessarily aged. The key qualities are: genuine interest in youth, patience, relevant skills or knowledge to transmit, and the trust of the teenager's parents.
2. Match based on the teenager's interests and aspirations: a teen interested in engineering pairs with the community builder, one interested in medicine pairs with the healthcare professional, one interested in Islamic scholarship pairs with the community's most learned resident.
3. Structure the mentorship as a practical apprenticeship: the teenager spends regular time (e.g., 3-4 hours per week) working alongside the mentor on real tasks, learning through doing.
4. Supplement practical work with conversation: mentors are encouraged to discuss life choices, Islamic values, career paths, and the teenager's own questions and doubts in a confidential, non-judgemental space.
5. Set 3-month milestones: a skill or project the teenager is working toward, reviewed by both mentor and mentee.
6. Gather feedback from teenagers, mentors, and parents separately to ensure the relationships are healthy and productive.
7. Completion indicator: mentorship programme launched with all community teenagers paired, structured apprenticeship schedules in place, and first 3-month review completed.` },
        { title: "Establish collaborative traditions for celebrating learning milestones — hifz completions, graduations, and skill certifications", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 17:24",
              arabic: "وَاخْفِضْ لَهُمَا جَنَاحَ الذُّلِّ مِنَ الرَّحْمَةِ وَقُل رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
              translation: "And lower to them the wing of humility out of mercy and say: My Lord, have mercy upon them as they brought me up when I was small.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 31:17",
              arabic: "يَا بُنَيَّ أَقِمِ الصَّلَاةَ وَأْمُرْ بِالْمَعْرُوفِ وَانْهَ عَنِ الْمُنكَرِ وَاصْبِرْ عَلَىٰ مَا أَصَابَكَ",
              translation: "O my son, establish prayer, enjoin what is right, forbid what is wrong, and be patient over what befalls you.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1296",
              translation: "The Prophet (peace be upon him) said: \"Every child is born upon the fitrah (natural disposition). Then his parents make him a Jew, a Christian, or a Magian.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Celebration cements identity. When a child completes hifz of a juz, finishes a construction project, or masters a new skill, a community celebration transforms personal achievement into communal memory. It teaches the child that their growth matters to the whole community, not just their parents. It motivates other children by making learning visible and honoured. And it creates the traditions that children will remember decades later as defining experiences of their upbringing. A community that celebrates its children's milestones is a community that communicates, through action, that children are its most treasured investment.


**How?**

1. Identify milestones worth celebrating: completion of each juz of Quran memorisation, academic year completions, first successful garden harvest, first solo construction project, Arabic literacy, and any skill certifications earned through mentorship.
2. Design celebration formats appropriate to the milestone: a community gathering with the child reading their memorised portion, a presentation of their project to the community, a certificate ceremony at the shura hall, or a special outing.
3. Involve the children in planning their own celebrations — this teaches event organisation and gives them ownership of the moment.
4. Create physical markers of achievement: certificates designed by the community, a "wall of accomplishments" in the musalla or school room, or a community yearbook documenting each year's milestones.
5. Ensure celebrations are inclusive: every child's achievement is honoured equally, regardless of the family's status or the perceived importance of the milestone.
6. Document celebrations with photographs and brief write-ups for the community heritage archive.
7. Completion indicator: a milestone celebration framework adopted, first two celebrations conducted, achievement wall or archive established, and community feedback gathered.` },
      ],
    },
    {
      title: "Establish community traditions collaboratively — shared rhythms, seasonal practices, and collective memory",
      priority: 'urgent', tags: ['traditions', 'culture', 'identity'],
      description: "Traditions are the connective tissue of community identity. They create shared rhythms, anticipated joys, and a sense of continuity across seasons and years. But imposed traditions breed resentment — they must emerge collaboratively from the community's collective experience, values, and creativity. This task builds the framework for developing, testing, and adopting community traditions that are authentically owned by all families, grounded in Islamic principles, and adaptable to the community's evolving identity.",
      subtasks: [
        { title: "Co-create an annual community calendar — Islamic observances, seasonal events, and community-specific dates", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:189",
              arabic: "يَسْأَلُونَكَ عَنِ الْأَهِلَّةِ قُلْ هِيَ مَوَاقِيتُ لِلنَّاسِ وَالْحَجِّ",
              translation: "They ask you about the new moons. Say: They are measurements of time for the people and for Hajj. An annual community calendar anchored in Islamic observances follows this lunar-based time consciousness.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A shared calendar is the skeleton of communal life. Without it, families plan independently and community events compete with personal schedules. An annual calendar that integrates Islamic observances (Ramadan, Eid, Hajj season, Muharram), seasonal events (planting, harvest, solstice), and community-specific dates (founding anniversary, bay'ah commemoration, graduation celebrations) gives every family a shared temporal framework. When everyone knows what is coming and plans around the same rhythm, participation becomes natural rather than burdensome. The calendar itself becomes a tradition — each year's version reflecting the community's growth and evolving identity.


**How?**

1. Begin with the Islamic calendar as the foundation: mark all major Islamic observances with the community's planned activities for each (Ramadan iftar schedule, Eid programmes, Hajj-season community rituals).
2. Add seasonal events tied to the land: planting season kickoff, harvest festival, first and last frost dates, and any seasonal maintenance activities that involve communal labour.
3. Add community-specific dates: founding anniversary, bay'ah commemoration, annual ta'aruf audit, budget cycle milestones, and any recurring community gatherings.
4. Invite all families to propose events, traditions, or observances they would like to add — open submission for 2 weeks, then discuss and finalise as a community.
5. Publish the calendar in both digital and physical formats: a shared online calendar and a printed poster for the musalla and communal spaces.
6. Review and update the calendar annually, with a community meeting to reflect on what worked, what to keep, and what to add or remove.
7. Completion indicator: first annual community calendar published, distributed to all families, and displayed in communal spaces.` },
        { title: "Design a weekly communal meal tradition — rotating hosts, shared cooking, and open table", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 51:24-27",
              arabic: "هَلْ أَتَاكَ حَدِيثُ ضَيْفِ إِبْرَاهِيمَ الْمُكْرَمِينَ",
              translation: "Has the story of the honoured guests of Ibrahim reached you?",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 76:8-9",
              arabic: "وَيُطْعِمُونَ الطَّعَامَ عَلَىٰ حُبِّهِ مِسْكِينًا وَيَتِيمًا وَأَسِيرًا",
              translation: "And they give food, in spite of their love for it, to the poor, the orphan, and the captive.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6018",
              translation: "The Prophet (peace be upon him) said: \"Whoever believes in Allah and the Last Day, let him be generous to his guest.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

 It requires no special skill, no budget, and no planning beyond showing up with food and appetite. Yet it produces extraordinary returns: families who eat together weekly develop the familiarity, affection, and tolerance that sustain community life through difficulty. The open table — where guests, visitors, and newcomers are always welcome — also keeps the community outward-facing and hospitable rather than insular.

**How?**

1. Select a fixed day and time that works for the majority of families — Friday after Jumu'ah prayer is a natural choice, but survey families and choose by consensus.
2. Establish a rotating cooking system: each week, 2-3 families are responsible for preparing the main dishes, while all other families contribute sides, drinks, or dessert. Rotate so no one is burdened every week.
3. Designate the communal eating space: the musalla, a covered outdoor area, or a dedicated community dining hall. Ensure the space can accommodate all families comfortably.
4. Establish "open table" rules: visitors and guests are always welcome, seating is mixed (not family clusters), and children eat alongside adults (or in a supervised children's area if very young).
5. Create a simple tradition to open each meal: a brief du'a, Quran recitation, or community announcement. Keep it short — the meal is the tradition, not the programme.
6. Gather feedback after the first month and adjust format, timing, or responsibilities based on what is working and what is burdensome.
7. Completion indicator: weekly communal meal established, rotation schedule published, first month of meals completed, and feedback incorporated.` },
        { title: "Establish a community Ramadan programme — collective iftar, night prayers, and service projects", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 17:78",
              arabic: "**Translation:** Establish regular prayers - at the sun's decline till the darkness of the night, and the morning prayer and reading: for the prayer and reading in the morning carry their testimony.",
              translation: "Establish regular prayers - at the sun's decline till the darkness of the night, and the morning prayer and reading: for the prayer and reading in the morning carry their testimony.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 37",
              translation: "Narrated Abu Huraira: Allah's Messenger (ﷺ) said: \"Whoever establishes prayers during the nights of Ramadan faithfully out of sincere faith and hoping to attain Allah's rewards (not for showing off), all his past sins will be forgiven",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2018",
              translation: "Narrated Abu Sa`id Al-Khudri:Allah's Messenger (ﷺ) used to practice I`tikaf (in the mosque) in the middle third of Ramadan and after passing the twenty nights he used to go back to his house on the 21st, and the people who were in I`tikaf with him also used to go back to their houses. Once in Ramadan, in which he practiced I`tikaf, he established the night prayers at the night in which he used to return home, and then he addressed the people and ordered them whatever Allah wished him to order and said, \"I used to practice I`tikaf for these ten days (i.e. the middle third but now I intend to stay in I`tikaf for the last ten days (of the month); so whoever was in I`tikaf with me should stay at his place of seclusion. I have verily been shown (the date of) this Night (of Qadr) but I have forgotten it. So search for it in the odd nights of the last ten days (of this month). I also saw myself (in the dream) prostrating in mud and water.\" On the night of the 21st, the sky was covered with clouds and it rained, and the rainwater started leaking through the roof of the mosque at the praying place of the Prophet (ﷺ) . I saw with my own eyes the Prophet at the completion of the morning prayer leaving with his face covered with mud and water",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Ramadan in community is a transformative experience that individual families cannot replicate. The nightly gathering for iftar, the collective tarawih prayers, the shared sahur, and the communal charity projects create an intensity of worship and togetherness that marks the month as the spiritual high point of the year. For children, communal Ramadan creates memories that anchor their Islamic identity for life. For adults, it provides the social support that makes fasting easier and the communal worship that makes prayer more rewarding. A well-designed Ramadan programme is the single most powerful tradition a Muslim community can offer.


**How?**

1. Plan the Ramadan programme 2 months in advance: designate a Ramadan committee from community volunteers to handle logistics.
2. Organise nightly communal iftar with rotating cooking responsibilities — the same system as the weekly meal but scaled to every night. Consider assigning each family one or two cooking nights across the month to distribute the load.
3. Arrange tarawih prayers in the musalla with the community's best reciter(s) leading. If multiple huffaz are available, rotate to share the honour and vary the experience.
4. Plan a community i'tikaf for the last ten nights: a dedicated space for those observing i'tikaf, with support for their food and practical needs.
5. Design a Ramadan service project: community members collectively contribute to a cause outside the community — feeding the homeless, supporting refugees, or funding a well in a Muslim-majority country. This keeps the community's Ramadan outward-focused.
6. Create a children's Ramadan programme: age-appropriate fasting goals, daily Islamic learning activities, a Quran recitation challenge, and a special Eid celebration that children help plan.
7. Completion indicator: first community Ramadan programme completed with nightly iftars, tarawih, service project, and children's programme, with post-Ramadan review and lessons documented.` },
        { title: "Create a community founding anniversary tradition — annual reflection, renewal, and celebration", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 14:7",
              arabic: "لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ",
              translation: "If you are grateful, I will surely increase you.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 94:5-6",
              arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا * إِنَّ مَعَ الْعُسْرِ يُسْرًا",
              translation: "For indeed, with hardship comes ease. Indeed, with hardship comes ease.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (peace be upon him) said: \"No people gather in a house among the houses of Allah, reciting the Book of Allah and studying it among themselves, except that tranquility descends upon them, mercy covers them, the angels surround them, and Allah mentions them to those who are near Him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The founding anniversary is the community's birthday — a natural moment for reflection on how far the community has come, renewal of commitment to its founding principles, and celebration of what has been built together. Without an annual marker, the passage of time blurs and the founding vision gradually fades from active consciousness into passive assumption. An anniversary tradition keeps the covenant alive, reminds long-standing members why they came, gives newer members connection to the community's origin story, and provides children with a sense of historical continuity that roots their identity.


**How?**

1. Choose the date: the anniversary of the bay'ah ceremony, the date of the first family's arrival, or the date of the Mithaq signing — whichever holds the most collective significance.
2. Design a three-part programme: (a) Reflection — a facilitated session where the community reviews the year: what was accomplished, what challenges were faced, and what was learned. (b) Renewal — a rereading of the covenant's preamble with an opportunity for each family to reaffirm their commitment. (c) Celebration — a communal feast, children's activities, and a gathering that is purely joyful.
3. Include a "State of the Community" address by the amir or shura chair: an honest, transparent summary of the community's current position — finances, membership, infrastructure, and morale.
4. Invite founding family elders or community supporters from outside to attend and share their observations — an outside perspective prevents insularity.
5. Create a physical tradition: planting a tree each anniversary, adding a stone to a cairn, or writing a collective letter to the community's future self, sealed and opened at a later anniversary.
6. Document each anniversary with photographs and a written summary for the community archive.
7. Completion indicator: first founding anniversary celebrated with reflection, renewal, and celebration components, documented and archived.` },
        { title: "Develop a tradition proposal and adoption process — how new traditions are suggested, tested, and formalised", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:159",
              arabic: "وَشَاوِرْهُمْ فِي الْأَمْرِ فَإِذَا عَزَمْتَ فَتَوَكَّلْ عَلَى اللَّهِ",
              translation: "And consult them in the matter. And when you have decided, then rely upon Allah. A tradition proposal and adoption process is structured shura for communal culture-building.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Traditions that are imposed by a few feel like obligations; traditions that emerge through collective process feel like shared ownership. A formal proposal and adoption process ensures that new traditions reflect the community's evolving identity rather than the preferences of its most vocal members. It also provides a mechanism for retiring traditions that no longer serve the community — an equally important function. Without this process, the community's traditions calcify into routines that are followed out of inertia rather than love, or fragment into competing practices that different families observe selectively.


**How?**

1. Create a simple tradition proposal form: any community member can suggest a new tradition by describing what it is, why it matters, how often it would occur, and what resources it requires.
2. Proposals are submitted to the shura council, which reviews them for alignment with Islamic principles, practical feasibility, and community appetite.
3. Approved proposals enter a "trial period" of 3-6 occurrences: the tradition is practised provisionally, with the understanding that it is being tested, not permanently adopted.
4. After the trial period, gather community-wide feedback: Did people enjoy it? Would they miss it if it stopped? Does it strengthen community bonds or feel like a burden?
5. If feedback is positive (a threshold you define — e.g., 70% of families in favour), the tradition is formally adopted and added to the community calendar.
6. Establish a parallel process for retiring traditions: any member can propose that a tradition be retired, triggering a review and vote by the same process.
7. Completion indicator: tradition proposal and adoption process documented, approved by shura, first proposal submitted and trialled, and the process communicated to all community members.` },
      ],
    },
  ],

  // ── EXCELLENCE ── generational legacy, replicability, and visible proof
  moontrance_residency_excellence: [
    {
      title: "Establish a waqf endowment generating surplus — permanent community wealth held in trust for Allah",
      priority: 'urgent', tags: ['waqf', 'endowment', 'sadaqah-jariyah'],
      description: "A waqf is the Islamic institution of perpetual endowment — assets dedicated irrevocably to a beneficial purpose, with their income funding community needs in perpetuity. Establishing a waqf transforms the community from a generation-dependent enterprise into a self-sustaining institution. When the waqf generates surplus beyond operational needs, the community gains the financial freedom to invest in growth, support struggling families, fund scholarship, and extend generosity beyond its own borders. This is sadaqah jariyah at institutional scale.",
      subtasks: [
        { title: "Study the fiqh of waqf — legal requirements, permissible structures, and historical models", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:92",
              arabic: "لَن تَنَالُوا الْبِرَّ حَتَّىٰ تُنفِقُوا مِمَّا تُحِبُّونَ",
              translation: "You will never attain righteousness until you spend from that which you love.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 2:261",
              arabic: "مَّثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنبَتَتْ سَبْعَ سَنَابِلَ",
              translation: "The example of those who spend their wealth in the way of Allah is like a seed that grows seven spikes; in each spike is a hundred grains.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2737",
              translation: "Umar (may Allah be pleased with him) said: \"O Messenger of Allah, I have never owned property more precious to me than my share in Khaybar.\" The Prophet said, \"If you wish, you may retain the property and give its fruits as charity.\" So Umar gave it as a waqf — it was not to be sold, inherited, or given away.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Waqf is one of the most powerful and misunderstood institutions in Islamic civilisation. At its peak, waqf endowments funded hospitals, universities, water systems, and entire urban districts across the Muslim world. But a waqf established without proper understanding of its legal requirements — irrevocability, perpetuity, defined beneficiaries, and compliant investment — can fail legally or spiritually. Studying the fiqh before structuring the endowment ensures your waqf is valid according to Shariah, effective as an investment vehicle, and genuinely perpetual rather than a well-intentioned experiment that dissolves with its founders.


**How?**

1. Study the classical fiqh of waqf across the major madhahib: the foundational concept of removing property from personal ownership and dedicating its usufruct to a specified purpose, the conditions of validity, and the role of the mutawalli (trustee).
2. Research contemporary waqf models: how modern Muslim communities and organisations have structured waqf endowments within Western legal frameworks (charitable trusts, foundation structures, etc.).
3. Examine historical case studies: the waqf of Uthman ibn Affan (the well of Rumah), the waqf system of Ottoman Istanbul, and contemporary examples like the Kuwait Awqaf Public Foundation.
4. Consult with an Islamic finance scholar and a local solicitor or attorney experienced in charitable trust law to understand how waqf principles can be implemented within your jurisdiction's legal framework.
5. Identify the assets the community could dedicate to waqf: land, buildings, investment capital, or revenue-generating enterprises.
6. Document your findings in a waqf feasibility report for the shura council's consideration.
7. Completion indicator: a comprehensive waqf feasibility report covering fiqh requirements, legal options, potential assets, and recommended structure, presented to the shura council.` },
        { title: "Establish the legal structure — charitable trust, foundation, or incorporated waqf entity", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 5:1",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا أَوْفُوا بِالْعُقُودِ",
              translation: "O you who believe, fulfill your contracts.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 4:58",
              arabic: "إِنَّ اللَّهَ يَأْمُرُكُمْ أَن تُؤَدُّوا الْأَمَانَاتِ إِلَىٰ أَهْلِهَا",
              translation: "Indeed, Allah commands you to render trusts to whom they are due.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2737",
              translation: "Umar (may Allah be pleased with him) gave his land at Khaybar as a waqf, stipulating that it not be sold, inherited, or given away — establishing the legal precedent for waqf endowments in Islam.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A waqf that exists only as a community agreement without legal registration is vulnerable to mismanagement, dispute, and dissolution. The legal structure provides the enforceable framework that protects the endowment's assets, defines the mutawalli's authority and accountability, and ensures the waqf survives changes in leadership, membership, and even the community itself. Choosing the right legal vehicle — one that satisfies both Shariah requirements and local law — is a foundational decision that will shape the endowment's operation for generations.


**How?**

1. Based on the feasibility report, select the legal structure that best aligns waqf principles with local law: a charitable trust (common in common-law jurisdictions), a foundation (common in civil-law jurisdictions), or a purpose-built incorporated entity.
2. Engage a solicitor or attorney experienced in charitable and religious entity formation to draft the founding documents.
3. Ensure the founding documents encode waqf principles: irrevocability of dedicated assets, specified beneficiaries (the community and its purposes), restriction on the sale of waqf property (except in defined circumstances permitted by the chosen fiqh opinion), and succession provisions for the mutawalli.
4. Register the entity with the relevant regulatory authority and obtain any required charitable status or tax exemptions.
5. Open dedicated bank and investment accounts in the entity's name, separate from the community's operational accounts.
6. Appoint the initial mutawalli (trustee or board of trustees) through shura, with terms and accountability mechanisms matching those in the governance charter.
7. Completion indicator: waqf entity legally registered, founding documents executed, bank accounts opened, and mutawalli appointed.` },
        { title: "Seed the endowment with founding contributions and an income-generating asset strategy", done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2737",
              translation: "Umar ibn al-Khattab acquired land at Khaybar and the Prophet (peace be upon him) advised: \"If you wish, you may hold the property as waqf and give its produce as charity.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Seeding the endowment with founding contributions follows the Prophetic waqf model.",
            },
          ],
          description: `**Why?**

A waqf without capital is a declaration without substance. The endowment must be seeded with real assets that generate real income — and the investment strategy must be Shariah-compliant, diversified, and oriented toward long-term growth rather than speculative returns. The founding generation's contributions set the trajectory: a well-seeded endowment with a sound investment strategy compounds over decades into the financial bedrock that frees future generations from dependence on annual contributions for basic community functions.


**How?**

1. Determine the initial seeding target: calculate the minimum endowment capital needed to generate meaningful annual income (e.g., a 5% annual return on a given principal).
2. Solicit founding contributions from community families: one-time waqf donations that are irrevocable once dedicated. Some families may contribute cash, others may contribute land, equipment, or other assets.
3. Develop a Shariah-compliant investment strategy: consult with an Islamic finance adviser to allocate the endowment across diversified halal investments — Islamic bonds (sukuk), halal equity funds, real estate, agricultural income, and community enterprises.
4. Establish an investment policy statement defining: target returns, risk tolerance, ethical screens (no riba, no haram industries), rebalancing frequency, and the proportion of returns reinvested versus distributed.
5. Ensure the investment strategy is reviewed annually by the mutawalli and reported to the shura council and community.
6. Track the endowment's growth separately from operational finances — the endowment is not a reserve fund to be drawn down, but a perpetual asset whose income alone is spent.
7. Completion indicator: endowment seeded with founding contributions, investment strategy implemented, first quarterly return report produced, and annual review cycle established.` },
        { title: "Define waqf distribution priorities — how endowment income funds community needs and beyond", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:215",
              arabic: "يَسْأَلُونَكَ مَاذَا يُنفِقُونَ ۖ قُلْ مَا أَنفَقْتُم مِّنْ خَيْرٍ فَلِلْوَالِدَيْنِ وَالْأَقْرَبِينَ وَالْيَتَامَىٰ وَالْمَسَاكِينِ وَابْنِ السَّبِيلِ",
              translation: "They ask you what they should spend. Say: Whatever you spend of good is for parents and relatives and orphans and the needy and the traveler.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 9:60",
              arabic: "إِنَّمَا الصَّدَقَاتُ لِلْفُقَرَاءِ وَالْمَسَاكِينِ وَالْعَامِلِينَ عَلَيْهَا",
              translation: "Zakah expenditures are only for the poor and for the needy and for those employed to collect it.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 1631",
              translation: "The Prophet (peace be upon him) said: \"When a person dies, his deeds come to an end except for three: ongoing charity, beneficial knowledge, or a righteous child who prays for him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The purpose of a waqf is not to accumulate wealth but to channel it perpetually toward beneficial ends. Without clear distribution priorities, endowment income becomes a contested resource — every community faction advocating for their preferred use. Defining priorities in advance, grounded in the community's covenant and Islamic principles, ensures the income flows toward the highest-impact purposes: maintaining infrastructure, funding education, supporting the vulnerable, investing in community enterprises, and extending generosity beyond the community's borders. When the waqf generates surplus beyond these needs, the community has achieved true financial independence.


**How?**

1. Define the primary beneficiaries in order of priority: (a) community infrastructure maintenance and essential services, (b) education programmes, (c) welfare support for families in hardship, (d) community development projects, (e) external charitable giving.
2. Allocate percentages of annual income to each priority category, with a mandatory reinvestment percentage (e.g., 20% of income reinvested to grow the principal).
3. Establish a "surplus threshold": the income level above which the community considers itself fully funded and begins directing excess to external causes — supporting other Muslim communities, funding scholarships, contributing to humanitarian relief.
4. Create a distribution decision process: the mutawalli proposes an annual distribution plan, the shura council reviews and approves it, and the community is informed of how endowment income will be allocated.
5. Publish the annual distribution report alongside the community's financial reports for full transparency.
6. Review priorities every 3-5 years to ensure they reflect the community's evolving needs and circumstances.
7. Completion indicator: waqf distribution priorities documented, percentage allocations set, first annual distribution plan approved, and surplus threshold defined.` },
        { title: "Achieve waqf surplus — endowment income exceeds community operational needs", done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 1631",
              translation: "The Prophet (peace be upon him) said: \"When a man dies, his deeds come to an end except for three: ongoing charity, beneficial knowledge, or a righteous child who prays for him.\" A waqf that generates surplus beyond operational needs is the highest form of ongoing charity.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Waqf surplus is the ultimate marker of financial maturity for an Islamic community. When the endowment's annual income exceeds the community's operational costs, the community has freed itself from dependence on member contributions for survival. This is not merely a financial milestone — it is a spiritual one. It means the community has built something that sustains itself, that can weather economic downturns without emergency fundraising, and that has resources to share with the wider ummah.

**How?**

1. Track the endowment's growth trajectory: project when, at current contribution and return rates, the endowment income will exceed annual community operational costs.
2. Accelerate growth by soliciting additional waqf contributions: bequests (wasiyyah) from community members, special fundraising campaigns, and in-kind asset donations.
3. Reduce the surplus threshold by improving operational efficiency: lower infrastructure costs through community labour, reduce waste, and find revenue-generating activities that offset expenses.
4. When surplus is achieved, announce it to the community as a milestone — this is a moment of collective celebration and gratitude.
5. Immediately channel surplus according to the defined distribution priorities — particularly the external giving category. Surplus should flow outward, not accumulate idly.
6. Maintain conservative financial projections: surplus should be declared only when it is sustainable across multiple years, not based on a single exceptional return.
7. Completion indicator: waqf income exceeds community operational costs for two consecutive years, surplus distribution initiated, and the milestone documented in the community's founding narrative.` },
      ],
    },
    {
      title: "Produce a fully documented, replicable community formation model",
      priority: 'urgent', tags: ['documentation', 'replication', 'da\'wah'],
      description: "If the community's model cannot be replicated, its impact dies with its geography. A fully documented model — covering every stage from vision to operational maturity — transforms one community's experience into a blueprint that other Muslim communities worldwide can study, adapt, and implement. This is da'wah through demonstration: proving that Islamic social architecture works in practice, not merely in theory, and making that proof available to anyone with the courage to try.",
      subtasks: [
        { title: "Document the founding process — from initial vision to first family arrival — in granular, actionable detail", done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 1631",
              translation: "The Prophet (peace be upon him) said: \"When a man dies, his deeds come to an end except for three: ongoing charity, beneficial knowledge, or a righteous child who prays for him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Documenting the founding process in actionable detail is the creation of beneficial knowledge for future communities.",
            },
          ],
          description: `**Why?**

The founding phase is the most difficult and least documented part of intentional community formation. Most communities that succeed take their founding lessons for granted; most that fail leave no record of what went wrong. By documenting every step — the decisions, the mistakes, the unexpected challenges, the costs, the timelines — you create the resource that your founders wished they had when they started. This documentation transforms your specific experience into transferable knowledge, reducing the barrier to entry for future communities from "you need to figure everything out from scratch" to "here is what one community learned — adapt it to your context."


**How?**

1. Assign a documentation lead (or form a small documentation committee) with the specific mandate to create the replication guide — this is not a side project but a core community output.
2. Work chronologically through the founding process: initial vision formation, covenant drafting, governance design, family recruitment, land acquisition, infrastructure development, and first arrivals.
3. For each phase, document: what was planned, what actually happened, how long it took, what it cost, what decisions were made and why, what mistakes were made and how they were corrected, and what advice the founders would give to someone starting this phase today.
4. Include templates and tools developed along the way: the covenant template, vetting process documents, financial systems, governance charter, and onboarding materials.
5. Write in clear, accessible language — the audience is not academics but Muslim families considering their own community formation.
6. Have multiple community members review each section for accuracy and completeness.
7. Completion indicator: a complete founding process document covering all phases from vision to first family arrival, with templates and lessons learned, reviewed and approved by the shura council.` },
        { title: "Create operational manuals for each community system — governance, finance, education, conflict resolution, and infrastructure", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:282",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا تَدَايَنتُم بِدَيْنٍ إِلَىٰ أَجَلٍ مُّسَمًّى فَاكْتُبُوهُ",
              translation: "O you who believe, when you contract a debt for a specified term, write it down.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 96:3-5",
              arabic: "اقْرَأْ وَرَبُّكَ الْأَكْرَمُ * الَّذِي عَلَّمَ بِالْقَلَمِ * عَلَّمَ الْإِنسَانَ مَا لَمْ يَعْلَمْ",
              translation: "Read, and your Lord is the Most Generous — who taught by the pen, taught man that which he knew not.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2674",
              translation: "The Prophet (peace be upon him) said: \"Whoever establishes a good practice in Islam will have its reward and the reward of all who act upon it after him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The founding process document tells you how to start a community; operational manuals tell you how to run one. Each system the community has built — governance, financial management, education, conflict resolution, infrastructure maintenance — has evolved through trial and error into a working process. Capturing these processes in detailed manuals ensures that institutional knowledge is not locked in the heads of individuals who may leave, and provides replicating communities with ready-to-use systems rather than abstract principles. A manual should be detailed enough that a competent person unfamiliar with the community could step into a role and function within a week.


**How?**

1. Identify every operational system: shura governance, financial management, waqf administration, education programmes, conflict resolution, newcomer onboarding, infrastructure maintenance, food production, and community traditions.
2. For each system, document: purpose and principles, roles and responsibilities, step-by-step processes, templates and forms used, common problems and solutions, and review/update cycles.
3. Include flowcharts or decision trees for complex processes (e.g., the tiered conflict resolution pathway, the budget approval process).
4. Have the person currently responsible for each system write the first draft — they know the details that an outside observer would miss.
5. Have someone unfamiliar with the system review the manual and attempt to follow it — their confusion reveals gaps in the documentation.
6. Version-control all manuals and establish an annual review cycle to keep them current as systems evolve.
7. Completion indicator: operational manuals completed for all major community systems, tested by unfamiliar readers, and archived with version control.` },
        { title: "Compile a lessons-learned archive — honest documentation of failures, mistakes, and near-misses", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 59:18",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللَّهَ وَلْتَنظُرْ نَفْسٌ مَّا قَدَّمَتْ لِغَدٍ",
              translation: "O you who believe, fear Allah, and let every soul look to what it has put forth for tomorrow.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 3:140",
              arabic: "وَتِلْكَ الْأَيَّامُ نُدَاوِلُهَا بَيْنَ النَّاسِ",
              translation: "And these are the days We alternate among the people.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6069",
              translation: "The Prophet (peace be upon him) said: \"A believer is not stung from the same hole twice.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Success stories inspire, but failure stories instruct. The most valuable gift your community can offer to future communities is an honest account of what went wrong, what nearly failed, and what you would do differently with hindsight. Most community documentation sanitises the story, presenting a smooth narrative of wise decisions and steady progress. Reality is messier, and communities that try to replicate a sanitised model will face the same messy reality without the benefit of forewarning. Documenting failures with the same rigour as successes is an act of intellectual honesty and genuine generosity toward those who will follow.


**How?**

1. Establish a culture of honest retrospection: failures and mistakes are documented not to blame individuals but to extract lessons. Frame this explicitly as amanah — the community owes this honesty to future communities.
2. Conduct structured retrospectives at regular intervals (quarterly or annually): what went wrong this period? What was the root cause? What was the impact? How was it resolved? What would we do differently?
3. Categorise failures by domain: governance failures, financial mistakes, interpersonal conflicts that escalated unnecessarily, infrastructure problems, recruitment misjudgements, and educational gaps.
4. For each failure, document the full arc: the initial mistake, the warning signs that were missed, the moment of crisis, the resolution, and the lasting lesson.
5. Anonymise where necessary to protect individuals, but retain enough detail to be instructive — a vague lesson is a useless lesson.
6. Compile the archive as a companion document to the founding process and operational manuals — the "what not to do" that completes the "what to do."
7. Completion indicator: a structured lessons-learned archive covering at least 3 years of community life, categorised by domain, reviewed for accuracy, and integrated into the replication guide.` },
        { title: "Publish the replication guide in accessible formats — digital, print, and multilingual", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:104",
              arabic: "وَلْتَكُن مِّنكُمْ أُمَّةٌ يَدْعُونَ إِلَى الْخَيْرِ",
              translation: "And let there be [arising] from you a nation inviting to [all that is] good. Publishing the replication guide in accessible, multilingual formats is da'wah to communal goodness at scale.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A replication guide that exists only as an internal document in a single language reaches no one. Publishing in multiple formats and languages ensures the model is accessible to the widest possible audience: the Arabic-speaking family in Jordan considering a community on agricultural land, the English-speaking converts in America exploring rural Muslim life, the Somali diaspora in Sweden dreaming of communal self-sufficiency. Each format serves a different access need: digital for immediate global reach, print for communities in low-connectivity areas, and multilingual for the ummah's actual linguistic diversity.


**How?**

1. Compile the founding process document, operational manuals, and lessons-learned archive into a single, cohesive replication guide with a clear table of contents and navigable structure.
2. Edit the guide for clarity, consistency, and readability — engage a professional editor if resources allow, or recruit a community member with strong writing skills.
3. Publish digitally: a freely downloadable PDF on the community's website, and consider hosting on platforms where Muslim communities seek resources (Islamic community platforms, intentional community networks).
4. Produce a print version for distribution at conferences, in mosques, and to communities that request physical copies.
5. Translate into the languages most represented in the global Muslim community: Arabic, Urdu, Bahasa (Indonesian/Malay), Turkish, French, and Somali are strong starting points. Recruit community members or diaspora volunteers for translation.
6. Include contact information for the community, inviting questions, feedback, and requests for direct consultation from communities attempting replication.
7. Completion indicator: replication guide published in digital and print formats, translated into at least 2 additional languages, and distributed through at least 3 channels.` },
        { title: "Host an annual open day for external communities to visit, observe, and learn from the model", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 16:125",
              arabic: "ادْعُ إِلَىٰ سَبِيلِ رَبِّكَ بِالْحِكْمَةِ وَالْمَوْعِظَةِ الْحَسَنَةِ",
              translation: "Invite to the way of your Lord with wisdom and good instruction.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 41:33",
              arabic: "وَمَنْ أَحْسَنُ قَوْلًا مِّمَّن دَعَا إِلَى اللَّهِ وَعَمِلَ صَالِحًا",
              translation: "And who is better in speech than one who invites to Allah and does righteousness.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 2685",
              translation: "The Prophet (peace be upon him) said: \"Convey from me, even if it is one ayah.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A document describes a model; a visit demonstrates it. There is no substitute for walking the land, meeting the families, observing the governance in action, eating together, and asking unscripted questions. An annual open day invites external Muslim communities, scholars, activists, and curious families to experience what the community has built. This is the most powerful form of da'wah available — not preaching a theory but showing a living reality. It also keeps the community honest: hosting visitors forces you to see your own community through fresh eyes, noticing both what impresses and what embarrasses.


**How?**

1. Schedule the open day annually on a date that showcases the community at its best: a pleasant season, a period when gardens are productive, and ideally coinciding with a community celebration or tradition.
2. Design a structured programme: welcome session with community overview, guided tour of infrastructure (housing, musalla, farm, school), attendance at a shura meeting or community gathering, shared meal, and Q&A session with founding families and current leadership.
3. Invite through diverse channels: mosques, Islamic organisations, intentional community networks, social media, and direct outreach to known community-formation initiatives.
4. Prepare community members for hosting: brief all families on the purpose and format, assign hosting duties, and remind everyone that honesty about challenges is more valuable than a polished performance.
5. Provide visitors with copies of the replication guide and contact information for follow-up consultation.
6. Gather feedback from visitors: what impressed them, what concerned them, and what questions remain unanswered. Use this feedback to improve both the open day and the community itself.
7. Completion indicator: first annual open day conducted, at least 10 external visitors hosted, feedback gathered, and follow-up consultation offered to interested communities.` },
      ],
    },
    {
      title: "Develop intergenerational succession planning — ensuring the community outlives its founders",
      priority: 'urgent', tags: ['succession', 'legacy', 'generations'],
      description: "The greatest test of any community is whether it survives the transition from its founding generation to the next. Most intentional communities fail this test because they never plan for it — leadership is held by founders until they age out, institutional knowledge lives in their heads, and the second generation inherits a community they feel obligated to maintain rather than empowered to lead. Succession planning begins now, not when founders are ready to step aside, because the habits and structures that enable smooth transition must be practised for years before they are needed.",
      subtasks: [
        { title: "Identify and develop the next generation of community leaders from among youth and younger families", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 18:46",
              arabic: "الْمَالُ وَالْبَنُونَ زِينَةُ الْحَيَاةِ الدُّنْيَا ۖ وَالْبَاقِيَاتُ الصَّالِحَاتُ خَيْرٌ عِندَ رَبِّكَ ثَوَابًا وَخَيْرٌ أَمَلًا",
              translation: "Wealth and children are the adornment of the life of this world. But the enduring good deeds are better to your Lord for reward and better for hope.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 33:72",
              arabic: "إِنَّا عَرَضْنَا الْأَمَانَةَ عَلَى السَّمَاوَاتِ وَالْأَرْضِ وَالْجِبَالِ",
              translation: "Indeed, We offered the trust to the heavens and the earth and the mountains.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 1631",
              translation: "The Prophet (peace be upon him) said: \"When a person dies, his deeds come to an end except for three: ongoing charity, beneficial knowledge, or a righteous child who prays for him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Leadership development is a decades-long investment, not a last-minute handoff. If the community waits until founders are ready to retire before developing successors, it will face a leadership vacuum filled by the most ambitious rather than the most capable. Intentional identification and development of young leaders ensures the community's values and competence transfer seamlessly across generations.

**How?**

1. Observe youth and younger families for leadership potential: not just charisma or assertiveness, but the deeper qualities — trustworthiness, ability to listen, willingness to serve, sound judgement under pressure, and commitment to the community's Islamic foundations.
2. Create leadership development pathways: mentorship under current role-holders, progressive responsibility in community projects, participation in shura as observers (then as junior members), and external training in governance, finance, mediation, and organisational management.
3. Assign emerging leaders to shadow current role-holders for at least 6 months before any formal transition — they should understand not just what the role requires but how experienced leaders navigate ambiguity and conflict.
4. Provide opportunities for emerging leaders to lead independently: a community project, a seasonal event, or a committee — situations where they can succeed or fail with support, not in isolation.
5. Solicit feedback from the community on emerging leaders' performance: do people trust them? Do they listen? Do they follow through?
6. Maintain a written succession pipeline: who is being developed for which roles, what stage of development they are at, and what gaps remain.
7. Completion indicator: at least 3 emerging leaders identified and actively developing, each shadowing a current role-holder, with a written development plan and community feedback mechanism in place.` },
        { title: "Establish term limits and mandatory rotation for all governance and leadership roles", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 42:38",
              arabic: "وَأَمْرُهُمْ شُورَىٰ بَيْنَهُمْ",
              translation: "And whose affair is [determined by] consultation among themselves. Term limits and mandatory rotation for governance roles prevent entrenchment and keep shura genuine.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 4:58",
              arabic: "إِنَّ اللَّهَ يَأْمُرُكُمْ أَن تُؤَدُّوا الْأَمَانَاتِ إِلَىٰ أَهْلِهَا",
              translation: "Indeed, Allah commands you to render trusts to those to whom they are due.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Without structural mechanisms forcing transition, human nature favours continuity — familiar leaders stay because they are comfortable, and the community allows it because change is disruptive. Term limits and mandatory rotation are the institutional antidote to the personality-dependent leadership that kills communities when their charismatic founder departs. They normalise transition as a feature of healthy governance rather than a crisis to be managed. Every rotation is a stress test: if the community struggles when one person steps aside, it reveals a dangerous dependence that must be addressed before it becomes a single point of failure.


**How?**

1. Amend the governance charter to include term limits for all roles: amir, treasurer, record-keeper, welfare coordinator, mediators, and shura council members. Two consecutive terms of 2-3 years each is a common model that balances continuity with renewal.
2. Institute mandatory rotation: after serving the maximum consecutive terms, a role-holder must step down for at least one full term before becoming eligible again.
3. Stagger term expirations so that no more than one-third of leadership roles turn over simultaneously — this preserves institutional memory while enabling regular renewal.
4. Require outgoing role-holders to produce a written transition document: current projects, pending issues, key relationships, system access credentials, and advice for the successor.
5. Conduct formal handover meetings between outgoing and incoming role-holders, facilitated by a shura member.
6. Celebrate transitions publicly: thank outgoing leaders, welcome incoming ones, and frame the rotation as a sign of community health, not instability.
7. Completion indicator: term limits and rotation provisions added to the governance charter, first planned transition completed successfully, and transition documentation template established.` },
        { title: "Create institutional memory systems — archives, oral histories, and knowledge management", done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2737",
              translation: "The early Muslims preserved the words and deeds of the Prophet (peace be upon him) through meticulous oral and written transmission, creating institutional memory that spans 1,400 years. Archives and oral histories follow this preservation tradition.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

When a founder leaves, they take with them decades of context, relationships, and tacit knowledge that no transition document can fully capture. Institutional memory systems capture this knowledge continuously, not as a one-time exit exercise. Archives preserve decisions and their rationale. Oral histories capture the stories, motivations, and lessons that documents miss. Knowledge management ensures that every community system is documented well enough to be maintained by anyone with the will to learn. Together, these systems make the community's institutional intelligence a communal asset rather than a personal one.


**How?**

1. Establish a physical and digital archive: all governance documents, financial records, meeting minutes, correspondence, community publications, photographs, and founding documents are stored in an organised, accessible, and backed-up system.
2. Assign an archivist role (rotating, like all roles) responsible for maintaining the archive, ensuring new documents are filed, and conducting periodic audits of completeness.
3. Record oral histories from founding members: structured interviews capturing their journey to the community, the decisions they were part of, the challenges they navigated, and their hopes for the future. These are primary historical sources for the second and third generations.
4. Implement a knowledge management practice: every process, system, and role is documented in the operational manuals, updated after any significant change, and accessible to all members.
5. Create a "community memory" ritual: annually, during the founding anniversary, founding members share a story or lesson from the community's history that newer members have not heard. This keeps institutional memory alive as living narrative, not just archived text.
6. Test institutional memory by occasionally having a non-expert attempt to execute a documented process — if they cannot follow it, the documentation needs improvement.
7. Completion indicator: archive system established and populated, at least 5 oral histories recorded, knowledge management integrated into all operational manuals, and annual memory-sharing ritual conducted.` },
        { title: "Develop a second-generation engagement strategy — ensuring children raised in the community choose to stay and lead", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 66:6",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا قُوا أَنفُسَكُمْ وَأَهْلِيكُمْ نَارًا",
              translation: "O you who have believed, protect yourselves and your families from a Fire. Engaging the second generation ensures the community's protective mission continues beyond its founders.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1358",
              translation: "The Prophet (peace be upon him) said: \"Every child is born upon the fitrah.\" A second-generation engagement strategy nurtures the fitrah of children raised in the community.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The cruelest irony of intentional communities is that the generation raised within them often leaves. Children who did not choose the community may feel it was imposed on them; teenagers who see the outside world may find community life constraining; young adults may want to forge their own identity separate from their parents' project. A second-generation engagement strategy does not coerce young people into staying — it gives them genuine reasons to stay by ensuring they have voice, agency, and a stake in the community's future. The community that retains its second generation has achieved something rarer and more valuable than any infrastructure or endowment.


**How?**

1. Begin early: involve children in age-appropriate community participation from childhood. Let them attend shura as observers, contribute to communal projects, and see their contributions recognised and valued.
2. Create a youth council: a formal body where teenagers discuss community matters, propose initiatives, and make recommendations to the shura. Give them real authority over youth-specific decisions (social events, their own learning programmes, community service projects).
3. Actively seek and incorporate youth feedback on community life: what do they enjoy? What frustrates them? What would they change? And then demonstrably act on their input — nothing disengages young people faster than being asked for opinions that are then ignored.
4. Provide pathways for second-generation members to gain leadership experience, take on meaningful roles, and envision themselves as the community's future stewards rather than its passive inheritors.
5. Acknowledge openly that some young people will leave — and make clear that leaving does not mean rejection. Create a "community alumni" category that maintains connection with those who go, leaving the door open for return.
6. Discuss succession explicitly with the second generation: they should know the community wants them to lead, not merely to inherit.
7. Completion indicator: youth council established with real advisory authority, at least two youth-proposed initiatives implemented, and a 5-year second-generation engagement plan developed and approved by both the shura and the youth council.` },
        { title: "Conduct a succession stress test — simulate founder departure and measure community resilience", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 59:18",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللَّهَ وَلْتَنظُرْ نَفْسٌ مَّا قَدَّمَتْ لِغَدٍ",
              translation: "O you who believe, fear Allah, and let every soul look to what it has put forth for tomorrow.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 21:35",
              arabic: "كُلُّ نَفْسٍ ذَائِقَةُ الْمَوْتِ ۗ وَنَبْلُوكُم بِالشَّرِّ وَالْخَيْرِ فِتْنَةً",
              translation: "Every soul will taste death. And We test you with evil and with good as trial.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 7138",
              translation: "The Prophet (peace be upon him) said: \"Each of you is a shepherd and each of you is responsible for his flock.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Plans are theories; stress tests are evidence. A succession plan that has never been tested under realistic conditions is an untested hypothesis about the community's resilience. A stress test — where one or more key founders temporarily step back from all roles and responsibilities — reveals the actual gaps between documented processes and lived practice. It exposes dependencies, communication breakdowns, and knowledge gaps that no amount of planning on paper can anticipate. Better to discover these weaknesses in a controlled test than in the uncontrolled reality of a founder's sudden departure, illness, or death.


**How?**

1. Design the stress test: one or more founders completely withdraw from all community roles and responsibilities for a defined period (2-4 weeks). They do not attend shura, do not handle their usual tasks, and do not answer questions about community operations.
2. Brief the community in advance: this is not a crisis but a deliberate test. The successors and remaining leadership know the test is happening and that they are expected to manage independently.
3. Assign observers (not participants) to monitor and document how the community functions during the test: Were decisions made? Were systems maintained? Where did confusion or delay occur? What knowledge was missing?
4. After the test period, conduct a thorough debrief with all stakeholders: founders, successors, shura council, and general community. What worked? What broke? What surprised everyone?
5. Produce a written stress test report with specific recommendations for strengthening succession preparedness.
6. Repeat the stress test annually, increasing the scope and duration each time, until the community can function normally without any founding-generation involvement for an extended period.
7. Completion indicator: first succession stress test conducted, debrief completed, written report produced with actionable recommendations, and follow-up test scheduled.` },
      ],
    },
    {
      title: "Create a resident-to-ambassador pathway — empowering members to seed new communities",
      priority: 'urgent', tags: ['ambassador', 'replication', 'da\'wah'],
      description: "The ultimate measure of the community's success is not its own flourishing but its ability to reproduce. A resident-to-ambassador pathway identifies, trains, and sends community members to help other Muslim communities form, using the replication guide and their lived experience as tools. This transforms the community from a single settlement into a network hub — a mother community that births others, creating the visible proof that Islamic social architecture scales beyond a single location.",
      subtasks: [
        { title: "Define the ambassador role — qualifications, responsibilities, and relationship to the home community", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 12:108",
              arabic: "قُلْ هَـٰذِهِ سَبِيلِي أَدْعُو إِلَى اللَّهِ ۚ عَلَىٰ بَصِيرَةٍ أَنَا وَمَنِ اتَّبَعَنِي",
              translation: "Say: This is my way; I invite to Allah with insight — I and those who follow me.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 28:26",
              arabic: "إِنَّ خَيْرَ مَنِ اسْتَأْجَرْتَ الْقَوِيُّ الْأَمِينُ",
              translation: "Indeed, the best one you can hire is the strong and the trustworthy.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2674",
              translation: "The Prophet (peace be upon him) said: \"Whoever establishes a good practice in Islam will have its reward and the reward of all who act upon it after him, without that diminishing their rewards in the slightest.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

An ambassador is not merely someone who moves away and starts something new — they are a representative of the community's model, values, and institutional knowledge. Without a clear role definition, well-meaning members may attempt to replicate the community without the competence to do so, misrepresenting the model or failing in ways that damage the original community's reputation. Defining the role ensures ambassadors are genuinely prepared, formally authorised, and continuously supported — and that the communities they help form are set up for success rather than abandoned after an initial burst of enthusiasm.


**How?**

1. Define qualifications: minimum residency period (e.g., 5 years), demonstrated leadership in at least one community system, completion of a leadership development pathway, deep familiarity with the replication guide, and endorsement by the shura council.
2. Define responsibilities: serve as the primary adviser to a forming community for a defined period (e.g., 2 years), conduct training sessions on governance, finance, conflict resolution, and community formation, provide honest counsel based on lived experience, and report back to the home community on progress and lessons learned.
3. Define the relationship to the home community: ambassadors remain members in good standing, retain their rights and contributions, and can return at any time. They are not exiled but deployed — the community invests in their mission as a communal priority.
4. Define what the home community provides: ongoing mentorship from experienced leaders, access to the replication guide and operational manuals, financial support during the advisory period if needed, and inclusion in the home community's governance communications.
5. Define what the ambassador does not do: they do not impose the home community's exact model — they advise, adapt, and support the forming community's own shura in making context-appropriate decisions.
6. Document the ambassador role in a formal role description approved by the shura council.
7. Completion indicator: a written ambassador role description with qualifications, responsibilities, support provisions, and relationship terms, approved by the shura council.` },
        { title: "Design an ambassador training programme — community formation, facilitation, and cross-cultural adaptation", done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (peace be upon him) said: \"Whoever follows a path in pursuit of knowledge, Allah will make easy for him a path to Paradise.\" An ambassador training programme equips members with the knowledge to seed new communities.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Living in a community and building one are different skills. An ambassador needs not only the lived experience of community life but also the facilitation, teaching, and cross-cultural skills to guide people through the founding process in contexts that may differ significantly from the home community. A farmer in rural England and a professional in suburban Texas face different land, legal, cultural, and social realities — the ambassador must know which elements of the model are universal principles and which are local adaptations. Training fills the gap between personal experience and transferable expertise.


**How?**

1. Design a training curriculum covering: the replication guide in depth (each section taught and discussed), facilitation and group process skills (how to guide a shura, mediate founding disagreements, and manage group dynamics), cross-cultural adaptation (how to adjust the model for different legal, climatic, economic, and cultural contexts), and practical coaching skills (how to advise without controlling).
2. Deliver the training through a combination of study sessions, role-plays, and practicum: trainees should practice facilitating a mock founding meeting, mediating a simulated conflict, and presenting the financial transparency system to a sceptical audience.
3. Include guest perspectives: invite members of other intentional communities (Muslim and non-Muslim) to share their founding experiences and lessons learned.
4. Require trainees to demonstrate competence through a capstone exercise: leading a full community formation workshop for a real or simulated audience, evaluated by experienced community leaders.
5. Provide ongoing professional development: ambassadors should have access to updated training, peer learning with other ambassadors, and annual retreats for reflection and skill-building.
6. Certify completion with a formal community endorsement — the shura council publicly recognises the ambassador as qualified to represent the model.
7. Completion indicator: training programme designed and delivered to at least 2 ambassador candidates, capstone exercises completed, and formal endorsements issued by the shura council.` },
        { title: "Establish a network of daughter communities — ongoing support, shared learning, and mutual aid", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 5:2",
              arabic: "وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ",
              translation: "And cooperate in righteousness and piety.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 3:103",
              arabic: "وَاعْتَصِمُوا بِحَبْلِ اللَّهِ جَمِيعًا وَلَا تَفَرَّقُوا",
              translation: "And hold firmly to the rope of Allah, all together, and do not become divided.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6011",
              translation: "The Prophet (peace be upon him) said: \"The believers, in their mutual kindness, compassion, and sympathy, are just like one body. When one limb suffers, the whole body responds to it with wakefulness and fever.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A mother community that sends ambassadors but then loses contact with the communities they help form misses the greatest opportunity of replication: network effects. When daughter communities remain connected, the entire network benefits from shared learning, mutual aid, and collective advocacy. A governance innovation in one community can be adopted by all. A financial crisis in one can be softened by contributions from others. A surplus of one resource in one community can address a scarcity in another. The network becomes greater than the sum of its parts — a living ecosystem of Muslim communities supporting each other across geography.


**How?**

1. Establish a formal network charter: daughter communities are independent and self-governing, but voluntarily join a network that provides mutual support, shared learning, and collective identity.
2. Create communication infrastructure: a regular newsletter, an annual conference or gathering, a shared digital platform for discussion and resource-sharing, and a point of contact in each community responsible for network communications.
3. Institute annual network gatherings: representatives from each community meet to share updates, present innovations, discuss common challenges, and strengthen relationships.
4. Establish mutual aid agreements: network communities commit to supporting each other during crises — financial contributions, volunteer labour, temporary housing for displaced members, and advisory support during governance difficulties.
5. Create a shared knowledge repository: as each community develops innovations in governance, finance, education, agriculture, or community life, these are documented and shared across the network.
6. Define network governance: how decisions affecting the whole network are made, how new communities join, and how the network's shared resources are managed.
7. Completion indicator: at least 2 daughter communities connected in a formal network, communication infrastructure operational, first network gathering conducted, and mutual aid agreements established.` },
        { title: "Develop an ambassador support and accountability system — mentoring, reporting, and care for deployed members", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 9:71",
              arabic: "وَالْمُؤْمِنُونَ وَالْمُؤْمِنَاتُ بَعْضُهُمْ أَوْلِيَاءُ بَعْضٍ يَأْمُرُونَ بِالْمَعْرُوفِ وَيَنْهَوْنَ عَنِ الْمُنكَرِ",
              translation: "The believing men and believing women are allies of one another. They enjoin what is right and forbid what is wrong. An ambassador support system ensures deployed members remain connected to their community of believers.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Ambassadors face unique challenges: they leave the community they love to do difficult, often lonely work in unfamiliar contexts. Without structured support, they burn out, lose motivation, or drift from the model. Without accountability, they may make decisions that do not represent the community's values or may need help they are too proud to request. A support and accountability system ensures ambassadors are cared for as whole people — not just evaluated on outcomes — while maintaining the quality and integrity of the replication effort. The community that sends its members into the field has a sacred obligation to sustain them there.


**How?**

1. Assign each ambassador a mentor from the home community's experienced leadership — someone they trust, who understands the ambassador role, and who is available for regular confidential conversations.
2. Establish a reporting cadence: monthly written updates to the shura council on the forming community's progress, challenges, and resource needs. Quarterly video calls with the mentor and at least one shura member.
3. Define support provisions: financial stipend or salary if the ambassador has left employment to serve, travel costs for visits home, access to the home community's professional network for specialised advice, and clear guidance on when to escalate problems beyond the ambassador's capacity.
4. Build in mandatory breaks: ambassadors must return to the home community for at least 2 weeks annually for rest, reconnection, and perspective. Isolation breeds poor judgement.
5. Create an accountability framework: the mentor and shura monitor not only the ambassador's effectiveness but their wellbeing — signs of burnout, family strain, or spiritual decline are addressed proactively, not after a crisis.
6. Celebrate ambassador contributions publicly: the community should honour those who serve externally with the same recognition given to those who serve internally.
7. Completion indicator: ambassador support system documented with mentor assignments, reporting cadence, financial provisions, mandatory breaks, and wellbeing monitoring, approved by the shura council.` },
        { title: "Launch a replication consultation service — offering structured guidance to forming communities", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 16:125",
              arabic: "ادْعُ إِلَىٰ سَبِيلِ رَبِّكَ بِالْحِكْمَةِ وَالْمَوْعِظَةِ الْحَسَنَةِ",
              translation: "Invite to the way of your Lord with wisdom and good instruction. A replication consultation service invites forming communities with wisdom and structured guidance.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The replication guide and ambassador programme are proactive tools, but many communities will discover your model on their own and reach out for help. A consultation service provides a structured channel for responding to these inquiries, ensuring that every forming community receives consistent, high-quality guidance regardless of whether an ambassador is available. Without this service, ad hoc advice from individual community members creates inconsistent messaging and unrealistic expectations. A formal consultation service scales the community's impact beyond the number of ambassadors it can deploy at any given time.


**How?**

1. Designate a consultation coordinator — a community member responsible for receiving, triaging, and responding to all external inquiries about community formation.
2. Create a tiered consultation offering: (a) self-service resources (replication guide, FAQ, video walkthroughs), (b) remote consultation (scheduled video calls with experienced community members), (c) on-site visits (forming communities send representatives to observe and learn in person), and (d) full ambassador deployment for committed communities.
3. Develop a standard intake questionnaire for forming communities: Where are they in the process? What resources do they have? What is their timeline? What specific guidance do they need?
4. Create a consultation protocol: initial assessment, matched adviser based on the forming community's needs, defined engagement period, and evaluation of outcomes.
5. Set expectations transparently: what the consultation provides (guidance, templates, lived experience) and what it does not (funding, guarantees, ongoing management).
6. Track all consultations in a simple database for network-building and follow-up.
7. Completion indicator: consultation service launched with coordinator, intake process, tiered offerings, and at least 3 consultations completed with forming communities.` },
      ],
    },
    {
      title: "Make the community visible proof of Islamic social architecture — media, scholarship, and public witness",
      priority: 'urgent', tags: ['da\'wah', 'visibility', 'proof-of-concept'],
      description: "The Muslim ummah is saturated with critiques of what is wrong and theories of what could be better. What it desperately lacks is working examples. Your community, if it thrives, is not merely a pleasant place to live — it is an argument. It is evidence that shura governs justly, that waqf sustains wealth, that ta'aruf builds social cohesion, and that Islamic education produces grounded young people. Making this evidence visible transforms a local community into a global contribution to the ummah's imagination of what is possible.",
      subtasks: [
        { title: "Build a public media presence — website, social media, and professional documentation of community life", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 14:24-25",
              arabic: "أَلَمْ تَرَ كَيْفَ ضَرَبَ اللَّهُ مَثَلًا كَلِمَةً طَيِّبَةً كَشَجَرَةٍ طَيِّبَةٍ أَصْلُهَا ثَابِتٌ وَفَرْعُهَا فِي السَّمَاءِ",
              translation: "Have you not considered how Allah presents an example — a good word like a good tree, whose root is firmly fixed and whose branches [high] in the sky? A public media presence lets the good tree of community life be witnessed widely.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A community that does excellent work in obscurity helps only itself. A public media presence is not vanity — it is da'wah through demonstration. When a Muslim family in another city sees your community's daily life documented honestly — the morning adhaan over farmland, children learning Quran and then building a garden bed, a shura council deliberating over real decisions — something shifts from "this is a nice idea" to "this is actually happening." That shift is the seed of every future community in your network.

**How?**

1. Build a community website as the central hub: vision statement, community story, photo gallery, replication guide download, consultation service access, and a regularly updated blog.
2. Establish social media accounts on platforms where Muslim communities are active, with a content calendar and designated content creators from among community members.
3. Commission professional photography and videography of community life: daily routines, seasonal events, infrastructure, and candid moments that convey the texture of communal living.
4. Publish regular content: blog posts on lessons learned, short videos of community activities, interviews with members sharing their experience, and photo essays documenting seasonal rhythms.
5. Maintain strict consent protocols: every member controls what images and stories of their family are shared publicly. No one is featured without explicit, renewable permission.
6. Ensure all content is honest: show struggles alongside successes. A sanitised portrait invites suspicion; an honest one builds credibility.
7. Completion indicator: community website live, social media accounts active with at least 3 months of regular content, professional photo and video library established, and consent protocols documented.` },
        { title: "Engage Islamic scholarship — invite scholars to study, critique, and write about the community model", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:104",
              arabic: "وَلْتَكُن مِّنكُمْ أُمَّةٌ يَدْعُونَ إِلَى الْخَيْرِ وَيَأْمُرُونَ بِالْمَعْرُوفِ وَيَنْهَوْنَ عَنِ الْمُنكَرِ ۚ وَأُولَٰئِكَ هُمُ الْمُفْلِحُونَ",
              translation: "Be a community that calls for what is good, urges what is right, and forbids what is wrong: those who do this are the successful ones.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 61:7",
              arabic: "وَمَنْ أَظْلَمُ مِمَّنِ افْتَرَىٰ عَلَى اللَّهِ الْكَذِبَ وَهُوَ يُدْعَىٰ إِلَى الْإِسْلَامِ ۚ وَاللَّهُ لَا يَهْدِي الْقَوْمَ الظَّالِمِينَ",
              translation: "Who could be more wrong than someone who invents lies against God when called to submit to Him? God does not guide the wrongdoers.",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              rationale: "inviting scholarly scrutiny ensures the community model is grounded in truth — not self-serving claims — lest it become guilty of this",
            },
            {
              kind: "quran",
              ref: "Quran 26:197",
              arabic: "أَوَلَمْ يَكُن لَّهُمْ آيَةً أَن يَعْلَمَهُ عُلَمَاءُ بَنِي إِسْرَائِيلَ",
              translation: "Is it not proof enough for them that the learned men of the Children of Israel have recognized it?",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              rationale: "scholarly recognition carries evidential weight — engaging Islamic scholarship gives the community model the same validating power",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 100",
              translation: "The Prophet (peace be upon him) said: \"Allah does not take away the knowledge, by taking it away from (the hearts of) the people, but takes it away by the death of the religious learned men till when none of the (religious learned men) remains, people will take as their leaders ignorant persons who when consulted will give their verdict without knowledge, so they will go astray and will lead the people astray.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Scholarly engagement provides intellectual legitimacy that media presence alone cannot achieve. When respected Islamic scholars study your community model and write about it — even critically — they validate that it is worthy of serious attention. Their analysis may reveal strengths you take for granted and weaknesses you have not recognised. Their publications reach audiences you cannot access directly: seminary students, Islamic university faculties, policy researchers, and intellectual leaders who shape how the ummah thinks about its future. A community that invites scholarly scrutiny demonstrates confidence in its model and humility about its limitations.


**How?**

1. Identify Islamic scholars, academics, and researchers whose work intersects with your community's areas: Islamic governance, waqf economics, Muslim community formation, Islamic education, and intentional community studies.
2. Invite 2-3 scholars to visit the community for an extended stay (1-2 weeks), providing accommodation, access to governance meetings, financial records, and community members willing to be interviewed.
3. Facilitate their research without controlling it: answer all questions honestly, provide all requested documents, and resist the temptation to stage-manage their experience.
4. Request that they share their findings with the community before publication — not for approval but for factual accuracy and the opportunity to respond.
5. Submit your own papers and presentations to relevant conferences: Islamic studies, community development, alternative economics, and social innovation gatherings.
6. Create a visiting scholar programme with defined terms: annual invitations, research support, and mutual benefit expectations.
7. Completion indicator: at least 2 scholars hosted, at least 1 academic paper or conference presentation produced, and a visiting scholar programme established with annual cycle.` },
        { title: "Offer the community as a case study for researchers studying Islamic social institutions", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:110",
              arabic: "كُنتُمْ خَيْرَ أُمَّةٍ أُخْرِجَتْ لِلنَّاسِ تَأْمُرُونَ بِالْمَعْرُوفِ وَتَنْهَوْنَ عَنِ الْمُنكَرِ وَتُؤْمِنُونَ بِاللَّهِ",
              translation: "[Believers], you are the best community singled out for people: you order what is right, forbid what is wrong, and believe in God.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 3:104",
              arabic: "وَلْتَكُن مِّنكُمْ أُمَّةٌ يَدْعُونَ إِلَى الْخَيْرِ وَيَأْمُرُونَ بِالْمَعْرُوفِ وَيَنْهَوْنَ عَنِ الْمُنكَرِ",
              translation: "Be a community that calls for what is good, urges what is right, and forbids what is wrong: those who do this are the successful ones.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 33:21",
              arabic: "لَّقَدْ كَانَ لَكُمْ فِي رَسُولِ اللَّهِ أُسْوَةٌ حَسَنَةٌ",
              translation: "The Messenger of God is an excellent model for those of you who put your hope in God and the Last Day and remember Him often.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 49",
              translation: "The Prophet (peace be upon him) said: \"Whoever among you sees an evil, let him change it with his hand; if he cannot, then with his tongue; if he cannot, then with his heart -- and that is the weakest of faith.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Academic case studies reach audiences that blog posts and social media cannot — university classrooms, policy think tanks, development agencies, and doctoral dissertations that shape how institutions think about Muslim communities for decades. By proactively offering your community as a case study, you control the narrative: researchers who arrive uninvited may misrepresent what they find, but researchers you invite and support will have the context to tell the story accurately. Every case study published is a permanent entry in the academic record that proves Islamic social architecture works in practice — evidence that outlasts any single community member or generation.


**How?**

1. Identify academic programmes and research centres studying relevant topics: intentional communities, religious community formation, alternative economics, Islamic social institutions, and sustainable development.
2. Draft a research partnership proposal: what access you offer (interviews, document review, participant observation), what protections you require (anonymity options, review for factual accuracy, consent protocols), and what you hope to gain (a copy of findings, feedback on community systems, academic visibility).
3. Distribute the proposal to identified programmes and respond to inbound research inquiries using the same framework.
4. Designate a community research liaison responsible for managing researcher relationships, scheduling access, and ensuring consent protocols are followed.
5. Create a participant consent form for community members who agree to be interviewed or observed — participation must be entirely voluntary.
6. Archive all published research in the community library and summarise key findings for the shura council and community members.
7. Completion indicator: at least 1 research partnership established, research protocols and consent forms documented, and first case study published or in progress.` },
        { title: "Speak at mosques, conferences, and community events — sharing the story as evidence of possibility", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 11:120",
              arabic: "وَكُلًّا نَّقُصُّ عَلَيْكَ مِنْ أَنبَاءِ الرُّسُلِ مَا نُثَبِّتُ بِهِ فُؤَادَكَ ۚ وَجَاءَكَ فِي هَٰذِهِ الْحَقُّ وَمَوْعِظَةٌ وَذِكْرَىٰ لِلْمُؤْمِنِينَ",
              translation: "So [Muhammad], We have told you the stories of the prophets to make your heart firm and in these accounts truth has come to you, as well as lessons and reminders for the believers.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 3461",
              translation: "The Prophet (peace be upon him) said: \"Convey [my teachings] to the people even if it were a single sentence.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Academic papers inform experts; public speaking inspires ordinary families. When a founding member stands before a mosque congregation or an Islamic conference audience and says "We did this — here is what it took, here is what it looks like, and here is how you can do it too," the effect is fundamentally different from reading about it online. The speaker carries the credibility of lived experience, can answer questions in real time, and can connect emotionally with the audience in ways that text cannot. Public speaking is the most direct form of da'wah through demonstration — one person's story becoming another family's motivation.


**How?**

1. Develop a community speaker programme: identify 3-5 members comfortable with public speaking and willing to represent the community externally.
2. Create a modular presentation: a core story (15 minutes) covering the community's founding, model, and current reality, with optional deep-dive modules on governance, waqf, education, conflict resolution, and replication.
3. Proactively seek speaking opportunities: local mosques, Islamic conventions, community development conferences, intentional community gatherings, and university guest lectures.
4. Prepare speakers through rehearsal and feedback — public speaking is a skill that improves with practice and honest critique.
5. Provide speakers with professional materials: presentation slides, printed community brochures, replication guide copies, and business cards linking to the community website and consultation service.
6. Track all speaking engagements and follow-up inquiries to measure the impact on awareness and replication interest.
7. Completion indicator: speaker programme established, at least 5 external presentations delivered across diverse venues, and follow-up inquiry tracking system operational.` },
        { title: "Publish the community's story in lasting formats — book, documentary, or podcast series", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 41:33",
              arabic: "وَمَنْ أَحْسَنُ قَوْلًا مِّمَّن دَعَا إِلَى اللَّهِ وَعَمِلَ صَالِحًا وَقَالَ إِنَّنِي مِنَ الْمُسْلِمِينَ",
              translation: "And who is better in speech than one who invites to Allah and does righteousness and says, Indeed, I am of the Muslims.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 3:110",
              arabic: "كُنتُمْ خَيْرَ أُمَّةٍ أُخْرِجَتْ لِلنَّاسِ",
              translation: "You are the best nation produced for mankind.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 2685",
              translation: "The Prophet (peace be upon him) said: \"Convey from me, even if it is one ayah.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Websites change, social media posts disappear, and conference presentations are forgotten. A book, documentary, or podcast series creates a lasting, portable, and deeply engaging record of the community's journey that can reach audiences across time and geography. A well-told story does what no manual can: it makes the reader or viewer feel what it is like to build and live in this community. It conveys the emotional texture — the fear, the joy, the exhaustion, the sakina — that transforms "an interesting idea" into "something I must do." This is the community's legacy in narrative form, and it is the most powerful recruitment tool for the next generation of community builders.


**How?**

1. Choose the format that best matches the community's capacity and audience: a book (deepest engagement, longest shelf life), a documentary film (widest emotional impact, highest production cost), or a podcast series (most accessible, easiest to produce incrementally).
2. Identify the storyteller: a community member with writing or filmmaking skills, or an external journalist, author, or documentarian who resonates with the community's values and will tell the story honestly.
3. Define the narrative arc: from initial vision through founding struggles to current reality, with honest treatment of failures, conflicts, and doubts alongside achievements and blessings.
4. Involve community members as sources and reviewers: the story must be collectively owned even if individually authored. No family's experience should be misrepresented.
5. Secure funding: community funds, crowdfunding from the wider Muslim community, grants from Islamic foundations or media organisations, or publisher advances.
6. Distribute widely: Islamic bookstores, online platforms, mosques, conferences, and community networks. Offer reduced or free copies to forming communities.
7. Completion indicator: at least one major publication (book, documentary, or podcast series) completed, distributed through at least 3 channels, and generating measurable interest from external communities.` },
      ],
    },
  ],

};
