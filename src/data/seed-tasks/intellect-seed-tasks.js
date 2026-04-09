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
        { title: 'Learn the 28 Arabic letters and their forms (isolated, initial, medial, final)', done: false },
        { title: 'Study the basic tajweed rules: noon sakinah, meem sakinah, and madd', done: false },
        { title: 'Practice reading from Juz Amma with a teacher or qualified app', done: false },
        { title: 'Recite one page daily from the mushaf without transliteration', done: false },
        { title: 'Record yourself reciting and compare against a sheikh\'s recitation', done: false },
      ],
    },
    {
      title: 'Identify the core knowledge your profession or calling requires and map your gaps',
      priority: 'high', tags: ['learning', 'planning'],
      description: 'Islam demands itqan (excellence) in one\'s work, which begins with knowing what you need to know. Conduct an honest audit of the knowledge and competencies your field requires, then identify where you fall short so you can build a targeted learning plan.',
      subtasks: [
        { title: 'List the top 10 knowledge areas and skills your profession demands', done: false },
        { title: 'Rate yourself honestly (1-5) on each area', done: false },
        { title: 'Identify the 3 largest gaps with the highest impact on your effectiveness', done: false },
        { title: 'Research courses, books, or mentors that address each gap', done: false },
        { title: 'Create a 90-day learning plan with specific milestones', done: false },
      ],
    },
    {
      title: 'Establish a daily reading habit — minimum 20 pages or 30 minutes',
      priority: 'high', tags: ['reading', 'discipline'],
      description: 'The first word revealed to the Prophet (peace be upon him) was "Iqra" — Read. Consistent reading expands your vocabulary, deepens comprehension, and builds the cognitive endurance needed for serious intellectual work. This task anchors reading as a non-negotiable daily practice.',
      subtasks: [
        { title: 'Choose your first book and set a specific daily reading time', done: false },
        { title: 'Designate a distraction-free reading space', done: false },
        { title: 'Track your daily reading streak for 30 consecutive days', done: false },
        { title: 'Write a brief reflection or note after each reading session', done: false },
      ],
    },
    {
      title: 'Learn the Islamic obligation to seek knowledge — study hadith "Seek knowledge from the cradle to the grave"',
      priority: 'medium', tags: ['aqidah', 'knowledge'],
      description: 'Understanding that seeking knowledge is a religious obligation (fard) transforms learning from a personal ambition into an act of worship. Study the Quranic verses and ahadith that establish the rank of scholars and the duty of lifelong learning.',
      subtasks: [
        { title: 'Study Surah Al-Alaq (96:1-5) and its significance as the first revelation', done: false },
        { title: 'Read the hadith collections on the virtue of knowledge (Sahih Muslim, Kitab al-Ilm)', done: false },
        { title: 'Learn the distinction between fard ayn and fard kifayah knowledge', done: false },
        { title: 'Write a personal reflection on how seeking knowledge is ibadah in your life', done: false },
      ],
    },
    {
      title: 'Complete a foundational course in Islamic sciences (fiqh, aqidah, or seerah)',
      priority: 'high', tags: ['islamic-education', 'study'],
      description: 'Every Muslim needs a baseline understanding of their faith — how to worship correctly (fiqh), what to believe (aqidah), and who the Prophet (peace be upon him) was (seerah). Completing a structured course ensures your foundation is solid rather than piecemeal.',
      subtasks: [
        { title: 'Research reputable Islamic institutes offering structured courses (online or local)', done: false },
        { title: 'Select one subject area (fiqh, aqidah, or seerah) to start with', done: false },
        { title: 'Enrol and commit to a weekly study schedule', done: false },
        { title: 'Complete all assignments and assessments in the course', done: false },
        { title: 'Summarise key lessons in a personal knowledge notebook', done: false },
      ],
    },
  ],
  intellect_learning_growth: [
    {
      title: 'Read one non-fiction book per month across diverse disciplines (science, history, philosophy)',
      priority: 'high', tags: ['reading', 'breadth'],
      description: 'The Quran repeatedly urges reflection on creation, history, and the natural world. Reading across disciplines builds the cross-pollinating knowledge base that produces genuine insight and protects against intellectual narrowness.',
      subtasks: [
        { title: 'Create a 12-month reading list spanning at least 4 different disciplines', done: false },
        { title: 'Set a monthly reading target and calendar reminder', done: false },
        { title: 'Write a one-page summary and key takeaways for each book', done: false },
        { title: 'Share one insight per book with a friend, study circle, or online community', done: false },
      ],
    },
    {
      title: 'Enrol in a structured course or programme aligned with your life mission',
      priority: 'high', tags: ['learning', 'skill-building'],
      description: 'Structured learning with deadlines, assessments, and feedback is far more effective than passive self-study. Align your next formal education investment with your overarching life mission so that every hour of study compounds toward your purpose.',
      subtasks: [
        { title: 'Clarify your life mission statement and the skills it demands', done: false },
        { title: 'Research 3-5 courses or programmes that directly serve that mission', done: false },
        { title: 'Evaluate each on cost, time commitment, credential value, and Islamic compatibility', done: false },
        { title: 'Enrol and block out study time in your weekly schedule', done: false },
        { title: 'Complete the course and document what you learned', done: false },
      ],
    },
    {
      title: 'Study one new language at an intermediate level (Arabic priority for Muslims)',
      priority: 'medium', tags: ['arabic', 'language'],
      description: 'Language opens entire civilisations of thought. For Muslims, Arabic unlocks the Quran, hadith, and classical scholarship without the filter of translation. Even for non-Arabic languages, bilingualism strengthens cognitive flexibility and empathy.',
      subtasks: [
        { title: 'Choose your target language and define "intermediate level" concretely', done: false },
        { title: 'Select a primary learning method (course, tutor, app, or immersion)', done: false },
        { title: 'Commit to 20-30 minutes of daily practice', done: false },
        { title: 'Find a conversation partner or language exchange', done: false },
        { title: 'Set a 6-month milestone test to measure progress', done: false },
      ],
    },
    {
      title: 'Build a personal library — curate 50 essential books across faith, profession, and worldview',
      priority: 'low', tags: ['reading', 'curation'],
      description: 'A personal library is a physical manifestation of your intellectual priorities. Curating it intentionally across faith, profession, and worldview ensures you have depth in what matters and breadth to think across boundaries.',
      subtasks: [
        { title: 'List 15-20 essential Islamic books (tafsir, fiqh, seerah, spirituality)', done: false },
        { title: 'List 15-20 essential books in your professional domain', done: false },
        { title: 'List 10-15 books on worldview, history, philosophy, or science', done: false },
        { title: 'Acquire and shelve the books you don\'t yet own', done: false },
        { title: 'Create a reading order that alternates between categories', done: false },
      ],
    },
  ],
  intellect_learning_excellence: [
    {
      title: 'Author an original piece of work — article, paper, book, or curriculum',
      priority: 'medium', tags: ['writing', 'legacy'],
      description: 'The scholars of Islam preserved and advanced knowledge by writing. Authoring original work forces you to synthesise what you know, fill gaps in your understanding, and contribute something lasting. It is one of the highest forms of sadaqah jariyah for the intellect.',
      subtasks: [
        { title: 'Choose your topic and define the thesis or central argument', done: false },
        { title: 'Create a detailed outline with sections and key points', done: false },
        { title: 'Write the first draft without editing — get the ideas down', done: false },
        { title: 'Seek feedback from at least two knowledgeable reviewers', done: false },
        { title: 'Revise and publish through an appropriate channel', done: false },
      ],
    },
    {
      title: 'Mentor at least one student or younger person in your area of expertise',
      priority: 'medium', tags: ['mentorship', 'legacy'],
      description: 'The Prophet (peace be upon him) invested deeply in developing the next generation. Mentorship is how knowledge survives beyond your lifetime. Teaching also deepens your own mastery — you do not truly understand something until you can explain it to another.',
      subtasks: [
        { title: 'Identify a mentee — someone eager to learn in your area of strength', done: false },
        { title: 'Establish a regular meeting cadence (weekly or biweekly)', done: false },
        { title: 'Define clear learning goals together for a 3-6 month period', done: false },
        { title: 'Share resources, provide feedback on their work, and challenge them', done: false },
        { title: 'Review progress at the end of the period and set next steps', done: false },
      ],
    },
    {
      title: 'Develop and publish a structured learning pathway or curriculum in your field',
      priority: 'low', tags: ['teaching', 'contribution'],
      description: 'Creating a curriculum is an act of intellectual stewardship — you distil years of experience into a pathway others can follow. This compounds your impact far beyond what one-on-one mentorship alone can achieve.',
      subtasks: [
        { title: 'Define the target audience and their starting knowledge level', done: false },
        { title: 'Map the learning outcomes — what should a graduate of this pathway be able to do?', done: false },
        { title: 'Structure the curriculum into modules with clear progression', done: false },
        { title: 'Create or curate learning materials for each module', done: false },
        { title: 'Pilot the curriculum with a small group and iterate based on feedback', done: false },
        { title: 'Publish and make it accessible to your community', done: false },
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
        { title: 'Establish a personal rule: never share anything you haven\'t verified', done: false },
        { title: 'Learn to identify common red flags in unverified content (no source, emotional language, too good/bad to be true)', done: false },
        { title: 'Bookmark 3-5 reliable fact-checking resources', done: false },
        { title: 'Practice the rule for 30 days and note how often you catch yourself', done: false },
        { title: 'Delete or correct any previously shared misinformation', done: false },
      ],
    },
    {
      title: 'Study the Islamic epistemology of knowledge — categories of certainty (qat\'i vs. dhanni)',
      priority: 'high', tags: ['epistemology', 'islamic-knowledge'],
      description: 'Islamic scholarship developed a sophisticated framework for categorising knowledge by certainty. Understanding the difference between definitive (qat\'i) and speculative (dhanni) evidence teaches intellectual humility and prevents you from being dogmatic about matters that are genuinely open to interpretation.',
      subtasks: [
        { title: 'Study the definitions of qat\'i (definitive) and dhanni (speculative) in usul al-fiqh', done: false },
        { title: 'Learn the categories of hadith authentication (sahih, hasan, da\'if, mawdu\')', done: false },
        { title: 'Understand how scholars derive rulings from texts of different certainty levels', done: false },
        { title: 'Apply this framework to one contemporary debate — identify what is qat\'i vs. dhanni', done: false },
      ],
    },
    {
      title: 'Learn the logical fallacies — identify them in media, debate, and your own thinking',
      priority: 'high', tags: ['logic', 'critical-thinking'],
      description: 'Logical fallacies are errors in reasoning that make arguments appear valid when they are not. The Muslim intellectual tradition, from Al-Ghazali to Ibn Taymiyyah, engaged deeply with logic. Recognising fallacies protects you from manipulation and sharpens your own arguments.',
      subtasks: [
        { title: 'Study the 15 most common logical fallacies (ad hominem, straw man, appeal to authority, etc.)', done: false },
        { title: 'Identify one fallacy per day in news, social media, or conversation for two weeks', done: false },
        { title: 'Review your own recent arguments or opinions for fallacious reasoning', done: false },
        { title: 'Practice constructing valid syllogisms on everyday topics', done: false },
      ],
    },
    {
      title: 'Practise steelmanning — before critiquing any position, articulate it in its strongest form',
      priority: 'medium', tags: ['reasoning', 'fairness'],
      description: 'Islam commands justice even toward those you disagree with (5:8). Steelmanning — presenting an opposing view in its strongest possible form before critiquing it — is the intellectual embodiment of that command. It builds genuine understanding and earns respect in discourse.',
      subtasks: [
        { title: 'Choose a position you currently disagree with', done: false },
        { title: 'Research the strongest arguments for that position from its best advocates', done: false },
        { title: 'Write a 1-page defence of the position as if you held it', done: false },
        { title: 'Only then write your critique — noting which parts of the steelman remain strong', done: false },
        { title: 'Repeat this exercise monthly with different topics', done: false },
      ],
    },
    {
      title: 'Audit your main news and information sources — classify them by reliability and bias',
      priority: 'high', tags: ['media-literacy', 'verification'],
      description: 'Your worldview is shaped by your information diet. An unaudited information diet leads to distorted thinking. This task involves mapping every regular source you consume, evaluating its reliability and bias, and deliberately diversifying to correct blind spots.',
      subtasks: [
        { title: 'List every news source, podcast, social media account, and newsletter you consume regularly', done: false },
        { title: 'Rate each source on factual reliability (high/medium/low) and political or ideological lean', done: false },
        { title: 'Identify gaps — are you missing perspectives from other schools of thought, regions, or disciplines?', done: false },
        { title: 'Add 2-3 high-quality sources that balance your current diet', done: false },
        { title: 'Remove or reduce consumption of consistently unreliable sources', done: false },
      ],
    },
  ],
  intellect_thinking_growth: [
    {
      title: 'Study a foundational text on logic or philosophy — e.g., Aristotle\'s categories or Al-Ghazali\'s Maqasid al-Falasifah',
      priority: 'medium', tags: ['logic', 'philosophy'],
      description: 'The Muslim intellectual tradition engaged deeply with Greek logic and developed it further. Studying a foundational text in logic or philosophy — whether from the Western or Islamic tradition — builds the conceptual vocabulary needed for rigorous thinking about any subject.',
      subtasks: [
        { title: 'Choose your text — Al-Ghazali\'s Maqasid al-Falasifah, Aristotle\'s Organon, or an equivalent', done: false },
        { title: 'Find a commentary or study guide to read alongside the primary text', done: false },
        { title: 'Read one chapter per week and write notes summarising the key arguments', done: false },
        { title: 'Discuss the text with a study partner or in a reading circle', done: false },
        { title: 'Write a final reflection on how the text changed or refined your thinking', done: false },
      ],
    },
    {
      title: 'Apply a structured decision-making framework (e.g., istikharah + pros/cons + shura) to your next major decision',
      priority: 'high', tags: ['decision-making', 'istikhara'],
      description: 'Islam provides a comprehensive decision-making toolkit: istikharah (seeking divine guidance), shura (consultation), and rational analysis. Combining all three into a structured framework protects against impulsiveness and ensures major decisions are made with both spiritual and intellectual rigour.',
      subtasks: [
        { title: 'Identify your next major decision and write it as a clear question', done: false },
        { title: 'Conduct a thorough rational analysis — list pros, cons, risks, and second-order effects', done: false },
        { title: 'Consult 2-3 trusted advisors (shura) and document their perspectives', done: false },
        { title: 'Pray istikharah with sincerity and an open heart', done: false },
        { title: 'Make the decision, document your reasoning, and review the outcome after 90 days', done: false },
      ],
    },
    {
      title: 'Practice adversarial thinking — challenge your own deeply held assumptions monthly',
      priority: 'medium', tags: ['critical-thinking', 'muhasaba'],
      description: 'Muhasaba (self-accounting) extends to the intellect, not just behaviour. Deliberately challenging your own assumptions prevents intellectual stagnation and protects against the arrogance of certainty in matters that warrant humility.',
      subtasks: [
        { title: 'Pick one belief you hold strongly and ask: "What evidence would change my mind?"', done: false },
        { title: 'Research the strongest counter-arguments to that belief', done: false },
        { title: 'Write an honest assessment — does your belief survive scrutiny or need refinement?', done: false },
        { title: 'Schedule this exercise as a monthly calendar event', done: false },
      ],
    },
    {
      title: 'Study cognitive bias — read "Thinking, Fast and Slow" or equivalent Islamic-compatible text',
      priority: 'medium', tags: ['psychology', 'critical-thinking'],
      description: 'The nafs (self) has biases that distort perception and judgement. Modern cognitive science has catalogued these biases extensively. Understanding them is a form of self-knowledge that the Quran encourages, helping you recognise when your thinking is being hijacked by emotion, ego, or mental shortcuts.',
      subtasks: [
        { title: 'Read "Thinking, Fast and Slow" by Daniel Kahneman or a comparable text', done: false },
        { title: 'Create a personal list of the 10 biases you are most susceptible to', done: false },
        { title: 'For each bias, write one real example from your own experience', done: false },
        { title: 'Develop a personal checklist to review before making important decisions', done: false },
        { title: 'Share your findings with a friend or study partner for mutual accountability', done: false },
      ],
    },
  ],
  intellect_thinking_excellence: [
    {
      title: 'Write a structured analysis of a complex issue in your field — demonstrate cross-disciplinary reasoning',
      priority: 'medium', tags: ['writing', 'analysis'],
      description: 'The highest level of intellectual contribution involves synthesising insights from multiple disciplines to illuminate a complex problem. This task pushes you to move beyond consuming knowledge to producing it — integrating your professional expertise with Islamic principles and other fields.',
      subtasks: [
        { title: 'Select a genuinely complex issue in your field that has no simple answer', done: false },
        { title: 'Research the issue from at least 3 disciplinary perspectives', done: false },
        { title: 'Draft a structured analysis with clear thesis, evidence, and conclusions', done: false },
        { title: 'Include an Islamic ethical lens — what does the Shariah framework illuminate about this issue?', done: false },
        { title: 'Seek peer review from someone in a different discipline', done: false },
        { title: 'Publish or present your analysis', done: false },
      ],
    },
    {
      title: 'Lead a structured debate or seminar — present and defend a reasoned position publicly',
      priority: 'low', tags: ['leadership', 'communication'],
      description: 'The ability to present ideas clearly and defend them under scrutiny is a mark of intellectual maturity. The Islamic scholarly tradition of munazara (formal debate) honoured this skill. Leading a public discussion builds both your confidence and your community\'s intellectual culture.',
      subtasks: [
        { title: 'Choose a topic you are qualified to discuss and that benefits your community', done: false },
        { title: 'Prepare a structured presentation with thesis, evidence, and anticipated objections', done: false },
        { title: 'Invite participants and set ground rules for respectful discourse', done: false },
        { title: 'Deliver the presentation and engage with questions and challenges', done: false },
        { title: 'Write a post-event reflection on what you learned from the discussion', done: false },
      ],
    },
    {
      title: 'Solve a meaningful, complex problem in your community using original research and analysis',
      priority: 'medium', tags: ['impact', 'problem-solving'],
      description: 'Knowledge without application is like a tree without fruit. This task challenges you to identify a real problem affecting your community and apply your intellectual capabilities to solve it — moving from theory to tangible impact, which is the ultimate purpose of Hifz al-Aql.',
      subtasks: [
        { title: 'Identify a persistent problem in your local Muslim community or professional network', done: false },
        { title: 'Conduct original research — surveys, interviews, data analysis — to understand root causes', done: false },
        { title: 'Develop a proposed solution grounded in evidence and Islamic principles', done: false },
        { title: 'Present the solution to community leaders or stakeholders for feedback', done: false },
        { title: 'Implement the solution (or a pilot) and measure results', done: false },
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
        { title: 'Track your screen time for one week — categorise every app and site by value', done: false },
        { title: 'Identify the top 3 time-wasting or mind-dulling inputs', done: false },
        { title: 'Delete, block, or set strict time limits on each', done: false },
        { title: 'Replace the freed time with intentional alternatives (reading, dhikr, learning)', done: false },
        { title: 'Review and adjust after 30 days', done: false },
      ],
    },
    {
      title: 'Establish a "no phone first hour" morning protocol — protect your cognitive prime time',
      priority: 'high', tags: ['focus', 'discipline'],
      description: 'The first hour after waking is when your mind is freshest and most receptive. The Sunnah morning routine — Fajr prayer, adhkar, Quran — fills this time with what matters most. Allowing the phone to hijack this window means surrendering your best cognitive hours to other people\'s agendas.',
      subtasks: [
        { title: 'Set your phone to airplane mode or Do Not Disturb before sleeping', done: false },
        { title: 'Design a morning protocol: Fajr, adhkar, Quran, then breakfast before any screen', done: false },
        { title: 'Place your phone in a different room overnight if needed', done: false },
        { title: 'Track adherence for 21 days to build the habit', done: false },
      ],
    },
    {
      title: 'Practise the Sunnah of silence (samt) — designate daily quiet periods for reflection',
      priority: 'high', tags: ['reflection', 'sunnah'],
      description: 'The Prophet (peace be upon him) would spend extended periods in contemplative silence, and he advised that those who believe in Allah and the Last Day should speak good or remain silent. Deliberate silence creates space for tafakkur (contemplation) and protects the intellect from the noise of constant stimulation.',
      subtasks: [
        { title: 'Designate a 30-60 minute daily window of complete silence — no speech, no media', done: false },
        { title: 'Use this time for tafakkur, journaling, or simply sitting with your thoughts', done: false },
        { title: 'Notice what arises in silence — insights, anxieties, ideas — and write them down', done: false },
        { title: 'Gradually extend the practice or add a second daily session', done: false },
      ],
    },
    {
      title: 'Learn and apply the Islamic concept of ʿilm al-yaqin (knowledge with certainty) — do not opine without evidence',
      priority: 'medium', tags: ['epistemology', 'sidq'],
      description: 'The Quran condemns speaking about what one has no knowledge of (17:36). This task involves internalising the discipline of intellectual honesty — distinguishing between what you truly know, what you believe, and what you are guessing — and having the courage to say "I don\'t know" when you don\'t.',
      subtasks: [
        { title: 'Study the Quranic verses on not speaking without knowledge (17:36, 6:148)', done: false },
        { title: 'Practice categorising your statements: knowledge, opinion, or speculation', done: false },
        { title: 'Build the habit of saying "I don\'t know" or "I\'m not sure" when appropriate', done: false },
        { title: 'Before sharing any opinion publicly, ask: what is my evidence for this?', done: false },
        { title: 'Review one week of your social media posts or messages for unfounded claims', done: false },
      ],
    },
    {
      title: 'Audit your social circle — who is elevating your thinking vs. who is draining it',
      priority: 'medium', tags: ['relationships', 'growth'],
      description: 'The Prophet (peace be upon him) compared a good companion to a perfume seller and a bad one to a blacksmith\'s bellows. Your intellectual environment is shaped by the people you spend time with. This audit helps you become intentional about surrounding yourself with people who challenge and elevate your thinking.',
      subtasks: [
        { title: 'List the 10 people you spend the most time with (in person and online)', done: false },
        { title: 'For each person, honestly assess: do they elevate, maintain, or drain your thinking?', done: false },
        { title: 'Increase time with those who elevate and challenge you intellectually', done: false },
        { title: 'Set boundaries with those who consistently drain your cognitive energy', done: false },
        { title: 'Seek out one new relationship with someone whose intellect you admire', done: false },
      ],
    },
  ],
  intellect_cognitive_growth: [
    {
      title: 'Implement "Deep Work" sessions — 90-minute uninterrupted focus blocks, 3×/week minimum',
      priority: 'high', tags: ['focus', 'deep-work'],
      description: 'Deep, sustained concentration is the engine of all meaningful intellectual output. The modern world fragments attention by design. Scheduling protected deep work sessions — with phone off, door closed, and a single task — is how you reclaim the cognitive power that distraction steals.',
      subtasks: [
        { title: 'Block three 90-minute deep work sessions in your weekly calendar', done: false },
        { title: 'Create a pre-session ritual: make wudu, set niyyah, silence devices', done: false },
        { title: 'Choose one single task per session — no multitasking', done: false },
        { title: 'Track what you produce in each session to build evidence of the practice\'s value', done: false },
        { title: 'Gradually increase to 5 sessions per week as the habit solidifies', done: false },
      ],
    },
    {
      title: 'Begin a memorisation practice — Quran, hadith, or technical material (30 minutes/day)',
      priority: 'high', tags: ['memorisation', 'discipline'],
      description: 'Memorisation is the gymnasium of the intellect. The Islamic tradition of hifz (memorisation of the Quran) is the pinnacle, but any regular memorisation practice — hadith, poetry, or technical material — strengthens working memory, focus, and the ability to recall knowledge when it matters.',
      subtasks: [
        { title: 'Choose your memorisation focus: Quran surahs, 40 hadith of Imam Nawawi, or professional material', done: false },
        { title: 'Set a daily 30-minute memorisation window — ideally after Fajr', done: false },
        { title: 'Use spaced repetition: review previous material before adding new content', done: false },
        { title: 'Find a memorisation partner or teacher for accountability and correction', done: false },
        { title: 'Test yourself weekly and track cumulative progress', done: false },
      ],
    },
    {
      title: 'Practice deliberate rest — schedule complete cognitive rest (no inputs) one day per week',
      priority: 'medium', tags: ['rest', 'balance'],
      description: 'The mind, like the body, needs recovery to perform. Continuous input without rest leads to cognitive fatigue, reduced creativity, and burnout. Scheduling a full day of cognitive rest — no reading, no screens, no problem-solving — allows your subconscious to consolidate learning and restore sharpness.',
      subtasks: [
        { title: 'Choose one day per week as your cognitive rest day', done: false },
        { title: 'Plan restful activities: nature walks, family time, naps, light cooking', done: false },
        { title: 'Commit to no screens, no news, no work-related reading on that day', done: false },
        { title: 'Notice the difference in your energy and clarity the following day', done: false },
      ],
    },
    {
      title: 'Study the science of habit formation — design your environment for intellectual work',
      priority: 'medium', tags: ['habit', 'environment-design'],
      description: 'Your environment shapes your behaviour more than your willpower does. Studying habit formation science — cue, routine, reward — and then redesigning your physical and digital environment to support intellectual work removes friction from good habits and adds friction to bad ones.',
      subtasks: [
        { title: 'Read "Atomic Habits" by James Clear or a comparable evidence-based resource', done: false },
        { title: 'Audit your physical workspace — does it support deep focus or invite distraction?', done: false },
        { title: 'Redesign your workspace: remove distractions, add cues for learning and focus', done: false },
        { title: 'Audit your digital environment — notifications, app layout, default browser tabs', done: false },
        { title: 'Implement 3 specific environment changes and track their impact over 30 days', done: false },
      ],
    },
  ],
  intellect_cognitive_excellence: [
    {
      title: 'Achieve a sustained state of flow in your core intellectual work — document your conditions for it',
      priority: 'medium', tags: ['flow', 'mastery'],
      description: 'Flow — the state of complete absorption in a task where time disappears and output soars — is the peak of cognitive performance. Documenting the exact conditions that trigger your flow (time of day, environment, task type, preparation rituals) allows you to reliably reproduce it rather than waiting for it to happen by chance.',
      subtasks: [
        { title: 'Track your flow experiences for 4 weeks — when do they happen, what triggers them?', done: false },
        { title: 'Identify patterns: time of day, task type, energy level, environment', done: false },
        { title: 'Design a "flow protocol" — the sequence of conditions that maximises your chance of entering flow', done: false },
        { title: 'Test the protocol deliberately over 2 weeks and refine', done: false },
        { title: 'Write a personal "flow manual" you can reference and share', done: false },
      ],
    },
    {
      title: 'Develop an original intellectual framework or model grounded in Islamic principles',
      priority: 'low', tags: ['original-thinking', 'contribution'],
      description: 'The highest expression of Hifz al-Aql is not merely preserving the intellect but using it to produce original contributions to human knowledge. Developing a framework that integrates Islamic principles with contemporary challenges is both an act of scholarship and a form of da\'wah through intellectual excellence.',
      subtasks: [
        { title: 'Identify a gap in existing frameworks — where does current thinking fall short?', done: false },
        { title: 'Ground your model in Islamic principles — which maqasid or usul does it draw from?', done: false },
        { title: 'Draft the framework with clear definitions, components, and relationships', done: false },
        { title: 'Test the framework by applying it to 3-5 real scenarios', done: false },
        { title: 'Seek critique from both Islamic scholars and domain experts', done: false },
        { title: 'Refine and publish the framework', done: false },
      ],
    },
    {
      title: 'Complete a major long-form work requiring 90+ hours of deep cognitive effort',
      priority: 'medium', tags: ['deep-work', 'legacy'],
      description: 'Great intellectual works — books, research projects, complex systems — require sustained effort over months. Completing a 90+ hour deep work project demonstrates mastery of your craft, discipline over your nafs, and the ability to produce something of lasting value. This is the intellect operating at its designed capacity.',
      subtasks: [
        { title: 'Define the project clearly: scope, deliverable, and timeline', done: false },
        { title: 'Break the project into phases with milestones every 15-20 hours of work', done: false },
        { title: 'Schedule dedicated deep work sessions and protect them ruthlessly', done: false },
        { title: 'Track your hours and output to maintain accountability', done: false },
        { title: 'Complete the project and share it with your intended audience', done: false },
        { title: 'Write a retrospective: what did the process teach you about your own cognitive capacity?', done: false },
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
        { title: 'List every certification, licence, or registration your profession requires', done: false },
        { title: 'Verify that each is current and not expired', done: false },
        { title: 'Identify any credentials you should hold but don\'t yet have', done: false },
        { title: 'Create a renewal calendar so nothing lapses', done: false },
        { title: 'Begin the process for any missing or expired credentials', done: false },
      ],
    },
    {
      title: 'Define your professional mission statement — how does your work serve Allah and humanity?',
      priority: 'high', tags: ['mission', 'niyyah'],
      description: 'Without a clear mission, professional life becomes a treadmill of tasks without purpose. Defining how your work serves a higher purpose — connecting your daily effort to the pleasure of Allah and benefit of humanity — transforms routine work into ibadah and gives you criteria for saying yes or no to opportunities.',
      subtasks: [
        { title: 'Reflect on why you chose or entered your current profession', done: false },
        { title: 'Identify the specific ways your work benefits others', done: false },
        { title: 'Write a 1-2 sentence professional mission statement connecting your work to a higher purpose', done: false },
        { title: 'Test the statement — does it guide real decisions about projects, clients, and priorities?', done: false },
        { title: 'Display it where you will see it daily', done: false },
      ],
    },
    {
      title: 'Identify the top 3 skill gaps holding you back in your current role and create a plan to close them',
      priority: 'high', tags: ['skills', 'planning'],
      description: 'The Prophet (peace be upon him) said Allah loves that when you do something, you do it with itqan (excellence). Identifying the specific skills holding you back from excellence in your role — and systematically closing those gaps — is a direct expression of this principle.',
      subtasks: [
        { title: 'Seek honest feedback from your manager, colleagues, or clients on your weaknesses', done: false },
        { title: 'Rank your skill gaps by impact — which one, if closed, would improve your work the most?', done: false },
        { title: 'For each of the top 3 gaps, identify the best learning resource (course, book, mentor)', done: false },
        { title: 'Create a 90-day plan with weekly learning targets for each skill', done: false },
        { title: 'Measure improvement through a concrete deliverable or assessment', done: false },
      ],
    },
    {
      title: 'Ensure your primary income source is fully halal — audit contracts, clients, and products',
      priority: 'urgent', tags: ['halal', 'income'],
      description: 'The du\'a of a person whose income is haram is not accepted. This is not a peripheral concern — it strikes at the heart of your relationship with Allah. Conducting a thorough halal audit of your income ensures that every dirham you earn and spend is clean, protecting your ibadah and your family.',
      subtasks: [
        { title: 'Review your employment contract or business model for any haram elements (riba, gharar, prohibited products)', done: false },
        { title: 'Audit your client list — are any clients in industries that are impermissible?', done: false },
        { title: 'Check your investment and savings vehicles for interest-based components', done: false },
        { title: 'Consult a knowledgeable scholar if any grey areas arise', done: false },
        { title: 'Create a plan to transition away from any problematic income sources', done: false },
      ],
    },
    {
      title: 'Build a professional portfolio or record of your best work',
      priority: 'medium', tags: ['portfolio', 'credibility'],
      description: 'A portfolio is tangible proof of your competence. It allows others to assess your work on its merits rather than relying on credentials alone. Building one forces you to curate your best output, identify patterns in your strengths, and present yourself with clarity and honesty.',
      subtasks: [
        { title: 'Gather your 5-10 best pieces of professional work', done: false },
        { title: 'For each piece, write a brief description of the problem, your approach, and the outcome', done: false },
        { title: 'Organise them in a format appropriate to your field (website, PDF, physical binder)', done: false },
        { title: 'Get feedback on the portfolio from a trusted colleague', done: false },
        { title: 'Update the portfolio quarterly with new work', done: false },
      ],
    },
  ],
  intellect_professional_growth: [
    {
      title: 'Pursue advanced training, specialisation, or a higher qualification in your field',
      priority: 'high', tags: ['education', 'expertise'],
      description: 'Depth of expertise distinguishes a professional from a generalist. Pursuing advanced training or a higher qualification deepens your mastery, increases your value, and positions you to contribute at a higher level. Choose a specialisation that aligns with both market demand and your mission.',
      subtasks: [
        { title: 'Research advanced qualifications or specialisations available in your field', done: false },
        { title: 'Evaluate which specialisation best aligns with your mission and market need', done: false },
        { title: 'Calculate the time, cost, and opportunity cost of pursuing it', done: false },
        { title: 'Enrol and create a study schedule that respects your other obligations', done: false },
        { title: 'Complete the qualification and update your professional profiles', done: false },
      ],
    },
    {
      title: 'Find a professional mentor — someone 5–10 years ahead on the path you want to walk',
      priority: 'high', tags: ['mentorship', 'growth'],
      description: 'A mentor compresses decades into years by sharing hard-won lessons. The Islamic tradition of teacher-student relationships (ustad-talib) is a model of structured knowledge transfer. Finding someone who has walked your intended path and is willing to guide you is one of the highest-leverage investments you can make.',
      subtasks: [
        { title: 'Define specifically what you want mentorship in — skills, career navigation, leadership', done: false },
        { title: 'Identify 3-5 potential mentors in your network or industry', done: false },
        { title: 'Approach your top choice with a clear, respectful ask — what you need and what you offer', done: false },
        { title: 'Propose a structure: monthly meetings, specific topics, defined duration', done: false },
        { title: 'Prepare thoroughly for each meeting — never waste your mentor\'s time', done: false },
      ],
    },
    {
      title: 'Attend at least two conferences, seminars, or professional gatherings per year',
      priority: 'medium', tags: ['networking', 'learning'],
      description: 'Professional gatherings expose you to new ideas, emerging trends, and potential collaborators that you would never encounter in your daily routine. They also build the professional network that opens doors and creates opportunities for meaningful work.',
      subtasks: [
        { title: 'Research the most respected conferences and seminars in your field', done: false },
        { title: 'Select two events that align with your current learning priorities', done: false },
        { title: 'Budget for registration, travel, and time off well in advance', done: false },
        { title: 'Set specific goals for each event (people to meet, sessions to attend, questions to answer)', done: false },
        { title: 'Follow up with new contacts within one week of the event', done: false },
      ],
    },
    {
      title: 'Develop a personal "board of advisors" — 3–5 trusted people who challenge your professional thinking',
      priority: 'medium', tags: ['shura', 'accountability'],
      description: 'The Quranic principle of shura (consultation) applies to professional life as much as community governance. Building a personal advisory board of 3-5 people who know your work, challenge your thinking, and hold you accountable creates a structure for continuously improving your professional judgement.',
      subtasks: [
        { title: 'Identify 3-5 people whose professional judgement you deeply respect', done: false },
        { title: 'Ensure diversity — different industries, perspectives, strengths, and backgrounds', done: false },
        { title: 'Invite each with a clear explanation of what you\'re building and what you\'re asking', done: false },
        { title: 'Schedule quarterly check-ins where you present your plans and receive candid feedback', done: false },
        { title: 'Reciprocate — offer your own expertise and perspective to each advisor', done: false },
      ],
    },
  ],
  intellect_professional_excellence: [
    {
      title: 'Publish original research, a case study, or an innovation in your field',
      priority: 'medium', tags: ['publishing', 'contribution'],
      description: 'Publishing original work is how you shift from consuming knowledge to contributing to it. A published case study, research paper, or documented innovation establishes you as a thought leader and creates a lasting reference that benefits others in your field long after you move on.',
      subtasks: [
        { title: 'Identify a novel insight, solution, or finding from your professional work', done: false },
        { title: 'Research existing literature to confirm your contribution is genuinely original', done: false },
        { title: 'Write the piece in a format appropriate for your field (journal article, case study, white paper)', done: false },
        { title: 'Submit to a reputable publication, conference, or platform', done: false },
        { title: 'Promote the work through your professional network', done: false },
      ],
    },
    {
      title: 'Take on a leadership or governance role — board position, committee chair, or department head',
      priority: 'medium', tags: ['leadership', 'impact'],
      description: 'Leadership is an amanah (trust) — a responsibility to steward something larger than yourself. Taking on a governance or leadership role in your profession amplifies your impact from individual contribution to systemic influence. It is also where you practice the Islamic values of justice, shura, and servant leadership at scale.',
      subtasks: [
        { title: 'Identify leadership opportunities in your organisation, professional body, or community', done: false },
        { title: 'Assess your readiness — do you have the skills, time, and support to lead well?', done: false },
        { title: 'Express your interest or apply for the role', done: false },
        { title: 'If appointed, establish clear goals for your tenure in the first 30 days', done: false },
        { title: 'Lead with the principles of shura, adl (justice), and ihsan (excellence)', done: false },
      ],
    },
    {
      title: 'Design and deliver a training programme that uplifts others in your profession',
      priority: 'low', tags: ['teaching', 'legacy'],
      description: 'The Prophet (peace be upon him) said the best of people are those most beneficial to others. Designing a training programme takes your accumulated expertise and makes it accessible to others, multiplying your impact. It is a form of sadaqah jariyah — ongoing charity that continues to benefit people long after you deliver it.',
      subtasks: [
        { title: 'Identify the most common skill gap or struggle among junior professionals in your field', done: false },
        { title: 'Design a curriculum that addresses this gap with clear learning outcomes', done: false },
        { title: 'Create materials: slides, exercises, case studies, and assessments', done: false },
        { title: 'Pilot the programme with a small cohort and gather detailed feedback', done: false },
        { title: 'Iterate based on feedback and deliver to a larger audience', done: false },
        { title: 'Make materials available as a lasting resource (open-source, community library, or online)', done: false },
      ],
    },
  ],
};
