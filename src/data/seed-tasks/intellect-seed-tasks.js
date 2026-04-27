// Seed tasks for Intellect pillar submodules (Hifz al-Aql).
// Each submodule has tasks across CORE, GROWTH, and EXCELLENCE boards.
// Tasks are placed in the "To Do" column by default.

export const INTELLECT_SEED_TASKS = {
  // ── LEARNING & LITERACY ──
  intellect_learning_core: [
    {
      title: 'Attain functional literacy in Arabic script — learn to read the Quran with tajweed',
      priority: 'urgent', tags: ['arabic', 'quran'],
      description: 'The Quran was revealed in Arabic, and reading it properly is a foundational duty. This task covers learning the Arabic alphabet, connecting letters, and applying basic tajweed rules so you can recite directly from the mushaf with correctness.',
      subtasks: [
        { title: 'Learn the 28 Arabic letters and their forms (isolated, initial, medial, final)', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 96:1-5",
              arabic: "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ ۝ خَلَقَ الْإِنسَانَ مِنْ عَلَقٍ ۝ اقْرَأْ وَرَبُّكَ الْأَكْرَمُ ۝ الَّذِي عَلَّمَ بِالْقَلَمِ ۝ عَلَّمَ الْإِنسَانَ مَا لَمْ يَعْلَمْ",
              translation: "Read! In the name of your Lord who created: He created man from a clinging form. Read! Your Lord is the Most Bountiful One who taught by [means of] the pen, who taught man what he did not know.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: 'The command to recite and the pen\'s exaltation in Quran 96:1-5 establish learning letters as the mandatory foundation for achieving sacred literacy and knowledge. [1], [2],.',
            },
            {
              kind: "quran",
              ref: "Quran 20:114",
              arabic: "وَقُل رَّبِّ زِدْنِي عِلْمًا",
              translation: "Say, \"Lord, increase me in knowledge!\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: 'The command to seek increased knowledge in Quran 20:114 grounds learning letters as the essential first step toward achieving sacred literacy and understanding revelation..',
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5027",
              translation: "The Prophet (peace be upon him) said: \"The best among you are those who learn the Quran and teach it.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: 'The prophetic principle exalting those who learn the Quran establishes mastering Arabic letters as the mandatory foundation for achieving that divinely prioritized excellence.',
            },
          ],
          description: `**Why?**

Arabic is a cursive script — every letter changes shape depending on its position in a word. Without mastering all four forms of each letter, you will misread words, confuse similar letters, and struggle to progress beyond the most basic texts. This is the absolute foundation upon which all Quranic literacy is built.


**How?**

1. **Start with the letter chart.** Obtain a Nooraniyyah Qaida or equivalent primer that shows each letter in its four forms: isolated, initial (beginning of word), medial (middle), and final (end of word).

2. **Group letters by shape families.** Arabic letters cluster into shape groups that share a base form (e.g., ba/ta/tha share the same body with different dots). Learn one family at a time rather than going alphabetically:
   - Ba/Ta/Tha group
   - Jim/Ha/Kha group
   - Dal/Dhal group
   - Ra/Za group
   - Sin/Shin group
   - And so on through all 28

3. **Practise writing each form by hand.** Physical writing embeds muscle memory. Use lined Arabic calligraphy paper or a notebook. Write each letter in all four forms at least 10 times per sitting.

4. **Use flashcard drills.** Create flashcards (physical or via Anki) showing a letter form on one side and its name and position on the other. Drill daily until recognition is instant.

5. **Test yourself with real words.** Once you know a family, find simple Quranic words that use those letters and practise identifying each letter's form in context.

6. **Benchmark:** You have completed this step when you can look at any Arabic word and correctly identify every letter and its position-form without hesitation.` },
        { title: 'Study the basic tajweed rules: noon sakinah, meem sakinah, and madd', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 73:4",
              arabic: "وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا",
              translation: "And recite the Quran with measured recitation.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: 'The command to recite the Quran with measured recitation establishes studying tajweed rules as the mandatory framework for achieving slow, distinct, and proper Prophetic pronunciation. [1], [2],.',
            },
          ],
          description: `**Why?**

Tajweed is not optional ornamentation — it is the science of reciting the Quran as it was revealed. The Prophet (peace be upon him) received the Quran with specific pronunciation rules, and scholars consider it obligatory to apply at least the basic rules when reciting. Noon sakinah, meem sakinah, and madd rules affect nearly every ayah you will read, so they form the essential starting set.


**How?**

1. **Noon Sakinah and Tanween rules (4 categories):**
   - **Idh-har** (clear pronunciation) — when noon sakinah/tanween is followed by a throat letter (hamza, ha, 'ayn, ghayn, ha, kha)
   - **Idghaam** (merging) — when followed by ya, ra, meem, lam, waw, noon
   - **Iqlaab** (conversion) — when followed by ba (noon becomes meem)
   - **Ikhfa** (hiding) — when followed by the remaining 15 letters

2. **Meem Sakinah rules (3 categories):**
   - **Ikhfa Shafawi** — meem sakinah followed by ba
   - **Idghaam Shafawi** — meem sakinah followed by meem
   - **Idh-har Shafawi** — meem sakinah followed by any other letter

3. **Madd (elongation) rules — start with the three primary types:**
   - **Madd Tabee'ee** (natural madd) — 2 counts, the default elongation
   - **Madd Muttasil** (connected) — 4-5 counts, hamza in the same word
   - **Madd Munfasil** (separated) — 4-5 counts, hamza at the start of the next word

4. **Study method:**
   - Use a tajweed textbook such as *Tajweed Rules of the Quran* by Kareema Czerepinski
   - Watch video explanations from qualified reciters (Wisam Sharieff, Yasir Qadhi's tajweed series)
   - After learning each rule, find 5-10 examples in Juz Amma and mark them with a colour code
   - Recite those examples aloud, applying the rule, and have a teacher or app verify` },
        { title: 'Practice reading from Juz Amma with a teacher or qualified app', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5027",
              translation: "The Prophet (peace be upon him) said: \"The best among you are those who learn the Quran and teach it.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: 'The prophetic principle identifying learners of the Quran as the best of people establishes guided reading from Juz Amma as the essential step toward excellence. [1],.',
            },
          ],
          description: `**Why?**

Juz Amma (the 30th part of the Quran) contains shorter surahs that are recited in daily salah. Practising with a teacher or qualified app ensures you receive real-time correction — without feedback, mistakes become habits that are far harder to unlearn later. This is where theory transforms into actual recitation ability.


**How?**

1. **Find a qualified teacher or app:**
   - **In-person:** Local masjid Quran classes, halaqah circles, or a private tutor
   - **Online:** Platforms like Quran Academy, Bayyinah TV, or Tarteel AI
   - **Apps with voice recognition:** Tarteel AI provides real-time tajweed feedback; Quran Companion offers structured lesson plans

2. **Set a structured schedule:**
   - Start with Surah An-Nas (114) and work backwards — these are the shortest and most familiar
   - Aim for one new surah every 2-3 days, depending on length
   - Practise each surah until you can recite it smoothly without stumbling

3. **Use the "3-pass" method for each surah:**
   - **Pass 1:** Listen to a skilled reciter (Husary or Minshawi are recommended for learners) while following in the mushaf
   - **Pass 2:** Recite along with the recording, pausing after each ayah to repeat
   - **Pass 3:** Recite independently, then compare against the recording

4. **Track your progress:** Keep a simple log — date, surah, number of attempts, and any recurring mistakes. This reveals patterns (e.g., consistently struggling with ghunnah) that you can address with targeted drills.

5. **Completion benchmark:** You can read any surah from Juz Amma directly from the mushaf with recognisable tajweed at a steady pace.` },
        { title: 'Recite one page daily from the mushaf without transliteration', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 29:45",
              arabic: "اتْلُ مَا أُوحِيَ إِلَيْكَ مِنَ الْكِتَابِ",
              translation: "Recite what has been revealed to you of the Book.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: 'The command to recite the revealed Book in Quran 29:45 grounds daily recitation from the mushaf as the mandatory foundation for internalizing divine guidance..',
            },
          ],
          description: `**Why?**

Transliteration (writing Arabic sounds in English letters) is a crutch that prevents true reading ability from developing. It strips away the visual connection to the Arabic script and makes it impossible to progress to reading unfamiliar texts. Reciting directly from the mushaf — even slowly — builds the neural pathways that make Arabic reading automatic over time.


**How?**

1. **Choose a mushaf with clear, large script.** The Madinah Mushaf (15-line) is the global standard. For beginners, colour-coded tajweed mushafs (like the Tajweed Quran by Dar al-Ma'rifah) highlight rules visually.

2. **Start with pages you have already practised.** Do not jump to unfamiliar pages — begin with Juz Amma pages you learned in the previous subtask, then gradually move to new material.

3. **Set a fixed daily time.** Anchor it to an existing habit:
   - After Fajr salah (traditional and spiritually optimal)
   - Before bed (quieter environment)
   - During a lunch break (consistency over perfection)

4. **Read slowly and point with your finger.** Speed is irrelevant at this stage — accuracy and directness with the Arabic text is the goal. Use your finger or a pointer to track each word.

5. **When you get stuck on a word:**
   - Sound out each letter individually
   - Apply the tajweed rules you know
   - If still stuck, look up the word in a Quran word-by-word app (Quran.com word-by-word feature) — but do NOT default to transliteration

6. **Build the streak.** Use a habit tracker (physical calendar with X marks, or an app like Streaks). Your target is 30 consecutive days. After that, the habit typically self-sustains.` },
        { title: 'Record yourself reciting and compare against a sheikh\'s recitation', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 47:24",
              arabic: "أَفَلَا يَتَدَبَّرُونَ الْقُرْآنَ أَمْ عَلَىٰ قُلُوبٍ أَقْفَالُهَا",
              translation: "Will they not contemplate the Quran? Do they have locks on their hearts?\"",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              rationale: "the command to contemplate the Quran implies a sustained, attentive engagement with its recitation — comparing oneself to a master reciter is one practical form of this tadabbur.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2419",
              translation: "Abu Harb b. Abu al-Aswad reported on the authority of his father that Abu Musa al-Ash'ari sent for the reciters of Basra. They came to him and they were three hundred in number. They recited the Qur'an and he said:You are the best among the inhabitants of Basra, for you are the reciters among them. So continue to recite it. (But bear in mind) that your reciting for a long time may not harden your hearts as were hardened the hearts of those before you. We used to recite a surah which resembled in length and severity to (Surah) Bara'at. I have, however, forgotten it with the exception of this which I remember out of it:\" If there were two valleys full of riches, for the son of Adam, he would long for a third valley, and nothing would fill the stomach of the son of Adam but dust.\" And we used so recite a surah which resembled one of the surahs of Musabbihat, and I have forgotten it, but remember (this much) out of it:\" Oh people who believe, why do you say that which you do not practise\" (lxi 2.) and\" that is recorded in your necks as a witness (against you) and you would be asked about it on the Day of Resurrection\" (xvii)",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: 'The prophetic principle that reciters are the best of people establishes comparing one’s recitation against qualified masters as the essential method for achieving that excellence..',
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 4757",
              translation: "Narrated Aisha:When there was said about me what was said which I myself was unaware of, Allah's Messenger (ﷺ) got up and addressed the people. He recited Tashah-hud, and after glorifying and praising Allah as He deserved, he said, \"To proceed: O people Give me your opinion regarding those people who made a forged story against my wife. By Allah, I do not know anything bad about her. By Allah, they accused her of being with a man about whom I have never known anything bad, and he never entered my house unless I was present there, and whenever I went on a journey, he went with me.\" Sa`d bin Mu`adh got up and said, \"O Allah's Messenger (ﷺ) Allow me to chop their heads off\". Then a man from the Al-Khazraj (Sa`d bin 'Ubada) to whom the mother of (the poet) Hassan bin Thabit was a relative, got up and said (to Sa`d bin Mu`adh), \"You have told a lie! By Allah, if those persons were from the Aus Tribe, you would not like to chop their heads off.\" It was probable that some evil would take place between the Aus and the Khazraj in the mosque, and I was unaware of all that. In the evening of that day, I went out for some of my needs (i.e. to relieve myself), and Um Mistah was accompanying me. On our return, Um Mistah stumbled and said, \"Let Mistah. be ruined\" I said to her, \"O mother Why do you abuse your Son\" On that Um Mistah became silent for a while, and stumbling again, she said, \"Let Mistah be ruined\" I said to her, \"Why do you abuse your son?\" She stumbled for the third time and said, \"Let Mistah be ruined\" whereupon I rebuked her for that. She said, \"By Allah, I do not abuse him except because of you.\" I asked her, \"Concerning what of my affairs?\" So she disclosed the whole story to me. I said, \"Has this really happened?\" She replied, \"Yes, by Allah.\" I returned to my house, astonished (and distressed) that I did not know for what purpose I had gone out. Then I became sick (fever) and said to Allah's Messenger (ﷺ) \"Send me to my father's house.\" So he sent a slave with me, and when I entered the house, I found Um Rum-an (my mother) downstairs while (my father) Abu Bakr was reciting something upstairs. My mother asked, \"What has brought you, O (my) daughter?\" I informed her and mentioned to her the whole story, but she did not feel it as I did. She said, \"O my daughter! Take it easy, for there is never a charming lady loved by her husband who has other wives but that they feel jealous of her and speak badly of her.\" But she did not feel the news as I did. I asked (her), \"Does my father know about it?\" She said, \"yes\" I asked, Does Allah's Messenger (ﷺ) know about it too?\" She said, \"Yes, Allah's Messenger (ﷺ) does too.\" So the tears filled my eyes and I wept. Abu Bakr, who was reading upstairs heard my voice and came down and asked my mother, \"What is the matter with her? \" She said, \"She has heard what has been said about her (as regards the story of Al-Ifk).\" On that Abu- Bakr wept and said, \"I beseech you by Allah, O my daughter, to go back to your home\". I went back to my home and Allah's Messenger (ﷺ) had come to my house and asked my maid-servant about me (my character). The maid-servant said, \"By Allah, I do not know of any defect in her character except that she sleeps and let the sheep enter (her house) and eat her dough.\" On that, some of the Prophet's companions spoke harshly to her and said, \"Tell the truth to Allah's Messenger (ﷺ).\" Finally they told her of the affair (of the slander). She said, \"Subhan Allah! By Allah, I know nothing against her except what goldsmith knows about a piece of pure gold.\" Then this news reached the man who was accused, and he said, \"Subhan Allah! By Allah, I have never uncovered the private parts of any woman.\" Later that man was martyred in Allah's Cause. Next morning my parents came to pay me a visit and they stayed with me till Allah's Messenger (ﷺ) came to me after he had offered the `Asr prayer. He came to me while my parents were sitting around me on my right and my left. He praised and glorified Allah and said, \"Now then O `Aisha! If you have committed a bad deed or you have wronged (yourself), then repent to Allah as Allah accepts the repentance from his slaves.\" An Ansari woman had come and was sitting near the gate. I said (to the Prophet), \"Isn't it improper that you speak in such a way in the presence of this lady? Allah's Apostle then gave a piece of advice and I turned to my father and requested him to answer him (on my behalf). My father said, \"What should I say?\" Then I turned to my mother and asked her to answer him. She said, \"What should I say?\" When my parents did not give a reply to the Prophet, I said, \"I testify that none has the right to be worshipped except Allah, and that Muhammad is His Apostle!\" And after praising and glorifying Allah as He deserves, I said, \"Now then, by Allah, if I were to tell you that I have not done (this evil action) and Allah is a witness that I am telling the truth, that would not be of any use to me on your part because you (people) have spoken about it and your hearts have absorbed it; and if I were to tell you that I have done this sin and Allah knows that I have not done it, then you will say, 'She has confessed herself guilty.\" By Allah, 'I do not see a suitable example for me and you but the example of (I tried to remember Jacob's name but couldn't) Joseph's father when he said; So (for me) \"Patience is most fitting against that which you assert. It is Allah (alone) whose help can be sought.' At that very hour the Divine Inspiration came to Allah's Messenger (ﷺ) and we remained silent. Then the Inspiration was over and I noticed the signs of happiness on his face while he was removing (the sweat) from his forehead and saying, \"Have the good tidings O ' \"Aisha! Allah has revealed your innocence.\" At that time I was extremely angry. My parents said to me, \"Get up and go to him.\" I said, \"By Allah, I will not do it and will not thank him nor thank either of you, but I will thank Allah Who has revealed my innocence. You have heard this story but neither did not deny it nor change it (to defend me).\" (Aisha used to say:) \"But as regards Zainab bint Jahsh, (the Prophet's wife), Allah protected her because of her piety, so she did not say anything except good (about me), but her sister, Hamna, was ruined among those who were ruined. Those who used to speak evil about me were Mistah, Hassan bin Thabit, and the hypocrite, `Abdullah bin Ubai, who used to spread that news and tempt others to speak of it, and it was he and Hamna who had the greater share therein. Abu Bakr took an oath that he would never do any favor to Mistah at all. Then Allah revealed the Divine Verse: \"Let not those among you who are good and wealthy (i.e. Abu Bakr) swear not to give (any sort of help) to their kinsmen, and those in need, (i.e. Mistah) ...Do you not love that Allah should forgive you? And Allah is Oft-Forgiving, Most Merciful.\" (24.22) On that, Abu Bakr said, \"Yes, by Allah, O our Lord! We wish that You should forgive us.\" So Abu Bakr again started giving to Mistah the expenditure which he used to give him before",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: 'The prophetic principle of seeking expert verification to ascertain the truth grounds recording and comparing one’s recitation against qualified masters as the method for validation..',
            },
          ],
          description: `**Why?**

Self-assessment is notoriously unreliable in recitation — you often cannot hear your own mistakes while making them. Recording creates an objective artefact you can compare against a master reciter, revealing gaps in pronunciation, rhythm, and tajweed application that would otherwise go unnoticed. This is how serious students of Quran have always refined their tilawah.


**How?**

1. **Choose a benchmark reciter.** Select a sheikh known for clear, didactic recitation:
   - **Mahmoud Khalil al-Husary** — the gold standard for precise, slow-paced tajweed
   - **Muhammad Siddiq al-Minshawi** (mu'allim version) — includes pauses for repetition
   - **Ibrahim al-Akhdar** — another excellent choice for learners

2. **Pick a passage you have been practising.** Start with 3-5 ayahs, not a full page.

3. **Record your recitation:**
   - Use your phone's voice recorder or an app like Tarteel
   - Recite in a quiet space at your natural pace
   - Do not re-record — capture your authentic current level

4. **Compare systematically:**
   - Play one ayah of the sheikh's recording, then the same ayah of yours
   - Listen for: letter pronunciation (makharij), elongation lengths (madd), merging/hiding rules, and overall rhythm
   - Note specific differences in a simple table:

   | Ayah | Issue Found | Correct Pronunciation | Notes |
   |------|-------------|----------------------|-------|
   | e.g. 114:1 | "Qul" sounded like "Kul" | Qaf from deep throat | Practise qaf isolation |

5. **Address the top 2-3 recurring issues** before recording again. Repeat this cycle weekly.

6. **Advanced option:** Submit your recording to a tajweed teacher (many online platforms accept audio submissions for feedback) for professional evaluation.` },
      ],
    },
    {
      title: 'Identify the core knowledge your profession or calling requires and map your gaps',
      priority: 'high', tags: ['learning', 'planning'],
      description: 'Islam demands itqan (excellence) in one\'s work, which begins with knowing what you need to know. Conduct an honest audit of the knowledge and competencies your field requires, then identify where you fall short so you can build a targeted learning plan.',
      subtasks: [
        { title: 'List the top 10 knowledge areas and skills your profession demands', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (peace be upon him) said: \"Whoever takes a path in search of knowledge, Allah will make easy for him the path to Paradise.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: 'The prophetic principle promising Paradise for seeking knowledge establishes identifying professional skills as a meritorious first step in that divinely rewarded spiritual journey.',
            },
          ],
          description: `**Why?**

You cannot close gaps you have not identified. Without a concrete inventory of required knowledge areas, your learning will be scattershot — driven by whichever book or course catches your attention rather than by what actually moves the needle.

**How?**

1. **Research your field's competency framework.** Many professions have published frameworks:
   - Software engineering: roadmap.sh, SWEBOK
   - Medicine: specialty-specific milestones
   - Business: MBA core curriculum areas
   - Trades: apprenticeship standards
   - Islamic scholarship: traditional curricula (e.g., the Mauritanian matn system)

2. **Consult 3-5 people who are excellent in your field.** Ask them: "What are the 10 things someone must know well to be truly competent at this work?" Their answers will reveal areas that formal frameworks miss.

3. **Compile your master list.** Merge the framework research and expert input into a single list of 10 knowledge areas. Be specific — not "communication" but "technical writing for engineering audiences" or "client presentation and objection handling."

4. **Format it clearly:**

   | # | Knowledge Area | Why It Matters |
   |---|---------------|----------------|
   | 1 | [Specific area] | [How it impacts your work] |
   | 2 | ... | ... |

5. **Save this list.** It becomes the foundation for the next three subtasks and for your 90-day learning plan.` },
        { title: 'Rate yourself honestly (1-5) on each area', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 20:114",
              arabic: "فَتَعَالَى اللَّهُ الْمَلِكُ الْحَقُّ ۗ وَلَا تَعْجَلْ بِالْقُرْآنِ مِن قَبْلِ أَن يُقْضَىٰ إِلَيْكَ وَحْيُهُ ۖ وَقُل رَّبِّ زِدْنِي عِلْمًا",
              translation: "And say, \"My Lord, increase me in knowledge.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: 'The command to seek increased knowledge in Quran 20:114 grounds honest self-rating as the mandatory foundation for identifying deficiencies to facilitate that divine increase. [1], [2],.',
            },
            {
              kind: "quran",
              ref: "Quran 39:9",
              arabic: "قُلْ هَلْ يَسْتَوِي الَّذِينَ يَعْلَمُونَ وَالَّذِينَ لَا يَعْلَمُونَ",
              translation: "Say, \"Are those who know equal to those who do not know?\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: 'The principle that the knowledgeable and ignorant are not equal in Quran 39:9 establishes honest self-rating as the prerequisite for attaining that prioritized excellence..',
            },
            {
              kind: "hadith",
              ref: "Sunan Ibn Majah 224",
              translation: "The Messenger of Allah (peace be upon him) said: \"Seeking knowledge is an obligation upon every Muslim.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: 'The prophetic principle that seeking knowledge is mandatory establishes honest self-rating as the essential prerequisite for identifying deficiencies to fulfill that divinely prioritized obligation.',
            },
          ],
          description: `**Why?**

Self-honesty (sidq) is a core Islamic virtue. Rating yourself honestly on each competency area prevents two destructive tendencies: overconfidence (which breeds complacency) and excessive self-criticism (which breeds paralysis). A calibrated self-assessment gives you a clear, actionable picture of where you stand — the prerequisite for any meaningful improvement plan.


**How?**

1. **Use a consistent rating scale:**

   | Rating | Meaning | Practical Test |
   |--------|---------|----------------|
   | 1 | No knowledge | Cannot explain or perform basics |
   | 2 | Beginner | Understand concepts but cannot apply independently |
   | 3 | Competent | Can perform standard tasks without guidance |
   | 4 | Proficient | Can handle complex situations and mentor others |
   | 5 | Expert | Recognised authority, can innovate in this area |

2. **For each of your 10 areas, ask yourself three calibration questions:**
   - "Could I teach this to a junior colleague right now?" (If no, you are likely 1-2)
   - "Do I handle non-routine problems in this area confidently?" (If no, you are likely 2-3)
   - "Do peers seek my input on this topic?" (If no, you are likely below 4)

3. **Get a second opinion.** Ask a trusted colleague or mentor to rate you on the same scale. Compare their ratings to yours — the gaps between self-perception and external perception are often the most revealing.

4. **Record your ratings next to each area:**

   | # | Knowledge Area | Self-Rating | Peer Rating | Gap |
   |---|---------------|-------------|-------------|-----|
   | 1 | [Area] | 3 | 2 | -1 |

5. **Do not inflate your scores to feel better.** The only person harmed by dishonest self-assessment is you.` },
        { title: 'Identify the 3 largest gaps with the highest impact on your effectiveness', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 39:9",
              arabic: "قُلْ هَلْ يَسْتَوِي الَّذِينَ يَعْلَمُونَ وَالَّذِينَ لَا يَعْلَمُونَ",
              translation: "Say, \"Are those who know equal to those who do not know?",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: 'The principle that the knowledgeable and ignorant are unequal in Quran 39:9 establishes identifying high-impact gaps as the mandatory prerequisite for achieving superior effectiveness. [1]',
            },
          ],
          description: `**Why?**

Not all gaps are equally important. A rating of 2 in a peripheral skill matters less than a rating of 2 in a core competency that you use daily. Islam teaches prioritisation — the Prophet (peace be upon him) consistently addressed the most important matters first (al-awla fa al-awla). Identifying high-impact gaps ensures your limited learning time generates maximum benefit.


**How?**

1. **Create an impact-gap matrix.** For each of your 10 areas, plot two dimensions:
   - **Gap size** (5 minus your rating) — how far you are from mastery
   - **Impact on effectiveness** — how much this area affects your daily work output, career trajectory, or ability to serve others

2. **Use a simple scoring method:**

   | # | Knowledge Area | Rating | Gap (5 - Rating) | Impact (1-5) | Priority Score (Gap x Impact) |
   |---|---------------|--------|-------------------|--------------|------------------------------|
   | 1 | [Area] | 2 | 3 | 5 | 15 |
   | 2 | [Area] | 4 | 1 | 3 | 3 |

3. **Sort by Priority Score descending.** The top 3 entries are your highest-impact gaps.

4. **Validate with a reality check:** For each of the top 3, ask:
   - "If I became proficient in this area within 90 days, would my work quality or output noticeably improve?"
   - "Is this gap actively causing problems right now (missed opportunities, errors, bottlenecks)?"

5. **Write a one-sentence problem statement for each gap.** Example: "My weak data analysis skills (rated 2/5) mean I rely on others to interpret project metrics, slowing my decision-making by days."

6. **These three gaps become the focus of your 90-day learning plan.** Everything else is secondary until these are addressed.` },
        { title: 'Research courses, books, or mentors that address each gap', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 71",
              translation: "The Prophet (peace be upon him) said: \"When Allah wishes good for someone, He bestows upon him understanding of the religion.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: 'The prophetic principle that religious understanding signifies divine favor grounds researching educational resources as the essential pursuit for attaining that prioritized spiritual goodness. [1], [2]',
            },
          ],
          description: `**Why?**

Identifying a gap without identifying a remedy leaves you stuck in awareness without action. Islam emphasises tying your camel — taking practical means alongside trust in Allah. Researching specific learning resources transforms abstract deficiencies into concrete next steps. The quality of your learning resources will directly determine how quickly and deeply you close each gap.


**How?**

1. **For each of your 3 priority gaps, research across four resource categories:**

   | Category | Where to Look | What to Evaluate |
   |----------|--------------|-----------------|
   | **Books** | Goodreads lists, Amazon bestsellers in the topic, expert recommendations | Depth, currency, reviews from practitioners (not just academics) |
   | **Courses** | Coursera, Udemy, edX, LinkedIn Learning, specialist platforms | Instructor credentials, hands-on projects, completion rates |
   | **Mentors** | Professional network, industry communities, LinkedIn, local associations | Relevant experience, availability, teaching ability |
   | **Communities** | Reddit, Discord servers, professional associations, local meetups | Active membership, quality of discussions, accessibility |

2. **Apply a quick evaluation filter to each resource:**
   - Is the author/instructor a recognised practitioner (not just a content creator)?
   - Is the material current (published within the last 3-5 years for fast-moving fields)?
   - Does it include practical exercises or projects, not just theory?
   - Is it compatible with Islamic values (no riba-based finance courses, etc.)?

3. **Select 1-2 primary resources per gap.** More than two creates decision paralysis and splits your attention.

4. **Compile your research into a simple table:**

   | Gap | Primary Resource | Type | Cost | Time Commitment |
   |-----|-----------------|------|------|-----------------|
   | [Gap 1] | [Resource] | Book/Course/Mentor | [Cost] | [Hours/week] |

5. **Reach out to potential mentors early.** A brief, respectful message explaining what you are working on and what specific guidance you are seeking has a surprisingly high success rate.` },
        { title: 'Create a 90-day learning plan with specific milestones', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 20:114",
              arabic: "وَقُل رَّبِّ زِدْنِي عِلْمًا",
              translation: "And say, \"My Lord, increase me in knowledge.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: 'The command to seek an increase in knowledge establishes specific milestones as the mandatory framework for organizing and verifying that divinely prioritized growth. [1]',
            },
          ],
          description: `**Why?**

A plan without milestones is just a wish. The 90-day horizon is long enough to achieve meaningful progress on a skill gap but short enough to maintain urgency and motivation. Specific milestones create accountability checkpoints — you will know by day 30, 60, and 90 whether you are on track or need to adjust.

**How?**

1. **Structure the 90 days into three 30-day phases:**

   **Phase 1 (Days 1-30): Foundation**
   - Focus: Build baseline knowledge in all 3 gap areas
   - Activities: Complete introductory readings, start the first course module, establish study routine
   - Milestone: Can explain the fundamentals of each gap area to a colleague

   **Phase 2 (Days 31-60): Application**
   - Focus: Apply learning to real work situations
   - Activities: Complete intermediate course content, work on practice projects, seek mentor feedback
   - Milestone: Have completed at least one practical project or real-world application per gap area

   **Phase 3 (Days 61-90): Integration**
   - Focus: Solidify skills through teaching and complex application
   - Activities: Tackle advanced material, explain concepts to others, take on stretch assignments
   - Milestone: Re-rate yourself on the 1-5 scale — target at least +1 improvement per gap area

2. **Set weekly sub-milestones.** Break each phase into weekly targets:

   | Week | Gap 1 Target | Gap 2 Target | Gap 3 Target |
   |------|-------------|-------------|-------------|
   | 1 | [Specific target] | [Specific target] | [Specific target] |
   | 2 | ... | ... | ... |

3. **Block study time in your calendar.** Treat it as a non-negotiable appointment — minimum 5 hours per week spread across at least 3 sessions.

4. **Build in review checkpoints** at day 30 and day 60. At each checkpoint, ask:
   - Am I on track with my milestones?
   - Do I need to adjust the pace or switch resources?
   - Have I discovered new sub-gaps that need addressing?

5. **Track with a simple system.** A spreadsheet, Notion page, or even a physical notebook with weekly check-ins. The key is visibility — if you cannot see your progress, you cannot manage it.` },
      ],
    },
    {
      title: 'Establish a daily reading habit — minimum 20 pages or 30 minutes',
      priority: 'high', tags: ['reading', 'discipline'],
      description: 'The first word revealed to the Prophet (peace be upon him) was "Iqra" — Read. Consistent reading expands your vocabulary, deepens comprehension, and builds the cognitive endurance needed for serious intellectual work. This task anchors reading as a non-negotiable daily practice.',
      subtasks: [
        { title: 'Choose your first book and set a specific daily reading time', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 96:1",
              arabic: "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ",
              translation: "Read! In the name of your Lord who created.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: 'The divine command to read establishes choosing a book and daily schedule as the mandatory method for securing the knowledge prioritized in the first revelation. [1], [2], [3], [4]',
            },
            {
              kind: "quran",
              ref: "Quran 39:9",
              arabic: "قُلْ هَلْ يَسْتَوِي الَّذِينَ يَعْلَمُونَ وَالَّذِينَ لَا يَعْلَمُونَ ۗ إِنَّمَا يَتَذَكَّرُ أُولُو الْأَلْبَابِ",
              translation: "Say, \"How can those who know be equal to those who do not know?\" Only those who have understanding will take heed.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: 'The principle that the knowledgeable are superior to the ignorant establishes scheduled reading as the mandatory method for attaining that divinely prioritized understanding. [1], [2]',
            },
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 3641",
              translation: "The Prophet (peace be upon him) said: \"Whoever follows a path in the pursuit of knowledge, Allah will make a path to Paradise easy for him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: 'The prophetic principle that pursuing knowledge eases the way to Paradise establishes selecting a book and scheduling reading as the practical initiation of that journey.',
            },
          ],
          description: `**Why?**

Decision fatigue is the enemy of habit formation. If you wake up each day wondering "what should I read?" and "when should I read?", you will default to not reading. Choosing your first book and fixing a daily time eliminates both decisions in advance, making it far more likely that reading actually happens.

**How?**

1. **Choose your first book wisely.** It should be:
   - A topic you are genuinely curious about (motivation matters for building the habit)
   - Non-fiction that advances your intellectual growth (save pure entertainment for later)
   - Moderate difficulty — challenging enough to learn from, accessible enough not to stall
   - Recommended starting categories: Islamic biography (seerah), professional development, history, or science

2. **Set a specific daily time and anchor it to an existing routine:**
   - **After Fajr** — mind is fresh, house is quiet, spiritually primed (strongest option)
   - **During lunch break** — consistent, mid-day mental reset
   - **Before bed** — wind-down routine, but beware drowsiness
   - **During commute** — audiobooks or e-reader on public transport

3. **Start with the minimum.** Commit to 20 pages OR 30 minutes, whichever comes first. On days when motivation is low, the minimum is still achievable. On high-energy days, you will naturally exceed it.

4. **Place the book where you will see it.** Physical cue — on your bedside table, next to your prayer mat, on your desk. Visibility triggers action.

5. **Tell someone.** Announce your reading commitment to a spouse, friend, or study partner. External accountability strengthens follow-through.` },
        { title: 'Designate a distraction-free reading space', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 96:1-5",
              arabic: "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ",
              translation: "Read in the name of your Lord who created. Created man from a clinging substance. Read, and your Lord is the Most Generous, Who taught by the pen, taught man that which he knew not.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: 'The command to read establishes designating a distraction-free space as mirroring the prophetic seclusion of Hira, essential for absorbing divinely taught knowledge. [1-3]',
            },
          ],
          description: `**Why?**

Deep reading and shallow scrolling require opposite mental states. If you read in the same environment where you browse social media or watch videos, your brain will default to distraction mode. A designated reading space signals to your mind that it is time for focus, not entertainment. The scholars of Islam historically had dedicated spaces for study — the concept of a maktabah (study room) is deeply rooted in Islamic intellectual tradition.


**How?**

1. **Identify a suitable space in your home or workplace.** It does not need to be a separate room — a specific chair, corner, or desk will do. The key qualities:
   - Comfortable but not sleep-inducing (avoid beds and deep sofas)
   - Well-lit (natural light is ideal; a good reading lamp otherwise)
   - Away from screens (TV, computer) unless you read digitally and use focus modes
   - Quiet, or manageable with headphones/earplugs

2. **Set up the space for reading:**
   - Keep your current book there permanently
   - Have a notebook and pen for notes
   - Remove or silence your phone (place it in another room if needed)
   - A cup of tea or coffee can become part of the ritual

3. **Establish a boundary.** Communicate to household members that when you are in this space, you are reading and prefer not to be interrupted. Even 20-30 uninterrupted minutes is transformative.

4. **If you lack a dedicated space**, create a portable reading kit: a tote bag with your book, notebook, pen, and earplugs. A park bench, library corner, or masjid courtyard can serve as your reading space.

5. **Associate the space only with reading.** Do not use it for casual phone browsing or work tasks. This trains your brain to enter "reading mode" when you sit down there.` },
        { title: 'Track your daily reading streak for 30 consecutive days', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 96:1-5",
              arabic: "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ ۚ خَلَقَ الْإِنسَانَ مِنْ عَلَقٍ ۚ اقْرَأْ وَرَبُّكَ الْأَكْرَمُ ۚ الَّذِي عَلَّمَ بِالْقَلَمِ ۚ عَلَّمَ الْإِنسَانَ مَا لَمْ يَعْلَمْ",
              translation: "Read in the name of your Lord who created — created man from a clinging substance. Read, and your Lord is the Most Generous — who taught by the pen — taught man that which he knew not.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: 'The command to read establishes tracking a daily streak as the essential discipline for securing the consistent pursuit of divinely prioritized knowledge. [1, 2]',
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 71",
              translation: "The Prophet (peace be upon him) said: \"Whoever Allah wants good for, He gives him understanding of the religion.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: 'The prophetic principle that religious understanding signifies divine favor grounds tracking reading streaks as the essential discipline for securing that prioritized spiritual goodness. [1]',
            },
          ],
          description: `**Why?**

Research on habit formation consistently shows that tracking creates commitment. A visual streak — seeing 15 unbroken days on a calendar — generates a psychological reluctance to break the chain. The 30-day target is deliberate: it is long enough for the behaviour to begin feeling automatic but short enough to maintain focused effort. After 30 days, reading shifts from "something I am trying to do" to "something I do."


**How?**

1. **Choose a tracking method:**
   - **Physical calendar** (recommended): Hang it where you see it daily. Mark an X on every day you read. The "don't break the chain" visual effect is powerful.
   - **Habit tracking app**: Streaks (iOS), Loop Habit Tracker (Android), or Habitica (gamified)
   - **Bullet journal**: A simple monthly habit grid

2. **Define what counts as a completed day:**
   - Minimum 20 pages OR 30 minutes of focused reading
   - Audiobooks count if you are actively listening (not background noise)
   - Quran reading counts as a separate, additional practice — this streak is for non-Quran intellectual reading

3. **Plan for difficult days in advance:**
   - Travel days: Pack a book or have a Kindle/e-reader loaded
   - Low-energy days: Read something lighter but still count it
   - Social events: Read in the morning before the day gets away from you

4. **If you break the streak:**
   - Do not abandon the project — restart and aim for 30 again
   - Identify what caused the break and build a prevention strategy
   - Never "double up" the next day to compensate — one day's reading is one day's reading

5. **Celebrate the milestone.** When you hit 30 consecutive days, acknowledge it. Then set your next target: 60 days, or the completion of 3 books, or another meaningful marker.` },
        { title: 'Write a brief reflection or note after each reading session', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 29:69",
              arabic: "وَالَّذِينَ جَاهَدُوا فِينَا لَنَهْدِيَنَّهُمْ سُبُلَنَا",
              translation: "And those who strive for Us — We will surely guide them to Our ways.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: 'The divine promise that striving secures guidance establishes writing reflections as the essential exertion for identifying the various ways to attain Allah’s pleasure [1, 2].',
            },
            {
              kind: "quran",
              ref: "Quran 2:269",
              arabic: "يُؤْتِي الْحِكْمَةَ مَن يَشَاءُ ۚ وَمَن يُؤْتَ الْحِكْمَةَ فَقَدْ أُوتِيَ خَيْرًا كَثِيرًا",
              translation: "He gives wisdom to whom He wills, and whoever has been given wisdom has certainly been given much good.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: 'The principle that wisdom constitutes supreme good establishes writing reflections as the mandatory method for capturing and internalizing that divinely granted understanding. [1, 2]',
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (peace be upon him) said: \"Whoever takes a path in search of knowledge, Allah will make easy for him a path to Paradise.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: 'The prophetic principle that seeking knowledge eases the path to Paradise grounds writing reflections as the mandatory exertion for securing that prioritized spiritual reward. [1], [2]',
            },
          ],
          description: `**Why?**

Reading without reflection is consumption without digestion. The Quran repeatedly commands tafakkur (reflection) and tadabbur (pondering deeply). Writing a brief note after each reading session forces you to process what you have read, identify the key insight, and connect it to your existing knowledge. Over time, these notes become a personal knowledge base that compounds in value.

**How?**

1. **Keep it brief — 3-5 sentences maximum.** The goal is reflection, not a book report. If writing feels burdensome, you will skip it. If it is quick, it becomes automatic.

2. **Use a simple template:**
   - **Date and book title**
   - **Key insight:** The single most important idea from today's reading
   - **Connection:** How this connects to something you already know, believe, or are working on
   - **Question:** One question this reading raised for you

4. **Where to write:**
   - A dedicated reading notebook (physical)
   - A digital note per book (Notion, Obsidian, Apple Notes)
   - The margins of the book itself (marginalia is a time-honoured scholarly practice)

5. **Review your notes monthly.** Skim through the month's entries to see patterns, recurring themes, and ideas that are maturing. This review is where deep connections often crystallise.` },
      ],
    },
    {
      title: 'Learn the Islamic obligation to seek knowledge — study hadith "Seek knowledge from the cradle to the grave"',
      priority: 'medium', tags: ['aqidah', 'knowledge'],
      description: 'Understanding that seeking knowledge is a religious obligation (fard) transforms learning from a personal ambition into an act of worship. Study the Quranic verses and ahadith that establish the rank of scholars and the duty of lifelong learning.',
      subtasks: [
        { title: 'Study Surah Al-Alaq (96:1-5) and its significance as the first revelation', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 24:1",
              arabic: "**Translation:** (This is) a Sûrah (chapter of the Qur’ân) which We have sent down and which We have enjoined, (ordained its laws); and in it We have revealed manifest Ayât (proofs, evidence, verses, lessons, signs, revelations - lawful and unlawful things, and set boundaries of Islâmic Religion), that you may remember.",
              translation: "(This is) a Sûrah (chapter of the Qur’ân) which We have sent down and which We have enjoined, (ordained its laws); and in it We have revealed manifest Ayât (proofs, evidence, verses, lessons, signs, revelations - lawful and unlawful things, and set boundaries of Islâmic Religion), that you may remember.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: 'The divine enjoining of Surahs containing manifest proofs grounds studying the first revelation as essential for understanding those sent down signs. [1, 2]',
            },
            {
              kind: "quran",
              ref: "Quran 6:105",
              arabic: "**Translation:** This is how We explain Our revelations in various ways- though they will say, ‘You [Muhammad] have been studying’- to make them clear for those who know.",
              translation: "This is how We explain Our revelations in various ways- though they will say, ‘You [Muhammad] have been studying’- to make them clear for those who know.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: 'The divine principle that studying clarifies revelations for those who know establishes studying Al-Alaq as essential for mastering the message\'s primary meanings [1, 2].',
            },
          ],
          description: `**Why?**

The very first words Allah chose to reveal to humanity through His final Messenger were not about prayer, fasting, or charity — they were about reading and knowledge. "Iqra bismi Rabbik" (Read in the name of your Lord) establishes that in the Islamic worldview, knowledge is not secondary to worship — it is integral to it. Understanding why Allah began the revelation with this command reshapes how you view every act of learning for the rest of your life.


**How?**

1. **Read the Arabic text and translation of Surah Al-Alaq, ayahs 1-5:**
   - "Read in the name of your Lord who created"
   - "Created man from a clinging substance"
   - "Read, and your Lord is the Most Generous"
   - "Who taught by the pen"
   - "Taught man that which he knew not"

2. **Study a tafsir (commentary) of these ayahs.** Recommended sources:
   - *Tafsir Ibn Kathir* — concise and authentic
   - *In the Shade of the Quran* by Sayyid Qutb — reflective and moving
   - *Tafsir al-Sa'di* — accessible and practical

3. **Reflect on the key themes:**
   - Knowledge begins with the name of Allah (bismillah) — all learning is sacred when oriented correctly
   - "The pen" (al-qalam) is highlighted as a tool of divine teaching — writing and recording knowledge is itself an act aligned with divine methodology
   - "Taught man that which he knew not" — every new thing you learn is a gift from Allah

4. **Journal your personal reflection:** How does knowing that the first revelation was about reading affect how you approach your daily study, your professional development, and your intellectual curiosity?

5. **Memorise the first 5 ayahs** if you have not already. They are short and carry immense spiritual weight when recited with understanding.` },
        { title: 'Read the hadith collections on the virtue of knowledge (Sahih Muslim, Kitab al-Ilm)', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 20:114",
              arabic: "وَقُل رَّبِّ زِدْنِي عِلْمًا",
              translation: "Say, \"Lord, increase me in knowledge!\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: 'The command to pray for increased knowledge grounds reading hadiths on its virtues as the mandatory pursuit for achieving that divinely prioritized spiritual growth. [1]',
            },
            {
              kind: "quran",
              ref: "Quran 39:9",
              arabic: "قُلْ هَلْ يَسْتَوِي الَّذِينَ يَعْلَمُونَ وَالَّذِينَ لَا يَعْلَمُونَ ۗ إِنَّمَا يَتَذَكَّرُ أُولُو الْأَلْبَابِ",
              translation: "Say, \"How can those who know be equal to those who do not know?\" Only those who have understanding will take heed.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: 'The principle that the knowledgeable and ignorant are unequal grounds reading hadith collections as the mandatory pursuit for attaining that divinely prioritized understanding [1], [2].',
            },
            {
              kind: "hadith",
              ref: "Sunan Ibn Majah 224",
              translation: "The Prophet (peace be upon him) said: \"Seeking knowledge is an obligation upon every Muslim.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: 'The prophetic principle that seeking knowledge is an obligation grounds reading hadith collections as the mandatory fulfillment of this divinely sanctioned individual duty.',
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (peace be upon him) said: \"Whoever takes a path upon which to obtain knowledge, Allah makes the path to Paradise easy for him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: 'The prophetic principle that seeking knowledge eases the path to Paradise grounds reading hadith collections as the essential pursuit for securing that prioritized spiritual reward.',
            },
          ],
          description: `**Why?**

The Quran establishes the principle; the ahadith elaborate the details, incentives, and practical implications. The hadith literature on knowledge is extraordinarily rich — it covers the obligation to seek knowledge, the reward for doing so, the rank of scholars, the danger of concealing knowledge, and the etiquette of learning. Without engaging these texts, your understanding of Islam's intellectual tradition remains incomplete.


**How?**

1. **Start with the dedicated "Book of Knowledge" (Kitab al-Ilm) in the major collections:**
   - **Sahih Muslim**, Kitab al-Ilm — the chapter on knowledge
   - **Sahih al-Bukhari**, Kitab al-Ilm — often placed at the very beginning of the collection, reflecting its importance
   - **Sunan Abu Dawud**, Kitab al-Ilm
   - **Jami' al-Tirmidhi**, chapters on knowledge

2. **Key ahadith to study and understand (not just read):**
   - "Seeking knowledge is an obligation upon every Muslim" (Ibn Majah)
   - "Whoever takes a path in pursuit of knowledge, Allah makes easy for him a path to Paradise" (Muslim)
   - "The scholars are the heirs of the Prophets" (Abu Dawud, Tirmidhi)
   - "When a person dies, his deeds come to an end except for three: ongoing charity, beneficial knowledge, or a righteous child who prays for him" (Muslim)
   - "Whoever conceals knowledge will be bridled with a bridle of fire on the Day of Judgement" (Abu Dawud)

3. **Use an accessible translation with commentary:**
   - *Riyad al-Salihin* by Imam al-Nawawi (chapter on knowledge) — curated and well-explained
   - *40 Hadith al-Nawawi* includes several knowledge-related hadith with commentary

4. **For each hadith, write down:**
   - The core teaching
   - How it applies to your current learning journey
   - One specific behaviour it should change or reinforce in your life

5. **Discuss these ahadith with others.** Knowledge shared in study circles (halaqat) carries more weight and sparks insights that solitary reading often misses.` },
        { title: 'Learn the distinction between fard ayn and fard kifayah knowledge', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2645",
              translation: "The Prophet (peace be upon him) distinguished between knowledge that is obligatory upon every Muslim individually (fard ayn) such as the fundamentals of faith and worship, and knowledge that is a communal obligation (fard kifayah) such as medicine and engineering. **II. Quran**",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: 'The prophetic distinction between individual and communal obligations establishes learning this categorization as mandatory for prioritizing foundational religious duties over specialized technical pursuits.',
            },
            {
              kind: "quran",
              ref: "Quran 9:122",
              arabic: "فَلَوْلَا نَفَرَ مِن كُلِّ فِرْقَةٍ مِّنْهُمْ طَائِفَةٌ لِّيَتَفَقَّهُوا فِي الدِّينِ",
              translation: "And it is not for the believers to go forth all at once. Of every troop of them, a party only should go forth, that they may gain understanding in the religion.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: 'The command for a party to seek religious understanding establishes the distinction between individual duties and communal obligations for mastering specialized knowledge [1].',
            },
          ],
          description: `**Why?**

Not all knowledge carries the same obligation. Fard ayn (individually obligatory) knowledge is what every Muslim must learn — the basics of belief, worship, and personal conduct. Fard kifayah (communally obligatory) knowledge is what the Muslim community as a whole must ensure some members pursue — medicine, engineering, governance, agriculture, defence, and so on. Understanding this distinction helps you prioritise your learning and recognise that your professional expertise may itself be a religious obligation upon the ummah.


**How?**

1. **Study the classical definitions:**

   | Category | Definition | Examples |
   |----------|-----------|---------|
   | **Fard Ayn** | Knowledge every individual Muslim must have | Basics of aqidah (creed), how to perform salah, fasting, zakah rules that apply to you, halal/haram in your daily life, basic akhlaq (ethics) |
   | **Fard Kifayah** | Knowledge the community must collectively ensure is present | Medicine, law, agriculture, engineering, Islamic jurisprudence at advanced levels, Quran memorisation (hifz), military science, mathematics |

2. **Read the scholarly discussions on this topic:**
   - Imam al-Ghazali's *Ihya Ulum al-Din* (Revival of the Religious Sciences), Book of Knowledge — the most comprehensive classical treatment
   - Ibn Abdil Barr's *Jami' Bayan al-Ilm wa Fadlih* — a thorough compilation of scholarly views
   - Contemporary: *Purification of the Heart* by Hamza Yusuf touches on knowledge obligations

3. **Apply this framework to your own life:**
   - List the fard ayn knowledge you still need to acquire (be honest — many Muslims have gaps in worship rules, aqidah, or the rulings specific to their life circumstances)
   - Identify whether your profession falls under fard kifayah — if your community needs engineers, doctors, teachers, or farmers, your professional learning may carry communal obligation

4. **Key insight to internalise:** Studying software engineering, medicine, or agriculture with the intention of serving the Muslim community transforms "secular" education into ibadah. The distinction is not between "religious" and "worldly" knowledge — it is between knowledge pursued for Allah's sake and knowledge pursued without purpose.

5. **Discuss this framework with a local scholar or study circle** to resolve specific questions about what is obligatory in your circumstances.` },
        { title: 'Write a personal reflection on how seeking knowledge is ibadah in your life', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 58:11",
              arabic: "يَرْفَعِ اللَّهُ الَّذِينَ آمَنُوا مِنكُمْ وَالَّذِينَ أُوتُوا الْعِلْمَ دَرَجَاتٍ",
              translation: "Allah will raise those who have believed among you and those who were given knowledge, by degrees.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: 'The divine promise that knowledge earns higher degrees establishes personal reflection as the mandatory practice for identifying one’s learning as sacred worship. [1], [2]',
            },
            {
              kind: "quran",
              ref: "Quran 35:28",
              arabic: "إِنَّمَا يَخْشَى اللَّهَ مِنْ عِبَادِهِ الْعُلَمَاءُ",
              translation: "Only those fear Allah, from among His servants, who have knowledge.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: 'The principle that knowledge produces true fear of Allah establishes personal reflection as the mandatory practice for identifying one’s learning journey as sacred worship [1].',
            },
            {
              kind: "hadith",
              ref: "Sunan Ibn Majah 224",
              translation: "The Messenger of Allah (peace be upon him) said: \"Seeking knowledge is an obligation upon every Muslim.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: 'The prophetic principle that seeking knowledge is an obligation grounds personal reflection as the mandatory practice for identifying learning as sacred worship [1, 2].',
            },
          ],
          description: `**Why?**

Knowledge in Islam becomes ibadah (worship) through intention (niyyah). Without a conscious, articulated intention, your learning risks becoming purely utilitarian — a means to a salary or status rather than a means to draw closer to Allah and serve His creation. Writing a personal reflection forces you to examine and declare your intention, which the Prophet (peace be upon him) identified as the foundation of all deeds: "Actions are but by intentions."


**How?**

1. **Set aside 30-45 minutes of quiet, reflective time.** Treat this as a spiritual exercise, not an academic assignment. Make wudu if you wish, sit in your reading space, and begin with bismillah.

2. **Reflect on and write about these questions (1-2 pages total):**

   **On your past:**
   - What knowledge has Allah already blessed you with? How did it reach you?
   - Were there moments when learning felt like an act of worship? What made them different?

   **On your present:**
   - What are you currently learning, and what is your honest intention behind it?
   - Is your learning oriented primarily toward dunya (worldly gain), akhirah (hereafter), or both?
   - Are there areas where you are avoiding knowledge you know you need (fard ayn gaps)?

   **On your future:**
   - How can you reframe your professional development as service to Allah and His creation?
   - What knowledge, if you acquired it, would allow you to benefit the most people?
   - What does a life of learning-as-ibadah look like for you practically — daily, weekly, yearly?

3. **Write an intention statement.** Conclude your reflection with a clear niyyah for your learning journey. Example:
   > "I intend to seek knowledge for the sake of Allah — to fulfil my obligations, to serve my community, to honour the trust of intellect He has given me, and to leave beneficial knowledge as sadaqah jariyah after I am gone."

4. **Keep this reflection accessible.** Revisit it when motivation dips or when you feel disconnected from the purpose of your studies. It serves as a spiritual anchor for your intellectual life.` },
      ],
    },
    {
      title: 'Complete a foundational course in Islamic sciences (fiqh, aqidah, or seerah)',
      priority: 'high', tags: ['islamic-education', 'study'],
      description: 'Every Muslim needs a baseline understanding of their faith — how to worship correctly (fiqh), what to believe (aqidah), and who the Prophet (peace be upon him) was (seerah). Completing a structured course ensures your foundation is solid rather than piecemeal.',
      subtasks: [
        { title: 'Research reputable Islamic institutes offering structured courses (online or local)', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 71",
              translation: "The Prophet (peace be upon him) said: \"When Allah wishes good for someone, He bestows upon him understanding of the religion (fiqh).\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: 'The prophetic principle that religious understanding signifies divine favor establishes researching reputable institutes as the mandatory path for securing that prioritized spiritual goodness [1].',
            },
          ],
          description: `**Why?**

The Islamic knowledge landscape is vast and uneven — there are excellent institutions and there are sources that spread confusion or extremism. Choosing a reputable institute with qualified scholars, clear curricula, and a balanced methodology protects your aqidah and ensures you are building on solid ground. The scholars of Islam have always emphasised taking knowledge from trustworthy chains of transmission (isnad).


**How?**

1. **Identify reputable online Islamic institutes.** Well-established options include:
   - **SeekersGuidance** (Hanafi/Shafi'i focus, free courses, qualified scholars)
   - **Al-Maghrib Institute** (weekend seminars, engaging format)
   - **Bayyinah Institute** (Arabic and Quranic focus, Ustadh Nouman Ali Khan)
   - **Islamic Online University (IOU) / International Open University** (Dr. Bilal Philips, degree programmes)
   - **Qalam Institute** (Mufti Hussain Kamani, traditional curriculum)
   - **Yaqeen Institute** (research-based, contemporary issues)

2. **Identify local options:**
   - Your local masjid's education programmes
   - Dar al-Uloom or Islamic seminary in your city
   - Community study circles (halaqat) led by qualified teachers

3. **Evaluate each option against these criteria:**

   | Criterion | What to Look For |
   |-----------|-----------------|
   | **Scholarly credentials** | Teachers should have formal Islamic education (ijazah, degree from recognised institution) |
   | **Methodology** | Balanced, mainstream Sunni scholarship (avoid fringe movements) |
   | **Curriculum structure** | Clear progression from basics to advanced, not ad hoc lectures |
   | **Community** | Active student body for discussion and accountability |
   | **Accessibility** | Schedule, cost, and format that work for your life |

4. **Shortlist 3-5 options** and read reviews from former students. Pay attention to whether students describe meaningful learning or just entertainment.

5. **Note:** Free is not always best, and expensive is not always better. The key factor is the qualification and methodology of the teachers.` },
        { title: 'Select one subject area (fiqh, aqidah, or seerah) to start with', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 9:122",
              arabic: "فَلَوْلَا نَفَرَ مِن كُلِّ فِرْقَةٍ مِّنْهُمْ طَائِفَةٌ لِّيَتَفَقَّهُوا فِي الدِّينِ وَلِيُنذِرُوا قَوْمَهُمْ إِذَا رَجَعُوا إِلَيْهِمْ",
              translation: "Of every troop of them, a party only should go forth, that they may gain understanding in the religion and warn their people when they return to them.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: 'The command for a party to gain religious understanding establishes selecting a subject as the essential first step for mastering knowledge to effectively guide others. [1, 2]',
            },
          ],
          description: `**Why?**

Trying to study all three subjects simultaneously at a foundational level typically leads to shallow engagement with each. Starting with one subject allows you to build depth, establish study rhythms, and experience the satisfaction of completing a full course before moving on. The classical Islamic tradition used a sequential approach — students mastered one text before proceeding to the next.


**How?**

1. **Understand what each subject covers:**

   | Subject | What You Will Learn | Best Starting Point If... |
   |---------|-------------------|--------------------------|
   | **Fiqh** (Jurisprudence) | How to perform salah, fasting, zakah, hajj correctly; halal/haram in daily life; purification rules | You have gaps in how to worship correctly or are unsure about rulings you encounter daily |
   | **Aqidah** (Creed) | Who Allah is (His names and attributes), what to believe about angels, prophets, the hereafter, divine decree | You have doubts, face challenging questions about Islam, or want theological clarity |
   | **Seerah** (Prophetic Biography) | The life of the Prophet (peace be upon him) — his character, struggles, decisions, and legacy | You want to feel emotionally connected to the Prophet and learn leadership through his example |

2. **Choose based on your most pressing need, not just interest:**
   - If you are making mistakes in salah or unsure about basic rulings → **start with fiqh**
   - If you struggle with doubts or cannot articulate what you believe → **start with aqidah**
   - If you feel disconnected from the Prophet and want inspiration → **start with seerah**

3. **If genuinely unsure, start with fiqh.** The scholars generally advise that knowledge of how to worship correctly is the most urgent fard ayn knowledge after basic aqidah (which most Muslims absorb informally).

4. **Commit to your choice.** Write it down: "I am starting with [subject] because [reason]." Do not second-guess — you will study the others in due course.` },
        { title: 'Enrol and commit to a weekly study schedule', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (peace be upon him) said: \"Whoever takes a path in search of knowledge, Allah will make easy for him the path to Paradise.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: 'The prophetic principle that seeking knowledge eases the path to Paradise establishes a weekly schedule as the mandatory path for securing that spiritual reward.',
            },
          ],
          description: `**Why?**

Enrolment without scheduled study time is just wishful thinking. The difference between someone who completes a course and someone who abandons it after week two is almost always the presence of a protected, recurring time block. Committing to a weekly schedule transforms a vague intention into a structural reality in your life.


**How?**

1. **Enrol in your chosen course.** Complete the registration, pay the fee (if applicable), and gain access to materials. Do this now — do not defer.

2. **Determine the course's time requirements:**
   - How many hours of video/reading per week?
   - Are there live sessions at fixed times?
   - How much time do assignments require?
   - Total expected duration (weeks/months)?

3. **Block study time in your calendar:**
   - Treat it as a non-negotiable appointment, not an "if I have time" activity
   - Choose a consistent weekly slot (e.g., every Saturday 9-11am, or Tuesday and Thursday evenings)
   - Add 30 minutes buffer for review and notes
   - Set calendar reminders

4. **Build in accountability:**
   - Tell a family member or friend you are taking the course
   - Find a study partner from the same cohort
   - If the course has a discussion forum, participate actively — you will learn more and feel more committed

5. **Prepare your study environment:**
   - Notebook dedicated to this course
   - The required textbook (if any)
   - A quiet space during your study block
   - Phone on silent or in another room

6. **Anticipate and plan for disruptions.** Identify the weeks in the course duration that are likely to be busy (holidays, travel, work deadlines) and plan to study ahead or catch up around them.` },
        { title: 'Complete all assignments and assessments in the course', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 9:122",
              arabic: "فَلَوْلَا نَفَرَ مِن كُلِّ فِرْقَةٍ مِّنْهُمْ طَائِفَةٌ لِّيَتَفَقَّهُوا فِي الدِّينِ وَلِيُنذِرُوا قَوْمَهُمْ إِذَا رَجَعُوا إِلَيْهِمْ لَعَلَّهُمْ يَحْذَرُونَ",
              translation: "And it is not for the believers to go forth all at once. For there should separate from every division of them a group to obtain understanding in the religion and warn their people when they return to them that they might be cautious.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: 'The command to obtain religious understanding establishes completing assessments as mandatory for securing the proficiency required to successfully warn and guide one’s people. [1]',
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 71",
              translation: "The Prophet (peace be upon him) said: \"Whoever Allah wants good for, He gives him understanding of the religion.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: 'The prophetic principle that religious understanding signifies divine favor establishes completing assessments as mandatory for validating the comprehension necessary to secure that spiritual goodness. [1]',
            },
          ],
          description: `**Why?**

Passive consumption — watching lectures without doing the work — creates an illusion of knowledge without the reality of it. Assignments and assessments are where learning is consolidated: they force you to retrieve information, apply concepts, and confront misunderstandings. Skipping them is like attending a gym but never picking up a weight. The Islamic tradition of knowledge demands not just hearing but understanding and applying.


**How?**

1. **Treat every assignment as an act of ibadah.** Renew your niyyah — you are completing this work to fulfil your obligation to understand your deen properly.

2. **Do assignments on time, not in a last-minute batch:**
   - Set a personal deadline 1-2 days before the official due date
   - This creates a buffer for life interruptions and reduces anxiety
   - Late batching leads to shallow work and poor retention

3. **For written assignments:**
   - Answer from your own understanding first, then check sources
   - Use the assignment as an opportunity to formulate your thoughts, not just parrot back lecture content
   - Write clearly — if you cannot explain it simply, you do not understand it deeply enough

4. **For quizzes and exams:**
   - Review your notes the week before, not the night before
   - Use active recall: close your notes and try to write down key concepts from memory
   - If you get a question wrong, research the correct answer thoroughly — mistakes are your best teachers

5. **If you fall behind:**
   - Do not skip assignments to "catch up" on lectures — the assignments are where the learning happens
   - If necessary, slow your pace rather than abandon the work
   - Contact the instructor or study partner for help if you are stuck

6. **Completion standard:** Every assignment submitted, every assessment attempted. Perfection is not required — thoroughness and honest effort are.` },
        { title: 'Summarise key lessons in a personal knowledge notebook', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 29:69",
              arabic: "وَالَّذِينَ جَاهَدُوا فِينَا لَنَهْدِيَنَّهُمْ سُبُلَنَا",
              translation: "And those who strive for Us — We will surely guide them to Our ways.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: 'The divine promise that striving secures guidance establishes summarising lessons as the mandatory exertion for identifying and recording the various ways to attain Allah’s favor. [1], [2]',
            },
          ],
          description: `**Why?**

The Islamic scholarly tradition has always centred on note-taking, summarisation, and the creation of personal reference works. Scholars like Imam al-Nawawi wrote abridgements (mukhtasarat) to distil vast bodies of knowledge into usable summaries. Your personal knowledge notebook serves the same function — it transforms a course you took into a reference you can consult for years. Without it, most course content fades within months.


**How?**

1. **Choose your notebook format:**
   - **Physical notebook** (recommended for Islamic sciences — writing by hand improves retention of detailed content)
   - **Digital notes** (Notion, Obsidian, OneNote) — better for searching and linking across topics
   - **Hybrid:** Handwritten notes during study, typed summaries at the end of each module

2. **Structure your notebook by topic, not by lecture number:**
   - Organise by subject headings (e.g., for fiqh: "Purification," "Salah," "Fasting," "Zakah")
   - This makes the notebook useful as a reference, not just a chronological dump

3. **For each topic, capture:**
   - **Core ruling or concept** — the essential takeaway in your own words
   - **Evidence** — the Quranic ayah, hadith, or scholarly reasoning behind it
   - **Practical application** — how this applies to your daily life specifically
   - **Questions or areas of uncertainty** — honest acknowledgement of what you still need to clarify

4. **Use formatting to aid quick reference:**
   - Bold key terms and rulings
   - Use tables for comparing opinions (e.g., different madhahib on a fiqh issue)
   - Add page references to the course textbook for deeper review

5. **Write a one-page "executive summary" at the end of the entire course.** This is your highest-level distillation — the 10-15 most important things you learned. This page alone is worth the entire notebook.

6. **Review the notebook periodically** — once a month for the first three months, then quarterly. Each review reinforces retention and often sparks new insights as your knowledge grows.` },
      ],
    },
  ],

  intellect_learning_growth: [
    {
      title: 'Read one non-fiction book per month across diverse disciplines (science, history, philosophy)',
      priority: 'high', tags: ['reading', 'breadth'],
      description: 'The Quran repeatedly urges reflection on creation, history, and the natural world. Reading across disciplines builds the cross-pollinating knowledge base that produces genuine insight and protects against intellectual narrowness.',
      subtasks: [
        { title: 'Create a 12-month reading list spanning at least 4 different disciplines', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:190",
              arabic: "إِنَّ فِي خَلْقِ السَّمَاوَاتِ وَالْأَرْضِ وَاخْتِلَافِ اللَّيْلِ وَالنَّهَارِ لَآيَاتٍ لِّأُولِي الْأَلْبَابِ",
              translation: "Indeed, in the creation of the heavens and the earth and the alternation of the night and the day are signs for those of understanding.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: 'The principle that creation contains signs establishes a multi-disciplinary reading list as mandatory for identifying the diverse evidence of Allah’s wisdom. [1], [2]',
            },
          ],
          description: `**Why?**

A reading list is a curriculum you design for yourself. Without one, you will gravitate toward familiar topics and miss the cross-disciplinary exposure that produces original thinking. The Quran commands reflection on history (qasas), the natural world (khalq), the cosmos (samawat), and the human soul (anfus) — a 12-month reading plan across disciplines mirrors this Quranic breadth. Planning also prevents the "what should I read next?" paralysis that derails many readers.


**How?**

1. **Select at least 4 disciplines from this list (aim for 5-6):**
   - Science (biology, physics, cosmology, ecology)
   - History (Islamic civilisation, world history, regional history)
   - Philosophy and ethics (Islamic philosophy, Western philosophy, logic)
   - Economics and finance (Islamic economics, behavioural economics)
   - Psychology and human behaviour
   - Technology and systems thinking
   - Biography and memoir (scholars, leaders, innovators)
   - Sociology and anthropology

2. **Allocate books across the year.** Aim for 2-3 books per discipline minimum:

   | Month | Book Title | Discipline | Why This Book |
   |-------|-----------|------------|--------------|
   | January | [Title] | History | [Brief reason] |
   | February | [Title] | Science | [Brief reason] |
   | ... | ... | ... | ... |

3. **Source recommendations from:**
   - "Best of" lists from respected curators (Farnam Street, Brain Pickings, Five Books)
   - Recommendations from scholars and thought leaders you respect
   - University syllabi in disciplines you want to explore
   - The reading lists of people you admire (many public figures share theirs)

4. **Include at least 2 books from the Islamic intellectual tradition:** Works by Ibn Khaldun, al-Ghazali, Ibn Rushd, or contemporary Muslim thinkers ensure your reading list reflects your civilisational roots.

5. **Keep the list flexible.** It is a plan, not a prison — swap books if something more compelling or relevant emerges. But always replace with the same discipline to maintain breadth.` },
        { title: 'Set a monthly reading target and calendar reminder', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (peace be upon him) said: \"Whoever takes a path in search of knowledge, Allah will make easy for him the path to Paradise.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: 'The prophetic principle that seeking knowledge eases the path to Paradise grounds monthly targets and reminders as mandatory for securing that prioritized spiritual reward. [1]',
            },
          ],
          description: `**Why?**

"One book per month" sounds simple until life gets busy. Without a concrete target broken into weekly progress and a calendar system that prompts you, months will slip by with unfinished books. Structure is what transforms aspiration into behaviour.

**How?**

1. **Define your monthly target concretely:**
   - Average non-fiction book: 250-350 pages
   - At 20 pages/day: finished in 12-17 days (with buffer for the rest of the month)
   - At 30 minutes/day: most people read 15-25 pages, finishing in 10-20 days
   - Set YOUR pace based on your reading speed — track how many pages you read in 30 minutes to calibrate

2. **Set calendar reminders:**
   - **1st of each month:** "Start this month's book: [Title]" — swap in the title from your reading list
   - **15th of each month:** "Mid-month reading check — are you on track?" — if less than halfway through, increase daily reading time
   - **25th of each month:** "Finish current book and write summary by month-end"
   - **Daily:** A recurring reminder at your designated reading time (e.g., "Reading time — 30 minutes")

3. **Create a visual progress tracker:**
   - A simple spreadsheet or wall chart showing all 12 months and books
   - Colour-code: grey (not started), yellow (in progress), green (complete)
   - Seeing green boxes accumulate is surprisingly motivating

4. **Build in grace periods.** Some books will take longer than a month (dense academic texts, for instance). Plan lighter books for busy months (Ramadan, travel) and heavier books for quieter periods.

5. **If you finish early in a month,** start the next book or read something from a "bonus" list — short essay collections, long-form articles, or a book you are re-reading.` },
        { title: 'Write a one-page summary and key takeaways for each book', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:190-191",
              arabic: "إِنَّ فِي خَلْقِ السَّمَاوَاتِ وَالْأَرْضِ وَاخْتِلَافِ اللَّيْلِ وَالنَّهَارِ لَآيَاتٍ لِّأُولِي الْأَلْبَابِ",
              translation: "Indeed, in the creation of the heavens and the earth and the alternation of the night and the day are signs for those of understanding.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: 'The command to reflect on signs establishes writing summaries as the mandatory practice for identifying and internalizing the diverse evidence of Allah’s wisdom. [1, 2]',
            },
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 3641",
              translation: "The Prophet (peace be upon him) said: \"He who goes out in search of knowledge is in the path of Allah until he returns.\"",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: 'The prophetic principle that seekers of knowledge are in Allah’s path establishes writing summaries as mandatory for capturing and preserving those sacred, prioritized insights.',
            },
          ],
          description: `**Why?**

If you cannot summarise a book in one page, you did not truly absorb it. Writing a summary forces you to distil hundreds of pages into the essential arguments, evidence, and insights — the same skill that Islamic scholars used when writing mukhtasarat (abridgements). These summaries also become a personal reference library: a year from now, you can review 12 one-page summaries in 30 minutes and refresh your memory on an entire year of reading.


**How?**

1. **Write the summary within 48 hours of finishing the book.** Delay causes memory decay — the longer you wait, the more generic and less useful your summary becomes.

2. **Use this one-page template:**

   **Title:** [Book Title]
   **Author:** [Author Name]
   **Discipline:** [Category]
   **Date Completed:** [Date]

   **Core Thesis (2-3 sentences):**
   What is the author's central argument or contribution?

   **Key Takeaways (3-5 bullet points):**
   - The most important insights, findings, or frameworks
   - Focus on what was genuinely new or challenging to your existing thinking

   **Best Quote or Passage:**
   One short passage that captures the essence of the book

   **How This Connects to My Life/Work:**
   1-2 sentences on practical application

   **How This Connects to Islamic Thought:**
   Does this book confirm, challenge, or extend any Islamic principle or concept?

   **Rating:** [1-5 stars] and a one-sentence justification

3. **Store all summaries in one place** — a dedicated notebook, a Notion database, or a folder in your notes app. Consistency of location matters for future retrieval.

4. **Do not aim for perfection.** A rough summary written promptly is infinitely more valuable than a polished summary you never write.` },
        { title: 'Share one insight per book with a friend, study circle, or online community', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 103:1-3",
              arabic: "وَالْعَصْرِ ۚ إِنَّ الْإِنسَانَ لَفِي خُسْرٍ ۚ إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ",
              translation: "By time, indeed, mankind is in loss, except for those who have believed and done righteous deeds and advised each other to truth and advised each other to patience.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: 'The command to advise each other to truth grounds sharing insights as the mandatory practice for securing the success required to escape mankind\'s loss. [1]',
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (peace be upon him) said: \"Whoever takes a path in search of knowledge, Allah will make easy for him a path to Paradise.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: 'The prophetic principle that seeking knowledge eases the path to Paradise establishes sharing insights as mandatory for securing that prioritized spiritual reward.',
            },
          ],
          description: `**Why?**

 Sharing an insight serves three purposes: it forces you to articulate the idea clearly (deepening your own understanding), it benefits the listener, and it invites dialogue that may refine or challenge your interpretation. Knowledge that is shared multiplies; knowledge that is kept dies with its holder.

**How?**

1. **Choose your sharing channel based on your comfort level:**

   | Channel | Format | Effort Level |
   |---------|--------|-------------|
   | **WhatsApp/text to a friend** | "I just read [book] and this one idea really struck me: [insight]" | Low |
   | **Family dinner conversation** | Share verbally — "I learned something interesting this month..." | Low |
   | **Study circle (halaqah)** | Brief presentation or discussion starter | Medium |
   | **Social media post** | A short thread or post with the key insight and your reflection | Medium |
   | **Blog or newsletter** | A written piece expanding on the insight | High |
   | **Book club** | Structured discussion with others who read the same book | High |

2. **Pick the ONE insight from your summary that is most:**
   - Surprising or counterintuitive
   - Practically useful for others
   - Connected to Islamic principles or current events
   - Likely to spark good conversation

3. **Frame it as a gift, not a lecture.** Say "I found this fascinating and thought you might too" rather than "You should know this." People engage with shared curiosity, not unsolicited instruction.

4. **Invite response.** End with a question: "What do you think?" or "Have you experienced this?" Dialogue creates deeper learning than monologue.

5. **Track your shares.** In your reading log, note who you shared with and what resulted. Over time, you may find that these conversations become as valuable as the books themselves.` },
      ],
    },
    {
      title: 'Enrol in a structured course or programme aligned with your life mission',
      priority: 'high', tags: ['learning', 'skill-building'],
      description: 'Structured learning with deadlines, assessments, and feedback is far more effective than passive self-study. Align your next formal education investment with your overarching life mission so that every hour of study compounds toward your purpose.',
      subtasks: [
        { title: 'Clarify your life mission statement and the skills it demands', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 20:114",
              arabic: "وَقُل رَّبِّ زِدْنِي عِلْمًا",
              translation: "And say, \"My Lord, increase me in knowledge.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: 'The command to seek increased knowledge establishes clarifying one’s mission and skills as the mandatory pursuit for attaining that divinely prioritized understanding.',
            },
            {
              kind: "quran",
              ref: "Quran 94:5-6",
              arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ۚ إِنَّ مَعَ الْعُسْرِ يُسْرًا",
              translation: "For indeed, with hardship comes ease. Indeed, with hardship comes ease.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: 'The divine principle that ease accompanies hardship grounds mission clarification as mandatory for identifying the skills needed to successfully navigate life\'s prioritized spiritual trials [1].',
            },
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 2646",
              translation: "The Prophet (peace be upon him) said: \"Whoever pursues a path to gain knowledge, Allah will ease his way to Paradise.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: 'The prophetic principle that seeking knowledge eases the path to Paradise grounds mission clarification as mandatory for identifying the specific skills required for spiritual success.',
            },
          ],
          description: `**Why?**

A course without mission alignment is a distraction disguised as productivity. You could spend years accumulating credentials that do not serve your actual purpose. The Quran describes those who "think they are doing good" while their efforts are misdirected (18:104). Clarifying your life mission first ensures that your next educational investment is strategic — every hour of coursework compounds toward your calling rather than scattering your energy.


**How?**

1. **Draft (or revisit) your life mission statement.** A good mission statement answers: "What am I here to do, for whom, and why does it matter to Allah?"

   Examples:
   - "To build ethical technology that makes Islamic financial literacy accessible to young Muslims worldwide"
   - "To practise medicine in underserved communities, treating each patient as a trust (amanah) from Allah"
   - "To educate the next generation of Muslim children with academic excellence and prophetic character"

2. **Identify the skill categories your mission demands:**

   | Mission Component | Required Skills | Current Level (1-5) |
   |-------------------|----------------|-------------------|
   | [Component 1] | [Skills] | [Rating] |
   | [Component 2] | [Skills] | [Rating] |
   | [Component 3] | [Skills] | [Rating] |

3. **Highlight the skills where:**
   - Your current level is below 3 (significant gap)
   - The skill is critical to your mission's success (not peripheral)
   - Structured learning would be more effective than self-study (complex, technical, or credential-required skills)

4. **These highlighted skills become your criteria for course selection** in the next subtask. You are not looking for the most interesting course — you are looking for the course that closes the most mission-critical gap.

5. **If you do not yet have a life mission statement,** that is a prerequisite task. Spend time with this before proceeding — a course chosen without mission clarity is a coin toss.` },
        { title: 'Research 3-5 courses or programmes that directly serve that mission', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 39:9",
              arabic: "قُلْ هَلْ يَسْتَوِي الَّذِينَ يَعْلَمُونَ وَالَّذِينَ لَا يَعْلَمُونَ",
              translation: "Say, \"Are those who know equal to those who do not know?\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: 'The principle that the knowledgeable and ignorant are not equal in Quran 39:9 establishes researching educational programs as the prerequisite for attaining that excellence..',
            },
            {
              kind: "hadith",
              ref: "Sunan Ibn Majah 224",
              translation: "The Messenger of Allah (peace be upon him) said: \"Seeking knowledge is an obligation upon every Muslim.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: 'The prophetic principle that seeking knowledge is an obligation establishes researching educational programs as the essential prerequisite for fulfilling that divinely prioritized duty.',
            },
          ],
          description: `**Why?**

Comparing multiple options prevents the common mistake of enrolling in the first course you find. Different programmes vary enormously in quality, depth, cost, and relevance. Spending a few hours researching 3-5 options now saves you from wasting months and money on a programme that does not deliver. The principle of due diligence (tabayyun) applies to educational investments just as it does to financial ones.


**How?**

1. **Search across multiple platforms and formats:**
   - **University programmes:** Part-time degrees, certificates, or individual courses (Coursera, edX, and university continuing education departments)
   - **Professional certifications:** Industry-recognised credentials (PMP, CFA, AWS, Google, etc.)
   - **Bootcamps and intensives:** 8-16 week immersive programmes (for tech, data, design)
   - **Islamic institutes:** For Islamic sciences-related missions (SeekersGuidance, Al-Maghrib, Mishkah, etc.)
   - **Mentorship-based programmes:** Cohort-based learning with practitioner mentors

2. **For each option, collect this information:**

   | Criterion | Programme 1 | Programme 2 | Programme 3 |
   |-----------|------------|------------|------------|
   | Name and provider | | | |
   | Duration | | | |
   | Total cost | | | |
   | Time commitment (hrs/week) | | | |
   | Format (live/self-paced/hybrid) | | | |
   | Credential earned | | | |
   | Instructor credentials | | | |
   | Student reviews/outcomes | | | |
   | Alignment with my skill gap | | | |

3. **Read reviews from actual graduates**, not just testimonials on the programme's website. Check LinkedIn, Reddit, and Course Report for unfiltered opinions.

4. **Contact current students or alumni** if possible. Ask: "What did you actually learn? Would you do it again? What was the weakest part of the programme?"

5. **Narrow to 3-5 genuine contenders** — programmes that are feasible, well-regarded, and directly address the mission-critical skill gap you identified.` },
        { title: 'Evaluate each on cost, time commitment, credential value, and Islamic compatibility', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 20:114",
              arabic: "وَقُل رَّبِّ زِدْنِي عِلْمًا",
              translation: "Say, \"Lord, increase me in knowledge!\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: 'The command to seek an increase in knowledge establishes evaluating educational options as the mandatory foundation for identifying effective, sustainable, and Islamically compatible growth..',
            },
            {
              kind: "quran",
              ref: "Quran 96:4-5",
              arabic: "الَّذِي عَلَّمَ بِالْقَلَمِ ۝ عَلَّمَ الْإِنسَانَ مَا لَمْ يَعْلَمْ",
              translation: "Who taught by [means of] the pen, who taught man what he did not know.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: 'The divine principle of teaching via the pen establishes evaluating educational options as the mandatory method for securing efficient, valuable, and Islamically compatible growth.',
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5027",
              translation: "The Prophet (peace be upon him) said: \"The best among you are those who learn the Quran and teach it.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: 'The prophetic principle identifying Quranic learners as the best people establishes evaluating programs as the necessary method for identifying efficient and Islamically compatible growth.',
            },
          ],
          description: `**Why?**

Education is an investment, and like any investment, it requires cost-benefit analysis. But unlike conventional analysis, your evaluation must include Islamic compatibility — ensuring the programme does not require compromising your values (mixed-gender retreats that violate your boundaries, interest-based financing, or content that contradicts Islamic principles). A programme that is excellent academically but problematic ethically is not suitable.


**How?**

1. **Score each programme on a weighted evaluation matrix:**

   | Criterion | Weight | Programme 1 | Programme 2 | Programme 3 |
   |-----------|--------|------------|------------|------------|
   | **Mission alignment** | 30% | /10 | /10 | /10 |
   | **Cost and ROI** | 20% | /10 | /10 | /10 |
   | **Time feasibility** | 20% | /10 | /10 | /10 |
   | **Credential value** | 15% | /10 | /10 | /10 |
   | **Islamic compatibility** | 15% | /10 | /10 | /10 |
   | **Weighted Total** | 100% | | | |

2. **Evaluation details for each criterion:**

   **Mission alignment:** Does this programme directly build the skill your mission requires? (Not adjacent, not tangential — direct.)

   **Cost and ROI:** Can you afford it without taking on riba-based debt? What is the expected return (higher income, new capability, career transition)? Consider employer sponsorship, scholarships, or payment plans.

   **Time feasibility:** Can you realistically commit the required hours per week given your current responsibilities (work, family, worship)?

   **Credential value:** Is the certificate or degree recognised in your industry? Will it open doors, or is it purely for personal enrichment?

   **Islamic compatibility:**
   - Is the content free from matters contradicting Islamic values?
   - Is the financing halal (no interest-based student loans required)?
   - Are the learning environment and schedule compatible with your Islamic obligations (salah times, Ramadan, gender interaction boundaries)?

3. **Calculate weighted scores and rank the programmes.** The top scorer is your primary choice; the second is your backup.

4. **Make your decision with istikharah.** Once the rational analysis is done, pray salat al-istikharah and proceed with confidence, trusting that Allah will guide you to what is best.` },
        { title: 'Enrol and block out study time in your weekly schedule', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 29:69",
              arabic: "وَالَّذِينَ جَاهَدُوا فِينَا لَنَهْدِيَنَّهُمْ سُبُلَنَا",
              translation: "And those who strive for Us — We will surely guide them to Our ways.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: 'The command to strive for God establishes scheduling study time as the essential effort for attaining those divinely prioritized ways to His good pleasure. [1],.',
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (peace be upon him) said: \"Whoever takes a path in search of knowledge, Allah will make easy for him a path to Paradise.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: 'The prophetic principle that pursuing knowledge eases the way to Paradise establishes scheduling study time as the practical initiation of that divinely rewarded journey.',
            },
          ],
          description: `**Why?**

The gap between "I plan to enrol" and "I am enrolled with study time blocked" is where most educational intentions die. Enrolment without scheduled study time is a recipe for falling behind within the first two weeks. Blocking time in your calendar is an act of prioritisation — you are telling yourself and the world that this learning matters enough to protect specific hours for it.


**How?**

1. **Enrol today.** If you have completed the evaluation, the decision is made — delay only adds procrastination risk. Complete the registration, payment, and any onboarding steps.

2. **Calculate your weekly study budget:**
   - Course requirement: [X] hours/week (from your research)
   - Add 30-50% buffer for review, assignments, and catch-up: [Y] total hours/week
   - This is your non-negotiable weekly commitment

3. **Block study sessions in your calendar:**
   - Use recurring calendar events with reminders
   - Treat them as fixed appointments — "I have a commitment at that time"
   - Optimal session length: 60-90 minutes with a break (matches focus research)
   - Spread across the week rather than cramming into one day

4. **Communicate your schedule to stakeholders:**
   - Tell your family when you will be studying and ask for their support
   - If applicable, inform your employer (many support professional development)
   - Let friends know you may be less available during this period

5. **Prepare your study infrastructure:**
   - Course materials downloaded or bookmarked
   - Dedicated notebook or digital notes system
   - Study space set up (refer to the distraction-free space you created earlier)
   - Calendar synced across all devices

6. **Set a start-of-course ritual.** Begin with bismillah and a brief du'a for beneficial knowledge. This frames every study session as ibadah from the very first day.` },
        { title: 'Complete the course and document what you learned', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:269",
              arabic: "يُؤْتِي الْحِكْمَةَ مَن يَشَاءُ ۚ وَمَن يُؤْتَ الْحِكْمَةَ فَقَدْ أُوتِيَ خَيْرًا كَثِيرًا",
              translation: "He gives wisdom to whom He wills, and whoever has been given wisdom has certainly been given much good.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: 'The principle that wisdom is much good establishes completing courses and documenting lessons as the essential method for preserving that divinely granted spiritual excellence..',
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 71",
              translation: "The Prophet (peace be upon him) said: \"Whoever Allah wants good for, He gives him understanding of the religion.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: 'The prophetic principle that religious understanding signifies divine favor grounds documenting course lessons as the essential method for solidifying that prioritized spiritual goodness..',
            },
          ],
          description: `**Why?**

Completion is where most people fail — online course completion rates average 5-15%. Finishing what you start is a matter of integrity and discipline, both deeply valued in Islam.

**How?**

1. **Push through the completion curve.** Most drop-offs happen between weeks 3-6. Strategies:
   - Revisit your mission statement when motivation dips — remember why you enrolled
   - Connect with course peers for mutual accountability
   - If you fall behind, catch up rather than quit — even completing at a slower pace is vastly better than abandoning

2. **Complete ALL assignments and assessments.** Do not skip the "optional" exercises — they are where the deepest learning happens.

3. **Document your learning using this structure:**

   **Course Completion Summary**
   - Course name, provider, dates, and credential earned
   - Your overall assessment (was it worth the investment?)

   **Key Learnings (organised by module/topic):**
   - For each major module: 3-5 bullet points of essential knowledge
   - Include frameworks, models, or tools you want to retain

   **Skills Acquired or Strengthened:**
   - What can you now do that you could not before?
   - Rate yourself again on the skill gap that prompted this course — how much did you improve?

   **Application Plan:**
   - How will you apply these skills in your work within the next 30 days?
   - What specific project or task will be your first application?

   **Remaining Gaps:**
   - What did the course not cover that you still need?
   - What follow-up learning is recommended?

4. **Store your documentation alongside your reading notes** — in the same notebook, Notion workspace, or knowledge management system. Cross-reference with your book summaries where themes overlap.

5. **Celebrate completion with gratitude.** Thank Allah for the opportunity to learn, and share what you learned with someone who can benefit from it.` },
      ],
    },
    {
      title: 'Study one new language at an intermediate level (Arabic priority for Muslims)',
      priority: 'medium', tags: ['arabic', 'language'],
      description: 'Language opens entire civilisations of thought. For Muslims, Arabic unlocks the Quran, hadith, and classical scholarship without the filter of translation. Even for non-Arabic languages, bilingualism strengthens cognitive flexibility and empathy.',
      subtasks: [
        { title: 'Choose your target language and define "intermediate level" concretely', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:13",
              arabic: "يَا أَيُّهَا النَّاسُ إِنَّا خَلَقْنَاكُم مِّن ذَكَرٍ وَأُنثَىٰ وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا",
              translation: "O mankind, indeed We have created you from male and female and made you peoples and tribes that you may know one another.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: 'The divine intent for peoples to know one another in Quran 49:13 grounds language selection as the practical mechanism for achieving this mandated connection.',
            },
          ],
          description: `**Why?**

"Learn a language" is hopelessly vague — it could mean anything from ordering food to reading literature. Without a concrete definition of "intermediate," you will either set the bar too low (declaring victory after memorising 200 words) or too high (feeling perpetual inadequacy despite real progress). For Muslims, the choice of language itself carries strategic weight — Arabic is the language of the Quran and scholarship, but other languages may serve your specific mission.


**How?**

1. **Choose your target language based on these priorities:**

   | Priority Level | Language Choice | Reason |
   |---------------|----------------|--------|
   | **Highest (for Muslims)** | Arabic (Modern Standard or Quranic) | Unlocks the Quran, hadith, and 14 centuries of scholarship |
   | **High** | Language of your heritage | Connects you to family, community, and cultural roots |
   | **Strategic** | Language of your mission field | If you serve a specific community or region |
   | **Intellectual** | Any language of a major civilisation | French, Mandarin, Spanish, Urdu, Turkish, etc. |

2. **Define "intermediate level" using the CEFR (Common European Framework) as a benchmark:**

   **CEFR B1 (Intermediate) means you can:**
   - Understand the main points of clear speech on familiar matters (work, school, leisure)
   - Handle most situations that arise while travelling in a region where the language is spoken
   - Write simple connected text on familiar topics
   - Describe experiences, events, hopes, and ambitions
   - Give reasons and explanations for opinions and plans

   **For Quranic Arabic specifically, "intermediate" means:**
   - Understand 70-80% of Quranic vocabulary without translation
   - Parse basic Arabic grammar (verb forms, noun cases, sentence structure)
   - Read a tafsir in Arabic with moderate dictionary assistance
   - Understand the khutbah (sermon) in Arabic-speaking masajid

3. **Write your personal definition:** "By [date], I will be able to [specific, testable ability] in [language]."

4. **This definition becomes your success criterion** — everything you do in the remaining subtasks is measured against it.` },
        { title: 'Select a primary learning method (course, tutor, app, or immersion)', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5027",
              translation: "The Prophet (peace be upon him) said: \"The best among you are those who learn the Quran and teach it.\" Learning through a structured method with a qualified teacher is the sunnah approach to acquiring knowledge.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: 'The prophetic principle identifying Quranic learners as the best establishes selecting a primary method as the Sunnah approach to acquiring knowledge..',
            },
          ],
          description: `**Why?**

Language acquisition research clearly shows that not all methods are equally effective, and the best method depends on your learning style, schedule, and target language. Choosing a primary method — rather than dabbling in five different apps — creates focused, consistent practice that compounds over time. The Prophet (peace be upon him) valued focused effort: "The most beloved deeds to Allah are the most consistent, even if small."


**How?**

1. **Evaluate the primary methods available:**

   | Method | Best For | Time Needed | Cost | Effectiveness |
   |--------|---------|-------------|------|--------------|
   | **Private tutor** | Conversation, pronunciation, personalised feedback | 2-3 hrs/week + homework | Medium-High | Very High |
   | **Structured course** (in-person or online) | Grammar, reading, systematic progression | 3-5 hrs/week | Medium | High |
   | **Language app** (Duolingo, Pimsleur, Bayyinah for Arabic) | Vocabulary, basic grammar, daily habit | 15-30 min/day | Low-Free | Medium (alone), High (as supplement) |
   | **Immersion** (living in a country, immersion programme) | Comprehensive fluency | Full-time | High | Highest |
   | **Self-study with textbooks** | Grammar, reading at own pace | Flexible | Low | Medium (requires discipline) |

2. **For Arabic specifically, top-rated resources:**
   - **Bayyinah Dream Programme** — outstanding for Quranic Arabic, structured, community-based
   - **Arabic With Husna** — excellent beginner-intermediate course
   - **Al-Arabiyyah Bayna Yadayk** — comprehensive textbook series used in many Islamic institutes
   - **Madinah Arabic Course** (Dr. V. Abdur Rahim) — free, systematic, widely respected
   - **Private tutor via iTalki or Preply** — affordable one-on-one practice

3. **Choose ONE primary method** and optionally one supplementary method:
   - Primary: The method you will invest the most time in (e.g., a tutor or structured course)
   - Supplementary: A daily habit tool (e.g., an app for vocabulary review)

4. **Avoid the "method hopping" trap.** Switching between methods every few weeks creates the illusion of progress while preventing depth in any single approach. Commit to your primary method for at least 3 months before evaluating.` },
        { title: 'Commit to 20-30 minutes of daily practice', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:13",
              arabic: "يَا أَيُّهَا النَّاسُ إِنَّا خَلَقْنَاكُم مِّن ذَكَرٍ وَأُنثَىٰ وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا",
              translation: "O mankind, indeed We have created you from male and female and made you peoples and tribes that you may know one another.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: 'The divine intent for people to know one another establishes daily practice as the mandatory discipline for mastering communication tools required for that connection.',
            },
            {
              kind: "quran",
              ref: "Quran 14:4",
              arabic: "وَمَا أَرْسَلْنَا مِن رَّسُولٍ إِلَّا بِلِسَانِ قَوْمِهِ لِيُبَيِّنَ لَهُمْ",
              translation: "And We did not send any messenger except in the language of his people to make clear to them.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: 'The divine principle that messengers speak their people\'s language for clarity establishes daily practice as mandatory for mastering communication tools needed to understand revelation.',
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 7",
              translation: "The Prophet (peace be upon him) was commanded by Allah: \"Read in the name of your Lord who created.\" The first revelation emphasised reading and knowledge through language.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: 'The command to read establishes daily practice as the essential discipline for acquiring the linguistic and religious knowledge prioritized in the first divine revelation.',
            },
          ],
          description: `**Why?**

Language acquisition is governed by one fundamental law: frequency beats intensity. A 20-minute daily practice session is vastly more effective than a 3-hour weekend marathon. This is because language learning depends on spaced repetition — your brain consolidates linguistic patterns during sleep and rest between sessions. Daily practice also builds the automaticity (fluency) that comes from repeated activation of the same neural pathways.


**How?**

1. **Fix a daily time slot and protect it:**
   - Morning (after Fajr) — fresh mind, less likely to be cancelled by the day's events
   - Commute time — excellent for audio-based practice (listening, podcast, Pimsleur)
   - Lunch break — a mental reset that doubles as language practice
   - Before bed — can work for reading-based practice, but watch for fatigue

2. **Structure your 20-30 minutes for maximum impact:**

   | Time | Activity | Purpose |
   |------|----------|---------|
   | 5 min | **Review** yesterday's vocabulary with flashcards (Anki) | Spaced repetition for retention |
   | 10 min | **New material** — next lesson in your course or textbook | Progressive learning |
   | 5-10 min | **Active production** — write 3-5 sentences or speak aloud | Forces recall, not just recognition |
   | 5 min | **Listen** to native content (Quran recitation for Arabic, podcast, etc.) | Trains ear and builds comprehension |

3. **Use the "never miss twice" rule.** If you miss one day, that is human. If you miss two consecutive days, the habit is dying. Your recovery protocol: do a bare-minimum 5-minute session on the second day, no matter what.

4. **Track your streak** using a habit tracker. The daily visual reinforcement of an unbroken chain is a powerful motivator.

5. **Make practice frictionless:**
   - Keep your textbook/app on the home screen or bedside table
   - Prepare tomorrow's practice materials tonight
   - Use your phone's language settings in your target language for passive immersion` },
        { title: 'Find a conversation partner or language exchange', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:13",
              arabic: "وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا",
              translation: "And We made you peoples and tribes that you may know one another.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: 'The divine intent for peoples to know one another grounds finding a conversation partner as the practical mechanism for achieving this mandated intercultural connection. [1-3]',
            },
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 3641",
              translation: "The Prophet (peace be upon him) said: \"He who goes out in search of knowledge is in the path of Allah until he returns.\"",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: 'The prophetic principle that seeking knowledge is a sacred path establishes finding a language partner as a merit-earning step on that divinely sanctioned journey.',
            },
          ],
          description: `**Why?**

You cannot reach intermediate level without speaking. Textbooks and apps build knowledge about a language; conversation builds the ability to use it in real time. A conversation partner provides the pressure and feedback loop that solo study cannot replicate. The scholars of Islam learned through mudhakara (mutual study and discussion), and language learning follows the same principle — it is inherently social.

**How?**

1. **Find a conversation partner through these channels:**

   | Channel | How It Works | Best For |
   |---------|-------------|---------|
   | **iTalki** | Book sessions with native-speaking tutors or find free language exchange partners | Structured practice with feedback |
   | **Tandem / HelloTalk** | Mobile apps that match you with native speakers for mutual language exchange | Casual, text and voice-based practice |
   | **Local masjid community** | Many masjids have Arabic-speaking members willing to help learners | Arabic practice in an Islamic environment |
   | **University language departments** | Language exchange boards, conversation clubs | Access to structured exchange programmes |
   | **Online Muslim communities** | Discord servers, Telegram groups for Arabic learners | Peer support and group practice |

2. **Structure your conversation sessions:**
   - Meet at least once per week (more is better)
   - Agree on a format: 15 minutes in your target language, 15 minutes in theirs (for exchanges)
   - Prepare 2-3 topics or questions before each session
   - Ask your partner to correct significant errors but not interrupt your flow for minor ones

3. **For Arabic learners — maximise your Islamic environment:**
   - Attend Arabic-medium halaqat (study circles) even if you only understand 30% at first
   - Listen to Arabic khutbahs and try to follow along
   - Make du'a in Arabic (beyond the memorised ones) — it trains spontaneous construction

4. **Overcome the fear of speaking poorly.** Making mistakes is not embarrassing — it is the mechanism by which your brain learns.

5. **Log your conversation sessions** — date, partner, topics covered, new words learned, and mistakes corrected. This log becomes a powerful study resource.` },
        { title: 'Set a 6-month milestone test to measure progress', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 20:114",
              arabic: "وَقُل رَّبِّ زِدْنِي عِلْمًا",
              translation: "And say, \"My Lord, increase me in knowledge.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: 'The command to seek increased knowledge in Quran 20:114 establishes milestone testing as the mandatory method for measuring and verifying that divinely prioritized growth.',
            },
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 2646",
              translation: "The Prophet (peace be upon him) said: \"Whoever pursues a path to gain knowledge, Allah will ease his way to Paradise.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: 'The prophetic principle that pursuing knowledge eases the way to Paradise establishes milestone testing as the essential method for measuring and verifying that rewarded journey.',
            },
          ],
          description: `**Why?**

Without a formal checkpoint, you will lack objective evidence of your progress. Self-perception in language learning is notoriously unreliable — you may feel stuck when you are actually improving, or feel confident when significant gaps remain. A milestone test at 6 months provides an honest, external measure that tells you whether your method is working and what to adjust.


**How?**

1. **Choose an appropriate test for your target language:**

   **For Arabic:**
   - **ALPT (Arabic Language Proficiency Test)** — standardised, widely recognised
   - **ACTFL OPI (Oral Proficiency Interview)** — for speaking ability
   - **Self-assessment against CEFR B1 descriptors** — practical if formal tests are not accessible
   - **Ask a qualified Arabic teacher to assess you** — personalised and immediate

   **For other languages:**
   - DELF (French), DELE (Spanish), HSK (Mandarin), JLPT (Japanese), TestDaF (German)
   - Many tests offer online practice versions you can take informally

2. **Schedule the test now.** Book it for a date approximately 6 months from when you started studying. Having a fixed date creates urgency and focus.

3. **Define your target score or level:**
   - Refer back to your "intermediate" definition from the first subtask
   - Set a specific, testable target: "CEFR B1" or "ALPT level 3" or "able to hold a 10-minute conversation on everyday topics with a native speaker"

4. **Create a preparation plan for the final month:**
   - Take a practice test at month 5 to identify weak areas
   - Focus the last 4 weeks on those weak areas specifically
   - Increase conversation practice frequency

5. **Regardless of the result:**
   - If you meet your target: celebrate, then set the next milestone (B2/advanced)
   - If you fall short: analyse where the gap is (listening? grammar? vocabulary?), adjust your method, and set a new test date 3 months later
   - The test is a diagnostic tool, not a judgement of your worth

6. **Record your results and reflections.** This data is invaluable for planning your next phase of language learning.` },
      ],
    },
    {
      title: 'Build a personal library — curate 50 essential books across faith, profession, and worldview',
      priority: 'low', tags: ['reading', 'curation'],
      description: 'A personal library is a physical manifestation of your intellectual priorities. Curating it intentionally across faith, profession, and worldview ensures you have depth in what matters and breadth to think across boundaries.',
      subtasks: [
        { title: 'List 15-20 essential Islamic books (tafsir, fiqh, seerah, spirituality)', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 41:41",
              arabic: "**Translation:** Verily, those who disbelieved in the Reminder (i.e. the Qur’ân) when it came to them (shall receive the punishment). And verily, it is an honourable well-fortified respected Book (because it is Allâh’s Speech, and He has protected it from corruption. (See V.15:9)",
              translation: "Verily, those who disbelieved in the Reminder (i.e. the Qur’ân) when it came to them (shall receive the punishment). And verily, it is an honourable well-fortified respected Book (because it is Allâh’s Speech, and He has protected it from corruption. (See V.15:9)",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: 'The principle that the Quran is an honourable and well-fortified Reminder establishes listing essential Islamic texts as the prerequisite for accessing its divinely preserved guidance..',
            },
            {
              kind: "quran",
              ref: "Quran 3:85",
              arabic: "**Translation:** If anyone desires a religion other than Islam (submission to Allah), never will it be accepted of him; and in the Hereafter He will be in the ranks of those who have lost (All spiritual good).",
              translation: "If anyone desires a religion other than Islam (submission to Allah), never will it be accepted of him; and in the Hereafter He will be in the ranks of those who have lost (All spiritual good).",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: 'The principle that only Islam is acceptable establishes listing essential books as mandatory for identifying the path to securing spiritual success in the Hereafter [1].',
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 3",
              translation: "Narrated 'Aisha (the mother of the faithful believers):The commencement of the Divine Inspiration to Allah's Messenger (ﷺ) was in the form of good dreams which came true like bright daylight, and then the love of seclusion was bestowed upon him. He used to go in seclusion in the cave of Hira where he used to worship (Allah alone) continuously for many days before his desire to see his family. He used to take with him the journey food for the stay and then come back to (his wife) Khadija to take his food likewise again till suddenly the Truth descended upon him while he was in the cave of Hira. The angel came to him and asked him to read. The Prophet (ﷺ) replied, \"I do not know how to read.\" The Prophet (ﷺ) added, \"The angel caught me (forcefully) and pressed me so hard that I could not bear it any more. He then released me and again asked me to read and I replied, 'I do not know how to read.' Thereupon he caught me again and pressed me a second time till I could not bear it any more. He then released me and again asked me to read but again I replied, 'I do not know how to read (or what shall I read)?' Thereupon he caught me for the third time and pressed me, and then released me and said, 'Read in the name of your Lord, who has created (all that exists), created man from a clot. Read! And your Lord is the Most Generous.\" (96.1, 96.2, 96.3) Then Allah's Messenger (ﷺ) returned with the Inspiration and with his heart beating severely. Then he went to Khadija bint Khuwailid and said, \"Cover me! Cover me!\" They covered him till his fear was over and after that he told her everything that had happened and said, \"I fear that something may happen to me.\" Khadija replied, \"Never! By Allah, Allah will never disgrace you. You keep good relations with your kith and kin, help the poor and the destitute, serve your guests generously and assist the deserving calamity-afflicted ones.\" Khadija then accompanied him to her cousin Waraqa bin Naufal bin Asad bin 'Abdul 'Uzza, who, during the pre-Islamic Period became a Christian and used to write the writing with Hebrew letters. He would write from the Gospel in Hebrew as much as Allah wished him to write. He was an old man and had lost his eyesight. Khadija said to Waraqa, \"Listen to the story of your nephew, O my cousin!\" Waraqa asked, \"O my nephew! What have you seen?\" Allah's Messenger (ﷺ) described whatever he had seen. Waraqa said, \"This is the same one who keeps the secrets (angel Gabriel) whom Allah had sent to Moses. I wish I were young and could live up to the time when your people would turn you out.\" Allah's Messenger (ﷺ) asked, \"Will they drive me out?\" Waraqa replied in the affirmative and said, \"Anyone (man) who came with something similar to what you have brought was treated with hostility; and if I should remain alive till the day when you will be turned out then I would support you strongly.\" But after a few days Waraqa died and the Divine Inspiration was also paused for a while",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: 'The command to "Read" in the first revelation establishes listing essential books as the mandatory path for identifying the sources of divinely prioritized knowledge. [1], [2], [3]',
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 3848",
              translation: "Narrated Abu As-Safar:I heard Ibn `Abbas saying, \"O people! Listen to what I say to you, and let me hear whatever you say, and don't go (without understanding), and start saying, 'Ibn `Abbas said so-and-so, Ibn `Abbas said so-and-so, Ibn `Abbas said so-and-so.' He who wants to perform the Tawaf around the Ka`ba should go behind Al-Hijr (i.e. a portion of the Ka`ba left out unroofed) and do not call it Al-Hatim, for in the pre-Islamic period of ignorance if any man took an oath, he used to throw his whip, shoes or bow in it",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: 'The mandate for genuine comprehension over blind transmission establishes listing essential books as the mandatory path for identifying the verified sources of religious knowledge. [1]',
            },
          ],
          description: `**Why?**

Your Islamic library is the intellectual foundation of your faith. Owning and engaging with essential Islamic texts means you are not dependent on whatever article or video algorithm serves you next — you have authoritative sources you can return to repeatedly. The scholars of Islam were known by their libraries; Imam al-Dhahabi described a scholar's books as "his best companions." A well-chosen Islamic library provides tafsir for understanding the Quran, fiqh for daily practice, seerah for prophetic guidance, and tasawwuf for spiritual refinement.


**How?**

1. **Cover these core categories (3-5 books each):**

   | Category | Purpose | Recommended Titles |
   |----------|---------|-------------------|
   | **Tafsir** | Understanding the Quran | *Tafsir Ibn Kathir* (abridged), *In the Shade of the Quran* (Qutb), *Ma'ariful Quran* (Mufti Shafi Usmani) |
   | **Hadith** | Prophetic guidance | *Riyad al-Salihin* (Nawawi), *40 Hadith Nawawi*, *Sahih al-Bukhari* (summarised edition) |
   | **Fiqh** | Worship and daily rulings | *Fiqh al-Sunnah* (Sayyid Sabiq), *The Reliance of the Traveller* (Shafi'i fiqh), your madhab's primary reference |
   | **Seerah** | Life of the Prophet (peace be upon him) | *The Sealed Nectar* (Mubarakpuri), *Muhammad: His Life Based on the Earliest Sources* (Martin Lings) |
   | **Spirituality/Tazkiyah** | Purification of the heart | *Purification of the Heart* (Hamza Yusuf), *Ihya Ulum al-Din* (al-Ghazali, abridged), *The Book of Assistance* (al-Haddad) |

2. **Seek recommendations from scholars you trust.** Ask your local imam, a teacher at your Islamic institute, or a knowledgeable community member: "If I could only own 15 Islamic books, what should they be?"

3. **Prioritise based on your current knowledge level:**
   - If you are a beginner: start with accessible, well-translated works
   - If you are intermediate: add classical texts with commentary
   - If you are advanced: add Arabic originals alongside translations

4. **Compile your list with a brief note on why each book is essential for your library.** This forces you to be intentional rather than impulse-buying.

5. **Do not aim for the most scholarly or impressive list.** Aim for books you will actually read, reference, and benefit from. An unread library is just decoration.` },
        { title: 'List 15-20 essential books in your professional domain', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 71",
              translation: "The Prophet (peace be upon him) said: \"When Allah wishes good for someone, He bestows upon him understanding of the religion.\" Professional knowledge that serves the ummah is also highly valued.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: 'The prophetic principle that religious understanding signifies divine favor establishes listing professional books as mandatory for attaining specialized knowledge that serves the Ummah’s welfare. [1]',
            },
          ],
          description: `**Why?**

Professional excellence (itqan) requires deep knowledge of your field. A curated professional library means you own the foundational and cutting-edge texts that define best practice, not just whatever your employer provided during onboarding. These are the books you will return to throughout your career — the ones that shaped how you think about your work. Owning them physically also makes them available for quick reference when you need to solve a problem or mentor someone.


**How?**

1. **Identify the categories within your professional domain:**
   - **Foundational theory** — the classic texts that define your field
   - **Practical skills** — how-to books on core competencies
   - **Industry analysis** — books that explain the landscape and trends
   - **Adjacent disciplines** — related fields that inform your work
   - **Biographies of masters** — the stories of people who excelled in your field

2. **Research recommendations from multiple sources:**
   - "Best books for [your profession]" lists from respected industry figures
   - University course reading lists for your field
   - Recommendations from the most competent practitioners you know
   - Professional association reading lists
   - Ask: "Which book changed how you think about [your work]?"

3. **Apply a quality filter to each candidate:**
   - Is the author a recognised practitioner or researcher (not just a content marketer)?
   - Is the book still relevant (check publication date for fast-moving fields)?
   - Do multiple respected people recommend it?
   - Does it teach principles (long-lasting) or just tactics (quickly outdated)?

4. **Compile your list:**

   | # | Title | Author | Category | Why Essential |
   |---|-------|--------|----------|--------------|
   | 1 | [Title] | [Author] | Foundational | [Brief reason] |
   | 2 | ... | ... | ... | ... |

5. **Include at least 2-3 books that challenge mainstream thinking in your field.** A professional library that only reinforces consensus thinking will not help you innovate or think independently.` },
        { title: 'List 10-15 books on worldview, history, philosophy, or science', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:190-191",
              arabic: "إِنَّ فِي خَلْقِ السَّمَاوَاتِ وَالْأَرْضِ وَاخْتِلَافِ اللَّيْلِ وَالنَّهَارِ لَآيَاتٍ لِّأُولِي الْأَلْبَابِ",
              translation: "Indeed, in the creation of the heavens and the earth and the alternation of the night and the day are signs for those of understanding — who remember Allah while standing, sitting, and on their sides, and reflect upon the creation of the heavens and the earth.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: 'The command to reflect upon creation establishes listing books on science and history as mandatory for identifying signs of Allah’s wisdom within the universe [1, 2].',
            },
          ],
          description: `**Why?**

A person who only reads within their faith and profession becomes intellectually narrow — unable to engage with the broader world, understand different perspectives, or connect ideas across domains. The Quran commands reflection on history, nature, and human societies. The golden age of Islamic civilisation was defined by scholars who engaged with Greek philosophy, Indian mathematics, Persian literature, and Chinese technology. Your worldview shelf ensures you maintain that tradition of intellectual breadth.


**How?**

1. **Cover at least 4 of these categories:**

   | Category | Purpose | Starting Recommendations |
   |----------|---------|------------------------|
   | **World History** | Understand patterns of civilisation | *A History of the World in Six Glasses* (Standage), *Sapiens* (Harari — read critically), *The Muqaddimah* (Ibn Khaldun) |
   | **Islamic Civilisation** | Know your own heritage | *Lost Islamic History* (Hathaway), *1001 Inventions*, *The House of Wisdom* (al-Khalili) |
   | **Philosophy and Ethics** | Sharpen reasoning and moral thinking | *Justice* (Sandel), *The Nicomachean Ethics* (Aristotle), *Al-Ghazali's Deliverance from Error* |
   | **Science and Nature** | Fulfil the Quranic command to reflect on creation | *A Short History of Nearly Everything* (Bryson), *The Gene* (Mukherjee), *Cosmos* (Sagan) |
   | **Economics and Society** | Understand the systems that shape human life | *Thinking, Fast and Slow* (Kahneman), *Small is Beautiful* (Schumacher), *The Road to Serfdom* (Hayek) |
   | **Psychology** | Understand the human self (nafs) | *Thinking, Fast and Slow* (Kahneman), *Man's Search for Meaning* (Frankl), *The Body Keeps the Score* (van der Kolk) |

2. **Apply the Islamic intellectual filter:**
   - For each book, consider: does this challenge, complement, or contradict Islamic teachings?
   - Read with critical engagement, not passive absorption
   - Include at least 3-4 books by Muslim authors to ensure your worldview shelf is not exclusively Western

3. **Prioritise books that have stood the test of time.** "Classics" become classics because their insights remain relevant across generations. A 50-year-old book that is still recommended is a safer bet than this year's bestseller.

4. **Compile your list with the same format as your other categories.** Aim for a mix of accessible reads and more demanding texts.` },
        { title: 'Acquire and shelve the books you don\'t yet own', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 96:1-5",
              arabic: "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ ۚ خَلَقَ الْإِنسَانَ مِنْ عَلَقٍ ۚ اقْرَأْ وَرَبُّكَ الْأَكْرَمُ ۚ الَّذِي عَلَّمَ بِالْقَلَمِ ۚ عَلَّمَ الْإِنسَانَ مَا لَمْ يَعْلَمْ",
              translation: "Read in the name of your Lord who created — created man from a clinging substance. Read, and your Lord is the Most Generous — who taught by the pen — taught man that which he knew not.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: 'The command to read establishes acquiring books as the mandatory path for securing the knowledge that Allah graciously taught mankind by the pen. [1-3]',
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (peace be upon him) said: \"Whoever takes a path in search of knowledge, Allah will make easy for him a path to Paradise.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: 'The prophetic principle that seeking knowledge eases the path to Paradise grounds acquiring books as the mandatory path for securing that prioritized spiritual reward. [1]',
            },
          ],
          description: `**Why?**

A list of books you intend to buy "someday" is not a library — it is a wish list. Physical (or digital) ownership creates accessibility: when you need to reference a concept, check a ruling, or lend a book to a friend, it is there. The act of acquiring and organising your books also creates a sense of commitment — you have invested in your intellectual development, and the visible presence of these books reminds you daily of that investment.


**How?**

1. **Consolidate your three lists** into a single master list (45-55 books) and mark which ones you already own.

2. **Prioritise acquisitions by urgency and cost:**
   - **Tier 1 (acquire first):** Books you need for current study, learning plans, or reference — buy these within the first month
   - **Tier 2 (acquire next):** Books on your 12-month reading list — buy 2-3 months ahead of when you plan to read them
   - **Tier 3 (acquire over time):** Reference works you will use periodically — acquire as budget allows

3. **Source books cost-effectively:**
   - **Used bookshops and charity shops** — Islamic bookshops often have excellent used sections
   - **Online second-hand** (Thriftbooks, AbeBooks, eBay) — significant savings on used copies
   - **Library book sales** — extraordinary value, often 50p-$2 per book
   - **Digital alternatives** (Kindle, PDF, free Islamic texts online) — when physical ownership is not essential
   - **Islamic bookshops** (Dar-us-Salam, IIPH, Kube Publishing) — for Islamic texts specifically
   - **Set a monthly book budget** (even a small amount like 10-20 adds up over a year)

4. **Organise your shelves intentionally:**
   - Group by category: Islamic, Professional, Worldview
   - Within categories, order by priority or reading sequence
   - Keep your "currently reading" and "next up" books in a visible, accessible spot
   - A well-organised shelf invites browsing; a cluttered shelf discourages it

5. **A library is alive, not static.** As you grow, you will add new books and may remove ones that no longer serve you. Review and curate annually.` },
        { title: 'Create a reading order that alternates between categories', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:269",
              arabic: "يُؤْتِي الْحِكْمَةَ مَن يَشَاءُ ۚ وَمَن يُؤْتَ الْحِكْمَةَ فَقَدْ أُوتِيَ خَيْرًا كَثِيرًا",
              translation: "He gives wisdom to whom He wills, and whoever has been given wisdom has certainly been given much good.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: 'The divine principle that wisdom signifies supreme good establishes alternating reading categories as mandatory for synthesizing the diverse knowledge required to attain that spiritual insight. [1, 2]',
            },
            {
              kind: "hadith",
              ref: "Sunan Ibn Majah 224",
              translation: "The Messenger of Allah (peace be upon him) said: \"Seeking knowledge is an obligation upon every Muslim.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: 'The prophetic principle that seeking knowledge is an obligation establishes alternating reading categories as mandatory for securing the diverse proficiency required for spiritual success.',
            },
          ],
          description: `**Why?**

Reading three Islamic books in a row, then five professional books, then four worldview books defeats the purpose of a diverse library. Alternating between categories creates the cross-pollination effect that produces insight — you will find that a concept from psychology illuminates a Quranic teaching, or a historical pattern explains a professional challenge. This interleaving effect is also supported by learning science: mixing topics during study improves long-term retention and transfer compared to blocking by subject.


**How?**

1. **Use a simple rotation pattern:**
   - Book 1: Islamic
   - Book 2: Professional
   - Book 3: Worldview
   - Book 4: Islamic
   - Book 5: Professional
   - Book 6: Worldview
   - (Repeat)

   This ensures no category dominates and each is refreshed regularly.

2. **Within each category, alternate between difficulty levels:**
   - Follow a dense, demanding book with a lighter, more narrative one
   - This prevents burnout from consecutive difficult reads
   - Example: *Muqaddimah* (demanding) → *The Sealed Nectar* (narrative) → *Thinking, Fast and Slow* (moderate)

3. **Create your sequenced reading list:**

   | # | Title | Category | Difficulty | Est. Reading Time |
   |---|-------|----------|-----------|------------------|
   | 1 | [Title] | Islamic | Light | 2 weeks |
   | 2 | [Title] | Professional | Moderate | 3 weeks |
   | 3 | [Title] | Worldview | Demanding | 4 weeks |
   | 4 | [Title] | Islamic | Moderate | 3 weeks |
   | ... | ... | ... | ... | ... |

4. **Allow flexibility within the structure.** If a professional deadline demands you read a work-related book out of order, do so — then return to the rotation. The pattern is a guide, not a cage.

5. **Review and adjust the sequence every quarter.** Your interests, needs, and pace will evolve. Update the reading order to reflect your current priorities while maintaining category balance.

6. **Track your progress visually.** A spreadsheet or reading journal showing categories covered ensures you are maintaining breadth, not unconsciously gravitating toward your favourite subject.` },
      ],
    },
  ],

  intellect_learning_excellence: [
    {
      title: 'Author an original piece of work — article, paper, book, or curriculum',
      priority: 'medium', tags: ['writing', 'legacy'],
      description: 'The scholars of Islam preserved and advanced knowledge by writing. Authoring original work forces you to synthesise what you know, fill gaps in your understanding, and contribute something lasting. It is one of the highest forms of sadaqah jariyah for the intellect.',
      subtasks: [
        { title: 'Choose your topic and define the thesis or central argument', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 55:1-4",
              arabic: "الرَّحْمَٰنُ * عَلَّمَ الْقُرْآنَ * خَلَقَ الْإِنسَانَ * عَلَّمَهُ الْبَيَانَ",
              translation: "The Most Merciful, taught the Quran, created man, and taught him eloquence.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: 'The principle that Allah granted man eloquence establishes defining a thesis as the mandatory application of lucidity to communicate divinely taught knowledge with precision. [1]',
            },
          ],
          description: `**Why?**

Writing without a clear thesis is meandering, not authoring. The thesis is the backbone of any original work — it is the specific claim, argument, or contribution you are making to the conversation. Islamic scholars always wrote with a clear maqsad (purpose): Imam al-Nawawi wrote *Riyad al-Salihin* to compile the most beneficial ahadith for daily practice; Ibn Khaldun wrote *The Muqaddimah* to establish a science of civilisation. Your work needs the same clarity of purpose before a single paragraph is written.


**How?**

1. **Identify your topic area by asking:**
   - What do I know deeply enough to contribute something original?
   - What gap exists in the current literature, resources, or discourse?
   - What question do people in my field or community repeatedly ask that no one has answered well?
   - What intersection of knowledge (e.g., Islamic ethics + technology, seerah + leadership) am I uniquely positioned to address?

2. **Narrow from topic to thesis.** A topic is a field; a thesis is a specific claim within it:
   - **Topic:** Islamic financial literacy for young Muslims
   - **Thesis:** "Muslim millennials avoid Islamic finance products not due to lack of faith but due to poor financial literacy and confusing terminology — a redesigned educational approach focusing on practical application before theory can close this gap"

3. **Test your thesis with three questions:**
   - Is this arguable? (If everyone already agrees, it is not a thesis)
   - Is this supportable? (Can I provide evidence, examples, or reasoning?)
   - Is this valuable? (Will someone's thinking or behaviour change if they accept this?)

4. **Write a one-paragraph thesis statement** that captures: your claim, why it matters, and who it serves. This paragraph becomes the compass for everything you write.

5. **Seek early feedback.** Share your thesis statement with 2-3 knowledgeable people before investing in the full draft. Their reactions will reveal whether your thesis is clear, interesting, and viable.` },
        { title: 'Create a detailed outline with sections and key points', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (peace be upon him) said: \"Whoever takes a path in search of knowledge, Allah will make easy for him the path to Paradise.\" Structuring knowledge through writing is among the highest forms of this path.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: 'The prophetic principle that seeking knowledge eases the path to Paradise grounds detailed outlines as the mandatory method for structuring and mastering prioritized written insights.',
            },
          ],
          description: `**Why?**

An outline is architectural planning for your writing. Just as a building constructed without blueprints risks structural failure, a piece of writing without an outline risks incoherence, redundancy, and missing arguments. The outline allows you to see the entire logical structure of your work before you invest hours in drafting prose. It is also the stage where structural problems are cheapest to fix — rearranging bullet points takes seconds; rearranging finished paragraphs takes hours.


**How?**

1. **Start with the macro structure.** Most non-fiction follows one of these patterns:

   | Structure | Best For |
   |-----------|---------|
   | **Problem → Analysis → Solution** | Articles, white papers, practical guides |
   | **Thesis → Evidence → Counter-arguments → Conclusion** | Academic papers, opinion pieces |
   | **Chronological narrative** | Seerah-based works, case studies, historical analysis |
   | **Modular/thematic** | Curricula, textbooks, reference works |

2. **Build the outline in layers:**

   **Layer 1 — Major sections (5-8):**
   - Introduction (hook, context, thesis)
   - Section 1: [Topic]
   - Section 2: [Topic]
   - Section 3: [Topic]
   - Conclusion (synthesis, call to action)

   **Layer 2 — Key points within each section (3-5 per section):**
   - Section 1: [Topic]
     - Point A: [Specific argument or evidence]
     - Point B: [Supporting idea]
     - Point C: [Example or case study]

   **Layer 3 — Supporting details:**
   - Sources to cite, data to reference, stories to tell, Quranic ayahs or ahadith to include

3. **Check the logical flow.** Read through your outline and ask:
   - Does each section follow naturally from the previous one?
   - Could a reader skip any section and still understand the argument? (If yes, that section may be unnecessary)
   - Is my strongest evidence placed where it will have the most impact?

4. **Estimate the length of each section.** This gives you a realistic sense of the total project size and helps you allocate writing time.

5. **Share the outline for feedback** before drafting. An outline is easy for reviewers to assess quickly, and their feedback at this stage prevents major rewrites later.` },
        { title: 'Write the first draft without editing — get the ideas down', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 96:3-5",
              arabic: "اقْرَأْ وَرَبُّكَ الْأَكْرَمُ ۚ الَّذِي عَلَّمَ بِالْقَلَمِ ۚ عَلَّمَ الْإِنسَانَ مَا لَمْ يَعْلَمْ",
              translation: "Read, and your Lord is the Most Generous — who taught by the pen — taught man that which he knew not.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: 'The principle that Allah taught by the pen establishes drafting as the mandatory method for capturing the prioritized, divinely-taught knowledge He graciously bestows mankind. [1]',
            },
            {
              kind: "quran",
              ref: "Quran 55:1-4",
              arabic: "الرَّحْمَٰنُ ۚ عَلَّمَ الْقُرْآنَ ۚ خَلَقَ الْإِنسَانَ ۚ عَلَّمَهُ الْبَيَانَ",
              translation: "The Most Merciful — taught the Quran — created man — taught him eloquence.",
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

Perfectionism kills more books, articles, and papers than lack of talent ever will. The first draft exists to capture your thinking — it is supposed to be rough, incomplete, and imperfect. Trying to write and edit simultaneously engages two conflicting mental processes (creation and criticism) that slow each other down. Separating them — writing first, editing later — is how every productive author works. Imam al-Ghazali reportedly wrote prolifically and revised afterwards; the initial outpouring of ideas came first.


**How?**

1. **Set a daily writing target.** Choose one:
   - **Word count:** 500-1000 words per day (a 5000-word article takes 5-10 days)
   - **Time-based:** 45-60 minutes of uninterrupted writing per session
   - **Section-based:** Complete one outline section per sitting

2. **Follow these first-draft rules strictly:**
   - **Do not edit as you write.** Resist the urge to fix sentences, restructure paragraphs, or perfect word choices. Mark problems with [FIX LATER] and keep moving.
   - **Do not research mid-sentence.** If you need a source or fact, write [NEED SOURCE] and continue. Research breaks destroy writing flow.
   - **Follow your outline, not your mood.** Write the sections in order (or whatever order feels most natural), but complete the full draft before going back.
   - **Write badly on purpose if needed.** A bad first draft that exists is infinitely more valuable than a perfect draft that does not.

3. **Create a writing ritual:**
   - Same time each day
   - Same location
   - Begin with bismillah and a brief du'a for clarity
   - Turn off notifications and internet (if not needed for writing)
   - Set a timer and write until it rings

4. **Track your progress:**

   | Date | Section | Words Written | Notes |
   |------|---------|--------------|-------|
   | [Date] | Introduction | 750 | Struggled with opening hook |
   | [Date] | Section 1 | 1200 | Good flow |

5. **When the draft is complete, step away for at least 48 hours.** Do not read it immediately. Distance creates the objectivity you need for effective editing.` },
        { title: 'Seek feedback from at least two knowledgeable reviewers', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:6",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا إِن جَاءَكُمْ فَاسِقٌ بِنَبَإٍ فَتَبَيَّنُوا",
              translation: "O you who have believed, if there comes to you a disobedient one with information, investigate.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

You are too close to your own work to see its flaws. Blind spots in argument, unclear explanations, and assumptions that only you hold are invisible to the author but obvious to a reader. The Islamic tradition of peer review predates the modern academic system — scholars presented their work to other scholars (mudhakara, munazara) before publishing. Two reviewers is the minimum because individual perspectives are biased; two readers reveal patterns in what is confusing or unconvincing.


**How?**

1. **Choose your reviewers carefully.** You need two types:

   | Reviewer Type | What They Catch | Who to Ask |
   |--------------|----------------|-----------|
   | **Subject expert** | Factual errors, weak arguments, missing evidence, theological inaccuracies | A scholar, practitioner, or researcher in your topic area |
   | **Target audience member** | Clarity issues, pacing problems, sections that lose engagement, jargon that confuses | Someone who represents your intended reader (not an expert, but interested) |

2. **Prepare your reviewers with clear guidance:**
   - "This is a [type of work] intended for [audience] about [topic]"
   - "I would especially value your feedback on: [2-3 specific areas of concern]"
   - "Please be honest — I need critical feedback, not encouragement"
   - Give them a reasonable timeline (2-3 weeks for a long piece, 1 week for a short article)

3. **Provide the draft in an editable format** (Google Docs with commenting enabled is ideal). This reduces friction for the reviewer and gives you inline feedback.

4. **When you receive feedback:**
   - Read all feedback before reacting to any of it
   - Separate emotional reactions from substantive criticism — if feedback stings, it is probably hitting something important
   - Look for patterns: if both reviewers flag the same issue, it is almost certainly real
   - You do not have to accept every suggestion, but you should understand and consider each one

5. **Thank your reviewers generously.** Their time is a gift. Acknowledge them in the published work and offer to reciprocate when they have their own projects.` },
        { title: 'Revise and publish through an appropriate channel', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 1017",
              translation: "The Prophet (peace be upon him) said: \"Whoever introduces a good practice in Islam will have its reward and the reward of those who act upon it after him, without diminishing their rewards in the least.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A work that remains unpublished benefits no one but you. Publishing — whether through a blog, journal, community platform, or traditional publisher — transforms your personal synthesis into a public contribution. This is sadaqah jariyah of the highest intellectual order: if even one person benefits from your work, you receive reward for it long after you have moved on.

**How?**

1. **Revise systematically (not randomly):**

   **Pass 1: Structural revision**
   - Does the overall argument flow logically?
   - Are any sections misplaced, redundant, or missing?
   - Does the introduction promise what the conclusion delivers?

   **Pass 2: Content revision**
   - Address all reviewer feedback
   - Verify all facts, sources, and citations
   - Strengthen weak arguments with additional evidence
   - Remove tangents that do not serve the thesis

   **Pass 3: Line editing**
   - Tighten sentences — cut unnecessary words
   - Vary sentence length and structure
   - Ensure consistent terminology and tone
   - Check all Quranic references and hadith citations for accuracy

   **Pass 4: Proofreading**
   - Spelling, grammar, punctuation
   - Formatting consistency (headings, lists, citations)
   - Read aloud to catch awkward phrasing

2. **Choose your publishing channel based on your goals:**

   | Channel | Best For | Reach | Barrier to Entry |
   |---------|---------|-------|-----------------|
   | **Personal blog/website** | Full control, building your platform | Low initially, grows over time | None |
   | **Medium or Substack** | Built-in audience, easy formatting | Medium | None |
   | **Academic journal** | Scholarly credibility, formal contribution | Niche but high-value | Peer review process |
   | **Community publication** | Serving your immediate audience | Targeted | Usually low |
   | **Book publisher** | Maximum reach and authority | Potentially wide | Proposal and acceptance |
   | **Islamic publication** | Serving the Muslim community | Targeted and engaged | Varies by publisher |

3. **Format for your chosen channel.** Each platform has specific requirements (word count, style, formatting). Adapt your work accordingly.

4. **Promote thoughtfully.** Share your published work with your network, study circles, and relevant communities. Do not be shy about this — distributing beneficial knowledge is part of the obligation.

5. **Receive public feedback with grace.** Not everyone will agree. Engage with constructive criticism; ignore trolls; update your work if someone identifies a genuine error.` },
      ],
    },
    {
      title: 'Mentor at least one student or younger person in your area of expertise',
      priority: 'medium', tags: ['mentorship', 'legacy'],
      description: 'The Prophet (peace be upon him) invested deeply in developing the next generation. Mentorship is how knowledge survives beyond your lifetime. Teaching also deepens your own mastery — you do not truly understand something until you can explain it to another.',
      subtasks: [
        { title: 'Identify a mentee — someone eager to learn in your area of strength', done: false,
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
              ref: "Jami at-Tirmidhi 2685",
              translation: "The Prophet (peace be upon him) said: \"The best of you is the one who learns the Quran and teaches it.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Not every student is ready for mentorship, and not every willing person is the right match for your expertise. Choosing your mentee carefully ensures that your time investment produces real growth. The Prophet (peace be upon him) invested differently in different companions based on their strengths and readiness — Abu Bakr received different guidance than Khalid ibn al-Walid. A well-chosen mentee amplifies your impact; a poorly matched one creates frustration for both parties.


**How?**

1. **Define what you can teach.** Before looking for a mentee, be clear about:
   - Your specific area of strength (not a vague "I can help with career stuff" — something concrete like "software architecture," "Islamic finance basics," or "academic writing")
   - The level you can mentor to (beginner to intermediate? intermediate to advanced?)
   - The time you can realistically commit (be honest — overpromising helps no one)

2. **Look for mentees in your existing networks:**
   - Younger colleagues at work
   - Students at your masjid or Islamic institute
   - Junior professionals in your industry community
   - Family members entering your field
   - Attendees of talks or workshops you have given

3. **Evaluate potential mentees on these criteria:**

   | Criterion | What to Look For |
   |-----------|-----------------|
   | **Eagerness** | Do they ask questions? Do they follow through when given resources? |
   | **Humility** | Are they open to correction and feedback? |
   | **Commitment** | Will they show up consistently, or are they casually interested? |
   | **Alignment** | Is what they want to learn what you can teach? |
   | **Character** | Do they demonstrate basic adab (manners) and integrity? |

4. **Start with a low-commitment trial.** Offer one or two informal sessions before committing to a formal arrangement. This lets both sides assess the fit.

5. **Choose one mentee to start.** You can expand later, but beginning with one person allows you to give full attention and develop your mentoring approach.` },
        { title: 'Establish a regular meeting cadence (weekly or biweekly)', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 103:3",
              arabic: "إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ",
              translation: "Except for those who have believed and done righteous deeds and advised each other to truth and advised each other to patience.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2674",
              translation: "The Prophet (peace be upon him) said: \"Whoever guides someone to good will have a reward like that of the one who does it.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Mentorship without regular meetings is just occasional advice — it lacks the continuity and progressive development that transforms a student. A fixed cadence creates rhythm and expectation: your mentee prepares because they know you are meeting on Thursday, and you stay engaged because the next session is always approaching. The Prophet's (peace be upon him) teaching circles were regular and predictable — the companions knew when and where to find him.


**How?**

1. **Choose a cadence that works for both parties:**

   | Cadence | Best For | Typical Session Length |
   |---------|---------|---------------------|
   | **Weekly** | Active skill-building, hands-on mentoring, early-stage mentees | 30-60 minutes |
   | **Biweekly** | Ongoing guidance, more experienced mentees, when schedules are tight | 45-90 minutes |
   | **Monthly** | Senior mentees who need strategic guidance, not tactical | 60-90 minutes |

2. **Set a recurring calendar event.** Same day, same time, every week (or every other week). Treating it as a fixed appointment rather than "we will find a time" is the difference between a mentorship that lasts and one that fizzles after month two.

3. **Choose a format:**
   - **In-person** (preferred when possible) — deeper connection, easier to demonstrate
   - **Video call** — good for remote mentees, preserves face-to-face interaction
   - **Phone call** — acceptable for check-ins, less ideal for primary sessions
   - **Hybrid** — alternate between in-person deep sessions and virtual check-ins

4. **Establish a basic session structure:**
   - **Check-in (5 min):** How has the week/fortnight gone? Any wins or struggles?
   - **Review (10-15 min):** What progress was made on the assigned task or learning goal?
   - **Teaching/Discussion (20-30 min):** New concept, skill demonstration, or problem-solving
   - **Assignment (5 min):** What should the mentee work on before next session?

5. **Communicate expectations clearly from the start:**
   - "I expect you to show up prepared and on time"
   - "If you need to reschedule, give me 24 hours notice"
   - "I will provide honest feedback — that is the most respectful thing I can do for you"
   - "This is a two-way commitment — I am investing my time because I believe in your potential"` },
        { title: 'Define clear learning goals together for a 3-6 month period', done: false,
          sources: [
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
              ref: "Jami at-Tirmidhi 2685",
              translation: "The Prophet (peace be upon him) said: \"The best of you is the one who learns the Quran and teaches it.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Mentorship without goals is just a pleasant conversation. Defined goals give the relationship direction, enable progress measurement, and provide both mentor and mentee with a shared understanding of success. When the Prophet (peace be upon him) assigned Mu'adh ibn Jabal to Yemen, he gave him clear priorities — what to teach first, second, and third. Your mentee deserves the same clarity about where this mentorship is heading.


**How?**

1. **Conduct a collaborative goal-setting session.** This should happen in your first or second meeting. Ask your mentee:
   - "Where are you now in [skill/knowledge area]?"
   - "Where do you want to be in 3-6 months?"
   - "What would success look like — what would you be able to do that you cannot do now?"
   - "What obstacles do you foresee?"

2. **Define 3-5 SMART goals together:**

   | # | Goal | Measurable Outcome | Timeline |
   |---|------|-------------------|----------|
   | 1 | [Specific skill or knowledge area] | [What they can demonstrate] | By month [X] |
   | 2 | [Next goal] | [Observable outcome] | By month [X] |
   | 3 | [Next goal] | [Observable outcome] | By month [X] |

   Example:
   | # | Goal | Measurable Outcome | Timeline |
   |---|------|-------------------|----------|
   | 1 | Master basic Python programming | Build a functional data analysis script independently | By month 2 |
   | 2 | Learn project management fundamentals | Lead a small project at work using a structured methodology | By month 4 |
   | 3 | Develop professional presentation skills | Deliver a 15-minute presentation to the team with confidence | By month 6 |

3. **Break each goal into monthly milestones.** This creates natural check-in points and prevents the "we have 6 months so there is no rush" trap.

4. **Write the goals down and share a copy with your mentee.** This document becomes your mentoring "contract" — something both of you refer back to in every session.

5. **Build in a mid-point review (at the 3-month mark for 6-month goals):**
   - Are we on track?
   - Do any goals need to be adjusted (more ambitious or more realistic)?
   - Have new priorities emerged that should be incorporated?` },
        { title: 'Share resources, provide feedback on their work, and challenge them', done: false,
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
              ref: "Sahih Muslim 2674",
              translation: "The Prophet (peace be upon him) said: \"Whoever guides someone to good will have a reward like that of the one who does it.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A mentor who only provides encouragement without challenge is a cheerleader, not a teacher. Growth happens at the edge of comfort — when a mentee is stretched beyond what they thought they could do, given honest feedback on where they fell short, and pointed toward resources that deepen their understanding. The Prophet (peace be upon him) challenged his companions: he asked them difficult questions, corrected them when they erred, and pushed them to take on responsibilities they felt unready for. This is the essence of transformative mentorship.


**How?**

1. **Share resources strategically (not excessively):**
   - Curate 1-2 resources per session maximum — a book chapter, an article, a video, or a tool
   - Choose resources that directly serve the current learning goal
   - Explain WHY you are sharing each resource: "This article explains the concept we discussed — read it before next week"
   - Avoid overwhelming your mentee with a reading list they will never complete

2. **Provide feedback using the SBI framework:**
   - **Situation:** "In the presentation you gave last week..."
   - **Behaviour:** "...you read directly from your slides instead of speaking naturally..."
   - **Impact:** "...which made the audience disengage during the technical section."
   - Follow with a constructive suggestion: "Try reducing your slides to key phrases and practising your delivery from memory."

3. **Challenge them with stretch assignments:**
   - Ask them to teach you something they just learned (the ultimate test of understanding)
   - Give them a problem slightly beyond their current level and support them through it
   - Encourage them to present their work publicly (even to a small group)
   - Assign real-world application tasks, not just theoretical exercises

4. **Balance challenge with support:**

   | When They Succeed | When They Struggle |
   |-------------------|-------------------|
   | Acknowledge specifically what they did well | Normalise the struggle — "This is hard, and that is the point" |
   | Raise the bar: "Now try this harder version" | Break the problem into smaller pieces |
   | Connect their success to their growth: "Remember when this seemed impossible?" | Share your own story of struggling with the same concept |

5. **Keep a mentoring log.** After each session, note: what you covered, what feedback you gave, what was assigned, and what you observed about their progress. This log makes your feedback in future sessions more precise and personalised.` },
        { title: 'Review progress at the end of the period and set next steps', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:269",
              arabic: "يُؤْتِي الْحِكْمَةَ مَن يَشَاءُ ۚ وَمَن يُؤْتَ الْحِكْمَةَ فَقَدْ أُوتِيَ خَيْرًا كَثِيرًا",
              translation: "He gives wisdom to whom He wills, and whoever has been given wisdom has certainly been given much good.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 3641",
              translation: "The Prophet (peace be upon him) said: \"He who goes out in search of knowledge is in the path of Allah until he returns.\"",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A mentorship without a formal review is a relationship that drifts rather than concludes. The end-of-period review serves multiple purposes: it celebrates genuine growth (which your mentee may not recognise without your mirror), it honestly acknowledges where goals were not met, and it creates a conscious transition point — either to a new phase of mentorship with new goals, or to a graceful conclusion with clear next steps for the mentee's continued development.


**How?**

1. **Schedule a dedicated review session** (longer than a regular meeting — 60-90 minutes). This is not a casual check-in; it is a formal assessment and planning conversation.

2. **Prepare a progress assessment before the meeting:**

   | Goal | Target Outcome | Actual Outcome | Rating | Notes |
   |------|---------------|---------------|--------|-------|
   | [Goal 1] | [What was planned] | [What was achieved] | Met / Partially Met / Not Met | [Context] |
   | [Goal 2] | ... | ... | ... | ... |

3. **Structure the review conversation:**

   **Part 1: Reflection (20 min)**
   - Ask the mentee to self-assess first: "How do you think you did against our goals?"
   - Share your assessment — affirm where you agree, gently correct where you differ
   - Highlight growth they may not see: "When we started, you couldn't [X]. Now you [Y]."

   **Part 2: Honest evaluation (15 min)**
   - What worked well in our mentoring approach?
   - What should we have done differently?
   - Were the goals the right ones, or should we have focused elsewhere?

   **Part 3: Next steps (20 min)**
   - **If continuing:** Set new 3-6 month goals based on what was learned
   - **If concluding:** Define the mentee's independent development plan
   - Identify resources, communities, or next mentors they should connect with

4. **Document the review.** Write a brief summary of the assessment, mutual feedback, and agreed next steps. Share it with your mentee.

5. **Express genuine gratitude.** Thank your mentee for their commitment and trust. Mentoring is a two-way gift — they gave you the opportunity to teach, which deepened your own understanding and earned you reward with Allah.

6. **Make du'a for them.** The du'a of a teacher for their student carries special weight. Ask Allah to bless their knowledge, make it beneficial, and use them for good.` },
      ],
    },
    {
      title: 'Develop and publish a structured learning pathway or curriculum in your field',
      priority: 'low', tags: ['teaching', 'contribution'],
      description: 'Creating a curriculum is an act of intellectual stewardship — you distil years of experience into a pathway others can follow. This compounds your impact far beyond what one-on-one mentorship alone can achieve.',
      subtasks: [
        { title: 'Define the target audience and their starting knowledge level', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:104",
              arabic: "وَلْتَكُن مِّنكُمْ أُمَّةٌ يَدْعُونَ إِلَى الْخَيْرِ",
              translation: "And let there be arising from you a nation inviting to all that is good.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A curriculum designed for "everyone" serves no one. The most effective educational pathways are built around a specific learner with a specific starting point. If you assume too much prior knowledge, beginners will be lost by module two. If you assume too little, experienced learners will be bored and drop out. The Islamic educational tradition has always been sensitive to levels — scholars teach different texts to students at different stages (mubtadi, mutawassit, muntahi). Your curriculum needs the same precision.


**How?**

1. **Create a detailed learner profile:**

   | Attribute | Description |
   |-----------|------------|
   | **Who are they?** | Demographics, role, and context (e.g., "Early-career Muslim software developers in the UK") |
   | **What do they already know?** | Specific prerequisite knowledge you can assume |
   | **What do they NOT know?** | The gaps your curriculum will fill |
   | **Why are they learning this?** | Career advancement, personal growth, community service, religious obligation |
   | **How will they learn?** | Self-paced online, cohort-based, in-person, hybrid |
   | **What constraints do they have?** | Time (full-time workers vs. students), budget, language, technology access |

2. **Define the entry requirements explicitly:**
   - "To begin this pathway, you should already be able to: [list of specific competencies]"
   - "This pathway is NOT suitable if you: [list of disqualifying conditions]"
   - This prevents frustration for both the learner and you as the curriculum designer

3. **Validate your assumptions.** Interview 3-5 people who match your target profile:
   - "What do you already know about [topic]?"
   - "What have you tried before? What worked? What did not?"
   - "What would you most want to be able to do after completing a programme like this?"
   - Their answers will correct your assumptions and surface needs you had not considered

4. **Write a one-paragraph audience statement** that you reference throughout the curriculum design process. Example:
   > "This curriculum is designed for Muslim professionals with 2-5 years of work experience who want to develop leadership skills grounded in prophetic principles. Learners should have a basic understanding of Islamic ethics and be currently in or aspiring to management roles. No prior formal leadership training is assumed."` },
        { title: 'Map the learning outcomes — what should a graduate of this pathway be able to do?', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 80:12",
              arabic: "**Translation:** from which those who wish to be taught should learn,",
              translation: "from which those who wish to be taught should learn,",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2699a",
              translation: "The Prophet (peace be upon him) said: \"He who treads the path in search of knowledge, Allah will make easy for him the path to Paradise. The angels lower their wings over the seeker of knowledge, being pleased with what he does. The inhabitants of the heavens and the earth and even the fish in the depths of the water seek forgiveness for the scholar.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Learning outcomes are the promise your curriculum makes to the learner: "If you complete this pathway, you will be able to do X, Y, and Z." Without clearly defined outcomes, you cannot design effective modules, create meaningful assessments, or measure whether the curriculum works. Outcomes also force you to prioritise — you cannot teach everything, so you must decide what matters most. The Islamic educational tradition prizes ijazah (certification that a student has mastered specific material) — your learning outcomes define what mastery looks like.


**How?**

1. **Write outcomes using action verbs (Bloom's Taxonomy):**

   | Level | Verbs | Example Outcome |
   |-------|-------|----------------|
   | **Remember** | List, define, identify | "List the five pillars of project management" |
   | **Understand** | Explain, summarise, compare | "Explain the difference between agile and waterfall methodologies" |
   | **Apply** | Implement, use, demonstrate | "Apply agile sprint planning to a real project" |
   | **Analyse** | Compare, evaluate, diagnose | "Analyse a failed project to identify root causes" |
   | **Evaluate** | Assess, justify, critique | "Evaluate whether a proposed solution meets stakeholder requirements" |
   | **Create** | Design, build, develop | "Design a complete project plan for a medium-complexity initiative" |

2. **Aim for 6-10 learning outcomes for the full pathway.** Too few means the curriculum is shallow; too many means it is trying to do too much.

3. **Categorise outcomes by type:**
   - **Knowledge outcomes:** What will they understand?
   - **Skill outcomes:** What will they be able to do?
   - **Disposition outcomes:** How will their attitudes or habits change?

4. **Test each outcome with this question:** "How would I verify that someone has achieved this?" If you cannot imagine a concrete way to test it, the outcome is too vague.

5. **Prioritise ruthlessly.** Rank your outcomes by importance. The top 3-4 are your "must achieve" outcomes — the curriculum is a failure if graduates cannot demonstrate these. The rest are "should achieve" — valuable but secondary.

6. **Write the outcomes in learner-facing language:** "By the end of this pathway, you will be able to..." This clarity helps learners decide whether the curriculum is right for them.` },
        { title: 'Structure the curriculum into modules with clear progression', done: false,
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
              ref: "Quran 9:122",
              arabic: "فَلَوْلَا نَفَرَ مِن كُلِّ فِرْقَةٍ مِّنْهُمْ طَائِفَةٌ لِّيَتَفَقَّهُوا فِي الدِّينِ",
              translation: "For there should separate from every division of them a group to obtain understanding in the religion.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 2685",
              translation: "The Prophet (peace be upon him) said: \"The best of you is the one who learns the Quran and teaches it.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A curriculum is not a list of topics — it is a carefully sequenced journey from ignorance to competence. Each module must build on the previous one, introducing concepts in the right order and at the right pace. Poor sequencing is the most common reason curricula fail: students encounter advanced concepts before they have the foundations to understand them, or they spend weeks on material they could have mastered in days. The classical Islamic matn system (primer → intermediate → advanced texts) is an elegant example of progressive curriculum design.


**How?**

1. **Map your learning outcomes to knowledge dependencies.** Ask: "To achieve Outcome X, what must the learner already know?" This reveals the natural sequence.

2. **Group related content into modules (5-10 modules for a full pathway):**

   | Module | Title | Outcomes Addressed | Prerequisites | Duration |
   |--------|-------|-------------------|---------------|----------|
   | 1 | [Title] | Outcomes 1-2 | None (entry module) | [X weeks] |
   | 2 | [Title] | Outcome 3 | Module 1 | [X weeks] |
   | 3 | [Title] | Outcomes 4-5 | Modules 1-2 | [X weeks] |
   | ... | ... | ... | ... | ... |

3. **Within each module, follow this internal structure:**
   - **Introduction:** What will we learn and why does it matter?
   - **Core content:** Concepts, frameworks, and information (the "what")
   - **Guided practice:** Worked examples, demonstrations, case studies (the "how")
   - **Independent practice:** Exercises, assignments, or projects the learner completes alone
   - **Assessment:** How the learner demonstrates mastery of this module
   - **Bridge:** How this module connects to the next one

4. **Apply the 70-20-10 principle:**
   - 70% of learning should come from practical application (doing)
   - 20% from social learning (discussion, feedback, collaboration)
   - 10% from formal instruction (lectures, readings)
   - Design your modules to reflect this ratio

5. **Build in "milestone projects" at every 2-3 modules.** These larger assignments integrate multiple modules and give learners a tangible artefact they can show for their progress.

6. **Review the full sequence and ask:** "If I were a learner encountering this topic for the first time, does this progression make sense? Is anything introduced before its prerequisites are covered?"` },
        { title: 'Create or curate learning materials for each module', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5027",
              translation: "The Prophet (peace be upon him) said: \"The best among you are those who learn the Quran and teach it.\" Creating learning materials is a form of perpetual teaching.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A curriculum without materials is just a table of contents. The learning materials — readings, videos, exercises, case studies, and assessments — are what actually teach. Creating original materials ensures they are perfectly aligned with your outcomes and audience; curating existing materials saves time and leverages the best work already available. Most effective curricula use a combination of both. The Islamic tradition has always valued both original authorship (ta'lif) and careful selection and commentary on existing works (sharh and mukhtasar).


**How?**

1. **For each module, decide what to create vs. curate:**

   | Material Type | Create When... | Curate When... |
   |--------------|---------------|----------------|
   | **Core readings** | No existing resource covers the topic at the right level for your audience | Excellent resources already exist (books, articles) |
   | **Video lessons** | You need to demonstrate something or explain a complex concept visually | High-quality videos already exist (Khan Academy, YouTube educators) |
   | **Exercises and assignments** | Always create original — these must align precisely with your learning outcomes | Rarely curate — generic exercises often miss the mark |
   | **Case studies** | Your field or community needs context-specific examples | Well-documented cases exist in published literature |
   | **Assessments** | Always create original — they must test your specific outcomes | Rarely curate |

2. **When creating original materials:**
   - Write at the level of your target audience (refer to your learner profile)
   - Use examples from your audience's world (not abstract academic examples)
   - Include Islamic framing where natural — connect concepts to Quranic principles, prophetic methodology, or scholarly wisdom
   - Keep individual pieces digestible: 10-15 minute video segments, 3-5 page readings, exercises completable in 30-60 minutes

3. **When curating existing materials:**
   - Vet quality rigorously — not everything on the internet is worth a learner's time
   - Check for Islamic compatibility — no content that contradicts Islamic values
   - Write a brief introduction to each curated resource explaining: what it covers, why it is included, and what to focus on
   - Ensure the material is accessible (free or affordable, available in your audience's language)

4. **Create a materials checklist per module:**

   | Module | Reading | Video | Exercise | Assessment | Status |
   |--------|---------|-------|----------|-----------|--------|
   | 1 | [Created/Curated] | [Created/Curated] | Created | Created | Complete |
   | 2 | ... | ... | ... | ... | In progress |

5. **Quality-check all materials against your learning outcomes.** Every piece of material should directly serve at least one outcome. If it does not, cut it — no matter how interesting it is.` },
        { title: 'Pilot the curriculum with a small group and iterate based on feedback', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 1017",
              translation: "The Prophet (peace be upon him) said: \"Whoever introduces a good practice in Islam will have its reward and the reward of those who act upon it after him.\" Piloting and iterating a curriculum is how good practices are refined.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

No curriculum survives first contact with real learners unchanged. What seems clear to the designer is often confusing to the student. What seems well-paced to the expert is often too fast for the beginner. A pilot with a small group (5-15 people) reveals these problems before you publish to a wider audience, when changes are still cheap and easy. The Prophetic method was iterative — the Prophet (peace be upon him) adapted his teaching to his audience's reactions and understanding, adjusting explanations when he saw confusion.


**How?**

1. **Recruit a pilot cohort of 5-15 learners.** Choose people who match your target audience profile. Invite them with clear expectations:
   - "This is a pilot — the curriculum is not yet final"
   - "I need your honest feedback to improve it"
   - "You will receive the full curriculum free (or at reduced cost) in exchange for detailed feedback"

2. **Run the full curriculum with the pilot group.** Do not skip modules or rush — experience the real pace, real confusion, and real engagement levels.

3. **Collect feedback at multiple points:**

   | When | What to Ask |
   |------|------------|
   | **After each module** | "What was clear? What was confusing? What was too easy or too hard? How long did this actually take you?" |
   | **At the midpoint** | "Are you on track? Is the pace sustainable? Are the learning outcomes feeling achievable?" |
   | **At completion** | "Did you achieve the learning outcomes? What was the most valuable part? What would you change? Would you recommend this to a peer?" |

4. **Observe, do not just ask:**
   - Where did learners get stuck? (Track support requests and common questions)
   - Which assignments took much longer or shorter than expected?
   - Where did engagement drop? (Late submissions, low participation)
   - Which materials did learners praise or skip?

5. **Compile feedback into an iteration plan:**

   | Issue Found | Evidence | Proposed Fix | Priority |
   |------------|----------|-------------|----------|
   | Module 3 is too long | Average completion time 8 hrs (designed for 4) | Split into two modules | High |
   | Case study in Module 2 is unclear | 4 of 6 learners asked clarifying questions | Rewrite with more context | High |
   | Assessment in Module 5 is too easy | All learners scored 90%+ | Add application-level questions | Medium |

6. **Implement the high-priority changes before publishing.** A piloted and revised curriculum is orders of magnitude better than an untested one.` },
        { title: 'Publish and make it accessible to your community', done: false,
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
              ref: "Sahih al-Bukhari 3461",
              translation: "The Prophet (peace be upon him) said: \"Convey from me, even if it is one verse.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The entire purpose of creating a curriculum is to benefit others at scale. A curriculum that sits in your Google Drive benefits no one. Publishing makes your intellectual stewardship available to the ummah — and if even one person completes your pathway and gains beneficial knowledge, you receive ongoing reward (sadaqah jariyah).

**How?**

1. **Choose a publishing platform based on your audience and resources:**

   | Platform | Best For | Cost to You | Accessibility |
   |----------|---------|-------------|--------------|
   | **Personal website/blog** | Full control, searchable, easy to update | Domain + hosting | Open to all |
   | **Notion/GitBook** | Clean, structured, easy to navigate | Free tier available | Open or restricted |
   | **YouTube + Google Docs** | Video-heavy curriculum, wide reach | Free | Open to all |
   | **Teachable/Thinkific** | Structured course with enrolment, tracking, certificates | Monthly fee or revenue share | Enrolled students |
   | **Community platform** (masjid website, org newsletter) | Targeted audience, trust factor | Usually free | Community members |
   | **Self-published book/PDF** | Comprehensive, portable, credible | Printing or formatting costs | Anyone who downloads/purchases |
   | **GitHub** | Technical curricula, open-source collaboration | Free | Technically literate audience |

2. **Ensure accessibility:**
   - Is the curriculum available in the language(s) your audience speaks?
   - Is it mobile-friendly (many learners, especially in the Muslim world, are mobile-first)?
   - Is it affordable or free? (Consider a pay-what-you-can model or sponsorship)
   - Is it findable? (SEO, sharing in relevant communities, word of mouth)

3. **Write a clear landing page that includes:**
   - Who this curriculum is for (your learner profile)
   - What they will be able to do after completing it (your learning outcomes)
   - What is required to start (prerequisites)
   - How long it takes (total time commitment)
   - How to begin (clear call to action)

4. **Announce and distribute:**
   - Share in your masjid, professional network, and social media
   - Send to organisations that serve your target audience
   - Ask pilot cohort graduates to share their experience
   - Write a brief announcement post explaining why you created this and who it serves

5. **Maintain and update the curriculum over time:**
   - Collect ongoing feedback from new learners
   - Update materials annually to keep content current
   - Add new modules or advanced pathways as learners request them
   - Consider training others to teach your curriculum — this scales your impact exponentially

6. **Make du'a that Allah accepts this work** and makes it a source of benefit for the ummah. Then trust in His promise that beneficial knowledge is among the deeds that do not end with death.` },
      ],
    },
  ],

  // ── CRITICAL THINKING ──
  intellect_thinking_core: [
    {
      title: 'Implement a "verify before sharing" rule — check sources before forwarding any claim',
      priority: 'urgent', tags: ['verification', 'sidq'],
      description: 'The Quran warns against spreading information without verification (49:6). In an age of misinformation, implementing a personal verification discipline is both a religious obligation and an intellectual safeguard. Every claim you share carries your credibility.',
      subtasks: [
        {
          title: 'Establish a personal rule: never share anything you haven\'t verified', done: false,
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
              kind: "quran",
              ref: "Quran 49:6",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا إِن جَاءَكُمْ فَاسِقٌ بِنَبَإٍ فَتَبَيَّنُوا",
              translation: "O you who have believed, if there comes to you a disobedient one with information, investigate.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 5",
              translation: "The Prophet (peace be upon him) said: \"It is enough of a lie for a person to narrate everything he hears.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

 In the age of instant sharing, your default must shift from "share first, verify later" to "verify first, share only if confirmed." This single rule protects your credibility, your community, and your akhirah.

**How?**

1. **Write your rule down** — formulate it as a personal pledge: "I will not forward, repost, or verbally repeat any claim until I have checked its source."
2. **Set a friction point** — before hitting share on any platform, pause and ask three questions:
   - Who is the original source?
   - Is that source credible?
   - Can I find corroboration from a second reliable source?
3. **Pin the rule visibly** — put it as a note on your phone home screen, a sticky note on your monitor, or a pinned message in your most-used group chat.
4. **Apply it to Islamic content too** — fabricated hadith and misattributed quotes are rampant. Use databases like sunnah.com or dorar.net to verify before sharing.
5. **Build the habit over 30 days** — track each time you catch yourself about to share something unverified. The friction will become second nature.`
        },
        {
          title: 'Learn to identify common red flags in unverified content (no source, emotional language, too good/bad to be true)', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:6",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا إِن جَاءَكُمْ فَاسِقٌ بِنَبَإٍ فَتَبَيَّنُوا أَن تُصِيبُوا قَوْمًا بِجَهَالَةٍ فَتُصْبِحُوا عَلَىٰ مَا فَعَلْتُمْ نَادِمِينَ",
              translation: "O you who have believed, if there comes to you a disobedient one with information, investigate, lest you harm a people out of ignorance and become, over what you have done, regretful.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 5",
              translation: "The Prophet (peace be upon him) said: \"It is enough of a lie for a person to narrate everything he hears.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Misinformation thrives on emotional triggers and cognitive shortcuts. Recognising the patterns that unreliable content follows allows you to filter it before it reaches your judgement. The Quran instructs us to use reason and not follow that of which we have no knowledge (17:36).


**How?**

1. **Memorise these red flags** and check for them every time you encounter a claim:

| Red Flag | What It Looks Like |
|---|---|
| No source cited | "Scientists say..." / "A sheikh said..." with no name or reference |
| Emotional manipulation | ALL CAPS, excessive exclamation marks, fear-mongering language |
| Too perfect or too terrible | Stories that seem designed to provoke outrage or awe without nuance |
| Urgency pressure | "Share before they delete this!" / "Forward to 10 people" |
| No date or context | Old events presented as current news |
| Single-source echo | The same claim circulating but always tracing back to one unverified post |

2. **Practise with a "red flag journal"** — for one week, screenshot every piece of content you encounter that triggers one or more red flags. Review at the end of the week.
3. **Test yourself** — visit a fact-checking site and read their debunked articles. Notice which red flags were present in the original claims.`
        },
        {
          title: 'Bookmark 3-5 reliable fact-checking resources', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:6",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا إِن جَاءَكُمْ فَاسِقٌ بِنَبَإٍ فَتَبَيَّنُوا أَن تُصِيبُوا قَوْمًا بِجَهَالَةٍ",
              translation: "O you who have believed, if there comes to you a disobedient one with information, investigate, lest you harm a people out of ignorance.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Having verification tools at your fingertips removes the friction from fact-checking. If you have to search for a tool every time, you are less likely to verify. The goal is to make checking as easy as sharing — so that the "verify before sharing" rule becomes effortless to follow.


**How?**

1. **Select your core toolkit** — bookmark at least one resource from each category:

| Category | Recommended Resources |
|---|---|
| General fact-checking | Snopes, AFP Fact Check, Reuters Fact Check, Full Fact |
| Hadith verification | sunnah.com, dorar.net (al-Durar al-Saniyyah), islamweb.net hadith encyclopaedia |
| Image/video verification | Google Reverse Image Search, TinEye, InVID (browser extension for video) |
| Academic claims | Google Scholar, PubMed (for health claims), Retraction Watch |
| News source reliability | Media Bias/Fact Check, AllSides |

2. **Organise them in a browser folder** — create a bookmarks folder called "Verify" so they are one click away.
3. **Install browser extensions** where available — InVID for video verification and a reverse image search extension save significant time.
4. **Test each resource** — verify one claim using each bookmarked tool so you know how to use them before you need them urgently.`
        },
        {
          title: 'Practice the rule for 30 days and note how often you catch yourself', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 17:36",
              arabic: "وَلَا تَقْفُ مَا لَيْسَ لَكَ بِهِ عِلْمٌ",
              translation: "And do not pursue that of which you have no knowledge.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 49:6",
              arabic: "إِن جَاءَكُمْ فَاسِقٌ بِنَبَإٍ فَتَبَيَّنُوا",
              translation: "If there comes to you a disobedient one with information, investigate.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 5",
              translation: "The Prophet (peace be upon him) said: \"It is enough of a lie for a person to narrate everything he hears.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Habits form through consistent repetition and self-monitoring. The 30-day practice period transforms the "verify before sharing" rule from a conscious effort into an automatic reflex. Self-monitoring also reveals how deeply ingrained the sharing impulse is, which builds self-awareness — a core component of muhasaba (self-accounting).


**How?**

1. **Start a simple tracker** — use a notebook, spreadsheet, or habit-tracking app. Each day, record:
   - How many times you were about to share something
   - How many times you paused to verify
   - How many claims turned out to be false or unverifiable
   - How many you ultimately shared after verification
2. **Set a daily reminder** — a notification at the end of the day asking: "Did you verify before sharing today?"
3. **Review weekly** — at the end of each week, look at your numbers:
   - Is the "caught myself" count going down (meaning the habit is forming)?
   - What types of content most tempt you to skip verification?
   - Which platforms trigger the most impulsive sharing?
4. **At the end of 30 days, write a brief reflection:**
   - What changed in your information behaviour?
   - What was hardest to verify?
   - How will you sustain this habit going forward?`
        },
        {
          title: 'Delete or correct any previously shared misinformation', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 51:10",
              arabic: "**Translation:** Destroyed are the misinformers",
              translation: "Destroyed are the misinformers",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6018",
              translation: "The Prophet (peace be upon him) said: \"Whoever believes in Allah and the Last Day should say what is good or remain silent; and whoever believes in Allah and the Last Day should not harm his neighbour; and whoever believes in Allah and the Last Day should honour his guest.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Tawbah (repentance) includes rectifying past wrongs where possible. If you have previously shared false information, it may still be circulating and misleading others. Correcting or deleting it is an act of intellectual integrity and a fulfilment of your responsibility toward truth (sidq). The Prophet (peace be upon him) emphasised truthfulness as the path to righteousness (Bukhari and Muslim).


**How?**

1. **Audit your recent shares** — scroll through your social media posts, group chat messages, and forwarded content from the past 3-6 months.
2. **Identify suspect items** — flag anything that:
   - You now know to be false
   - You shared without verifying at the time
   - Contains claims you can no longer find a credible source for
3. **Take action on each item:**
   - **If clearly false** — delete the post/message and post a correction in the same channel
   - **If uncertain** — attempt to verify now. If unverifiable, delete or add a disclaimer
   - **If partially true but misleading** — edit or comment with the full context
4. **Draft a simple correction template:**
   > "I previously shared [claim]. After checking, this appears to be [false/unverified/misleading]. The accurate information is [correction]. I apologise for any confusion."
5. **Do not be embarrassed** — correcting yourself publicly demonstrates intellectual honesty and encourages others to do the same.`
        },
      ],
    },
    {
      title: 'Study the Islamic epistemology of knowledge — categories of certainty (qat\'i vs. dhanni)',
      priority: 'high', tags: ['epistemology', 'islamic-knowledge'],
      description: 'Islamic scholarship developed a sophisticated framework for categorising knowledge by certainty. Understanding the difference between definitive (qat\'i) and speculative (dhanni) evidence teaches intellectual humility and prevents you from being dogmatic about matters that are genuinely open to interpretation.',
      subtasks: [
        {
          title: 'Study the definitions of qat\'i (definitive) and dhanni (speculative) in usul al-fiqh', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 17:36",
              arabic: "وَلَا تَقْفُ مَا لَيْسَ لَكَ بِهِ عِلْمٌ إِنَّ السَّمْعَ وَالْبَصَرَ وَالْفُؤَادَ كُلُّ أُولَٰئِكَ كَانَ عَنْهُ مَسْئُولًا",
              translation: "And do not pursue that of which you have no knowledge. Indeed, the hearing, the sight and the heart — about all those one will be questioned.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The qat'i/dhanni distinction is one of the most important intellectual tools in Islamic scholarship. It determines how much certainty a ruling or belief carries and, therefore, how much room exists for disagreement. Misunderstanding this distinction leads to two errors: treating speculative matters as absolute (producing rigidity) or treating definitive matters as open to reinterpretation (producing relativism). Both are intellectually and spiritually harmful.


**How?**

1. **Learn the core definitions:**
   - **Qat'i al-thubut** — definitive in its transmission (e.g., the Quran, mutawatir hadith)
   - **Dhanni al-thubut** — speculative in its transmission (e.g., ahad hadith)
   - **Qat'i al-dalalah** — definitive in its meaning (text has only one possible interpretation)
   - **Dhanni al-dalalah** — speculative in its meaning (text is open to more than one valid interpretation)
2. **Study a reliable usul al-fiqh primer** — recommended texts:
   - *Usul al-Fiqh al-Islami* by Wahbah al-Zuhayli (comprehensive)
   - *Principles of Islamic Jurisprudence* by M.H. Kamali (English-language introduction)
   - *Al-Waraqat* by Imam al-Juwayni (classical, concise)
3. **Map the four-box grid** — every text falls into one of four categories based on transmission and meaning. Create a 2x2 matrix and place examples in each cell.
4. **Identify practical implications** — a ruling based on qat'i thubut AND qat'i dalalah is binding and not open to ijtihad. A ruling based on dhanni sources allows legitimate scholarly disagreement.`
        },
        {
          title: 'Learn the categories of hadith authentication (sahih, hasan, da\'if, mawdu\')', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 17:36",
              arabic: "وَلَا تَقْفُ مَا لَيْسَ لَكَ بِهِ عِلْمٌ",
              translation: "And do not pursue that of which you have no knowledge. Indeed, the hearing, the sight, and the heart — about all those one will be questioned.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 4:83",
              arabic: "وَلَوْ رَدُّوهُ إِلَى الرَّسُولِ وَإِلَىٰ أُولِي الْأَمْرِ مِنْهُمْ لَعَلِمَهُ الَّذِينَ يَسْتَنبِطُونَهُ مِنْهُمْ",
              translation: "And if they had referred it back to the Messenger or to those of authority among them, then the ones who can draw correct conclusions from it would have known about it.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 71",
              translation: "The Prophet (peace be upon him) said: \"Whoever Allah wants good for, He gives him understanding of the religion.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Hadith are the second source of Islamic law and guidance after the Quran. The scholars of hadith developed the most rigorous pre-modern methodology for evaluating the reliability of transmitted reports. Understanding their categories of authentication protects you from building beliefs or practices on weak or fabricated foundations, and gives you appreciation for the intellectual heritage of this ummah.


**How?**

1. **Learn the four primary categories:**

| Category | Definition | Ruling |
|---|---|---|
| **Sahih** (authentic) | Continuous chain, all narrators trustworthy and precise, no hidden defects or anomalies | Accepted as proof |
| **Hasan** (good) | Meets sahih criteria but one or more narrators have slightly lesser precision | Accepted as proof |
| **Da'if** (weak) | Missing a condition of sahih/hasan — broken chain, weak narrator, or hidden defect | Not used as independent proof; scholars differ on using it for virtuous deeds |
| **Mawdu'** (fabricated) | Evidence of intentional fabrication in the chain | Absolutely rejected; haram to attribute to the Prophet without disclaimer |

2. **Study the sub-categories** — da'if alone has over a dozen sub-types (mursal, munqati', mudallas, munkar, etc.). Start with the major ones.
3. **Use authoritative databases** — sunnah.com and dorar.net provide grading for thousands of hadith. Learn to read their grading notations.
4. **Read an introductory text on mustalah al-hadith** (hadith terminology):
   - *Al-Bayquniyyah* poem with commentary (classical, brief)
   - *Taysir Mustalah al-Hadith* by Mahmud al-Tahhan (modern, systematic)
5. **Practise** — take 10 hadith you commonly see shared and look up their authentication grade. Note how many are weak or fabricated.`
        },
        {
          title: 'Understand how scholars derive rulings from texts of different certainty levels', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:59",
              arabic: "فَإِن تَنَازَعْتُمْ فِي شَيْءٍ فَرُدُّوهُ إِلَى اللَّهِ وَالرَّسُولِ",
              translation: "And if you disagree over anything, refer it back to Allah and the Messenger.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Knowing the categories of certainty is only useful if you understand how scholars actually apply them to derive rulings. This is where theory meets practice. Understanding the derivation process protects you from the error of thinking every Islamic ruling is equally certain, and from the opposite error of thinking everything is up for debate. It teaches you to hold opinions with appropriate confidence.


**How?**

1. **Study the hierarchy of evidence** — scholars generally prioritise sources in this order:
   - Quran (qat'i al-thubut)
   - Mutawatir Sunnah (qat'i al-thubut)
   - Ahad Sunnah (dhanni al-thubut, but accepted with conditions)
   - Ijma' (scholarly consensus — binding when authentic)
   - Qiyas (analogical reasoning — dhanni by nature)
2. **Learn how certainty level affects rulings:**
   - Qat'i + qat'i = obligation/prohibition with no room for ijtihad (e.g., prohibition of riba, obligation of five prayers)
   - Qat'i thubut + dhanni dalalah = legitimate scholarly disagreement exists (e.g., interpretation of "quru'" in 2:228)
   - Dhanni + dhanni = wide room for ijtihad and difference of opinion
3. **Study 2-3 case examples** — pick rulings where the four madhahib differ and trace the disagreement back to differences in how they evaluated the certainty of evidence.
4. **Read about the conditions for ijtihad** — who is qualified to derive rulings, and what safeguards exist against arbitrary interpretation.
5. **Reflect on the wisdom** — this system balances firmness on fundamentals with flexibility on details, which is exactly what a living legal tradition needs.`
        },
        {
          title: 'Apply this framework to one contemporary debate — identify what is qat\'i vs. dhanni', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 39:18",
              arabic: "الَّذِينَ يَسْتَمِعُونَ الْقَوْلَ فَيَتَّبِعُونَ أَحْسَنَهُ أُولَٰئِكَ الَّذِينَ هَدَاهُمُ اللَّهُ",
              translation: "Those who listen to speech and then follow the best of it. Those are the ones Allah has guided, and those are people of understanding.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Theory without application remains abstract. By applying the qat'i/dhanni framework to a real contemporary debate, you develop the ability to distinguish between matters where disagreement is illegitimate (because the evidence is definitive) and matters where disagreement is natural and healthy (because the evidence is speculative). This skill is desperately needed in Muslim communities where every disagreement is treated as either heresy or irrelevant.


**How?**

1. **Choose a contemporary debate** — select an issue where Muslims genuinely disagree. Examples:
   - The permissibility of conventional mortgages in non-Muslim countries
   - Moon sighting vs. astronomical calculation for Ramadan
   - Women leading mixed-gender prayers
   - Cryptocurrency and its classification in Islamic finance
2. **Map the evidence** — for each side of the debate, list the primary texts (Quran, hadith) and scholarly arguments used.
3. **Classify each piece of evidence:**
   - Is the text qat'i or dhanni in transmission?
   - Is it qat'i or dhanni in meaning?
   - Is there ijma' on this point, or have scholars historically differed?
4. **Write your analysis** — a 1-2 page document that:
   - States the question clearly
   - Maps the evidence from both sides
   - Classifies each piece of evidence by certainty
   - Concludes with an honest assessment of how much room for disagreement exists
5. **Share your analysis** with a knowledgeable person for feedback — this is where real learning happens.`
        },
      ],
    },
    {
      title: 'Learn the logical fallacies — identify them in media, debate, and your own thinking',
      priority: 'high', tags: ['logic', 'critical-thinking'],
      description: 'Logical fallacies are errors in reasoning that make arguments appear valid when they are not. The Muslim intellectual tradition, from Al-Ghazali to Ibn Taymiyyah, engaged deeply with logic. Recognising fallacies protects you from manipulation and sharpens your own arguments.',
      subtasks: [
        {
          title: 'Study the 15 most common logical fallacies (ad hominem, straw man, appeal to authority, etc.)', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 6:116",
              arabic: "وَإِن تُطِعْ أَكْثَرَ مَن فِي الْأَرْضِ يُضِلُّوكَ عَن سَبِيلِ اللَّهِ ۚ إِن يَتَّبِعُونَ إِلَّا الظَّنَّ",
              translation: "And if you obey most of those upon the earth, they will mislead you from the way of Allah. They follow nothing but assumption.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 10:36",
              arabic: "إِنَّ الظَّنَّ لَا يُغْنِي مِنَ الْحَقِّ شَيْئًا",
              translation: "Indeed, assumption avails not against the truth at all.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6064",
              translation: "The Prophet (peace be upon him) said: \"Beware of suspicion, for suspicion is the most false of speech.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Logical fallacies are the intellectual equivalent of optical illusions — they make flawed reasoning appear sound. The Muslim scholarly tradition took logic seriously: Al-Ghazali argued that a scholar who does not understand logic cannot be fully trusted in their conclusions. Learning to name and recognise these errors gives you a precise vocabulary for diagnosing bad arguments, whether from media, public figures, or your own thinking.


**How?**

1. **Study these 15 foundational fallacies** — learn the name, definition, and a concrete example of each:

| # | Fallacy | Core Error |
|---|---|---|
| 1 | Ad Hominem | Attacking the person instead of the argument |
| 2 | Straw Man | Misrepresenting an opponent's position to make it easier to attack |
| 3 | Appeal to Authority | Citing an authority figure as proof when they lack relevant expertise |
| 4 | Appeal to Emotion | Using feelings instead of evidence to support a conclusion |
| 5 | False Dilemma | Presenting only two options when more exist |
| 6 | Slippery Slope | Claiming one event will inevitably lead to extreme consequences without evidence |
| 7 | Red Herring | Introducing an irrelevant topic to divert attention |
| 8 | Circular Reasoning | Using the conclusion as a premise (begging the question) |
| 9 | Hasty Generalisation | Drawing a broad conclusion from too few examples |
| 10 | Tu Quoque | Deflecting criticism by pointing to the accuser's behaviour |
| 11 | Bandwagon | Arguing something is true because many people believe it |
| 12 | False Cause | Assuming correlation equals causation |
| 13 | Equivocation | Using a word with multiple meanings ambiguously |
| 14 | Appeal to Tradition | Arguing something is right because it has always been done |
| 15 | No True Scotsman | Redefining a group to exclude counter-examples |

2. **Use flashcards** — create a card for each fallacy with the definition on one side and an example on the other. Review daily for two weeks.
3. **Read a dedicated resource** — *Logically Fallacious* by Bo Bennett or *An Illustrated Book of Bad Arguments* by Ali Almossawi are excellent starting points.`
        },
        {
          title: 'Identify one fallacy per day in news, social media, or conversation for two weeks', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:12",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا اجْتَنِبُوا كَثِيرًا مِّنَ الظَّنِّ إِنَّ بَعْضَ الظَّنِّ إِثْمٌ",
              translation: "O you who have believed, avoid much assumption. Indeed, some assumption is sin.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6064",
              translation: "The Prophet (peace be upon him) said: \"Beware of suspicion, for suspicion is the most false of speech.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Knowing fallacies in theory is different from spotting them in the wild. Real-world fallacies are rarely as clean as textbook examples — they are embedded in persuasive language, emotional appeals, and social pressure. This daily practice trains your pattern recognition so that identifying fallacies becomes instinctive rather than effortful.


**How?**

1. **Keep a "Fallacy Journal"** — a simple notebook or note on your phone with these columns:

| Date | Source | Quote/Paraphrase | Fallacy | Why It's Fallacious |
|---|---|---|---|---|
| Day 1 | News headline | "If we allow X, next thing Y will happen" | Slippery Slope | No evidence for the causal chain |

2. **Where to look:**
   - News opinion columns and editorials
   - Social media arguments and comment sections
   - Political speeches and debates
   - Advertisements (especially health and beauty products)
   - Khutbah and Islamic lecture comment sections
3. **Set a daily reminder** — at the end of each day, if you have not yet logged a fallacy, review what you consumed that day and find one.
4. **Challenge yourself** — by week two, try to spot fallacies in real-time during conversations or while watching the news, not just in retrospect.
5. **Review at the end of two weeks:**
   - Which fallacies appeared most frequently?
   - Which sources were most prone to fallacious reasoning?
   - Did your media consumption habits change as a result?`
        },
        {
          title: 'Review your own recent arguments or opinions for fallacious reasoning', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 12:95",
              arabic: "**Translation:** They said, “By God, you are still in your old fallacy!”",
              translation: "They said, “By God, you are still in your old fallacy!”",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6114",
              translation: "The Prophet (peace be upon him) said: “The strong man is not the one who overcomes people with his strength, but the strong man is the one who controls himself while in anger.”",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

It is easy to spot fallacies in others and much harder to see them in yourself. The Quran warns against the human tendency toward self-justification. Turning the lens of critical analysis inward is an act of intellectual muhasaba — it requires honesty, humility, and genuine commitment to truth over ego.


**How?**

1. **Select 3-5 opinions you hold strongly or have recently argued for** — these could be about:
   - Religious or theological matters
   - Political or social issues
   - Professional or career decisions
   - Parenting or relationship approaches
2. **For each opinion, write out your argument** — state your position and list the reasons you believe it.
3. **Run each reason through the fallacy checklist:**
   - Am I attacking a person instead of engaging their argument? (Ad hominem)
   - Am I misrepresenting the opposing view? (Straw man)
   - Am I relying on "everyone knows" or "scholars say" without specifics? (Bandwagon / Appeal to authority)
   - Am I using emotional anecdotes as proof? (Appeal to emotion)
   - Am I assuming my experience is universal? (Hasty generalisation)
4. **Be honest with yourself** — mark any reasoning that does not hold up. This does not mean your conclusion is wrong, but your argument for it needs strengthening.
5. **Rewrite the arguments** — replace fallacious reasoning with sound evidence and valid logic. Notice how your position may become more nuanced.`
        },
        {
          title: 'Practice constructing valid syllogisms on everyday topics', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:111",
              arabic: "قُلْ هَاتُوا بُرْهَانَكُمْ إِن كُنتُمْ صَادِقِينَ",
              translation: "Say, \"Produce your proof, if you should be truthful.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A syllogism is the basic unit of deductive reasoning — two premises leading to a logically necessary conclusion. The Islamic tradition of mantiq (logic) placed great emphasis on syllogistic reasoning. Practising syllogism construction trains you to think in structured, verifiable steps rather than in intuitive leaps, which is the foundation of all rigorous argumentation.


**How?**

1. **Learn the basic structure of a valid syllogism:**
   - **Major premise:** All A are B (universal statement)
   - **Minor premise:** C is A (particular statement)
   - **Conclusion:** Therefore, C is B

   Example:
   - All acts of riba are prohibited in Islam (major premise)
   - Charging interest on a loan is an act of riba (minor premise)
   - Therefore, charging interest on a loan is prohibited in Islam (conclusion)

2. **Practise daily** — take an everyday topic and construct a syllogism:
   - Start with a claim you believe to be true
   - Identify the underlying universal principle (major premise)
   - Identify the particular case (minor premise)
   - Check whether the conclusion follows necessarily
3. **Test for validity vs. soundness:**
   - **Valid** = the conclusion follows logically from the premises (the structure is correct)
   - **Sound** = the syllogism is valid AND the premises are true
   - A valid syllogism can have false premises — always check both structure and truth
4. **Identify common syllogistic errors:**
   - Undistributed middle term
   - Affirming the consequent
   - Denying the antecedent
5. **Apply to real debates** — take an argument you encounter and rewrite it as a syllogism. Often, the logical error becomes immediately visible when the argument is formalised.`
        },
      ],
    },
    {
      title: 'Practise steelmanning — before critiquing any position, articulate it in its strongest form',
      priority: 'medium', tags: ['reasoning', 'fairness'],
      description: 'Islam commands justice even toward those you disagree with (5:8). Steelmanning — presenting an opposing view in its strongest possible form before critiquing it — is the intellectual embodiment of that command. It builds genuine understanding and earns respect in discourse.',
      subtasks: [
        {
          title: 'Choose a position you currently disagree with', done: false,
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
              arabic: "وَلَا يَجْرِمَنَّكُمْ شَنَآنُ قَوْمٍ عَلَىٰ أَلَّا تَعْدِلُوا ۚ اعْدِلُوا هُوَ أَقْرَبُ لِلتَّقْوَىٰ",
              translation: "And do not let the hatred of a people prevent you from being just. Be just; that is nearer to righteousness.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Growth happens at the boundary of your comfort zone. Selecting a position you genuinely disagree with — not a trivial or absurd one — forces you to engage with perspectives that challenge your worldview. The Quran commands: "O you who believe, stand firmly for justice, as witnesses to Allah, even if it be against yourselves" (4:135). Intellectual justice means engaging honestly with ideas you find uncomfortable.


**How?**

1. **Select a substantive disagreement** — choose something where intelligent, sincere people hold the opposing view. Avoid trivially wrong positions. Good candidates:
   - A political position opposite to yours
   - A theological interpretation from a different school of thought
   - A professional methodology you have always rejected
   - A social policy you instinctively oppose
2. **Check your emotional reaction** — if the idea makes you uncomfortable or defensive, that is a sign it is a good choice. Growth requires discomfort.
3. **Write down your current position clearly** — before researching the opposing view, document your existing stance so you can compare later.
4. **Commit to genuine engagement** — decide that for this exercise, you will treat the opposing view with the same respect you would want for your own.`
        },
        {
          title: 'Research the strongest arguments for that position from its best advocates', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:6",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا إِن جَاءَكُمْ فَاسِقٌ بِنَبَإٍ فَتَبَيَّنُوا أَن تُصِيبُوا قَوْمًا بِجَهَالَةٍ فَتُصْبِحُوا عَلَىٰ مَا فَعَلْتُمْ نَادِمِينَ",
              translation: "Believers, if a troublemaker brings you news, check it first, in case you wrong others unwittingly and later regret what you have done.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 17:36",
              arabic: "وَلَا تَقْفُ مَا لَيْسَ لَكَ بِهِ عِلْمٌ ۚ إِنَّ السَّمْعَ وَالْبَصَرَ وَالْفُؤَادَ كُلُّ أُولَٰئِكَ كَانَ عَنْهُ مَسْئُولًا",
              translation: "Do not follow blindly what you do not know to be true: ears, eyes, and heart, you will be questioned about all these.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2670",
              translation: "The Prophet (peace be upon him) said: \"Allah does not take away knowledge by snatching it away from people, but He takes it away by taking away the scholars, until there remains no scholar, and then the people take ignorant ones as leaders; they are asked and they give verdicts without knowledge — they are misguided and they misguide others.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Most people only encounter opposing views through their critics — which guarantees a distorted picture. Imam al-Shafi'i was known for saying he never debated anyone without first wishing that the truth would appear on their tongue rather than his own. Seeking out the strongest advocates of a position ensures you engage with the real argument, not a caricature.


**How?**

1. **Find the best advocates** — do not learn about the opposing position from its critics. Instead:
   - Search for the most respected scholars or thinkers who hold that position
   - Read their primary works, not summaries or critiques of them
   - Watch their best lectures or interviews, not gotcha clips
2. **Take notes as a student, not a critic** — your goal at this stage is understanding, not rebuttal. Write down:
   - Their core thesis
   - Their strongest pieces of evidence
   - The values or principles driving their position
   - The problems they are trying to solve
3. **Ask genuine questions** — if you have access to someone who holds this view, ask them to explain it. Listen more than you speak.
4. **Identify the strongest version** — among all the advocates you have studied, which one makes the most compelling case? Focus on that version for the next step.`
        },
        {
          title: 'Write a 1-page defence of the position as if you held it', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 5:8",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا كُونُوا قَوَّامِينَ لِلَّهِ شُهَدَاءَ بِالْقِسْطِ ۖ وَلَا يَجْرِمَنَّكُمْ شَنَآنُ قَوْمٍ عَلَىٰ أَلَّا تَعْدِلُوا ۚ اعْدِلُوا هُوَ أَقْرَبُ لِلتَّقْوَىٰ",
              translation: "O you who have believed, be persistently standing firm for Allah, witnesses in justice, and do not let the hatred of a people prevent you from being just. Be just; that is nearer to righteousness.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 4:135",
              arabic: "كُونُوا قَوَّامِينَ بِالْقِسْطِ شُهَدَاءَ لِلَّهِ وَلَوْ عَلَىٰ أَنفُسِكُمْ",
              translation: "Be persistently standing firm in justice, witnesses for Allah, even if it be against yourselves.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Writing a defence of a position you disagree with is one of the most powerful exercises in intellectual empathy. It forces you to inhabit a different perspective fully — not just understand it abstractly, but argue for it convincingly. This is what the Islamic tradition of munazara (structured debate) required: a scholar had to be able to present the opposing view fairly before critiquing it.


**How?**

1. **Write in the first person** — use "I believe" and "my position is" to fully inhabit the perspective. This is an exercise in empathy, not distance.
2. **Structure your defence:**
   - **Opening (2-3 sentences):** State the position clearly and why it matters
   - **Core arguments (3-4 paragraphs):** Present the strongest evidence and reasoning
   - **Address objections (1-2 paragraphs):** Anticipate the main criticisms and respond to them as the advocate would
   - **Conclusion (2-3 sentences):** Summarise why this position is compelling
3. **Quality check** — show it to someone who actually holds this position. Would they say: "Yes, that is a fair and strong representation of my view"? If not, revise until they would.
4. **Do not insert your own rebuttals** — this is not the place for "but actually..." Save critique for the next step.`
        },
        {
          title: 'Only then write your critique — noting which parts of the steelman remain strong', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 5:8",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا كُونُوا قَوَّامِينَ لِلَّهِ شُهَدَاءَ بِالْقِسْطِ وَلَا يَجْرِمَنَّكُمْ شَنَآنُ قَوْمٍ عَلَىٰ أَلَّا تَعْدِلُوا",
              translation: "O you who have believed, be persistently standing firm for Allah, witnesses in justice, and do not let the hatred of a people prevent you from being just. Be just; that is nearer to righteousness.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A critique written after genuine steelmanning is fundamentally different from one written in ignorance of the opposing view. It is more precise, more fair, and more persuasive. It also often reveals that the opposing view has legitimate strengths you had not previously acknowledged — which refines your own position and makes you a more honest thinker.


**How?**

1. **Re-read your steelman defence** — sit with it honestly. Which parts gave you pause? Which arguments were harder to dismiss than you expected?
2. **Write your critique with this structure:**
   - **Acknowledge strengths first** — list the parts of the opposing view that are genuinely compelling. This builds credibility and honesty.
   - **Identify the core disagreement** — where exactly does your view diverge? Is it a factual dispute, a values difference, or a methodological disagreement?
   - **Present your counter-arguments** — address the strongest version of the opposing view, not the weak version.
   - **Note unresolved tensions** — are there parts of the opposing view that your critique does not fully answer?
3. **Compare your critique to your original position** — has the exercise changed or nuanced your view? Be honest about this.
4. **Document what you learned** — the goal is not to "win" but to arrive at a more accurate and just understanding.`
        },
        {
          title: 'Repeat this exercise monthly with different topics', done: false,
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
              kind: "hadith",
              ref: "Sahih al-Bukhari 6064",
              translation: "The Prophet (peace be upon him) said: \"Beware of suspicion, for suspicion is the most false of speech.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A single steelmanning exercise is illuminating. A monthly practice transforms the way you think permanently. Over time, steelmanning becomes your default mode of engagement — you instinctively seek the strongest version of any opposing view before responding. This is the intellectual adab (etiquette) that the greatest Muslim scholars embodied.


**How?**

1. **Schedule it** — put a recurring monthly event in your calendar: "Steelmanning Exercise."
2. **Vary your topics broadly** — rotate across domains to build versatility:
   - Month 1: A theological disagreement within Islam
   - Month 2: A political issue
   - Month 3: A professional or technical debate
   - Month 4: A social or cultural norm you question
   - Month 5: An economic model you oppose
   - Month 6: Revisit your first topic — has your position evolved?
3. **Keep a steelmanning journal** — for each exercise, record:
   - The position you steelmanned
   - Your strongest argument for it
   - What you learned or how your view changed
   - A rating (1-5) of how well you managed to inhabit the opposing perspective
4. **Raise the difficulty over time** — start with positions mildly different from yours, then progress to views you find deeply challenging.
5. **Share with others** — invite a friend or study group to do the same exercise. Discuss your findings together.`
        },
      ],
    },
    {
      title: 'Audit your main news and information sources — classify them by reliability and bias',
      priority: 'high', tags: ['media-literacy', 'verification'],
      description: 'Your worldview is shaped by your information diet. An unaudited information diet leads to distorted thinking. This task involves mapping every regular source you consume, evaluating its reliability and bias, and deliberately diversifying to correct blind spots.',
      subtasks: [
        {
          title: 'List every news source, podcast, social media account, and newsletter you consume regularly', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 17:36",
              arabic: "وَلَا تَقْفُ مَا لَيْسَ لَكَ بِهِ عِلْمٌ",
              translation: "And do not pursue that of which you have no knowledge.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 49:6",
              arabic: "إِن جَاءَكُمْ فَاسِقٌ بِنَبَإٍ فَتَبَيَّنُوا",
              translation: "If there comes to you a disobedient one with information, investigate.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

You cannot evaluate what you have not identified. Most people vastly underestimate the number of information sources that shape their thinking. Social media algorithms, auto-playing videos, and group chat forwards are all sources — even if you do not think of them that way. This inventory is the essential first step in taking control of your information diet.


**How?**

1. **Audit systematically by platform** — go through each one and list every source:

| Platform | Sources to List |
|---|---|
| Social media (Twitter, Instagram, TikTok, YouTube) | Every account you follow or regularly see content from |
| Podcasts | Every podcast you listen to, even occasionally |
| News apps/websites | Every site you visit for news, including aggregators |
| Newsletters/email | Every newsletter you are subscribed to |
| Messaging groups | WhatsApp, Telegram, Discord groups that share news or opinions |
| TV/Radio | Any broadcast news you watch or listen to |
| Books (current) | What you are currently reading or recently finished |

2. **Include passive consumption** — sources you do not actively choose but are exposed to (e.g., trending topics, algorithm-served content, family group chat forwards).
3. **Be honest and exhaustive** — the goal is a complete picture, not a curated one.
4. **Organise in a spreadsheet** with columns: Source Name, Platform, Frequency (daily/weekly/monthly), Category (news/opinion/Islamic/professional/entertainment).`
        },
        {
          title: 'Rate each source on factual reliability (high/medium/low) and political or ideological lean', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:6",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا إِن جَاءَكُمْ فَاسِقٌ بِنَبَإٍ فَتَبَيَّنُوا أَن تُصِيبُوا قَوْمًا بِجَهَالَةٍ",
              translation: "O you who have believed, if there comes to you a disobedient one with information, investigate, lest you harm a people out of ignorance.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 10:36",
              arabic: "إِنَّ الظَّنَّ لَا يُغْنِي مِنَ الْحَقِّ شَيْئًا",
              translation: "Indeed, assumption avails not against the truth at all.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Every source has a reliability level and a perspective. Neither fact alone is disqualifying — a source can be reliable but lean in a particular direction, or unreliable despite claiming neutrality. Rating your sources on both dimensions gives you a clear map of your information landscape and reveals where your blind spots likely are.


**How?**

1. **Add two columns to your source spreadsheet:**
   - **Factual Reliability:** High / Medium / Low
   - **Ideological Lean:** Left / Centre-Left / Centre / Centre-Right / Right / Islamic-Conservative / Islamic-Progressive / Other

2. **Use these criteria for reliability:**

| Rating | Criteria |
|---|---|
| **High** | Regularly cites sources, issues corrections, uses evidence-based reporting, has editorial standards |
| **Medium** | Generally factual but mixes news with opinion, occasionally sensationalises, may omit context |
| **Low** | Frequently shares unverified claims, uses emotional manipulation, rarely cites sources, has a history of corrections or retractions |

3. **Use external references** — Media Bias/Fact Check, AllSides, and Ad Fontes Media provide ratings for many outlets. Cross-reference your own assessment with theirs.
4. **Rate Islamic sources carefully** — apply the same rigour. A popular Islamic social media account is not automatically reliable just because it shares religious content.
5. **Be honest about your own biases** — you may rate sources you agree with more favourably. Try to evaluate based on methodology, not conclusions.`
        },
        {
          title: 'Identify gaps — are you missing perspectives from other schools of thought, regions, or disciplines?', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 39:18",
              arabic: "الَّذِينَ يَسْتَمِعُونَ الْقَوْلَ فَيَتَّبِعُونَ أَحْسَنَهُ ۚ أُولَٰئِكَ الَّذِينَ هَدَاهُمُ اللَّهُ",
              translation: "Who listen to speech and follow the best of it. Those are the ones Allah has guided, and those are people of understanding.",
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

An information diet that only reinforces your existing views creates an echo chamber. The Quran repeatedly commands reflection and looking at the world from multiple angles. If all your sources share the same ideological lean, geographic perspective, or disciplinary lens, your understanding of reality is necessarily incomplete — no matter how reliable those sources are individually.


**How?**

1. **Analyse your source spreadsheet for patterns:**
   - **Ideological lean:** Are 80%+ of your sources on the same side? That is an echo chamber.
   - **Geography:** Are most sources from one country or region? You are missing global perspectives.
   - **Discipline:** Are all your sources in your professional field? You lack cross-disciplinary insight.
   - **Islamic perspective:** Do you only follow one school of thought or movement? You are missing the richness of scholarly diversity.
   - **Language:** Are all sources in one language? Many important perspectives are only available in Arabic, Urdu, Turkish, or other languages.
2. **Map the gaps explicitly:**
   - "I have no sources from [region/perspective/discipline]"
   - "I have X sources leaning [direction] and only Y leaning [other direction]"
   - "I follow [madhab/movement] voices but none from [other madhab/movement]"
3. **Prioritise the most significant gaps** — which missing perspectives are most likely to affect the quality of your thinking on issues that matter to you?`
        },
        {
          title: 'Add 2-3 high-quality sources that balance your current diet', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 39:18",
              arabic: "الَّذِينَ يَسْتَمِعُونَ الْقَوْلَ فَيَتَّبِعُونَ أَحْسَنَهُ",
              translation: "Who listen to speech and follow the best of it. Those are the ones Allah has guided.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 5",
              translation: "The Prophet (peace be upon him) said: \"It is enough of a lie for a person to narrate everything he hears.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Identifying gaps is pointless without filling them. Adding a small number of high-quality balancing sources is more effective than adding many mediocre ones. The goal is not to consume more but to consume more wisely — ensuring that your information diet produces accurate understanding rather than comfortable confirmation.


**How?**

1. **Select sources that fill your specific gaps** — based on your gap analysis, find sources that are:
   - High reliability (do not balance bias with unreliability)
   - From the underrepresented perspective, region, or discipline
   - Substantive rather than reactive (analysis over hot takes)
2. **Recommended high-quality sources by category:**
   - **Global news:** Reuters, Associated Press, BBC World Service, Al Jazeera English
   - **Long-form analysis:** Foreign Affairs, The Economist, Aeon
   - **Islamic scholarship (diverse):** Yaqeen Institute, Tabah Foundation, ISNA, Cambridge Muslim College
   - **Cross-disciplinary:** Aeon, Nautilus, MIT Technology Review
3. **Start small** — add only 2-3 sources. It is better to engage deeply with a few excellent sources than to skim many.
4. **Subscribe actively** — add them to your RSS reader, podcast app, or newsletter inbox. Passive intentions do not change behaviour; active subscriptions do.
5. **Give them 30 days** — commit to reading/listening regularly for a month before deciding whether they are valuable additions.`
        },
        {
          title: 'Remove or reduce consumption of consistently unreliable sources', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:6",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا إِن جَاءَكُمْ فَاسِقٌ بِنَبَإٍ فَتَبَيَّنُوا",
              translation: "O you who have believed, if there comes to you a disobedient one with information, investigate, lest you harm a people out of ignorance and become regretful over what you have done.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Your attention is an amana (trust). Spending it on sources that consistently misinform you is a form of intellectual self-harm. Removing or reducing unreliable sources is not closed-mindedness — it is quality control. You are not silencing perspectives; you are choosing to hear those perspectives from their most reliable advocates instead.


**How?**

1. **Review your spreadsheet** — identify every source you rated "Low" on factual reliability.
2. **For each low-reliability source, make a decision:**

| Action | When to Use |
|---|---|
| **Unfollow/unsubscribe** | The source is consistently unreliable and offers no unique value |
| **Mute/reduce** | The source is occasionally useful but mostly noise — reduce exposure without fully removing |
| **Replace** | You value the perspective but not the source — find a more reliable outlet covering the same ground |

3. **Be honest about why you consumed them** — often, unreliable sources are entertaining or emotionally satisfying. Acknowledge this and find healthier alternatives.
4. **Handle group chats diplomatically** — if a family or community group chat regularly shares misinformation:
   - You do not need to leave the group
   - Mute the group and check it on your schedule rather than reacting to every notification
   - Gently share corrections when appropriate, with kindness and evidence
5. **Review quarterly** — your information diet is not static. Schedule a quarterly review to reassess sources as they change over time.`
        },
      ],
    },
  ],

  intellect_thinking_growth: [
    {
      title: 'Study a foundational text on logic or philosophy — e.g., Aristotle\'s categories or Al-Ghazali\'s Maqasid al-Falasifah',
      priority: 'medium', tags: ['logic', 'philosophy'],
      description: 'The Muslim intellectual tradition engaged deeply with Greek logic and developed it further. Studying a foundational text in logic or philosophy — whether from the Western or Islamic tradition — builds the conceptual vocabulary needed for rigorous thinking about any subject.',
      subtasks: [
        {
          title: 'Choose your text — Al-Ghazali\'s Maqasid al-Falasifah, Aristotle\'s Organon, or an equivalent', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:190",
              arabic: "إِنَّ فِي خَلْقِ السَّمَاوَاتِ وَالْأَرْضِ وَاخْتِلَافِ اللَّيْلِ وَالنَّهَارِ لَآيَاتٍ لِّأُولِي الْأَلْبَابِ",
              translation: "Indeed, in the creation of the heavens and the earth and the alternation of the night and the day are signs for those of understanding.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 466",
              translation: "Narrated Abu Sa'id Al-Khudri: The Prophet (peace be upon him) delivered a sermon and said: \"Allah gave a choice to one of His slaves — either to choose this world or what is with Him in the Hereafter. He chose what is with Allah.\"",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "choosing the path of deep knowledge and scholarship over superficial pursuits reflects the same orientation toward what endures — the choice of the text you study to build your intellect is a step in that direction.",
            },
          ],
          description: `**Why?**

The choice of text determines the lens through which you will develop your logical thinking. Al-Ghazali's *Maqasid al-Falasifah* presents Greek philosophy through an Islamic scholarly lens, while Aristotle's *Organon* is the original foundation of formal logic. Choosing deliberately — rather than randomly — ensures the text matches your current level and learning goals.


**How?**

1. **Assess your starting level:**
   - **Beginner in logic/philosophy** — start with a modern introduction like *Thinking Logically* by Salmon or *The Philosophy Book* (DK) for a survey, then move to primary texts
   - **Familiar with basic logic** — go directly to Al-Ghazali's *Maqasid al-Falasifah* or Aristotle's *Categories*
   - **Intermediate** — tackle Aristotle's *Prior Analytics* or Al-Farabi's commentaries on Aristotle

2. **Consider these recommended texts:**

| Text | Author | Best For |
|---|---|---|
| *Maqasid al-Falasifah* | Al-Ghazali | Understanding Greek philosophy through an Islamic lens |
| *Categories* + *On Interpretation* | Aristotle | Foundations of classification and propositional logic |
| *Al-Risalah al-Shamsiyyah* | Al-Katibi | Classical Islamic logic textbook (widely studied in seminaries) |
| *Tahafut al-Falasifah* | Al-Ghazali | Critical engagement with philosophy (read after *Maqasid*) |
| *Kitab al-Burhan* | Ibn Sina | Theory of demonstration and scientific knowledge |

3. **Check for available translations** — ensure a reliable English or Arabic edition exists with scholarly annotations.
4. **Commit to a timeline** — set a realistic schedule (e.g., 8-12 weeks) to complete the text.`
        },
        {
          title: 'Find a commentary or study guide to read alongside the primary text', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:190-191",
              arabic: "إِنَّ فِي خَلْقِ السَّمَاوَاتِ وَالْأَرْضِ وَاخْتِلَافِ اللَّيْلِ وَالنَّهَارِ لَآيَاتٍ لِّأُولِي الْأَلْبَابِ ۚ الَّذِينَ يَذْكُرُونَ اللَّهَ قِيَامًا وَقُعُودًا وَعَلَىٰ جُنُوبِهِمْ وَيَتَفَكَّرُونَ فِي خَلْقِ السَّمَاوَاتِ وَالْأَرْضِ",
              translation: "Indeed, in the creation of the heavens and the earth and the alternation of the night and day are signs for those of understanding — who remember Allah while standing, sitting, and lying on their sides, and give thought to the creation of the heavens and the earth.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (peace be upon him) said: \"Whoever takes a path in search of knowledge, Allah will make easy for him a path to Paradise.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Foundational texts in logic and philosophy were written for audiences with different background knowledge than modern readers possess. A commentary or study guide bridges that gap, explaining technical terms, providing historical context, and highlighting the arguments that remain relevant today. Reading without a guide often leads to frustration or misunderstanding — reading with one transforms the experience into genuine learning.


**How?**

1. **Search for commentaries specific to your chosen text:**
   - For Al-Ghazali: look for works by scholars who contextualise his engagement with falsafah
   - For Aristotle: the Stanford Encyclopedia of Philosophy has excellent free entries on each work
   - For classical Islamic logic texts: check if your edition includes a sharh (commentary) or hashiyah (marginal gloss)

2. **Types of companion resources:**

| Resource Type | Example | When to Use |
|---|---|---|
| **Traditional commentary (sharh)** | Taftazani on al-Shamsiyyah | Deep line-by-line understanding |
| **Modern study guide** | *Aristotle: A Very Short Introduction* (OUP) | Quick orientation before diving in |
| **Lecture series** | University lecture recordings on YouTube/Coursera | Audio learners; commute-friendly |
| **Online encyclopedia** | Stanford Encyclopedia of Philosophy (plato.stanford.edu) | Free, reliable, detailed entries |
| **Study partner** | A friend reading the same text | Discussion and accountability |

3. **Read the guide first** — skim the commentary or introduction before starting the primary text. This gives you a roadmap.
4. **Keep both open simultaneously** — as you read each section of the primary text, check the commentary for clarification.`
        },
        {
          title: 'Read one chapter per week and write notes summarising the key arguments', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (peace be upon him) said: \"Whoever takes a path in search of knowledge, Allah will make easy for him the path to Paradise.\" Careful study and note-taking is the path of the serious student of knowledge.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Deep reading requires deliberate pacing and active engagement. One chapter per week allows time for the ideas to settle, for you to discuss them, and for genuine comprehension to develop. Writing summaries forces you to process what you have read rather than passively consuming it — this is the difference between reading and studying.


**How?**

1. **Set your weekly schedule:**
   - **Day 1-2:** First reading of the chapter — read for overall understanding
   - **Day 3-4:** Second reading with your commentary — focus on arguments and technical terms
   - **Day 5:** Write your summary notes
   - **Day 6-7:** Reflect, discuss, and prepare for the next chapter

2. **Use this note-taking template for each chapter:**
   - **Chapter title and number**
   - **Main thesis** — what is the author arguing in this chapter? (1-2 sentences)
   - **Key arguments** — list the 2-4 most important arguments with brief explanations
   - **Technical terms introduced** — define each new term in your own words
   - **Connections** — how does this chapter connect to previous chapters or to ideas you already know?
   - **Questions** — what did you not understand? What do you want to discuss?
   - **Islamic relevance** — how does this argument relate to or inform Islamic intellectual tradition?

3. **Write in your own words** — do not copy passages. If you cannot explain it in your own words, you have not understood it yet.
4. **Keep your notes organised** — use a dedicated notebook or digital document. These notes become a personal reference you can return to.`
        },
        {
          title: 'Discuss the text with a study partner or in a reading circle', done: false,
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
              ref: "Sunan Abi Dawud 3641",
              translation: "The Prophet (peace be upon him) said: \"He who goes out in search of knowledge is in the path of Allah until he returns.\"",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Islamic intellectual tradition was built on halaqat (study circles), not solitary reading. Discussion reveals blind spots in your understanding, introduces perspectives you missed, and forces you to articulate ideas clearly. Al-Ghazali himself emphasised that knowledge deepens through munazara (structured dialogue). A study partner turns a solo intellectual exercise into a communal one.


**How?**

1. **Find your discussion partner(s):**
   - A friend who is reading the same text
   - A local or online reading group (check mosques, Islamic centres, university philosophy departments)
   - An online community (Reddit philosophy forums, Discord study groups, Clubhouse rooms)
   - If no one is available, use a structured journaling approach — write dialogues with yourself, arguing both sides

2. **Structure your discussions:**
   - **Weekly meeting** (30-60 minutes, in person or video call)
   - **Format per session:**
     1. Each person summarises the chapter's main argument (5 minutes each)
     2. Identify points of agreement and disagreement (10 minutes)
     3. Discuss the hardest or most confusing part (10 minutes)
     4. Connect to contemporary issues or Islamic thought (10 minutes)
     5. Questions for next week (5 minutes)

3. **Ground rules for good discussion:**
   - Seek understanding before critique
   - Reference the text — do not argue from memory alone
   - Respect disagreement — the goal is insight, not victory
   - Rotate who leads the discussion each week

4. **Document insights** — after each discussion, add a "Discussion Notes" section to your chapter summary with new ideas or changed perspectives.`
        },
        {
          title: 'Write a final reflection on how the text changed or refined your thinking', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 39:9",
              arabic: "قُلْ هَلْ يَسْتَوِي الَّذِينَ يَعْلَمُونَ وَالَّذِينَ لَا يَعْلَمُونَ إِنَّمَا يَتَذَكَّرُ أُولُو الْأَلْبَابِ",
              translation: "Say, \"Are those who know equal to those who do not know?\" Only they will remember who are people of understanding.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The purpose of studying a foundational text is not to finish it but to be changed by it. A final reflection forces you to articulate what shifted in your thinking — which is where the real intellectual growth becomes conscious and permanent. Without this step, even excellent study fades into vague memory rather than lasting transformation.


**How?**

1. **Write a 2-3 page reflection addressing these questions:**
   - **Before and after:** What did I believe about logic/philosophy/reasoning before reading this text? How has that changed?
   - **Strongest argument:** Which argument in the text was most compelling to me, and why?
   - **Greatest challenge:** Which idea challenged me most? Did I ultimately accept it, reject it, or remain undecided?
   - **Islamic integration:** How does this text enrich my understanding of Islamic intellectual tradition? Where does it complement or challenge Islamic thought?
   - **Practical impact:** How will this text change the way I think, argue, or evaluate claims in daily life?
   - **Gaps and next steps:** What questions did this text raise that I want to explore further? What should I read next?

2. **Be honest about limitations** — if parts of the text went over your head, say so. Intellectual honesty is more valuable than pretending to have understood everything.

3. **Share your reflection:**
   - With your study partner or reading circle
   - As a blog post or social media thread to benefit others
   - In your personal knowledge base as a reference for future study

4. **Update your reading plan** — based on what you learned, choose your next text. Deep study is a chain, not an isolated event.`
        },
      ],
    },
    {
      title: 'Apply a structured decision-making framework (e.g., istikharah + pros/cons + shura) to your next major decision',
      priority: 'high', tags: ['decision-making', 'istikhara'],
      description: 'Islam provides a comprehensive decision-making toolkit: istikharah (seeking divine guidance), shura (consultation), and rational analysis. Combining all three into a structured framework protects against impulsiveness and ensures major decisions are made with both spiritual and intellectual rigour.',
      subtasks: [
        {
          title: 'Identify your next major decision and write it as a clear question', done: false,
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
              arabic: "وَشَاوِرْهُمْ فِي الْأَمْرِ ۖ فَإِذَا عَزَمْتَ فَتَوَكَّلْ عَلَى اللَّهِ",
              translation: "And consult them in the matter. And when you have decided, then rely upon Allah.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1162",
              translation: "The Prophet (peace be upon him) taught the dua of istikhara for seeking guidance in decisions.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A poorly defined question leads to a confused decision process. Many people agonise over decisions because they have not clarified what exactly they are deciding. Writing the decision as a clear, specific question forces precision and reveals whether you are actually facing one decision or several nested ones.


**How?**

1. **Identify the decision** — what major choice are you currently facing? Examples:
   - Career: "Should I accept this job offer or stay in my current role?"
   - Education: "Should I pursue a master's degree in X or begin working in Y?"
   - Relocation: "Should I move to city A for this opportunity?"
   - Financial: "Should I invest in this business or save the capital?"
   - Marriage: "Should I proceed with this potential match?"

2. **Write it as a single, clear question:**
   - **Bad:** "What should I do about my career?" (too vague)
   - **Good:** "Should I accept the offer from Company X at salary Y, which requires relocating to city Z, by the deadline of [date]?"
   - **Better:** Break compound decisions into sequential questions: "First: Do I want to relocate? If yes: Is this specific opportunity compelling enough?"

3. **Define the constraints:**
   - What is the timeline for this decision?
   - What are the non-negotiables (Islamic requirements, family obligations, financial minimums)?
   - What information do I still need before deciding?

4. **Write it down** — physically writing (or typing) crystallises thinking. Post the question somewhere visible so it stays focused throughout the process.`
        },
        {
          title: 'Conduct a thorough rational analysis — list pros, cons, risks, and second-order effects', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:269",
              arabic: "يُؤْتِي الْحِكْمَةَ مَن يَشَاءُ ۚ وَمَن يُؤْتَ الْحِكْمَةَ فَقَدْ أُوتِيَ خَيْرًا كَثِيرًا",
              translation: "He gives wisdom to whom He wills, and whoever has been given wisdom has certainly been given much good.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 65:2-3",
              arabic: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا ۚ وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ",
              translation: "And whoever fears Allah — He will make for him a way out and will provide for him from where he does not expect.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Quran repeatedly calls on believers to use their intellect (aql) and to reflect deeply (tafakkur). Rational analysis is not opposed to spiritual guidance — it is a prerequisite for it. You should bring your best thinking to a decision before seeking divine guidance, so that your istikharah is informed, not lazy. The Prophet (peace be upon him) tied his camel first, then relied on Allah.


**How?**

1. **Create a structured analysis document** with these sections:

**A. Pros and Cons Matrix:**

| Factor | Option A | Option B | Weight (1-5) |
|---|---|---|---|
| Financial impact | [Pro/Con] | [Pro/Con] | [Importance] |
| Family impact | [Pro/Con] | [Pro/Con] | [Importance] |
| Career growth | [Pro/Con] | [Pro/Con] | [Importance] |
| Islamic alignment | [Pro/Con] | [Pro/Con] | [Importance] |
| Personal fulfilment | [Pro/Con] | [Pro/Con] | [Importance] |

**B. Risk Assessment:**
- What could go wrong with each option?
- How likely is each risk?
- How severe would the consequences be?
- Can the risk be mitigated?

**C. Second-Order Effects** (often overlooked):
- If I choose Option A, what decisions does that force in 1, 3, and 5 years?
- Who else is affected by this decision, and how?
- What opportunities does each option open or close?

2. **Be rigorous but not paralysed** — analysis should clarify, not delay indefinitely. Set a time limit (e.g., 3-5 days for research and analysis).
3. **Check for biases** — are you weighting pros of your preferred option more heavily? Have someone else review your analysis.`
        },
        {
          title: 'Consult 2-3 trusted advisors (shura) and document their perspectives', done: false,
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
              translation: "The Prophet (peace be upon him) would consult his companions on matters not revealed by Allah.",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Shura (consultation) is a Quranic principle (42:38) and a Prophetic practice. The Prophet (peace be upon him) consulted his companions on matters not resolved by revelation. Shura is not weakness — it is wisdom. Other people see angles you cannot see, have experiences you lack, and can challenge your assumptions in ways your own analysis cannot.


**How?**

1. **Select your advisors wisely** — choose 2-3 people who are:
   - **Trustworthy** (you can share the full context without fear)
   - **Knowledgeable** (they have relevant experience or expertise)
   - **Diverse in perspective** (do not consult three people who think exactly like you)
   - **Sincere** (they will tell you what they think, not what you want to hear)

2. **Prepare your consultation:**
   - Share the decision question clearly
   - Provide your rational analysis (pros, cons, risks) so they are informed
   - Ask specific questions, not just "what should I do?":
     - "What am I not seeing?"
     - "What would you do in my position, and why?"
     - "What is the biggest risk I am underestimating?"
     - "Is there an option I have not considered?"

3. **Listen and document — do not argue:**
   - Take notes during or immediately after each consultation
   - Record their perspective faithfully, even if you disagree
   - Note where advisors agree (strong signal) and where they diverge (investigate further)

4. **Synthesise the input:**
   - Create a summary: "Advisor A recommends X because... Advisor B recommends Y because... Advisor C raises concern Z."
   - Identify any new factors or perspectives that your solo analysis missed
   - Update your rational analysis document with insights from shura.`
        },
        {
          title: 'Pray istikharah with sincerity and an open heart', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:17",
              arabic: "**Translation:** (They are) those who are patient, those who are true (in Faith, words, and deeds), and obedient with sincere devotion in worship to Allâh. Those who spend [give the Zakât and alms in the Way of Allâh] and those who pray and beg Allâh’s Pardon in the last hours of the night.",
              translation: "(They are) those who are patient, those who are true (in Faith, words, and deeds), and obedient with sincere devotion in worship to Allâh. Those who spend [give the Zakât and alms in the Way of Allâh] and those who pray and beg Allâh’s Pardon in the last hours of the night.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 39:22",
              arabic: "**Translation:** So I ask about a person whose heart Allah has opened up for Islam, and consequently he proceeds in a light from his Lord. (Can he be equal to the one whose heart is hardened?) So, woe to those whose hearts are too hard to remember Allah. Those are wandering in open error.",
              translation: "So I ask about a person whose heart Allah has opened up for Islam, and consequently he proceeds in a light from his Lord. (Can he be equal to the one whose heart is hardened?) So, woe to those whose hearts are too hard to remember Allah. Those are wandering in open error.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 263",
              translation: "Recorded in Sahih al-Bukhari (Volume 2, Book 21, Number 263): 'The Prophet (p.b.u.h) used to teach us the way of doing Istikhara... in all matters as he taught us the Suras of the Quran.'",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Istikharah is the spiritual dimension of decision-making — acknowledging that despite your best analysis and consultation, your knowledge is limited and Allah's knowledge is complete. It is not a magical shortcut that replaces rational thought; it is the culmination of a process where you have done your due diligence and now submit the matter to the One who sees what you cannot. The Prophet (peace be upon him) taught his companions istikharah for all their affairs (Bukhari).


**How?**

1. **Learn the istikharah prayer properly:**
   - Pray two voluntary rak'at (units of prayer)
   - After completing the prayer, recite the istikharah supplication (du'a) taught by the Prophet (peace be upon him)
   - The du'a asks Allah to facilitate the matter if it is good for you and to turn it away if it is harmful — in your religion, livelihood, and ultimate outcome

2. **Approach it with the right mindset:**
   - **Not a coin flip** — istikharah is not about receiving a dream or a sign. It is about sincere submission after doing your homework
   - **Open heart** — genuinely be willing to accept either outcome. If you have already decided and are just seeking validation, the exercise loses its meaning
   - **No specific outcome expected** — you are asking for guidance, not confirmation. Be prepared for the answer to come as ease or difficulty in the path, clarity of mind, or changed circumstances

3. **Timing:**
   - Pray istikharah after completing your rational analysis and shura — not before
   - You may repeat it over several days if you feel you need more clarity
   - There is no limit to how many times you can pray istikharah for the same decision

4. **After istikharah:**
   - Proceed with the option that feels right after sincere du'a and analysis
   - Trust the process — if obstacles arise, they may be part of the answer
   - Do not second-guess endlessly; trust that you have done your part`
        },
        {
          title: 'Make the decision, document your reasoning, and review the outcome after 90 days', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:159",
              arabic: "فَإِذَا عَزَمْتَ فَتَوَكَّلْ عَلَى اللَّهِ",
              translation: "And when you have decided, then rely upon Allah.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1162",
              translation: "The Prophet (peace be upon him) taught the dua of istikhara: \"O Allah, I seek Your guidance through Your knowledge, and I seek ability through Your power.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A decision without documentation teaches you nothing for the future. By recording your reasoning, inputs, and the outcome, you build a personal decision-making archive that improves your judgement over time. The 90-day review closes the feedback loop — you learn whether your analysis was accurate, your advisors were helpful, and your process was sound.


**How?**

1. **Make the decision** — at this point, you have completed rational analysis, shura, and istikharah. Choose and commit. Indecision after thorough preparation is itself a failure mode.

2. **Document your decision in a structured record:**

| Field | Content |
|---|---|
| **Decision question** | [The clear question you defined] |
| **Decision made** | [What you chose] |
| **Date** | [When you decided] |
| **Key reasons** | [Top 3-5 reasons for this choice] |
| **Rational analysis summary** | [Brief summary of pros/cons/risks] |
| **Shura input summary** | [What advisors recommended and key insights] |
| **Istikharah outcome** | [How you felt after praying — ease, clarity, reservation?] |
| **Risks accepted** | [What could go wrong and how you plan to handle it] |
| **Review date** | [90 days from decision date] |

3. **Set a calendar reminder for the 90-day review.** When the date arrives, answer:
   - Was the outcome as expected? Better or worse?
   - Were my risk assessments accurate?
   - Did my advisors' input prove valuable?
   - What would I do differently in the process next time?
   - What did I learn about my decision-making patterns?

4. **Update your decision record** with the review findings. Over time, this archive becomes an invaluable resource for self-knowledge and improved judgement.`
        },
      ],
    },
    {
      title: 'Practice adversarial thinking — challenge your own deeply held assumptions monthly',
      priority: 'medium', tags: ['critical-thinking', 'muhasaba'],
      description: 'Muhasaba (self-accounting) extends to the intellect, not just behaviour. Deliberately challenging your own assumptions prevents intellectual stagnation and protects against the arrogance of certainty in matters that warrant humility.',
      subtasks: [
        {
          title: 'Pick one belief you hold strongly and ask: "What evidence would change my mind?"', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:12",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا اجْتَنِبُوا كَثِيرًا مِّنَ الظَّنِّ إِنَّ بَعْضَ الظَّنِّ إِثْمٌ",
              translation: "O you who have believed, avoid much assumption. Indeed, some assumption is sin.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 10:36",
              arabic: "إِنَّ الظَّنَّ لَا يُغْنِي مِنَ الْحَقِّ شَيْئًا",
              translation: "Indeed, assumption avails not against the truth at all.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6064",
              translation: "The Prophet (peace be upon him) said: \"Beware of suspicion, for suspicion is the most false of speech.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A belief that cannot be tested against evidence is not a reasoned conviction — it is a dogma. The Quran criticises those who follow the beliefs of their forefathers without reflection (2:170). Asking "what would change my mind?" is the single most powerful question for distinguishing between beliefs grounded in evidence and beliefs grounded in comfort, identity, or habit.


**How?**

1. **Select a strongly held belief** — choose something you feel certain about. The stronger the certainty, the more valuable this exercise. Examples:
   - "The education system needs to be completely overhauled"
   - "Remote work is always better than office work"
   - "This particular scholar's methodology is the best approach"
   - "Entrepreneurship is the best path to financial independence"

2. **Write the belief as a clear proposition** — "I believe that [X] because [Y]."

3. **Ask the critical question:** "What specific evidence, if presented to me, would make me change or significantly revise this belief?"
   - If you cannot think of any evidence that would change your mind, you are holding the belief on faith, not reason. That may be appropriate for matters of aqidah (creed), but not for worldly opinions.
   - If you can identify such evidence, write it down clearly and specifically.

4. **Search for that evidence** — actively look for the thing that would change your mind. This is the hardest step because your brain will resist it.

5. **Assess honestly:**
   - Did you find the evidence? If so, update your belief.
   - Did you not find it? Your belief is strengthened — but remains open to future evidence.
   - Did you find partial evidence? Nuance your belief accordingly.`
        },
        {
          title: 'Research the strongest counter-arguments to that belief', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 17:36",
              arabic: "وَلَا تَقْفُ مَا لَيْسَ لَكَ بِهِ عِلْمٌ",
              translation: "And do not pursue that of which you have no knowledge. Indeed, the hearing, the sight and the heart — about all those one will be questioned.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Seeking counter-arguments is the intellectual equivalent of physical training — it strengthens your reasoning by exposing it to resistance. Imam al-Shafi'i famously said that he never debated anyone except that he wished the truth would appear on their tongue. This attitude — genuinely wanting to encounter the strongest challenge to your beliefs — is a mark of intellectual integrity.


**How?**

1. **Find the best opponents of your belief:**
   - Who are the most respected, thoughtful critics of this position?
   - What are their credentials and track record?
   - Read their primary works, not summaries or takedowns by your side

2. **Compile the counter-arguments systematically:**
   - List each distinct argument against your belief
   - Rate each argument by strength (strong / moderate / weak)
   - Note the evidence each argument relies on
   - Identify whether the disagreement is factual, methodological, or values-based

3. **Engage honestly with the strongest arguments:**
   - Can you refute them with evidence, or only with rhetoric?
   - Do they point to genuine weaknesses in your position?
   - Are there conditions under which the counter-argument would be correct?

4. **Avoid dismissive shortcuts:**
   - Do not dismiss arguments just because you dislike the source
   - Do not retreat to "agree to disagree" without genuinely engaging
   - Do not confuse an argument being uncomfortable with it being wrong

5. **Document everything** — keep a record of the counter-arguments and your honest assessment of their strength.`
        },
        {
          title: 'Write an honest assessment — does your belief survive scrutiny or need refinement?', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2577",
              translation: "The Prophet (peace be upon him) said: \"Beware of suspicion, for suspicion is the most false of speech.\" Honest self-assessment requires examining one's own assumptions with the same rigour.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The purpose of adversarial thinking is not to destroy your beliefs but to refine them. A belief that survives genuine scrutiny is held with justified confidence. A belief that needs adjustment is improved by honesty. Either outcome is a win. The only loss is refusing to assess at all — which leaves you holding potentially flawed beliefs indefinitely.


**How?**

1. **Write a structured assessment** (1-2 pages) with these sections:

   **A. My Original Belief:**
   - State the belief as you held it before this exercise

   **B. Strongest Counter-Arguments Encountered:**
   - Summarise the top 2-3 counter-arguments and their evidence

   **C. My Honest Response:**
   - For each counter-argument: Does my belief withstand it, partially withstand it, or fail?
   - Where my belief withstands: what is the evidence that supports my position?
   - Where my belief fails or partially fails: what needs to change?

   **D. Revised Belief (if applicable):**
   - State the belief as you now hold it — it may be unchanged, nuanced, or fundamentally revised
   - Note what changed and why

   **E. Confidence Level:**
   - Rate your confidence in the belief now (1-10)
   - Compare to your confidence before the exercise
   - Note any remaining uncertainties

2. **Be genuinely honest** — this document is for you. If your belief needs revision, revise it. Intellectual integrity is an act of worship.

3. **Share selectively** — if you trust a friend or mentor, share your assessment and ask for their reaction. External perspective adds another layer of accountability.`
        },
        {
          title: 'Schedule this exercise as a monthly calendar event', done: false,
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
          ],
          description: `**Why?**

Adversarial thinking is most valuable as a habit, not a one-time exercise. Monthly practice ensures that your entire belief system is gradually stress-tested over time, preventing the accumulation of unexamined assumptions. Just as muhasaba (self-accounting) is recommended daily for behaviour, monthly intellectual muhasaba keeps your thinking honest and evolving.


**How?**

1. **Create a recurring calendar event:**
   - **Title:** "Intellectual Muhasaba — Adversarial Thinking"
   - **Frequency:** Monthly (choose a consistent date, e.g., first Saturday)
   - **Duration:** Block 2-3 hours for the full exercise
   - **Reminder:** Set a reminder one day before to start thinking about which belief to examine

2. **Maintain an "Assumptions Queue"** — keep a running list of beliefs and assumptions you want to examine. Add to it whenever you notice yourself being very certain about something. Draw from this list each month.

3. **Track your progress over time:**

| Month | Belief Examined | Outcome | Confidence Before | Confidence After |
|---|---|---|---|---|
| Jan | [Belief] | Unchanged / Refined / Revised | X/10 | Y/10 |
| Feb | [Belief] | Unchanged / Refined / Revised | X/10 | Y/10 |

4. **Vary the domains** — do not only examine comfortable topics. Rotate through:
   - Professional assumptions
   - Political opinions
   - Social and cultural norms
   - Religious interpretations (in matters of legitimate scholarly difference)
   - Personal life decisions and strategies

5. **Review annually** — at the end of the year, look at all 12 exercises. What patterns do you see? Are you becoming more open, more precise, or more confident in the right areas?`
        },
      ],
    },
    {
      title: 'Study cognitive bias — read "Thinking, Fast and Slow" or equivalent Islamic-compatible text',
      priority: 'medium', tags: ['psychology', 'critical-thinking'],
      description: 'The nafs (self) has biases that distort perception and judgement. Modern cognitive science has catalogued these biases extensively. Understanding them is a form of self-knowledge that the Quran encourages, helping you recognise when your thinking is being hijacked by emotion, ego, or mental shortcuts.',
      subtasks: [
        {
          title: 'Read "Thinking, Fast and Slow" by Daniel Kahneman or a comparable text', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:44",
              arabic: "أَتَأْمُرُونَ النَّاسَ بِالْبِرِّ وَتَنسَوْنَ أَنفُسَكُمْ وَأَنتُمْ تَتْلُونَ الْكِتَابَ أَفَلَا تَعْقِلُونَ",
              translation: "Do you order righteousness of the people and forget yourselves while you recite the Scripture? Then will you not reason?",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Daniel Kahneman's work on cognitive biases earned a Nobel Prize and fundamentally changed our understanding of human decision-making. His framework of System 1 (fast, intuitive, error-prone) and System 2 (slow, deliberate, effortful) maps remarkably well onto the Islamic concept of the nafs and its tendencies.

**How?**

1. **Choose your primary text:**

| Text | Author | Best For |
|---|---|---|
| *Thinking, Fast and Slow* | Daniel Kahneman | Comprehensive, foundational |
| *Predictably Irrational* | Dan Ariely | Accessible, example-rich |
| *The Art of Thinking Clearly* | Rolf Dobelli | Short chapters, one bias each |
| *Purification of the Heart* | Hamza Yusuf (trans.) | Islamic spiritual approach to inner biases |
| *Al-Ghazali on Disciplining the Soul* | Al-Ghazali | Classical Islamic self-knowledge |

2. **Reading strategy for *Thinking, Fast and Slow*:**
   - It is 400+ pages — plan for 6-8 weeks
   - Read 2-3 chapters per week
   - Take notes on every bias mentioned, with examples
   - After each section, pause and reflect: "Where does this show up in my life?"

3. **Complement with Islamic reading** — pair the cognitive science text with *Purification of the Heart* or relevant sections of Al-Ghazali's *Ihya Ulum al-Din*. The overlap between modern bias research and classical Islamic psychology is striking.

4. **Do not just read — interact:**
   - Highlight or note passages that surprise you
   - Discuss with a friend or study partner
   - Try the experiments and thought experiments described in the book`
        },
        {
          title: 'Create a personal list of the 10 biases you are most susceptible to', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 6:116",
              arabic: "وَإِن تُطِعْ أَكْثَرَ مَن فِي الْأَرْضِ يُضِلُّوكَ عَن سَبِيلِ اللَّهِ ۚ إِن يَتَّبِعُونَ إِلَّا الظَّنَّ",
              translation: "And if you obey most of those upon the earth, they will mislead you from the way of Allah. They follow nothing but assumption.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
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
              ref: "Sahih al-Bukhari 6064",
              translation: "The Prophet (peace be upon him) said: \"Beware of suspicion, for suspicion is the most false of speech.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Knowing that biases exist in general is far less useful than knowing which specific biases hijack your thinking most often. Self-awareness is the first step toward self-correction. The Quran warns against self-deception (75:14-15) — your nafs will defend its biases unless you identify them explicitly and watch for them actively.


**How?**

1. **Review the full list of cognitive biases** from your reading and select the 10 that resonate most strongly with your personal experience. Common candidates:

| Bias | Description | Watch For |
|---|---|---|
| **Confirmation bias** | Seeking info that confirms what you already believe | Selective reading, ignoring counter-evidence |
| **Sunk cost fallacy** | Continuing because you have already invested, not because it is wise | Refusing to abandon failing projects |
| **Anchoring** | Over-relying on the first piece of information received | Negotiations, first impressions |
| **Availability heuristic** | Judging probability by how easily examples come to mind | Overestimating rare but vivid risks |
| **Dunning-Kruger effect** | Overestimating competence in areas of low expertise | Speaking confidently on unfamiliar topics |
| **Status quo bias** | Preferring the current state even when change is better | Resisting beneficial change |
| **In-group bias** | Favouring people in your group over outsiders | Evaluating arguments by who makes them |
| **Halo effect** | Letting one positive trait influence overall judgement | Trusting a scholar on finance because they are pious |
| **Planning fallacy** | Underestimating time and resources needed | Project timelines, personal goals |
| **Negativity bias** | Giving more weight to negative information | Focusing on criticism, ignoring praise |

2. **Rank your top 10** — for each, rate how frequently it affects your thinking (daily / weekly / occasionally).

3. **For each bias, write one sentence:** "This bias shows up in my life when I..."

4. **Keep this list accessible** — save it in your phone notes or pin it where you will see it regularly.`
        },
        {
          title: 'For each bias, write one real example from your own experience', done: false,
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
              ref: "Jami at-Tirmidhi 2459",
              translation: "The Prophet (peace be upon him) said: \"A wise person is one who holds himself accountable and works for what comes after death.\"",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Abstract knowledge becomes actionable only when connected to personal experience. By finding a real example from your own life for each bias, you transform theoretical awareness into visceral recognition. Next time the bias operates, you are more likely to catch it because you have a concrete memory to compare against, not just a definition.


**How?**

1. **For each of your top 10 biases, complete this template:**

   **Bias:** [Name]
   **My Example:** [Describe a specific situation where this bias affected your thinking or decision]
   **What happened:** [What was the outcome?]
   **What I should have done:** [How would unbiased reasoning have changed my approach?]
   **Warning signal:** [What feeling, thought pattern, or situation should alert me to this bias in the future?]

2. **Be specific and honest:**
   - **Bad example:** "I sometimes have confirmation bias when reading the news"
   - **Good example:** "During the [specific debate], I only read articles supporting my position and dismissed a well-researched article from [source] because it challenged my view. The warning signal was feeling irritated before I had even finished reading the counter-argument."

3. **Draw from diverse life areas:**
   - Professional decisions
   - Financial choices
   - Interpersonal judgements
   - Religious or theological opinions
   - Parenting or family decisions

4. **Share one example with a trusted person** — describing your biases to someone else deepens the learning and builds accountability. Choose someone who will be honest with you.`
        },
        {
          title: 'Develop a personal checklist to review before making important decisions', done: false,
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
              kind: "hadith",
              ref: "Sahih al-Bukhari 7352",
              translation: "The Prophet (peace be upon him) said: \"If a judge gives a ruling, having tried his best to decide correctly and is right, he will receive a double reward. If he gave a ruling, having tried his best and was wrong, he will receive a single reward.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Knowing your biases is necessary but not sufficient — you need a systematic way to check for them before they affect important decisions. A personal bias checklist serves as a "pre-flight check" for your mind, just as pilots use checklists before takeoff. The Prophet (peace be upon him) recommended deliberation before action: "Deliberateness is from Allah, and haste is from Shaytan" (Tirmidhi).


**How?**

1. **Create your checklist based on your personal top 10 biases.** Format it as yes/no questions:

| # | Check | Yes/No |
|---|---|---|
| 1 | Have I actively sought information that contradicts my preferred option? (Confirmation bias) | |
| 2 | Am I continuing because I have already invested, or because it is genuinely the best path? (Sunk cost) | |
| 3 | Am I being anchored by the first number or option I encountered? (Anchoring) | |
| 4 | Am I overweighting a vivid or recent example? (Availability heuristic) | |
| 5 | Am I speaking outside my area of genuine expertise? (Dunning-Kruger) | |
| 6 | Am I resisting change simply because the current situation is familiar? (Status quo bias) | |
| 7 | Am I evaluating this argument based on who is making it rather than its merit? (In-group bias) | |
| 8 | Am I letting one positive quality overshadow other relevant factors? (Halo effect) | |
| 9 | Have I built sufficient buffer into my time and resource estimates? (Planning fallacy) | |
| 10 | Am I giving disproportionate weight to negative information? (Negativity bias) | |

2. **Print or save the checklist** — keep it in your wallet, phone, or decision-making journal.

3. **Use it before every significant decision:**
   - Career changes, major purchases, business partnerships
   - Important conversations or confrontations
   - Public statements or written opinions
   - Any decision you cannot easily reverse

4. **Review and update quarterly** — as your self-awareness grows, some biases may become less problematic while others emerge. Keep the checklist current.`
        },
        {
          title: 'Share your findings with a friend or study partner for mutual accountability', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (peace be upon him) said: \"Whoever takes a path in search of knowledge, Allah will make easy for him the path to Paradise.\" Sharing knowledge with accountability partners multiplies the benefit.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Bias is, by definition, something you cannot fully see in yourself. Having an accountability partner who knows your bias profile creates a mutual correction system. Sharing your findings makes the mirror explicit and actionable.

**How?**

1. **Choose your accountability partner carefully:**
   - Someone you trust deeply and who trusts you
   - Someone willing to be both honest and kind
   - Ideally someone who has also studied cognitive bias (or is willing to)
   - A spouse, close friend, or study partner

2. **Share your bias profile:**
   - Your top 10 biases
   - Your real-life examples
   - Your pre-decision checklist
   - Ask them: "Do you see these biases in me? Are there others I have missed?"

3. **Establish a mutual accountability agreement:**
   - "You have my permission to point out when you see me falling into [specific bias]"
   - "I will do the same for you"
   - Agree on how to deliver feedback (privately, gently, with specific examples)
   - Agree that neither person will react defensively when called out

4. **Create regular check-in points:**
   - Monthly or quarterly review: "How have I been doing with my biases?"
   - Post-decision reviews: "Did you see any biases operating in how I made that decision?"
   - Real-time flags: a simple text message like "anchoring?" when they notice it happening

5. **Model the behaviour** — be the first to share your biases openly and to accept feedback graciously. This sets the tone for a genuine, productive partnership.`
        },
      ],
    },
  ],

  intellect_thinking_excellence: [
    {
      title: 'Write a structured analysis of a complex issue in your field — demonstrate cross-disciplinary reasoning',
      priority: 'medium', tags: ['writing', 'analysis'],
      description: 'The highest level of intellectual contribution involves synthesising insights from multiple disciplines to illuminate a complex problem. This task pushes you to move beyond consuming knowledge to producing it — integrating your professional expertise with Islamic principles and other fields.',
      subtasks: [
        {
          title: 'Select a genuinely complex issue in your field that has no simple answer', done: false,
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
          ],
          description: `**Why?**

Excellence in thinking is demonstrated not by solving easy problems but by engaging honestly with genuinely complex ones. The Quran repeatedly draws attention to the complexity of creation and challenges humanity to reflect deeply (3:190-191). Selecting a truly complex issue — one where experts disagree and simple answers fail — forces you to operate at the highest level of your intellectual capacity.


**How?**

1. **Identify candidate issues** — look for problems in your professional field that exhibit these characteristics:
   - Experts disagree on the solution
   - Multiple stakeholders with competing interests
   - Trade-offs with no clear winner
   - Ethical or values dimensions alongside technical ones
   - No single discipline can fully address it

2. **Examples by field:**
   - **Technology:** The ethical implications of AI in hiring decisions
   - **Finance:** Structuring Islamic finance products that are both Shariah-compliant and economically competitive
   - **Education:** Balancing traditional Islamic pedagogy with modern educational research
   - **Healthcare:** Resource allocation ethics in public health from an Islamic maqasid perspective
   - **Urban planning:** Designing community spaces that serve both religious and civic functions

3. **Test your selection:**
   - Can you write it as a clear question? If not, it may be too vague.
   - Does it matter? If no one is affected by the answer, choose something more impactful.
   - Can you add value? You should have enough expertise to contribute meaningfully, even if you are not the world's foremost authority.

4. **Commit to the issue** — write a one-paragraph scope statement defining exactly what aspect you will analyse.`
        },
        {
          title: 'Research the issue from at least 3 disciplinary perspectives', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:190-191",
              arabic: "الَّذِينَ يَذْكُرُونَ اللَّهَ قِيَامًا وَقُعُودًا وَعَلَىٰ جُنُوبِهِمْ وَيَتَفَكَّرُونَ فِي خَلْقِ السَّمَاوَاتِ وَالْأَرْضِ",
              translation: "Those who remember Allah standing, sitting, and on their sides, and reflect upon the creation of the heavens and the earth.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Complex problems exist at the intersection of multiple fields. Studying them from only one disciplinary lens guarantees a partial and potentially misleading understanding. The Muslim intellectual tradition was inherently cross-disciplinary — scholars like Ibn Khaldun combined sociology, economics, history, and Islamic jurisprudence. Following their example produces richer, more accurate analysis.


**How?**

1. **Identify at least 3 relevant disciplines** — for your chosen issue, which fields offer meaningful insight? Examples:
   - Your primary professional discipline
   - Islamic jurisprudence or ethics (fiqh, usul, maqasid)
   - Economics, sociology, psychology, technology, public policy, environmental science, etc.

2. **For each discipline, conduct targeted research:**
   - **Find 3-5 key sources** — peer-reviewed papers, authoritative books, or expert analyses
   - **Identify the discipline's framing** — how does this field define the problem?
   - **Note the methodology** — what tools and evidence does this discipline use?
   - **Extract key findings** — what does this discipline's research conclude?

3. **Create a cross-disciplinary comparison matrix:**

| Dimension | Discipline A | Discipline B | Discipline C |
|---|---|---|---|
| How the problem is defined | | | |
| Key evidence used | | | |
| Proposed solutions | | | |
| Blind spots | | | |
| Points of agreement | | | |
| Points of tension | | | |

4. **Look for synthesis opportunities** — where do the disciplines complement each other? Where do they genuinely conflict? The most valuable insights often emerge at the intersections.`
        },
        {
          title: 'Draft a structured analysis with clear thesis, evidence, and conclusions', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:111",
              arabic: "قُلْ هَاتُوا بُرْهَانَكُمْ إِن كُنتُمْ صَادِقِينَ",
              translation: "Say, \"Produce your proof, if you should be truthful.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Clear, structured writing is the vehicle through which complex thinking becomes accessible and impactful. An unstructured analysis, no matter how brilliant, fails to communicate. The Islamic scholarly tradition produced masterworks of structured analysis — from Ibn Khaldun's *Muqaddimah* to Al-Shatibi's *Al-Muwafaqat*. Your analysis should aspire to that same clarity and rigour.


**How?**

1. **Use this structure for your analysis:**

   **I. Introduction (1-2 pages)**
   - State the problem and why it matters
   - Present your thesis — your main argument or analytical framework
   - Outline the scope and limitations of your analysis

   **II. Background (2-3 pages)**
   - Historical and contextual background
   - Current state of the issue
   - Key stakeholders and their positions

   **III. Cross-Disciplinary Analysis (5-8 pages)**
   - Subsection for each disciplinary perspective
   - Within each: key findings, evidence, and what this lens reveals
   - Synthesis: where disciplines agree, disagree, and complement each other

   **IV. Islamic Ethical Framework (2-3 pages)**
   - How do maqasid al-Shariah and Islamic ethics illuminate this issue?
   - What principles apply? What guidance do they offer?

   **V. Conclusions and Recommendations (2-3 pages)**
   - What does the integrated analysis reveal?
   - Specific, actionable recommendations
   - Areas of remaining uncertainty and directions for further research

2. **Writing best practises:**
   - Lead with your strongest arguments
   - Use evidence, not rhetoric, to persuade
   - Acknowledge counter-arguments and limitations honestly
   - Cite all sources properly
   - Write clearly — avoid jargon unless defining it

3. **First draft is for ideas; second draft is for clarity** — do not try to write perfectly the first time. Get the analysis down, then revise for structure and readability.`
        },
        {
          title: 'Include an Islamic ethical lens — what does the Shariah framework illuminate about this issue?', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 22:8",
              arabic: "**Translation:** And of mankind is one who argues about Allah without knowledge or guidance or an illuminating scripture,",
              translation: "And of mankind is one who argues about Allah without knowledge or guidance or an illuminating scripture,",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 39:22",
              arabic: "**Translation:** Can he whose breast Allah has opened up for Islam and who is thus (moving along a Path) illumined by a light from Allah (be likened to him who derives no lesson from what he observes)? Woe, then, to those whose hearts were further hardened after Allah's admonition. Such are indeed in obvious error.",
              translation: "Can he whose breast Allah has opened up for Islam and who is thus (moving along a Path) illumined by a light from Allah (be likened to him who derives no lesson from what he observes)? Woe, then, to those whose hearts were further hardened after Allah's admonition. Such are indeed in obvious error.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 98:7",
              arabic: "**Translation:** Verily, those who believe [in the Oneness of Allâh, and in His Messenger Muhammad صلى الله عليه وسلم) including all obligations ordered by Islâm] and do righteous good deeds, they are the best of creatures.",
              translation: "Verily, those who believe [in the Oneness of Allâh, and in His Messenger Muhammad صلى الله عليه وسلم) including all obligations ordered by Islâm] and do righteous good deeds, they are the best of creatures.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 1955a",
              translation: "The Prophet (peace be upon him) said: \"Verily Allah has prescribed proficiency (ihsan) in all things. So if you kill, kill well; and if you slaughter, slaughter well. Let each of you sharpen his blade and let him spare suffering to the animal he slaughters.\"",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "the command of ihsan — excellence and proficiency in all matters — applies equally to intellectual and ethical analysis; applying the Shariah framework with care and rigour is itself an act of ihsan.",
            },
          ],
          description: `**Why?**

The maqasid al-Shariah (objectives of Islamic law) provide a comprehensive ethical framework that can illuminate dimensions of a problem that secular disciplines miss entirely. Adding this lens is not about imposing religious rulings on technical problems — it is about enriching the analysis with a values framework that prioritises human welfare, justice, and long-term flourishing. This is your unique contribution as a Muslim intellectual.


**How?**

1. **Apply the five maqasid as analytical categories:**

| Maqsad (Objective) | Questions to Ask |
|---|---|
| **Hifz al-Din** (Preserving faith) | Does this issue affect people's ability to practise their faith freely? |
| **Hifz al-Nafs** (Preserving life) | What are the implications for human life, health, and safety? |
| **Hifz al-Aql** (Preserving intellect) | Does this issue affect people's ability to think clearly, access education, or make informed decisions? |
| **Hifz al-Nasl** (Preserving family) | What are the implications for family stability, children's welfare, and social cohesion? |
| **Hifz al-Mal** (Preserving wealth) | What are the economic justice implications? Does it protect or exploit the vulnerable? |

2. **Integrate — do not append:**
   - The Islamic lens should be woven into your analysis, not tacked on as a separate section
   - Show where Islamic principles align with, challenge, or add to the secular analysis
   - Be specific — reference relevant Quranic principles, Prophetic guidance, or scholarly opinions

3. **Avoid two common errors:**
   - **Under-application:** Mentioning Islam vaguely without engaging substantively
   - **Over-application:** Forcing Islamic rulings onto issues where they do not directly apply

4. **Highlight unique insights** — what does the Islamic framework reveal that the other disciplines missed? This is the most valuable part of your contribution.`
        },
        {
          title: 'Seek peer review from someone in a different discipline', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 103:3",
              arabic: "وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ",
              translation: "And advised each other to truth and advised each other to patience.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 39:18",
              arabic: "الَّذِينَ يَسْتَمِعُونَ الْقَوْلَ فَيَتَّبِعُونَ أَحْسَنَهُ",
              translation: "Who listen to speech and follow the best of it.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (peace be upon him) said: \"Whoever takes a path in search of knowledge, Allah will make easy for him a path to Paradise.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Self-review is limited by the same blind spots that produced the original work. Peer review from someone in a different discipline tests whether your cross-disciplinary claims are accurate and whether your analysis holds up under scrutiny from a perspective you are less familiar with. This is intellectual shura — seeking counsel to strengthen your work.


**How?**

1. **Select your reviewer strategically:**
   - Choose someone from a discipline different from your primary field
   - They should have enough expertise to evaluate the claims you make about their field
   - Ideally, they should also be willing to engage with the Islamic ethical dimensions

2. **Prepare your request:**
   - Share the full draft with adequate time for review (at least 1-2 weeks)
   - Ask specific questions, not just "what do you think?":
     - "Have I represented the findings from your field accurately?"
     - "Are there important perspectives from your discipline that I have missed?"
     - "Does the cross-disciplinary synthesis hold together logically?"
     - "Is the Islamic ethical framework applied appropriately?"

3. **Receive feedback graciously:**
   - Do not defend — listen, ask clarifying questions, take notes
   - Thank the reviewer regardless of how critical the feedback is
   - Distinguish between feedback you agree with and feedback you disagree with — revise based on the former, but consider the latter carefully before dismissing it

4. **Revise thoroughly:**
   - Address every substantive point raised by the reviewer
   - If you disagree with specific feedback, note why in your revision notes
   - Consider requesting a second review after major revisions`
        },
        {
          title: 'Publish or present your analysis', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 55:1-4",
              arabic: "الرَّحْمَٰنُ ۚ عَلَّمَ الْقُرْآنَ ۚ خَلَقَ الْإِنسَانَ ۚ عَلَّمَهُ الْبَيَانَ",
              translation: "The Most Merciful — taught the Quran — created man — taught him eloquence.",
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
              ref: "Sahih al-Bukhari 667",
              translation: "Recorded in Sahih al-Bukhari (Volume 4, Book 56, Number 667): 'Convey (my teachings) to the people even if it were a single sentence [ayah]...'",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Knowledge that remains in your notebook benefits only you. Publishing or presenting your analysis contributes to the collective intellectual life of your community and field. The Prophet (peace be upon him) said: "Convey from me, even if it is one ayah" (Bukhari). Your cross-disciplinary analysis, enriched with Islamic ethics, may offer a perspective that no one else is providing — withholding it is a disservice.


**How?**

1. **Choose your venue based on your audience and goals:**

| Venue | Best For | Effort Level |
|---|---|---|
| Personal blog or Medium | Building a public intellectual profile | Low |
| Community presentation (masjid, Islamic centre) | Direct community benefit | Medium |
| Academic journal | Scholarly credibility and permanent record | High |
| Conference presentation | Networking and professional visibility | Medium-High |
| Industry publication | Professional impact within your field | Medium |
| YouTube/podcast | Broad reach, accessible format | Medium |

2. **Adapt the format to the venue:**
   - Blog: 2,000-4,000 words, accessible language, clear takeaways
   - Academic: Follow journal submission guidelines, formal citations, peer review process
   - Presentation: 20-30 minute talk with slides, Q&A prepared
   - Video: 15-20 minutes, visual aids, conversational tone

3. **Prepare for engagement:**
   - Anticipate questions and objections
   - Prepare concise responses to the most likely challenges
   - Be ready to say "I don't know" or "I need to think about that" — honesty builds more credibility than bluffing

4. **Follow up:**
   - Respond to comments and feedback thoughtfully
   - Update your analysis if new information emerges
   - Use the reception to guide your next intellectual project`
        },
      ],
    },
    {
      title: 'Lead a structured debate or seminar — present and defend a reasoned position publicly',
      priority: 'low', tags: ['leadership', 'communication'],
      description: 'The ability to present ideas clearly and defend them under scrutiny is a mark of intellectual maturity. The Islamic scholarly tradition of munazara (formal debate) honoured this skill. Leading a public discussion builds both your confidence and your community\'s intellectual culture.',
      subtasks: [
        {
          title: 'Choose a topic you are qualified to discuss and that benefits your community', done: false,
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
          ],
          description: `**Why?**

The Islamic tradition emphasises speaking with knowledge, not mere opinion. Choosing a topic where you have genuine expertise ensures you contribute value rather than noise. Choosing one that benefits your community ensures the effort has impact beyond your personal development.

**How?**

1. **Identify your areas of genuine qualification:**
   - Professional expertise (what you do for a living or have studied extensively)
   - Lived experience (what you have navigated personally with reflective depth)
   - Research investment (what you have studied independently with rigour)
   - Do NOT choose a topic just because you have an opinion on it — qualification requires depth

2. **Assess community benefit:**
   - What questions are your community members wrestling with?
   - What misunderstandings are prevalent and need correction?
   - What skills or knowledge gaps could you help fill?
   - Talk to community leaders, friends, or family to identify real needs

3. **Evaluate candidate topics against both criteria:**

| Topic | My Qualification (1-10) | Community Benefit (1-10) | Combined Score |
|---|---|---|---|
| [Topic A] | | | |
| [Topic B] | | | |
| [Topic C] | | | |

4. **Select the topic with the highest combined score** — it should be something where you can speak with authority and where the community will genuinely benefit from the discussion.

5. **Scope it tightly** — a broad topic like "Islamic finance" is a lecture series. A focused topic like "Should Muslims use conventional mortgages in non-Muslim countries?" is a debate.`
        },
        {
          title: 'Prepare a structured presentation with thesis, evidence, and anticipated objections', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:111",
              arabic: "قُلْ هَاتُوا بُرْهَانَكُمْ إِن كُنتُمْ صَادِقِينَ",
              translation: "Say, \"Produce your proof, if you should be truthful.\" Preparing evidence and anticipating objections is the Quranic standard for discourse.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The difference between a valuable intellectual contribution and a rambling opinion is structure. The Islamic scholarly tradition produced some of history's most rigorously structured arguments — from Al-Ghazali's systematic demolition of philosophical claims in *Tahafut al-Falasifah* to Ibn Rushd's equally systematic response. Your preparation should honour that tradition of clarity and rigour.


**How?**

1. **Develop your thesis** — a single, clear, debatable statement:
   - **Weak:** "Islamic finance is important" (not debatable)
   - **Strong:** "Current Islamic finance products prioritise form over substance and need fundamental restructuring to serve the maqasid al-Shariah"

2. **Structure your presentation:**

   **A. Opening (5 minutes)**
   - Hook: Start with a compelling question, statistic, or scenario
   - Thesis: State your position clearly
   - Roadmap: Tell the audience what you will cover

   **B. Core Arguments (15-20 minutes)**
   - Argument 1: [Strongest argument] — evidence, examples, reasoning
   - Argument 2: [Supporting argument] — evidence, examples, reasoning
   - Argument 3: [Additional argument or Islamic grounding]

   **C. Anticipated Objections (5-10 minutes)**
   - Objection 1: [State it fairly] — your response
   - Objection 2: [State it fairly] — your response
   - Areas of genuine uncertainty: acknowledge what you do not know

   **D. Conclusion (5 minutes)**
   - Restate thesis in light of the evidence presented
   - Call to action or further reflection
   - Open the floor for discussion

3. **Prepare for Q&A:**
   - List the 10 most likely questions and prepare concise answers
   - Practise saying "I don't know, but here is how I would investigate that"
   - Have backup slides or references for deep-dive questions`
        },
        {
          title: 'Invite participants and set ground rules for respectful discourse', done: false,
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
              ref: "Quran 29:46",
              arabic: "وَلَا تُجَادِلُوا أَهْلَ الْكِتَابِ إِلَّا بِالَّتِي هِيَ أَحْسَنُ",
              translation: "And do not argue with the People of the Scripture except in a way that is best.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The quality of a discussion depends as much on the environment as on the content. The Prophet (peace be upon him) modelled respectful discourse even with those who opposed him. Setting clear ground rules creates a space where genuine intellectual exchange can happen — where ideas are challenged without people being attacked, and where disagreement leads to insight rather than hostility.


**How?**

1. **Invite strategically:**
   - Include people who agree with your position (for depth)
   - Include people who disagree (for challenge)
   - Include people who are undecided (for genuine dialogue)
   - Aim for 10-25 participants — large enough for diverse perspectives, small enough for real discussion

2. **Draft and share ground rules in advance:**

   **Ground Rules for Respectful Discourse:**
   1. **Engage ideas, not people** — critique arguments, not the character of those making them
   2. **Listen to understand, not to respond** — let the speaker finish before formulating your reply
   3. **Steel-man before critiquing** — show you understand the opposing view before challenging it
   4. **Cite evidence** — "I believe" is fine for personal testimony, but "research shows" requires a source
   5. **Acknowledge uncertainty** — saying "I'm not sure" is a sign of strength, not weakness
   6. **One voice at a time** — no interrupting, no side conversations
   7. **Stay on topic** — the moderator will redirect if the discussion drifts
   8. **Confidentiality** — views expressed in this discussion are not to be attributed outside the room without permission

3. **Designate a moderator** — either yourself or someone else. The moderator's job is to:
   - Enforce the ground rules
   - Ensure balanced participation (prevent any one person from dominating)
   - Keep the discussion focused on the topic
   - Manage time

4. **Share a brief reading or context document** before the event so participants arrive informed and ready to discuss.`
        },
        {
          title: 'Deliver the presentation and engage with questions and challenges', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 67",
              translation: "The Prophet (peace be upon him) said: \"Convey from me, even if it is one verse.\" Public presentation of knowledge is an act of worship when done with sincerity and preparation.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Preparation without delivery is incomplete. The act of presenting your ideas publicly and defending them under live scrutiny is where intellectual growth happens most intensely. You will discover gaps in your reasoning you never noticed, encounter perspectives you never considered, and develop the ability to think clearly under pressure — a skill that serves you in every area of life.


**How?**

1. **Before the event:**
   - Practise your presentation at least twice — once alone and once with a trusted friend who can give feedback
   - Time yourself to ensure you stay within your allocated slot
   - Test your technology (projector, slides, microphone) if applicable
   - Arrive early to set up the room and greet participants

2. **During the presentation:**
   - **Speak clearly and at a moderate pace** — nervous speakers rush
   - **Make eye contact** with different parts of the audience
   - **Use your structure** — do not improvise away from your preparation
   - **Show conviction without arrogance** — present your position firmly but remain open to challenge

3. **During Q&A:**
   - **Listen fully** before responding — repeat or paraphrase the question to ensure you understood
   - **Acknowledge good challenges** — "That's an excellent point" is not weakness; it is intellectual honesty
   - **Be honest about limitations** — "I haven't fully worked that out yet" is always better than a bluff
   - **Stay calm under pressure** — if someone is aggressive, respond with composure and redirect to the ideas
   - **Take notes** — jot down questions that require further thought

4. **After the event:**
   - Thank all participants personally
   - Note any questions you could not fully answer — these are your homework
   - Collect feedback if possible (informal conversations or a simple feedback form)`
        },
        {
          title: 'Write a post-event reflection on what you learned from the discussion', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 51:8",
              arabic: "**Translation:** you are (involved) in a contradictory discussion.",
              translation: "you are (involved) in a contradictory discussion.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6018",
              translation: "The Prophet (peace be upon him) said: \"Whoever believes in Allah and the Last Day should say what is good or remain silent; and whoever believes in Allah and the Last Day should not harm his neighbour; and whoever believes in Allah and the Last Day should honour his guest.\"",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "reflection after intellectual discourse is an extension of the command to speak with care and accountability — examining whether one's words built understanding or caused harm.",
            },
          ],
          description: `**Why?**

The event itself is only half the learning. The reflection is where you consolidate what the discussion revealed — about your topic, your arguments, your audience, and yourself. Without reflection, even a brilliant discussion fades into a vague positive memory rather than becoming a concrete foundation for future growth.


**How?**

1. **Write your reflection within 48 hours** — while the experience is still fresh. Address these questions:

   **A. Content Reflection:**
   - What was the strongest challenge to my position? How did I respond? Was my response adequate?
   - Did any question or perspective genuinely change my thinking? How?
   - What parts of my argument were strongest? What parts were weakest?
   - Were there important points I failed to communicate clearly?

   **B. Process Reflection:**
   - Did the ground rules work? Were they respected?
   - Was the discussion balanced, or did certain voices dominate?
   - Was the format effective (presentation + Q&A, panel, open discussion)?
   - What would I change about the logistics or structure?

   **C. Personal Reflection:**
   - How did I handle being challenged? Did I respond with humility and honesty?
   - Where did I feel most confident? Where did I feel most vulnerable?
   - Did my ego interfere at any point? (This requires real honesty.)
   - What skills do I need to develop for my next public discussion?

   **D. Follow-Up Actions:**
   - Questions I could not answer that need research
   - Ideas raised that deserve further exploration
   - People I should follow up with for deeper conversation
   - Topic for my next seminar or debate

2. **Share the reflection (or a summary)** with participants who are interested — this closes the loop and shows that you valued their contributions.

3. **Archive everything** — your preparation, slides, notes, and reflection. This becomes a template for future events and a record of your intellectual growth.`
        },
      ],
    },
    {
      title: 'Solve a meaningful, complex problem in your community using original research and analysis',
      priority: 'medium', tags: ['impact', 'problem-solving'],
      description: 'Knowledge without application is like a tree without fruit. This task challenges you to identify a real problem affecting your community and apply your intellectual capabilities to solve it — moving from theory to tangible impact, which is the ultimate purpose of Hifz al-Aql.',
      subtasks: [
        {
          title: 'Identify a persistent problem in your local Muslim community or professional network', done: false,
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
              arabic: "كُنتُمْ خَيْرَ أُمَّةٍ أُخْرِجَتْ لِلنَّاسِ تَأْمُرُونَ بِالْمَعْرُوفِ وَتَنْهَوْنَ عَنِ الْمُنكَرِ",
              translation: "You are the best nation produced for mankind. You enjoin what is right and forbid what is wrong.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 49",
              translation: "The Prophet (peace be upon him) said: \"Whoever among you sees a wrong, let him change it with his hand; if he cannot, then with his tongue; if he cannot, then with his heart.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The highest expression of Hifz al-Aql (preservation of intellect) is using your mind to serve others. Persistent problems — ones that have resisted easy solutions — are where your intellectual capabilities can have the greatest impact. This task channels your thinking toward that principle.

**How?**

1. **Survey your community landscape** — look for problems that are:
   - **Persistent** — they have existed for a long time and resist easy fixes
   - **Impactful** — they affect many people or deeply affect a few
   - **Within your sphere of influence** — you have some ability to affect change
   - **Amenable to analysis** — research and systematic thinking can contribute to a solution

2. **Where to look:**
   - Your local masjid or Islamic centre — governance, programming, youth engagement, financial sustainability
   - Your professional network — skills gaps, mentorship, career pipelines for Muslims
   - Your neighbourhood — integration challenges, education access, economic opportunity
   - Online Muslim communities — misinformation, sectarian conflict, mental health stigma

3. **Talk to people** — do not assume you know the problems. Ask:
   - Community leaders: "What keeps you up at night?"
   - Community members: "What challenge do you face that nobody seems to address?"
   - Youth: "What is missing from your experience at the masjid/community?"
   - Professionals: "What obstacle holds Muslims back in your field?"

4. **Select one problem** — resist the temptation to tackle everything. Choose the problem where your skills, knowledge, and position give you the best chance of making progress.

5. **Write a problem statement:** "The problem is [X]. It affects [who]. It persists because [underlying causes]. I believe I can contribute to a solution because [my qualifications/position]."`
        },
        {
          title: 'Conduct original research — surveys, interviews, data analysis — to understand root causes', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 17:36",
              arabic: "وَلَا تَقْفُ مَا لَيْسَ لَكَ بِهِ عِلْمٌ",
              translation: "And do not pursue that of which you have no knowledge.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (peace be upon him) said: \"Whoever takes a path in search of knowledge, Allah will make easy for him a path to Paradise.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Most community problems persist not because no one cares but because no one has systematically understood their root causes. Surface-level solutions address symptoms; root-cause analysis addresses the underlying structure. Original research — even informal research — transforms you from someone who complains about problems into someone who understands them deeply enough to solve them.


**How?**

1. **Choose your research methods** based on the problem and your resources:

| Method | Best For | Resources Needed |
|---|---|---|
| **Surveys** | Quantifying the scope of the problem, gathering many perspectives | Survey tool (Google Forms, Typeform), distribution channels |
| **Interviews** | Deep understanding of experiences and root causes | Time, interview skills, willing participants |
| **Data analysis** | Identifying patterns, trends, and correlations | Existing data sets, basic analytical skills |
| **Observation** | Understanding how systems actually function vs. how they claim to | Time, note-taking discipline |
| **Document review** | Understanding policies, precedents, and institutional history | Access to relevant documents |

2. **Design your research:**
   - **Research question:** What specifically are you trying to understand?
   - **Sample:** Who will you survey/interview? How many? How will you select them?
   - **Instrument:** What questions will you ask? (Draft, test, revise before deploying)
   - **Analysis plan:** How will you make sense of the data you collect?

3. **Execute with rigour:**
   - Get informed consent from participants
   - Ask open-ended questions — do not lead people toward your expected answers
   - Record and transcribe interviews (with permission)
   - Analyse data systematically — look for patterns, not just confirmation of your hypothesis

4. **Identify root causes** — use frameworks like:
   - **5 Whys:** Ask "why?" five times to drill beneath surface symptoms
   - **Fishbone diagram:** Map causes across categories (people, process, policy, resources, culture)
   - **Systems mapping:** Draw the feedback loops that perpetuate the problem

5. **Document everything** — your research methodology, data, and findings should be transparent and reproducible.`
        },
        {
          title: 'Develop a proposed solution grounded in evidence and Islamic principles', done: false,
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
          ],
          description: `**Why?**

A solution grounded in evidence has credibility. A solution grounded in Islamic principles has legitimacy within a Muslim community. A solution grounded in both has the best chance of being adopted and sustained. The maqasid al-Shariah provide a values framework that ensures your solution serves genuine human welfare — not just efficiency or convenience at the expense of what matters most.


**How?**

1. **Synthesise your research findings** — before proposing solutions, summarise:
   - The root causes you identified
   - The stakeholders affected and their perspectives
   - Any previous attempts to solve the problem and why they failed

2. **Generate multiple solution options** — do not jump to your first idea. Brainstorm at least 3 distinct approaches.

3. **Evaluate each option against dual criteria:**

   **Evidence-based criteria:**
   - Does the evidence from your research support this approach?
   - Has a similar solution worked elsewhere? What can you learn from those cases?
   - Is it feasible given available resources, time, and capacity?
   - Is it sustainable long-term, or a temporary fix?

   **Islamic principles criteria:**
   - Does it align with the maqasid al-Shariah?
   - Does it promote justice (adl) and excellence (ihsan)?
   - Does it avoid harm (la darar wa la dirar)?
   - Does it respect the dignity of all stakeholders?
   - Is it consistent with the values of the community?

4. **Design the preferred solution in detail:**
   - **What** specifically will be done
   - **Who** will be responsible for each component
   - **When** — timeline with milestones
   - **How much** — budget and resource requirements
   - **How** success will be measured
   - **What** could go wrong and how to mitigate risks

5. **Write a clear proposal document** — this will be your tool for gaining support in the next step.`
        },
        {
          title: 'Present the solution to community leaders or stakeholders for feedback', done: false,
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
          ],
          description: `**Why?**

Even the best solution fails without stakeholder buy-in. Presenting your solution to community leaders is an exercise in shura (consultation), persuasion, and humility. Their feedback will strengthen the proposal, and their support will be essential for implementation. This step transforms your work from a personal intellectual exercise into a community initiative.


**How?**

1. **Identify the right audience:**
   - Who has the authority to approve or support implementation?
   - Who has relevant expertise to improve the proposal?
   - Who represents the people most affected by the problem?
   - Who might oppose the solution and needs to be heard?

2. **Prepare a compelling presentation:**
   - **The Problem (5 minutes):** Data and stories that make the problem real and urgent
   - **The Research (5 minutes):** What you found — root causes, not just symptoms
   - **The Solution (10 minutes):** Your proposal in detail — what, who, when, how much
   - **The Ask (5 minutes):** What you need from this audience — approval, resources, participation, feedback

3. **Anticipate objections and prepare responses:**
   - "We have tried this before" — explain what is different about your approach
   - "We do not have the resources" — show the cost of inaction, propose phased implementation
   - "This is not a priority" — present your research data on impact
   - "Who are you to propose this?" — focus on the evidence, not your credentials

4. **Facilitate genuine feedback:**
   - Ask: "What concerns do you have?" and listen carefully
   - Ask: "What have I missed?" — genuinely want to improve the proposal
   - Ask: "What would make you comfortable supporting this?"
   - Take notes on every piece of feedback

5. **Revise based on feedback** — incorporate valid concerns, address objections, and adjust the proposal before moving to implementation.`
        },
        {
          title: 'Implement the solution (or a pilot) and measure results', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 17:35",
              arabic: "**Translation:** And give full measure when you measure, and weigh with an even [i.e., honest] balance. That is the best [way] and best in result.",
              translation: "And give full measure when you measure, and weigh with an even [i.e., honest] balance. That is the best [way] and best in result.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 1955a",
              translation: "The Prophet (peace be upon him) said: \"Verily Allah has prescribed proficiency (ihsan) in all things. So if you kill, kill well; and if you slaughter, slaughter well. Let each of you sharpen his blade and let him spare suffering to the animal he slaughters.\"",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "the principle of ihsan — doing everything with proficiency and excellence — applies to implementation: execute the solution with thoroughness and measure results honestly.",
            },
          ],
          description: `**Why?**

Implementation is where intellectual work becomes real-world impact. Many brilliant analyses and proposals remain on paper. The difference between an intellectual and a change-maker is execution. Implementing with measurement ensures you know whether your solution actually works — and provides the evidence base for scaling or adjusting.

**How?**

1. **Decide: full implementation or pilot?**
   - **Pilot** (recommended): Test the solution on a smaller scale first — one masjid, one programme cycle, one neighbourhood
   - **Full implementation:** Only if the solution is low-risk and stakeholders are fully committed
   - A pilot reduces risk, generates evidence, and builds confidence for broader rollout

2. **Set up your measurement framework before you begin:**

| Metric | What It Measures | How Measured | Target | Timeline |
|---|---|---|---|---|
| [Metric 1] | [Outcome] | [Survey/count/observation] | [Goal] | [When] |
| [Metric 2] | [Outcome] | [Survey/count/observation] | [Goal] | [When] |
| [Metric 3] | [Process] | [Tracking method] | [Goal] | [When] |

3. **Execute the plan:**
   - Follow your timeline and milestones
   - Document everything — what you did, when, what happened
   - Hold regular check-ins with team members and stakeholders
   - Adapt as needed — implementation rarely goes exactly as planned

4. **Collect and analyse results:**
   - Gather data according to your measurement framework
   - Compare results to your targets
   - Identify what worked, what did not, and why
   - Calculate the impact in concrete terms (people helped, time saved, problems resolved)

5. **Report back:**
   - Present results to stakeholders and the community
   - Be honest about both successes and shortcomings
   - Propose next steps: scale up, adjust and re-pilot, or pivot to a different approach
   - Document the entire journey — your research, proposal, implementation, and results — as a case study that others can learn from

6. **Reflect spiritually** — make du'a for acceptance and barakah in the work. Remember that results are from Allah; your role was to strive with excellence. Whether the pilot succeeds or fails, the effort itself is an act of worship when done with sincere intention.`
        },
      ],
    },
  ],

  // ── COGNITIVE INTEGRITY ──
  intellect_cognitive_core: [
    {
      title: 'Identify and eliminate mind-dulling inputs — excessive entertainment, haram content, gossip media',
      priority: 'urgent', tags: ['protection', 'discipline'],
      description: 'Hifz al-Aql (preservation of the intellect) begins with removing what harms it. Just as Islam prohibits intoxicants that cloud the mind, the principle extends to any input that dulls your cognitive sharpness — excessive entertainment, haram imagery, and gossip all erode your ability to think clearly and deeply.',
      subtasks: [
        { title: 'Track your screen time for one week — categorise every app and site by value', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 7:31",
              arabic: "وَكُلُوا وَاشْرَبُوا وَلَا تُسْرِفُوا ۚ إِنَّهُ لَا يُحِبُّ الْمُسْرِفِينَ",
              translation: "Eat and drink, but be not excessive. Indeed, He likes not those who commit excess.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 25:72",
              arabic: "وَالَّذِينَ لَا يَشْهَدُونَ الزُّورَ وَإِذَا مَرُّوا بِاللَّغْوِ مَرُّوا كِرَامًا",
              translation: "And those who do not witness falsehood, and when they pass near ill speech, they pass with dignity.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 2317",
              translation: "The Prophet (peace be upon him) said: \"Among the excellence of a person's Islam is leaving that which does not concern him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

You cannot change what you do not measure. Most people vastly underestimate how much time they spend on low-value digital consumption. Without honest data, any attempt to reclaim your cognitive environment will be based on guesswork rather than reality.


**How?**

1. Enable the built-in screen time tracker on your phone (Screen Time on iOS, Digital Wellbeing on Android).
2. Install a browser extension like RescueTime or similar on your computer.
3. At the end of each day, review the report and categorise every app and site into three buckets: **beneficial** (learning, productive work, worship), **neutral** (necessary communication, logistics), and **harmful** (mindless scrolling, haram content, gossip).
4. Record your daily totals in a simple spreadsheet or journal.
5. After seven days, calculate the total hours spent in each category.` },
        { title: 'Identify the top 3 time-wasting or mind-dulling inputs', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 25:72",
              arabic: "وَالَّذِينَ لَا يَشْهَدُونَ الزُّورَ وَإِذَا مَرُّوا بِاللَّغْوِ مَرُّوا كِرَامًا",
              translation: "And those who do not witness falsehood, and when they pass near ill speech, they pass with dignity.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 23:3",
              arabic: "وَالَّذِينَ هُمْ عَنِ اللَّغْوِ مُعْرِضُونَ",
              translation: "And they who turn away from ill speech.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 2317",
              translation: "The Prophet (peace be upon him) said: \"Among the excellence of a person's Islam is leaving that which does not concern him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Pareto principle applies to cognitive pollution — a small number of inputs typically account for the majority of wasted time. Identifying the top three offenders gives you maximum impact with minimum effort, rather than trying to overhaul everything at once.


**How?**

1. Review your week-long screen time data and sort by hours spent in the "harmful" category.
2. Identify the top three apps, sites, or media types that consumed the most time without providing genuine benefit.
3. For each, write down honestly: what emotional need is this fulfilling? (Boredom, loneliness, anxiety, escapism.)
4. Understanding the underlying need will help you find healthier replacements rather than just creating a vacuum.` },
        { title: 'Delete, block, or set strict time limits on each', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 7:31",
              arabic: "وَلَا تُسْرِفُوا ۚ إِنَّهُ لَا يُحِبُّ الْمُسْرِفِينَ",
              translation: "And be not excessive. Indeed, He likes not those who commit excess.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 2317",
              translation: "The Prophet (peace be upon him) said: \"Among the excellence of a person's Islam is leaving that which does not concern him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

 Removing or restricting access to mind-dulling inputs makes the right choice the easy choice, which is the essence of good environment design.

**How?**

1. For apps you can live without entirely: **delete them** from your phone and computer.
2. For sites you need to block: use a website blocker (Cold Turkey, Freedom, or your router's parental controls) and set permanent blocks.
3. For inputs you cannot fully remove (e.g., social media needed for work): set strict daily time limits using your phone's built-in screen time controls — 15-30 minutes maximum.
4. Remove notifications for all non-essential apps.
5. Log out of accounts on your browser so re-accessing requires deliberate effort.` },
        { title: 'Replace the freed time with intentional alternatives (reading, dhikr, learning)', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 13:11",
              arabic: "إِنَّ اللَّهَ لَا يُغَيِّرُ مَا بِقَوْمٍ حَتَّىٰ يُغَيِّرُوا مَا بِأَنفُسِهِمْ",
              translation: "Indeed, Allah will not change the condition of a people until they change what is in themselves.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 2:168",
              arabic: "يَا أَيُّهَا النَّاسُ كُلُوا مِمَّا فِي الْأَرْضِ حَلَالًا طَيِّبًا",
              translation: "O mankind, eat from whatever is on earth that is lawful and good.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (peace be upon him) said: \"Whoever takes a path in search of knowledge, Allah will make easy for him a path to Paradise.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The nafs (self) abhors a vacuum — if you remove harmful inputs without replacing them with beneficial ones, you will inevitably drift back. The Prophetic model was not merely abstinence from harm but active engagement in khayr (good). Filling the freed time with reading, dhikr, and learning transforms a defensive act into an offensive one.


**How?**

1. For each time slot you freed up, designate a specific replacement activity:
   - Morning scrolling → morning adhkar and Quran recitation
   - Evening entertainment → reading a book or attending an online class
   - Idle browsing → dhikr with a tasbih or listening to beneficial lectures
2. Place physical cues in your environment: a book on the coffee table, a tasbih by your bed, a lecture playlist queued up.
3. Start with just one replacement per day and build gradually.
4. Track your new habits alongside the old ones to see the shift over time.` },
        { title: 'Review and adjust after 30 days', done: false,
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
              ref: "Jami at-Tirmidhi 2459",
              translation: "The Prophet (peace be upon him) said: \"A wise person is one who holds himself accountable and works for what comes after death.\"",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Behaviour change requires feedback loops. A 30-day review lets you assess what is working, what needs adjustment, and whether new mind-dulling inputs have crept in. Without this deliberate checkpoint, initial momentum fades and old habits silently return.


**How?**

1. After 30 days, re-run your screen time audit for a full week.
2. Compare the new data against your original baseline — how many hours have you reclaimed?
3. Honestly assess: have any new time-wasters replaced the old ones?
4. Evaluate your replacement activities: are they genuinely nourishing your intellect, or have they become their own form of passive consumption?
5. Adjust your blocks, limits, and replacements based on what you have learnt.
6. Set a calendar reminder to repeat this review every 90 days.` },
      ],
    },
    {
      title: 'Establish a "no phone first hour" morning protocol — protect your cognitive prime time',
      priority: 'high', tags: ['focus', 'discipline'],
      description: 'The first hour after waking is when your mind is freshest and most receptive. The Sunnah morning routine — Fajr prayer, adhkar, Quran — fills this time with what matters most. Allowing the phone to hijack this window means surrendering your best cognitive hours to other people\'s agendas.',
      subtasks: [
        { title: 'Set your phone to airplane mode or Do Not Disturb before sleeping', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 73:1-4",
              arabic: "يَا أَيُّهَا الْمُزَّمِّلُ ۚ قُمِ اللَّيْلَ إِلَّا قَلِيلًا ۚ نِّصْفَهُ أَوِ انقُصْ مِنْهُ قَلِيلًا ۚ أَوْ زِدْ عَلَيْهِ وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا",
              translation: "O you who wraps himself — arise during the night, except for a little — half of it, or subtract from it a little, or add to it, and recite the Quran with measured recitation.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1145",
              translation: "The Prophet (peace be upon him) said: \"Our Lord descends every night to the lowest heaven in the last third of the night and says: 'Who calls upon Me so that I may answer him?'\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The battle for your morning begins the night before. If your phone is active when you wake, the first thing you see will be notifications, messages, and alerts — all designed to pull you into reactive mode. Setting airplane mode before sleep ensures you wake on your own terms, not on the terms of whoever messaged you last.


**How?**

1. Set a nightly alarm or reminder at your target bedtime that says "Airplane mode — protect your morning."
2. Activate airplane mode or Do Not Disturb before placing your phone down for the night.
3. If you use your phone as an alarm, switch to a dedicated alarm clock or use Do Not Disturb mode which allows alarms through.
4. Make this the last action of your evening routine, right after your night adhkar.` },
        { title: 'Design a morning protocol: Fajr, adhkar, Quran, then breakfast before any screen', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 76:25",
              arabic: "**Translation:** And remember the Name of your Lord every morning and afternoon [i.e. offering of the Morning (Fajr), Zuhr, and ‘Asr prayers].",
              translation: "And remember the Name of your Lord every morning and afternoon [i.e. offering of the Morning (Fajr), Zuhr, and ‘Asr prayers].",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 30:17",
              arabic: "**Translation:** So glorify Allâh [above all that (evil) they associate with Him (O believers)] when you come up to the evening [i.e. offer the (Maghrib ) sunset and (‘Ishâ’) night prayers], and when you enter the morning [i.e. offer the (Fajr) morning prayer].",
              translation: "So glorify Allâh [above all that (evil) they associate with Him (O believers)] when you come up to the evening [i.e. offer the (Maghrib ) sunset and (‘Ishâ’) night prayers], and when you enter the morning [i.e. offer the (Fajr) morning prayer].",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 33:42",
              arabic: "**Translation:** And glorify His Praises morning and afternoon [the early morning (Fajr) and ‘Asr prayers].",
              translation: "And glorify His Praises morning and afternoon [the early morning (Fajr) and ‘Asr prayers].",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 577",
              translation: "Narrated Sahl bin Sa`d:I used to take the \"Suhur\" meal with my family and hasten so as to catch the Fajr (morning prayer) with Allah's Messenger (ﷺ)",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A structured morning protocol ensures that your freshest cognitive hours are devoted to what matters most in your deen and your life. The Prophet (peace be upon him) would begin his day with prayer and remembrance of Allah — this is not just spiritual practice but cognitive priming. By the time you look at a screen, your mind is already anchored and directed.


**How?**

1. Write out your ideal morning sequence with approximate times:
   - Wake up → wudu → Fajr salah (15-20 min)
   - Morning adhkar (10-15 min)
   - Quran recitation or memorisation (15-30 min)
   - Breakfast and preparation for the day (20-30 min)
2. Print this protocol and place it where you will see it upon waking.
3. Only after completing the full sequence do you turn off airplane mode.
4. Start with a realistic version — even 5 minutes of Quran counts — and expand as the habit solidifies.` },
        { title: 'Place your phone in a different room overnight if needed', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 73:1-4",
              arabic: "يَا أَيُّهَا الْمُزَّمِّلُ ۚ قُمِ اللَّيْلَ إِلَّا قَلِيلًا",
              translation: "O you who wraps himself — arise during the night, except for a little.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 2317",
              translation: "The Prophet (peace be upon him) said: \"Among the excellence of a person's Islam is leaving that which does not concern him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Physical distance is the most reliable form of discipline. If your phone is within arm's reach when you wake, the temptation to "just check one thing" is overwhelming. Placing it in another room removes the option entirely, forcing you to get up, make wudu, and begin your morning protocol before you even see a screen.


**How?**

1. Choose a room that is not your bedroom — the kitchen or living room works well.
2. Set up a charging station there so the phone has a "home" that is not your bedside.
3. If you rely on your phone alarm, purchase a simple alarm clock (they cost very little) and place it across the bedroom so you must stand to turn it off.
4. For the first week, this will feel uncomfortable. That discomfort is the nafs resisting discipline — persist through it.` },
        { title: 'Track adherence for 21 days to build the habit', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 23:1-3",
              arabic: "قَدْ أَفْلَحَ الْمُؤْمِنُونَ ۚ الَّذِينَ هُمْ فِي صَلَاتِهِمْ خَاشِعُونَ ۚ وَالَّذِينَ هُمْ عَنِ اللَّغْوِ مُعْرِضُونَ",
              translation: "Certainly will the believers have succeeded: they who are during their prayer humbly submissive, and they who turn away from ill speech.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6018",
              translation: "The Prophet (peace be upon him) said: \"Whoever believes in Allah and the Last Day, let him speak good or remain silent.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Consistency transforms intention into habit. Tracking your adherence for 21 consecutive days creates accountability, reveals patterns (which days are hardest, what disrupts the routine), and builds the momentum needed for the practice to become automatic.

**How?**

1. Create a simple 21-day tracker — a printed grid on your wall, a habit-tracking app, or a journal page.
2. Each morning, mark whether you completed the full protocol before touching your phone.
3. If you break the streak, do not restart the count — just mark the miss and continue. The goal is data, not perfection.
4. After 21 days, review: how many days did you succeed? What caused the misses?
5. If you achieved 18+ days, the habit is forming. If fewer, identify the specific obstacle and adjust your protocol.` },
      ],
    },
    {
      title: 'Practise the Sunnah of silence (samt) — designate daily quiet periods for reflection',
      priority: 'high', tags: ['reflection', 'sunnah'],
      description: ' Deliberate silence creates space for tafakkur (contemplation) and protects the intellect from the noise of constant stimulation.',
      subtasks: [
        { title: 'Designate a 30-60 minute daily window of complete silence — no speech, no media', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6018",
              translation: "The Prophet (peace be upon him) said: \"Whoever believes in Allah and the Last Day, let him speak good or remain silent.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Your mind is constantly processing inputs — conversations, notifications, media, background noise. Without deliberate silence, there is no space for deep thought, self-examination, or the quiet insights that only emerge when the noise stops. The Prophet (peace be upon him) spent years in contemplation in the Cave of Hira before receiving revelation — silence is where clarity is born.


**How?**

1. Choose a consistent daily time for your silence window — after Fajr, after Isha, or during a lunch break.
2. Set a timer for 30 minutes to start (extend to 60 as you grow comfortable).
3. During this window: no speaking, no listening to anything, no reading, no screens. You may sit, walk, or lie down.
4. Inform household members of your practice so they respect the window.
5. Block this time in your calendar as a recurring appointment with yourself.` },
        { title: 'Use this time for tafakkur, journaling, or simply sitting with your thoughts', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:191",
              arabic: "وَيَتَفَكَّرُونَ فِي خَلْقِ السَّمَاوَاتِ وَالْأَرْضِ رَبَّنَا مَا خَلَقْتَ هَٰذَا بَاطِلًا",
              translation: "And give thought to the creation of the heavens and the earth, saying, \"Our Lord, You did not create this aimlessly.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6018",
              translation: "The Prophet (peace be upon him) said: \"Whoever believes in Allah and the Last Day, let him speak good or remain silent.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Silence without direction can become restlessness. The Islamic practice of tafakkur (deep contemplation) gives silence its purpose — reflecting on Allah's creation, your own state, your direction in life. Journaling during this time captures insights that would otherwise evaporate. Simply sitting with your thoughts teaches you to tolerate discomfort and observe your own mind.


**How?**

1. Keep a dedicated journal or notebook nearby during your silence window.
2. Choose one of three modes for each session:
   - **Tafakkur**: Contemplate a verse of the Quran, a sign in nature, or a question about your life direction.
   - **Journaling**: Write freely about whatever arises — worries, gratitude, ideas, self-observations.
   - **Still sitting**: Simply sit and observe your thoughts without engaging them, like watching clouds pass.
3. Do not force productivity — the value is in the practice itself, not in producing an output.
4. Over time, you will develop a natural preference. Follow it.` },
        { title: 'Notice what arises in silence — insights, anxieties, ideas — and write them down', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:190-191",
              arabic: "إِنَّ فِي خَلْقِ السَّمَاوَاتِ وَالْأَرْضِ وَاخْتِلَافِ اللَّيْلِ وَالنَّهَارِ لَآيَاتٍ لِّأُولِي الْأَلْبَابِ",
              translation: "Indeed, in the creation of the heavens and the earth and the alternation of the night and the day are signs for those of understanding.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6018",
              translation: "The Prophet (peace be upon him) said: \"Whoever believes in Allah and the Last Day, let him speak good or remain silent.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Silence surfaces what noise buries. Anxieties you have been avoiding, creative ideas your conscious mind could not reach, unresolved emotional states — all of these emerge when the inputs stop. Writing them down prevents them from looping endlessly and gives you material for genuine self-knowledge, which is a prerequisite for spiritual growth.


**How?**

1. During each silence session, keep a pen and notebook within reach (not a phone).
2. When a thought arises that feels significant — an insight, a worry, an idea — jot it down briefly and return to silence.
3. Do not judge or analyse what arises during the session; simply capture it.
4. After the session, review your notes. Look for recurring themes over the course of a week.
5. Recurring anxieties should be addressed (make du'a, seek counsel, take action). Recurring ideas should be explored further. Recurring insights may indicate areas where Allah is guiding your attention.` },
        { title: 'Gradually extend the practice or add a second daily session', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6018",
              translation: "The Prophet (peace be upon him) said: \"Whoever believes in Allah and the Last Day, let him speak good or remain silent.\" Gradually extending periods of silence deepens the practice of this sunnah.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Like any capacity, your tolerance for silence and depth of contemplation grow with practice. The scholars of the past would spend hours in silent reflection. Extending your practice or adding a second session deepens your capacity for tafakkur and makes silence a natural state rather than an uncomfortable one.


**How?**

1. After practising 30 minutes daily for two weeks, try extending to 45 minutes.
2. After a month, try a full 60-minute session.
3. Alternatively, add a second shorter session at a different time of day — for example, 15 minutes after Dhuhr in addition to your main session.
4. Experiment with different environments: indoors, outdoors, in a masjid between prayers.
5. Track what duration and setting produces the deepest quality of reflection for you.
6. Aim for silence to become something you look forward to rather than endure.` },
      ],
    },
    {
      title: 'Learn and apply the Islamic concept of ʿilm al-yaqin (knowledge with certainty) — do not opine without evidence',
      priority: 'medium', tags: ['epistemology', 'sidq'],
      description: 'The Quran condemns speaking about what one has no knowledge of (17:36). This task involves internalising the discipline of intellectual honesty — distinguishing between what you truly know, what you believe, and what you are guessing — and having the courage to say "I don\'t know" when you don\'t.',
      subtasks: [
        { title: 'Study the Quranic verses on not speaking without knowledge (17:36, 6:148)', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 6:105",
              arabic: "**Translation:** Thus We explain variously the Verses so that they (the disbelievers) may say: \"You have studied (the Books of the people of the Scripture and brought this Qur’ân from that)\" and that We may make the matter clear for the people who have knowledge.",
              translation: "Thus We explain variously the Verses so that they (the disbelievers) may say: \"You have studied (the Books of the people of the Scripture and brought this Qur’ân from that)\" and that We may make the matter clear for the people who have knowledge.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 2:190",
              arabic: "**Translation:** And fight in the Way of Allâh those who fight you, but transgress not the limits. Truly, Allâh likes not the transgressors. [This Verse is the first one that was revealed in connection with Jihâd, but it was supplemented by another (9:36)].",
              translation: "And fight in the Way of Allâh those who fight you, but transgress not the limits. Truly, Allâh likes not the transgressors. [This Verse is the first one that was revealed in connection with Jihâd, but it was supplemented by another (9:36)].",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 100",
              translation: "Narrated `Abdullah bin `Amr bin Al-`As:I heard Allah's Messenger (ﷺ) saying, \"Allah does not take away the knowledge, by taking it away from (the hearts of) the people, but takes it away by the death of the religious learned men till when none of the (religious learned men) remains, people will take as their leaders ignorant persons who when consulted will give their verdict without knowledge. So they will go astray and will lead the people astray",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

These verses establish a divine command for intellectual rigour. Surah Al-Isra 17:36 states that hearing, sight, and the heart will all be questioned — meaning you are accountable for claims you make. Surah Al-An'am 6:148 warns against following conjecture. Understanding these verses transforms intellectual honesty from a personal virtue into a religious obligation.


**How?**

1. Read Surah Al-Isra (17:36) in Arabic with a reliable English translation and tafsir (Ibn Kathir or Al-Sa'di).
2. Read Surah Al-An'am (6:148) with the same approach.
3. Note the specific warnings: what does Allah say about those who speak without knowledge?
4. Cross-reference with hadith on the severity of speaking without knowledge in matters of deen.
5. Write a personal summary: what do these verses demand of me in my daily speech and online behaviour?` },
        { title: 'Practice categorising your statements: knowledge, opinion, or speculation', done: false,
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
              kind: "quran",
              ref: "Quran 10:36",
              arabic: "إِنَّ الظَّنَّ لَا يُغْنِي مِنَ الْحَقِّ شَيْئًا",
              translation: "Indeed, assumption avails not against the truth at all.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Most people conflate what they know, what they believe, and what they are guessing. This conflation leads to overconfidence, the spread of misinformation, and ultimately accountability before Allah for claims made without basis. Developing the mental habit of categorising your own statements builds the intellectual humility that Islam demands.


**How?**

1. For one full day, pay attention to every claim you make in conversation, messages, or social media.
2. After each statement, mentally tag it: **knowledge** (I have verified evidence), **opinion** (I believe this based on reasoning but am not certain), or **speculation** (I am guessing).
3. Notice how often you state speculation as if it were knowledge.
4. Begin prefacing uncertain statements with honest qualifiers: "I think," "I'm not certain, but," "From what I've read..."
5. Practise this daily for two weeks until the categorisation becomes automatic.` },
        { title: 'Build the habit of saying "I don\'t know" or "I\'m not sure" when appropriate', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:111",
              arabic: "قُلْ هَاتُوا بُرْهَانَكُمْ إِن كُنتُمْ صَادِقِينَ",
              translation: "Say, \"Produce your proof, if you should be truthful.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 71",
              translation: "The Prophet (peace be upon him) said: \"Whoever Allah wants good for, He gives him understanding of the religion.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Imam Malik was once asked forty questions and answered "I don't know" to the majority of them — and he was one of the greatest scholars of Islam. Saying "I don't know" is not weakness; it is a sign of intellectual integrity and fear of Allah. In a culture that rewards confident opinions, this habit is a quiet act of courage.


**How?**

1. The next time someone asks you a question and you are not genuinely certain of the answer, say: "I don't know, but I can find out."
2. Resist the urge to fill silence with guesses or half-remembered information.
3. Notice the social pressure to have an opinion on everything — and consciously resist it.
4. In group discussions, practise saying: "I haven't studied that enough to have a view."
5. Track how often you say "I don't know" in a week — if the number is zero, you are likely overestimating your knowledge.` },
        { title: 'Before sharing any opinion publicly, ask: what is my evidence for this?', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 17:36",
              arabic: "وَلَا تَقْفُ مَا لَيْسَ لَكَ بِهِ عِلْمٌ",
              translation: "And do not pursue that of which you have no knowledge.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 2:111",
              arabic: "قُلْ هَاتُوا بُرْهَانَكُمْ إِن كُنتُمْ صَادِقِينَ",
              translation: "Say, \"Produce your proof, if you should be truthful.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 5",
              translation: "The Prophet (peace be upon him) said: \"It is enough of a lie for a person to narrate everything he hears.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Public statements carry weight and responsibility. The Quran warns against spreading what you have not verified (49:6). Before sharing an opinion — whether on social media, in a meeting, or in a community gathering — the simple question "what is my evidence?" acts as a filter that prevents you from contributing to noise and falsehood.


**How?**

1. Before posting anything on social media, pause and ask: "What is my evidence for this claim?"
2. If your evidence is "I heard someone say it" or "it feels true," do not post.
3. If your evidence is a specific source, verify the source is reliable before sharing.
4. Apply the same standard in meetings and conversations: speak from evidence, not impression.
5. Make it a personal rule: if you cannot cite your source (even informally), you do not share the claim.` },
        { title: 'Review one week of your social media posts or messages for unfounded claims', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 17:36",
              arabic: "وَلَا تَقْفُ مَا لَيْسَ لَكَ بِهِ عِلْمٌ",
              translation: "And do not pursue that of which you have no knowledge. Indeed, the hearing, the sight and the heart — about all those one will be questioned.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Self-audit is the practical application of muhasabah (self-accountability). Reviewing your own recent statements with a critical eye reveals how often you may have spoken without adequate knowledge. This exercise is humbling and corrective — it turns abstract principles into concrete awareness of your actual behaviour.


**How?**

1. Open your social media profiles and messaging apps.
2. Review every post, comment, and message you sent in the past seven days.
3. For each statement that makes a factual claim, ask: was I certain of this when I said it? Could I cite a source?
4. Flag any statements that were speculation presented as fact, forwarded without verification, or opinions stated as certainties.
5. For any flagged items: correct them publicly if they were public, and make a note to apply the evidence filter going forward.
6. Repeat this audit monthly until the habit of evidence-based speech becomes natural.` },
      ],
    },
    {
      title: 'Audit your social circle — who is elevating your thinking vs. who is draining it',
      priority: 'medium', tags: ['relationships', 'growth'],
      description: 'The Prophet (peace be upon him) compared a good companion to a perfume seller and a bad one to a blacksmith\'s bellows. Your intellectual environment is shaped by the people you spend time with. This audit helps you become intentional about surrounding yourself with people who challenge and elevate your thinking.',
      subtasks: [
        { title: 'List the 10 people you spend the most time with (in person and online)', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 25:27-29",
              arabic: "وَيَوْمَ يَعَضُّ الظَّالِمُ عَلَىٰ يَدَيْهِ يَقُولُ يَا لَيْتَنِي اتَّخَذْتُ مَعَ الرَّسُولِ سَبِيلًا ۚ يَا وَيْلَتَىٰ لَيْتَنِي لَمْ أَتَّخِذْ فُلَانًا خَلِيلًا",
              translation: "And the Day the wrongdoer will bite on his hands saying, \"Oh, I wish I had taken with the Messenger a way. Oh, woe to me! I wish I had not taken that one as a friend.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 4833",
              translation: "The Prophet (peace be upon him) said: \"A man follows the religion of his close friend, so let each one of you look at whom he befriends.\"",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

You are the average of the people you spend the most time with — this is not just a motivational cliche but a social reality confirmed by both Islamic teaching and modern psychology.

**How?**

1. Think about the past month. Who did you spend the most time with — in person, on calls, in group chats, or on social media?
2. Write down ten names, including online relationships if they consume significant time.
3. Include family members, colleagues, and friends — anyone who has regular access to your attention.
4. Be honest — this list is for your eyes only.` },
        { title: 'For each person, honestly assess: do they elevate, maintain, or drain your thinking?', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 25:28-29",
              arabic: "يَا وَيْلَتَىٰ لَيْتَنِي لَمْ أَتَّخِذْ فُلَانًا خَلِيلًا ۚ لَّقَدْ أَضَلَّنِي عَنِ الذِّكْرِ بَعْدَ إِذْ جَاءَنِي",
              translation: "Oh, woe to me! I wish I had not taken that one as a friend. He led me away from the remembrance after it had come to me.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 4833",
              translation: "The Prophet (peace be upon him) said: \"A man follows the religion of his close friend, so let each one of you look at whom he befriends.\"",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Not every relationship is harmful or beneficial in the same way. Some people actively sharpen your thinking, some are neutral, and some consistently pull your conversations toward gossip, complaints, or intellectual stagnation. This honest assessment — done with compassion, not judgment — reveals the actual quality of your intellectual environment.


**How?**

1. For each person on your list, ask three questions:
   - After spending time with them, do I feel mentally sharper or duller?
   - Do our conversations tend toward substance (ideas, learning, growth) or toward gossip, complaints, and triviality?
   - Do they challenge my thinking or simply agree with everything I say?
2. Categorise each person as: **elevating** (they make you think better), **maintaining** (neutral — pleasant but not growth-oriented), or **draining** (they leave you mentally fatigued or pulled toward lower thinking).
3. Write this assessment down. Patterns will emerge.` },
        { title: 'Increase time with those who elevate and challenge you intellectually', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 18:28",
              arabic: "وَاصْبِرْ نَفْسَكَ مَعَ الَّذِينَ يَدْعُونَ رَبَّهُم بِالْغَدَاةِ وَالْعَشِيِّ يُرِيدُونَ وَجْهَهُ",
              translation: "And keep yourself patient with those who call upon their Lord in the morning and the evening, seeking His countenance.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6484",
              translation: "The Prophet (peace be upon him) said: \"The example of a good companion and a bad companion is like that of the seller of musk and the one who blows the bellows.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Identifying who elevates you is only useful if you act on it. The scholars of the past would travel great distances to sit with people of knowledge. You likely have elevating people already in your circle — the task is to deliberately increase your exposure to them, because intellectual growth happens through proximity and conversation.


**How?**

1. From your "elevating" list, choose 2-3 people to invest more time in.
2. Schedule regular catch-ups: a weekly coffee, a monthly dinner, a standing phone call.
3. Propose intellectually stimulating activities: read a book together, attend a lecture, start a study circle.
4. In conversations, bring substantive topics — ask about what they are learning, working on, or thinking about.
5. Be the kind of companion you want to attract: come prepared with ideas and questions.` },
        { title: 'Set boundaries with those who consistently drain your cognitive energy', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 58:22",
              arabic: "لَّا تَجِدُ قَوْمًا يُؤْمِنُونَ بِاللَّهِ وَالْيَوْمِ الْآخِرِ يُوَادُّونَ مَنْ حَادَّ اللَّهَ وَرَسُولَهُ",
              translation: "You will not find a people who believe in Allah and the Last Day having affection for those who oppose Allah and His Messenger.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 4833",
              translation: "The Prophet (peace be upon him) said: \"A man follows the religion of his close friend, so let each one of you look at whom he befriends.\"",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Setting boundaries is not about being unkind — it is about stewardship of the intellect Allah entrusted you with. You cannot fulfil your intellectual potential if your prime cognitive hours are consumed by people who drag conversations into gossip, negativity, or triviality. Islam teaches both compassion and wisdom; protecting your mind is wisdom.


**How?**

1. For people in your "draining" category, identify the specific behaviour that drains you (gossip, constant complaining, argumentativeness).
2. You do not need to end relationships — simply restructure them:
   - Reduce frequency of contact gradually.
   - When conversations drift toward draining patterns, redirect: "Let's talk about something we're learning."
   - Set time limits on interactions: "I have 20 minutes — what's the most important thing?"
3. For online relationships that drain you: mute, unfollow, or leave group chats that consistently produce low-value content.
4. If someone is both a family obligation and a cognitive drain, limit interactions to what is necessary for maintaining ties of kinship (silat al-rahim) while protecting your deeper intellectual time.` },
        { title: 'Seek out one new relationship with someone whose intellect you admire', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 18:28",
              arabic: "وَاصْبِرْ نَفْسَكَ مَعَ الَّذِينَ يَدْعُونَ رَبَّهُم بِالْغَدَاةِ وَالْعَشِيِّ يُرِيدُونَ وَجْهَهُ",
              translation: "And keep yourself patient with those who call upon their Lord in the morning and the evening, seeking His countenance.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6484",
              translation: "The Prophet (peace be upon him) said: \"The example of a good companion and a bad companion is like that of the seller of musk and the one who blows the bellows.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Growth requires exposure to people who are ahead of you. The Islamic tradition of seeking out teachers, scholars, and mentors is built on the understanding that knowledge is transmitted through relationships, not just books. Finding one person whose intellect you genuinely admire — and building a real relationship with them — can shift the trajectory of your thinking.


**How?**

1. Identify someone whose thinking, writing, or work you deeply respect. This could be a scholar, author, professional, or community leader.
2. If they are accessible (local, active online), reach out with a genuine and specific message: mention what you admire about their work and ask a thoughtful question.
3. Attend their lectures, classes, or events. Be present and engaged.
4. Offer value before asking for their time — share their work, volunteer for their projects, or bring them useful information.
5. Be patient — meaningful intellectual relationships develop over months, not days.
6. If the person is not directly accessible, find someone in your community who embodies similar qualities.` },
      ],
    },
  ],

  intellect_cognitive_growth: [
    {
      title: 'Implement "Deep Work" sessions — 90-minute uninterrupted focus blocks, 3×/week minimum',
      priority: 'high', tags: ['focus', 'deep-work'],
      description: 'Deep, sustained concentration is the engine of all meaningful intellectual output. The modern world fragments attention by design. Scheduling protected deep work sessions — with phone off, door closed, and a single task — is how you reclaim the cognitive power that distraction steals.',
      subtasks: [
        { title: 'Block three 90-minute deep work sessions in your weekly calendar', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 23:3",
              arabic: "وَالَّذِينَ هُمْ عَنِ اللَّغْوِ مُعْرِضُونَ",
              translation: "And those who turn away from ill speech (vain talk).",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

What is not scheduled does not happen. Deep work requires protected time — if you wait for a "free 90 minutes" to appear, it never will. Blocking these sessions in your calendar treats them with the same seriousness as a meeting or appointment, because the work of your intellect deserves at least that much respect.


**How?**

1. Open your weekly calendar and identify three time slots where you are typically at your cognitive best (often morning hours).
2. Block each slot as a 90-minute appointment labelled "Deep Work — Do Not Schedule Over."
3. Choose non-consecutive days to allow recovery between sessions (e.g., Sunday, Tuesday, Thursday).
4. Set the calendar event to recur weekly so it becomes a permanent fixture.
5. Treat these blocks as immovable — if someone asks to meet during deep work time, offer an alternative slot.` },
        { title: 'Create a pre-session ritual: make wudu, set niyyah, silence devices', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6311",
              translation: "The Prophet (peace be upon him) would begin his work after Fajr prayer. Making wudu and setting intention before deep work follows the prophetic pattern of beginning important activities with purification and niyyah.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Rituals signal to your brain that a specific mode of operation is beginning. Making wudu purifies and focuses you; setting niyyah (intention) transforms your work from a secular activity into an act of worship; silencing devices removes the primary source of interruption. Together, these create a threshold between ordinary time and deep work time.


**How?**

1. Design a 5-minute pre-session ritual:
   - Make wudu (even if you already have it — the act itself centres you).
   - Set your niyyah silently or aloud: "I intend this work for the sake of Allah and to develop the intellect He entrusted me with."
   - Place your phone in another room or in a locked drawer, on airplane mode.
   - Close all browser tabs and applications unrelated to the session's task.
   - Take three deep breaths and begin.
2. Perform this ritual identically before every session until it becomes automatic.
3. The consistency of the ritual is more important than its length — keep it simple and repeatable.` },
        { title: 'Choose one single task per session — no multitasking', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 94:5-6",
              arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ۚ إِنَّ مَعَ الْعُسْرِ يُسْرًا",
              translation: "For indeed, with hardship comes ease. Indeed, with hardship comes ease.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
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
              translation: "The Prophet (peace be upon him) said: \"The most beloved deeds to Allah are those done consistently, even if they are small.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Multitasking is a myth — what actually happens is rapid task-switching, which degrades the quality of every task and leaves cognitive residue that reduces your focus for up to 20 minutes after each switch. Choosing one task per deep work session allows your full cognitive capacity to be directed at a single problem, which is where breakthroughs happen.


**How?**

1. Before each deep work session (ideally the night before), write down the single task you will focus on.
2. The task should be specific and challenging enough to require 90 minutes of real effort. "Work on project" is too vague; "Draft the introduction and first section of the proposal" is specific.
3. Write the task on a sticky note and place it where you can see it during the session.
4. If your mind wanders to another task, write it on a separate "capture list" and immediately return to your primary task.
5. Do not switch tasks mid-session under any circumstances — even if you feel stuck. Sitting with difficulty is part of the practice.` },
        { title: 'Track what you produce in each session to build evidence of the practice\'s value', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 39:9",
              arabic: "قُلْ هَلْ يَسْتَوِي الَّذِينَ يَعْلَمُونَ وَالَّذِينَ لَا يَعْلَمُونَ",
              translation: "Say, \"Are those who know equal to those who do not know?\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6464",
              translation: "The Prophet (peace be upon him) said: \"The most beloved deeds to Allah are those done consistently, even if they are small.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Tracking output serves two purposes: it provides accountability (you can see whether your sessions are genuinely productive or merely time spent at a desk), and it builds a body of evidence that motivates you to continue. When you can see that three deep work sessions produced a complete draft, a working prototype, or a chapter of study, the practice sells itself.


**How?**

1. Create a simple "Deep Work Log" — a notebook page, spreadsheet, or note with columns for: date, task, output, and quality rating (1-5).
2. Immediately after each session, record what you produced. Be specific: "Wrote 1,200 words of chapter 3" not "Worked on chapter."
3. Rate the session quality: 5 = flow state, high output; 1 = distracted, low output.
4. Review your log weekly. Calculate your average output per session.
5. After one month, you will have concrete evidence of what deep work produces — use this to justify protecting these sessions fiercely.` },
        { title: 'Gradually increase to 5 sessions per week as the habit solidifies', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 94:7",
              arabic: "فَإِذَا فَرَغْتَ فَانصَبْ",
              translation: "So when you have finished your duties, then stand up for worship. The principle of increasing devotion in one's work applies to deepening one's focus practice.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Three sessions per week is the minimum effective dose, but five sessions — roughly one per working day — is where deep work transforms from a practice into a way of life. The scholars who produced great works did not concentrate in sporadic bursts; they maintained sustained, daily intellectual effort. Gradual increase prevents burnout while building towards that standard.


**How?**

1. After four weeks of consistently completing three sessions per week, add a fourth session.
2. After another two weeks of four consistent sessions, add a fifth.
3. If you miss sessions or feel fatigued, hold at your current level rather than pushing forward — sustainability matters more than speed.
4. Vary the tasks across sessions to maintain freshness: some sessions for creative work, some for analytical work, some for learning.
5. Protect at least two days per week as deep-work-free for rest and lighter tasks.
6. Your target cadence: five 90-minute sessions per week = 7.5 hours of deep, focused work — more than most people achieve in a full work week.` },
      ],
    },
    {
      title: 'Begin a memorisation practice — Quran, hadith, or technical material (30 minutes/day)',
      priority: 'high', tags: ['memorisation', 'discipline'],
      description: 'Memorisation is the gymnasium of the intellect. The Islamic tradition of hifz (memorisation of the Quran) is the pinnacle, but any regular memorisation practice — hadith, poetry, or technical material — strengthens working memory, focus, and the ability to recall knowledge when it matters.',
      subtasks: [
        { title: 'Choose your memorisation focus: Quran surahs, 40 hadith of Imam Nawawi, or professional material', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 27:92",
              arabic: "**Translation:** I am commanded to recite the Quran.’ Whoever chooses to follow the right path does so for his own good. Say to whoever deviates from it, ‘I am only here to warn.’",
              translation: "I am commanded to recite the Quran.’ Whoever chooses to follow the right path does so for his own good. Say to whoever deviates from it, ‘I am only here to warn.’",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 722",
              translation: "Narrated Abu Huraira:The Prophet (ﷺ) said, \"The Imam is (appointed) to be followed. So do not differ from him, bow when he bows, and say, \"Rabbana-lakal hamd\" if he says \"Sami`a l-lahu liman hamidah\"; and if he prostrates, prostrate (after him), and if he prays sitting, pray sitting all together, and straighten the rows for the prayer, as the straightening of the rows is amongst those things which make your prayer a correct and perfect one. (See Hadith No)",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 377",
              translation: "Narrated Abu Hazim:Sahl bin Sa`d was asked about the (Prophet's) pulpit as to what thing it was made of? Sahl replied: \"None remains alive amongst the people, who knows about it better than I. It was made of tamarisk (wood) of the forest. So and so, the slave of so and so prepared it for Allah's Messenger (ﷺ) . When it was constructed and place (in the Mosque), Allah's Messenger (ﷺ) stood on it facing the Qibla and said 'Allahu Akbar', and the people stood behind him (and led the people in prayer). He recited and bowed and the people bowed behind him. Then he raised his head and stepped back, got down and prostrated on the ground and then he again ascended the pulpit, recited, bowed, raised his head and stepped back, got down and prostrated on the ground. So, this is what I know about the pulpit.\" Ahmad bin Hanbal said, \"As the Prophet (ﷺ) was at a higher level than the people, there is no harm according to the above-mentioned Hadith if the Imam is at a higher level than his followers during the prayers",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1114",
              translation: "Narrated Anas bin Malik:Allah's Messenger (ﷺ) fell down from a horse and his right side was either injured or scratched, so we went to inquire about his health. The time for the prayer became due and he offered the prayer while sitting and we prayed while standing. He said, \"The Imam is to be followed; so if he says Takbir, you should also say Takbir, and if he bows you should also bow; and when he lifts his head you should also do the same and if he says: Sami`a l-lahu liman hamidah (Allah hears whoever sends his praises to Him) you should say: Rabbana walakal-Hamd (O our Lord! All the praises are for You.\") (See Hadith No. 656 Vol)",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Starting without a clear focus leads to scattered effort and abandonment. Choosing your memorisation material deliberately — based on your spiritual needs, professional requirements, and current capacity — ensures that your daily investment compounds toward a meaningful goal rather than dissipating across random content.


**How?**

1. Consider three options and choose the one that best fits your current situation:
   - **Quran surahs**: Begin with Juz Amma (the 30th Juz) if you have not memorised it, or continue from where you left off. This is the highest priority for any Muslim.
   - **40 Hadith of Imam Nawawi**: A foundational collection that covers the essentials of Islamic practice and belief. Ideal if your Quran memorisation is already underway.
   - **Professional material**: Frameworks, formulas, technical standards, or vocabulary critical to your field. Choose this if professional competence is your most urgent need.
2. Write down your choice and your specific target (e.g., "Memorise Surah Al-Mulk" or "Memorise all 40 hadith with Arabic and meaning").
3. Commit to this choice for at least 90 days before reassessing.` },
        { title: 'Set a daily 30-minute memorisation window — ideally after Fajr', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5009",
              translation: "The Prophet (peace be upon him) said: \"The likeness of the one who memorises the Quran is that of the owner of hobbled camels. If he tends to them, he keeps them; if he lets them loose, they go away.\" Consistent daily practice is essential for retention.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

 A fixed daily window removes the need for daily decision-making about when to practise.

**How?**

1. Identify a 30-minute window after Fajr prayer and morning adhkar.
2. Block this time in your calendar as a recurring daily event.
3. Prepare your materials the night before: have your mushaf, hadith book, or flashcards ready in your memorisation spot.
4. If after Fajr is genuinely not feasible (shift work, young children), choose the next best time when your mind is fresh — but commit to it being the same time every day.
5. Start with the 30-minute block even if you feel you can do more — consistency matters more than duration at this stage.` },
        { title: 'Use spaced repetition: review previous material before adding new content', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5009",
              translation: "The Prophet (peace be upon him) said: \"Keep on reciting the Quran, for by Him in Whose Hand my soul is, the Quran runs away faster than camels that are released from their tying ropes.\" Reviewing previous material before adding new content is the prophetic method of retention.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The forgetting curve is ruthless — without systematic review, you lose most of what you memorise within days. Spaced repetition (reviewing material at increasing intervals) is the most evidence-based method for long-term retention. The huffaz (Quran memorisers) of the past maintained their memorisation through daily murajaah (review) — the same principle applies to any memorisation practice.


**How?**

1. Divide your 30-minute session into two parts: **review** (first 15-20 minutes) and **new material** (last 10-15 minutes).
2. For Quran: review the last 5 pages you memorised before learning new ayat. For hadith or technical material: use flashcards (Anki is excellent for spaced repetition).
3. Follow the spaced repetition schedule:
   - New material: review the next day, then after 3 days, then after 7 days, then after 14 days, then monthly.
4. Never add new material if your previously memorised content is shaky — strengthen the foundation first.
5. Track what you have memorised and when it is next due for review using a simple chart or the Anki app.` },
        { title: 'Find a memorisation partner or teacher for accountability and correction', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 75:17-18",
              arabic: "إِنَّ عَلَيْنَا جَمْعَهُ وَقُرْآنَهُ ۚ فَإِذَا قَرَأْنَاهُ فَاتَّبِعْ قُرْآنَهُ",
              translation: "Indeed, upon Us is its collection and its recitation. So when We have recited it, then follow its recitation.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 29:49",
              arabic: "بَلْ هُوَ آيَاتٌ بَيِّنَاتٌ فِي صُدُورِ الَّذِينَ أُوتُوا الْعِلْمَ",
              translation: "Rather, it is distinct verses preserved within the breasts of those who have been given knowledge.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5027",
              translation: "The Prophet (peace be upon him) said: \"The best of you is the one who learns the Quran and teaches it.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Solo memorisation is prone to two failures: errors that go uncorrected and motivation that fades without accountability. The Islamic tradition of learning always involved a teacher (sheikh) and study companions (zumalaa). A partner or teacher catches mistakes you cannot hear yourself, holds you accountable to your schedule, and transforms a solitary discipline into a shared journey.


**How?**

1. For Quran memorisation: find a local hifz circle, masjid programme, or an online teacher who offers one-on-one recitation correction. Even a weekly check-in is valuable.
2. For hadith or technical material: find a study partner who is memorising the same material and schedule weekly recitation sessions where you test each other.
3. If no local options exist, use online platforms: many institutes offer affordable one-on-one Quran memorisation sessions with qualified teachers.
4. Agree on a specific accountability structure: how often you meet, what you will review, and what happens when one person falls behind.
5. The relationship should be supportive but honest — a partner who never corrects you is not helping you.` },
        { title: 'Test yourself weekly and track cumulative progress', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 54:17",
              arabic: "وَلَقَدْ يَسَّرْنَا الْقُرْآنَ لِلذِّكْرِ فَهَلْ مِن مُّدَّكِرٍ",
              translation: "And We have certainly made the Quran easy for remembrance, so is there any who will remember?",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5027",
              translation: "The Prophet (peace be upon him) said: \"The best of you is the one who learns the Quran and teaches it.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Testing is not just assessment — it is one of the most powerful learning techniques. The "testing effect" shows that actively retrieving information from memory strengthens it far more than passive review. Weekly testing reveals exactly where your memorisation is solid and where it is weak, allowing you to direct your review time effectively.


**How?**

1. Set aside one session per week (Friday is a good choice) as a pure testing session — no looking at the text.
2. Recite or write from memory everything you have memorised so far. For Quran, recite to your partner or teacher without looking. For other material, use blank flashcards or write from memory.
3. Mark every point where you hesitated, made an error, or forgot.
4. Focus your next week's review on the weak points identified in the test.
5. Track your cumulative progress: total ayat memorised, total hadith memorised, or total pages of technical material committed to memory.
6. Celebrate milestones — completing a surah, finishing the 40 hadith, or mastering a full chapter of technical content.` },
      ],
    },
    {
      title: 'Practice deliberate rest — schedule complete cognitive rest (no inputs) one day per week',
      priority: 'medium', tags: ['rest', 'balance'],
      description: 'The mind, like the body, needs recovery to perform. Continuous input without rest leads to cognitive fatigue, reduced creativity, and burnout. Scheduling a full day of cognitive rest — no reading, no screens, no problem-solving — allows your subconscious to consolidate learning and restore sharpness.',
      subtasks: [
        { title: 'Choose one day per week as your cognitive rest day', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 7:31",
              arabic: "وَكُلُوا وَاشْرَبُوا وَلَا تُسْرِفُوا",
              translation: "Eat and drink, but be not excessive.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 73:20",
              arabic: "عَلِمَ أَن لَّن تُحْصُوهُ فَتَابَ عَلَيْكُمْ ۖ فَاقْرَءُوا مَا تَيَسَّرَ مِنَ الْقُرْآنِ",
              translation: "He knew that you would not be able to do it and has turned to you in forgiveness, so recite what is easy of the Quran.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6464",
              translation: "The Prophet (peace be upon him) said: \"The most beloved deeds to Allah are those done consistently, even if they are small.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Without a designated day, rest becomes accidental — and accidental rest is usually just low-quality distraction disguised as relaxation. Choosing a specific day creates a rhythm of exertion and recovery that mirrors the natural cycles Allah built into creation. The body has rights over you, as the Prophet (peace be upon him) reminded a companion who was fasting and praying without rest.


**How?**

1. Review your weekly schedule and identify the day that is most naturally suited to rest — often Friday (already a day of congregation and family) or Saturday.
2. Commit to this day as your cognitive rest day for at least one month before evaluating.
3. Inform your family and close colleagues: "This day is my rest day — I will not be doing intellectual work."
4. Block the entire day in your calendar so no meetings or work creeps in.
5. If a full day feels impossible due to obligations, start with half a day and expand.` },
        { title: 'Plan restful activities: nature walks, family time, naps, light cooking', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 16:80",
              arabic: "**Translation:** And Allāh has made for you from your homes a place of rest and made for you from the hides of the animals tents which you find light on your day of travel and your day of encampment; and from their wool, fur and hair is furnishing and enjoyment [i.e., provision] for a time.",
              translation: "And Allāh has made for you from your homes a place of rest and made for you from the hides of the animals tents which you find light on your day of travel and your day of encampment; and from their wool, fur and hair is furnishing and enjoyment [i.e., provision] for a time.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1901",
              translation: "Narrated Anas bin Malik: The Prophet (peace be upon him) used to take a midday nap (qaylulah). Anas said: \"Um Sulaim used to spread a leather sheet for the Prophet and he would take a midday nap on that leather sheet at her home.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Rest does not mean doing nothing — it means doing things that restore rather than deplete your cognitive resources. Nature, physical movement, social connection, and creative manual activities like cooking all replenish the mind without demanding the kind of focused attention that work requires. Planning these activities prevents the rest day from devolving into mindless screen time.


**How?**

1. Create a menu of restful activities you enjoy. Examples:
   - Nature walks or hikes
   - Quality family time — playing with children, visiting parents, sharing a meal
   - Naps (the Prophetic Sunnah of qaylulah — midday rest)
   - Light cooking or baking
   - Gardening or light physical work
   - Visiting friends or neighbours
2. The evening before your rest day, choose 2-3 activities from your menu.
3. Keep the day loosely structured — avoid packing it with activities, which defeats the purpose.
4. The key criterion: does this activity restore me, or does it demand concentration?` },
        { title: 'Commit to no screens, no news, no work-related reading on that day', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 7:31",
              arabic: "وَلَا تُسْرِفُوا ۚ إِنَّهُ لَا يُحِبُّ الْمُسْرِفِينَ",
              translation: "And be not excessive. Indeed, He likes not those who commit excess.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6464",
              translation: "The Prophet (peace be upon him) said: \"The most beloved deeds to Allah are those done consistently, even if they are small.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Screens and news are cognitive stimulants — they demand attention, trigger emotional reactions, and keep your mind in processing mode. True cognitive rest requires removing these inputs so your brain can shift from "consumption mode" to "consolidation mode." This is when your subconscious integrates the week's learning and generates the creative connections that conscious effort cannot produce.


**How?**

1. On your rest day, place your phone in a drawer or another room. If you need to be reachable for emergencies, set it to allow calls from favourites only.
2. Do not open your laptop, tablet, or any work-related application.
3. Avoid news entirely — no websites, no TV news, no news podcasts.
4. If you feel the urge to check something, write it on a sticky note to look up the next day.
5. For the first few rest days, you may feel anxious or restless — this is withdrawal, and it passes. The discomfort is evidence of how much your mind needed the break.` },
        { title: 'Notice the difference in your energy and clarity the following day', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 94:5-6",
              arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ۚ إِنَّ مَعَ الْعُسْرِ يُسْرًا",
              translation: "For indeed, with hardship comes ease. Indeed, with hardship comes ease.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6464",
              translation: "The Prophet (peace be upon him) said: \"The most beloved deeds to Allah are those done consistently, even if they are small.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The proof of rest's value is in the day that follows. If you have rested properly, Monday (or the day after your rest day) will feel markedly different — sharper, more creative, more energised. Noticing this difference consciously reinforces the habit and provides the motivation to protect your rest day when competing demands arise.


**How?**

1. On the day after your rest day, before starting work, spend five minutes journaling:
   - How do I feel mentally? Rate your clarity on a scale of 1-10.
   - How does this compare to a typical morning after a day of screen time?
   - Did any ideas or insights surface overnight or during rest?
2. Track this rating weekly for a month.
3. Compare your post-rest-day clarity ratings with your regular-day ratings.
4. If you notice a consistent improvement (most people do), you now have personal evidence that rest is not laziness but a performance strategy.
5. Use this evidence to defend your rest day when someone asks you to work on it.` },
      ],
    },
    {
      title: 'Study the science of habit formation — design your environment for intellectual work',
      priority: 'medium', tags: ['habit', 'environment-design'],
      description: 'Your environment shapes your behaviour more than your willpower does. Studying habit formation science — cue, routine, reward — and then redesigning your physical and digital environment to support intellectual work removes friction from good habits and adds friction to bad ones.',
      subtasks: [
        { title: 'Read "Atomic Habits" by James Clear or a comparable evidence-based resource', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 13:11",
              arabic: "إِنَّ اللَّهَ لَا يُغَيِّرُ مَا بِقَوْمٍ حَتَّىٰ يُغَيِّرُوا مَا بِأَنفُسِهِمْ",
              translation: "Indeed, Allah will not change the condition of a people until they change what is in themselves.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6464",
              translation: "The Prophet (peace be upon him) said: \"The most beloved deeds to Allah are those done consistently, even if they are small.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Understanding the mechanics of habit formation — cue, craving, response, reward — gives you a framework for deliberately building good habits and breaking bad ones. Without this knowledge, you are relying on willpower alone, which is a finite resource that depletes under stress. A structured understanding of habit science is a force multiplier for every other intellectual practice you are building.


**How?**

1. Obtain a copy of "Atomic Habits" by James Clear (book, audiobook, or e-book) or an alternative such as "The Power of Habit" by Charles Duhigg.
2. Schedule reading time — this can be part of your daily reading habit from the Core tier.
3. As you read, take notes on the key frameworks:
   - The habit loop (cue → craving → response → reward)
   - The four laws of behaviour change (make it obvious, attractive, easy, satisfying)
   - Identity-based habits (who you want to become, not just what you want to do)
4. After finishing, write a one-page summary of the principles most relevant to your intellectual goals.` },
        { title: 'Audit your physical workspace — does it support deep focus or invite distraction?', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (peace be upon him) said: \"Whoever takes a path in search of knowledge, Allah will make easy for him the path to Paradise.\" Designing one's physical space to support learning is part of taking that path.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Your physical environment is a silent partner in every intellectual task. A cluttered desk with a phone in sight and a TV nearby is an environment designed for distraction, regardless of your intentions. Auditing your workspace with fresh eyes reveals the environmental factors that are silently undermining or supporting your cognitive performance.


**How?**

1. Sit at your primary workspace and look around with the eyes of an environment designer.
2. Ask for each element you see:
   - Does this **support** deep focus? (Good lighting, clean desk, reference books)
   - Does this **invite distraction**? (Phone in sight, TV visible, social media open on a tab)
   - Is this **neutral**? (Decoration, furniture)
3. List every distraction-inviting element.
4. List every missing element that would support focus (e.g., good lighting, a timer, noise-cancelling headphones, a dedicated Quran stand).
5. Take a photo of your workspace as a "before" reference.` },
        { title: 'Redesign your workspace: remove distractions, add cues for learning and focus', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 23:3",
              arabic: "وَالَّذِينَ هُمْ عَنِ اللَّغْوِ مُعْرِضُونَ",
              translation: "And those who turn away from ill speech (vain talk). Removing distractions and adding cues for learning reflects the Quranic principle of turning away from what does not benefit.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Knowing what is wrong is not the same as fixing it. This step is about taking physical action — removing what distracts and adding what supports. The environment you sit in every day should make deep work the path of least resistance. Small changes (moving your phone charger to another room, placing a book on your desk) produce outsized effects on daily behaviour.


**How?**

1. Remove or relocate every distraction-inviting element from your audit:
   - Move your phone charger to another room.
   - Turn your desk away from the TV or cover the TV.
   - Remove unnecessary clutter from your desk surface.
2. Add cues for intellectual work:
   - Place the book you are currently reading on your desk.
   - Set up a dedicated Quran stand if you recite at your workspace.
   - Put a timer (physical or app) prominently in view for deep work sessions.
   - Add good task lighting if your current lighting is poor.
3. Create a "focus station" — a specific configuration of your desk that signals "deep work mode."
4. Take an "after" photo and compare with the "before."` },
        { title: 'Audit your digital environment — notifications, app layout, default browser tabs', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 7:31",
              arabic: "وَلَا تُسْرِفُوا إِنَّهُ لَا يُحِبُّ الْمُسْرِفِينَ",
              translation: "And be not excessive. Indeed, He does not like those who commit excess. Auditing digital consumption for excess is an act of moderation.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Your digital environment is as influential as your physical one — perhaps more so, given how much time you spend in it. Every notification is an interruption. Every app on your home screen is a cue. Every default browser tab is a suggestion. Auditing and redesigning your digital environment applies the same habit-science principles to the virtual spaces where you spend hours daily.


**How?**

1. **Phone audit:**
   - Go to Settings → Notifications and disable notifications for every app except calls, messages from close family, and your calendar.
   - Reorganise your home screen: only essential tools on the first screen; move social media and entertainment apps to a folder on the last screen.
   - Set your phone to greyscale mode to reduce its visual appeal.
2. **Computer audit:**
   - Set your browser's default homepage to a blank page or a beneficial site (your task manager, a Quran app).
   - Install a website blocker and block your top time-wasting sites during work hours.
   - Close all unnecessary tabs before starting any work session.
3. **Communication audit:**
   - Mute all non-essential group chats.
   - Set specific times for checking email rather than leaving it open all day.` },
        { title: 'Implement 3 specific environment changes and track their impact over 30 days', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 13:11",
              arabic: "إِنَّ اللَّهَ لَا يُغَيِّرُ مَا بِقَوْمٍ حَتَّىٰ يُغَيِّرُوا مَا بِأَنفُسِهِمْ",
              translation: "Indeed, Allah will not change the condition of a people until they change what is in themselves.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
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
              translation: "The Prophet (peace be upon him) said: \"The most beloved deeds to Allah are those done consistently, even if they are small.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Knowledge without application is a tree without fruit — as Imam Al-Ghazali taught. Implementing three specific changes and tracking their impact for 30 days turns theoretical understanding of habit science into lived experience. The tracking provides evidence of what works in your specific context, which is far more valuable than any general advice.


**How?**

1. From your physical and digital audits, choose the three changes you believe will have the highest impact on your intellectual work.
2. Write each change as a specific, measurable action:
   - Example: "Phone charges in the kitchen, not the bedroom" (not "use phone less").
   - Example: "Browser opens to blank page instead of news" (not "reduce browsing").
   - Example: "Desk cleared every evening before bed" (not "keep desk tidy").
3. Implement all three on the same day.
4. Create a simple daily tracker: did you maintain each change today? (Yes/No)
5. After 30 days, assess:
   - Which changes stuck? Which required willpower to maintain?
   - Did your deep work quality or quantity improve?
   - What unexpected benefits or challenges emerged?
6. Keep what works, replace what does not, and begin a new 30-day cycle.` },
      ],
    },
  ],

  intellect_cognitive_excellence: [
    {
      title: 'Achieve a sustained state of flow in your core intellectual work — document your conditions for it',
      priority: 'medium', tags: ['flow', 'mastery'],
      description: 'Flow — the state of complete absorption in a task where time disappears and output soars — is the peak of cognitive performance. Documenting the exact conditions that trigger your flow (time of day, environment, task type, preparation rituals) allows you to reliably reproduce it rather than waiting for it to happen by chance.',
      subtasks: [
        { title: 'Track your flow experiences for 4 weeks — when do they happen, what triggers them?', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 94:5-6",
              arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا * إِنَّ مَعَ الْعُسْرِ يُسْرًا",
              translation: "For indeed, with hardship comes ease. Indeed, with hardship comes ease.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Flow is not random — it has consistent preconditions, but they differ from person to person. Without deliberate tracking, you will experience flow occasionally by accident and never understand why. Four weeks of data reveals your personal flow triggers with enough reliability to design around them. This is the difference between hoping for peak performance and engineering it.


**How?**

1. Create a "Flow Log" with the following columns: date, time, task, duration, environment, energy level beforehand, what you ate/drank, and how you entered the state.
2. Every time you experience flow (complete absorption, loss of time sense, effortless concentration), fill in the log immediately after the session ends.
3. Also log sessions where you expected flow but it did not come — record what was different.
4. Be honest and detailed: "After Fajr, quiet house, black coffee, writing chapter 4, 2.5 hours" is useful. "Morning, writing" is not.
5. Continue for a full four weeks before analysing the data.` },
        { title: 'Identify patterns: time of day, task type, energy level, environment', done: false,
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
              kind: "quran",
              ref: "Quran 94:5-6",
              arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا",
              translation: "For indeed, with hardship comes ease.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6464",
              translation: "The Prophet (peace be upon him) said: \"The most beloved deeds to Allah are those done consistently, even if they are small.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The raw data from your flow log is only valuable once you extract patterns. You may discover that you only enter flow in the morning, or only on creative tasks, or only after physical exercise, or only when you have slept well. These patterns are your personal "flow formula" — once identified, they become the blueprint for engineering peak cognitive performance on demand.


**How?**

1. After four weeks, review your flow log and look for correlations across these dimensions:
   - **Time of day**: Do your flow experiences cluster in the morning, afternoon, or evening?
   - **Task type**: Creative work, analytical work, writing, coding, learning — which tasks trigger flow most?
   - **Energy level**: Were you well-rested, caffeinated, post-exercise, or fasting?
   - **Environment**: Were you at home, in a library, in a coffee shop, alone, or with others?
   - **Preparation**: What did you do in the 30 minutes before flow began?
2. Write down the three to five strongest patterns you observe.
3. Compare your flow sessions with your non-flow sessions: what was present in flow sessions that was absent in the others?` },
        { title: 'Design a "flow protocol" — the sequence of conditions that maximises your chance of entering flow', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6464",
              translation: "The Prophet (peace be upon him) said: \"The most beloved of deeds to Allah are those that are most consistent, even if they are small.\" Designing a consistent protocol for entering flow follows this principle.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A flow protocol transforms random inspiration into a reliable system. Just as your wudu follows a specific sequence that prepares you for salah, your flow protocol is a specific sequence that prepares your mind for peak performance. Having a written protocol means you do not need to rely on motivation or luck — you follow the steps and let the conditions do their work.


**How?**

1. Based on your identified patterns, write a step-by-step protocol. Example:
   - **The night before**: Choose tomorrow's deep work task. Prepare materials. Sleep by 10:30 PM.
   - **Morning**: Wake for Fajr. Pray, adhkar, light breakfast. No phone.
   - **T-minus 15 minutes**: Make coffee/tea. Clear desk. Open only the relevant document/tool.
   - **T-minus 5 minutes**: Set phone to airplane mode. Set a 90-minute timer (visible but not audible). Make wudu.
   - **Begin**: Start with the easiest entry point into the task (e.g., re-read the last paragraph you wrote).
2. The protocol should be specific enough that you can follow it mechanically, even on days when motivation is low.
3. Include environmental conditions: where you sit, what you drink, ambient noise level.
4. Print the protocol and keep it at your workspace.` },
        { title: 'Test the protocol deliberately over 2 weeks and refine', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2664",
              translation: "The Prophet (peace be upon him) said: \"The strong believer is better and more beloved to Allah than the weak believer, while there is good in both.\" Deliberately refining one's capacity for deep work is an act of becoming stronger.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

No protocol is perfect on the first draft. Testing it deliberately — following it exactly for two weeks while tracking results — reveals what works, what is unnecessary, and what is missing. This iterative refinement is how you move from a theoretical flow protocol to a battle-tested system that works reliably in your real life.


**How?**

1. For two weeks (10 working days), follow your flow protocol exactly before every deep work session.
2. After each session, record in your flow log:
   - Did you enter flow? (Yes / Partial / No)
   - How long did the flow state last?
   - Which protocol step felt most important?
   - Which step felt unnecessary or was difficult to execute?
   - What unexpected factor helped or hindered?
3. After two weeks, review all ten entries.
4. Revise the protocol:
   - Remove steps that had no effect.
   - Strengthen steps that were consistently present in successful sessions.
   - Add any new elements you discovered.
5. Test the revised protocol for another week to confirm the improvements.` },
        { title: 'Write a personal "flow manual" you can reference and share', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 96:3-5",
              arabic: "اقْرَأْ وَرَبُّكَ الْأَكْرَمُ ۚ الَّذِي عَلَّمَ بِالْقَلَمِ ۚ عَلَّمَ الْإِنسَانَ مَا لَمْ يَعْلَمْ",
              translation: "Read, and your Lord is the Most Generous — who taught by the pen — taught man that which he knew not.",
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

A written manual crystallises your hard-won self-knowledge into a durable, shareable format. It serves as a reference when you fall out of practice, a guide you can return to during periods of low motivation, and a resource you can share with others pursuing their own intellectual excellence. In the Islamic tradition, beneficial knowledge that is shared continues to earn reward.


**How?**

1. Write a 1-2 page document titled "My Flow Manual" containing:
   - **My flow profile**: When, where, and how I enter flow (based on your data).
   - **My flow protocol**: The step-by-step preparation sequence.
   - **My flow killers**: The specific conditions or behaviours that prevent flow (e.g., checking phone before starting, insufficient sleep, vague task definition).
   - **Recovery protocol**: What to do when flow is not coming despite following the protocol.
   - **Lessons learnt**: Key insights from the tracking and testing process.
2. Store this document where you can access it easily — printed at your desk and saved digitally.
3. Review and update it quarterly as your understanding deepens.
4. Share it with a colleague, study partner, or mentee who might benefit.` },
      ],
    },
    {
      title: 'Develop an original intellectual framework or model grounded in Islamic principles',
      priority: 'low', tags: ['original-thinking', 'contribution'],
      description: 'The highest expression of Hifz al-Aql is not merely preserving the intellect but using it to produce original contributions to human knowledge. Developing a framework that integrates Islamic principles with contemporary challenges is both an act of scholarship and a form of da\'wah through intellectual excellence.',
      subtasks: [
        { title: 'Identify a gap in existing frameworks — where does current thinking fall short?', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:269",
              arabic: "يُؤْتِي الْحِكْمَةَ مَن يَشَاءُ ۚ وَمَن يُؤْتَ الْحِكْمَةَ فَقَدْ أُوتِيَ خَيْرًا كَثِيرًا",
              translation: "He gives wisdom to whom He wills, and whoever has been given wisdom has certainly been given much good.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 3:190-191",
              arabic: "إِنَّ فِي خَلْقِ السَّمَاوَاتِ وَالْأَرْضِ وَاخْتِلَافِ اللَّيْلِ وَالنَّهَارِ لَآيَاتٍ لِّأُولِي الْأَلْبَابِ",
              translation: "Indeed, in the creation of the heavens and the earth and the alternation of the night and the day are signs for those of understanding.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (peace be upon him) said: \"Whoever takes a path in search of knowledge, Allah will make easy for him a path to Paradise.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Original contribution begins with seeing what others have missed. Every great framework in Islamic intellectual history — from Al-Shatibi's Maqasid to Ibn Khaldun's theory of civilisation — began with someone noticing that existing models failed to explain or address something important. Training yourself to identify gaps is the first skill of original scholarship.


**How?**

1. Choose your domain of expertise or deep interest — the area where you have enough knowledge to see beyond surface-level understanding.
2. List the dominant frameworks or models used in that domain (e.g., leadership models, economic theories, educational approaches).
3. For each framework, ask:
   - What does it explain well?
   - What does it fail to address or actively ignore?
   - Where does it conflict with Islamic principles or human fitrah (natural disposition)?
4. Look for patterns across the gaps — often multiple frameworks share the same blind spot.
5. Write a one-page "gap analysis" describing what is missing and why it matters.` },
        { title: 'Ground your model in Islamic principles — which maqasid or usul does it draw from?', done: false,
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
              ref: "Sahih Muslim 2297",
              translation: "Jabir b. Abdullah reported the Messenger of Allah (ﷺ) as saying:No owner of camels or cattle or flock of sheep or goats who does not pay his due (would be spared punishment) but would be made to sit on the Day of Resurrection on a soft sandy ground and the hoofed animals would trample him with their hoofs and gore him with their horns. And none of them on that day would be without horns, or with broken horns. We said: Messenger of Allah, but what is due on them? He said: Lending of the male (for use) and lending of the bucket (used for drawing water for them) and for mating and milking them near water and providing them as a ride for the sake of Allah. And no owner of the property who does not pay Zakat (would be spared punishment) but it (his property) would turn into a bald snake and would follow its owner wherever he would go, and he would run away from it, and it would be said to him: That is your property about which you were stingy. And when he would find no other way out he would thrust his hand in its mouth and it would gnaw it like a male camel",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

An Islamic intellectual framework is not a secular framework with Quranic quotes attached — it must be genuinely rooted in Islamic epistemology, ethics, and ontology. Grounding your model in specific maqasid (objectives of the Shariah), usul (principles of jurisprudence), or Quranic concepts gives it authenticity, depth, and a foundation that secular frameworks lack: a connection to revealed truth.


**How?**

1. Review the gap you identified and ask: which Islamic principle directly addresses this gap?
2. Study the relevant Islamic sources:
   - **Maqasid al-Shariah**: Does your framework serve the preservation of faith, life, intellect, family, or wealth?
   - **Usul al-Fiqh**: Are there principles of Islamic jurisprudence (maslahah, istihsan, urf) that provide methodological grounding?
   - **Quranic concepts**: Which Quranic terms and ideas (tawakkul, ihsan, khilafah, amanah) form the conceptual backbone?
3. Consult classical scholars who wrote on the topic — Ibn Khaldun, Al-Ghazali, Al-Shatibi, Ibn Taymiyyah.
4. Write a one-page "Islamic grounding statement" that connects your framework to its Islamic roots explicitly.` },
        { title: 'Draft the framework with clear definitions, components, and relationships', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:269",
              arabic: "يُؤْتِي الْحِكْمَةَ مَن يَشَاءُ وَمَن يُؤْتَ الْحِكْمَةَ فَقَدْ أُوتِيَ خَيْرًا كَثِيرًا",
              translation: "He gives wisdom to whom He wills, and whoever has been given wisdom has certainly been given much good.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

An idea in your head is not a framework — it becomes one when it is articulated with precision. Clear definitions prevent misunderstanding. Distinct components make it teachable. Explicit relationships between components make it usable. The difference between a vague insight and a genuine intellectual contribution is the rigour of its articulation.


**How?**

1. **Define the framework's purpose**: In one sentence, what does this framework help people do or understand that existing models do not?
2. **Name the framework**: Choose a name that is descriptive and memorable.
3. **Define core terms**: Write a precise definition for every key concept in your framework. Avoid ambiguity.
4. **Identify the components**: What are the 3-7 distinct elements of your framework? Draw them as a diagram.
5. **Map relationships**: How do the components relate to each other? Are they sequential, hierarchical, cyclical, or interdependent?
6. **Create a visual**: Draw the framework as a diagram, matrix, or flowchart — a visual representation forces clarity.
7. **Write the full draft**: 3-5 pages covering purpose, Islamic grounding, components, relationships, and how to apply it.` },
        { title: 'Test the framework by applying it to 3-5 real scenarios', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 71",
              translation: "The Prophet (peace be upon him) said: \"When Allah wishes good for someone, He bestows upon him understanding of the religion.\" Testing a framework against real scenarios is how understanding is deepened.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A framework that only works in theory is not a framework — it is a hypothesis. Testing your model against real scenarios reveals whether it is genuinely useful, where it breaks down, and what adjustments are needed. The Islamic intellectual tradition values 'amal (practice) alongside 'ilm (knowledge) — a framework must work in the real world to be worth sharing.


**How?**

1. Select 3-5 real scenarios from your domain that are diverse enough to test the framework's range:
   - One straightforward scenario where you expect the framework to work well.
   - One complex scenario with multiple variables.
   - One edge case or unusual situation that challenges the framework.
2. For each scenario, apply your framework step by step:
   - Does it provide useful insight that existing models do not?
   - Does it produce actionable guidance?
   - Where does it feel strained or incomplete?
3. Document each application: the scenario, how the framework was applied, the result, and any limitations discovered.
4. Be ruthlessly honest — a framework that fails a test is not a failure; it is an opportunity to refine.` },
        { title: 'Seek critique from both Islamic scholars and domain experts', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 26:197",
              arabic: "**Translation:** Is it not a sign to them that the learned scholars (like ‘Abdullâh bin Salâm رضي الله عنه who embraced Islâm) of the Children of Israel knew it (as true)?",
              translation: "Is it not a sign to them that the learned scholars (like ‘Abdullâh bin Salâm رضي الله عنه who embraced Islâm) of the Children of Israel knew it (as true)?",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 3:85",
              arabic: "**Translation:** If anyone seeks a religion other than [islam] complete devotion to God, it will not be accepted from him: he will be one of the losers in the Hereafter.",
              translation: "If anyone seeks a religion other than [islam] complete devotion to God, it will not be accepted from him: he will be one of the losers in the Hereafter.",
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
              ref: "Sahih al-Bukhari 1770",
              translation: "Narrated Ibn ' `Abbas:Dhul-Majaz and `Ukaz were the markets of the people during the Pre-Islamic period of ignorance. When the people embraced Islam, they disliked to do bargaining there till the following Holy Verses were revealed:-- There is no harm for you If you seek of the bounty Of your Lord (during Hajj by trading, etc)",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Self-assessment has blind spots. Islamic scholars can evaluate whether your framework's Islamic grounding is sound, while domain experts can evaluate whether it adds genuine value to the field. This dual critique — from both traditions — is what separates a well-intentioned attempt from a rigorous contribution. The scholars of the past subjected their works to peer review long before academia formalised the concept.


**How?**

1. Identify 2-3 people to review your framework:
   - At least one with strong Islamic knowledge (a scholar, student of knowledge, or educated Muslim intellectual).
   - At least one with deep domain expertise in the field your framework addresses.
   - Ideally one who bridges both worlds.
2. Prepare a clear review package: your draft, the Islamic grounding statement, and the 3-5 scenario applications.
3. Ask specific questions: "Is the Islamic grounding authentic?" "Does this add value beyond existing models?" "Where is the reasoning weakest?"
4. Receive feedback with humility — the goal is to strengthen the work, not to defend your ego.
5. Compile all feedback and identify themes: where do multiple reviewers agree on a weakness?` },
        { title: 'Refine and publish the framework', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 55:1-4",
              arabic: "الرَّحْمَٰنُ ۚ عَلَّمَ الْقُرْآنَ ۚ خَلَقَ الْإِنسَانَ ۚ عَلَّمَهُ الْبَيَانَ",
              translation: "The Most Merciful — taught the Quran — created man — taught him eloquence.",
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

Knowledge that remains in your notebook benefits only you. Publishing your framework — whether as an article, a talk, a blog post, or a formal paper — extends its benefit to others and invites further refinement from a wider audience.

**How?**

1. Incorporate the feedback from your reviewers into a revised draft.
2. Choose an appropriate publication format:
   - **Blog post or article**: For accessible, practical frameworks aimed at a general Muslim audience.
   - **Academic paper**: For rigorous, scholarly frameworks aimed at researchers or institutions.
   - **Presentation or lecture**: For frameworks best communicated through teaching and discussion.
   - **Book chapter**: For comprehensive frameworks that require extended treatment.
3. Write the final version with clean prose, clear diagrams, and proper citations for all Islamic and academic sources.
4. Publish and actively share: post on relevant platforms, present at community events, submit to journals or conferences.
5. Remain open to further critique and refinement post-publication — a framework is a living document.` },
      ],
    },
    {
      title: 'Complete a major long-form work requiring 90+ hours of deep cognitive effort',
      priority: 'medium', tags: ['deep-work', 'legacy'],
      description: 'Great intellectual works — books, research projects, complex systems — require sustained effort over months. Completing a 90+ hour deep work project demonstrates mastery of your craft, discipline over your nafs, and the ability to produce something of lasting value. This is the intellect operating at its designed capacity.',
      subtasks: [
        { title: 'Define the project clearly: scope, deliverable, and timeline', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 17:70",
              arabic: "وَلَقَدْ كَرَّمْنَا بَنِي آدَمَ",
              translation: "And We have certainly honoured the children of Adam. Using one's cognitive gifts for a major work honours the trust of intellect.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A major work without clear definition becomes a source of perpetual guilt rather than a meaningful accomplishment. Defining scope prevents the project from expanding endlessly. Naming the deliverable makes the finish line concrete. Setting a timeline creates urgency. Without these three elements, even the most motivated person will drift.


**How?**

1. **Scope**: Write a one-paragraph description of what the project includes and — equally important — what it does not include. "I am writing a 200-page book on Islamic financial literacy for young professionals. It does not cover advanced fiqh of transactions or institutional finance."
2. **Deliverable**: Name the specific output. "A completed manuscript ready for editing" is concrete. "A book" is vague.
3. **Timeline**: Work backwards from your desired completion date:
   - Estimate total hours required (90+ for this tier).
   - Divide by your available deep work hours per week.
   - Add a 30% buffer for delays, illness, and life.
   - Set a realistic deadline.
4. Write these three elements on a single page and post it where you work.` },
        { title: 'Break the project into phases with milestones every 15-20 hours of work', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6464",
              translation: "The Prophet (peace be upon him) said: \"The most beloved of deeds to Allah are those that are most consistent, even if they are small.\" Breaking a large project into steady milestones follows this principle.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A 90-hour project is overwhelming as a single block — but five 18-hour phases are each manageable. Milestones every 15-20 hours give you regular moments of completion and progress, which sustain motivation over months. They also serve as checkpoints where you can assess quality, adjust direction, and celebrate legitimate progress.


**How?**

1. Divide your project into 5-6 major phases, each representing a natural stage of the work:
   - Example for a book: Research → Outline → Draft chapters 1-4 → Draft chapters 5-8 → Revision → Final edit.
   - Example for a software system: Architecture → Core module → Secondary features → Testing → Documentation → Deployment.
2. Assign each phase an estimated hour range (15-20 hours).
3. Define a clear milestone for each phase — what is the tangible output that proves this phase is complete?
4. Set a target date for each milestone based on your weekly deep work schedule.
5. Create a visual tracker (a Gantt chart, a simple table, or a wall chart) that shows all phases and milestones at a glance.` },
        { title: 'Schedule dedicated deep work sessions and protect them ruthlessly', done: false,
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
              kind: "quran",
              ref: "Quran 39:9",
              arabic: "قُلْ هَلْ يَسْتَوِي الَّذِينَ يَعْلَمُونَ وَالَّذِينَ لَا يَعْلَمُونَ",
              translation: "Say, \"Are those who know equal to those who do not know?\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6464",
              translation: "The Prophet (peace be upon him) said: \"The most beloved deeds to Allah are those done consistently, even if they are small.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A 90-hour project at five deep work sessions per week (7.5 hours) takes approximately three months. At three sessions per week, it takes nearly five months. The maths is simple, but the execution requires ruthless protection of your scheduled sessions. Every skipped session extends your timeline and erodes momentum. This is where discipline over the nafs is tested most.


**How?**

1. Using your deep work schedule from the Growth tier, designate which sessions are allocated to this project.
2. For the duration of the project, these sessions are non-negotiable — they take priority over meetings, social invitations, and "urgent" tasks that are not truly urgent.
3. Communicate your commitment to those who might encroach on your time: "I am working on a major project and am unavailable during these hours."
4. If you must miss a session, schedule a replacement within the same week — do not let missed sessions accumulate.
5. Post your timeline and milestone tracker where you can see it daily. Visual reminders of the goal sustain commitment when motivation fluctuates.` },
        { title: 'Track your hours and output to maintain accountability', done: false,
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
          ],
          description: `**Why?**

Tracking hours and output serves as both an accountability mechanism and a motivation tool. Without tracking, you may feel you are working hard while actually producing little, or you may underestimate how much you have accomplished. Objective data keeps you honest and reveals your true productivity patterns — how many hours of real deep work you put in versus how many hours you thought you did.


**How?**

1. Create a project log with columns: date, session duration, task worked on, output (specific), cumulative hours.
2. Use a timer during each deep work session — record only actual focused time, not time spent setting up or taking breaks.
3. After each session, record your output specifically: "Wrote 1,500 words of chapter 3" or "Completed database schema for user module."
4. Update your cumulative hours total after every session.
5. Review weekly: are you on pace to hit your next milestone? If not, what needs to change — more sessions, longer sessions, or more focused sessions?
6. Celebrate when you pass cumulative markers: 30 hours, 60 hours, 90 hours. These are real achievements.` },
        { title: 'Complete the project and share it with your intended audience', done: false,
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
              ref: "Sahih al-Bukhari 3461",
              translation: "The Prophet (peace be upon him) said: \"Convey from me, even if it is one verse.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Completion is the threshold between a hobby and a contribution. Many talented people start major works but never finish them. Crossing the finish line — even imperfectly — and sharing the result with your intended audience is an act of courage, generosity, and trust in Allah. A completed work, however flawed, has infinitely more impact than a perfect work that exists only in your mind.


**How?**

1. As you approach the final phase, resist the urge to endlessly revise. Set a firm "pencils down" date and honour it.
2. Complete the final deliverable as defined in your scope: the manuscript, the system, the research paper, the course.
3. Prepare it for sharing: edit for clarity, format properly, and make it accessible to your intended audience.
4. Share it:
   - If it is written work: publish, submit, or distribute to your audience.
   - If it is a system or tool: launch it, even in beta.
   - If it is research: present it at a conference, submit to a journal, or share with your community.
5. Make du'a that Allah places barakah in the work and benefits others through it.` },
        { title: 'Write a retrospective: what did the process teach you about your own cognitive capacity?', done: false,
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
              ref: "Jami at-Tirmidhi 2459",
              translation: "The Prophet (peace be upon him) said: \"A wise person is one who holds himself accountable and works for what comes after death.\"",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The project itself is valuable, but the self-knowledge gained from completing it may be even more so. A retrospective captures what you learnt about your own cognitive strengths, weaknesses, rhythms, and limits. This knowledge makes your next major work easier, faster, and more sustainable. It is also an act of shukr (gratitude) — reflecting on what Allah enabled you to accomplish.


**How?**

1. Within one week of completing the project, sit down and write a 1-2 page retrospective addressing:
   - **What went well**: Which habits, routines, and strategies served you best?
   - **What was harder than expected**: Where did you struggle, and what did you do about it?
   - **What surprised you**: Any unexpected insights about your own cognitive patterns?
   - **Peak moments**: When were you at your absolute best during this project?
   - **Low points**: When did you nearly quit, and what kept you going?
   - **What would you do differently**: If you started this project again, what would you change?
2. Conclude with a section on **cognitive capacity**: what did this project teach you about what you are capable of when you apply sustained, disciplined effort?
3. Store this retrospective alongside your flow manual — it is part of your growing self-knowledge library.
4. Review it before beginning your next major project.` },
      ],
    },
  ],

  // ── PROFESSIONAL MASTERY ──
  intellect_professional_core: [
    {
      title: 'Obtain or verify all certifications and licences required to practise your profession ethically',
      priority: 'urgent', tags: ['credentials', 'ethics'],
      description: 'Practising a profession without proper credentials is a form of deception and can cause harm to those who trust you. Islam demands that you be qualified for the responsibility you carry. This task ensures your professional standing is legitimate and current.',
      subtasks: [
        {
          title: 'List every certification, licence, or registration your profession requires', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6496",
              translation: "The Prophet (peace be upon him) said: \"Allah loves that when one of you does a job, he does it with excellence (itqan).\" Obtaining proper credentials is part of doing one's work with itqan.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

You cannot verify what you haven't identified. Many professionals operate with an incomplete picture of their regulatory landscape — they hold the obvious licence but miss industry-specific registrations, continuing education requirements, or jurisdiction-specific mandates. In Islam, ignorance of an obligation does not excuse you from it.


**How?**

1. Check your country's or state's professional regulatory body website for a complete list of requirements.
2. Ask a senior colleague or your professional association what credentials are standard and which are legally required versus recommended.
3. Review your employment contract — some roles require specific certifications as a condition of employment.
4. Create a master spreadsheet with columns: credential name, issuing body, requirement type (legal/contractual/recommended), and current status.
5. Cross-reference with at least one other professional in your exact role to catch anything you missed.`,
        },
        {
          title: 'Verify that each is current and not expired', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:58",
              arabic: "إِنَّ اللَّهَ يَأْمُرُكُمْ أَن تُؤَدُّوا الْأَمَانَاتِ إِلَىٰ أَهْلِهَا",
              translation: "Indeed, Allah commands you to render trusts to those to whom they are due. Maintaining current credentials is fulfilling a trust to those you serve.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

An expired credential is functionally the same as having no credential. Continuing to practise under a lapsed licence may be illegal and is certainly a breach of trust with those who rely on your professional standing. Keeping credentials current is part of fulfilling your amanah (trust) as a professional.


**How?**

1. Pull out every certificate, licence card, or registration document you hold.
2. Check the expiry date on each one — note any that have already lapsed or will lapse within 90 days.
3. Log into the issuing body's portal for each credential and verify your status is listed as "active" or equivalent.
4. If any credential shows a discrepancy between your records and the issuing body, contact them immediately.
5. Update your master spreadsheet with verified expiry dates and renewal windows.`,
        },
        {
          title: 'Identify any credentials you should hold but don\'t yet have', done: false,
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
              ref: "Quran 17:34",
              arabic: "وَأَوْفُوا بِالْعَهْدِ ۖ إِنَّ الْعَهْدَ كَانَ مَسْئُولًا",
              translation: "And fulfill every commitment. Indeed, the commitment is ever that about which one will be questioned.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1968",
              translation: "The Prophet (peace be upon him) said: \"Allah loves that when one of you does something, he does it with excellence (itqan).\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Gaps in your credentials may mean you are operating outside your qualified scope — even unknowingly. Identifying these gaps proactively demonstrates professional integrity and protects you from legal liability. It also opens doors: credentials you don't yet hold may be the key to roles, clients, or projects currently beyond your reach.


**How?**

1. Compare your master list of required credentials against what you currently hold.
2. Research job postings for your target role or next career step — what credentials do they require or prefer?
3. Ask your manager or a mentor: "What credentials am I missing that would make me more effective or open new opportunities?"
4. Check if your industry has tiered certification paths (e.g., associate → professional → chartered) and identify where you sit.
5. Prioritise the gaps: which missing credential carries the highest legal, professional, or career risk?`,
        },
        {
          title: 'Create a renewal calendar so nothing lapses', done: false,
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
              ref: "Sahih Muslim 1955",
              translation: "The Prophet (peace be upon him) said: \"Indeed, Allah has prescribed excellence in all things.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Credentials lapse not because professionals are negligent, but because renewal dates are easy to forget amid busy schedules. A systematic calendar removes the risk of accidental expiry. This is a practical application of the Islamic principle of tying your camel — taking the practical precaution rather than relying on memory alone.


**How?**

1. Open your preferred calendar tool (Google Calendar, Outlook, or a dedicated reminder app).
2. For each credential, create two reminders: one 90 days before expiry (to begin the renewal process) and one 30 days before (a final warning).
3. Include in each reminder: the credential name, issuing body, renewal steps, and any fees or continuing education required.
4. Set the reminders to recur at the appropriate interval (annually, biennially, etc.).
5. Review this calendar at the start of each quarter to catch any upcoming renewals.`,
        },
        {
          title: 'Begin the process for any missing or expired credentials', done: false,
          sources: [
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
              translation: "The Messenger of Allah (peace be upon him) said: \"Seeking knowledge is an obligation upon every Muslim.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Identifying gaps means nothing if you do not act on them. Every day you practise without a required credential is a day you carry unnecessary risk — legal, ethical, and spiritual. Beginning the process immediately, even if completion takes months, demonstrates tawbah (turning back) from a gap and commitment to professional integrity.


**How?**

1. For each missing or expired credential, visit the issuing body's website and download the application or renewal requirements.
2. List the prerequisites: exams, continuing education hours, references, fees, or experience requirements.
3. Create a timeline working backwards from your target completion date — when must each step be done?
4. Register for any required exams or courses immediately (don't wait for the "right time").
5. Block study or preparation time in your weekly calendar and protect it as you would a client meeting.`,
        },
      ],
    },
    {
      title: 'Define your professional mission statement — how does your work serve Allah and humanity?',
      priority: 'high', tags: ['mission', 'niyyah'],
      description: 'Without a clear mission, professional life becomes a treadmill of tasks without purpose. Defining how your work serves a higher purpose — connecting your daily effort to the pleasure of Allah and benefit of humanity — transforms routine work into ibadah and gives you criteria for saying yes or no to opportunities.',
      subtasks: [
        {
          title: 'Reflect on why you chose or entered your current profession', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 51:56",
              arabic: "وَمَا خَلَقْتُ الْجِنَّ وَالْإِنسَ إِلَّا لِيَعْبُدُونِ",
              translation: "And I did not create the jinn and mankind except to worship Me.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 6:162",
              arabic: "قُلْ إِنَّ صَلَاتِي وَنُسُكِي وَمَحْيَايَ وَمَمَاتِي لِلَّهِ رَبِّ الْعَالَمِينَ",
              translation: "Say, \"Indeed, my prayer, my rites of sacrifice, my living and my dying are for Allah, Lord of the worlds.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1",
              translation: "The Prophet (peace be upon him) said: \"Actions are only by intentions, and every person will have only what they intended.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Understanding the origin of your professional path reveals whether you are where you are by intention or by drift. Many people enter professions for reasons that no longer apply — family pressure, financial necessity, or youthful assumptions. Honest reflection is the foundation of a meaningful mission statement because you cannot articulate purpose without understanding history.


**How?**

1. Set aside 30 minutes of uninterrupted time with a notebook or journal.
2. Answer these questions honestly: What drew me to this work originally? Was it my choice, or was it shaped by circumstances? If I could start over knowing what I know now, would I choose this path again?
3. Identify the moments in your career where you felt most aligned and fulfilled — what were you doing?
4. Identify the moments where you felt most drained or conflicted — what was different?
5. Write a brief paragraph summarising what you've discovered about your relationship with your profession.`,
        },
        {
          title: 'Identify the specific ways your work benefits others', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 11:61",
              arabic: "هُوَ أَنشَأَكُم مِّنَ الْأَرْضِ وَاسْتَعْمَرَكُمْ فِيهَا",
              translation: "He produced you from the earth and settled you in it [to develop it].",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 2:30",
              arabic: "إِنِّي جَاعِلٌ فِي الْأَرْضِ خَلِيفَةً",
              translation: "Indeed, I will make upon the earth a successive authority [khalifah].",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1",
              translation: "The Prophet (peace be upon him) said: \"Actions are only by intentions, and every person will have only what they intended.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Every halal profession serves people in some way — directly or indirectly. Identifying precisely how your work benefits others connects your daily effort to a chain of positive impact. This step maps your professional output to human benefit.

**How?**

1. List every stakeholder your work touches: clients, colleagues, end users, community members, supply chain partners.
2. For each stakeholder, write one sentence describing how your work makes their life better, easier, or more just.
3. Ask a trusted client, colleague, or manager: "What value do you think I bring?" — their answer often reveals impact you take for granted.
4. Look for second-order effects: does your work enable others to do their work better? Does it prevent harm?
5. Rank these benefits by significance — which ones would you be most proud to stand behind on the Day of Judgement?`,
        },
        {
          title: 'Write a 1-2 sentence professional mission statement connecting your work to a higher purpose', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 20:32",
              arabic: "**Translation:** and associate him with me in my mission,",
              translation: "and associate him with me in my mission,",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1",
              translation: "Narrated Umar bin Al-Khattab: The Prophet (peace be upon him) said: \"Actions are judged by their intentions, and every person will get the reward according to what he has intended. So whoever emigrated for the sake of Allah and His Messenger, his emigration was for Allah and His Messenger; and whoever emigrated for a worldly matter or a woman to marry, his emigration was for that which he emigrated.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A mission statement crystallises your niyyah (intention) into words you can return to when decisions are difficult. It is not a marketing slogan — it is a personal covenant between you and Allah about why you do what you do. Writing it forces clarity; having it written gives you an anchor.


**How?**

1. Review your reflections from the previous two subtasks — your professional history and the benefits your work creates.
2. Draft 3-5 candidate mission statements using this structure: "I use [my skills/expertise] to [specific benefit] so that [higher purpose]."
3. Test each candidate: Does it feel true? Does it move you? Would you be comfortable sharing it with a scholar you respect?
4. Refine your top choice until every word earns its place — remove jargon, vagueness, and anything performative.
5. Read it aloud. If it sounds like it could belong to anyone, it is too generic. Make it yours.`,
        },
        {
          title: 'Test the statement — does it guide real decisions about projects, clients, and priorities?', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 6:162",
              arabic: "قُلْ إِنَّ صَلَاتِي وَنُسُكِي وَمَحْيَايَ وَمَمَاتِي لِلَّهِ رَبِّ الْعَالَمِينَ",
              translation: "Say, \"Indeed, my prayer, my rites of sacrifice, my living and my dying are for Allah, Lord of the worlds.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1",
              translation: "The Prophet (peace be upon him) said: \"Actions are only by intentions, and every person will have only what they intended.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A mission statement that cannot be applied is just decoration. The true test of your statement is whether it helps you make better professional decisions — which projects to take, which clients to serve, which opportunities to decline. If it does not change any of your decisions, it is not specific enough.


**How?**

1. Take three recent professional decisions you made (a project you accepted, a client you took on, a priority you set).
2. Apply your mission statement retroactively: would it have led you to the same decision? A different one?
3. Take one upcoming decision and use the mission statement as the primary filter. Does it clarify the right choice?
4. If the statement never says "no" to anything, it is too broad — revise it.
5. Share the statement with a trusted colleague and ask them: "Does this match how you see me work?" Their feedback reveals blind spots.`,
        },
        {
          title: 'Display it where you will see it daily', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 79:36",
              arabic: "**Translation:** and Hell is there for all to see,",
              translation: "and Hell is there for all to see,",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6407",
              translation: "The Prophet (peace be upon him) said: \"The example of the one who remembers his Lord and the one who does not remember his Lord is like the example of the living and the dead.\"",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "keeping one's mission statement visible is a form of professional dhikr — constant remembrance of purpose — mirroring the Islamic principle that regular remembrance keeps the heart alive and oriented toward Allah.",
            },
          ],
          description: `**Why?**

The purpose of displaying your mission statement is not vanity — it is remembrance. Just as the Muslim is reminded of their purpose through daily salah, a visible mission statement reminds you of your professional purpose at the moments you are most likely to forget it: when you are stressed, distracted, or tempted by misaligned opportunities.


**How?**

1. Choose a location you see every working day: above your monitor, on your desk, as a phone wallpaper, or pinned in your project management tool.
2. Write or print the statement in a format that is easy to read at a glance — not buried in a paragraph.
3. Consider adding it to your email signature, professional bio, or LinkedIn headline if it is appropriate for public sharing.
4. Set a monthly reminder to re-read it deliberately (not just glance past it) and ask: "Am I living this?"
5. If you ever revise the statement, update all displayed copies immediately.`,
        },
      ],
    },
    {
      title: 'Identify the top 3 skill gaps holding you back in your current role and create a plan to close them',
      priority: 'high', tags: ['skills', 'planning'],
      description: ' Identifying the specific skills holding you back from excellence in your role — and systematically closing those gaps — is a direct expression of this principle.',
      subtasks: [
        {
          title: 'Seek honest feedback from your manager, colleagues, or clients on your weaknesses', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 42:38",
              arabic: "وَأَمْرُهُمْ شُورَىٰ بَيْنَهُمْ",
              translation: "And whose affair is determined by consultation among themselves. Seeking honest feedback from colleagues is a form of shura.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Self-assessment is unreliable because we are blind to our own blind spots. The people who experience your work daily — your manager, colleagues, and clients — see patterns you cannot. Seeking honest feedback is an act of humility and a practical application of shura (consultation). It requires courage, but it is the fastest path to accurate self-knowledge.


**How?**

1. Choose 3-5 people who interact with your work regularly and whose judgement you respect.
2. Ask a specific, open question: "What is the one skill or area where, if I improved, it would make the biggest difference in my work?"
3. Do not defend or explain — simply listen, take notes, and thank them.
4. Look for patterns across responses. If multiple people mention the same area, that is your highest-priority gap.
5. Follow up a week later to show you took their feedback seriously — this builds trust for future feedback.`,
        },
        {
          title: 'Rank your skill gaps by impact — which one, if closed, would improve your work the most?', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 39:9",
              arabic: "قُلْ هَلْ يَسْتَوِي الَّذِينَ يَعْلَمُونَ وَالَّذِينَ لَا يَعْلَمُونَ",
              translation: "Say, \"Are those who know equal to those who do not know?\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 1955",
              translation: "The Prophet (peace be upon him) said: \"Indeed, Allah has prescribed excellence in all things.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Not all skill gaps are equal. Some gaps are inconveniences; others are bottlenecks that limit everything you do. Ranking by impact ensures you invest your limited learning time where it will produce the greatest return. This is tawkeel (strategic trust in Allah) paired with practical wisdom — working smart, not just hard.


**How?**

1. List all skill gaps identified from feedback and self-reflection.
2. For each gap, answer: "If I closed this gap completely, what would change in my daily work? My career trajectory? My ability to serve others?"
3. Score each gap on two dimensions: frequency (how often does this gap hurt me?) and severity (how much does it hurt when it does?).
4. Multiply frequency by severity to get an impact score. Rank from highest to lowest.
5. Select the top 3 gaps. These are your learning priorities for the next quarter.`,
        },
        {
          title: 'For each of the top 3 gaps, identify the best learning resource (course, book, mentor)', done: false,
          sources: [
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
              translation: "The Messenger of Allah (peace be upon him) said: \"Seeking knowledge is an obligation upon every Muslim.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The quality of your learning resource determines the speed and depth of your improvement. A mediocre course wastes months; the right book or mentor can compress that into weeks. Investing time upfront to find the best resource is itself a skill — and it prevents the common trap of collecting courses without completing any.


**How?**

1. For each skill gap, search for the top-rated resources: online courses (Coursera, Udemy, LinkedIn Learning), books, and mentors in your network.
2. Read reviews and ask colleagues who have closed similar gaps: "What actually worked for you?"
3. Evaluate each resource on three criteria: depth (does it go beyond basics?), practicality (does it include exercises or real-world application?), and time commitment (can you realistically complete it?).
4. Choose one primary resource per gap — not three. Focus beats breadth.
5. Purchase, enrol, or schedule the first session immediately. Remove the friction of starting.`,
        },
        {
          title: 'Create a 90-day plan with weekly learning targets for each skill', done: false,
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
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (peace be upon him) said: \"Whoever takes a path in search of knowledge, Allah will make easy for him a path to Paradise.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A goal without a plan is a wish. Breaking your skill development into weekly targets transforms a vague aspiration ("get better at X") into a concrete schedule with accountability. The 90-day timeframe is long enough to achieve meaningful progress but short enough to maintain urgency and focus.


**How?**

1. For each of the 3 skills, estimate the total hours needed to reach a functional level of competence (not mastery — that comes later).
2. Divide those hours across 12 weeks, accounting for your existing commitments. Be realistic: 3-5 hours per week of focused learning is substantial.
3. Assign specific milestones to each week: "Week 1-2: Complete chapters 1-4. Week 3-4: Build practice project. Week 5-6: Apply in real work."
4. Block learning time in your calendar as non-negotiable appointments.
5. Create a simple tracking sheet (spreadsheet or notebook) where you log weekly progress and note what you actually learned versus what you planned.`,
        },
        {
          title: 'Measure improvement through a concrete deliverable or assessment', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2664",
              translation: "The Prophet (peace be upon him) said: \"The strong believer is better and more beloved to Allah than the weak believer, while there is good in both. Strive for that which will benefit you.\" Measuring improvement through concrete assessment is striving for benefit.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Without measurement, you cannot distinguish genuine improvement from the illusion of progress. Completing a course is not the same as acquiring a skill. A concrete deliverable or assessment forces you to demonstrate competence, not just consumption. This is the difference between knowing and doing — and Islam consistently values the latter.


**How?**

1. For each skill, define a "proof of competence" — a specific deliverable that would be impossible at your current level. Examples: a completed project, a presentation, a passed exam, or a successful client engagement.
2. Set a date for completing this proof — ideally at the end of your 90-day plan.
3. Share your goal with your accountability partner, mentor, or manager so there is external expectation.
4. At the 90-day mark, complete the deliverable or take the assessment.
5. Evaluate honestly: Did you close the gap? Partially? If not fully, what remains? Update your plan for the next quarter accordingly.`,
        },
      ],
    },
    {
      title: 'Ensure your primary income source is fully halal — audit contracts, clients, and products',
      priority: 'urgent', tags: ['halal', 'income'],
      description: 'The du\'a of a person whose income is haram is not accepted. This is not a peripheral concern — it strikes at the heart of your relationship with Allah. Conducting a thorough halal audit of your income ensures that every dirham you earn and spend is clean, protecting your ibadah and your family.',
      subtasks: [
        {
          title: 'Review your employment contract or business model for any haram elements (riba, gharar, prohibited products)', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:275",
              arabic: "وَأَحَلَّ اللَّهُ الْبَيْعَ وَحَرَّمَ الرِّبَا",
              translation: "Allah has permitted trade and has forbidden interest (riba).",
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
              kind: "hadith",
              ref: "Sahih al-Bukhari 2059",
              translation: "The Prophet (peace be upon him) said: \"A time will come when a person will not care whether he earns money from a halal source or a haram source.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Your employment contract or business model is the foundation of your income. If it contains elements of riba (interest), gharar (excessive uncertainty/deception), or involvement with prohibited products (alcohol, gambling, etc.), then everything built on that foundation is tainted. This is not about being overly cautious — it is about protecting the purity of your rizq (provision) at its source.


**How?**

1. Obtain a full copy of your employment contract, partnership agreement, or business registration documents.
2. Read every clause with these questions in mind: Does any part of my compensation involve interest? Do I sell, produce, or facilitate anything explicitly prohibited in Islam? Are there penalty clauses or structures that function as riba?
3. If you are a business owner, map your revenue streams: where does every pound come from, and what does the customer receive in return?
4. Flag any clauses or revenue streams you are unsure about — do not dismiss grey areas.
5. Document your findings in a simple audit sheet: item, concern, status (clear / grey / problematic).`,
        },
        {
          title: 'Audit your client list — are any clients in industries that are impermissible?', done: false,
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
          ],
          description: `**Why?**

Even if your own work is halal in nature, providing services to clients whose core business is haram makes you a facilitator of that harm. The principle of ta'awun (cooperation) in the Quran instructs believers to cooperate in righteousness and not in sin and transgression. Auditing your client list ensures your professional relationships align with this principle.


**How?**

1. List every client, customer, or account you currently serve.
2. For each client, identify their core business: what do they sell or produce? How do they make money?
3. Flag any client whose primary revenue comes from prohibited industries: conventional finance (interest-based), alcohol, gambling, tobacco, adult entertainment, or weapons manufacturing.
4. For borderline cases (e.g., a conglomerate with both halal and haram divisions), assess whether your specific work supports the halal or haram side of their business.
5. Prepare a plan for transitioning away from problematic clients — this may require finding replacement revenue first, but the intention and timeline should be set now.`,
        },
        {
          title: 'Check your investment and savings vehicles for interest-based components', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:275",
              arabic: "وَأَحَلَّ اللَّهُ الْبَيْعَ وَحَرَّمَ الرِّبَا",
              translation: "Allah has permitted trade and has forbidden interest (riba).",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Many professionals have savings accounts, pension funds, or investment portfolios that generate interest (riba) without their active awareness. Riba is among the most severely warned-against sins in the Quran. Checking your savings and investments ensures that the money you set aside for the future is growing through permissible means, not accumulating sin alongside returns.


**How?**

1. List every account where your money sits: savings accounts, current accounts, pension funds, ISAs, investment portfolios, and any other financial instruments.
2. For each account, determine: does it pay or charge interest? Is it invested in interest-bearing bonds or prohibited industries?
3. Contact your pension provider and request the fund's investment breakdown — many default pension funds include interest-based bonds and shares in prohibited companies.
4. Research Islamic alternatives: Islamic banks, Shariah-compliant pension funds, halal investment platforms (e.g., Wahed Invest, Islamicly).
5. Create a transition plan with specific dates for moving each account to a halal alternative.`,
        },
        {
          title: 'Consult a knowledgeable scholar if any grey areas arise', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 7352",
              translation: "The Prophet (peace be upon him) said: \"If a judge gives a ruling, having tried his best to decide correctly and is right, he will receive a double reward.\" Consulting scholars when grey areas arise is how one gives one's best effort in matters of halal and haram.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Not every financial question has a clear-cut answer. Islamic commercial law (fiqh al-mu'amalat) is a deep and nuanced field, and applying it to modern professional contexts requires expertise most of us do not have. Consulting a knowledgeable scholar for grey areas is not a sign of weakness — it is a sign of taqwa (God-consciousness) and intellectual honesty.


**How?**

1. Compile your list of grey areas from the previous subtasks — specific clauses, client relationships, or financial products you are unsure about.
2. Identify a scholar who has expertise in Islamic commercial law (fiqh al-mu'amalat), not just general Islamic knowledge. Ask your local mosque, Islamic finance professionals, or trusted community members for recommendations.
3. Prepare your questions in writing with full context: describe the contract clause, business relationship, or financial product in detail so the scholar can give an informed ruling.
4. Present the facts honestly — do not frame questions to get the answer you want.
5. If the scholar's guidance requires changes, document the ruling and your action plan. If you receive conflicting opinions, follow the one that is most cautious (the principle of wara').`,
        },
        {
          title: 'Create a plan to transition away from any problematic income sources', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:278-279",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللَّهَ وَذَرُوا مَا بَقِيَ مِنَ الرِّبَا إِن كُنتُم مُّؤْمِنِينَ",
              translation: "O you who have believed, fear Allah and give up what remains of interest, if you should be believers.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 1598",
              translation: "The Prophet (peace be upon him) cursed the one who consumes riba, the one who pays it, the one who writes it, and the two who witness it, saying: \"They are all equal in sin.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Identifying haram income sources is only valuable if you act on the findings. The transition may not be instant — you may have contractual obligations, financial dependencies, or practical constraints — but the plan must exist and have a clear timeline. Allah judges by intention and effort, and a sincere plan with a firm deadline demonstrates both.


**How?**

1. List every problematic income source identified in your audit, ranked by severity (clear haram first, then grey areas).
2. For each one, assess the practical constraints: contractual notice periods, financial dependency (what percentage of your income does it represent?), and available alternatives.
3. Set a firm transition deadline for each — ideally within 3-6 months for clear haram sources.
4. Identify replacement income: can you replace a haram client with a halal one? Can you switch to a Shariah-compliant financial product without significant loss?
5. Execute the transition in order of severity. Begin with the most clearly problematic source, even if it is also the most financially significant — trust in Allah's provision (tawakkul) paired with practical effort.`,
        },
      ],
    },
    {
      title: 'Build a professional portfolio or record of your best work',
      priority: 'medium', tags: ['portfolio', 'credibility'],
      description: 'A portfolio is tangible proof of your competence. It allows others to assess your work on its merits rather than relying on credentials alone. Building one forces you to curate your best output, identify patterns in your strengths, and present yourself with clarity and honesty.',
      subtasks: [
        {
          title: 'Gather your 5-10 best pieces of professional work', done: false,
          sources: [
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
              translation: "The Prophet (peace be upon him) said: \"Indeed, Allah has prescribed excellence (ihsan) in all things.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Your portfolio is only as strong as the work it showcases. Gathering your best pieces forces you to evaluate your own output critically — what truly represents excellence versus what was merely adequate. This curation process itself builds self-awareness about where your strengths lie and what kind of work you should pursue more of.


**How?**

1. Review your work over the past 2-3 years. Pull from projects, reports, designs, code, presentations, or any other professional output.
2. Select pieces that demonstrate range (different types of challenges) and depth (complex problems solved well).
3. Ensure you have permission to share each piece — respect confidentiality agreements and client privacy.
4. For any work that is confidential, create a sanitised version that demonstrates your skill without revealing proprietary information.
5. Aim for 5-10 pieces. Fewer than 5 looks thin; more than 10 dilutes the impact. Quality over quantity.`,
        },
        {
          title: 'For each piece, write a brief description of the problem, your approach, and the outcome', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 96:3-5",
              arabic: "اقْرَأْ وَرَبُّكَ الْأَكْرَمُ ۚ الَّذِي عَلَّمَ بِالْقَلَمِ ۚ عَلَّمَ الْإِنسَانَ مَا لَمْ يَعْلَمْ",
              translation: "Read, and your Lord is the Most Generous — who taught by the pen — taught man that which he knew not.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 1955",
              translation: "The Prophet (peace be upon him) said: \"Indeed, Allah has prescribed excellence (ihsan) in all things.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Raw work samples without context are difficult to evaluate. A hiring manager, client, or collaborator needs to understand not just what you produced, but why it mattered and how you approached it. The problem-approach-outcome structure tells a story that makes your competence legible to others and demonstrates your ability to think, not just execute.


**How?**

1. For each portfolio piece, write three short paragraphs (or bullet points):
   - **Problem:** What was the challenge or need? Why did it matter?
   - **Approach:** What did you do? What decisions did you make and why?
   - **Outcome:** What was the result? Use numbers where possible (revenue generated, time saved, users served).
2. Keep each description under 200 words — concise and impactful.
3. Use plain language, not jargon. Your portfolio may be read by people outside your specialisation.
4. Have someone unfamiliar with the project read your description — if they can understand the value you created, you have written it well.
5. Include any relevant visuals: screenshots, diagrams, before/after comparisons.`,
        },
        {
          title: 'Organise them in a format appropriate to your field (website, PDF, physical binder)', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6496",
              translation: "The Prophet (peace be upon him) said: \"Allah loves that when one of you does a job, he does it with excellence (itqan).\" Organising one's best work in a presentable format reflects itqan.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The format of your portfolio affects how seriously it is received. A software developer needs a GitHub profile or personal website; an architect needs high-resolution visuals; a consultant may need a polished PDF. Choosing the right format shows that you understand your industry's expectations and can present information professionally.


**How?**

1. Research how respected professionals in your field present their portfolios. Look at 3-5 examples.
2. Choose a format: personal website (for creative and technical fields), PDF document (for consulting and corporate roles), or a physical portfolio (for design, architecture, or hands-on fields).
3. Structure the portfolio with a clear navigation: an introduction/bio, then each piece with its description, organised by theme or chronologically.
4. Invest in presentation quality: clean layout, consistent formatting, readable typography. First impressions matter.
5. Ensure accessibility: if it is a website, it should load quickly and work on mobile. If it is a PDF, it should be under 10MB. If physical, it should be easy to handle and flip through.`,
        },
        {
          title: 'Get feedback on the portfolio from a trusted colleague', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 42:38",
              arabic: "وَأَمْرُهُمْ شُورَىٰ بَيْنَهُمْ",
              translation: "And whose affair is determined by consultation among themselves. Getting feedback on your portfolio is consultation (shura) in professional life.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

You are too close to your own work to evaluate your portfolio objectively. A trusted colleague can tell you whether your descriptions are clear, whether the right pieces are included, and whether the overall impression matches the professional image you want to project. This feedback loop is essential before you share your portfolio with the people who matter most.


**How?**

1. Choose a colleague who knows your field and whose professional judgement you trust.
2. Share the portfolio and ask specific questions: "Is anything unclear? Does this represent my strongest work? What's missing? What would you remove?"
3. Also ask: "If you didn't know me, what impression would this portfolio give you?" — this reveals whether your intended message is landing.
4. Take notes on their feedback without defending your choices. Let the feedback settle for a day before deciding what to change.
5. Implement the feedback that resonates and do a final review before considering the portfolio ready.`,
        },
        {
          title: 'Update the portfolio quarterly with new work', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6464",
              translation: "The Prophet (peace be upon him) said: \"The most beloved of deeds to Allah are those that are most consistent, even if they are small.\" Updating your portfolio quarterly is the kind of small, consistent action beloved to Allah.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A stale portfolio suggests stagnation. If your most recent work is from two years ago, people will wonder what you have been doing since. Regular quarterly updates keep your portfolio current, ensure your best recent work is represented, and create a habit of documenting and reflecting on your professional output.


**How?**

1. Set a quarterly reminder (e.g., first Monday of January, April, July, October) to review your portfolio.
2. At each review, ask: "What is the best work I've done in the past three months? Does it deserve a place in the portfolio?"
3. If a new piece is strong enough, add it and consider removing an older, weaker piece to keep the total at 5-10.
4. Update descriptions to reflect any new context: did an old project produce long-term results you can now document?
5. Check that all links, files, and formatting still work — broken links in a portfolio are unprofessional.`,
        },
      ],
    },
  ],

  intellect_professional_growth: [
    {
      title: 'Pursue advanced training, specialisation, or a higher qualification in your field',
      priority: 'high', tags: ['education', 'expertise'],
      description: 'Depth of expertise distinguishes a professional from a generalist. Pursuing advanced training or a higher qualification deepens your mastery, increases your value, and positions you to contribute at a higher level. Choose a specialisation that aligns with both market demand and your mission.',
      subtasks: [
        {
          title: 'Research advanced qualifications or specialisations available in your field', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 20:114",
              arabic: "وَقُل رَّبِّ زِدْنِي عِلْمًا",
              translation: "And say, \"My Lord, increase me in knowledge.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The landscape of professional qualifications is vast and not all credentials carry equal weight. Researching thoroughly before committing prevents you from investing time and money in a qualification that is unrecognised, outdated, or misaligned with your goals. Knowledge of the full landscape empowers you to make an informed choice rather than following the most visible option.


**How?**

1. Identify the professional bodies, universities, and training providers that offer advanced qualifications in your field.
2. List every relevant option: postgraduate degrees, professional certifications, specialised diplomas, and industry-specific designations.
3. For each, research: recognition (is it respected by employers and peers?), rigour (is it genuinely challenging?), and relevance (does it teach skills currently in demand?).
4. Read reviews and testimonials from people who have completed each qualification — online forums, LinkedIn posts, and professional communities are valuable sources.
5. Shortlist the top 3-5 options for deeper evaluation in the next step.`,
        },
        {
          title: 'Evaluate which specialisation best aligns with your mission and market need', done: false,
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
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (peace be upon him) said: \"Whoever takes a path in search of knowledge, Allah will make easy for him a path to Paradise.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The best specialisation sits at the intersection of three circles: what you are passionate about, what the market needs, and what serves your professional mission. Choosing based on only one factor leads to regret — passion without demand leads to financial struggle, demand without passion leads to burnout, and either without mission leads to emptiness.


**How?**

1. Take your shortlisted qualifications from the previous step and evaluate each against three criteria:
   - **Mission alignment:** Does this specialisation deepen your ability to fulfil your professional mission statement?
   - **Market demand:** Are employers or clients actively seeking this specialisation? Check job postings, industry reports, and salary data.
   - **Personal energy:** Does the subject matter genuinely interest you? Could you sustain years of deep work in this area?
2. Score each option on a scale of 1-5 for each criterion. The highest total score is your strongest candidate.
3. Talk to at least one person who holds each qualification — ask what it has actually done for their career.
4. Make your decision and commit. Avoid indefinite comparison — analysis paralysis is itself a form of waste.`,
        },
        {
          title: 'Calculate the time, cost, and opportunity cost of pursuing it', done: false,
          sources: [
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
              kind: "quran",
              ref: "Quran 2:269",
              arabic: "يُؤْتِي الْحِكْمَةَ مَن يَشَاءُ",
              translation: "He gives wisdom to whom He wills.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Ibn Majah 224",
              translation: "The Messenger of Allah (peace be upon him) said: \"Seeking knowledge is an obligation upon every Muslim.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Every investment has a cost — not just in money, but in time and what you give up by choosing this path over another. Calculating the full cost ensures you enter the commitment with open eyes and a realistic plan. This prevents mid-course abandonment, which wastes everything already invested and demoralises you for future endeavours.


**How?**

1. Calculate the direct financial cost: tuition, exam fees, study materials, travel, and any required equipment.
2. Calculate the time cost: how many hours per week for how many months or years? Be specific — vague estimates lead to scheduling conflicts later.
3. Calculate the opportunity cost: what will you not be doing during this period? Could that time generate income, advance other goals, or serve family obligations?
4. Assess your current financial and time capacity: can you afford this without taking on debt (especially interest-bearing debt)? Can your family and work absorb the time commitment?
5. Create a realistic budget and timeline. If the numbers do not work now, set a savings target and a future start date rather than forcing it.`,
        },
        {
          title: 'Enrol and create a study schedule that respects your other obligations', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6464",
              translation: "The Prophet (peace be upon him) said: \"The most beloved of deeds to Allah are those that are most consistent, even if they are small.\" Creating a study schedule that respects other obligations is the path of consistency.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Enrolment without a structured study plan is a recipe for falling behind, cramming before exams, and producing mediocre work. Your professional qualification is not your only obligation — you have family, worship, health, and possibly a full-time job. A study schedule that accounts for all of these prevents the common pattern of sacrificing everything else for a credential, only to find you burned relationships along the way.


**How?**

1. Map your weekly obligations: work hours, family time, salah times, exercise, and any other non-negotiable commitments.
2. Identify realistic study windows — blocks of 60-90 minutes where you can focus without interruption.
3. Allocate study time in your calendar as fixed appointments. Aim for consistency (same times each week) to build a routine.
4. Break the entire programme into monthly and weekly milestones: which modules, chapters, or assignments should be completed by when?
5. Build in buffer time (at least 20% extra) for unexpected disruptions. Share the schedule with your family so they understand and support your commitment.`,
        },
        {
          title: 'Complete the qualification and update your professional profiles', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2664",
              translation: "The Prophet (peace be upon him) said: \"The strong believer is better and more beloved to Allah than the weak believer, while there is good in both. Strive for that which will benefit you.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Completing a qualification is an achievement, but its value is only realised when others know about it. Updating your professional profiles ensures that your investment translates into recognition, opportunity, and credibility. It also marks a psychological milestone — you formally close the chapter and step into your new professional identity.


**How?**

1. Complete all remaining requirements: final exams, capstone projects, or practicum hours. Do not let the last 10% drag on indefinitely.
2. Obtain your official certificate or confirmation of completion.
3. Update your LinkedIn profile, CV, and any professional directory listings with the new qualification.
4. Inform your employer, clients, and professional network — a brief announcement post or email is appropriate.
5. Add the credential to your email signature and business card if relevant. Celebrate the accomplishment with gratitude to Allah and those who supported you through the process.`,
        },
      ],
    },
    {
      title: 'Find a professional mentor — someone 5–10 years ahead on the path you want to walk',
      priority: 'high', tags: ['mentorship', 'growth'],
      description: 'A mentor compresses decades into years by sharing hard-won lessons. The Islamic tradition of teacher-student relationships (ustad-talib) is a model of structured knowledge transfer. Finding someone who has walked your intended path and is willing to guide you is one of the highest-leverage investments you can make.',
      subtasks: [
        {
          title: 'Define specifically what you want mentorship in — skills, career navigation, leadership', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 16:43",
              arabic: "فَاسْأَلُوا أَهْلَ الذِّكْرِ إِن كُنتُمْ لَا تَعْلَمُونَ",
              translation: "So ask the people of knowledge if you do not know.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 4833",
              translation: "The Prophet (peace be upon him) said: \"A man follows the religion of his close friend, so let each one of you look at whom he befriends.\"",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A vague request for mentorship burdens the mentor and wastes both your time. The more specific you are about what you need, the easier it is to find the right person and the more productive each interaction will be. Clarity of need is a form of respect — it shows you have done the internal work before asking for someone else's time.


**How?**

1. Review your professional mission statement and skill gap analysis from earlier tasks.
2. Ask yourself: "What is the single biggest challenge I face in my professional growth right now? Is it a technical skill, a career decision, a leadership challenge, or an industry navigation question?"
3. Write a one-paragraph mentorship brief: "I am seeking mentorship in [specific area] because [specific reason]. I am currently at [this stage] and want to reach [that stage] within [timeframe]."
4. Distinguish between what you need a mentor for versus what you can learn from a course, book, or peer. Mentorship is most valuable for tacit knowledge — the things that cannot be learned from a textbook.
5. Be honest about your commitment level: how much time can you invest in the mentorship relationship per month?`,
        },
        {
          title: 'Identify 3-5 potential mentors in your network or industry', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5027",
              translation: "The Prophet (peace be upon him) said: \"The best among you are those who learn the Quran and teach it.\" Finding a mentor is the sunnah method of learning — the Companions learned directly from the Prophet.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Having multiple candidates increases your chances of finding a good fit and prevents you from placing all your hopes on one person who may be unavailable. The best mentor is not necessarily the most famous or senior person — it is the person whose experience most closely maps to your specific needs and who is genuinely willing to invest in your growth.


**How?**

1. Start with your existing network: colleagues, former managers, professors, conference speakers, or community leaders you admire.
2. Expand to your extended network: ask trusted contacts, "Who do you know that is excellent at [your specific mentorship need]?"
3. Search LinkedIn and professional communities for people who are 5-10 years ahead on your desired path — not so far ahead that their experience feels irrelevant.
4. For each candidate, assess: Do they have the specific expertise I need? Do they have a track record of developing others? Do I respect their character as well as their competence?
5. Rank your candidates and prepare to approach your top choice first.`,
        },
        {
          title: 'Approach your top choice with a clear, respectful ask — what you need and what you offer', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 16:43",
              arabic: "فَاسْأَلُوا أَهْلَ الذِّكْرِ إِن كُنتُمْ لَا تَعْلَمُونَ",
              translation: "So ask the people of knowledge if you do not know.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 2317",
              translation: "The Prophet (peace be upon him) said: \"Among the excellence of a person's Islam is leaving that which does not concern him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

How you approach a potential mentor determines whether they say yes or no. A vague "Will you be my mentor?" puts the burden on them to figure out what you need. A specific, respectful ask that clearly states what you are looking for and what you bring to the relationship shows professionalism and makes it easy for them to say yes.


**How?**

1. Craft a brief, personalised message (email or LinkedIn) that includes:
   - Who you are and how you know of them (or how you were introduced).
   - What specifically you admire about their work or career.
   - Your specific mentorship need (from your mentorship brief).
   - What you are asking for: a single introductory conversation, not a lifetime commitment.
   - What you offer in return: your effort, preparation, and any skills or perspectives that might benefit them.
2. Keep the message under 200 words. Respect their time even in your first interaction.
3. Send it at an appropriate time (not during holidays or known busy periods).
4. If they decline or do not respond, accept gracefully and approach your next candidate. Do not take it personally.
5. If they agree to an introductory meeting, prepare thoroughly — research their background and come with specific questions.`,
        },
        {
          title: 'Propose a structure: monthly meetings, specific topics, defined duration', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 18:66",
              arabic: "قَالَ لَهُ مُوسَىٰ هَلْ أَتَّبِعُكَ عَلَىٰ أَن تُعَلِّمَنِ مِمَّا عُلِّمْتَ رُشْدًا",
              translation: "Moses said to him, \"May I follow you on the condition that you teach me from what you have been taught of sound judgement?",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Unstructured mentorship relationships tend to fizzle. Without agreed frequency, topics, and duration, meetings get postponed indefinitely and both parties lose momentum. Proposing a structure shows your mentor that you are serious, organised, and respectful of their time. It also gives the relationship a clear beginning and end point, which makes commitment easier.


**How?**

1. Propose a format after your introductory conversation: "Would you be open to meeting once a month for 45-60 minutes over the next 6 months?"
2. Suggest a recurring day and time that works for both of you — consistency builds routine.
3. Propose a topic framework: each meeting could focus on a specific theme (e.g., Month 1: career strategy, Month 2: a specific technical challenge, Month 3: leadership development).
4. Agree on a communication channel for between-meeting questions (email, WhatsApp, etc.) and boundaries for how often you will use it.
5. Set a review point at the halfway mark (3 months) to assess whether the structure is working and adjust if needed.`,
        },
        {
          title: 'Prepare thoroughly for each meeting — never waste your mentor\'s time', done: false,
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
              ref: "Sahih Muslim 1955",
              translation: "The Prophet (peace be upon him) said: \"Indeed, Allah has prescribed excellence (ihsan) in all things.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Your mentor is giving you their most valuable resource: time and attention. Arriving unprepared wastes that gift and erodes the relationship. Thorough preparation maximises the value of every interaction, demonstrates your seriousness, and makes your mentor feel that their investment in you is worthwhile. This is adab (etiquette) in its most practical form.


**How?**

1. One week before each meeting, send your mentor a brief agenda: the topic you want to discuss, any specific questions, and any updates since the last meeting.
2. Complete any action items from the previous meeting before the next one. If you could not complete something, explain why and what you plan to do.
3. Prepare 2-3 focused questions that you cannot easily answer through your own research. Do not ask questions you could Google.
4. Take notes during the meeting — written notes, not mental notes. Review them within 24 hours while the conversation is fresh.
5. Send a brief thank-you message after each meeting with a summary of your key takeaways and planned actions. This closes the loop and shows respect.`,
        },
      ],
    },
    {
      title: 'Attend at least two conferences, seminars, or professional gatherings per year',
      priority: 'medium', tags: ['networking', 'learning'],
      description: 'Professional gatherings expose you to new ideas, emerging trends, and potential collaborators that you would never encounter in your daily routine. They also build the professional network that opens doors and creates opportunities for meaningful work.',
      subtasks: [
        {
          title: 'Research the most respected conferences and seminars in your field', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (peace be upon him) said: \"Whoever takes a path in search of knowledge, Allah will make easy for him the path to Paradise.\" Attending conferences and professional gatherings is a means of seeking knowledge.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Not all conferences are created equal. Some are transformative experiences that redefine your thinking; others are expensive networking events with little substance. Researching which events are genuinely respected in your field ensures your investment of time and money produces real professional growth rather than a badge and a lanyard.


**How?**

1. Ask senior colleagues and your mentor: "Which conferences have been most valuable for you and why?"
2. Search professional association websites, industry publications, and LinkedIn groups for event recommendations.
3. Check the speaker lists and agendas of past events — high-quality speakers and relevant topics are strong indicators of a worthwhile event.
4. Read attendee reviews and retrospectives (blog posts, Twitter threads, LinkedIn posts) from previous years.
5. Create a shortlist of 5-7 events ranked by relevance to your current professional priorities, quality of content, and networking potential.`,
        },
        {
          title: 'Select two events that align with your current learning priorities', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 39:18",
              arabic: "الَّذِينَ يَسْتَمِعُونَ الْقَوْلَ فَيَتَّبِعُونَ أَحْسَنَهُ",
              translation: "Those who listen to speech and then follow the best of it. Those are the ones Allah has guided.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Selecting events that align with your current learning priorities ensures that conference attendance is strategic, not random. Each event should serve a specific purpose: closing a skill gap, exploring a new direction, or deepening expertise in your specialisation. This intentionality transforms conferences from passive experiences into active growth accelerators.


**How?**

1. Review your professional mission statement and current skill development plan.
2. Map each shortlisted event to your priorities: which event best addresses your most pressing learning need?
3. Consider variety: one event focused on deep technical learning and one focused on industry trends or leadership can provide complementary value.
4. Check dates against your calendar — ensure no conflicts with major work deadlines, family commitments, or other obligations.
5. Make your selections and commit. Register early to secure the best rates and to create accountability for attending.`,
        },
        {
          title: 'Budget for registration, travel, and time off well in advance', done: false,
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
              ref: "Sunan Abi Dawud 3641",
              translation: "The Prophet (peace be upon him) said: \"He who goes out in search of knowledge is in the path of Allah until he returns.\"",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Financial and logistical barriers are the most common reasons professionals skip conferences despite wanting to attend. Budgeting well in advance — 3-6 months — removes these barriers by spreading the cost over time and giving you leverage to request employer sponsorship or negotiate time off. Preparation is a form of tawakkul: trusting in Allah while taking every practical step.


**How?**

1. Calculate the total cost for each event: registration fee, travel (flights, trains, fuel), accommodation, meals, and incidental expenses.
2. Check if your employer offers a professional development budget or conference allowance. If so, submit your request early with a brief justification of how the event benefits the organisation.
3. If self-funding, set up a monthly savings allocation starting 3-6 months before the event.
4. Book travel and accommodation early — prices rise as the event approaches.
5. Request time off from work as soon as you register. Frame it as professional development, not holiday.`,
        },
        {
          title: 'Set specific goals for each event (people to meet, sessions to attend, questions to answer)', done: false,
          sources: [
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
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (peace be upon him) said: \"Whoever takes a path in search of knowledge, Allah will make easy for him a path to Paradise.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Walking into a conference without goals is like walking into a library without knowing what you want to read — you will wander, sample randomly, and leave with scattered impressions. Setting specific goals channels your attention and energy toward the outcomes that matter most, ensuring you extract maximum value from every hour at the event.


**How?**

1. Review the event agenda and speaker list. Identify the 5-7 sessions most relevant to your learning priorities.
2. Identify 3-5 people you want to meet: speakers, fellow attendees in your specialisation, or people from organisations you admire. Research them beforehand so you can have meaningful conversations.
3. Write down 2-3 specific questions you want answered by the end of the event (e.g., "What is the emerging best practise for X?" or "How are other organisations handling Y?").
4. Set a networking goal: exchange contact details with at least 5 new people per day.
5. Write your goals on an index card or phone note that you carry throughout the event. Review it each morning to stay focused.`,
        },
        {
          title: 'Follow up with new contacts within one week of the event', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2626",
              translation: "The Prophet (peace be upon him) said: \"A Muslim is the brother of a Muslim.\" Following up with new professional contacts to maintain beneficial ties is a form of maintaining brotherhood.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The value of conference networking is almost entirely in the follow-up. Without it, the connections you made evaporate within weeks. Following up within one week — while the shared experience is fresh — transforms a brief conversation into a lasting professional relationship. This is where conferences pay dividends for years to come.


**How?**

1. Within 48 hours of the event, review all the business cards and contact details you collected.
2. For each meaningful contact, send a personalised message referencing your specific conversation: "It was great discussing [topic] with you at [event]. I was particularly interested in your point about [specific detail]."
3. Offer something of value: an article relevant to your conversation, an introduction to someone in your network, or a follow-up to a question they asked.
4. Suggest a next step if appropriate: a virtual coffee chat, a LinkedIn connection, or a collaboration opportunity.
5. Add all new contacts to your professional network tracker (CRM, spreadsheet, or contact notes) with context about where you met and what you discussed.`,
        },
      ],
    },
    {
      title: 'Develop a personal "board of advisors" — 3–5 trusted people who challenge your professional thinking',
      priority: 'medium', tags: ['shura', 'accountability'],
      description: 'The Quranic principle of shura (consultation) applies to professional life as much as community governance. Building a personal advisory board of 3-5 people who know your work, challenge your thinking, and hold you accountable creates a structure for continuously improving your professional judgement.',
      subtasks: [
        {
          title: 'Identify 3-5 people whose professional judgement you deeply respect', done: false,
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
              translation: "The Prophet (peace be upon him) would consult his companions on matters not revealed by Allah.",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The quality of advice you receive is determined entirely by the quality of the people you ask. Your advisory board should not be composed of people who will simply agree with you — they should be people whose professional judgement you trust enough to follow even when their advice is uncomfortable. This is the essence of shura: consultation that genuinely influences decisions.


**How?**

1. Think about the people in your professional life whose opinions have changed your mind in the past. Who challenged an assumption and turned out to be right?
2. Consider people across different relationship types: a former manager, a respected peer, a client who gives brutally honest feedback, a professional from a different industry.
3. Assess each candidate on three dimensions: competence (do they know what they are talking about?), candour (will they tell you the truth, not what you want to hear?), and care (do they genuinely want to see you succeed?).
4. All three dimensions must be present. Competence without candour gives you polite but useless advice. Candour without care gives you harsh criticism without constructive direction.
5. Write down your top 5 candidates and the specific value each one brings to your thinking.`,
        },
        {
          title: 'Ensure diversity — different industries, perspectives, strengths, and backgrounds', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:13",
              arabic: "يَا أَيُّهَا النَّاسُ إِنَّا خَلَقْنَاكُم مِّن ذَكَرٍ وَأُنثَىٰ وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا",
              translation: "O mankind, We have created you from male and female and made you peoples and tribes that you may know one another. Diversity in one's advisors reflects the Quranic value of cross-cultural understanding.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A board of advisors who all think alike is an echo chamber, not a shura council. Diversity of perspective is what makes collective wisdom greater than individual insight. The Quran describes the ummah as a community of different nations and tribes so that they may know one another — this principle of beneficial diversity applies directly to your advisory board.


**How?**

1. Review your candidate list and map their backgrounds: industry, functional expertise, cultural background, age, and career stage.
2. Identify gaps: are all your candidates from the same industry? The same generation? The same worldview?
3. Actively seek out candidates who bring a missing dimension. If all your advisors are corporate professionals, consider adding an entrepreneur. If all are Muslim, consider adding a non-Muslim professional whose ethical compass you respect.
4. Include at least one person who is strong where you are weak — if you are a visionary thinker, include a detail-oriented operator; if you are technically gifted, include someone with strong people skills.
5. The goal is not diversity for its own sake but diversity that challenges your blind spots and broadens your perspective.`,
        },
        {
          title: 'Invite each with a clear explanation of what you\'re building and what you\'re asking', done: false,
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
              kind: "hadith",
              ref: "Sahih Muslim 2674",
              translation: "The Prophet (peace be upon him) said: \"Whoever guides someone to good will have a reward like that of the one who does it.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

People cannot help you effectively if they do not understand what you are asking. A clear invitation sets expectations, prevents misunderstandings, and demonstrates professionalism. It also honours the other person's time by letting them make an informed decision about whether to participate.


**How?**

1. Craft a personalised invitation for each person that includes:
   - What you are building: "I'm assembling a small personal advisory board of 3-5 people I trust to challenge my professional thinking."
   - Why them specifically: "I deeply respect your [specific quality or expertise], and I believe your perspective would be invaluable because [specific reason]."
   - What you are asking: "A quarterly conversation of about 45-60 minutes where I share my plans and challenges, and you give me honest feedback."
   - What you are not asking: clarify that this is informal, unpaid, and low-commitment. No one should feel trapped.
2. Deliver the invitation in person or by personal message — not in a group email.
3. Give them time to respond. Do not pressure an immediate answer.
4. If they decline, thank them sincerely and maintain the relationship. Do not make it awkward.
5. When someone accepts, confirm the first meeting date immediately.`,
        },
        {
          title: 'Schedule quarterly check-ins where you present your plans and receive candid feedback', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 42:38",
              arabic: "وَأَمْرُهُمْ شُورَىٰ بَيْنَهُمْ",
              translation: "And whose affair is determined by consultation among themselves. Quarterly check-ins with candid feedback are the practice of shura in professional life.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The structure of regular check-ins transforms an informal advisory relationship into a disciplined practice of shura. Quarterly cadence is ideal: frequent enough to maintain continuity but infrequent enough to respect everyone's time. Presenting your plans formally — rather than just chatting — ensures the feedback is substantive and actionable.


**How?**

1. Schedule the first round of meetings within the first month of forming the board. Coordinate schedules and choose a consistent time window (e.g., first week of each quarter).
2. Prepare a brief (1-2 page) quarterly update to share with each advisor before the meeting. Include: what you accomplished last quarter, what you plan for next quarter, and 2-3 specific questions or decisions you want their input on.
3. During the meeting, present your update in 10 minutes, then open the floor for questions and feedback for the remaining 30-45 minutes.
4. Take detailed notes. After the meeting, send a brief summary of the advice received and any actions you plan to take.
5. Track which advice you followed and what resulted — share these outcomes at the next meeting to close the feedback loop.`,
        },
        {
          title: 'Reciprocate — offer your own expertise and perspective to each advisor', done: false,
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
              ref: "Sahih Muslim 2674",
              translation: "The Prophet (peace be upon him) said: \"Whoever guides someone to good will have a reward like that of the one who does it.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A one-sided advisory relationship becomes a burden. Even if your advisors are more senior or experienced than you, you have unique perspectives, skills, and information that can benefit them. Reciprocating creates a mutually valuable relationship that is sustainable long-term.

**How?**

1. For each advisor, identify what you can uniquely offer: your expertise in a specific area, your knowledge of a different industry, your technical skills, your perspective as someone at a different career stage, or simply your fresh eyes on their challenges.
2. Proactively offer help: "Is there anything I can help you with? I'd love to reciprocate the value you bring to me."
3. Share relevant articles, introductions, or opportunities when you come across them — even outside of scheduled meetings.
4. Be attentive to their challenges: if an advisor mentions a problem you can help with, follow up with a concrete offer.
5. Express genuine gratitude regularly — not just at meetings, but when their advice proves valuable. Tell them the specific impact their guidance had.`,
        },
      ],
    },
  ],

  intellect_professional_excellence: [
    {
      title: 'Publish original research, a case study, or an innovation in your field',
      priority: 'medium', tags: ['publishing', 'contribution'],
      description: 'Publishing original work is how you shift from consuming knowledge to contributing to it. A published case study, research paper, or documented innovation establishes you as a thought leader and creates a lasting reference that benefits others in your field long after you move on.',
      subtasks: [
        {
          title: 'Identify a novel insight, solution, or finding from your professional work', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 96:3-5",
              arabic: "اقْرَأْ وَرَبُّكَ الْأَكْرَمُ * الَّذِي عَلَّمَ بِالْقَلَمِ * عَلَّمَ الْإِنسَانَ مَا لَمْ يَعْلَمْ",
              translation: "Read, and your Lord is the Most Generous, Who taught by the pen, taught man that which he knew not.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Every professional accumulates unique insights through their work, but few take the time to identify and articulate them. The knowledge sitting in your experience — a creative solution to a recurring problem, an unexpected finding, or a new approach that worked — has value beyond your immediate context. Identifying it is the first step to creating a contribution that benefits your entire field.


**How?**

1. Review your past 1-2 years of professional work. Look for moments where you solved a problem in an unconventional way, discovered something surprising, or developed a new method.
2. Ask yourself: "What do I know from experience that most people in my field have to learn the hard way? What would I teach a junior professional that isn't in any textbook?"
3. Talk to colleagues and clients: "What do you think I do differently or particularly well?" — their answers often point to your unique contributions.
4. Look for patterns: if you have solved the same type of problem multiple times using a consistent approach, that approach may be worth documenting.
5. Select the insight with the broadest applicability — the one that would help the most people if they knew about it.`,
        },
        {
          title: 'Research existing literature to confirm your contribution is genuinely original', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 17:36",
              arabic: "وَلَا تَقْفُ مَا لَيْسَ لَكَ بِهِ عِلْمٌ",
              translation: "And do not pursue that of which you have no knowledge. Confirming originality through literature review upholds this Quranic standard.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Publishing something that already exists wastes your time and damages your credibility. A thorough literature review ensures your contribution is genuinely original — or, if similar work exists, that you can clearly articulate how yours differs, extends, or improves upon it. This rigour is part of intellectual amanah: being honest about what is truly new.


**How?**

1. Search academic databases (Google Scholar, PubMed, IEEE, SSRN) and industry publications for work related to your insight.
2. Use multiple search terms — different authors may describe similar concepts with different terminology.
3. Read the abstracts and conclusions of the most relevant papers. If any closely match your insight, read them in full.
4. Ask yourself: "Has someone already said this? If so, what does my contribution add — new data, a different context, a better method, or a practical application?"
5. Document your literature review: a brief summary of what exists and a clear statement of how your contribution is different. This becomes the "literature review" section of your publication.`,
        },
        {
          title: 'Write the piece in a format appropriate for your field (journal article, case study, white paper)', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 55:1-4",
              arabic: "الرَّحْمَٰنُ ۚ عَلَّمَ الْقُرْآنَ ۚ خَلَقَ الْإِنسَانَ ۚ عَلَّمَهُ الْبَيَانَ",
              translation: "The Most Merciful — taught the Quran — created man — taught him eloquence.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 96:3-5",
              arabic: "اقْرَأْ وَرَبُّكَ الْأَكْرَمُ ۚ الَّذِي عَلَّمَ بِالْقَلَمِ",
              translation: "Read, and your Lord is the Most Generous — who taught by the pen.",
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

The format of your publication must match the norms of your field and the expectations of your audience. A journal article carries weight in academia; a case study resonates with practitioners; a white paper reaches business decision-makers. Choosing the right format and writing to its conventions ensures your work is taken seriously and reaches the people who can benefit from it most.


**How?**

1. Identify the format most respected in your field for the type of contribution you are making. Ask colleagues or your mentor for guidance.
2. Study 2-3 exemplary publications in that format — note their structure, length, tone, and level of detail.
3. Write your first draft following the standard structure:
   - **Journal article:** Abstract, Introduction, Literature Review, Methodology, Findings, Discussion, Conclusion.
   - **Case study:** Background, Challenge, Approach, Results, Lessons Learned.
   - **White paper:** Executive Summary, Problem Statement, Analysis, Recommendations, Conclusion.
4. Write the first draft without obsessing over perfection — get your ideas down, then refine.
5. Have a colleague review the draft for clarity, accuracy, and completeness before finalising.`,
        },
        {
          title: 'Submit to a reputable publication, conference, or platform', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 67",
              translation: "The Prophet (peace be upon him) said: \"Convey from me, even if it is one verse.\" Submitting one's work to reputable venues is a form of conveying beneficial knowledge.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A piece of writing sitting on your hard drive benefits no one. Submitting to a reputable publication, conference, or platform is the act that transforms private knowledge into public contribution. It also subjects your work to peer review, which strengthens it. The act of submission requires courage — putting your ideas into the world for scrutiny — but this is how knowledge advances.


**How?**

1. Research the most appropriate venues for your work: academic journals, industry magazines, conference proceedings, or professional platforms (Medium, LinkedIn articles, or industry-specific blogs).
2. Review the submission guidelines carefully — formatting, word count, citation style, and deadlines.
3. Tailor your piece to the specific venue: adjust the tone, depth, and emphasis to match their audience.
4. Submit according to their process. For peer-reviewed publications, be prepared for a review cycle of weeks to months.
5. If rejected, read the reviewer feedback carefully, revise, and submit to an alternative venue. Rejection is a normal part of the publishing process, not a judgement on your worth.`,
        },
        {
          title: 'Promote the work through your professional network', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 1017",
              translation: "The Prophet (peace be upon him) said: \"Whoever introduces a good practice in Islam will have its reward and the reward of those who act upon it after him.\" Promoting beneficial work extends its impact.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Publication alone does not guarantee that your work reaches the people who need it. Active promotion ensures that your contribution is seen, discussed, and applied. This is not vanity — it is stewardship of the knowledge you created. If your work can help others, you have a responsibility to ensure it reaches them.


**How?**

1. Share the publication on LinkedIn with a brief personal note explaining why you wrote it and who it is for.
2. Send it directly to colleagues, clients, or contacts who would specifically benefit from the insights.
3. Present the key findings at a team meeting, professional gathering, or webinar.
4. If the piece generates discussion or questions, engage thoughtfully — this builds your reputation as a contributor, not just a publisher.
5. Add the publication to your professional portfolio and update your CV. Track its reach: downloads, citations, shares, or feedback received.`,
        },
      ],
    },
    {
      title: 'Take on a leadership or governance role — board position, committee chair, or department head',
      priority: 'medium', tags: ['leadership', 'impact'],
      description: 'Leadership is an amanah (trust) — a responsibility to steward something larger than yourself. Taking on a governance or leadership role in your profession amplifies your impact from individual contribution to systemic influence. It is also where you practice the Islamic values of justice, shura, and servant leadership at scale.',
      subtasks: [
        {
          title: 'Identify leadership opportunities in your organisation, professional body, or community', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:58",
              arabic: "إِنَّ اللَّهَ يَأْمُرُكُمْ أَن تُؤَدُّوا الْأَمَانَاتِ إِلَىٰ أَهْلِهَا",
              translation: "Indeed, Allah commands you to render trusts to those to whom they are due. Leadership is an amanah (trust) that must be sought with the intention to serve.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Leadership opportunities rarely announce themselves to those who are not looking. Many board positions, committee roles, and governance opportunities are filled through networks and proactive expressions of interest rather than public job postings. Actively scanning for these opportunities positions you to step into leadership when the right role emerges.


**How?**

1. Within your organisation: speak to senior leaders about upcoming leadership vacancies, committee formations, or project governance roles.
2. Within your professional body: check the website for board elections, committee memberships, or volunteer leadership positions. Many professional associations actively seek engaged members for governance.
3. Within your community: mosques, schools, charities, and community organisations often need skilled professionals for their boards and committees.
4. Ask your mentor and advisory board: "What leadership opportunities should I be considering at this stage of my career?"
5. Create a list of 3-5 realistic opportunities that match your current capacity and professional stage. Not every role is right for you right now — be strategic.`,
        },
        {
          title: 'Assess your readiness — do you have the skills, time, and support to lead well?', done: false,
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
              ref: "Sahih al-Bukhari 7138",
              translation: "The Prophet (peace be upon him) said: \"Each of you is a shepherd and each of you is responsible for his flock.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Taking on a leadership role you are not ready for harms both you and the people you are meant to serve. Honest self-assessment of your skills, available time, and support system ensures you step into leadership when you can genuinely serve, not just when you want the title.

**How?**

1. Skills assessment: Does the role require skills you have (strategy, governance, people management, financial oversight)? Be specific — "leadership" is too vague.
2. Time assessment: How many hours per month does the role realistically require? Map this against your current commitments. Will something need to give?
3. Support assessment: Does your family understand and support this commitment? Does your employer permit it? Will it conflict with other obligations?
4. Seek external input: ask a trusted advisor, "Do you think I'm ready for this role? What gaps should I address first?"
5. If you identify readiness gaps, create a short plan to address them before applying. It is better to prepare for 3-6 months and lead well than to jump in unprepared.`,
        },
        {
          title: 'Express your interest or apply for the role', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 1825",
              translation: "The Prophet (peace be upon him) said: \"Each of you is a shepherd and each of you is responsible for his flock.\" Expressing interest in a leadership role carries the weight of this responsibility.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Many qualified professionals never lead because they wait to be asked. Expressing interest is not arrogance — it is responsibility. If you have assessed your readiness and believe you can serve well, stepping forward is an act of courage and service. The Islamic principle is that leadership should be given to those who are competent and do not seek it for ego, but there is nothing wrong with making your competence known.


**How?**

1. For formal roles: prepare a compelling application that highlights your relevant experience, your vision for the role, and what you bring that others may not.
2. For informal or networked roles: have a direct conversation with the decision-maker. Express your interest clearly: "I'd like to contribute to [the board/committee/team] because [specific reason connected to your mission and their need]."
3. Prepare for questions about your time commitment, potential conflicts of interest, and your leadership philosophy.
4. If there is a selection process, treat it with the same rigour you would a job interview: research the organisation, understand their challenges, and articulate how you would address them.
5. If not selected, ask for feedback and express continued interest for future opportunities. Persistence without desperation is respected.`,
        },
        {
          title: 'If appointed, establish clear goals for your tenure in the first 30 days', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:159",
              arabic: "فَبِمَا رَحْمَةٍ مِّنَ اللَّهِ لِنتَ لَهُمْ ۖ وَلَوْ كُنتَ فَظًّا غَلِيظَ الْقَلْبِ لَانفَضُّوا مِنْ حَوْلِكَ",
              translation: "So by mercy from Allah, you were lenient with them. And if you had been rude and harsh in heart, they would have disbanded from about you.",
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

The first 30 days of any leadership role set the tone for your entire tenure. Leaders who begin without clear goals drift into reactive management — responding to whatever lands on their desk rather than driving intentional change. Establishing goals early creates accountability, builds confidence among those you lead, and ensures your limited time in the role produces lasting impact.


**How?**

1. In the first week, listen: meet with key stakeholders, review recent meeting minutes, and understand the current state of the team or organisation.
2. By day 15, identify the 2-3 most impactful goals you can realistically achieve during your tenure. These should be specific, measurable, and meaningful — not a laundry list.
3. Write a brief "tenure goals" document and share it with the people you will be working with. Invite feedback and adjust.
4. Identify quick wins — small improvements you can make in the first 30 days to build momentum and credibility.
5. Set quarterly milestones for each goal and schedule regular reviews. A goal without a check-in date is a wish.`,
        },
        {
          title: 'Lead with the principles of shura, adl (justice), and ihsan (excellence)', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 7:159",
              arabic: "**Translation:** And of the people of Mûsâ (Moses) there is a community who lead (the men) with truth and establish justice therewith (i.e. judge among men with truth and justice).",
              translation: "And of the people of Mûsâ (Moses) there is a community who lead (the men) with truth and establish justice therewith (i.e. judge among men with truth and justice).",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 660",
              translation: "The Prophet (peace be upon him) said: \"Allah will give shade to seven (people) under His Shade on the Day when there will be no shade but His. (These seven persons are:) a just ruler, a youth who has been brought up in the worship of Allah, a man whose heart is attached to the mosques, two persons who love each other only for Allah's sake and they meet and part in Allah's cause only, a man who refuses the call of a charming woman of noble birth for illicit intercourse with her and says: 'I am afraid of Allah,' a man who gives in charity so secretly that his left hand does not know what his right hand has given, and a man who remembered Allah in seclusion and his eyes became flooded with tears.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Islamic leadership is servant leadership: you are there to serve those you lead, not to accumulate authority. The three principles of shura (consultation), adl (justice), and ihsan (excellence) provide a complete framework for how to lead. Shura ensures wise decisions through collective input. Adl ensures fair treatment of everyone. Ihsan ensures that everything you do reflects the highest standard of quality and care.


**How?**

1. **Shura (consultation):** Before making any significant decision, consult the people it affects. Create structures for input: regular meetings, anonymous feedback channels, or one-on-one check-ins. Genuinely consider input — do not consult performatively.
2. **Adl (justice):** Apply rules and expectations consistently. Do not show favouritism, even to people you like or who support you. When conflicts arise, hear all sides before deciding. Document decisions and their reasoning for transparency.
3. **Ihsan (excellence):** Hold yourself to a higher standard than you hold others. Be the first to arrive and the last to leave (metaphorically). Deliver on your commitments. Pay attention to details that others overlook.
4. Regularly ask yourself: "Am I leading in a way I would be proud to present to Allah?" This is the ultimate accountability.
5. At the end of your tenure, seek honest feedback on your leadership and document lessons learned for your successor.`,
        },
      ],
    },
    {
      title: 'Design and deliver a training programme that uplifts others in your profession',
      priority: 'low', tags: ['teaching', 'legacy'],
      description: ' Designing a training programme takes your accumulated expertise and makes it accessible to others, multiplying your impact. It is a form of sadaqah jariyah — ongoing charity that continues to benefit people long after you deliver it.',
      subtasks: [
        {
          title: 'Identify the most common skill gap or struggle among junior professionals in your field', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5027",
              translation: "The Prophet (peace be upon him) said: \"The best among you are those who learn the Quran and teach it.\" Identifying skill gaps in others and designing training to address them is among the highest forms of teaching.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The most impactful training programmes address real, widespread needs — not what you enjoy teaching, but what learners desperately need to learn. Starting with the most common struggle ensures your programme serves the greatest number of people and solves a genuine problem. This is the difference between a training programme that is interesting and one that is transformative.


**How?**

1. Talk to junior professionals in your field: ask them directly, "What is the hardest part of your job? Where do you feel least prepared?"
2. Talk to managers and team leads: "What is the most common gap you see in junior hires? Where do they consistently struggle?"
3. Review online forums, subreddits, and professional communities for recurring questions and frustrations from early-career professionals.
4. Reflect on your own early career: what did you wish someone had taught you? What took you years to learn that could have taken weeks with the right guidance?
5. Identify the single most common and impactful gap — this is your training programme's focus. Resist the temptation to address everything; depth on one topic beats breadth across many.`,
        },
        {
          title: 'Design a curriculum that addresses this gap with clear learning outcomes', done: false,
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
              ref: "Quran 9:122",
              arabic: "فَلَوْلَا نَفَرَ مِن كُلِّ فِرْقَةٍ مِّنْهُمْ طَائِفَةٌ لِّيَتَفَقَّهُوا فِي الدِّينِ",
              translation: "For there should separate from every division of them a group to obtain understanding in the religion.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 2685",
              translation: "The Prophet (peace be upon him) said: \"The best of you is the one who learns the Quran and teaches it.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A curriculum without clear learning outcomes is a collection of topics, not a programme. Learning outcomes define what participants will be able to do after completing the training — not just what they will know. This outcome-focused design ensures every module, exercise, and minute of the programme serves a purpose and that success is measurable.


**How?**

1. Write 3-5 specific learning outcomes using the format: "By the end of this programme, participants will be able to [specific, observable action]."
2. Work backwards from these outcomes: what knowledge, skills, and practice does a learner need to achieve each outcome?
3. Organise the content into a logical sequence of modules — each building on the previous one. A typical structure:
   - Module 1: Foundation (concepts and context)
   - Module 2-3: Core skills (the main content)
   - Module 4: Application (putting it all together in a realistic scenario)
4. For each module, estimate the time required and the teaching method (lecture, discussion, hands-on exercise, case study).
5. Build in assessment points: how will you know if participants are achieving the outcomes? Include at least one practical exercise per module.`,
        },
        {
          title: 'Create materials: slides, exercises, case studies, and assessments', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 55:1-4",
              arabic: "الرَّحْمَٰنُ * عَلَّمَ الْقُرْآنَ * خَلَقَ الْإِنسَانَ * عَلَّمَهُ الْبَيَانَ",
              translation: "The Most Merciful, taught the Quran, created man, and taught him eloquence. Creating teaching materials reflects the divine gift of bayan (clear expression).",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Materials are the tangible delivery mechanism for your curriculum. High-quality materials allow participants to learn during the session and reference the content afterwards. They also allow the programme to be delivered by others in the future, extending its reach beyond your personal capacity. This is where your training programme becomes a lasting resource.


**How?**

1. For each module, create:
   - **Slides or notes:** Clear, visual, and concise. Avoid walls of text — use diagrams, examples, and key points.
   - **Exercises:** Hands-on activities that let participants practise the skill in a safe environment. Include clear instructions and expected outcomes.
   - **Case studies:** Real-world scenarios (anonymised if necessary) that illustrate the concepts in context.
   - **Assessments:** Short quizzes, practical assignments, or reflection questions that measure learning.
2. Write a facilitator guide: notes for anyone delivering the programme on timing, common questions, and how to handle different skill levels.
3. Create participant handouts: summaries, checklists, or reference sheets they can take away.
4. Ensure all materials are accessible: clear fonts, sufficient contrast, and available in formats participants can use.
5. Review all materials for accuracy, clarity, and coherence. Have a colleague review them with fresh eyes.`,
        },
        {
          title: 'Pilot the programme with a small cohort and gather detailed feedback', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 1017",
              translation: "The Prophet (peace be upon him) said: \"Whoever introduces a good practice in Islam will have its reward and the reward of those who act upon it after him.\" Piloting with a small cohort refines the practice before wider adoption.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A training programme that has not been tested is a theory, not a product. Piloting with a small cohort reveals what works, what does not, and what you did not anticipate — insights that are impossible to gain from design alone. The pilot cohort's feedback is the most valuable input you will receive, and acting on it dramatically improves the programme before it reaches a larger audience.


**How?**

1. Recruit 5-10 participants who match your target audience. Explain that this is a pilot and their honest feedback is essential.
2. Deliver the full programme as designed, but take detailed notes on what worked, what fell flat, and where participants struggled or excelled.
3. After each module, collect brief feedback: "What was most useful? What was confusing? What would you change?"
4. At the end of the programme, conduct a more thorough evaluation: a survey covering content quality, pacing, materials, exercises, and overall impact.
5. Ask the most candid question: "Would you recommend this programme to a colleague? If not, what would need to change?"`,
        },
        {
          title: 'Iterate based on feedback and deliver to a larger audience', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:104",
              arabic: "وَلْتَكُن مِّنكُمْ أُمَّةٌ يَدْعُونَ إِلَى الْخَيْرِ وَيَأْمُرُونَ بِالْمَعْرُوفِ",
              translation: "And let there be arising from you a nation inviting to all that is good, enjoining what is right.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The gap between a pilot and a polished programme is closed by iteration. Taking pilot feedback seriously and making substantive changes — not just cosmetic tweaks — is what separates excellent training from mediocre training. This iterative mindset is itself a professional virtue: the willingness to improve based on evidence rather than defending your first draft.


**How?**

1. Review all pilot feedback systematically. Categorise it: content issues, pacing issues, material quality, exercise effectiveness, and facilitation.
2. Prioritise changes by impact: fix the issues that affected the most participants or that undermined the learning outcomes most severely.
3. Revise materials, restructure modules, and adjust timing based on what you learned.
4. If possible, run one more small cohort with the revised programme to verify that your changes worked.
5. Once confident, deliver to a larger audience through your organisation, professional community, or a public platform. Consider partnering with a professional body or training organisation to extend your reach.`,
        },
        {
          title: 'Make materials available as a lasting resource (open-source, community library, or online)', done: false,
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
              ref: "Sahih Muslim 2674",
              translation: "The Prophet (peace be upon him) said: \"Whoever guides someone to good will have a reward like that of the one who does it.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The greatest impact of a training programme comes not from the sessions you personally deliver, but from the materials that continue to teach after you stop. Making your materials freely available is a profound act of sadaqah jariyah — ongoing charity. Every person who learns from your materials, and every person they go on to help, adds to your account of good deeds. This is legacy in its truest Islamic sense.


**How?**

1. Choose a distribution platform appropriate to your field: GitHub for technical materials, a personal website, a professional community library, or a platform like Coursera or Udemy.
2. License your materials appropriately: a Creative Commons licence (e.g., CC BY-SA) allows others to use and adapt your work while giving you credit.
3. Package the materials for self-study: add written instructions, reading orders, and self-assessment guides so people can use them without a facilitator.
4. Announce the resource through your professional network, relevant online communities, and your organisation.
5. Maintain the materials: update them annually to reflect new developments in your field. Invite community contributions if appropriate — let others improve what you started.`,
        },
      ],
    },
  ],
};
