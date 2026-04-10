// Seed tasks for Faith pillar submodules.
// Each submodule has tasks across CORE, GROWTH, and EXCELLENCE boards.
// Tasks are placed in the "To Do" column by default.

export const FAITH_SEED_TASKS = {
  // ── SHAHADA ──
  faith_shahada_core: [
    {
      title: 'Testify there is no God but Allah',
      priority: 'urgent', tags: ['aqidah', 'shahada'],
      description: 'The Shahada — "Ashhadu an la ilaha illAllah wa ashhadu anna Muhammadan rasulullah" — is the first pillar of Islam and the gateway into the faith. Renew and deepen your understanding of this testimony, ensuring it is uttered with full knowledge, certainty, sincerity, and love. This is not merely a declaration but a covenant with Allah.',
      subtasks: [
        { title: 'Recite the full Shahada with correct pronunciation and meaning', done: false },
        { title: 'Reflect on what "no god but Allah" demands of your daily life', done: false },
        { title: 'Study the difference between verbal declaration and lived conviction', done: false },
        { title: 'Journal: what does this testimony mean to you personally?', done: false },
      ],
    },
    {
      title: 'Study the meaning and conditions of La ilaha illAllah',
      priority: 'urgent', tags: ['aqidah'],
      description: 'Deeply understand the testimony of faith — its linguistic meaning, theological implications, and the conditions scholars have derived from the Quran and Sunnah that make it valid.',
      subtasks: [
        { title: 'Study the linguistic meaning of La ilaha illAllah', done: false },
        { title: 'Learn what negation (la ilaha) and affirmation (illAllah) entail', done: false },
        { title: 'Understand what it means to worship Allah alone without partners', done: false },
        { title: 'Review Quranic ayat that establish Tawhid (e.g., 112:1-4, 2:255)', done: false },
      ],
    },
    {
      title: 'Learn the seven conditions of the Shahada (Ilm, Yaqin, Qabul, Inqiyad, Sidq, Ikhlas, Muhabbah)',
      priority: 'high', tags: ['aqidah'],
      description: 'The Shahada is not merely uttered — it requires seven conditions to be fulfilled for it to benefit the one who declares it. Study each condition with its evidence.',
      subtasks: [
        { title: 'Ilm (Knowledge) — know what it means', done: false },
        { title: 'Yaqin (Certainty) — have no doubt', done: false },
        { title: 'Qabul (Acceptance) — accept all its implications', done: false },
        { title: 'Inqiyad (Submission) — act upon it', done: false },
        { title: 'Sidq (Truthfulness) — mean it sincerely', done: false },
        { title: 'Ikhlas (Sincerity) — for Allah alone', done: false },
        { title: 'Muhabbah (Love) — love Allah and His Messenger above all', done: false },
      ],
    },
    {
      title: 'Study the six pillars of Iman',
      priority: 'high', tags: ['aqidah'],
      description: 'As described in the Hadith of Jibril, Iman consists of six pillars. Understand each pillar, its evidence, and what it demands of the believer.',
      subtasks: [
        { title: 'Study belief in Allah (al-Iman billah)', done: false },
        { title: 'Study belief in the Angels (al-Mala\'ikah)', done: false },
        { title: 'Study belief in the Books (al-Kutub)', done: false },
        { title: 'Study belief in the Messengers (ar-Rusul)', done: false },
        { title: 'Study belief in the Last Day (al-Yawm al-Akhir)', done: false },
        { title: 'Study belief in Qadar — Divine Decree (al-Qadr)', done: false },
      ],
    },
    {
      title: 'Identify and eliminate any practices that contradict Tawhid',
      priority: 'urgent', tags: ['aqidah', 'tawhid'],
      description: 'Conduct a personal audit to identify anything in your life that may compromise the purity of Tawhid — from superstitions to seeking barakah from objects or graves.',
      subtasks: [
        { title: 'List any superstitious beliefs or practices you hold', done: false },
        { title: 'Identify any reliance on amulets, charms, or talismans', done: false },
        { title: 'Check for habits of swearing by other than Allah', done: false },
        { title: 'Remove or correct any identified contradictions', done: false },
      ],
    },
    {
      title: 'Memorise the hadith of Jibril (Sahih Muslim 8) on Islam, Iman, and Ihsan',
      priority: 'medium', tags: ['hadith', 'aqidah'],
      description: 'This hadith is considered Umm al-Sunnah — the mother of the Sunnah. It defines Islam, Iman, and Ihsan in a single narration. Memorise it and understand its layers.',
      subtasks: [
        { title: 'Read the full hadith text in Arabic and English', done: false },
        { title: 'Memorise the Arabic text', done: false },
        { title: 'Islam — study the 5 pillars: Shahada, Salah, Zakah, Sawm, Hajj', done: false },
        { title: 'Iman — study the 6 articles: Allah, Angels, Books, Messengers, Last Day, Qadr', done: false },
        { title: 'Ihsan — memorise the definition: worship Allah as though you see Him', done: false },
        { title: 'Study the signs of the Hour mentioned at the end of the hadith', done: false },
        { title: 'Reflect: which level describes your current state?', done: false },
      ],
    },
  ],
  faith_shahada_growth: [
    {
      title: 'Read a foundational aqidah text (e.g., Al-Aqidah al-Tahawiyyah)',
      priority: 'high', tags: ['study', 'aqidah'],
      description: 'Engage with a classical creed text to build a systematic understanding of Islamic theology as understood by the early generations.',
      subtasks: [
        { title: 'Obtain a reliable translation with commentary', done: false },
        { title: 'Read the section on the attributes of Allah', done: false },
        { title: 'Read the section on prophethood and revelation', done: false },
        { title: 'Read the section on the unseen (angels, paradise, hellfire)', done: false },
        { title: 'Summarise key points and questions', done: false },
      ],
    },
    {
      title: 'Study the nullifiers of Islam (Nawaqid al-Islam)',
      priority: 'medium', tags: ['aqidah'],
      description: 'Learn the ten nullifiers identified by scholars so you can avoid them and understand the boundaries of the faith.',
      subtasks: [
        { title: 'Read the list of ten nullifiers with explanations', done: false },
        { title: 'Understand the difference between major and minor kufr', done: false },
        { title: 'Study the conditions for declaring takfir and why it requires caution', done: false },
      ],
    },
    {
      title: 'Understand the difference between major and minor shirk',
      priority: 'medium', tags: ['tawhid'],
      description: 'Major shirk expels from Islam; minor shirk is a grave sin but does not. Learn to distinguish them with practical examples.',
      subtasks: [
        { title: 'Define major shirk (shirk akbar) with examples', done: false },
        { title: 'Define minor shirk (shirk asghar) with examples', done: false },
        { title: 'Study riya (showing off) as a form of minor shirk', done: false },
        { title: 'Learn the hadith on hidden shirk and its remedy', done: false },
      ],
    },
    {
      title: 'Learn about the categories of Tawhid (Rububiyyah, Uluhiyyah, Asma wa Sifat)',
      priority: 'high', tags: ['tawhid'],
      description: 'Scholars have categorised Tawhid into three domains. Understanding this framework helps identify where deviations occur.',
      subtasks: [
        { title: 'Study Tawhid al-Rububiyyah — Lordship of Allah', done: false },
        { title: 'Study Tawhid al-Uluhiyyah — worship of Allah alone', done: false },
        { title: 'Study Tawhid al-Asma wa al-Sifat — Names and Attributes', done: false },
        { title: 'Understand how the three categories interrelate', done: false },
      ],
    },
  ],
  faith_shahada_excellence: [
    {
      title: 'Teach the Shahada and its conditions to a family member or student',
      priority: 'medium', tags: ['dawah'],
      description: 'The best way to solidify knowledge is to teach it. Share the meaning and conditions of the Shahada with someone in your household or community.',
      subtasks: [
        { title: 'Prepare a simple outline of the seven conditions', done: false },
        { title: 'Schedule a teaching session with a family member or student', done: false },
        { title: 'Deliver the lesson and encourage questions', done: false },
      ],
    },
    {
      title: 'Study the relationship between Shahada and daily actions (amal)',
      priority: 'medium', tags: ['aqidah'],
      description: 'Explore how the declaration of faith should manifest in everyday decisions — from business ethics to interpersonal conduct.',
      subtasks: [
        { title: 'Reflect on how Tawhid influences business decisions', done: false },
        { title: 'Identify three daily actions that express your Shahada', done: false },
        { title: 'Study how the Sahaba lived their Shahada practically', done: false },
      ],
    },
    {
      title: 'Reflect on how Tawhid governs every decision — write a personal reflection',
      priority: 'low', tags: ['reflection'],
      description: 'Write a personal reflection journal entry exploring how the oneness of Allah shapes your worldview, priorities, and decision-making.',
      subtasks: [
        { title: 'Set aside 30 minutes of focused reflection time', done: false },
        { title: 'Write about an area where Tawhid challenged your habits', done: false },
        { title: 'Identify one change you will make based on this reflection', done: false },
      ],
    },
  ],

  // ── SALAH ──
  faith_salah_core: [
    {
      title: 'Establish all five daily prayers on time consistently',
      priority: 'urgent', tags: ['salah', 'fard'],
      description: 'Salah is the first obligation after Shahada and the first thing judged on the Day of Resurrection. Make every prayer on time without exception.',
      subtasks: [
        { title: 'Set alarms or reminders for all five prayer times', done: false },
        { title: 'Track your prayer consistency for one full week', done: false },
        { title: 'Identify and resolve common excuses for missing prayers', done: false },
        { title: 'Pray each salah within its earliest time window', done: false },
      ],
    },
    {
      title: 'Learn the correct method of wudu with all fard and sunnah acts',
      priority: 'high', tags: ['salah', 'wudu'],
      description: 'Wudu is the key to salah. Learn the obligatory and recommended acts to ensure your purification is valid and complete.',
      subtasks: [
        { title: 'Learn the four fard acts of wudu (Hanafi) or six (Shafi\'i)', done: false },
        { title: 'Learn the sunnah acts (miswak, rinsing mouth/nose, between fingers)', done: false },
        { title: 'Learn what nullifies wudu', done: false },
        { title: 'Practice performing wudu with correct sequence and du\'a', done: false },
      ],
    },
    {
      title: 'Memorise the adhkar recited in salah (Subhanaka, Tashahhud, Salawat)',
      priority: 'high', tags: ['salah', 'memorisation'],
      description: 'Ensure you know the essential recitations of prayer with correct Arabic pronunciation and understand their meanings.',
      subtasks: [
        { title: 'Memorise the opening du\'a (Subhanaka Allahumma or equivalent)', done: false },
        { title: 'Memorise the Tashahhud (At-Tahiyyatu)', done: false },
        { title: 'Memorise the Salawat upon the Prophet (Allahumma salli ala Muhammad)', done: false },
        { title: 'Memorise the du\'a before salam', done: false },
        { title: 'Learn the meanings of each recitation', done: false },
      ],
    },
    {
      title: 'Pray in congregation (jama\'ah) whenever possible',
      priority: 'high', tags: ['salah', 'jamaah'],
      description: 'Prayer in congregation carries 27 times the reward. Make it a priority to attend the masjid or pray with family when possible.',
      subtasks: [
        { title: 'Identify the nearest masjid and its prayer times', done: false },
        { title: 'Commit to praying at least one salah daily in jama\'ah', done: false },
        { title: 'If no masjid is nearby, establish jama\'ah at home with family', done: false },
      ],
    },
    {
      title: 'Learn the conditions that invalidate salah',
      priority: 'medium', tags: ['salah', 'fiqh'],
      description: 'Know what actions or omissions break the prayer so you can avoid them and know when to repeat a prayer.',
      subtasks: [
        { title: 'Study the acts that invalidate salah (talking, eating, turning away)', done: false },
        { title: 'Learn the ruling on excessive movement in salah', done: false },
        { title: 'Understand when sujud al-sahw (prostration of forgetfulness) is required', done: false },
      ],
    },
  ],
  faith_salah_growth: [
    {
      title: 'Establish the 12 regular Sunnah prayers (Rawatib)',
      priority: 'high', tags: ['salah', 'sunnah'],
      description: 'The Prophet (SAW) regularly prayed 12 rak\'at of Sunnah with the fard prayers. A house in Jannah is built for whoever maintains them.',
      subtasks: [
        { title: '2 before Fajr', done: false },
        { title: '4 before Dhuhr and 2 after', done: false },
        { title: '2 after Maghrib', done: false },
        { title: '2 after Isha', done: false },
        { title: 'Track consistency for one month', done: false },
      ],
    },
    {
      title: 'Learn the meanings of Surah Al-Fatihah and what you recite in salah',
      priority: 'high', tags: ['salah', 'quran'],
      description: 'Al-Fatihah is recited in every rak\'ah. Understanding its meaning transforms your salah from ritual to conversation with Allah.',
      subtasks: [
        { title: 'Study the word-by-word meaning of Al-Fatihah', done: false },
        { title: 'Learn the meaning of the adhkar of ruku and sujud', done: false },
        { title: 'Memorise and understand three short surahs you recite regularly', done: false },
      ],
    },
    {
      title: 'Pray Tahajjud at least once a week',
      priority: 'medium', tags: ['salah', 'qiyam'],
      description: 'The night prayer is among the most beloved voluntary acts. Start with even two rak\'at in the last third of the night.',
      subtasks: [
        { title: 'Set a weekly alarm for the last third of the night', done: false },
        { title: 'Pray at least 2 rak\'at of Tahajjud', done: false },
        { title: 'Make du\'a during the sujud of Tahajjud', done: false },
      ],
    },
    {
      title: 'Study the inner dimensions of salah (khushu\u02bf)',
      priority: 'medium', tags: ['salah', 'spirituality'],
      description: 'Khushu\u02bf is the soul of salah. Study how scholars describe presence of heart, humility, and focus in prayer.',
      subtasks: [
        { title: 'Read Ibn al-Qayyim\'s description of khushu\u02bf in prayer', done: false },
        { title: 'Identify three personal barriers to focus in salah', done: false },
        { title: 'Practice one technique for improving khushu\u02bf this week', done: false },
      ],
    },
  ],
  faith_salah_excellence: [
    {
      title: 'Pray Duha prayer regularly',
      priority: 'medium', tags: ['salah', 'sunnah'],
      description: 'Duha prayer (after sunrise until before Dhuhr) is a charity for every joint in the body. Start with 2 rak\'at and build up.',
      subtasks: [
        { title: 'Learn the time window for Duha prayer', done: false },
        { title: 'Pray Duha at least 3 times this week', done: false },
        { title: 'Gradually increase to daily practice', done: false },
      ],
    },
    {
      title: 'Master the prostration of recitation (Sujud al-Tilawah)',
      priority: 'low', tags: ['salah', 'fiqh'],
      description: 'There are 15 places in the Quran where prostration is recommended when recited. Learn the ruling and practice.',
      subtasks: [
        { title: 'Learn the 15 ayat of sajdah in the Quran', done: false },
        { title: 'Study the du\'a recited during Sujud al-Tilawah', done: false },
        { title: 'Practice performing it when you encounter a sajdah ayah', done: false },
      ],
    },
    {
      title: 'Develop a consistent Qiyam al-Layl routine',
      priority: 'medium', tags: ['salah', 'qiyam'],
      description: 'Move from occasional Tahajjud to a regular nightly routine. The Prophet (SAW) never abandoned Qiyam al-Layl even when ill.',
      subtasks: [
        { title: 'Choose a consistent time in the last third of the night', done: false },
        { title: 'Start with 2-4 rak\'at and gradually increase', done: false },
        { title: 'Include Witr as the final prayer of the night', done: false },
        { title: 'Maintain the routine for 30 consecutive days', done: false },
      ],
    },
  ],

  // ── ZAKAH ──
  faith_zakah_core: [
    {
      title: 'Calculate your nisab and determine if zakah is obligatory on you',
      priority: 'urgent', tags: ['zakah', 'fard'],
      description: 'Nisab is the minimum threshold of wealth that makes zakah obligatory. Calculate based on current gold/silver values and your total zakatable assets.',
      subtasks: [
        { title: 'Look up the current nisab threshold in your currency', done: false },
        { title: 'List all your zakatable assets (cash, gold, investments, trade goods)', done: false },
        { title: 'Determine if you meet the nisab after deducting debts', done: false },
        { title: 'Mark your zakah anniversary date (hawl)', done: false },
      ],
    },
    {
      title: 'Learn which categories of wealth are zakatable (gold, silver, cash, trade goods, livestock)',
      priority: 'high', tags: ['zakah', 'fiqh'],
      description: 'Not all wealth is zakatable. Study the specific categories and their rates as defined by the Quran and Sunnah.',
      subtasks: [
        { title: 'Study zakah on gold and silver (2.5%)', done: false },
        { title: 'Study zakah on cash and bank savings', done: false },
        { title: 'Study zakah on trade goods (uruud al-tijarah)', done: false },
        { title: 'Study zakah on agricultural produce and livestock', done: false },
        { title: 'Learn what is exempt (personal use items, primary home)', done: false },
      ],
    },
    {
      title: 'Identify the eight eligible recipients of zakah (Surah At-Tawbah 9:60)',
      priority: 'high', tags: ['zakah', 'fiqh'],
      description: 'Allah specified exactly eight categories of people eligible to receive zakah. Know them so your distribution is valid.',
      subtasks: [
        { title: 'Al-Fuqara (the poor)', done: false },
        { title: 'Al-Masakin (the needy)', done: false },
        { title: 'Al-Amilina Alayha (zakah collectors/administrators)', done: false },
        { title: 'Al-Mu\'allafati Qulubuhum (those whose hearts are to be reconciled)', done: false },
        { title: 'Fi al-Riqab (freeing captives)', done: false },
        { title: 'Al-Gharimin (those in debt)', done: false },
        { title: 'Fi Sabilillah (in the way of Allah)', done: false },
        { title: 'Ibn al-Sabil (the stranded traveller)', done: false },
      ],
    },
    {
      title: 'Pay any outstanding zakah immediately',
      priority: 'urgent', tags: ['zakah', 'fard'],
      description: 'If zakah is due and has not been paid, it remains a debt upon you. Settle it as soon as possible — delaying without reason is sinful.',
      subtasks: [
        { title: 'Calculate any overdue zakah from previous years', done: false },
        { title: 'Identify trustworthy recipients or organisations', done: false },
        { title: 'Distribute the outstanding amount', done: false },
      ],
    },
  ],
  faith_zakah_growth: [
    {
      title: 'Set up a zakah calendar with annual calculation date',
      priority: 'high', tags: ['zakah', 'planning'],
      description: 'Consistency in zakah requires a fixed annual date (hawl). Set it up and create a reminder system.',
      subtasks: [
        { title: 'Choose your zakah calculation date (e.g., 1st Ramadan)', done: false },
        { title: 'Set annual calendar reminders', done: false },
        { title: 'Create a spreadsheet or use a zakah calculator app', done: false },
      ],
    },
    {
      title: 'Research local and international zakah-eligible organisations',
      priority: 'medium', tags: ['zakah', 'community'],
      description: 'Identify reputable organisations that distribute zakah to the correct recipients with transparency and accountability.',
      subtasks: [
        { title: 'Research 3 local zakah-accepting organisations', done: false },
        { title: 'Research 2 international zakah organisations', done: false },
        { title: 'Verify their zakah compliance and transparency reports', done: false },
      ],
    },
    {
      title: 'Learn the rulings of Zakah al-Fitr and its timing',
      priority: 'medium', tags: ['zakah', 'fiqh'],
      description: 'Zakah al-Fitr is obligatory at the end of Ramadan. Learn its amount, timing, and recipients.',
      subtasks: [
        { title: 'Learn the amount and types of food acceptable for Fitr', done: false },
        { title: 'Understand the timing (before Eid prayer)', done: false },
        { title: 'Learn who is responsible to pay and for whom', done: false },
      ],
    },
    {
      title: 'Study the spiritual purpose of zakah — purification and growth',
      priority: 'medium', tags: ['zakah', 'spirituality'],
      description: 'Zakah literally means purification and growth. Understand how it purifies the giver\'s soul and grows barakah in wealth.',
      subtasks: [
        { title: 'Study the Quranic ayat linking zakah with purification (9:103)', done: false },
        { title: 'Reflect on how giving reduces attachment to dunya', done: false },
        { title: 'Read about the blessings of zakah from hadith literature', done: false },
      ],
    },
  ],
  faith_zakah_excellence: [
    {
      title: 'Establish a regular sadaqah habit beyond obligatory zakah',
      priority: 'medium', tags: ['sadaqah'],
      description: 'Voluntary charity is unlimited in reward. Set up recurring giving — even a small consistent amount is beloved to Allah.',
      subtasks: [
        { title: 'Set up a monthly automated sadaqah donation', done: false },
        { title: 'Identify causes that resonate with you (orphans, education, water)', done: false },
        { title: 'Track your giving for motivation and accountability', done: false },
      ],
    },
    {
      title: 'Explore setting up a waqf (endowment) for ongoing benefit',
      priority: 'low', tags: ['waqf', 'sadaqah-jariyah'],
      description: 'A waqf is an endowment whose benefits continue indefinitely — sadaqah jariyah in its highest form. Explore options suited to your capacity.',
      subtasks: [
        { title: 'Learn the Islamic principles of waqf', done: false },
        { title: 'Research existing waqf platforms and institutions', done: false },
        { title: 'Explore contributing to or establishing a small waqf', done: false },
      ],
    },
    {
      title: 'Mentor someone on zakah calculation and distribution',
      priority: 'low', tags: ['zakah', 'dawah'],
      description: 'Many Muslims are uncertain about zakah calculation. Help someone in your circle understand their obligations.',
      subtasks: [
        { title: 'Identify someone who needs guidance on zakah', done: false },
        { title: 'Walk them through calculating their zakatable wealth', done: false },
        { title: 'Help them identify appropriate recipients', done: false },
      ],
    },
  ],

  // ── SAWM ──
  faith_sawm_core: [
    {
      title: 'Learn the fard requirements of Ramadan fasting (intention, abstaining, timing)',
      priority: 'urgent', tags: ['sawm', 'fard'],
      description: 'Fasting in Ramadan is the fourth pillar of Islam. Know what is required for a valid fast — the intention, what to abstain from, and the time boundaries.',
      subtasks: [
        { title: 'Learn when and how to make the intention (niyyah) for fasting', done: false },
        { title: 'Know the fasting hours (Fajr to Maghrib)', done: false },
        { title: 'Learn what you must abstain from (food, drink, relations)', done: false },
        { title: 'Understand who is exempt from fasting and their alternatives', done: false },
      ],
    },
    {
      title: 'Understand the conditions that break the fast vs. those that do not',
      priority: 'high', tags: ['sawm', 'fiqh'],
      description: 'Many common situations cause confusion. Study the fiqh of what invalidates the fast versus what is permissible.',
      subtasks: [
        { title: 'List the acts that clearly break the fast', done: false },
        { title: 'Learn common misconceptions (e.g., swallowing saliva, eye drops)', done: false },
        { title: 'Understand when kaffarah vs. qada is required', done: false },
      ],
    },
    {
      title: 'Learn the rules for making up (qada) missed fasts',
      priority: 'high', tags: ['sawm', 'fiqh'],
      description: 'Anyone who misses obligatory fasts must make them up. Learn the rulings around timing, sequence, and fidyah for those unable to fast.',
      subtasks: [
        { title: 'Calculate how many fasts you owe from previous years', done: false },
        { title: 'Learn the deadline for making up Ramadan fasts', done: false },
        { title: 'Understand the fidyah ruling for those permanently unable to fast', done: false },
      ],
    },
    {
      title: 'Make up any missed Ramadan fasts from previous years',
      priority: 'urgent', tags: ['sawm', 'qada'],
      description: 'Outstanding fasts are a debt to Allah. Begin making them up systematically — even one per week adds up.',
      subtasks: [
        { title: 'Calculate the total number of missed fasts', done: false },
        { title: 'Create a schedule to make them up (e.g., Mondays and Thursdays)', done: false },
        { title: 'Track your progress until all are completed', done: false },
      ],
    },
  ],
  faith_sawm_growth: [
    {
      title: 'Fast the voluntary Mondays and Thursdays regularly',
      priority: 'medium', tags: ['sawm', 'sunnah'],
      description: 'The Prophet (SAW) used to fast Mondays and Thursdays. Deeds are presented to Allah on these days, and he loved to be fasting when his deeds were shown.',
      subtasks: [
        { title: 'Start with one day per week (Monday or Thursday)', done: false },
        { title: 'Build up to both days consistently', done: false },
        { title: 'Track your voluntary fasting for one month', done: false },
      ],
    },
    {
      title: 'Fast the three white days (13th, 14th, 15th of each lunar month)',
      priority: 'medium', tags: ['sawm', 'sunnah'],
      description: 'The Prophet (SAW) encouraged fasting the Ayyam al-Bid (white days). It is like fasting the entire month due to the ten-fold reward.',
      subtasks: [
        { title: 'Download a Hijri calendar to track the white days', done: false },
        { title: 'Fast the white days for one lunar month as a trial', done: false },
        { title: 'Make it a consistent monthly practice', done: false },
      ],
    },
    {
      title: 'Study the inner dimensions of fasting — taqwa, patience, gratitude',
      priority: 'medium', tags: ['sawm', 'spirituality'],
      description: 'Fasting is not merely abstaining from food — it is training the nafs in taqwa, sabr, and shukr. Study these spiritual dimensions.',
      subtasks: [
        { title: 'Study the ayah linking fasting to taqwa (2:183)', done: false },
        { title: 'Reflect on how fasting develops patience with hunger and anger', done: false },
        { title: 'Journal about gratitude for provisions after breaking fast', done: false },
      ],
    },
    {
      title: 'Learn the Sunnah of iftar and suhoor',
      priority: 'low', tags: ['sawm', 'sunnah'],
      description: 'There is great barakah in suhoor and prescribed etiquette for breaking the fast. Follow the Prophetic way.',
      subtasks: [
        { title: 'Learn the du\'a for breaking the fast', done: false },
        { title: 'Study what the Prophet (SAW) ate for suhoor and iftar', done: false },
        { title: 'Practice delaying suhoor and hastening iftar as Sunnah', done: false },
      ],
    },
  ],
  faith_sawm_excellence: [
    {
      title: 'Fast the day of Arafah (9th Dhul Hijjah) and Ashura (10th Muharram)',
      priority: 'medium', tags: ['sawm', 'sunnah'],
      description: 'The day of Arafah expiates sins of two years; Ashura expiates sins of one year. These are among the most rewarding voluntary fasts.',
      subtasks: [
        { title: 'Mark the dates of Arafah and Ashura on your calendar', done: false },
        { title: 'Fast the day of Arafah (for non-pilgrims)', done: false },
        { title: 'Fast the 9th and 10th of Muharram (or 10th and 11th)', done: false },
      ],
    },
    {
      title: 'Fast the six days of Shawwal after Ramadan',
      priority: 'medium', tags: ['sawm', 'sunnah'],
      description: 'Whoever fasts Ramadan and follows it with six days of Shawwal, it is as if they fasted the entire year.',
      subtasks: [
        { title: 'Plan when to fast the six days (consecutively or spread out)', done: false },
        { title: 'Complete the six fasts within Shawwal', done: false },
        { title: 'Make a habit of fasting them every year', done: false },
      ],
    },
    {
      title: 'Organise a community iftar for neighbours and those in need',
      priority: 'low', tags: ['sawm', 'community'],
      description: 'Feeding a fasting person earns the reward of their fast without diminishing it. Organise a shared iftar for your community.',
      subtasks: [
        { title: 'Plan the logistics (venue, menu, invitations)', done: false },
        { title: 'Invite neighbours, new Muslims, and those in need', done: false },
        { title: 'Host the iftar and foster community bonds', done: false },
      ],
    },
  ],

  // ── HAJJ ──
  faith_hajj_core: [
    {
      title: 'Learn the conditions that make Hajj obligatory (Islam, sanity, maturity, ability, provision)',
      priority: 'high', tags: ['hajj', 'fard'],
      description: 'Hajj is obligatory once in a lifetime for those who meet specific conditions. Understand each condition to determine your obligation.',
      subtasks: [
        { title: 'Study the five conditions of obligation', done: false },
        { title: 'Assess your current financial and physical ability', done: false },
        { title: 'Determine if Hajj is currently fard upon you', done: false },
      ],
    },
    {
      title: 'Study the pillars (arkan) and obligatory acts (wajibat) of Hajj',
      priority: 'high', tags: ['hajj', 'fiqh'],
      description: 'Hajj has pillars without which it is invalid, and obligations whose omission requires a penalty. Know the difference.',
      subtasks: [
        { title: 'Learn the four arkan: Ihram, Arafah, Tawaf al-Ifadah, Sa\'i', done: false },
        { title: 'Learn the wajibat: Muzdalifah, stoning, shaving, Tawaf al-Wada', done: false },
        { title: 'Understand the penalties for missing a wajib act', done: false },
      ],
    },
    {
      title: 'Learn the rites of Umrah and their sequence',
      priority: 'high', tags: ['umrah', 'fiqh'],
      description: 'Umrah is the lesser pilgrimage and excellent preparation for Hajj. Learn its rites in the correct order.',
      subtasks: [
        { title: 'Ihram from the miqat with niyyah', done: false },
        { title: 'Tawaf around the Ka\'bah (7 circuits)', done: false },
        { title: 'Two rak\'at behind Maqam Ibrahim', done: false },
        { title: 'Sa\'i between Safa and Marwah (7 laps)', done: false },
        { title: 'Shaving or trimming the hair to exit Ihram', done: false },
      ],
    },
    {
      title: 'Begin saving for Hajj if financially able',
      priority: 'medium', tags: ['hajj', 'planning'],
      description: 'Hajj is a significant financial commitment. Start saving early with a dedicated fund to make this pillar achievable.',
      subtasks: [
        { title: 'Research the average cost of Hajj from your country', done: false },
        { title: 'Open a dedicated Hajj savings account or fund', done: false },
        { title: 'Set up monthly automatic contributions', done: false },
      ],
    },
  ],
  faith_hajj_growth: [
    {
      title: 'Study the spiritual meanings behind each Hajj rite (Tawaf, Sa\'i, Arafah, stoning)',
      priority: 'medium', tags: ['hajj', 'spirituality'],
      description: 'Each rite of Hajj carries profound spiritual symbolism. Understanding these transforms the physical acts into transformative experiences.',
      subtasks: [
        { title: 'Study the symbolism of Tawaf — circling the House of Allah', done: false },
        { title: 'Understand Sa\'i — Hajar\'s trust and striving', done: false },
        { title: 'Reflect on Arafah — standing before Allah in humility', done: false },
        { title: 'Learn the meaning of stoning — rejecting Shaytan\'s whispers', done: false },
      ],
    },
    {
      title: 'Learn the history of Ibrahim (AS) and the founding of the Ka\'bah',
      priority: 'medium', tags: ['hajj', 'seerah'],
      description: 'Hajj traces back to Ibrahim (AS). Understanding his story deepens the emotional and spiritual connection to the rites.',
      subtasks: [
        { title: 'Read the Quranic account of Ibrahim building the Ka\'bah (2:127)', done: false },
        { title: 'Study the story of Hajar and Isma\'il in Makkah', done: false },
        { title: 'Learn about Ibrahim\'s sacrifice and its connection to Eid al-Adha', done: false },
      ],
    },
    {
      title: 'Memorise the Talbiyah and key du\'as of Hajj',
      priority: 'medium', tags: ['hajj', 'memorisation'],
      description: 'The Talbiyah is the anthem of the pilgrim. Memorise it along with the key du\'as for each rite.',
      subtasks: [
        { title: 'Memorise the Talbiyah in Arabic', done: false },
        { title: 'Learn the du\'a for entering Ihram', done: false },
        { title: 'Learn the du\'a between the Yemeni corner and the Black Stone', done: false },
        { title: 'Learn the du\'a of Arafah (the best du\'a)', done: false },
      ],
    },
    {
      title: 'Research accredited Hajj operators and packages',
      priority: 'low', tags: ['hajj', 'planning'],
      description: 'Choose a reputable Hajj operator who provides proper guidance and ensures a safe, compliant Hajj experience.',
      subtasks: [
        { title: 'Research 3-5 licensed Hajj operators', done: false },
        { title: 'Compare packages (economy, standard, premium)', done: false },
        { title: 'Read reviews and ask community members for recommendations', done: false },
      ],
    },
  ],
  faith_hajj_excellence: [
    {
      title: 'Perform Umrah as preparation for the full Hajj experience',
      priority: 'medium', tags: ['umrah'],
      description: 'Umrah familiarises you with the sacred sites and rites, making Hajj less overwhelming when the time comes.',
      subtasks: [
        { title: 'Book an Umrah trip during a less crowded season', done: false },
        { title: 'Perform all the rites with full awareness and presence', done: false },
        { title: 'Document lessons learned for your future Hajj preparation', done: false },
      ],
    },
    {
      title: 'Sponsor someone for Hajj who cannot afford it',
      priority: 'low', tags: ['hajj', 'sadaqah'],
      description: 'Enabling someone to fulfil this pillar is among the greatest acts of charity. Research sponsorship opportunities.',
      subtasks: [
        { title: 'Identify a trustworthy Hajj sponsorship programme', done: false },
        { title: 'Contribute to sponsoring a pilgrim', done: false },
        { title: 'Make du\'a for the sponsored pilgrim', done: false },
      ],
    },
    {
      title: 'Document and share your Hajj preparation journey for others',
      priority: 'low', tags: ['hajj', 'dawah'],
      description: 'Your preparation process can benefit others. Share what you learn — practical tips, fiqh notes, and spiritual reflections.',
      subtasks: [
        { title: 'Keep a journal during your Hajj preparation', done: false },
        { title: 'Share key lessons with family or community', done: false },
        { title: 'Create a resource list (books, courses, du\'a cards) for future pilgrims', done: false },
      ],
    },
  ],
};
