// Seed tasks for Life pillar submodules (Hifz al-Nafs).
// Each submodule has tasks across CORE, GROWTH, and EXCELLENCE boards.
// Tasks are placed in the "To Do" column by default.

export const LIFE_SEED_TASKS = {
  // ── PHYSICAL HEALTH ──
  life_physical_core: [
    {
      title: 'Audit your diet — eliminate haram and doubtful (mashbuh) consumables',
      priority: 'urgent', tags: ['diet', 'halal'],
      description: 'Conduct a thorough review of everything you consume — food, drink, supplements, and medications — to ensure nothing haram or doubtful enters your body. The Prophet (SAW) said that a body nourished by haram will not enter Jannah; this audit is the foundation of physical tayyib living.',
      subtasks: [
        { title: 'List all regularly consumed foods, drinks, and supplements', done: false },
        { title: 'Research halal certification status of each brand and product', done: false },
        { title: 'Identify and flag mashbuh (doubtful) items for further investigation', done: false },
        { title: 'Find halal-certified alternatives for any haram or doubtful items', done: false },
        { title: 'Update your grocery list and meal plan to reflect the audit results', done: false },
      ],
    },
    {
      title: 'Establish a consistent sleep schedule of 7–8 hours aligned with Fajr',
      priority: 'high', tags: ['sleep', 'sunnah'],
      description: 'Design your sleep rhythm around the Prophetic pattern — early to bed after Isha, rising before Fajr. Consistent sleep is the single most impactful health habit, affecting mood, cognitive function, immune strength, and spiritual energy for ibadah.',
      subtasks: [
        { title: 'Calculate your ideal bedtime based on local Fajr time and 7-8 hour target', done: false },
        { title: 'Set a consistent wind-down alarm 30 minutes before bedtime', done: false },
        { title: 'Remove screens and blue light from the bedroom after Isha', done: false },
        { title: 'Practise the Sunnah sleep etiquettes — wudu, right side, sleeping duas', done: false },
        { title: 'Track your sleep consistency for 14 days and adjust as needed', done: false },
      ],
    },
    {
      title: 'Begin a daily walk after Fajr or Asr (minimum 20 minutes)',
      priority: 'high', tags: ['exercise', 'sunnah'],
      description: 'Walking is the most accessible form of movement and carries immense physical and mental benefit. Scheduling it after Fajr or Asr ties it to an existing anchor, builds consistency, and provides time for reflection, dhikr, or beneficial audio content.',
      subtasks: [
        { title: 'Choose a safe and pleasant walking route near your home or mosque', done: false },
        { title: 'Set a daily reminder tied to your Fajr or Asr prayer time', done: false },
        { title: 'Prepare a playlist of Quran recitation, lectures, or dhikr for the walk', done: false },
        { title: 'Track your daily walks for the first 21 days to build the habit', done: false },
      ],
    },
    {
      title: 'Book an annual comprehensive health screening',
      priority: 'high', tags: ['health', 'prevention'],
      description: 'The body is an amanah (trust) from Allah. Preventive health screenings catch issues early when they are most treatable. A comprehensive check-up covers blood work, cardiovascular markers, vision, dental health, and age-appropriate screenings.',
      subtasks: [
        { title: 'Research clinics or doctors that offer comprehensive health panels', done: false },
        { title: 'Schedule the appointment and note any fasting requirements for blood work', done: false },
        { title: 'Prepare a list of current symptoms, medications, and family health history', done: false },
        { title: 'Attend the screening and obtain a copy of all results', done: false },
        { title: 'Review results with the doctor and create an action plan for any flagged areas', done: false },
      ],
    },
    {
      title: 'Identify and remove harmful substances — tobacco, alcohol, processed foods',
      priority: 'urgent', tags: ['diet', 'tayyib'],
      description: 'Allah commands us to consume what is tayyib (pure and wholesome) and forbids what harms. Tobacco, alcohol, and heavily processed foods damage the body and dull the mind. Removing them is both a health imperative and an act of obedience.',
      subtasks: [
        { title: 'Honestly inventory all harmful substances you currently consume', done: false },
        { title: 'Set a firm quit date for any addictive substances (tobacco, vaping, etc.)', done: false },
        { title: 'Identify processed foods in your pantry and find whole-food replacements', done: false },
        { title: 'Seek support — accountability partner, counsellor, or cessation programme', done: false },
        { title: 'Remove harmful items from your home environment entirely', done: false },
      ],
    },
  ],
  life_physical_growth: [
    {
      title: 'Establish 3×/week strength or resistance training routine',
      priority: 'high', tags: ['exercise', 'fitness'],
      description: 'The strong believer is better and more beloved to Allah than the weak believer. Strength training preserves muscle mass, strengthens bones, boosts metabolism, and builds the physical resilience needed to serve your family, community, and deen actively.',
      subtasks: [
        { title: 'Choose a programme suited to your level (bodyweight, gym, or home equipment)', done: false },
        { title: 'Schedule three specific days and times per week for training', done: false },
        { title: 'Learn proper form for foundational movements (squat, push, pull, hinge)', done: false },
        { title: 'Track workouts and progressive overload in a training log', done: false },
        { title: 'Evaluate progress and adjust the programme every 4-6 weeks', done: false },
      ],
    },
    {
      title: 'Track daily water intake (target 2–3 litres)',
      priority: 'medium', tags: ['hydration', 'health'],
      description: 'Proper hydration is essential for cognitive function, digestion, joint health, and energy levels. The Prophet (SAW) advised drinking in three sips and not breathing into the vessel. Building a hydration habit supports every other health goal.',
      subtasks: [
        { title: 'Get a reusable water bottle with volume markings', done: false },
        { title: 'Set hydration reminders at key intervals throughout the day', done: false },
        { title: 'Track daily intake using a simple app or tally method for two weeks', done: false },
        { title: 'Adjust intake based on activity level, climate, and fasting days', done: false },
      ],
    },
    {
      title: 'Explore the Sunnah of intermittent fasting (Monday/Thursday) as a health practice',
      priority: 'medium', tags: ['fasting', 'sunnah'],
      description: 'Fasting on Mondays and Thursdays is a confirmed Sunnah with extraordinary health benefits — improved insulin sensitivity, cellular repair (autophagy), mental clarity, and weight management. It combines spiritual reward with measurable physical benefit.',
      subtasks: [
        { title: 'Research the health science behind intermittent fasting and autophagy', done: false },
        { title: 'Start with one day per week (Monday or Thursday) and build up', done: false },
        { title: 'Plan suhoor and iftar meals that are nutritionally balanced', done: false },
        { title: 'Track energy levels, mood, and focus on fasting vs. non-fasting days', done: false },
        { title: 'Gradually add the second day once the first is consistent', done: false },
      ],
    },
    {
      title: 'Prepare a home emergency medical kit (first aid, medications, contacts)',
      priority: 'medium', tags: ['safety', 'preparation'],
      description: 'Being prepared for medical emergencies is part of responsible stewardship over your household. A well-stocked, accessible first aid kit can prevent minor injuries from becoming serious and buy critical time in emergencies.',
      subtasks: [
        { title: 'Purchase a comprehensive first aid kit or assemble one from a checklist', done: false },
        { title: 'Add household-specific medications (prescriptions, allergy meds, pain relief)', done: false },
        { title: 'Include an emergency contacts card (doctor, hospital, poison control, family)', done: false },
        { title: 'Store the kit in an accessible, known location and inform all household members', done: false },
        { title: 'Set a 6-month reminder to check expiration dates and restock supplies', done: false },
      ],
    },
  ],
  life_physical_excellence: [
    {
      title: 'Implement a nutrient-timing protocol (pre/post workout, suhoor/iftar optimisation)',
      priority: 'medium', tags: ['nutrition', 'performance'],
      description: 'Nutrient timing optimises when you eat specific macronutrients to maximise energy, recovery, and body composition. For Muslims, this also means strategically planning suhoor and iftar nutrition during Ramadan and voluntary fasts for sustained performance.',
      subtasks: [
        { title: 'Learn the basics of macronutrient timing (protein, carbs, fats) around training', done: false },
        { title: 'Design a pre-workout and post-workout meal template', done: false },
        { title: 'Create an optimised suhoor meal plan for fasting days (slow-digesting, hydrating)', done: false },
        { title: 'Create an optimised iftar meal plan (quick energy, then balanced nutrition)', done: false },
        { title: 'Test and refine the protocol over 30 days, tracking energy and recovery', done: false },
      ],
    },
    {
      title: 'Learn and practise an active Sunnah sport (swimming, archery, or horse riding)',
      priority: 'low', tags: ['sunnah', 'fitness'],
      description: 'Umar (RA) said: "Teach your children swimming, archery, and horse riding." These sports build confidence, discipline, and physical capability. Pursuing them honours the Sunnah and develops skills that connect you to a tradition of strength and readiness.',
      subtasks: [
        { title: 'Research local facilities or clubs offering swimming, archery, or horse riding', done: false },
        { title: 'Enrol in a beginner course or find an experienced instructor', done: false },
        { title: 'Commit to a regular practice schedule (weekly minimum)', done: false },
        { title: 'Set a 90-day proficiency goal for your chosen sport', done: false },
        { title: 'Consider involving family members to make it a shared Sunnah practice', done: false },
      ],
    },
    {
      title: 'Develop a peak-performance body composition target and 90-day plan',
      priority: 'low', tags: ['fitness', 'planning'],
      description: 'Moving beyond basic health to peak physical performance is a form of ihsan (excellence) in stewardship of the body. Setting a clear body composition target with a structured plan brings intentionality and measurement to your physical development.',
      subtasks: [
        { title: 'Measure current body composition (weight, body fat %, key measurements)', done: false },
        { title: 'Set a realistic 90-day target based on your goals and starting point', done: false },
        { title: 'Design or select a training programme aligned with the target', done: false },
        { title: 'Create a nutrition plan with caloric and macronutrient targets', done: false },
        { title: 'Schedule bi-weekly progress check-ins with measurements and photos', done: false },
        { title: 'Review and adjust the plan at the 45-day midpoint', done: false },
      ],
    },
  ],

  // ── MENTAL WELL-BEING ──
  life_mental_core: [
    {
      title: 'Establish a morning routine: Fajr → Quran (minimum 1 page) → morning adhkar → journal',
      priority: 'urgent', tags: ['routine', 'adhkar'],
      description: 'How you start your morning determines the quality of your entire day. This Prophetic morning sequence — prayer, Quran, remembrance of Allah, and self-reflection — anchors your mind in purpose and protects against anxiety and aimlessness.',
      subtasks: [
        { title: 'Write out the exact sequence and estimated time for each element', done: false },
        { title: 'Prepare your Quran and journal in a designated morning spot the night before', done: false },
        { title: 'Memorise or print the morning adhkar (Hisn al-Muslim or equivalent)', done: false },
        { title: 'Start with a minimal version (5-10 min total) and expand gradually', done: false },
        { title: 'Track completion daily for 30 days to solidify the habit', done: false },
      ],
    },
    {
      title: 'Identify sources of haram media (music, content) and set firm boundaries',
      priority: 'high', tags: ['media', 'protection'],
      description: 'The eyes, ears, and heart are all accountable before Allah. Haram media — whether explicit content, idle entertainment that wastes time, or music that hardens the heart — erodes spiritual sensitivity and mental clarity. Setting boundaries is an act of self-preservation.',
      subtasks: [
        { title: 'Audit your subscriptions, apps, and social media follows for harmful content', done: false },
        { title: 'Unsubscribe, unfollow, or delete sources of haram or time-wasting media', done: false },
        { title: 'Replace haram entertainment with beneficial alternatives (podcasts, lectures, nasheeds)', done: false },
        { title: 'Install content filters or screen time controls on your devices', done: false },
        { title: 'Establish a household media policy if you have children or dependents', done: false },
      ],
    },
    {
      title: 'Practise daily dhikr for anxiety — recite Ayat al-Kursi, last two ayat of Al-Baqarah',
      priority: 'high', tags: ['dhikr', 'mental-health'],
      description: 'Allah says: "Verily, in the remembrance of Allah do hearts find rest" (13:28). Specific adhkar have been prescribed by the Prophet (SAW) for protection and tranquillity. Making these a non-negotiable daily practice builds a spiritual shield against anxiety and intrusive thoughts.',
      subtasks: [
        { title: 'Memorise Ayat al-Kursi (2:255) if not already memorised', done: false },
        { title: 'Memorise the last two ayat of Surah Al-Baqarah (2:285-286)', done: false },
        { title: 'Recite both after every fardh salah as a consistent practice', done: false },
        { title: 'Add evening adhkar including the three Quls and Ayat al-Kursi before sleep', done: false },
        { title: 'Notice and journal any changes in anxiety levels over 21 days', done: false },
      ],
    },
    {
      title: 'Limit social media use to defined time windows — set screen-time limits',
      priority: 'high', tags: ['digital-detox', 'focus'],
      description: 'Uncontrolled social media use fragments attention, feeds comparison, and steals hours that could be spent in worship, learning, or meaningful connection. Setting firm time windows turns a passive habit into a controlled, intentional tool.',
      subtasks: [
        { title: 'Check your current daily screen time and identify the worst offending apps', done: false },
        { title: 'Define two specific time windows per day for social media (e.g., 12-12:30, 8-8:30)', done: false },
        { title: 'Enable built-in screen time limits on your phone and computer', done: false },
        { title: 'Move social media apps off your home screen or into a folder', done: false },
        { title: 'Replace idle scrolling moments with dhikr, reading, or a beneficial app', done: false },
      ],
    },
    {
      title: 'Seek Islamic counselling or therapy if experiencing persistent anxiety or depression',
      priority: 'medium', tags: ['mental-health', 'help'],
      description: 'Seeking help is a sign of strength, not weakness. The Prophet (SAW) said: "Make use of medical treatment, for Allah has not made a disease without a remedy." Islamic counselling integrates psychological science with spiritual healing for holistic care.',
      subtasks: [
        { title: 'Honestly assess whether you are experiencing persistent low mood, anxiety, or emotional distress', done: false },
        { title: 'Research Muslim therapists or Islamic counselling services in your area or online', done: false },
        { title: 'Schedule an initial consultation or intake session', done: false },
        { title: 'Discuss your spiritual practices as part of the therapeutic conversation', done: false },
        { title: 'Commit to at least 4-6 sessions before evaluating whether to continue', done: false },
      ],
    },
  ],
  life_mental_growth: [
    {
      title: 'Start a daily muhasaba (self-accounting) journal — 5 minutes before sleep',
      priority: 'high', tags: ['muhasaba', 'reflection'],
      description: 'Umar (RA) said: "Take account of yourselves before you are taken to account." Muhasaba is the practice of reviewing your day — what you did well, where you fell short, and what you intend for tomorrow. Five minutes of honest self-reflection accelerates personal growth dramatically.',
      subtasks: [
        { title: 'Get a dedicated journal or notebook for nightly muhasaba', done: false },
        { title: 'Create a simple template: 3 blessings, 1 shortcoming, 1 intention for tomorrow', done: false },
        { title: 'Set a recurring alarm 15 minutes before your target bedtime', done: false },
        { title: 'Write consistently for 21 days without judging the quality of entries', done: false },
        { title: 'Review weekly patterns to identify recurring strengths and weaknesses', done: false },
      ],
    },
    {
      title: 'Designate one day per week as a digital-free unplugged day',
      priority: 'medium', tags: ['digital-detox', 'rest'],
      description: 'The mind needs genuine rest — not just sleep, but freedom from the constant stimulation of screens and notifications. An unplugged day restores mental clarity, deepens family bonds, and creates space for worship, nature, and unhurried thought.',
      subtasks: [
        { title: 'Choose a consistent day of the week for your digital detox', done: false },
        { title: 'Inform key contacts and set an auto-reply for that day', done: false },
        { title: 'Plan alternative activities: reading, family time, nature walks, mosque visits', done: false },
        { title: 'Put devices in a drawer or designated storage for the full day', done: false },
        { title: 'Journal your experience after the first three unplugged days to notice the impact', done: false },
      ],
    },
    {
      title: 'Study and practise Sunnah grounding techniques: wudu for anger, salah for stress, istighfar for guilt',
      priority: 'medium', tags: ['sunnah', 'mental-health'],
      description: 'The Prophet (SAW) prescribed specific spiritual actions for specific emotional states — wudu to cool anger, prayer to find relief in distress, and istighfar to release guilt. These are divinely guided coping mechanisms that address both the spiritual and psychological root of difficult emotions.',
      subtasks: [
        { title: 'Study the hadith sources for each technique (anger→wudu, distress→salah, guilt→istighfar)', done: false },
        { title: 'Create a personal cue card: "When I feel X, I will do Y"', done: false },
        { title: 'Practise immediately the next time you experience anger, stress, or guilt', done: false },
        { title: 'Reflect on effectiveness in your muhasaba journal after each use', done: false },
      ],
    },
    {
      title: 'Read one book on Islamic psychology or tazkiyah al-nafs per month',
      priority: 'medium', tags: ['study', 'tazkiyah'],
      description: 'Islamic tradition has a rich body of knowledge on the purification of the soul and the diseases of the heart. Reading works by scholars like Imam al-Ghazali, Ibn al-Qayyim, and contemporary Muslim psychologists deepens self-understanding and provides tools for genuine inner transformation.',
      subtasks: [
        { title: 'Build a reading list — start with Ihya Ulum al-Din (abridged), Purification of the Heart, or Reclaim Your Heart', done: false },
        { title: 'Schedule 20-30 minutes of daily reading time', done: false },
        { title: 'Take notes on key concepts and how they apply to your own nafs', done: false },
        { title: 'Discuss insights with a friend, spouse, or study circle for deeper understanding', done: false },
        { title: 'Apply at least one practical lesson from each book to your daily life', done: false },
      ],
    },
  ],
  life_mental_excellence: [
    {
      title: 'Begin a cognitive training programme — Quran memorisation or language learning',
      priority: 'medium', tags: ['memorisation', 'cognitive'],
      description: 'The brain, like any muscle, grows stronger with consistent challenge. Quran memorisation is the pinnacle of cognitive training for a Muslim — it strengthens memory, builds discipline, and earns immense reward. Language learning (Arabic especially) opens doors to understanding the deen directly.',
      subtasks: [
        { title: 'Choose your track: Quran memorisation (hifz) or Arabic/language learning', done: false },
        { title: 'Find a qualified teacher, programme, or structured app', done: false },
        { title: 'Set a daily practice window of 20-30 minutes minimum', done: false },
        { title: 'Establish a review system to retain what you have already learned', done: false },
        { title: 'Set monthly milestones (e.g., 1 page/week for hifz, 1 lesson/day for language)', done: false },
      ],
    },
    {
      title: 'Engage a mentor, coach, or therapist for deep personal development',
      priority: 'medium', tags: ['mentorship', 'growth'],
      description: 'Every great companion had a mentor. Working with someone who can see your blind spots, challenge your assumptions, and hold you accountable accelerates growth in ways self-study alone cannot. This could be a shaykh, a professional coach, or a therapist depending on your needs.',
      subtasks: [
        { title: 'Identify what you most need right now: spiritual guidance, life coaching, or therapeutic support', done: false },
        { title: 'Research and shortlist 3-5 potential mentors, coaches, or therapists', done: false },
        { title: 'Reach out and schedule an introductory conversation with your top choice', done: false },
        { title: 'Commit to a regular cadence of sessions (weekly or bi-weekly)', done: false },
        { title: 'Prepare for each session with specific questions, challenges, or reflections', done: false },
      ],
    },
    {
      title: 'Write a personal soul-map: your psychological autobiography, values, wounds, and aspirations',
      priority: 'low', tags: ['reflection', 'tazkiyah'],
      description: 'A soul-map is a deep, honest written exploration of who you are — your formative experiences, core values, emotional wounds, recurring patterns, and highest aspirations. This exercise brings unconscious drivers into conscious awareness, enabling intentional change and genuine self-knowledge.',
      subtasks: [
        { title: 'Write your life story in 3-5 pages, focusing on pivotal moments that shaped you', done: false },
        { title: 'List your top 5 non-negotiable values and test whether your life reflects them', done: false },
        { title: 'Identify your deepest emotional wounds and how they influence your behaviour today', done: false },
        { title: 'Describe the person you aspire to become in 5 years — spiritually, mentally, socially', done: false },
        { title: 'Share relevant portions with a trusted mentor or spouse for external reflection', done: false },
      ],
    },
  ],

  // ── SAFETY & SECURITY ──
  life_safety_core: [
    {
      title: 'Confirm stable, secure, and dignified housing for your household',
      priority: 'urgent', tags: ['housing', 'security'],
      description: 'Shelter is one of the most fundamental human needs and a prerequisite for stability in every other area of life. Dignified housing means a space that is safe, clean, adequately sized, and free from threats — a foundation upon which spiritual and professional life can be built.',
      subtasks: [
        { title: 'Assess your current housing for safety issues (locks, lighting, structural integrity)', done: false },
        { title: 'Verify that your lease or mortgage terms are halal and sustainable', done: false },
        { title: 'Ensure the home provides adequate privacy and space for salah and family life', done: false },
        { title: 'Address any urgent maintenance or safety concerns immediately', done: false },
        { title: 'If housing is unstable, create a plan with timeline and budget for improvement', done: false },
      ],
    },
    {
      title: 'Verify that all basic needs (food, clothing, shelter) are covered by halal income',
      priority: 'urgent', tags: ['provision', 'halal'],
      description: 'The Prophet (SAW) taught that the son of Adam has no right to anything beyond basic food, clothing, and shelter. Ensuring these essentials are covered by halal income is both a spiritual obligation and the foundation of financial peace. Any haram source taints everything built upon it.',
      subtasks: [
        { title: 'List all current income sources and verify each is halal', done: false },
        { title: 'Calculate your monthly essential expenses (food, clothing, shelter, utilities)', done: false },
        { title: 'Confirm that halal income fully covers these essentials with no shortfall', done: false },
        { title: 'If there is a gap, identify halal income opportunities to close it', done: false },
        { title: 'Eliminate any haram income sources and replace them with halal alternatives', done: false },
      ],
    },
    {
      title: 'Build a 3-month emergency fund in a halal savings vehicle',
      priority: 'high', tags: ['finance', 'emergency'],
      description: 'An emergency fund provides a buffer against unexpected job loss, medical expenses, or urgent needs — reducing the temptation to take on riba-based debt in a crisis. Three months of essential expenses, held in a halal account, is the minimum safety net every Muslim household should have.',
      subtasks: [
        { title: 'Calculate your total monthly essential expenses to determine the 3-month target', done: false },
        { title: 'Open a halal savings account (Islamic bank or halal investment vehicle)', done: false },
        { title: 'Set up an automatic monthly transfer toward the emergency fund', done: false },
        { title: 'Avoid touching the fund for non-emergencies — define what qualifies as an emergency', done: false },
        { title: 'Track progress monthly until the 3-month target is reached', done: false },
      ],
    },
    {
      title: 'Obtain basic first aid and CPR certification',
      priority: 'high', tags: ['first-aid', 'preparation'],
      description: 'Knowing how to respond in a medical emergency can save a life — a family member, a colleague, or a stranger. First aid and CPR certification equips you with practical skills that fulfil the Islamic duty of preserving life (hifz al-nafs) in its most direct form.',
      subtasks: [
        { title: 'Find a certified first aid and CPR course in your area or online', done: false },
        { title: 'Register and complete the course (typically 4-8 hours)', done: false },
        { title: 'Practise key skills: recovery position, CPR compressions, choking response', done: false },
        { title: 'Keep your certification current with renewal before expiry', done: false },
      ],
    },
    {
      title: 'Document an emergency contact plan — phone numbers, meeting point, exit routes',
      priority: 'medium', tags: ['emergency', 'planning'],
      description: 'In an emergency — fire, natural disaster, or security threat — panic is the enemy. A pre-documented plan with clear contacts, meeting points, and exit routes ensures your family can act quickly and reunite safely. Tawakkul in Allah does not negate taking practical precautions.',
      subtasks: [
        { title: 'List emergency contacts: family, neighbours, local emergency services, mosque', done: false },
        { title: 'Identify two exit routes from your home and a family meeting point outside', done: false },
        { title: 'Print the plan and post it in a visible location (kitchen or hallway)', done: false },
        { title: 'Save all emergency numbers in every family member\'s phone', done: false },
        { title: 'Conduct a family walkthrough of the plan so everyone knows what to do', done: false },
      ],
    },
  ],
  life_safety_growth: [
    {
      title: 'Improve living conditions — reduce overcrowding, noise, and environmental stressors',
      priority: 'high', tags: ['housing', 'well-being'],
      description: 'Your environment shapes your mental state. Overcrowding, excessive noise, clutter, and poor lighting create chronic stress that erodes well-being and makes ibadah, study, and family life harder. Improving your living conditions is an investment in every dimension of your life.',
      subtasks: [
        { title: 'Identify the top 3 environmental stressors in your home (noise, clutter, lighting, space)', done: false },
        { title: 'Declutter one room at a time — remove what you do not need or use', done: false },
        { title: 'Address noise issues with practical solutions (rugs, curtains, white noise, conversation)', done: false },
        { title: 'Improve lighting — maximise natural light and add warm task lighting where needed', done: false },
        { title: 'Create a dedicated quiet space for salah, reading, and reflection', done: false },
      ],
    },
    {
      title: 'Research and obtain relevant Takaful (Islamic insurance) for health and property',
      priority: 'medium', tags: ['takaful', 'protection'],
      description: 'Takaful is the Islamic alternative to conventional insurance, based on mutual cooperation rather than riba and gharar. Securing takaful coverage for health and property protects your family from catastrophic financial loss while remaining within halal boundaries.',
      subtasks: [
        { title: 'Learn the difference between takaful and conventional insurance', done: false },
        { title: 'Identify takaful providers available in your country or region', done: false },
        { title: 'Compare plans for health coverage — premiums, coverage limits, exclusions', done: false },
        { title: 'Evaluate property/home takaful options for your dwelling and valuables', done: false },
        { title: 'Select and enrol in the most suitable plans for your household', done: false },
      ],
    },
    {
      title: 'Create a written home safety protocol (fire plan, emergency procedures)',
      priority: 'medium', tags: ['safety', 'planning'],
      description: 'A written safety protocol transforms vague intentions into clear, rehearsed actions. Covering fire escape, gas leaks, medical emergencies, and severe weather ensures your household is prepared for the most common domestic risks.',
      subtasks: [
        { title: 'Install or test smoke detectors and carbon monoxide alarms in your home', done: false },
        { title: 'Write a fire escape plan with two exits per room and a meeting point', done: false },
        { title: 'Document procedures for gas leak, water leak, and power outage', done: false },
        { title: 'Store a fire extinguisher in the kitchen and learn how to use it', done: false },
        { title: 'Rehearse the fire escape plan with all household members quarterly', done: false },
      ],
    },
    {
      title: 'Understand your legal rights as a Muslim in your jurisdiction (employment, religious accommodation)',
      priority: 'medium', tags: ['rights', 'knowledge'],
      description: 'Knowing your legal rights regarding religious practice — prayer breaks, hijab, dietary accommodation, holiday observance — empowers you to advocate for yourself professionally and protects you from unlawful discrimination. Knowledge here is both practical wisdom and a form of self-preservation.',
      subtasks: [
        { title: 'Research anti-discrimination laws regarding religion in your jurisdiction', done: false },
        { title: 'Understand your rights to religious accommodation at work (prayer, fasting, dress)', done: false },
        { title: 'Identify legal resources and Muslim advocacy organisations in your area', done: false },
        { title: 'Document any current or past accommodation requests and their outcomes', done: false },
        { title: 'Know the process for filing a complaint if your rights are violated', done: false },
      ],
    },
  ],
  life_safety_excellence: [
    {
      title: 'Contribute to a community safety initiative — neighbourhood watch, emergency response training',
      priority: 'low', tags: ['community', 'safety'],
      description: 'Extending safety beyond your own household to your community is a manifestation of the Prophetic principle that the best of people are those most beneficial to others. Community safety initiatives build social cohesion, deter harm, and create networks of mutual support.',
      subtasks: [
        { title: 'Research existing community safety programmes in your neighbourhood or mosque', done: false },
        { title: 'Attend an introductory meeting or training session', done: false },
        { title: 'Volunteer for a specific role (coordinator, trainer, communications)', done: false },
        { title: 'Complete any required training (community emergency response, de-escalation)', done: false },
        { title: 'Recruit at least two other community members to participate', done: false },
      ],
    },
    {
      title: 'Develop a family continuity plan — wills, guardianship, Islamic estate planning',
      priority: 'medium', tags: ['planning', 'family'],
      description: 'Islamic estate planning (mirath) is a fardh obligation, yet most Muslims die without a valid Islamic will. A family continuity plan ensures your assets are distributed according to Shariah, your children have designated guardians, and your family is not left in legal limbo during their most vulnerable moment.',
      subtasks: [
        { title: 'Learn the Islamic rules of inheritance (mirath) and obligatory shares', done: false },
        { title: 'Draft an Islamic will (wasiyyah) with the help of a knowledgeable scholar or solicitor', done: false },
        { title: 'Designate guardians for minor children in consultation with your spouse and family', done: false },
        { title: 'Document all assets, debts, accounts, and insurance policies in one secure location', done: false },
        { title: 'Review and update the will annually or after any major life event', done: false },
        { title: 'Inform your executor and family members where the will and key documents are stored', done: false },
      ],
    },
    {
      title: 'Pursue a leadership role in your neighbourhood or mosque safety committee',
      priority: 'low', tags: ['leadership', 'community'],
      description: 'Taking a leadership role in safety infrastructure — whether at the mosque, school, or neighbourhood level — multiplies your impact and ensures that safety planning is proactive rather than reactive. It is a form of khidmah (service) that protects the most vulnerable.',
      subtasks: [
        { title: 'Express your interest to the mosque board or community organisation leadership', done: false },
        { title: 'Assess the current state of safety protocols and identify the biggest gaps', done: false },
        { title: 'Propose a structured safety improvement plan with priorities and timelines', done: false },
        { title: 'Organise a safety training or awareness event for the community', done: false },
        { title: 'Build a team of committed volunteers to sustain the initiative beyond you', done: false },
      ],
    },
  ],

  // ── SOCIAL CHARACTER ──
  life_social_core: [
    {
      title: 'Master the Islamic greeting — give salam freely and respond completely',
      priority: 'high', tags: ['adab', 'sunnah'],
      description: 'The Prophet (SAW) said: "You will not enter Paradise until you believe, and you will not believe until you love one another. Shall I not tell you of something that if you do it, you will love one another? Spread the salam amongst yourselves." The greeting of peace is the simplest, most powerful tool for building Muslim brotherhood.',
      subtasks: [
        { title: 'Make it a habit to initiate salam with every Muslim you encounter', done: false },
        { title: 'Learn and use the full response: "Wa alaykum as-salam wa rahmatullahi wa barakatuh"', done: false },
        { title: 'Greet strangers at the mosque, workplace, and in your neighbourhood', done: false },
        { title: 'Teach children the etiquette of giving and responding to salam', done: false },
      ],
    },
    {
      title: 'Fulfil social obligations consistently — attend weddings, funerals, and visit the sick',
      priority: 'high', tags: ['adab', 'community'],
      description: 'The Prophet (SAW) outlined five rights of a Muslim upon another Muslim, including visiting the sick, attending funerals, and accepting invitations. These are not optional courtesies — they are obligations that maintain the social fabric of the ummah and earn immense reward.',
      subtasks: [
        { title: 'Keep a calendar or list of upcoming social obligations (weddings, births, illnesses)', done: false },
        { title: 'Prioritise attending janazah prayers whenever you are notified of a death', done: false },
        { title: 'Visit at least one sick person per month — bring food, dua, and companionship', done: false },
        { title: 'Accept invitations to walimah and other gatherings unless there is a valid Islamic reason not to', done: false },
        { title: 'Follow up after visits with a message, call, or continued support', done: false },
      ],
    },
    {
      title: 'Audit your speech — eliminate backbiting (gheebah), slander (buhtan), and lying',
      priority: 'urgent', tags: ['adab', 'character'],
      description: 'Allah compares backbiting to eating the flesh of your dead brother (49:12). The tongue is the most dangerous limb — it can destroy relationships, reputations, and your own akhirah. An honest audit of your speech habits is the starting point for purifying your social character.',
      subtasks: [
        { title: 'For one week, actively monitor every conversation for gheebah, buhtan, or exaggeration', done: false },
        { title: 'Identify your triggers — who, what, and when do you most often slip into harmful speech', done: false },
        { title: 'Establish a personal rule: speak about someone only as you would in their presence', done: false },
        { title: 'When you catch yourself backbiting, make istighfar and say something positive about the person', done: false },
        { title: 'Find an accountability partner who will gently remind you when you slip', done: false },
      ],
    },
    {
      title: 'Practise positive body language — eye contact, open posture, and full presence in conversations',
      priority: 'medium', tags: ['adab', 'communication'],
      description: 'The Prophet (SAW) was described as giving his full attention to whoever spoke to him, turning his entire body toward them. Positive body language — eye contact, leaning in, putting down your phone — communicates respect and builds trust in every interaction.',
      subtasks: [
        { title: 'Put your phone away (face down or in pocket) during all face-to-face conversations', done: false },
        { title: 'Practise making comfortable eye contact — aim for 60-70% of the conversation', done: false },
        { title: 'Face the speaker with open posture (uncrossed arms, slight lean forward)', done: false },
        { title: 'Observe how others respond when you give them full, undivided attention', done: false },
      ],
    },
    {
      title: 'Respond to wrongdoing with patience (hilm) — implement a 24-hour rule before reacting',
      priority: 'medium', tags: ['character', 'patience'],
      description: 'The Prophet (SAW) said: "The strong person is not the one who can wrestle, but the one who controls himself when angry." The 24-hour rule creates a buffer between stimulus and response, allowing wisdom and hilm (forbearance) to replace impulsive reactions that you would regret.',
      subtasks: [
        { title: 'Commit to the rule: when wronged or angered, wait 24 hours before responding', done: false },
        { title: 'During the waiting period, make wudu, pray two rakaat, and seek counsel from Allah', done: false },
        { title: 'Write down what happened and how you feel before deciding on a response', done: false },
        { title: 'After 24 hours, choose the response that is most just and most likely to preserve the relationship', done: false },
        { title: 'Track incidents where the 24-hour rule prevented a regrettable reaction', done: false },
      ],
    },
  ],
  life_social_growth: [
    {
      title: 'Build a reputation for honesty and reliability in your professional and social circles',
      priority: 'high', tags: ['trust', 'character'],
      description: 'The Prophet (SAW) was known as al-Amin (the trustworthy) even before revelation. A reputation for honesty and reliability is built through consistent small actions — keeping promises, meeting deadlines, telling the truth even when it is inconvenient, and never overpromising.',
      subtasks: [
        { title: 'Audit your current commitments — are there any unfulfilled promises or overdue obligations?', done: false },
        { title: 'Adopt a policy of under-promising and over-delivering in all commitments', done: false },
        { title: 'Follow through on every small commitment (returning calls, showing up on time, completing favours)', done: false },
        { title: 'When you cannot fulfil a commitment, communicate proactively and honestly', done: false },
        { title: 'Ask a trusted friend or colleague for honest feedback on your reliability', done: false },
      ],
    },
    {
      title: 'Perform a regular act of service (khidmah) — volunteer, help a neighbour, or assist at the mosque',
      priority: 'medium', tags: ['khidmah', 'community'],
      description: 'The Prophet (SAW) said: "The most beloved of people to Allah are those who are most beneficial to people." Regular service — whether structured volunteering or spontaneous acts of kindness — builds empathy, strengthens community bonds, and purifies the nafs from selfishness.',
      subtasks: [
        { title: 'Identify a cause or organisation aligned with your skills and values', done: false },
        { title: 'Commit to a regular schedule — even 2-4 hours per month makes a difference', done: false },
        { title: 'Look for daily micro-opportunities: carrying groceries, giving rides, checking on elderly neighbours', done: false },
        { title: 'Involve your family in service activities to build a culture of giving', done: false },
      ],
    },
    {
      title: 'Develop active listening skills — practise full presence and ask thoughtful follow-up questions',
      priority: 'medium', tags: ['communication', 'character'],
      description: 'Most people listen to respond, not to understand. Active listening — being fully present, reflecting back what you hear, and asking genuine follow-up questions — is one of the most powerful ways to honour another human being and build deep, trusting relationships.',
      subtasks: [
        { title: 'In your next 5 conversations, focus entirely on listening without planning your response', done: false },
        { title: 'Practise paraphrasing: "So what I hear you saying is..." before responding', done: false },
        { title: 'Ask at least one thoughtful follow-up question in every meaningful conversation', done: false },
        { title: 'Notice the difference in connection quality when you listen deeply vs. superficially', done: false },
        { title: 'Read or watch one resource on active listening techniques this month', done: false },
      ],
    },
    {
      title: 'Identify and reconcile at least one broken or strained relationship this month',
      priority: 'high', tags: ['reconciliation', 'sulh'],
      description: 'The Prophet (SAW) said: "It is not permissible for a Muslim to forsake his brother for more than three days." Broken relationships weigh on the heart, harden it, and block blessings. Reconciliation — even when you were wronged — is one of the highest acts of character in Islam.',
      subtasks: [
        { title: 'List relationships that are currently strained, broken, or distant', done: false },
        { title: 'Choose one relationship to prioritise for reconciliation this month', done: false },
        { title: 'Reflect honestly on your role in the breakdown — make istighfar if needed', done: false },
        { title: 'Reach out with humility — a call, visit, or sincere message', done: false },
        { title: 'Focus on restoring basic goodwill, not necessarily resolving every issue at once', done: false },
      ],
    },
  ],
  life_social_excellence: [
    {
      title: 'Mentor a younger Muslim in character development and professional or spiritual growth',
      priority: 'medium', tags: ['mentorship', 'dawah'],
      description: 'The Prophet (SAW) invested deeply in individual mentorship — his companionship with Abu Bakr, his guidance of Ali, his nurturing of Anas. Mentoring a younger Muslim passes on hard-won wisdom, multiplies your impact, and fulfils the obligation of mutual enjoining of good (amr bil maruf).',
      subtasks: [
        { title: 'Identify a younger Muslim in your community, workplace, or family who could benefit from mentorship', done: false },
        { title: 'Initiate the relationship naturally — regular check-ins over coffee, walks, or shared activities', done: false },
        { title: 'Listen first to understand their challenges, goals, and aspirations', done: false },
        { title: 'Share relevant experiences, lessons, and resources without being preachy', done: false },
        { title: 'Meet consistently — at least monthly — and follow up on previous conversations', done: false },
      ],
    },
    {
      title: 'Represent Islam publicly through excellence in conduct — let your character be your dawah',
      priority: 'medium', tags: ['dawah', 'character'],
      description: 'The greatest dawah is not a speech or a pamphlet — it is your character. When non-Muslims see a Muslim who is honest, generous, patient, and excellent in their work, it speaks louder than any argument. This task is about being intentionally excellent in public-facing interactions as an act of worship.',
      subtasks: [
        { title: 'Identify 3 public-facing contexts where you interact with non-Muslims regularly', done: false },
        { title: 'In each context, aim for measurably excellent conduct — extra courtesy, reliability, generosity', done: false },
        { title: 'Handle complaints, conflicts, or rudeness with prophetic composure and grace', done: false },
        { title: 'Be willing to explain Islamic practices when asked, with warmth and confidence', done: false },
        { title: 'Reflect monthly on whether your public conduct would make the Prophet (SAW) proud', done: false },
      ],
    },
    {
      title: 'Establish or join a circle of accountability (muhasaba group) with trusted peers',
      priority: 'low', tags: ['muhasaba', 'community'],
      description: 'Iron sharpens iron. A muhasaba circle is a small group of trusted Muslim peers who meet regularly to hold each other accountable in deen, character, and goals. This practice was modelled by the Sahaba and remains one of the most effective tools for sustained spiritual and personal growth.',
      subtasks: [
        { title: 'Identify 2-4 trusted, like-minded Muslim peers who share your commitment to growth', done: false },
        { title: 'Propose the concept and agree on a format: weekly or bi-weekly, in person or virtual', done: false },
        { title: 'Establish ground rules: confidentiality, honesty, no judgement, constructive feedback only', done: false },
        { title: 'Structure each session: check-in on goals, share struggles, make dua for each other', done: false },
        { title: 'Rotate facilitation so no single person carries the burden of leading every session', done: false },
        { title: 'Evaluate the group dynamic after 3 months and adjust format as needed', done: false },
      ],
    },
  ],
};
