// Seed tasks for Family pillar submodules (Hifz al-Nasl).
// Each submodule has tasks across CORE, GROWTH, and EXCELLENCE boards.
// Tasks are placed in the "To Do" column by default.

export const FAMILY_SEED_TASKS = {
  // ── FOUNDATIONS OF MARRIAGE ──
  family_marriage_core: [
    {
      title: 'Verify your marriage contract (nikah) is valid — confirm witnesses, mahr, and wali were present',
      priority: 'urgent', tags: ['nikah', 'fiqh'],
      description: 'The nikah contract is the legal and spiritual foundation of your marriage. Verifying its validity ensures your union meets the conditions set by the Shariah — proper wali (guardian), two Muslim witnesses, and an agreed-upon mahr. Without these, the marriage may be void or deficient in the eyes of Allah.',
      subtasks: [
        { title: 'Locate your original nikah certificate or obtain a copy from the officiant', done: false },
        { title: 'Confirm the wali who represented the bride was a valid guardian per fiqh rulings', done: false },
        { title: 'Verify that two adult Muslim male witnesses were present and attested', done: false },
        { title: 'Confirm the mahr was clearly stated, agreed upon, and documented', done: false },
        { title: 'If any element is missing or doubtful, consult a qualified scholar to rectify', done: false },
      ],
    },
    {
      title: 'Establish daily check-ins with your spouse — minimum 10 minutes of undivided attention',
      priority: 'high', tags: ['marriage', 'connection'],
      description: 'The Prophet (peace be upon him) was attentive and present with his wives despite immense responsibilities. A daily check-in — free from screens and distractions — builds emotional safety, prevents resentment from accumulating, and keeps the marital bond alive through consistent small investments.',
      subtasks: [
        { title: 'Choose a consistent daily time slot that works for both spouses', done: false },
        { title: 'Set a ground rule: no phones, no children interruptions during check-in', done: false },
        { title: 'Use a simple framework — share one highlight, one concern, one gratitude', done: false },
        { title: 'Track consistency for the first 30 days to build the habit', done: false },
      ],
    },
    {
      title: 'Learn the mutual rights and obligations of spouses in Islam (nafaqah, kindness, intimacy)',
      priority: 'high', tags: ['fiqh', 'marriage'],
      description: 'Islam assigns clear, reciprocal rights to both husband and wife — from financial provision (nafaqah) to emotional kindness (mu\'ashara bil-ma\'ruf) to physical intimacy. Understanding these rights prevents injustice and transforms the marriage from a cultural arrangement into an act of worship.',
      subtasks: [
        { title: 'Study the husband\'s obligations: nafaqah, kind treatment, fair division of time', done: false },
        { title: 'Study the wife\'s rights: financial maintenance, dignified treatment, consent in major decisions', done: false },
        { title: 'Study the wife\'s obligations and husband\'s rights as outlined in authentic sources', done: false },
        { title: 'Read Surah An-Nisa (4:19) and Surah Ar-Rum (30:21) with tafsir for Quranic grounding', done: false },
        { title: 'Discuss findings together as a couple and identify areas for improvement', done: false },
      ],
    },
    {
      title: 'Ensure your spouse\'s basic needs — financial, emotional, and physical — are consistently met',
      priority: 'urgent', tags: ['marriage', 'obligation'],
      description: 'Meeting your spouse\'s fundamental needs is not generosity — it is an obligation (wajib). The Prophet (peace be upon him) said, "The best of you are the best to their families." Neglecting provision, emotional support, or physical companionship erodes the marriage at its foundations and is a form of dhulm (injustice).',
      subtasks: [
        { title: 'Review whether current financial provision covers housing, food, clothing, and healthcare', done: false },
        { title: 'Ask your spouse directly: "Do you feel emotionally supported by me?"', done: false },
        { title: 'Assess whether physical intimacy needs are being mutually respected and fulfilled', done: false },
        { title: 'Identify any unmet need and create a concrete plan to address it within 7 days', done: false },
      ],
    },
    {
      title: 'Eliminate all forms of abuse — verbal, emotional, and physical — from the marital relationship',
      priority: 'urgent', tags: ['character', 'marriage'],
      description: 'Abuse in any form is categorically haram and a betrayal of the trust (amanah) that marriage represents. The Prophet (peace be upon him) never struck a woman and condemned those who did. This task demands honest self-examination and, where patterns of harm exist, seeking professional and scholarly intervention immediately.',
      subtasks: [
        { title: 'Honestly assess whether you have engaged in shouting, name-calling, belittling, or threats', done: false },
        { title: 'Ask your spouse in a safe setting if they have ever felt afraid or demeaned by your behaviour', done: false },
        { title: 'If any form of abuse is identified, seek professional counselling immediately', done: false },
        { title: 'Learn the prophetic model of conflict — the Prophet would go silent, never violent or cruel', done: false },
        { title: 'Establish a zero-tolerance household agreement and revisit it monthly', done: false },
      ],
    },
  ],
  family_marriage_growth: [
    {
      title: 'Schedule a weekly marriage meeting — review the week, express gratitude, plan ahead together',
      priority: 'high', tags: ['marriage', 'planning'],
      description: 'A structured weekly sit-down prevents small issues from becoming major conflicts. This meeting is your shared command centre — a time to express appreciation, surface concerns early, coordinate schedules, and make joint decisions. Consistency here builds the shura (consultation) that Islam expects between spouses.',
      subtasks: [
        { title: 'Pick a fixed weekly slot — same day, same time — and protect it', done: false },
        { title: 'Create a simple agenda template: gratitude, concerns, logistics, du\'a together', done: false },
        { title: 'Each spouse shares at least two things they appreciated about the other that week', done: false },
        { title: 'End each meeting with a shared du\'a for barakah in your marriage', done: false },
      ],
    },
    {
      title: 'Read a book on Islamic marriage together — e.g., "Like a Garment" by Yasir Qadhi',
      priority: 'medium', tags: ['study', 'marriage'],
      description: 'Shared learning strengthens the intellectual and spiritual bond between spouses. Reading an Islamic marriage book together creates a common vocabulary for discussing sensitive topics — intimacy, conflict, finances — within a framework rooted in Quran and Sunnah rather than cultural assumptions.',
      subtasks: [
        { title: 'Choose a book together — "Like a Garment", "Blissful Marriage", or "Reclaim Your Heart"', done: false },
        { title: 'Set a reading pace — one chapter per week is sustainable', done: false },
        { title: 'Discuss each chapter together, noting what resonated and what challenged you', done: false },
        { title: 'Identify at least one actionable change per chapter and implement it', done: false },
        { title: 'After completing the book, choose the next one to continue the habit', done: false },
      ],
    },
    {
      title: 'Learn and practise conflict resolution from the Sunnah — no contempt, no stonewalling, always reconcile before sleep',
      priority: 'high', tags: ['marriage', 'adab'],
      description: 'The Prophet (peace be upon him) modelled patience, restraint, and reconciliation in marital disagreements. Contempt, stonewalling, and harboured resentment are among the greatest destroyers of marriage. Learning Sunnah-based conflict resolution means replacing ego with humility, anger with silence, and grudges with forgiveness.',
      subtasks: [
        { title: 'Study how the Prophet handled disagreements with his wives from authentic hadith', done: false },
        { title: 'Agree on a "conflict protocol" — e.g., take wudu, separate briefly, return to talk calmly', done: false },
        { title: 'Practise the rule: never go to sleep without making peace, even if the issue is unresolved', done: false },
        { title: 'Eliminate the "Four Horsemen" — criticism, contempt, defensiveness, stonewalling', done: false },
        { title: 'Role-play a past disagreement using the new protocol to build muscle memory', done: false },
      ],
    },
    {
      title: 'Identify and speak each other\'s love language — express appreciation in ways your spouse receives it',
      priority: 'medium', tags: ['marriage', 'connection'],
      description: 'People give and receive love differently — through words, service, gifts, time, or touch. Understanding your spouse\'s primary love language means your efforts land where they matter most, preventing the common frustration of "I do so much but they never notice." The Prophet expressed love in all five languages across his marriages.',
      subtasks: [
        { title: 'Both spouses take a love language assessment or discuss which expressions mean most to them', done: false },
        { title: 'Identify your spouse\'s top two love languages and your own', done: false },
        { title: 'Commit to one intentional act per day in your spouse\'s primary love language', done: false },
        { title: 'After two weeks, check in — ask if your spouse feels more appreciated', done: false },
      ],
    },
  ],
  family_marriage_excellence: [
    {
      title: 'Undertake a joint spiritual project — Quran khatm together, Umrah, or a shared community service',
      priority: 'medium', tags: ['marriage', 'spirituality'],
      description: 'The strongest marriages are built on a shared relationship with Allah. A joint spiritual project — completing the Quran together, performing Umrah, or serving the community side by side — elevates the marriage from a domestic arrangement to a partnership in akhirah. It creates memories and bonds that dunya-focused activities cannot match.',
      subtasks: [
        { title: 'Discuss and agree on a joint spiritual goal — Quran khatm, Umrah, or service project', done: false },
        { title: 'Set a realistic timeline and break the goal into weekly milestones', done: false },
        { title: 'Schedule regular joint sessions — reading together, planning together, serving together', done: false },
        { title: 'Document the journey — journal entries, photos, reflections — as a shared memory', done: false },
        { title: 'Upon completion, celebrate together and choose the next joint project', done: false },
      ],
    },
    {
      title: 'Write a marriage vision statement — your shared values, goals, and legacy as a couple',
      priority: 'low', tags: ['marriage', 'legacy'],
      description: 'A marriage vision statement is a written declaration of who you are as a couple, what you stand for, and what you are building together for the sake of Allah. It serves as a compass during difficult seasons and a reminder of your shared covenant. The best marriages are intentional, not accidental.',
      subtasks: [
        { title: 'Each spouse independently writes down their top 5 values and life goals', done: false },
        { title: 'Come together and identify overlapping values and complementary goals', done: false },
        { title: 'Draft a 1-page vision statement covering faith, family, legacy, and service', done: false },
        { title: 'Review and refine the statement together until both spouses feel represented', done: false },
        { title: 'Display the vision statement in your home and revisit it annually', done: false },
      ],
    },
    {
      title: 'Mentor an engaged or newly married couple through premarital or early marital guidance',
      priority: 'low', tags: ['marriage', 'dawah'],
      description: 'Once you have built a strong marriage, sharing that wisdom is sadaqah jariyah. Many young Muslims enter marriage with unrealistic expectations shaped by culture or social media. Mentoring a couple through their early years — sharing honest lessons, pitfalls, and prophetic principles — can save a marriage before it fractures.',
      subtasks: [
        { title: 'Identify a couple in your community who is engaged or recently married', done: false },
        { title: 'Offer mentorship — frame it as companionship, not lecturing', done: false },
        { title: 'Meet regularly (biweekly or monthly) to discuss challenges and share experiences', done: false },
        { title: 'Share resources — books, courses, and scholars — that helped your own marriage', done: false },
      ],
    },
  ],

  // ── PARENTING & MENTORSHIP ──
  family_parenting_core: [
    {
      title: 'Ensure children have consistent halal provision — food, clothing, shelter, and safety',
      priority: 'urgent', tags: ['parenting', 'provision'],
      description: 'Providing for your children\'s material needs from halal sources is the baseline obligation of parenthood. The Prophet (peace be upon him) warned that every shepherd will be asked about their flock. Halal provision means not only earning lawfully but ensuring what enters your home — food, clothing, and environment — is pure and permissible.',
      subtasks: [
        { title: 'Audit your income sources to confirm all provision for children comes from halal earnings', done: false },
        { title: 'Ensure food in the home is consistently halal — check sourcing, ingredients, and preparation', done: false },
        { title: 'Verify clothing and shelter meet standards of dignity without extravagance or neglect', done: false },
        { title: 'Assess physical safety — childproofing, neighbourhood safety, supervision adequacy', done: false },
        { title: 'Create a monthly provision checklist to ensure nothing falls through the cracks', done: false },
      ],
    },
    {
      title: 'Establish daily Islamic bedtime routine — du\'a, Ayat al-Kursi, and a brief story from seerah',
      priority: 'high', tags: ['parenting', 'tarbiyah'],
      description: 'The last moments before sleep are powerful for imprinting faith into a child\'s heart. A consistent bedtime routine that includes prophetic supplications, Ayat al-Kursi, and a story from the life of the Prophet or the Sahabah builds spiritual security and a love for Islam that no weekend class alone can achieve.',
      subtasks: [
        { title: 'Print or display the sleeping du\'as and Ayat al-Kursi near each child\'s bed', done: false },
        { title: 'Build a library of age-appropriate seerah stories — start with 10 favourites', done: false },
        { title: 'Establish a fixed bedtime that allows 10-15 minutes for the routine without rushing', done: false },
        { title: 'Rotate between parents so both build this connection with the children', done: false },
        { title: 'Track consistency for 30 days to solidify the habit', done: false },
      ],
    },
    {
      title: 'Teach children the six pillars of Iman and five pillars of Islam at age-appropriate levels',
      priority: 'high', tags: ['tarbiyah', 'aqidah'],
      description: 'Every Muslim child must understand what they believe (aqidah) and what they practise (ibadah) before they reach the age of responsibility. Teaching the six pillars of Iman and five pillars of Islam is the non-negotiable foundation of tarbiyah — without it, all other parenting efforts lack a centre of gravity.',
      subtasks: [
        { title: 'Assess each child\'s current understanding of Iman and Islam basics', done: false },
        { title: 'For ages 3-6: use visual aids, songs, and stories to introduce each pillar', done: false },
        { title: 'For ages 7-10: teach definitions, evidence from Quran/Sunnah, and practical application', done: false },
        { title: 'For ages 11+: introduce deeper concepts — qadr, conditions of shahada, fiqh of salah', done: false },
        { title: 'Quiz gently and regularly — make it conversational, not exam-like', done: false },
      ],
    },
    {
      title: 'Model the character (akhlaq) you want your children to inherit — they observe everything',
      priority: 'urgent', tags: ['parenting', 'character'],
      description: 'Children absorb character through observation far more than instruction. If you want them to be honest, they must see you being honest. If you want them to be generous, they must watch you give. This task is a call to self-accountability — your children are your mirror, and their behaviour will reflect what you model daily.',
      subtasks: [
        { title: 'Identify the top 5 character traits you want your children to embody', done: false },
        { title: 'Honestly assess whether you consistently model each of those traits', done: false },
        { title: 'Choose one trait to intentionally strengthen in yourself this month', done: false },
        { title: 'Narrate your actions to children when appropriate — "I\'m returning this because honesty matters"', done: false },
        { title: 'Ask your spouse for honest feedback on what your children are learning from your behaviour', done: false },
      ],
    },
    {
      title: 'Set clear, consistent, and compassionate household boundaries and expectations',
      priority: 'high', tags: ['parenting', 'discipline'],
      description: 'Children thrive with structure. Clear boundaries — communicated with love and enforced with consistency — provide the safety children need to grow. The prophetic model of discipline is firm but never cruel, corrective but never humiliating. Without boundaries, children feel anxious; with harsh boundaries, they feel resentful.',
      subtasks: [
        { title: 'Define 5-7 non-negotiable household rules (e.g., no lying, respectful speech, salah on time)', done: false },
        { title: 'Communicate these rules clearly to all children in a family meeting', done: false },
        { title: 'Agree with your spouse on consequences — consistent, proportional, and never physical', done: false },
        { title: 'Post the rules visibly in the home as a shared family commitment', done: false },
        { title: 'Review and adjust boundaries every 6 months as children mature', done: false },
      ],
    },
  ],
  family_parenting_growth: [
    {
      title: 'Implement a structured Quran and Islamic studies schedule for each child',
      priority: 'high', tags: ['tarbiyah', 'quran'],
      description: 'Ad hoc Quran learning produces ad hoc results. A structured schedule — with clear goals for memorisation, recitation (tajwid), and understanding (tafsir) — ensures steady progress and builds a lifelong relationship with the Book of Allah. This is the single most important educational investment a Muslim parent can make.',
      subtasks: [
        { title: 'Assess each child\'s current Quran level — reading, memorisation, and tajwid proficiency', done: false },
        { title: 'Set age-appropriate goals — e.g., Juz Amma by age 7, 5 juz by age 10', done: false },
        { title: 'Schedule daily Quran time — minimum 15 minutes, ideally after Fajr or before Maghrib', done: false },
        { title: 'Enrol in a qualified Quran teacher or online programme if self-teaching is insufficient', done: false },
        { title: 'Track progress weekly and celebrate milestones with meaningful rewards', done: false },
      ],
    },
    {
      title: 'Learn an Islamic parenting framework — study Ibn al-Qayyim\'s "Tuhfat al-Mawdud" or equivalent',
      priority: 'medium', tags: ['study', 'parenting'],
      description: 'Parenting without a framework is parenting by reaction. Classical Islamic scholars like Ibn al-Qayyim wrote extensively on child-rearing — from the rights of the child before birth to their education, discipline, and preparation for adulthood. Studying a structured framework replaces guesswork with wisdom rooted in revelation.',
      subtasks: [
        { title: 'Choose a primary text — "Tuhfat al-Mawdud", "Child Education in Islam", or a modern equivalent', done: false },
        { title: 'Read one chapter per week and take notes on applicable principles', done: false },
        { title: 'Discuss key takeaways with your spouse after each chapter', done: false },
        { title: 'Identify 3 principles from the book and implement them in your parenting this month', done: false },
      ],
    },
    {
      title: 'Hold weekly one-on-one "mentorship time" with each child — listen deeply, guide gently',
      priority: 'high', tags: ['parenting', 'mentorship'],
      description: 'Every child needs to feel individually seen and valued — not just as part of the family unit. A weekly one-on-one session where you listen more than you speak builds trust that pays dividends during adolescence when children choose whom to confide in. The Prophet gave individual attention to each of his companions; your children deserve the same.',
      subtasks: [
        { title: 'Block 20-30 minutes per week for each child — uninterrupted and undivided', done: false },
        { title: 'Let the child choose the activity — walk, game, cooking, or just talking', done: false },
        { title: 'Ask open-ended questions: "What made you happy this week? What worried you?"', done: false },
        { title: 'Resist the urge to lecture — listen, validate, then gently guide only if needed', done: false },
        { title: 'Keep a private journal noting each child\'s concerns, growth, and emerging interests', done: false },
      ],
    },
    {
      title: 'Teach practical life skills — cooking, budgeting, household responsibility — alongside Islamic values',
      priority: 'medium', tags: ['parenting', 'life-skills'],
      description: 'A child who memorises Quran but cannot cook, clean, or manage money is not fully prepared for life. Islam honours practical competence — the Prophet mended his own shoes, sewed his clothes, and served his family. Teaching life skills within an Islamic framework means connecting every skill to a value: cooking is generosity, cleaning is taharah, budgeting is amanah.',
      subtasks: [
        { title: 'List age-appropriate life skills for each child — cooking, laundry, basic budgeting, etc.', done: false },
        { title: 'Assign one new skill per month and teach it hands-on alongside your child', done: false },
        { title: 'Connect each skill to an Islamic value — e.g., "We clean because Allah loves cleanliness"', done: false },
        { title: 'Give children real responsibility — a weekly chore, a small budget to manage, a meal to plan', done: false },
        { title: 'Praise effort and improvement, not perfection — build confidence through competence', done: false },
      ],
    },
  ],
  family_parenting_excellence: [
    {
      title: 'Design a personalised tarbiyah plan for each child based on their temperament and gifts',
      priority: 'medium', tags: ['tarbiyah', 'planning'],
      description: 'No two children are alike, and cookie-cutter tarbiyah produces mediocre results. A personalised plan considers each child\'s unique temperament, learning style, strengths, and struggles — then maps a development path that nurtures their God-given gifts while addressing their specific weaknesses. This is the pinnacle of intentional Islamic parenting.',
      subtasks: [
        { title: 'Observe and document each child\'s temperament — introverted/extroverted, analytical/creative, etc.', done: false },
        { title: 'Identify each child\'s top 3 strengths and 2-3 areas needing growth', done: false },
        { title: 'Map spiritual goals (Quran, salah, character) to their individual pace and capacity', done: false },
        { title: 'Map academic and life-skill goals that align with their natural gifts', done: false },
        { title: 'Write a 1-page tarbiyah plan per child and review it with your spouse quarterly', done: false },
      ],
    },
    {
      title: 'Facilitate your child\'s first experience of service — volunteering, charity, or community contribution',
      priority: 'medium', tags: ['parenting', 'community'],
      description: 'Service transforms a child from a consumer into a contributor. When a child serves food at a shelter, visits the elderly, or donates their own money, they experience the joy of giving that no lecture can teach. This plants the seed of ummah-consciousness and fulfils the prophetic command to be beneficial to others.',
      subtasks: [
        { title: 'Identify age-appropriate service opportunities — mosque clean-up, food bank, elderly visits', done: false },
        { title: 'Involve the child in choosing the project so they feel ownership', done: false },
        { title: 'Participate alongside them — service is modelled, not delegated', done: false },
        { title: 'Debrief afterwards: "How did it feel? What did you learn? Why does Allah love those who serve?"', done: false },
        { title: 'Make service a regular family activity — monthly or quarterly', done: false },
      ],
    },
    {
      title: 'Write letters to each child recording your du\'as, hopes, and wisdom for them to read when older',
      priority: 'low', tags: ['parenting', 'legacy'],
      description: 'A handwritten letter from a parent is one of the most powerful legacies you can leave. Recording your du\'as, your hopes, the lessons you have learned, and the wisdom you want them to carry — this becomes a treasure they will read during their own trials. Luqman\'s advice to his son was preserved in the Quran; your advice deserves to be preserved for your children.',
      subtasks: [
        { title: 'Set aside one evening to write a letter to each child — handwritten if possible', done: false },
        { title: 'Include specific du\'as you make for them by name', done: false },
        { title: 'Share lessons from your own life — mistakes, turning points, moments of gratitude', done: false },
        { title: 'Express what you admire about them specifically — not generic praise', done: false },
        { title: 'Store the letters safely and plan to give them at a milestone — graduation, marriage, or parenthood', done: false },
      ],
    },
  ],

  // ── EXTENDED FAMILY (KINSHIP) ──
  family_kinship_core: [
    {
      title: 'Make contact with parents and close relatives at least once per week — call, visit, or message',
      priority: 'urgent', tags: ['silat-al-rahim', 'parents'],
      description: 'Silat al-rahim (maintaining family ties) is a fundamental obligation in Islam. The Prophet (peace be upon him) said that the one who severs family ties will not enter Paradise. Weekly contact with parents and close relatives is the minimum — not the ideal — to keep the bonds of kinship alive and fulfil your duty before Allah.',
      subtasks: [
        { title: 'List all close relatives (parents, siblings, grandparents) and their preferred contact method', done: false },
        { title: 'Set a weekly recurring reminder to contact parents — call is better than text', done: false },
        { title: 'Rotate through other close relatives so none go more than 2-3 weeks without contact', done: false },
        { title: 'During each call, ask about their health, needs, and well-being — listen attentively', done: false },
        { title: 'Visit in person at least once per month if geographically possible', done: false },
      ],
    },
    {
      title: 'Identify any severed family ties (qat al-rahim) and take the first step to reconcile',
      priority: 'urgent', tags: ['silat-al-rahim', 'reconciliation'],
      description: 'Severed family ties are among the gravest sins in Islam — Allah curses the one who cuts them (Surah Muhammad 47:22-23). This task requires honest examination of your family relationships to identify any broken connections, then taking the courageous first step toward reconciliation regardless of who was at fault.',
      subtasks: [
        { title: 'List all relatives you have not spoken to in 6+ months — identify why', done: false },
        { title: 'Distinguish between genuine estrangement and simple neglect', done: false },
        { title: 'For each severed tie, determine the minimum step to reconnect — a message, a call, a visit', done: false },
        { title: 'Take the first step this week — even if you were the wronged party, you earn the greater reward', done: false },
        { title: 'If reconciliation requires mediation, identify a trusted elder or imam to facilitate', done: false },
      ],
    },
    {
      title: 'Learn the Islamic rulings on silat al-rahim — rights of parents, relatives, and in-laws',
      priority: 'high', tags: ['fiqh', 'silat-al-rahim'],
      description: 'Many Muslims practise kinship ties based on culture rather than knowledge. Understanding the fiqh of silat al-rahim clarifies what is obligatory versus recommended, who has the strongest claim on your time, and how to navigate difficult family dynamics without sin. Knowledge transforms duty from burden into worship.',
      subtasks: [
        { title: 'Study the Quranic verses on parents\' rights — Surah Al-Isra 17:23-24 and Surah Luqman 31:14-15', done: false },
        { title: 'Study hadith on silat al-rahim and the consequences of severing ties', done: false },
        { title: 'Learn the scholars\' ranking of relatives by right — parents first, then closest kin outward', done: false },
        { title: 'Understand the rulings on maintaining ties with non-Muslim relatives', done: false },
        { title: 'Clarify the boundary between maintaining ties and tolerating abuse — consult a scholar if needed', done: false },
      ],
    },
    {
      title: 'Fulfil obligations to parents — obedience, service, and du\'a for them (in life and after death)',
      priority: 'urgent', tags: ['parents', 'birr-al-walidayn'],
      description: 'Birr al-walidayn (honouring parents) is the second most emphasised obligation in the Quran after tawhid. This encompasses obedience in all that is halal, physical and financial service when they need it, gentle speech even when they frustrate you, and continuous du\'a for them — especially after they pass away. There is no retirement from this duty.',
      subtasks: [
        { title: 'Assess your current level of service to each parent — are you doing enough?', done: false },
        { title: 'If parents are elderly, identify their specific daily needs and how you can help', done: false },
        { title: 'Add du\'a for your parents to your daily adhkar — "Rabbir-hamhuma kama rabbayanee sagheera"', done: false },
        { title: 'If parents have passed, increase sadaqah, du\'a, and Hajj/Umrah on their behalf', done: false },
        { title: 'Never raise your voice to them — even if they are wrong, respond with gentleness', done: false },
      ],
    },
    {
      title: 'Attend family occasions — births, weddings, illnesses, and funerals — as a duty of kinship',
      priority: 'high', tags: ['silat-al-rahim', 'community'],
      description: 'Being present for family milestones — joyful and painful alike — is how kinship bonds are maintained in practice. The Prophet (peace be upon him) identified visiting the sick, attending funerals, and accepting invitations as rights that Muslims owe one another. Your physical presence during these moments says what no phone call can.',
      subtasks: [
        { title: 'Keep a family events calendar — birthdays, anniversaries, and important dates', done: false },
        { title: 'Prioritise attendance at weddings, aqiqah celebrations, and funeral prayers', done: false },
        { title: 'When a relative falls ill, visit promptly and ask how you can help practically', done: false },
        { title: 'If distance prevents attendance, send a meaningful gift or heartfelt message the same day', done: false },
      ],
    },
  ],
  family_kinship_growth: [
    {
      title: 'Organise a regular family gathering — monthly meal, annual trip, or online meeting',
      priority: 'medium', tags: ['family', 'connection'],
      description: 'Family ties weaken without structure. Organising regular gatherings — whether a monthly dinner, a quarterly get-together, or an annual family trip — creates shared memories and rituals that bind generations together. Someone must take the initiative to gather the family; let it be you.',
      subtasks: [
        { title: 'Survey family members on preferred frequency and format — meal, outing, or video call', done: false },
        { title: 'Set a recurring date and take ownership of coordination', done: false },
        { title: 'Rotate hosting duties so no single household bears the full burden', done: false },
        { title: 'Include an Islamic element — a short reminder, du\'a, or Quran recitation — in each gathering', done: false },
        { title: 'Create a family group chat or shared calendar to maintain momentum', done: false },
      ],
    },
    {
      title: 'Establish a family support fund or informal network for relatives facing hardship',
      priority: 'medium', tags: ['sadaqah', 'family'],
      description: 'The Prophet (peace be upon him) said that charity given to a relative is both sadaqah and silat al-rahim — a double reward. Establishing a family support fund or network ensures that when hardship strikes — job loss, medical emergency, or debt — the family responds collectively rather than leaving the burden on one person.',
      subtasks: [
        { title: 'Identify relatives who may be facing financial hardship — discreetly and respectfully', done: false },
        { title: 'Propose a monthly family fund to trusted family members — even small contributions add up', done: false },
        { title: 'Set clear, fair guidelines for disbursement — who qualifies, how to request, who decides', done: false },
        { title: 'If a formal fund is not feasible, create an informal network of who can help with what', done: false },
      ],
    },
    {
      title: 'Learn the history of your lineage — document names, stories, and origins at least 3 generations back',
      priority: 'low', tags: ['family', 'heritage'],
      description: 'The Prophet (peace be upon him) said, "Learn your lineage to maintain your family ties." Knowing where you come from — the names, stories, sacrifices, and migrations of your ancestors — gives you a sense of identity and gratitude. This knowledge is perishable; if you do not record it now, it dies with the generation that holds it.',
      subtasks: [
        { title: 'Interview the oldest living relatives — record their stories on audio or video', done: false },
        { title: 'Document names, dates, and locations for at least 3 generations on each side', done: false },
        { title: 'Create a family tree — digital or physical — and share it with the family', done: false },
        { title: 'Record migration stories, hardships, and moments of divine provision (tawfiq)', done: false },
        { title: 'Preserve old photographs, letters, and documents in a family archive', done: false },
      ],
    },
    {
      title: 'Be proactively generous with in-laws — treat them with the same care as your own parents',
      priority: 'high', tags: ['in-laws', 'adab'],
      description: 'In-law relationships are among the most common sources of family friction. Islam calls for ihsan (excellence) toward all relatives by marriage. Treating your in-laws with the same warmth, respect, and generosity you give your own family heals one of the most common wounds in Muslim households and earns the love of your spouse.',
      subtasks: [
        { title: 'Initiate regular contact with in-laws independently — not only through your spouse', done: false },
        { title: 'Give gifts on occasions — Eid, birthdays, or just because — without being asked', done: false },
        { title: 'Speak well of your in-laws to your spouse and children — never poison the relationship', done: false },
        { title: 'When conflict arises, address it privately and respectfully — never through your spouse as proxy', done: false },
      ],
    },
  ],
  family_kinship_excellence: [
    {
      title: 'Document your family\'s history, values, and legacy in a written or digital archive',
      priority: 'low', tags: ['heritage', 'legacy'],
      description: 'A family archive is a gift to future generations. It preserves not just names and dates but the values, principles, and lessons that define your lineage. When your great-grandchildren ask, "Who were we?", this archive answers with substance — not just statistics but stories of faith, resilience, and purpose.',
      subtasks: [
        { title: 'Compile all existing family history materials — photos, documents, interview recordings', done: false },
        { title: 'Write a family values statement — the principles your lineage has upheld across generations', done: false },
        { title: 'Create a digital archive — organised folder, website, or shared drive — accessible to all family', done: false },
        { title: 'Include a section on Islamic heritage — how faith shaped your family\'s decisions and migrations', done: false },
        { title: 'Designate a family historian to maintain and update the archive over time', done: false },
      ],
    },
    {
      title: 'Establish a family waqf or ongoing sadaqah jariyah dedicated to the lineage',
      priority: 'low', tags: ['waqf', 'sadaqah-jariyah'],
      description: 'A family waqf is an endowment whose benefits flow perpetually to your descendants and the ummah. This is the highest form of family legacy — wealth that serves the living and earns reward for the deceased. Whether it is a scholarship fund, a water well, or a share in a mosque, a family waqf ties your lineage to ongoing good for generations.',
      subtasks: [
        { title: 'Research waqf structures — consult a scholar and a lawyer familiar with Islamic endowments', done: false },
        { title: 'Determine the scope — education, healthcare, mosque, or community development', done: false },
        { title: 'Calculate an initial contribution and invite family members to co-invest', done: false },
        { title: 'Draft a waqf deed that specifies beneficiaries, governance, and succession of trustees', done: false },
        { title: 'Dedicate the waqf to deceased family members so they benefit from the ongoing reward', done: false },
        { title: 'Establish a governance structure to ensure the waqf is maintained beyond your lifetime', done: false },
      ],
    },
    {
      title: 'Take on the role of family elder or coordinator — be the one who keeps the family united',
      priority: 'medium', tags: ['leadership', 'family'],
      description: 'Every extended family needs someone who takes responsibility for its unity — the person who organises gatherings, mediates disputes, checks on the forgotten relatives, and ensures no one is left behind. This is a role of quiet leadership and immense reward. The Prophet said the one who maintains ties even when others sever them is the true keeper of kinship.',
      subtasks: [
        { title: 'Accept the responsibility consciously — decide that family unity is your personal mission', done: false },
        { title: 'Create a system for regular check-ins with all branches of the family', done: false },
        { title: 'Mediate conflicts with wisdom, fairness, and patience — never take sides publicly', done: false },
        { title: 'Organise annual family events that bring all branches together', done: false },
        { title: 'Mentor younger family members to eventually share or take over this role', done: false },
      ],
    },
  ],

  // ── HOME ENVIRONMENT ──
  family_home_core: [
    {
      title: 'Establish the home as a place of prayer — designate a clean prayer space with qibla direction',
      priority: 'urgent', tags: ['home', 'salah'],
      description: 'The Prophet (peace be upon him) encouraged praying voluntary prayers at home, saying, "Do not make your houses into graveyards." A designated prayer space — clean, oriented toward the qibla, and free from distractions — transforms the home from a mere dwelling into a place of worship. This is the spiritual anchor of the household.',
      subtasks: [
        { title: 'Identify the qibla direction in your home using a reliable compass or app', done: false },
        { title: 'Designate a clean, quiet corner or room as the household prayer area', done: false },
        { title: 'Place clean prayer mats, a Quran stand, and a small shelf with du\'a books', done: false },
        { title: 'Mark the qibla direction visibly so guests and children can pray correctly', done: false },
        { title: 'Ensure the space stays clean and uncluttered — treat it as a sacred area of the home', done: false },
      ],
    },
    {
      title: 'Remove all haram objects and content from the home — images of animate beings (on walls), music players, alcohol',
      priority: 'urgent', tags: ['home', 'halal'],
      description: 'The angels do not enter a house that contains images of animate beings (hung on walls), dogs kept without necessity, or haram items. Purifying the home environment is not cultural conservatism — it is a prerequisite for barakah. This task requires a thorough audit of every room to ensure the home is a space where mercy descends.',
      subtasks: [
        { title: 'Walk through every room and identify any haram or doubtful items', done: false },
        { title: 'Remove wall art depicting animate beings — replace with calligraphy or nature imagery', done: false },
        { title: 'Dispose of any alcohol, haram food items, or impermissible substances', done: false },
        { title: 'Audit media subscriptions and devices for haram content — remove access', done: false },
        { title: 'Replace removed items with halal alternatives so the home feels enriched, not emptied', done: false },
      ],
    },
    {
      title: 'Ensure the home is clean, organised, and maintained as a dignified space',
      priority: 'high', tags: ['home', 'cleanliness'],
      description: 'Islam elevates cleanliness to half of faith (shattr al-iman). A clean, organised home reflects inner discipline and honours the ni\'mah (blessing) of shelter. Clutter and filth breed anxiety, waste time, and diminish the dignity of the household. Maintaining order is an act of gratitude and a practical expression of taqwa.',
      subtasks: [
        { title: 'Establish a daily cleaning routine — 15 minutes of tidying, dishes, and surface cleaning', done: false },
        { title: 'Declutter one room per week until the entire home is simplified', done: false },
        { title: 'Assign age-appropriate cleaning tasks to each family member', done: false },
        { title: 'Deep clean the entire home monthly — bathrooms, kitchen, and storage areas', done: false },
        { title: 'Maintain an "everything has a place" system so tidying is fast and effortless', done: false },
      ],
    },
    {
      title: 'Begin and end each day in the home with Islamic adhkar — morning/evening supplications',
      priority: 'high', tags: ['home', 'adhkar'],
      description: 'The morning and evening adhkar are a shield for the household — protection from harm, a source of barakah, and a daily reset of the family\'s spiritual compass. When parents recite adhkar audibly, children absorb them naturally. A home filled with dhikr is a home under Allah\'s protection.',
      subtasks: [
        { title: 'Print or display the morning and evening adhkar in a common area of the home', done: false },
        { title: 'Set a consistent time for family adhkar — after Fajr and after Asr or Maghrib', done: false },
        { title: 'Start with the essentials — Ayat al-Kursi, Al-Mu\'awwidhat, and the core morning/evening du\'as', done: false },
        { title: 'Recite audibly so children hear and learn through repetition', done: false },
        { title: 'Use an adhkar app or book to track consistency for the first 40 days', done: false },
      ],
    },
    {
      title: 'Establish household rules — screen time limits, guest etiquette, and shared responsibilities',
      priority: 'medium', tags: ['home', 'discipline'],
      description: 'A well-run household operates on shared agreements, not constant policing. Establishing clear rules around screen time, guest protocols, chores, and conduct reduces daily friction and teaches children that a Muslim home has order, purpose, and adab. Rules are not restrictions — they are the structure within which freedom flourishes.',
      subtasks: [
        { title: 'Draft household rules as a family — involve children in the discussion so they have buy-in', done: false },
        { title: 'Set specific screen time limits by age and enforce them with device controls', done: false },
        { title: 'Define guest etiquette — how the family welcomes, hosts, and farewells visitors', done: false },
        { title: 'Assign shared responsibilities — a visible chore chart that rotates weekly', done: false },
        { title: 'Review and update the household rules every 6 months in a family meeting', done: false },
      ],
    },
  ],
  family_home_growth: [
    {
      title: 'Curate the home aesthetic — add calligraphy, remove distracting decor, create a peaceful atmosphere',
      priority: 'medium', tags: ['home', 'environment'],
      description: 'Your home\'s atmosphere shapes your family\'s emotional and spiritual state. A home filled with Islamic calligraphy, natural light, plants, and minimal clutter creates sakeenah (tranquillity) — the very quality Allah places in the hearts of believers. Intentional curation of your space is an act of design in service of worship.',
      subtasks: [
        { title: 'Remove or replace distracting, cluttered, or un-Islamic decor from common areas', done: false },
        { title: 'Add Islamic calligraphy — select ayat that resonate with your family\'s values', done: false },
        { title: 'Introduce natural elements — plants, natural light, wood textures — for warmth and calm', done: false },
        { title: 'Minimise visual noise — fewer items, neutral tones, intentional placement', done: false },
        { title: 'Ask each family member what makes a room feel peaceful and incorporate their input', done: false },
      ],
    },
    {
      title: 'Establish a family media policy — approved content only, devices out of bedrooms at night',
      priority: 'high', tags: ['home', 'protection'],
      description: 'Unrestricted media access is the single greatest threat to a Muslim home\'s spiritual integrity. A clear media policy — defining what content is permitted, where devices are used, and when screens are off — protects children from haram, preserves family connection, and reclaims time for worship, learning, and play.',
      subtasks: [
        { title: 'Audit all devices in the home — phones, tablets, laptops, smart TVs — and who has access', done: false },
        { title: 'Install parental controls and content filters on all children\'s devices', done: false },
        { title: 'Establish a device curfew — all screens off and charged outside bedrooms by a set time', done: false },
        { title: 'Create a family-approved content list — shows, channels, and apps that are halal and beneficial', done: false },
        { title: 'Model the policy yourself — children will not respect rules parents do not follow', done: false },
      ],
    },
    {
      title: 'Create a dedicated home learning space — books, Quran, and educational resources accessible to all',
      priority: 'medium', tags: ['home', 'learning'],
      description: 'A home with a visible, accessible learning space sends a powerful message: this family values knowledge. A dedicated area with Quran copies, Islamic books, reference materials, and age-appropriate educational resources makes learning the default activity — not an afterthought buried behind screens and entertainment.',
      subtasks: [
        { title: 'Designate a corner, shelf, or room as the household learning space', done: false },
        { title: 'Stock it with Quran copies, tafsir, hadith collections, and Islamic children\'s books', done: false },
        { title: 'Add general educational resources — atlas, dictionary, science books, art supplies', done: false },
        { title: 'Make it comfortable — good lighting, a small desk or floor cushions, minimal distractions', done: false },
        { title: 'Rotate featured books monthly and discuss what the family is reading', done: false },
      ],
    },
    {
      title: 'Host a monthly gathering for friends, neighbours, or community — practise the Sunnah of hospitality',
      priority: 'medium', tags: ['home', 'hospitality'],
      description: 'Hospitality (diyafah) is a prophetic practice and a right of the neighbour in Islam. Hosting regular gatherings transforms your home from a private fortress into a community asset. It strengthens social bonds, provides dawah opportunities, and teaches children the adab of welcoming guests — a fading skill in the age of isolation.',
      subtasks: [
        { title: 'Choose a monthly date and format — dinner, dessert, or tea and conversation', done: false },
        { title: 'Invite a mix of friends, neighbours, and new community members each time', done: false },
        { title: 'Prepare food generously — the Sunnah is to cook extra, not to calculate portions exactly', done: false },
        { title: 'Include children in hosting duties — greeting guests, serving food, cleaning up', done: false },
        { title: 'Add a brief beneficial element — a short reminder, a Quran recitation, or a meaningful conversation starter', done: false },
      ],
    },
  ],
  family_home_excellence: [
    {
      title: 'Transform the home into a community hub — regular halaqah, iftar gatherings, or skills workshops',
      priority: 'low', tags: ['home', 'community'],
      description: 'The homes of the Sahabah were centres of learning, worship, and community support. Transforming your home into a community hub — hosting regular halaqat, iftar gatherings, parenting circles, or skills workshops — elevates your household from a place of private comfort to a source of communal benefit and ongoing reward.',
      subtasks: [
        { title: 'Identify a recurring programme — weekly halaqah, monthly iftar, or quarterly workshop', done: false },
        { title: 'Partner with a knowledgeable person — imam, teacher, or skilled community member — to lead sessions', done: false },
        { title: 'Set up the space to accommodate groups comfortably — seating, audio, and refreshments', done: false },
        { title: 'Promote the programme through your mosque, community group, or social circle', done: false },
        { title: 'Involve your family in planning and hosting so it becomes a shared family mission', done: false },
      ],
    },
    {
      title: 'Design a home environment intentionally — every room serves a purposeful, value-aligned function',
      priority: 'low', tags: ['home', 'design'],
      description: 'An intentionally designed home is not about luxury — it is about alignment. Every room should serve a clear purpose that supports your family\'s values: worship, learning, rest, connection, or hospitality. When spaces are designed with intention, the home itself becomes a tool for tarbiyah and a reflection of your family\'s priorities.',
      subtasks: [
        { title: 'Walk through each room and define its primary purpose — prayer, study, rest, gathering, etc.', done: false },
        { title: 'Remove anything that contradicts the room\'s purpose — e.g., no screens in the prayer space', done: false },
        { title: 'Optimise each room for its function — lighting, furniture placement, accessibility', done: false },
        { title: 'Create a "home design principles" document — the values each space should embody', done: false },
        { title: 'Revisit the design annually as your family\'s needs evolve', done: false },
      ],
    },
    {
      title: 'Document a "Home Charter" — written values, routines, and vision for what your household stands for',
      priority: 'low', tags: ['home', 'legacy'],
      description: 'A Home Charter is a written constitution for your household — a document that articulates what your family stands for, how you live together, and what kind of home you are building for the sake of Allah. It serves as an anchor during chaotic seasons and a legacy document for your children to carry into their own homes one day.',
      subtasks: [
        { title: 'Gather the family and discuss: "What do we want our home to be known for?"', done: false },
        { title: 'Draft sections on core values, daily routines, hospitality standards, and media rules', done: false },
        { title: 'Include an Islamic mission statement — e.g., "This home is a sanctuary of iman, ilm, and ihsan"', done: false },
        { title: 'Have each family member sign or contribute a personal statement to the charter', done: false },
        { title: 'Display the charter prominently and revisit it at the start of each Islamic year', done: false },
        { title: 'Update it as children grow and family circumstances change', done: false },
      ],
    },
  ],
};
