// Seed tasks for Ummah pillar submodules (Hifz al-Ummah).
// Each submodule has tasks across CORE, GROWTH, and EXCELLENCE boards.
// Tasks are placed in the "To Do" column by default.

export const UMMAH_SEED_TASKS = {
  // ── COLLECTIVE ──

  // ── CORE: Foundational Obligations ──
  ummah_collective_core: [
    {
      title: "Sustain daily du'a for the global ummah's oppressed and afflicted",
      priority: 'urgent', tags: ['dua', 'global-ummah', 'foundation'],
      description: "The ummah is one body; when any part suffers the whole must respond. Before hands can act or wealth can flow, the heart must turn to Allah on behalf of the Muslims suffering in every region of the earth. This task establishes du'a for the global ummah as a fixed daily act of worship — not an emotional reaction to headlines.",
      subtasks: [
        { title: "Fix a daily slot for global-ummah du'a (after Fajr and before sleep)", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:186",
              arabic: "وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ ۖ أُجِيبُ دَعْوَةَ الدَّاعِ إِذَا دَعَانِ",
              translation: "When My servants ask you concerning Me — indeed I am near. I respond to the invocation of the supplicant when he calls upon Me.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 40:60",
              arabic: "وَقَالَ رَبُّكُمُ ادْعُونِي أَسْتَجِبْ لَكُمْ",
              translation: "And your Lord says: Call upon Me; I will respond to you.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 3370",
              translation: "The Prophet (peace be upon him) said: \"Du'a is the essence of worship.\"",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 618",
              translation: "Recorded in Sahih al-Bukhari 618: 'The prayer in congregation is twenty seven times superior to the prayer offered by person alone.' Also found in Sahih Muslim 1365 (degrees).",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) said: "Du'a is worship" (Tirmidhi). Without a fixed daily slot, du'a for the ummah becomes sporadic — triggered only by viral atrocities and fading when the news cycle moves on. A reserved time, ideally in the mustajab hours after Fajr and in the last third of the night, converts occasional concern into a binding covenant with Allah on behalf of His suffering servants.


**How?**

1. Choose two fixed windows: immediately after Fajr salah and in the final minutes before sleep.
2. Block each window as a non-negotiable appointment in your calendar or prayer app — at least 3 minutes each.
3. Write out a short opening formula (hamd, salawat on the Prophet) so you do not start cold.
4. Keep a small card, note on your phone, or printed sheet with the specific names, regions, and afflictions you will mention — remove the friction of remembering.
5. Do not skip the slot even when news is quiet; consistency matters more than intensity.
6. Track compliance on a simple calendar — one tick per slot fulfilled.
7. Completion indicator: 30 consecutive days of both slots fulfilled with documented ticks.` },
        { title: "Memorise Quranic and Prophetic du'as for the oppressed", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:75",
              arabic: "وَمَا لَكُمْ لَا تُقَاتِلُونَ فِي سَبِيلِ اللَّهِ وَالْمُسْتَضْعَفِينَ مِنَ الرِّجَالِ وَالنِّسَاءِ وَالْوِلْدَانِ الَّذِينَ يَقُولُونَ رَبَّنَا أَخْرِجْنَا مِنْ هَٰذِهِ الْقَرْيَةِ الظَّالِمِ أَهْلُهَا",
              translation: "And what is wrong with you that you do not fight in the cause of Allah and for the oppressed among men, women and children who say: Our Lord, take us out of this town whose people are oppressors.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 2:286",
              arabic: "رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا ۚ رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِن قَبْلِنَا",
              translation: "Our Lord, do not take us to task if we forget or err. Our Lord, do not lay upon us a burden like that which You laid upon those before us.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2448",
              translation: "The Prophet (peace be upon him) said: \"Beware of the supplication of the oppressed, for there is no barrier between it and Allah.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 1882",
              translation: "Recorded in Sahih Muslim 1882: 'People must cease to neglect the Friday prayer or Allah will seal their hearts...'",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Quran preserves the cries of the oppressed so that we may echo them. Borrowed Prophetic and Quranic words carry a weight our own words never reach — they are already in Allah's speech and His Messenger's tongue. Memorising them removes the excuse of "I don't know what to say" when tragedy strikes.


**How?**

1. Select 5 short, high-impact du'as: (a) 4:75's cry of the oppressed, (b) the closing verses of al-Baqarah, (c) "Hasbunallahu wa ni'mal-wakil", (d) the du'a of Prophet Yunus "La ilaha illa Anta, subhanaka inni kuntu min az-zalimin", (e) the Prophetic du'a against the hizb al-ahzab.
2. Write each out in Arabic with transliteration and translation on a single card.
3. Memorise one per week — recite it at least 10 times in your daily slots during that week.
4. Learn the context of each so the meaning lives in you, not just the syllables.
5. Test yourself at the end of each week: recite from memory without looking.
6. After 5 weeks, rotate them through your daily slot so none fall dormant.
7. Completion indicator: all 5 du'as memorised, understood in context, and rotated in daily use for at least 4 weeks.` },
        { title: "Name specific regions, peoples, and afflictions in your du'a", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:75",
              arabic: "رَبَّنَا أَخْرِجْنَا مِنْ هَٰذِهِ الْقَرْيَةِ الظَّالِمِ أَهْلُهَا وَاجْعَل لَّنَا مِن لَّدُنكَ وَلِيًّا وَاجْعَل لَّنَا مِن لَّدُنكَ نَصِيرًا",
              translation: "Our Lord, take us out of this town whose people are oppressors, and appoint for us from Yourself a protector and appoint for us from Yourself a helper.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1006",
              translation: "The Prophet (peace be upon him) supplicated against specific tribes by name — Ri'l, Dhakwan, and 'Usayyah — who had treacherously killed the reciters at Bi'r Ma'unah.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 4094",
              translation: "In the qunut al-nazilah, the Prophet (peace be upon him) named specific persecuted Muslims — al-Walid ibn al-Walid, Salamah ibn Hisham, 'Ayyash ibn Abi Rabi'ah — and asked Allah to rescue them by name.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) named specific persecuted Muslims in his qunut and named specific oppressor tribes in his imprecation. Generalised du'a is easier to forget and easier for the heart to detach from; specific du'a — for Gaza, Kashmir, Sudan, East Turkestan, Rohingya, Yemen, the Central African Republic — binds the heart to real people whose names and circumstances you know.


**How?**

1. Compile a standing list of the 6-8 most severe active afflictions against Muslim populations worldwide — research from reliable sources (see the awareness task).
2. For each, note the specific people being harmed (children, prisoners, displaced families, imams detained), not just the region.
3. Write each affliction as a one-line petition — "O Allah, relieve the people of [region] from [specific oppression] and replace their fear with safety."
4. Recite this list in your daily slot; update it as circumstances change.
5. When a new calamity strikes, add it immediately — do not wait for a round update.
6. Keep the language concrete and honest; avoid abstraction that insulates the heart.
7. Completion indicator: a named, specific petition list of at least 6 regions recited daily for 30 consecutive days.` },
        { title: "Perform qunut al-nazilah during salah when major calamities strike the ummah", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:153",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
              translation: "O you who have believed, seek help through patience and prayer. Indeed, Allah is with the patient.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 4094",
              translation: "Ibn 'Umar reported: The Prophet (peace be upon him) supplicated in the Fajr prayer for a month after the ruku', asking Allah to save certain oppressed believers and to punish specific oppressor tribes.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 675",
              translation: "Anas reported: The Prophet (peace be upon him) made qunut for a month after ruku', supplicating against the tribes who killed the reciters at Bi'r Ma'unah.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 690",
              translation: "Recorded in Sahih al-Bukhari 690: 'Straighten your rows as the straightening of rows is essential for a perfect and correct prayer.'",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Qunut al-nazilah is the Prophetic response to catastrophe: an extended du'a inserted into the obligatory prayers when a calamity strikes the Muslim body. It is sunnah mu'akkadah in the view of the majority and has been practised by the Prophet (peace be upon him), the Companions, and the imams of every generation during major afflictions. Reviving it transforms your salah from a private act into a communal frontline response.


**How?**

1. Study the fiqh of qunut al-nazilah in your madhab — where it is inserted (after ruku' in the final rak'ah), which prayers it is made in (typically the obligatory prayers, beginning with Fajr), and its wording.
2. Memorise a short, well-sourced qunut du'a in Arabic with understanding.
3. Coordinate with your local imam: encourage the establishment of qunut al-nazilah during active major calamities against the ummah.
4. If no imam leads it, perform it yourself in your own salah when praying individually.
5. Continue the qunut until the calamity lifts or for a defined period (the Prophet's qunut for Bi'r Ma'unah lasted one month).
6. Teach your household and circle so the practice is not a private curiosity.
7. Completion indicator: qunut al-nazilah performed personally in obligatory prayers for one full calamity cycle (minimum 30 days) and proposed to at least one local imam.` },
        { title: "Cultivate khushu' and tears — refuse hollow du'a for the ummah", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 23:76",
              arabic: "وَلَقَدْ أَخَذْنَاهُم بِالْعَذَابِ فَمَا اسْتَكَانُوا لِرَبِّهِمْ وَمَا يَتَضَرَّعُونَ",
              translation: "And We seized them with punishment, but they did not humble themselves to their Lord, nor did they supplicate with humility.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 7:55",
              arabic: "ادْعُوا رَبَّكُمْ تَضَرُّعًا وَخُفْيَةً ۚ إِنَّهُ لَا يُحِبُّ الْمُعْتَدِينَ",
              translation: "Call upon your Lord in humility and privately. Indeed, He does not like transgressors.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 3479",
              translation: "The Prophet (peace be upon him) said: \"Call upon Allah while being certain of being answered, and know that Allah does not respond to a du'a from a heedless, distracted heart.\"",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Du'a without presence of heart is a body without a soul. The Prophet (peace be upon him) warned that Allah does not answer from a heart that is heedless. Rattling off petitions while scrolling or half-asleep is not du'a — it is performance. For the ummah's situation to shift, the believer's heart must shift first: tears for the oppressed, urgency in the tongue, and attentiveness to the One being addressed.


**How?**

1. Before beginning du'a, pause for 10 seconds: recall that Allah hears, that the oppressed cry out right now, and that you are a cause Allah may use.
2. Physically lower your voice and raise your hands — posture shapes presence.
3. Read or recall a short passage about the afflicted before du'a — a verified news line, a named child, an imam imprisoned — to break numbness.
4. Do not rush. Repeat the most urgent petitions 3 times with deliberate slowness.
5. If tears do not come, ask for them — the Prophet (peace be upon him) taught us to seek a heart that weeps.
6. End with salawat and hamd; do not abandon the slot until the heart has been stirred, even briefly.
7. Completion indicator: 30 documented slots in which the believer can honestly say the du'a was attentive, not mechanical.` },
      ],
    },
    {
      title: "Maintain informed awareness of major ummah afflictions",
      priority: 'urgent', tags: ['awareness', 'global-ummah', 'crisis-literacy'],
      description: "A Muslim cannot weep, give, boycott, or bear witness for what they do not know. Strategic ignorance of the ummah's wounds is not neutrality — it is abandonment. This task establishes a disciplined, sustainable practice of staying informed about major afflictions against Muslims worldwide, without falling into doomscrolling, despair, or propaganda capture.",
      subtasks: [
        { title: "Identify the major active afflictions against the global ummah", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:10",
              arabic: "إِنَّمَا الْمُؤْمِنُونَ إِخْوَةٌ فَأَصْلِحُوا بَيْنَ أَخَوَيْكُمْ",
              translation: "The believers are but brothers, so make settlement between your brothers.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 4:75",
              arabic: "وَمَا لَكُمْ لَا تُقَاتِلُونَ فِي سَبِيلِ اللَّهِ وَالْمُسْتَضْعَفِينَ",
              translation: "And what is wrong with you that you do not fight in the cause of Allah and for the oppressed?",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2586",
              translation: "The Prophet (peace be upon him) said: \"The example of the believers in their mutual love, mercy and compassion is like one body: when one limb aches, the whole body responds with sleeplessness and fever.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophetic image of the ummah as one body makes ignorance of its afflictions a spiritual pathology — a body that does not feel its own wounds is diseased. Before any coherent response, a believer must clearly know what is happening: which peoples are under occupation, which are being displaced, which are imprisoned for their faith, which are being erased culturally. Vagueness produces vague action; specificity produces targeted response.


**How?**

1. Set aside 60 focused minutes to produce a written inventory of major active afflictions — occupation, genocide, ethnic cleansing, mass incarceration, forced displacement, religious persecution, famine, and war affecting Muslim populations.
2. For each entry, note: the people affected, the nature of the oppression, the duration, the key actors, and the scale (numbers of killed, displaced, imprisoned).
3. Cross-reference at least 3 sources per entry — do not rely on a single outlet.
4. Categorise entries by severity: daruri (life-threatening, active killing), haji (systemic oppression short of mass killing), tahsini (cultural, religious restriction).
5. Date the inventory and commit to reviewing it quarterly.
6. Share the inventory with family or close circle as a baseline for informed household du'a and giving.
7. Completion indicator: a dated, sourced, household-shared inventory of at least 6 major active afflictions against the global ummah.` },
        { title: "Curate a trustworthy roster of Muslim news and analysis sources", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:6",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا إِن جَاءَكُمْ فَاسِقٌ بِنَبَإٍ فَتَبَيَّنُوا أَن تُصِيبُوا قَوْمًا بِجَهَالَةٍ فَتُصْبِحُوا عَلَىٰ مَا فَعَلْتُمْ نَادِمِينَ",
              translation: "O you who have believed, if there comes to you a disobedient one with information, investigate, lest you harm a people out of ignorance and become regretful over what you have done.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 5",
              translation: "The Prophet (peace be upon him) said: \"It is enough lying for a man to narrate everything he hears.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Most mainstream outlets systematically misrepresent Muslim affairs — laundering aggressors as defenders, framing victims as threats, and burying stories that indict power. Uncritical consumption produces a distorted mental map of the ummah. At the same time, not every Muslim-branded outlet is honest — some are regime mouthpieces, some are sensationalist, some are captured by factions. Curation is an act of wara' (cautious scrupulousness) applied to information.


**How?**

1. Compile a short list of candidate sources: independent outlets (e.g., Middle East Eye, Al Jazeera English investigations, The Cradle, regional journalists), scholarly voices, and on-the-ground reporters.
2. For each candidate, apply three tests: (a) track record of factual accuracy, (b) transparency about funding and affiliation, (c) willingness to criticise both enemies and allies of its editorial line.
3. Remove any source that fails on consistent fact-checks or shows clear factional capture.
4. Aim for 4-6 sources covering complementary regions (MENA, South Asia, Southeast Asia, Africa, Europe, Americas).
5. Follow them in a dedicated reader (RSS, bookmarks, a subscription list) — not through the algorithmic feed of a social platform.
6. Review the roster every 6 months; sources drift.
7. Completion indicator: a written, dated roster of 4-6 vetted sources with documented justification for each inclusion.` },
        { title: "Establish a weekly rhythm for ummah news — refuse doomscrolling", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 25:67",
              arabic: "وَالَّذِينَ إِذَا أَنفَقُوا لَمْ يُسْرِفُوا وَلَمْ يَقْتُرُوا وَكَانَ بَيْنَ ذَٰلِكَ قَوَامًا",
              translation: "And those who, when they spend, do so without excess or stinginess, but in between that, moderately.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 2517",
              translation: "The Prophet (peace be upon him) said: \"Leave that which makes you doubt for that which does not make you doubt.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Ibn Majah 4102",
              translation: "The Prophet (peace be upon him) said: \"Part of the excellence of a man's Islam is his leaving that which does not concern him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Doomscrolling is not awareness — it is anxiety dressed as solidarity. Compulsively consuming atrocity footage degrades the heart, numbs response capacity, and substitutes emotional consumption for action. Islam teaches moderation even in otherwise good things. A structured rhythm — deep, focused weekly review and immediate alert for major events — produces a more responsive and durable believer than a constant drip of trauma.


**How?**

1. Block a fixed 45-60 minute window per week (e.g., Saturday morning) for a concentrated review of ummah news across your curated sources.
2. During the week, disable push notifications from news apps and unfollow algorithm-driven feeds; rely on your reader and explicit check-ins.
3. Set one emergency trigger: a single trusted person or channel that alerts you to genuinely major events so you need not hover.
4. Use the weekly window to: update your affliction inventory, add names to your du'a list, identify one concrete response (donation, boycott verification, public statement).
5. Close the session with du'a and then put the feeds away.
6. Track your compliance; if you find yourself scrolling outside the window, treat it as a slip to be corrected.
7. Completion indicator: 8 consecutive weeks of structured rhythm with no compulsive scrolling, documented via time-tracking or honest journal.` },
        { title: "Share verified information with household and community", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:104",
              arabic: "وَلْتَكُن مِّنكُمْ أُمَّةٌ يَدْعُونَ إِلَى الْخَيْرِ وَيَأْمُرُونَ بِالْمَعْرُوفِ وَيَنْهَوْنَ عَنِ الْمُنكَرِ",
              translation: "And let there be arising from you a community inviting to good, enjoining what is right, and forbidding what is wrong.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 3461",
              translation: "The Prophet (peace be upon him) said: \"Convey from me, even if it is one verse.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Information hoarded is information neutralised. Many Muslims remain passive about the ummah's crises because no one in their life ever explained what was happening with clarity and restraint. Transmitting verified information to your household, children, and inner circle breaks the isolation that enemies of the ummah rely on. Transmission must be disciplined — only what you have verified, without exaggeration, without sensationalism.


**How?**

1. Appoint yourself the "amanah reporter" for your household — commit to one brief, calm, fact-based update per week on what is happening to Muslims globally.
2. Prepare a 5-minute summary drawn from your weekly review: region, situation, key numbers, one action the household can take.
3. Deliver it at a regular time — Friday dinner, Saturday breakfast, a family gathering — without phones present.
4. Age-adapt the content for children; they deserve truth, not shielding and not nightmare material.
5. Encourage questions; do not speak beyond what you have verified.
6. Extend the practice to close friends or a study circle if appropriate.
7. Completion indicator: 12 consecutive weeks of household updates delivered with notes and documented engagement.` },
        { title: "Protect your heart from despair and cynicism while bearing the burden", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 12:87",
              arabic: "وَلَا تَيْأَسُوا مِن رَّوْحِ اللَّهِ ۖ إِنَّهُ لَا يَيْأَسُ مِن رَّوْحِ اللَّهِ إِلَّا الْقَوْمُ الْكَافِرُونَ",
              translation: "And do not despair of relief from Allah. Indeed, no one despairs of relief from Allah except the disbelieving people.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 94:5-6",
              arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ۝ إِنَّ مَعَ الْعُسْرِ يُسْرًا",
              translation: "For indeed, with hardship will be ease. Indeed, with hardship will be ease.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2999",
              translation: "The Prophet (peace be upon him) said: \"Amazing is the affair of the believer — all of it is good for him, and this is not for anyone except the believer. If good befalls him he is grateful, and that is good for him; and if harm befalls him he is patient, and that is good for him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Allah forbids despair of His mercy and categorises it with kufr (12:87). Yet a steady diet of atrocity without corresponding spiritual grounding produces despair, cynicism, and paralysis — the very outcome the oppressors would choose for the ummah if they could. Tawakkul and yaqin in Allah's promise that "with hardship comes ease" are not decorative — they are load-bearing beams for the Muslim who stays informed.


**How?**

1. Pair every awareness session with a tethering act: recite the last verses of al-Baqarah, or the closing of Surah al-Ahzab, or Surah ash-Sharh.
2. Keep a running list of victories — relief, births, conversions, releases from prison, rebuilt mosques — so that losses are not the only data you see.
3. Limit input and enforce output: for every hour of news, ensure at least one concrete act of response (du'a, giving, speaking, writing).
4. Seek companionship — isolation amplifies despair; shared grief with believers who also respond converts despair into resolve.
5. Consult a trusted scholar or counsellor if despair persists — it is a spiritual condition, not a permanent verdict.
6. Rehearse the language of qadar: what is happening is under Allah's decree and within His plan.
7. Completion indicator: 90 days of sustained awareness with no episode of paralysing despair, supported by a tethering practice and documented victories list.` },
      ],
    },
    {
      title: "Direct a standing portion of sadaqah and cross-border zakat to the global ummah",
      priority: 'urgent', tags: ['sadaqah', 'zakat', 'global-aid', 'solidarity'],
      description: "Du'a and awareness are incomplete without material flow. The wealth of the ummah must reach the parts of it that bleed. This task establishes an intentional, ongoing financial pipeline — distinct from ad-hoc emotional giving — that channels a fixed portion of sadaqah and zakat across borders to the Muslims most afflicted by war, famine, displacement, and persecution.",
      subtasks: [
        { title: "Calculate and commit a standing monthly allocation for global-ummah causes", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:261",
              arabic: "مَّثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنبَتَتْ سَبْعَ سَنَابِلَ فِي كُلِّ سُنبُلَةٍ مِّائَةُ حَبَّةٍ",
              translation: "The example of those who spend their wealth in the way of Allah is like a seed which grows seven spikes; in each spike is a hundred grains.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 63:10",
              arabic: "وَأَنفِقُوا مِن مَّا رَزَقْنَاكُم مِّن قَبْلِ أَن يَأْتِيَ أَحَدَكُمُ الْمَوْتُ فَيَقُولَ رَبِّ لَوْلَا أَخَّرْتَنِي إِلَىٰ أَجَلٍ قَرِيبٍ فَأَصَّدَّقَ",
              translation: "And spend from what We have provided you before death approaches one of you and he says: My Lord, if only You would delay me for a brief term so I would give charity.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1410",
              translation: "The Prophet (peace be upon him) said: \"The most beloved deed to Allah is the most regular and constant, even if it is little.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Emotional giving spikes with crises and collapses between them — leaving gaps precisely when sustained support is needed most. A standing monthly allocation, however modest, produces predictable flow that aid organisations can plan around and builds a sadaqah jariyah of consistency. The Prophet (peace be upon him) praised the constant small act over the inconsistent large one. This is the structure that outlasts the news cycle.


**How?**

1. Review your last 6 months of discretionary spending to identify capacity honestly.
2. Set an intentional monthly figure — framed as a fixed line item in your budget, not a leftover.
3. Allocate the total across categories: acute relief (e.g., Gaza, Sudan), persecuted minorities (Uyghurs, Rohingya), and long-term support (orphans, rebuilding, education).
4. Commit in writing to maintain or increase (never decrease) the amount for 12 months.
5. Write the niyyah: "O Allah, I make this a standing sadaqah for the afflicted of the ummah — accept it and multiply it."
6. Review the allocation quarterly; raise it if Allah has expanded your rizq.
7. Completion indicator: a written 12-month standing allocation with category breakdown, first 3 months executed on schedule.` },
        { title: "Verify cross-border zakat eligibility in your madhab and act on it", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 9:60",
              arabic: "إِنَّمَا الصَّدَقَاتُ لِلْفُقَرَاءِ وَالْمَسَاكِينِ وَالْعَامِلِينَ عَلَيْهَا وَالْمُؤَلَّفَةِ قُلُوبُهُمْ وَفِي الرِّقَابِ وَالْغَارِمِينَ وَفِي سَبِيلِ اللَّهِ وَابْنِ السَّبِيلِ",
              translation: "Zakat is only for the poor, the needy, those employed to collect it, those whose hearts are to be reconciled, for freeing captives, for those in debt, for the way of Allah, and for the stranded traveller.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1395",
              translation: "The Prophet (peace be upon him) said to Mu'adh when he sent him to Yemen: \"Inform them that Allah has enjoined on them zakat, to be taken from their wealthy and given to their poor.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The classical ruling in most madhahib is that zakat should ideally be distributed to the poor of one's own locality first — but this is a preference, not an absolute prohibition on cross-border distribution, and scholars across schools have long permitted and even recommended sending zakat where the need is catastrophically greater. When Muslim populations face famine, siege, or ethnic cleansing, the fuqara' and masakin of those regions have a claim that no believer can responsibly ignore on a technicality.


**How?**

1. Identify your madhab's position on cross-border zakat and the conditions under which it is permitted or recommended.
2. If unclear, consult a qualified local scholar who is familiar with the current global context, not just classical hypotheticals.
3. Calculate your zakat accurately when due — nisab, hawl, and all zakatable assets.
4. Allocate a specific portion of your zakat (not just sadaqah) to vetted channels reaching the poor of afflicted regions; document the intention and the madhab basis.
5. Retain receipts and the fatwa reference so your zakat is both executed and defensible.
6. Review annually — as circumstances shift, the allocation should shift with them.
7. Completion indicator: a documented zakat calculation and cross-border distribution with scholarly basis recorded, executed for at least one hawl cycle.` },
        { title: "Select vetted relief organisations with transparent delivery to afflicted regions", done: false,
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
              kind: "hadith",
              ref: "Sahih al-Bukhari 33",
              translation: "The Prophet (peace be upon him) said: \"The signs of a hypocrite are three: when he speaks he lies, when he promises he breaks his promise, and when he is entrusted he betrays the trust.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Giving is worship; misdirected giving is worship wasted and sometimes worse — it can fund overhead, fraud, or actors compromised by regimes. Organisations handling Muslim aid have widely varying levels of integrity, access, and operational capacity. The believer's amanah extends to who receives the flow: choose carefully or the trust entrusted to you fails to reach its rightful recipients.


**How?**

1. Identify 8-12 candidate organisations across the regions you plan to support.
2. Apply verification criteria: (a) audited financials and transparent overhead ratio, (b) direct operational presence in the affected region or verified local partners, (c) track record in previous crises, (d) clarity about religious orientation and compatibility with your giving intent, (e) no known entanglement with regimes oppressing Muslims.
3. Prefer organisations run by or accountable to Muslims with standing in the affected community.
4. Narrow to a shortlist of 3-5 that cover your allocation categories.
5. Diversify rather than concentrating all flow in one channel.
6. Re-verify annually — organisations evolve, sometimes in compromised directions.
7. Completion indicator: a documented, dated shortlist of 3-5 vetted organisations with verification notes for each.` },
        { title: "Set up automated recurring transfers to remove mood dependence", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:274",
              arabic: "الَّذِينَ يُنفِقُونَ أَمْوَالَهُم بِاللَّيْلِ وَالنَّهَارِ سِرًّا وَعَلَانِيَةً فَلَهُمْ أَجْرُهُمْ عِندَ رَبِّهِمْ وَلَا خَوْفٌ عَلَيْهِمْ وَلَا هُمْ يَحْزَنُونَ",
              translation: "Those who spend their wealth by night and by day, secretly and publicly — they will have their reward with their Lord. There will be no fear upon them, nor will they grieve.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1410",
              translation: "The Prophet (peace be upon him) said: \"The most beloved deeds to Allah are those done consistently, even if small.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Human intention is a fragile thing — the niyyah made today can be worn down by fatigue, distraction, or competing expenses by the end of the month. Automation preserves the intention by acting on it before the self has a chance to renegotiate. The verse praises those who spend "by night and by day, secretly and publicly" — the rhythm is what is praised. Scheduled transfers institutionalise that rhythm.


**How?**

1. For each shortlisted organisation, set up a recurring monthly transfer matching your allocation.
2. Time the transfers to immediately after income arrives — first payer, not last.
3. Use bank-level standing orders or direct debit rather than relying on an organisation's portal, so you retain control and visibility.
4. Keep a simple spreadsheet tracking: date, amount, recipient, purpose, zakat-or-sadaqah.
5. Renew niyyah weekly or monthly — the reward depends on intention, and automation must not erode it.
6. Review the setup every 6 months; adjust as your rizq and the landscape change.
7. Completion indicator: recurring transfers active for at least 6 consecutive months, logged with niyyah renewals.` },
        { title: "Multiply impact by raising funds from your household, circle, and workplace", done: false,
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
              kind: "hadith",
              ref: "Sahih Muslim 1893",
              translation: "The Prophet (peace be upon him) said: \"Whoever guides someone to good will have a reward similar to the one who does it.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) taught that the one who points the way to good shares its reward. Your personal allocation is a seed; your ability to move your spouse, children, extended family, colleagues, and masjid to give is a multiplier. Many people want to give but lack a trusted conduit — offering yourself as that conduit can shift an entire circle's practice without compromising sincerity, as long as the framing is du'a not display.


**How?**

1. Speak with your spouse first — agree a household allocation that both contribute to.
2. Teach your children by involving them: a small fixed weekly amount from allowance, chosen by them from the shortlist.
3. Invite your extended family into a shared family fund for a specific ummah cause each year.
4. Organise a modest periodic appeal at your masjid, workplace, or study circle with clear target, transparent reporting, and vetted channels.
5. Report back on outcomes — what was raised, where it went, what was accomplished — so trust compounds.
6. Guard sincerity: aim for the audience that multiplies, not the audience that admires.
7. Completion indicator: a second ongoing giving stream operating beyond your personal allocation (household, family, or circle), with at least 6 months of sustained activity.` },
      ],
    },
    {
      title: "Refuse material participation in clear oppression of the ummah",
      priority: 'high', tags: ['boycott', 'wara', 'witness', 'consumption'],
      description: "Every purchase is a vote and a sadaqah of its opposite. When companies and industries directly fund weapons, settlements, or regimes visibly oppressing Muslims, continuing to hand them money is not a neutral economic act — it is material participation in wrongdoing. This task establishes a disciplined, sustained refusal to finance clear oppression of the ummah through one's consumption.",
      subtasks: [
        { title: "Identify companies and products directly funding clear oppression of Muslims", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 5:2",
              arabic: "وَلَا تَعَاوَنُوا عَلَى الْإِثْمِ وَالْعُدْوَانِ ۚ وَاتَّقُوا اللَّهَ",
              translation: "And do not cooperate in sin and aggression. And fear Allah.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 4:140",
              arabic: "فَلَا تَقْعُدُوا مَعَهُمْ حَتَّىٰ يَخُوضُوا فِي حَدِيثٍ غَيْرِهِ ۚ إِنَّكُمْ إِذًا مِّثْلُهُمْ",
              translation: "Do not sit with them until they engage in another conversation. Indeed, you would then be like them.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 49",
              translation: "The Prophet (peace be upon him) said: \"Whoever of you sees an evil, let him change it with his hand; if he cannot, then with his tongue; if he cannot, then with his heart — and that is the weakest of faith.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 601",
              translation: "Recorded in Sahih al-Bukhari 601: 'one of you should pronounce the Adhan for the prayer when its time is due.' Also in Sahih Muslim 1423.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Allah forbids cooperation in sin and aggression (5:2). When a corporation's profits demonstrably fund occupation, weapons used against Muslim civilians, or regime machinery persecuting believers, the consumer who continues to buy becomes a downstream contributor to that aggression. Vague feelings of disapproval are not enough; the believer needs a specific, named, sourced list to act on.


**How?**

1. Identify credible research organisations tracking corporate complicity (e.g., BDS movement vetted lists, AFSC, reputable investigative journalism).
2. Build a written list of companies with documented, direct complicity — not vague associations but concrete evidence of material support to oppression.
3. Categorise: (a) primary boycott targets (direct weapons, settlements, regime services), (b) secondary (substantial funders of primary actors), (c) contested (disputed evidence).
4. Document the source for each entry so the list is defensible when challenged.
5. Update the list quarterly as evidence evolves and as targeted campaigns shift.
6. Err on the side of caution when evidence is disputed; the point is clarity, not maximalism.
7. Completion indicator: a dated, sourced, categorised list of companies with documented complicity, reviewed at least once.` },
        { title: "Audit your recurring purchases and subscriptions against the list", done: false,
          sources: [
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
              kind: "hadith",
              ref: "Jami at-Tirmidhi 614",
              translation: "The Prophet (peace be upon him) said: \"A body nourished by haram will not enter Paradise.\"",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 2518",
              translation: "The Prophet (peace be upon him) said: \"Leave that which makes you doubt for that which does not make you doubt.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Most people have no clear picture of where their money actually flows. Household spending is opaque, subscription creep is real, and boycott intentions that never touch the actual budget are theatre. A concrete audit — credit card statements, recurring charges, grocery lists — converts abstract disapproval into discoverable, addressable line items. Without this, the boycott is a slogan.


**How?**

1. Pull the last 90 days of bank and credit card statements.
2. Highlight every transaction corresponding to a company on your list — direct purchases, subsidiaries, platform fees, streaming, SaaS, retail.
3. Identify recurring subscriptions you forgot about.
4. Calculate the monthly total flowing to boycott-target companies.
5. Categorise each into: easy switch, moderate friction, difficult (e.g., tools with no viable alternative).
6. Rank by monetary impact — start where your money flow is largest.
7. Completion indicator: a written audit with every flagged transaction, total monthly outflow, and priority switching list.` },
        { title: "Commit to halal and ethical alternatives for each substitutable item", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:168",
              arabic: "يَا أَيُّهَا النَّاسُ كُلُوا مِمَّا فِي الْأَرْضِ حَلَالًا طَيِّبًا",
              translation: "O mankind, eat from whatever is on the earth that is lawful and good.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 1599",
              translation: "The Prophet (peace be upon him) said: \"Allah is good and accepts only that which is good.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Boycott without substitution is attrition that eventually fails. Human beings adapt; deprivation without a positive alternative collapses under convenience. The believer's boycott is best sustained when it is paired with the pleasure of discovering halal, ethical, often Muslim-owned alternatives — supporting the producers who are building an independent economic base rather than simply punishing the old one.


**How?**

1. For each priority item from the audit, research 2-3 replacement options — prefer Muslim-owned, locally sourced, or at minimum non-complicit alternatives.
2. Trial each alternative personally; adjust based on quality, availability, and price.
3. Switch the recurring purchase or subscription once the alternative is confirmed acceptable.
4. Cancel the original subscription explicitly, stating the reason in writing when a channel exists — companies track cancellations.
5. Stock the household with alternatives so convenience does not push you back.
6. Share discovered alternatives with your household and circle; this lowers their switching cost.
7. Completion indicator: every item on your priority switching list has a documented alternative in active use for at least 60 days.` },
        { title: "Teach your household why — not just what — you are boycotting", done: false,
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
              kind: "hadith",
              ref: "Sahih al-Bukhari 893",
              translation: "The Prophet (peace be upon him) said: \"Each of you is a shepherd and each of you is responsible for his flock. The man is a shepherd over his family and responsible for them.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A boycott imposed without explanation becomes a rule the household tolerates and quietly violates. A boycott rooted in understood principle — "we do not feed our wealth to those who fund the killing of Muslims" — becomes part of identity. Children raised with explained principle carry the discipline forward; children raised with unexplained rules rebel against them. The Qur'anic command to protect one's household applies to their consciences as much as their bodies.


**How?**

1. Hold a short, age-appropriate household conversation explaining the principle: Allah forbids cooperating in oppression, we express that through where our money goes.
2. Show, with simple examples, the link between specific products and specific harms — without traumatising details for young children.
3. Invite questions; do not speak beyond what you have verified.
4. Co-design the household replacement list with your spouse and children — ownership increases compliance.
5. Revisit the conversation periodically as new information emerges.
6. Model the principle in your own behaviour consistently; children detect inconsistency immediately.
7. Completion indicator: documented household conversations and a co-owned replacement list that all household members understand and reference.` },
        { title: "Hold the boycott long-term — measure by years, not weeks", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 11:115",
              arabic: "وَاصْبِرْ فَإِنَّ اللَّهَ لَا يُضِيعُ أَجْرَ الْمُحْسِنِينَ",
              translation: "And be patient, for indeed, Allah does not allow to be lost the reward of those who do good.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 3:200",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا اصْبِرُوا وَصَابِرُوا وَرَابِطُوا",
              translation: "O you who have believed, persevere and endure and remain stationed.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1469",
              translation: "The Prophet (peace be upon him) said: \"Whoever remains patient, Allah will grant him patience, and no one is given anything better and more generous than patience.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Boycotts that collapse after a news cycle embolden the targets and teach the market that Muslim consumer conscience is performative. Historical boycotts that produced real shifts — whether anti-apartheid or anti-colonial — measured their duration in decades. Sabr over years is itself ibadah; Allah explicitly praises the ribat (remaining stationed) of the believers. Treat the boycott as a lifelong spiritual discipline, not a seasonal campaign.


**How?**

1. Reframe the boycott in your mind as a permanent dietary-style discipline until the oppression verifiably ends — not a campaign with a quit date.
2. Assume slippage; build systems (written list, household agreement, phone notes) that catch relapses rather than relying on memory.
3. Track duration openly: how many months or years since you last financed a flagged company.
4. Re-evaluate only when the underlying evidence changes — not when it becomes inconvenient.
5. Protect against normalisation: periodically remind yourself why you started.
6. Share milestones with your circle to reinforce collective memory.
7. Completion indicator: 12 consecutive months of sustained boycott with documented tracking, audit refreshed at least once, and one successful recovery from a slippage incident.` },
      ],
    },
    {
      title: "Bear public witness when the ummah is attacked",
      priority: 'high', tags: ['witness', 'amr-bil-maruf', 'tongue', 'haqq'],
      description: "Silence before clear oppression is a spiritual failure with a cost on the Day of Judgement. The Prophet (peace be upon him) ranked speaking the truth against a tyrant among the greatest jihads. This task establishes the habit of public witness — in speech, in writing, in presence — when Muslims are attacked, without descending into reckless speech or empty performance.",
      subtasks: [
        { title: "Speak the truth on your platform when major attacks on the ummah occur", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:135",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا كُونُوا قَوَّامِينَ بِالْقِسْطِ شُهَدَاءَ لِلَّهِ وَلَوْ عَلَىٰ أَنفُسِكُمْ",
              translation: "O you who have believed, be persistently standing firm in justice, witnesses for Allah, even if it be against yourselves.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 33:70-71",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللَّهَ وَقُولُوا قَوْلًا سَدِيدًا ۝ يُصْلِحْ لَكُمْ أَعْمَالَكُمْ",
              translation: "O you who have believed, fear Allah and speak words of appropriate justice. He will amend for you your deeds.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 4344",
              translation: "The Prophet (peace be upon him) said: \"The greatest jihad is a word of truth before a tyrannical ruler.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Every believer has a platform — a family group chat, a personal social media account, a classroom, a workplace. Refusing to use that platform in the face of clear oppression of the ummah is a form of the "heart-level" faith the Prophet (peace be upon him) called the weakest. Speaking publicly, truthfully, and responsibly is not optional for those with voice — it is the minimum witness that Islam requires when the body suffers.


**How?**

1. Identify your honest platform: where you already speak and are heard (family groups, LinkedIn, X, friends circle, students).
2. Commit to not letting a major ummah attack pass without at least one clear, truthful public statement from you within 48 hours.
3. Anchor every statement in verified facts — named sources, documented numbers, specific events.
4. Speak with adab: firm on truth, disciplined in tone; avoid slogans, hyperbole, and language that will date badly.
5. Centre the victims, not yourself — your platform is a lens, not a stage.
6. Accept pushback; do not retreat into silence at the first social cost.
7. Completion indicator: across any 3-month period containing a major ummah event, at least one documented public statement from you per event, anchored in sources.` },
        { title: "Attend in-person protests and solidarity gatherings for afflicted Muslims", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 5:8",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا كُونُوا قَوَّامِينَ لِلَّهِ شُهَدَاءَ بِالْقِسْطِ",
              translation: "O you who have believed, be persistently standing firm for Allah, witnesses in justice.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2580",
              translation: "The Prophet (peace be upon him) said: \"A Muslim is the brother of a Muslim; he does not oppress him, nor does he hand him over to his enemy.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Physical presence at a protest is public witness that cannot be edited, algorithmically suppressed, or easily dismissed. It also compounds: large visible crowds shift the political calculation of decision-makers in a way that online discourse alone rarely achieves. The Prophet (peace be upon him) forbade handing a Muslim brother over to his enemy — physical presence in solidarity is one way of refusing to hand them over in the court of public opinion.


**How?**

1. Identify the reputable organisers of solidarity events in your city — vet them for integrity and focus (some gatherings are captured by agendas misaligned with the believers' intent).
2. Commit to attending at least one major gathering per quarter when such events are occurring, more during acute crises.
3. Bring household members with appropriate adab — this is worship, not recreation.
4. Conduct yourself lawfully and with dignity; reckless behaviour hurts the cause and discredits the witness.
5. Take visible but restrained records (photos, attendance numbers) for your own accountability, not for display.
6. Debrief with those you attended with; extract lessons for future gatherings.
7. Completion indicator: documented attendance at gatherings for at least 4 distinct ummah events or anniversaries, with post-event reflection.` },
        { title: "Write to elected representatives citing documented injustices", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 20:44",
              arabic: "فَقُولَا لَهُ قَوْلًا لَّيِّنًا لَّعَلَّهُ يَتَذَكَّرُ أَوْ يَخْشَىٰ",
              translation: "And speak to him with gentle speech that perhaps he may be reminded or fear [Allah].",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 49",
              translation: "The Prophet (peace be upon him) said: \"Whoever sees an evil, let him change it with his hand; if he cannot, then with his tongue.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Many Muslims underestimate the weight of direct constituent communication. Elected representatives track the volume and substance of mail from their districts; a handful of detailed, factual, courteous letters on a specific injustice registers in a way that generic petitions do not. Even in systems that feel compromised, the record of Muslim constituents raising their voice is itself historical witness — future generations will see who spoke and who stayed silent.


**How?**

1. Identify your elected representatives at every level — local, regional, national — and their contact channels.
2. For each major ummah event, draft a specific, evidence-anchored letter: what happened, which international norms were violated, what you are asking the representative to do.
3. Adapt tone to the reader — firm, factual, citing verifiable sources, not inflammatory.
4. Send via the channel that requires personal handling (paper letter or constituent portal) rather than mass-email tools that get filtered.
5. Follow up if a response is inadequate or absent.
6. Log every letter sent and response received; a record of engagement builds influence over time.
7. Completion indicator: at least 4 substantive letters sent to representatives in a 12-month period, each anchored in evidence and followed up on.` },
        { title: "Correct false narratives in your immediate circle — family, coworkers, neighbours", done: false,
          sources: [
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
              ref: "Sunan Abi Dawud 4338",
              translation: "The Prophet (peace be upon him) said: \"The best of jihad is a word of truth spoken to a tyrannical ruler — or to an unjust leader.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 6",
              translation: "The 'Hadith of Jibril' in Sahih Muslim (Book 1, Number 6) details the definitions of Islam, Iman, and Ihsan.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Public posting is one form of witness; the harder — and often more transformative — form is correcting the false narrative circulating among the people you actually know. A coworker parroting propaganda, a relative repeating a distortion, a neighbour quoting a headline as fact: these are the real loci where narratives are built or dismantled. A polite, sourced correction at the lunch table changes more minds than any viral thread.


**How?**

1. Prepare yourself: know the top 5 propaganda lines currently circulating about a given conflict and have the verified counter-evidence at hand.
2. When a false narrative is repeated in your presence, decline to let it pass — gently, factually, in real time.
3. Cite sources the other person will find credible, not only Muslim sources; meet people where they are.
4. Acknowledge any valid concern within the opposing narrative before correcting the falsehood — do not reflexively reject everything.
5. Accept that some will remain unconvinced; your obligation is to convey, not to convert.
6. Keep the tone one of brotherhood or neighbourliness, not ideological combat; the goal is adjustment of view, not domination of exchange.
7. Completion indicator: sustained practice over 3 months with at least 12 documented correction conversations and reflection on which approaches changed minds.` },
        { title: "Never normalise silence — renew the niyyah that silence before oppression is a sin", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 5:78-79",
              arabic: "لُعِنَ الَّذِينَ كَفَرُوا مِن بَنِي إِسْرَائِيلَ عَلَىٰ لِسَانِ دَاوُودَ وَعِيسَى ابْنِ مَرْيَمَ ۚ ذَٰلِكَ بِمَا عَصَوا وَّكَانُوا يَعْتَدُونَ ۝ كَانُوا لَا يَتَنَاهَوْنَ عَن مُّنكَرٍ فَعَلُوهُ",
              translation: "Cursed were those who disbelieved among the Children of Israel by the tongue of David and of Jesus, the son of Mary. That was because they disobeyed and were transgressing — they used to not prevent one another from wrongdoing that they did.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 2169",
              translation: "The Prophet (peace be upon him) said: \"By the One in Whose hand is my soul, you must enjoin good and forbid evil, or Allah will soon send upon you a punishment from Him, then you will supplicate to Him and He will not answer you.\"",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Allah cursed earlier communities not only for their oppression but for their silence — "they did not prevent one another from wrongdoing that they did." The default human response to sustained atrocity is fatigue and normalisation; the news shifts and the heart follows. The believer must actively resist that pull. Silence before clear oppression of the ummah is not neutrality — it is recorded as complicity in Allah's sight. Renewing the niyyah regularly is the believer's defence against creeping numbness.


**How?**

1. Set a recurring calendar reminder (weekly or monthly) titled "renew witness niyyah" with a short reflection text.
2. When triggered, sit briefly and renew: "O Allah, I refuse to be silent before the oppression of my brothers and sisters. Make me a witness for You, whatever the cost."
3. Audit the prior period honestly: was there an attack I let pass in silence? If so, what was the reason — fear, fatigue, distraction? Correct it.
4. Seek accountability from a trusted believer — a spouse, friend, or study partner — who can flag when you are drifting into quiet.
5. Read biographies of witnesses who paid the cost (sahaba, scholars under tyranny, contemporary witnesses) to recalibrate your sense of what is required.
6. Make du'a for steadfastness — the tongue that speaks truth under pressure is a gift from Allah, not an achievement of the self.
7. Completion indicator: 6 consecutive months of documented niyyah-renewal rhythm with honest audits and no period exceeding 30 days of passive silence before a major ummah event.` },
      ],
    },
  
  ],

  // ── GROWTH: Building Capacity ──
  ummah_collective_growth: [
    {
      title: "Develop strategic literacy on the major fronts affecting the global ummah",
      priority: 'high', tags: ['literacy', 'strategy', 'global-ummah'],
      description: "Responding to the ummah's afflictions at a foundational level means reading the news honestly. Responding at a growth level means understanding the history, actors, economics, and geopolitics that shape each front. This task builds the strategic literacy required to move from reactive compassion to durable, informed engagement across decades.",
      subtasks: [
        { title: "Read a foundational history for each major front affecting the ummah", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 12:111",
              arabic: "لَقَدْ كَانَ فِي قَصَصِهِمْ عِبْرَةٌ لِّأُولِي الْأَلْبَابِ",
              translation: "There was certainly in their stories a lesson for those of understanding.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 3:137",
              arabic: "قَدْ خَلَتْ مِن قَبْلِكُمْ سُنَنٌ فَسِيرُوا فِي الْأَرْضِ فَانظُرُوا كَيْفَ كَانَ عَاقِبَةُ الْمُكَذِّبِينَ",
              translation: "Similar precedents have passed on before you; travel through the earth and observe how was the end of those who denied.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (peace be upon him) said: \"Whoever travels a path in search of knowledge, Allah will make easy for him a path to Paradise.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Headlines give present tense; history gives causation. Without an understanding of the origins — the Nakba, the Soviet and Chinese campaigns against Muslim populations, post-colonial partitions, oil-economy interventions — the believer is vulnerable to every fresh propaganda wave and incapable of distinguishing genuine shifts from recycled tactics. The Quran repeatedly commands the believers to travel the earth and study outcomes. Reading serious history is the sedentary equivalent of that command.


**How?**

1. Identify the top 5-7 fronts currently affecting the ummah and, for each, a single respected book-length history written by a credible author (Muslim or non-Muslim, but well-sourced).
2. Set a reading pace: one book per 6-8 weeks — do not rush, take notes, look up every unfamiliar term.
3. Read each book fully; refuse summaries and video abridgments for foundational works.
4. Write a 1-page distillation per book: timeline, key actors, turning points, current relevance.
5. Discuss each reading with at least one other believer committed to the same literacy.
6. Revisit the distillations quarterly; evolving events will recast earlier details.
7. Completion indicator: 5 foundational histories read and distilled in a 12-month cycle, with written summaries archived.` },
        { title: "Learn the key actors, institutions, and financial flows behind each front", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 8:60",
              arabic: "وَأَعِدُّوا لَهُم مَّا اسْتَطَعْتُم مِّن قُوَّةٍ",
              translation: "And prepare against them whatever you are able of power.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5027",
              translation: "The Prophet (peace be upon him) said: \"The best among you are those who learn the Quran and teach it\" — a principle extended by the scholars to every branch of knowledge needed to defend the ummah.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Ibn Majah 224",
              translation: "The Prophet (peace be upon him) said: \"Seeking knowledge is an obligation upon every Muslim.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Oppression has names, balance sheets, and supply chains. "Someone is hurting the ummah" is an emotional frame that delivers nothing; "this specific arms firm sells this specific system to this specific regime funded by this specific financial vehicle, monitored by this specific agency" is an actionable frame. Believers tasked with meaningful response need the second frame. Allah commands preparation of whatever power (8:60) — in this age, literacy is a form of that preparation.


**How?**

1. For each front from your history reading, research the top 5-8 relevant actors: state institutions, military contractors, corporations, think tanks, lobby groups.
2. For each actor, document: primary role, ownership and funding, public positions, historical track record.
3. Trace major financial flows — who pays whom, through which intermediaries, and how that movement is disclosed or hidden.
4. Compile the result into a living reference document you can consult when new events arise.
5. Cross-reference at least three independent sources per entry; do not trust a single outlet.
6. Update the document at least twice per year; actor landscapes shift with leadership changes and restructurings.
7. Completion indicator: a sourced, dated, updated actors-and-flows reference covering all fronts in your scope, with at least one update cycle completed.` },
        { title: "Study the scholarly discourse on jihad, witness, and solidarity in your madhab", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 22:39",
              arabic: "أُذِنَ لِلَّذِينَ يُقَاتَلُونَ بِأَنَّهُمْ ظُلِمُوا ۚ وَإِنَّ اللَّهَ عَلَىٰ نَصْرِهِمْ لَقَدِيرٌ",
              translation: "Permission to fight has been given to those who are being fought, because they were wronged. And indeed, Allah is competent to give them victory.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 2504",
              translation: "The Prophet (peace be upon him) said: \"Strive against the polytheists with your wealth, your lives, and your tongues.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Islamic tradition has centuries of scholarship on when solidarity is fard, when armed resistance by the afflicted is legitimate, what the obligations of distant Muslims are, and what the limits of witness and advocacy are. Many believers form strong opinions without ever reading a single serious treatment of these questions. The result is confusion — some dismissing every response as extremism, others endorsing positions no classical scholar would defend. Scholarly literacy stabilises the believer.


**How?**

1. Identify 2-3 reliable contemporary scholars in your tradition who have written or spoken systematically on these questions.
2. Read or study at least one substantial treatment each, with the classical texts they reference at hand.
3. Note points of ijma (consensus), points of legitimate ikhtilaf (difference), and the evidence structure behind each.
4. Identify the edges: where does scholarship say "do," where "may," where "must not"?
5. Use this literacy to judge contemporary statements — both from Muslims and about Muslims — rather than absorbing opinions uncritically.
6. Return to the sources periodically; your own evolution should track re-readings.
7. Completion indicator: documented study of at least 2 substantial scholarly works on these themes with a personal summary of consensus, difference, and edges.` },
        { title: "Build a working mental map of the ummah's demographic and economic landscape", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 30:22",
              arabic: "وَمِنْ آيَاتِهِ خَلْقُ السَّمَاوَاتِ وَالْأَرْضِ وَاخْتِلَافُ أَلْسِنَتِكُمْ وَأَلْوَانِكُمْ ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّلْعَالِمِينَ",
              translation: "And of His signs is the creation of the heavens and the earth and the diversity of your languages and your colours. Indeed in that are signs for those of knowledge.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2564",
              translation: "The Prophet (peace be upon him) said: \"A Muslim is the brother of a Muslim; he does not oppress him, nor does he forsake him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Two billion Muslims across every continent do not share a single political condition; the ummah contains absolute monarchies, electoral democracies, besieged minorities, demographic majorities, rich states, famine-struck regions, and diaspora populations embedded in non-Muslim societies. Coherent engagement requires a working map: where Muslims are, in what numbers, under what conditions, with what resources. Without it, solidarity is a slogan addressed to no one in particular.


**How?**

1. Compile basic data for the 25 largest Muslim populations by country: population, economic conditions, political system, key afflictions, diaspora footprint.
2. For your own region, deepen the map: local Muslim demographics, mosques, schools, businesses, institutions.
3. Identify 10-12 minority communities globally under pressure; their numbers and conditions often go unreported.
4. Visualise the result — a simple table, a world map, or a document — so it can be referenced quickly.
5. Update annually from credible sources (census data, specialist organisations, ethnographies).
6. Share the map with your study circle; many will benefit from the scaffold.
7. Completion indicator: a compiled, dated demographic and economic map covering 25 major populations and 10-12 pressured minorities, updated at least once.` },
        { title: "Translate literacy into at least one briefing that educates others", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:187",
              arabic: "وَإِذْ أَخَذَ اللَّهُ مِيثَاقَ الَّذِينَ أُوتُوا الْكِتَابَ لَتُبَيِّنُنَّهُ لِلنَّاسِ وَلَا تَكْتُمُونَهُ",
              translation: "And remember when Allah took a covenant from those who were given the Scripture to make it clear to the people and not conceal it.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 3461",
              translation: "The Prophet (peace be upon him) said: \"Convey from me, even if it is one verse.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Knowledge hoarded dies with its holder. The covenant Allah took from the people of knowledge is to clarify, not conceal. The believer who has invested in deep literacy becomes, by that investment, a reference point for a household, a circle, or a community — and is responsible for transmitting what they have learned with adab and accuracy.


**How?**

1. Identify the audience most likely to benefit from your literacy — your household, a local study circle, a youth group, a professional network.
2. Design a structured briefing: 45-60 minutes covering one front in depth, using maps, dates, actors, and primary sources.
3. Invite them — small groups beat large audiences for retention and engagement.
4. Deliver the briefing with honesty about what you know well and what you are still learning.
5. Repeat the briefing every 2-3 months, updating content and refining the delivery.
6. Encourage attendees to build their own literacy and teach others; multiplication is the aim.
7. Completion indicator: at least 3 briefings delivered to different audiences with documented attendance and written feedback.` },
      ],
    },
    {
      title: "Build or join a sustained advocacy collective focused on the global ummah",
      priority: 'high', tags: ['advocacy', 'collective', 'sustained-action'],
      description: "Individual action hits a ceiling quickly. Institutions — even small, informal ones — outlast the individuals inside them and compound effort across years. This task moves the believer from solo solidarity into a sustained advocacy collective: a standing group that organises, speaks, gives, and holds one another accountable around the ummah's major fronts.",
      subtasks: [
        { title: "Identify existing credible collectives you can join rather than duplicating effort", done: false,
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
              kind: "hadith",
              ref: "Sahih al-Bukhari 2442",
              translation: "The Prophet (peace be upon him) said: \"The believer to the believer is like a building; one part strengthens the other.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Most cities already have credible groups organising around specific ummah fronts — student associations, local chapters of national advocacy groups, grassroots solidarity committees. Starting a new group from scratch without first checking whether one exists fragments the believer community's effort and signals ego. Join first; found only when there is a genuine gap.


**How?**

1. Research groups in your city or online space doing serious work on the fronts you care about.
2. Vet them with the same criteria as charitable organisations: track record, transparency, integrity of leadership, alignment with Islamic values.
3. Attend meetings and events for 2-3 months before committing; observe culture and practice.
4. If you find a credible home, join and commit; if not, document the gap that justifies starting something new.
5. Report back to your household or circle on what you found — surface credible groups for others to join.
6. Refuse groups that are captured by factions misaligned with the ummah's interests, however well-branded.
7. Completion indicator: a documented shortlist of credible collectives with vetting notes, and active participation in at least one for 3 months.` },
        { title: "Commit to a defined role inside the collective, not ambient presence", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 9:105",
              arabic: "وَقُلِ اعْمَلُوا فَسَيَرَى اللَّهُ عَمَلَكُمْ وَرَسُولُهُ وَالْمُؤْمِنُونَ",
              translation: "And say: Work, for Allah will see your deed, and His Messenger, and the believers.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6011",
              translation: "The Prophet (peace be upon him) said: \"The believers in their mutual love and mercy are like one body; when one part suffers, the whole body responds.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Organisations sink under the weight of members who show up occasionally, have opinions, and leave. They are carried by members with defined roles and consistent delivery. Moving from "attendee" to "role-holder" is the single biggest jump in impact a believer can make inside a collective.


**How?**

1. After your observation period, ask the leadership what capacity they most need.
2. Volunteer for a specific role: research lead, communications, logistics, treasurer, educator, legal liaison — whatever matches your skills and the need.
3. Formalise the commitment: role description, hours per week, deliverables.
4. Show up even when tired; roles are covenants, not interests.
5. Report on your work transparently; an individual's reliability compounds into organisational credibility.
6. Do not accept a role beyond your actual capacity; sustained delivery beats heroic overcommitment.
7. Completion indicator: a defined, documented role inside a credible collective sustained with agreed deliverables for at least 6 months.` },
        { title: "Establish the collective's relationship with on-the-ground actors in afflicted regions", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:13",
              arabic: "وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا",
              translation: "And We made you peoples and tribes that you may know one another.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2586",
              translation: "The Prophet (peace be upon him) said: \"A Muslim does not oppress a Muslim nor forsake him, nor does he hand him over to his enemy.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Advocacy collectives disconnected from the people they claim to advocate for drift into self-reference: their meetings, their statements, their internal dynamics. A direct, respectful, accountable relationship with voices from the afflicted regions keeps the collective anchored to the actual needs and wishes of those it exists to serve.


**How?**

1. Identify trustworthy voices from the affected regions — journalists, scholars, community leaders, frontline workers.
2. Invite them into regular (monthly or quarterly) briefings with your collective — via video call or written updates.
3. Listen more than you speak; let their analysis shape the collective's priorities.
4. Ask them directly: what is most useful for people in our position to do? Honour the answer.
5. Acknowledge their contribution and protect them from exposure risks where safety is an issue.
6. Refuse to speak over them in your own advocacy; translate, transmit, amplify.
7. Completion indicator: at least 2 sustained relationships with on-the-ground voices, with documented regular contact over 6 months and visible influence on the collective's agenda.` },
        { title: "Produce an evidence-anchored campaign on one specific issue", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:42",
              arabic: "وَلَا تَلْبِسُوا الْحَقَّ بِالْبَاطِلِ وَتَكْتُمُوا الْحَقَّ وَأَنتُمْ تَعْلَمُونَ",
              translation: "And do not mix the truth with falsehood or conceal the truth while you know it.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 4344",
              translation: "The Prophet (peace be upon him) said: \"The greatest jihad is a word of truth before a tyrannical ruler.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Diffuse advocacy across many issues rarely moves anything. Disciplined campaigns — one clear issue, one clear ask, sustained pressure, anchored in evidence — occasionally produce real shifts. The collective's credibility grows with every campaign that is well-researched, truthful, and disciplined, and evaporates with every campaign that is loose or sensationalist.


**How?**

1. With the collective, select a single specific issue that is tractable and under-advocated in your context.
2. Commission a research document: the facts, the actors, the existing advocacy landscape, the specific asks.
3. Define the campaign: target audience, key messages, channels (media, representatives, institutions), timeline.
4. Produce materials to the highest standard you can afford — credibility is earned through quality.
5. Execute the campaign with discipline; refuse off-message improvisation.
6. Evaluate honestly: what shifted, what did not, why.
7. Completion indicator: one campaign executed end-to-end with documented evidence base, delivery, and post-mortem.` },
        { title: "Institutionalise the collective's memory, finances, and succession", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:282",
              arabic: "وَلَا تَسْأَمُوا أَن تَكْتُبُوهُ صَغِيرًا أَوْ كَبِيرًا إِلَىٰ أَجَلِهِ",
              translation: "And do not be weary of writing it down, whether small or large, with its term.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6416",
              translation: "The Prophet (peace be upon him) said: \"Take benefit of five before five: your youth before your old age, your health before your sickness, your wealth before your poverty, your free time before your occupation, and your life before your death.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Most Muslim advocacy collectives die when their founders burn out, move cities, or lose heart. Institutionalisation — written records, governance, financial transparency, explicit succession — is what lets the collective outlast its first generation. This is the difference between a moment and a movement.


**How?**

1. Draft a simple constitution: purpose, decision-making, membership, treasury, succession.
2. Maintain written minutes of all meetings and a searchable archive of campaigns and research.
3. Open a proper account with dual-signatory controls; publish quarterly financial statements to members.
4. Name explicit succession pathways: deputies for every key role, trained and ready to step up.
5. Mentor younger members intentionally; the collective's 10-year survival depends on them.
6. Conduct an annual review of the collective's health and pivot where needed.
7. Completion indicator: a ratified constitution, archived minutes, transparent finances, and named successors for every key role.` },
      ],
    },
    {
      title: "Fund capacity-building projects in afflicted Muslim regions beyond emergency relief",
      priority: 'high', tags: ['capacity-building', 'development', 'long-term'],
      description: "Emergency relief saves lives today; capacity-building preserves dignity and independence tomorrow. A believer's giving matures when it extends past the immediate crisis to the institutions that let afflicted communities stand on their own — schools, clinics, skills centres, livelihoods, legal aid. This task establishes a deliberate capacity-building portfolio alongside relief.",
      subtasks: [
        { title: "Map the capacity gaps in the regions you already support with relief", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 59:7",
              arabic: "كَيْ لَا يَكُونَ دُولَةً بَيْنَ الْأَغْنِيَاءِ مِنكُمْ",
              translation: "So that it will not be a perpetual distribution among the rich from among you.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1470",
              translation: "The Prophet (peace be upon him) said about giving: \"The upper hand is better than the lower hand.\" He also said, as reported elsewhere: \"Verily, it is better for one of you to take a rope and bring a bundle of firewood on his back and sell it, than to beg from people.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Dignified self-reliance is a core Quranic principle — Allah's prescription of zakat explicitly aims to prevent wealth from becoming a perpetual handout. Communities that receive only emergency aid remain in a state of dependency that eventually corrodes both giver and receiver. Mapping capacity gaps — education, healthcare, livelihoods, legal — lets you give in ways that build toward dignity rather than perpetuate need.


**How?**

1. For each afflicted region in your active support portfolio, consult local organisations, scholars, or community leaders about structural gaps.
2. Document: what institutions are missing or struggling (schools, clinics, professional training, legal aid, media, youth programmes)?
3. Prioritise gaps by: severity, tractability, and alignment with Islamic values.
4. Cross-check with larger studies or development reports where credible.
5. Update the map as situations evolve — wartime and post-conflict capacity gaps differ.
6. Share the map with co-donors and your collective so aggregated giving can target real gaps.
7. Completion indicator: a dated, sourced capacity-gap map for at least 3 supported regions with prioritisation and cross-checks.` },
        { title: "Allocate a portion of your giving specifically to education and tarbiyah projects", done: false,
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
              kind: "hadith",
              ref: "Sahih Muslim 1631",
              translation: "The Prophet (peace be upon him) said: \"When a man dies, his deeds come to an end except for three: ongoing charity (sadaqah jariyah), knowledge benefited from, or a righteous child who prays for him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Education is the most replicated form of sadaqah jariyah — a school that teaches 200 children for 50 years is a legacy of intergenerational scale. For afflicted communities, education is also protection: trained minds rebuild destroyed cities. Allocating a deliberate portion of your giving to education and tarbiyah converts short-horizon relief into multi-generational impact.


**How?**

1. Within your annual giving budget, designate a specific percentage (suggest 20-40%) for education and tarbiyah projects in afflicted regions.
2. Identify vetted partners running schools, scholarship funds, teacher training, Quranic memorisation programmes, or professional education in those regions.
3. Prefer partners that involve the local community in governance; imported curricula and externally-run institutions rarely outlast the donors.
4. Commit multi-year where possible; education is disrupted by erratic funding.
5. Track outcomes with the partner: enrolment, completion, progression.
6. Protect the allocation from being drained into emergency relief when crises hit; create a separate emergency line.
7. Completion indicator: a multi-year education allocation active for at least 12 months with documented outcomes from at least 2 partners.` },
        { title: "Support livelihood and economic resilience projects for afflicted families", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:273",
              arabic: "لِلْفُقَرَاءِ الَّذِينَ أُحْصِرُوا فِي سَبِيلِ اللَّهِ لَا يَسْتَطِيعُونَ ضَرْبًا فِي الْأَرْضِ",
              translation: "For the poor who are restricted in the way of Allah, unable to travel in the land for work.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1471",
              translation: "A man came to the Prophet (peace be upon him) asking for charity. The Prophet sold the man's tools instead and told him to gather firewood and sell it — turning a handout into a livelihood.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) responded to a poor man's request by equipping him to earn, not by giving him a handout. Livelihood support — tools, capital for small businesses, vocational training, cooperative models — honours this Prophetic pattern. For families in afflicted regions, the ability to earn is the difference between displacement and rootedness.


**How?**

1. Identify partners running vocational training, microenterprise support, tool distribution, or cooperative agriculture in afflicted regions.
2. Allocate a specific portion of your giving to these programmes.
3. Prefer models with local ownership and proven graduation rates over programmes that perpetually subsidise.
4. Avoid interest-based microfinance; the Islamic alternatives (qard hasan, profit-sharing) exist and are growing.
5. Track a cohort with the partner — what percentage of participants are self-sufficient 12 and 24 months later?
6. Celebrate graduation; the goal is for a family to no longer need your support.
7. Completion indicator: a sustained livelihood allocation active for 12 months with at least one cohort reaching 12-month independence.` },
        { title: "Fund legal aid and documentation for persecuted Muslim populations", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:135",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا كُونُوا قَوَّامِينَ بِالْقِسْطِ شُهَدَاءَ لِلَّهِ",
              translation: "O you who have believed, be persistently standing firm in justice, witnesses for Allah.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 4884",
              translation: "The Prophet (peace be upon him) said: \"Whoever covers the shortcomings of his brother in this world, Allah will cover his shortcomings on the Day of Judgement.\" The scholars applied this principle to protecting the persecuted from unjust systems.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

In occupation, genocide, and mass persecution, legal aid and documentation — identity papers, family reunifications, court representation, war crime records — is lifesaving infrastructure. Many believers overlook this front because it is slower and less viscerally urgent than food parcels, but it is often the difference between a recognised people and an erased one. Funding it is a high-leverage act of witness.


**How?**

1. Research legal-aid and documentation organisations with credible records in the regions you support.
2. Allocate a specific portion of your giving to this category — even 10% goes a long way as these programmes are chronically underfunded.
3. Prefer organisations that combine direct representation with long-term archival work.
4. Support their training of local lawyers and paralegals so capacity grows in-region rather than depending on external experts.
5. Where safe, amplify their case work in your own advocacy; attention protects them.
6. Commit multi-year; the caseloads outlast any single news cycle.
7. Completion indicator: a legal-aid allocation active for 12 months to at least one credible partner with documented case outcomes.` },
        { title: "Report capacity-building outcomes to your donors and co-funders", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:58",
              arabic: "إِنَّ اللَّهَ يَأْمُرُكُمْ أَن تُؤَدُّوا الْأَمَانَاتِ إِلَىٰ أَهْلِهَا وَإِذَا حَكَمْتُم بَيْنَ النَّاسِ أَن تَحْكُمُوا بِالْعَدْلِ",
              translation: "Indeed, Allah commands you to render trusts to whom they are due, and when you judge between people, to judge with justice.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 33",
              translation: "The Prophet (peace be upon him) said that a sign of hypocrisy is to betray a trust that one is entrusted with.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

When you channel funds from family, circle, or masjid into capacity-building, the amanah extends to reporting back. Donors who see credible outcomes become multi-year supporters; donors left in the dark drift away. Reporting is not PR — it is the fulfilment of the amanah between you, the ummah, and Allah.


**How?**

1. After each annual cycle, produce a simple, honest report: what was given, where, what was achieved, what failed.
2. Include partner-level outcomes — enrolment, cases, cohort independence — not just inputs.
3. Be honest about failures; every serious programme has them, and transparency builds far more trust than manicured reports.
4. Share the report with all contributors and keep an archive.
5. Invite direct questions; some donors will want deeper engagement and become partners in the work.
6. Use the reporting cycle to refine next year's allocations.
7. Completion indicator: an annual report produced, distributed to all contributors, and archived for continuity.` },
      ],
    },
    {
      title: "Cultivate direct relationships with Muslims in afflicted regions",
      priority: 'medium', tags: ['relationships', 'sisterhood-brotherhood', 'direct'],
      description: "Giving from a distance is a duty; knowing those you give to is a completion. The Prophet (peace be upon him) pursued and maintained personal relationships across tribe and geography. This task moves the believer from anonymous donor to known brother or sister of Muslims in afflicted regions — through correspondence, video calls, twinned relationships, and where safe and halal, travel.",
      subtasks: [
        { title: "Establish written correspondence with Muslim families or institutions you support", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:10",
              arabic: "إِنَّمَا الْمُؤْمِنُونَ إِخْوَةٌ",
              translation: "The believers are but brothers.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 2008",
              translation: "The Prophet (peace be upon him) said: \"A believer to another believer is like a building; each part strengthens the other.\" He demonstrated this by his personal letters to rulers and companions alike.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A handwritten letter from a stranger in another country telling a displaced mother that her son's education is being funded in her name, and asking for nothing in return, carries more dignity-restoring weight than any faceless transfer. The Prophet (peace be upon him) wrote personal letters across the known world. Restoring this practice reconnects far-flung members of the ummah as people, not categories.


**How?**

1. Through vetted partners, arrange written correspondence with a family, student, or small institution in an afflicted region.
2. Observe security protocols — do not expose anyone's identity where risk exists.
3. Write in a language they can read, translated if needed; keep the content warm and respectful, not patronising.
4. Commit to at least quarterly correspondence; consistency matters more than frequency.
5. Share what they write back with your household — it shapes your children's sense of the ummah.
6. Send small accompanying gifts when possible (books, children's materials, practical items) via reliable channels.
7. Completion indicator: at least one sustained correspondence relationship active for 12 months with documented exchanges.` },
        { title: "Hold regular video calls with imams, teachers, or organisers from afflicted regions", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 33:21",
              arabic: "لَّقَدْ كَانَ لَكُمْ فِي رَسُولِ اللَّهِ أُسْوَةٌ حَسَنَةٌ",
              translation: "There has certainly been for you in the Messenger of Allah an excellent example.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (peace be upon him) said: \"Allah is in the aid of a servant so long as the servant is in the aid of his brother.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Video calls collapse distance in a way older technologies could not. Seeing a teacher in Gaza or an imam in Xinjiang speak about their students and congregation transforms them from names on a report into remembered faces the heart cannot abandon. Regular contact also provides the caller with on-the-ground analysis no news outlet delivers.


**How?**

1. Through your vetted organisational partners, arrange quarterly video calls with a small number of trusted teachers, imams, or organisers in supported regions.
2. Coordinate with your local collective or study circle so one call serves many.
3. Listen more than you speak; ask open questions about their realities, needs, and strategies.
4. Pay their time — even a small honorarium — where they will accept it; their expertise is not free.
5. Keep notes; their insights should shape future giving and advocacy.
6. Thank them and follow through on specific asks they raise.
7. Completion indicator: at least 4 documented video calls over 12 months with recorded insights influencing subsequent decisions.` },
        { title: "Twin your household or local community with a specific community abroad", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 8:72",
              arabic: "إِنَّ الَّذِينَ آمَنُوا وَهَاجَرُوا وَجَاهَدُوا بِأَمْوَالِهِمْ وَأَنفُسِهِمْ فِي سَبِيلِ اللَّهِ وَالَّذِينَ آوَوا وَّنَصَرُوا أُولَٰئِكَ بَعْضُهُمْ أَوْلِيَاءُ بَعْضٍ",
              translation: "Indeed, those who have believed and emigrated and fought with their wealth and lives in the cause of Allah and those who gave shelter and aided — they are allies of one another.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 3937",
              translation: "The Prophet (peace be upon him) paired each Muhajir with an Ansari — a formal brotherhood-bonding that shared homes, wealth, and responsibility.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophetic muwakhat (brotherhood pairing) between Muhajirun and Ansar was a formal, structural pairing — not a feeling. Modern equivalents — sister-city relationships, twinned mosques, twinned families — restore that structural bond across continents. Twinning converts fluctuating solidarity into a long-term commitment to a specific people whose names and stories you know.


**How?**

1. With your household, local study circle, or masjid, propose a twinning relationship with a specific community in an afflicted region.
2. Work through vetted partners to identify a willing counterpart community and agree protocols.
3. Define the commitment: financial support, correspondence, prayer, advocacy amplification, and — when safe — mutual visits.
4. Meet periodically (yours and theirs) to review the relationship and adjust.
5. Involve children on both sides; the relationship should be generational.
6. Honour the relationship even when attention drifts to newer crises elsewhere; commitment is the point.
7. Completion indicator: a formal twinning relationship established with written commitments on both sides, sustained for 12 months.` },
        { title: "Host a visiting brother or sister from an afflicted community when possible", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 51:24-27",
              arabic: "هَلْ أَتَاكَ حَدِيثُ ضَيْفِ إِبْرَاهِيمَ الْمُكْرَمِينَ ۝ إِذْ دَخَلُوا عَلَيْهِ فَقَالُوا سَلَامًا ۖ قَالَ سَلَامٌ قَوْمٌ مُّنكَرُونَ",
              translation: "Has there reached you the story of the honoured guests of Abraham? When they entered upon him and said: Peace. He answered: Peace, a people unknown.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6135",
              translation: "The Prophet (peace be upon him) said: \"Whoever believes in Allah and the Last Day, let him honour his guest.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Ibrahim (peace be upon him) honoured strangers as guests, and the Prophet (peace be upon him) made hospitality a marker of faith. Hosting a visitor from an afflicted community — a scholar on tour, a student on scholarship, a displaced family member — is the deepest form of physical solidarity possible in your own home. It also shapes your children's understanding of the ummah more than any book.


**How?**

1. When scholars, students, or displaced individuals from supported communities travel to your region, offer hospitality through vetted organisers.
2. Prepare your home: a clean private space, halal food in their preference, respect for their needs and privacy.
3. Include them in your household's daily rhythm where welcome; do not treat them as a project.
4. Ask about their needs in your city (scholar visas, medical appointments, professional connections) and help where you can.
5. Keep contact after their visit; a single welcome can grow into a long relationship.
6. Share the experience with your extended circle; normalise hosting as a communal practice.
7. Completion indicator: at least one full hosting relationship completed with post-visit follow-up sustained for 6+ months.` },
        { title: "Where safe and halal, travel to a supported community to meet in person", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 29:20",
              arabic: "قُلْ سِيرُوا فِي الْأَرْضِ فَانظُرُوا كَيْفَ بَدَأَ الْخَلْقَ",
              translation: "Say: Travel through the earth and observe how He began creation.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 2392",
              translation: "The Prophet (peace be upon him) said: \"Allah has obligated you to visit your brothers for His sake alone, to seek His pleasure.\"",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Not every afflicted region is safely travelable, and the believer must not romanticise frontlines. But many supported communities — refugee camps, displaced populations in neighbouring countries, minority communities in accessible regions — can be visited halal and responsibly. A visit, even a short one, rewires the relationship permanently and connects the heart to specific faces.


**How?**

1. Identify which supported communities are safely accessible to you given visa, security, and family constraints.
2. Coordinate with trusted partners before booking anything — they will advise on timing, etiquette, and logistics.
3. Travel with purpose: scheduled visits, meetings, and contributions, not tourism or self-discovery.
4. Observe the adab of a guest: modesty in behaviour and resources, deference to local wisdom, no self-aggrandising documentation.
5. Deliver tangible value while there — teach a class, support a project, bring specific supplies.
6. Return and transmit what you witnessed honestly to your community.
7. Completion indicator: at least one documented halal, organised visit to a supported community with clear post-visit transmission to your local circle.` },
      ],
    },
    {
      title: "Train in a skill that directly serves the global ummah",
      priority: 'medium', tags: ['skill', 'service', 'specialisation'],
      description: "The ummah needs specialists, not only generalists with good intentions. Doctors for triage, lawyers for documentation, translators for testimony, journalists for witness, engineers for rebuilding. This task commits the believer to developing a specific, transferable skill that — when crisis or opportunity arises — makes them a multiplier of response rather than another voice at the back.",
      subtasks: [
        { title: "Identify the skill gap in the ummah's response capacity that fits your capacity", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 17:84",
              arabic: "قُلْ كُلٌّ يَعْمَلُ عَلَىٰ شَاكِلَتِهِ",
              translation: "Say: Everyone works according to his own disposition.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Ibn Majah 224",
              translation: "The Prophet (peace be upon him) said: \"Seeking knowledge is an obligation upon every Muslim.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Not every believer can or should train in every field. The Quran notes that each person works according to their disposition. The question is not "what does the ummah need?" (everything) but "what does it need that I can credibly provide over a decade?" Matching gap to capacity produces specialists; ignoring it produces mediocre generalists who crowd every field.


**How?**

1. List the skill gaps in the ummah's response capacity across the fronts you engage with: medical, legal, linguistic, media, technical, logistical, educational, financial.
2. Self-audit honestly: current skills, transferable capacities, time available, life stage, family obligations.
3. Identify 2-3 plausible matches — where a credible gap aligns with capacity you can build over 3-10 years.
4. Consult mentors or people already in the field about realism and trade-offs.
5. Select one primary focus; specialisation beats parallel dabbling.
6. Write a long-form commitment: why this skill, for the sake of Allah, in service of which populations.
7. Completion indicator: a written, dated commitment to a specific skill focus, grounded in a self-audit and mentor consultation.` },
        { title: "Build a multi-year training plan with measurable milestones", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 29:69",
              arabic: "وَالَّذِينَ جَاهَدُوا فِينَا لَنَهْدِيَنَّهُمْ سُبُلَنَا",
              translation: "And those who strive for Us — We will surely guide them to Our ways.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6464",
              translation: "The Prophet (peace be upon him) said: \"The most beloved deeds to Allah are those that are most regular, even if they are few.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Skills are not acquired by intention; they are acquired by repeated, structured, measured practice over years. Without a plan, commitment decays into vague wishful thinking. With a plan, each month produces measurable progress toward a capability that will — bi'idhnillah — matter to people you may not even meet for a decade.


**How?**

1. Research the formal and informal pathways into your chosen skill area — degrees, certifications, apprenticeships, self-study with mentor.
2. Choose a pathway that fits your life stage, family duties, and financial situation.
3. Break the pathway into annual milestones and weekly practice rhythms.
4. Identify one mentor who will review your progress every few months.
5. Build the practice into your existing routine — carve out the time honestly, removing other commitments if needed.
6. Measure progress against the milestones; adjust the pathway as you learn.
7. Completion indicator: a multi-year plan with annual milestones and weekly rhythms, with year-one milestones achieved on schedule.` },
        { title: "Contribute your developing skill to real ummah work, not hypothetical future work", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 61:2-3",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا لِمَ تَقُولُونَ مَا لَا تَفْعَلُونَ ۝ كَبُرَ مَقْتًا عِندَ اللَّهِ أَن تَقُولُوا مَا لَا تَفْعَلُونَ",
              translation: "O you who have believed, why do you say what you do not do? Greatly hateful in the sight of Allah is that you say what you do not do.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6502",
              translation: "The Prophet (peace be upon him) said, in a hadith qudsi: \"My servant continues to draw near to Me through voluntary acts until I love him...\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Training without application stays theoretical and decays. Contributing your skill even while you are still learning — pro bono hours, volunteer shifts, research contributions to organisations — sharpens the skill and serves the ummah simultaneously. It also guards against the trap of postponing contribution indefinitely in the name of "getting ready."


**How?**

1. As soon as your skill is minimally functional, find organisations working on ummah fronts that can use it.
2. Offer regular, bounded pro bono hours (e.g., 5 hours per week) with clear commitments.
3. Keep the work disciplined: do not over-promise; deliver what you commit.
4. Document what you learn from real application; it is often different from training.
5. Use the contribution to deepen your skill — every real case forces growth.
6. Balance with paid work; burnout serves no one.
7. Completion indicator: at least 6 months of sustained, bounded pro bono contribution with documented deliverables.` },
        { title: "Train younger Muslims in the skill so capacity multiplies beyond you", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:151",
              arabic: "كَمَا أَرْسَلْنَا فِيكُمْ رَسُولًا مِّنكُمْ يَتْلُو عَلَيْكُمْ آيَاتِنَا وَيُزَكِّيكُمْ وَيُعَلِّمُكُمُ الْكِتَابَ",
              translation: "Just as We have sent among you a messenger from yourselves reciting to you Our verses and purifying you and teaching you the Book.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 3641",
              translation: "The Prophet (peace be upon him) said: \"Allah, His angels, the inhabitants of the heavens and the earth, even the ant in its hole and the fish in the sea, ask forgiveness for the one who teaches people goodness.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) was both learner and teacher; every Companion who received knowledge immediately transmitted it. A skill held by one believer is a finite resource; the same skill transmitted to ten is a movement. Training younger Muslims in your field is how the ummah's capacity grows beyond any single generation.


**How?**

1. Identify 2-3 younger Muslims with potential, interest, and time for your field.
2. Offer structured mentorship: regular meetings, assigned readings, case exposure, feedback on work.
3. Bring them into your pro bono contributions where appropriate; real cases accelerate learning.
4. Let them surpass you in due course; success is not keeping them junior.
5. Help them build their own networks within the field.
6. Celebrate their milestones and support their transition to independent practice.
7. Completion indicator: at least one mentee trained over 2-3 years to a level of independent contribution.` },
        { title: "Refuse to monetise your skill at the expense of ummah service", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:267",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا أَنفِقُوا مِن طَيِّبَاتِ مَا كَسَبْتُمْ",
              translation: "O you who have believed, spend from the good things you have earned.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 223",
              translation: "The Prophet (peace be upon him) said: \"Cleanliness is half of faith... and the prayer is a light, and sadaqah is a proof.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Marketable skills invite pressure to monetise every hour — consultancies, premium fees, brand building. A believer with an ummah-service skill must consciously protect a permanent portion of that skill from market logic. This is not about rejecting earning; it is about refusing to let the market be the sole allocator of a capacity Allah entrusted to you partly for the sake of His servants.


**How?**

1. Determine your income needs honestly and the earning pathway that meets them.
2. Ring-fence a fixed weekly or monthly portion of your professional capacity for ummah work at zero or below-market cost.
3. Communicate this ring-fencing clearly to employers, colleagues, and clients; most will respect it.
4. Do not let commercial work creep into the ring-fenced hours — even when lucrative.
5. Write the niyyah for the ring-fenced work: service, not accumulation.
6. Review the arrangement annually; adjust proportions as circumstances change but never collapse the ring-fence entirely.
7. Completion indicator: a sustained ring-fenced portion of your professional capacity for ummah work, active for at least 12 months.` },
      ],
    },
  
  ],

  // ── EXCELLENCE: Aspirational Impact ──
  ummah_collective_excellence: [
    {
      title: "Establish or endow a waqf serving a specific front of the global ummah",
      priority: 'medium', tags: ['waqf', 'sadaqah-jariyah', 'institution'],
      description: "The waqf is the Islamic civilisation's engine for intergenerational good — a perpetual endowment whose principal is preserved and whose yield serves a defined purpose forever. This task moves the believer from episodic giving to institution-building: establishing or contributing substantively to a waqf whose yield permanently serves a specific front of the ummah.",
      subtasks: [
        { title: "Study the fiqh of waqf and the historical record of ummah-serving endowments", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:261",
              arabic: "مَّثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنبَتَتْ سَبْعَ سَنَابِلَ فِي كُلِّ سُنبُلَةٍ مِّائَةُ حَبَّةٍ",
              translation: "The example of those who spend their wealth in the way of Allah is like a seed which grows seven spikes; in each spike is a hundred grains.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 1631",
              translation: "The Prophet (peace be upon him) said: \"When a person dies, his deeds come to an end except for three: ongoing charity, knowledge benefited from, or a righteous child who prays for him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2737",
              translation: "Umar ibn al-Khattab acquired land at Khaybar and asked the Prophet (peace be upon him) about it. The Prophet instructed him to endow it as waqf — its principal untouchable, its yield for the fuqara, kin, emancipation of slaves, the wayfarer, and guests.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

'Umar's waqf at Khaybar is the proof text for the entire institution. The fiqh of waqf — its conditions, permissible structures, permissible beneficiaries — is well-developed across all four Sunni madhahib and has hundreds of years of practical jurisprudence behind it. Without studying the fiqh and the historical record, believers either fail to establish a waqf at all or construct structures that the classical tradition would reject.


**How?**

1. Read a serious fiqh treatment of waqf in your madhab — look for texts that cover conditions of the waqif, the mawquf, the beneficiaries, and administration.
2. Study the historical record: Ottoman waqfs, Ayyubid madrasas, the endowments of al-Azhar, Zaytuna, and the Haramayn — what structures enabled them to last centuries?
3. Research contemporary waqf revivals in your context (if any) and why some succeed while others stagnate.
4. Consult a qualified scholar and a qualified lawyer in your jurisdiction — waqf in modern legal systems often requires trust or foundation structures that preserve the fiqhi intent.
5. Document your findings; this becomes the basis for your own waqf design.
6. Revisit the studies periodically as your plans evolve.
7. Completion indicator: a documented study of waqf fiqh and history with references, reviewed by a qualified scholar.` },
        { title: "Define the specific ummah front and purpose your waqf will serve in perpetuity", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:177",
              arabic: "وَآتَى الْمَالَ عَلَىٰ حُبِّهِ ذَوِي الْقُرْبَىٰ وَالْيَتَامَىٰ وَالْمَسَاكِينَ وَابْنَ السَّبِيلِ وَالسَّائِلِينَ وَفِي الرِّقَابِ",
              translation: "And gives wealth, in spite of love for it, to relatives, orphans, the needy, the traveller, those who ask, and for freeing slaves.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2756",
              translation: "The Prophet (peace be upon him) said of 'Umar's waqf: \"Do not sell the land, but spend its fruits.\" The specificity of the purpose — not generic good — is what defined the waqf.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A vaguely-purposed waqf dissipates over generations into whatever its trustees happen to care about — which is often nothing. A waqf with a precisely-defined purpose ("maintenance of the Quran school in X neighbourhood of Y city for orphaned children," "permanent medical scholarships for students from Gaza," "legal aid for persecuted Muslims in Z region") carries an intention across centuries. Precision is a form of iman.


**How?**

1. Revisit the ummah capacity-gap map you built earlier; identify fronts that genuinely need permanent funding.
2. Choose one specific front — resist the urge to broaden. A waqf for "the ummah" is a waqf for nobody.
3. Define the beneficiary class precisely: geography, life condition, type of service, duration of support.
4. Draft a purpose statement that a trustee 200 years from now could read and execute faithfully.
5. Consult with scholars and on-the-ground partners about the appropriateness and sustainability of the purpose.
6. Write a fallback clause for the case where the primary purpose becomes impossible (war, political change) — classical fuqaha addressed this carefully.
7. Completion indicator: a precise, scholar-reviewed purpose statement with a fallback clause.` },
        { title: "Endow the principal — from your own wealth or by raising it with co-founders", done: false,
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
              kind: "hadith",
              ref: "Sahih al-Bukhari 1461",
              translation: "Abu Talhah — the wealthiest of the Ansar in Madinah in terms of date palms — gave his most beloved orchard, Bayruha', as sadaqah after the verse (3:92) was revealed. The Prophet (peace be upon him) directed it to his relatives.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A waqf requires real capital — an income-producing asset whose yield supports the purpose in perpetuity. Until the asset is endowed, there is no waqf. This is the step where intention becomes reality. Endowing from one's own wealth or co-founding with others of sincere intention is the traditional pathway; inheritance via wasiyyah is the other. What matters is that the principal is locked and the yield begins to flow.


**How?**

1. Consult with your spouse and financial advisors about what portion of your wealth you can irrevocably endow.
2. Consider whether inheritance law in your jurisdiction allows an immediate lifetime waqf (most do, within limits) or requires wasiyyah mechanics — many Muslims opt for a hybrid.
3. If the capital required exceeds what you can personally provide, co-found with 3-5 others of sincere intention; waqf permits joint endowment.
4. Structure the asset for stable, halal yield — income-producing real estate, halal-compliant investment portfolios, or operating businesses.
5. Execute the endowment legally — deed of waqf, foundation documents, trust agreements as required by your jurisdiction.
6. Sign the niyyah: "O Allah, accept this from me and make it permanent sadaqah jariyah for the sake of Your servants."
7. Completion indicator: a legally-endowed, income-producing waqf with documented principal and initial yield distributions.` },
        { title: "Establish transparent, succession-proof governance for the waqf", done: false,
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
              kind: "hadith",
              ref: "Sahih al-Bukhari 33",
              translation: "The Prophet (peace be upon him) identified betrayal of trust as a sign of hypocrisy. The soundness of a waqf depends entirely on the trustworthiness of its administrators.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Countless waqfs across Islamic history were destroyed by incompetent or corrupt mutawallis — trustees who siphoned yield, misdirected purpose, or let the asset decay. Governance is what keeps a waqf alive for centuries. Transparent accounts, diversified trustees, clear succession rules, and external auditors convert personal intention into institutional durability.


**How?**

1. Draft a governance document covering: trustee appointment, decision-making, yield distribution, asset management, audit requirements, beneficiary oversight, amendment rules, and succession mechanics.
2. Appoint a founding board that is diverse in expertise (law, finance, the beneficiary field) and known for taqwa.
3. Ensure no single person — including yourself — can unilaterally redirect the waqf.
4. Engage an independent external auditor; publish audited accounts annually to contributors and beneficiaries.
5. Train successor trustees before they take over; institutional knowledge must transmit.
6. Build protections against hostile legal or political environments — geographic diversification if relevant, strong charter clauses.
7. Completion indicator: a ratified governance charter, a trained founding board, and the first annual audit completed and published.` },
        { title: "Document the waqf's story and open it for others to contribute to or replicate", done: false,
          sources: [
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
              ref: "Sahih Muslim 1017",
              translation: "The Prophet (peace be upon him) said: \"Whoever introduces a good practice in Islam will receive its reward and the reward of all who act on it after him, without any diminution of their reward.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A waqf documented and open to contribution grows in principal faster than it could from a single founder. Its governance model, lessons, and charter also become replicable — other believers can establish similar waqfs for other fronts rather than reinventing every structure. Documenting the story is itself sadaqah jariyah: knowledge the ummah benefits from forever.


**How?**

1. Write the waqf's story — founding purpose, legal structure, governance, early outcomes — as a clear, public document.
2. Publish the charter, governance model, and key templates so others can adapt them.
3. Open a contribution channel for those who wish to add to the principal or establish sub-purposes within the waqf's umbrella.
4. Report annually to contributors with audited accounts and beneficiary outcomes.
5. Help other believers replicate the model for different ummah fronts — share failures honestly so they avoid your mistakes.
6. Protect the founders' sincerity by centring the beneficiaries in all public communication.
7. Completion indicator: a published charter and story, at least one additional contributor onboarded, and at least one replication supported.` },
      ],
    },
    {
      title: "Travel to serve in person in an afflicted Muslim region when halal and viable",
      priority: 'medium', tags: ['travel', 'frontline-service', 'bodily-presence'],
      description: "Some service can only be rendered in person. A qualified doctor in a field clinic, a lawyer in a tribunal, a teacher in a displacement camp, a journalist at a site of witness — these roles cannot be videoconferenced. This task, where family, safety, and halal pathways permit, commits the believer to sustained physical presence serving in an afflicted region at a level of skill that meaningfully contributes.",
      subtasks: [
        { title: "Determine rigorously whether travel is halal, safe, and serves a real need", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:195",
              arabic: "وَلَا تُلْقُوا بِأَيْدِيكُمْ إِلَى التَّهْلُكَةِ",
              translation: "And do not throw yourselves into destruction.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2829",
              translation: "The Prophet (peace be upon him) said: \"A believer is not stung from the same hole twice.\" The principle: prudence and due diligence are part of faith, not opposed to it.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Quran forbids self-destruction. Romantic visions of "going to help" cause believers to insert themselves into situations where they become another mouth to feed, another body for guards to protect, or a liability for their hosts. Rigorous pre-assessment — of halal pathways, security, family rights, and real need — is a prerequisite. Only when the honest answer to "am I genuinely useful here, safely and halal-ly?" is yes does travel proceed.


**How?**

1. Consult on-the-ground partners about whether external personnel of your specific skill profile are useful, and in what role and duration.
2. Assess halal pathways — visas, routing, working arrangements; refuse routes that implicate you in haram cooperation.
3. Assess safety honestly: insurance, evacuation, local stability, medical access, communication.
4. Confirm family rights — spouse's and parents' consent is a fiqhi weight, not a formality; dependants cannot be abandoned.
5. Consult a scholar if any aspect is uncertain.
6. Make an honest "no-go" option: if the assessment fails, redirect your capacity to remote service rather than forcing the trip.
7. Completion indicator: a written pre-travel assessment addressing usefulness, halal-ness, safety, and family rights, with a clear go/no-go decision.` },
        { title: "Secure the skills and certifications your host context requires before going", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 8:60",
              arabic: "وَأَعِدُّوا لَهُم مَّا اسْتَطَعْتُم مِّن قُوَّةٍ",
              translation: "And prepare against them whatever you are able of power.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6763",
              translation: "The Prophet (peace be upon him) said: \"When you give any matter to someone who is not qualified for it, expect the Hour.\" Competence in service is itself an Islamic obligation.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Good intentions without competence produce harm — missed diagnoses, botched cases, wasted resources. Afflicted communities are past the point where they can absorb under-prepared volunteers. The Prophet (peace be upon him) warned that entrusting matters to the unqualified is a sign of civilisational collapse; the believer about to travel to serve must not replicate that pattern.


**How?**

1. Ask your host partners what qualifications, certifications, or experience their context requires from someone in your role.
2. Identify gaps in your current profile — clinical experience, language, cross-cultural training, trauma-informed practice.
3. Close the gaps before travelling — formal certification, mentored practice, or supervised placements.
4. Specifically train in the local language even to a survival level; bodies of interpreters are a drag on serious work.
5. Prepare trauma-informed practice if your work involves survivors.
6. Rehearse your role in simulation or shadowing before deployment.
7. Completion indicator: a documented qualifications file confirmed by your host partner as sufficient for the role.` },
        { title: "Serve under local leadership, not as an outside saviour", done: false,
          sources: [
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
              ref: "Sahih Muslim 1828",
              translation: "The Prophet (peace be upon him) said: \"Each of you is a shepherd, and each of you is responsible for his flock.\" The principle of local leadership over its own context applies in the aid field as in governance.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Afflicted communities are not empty of leadership; they have imams, teachers, organisers, doctors, and elders who know their context intimately. The visiting believer who imposes their own judgment — because of their foreign credentials or wealth — disrespects that leadership and disrupts local authority structures. True service is rendered under local leadership, not over it.


**How?**

1. Before arriving, confirm who in the host structure you will report to and how decisions are made.
2. On arrival, spend the first days listening, observing, and learning local norms before contributing.
3. Defer to local judgment on priorities, methods, and sensitivities — your expertise informs, it does not dictate.
4. Respect hierarchies even when they differ from your home context.
5. Ask before initiating, especially on culturally sensitive matters.
6. If you disagree with a decision, raise it privately through the proper channel; never undermine local leadership publicly.
7. Completion indicator: documented service under local leadership with positive feedback from local leaders on your deference and collaborative conduct.` },
        { title: "Prepare a re-entry plan so returning home strengthens rather than breaks you", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 13:28",
              arabic: "الَّذِينَ آمَنُوا وَتَطْمَئِنُّ قُلُوبُهُم بِذِكْرِ اللَّهِ ۗ أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
              translation: "Those who have believed and whose hearts are assured by the remembrance of Allah. Unquestionably, by the remembrance of Allah hearts are assured.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 3111",
              translation: "The Prophet (peace be upon him) sought refuge from grief and distress and taught his companions to do the same. Returning from frontline service exposes believers to profound emotional and spiritual challenges that require structured attention.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Believers return from service in afflicted regions carrying images, grief, moral weight, and sometimes trauma. Without a re-entry plan, many drift into depression, withdrawal from community, or loss of daily ibadah momentum. A structured return — spiritual, psychological, communal — preserves the believer so they can continue serving over decades instead of burning out.


**How?**

1. Before travelling, name one trusted scholar, one close believer, and one qualified counsellor who will accompany your return.
2. On return, take at least 2 weeks of protected time before resuming normal life; do not jump back into full responsibilities.
3. Debrief systematically with each named companion — not to summarise, but to process.
4. Return to structured ibadah rhythm — tahajjud, Quran, dhikr — from the first day home; this stabilises more than anything else.
5. Transmit what you witnessed to your community through a careful briefing, not trauma-dumping.
6. Monitor for signs of unresolved trauma over the following 6 months; seek further help without shame if needed.
7. Completion indicator: a structured re-entry plan executed after return with documented debriefs and a 6-month stability check-in.` },
        { title: "Commit to a sustained cycle — return, rest, re-deploy — rather than one-off service", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 94:7",
              arabic: "فَإِذَا فَرَغْتَ فَانصَبْ",
              translation: "So when you have finished, then stand up.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1152",
              translation: "The Prophet (peace be upon him) disapproved of those who pray all night and fast every day without rest, saying \"your body has a right over you.\" Sustainability is sunnah.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A single dramatic trip followed by normal life is a form of spiritual tourism. A sustained cycle of deployment, recovery, and re-deployment — over years — produces expertise, relationships, and real change in afflicted regions. Sustainability is Prophetic; the body and family have rights that one-off heroics violate.


**How?**

1. With your host partner and family, design a sustainable rhythm — perhaps a one-to-three month deployment every 12-18 months, depending on context and skill.
2. Plan the rhythm years ahead, so professional, financial, and family arrangements can hold it.
3. Build continuity between deployments — remote contributions, mentorship of local counterparts, fundraising support.
4. Train a deputy who can cover your responsibilities at home during deployments.
5. Refuse to collapse the cycle into a single burnout event.
6. Adjust the rhythm as life circumstances change (children's ages, parents' health, career stage); never abandon it altogether.
7. Completion indicator: at least two completed deployment cycles separated by proper rest periods, with continuity between them.` },
      ],
    },
    {
      title: "Shape public discourse on the ummah through sustained scholarly, journalistic, or media work",
      priority: 'medium', tags: ['discourse', 'media', 'witness-at-scale'],
      description: "The narrative about the ummah is being written constantly, whether by believers or by others. The believer with the capacity to produce substantial long-form work — scholarship, journalism, film, serious media — carries a responsibility to contribute honest, rigorous, compelling discourse to that record. This task commits the believer to sustained production, not occasional commentary.",
      subtasks: [
        { title: "Choose one narrow topic within the ummah's discourse where you can add real value", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:42",
              arabic: "وَلَا تَلْبِسُوا الْحَقَّ بِالْبَاطِلِ وَتَكْتُمُوا الْحَقَّ وَأَنتُمْ تَعْلَمُونَ",
              translation: "And do not mix the truth with falsehood or conceal the truth while you know it.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 71",
              translation: "The Prophet (peace be upon him) said: \"When Allah wills good for someone, He grants him understanding of the religion.\" Depth over breadth is the scholarly sunnah.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Broad commentary on "the ummah" produces shallow, generic content that no one remembers. Narrow expertise — Somali refugee education policy, the legal history of Palestinian property law under three regimes, the medical literature on siege nutrition — becomes a reference that journalists cite, scholars build on, and the ummah benefits from for decades. Choose narrow; go deep.


**How?**

1. List 8-10 topics within your literacy where you have access, language, or expertise most others lack.
2. Test each: is there a genuine gap in existing coverage? Do you have the capacity to produce original, well-sourced work? Is this a topic you can sustain for 5-10 years?
3. Consult 3-5 established writers or scholars about the realism of your choice.
4. Narrow to one topic; specialisation is the point.
5. Write a commitment statement: topic, scope, rationale, expected output over 5 years.
6. Revisit the commitment only when evidence suggests a better match, not when you tire of it.
7. Completion indicator: a written, scholar-consulted commitment to a single narrow topic with a 5-year output projection.` },
        { title: "Build a serious research and documentation practice, not a social media habit", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 17:36",
              arabic: "وَلَا تَقْفُ مَا لَيْسَ لَكَ بِهِ عِلْمٌ ۚ إِنَّ السَّمْعَ وَالْبَصَرَ وَالْفُؤَادَ كُلُّ أُولَٰئِكَ كَانَ عَنْهُ مَسْئُولًا",
              translation: "And do not pursue that of which you have no knowledge. Indeed, the hearing, the sight, and the heart — about all those one will be questioned.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 5",
              translation: "The Prophet (peace be upon him) said: \"It is enough lying for a man to narrate everything he hears.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Social media rewards volume and speed; scholarship and serious journalism reward depth and accuracy. A believer serving the ummah's discourse needs the second discipline, not the first. A documented research practice — archives, citations, interviews, primary sources — produces work that holds up under hostile scrutiny; a social-media practice produces threads that disappear in a week and often embarrass later.


**How?**

1. Build a research system: citation manager, archive of primary sources, interview logs, note-taking method.
2. For every claim you will publish, verify against at least two independent primary sources.
3. Learn the languages you need to access primary sources in your topic; refuse reliance on translations alone.
4. Protect daily research time in your calendar; not optional, not last-to-fit.
5. Refuse to post anything you have not verified, regardless of how viral the opportunity.
6. Build relationships with 3-5 credible outlets or platforms that publish serious work.
7. Completion indicator: an operational research system and first substantial piece of work published in a credible outlet.` },
        { title: "Publish sustained, long-form work through credible outlets", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:187",
              arabic: "لَتُبَيِّنُنَّهُ لِلنَّاسِ وَلَا تَكْتُمُونَهُ",
              translation: "To make it clear to the people and not conceal it.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 7352",
              translation: "The Prophet (peace be upon him) said: \"When a judge makes ijtihad and is correct, he has two rewards; when he makes ijtihad and errs, he has one reward.\" Serious, sincere work is rewarded even when it falls short of perfect accuracy.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The reward of the scholar, journalist, or serious media producer compounds through published output read or watched by others. Ephemeral content reaches many briefly; long-form published work reaches fewer but deeper, shapes institutional thinking, and influences decision-makers. The believer's discourse work should aim at both, but prioritise the durable.


**How?**

1. Set a publication cadence you can honestly maintain — one significant piece every 1-3 months beats ten rushed ones.
2. Pitch credible outlets within your topic: established Muslim publications, serious generalist outlets that cover your field, scholarly journals where appropriate.
3. Accept editorial discipline; it improves work, not suppresses it.
4. Build a personal archive of everything you publish — your own site or repository, not only on third-party platforms that can vanish.
5. Collect feedback from specialists, not just from laypeople; they catch errors early.
6. Compound output into longer forms over time — articles into reports into books.
7. Completion indicator: a sustained publication cadence maintained for 24 months with at least one piece in each year reaching an influential audience.` },
        { title: "Guard sincerity — your audience is Allah before your audience is the public", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 18:110",
              arabic: "فَمَن كَانَ يَرْجُو لِقَاءَ رَبِّهِ فَلْيَعْمَلْ عَمَلًا صَالِحًا وَلَا يُشْرِكْ بِعِبَادَةِ رَبِّهِ أَحَدًا",
              translation: "So whoever would hope for the meeting with his Lord, let him do righteous work and not associate anyone in the worship of his Lord.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 1905",
              translation: "The Prophet (peace be upon him) said that three of the first to be judged on the Day of Judgement — a scholar, a mujahid, and a generous donor — would be cast into the Fire because their deeds were done for recognition, not for Allah.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Public intellectual work is riba'-rich for the nafs: recognition, fame, brand, platform. The hadith of the three — scholar, mujahid, donor — all known for their outward work but judged by their inward intention is a direct warning. Discourse work without sincerity guard becomes another route to riya' and sum'ah, nullifying reward and sometimes worse.


**How?**

1. Establish a daily niyyah routine: before writing, producing, or publishing — renew intention, "O Allah, I do this for Your sake."
2. Refuse platforms that require ideological compromises or require you to soften haqq for reach.
3. Limit engagement with your own metrics; set a weekly cap on how much you monitor audience data.
4. Seek honest criticism from a few believers who will tell you when your work has drifted into performance.
5. Do sadaqah specifically tied to your work; the Companions used to give charity after public deeds as a hedge against riya'.
6. When recognition comes, deflect it to Allah verbally and internally; when criticism comes, sit with it before responding.
7. Completion indicator: sustained practice of intention-renewal, platform discipline, and riya' hedging for 12 months.` },
        { title: "Mentor and cite younger voices so the discourse field expands", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:9",
              arabic: "وَلْيَخْشَ الَّذِينَ لَوْ تَرَكُوا مِنْ خَلْفِهِمْ ذُرِّيَّةً ضِعَافًا خَافُوا عَلَيْهِمْ",
              translation: "And let those fear Allah who, if they had left behind weak offspring, would be concerned for them.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 3641",
              translation: "The Prophet (peace be upon him) said: \"Scholars are heirs of the prophets.\" Heirs transmit inheritance — and in discourse work, transmission is citation, mentorship, and platform sharing.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A discourse field dominated by a few established voices becomes brittle. Citations that always loop back to the same handful of names signal an ossifying conversation. Mentoring and citing younger voices — women, Muslims from underrepresented regions, early-career scholars — strengthens the field, expands the ummah's discourse capacity, and earns the mentor the reward of every piece of work downstream.


**How?**

1. Identify 3-5 younger voices with talent and sincerity in your topic.
2. Offer substantive mentorship — review drafts, introduce to editors, co-author where appropriate, share research leads.
3. Cite them meaningfully in your own work when they contribute; do not hoard credit.
4. Amplify their published work through your platform.
5. Connect them with institutions, fellowships, and opportunities.
6. Celebrate when they surpass you in reach or depth.
7. Completion indicator: at least 2 younger voices actively mentored over 2-3 years, with documented citations and opportunities brokered.` },
      ],
    },
    {
      title: "Raise a generation trained and committed to global ummah service",
      priority: 'medium', tags: ['tarbiyah', 'intergenerational', 'legacy'],
      description: "No single believer's lifespan is adequate to the ummah's afflictions; the work is longer than any life. The believer's greatest contribution may be a next generation — biological, adopted, taught, mentored — that carries the ummah-service covenant forward more capably than the generation before. This task is the deliberate work of shaping such a generation.",
      subtasks: [
        { title: "Teach children the ummah as a lived relationship, not an abstract concept", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 31:13",
              arabic: "وَإِذْ قَالَ لُقْمَانُ لِابْنِهِ وَهُوَ يَعِظُهُ يَا بُنَيَّ لَا تُشْرِكْ بِاللَّهِ",
              translation: "And when Luqman said to his son while he was instructing him: O my son, do not associate anything with Allah.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 495",
              translation: "The Prophet (peace be upon him) said: \"Teach your children to pray at the age of seven.\"",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Children raised hearing about "Muslims in Gaza" as a vague category grow up with a correspondingly vague commitment; children raised with the names, faces, letters, and du'as of specific families in specific cities grow up with the ummah wired into their affective lives. Luqman's instruction to his son is the Quranic pattern — direct, personal, serious — applied by every believing parent to the ummah context.


**How?**

1. Build ummah presence into daily family life: weekly du'a for named regions, letters to correspondents, photos and stories shared at meals.
2. Let children ask questions; answer at their level, not below it — children register seriousness.
3. Take them along to appropriate community gatherings, solidarity events, and hosting opportunities.
4. Involve them in giving decisions — let them choose one cause from the family allocation.
5. Do not shield them from the existence of oppression, but protect them from unnecessary trauma.
6. Model the practice — they absorb behaviour far more than instruction.
7. Completion indicator: sustained family practices for 12 months with children able to name specific regions, causes, and families the household supports.` },
        { title: "Invest in their Arabic, Quranic literacy, and foundational Islamic sciences", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 12:2",
              arabic: "إِنَّا أَنزَلْنَاهُ قُرْآنًا عَرَبِيًّا لَّعَلَّكُمْ تَعْقِلُونَ",
              translation: "Indeed, We have sent it down as an Arabic Quran that you might understand.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 2676",
              translation: "The Prophet (peace be upon him) said: \"The best of you is the one who learns the Quran and teaches it.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Generations fluent in Arabic and grounded in the Islamic sciences are the ummah's long-term insurance against ideological capture and distortion of discourse. A generation disconnected from primary sources can be swayed by any well-packaged argument; a generation that reads the Quran, hadith, and fiqh directly has an immune system against manipulation. This foundation is built in childhood, not in adulthood.


**How?**

1. Prioritise Arabic and Quran from early childhood — daily, consistent, age-appropriate learning.
2. Choose teachers carefully: sanad, pedagogy, compatibility with your family's orientation.
3. Supplement with serious sirah, aqidah, and fiqh studies as they mature.
4. Make the learning part of life, not an extra-curricular — protect it from being crowded out by school or screens.
5. Read primary sources together as a family at age-appropriate levels.
6. Travel to learning environments when possible — halaqat, teacher intensives, time in scholarly communities.
7. Completion indicator: children at measurable proficiency milestones in Arabic, Quran, and foundational sciences appropriate to their age, with sustained daily rhythm for 12 months.` },
        { title: "Expose them to the diversity of the ummah — geography, culture, language, madhab", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:13",
              arabic: "وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا",
              translation: "And We made you peoples and tribes that you may know one another.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2564",
              translation: "The Prophet (peace be upon him) said: \"Do not envy one another, do not inflate prices, do not hate one another, do not turn your backs on one another. Be, O servants of Allah, brothers.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A generation raised only within its own ethnic, linguistic, or madhab silo grows up with a distorted sense of the ummah — often taking its own sub-community for the whole and judging the rest by its own standards. Deliberate exposure to the ummah's diversity — from African to Balkan to Southeast Asian Muslims, across madhahib, across cultures — produces children with the expansive sense of brotherhood the Quran describes.


**How?**

1. Seek out multi-ethnic, multi-madhab community contexts where available; when not, visit and travel to diversify exposure.
2. Read family stories, literature, and biographies from across the ummah.
3. Watch documentaries and listen to recordings from different regional traditions — not as curiosities but as equally valid expressions of Islam.
4. Study side-by-side fiqh differences respectfully, showing how each is grounded.
5. Invite guests from different backgrounds into your home; travel to their cities when possible.
6. Correct any parochialism actively; children absorb it quickly and it calcifies.
7. Completion indicator: children who can name, describe, and express respect for at least 5 Muslim regional traditions and the major madhahib, with documented family exposures.` },
        { title: "Build their service practice early — chores, charity, mentorship, visible witness", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:110",
              arabic: "وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ ۚ وَمَا تُقَدِّمُوا لِأَنفُسِكُم مِّنْ خَيْرٍ تَجِدُوهُ عِندَ اللَّهِ",
              translation: "And establish prayer and give zakat, and whatever good you put forward for yourselves — you will find it with Allah.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 893",
              translation: "The Prophet (peace be upon him) said: \"Each of you is a shepherd, responsible for his flock.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Service is a habit, and habits are built by repetition from childhood. A child who gives small sadaqah each week, helps prepare a care package, writes a letter to a correspondent, or attends a solidarity event grows into an adult for whom service is simply part of life — not a heroic extra. Waiting until adulthood to introduce service produces adults who admire it abstractly but rarely practise it.


**How?**

1. Assign age-appropriate service chores — preparing food for a neighbour, folding clothes for donation, writing a letter to a correspondent.
2. Let them give from their own allowance, however small, to causes they choose from your shortlist.
3. Take them to community service events regularly with adab.
4. Encourage them to mentor younger children within the family or community as they mature.
5. Reward not outcomes but consistency — Allah praises the regular, even if small.
6. Frame the service explicitly as ibadah, so it does not become secular philanthropy.
7. Completion indicator: children with sustained weekly service practices for at least 12 months, spanning physical, financial, and social forms of service.` },
        { title: "Prepare them to exceed you and succeed in contexts you cannot anticipate", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 46:15",
              arabic: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ وَأَصْلِحْ لِي فِي ذُرِّيَّتِي",
              translation: "My Lord, enable me to be grateful for Your favour which You have bestowed upon me and upon my parents, and to do righteousness of which You approve, and make righteous for me my offspring.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Ibn Majah 3660",
              translation: "The Prophet (peace be upon him) said: \"No father can give his child anything better than good manners.\"",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The ummah of their adulthood will face challenges you cannot foresee. Your task is not to replicate yourself but to equip them with iman, adab, skill, and judgment strong enough for contexts you do not know. Fathers' and mothers' work is measured by who their children become in the decades after the parents are gone — not by how closely they mirror the parents' own path.


**How?**

1. Build their judgment as deliberately as you build their knowledge — give them real decisions with graduated stakes from childhood.
2. Expose them to wise mentors beyond yourself; do not monopolise their formation.
3. Help them find their own specific calling within ummah service; do not impose yours.
4. Teach them to recognise and resist the distortions specific to their likely future context (cultural pressures, technological manipulation, political capture).
5. Honour their differences from you; Allah did not make them copies.
6. Pray the du'a of Ibrahim and the Quranic parents for righteous offspring — consistently and earnestly.
7. Completion indicator: children maturing with evident iman, adab, independent judgment, and early signs of their own specific ummah-service path.` },
      ],
    },
    {
      title: "Build structural bridges between affluent and afflicted Muslim regions",
      priority: 'medium', tags: ['ummah-solidarity', 'institution-building', 'diaspora'],
      description: "Emergency appeals raise money; they do not build durability. The ummah's affluent regions (established diaspora, Gulf capital, mature institutions) and afflicted ones (Gaza, Sudan, Uyghur, Rohingya, Kashmir, and others) are separated not only by distance but by the absence of durable channels between them. This task builds institutional bridges — match-making bodies, brain-trust networks, sister-institution pairings, professional pipelines — that convert episodic solidarity into structural flow.",
      subtasks: [
        { title: "Map the asymmetry — what affluent regions have in surplus and what afflicted regions lack structurally", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 59:7",
              arabic: "كَيْ لَا يَكُونَ دُولَةً بَيْنَ الْأَغْنِيَاءِ مِنكُمْ",
              translation: "So that it will not be a perpetual distribution among the rich among you.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2442",
              translation: "The Prophet (peace be upon him) said: \"The Muslim is the brother of the Muslim — he does not wrong him, abandon him, or humiliate him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

You cannot build a bridge without knowing the two shores. Affluent Muslim regions concentrate capital, expertise, institutions, and political access that afflicted regions need; afflicted regions carry experience, moral authority, and on-the-ground networks that the affluent have lost. Most attempts at connection fail because one side projects assumptions onto the other. A serious map — produced through listening — is the first structural step.


**How?**

1. Identify two or three specific affluent/afflicted pairings where you have some access (your diaspora community and a homeland, your city and a sister city, etc.).
2. For each pair, document what the affluent side concentrates: capital, specific professional expertise, institutional scaffolding, political reach, diaspora networks.
3. Document what the afflicted side lacks structurally — not just emergency needs but durable gaps (legal services, medical training pipelines, educational institutions, professional accreditation).
4. Interview people on both sides; correct your assumptions with their testimony.
5. Identify what the afflicted side offers back that the affluent side has lost — often scholarship, rootedness, or moral clarity.
6. Revisit the map with local and diaspora scholars; their corrections matter more than your framework.
7. Completion indicator: a documented, bilaterally-reviewed map of surplus and gap for at least one affluent/afflicted pair.` },
        { title: "Design a specific bridge mechanism — not aid, but a channel that transfers capacity structurally", done: false,
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
              kind: "hadith",
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (peace be upon him) said: \"Whoever relieves a believer's distress in this world, Allah will relieve his distress on the Day of Resurrection.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Aid flows one direction and dries up. A bridge is bidirectional and structural — it transfers capacity, not just money. Sister-institution pairings (a diaspora hospital training residents from an afflicted region), professional pipelines (diaspora lawyers providing continuous pro bono counsel for specific advocacy bodies), remittance-to-institution channels (family remittances aggregated into local waqfs), brain-trust networks (diaspora experts as standing advisors to on-the-ground institutions) — these are mechanisms, not appeals. Designing one requires specifying who, what, how often, and what failure looks like.


**How?**

1. Select one specific gap from your map where a structural channel is plausible.
2. Draft a mechanism: who on each side, what flows, on what cadence, through what institutional form.
3. Test the mechanism with a small prototype — one pairing, one quarter, documented outcomes.
4. Adjust based on what actually worked; most first designs are wrong in ways only practice reveals.
5. Write down the design so others can replicate it for other pairings.
6. Ensure reciprocity is real — the afflicted side is not a recipient but a partner; refuse the donor/beneficiary frame.
7. Completion indicator: a prototyped bridge mechanism with at least one quarter of documented bilateral transfer.` },
        { title: "Institutionalise the bridge so it outlives the founders and resists capture", done: false,
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
              kind: "hadith",
              ref: "Sahih al-Bukhari 2737",
              translation: "Umar ibn al-Khattab endowed his Khaybar land as waqf with defined beneficiaries and governance; the institution outlasted him by centuries.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Personal relationships across regions are fragile — they die with the people who carry them, or get captured by political or financial interests. An institution with a charter, a diversified board spanning both regions, transparent governance, and succession rules survives its founders. The great bridges of Islamic history — ribats connecting frontiers, madrasas drawing students from across the ummah, waqfs funding caravans — were institutional, not personal.


**How?**

1. Choose the institutional form that fits the bridge (non-profit, waqf, professional body, coordinating council).
2. Draft a charter that defines the bridge's specific purpose, beneficiary specification, and geographic scope.
3. Seat a board drawn from both regions — the afflicted side represented in binding proportions, not as tokens.
4. Build transparent financial governance; publish audited accounts on both sides.
5. Define succession mechanics so that when founders depart the bridge continues.
6. Anticipate capture risks — political pressure, donor conditionality, state interference — and build structural protections.
7. Completion indicator: a registered institution with both-sides governance, an initial audit, and a documented succession plan.` },
        { title: "Protect the dignity of the afflicted side — refuse the charity frame and its condescensions", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:264",
              arabic: "لَا تُبْطِلُوا صَدَقَاتِكُم بِالْمَنِّ وَالْأَذَىٰ",
              translation: "Do not invalidate your charities with reminders of it and injury.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1427",
              translation: "The Prophet (peace be upon him) said: \"The upper hand is better than the lower hand\" — interpreted by the ulama not as a ranking of human worth but as a description of the temporary economic relationship; the scholars stressed that the giver owes the receiver gratitude for accepting.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The failure mode of cross-regional ummah work is the donor posture — the affluent side as saviour, the afflicted side as passive recipient. This kills every bridge eventually because it violates the fundamental Islamic framing: wealth belongs to Allah, the giver is a steward, and the receiver is dignified. Quran 2:264 is explicit that manipulation, reminders of favour, or hurtful speech invalidate charity entirely. A bridge that does not protect the dignity of the afflicted side is not a bridge — it is a transaction that will rot.


**How?**

1. Audit your own language about the afflicted region — words like "helping," "saving," or "developing" carry framing; replace them with words that recognise reciprocity.
2. Structure decision rights so the afflicted side directs its own priorities; the affluent side supports, it does not set the agenda.
3. Make learning flow both ways — what the affluent side needs to learn from the afflicted is often greater than the reverse.
4. Compensate labour on the afflicted side at fair rates; do not extract volunteer time the affluent side would not give freely.
5. Refuse to publish photography or narratives that spectacle the afflicted for the affluent's emotional consumption.
6. When conflicts arise, defer to the afflicted side's judgment about their own context; you are not the expert on their lives.
7. Completion indicator: a reviewed set of bridge-communication and governance practices that the afflicted-side partners affirm respects their dignity.` },
        { title: "Replicate the model — help others build bridges between other affluent/afflicted pairs", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 5:32",
              arabic: "وَمَنْ أَحْيَاهَا فَكَأَنَّمَا أَحْيَا النَّاسَ جَمِيعًا",
              translation: "And whoever saves one — it is as if he had saved mankind entirely.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 1017",
              translation: "The Prophet (peace be upon him) said: \"Whoever introduces a good practice in Islam will receive its reward and the reward of all who act on it after him, without any diminution of their reward.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

One bridge, however durable, reaches only one front of the ummah. The ummah has many affluent/afflicted asymmetries — and each needs its own purpose-built bridge. Making your model replicable multiplies the benefit without multiplying the founders' burden. This is how Islamic civilisation grew its institutions: one ribat, one madrasa, one waqf at a time, each documented openly enough that the next founder could begin with the lessons of the last.


**How?**

1. Document the bridge's design, mistakes, and iterations publicly; do not hide the failures.
2. Publish templates — charter, governance, financial controls, communication principles — that others can adapt.
3. Host other prospective bridge-builders; walk them through what worked and what did not.
4. Offer standing advisory support to at least one replication effort in a different affluent/afflicted pair.
5. Resist the urge to franchise under your brand; replicators should own their bridges fully.
6. Track the replications over years — bridges take decades to mature, and the children of the first bridge are what justify it.
7. Completion indicator: at least one independently-operating bridge inspired by the model, with documented evidence of durable transfer.` },
      ],
    },

  ],

  // ── GROWTH: Proactive Kindness, Sharing, Visiting, Forbearance ──
  ummah_neighbors_growth: [
    {
      title: "Share food with your neighbors regularly — especially on Eid, Jumu'ah, and occasions of joy",
      priority: 'urgent', tags: ['haqq-al-jar', 'food-sharing', 'sunnah'],
      description: " Food sharing is the most repeatedly emphasised act of neighborliness in the Prophetic tradition. This task establishes it as a regular, joyful practice rather than an occasional gesture.",
      subtasks: [
        { title: "Begin the habit of sharing food from your regular cooking — increase portions and send a plate next door", done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6017",
              translation: "The Prophet (peace be upon him) said: \"O Muslim women, do not belittle any gift from your neighbor, even if it is the hoof of a sheep.\" Sharing food from regular cooking, however humble, fulfills the right of the neighbor.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan al-Tirmidhi 1944",
              translation: "The Prophet (peace be upon him) said: \"The best companion in the sight of Allah is the best to his companion, and the best neighbor in the sight of Allah is the best to his neighbor.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Hasan Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2625",
              arabic: "يَا أَبَا ذَرٍّ إِذَا طَبَخْتَ مَرَقَةً فَأَكْثِرْ مَاءَهَا وَتَعَاهَدْ جِيرَانَكَ",
              translation: "O Abu Dharr, when you prepare broth, add more water to it, and have regard for your neighbors.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Hadith cited inline in this subtask's description; backfilled into structured sources via NotebookLM Muslim Scholar canonical-text retrieval.",
            },
          ],
          description: `**Why?**

The hadith "increase the water in your broth and share with your neighbors" (Muslim 2625) is a direct prophetic command — not a suggestion. It normalises food sharing as part of routine cooking, not an occasional grand gesture. When you cook, you are already spending time and resources; adding a little extra and sending a plate next door costs almost nothing but communicates profound care. It says: "I thought of you while feeding my own family." This is the daily, consistent ihsan that builds genuine neighborly bonds.


**How?**

1. Choose one or two meals per week as your "neighbor plate" meals — days when you intentionally cook extra.
2. When preparing the meal, simply increase the recipe by one or two portions.
3. Plate the food attractively on a reusable plate or container — presentation communicates respect.
4. Deliver it while warm with a genuine smile: "We made extra today and wanted to share with you."
5. Do not worry about reciprocation — some neighbors will return the gesture, others will not. Your action is for Allah.
6. Rotate among your neighbors so that everyone receives food periodically, not just one household.
7. Completion indicator: you have shared food from your regular cooking with neighbors at least four times in one month.` },
        { title: "Prepare special dishes for neighbors on Eid al-Fitr and Eid al-Adha — include non-Muslim neighbors", done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6017",
              translation: "The Prophet (peace be upon him) said: \"O Muslim women, do not belittle any gift from your neighbor, even if it is the hoof of a sheep.\" On Eid, generosity should extend to all neighbors, including non-Muslims.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 60:8",
              arabic: "لَّا يَنْهَاكُمُ اللَّهُ عَنِ الَّذِينَ لَمْ يُقَاتِلُوكُمْ فِي الدِّينِ وَلَمْ يُخْرِجُوكُم مِّن دِيَارِكُمْ أَن تَبَرُّوهُمْ",
              translation: "Allah does not forbid you from those who do not fight you because of religion and do not expel you from your homes — from being righteous toward them.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Eid is a time of communal joy, and the Prophet (peace be upon him) emphasised that no one should be left out of this joy. Sharing Eid food with neighbors — Muslim and non-Muslim alike — is one of the most beautiful expressions of Islamic neighborliness. For Muslim neighbors, it strengthens the bond of ummah celebration. For non-Muslim neighbors, it opens a window into Islamic culture through the universal language of food and generosity. The Quran commands ihsan toward "the neighbor who is near and the neighbor who is far" (4:36) without restricting it to Muslim neighbors.


**How?**

1. Before each Eid, plan which dishes you will prepare for sharing — choose items that travel well and are broadly appealing.
2. Consider dietary restrictions: avoid common allergens where possible, and for non-Muslim neighbors, label dishes clearly if they contain unfamiliar ingredients.
3. Prepare enough portions for all adjacent neighbors — not just one or two households.
4. Package the food nicely: use a clean container with a small card saying "Eid Mubarak — wishing you and your family joy and blessings."
5. Deliver personally, explain briefly: "Today is Eid, our celebration — we wanted to share our joy with you."
6. For non-Muslim neighbors who may be unfamiliar, a brief, warm explanation of what Eid celebrates adds meaning to the gift.
7. Completion indicator: you have shared Eid food with every adjacent neighbor — Muslim and non-Muslim — on both Eid al-Fitr and Eid al-Adha.` },
        { title: "Share food when your household has any occasion of joy — a new baby, a graduation, a promotion, or good news", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 76:8-9",
              arabic: "وَيُطْعِمُونَ الطَّعَامَ عَلَىٰ حُبِّهِ مِسْكِينًا وَيَتِيمًا وَأَسِيرًا ۝ إِنَّمَا نُطْعِمُكُمْ لِوَجْهِ اللَّهِ لَا نُرِيدُ مِنكُمْ جَزَاءً وَلَا شُكُورًا",
              translation: "And they give food in spite of love for it to the needy, the orphan, and the captive, saying, \"We feed you only for the sake of Allah. We wish not from you reward or gratitude.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6017",
              translation: "The Prophet (peace be upon him) said: \"Whoever believes in Allah and the Last Day, let him be generous to his neighbor.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

In Arab and Islamic tradition, good news is shared with neighbors through food — it is called "walimah" in some contexts and is rooted in the Prophetic practice of celebrating blessings communally. When you share the joy of a new baby, a graduation, a job promotion, or any good news with your neighbors through food, you include them in your happiness. This transforms neighbors from strangers who happen to live nearby into a community that shares in each other's milestones — which is exactly what the Prophetic neighborhood model looks like.


**How?**

1. Adopt the principle: when something good happens in our home, our neighbors should know through a shared plate.
2. The food does not need to be elaborate — a tray of sweets, a batch of cookies, a box of dates, or a simple dessert.
3. When delivering, share the good news warmly: "We just had some wonderful news — a new baby / a graduation / a promotion — and we wanted to share our happiness with you."
4. Accept their congratulations graciously and invite their du'a.
5. If a neighbor shares their good news with you, reciprocate with a congratulatory visit or gift even if they did not bring food.
6. This practice teaches your children that joy is meant to be shared, not hoarded.
7. Completion indicator: you have shared food with neighbors on at least two occasions of household joy.` },
        { title: "Accept food from neighbors graciously — never refuse, never criticise, always express gratitude", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 76:8",
              arabic: "وَيُطْعِمُونَ الطَّعَامَ عَلَىٰ حُبِّهِ مِسْكِينًا وَيَتِيمًا وَأَسِيرًا",
              translation: "And they give food in spite of love for it to the needy, the orphan, and the captive.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2625",
              translation: "The Prophet (peace be upon him) said: \"He who relieves a hardship of this world for a believer, Allah will relieve a hardship of the Day of Resurrection for him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

 When a neighbor brings food, they are offering you a gift that carries emotional weight — they chose to think of you, cook for you, and come to your door. Refusing, criticising, or being unenthusiastic crushes that impulse of generosity and may prevent them from ever sharing again. Gracious acceptance is itself an act of neighborliness: it honours their effort and encourages the culture of sharing that the Prophetic model establishes.

**How?**

1. When a neighbor brings food, receive it with a genuine smile and warm thanks — regardless of what the food is.
2. Never say "you should not have" in a way that discourages future sharing — instead say "this is so kind, jazakAllahu khayran" or "thank you, this means a lot."
3. Never criticise the food — not to the neighbor, not to your family afterward, not even in your own mind. They gave from what they had.
4. Taste the food and, when you next see the neighbor, mention specifically what you enjoyed: "That biryani was wonderful" or "The children loved those cookies."
5. Return the container clean, and if possible, with something in it — even a few dates or biscuits.
6. If you have dietary restrictions that prevent you from eating the food, accept it graciously and find someone in your household or circle who can enjoy it.
7. Completion indicator: you have graciously accepted every food offering from neighbors for at least three consecutive months without refusal or negative comment.` },
        { title: "Learn your neighbors' dietary preferences and restrictions so your sharing is thoughtful and inclusive", done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6017",
              translation: "The Prophet (peace be upon him) said: \"O Muslim women, do not belittle any gift from your neighbor, even if it is the hoof of a sheep.\" Learning neighbors' dietary preferences ensures your gifts are thoughtful and truly beneficial.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Thoughtful giving is the difference between a gesture and genuine care. If your neighbor is diabetic and you bring sweets, or vegetarian and you bring a meat dish, the gift misses its mark. The Prophet (peace be upon him) gave gifts according to what people valued and needed, not according to his own preferences. Learning what your neighbors can and enjoy eating elevates your food sharing from routine to deeply personal — it says "I do not just share food; I share food that I chose specifically for you."


**How?**

1. During natural conversations, learn about your neighbors' food preferences: "Do you have any food allergies or things you do not eat?"
2. Note cultural and religious dietary practices: halal, kosher, vegetarian, vegan, gluten-free, dairy-free.
3. Note health-related restrictions: diabetes (low sugar), hypertension (low salt), allergies (nuts, shellfish).
4. Record these alongside your neighbor contact information so you remember when cooking.
5. When preparing food to share, choose recipes that respect their restrictions — or prepare different dishes for different neighbors.
6. When sharing, mention it: "I made this without nuts because I know your daughter is allergic" — this communicates that the food is safe and that you cared enough to remember.
7. Completion indicator: you know the dietary preferences or restrictions of at least three neighboring households and have tailored your food sharing accordingly.` },
      ],
    },
    {
      title: "Visit sick neighbors and support them through illness with practical care",
      priority: 'urgent', tags: ['haqq-al-jar', 'visiting-sick', 'sunnah'],
      description: " Visiting the sick is a fundamental right — and when the sick person is your neighbor, the obligation is doubled by proximity.",
      subtasks: [
        { title: "When you learn a neighbor is unwell, visit or check on them within 24 hours", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:36",
              arabic: "وَالْجَارِ ذِي الْقُرْبَىٰ وَالْجَارِ الْجُنُبِ",
              translation: "And the near neighbor, the neighbor farther away.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5649",
              translation: "The Prophet (peace be upon him) said: \"The rights of a Muslim over another Muslim are five: responding to the greeting of salam, visiting the sick, following the funeral, accepting an invitation, and responding to one who sneezes.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2568",
              translation: "The Prophet (peace be upon him) said: \"Do not belittle any act of kindness, even meeting your brother with a cheerful face.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

 Visiting the sick is not a social nicety in Islam — it is a right of every Muslim and a profound act of worship. When the sick person is your neighbor, the urgency is amplified: they are steps away from your door, and you have no excuse of distance. The first 24 hours of illness are often the most disorienting, and a neighbor's presence communicates that they are not alone in their vulnerability.

**How?**

1. When you hear a neighbor is unwell — through direct communication, other neighbors, or observation (they have not been seen for days) — act within 24 hours.
2. Knock gently at a considerate time. If they answer, keep the visit brief: "I heard you are not well. I wanted to check on you. Is there anything you need?"
3. If they do not answer, leave a note or send a message: "We heard you are unwell. Please let us know if we can help with anything — groceries, medicine, or just a hot meal."
4. If they have a contagious illness, respect boundaries but still offer practical help that does not require close contact (leaving food at the door, picking up prescriptions).
5. Make du'a for their recovery during the visit and afterward.
6. Follow up the next day — one visit is not enough; consistent checking shows genuine care.
7. Completion indicator: you have visited or checked on a sick neighbor within 24 hours of learning about their illness at least once.` },
        { title: "Provide practical support during a neighbor's illness — meals, errands, or childcare", done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2568",
              translation: "The Prophet (peace be upon him) said: \"Whoever relieves a believer of a hardship of this world, Allah will relieve him of a hardship on the Day of Resurrection.\" Providing practical support during a neighbor's illness is direct relief of hardship.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2569",
              translation: "The Prophet (peace be upon him) said: \"Visit the sick, feed the hungry, and free the captives.\" Practical care during illness fulfills this Prophetic command.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A visit without practical support is warmth without substance. When a neighbor is bedridden, their household still needs to eat, prescriptions still need collecting, children still need supervision, and errands still need running. The Prophet (peace be upon him) modelled holistic care — he did not merely visit the sick; he ensured they were fed, comforted, and prayed for. Providing tangible help transforms your visit from a social obligation into genuine, life-easing support that the sick neighbor and their family will remember as a mercy from Allah delivered through your hands.


**How?**

1. When visiting a sick neighbor, ask specifically: "What practical thing can I do for you right now?"
2. Offer to cook and deliver meals for their household — a recovering person cannot cook, and their family is often overwhelmed.
3. Offer to pick up prescriptions from the pharmacy.
4. If they have children, offer to supervise them for a few hours so the sick parent can rest.
5. Offer to handle errands: grocery shopping, posting mail, walking their pet if they have one.
6. If the illness is prolonged, coordinate with other neighbors to share the support rather than bearing it alone.
7. Completion indicator: you have provided at least two specific acts of practical support during one neighbor's illness.` },
        { title: "Make du'a for sick neighbors — at their bedside and in your own prayers", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 33:60",
              arabic: "**Translation:** If the hypocrites do not desist, as well as those with sickness in their hearts and the rumormongers in the City(of Madinah) , We will surely incite yousg against them; then they will not neighbor you in it except for a short while.",
              translation: "If the hypocrites do not desist, as well as those with sickness in their hearts and the rumormongers in the City(of Madinah) , We will surely incite yousg against them; then they will not neighbor you in it except for a short while.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 73:20",
              arabic: "**Translation:** [Prophet], your Lord is well aware that you sometimes spend nearly two-thirds of the night at prayer––sometimes half, sometimes a third––as do some of your followers. God determines the division of night and day. He knows that you will not be able to keep a measure of it and He has relented towards all of you, so recite as much of the Quran as is easy for you. He knows that some of you will be sick, some of you travelling through the land seeking God’s bounty, some of you fighting in God’s way: recite as much as is easy for you, keep up the prayer, pay the prescribed alms, and make God a good loan. Whatever good you store up for yourselves will be improved and increased for you. Ask God for His forgiveness, He is most forgiving, most merciful.",
              translation: "[Prophet], your Lord is well aware that you sometimes spend nearly two-thirds of the night at prayer––sometimes half, sometimes a third––as do some of your followers. God determines the division of night and day. He knows that you will not be able to keep a measure of it and He has relented towards all of you, so recite as much of the Quran as is easy for you. He knows that some of you will be sick, some of you travelling through the land seeking God’s bounty, some of you fighting in God’s way: recite as much as is easy for you, keep up the prayer, pay the prescribed alms, and make God a good loan. Whatever good you store up for yourselves will be improved and increased for you. Ask God for His forgiveness, He is most forgiving, most merciful.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 90",
              translation: "Narrated Abu Mas`ud Al-Ansari:Once a man said to Allah's Messenger (ﷺ) \"O Allah's Messenger (ﷺ)! I may not attend the (compulsory congregational) prayer because so and so (the Imam) prolongs the prayer when he leads us for it. The narrator added: \"I never saw the Prophet (ﷺ) more furious in giving advice than he was on that day. The Prophet said, \"O people! Some of you make others dislike good deeds (the prayers). So whoever leads the people in prayer should shorten it because among them there are the sick the weak and the needy (having some jobs to do)",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

 He instructed repeating it seven times and promised that Allah would cure the person if their appointed time had not yet come. Du'a is not a symbolic gesture in Islam — it is a direct appeal to the One who controls all healing. Making du'a for your neighbor at their bedside and in your own salah combines spiritual care with practical presence.

**How?**

1. Learn the Prophetic du'a for visiting the sick: "As'alullaha al-Adheem, Rabb al-arsh al-adheem, an yashfiyak" — repeat it seven times.
2. When visiting a sick neighbor, ask their permission to make du'a for them — almost no one refuses.
3. Place your right hand gently on the area of pain (if appropriate and the person is the same gender) and recite the du'a.
4. Also make general du'a: "May Allah grant you complete healing, remove your pain, and reward you for your patience."
5. In your own salah — during sujud or in the final tashahhud before salam — include your sick neighbor by name in your du'a.
6. If the neighbor is non-Muslim, you can still pray for their wellbeing and recovery in your own words.
7. Completion indicator: you have made du'a at the bedside of a sick neighbor and included them by name in your personal salah at least three times during their illness.` },
        { title: "Continue checking on a neighbor after they recover — the relationship should outlast the illness", done: false,
          ratNote: "Updated 2026-05-03: relevance downgraded direct → contextual after NotebookLM Muslim Scholar grounding pass. Tirmidhi 1944 names the operative ruling (excellence to one's neighbor) but does not specifically name this application (continued check-ins after recovery), which follows by inference from the general principle.",
          sources: [
            {
              kind: "hadith",
              ref: "Sunan al-Tirmidhi 1944",
              translation: "The Prophet (peace be upon him) said: \"The best companion in the sight of Allah is the best to his companion, and the best neighbor in the sight of Allah is the best to his neighbor.\" Continued check-ins after recovery follow by inference from the general principle of excellence in neighborliness.",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              hadithGrade: "Hasan Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A common pattern is to show concern during illness and then disappear once the crisis passes. But the prophetic model of neighborliness is continuous, not crisis-driven. If you only appear when someone is sick, the relationship feels transactional — a duty discharged rather than a bond maintained. Continuing to check in after recovery communicates that your care was genuine, not obligatory. It transforms a sick visit into a lasting connection and fulfils the deeper intent of Haqq al-Jar: sustained, meaningful human relationship.


**How?**

1. After a neighbor has recovered, visit again within a week to see how they are feeling.
2. Bring something positive: a fruit basket, a home-cooked meal, or simply your genuine company.
3. Ask about their recovery: "Are you back to full strength? Is there anything lingering that I can help with?"
4. If they were hospitalized, check whether they need help with post-hospital logistics: follow-up appointments, medication schedules, or physical limitations.
5. Continue your normal greeting and interaction patterns — do not let the illness create an awkward distance.
6. At least once a month for the next few months, actively check in: a knock, a call, or a brief conversation when you see them.
7. Completion indicator: you have maintained contact with a previously sick neighbor for at least one month after their recovery, checking in at least twice.` },
        { title: "Attend neighbors' funerals and console their bereaved families — fulfil the right of the deceased and the living", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:185",
              arabic: "كُلُّ نَفْسٍ ذَائِقَةُ الْمَوْتِ",
              translation: "Every soul will taste death.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1240",
              translation: "The Prophet (peace be upon him) said: \"The rights of a Muslim over another Muslim are five: returning the greeting, visiting the sick, following funeral processions, accepting invitations, and responding to one who sneezes.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) listed following the funeral (ittiba' al-janazah) among the five fundamental rights of a Muslim (Bukhari 1240). When a neighbor's family member passes away, the household enters a period of profound grief and practical chaos — funeral arrangements, receiving condolences, managing affairs. Your presence at the funeral and your support to the family afterward fulfil both the right of the deceased (being accompanied to their final rest) and the right of the living neighbor (not being abandoned in their darkest hour).


**How?**

1. When you learn of a death in a neighbor's family, offer condolences immediately — in person if possible, by phone if not.
2. Attend the funeral or janazah prayer if you are able — your physical presence matters more than any words.
3. In the days following the funeral, provide practical support: cook and deliver meals (the bereaved family should not have to worry about feeding visitors), help with household tasks, or offer to run errands.
4. Be present during the mourning period without being intrusive — sit with the family, listen, and offer comfort.
5. Avoid cliches; instead say: "Inna lillahi wa inna ilayhi raji'un. May Allah grant them mercy and grant you patience."
6. Check on the bereaved family in the weeks and months after — grief is longest after the crowds disperse.
7. Completion indicator: you have attended at least one neighbor's funeral or supported a bereaved neighbor family with practical care and sustained presence.` },
      ],
    },
    {
      title: "Speak well of your neighbors in their absence — defend their honour and never gossip",
      priority: 'high', tags: ['haqq-al-jar', 'ghiba', 'honour'],
      description: "The Quran explicitly forbids ghiba (backbiting): 'Do not backbite one another. Would one of you like to eat the flesh of his dead brother?' (49:12). Ghiba about neighbors is particularly corrosive because you share daily space. This task ensures your tongue is a source of protection, not harm, for those who live beside you.",
      subtasks: [
        { title: "Make a conscious commitment to never discuss your neighbors' faults, habits, or private affairs with anyone", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:12",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا اجْتَنِبُوا كَثِيرًا مِّنَ الظَّنِّ إِنَّ بَعْضَ الظَّنِّ إِثْمٌ ۖ وَلَا تَجَسَّسُوا وَلَا يَغْتَب بَّعْضُكُم بَعْضًا",
              translation: "O you who have believed, avoid much suspicion; indeed, some suspicion is sin. And do not spy or backbite each other.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 104:1",
              arabic: "وَيْلٌ لِّكُلِّ هُمَزَةٍ لُّمَزَةٍ",
              translation: "Woe to every scorner and mocker.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2589",
              translation: "The Prophet (peace be upon him) said: \"Do you know what backbiting is?\" They said, \"Allah and His Messenger know best.\" He said, \"It is to mention your brother in a way that he would dislike.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) defined ghiba as "mentioning about your brother what he would dislike" (Muslim 2589). Neighbors are especially vulnerable to ghiba because proximity gives you more information about them than you would have about distant acquaintances. You hear their arguments, see their visitors, notice their habits. Every piece of private information you share — even framed as "concern" — is a violation of the trust that proximity imposes. A Muslim's tongue should be the safest place for their neighbor's reputation, not the most dangerous.


**How?**

1. Make a firm internal commitment: "I will not mention anything about my neighbors that they would dislike, to anyone, for any reason."
2. Identify your most common ghiba triggers: do you gossip with family? With other neighbors? On the phone with friends?
3. When conversation turns to discussing a neighbor — their noise, their habits, their visitors, their lifestyle — change the subject or remain silent.
4. If someone directly asks you about a neighbor's private affairs, respond: "I would rather not discuss that — it is their private matter."
5. Monitor your own speech for a full week, noting every time you almost mentioned something negative about a neighbor.
6. Remember the severity: the Quran compares ghiba to eating the flesh of your dead brother (49:12).
7. Completion indicator: you have gone at least one full month without discussing any neighbor's private affairs or faults with anyone.` },
        { title: "Defend your neighbor's honour when others speak ill of them in their absence", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:11",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا لَا يَسْخَرْ قَوْمٌ مِّن قَوْمٍ",
              translation: "O you who have believed, let not a people ridicule another people.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2564",
              translation: "The Prophet (peace be upon him) said: \"Do not envy one another, do not inflate prices, do not hate one another, do not turn your backs on one another, and do not undercut one another in trade. Be, O servants of Allah, brothers.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

 Not gossiping is the baseline; defending your neighbor when others gossip is the higher standard. When colleagues, family, or other neighbors speak ill of your neighbor and you remain silent, your silence is interpreted as agreement. Active defense — redirecting the conversation, speaking a positive word, or gently challenging the criticism — fulfils your duty as a guardian of your neighbor's honour and earns one of the most powerful protections promised in the Sunnah.

**How?**

1. When someone speaks negatively about your neighbor in their absence, do not remain silent.
2. If the criticism is unfair, say so clearly: "I do not think that is accurate — they have always been considerate in my experience."
3. If the criticism has some basis, redirect: "I think they are going through a difficult time. Let us give them the benefit of the doubt."
4. If the conversation persists, state your principle: "I would not want someone discussing me like this when I am not here."
5. If you are unable to redirect the conversation, leave it — disengaging is better than passive listening.
6. Speak positively about your neighbors proactively — mention their kindnesses, their good qualities, their helpful actions.
7. Completion indicator: you have actively defended a neighbor's honour in at least one conversation where they were being discussed negatively.` },
        { title: "Speak positively about your neighbors to others — mention their good qualities and kind actions", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:8",
              arabic: "وَإِذَا حَضَرَ الْقِسْمَةَ أُولُو الْقُرْبَىٰ وَالْيَتَامَىٰ وَالْمَسَاكِينُ فَارْزُقُوهُم مِّنْهُ وَقُولُوا لَهُمْ قَوْلًا مَّعْرُوفًا",
              translation: "If other relatives, orphans, or needy people are present at the distribution, give them something too, and speak kindly to them.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6136",
              translation: "The Prophet (peace be upon him) said: \"Whoever believes in Allah and the Last Day should say something good, or keep silent.\"",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "speaking positively about neighbors is the active application of this principle — choosing to say the good thing rather than defaulting to silence or critique.",
            },
          ],
          description: `**Why?**

 When you mention your neighbor's positive qualities to others — their generosity, their friendliness, their helpfulness — you build social capital for them in the community. This is the opposite of ghiba: it is called dhikr al-khayr (mentioning the good), and it strengthens the fabric of neighborhood relationships. A person who is known for speaking well of others becomes a trusted anchor in the community, and their positive words create a culture of appreciation rather than criticism.

**How?**

1. Make a habit of noticing and remembering kind things your neighbors do — the food they share, the door they hold, the greeting they give.
2. When speaking about your neighborhood to friends, family, or colleagues, lead with the positive: "We have wonderful neighbors — they are always so considerate."
3. If someone asks about your building or street, highlight neighborly acts: "My neighbor brought us food during Ramadan" or "The family downstairs always greets my children warmly."
4. In community settings — at the masjid, school gatherings, or social events — mention neighbors by name with positive associations.
5. Be genuine, not performative — speak about real qualities you have observed.
6. This practice will reshape your own perception: when you habitually notice the good, the minor annoyances shrink in your mind.
7. Completion indicator: you have spoken positively about your neighbors to others at least five times over one month, mentioning specific good qualities or actions.` },
        { title: "Practise husn al-dhann (good assumption) — interpret your neighbor's ambiguous actions charitably", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:12",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا اجْتَنِبُوا كَثِيرًا مِّنَ الظَّنِّ إِنَّ بَعْضَ الظَّنِّ إِثْمٌ",
              translation: "O you who have believed, avoid much [negative] assumption. Indeed, some assumption is sin.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6066",
              translation: "The Prophet (peace be upon him) said: \"Beware of suspicion, for suspicion is the worst of false tales.\" Husn al-dhann (good assumption) toward neighbors is a Prophetic command.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Quran commands: "O you who believe, avoid much suspicion — indeed some suspicion is sin" (49:12). When your neighbor slams a door, it might be the wind. When they do not return your greeting, they might be distracted by grief. When their children are noisy, they might be struggling to cope. Su' al-dhann (negative assumption) poisons relationships before a single word is exchanged. Husn al-dhann (positive assumption) preserves bonds and protects your own heart from the corrosion of suspicion. It is not naivety; it is a deliberate spiritual discipline that the Quran mandates.


**How?**

1. When a neighbor does something that annoys or offends you, immediately generate three charitable explanations before reacting.
2. Example: your neighbor did not greet you. Possible reasons: they did not hear you, they are preoccupied with a problem, they are feeling unwell.
3. Choose the most charitable explanation as your working assumption unless you have concrete evidence otherwise.
4. Do not share your suspicions with others: "Did you notice that our neighbor ignored me?" — this is where ghiba begins.
5. If a pattern persists and genuinely concerns you, address it directly and privately with the neighbor rather than building a case of suspicion in your mind.
6. Regularly review your assumptions about neighbors: have any become unfairly negative? Correct them.
7. Completion indicator: you have practised husn al-dhann in at least five ambiguous situations with neighbors, choosing charitable interpretation over suspicion.` },
        { title: "Never use social media, building group chats, or community forums to complain about neighbors", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:12",
              arabic: "وَلَا يَغْتَب بَّعْضُكُم بَعْضًا أَيُحِبُّ أَحَدُكُمْ أَن يَأْكُلَ لَحْمَ أَخِيهِ مَيْتًا فَكَرِهْتُمُوهُ",
              translation: "And do not backbite each other. Would one of you like to eat the flesh of his brother when dead? You would detest it.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2589",
              translation: "The Prophet (peace be upon him) said: \"Do you know what backbiting is? It is mentioning your brother in a way he would dislike.\" Using group chats or social media to complain about neighbors is a modern form of ghiba.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Modern technology has created new avenues for ghiba that did not exist in the Prophet's time. A complaint about a neighbor in a building WhatsApp group, a passive-aggressive post on a community Facebook page, or a neighbourhood app rant about parking — these are the digital equivalents of eating your brother's flesh, amplified by the permanence and reach of the internet. What was once a conversation between two people is now a broadcast to dozens or hundreds. The neighbor's reputation is damaged publicly, often without their knowledge or ability to respond. This violates Haqq al-Jar in a way that is nearly impossible to undo.


**How?**

1. Adopt a strict policy: never post, type, or share anything negative about a neighbor on any digital platform.
2. This includes: building management group chats, neighbourhood apps (Nextdoor, WhatsApp groups), social media, and community forums.
3. If you have a legitimate issue, address it directly with the neighbor or through proper building management channels — not public forums.
4. If others post complaints about neighbors in group chats, do not engage, agree, or add fuel — silence or a gentle redirect is best.
5. Before posting anything about your neighborhood, apply the test: "Would my neighbor be hurt if they saw this?" If yes, do not post.
6. If you catch yourself typing a complaint, delete it and address the issue properly instead.
7. Completion indicator: you have maintained a completely clean record on digital platforms — zero complaints about neighbors — for at least three months.` },
      ],
    },
    {
      title: "Build trust and reliability — become the neighbor others count on without hesitation",
      priority: 'high', tags: ['haqq-al-jar', 'trust', 'reliability'],
      description: "Trust is built through consistent, small acts of reliability over time — not through grand gestures. This task focuses on becoming the neighbor whose word is their bond, whose help can be counted on, and whose presence is a source of security.",
      subtasks: [
        { title: "Follow through on every promise and offer you make to a neighbor — without exception", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 23:8",
              arabic: "وَالَّذِينَ هُمْ لِأَمَانَاتِهِمْ وَعَهْدِهِمْ رَاعُونَ",
              translation: "And they who are to their trusts and their promises attentive.",
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
              ref: "Sahih al-Bukhari 33",
              translation: "The Prophet (peace be upon him) said: \"The signs of the hypocrite are three: when he speaks he lies, when he promises he breaks it, and when he is entrusted he betrays.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) described the hypocrite as one who, when they promise, they break it (Bukhari 33). Every unfulfilled promise to a neighbor — "I will bring you that dish," "I will help you move that furniture," "I will look into that for you" — erodes trust and teaches your neighbor that your words are unreliable. Conversely, consistent follow-through on even small commitments builds a reputation of trustworthiness (amanah) that becomes the foundation of genuine neighborly relationship.


**How?**

1. Before offering anything to a neighbor, pause and ask yourself: "Can I realistically deliver on this?"
2. Do not offer what you cannot fulfil — a sincere "I wish I could help but I cannot right now" is better than a broken promise.
3. When you make an offer, set a specific time: "I will bring the food by 6pm tomorrow" — not "I will bring it sometime."
4. Write down commitments if you tend to forget — a note on your phone or a reminder.
5. Deliver on time or early. If something prevents you, inform the neighbor before the deadline, not after.
6. After fulfilling a commitment, do not expect or seek praise — let the act speak for itself.
7. Completion indicator: you have fulfilled every single commitment made to neighbors for three consecutive months with zero broken promises.` },
        { title: "Be available and responsive when neighbors reach out — answer calls, respond to messages promptly", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:86",
              arabic: "وَإِذَا حُيِّيتُم بِتَحِيَّةٍ فَحَيُّوا بِأَحْسَنَ مِنْهَا أَوْ رُدُّوهَا",
              translation: "And when you are greeted with a greeting, greet with one better than it or return it in kind.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6017",
              translation: "The Prophet (peace be upon him) said: \"Whoever believes in Allah and the Last Day, let him be generous to his neighbor.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Availability is the currency of trust. If a neighbor calls and you never answer, messages you and you respond days later, or knocks and you pretend to be out — you communicate that they are not a priority. The Prophet (peace be upon him) was famously accessible; anyone could approach him at any time with any need. You are not the Prophet, but within the scope of your neighborly relationship, being responsive when someone reaches out is a fundamental expression of the care you claim to have. Responsiveness is not about being always available — it is about being reliably reachable.


**How?**

1. When a neighbor calls, answer if possible. If you cannot, return the call within a few hours.
2. When a neighbor sends a message, respond within the day — even if just to say "I will get back to you on this."
3. When a neighbor knocks, answer the door with a welcoming expression.
4. If you are genuinely busy, be honest: "I am in the middle of something right now — can I come by in an hour?"
5. Never leave a neighbor's request hanging with no response — even a "no" is better than silence.
6. If a pattern of requests becomes excessive, set kind boundaries: "I am happy to help when I can. This week is particularly busy for me, but next week should be better."
7. Completion indicator: you have responded to every neighbor communication within 24 hours for at least two consecutive months.` },
        { title: "Offer help proactively — do not wait to be asked when you see a need", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:195",
              arabic: "وَأَحْسِنُوا ۛ إِنَّ اللَّهَ يُحِبُّ الْمُحْسِنِينَ",
              translation: "And do good; indeed, Allah loves the doers of good.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2625",
              translation: "The Prophet (peace be upon him) said: \"Whoever relieves a believer of a hardship of this world, Allah will relieve him of a hardship of the Day of Resurrection.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

 Waiting to be asked places the burden of vulnerability on the person in need — many people are too proud, too shy, or too overwhelmed to ask. Proactive help anticipates the need and removes the awkwardness of asking. It is a higher level of ihsan: you see the need and act before the request is made, demonstrating that your awareness of your neighbor extends beyond polite greetings to genuine attentiveness.

**How?**

1. Train your eyes to notice: a neighbor struggling with groceries, an elderly person shovelling snow, a parent juggling children and bags, a moving truck with no helpers.
2. Do not wait for eye contact or a request — walk over and offer: "Can I give you a hand with those bags?"
3. After storms, check if elderly or vulnerable neighbors need anything cleared, repaired, or reported.
4. When you are heading to the shops, knock on an elderly or homebound neighbor's door: "I am going to the supermarket — do you need anything?"
5. If you have a skill (plumbing, electrical, gardening, technology), offer it when you see a neighbor struggling with a related problem.
6. Keep your offers specific and immediate — "I can help you right now" is more useful than "Let me know if you need anything."
7. Completion indicator: you have proactively offered help to neighbors at least five times in two months without being asked.` },
        { title: "Be consistent in your neighborly conduct — maintain the same warmth regardless of your mood or circumstances", done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sunan al-Tirmidhi 1944",
              translation: "The Prophet (peace be upon him) said: \"The best companion in the sight of Allah is the best to his companion, and the best neighbor in the sight of Allah is the best to his neighbor.\" Consistency in neighborly conduct, regardless of mood, is the mark of the best neighbor.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Hasan Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 41:34",
              arabic: "ادْفَعْ بِالَّتِي هِيَ أَحْسَنُ فَإِذَا الَّذِي بَيْنَكَ وَبَيْنَهُ عَدَاوَةٌ كَأَنَّهُ وَلِيٌّ حَمِيمٌ",
              translation: "Repel [evil] by that which is better; and thereupon the one between whom and you there was enmity [will become] as though he was a devoted friend.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

 A neighbor who is warm one day and cold the next creates confusion and anxiety. People cannot trust what is unpredictable. If your greeting depends on your mood, your helpfulness depends on your schedule, and your kindness depends on whether the neighbor was kind to you last — then your conduct is not principled, it is reactive. Consistency is the hallmark of a character built on iman, not on circumstances.

**How?**

1. Recognize that your internal state (stress, fatigue, frustration) is not your neighbor's concern — they deserve consistent warmth.
2. Greet with the same enthusiasm on your worst day as on your best — make salam a habit, not an expression of mood.
3. If you are going through a difficult time, maintain at minimum your baseline: greetings, basic courtesy, and responsiveness.
4. Do not punish neighbors with coldness because of an unrelated bad day.
5. If you cannot be fully present (genuine crisis, illness), briefly explain: "I am going through something difficult right now but please know I still care about being a good neighbor."
6. Review your conduct monthly: has it been consistent, or do your neighbors experience you as unpredictable?
7. Completion indicator: you can honestly say your neighbors experience consistent warmth from you regardless of your personal circumstances, sustained over at least two months.` },
        { title: "Keep your neighbors' entrusted items and keys safe — never betray a practical trust", done: false,
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
              kind: "hadith",
              ref: "Sahih al-Bukhari 33",
              translation: "The Prophet (peace be upon him) said: \"The signs of the hypocrite are three: when he speaks he lies, when he promises he breaks it, and when he is entrusted he betrays.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

 When a neighbor gives you a spare key, asks you to hold a package, entrusts you with a child for an hour, or shares confidential information — these are amanat (trusts) that carry the same weight as any other contractual obligation in Islam. Mishandling a neighbor's entrusted item — losing a key, opening a package, sharing a confidence — destroys the trust that took months to build and violates a principle that Islam places among the highest moral obligations.

**How?**

1. When a neighbor entrusts you with a key, store it in a designated, secure location — not tossed in a junk drawer.
2. When holding a package, keep it safe and return it promptly when they are available.
3. Never open, inspect, or discuss the contents of anything entrusted to you.
4. If you are caring for a neighbor's child, give them the same attention and safety standards you give your own children.
5. If a neighbor shares private information in confidence ("We are having financial difficulties," "My spouse is ill"), guard it absolutely — mention it to no one.
6. If you lose or damage an entrusted item, inform the neighbor immediately and take responsibility.
7. Completion indicator: you have reliably safeguarded every item, key, and piece of information entrusted to you by a neighbor with zero breaches.` },
      ],
    },
    {
      title: "Exercise patient forbearance (hilm) with difficult neighbors — transforming hardship into reward",
      priority: 'medium', tags: ['haqq-al-jar', 'hilm', 'sabr'],
      description: "Not every neighbor is easy to live beside. This task builds the muscle of hilm (forbearance) as a spiritual practice.",
      subtasks: [
        { title: "Identify the neighbor relationship that is most challenging for you and commit to treating it as a test from Allah", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:36",
              arabic: "**Translation:** Worship Allah, and do not associate with Him anything, and be good to parents and to kinsmen and orphans and the needy and the close neighbor and the distant neighbor and the companion at your side and the wayfarer and to those (slaves who are) owned by you. Surely, Allah does not like those who are arrogant, proud,",
              translation: "Worship Allah, and do not associate with Him anything, and be good to parents and to kinsmen and orphans and the needy and the close neighbor and the distant neighbor and the companion at your side and the wayfarer and to those (slaves who are) owned by you. Surely, Allah does not like those who are arrogant, proud,",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 49:13",
              arabic: "**Translation:** O mankind, We have created you from a male and a female, and made you into races and tribes, so that you may identify one another. Surely the noblest of you, in Allah’s sight, is the one who is most pious of you. Surely Allah is All-Knowing, All-Aware.",
              translation: "O mankind, We have created you from a male and a female, and made you into races and tribes, so that you may identify one another. Surely the noblest of you, in Allah’s sight, is the one who is most pious of you. Surely Allah is All-Knowing, All-Aware.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 4477",
              translation: "Narrated `Abdullah:I asked the Prophet, \"What is the greatest sin in the Sight of Allah?\" He said, \"That you set up a rival unto Allah though He Alone created you.\" I said, \"That is indeed a great sin.\" Then asked, \"What is next?\" He said, \"To kill your son lest he should share your food with you.\" I asked, \"What is next?\" He said, \"To commit illegal sexual intercourse with the wife of your neighbor",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Quran says, "We have made some of you a trial for others — will you have patience?" (25:20). A difficult neighbor is not a random inconvenience; it is a divinely placed opportunity to develop the quality of sabr that distinguishes the people of Jannah. Framing the challenge as a test transforms your experience from frustration to intentional spiritual growth.

**How?**

1. Honestly identify which neighbor relationship is most difficult for you — the loud one, the rude one, the inconsiderate one.
2. Write down specifically what makes it difficult: the behavior, how often it occurs, and how it affects you.
3. Now reframe it: "Allah has placed this person beside me as a test of my character. How I respond defines me, not what they do."
4. Set a clear intention: "I will treat this as an opportunity for sabr, not as a curse on my living situation."
5. Memorise a relevant du'a or ayah to recite when the difficulty flares up — "Rabbi zidni sabra" (My Lord, increase me in patience).
6. Keep a brief journal noting each time you chose patience over frustration — track your spiritual progress.
7. Completion indicator: you have identified your most challenging neighbor relationship, reframed it as a test, and consciously chosen patience in at least five difficult moments.` },
        { title: "Continue fulfilling the rights of difficult neighbors — do not withdraw kindness because they are unkind", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 41:34",
              arabic: "ادْفَعْ بِالَّتِي هِيَ أَحْسَنُ فَإِذَا الَّذِي بَيْنَكَ وَبَيْنَهُ عَدَاوَةٌ كَأَنَّهُ وَلِيٌّ حَمِيمٌ",
              translation: "Repel evil by that which is better; and thereupon the one between you and him is enmity will become as though he was a devoted friend.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 23:96",
              arabic: "ادْفَعْ بِالَّتِي هِيَ أَحْسَنُ السَّيِّئَةَ",
              translation: "Repel evil by that which is best.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 5152",
              translation: "The Prophet (peace be upon him) said: \"The best of neighbors in the sight of Allah is the one who is best to his neighbor.\"",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 2007",
              arabic: "لاَ تَكُونُوا إِمَّعَةً تَقُولُونَ إِنْ أَحْسَنَ النَّاسُ أَحْسَنَّا وَإِنْ ظَلَمُوا ظَلَمْنَا وَلَكِنْ وَطِّنُوا أَنْفُسَكُمْ إِنْ أَحْسَنَ النَّاسُ أَنْ تُحْسِنُوا وَإِنْ أَسَاءُوا فَلاَ تَظْلِمُوا",
              translation: "Do not be a people without a will of your own, saying: 'If people treat us well, we will treat them well; and if they do wrong, we will do wrong,' but accustom yourselves to do good if people do good, and not to do wrong if they do evil.",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              ratNote: "Verified against sunnah.com 2026-04-26 — ref Tirmidhi 2007 confirmed; arabic + translation realigned (prior fields had been auto-paired with the Bukhari 6018/Muslim 47 'should not hurt his neighbor' narration).",
              rationale: "Direct prophetic command to ground neighborly conduct in independent moral commitment rather than tit-for-tat — the operative basis for maintaining baseline kindness toward a difficult neighbor.",
            },
          ],
          description: `**Why?**

 Instead, accustom yourselves to do good if people do good, and not to do wrong if they do evil" (Tirmidhi 2007). This hadith is the clearest statement that your standard of neighborly conduct is independent of how you are treated. A difficult neighbor still has the right to your greeting, your non-harm, your protection of their privacy, and your du'a. Withdrawing these rights because they are unpleasant is punishing them for their character while degrading your own.

**How?**

1. Continue greeting the difficult neighbor every time you see them — salam or a warm hello — regardless of whether they reciprocate.
2. Continue protecting their privacy and property as you would any neighbor's.
3. Continue sharing food with them on Eid and occasions, even if they have never reciprocated.
4. If they need help, help them — the help is for Allah's sake, not for their appreciation.
5. Do not vent about them to other neighbors — this creates factions and poisons the community.
6. Remind yourself: "My good conduct toward them is recorded by Allah even if they never acknowledge it."
7. Completion indicator: you have maintained all baseline neighborly rights toward your most difficult neighbor for at least two consecutive months without withdrawal of kindness.` },
        { title: "Respond to unkindness with deliberate kindness — the Quranic principle of repelling evil with good", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 41:34",
              arabic: "وَلَا تَسْتَوِي الْحَسَنَةُ وَلَا السَّيِّئَةُ ۚ ادْفَعْ بِالَّتِي هِيَ أَحْسَنُ فَإِذَا الَّذِي بَيْنَكَ وَبَيْنَهُ عَدَاوَةٌ كَأَنَّهُ وَلِيٌّ حَمِيمٌ",
              translation: "Good and evil cannot be equal. [Prophet], repel evil with what is better and your enemy will become as close as an old and valued friend.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6030",
              translation: "The Prophet (peace be upon him) said: \"Connect with those who cut you off, give to those who withhold from you, and pardon those who wrong you.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Quran states: "Repel evil with that which is better, and thereupon the one between whom and you was enmity will become as though he was a devoted friend. But none is granted it except those who are patient, and none is granted it except the owner of great fortune" (41:34-35). This is not naive optimism — it is a divine promise with a condition: patience. Responding to a rude neighbor with a gift, to a cold neighbor with warmth, to an inconsiderate neighbor with consideration — this deliberate inversion of expected behavior has the power to transform relationships. It is also described as a quality granted only to those of great spiritual fortune.


**How?**

1. When a difficult neighbor is rude to you, respond with extra warmth — a bigger smile, a more enthusiastic greeting.
2. When they inconvenience you, respond with a favor — bring them food or offer help with something.
3. When they ignore you, continue acknowledging them as though nothing happened.
4. Keep the Quranic promise in mind: "thereupon the one between whom and you was enmity will become as though a devoted friend" — this may not happen overnight, but it is Allah's word.
5. Do not perform these acts with the expectation of changing them — do it because it is the Quranic command regardless of outcome.
6. Document the instances where you responded to negative with positive — this record strengthens your resolve over time.
7. Completion indicator: you have responded to at least three instances of unkindness from a difficult neighbor with deliberate acts of kindness.` },
        { title: "Make specific du'a for difficult neighbors — pray for their guidance and for ease between you", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 25:63",
              arabic: "وَعِبَادُ الرَّحْمَٰنِ الَّذِينَ يَمْشُونَ عَلَى الْأَرْضِ هَوْنًا وَإِذَا خَاطَبَهُمُ الْجَاهِلُونَ قَالُوا سَلَامًا",
              translation: "And the servants of the Most Merciful are those who walk upon the earth with humility, and when the ignorant address them, they say words of peace.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6014",
              translation: "The Prophet (peace be upon him) said: \"Jibril kept advising me about the neighbor until I thought he would make him an heir.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) used to pray for people who were hostile to him — the famous du'a for the people of Ta'if is an example of making du'a for those who harmed him rather than against them. When you pray for a difficult neighbor — for their guidance, their ease, their wellbeing — you are performing the highest act of neighborly love. It softens your own heart first, removing the bitterness that difficult relationships cultivate. It also invokes the power of the One who can change hearts, making it both a spiritual practice for you and a genuine hope for transformation in the relationship.


**How?**

1. In your sujud or after your obligatory prayers, include your difficult neighbor by name in your du'a.
2. Pray for their guidance: "O Allah, guide [name] and make them a source of good in our community."
3. Pray for ease between you: "O Allah, place love and mercy between me and my neighbor [name]."
4. Pray for their wellbeing: "O Allah, bless [name] in their health, family, and provision."
5. If bitterness makes this difficult, start with: "O Allah, help me to sincerely pray for [name]" — ask for the ability to pray for them.
6. Continue this for at least 30 consecutive days.
7. Completion indicator: you have made specific du'a for your most difficult neighbor by name for at least 30 days, and you have noticed a softening in your own heart toward them.` },
        { title: "Seek reward in endurance — remind yourself that patience with a difficult neighbor is among the highest forms of sabr", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:45",
              arabic: "وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ وَإِنَّهَا لَكَبِيرَةٌ إِلَّا عَلَى الْخَاشِعِينَ",
              translation: "Seek help with steadfastness and prayer — though this is hard indeed for anyone but the humble.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5641",
              translation: "The Prophet (peace be upon him) said: \"No fatigue, nor disease, nor anxiety, nor sadness, nor hurt, nor distress befalls a Muslim, even if it were the prick he receives from a thorn, but that Allah expiates some of his sins for that.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

 Enduring a difficult neighbor with patience is a sustained form of this principle — every moment of sabr is an expiation. Abu Hurayrah narrated that a man said, "O Messenger of Allah, I have a neighbor who harms me," and the Prophet instructed patience and strategic action, not abandonment. Seeking the reward of sabr transforms the daily irritation into daily spiritual income.

**How?**

1. Study the hadith on the reward of sabr and write down the ones that speak most powerfully to your situation.
2. When a moment of frustration with a neighbor occurs, consciously say: "This is an expiation for my sins. Alhamdulillah."
3. Keep a "sabr account" — a simple tally of moments you chose patience over anger. Each mark represents recorded reward with Allah.
4. Share the concept with your spouse or household so they can support the same mindset rather than amplifying frustration.
5. Periodically recalculate: "I have been patient through X incidents this month — this is X moments of reward with Allah."
6. If the situation ever becomes genuinely harmful (not merely annoying), seek proper resolution — sabr does not mean accepting abuse.
7. Completion indicator: you have consciously reframed at least ten frustrating neighbor moments as opportunities for divine reward over a two-month period.` },
      ],
    },
  ],

  // ── EXCELLENCE: Best Neighbor, Community Transformation, Da'wah Through Conduct ──
  ummah_neighbors_excellence: [
    {
      title: "Become 'the best neighbor in the sight of Allah' — embody Tirmidhi 1944 as a life goal",
      priority: 'urgent', tags: ['haqq-al-jar', 'ihsan', 'excellence'],
      description: " This is not a casual compliment but a rank — a station before Allah determined by how you treat the people who live beside you. This task focuses on attaining that rank through comprehensive, excellent conduct.",
      subtasks: [
        { title: "Set an explicit personal goal: to be the best neighbor your neighbors have ever had", done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sunan al-Tirmidhi 1944",
              translation: "The Prophet (peace be upon him) said: \"The best companion in the sight of Allah is the best to his companion, and the best neighbor in the sight of Allah is the best to his neighbor.\" Setting this as an explicit personal goal aligns your life with this Prophetic standard.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Hasan Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 1944",
              arabic: "خَيْرُ الْأَصْحَابِ عِنْدَ اللَّهِ خَيْرُهُمْ لِصَاحِبِهِ وَخَيْرُ الْجِيرَانِ عِنْدَ اللَّهِ خَيْرُهُمْ لِجَارِهِ",
              translation: "The best of companions in the sight of Allah is the one who is best to his companion, and the best of neighbors in the sight of Allah is the one who is best to his neighbor.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih (graded sahih by al-Albani)",
              rationale: "Hadith cited inline in this subtask's description; backfilled into structured sources via NotebookLM Muslim Scholar canonical-text retrieval.",
            },
          ],
          description: `**Why?**

The hadith in Tirmidhi 1944 establishes "best neighbor in the sight of Allah" as an attainable rank — not a metaphor but a genuine station of closeness to Allah. Most people drift through neighborly life without intention: they are polite when it is convenient, helpful when the cost is low, and patient when they feel like it. Setting an explicit, ambitious goal transforms neighborliness from passive decency into an active pursuit of ihsan (excellence). The difference between a good neighbor and the best neighbor is intentionality, consistency, and going beyond what is expected.


**How?**

1. Write down the goal in your personal journal or du'a list: "I intend to become the best neighbor my neighbors have ever had, seeking the rank of 'best neighbor in the sight of Allah' (Tirmidhi 1944)."
2. Define what "best neighbor ever" looks like in practical terms: someone who greets warmly, shares generously, helps proactively, endures patiently, speaks well, and is always reliable.
3. Assess honestly where you currently fall short of this standard — which areas need the most growth?
4. Create a simple personal development plan: one area to focus on each month.
5. Ask Allah for tawfiq (success) in this goal in your daily du'a.
6. Review your progress quarterly: are your neighbors experiencing the impact of your intentionality?
7. Completion indicator: you have formally set this goal, defined its practical meaning, and begun a structured plan to achieve it.` },
        { title: "Exceed expectations consistently — anticipate needs, give without being asked, and surprise with generosity", done: false,
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
            {
              kind: "hadith",
              ref: "Sahih Muslim 8",
              translation: "Umar ibn al-Khattab narrated the Hadith of Jibril, in which the Prophet (ﷺ) defined al-Ihsan as: \"That you worship Allah as if you are seeing Him, for though you don't see Him, He, verily, sees you.\" Cited as the prophetic definition of excellence — applied to neighborly relations as exceeding the minimum.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Hadith cited inline in this subtask's description; backfilled into structured sources via NotebookLM Muslim Scholar canonical-text retrieval.",
            },
          ],
          description: `**Why?**

Ihsan, as the Prophet (peace be upon him) defined it, is "to worship Allah as though you see Him" (Muslim 8). Applied to neighborliness, ihsan means treating your neighbor as though Allah is watching every interaction — because He is. This awareness transforms transactional politeness into extraordinary generosity. The "best neighbor" is not the one who does what is expected; it is the one who consistently exceeds expectation — who brings food without an occasion, who helps without being asked, who notices what others overlook and acts on it.


**How?**

1. Train yourself to anticipate: when you see a neighbor's car is being repaired, offer them a ride before they ask.
2. When seasonal changes come (winter, Ramadan, summer heat), think about what your neighbors might need and provide it proactively.
3. Send food on random days — not only Eid or occasions — with a note: "We were cooking and thought of you."
4. Notice small things: a neighbor's child achieved something at school? Congratulate them. A neighbor looks tired? Ask if they are alright.
5. Give your best, not your leftovers — the food you share, the help you offer, the time you spend should reflect ihsan, not convenience.
6. Keep a running list of small acts of excellence you can perform — and execute one per week.
7. Completion indicator: you have performed at least ten acts of exceeding-expectation neighborliness in two months, none of which were requested.` },
        { title: "Know your neighbors deeply — their joys, struggles, schedules, children's names, and what matters to them", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:36",
              arabic: "وَبِالْوَالِدَيْنِ إِحْسَانًا وَبِذِي الْقُرْبَىٰ وَالْيَتَامَىٰ وَالْمَسَاكِينِ وَالْجَارِ ذِي الْقُرْبَىٰ وَالْجَارِ الْجُنُبِ",
              translation: "And to parents do good, and to relatives, orphans, the needy, the near neighbor, the neighbor farther away.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 1944",
              translation: "The Prophet (peace be upon him) said: \"The best of companions in the sight of Allah is the best of them to his companion, and the best of neighbors in the sight of Allah is the best of them to his neighbor.\"",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The best neighbor is not the one who interacts the most but the one who knows their neighbors as complete human beings. When you know that your neighbor's mother is ill overseas, that their child is struggling at school, that they recently lost their job, that they are passionate about gardening, or that they celebrate a specific holiday — your interactions become personal, your help becomes targeted, and your presence becomes meaningful. This depth of knowing is what the Prophet (peace be upon him) modelled with his companions: he knew their concerns, remembered their circumstances, and acted accordingly.


**How?**

1. Over the course of regular interactions, learn and remember: their children's names and ages, their work situation, their family overseas, their hobbies, their concerns.
2. Write these details down — memory is unreliable, and the act of recording demonstrates that you value what they share.
3. Reference what you know in conversations: "How is your mother doing?" "Did your son start his new school?"
4. Remember dates that matter to them: birthdays, cultural celebrations, anniversaries of arrivals.
5. When you notice a change — a new car, a renovation, a worried expression — acknowledge it with genuine interest.
6. This is not surveillance; it is attentiveness. The difference is intention: you learn about them to serve them better, not to gossip or judge.
7. Completion indicator: you can describe at least three personal details about each of your immediate neighbors — details they shared with you through relationship, not observation.` },
        { title: "Create traditions of neighborly connection — regular tea visits, seasonal gatherings, or shared meals", done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6017",
              translation: "The Prophet (peace be upon him) said: \"O Muslim women, do not belittle any gift from your neighbor, even if it is the hoof of a sheep.\" Regular tea visits and shared meals elevate these small gifts into enduring traditions of connection.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan al-Tirmidhi 1944",
              translation: "The Prophet (peace be upon him) said: \"The best neighbor in the sight of Allah is the best to his neighbor.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Hasan Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Individual acts of kindness are powerful, but traditions create sustained community fabric. The Prophet (peace be upon him) established communal traditions — the walimah, the Eid gathering, the Friday congregation — because single events fade while traditions endure. A monthly tea with your neighbor, a seasonal street gathering, a Ramadan iftar open door, or a shared Eid morning visit — these become the rhythm of communal life that transforms a collection of individual households into a neighborhood in the truest sense.


**How?**

1. Start small: invite one neighbor for tea or coffee at your home, at a regular time — "Would you like to come for tea on Saturday mornings?"
2. If they accept and it goes well, make it recurring — same day, same time, building a tradition.
3. Expand gradually: invite another neighbor, then another, until it becomes a known neighborhood gathering.
4. Create seasonal traditions: an Eid morning open house, a Ramadan iftar invitation (even a simple one), a summer barbecue in the shared garden.
5. Be consistent — the power of tradition is in repetition. If you start a monthly gathering, maintain it for at least six months.
6. Let traditions grow organically: others may start hosting, contributing food, or suggesting activities.
7. Completion indicator: you have established at least one recurring neighborly tradition that has occurred at least four times and involves two or more neighbor households.` },
        { title: "Mentor a younger or newer neighbor in the practice of Haqq al-Jar — pass on the tradition", done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 494",
              translation: "Narrated Ibn `Umar:Whenever Allah's Messenger (ﷺ) came out on `Id day, he used to order that a Harba [??] (a short spear) to be planted in front of him (as a Sutra for his prayer) and then he used to pray facing it with the people behind him and used to do the same while on a journey. After the Prophet (ﷺ) , this practice was adopted by the Muslim rulers (who followed his traditions)",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 387",
              translation: "Narrated Ibrahim:Hammam bin Al-Harith said, \"I saw Jarir bin `Abdullah urinating. Then he performed ablution and passed his (wet) hands over his Khuffs (socks made from thick fabric or leather), stood up and prayed. He was asked about it. He replied that he had seen the Prophet (ﷺ) doing the same.\" They approved of this narration as Jarir was one of those who embraced Islam very late",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

 The practice of excellent neighborliness must be taught and transmitted, not merely modelled. A young person who has never been taught about Haqq al-Jar, or a new resident who comes from a culture of isolation, will not discover these practices by accident. By actively mentoring someone in the art and ethics of Islamic neighborliness, you multiply your impact: the person you teach will become a better neighbor to their own neighbors, creating a ripple effect that extends far beyond your own street.

**How?**

1. Identify a younger neighbor, a new Muslim, a newly married couple, or a recent arrival who could benefit from guidance on neighborly practice.
2. Model the behavior explicitly: "I always share food with the family next door on Eid — it is from the Sunnah."
4. Invite them to participate in your neighborly acts: "I am bringing food to our sick neighbor — would you like to come with me?"
5. Share practical tips: how to introduce yourself, how to handle conflict, how to share food across dietary differences.
6. Check in on their progress: "Have you had a chance to meet the new family in 3B?"
7. Completion indicator: you have actively mentored at least one person in the practice of Haqq al-Jar, and they have independently performed at least two neighborly acts as a result.` },
      ],
    },
    {
      title: "Transform your street or building into a genuine community through intentional neighborly leadership",
      priority: 'high', tags: ['haqq-al-jar', 'community', 'leadership'],
      description: "The Prophet (peace be upon him) transformed the individual tribes of Madinah into a unified community through deliberate acts of bonding, shared responsibility, and mutual care. Your street or building can undergo a similar transformation at a micro-scale. This task is about becoming the catalyst who turns isolated households into an interconnected, mutually supportive neighborhood.",
      subtasks: [
        { title: "Organise a neighborhood gathering — a simple shared meal, a tea, or a communal cleanup", done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2625",
              translation: "The Prophet (peace be upon him) said: \"The food of one person is sufficient for two, and the food of two is sufficient for four, and the food of four is sufficient for eight.\" Organising a shared neighborhood meal embodies this spirit of communal generosity.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
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
          ],
          description: `**Why?**

The Prophet (peace be upon him) paired the Muhajirun and Ansar through the institution of mu'akhah (brotherhood), which began with a gathering. Communities do not form spontaneously — someone must take the initiative to bring people together. In most modern neighborhoods, people have never been in the same room despite living meters apart. A single gathering — a shared meal, a tea in the common area, a communal garden cleanup — breaks the ice for dozens of future interactions. You are not organising an event; you are planting the seed of community.


**How?**

1. Choose a simple, low-barrier format: a morning tea in the shared courtyard, a potluck dinner in the common room, or a Saturday cleanup of the shared garden.
2. Invite every adjacent neighbor personally — a knock on the door is more effective than a flyer.
3. Keep the event simple: you provide tea and biscuits or a simple main dish; encourage others to bring something if they wish.
4. Set a specific date, time, and location — vagueness kills gatherings.
5. On the day, be the welcomer: greet everyone, introduce neighbors who have not met, and keep the atmosphere warm.
6. At the end, gauge interest: "Would people like to do this regularly?" If yes, set the next date before everyone leaves.
7. Completion indicator: you have organised at least one neighborhood gathering attended by at least three separate neighbor households.` },
        { title: "Create a simple neighborhood communication channel — a group chat, a shared noticeboard, or a regular check-in", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 5:2",
              arabic: "وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ وَلَا تَعَاوَنُوا عَلَى الْإِثْمِ وَالْعُدْوَانِ",
              translation: "And cooperate in righteousness and piety, but do not cooperate in sin and aggression.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6014",
              translation: "The Prophet (peace be upon him) said: \"Jibril kept recommending treating neighbors with kindness until I thought he would assign them a share of the inheritance.\" A shared communication channel keeps neighborly bonds strong.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Community requires infrastructure, and the simplest infrastructure is communication. When neighbors can easily share information — a water shutoff notice, a found set of keys, a recommendation for a plumber, or a heads-up about suspicious activity — the neighborhood becomes a network rather than a collection of strangers. The Prophet (peace be upon him) established Madinah with systems of communication: the adhan, the minbar, the marketplace. Your street needs its own version — a simple, accessible channel that connects people.


**How?**

1. Assess what would work best for your neighbors: a WhatsApp group, a physical noticeboard in the entrance, or a regular monthly knock-and-check.
2. If digital: create a group with a clear name ("Block 5 Neighbors") and invite every household. Set ground rules: practical information only, no gossip, no politics.
3. If physical: put up a simple noticeboard in the common area with a pen and cards for messages.
4. Seed the channel with useful content: "Welcome to our neighbor group. Use this for helpful information, requests, and community updates."
5. Use it yourself first: "Water will be shut off on Tuesday 10am-2pm" or "I found a set of keys in the parking area — anyone missing theirs?"
6. Moderate gently if the digital group veers into complaints or gossip — redirect to direct communication.
7. Completion indicator: a neighborhood communication channel is active with at least five participating households and at least three useful messages per month.` },
        { title: "Initiate a neighborhood mutual aid practice — a shared tool library, a meal rotation, or a babysitting swap", done: false,
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
              kind: "hadith",
              ref: "Sahih al-Bukhari 6017",
              translation: "The Prophet (peace be upon him) said: \"Whoever believes in Allah and the Last Day, let him be generous to his neighbor.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Ansar of Madinah did not just welcome the Muhajirun with words — they shared their homes, their wealth, and their resources. Mutual aid is the practical manifestation of community: when neighbors share tools instead of each buying their own, rotate meals during busy periods, or swap childcare duties — they reduce individual burden while strengthening collective bonds. This is the Islamic economic principle of ta'awun (cooperation) applied at the most local level, turning neighbors into a support system that rivals extended family.


**How?**

1. Choose one mutual aid format that would genuinely benefit your neighbors: a shared tool library (everyone contributes tools to borrow), a meal rotation (each household cooks for the group one night per month), or a babysitting swap (parents take turns watching each other's children).
2. Propose it informally to two or three neighbors: "What if we shared a set of tools instead of each buying our own?"
3. Start with a pilot: three to four households trying it for one month.
4. Keep it simple: for tools, a simple list of what each household has and a borrow-and-return system. For meals, a calendar with each household assigned a date.
5. Let it grow organically — others will join when they see it working.
6. If a format does not work, try another — the goal is mutual aid, not a specific method.
7. Completion indicator: a mutual aid practice is operational with at least three participating households and has been sustained for at least two months.` },
        { title: "Address a shared neighborhood problem collectively — parking, cleanliness, safety, or facilities", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 5:2",
              arabic: "وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ",
              translation: "And cooperate in righteousness and piety.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 49",
              translation: "The Prophet (peace be upon him) said: \"Removing something harmful from the road is charity.\" Collectively addressing neighborhood problems like parking, cleanliness, and safety is communal charity.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

 When a neighborhood faces a shared problem — poor lighting, parking disputes, a dirty communal area, a safety concern — the Islamic response is collective action, not individual complaint. Organising your neighbors to address a common issue demonstrates the power of community and builds bonds that outlast the specific problem.

**How?**

1. Identify a shared problem that affects multiple households: a recurring parking conflict, inadequate lighting, overflowing bins, or a safety concern.
2. Discuss it with a few neighbors to confirm the problem is shared and there is willingness to act together.
3. Organise a brief, focused meeting (15-20 minutes, not a lengthy discussion): define the problem, propose solutions, and assign responsibilities.
4. If the solution requires building management or local council action, draft a collective request signed by multiple households — collective voices carry more weight.
5. If the solution is within residents' control (cleaning schedules, parking agreements, noise norms), agree on the solution and commit to it together.
6. Follow through and follow up: ensure the agreed solution is implemented and working.
7. Completion indicator: one shared neighborhood problem has been addressed through collective action involving at least three households.` },
        { title: "Cultivate a culture of appreciation — publicly acknowledge neighbors' contributions and kindnesses", done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (peace be upon him) said: \"Allah is in the aid of a servant so long as the servant is in the aid of his brother.\" Publicly acknowledging neighbors' contributions strengthens the culture of mutual aid.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 55:60",
              arabic: "هَلْ جَزَاءُ الْإِحْسَانِ إِلَّا الْإِحْسَانُ",
              translation: "Is the reward for good [anything] but good?",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

 Most neighborhoods operate on invisible kindness — someone sweeps the hallway, someone holds the door, someone checks on the elderly — and none of it is acknowledged. When you publicly appreciate these acts — in the group chat, at a gathering, or simply in front of other neighbors — you reinforce the behavior and inspire others to contribute. A culture of appreciation is the soil in which community excellence grows, because people repeat what is noticed and valued.

**How?**

1. Pay attention to the quiet kindnesses in your neighborhood: who sweeps the common area, who holds doors, who checks on the elderly, who waters the shared plants?
2. Acknowledge them directly: "I noticed you swept the hallway — jazakAllahu khayran, it makes such a difference."
3. In the neighborhood group chat, post appreciation: "Shoutout to the family in 4A who shared food with all of us on Eid. May Allah bless you."
4. At gatherings, mention contributions: "I want to thank [name] for organising the parking solution — it has made everyone's life easier."
5. Encourage children to thank neighbors too — teach them to say "thank you" when the neighbor holds the elevator or shares food.
6. Make appreciation a habit, not a one-time event — consistent acknowledgment creates a self-reinforcing culture.
7. Completion indicator: you have publicly or directly acknowledged at least one neighbor's kindness per week for one month, and others have begun doing the same.` },
      ],
    },
    {
      title: "Practice da'wah through conduct — let your neighborliness be the most powerful testimony of Islam",
      priority: 'high', tags: ['haqq-al-jar', 'dawah', 'conduct'],
      description: " Your non-Muslim neighbors form their understanding of Islam primarily through you — not through books, scholars, or media. This task ensures that your conduct is the most compelling da'wah they will ever encounter.",
      subtasks: [
        { title: "Treat every non-Muslim neighbor with the same — or greater — kindness and generosity as Muslim neighbors", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 60:8",
              arabic: "لَّا يَنْهَاكُمُ اللَّهُ عَنِ الَّذِينَ لَمْ يُقَاتِلُوكُمْ فِي الدِّينِ وَلَمْ يُخْرِجُوكُم مِّن دِيَارِكُمْ أَن تَبَرُّوهُمْ وَتُقْسِطُوا إِلَيْهِمْ ۚ إِنَّ اللَّهَ يُحِبُّ الْمُقْسِطِينَ",
              translation: "God does not forbid you to deal kindly and justly with anyone who has not fought you for your faith or driven you out of your homes: God loves the just.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5978",
              translation: "Asma' bint Abu Bakr said: \"My mother came to me during the lifetime of the Prophet, hoping for some favour from me. I asked the Prophet: 'May I treat her kindly?' He said, 'Yes.'\" Ibn 'Uyainah added: \"Then Allah revealed: 'God does not forbid you from those who have not fought you on account of religion...'\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Quran states: "Allah does not forbid you from those who do not fight you because of religion and do not expel you from your homes — from being righteous toward them and acting justly toward them. Indeed, Allah loves those who act justly" (60:8). The rights of the neighbor in Islam are not restricted to Muslim neighbors. The Prophet (peace be upon him) had Jewish neighbors whom he treated with excellence. When you treat non-Muslim neighbors with equal or greater kindness, you demolish prejudice through lived experience. Every plate of food, every warm greeting, every act of help is more eloquent than any lecture about Islam.


**How?**

1. Review your current interactions: do you greet non-Muslim neighbors with the same warmth as Muslim ones? Do you share food with them equally? Do you offer help as readily?
2. If you notice any disparity, correct it immediately — equal treatment is the minimum; excellence is the goal.
3. Share food from your culture — many non-Muslim neighbors will taste biryani, baklava, or dates for the first time through you.
4. Include them in your celebrations: "It is our Eid today — we wanted to share our joy with you."
5. Show interest in their lives, celebrations, and wellbeing with the same genuineness you extend to Muslim neighbors.
6. Never condition your kindness on their response to Islam — your conduct is for Allah's pleasure regardless of their reaction.
7. Completion indicator: you can honestly say your non-Muslim neighbors receive equal or greater kindness than your Muslim neighbors, sustained over at least three months.` },
        { title: "When neighbors ask about your practices — fasting, praying, hijab, dietary laws — explain warmly and simply", done: false,
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
              ref: "Quran 29:46",
              arabic: "وَلَا تُجَادِلُوا أَهْلَ الْكِتَابِ إِلَّا بِالَّتِي هِيَ أَحْسَنُ",
              translation: "And do not argue with the People of the Scripture except in a way that is best.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 3461",
              translation: "The Prophet (peace be upon him) said: \"Convey from me, even if it is one verse.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

 Your neighbors will inevitably notice your Islamic practices — why you fast in Ramadan, why you pray at certain times, why you do not eat pork, why some family members wear hijab. These questions are organic openings for gentle da'wah. Most non-Muslim neighbors are genuinely curious, not hostile. A warm, simple, non-preachy explanation transforms a moment of curiosity into a moment of understanding. Over time, these small explanations build a comprehensive, positive picture of Islam that no media narrative can override.

**How?**

1. Prepare simple, warm explanations for the most commonly asked-about practices: fasting, prayer, hijab, halal food, Eid.
2. When a neighbor asks, respond with openness and a smile — never defensively.
3. Keep explanations brief and relatable: "Ramadan is our month of fasting — we do not eat or drink from sunrise to sunset. It is about gratitude and self-discipline."
4. Use shared values: "We fast to remember those who are hungry and to build self-control."
5. Invite participation where appropriate: "You are welcome to join us for iftar dinner one evening if you would like."
6. Never preach, lecture, or make them feel obligated to listen — share naturally and let the truth speak through your character.
7. Completion indicator: you have warmly and simply explained at least three Islamic practices to curious neighbors, and they left the conversation with a positive impression.` },
        { title: "Invite neighbors to experience Islamic occasions — iftar, Eid, Mawlid, or Friday dinner", done: false,
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
              kind: "hadith",
              ref: "Sahih al-Bukhari 600",
              translation: "Narrated Qurra bin Khalid:Once he waited for Al-Hasan and he did not show up till it was about the usual time for him to start his speech; then he came and apologized saying, \"Our neighbors invited us.\" Then he added, \"Narrated Anas, 'Once we waited for the Prophet (ﷺ) till it was midnight or about midnight. He came and led the prayer, and after finishing it, he addressed us and said, 'All the people prayed and then slept and you had been in prayer as long as you were waiting for it.\" Al-Hasan said, \"The people are regarded as performing good deeds as long as they are waiting for doing good deeds.\" Al-Hasan's statement is a portion of Anas's [??] Hadith from the Prophet (ﷺ)",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Experience is the most powerful form of understanding. When a non-Muslim neighbor sits at your iftar table, hears the adhan at sunset, watches your family break fast with dates and du'a, and eats the meal together — they experience the beauty of Islam in a way no book or documentary can convey. The Prophet (peace be upon him) hosted people of all backgrounds at his table. An invitation to share a sacred occasion is an act of generosity that bridges cultures and opens hearts to the beauty of Islamic practice and community.


**How?**

1. During Ramadan, invite at least one non-Muslim neighbor household to iftar: "We break our fast at sunset — would you like to join us for dinner one evening?"
2. On Eid, invite neighbors to your celebration: "It is our holiday — come share food and celebration with us."
3. Before the event, briefly explain what to expect: "We will pray Maghrib first, then eat together. You are welcome to observe or simply enjoy the meal."
4. Make them comfortable: no pressure to participate in religious elements, warm introduction to other guests, food that is accessible and delicious.
5. After the occasion, follow up: "We were so glad you could join us. How did you find the experience?"
6. Let them ask questions naturally — the experience itself will prompt curiosity.
7. Completion indicator: you have invited and hosted at least two non-Muslim neighbor households at Islamic occasions, and they had a positive experience.` },
        { title: "Be the neighbor who dismantles stereotypes — let your conduct contradict every negative narrative about Muslims", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 16:125",
              arabic: "ادْعُ إِلَىٰ سَبِيلِ رَبِّكَ بِالْحِكْمَةِ وَالْمَوْعِظَةِ الْحَسَنَةِ",
              translation: "Call people to the way of your Lord with wisdom and good teaching.",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              rationale: "the most powerful da'wah to those who hold negative narratives about Muslims is exemplary conduct — this is wisdom and good teaching in action.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6094",
              translation: "The Prophet (peace be upon him) said: \"Truthfulness leads to righteousness and righteousness leads to Paradise, and a person keeps telling the truth until he is recorded with Allah as a truthful person.\"",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "embodying truthful, righteous character in full view of neighbors is the lived demolition of false stereotypes — the righteous Muslim becomes the undeniable counter-evidence.",
            },
          ],
          description: `**Why?**

Media narratives, political rhetoric, and cultural prejudice create stereotypes about Muslims that your neighbors may unconsciously hold. You are the living counter-narrative. When a neighbor who has been told that Muslims are hostile experiences your warmth; when one who has been told Muslims are insular experiences your openness; when one who has been told Muslims are intolerant experiences your respect for their beliefs — the stereotype collapses under the weight of lived reality. The Prophet (peace be upon him) changed hearts not through argument but through character. Your daily conduct is the most powerful form of da'wah in your neighborhood.


**How?**

1. Be aware of common stereotypes: Muslims are unfriendly, insular, intolerant, or only kind to other Muslims.
2. Consciously contradict each one through your conduct: be the warmest greeter on the street, the most helpful neighbor in the building, the most generous sharer of food, and the most patient in conflict.
3. Be visibly engaged in communal life: attend neighborhood meetings, participate in shared activities, contribute to communal initiatives.
4. When neighbors from different backgrounds have celebrations, acknowledge them warmly: "Happy Diwali," "Merry Christmas," or whatever is appropriate — participation in their joy is not compromise of your faith, it is fulfillment of neighborly ihsan.
5. Share your own traditions openly: display "Eid Mubarak" signage, explain your practices when asked, and make your faith visible in a positive, approachable way.
6. Remember: you may be the only Muslim your neighbor knows personally — your conduct defines their understanding of 1.8 billion people.
7. Completion indicator: at least one non-Muslim neighbor has expressed a positive shift in their understanding of Muslims or Islam based on their experience with you.` },
        { title: "Build lasting interfaith or intercultural friendships with neighbors — move beyond politeness to genuine companionship", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:13",
              arabic: "يَا أَيُّهَا النَّاسُ إِنَّا خَلَقْنَاكُم مِّن ذَكَرٍ وَأُنثَىٰ وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا",
              translation: "O mankind, indeed We have created you from male and female and made you peoples and tribes that you may know one another.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 60:8",
              arabic: "لَّا يَنْهَاكُمُ اللَّهُ عَنِ الَّذِينَ لَمْ يُقَاتِلُوكُمْ فِي الدِّينِ وَلَمْ يُخْرِجُوكُم مِّن دِيَارِكُمْ أَن تَبَرُّوهُمْ وَتُقْسِطُوا إِلَيْهِمْ",
              translation: "Allah does not forbid you from those who do not fight you because of religion and do not expel you from your homes — from being righteous toward them and acting justly toward them.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) maintained deep, genuine relationships with people of other faiths — including business partnerships, neighborly bonds, and social interactions that went far beyond surface politeness. The Quran's command in 60:8 is to show "birr" (righteousness, the same word used for righteousness toward parents) to non-hostile non-Muslims. Birr is not polite distance — it is deep, genuine care. Building real friendships with non-Muslim neighbors — sharing meals, exchanging visits, knowing each other's families — creates the kind of human bond that transforms neighborhoods and testifies to Islam's vision of human connection across difference.


**How?**

1. Identify one or two non-Muslim neighbors with whom you have a natural rapport and invest in deepening the relationship.
2. Move beyond hallway greetings to intentional time together: invite them for a meal, suggest a walk, ask about their family.
3. Show genuine interest in their culture, traditions, and background — ask questions, listen, and learn.
4. Share your own culture and faith naturally through the friendship — cook together, celebrate each other's occasions, exchange stories.
5. Be vulnerable: share your struggles, ask for their advice, and allow the relationship to have the depth of real friendship.
6. Navigate differences with grace — you do not need to agree on theology to share a deep human bond built on mutual respect and genuine care.
7. Completion indicator: you have at least one genuine, deep friendship with a non-Muslim neighbor that includes regular interaction, mutual care, and reciprocal trust.` },
      ],
    },
    {
      title: "Establish a neighborhood mutual aid network — formalise the culture of reciprocal support",
      priority: 'medium', tags: ['haqq-al-jar', 'mutual-aid', 'network'],
      description: " At the excellence level, individual acts of kindness evolve into structured, sustainable mutual aid. This task is about creating a network that ensures no neighbor in your vicinity faces hardship alone — a modern micro-implementation of the Ansar model.",
      subtasks: [
        { title: "Map the skills, resources, and needs of your neighborhood — create a community asset inventory", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 5:2",
              arabic: "وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ",
              translation: "And cooperate in righteousness and piety.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (peace be upon him) said: \"Allah is in the aid of a servant so long as the servant is in the aid of his brother.\" Mapping neighborhood skills and resources is the foundation of structured mutual aid.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Ansar of Madinah did not offer random help — they matched resources to needs. One was a farmer, another a trader, another skilled in construction. The mu'akhah system worked because the Prophet (peace be upon him) paired people with complementary capabilities. Your neighborhood similarly contains untapped resources: a retired electrician, a nurse, someone with a van, a skilled cook, a tech-savvy teenager. Mapping these assets means that when a need arises, you do not scramble to find help — you already know who has the skill and who has the need.


**How?**

1. Create a simple survey — paper or digital — asking neighbors to share: "What skills can you offer?" and "What help do you sometimes need?"
2. Distribute it personally to every neighbor with an explanation: "I am trying to build a way for us to help each other more easily."
3. Compile the results into a simple directory: "Ahmed (Flat 3A) — electrician, can help with wiring issues. Maria (4C) — nurse, can advise on health questions. David (2B) — has a van, can help with large deliveries."
4. Also note needs: elderly residents who need grocery help, families with young children who need occasional childcare, people who travel frequently and need someone to collect mail.
5. Share the directory with participating households (with everyone's consent).
6. Update it as new neighbors move in or circumstances change.
7. Completion indicator: a community asset directory exists covering at least five households, with both skills offered and needs identified.` },
        { title: "Create a simple mutual aid protocol — how neighbors request and offer help within the network", done: false,
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
              kind: "hadith",
              ref: "Sahih Muslim 2625",
              translation: "The Prophet (peace be upon him) said: \"Whoever relieves a believer of a hardship of this world, Allah will relieve him of a hardship on the Day of Resurrection.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Good intentions without structure lead to inconsistency. Some people will help enthusiastically for a month and then burn out. Others will need help but feel too embarrassed to ask. A simple protocol — even as informal as a shared agreement — removes the friction from both giving and receiving. It normalises asking for help ("It is not a burden; it is what we agreed to do") and prevents helper fatigue by distributing requests across the network. The Prophet (peace be upon him) established social contracts (the Constitution of Madinah) because he understood that goodwill alone is not sufficient — it needs structure.


**How?**

1. Draft a simple set of norms (not formal rules) for the network, such as: "Anyone can request help for a genuine need. Requests are made in the group chat or by direct contact. No one is obligated — only help if you are able. Recipients are not expected to reciprocate immediately."
2. Share the norms with participants and invite feedback.
3. Designate a simple method for requests: a message in the group chat ("Does anyone have a drill I can borrow today?") or a knock on a specific neighbor's door based on the directory.
4. Agree on response norms: if you can help, respond promptly. If you cannot, no guilt.
5. For recurring needs (weekly grocery runs for an elderly neighbor), create a rotation so the responsibility is shared.
6. Review the protocol after two months and adjust based on what is working and what is not.
7. Completion indicator: a mutual aid protocol is documented, agreed upon by at least four households, and has been used successfully for at least five requests.` },
        { title: "Establish a neighborhood emergency response plan — who to call, where to gather, how to account for everyone", done: false,
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
              ref: "Quran 4:36",
              arabic: "وَالْجَارِ ذِي الْقُرْبَىٰ وَالْجَارِ الْجُنُبِ",
              translation: "And the near neighbor, the neighbor farther away.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2586",
              translation: "The Prophet (peace be upon him) said: \"The believers in their mutual kindness and compassion are like one body. When one limb suffers, the whole body responds with sleeplessness and fever.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

 Preparation is a form of tawakkul, not a contradiction of it. In an emergency — fire, flood, earthquake, power outage, severe weather — the first responders are your neighbors, not emergency services. Knowing who checks on whom, where to gather, and how to account for vulnerable residents can save lives. A neighborhood that has discussed emergency response — even briefly — will react with coordination instead of chaos.

**How?**

1. Propose a brief discussion at a neighborhood gathering or in the group chat: "Have we ever talked about what we would do in an emergency?"
2. Identify key elements: where is the nearest assembly point? Who checks on elderly and vulnerable residents? Who has first aid training? Where are the main shutoff valves for water and gas?
3. Assign voluntary responsibilities: "Ahmed and I will check on the elderly residents on our floor. Maria will bring her first aid kit. David will check the parking area."
4. Create a simple contact card with emergency numbers: building management, fire, police, hospital, and the contact numbers of key neighbors.
5. Distribute the card to every household.
6. Conduct a simple walkthrough once: "If we hear the fire alarm, we go to [assembly point]. Check that your immediate neighbors are accounted for."
7. Completion indicator: a basic emergency response plan exists, at least four households are aware of it, and key responsibilities are assigned.` },
        { title: "Create a neighborhood fund or collection for supporting neighbors in crisis", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 59:9",
              arabic: "وَيُؤْثِرُونَ عَلَىٰ أَنفُسِهِمْ وَلَوْ كَانَ بِهِمْ خَصَاصَةٌ",
              translation: "And they give preference over themselves, even though they are in privation.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2568",
              translation: "The Prophet (peace be upon him) said: \"Whoever relieves a believer of a hardship of this world, Allah will relieve him of a hardship on the Day of Resurrection.\" A neighborhood fund for crisis support is organized relief of hardship.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6011",
              arabic: "مَثَلُ الْمُؤْمِنِينَ فِي تَوَادِّهِمْ وَتَرَاحُمِهِمْ وَتَعَاطُفِهِمْ مَثَلُ الْجَسَدِ إِذَا اشْتَكَى مِنْهُ عُضْوٌ تَدَاعَى لَهُ سَائِرُ الْجَسَدِ بِالسَّهَرِ وَالْحُمَّى",
              translation: "The believers in their mutual kindness, compassion and sympathy are like one body; when any part of the body suffers, the whole body responds with sleeplessness and fever.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Hadith cited inline in this subtask's description; backfilled into structured sources via NotebookLM Muslim Scholar canonical-text retrieval.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) described the believers as one body (Bukhari 6011) — when one part suffers, the whole responds. Financial crisis, sudden medical bills, job loss, or bereavement can devastate a family. A small neighborhood fund — even informal — means that when crisis strikes, the response is immediate and collective. This is the micro-level implementation of the Bayt al-Mal concept: communal resources available to those in need. It transforms neighbors from sympathetic observers into active supporters during the hardest moments.


**How?**

1. Propose the idea to trusted neighbors: "What if we each set aside a small amount monthly so that if any of us faces a crisis, we have something to offer immediately?"
2. Keep it simple and voluntary: a small fixed amount (whatever is comfortable for the lowest-income household) collected monthly.
3. Designate a trusted person to hold the fund — or use a shared digital wallet or simple cash envelope system.
4. Agree on criteria: the fund is for genuine emergencies — medical, job loss, bereavement, urgent home repairs.
5. When a crisis occurs, the fund is offered immediately and privately — preserving the recipient's dignity.
6. Review the fund quarterly: how much is available, has it been used, and should contributions be adjusted?
7. Completion indicator: a neighborhood mutual aid fund exists with at least three contributing households and has been available for at least three months.` },
        { title: "Sustain and grow the network — onboard new neighbors, celebrate milestones, and keep the culture alive", done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2674",
              translation: "The Prophet (peace be upon him) said: \"Whoever starts a good practice in Islam will have its reward and the reward of those who act upon it after him.\" Onboarding new neighbors and celebrating milestones sustains the good practice across time.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Networks and communities decay without intentional maintenance. Neighbors move, enthusiasm fades, and the initial energy dissipates. The Prophet (peace be upon him) sustained the Madinah community through consistent reinforcement: weekly congregations, recurring celebrations, and ongoing relationship-building. Your neighborhood mutual aid network needs the same: onboarding new residents so the culture does not depend on original members, celebrating what the community has achieved to reinforce its value, and adapting as the neighborhood changes. Sustainability is the difference between a temporary initiative and a lasting community transformation.


**How?**

1. When new neighbors move in, introduce them to the network: welcome them, explain what the community does, and invite them to participate.
2. Every six months, hold a simple review gathering: what has the network accomplished? What needs improvement? Are there new needs?
3. Celebrate milestones: "Our neighborhood has shared 50 meals this year" or "We supported three families during difficult times."
4. Rotate leadership: do not let the network depend entirely on you — empower others to organise, communicate, and lead.
5. Document the network's principles and practices simply so they can be passed on to new residents or new leaders.
6. Stay adaptive: if the neighborhood's demographics or needs change, the network should evolve accordingly.
7. Completion indicator: the mutual aid network has successfully onboarded at least two new households and has been sustained with active participation for at least six months.` },
      ],
    },
    {
      title: "Build intergenerational neighbor bonds — connect children, adults, and elders across households",
      priority: 'medium', tags: ['haqq-al-jar', 'intergenerational', 'bonds'],
      description: "The Prophet's community in Madinah was not age-segregated — children learned from elders, elders were cared for by youth, and adults modelled responsibility to both. Modern neighborhoods often silo generations: children play only with children, adults interact only with adults, and elderly residents become invisible. This task restores the intergenerational fabric that makes a neighborhood a true community.",
      subtasks: [
        { title: "Teach your children the rights of neighbors — make Haqq al-Jar a household value they practice from young", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:36",
              arabic: "وَبِالْوَالِدَيْنِ إِحْسَانًا وَبِذِي الْقُرْبَىٰ وَالْيَتَامَىٰ وَالْمَسَاكِينِ وَالْجَارِ ذِي الْقُرْبَىٰ وَالْجَارِ الْجُنُبِ",
              translation: "And to parents do good, and to relatives, orphans, the needy, the near neighbor, the neighbor farther away.",
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
              ref: "Sahih al-Bukhari 6014",
              translation: "The Prophet (peace be upon him) said: \"Jibril kept advising me about the neighbor until I thought he would make him an heir.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

 Your children are your flock, and teaching them Haqq al-Jar ensures the tradition survives into the next generation. A child who grows up greeting neighbors, sharing food, and helping the elderly will carry these habits into their own adult life and teach their own children. Conversely, a child who sees their parents ignoring neighbors, complaining about them, or treating them as strangers learns that community does not matter. The teaching must be both verbal (explaining the hadith) and practical (involving children in neighborly acts).

**How?**

1. Teach your children the key hadith: "Jibril kept urging me about the neighbor..." and explain it in age-appropriate language.
2. Involve them in food preparation for neighbors: let them help cook, plate, and deliver the food.
3. Teach them to greet every neighbor by name: "That is Uncle Ahmed, say salam to him."
4. When visiting a sick or elderly neighbor, bring your children along so they see the practice modelled.
5. Praise neighborly behavior: "I was so proud when you held the door for our neighbor."
6. Discuss scenarios: "What would you do if you saw our neighbor carrying heavy bags?"
7. Completion indicator: your children independently greet neighbors by name, participate in food sharing, and can explain at least one hadith about neighbor rights.` },
        { title: "Connect your children with elderly neighbors — regular visits, small acts of service, and respectful companionship", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 17:23",
              arabic: "وَقَضَىٰ رَبُّكَ أَلَّا تَعْبُدُوا إِلَّا إِيَّاهُ وَبِالْوَالِدَيْنِ إِحْسَانًا ۚ إِمَّا يَبْلُغَنَّ عِندَكَ الْكِبَرَ أَحَدُهُمَا أَوْ كِلَاهُمَا فَلَا تَقُل لَّهُمَا أُفٍّ",
              translation: "And your Lord has decreed that you not worship except Him, and to parents, good treatment. Whether one or both of them reach old age while with you, say not to them so much as \"uff.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6014",
              translation: "The Prophet (peace be upon him) said: \"Jibril kept advising me about the neighbor until I thought he would make him an heir.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

 Elderly neighbors often experience profound loneliness — their children have moved away, their spouses may have passed, and days can pass without meaningful human interaction. A child's visit — with their energy, their curiosity, their unfiltered warmth — is a gift that many elderly people treasure above almost anything else. For the child, the relationship teaches respect, empathy, and the understanding that community spans all ages.

**How?**

1. Identify elderly neighbors in your vicinity, especially those living alone.
2. Introduce your children: "This is Auntie Fatimah from downstairs. We are going to visit her sometimes."
3. Start with brief, regular visits — 15 to 20 minutes, weekly if possible.
4. Bring something: a drawing the child made, a plate of food, or fresh flowers from the garden.
5. Teach children simple acts of service: "Ask Auntie if she needs anything from the shop" or "Help carry her rubbish bag."
6. Let the relationship develop naturally — many elderly people love teaching children skills (cooking, crafts, stories from their youth).
7. Completion indicator: your children have a regular visiting relationship with at least one elderly neighbor, sustained for at least two months.` },
        { title: "Facilitate knowledge and skill exchange between older and younger neighbors", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:13",
              arabic: "وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا",
              translation: "And made you peoples and tribes that you may know one another.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 1944",
              translation: "The Prophet (peace be upon him) said: \"The best of neighbors in the sight of Allah is the best of them to his neighbor.\"",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Every generation holds knowledge the other needs. An elderly neighbor may know how to garden, sew, cook traditional dishes, or navigate bureaucracy. A younger neighbor may understand technology, social media, online banking, or modern health resources. The Prophet (peace be upon him) paired people of different strengths through the mu'akhah system. When neighbors exchange skills across generations — an elder teaches a young family to preserve food while a teenager helps them set up video calling with their grandchildren — both sides gain and the relationship deepens beyond surface pleasantries into genuine interdependence.


**How?**

1. Using your community asset map, identify cross-generational skill matches: elderly neighbors with traditional skills, younger neighbors with technical skills.
2. Propose specific exchanges: "Mrs. Chen is an amazing cook — would she be open to teaching your daughter? In return, could your daughter help her set up WhatsApp to call her son overseas?"
3. Organise informal "skill share" sessions: a cooking afternoon, a technology help hour, a gardening morning.
4. Frame exchanges as mutual: neither party is doing charity — both are contributing and receiving.
5. Let relationships form naturally around shared activities — forced interactions feel awkward, but shared projects create genuine bonds.
6. Celebrate what is learned: "Look at the dress Mrs. Khan taught me to sew!" — public appreciation reinforces the culture.
7. Completion indicator: at least two cross-generational skill exchanges have occurred in your neighborhood, and the participants are continuing the relationship independently.` },
        { title: "Ensure elderly neighbors are included in neighborhood gatherings and not left isolated", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:36",
              arabic: "وَالْجَارِ ذِي الْقُرْبَىٰ وَالْجَارِ الْجُنُبِ وَالصَّاحِبِ بِالْجَنبِ",
              translation: "And the near neighbor, the neighbor farther away, and the companion at your side.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6017",
              translation: "The Prophet (peace be upon him) said: \"Whoever believes in Allah and the Last Day, let him be generous to his neighbor.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) noticed when regular community members were absent and sought them out. Elderly neighbors are often excluded from gatherings unintentionally — the event is too noisy, the timing is inconvenient, mobility is limited, or simply no one thought to invite them. Active inclusion means not just inviting but facilitating: offering to walk them to the gathering, ensuring seating is comfortable, adjusting the environment so they can participate. A community that isolates its elders has failed at the most basic level of Haqq al-Jar toward its most vulnerable members.


**How?**

1. When organising any neighborhood gathering, specifically invite elderly residents in person — a personal invitation matters far more than a general announcement.
2. Ask if they need help getting there: "Can I walk with you, or would you like me to bring you a plate if it is too far?"
3. Ensure the gathering space has comfortable seating, is not too loud, and is accessible (ground floor or elevator access).
4. During the gathering, include them in conversation — do not let them sit alone while everyone else socialises in their own age groups.
5. Ask for their input and stories: "You have lived here the longest — what was this street like twenty years ago?"
6. If they cannot attend, bring the gathering to them: a plate of food and a brief visit afterward.
7. Completion indicator: every neighborhood gathering you organise includes at least one elderly resident who participates meaningfully and feels welcomed.` },
        { title: "Create a legacy project that bonds generations — a neighborhood garden, a shared history project, or a communal celebration", done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2320",
              translation: "The Prophet (peace be upon him) said: \"There is no Muslim who plants a tree or sows seeds, and then a bird, or a person, or an animal eats from it, but it is regarded as a charitable gift for him.\" A neighborhood garden is a living sadaqah that bonds generations.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 13:4",
              arabic: "وَفِي الْأَرْضِ قِطَعٌ مُّتَجَاوِرَاتٌ",
              translation: "And within the land are neighboring plots.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

 A legacy project is the palm seedling of community building — something that outlasts the individuals who created it and serves future generations. A neighborhood garden tended by elders and children together, a shared history project recording the stories of long-term residents, or an annual communal celebration — these create institutional memory and intergenerational bonds that make a neighborhood feel like a home, not just an address.

**How?**

1. Choose a project that naturally involves multiple generations: a communal garden (elders advise on plants, children help dig, adults do heavy work), a street history project (elders share memories, teens record and compile), or an annual celebration (everyone contributes).
2. Propose it at a neighborhood gathering: "What if we planted a shared garden in the courtyard?"
3. Assign roles by strength: elderly neighbors advise and supervise, adults do physical work, children assist and learn, teenagers document.
4. Make the project visible: a sign in the garden, a printed booklet of neighborhood history, photos of the celebration displayed in the common area.
5. Ensure continuity: who maintains the garden? Who organises next year's celebration? Pass these roles to different households each year.
6. As new neighbors arrive, involve them: the project becomes the neighborhood's identity and welcoming tradition.
7. Completion indicator: a legacy project has been initiated with participation from at least three generations (children, adults, elders) and has produced a tangible, visible result.` },
      ],
    },
  ],

  // ── COMMUNITY ──

  // ── CORE — Fulfil basic community obligations ──
  ummah_community_core: [
    {
      title: "Establish regular congregational prayer in your locality",
      priority: 'urgent', tags: ['jamaah', 'salah', 'foundation'],
      description: "Congregational prayer is the visible heartbeat of the Muslim community. Without a functioning jamaah, the collective identity of Muslims in a locality dissolves into isolated individuals. This task establishes or strengthens the weekly and daily congregational prayer presence where you live.",
      subtasks: [
        { title: "Identify all existing congregational prayer spaces within your area", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 9:18",
              arabic: "إِنَّمَا يَعْمُرُ مَسَاجِدَ اللَّهِ مَنْ آمَنَ بِاللَّهِ وَالْيَوْمِ الْآخِرِ وَأَقَامَ الصَّلَاةَ وَآتَى الزَّكَاةَ وَلَمْ يَخْشَ إِلَّا اللَّهَ",
              translation: "The mosques of Allah are only to be maintained by those who believe in Allah and the Last Day, establish prayer, give zakah, and fear none but Allah.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 2:114",
              arabic: "وَمَنْ أَظْلَمُ مِمَّن مَّنَعَ مَسَاجِدَ اللَّهِ أَن يُذْكَرَ فِيهَا اسْمُهُ وَسَعَىٰ فِي خَرَابِهَا",
              translation: "And who are more unjust than those who prevent the name of Allah from being mentioned in His mosques and strive toward their destruction?",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 647",
              translation: "The Prophet (peace be upon him) said: \"The prayer of a man in congregation is twenty-five times more meritorious than his prayer in his house or market.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 589",
              translation: "Recorded in Volume 1, Book 11, Number 589: 'If the people knew the reward for pronouncing the Adhan and for standing in the first row... they would draw lots.' Also found in Muslim 877.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) said: "The prayer of a man in congregation is twenty-seven times superior to his prayer alone" (Bukhari & Muslim). Congregational prayer is the minimum viable expression of Muslim community — it gathers believers, synchronises their hearts, and declares the presence of Islam in a locality. Without knowing what already exists, you risk duplicating efforts or neglecting underserved areas.


**How?**

1. Survey your neighbourhood within a 15-minute drive radius — list every masjid, musalla, and informal prayer space (homes, offices, community centres).
2. For each space, record: name, address, prayer times offered, average attendance, and whether Jumu'ah is held.
3. Speak to at least three long-time residents to uncover informal or home-based jamaah gatherings that may not be publicly listed.
4. Check online directories (e.g., IslamicFinder, local Muslim council listings) to cross-reference your findings.
5. Map the results to identify geographic gaps — areas where Muslims live but no congregational prayer is accessible.
6. Share the map with community leaders to begin discussions about filling gaps.
7. Completion indicator: a documented inventory of all prayer spaces with a gap analysis shared with at least one community leader.` },
        { title: "Commit to attending Jumu'ah prayer every week without exception", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 62:9",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا نُودِيَ لِلصَّلَاةِ مِن يَوْمِ الْجُمُعَةِ فَاسْعَوْا إِلَىٰ ذِكْرِ اللَّهِ وَذَرُوا الْبَيْعَ ۚ ذَٰلِكُمْ خَيْرٌ لَّكُمْ إِن كُنتُمْ تَعْلَمُونَ",
              translation: "Believers! When the call to prayer is made on the day of congregation, hurry towards the reminder of God and leave off your trading — that is better for you, if only you knew.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 865",
              translation: "The Prophet (peace be upon him) said: \"People must stop neglecting the Friday prayer, or Allah will seal their hearts and they will be among the heedless.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Allah commands in Surah al-Jumu'ah (62:9): "O you who believe, when the call to prayer is made on Friday, hasten to the remembrance of Allah and leave trade." Jumu'ah is not optional — it is a weekly covenant renewal that binds the community together. The Prophet (peace be upon him) warned that Allah will seal the hearts of those who abandon Jumu'ah (Muslim). Your consistent presence strengthens the jamaah and fulfils a personal obligation.


**How?**

1. Block Friday prayer time in your calendar as a non-negotiable appointment — treat it with the same seriousness as any binding commitment.
2. Identify your primary masjid for Jumu'ah and a backup location in case of travel or emergency.
3. Arrive early enough to pray the sunnah prayers and listen to the full khutbah.
4. If your work schedule conflicts, speak with your employer about a religious accommodation — document the legal protections in your jurisdiction.
5. Track your attendance for 12 consecutive weeks to establish the habit.
6. If you miss a week, identify the cause and implement a specific countermeasure.
7. Completion indicator: 12 consecutive weeks of documented Jumu'ah attendance.` },
        { title: "Establish a local prayer group if no jamaah exists nearby", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 20:14",
              arabic: "إِنَّنِي أَنَا اللَّهُ لَا إِلَٰهَ إِلَّا أَنَا فَاعْبُدْنِي وَأَقِمِ الصَّلَاةَ لِذِكْرِي",
              translation: "Indeed, I am Allah. There is no deity except Me, so worship Me and establish prayer for My remembrance.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 2:3",
              arabic: "الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلَاةَ وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ",
              translation: "who believe in the unseen, keep up the prayer, and give out of what We have provided for them.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 547",
              translation: "The Prophet (peace be upon him) said: \"If there are three men in a village or in the desert and prayer is not offered in congregation, Satan has got the mastery over them. Therefore, be congregational, for the wolf eats only the stray sheep.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 56",
              translation: "Recorded in Volume 2, Book 13, Number 56: 'When the Imam is delivering the Khutba, and you ask your companion to keep quiet and listen, then no doubt you have done an evil act.' Also in Muslim 1846.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) said: "No three people in a village or desert fail to establish prayer in congregation except that Shaytan gains mastery over them" (Abu Dawud). Where no jamaah exists, Muslims are spiritually exposed. Establishing even a small prayer group of three fulfils a communal obligation and plants the seed from which a full community can grow. You do not need a building — you need intention and consistency.


**How?**

1. Identify at least two other Muslims in your area who are willing to pray together regularly — start with personal contacts, neighbours, or colleagues.
2. Agree on a location: a living room, garage, office meeting room, or any clean, quiet space.
3. Set a fixed schedule — start with one prayer per day (e.g., Isha) or Jumu'ah if no other option exists nearby.
4. Designate one person to lead (the most knowledgeable in Quran recitation) and rotate if abilities are similar.
5. Announce the prayer group through word of mouth and local Muslim social media groups to attract others.
6. Maintain consistency for at least 8 weeks before evaluating whether to expand times or seek a dedicated space.
7. Completion indicator: a functioning prayer group of 3+ people meeting at a fixed time and place for at least 8 consecutive weeks.` },
        { title: "Learn and teach the etiquettes of congregational worship", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:102",
              arabic: "وَإِذَا كُنتَ فِيهِمْ فَأَقَمْتَ لَهُمُ الصَّلَاةَ فَلْتَقُمْ طَائِفَةٌ مِّنْهُم مَّعَكَ",
              translation: "And when you are among them and lead them in prayer, let a group of them stand with you.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 62:9",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا نُودِيَ لِلصَّلَاةِ مِن يَوْمِ الْجُمُعَةِ فَاسْعَوْا إِلَىٰ ذِكْرِ اللَّهِ",
              translation: "O you who have believed, when the call to prayer is made on Friday, then proceed to the remembrance of Allah.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 631",
              translation: "The Prophet (peace be upon him) said: \"When the Iqamah is pronounced, do not come to it running, but come walking with tranquility and dignity.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) said: "Straighten your rows, for straightening the rows is part of perfecting the prayer" (Bukhari). Congregational worship has specific etiquettes — from straightening rows to responding to the imam — that transform a group of individuals into a unified body before Allah. Ignorance of these etiquettes leads to disorganised, spiritually weakened gatherings. Teaching them multiplies the reward and elevates the entire jamaah.


**How?**

1. Study the chapter on congregational prayer in a reliable fiqh manual (e.g., al-Nawawi's Riyad al-Salihin, chapters on prayer).
2. List the key etiquettes: straightening rows, filling gaps, not praying alone behind a row, following the imam without racing ahead, saying "ameen" in unison, and the sunnah of the first row.
3. Practice these etiquettes consistently in your own prayer for two weeks.
4. Prepare a brief, friendly 5-minute talk covering the most neglected etiquettes in your local jamaah.
5. Deliver the talk after a prayer with the imam's permission, or share it as a printed one-page handout.
6. Observe whether the jamaah improves in the following weeks and offer gentle reminders as needed.
7. Completion indicator: a delivered talk or distributed handout on congregational etiquettes, with visible improvement in at least one practice (e.g., straighter rows).` },
        { title: "Establish a weekly community check-in to assess collective needs", done: false,
          sources: [
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
              kind: "quran",
              ref: "Quran 49:10",
              arabic: "إِنَّمَا الْمُؤْمِنُونَ إِخْوَةٌ فَأَصْلِحُوا بَيْنَ أَخَوَيْكُمْ",
              translation: "The believers are but brothers, so make settlement between your brothers.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2586",
              translation: "The Prophet (peace be upon him) said: \"The parable of the believers in their affection, mercy, and compassion for each other is that of a body. When any limb of it aches, the whole body reacts with sleeplessness and fever.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 1379",
              translation: "Found in Sahih Muslim 1379: 'He who observed the 'Isya' prayer in congregation, it was as if he prayed up to the midnight, and he who prayed the morning prayer in congregation, it was as if he prayed the whole night.'",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) described the believers as "one body — if one part suffers, the whole body responds with sleeplessness and fever" (Bukhari & Muslim). This hadith demands a mechanism for actually knowing when a part of the body is suffering. Without regular check-ins, needs go unspoken, families suffer in silence, and the community fails its most basic covenant of mutual care. A weekly touchpoint prevents this.


**How?**

1. Designate a fixed time after a well-attended prayer (e.g., after Jumu'ah or after Isha on a weeknight) for a 15-minute community check-in.
2. Appoint a facilitator who asks three simple questions: "Does anyone know of a family in need this week?", "Are there any upcoming community events or obligations?", "Does anyone need help with anything?"
3. Keep a simple log of needs raised and actions taken — a shared document or notebook at the masjid.
4. Assign follow-up on each need to a specific person before the gathering ends.
5. Review the log at the next check-in to confirm follow-through.
6. Rotate the facilitator role monthly to distribute responsibility and build leadership.
7. Completion indicator: 8 consecutive weekly check-ins held with documented needs and follow-up actions.` },
      ],
    },
    {
      title: "Implement shura (mutual consultation) for community decisions",
      priority: 'urgent', tags: ['shura', 'governance'],
      description: "Allah describes the believers as those whose affairs are conducted by shura among them (Quran 42:38). This task establishes a functional consultation process so that community decisions are made collectively, transparently, and in accordance with the Prophetic model of governance.",
      subtasks: [
        { title: "Form a shura council of trusted, knowledgeable community members", done: false,
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
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 1714",
              translation: "The Prophet (peace be upon him) used to consult his companions frequently in matters for which no revelation had been sent down.",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Allah praises those "whose affairs are decided by mutual consultation among them" (Quran 42:38), and the Prophet (peace be upon him) regularly consulted his companions on matters not covered by revelation. A shura council prevents autocratic decision-making, distributes the weight of leadership, and ensures that diverse perspectives — including those of women, youth, and converts — are represented. Without a council, decisions default to whoever is loudest or most connected, which breeds resentment and disunity.


**How?**

1. Identify 5-9 individuals who are respected for their taqwa, knowledge, and commitment to the community — not merely their wealth or social status.
2. Ensure representation across demographics: men and women, elders and youth, long-time members and newer members.
3. Approach each candidate privately, explain the role and its responsibilities, and secure their commitment.
4. Draft a simple charter: purpose of the council, how often it meets, what decisions fall under its scope, and how disagreements are resolved.
5. Present the council and its charter to the broader community for feedback and buy-in.
6. Hold the first formal meeting with a clear agenda and recorded minutes.
7. Completion indicator: a named shura council with a ratified charter and minutes from its first meeting.` },
        { title: "Define which decisions require community-wide consultation versus leadership discretion", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 42:38",
              arabic: "وَأَمْرُهُمْ شُورَىٰ بَيْنَهُمْ",
              translation: "And whose affair is [determined by] consultation among themselves.\"",
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

Not every decision requires full shura — the Prophet (peace be upon him) made some decisions independently (e.g., military strategy at Badr) while consulting broadly on others (e.g., the defence of Madinah at Uhud). Without clear boundaries, either everything becomes a committee debate (paralysis) or nothing gets consulted (autocracy). Defining the scope respects both efficiency and the rights of the community.


**How?**

1. List all categories of decisions your community regularly faces: finances, programming, staffing, building projects, religious rulings, conflict resolution, and external partnerships.
2. For each category, determine: does this affect the whole community (shura required), a specific group (consult that group), or is it operational/routine (leadership discretion)?
3. Draft a simple decision matrix with three columns: "Full Shura", "Targeted Consultation", and "Leadership Discretion".
4. Present the matrix to the shura council for review and refinement.
5. Share the approved matrix with the community so everyone knows how decisions are made.
6. Review the matrix annually and adjust based on experience.
7. Completion indicator: an approved, published decision matrix that the shura council actively uses.` },
        { title: "Establish transparent record-keeping for all community decisions", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:282",
              arabic: "وَلَا تَسْأَمُوا أَن تَكْتُبُوهُ صَغِيرًا أَوْ كَبِيرًا إِلَىٰ أَجَلِهِ ۚ ذَٰلِكُمْ أَقْسَطُ عِندَ اللَّهِ وَأَقْوَمُ لِلشَّهَادَةِ وَأَدْنَىٰ أَلَّا تَرْتَابُوا",
              translation: "And do not be weary of writing it down, whether small or large, with its term. That is more just in the sight of Allah, more reliable as testimony, and more likely to prevent doubt among yourselves.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 3594",
              translation: "The Prophet (peace be upon him) said: \"The burden of proof is upon the claimant, and the taking of an oath is incumbent upon the one who denies.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Transparency is a requirement of amanah (trust). When community members cannot see how decisions are made, suspicion grows and trust erodes. The Quran commands writing down financial agreements (2:282) — the same principle of documentation applies to governance. Written records create accountability, prevent revisionism, and allow new members to understand the community's trajectory.


**How?**

1. Appoint a secretary for the shura council responsible for recording minutes at every meeting.
2. Use a standard template: date, attendees, agenda items, discussion summary, decisions made, action items with owners and deadlines.
3. Store minutes in an accessible location — a shared drive, a binder at the masjid, or a community portal.
4. Distribute a summary of decisions to the broader community within 48 hours of each meeting.
5. Archive financial decisions separately with supporting documentation (receipts, contracts, quotes).
6. Conduct a quarterly review of past minutes to confirm action items were completed.
7. Completion indicator: at least 4 consecutive shura meetings with published minutes and confirmed action item follow-through.` },
        { title: "Create a process for community members to raise concerns or proposals", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 42:38",
              arabic: "وَأَمْرُهُمْ شُورَىٰ بَيْنَهُمْ",
              translation: "And whose affair is [determined by] consultation among themselves.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2564",
              translation: "The Prophet (peace be upon him) said: \"None of you truly believes until he loves for his brother what he loves for himself.\" This principle extends to ensuring every community member has a voice in raising concerns.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) was accessible to every member of the community — a woman could stop him in the street to discuss her concern (Bukhari). If community members have no channel to raise issues, frustration builds underground and eventually erupts as fitna (discord). A clear, dignified process for raising concerns honours the right of every Muslim to be heard and keeps the shura council connected to the lived reality of the people it serves.


**How?**

1. Create a simple submission form — physical (a suggestion box at the masjid) and digital (an online form or dedicated email address).
2. Commit to acknowledging every submission within 7 days, even if the full response takes longer.
3. Categorise submissions: urgent (safety, conflict), standard (proposals, feedback), and informational (suggestions for the future).
4. Route urgent items to the shura council immediately; standard items to the next scheduled meeting; informational items to a review log.
5. Close the loop: inform the submitter of what action was taken and why.
6. Review submission volume and themes quarterly to identify systemic issues.
7. Completion indicator: a functioning submission system with at least 10 submissions processed and responded to.` },
        { title: "Hold a community-wide town hall to practise open consultation", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 42:38",
              arabic: "وَالَّذِينَ اسْتَجَابُوا لِرَبِّهِمْ وَأَقَامُوا الصَّلَاةَ وَأَمْرُهُمْ شُورَىٰ بَيْنَهُمْ وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ",
              translation: "And those who have responded to their Lord and established prayer and whose affair is [determined by] consultation among themselves, and from what We have provided them, they spend.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 3:159",
              arabic: "فَبِمَا رَحْمَةٍ مِّنَ اللَّهِ لِنتَ لَهُمْ ۖ وَلَوْ كُنتَ فَظًّا غَلِيظَ الْقَلْبِ لَانفَضُّوا مِنْ حَوْلِكَ",
              translation: "So by mercy from Allah you were lenient with them. And if you had been rude and harsh in heart, they would have disbanded from around you.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Shura is not merely a leadership exercise — it is the right of the entire ummah. The Prophet (peace be upon him) consulted the general body of Muslims before the Battle of Uhud, and the majority opinion was followed even though it differed from his own inclination. A town hall gives every community member a voice, builds collective ownership of decisions, and models the Islamic governance principle that leaders serve the people, not the reverse.


**How?**

1. Schedule the town hall at a time that maximises attendance — after Jumu'ah or on a weekend afternoon — and announce it at least two weeks in advance.
2. Prepare an agenda with 2-3 substantive topics the community needs to discuss (e.g., budget allocation, a new programme, a policy change).
3. Set ground rules: respectful speech, time limits per speaker, no personal attacks, and a commitment to hear minority opinions.
4. Appoint a moderator who is trusted by all parties to keep the discussion productive.
5. Record key points and any decisions or action items that emerge.
6. Publish a summary within one week so those who could not attend are informed.
7. Completion indicator: a town hall attended by at least 30% of active community members, with published summary and at least one actionable outcome.` },
      ],
    },
    {
      title: "Build a basic mutual aid system for community members in need",
      priority: 'urgent', tags: ['mutual-aid', 'takaful', 'brotherhood'],
      description: "The believers are described as allies of one another (Quran 9:71). This task creates a structured system for identifying and responding to the material needs of community members — food, shelter, financial emergencies, and practical help — so that no Muslim in your locality suffers alone.",
      subtasks: [
        { title: "Create a confidential needs registry for community members facing hardship", done: false,
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
              ref: "Quran 59:9",
              arabic: "وَيُؤْثِرُونَ عَلَىٰ أَنفُسِهِمْ وَلَوْ كَانَ بِهِمْ خَصَاصَةٌ",
              translation: "And they give preference [to others] over themselves, even though they are in privation.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6011",
              translation: "The Prophet (peace be upon him) said: \"None of you truly believes until he loves for his brother what he loves for himself.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) said: "Whoever relieves a believer of a hardship in this world, Allah will relieve him of a hardship on the Day of Judgement" (Muslim). Many Muslims suffer in silence because they are ashamed to ask or because no system exists to identify their needs. A confidential registry ensures that those in hardship are known to those who can help, without exposing them to public embarrassment — preserving both their dignity and the community's obligation.


**How?**

1. Designate 2-3 trusted individuals (known for discretion and taqwa) as the needs assessment team.
2. Create a confidential intake form: name, nature of need (food, rent, medical, transport, etc.), urgency level, and preferred contact method.
3. Make the form available privately — through a trusted intermediary, a private phone line, or a secure online form (not a public group chat).
4. Commit to reviewing every submission within 48 hours and assigning a response.
5. Store records securely with restricted access — only the needs team should see individual cases.
6. Review the registry monthly to identify recurring patterns (e.g., multiple families struggling with rent indicates a systemic issue).
7. Completion indicator: a functioning registry with at least 5 cases received, assessed, and responded to within the committed timeframe.` },
        { title: "Establish an emergency fund with clear disbursement criteria", done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6011",
              translation: "The Prophet (peace be upon him) said: \"The believers in their mutual kindness, compassion, and sympathy are just like one body. When one of the limbs suffers, the whole body responds to it with wakefulness and fever.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 59:9",
              arabic: "وَيُؤْثِرُونَ عَلَىٰ أَنفُسِهِمْ وَلَوْ كَانَ بِهِمْ خَصَاصَةٌ",
              translation: "And they give preference over themselves, even though they are in privation.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) established the bayt al-mal (public treasury) in Madinah to ensure the community could respond to needs collectively rather than depending on ad-hoc individual charity. An emergency fund with clear criteria ensures fairness, prevents favouritism, and allows rapid response. Without it, urgent needs are met only if someone happens to know someone wealthy — a system that fails the most isolated and vulnerable.


**How?**

1. Set a fundraising target for the emergency fund — start modest (e.g., enough to cover 3 months of emergency disbursements based on local cost of living).
2. Define eligibility criteria: who can apply, what types of emergencies qualify (rent arrears, medical bills, food insecurity, travel for family emergency), and maximum disbursement per case.
3. Define the approval process: who reviews applications, how quickly, and what documentation is needed.
4. Open a dedicated bank account (separate from general community funds) with dual-signatory controls.
5. Launch a fundraising appeal through khutbah announcements, community emails, and personal outreach.
6. Process the first applications using the defined criteria and document each decision.
7. Completion indicator: a funded emergency account with written criteria, at least 3 disbursements processed, and a quarterly financial report shared with contributors.` },
        { title: "Organise a monthly community meal to strengthen bonds and identify needs", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 76:8",
              arabic: "وَيُطْعِمُونَ الطَّعَامَ عَلَىٰ حُبِّهِ مِسْكِينًا وَيَتِيمًا وَأَسِيرًا",
              translation: "And they give food in spite of love for it to the needy, the orphan, and the captive.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2625",
              translation: "The Prophet (peace be upon him) said: \"He who relieves a hardship of this world for a believer, Allah will relieve a hardship of the Day of Resurrection for him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 1981",
              translation: "The Prophet (peace be upon him) said: \"The food of one person suffices for two, and the food of two suffices for four, and the food of four suffices for eight.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) said: "He is not a believer whose stomach is filled while his neighbour goes hungry" (al-Adab al-Mufrad). A shared meal is both an act of worship and a practical mechanism for community building. It brings together people who might otherwise never interact — the wealthy and the struggling, the established and the newcomer — and creates a natural, dignified setting in which needs surface without interrogation.


**How?**

1. Choose a regular date and time (e.g., first Saturday of every month after Maghrib) and a location with kitchen and seating capacity.
2. Rotate cooking responsibilities among families or groups — this distributes cost and builds ownership.
3. Keep the meal simple and communal (one-pot dishes, shared platters) to emphasise brotherhood over extravagance.
4. Seat people intentionally: mix long-time members with newcomers, youth with elders.
5. Use the gathering to make brief community announcements and ask: "Does anyone know of a need we should address this month?"
6. Track attendance and follow up with families who stop coming — absence can signal hardship.
7. Completion indicator: 4 consecutive monthly meals held with rotating hosts and at least one community need identified and addressed through the gathering.` },
        { title: "Create a skills and services directory for community self-reliance", done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (peace be upon him) said: \"Allah is in the aid of a servant so long as the servant is in the aid of his brother.\" Building a skills directory enables believers to serve one another through their God-given talents.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) encouraged believers to benefit one another: "The best of people are those who are most beneficial to others" (al-Tabarani). Many community needs — plumbing, legal advice, tutoring, translation, childcare — can be met by skills that already exist within the community. A directory unlocks this latent capacity, reduces dependency on external services, and strengthens the bonds of mutual reliance that characterise a healthy ummah.


**How?**

1. Design a simple survey asking community members: what skills or services can you offer? (Professional, trade, language, caregiving, etc.)
2. Distribute the survey at Jumu'ah, community meals, and through digital channels.
3. Compile responses into a searchable directory — a shared spreadsheet, a simple website, or a printed booklet at the masjid.
4. Categorise by type: professional services, trades, educational, caregiving, transport, and other.
5. Include each person's preferred contact method and any conditions (free for community, reduced rate, availability).
6. Promote the directory actively and update it every 6 months.
7. Completion indicator: a published directory with at least 20 entries across 5+ categories, actively used by community members.` },
        { title: "Assign a community liaison for new Muslims, converts, and isolated individuals", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:10",
              arabic: "إِنَّمَا الْمُؤْمِنُونَ إِخْوَةٌ",
              translation: "The believers are but brothers.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2586",
              translation: "The Prophet (peace be upon him) said: \"A Muslim is the brother of a Muslim. He does not oppress him, nor does he leave him at the mercy of others.\" Supporting converts and isolated individuals fulfills this obligation.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) paired the Muhajirun with the Ansar — every newcomer was given a specific companion to help them integrate. New Muslims, recent converts, and isolated individuals are the most vulnerable members of the community: they often lack family support, Islamic knowledge, and social networks. Without a dedicated liaison, they fall through the cracks, and the community fails one of its most sacred responsibilities — welcoming and supporting those who have chosen or are struggling to maintain their faith.


**How?**

1. Identify 2-3 community members who are warm, patient, knowledgeable, and have the capacity to maintain regular contact with newcomers.
2. Define the liaison role: welcome new faces at the masjid, follow up within 48 hours, provide a welcome packet (prayer times, community contacts, basic resources), and check in weekly for the first 3 months.
3. Create a simple welcome packet: local prayer times, key contacts, a brief guide to community services, and an invitation to the next community meal.
4. Announce the liaison role at Jumu'ah and post contact details at the masjid entrance.
5. Track every newcomer interaction: date of first contact, needs identified, and support provided.
6. Debrief with liaisons monthly to identify common challenges and improve the process.
7. Completion indicator: a functioning liaison system with at least 5 newcomers welcomed, tracked, and actively supported over 3 months.` },
      ],
    },
    {
      title: "Establish a visible Islamic presence in your locality",
      priority: 'high', tags: ['dawah', 'presence', 'identity'],
      description: "Islam is not meant to be hidden. The Prophet (peace be upon him) established the adhan, built the masjid, and made the Muslim community visible and recognisable in Madinah from the first day. This task ensures that Muslims in your area are known, respected, and accessible to their neighbours.",
      subtasks: [
        { title: "Ensure the adhan is called for every congregational prayer", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 62:9",
              arabic: "**Translation:** O you who have believed, when [the adhān] is called for the prayer on the day of Jumuʿah [Friday], then proceed to the remembrance of Allāh and leave trade. That is better for you, if you only knew.",
              translation: "O you who have believed, when [the adhān] is called for the prayer on the day of Jumuʿah [Friday], then proceed to the remembrance of Allāh and leave trade. That is better for you, if you only knew.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 618",
              translation: "Narrated Hafsa:When the Mu'adh-dhin pronounced the Adhan for Fajr prayer and the dawn became evident the Prophet ordered a two rak`at light prayer (Sunna) before the Iqama of the compulsory (congregational) prayer",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 615",
              translation: "Narrated Abu Huraira:Allah's Messenger (ﷺ) said, \"If the people knew the reward for pronouncing the Adhan and for standing in the first row (in congregational prayers) and found no other way to get that except by drawing lots they would draw lots, and if they knew the reward of the Zuhr prayer (in the early moments of its stated time) they would race for it (go early) and if they knew the reward of `Isha' and Fajr (morning) prayers in congregation, they would come to offer them even if they had to crawl",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The adhan is the public declaration of Muslim presence and the call that gathers the community. The Prophet (peace be upon him) said: "When the time for prayer comes, let one of you call the adhan" (Bukhari & Muslim). It is a sunnah mu'akkadah for congregational prayers and a communal obligation. Where the adhan is silent, the Muslim community is functionally invisible — both to its own members who need the reminder and to the broader society that should know Muslims are present and worshipping.


**How?**

1. Confirm that your primary prayer space has a designated mu'adhin (caller to prayer) for each prayer time.
2. If no regular mu'adhin exists, recruit at least 2-3 individuals willing to rotate — the role is a great honour and should be presented as such.
3. Ensure the adhan is called with correct wording, proper tajweed of the Arabic, and an audible, dignified voice.
4. If local laws restrict outdoor amplification, call the adhan indoors at full voice — the obligation is the call itself, not the volume.
5. Post a visible prayer timetable at the entrance of your prayer space so visitors know when the adhan will sound.
6. Train at least one young person in the adhan to ensure continuity.
7. Completion indicator: adhan called consistently for all 5 daily prayers (or at minimum for the congregational prayers held at your space) for 4 consecutive weeks.` },
        { title: "Display clear, welcoming signage at your prayer space", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 22:40",
              arabic: "وَلَوْلَا دَفْعُ اللَّهِ النَّاسَ بَعْضَهُم بِبَعْضٍ لَّهُدِّمَتْ صَوَامِعُ وَبِيَعٌ وَصَلَوَاتٌ وَمَسَاجِدُ يُذْكَرُ فِيهَا اسْمُ اللَّهِ كَثِيرًا",
              translation: "And were it not that Allah checks the people, some by means of others, there would have been demolished monasteries, churches, synagogues, and mosques in which the name of Allah is much mentioned.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 9:18",
              arabic: "إِنَّمَا يَعْمُرُ مَسَاجِدَ اللَّهِ مَنْ آمَنَ بِاللَّهِ وَالْيَوْمِ الْآخِرِ",
              translation: "The mosques of Allah are only to be maintained by those who believe in Allah and the Last Day.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The masjid of the Prophet (peace be upon him) in Madinah was the centre of the city — everyone knew where it was and that they were welcome. Many Muslim prayer spaces today are unmarked, hidden in basements or industrial units, with no indication to passers-by that a community gathers there. Clear signage serves dawah (it tells non-Muslims that Muslims are here and open), serves the ummah (it helps travelling Muslims find a place to pray), and serves dignity (it shows the community is not ashamed of its faith).


**How?**

1. Assess your current exterior: can a stranger walking past identify that this is a Muslim prayer space?
2. Design or commission a sign that includes: the name of the space, "Masjid" or "Islamic Centre", prayer times, and a welcoming phrase (e.g., "All are welcome").
3. Check local signage regulations and obtain any necessary permits.
4. Install the sign in a visible location — facing the main road or pedestrian path.
5. Add directional signs if the entrance is not obvious from the street.
6. Include contact information (phone number, email, or website) so people can reach out.
7. Completion indicator: a professionally presented, visible sign installed at the prayer space, confirmed readable from the nearest public path.` },
        { title: "Introduce the community to immediate non-Muslim neighbours", done: false,
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
              arabic: "وَمَنْ أَحْسَنُ قَوْلًا مِّمَّن دَعَا إِلَى اللَّهِ وَعَمِلَ صَالِحًا وَقَالَ إِنَّنِي مِنَ الْمُسْلِمِينَ",
              translation: "And who is better in speech than one who invites to Allah and does righteousness and says, \"Indeed, I am of the Muslims.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 3461",
              translation: "The Prophet (peace be upon him) said: \"Convey from me, even if it is one verse.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 410",
              translation: "Recorded in Volume 2, Book 23, Number 410: 'whoever accompanies it till burial, will get a reward equal to two Qirats... Like two huge mountains.' Also found in Muslim 2067.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) said: "Jibril kept advising me to be good to my neighbour until I thought he would make him an heir" (Bukhari & Muslim). Neighbours have rights in Islam regardless of their faith. Many misconceptions about Muslims persist simply because non-Muslim neighbours have never met the Muslims next door. A personal introduction breaks barriers, builds trust, and fulfils the Prophetic command of good neighbourliness that is the foundation of peaceful coexistence.


**How?**

1. Identify all immediate neighbours of your prayer space or community centre — homes, businesses, and institutions within a two-block radius.
2. Prepare a brief, friendly introduction: who you are, what your community does, and an invitation to reach out with any questions or concerns.
3. Visit each neighbour in person (2-3 community representatives, including someone personable and articulate) with a small gift — baked goods, dates, or a neighbourhood welcome card.
4. Listen to any concerns they have (parking, noise, traffic) and commit to addressing them.
5. Provide a contact name and phone number they can use if any issues arise.
6. Follow up with an invitation to an open day or community meal within 3 months.
7. Completion indicator: personal introductions made to at least 80% of immediate neighbours, with documented follow-up on any concerns raised.` },
        { title: "Host an open day inviting the wider community to visit your prayer space", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 16:125",
              arabic: "ادْعُ إِلَىٰ سَبِيلِ رَبِّكَ بِالْحِكْمَةِ وَالْمَوْعِظَةِ الْحَسَنَةِ ۖ وَجَادِلْهُم بِالَّتِي هِيَ أَحْسَنُ",
              translation: "Invite to the way of your Lord with wisdom and good instruction, and argue with them in a way that is best.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 3:64",
              arabic: "قُلْ يَا أَهْلَ الْكِتَابِ تَعَالَوْا إِلَىٰ كَلِمَةٍ سَوَاءٍ بَيْنَنَا وَبَيْنَكُمْ",
              translation: "Say, \"O People of the Scripture, come to a word that is equitable between us and you.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) received delegations of non-Muslims in his masjid — including the Christians of Najran, whom he allowed to pray in the masjid itself. An open day demystifies the masjid, counters media-driven fear, and fulfils the Quranic call to "invite to the way of your Lord with wisdom and beautiful preaching" (16:125). It is dawah through hospitality — one of the most powerful and least confrontational forms of outreach.


**How?**

1. Set a date at least 6 weeks in advance to allow proper planning and promotion.
2. Plan the programme: a welcome and brief introduction to the space, a short talk on Islamic values (focus on shared values: charity, family, justice), a Q&A session, and refreshments.
3. Promote through local community boards, neighbourhood Facebook groups, schools, libraries, and direct invitations to neighbours.
4. Prepare the space: ensure it is clean, clearly labelled, and accessible (consider wheelchair access, shoe racks, and a comfortable seating area).
5. Brief volunteers on etiquette: warmth, patience, honesty, and the ability to say "I don't know, but I can find out."
6. Collect feedback from attendees and follow up with anyone who expressed interest in learning more.
7. Completion indicator: an open day attended by at least 15 non-Muslim guests, with documented feedback and follow-up contacts.` },
        { title: "Participate in local civic events as a visible Muslim community", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:13",
              arabic: "يَا أَيُّهَا النَّاسُ إِنَّا خَلَقْنَاكُم مِّن ذَكَرٍ وَأُنثَىٰ وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا",
              translation: "O mankind, indeed We have created you from male and female and made you peoples and tribes that you may know one another.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 49",
              translation: "The Prophet (peace be upon him) said: \"Whoever among you sees an evil, let him change it with his hand; if he cannot, then with his tongue; if he cannot, then with his heart — and that is the weakest of faith.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) participated in the Hilf al-Fudul (Pact of the Virtuous) — a pre-Islamic civic alliance for justice — and said after Islam that he would still honour it if called upon. Muslims are not meant to be a parallel society but active participants in the common good. Civic participation demonstrates that Islamic values — justice, compassion, service — benefit everyone, and it earns the community a seat at the table where decisions affecting Muslims are made.


**How?**

1. Identify recurring civic events in your locality: town clean-ups, charity walks, food drives, remembrance days, neighbourhood council meetings.
2. Select 2-3 events per quarter that align with Islamic values and commit to attending as a recognisable group (e.g., wearing community T-shirts or carrying a banner).
3. Volunteer visibly and generously — arrive early, stay late, take on the tasks others avoid.
4. Introduce yourselves warmly: "We are from the local Islamic centre and we are here because our faith teaches us to serve our neighbours."
5. Follow up after each event: thank the organisers, share photos with the community, and note any relationships built.
6. Track participation over 6 months and assess which events had the greatest impact on community perception.
7. Completion indicator: active, visible participation in at least 6 civic events over 6 months, with documented relationships formed.` },
      ],
    },
    {
      title: "Unite the community around shared fundamentals of faith and practice",
      priority: 'high', tags: ['unity', 'ukhuwwah', 'aqidah'],
      description: "The Prophet (peace be upon him) said: 'The Muslim ummah is one body.' Sectarian division and petty disagreement weaken the community from within. This task focuses on identifying, articulating, and rallying around the non-negotiable fundamentals that all Muslims share, while establishing healthy norms for handling legitimate differences.",
      subtasks: [
        { title: "Draft a community covenant articulating shared beliefs and commitments", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:103",
              arabic: "وَاعْتَصِمُوا بِحَبْلِ اللَّهِ جَمِيعًا وَلَا تَفَرَّقُوا ۚ وَاذْكُرُوا نِعْمَتَ اللَّهِ عَلَيْكُمْ إِذْ كُنتُمْ أَعْدَاءً فَأَلَّفَ بَيْنَ قُلُوبِكُمْ",
              translation: "And hold firmly to the rope of Allah all together and do not become divided. And remember the favor of Allah upon you — when you were enemies and He brought your hearts together.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 23:52",
              arabic: "وَإِنَّ هَٰذِهِ أُمَّتُكُمْ أُمَّةً وَاحِدَةً وَأَنَا رَبُّكُمْ فَاتَّقُونِ",
              translation: "And indeed this, your religion, is one religion, and I am your Lord, so fear Me.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2564",
              translation: "The Prophet (peace be upon him) said: \"Do not envy one another, do not inflate prices, do not hate one another, do not turn your backs on one another, and do not undercut one another in trade. Be, O servants of Allah, brothers.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 485",
              translation: "Recorded in Volume 2, Book 24, Number 485: camels and sheep will tread on owners who did not pay Zakat. Sahih Muslim 2161 describes treasure being heated in Fire to cauterize the owner.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) established the Constitution of Madinah (Sahifat al-Madinah) — a written covenant that defined the rights, obligations, and shared commitments of the community. Without a written agreement on fundamentals, every disagreement becomes existential because there is no baseline to return to. A covenant provides that baseline: these are the things we all agree on, and this is how we will handle the things we disagree on.


**How?**

1. Convene a representative group (shura council or equivalent) to draft the covenant.
2. Begin with the non-negotiables: the six pillars of iman, the five pillars of Islam, the authority of the Quran and authentic Sunnah, and the obligation of mutual respect.
3. Include commitments to behaviour: no backbiting, no public disputes on fiqhi differences, and a commitment to resolve conflicts through mediation.
4. Include rights: every member's right to be heard, to access community services, and to be protected from harm.
5. Circulate the draft to the broader community for feedback over 2-3 weeks.
6. Ratify the final version at a community gathering with signatories.
7. Completion indicator: a signed community covenant displayed at the masjid and distributed to all members.` },
        { title: "Identify and publicly affirm the areas of unanimous agreement in your community", done: false,
          sources: [
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
              kind: "quran",
              ref: "Quran 6:159",
              arabic: "إِنَّ الَّذِينَ فَرَّقُوا دِينَهُمْ وَكَانُوا شِيَعًا لَّسْتَ مِنْهُمْ فِي شَيْءٍ",
              translation: "Indeed, those who have divided their religion and become sects — you are not associated with them in anything.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 7084",
              translation: "The Prophet (peace be upon him) said: \"You must follow the congregation of Muslims and their leader.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 478",
              translation: "Recorded in Volume 2, Book 23, Number 478. The Prophet instructed to teach that Zakat is 'to be taken from the wealthy among them and given to the poor.' Also in Muslim 28.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) said: "My ummah will not agree upon error" (Ibn Majah). Focusing on areas of agreement is not a compromise — it is a Prophetic strategy. When communities are consumed by their differences, they forget how much they share. Explicitly naming and celebrating the common ground — tawhid, the five pillars, the Quranic ethic of justice and mercy — reminds every member that what unites them is infinitely greater than what divides them.


**How?**

1. Survey community members with a simple questionnaire: "What do you consider the absolute essentials of our faith and community?" Collect at least 30 responses.
2. Compile the results and identify the items that appear in 90%+ of responses.
3. Verify these items against the Quran and authentic Sunnah to ensure they are genuinely fundamental, not culturally contingent.
4. Present the findings at a community gathering: "Here is what we all agree on."
5. Display the list prominently — on a poster at the masjid, in the community newsletter, and on the website.
6. Reference this list whenever a dispute arises: "Remember, we agree on all of this. Our disagreement is on a secondary matter."
7. Completion indicator: a published, community-endorsed list of shared fundamentals, referenced in at least one real dispute resolution.` },
        { title: "Establish ground rules for handling legitimate differences of opinion", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 51:8",
              arabic: "إِنَّكُمْ لَفِي قَوْلٍ مُّخْتَلِفٍ",
              translation: "you differ in what you say.",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              rationale: "diversity of opinion is acknowledged as a reality of human existence; the obligation is to manage it with adab and knowledge, not to suppress it.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 7352",
              translation: "The Prophet (peace be upon him) said: \"When a judge gives a decision, having tried his best to decide correctly, and is right, there are two rewards for him; and if he gave a judgment after having tried his best (to arrive at a correct decision) but erred, there is one reward for him.\"",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "even erring scholars exercising sincere ijtihad earn reward — establishing that legitimate scholarly disagreement is a mercy, not a defect.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 629",
              translation: "Recorded in Volume 1, Book 11, Number 629 as one of the seven shaded: 'a man who gives charitable gifts so secretly that his left hand does not know what his right hand has given.' Also in Muslim 2248.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Companions of the Prophet (peace be upon him) disagreed on numerous fiqhi matters — yet they prayed behind one another, married into each other's families, and maintained brotherhood. The problem is not disagreement but how disagreement is handled. Without ground rules, minor fiqhi differences (e.g., hand placement in prayer, moon-sighting methodology) become community-splitting conflicts. Ground rules preserve unity by making disagreement normal and manageable.


**How?**

1. Acknowledge publicly that legitimate ikhtilaf (scholarly disagreement) has existed since the time of the Companions — it is not a defect but a mercy.
2. Draft a set of ground rules: (a) all valid scholarly opinions will be respected, (b) no one will be shamed for following a different madhab, (c) disputes will not be conducted in public forums or social media, (d) unresolved disagreements will be referred to a qualified scholar or mediation panel.
3. Present the ground rules to the shura council and key community figures for endorsement.
4. Announce and distribute the ground rules at a community gathering.
5. Appoint a "unity liaison" — someone respected by all groups — who can mediate when tensions arise around differences.
6. Review and reinforce the ground rules at least twice per year.
7. Completion indicator: published ground rules endorsed by the shura council and at least one successful mediation of a fiqhi disagreement using the rules.` },
        { title: "Organise a joint educational programme on the foundations of Islam", done: false,
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
              kind: "hadith",
              ref: "Sahih al-Bukhari 1586",
              translation: "Narrated Yazid bin Ruman from `Urwa:`Aisha said that the Prophet (ﷺ) said to her, \"O Aisha! Were your nation not close to the Pre-Islamic Period of Ignorance, I would have had the Ka`ba demolished and would have included in it the portion which had been left, and would have made it at a level with the ground and would have made two doors for it, one towards the east and the other towards the west, and then by doing this it would have been built on the foundations laid by Abraham.\" That was what urged Ibn-Az-Zubair to demolish the Ka`ba. Yazid said, \"I saw Ibn-Az-Zubair when he demolished and rebuilt the Ka`ba and included in it a portion of Al-Hijr (the unroofed portion of Ka`ba which is at present in the form of a compound towards the northwest of the Ka`ba). I saw the original foundations of Abraham which were of stones resembling the humps of camels.\" So Jarir asked Yazid, \"Where was the place of those stones?\" Yazid said, \"I will just now show it to you.\" So Jarir accompanied Yazid and entered Al-Hijr, and Yazid pointed to a place and said, \"Here it is.\" Jarir said, \"It appeared to me about six cubits from Al-Hijr or so",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1585",
              translation: "Narrated `Aisha:Allah's Messenger (ﷺ) said to me, \"Were your people not close to the Pre-Islamic period of ignorance, I would have demolished the Ka`ba and would have rebuilt it on its original foundations laid by Abraham (for Quraish had curtailed its building), and I would have built a back door (too)",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1583",
              translation: "Narrated `Aisha:(the wife of the Prophet) that Allah's Messenger (ﷺ) said to her, \"Do you know that when your people (Quraish) rebuilt the Ka`ba, they decreased it from its original foundation laid by Abraham?\" I said, \"O Allah's Messenger (ﷺ)! Why don't you rebuild it on its original foundation laid by Abraham?\" He replied, \"Were it not for the fact that your people are close to the Pre-Islamic Period of ignorance (i.e. they have recently become Muslims) I would have done so.\" The sub-narrator, `Abdullah (bin `Umar ) stated: `Aisha 'must have heard this from Allah's Messenger (ﷺ) for in my opinion Allah's Messenger (ﷺ) had not placed his hand over the two corners of the Ka`ba opposite Al-Hijr only because the Ka`ba was not rebuilt on its original foundations laid by Abraham",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) taught the foundations of the religion to every new Muslim — the hadith of Jibril (Muslim) outlines iman, islam, and ihsan as the three dimensions every believer must understand. When community members lack a shared educational foundation, disagreements multiply because people argue from ignorance rather than knowledge. A joint programme creates a common language and understanding that binds the community together across ethnic, cultural, and madhab lines.


**How?**

1. Design a 6-8 week programme covering: the hadith of Jibril (iman, islam, ihsan), the Quranic vision of community (Surah Al-Hujurat), the Prophetic model of brotherhood, and the etiquettes of disagreement.
2. Select a teacher or facilitator respected across the community's subgroups — if none exists locally, use a recorded series from a widely accepted scholar.
3. Schedule sessions at a time that maximises attendance (e.g., after Isha prayer on a weeknight).
4. Promote as a "unity programme" open to all — emphasise that this is about what we share, not about adjudicating differences.
5. Include discussion and Q&A to make it interactive, not just a lecture.
6. Provide a simple syllabus and reading list so participants can review between sessions.
7. Completion indicator: a completed 6-8 week programme with at least 15 regular attendees and a post-programme survey showing increased sense of shared identity.` },
        { title: "Address one active source of division in the community with a mediation process", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:9",
              arabic: "وَإِن طَائِفَتَانِ مِنَ الْمُؤْمِنِينَ اقْتَتَلُوا فَأَصْلِحُوا بَيْنَهُمَا",
              translation: "And if two factions among the believers should fight, then make settlement between the two.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 49:10",
              arabic: "إِنَّمَا الْمُؤْمِنُونَ إِخْوَةٌ فَأَصْلِحُوا بَيْنَ أَخَوَيْكُمْ",
              translation: "The believers are but brothers, so make settlement between your brothers.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Allah commands: "If two groups of believers fight, make peace between them" (Quran 49:9). Every community has at least one simmering conflict — a leadership dispute, a cultural tension, a theological disagreement. Ignoring it does not make it disappear; it festers and eventually drives people away. Addressing it head-on with a structured mediation process honours the Quranic command and demonstrates that the community's commitment to unity is not just theoretical.


**How?**

1. Identify the most significant active source of division in your community — ask the shura council and trusted members: "What is the one issue that, if resolved, would most strengthen our unity?"
2. Name the issue clearly and honestly — denial and euphemism only prolong the problem.
3. Invite the parties involved to a structured mediation session with a neutral, respected mediator (ideally a qualified scholar or trained mediator).
4. Set ground rules for the session: respectful language, active listening, focus on resolution not blame, and confidentiality.
5. Work toward a written agreement: what each party commits to going forward.
6. Follow up at 30 and 90 days to confirm the agreement is being honoured.
7. Completion indicator: a completed mediation process with a signed agreement and a 90-day follow-up confirming adherence.` },
      ],
    },
    {
      title: 'Attend congregational prayers consistently — prioritise Fajr, Isha, and Jumu\'ah',
      priority: 'urgent', tags: ['salah', 'jama\'ah'],
      description: 'Congregational prayer is the heartbeat of Muslim community life. The Prophet (peace be upon him) said the prayer in congregation is twenty-seven times superior to the prayer offered alone. Establishing consistency in jama\'ah — especially Fajr, Isha, and Jumu\'ah — anchors your presence in the community and fulfils one of the most emphasised communal obligations in Islam.',
      subtasks: [
        { title: 'Identify the nearest masjid and map its prayer times for all five daily prayers', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 30:18",
              arabic: "**Translation:** And His are all the praises and thanks in the heavens and the earth; and (glorify Him) in the afternoon (i.e. offer ‘Asr prayer) and when you come up to the time, when the day begins to decline (i.e. offer Zuhr prayer). (Ibn ‘Abbâs said: \"These are the five compulsory congregational prayers mentioned in the Qur’ân).\" [Tafsir At-Tabari]",
              translation: "And His are all the praises and thanks in the heavens and the earth; and (glorify Him) in the afternoon (i.e. offer ‘Asr prayer) and when you come up to the time, when the day begins to decline (i.e. offer Zuhr prayer). (Ibn ‘Abbâs said: \"These are the five compulsory congregational prayers mentioned in the Qur’ân).\" [Tafsir At-Tabari]",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 40:55",
              arabic: "**Translation:** So be patient (O Muhammad صلى الله عليه وسلم). Verily, the Promise of Allâh is true, and ask forgiveness for your fault and glorify the praises of your Lord in the ‘Ashî (i.e. the time period after the midnoon till sunset) and in the Ibkâr (i.e. the time period from early morning or sunrise till before midnoon) [it is said that, that means the five compulsory congregational Salât (prayers) or the ‘Asr and Fajr prayers].",
              translation: "So be patient (O Muhammad صلى الله عليه وسلم). Verily, the Promise of Allâh is true, and ask forgiveness for your fault and glorify the praises of your Lord in the ‘Ashî (i.e. the time period after the midnoon till sunset) and in the Ibkâr (i.e. the time period from early morning or sunrise till before midnoon) [it is said that, that means the five compulsory congregational Salât (prayers) or the ‘Asr and Fajr prayers].",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 2:238",
              arabic: "**Translation:** Guard strictly (five obligatory) As-Salawât (the prayers) especially the middle Salât (i.e. the best prayer - ‘Asr ). And stand before Allâh with obedience [and do not speak to others during the Salât (prayers)].",
              translation: "Guard strictly (five obligatory) As-Salawât (the prayers) especially the middle Salât (i.e. the best prayer - ‘Asr ). And stand before Allâh with obedience [and do not speak to others during the Salât (prayers)].",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The first step to consistent jama'ah attendance is removing logistical barriers. Many Muslims skip congregational prayers simply because they have not planned their day around salah times. The Prophet (peace be upon him) said, "If people knew what was in the Adhan and the first row, and they had no other way than drawing lots, they would draw lots" (Bukhari). Mapping prayer times converts good intention into concrete scheduling — you cannot attend what you have not planned for.


**How?**

1. Search for mosques within a reasonable driving or walking distance from your home and workplace.
2. Visit each mosque's website or call them to confirm their posted prayer times, noting any seasonal variations.
3. Download a prayer-time app (e.g., Aladhan or Muslim Pro) and set it to your masjid's calculation method.
4. Create a simple weekly schedule showing which mosque you will attend for each prayer, factoring in work, commute, and family responsibilities.
5. Set phone alarms 15 minutes before each prayer you plan to attend in jama'ah.
6. Post the schedule somewhere visible — your desk, fridge, or phone lock screen.
7. Completion indicator: a written weekly prayer schedule specifying which prayers you will attend at the masjid, with alarms set.` },
        { title: 'Establish a Fajr jama\'ah routine — sleep early and arrange a wake-up system', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:238",
              arabic: "حَافِظُوا عَلَى الصَّلَوَاتِ وَالصَّلَاةِ الْوُسْطَىٰ وَقُومُوا لِلَّهِ قَانِتِينَ",
              translation: "Maintain with care the prayers and the middle prayer and stand before Allah, devoutly obedient.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 62:9",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا نُودِيَ لِلصَّلَاةِ مِن يَوْمِ الْجُمُعَةِ فَاسْعَوْا إِلَىٰ ذِكْرِ اللَّهِ",
              translation: "O you who have believed, when the call to prayer is made on Friday, then proceed to the remembrance of Allah.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 615",
              translation: "The Prophet (peace be upon him) said: \"If the people knew the reward of the Adhan and the first row (in prayer), and they found no other way to get that except by drawing lots, they would draw lots for it.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Fajr in jama'ah is the prayer the hypocrites find most burdensome (Bukhari and Muslim). Consistent Fajr attendance is therefore one of the clearest signs of sincere faith and community commitment. It also sets the spiritual tone for the entire day. Without restructuring your sleep, Fajr attendance becomes willpower-dependent — and willpower alone fails over time. A systematic approach honours the obligation rather than leaving it to chance.


**How?**

1. Calculate the sleep time you need (typically 7-8 hours) and count backward from Fajr adhan to determine your latest bedtime.
2. Set a firm "screens off" alarm 30 minutes before that bedtime — blue light and scrolling are the top enemies of early rising.
3. Prepare for Fajr the night before: lay out clothes, fill a water bottle, and set your alarm across the room so you must physically get up.
4. Arrange an accountability partner — a family member, friend, or masjid buddy who will call or message you at Fajr.
5. For the first two weeks, do not negotiate with yourself after the alarm rings. Get up, make wudu, and go — the habit forms through repetition, not motivation.
6. Track your Fajr jama'ah attendance daily on a simple checklist or habit-tracking app.
7. Completion indicator: 14 consecutive days of Fajr prayer at the masjid or in jama'ah at home with family.` },
        { title: 'Attend Jumu\'ah khutbah from the beginning — arrive early and sit close', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 17:78",
              arabic: "أَقِمِ الصَّلَاةَ لِدُلُوكِ الشَّمْسِ إِلَىٰ غَسَقِ اللَّيْلِ وَقُرْآنَ الْفَجْرِ ۖ إِنَّ قُرْآنَ الْفَجْرِ كَانَ مَشْهُودًا",
              translation: "So perform the regular prayers in the period from the time the sun is past its zenith till the darkness of the night, and [recite] the Quran at dawn — dawn recitation is always witnessed.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 62:9",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا نُودِيَ لِلصَّلَاةِ مِن يَوْمِ الْجُمُعَةِ فَاسْعَوْا إِلَىٰ ذِكْرِ اللَّهِ وَذَرُوا الْبَيْعَ ۚ ذَٰلِكُمْ خَيْرٌ لَّكُمْ إِن كُنتُمْ تَعْلَمُونَ",
              translation: "Believers! When the call to prayer is made on the day of congregation, hurry towards the reminder of God and leave off your trading — that is better for you, if only you knew.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 62:11",
              arabic: "وَإِذَا رَأَوْا تِجَارَةً أَوْ لَهْوًا انفَضُّوا إِلَيْهَا وَتَرَكُوكَ قَائِمًا ۚ قُلْ مَا عِندَ اللَّهِ خَيْرٌ مِّنَ اللَّهْوِ وَمِنَ التِّجَارَةِ ۚ وَاللَّهُ خَيْرُ الرَّازِقِينَ",
              translation: "Yet they scatter towards trade or entertainment whenever they observe it, and leave you [Prophet] standing there. Say, ‘God’s gift is better than any entertainment or trade: God is the best provider.’\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 929",
              translation: "The Prophet (peace be upon him) said: \"When it is a Friday, the angels stand at the gate of the mosque and keep on writing the names of the persons coming to the mosque in succession according to their arrivals. The example of the one who enters the mosque in the earliest hour is that of one offering a camel in sacrifice. The one coming next is like one offering a cow and then a ram and then a chicken and then an egg respectively. When the Imam comes out, the angels fold up their registers and listen to the reminder.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Jumu'ah is the weekly gathering of the Muslim community and carries obligations beyond the prayer itself. The Prophet (peace be upon him) said, "Whoever takes a bath on Friday, goes early to the masjid, sits close to the imam, and listens attentively, will have the reward of a year of fasting and praying for every step he takes" (Abu Dawud, Tirmidhi). Arriving early transforms Jumu'ah from a rushed ritual into the communal anchor it was designed to be — a time for remembrance, learning, and brotherhood.


**How?**

1. Block your Friday calendar: set a recurring appointment from at least 30 minutes before the khutbah starts until after the prayer ends.
2. Perform ghusl (full bath) on Friday morning as a sunnah, and wear your best clean clothes.
3. Leave early enough to arrive at the masjid before the khutbah begins — not during it.
4. Sit as close to the imam as possible without stepping over people.
5. Do not speak, check your phone, or fidget during the khutbah — the Prophet (peace be upon him) said even telling someone to be quiet during the khutbah voids your reward (Bukhari).
6. After salah, greet at least three people you do not normally speak to — this builds the relational fabric of the community.
7. Completion indicator: four consecutive Fridays arriving before the khutbah begins and sitting in the front rows.` },
        { title: 'Introduce yourself to the imam and at least five regular attendees at your masjid', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 63",
              translation: "Narrated Anas bin Malik:While we were sitting with the Prophet (ﷺ) in the mosque, a man came riding on a camel. He made his camel kneel down in the mosque, tied its foreleg and then said: \"Who amongst you is Muhammad?\" At that time the Prophet (ﷺ) was sitting amongst us (his companions) leaning on his arm. We replied, \"This white man reclining on his arm.\" The man then addressed him, \"O Son of `Abdul Muttalib.\" The Prophet (ﷺ) said, \"I am here to answer your questions.\" The man said to the Prophet, \"I want to ask you something and will be hard in questioning. So do not get angry.\" The Prophet (ﷺ) said, \"Ask whatever you want.\" The man said, \"I ask you by your Lord, and the Lord of those who were before you, has Allah sent you as an Apostle to all the mankind?\" The Prophet (ﷺ) replied, \"By Allah, yes.\" The man further said, \"I ask you by Allah. Has Allah ordered you to offer five prayers in a day and night (24 hours)? He replied, \"By Allah, Yes.\" The man further said, \"I ask you by Allah! Has Allah ordered you to observe fasts during this month of the year (i.e. Ramadan)?\" He replied, \"By Allah, Yes.\" The man further said, \"I ask you by Allah. Has Allah ordered you to take Zakat (obligatory charity) from our rich people and distribute it amongst our poor people?\" The Prophet (ﷺ) replied, \"By Allah, yes.\" Thereupon that man said, \"I have believed in all that with which you have been sent, and I have been sent by my people as a messenger, and I am Dimam bin Tha`laba from the brothers of Bani Sa`d bin Bakr",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 916",
              translation: "Narrated Az-Zuhri:I heard As-Saib bin Yazid, saying, \"In the lifetime of Allah's Messenger (ﷺ), and Abu Bakr and `Umar, the Adhan for the Jumua prayer used to be pronounced after the Imam had taken his seat on the pulpit. But when the people increased in number during the caliphate of `Uthman, he introduced a third Adhan (on Friday for the Jumua prayer) and it was pronounced at Az-Zaura' and that new state of affairs remained so in the succeeding years",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Community is built through relationships, not mere co-presence. Many Muslims pray shoulder-to-shoulder for years without knowing each other's names, which contradicts the spirit of ukhuwwah (brotherhood) that the Prophet (peace be upon him) established between the Muhajirun and Ansar. Introducing yourself to the imam and regular attendees transforms anonymous attendance into genuine belonging — and belonging is what makes community obligations feel like blessings rather than burdens.


**How?**

1. After any salah, approach the imam, introduce yourself by name, and mention that you are a regular (or new) attendee.
2. Ask the imam about any community needs or upcoming programmes — this shows you are present as a contributor, not just a consumer.
3. Over the next week, introduce yourself to at least five people you see regularly at the masjid.
4. Exchange phone numbers or join the masjid's WhatsApp or Telegram group if one exists.
5. Learn and remember their names — the Prophet (peace be upon him) was known for remembering people's names and calling them by it.
6. Follow up with a simple message: "It was good to meet you at [masjid name]. Looking forward to seeing you at the next prayer."
7. Completion indicator: you know the imam and at least five regular attendees by name, and they know yours.` },
        { title: 'Commit to praying Isha in jama\'ah at least four nights per week', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 76:26",
              arabic: "وَمِنَ اللَّيْلِ فَاسْجُدْ لَهُ وَسَبِّحْهُ لَيْلًا طَوِيلًا",
              translation: "bow down before Him, and glorify Him at length by night.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 17:78",
              arabic: "أَقِمِ الصَّلَاةَ لِدُلُوكِ الشَّمْسِ إِلَىٰ غَسَقِ اللَّيْلِ وَقُرْآنَ الْفَجْرِ ۖ إِنَّ قُرْآنَ الْفَجْرِ كَانَ مَشْهُودًا",
              translation: "So perform the regular prayers in the period from the time the sun is past its zenith till the darkness of the night, and [recite] the Quran at dawn — dawn recitation is always witnessed.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 30:17",
              arabic: "فَسُبْحَانَ اللَّهِ حِينَ تُمْسُونَ وَحِينَ تُصْبِحُونَ",
              translation: "So celebrate God’s glory in the evening, in the morning.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 649",
              translation: "The Prophet (peace be upon him) said: \"If the people knew the reward for pronouncing the adhan and for standing in the first row (in congregational prayers), and found no other way to get it except by drawing lots, they would draw lots for it. And if they knew the reward of the Zuhr prayer (at its early time), they would race for it. And if they knew the reward of Isha and Fajr prayers in congregation, they would come to them even if they had to crawl.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) said, "Whoever prays Isha in jama'ah, it is as if he prayed half the night; and whoever prays Fajr in jama'ah, it is as if he prayed the entire night" (Muslim). Isha in congregation is often skipped due to fatigue, evening routines, or the assumption that Fajr is "the important one." But consistent Isha attendance ensures your presence in the community spans the full day and connects you with the night-time attendees who are often the most dedicated core of any masjid.


**How?**

1. Check your masjid's Isha time and plan your evening schedule around it — dinner, family time, and any commitments should wrap up before Isha.
2. If Isha is very late in summer months, check if your masjid offers an earlier iqamah time or find one that does.
3. Bring a family member or friend with you — companionship makes evening attendance sustainable.
4. On the nights you cannot attend the masjid, pray Isha in jama'ah at home with your household.
5. Set a minimum target of four nights per week at the masjid, with flexibility for the remaining three.
6. Track your attendance weekly and adjust your evening routine if you consistently fall short.
7. Completion indicator: four weeks of averaging at least four Isha prayers in jama'ah per week.` },
      ],
    },
    {
      title: 'Resolve disputes and maintain brotherhood — no estrangement beyond three days',
      priority: 'urgent', tags: ['ukhuwwah', 'sulh'],
      description: 'The Prophet (peace be upon him) said, "It is not permissible for a Muslim to forsake his brother for more than three days" (Bukhari and Muslim). Unresolved conflicts tear the communal fabric and nullify the spiritual benefits of congregational life. This task establishes the discipline of rapid reconciliation as a non-negotiable community obligation.',
      subtasks: [
        { title: 'Audit your current relationships — identify anyone you have not spoken to due to a dispute', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:10",
              arabic: "إِنَّمَا الْمُؤْمِنُونَ إِخْوَةٌ فَأَصْلِحُوا بَيْنَ أَخَوَيْكُمْ",
              translation: "The believers are but brothers, so make settlement between your brothers.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6077",
              translation: "The Prophet (peace be upon him) said: \"It is not permissible for a Muslim to forsake his brother for more than three days. They meet, and each turns away from the other. The better of the two is the one who gives the greeting of salam first.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) said, "The gates of Paradise are opened on Monday and Thursday, and every servant who does not associate anything with Allah is forgiven — except a man between whom and his brother there is a grudge. It is said: Wait for these two until they reconcile" (Muslim). Unresolved estrangement literally blocks your forgiveness. This audit forces you to confront the relationships you may have been avoiding, because you cannot reconcile what you have not honestly acknowledged.


**How?**

1. Sit quietly and make a mental inventory of every Muslim you interact with regularly: family, neighbours, masjid community, colleagues, and friends.
2. For each person, ask: "Is there unresolved tension, avoidance, or a past dispute between us?"
3. Write down the names of anyone you have been avoiding, not greeting, or feel resentment toward.
4. Next to each name, note the cause of the estrangement — even if it feels minor or one-sided.
5. Note how long the estrangement has lasted. If it exceeds three days, it is already beyond the permitted limit.
6. Rank the list by urgency: longest estrangements and closest relationships first.
7. Completion indicator: a written list of all estranged relationships with causes and durations, ready for reconciliation planning.` },
        { title: 'Initiate salam with the person you have the most tension with', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 41:34",
              arabic: "ادْفَعْ بِالَّتِي هِيَ أَحْسَنُ فَإِذَا الَّذِي بَيْنَكَ وَبَيْنَهُ عَدَاوَةٌ كَأَنَّهُ وَلِيٌّ حَمِيمٌ",
              translation: "Repel evil by that which is better; and thereupon the one between you and him is enmity will become as though he was a devoted friend.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6077",
              translation: "The Prophet (peace be upon him) said: \"It is not permissible for a Muslim to forsake his brother for more than three days.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 54",
              translation: "The Prophet (peace be upon him) said: \"You will not enter Paradise until you believe, and you will not believe until you love one another. Shall I tell you of something which, if you do it, you will love one another? Spread the salam among yourselves.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) said, "The better of the two is the one who initiates the salam" (Bukhari). Initiating the greeting is an act of courage and humility that breaks the cycle of avoidance. It does not require you to concede that you were wrong — it simply fulfils your obligation to maintain the bond of Islam. The salam itself is a du'a of peace, and offering it to someone you have tension with transforms a social nicety into a genuine act of worship.


**How?**

1. Choose the person from your audit list with whom you have the most tension or the longest estrangement.
2. Plan a natural encounter: attend the same prayer time, visit a gathering they attend, or simply walk up to them at the masjid.
3. Greet them with a warm, genuine "Assalamu alaykum" and, if appropriate, a handshake or embrace.
4. Do not immediately bring up the dispute — let the greeting stand on its own as a reopening of the relationship.
5. If they respond coldly, do not react. You have fulfilled your obligation by initiating. Continue greeting them at every encounter.
6. If they respond warmly, take the opportunity to suggest a private conversation to clear the air.
7. Completion indicator: you have personally greeted the identified individual with salam, regardless of their response.` },
        { title: 'Have a private, honest conversation to address the root cause of the dispute', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 20:62",
              arabic: "فَتَنَازَعُوا أَمْرَهُم بَيْنَهُمْ وَأَسَرُّوا النَّجْوَىٰ",
              translation: "So they discussed their plan among themselves, talking secretly.",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              rationale: "a contrast — private counsel used for deception, reminding believers that private conversation must serve righteousness, not wrongdoing",
            },
            {
              kind: "quran",
              ref: "Quran 58:9",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا تَنَاجَيْتُمْ فَلَا تَتَنَاجَوْا بِالْإِثْمِ وَالْعُدْوَانِ وَمَعْصِيَتِ الرَّسُولِ وَتَنَاجَوْا بِالْبِرِّ وَالتَّقْوَىٰ ۖ وَاتَّقُوا اللَّهَ الَّذِي إِلَيْهِ تُحْشَرُونَ",
              translation: "You who believe, when you converse in secret, do not do so in a way that is sinful, hostile, and disobedient to the Messenger, but in a way that is good and mindful [of God]. Be mindful of God, to whom you will all be gathered.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2693",
              translation: "The Prophet (peace be upon him) went to Quba' to make peace among a group of people (who had been fighting), and when he had done that, he returned.",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "the Prophetic practice of going directly to those in conflict to address the root cause privately and make peace",
            },
          ],
          description: `**Why?**

Greeting alone does not resolve the underlying issue — it opens the door. The Quran commands, "If two parties among the believers fall into a dispute, make peace between them" (49:9). Genuine reconciliation requires honest dialogue about what went wrong, without blame-shifting or score-keeping. A private conversation protects both parties' dignity and creates space for vulnerability, which is the only path to real restoration.


**How?**

1. Invite the person to meet privately — a quiet corner of the masjid, a coffee shop, or a walk. Avoid public settings where either party might feel exposed.
2. Begin with bismillah and express your intention: "I value our relationship and want to resolve what happened between us."
3. Use "I" statements: "I felt hurt when..." rather than "You did this..." — this reduces defensiveness.
4. Listen fully when they speak. Do not interrupt or mentally prepare your rebuttal while they are talking.
5. Acknowledge your own contribution to the problem, even if it was small. The Prophet (peace be upon him) taught that humility in conflict is a sign of strength, not weakness.
6. Agree on a path forward: what will each of you do differently? Is there a specific behaviour to stop or start?
7. Completion indicator: a face-to-face private conversation has taken place, both parties have spoken and been heard, and a forward path is agreed upon.` },
        { title: 'Establish a personal rule: never let a disagreement go unaddressed past three days', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:10",
              arabic: "إِنَّمَا الْمُؤْمِنُونَ إِخْوَةٌ فَأَصْلِحُوا بَيْنَ أَخَوَيْكُمْ وَاتَّقُوا اللَّهَ لَعَلَّكُمْ تُرْحَمُونَ",
              translation: "The believers are but brothers, so make settlement between your brothers. And fear Allah that you may receive mercy.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 4:114",
              arabic: "لَا خَيْرَ فِي كَثِيرٍ مِنْ نَجْوَاهُمْ إِلَّا مَنْ أَمَرَ بِصَدَقَةٍ أَوْ مَعْرُوفٍ أَوْ إِصْلَاحٍ بَيْنَ النَّاسِ",
              translation: "There is no good in most of their secret talk except for those who enjoin charity or kindness or reconciliation between people.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6077",
              translation: "The Prophet (peace be upon him) said: \"It is not permissible for a Muslim to forsake his brother for more than three days. Each of them turning away when they meet. The better of them is the one who gives the greeting of salam first.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The three-day limit is not a suggestion — it is a Prophetic boundary. After three days, estrangement becomes sinful (Bukhari and Muslim). Establishing this as a personal, non-negotiable rule transforms conflict resolution from a reactive scramble into a proactive discipline. It also signals to your community that you are someone who prioritises unity over ego, which builds trust and encourages others to adopt the same standard.


**How?**

1. Write down your personal commitment: "I will never allow a dispute with a fellow Muslim to go unaddressed for more than three days."
2. Set a practical trigger: if you notice you are avoiding someone or feeling resentment, start the three-day clock immediately.
3. On day one, make du'a for the person and for resolution. Soften your heart before approaching them.
4. On day two, if the issue has not resolved naturally, reach out with a message or phone call: "I sense something is off between us. Can we talk?"
5. On day three, if they have not responded, show up in person with salam. Your obligation is to initiate — the outcome is with Allah.
6. Record these instances in a private journal to track how often disputes arise and how quickly you resolve them. Patterns reveal growth areas.
7. Completion indicator: a written personal rule, a three-day trigger system, and at least one real dispute resolved within the three-day window.` },
        { title: 'Mediate or facilitate reconciliation between two people in your community who are estranged', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:35",
              arabic: "وَإِنْ خِفْتُمْ شِقَاقَ بَيْنِهِمَا فَابْعَثُوا حَكَمًا مِّنْ أَهْلِهِ وَحَكَمًا مِّنْ أَهْلِهَا إِن يُرِيدَا إِصْلَاحًا يُوَفِّقِ اللَّهُ بَيْنَهُمَا ۗ إِنَّ اللَّهَ كَانَ عَلِيمًا خَبِيرًا",
              translation: "If you [believers] fear that a couple may break up, appoint one arbiter from his family and one from hers. Then, if the couple want to put things right, God will bring about a reconciliation between them: He is all knowing, all aware.",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              rationale: "the Quranic principle of appointing mediators to resolve conflict — applied here beyond marital disputes to any community estrangement",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2605a",
              translation: "The Prophet (peace be upon him) said: \"A person is not a liar who tries to bring about reconciliation among people, and conveys good words or says something good.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Quran says, "There is no good in most of their secret counsels except the one who enjoins charity, or goodness, or reconciliation between people. And whoever does that seeking the pleasure of Allah, We will grant him a great reward" (4:114). Reconciling others is one of the most rewarded acts in Islam — the Prophet (peace be upon him) even permitted strategic softening of the truth to bring two people together (Bukhari and Muslim). By mediating, you extend the discipline of reconciliation beyond yourself into the broader community fabric.


**How?**

1. Identify two people in your community who are visibly estranged — they avoid each other, do not greet, or have had a known falling out.
2. Speak to each person privately. Listen to their side without taking sides. Your role is facilitator, not judge.
3. Gently remind each party of the Prophetic prohibition on estrangement and the rewards of reconciliation.
4. If both are willing, arrange a meeting in a neutral, private setting. Offer to be present as a mediator.
5. During the meeting, ensure both speak and both listen. Guide the conversation toward acknowledgement and forward commitment, not rehashing grievances.
6. If one party is not willing, continue making du'a and gently encouraging without pressuring — your effort is recorded even if the outcome is not immediate.
7. Completion indicator: you have actively facilitated a reconciliation attempt between two estranged community members, regardless of the final outcome.` },
      ],
    },
    {
      title: 'Visit the sick in your community — fulfil the rights of Muslim upon Muslim',
      priority: 'urgent', tags: ['visiting-sick', 'huquq'],
      description: 'The Prophet (peace be upon him) listed visiting the sick as one of the five rights every Muslim has over another (Bukhari). Visiting the sick is not merely a kind gesture — it is an obligation that maintains the social safety net of the ummah and reminds both the visitor and the visited of Allah\'s power over health and life.',
      subtasks: [
        { title: 'Ask your imam or community leaders who in the community is currently ill or hospitalised', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 9:71",
              arabic: "وَالْمُؤْمِنُونَ وَالْمُؤْمِنَاتُ بَعْضُهُمْ أَوْلِيَاءُ بَعْضٍ ۚ يَأْمُرُونَ بِالْمَعْرُوفِ وَيَنْهَوْنَ عَنِ الْمُنكَرِ وَيُقِيمُونَ الصَّلَاةَ وَيُؤْتُونَ الزَّكَاةَ وَيُطِيعُونَ اللَّهَ وَرَسُولَهُ ۚ أُولَٰئِكَ سَيَرْحَمُهُمُ اللَّهُ ۗ إِنَّ اللَّهَ عَزِيزٌ حَكِيمٌ",
              translation: "The believers, both men and women, support each other; they order what is right and forbid what is wrong; they keep up the prayer and pay the prescribed alms; they obey God and His Messenger. God will give His mercy to such people: God is almighty and wise.",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              rationale: "mutual support among believers encompasses knowing and responding to each other's needs, including illness",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 63",
              translation: "Narrated Anas bin Malik:While we were sitting with the Prophet (ﷺ) in the mosque, a man came riding on a camel. He made his camel kneel down in the mosque, tied its foreleg and then said: \"Who amongst you is Muhammad?\" At that time the Prophet (ﷺ) was sitting amongst us (his companions) leaning on his arm. We replied, \"This white man reclining on his arm.\" The man then addressed him, \"O Son of `Abdul Muttalib.\" The Prophet (ﷺ) said, \"I am here to answer your questions.\" The man said to the Prophet, \"I want to ask you something and will be hard in questioning. So do not get angry.\" The Prophet (ﷺ) said, \"Ask whatever you want.\" The man said, \"I ask you by your Lord, and the Lord of those who were before you, has Allah sent you as an Apostle to all the mankind?\" The Prophet (ﷺ) replied, \"By Allah, yes.\" The man further said, \"I ask you by Allah. Has Allah ordered you to offer five prayers in a day and night (24 hours)? He replied, \"By Allah, Yes.\" The man further said, \"I ask you by Allah! Has Allah ordered you to observe fasts during this month of the year (i.e. Ramadan)?\" He replied, \"By Allah, Yes.\" The man further said, \"I ask you by Allah. Has Allah ordered you to take Zakat (obligatory charity) from our rich people and distribute it amongst our poor people?\" The Prophet (ﷺ) replied, \"By Allah, yes.\" Thereupon that man said, \"I have believed in all that with which you have been sent, and I have been sent by my people as a messenger, and I am Dimam bin Tha`laba from the brothers of Bani Sa`d bin Bakr",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

You cannot fulfil the right of visiting the sick if you do not know who is sick. In many communities, illness goes unnoticed because people are isolated or too proud to ask for help. The imam and community leaders serve as the information hub of the congregation — they often know who is ill, hospitalised, or homebound. Asking proactively signals that you take this communal obligation seriously and positions you as someone the community can rely on.


**How?**

1. After any congregational prayer, approach your imam or a community elder and ask directly: "Is anyone in our community currently ill, hospitalised, or in need of a visit?"
2. If your masjid has a welfare or pastoral care committee, introduce yourself and ask to be informed of sick community members.
3. Join the masjid's communication channels (WhatsApp group, email list, bulletin board) where illness announcements are often shared.
4. Ask your immediate circle — neighbours, friends, and family — if they know of anyone who is unwell.
5. Note down names, conditions (if shared), and visiting preferences (hospital, home, preferred times).
6. If your masjid does not have a system for tracking sick members, suggest one to the imam — even a simple shared list.
7. Completion indicator: a list of at least two community members who are currently ill or hospitalised, with information on how to visit them.` },
        { title: 'Visit at least one sick person this week — bring food, du\'a, and genuine presence', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:155-156",
              arabic: "وَلَنَبْلُوَنَّكُم بِشَيْءٍ مِّنَ الْخَوْفِ وَالْجُوعِ وَنَقْصٍ مِّنَ الْأَمْوَالِ وَالْأَنفُسِ وَالثَّمَرَاتِ وَبَشِّرِ الصَّابِرِينَ",
              translation: "And We will surely test you with something of fear and hunger and a loss of wealth and lives and fruits, but give good tidings to the patient.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2568",
              translation: "The Prophet (peace be upon him) said: \"The rights of one Muslim over another are five: returning the greeting of salam, visiting the sick, following the funeral procession, accepting invitations, and saying yarhamuk Allah (may Allah have mercy on you) to one who sneezes.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2569",
              translation: "The Prophet (peace be upon him) said: \"When you visit a sick person, say: 'O Allah, Lord of mankind, remove the affliction. Cure him, for You are the Healer. There is no cure except Your cure, a cure that leaves no illness behind.'\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) said, "When a Muslim visits his sick brother, he is harvesting the fruits of Paradise until he returns" (Muslim). The visit itself is worship. But the manner of the visit matters: bringing food relieves practical burden, du'a connects the sick person to divine mercy, and genuine presence — simply sitting and listening — combats the loneliness that often accompanies illness. A perfunctory visit without heart defeats the purpose.


**How?**

1. Contact the sick person or their family to confirm a good time to visit. Respect their energy and privacy.
2. Prepare something to bring: a home-cooked meal, fruit, soup, or a practical gift like tissues or a good book.
3. Make your visit brief (15-30 minutes) unless they clearly want you to stay longer. The Prophet's visits were often short and focused.
4. Upon arrival, greet them warmly and ask how they are feeling. Listen more than you speak.
5. Make du'a for them in their presence. The Prophet (peace be upon him) would say, "La ba's, tahurun in sha Allah" (No worry, it is a purification, God willing).
6. Ask if they need anything practical: groceries, a ride to the doctor, someone to watch their children, or help with errands.
7. Completion indicator: you have visited at least one sick community member this week, brought something beneficial, and made du'a for them.` },
        { title: 'Follow up with the person you visited — check on their recovery within one week', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:134",
              arabic: "الَّذِينَ يُنفِقُونَ فِي السَّرَّاءِ وَالضَّرَّاءِ وَالْكَاظِمِينَ الْغَيْظَ وَالْعَافِينَ عَنِ النَّاسِ وَاللَّهُ يُحِبُّ الْمُحْسِنِينَ",
              translation: "Who spend in the cause of Allah during ease and hardship and who restrain anger and who pardon the people — and Allah loves the doers of good.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2568",
              translation: "The Prophet (peace be upon him) said: \"The rights of one Muslim over another are five: returning the greeting of salam, visiting the sick, following the funeral procession, accepting invitations, and saying yarhamuk Allah to one who sneezes.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A single visit is good; sustained care is excellent. Following up shows that your visit was not a one-time checkbox but the beginning of genuine concern. The Ansar did not help the Muhajirun once and move on — they maintained ongoing support. Following up also lets you assess whether the person's needs have changed: they may have recovered, worsened, or developed new needs that a one-time visit could not address.


**How?**

1. Within one week of your initial visit, send a message or make a phone call: "Assalamu alaykum, I have been making du'a for you. How are you feeling?"
2. Listen carefully to their response. If they are improving, express gratitude to Allah. If they are worsening, ask what additional support they need.
3. If they mention practical needs (meals, transport, childcare), offer specifically rather than saying "Let me know if you need anything" — specific offers are far more likely to be accepted.
4. If they are hospitalised long-term, schedule a second visit.
5. Inform the masjid welfare committee of any ongoing needs so the community can coordinate support rather than leaving it to one person.
6. Make du'a for them by name in your prayers, especially in sujud and during the last third of the night.
7. Completion indicator: a follow-up contact within one week of the visit, with any new needs identified and communicated to the community if appropriate.` },
        { title: 'Teach your children or household members the etiquette and importance of visiting the sick', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 66:6",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا قُوا أَنفُسَكُمْ وَأَهْلِيكُمْ نَارًا",
              translation: "O you who have believed, protect yourselves and your families from a Fire whose fuel is people and stones.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 2008",
              translation: "The Prophet (peace be upon him) said: \"Whoever visits a sick person or visits a brother in Islam, a caller calls out: 'You are good and your walking is good; may you occupy a dignified position in Paradise.'\"",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The rights of Muslims upon each other must be transmitted generationally. If children grow up witnessing and participating in sick visits, they internalise the practice as a normal part of Muslim life — not an exceptional act of charity. The Prophet (peace be upon him) brought children into communal activities, training the next generation by example. Teaching your household transforms visiting the sick from your individual practice into your family's collective habit.


**How?**

1. Sit with your household and explain the hadith: "Five rights a Muslim has over another Muslim: returning the greeting, visiting the sick, following the funeral, accepting the invitation, and saying 'yarhamukallah' when he sneezes" (Bukhari).
2. Explain the etiquette: keep visits short, speak gently, do not complain about your own problems, make du'a, and bring something useful.
3. Bring a child or family member on your next sick visit — let them witness the interaction and participate in making du'a.
4. Afterward, discuss the experience: "How do you think uncle/auntie felt when we visited? What did you learn?"
5. Role-play scenarios at home: "What would you say if a classmate was sick? What du'a would you make?"
6. Make it a household norm: whenever someone in the community is sick, the family discusses together how they will respond.
7. Completion indicator: at least one household member has accompanied you on a sick visit, and the family has discussed the etiquette and importance together.` },
        { title: 'Create a simple system to track community members who are ill and coordinate visits', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 5:2",
              arabic: "وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ وَلَا تَعَاوَنُوا عَلَى الْإِثْمِ وَالْعُدْوَانِ",
              translation: "And cooperate in righteousness and piety, but do not cooperate in sin and aggression.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5649",
              translation: "The Prophet (peace be upon him) said: \"If a Muslim visits a sick Muslim in the morning, seventy thousand angels send blessings upon him until the evening, and if he visits him in the evening, seventy thousand angels send blessings upon him until the morning.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Individual initiative is good, but systemic care is better. Without a tracking system, some sick members receive multiple visits from the same few people while others are forgotten entirely. A simple coordination system ensures equitable coverage, prevents burnout among the few who always step up, and transforms visiting the sick from a personal kindness into a community institution — which is how the Prophet's community operated.


**How?**

1. Propose to your imam or community committee a shared document (Google Sheet, WhatsApp note, or physical register) that tracks: name, condition, location, preferred visit times, and who has visited.
2. Assign a volunteer coordinator — someone who updates the list weekly and notifies community members when someone new falls ill.
3. Establish a simple rotation: divide regular visitors into pairs or small groups, each responsible for one week of visits.
4. Include meal coordination: when someone is ill long-term, a meal train ensures they receive food without the same person cooking every time.
5. Respect privacy: only share information that the sick person or their family has consented to share.
6. Review the system monthly: is everyone being covered? Are visitors showing up? Adjust as needed.
7. Completion indicator: a functioning tracking document or register is in use at your masjid, with at least three community members participating in coordinated visits.` },
      ],
    },
    {
      title: 'Attend funerals (janazah) — fulfil the communal obligation and support the bereaved',
      priority: 'urgent', tags: ['janazah', 'huquq'],
      description: 'Attending the janazah prayer and burial is a fard kifayah (communal obligation) — if no one fulfils it, the entire community is sinful. The Prophet (peace be upon him) promised the reward of a qirat (a mountain of reward) for attending the prayer and another for staying until burial. Beyond reward, funeral attendance holds the community together through its most vulnerable moments.',
      subtasks: [
        { title: 'Learn the janazah prayer — its format, du\'as, and when to attend', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 17:78",
              arabic: "**Translation:** Perform As-Salât (Iqamât-as-Salât) from mid-day till the darkness of the night (i.e. the Zuhr, ‘Asr, Maghrib and ‘Ishâ’ prayers), and recite the Qur’ân in the early dawn (i.e. the morning prayer). Verily, the recitation of the Qur’ân in the early dawn is ever witnessed (attended by the angels in charge of mankind of the day and the night).",
              translation: "Perform As-Salât (Iqamât-as-Salât) from mid-day till the darkness of the night (i.e. the Zuhr, ‘Asr, Maghrib and ‘Ishâ’ prayers), and recite the Qur’ân in the early dawn (i.e. the morning prayer). Verily, the recitation of the Qur’ân in the early dawn is ever witnessed (attended by the angels in charge of mankind of the day and the night).",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 90",
              translation: "Narrated Abu Mas`ud Al-Ansari:Once a man said to Allah's Messenger (ﷺ) \"O Allah's Messenger (ﷺ)! I may not attend the (compulsory congregational) prayer because so and so (the Imam) prolongs the prayer when he leads us for it. The narrator added: \"I never saw the Prophet (ﷺ) more furious in giving advice than he was on that day. The Prophet said, \"O people! Some of you make others dislike good deeds (the prayers). So whoever leads the people in prayer should shorten it because among them there are the sick the weak and the needy (having some jobs to do)",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Many Muslims avoid janazah prayers because they do not know the format and feel embarrassed to attend unprepared. The janazah prayer is unique — it has four takbirat, no ruku' or sujud, and specific du'as for the deceased. Learning it in advance removes the barrier of unfamiliarity and ensures you can fulfil this obligation with confidence and khushu' (devotion) rather than anxiety.


**How?**

1. Study the format: the janazah prayer consists of four takbirat. After the first, recite al-Fatihah. After the second, recite the Ibrahimic salawat (as in tashahhud). After the third, make du'a for the deceased. After the fourth, make a brief du'a and give salam.
2. Memorise the du'a for the deceased: "Allahumma-ghfir li-hayyina wa mayyitina, wa shahidina wa gha'ibina, wa saghirina wa kabirina, wa dhakarina wa unthana..." Learn the full version from a reliable fiqh source.
3. Learn the variation for a child's janazah, where the du'a asks Allah to make the child an intercessor for the parents.
4. Understand the logistics: janazah prayers are typically announced at the masjid or via community channels, often held the same day as death or the following day.
5. Practise the prayer at home so the movements and words feel natural.
6. Ask a knowledgeable community member to walk you through it if you learn better in person.
7. Completion indicator: you can perform the janazah prayer independently, including the correct du'as after each takbirah, without needing to read from a book or phone.` },
        { title: 'Sign up for janazah announcements at your local masjid', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2569",
              translation: "The Prophet (peace be upon him) said: \"The rights of a Muslim upon another Muslim are five: returning the greeting, visiting the sick, following the funeral, accepting the invitation, and saying yarhamukallah when he sneezes.\" Following the janazah is a communal obligation.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1240",
              translation: "The Prophet (peace be upon him) said: \"Whoever attends the janazah until the prayer is offered will have one qirat of reward, and whoever stays until the burial will have two qirat.\" Each qirat is like the size of Mount Uhud.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Funerals in Islam happen quickly — often within 24 hours of death. If you are not connected to the announcement system, you will miss the janazah entirely and lose both the reward and the opportunity to fulfil your communal obligation. Signing up ensures you receive timely notification and can plan accordingly. The Prophet's companions would drop whatever they were doing to attend a janazah — this begins with knowing when one occurs.


**How?**

1. Ask your imam or masjid administrator how janazah announcements are communicated — WhatsApp group, email list, text alerts, or posted on the masjid door.
2. Join every relevant channel. If there are multiple mosques in your area, consider joining announcements for all of them.
3. If your masjid does not have a systematic announcement method, suggest one to the imam — even a simple WhatsApp broadcast list.
4. Save the masjid's phone number and the imam's contact so you can call to confirm janazah times if an announcement is unclear.
5. Set your phone to allow notifications from the janazah announcement channel, even during "Do Not Disturb" hours — funerals do not wait for convenient timing.
6. When you receive an announcement, immediately check your schedule and commit to attending if at all possible.
7. Completion indicator: you are subscribed to at least one janazah announcement channel and have received at least one notification through it.` },
        { title: 'Attend the next janazah prayer in your community and stay through the burial', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:156",
              arabic: "الَّذِينَ إِذَا أَصَابَتْهُم مُّصِيبَةٌ قَالُوا إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ",
              translation: "those who say, when afflicted with a calamity, 'We belong to God and to Him we shall return.",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              rationale: "the funeral prayer and burial rites embody this declaration — attending is the communal enactment of this Quranic acknowledgement",
            },
            {
              kind: "quran",
              ref: "Quran 3:185",
              arabic: "كُلُّ نَفْسٍ ذَائِقَةُ الْمَوْتِ ۗ وَإِنَّمَا تُوَفَّوْنَ أُجُورَكُمْ يَوْمَ الْقِيَامَةِ ۖ فَمَن زُحْزِحَ عَنِ النَّارِ وَأُدْخِلَ الْجَنَّةَ فَقَدْ فَازَ ۗ وَمَا الْحَيَاةُ الدُّنْيَا إِلَّا مَتَاعُ الْغُرُورِ",
              translation: "Every soul will taste death and you will be paid in full only on the Day of Resurrection. Whoever is kept away from the Fire and admitted to the Garden will have triumphed. The present world is only an illusory pleasure.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2189",
              translation: "Abu Huraira reported Allah's Messenger (ﷺ) as saying:He who attends the funeral till the prayer is offered for (the dead), for him is the reward of one qirat, and he who attends (and stays) till he is buried, for him is the reward of two qirats. It was said: What are the qirats? He said: They are equivalent to two huge mountains. Two other narrators added: Ibn 'Umar used to pray and then depart (without waiting for the burial of the dead). When the tradition of Abu Huraira reached him, he said:\" We have lost many qirats",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) said, "Whoever attends the janazah prayer will have a qirat of reward, and whoever stays until the burial will have two qirat." He was asked what a qirat was and replied, "Like the mountain of Uhud" (Bukhari and Muslim). Staying through the burial — not just the prayer — doubles the reward and provides the maximum comfort to the bereaved family, who draw strength from seeing their community present until the very end.


**How?**

1. When the next janazah is announced, clear your schedule as much as possible. Treat it as a priority, not an optional addition.
2. Arrive at the masjid before the janazah prayer begins. Perform wudu and pray two rak'at tahiyyat al-masjid while waiting.
3. Stand in the rows for the janazah prayer. Follow the imam through the four takbirat, making the du'as you have learned.
4. After the prayer, join the procession to the burial site if it is separate from the masjid.
5. At the burial, help carry the bier if possible — the Prophet (peace be upon him) encouraged it. Help lower the body into the grave if asked.
6. Stay until the grave is filled and the final du'a is made. This is when most people leave, but staying until the end is where the second qirat is earned.
7. Completion indicator: you have attended one janazah prayer and remained present through the completion of the burial.` },
        { title: 'Offer condolences (ta\'ziyah) to the bereaved family within three days', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:185",
              arabic: "كُلُّ نَفْسٍ ذَائِقَةُ الْمَوْتِ وَإِنَّمَا تُوَفَّوْنَ أُجُورَكُمْ يَوْمَ الْقِيَامَةِ",
              translation: "Every soul will taste death, and you will only be given your full compensation on the Day of Resurrection.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 918",
              translation: "The Prophet (peace be upon him) said: \"There is no Muslim who consoles his brother in a calamity but that Allah will clothe him with garments of honour on the Day of Resurrection.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 3121",
              translation: "The Prophet (peace be upon him) said: \"Visit the sick, feed the hungry, and free the captives.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Ta'ziyah — offering condolences — is a sunnah that provides emotional and spiritual support to the grieving family during their most vulnerable time. The Prophet (peace be upon him) said, "Whoever consoles a person in affliction will be dressed with a garment of honour on the Day of Judgement" (Ibn Majah). The three-day window is significant because grief is most acute in the immediate aftermath, and Islamic mourning (outside of a widow's iddah) is traditionally observed for three days.


**How?**

1. Visit the family at their home within three days of the death. Call ahead to confirm an appropriate time.
2. Bring food — this is a strong sunnah. The Prophet (peace be upon him) said, "Prepare food for the family of Ja'far, for something has come upon them that is keeping them busy" (Abu Dawud). A full meal is better than snacks.
3. Keep your visit focused on comfort: "Inna lillahi wa inna ilayhi raji'un. May Allah have mercy on [name] and grant your family patience."
4. Share a positive memory of the deceased if you have one — this is deeply comforting to the family.
5. Listen more than you speak. Do not minimise their grief with platitudes like "They are in a better place" unless the family initiates that framing.
6. Offer specific practical help: "I will bring dinner tomorrow," "I can drive your children to school this week," "I will handle the masjid coordination."
7. Completion indicator: you have visited the bereaved family within three days, brought food, offered condolences with appropriate words, and provided or offered practical support.` },
        { title: 'Participate in the ghusl (washing) of the deceased if the opportunity arises', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 5:6",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا قُمْتُمْ إِلَى الصَّلَاةِ فَاغْسِلُوا وُجُوهَكُمْ وَأَيْدِيَكُمْ إِلَى الْمَرَافِقِ وَامْسَحُوا بِرُءُوسِكُمْ وَأَرْجُلَكُمْ إِلَى الْكَعْبَيْنِ ۚ وَإِن كُنتُمْ جُنُبًا فَاطَّهَّرُوا ۚ ... مَا يُرِيدُ اللَّهُ لِيَجْعَلَ عَلَيْكُم مِّنْ حَرَجٍ وَلَٰكِن يُرِيدُ لِيُطَهِّرَكُمْ وَلِيُتِمَّ نِعْمَتَهُ عَلَيْكُمْ",
              translation: "You who believe, when you are about to pray, wash your faces and your hands up to the elbows, wipe your heads, wash your feet up to the ankles... God does not wish to place any burden on you: He only wishes to cleanse you and perfect His blessing on you, so that you may be thankful.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1256",
              translation: "Narrated Um 'Atiyya:When we washed the deceased daughter of the Prophet, he said to us, while we were washing her, \"Start the bath from the right side and from the parts which are washed in ablution",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 167",
              translation: "Narrated Um-`Atiya:That the Prophet (ﷺ) at the time of washing his deceased daughter had said to them, \"Start from the right side beginning with those parts which are washed in ablution",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Washing the deceased is one of the most intimate and sacred acts of service in Islam. The Prophet (peace be upon him) said, "Whoever washes a dead person and conceals what he sees will be forgiven forty times" (Hakim). Most communities have a shortage of trained ghusl volunteers, which means this fard kifayah is often fulfilled by only a handful of people. Participating in or learning the ghusl process ensures this critical obligation is adequately staffed in your community and connects you to the reality of death in a way that no lecture can.


**How?**

1. Ask your imam who in the community is trained to perform the ghusl of the deceased and express your interest in learning.
2. Attend a ghusl training workshop if one is offered — many Islamic centres and funeral homes hold periodic training sessions.
3. If no formal training is available, ask an experienced ghusl volunteer to teach you the steps: intention, washing the private areas, performing wudu on the body, washing the right side then left three times (or more in odd numbers), and applying camphor or fragrance.
4. Learn the specific rulings: same-gender washing, what to do if the body is injured, rulings for martyrs and stillborn children.
5. When the next opportunity arises, volunteer to assist an experienced washer — observe first, then participate under guidance.
6. Maintain confidentiality: the Prophet (peace be upon him) stressed concealing any defects seen on the body of the deceased.
7. Completion indicator: you have either completed a ghusl training session or participated in the ghusl of a deceased person under the guidance of an experienced volunteer.` },
      ],
    },
    {
      title: 'Support mutual financial assistance — distribute sadaqah and zakat within your community',
      priority: 'urgent', tags: ['sadaqah', 'zakat', 'infaq'],
      description: 'Financial solidarity is a pillar of ummah life. The Quran commands, "And in their wealth is a known right for the one who asks and the one who is deprived" (70:24-25). Beyond the obligatory zakat, regular sadaqah and mutual aid within the community prevent the kind of poverty and desperation that fragment communities and push people away from the masjid.',
      subtasks: [
        { title: 'Calculate your zakat obligation accurately for this year', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 9:60",
              arabic: "إِنَّمَا الصَّدَقَاتُ لِلْفُقَرَاءِ وَالْمَسَاكِينِ وَالْعَامِلِينَ عَلَيْهَا وَالْمُؤَلَّفَةِ قُلُوبُهُمْ وَفِي الرِّقَابِ وَالْغَارِمِينَ وَفِي سَبِيلِ اللَّهِ وَابْنِ السَّبِيلِ",
              translation: "Zakah expenditures are only for the poor and for the needy and for those employed to collect it and for bringing hearts together and for freeing captives and for those in debt and for the cause of Allah and for the stranded traveller.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 2:267",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا أَنفِقُوا مِن طَيِّبَاتِ مَا كَسَبْتُمْ",
              translation: "O you who have believed, spend from the good things which you have earned.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1395",
              translation: "The Prophet (peace be upon him) said: \"Islam is built upon five pillars: testifying that there is no god but Allah and that Muhammad is the Messenger of Allah, establishing the prayer, paying the zakat, performing Hajj, and fasting Ramadan.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Zakat is not optional charity — it is the right of the poor in your wealth (Quran 9:60). Miscalculating zakat, whether through negligence or ignorance, means either withholding what is owed or overpaying and creating unnecessary hardship on yourself. Accurate calculation is an act of worship that requires the same care you would give to salah. The Prophet (peace be upon him) warned that wealth on which zakat is not paid will be a source of punishment on the Day of Judgement (Bukhari).


**How?**

1. Determine your zakat anniversary date — typically the Islamic calendar date on which you first possessed the nisab (minimum threshold).
2. List all zakatable assets: cash in bank accounts, savings, investments, gold, silver, business inventory, and receivables.
3. Subtract any debts that are currently due (not long-term mortgages, according to most scholars).
4. Check the current nisab threshold — equivalent to 85 grams of gold or 595 grams of silver. Use a reliable zakat calculator (e.g., NZF, ISNA, or your local scholarly body's tool).
5. If your net zakatable wealth exceeds the nisab, calculate 2.5% of the total.
6. Document your calculation clearly so you can review it next year and track any changes in your financial position.
7. Completion indicator: a written zakat calculation for this year showing all assets, deductions, and the final amount owed, using a reliable calculation method.` },
        { title: 'Identify families or individuals in your community who are in genuine financial need', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:273",
              arabic: "لِلْفُقَرَاءِ الَّذِينَ أُحْصِرُوا فِي سَبِيلِ اللَّهِ لَا يَسْتَطِيعُونَ ضَرْبًا فِي الْأَرْضِ يَحْسَبُهُمُ الْجَاهِلُ أَغْنِيَاءَ مِنَ التَّعَفُّفِ",
              translation: "For the poor who have been restricted for the cause of Allah, unable to move about in the land. An ignorant person would think them self-sufficient because of their restraint.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 9:60",
              arabic: "إِنَّمَا الصَّدَقَاتُ لِلْفُقَرَاءِ وَالْمَسَاكِينِ",
              translation: "Zakah expenditures are only for the poor and for the needy.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 1772",
              translation: "The Prophet (peace be upon him) said: \"He is not a believer whose stomach is filled while the neighbour to his side goes hungry.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Zakat and sadaqah are most effective when they reach people in genuine need within your own community — before being sent elsewhere. The Prophet (peace be upon him) instructed Mu'adh ibn Jabal, "Inform them that Allah has enjoined on them sadaqah to be taken from the wealthy among them and given to the poor among them" (Bukhari). Local distribution strengthens local bonds and ensures the giver witnesses the impact of their contribution. Many people in need are too proud to ask, which means the community must actively seek them out.


**How?**

1. Speak confidentially with your imam, community elders, and welfare committee about who in the community is struggling financially.
2. Pay attention to signs: a family that stops attending events, a brother who always declines group outings, a sister who mentions difficulty paying bills.
3. Approach potential recipients with extreme discretion — the Quran praises giving that preserves the recipient's dignity (2:271).
4. Ask community service organisations, food banks, or refugee resettlement agencies in your area for Muslim families they serve.
5. Consider categories beyond the obviously poor: students burdened with debt, recent converts without family support, widows, and orphan-caring families.
6. Create a confidential list of families and individuals, noting the type of support each needs (rent, groceries, medical bills, school fees).
7. Completion indicator: a confidential list of at least three families or individuals in your community with identified financial needs, verified through discreet inquiry.` },
        { title: 'Distribute your zakat directly to eligible recipients in your community', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:177",
              arabic: "وَآتَى الْمَالَ عَلَىٰ حُبِّهِ ذَوِي الْقُرْبَىٰ وَالْيَتَامَىٰ وَالْمَسَاكِينَ وَابْنَ السَّبِيلِ وَالسَّائِلِينَ وَفِي الرِّقَابِ",
              translation: "And gives wealth, in spite of love for it, to relatives, orphans, the needy, the traveller, those who ask, and for freeing slaves.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 9:103",
              arabic: "خُذْ مِنْ أَمْوَالِهِمْ صَدَقَةً تُطَهِّرُهُمْ وَتُزَكِّيهِم بِهَا",
              translation: "Take from their wealth a charity by which you purify them and cause them increase.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1432",
              translation: "The Prophet (peace be upon him) said: \"Give the sadaqah without delay, for it stands in the way of calamity.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 9:60",
              arabic: "إِنَّمَا الصَّدَقَاتُ لِلْفُقَرَاءِ وَالْمَسَاكِينِ وَالْعَامِلِينَ عَلَيْهَا وَالْمُؤَلَّفَةِ قُلُوبُهُمْ وَفِي الرِّقَابِ وَالْغَارِمِينَ وَفِي سَبِيلِ اللَّهِ وَابْنِ السَّبِيلِ ۖ فَرِيضَةً مِّنَ اللَّهِ ۗ وَاللَّهُ عَلِيمٌ حَكِيمٌ",
              translation: "Alms are meant only for the poor, the needy, those who administer them, those whose hearts need winning over, to free slaves and help those in debt, for God's cause, and for travellers in need. This is ordained by God; God is all knowing and wise.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Verse cited inline in this subtask's description; backfilled into structured sources for SubtaskSources panel rendering.",
            },
          ],
          description: `**Why?**

Direct, local distribution of zakat ensures your obligation reaches those who need it most with minimal overhead and maximum personal connection. While giving through organisations is permissible and sometimes necessary, the Prophet's companions often distributed their zakat personally, which allowed them to verify need, preserve dignity, and build relationships of mutual care. Direct distribution also eliminates the delay and administrative costs that can reduce the impact of your zakat.


**How?**

1. From your needs assessment list, identify individuals who fall into the eight zakat-eligible categories (Quran 9:60): the poor, the needy, zakat administrators, those whose hearts are being reconciled, freeing captives, debtors, in the cause of Allah, and wayfarers.
2. Prioritise those closest to you geographically and relationally — family members who are eligible, then neighbours, then the broader community.
3. Give privately and discreetly. The Prophet (peace be upon him) said, "Seven will be shaded by Allah on a day when there is no shade except His... a man who gives charity and conceals it so that his left hand does not know what his right hand gives" (Bukhari).
4. If giving cash feels awkward, pay a bill directly, buy groceries, or purchase what the family needs and deliver it.
5. Do not attach conditions, follow up to check how they spent it, or make the recipient feel indebted.
6. Keep a record of distributions for your own zakat tracking, but share this record with no one.
7. Completion indicator: your full zakat amount for this year has been distributed to eligible recipients, with a private record of distributions maintained.` },
        { title: 'Establish a monthly sadaqah habit — automate a recurring donation to a local cause', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 58:13",
              arabic: "أَأَشْفَقْتُمْ أَن تُقَدِّمُوا بَيْنَ يَدَيْ نَجْوَاكُمْ صَدَقَاتٍ ۚ فَإِذْ لَمْ تَفْعَلُوا وَتَابَ اللَّهُ عَلَيْكُمْ فَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ وَأَطِيعُوا اللَّهَ وَرَسُولَهُ ۚ وَاللَّهُ خَبِيرٌ بِمَا تَعْمَلُونَ",
              translation: "Were you afraid to give charity before consulting the Prophet? Since you did not give charity, and God has relented towards you, you should [at least] observe your prayers, pay the prescribed alms, and obey God and His Messenger: God is well aware of your actions.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 2:270",
              arabic: "وَمَا أَنفَقْتُم مِّن نَّفَقَةٍ أَوْ نَذَرْتُم مِّن نَّذْرٍ فَإِنَّ اللَّهَ يَعْلَمُهُ ۗ وَمَا لِلظَّالِمِينَ مِنْ أَنصَارٍ",
              translation: "Whatever you may give, or vow to give, God knows it well, and those who do wrong will have no one to help them.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1442",
              translation: "The Prophet (peace be upon him) said: \"Every day two angels come down from Heaven and one of them says, ‘O Allah! Give compensation to every person who spends [in Your cause],’ and the other (angel) says, ‘O Allah! Destroy every miser.’\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) said, "The most beloved deed to Allah is the most consistent, even if it is small" (Bukhari). A monthly automated donation removes the friction of deciding each time and ensures that your giving continues even when you are busy, forgetful, or going through a spiritually low period. Directing it to a local cause keeps the impact visible and strengthens the institution that serves your community — your masjid, food pantry, or Islamic school.


**How?**

1. Identify a local cause that resonates with you: your masjid's operating fund, a community food pantry, an Islamic school scholarship fund, or a refugee support organisation.
2. Determine an amount you can sustain every month without financial strain — even a small amount given consistently is beloved to Allah.
3. Set up an automatic bank transfer or recurring online donation so it leaves your account on a fixed date each month.
4. Treat this as a non-negotiable expense in your budget, listed alongside rent and utilities — not as a discretionary "extra."
5. Review and increase the amount annually, even by a small percentage, as your income grows.
6. Do not cancel during financially tight months unless genuinely necessary — the barakah of consistent giving often manifests precisely when you feel you cannot afford it.
7. Completion indicator: a recurring monthly donation is set up and has been successfully processed for at least one month.` },
        { title: 'Contribute to or organise a community emergency fund for unexpected crises', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 9:60",
              arabic: "إِنَّمَا الصَّدَقَاتُ لِلْفُقَرَاءِ وَالْمَسَاكِينِ",
              translation: "Zakah expenditures are only for the poor and for the needy.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2568",
              translation: "The Prophet (peace be upon him) said: \"Whoever relieves a believer of a hardship of this world, Allah will relieve him of a hardship on the Day of Resurrection.\" A community emergency fund is an organized mechanism for this relief.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) said, "The believers in their mutual kindness, compassion, and sympathy are like one body. When one organ aches, the whole body reacts with sleeplessness and fever" (Bukhari and Muslim). An emergency fund operationalises this hadith. Without a collective safety net, families hit by sudden job loss, medical emergencies, or disasters must either go into debt, beg, or leave the community. A standing emergency fund means the community can respond within hours, not weeks — embodying the ukhuwwah the Prophet established.


**How?**

1. Check if your masjid or community already has an emergency fund. If so, contribute to it and ask how you can help manage or promote it.
2. If none exists, propose one to the imam and community committee. Present a simple model: monthly contributions from willing members into a dedicated account.
3. Define clear criteria for disbursement: what constitutes an emergency, who is eligible, maximum amounts, and who approves requests.
4. Set a seed target — for example, enough to cover one family's rent and groceries for one month — and campaign to reach it.
5. Make contributing easy: set up a dedicated online payment link, a collection box at the masjid, or a standing order form.
6. Report back to contributors periodically (without revealing recipients' identities) so they see the fund in action and continue giving.
7. Completion indicator: either a personal contribution to an existing community emergency fund, or a proposal presented to community leadership for establishing one, with at least three initial contributors.` },
      ],
    },
  ],

  // ── GROWTH — Build community institutions ──
  ummah_community_growth: [
    {
      title: "Establish a community education institution (halaqa or weekend school)",
      priority: 'high', tags: ['education', 'tarbiyah', 'institution'],
      description: " This task creates a structured, ongoing educational institution that serves all ages — from children learning the basics of their faith to adults deepening their understanding. Education is the engine of community growth.",
      subtasks: [
        { title: "Assess the educational needs of your community across all age groups", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 96:1-5",
              arabic: "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ ۝ خَلَقَ الْإِنسَانَ مِنْ عَلَقٍ ۝ اقْرَأْ وَرَبُّكَ الْأَكْرَمُ ۝ الَّذِي عَلَّمَ بِالْقَلَمِ ۝ عَلَّمَ الْإِنسَانَ مَا لَمْ يَعْلَمْ",
              translation: "Read in the name of your Lord who created. Created man from a clinging substance. Read, and your Lord is the most Generous. Who taught by the pen. Taught man that which he knew not.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 20:114",
              arabic: "وَقُل رَّبِّ زِدْنِي عِلْمًا",
              translation: "And say, \"My Lord, increase me in knowledge.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Ibn Majah 224",
              translation: "The Prophet (peace be upon him) said: \"Seeking knowledge is an obligation upon every Muslim.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

 An education programme built without understanding the community's actual needs will attract no one. Some communities need basic Arabic literacy; others need advanced fiqh; many need youth-specific programming. A needs assessment ensures you build what is actually needed, not what you assume is needed.

**How?**

1. Design a simple survey covering: age, current Islamic knowledge level (self-assessed), topics of greatest interest, preferred learning format (lecture, discussion, online, in-person), and scheduling constraints.
2. Distribute to at least 50 community members across all demographics — parents, singles, youth, elders, converts.
3. Supplement surveys with 5-10 in-depth conversations with community leaders, teachers, and parents.
4. Compile results into a needs matrix: rows = age groups, columns = topic areas, cells = demand level (high/medium/low).
5. Identify the top 3 unmet needs that affect the largest number of people.
6. Present findings to the shura council with a recommendation for programme priorities.
7. Completion indicator: a documented needs assessment with at least 50 survey responses and a prioritised list of 3 educational needs, endorsed by the shura council.` },
        { title: "Recruit and vet qualified teachers for core subjects", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 9:122",
              arabic: "فَلَوْلَا نَفَرَ مِن كُلِّ فِرْقَةٍ مِّنْهُمْ طَائِفَةٌ لِّيَتَفَقَّهُوا فِي الدِّينِ",
              translation: "From every group, a party should go forth to obtain understanding in the religion.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 3641",
              translation: "The Prophet (peace be upon him) said: \"The scholars are the heirs of the Prophets.\" Recruiting qualified teachers is essential to preserving and transmitting sacred knowledge. **II. Hadith**",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 100",
              translation: "Recorded in Sahih al-Bukhari 100: 'Allah does not take away the knowledge... but takes it away by the death of the religious learned men...'",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) warned: "Allah does not take away knowledge by snatching it from people, but by taking away the scholars" (Bukhari & Muslim). Who teaches matters as much as what is taught. Unqualified teachers can transmit distorted beliefs, poor methodology, or harmful attitudes that take years to undo. Vetting ensures that the community's educational foundation is built on sound knowledge, good character, and pedagogical competence.


**How?**

1. Define the core subjects your programme will cover (e.g., Quran recitation, basic aqidah, fiqh of worship, seerah, Arabic).
2. For each subject, list the minimum qualifications: formal ijaza or degree, teaching experience, and character references.
3. Reach out to local imams, Islamic university graduates, and experienced teachers — start within the community, then expand to neighbouring communities.
4. Conduct interviews focusing on: knowledge level, teaching methodology, ability to handle difficult questions, and alignment with the community's values.
5. Request a trial lesson observed by 2-3 evaluators.
6. Check references and conduct background checks, especially for those teaching children.
7. Completion indicator: at least one vetted, qualified teacher recruited for each core subject, with documented qualifications and trial lesson feedback.` },
        { title: "Design a structured curriculum with clear learning outcomes", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 96:1-5",
              arabic: "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ",
              translation: "Read in the name of your Lord who created. Created man from a clinging substance. Read, and your Lord is the Most Generous. Who taught by the pen. Taught man that which he knew not.\"",
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
          ],
          description: `**Why?**

 A curriculum without structure produces students with scattered, incomplete knowledge. Clear learning outcomes ensure that after completing the programme, students can demonstrably recite, understand, and apply what they have learned. Structure also allows teachers to coordinate, prevents repetition, and shows the community that this is a serious institution, not a casual gathering.

**How?**

1. For each subject and age group, define 3-5 learning outcomes: what should a student know and be able to do after completing this course?
2. Break each course into weekly sessions with specific topics, readings, and activities.
3. Include assessment points: not formal exams, but recitation checks, written reflections, or practical demonstrations.
4. Align the curriculum with the community's identified needs from the assessment phase.
5. Have the curriculum reviewed by at least one qualified scholar for accuracy and by one experienced educator for pedagogy.
6. Pilot the curriculum for one term and collect feedback from students and teachers.
7. Completion indicator: a written curriculum document covering at least 3 subjects with weekly session plans, learning outcomes, and assessment methods, reviewed and approved by a scholar and an educator.` },
        { title: "Secure a dedicated space and regular schedule for classes", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 9:122",
              arabic: "فَلَوْلَا نَفَرَ مِن كُلِّ فِرْقَةٍ مِّنْهُمْ طَائِفَةٌ لِّيَتَفَقَّهُوا فِي الدِّينِ وَلِيُنذِرُوا قَوْمَهُمْ إِذَا رَجَعُوا إِلَيْهِمْ",
              translation: "And it is not for the believers to go forth all at once. For there should separate from every division of them a group to obtain understanding in the religion and warn their people when they return to them.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 2682",
              translation: "The Prophet (peace be upon him) said: \"May Allah brighten the face of a person who hears a hadith from us, memorises it, and conveys it to others.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) had the Suffah — a dedicated space in the masjid for learning. Education cannot thrive in borrowed, inconsistent spaces with unpredictable schedules. A dedicated space signals permanence and seriousness; a regular schedule builds habit and attendance. Without these, even the best curriculum will fail because people cannot plan around uncertainty.


**How?**

1. Assess available spaces: rooms in the masjid, community centre, school, or a rented facility.
2. Determine the minimum requirements: seating capacity, whiteboard or projector, ventilation, accessibility, and separate spaces for children and adults if needed.
3. Negotiate a consistent booking: same day, same time, same room every week — this is non-negotiable for building attendance.
4. If no suitable space exists, explore partnerships with local schools, libraries, or churches that rent community rooms.
5. Budget for the space: rent, utilities, teaching materials, and a small contingency.
6. Announce the schedule widely and stick to it — cancellations erode trust faster than anything.
7. Completion indicator: a confirmed, dedicated space booked for at least one academic term with a published schedule distributed to the community.` },
        { title: "Launch the first term and establish feedback and improvement cycles", done: false,
          sources: [
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
              ref: "Sahih Muslim 2674",
              translation: "The Prophet (peace be upon him) said: \"When a person dies, his deeds come to an end except for three: ongoing charity, beneficial knowledge, or a righteous child who prays for him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) constantly refined his approach based on the needs of his community. A programme that launches and never improves will stagnate and lose relevance. Formal feedback cycles — from students, teachers, and parents — ensure the programme adapts, grows, and continues to serve the community well. The first term is the proof of concept that builds the credibility needed for long-term sustainability.


**How?**

1. Launch with a public event: introduce the teachers, explain the curriculum, and register students.
2. Run the first term (8-12 weeks) with consistent delivery of the planned curriculum.
3. Collect mid-term feedback: a brief survey asking students what is working, what is not, and what they want more of.
4. Collect end-of-term feedback from students, parents, and teachers with a more detailed survey.
5. Hold a teachers' meeting to review feedback, discuss challenges, and plan adjustments for the next term.
6. Publish a brief report to the community: how many students enrolled, what was taught, and what improvements are planned.
7. Completion indicator: a completed first term with at least 15 enrolled students, documented feedback, and a published improvement plan for term two.` },
      ],
    },
    {
      title: "Build a community dispute resolution (sulh) mechanism",
      priority: 'high', tags: ['sulh', 'justice', 'conflict-resolution'],
      description: "Allah commands: 'If two groups of believers fight, make peace between them' (Quran 49:9). This task creates a formal, trusted mechanism for resolving disputes within the community — from personal conflicts to business disagreements — before they escalate into fitna that tears the community apart.",
      subtasks: [
        { title: "Identify and train community mediators in Islamic dispute resolution", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 29:46",
              arabic: "**Translation:** And dispute ye not with the People of the Book, except with means better (than mere disputation), unless it be with those of them who inflict wrong (and injury): but say, \"We believe in the revelation which has come down to us and in that which came down to you; Our Allah and your Allah is one; and it is to Him we bow (in Islam).",
              translation: "And dispute ye not with the People of the Book, except with means better (than mere disputation), unless it be with those of them who inflict wrong (and injury): but say, \"We believe in the revelation which has come down to us and in that which came down to you; Our Allah and your Allah is one; and it is to Him we bow (in Islam).",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) personally mediated disputes and appointed mediators like Abu Ubayda ibn al-Jarrah, known as the "trustworthy one of this ummah." Effective mediation requires specific skills: impartiality, deep listening, knowledge of Islamic rulings on justice, and the ability to help parties find common ground. Untrained mediators often make conflicts worse by taking sides or imposing solutions. Training ensures the community has people who can heal rather than inflame.


**How?**

1. Identify 3-5 community members who possess the following qualities: respected by all groups, known for fairness, able to maintain confidentiality, and willing to commit time to mediation.
2. Provide training in the basics of Islamic dispute resolution: the Quranic principles of sulh (reconciliation), the Prophetic examples, and the fiqh of arbitration (tahkim).
3. Supplement with practical mediation skills: active listening, reframing, managing emotions, and drafting agreements.
4. If formal training courses are available (e.g., through Islamic arbitration councils or community mediation programmes), enrol the candidates.
5. Conduct practice mediations using realistic scenarios before handling real cases.
6. Establish a code of conduct for mediators: impartiality, confidentiality, and no personal benefit from cases.
7. Completion indicator: at least 3 trained mediators who have completed training and conducted at least one supervised practice mediation each.` },
        { title: "Define the scope and process of the dispute resolution service", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:9",
              arabic: "وَإِن طَائِفَتَانِ مِنَ الْمُؤْمِنِينَ اقْتَتَلُوا فَأَصْلِحُوا بَيْنَهُمَا",
              translation: "And if two factions among the believers should fight, then make settlement between the two.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 4:35",
              arabic: "وَإِنْ خِفْتُمْ شِقَاقَ بَيْنِهِمَا فَابْعَثُوا حَكَمًا مِّنْ أَهْلِهِ وَحَكَمًا مِّنْ أَهْلِهَا",
              translation: "And if you fear dissension between the two, send an arbitrator from his people and an arbitrator from her people.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 4919",
              translation: "The Prophet (peace be upon him) said: \"Shall I not inform you of something more excellent in degree than fasting, prayer, and charity? It is reconciling people.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Without a clear scope and process, the mediation service will either be overwhelmed by every minor disagreement or ignored because no one knows it exists. The Prophet (peace be upon him) established clear processes for adjudication — different approaches for family disputes, financial disputes, and interpersonal conflicts. A defined scope and process builds trust by setting expectations: what kinds of disputes are handled, how long it takes, and what the outcomes can be.


**How?**

1. Define the types of disputes the service will handle: interpersonal conflicts, family disputes (non-legal), business disagreements between community members, and community governance disputes.
2. Define what is out of scope: criminal matters (refer to authorities), cases requiring legal expertise (refer to Islamic arbitration councils or lawyers), and disputes where one party refuses to participate.
3. Write a step-by-step process: (a) intake and initial assessment, (b) contacting both parties, (c) scheduling mediation, (d) conducting the session, (e) drafting an agreement, (f) follow-up.
4. Set timelines: intake within 72 hours, first session within 2 weeks, resolution target within 30 days.
5. Create intake forms and agreement templates.
6. Publish the service details through the masjid, newsletter, and community website.
7. Completion indicator: a documented process with forms and templates, published and accessible to all community members.` },
        { title: "Handle the first 3 cases and document lessons learned", done: false,
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
              kind: "hadith",
              ref: "Sahih al-Bukhari 7188",
              translation: "The Prophet (peace be upon him) said: \"When a judge makes a ruling, striving to reach the right decision, and is correct, he will have two rewards. If he is mistaken, he will still have one reward.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Theory without practice is incomplete. The first real cases will reveal gaps in the process, skill deficiencies in the mediators, and community attitudes that need to be addressed. The Prophet (peace be upon him) learned and adjusted through experience — the approach at Badr was different from Uhud, which was different from Khandaq. Documenting lessons from real cases ensures the service improves rapidly and builds credibility through demonstrated competence.


**How?**

1. Accept the first 3 cases through the published intake process — do not cherry-pick easy cases; take what comes.
2. Assign each case to a mediator, with a senior mentor observing or available for consultation.
3. Follow the documented process for each case, noting any deviations and why they were necessary.
4. After each case (whether resolved or not), conduct a debrief: what worked, what did not, and what should change.
5. Compile lessons learned into a brief report without identifying parties.
6. Update the process document and training materials based on the lessons.
7. Completion indicator: 3 cases processed through the system with documented outcomes and a lessons-learned report that has been used to update the process.` },
        { title: "Build community trust in the mediation service through transparency", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:10",
              arabic: "إِنَّمَا الْمُؤْمِنُونَ إِخْوَةٌ فَأَصْلِحُوا بَيْنَ أَخَوَيْكُمْ ۚ وَاتَّقُوا اللَّهَ لَعَلَّكُمْ تُرْحَمُونَ",
              translation: "The believers are but brothers, so make settlement between your brothers. And fear Allah that you may receive mercy.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2692",
              translation: "The Prophet (peace be upon him) said: \"Making peace between people is a form of charity.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

People will not use a dispute resolution service they do not trust. The Prophet (peace be upon him) was known as al-Amin (the trustworthy) before prophethood — trust must be earned, not assumed. Transparency about the process, the mediators' qualifications, and the service's track record (without breaching confidentiality) builds the credibility needed for community members to bring their real disputes forward rather than letting them fester.


**How?**

1. Publish a quarterly report: number of cases handled, resolution rate, average time to resolution, and types of disputes (without identifying details).
2. Share anonymised testimonials from parties who found the process helpful (with their permission).
3. Invite the community to meet the mediators at a community gathering — brief introductions and Q&A about the process.
4. Address concerns and misconceptions openly: "Yes, everything is confidential. No, the mediator cannot force a decision on you."
5. Seek endorsement from the imam and shura council — their public support lends institutional credibility.
6. Ask resolved parties to refer others — word of mouth is the strongest trust signal.
7. Completion indicator: at least one published quarterly report, one public introduction event, and at least 2 new cases received through referrals from previous users.` },
        { title: "Establish a referral network for cases beyond the community's capacity", done: false,
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
              ref: "Quran 4:135",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا كُونُوا قَوَّامِينَ بِالْقِسْطِ شُهَدَاءَ لِلَّهِ",
              translation: "O you who have believed, be persistently standing firm in justice, witnesses for Allah.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Not every dispute can or should be resolved internally. Some cases involve legal complexity (e.g., divorce, inheritance, business partnerships with external parties) that require professional Islamic arbitration, legal counsel, or even court intervention. The Prophet (peace be upon him) sent delegations to specialists when needed. A referral network ensures the community does not overextend itself and that parties receive the right level of support for their situation.


**How?**

1. Research and compile a list of: Islamic arbitration councils, Muslim family lawyers, Muslim business mediators, and counselling services in your area or region.
2. Contact each to confirm: services offered, fees, geographic coverage, and willingness to accept referrals from your community.
3. Establish a simple referral protocol: when a case is assessed as beyond scope, the intake team provides the party with relevant referral options and contact details.
4. Maintain the referral list as a living document, updated annually.
5. Follow up on referred cases (with consent) to assess whether the external service was helpful.
6. Share the referral directory with the community so individuals can also access it directly.
7. Completion indicator: a published referral directory with at least 5 vetted external services, and at least 2 successful referrals made.` },
      ],
    },
    {
      title: "Develop a structured dawah and outreach programme",
      priority: 'medium', tags: ['dawah', 'outreach', 'interfaith'],
      description: "Allah commands: 'Invite to the way of your Lord with wisdom and beautiful preaching' (Quran 16:125). This task builds a structured, sustainable outreach programme that represents Islam accurately and beautifully to non-Muslims, engages in interfaith dialogue, and fulfils the community's obligation to share the message.",
      subtasks: [
        { title: "Assess the current state of community outreach and identify gaps", done: false,
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
              ref: "Quran 12:108",
              arabic: "قُلْ هَٰذِهِ سَبِيلِي أَدْعُو إِلَى اللَّهِ ۚ عَلَىٰ بَصِيرَةٍ أَنَا وَمَنِ اتَّبَعَنِي",
              translation: "Say, \"This is my way; I invite to Allah with insight — I and those who follow me.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Many Muslim communities either do no outreach at all or conduct it in an ad-hoc, reactive manner — responding to media crises rather than proactively building relationships. The Prophet (peace be upon him) sent letters and envoys to rulers and communities systematically, not randomly. Understanding what outreach (if any) currently exists and where the gaps are prevents duplication and ensures the new programme addresses real deficiencies.


**How?**

1. Interview community leaders and active members: what outreach activities have been done in the past 2 years?
2. List all current touchpoints with non-Muslims: open days, interfaith events, social media, neighbour relations, civic participation.
3. Assess quality and consistency: are these activities regular or sporadic? Well-organised or improvised?
4. Identify gaps: is there any outreach to schools? Workplaces? Local government? Media?
5. Survey non-Muslim neighbours and local organisations: how do they perceive the Muslim community? What would they want to know?
6. Compile findings into a gap analysis with recommendations.
7. Completion indicator: a documented gap analysis with at least 3 identified outreach deficiencies and recommendations, based on both internal and external perspectives.` },
        { title: "Train a team of community ambassadors in effective, respectful dawah", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 16:125",
              arabic: "ادْعُ إِلَىٰ سَبِيلِ رَبِّكَ بِالْحِكْمَةِ وَالْمَوْعِظَةِ الْحَسَنَةِ",
              translation: "Invite to the way of your Lord with wisdom and good instruction.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 1893",
              translation: "The Prophet (peace be upon him) said: \"Whoever guides someone to goodness will have a reward like the one who did it.\" Training dawah ambassadors multiplies the community's capacity for good.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

 But conveying requires skill. A well-intentioned but poorly trained ambassador can misrepresent Islam, offend potential allies, or create legal and social problems. Training ensures ambassadors can answer common questions accurately, handle hostile questions gracefully, and represent the community with the dignity and intelligence that the message of Islam deserves.

**How?**

1. Recruit 5-10 community members who are articulate, approachable, knowledgeable, and emotionally intelligent — not just the most religious, but the most relatable.
2. Design a training programme covering: the basics of Islam (for explaining to non-Muslims), common misconceptions and how to address them, active listening and respectful dialogue, cultural sensitivity, and legal boundaries (know your rights in public spaces).
3. Include role-play scenarios: "A colleague asks you about women in Islam," "A neighbour expresses concern about terrorism," "A stranger is curious about your prayer."
4. Practise concise, jargon-free explanations — most non-Muslims do not know what "tawhid" or "sunnah" means.
5. Provide each ambassador with a resource kit: business cards with masjid contact, a recommended reading list for interested non-Muslims, and a FAQ card.
6. Conduct a final assessment through observed role-play before deploying ambassadors.
7. Completion indicator: at least 5 trained ambassadors who have passed a role-play assessment and received their resource kits.` },
        { title: "Launch a regular interfaith dialogue initiative", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 29:46",
              arabic: "وَلَا تُجَادِلُوا أَهْلَ الْكِتَابِ إِلَّا بِالَّتِي هِيَ أَحْسَنُ",
              translation: "And do not argue with the People of the Scripture except in a way that is best.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 49:13",
              arabic: "يَا أَيُّهَا النَّاسُ إِنَّا خَلَقْنَاكُم مِّن ذَكَرٍ وَأُنثَىٰ وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا",
              translation: "O mankind, indeed We have created you from male and female and made you peoples and tribes that you may know one another.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Quran says: "O humanity, We have created you from male and female and made you into nations and tribes that you may know one another" (49:13). Interfaith dialogue is not about compromising beliefs — it is about building understanding, finding common ground on shared values (justice, charity, family), and removing the ignorance that breeds hostility. The Prophet (peace be upon him) maintained respectful relationships with Jewish and Christian communities in Madinah and engaged in theological dialogue with visiting delegations.


**How?**

1. Identify local religious leaders and institutions willing to engage: churches, synagogues, temples, and secular community organisations.
2. Start with a personal meeting between your imam or community leader and their counterpart — build the relationship before the programme.
3. Design an initial event: a shared meal with brief presentations from each faith on a common theme (e.g., "What does our faith say about serving the poor?").
4. Establish ground rules: mutual respect, no proselytising during the dialogue, focus on understanding not debating, and equal speaking time.
5. Plan a series of 3-4 events per year, alternating hosts between communities.
6. Collect feedback after each event and adjust the format based on what participants find most valuable.
7. Completion indicator: at least 2 interfaith events held with documented attendance from multiple faith communities and positive feedback from participants.` },
        { title: "Create accessible dawah materials tailored to your local audience", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 16:125",
              arabic: "ادْعُ إِلَىٰ سَبِيلِ رَبِّكَ بِالْحِكْمَةِ وَالْمَوْعِظَةِ الْحَسَنَةِ",
              translation: "Invite to the way of your Lord with wisdom and good instruction.\"",
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
          ],
          description: `**Why?**

The Prophet (peace be upon him) communicated differently with different audiences — he used poetry with the Arabs, logic with the Quraysh, and practical demonstration with the Bedouin. Generic dawah materials often fail because they do not speak to the specific questions, concerns, and cultural context of the local audience. Materials tailored to your community's neighbours — their language, their common misconceptions, their values — are exponentially more effective than one-size-fits-all pamphlets.


**How?**

1. Based on the outreach assessment and interfaith interactions, identify the top 5 questions non-Muslims in your area have about Islam.
2. Draft clear, concise answers to each question — no more than one page per answer, written in accessible language without Arabic jargon.
3. Have the materials reviewed by: a qualified scholar (for accuracy), a non-Muslim friend or neighbour (for clarity and tone), and a professional communicator (for presentation).
4. Produce the materials in both digital and print formats: a simple website or social media page, and printed brochures for the masjid and community events.
5. Include your community's contact information and an invitation to visit.
6. Test the materials at the next open day or interfaith event and collect feedback.
7. Completion indicator: a set of at least 5 dawah materials (print and digital) reviewed by a scholar and a non-Muslim reader, distributed at one event with documented feedback.` },
        { title: "Establish a regular community service project visible to the wider public", done: false,
          sources: [
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
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (peace be upon him) said: \"Whoever follows a path in pursuit of knowledge, Allah will make a path to Paradise easy for him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

 Actions speak louder than words. A Muslim community that serves its broader neighbourhood — feeding the homeless, cleaning public spaces, supporting local schools — demonstrates Islamic values more powerfully than any lecture. Regular, visible service builds goodwill, breaks stereotypes, and creates natural opportunities for dawah through relationship.

**How?**

1. Identify a local need that aligns with Islamic values and is visible to the public: a food bank, a homeless outreach, a park clean-up, or a school supply drive.
2. Partner with an existing organisation if possible — this multiplies impact and builds inter-community relationships.
3. Commit to a regular schedule: monthly at minimum, with the same core team to build consistency and relationships.
4. Identify the project clearly as a Muslim community initiative — use signage, branded clothing, or verbal introductions.
5. Invite the wider community to join — service should unite, not segregate.
6. Document the project through photos, stories, and impact metrics (meals served, bags collected, families supported).
7. Completion indicator: a regular service project running for at least 6 months with documented impact and at least one public recognition or media mention.` },
      ],
    },
    {
      title: "Develop a comprehensive youth programme rooted in Islamic identity",
      priority: 'high', tags: ['youth', 'tarbiyah', 'identity'],
      description: "The Prophet (peace be upon him) invested deeply in the youth of the ummah — appointing young leaders, mentoring them personally, and building their Islamic identity alongside their skills. This task creates a structured youth programme that addresses the unique challenges facing young Muslims: identity confusion, peer pressure, cultural tension, and the need for belonging.",
      subtasks: [
        { title: "Survey youth to understand their actual needs, struggles, and aspirations", done: false,
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
              ref: "Quran 18:13",
              arabic: "إِنَّهُمْ فِتْيَةٌ آمَنُوا بِرَبِّهِمْ وَزِدْنَاهُمْ هُدًى",
              translation: "Indeed, they were youths who believed in their Lord, and We increased them in guidance.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 2516",
              translation: "The Prophet (peace be upon him) said: \"Take advantage of five before five: your youth before your old age, your health before your sickness, your wealth before your poverty, your free time before your busyness, and your life before your death.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) understood the specific concerns of each age group — he gave different advice to the young man struggling with desire than to the elder concerned with legacy. Adults often design youth programmes based on what they think youth need, which frequently misses the mark. A direct survey gives young Muslims a voice, builds their trust in the process, and ensures the programme addresses real challenges — not imagined ones.


**How?**

1. Design an anonymous survey covering: What are the biggest challenges you face as a young Muslim? Where do you feel the community supports you? Where does it fail you? What topics would you want a youth programme to cover? What format do you prefer (lectures, discussions, sports, social, mentorship)?
2. Distribute to youth aged 13-25 through social media, school contacts, and direct outreach — aim for at least 25 responses.
3. Supplement with 5-8 one-on-one conversations with youth who are willing to share more openly.
4. Analyse results for common themes and surprising findings.
5. Present findings to the shura council and potential youth programme leaders.
6. Involve 2-3 youth in the analysis and programme design process — they are stakeholders, not just beneficiaries.
7. Completion indicator: a documented needs assessment based on at least 25 survey responses and 5 conversations, with a summary of top 5 youth needs presented to community leadership.` },
        { title: "Recruit and train youth mentors from within the community", done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 4943",
              translation: "The Prophet (peace be upon him) said: \"No one of you is a true believer until he loves for his brother what he loves for himself.\" Mentoring youth is an act of loving for the next generation what we value for ourselves.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 66:6",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا قُوا أَنفُسَكُمْ وَأَهْلِيكُمْ نَارًا",
              translation: "O you who have believed, protect yourselves and your families from a Fire.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) personally mentored young Companions — Ali ibn Abi Talib, Anas ibn Malik, and others grew under his direct guidance. Youth respond to relationships, not programmes. A brilliant curriculum without caring, relatable mentors will fail. Mentors provide the personal connection, the role modelling, and the safe space for questions that no lecture can replicate. They bridge the gap between Islamic knowledge and the lived reality of being young.


**How?**

1. Identify potential mentors: young adults (early 20s-30s) who are practicing, relatable, emotionally mature, and genuinely care about youth.
2. Screen candidates: character references, background checks (mandatory for working with minors), and an interview assessing their motivation and ability to maintain appropriate boundaries.
3. Provide training covering: basics of adolescent development, how to build trust without overstepping, how to handle disclosures (depression, bullying, family issues), when and how to escalate concerns, and the Islamic framework for mentorship.
4. Pair mentors with small groups of 3-5 youth based on age, gender, and interests.
5. Establish check-in protocols: mentors meet their group at least twice monthly and report to the programme coordinator monthly.
6. Support mentors with regular debriefs and access to professional advice for complex situations.
7. Completion indicator: at least 4 trained, vetted mentors actively meeting with their assigned youth groups for at least 2 months.` },
        { title: "Launch a biweekly youth halaqa addressing real-life challenges", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 103:1-3",
              arabic: "وَالْعَصْرِ ۝ إِنَّ الْإِنسَانَ لَفِي خُسْرٍ ۝ إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ",
              translation: "By time, indeed mankind is in loss, except for those who have believed and done righteous deeds and advised each other to truth and advised each other to patience.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6008",
              translation: "The Prophet (peace be upon him) said: \"He is not one of us who does not show mercy to our young ones and respect to our elders.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) held gatherings where Companions could ask questions freely — the famous hadith of Jibril occurred in such a setting. Young Muslims face questions that traditional halaqas rarely address: social media, identity confusion, mental health, relationships, career anxiety, and doubt. A youth-specific halaqa that tackles these topics honestly, within an Islamic framework, gives young people a space where their real lives meet their faith — instead of the two existing in separate compartments.


**How?**

1. Schedule a biweekly halaqa at a time youth can attend — Friday or Saturday evening works for most.
2. Choose a format that encourages participation: brief input (15 minutes) followed by guided discussion (30-45 minutes), not a one-hour lecture.
3. Select topics from the needs survey: identity, peer pressure, social media, mental health, relationships, doubt, career purpose, and how Islam addresses each.
4. Rotate facilitators between the imam, guest speakers, and trained mentors to keep it fresh.
5. Create a "question box" (physical or digital) where youth can submit anonymous questions that are addressed in future sessions.
6. Track attendance and engagement — if numbers drop, ask why and adjust.
7. Completion indicator: a biweekly halaqa running for at least 3 months with an average attendance of 10+ youth and documented topics covered.` },
        { title: "Integrate sports, social activities, and creative outlets into the youth programme", done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6026",
              translation: "The Prophet (peace be upon him) said: \"Allah is kind and loves kindness in all affairs.\" Integrating sports and creative outlets reflects the Prophetic balance of nurturing body, mind, and soul.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 4998",
              translation: "The Prophet (peace be upon him) said: \"Teach your children swimming, archery, and horse-riding.\" Physical activities and creative pursuits are a Sunnah-grounded part of youth development.",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

 Islam does not separate the spiritual from the physical and social. Youth who only associate the masjid with lectures will stop coming. A programme that includes sports, social outings, creative expression (art, writing, media), and fun builds the positive association with the community that keeps youth engaged long enough for the deeper tarbiyah to take root.

**How?**

1. Survey youth for their preferred activities: football, basketball, hiking, gaming, art, photography, cooking, or volunteering.
2. Schedule at least one social or physical activity per month alongside the biweekly halaqa — this is not a distraction from tarbiyah; it is tarbiyah through bonding.
3. Use activities to teach Islamic values naturally: teamwork (jamaah), fair play (adl), perseverance (sabr), and gratitude (shukr).
4. Rotate activity types to appeal to different interests and draw in youth who would not attend a halaqa.
5. Budget for activities: many are low-cost (park sports, community kitchen cooking) but some may need funding (venue hire, equipment).
6. Document activities with photos and stories (with parental consent) to build programme visibility and attract more participants.
7. Completion indicator: at least 6 social/physical activities held over 6 months with documented attendance and at least 3 new youth who joined through activities rather than the halaqa.` },
        { title: "Create a youth leadership pipeline — identify, develop, and deploy young leaders", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:110",
              arabic: "كُنتُمْ خَيْرَ أُمَّةٍ أُخْرِجَتْ لِلنَّاسِ",
              translation: "You are the best nation produced [as an example] for mankind.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 1920",
              translation: "The Prophet (peace be upon him) said: \"A group of my Ummah will remain victorious upon the truth.\" Developing young leaders ensures that the community continues to uphold and champion the truth.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) appointed Usama ibn Zayd to lead an army at age 18 — he did not wait for youth to "grow up" before giving them responsibility. Yet many communities exclude youth from meaningful leadership roles, then wonder why they disengage. A leadership pipeline identifies youth with potential, develops their skills through real responsibility (not token roles), and prepares them to lead the community in the next generation.


**How?**

1. Identify youth who show initiative, reliability, and care for the community — look beyond academic achievers to those who organise informally, help without being asked, and influence their peers positively.
2. Create a tiered leadership track: (a) volunteer roles (event setup, social media), (b) project leads (organising a youth event or service project), (c) committee roles (youth representative on the shura council or programme committee).
3. Pair each emerging leader with a senior community leader as a mentor.
4. Give real responsibility with real consequences — not make-work tasks, but decisions that affect the youth programme and, eventually, the broader community.
5. Provide training in: public speaking, project management, Islamic leadership principles, and conflict resolution.
6. Review the pipeline annually: who has progressed? Who needs more support? Who is ready for the next level?
7. Completion indicator: at least 3 youth placed in meaningful leadership roles with documented mentorship and at least one youth-led project successfully completed.` },
      ],
    },
    {
      title: "Establish a community treasury (bayt al-mal) for collective financial strength",
      priority: 'medium', tags: ['bayt-al-mal', 'finance', 'waqf'],
      description: "The Prophet (peace be upon him) established a bayt al-mal in Madinah — a collective treasury that funded community needs, supported the poor, and provided for public services. This task creates a transparent, accountable community fund that goes beyond emergency aid to build long-term collective financial capacity.",
      subtasks: [
        { title: "Audit current community finances — income, expenses, and gaps", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:282",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا تَدَايَنتُم بِدَيْنٍ إِلَىٰ أَجَلٍ مُّسَمًّى فَاكْتُبُوهُ",
              translation: "O you who have believed, when you contract a debt for a specified term, write it down.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 1015",
              translation: "The Prophet (peace be upon him) said: \"When a man dies, his deeds come to an end except for three: sadaqah jariyah, beneficial knowledge, or a righteous child who prays for him.\" Sound financial auditing protects community endowments.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Quran commands: "O you who believe, when you contract a debt for a specified term, write it down" (2:282). Financial transparency is a Quranic obligation, not a nice-to-have. Many Muslim communities operate with opaque finances — donations go into a general fund, expenses are unclear, and no one knows the community's true financial position. An audit establishes the baseline from which a community treasury can be built responsibly.


**How?**

1. Gather all financial records for the past 12 months: donation records, bank statements, expense receipts, and any outstanding debts or commitments.
2. Categorise income by source: regular donations, Jumu'ah collections, Ramadan campaigns, event fees, and grants.
3. Categorise expenses by type: rent/mortgage, utilities, salaries, programmes, maintenance, and miscellaneous.
4. Calculate the net position: total income minus total expenses, and current cash reserves.
5. Identify gaps: are there months where expenses exceed income? Are reserves sufficient for 3 months of operations? Are there unfunded community needs?
6. Present the audit to the shura council with a clear summary and visual charts.
7. Completion indicator: a complete 12-month financial audit presented to the shura council with categorised income, expenses, net position, and identified gaps.` },
        { title: "Establish separate funds for operations, emergency aid, and development", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 59:7",
              arabic: "كَيْ لَا يَكُونَ دُولَةً بَيْنَ الْأَغْنِيَاءِ مِنكُمْ",
              translation: "So that it will not be a perpetual distribution among the rich from among you.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (peace be upon him) said: \"Allah is in the aid of a servant so long as the servant is in the aid of his brother.\" Establishing separate funds for operations, emergency aid, and development ensures structured mutual support.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 9:60",
              arabic: "۞ إِنَّمَا ٱلصَّدَقَـٰتُ لِلْفُقَرَآءِ وَٱلْمَسَـٰكِينِ وَٱلْعَـٰمِلِينَ عَلَيْهَا وَٱلْمُؤَلَّفَةِ قُلُوبُهُمْ وَفِى ٱلرِّقَابِ وَٱلْغَـٰرِمِينَ وَفِى سَبِيلِ ٱللَّهِ وَٱبْنِ ٱلسَّبِيلِ ۖ فَرِيضَةًۭ مِّنَ ٱللَّهِ ۗ وَٱللَّهُ عَلِيمٌ حَكِيمٌۭ",
              translation: "Alms are meant only for the poor, the needy, those who administer them, those whose hearts need winning over, to free slaves and help those in debt, for God’s cause, and for travellers in need. This is ordained by God; God is all knowing and wise.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) distinguished between different types of community funds — zakat had specific eligible recipients (Quran 9:60), war booty had different rules, and voluntary sadaqah was distributed based on need. Mixing all community money into one pot creates confusion, misallocation, and donor distrust. Separate funds with clear purposes ensure that operational costs do not consume charitable donations, and that development projects have dedicated, protected funding.


**How?**

1. Define at least 3 fund categories: (a) Operations (rent, utilities, salaries, maintenance), (b) Emergency Aid (the mutual aid fund from the Core tier), (c) Development (education programmes, building projects, dawah initiatives).
2. Open separate bank accounts or clearly designated sub-accounts for each fund.
3. Establish allocation rules: what percentage of general donations goes to each fund? How are designated donations handled?
4. Define spending authority: who can authorise expenditures from each fund, and up to what amount without shura council approval?
5. Implement dual-signatory controls on all accounts.
6. Communicate the fund structure to the community so donors understand where their money goes.
7. Completion indicator: separate funds established with documented allocation rules, spending authority, and at least one quarterly report published to the community.` },
        { title: "Implement transparent financial reporting to the community", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:58",
              arabic: "إِنَّ اللَّهَ يَأْمُرُكُمْ أَن تُؤَدُّوا الْأَمَانَاتِ إِلَىٰ أَهْلِهَا",
              translation: "Indeed, Allah commands you to render trusts to whom they are due.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2409",
              translation: "The Prophet (peace be upon him) said: \"Pay the deposit to the one who entrusted it to you.\" Transparent financial reporting is the practical fulfillment of amanah in communal wealth.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Umar ibn al-Khattab (may Allah be pleased with him) established the principle that public funds require public accountability — he would account for every dirham of the bayt al-mal. When community members cannot see how their donations are spent, trust erodes, generosity decreases, and suspicion breeds fitna. Transparent reporting is not just good governance — it is an act of worship, fulfilling the amanah of handling other people's money.


**How?**

1. Produce a quarterly financial report covering: total income by source, total expenses by category, fund balances, and significant transactions.
2. Keep the report simple and visual — use charts, not just tables of numbers.
3. Distribute the report through: a printed copy at the masjid, email to regular donors, and posting on the community website or notice board.
4. Hold a brief (10-minute) financial update at a community gathering at least twice per year.
5. Invite questions and feedback — transparency means welcoming scrutiny, not just publishing numbers.
6. Have the annual accounts reviewed by a qualified community member (ideally an accountant) and publish the review.
7. Completion indicator: at least 2 quarterly reports published to the community with a year-end review by a qualified reviewer.` },
        { title: "Launch a regular giving programme to build sustainable income", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:261",
              arabic: "مَّثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنبَتَتْ سَبْعَ سَنَابِلَ",
              translation: "The example of those who spend their wealth in the way of Allah is like a seed of grain which grows seven ears; in each ear is a hundred grains.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 1006",
              translation: "The Prophet (peace be upon him) said: \"Charity does not decrease wealth.\" A regular giving programme builds sustainable income while increasing barakah. **II. Hadith**",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 41",
              translation: "Recorded in Sahih al-Bukhari 41 (Volume 1) as 'the best deed... is that which is done regularly.' The parallel narration in Sahih Muslim 1710 includes the phrase 'even if they are small.'",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) said: "The most beloved deeds to Allah are those done consistently, even if small" (Bukhari & Muslim). Most community finances depend on Ramadan surges and sporadic large donations, creating feast-or-famine cycles. A regular giving programme — monthly standing orders from committed members — provides predictable income that allows planning, reduces financial anxiety, and embeds the habit of sadaqah jariyah (ongoing charity) in the community's culture.


**How?**

1. Set a target: how much monthly recurring income does the community need to cover basic operations? Start with this as the campaign goal.
2. Create a simple sign-up process: a standing order form (bank) and an online recurring donation option (e.g., LaunchGood, GoFundMe Charity, or direct bank transfer).
3. Launch the programme with a compelling appeal: explain exactly what the money covers and why regular giving is more valuable than one-off donations.
4. Offer suggested tiers (e.g., $25, $50, $100/month) while making it clear that any amount is valuable.
5. Acknowledge donors regularly: a quarterly thank-you message (not individual amounts) reinforcing their impact.
6. Track sign-ups, retention, and total monthly income — report progress to the community quarterly.
7. Completion indicator: at least 20 regular givers enrolled with combined monthly income covering at least 50% of basic operational costs, sustained for 3 months.` },
        { title: "Explore establishing a community waqf (endowment) for long-term sustainability", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:261",
              arabic: "مَّثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنبَتَتْ سَبْعَ سَنَابِلَ فِي كُلِّ سُنبُلَةٍ مِّائَةُ حَبَّةٍ",
              translation: "The example of those who spend their wealth in the way of Allah is like a seed which grows seven ears; in each ear is a hundred grains.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 3:92",
              arabic: "لَن تَنَالُوا الْبِرَّ حَتَّىٰ تُنفِقُوا مِمَّا تُحِبُّونَ",
              translation: "Never will you attain the good until you spend from that which you love.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1410",
              translation: "The Prophet (peace be upon him) said: \"When a man dies, his deeds come to an end except for three things: ongoing charity (sadaqah jariyah), beneficial knowledge, or a righteous child who prays for him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 4005",
              translation: "Found in Sahih Muslim 4005 (Book 13), which lists the three ongoing deeds as 'recurring charity, or knowledge (by which people) benefit, or a pious son, who prays for him.'",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) said: "When a person dies, their deeds end except for three: ongoing charity (sadaqah jariyah), beneficial knowledge, and a righteous child who prays for them" (Muslim). Waqf is the Islamic institution of endowment — an asset whose principal is preserved and whose returns fund community needs in perpetuity. The greatest Islamic institutions in history — Al-Azhar, the hospitals of Damascus, the libraries of Cordoba — were sustained by waqf. A community without waqf is perpetually dependent on donations; a community with waqf has intergenerational financial security.


**How?**

1. Study the concept of waqf: its fiqhi requirements, historical examples, and modern implementations (consult a scholar and a lawyer familiar with Islamic endowments).
2. Assess whether your community has the capacity to establish a waqf — this requires assets (property, investment capital) and a governance structure to manage them.
3. Explore entry-level waqf models: a community property fund, a pooled investment managed by a waqf board, or participation in a national Muslim endowment programme.
4. Draft a waqf charter: the purpose, the governance structure, how returns are distributed, and how the principal is protected.
5. Present the concept to the community and gauge interest and capacity to contribute.
6. If feasible, launch with a modest target and grow over time — waqf is a marathon, not a sprint.
7. Completion indicator: a feasibility study completed with legal and scholarly input, a draft waqf charter, and a community presentation with documented interest from at least 10 potential contributors.` },
      ],
    },
    {
      title: 'Establish community education — launch a regular halaqa or weekend Islamic school programme',
      priority: 'high', tags: ['education', 'halaqa', 'ilm'],
      description: 'The Prophet (peace be upon him) said, "When a person dies, their deeds cease except for three: ongoing charity, beneficial knowledge, or a righteous child who prays for them" (Muslim). Community education is the vehicle for beneficial knowledge — it raises the baseline understanding of Islam, connects families, and ensures the next generation inherits more than cultural habits.',
      subtasks: [
        { title: 'Assess the educational gaps in your community — survey members on what they want to learn', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 9:122",
              arabic: "فَلَوْلَا نَفَرَ مِن كُلِّ فِرْقَةٍ مِّنْهُمْ طَائِفَةٌ لِّيَتَفَقَّهُوا فِي الدِّينِ",
              translation: "From every group, a party should go forth to obtain understanding in the religion.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 58:11",
              arabic: "يَرْفَعِ اللَّهُ الَّذِينَ آمَنُوا مِنكُمْ وَالَّذِينَ أُوتُوا الْعِلْمَ دَرَجَاتٍ",
              translation: "Allah will raise those who have believed among you and those who were given knowledge, by degrees.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Effective education addresses real needs, not assumed ones. Many community programmes fail because they teach what the organiser thinks is important rather than what the community actually needs. A survey respects the intelligence and agency of your community members while revealing gaps you may not have anticipated.

**How?**

1. Create a simple survey (Google Forms, paper handout, or WhatsApp poll) with 5-7 questions: What Islamic topics do you want to learn about? What age groups need programming? What days and times work best? Would you attend a weekly halaqa? Would you enrol your children in a weekend school?
2. Distribute the survey after Jumu'ah, through the masjid WhatsApp group, and via personal outreach to families.
3. Allow two weeks for responses, sending one reminder after the first week.
4. Compile the results and identify the top three requested topics, preferred time slots, and age groups needing the most attention.
5. Look for patterns: if many families want children's programming but no one has asked for adult education, it may indicate adults are too busy — not that they do not need it.
6. Share the results with the imam and community committee as the foundation for programme planning.
7. Completion indicator: a completed survey with at least 20 responses, compiled into a summary document identifying top educational priorities, preferred schedules, and target age groups.` },
        { title: 'Recruit a qualified teacher or scholar to lead the educational programme', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 3641",
              translation: "The Prophet (peace be upon him) said: \"The scholars are the heirs of the Prophets. The Prophets did not leave behind dinars or dirhams; rather they left behind knowledge.\" Recruiting qualified teachers ensures this prophetic inheritance is transmitted.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 100",
              translation: "Recorded in Sahih al-Bukhari 100: 'Allah does not take away the knowledge... but takes it away by the death of the religious learned men...'",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Knowledge in Islam has a chain (isnad) — it is transmitted from teacher to student, not merely read from books. A qualified teacher ensures accuracy, provides context that texts alone cannot convey, and models the adab (etiquette) of learning. The Prophet (peace be upon him) said, "Allah does not take away knowledge by snatching it from people, but He takes it away by taking away the scholars" (Bukhari). Investing in a qualified teacher is investing in the preservation of authentic knowledge in your community.


**How?**

1. Ask your imam for recommendations — they often know local scholars, graduates of Islamic universities, or qualified teachers who are available.
2. Reach out to nearby Islamic seminaries, institutes (e.g., AlMaghrib, Bayyinah, Qalam, or local equivalents), and university Islamic studies departments for teaching referrals.
3. If no local scholar is available, consider a qualified teacher who can lead sessions via video call — many scholars offer this service.
4. Vet candidates: verify their qualifications, ask for references, attend one of their existing classes if possible, and ensure their teaching style matches your community's needs.
5. Discuss compensation transparently — teachers deserve fair pay. If the community cannot afford it, explore sponsorship or fee-sharing models.
6. Agree on curriculum, schedule, and expectations before launching — clarity prevents conflict.
7. Completion indicator: a qualified teacher has agreed to lead the programme, with curriculum topics, schedule, and compensation terms documented.` },
        { title: 'Secure a venue and set a consistent weekly schedule for the halaqa or school', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 1893",
              translation: "The Prophet (peace be upon him) said: \"Whoever guides someone to goodness will have a reward like the one who did it.\" Securing a consistent venue and schedule removes barriers to accessing knowledge.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
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
          ],
          description: `**Why?**

Consistency is what transforms a one-off event into an institution. The Prophet's teaching circles were regular and predictable — people knew when and where to come. A fixed venue and schedule removes decision fatigue for attendees and builds the habit of attendance. If the location or time changes frequently, participation drops because people cannot plan around uncertainty.


**How?**

1. Negotiate with your masjid for a dedicated room and time slot — the masjid is the natural home for community education, and using it minimises costs.
2. If the masjid is unavailable, explore alternatives: a community centre, a member's home (for small halaqat), a rented space, or a school classroom on weekends.
3. Choose a time based on your survey results — typically after Maghrib for adult halaqat or Saturday/Sunday mornings for children's programmes.
4. Set the schedule for at least one academic term (10-12 weeks) to give the programme stability and allow curriculum planning.
5. Communicate the schedule widely: flyers at the masjid, WhatsApp announcements, social media, and personal invitations.
6. Arrange the space: seating, a whiteboard or screen, Qurans or handouts, and a children's area if families are attending.
7. Completion indicator: a confirmed venue and a published schedule of at least 10 weekly sessions, communicated to the community through at least two channels.` },
        { title: 'Launch the first session and establish a welcoming, structured learning environment', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 96:1",
              arabic: "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ",
              translation: "Read in the name of your Lord who created.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 79",
              translation: "The Prophet (peace be upon him) said: \"If Allah wants to do good to a person, He makes him comprehend the religion.\" Launching a structured learning environment opens the door to this divine favour. **II. Hadith**",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 69",
              translation: "Recorded in Volume 1, Book 3, Number 69: 'Facilitate things to people (concerning religious matters), and do not make it hard for them and give them good tidings...'",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

First impressions determine whether people return. A disorganised, unwelcoming, or overly rigid first session can kill a programme before it starts. The Prophet (peace be upon him) said, "Make things easy, do not make them difficult; give glad tidings, do not drive people away" (Bukhari). The first session must balance structure (so people feel their time is respected) with warmth (so people feel they belong). This is where the programme either gains momentum or loses it.


**How?**

1. Arrive early to set up the space: arrange seating in a circle or semi-circle (not lecture rows), prepare materials, test any audio-visual equipment, and set out refreshments.
2. Welcome attendees personally as they arrive — greet them by name if possible, introduce newcomers to each other.
3. Open with Quran recitation and a brief du'a for beneficial knowledge.
4. Have the teacher introduce themselves, outline the curriculum, and set expectations: session length, interaction style, homework (if any), and how questions will be handled.
5. Keep the first session slightly shorter than the standard length — leave people wanting more, not exhausted.
6. End with a clear preview of next week's topic to build anticipation.
7. Completion indicator: the first session has been held with at least 10 attendees, positive feedback has been collected, and the second session is confirmed.` },
        { title: 'Collect feedback after the first month and adjust the programme based on community input', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:104",
              arabic: "وَلْتَكُن مِّنكُمْ أُمَّةٌ يَدْعُونَ إِلَى الْخَيْرِ وَيَأْمُرُونَ بِالْمَعْرُوفِ وَيَنْهَوْنَ عَنِ الْمُنكَرِ",
              translation: "And let there be arising from you a nation inviting to all that is good, enjoining what is right and forbidding what is wrong.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
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
              kind: "hadith",
              ref: "Sunan Ibn Majah 250",
              translation: "The Prophet (peace be upon him) said: \"Seeking knowledge is an obligation upon every Muslim.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

No programme survives contact with reality unchanged. What looked good on paper may not match the community's energy, schedule, or learning pace. Collecting feedback after the first month shows humility and responsiveness — qualities the Prophet (peace be upon him) exemplified through his shura (consultation) with the companions. Adjusting based on feedback transforms a top-down programme into a community-owned institution.


**How?**

1. After four sessions, distribute a brief feedback form (5 questions maximum): Is the topic relevant? Is the pace too fast, too slow, or right? Is the time slot working? What would you change? Would you recommend this to a friend?
2. Also gather informal feedback by speaking to attendees after sessions — some people will share verbally what they would not write down.
3. Track attendance trends: are numbers growing, stable, or declining? A decline after week two signals a problem.
4. Meet with the teacher to share feedback and discuss adjustments — topic order, depth, interaction level, or session length.
5. Implement at least one visible change based on feedback, and announce it: "Based on your feedback, we are moving to X." This shows people that their input matters.
6. Set the next feedback checkpoint for month three.
7. Completion indicator: feedback has been collected from at least 50% of regular attendees, discussed with the teacher, and at least one adjustment has been implemented and communicated.` },
      ],
    },
    {
      title: 'Build a youth mentorship programme — invest in the next generation of community leaders',
      priority: 'high', tags: ['youth', 'mentorship', 'tarbiyah'],
      description: 'The Prophet (peace be upon him) invested deeply in young companions — Mu\'adh ibn Jabal, Usamah ibn Zayd, and Ali ibn Abi Talib were entrusted with leadership responsibilities in their teens and twenties. A structured mentorship programme ensures young Muslims have guidance, belonging, and a pathway to leadership within the community rather than seeking identity and purpose elsewhere.',
      subtasks: [
        { title: 'Identify 3-5 youth (ages 13-25) in your community who would benefit from mentorship', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 66:6",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا قُوا أَنفُسَكُمْ وَأَهْلِيكُمْ نَارًا",
              translation: "O you who have believed, protect yourselves and your families from a Fire.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 7138",
              translation: "The Prophet (peace be upon him) said: \"Each of you is a shepherd and each of you is responsible for his flock.\" Identifying youth who need mentorship is the first act of shepherding the next generation. **II. Hadith**",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 629",
              translation: "Recorded in Volume 1, Book 11, Number 629 as one of the seven shaded: 'a youth who has been brought up in the worship of Allah.' Also in Muslim 2248.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Youth who are not actively engaged by the community will be actively engaged by everything outside it — social media, peer pressure, ideological confusion, and environments that erode their faith. The Prophet (peace be upon him) said, "Seven will be shaded by Allah... a young person who grew up in the worship of Allah" (Bukhari). Identifying specific youth who need mentorship is the first step to providing the structured support that helps them become that young person. Vague concern for "the youth" accomplishes nothing — named, known individuals can be genuinely helped.


**How?**

1. Observe the youth at your masjid: who attends regularly? Who used to attend but has drifted? Who comes but seems disengaged or isolated?
2. Speak to parents, the imam, and youth programme leaders — ask who they are concerned about and who shows leadership potential that needs nurturing.
3. Look beyond the masjid: school friends of your children, neighbours' teenagers, university students new to the area.
4. Consider diversity: include youth at different stages — some struggling with faith, some strong but lacking direction, some with leadership potential but no platform.
5. Approach each young person (or their parents, for younger teens) and express genuine interest: "I would love to spend some time with you regularly — mentoring, learning together, or just talking."
6. Gauge their receptiveness. Forced mentorship does not work — the relationship must be voluntary.
7. Completion indicator: a list of 3-5 youth who have agreed (or whose parents have agreed) to participate in a mentorship relationship.` },
        { title: 'Recruit 2-3 mentors from the community — mature Muslims with diverse professional and life experience', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 17:24",
              arabic: "وَاخْفِضْ لَهُمَا جَنَاحَ الذُّلِّ مِنَ الرَّحْمَةِ وَقُل رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
              translation: "And lower to them the wing of humility out of mercy and say, \"My Lord, have mercy upon them as they brought me up when I was small.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 25:74",
              arabic: "وَالَّذِينَ يَقُولُونَ رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
              translation: "And those who say, \"Our Lord, grant us from among our wives and offspring comfort to our eyes and make us an example for the righteous.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
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

A single mentor can only offer one perspective. Youth benefit from exposure to multiple role models who demonstrate that Islam is lived successfully in diverse contexts — business, academia, trades, family life, community service. The Prophet (peace be upon him) did not mentor alone; he cultivated an entire community of adults who invested in the young. Recruiting multiple mentors also distributes the workload, preventing burnout and ensuring the programme survives if one mentor becomes unavailable.


**How?**

1. Identify community members who are: practising Muslims, emotionally mature, good listeners, patient, and available for at least two hours per month.
2. Look for diversity in profession, ethnicity, age, and life experience — a doctor, a tradesperson, a teacher, and a business owner will collectively offer far more than four people from the same background.
3. Approach potential mentors individually. Explain the programme vision, the time commitment, and what you are asking of them.
4. Provide basic mentorship guidelines: confidentiality, appropriate boundaries, active listening, and the difference between mentoring and lecturing.
5. If possible, arrange a brief training session — even a one-hour orientation on effective Islamic mentoring principles.
6. Match mentors with mentees based on compatibility: shared interests, complementary personalities, and the specific needs of each young person.
7. Completion indicator: 2-3 mentors have committed to the programme, received orientation, and been matched with mentees.` },
        { title: 'Design a simple mentorship framework — monthly meetings, topics, and check-in structure', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2674",
              translation: "The Prophet (peace be upon him) said: \"Whoever starts a good practice in Islam will have its reward and the reward of those who act upon it after him.\" A structured mentorship framework ensures the good practice is repeatable and scalable.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Unstructured mentorship often devolves into sporadic, unfocused meetings that neither party finds valuable. A simple framework ensures consistency, progress, and accountability without making the relationship feel clinical. The Prophet's tarbiyah (nurturing) of the companions was both relational and intentional — he combined personal warmth with purposeful teaching. Your framework should do the same.


**How?**

1. Set a minimum meeting frequency: at least twice per month, either in person or via video call, for 60-90 minutes each.
2. Create a flexible topic rotation covering key areas: faith and worship, character development, academic or career guidance, relationships and social skills, and community responsibility.
3. Design each meeting with a simple structure: 15 minutes of personal catch-up (how are you doing?), 30-40 minutes of focused discussion or activity, and 10 minutes of du'a and goal-setting for the next meeting.
4. Provide mentors with a one-page guide for each topic — suggested questions, relevant hadith or Quranic ayat, and discussion prompts. They do not need to be scholars; they need to be prepared.
5. Include at least one group activity per quarter where all mentors and mentees come together — a hike, a community service project, or a shared meal.
6. Establish a simple check-in method between meetings — a weekly text message asking "How is your week going?" maintains connection without requiring a full meeting.
7. Completion indicator: a written mentorship framework document covering meeting frequency, topic rotation, session structure, and quarterly group activities, distributed to all mentors.` },
        { title: 'Launch the programme and hold the first mentor-mentee meetings', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 31:13-14",
              arabic: "وَإِذْ قَالَ لُقْمَانُ لِابْنِهِ وَهُوَ يَعِظُهُ يَا بُنَيَّ لَا تُشْرِكْ بِاللَّهِ إِنَّ الشِّرْكَ لَظُلْمٌ عَظِيمٌ",
              translation: "And when Luqman said to his son while he was instructing him, \"O my son, do not associate anything with Allah. Indeed, association with Him is great injustice.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 7138",
              translation: "The Prophet (peace be upon him) said: \"Each of you is a shepherd, and each of you is responsible for his flock.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Planning without execution is a form of self-deception. The first meeting sets the tone for the entire relationship — it is where trust begins to form and where the mentee decides whether this is worth their time. The Prophet (peace be upon him) began his mentoring relationships with genuine personal interest ("How are you, O young man?") before moving to instruction. The first meeting must prioritise relationship over curriculum.


**How?**

1. Coordinate with all mentor-mentee pairs to schedule their first meetings within the same two-week window — this creates collective momentum.
2. For the first meeting, instruct mentors to focus 80% on getting to know their mentee: family background, interests, school or work life, goals, struggles, and what they hope to get from mentorship.
3. Share a meal together if possible — the Prophet (peace be upon him) frequently ate with those he was building relationships with. Breaking bread lowers barriers.
4. Have mentors share their own story honestly, including struggles — vulnerability from the mentor builds trust from the mentee.
5. At the end of the first meeting, agree on the next meeting date and one small commitment (e.g., "Read this short article and we will discuss it next time").
6. After all first meetings, gather mentor feedback: How did it go? Any concerns? Does the match feel right?
7. Completion indicator: all mentor-mentee pairs have completed their first meeting, with the second meeting scheduled and one initial commitment set.` },
        { title: 'Review the programme after three months — assess impact and refine the approach', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 103:1-3",
              arabic: "وَالْعَصْرِ إِنَّ الْإِنسَانَ لَفِي خُسْرٍ إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ",
              translation: "By time, indeed mankind is in loss, except for those who have believed and done righteous deeds and advised each other to truth and advised each other to patience.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Three months is long enough to see patterns and short enough to course-correct before problems become entrenched. Some matches may not be working. Some youth may have dropped out. Some mentors may be struggling with the time commitment. A formal review prevents the programme from quietly dying — which is the fate of most well-intentioned community initiatives. The principle of muhasabah (self-accounting) applies to institutions just as it applies to individuals.


**How?**

1. Survey both mentors and mentees separately with honest questions: Is the relationship valuable? Is the frequency right? What would you change? Do you want to continue?
2. Review attendance and consistency: How many of the planned meetings actually happened? If less than 75%, investigate why.
3. Meet with mentors as a group to share experiences (without naming mentees). What is working? What is not? What resources do they need?
4. Speak privately with any mentee who has disengaged — understand their reasons without pressuring them to return.
5. Make adjustments: re-match pairs if needed, adjust frequency, change the topic framework, or bring in guest speakers to supplement.
6. Celebrate successes — share anonymised wins with the community to build support and attract new mentors and mentees.
7. Completion indicator: a three-month review has been conducted with input from all participants, adjustments have been implemented, and a decision has been made on whether to expand, continue as is, or restructure the programme.` },
      ],
    },
    {
      title: 'Establish a community dispute resolution (sulh) process — prevent conflicts from escalating',
      priority: 'high', tags: ['sulh', 'conflict-resolution', 'justice'],
      description: 'The Quran says, "Reconciliation is best" (4:128) and commands believers to make peace between disputing parties (49:9). Most community conflicts — between families, between members and leadership, or between neighbours — escalate because there is no structured process for resolution. A sulh (reconciliation) process gives the community a pathway to justice and mercy before disputes reach courts or cause permanent rifts.',
      subtasks: [
        { title: 'Identify 2-3 respected, neutral community members to serve as sulh mediators', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:9",
              arabic: "وَإِن طَائِفَتَانِ مِنَ الْمُؤْمِنِينَ اقْتَتَلُوا فَأَصْلِحُوا بَيْنَهُمَا",
              translation: "And if two factions among the believers should fight, then make settlement between the two.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 4:35",
              arabic: "وَإِنْ خِفْتُمْ شِقَاقَ بَيْنِهِمَا فَابْعَثُوا حَكَمًا مِّنْ أَهْلِهِ وَحَكَمًا مِّنْ أَهْلِهَا",
              translation: "And if you fear dissension between the two, send an arbitrator from his people and an arbitrator from her people.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2707",
              translation: "The Prophet (peace be upon him) said: \"Making peace between people is better than voluntary prayer, fasting, and charity.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Effective mediation requires trust, neutrality, and wisdom — not just good intentions. The Prophet (peace be upon him) himself served as a mediator and appointed companions like Abu Bakr and Umar to resolve disputes. Selecting the right mediators is the foundation of the entire process. If disputants do not trust the mediators, they will not engage, and the process fails before it begins.


**How?**

1. Consult with the imam and community elders to identify individuals known for wisdom, patience, fairness, and discretion.
2. Look for people who are: respected across community factions (not aligned with any one group), emotionally calm under pressure, good listeners, and knowledgeable about basic Islamic rulings on disputes.
3. Approach each candidate privately, explain the role, and assess their willingness and availability.
4. Ensure diversity among mediators: include both men and women, different age groups, and different ethnic or cultural backgrounds represented in your community.
5. Provide a basic orientation covering Islamic principles of sulh, confidentiality requirements, and the mediator's role (facilitator, not judge).
6. Establish clear boundaries: mediators handle interpersonal and community disputes, not criminal matters or cases requiring legal intervention.
7. Completion indicator: 2-3 mediators have agreed to serve, received orientation, and are known to the imam and community leadership as the designated sulh committee.` },
        { title: 'Draft a simple sulh process document — how disputes are reported, mediated, and resolved', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:9",
              arabic: "وَإِن طَائِفَتَانِ مِنَ الْمُؤْمِنِينَ اقْتَتَلُوا فَأَصْلِحُوا بَيْنَهُمَا",
              translation: "And if two factions among the believers should fight, then make settlement between the two.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2693",
              translation: "The Prophet (peace be upon him) said: \"Shall I not inform you of something more excellent than fasting, prayer, and charity? Reconciliation between people, for corruption of relationships is the shaver.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A process without documentation is just a good idea. A written sulh process gives the community transparency, consistency, and accountability. It ensures every dispute is handled with the same fairness, regardless of who is involved. It also protects the mediators — when the process is documented, they are following a community-agreed framework, not making personal judgements that could be questioned.


**How?**

1. Draft a one-page process covering: how a dispute is reported (who do you contact?), initial assessment (is this appropriate for sulh or does it need legal intervention?), appointment of mediators, the mediation session format, and follow-up.
2. Define the mediation session structure: opening du'a, each party speaks uninterrupted, mediator summarises both positions, exploration of solutions, agreement on resolution, and closing du'a.
3. Include confidentiality rules: everything said in mediation stays in mediation. Mediators do not discuss cases outside the process.
4. Specify what happens if mediation fails: referral to the imam for advisory ruling (non-binding), referral to external mediation services, or agreement to disagree with mutual commitment to civil conduct.
5. Include Islamic principles that govern the process: justice (adl), reconciliation (sulh), and the prohibition of oppression (zulm).
6. Review the document with the imam and mediators for feedback before finalising.
7. Completion indicator: a written sulh process document, reviewed and approved by the imam and mediator committee, ready for presentation to the community.` },
        { title: 'Present the sulh process to the community and gain buy-in from leadership', done: false,
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
              ref: "Quran 49:10",
              arabic: "إِنَّمَا الْمُؤْمِنُونَ إِخْوَةٌ فَأَصْلِحُوا بَيْنَ أَخَوَيْكُمْ",
              translation: "The believers are but brothers, so make settlement between your brothers.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 49:9-10",
              arabic: "وَإِن طَآئِفَتَانِ مِنَ ٱلْمُؤْمِنِينَ ٱقْتَتَلُوا۟ فَأَصْلِحُوا۟ بَيْنَهُمَا ۖ فَإِنۢ بَغَتْ إِحْدَىٰهُمَا عَلَى ٱلْأُخْرَىٰ فَقَـٰتِلُوا۟ ٱلَّتِى تَبْغِى حَتَّىٰ تَفِىٓءَ إِلَىٰٓ أَمْرِ ٱللَّهِ ۚ فَإِن فَآءَتْ فَأَصْلِحُوا۟ بَيْنَهُمَا بِٱلْعَدْلِ وَأَقْسِطُوٓا۟ ۖ إِنَّ ٱللَّهَ يُحِبُّ ٱلْمُقْسِطِينَ إِنَّمَا ٱلْمُؤْمِنُونَ إِخْوَةٌۭ فَأَصْلِحُوا۟ بَيْنَ أَخَوَيْكُمْ ۚ وَٱتَّقُوا۟ ٱللَّهَ لَعَلَّكُمْ تُرْحَمُونَ",
              translation: "If two groups of the believers fight, you [believers] should try to reconcile them; if one of them is [clearly] oppressing the other, fight the oppressors until they submit to God’s command, then make a just and even-handed reconciliation between the two of them: God loves those who are even-handed. The believers are brothers, so make peace between your two brothers and be mindful of God, so that you may be given mercy.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 4919",
              translation: "The Prophet (peace be upon him) said: \"Shall I not inform you of what is better in degree than fasting, prayer, and charity? It is reconciling between people.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A dispute resolution process only works if the community knows it exists and trusts it. Presenting it publicly — with the endorsement of the imam and community leadership — legitimises the process and signals that the community takes internal conflict seriously. Without public buy-in, the sulh committee will be seen as a self-appointed group rather than a community institution.


**How?**

1. Request time during a Jumu'ah khutbah or post-prayer announcement to introduce the sulh process. The imam's endorsement is critical.
2. Prepare a brief, clear presentation: what the sulh committee is, who the mediators are, what types of disputes it handles, and how to request mediation.
3. Emphasise the Islamic foundation: quote Quran 49:9-10 and relevant hadith on reconciliation. Frame it as reviving a sunnah, not imposing bureaucracy.
4. Distribute the process document via the masjid's communication channels — email, WhatsApp, printed copies at the entrance.
5. Answer questions transparently. Common concerns include: "Who decides who is right?" (No one — the goal is reconciliation, not judgement), "Is it confidential?" (Yes, absolutely), and "What if the other party refuses?" (Participation is voluntary, but strongly encouraged).
6. Ask the community board or shura council to formally endorse the process, if such a body exists.
7. Completion indicator: the sulh process has been publicly presented with the imam's endorsement, distributed through community channels, and formally endorsed by community leadership.` },
        { title: 'Handle the first dispute through the sulh process — learn from the experience', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:35",
              arabic: "وَإِنْ خِفْتُمْ شِقَاقَ بَيْنِهِمَا فَابْعَثُوا حَكَمًا مِّنْ أَهْلِهِ وَحَكَمًا مِّنْ أَهْلِهَا",
              translation: "And if you fear dissension between the two, send an arbitrator from his people and an arbitrator from her people.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2605",
              translation: "The Prophet (peace be upon him) said: \"He who makes peace between people by conveying good information or saying good things is not a liar.\" Learning from the first dispute refines the community's capacity for justice.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Theory becomes practice only when tested. The first real case will reveal gaps in the process that no amount of planning could anticipate. Handling it well builds the committee's credibility; handling it poorly — but learning from it — still advances the institution. The Prophet (peace be upon him) refined practices through experience, and the companions understood that growth comes through action, not perfection.


**How?**

1. When the first dispute is reported, follow the documented process exactly — this tests whether it works as written.
2. Assign two mediators (not one) to the case for mutual support, witness integrity, and balanced perspective.
3. Conduct the mediation session as outlined: du'a, uninterrupted sharing, summarising, solution exploration, and agreement.
4. Document the outcome (in a confidential file accessible only to the sulh committee) — not the personal details, but the process steps taken and their effectiveness.
5. After the case is closed, meet as a mediator team to debrief: What worked? What was awkward or unclear? What would we do differently?
6. Update the process document based on lessons learned.
7. Completion indicator: one dispute has been mediated through the sulh process, a debrief has been conducted, and at least one process improvement has been documented.` },
        { title: 'Train additional mediators and establish an annual rotation to prevent burnout', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:114",
              arabic: "لَا خَيْرَ فِي كَثِيرٍ مِنْ نَجْوَاهُمْ إِلَّا مَنْ أَمَرَ بِصَدَقَةٍ أَوْ مَعْرُوفٍ أَوْ إِصْلَاحٍ بَيْنَ النَّاسِ",
              translation: "There is no good in most of their private conversation except for those who enjoin charity or kindness or reconciliation between people.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2707",
              translation: "The Prophet (peace be upon him) said: \"Making peace between people is better than voluntary prayer, fasting, and charity.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A sulh process that depends on the same two or three people is fragile. If those individuals move, burn out, or become involved in a dispute themselves, the institution collapses. Training additional mediators builds institutional resilience and ensures the process outlives any single participant. Rotation also prevents mediators from accumulating too much informal power — a risk in any community adjudication role.


**How?**

1. After the first 2-3 cases, invite community members who showed interest during the public presentation to join a mediator training cohort.
2. Design a training programme covering: active listening, Islamic principles of dispute resolution, confidentiality ethics, managing power imbalances, and recognising when to refer cases externally.
3. Have experienced mediators lead the training using real (anonymised) case studies from the initial cases.
4. Pair new mediators with experienced ones for their first two cases as co-mediators — learning by doing under supervision.
5. Establish an annual rotation: mediators serve 2-year terms, with staggered rotation so institutional knowledge is always retained.
6. Maintain a roster of at least five trained mediators so that for any given case, two neutral mediators are available.
7. Completion indicator: at least two additional mediators have been trained and co-mediated their first case, and a rotation schedule has been established.` },
      ],
    },
    {
      title: 'Develop dedicated programming for women — ensure equitable access and voice in community life',
      priority: 'high', tags: ['women', 'equity', 'programming'],
      description: 'The Prophet (peace be upon him) dedicated specific time to teach and address the women of the community when they asked for it (Bukhari). Women\'s programming is not a separate, lesser track — it is essential infrastructure that ensures half the community has access to education, leadership development, social connection, and a voice in community decisions. Communities that neglect women\'s programming lose families.',
      subtasks: [
        { title: 'Survey women in the community to understand their specific needs, interests, and barriers to participation', done: false,
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
              ref: "Quran 9:71",
              arabic: "وَالْمُؤْمِنُونَ وَالْمُؤْمِنَاتُ بَعْضُهُمْ أَوْلِيَاءُ بَعْضٍ يَأْمُرُونَ بِالْمَعْرُوفِ وَيَنْهَوْنَ عَنِ الْمُنكَرِ",
              translation: "The believing men and believing women are allies of one another. They enjoin what is right and forbid what is wrong.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Musnad Ahmad 26238",
              translation: "The Prophet (peace be upon him) said: \"Women are the twin halves of men.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Women's needs in community life are often assumed rather than asked about — and the assumptions are frequently wrong. Some women want educational programming; others want social connection; others want leadership roles; others want practical support like childcare during events. The only way to know is to ask.

**How?**

1. Create a survey designed specifically for women, asking: What programmes would you attend? What prevents you from attending current events (childcare, timing, transport, unwelcoming environment)? What skills or knowledge do you want to develop? Do you feel your voice is heard in community decisions?
2. Distribute the survey through women-specific channels — women's WhatsApp groups, personal invitations from trusted sisters, and paper forms available in the women's section of the masjid.
3. Ensure anonymity so respondents feel safe being honest, especially about barriers and grievances.
4. Include open-ended questions — the most valuable insights often come from write-in responses.
5. Have a trusted woman in the community champion the survey — respondents are more likely to engage when approached by a peer.
6. Compile results into a clear summary of priorities, barriers, and proposed solutions.
7. Completion indicator: a completed survey with responses from at least 15 women, compiled into a summary document identifying top programming priorities and barriers to participation.` },
        { title: 'Establish a weekly women\'s halaqa or gathering led by a qualified female teacher', done: false,
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
              ref: "Quran 9:71",
              arabic: "وَالْمُؤْمِنُونَ وَالْمُؤْمِنَاتُ بَعْضُهُمْ أَوْلِيَاءُ بَعْضٍ",
              translation: "The believing men and believing women are allies of one another.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Ibn Majah 250",
              translation: "The Prophet (peace be upon him) said: \"Seeking knowledge is an obligation upon every Muslim.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A dedicated women's space for learning and connection is a Prophetic sunnah, not a modern accommodation. The women of the early community had their own learning sessions, asked their own questions, and developed their own scholarship. A weekly gathering provides consistent access to knowledge, builds sisterhood (ukhuwwah), and creates a platform from which women can participate more fully in all aspects of community life.


**How?**

1. Based on survey results, identify the most requested topic areas — common priorities include Quran tafsir, fiqh of women's issues, parenting in Islam, personal development, and spiritual growth.
2. Recruit a qualified female teacher — a graduate of Islamic studies, a certified Quran teacher, or a knowledgeable woman the community respects. If none is local, arrange for virtual instruction.
3. Secure a comfortable, private space — the women's area of the masjid, a community centre room, or a rotating host home.
4. Set a consistent day and time based on survey data, and commit to it for at least one term (10-12 weeks).
5. Address the top participation barrier: if childcare is the issue, arrange supervised children's activities during the halaqa. If transport is the barrier, organise carpools.
6. Promote the gathering through personal invitation — women are far more likely to attend when personally invited by someone they know.
7. Completion indicator: a weekly women's gathering has been launched, held for at least four consecutive weeks, with consistent attendance of at least 8 women.` },
        { title: 'Ensure women have representation on community decision-making bodies (shura)', done: false,
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
              ref: "Sahih al-Bukhari 4784",
              translation: "The Prophet (peace be upon him) used to consult his wives, and Umm Salamah's counsel during the Treaty of Hudaybiyyah was acted upon, demonstrating the value of women's counsel in community affairs.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Quran describes the believers as those "whose affairs are conducted by shura (consultation) among them" (42:38). Shura that excludes women is incomplete shura. The Prophet (peace be upon him) consulted Umm Salamah during the crisis at Hudaybiyyah, and her counsel proved decisive. Women who have no voice in community decisions will eventually disengage from the community — and when mothers disengage, families follow.


**How?**

1. Review the current governance structure of your masjid or community organisation: who sits on the board, the shura council, and key committees? How many are women?
2. If women are absent or underrepresented, raise the issue with the imam and board — frame it as a sunnah revival, not a political demand.
3. Propose a specific, actionable step: "Let us add two women to the shura council for the next term" or "Let us create a women's advisory committee that reports directly to the board."
4. Identify capable, willing women in the community and encourage them to put their names forward — many qualified women do not volunteer because they have never been asked.
5. Ensure women's voices are not merely symbolic: they should have voting power (or equivalent influence) on decisions that affect the community, not just a seat at the table with no authority.
6. Advocate for women's representation in practical decisions: event planning, budget allocation, facility improvements (especially the women's section), and educational programming.
7. Completion indicator: at least one woman has been formally added to a community decision-making body, or a women's advisory committee has been established with a direct reporting line to community leadership.` },
        { title: 'Organise a community event specifically celebrating women\'s contributions', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 9:71",
              arabic: "وَالْمُؤْمِنُونَ وَالْمُؤْمِنَاتُ بَعْضُهُمْ أَوْلِيَاءُ بَعْضٍ",
              translation: "The believing men and believing women are allies of one another.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 4425",
              translation: "The Prophet (peace be upon him) praised the women of Madinah, saying they were not prevented by shyness from learning their religion. Celebrating women's contributions follows this Prophetic precedent.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

In many communities, women's contributions are invisible — they cook for events, teach children, clean the masjid, and organise behind the scenes without recognition. A dedicated event celebrating their contributions makes the invisible visible, signals to the entire community that women's work is valued, and inspires younger women and girls to contribute. The Prophet (peace be upon him) publicly praised women — Khadijah, Fatimah, Aisha, and many others — setting a model for honouring their role.


**How?**

1. Choose an occasion: Mothers' Day, the anniversary of Khadijah's acceptance of Islam, International Women's Day, or simply a "Community Appreciation" event focused on women.
2. Form a planning committee that includes both men and women — this event is for the whole community to honour its women, not just a women-only gathering.
3. Plan the programme: short speeches highlighting specific women's contributions (with their permission), a communal meal, awards or certificates of appreciation, and a segment where children can honour their mothers.
4. Include an Islamic grounding: a brief talk on the status of women in Islam, the contributions of female companions, and the community's commitment to women's empowerment.
5. Make it family-friendly with children's activities so mothers can actually enjoy the event.
6. Budget for it: do not expect women to cook for their own appreciation event. Cater the food or have the men prepare and serve the meal.
7. Completion indicator: a community event celebrating women's contributions has been held, with attendance from both men and women, and at least five specific women have been publicly recognised.` },
        { title: 'Address the physical space — ensure the women\'s section of the masjid is clean, comfortable, and dignified', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 442",
              translation: "The Prophet (peace be upon him) said: \"Do not prevent the female servants of Allah from attending the mosques of Allah.\" Ensuring the women's section is clean, comfortable, and dignified fulfills this Prophetic directive.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
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
          ],
          description: `**Why?**

The physical condition of the women's section communicates how much the community values women's presence. In too many masajid, the women's section is a cramped, poorly maintained afterthought — a basement, a balcony with obstructed views, or a room with broken audio. This is not from the sunnah. The Prophet's masjid had no barrier between the men's and women's sections, and he ensured women had dignified access. A clean, comfortable, well-equipped women's section is a prerequisite for all other women's programming.


**How?**

1. Physically inspect the women's section with a critical eye — or better yet, ask five women to walk through it and report their honest assessment.
2. Check for: cleanliness, temperature control, adequate lighting, functional audio (can women hear the imam clearly?), comfortable prayer space, clean restrooms, baby-changing facilities, and a wudu area.
3. Compare the women's section to the men's section. Any disparity is a problem to address.
4. Create a prioritised list of improvements, from immediate (deep clean, fix the speakers) to medium-term (paint, furniture) to long-term (expansion, renovation).
5. Present the list to the masjid board with a budget estimate. Frame it as an investment in community retention, not a cost.
6. Organise a volunteer clean-up and improvement day as an immediate first step — this costs nothing and sends a powerful message.
7. Completion indicator: the women's section has been assessed, a prioritised improvement list has been presented to the masjid board, and at least one tangible improvement has been completed.` },
      ],
    },
    {
      title: 'Establish a community treasury or waqf — build institutional financial sustainability',
      priority: 'high', tags: ['waqf', 'treasury', 'endowment'],
      description: 'Waqf (Islamic endowment) was the financial engine of Muslim civilisation for over a thousand years — it funded mosques, schools, hospitals, and public infrastructure. A community treasury or waqf transforms your community from donation-dependent to self-sustaining. The Prophet (peace be upon him) said, "When a person dies, their deeds cease except for three: ongoing charity (sadaqah jariyah)..." (Muslim). Waqf is the ultimate sadaqah jariyah.',
      subtasks: [
        { title: 'Research waqf models and identify which is most suitable for your community', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 1015",
              translation: "The Prophet (peace be upon him) said: \"When a man dies, his deeds come to an end except for three: sadaqah jariyah (ongoing charity), beneficial knowledge, or a righteous child who prays for him.\" A waqf is the institutional form of sadaqah jariyah.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Waqf is a sophisticated Islamic financial instrument with over 1,400 years of jurisprudential development. Launching one without understanding the models is like starting a business without a business plan. Different waqf models suit different community sizes and goals: a cash waqf (pooled funds invested for returns), a property waqf (real estate generating rental income), or a corporate waqf (an endowment managed by a registered entity). Choosing the wrong model can lead to legal complications, mismanagement, or failure to generate meaningful returns.


**How?**

1. Study the basic fiqh of waqf: it is an irrevocable dedication of assets whose proceeds benefit a specified purpose. The principal is preserved; only the returns are used.
2. Research modern waqf models: cash waqf funds (e.g., the model used by National Zakat Foundation or ISNA Endowment), property-based waqf (a building whose rent funds community programmes), and investment waqf (pooled capital invested in halal instruments).
3. Assess your community's capacity: a small community may start with a cash waqf pool; a larger one may aim for property acquisition.
4. Consult with an Islamic finance professional or a waqf-experienced imam to understand legal requirements in your jurisdiction (trust law, charity registration, tax implications).
5. Study successful examples: the Waqf of Uthman ibn Affan (the well of Rumah), modern examples like Awqaf SA, or local community endowments.
6. Document your findings in a brief report comparing 2-3 models with pros, cons, and suitability for your community.
7. Completion indicator: a written comparison of at least two waqf models with a recommendation for which is most suitable, informed by professional consultation.` },
        { title: 'Form a waqf committee with financial, legal, and community representation', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:58",
              arabic: "إِنَّ اللَّهَ يَأْمُرُكُمْ أَن تُؤَدُّوا الْأَمَانَاتِ إِلَىٰ أَهْلِهَا",
              translation: "Indeed, Allah commands you to render trusts to whom they are due.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 7138",
              translation: "The Prophet (peace be upon him) said: \"Each of you is a shepherd and each of you is responsible for his flock.\" A waqf committee with diverse representation ensures trust is properly stewarded.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A waqf is a perpetual institution that must outlive its founders. It requires financial expertise to invest wisely, legal knowledge to structure it correctly, and community trust to attract contributions. A committee with diverse expertise prevents the waqf from being captured by one individual or faction and ensures accountability. The historical corruption of waqf institutions — which contributed to their decline in the modern era — was almost always traceable to poor governance.


**How?**

1. Identify community members with relevant expertise: an accountant or financial advisor, a lawyer (preferably familiar with trust or charity law), a successful business person, and a respected community elder.
2. Approach each person individually, explain the vision, and ask them to serve on the founding committee.
3. Ensure the imam or a scholar is involved — the waqf must be structured in compliance with Islamic principles, and scholarly input legitimises it to potential contributors.
4. Define roles: chairperson (community leader), treasurer (financial expert), legal advisor, investment advisor, and secretary.
5. Establish governance rules: meeting frequency, decision-making process (consensus or majority), conflict of interest policy, and term limits.
6. Register the committee formally if required by local law — as a trust, charitable organisation, or other appropriate legal entity.
7. Completion indicator: a waqf committee of at least four members with documented roles, governance rules, and legal standing (or a plan to obtain it).` },
        { title: 'Draft the waqf deed — define the purpose, beneficiaries, and management structure', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:282",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا تَدَايَنتُم بِدَيْنٍ إِلَىٰ أَجَلٍ مُّسَمًّى فَاكْتُبُوهُ",
              translation: "O you who have believed, when you contract a debt for a specified term, write it down.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2737",
              translation: "Umar (may Allah be pleased with him) said: \"I got some land in Khaybar and came to the Prophet and said, 'I have got land which is the best I have ever had. What do you command regarding it?' He said: 'If you wish, make the property inalienable and give the profit from it to charity.'\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The waqf deed is the founding document that governs the endowment in perpetuity. It defines what the waqf funds, who benefits, who manages it, and what happens if circumstances change. A vague or poorly drafted deed leads to disputes, misuse, and eventual collapse. Historically, the most enduring waqf institutions had precise, well-drafted deeds that anticipated future challenges. This document is your community's covenant with future generations.


**How?**

1. Define the purpose clearly: "The proceeds of this waqf shall fund [specific purposes: masjid operations, Islamic education, community welfare, or a combination]."
2. Specify beneficiaries: the local Muslim community, specific programmes, or specific categories of people (students, widows, converts, etc.).
3. Define the management structure: who are the trustees? How are they appointed and replaced? What happens if a trustee resigns, dies, or is removed?
4. Include investment guidelines: the waqf capital must be invested in halal instruments only. Define acceptable investment categories and risk tolerance.
5. Specify distribution rules: what percentage of returns is distributed vs. reinvested? How are disbursements approved?
6. Include amendment provisions: how can the deed be modified if circumstances change (e.g., the original purpose becomes impossible)?
7. Completion indicator: a completed waqf deed, reviewed by both a legal professional and an Islamic scholar, ready for community presentation and formal execution.` },
        { title: 'Launch a fundraising campaign to seed the waqf with initial capital', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:261",
              arabic: "مَّثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنبَتَتْ سَبْعَ سَنَابِلَ",
              translation: "The example of those who spend their wealth in the way of Allah is like a seed of grain which grows seven ears; in each ear is a hundred grains.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 1006",
              translation: "The Prophet (peace be upon him) said: \"Charity does not decrease wealth.\" Fundraising to seed a waqf is an investment in multiplied reward.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A waqf without capital is an idea, not an institution. The initial seed campaign sets the financial foundation and, equally importantly, builds community ownership — people who contribute to the waqf become invested in its success. The Prophet (peace be upon him) praised Uthman ibn Affan for purchasing the well of Rumah and making it waqf — the companions gave generously because they understood the perpetual nature of the reward.


**How?**

1. Set a realistic seed target based on your chosen waqf model — enough to generate meaningful returns but achievable for your community's size.
2. Create a compelling campaign: explain what waqf is, how the proceeds will be used, the concept of sadaqah jariyah, and the specific community needs it will address.
3. Present the campaign during a Jumu'ah khutbah, community dinner, or dedicated fundraising event. The imam's endorsement is essential.
4. Offer multiple giving levels: one-time contributions, monthly pledges, and legacy gifts (bequests in wills).
5. Make giving easy: set up online donation links, bank transfer details, and in-person collection at the masjid.
6. Provide regular updates on progress toward the target — transparency builds trust and momentum.
7. Completion indicator: the fundraising campaign has launched, contributions have been received from at least 10 community members, and the waqf account holds its first deposit.` },
        { title: 'Make the first investment and distribute the first returns to the designated beneficiaries', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:261",
              arabic: "مَّثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنبَتَتْ سَبْعَ سَنَابِلَ فِي كُلِّ سُنبُلَةٍ مِّائَةُ حَبَّةٍ",
              translation: "The example of those who spend their wealth in the way of Allah is like a seed of grain which grows seven ears; in each ear is a hundred grains.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 3:92",
              arabic: "لَن تَنَالُوا الْبِرَّ حَتَّىٰ تُنفِقُوا مِمَّا تُحِبُّونَ",
              translation: "Never will you attain righteousness until you spend from that which you love.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 1631",
              translation: "The Prophet (peace be upon him) said: \"When a person dies, his deeds come to an end except for three: ongoing charity (sadaqah jariyah), knowledge that is benefited from, and a righteous child who prays for him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The first investment and distribution transforms the waqf from a concept into a functioning institution. It demonstrates to contributors that their money is working, builds credibility for future fundraising, and delivers tangible benefit to the community. The moment the first return is distributed — whether it funds a student's tuition, covers a family's groceries, or contributes to masjid operations — the waqf becomes real.


**How?**

1. With the committee's approval, select the first halal investment vehicle — options include Islamic savings accounts, sukuk (Islamic bonds), halal equity funds, or real estate.
2. Start conservatively: prioritise capital preservation for the first investment while the committee builds experience and confidence.
3. Monitor the investment according to the schedule defined in the waqf deed — monthly, quarterly, or annually.
4. When returns are generated, calculate the distributable amount according to the deed's rules.
5. Identify the first beneficiaries or programmes to receive funding, following the priority order in the waqf deed.
6. Document the distribution: amount, recipient or programme, date, and authorising committee members.
7. Completion indicator: the first investment has been made, returns have been generated, and at least one distribution has been made to a beneficiary or community programme, with full documentation.` },
      ],
    },
  ],

  // ── EXCELLENCE — Model community for the world ──
  ummah_community_excellence: [
    {
      title: "Build a model community replicable by other Muslim communities",
      priority: 'medium', tags: ['model', 'replication', 'ihsan'],
      description: "The Prophet (peace be upon him) built a community in Madinah that became the template for every Muslim society thereafter. This task aspires to develop your community into a documented, replicable model — not because it is perfect, but because its systems, processes, and culture can be studied and adapted by other communities seeking to strengthen themselves.",
      subtasks: [
        { title: "Document all community systems, processes, and governance structures", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:143",
              arabic: "وَكَذَٰلِكَ جَعَلْنَاكُمْ أُمَّةً وَسَطًا لِّتَكُونُوا شُهَدَاءَ عَلَى النَّاسِ",
              translation: "And thus we have made you a just community that you will be witnesses over the people.",
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
              translation: "The Prophet (peace be upon him) said: \"When a person dies, his deeds come to an end except for three: ongoing charity, beneficial knowledge, or a righteous child who prays for him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A model cannot be replicated if it is not documented. Most community operations exist only in the heads of a few key people — when they leave, the institutional knowledge leaves with them. The Quran itself is a documented, preserved system. Documentation transforms tacit knowledge into transferable assets: governance charters, programme curricula, financial processes, volunteer handbooks, and event playbooks that any community could adapt.


**How?**

1. List every system currently operating in your community: governance, education, finances, mutual aid, youth programme, outreach, dispute resolution, and facilities management.
2. For each system, document: purpose, key processes, roles and responsibilities, tools used, and lessons learned.
3. Use a consistent format: a one-page overview per system, with links to detailed process documents.
4. Store documentation in an accessible, version-controlled location (shared drive, wiki, or printed manual).
5. Have each system owner review their documentation for accuracy.
6. Identify undocumented systems and prioritise them for documentation.
7. Completion indicator: at least 8 community systems documented in a consistent format, reviewed by system owners, and stored in an accessible location.` },
        { title: "Identify what makes your community distinctive and worth replicating", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:110",
              arabic: "كُنتُمْ خَيْرَ أُمَّةٍ أُخْرِجَتْ لِلنَّاسِ تَأْمُرُونَ بِالْمَعْرُوفِ وَتَنْهَوْنَ عَنِ الْمُنكَرِ",
              translation: "You are the best nation produced for mankind. You enjoin what is right and forbid what is wrong.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2674",
              translation: "The Prophet (peace be upon him) said: \"Whoever starts a good practice in Islam will have its reward and the reward of those who act upon it after him.\" Building a replicable model is a form of sadaqah jariyah.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Not everything a community does is worth replicating — some things are contextual, some are mediocre, and some are genuinely excellent. Identifying your distinctive strengths — the things you do better or differently than most communities — focuses the replication effort on what actually adds value, rather than producing a generic community manual that inspires no one.

**How?**

1. Conduct an honest self-assessment: what do visitors and new members most often praise about your community?
2. Survey long-time members: what keeps them here? What would they miss most if they moved?
3. Compare (humbly) with other communities you have visited or partnered with: where do you genuinely excel?
4. Ask external observers — interfaith partners, civic leaders, or Muslim visitors — what stood out about your community.
5. Distil findings into 3-5 "signature strengths" that are both distinctive and transferable.
6. For each strength, document: what it is, how it developed, what sustains it, and what conditions make it possible.
7. Completion indicator: a documented list of 3-5 signature strengths with supporting evidence and analysis, validated by both internal members and external observers.` },
        { title: "Create a community playbook that other communities can adapt", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 7:181",
              arabic: "وَمِمَّنْ خَلَقْنَا أُمَّةٌ يَهْدُونَ بِالْحَقِّ وَبِهِ يَعْدِلُونَ",
              translation: "Among those We created are a group of people who guide with truth and act justly according to it.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 1017a",
              translation: "The Prophet (peace be upon him) said: \"Whoever introduces a good practice in Islam that is followed after him will have the reward of it and the reward of those who follow it, without that detracting from their rewards in the slightest.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) did not just build one community — he sent teachers, governors, and models to new communities so they could replicate the Madinah standard. A playbook is the modern equivalent: a practical guide that another community can pick up and adapt to their context. Without a playbook, your community's success remains local; with one, it becomes a contribution to the broader ummah.


**How?**

1. Compile the system documentation and signature strengths into a structured playbook format.
2. Organise by community lifecycle: getting started, core obligations, growth programmes, excellence initiatives.
3. For each section, include: the principle behind it, the practical steps, common pitfalls, and adaptation notes for different contexts (small vs. large community, urban vs. rural, etc.).
4. Write in accessible, jargon-free language that a community leader with no prior exposure to your model can follow.
5. Have the playbook reviewed by leaders from 2-3 other communities for clarity and usefulness.
6. Publish in both digital (PDF, website) and print formats.
7. Completion indicator: a completed playbook of at least 30 pages, reviewed by external community leaders, and published in at least one format.` },
        { title: "Host a community leadership retreat for leaders from other communities", done: false,
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
              ref: "Quran 3:104",
              arabic: "وَلْتَكُن مِّنكُمْ أُمَّةٌ يَدْعُونَ إِلَى الْخَيْرِ وَيَأْمُرُونَ بِالْمَعْرُوفِ وَيَنْهَوْنَ عَنِ الْمُنكَرِ",
              translation: "And let there be arising from you a nation inviting to good, enjoining what is right and forbidding what is wrong.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) hosted delegations from across Arabia, teaching them by example and sending them back equipped to build their own communities. A leadership retreat invites other community leaders to experience your model firsthand — to observe, ask questions, and receive practical guidance. This is higher-impact than simply distributing a playbook because it builds relationships and allows hands-on learning that documents alone cannot provide.


**How?**

1. Identify 3-5 communities in your region or beyond that have expressed interest in strengthening their own structures.
2. Design a 2-day retreat: day one focused on observing your community's systems in action (attend a halaqa, observe a shura meeting, tour the facilities), day two focused on workshops and Q&A.
3. Prepare presenters from your community who can explain their systems clearly and honestly, including failures and lessons learned.
4. Provide each attendee with a copy of the community playbook and a template toolkit they can customise.
5. Facilitate a peer exchange: attendees share their own best practices and challenges.
6. Follow up at 30, 60, and 90 days to support implementation in their communities.
7. Completion indicator: a leadership retreat attended by leaders from at least 3 external communities, with documented feedback and at least one community reporting that they implemented a practice learned at the retreat.` },
        { title: "Establish a mentorship programme pairing your community with a developing community", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:13",
              arabic: "يَا أَيُّهَا النَّاسُ إِنَّا خَلَقْنَاكُم مِّن ذَكَرٍ وَأُنثَىٰ وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا",
              translation: "O mankind, indeed We have created you from male and female and made you peoples and tribes that you may know one another.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2586",
              translation: "The Prophet (peace be upon him) said: \"The parable of the believers in their affection, mercy, and compassion for each other is that of a body. When any limb aches, the whole body reacts with sleeplessness and fever.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) paired experienced Companions with newer Muslims — Mu'adh ibn Jabal was sent to Yemen not just to teach but to mentor the community's development. A community-to-community mentorship is the most sustainable form of replication: an ongoing relationship where your community shares its experience and the partner community adapts it to their context, with regular check-ins, problem-solving, and mutual learning.


**How?**

1. Identify a developing Muslim community that has expressed a desire for guidance — through your regional network or direct outreach.
2. Establish a formal mentorship agreement: duration (at least 12 months), goals, communication frequency, and mutual expectations.
3. Pair key leaders: your imam with theirs, your youth director with theirs, your treasurer with theirs.
4. Schedule monthly check-ins (virtual or in-person) focused on a specific area each month (governance, finance, education, etc.).
5. Share relevant documentation and templates, adapted to their context.
6. Visit each other's communities at least once during the mentorship period.
7. Completion indicator: a 12-month mentorship with at least one partner community, with monthly check-ins documented and at least 3 systems or practices successfully adapted by the partner community.` },
      ],
    },
    {
      title: "Contribute to global ummah solidarity and mutual support",
      priority: 'medium', tags: ['global-ummah', 'solidarity', 'aid'],
      description: " This task extends the community's concern beyond local boundaries to active solidarity with the global ummah — supporting Muslims in crisis, amplifying suppressed voices, and contributing to the collective strength of the worldwide Muslim community.",
      subtasks: [
        { title: "Establish a global ummah awareness programme in your community", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 21:92",
              arabic: "إِنَّ هَٰذِهِ أُمَّتُكُمْ أُمَّةً وَاحِدَةً وَأَنَا رَبُّكُمْ فَاعْبُدُونِ",
              translation: "Indeed this, your community, is one community, and I am your Lord, so worship Me.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 49:10",
              arabic: "إِنَّمَا الْمُؤْمِنُونَ إِخْوَةٌ",
              translation: "The believers are but brothers.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2586",
              translation: "The Prophet (peace be upon him) said: \"The believers in their mutual kindness, compassion, and sympathy are just like one body. When one of the limbs suffers, the whole body responds to it with wakefulness and fever.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Many Muslim communities are so absorbed in local concerns that they become disconnected from the suffering and triumphs of the global ummah. The Prophet (peace be upon him) wept when he heard of injustice against any believer, regardless of where they lived. An awareness programme ensures your community knows what is happening to their brothers and sisters around the world — because knowledge precedes action, and ignorance enables indifference.


**How?**

1. Designate a "global ummah liaison" responsible for tracking major issues affecting Muslims worldwide.
2. Include a 2-minute "global ummah update" in weekly Jumu'ah announcements covering one current issue.
3. Create a monthly bulletin (email or printed) with brief summaries of 3-5 global ummah issues: conflicts, humanitarian crises, positive developments, and opportunities to help.
4. Post a world map at the masjid highlighting areas where Muslims are in crisis — update it regularly.
5. Organise a quarterly "ummah awareness evening" with a deeper dive into one issue, including a guest speaker or documentary.
6. Always pair awareness with action: every update should include one thing community members can do (dua, donation, letter-writing, volunteering).
7. Completion indicator: a functioning awareness programme with weekly announcements and monthly bulletins running for at least 3 months.` },
        { title: "Partner with established Muslim aid organisations for targeted relief", done: false,
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
              ref: "Quran 59:9",
              arabic: "وَيُؤْثِرُونَ عَلَىٰ أَنفُسِهِمْ وَلَوْ كَانَ بِهِمْ خَصَاصَةٌ",
              translation: "And they give preference [to others] over themselves, even though they are in privation.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6011",
              translation: "The Prophet (peace be upon him) said: \"None of you truly believes until he loves for his brother what he loves for himself.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Individual goodwill without institutional channels is inefficient and often ineffective. The Prophet (peace be upon him) organised community resources through the bayt al-mal and dispatched them through trusted agents. Established Muslim aid organisations (e.g., Islamic Relief, Muslim Aid, UNHCR Muslim partnerships) have the logistics, expertise, and access to deliver help where it is needed most. Partnering with them multiplies your community's impact far beyond what isolated donations could achieve.


**How?**

1. Research reputable Muslim aid organisations: check their track record, financial transparency, and alignment with Islamic principles (no riba in operations, proper zakat distribution).
2. Select 2-3 organisations that focus on different areas: emergency relief, long-term development, and advocacy.
3. Establish a formal partnership: designate your community as a local fundraising partner or volunteer hub.
4. Organise at least 2 fundraising campaigns per year for specific crises or programmes — people give more generously to specific, tangible causes.
5. Invite representatives from partner organisations to speak at your community to build connection and trust.
6. Track total contributions and share impact reports with the community.
7. Completion indicator: formal partnerships with at least 2 aid organisations, with at least 2 campaigns completed and total contributions documented.` },
        { title: "Advocate for the rights of oppressed Muslims through civic channels", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 8:73",
              arabic: "**Translation:** And those who disbelieve are allies of one another, (and) if you (Muslims of the whole world collectively) do not do so [i.e. become allies, as one united block under one Khalifah (a chief Muslim ruler for the whole Muslim world) to make victorious Allâh’s religion of Islâmic Monotheism], there will be Fitnah (wars, battles, polytheism) and oppression on the earth, and a great mischief and corruption (appearance of polytheism).",
              translation: "And those who disbelieve are allies of one another, (and) if you (Muslims of the whole world collectively) do not do so [i.e. become allies, as one united block under one Khalifah (a chief Muslim ruler for the whole Muslim world) to make victorious Allâh’s religion of Islâmic Monotheism], there will be Fitnah (wars, battles, polytheism) and oppression on the earth, and a great mischief and corruption (appearance of polytheism).",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1240",
              translation: "Narrated Abu Huraira:I heard Allah's Messenger (ﷺ) saying, \"The rights of a Muslim on the Muslims are five: to respond to the salaam, visiting the sick, to follow the funeral processions, to accept an invitation, and to reply to those who sneeze. (see Hadith)",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 393",
              translation: "Narrated Maimun bin Siyah that he asked Anas bin Malik, \"O Abu Hamza! What makes the life and property of a person sacred?\" He replied, \"Whoever says, 'None has the right to be worshipped but Allah', faces our Qibla during the prayers, prays like us and eats our slaughtered animal, then he is a Muslim, and has got the same rights and obligations as other Muslims have",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 624",
              translation: "Recorded in Sahih al-Bukhari 624 (Volume 3), where the Prophet explains that helping an oppressor means 'preventing him from oppressing others.'",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) said: "Help your brother whether he is an oppressor or oppressed" (Bukhari) — helping the oppressor means stopping their oppression, and helping the oppressed means defending their rights. Advocacy through civic channels — contacting elected officials, participating in public consultations, supporting human rights organisations — is the modern application of this principle. Silence in the face of oppression makes the ummah complicit; strategic advocacy makes it a force for justice.


**How?**

1. Identify 1-2 global ummah issues where civic advocacy in your country can have impact (e.g., foreign policy, sanctions, refugee resettlement, trade relations with oppressive regimes).
2. Research the civic channels available: contacting elected representatives, submitting public comments, joining advocacy coalitions, and engaging with human rights bodies.
3. Educate community members on how to write effective letters, make phone calls, and attend public meetings — provide templates and talking points.
4. Organise a community advocacy day: a coordinated effort where multiple members contact their representatives on the same issue on the same day.
5. Build alliances with non-Muslim human rights organisations that share the same advocacy goals — coalition voices are louder than isolated ones.
6. Track and report outcomes: how many letters were sent, what responses were received, and any policy changes influenced.
7. Completion indicator: at least one coordinated advocacy campaign with documented participation from at least 20 community members and a record of responses received.` },
        { title: "Support Muslim refugees and immigrants in your area as a community obligation", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:10",
              arabic: "إِنَّمَا الْمُؤْمِنُونَ إِخْوَةٌ",
              translation: "The believers are but brothers.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6011",
              translation: "The Prophet (peace be upon him) said: \"The believers in their mutual kindness, compassion, and sympathy are just like one body. When one of the limbs suffers, the whole body responds to it with wakefulness and fever.\" Supporting refugees fulfills this communal obligation.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The entire framework of the Madinah community was built on the hijrah — the migration of the Muhajirun and the embrace of the Ansar. Supporting refugees and immigrants is not charity; it is the Prophetic DNA of the ummah. The Ansar shared their homes, their wealth, and their social capital with the newcomers. If Muslim refugees arrive in your area and your community does not mobilise to receive them, you have failed one of the most fundamental tests of ummah solidarity.


**How?**

1. Connect with local resettlement agencies to learn when and where Muslim refugees and immigrants are being settled in your area.
2. Form a welcoming committee of 5-8 community members with specific roles: housing support, employment assistance, school enrolment, language tutoring, and social integration.
3. Prepare a "welcome package" for new arrivals: essential household items, local orientation guide, community contacts, and an invitation to the masjid.
4. Pair each new family with a host family from the community for the first 6 months — the Prophetic model of personal pairing.
5. Advocate for refugee rights and services through the civic channels identified in the advocacy task.
6. Track outcomes: families supported, employment secured, children enrolled in school, and integration milestones.
7. Completion indicator: a functioning welcoming programme that has supported at least 3 refugee or immigrant families over 6 months with documented outcomes.` },
        { title: "Establish a regular qunut and dua programme for the global ummah", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:286",
              arabic: "رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا ۚ رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِن قَبْلِنَا",
              translation: "Our Lord, do not impose blame upon us if we have forgotten or erred. Our Lord, and lay not upon us a burden like that which You laid upon those before us.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 1427",
              translation: "The Prophet (peace be upon him) said: \"The qunut (supplication) is to be recited in witr prayer.\" He would supplicate for the Muslim ummah in his qunut.",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) made qunut al-nazilah (supplication during calamity) for specific communities and individuals by name — he did not offer generic prayers. Du'a is not a passive last resort; it is the believer's most powerful weapon and the expression of a heart that genuinely feels the pain of the ummah. A regular, specific dua programme keeps the global ummah in the hearts of your community, trains children in empathy, and fulfils the minimum obligation of the "weakest of faith" — feeling with the heart.


**How?**

1. Include a specific dua for the global ummah in every congregational prayer — after the fard prayer or during qunut in witr/fajr.
2. Name specific communities and causes: "O Allah, relieve the suffering of our brothers and sisters in [specific location]" — specificity creates connection.
3. Update the dua list monthly based on the global ummah awareness programme.
4. Teach the community the Prophetic duas for the oppressed and for relief from calamity.
5. Involve youth: ask young members to research one global ummah issue each month and present it briefly before the dua is made.
6. Display the current dua list at the masjid entrance so those praying individually can include these causes.
7. Completion indicator: a regular dua programme maintained for at least 3 months with monthly updates, specific naming of causes, and visible community engagement.` },
      ],
    },
    {
      title: "Establish institutional sadaqah jariyah for intergenerational benefit",
      priority: 'medium', tags: ['waqf', 'sadaqah-jariyah', 'legacy'],
      description: "The Prophet (peace be upon him) said: 'When a person dies, their deeds end except for three: ongoing charity, beneficial knowledge, and a righteous child who prays for them' (Muslim). This task builds institutional forms of sadaqah jariyah — endowments, educational trusts, and infrastructure — that serve the community not just today but for generations to come.",
      subtasks: [
        { title: "Identify and acquire a permanent community property (masjid or centre)", done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 1015",
              translation: "The Prophet (peace be upon him) said: \"When a man dies, his deeds come to an end except for three: sadaqah jariyah (ongoing charity), beneficial knowledge, or a righteous child who prays for him.\" Acquiring a permanent community property is among the greatest forms of ongoing charity.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 3:92",
              arabic: "لَن تَنَالُوا الْبِرَّ حَتَّىٰ تُنفِقُوا مِمَّا تُحِبُّونَ",
              translation: "Never will you attain the good [reward] until you spend [in the way of Allah] from that which you love.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The first act of the Prophet (peace be upon him) upon arriving in Madinah was to build the masjid. A rented space is inherently unstable — leases end, landlords change terms, and the community lives in perpetual uncertainty. A permanently owned property is the single most impactful sadaqah jariyah a community can establish: it provides a guaranteed home for worship, education, and gathering for every generation that follows, and it anchors the Muslim presence in the locality permanently.


**How?**

1. Assess the community's current property situation: are you renting? How long is the lease? What are the risks of displacement?
2. Form a property acquisition committee with members experienced in real estate, law, and finance.
3. Define the requirements: location (accessible to the community), size (current and projected needs), zoning (must allow religious use), and budget.
4. Research funding models: community fundraising, Islamic finance (murabaha or musharakah for property purchase), grants from national Muslim organisations, and waqf contributions.
5. Develop a phased fundraising plan: a deposit, then mortgage-free ownership as the goal — avoid riba-based financing.
6. Secure the property and register it as a community waqf so it cannot be sold or diverted from its purpose.
7. Completion indicator: a property identified, a fundraising plan in progress with at least 30% of the target raised, and legal advice obtained on waqf registration.` },
        { title: "Establish an Islamic scholarship fund for community youth", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:261",
              arabic: "مَّثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنبَتَتْ سَبْعَ سَنَابِلَ",
              translation: "The example of those who spend their wealth in the way of Allah is like a seed which grows seven ears; in each ear is a hundred grains.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
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
              kind: "hadith",
              ref: "Sahih al-Bukhari 1410",
              translation: "The Prophet (peace be upon him) said: \"When a person dies, his deeds come to an end except for three: ongoing charity, beneficial knowledge, or a righteous child who prays for him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

 Education is the most leveraged investment a community can make — one scholarship can transform a life, a family, and eventually the community itself. Many young Muslims cannot afford higher education, Islamic studies, or vocational training. A scholarship fund removes financial barriers and signals that the community invests in its future, not just its present.

**How?**

1. Define the fund's scope: academic scholarships, Islamic studies sponsorships, vocational training grants, or a combination.
2. Set initial criteria: financial need, academic merit, community involvement, and commitment to serve the community upon completion.
3. Establish the fund as a separate, protected account within the community treasury.
4. Launch a dedicated fundraising campaign targeting community members who value education — frame it as sadaqah jariyah because the knowledge will benefit others for generations.
5. Award the first scholarships through a transparent application and selection process with a diverse committee.
6. Require scholarship recipients to give back: a presentation to the community, mentorship of younger students, or a year of volunteer service.
7. Completion indicator: a funded scholarship account with clear criteria, at least 2 scholarships awarded, and a feedback mechanism from recipients.` },
        { title: "Plant a community orchard or garden as a living sadaqah jariyah", done: false,
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
              ref: "Sahih al-Bukhari 2348",
              translation: "Narrated Abu Huraira:Once the Prophet (ﷺ) was narrating (a story), while a bedouin was sitting with him. \"One of the inhabitants of Paradise will ask Allah to allow him to cultivate the land. Allah will ask him, 'Are you not living in the pleasures you like?' He will say, 'Yes, but I like to cultivate the land.' \" The Prophet (ﷺ) added, \"When the man (will be permitted he) will sow the seeds and the plants will grow up and get ripe, ready for reaping and so on till it will be as huge as mountains within a wink. Allah will then say to him, 'O son of Adam! Take here you are, gather (the yield); nothing satisfies you.' \" On that, the bedouin said, \"The man must be either from Quraish (i.e. an emigrant) or an Ansari, for they are farmers, whereas we are not farmers.\" The Prophet (ﷺ) smiled (at this)",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 513",
              translation: "Recorded in Sahih al-Bukhari 513 (Volume 3) and Sahih Muslim 3764, which state that a Muslim's planting from which others eat is regarded as a 'charitable gift' or 'charity.'",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) said: "If a Muslim plants a tree or cultivates a crop, and a bird, human, or animal eats from it, it is counted as charity for them" (Bukhari & Muslim). A community garden or orchard is a beautiful, tangible form of ongoing charity: it feeds people, teaches children, connects the community to the earth, and generates reward every time a creature benefits from it. It is also a powerful symbol of the community's commitment to stewardship (khalifah) and long-term thinking.


**How?**

1. Identify available land: the masjid grounds, a community-owned plot, or a partnership with a local garden programme.
2. Assess growing conditions: climate, soil, water access, and sunlight.
3. Choose plantings that are productive and sustainable: fruit trees (apple, fig, olive, pomegranate — all mentioned in the Quran), vegetable beds, and herbs.
4. Organise a community planting day as an event — involve families, children, and elders.
5. Establish a maintenance rota: watering, weeding, harvesting, and composting.
6. Distribute the harvest: first to community members in need, then to the broader community, then to neighbours and food banks.
7. Completion indicator: a planted and maintained garden or orchard producing its first harvest, with documented distribution to at least 3 beneficiary groups.` },
        { title: "Create a community library and resource centre", done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 3641",
              translation: "The Prophet (peace be upon him) said: \"The scholars are the heirs of the Prophets. The Prophets did not leave behind dinars or dirhams; rather they left behind knowledge. Whoever acquires it has acquired an abundant share.\" A community library preserves and spreads this inherited knowledge.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
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
          ],
          description: `**Why?**

The first word revealed to the Prophet (peace be upon him) was "Iqra" — Read. The great Islamic civilisation was built on libraries: the House of Wisdom in Baghdad, the libraries of Timbuktu, and the collections of Al-Andalus. A community library preserves and transmits knowledge across generations. It provides access to Islamic texts, educational materials, and resources that many families cannot afford individually. It is sadaqah jariyah in its purest form — beneficial knowledge made accessible to all.


**How?**

1. Designate a space within the masjid or community centre for the library — even a single room or a set of shelves is a start.
2. Curate an initial collection: essential tafsir, hadith collections, fiqh manuals, seerah books, children's Islamic books, and contemporary Islamic thought.
3. Solicit book donations from community members and purchase key texts from the community fund.
4. Implement a simple lending system: a sign-out sheet or a free library management app.
5. Include digital resources: a shared subscription to an Islamic education platform, access to online Quran resources, and a computer terminal for research.
6. Staff the library with volunteers during peak hours and promote it actively.
7. Completion indicator: a functioning library with at least 100 books across 5+ categories, a lending system, and documented usage by at least 15 community members in the first 3 months.` },
        { title: "Document the community's history for future generations", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 59:18",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللَّهَ وَلْتَنظُرْ نَفْسٌ مَّا قَدَّمَتْ لِغَدٍ",
              translation: "O you who have believed, fear Allah. And let every soul look to what it has put forth for tomorrow.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 3461",
              translation: "The Prophet (peace be upon him) said: \"Convey from me, even if it is one verse.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The preservation of the seerah (Prophetic biography) and the history of the Companions is one of the unique strengths of the Muslim ummah — we know our origins because scholars documented them. Your community's history — its founding, its struggles, its milestones, its leaders — is equally worthy of preservation. Future generations need to know how the community was built, what sacrifices were made, and what principles guided its founders. Without documentation, this history is lost within a single generation.


**How?**

1. Interview founding members and long-time elders: record their stories of how the community began, the early challenges, and the key turning points.
2. Collect documents and photographs: founding charters, early fundraising letters, construction photos, event programmes, and newspaper clippings.
3. Create a timeline of major milestones: establishment, first Jumu'ah, property acquisition, key programmes launched, crises navigated, and leadership transitions.
4. Write a narrative history: a document of at least 10 pages that tells the community's story in an engaging, accessible way.
5. Supplement with audio or video recordings of elder interviews — these are irreplaceable once the individuals pass away.
6. Display key elements at the masjid: a timeline wall, a founders' plaque, or a history booklet available to visitors.
7. Completion indicator: a documented community history with at least 5 elder interviews, a written narrative, and a visible display at the community space.` },
      ],
    },
    {
      title: "Build intergenerational continuity — ensure the community outlasts its founders",
      priority: 'medium', tags: ['succession', 'continuity', 'legacy'],
      description: "The Prophet (peace be upon him) prepared his Companions to lead after him — Abu Bakr, Umar, Uthman, and Ali (may Allah be pleased with them all) were ready because he invested in their development throughout his life. This task ensures that your community's leadership, institutions, and culture can be sustained across generations, independent of any single individual.",
      subtasks: [
        { title: "Identify and begin developing the next generation of community leaders", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 17:71",
              arabic: "يَوْمَ نَدْعُو كُلَّ أُنَاسٍ بِإِمَامِهِمْ",
              translation: "On the Day when We summon each community, along with its leader.",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              rationale: "every community will be called with its imam — the leader bears responsibility for those he leads, making intentional succession and leader development an obligation.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 7138",
              translation: "The Prophet (peace be upon him) said: \"Each of you is a shepherd and each of you is responsible for his flock. The imam is a shepherd and is responsible for his flock.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 592",
              translation: "Found in Sahih al-Bukhari 592 (Volume 3) and also referenced in hadith 18 (Volume 1), stating 'Everyone of you is a guardian [shepherd], and responsible for what is in his custody [flock].'",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) said: "Each of you is a shepherd and each of you is responsible for their flock" (Bukhari & Muslim). Every leader will eventually step down, age, or pass away. If no one is being prepared to take their place, the community will experience a leadership vacuum that can take years to recover from. Proactive succession planning is not a lack of trust in current leadership — it is the ultimate act of responsibility toward the community's future.


**How?**

1. Map current leadership roles: imam, board chair, committee heads, programme directors, and key volunteers.
2. For each role, identify: who currently fills it, how long they have been serving, and whether a successor has been discussed.
3. Identify 2-3 potential successors for each critical role based on capability, character, and willingness.
4. Begin informal development: invite potential successors to shadow current leaders, attend leadership meetings, and take on incremental responsibilities.
5. Have honest conversations with current leaders about succession — frame it positively as legacy-building, not replacement.
6. Create a documented succession plan reviewed annually by the shura council.
7. Completion indicator: a documented succession plan covering at least 5 critical roles with named potential successors and an active development process for each.` },
        { title: "Institutionalise key community roles so they are not dependent on individuals", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:58",
              arabic: "إِنَّ اللَّهَ يَأْمُرُكُمْ أَن تُؤَدُّوا الْأَمَانَاتِ إِلَىٰ أَهْلِهَا",
              translation: "Indeed, Allah commands you to render trusts to whom they are due.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 59",
              translation: "The Prophet (peace be upon him) said: \"When the trust is lost, then wait for the Hour.\" When someone asked how trust would be lost, he said: \"When authority is given to those who do not deserve it.\" Institutionalising roles prevents trust from being lost.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Umar ibn al-Khattab (may Allah be pleased with him) built institutions — the diwans, the judiciary, the provincial governance system — that outlasted him by centuries. Many Muslim communities today collapse or stagnate when a single key person leaves because the role existed only in that person's head. Institutionalisation means that the role is documented, the processes are written, and a new person can step in without starting from zero. This is the difference between a community built on personalities and one built on systems.


**How?**

1. List all key roles in the community and assess: if this person left tomorrow, could someone else pick up their responsibilities within two weeks?
2. For any role where the answer is "no," initiate a documentation project: the role holder writes down their responsibilities, processes, contacts, and decision-making criteria.
3. Create role descriptions for all key positions: purpose, responsibilities, authority, time commitment, and qualifications.
4. Store documentation centrally so it is accessible to the shura council and potential successors.
5. Cross-train at least one person for each critical role — not just as a backup, but as a genuine understudy.
6. Test the institutionalisation: when a leader goes on holiday or sabbatical, the role should function smoothly in their absence.
7. Completion indicator: role descriptions and process documentation for at least 5 critical community roles, with at least one successful handoff test.` },
        { title: "Create a community constitution that governs beyond any individual leader", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 42:38",
              arabic: "وَأَمْرُهُمْ شُورَىٰ بَيْنَهُمْ",
              translation: "And whose affair is [determined by] consultation among themselves.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 4:59",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا أَطِيعُوا اللَّهَ وَأَطِيعُوا الرَّسُولَ وَأُولِي الْأَمْرِ مِنكُمْ",
              translation: "O you who have believed, obey Allah and obey the Messenger and those in authority among you.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 7138",
              translation: "The Prophet (peace be upon him) said: \"Each of you is a shepherd and each of you is responsible for his flock. The ruler is a shepherd and is responsible for his subjects.\"",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "institutionalising leadership through a constitution ensures accountability continues regardless of who holds the shepherd's role.",
            },
          ],
          description: `**Why?**

The Sahifat al-Madinah (Constitution of Madinah) established governance principles that applied regardless of who was in charge. A community constitution — more comprehensive than the covenant created in the Core tier — defines the community's purpose, governance structure, decision-making processes, leadership selection, financial management, and conflict resolution. It ensures that the community operates by principles, not personalities, and that no single leader can unilaterally change its direction.


**How?**

1. Form a constitution committee with diverse representation: current leaders, future leaders, men, women, youth, elders, and founding members.
2. Draft articles covering: mission and values, membership, governance structure (shura council composition, selection, and terms), leadership roles and limits, financial management, dispute resolution, amendment process, and dissolution procedures.
3. Study constitutions of established Muslim organisations and adapt best practices.
4. Have the draft reviewed by a lawyer familiar with non-profit governance in your jurisdiction.
5. Present the draft to the community for feedback over a 30-day comment period.
6. Ratify through a community vote and register legally if your jurisdiction requires it.
7. Completion indicator: a ratified community constitution with legal review, community endorsement, and official adoption by the shura council.` },
        { title: "Establish a mentorship culture where every experienced member invests in someone younger", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 103:1-3",
              arabic: "وَالْعَصْرِ ۝ إِنَّ الْإِنسَانَ لَفِي خُسْرٍ ۝ إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ",
              translation: "By time, indeed mankind is in loss, except for those who have believed and done righteous deeds and advised each other to truth and advised each other to patience.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 2516",
              translation: "The Prophet (peace be upon him) said: \"Take advantage of five before five: your youth before your old age, your health before your sickness, your wealth before your poverty, your free time before your busyness, and your life before your death.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) did not mentor only the elite — Anas ibn Malik was a young boy serving in his household who grew into a great scholar and transmitter of hadith. A mentorship culture means that knowledge, wisdom, and institutional memory flow continuously from one generation to the next, not through formal programmes alone but through the daily fabric of community life. When every experienced member sees it as their responsibility to invest in someone younger, the community becomes self-renewing.


**How?**

1. Promote the concept through khutbahs and community talks: mentorship is not a programme — it is a Prophetic sunnah that every Muslim can practise.
2. Create a simple matching system: experienced members register as mentors, younger members register as mentees, and a coordinator facilitates pairings based on interests, goals, and compatibility.
3. Provide light guidelines: meet at least once per month, set a goal for the relationship, maintain confidentiality, and evaluate annually.
4. Celebrate mentorship visibly: share anonymised stories of mentorship impact in community communications.
5. Track participation and outcomes: how many pairs are active? What skills or knowledge are being transferred?
6. Embed mentorship into existing structures: every committee should have a junior member learning from a senior one.
7. Completion indicator: at least 10 active mentorship pairs sustained for at least 6 months, with documented outcomes and at least 3 mentee-to-mentor transitions.` },
        { title: "Conduct a 10-year community vision exercise and publish a strategic plan", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 59:18",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللَّهَ وَلْتَنظُرْ نَفْسٌ مَّا قَدَّمَتْ لِغَدٍ",
              translation: "O you who have believed, fear Allah. And let every soul look to what it has put forth for tomorrow.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 2:143",
              arabic: "وَكَذَٰلِكَ جَعَلْنَاكُمْ أُمَّةً وَسَطًا لِّتَكُونُوا شُهَدَاءَ عَلَى النَّاسِ",
              translation: "And thus we have made you a just community that you will be witnesses over the people.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

 A community without a long-term vision operates reactively, solving today's problems without building toward tomorrow's potential. A 10-year vision gives the community a shared destination that transcends any individual leader's tenure and inspires sustained, purposeful effort.

**How?**

1. Convene a visioning retreat with 15-25 community members representing all demographics and perspectives.
2. Begin with reflection: where has the community come from? What have been the greatest achievements and the greatest failures?
3. Facilitate a vision exercise: "If this community were operating at its best 10 years from now, what would it look like?" Capture aspirations across all dimensions: worship, education, social services, outreach, financial health, and physical infrastructure.
4. Distil the vision into a clear, compelling statement (2-3 sentences) that any community member can understand and rally behind.
5. Develop a strategic plan with 3-year milestones: what must be true in year 3, year 6, and year 10 for the vision to be realised?
6. Publish the vision and strategic plan to the entire community and review progress annually.
7. Completion indicator: a published 10-year vision and strategic plan developed through participatory process, endorsed by the shura council, and presented to the community with at least one annual progress review conducted.` },
      ],
    },
    {
      title: "Aspire to the Prophetic community standard — a living model of Madinah values",
      priority: 'low', tags: ['ihsan', 'prophetic-model', 'excellence'],
      description: "The community of Madinah under the Prophet (peace be upon him) was characterised by justice, mercy, brotherhood, knowledge, worship, service, and joy. This task is the aspirational north star — not a checklist to complete but a standard to continuously approach. It challenges the community to measure itself against the Prophetic model and to never settle for mediocrity in any dimension of collective life.",
      subtasks: [
        { title: "Study the Madinah community model in depth as a community", done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 3455",
              translation: "The Prophet (peace be upon him) said: \"I have been sent to perfect good character.\" The Madinah community was the living demonstration of perfected character in collective life.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 33:21",
              arabic: "لَّقَدْ كَانَ لَكُمْ فِي رَسُولِ اللَّهِ أُسْوَةٌ حَسَنَةٌ",
              translation: "There has certainly been for you in the Messenger of Allah an excellent pattern.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

You cannot aspire to what you do not understand. Most Muslims know the Prophet (peace be upon him) as an individual but have never studied the community he built as a system: its governance, its economics, its social welfare, its education, its diplomacy, and its worship culture. Studying the Madinah model as a community — not just as individuals — creates a shared vocabulary and a shared aspiration that aligns everyone's efforts toward the same prophetic standard.


**How?**

1. Select a comprehensive seerah text that covers the social and institutional dimensions of Madinah (e.g., "The Sealed Nectar," supplemented with works on Islamic governance and social history).
2. Design a 12-session community study circle: one session per month, each covering a dimension of the Madinah community (governance, mutual aid, education, worship, economy, justice, dawah, defence, interfaith relations, family, youth, and legacy).
3. For each session, compare the Madinah model to your community's current state: where are you aligned? Where are you falling short?
4. Invite guest scholars or use recorded lectures to supplement the study material.
5. Document insights and commitments from each session.
6. At the end of the 12 months, produce a "Madinah Alignment Report" that honestly assesses the community against the Prophetic model.
7. Completion indicator: a 12-session study circle completed with at least 12 regular participants and a published Madinah Alignment Report.` },
        { title: "Implement a quarterly community self-assessment against Prophetic standards", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 16:89",
              arabic: "وَيَوْمَ نَبْعَثُ فِي كُلِّ أُمَّةٍ شَهِيدًا عَلَيْهِم مِّنْ أَنفُسِهِمْ ۖ وَجِئْنَا بِكَ شَهِيدًا عَلَىٰ هَٰؤُلَاءِ ۚ وَنَزَّلْنَا عَلَيْكَ الْكِتَابَ تِبْيَانًا لِّكُلِّ شَيْءٍ",
              translation: "The day will come when We raise up in each community a witness against them, and We shall bring you [Prophet] as a witness against these people, for We have sent the Scripture down to you explaining everything, and as guidance and mercy and good news to those who devote themselves to God.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6464",
              translation: "The Prophet (peace be upon him) said: \"Do good deeds properly, sincerely and moderately, and know that the most beloved of deeds to Allah are those that are most consistent, even if they are small.\"",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "regular self-assessment is the mechanism by which consistent, improving deeds are maintained — it is the institutional expression of muhasabah.",
            },
          ],
          description: `**Why?**

 Individual muhasabah (self-accounting) is a well-known Islamic practice, but communities rarely apply it collectively. A quarterly self-assessment prevents drift — the slow, imperceptible lowering of standards that occurs when no one is measuring. It transforms aspiration into accountability and ensures the community is always moving toward the Prophetic standard, not away from it.

**How?**

1. Develop a simple scorecard with 10-15 indicators drawn from the Madinah model study: quality of congregational worship, shura functionality, mutual aid responsiveness, educational programme quality, outreach effectiveness, financial transparency, youth engagement, conflict resolution, neighbour relations, and internal unity.
2. For each indicator, define: what "excellent" looks like, what "adequate" looks like, and what "failing" looks like.
3. Conduct the assessment quarterly: a 2-hour session with the shura council and key stakeholders, scoring each indicator with evidence.
4. Identify the 2-3 areas most in need of improvement and assign specific action plans.
5. Track scores over time to visualise progress and regressions.
6. Share a summary (not the detailed scores) with the community to maintain transparency and invite input.
7. Completion indicator: at least 2 quarterly assessments completed with documented scores, action plans, and visible trend tracking.` },
        { title: "Cultivate a community culture of ihsan (excellence) in every activity", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:195",
              arabic: "وَأَحْسِنُوا ۛ إِنَّ اللَّهَ يُحِبُّ الْمُحْسِنِينَ",
              translation: "And do good; indeed, Allah loves the doers of good.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 55:60",
              arabic: "هَلْ جَزَاءُ الْإِحْسَانِ إِلَّا الْإِحْسَانُ",
              translation: "Is the reward for good anything but good?",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 1955",
              translation: "The Prophet (peace be upon him) said: \"Indeed Allah has prescribed ihsan (excellence) in all things.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

 Ihsan is not limited to worship — it applies to how the masjid is cleaned, how events are organised, how food is served, how newcomers are greeted, and how conflicts are resolved. A culture of ihsan means the community refuses to accept mediocrity in any dimension of its collective life. This is the intangible quality that distinguishes a merely functional community from a model community.

**How?**

1. Define what ihsan looks like in each area of community life: worship (khushu and punctuality), facilities (cleanliness and maintenance), events (organisation and hospitality), communication (clarity and kindness), and governance (transparency and responsiveness).
2. Communicate these standards through a "Community Ihsan Charter" — a brief, inspiring document that articulates the aspiration.
3. Lead by example: community leaders must embody ihsan visibly before expecting it from others.
4. Celebrate ihsan when you see it: public recognition of excellence encourages more of it.
5. Address mediocrity with kindness but firmness: "This is not up to our standard. How can we do better?"
6. Review the ihsan culture annually: what has improved? Where has complacency crept in?
7. Completion indicator: a published Ihsan Charter, visible improvements in at least 3 areas of community life, and at least one annual review conducted.` },
        { title: "Establish the community as a force for justice in the broader society", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 7:159",
              arabic: "وَمِن قَوْمِ مُوسَىٰ أُمَّةٌ يَهْدُونَ بِالْحَقِّ وَبِهِ يَعْدِلُونَ",
              translation: "There is a group among the people of Moses who guide with truth, and who act justly according to it.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 4:135",
              arabic: "۞ يَـٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوا۟ كُونُوا۟ قَوَّٰمِينَ بِٱلْقِسْطِ شُهَدَآءَ لِلَّهِ وَلَوْ عَلَىٰٓ أَنفُسِكُمْ أَوِ ٱلْوَٰلِدَيْنِ وَٱلْأَقْرَبِينَ ۚ إِن يَكُنْ غَنِيًّا أَوْ فَقِيرًۭا فَٱللَّهُ أَوْلَىٰ بِهِمَا ۖ فَلَا تَتَّبِعُوا۟ ٱلْهَوَىٰٓ أَن تَعْدِلُوا۟ ۚ وَإِن تَلْوُۥٓا۟ أَوْ تُعْرِضُوا۟ فَإِنَّ ٱللَّهَ كَانَ بِمَا تَعْمَلُونَ خَبِيرًۭا",
              translation: "You who believe, uphold justice and bear witness to God, even if it is against yourselves, your parents, or your close relatives. Whether the person is rich or poor, God can best take care of both. Refrain from following your own desire, so that you can act justly- if you distort or neglect justice, God is fully aware of what you do.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 49",
              translation: "The Prophet (peace be upon him) said: \"Whoever among you sees an evil, let him change it with his hand; if he cannot, then with his tongue; if he cannot, then with his heart — and that is the weakest of faith.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Allah commands: "O you who believe, be persistently standing firm in justice, witnesses for Allah, even if it be against yourselves, your parents, or your relatives" (Quran 4:135). The Madinah community was not an isolationist enclave — it was a force for justice in the broader society. A community that aspires to the Prophetic standard must extend its concern beyond its own members to the welfare of all people: standing against injustice wherever it occurs, regardless of the victim's faith, ethnicity, or status.


**How?**

1. Identify justice issues in your broader community that affect all people, not just Muslims: poverty, housing, education inequality, criminal justice, environmental degradation, or discrimination.
2. Select one issue where your community can make a meaningful, sustained contribution.
3. Build a coalition: partner with other faith communities, civic organisations, and advocacy groups working on the same issue.
4. Commit community resources: volunteer hours, financial support, venue space, and public advocacy.
5. Frame the work in Islamic terms to the community ("This is our obligation as khulafa on this earth") and in universal terms to external partners ("We believe in justice for all people").
6. Track impact and report to the community: what changed because of your involvement?
7. Completion indicator: sustained engagement in one justice issue for at least 12 months, in coalition with non-Muslim partners, with documented impact.` },
        { title: "Make dua and renew intention for the community to be a light for the ummah and for humanity", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 11:118",
              arabic: "وَلَوْ شَاءَ رَبُّكَ لَجَعَلَ النَّاسَ أُمَّةً وَاحِدَةً ۖ وَلَا يَزَالُونَ مُخْتَلِفِينَ",
              translation: "If your Lord had pleased, He would have made all people a single community, but they continue to have their differences.",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              rationale: "diversity is by Allah's design; making dua for the community to be a light is the highest response to this reality — not imposing uniformity but embodying guidance.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1",
              translation: "The Prophet (peace be upon him) said: \"Actions are but by intention, and every person shall have but that which he intended.\"",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "renewing communal intention is the act this hadith makes central — all the community's works rise or fall by the sincerity of this renewal.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1",
              translation: "The opening hadith of Sahih al-Bukhari (Number 1) states: 'The reward of deeds depends upon the intentions.'",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) said: "Actions are judged by intentions" (Bukhari & Muslim). All of the systems, programmes, and structures built through these tasks are means, not ends. The end is the pleasure of Allah and the service of His creation. Without regularly renewing the communal intention, the best institutions become bureaucracies and the noblest missions become ego projects. This final task is a reminder that the community's ultimate aspiration is not organisational excellence but nearness to Allah through service to His ummah and to all of humanity.


**How?**

1. Institute an annual "community renewal" gathering — a dedicated evening of collective reflection, gratitude, and recommitment.
2. Open with Quran recitation and a reflection on the community's founding purpose.
3. Review the year: what was accomplished? What fell short? What are we most grateful for?
4. Renew the communal intention: "We do this work not for recognition, not for legacy, not for power — but for the sake of Allah alone."
5. Make dua together: for the community, for the global ummah, for all of humanity, and for forgiveness for wherever we fell short.
6. Close with a shared meal and an atmosphere of hope, gratitude, and determination.
7. Completion indicator: an annual renewal gathering held with broad community participation and a documented reflection that feeds into the next year's strategic planning.` },
      ],
    },
  ],

  // ── NEIGHBORS ──

  // ── CORE: Not Harming, Greeting, Basic Care ──
  ummah_neighbors_core: [
    {
      title: "Learn every immediate neighbor's name, household composition, and basic needs",
      priority: 'urgent', tags: ['haqq-al-jar', 'awareness'],
      description: "You cannot fulfil the rights of someone you do not know. This task establishes the foundational awareness required to honour those rights — begin by learning who lives beside you.",
      subtasks: [
        { title: "Identify every household within your immediate adjacency (apartments on your floor, houses on either side and across)", done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6014",
              translation: "The Prophet (peace be upon him) said: \"Jibril kept recommending treating neighbors with kindness until I thought he would assign them a share of the inheritance.\" Knowing your neighbors by name is the first step in fulfilling this weighty right.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The rights of the neighbor in Islam begin with awareness. The Quran commands ihsan (excellence) toward "the neighbor who is near and the neighbor who is far" (4:36). You cannot show ihsan to someone whose existence you have not even acknowledged. Mapping your immediate adjacency is the absolute baseline of Haqq al-Jar — it moves neighbors from anonymous strangers to known individuals for whom you bear responsibility before Allah.


**How?**

1. Draw a simple map of your building floor or street, marking each dwelling unit adjacent to yours.
2. For apartments: include units on either side, directly above, directly below, and across the hallway.
3. For houses: include the homes on either side and the three homes directly across the street.
4. Note any units you already know something about (names, family size, elderly residents, children).
5. Mark any units where you have never interacted with the occupants at all.
6. This map becomes your working reference for all subsequent neighbor tasks.
7. Completion indicator: a written or drawn map with every adjacent dwelling identified and labelled with whatever you currently know.` },
        { title: "Introduce yourself to any neighbor you have not yet spoken to", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:36",
              arabic: "وَاعْبُدُوا اللَّهَ وَلَا تُشْرِكُوا بِهِ شَيْئًا ۖ وَبِالْوَالِدَيْنِ إِحْسَانًا وَبِذِي الْقُرْبَىٰ وَالْيَتَامَىٰ وَالْمَسَاكِينِ وَالْجَارِ ذِي الْقُرْبَىٰ وَالْجَارِ الْجُنُبِ",
              translation: "Worship Allah and associate nothing with Him, and to parents do good, and to relatives, orphans, the needy, the near neighbor, the neighbor farther away.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6014",
              translation: "The Prophet (peace be upon him) said: \"Jibril kept advising me about the neighbor until I thought he would make him an heir.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

 But you will never know whether your neighbor is hungry if you have never exchanged a word. The first introduction breaks the barrier of anonymity and plants the seed of relationship. In many modern buildings people live side by side for years without a single greeting — this contradicts the entire ethic of Haqq al-Jar that Islam establishes.

**How?**

1. Identify from your adjacency map which neighbors you have never spoken with.
2. Prepare a simple, warm introduction: your name, which unit or house you live in, and a genuine offer such as "Please let me know if you ever need anything."
3. Choose a natural moment — when you see them at the mailbox, in the hallway, or arriving home.
4. If you prefer a more structured approach, bring a small plate of dates, biscuits, or fruit as an icebreaker.
5. Keep the interaction brief and warm — the goal is connection, not a lengthy conversation.
6. Record each neighbor's name and any basic information they share (family members, how long they have lived there).
7. Completion indicator: you have introduced yourself to every previously unknown adjacent neighbor and recorded their names.` },
        { title: "Establish a consistent daily greeting habit — say salam or a warm hello to every neighbor you encounter", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 56:26",
              arabic: "إِلَّا قِيلًا سَلَامًا سَلَامًا",
              translation: "only clean and wholesome speech.",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              rationale: "the speech of the people of Paradise is salam — habituating ourselves to it now is preparation for that station.",
            },
            {
              kind: "quran",
              ref: "Quran 11:69",
              arabic: "وَلَقَدْ جَاءَتْ رُسُلُنَا إِبْرَاهِيمَ بِالْبُشْرَىٰ قَالُوا سَلَامًا ۖ قَالَ سَلَامٌ",
              translation: "To Abraham Our messengers brought good news. They said, 'Peace.' He answered, 'Peace.",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              rationale: "even the angels greeted Ibrahim with salam, establishing it as the universal greeting of those close to Allah.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 54",
              translation: "The Prophet (peace be upon him) said: \"You will not enter Paradise until you believe, and you will not believe until you love one another. Shall I not tell you of something which, if you do it, you will love one another? Spread salam (greetings of peace) among yourselves.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

 Shall I not tell you something which, if you do it, you will love one another? Spread salam among yourselves" (Muslim 54). The daily greeting is the simplest, most consistent act of neighborly connection. It costs nothing, takes seconds, and over time transforms cold hallways and silent streets into spaces of recognition and warmth — the most basic expression of husn al-jiwar.

**How?**

1. Make a conscious intention (niyyah) each morning to greet every neighbor you encounter that day.
2. When passing a neighbor — whether Muslim or not — offer a warm, audible greeting: "As-salamu alaykum" for Muslim neighbors, "Good morning" or the appropriate local greeting for others.
3. Make eye contact, smile, and use their name if you know it.
4. Do not rush past or pretend to be busy with your phone — presence and acknowledgment are the substance of the greeting.
5. If a neighbor does not reciprocate warmly at first, remain consistent — habit and sincerity break barriers over time.
6. Extend this to shared spaces: the elevator, stairwell, parking lot, and rubbish area.
7. Completion indicator: greeting neighbors has become an automatic, daily habit requiring no conscious effort — you have not passed a neighbor without acknowledgment for at least two consecutive weeks.` },
        { title: "Audit your home for anything that could harm neighbors — noise, smells, waste, obstructions", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:36",
              arabic: "وَبِالْوَالِدَيْنِ إِحْسَانًا وَبِذِي الْقُرْبَىٰ وَالْيَتَامَىٰ وَالْمَسَاكِينِ وَالْجَارِ ذِي الْقُرْبَىٰ وَالْجَارِ الْجُنُبِ",
              translation: "And to parents do good, and to relatives, orphans, the needy, the near neighbor, the neighbor farther away.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6015",
              translation: "The Prophet (peace be upon him) said: \"By Allah, he does not believe! By Allah, he does not believe! By Allah, he does not believe!\" It was said, \"Who, O Messenger of Allah?\" He said, \"The one whose neighbor does not feel safe from his harm.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

 This hadith places neighbor safety as a condition of iman itself. Harm is not limited to deliberate hostility — it includes noise at inconsiderate hours, cooking smells that seep through shared walls, rubbish left in common areas, and vehicles parked in a way that obstructs access. An honest audit of your own impact is essential before you can claim to fulfil this most basic right.

**How?**

1. Walk through your home at different times of day and honestly assess noise levels: music, television, children playing, appliances running early morning or late at night.
2. Check shared walls and floors — can your neighbors hear your conversations, your washing machine, or your vacuum at odd hours?
3. Assess cooking smells: do you leave your door open while frying, or does your kitchen ventilation push strong odors into the hallway?
4. Inspect the area immediately outside your door: shoes, prams, delivery boxes, or anything encroaching on shared space.
5. Check your parking: are you ever blocking a neighbor's access, using their spot, or leaving your vehicle in a way that makes their movement difficult?
6. Ask a trusted household member for their honest observation — we often become blind to our own noise and clutter.
7. Completion indicator: a written list of every potential source of harm to neighbors, with a fix or mitigation noted for each item.` },
        { title: "Resolve every identified harm item — eliminate noise disturbances, clear shared spaces, fix obstructions", done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 46",
              translation: "The Prophet (peace be upon him) said: \"Whoever believes in Allah and the Last Day, let him not harm his neighbor.\" Eliminating noise disturbances and clearing shared spaces is the practical application of this command.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 5154",
              translation: "The Prophet (peace be upon him) said: \"By Allah, he does not believe. By Allah, he does not believe. By Allah, he does not believe.\" They asked: \"Who, O Messenger of Allah?\" He said: \"The one whose neighbor does not feel safe from his evil.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6016",
              arabic: "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلاَ يُؤْذِ جَارَهُ",
              translation: "He who believes in Allah and the Last Day should not hurt (trouble) his neighbor.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Hadith cited inline in this subtask's description; backfilled into structured sources via NotebookLM Muslim Scholar canonical-text retrieval.",
            },
          ],
          description: `**Why?**

Identifying harm without acting on it is worse than ignorance, because it adds the sin of neglect to the sin of harm. The hadith in Bukhari 6016 is unequivocal — your faith is questioned if your neighbor is not safe from your nuisance. Every unresolved item on your audit list is an active violation of Haqq al-Jar. Resolving them is not optional goodness; it is a debt owed to those who share your walls, your hallway, and your street.


**How?**

1. Take your audit list and address each item in order of severity.
2. For noise: establish household quiet hours aligned with reasonable community norms (e.g., no loud activity before 8am or after 10pm), place rubber pads under washing machines, use headphones for late-night media.
3. For smells: use your kitchen exhaust fan, keep doors closed during cooking, and consider an air purifier near the entrance.
4. For shared space clutter: remove all personal items from hallways, stairwells, and shared storage areas — keep only what building rules explicitly permit.
5. For parking: ensure your vehicle is squarely in your designated space and never obstructing another's access.
6. For any item you cannot fully resolve alone (e.g., building maintenance issues), report it to your landlord or building management in writing.
7. Completion indicator: every item on the harm audit list has been resolved or formally escalated, and you can honestly say your neighbor is safe from your nuisance.` },
      ],
    },
    {
      title: "Protect your neighbors' property and privacy as you would your own",
      priority: 'urgent', tags: ['haqq-al-jar', 'amanah'],
      description: "The right of the neighbor includes safeguarding their property when they are absent and never violating their privacy. The Prophet (peace be upon him) listed the rights of the neighbor to include protecting their home in their absence and lowering your gaze from their private spaces. This task ensures you actively honour these trust-based obligations.",
      subtasks: [
        { title: "Ensure your windows, balconies, and doorways do not overlook your neighbors' private spaces without screening", done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6014",
              translation: "The Prophet (peace be upon him) said: \"Jibril kept recommending treating neighbors with kindness until I thought he would assign them a share of the inheritance.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 24:27",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا لَا تَدْخُلُوا بُيُوتًا غَيْرَ بُيُوتِكُمْ حَتَّىٰ تَسْتَأْنِسُوا وَتُسَلِّمُوا عَلَىٰ أَهْلِهَا",
              translation: "O you who have believed, do not enter houses other than your own houses until you ascertain welcome and greet their inhabitants.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

 This dramatic language underscores how seriously Islam takes domestic privacy. Your home's layout may inadvertently give you a line of sight into a neighbor's bedroom, bathroom, or private garden. Screening these sightlines is not just courtesy — it is a protection of their God-given right to privacy (satr) within their own home.

**How?**

1. Stand at each window, balcony, and doorway in your home and look outward — can you see into any neighbor's private space?
2. Pay special attention to windows that face each other across narrow gaps, balconies that overlook gardens, and upper-floor windows that look down into courtyards.
3. For any sightline issue, install appropriate screening: frosted window film, curtains, blinds, or a balcony privacy screen.
4. If you have an outdoor seating area, orient furniture so that your natural line of sight does not fall into a neighbor's home.
5. In shared hallways, do not linger near peepholes or position cameras that capture your neighbor's doorway activity.
6. If your building has shared laundry lines or drying areas, be conscious of visibility into windows when hanging clothes.
7. Completion indicator: you have checked every outward-facing opening in your home and installed screening wherever a neighbor's private space is visible.` },
        { title: "Keep a watchful eye on neighbors' homes when they are away — collect packages, note unusual activity", done: false,
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
              kind: "hadith",
              ref: "Sahih al-Bukhari 6014",
              translation: "The Prophet (peace be upon him) said: \"Jibril kept advising me about the neighbor until I thought he would make him an heir.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Among the explicitly listed rights of the neighbor is that you safeguard their home when they are absent. In a hadith recorded by Abu Dawud, the Prophet (peace be upon him) described the neighbor's right to include watching over their property. Uncollected packages signal an empty home to thieves; untended bins or overflowing letterboxes advertise absence. By quietly watching over their home, you fulfil a trust (amanah) and provide real security that no technology fully replaces.


**How?**

1. When a neighbor mentions they will be away — or you notice signs of absence (no lights, uncollected post) — take note.
2. Collect any packages or mail left at their door and hold them safely until their return.
3. If bins are left out past collection day, bring them in to avoid signalling an empty home.
4. Note any unusual activity around their property — unfamiliar people trying doors, strange vehicles lingering.
5. If something genuinely concerning occurs, contact the neighbor first (if you have their number) or the appropriate local authority.
6. When the neighbor returns, mention casually what you observed and hand over any collected items.
7. Completion indicator: you have established a consistent habit of monitoring adjacent homes during noticed absences, and neighbors trust you to watch over their property.` },
        { title: "Never discuss or expose what you observe of your neighbors' private affairs", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:12",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا اجْتَنِبُوا كَثِيرًا مِّنَ الظَّنِّ إِنَّ بَعْضَ الظَّنِّ إِثْمٌ ۖ وَلَا تَجَسَّسُوا وَلَا يَغْتَب بَّعْضُكُم بَعْضًا",
              translation: "O you who have believed, avoid much suspicion; indeed, some suspicion is sin. And do not spy or backbite each other.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 24:27",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا لَا تَدْخُلُوا بُيُوتًا غَيْرَ بُيُوتِكُمْ حَتَّىٰ تَسْتَأْنِسُوا وَتُسَلِّمُوا عَلَىٰ أَهْلِهَا",
              translation: "O you who have believed, do not enter houses other than your own houses until you ascertain welcome and greet their inhabitants.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 622",
              translation: "The sources contain this exact text in Sahih al-Bukhari 622 (Volume 3): 'whoever screened a Muslim, Allah will screen him on the Day of Resurrection.' The prompt attributes it to Muslim 2699.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2699",
              arabic: "وَمَنْ سَتَرَ مُسْلِمًا سَتَرَهُ اللَّهُ فِي الدُّنْيَا وَالْآخِرَةِ",
              translation: "Whoever conceals (the faults of) a Muslim, Allah will conceal his faults in this world and the next.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Hadith cited inline in this subtask's description; backfilled into structured sources via NotebookLM Muslim Scholar canonical-text retrieval.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) said, "Whoever conceals the faults of a Muslim, Allah will conceal his faults on the Day of Judgment" (Muslim 2699). Living in close proximity means you will inevitably hear arguments, see visitors, notice habits, and learn things about your neighbors' lives that they have not chosen to share publicly. Disclosing these observations — whether to other neighbors, friends, or on social media — is a betrayal of the implicit trust that comes with proximity. Ghiba (backbiting) about a neighbor is among the most harmful forms because it poisons the very community you share daily space with.


**How?**

1. Make a firm internal commitment: what you see and hear of your neighbor's private life stays with you.
2. If you overhear an argument, witness a family difficulty, or notice something embarrassing, act as though you did not.
3. When other neighbors or friends ask about the people next door, share only what is publicly known and positive.
4. If someone gossips to you about a neighbor, gently redirect: "I would rather not discuss their private affairs."
5. Do not post anything on social media — even vaguely — that could identify or embarrass a neighbor.
6. If a neighbor's private situation genuinely requires intervention (abuse, danger), seek professional or community help rather than spreading the information socially.
7. Completion indicator: you can honestly say you have not disclosed any private observation about a neighbor to anyone for at least three consecutive months.` },
        { title: "Exchange emergency contact information with your closest neighbors", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:36",
              arabic: "وَالْجَارِ ذِي الْقُرْبَىٰ وَالْجَارِ الْجُنُبِ وَالصَّاحِبِ بِالْجَنبِ",
              translation: "And the near neighbor, the neighbor farther away, and the companion at your side.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2625",
              translation: "The Prophet (peace be upon him) said: \"Whoever relieves a believer of a hardship in this world, Allah will relieve him of a hardship on the Day of Resurrection.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The neighborly relationship must have practical infrastructure, not just goodwill. In an emergency — a water leak, a medical incident, a fire, or a security concern — seconds matter, and having your neighbor's phone number is the difference between swift mutual aid and helpless waiting. This simple exchange formalises the relationship of mutual care that Haqq al-Jar demands.

**How?**

1. Identify your two or three closest neighbors — those who share a wall, a landing, or are directly adjacent.
2. During a natural interaction (not forced), mention that you would like to exchange numbers in case of emergencies.
3. Frame it practically: "If there is ever a water leak, a power outage, or anything urgent, I would like to be able to reach you and vice versa."
4. Save their contact with a clear label (e.g., "Ahmed — Flat 4B") so you can find it quickly in an emergency.
5. Share your own number willingly and let them know they can contact you if they ever need help.
6. If a neighbor is reluctant, respect their boundary without pressure — not everyone is comfortable, and that is their right.
7. Completion indicator: you have emergency contact numbers for at least two adjacent neighbors, and they have yours.` },
        { title: "Respond immediately when a neighbor asks for help with a genuine need", done: false,
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
              kind: "hadith",
              ref: "Sahih Muslim 2580",
              translation: "The Prophet (peace be upon him) said: \"Allah will say on the Day of Resurrection: 'O son of Adam, I was sick and you did not visit Me... I asked you for food and you did not feed Me... I asked you for water and you did not give Me drink.'\" — referring to the needs of His servants.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

 Genuine need means a locked-out neighbor needing to use your phone, someone carrying heavy groceries who needs a hand, or a family experiencing a plumbing emergency. These moments are not interruptions — they are opportunities to earn the rank of "best neighbor in Allah's sight." Hesitation or avoidance in the face of genuine need is a failure of the most basic neighborly obligation.

**How?**

1. Cultivate a mindset of readiness: when a neighbor knocks, approach the door with the assumption that they need something reasonable.
2. If a neighbor is locked out, offer your phone, a glass of water, and a place to wait without making them feel like a burden.
3. If you see a neighbor struggling with groceries, heavy items, or a pram on the stairs, offer help immediately — do not wait to be asked.
4. For small household emergencies (a burst pipe, a power issue), offer whatever practical help you can: a bucket, a torch, a call to your plumber.
5. If you cannot help directly, assist them in finding someone who can — never leave them without a next step.
6. After helping, do not expect reciprocation or even thanks — your intention is for Allah's pleasure alone.
7. Completion indicator: you have responded to at least three genuine neighbor requests without hesitation, and your neighbors know they can turn to you in need.` },
      ],
    },
    {
      title: "Remove harm from shared spaces — keep communal areas clean, safe, and unobstructed",
      priority: 'high', tags: ['haqq-al-jar', 'shared-spaces'],
      description: " Shared hallways, stairwells, driveways, and communal gardens are the 'paths' of your neighborhood. This task applies the prophetic principle directly to communal spaces where your neighbors walk daily.",
      subtasks: [
        { title: "Walk through every shared space adjacent to your home and note cleanliness, safety, and obstruction issues", done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 49",
              translation: "The Prophet (peace be upon him) said: \"Faith has over seventy branches, the highest of which is the declaration that there is no god but Allah, and the lowest of which is removing something harmful from the road.\" Auditing shared spaces for hazards fulfills this branch of faith.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 35",
              arabic: "الْإِيمَانُ بِضْعٌ وَسِتُّونَ شُعْبَةً ... وَأَدْنَاهَا إِمَاطَةُ الْأَذَى عَنِ الطَّرِيقِ",
              translation: "Faith (Iman) has over sixty branches ... and the least of which is removing a harmful object from the road.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Hadith cited inline in this subtask's description; backfilled into structured sources via NotebookLM Muslim Scholar canonical-text retrieval.",
            },
          ],
          description: `**Why?**

The hadith "removing harm from the road is a branch of iman" (Muslim 35) applies directly to the spaces your neighbors traverse daily. A dirty stairwell, a broken light in the hallway, a bicycle chained across a shared entrance — these are the "harm on the road" of modern communal living. You cannot address problems you have not surveyed. This walkthrough gives you a clear picture of the current state and your opportunities to act.


**How?**

1. Walk from your front door through every shared space: hallway, stairwell, elevator lobby, parking area, bin storage, communal garden, and entrance paths.
2. Note cleanliness issues: litter, stains, overflowing bins, cobwebs in corners, dirty windows.
3. Note safety issues: broken lights, cracked steps, loose handrails, slippery surfaces, blocked fire exits.
4. Note obstructions: personal items left in shared areas (shoes, prams, boxes), vehicles parked outside designated spots, overgrown hedges encroaching on paths.
5. Distinguish between issues you can fix yourself and those requiring building management or council intervention.
6. Take photos if helpful for reporting to management.
7. Completion indicator: a written inventory of every cleanliness, safety, and obstruction issue in your shared spaces, categorised by who can resolve them.` },
        { title: "Fix or report every issue you identified — personally clean, tidy, or escalate to management", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:195",
              arabic: "وَأَحْسِنُوا ۛ إِنَّ اللَّهَ يُحِبُّ الْمُحْسِنِينَ",
              translation: "And do good; indeed, Allah loves the doers of good.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 35",
              translation: "The Prophet (peace be upon him) said: \"Faith has over seventy branches, the highest of which is the testimony that there is no god but Allah, and the least of which is removing something harmful from the road.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Identifying problems without acting is observation without ihsan. If litter is on the ground, you pick it up. The willingness to personally act — rather than assume someone else will — is what distinguishes a neighbor who fulfils Haqq al-Jar from one who merely lives nearby.

**How?**

1. Take your inventory and address every item you can personally fix.
2. For litter and cleanliness: bring a bag and clean the area yourself — do not wait for a cleaner.
3. For minor obstructions: politely move items to appropriate locations or ask the owner to do so.
4. For safety hazards you can fix (e.g., replacing a light bulb in a shared fixture): do it promptly.
5. For issues requiring management: write a clear, specific report with the location, nature of the issue, and photo if applicable, and submit it through the proper channel.
6. Follow up on reported issues — if management has not acted within a reasonable time, send a polite reminder.
7. Completion indicator: every item on your shared-space inventory has been either personally resolved or formally reported and tracked until resolution.` },
        { title: "Never leave personal items in shared spaces — shoes, deliveries, rubbish bags, or equipment", done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 46",
              translation: "The Prophet (peace be upon him) said: \"Whoever believes in Allah and the Last Day, let him not harm his neighbor.\" Leaving personal items in shared spaces is a form of harm that violates this Prophetic command.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 49",
              translation: "The Prophet (peace be upon him) said: \"Removing something harmful from the road is charity.\" Keeping shared spaces clear of personal items is an act of ongoing sadaqah.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Shared space is a collective trust. When one resident leaves shoes outside their door, others follow, and soon the hallway becomes an obstacle course. Your restraint sets a standard others may follow.

**How?**

1. Conduct an honest audit: do you currently have any personal items outside your front door or in shared areas?
2. Bring everything inside: shoes, doormats (if not permitted), delivery boxes, bikes, prams, cleaning supplies.
3. Find indoor storage solutions: a shoe rack inside the door, a hook for bags, a designated spot for deliveries to be brought in immediately.
4. For rubbish: never leave bags in the hallway even temporarily — take them directly to the bin area.
5. If you receive a delivery while out, ask the delivery service to leave it in a designated safe spot, not the shared hallway.
6. Set a household rule: nothing of ours lives outside our front door.
7. Completion indicator: the area outside your home and in all shared spaces contains zero personal items belonging to your household, consistently maintained for at least one month.` },
        { title: "Contribute to shared space maintenance beyond the minimum — sweep, wipe, or tidy communal areas regularly", done: false,
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
              kind: "hadith",
              ref: "Sahih Muslim 35",
              translation: "The Prophet (peace be upon him) said: \"Removing something harmful from the road is a branch of faith.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 1956",
              translation: "The Prophet (peace be upon him) said: \"The best of companions in the sight of Allah is the one who is best to his companion, and the best of neighbors in the sight of Allah is the one who is best to his neighbor.\"",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Islam teaches that the best actions are those done consistently, even if small. Sweeping the shared hallway once a week, wiping a dirty handrail, or picking up a stray wrapper is the ongoing, quiet practice of removing harm from the path. When you go beyond the minimum, you establish a culture of care that elevates the entire community's standard of communal living.

**How?**

1. Choose a small, consistent act of shared-space maintenance to perform weekly — sweeping the hallway, wiping the elevator buttons, tidying the mailbox area.
2. Do not announce it or seek recognition — the goal is quiet, sustained stewardship.
3. If you see litter while passing through a shared area, pick it up in the moment rather than walking past.
4. Keep a small broom or dustpan near your door for quick hallway sweeps.
5. If your building has a garden, occasionally pull visible weeds, pick up rubbish, or water dry plants.
6. If other residents begin doing the same, the culture has shifted — this is the goal.
7. Completion indicator: you have performed at least one voluntary shared-space maintenance act per week for four consecutive weeks.` },
        { title: "Ensure your home's exterior and entrance are well-maintained — contributing positively to the shared visual environment", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 33:58",
              arabic: "وَالَّذِينَ يُؤْذُونَ الْمُؤْمِنِينَ وَالْمُؤْمِنَاتِ بِغَيْرِ مَا اكْتَسَبُوا فَقَدِ احْتَمَلُوا بُهْتَانًا وَإِثْمًا مُّبِينًا",
              translation: "And those who harm believing men and believing women for what they have not earned have certainly borne the burden of slander and manifest sin.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6015",
              translation: "The Prophet (peace be upon him) said: \"By Allah, he does not believe — the one whose neighbor does not feel safe from his harm.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

 Your front door, balcony, garden fence, or building entrance is part of the visual environment your neighbors experience daily. A peeling door, a cluttered balcony, or an unkempt front garden subtly degrades the shared aesthetic and can signal neglect that spreads. Maintaining your exterior is a form of ihsan toward your neighbors' daily experience and an expression of the beauty Allah loves.

**How?**

1. Stand outside your front door (or at the street) and look at your home's exterior as a neighbor would see it.
2. Check: is the door clean and in good condition? Is the doorbell working? Are house numbers visible?
3. If you have a balcony: is it tidy, free of stored junk, and visually pleasant?
4. If you have a front garden or yard: is the lawn maintained, are hedges trimmed, and is the path clear?
5. Address any item that looks neglected: repaint a peeling door, clean dirty windows, remove clutter from visible areas.
6. Add something positive if possible: a clean doormat, a simple potted plant, or adequate exterior lighting.
7. Completion indicator: your home's exterior presents a clean, well-maintained appearance that contributes positively to the shared neighborhood environment.` },
      ],
    },
    {
      title: "Handle neighbor conflicts with patience, direct communication, and sabr",
      priority: 'medium', tags: ['haqq-al-jar', 'conflict', 'sabr'],
      description: "Disagreements with neighbors are inevitable — noise disputes, parking issues, boundary questions. Islam provides a clear framework: address issues directly and kindly, exercise patience, and never respond to harm with harm.",
      subtasks: [
        { title: "Adopt the prophetic principle: never respond to a neighbor's harm with harm", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 52:42",
              arabic: "**Translation:** Or do they intend to plan to do harm (to the prophet)? Then the disbelievers themselves shall be harmed by the plan.",
              translation: "Or do they intend to plan to do harm (to the prophet)? Then the disbelievers themselves shall be harmed by the plan.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 10:12",
              arabic: "**Translation:** And when harm touches man, he invokes Us, lying on his side, or sitting or standing. But when We have removed his harm from him, he passes on as if he had never invoked Us for a harm that touched him! Thus it is made fair-seeming to the Musrifûn that which they used to do.",
              translation: "And when harm touches man, he invokes Us, lying on his side, or sitting or standing. But when We have removed his harm from him, he passes on as if he had never invoked Us for a harm that touched him! Thus it is made fair-seeming to the Musrifûn that which they used to do.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 141",
              translation: "Narrated Ibn `Abbas:The Prophet (ﷺ) said, \"If anyone of you on having sexual relations with his wife said (and he must say it before starting) 'In the name of Allah. O Allah! Protect us from Satan and also protect what you bestow upon us (i.e. the coming offspring) from Satan,' and if it is destined that they should have a child then, Satan will never be able to harm that offspring",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 2007",
              arabic: "لاَ تَكُونُوا إِمَّعَةً تَقُولُونَ إِنْ أَحْسَنَ النَّاسُ أَحْسَنَّا وَإِنْ ظَلَمُوا ظَلَمْنَا وَلَكِنْ وَطِّنُوا أَنْفُسَكُمْ إِنْ أَحْسَنَ النَّاسُ أَنْ تُحْسِنُوا وَإِنْ أَسَاءُوا فَلاَ تَظْلِمُوا",
              translation: "Do not be a people without a will of your own, saying: 'If people treat us well, we will treat them well; and if they do wrong, we will do wrong,' but accustom yourselves to do good if people do good, and not to do wrong if they do evil.",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              ratNote: "Verified against sunnah.com 2026-04-26 — ref Tirmidhi 2007 confirmed; arabic + translation realigned (prior fields had been auto-paired with the Bukhari 6018/Muslim 47 'should not hurt his neighbor' narration).",
              rationale: "Direct prophetic command to ground neighborly conduct in independent moral commitment rather than tit-for-tat — the operative basis for refusing retaliation when a neighbor harms you.",
            },
          ],
          description: `**Why?**

 Instead, accustom yourselves to do good if people do good and not to do wrong if they do evil" (Tirmidhi 2007). When a neighbor plays loud music, parks in your spot, or makes an offensive remark, the nafs demands retaliation. But the Prophetic model is clear: you do not mirror harm. Your standard of conduct comes from revelation, not from your neighbor's behavior.

**How?**

1. Memorise and internalise the hadith above — write it somewhere visible as a reminder.
2. When a neighbor does something that annoys or harms you, pause before reacting. Make istighfar and take a breath.
3. Remind yourself that your response defines your character before Allah, regardless of what the neighbor did.
4. Never retaliate with matching harm: if they are noisy, do not become noisy; if they are rude, do not become rude.
5. Choose one of three responses: address it directly with kindness, endure it with sabr, or involve a neutral mediator if the issue persists.
6. If you catch yourself retaliating — even passively (cold silence, deliberate ignoring) — recognise it and correct course.
7. Completion indicator: you have faced at least one genuinely annoying neighbor situation and responded without any form of retaliation, choosing patience or kind direct communication instead.` },
        { title: "When an issue arises, speak to the neighbor privately and directly before involving anyone else", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 41:34",
              arabic: "وَلَا تَسْتَوِي الْحَسَنَةُ وَلَا السَّيِّئَةُ ۚ ادْفَعْ بِالَّتِي هِيَ أَحْسَنُ فَإِذَا الَّذِي بَيْنَكَ وَبَيْنَهُ عَدَاوَةٌ كَأَنَّهُ وَلِيٌّ حَمِيمٌ",
              translation: "And not equal are the good deed and the bad. Repel evil by that which is better; and thereupon the one whom between you and him is enmity will become as though he was a devoted friend.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 49:11",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا لَا يَسْخَرْ قَوْمٌ مِّن قَوْمٍ عَسَىٰ أَن يَكُونُوا خَيْرًا مِّنْهُمْ",
              translation: "O you who have believed, let not a people ridicule another people; perhaps they may be better than them.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Quran says, "Repel evil with that which is better, and thereupon the one between whom and you was enmity will become as though he was a devoted friend" (41:34). Direct, private communication preserves dignity and gives the neighbor the benefit of the doubt — perhaps they are unaware of the impact. Complaining to building management, posting in group chats, or venting to other neighbors before speaking to the person directly is a violation of their right and usually escalates the conflict unnecessarily.


**How?**

1. When an issue arises (noise, parking, waste), wait until you are calm before addressing it.
2. Go to the neighbor's door at a reasonable time — not in the heat of the moment.
3. Begin with salam and a positive statement: "I hope you are well. I wanted to mention something I have noticed..."
4. Describe the impact on you without accusing: "I have been hearing music late at night and it has been affecting my sleep" — not "You are too loud."
5. Assume positive intent: "I am sure you did not realise it was carrying through the walls."
6. Propose a solution collaboratively: "Would it be possible to lower the volume after 10pm?"
7. Completion indicator: you have addressed at least one neighbor issue through direct, private, kind conversation rather than through complaints to third parties.` },
        { title: "Practise sabr with recurring annoyances — endure minor irritations without complaint", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 41:34",
              arabic: "وَلَا تَسْتَوِي الْحَسَنَةُ وَلَا السَّيِّئَةُ ادْفَعْ بِالَّتِي هِيَ أَحْسَنُ",
              translation: "Not equal are the good deed and the bad. Repel [evil] by that [deed] which is better.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6014",
              translation: "The Prophet (peace be upon him) said: \"Jibril kept recommending treating neighbors with kindness until I thought he would assign them a share of the inheritance.\" Enduring minor annoyances with sabr honors this trust.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Not every annoyance requires a conversation. A child crying at night, cooking smells during Ramadan, occasional footsteps above — these are the realities of shared living. Sabr in the face of minor irritation is not weakness; it is the strength of iman that the hadith explicitly links to belief in Allah and the Last Day. It preserves relationships over trivial matters.

**How?**

1. Distinguish between genuine harm (persistent loud parties, property damage) and normal living sounds and smells.
2. For normal living realities — children, cooking, occasional guests, furniture movement — choose sabr as your default response.
3. When irritation rises, say "la hawla wa la quwwata illa billah" and remind yourself of the hadith on enduring neighbor annoyance.
4. Reflect: if you were doing the same thing, would it be reasonable? If yes, the issue is your tolerance, not their behavior.
5. Use practical coping: earplugs for light sleepers, closing windows during cooking hours, background sound for noise sensitivity.
6. Reserve direct conversation for genuine, persistent harm — not every momentary annoyance.
7. Completion indicator: you have consciously chosen sabr over complaint for at least five minor neighbor irritations over a one-month period.` },
        { title: "If a dispute persists, involve a mutually trusted mediator rather than escalating to authorities", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:9",
              arabic: "وَإِن طَائِفَتَانِ مِنَ الْمُإْمِنِينَ اقْتَتَلُوا فَأَصْلِحُوا بَيْنَهُمَا",
              translation: "And if two factions among the believers should fight, then make settlement between the two.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2693",
              translation: "The Prophet (peace be upon him) said: \"Shall I not inform you of something more excellent than fasting, prayer, and charity?\" They said: \"Yes.\" He said: \"Reconciliation between people, for corruption of relationships is the shaver.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Quran instructs: "If two parties among the believers fall into a dispute, make peace between them" (49:9). Involving a trusted third party — a respected community elder, a mutual friend, or the building manager — before resorting to formal complaints or legal action preserves the relationship and follows the Islamic model of community-level dispute resolution. Escalation to authorities should be a last resort, not a first reaction, because it permanently damages the neighborly bond that Allah has placed as a trust upon you.


**How?**

1. If direct conversation has not resolved the issue after two genuine attempts, identify a neutral third party both of you respect.
2. This could be: a building manager, a community elder, a mutual friend, or a local imam.
3. Approach the mediator privately, describe the situation factually without emotional language, and ask if they would be willing to facilitate a conversation.
4. Propose mediation to your neighbor: "I would like us to resolve this together — would you be open to sitting down with [mediator's name] to find a solution?"
5. During mediation, listen as much as you speak, be willing to compromise, and focus on outcomes rather than blame.
6. Accept the mediator's suggested resolution in good faith.
7. Completion indicator: you have identified a potential mediator for any future disputes and committed to the principle of mediation before escalation.` },
        { title: "After resolving a conflict, restore the relationship — visit, bring a gift, or express genuine goodwill", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 41:34",
              arabic: "ادْفَعْ بِالَّتِي هِيَ أَحْسَنُ فَإِذَا الَّذِي بَيْنَكَ وَبَيْنَهُ عَدَاوَةٌ كَأَنَّهُ وَلِيٌّ حَمِيمٌ",
              translation: "Repel evil by that which is better; and thereupon the one between you and him is enmity will become as though he was a devoted friend.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 5152",
              translation: "The Prophet (peace be upon him) said: \"The best of companions in the sight of Allah is the one who is best to his companion, and the best of neighbors is the one who is best to his neighbor.\"",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

 A resolved dispute is not the same as a restored relationship. The lingering awkwardness, the avoidance in the hallway, the stiff nod instead of a warm greeting — these indicate that the conflict ended but the bond did not heal. Islam demands not just resolution but restoration, because you will continue living beside this person and the quality of that proximity matters to your daily life and your akhirah.

**How?**

1. After a conflict is resolved — whether through direct conversation or mediation — take the initiative to restore warmth.
2. Within a few days, bring a small gift: a plate of food, a box of sweets, or fresh fruit.
3. When you deliver it, be genuinely warm: "I am glad we resolved that. I value having you as my neighbor."
4. Resume your normal greeting pattern immediately — do not allow awkward avoidance to take root.
5. If the neighbor seems reserved, give them time but maintain your own warmth consistently.
6. Over the following weeks, look for opportunities to help them or include them — a shared coffee, an offer of assistance.
7. Completion indicator: after a resolved conflict, the relationship has returned to warmth and normal interaction within one month.` },
      ],
    },
    {
      title: "Fulfil the basic needs of vulnerable neighbors — elderly, sick, alone, or in hardship",
      priority: 'high', tags: ['haqq-al-jar', 'vulnerable', 'care'],
      description: " Vulnerable neighbors — the elderly, the sick, those living alone, recent arrivals, or families facing hardship — have an amplified right to your attention. This task ensures you identify and actively care for those in your vicinity who need it most.",
      subtasks: [
        { title: "Identify which of your neighbors are elderly, living alone, recently moved in, or facing visible hardship", done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6011",
              translation: "The Prophet (peace be upon him) said: \"The believers in their mutual kindness, compassion, and sympathy are just like one body. When one limb suffers, the whole body responds with wakefulness and fever.\" Identifying vulnerable neighbors is the first step toward fulfilling this communal body's duty.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 107:1-3",
              arabic: "أَرَأَيْتَ الَّذِي يُكَذِّبُ بِالدِّينِ فَذَٰلِكَ الَّذِي يَدُعُّ الْيَتِيمَ وَلَا يَحُضُّ عَلَىٰ طَعَامِ الْمِسْكِينِ",
              translation: "Have you seen the one who denies the Recompense? For that is the one who drives away the orphan and does not encourage the feeding of the poor.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Quran's command to show ihsan to "the neighbor who is near" (4:36) applies with special weight to those who are vulnerable. An elderly person living alone may not have anyone to call in an emergency. A new arrival may not speak the language or know how to access services. A family facing hardship may be too proud to ask for help. You cannot fulfil enhanced duty of care toward vulnerable neighbors if you have not identified who they are. This awareness transforms generic goodwill into targeted, meaningful support.


**How?**

1. Review your neighbor map and note any households where you know or suspect vulnerability: elderly residents, people living alone, recent immigrants, single-parent families, or anyone you have seen struggling.
2. Pay attention to indirect signs: an elderly person who struggles with shopping bags, a unit where you never see visitors, a family that recently moved in and seems unfamiliar with the area.
3. Speak with longer-term neighbors who may know the community better — they can help you identify who might need support.
4. Be sensitive and not intrusive: you are building awareness, not conducting an investigation.
5. Note any immediate needs you can already see: someone who has difficulty with stairs, a neighbor who never seems to leave the house, a family with very young children and no visible support.
6. Record what you learn on your neighbor map, marking vulnerable households.
7. Completion indicator: you have identified at least two or three neighbors who fall into a vulnerable category and noted their likely needs.` },
        { title: "Check on elderly or alone neighbors regularly — a knock, a call, a brief visit", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:36",
              arabic: "وَالْجَارِ ذِي الْقُرْبَىٰ وَالْجَارِ الْجُنُبِ",
              translation: "And the near neighbor, the neighbor farther away.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 107:1-3",
              arabic: "أَرَأَيْتَ الَّذِي يُكَذِّبُ بِالدِّينِ ۝ فَذَٰلِكَ الَّذِي يَدُعُّ الْيَتِيمَ ۝ وَلَا يَحُضُّ عَلَىٰ طَعَامِ الْمِسْكِينِ",
              translation: "Have you seen the one who denies the Recompense? For that is the one who drives away the orphan and does not encourage the feeding of the poor.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6014",
              translation: "The Prophet (peace be upon him) said: \"Jibril kept advising me about the neighbor until I thought he would make him an heir.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) visited the sick, checked on the absent, and noticed when regular community members were missing. Elderly and alone neighbors can experience health emergencies, falls, or severe loneliness without anyone noticing for days. A regular check — even a brief knock and "How are you today?" — can be literally lifesaving and is always soul-nourishing. In many communities, the neighbor is the first line of human contact for isolated people, making this act of checking one of the most impactful expressions of Haqq al-Jar.


**How?**

1. Choose a consistent frequency for checking: daily for a very elderly or frail neighbor, two to three times per week for others living alone.
2. A check can be as simple as knocking on the door and saying, "I just wanted to see if you need anything today."
3. If you have their phone number, a brief call works too: "Assalamu alaykum, just checking in — is everything alright?"
4. Be observant during checks: does the neighbor look well? Is mail piling up? Do they seem confused or distressed?
5. If a neighbor does not answer and you have reason for concern, escalate appropriately — contact a family member, building management, or in genuine emergencies, the authorities.
6. Bring something small occasionally: a cup of tea, a piece of fruit, or a brief conversation if they seem lonely.
7. Completion indicator: you have established a consistent check-in routine with at least one vulnerable neighbor, maintained for at least three weeks.` },
        { title: "Offer practical help to neighbors in hardship — groceries, errands, childcare assistance, or a ride", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:177",
              arabic: "وَآتَى الْمَالَ عَلَىٰ حُبِّهِ ذَوِي الْقُرْبَىٰ وَالْيَتَامَىٰ وَالْمَسَاكِينَ وَابْنَ السَّبِيلِ",
              translation: "And gives wealth, in spite of love for it, to relatives, orphans, the needy, the traveler.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2625",
              translation: "The Prophet (peace be upon him) said: \"Whoever relieves a believer of a hardship in this world, Allah will relieve him of a hardship on the Day of Resurrection.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

 This hadith extends beyond food to any unmet need within your capacity. A neighbor who lost their job may need groceries. A single parent may need someone to watch their child for an hour. An elderly person may need a ride to a medical appointment. These are not extraordinary acts of charity — they are the baseline of what Islam expects when you have the capacity and your neighbor has the need. Fulfilling them is a condition of complete iman.

**How?**

1. When you learn that a neighbor is facing hardship, think practically: what do they likely need, and what can I provide?
2. Offer specifically rather than vaguely: "I am going to the supermarket — can I pick up anything for you?" is better than "Let me know if you need anything."
3. For groceries: bring a bag of staples without being asked — rice, bread, milk, eggs, fruit.
4. For errands: offer to post a letter, collect a prescription, or drop off a document.
5. For childcare: offer to watch children for an hour so the parent can attend to urgent matters.
6. For transport: offer a ride to a medical appointment, a government office, or the masjid.
7. Completion indicator: you have provided at least three specific acts of practical help to a neighbor in need over a two-month period.` },
        { title: "Welcome new neighbors — introduce yourself, provide local information, and offer to help them settle in", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:36",
              arabic: "وَبِالْوَالِدَيْنِ إِحْسَانًا وَبِذِي الْقُرْبَىٰ وَالْيَتَامَىٰ وَالْمَسَاكِينِ وَالْجَارِ ذِي الْقُرْبَىٰ وَالْجَارِ الْجُنُبِ",
              translation: "And to parents do good, and to relatives, orphans, the needy, the near neighbor, the neighbor farther away.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 54",
              translation: "The Prophet (peace be upon him) said: \"You will not enter Paradise until you believe, and you will not believe until you love one another. Shall I tell you something which, if you do it, you will love one another? Spread the salam among yourselves.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Moving to a new home is one of life's most disorienting experiences, especially for families who have relocated to a new city or country. The first person who shows kindness in a new place is remembered for years. The Prophet (peace be upon him) was the ultimate exemplar of welcoming strangers and making them feel at home. Your welcome to a new neighbor can determine whether they feel isolated in their new environment or immediately connected to a caring community — a direct manifestation of the Quranic command to show ihsan to the neighbor.


**How?**

1. When you notice new occupants in an adjacent home, introduce yourself within the first week — do not wait for a "convenient" moment that never comes.
2. Bring a small welcome gift: a plate of homemade food, a box of dates, or a selection of fruit.
3. Provide practical local information: nearest supermarket, pharmacy, post office, school, masjid, doctor, and any useful community groups.
4. If they have children, let them know about nearby parks, playgrounds, and any local children's activities.
5. Offer specific help: "If you need anything while you are settling in — borrowing a tool, figuring out rubbish collection days, or just directions — please do not hesitate to knock."
6. If they are from a different cultural background, be especially warm and patient — they may be navigating language barriers and unfamiliar systems.
7. Completion indicator: you have personally welcomed at least one new neighbor family with a visit, a gift, and practical local information.` },
        { title: "Keep a small emergency supply you can share with a neighbor in sudden need — torch, first aid, bottled water, non-perishable food", done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 107:7",
              arabic: "وَيَمْنَعُونَ الْمَاعُونَ",
              translation: "and forbid common kindnesses.",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              rationale: "the Quran rebukes those who withhold simple aid — keeping emergency supplies ready to share is the positive fulfilment of what this verse prohibits neglecting.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6018",
              translation: "The Prophet (peace be upon him) said: \"Whoever believes in Allah and the Last Day should not harm his neighbor.\"",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "being prepared to help a neighbor in sudden need is the practical expression of \"not harming\" — unpreparedness can mean abandoning a neighbor when help is most needed.",
            },
          ],
          description: `**Why?**

Emergencies do not announce themselves. A power outage, a water main break, a family crisis, or a sudden illness can leave a neighbor in immediate need. Having basic supplies ready to share is part of the practical preparedness that Islam encourages. The Prophet (peace be upon him) tied his camel before trusting in Allah — preparation and tawakkul go together. A torch lent during a blackout, a bottle of water during a pipe burst, or a basic first aid kit when a child is hurt — these small acts of preparedness can transform you from a bystander into the neighbor who was there when it mattered.


**How?**

1. Assemble a small, clearly labelled emergency kit that you designate for neighbor sharing.
2. Include: a working torch with spare batteries, a basic first aid kit, two to three litres of bottled water, a few packets of non-perishable food (biscuits, dates, nuts, tinned goods), and a phone charger.
3. Store it in an accessible location near your front door — you need to be able to grab it quickly.
4. Check the kit every three months: replace expired items, test the torch, and refresh the water.
5. Let your closest neighbors know: "If you ever have an emergency and need a torch, water, or first aid, please knock — I keep supplies ready."
6. When an emergency actually occurs, offer what you have without being asked.
7. Completion indicator: a neighbour-sharing emergency kit is assembled, stored accessibly, and at least two neighbors know it exists.` },
      ],
    },
    {
      title: 'Institutionalise amr bil-ma\'ruf wa nahi \'anil-munkar — commanding good and forbidding evil as a community practice',
      priority: 'medium', tags: ['amr-bil-maruf', 'hisbah', 'accountability'],
      description: 'Allah says, "You are the best community singled out for people: you command what is right, forbid what is wrong, and believe in Allah" (Quran 3:110). This is not optional — it is the defining characteristic of the ummah. Institutionalising this practice means moving beyond individual advice-giving to a community-wide culture of mutual accountability, done with wisdom, gentleness, and due process.',
      subtasks: [
        { title: 'Study the fiqh and adab of amr bil-ma\'ruf — learn the principles before acting', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:104",
              arabic: "وَلْتَكُن مِّنكُمْ أُمَّةٌ يَدْعُونَ إِلَى الْخَيْرِ وَيَأْمُرُونَ بِالْمَعْرُوفِ وَيَنْهَوْنَ عَنِ الْمُنكَرِ",
              translation: "And let there be [arising] from you a nation inviting to [all that is] good, enjoining what is right and forbidding what is wrong.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 49",
              translation: "The Prophet (peace be upon him) said: \"Whoever among you sees an evil, let him change it with his hand; if he cannot, then with his tongue; if he cannot, then with his heart — and that is the weakest of faith.\" **II. Hadith**",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 79",
              translation: "Recorded in Sahih Muslim 79: 'He who amongst you sees something abominable should modify it with the help of his hand; and if he has not strength... with his tongue... (or) from his heart.'",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Commanding good and forbidding evil without knowledge of its principles causes more harm than the evil it seeks to address. Imam al-Ghazali dedicated an entire book of the Ihya to this topic, emphasising that the one who commands good must know what is good, must do it with wisdom and gentleness, and must not cause greater harm in the process. The Prophet (peace be upon him) said, "Whoever sees an evil, let him change it with his hand; if he cannot, then with his tongue; if he cannot, then with his heart" (Muslim) — but each level has conditions that must be understood.


**How?**

1. Read the relevant section of Imam al-Ghazali's Ihya Ulum al-Din (Book 19 or 20 depending on the edition) on the conditions and etiquette of commanding good and forbidding evil.
2. Study the Quranic ayat on the topic: 3:104, 3:110, 7:199, 16:125, and 31:17. Note the emphasis on wisdom, good preaching, and gentle argumentation.
3. Learn the scholarly conditions: the person must have knowledge of the issue, the evil must be clearly established (not doubtful), the correction must not cause greater harm, and the approach must be proportional and gentle.
4. Study examples from the seerah where the Prophet (peace be upon him) corrected people: the bedouin who urinated in the masjid, the young man who asked permission to commit zina, the companions who made mistakes in worship.
5. Understand the difference between communal obligation (fard kifayah) and individual vigilantism — this is a community practice, not a licence for self-appointed moral police.
6. Discuss what you have learned with the imam and the sulh committee — the same people who mediate disputes should understand this framework.
7. Completion indicator: you can articulate the conditions, principles, and adab of amr bil-ma'ruf to another person, citing at least three scholarly sources and three Prophetic examples.` },
        { title: 'Establish a community standards framework — agreed-upon values and conduct expectations', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:110",
              arabic: "كُنتُمْ خَيْرَ أُمَّةٍ أُخْرِجَتْ لِلنَّاسِ تَأْمُرُونَ بِالْمَعْرُوفِ وَتَنْهَوْنَ عَنِ الْمُنكَرِ وَتُؤْمِنُونَ بِاللَّهِ",
              translation: "You are the best nation produced for mankind. You enjoin what is right and forbid what is wrong and believe in Allah.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 3:104",
              arabic: "وَلْتَكُن مِّنكُمْ أُمَّةٌ يَدْعُونَ إِلَى الْخَيْرِ وَيَأْمُرُونَ بِالْمَعْرُوفِ وَيَنْهَوْنَ عَنِ الْمُنكَرِ",
              translation: "And let there be arising from you a nation inviting to all that is good, enjoining what is right and forbidding what is wrong.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 49",
              translation: "The Prophet (peace be upon him) said: \"Whoever among you sees an evil, let him change it with his hand; if he cannot, then with his tongue; if he cannot, then with his heart — and that is the weakest of faith.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

You cannot hold people accountable to standards they have not agreed to. A community standards framework makes expectations explicit, shared, and transparent. It is the communal equivalent of a personal code of conduct — grounded in Quran and Sunnah but contextualised for your specific community. Without it, "commanding good" becomes subjective and potentially oppressive, because everyone has a different threshold for what constitutes "good" and "evil" in grey areas.


**How?**

1. Convene a community meeting (or a series of smaller meetings) to discuss: "What values and behaviours do we want to define our community?"
2. Ground the discussion in Quran and Sunnah — start with non-negotiables (salah, honesty, avoidance of backbiting, kindness to neighbours) and then address community-specific issues.
3. Draft a document covering: core Islamic values the community commits to, expected conduct at community events and in the masjid, how concerns are raised (through the sulh process, not public shaming), and how the community supports members who are struggling.
4. Emphasise that the framework is about mutual support, not surveillance. The tone should be "We help each other grow" not "We punish each other for failing."
5. Circulate the draft for community feedback. Revise based on input.
6. Present the final version at a community gathering with the imam's endorsement.
7. Completion indicator: a written community standards document, developed through consultation, endorsed by the imam and community leadership, and distributed to community members.` },
        { title: 'Train community leaders in the art of giving nasihah (sincere advice) with wisdom and compassion', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:269",
              arabic: "يُؤْتِي الْحِكْمَةَ مَن يَشَاءُ ۚ وَمَن يُؤْتَ الْحِكْمَةَ فَقَدْ أُوتِيَ خَيْرًا كَثِيرًا ۗ وَمَا يَذَّكَّرُ إِلَّا أُولُو الْأَلْبَابِ",
              translation: "and He gives wisdom to whoever He will. Whoever is given wisdom has truly been given much good, but only those with insight bear this in mind.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 7:21",
              arabic: "وَقَاسَمَهُمَا إِنِّي لَكُمَا لَمِنَ النَّاصِحِينَ",
              translation: "and he swore to them, 'I am giving you sincere advice",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              rationale: "the Shaytan's false claim of nasihah — a warning that nasihah can be weaponised; authentic nasihah requires the wisdom of 2:269 and the sincerity governed by fear of Allah",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 55a",
              translation: "The Prophet (peace be upon him) said: \"The religion is nasihah (sincere advice).\" We said, \"To whom?\" He said, \"To Allah, to His Book, to His Messenger, and to the leaders of the Muslims and their common folk.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 98",
              translation: "Recorded in Sahih Muslim 98: 'Al-Din is a name of sincerity and well wishing (Al-Din al-Nasiha).'",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) said, "The religion is nasihah" (Muslim). But nasihah delivered without wisdom, compassion, and tact does more harm than silence. Most people who give nasihah focus on what they want to say rather than what the recipient needs to hear. Training community leaders — imams, teachers, board members, and respected elders — in the art of effective, compassionate counsel ensures that amr bil-ma'ruf is practised as the Prophet intended: with gentleness that opens hearts rather than harshness that hardens them.


**How?**

1. Identify 5-10 community leaders who are frequently in positions to give advice: the imam, halaqa teachers, youth mentors, board members, and respected elders.
2. Organise a half-day training workshop covering: the Prophetic methodology of nasihah, active listening skills, emotional intelligence, cultural sensitivity, and the difference between nasihah and judgement.
3. Use case studies: present realistic scenarios (a community member missing prayers, a family experiencing marital conflict, a youth questioning faith) and practise responding with wisdom.
4. Teach the "private first" principle: the Prophet (peace be upon him) almost always corrected people privately before addressing issues publicly. Public correction is a last resort.
5. Address what not to do: do not give nasihah when angry, do not use a condescending tone, do not share the person's issue with others, and do not follow up obsessively.
6. Provide a simple reference card summarising the key principles that participants can keep in their wallets or phones.
7. Completion indicator: a training session has been held with at least 5 community leaders, practical exercises have been completed, and a reference guide has been distributed.` },
        { title: 'Implement a community accountability loop — regular check-ins on how the community is living its values', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 103:3",
              arabic: "وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ",
              translation: "And advised each other to truth and advised each other to patience.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2564",
              translation: "The Prophet (peace be upon him) said: \"None of you truly believes until he loves for his brother what he loves for himself.\" Regular community check-ins on shared values are an expression of this mutual love and accountability.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Values without accountability decay into aspirations. A regular accountability loop ensures the community does not merely declare its values but actively lives them. Umar ibn al-Khattab (may Allah be pleased with him) instituted regular public accounting — he would walk the streets of Madinah at night checking on his people's welfare. A modern community equivalent is a structured, periodic review of how the community is living up to its own stated standards.


**How?**

1. Schedule a quarterly "community health check" — a meeting where community members can discuss how the community is doing, not just what programmes are running.
2. Design the check-in around the community standards framework: for each stated value, ask "How are we doing? Where are we strong? Where are we falling short?"
3. Create a safe space for honest feedback — consider anonymous submission of concerns alongside open discussion.
4. Include specific metrics where possible: attendance trends, programme participation, sulh cases resolved, financial solidarity actions taken.
5. Assign follow-up actions: if the community identifies a gap (e.g., "We said we value welcoming newcomers, but no one greeted the new family last month"), assign specific people to address it.
6. Share a summary of each check-in with the broader community — transparency about both strengths and weaknesses builds trust.
7. Completion indicator: the first quarterly community health check has been held, with at least 15 community members participating, gaps identified, and follow-up actions assigned with responsible individuals and deadlines.` },
        { title: 'Create a system for community members to raise concerns safely and have them addressed', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:135",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا كُونُوا قَوَّامِينَ بِالْقِسْطِ شُهَدَاءَ لِلَّهِ وَلَوْ عَلَىٰ أَنفُسِكُمْ",
              translation: "O you who have believed, be persistently standing firm in justice, witnesses for Allah, even if it be against yourselves.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 5:8",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا كُونُوا قَوَّامِينَ لِلَّهِ شُهَدَاءَ بِالْقِسْطِ وَلَا يَجْرِمَنَّكُمْ شَنَآنُ قَوْمٍ عَلَىٰ أَلَّا تَعْدِلُوا",
              translation: "O you who have believed, be persistently standing firm for Allah, witnesses in justice, and do not let the hatred of a people prevent you from being just.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 49",
              translation: "The Prophet (peace be upon him) said: \"Whoever among you sees an evil, let him change it with his hand; if he cannot, then with his tongue; if he cannot, then with his heart — and that is the weakest of faith.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Amr bil-ma'ruf cannot function if people are afraid to speak. Many community members — especially women, youth, and converts — stay silent about problems because they fear backlash, dismissal, or being labelled as troublemakers. A safe, structured system for raising concerns ensures that the community hears what it needs to hear, not just what it wants to hear.

**How?**

1. Establish a confidential concern submission method: a dedicated email address, an anonymous online form, or a physical suggestion box at the masjid.
2. Assign a small, trusted team (2-3 people) to receive and triage concerns. This team should include both a man and a woman.
3. Define categories of concerns: interpersonal disputes (refer to sulh process), programme feedback, leadership accountability, safety issues, and general suggestions.
4. Commit to a response timeline: every concern receives acknowledgement within one week and a substantive response or action within one month.
5. For serious concerns (safety, abuse, financial misconduct), define an escalation path that includes external authorities if necessary. This is non-negotiable.
6. Report anonymised trends to the community quarterly: "We received 12 concerns this quarter. The top themes were X, Y, Z. Here is what we did about them."
7. Completion indicator: a concern submission system is live, a triage team is appointed, response timelines are published, and the system has been communicated to the community through at least two channels.` },
      ],
    },
    {
      title: 'Build interfaith bridges — represent Islam authentically while fostering cooperation with neighbours of other faiths',
      priority: 'medium', tags: ['interfaith', 'da\'wah', 'coexistence'],
      description: 'The Quran says, "O humanity, We created you from a male and a female and made you peoples and tribes that you may know one another" (49:13). Interfaith engagement is not compromise — it is the Quranic mandate to make ourselves known, to cooperate on shared values, and to represent Islam with excellence. The Prophet (peace be upon him) maintained relationships with Jewish and Christian neighbours, participated in shared civic life, and was known for his integrity by people of all faiths.',
      subtasks: [
        { title: 'Identify and connect with 2-3 neighbouring faith communities (churches, synagogues, temples)', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:13",
              arabic: "يَا أَيُّهَا النَّاسُ إِنَّا خَلَقْنَاكُم مِّن ذَكَرٍ وَأُنثَىٰ وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا",
              translation: "O mankind, indeed We have created you from male and female and made you peoples and tribes that you may know one another.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 60:8",
              arabic: "لَّا يَنْهَاكُمُ اللَّهُ عَنِ الَّذِينَ لَمْ يُقَاتِلُوكُمْ فِي الدِّينِ وَلَمْ يُخْرِجُوكُم مِّن دِيَارِكُمْ أَن تَبَرُّوهُمْ وَتُقْسِطُوا إِلَيْهِمْ",
              translation: "Allah does not forbid you from those who do not fight you because of religion and do not expel you from your homes — from being righteous toward them and acting justly toward them.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6927",
              translation: "The Prophet (peace be upon him) had a Jewish neighbour who used to throw rubbish at his door, and when the neighbour fell ill, the Prophet visited him. This exemplifies the prophetic model of interfaith kindness.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

You cannot build bridges to communities you do not know. Many Muslim communities exist in geographic proximity to churches, synagogues, and temples without any meaningful contact. This isolation breeds mutual ignorance and suspicion — exactly what Quran 49:13's command to "know one another" is designed to prevent. The Prophet (peace be upon him) knew his Jewish and Christian neighbours personally; initiating contact follows his model.


**How?**

1. Research religious institutions within a 5-mile radius of your masjid — churches, synagogues, temples, and other houses of worship.
2. Identify 2-3 that seem open to interfaith engagement — look for those that already have interfaith programmes, community service activities, or progressive leadership.
3. Draft a brief, warm introductory letter or email from your imam or community leader: "We are your neighbours at [masjid name]. We would love to meet, learn about your community, and explore how we might serve our shared neighbourhood together."
4. Follow up the letter with a phone call or in-person visit — written communication initiates, but relationship requires face-to-face contact.
5. Propose a simple first meeting: a coffee or tea between leaders, with no agenda beyond getting to know each other.
6. Be genuine, not transactional. Do not approach interfaith engagement solely as a da'wah strategy — approach it as the Quranic ethic of li-ta'arafu (so that you may know one another).
7. Completion indicator: you have established initial contact with at least two neighbouring faith communities, and a first meeting between leaders has been held or scheduled.` },
        { title: 'Co-organise a joint community service project with a neighbouring faith community', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:13",
              arabic: "يَا أَيُّهَا النَّاسُ إِنَّا خَلَقْنَاكُم مِّن ذَكَرٍ وَأُنثَىٰ وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا",
              translation: "O mankind, indeed We have created you from male and female and made you peoples and tribes that you may know one another.\"",
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
          ],
          description: `**Why?**

Shared action builds deeper connection than dialogue alone. The Quran commands, "Cooperate in righteousness and piety, and do not cooperate in sin and transgression" (5:2). Feeding the hungry, cleaning a park, or supporting refugees are acts of righteousness that Muslims, Christians, Jews, and people of all faiths can unite around. Joint service breaks stereotypes, creates personal bonds, and demonstrates Islamic values through action rather than argument.


**How?**

1. During your initial meetings with neighbouring faith leaders, propose a joint community service project. Start with something achievable: a food drive, a neighbourhood clean-up, or a coat collection for winter.
2. Choose a project that serves the broader neighbourhood, not just one religious community — this ensures genuine cooperation rather than one group helping the other.
3. Plan together: shared planning meetings build the relationship. Ensure equal voice and contribution from both communities.
4. Set a date and promote the event in both communities — the cross-pollination of volunteers is where the real interfaith connection happens.
5. During the project, work side by side. Create opportunities for natural conversation — shared labour naturally leads to shared stories.
6. Afterward, hold a brief joint reflection: "What did we accomplish? What did we learn about each other? What should we do next?"
7. Completion indicator: a joint service project has been completed with active participation from both communities, and a follow-up activity has been discussed or planned.` },
        { title: 'Host an open day at the masjid — invite neighbours of all faiths to visit, learn, and ask questions', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 16:125",
              arabic: "ادْعُ إِلَىٰ سَبِيلِ رَبِّكَ بِالْحِكْمَةِ وَالْمَوْعِظَةِ الْحَسَنَةِ وَجَادِلْهُم بِالَّتِي هِيَ أَحْسَنُ",
              translation: "Invite to the way of your Lord with wisdom and good instruction, and argue with them in a way that is best.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 29:46",
              arabic: "وَلَا تُجَادِلُوا أَهْلَ الْكِتَابِ إِلَّا بِالَّتِي هِيَ أَحْسَنُ",
              translation: "And do not argue with the People of the Scripture except in a way that is best.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 3461",
              translation: "The Prophet (peace be upon him) said: \"Convey from me even if it is one verse.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

For many non-Muslims, the masjid is a mysterious, intimidating place associated with media stereotypes. An open day demystifies the masjid, humanises the Muslim community, and creates space for genuine dialogue. The Prophet's masjid in Madinah was open to people of all faiths — a Christian delegation from Najran even prayed in it. Hosting an open day is reviving this sunnah of hospitality and accessibility.


**How?**

1. Choose a date — consider aligning it with an existing national event (Interfaith Harmony Week, Neighbours Day) or a time of Islamic significance you want to share (Eid, Ramadan open iftar).
2. Plan the programme: guided tours of the masjid (explain the prayer hall, the mihrab, the wudu area), a brief introduction to Islam's core beliefs and practices, a Q&A session, and a shared meal.
3. Assign welcoming volunteers who are warm, articulate, patient with questions, and comfortable with non-Muslim visitors. Brief them on common questions and respectful answers.
4. Prepare the space: clear signage, a welcome table, printed materials (what is Islam, who was Prophet Muhammad, what is salah), and refreshments.
5. Personally invite your interfaith contacts, neighbours, local elected officials, and anyone who has expressed curiosity about Islam.
6. During the event, prioritise listening over lecturing. The best da'wah at an open day is genuine hospitality and honest conversation.
7. Completion indicator: an open day has been held with at least 15 non-Muslim visitors, positive feedback has been received, and follow-up contact information has been exchanged with interested visitors.` },
        { title: 'Participate in local civic life — attend town halls, join neighbourhood associations, and represent Muslim interests', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:13",
              arabic: "يَا أَيُّهَا النَّاسُ إِنَّا خَلَقْنَاكُم مِّن ذَكَرٍ وَأُنثَىٰ وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا",
              translation: "O mankind, indeed We have created you from male and female and made you peoples and tribes that you may know one another.",
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
              ref: "Sahih Muslim 2586",
              translation: "The Prophet (peace be upon him) said: \"None of you truly believes until he loves for his brother what he loves for himself.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Islam does not command withdrawal from society — it commands engagement. Muslim presence in civic life ensures that community interests are represented, counters marginalisation, and demonstrates that Muslims are invested in the well-being of the entire neighbourhood, not just their own enclave.

**How?**

1. Identify the civic structures in your area: town council or city council meetings, neighbourhood associations, school boards, interfaith councils, and local charity coalitions.
2. Attend at least one meeting or event as an observer to understand how decisions are made and where Muslim community interests intersect with broader civic priorities.
3. Introduce yourself as a representative of the Muslim community. Make your presence known and normalised — do not wait for a crisis to show up.
4. Identify 1-2 issues where the Muslim community's interests align with the broader neighbourhood: traffic safety near the masjid, park maintenance, public school quality, or refugee support.
5. Volunteer for a committee or working group — active participation carries more weight than attendance alone.
6. Report back to your community: what is happening in local governance, what opportunities exist, and what issues need the community's attention.
7. Completion indicator: you have attended at least two civic meetings, introduced yourself as a community representative, and joined or volunteered for one committee or initiative.` },
        { title: 'Develop a community media and communication strategy — tell your own story before others tell it for you', done: false,
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
              arabic: "وَمَنْ أَحْسَنُ قَوْلًا مِّمَّن دَعَا إِلَى اللَّهِ وَعَمِلَ صَالِحًا وَقَالَ إِنَّنِي مِنَ الْمُسْلِمِينَ",
              translation: "And who is better in speech than one who invites to Allah and does righteousness and says, \"Indeed, I am of the Muslims.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 3461",
              translation: "The Prophet (peace be upon him) said: \"Convey from me even if it is one verse.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

In the age of social media and 24-hour news, communities that do not tell their own story have it told for them — often inaccurately and harmfully. A proactive communication strategy ensures your community controls its narrative, shares its contributions, and builds goodwill. The Prophet (peace be upon him) used the poet Hassan ibn Thabit to respond to attacks on the Muslim community's reputation — strategic communication is sunnah.


**How?**

1. Audit your current community presence: does your masjid have a website? Social media accounts? Are they active and well-maintained?
2. Assign a communications volunteer or small team responsible for regularly posting content: event announcements, community service highlights, educational snippets, and Eid greetings.
3. Create content that showcases the community's contributions to the broader neighbourhood — not just internal religious events. "Our community served 200 meals at the local shelter this month" resonates far beyond the Muslim audience.
4. Build relationships with local journalists: invite them to positive community events, offer spokespeople for comment on relevant stories, and respond to negative coverage with factual, measured corrections.
5. Develop a crisis communication plan: if a negative incident occurs (whether involving the community or targeting it), have a designated spokesperson, a pre-drafted statement template, and a rapid response process.
6. Ensure all communications reflect Islamic values: honesty, dignity, avoidance of sensationalism, and respect for others.
7. Completion indicator: the masjid has an active social media presence with at least one post per week, a designated communications person or team, and a one-page crisis communication plan.` },
      ],
    },
    {
      title: 'Launch global ummah solidarity projects — connect local effort to worldwide Muslim concerns',
      priority: 'medium', tags: ['global-solidarity', 'ummah', 'international'],
      description: ' A community that only looks inward is not living up to the ummah ideal. Global solidarity projects connect your local community to the broader body of believers, channelling resources, prayer, and advocacy to where they are needed most.',
      subtasks: [
        { title: 'Research current crises and needs affecting the global ummah — become informed before acting', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 21:92",
              arabic: "إِنَّ هَٰذِهِ أُمَّتُكُمْ أُمَّةً وَاحِدَةً وَأَنَا رَبُّكُمْ فَاعْبُدُونِ",
              translation: "Indeed this, your ummah, is one ummah, and I am your Lord, so worship Me.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 49:10",
              arabic: "إِنَّمَا الْمُؤْمِنُونَ إِخْوَةٌ",
              translation: "The believers are but brothers.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2586",
              translation: "The Prophet (peace be upon him) said: \"The believers in their mutual kindness, compassion and sympathy are like one body. When one limb suffers, the whole body responds to it with wakefulness and fever.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Uninformed solidarity is performative — it makes the giver feel good without effectively helping anyone. The global ummah faces diverse, complex challenges: displacement, famine, persecution, economic exploitation, and environmental disasters. Understanding the specifics — who is affected, what they need, which organisations are on the ground — ensures your community's efforts are targeted, effective, and sustained rather than reactive and short-lived.


**How?**

1. Identify reliable sources of information on global Muslim affairs: UNHCR reports, Islamic Relief situation updates, ICNA Relief bulletins, and credible Muslim news outlets.
2. Focus on 3-5 current situations — trying to address everything leads to addressing nothing effectively.
3. For each situation, understand: what is happening, how many people are affected, what are the immediate needs (food, shelter, medical care), what are the long-term needs (education, economic development, legal advocacy), and which organisations are working on the ground.
4. Verify the credibility and efficiency of aid organisations before partnering with them — check financial transparency, programmes they run, and on-the-ground presence.
5. Prepare a brief summary document for your community: one page per crisis, covering the situation, the need, and recommended ways to help.
6. Present these findings at a community gathering or through community communication channels to build collective awareness.
7. Completion indicator: a researched summary of 3-5 current global ummah crises with verified aid organisations and specific needs, shared with the community.` },
        { title: 'Adopt one global cause as a community and commit sustained support over 12 months', done: false,
          sources: [
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
              kind: "quran",
              ref: "Quran 59:9",
              arabic: "وَيُؤْثِرُونَ عَلَىٰ أَنفُسِهِمْ وَلَوْ كَانَ بِهِمْ خَصَاصَةٌ",
              translation: "And they give preference over themselves, even though they are in need.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6011",
              translation: "The Prophet (peace be upon him) said: \"The believers in their mutual kindness, compassion and sympathy are like one body. When one of the limbs suffers, the whole body responds with sleeplessness and fever.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Scattered, one-off donations to many causes spread resources thin and build no sustained impact. The most effective communities adopt a focused cause and commit to it over time — this allows for meaningful financial contribution, relationship-building with on-the-ground organisations, and deep community engagement. It mirrors the Prophetic model of deep investment rather than surface-level gestures.


**How?**

1. Based on your research, present 3-5 causes to the community and facilitate a vote or consensus discussion on which one to adopt for the year.
2. Choose a cause that has both urgency and a clear pathway for community involvement — not just financial support, but potentially advocacy, awareness-raising, and direct engagement.
3. Partner with a specific, vetted organisation working on that cause. Establish a direct relationship — not just a donation link, but communication with their team.
4. Set a 12-month financial target: how much will your community raise over the year? Break it into monthly goals.
5. Create a multi-channel support plan: monthly fundraising, quarterly awareness events, letter-writing or advocacy campaigns, and educational programming about the cause.
6. Assign a dedicated volunteer or committee to manage the initiative and provide monthly progress updates to the community.
7. Completion indicator: one global cause has been selected through community consultation, a partner organisation has been engaged, a 12-month financial target has been set, and the first month's contribution has been made.` },
        { title: 'Organise community-wide du\'a and awareness nights for the global ummah', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:186",
              arabic: "وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ أُجِيبُ دَعْوَةَ الدَّاعِ إِذَا دَعَانِ",
              translation: "And when My servants ask you concerning Me — indeed I am near. I respond to the invocation of the supplicant when he calls upon Me.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 21:92",
              arabic: "إِنَّ هَٰذِهِ أُمَّتُكُمْ أُمَّةً وَاحِدَةً",
              translation: "Indeed this, your ummah, is one ummah.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2586",
              translation: "The Prophet (peace be upon him) said: \"The parable of the believers in their mutual love and mercy is like that of a body: when one limb aches, the whole body responds with sleeplessness and fever.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Material support is essential, but spiritual solidarity — collective du'a, shared grief, and communal remembrance — is equally important. The Prophet (peace be upon him) and his companions made du'a consistently for the persecuted believers and the wider ummah. Du'a nights serve multiple purposes: they connect your community emotionally to global struggles, they fulfil the spiritual obligation of caring for the ummah, and they motivate continued material support by keeping the cause present in people's hearts.


**How?**

1. Schedule a monthly du'a and awareness night — a dedicated evening at the masjid focused on the global ummah.
2. Structure the programme: a brief presentation on the adopted cause (updates, stories, data), a short Islamic reminder on solidarity and du'a, and an extended collective du'a session led by the imam.
3. Include specific, informed du'a — not just "help the Muslims everywhere" but "O Allah, provide shelter for the displaced families in [specific situation], heal the wounded, and guide those in authority to justice."
4. Invite guest speakers when possible: a representative from the partner organisation, a community member who has visited the affected area, or someone with personal connection to the cause.
5. Display visuals — maps, photos (with consent), and data — to make the distant feel immediate.
6. Combine the du'a night with a fundraising collection — people give most generously when their hearts are engaged.
7. Completion indicator: at least three monthly du'a and awareness nights have been held, with consistent attendance and integrated fundraising.` },
        { title: 'Connect with a Muslim community abroad — build a sister-community relationship', done: false,
          sources: [
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
              kind: "quran",
              ref: "Quran 49:13",
              arabic: "وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا",
              translation: "And We made you peoples and tribes that you may know one another.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 4681",
              translation: "The Prophet (peace be upon him) said: \"A Muslim is a brother of another Muslim. He does not oppress him, nor does he hand him over to an oppressor.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The ummah is not an abstraction — it is made up of real communities in real places. A sister-community relationship transforms "the global ummah" from a concept into a lived connection. When your community knows the faces, names, and stories of a community abroad, solidarity becomes personal and sustained. This is the modern equivalent of the bonds the Prophet (peace be upon him) established between the Muhajirun and Ansar — pairing communities for mutual support and learning.


**How?**

1. Through your partner aid organisation or through personal contacts, identify a Muslim community abroad that could benefit from a sustained relationship — a community in a refugee camp, a post-disaster town, or an underserved rural area.
2. Establish initial communication: a video call between community leaders, a letter exchange, or a visit from someone travelling to the region.
3. Learn about their needs, their strengths, and their daily reality. Do not approach the relationship paternalistically — they have knowledge and resilience to share as well.
4. Define the relationship: regular financial support, educational resource sharing, pen-pal programmes between youth, and joint du'a commitments.
5. Share their stories (with consent) in your community to maintain the connection — show their faces on screens at the masjid, read their letters aloud, and celebrate their successes.
6. Plan a visit if feasible — sending a community delegation to the sister community deepens the bond immeasurably.
7. Completion indicator: a sister-community relationship has been established with a Muslim community abroad, with at least three exchanges of communication and one form of tangible support provided.` },
        { title: 'Advocate publicly for global ummah concerns — write to elected officials and engage media', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:110",
              arabic: "كُنتُمْ خَيْرَ أُمَّةٍ أُخْرِجَتْ لِلنَّاسِ تَأْمُرُونَ بِالْمَعْرُوفِ وَتَنْهَوْنَ عَنِ الْمُنكَرِ",
              translation: "You are the best nation produced for mankind. You enjoin what is right and forbid what is wrong.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 49",
              translation: "The Prophet (peace be upon him) said: \"Whoever among you sees an evil, let him change it with his hand; if he cannot, then with his tongue.\" Public advocacy for ummah concerns is changing evil with the tongue.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Financial support and du'a address symptoms; advocacy addresses root causes. The Prophet (peace be upon him) wrote letters to rulers calling them to justice — advocacy to those in power is a Prophetic practice. Elected officials respond to constituents who contact them, and media coverage shapes public opinion that influences policy. A community that advocates publicly for oppressed Muslims worldwide fulfils the Quranic command to stand firm for justice (4:135) beyond its own borders.


**How?**

1. Identify the specific policy issues connected to your adopted global cause — humanitarian aid funding, sanctions, refugee resettlement, arms sales, or trade agreements.
2. Research your local and national elected officials' positions on these issues. Find out who is sympathetic, who is opposing, and who is uninformed.
3. Organise a letter-writing or email campaign: provide community members with a template they can personalise and send to their representatives.
4. Request meetings with elected officials — even a 15-minute constituent meeting carries significant weight. Send a small delegation (3-5 people) who can articulate the issue clearly and make a specific policy ask.
5. Engage local media: write an op-ed for the local newspaper, pitch a story to a local TV station about your community's solidarity efforts, or document your advocacy on social media.
6. Coordinate with national Muslim advocacy organisations (e.g., CAIR, MPAC, or equivalents in your country) to amplify your efforts and connect with broader campaigns.
7. Completion indicator: at least one letter or email has been sent to an elected official, one meeting has been requested or held, and one media engagement (op-ed, interview, or social media campaign) has been completed.` },
      ],
    },
    {
      title: 'Develop a community replication model — document your community\'s best practices so others can learn from them',
      priority: 'medium', tags: ['replication', 'scaling', 'documentation'],
      description: 'The best community is not one that hoards its success but one that enables others to replicate it. The Prophet (peace be upon him) said, "Convey from me, even if it is one ayah" (Bukhari). Documenting your community\'s successful programmes, governance structures, and lessons learned creates a blueprint that other Muslim communities — especially newer or smaller ones — can adapt and implement.',
      subtasks: [
        { title: 'Identify the 3-5 programmes or practices your community does best and would be most valuable to replicate', done: false,
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
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (peace be upon him) said: \"Whoever treads a path seeking knowledge, Allah will make easy for him the path to Paradise.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Not everything your community does is equally replicable or valuable. Some practices are deeply context-dependent; others are universally applicable. Identifying your strongest, most transferable programmes focuses your documentation effort on what will actually help other communities rather than producing a comprehensive but overwhelming manual that no one reads.


**How?**

1. Gather community leaders, the imam, and active volunteers for a brainstorming session: "What do we do well that other communities ask us about or struggle with?"
2. Consider all areas: education programmes, youth mentorship, financial management, women's programming, interfaith engagement, governance, conflict resolution, and community events.
3. For each candidate, assess: Does it work consistently? Is it transferable (not dependent on one unique person or resource)? Would it fill a common gap in other communities?
4. Narrow to 3-5 programmes or practices that score highest on effectiveness and transferability.
5. Validate by asking external contacts — imams or leaders from other communities — what they would most want to learn from your community.
6. Rank the final list by priority for documentation.
7. Completion indicator: a ranked list of 3-5 replicable programmes or practices, validated by both internal assessment and external interest.` },
        { title: 'Document each programme thoroughly — purpose, structure, resources, timeline, and lessons learned', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2674",
              translation: "The Prophet (peace be upon him) said: \"Whoever starts a good practice in Islam will have its reward and the reward of those who act upon it after him, without their rewards being diminished.\" Thorough documentation enables replication, multiplying reward.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 2:282",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا تَدَايَنتُم بِدَيْنٍ إِلَىٰ أَجَلٍ مُّسَمًّى فَاكْتُبُوهُ",
              translation: "O you who have believed, when you contract a debt for a specified term, write it down.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Undocumented practices die with the people who run them. Documentation transforms personal knowledge into institutional knowledge — and institutional knowledge into transferable knowledge. The Islamic tradition of ilm (knowledge preservation) emphasises precise transmission: just as hadith scholars documented chains of narration, community builders must document the "chains" of their successful programmes so others can implement them faithfully.


**How?**

1. For each programme, create a documentation template covering: purpose and Islamic grounding, target audience, required resources (people, money, space), step-by-step implementation guide, timeline from concept to launch, common pitfalls and how to avoid them, and metrics of success.
2. Interview the people who run each programme — they hold knowledge that is not captured in any existing documents.
3. Include real examples: sample curricula, template forms, budget spreadsheets, communication templates, and volunteer role descriptions.
4. Write in plain, practical language — assume the reader is an imam or volunteer with no prior experience in the programme area.
5. Have someone outside the programme review each document for clarity: if they can understand the process without having done it, the documentation is sufficient.
6. Compile all documentation into a single, organised guide — digital format (PDF or website) for easy sharing.
7. Completion indicator: complete documentation for all identified programmes, reviewed for clarity, compiled into a shareable format.` },
        { title: 'Share the model with 2-3 other Muslim communities and offer to support their implementation', done: false,
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
              ref: "Quran 103:1-3",
              arabic: "وَالْعَصْرِ إِنَّ الْإِنسَانَ لَفِي خُسْرٍ إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ",
              translation: "By time, indeed mankind is in loss, except for those who have believed and done righteous deeds and advised each other to truth and advised each other to patience.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6018",
              translation: "The Prophet (peace be upon him) said: \"The best of people are those most beneficial to people.\"",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Documentation without distribution is a library without readers. Proactively sharing your model with other communities fulfils the obligation to spread beneficial knowledge and creates a network of communities learning from each other. The Prophet (peace be upon him) sent teachers to communities in need — you are sending knowledge. Offering implementation support, not just the document, dramatically increases the likelihood of successful adoption.


**How?**

1. Identify 2-3 Muslim communities that could benefit — newer communities, smaller communities, or ones that have expressed interest in programmes your community runs.
2. Reach out to their leadership: "We have documented some of our community programmes and would love to share them with you. We are also happy to support your implementation."
3. Share the documentation and offer a follow-up call or visit to walk them through it and answer questions.
4. Assign a point person from your community for each adopting community — someone who can answer questions, share experiences, and troubleshoot during their implementation.
5. Create a feedback loop: ask adopting communities to share what they modified and what worked — their adaptations may improve your original model.
6. Host a virtual or in-person "community builders" gathering where multiple communities can share experiences and learn from each other.
7. Completion indicator: documentation has been shared with at least two other Muslim communities, implementation support has been offered and engaged, and at least one community has begun adapting a programme from the model.` },
        { title: 'Create a mentorship programme for community builders — train leaders from other communities', done: false,
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
              ref: "Quran 3:104",
              arabic: "وَلْتَكُن مِّنكُمْ أُمَّةٌ يَدْعُونَ إِلَى الْخَيْرِ",
              translation: "And let there be arising from you a nation inviting to all that is good.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 1893",
              translation: "The Prophet (peace be upon him) said: \"When a man dies, his deeds come to an end except for three things: sadaqah jariyah, beneficial knowledge, or a righteous child who prays for him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Documents provide knowledge; mentorship provides wisdom. Community building is complex, context-dependent work that benefits enormously from the guidance of someone who has done it before. By training leaders from other communities, you multiply your impact exponentially — each leader you mentor can impact hundreds or thousands of people in their own community. This is the model the Prophet (peace be upon him) used: he trained individuals who then transformed entire regions.


**How?**

1. Identify experienced community builders in your community who are willing to mentor leaders from other communities — people who have launched programmes, navigated conflicts, and sustained institutions.
2. Recruit mentees: reach out to emerging leaders in other Muslim communities through national networks, conferences, or direct relationships.
3. Design a simple mentorship structure: monthly one-on-one calls (60-90 minutes), a shared reading list on community development (Islamic and contemporary), and an annual in-person gathering if feasible.
4. Focus mentorship on practical wisdom: how to navigate community politics, how to build volunteer teams, how to handle criticism, how to sustain personal spirituality while serving, and how to lead with justice and mercy.
5. Create a peer cohort among mentees — they will learn as much from each other as from their mentors.
6. Track outcomes: what programmes did mentees launch, grow, or improve as a result of the mentorship?
7. Completion indicator: at least two leaders from other communities are engaged in a structured mentorship relationship with community builders from your community, with regular meetings established.` },
        { title: 'Publish a case study or present at a conference to reach a wider audience of community builders', done: false,
          sources: [
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
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 2685",
              translation: "The Prophet (peace be upon him) said: \"Whoever calls to guidance will have a reward similar to the reward of those who follow him, without that detracting from their rewards in the slightest.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Sharing directly with a few communities is valuable; publishing or presenting reaches hundreds or thousands. The Islamic scholarly tradition has always valued publication and dissemination — scholars wrote books, gave public lectures, and travelled to share knowledge. A case study or conference presentation positions your community as a resource for the broader ummah and attracts other communities to your model who you could never reach through personal networks alone.


**How?**

1. Write a case study documenting your community's journey: the challenges you faced, the programmes you built, the outcomes you achieved, and the lessons you learned. Keep it honest — include failures and pivots, not just successes.
2. Target publications that reach Muslim community builders: ISNA magazine, Muslim community development blogs, regional Islamic council newsletters, or academic journals on Muslim minority community development.
3. Submit a presentation proposal to a relevant conference: ISNA, ICNA, MAS, regional imam councils, or interfaith community-building conferences.
4. If accepted, present your model with humility and practical detail — attendees want actionable takeaways, not just inspiration.
5. Make your documentation freely available online — create a simple website or use an existing platform where other communities can download your materials.
6. Respond to inquiries that come from the publication or presentation — each response is a potential new community partnership.
7. Completion indicator: a case study has been written and submitted to at least one publication or conference, and documentation materials are available online for public access.` },
      ],
    },
    {
      title: 'Build intergenerational knowledge transfer — ensure community wisdom passes to the next generation',
      priority: 'medium', tags: ['intergenerational', 'legacy', 'knowledge-transfer'],
      description: 'Every generation of Muslims has a responsibility to pass on what it learned to the next. Intergenerational knowledge transfer goes beyond Quran — it includes community building wisdom, lived Islamic experience, professional skills, and the stories of struggle and triumph that give a community its identity and resilience.',
      subtasks: [
        { title: 'Record oral histories from elders in your community — their stories of faith, migration, and community building', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 12:111",
              arabic: "لَقَدْ كَانَ فِي قَصَصِهِمْ عِبْرَةٌ لِّأُولِي الْأَلْبَابِ",
              translation: "There was certainly in their stories a lesson for those of understanding.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 46:17",
              arabic: "وَوَصَّيْنَا الْإِنسَانَ بِوَالِدَيْهِ إِحْسَانًا",
              translation: "And We have enjoined upon man, to his parents, good treatment.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
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

Every community elder carries irreplaceable knowledge — stories of how the masjid was built, how the community survived crises, how Islam was practised under difficult circumstances, and how faith was maintained across generations and geographies. When an elder passes away without their stories being recorded, that knowledge is lost forever.

**How?**

1. Identify 5-10 elders in your community whose stories should be preserved: founders of the masjid, first-generation immigrants, converts with decades of experience, and long-serving community volunteers.
2. Approach each elder with respect and genuine interest: "Your experience is a treasure for our community. Would you allow me to record a conversation about your life and faith?"
3. Prepare thoughtful questions: How did you come to Islam (or how did you maintain your faith during migration)? What was the community like when you first arrived? What challenges did you face? What advice would you give young Muslims today?
4. Record the conversations on video if possible (with consent) — facial expressions and tone convey what words alone cannot. Audio recording is the minimum.
5. Transcribe and edit the recordings into a readable format while preserving the elder's voice and style.
6. Store the recordings and transcripts securely with the masjid archives and make copies available to the families.
7. Completion indicator: at least three elder oral histories have been recorded, transcribed, and archived, with copies provided to the individuals and their families.` },
        { title: 'Create a structured mentorship pairing between elders and youth — one-to-one knowledge transfer', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 17:23-24",
              arabic: "وَقَضَىٰ رَبُّكَ أَلَّا تَعْبُدُوا إِلَّا إِيَّاهُ وَبِالْوَالِدَيْنِ إِحْسَانًا",
              translation: "And your Lord has decreed that you not worship except Him, and to parents, good treatment.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 31:13",
              arabic: "وَإِذْ قَالَ لُقْمَانُ لِابْنِهِ وَهُوَ يَعِظُهُ",
              translation: "And when Luqman said to his son while he was instructing him.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 7138",
              translation: "The Prophet (peace be upon him) said: \"Each of you is a shepherd, and each of you is responsible for his flock.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Recorded histories are valuable, but living relationships are irreplaceable. A structured pairing between an elder and a young community member creates a direct transmission line for wisdom, experience, and perspective that no recording can fully capture. This mirrors the Islamic tradition of suhbah (companionship) — the companions learned from the Prophet not just through his lectures but through spending time with him, observing his behaviour, and absorbing his character.


**How?**

1. Identify willing elders and willing youth. The key is genuine willingness — forced pairings produce resentment, not wisdom.
2. Match based on compatibility: shared interests, complementary personalities, or specific knowledge the youth wants and the elder possesses (e.g., Quran memorisation, business experience, community leadership, Arabic language).
3. Set a simple structure: meet at least twice per month for tea, a meal, or a walk. No formal curriculum — the conversation is the curriculum.
4. Suggest conversation starters for the first few meetings to overcome initial awkwardness: "Tell me about your childhood," "What was your biggest challenge as a young Muslim?" "What do you wish you had known at my age?"
5. Encourage the youth to help the elder with practical needs (technology, errands, companionship) — the relationship must be reciprocal, not extractive.
6. Check in with both parties after one month to ensure the pairing is working and address any discomfort.
7. Completion indicator: at least three elder-youth pairs have been formed, have met at least twice, and both parties report value from the relationship.` },
        { title: 'Establish a community archive — preserve documents, photos, and artefacts from the community\'s history', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 12:111",
              arabic: "لَقَدْ كَانَ فِي قَصَصِهِمْ عِبْرَةٌ لِّأُولِي الْأَلْبَابِ",
              translation: "There was certainly in their stories a lesson for those of understanding.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 55:1-4",
              arabic: "الرَّحْمَٰنُ عَلَّمَ الْقُرْآنَ خَلَقَ الْإِنسَانَ عَلَّمَهُ الْبَيَانَ",
              translation: "The Most Merciful — taught the Quran, created man, and taught him eloquence.",
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

Communities without archives have no institutional memory. When the founders pass and the original documents are lost, the community cannot learn from its own history — it is doomed to repeat mistakes and lose the thread of its own narrative. An archive preserves the tangible evidence of your community's journey: founding documents, photographs, newsletters, event programmes, architectural plans, and significant correspondence. It is the community's collective amanah to future generations.


**How?**

1. Designate a physical and digital space for the archive: a locked cabinet or room at the masjid for physical items, and a cloud storage account (Google Drive, Dropbox) for digital files.
2. Issue a community-wide call for materials: old photos, newsletters, event programmes, newspaper clippings, founding documents, architectural plans, and personal letters related to the community's history.
3. Assign a volunteer archivist — someone detail-oriented and committed — to receive, catalogue, and store submitted materials.
4. Create a simple cataloguing system: each item gets a date, description, donor name, and category (photos, documents, media, artefacts).
5. Digitise fragile or irreplaceable items immediately — scan documents and photos at high resolution.
6. Set a policy for ongoing contributions: after every major event, the organisers submit photos, programmes, and a brief summary to the archive.
7. Completion indicator: a community archive (physical and digital) has been established, at least 20 items have been catalogued, and a policy for ongoing contributions is in place.` },
        { title: 'Launch a "living library" programme — community members share their expertise in regular skill-sharing sessions', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 3641",
              translation: "The Prophet (peace be upon him) said: \"The scholars are the heirs of the Prophets. The Prophets did not leave behind dinars or dirhams; rather they left behind knowledge.\" A living library programme ensures this prophetic inheritance flows between generations.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 9:122",
              arabic: "فَلَوْلَا نَفَرَ مِن كُلِّ فِرْقَةٍ مِّنْهُمْ طَائِفَةٌ لِّيَتَفَقَّهُوا فِي الدِّينِ وَلِيُنذِرُوا قَوْمَهُمْ",
              translation: "From every group, a party should go forth to obtain understanding in the religion and warn their people when they return to them.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 667",
              translation: "Duplicate of claim 11; recorded in Sahih al-Bukhari 667.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Every community member carries unique knowledge — professional skills, life experience, cultural heritage, and Islamic learning — that would benefit others if shared. A "living library" programme creates structured opportunities for this sharing, breaking down the silos that form when people only interact within their age group, profession, or social circle. The Prophet (peace be upon him) encouraged teaching whatever you know: "Convey from me, even if it is one ayah" (Bukhari).


**How?**

1. Survey community members: "What skill, knowledge, or experience could you teach to others?" Common offerings include: financial literacy, cooking traditional foods, Quran tajweed, business basics, first aid, parenting strategies, gardening, and technology skills.
2. Create a roster of "living books" — community members willing to share, with a brief description of what they offer.
3. Schedule monthly or bi-monthly skill-sharing sessions at the masjid or community centre, featuring 2-3 "books" per session.
4. Format each session as a 30-minute interactive workshop — not a lecture. Hands-on, practical, and conversational.
5. Rotate facilitators to keep the programme fresh and ensure diverse voices are heard.
6. Promote the sessions as community-building events, not just educational ones — provide refreshments and time for socialising.
7. Completion indicator: at least three skill-sharing sessions have been held, featuring a total of at least six different community "living books," with attendance from multiple age groups.` },
        { title: 'Create a community legacy document — a written statement of values, history, and vision for future generations', done: false,
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
              ref: "Quran 33:72",
              arabic: "إِنَّا عَرَضْنَا الْأَمَانَةَ عَلَى السَّمَاوَاتِ وَالْأَرْضِ وَالْجِبَالِ فَأَبَيْنَ أَن يَحْمِلْنَهَا",
              translation: "Indeed, We offered the Trust to the heavens and the earth and the mountains, and they declined to bear it.",
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

A legacy document is the community's letter to its own future. It captures not just what the community did but why — the values that guided decisions, the vision that animated effort, and the lessons that should not be forgotten. Without such a document, future community members inherit buildings and programmes without understanding the principles that built them, leading to drift, dilution, or abandonment of the founding vision.


**How?**

1. Convene a legacy document committee including elders, mid-generation leaders, and youth — all three perspectives must be represented.
2. Structure the document in three sections: Our History (how the community was founded and the key milestones), Our Values (the Islamic principles and community-specific commitments that guide us), and Our Vision (what we hope this community becomes in 10, 25, and 50 years).
3. Draw on the oral histories, archive materials, and community standards framework you have already developed — this document synthesises them.
4. Include specific stories and examples — not just abstract principles. "We value hospitality" is forgettable; "When the first refugees arrived in 2016, sister Fatima opened her home for three months" is unforgettable.
5. Circulate the draft for community feedback — this must be a document the community owns, not one committee's perspective.
6. Ratify the final version at a community gathering and display it prominently at the masjid.
7. Completion indicator: a community legacy document has been drafted with multi-generational input, reviewed by the community, ratified at a public gathering, and displayed or distributed permanently.` },
      ],
    },
  ],

};
