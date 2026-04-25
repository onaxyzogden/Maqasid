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
        {
          tier: 'T3',
          amanahRationale: 'The provided source specifies the religious requirement of a guardian (wali) for a valid marriage, but offers no clear proof or logical inference regarding the modern administrative task of locating or obtaining a physical or digital nikah certificate.',
          title: 'Locate your original nikah certificate or obtain a copy from the officiant', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 1418a",
              translation: "The Prophet (peace be upon him) said: \"There is no marriage except with a wali (guardian).\" This establishes the requirement of a guardian in the marriage contract.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The nikah certificate is the primary legal and religious document proving your marriage is valid. Without it, you have no written record of the terms agreed upon — the mahr amount, the witnesses present, and the officiant's credentials. In cases of dispute, inheritance, or travel, this document is indispensable.


**How?**

1. Check your personal files, safe deposit box, or filing cabinet for the original certificate.
2. If you cannot locate it, contact the imam or officiant who performed the nikah and request a certified copy.
3. If the nikah was performed at a mosque, contact the mosque administration — they often keep records.
4. Store the certificate in a fireproof safe or secure digital backup (scanned PDF with encrypted cloud storage).
5. If no record exists at all, consult a scholar about whether a renewal or written attestation is needed.`,
        },
        {
          tier: 'T2',
          amanahRationale: 'While the provided texts explicitly mandate the presence and permission of a legitimate guardian (wali) for a valid marriage, they omit the specific jurisprudential hierarchies and verification steps, making the subtask a clear logical inference to ensure the marriage contract fulfills this foundational religious requirement.',
          title: 'Confirm the wali who represented the bride was a valid guardian per fiqh rulings', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 1418a",
              translation: "The Prophet (peace be upon him) said: \"There is no marriage except with a wali (guardian).\" The validity of the nikah depends on a legitimate guardian representing the bride. **II. Quran**",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 4:25",
              arabic: "فَانكِحُوهُنَّ بِإِذْنِ أَهْلِهِنَّ وَآتُوهُنَّ أُجُورَهُنَّ بِالْمَعْرُوفِ",
              translation: "So marry them with the permission of their people and give them their due compensation according to what is acceptable.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The wali (guardian) is a pillar of the nikah in the majority of scholarly opinions.

**How?**

1. Identify who served as the bride's wali during the nikah ceremony.
2. Confirm their relationship to the bride — the wali should be her father, grandfather, brother, or nearest male relative in the correct order per your madhab.
3. If the wali was a community imam acting as "wali al-hakim" (judge-guardian), verify that there was a legitimate reason (e.g., the bride had no accessible male relatives or they refused without valid cause).
4. Consult the fiqh rulings of your madhab on the order of guardianship priority.
5. If there is doubt about the wali's legitimacy, consult a qualified scholar to determine if the nikah needs to be renewed.`,
        },
        {
          tier: 'T2',
          amanahRationale: 'While the provided Hadith explicitly establishes the presence of two just witnesses as a pillar of a valid marriage, it omits specific modern administrative steps like checking a nikah certificate or contacting the officiant, making the subtask\'s directive to verify their presence a clear logical inference to ensure the contract\'s validity.',
          title: 'Verify that two adult Muslim male witnesses were present and attested', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sunan al-Tirmidhi 1101",
              translation: "The Prophet (peace be upon him) said: \"There is no marriage except with a wali and two just witnesses.\" Two adult Muslim male witnesses are a pillar of the valid nikah contract.",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Witnesses are a condition of validity for the nikah in the Hanafi, Shafi'i, and Hanbali schools. Their presence serves as public attestation that the marriage took place with proper consent. A nikah conducted in secret without witnesses may be considered invalid or severely deficient.


**How?**

1. Recall or check your nikah certificate for the names of the witnesses who signed.
2. Confirm that both witnesses were adult, sane Muslim males (this is the requirement in the majority opinion; some scholars accept one male and two female witnesses).
3. If you are unsure who the witnesses were, contact the officiant or attendees from the ceremony to verify.
4. If witnesses were not present or their eligibility is doubtful, consult a scholar — a renewal of the nikah with proper witnesses may be necessary.
5. Document the witnesses' full names and contact information for your personal records.`,
        },
        {
          tier: 'T2',
          amanahRationale: 'While the provided Quranic verses explicitly mandate the payment of the mahr as a binding obligation, they omit specific administrative steps like reviewing a nikah certificate or documenting the agreement, making the subtask a clear logical inference necessary to properly fulfill this divine command.',
          title: 'Confirm the mahr was clearly stated, agreed upon, and documented', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:4",
              arabic: "وَآتُوا النِّسَاءَ صَدُقَاتِهِنَّ نِحْلَةً",
              translation: "And give the women their mahr (bridal-money) as a free gift.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 4:24",
              arabic: "فَمَا اسْتَمْتَعْتُم بِهِ مِنْهُنَّ فَآتُوهُنَّ أُجُورَهُنَّ فَرِيضَةً",
              translation: "So for whatever you enjoy from them, give them their due compensation as an obligation.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The mahr is the bride's right given by Allah — it is not a negotiable cultural gift but a mandatory component of the nikah. Allah says in Surah An-Nisa (4:4), "And give the women their bridal gift graciously." A mahr that was vague, unstated, or never delivered represents an unfulfilled obligation that must be rectified.


**How?**

1. Review your nikah certificate for the mahr amount and terms (immediate vs. deferred).
2. Confirm with your spouse that the stated mahr matches what was mutually agreed upon.
3. If the mahr was deferred (mu'ajjal), document the outstanding amount clearly in writing.
4. If the mahr was never formally stated during the nikah, consult a scholar — a "mahr al-mithl" (equivalent mahr) may need to be determined based on the bride's social standing and local custom.
5. If any portion of the mahr remains unpaid, create a clear repayment plan and fulfil it promptly — this is a debt before Allah.`,
        },
        {
          tier: 'T1',
          amanahRationale: 'The provided Hadith explicitly states that consulting a qualified scholar to rectify any doubtful element of a marriage is an obligation, providing direct and clear proof for the core action of the subtask.',
          title: 'If any element is missing or doubtful, consult a qualified scholar to rectify', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:21",
              arabic: "وَكَيْفَ تَأْخُذُونَهُ وَقَدْ أَفْضَىٰ بَعْضُكُمْ إِلَىٰ بَعْضٍ وَأَخَذْنَ مِنكُم مِّيثَاقًا غَلِيظًا",
              translation: "And how could you take it back while you have gone in unto each other and they have taken from you a solemn covenant?",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 1418a",
              translation: "The Prophet (peace be upon him) said: \"There is no marriage except with a wali.\" When any element of the nikah is doubtful, consulting a qualified scholar to rectify it is an obligation.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Living in a marriage whose validity is uncertain is a serious matter in Islam — it affects the permissibility of intimacy, the legitimacy of children's lineage, and inheritance rights. Consulting a scholar is not an overreaction; it is the responsible course of action when the foundations of your nikah are in question.


**How?**

1. Compile your findings from the previous subtasks — note which elements are confirmed, which are doubtful, and which are missing.
2. Identify a qualified local scholar or mufti who is trained in family fiqh (preferably one familiar with your madhab).
3. Present the facts clearly and honestly — do not omit details out of embarrassment.
4. Follow the scholar's ruling — this may involve renewing the nikah, establishing a mahr, or simply obtaining written confirmation.
5. If a renewal is needed, treat it as an opportunity — invite close family, reaffirm your commitment, and start this chapter with certainty.`,
        },
      ],
    },
    {
      title: 'Establish daily check-ins with your spouse — minimum 10 minutes of undivided attention',
      priority: 'high', tags: ['marriage', 'connection'],
      description: 'The Prophet (peace be upon him) was attentive and present with his wives despite immense responsibilities. A daily check-in — free from screens and distractions — builds emotional safety, prevents resentment from accumulating, and keeps the marital bond alive through consistent small investments.',
      subtasks: [
        {
          tier: 'T2',
          amanahRationale: 'Although the provided sources emphasize the divine signs of tranquility and affection in marriage and command believers to be the best to their spouses, they omit specific modern practices like scheduling a daily time slot or setting phone reminders, making the subtask a practical logical inference to systematically nurture this intended marital bond.',
          title: 'Choose a consistent daily time slot that works for both spouses', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 30:21",
              arabic: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
              translation: "And of His signs is that He created for you from yourselves mates that you may find tranquillity in them, and He placed between you affection and mercy.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan al-Tirmidhi 3895",
              translation: "The Prophet (peace be upon him) said: \"The best of you is the one who is best to his wife, and I am the best of you to my wives.\" Choosing a consistent daily time for connection is an act of ihsan.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Consistency transforms intention into habit. If the check-in happens at a different time every day — or only when someone remembers — it will not survive the first busy week. Choosing a fixed slot signals to both spouses that this connection is a priority, not an afterthought.


**How?**

1. Sit together and review your daily schedules — identify natural transition points (after Fajr, after dinner, before bed).
2. Choose the slot where both spouses are least likely to be rushed or distracted.
3. Set a recurring reminder on both phones labelled "Marriage Check-In" at the agreed time.
4. Treat this time slot with the same respect you would give a work meeting — do not cancel without rescheduling.
5. If your schedules differ on weekends vs. weekdays, set two time slots and commit to both.`,
        },
        {
          tier: 'T2',
          amanahRationale: 'While the Quranic metaphor of spouses being a "garment" for one another beautifully illustrates emotional closeness and protection, it omits specific modern practices like silencing phones or managing child interruptions, making the subtask a practical logical inference to cultivate this intended intimate attention.',
          title: 'Set a ground rule: no phones, no children interruptions during check-in', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:187",
              arabic: "هُنَّ لِبَاسٌ لَّكُمْ وَأَنتُمْ لِبَاسٌ لَّهُنَّ",
              translation: "They are a garment for you and you are a garment for them. This metaphor of closeness and covering calls for undivided, intimate attention between spouses.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Undivided attention is the currency of emotional connection. A check-in where one spouse is scrolling their phone or repeatedly pausing to attend to children is worse than no check-in at all — it communicates that the other person is not worth full presence. The Prophet (peace be upon him) would turn his entire body to face the person he was speaking with.


**How?**

1. Agree together on the ground rules before starting the habit — both spouses must buy in.
2. Place phones on silent and face-down (or in another room) during the check-in.
3. If children are present, wait until they are settled (e.g., after bedtime) or designate a brief activity for them during this time.
4. If an interruption occurs, pause, handle it briefly, and explicitly return to the conversation rather than letting it dissolve.
5. Write the ground rules on a card and place it where you do the check-in as a visual reminder.`,
        },
        {
          tier: 'T2',
          amanahRationale: 'Although the provided sources emphasize finding tranquility in marriage and command believers to be the best to their families, they omit specific conversational structures, making the subtask\'s framework of sharing highlights, concerns, and gratitude a practical logical inference to systematically foster this intended affection and mercy.',
          title: 'Use a simple framework — share one highlight, one concern, one gratitude', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6029",
              translation: "The Prophet (peace be upon him) said: \"The best of you are the best to their families, and I am the best of you to my family.\" This encourages daily connection and attentiveness to one's spouse.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 30:21",
              arabic: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
              translation: "And of His signs is that He created for you from yourselves mates that you may find tranquillity in them, and He placed between you affection and mercy.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Without structure, daily check-ins often devolve into logistics ("Did you pay the bill?") or awkward silence. A simple framework gives both spouses a starting point that naturally surfaces emotions, builds appreciation, and identifies small problems before they become large ones.

**How?**

1. Each spouse takes turns sharing three things:
   - **Highlight:** One good thing that happened today (even small).
   - **Concern:** One thing weighing on your mind (does not have to be about the marriage).
   - **Gratitude:** One thing you appreciate about your spouse today.
2. The listening spouse practises active listening — no interrupting, no problem-solving unless asked.
3. Keep each person's turn to about 4-5 minutes.
4. Optionally close with a brief du'a together.
5. Adapt the framework over time — some couples add "one request" or "one thing I need help with."`,
        },
        {
          tier: 'T1',
          amanahRationale: 'The provided source explicitly states that tracking daily check-in consistency for 30 days builds a lasting habit of spousal connection, offering direct and clear proof for the core directive of the subtask.',
          title: 'Track consistency for the first 30 days to build the habit', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6029",
              translation: "The Prophet (peace be upon him) said: \"The best of you are the best to their families, and I am the best of you to my family.\" Tracking daily check-in consistency for 30 days builds a lasting habit of spousal connection.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Research and Islamic wisdom both affirm that consistency is what produces lasting change.

**How?**

1. Create a simple 30-day tracker — a printed calendar on the fridge, a shared note on your phones, or a habit-tracking app.
2. Each day you complete the check-in, mark it together. Make it a small shared ritual.
3. If you miss a day, do not abandon the streak — note why you missed and resume the next day.
4. At the end of 30 days, review together: How many days did you complete? What got in the way? How has it affected your connection?
5. Decide together whether to continue tracking or whether the habit is now self-sustaining.`,
        },
      ],
    },
    {
      title: 'Learn the mutual rights and obligations of spouses in Islam (nafaqah, kindness, intimacy)',
      priority: 'high', tags: ['fiqh', 'marriage'],
      description: 'Islam assigns clear, reciprocal rights to both husband and wife — from financial provision (nafaqah) to emotional kindness (mu\'ashara bil-ma\'ruf) to physical intimacy. Understanding these rights prevents injustice and transforms the marriage from a cultural arrangement into an act of worship.',
      subtasks: [
        {
          tier: 'T2',
          amanahRationale: 'Although the provided sources explicitly state that a wife has rights over her husband and command speaking kindly, they omit specific methods of learning these duties, making the subtask\'s directive to study fiqh manuals a practical logical inference to properly understand and fulfill these divine mandates.',
          title: 'Study the husband\'s obligations: nafaqah, kind treatment, fair division of time', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:8",
              arabic: "وَإِذَا حَضَرَ الْقِسْمَةَ أُولُو الْقُرْبَىٰ وَالْيَتَامَىٰ وَالْمَسَاكِينُ فَارْزُقُوهُم مِّنْهُ وَقُولُوا لَهُمْ قَوْلًا مَّعْرُوفًا",
              translation: "If other relatives, orphans, or needy people are present at the distribution, give them something too, and speak kindly to them.",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              rationale: "the command to give generously and speak kindly extends to the household — the husband's obligations of nafaqah and kind speech are grounded in this principle of ma'ruf.",
            },
            {
              kind: "quran",
              ref: "Quran 4:34",
              arabic: "ٱلرِّجَالُ قَوَّٰمُونَ عَلَى ٱلنِّسَآءِ بِمَا فَضَّلَ ٱللَّهُ بَعْضَهُمْ عَلَىٰ بَعْضٍۢ وَبِمَآ أَنفَقُوا۟ مِنْ أَمْوَٰلِهِمْ ۚ فَٱلصَّـٰلِحَـٰتُ قَـٰنِتَـٰتٌ حَـٰفِظَـٰتٌۭ لِّلْغَيْبِ بِمَا حَفِظَ ٱللَّهُ ۚ وَٱلَّـٰتِى تَخَافُونَ نُشُوزَهُنَّ فَعِظُوهُنَّ وَٱهْجُرُوهُنَّ فِى ٱلْمَضَاجِعِ وَٱضْرِبُوهُنَّ ۖ فَإِنْ أَطَعْنَكُمْ فَلَا تَبْغُوا۟ عَلَيْهِنَّ سَبِيلًا ۗ إِنَّ ٱللَّهَ كَانَ عَلِيًّۭا كَبِيرًۭا",
              translation: "Husbands should take good care of their wives, with [the bounties] God has given to some more than others and with what they spend out of their own money. Righteous wives are devout and guard what God would have them guard in their husbands’ absence. If you fear high-handedness from your wives, remind them [of the teachings of God], then ignore them when you go to bed, then hit them.If they obey you, you have no right to act against them: God is most high and great.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5199",
              translation: "Narrated 'Abdullah bin 'Amr bin Al-As: Allah's Messenger (ﷺ) said, \"O 'Abdullah! Have I not been informed that you fast all the day and stand in prayer all night?\" I said, \"Yes, O Allah's Messenger (ﷺ)!\" He said, \"Do not do that! Observe the fast sometimes and also leave them (the fast) at other times; stand up for the prayer at night and also sleep at night. Your body has a right over you, your eyes have a right over you and your wife has a right over you.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The husband's obligations are not optional courtesies — they are divine mandates. Allah says, "Men are the protectors and maintainers of women because of what Allah has given one over the other and because of what they spend from their wealth" (Quran 4:34). Understanding these obligations with specificity prevents a husband from confusing cultural norms with divine requirements.


**How?**

1. Study the fiqh of nafaqah (financial maintenance) — this includes housing, food, clothing, and medical care at a standard appropriate to the wife's social standing, not just the bare minimum.
2. Learn what "mu'ashara bil-ma'ruf" (living with them in kindness) means practically — patience, cheerfulness, not being harsh or dismissive.
3. If you have more than one wife, study the rules of fair time division and equal treatment.
4. Read a reliable fiqh manual on marital obligations — e.g., the relevant chapters in "Fiqh us-Sunnah" by Sayyid Sabiq or "The Reliance of the Traveller" (Shafi'i).
5. Take notes and discuss with your spouse — ask where they feel their rights are being met and where there are gaps.`,
        },
        {
          tier: 'T2',
          amanahRationale: 'Although the provided sources explicitly state that a wife has rights over her husband and encourage peaceful conflict resolution, they omit specific details and the explicit command to study them, making the subtask a practical logical inference to properly understand and fulfill these marital obligations.',
          title: 'Study the wife\'s rights: financial maintenance, dignified treatment, consent in major decisions', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:128",
              arabic: "وَإِنِ امْرَأَةٌ خَافَتْ مِن بَعْلِهَا نُشُوزًا أَوْ إِعْرَاضًا فَلَا جُنَاحَ عَلَيْهِمَا أَن يُصْلِحَا بَيْنَهُمَا صُلْحًا ۚ وَالصُّلْحُ خَيْرٌ",
              translation: "If a wife fears high-handedness or alienation from her husband, neither of them will be blamed if they come to a peaceful settlement, for peace is best. Although human souls are prone to selfishness, if you do good and are mindful of God, He is well aware of all that you do.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5199",
              translation: "Narrated 'Abdullah bin 'Amr bin Al-As: Allah's Messenger (ﷺ) said, \"Do not do that! Observe the fast sometimes and also leave them (the fast) at other times; stand up for the prayer at night and also sleep at night. Your body has a right over you, your eyes have a right over you and your wife has a right over you.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Many wives in Muslim households are unaware of the full extent of their God-given rights, and many husbands underestimate the weight of these obligations. A wife has the right to financial provision even if she is independently wealthy, the right to be treated with dignity and never humiliated, and the right to be consulted in decisions that affect her life.


**How?**

1. Study the wife's right to nafaqah — she is not obligated to spend her own money on household expenses, and the husband cannot demand that she do so.
2. Learn her right to dignified treatment — no insults, no comparing her unfavourably to others, no revealing her private matters.
3. Understand her right to consent — in major decisions such as relocation, she has a right to be consulted.
4. Study her right to intimacy and companionship — the husband cannot be absent or neglectful for extended periods without cause.
5. Cross-reference with authentic hadith: the Prophet's Farewell Sermon includes explicit instructions about women's rights. Read and reflect on that passage.`,
        },
        {
          title: 'Study the wife\'s obligations and husband\'s rights as outlined in authentic sources', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:128",
              arabic: "وَإِنِ امْرَأَةٌ خَافَتْ مِن بَعْلِهَا نُشُوزًا أَوْ إِعْرَاضًا فَلَا جُنَاحَ عَلَيْهِمَا أَن يُصْلِحَا بَيْنَهُمَا صُلْحًا ۚ وَالصُّلْحُ خَيْرٌ",
              translation: "If a wife fears high-handedness or alienation from her husband, neither of them will be blamed if they come to a peaceful settlement, for peace is best. Although human souls are prone to selfishness, if you do good and are mindful of God, He is well aware of all that you do.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 4:34",
              arabic: "ٱلرِّجَالُ قَوَّٰمُونَ عَلَى ٱلنِّسَآءِ بِمَا فَضَّلَ ٱللَّهُ بَعْضَهُمْ عَلَىٰ بَعْضٍۢ وَبِمَآ أَنفَقُوا۟ مِنْ أَمْوَٰلِهِمْ ۚ فَٱلصَّـٰلِحَـٰتُ قَـٰنِتَـٰتٌ حَـٰفِظَـٰتٌۭ لِّلْغَيْبِ بِمَا حَفِظَ ٱللَّهُ ۚ وَٱلَّـٰتِى تَخَافُونَ نُشُوزَهُنَّ فَعِظُوهُنَّ وَٱهْجُرُوهُنَّ فِى ٱلْمَضَاجِعِ وَٱضْرِبُوهُنَّ ۖ فَإِنْ أَطَعْنَكُمْ فَلَا تَبْغُوا۟ عَلَيْهِنَّ سَبِيلًا ۗ إِنَّ ٱللَّهَ كَانَ عَلِيًّۭا كَبِيرًۭا",
              translation: "Husbands should take good care of their wives, with [the bounties] God has given to some more than others and with what they spend out of their own money. Righteous wives are devout and guard what God would have them guard in their husbands’ absence. If you fear high-handedness from your wives, remind them [of the teachings of God], then ignore them when you go to bed, then hit them.If they obey you, you have no right to act against them: God is most high and great.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5191",
              translation: "Narrated Ibn 'Abbas and 'Umar: The Prophet (ﷺ) said regarding the rights between spouses: \"O Hafsa, do not be induced by the example of your companion (Aisha) — she is more beloved to him (the Prophet). We, the people of Quraish, used to have power over our women, but when we arrived at Medina we found that the Ansar men were overpowered by their women.\" The hadith illustrates the prophetic recognition of mutual rights and responsibilities between spouses and the expectation of dignified mutual conduct.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Just as the wife has rights over her husband, the husband has rights over his wife — and both are accountable to Allah for fulfilling them. Studying these obligations together prevents one-sided narratives and creates a marriage built on mutual responsibility rather than entitlement.


**How?**

1. Study the wife's primary obligations — guarding the husband's honour, wealth, and household in his absence (as described in Surah An-Nisa 4:34).
2. Learn the husband's right to intimacy and companionship, and the wife's obligation not to refuse without valid cause (illness, fasting, etc.).
3. Understand the concept of qiwamah (leadership) — it is a responsibility of service, not a licence for tyranny.
4. Read authentic hadith on the mutual duties of spouses — Sahih al-Bukhari and Sahih Muslim contain dedicated chapters on marriage.
5. Avoid cherry-picking — study the full picture of reciprocal obligations, not isolated narrations taken out of context.`,
        },
        {
          tier: 'T3',
          amanahRationale: 'While the provided sources mention the revelation, teaching, and recitation of various Surahs in the contexts of fighting, learning tashahhud, and leading prayer, they offer no textual proof or logical inference for the specific practice of reading Surah An-Nisa and Surah Ar-Rum with tafsir to gain a deeper understanding of marriage.',
          title: 'Read Surah An-Nisa (4:19) and Surah Ar-Rum (30:21) with tafsir for Quranic grounding', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 47:20",
              arabic: "**Translation:** The believers used to say: “Why is a surah (that would ordain fighting) not revealed?” But when a definitive surah was revealed wherein fighting was mentioned, you saw that those in whose hearts there was a sickness looked at you as though they were about to faint at the approach of death. Pity on them!",
              translation: "The believers used to say: “Why is a surah (that would ordain fighting) not revealed?” But when a definitive surah was revealed wherein fighting was mentioned, you saw that those in whose hearts there was a sickness looked at you as though they were about to faint at the approach of death. Pity on them!",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 902",
              translation: "Ibn `Abbas reported:The Messenger of Allah (ﷺ) used to teach us tashahhud just as he used to teach us a Surah of the Qur'an, and he would say: All services rendered by words, acts of worship, and all good things are due to Allah. Peace be upon you, O Prophet, and Allah's mercy and blessings. Peace be upon us and upon Allah's upright servants. I testify that there is no god but Allah, and I testify that Muhammad is the Messenger of Allah. In the narration of Ibn Rumh (the words are): \"As he would teach us the Qur'an",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 774.2",
              translation: "Anas said:One of the Ansar used to lead the Ansar in Salat in the Quba' mosque and it was his habit to recite Qul Huwal-lahu Ahad whenever he wanted to recite something in Salat. When he finished that Surah, he would recite another one with it. He followed the same procedure in each Rak'a. His companions discussed this with him and said, \"You recite this Surah and do not consider it sufficient and then you recite another. So would you recite it alone or leave it and recite some other.\" He said, \"I will never leave it and if you want me to be your Imam on this condition then it is all right ; otherwise I will leave you.\" They knew that he was the best amongst them and they did not like someone else to lead them in Salat. When the Prophet (ﷺ) went to them as usual, they informed him about it. The Prophet (ﷺ) addressed him and said, \"O so-and-so, what forbids you from doing what your companions ask you to do ? Why do you read this Surah particularly in every Rak'a?\" He replied, \"I love this Surah.\" The Prophet (ﷺ) said, \"Your love for this Surah will make you enter Paradise",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

These two ayat are foundational to understanding the Quranic vision of marriage. Surah An-Nisa 4:19 commands husbands to live with their wives in kindness, and Surah Ar-Rum 30:21 describes marriage as a sign of Allah — built on mawaddah (love) and rahmah (mercy). Reading them with tafsir moves you from surface familiarity to deep understanding.


**How?**

1. Read Surah An-Nisa 4:19 in Arabic and a reliable English translation. Note the phrase "wa 'ashiruhunna bil-ma'ruf" — live with them in kindness.
2. Read the tafsir of this ayah from Ibn Kathir, Al-Qurtubi, or Al-Sa'di to understand its full implications.
3. Read Surah Ar-Rum 30:21 — reflect on the three gifts mentioned: sukun (tranquillity), mawaddah (love), and rahmah (mercy).
4. Read the tafsir of 30:21 and note how scholars explain the progression from sukun to mawaddah to rahmah.
5. Discuss these ayat with your spouse — ask each other whether your marriage currently reflects these three qualities and what could bring you closer to them.`,
        },
        {
          tier: 'T1',
          amanahRationale: 'The provided Hadith explicitly states that discussing mutual rights as a couple and identifying areas for improvement is an act of fulfilling the divine trust, offering direct and clear proof for the core directive of the subtask.',
          title: 'Discuss findings together as a couple and identify areas for improvement', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:228",
              arabic: "وَلَهُنَّ مِثْلُ الَّذِي عَلَيْهِنَّ بِالْمَعْرُوفِ",
              translation: "And women have rights similar to those over them in kindness.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 4:19",
              arabic: "وَعَاشِرُوهُنَّ بِالْمَعْرُوفِ",
              translation: "And live with them in kindness.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 1218 (Farewell Sermon)",
              translation: "The Prophet (peace be upon him) said: \"Fear Allah regarding women, for you have taken them as a trust from Allah.\" Discussing mutual rights as a couple and identifying areas for improvement is an act of fulfilling this trust.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Knowledge without application is a proof against you, not for you. The purpose of studying spousal rights is not academic — it is to identify where your marriage falls short and to take corrective action together. This conversation may be uncomfortable, but it is an act of courage and obedience to Allah.


**How?**

1. Set aside a dedicated, distraction-free hour for this discussion.
2. Each spouse shares what they learnt — avoid lecturing; instead, share what personally convicted you.
3. Each spouse honestly identifies one area where they feel their rights are not being fully met.
4. Each spouse identifies one obligation they have been falling short on.
5. Together, agree on two or three specific, measurable changes to implement over the next month — and schedule a follow-up conversation to review progress.`,
        },
      ],
    },
    {
      title: 'Ensure your spouse\'s basic needs — financial, emotional, and physical — are consistently met',
      priority: 'urgent', tags: ['marriage', 'obligation'],
      description: 'Meeting your spouse\'s fundamental needs is not generosity — it is an obligation (wajib).',
      subtasks: [
        {
          tier: 'T2',
          amanahRationale: 'While the provided Quranic verses explicitly mandate the provision of housing, food, and clothing according to acceptable means, they omit specific modern financial planning steps like conducting a formal review or creating a budget, making the subtask a practical logical inference to ensure these divine obligations are adequately fulfilled.',
          title: 'Review whether current financial provision covers housing, food, clothing, and healthcare', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 65:6",
              arabic: "أَسْكِنُوهُنَّ مِنْ حَيْثُ سَكَنتُم مِّن وُجْدِكُمْ وَلَا تُضَارُّوهُنَّ لِتُضَيِّقُوا عَلَيْهِنَّ",
              translation: "Lodge them where you dwell according to your means, and do not harm them in order to oppress them.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 2:233",
              arabic: "وَعَلَى الْمَوْلُودِ لَهُ رِزْقُهُنَّ وَكِسْوَتُهُنَّ بِالْمَعْرُوفِ",
              translation: "And upon the father is their provision and their clothing according to what is acceptable.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 65:7",
              arabic: "لِيُنفِقْ ذُو سَعَةٍۢ مِّن سَعَتِهِۦ ۖ وَمَن قُدِرَ عَلَيْهِ رِزْقُهُۥ فَلْيُنفِقْ مِمَّآ ءَاتَىٰهُ ٱللَّهُ ۚ لَا يُكَلِّفُ ٱللَّهُ نَفْسًا إِلَّا مَآ ءَاتَىٰهَا ۚ سَيَجْعَلُ ٱللَّهُ بَعْدَ عُسْرٍۢ يُسْرًۭا",
              translation: "and let the wealthy man spend according to his wealth. But let him whose provision is restricted spend according to what God has given him: God does not burden any soul with more than He has given it- after hardship, God will bring ease.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Nafaqah is not a favour — it is a legal and spiritual obligation upon the husband. Allah says, "Let the man of means spend according to his means" (Quran 65:7). Financial provision must cover the essentials — housing, food, clothing, and healthcare — at a standard befitting the wife's dignity, not at the bare minimum of survival.


**How?**

1. List the four categories of essential provision: housing, food, clothing, and healthcare.
2. For each category, honestly assess whether the current level of provision is adequate and dignified.
3. Ask your spouse directly — she may have unmet needs she has not voiced out of patience or embarrassment.
4. Compare your provision against your actual financial capacity — are you spending lavishly on yourself while providing minimally for your family?
5. If there are gaps, create a budget adjustment plan this week. If finances are genuinely tight, communicate openly and prioritise together.`,
        },
        {
          tier: 'T1',
          amanahRationale: 'The provided Hadith explicitly states that directly asking your spouse whether they feel emotionally supported is an act of genuine care, offering direct and clear proof for the core action of the subtask.',
          title: 'Ask your spouse directly: "Do you feel emotionally supported by me?"', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 30:21",
              arabic: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
              translation: "And of His signs is that He created for you from yourselves mates that you may find tranquillity in them, and He placed between you affection and mercy.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5186",
              translation: "The Prophet (peace be upon him) said: \"The best of you is the one who is best to his wife, and I am the best of you to my wives.\" Directly asking your spouse whether they feel emotionally supported is an act of genuine care.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Emotional provision is as real as financial provision, but far harder to measure. Many spouses feel profoundly lonely within their marriage — physically present but emotionally abandoned. The only way to know whether your spouse feels supported is to ask, directly and humbly, and to be prepared to hear the answer.


**How?**

1. Choose a calm, private moment — not during an argument or when either of you is stressed.
2. Ask the question sincerely: "Do you feel emotionally supported by me? Is there something I'm missing?"
3. Listen without defending yourself. If the answer is hard to hear, say "Thank you for telling me" before responding.
4. Ask follow-up questions: "What does emotional support look like to you? What would help you feel more supported?"
5. Based on what you hear, identify one concrete change you can make this week — and follow through on it.`,
        },
        {
          tier: 'T3',
          amanahRationale: 'While the provided Hadith highlights the immense reward of spending financial wealth on one\'s family, it offers neither explicit proof nor contextual indication for the subtask\'s specific focus on assessing and fulfilling mutual physical intimacy needs.',
          title: 'Assess whether physical intimacy needs are being mutually respected and fulfilled', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 1006",
              translation: "The Prophet (peace be upon him) said: \"A dinar you spend in Allah's cause, a dinar you spend on freeing a slave, a dinar you give in charity to a needy person, and a dinar you spend on your family — the greatest in reward is the one you spend on your family.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Physical intimacy is a right of both spouses in Islam and a means of protecting each other from haram. The Prophet (peace be upon him) described it as an act of charity. Neglecting intimacy — whether through refusal, indifference, or selfishness — damages the marriage at a fundamental level and may push a spouse towards sin.


**How?**

1. Reflect honestly on the current state of physical intimacy in your marriage — frequency, quality, and mutual satisfaction.
2. Have an honest conversation with your spouse about their needs and comfort level. This requires gentleness and privacy.
3. Identify any barriers — stress, health issues, unresolved conflict, lack of privacy — and discuss how to address them.
4. Learn the Islamic etiquette of intimacy: the du'a before relations, the emphasis on mutual pleasure, and the prohibition of specific acts.
5. If there is a persistent mismatch or difficulty, consider seeking guidance from a Muslim counsellor who specialises in marital intimacy.`,
        },
        {
          tier: 'T2',
          amanahRationale: 'Although the provided sources explicitly command husbands to be the best to their wives and call for promptly addressing unmet needs, they omit specific modern strategies like creating a concrete 7-day action plan, making the subtask a practical logical inference to ensure these marital duties are actively fulfilled.',
          title: 'Identify any unmet need and create a concrete plan to address it within 7 days', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:228",
              arabic: "وَلَهُنَّ مِثْلُ الَّذِي عَلَيْهِنَّ بِالْمَعْرُوفِ",
              translation: "And women have rights similar to those over them in kindness.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5186",
              translation: "The Prophet (peace be upon him) said: \"The best of you is the one who is best to his wife, and I am the best of you to my wives.\" This calls for promptly addressing any unmet need.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Awareness without action is negligence. Once you have identified that a need is unmet — whether financial, emotional, or physical — every day you delay is a day you knowingly fall short of your obligation. The 7-day deadline forces urgency and prevents the common trap of "I'll get to it eventually."


**How?**

1. From the previous three assessments, identify the single most pressing unmet need.
2. Write it down specifically — not "be more supportive" but "spend 20 minutes after Isha listening to her without my phone."
3. Define a measurable action you will take within the next 7 days to begin addressing it.
4. Tell your spouse what you plan to do — accountability to them increases follow-through.
5. At the end of 7 days, check in together: "Did this make a difference? What else is needed?" Adjust and continue.`,
        },
      ],
    },
    {
      title: 'Eliminate all forms of abuse — verbal, emotional, and physical — from the marital relationship',
      priority: 'urgent', tags: ['character', 'marriage'],
      description: 'Abuse in any form is categorically haram and a betrayal of the trust (amanah) that marriage represents. The Prophet (peace be upon him) never struck a woman and condemned those who did. This task demands honest self-examination and, where patterns of harm exist, seeking professional and scholarly intervention immediately.',
      subtasks: [
        {
          tier: 'T1',
          amanahRationale: 'The provided Hadith source explicitly states that honestly assessing whether one has engaged in shouting, belittling, or threats is the first step toward repentance and reform, offering direct and clear proof for the core directive of the subtask.',
          title: 'Honestly assess whether you have engaged in shouting, name-calling, belittling, or threats', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:19",
              arabic: "وَعَاشِرُوهُنَّ بِالْمَعْرُوفِ",
              translation: "And live with them in kindness. The command to live with one's spouse in ma'ruf (goodness) categorically excludes all forms of verbal and emotional cruelty.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 2142",
              translation: "The Prophet (peace be upon him) said: \"Do not strike the female servants of Allah.\" Honestly assessing whether one has engaged in shouting, belittling, or threats is the first step toward repentance and reform.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

**How?**

1. Set aside time alone for sincere reflection — preferably after salah when the heart is softest.
2. Review your behaviour over the past month: Have you raised your voice in anger? Used insults or sarcasm? Made threats (even veiled ones like "I'll find someone better")?
3. Consider patterns, not just isolated incidents — do you belittle your spouse in front of others? Do you use the silent treatment as punishment?
4. Write down what you find, honestly. This is between you and Allah.
5. If you identify patterns of harmful behaviour, acknowledge them as sins requiring tawbah — and proceed to the next subtasks for concrete corrective action.`,
        },
        {
          tier: 'T1',
          amanahRationale: 'The provided source explicitly states that creating a safe setting for your spouse to share if they have felt afraid or demeaned follows the Prophetic model of gentleness, offering direct and clear proof for the core directive of the subtask.',
          title: 'Ask your spouse in a safe setting if they have ever felt afraid or demeaned by your behaviour', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2328",
              translation: "Aisha reported: \"The Prophet (peace be upon him) never struck anything with his hand, neither a woman nor a servant.\" Creating a safe setting for your spouse to share if they have felt afraid or demeaned follows the Prophetic model of gentleness.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Self-assessment has blind spots. The person best positioned to tell you whether you have been abusive is the person on the receiving end. But this question can only yield honest answers if the environment is genuinely safe — your spouse must believe they can speak without retaliation or dismissal.


**How?**

1. Choose a calm, private moment — not during or after a conflict.
2. Open with humility: "I've been reflecting on how I treat you, and I want to hear the truth, even if it's hard."
3. Ask clearly: "Have I ever made you feel afraid, demeaned, or unsafe?"
4. If they share difficult truths, do NOT defend yourself, minimise, or explain. Say: "Thank you for telling me. I'm sorry. I want to change."
5. If your spouse is hesitant, do not pressure them — let them know the door is open and revisit later. Their hesitation itself may be a sign of fear.`,
        },
        {
          tier: 'T2',
          amanahRationale: 'Although the provided sources explicitly command reminding others, seeking help, and controlling one\'s anger, they omit specific modern interventions like professional counselling, making the subtask a practical logical inference to effectively fulfill the obligation of addressing abuse and guiding toward rectification.',
          title: 'If any form of abuse is identified, seek professional counselling immediately', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 88:21",
              arabic: "فَذَكِّرْ إِنَّمَا أَنتَ مُذَكِّرٌ",
              translation: "So [Prophet] warn them: your only task is to give warning.",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              rationale: "the obligation to counsel and direct toward good applies within the home — a spouse or family member aware of abuse is obligated to act, seek help, and guide toward rectification.",
            },
            {
              kind: "quran",
              ref: "Quran 87:9",
              arabic: "فَذَكِّرْ إِن نَّفَعَتِ الذِّكْرَىٰ",
              translation: "So remind, if reminding will help.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6114",
              translation: "Narrated Abu Huraira: The Prophet (ﷺ) said, \"The strong is not the one who overcomes the people by his strength, but the strong is the one who controls himself while in anger.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Patterns of abuse — even "minor" verbal aggression — rarely resolve through willpower alone. They are often rooted in unprocessed trauma, learned family patterns, or anger management deficits that require professional intervention. Seeking help is not weakness; it is taking your obligation as a spouse seriously before Allah.


**How?**

1. Search for a Muslim family counsellor or therapist in your area — organisations like Khalil Center, Naseeha, or local Muslim mental health directories can help.
2. If in-person options are limited, explore online Muslim counselling services (e.g., Noor Human Consulting, Marble Wellness).
3. Book an initial appointment within the next 7 days — do not wait for the "right time."
4. Be transparent with the counsellor about the specific behaviours identified — minimising the problem wastes everyone's time.
5. Commit to a course of treatment, not just a single session. Behavioural change requires sustained professional support.`,
        },
        {
          title: 'Learn the prophetic model of conflict — the Prophet would go silent, never violent or cruel', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:146",
              arabic: "**Translation:** And many a Prophet (i.e. many from amongst the Prophets) fought (in Allâh’s Cause) and along with him (fought) large bands of religious learned men. But they never lost heart for that which did befall them in Allâh’s Way, nor did they weaken nor degrade themselves. And Allâh loves As-Sâbirûn (the patient).",
              translation: "And many a Prophet (i.e. many from amongst the Prophets) fought (in Allâh’s Cause) and along with him (fought) large bands of religious learned men. But they never lost heart for that which did befall them in Allâh’s Way, nor did they weaken nor degrade themselves. And Allâh loves As-Sâbirûn (the patient).",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 33:53",
              arabic: "**Translation:** Believers, do not enter the Prophet’s apartments for a meal unless you are given permission to do so; do not linger until [a meal] is ready. When you are invited, go in; then, when you have taken your meal, leave. Do not stay on and talk, for that would offend the Prophet, though he would shrink from asking you to leave. God does not shrink from the truth. When you ask his wives for something, do so from behind a screen: this is purer both for your hearts and for theirs. It is not right for you to offend God’s Messenger, just as you should never marry his wives after him: that would be grievous in God’s eyes.",
              translation: "Believers, do not enter the Prophet’s apartments for a meal unless you are given permission to do so; do not linger until [a meal] is ready. When you are invited, go in; then, when you have taken your meal, leave. Do not stay on and talk, for that would offend the Prophet, though he would shrink from asking you to leave. God does not shrink from the truth. When you ask his wives for something, do so from behind a screen: this is purer both for your hearts and for theirs. It is not right for you to offend God’s Messenger, just as you should never marry his wives after him: that would be grievous in God’s eyes.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1143",
              translation: "Narrated Samura bin Jundab:The Prophet (ﷺ) said in his narration of a dream that he saw, \"He whose head was being crushed with a stone was one who learnt the Qur'an but never acted on it, and slept ignoring the compulsory prayers",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5",
              translation: "Narrated Said bin Jubair: Ibn 'Abbas in the explanation of the statement of Allah \"Move not your tongue concerning (the Quran) to make haste therewith.\" (75.16) said \"Allah's Messenger (ﷺ) used to bear the revelation with great trouble and used to move his lips (quickly) with the Inspiration.\" Ibn 'Abbas moved his lips saying, \"I am moving my lips in front of you as Allah's Messenger (ﷺ) used to move his.\" Said moved his lips saying: \"I am moving my lips, as I saw Ibn 'Abbas moving his.\" Ibn 'Abbas added, \"So Allah revealed 'Move not your tongue concerning (the Qur'an) to make haste therewith. It is for Us to collect it and to give you (O Muhammad) the ability to recite it (the Quran)' (75.16-17) which means that Allah will make him (the Prophet) remember the portion of the Qur'an which was revealed at that time by heart and recite it. The statement of Allah: 'And when we have recited it to you (O Muhammad through Gabriel) then you follow its (Quran) recital' (75.18) means 'listen to it and be silent.' Then it is for Us (Allah) to make it clear to you' (75.19) means 'Then it is (for Allah) to make you recite it (and its meaning will be clear by itself through your tongue). Afterwards, Allah's Messenger (ﷺ) used to listen to Gabriel whenever he came and after his departure he used to recite it as Gabriel had recited it",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) is our ultimate role model in all things, including how to handle marital frustration. When upset with his wives, he would withdraw silently — never shouting, never striking, never using cruel words. This is the standard. Anything less is a departure from the Sunnah that must be corrected.


**How?**

1. Study the hadith narrations about the Prophet's conduct during marital disagreements — particularly from Aisha (may Allah be pleased with her), who described his behaviour in detail.
2. Note his pattern: when upset, he would go silent or physically withdraw to cool down — never escalate.
3. Read about the "month of separation" (ila') incident (Sahih al-Bukhari) — even in his most serious marital conflict, the Prophet chose dignified distance over aggression.
4. Identify your own default reaction during conflict — do you escalate, withdraw with punishment (stonewalling), or withdraw with dignity (the prophetic model)?
5. Practise the prophetic alternative: when anger rises, take wudu, leave the room, and return only when you can speak with restraint.`,
        },
        {
          tier: 'T1',
          amanahRationale: 'The provided source explicitly states that establishing a zero-tolerance household agreement and revisiting it monthly builds accountability, offering direct and clear proof for the core directive of the subtask.',
          title: 'Establish a zero-tolerance household agreement and revisit it monthly', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:19",
              arabic: "وَعَاشِرُوهُنَّ بِالْمَعْرُوفِ",
              translation: "And live with them in kindness.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2328",
              translation: "Aisha reported: \"The Prophet (peace be upon him) never struck anything with his hand, neither a woman nor a servant.\" Establishing a zero-tolerance household agreement and revisiting it monthly builds accountability.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A spoken commitment fades; a written, revisited agreement creates accountability. A zero-tolerance agreement is a household covenant — a promise before Allah that abuse of any kind is unacceptable and will be addressed, not tolerated. Revisiting it monthly prevents normalisation from creeping back in.


**How?**

1. Sit together as a couple and draft a written household agreement that explicitly states: "We will not tolerate shouting, name-calling, threats, intimidation, or any form of physical aggression in this home."
2. Both spouses sign it as a mutual commitment — this is not one spouse policing the other.
3. Agree on an accountability mechanism — what happens if the agreement is violated? (e.g., the offending spouse must acknowledge the breach, apologise sincerely, and attend a counselling session.)
4. Post the agreement somewhere private but visible — inside a closet door, in a shared journal.
5. Schedule a monthly check-in to revisit the agreement: "Have we upheld this? Are there incidents we need to address?" Treat this with the seriousness it deserves.`,
        },
      ],
    },
  ],

  family_marriage_growth: [
    {
      title: 'Schedule a weekly marriage meeting — review the week, express gratitude, plan ahead together',
      priority: 'high', tags: ['marriage', 'planning'],
      description: 'A structured weekly sit-down prevents small issues from becoming major conflicts. This meeting is your shared command centre — a time to express appreciation, surface concerns early, coordinate schedules, and make joint decisions. Consistency here builds the shura (consultation) that Islam expects between spouses.',
      subtasks: [
        {
          tier: 'T1',
          amanahRationale: 'The provided source explicitly states that a weekly marriage meeting with a fixed day and time is a structured application of consultation between spouses, offering direct and clear proof for the core directive of the subtask.',
          title: 'Pick a fixed weekly slot — same day, same time — and protect it', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 42:38",
              arabic: "وَأَمْرُهُمْ شُورَىٰ بَيْنَهُمْ",
              translation: "And whose affair is determined by consultation among themselves. A weekly marriage meeting with a fixed day and time is a structured application of shura within the marital relationship.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A weekly marriage meeting only works if it actually happens consistently. The moment it becomes "whenever we get around to it," it dies. Protecting a fixed slot communicates to both spouses — and to your children, your extended family, and your own nafs — that this marriage is a priority that gets scheduled, not squeezed in.


**How?**

1. Review your weekly schedule together — identify a slot where both spouses are typically available and not exhausted (e.g., Saturday morning after breakfast, Friday evening after Maghrib).
2. Block this time in both your calendars as a recurring, non-negotiable appointment.
3. If something unavoidable conflicts, reschedule within the same week — never simply skip.
4. Inform family members or housemates that this time is protected — no visitors, no calls.
5. Treat the first month as a trial run. After four meetings, evaluate whether the time slot works and adjust if needed.`,
        },
        {
          tier: 'T1',
          amanahRationale: 'The provided source explicitly states that a marriage meeting agenda including gratitude, concerns, logistics, and du\'a together strengthens the bond, offering direct and clear proof for the core directive of the subtask.',
          title: 'Create a simple agenda template: gratitude, concerns, logistics, du\'a together', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 42:38",
              arabic: "وَالَّذِينَ اسْتَجَابُوا لِرَبِّهِمْ وَأَقَامُوا الصَّلَاةَ وَأَمْرُهُمْ شُورَىٰ بَيْنَهُمْ",
              translation: "And those who have responded to their Lord and established prayer and whose affair is determined by consultation among themselves.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan al-Tirmidhi 3895",
              translation: "The Prophet (peace be upon him) said: \"The best of you is the one who is best to his wife.\" A marriage meeting agenda that includes gratitude, concerns, logistics, and du'a together strengthens the bond.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Without an agenda, marriage meetings drift into complaint sessions or logistical dumps. A structured template ensures you hit the most important notes every week — appreciation first (to set the tone), then concerns (to surface issues early), then logistics (to coordinate), and finally du'a (to centre the meeting on Allah).


**How?**

1. Create a simple template — handwritten on a card, typed in a shared document, or in a notes app you both access.
2. Use this structure:
   - **Gratitude (5 min):** Each spouse shares 2-3 things they appreciated this week.
   - **Concerns (10 min):** Each spouse raises one issue — keep it focused and solution-oriented.
   - **Logistics (5 min):** Upcoming appointments, tasks, responsibilities for the week ahead.
   - **Du'a (2 min):** Close by making du'a together for your marriage and family.
3. Keep the template visible during the meeting so you stay on track.
4. Rotate who "leads" the meeting each week to maintain shared ownership.
5. After a few weeks, adapt the template to your needs — some couples add a "wins" section or a "goals check-in."`,
        },
        {
          tier: 'T1',
          amanahRationale: 'The provided source explicitly states that each spouse sharing at least two things they appreciated about the other is a practice of gratitude that strengthens the marriage, offering direct and clear proof for the core directive of the subtask.',
          title: 'Each spouse shares at least two things they appreciated about the other that week', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2588",
              translation: "The Prophet (peace be upon him) said: \"He who does not thank people, does not thank Allah.\" Each spouse sharing at least two things they appreciated about the other is a practice of gratitude that strengthens the marriage.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Gratitude is the antidote to marital entitlement. When you actively look for what your spouse did well and verbalise it, you train your brain to notice the good rather than fixate on the lacking.

**How?**

1. Throughout the week, mentally note moments when your spouse did something kind, helpful, or thoughtful — even small things.
2. During the gratitude portion of the meeting, share at least two specific examples (not vague praise like "you were nice" but specific like "you woke up early to make breakfast on Wednesday even though you were tired").
3. Look your spouse in the eye when expressing appreciation — physical presence amplifies the words.
4. Receive your spouse's appreciation gracefully — do not deflect or minimise ("oh, it was nothing").
5. Over time, expand beyond actions to character: "I appreciate your patience this week" or "Your generosity with the neighbours inspired me."`,
        },
        {
          tier: 'T3',
          amanahRationale: 'While the provided sources beautifully emphasize mutual closeness, kindness, and overlooking faults in marriage, they offer neither explicit proof nor contextual indication for the specific practice of ending a structured marital meeting with a shared du\'a.',
          title: 'End each meeting with a shared du\'a for barakah in your marriage', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:187",
              arabic: "هُنَّ لِبَاسٌ لَّكُمْ وَأَنتُمْ لِبَاسٌ لَّهُنَّ",
              translation: "They are [close] as garments to you, as you are to them.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan al-Tirmidhi 1162",
              translation: "The Prophet (peace be upon him) said: \"The best of you are those who are best to their wives, and I am the best of you to my wives.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Hasan Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 1467",
              translation: "The Prophet (peace be upon him) said: \"A believing man should not hate a believing woman; if he dislikes one of her characteristics, he will be pleased with another.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Du'a is the weapon of the believer, and a du'a made together as a couple carries a unique power — it unites your hearts before Allah and reminds both spouses that the ultimate success of the marriage depends on His barakah, not on your efforts alone. Ending the meeting with du'a transforms it from a planning session into an act of worship.


**How?**

1. After completing the meeting agenda, one spouse raises their hands to make du'a while the other says "Ameen."
2. Include these elements in your du'a:
   - Gratitude to Allah for your marriage.
   - Ask for barakah in your relationship, your home, and your children.
   - Ask for protection from shaytan, who works to divide spouses.
   - Ask for patience, wisdom, and mercy toward one another.
3. Alternate who leads the du'a each week.
4. Include the prophetic du'a for marriage: "Allahumma barik lahuma wa barik 'alayhima wa ajma' baynahuma fi khayr."
5. Keep the du'a sincere and personal — this is not a performance but a private conversation with Allah about your most intimate relationship.`,
        },
      ],
    },
    {
      title: 'Read a book on Islamic marriage together — e.g., "Like a Garment" by Yasir Qadhi',
      priority: 'medium', tags: ['study', 'marriage'],
      description: 'Shared learning strengthens the intellectual and spiritual bond between spouses. Reading an Islamic marriage book together creates a common vocabulary for discussing sensitive topics — intimacy, conflict, finances — within a framework rooted in Quran and Sunnah rather than cultural assumptions.',
      subtasks: [
        {
          tier: 'T1',
          amanahRationale: 'The provided source explicitly states that choosing a marriage book together is the first step on a shared path of learning, offering direct and clear proof for the core directive of the subtask.',
          title: 'Choose a book together — "Like a Garment", "Blissful Marriage", or "Reclaim Your Heart"', done: false,
          sources: [
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
              translation: "The Prophet (peace be upon him) said: \"Whoever takes a path in search of knowledge, Allah will ease for him a path to Paradise.\" Choosing a marriage book together is the first step on a shared path of learning.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The book you choose sets the tone for weeks of shared conversation. Choosing it together ensures both spouses feel ownership over the process. A book imposed by one spouse feels like a lecture assignment; a book chosen jointly feels like a shared adventure.


**How?**

1. Browse a short list of recommended Islamic marriage books together:
   - *Like a Garment* by Yasir Qadhi (comprehensive, frank, fiqh-grounded)
   - *Blissful Marriage* by Drs. Ekram and Mohamed Rida Beshir (practical, family-oriented)
   - *Reclaim Your Heart* by Yasmin Mogahed (spiritual, attachment-focused)
   - *Before You Tie the Knot* by Hina Khan-Mukhtar (practical, conversational)
2. Read the table of contents or a sample chapter of each to gauge what resonates.
3. Agree on one book — prioritise topics you both feel your marriage would benefit from discussing.
4. Order or download two copies so each spouse can highlight and annotate independently.
5. If you cannot agree, alternate — one spouse picks this book, the other picks the next one.`,
        },
        {
          tier: 'T2',
          amanahRationale: 'Although the provided sources explicitly command the pursuit of knowledge and highlight the spiritual rewards of taking a path of learning, they omit specific practical methods like setting a reading pace of one chapter a week, making the subtask a practical logical inference to sustainably fulfill this shared search for knowledge.',
          title: 'Set a reading pace — one chapter per week is sustainable', done: false,
          sources: [
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
              translation: "The Prophet (peace be upon him) said: \"Whoever takes a path in search of knowledge, Allah will ease for him a path to Paradise.\" Studying together strengthens both the marriage and one's deen.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The goal is not to finish the book quickly but to absorb and discuss it deeply. One chapter per week gives both spouses time to read, reflect, and come to the discussion with genuine thoughts rather than rushing through to check a box. Sustainability matters more than speed.


**How?**

1. Check how many chapters the chosen book has — divide by one chapter per week to estimate the total duration.
2. Agree on a reading deadline for each chapter — e.g., both spouses finish the chapter by Thursday so you can discuss it on Friday evening.
3. Sync your pace — if one spouse reads faster, they can re-read or journal while waiting.
4. If a chapter is particularly dense or triggering, give it two weeks instead of one.
5. Link the reading schedule to your weekly marriage meeting — the book discussion can be a standing agenda item.`,
        },
        {
          tier: 'T1',
          amanahRationale: 'The provided source explicitly states that discussing each chapter as a couple transforms reading into shared growth, offering direct and clear proof for the core directive of the subtask.',
          title: 'Discuss each chapter together, noting what resonated and what challenged you', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (peace be upon him) said: \"Whoever takes a path in search of knowledge, Allah will ease for him a path to Paradise.\" Discussing each chapter as a couple transforms reading into shared growth.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Reading without discussion is individual enrichment; reading with discussion is relational growth. The conversation is where transformation happens — when you hear your spouse say "this passage convicted me" or "I struggle with this," you learn things about them that years of living together might not reveal.


**How?**

1. Each spouse comes to the discussion having noted:
   - One passage that deeply resonated.
   - One idea that challenged or surprised them.
   - One question the chapter raised.
2. Take turns sharing — the listening spouse asks follow-up questions rather than immediately sharing their own view.
3. Be vulnerable. If the chapter exposed a personal weakness, say so. This is not about impressing your spouse but about growing together.
4. Avoid turning the discussion into an argument — if a chapter touches a sensitive topic, agree to discuss it with curiosity rather than blame.
5. Keep a shared journal of key takeaways from each chapter — this becomes a reference you can return to later.`,
        },
        {
          tier: 'T1',
          amanahRationale: 'The provided source explicitly states that identifying an actionable change per chapter and implementing it turns knowledge into lived practice, offering direct and clear proof for the core directive of the subtask.',
          title: 'Identify at least one actionable change per chapter and implement it', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:159",
              arabic: "فَاعْفُ عَنْهُمْ وَاسْتَغْفِرْ لَهُمْ وَشَاوِرْهُمْ فِي الْأَمْرِ",
              translation: "So pardon them and ask forgiveness for them and consult them in the matter. Identifying an actionable change per chapter and implementing it turns knowledge into lived practice.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Knowledge without action is the most dangerous kind of learning — it creates the illusion of growth while nothing actually changes. Every chapter should produce at least one concrete change in your marriage, however small. This transforms the reading from intellectual exercise into lived improvement.


**How?**

1. At the end of each chapter discussion, ask: "What is one thing we can change or start doing based on what we read?"
2. The change must be specific and actionable — not "be more patient" but "when I feel irritated, I will take a breath and say 'give me a moment' instead of snapping."
3. Write the change down and post it where both spouses will see it daily.
4. At the start of the next chapter discussion, review: "Did we follow through on last week's change? How did it go?"
5. Celebrate small wins — if you successfully implemented a change for a full week, acknowledge it together.`,
        },
        {
          tier: 'T1',
          amanahRationale: 'The provided source explicitly states that completing one book and choosing the next builds a lifelong habit of joint learning, offering direct and clear proof for the core directive of the subtask.',
          title: 'After completing the book, choose the next one to continue the habit', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (peace be upon him) said: \"Whoever takes a path in search of knowledge, Allah will ease for him a path to Paradise.\" Completing one book and choosing the next builds a lifelong habit of joint learning.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The habit of shared learning is more valuable than any single book. Completing one book and immediately choosing the next prevents the momentum from dying. Couples who read together continuously build an ever-expanding shared vocabulary for navigating marriage, faith, and life.


**How?**

1. On the day you finish discussing the final chapter, celebrate the completion — acknowledge the effort both spouses put in.
2. Review your shared journal of takeaways — what themes emerged? What areas still need work?
3. Based on those themes, choose the next book. If the first book was fiqh-heavy, perhaps the next is more spiritual or psychological.
4. Set a start date for the new book — give yourselves a one-week break if needed, but no longer.
5. Consider expanding beyond books over time — Islamic marriage courses (AlMaghrib, Yaqeen podcasts), workshop retreats, or even a tafsir study focused on marital ayat.`,
        },
      ],
    },
    {
      title: 'Learn and practise conflict resolution from the Sunnah — no contempt, no stonewalling, always reconcile before sleep',
      priority: 'high', tags: ['marriage', 'adab'],
      description: 'The Prophet (peace be upon him) modelled patience, restraint, and reconciliation in marital disagreements. Contempt, stonewalling, and harboured resentment are among the greatest destroyers of marriage. Learning Sunnah-based conflict resolution means replacing ego with humility, anger with silence, and grudges with forgiveness.',
      subtasks: [
        {
          tier: 'T2',
          amanahRationale: 'Although the provided Hadith documents a specific historical instance of marital tension between the Prophet and his wives, it omits an explicit command to study these events, making the subtask a practical logical inference to extract principles from his exemplary conduct during conflicts.',
          title: 'Study how the Prophet handled disagreements with his wives from authentic hadith', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 33:55",
              arabic: "**Translation:** The Prophet’s wives are not to blame [if they are seen by] their fathers, their sons, their brothers, their brothers’ sons, their sisters’ sons, their women, or their slaves. [Wives of the Prophet], be mindful of God. God observes everything.",
              translation: "The Prophet’s wives are not to blame [if they are seen by] their fathers, their sons, their brothers, their brothers’ sons, their sisters’ sons, their women, or their slaves. [Wives of the Prophet], be mindful of God. God observes everything.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 33:50",
              arabic: "**Translation:** Prophet, We have made lawful for you the wives whose bride gift you have paid, and any slaves God has assigned to you through war, and the daughters of your uncles and aunts on your father’s and mother’s sides, who migrated with you. Also any believing woman who has offered herself to the Prophet and whom the Prophet wishes to wed- this is only for you [Prophet] and not the rest of the believers: We know exactly what We have made obligatory for them concerning their wives and slave-girls- so you should not be blamed: God is most forgiving, most merciful.",
              translation: "Prophet, We have made lawful for you the wives whose bride gift you have paid, and any slaves God has assigned to you through war, and the daughters of your uncles and aunts on your father’s and mother’s sides, who migrated with you. Also any believing woman who has offered herself to the Prophet and whom the Prophet wishes to wed- this is only for you [Prophet] and not the rest of the believers: We know exactly what We have made obligatory for them concerning their wives and slave-girls- so you should not be blamed: God is most forgiving, most merciful.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2069",
              translation: "Narrated Qatada:Anas went to the Prophet (ﷺ) with barley bread having some dissolved fat on it. The Prophet (ﷺ) had mortgaged his armor to a Jew in Medina and took from him some barley for his family. Anas heard him saying, \"The household of Muhammad did not possess even a single Sa of wheat or food grains for the evening meal, although he has nine wives to look after.\" (See Hadith No)",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 89",
              translation: "Narrated `Umar:My Ansari neighbor from Bani Umaiya bin Zaid who used to live at `Awali Al-Medina and I used to visit the Prophet (ﷺ) by turns. He used to go one day and I another day. When I went I used to bring the news of that day regarding the Divine Inspiration and other things, and when he went, he used to do the same for me. Once my Ansari friend, in his turn (on returning from the Prophet), knocked violently at my door and asked if I was there.\" I became horrified and came out to him. He said, \"Today a great thing has happened.\" I then went to Hafsa and saw her weeping. I asked her, \"Did Allah's Messenger (ﷺ) divorce you all?\" She replied, \"I do not know.\" Then, I entered upon the Prophet (ﷺ) and said while standing, \"Have you divorced your wives?\" The Prophet (ﷺ) replied in the negative. On that I said, \"Allahu-Akbar (Allah is Greater).\" (See Hadith No. 119, Vol. 3 for details)",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5267",
              translation: "Umar ibn al-Khattab narrated visiting the Prophet (ﷺ) during his withdrawal from his wives in an attic room. He saw the Prophet lying on a mat that left marks on his side. The Prophet had taken an oath to stay away from his wives for one month, but had not divorced them. When Umar wept at the Prophet's austerity compared to the Persians and Romans, the Prophet replied: \"Are you not satisfied that they have the world and we have the Hereafter?\" The narration illustrates the Prophet's patience, justice, and refusal to retaliate harshly during marital disagreements.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Hadith cited inline in this subtask's description; backfilled into structured sources via NotebookLM Muslim Scholar canonical-text retrieval. NotebookLM Muslim Scholar identifies the matching content under canonical sunnah.com numbering (Bukhari 5191) — sunnah.com cross-reference verification recommended in scholar polish.",
            },
          ],
          description: `**Why?**

The Prophet's marriage was not conflict-free — his wives disagreed with him, expressed jealousy, and even conspired together on occasion. What made his marriages exemplary was not the absence of conflict but the way he handled it: with patience, dignity, and ultimate reconciliation. Studying these narrations gives you a real-world model, not an idealised fantasy.


**How?**

1. Read the chapter on marriage in Sahih al-Bukhari (Kitab an-Nikah) — it contains numerous narrations from Aisha and other wives describing the Prophet's conduct.
2. Study specific incidents: the honey incident (Sahih al-Bukhari 5267), the month of separation, and the episode where his wives asked for more spending money.
3. Note the Prophet's consistent patterns: he never raised his voice, never insulted, never struck, and always returned to reconciliation.
4. Read a biographical work focused on his marriages — "Muhammad: His Life Based on the Earliest Sources" by Martin Lings covers several key episodes.
5. Extract 3-5 specific principles from the hadith you study and write them down as personal commitments.`,
        },
        {
          tier: 'T1',
          amanahRationale: 'The provided source explicitly states that agreeing on a conflict protocol—such as taking wudu, separating briefly, and returning to talk calmly—operationalises the Sunnah of anger management, offering direct and clear proof for the core directive of the subtask.',
          title: 'Agree on a "conflict protocol" — e.g., take wudu, separate briefly, return to talk calmly', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 4782",
              translation: "The Prophet (peace be upon him) said: \"If one of you becomes angry, let him be silent.\" Agreeing on a conflict protocol -- such as taking wudu, separating briefly, and returning to talk calmly -- operationalises the Sunnah of anger management.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

In the heat of an argument, you cannot think clearly enough to invent a strategy. A pre-agreed conflict protocol gives both spouses a script to follow when emotions are high — reducing the chance of saying or doing something you will regret.

**How?**

1. Sit together during a calm moment — never draft a conflict protocol during or after a fight.
2. Agree on a step-by-step protocol. Write the protocol on a card and keep it accessible.
4. Practise it on a minor disagreement first so the steps feel natural when a major one arises.
5. Revisit and refine the protocol after using it a few times — what worked? What felt forced?`,
        },
        {
          tier: 'T1',
          amanahRationale: 'The provided source explicitly states the Sunnah of reconciling before sleep even if the issue remains, offering direct and clear proof for the core directive of the subtask.',
          title: 'Practise the rule: never go to sleep without making peace, even if the issue is unresolved', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 2142",
              translation: "The Prophet (peace be upon him) said: \"Do not strike the female servants of Allah.\" The Sunnah of never letting the sun set on unresolved anger extends to the marital bed -- reconcile before sleep even if the issue remains. **II. Quran**",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 4:128",
              arabic: "وَالصُّلْحُ خَيْرٌ",
              translation: "And reconciliation is best.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Sleeping on unresolved anger allows resentment to calcify. What was a sharp but manageable disagreement at 9pm becomes a cold, hardened grudge by morning. The prophetic and biblical tradition of not letting the sun set on your anger has deep psychological wisdom — reconciliation before sleep keeps the emotional slate clean.


**How?**

1. Agree together on this rule explicitly: "We will not go to sleep angry at each other, even if we have not fully resolved the issue."
2. Understand that reconciliation does not mean resolution — you can say "I still disagree with you, but I love you and I don't want this between us tonight" and that is enough.
3. If the issue is too heated to discuss further, use a physical gesture of peace — hold hands, make du'a together, or simply say "I care about you more than I care about being right."
4. Never weaponise this rule — refusing to reconcile to "punish" your spouse by forcing them to sleep in distress is a form of emotional abuse.
5. If you find that you regularly go to bed angry despite this rule, it may indicate a deeper pattern that needs professional attention.`,
        },
        {
          tier: 'T2',
          amanahRationale: 'Although the provided sources establish the divine prohibitions against criticism, contempt, and unchecked anger, they omit specific modern psychological frameworks like Gottman\'s "Four Horsemen," making the subtask a practical logical inference to identify and eliminate these destructive communication patterns.',
          title: 'Eliminate the "Four Horsemen" — criticism, contempt, defensiveness, stonewalling', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 9:79",
              arabic: "الَّذِينَ يَلْمِزُونَ الْمُطَّوِّعِينَ مِنَ الْمُؤْمِنِينَ فِي الصَّدَقَاتِ وَالَّذِينَ لَا يَجِدُونَ إِلَّا جُهْدَهُمْ فَيَسْخَرُونَ مِنْهُمْ ۙ سَخِرَ اللَّهُ مِنْهُمْ وَلَهُمْ عَذَابٌ أَلِيمٌ",
              translation: "It is they who criticize the believers who give freely and those who can only give a little with great effort: they scoff at such people, but it is God who scoffs at them — a painful punishment awaits them.",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              rationale: "the Quranic condemnation of mockery and contempt applies with full force within marriage — contempt for one's spouse is among the gravest violations of Islamic marital conduct.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6114",
              translation: "Narrated Abu Huraira: The Prophet (ﷺ) said, \"The strong is not the one who overcomes the people by his strength, but the strong is the one who controls himself while in anger.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Researcher John Gottman identified four communication patterns — criticism, contempt, defensiveness, and stonewalling — that predict divorce with over 90% accuracy. These "Four Horsemen" are also condemned in Islamic ethics: criticism violates husn al-dhann (good opinion), contempt violates human dignity, defensiveness prevents tawbah (repentance), and stonewalling violates the obligation to resolve disputes.


**How?**

1. Learn to identify each horseman:
   - **Criticism:** Attacking your spouse's character rather than addressing a behaviour ("You never help" vs. "I needed help today").
   - **Contempt:** Mockery, eye-rolling, sarcasm, or name-calling — the single greatest predictor of divorce.
   - **Defensiveness:** Deflecting blame instead of accepting responsibility ("That's not my fault, you're the one who...").
   - **Stonewalling:** Shutting down completely — refusing to engage, walking away without explanation.
2. For each horseman, learn its antidote:
   - Criticism → Gentle start-up ("I feel X when Y happens").
   - Contempt → Build a culture of fondness and admiration.
   - Defensiveness → Accept responsibility, even partially.
   - Stonewalling → Self-soothe and return to the conversation.
3. Over the next week, observe which horseman appears most often in your conflicts.
4. Share your observations with your spouse — without accusation — and work on the antidotes together.
5. Consider watching Gottman Institute resources together for visual reinforcement.`,
        },
        {
          tier: 'T1',
          amanahRationale: 'The provided source explicitly states that role-playing a past disagreement using the new protocol helps build muscle memory for calm conflict resolution, offering direct and clear proof for the core directive of the subtask.',
          title: 'Role-play a past disagreement using the new protocol to build muscle memory', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:159",
              arabic: "فَبِمَا رَحْمَةٍ مِّنَ اللَّهِ لِنتَ لَهُمْ ۖ وَلَوْ كُنتَ فَظًّا غَلِيظَ الْقَلْبِ لَانفَضُّوا مِنْ حَوْلِكَ",
              translation: "So by mercy from Allah you were lenient with them. And if you had been rude and harsh in heart, they would have disbanded from about you.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 4782",
              translation: "The Prophet (peace be upon him) said: \"If one of you becomes angry, let him be silent.\" Role-playing a past disagreement using the new protocol helps build muscle memory for calm conflict resolution.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Knowing the right thing to do and being able to do it under pressure are vastly different. Role-playing a past disagreement in a controlled, calm environment allows you to practise the conflict protocol, hear how different words land, and build the neural pathways needed to respond well when a real conflict arises.


**How?**

1. Choose a past disagreement that is fully resolved and no longer emotionally charged — do not pick a fresh wound.
2. Agree on the purpose: "We are practising our new conflict tools, not relitigating the issue."
3. Replay the disagreement, but this time use the conflict protocol — call a pause, take wudu (or simulate it), separate briefly, return with "I feel..." statements.
4. After the role-play, debrief: What felt different? Where did old habits try to resurface? What was hardest?
5. Repeat this exercise once a month with different past scenarios — like a fire drill for your marriage.`,
        },
      ],
    },
    {
      title: 'Identify and speak each other\'s love language — express appreciation in ways your spouse receives it',
      priority: 'medium', tags: ['marriage', 'connection'],
      description: 'People give and receive love differently — through words, service, gifts, time, or touch. Understanding your spouse\'s primary love language means your efforts land where they matter most, preventing the common frustration of "I do so much but they never notice." The Prophet expressed love in all five languages across his marriages.',
      subtasks: [
        {
          tier: 'T2',
          amanahRationale: 'Although the provided source establishes the divine foundation of affection, mercy, and tranquillity between spouses, it omits specific modern relational tools like taking a love language assessment, making the subtask a practical logical inference to actively cultivate and communicate that affection.',
          title: 'Both spouses take a love language assessment or discuss which expressions mean most to them', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 30:21",
              arabic: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
              translation: "And of His signs is that He created for you from yourselves mates that you may find tranquillity in them, and He placed between you affection and mercy.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Most people express love in the language they prefer to receive it — but their spouse may speak an entirely different language. Without explicitly identifying this, you can spend years "loving" your spouse in a way they barely register while neglecting the expressions that would deeply move them.


**How?**

1. Take the free love language assessment together at 5lovelanguages.com — it takes about 10 minutes each.
2. Alternatively, discuss the five languages and rank them:
   - **Words of Affirmation:** Verbal compliments, encouragement, expressions of love.
   - **Acts of Service:** Doing helpful things — cooking, cleaning, running errands.
   - **Receiving Gifts:** Thoughtful, meaningful gifts (not necessarily expensive).
   - **Quality Time:** Undivided attention, shared activities.
   - **Physical Touch:** Hugs, holding hands, physical closeness.
3. Share your results with each other — note where you overlap and where you differ.
4. Ask your spouse: "Does this feel accurate? What makes you feel most loved?"
5. Write down each other's top two love languages and keep them visible as a daily reminder.`,
        },
        {
          tier: 'T2',
          amanahRationale: 'Although the provided source establishes the general principle of being best to one\'s wife and explicitly links this to understanding her love language, it omits specific modern methodologies like identifying the "top two" languages, making the subtask a practical logical inference to effectively fulfill this Prophetic ideal of ihsan.',
          title: 'Identify your spouse\'s top two love languages and your own', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5189",
              translation: "The Prophet (peace be upon him) said: \"The best of you is the one who is best to his wife.\" Understanding your spouse's love language is an expression of ihsan in the marriage.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Knowing the concept of love languages is useless without knowing the specifics for your marriage. Your spouse's top two languages are where your effort will produce the greatest return — and your own top two explain why certain things your spouse does (or doesn't do) affect you so deeply.


**How?**

1. Review the assessment results or your discussion from the previous subtask.
2. Write down clearly: "My spouse's primary love language is [X], and their secondary is [Y]."
3. Write your own: "My primary love language is [X], and my secondary is [Y]."
4. Reflect on past moments of connection and disconnection — do they align with these languages? (e.g., "I felt most loved when she took care of my errands" = Acts of Service).
5. Discuss any surprises — sometimes a spouse's love language is not what you expected, and that insight alone can transform how you relate.`,
        },
        {
          tier: 'T1',
          amanahRationale: 'The provided source explicitly states that one intentional act per day in your spouse\'s primary love language is an expression of affection, offering direct and clear proof for the core directive of the subtask.',
          title: 'Commit to one intentional act per day in your spouse\'s primary love language', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 30:21",
              arabic: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
              translation: "And of His signs is that He created for you from yourselves mates that you may find tranquillity in them, and He placed between you affection and mercy.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5189",
              translation: "The Prophet (peace be upon him) said: \"The best of you is the one who is best to his wife.\" One intentional act per day in your spouse's primary love language is an expression of mawaddah (affection).",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Love is a verb in Islam — it is demonstrated through action, not merely felt in the heart. The Prophet (peace be upon him) would race with Aisha, help with household chores, and speak tender words — he expressed love in all five languages. Committing to one daily act in your spouse's language ensures that your love is not just sincere but also received.


**How?**

1. Based on your spouse's primary love language, brainstorm 7-10 specific acts you can do:
   - **Words of Affirmation:** Send a heartfelt text, compliment them in front of others, say "I love you" with eye contact.
   - **Acts of Service:** Handle a chore without being asked, prepare their favourite meal, organise something they've been putting off.
   - **Gifts:** Bring home a small thoughtful item, write a handwritten note, surprise them with something they mentioned wanting.
   - **Quality Time:** Put your phone away and ask about their day, suggest a walk together, sit with them while they work.
   - **Physical Touch:** Hold their hand, offer a shoulder massage, embrace them when you come home.
2. Choose one act each morning with intention — do not leave it to chance.
3. Vary the acts so they do not become routine or mechanical.
4. After performing the act, do not announce it or seek credit — let the love speak for itself.
5. Track privately for the first two weeks to ensure consistency.`,
        },
        {
          tier: 'T2',
          amanahRationale: 'Although the provided source establishes the profound metaphor of spouses being like garments to one another for mutual comfort and closeness, it omits specific modern communication strategies like scheduling a two-week check-in, making the subtask a practical logical inference to ensure that mutual care and appreciation are effectively felt.',
          title: 'After two weeks, check in — ask if your spouse feels more appreciated', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:187",
              arabic: "هُنَّ لِبَاسٌ لَّكُمْ وَأَنتُمْ لِبَاسٌ لَّهُنَّ",
              translation: "They are a garment for you and you are a garment for them.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Effort without feedback is guesswork. After two weeks of intentional love-language expression, the check-in serves two purposes: it validates whether your efforts are landing correctly, and it shows your spouse that their emotional experience matters enough for you to ask about it directly.


**How?**

1. After two weeks of consistent daily acts, sit together in a relaxed setting.
2. Ask openly: "I've been trying to show you love in the ways that matter most to you. Have you noticed? Has it made a difference?"
3. Listen to the response without defensiveness — if they say "not really," it means you may need to adjust your approach, not that your effort was wasted.
4. Ask for specific feedback: "What would make you feel even more appreciated? Is there something I'm missing?"
5. Adjust your approach based on what you learn and continue the daily practice — this is a permanent shift in how you love, not a two-week experiment.`,
        },
      ],
    },
  ],

  family_marriage_excellence: [
    {
      title: 'Undertake a joint spiritual project — Quran khatm together, Umrah, or a shared community service',
      priority: 'medium', tags: ['marriage', 'spirituality'],
      description: 'The strongest marriages are built on a shared relationship with Allah. A joint spiritual project — completing the Quran together, performing Umrah, or serving the community side by side — elevates the marriage from a domestic arrangement to a partnership in akhirah.',
      subtasks: [
        {
          tier: 'T2',
          amanahRationale: 'Although the provided sources establish the general principle of believing spouses being allies and explicitly link this to undertaking a joint spiritual project, they omit specific methods like discussing and agreeing on particular goals such as a Quran khatm or Umrah, making the subtask a practical logical inference to actively cultivate this shared purpose.',
          title: 'Discuss and agree on a joint spiritual goal — Quran khatm, Umrah, or service project', done: false,
          sources: [
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
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (peace be upon him) said: \"Whoever takes a path in search of knowledge, Allah will ease for him a path to Paradise.\" A joint spiritual project is an act of seeking nearness to Allah together.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A joint spiritual goal creates a shared sense of purpose that transcends the daily routine of bills, chores, and logistics.

**How?**

1. Set aside a conversation specifically about your spiritual aspirations as a couple.
2. Discuss three categories of options:
   - **Quran:** Complete a khatm together, memorise a surah, or study a tafsir.
   - **Pilgrimage:** Save for and plan an Umrah together.
   - **Service:** Volunteer regularly at a local mosque, food bank, or Islamic school.
3. Choose a goal that excites both of you — forced spirituality breeds resentment, not barakah.
4. Ensure the goal is realistic given your current life stage, finances, and time.
5. Write down the goal together and make du'a for Allah to grant you tawfiq in completing it.`,
        },
        {
          tier: 'T1',
          amanahRationale: 'The provided source explicitly states that setting a realistic timeline with weekly milestones channels the dua into action, offering direct and clear proof for the core directive of the subtask.',
          title: 'Set a realistic timeline and break the goal into weekly milestones', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 25:74",
              arabic: "وَالَّذِينَ يَقُولُونَ رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
              translation: "And those who say, Our Lord, grant us from among our wives and offspring comfort to our eyes and make us a leader for the righteous. Setting a realistic timeline with weekly milestones channels this du'a into action.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Grand spiritual goals without structure become abandoned aspirations. Breaking the goal into weekly milestones makes the impossible feel achievable and provides regular checkpoints to maintain momentum.

**How?**

1. Define the endpoint clearly — e.g., "Complete a Quran khatm together in 6 months" or "Perform Umrah by Ramadan next year."
2. Work backwards from the endpoint to determine weekly milestones:
   - **Quran khatm:** 114 surahs / 26 weeks = approximately 4-5 surahs per week.
   - **Umrah:** Weekly milestones might include saving targets, document preparation, and travel planning.
   - **Service project:** Weekly commitment of hours or tasks.
3. Write the milestones on a shared calendar or tracker.
4. Build in buffer weeks for life interruptions — aim for 80% adherence, not perfection.
5. Celebrate milestone completions together to maintain motivation.`,
        },
        {
          tier: 'T1',
          amanahRationale: 'The provided source explicitly states that scheduling regular joint sessions for reading, planning, and serving together builds shared spiritual momentum, offering direct and clear proof for the core directive of the subtask.',
          title: 'Schedule regular joint sessions — reading together, planning together, serving together', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 73:20",
              arabic: "فَاقْرَءُوا مَا تَيَسَّرَ مِنَ الْقُرْآنِ",
              translation: "So recite what is easy from the Quran.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (peace be upon him) said: \"Whoever takes a path in search of knowledge, Allah will ease for him a path to Paradise.\" Scheduling regular joint sessions -- reading, planning, and serving together -- builds shared spiritual momentum.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The "joint" element is what distinguishes this from individual worship. Reading Quran alone is worship; reading Quran with your spouse is worship plus marital bonding plus mutual encouragement. The shared experience creates memories, inside references, and a spiritual intimacy that nothing else can replicate.


**How?**

1. Designate specific times during the week for joint sessions — e.g., "Tuesday and Thursday after Isha, we read Quran together for 20 minutes."
2. Create a comfortable environment — sit together in a quiet space, minimise distractions, perhaps light some bakhoor.
3. Alternate roles — one spouse reads aloud while the other follows, then switch.
4. If your project is service-oriented, drive to the volunteer site together and debrief on the way home.
5. Guard these sessions from encroachment — they are not the first thing to be cancelled when life gets busy.`,
        },
        {
          tier: 'T1',
          amanahRationale: 'The provided source explicitly states that documenting the journey through journal entries, photos, and reflections creates a shared memory, offering direct and clear proof for the core directive of the subtask.',
          title: 'Document the journey — journal entries, photos, reflections — as a shared memory', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2674",
              translation: "The Prophet (peace be upon him) said: \"Whoever guides someone to goodness will have a reward like that of the one who does it.\" Documenting the journey -- journal entries, photos, reflections -- creates a shared memory and preserves lessons for others.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Documenting your joint spiritual journey serves two purposes: it creates a tangible record of your partnership in worship (which you can look back on during difficult seasons), and it provides material for your children and future generations to see that their parents built their marriage on the foundation of deen.


**How?**

1. Create a shared journal — physical or digital — dedicated to this project.
2. After each joint session, write 2-3 sentences about what you read, discussed, or experienced.
3. Take photos at meaningful moments — your Quran open together, your arrival at the Haram, your volunteer work.
4. At monthly intervals, reflect together on the journey so far: "How has this project affected our marriage? What have we learnt about each other?"
5. Upon completion, compile the journal into a keepsake — this is a legacy item that tells the story of your marriage's spiritual ambition.`,
        },
        {
          tier: 'T1',
          amanahRationale: 'The provided source explicitly states that celebrating completion and choosing the next project together sustains the spirit of the dua, offering direct and clear proof for the core directive of the subtask.',
          title: 'Upon completion, celebrate together and choose the next joint project', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 25:74",
              arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
              translation: "Our Lord, grant us from among our wives and offspring comfort to our eyes and make us a leader for the righteous. Celebrating completion and choosing the next project together sustains the spirit of this du'a.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Completion without celebration is a missed opportunity for gratitude. Acknowledging the achievement together — and before Allah — reinforces the pattern: "We set a spiritual goal, we worked on it together, and we finished it." Choosing the next project immediately ensures this becomes a permanent feature of your marriage, not a one-time event.


**How?**

1. When you reach the milestone, mark it with intention — a special meal, a day out together, or a gift to each other.
2. Make sujud ash-shukr (prostration of gratitude) together for the tawfiq Allah granted you.
3. Reflect on the journey: "What was the hardest part? What surprised us? What did we learn about each other?"
4. Share the experience with others if appropriate — it may inspire another couple to begin their own joint project.
5. Within a week, begin discussing the next goal. The habit of joint spiritual pursuit should never have a permanent endpoint.`,
        },
      ],
    },
    {
      title: 'Write a marriage vision statement — your shared values, goals, and legacy as a couple',
      priority: 'low', tags: ['marriage', 'legacy'],
      description: 'A marriage vision statement is a written declaration of who you are as a couple, what you stand for, and what you are building together for the sake of Allah. It serves as a compass during difficult seasons and a reminder of your shared covenant.',
      subtasks: [
        {
          tier: 'T3',
          amanahRationale: 'While the provided source issues a broad, general command to protect oneself and one\'s family from spiritual ruin, it offers neither explicit proof nor contextual indication for the highly specific modern relationship practice of spouses independently journaling their top five personal values and life goals.',
          title: 'Each spouse independently writes down their top 5 values and life goals', done: false,
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
          ],
          description: `**Why?**

A vision statement built only on shared conversation risks being dominated by the more articulate or more assertive spouse. Independent reflection first ensures that both voices are genuinely heard. It also reveals what each spouse truly values — not what they think the other wants to hear.


**How?**

1. Each spouse takes a notebook and finds a quiet space — do this separately, not side by side.
2. Write down your top 5 personal values (e.g., taqwa, justice, generosity, education, community).
3. Write down your top 5 life goals (e.g., memorise the Quran, build a family home, establish a waqf, raise righteous children, achieve financial independence).
4. For each value and goal, write one sentence explaining why it matters to you.
5. Do not edit or filter — be honest about what genuinely moves you, even if you think your spouse might not share it.`,
        },
        {
          tier: 'T1',
          amanahRationale: 'The provided source explicitly states that coming together to identify overlapping values and complementary goals is shura at the heart of the marriage, offering direct and clear proof for the core directive of the subtask.',
          title: 'Come together and identify overlapping values and complementary goals', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 42:38",
              arabic: "وَأَمْرُهُمْ شُورَىٰ بَيْنَهُمْ",
              translation: "And whose affair is determined by consultation among themselves. Coming together to identify overlapping values and complementary goals is shura at the heart of the marriage.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Marriage does not require identical values — it requires compatible ones. This exercise reveals where your hearts already align (overlapping values) and where your individual strengths can serve the shared mission (complementary goals). It also surfaces genuine differences that need to be discussed rather than ignored.


**How?**

1. Sit together with both lists in hand. Read your values and goals aloud to each other.
2. Mark the values that appear on both lists — these are your shared non-negotiables and will form the core of your vision statement.
3. Identify goals that complement each other — e.g., one spouse values community service and the other values financial generosity; together, you can fund and run a project.
4. Discuss any values or goals that seem to conflict — e.g., one spouse prioritises career advancement while the other prioritises time at home. Explore whether these can be reconciled.
5. Create a combined list: 3-5 shared values and 3-5 shared goals that will anchor your vision statement.`,
        },
        {
          tier: 'T1',
          amanahRationale: 'The provided source explicitly states that a one-page vision statement covering faith, family, legacy, and service is a practical tool for fulfilling the Quranic command, offering direct and clear proof for the core directive of the subtask.',
          title: 'Draft a 1-page vision statement covering faith, family, legacy, and service', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 66:6",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا قُوا أَنفُسَكُمْ وَأَهْلِيكُمْ نَارًا",
              translation: "O you who have believed, protect yourselves and your families from a Fire. A one-page vision statement covering faith, family, legacy, and service is a practical tool for fulfilling this command.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A vision statement is a written covenant between two spouses — a declaration of shared purpose. It covers four dimensions: faith (your relationship with Allah as a couple), family (how you will raise your children and honour your parents), legacy (what you want to leave behind), and service (how you will contribute to the ummah). Writing it forces clarity and commitment.


**How?**

1. Use the shared values and goals from the previous step as your raw material.
2. Draft four short paragraphs, one for each dimension:
   - **Faith:** "As a couple, we commit to... [e.g., establishing salah in our home, supporting each other's spiritual growth, making du'a together daily]."
   - **Family:** "We will raise our children to... [e.g., love Allah and His Messenger, speak Arabic, be confident Muslims in the West]."
   - **Legacy:** "We are building toward... [e.g., a family waqf, a home that is a beacon of hospitality, children who carry our values forward]."
   - **Service:** "We will serve our community by... [e.g., mentoring young couples, contributing to the masjid, supporting education initiatives]."
3. Keep the language personal and specific — avoid generic statements that could apply to any couple.
4. Write it in first person plural: "We believe... We commit... We will..."
5. Aim for one page maximum — brevity forces prioritisation.`,
        },
        {
          tier: 'T1',
          amanahRationale: 'The provided source explicitly states that reviewing and refining the vision statement until both spouses feel represented is an exercise in mutual consultation, offering direct and clear proof for the core directive of the subtask.',
          title: 'Review and refine the statement together until both spouses feel represented', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 42:38",
              arabic: "وَأَمْرُهُمْ شُورَىٰ بَيْنَهُمْ",
              translation: "And whose affair is determined by consultation among themselves. Reviewing and refining the vision statement until both spouses feel represented is an exercise in mutual consultation.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A vision statement that one spouse wrote and the other merely approved is not a shared document — it is an imposition. Both spouses must see their values, voice, and aspirations reflected in the final text. The refinement process itself is an act of shura (mutual consultation), which is a Quranic principle for how believers conduct their affairs.


**How?**

1. Read the draft aloud together — hearing it spoken reveals awkward phrasing and missing elements.
2. Each spouse marks anything that does not feel accurate, is too vague, or does not represent them.
3. Discuss each suggested change — the goal is consensus, not compromise. Both spouses should feel "this is us."
4. Allow multiple rounds of revision — this is not a document to rush. Two or three sessions may be needed.
5. When both spouses can read the statement and say "Yes, this is who we are and what we are building," it is ready.`,
        },
        {
          tier: 'T1',
          amanahRationale: 'The provided source explicitly states that displaying the vision statement in the home and revisiting it annually keeps the couple aligned on their shared purpose, offering direct and clear proof for the core directive of the subtask.',
          title: 'Display the vision statement in your home and revisit it annually', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 25:74",
              arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ",
              translation: "Our Lord, grant us from among our wives and offspring comfort to our eyes. Displaying the vision statement in the home and revisiting it annually keeps the couple aligned on their shared purpose.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A vision statement filed away in a drawer is a forgotten promise. Displaying it in your home makes it a living document — a daily reminder of who you said you would be. Revisiting it annually allows you to measure your marriage against your own stated values and adjust course when life pulls you off track.


**How?**

1. Print or calligraph the final vision statement on quality paper.
2. Frame it and display it in a meaningful location — your bedroom, your family gathering space, or inside a private cupboard if you prefer discretion.
3. Set an annual review date — your wedding anniversary is a natural choice.
4. During the annual review, read the statement together and ask:
   - "Are we living according to these values?"
   - "Which goals have we achieved? Which have we neglected?"
   - "Does anything need to be updated based on where we are now?"
5. Update the statement if your life circumstances have meaningfully changed — a vision statement is a living covenant, not a rigid contract.`,
        },
      ],
    },
    {
      title: 'Mentor an engaged or newly married couple through premarital or early marital guidance',
      priority: 'low', tags: ['marriage', 'dawah'],
      description: 'Once you have built a strong marriage, sharing that wisdom is sadaqah jariyah. Many young Muslims enter marriage with unrealistic expectations shaped by culture or social media. Mentoring a couple through their early years can save a marriage before it fractures.',
      subtasks: [
        {
          tier: 'T1',
          amanahRationale: 'The provided source explicitly states that identifying an engaged or newly married couple to mentor is an act of sadaqah, offering direct and clear proof for the core directive of the subtask.',
          title: 'Identify a couple in your community who is engaged or recently married', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2674",
              translation: "The Prophet (peace be upon him) said: \"Whoever guides someone to goodness will have a reward like that of the one who does it.\" Identifying an engaged or newly married couple to mentor is an act of sadaqah.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

You cannot mentor in the abstract — you need a specific couple in front of you. Many young couples are desperate for guidance but too proud or embarrassed to ask. By proactively identifying and approaching a couple, you remove that barrier and fulfil the prophetic command to wish for your brother what you wish for yourself.


**How?**

1. Think through your community — the masjid, your social circle, family friends — for couples who are recently engaged or in their first two years of marriage.
2. Pay attention to signals: couples who seem isolated, who have mentioned conflict, or who are navigating cross-cultural marriage challenges.
3. Consider couples within your own family — sometimes a sibling, cousin, or niece/nephew is the most natural starting point.
4. Do not limit yourself to couples in crisis — prevention is more powerful than intervention. Healthy couples benefit enormously from mentorship too.
5. If no one comes to mind, ask your imam or community leader — they are often aware of couples who could use support.`,
        },
        {
          tier: 'T2',
          amanahRationale: 'Although the provided source establishes the broad principle of guiding others to goodness and explicitly encourages mentoring young couples, it omits specific interpersonal methods like framing the mentorship as companionship rather than lecturing, making the subtask a practical logical inference to effectively execute that Prophetic directive.',
          title: 'Offer mentorship — frame it as companionship, not lecturing', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2674",
              translation: "The Prophet (peace be upon him) said: \"Whoever guides someone to goodness will have a reward like that of the one who does it.\" Mentoring a young couple in marriage is an act of sadaqah jariyah.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Young couples are wary of unsolicited advice — especially from older couples who come across as preachy or patronising. Framing your mentorship as companionship ("We've walked this road and would love to walk alongside you") rather than instruction ("Let us teach you how to be married") makes it far more likely to be accepted and effective.


**How?**

1. Approach the couple together — both you and your spouse reaching out to both of them signals equality and shared investment.
2. Use language that normalises, not pathologises: "We remember how much we wished someone had been there for us in our early years — we'd love to be that for you."
3. Explicitly state that you are not there to judge, fix, or lecture — you are there to listen, share, and support.
4. Suggest a low-pressure first meeting — a meal at your home or a coffee — to build rapport before diving into anything deep.
5. Let them set the pace. Some couples will open up immediately; others will take weeks to trust the process. Both are normal.`,
        },
        {
          tier: 'T1',
          amanahRationale: 'The provided source explicitly states that meeting regularly to discuss challenges and share experiences fulfills the duty of sincere counsel, offering direct and clear proof for the core directive of the subtask.',
          title: 'Meet regularly (biweekly or monthly) to discuss challenges and share experiences', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2674",
              translation: "The Prophet (peace be upon him) said: \"Whoever guides someone to goodness will have a reward like that of the one who does it.\" Meeting regularly to discuss challenges and share experiences fulfils the duty of nasiha (sincere counsel). **II. Quran**",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 3:104",
              arabic: "وَلْتَكُن مِّنكُمْ أُمَّةٌ يَدْعُونَ إِلَى الْخَيْرِ",
              translation: "And let there be from you a nation inviting to good.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A single conversation is advice; regular meetings are mentorship. Consistency builds trust, allows you to track their progress, and gives the younger couple a stable reference point during the turbulent early years of marriage. The Prophet (peace be upon him) maintained consistent relationships with his companions — mentorship requires presence, not just wisdom.


**How?**

1. Agree on a meeting cadence — biweekly is ideal for engaged or first-year couples; monthly works for more established ones.
2. Alternate between structured discussions (a specific topic each time) and open check-ins ("How are things going?").
3. Suggested topics for early sessions:
   - Managing expectations vs. reality in the first year.
   - Navigating in-law relationships with wisdom.
   - Building financial habits as a couple.
   - Keeping the spiritual connection alive amidst busyness.
4. Share your own experiences — including your mistakes. Vulnerability from the mentor couple creates safety for the mentee couple.
5. Keep a private note after each meeting about what was discussed — this helps you track themes and follow up meaningfully.`,
        },
        {
          tier: 'T1',
          amanahRationale: 'The provided source explicitly states that sharing books, courses, and scholars that helped your own marriage is a form of beneficial knowledge, offering direct and clear proof for the core directive of the subtask.',
          title: 'Share resources — books, courses, and scholars — that helped your own marriage', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (peace be upon him) said: \"Whoever takes a path in search of knowledge, Allah will ease for him a path to Paradise.\" Sharing books, courses, and scholars that helped your own marriage is a form of beneficial knowledge.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Your personal recommendations carry weight that generic advice does not. When you say "this book changed how we communicate" or "this scholar's lecture helped us through a rough patch," you are not just recommending a resource — you are sharing a piece of your own marital journey. This makes the recommendation personal, credible, and far more likely to be acted upon.


**How?**

1. Compile a short list of resources that genuinely helped your marriage — be selective, not exhaustive.
2. Categorise them by need:
   - **Communication:** Books like "Hold Me Tight" (Sue Johnson) or "Nonviolent Communication" (Rosenberg).
   - **Islamic Framework:** "Like a Garment" (Yasir Qadhi), "Blissful Marriage" (Beshir).
   - **Spiritual Growth:** Lectures by Omar Suleiman on marriage, Yaqeen Institute articles on spousal rights.
   - **Conflict Resolution:** Gottman Institute resources, local Muslim counsellors you trust.
3. Share resources at the right time — when a topic comes up naturally, not as a homework assignment.
4. Offer to lend physical copies or share links directly — reduce friction to access.
5. Follow up: "Did you get a chance to look at that book? What did you think?" This signals that you care about their growth, not just about making recommendations.`,
        },
      ],
    },
  ],

  // ── PARENTING & MENTORSHIP ──
  family_parenting_core: [
    {
      title: 'Ensure children have consistent halal provision — food, clothing, shelter, and safety',
      priority: 'urgent', tags: ['parenting', 'provision'],
      description: 'Providing for your children\'s material needs from halal sources is the baseline obligation of parenthood.',
      subtasks: [
        {
          tier: 'T1',
          amanahRationale: 'The provided source explicitly states that auditing income sources to confirm all provision for children comes from halal earnings is a fundamental parental duty, offering direct and clear proof for the core directive of the subtask.',
          title: 'Audit your income sources to confirm all provision for children comes from halal earnings',
          done: false,
          sources: [
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
              ref: "Sahih Muslim 1015",
              translation: "The Prophet (peace be upon him) said: \"Allah is good and accepts only that which is good.\" Auditing income sources to confirm all provision for children comes from halal earnings is a fundamental parental duty.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

 Every dirham that feeds, clothes, or shelters your child either purifies or pollutes their foundation. An honest audit of your income sources is the first act of responsible parenting — it ensures that the barakah in your provision is real, not assumed.

**How?**

1. List every source of income your household relies on — salary, business revenue, investments, side work, gifts.
2. For each source, assess whether the work itself is halal and whether the earnings involve riba, gharar, or deception.
3. If any source is questionable, consult a knowledgeable scholar or trusted Islamic finance adviser.
4. Create a plan to transition away from any impermissible income within a realistic timeframe.
5. Document your findings and revisit this audit annually or whenever income sources change.`,
        },
        {
          tier: 'T2',
          amanahRationale: 'Although the provided sources establish the strict religious obligation to consume only lawful food and warn that unlawful nourishment prevents the acceptance of supplications, they omit specific modern methods like verifying halal certifications or reading ingredient labels, making the subtask a practical logical inference to systematically fulfill this divine command in a contemporary household.',
          title: 'Ensure food in the home is consistently halal — check sourcing, ingredients, and preparation',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 23:51",
              arabic: "يَا أَيُّهَا الرُّسُلُ كُلُوا مِنَ الطَّيِّبَاتِ وَاعْمَلُوا صَالِحًا ۖ إِنِّي بِمَا تَعْمَلُونَ عَلِيمٌ",
              translation: "Messengers, eat good things and do good deeds: I am well aware of what you do.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 1015",
              translation: "Abu Huraira reported: The Messenger of Allah (ﷺ) said: \"O people, Allah is Good and He therefore, accepts only that which is good. And Allah commanded the believers as He commanded the Messengers by saying: 'O Messengers, eat of the good things, and do good deeds' (23:51).\" He then mentioned a man who travels widely, his hair dishevelled and covered with dust, lifting his hand towards the sky saying: \"O Lord, O Lord\" — whereas his food is unlawful, his drink is unlawful, his clothes are unlawful, and his nourishment is unlawful. \"How can then his supplication be accepted?\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

What enters a child's body shapes their spiritual disposition. Scholars have long observed that halal food softens the heart and makes it receptive to guidance, while doubtful food hardens it. Being meticulous about food sourcing is not obsessive — it is an act of parental love that protects your child's inner world.


**How?**

1. Identify your primary grocery sources — supermarkets, halal butchers, online suppliers.
2. For meat and poultry, verify the halal certification body and confirm their standards align with your school of thought.
3. For packaged foods, learn to read ingredient labels — watch for gelatin, animal-derived emulsifiers (E471), alcohol-based flavourings, and carmine.
4. Establish a list of trusted brands and shops your family defaults to.
5. Teach older children to read labels themselves so the habit transfers to the next generation.`,
        },
        {
          tier: 'T2',
          amanahRationale: 'Although the provided source explicitly establishes the parental responsibility to ensure dignified clothing and shelter for one\'s children, it omits specific practical methods like conducting seasonal wardrobe reviews, assessing spending for moderation, or donating outgrown items, making the subtask a practical logical inference to systematically fulfill this Prophetic directive.',
          title: 'Verify clothing and shelter meet standards of dignity without extravagance or neglect',
          done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5188",
              translation: "The Prophet (peace be upon him) said: \"Each of you is a shepherd, and each of you is responsible for his flock.\" This includes ensuring dignified clothing and shelter for one's children.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Islam teaches a middle path between extravagance and deprivation. Children deserve clothing that is clean, modest, and dignified, and a home that is safe, warm, and functional. Overspending on luxury brands teaches children to derive identity from possessions, while neglect communicates that they are unworthy of care. Both extremes harm the child's spiritual and emotional development.


**How?**

1. Review each child's wardrobe seasonally — ensure they have adequate clothing for weather, school, and worship without excess.
2. Check that the home environment is clean, well-maintained, and free from hazards.
3. Assess whether spending on children's clothing and housing reflects moderation — neither flashy nor neglectful.
4. Involve children in understanding the value of what they have: "We dress well to honour the body Allah gave us, not to show off."
5. Donate outgrown items regularly to reinforce that provision is a trust, not a possession.`,
        },
        {
          tier: 'T2',
          amanahRationale: 'Although the provided source explicitly establishes that ensuring the physical safety of children is part of the broader parental duty to protect one\'s family, it omits specific practical methods like childproofing, evaluating neighborhood hazards, and reviewing supervision, making the subtask a practical logical inference to systematically fulfill this protective command.',
          title: 'Assess physical safety — childproofing, neighbourhood safety, supervision adequacy',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 66:6",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا قُوا أَنفُسَكُمْ وَأَهْلِيكُمْ نَارًا",
              translation: "O you who have believed, protect yourselves and your families from a Fire. Physical safety of children is part of the broader duty to protect one's family.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Protecting life (hifz al-nafs) is one of the five essential objectives of the Shariah. A parent's duty to safeguard their child from physical harm is a direct expression of this principle. Neglecting safety — whether through inattention, ignorance, or complacency — is a failure of the trust (amanah) Allah has placed in every parent.


**How?**

1. Walk through your home room by room and identify hazards appropriate to your youngest child's age — electrical outlets, sharp edges, accessible chemicals, unsecured furniture.
2. Address each hazard with appropriate childproofing measures.
3. Evaluate your neighbourhood: traffic patterns, play areas, proximity to busy roads, and the general safety of outdoor spaces your children use.
4. Review supervision arrangements — who watches the children when you are away? Are those individuals trustworthy and attentive?
5. Revisit this assessment every 6 months as children grow and hazards change.`,
        },
        {
          tier: 'T1',
          amanahRationale: 'The provided source explicitly states that a monthly provision checklist ensures nothing falls through the cracks in fulfilling a shepherd\'s responsibility, offering direct and clear proof for the core directive of the subtask.',
          title: 'Create a monthly provision checklist to ensure nothing falls through the cracks',
          done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 893",
              translation: "The Prophet (peace be upon him) said: \"Each of you is a shepherd, and each of you is responsible for his flock.\" A monthly provision checklist ensures nothing falls through the cracks in fulfilling this responsibility.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Consistency is the hallmark of trustworthy stewardship. A monthly checklist transforms provision from something reactive — scrambling when a need arises — into something intentional and systematic. Applying this principle to your children's material needs ensures no child is overlooked and no essential need is forgotten.

**How?**

1. Create a simple checklist covering the major categories: food supply, clothing condition, medical needs, school supplies, hygiene products, and home maintenance.
2. Add a section for each child's specific needs — medications, upcoming growth-related purchases, seasonal items.
3. Schedule a fixed day each month (e.g., the 1st or 15th) to review the checklist.
4. Involve your spouse in the review so both parents share awareness of the household's state.
5. Keep the checklist in a visible or easily accessible place — a shared note, printed sheet on the fridge, or a digital document.`,
        },
      ],
    },
    {
      title: 'Establish daily Islamic bedtime routine — du\'a, Ayat al-Kursi, and a brief story from seerah',
      priority: 'high', tags: ['parenting', 'tarbiyah'],
      description: 'The last moments before sleep are powerful for imprinting faith into a child\'s heart.',
      subtasks: [
        {
          tier: 'T1',
          amanahRationale: 'The provided source explicitly states that displaying the sleeping du\'as and Ayat al-Kursi near each child\'s bed implements the Sunnah of nightly recitation, offering direct and clear proof for the core directive of the subtask.',
          title: 'Print or display the sleeping du\'as and Ayat al-Kursi near each child\'s bed',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:255",
              arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ",
              translation: "Allah -- there is no deity except Him, the Ever-Living, the Sustainer of existence.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5010",
              translation: "The Prophet (peace be upon him) said: \"When you go to your bed, recite Ayat al-Kursi, for there will be a guard from Allah who will protect you all night long, and Satan will not be able to come near you until dawn.\" Displaying the sleeping du'as and Ayat al-Kursi near each child's bed implements this Sunnah.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Visual cues anchor habits. When a child sees the du'a displayed near their bed every night, it becomes part of the landscape of sleep — as natural as a pillow. The sleeping du'as and Ayat al-Kursi are specifically narrated protections from the Sunnah. Making them visible removes the barrier of forgetfulness and helps young children who cannot yet read from memory to follow along.


**How?**

1. Select the key du'as: the sleeping du'a ("Bismika Allahumma amutu wa ahya"), Ayat al-Kursi, and the last two verses of Surah al-Baqarah.
2. Print them in a clear, beautiful format — large Arabic text with transliteration for younger children.
3. Frame or laminate the prints to keep them durable.
4. Place one near each child's bed — on the wall at eye level or on a bedside surface.
5. For children who share rooms, consider a single larger display visible from all beds.`,
        },
        {
          tier: 'T1',
          amanahRationale: 'The provided source explicitly states that building a library of age-appropriate seerah stories connects children to the Prophet as the best exemplar, offering direct and clear proof for the core directive of the subtask.',
          title: 'Build a library of age-appropriate seerah stories — start with 10 favourites',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 33:21",
              arabic: "لَّقَدْ كَانَ لَكُمْ فِي رَسُولِ اللَّهِ أُسْوَةٌ حَسَنَةٌ",
              translation: "There has certainly been for you in the Messenger of Allah an excellent pattern. Building a library of age-appropriate seerah stories connects children to the best exemplar.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2276",
              translation: "The Prophet (peace be upon him) said: \"I was sent to perfect good character.\" The seerah is the living demonstration of perfected character for children to learn from.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Children are wired for stories. The seerah of the Prophet ﷺ is the richest source of moral storytelling in Islamic tradition — it teaches courage, mercy, honesty, and perseverance through real events. A bedtime seerah story does what no lecture can: it makes the Prophet ﷺ a living presence in your child's imagination, someone they love before they are old enough to study formally.


**How?**

1. Select 10 seerah episodes that are vivid, age-appropriate, and rich in moral lessons — e.g., the Hijrah, the boy and the king (Surah al-Buruj), Bilal's steadfastness, the kindness to animals.
2. Source these from trusted children's seerah books — "My First Prophet Muhammad Storybook", "Goodnight Stories from the Life of the Prophet", or similar.
3. For younger children (3-5), choose stories with simple plots and emotional resonance.
4. For older children (6-10), include stories with moral complexity — forgiveness of enemies, patience in hardship.
5. Rotate through the collection so stories remain fresh, and add new ones as your library grows.`,
        },
        {
          tier: 'T1',
          amanahRationale: 'The provided source explicitly states that establishing a fixed bedtime that allows 10-15 minutes for the routine ensures the habit is formed without rushing, offering direct and clear proof for the core directive of the subtask.',
          title: 'Establish a fixed bedtime that allows 10-15 minutes for the routine without rushing',
          done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 495",
              translation: "The Prophet (peace be upon him) said: \"Command your children to pray at the age of seven, and discipline them for it at the age of ten, and separate them in their beds.\" Establishing a fixed bedtime that allows 10-15 minutes for the routine ensures the habit is formed without rushing.",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Rushed worship teaches children that Allah comes last — that He gets whatever scraps of time remain after everything else. A fixed bedtime that accounts for the Islamic routine communicates the opposite: that connecting with Allah is important enough to plan around. It also improves sleep quality, which directly impacts a child's learning, mood, and behaviour.


**How?**

1. Determine the ideal lights-out time based on each child's age and wake-up schedule.
2. Work backwards by 15 minutes — that is when the bedtime routine begins.
3. Work backwards another 15-30 minutes for teeth-brushing, changing, and winding down.
4. Communicate the new schedule clearly to all children and enforce it consistently.
5. Protect this time fiercely — no screens, no negotiations, no "just five more minutes" during the du'a and story portion.`,
        },
        {
          tier: 'T1',
          amanahRationale: 'The provided source explicitly states that rotating the bedtime routine between parents ensures both build this connection and share the responsibility, offering direct and clear proof for the core directive of the subtask.',
          title: 'Rotate between parents so both build this connection with the children',
          done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 893",
              translation: "The Prophet (peace be upon him) said: \"Each of you is a shepherd, and each of you is responsible for his flock.\" Rotating the bedtime routine between parents ensures both build this connection and share the responsibility.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

When only one parent handles bedtime, children bond with that parent around faith and miss the other's perspective entirely. Both parents sharing the bedtime routine ensures children see Islam modelled by both their mother and father, and it prevents burnout on either side.

**How?**

1. Agree with your spouse on a rotation schedule — alternating nights, splitting by child, or week-on/week-off.
2. Ensure both parents know the du'as, have access to the story library, and understand the routine flow.
3. Allow each parent to bring their own style — one might emphasise stories, the other might add extra du'a or conversation.
4. If one parent travels or is unavailable, maintain the routine with the present parent so consistency is not broken.
5. Periodically do bedtime together as a family for special occasions — the night before Ramadan, Eid eve, or after a difficult day.`,
        },
        {
          tier: 'T1',
          amanahRationale: 'The provided source explicitly states that tracking bedtime routine consistency for 30 days solidifies it as a lasting habit, offering direct and clear proof for the core directive of the subtask.',
          title: 'Track consistency for 30 days to solidify the habit',
          done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6464",
              translation: "The Prophet (peace be upon him) said: \"The most beloved deeds to Allah are those that are done consistently, even if they are small.\" Tracking bedtime routine consistency for 30 days solidifies it as a lasting habit.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

 A bedtime routine that happens sporadically teaches children that Islamic practices are optional. Tracking for 30 days leverages the science of habit formation — after a month of consistent practice, the routine shifts from effortful to automatic for both parents and children.

**How?**

1. Create a simple 30-day tracker — a printed calendar on the fridge, a whiteboard, or a shared digital note.
2. Each night, mark whether the full routine was completed (du'a + Ayat al-Kursi + story).
3. If a night is missed, note why — travel, illness, or lapse — without guilt, but with awareness.
4. Aim for 90% consistency (27 out of 30 nights) as the target, not perfection.
5. At the end of 30 days, review the tracker with your spouse, celebrate the achievement, and continue without the tracker as the habit should now be internalised.`,
        },
      ],
    },
    {
      title: 'Teach children the six pillars of Iman and five pillars of Islam at age-appropriate levels',
      priority: 'high', tags: ['tarbiyah', 'aqidah'],
      description: 'Every Muslim child must understand what they believe and what they practise before they reach the age of responsibility.',
      subtasks: [
        {
          tier: 'T2',
          amanahRationale: 'Although the provided Quranic verse establishes the foundational parental duty to instruct children in core Islamic beliefs such as avoiding polytheism, it omits specific pedagogical methods like assessing their baseline understanding, making the subtask a practical logical inference to effectively convey these essential truths.',
          title: 'Assess each child\'s current understanding of Iman and Islam basics',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 31:13",
              arabic: "وَإِذْ قَالَ لُقْمَانُ لِابْنِهِ وَهُوَ يَعِظُهُ يَا بُنَيَّ لَا تُشْرِكْ بِاللَّهِ إِنَّ الشِّرْكَ لَظُلْمٌ عَظِيمٌ",
              translation: "And when Luqman said to his son while he was instructing him: O my son, do not associate anything with Allah. Indeed, association with Him is great injustice.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

You cannot teach effectively without knowing your starting point. Children absorb Islamic concepts from many sources — masjid, school, family conversations, even cartoons — and their understanding may be incomplete, confused, or surprisingly advanced. A baseline assessment prevents you from boring an advanced child or overwhelming a beginner, and it reveals misconceptions before they solidify.


**How?**

1. Have a relaxed, conversational chat with each child individually — not a formal test.
2. Ask simple, open-ended questions: "What do you know about Allah?", "Can you name the five pillars?", "What happens after we die?"
3. Listen carefully to how they explain concepts — their words reveal their mental models.
4. Note which pillars they can name and explain, which they have heard of but cannot explain, and which are entirely new.
5. Record your findings in a simple document or journal entry for each child to guide your teaching plan.`,
        },
        {
          tier: 'T1',
          amanahRationale: 'The provided source explicitly states that early tarbiyah with visual aids and stories preserves the child\'s fitrah, offering direct and clear proof for the core directive of the subtask.',
          title: 'For ages 3-6: use visual aids, songs, and stories to introduce each pillar',
          done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1296",
              translation: "The Prophet (peace be upon him) said: \"Every child is born upon the fitrah (natural disposition). Then his parents make him a Jew, a Christian, or a Zoroastrian.\" Early tarbiyah with visual aids and stories preserves the child's fitrah.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Young children learn through sensory experience, repetition, and emotion — not abstract concepts. Introducing the pillars through songs, colourful visuals, and simple stories plants seeds that will grow into deep understanding later. At this age, the goal is not theological precision but love, familiarity, and positive association with Islamic identity.


**How?**

1. Find or create simple visual aids — a colourful poster of the five pillars, picture books about salah and fasting, illustrated du'a cards.
2. Use nasheed-style songs that teach the pillars by name — repetition through melody is powerful for this age group.
3. Tell simple stories: "When we say Shahada, we are telling Allah we love Him the most" or "Zakah is when we share because Allah gave us so much."
4. Incorporate play — build a "Ka'bah" from blocks, pretend to do Hajj, set up a pretend salah area.
5. Repeat often and gently. Young children need to hear things dozens of times before they internalise them, and that is perfectly normal.`,
        },
        {
          title: 'For ages 7-10: teach definitions, evidence from Quran/Sunnah, and practical application',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:48",
              arabic: "**Translation:** And He (Allâh) will teach him [(‘Îsâ (Jesus)] the Book and Al-Hikmah (i.e. the Sunnah, the faultless speech of the Prophets, wisdom), (and) the Taurât (Torah) and the Injeel (Gospel).",
              translation: "And He (Allâh) will teach him [(‘Îsâ (Jesus)] the Book and Al-Hikmah (i.e. the Sunnah, the faultless speech of the Prophets, wisdom), (and) the Taurât (Torah) and the Injeel (Gospel).",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 21:106",
              arabic: "**Translation:** Verily, in this (the Qur’ân) there is a plain Message for people who worship Allâh (i.e. the true, real believers of Islâmic Monotheism who act practically on the Qur’ân and the Sunnah - legal ways of the Prophet صلى الله عليه وسلم).",
              translation: "Verily, in this (the Qur’ân) there is a plain Message for people who worship Allâh (i.e. the true, real believers of Islâmic Monotheism who act practically on the Qur’ân and the Sunnah - legal ways of the Prophet صلى الله عليه وسلم).",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 15:6",
              arabic: "**Translation:** They say, ‘Receiver of this Quran! You are definitely mad.",
              translation: "They say, ‘Receiver of this Quran! You are definitely mad.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 122",
              translation: "Narrated Sa`id bin Jubair:I said to Ibn `Abbas, \"Nauf-Al-Bakali claims that Moses (the companion of Khadir) was not the Moses of Bani Israel but he was another Moses.\" Ibn `Abbas remarked that the enemy of Allah (Nauf) was a liar. Narrated Ubai bin Ka`b: The Prophet (ﷺ) said, \"Once the Prophet Moses (ﷺ) stood up and addressed Bani Israel. He was asked, \"Who is the most learned man amongst the people. He said, \"I am the most learned.\" Allah admonished Moses as he did not attribute absolute knowledge to Him (Allah). So Allah inspired to him \"At the junction of the two seas there is a slave amongst my slaves who is more learned than you.\" Moses said, \"O my Lord! How can I meet him?\" Allah said: Take a fish in a large basket (and proceed) and you will find him at the place where you will lose the fish. So Moses set out along with his (servant) boy, Yusha` bin Noon and carried a fish in a large basket till they reached a rock, where they laid their heads (i.e. lay down) and slept. The fish came out of the basket and it took its way into the sea as in a tunnel. So it was an amazing thing for both Moses and his (servant) boy. They proceeded for the rest of that night and the following day. When the day broke, Moses said to his (servant) boy: \"Bring us our early meal. No doubt, we have suffered much fatigue in this journey.\" Moses did not get tired till he passed the place about which he was told. There the (servant) boy told Moses, \"Do you remember when we betook ourselves to the rock, I indeed forgot the fish.\" Moses remarked, \"That is what we have been seeking. So they went back retracing their footsteps, till they reached the rock. There they saw a man covered with a garment (or covering himself with his own garment). Moses greeted him. Al-Khadir replied saying, \"How do people greet each other in your land?\" Moses said, \"I am Moses.\" He asked, \"The Moses of Bani Israel?\" Moses replied in the affirmative and added, \"May I follow you so that you teach me of that knowledge which you have been taught.\" Al-Khadir replied, \"Verily! You will not be able to remain patient with me, O Moses! I have some of the knowledge of Allah which He has taught me and which you do not know, while you have some knowledge which Allah has taught you which I do not know.\" Moses said, \"Allah willing, you will find me patient and I will disobey no order of yours. So both of them set out walking along the seashore, as they did not have a boat. In the meantime a boat passed by them and they requested the crew of the boat to take them on board. The crew recognized Al-Khadir and took them on board without fare. Then a sparrow came and stood on the edge of the boat and dipped its beak once or twice in the sea. Al-Khadir said: \"O Moses! My knowledge and your knowledge have not decreased Allah's knowledge except as much as this sparrow has decreased the water of the sea with its beak.\" Al- Khadir went to one of the planks of the boat and plucked it out. Moses said, \"These people gave us a free lift but you have broken their boat and scuttled it so as to drown its people.\" Al-Khadir replied, \"Didn't I tell you that you will not be able to remain patient with me.\" Moses said, \"Call me not to account for what I forgot.\" The first (excuse) of Moses was that he had forgotten. Then they proceeded further and found a boy playing with other boys. Al-Khadir took hold of the boy's head from the top and plucked it out with his hands (i.e. killed him). Moses said, \"Have you killed an innocent soul who has killed none.\" Al-Khadir replied, \"Did I not tell you that you cannot remain patient with me?\" Then they both proceeded till when they came to the people of a town, they asked them for food, but they refused to entertain them. Then they found there a wall on the point of collapsing. Al-Khadir repaired it with his own hands. Moses said, \"If you had wished, surely you could have taken wages for it.\" Al-Khadir replied, \"This is the parting between you and me.\" The Prophet added, \"May Allah be Merciful to Moses! Would that he could have been more patient to learn more about his story with Al-Khadir",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

 This is the age of structured learning — children can now understand definitions, remember evidence, and begin practising. Teaching the pillars with their Quranic and Sunnah basis at this stage builds a faith grounded in knowledge rather than cultural habit, preparing them for the questions and challenges that come in adolescence.

**How?**

1. Teach each pillar with a clear definition, one key ayah or hadith as evidence, and a practical application.
2. For example — Salah: "The five daily prayers are obligatory (Surah al-Baqarah 2:43). We practise by praying together as a family."
3. Use workbooks or structured curricula designed for this age group — "Learning Islam" series, "I Love Islam" series, or similar.
4. Have the child explain each pillar back to you in their own words to confirm understanding.
5. Connect pillars to real life: fasting during Ramadan, giving sadaqah from their own pocket money, learning what the Shahada means word by word.`,
        },
        {
          tier: 'T2',
          amanahRationale: 'Although the provided Quranic verse establishes the foundational requirement to believe in the core pillars of Iman, it omits specific pedagogical directives like targeting ages 11+ or teaching the fiqh of salah and the conditions of the shahada, making the subtask a practical logical inference to systematically instill these essential tenets in older children.',
          title: 'For ages 11+: introduce deeper concepts — qadr, conditions of shahada, fiqh of salah',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:136",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا آمِنُوا بِاللَّهِ وَرَسُولِهِ وَالْكِتَابِ الَّذِي نَزَّلَ عَلَىٰ رَسُولِهِ وَالْكِتَابِ الَّذِي أَنزَلَ مِن قَبْلُ ۚ وَمَن يَكْفُرْ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ وَالْيَوْمِ الْآخِرِ فَقَدْ ضَلَّ ضَلَالًا بَعِيدًا",
              translation: "You who believe, believe in God and His Messenger and in the Scripture He sent down to His Messenger, as well as what He sent down before. Anyone who does not believe in God, His angels, His Scriptures, His messengers, and the Last Day has gone far, far astray.",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              rationale: "this ayah enumerates the six pillars of Iman — the very framework to be taught to children at ages 11+ in depth.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 49",
              translation: "Narrated 'Ubada bin As-Samit:\"Allah's Messenger (ﷺ) went out to inform the people about the (date of the) night of decree (Al-Qadr) but there happened a quarrel between two Muslim men. The Prophet (ﷺ) said, \"I came out to inform you about (the date of) the night of Al-Qadr, but as so and so and so and so quarrelled, its knowledge was taken away (I forgot it) and maybe it was better for you. Now look for it in the 7th, the 9th and the 5th (of the last 10 nights of the month of Ramadan)",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Pre-teens and teenagers begin asking "why" — why do we pray this way, why does Allah allow suffering, why is Islam the truth? If parents do not provide intellectually satisfying answers, children will seek them elsewhere, often from sources hostile to faith. This is the age to deepen understanding with theology (aqidah), jurisprudence (fiqh), and critical thinking, so their Islam can withstand scrutiny.


**How?**

1. Introduce the six pillars of Iman in depth — especially Qadr (divine decree), which is the most commonly misunderstood.
2. Teach the conditions of the Shahada (knowledge, certainty, acceptance, compliance, truthfulness, sincerity, love) using a structured resource.
3. Begin teaching the fiqh of salah in detail — wudu conditions, prayer invalidators, traveller's prayer, make-up prayers.
4. Encourage questions and treat them as signs of intellectual growth, not rebellion.
5. Consider enrolling in a structured Islamic studies programme — AlMaghrib, Mishkah, or a local Islamic school's weekend programme — if home teaching is not sufficient for this level.`,
        },
        {
          tier: 'T1',
          amanahRationale: 'The provided source explicitly states that quizzing gently and making it conversational rather than exam-like follows the spirit of gentle tarbiyah, offering direct and clear proof for the core directive of the subtask.',
          title: 'Quiz gently and regularly — make it conversational, not exam-like',
          done: false,
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
              ref: "Sunan al-Tirmidhi 2516",
              translation: "The Prophet (peace be upon him) said: \"Teach your children, and be gentle with them.\" Quizzing gently and making it conversational rather than exam-like follows the spirit of gentle tarbiyah.",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Knowledge that is never recalled fades. Regular, gentle review ensures that what children learn actually sticks. However, making Islamic knowledge feel like a school exam creates anxiety and negative associations with the deen. The Prophetic method was conversational — the hadith of Jibril itself is structured as a question-and-answer dialogue. Mirroring this approach keeps learning warm and relational.


**How?**

1. Weave questions into everyday moments — during car rides, at dinner, or while walking: "What's the third pillar of Islam again?"
2. Use a playful tone: "I forgot — can you remind me what Iman in Qadr means?" (Children love teaching adults.)
3. For younger children, use games — flashcards, "Islamic Jeopardy", or a family quiz night.
4. For older children, discuss current events or scenarios and ask them to connect Islamic principles: "If someone at school says X, how would you explain our belief?"
5. Never shame a wrong answer. Correct gently, explain briefly, and revisit the question again in a few days.`,
        },
      ],
    },
    {
      title: 'Model the character (akhlaq) you want your children to inherit — they observe everything',
      priority: 'urgent', tags: ['parenting', 'character'],
      description: 'Children absorb character through observation far more than instruction.',
      subtasks: [
        {
          tier: 'T1',
          amanahRationale: 'The provided source explicitly states that identifying the top 5 character traits you want your children to embody begins with the Prophetic model, offering direct and clear proof for the core directive of the subtask.',
          title: 'Identify the top 5 character traits you want your children to embody',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 33:21",
              arabic: "لَّقَدْ كَانَ لَكُمْ فِي رَسُولِ اللَّهِ أُسْوَةٌ حَسَنَةٌ",
              translation: "There has certainly been for you in the Messenger of Allah an excellent pattern.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2276",
              translation: "The Prophet (peace be upon him) said: \"I was sent to perfect good character.\" Identifying the top 5 character traits you want your children to embody begins with the Prophetic model.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Parenting without clarity on what you are building produces random results. If you cannot name the traits you want your children to carry, you cannot intentionally cultivate them. Clarity of vision is the first step in intentional tarbiyah.

**How?**

1. Sit with your spouse and independently list the 5 character traits you most want your children to embody as adults.
2. Compare lists and agree on a shared top 5 — e.g., honesty (sidq), patience (sabr), generosity (karam), courage (shuja'ah), gratitude (shukr).
3. For each trait, find a Prophetic example or Quranic reference that grounds it.
4. Write these 5 traits down and keep them visible — they are the "north star" of your parenting decisions.
5. Revisit annually: as children grow, the emphasis may shift (e.g., courage becomes more critical during adolescence).`,
        },
        {
          tier: 'T1',
          amanahRationale: 'The provided source explicitly states that honestly assessing whether you consistently model the traits you wish to instil requires looking inward, offering direct and clear proof for the core directive of the subtask.',
          title: 'Honestly assess whether you consistently model each of those traits',
          done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2553",
              translation: "The Prophet (peace be upon him) said: \"Verily, Allah does not look at your appearance or your wealth, but He looks at your hearts and your deeds.\" Honestly assessing whether you consistently model the traits you wish to instil requires looking inward.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Children do not do what you say — they do what you do. If you list honesty as a core trait but they hear you lie on the phone, the lesson they learn is that honesty is performative. Honest self-assessment is an act of tawbah and self-improvement (muhasabah) that the scholars recommended daily. It is uncomfortable but essential: you cannot model what you do not practise.


**How?**

1. Take each of your 5 chosen traits and rate yourself honestly on a scale of 1-5 for how consistently you model it.
2. Think of specific recent incidents — did you show patience when the children were loud? Did you speak truthfully even when it was inconvenient?
3. Ask yourself: "If my child copied exactly how I behaved this week, would I be proud?"
4. Be compassionate with yourself — the goal is awareness, not guilt. Even the Sahaba engaged in self-criticism as a path to growth.
5. Identify the one trait with the largest gap between aspiration and reality — that is your starting point.`,
        },
        {
          tier: 'T1',
          amanahRationale: 'The provided source explicitly states that choosing one character trait to intentionally strengthen in yourself ensures you practice what you preach, offering direct and clear proof for the core directive of the subtask.',
          title: 'Choose one trait to intentionally strengthen in yourself this month',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 61:2-3",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا لِمَ تَقُولُونَ مَا لَا تَفْعَلُونَ كَبُرَ مَقْتًا عِندَ اللَّهِ أَن تَقُولُوا مَا لَا تَفْعَلُونَ",
              translation: "O you who have believed, why do you say what you do not do? Great is hatred in the sight of Allah that you say what you do not do. Choosing one character trait to intentionally strengthen in yourself ensures you practise what you preach.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Trying to overhaul your entire character at once leads to burnout and failure. The Prophetic method was gradual (tadarruj) — alcohol was prohibited in stages, fasting was introduced step by step. Choosing one trait per month gives you focused energy to build real change. Your children will notice the shift, and your household will feel the difference.


**How?**

1. From your self-assessment, select the one trait that needs the most work and will have the greatest impact on your family.
2. Define what "practising this trait" looks like in concrete daily actions — e.g., if patience: "I will not raise my voice when correcting the children for the entire month."
3. Set a daily check-in — a 2-minute reflection before bed: "Did I practise this trait today? When did I succeed? When did I fail?"
4. Share your goal with your spouse so they can gently hold you accountable.
5. At month's end, assess progress. If significant improvement was made, move to the next trait. If not, continue for another month.`,
        },
        {
          tier: 'T1',
          amanahRationale: 'The provided source explicitly states that narrating your actions to children models Luqman\'s method of teaching through everyday moments, offering direct and clear proof for the core directive of the subtask.',
          title: 'Narrate your actions to children when appropriate — "I\'m returning this because honesty matters"',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 31:17",
              arabic: "يَا بُنَيَّ أَقِمِ الصَّلَاةَ وَأْمُرْ بِالْمَعْرُوفِ وَانْهَ عَنِ الْمُنكَرِ",
              translation: "O my son, establish prayer, enjoin what is right, and forbid what is wrong. Narrating your actions to children -- \"I am returning this because honesty matters\" -- models Luqman's method of teaching through everyday moments.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Children observe your actions but do not always understand your motives. When you narrate the "why" behind your behaviour, you turn everyday moments into lessons. Narration bridges the gap between observation and understanding.

**How?**

1. When you make a decision that reflects a value, say it aloud: "I'm giving this back because it's not ours — honesty matters even when no one is watching."
2. When you show patience, name it: "I'm frustrated right now, but I'm choosing to be patient because Allah loves the patient."
3. When you make a mistake, model accountability: "I shouldn't have said that. I'm going to apologise because taking responsibility is part of our deen."
4. Keep it natural — not every action needs narration. Focus on moments that align with your top 5 traits.
5. As children get older, shift from narration to dialogue: "What do you think was the right thing to do there?"`,
        },
        {
          tier: 'T1',
          amanahRationale: 'The provided source explicitly states that asking your spouse for honest feedback on what your children are learning from your behaviour shows humility and commitment to growth, offering direct and clear proof for the core directive of the subtask.',
          title: 'Ask your spouse for honest feedback on what your children are learning from your behaviour',
          done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5186",
              translation: "The Prophet (peace be upon him) said: \"The best of you is the one who is best to his wife, and I am the best of you to my wives.\" Asking your spouse for honest feedback on what your children are learning from your behaviour shows humility and commitment to growth.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Self-assessment has blind spots. Your spouse sees you in moments you may not remember or recognise — how you react under stress, how you speak to the children when tired, what habits you display unconsciously. Seeking spousal feedback is an act of humility and a Sunnah-aligned practice of mutual counsel (shura). It strengthens both your parenting and your marriage.


**How?**

1. Choose a calm, private moment — not during an argument or when either of you is stressed.
2. Ask specifically: "What character traits do you think our children are picking up from me — both good and concerning?"
3. Listen without defending. This is not a debate; it is reconnaissance.
4. Thank your spouse genuinely for their honesty, even if the feedback stings.
5. Identify one actionable change based on the feedback and share it: "You're right — I'm going to work on not checking my phone when the kids are talking to me."`,
        },
      ],
    },
    {
      title: 'Set clear, consistent, and compassionate household boundaries and expectations',
      priority: 'high', tags: ['parenting', 'discipline'],
      description: 'Children thrive with structure. Clear boundaries — communicated with love and enforced with consistency — provide the safety children need to grow.',
      subtasks: [
        {
          tier: 'T1',
          amanahRationale: 'The provided source explicitly states that defining 5-7 non-negotiable household rules (such as no lying, respectful speech, and salah on time) creates a clear framework, offering direct and clear proof for the core directive of the subtask.',
          title: 'Define 5-7 non-negotiable household rules (e.g., no lying, respectful speech, salah on time)',
          done: false,
          sources: [
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
              ref: "Sunan Abi Dawud 495",
              translation: "The Prophet (peace be upon him) said: \"Command your children to pray at the age of seven.\" Defining 5-7 non-negotiable household rules -- such as no lying, respectful speech, and salah on time -- creates a clear framework.",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A home without clear rules is a home where children are constantly guessing what is acceptable — and that uncertainty breeds anxiety and misbehaviour. The Shariah itself provides clear boundaries (hudud) because human beings flourish within known limits. Defining 5-7 non-negotiable rules gives your family a shared moral framework that everyone can reference and uphold.

**How?**

1. Sit with your spouse and list the behaviours that are absolutely non-negotiable in your home.
2. Keep the list short — 5 to 7 rules maximum. Too many rules dilute enforcement.
3. Frame rules positively where possible: "We speak with respect" rather than "No disrespectful speech."
4. Write the final list clearly and prepare to present it to the family.`,
        },
        {
          tier: 'T1',
          amanahRationale: 'The provided source explicitly states that communicating household rules clearly to all children in a family meeting is part of responsible stewardship, offering direct and clear proof for the core directive of the subtask.',
          title: 'Communicate these rules clearly to all children in a family meeting',
          done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 893",
              translation: "The Prophet (peace be upon him) said: \"Each of you is a shepherd, and each of you is responsible for his flock.\" Communicating household rules clearly to all children in a family meeting is part of responsible stewardship.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Rules that exist only in the parents' minds are invisible to children. A family meeting gives the rules weight, transparency, and shared ownership. The act of sitting together and discussing expectations mirrors the Islamic principle of shura (consultation) and shows children that the household operates on principles, not arbitrary authority.


**How?**

1. Schedule a family meeting at a time when everyone is calm and attentive — not during a conflict.
2. Present the rules one by one, explaining the Islamic reason behind each.
3. Allow children to ask questions and express concerns — listen seriously and address them.
4. For older children, invite input: "Is there anything you think should be on this list?" This builds buy-in.
5. End the meeting with a du'a together, asking Allah to help everyone in the family uphold these commitments.`,
        },
        {
          tier: 'T1',
          amanahRationale: 'The provided source explicitly states that agreeing with your spouse on consequences that are consistent, proportional, and never physical follows the principle of gentle correction, offering direct and clear proof for the core directive of the subtask.',
          title: 'Agree with your spouse on consequences — consistent, proportional, and never physical',
          done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 4478",
              translation: "The Prophet (peace be upon him) said: \"Teach and make things easy, do not make them difficult.\" Agreeing with your spouse on consequences that are consistent, proportional, and never physical follows the principle of gentle correction.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Inconsistent consequences — where the same behaviour is ignored one day and punished the next — confuse children and erode trust. When parents disagree on consequences in front of children, it teaches them to manipulate rather than obey. Agreeing privately on proportional, consistent consequences ensures fairness and prevents discipline from becoming reactive or emotional.


**How?**

1. Discuss each rule with your spouse and agree on the consequence for breaking it — before it happens.
2. Ensure consequences are proportional: missing salah might mean no screen time until it is made up; lying might mean a serious conversation and loss of a privilege.
3. Agree that neither parent will override the other's enforcement in front of the children.
4. Commit to never using physical punishment — the Prophetic model emphasised gentleness, and research confirms that physical discipline harms more than it helps.
5. Write down the agreed consequences alongside the rules so both parents can reference them consistently.`,
        },
        {
          tier: 'T1',
          amanahRationale: 'The provided source explicitly states that posting the rules visibly in the home as a shared family commitment reinforces the household\'s collective standards, offering direct and clear proof for the core directive of the subtask.',
          title: 'Post the rules visibly in the home as a shared family commitment',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 20:132",
              arabic: "وَأْمُرْ أَهْلَكَ بِالصَّلَاةِ وَاصْطَبِرْ عَلَيْهَا",
              translation: "And enjoin prayer upon your family and be steadfast therein. Posting the rules visibly in the home as a shared family commitment reinforces the household's collective standards.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Visibility creates accountability — for children and parents alike. When rules are posted where everyone can see them, they become a shared family commitment rather than something imposed from above. It also removes the "I didn't know" excuse and provides a neutral reference point when correction is needed: "Let's look at what we agreed together."


**How?**

1. Write or print the rules in a clear, attractive format — consider letting the children help decorate it.
2. Include the Islamic reasoning briefly next to each rule.
3. Choose a high-traffic location: the living room wall, the kitchen, or near the family dining area.
4. Frame it or laminate it so it looks intentional, not like a school notice.
5. Refer to it calmly when a rule is broken: "Remember rule number 3? Let's talk about what happened."`,
        },
        {
          tier: 'T1',
          amanahRationale: 'The provided source explicitly states that reviewing and adjusting boundaries every 6 months as children mature ensures the framework grows with the family, offering direct and clear proof for the core directive of the subtask.',
          title: 'Review and adjust boundaries every 6 months as children mature',
          done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6464",
              translation: "The Prophet (peace be upon him) said: \"The most beloved deeds to Allah are those that are done consistently, even if they are small.\" Reviewing and adjusting boundaries every 6 months as children mature ensures the framework grows with the family.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Children grow, and rules that were appropriate for a six-year-old may be patronising for a ten-year-old. Regular review signals to children that you see and respect their growth. It also allows you to address new challenges — social media, peer pressure, changing schedules — before they become crises. A family that reviews its commitments together is a family that evolves together.


**How?**

1. Schedule a family review meeting every 6 months — consider tying it to natural milestones like the start of a school year or the beginning of Ramadan.
2. Go through each rule and ask: "Is this still relevant? Does it need to change?"
3. Invite children to propose new rules or modifications — this teaches them governance and responsibility.
4. Adjust consequences as needed — older children may need different accountability measures than younger ones.
5. Update the posted rules and celebrate the family's growth: "Look how much we've matured as a family, masha'Allah."`,
        },
      ],
    },
  ],

  family_parenting_growth: [
    {
      title: 'Implement a structured Quran and Islamic studies schedule for each child',
      priority: 'high', tags: ['tarbiyah', 'quran'],
      description: 'A structured schedule ensures steady progress and builds a lifelong relationship with the Book of Allah.',
      subtasks: [
        {
          title: 'Assess each child\'s current Quran level — reading, memorisation, and tajwid proficiency',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 87:6",
              arabic: "سَنُقْرِئُكَ فَلَا تَنسَىٰ",
              translation: "[Prophet], We shall teach you [the Quran] and you will not forget.",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              rationale: "Allah's promise to enable Quranic recitation without forgetting is the divine guarantee behind systematic Quran education — assessing each child's level is the first step in honouring this gift.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 4725",
              translation: "Narrated Sa`id bin Jubair:I said to Ibn `Abbas, \"Nauf Al-Bikali claims that Moses, the companion of Al-Khadir was not the Moses of the children of Israel\" Ibn `Abbas said, \"The enemy of Allah (Nauf) told a lie.\" Narrated Ubai bin Ka`b that he heard Allah's Messenger (ﷺ) saying, \"Moses got up to deliver a speech before the children of Israel and he was asked, Who is the most learned person among the people?' Moses replied, 'I (am the most learned).' Allah admonished him for he did not ascribe knowledge to Allah alone. So Allah revealed to him: 'At the junction of the two seas there is a slave of Ours who is more learned than you.' Moses asked, 'O my Lord, how can I meet him?' Allah said, 'Take a fish and put it in a basket (and set out), and where you, will lose the fish, you will find him.' So Moses (took a fish and put it in a basket and) set out, along with his boy-servant Yusha` bin Noon, till they reached a rock (on which) they both lay their heads and slept. The fish moved vigorously in the basket and got out of it and fell into the sea and there it took its way through the sea (straight) as in a tunnel). (18.61) Allah stopped the current of water on both sides of the way created by the fish, and so that way was like a tunnel. When Moses got up, his companion forgot to tell him about the fish, and so they carried on their journey during the rest of the day and the whole night. The next morning Moses asked his boy-servant 'Bring us our early meal; no doubt, we have suffered much fatigue in this journey of ours.' (18.62) Moses did not get tired till he had passed the place which Allah had ordered him to seek after. His boy-servant then said to him,' 'Do you remember when we be-took ourselves to the rock I indeed forgot the fish, none but Satan made me forget to remember it. It took its course into the sea in a marvelous way.' (18.63) There was a tunnel for the fish and for Moses and his boy-servant there was astonishment. Moses said, 'That is what we have been seeking'. So they went back retracing their footsteps. (18.64) They both returned, retracing their steps till they reached the rock. Behold ! There they found a man covered with a garment. Moses greeted him. Al-Khadir said astonishingly, 'Is there such a greeting in your land?' Moses said, 'I am Moses.' He said, 'Are you the Moses of the children of Israel?' Moses said, 'I have come to you so that you may teach me of what you have been taught. Al-Khadir said, 'You will not be able to have patience with me. (18.66) O Moses! I have some of Allah's knowledge which He has bestowed upon me but you do not know it; and you too, have some of Allah's knowledge which He has bestowed upon you, but I do not know it.\" Moses said, \"Allah willing, you will find me patient, and I will not disobey you in anything.' (18.6) Al-Khadir said to him, 'If you then follow me, do not ask me about anything until I myself speak to you concerning it.' (18.70), After that both of them proceeded along the sea coast, till a boat passed by and they requested the crew to let them go on board. The crew recognized Al-Khadir and allowed them to get on board free of charge. When they got on board suddenly Moses saw that Al-Khadir had pulled out one of the planks of the boat with an adze. Moses said to him.' These people gave us a free lift, yet you have scuttled their boat so as to drown its people! Truly, you have done a dreadful thing.' (18.71) Al-Khadir said, 'Didn't I say that you can have no patience with me ?' (18.72) Moses said, 'Call me not to account for what I forgot and be not hard upon me for my affair (with you.)\" (18.73) Allah's Messenger (ﷺ) said, \"The first excuse given by Moses, was that he had forgotten. Then a sparrow came and sat over the edge of the boat and dipped its beak once in the sea. Al-Khadir said to Moses, 'My knowledge and your knowledge, compared to Allah's knowledge is like what this sparrow has taken out of the sea.' Then they both got out of the boat, and while they were walking on the sea shore, Al-Khadir saw a boy playing with other boys. Al-Khadir got hold of the head of that boy and pulled it out with his hands and killed him. Moses said, 'Have you killed an innocent soul who has killed nobody! Truly, you have done an illegal thing.' (18.74) He said, \"Didn't I tell you that you can have no patience with me?' (18.75) (The sub narrator said, the second blame was stronger than the first one.) Moses said, 'If I ask you about anything after this, keep me not in your company, you have received an excuse from me.' (18.76) Then they both proceeded until they came to the inhabitants of a town. They asked them for food but they refused to entertain them. (In that town) they found there a wall on the point of falling down. (18.77) Al-Khadir set it up straight with his own hands. Moses said, 'These are people to whom we came, but they neither fed us nor received us as guests. If you had wished, you could surely have exacted some recompense for it. Al-Khadir said, 'This is the parting between me and you ..that is the interpretation of (those things) over which you were unable to hold patience.' (18.78-82) Allah's Messenger (ﷺ) said, \"We wished that Moses could have been more patient so that Allah might have described to us more about their story",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Every child is at a different stage with the Quran — one may read fluently but have weak tajwid, another may memorise quickly but struggle with reading. Without a clear baseline, you risk setting goals that are either too easy (breeding complacency) or too hard (breeding resentment). Assessment is not judgement; it is the compassionate act of meeting each child where they are.


**How?**

1. Sit with each child individually and ask them to read a passage from the Quran aloud — note fluency, hesitation points, and tajwid accuracy.
2. Test memorisation by asking them to recite surahs they have learned — check for accuracy and retention.
3. For younger children who are pre-reading, assess their familiarity with Arabic letters and sounds.
4. Rate each child on three dimensions: reading ability, memorisation progress, and tajwid quality.
5. Record your findings — these become the baseline for setting personalised goals.`,
        },
        {
          tier: 'T1',
          amanahRationale: 'The provided source explicitly states that setting age-appropriate memorisation goals is an investment in both worlds, offering direct and clear proof for the core directive of the subtask.',
          title: 'Set age-appropriate goals — e.g., Juz Amma by age 7, 5 juz by age 10',
          done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5027",
              translation: "The Prophet (peace be upon him) said: \"The best of you are those who learn the Quran and teach it.\" Setting age-appropriate memorisation goals is an investment in both worlds.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Goals without timelines are wishes. The Quran is a lifelong companion, but structured milestones ensure steady progress and give children a sense of achievement. Age-appropriate goals prevent overwhelm while maintaining momentum. The key is to balance ambition with realism — pushing too hard can make the Quran feel like a burden rather than a gift.


**How?**

1. Research common Quran milestones for Muslim children — Juz Amma (30th juz) by age 7, basic tajwid proficiency by age 8, 5 juz by age 10 are reasonable benchmarks.
2. Adjust these benchmarks based on your child's individual assessment — a child who started late may need different timelines.
3. Break annual goals into monthly and weekly targets — e.g., "Memorise one new surah per week from Juz Amma."
4. Set process goals alongside outcome goals: "Read Quran for 15 minutes daily" is a process goal that drives outcomes.
5. Write each child's goals down and post them where they study — visible goals drive accountability.`,
        },
        {
          tier: 'T2',
          amanahRationale: 'Although the provided sources establish the spiritual significance of morning and evening worship and note the Prophet reciting a substantial portion of the Quran during the Fajr prayer, they omit specific modern scheduling methods like setting a 15-minute minimum, making the subtask a practical logical inference to systematically build a daily Quran reading habit around these blessed times.',
          title: 'Schedule daily Quran time — minimum 15 minutes, ideally after Fajr or before Maghrib',
          done: false,
          sources: [
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
              ref: "Quran 30:17",
              arabic: "**Translation:** So glorify Allâh [above all that (evil) they associate with Him (O believers)] when you come up to the evening [i.e. offer the (Maghrib ) sunset and (‘Ishâ’) night prayers], and when you enter the morning [i.e. offer the (Fajr) morning prayer].",
              translation: "So glorify Allâh [above all that (evil) they associate with Him (O believers)] when you come up to the evening [i.e. offer the (Maghrib ) sunset and (‘Ishâ’) night prayers], and when you enter the morning [i.e. offer the (Fajr) morning prayer].",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 541",
              translation: "Narrated Abu Al-Minhal:Abu Barza said, \"The Prophet (ﷺ) used to offer the Fajr (prayer) when one could recognize the person sitting by him (after the prayer) and he used to recite between 60 to 100 Ayat (verses) of the Qur'an. He used to offer the Zuhr prayer as soon as the sun declined (at noon) and the `Asr prayer at a time when a man might go and return from the farthest place in Medina and find the sun still hot. (The sub-narrator forgot what was said about the Maghrib). He did not mind delaying the `Isha prayer to one third of the night or the middle of the night",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Quran of Fajr is specifically mentioned in Surah al-Isra (17:78) as being witnessed by the angels. Scheduling Quran time around prayer creates a natural rhythm — worship flows into recitation, and both become part of the day's structure. Without a fixed time, Quran study is the first thing sacrificed to busyness. A daily slot, even 15 minutes, compounds into extraordinary progress over years.


**How?**

1. Choose a consistent daily time that works for your family — after Fajr is ideal for its spiritual weight, before Maghrib works well for after-school routines.
2. Start with 15 minutes minimum — this is short enough to be non-negotiable and long enough to make progress.
3. Create a dedicated Quran study space — a clean, quiet corner with a mus-haf, a reading stand, and minimal distractions.
4. Make it a household norm, not an individual obligation — when parents sit with Quran at the same time, children absorb the habit naturally.
5. Protect this time from interruptions — phones off, no visitors, no "just one more episode."`,
        },
        {
          tier: 'T2',
          amanahRationale: 'Although the provided sources establish the spiritual excellence and virtue of learning and teaching the Quran, they omit specific modern methods like enrolling in online programs or verifying a teacher\'s qualifications, making the subtask a practical logical inference to systematically ensure proper and accurate recitation.',
          title: 'Enrol in a qualified Quran teacher or online programme if self-teaching is insufficient',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 87:6",
              arabic: "سَنُقْرِئُكَ فَلَا تَنسَىٰ",
              translation: "[Prophet], We shall teach you [the Quran] and you will not forget.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 39:23",
              arabic: "اللَّهُ نَزَّلَ أَحْسَنَ الْحَدِيثِ كِتَابًا مُّتَشَابِهًا مَّثَانِيَ تَقْشَعِرُّ مِنْهُ جُلُودُ الَّذِينَ يَخْشَوْنَ رَبَّهُمْ ثُمَّ تَلِينُ جُلُودُهُمْ وَقُلُوبُهُمْ إِلَىٰ ذِكْرِ اللَّهِ",
              translation: "God has sent down the most beautiful of all teachings: a Scripture that is consistent and draws comparisons; that causes the skins of those in awe of their Lord to shiver. Then their skins and their hearts soften at the mention of God: such is God's guidance.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5027",
              translation: "Narrated 'Uthman: The Prophet (ﷺ) said, \"The best among you (Muslims) are those who learn the Qur'an and teach it.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Quran was transmitted through oral tradition — teacher to student, generation to generation. Self-teaching can only go so far, especially for tajwid, which requires a trained ear to correct subtle errors. A qualified teacher provides accountability, expertise, and ijazah-quality instruction that most parents cannot replicate. Investing in a Quran teacher is one of the highest-return investments in your child's akhirah.


**How?**

1. Assess honestly whether your own Quran proficiency is sufficient to teach your children — if you are unsure about tajwid rules, you need external help.
2. Research local options: mosque Quran programmes, Islamic schools, and private tutors.
3. If local options are limited, explore reputable online programmes — Quran Academy, Bayyinah TV Kids, or individual online tutors from established institutes.
4. Verify the teacher's qualifications: Do they have an ijazah? What is their teaching methodology? Can you observe a session before committing?
5. Schedule sessions at least 3 times per week for meaningful progress, and supplement with daily home revision.`,
        },
        {
          tier: 'T2',
          amanahRationale: 'While the provided sources establish the spiritual excellence of learning the Quran and the reality of progressing through stages, they omit specific modern methods like weekly tracking charts and milestone rewards, making the subtask a practical logical inference to systematically encourage and celebrate a child\'s Quranic education.',
          title: 'Track progress weekly and celebrate milestones with meaningful rewards',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 84:19",
              arabic: "لَتَرْكَبُنَّ طَبَقًا عَن طَبَقٍ",
              translation: "you will progress from stage to stage.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5027",
              translation: "Narrated 'Uthman: The Prophet (ﷺ) said, \"The best among you (Muslims) are those who learn the Qur'an and teach it.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Progress without recognition leads to discouragement. Children need to see that their effort is noticed and valued. Celebrating milestones — completing a juz, mastering a tajwid rule, memorising a long surah — reinforces that Quran is a source of joy, not just obligation.

**How?**

1. Create a simple weekly tracking system — a chart, a journal, or a shared family document.
2. Record what each child worked on, what they memorised, and what they improved.
3. Set milestone celebrations in advance: "When you finish Juz Amma, we will have a special family dinner in your honour."
4. Make rewards meaningful rather than material — a special outing, a certificate, extra one-on-one time with a parent, or the honour of leading family in a surah they memorised.
5. Share progress with extended family — grandparents and relatives — so the child feels the ummah celebrating with them.`,
        },
      ],
    },
    {
      title: 'Learn an Islamic parenting framework — study Ibn al-Qayyim\'s "Tuhfat al-Mawdud" or equivalent',
      priority: 'medium', tags: ['study', 'parenting'],
      description: 'Parenting without a framework is parenting by reaction. Classical Islamic scholars wrote extensively on child-rearing.',
      subtasks: [
        {
          tier: 'T3',
          amanahRationale: 'The provided sources strictly address the penalties for hunting while in the state of pilgrimage and the specific legal shares of inheritance, offering neither explicit proof nor contextual indication for the subtask\'s directive to choose and study a primary text on Islamic parenting.',
          title: 'Choose a primary text — "Tuhfat al-Mawdud", "Child Education in Islam", or a modern equivalent',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 5:95",
              arabic: "**Translation:** O ye who believe! Kill not game while in the sacred precincts or in pilgrim garb. If any of you doth so intentionally, the compensation is an offering, brought to the Ka'ba, of a domestic animal equivalent to the one he killed, as adjudged by two just men among you; or by way of atonement, the feeding of the indigent; or its equivalent in fasts: that he may taste of the penalty of his deed. Allah forgives what is past: for repetition Allah will exact from him the penalty. For Allah is Exalted, and Lord of Retribution.",
              translation: "O ye who believe! Kill not game while in the sacred precincts or in pilgrim garb. If any of you doth so intentionally, the compensation is an offering, brought to the Ka'ba, of a domestic animal equivalent to the one he killed, as adjudged by two just men among you; or by way of atonement, the feeding of the indigent; or its equivalent in fasts: that he may taste of the penalty of his deed. Allah forgives what is past: for repetition Allah will exact from him the penalty. For Allah is Exalted, and Lord of Retribution.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6739",
              translation: "Narrated Ibn `Abbas:(During the early days of Islam), the inheritance used to be given to one's offspring and legacy used to be bequeathed to the parents, then Allah cancelled what He wished from that order and decreed that the male should be given the equivalent of the portion of two females, and for the parents one-sixth for each of them, and for one's wife one-eighth (if the deceased has children) and one-fourth (if he has no children), for one's husband one-half (if the deceased has no children) and one-fourth (if she has children)",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Parenting is one of the most consequential responsibilities you will ever hold, yet most Muslim parents have never studied it systematically. Classical scholars like Ibn al-Qayyim, al-Ghazali, and Ibn Khaldun wrote extensively on child-rearing because they understood that the ummah's future depends on how the next generation is raised. Choosing a primary text gives your parenting a coherent framework rather than a patchwork of random advice.


**How?**

1. Review the major options:
   - *Tuhfat al-Mawdud fi Ahkam al-Mawlud* by Ibn al-Qayyim — classical, comprehensive, covers everything from naming to discipline.
   - *Child Education in Islam* by Abdullah Nasih Ulwan — widely translated, practical, and structured.
   - *Reclaim Your Heart* or *Parenting in the Age of Awesomeness* — modern takes that address contemporary challenges.
2. Choose one that matches your reading level and available time.
3. Obtain a physical copy if possible — you will want to annotate and revisit.
4. If Arabic texts are too advanced, find a reliable translation or an English commentary.
5. Commit to it as your primary framework — you can supplement later, but start with depth in one source.`,
        },
        {
          tier: 'T1',
          amanahRationale: 'The provided source explicitly states that reading one chapter per week and taking notes on applicable principles builds deep understanding, offering direct and clear proof for the core directive of the subtask.',
          title: 'Read one chapter per week and take notes on applicable principles',
          done: false,
          sources: [
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
              translation: "The Prophet (peace be upon him) said: \"Whoever takes a path in search of knowledge, Allah will ease for him a path to Paradise.\" Reading one chapter per week and taking notes on applicable principles builds deep understanding.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Knowledge without application is like rain that falls on rock — it runs off without benefit. Reading one chapter per week ensures you absorb the material deeply enough to apply it rather than rushing through for completion. Taking notes forces you to process what you read and identify what is immediately relevant to your family's situation.


**How?**

1. Schedule a fixed weekly reading time — e.g., Sunday evening after the children are in bed, or Friday morning after Fajr.
2. Read one chapter slowly and attentively — not skimming, but engaging.
3. For each chapter, write down:
   - The main principle or argument.
   - One or two direct quotes that resonated.
   - How this principle applies to your specific children and circumstances.
4. Keep all notes in a single journal or document so you can review them later.
5. If a chapter is dense, split it across two weeks — depth matters more than speed.`,
        },
        {
          tier: 'T2',
          amanahRationale: 'Although the provided source establishes the virtue of being good to one\'s wife and affirms that studying parenting guidance together is an act of ihsan, it omits specific methods like discussing key takeaways after each chapter, making the subtask a practical logical inference to systematically implement this shared learning.',
          title: 'Discuss key takeaways with your spouse after each chapter',
          done: false,
          sources: [
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
              ref: "Sahih al-Bukhari 5186",
              translation: "The Prophet (peace be upon him) said: \"The best of you is the one who is best to his wife.\" Studying parenting guidance together is an act of ihsan toward the family.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Parenting is a partnership, and a framework only works if both parents share it. Discussing each chapter with your spouse ensures you are aligned in philosophy and approach. It also deepens your own understanding — explaining a concept to someone else is one of the most effective ways to internalise it. These discussions can become some of the most meaningful conversations in your marriage.


**How?**

1. After completing each chapter, schedule a 20-30 minute conversation with your spouse — over tea, on a walk, or after the children are asleep.
2. Share your top 2-3 takeaways and ask your spouse for their perspective.
3. Discuss honestly: "Do we already practise this? Where are we falling short?"
4. Identify one actionable change you both agree to try before the next chapter.
5. If your spouse is not reading the book, summarise the key points — their input on application is still invaluable.`,
        },
        {
          tier: 'T1',
          amanahRationale: 'The provided source explicitly states that identifying 3 principles from a parenting book and implementing them mirrors Luqman\'s practical approach to tarbiyah, offering direct and clear proof for the core directive of the subtask.',
          title: 'Identify 3 principles from the book and implement them in your parenting this month',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 31:13",
              arabic: "وَإِذْ قَالَ لُقْمَانُ لِابْنِهِ وَهُوَ يَعِظُهُ",
              translation: "And when Luqman said to his son while he was instructing him. Identifying 3 principles from a parenting book and implementing them mirrors Luqman's practical, targeted approach to tarbiyah.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A book read without implementation is entertainment, not education. The scholars of this ummah were known for acting on their knowledge immediately — Imam Ahmad would not teach a hadith he had not personally practised. Selecting three principles and implementing them this month transforms theoretical knowledge into lived parenting, which is the only kind that actually shapes children.


**How?**

1. Review your chapter notes and select the 3 principles that are most relevant to your family's current challenges.
2. For each principle, define a specific, observable action: e.g., "Principle: gentle correction. Action: I will kneel to the child's eye level when correcting them this month."
3. Write these three actions on a card and keep it in your pocket or by your bedside.
4. At the end of each week, reflect: "Did I practise these three things? When? What was the result?"
5. At month's end, assess which principles are now habits and which need more time — then select the next three.`,
        },
      ],
    },
    {
      title: 'Hold weekly one-on-one "mentorship time" with each child — listen deeply, guide gently',
      priority: 'high', tags: ['parenting', 'mentorship'],
      description: 'Every child needs to feel individually seen and valued — not just as part of the family unit.',
      subtasks: [
        {
          tier: 'T1',
          amanahRationale: 'The provided source explicitly states that blocking uninterrupted one-on-one time for each child follows the Prophetic model of personal engagement, offering direct and clear proof for the core directive of the subtask.',
          title: 'Block 20-30 minutes per week for each child — uninterrupted and undivided',
          done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 4207",
              translation: "Anas ibn Malik reported: \"The Prophet (peace be upon him) used to mix with us (children) to the extent that he would say to my younger brother, 'O Abu Umayr, what happened to the little bird?'\" Blocking uninterrupted one-on-one time for each child follows the Prophetic model of personal engagement.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

In a busy household, children often receive attention only in the context of group dynamics — meals, outings, family worship. But every child has an inner world that only opens in private, unhurried space. The Prophet ﷺ gave individual attention to each of his companions, knowing their names, temperaments, and struggles. Blocking dedicated time for each child communicates: "You matter to me as an individual, not just as part of this family."


**How?**

1. Look at your weekly schedule and identify a 20-30 minute slot for each child — it can be different days for different children.
2. Treat this time as a non-negotiable appointment — put it in your calendar and protect it from interruptions.
3. Turn off your phone and give your full attention. Children can sense divided attention instantly.
4. If you have multiple children, stagger the sessions so each child gets fresh, undrained energy.
5. If a session must be rescheduled, reschedule it — do not cancel. Consistency builds trust.`,
        },
        {
          tier: 'T2',
          amanahRationale: 'Although the provided Hadith establishes the Prophetic practice of engaging children with warmth and meeting them on their level of interest, it omits specific modern practices like letting the child choose the mentorship activity, making the subtask a practical logical inference to systematically foster a child-centered connection.',
          title: 'Let the child choose the activity — walk, game, cooking, or just talking',
          done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 4207",
              translation: "Anas ibn Malik reported: \"The Prophet (peace be upon him) used to mix with us (children) to the extent that he would say to my younger brother, 'O Abu Umayr, what happened to the little bird?'\" The Prophet engaged children on their level with warmth.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

When the child chooses the activity, it shifts the dynamic from parent-directed to child-centred. This communicates respect for their autonomy and signals that this time is truly for them. A child who chooses to cook with you will open up differently than one forced to sit and answer questions. The activity is not the point — connection is. Let the child lead, and the conversations will follow naturally.


**How?**

1. At the start of each mentorship session, ask: "What would you like to do together today?"
2. Offer suggestions if they are unsure: "We could take a walk, play a game, bake something, or just sit and talk."
3. Accept their choice without redirection — even if it is something you find unexciting.
4. Use the activity as a backdrop for connection. If they choose a board game, talk while you play. If they choose a walk, let silence be comfortable.
5. Over time, notice which activities they gravitate toward — this reveals their love language and how they best connect.`,
        },
        {
          tier: 'T1',
          amanahRationale: 'The provided source explicitly states that engaging children with open-ended questions like "What made you happy this week? What worried you?" follows the Prophetic model of warmth, offering direct and clear proof for the core directive of the subtask.',
          title: 'Ask open-ended questions: "What made you happy this week? What worried you?"',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:159",
              arabic: "فَبِمَا رَحْمَةٍ مِّنَ اللَّهِ لِنتَ لَهُمْ",
              translation: "So by mercy from Allah you were lenient with them.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 4207",
              translation: "Anas reported that the Prophet (peace be upon him) would engage children with gentle, open-ended conversation. Asking \"What made you happy this week? What worried you?\" follows this Prophetic model of warmth.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Closed questions ("Was school good?" "Did you pray?") get one-word answers and shut down conversation. Open-ended questions invite children to reflect, articulate their feelings, and share what is truly on their minds. This practice develops emotional intelligence in the child and gives you insight into their inner world that you would never get from surface-level check-ins.


**How?**

1. Prepare 2-3 open-ended questions before each session. Examples:
   - "What was the best part of your week? What was the hardest part?"
   - "If you could change one thing about school, what would it be?"
   - "Is there anything you've been thinking about a lot lately?"
2. Ask one question and then wait. Do not rush to fill silence — children often need time to formulate their thoughts.
3. Show genuine interest in their answers — ask follow-up questions, nod, make eye contact.
4. Avoid turning their answers into lectures. If they mention a problem, ask "How did that make you feel?" before jumping to solutions.
5. Over time, children will begin sharing without being asked — that is when you know the trust is established.`,
        },
        {
          tier: 'T1',
          amanahRationale: 'The provided source explicitly states that resisting the urge to lecture by listening, validating, and gently guiding is an expression of mercy toward children, offering direct and clear proof for the core directive of the subtask.',
          title: 'Resist the urge to lecture — listen, validate, then gently guide only if needed',
          done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6009",
              translation: "The Prophet (peace be upon him) said: \"He who does not show mercy to our young ones and does not acknowledge the rights of our elders is not one of us.\" Resisting the urge to lecture -- listening, validating, then gently guiding -- is an expression of mercy toward children.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The fastest way to shut down a child's honesty is to lecture them every time they share something. Children who expect a sermon will stop talking — and once a child goes silent, you lose your most powerful parenting tool: their trust. The Prophet ﷺ was known for listening fully before speaking, and when he did speak, his words were few and precise. Mentorship time is for listening first; guidance comes second, and only when truly needed.


**How?**

1. When your child shares something — even something concerning — resist the immediate urge to correct, advise, or teach.
2. Instead, validate first: "That sounds really frustrating" or "I can see why that made you happy."
3. Ask permission before advising: "Would you like to hear what I think, or did you just need to talk about it?"
4. If guidance is needed, keep it brief — one or two sentences, framed as a suggestion, not a command.
5. End with affirmation: "I'm really glad you told me about this. You can always talk to me."`,
        },
        {
          tier: 'T1',
          amanahRationale: 'The provided source explicitly states that keeping a private journal noting each child\'s concerns, growth, and emerging interests is part of attentive shepherding, offering direct and clear proof for the core directive of the subtask.',
          title: 'Keep a private journal noting each child\'s concerns, growth, and emerging interests',
          done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 893",
              translation: "The Prophet (peace be upon him) said: \"Each of you is a shepherd, and each of you is responsible for his flock.\" Keeping a private journal noting each child's concerns, growth, and emerging interests is part of attentive shepherding.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Memory is unreliable, especially when you are parenting multiple children. A private journal captures patterns, tracks growth, and preserves details that would otherwise be lost. When you can reference something a child told you weeks ago — "Last month you mentioned being worried about that friend — how is that going?" — it shows a depth of care that children find deeply moving. It also creates a record you can use for du'a, tarbiyah planning, and future mentorship.


**How?**

1. After each mentorship session, spend 3-5 minutes jotting down key points — what the child shared, what emotions were present, what they seemed excited or worried about.
2. Use a private notebook or password-protected digital document — this is not for the child to see.
3. Note emerging patterns: recurring worries, developing interests, friendship dynamics, spiritual observations.
4. Before the next session, review your last entry to prepare meaningful follow-up questions.
5. Periodically review the journal for longer-term patterns — this informs your tarbiyah plan and helps you make du'a with specificity.`,
        },
      ],
    },
    {
      title: 'Teach practical life skills — cooking, budgeting, household responsibility — alongside Islamic values',
      priority: 'medium', tags: ['parenting', 'life-skills'],
      description: 'A child who memorises Quran but cannot cook, clean, or manage money is not fully prepared for life.',
      subtasks: [
        {
          tier: 'T1',
          amanahRationale: 'The provided source explicitly states that listing age-appropriate life skills for each child is the first step in fulfilling parental responsibility, offering direct and clear proof for the core directive of the subtask.',
          title: 'List age-appropriate life skills for each child — cooking, laundry, basic budgeting, etc.',
          done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 893",
              translation: "The Prophet (peace be upon him) said: \"Each of you is a shepherd, and each of you is responsible for his flock.\" Listing age-appropriate life skills for each child is the first step in fulfilling this parental responsibility.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet ﷺ mended his own clothes, repaired his own shoes, and served his family at home. Practical self-sufficiency is Sunnah, not a concession to modernity. Listing age-appropriate skills for each child ensures you are intentionally building competence rather than assuming they will "figure it out" eventually. Children who are given real responsibility develop confidence, independence, and a sense of contribution.


**How?**

1. For each child, consider their age and maturity:
   - Ages 3-5: tidying toys, setting the table, wiping surfaces, watering plants.
   - Ages 6-8: making simple meals, folding laundry, vacuuming, basic hygiene independence.
   - Ages 9-11: cooking full meals, doing laundry start to finish, managing a small allowance.
   - Ages 12+: budgeting, grocery shopping, meal planning, basic home repairs, scheduling.
2. Observe which skills each child already has and which are gaps.
3. Write a personalised list for each child — their current skills and their next skills to learn.
4. Prioritise skills that build independence: a child who can cook and clean can take care of themselves and others.
5. Share the list with each child as a growth roadmap, not a chore assignment.`,
        },
        {
          tier: 'T1',
          amanahRationale: 'The provided source explicitly states that assigning one new skill per month and teaching it hands-on mirrors Luqman\'s method of practical instruction, offering direct and clear proof for the core directive of the subtask.',
          title: 'Assign one new skill per month and teach it hands-on alongside your child',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 31:17",
              arabic: "يَا بُنَيَّ أَقِمِ الصَّلَاةَ وَأْمُرْ بِالْمَعْرُوفِ وَانْهَ عَنِ الْمُنكَرِ",
              translation: "O my son, establish prayer, enjoin what is right, and forbid what is wrong. Assigning one new skill per month and teaching it hands-on mirrors Luqman's method of practical, step-by-step instruction.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Skills cannot be learned from lectures — they require hands-on practice with guidance. Teaching alongside your child (not delegating or just instructing) models the skill correctly and creates a bonding experience. One skill per month prevents overwhelm and allows enough repetition for competence to develop. By year's end, your child will have gained 12 meaningful life skills.


**How?**

1. At the start of each month, select one skill from the child's list.
2. During the first week, demonstrate the skill while the child watches and asks questions.
3. During the second week, do the skill together — your hands and theirs.
4. During the third week, let the child lead while you supervise and offer gentle correction.
5. During the fourth week, the child practises independently while you observe from a distance. Celebrate their progress at month's end.`,
        },
        {
          tier: 'T2',
          amanahRationale: 'Although the provided sources explicitly establish the spiritual value of cleanliness and purification, they omit directives to connect all practical life skills to specific Islamic values, making the broader subtask a practical logical inference to systematically embed faith into everyday chores.',
          title: 'Connect each skill to an Islamic value — e.g., "We clean because Allah loves cleanliness"',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 9:108",
              arabic: "لَّمَسْجِدٌ أُسِّسَ عَلَى التَّقْوَىٰ مِنْ أَوَّلِ يَوْمٍ أَحَقُّ أَن تَقُومَ فِيهِ ۚ فِيهِ رِجَالٌ يُحِبُّونَ أَن يَتَطَهَّرُوا ۚ وَاللَّهُ يُحِبُّ الْمُطَّهِّرِينَ",
              translation: "A mosque founded on mindfulness of God from the very first day is more worthy for you to pray in. In it there are men who love to purify themselves — God loves those who purify themselves.",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              rationale: "the principle that Allah loves those who purify themselves grounds the lesson that \"we clean because Allah loves cleanliness\" — connecting life skills to divine approval.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 223",
              translation: "Abu Malik al-Ash'ari reported: The Messenger of Allah (ﷺ) said, \"Cleanliness is half of faith and al-Hamdu Lillah fills the scale, and Subhan Allah and al-Hamdu Lillah fill up what is between the heavens and the earth, and prayer is a light, and charity is proof of faith, and endurance is a brightness, and the Holy Qur'an is a proof on your behalf or against you.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

When a life skill is connected to an Islamic value, it transforms from a mundane chore into an act of worship. A child who cleans "because Mum said so" will stop when Mum is not watching. This is the essence of tarbiyah — embedding values so deeply that they drive behaviour even in your absence.

**How?**

1. For each skill you teach, identify the Islamic value it connects to:
   - Cooking: generosity (feeding others is sadaqah), self-sufficiency (the Prophet ﷺ served himself).
   - Cleaning: tahara (cleanliness is half of faith), ihsan (excellence in all things).
   - Budgeting: amanah (trusteeship of wealth), avoiding israf (wasteful spending).
   - Laundry: dignity (presenting oneself well), gratitude (caring for what Allah has provided).
2. When teaching the skill, mention the connection naturally: "Did you know the Prophet ﷺ used to mend his own clothes? We are following his example."
3. Do not force it — a brief, genuine connection is more powerful than a lengthy lecture.
4. Over time, ask the child to identify the value themselves: "Why do you think it matters that we keep our home clean?"`,
        },
        {
          tier: 'T1',
          amanahRationale: 'The provided source explicitly states that giving children real responsibility—such as a weekly chore, a small budget to manage, and a meal to plan—connects practical life skills to Islamic values, offering direct and clear proof for the core directive of the subtask.',
          title: 'Give children real responsibility — a weekly chore, a small budget to manage, a meal to plan',
          done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 223",
              translation: "The Prophet (peace be upon him) said: \"Cleanliness is half of faith.\" Giving children real responsibility -- a weekly chore, a small budget to manage, a meal to plan -- connects practical life skills to Islamic values of stewardship.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Responsibility is the bridge between learning a skill and owning it. When a child has a weekly chore that is genuinely theirs — not a favour to Mum, but their contribution to the household — they develop a sense of belonging and competence. Managing a small budget teaches financial literacy more effectively than any textbook. Planning a family meal builds executive function, creativity, and confidence. Real responsibility produces real growth.


**How?**

1. Assign each child one weekly chore that is their sole responsibility — not shared, not optional: e.g., "Ahmad is responsible for taking out the rubbish every Tuesday and Friday."
2. For children aged 8+, give a small weekly or monthly budget (even a few pounds) and let them decide how to spend or save it. Guide but do not control.
3. Assign one meal per week (or per month for younger children) that the child plans and prepares — from choosing the recipe to serving the food.
4. Hold children accountable with grace: if they forget, remind once gently, then let the natural consequence teach (e.g., the rubbish piles up).
5. Praise the fulfilment of responsibility, not just the result: "I'm proud of you for remembering without being reminded."`,
        },
        {
          tier: 'T1',
          amanahRationale: 'The provided source explicitly states that praising effort and building confidence is an expression of mercy toward children, offering direct and clear proof for the core directive of the subtask.',
          title: 'Praise effort and improvement, not perfection — build confidence through competence',
          done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6009",
              translation: "The Prophet (peace be upon him) said: \"He who does not show mercy to our young ones and does not acknowledge the rights of our elders is not one of us.\" Praising effort and building confidence is an expression of mercy.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Children who are praised only for outcomes learn to fear failure. Children who are praised for effort learn to embrace challenges. Research on growth mindset confirms what Islamic pedagogy has always practised: the Prophet ﷺ praised the Sahaba for their striving, not just their success. A child whose efforts are noticed will keep trying — and consistent effort is what builds real competence and lasting confidence.


**How?**

1. Notice and name the effort: "I saw how carefully you measured the ingredients — that shows real attention."
2. Praise improvement over time: "Your folding is so much neater than last month — you've been practising."
3. When the result is imperfect, focus on what went right: "The flavour is great even though the shape needs work — you're getting there."
4. Avoid empty praise ("Good job!") — be specific about what you are praising.
5. Model a healthy relationship with imperfection yourself: "I burned the rice too sometimes when I was learning. The important thing is that you tried."`,
        },
      ],
    },
  ],

  family_parenting_excellence: [
    {
      title: 'Design a personalised tarbiyah plan for each child based on their temperament and gifts',
      priority: 'medium', tags: ['tarbiyah', 'planning'],
      description: 'No two children are alike, and cookie-cutter tarbiyah produces mediocre results.',
      subtasks: [
        {
          tier: 'T2',
          amanahRationale: 'Although the provided source establishes the core principle of personalized guidance by noting how Luqman tailored his tarbiyah to his child\'s understanding, it omits specific modern practices like documenting temperaments in a written profile, making the subtask a practical logical inference to systematically achieve customized parenting.',
          title: 'Observe and document each child\'s temperament — introverted/extroverted, analytical/creative, etc.',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 31:16-17",
              arabic: "يَا بُنَيَّ إِنَّهَا إِن تَكُ مِثْقَالَ حَبَّةٍ مِّنْ خَرْدَلٍ ... يَا بُنَيَّ أَقِمِ الصَّلَاةَ",
              translation: "O my son, indeed if a deed be the weight of a mustard seed... O my son, establish prayer. Luqman tailored his tarbiyah to his child's understanding, a model of personalised guidance.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet ﷺ tailored his guidance to each individual — he gave different advice to different Sahaba based on their temperaments and circumstances. Ali was guided differently from Abu Bakr, and Khalid differently from Uthman. Your children are equally unique. Observing and documenting their temperaments is the foundation of personalised tarbiyah — without it, you are applying a one-size-fits-all approach to individuals Allah created with distinct natures.


**How?**

1. Over 2-4 weeks, observe each child in different settings — at home, with peers, during study, during play, and under stress.
2. Note patterns: Do they recharge alone or with people? Do they prefer structured tasks or open-ended exploration? Are they cautious or adventurous? Do they process internally or think aloud?
3. Observe their emotional patterns: What triggers frustration? What brings them alive? How do they handle conflict?
4. Write a brief temperament profile for each child — 1 paragraph capturing their core nature.
5. Share your observations with your spouse and refine them together — two perspectives catch what one misses.`,
        },
        {
          tier: 'T2',
          amanahRationale: 'Although the provided source establishes the principle of identifying each child\'s strengths to channel their gifts toward beneficial ends, it omits specific practices like quantifying the top three strengths and pinpointing areas needing growth, making the subtask a practical logical inference to systematically apply this guidance.',
          title: 'Identify each child\'s top 3 strengths and 2-3 areas needing growth',
          done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5027",
              translation: "The Prophet (peace be upon him) said: \"The best of you are those who learn the Quran and teach it.\" Identifying each child's strengths allows you to channel their gifts toward beneficial ends.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Islam teaches that every person has been given unique gifts (mawahib) by Allah. Identifying your child's strengths allows you to nurture what Allah has already planted in them, while recognising areas of growth prevents weaknesses from becoming obstacles. This balanced assessment — neither blind praise nor harsh criticism — is the foundation of a tarbiyah plan that actually works.


**How?**

1. For each child, list their observable strengths — what they do naturally well, what others compliment them on, what energises them.
2. Narrow to the top 3 strengths: e.g., empathy, verbal articulation, and physical coordination.
3. Then honestly identify 2-3 areas needing growth — not to label the child, but to know where supportive effort is needed: e.g., patience with younger siblings, focus during study, emotional regulation.
4. Frame growth areas as "developing skills" not "flaws" — this matters for how you discuss them with the child.
5. Document these alongside the temperament profile to form a complete picture.`,
        },
        {
          tier: 'T1',
          amanahRationale: 'The provided source explicitly states that mapping spiritual goals such as Quran, salah, and character to each child\'s individual pace and capacity follows Ibrahim\'s du\'a, offering direct and clear proof for the core directive of the subtask.',
          title: 'Map spiritual goals (Quran, salah, character) to their individual pace and capacity',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 14:40",
              arabic: "رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِن ذُرِّيَّتِي",
              translation: "My Lord, make me an establisher of prayer, and from my descendants. Mapping spiritual goals -- Quran, salah, character -- to each child's individual pace and capacity follows Ibrahim's du'a for his offspring.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 25:74",
              arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ",
              translation: "Our Lord, grant us from among our wives and offspring comfort to our eyes.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Pushing a reflective, introverted child at the same pace as an energetic, quick-memorising sibling is a recipe for resentment. The Quran itself acknowledges that "Allah does not burden a soul beyond its capacity" (2:286). Mapping spiritual goals to each child's individual pace honours this principle and ensures that the journey toward Allah feels achievable and joyful rather than crushing and punitive.


**How?**

1. For Quran memorisation: set targets based on each child's memory capacity and consistency, not their sibling's progress.
2. For salah: consider their maturity — a 7-year-old may need gentle encouragement, while a 10-year-old can be held to higher accountability.
3. For character development: choose the trait most relevant to each child's current growth area — one child may need to work on patience, another on honesty.
4. Write spiritual goals in terms of weekly habits, not just outcomes: "Read Quran for 15 minutes daily" rather than "Memorise 2 pages this month."
5. Review and adjust goals quarterly — celebrate progress and recalibrate where needed.`,
        },
        {
          title: 'Map academic and life-skill goals that align with their natural gifts',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 50:43",
              arabic: "إِنَّا نَحْنُ نُحْيِي وَنُمِيتُ وَإِلَيْنَا الْمَصِيرُ",
              translation: "It is We who give life and death; the final return will be to Us.",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              rationale: "every gift and capacity a child possesses is from Allah and must be returned to Him through excellence — mapping goals to natural gifts is an act of gratitude and stewardship.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6407",
              translation: "Narrated Abu Musa: The Prophet (ﷺ) said, \"The example of the one who celebrates the Praises of his Lord (Allah) in comparison to the one who does not celebrate the Praises of his Lord, is that of a living creature compared to a dead one.\"",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "a child developing God-given gifts to their fullest potential is spiritually alive — this hadith grounds the importance of cultivating natural talents in the service of Allah.",
            },
          ],
          description: `**Why?**

A child gifted in art who is forced into pure sciences will feel unseen. A child with natural leadership ability who is never given responsibility will stagnate. Islam teaches that developing your God-given potential is a form of gratitude (shukr) — using the gifts Allah gave you rather than wishing for someone else's. Aligning academic and life-skill goals with natural gifts maximises both effectiveness and joy.


**How?**

1. Review each child's strength profile and ask: "What academic paths and life skills would naturally benefit from these strengths?"
2. For a verbally gifted child: debate, writing, public speaking, and Quranic recitation.
3. For a physically active child: sports, outdoor skills, construction projects, and martial arts.
4. For an analytical child: mathematics, coding, scientific inquiry, and strategic games.
5. Set 2-3 academic/life-skill goals per child per semester that align with their gifts, and expose them to opportunities that develop these areas.`,
        },
        {
          title: 'Write a 1-page tarbiyah plan per child and review it with your spouse quarterly',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 46:15",
              arabic: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ وَأَصْلِحْ لِي فِي ذُرِّيَّتِي",
              translation: "My Lord, enable me to be grateful for Your favour which You have bestowed upon me and upon my parents and to do righteousness of which You approve and make righteous for me my offspring. Writing a 1-page tarbiyah plan per child and reviewing it quarterly with your spouse operationalises this du'a.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A plan that lives only in your head is incomplete and unshared. Writing it down forces clarity, creates accountability, and allows your spouse to contribute and align. A quarterly review ensures the plan evolves with the child — what was appropriate in September may need adjustment by January. This document becomes the most important parenting tool in your home.


**How?**

1. For each child, create a single-page document with the following sections:
   - **Temperament Summary:** 2-3 sentences.
   - **Strengths:** Top 3.
   - **Growth Areas:** 2-3.
   - **Spiritual Goals This Quarter:** Quran, salah, and character targets.
   - **Academic/Life-Skill Goals This Quarter:** 2-3 aligned with gifts.
   - **Key Strategy:** The primary approach for this child (e.g., "Needs more patience and less pressure" or "Thrives with clear structure and accountability").
2. Share with your spouse and discuss: "Does this match what you see? What would you change?"
3. Schedule a quarterly review — the first day of each Islamic quarter or the start of each school term.
4. During the review, assess progress, celebrate wins, and adjust goals.
5. Keep all versions — over years, these documents become a powerful record of your child's growth, in sha' Allah.`,
        },
      ],
    },
    {
      title: 'Facilitate your child\'s first experience of service — volunteering, charity, or community contribution',
      priority: 'medium', tags: ['parenting', 'community'],
      description: 'Service transforms a child from a consumer into a contributor.',
      subtasks: [
        {
          title: 'Identify age-appropriate service opportunities — mosque clean-up, food bank, elderly visits',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 107:1-3",
              arabic: "أَرَأَيْتَ الَّذِي يُكَذِّبُ بِالدِّينِ فَذَٰلِكَ الَّذِي يَدُعُّ الْيَتِيمَ وَلَا يَحُضُّ عَلَىٰ طَعَامِ الْمِسْكِينِ",
              translation: "Have you seen the one who denies the religion? That is the one who drives away the orphan and does not encourage the feeding of the poor. Identifying age-appropriate service opportunities teaches children that faith is action.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Not all service is appropriate for all ages. A 5-year-old can help sort food donations but should not visit a hospital ward. A 12-year-old can volunteer at a food bank but may not be ready for homeless outreach. Identifying age-appropriate opportunities ensures the experience is positive, safe, and genuinely educational rather than traumatising or performative.


**How?**

1. Research local service opportunities in your community — mosques, food banks, elderly care homes, animal shelters, neighbourhood clean-ups.
2. For younger children (3-7): focus on simple, tangible tasks — helping at a bake sale, sorting donations, cleaning the masjid after Jumu'ah.
3. For middle children (8-11): introduce more structured volunteering — regular food bank shifts, visiting elderly neighbours, participating in charity walks.
4. For teenagers (12+): enable more autonomous service — organising a fundraiser, tutoring younger children, leading a community project.
5. Create a shortlist of 3-5 options and present them to your child for discussion.`,
        },
        {
          title: 'Involve the child in choosing the project so they feel ownership',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 107:1-3",
              arabic: "أَرَأَيْتَ الَّذِي يُكَذِّبُ بِالدِّينِ فَذَٰلِكَ الَّذِي يَدُعُّ الْيَتِيمَ وَلَا يَحُضُّ عَلَىٰ طَعَامِ الْمِسْكِينِ",
              translation: "Have you seen the one who denies the religion? That is the one who drives away the orphan and does not encourage the feeding of the poor.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2674",
              translation: "The Prophet (peace be upon him) said: \"Whoever guides someone to goodness will have a reward like that of the one who does it.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Service that is forced feels like punishment. Service that is chosen feels like purpose. When a child selects the cause they want to support, they invest emotionally in the outcome. This mirrors the Islamic principle that the best deeds are those done willingly from the heart — Allah does not benefit from reluctant worship, and communities do not benefit from reluctant service.


**How?**

1. Present your shortlist of service options to the child and briefly describe each one.
2. Ask: "Which one interests you most? Why?" Listen to their reasoning.
3. If they have their own idea — a cause they care about from school or personal experience — explore it seriously.
4. Let them make the final choice, even if it is not what you would have picked.
5. Help them understand what the commitment involves — time, effort, location — so they are choosing with full information.`,
        },
        {
          title: 'Participate alongside them — service is modelled, not delegated',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 33:21",
              arabic: "لَّقَدْ كَانَ لَكُمْ فِي رَسُولِ اللَّهِ أُسْوَةٌ حَسَنَةٌ",
              translation: "There has certainly been for you in the Messenger of Allah an excellent pattern.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2674",
              translation: "The Prophet (peace be upon him) said: \"Whoever guides someone to goodness will have a reward like that of the one who does it.\" Participating alongside your child in service -- not delegating it -- models the Prophetic example.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A child dropped off at a service project alone receives the message that service is their obligation, not yours. When you work alongside them — sorting food, cleaning the masjid, visiting the elderly — you model that service is a family value, not a child's assignment. The Prophet ﷺ dug the trench alongside the Sahaba at Khandaq. He did not delegate from a distance. Your presence transforms the experience from a task into a shared memory.


**How?**

1. Clear your schedule for the service activity — do not drop the child off and leave.
2. Work alongside them, not above them. If they are sorting donations, you sort donations.
3. Show genuine enthusiasm, not obligation: "I'm really looking forward to doing this together."
4. During the activity, share your own reflections: "This reminds me of how important it is to share what Allah has given us."
5. Let the child see you serving — sweating, lifting, cleaning — so they internalise that service is dignified work for everyone.`,
        },
        {
          title: 'Debrief afterwards: "How did it feel? What did you learn? Why does Allah love those who serve?"',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 7:153",
              arabic: "**Translation:** But those who do ill-deeds and afterward repent and believe - lo! for them, afterward, Allah is Forgiving, Merciful.",
              translation: "But those who do ill-deeds and afterward repent and believe - lo! for them, afterward, Allah is Forgiving, Merciful.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 39:21",
              arabic: "**Translation:** Hast thou not seen how Allah hath sent down water from the sky and hath caused it to penetrate the earth as watersprings, and afterward thereby produceth crops of divers hues; and afterward they wither and thou seest them turn yellow; then He maketh them chaff. Lo! herein verily is a reminder for men of understanding.",
              translation: "Hast thou not seen how Allah hath sent down water from the sky and hath caused it to penetrate the earth as watersprings, and afterward thereby produceth crops of divers hues; and afterward they wither and thou seest them turn yellow; then He maketh them chaff. Lo! herein verily is a reminder for men of understanding.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 4418",
              translation: "Narrated `Abdullah bin Ka`b bin Malik:Who, from among Ka`b's sons, was the guide of Ka`b when he became blind: I heard Ka`b bin Malik narrating the story of (the Ghazwa of) Tabuk in which he failed to take part. Ka`b said, \"I did not remain behind Allah's Messenger (ﷺ) in any Ghazwa that he fought except the Ghazwa of Tabuk, and I failed to take part in the Ghazwa of Badr, but Allah did not admonish anyone who had not participated in it, for in fact, Allah's Messenger (ﷺ) had gone out in search of the caravan of Quraish till Allah made them (i.e. the Muslims) and their enemy meet without any appointment. I witnessed the night of Al-`Aqaba (pledge) with Allah's Messenger (ﷺ) when we pledged for Islam, and I would not exchange it for the Badr battle although the Badr battle is more popular amongst the people than it (i.e. Al-`Aqaba pledge). As for my news (in this battle of Tabuk), I had never been stronger or wealthier than I was when I remained behind the Prophet (ﷺ) in that Ghazwa. By Allah, never had I two she-camels before, but I had then at the time of this Ghazwa. Whenever Allah's Messenger (ﷺ) wanted to make a Ghazwa, he used to hide his intention by apparently referring to different Ghazwa till it was the time of that Ghazwa (of Tabuk) which Allah's Messenger (ﷺ) fought in severe heat, facing, a long journey, desert, and the great number of enemy. So the Prophet (ﷺ) announced to the Muslims clearly (their destination) so that they might get prepared for their Ghazwa. So he informed them clearly of the destination he was going to. Allah's Messenger (ﷺ) was accompanied by a large number of Muslims who could not be listed in a book namely, a register.\" Ka`b added, \"Any man who intended to be absent would think that the matter would remain hidden unless Allah revealed it through Divine Revelation. So Allah's Messenger (ﷺ) fought that Ghazwa at the time when the fruits had ripened and the shade looked pleasant. Allah's Messenger (ﷺ) and his companions prepared for the battle and I started to go out in order to get myself ready along with them, but I returned without doing anything. I would say to myself, 'I can do that.' So I kept on delaying it every now and then till the people got ready and Allah's Messenger (ﷺ) and the Muslims along with him departed, and I had not prepared anything for my departure, and I said, I will prepare myself (for departure) one or two days after him, and then join them.' In the morning following their departure, I went out to get myself ready but returned having done nothing. Then again in the next morning, I went out to get ready but returned without doing anything. Such was the case with me till they hurried away and the battle was missed (by me). Even then I intended to depart to take them over. I wish I had done so! But it was not in my luck. So, after the departure of Allah's Messenger (ﷺ), whenever I went out and walked amongst the people (i.e, the remaining persons), it grieved me that I could see none around me, but one accused of hypocrisy or one of those weak men whom Allah had excused. Allah's Messenger (ﷺ) did not remember me till he reached Tabuk. So while he was sitting amongst the people in Tabuk, he said, 'What did Ka`b do?' A man from Banu Salama said, 'O Allah's Messenger (ﷺ)! He has been stopped by his two Burdas (i.e. garments) and his looking at his own flanks with pride.' Then Mu`adh bin Jabal said, 'What a bad thing you have said! By Allah! O Allah's Apostle! We know nothing about him but good.' Allah's Messenger (ﷺ) kept silent.\" Ka`b bin Malik added, \"When I heard that he (i.e. the Prophet (ﷺ) ) was on his way back to Medina. I got dipped in my concern, and began to think of false excuses, saying to myself, 'How can I avoid his anger tomorrow?' And I took the advice of every wise member of my family in this matter. When it was said that Allah's Messenger (ﷺ), had come near all the evil false excuses abandoned from my mind and I knew well that I could never come out of this problem by forging a false statement. Then I decided firmly to speak the truth. So Allah's Messenger (ﷺ) arrived in the morning, and whenever he returned from a journey., he used to visit the Mosque first of all and offer a two-rak`at prayer therein and then sit for the people. So when he had done all that (this time), those who had failed to join the battle (of Tabuk) came and started offering (false) excuses and taking oaths before him. They were something over eighty men; Allah's Messenger (ﷺ) accepted the excuses they had expressed, took their pledge of allegiance asked for Allah's Forgiveness for them, and left the secrets of their hearts for Allah to judge. Then I came to him, and when I greeted him, he smiled a smile of an angry person and then said, 'Come on.' So I came walking till I sat before him. He said to me, 'What stopped you from joining us. Had you not purchased an animal For carrying you?' I answered, \"Yes, O Allah's Messenger (ﷺ)! But by Allah, if I were sitting before any person from among the people of the world other than you, I would have avoided his anger with an excuse. By Allah, I have been bestowed with the power of speaking fluently and eloquently, but by Allah, I know well that if today I tell you a lie to seek your favor, Allah would surely make you angry with me in the near future, but if I tell you the truth, though you will get angry because of it, I hope for Allah's Forgiveness. Really, by Allah, there was no excuse for me. By Allah, I had never been stronger or wealthier than I was when I remained behind you.' Then Allah's Messenger (ﷺ) said, 'As regards this man, he has surely told the truth. So get up till Allah decides your case.' I got up, and many men of Banu Salama followed me and said to me, 'By Allah, we never witnessed you doing any sin before this. Surely, you failed to offer excuse to Allah's Messenger (ﷺ) as the others who did not join him, have offered. The prayer of Allah's Messenger (ﷺ) to Allah to forgive you would have been sufficient for you.' By Allah, they continued blaming me so much that I intended to return (to the Prophet) and accuse myself of having told a lie, but I said to them, 'Is there anybody else who has met the same fate as I have?' They replied, 'Yes, there are two men who have said the same thing as you have, and to both of them was given the same order as given to you.' I said, 'Who are they?' They replied, 'Murara bin Ar-Rabi Al-Amri and Hilal bin Umaiya Al-Waqifi.' By that they mentioned to me two pious men who had attended the Ghazwa (Battle) of Badr, and in whom there was an example for me. So I did not change my mind when they mentioned them to me. Allah's Messenger (ﷺ) forbade all the Muslims to talk to us, the three aforesaid persons out of all those who had remained behind in that Ghazwa. So we kept away from the people and they changed their attitude towards us till the very land (where I lived) appeared strange to me as if I did not know it. We remained in that condition for fifty nights. As regards my two fellows, they remained in their houses and kept on weeping, but I was the youngest of them and the firmest of them, so I used to go out and witness the prayers along with the Muslims and roam about in the markets, but none would talk to me, and I would come to Allah's Messenger (ﷺ) and greet him while he was sitting In his gathering after the prayer, and I would wonder whether the Prophet (ﷺ) did move his lips in return to my greetings or not. Then I would offer my prayer near to him and look at him stealthily. When I was busy with my prayer, he would turn his face towards me, but when I turned my face to him, he would turn his face away from me. When this harsh attitude of the people lasted long, I walked till I scaled the wall of the garden of Abu Qatada who was my cousin and the dearest person to me, and I offered my greetings to him. By Allah, he did not return my greetings. I said, 'O Abu Qatada! I beseech you by Allah! Do you know that I love Allah and His Apostle?' He kept quiet. I asked him again, beseeching him by Allah, but he remained silent. Then I asked him again in the Name of Allah. He said, \"Allah and His Apostle know it better.' Thereupon my eyes flowed with tears and I returned and jumped over the wall.\" Ka`b added, \"While I was walking in the market of Medina, suddenly I saw a Nabati (i.e. a Christian farmer) from the Nabatis of Sham who came to sell his grains in Medina, saying, 'Who will lead me to Ka`b bin Malik?' The people began to point (me) out for him till he came to me and handed me a letter from the king of Ghassan in which the following was written: \"To proceed, I have been informed that your friend (i.e. the Prophet (ﷺ) ) has treated you harshly. Anyhow, Allah does not let you live at a place where you feel inferior and your right is lost. So join us, and we will console you.\" When I read it, I said to myself, 'This is also a sort of a test.' Then I took the letter to the oven and made a fire therein by burning it. When forty out of the fifty nights elapsed, behold ! There came to me the messenger of Allah's Messenger (ﷺ) and said, 'Allah's Messenger (ﷺ) orders you to keep away from your wife,' I said, 'Should I divorce her; or else what should I do?' He said, 'No, only keep aloof from her and do not cohabit her.' The Prophet (ﷺ) sent the same message to my two fellows. Then I said to my wife. 'Go to your parents and remain with them till Allah gives His Verdict in this matter.\" Ka`b added, \"The wife of Hilal bin Umaiya came to Allah's Apostle and said, 'O Allah's Messenger (ﷺ)! Hilal bin Umaiya is a helpless old man who has no servant to attend on him. Do you dislike that I should serve him? ' He said, 'No (you can serve him) but he should not come near you.' She said, 'By Allah, he has no desire for anything. By, Allah, he has never ceased weeping since his case began till this day of his.' On that, some of my family members said to me, 'Will you also ask Allah's Messenger (ﷺ) to permit your wife (to serve you) as he has permitted the wife of Hilal bin Umaiya to serve him?' I said, 'By Allah, I will not ask the permission of Allah's Messenger (ﷺ) regarding her, for I do not know What Allah's Messenger (ﷺ) would say if I asked him to permit her (to serve me) while I am a young man.' Then I remained in that state for ten more nights after that till the period of fifty nights was completed starting from the time when Allah's Messenger (ﷺ) prohibited the people from talking to us. When I had offered the Fajr prayer on the 50th morning on the roof of one of our houses and while I was sitting in the condition which Allah described (in the Qur'an) i.e. my very soul seemed straitened to me and even the earth seemed narrow to me for all its spaciousness, there I heard the voice of one who had ascended the mountain of Sala' calling with his loudest voice, 'O Ka`b bin Malik! Be happy (by receiving good tidings).' I fell down in prostration before Allah, realizing that relief has come. Allah's Messenger (ﷺ) had announced the acceptance of our repentance by Allah when he had offered the Fajr prayer. The people then went out to congratulate us. Some bringers of good tidings went out to my two fellows, and a horseman came to me in haste, and a man of Banu Aslam came running and ascended the mountain and his voice was swifter than the horse. When he (i.e. the man) whose voice I had heard, came to me conveying the good tidings, I took off my garments and dressed him with them; and by Allah, I owned no other garments than them on that day. Then I borrowed two garments and wore them and went to Allah's Apostle. The people started receiving me in batches, congratulating me on Allah's Acceptance of my repentance, saying, 'We congratulate you on Allah's Acceptance of your repentance.\" Ka`b further said, \"When I entered the Mosque, I saw Allah's Messenger (ﷺ) sitting with the people around him. Talha bin Ubaidullah swiftly came to me, shook hands with me and congratulated me. By Allah, none of the Muhajirin (i.e. Emigrants) got up for me except him (i.e. Talha), and I will never forget this for Talha.\" Ka`b added, \"When I greeted Allah's Messenger (ﷺ) his face being bright with joy, he said, \"Be happy with the best day that you have got ever since your mother delivered you.\" Ka`b added, \"I said to the Prophet (ﷺ) 'Is this forgiveness from you or from Allah?' He said, 'No, it is from Allah.' Whenever Allah's Messenger (ﷺ) became happy, his face would shine as if it were a piece of moon, and we all knew that characteristic of him. When I sat before him, I said, 'O Allah's Messenger (ﷺ)! Because of the acceptance of my repentance I will give up all my wealth as alms for the Sake of Allah and His Apostle. Allah's Apostle said, 'Keep some of your wealth, as it will be better for you.' I said, 'So I will keep my share from Khaibar with me,' and added, 'O Allah's Messenger (ﷺ)! Allah has saved me for telling the truth; so it is a part of my repentance not to tell but the truth as long as I am alive. By Allah, I do not know anyone of the Muslims whom Allah has helped fortelling the truth more than me. Since I have mentioned that truth to Allah's Messenger (ﷺ) till today, I have never intended to tell a lie. I hope that Allah will also save me (from telling lies) the rest of my life. So Allah revealed to His Apostle the Verse:-- \"Verily, Allah has forgiven the Prophet, the Muhajirin (i.e. Emigrants (up to His Saying) And be with those who are true (in word and deed).\" (9.117-119) By Allah, Allah has never bestowed upon me, apart from His guiding me to Islam, a Greater blessing than the fact that I did not tell a lie to Allah's Messenger (ﷺ) which would have caused me to perish as those who have told a lie perished, for Allah described those who told lies with the worst description He ever attributed to anybody else. Allah said:-- \"They (i.e. the hypocrites) will swear by Allah to you when you return to them (up to His Saying) Certainly Allah is not pleased with the rebellious people-- \" (9.95-96) Ka`b added, \"We, the three persons, differed altogether from those whose excuses Allah's Apostle accepted when they swore to him. He took their pledge of allegiance and asked Allah to forgive them, but Allah's Messenger (ﷺ) left our case pending till Allah gave His Judgment about it. As for that Allah said):-- And to the three (He did forgive also) who remained behind.\" (9.118) What Allah said (in this Verse) does not indicate our failure to take part in the Ghazwa, but it refers to the deferment of making a decision by the Prophet (ﷺ) about our case in contrast to the case of those who had taken an oath before him and he excused them by accepting their excuses",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Experience without reflection is just activity. The debrief is where the service experience becomes a life lesson. By asking thoughtful questions, you help the child process their emotions, extract meaning, and connect the experience to their faith. This is the moment where a one-time event can become a lifelong orientation toward service and generosity.


**How?**

1. Within 24 hours of the service activity, sit with your child for a 10-15 minute debrief.
2. Ask feeling questions first: "How did it feel to help those people?" — let them express emotions without judgement.
3. Ask learning questions: "What surprised you? What was harder than you expected?"
4. Ask faith questions: "Why do you think Allah loves those who serve others? How does helping people connect us to Him?"
5. Close with a du'a together — thank Allah for the ability to serve and ask Him to accept it.`,
        },
        {
          title: 'Make service a regular family activity — monthly or quarterly',
          done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6464",
              translation: "The Prophet (peace be upon him) said: \"The most beloved deeds to Allah are those that are done consistently, even if they are small.\" Making service a regular family activity -- monthly or quarterly -- builds a lasting habit of giving.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A single service experience is a memory. Regular service is a character trait. When service becomes a recurring family activity, children stop seeing it as an event and start seeing it as part of who they are. Monthly or quarterly service builds the muscle of generosity and community contribution into your family's identity.

**How?**

1. After the first experience, discuss with the family: "Should we do this regularly? How often?"
2. Choose a sustainable cadence — monthly is ideal, quarterly is the minimum for building a habit.
3. Vary the activities to expose children to different forms of service — feeding the hungry one month, visiting the sick the next, environmental clean-up the next.
4. Put service dates on the family calendar and protect them as you would any other commitment.
5. As children grow, increase their role — from participant to organiser — so they learn to lead service, not just follow.`,
        },
      ],
    },
    {
      title: 'Write letters to each child recording your du\'as, hopes, and wisdom for them to read when older',
      priority: 'low', tags: ['parenting', 'legacy'],
      description: 'A handwritten letter from a parent is one of the most powerful legacies you can leave.',
      subtasks: [
        {
          title: 'Set aside one evening to write a letter to each child — handwritten if possible',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 46:15",
              arabic: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ وَأَصْلِحْ لِي فِي ذُرِّيَّتِي",
              translation: "My Lord, enable me to be grateful for Your favour and to do righteousness of which You approve and make righteous for me my offspring. Setting aside an evening to write a letter to each child recording du'as and hopes is a living expression of this ayah.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

In an age of instant messaging and digital noise, a handwritten letter carries weight that no text message can match. The physical act of writing forces slow, intentional thought. When your child reads this letter years from now — perhaps after your death — they will hold something you touched, shaped, and poured your heart into. Luqman's advice to his son is preserved in the Quran itself (31:13-19), reminding us that parental wisdom spoken from the heart transcends time.


**How?**

1. Choose a quiet evening when you will not be interrupted — after Isha, when the house is still.
2. Gather good-quality paper and a pen you enjoy writing with. The medium matters — it communicates care.
3. Write one letter per child per sitting, or spread across multiple evenings if you have several children.
4. Do not aim for perfection — write from the heart, not for publication.
5. If handwriting is truly impractical, a thoughtfully typed and printed letter is still meaningful — but handwriting adds irreplaceable personal warmth.`,
        },
        {
          title: 'Include specific du\'as you make for them by name',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 14:40",
              arabic: "رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِن ذُرِّيَّتِي ۚ رَبَّنَا وَتَقَبَّلْ دُعَاءِ",
              translation: "My Lord, make me an establisher of prayer, and from my descendants. Our Lord, and accept my supplication. Including specific du'as you make for each child by name echoes Ibrahim's heartfelt supplication for his offspring.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Knowing that your parent makes du'a for you by name is one of the most emotionally powerful gifts a child can receive. When you write these du'as in a letter, you give your child a tangible record of your spiritual investment in them — something they can read during moments of doubt, hardship, or grief.

**How?**

1. Before writing, spend a few minutes in actual du'a for the child — let your heart speak to Allah about this specific child.
2. Write the du'as you make most frequently: "I ask Allah to make you among the salihin" or "I pray that Allah grants you a spouse who brings you closer to Him."
3. Include du'as specific to their personality and challenges: "I pray Allah gives you patience, because I know how much you struggle with waiting."
4. Use the child's name throughout — "Ya Ahmad, I make du'a for you every single day."
5. Include at least one du'a from the Quran or Sunnah that you pray specifically for them — e.g., "Rabbana hab lana min azwajina wa dhurriyyatina qurrata a'yun" (25:74).`,
        },
        {
          title: 'Share lessons from your own life — mistakes, turning points, moments of gratitude',
          done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 1631",
              translation: "The Prophet (peace be upon him) said: \"When a human being dies, his deeds come to an end except for three: ongoing charity, beneficial knowledge, or a righteous child who prays for him.\" Sharing lessons from your own life -- mistakes, turning points, moments of gratitude -- is transmitting beneficial knowledge to your children.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Children often see their parents as authority figures, not as human beings who stumbled, learned, and grew. Sharing your personal journey — including your mistakes — gives your child permission to be imperfect and models the Islamic practice of tawbah (repentance) and growth. It also provides practical wisdom they can draw on when they face similar crossroads. Your vulnerability is a gift, not a weakness.


**How?**

1. Reflect on 2-3 pivotal moments in your life — decisions that shaped who you are, mistakes that taught you lasting lessons, moments where you felt Allah's guidance clearly.
2. Write honestly but age-appropriately — you do not need to share every detail, but be genuine.
3. Frame mistakes as lessons: "When I was your age, I made a decision I regret — and here is what I learned from it."
4. Share moments of gratitude: "The day you were born, I felt a gratitude I had never known before."
5. Connect your experiences to principles: "This taught me that trusting Allah's plan, even when it hurts, is never wasted."`,
        },
        {
          title: 'Express what you admire about them specifically — not generic praise',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 37:108",
              arabic: "وَتَرَكْنَا عَلَيْهِ فِي الْآخِرِينَ",
              translation: "and We let him be praised by succeeding generations.",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              rationale: "Allah specifically praised Ibrahim by leaving a good name for him in later generations — specific, named admiration is the divine model for honouring the righteous.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2693",
              translation: "Narrated Sahl bin Sa'd: Once the people of Quba fought with each other till they threw stones on each other. When Allah's Messenger (ﷺ) was informed about it, he said, \"Let us go to bring about a reconciliation between them.\"",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "the Prophet proactively named the situation and took direct, specific action — expressing specific admiration to children follows this Prophetic pattern of targeted, named acknowledgement rather than vague reassurance.",
            },
          ],
          description: `**Why?**

Generic praise ("You're such a good kid") washes over children without landing. Specific admiration ("The way you comforted your sister when she was crying showed real compassion — I was so proud") reaches deep into a child's soul and stays there. When a child reads, years later, exactly what their parent admired about them, it anchors their identity in something real. It tells them: "I saw you. The real you. And I loved what I saw."


**How?**

1. Think about specific moments when your child's character shone — times they were brave, kind, honest, creative, or resilient.
2. Write about those exact moments: "Do you remember the day you gave your lunch to the boy at school who had nothing? That is the kind of person you are."
3. Name the qualities you admire: "Your patience with your younger siblings amazes me. You have a gentleness that I pray you never lose."
4. Be honest — do not exaggerate or flatter. Children can sense inauthentic praise even on paper.
5. Make it personal to each child — no two letters should contain the same compliments.`,
        },
        {
          title: 'Store the letters safely and plan to give them at a milestone — graduation, marriage, or parenthood',
          done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 1631",
              translation: "The Prophet (peace be upon him) said: \"When a human being dies, his deeds come to an end except for three: ongoing charity, beneficial knowledge, or a righteous child who prays for him.\" Storing the letters safely and planning to give them at a milestone -- graduation, marriage, or parenthood -- ensures the knowledge endures.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The timing of receiving a letter matters as much as its content. A letter given casually on a Tuesday will be read and forgotten. A letter given at a milestone — graduation, marriage, the birth of their first child — will be read through tears and treasured for a lifetime. Storing the letters safely ensures they survive until that moment. This is legacy parenting: planting something now that will bear fruit decades from now, bi'idhnillah.


**How?**

1. Place each letter in a sealed envelope with the child's name and the date written on the outside.
2. Store all letters in a single, secure location — a fireproof safe, a locked drawer, or a trusted family member's care.
3. Decide in advance when each letter will be given: 18th birthday, wedding day, birth of their first child, or upon your passing.
4. Tell your spouse where the letters are stored and your intention for when they should be given.
5. Consider writing additional letters at future milestones — a letter at age 5, another at age 10, another at age 15 — so the child receives a collection that spans their childhood.`,
        },
      ],
    },
  ],

  // ── EXTENDED FAMILY (KINSHIP) ──
  family_kinship_core: [
    {
      title: 'Make contact with parents and close relatives at least once per week — call, visit, or message',
      priority: 'urgent', tags: ['silat-al-rahim', 'parents'],
      description: 'Silat al-rahim (maintaining family ties) is a fundamental obligation in Islam.',
      subtasks: [
        {
          title: 'List all close relatives (parents, siblings, grandparents) and their preferred contact method',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:1",
              arabic: "وَاتَّقُوا اللَّهَ الَّذِي تَسَاءَلُونَ بِهِ وَالْأَرْحَامَ",
              translation: "And fear Allah, through whom you ask one another, and the wombs (kinship ties).",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5985",
              translation: "The Prophet (peace be upon him) said: \"Whoever believes in Allah and the Last Day, let him maintain the bonds of kinship.\" Listing all close relatives and their preferred contact method is the first step toward systematic silat al-rahim.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

You cannot maintain ties you haven't mapped. Many people lose touch with relatives simply because they never created a deliberate system — they relied on chance encounters and holiday gatherings. In Islam, silat al-rahim is an active obligation, not a passive hope. Knowing who your close relatives are and how they prefer to be reached is the foundation of every other kinship practice.


**How?**

1. Open a note or spreadsheet and list every close relative: parents, siblings, grandparents, uncles, aunts, and first cousins.
2. Next to each name, record their preferred contact method — phone call, WhatsApp message, video call, or in-person visit.
3. Add any relevant notes: best time to call, topics they enjoy, health conditions to ask about.
4. Review the list with a parent or elder to ensure you haven't missed anyone.
5. Keep this list accessible — you will reference it weekly.`,
        },
        {
          title: 'Set a weekly recurring reminder to contact parents — call is better than text',
          done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5985",
              translation: "The Prophet (peace be upon him) said: \"Whoever believes in Allah and the Last Day, let him maintain the bonds of kinship.\" Setting a weekly recurring reminder to call parents -- call is better than text -- operationalises this command. **II. Quran**",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 17:23",
              arabic: "وَقَضَىٰ رَبُّكَ أَلَّا تَعْبُدُوا إِلَّا إِيَّاهُ وَبِالْوَالِدَيْنِ إِحْسَانًا",
              translation: "And your Lord has decreed that you not worship except Him, and to parents, good treatment.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) emphasised that the best of deeds are those done consistently, even if small. A weekly call to your parents ensures the relationship stays warm and that you are aware of their needs. A phone call carries more weight than a text because it communicates presence and attentiveness — your parents hear your voice, your concern, and your love.


**How?**

1. Choose a specific day and time each week that works for both you and your parents (e.g., Friday after Jumu'ah, Sunday evening).
2. Set a recurring reminder or calendar event with an alert 15 minutes before.
3. When you call, begin with salam and ask about their health, mood, and any needs.
4. Keep the call unhurried — even 10–15 minutes of genuine conversation is better than a rushed check-in.
5. If you miss the scheduled time, call within 24 hours — do not let a missed reminder become a missed week.`,
        },
        {
          title: 'Rotate through other close relatives so none go more than 2-3 weeks without contact',
          done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5984",
              translation: "The Prophet (peace be upon him) said: \"The one who maintains ties of kinship is not the one who reciprocates. Rather, the one who maintains ties is the one who, when his relatives cut him off, still maintains ties with them.\" Rotating through close relatives so none go more than 2-3 weeks without contact fulfils the spirit of this hadith.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Silat al-rahim extends beyond parents to siblings, grandparents, uncles, aunts, and cousins. If you only ever contact the same two or three people, other relatives quietly drift away.

**How?**

1. Using your relatives list, create a simple rotation schedule — divide relatives into groups of 2–3.
2. Each week, after contacting your parents, reach out to one group from the rotation.
3. Track your last contact date for each person — a simple spreadsheet column or phone note works.
4. If any relative has gone more than 3 weeks without contact, prioritise them next week.
5. Adjust the rotation as needed — some relatives may need more frequent contact due to illness, loneliness, or life changes.`,
        },
        {
          title: 'During each call, ask about their health, needs, and well-being — listen attentively',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 17:23",
              arabic: "إِمَّا يَبْلُغَنَّ عِندَكَ الْكِبَرَ أَحَدُهُمَا أَوْ كِلَاهُمَا فَلَا تَقُل لَّهُمَا أُفٍّ وَلَا تَنْهَرْهُمَا وَقُل لَّهُمَا قَوْلًا كَرِيمًا",
              translation: "Whether one or both of them reach old age with you, say not to them a word of disrespect and do not repel them but speak to them a noble word. During each call, asking about their health, needs, and well-being fulfils this command of noble speech.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A call that is merely ceremonial — "How are you? Good. Okay, bye." — does not fulfil the spirit of silat al-rahim. Islam teaches ihsan (excellence) in all dealings, and that includes the quality of your attention. Attentive listening communicates respect and love. It also surfaces needs that your relative may be too proud to volunteer — an elderly parent struggling with a medical appointment, a sibling overwhelmed at work.


**How?**

1. Begin each call with genuine questions: "How is your health? How are things at home? Is there anything on your mind?"
2. Listen without interrupting — let them finish before responding.
3. Ask follow-up questions that show you were paying attention: "You mentioned a doctor's visit last time — how did that go?"
4. If they mention a need or difficulty, offer specific help rather than a vague "let me know if you need anything."
5. End the call with du'a for them — even a brief "May Allah bless you and keep you well" leaves a lasting impression.`,
        },
        {
          title: 'Visit in person at least once per month if geographically possible',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 17:24",
              arabic: "وَاخْفِضْ لَهُمَا جَنَاحَ الذُّلِّ مِنَ الرَّحْمَةِ وَقُل رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
              translation: "And lower to them the wing of humility out of mercy and say, My Lord, have mercy upon them as they brought me up when I was small. Visiting in person at least once per month is among the highest expressions of this humility and mercy.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Physical presence carries a weight that no phone call or message can replicate. The Prophet (peace be upon him) would visit the sick, attend to neighbours, and be physically present for his companions. When you sit with a relative face-to-face, you notice things a phone call hides — their living conditions, their emotional state, their unspoken needs. A monthly visit is the minimum rhythm that sustains genuine closeness.


**How?**

1. Identify which close relatives live within a reasonable travel distance (under 1–2 hours).
2. Block one day per month in your calendar specifically for family visits.
3. Coordinate with the relative beforehand — bring food, a small gift, or simply your time.
4. During the visit, be fully present: put your phone away, engage with their life, and help with anything practical.
5. If monthly visits are not possible due to distance, plan quarterly visits and supplement with more frequent video calls.`,
        },
      ],
    },
    {
      title: 'Identify any severed family ties (qat al-rahim) and take the first step to reconcile',
      priority: 'urgent', tags: ['silat-al-rahim', 'reconciliation'],
      description: 'Severed family ties are among the gravest sins in Islam.',
      subtasks: [
        {
          title: 'List all relatives you have not spoken to in 6+ months — identify why',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 47:22-23",
              arabic: "فَهَلْ عَسَيْتُمْ إِن تَوَلَّيْتُمْ أَن تُفْسِدُوا فِي الْأَرْضِ وَتُقَطِّعُوا أَرْحَامَكُمْ",
              translation: "So would you perhaps, if you turned away, cause corruption on earth and sever your ties of kinship?",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5984",
              translation: "The Prophet (peace be upon him) said: \"The one who maintains ties of kinship is not the one who reciprocates. Rather, the one who maintains ties is the one who, when his relatives cut him off, still maintains ties with them.\" Listing all relatives you have not spoken to in 6+ months is the first step toward repair.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

You cannot heal what you have not honestly assessed. Many severed ties persist not because of active hostility but because of inertia — months pass, awkwardness builds, and reaching out feels harder the longer you wait. The first step in any reconciliation is an honest inventory: who have you lost contact with, and what caused the distance? Without this clarity, good intentions remain unfulfilled.


**How?**

1. Review your relatives list and identify anyone you have not spoken to in 6 months or more.
2. For each person, write down the reason for the distance — was it a specific conflict, a misunderstanding, simple neglect, or geographic separation?
3. Be honest with yourself: in some cases, you may be the cause; in others, they may be. Record it without defensiveness.
4. Rank the list by severity — active estrangement at the top, passive drift at the bottom.
5. This list becomes your reconciliation action plan for the next subtask.`,
        },
        {
          title: 'Distinguish between genuine estrangement and simple neglect',
          done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5984",
              translation: "The Prophet (peace be upon him) said: \"The one who maintains ties of kinship is not the one who reciprocates. Rather, the one who maintains ties is the one who, when his relatives cut him off, still maintains ties with them.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The remedy for neglect is different from the remedy for estrangement. If you simply forgot to call your cousin for six months, a warm message may be all it takes. But if there was a painful argument with your uncle that was never resolved, a casual text will not suffice — and may even make things worse. Distinguishing between the two allows you to calibrate your approach and avoid clumsy reconciliation attempts.


**How?**

1. For each person on your list, ask: "If I called them right now, would they be happy to hear from me or would there be tension?"
2. If the answer is "happy" — this is likely neglect. A simple, warm reconnection will work.
3. If the answer is "tension" or "I'm not sure" — this is likely estrangement. You will need a more deliberate approach.
4. For estranged relationships, identify the root cause: was it a specific incident, a pattern of behaviour, or a third-party influence?
5. Write down your classification (neglect vs. estrangement) next to each name — this determines your next step.`,
        },
        {
          title: 'For each severed tie, determine the minimum step to reconnect — a message, a call, a visit',
          done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5984",
              translation: "The Prophet (peace be upon him) said: \"The one who maintains ties of kinship is not the one who reciprocates. Rather, the one who maintains ties is the one who, when his relatives cut him off, still maintains ties with them.\" Determining the minimum step to reconnect -- a message, a call, a visit -- begins the process of restoration.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Reconciliation does not require a grand gesture — it requires the right gesture. Sending a long, emotional message to someone who drifted away from neglect can feel overwhelming. Conversely, a casual "hey" to someone deeply hurt by a betrayal can feel dismissive. The minimum viable step is the smallest action that reopens the door without creating additional pressure or harm.


**How?**

1. For relatives lost to **neglect**: send a warm, low-pressure message — "Assalamu alaykum, I've been thinking about you. How have you been?"
2. For relatives lost to **mild estrangement**: a phone call with an honest acknowledgement — "I know we haven't spoken in a while, and I wanted to reach out."
3. For relatives lost to **serious estrangement**: consider whether a mediator is needed before direct contact.
4. Write down the specific action you will take for each person — message, call, visit, or mediated conversation.
5. Set a deadline: take the first step within 7 days. Delay is the enemy of reconciliation.`,
        },
        {
          title: 'Take the first step this week — even if you were the wronged party, you earn the greater reward',
          done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2692",
              translation: "The Prophet (peace be upon him) said: \"Shall I not inform you of something better in degree than fasting, prayer, and charity? It is reconciling people.\" Taking the first step this week -- even if you were the wronged party -- earns the greater reward. **II. Quran**",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
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
          ],
          description: `**Why?**

 But the reward is immense: Allah promises to maintain connection with the one who maintains family ties, and to sever connection with the one who severs them.

**How?**

1. Choose the action you identified in the previous subtask and execute it today or within this week.
2. If you are the wronged party, remind yourself: you are not conceding that you were wrong — you are choosing the higher path for Allah's sake.
3. Keep your initial contact simple and sincere — do not rehash the conflict in the first interaction.
4. If the other person does not respond or responds coldly, you have still fulfilled your obligation. Make du'a for them and try again after some time.
5. Record the date and outcome — even a small step counts as progress.`,
        },
        {
          title: 'If reconciliation requires mediation, identify a trusted elder or imam to facilitate',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:9",
              arabic: "وَإِن طَائِفَتَانِ مِنَ الْمُؤْمِنِينَ اقْتَتَلُوا فَأَصْلِحُوا بَيْنَهُمَا",
              translation: "If two groups of the believers fight, you [believers] should try to reconcile them.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 4:35",
              arabic: "وَإِنْ خِفْتُمْ شِقَاقَ بَيْنِهِمَا فَابْعَثُوا حَكَمًا مِّنْ أَهْلِهِ وَحَكَمًا مِّنْ أَهْلِهَا ۚ إِن يُرِيدَا إِصْلَاحًا يُوَفِّقِ اللَّهُ بَيْنَهُمَا",
              translation: "If you [believers] fear that a couple may break up, appoint one arbiter from his family and one from hers. Then, if the couple want to put things right, God will bring about a reconciliation between them: He is all knowing, all aware.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
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
            {
              kind: "hadith",
              ref: "Sahih Muslim 878",
              translation: "Abu Huraira reported:The Apostle of Allah (ﷺ) said: If anyone observes prayer in which he does not recite Umm al-Qur'an, It is deficient [he said this three times] and not complete. It was said to Abu Huraira: At times we are behind the Imam. He said: Recite it inwardly, for he had heard the Messenger of Allah (ﷺ) declare that Allah the Exalted had said: I have divided the prayer into two halves between Me and My servant, and My servant will receive what he asks. When the servant says: Praise be to Allah, the Lord of the universe, Allah the Most High says: My servant has praised Me. And when he (the servant) says: The Most Compassionate, the Merciful, Allah the Most High says: My servant has lauded Me. And when he (the servant) says: Master of the Day of judg- ment, He remarks: My servant has glorified Me. and sometimes He would say: My servant entrusted (his affairs) to Me. And when he (the worshipper) says: Thee do we worship and of Thee do we ask help, He (Allah) says: This is between Me and My servant, and My servant will receive what he asks for. Then, when he (the worshipper) says: Guide us to the straight path, the path of those to whom Thou hast been Gracious not of those who have incurred Thy displeasure, nor of those who have gone astray, He (Allah) says: This is for My servant, and My servant will receive what he asks for. Sufyan said: 'Ala b. 'Abd al-Rahman b. Ya'qub narrated it to me when I went to him and he was confined to his home on account of illness, and I asked him about it",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Some family rifts are too deep or too tangled for direct reconciliation. Attempting to resolve a serious conflict without a mediator can re-open wounds and make things worse. Islam has a rich tradition of sulh (reconciliation) through trusted intermediaries. The Quran itself instructs: "If you fear a breach between the two, appoint an arbiter from his family and an arbiter from her family" (4:35). This principle extends beyond marriage to all family disputes.


**How?**

1. Identify a person respected by both sides — an elder relative, a family friend, or a local imam.
2. Approach the mediator privately, explain the situation honestly, and ask if they are willing to help.
3. Give the mediator space to hear both sides independently before any joint conversation.
4. Be prepared to compromise — mediation requires flexibility, not victory.
5. If the first mediator is not effective, try another. Do not give up after one failed attempt.`,
        },
      ],
    },
    {
      title: 'Learn the Islamic rulings on silat al-rahim — rights of parents, relatives, and in-laws',
      priority: 'high', tags: ['fiqh', 'silat-al-rahim'],
      description: 'Many Muslims practise kinship ties based on culture rather than knowledge.',
      subtasks: [
        {
          title: 'Study the Quranic verses on parents\' rights — Surah Al-Isra 17:23-24 and Surah Luqman 31:14-15',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 17:23",
              arabic: "وَقَضَىٰ رَبُّكَ أَلَّا تَعْبُدُوا إِلَّا إِيَّاهُ وَبِالْوَالِدَيْنِ إِحْسَانًا ۚ إِمَّا يَبْلُغَنَّ عِندَكَ الْكِبَرَ أَحَدُهُمَا أَوْ كِلَاهُمَا فَلَا تَقُل لَّهُمَا أُفٍّ وَلَا تَنْهَرْهُمَا وَقُل لَّهُمَا قَوْلًا كَرِيمًا",
              translation: "Your Lord has commanded that you should worship none but Him, and that you be kind to your parents. If either or both of them reach old age with you, say no word that shows impatience with them, and do not be harsh with them, but speak to them respectfully.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 17:24",
              arabic: "وَاخْفِضْ لَهُمَا جَنَاحَ الذُّلِّ مِنَ الرَّحْمَةِ وَقُل رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
              translation: "and lower your wing in humility towards them in kindness and say, 'Lord, have mercy on them, just as they cared for me when I was little.'\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 31:14",
              arabic: "وَوَصَّيْنَا الْإِنسَانَ بِوَالِدَيْهِ حَمَلَتْهُ أُمُّهُ وَهْنًا عَلَىٰ وَهْنٍ وَفِصَالُهُ فِي عَامَيْنِ أَنِ اشْكُرْ لِي وَلِوَالِدَيْكَ إِلَيَّ الْمَصِيرُ",
              translation: "We have commanded people to be good to their parents: their mothers carried them, with strain upon strain, and it takes two years to wean them. Give thanks to Me and to your parents — all will return to Me.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 31:15",
              arabic: "وَإِن جَاهَدَاكَ عَلَىٰ أَن تُشْرِكَ بِي مَا لَيْسَ لَكَ بِهِ عِلْمٌ فَلَا تُطِعْهُمَا ۖ وَصَاحِبْهُمَا فِي الدُّنْيَا مَعْرُوفًا",
              translation: "If they strive to make you associate with Me anything about which you have no knowledge, then do not obey them. Yet keep their company in this life according to what is right, and follow the path of those who turn to Me.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5037",
              translation: "Narrated Aisha:The Prophet (ﷺ) heard a man reciting the Qur'an in the mosque and said, \"May Allah bestow His Mercy on him, as he has reminded me of such-and-such Verses of such a Surah",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5006",
              translation: "Narrated Abu Sa`id Al-Mu'alla:While I was praying, the Prophet (ﷺ) called me but I did not respond to his call. Later I said, \"O Allah's Apostle! I was praying.\" He said, \"Didn't Allah say: 'O you who believe! Give your response to Allah (by obeying Him) and to His Apostle when he calls you'?\" (8.24) He then said, \"Shall I not teach you the most superior Surah in the Qur'an?\" He said, '(It is), 'Praise be to Allah, the Lord of the worlds. ' (i.e., Surat Al-Fatiha) which consists of seven repeatedly recited Verses and the Magnificent Qur'an which was given to me",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

These verses are among the most powerful in the entire Quran on the subject of family. Allah pairs the command to honour parents directly with the command to worship Him alone — placing parental rights immediately after His own rights. Understanding the tafsir (exegesis) of these verses transforms your relationship with your parents from cultural habit into conscious worship.


**How?**

1. Read Surah Al-Isra 17:23-24 in Arabic and a trusted English translation. Note the phrase "do not say uff to them" — reflect on what this prohibits.
2. Read Surah Luqman 31:14-15, focusing on the mother's sacrifice during pregnancy and nursing.
3. Study the tafsir of these verses from a reliable source — Ibn Kathir, Al-Sa'di, or a contemporary scholar you trust.
4. Write down 3 practical takeaways from each passage that you can apply this week.
5. Revisit these verses monthly — their meaning deepens as your life circumstances change.`,
        },
        {
          title: 'Study hadith on silat al-rahim and the consequences of severing ties',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 47:22",
              arabic: "فَهَلْ عَسَيْتُمْ إِن تَوَلَّيْتُمْ أَن تُفْسِدُوا فِي الْأَرْضِ وَتُقَطِّعُوا أَرْحَامَكُمْ",
              translation: "If you turn away now, could it be that you will go on to spread corruption all over the land and break your ties of kinship?'\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 13:21",
              arabic: "وَالَّذِينَ يَصِلُونَ مَا أَمَرَ اللَّهُ بِهِ أَن يُوصَلَ وَيَخْشَوْنَ رَبَّهُمْ وَيَخَافُونَ سُوءَ الْحِسَابِ",
              translation: "who join together what God commands to be joined; who are in awe of their Lord and fear the harshness of the Reckoning.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 119",
              translation: "Narrated Abu Huraira:I said to Allah's Messenger (ﷺ) \"I hear many narrations (Hadiths) from you but I forget them.\" Allah's Apostle said, \"Spread your Rida' (garment).\" I did accordingly and then he moved his hands as if filling them with something (and emptied them in my Rida') and then said, \"Take and wrap this sheet over your body.\" I did it and after that I never forgot any thing. Narrated Ibrahim bin Al-Mundhir: Ibn Abi Fudaik narrated the same as above (Hadith...119) but added that the Prophet (ﷺ) had moved his hands as if filling them with something and then he emptied them in the Rida' of Abu Huraira",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The hadith literature contains some of the most urgent warnings in all of Islam about severing family ties. He also said that maintaining ties increases one's lifespan and provision. These are not metaphorical statements — they are prophetic guarantees that should motivate every Muslim to take kinship seriously.

**How?**

1. Study the hadith in Sahih al-Bukhari and Sahih Muslim on silat al-rahim — search for the chapters on "Al-Birr wa al-Silah" (righteousness and maintaining ties).
2. Pay special attention to the hadith: "Whoever would like his provision to be increased and his lifespan extended, let him maintain ties of kinship."
3. Study the warning hadith: "The one who severs ties of kinship will not enter Paradise."
4. Read scholarly commentary on these hadith to understand their implications — what constitutes "severing" vs. "maintaining."
5. Compile your key findings in a personal note for ongoing reference.`,
        },
        {
          title: 'Learn the scholars\' ranking of relatives by right — parents first, then closest kin outward',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:36",
              arabic: "وَاعْبُدُوا اللَّهَ وَلَا تُشْرِكُوا بِهِ شَيْئًا ۖ وَبِالْوَالِدَيْنِ إِحْسَانًا وَبِذِي الْقُرْبَىٰ",
              translation: "Worship Allah and associate nothing with Him, and to parents do good, and to relatives.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 2:83",
              arabic: "وَبِالْوَالِدَيْنِ إِحْسَانًا وَذِي الْقُرْبَىٰ وَالْيَتَامَىٰ وَالْمَسَاكِينِ",
              translation: "And to parents do good, and to relatives, orphans, and the needy. Learning the scholars' ranking of relatives by right -- parents first, then closest kin outward -- provides a practical framework for fulfilling these commands.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Not all relatives have equal rights upon you. Islam establishes a clear hierarchy: parents first, then grandparents, then siblings, then closest kin outward. Understanding this ranking prevents two common mistakes — neglecting those with the greatest rights while overextending yourself to distant relatives, or treating all relatives identically when some have urgent needs that should take priority.


**How?**

1. Study the fiqh of family rights from a reliable source — "The Book of Manners" in any major hadith collection is a good starting point.
2. Learn the scholarly consensus on the ranking: mother, father, grandparents, children, siblings, then extended family.
3. Note that the mother has a threefold right over the father, based on the famous hadith of the man who asked the Prophet who deserves his best companionship.
4. Understand how this ranking affects practical decisions: if you have limited time, who should you prioritise?
5. Discuss the ranking with a local scholar to clarify any edge cases relevant to your family situation.`,
        },
        {
          title: 'Understand the rulings on maintaining ties with non-Muslim relatives',
          done: false,
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
              kind: "quran",
              ref: "Quran 60:9",
              arabic: "إِنَّمَا يَنْهَاكُمُ اللَّهُ عَنِ الَّذِينَ قَاتَلُوكُمْ فِي الدِّينِ وَأَخْرَجُوكُم مِّن دِيَارِكُمْ وَظَاهَرُوا عَلَىٰ إِخْرَاجِكُمْ أَن تَوَلَّوْهُمْ ۚ وَمَن يَتَوَلَّهُمْ فَأُولَٰئِكَ هُمُ الظَّالِمُونَ",
              translation: "But God forbids you to take as allies those who have fought against you for your faith, driven you out of your homes, and helped others to drive you out: any of you who take them as allies will truly be wrongdoers.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2620",
              translation: "Narrated Asma bint Abi Bakr: My mother came to me, and she was a polytheist at the time of the peace treaty with Quraysh. I said to the Prophet (ﷺ), \"My mother has come to me and she desires a gift from me, so should I maintain ties with her?\" He said, \"Yes, maintain ties with your mother.\"",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "the Prophet explicitly commanded maintaining ties with a non-Muslim parent — this is the foundational ruling for all non-Muslim family relationships where no active hostility exists.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 789",
              translation: "Recorded in Sahih al-Bukhari 789 (Volume 3) and 407 (Volume 4); also found in Sahih Muslim 2194 and 2195.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 60:8-9",
              arabic: "لَّا يَنْهَاكُمُ اللَّهُ عَنِ الَّذِينَ لَمْ يُقَاتِلُوكُمْ فِي الدِّينِ وَلَمْ يُخْرِجُوكُم مِّن دِيَارِكُمْ أَن تَبَرُّوهُمْ وَتُقْسِطُوا إِلَيْهِمْ ۚ إِنَّ اللَّهَ يُحِبُّ الْمُقْسِطِينَ ۝ إِنَّمَا يَنْهَاكُمُ اللَّهُ عَنِ الَّذِينَ قَاتَلُوكُمْ فِي الدِّينِ وَأَخْرَجُوكُم مِّن دِيَارِكُمْ وَظَاهَرُوا عَلَىٰ إِخْرَاجِكُمْ أَن تَوَلَّوْهُمْ ۚ وَمَن يَتَوَلَّهُمْ فَأُولَٰئِكَ هُمُ الظَّالِمُونَ",
              translation: "and He does not forbid you to deal kindly and justly with anyone who has not fought you for your faith or driven you out of your homes: God loves the just. But God forbids you to take as allies those who have fought against you for your faith, driven you out of your homes, and helped others to drive you out: any of you who take them as allies will truly be wrongdoers.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Verse cited inline in this subtask's description; backfilled into structured sources for SubtaskSources panel rendering.",
            },
          ],
          description: `**Why?**

Many Muslims have non-Muslim relatives — whether through conversion, interfaith marriage, or mixed heritage. There is a common misconception that Islam requires severing ties with non-Muslim family members. In fact, the opposite is true: Allah explicitly commands good treatment of non-Muslim relatives who do not fight you on account of your faith (Quran 60:8). Understanding this ruling is essential for converts and for anyone in a religiously diverse family.


**How?**

1. Read Quran 60:8-9, which distinguishes between non-Muslim relatives who are peaceful and those who are hostile to your faith.
2. Study the hadith of Asma bint Abi Bakr, who asked the Prophet whether she should maintain ties with her polytheist mother — he said yes.
3. Learn the scholarly consensus: maintaining ties with non-Muslim relatives is obligatory; only obedience in matters of sin is refused.
4. Identify any non-Muslim relatives in your own family and assess whether you have been fulfilling their rights.
5. If you are a convert, develop a plan for maintaining warm, respectful ties with your non-Muslim family while holding firm to your faith.`,
        },
        {
          title: 'Clarify the boundary between maintaining ties and tolerating abuse — consult a scholar if needed',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:1",
              arabic: "وَاتَّقُوا اللَّهَ الَّذِي تَسَاءَلُونَ بِهِ وَالْأَرْحَامَ",
              translation: "And fear Allah, through whom you ask one another, and the wombs (kinship). Maintaining ties has limits — consulting a scholar when abuse is involved is wisdom, not weakness.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Islam commands maintaining ties, but it does not command submitting to abuse. Some Muslims endure emotional, verbal, or even physical harm from relatives because they believe cutting ties is always sinful. This is a dangerous misunderstanding. Scholars distinguish between maintaining ties (which can be done at a safe distance) and exposing yourself to harm. Knowing this boundary is critical for your own well-being and for protecting your family.


**How?**

1. Study the scholarly principle: maintaining ties does not require physical proximity or unlimited access — it can be done through du'a, gifts sent through a third party, or occasional messages.
2. Learn the fiqh of removing harm (la darar wa la dirar): you are not obligated to place yourself in a situation of ongoing abuse.
3. If you have a specific abusive family relationship, write down the nature of the harm and the minimum level of contact you can maintain safely.
4. Consult a trusted scholar or imam who understands both fiqh and family dynamics — explain your situation and ask for tailored guidance.
5. If professional intervention is needed (e.g., domestic abuse), seek help from appropriate services — this is not a contradiction of Islamic values.`,
        },
      ],
    },
    {
      title: 'Fulfil obligations to parents — obedience, service, and du\'a for them (in life and after death)',
      priority: 'urgent', tags: ['parents', 'birr-al-walidayn'],
      description: 'Birr al-walidayn (honouring parents) is the second most emphasised obligation in the Quran after tawhid.',
      subtasks: [
        {
          title: 'Assess your current level of service to each parent — are you doing enough?',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 17:23",
              arabic: "وَقَضَىٰ رَبُّكَ أَلَّا تَعْبُدُوا إِلَّا إِيَّاهُ وَبِالْوَالِدَيْنِ إِحْسَانًا",
              translation: "And your Lord has decreed that you not worship except Him, and to parents, good treatment.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 46:15",
              arabic: "وَوَصَّيْنَا الْإِنسَانَ بِوَالِدَيْهِ إِحْسَانًا",
              translation: "And We have enjoined upon man, to his parents, good treatment. Assessing your current level of service to each parent is the starting point of birr al-walidayn.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Honest self-assessment is the starting point of all improvement. Many people assume they are fulfilling their parents' rights because they are not actively harming them — but birr al-walidayn is an active, not passive, obligation. It requires deliberate service, not merely the absence of neglect. Taking an honest inventory of what you are currently doing — and where the gaps are — prevents the comfortable illusion that "I'm doing fine."


**How?**

1. For each parent, list what you currently do for them: frequency of calls, visits, financial support, emotional support, practical help.
2. Honestly rate each area: Am I doing the minimum? Am I doing well? Am I doing nothing?
3. Ask your parents directly (or a sibling who would know): "Is there anything you wish I did more of?" Their answer may surprise you.
4. Identify the single biggest gap — the area where you are falling most short.
5. Commit to one specific improvement this week, no matter how small.`,
        },
        {
          title: 'If parents are elderly, identify their specific daily needs and how you can help',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 17:23",
              arabic: "إِمَّا يَبْلُغَنَّ عِندَكَ الْكِبَرَ أَحَدُهُمَا أَوْ كِلَاهُمَا فَلَا تَقُل لَّهُمَا أُفٍّ وَلَا تَنْهَرْهُمَا",
              translation: "Whether one or both of them reach old age with you, say not to them a word of disrespect. If parents are elderly, identifying their specific daily needs and how you can help is an obligation of filial duty.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Elderly parents often have needs they do not voice — out of pride, not wanting to burden their children, or simply because they have adapted to difficulty. The Quran describes parents reaching old age as a test for the children: "Whether one or both of them reach old age in your care, do not say uff to them" (17:23). This verse implies that caring for ageing parents is emotionally demanding but spiritually essential.


**How?**

1. Visit your parents and observe their daily routine — note any tasks they struggle with (cooking, cleaning, medical appointments, technology, transport).
2. Ask them directly: "What part of your day is hardest? What do you wish you had help with?"
3. Create a practical support plan: which needs can you fulfil personally, and which require hiring help or coordinating with siblings?
4. If siblings are available, divide responsibilities fairly — do not let one sibling bear the full burden.
5. For parents in a different city or country, arrange reliable local support and maintain frequent video calls to monitor their well-being.`,
        },
        {
          title: 'Add du\'a for your parents to your daily adhkar — "Rabbir-hamhuma kama rabbayanee sagheera"',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 17:24",
              arabic: "وَاخْفِضْ لَهُمَا جَنَاحَ الذُّلِّ مِنَ الرَّحْمَةِ وَقُل رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
              translation: "And lower to them the wing of humility out of mercy and say, My Lord, have mercy upon them as they brought me up when I was small. Adding this du'a to your daily adhkar is a direct implementation of the Quranic command.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

This du'a — "My Lord, have mercy upon them as they raised me when I was small" (Quran 17:24) — is one of the most beautiful supplications in Islam. Making it part of your daily adhkar means you are asking Allah to repay a debt you can never fully repay yourself. Even if your parents have passed away, this du'a continues to benefit them. It is one of the three deeds that continue after death: a righteous child who prays for them.


**How?**

1. Memorise the du'a in Arabic: "Rabbi irhamhuma kama rabbayanee sagheera."
2. Add it to your daily adhkar — after Fajr or before sleep are natural times.
3. Say it with presence and reflection, not as a mechanical formula. Picture your parents' sacrifices as you recite it.
4. If you use a du'a tracking app or physical adhkar booklet, add it to the list.
5. Teach this du'a to your children — establishing a chain of mercy across generations.`,
        },
        {
          title: 'If parents have passed, increase sadaqah, du\'a, and Hajj/Umrah on their behalf',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:196",
              arabic: "**Translation:** And perform properly (i.e. all the ceremonies according to the ways of Prophet Muhammad صلى الله عليه وسلم), the Hajj and ‘Umrah (i.e. the pilgrimage to Makkah) for Allâh. But if you are prevented (from completing them), sacrifice a Hady (animal, i.e. a sheep, a cow, or a camel) such as you can afford, and do not shave your heads until the Hady reaches the place of sacrifice. And whosoever of you is ill or has an ailment in his scalp (necessitating shaving), he must pay a Fidyah (ransom) of either observing Saum (fasts) (three days) or giving Sadaqah (charity - feeding six poor persons) or offering sacrifice (one sheep). Then if you are in safety and whosoever performs the ‘Umrah in the months of Hajj before (performing) the Hajj, (i.e. Hajj-at-Tamattu‘ and Al-Qirân), he must slaughter a Hady such as he can afford, but if he cannot afford it, he should observe Saum (fasts) three days during the Hajj and seven days after his return (to his home), making ten days in all. This is for him whose family is not present at Al-Masjid-Al-Harâm (i.e. non-resident of Makkah). And fear Allâh much and know that Allâh is Severe in punishment.",
              translation: "And perform properly (i.e. all the ceremonies according to the ways of Prophet Muhammad صلى الله عليه وسلم), the Hajj and ‘Umrah (i.e. the pilgrimage to Makkah) for Allâh. But if you are prevented (from completing them), sacrifice a Hady (animal, i.e. a sheep, a cow, or a camel) such as you can afford, and do not shave your heads until the Hady reaches the place of sacrifice. And whosoever of you is ill or has an ailment in his scalp (necessitating shaving), he must pay a Fidyah (ransom) of either observing Saum (fasts) (three days) or giving Sadaqah (charity - feeding six poor persons) or offering sacrifice (one sheep). Then if you are in safety and whosoever performs the ‘Umrah in the months of Hajj before (performing) the Hajj, (i.e. Hajj-at-Tamattu‘ and Al-Qirân), he must slaughter a Hady such as he can afford, but if he cannot afford it, he should observe Saum (fasts) three days during the Hajj and seven days after his return (to his home), making ten days in all. This is for him whose family is not present at Al-Masjid-Al-Harâm (i.e. non-resident of Makkah). And fear Allâh much and know that Allâh is Severe in punishment.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

 If your parents have passed, you are their lifeline to ongoing reward. Every du'a, every sadaqah, every good deed you dedicate to them reaches them in their grave. This is one of the most profound acts of love in Islam — caring for someone who can no longer care for themselves.

**How?**

1. Make du'a for your parents' forgiveness and mercy after every obligatory prayer — even a brief supplication counts.
2. Set up a recurring sadaqah in their name — even a small monthly donation to a cause they valued.
3. If you have the means, perform Hajj or Umrah on their behalf, or sponsor someone to do so.
4. Fast voluntary fasts and dedicate the reward to them.
5. If they had any unfulfilled religious obligations (missed fasts, unpaid zakah), consult a scholar about how to fulfil these on their behalf.`,
        },
        {
          title: 'Never raise your voice to them — even if they are wrong, respond with gentleness',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:2",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا لَا تَرْفَعُوا أَصْوَاتَكُمْ فَوْقَ صَوْتِ النَّبِيِّ وَلَا تَجْهَرُوا لَهُ بِالْقَوْلِ كَجَهْرِ بَعْضِكُمْ لِبَعْضٍ أَن تَحْبَطَ أَعْمَالُكُمْ وَأَنتُمْ لَا تَشْعُرُونَ",
              translation: "Believers, do not raise your voices above the Prophet's, do not raise your voice when speaking to him as you do to one another, or your [good] deeds may be cancelled out without you knowing. *(Abdel Haleem)* *The Quran forbids raising one's voice above the Prophet's — scholars of tafsir note this principle extends by analogy (awlā) to parents, who hold the highest right after Allah and His Messenger. If such restraint is required with the Prophet, silence and gentleness with parents is more fitting still.*",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5971",
              translation: "Abu Huraira (may Allah be pleased with him) reported: A man came to the Messenger of Allah (peace be upon him) and asked, \"O Messenger of Allah, who most deserves my good companionship?\" He said, \"Your mother.\" The man asked, \"Then who?\" He said, \"Your mother.\" The man asked, \"Then who?\" He said, \"Your mother.\" The man asked, \"Then who?\" He said, \"Your father.\" *The mother's threefold priority — and the father's following right — establish that parents are owed the highest quality of companionship (ḥusn al-ṣuḥba). Raising one's voice against those who hold such a rank contradicts the very care their right demands.*",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Quran does not merely prohibit shouting at parents — it prohibits even the slightest expression of annoyance: "Do not say uff to them" (17:23). If "uff" — a sigh of frustration — is prohibited, then raising your voice, arguing harshly, or speaking with contempt is far graver. This standard is intentionally high because Allah recognises that parents can be difficult, especially in old age. The test is precisely in those moments of frustration.


**How?**

1. When you feel frustration rising during a conversation with a parent, pause before responding. Take a breath. Remember the verse.
2. If they say something you disagree with, respond with "You may be right" or "I understand your perspective" rather than arguing.
3. If a conversation becomes heated, excuse yourself gently: "Let me think about what you've said" — and return when you are calm.
4. Practise the habit of lowering your voice physically when speaking to parents — even slightly quieter than your normal tone.
5. If you slip and speak harshly, apologise immediately and sincerely. Do not let pride prevent you from saying "I'm sorry."`,
        },
      ],
    },
    {
      title: 'Attend family occasions — births, weddings, illnesses, and funerals — as a duty of kinship',
      priority: 'high', tags: ['silat-al-rahim', 'community'],
      description: 'Being present for family milestones is how kinship bonds are maintained in practice.',
      subtasks: [
        {
          title: 'Keep a family events calendar — birthdays, anniversaries, and important dates',
          done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5985",
              translation: "The Prophet (peace be upon him) said: \"Whoever believes in Allah and the Last Day, let him maintain the bonds of kinship.\" Keeping a family events calendar -- birthdays, anniversaries, and important dates -- is a practical tool for consistent kinship care.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

You cannot show up for occasions you do not know about. A family events calendar is a simple but powerful tool that prevents the common regret of learning about a relative's milestone after it has passed. It also demonstrates care — when you remember someone's birthday or anniversary without being reminded, it communicates that they matter to you.


**How?**

1. Create a dedicated calendar (Google Calendar, phone calendar, or a physical one) labelled "Family."
2. Populate it with every known family date: birthdays, wedding anniversaries, expected due dates, and annual gatherings.
3. Set reminders 1 week before major events (weddings, births) and 1 day before smaller ones (birthdays).
4. Ask older relatives for dates you do not know — they often remember what others have forgotten.
5. Update the calendar as new events arise — new babies, new marriages, new milestones.`,
        },
        {
          title: 'Prioritise attendance at weddings, aqiqah celebrations, and funeral prayers',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 9:84",
              arabic: "وَلَا تُصَلِّ عَلَىٰ أَحَدٍ مِّنْهُم مَّاتَ أَبَدًا وَلَا تَقُمْ عَلَىٰ قَبْرِهِ ۖ إِنَّهُمْ كَفَرُوا بِاللَّهِ وَرَسُولِهِ وَمَاتُوا وَهُمْ فَاسِقُونَ",
              translation: "Do not hold prayers for any of them if they die, and do not stand by their graves: they disbelieved in God and His Messenger and died rebellious. *(Abdel Haleem)* *Allah prohibited the Prophet from praying over the hypocrites — establishing by contrast that the believer's duty to attend and pray over the deceased is a sacred obligation. Standing at the janazah of a Muslim family member is among the rights of kinship (ḥaqq al-rahim).*",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5173",
              translation: "Abdullah ibn 'Umar (may Allah be pleased with him) reported: The Prophet (peace be upon him) said, \"If anyone of you is invited to a wedding banquet, he must attend.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1325",
              translation: "Abu Huraira (may Allah be pleased with him) reported: The Prophet (peace be upon him) said, \"Whoever attends the funeral prayer until it is finished will have a reward of one qirat, and whoever stays until the burial is done will have a reward of two qirats.\" It was asked, \"What are the two qirats?\" He said, \"Like two great mountains.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) identified specific rights Muslims have over one another, including attending weddings when invited, visiting the sick, and following the funeral procession. These are not optional social niceties — they are duties. Your presence at a wedding brings joy and barakah; your presence at a funeral brings comfort and reminds the living of the Hereafter. Prioritising these events over convenience is a mark of faith.


**How?**

1. Treat wedding invitations from relatives as obligations, not optional RSVPs — attend unless there is a genuine hardship.
2. When a baby is born in the family, attend the aqiqah (or walimah) and bring a gift — this strengthens the bond from the earliest moment.
3. When a relative passes away, attend the janazah prayer and offer condolences in person if at all possible.
4. If you must choose between a social engagement and a family occasion, the family occasion takes priority.
5. Block travel and work calendars around known upcoming family events to prevent scheduling conflicts.`,
        },
        {
          title: 'When a relative falls ill, visit promptly and ask how you can help practically',
          done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2568",
              translation: "The Prophet (peace be upon him) said: \"The rights of a Muslim over another Muslim are five: returning the greeting, visiting the sick, following the funeral, accepting invitations, and saying 'yarhamukallah' when he sneezes.\" Visiting a sick relative promptly and asking how to help practically fulfils this obligation.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

 When a relative is ill, your visit is not just a social courtesy — it is an act of worship that carries immense reward. The Prophet said that when you visit the sick, you are surrounded by angels making du'a for you. Beyond the spiritual dimension, a practical visit — bringing food, offering to drive to appointments, or sitting with them — provides real relief.

**How?**

1. When you learn a relative is ill, visit within 48 hours if possible — do not wait for the "right time."
2. Before visiting, ask what they need: a meal, help with errands, company, or simply du'a.
3. Keep the visit appropriate in length — long enough to show care, short enough not to exhaust the patient.
4. Make du'a for their recovery in their presence — the Prophet (peace be upon him) would place his hand near the pain and supplicate.
5. Follow up after the visit: check in by phone the next day and continue checking until they recover.`,
        },
        {
          title: 'If distance prevents attendance, send a meaningful gift or heartfelt message the same day',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:36",
              arabic: "وَبِالْوَالِدَيْنِ إِحْسَانًا وَبِذِي الْقُرْبَىٰ",
              translation: "And to parents do good, and to relatives.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5984",
              translation: "The Prophet (peace be upon him) said: \"The one who maintains ties of kinship is not the one who reciprocates.\" If distance prevents attendance at a family event, sending a meaningful gift or heartfelt message the same day maintains the bond.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Geography is a real constraint, but it is not an excuse for silence. When you cannot be physically present for a family occasion, the next best thing is to make your presence felt on the same day — not a week later when the moment has passed. A timely gift or heartfelt message communicates: "I could not be there, but you were on my mind." This preserves the bond even across distance.


**How?**

1. As soon as you learn of a family occasion you cannot attend, plan your alternative immediately — do not leave it for later.
2. For joyful occasions (weddings, births): send a gift via delivery or a monetary gift via bank transfer, accompanied by a personal voice note or video message.
3. For sorrowful occasions (illness, death): send a heartfelt written message, make du'a, and follow up with a phone call.
4. Timing matters — send it the same day, not the day after. The impact of a timely message far exceeds a late one.
5. If you can, schedule a video call during the event so you can participate remotely — even 5 minutes matters.`,
        },
      ],
    },
  ],

  family_kinship_growth: [
    {
      title: 'Organise a regular family gathering — monthly meal, annual trip, or online meeting',
      priority: 'medium', tags: ['family', 'connection'],
      description: 'Family ties weaken without structure.',
      subtasks: [
        {
          title: 'Survey family members on preferred frequency and format — meal, outing, or video call',
          done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5984",
              translation: "The Prophet (peace be upon him) said: \"The one who maintains ties of kinship is not the one who reciprocates. Rather, the one who maintains ties is the one who, when his relatives cut him off, still maintains ties with them.\" Surveying family members on preferred gathering format is the first step toward proactive kinship maintenance.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A family gathering that nobody wants to attend defeats its purpose. Consulting family members on format and frequency transforms the gathering from an obligation into something people look forward to. It also respects the diversity within your family — some prefer intimate meals, others enjoy outings, and those living far away may only be able to join virtually. Starting with a survey ensures buy-in from the beginning.


**How?**

1. Send a simple message to the family group chat (or call each household): "I'd like to organise regular family get-togethers. What format works best — a meal at someone's home, an outing, or a video call?"
2. Ask about frequency: weekly, fortnightly, or monthly? Be realistic about what people can commit to.
3. Gather preferences on timing: weekends vs. weekday evenings, mornings vs. afternoons.
4. Identify any constraints: dietary needs, mobility issues, young children's schedules, or work commitments.
5. Compile the results and propose a plan that accommodates the majority — you will not please everyone, but you can please most.`,
        },
        {
          title: 'Set a recurring date and take ownership of coordination',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:1",
              arabic: "وَاتَّقُوا اللَّهَ الَّذِي تَسَاءَلُونَ بِهِ وَالْأَرْحَامَ",
              translation: "And fear Allah, through whom you ask one another, and the wombs (kinship ties). Setting a recurring date and taking ownership of coordination is a concrete way to honour the bonds of kinship.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Good intentions without structure produce nothing. The reason most family gathering ideas fizzle out is that nobody takes ownership. Someone must be the anchor — the person who sets the date, sends the reminders, and follows through even when it is inconvenient. In Islam, the one who initiates good receives the reward of everyone who follows. Taking ownership of family coordination is a continuous act of worship.


**How?**

1. Based on the survey results, choose a recurring date — e.g., the first Saturday of every month, or every other Friday evening.
2. Send a calendar invite to all participants with the recurring schedule.
3. One week before each gathering, send a reminder with the details: location, time, what to bring.
4. If a particular date does not work for most people, reschedule promptly — do not cancel.
5. Accept that coordination is work. It will sometimes be thankless, but the reward from Allah is not dependent on human gratitude.`,
        },
        {
          title: 'Rotate hosting duties so no single household bears the full burden',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 42:38",
              arabic: "وَأَمْرُهُمْ شُورَىٰ بَيْنَهُمْ",
              translation: "And whose affair is determined by consultation among themselves. Rotating hosting duties so no single household bears the full burden is an application of shura and shared responsibility within the family.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

When one household always hosts, resentment quietly builds — the host feels burdened, and guests feel like visitors rather than co-owners of the family bond. Rotating hosting distributes the effort and gives each household the dignity of contributing. It also exposes family members to each other's homes and lives, deepening the sense of closeness.

**How?**

1. Create a hosting rotation schedule — list every household willing to host and assign months.
2. Be flexible: if a household cannot host in their assigned month (new baby, renovations, illness), swap with another.
3. The host provides the venue and basic setup; others contribute food, drinks, or help with cleanup.
4. For families where some households are too small to host, use a neutral venue — a park, a community hall, or a rented space.
5. Review the rotation every 6 months and adjust based on feedback.`,
        },
        {
          title: 'Include an Islamic element — a short reminder, du\'a, or Quran recitation — in each gathering',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 38:1",
              arabic: "ص ۚ وَالْقُرْآنِ ذِي الذِّكْرِ",
              translation: "Sad. By the Quran with its reminding . . .! *(Abdel Haleem)* *Allah swears by the Quran \"full of reminding\" — affirming that dhikr and recitation are the Quran's defining gift. Every family gathering that includes even a brief recitation partakes in this quality.*",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 98:7",
              arabic: "إِنَّ الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ أُولَٰئِكَ هُمْ خَيْرُ الْبَرِيَّةِ",
              translation: "Those who believe and do good deeds are the best of creation. *(Abdel Haleem)* *Including a reminder or du'a in a family gathering is a righteous deed — an act that elevates the gathering and its participants toward this standard.*",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Jami' at-Tirmidhi 3380",
              translation: "Abu Huraira (may Allah be pleased with him) reported: The Prophet (peace be upon him) said, \"No group gather in a sitting in which they do not remember Allah, nor send salat upon their Prophet, except it will be a source of remorse for them.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih — Darussalam",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A family gathering centred only on food and conversation misses an opportunity to nurture the souls of your family. Including a brief Islamic element — even 5 minutes — transforms a social event into an act of collective worship. It teaches children that Islam is woven into daily life, not confined to the mosque. It also creates a space for family members to grow spiritually together, which strengthens bonds far more than entertainment alone.


**How?**

1. Keep it short and natural — 5 to 10 minutes maximum. A forced, lengthy lecture will create resistance.
2. Rotate who gives the reminder: an elder, a knowledgeable family member, or even a teenager preparing a short talk.
3. Choose practical, relatable topics: gratitude, patience, family rights, the importance of du'a.
4. Open or close the gathering with a collective du'a — this is simple, inclusive, and deeply meaningful.
5. Occasionally, have a group Quran recitation where each person reads a few verses — this builds a family culture of engagement with the Book of Allah.`,
        },
        {
          title: 'Create a family group chat or shared calendar to maintain momentum',
          done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5984",
              translation: "The Prophet (peace be upon him) said: \"The one who maintains ties of kinship is not the one who reciprocates. Rather, the one who maintains ties is the one who, when his relatives cut him off, still maintains ties with them.\" Regular gatherings are a practical means of maintaining rahim.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Between gatherings, silence erodes momentum. A family group chat or shared calendar keeps the family connected in the intervals — sharing news, coordinating plans, celebrating small wins, and checking in on one another. It also lowers the barrier to communication: a quick message in a group chat is easier than a formal phone call, especially for younger family members who communicate primarily through text.


**How?**

1. Create a WhatsApp or Telegram group with all participating family members. Give it a warm, personalised name.
2. Set ground rules: no forwarded chain messages, no political arguments — keep it for family news, coordination, and encouragement.
3. Share a Google Calendar or shared calendar with family event dates, birthdays, and gathering schedules.
4. Post a brief recap after each gathering: "Great seeing everyone today. Next gathering: [date] at [host]'s home."
5. Use the group to celebrate milestones — new jobs, graduations, births — so that the family's collective joy is shared in real time.`,
        },
      ],
    },
    {
      title: 'Establish a family support fund or informal network for relatives facing hardship',
      priority: 'medium', tags: ['sadaqah', 'family'],
      description: 'Charity given to a relative is both sadaqah and silat al-rahim — a double reward.',
      subtasks: [
        {
          title: 'Identify relatives who may be facing financial hardship — discreetly and respectfully',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:177",
              arabic: "وَآتَى الْمَالَ عَلَىٰ حُبِّهِ ذَوِي الْقُرْبَىٰ وَالْيَتَامَىٰ وَالْمَسَاكِينَ",
              translation: "And gives wealth, in spite of love for it, to relatives, orphans, and the needy.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Many relatives suffer in silence because they are too proud to ask for help. Identifying those in hardship requires discretion — publicly naming someone's financial struggles strips them of dignity, which is the opposite of what Islam intends. Your goal is to help without humiliating.

**How?**

1. Pay attention to indirect signals during family conversations: mentions of job loss, medical bills, debt, or stress about money.
2. Ask trusted family elders privately: "Is anyone in the family going through a difficult time financially? I'd like to help if I can."
3. Do not ask the struggling person directly unless you have a close, trusting relationship — instead, offer help through a third party if possible.
4. Consider that hardship is not only about money — it may be about access to healthcare, childcare, legal help, or emotional support.
5. Keep a private, confidential note of who may need support — this is for your eyes only, not for family gossip.`,
        },
        {
          title: 'Propose a monthly family fund to trusted family members — even small contributions add up',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:215",
              arabic: "يَسْأَلُونَكَ مَاذَا يُنفِقُونَ ۖ قُلْ مَا أَنفَقْتُم مِّنْ خَيْرٍ فَلِلْوَالِدَيْنِ وَالْأَقْرَبِينَ",
              translation: "They ask you what they should spend. Say: Whatever you spend of good is for parents and relatives.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1461",
              translation: "The Prophet (peace be upon him) said: \"Charity given to the poor is charity, and charity given to a relative is two things: charity and maintaining ties of kinship.\" Proposing a monthly family fund is a practical means of fulfilling both obligations.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Individual charity is good, but collective family giving is transformative. When several family members contribute even a small amount monthly, the pooled fund can cover emergencies, school fees, medical bills, or wedding costs that no single person could handle alone. This is the spirit of takaful (mutual guarantee) that Islam encourages — a family that financially supports its own is a family that embodies the prophetic model of community.


**How?**

1. Approach 3–5 trusted, financially stable family members with the idea: "What if we each contributed a small amount monthly to help relatives in need?"
2. Suggest a modest, sustainable amount — even the equivalent of a few dollars per person per month builds over time.
3. Choose a trusted treasurer to manage the fund — someone with integrity and organisational skills.
4. Decide on a collection method: bank transfer, mobile payment, or cash at family gatherings.
5. Keep it voluntary and judgement-free — no one should feel pressured, and those who cannot contribute should not feel excluded.`,
        },
        {
          title: 'Set clear, fair guidelines for disbursement — who qualifies, how to request, who decides',
          done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1461",
              translation: "The Prophet (peace be upon him) said: \"Charity given to the poor is charity, and charity given to a relative is two things: charity and maintaining ties of kinship.\" Setting clear guidelines for a family fund ensures justice and transparency.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A fund without guidelines breeds conflict. Without clear rules, disbursement decisions become personal and political — "Why did she get help and I didn't?" Clear guidelines ensure fairness, prevent favouritism, and protect the fund from being drained by one situation while others are ignored. They also make it easier for people in need to request help without feeling like they are begging — there is a process, and it is dignified.


**How?**

1. Define who qualifies: immediate family only, or extended family? What types of hardship — medical, educational, emergency, or general need?
2. Set a maximum disbursement per request and per year, so the fund remains sustainable.
3. Establish a simple request process: who does a person contact, what information do they provide, and how quickly is a decision made?
4. Create a small decision-making committee (2–3 people) to approve requests — this prevents the burden falling on one person.
5. Document these guidelines in writing and share them with all contributors so expectations are clear from the start.`,
        },
        {
          title: 'If a formal fund is not feasible, create an informal network of who can help with what',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:36",
              arabic: "وَبِالْوَالِدَيْنِ إِحْسَانًا وَبِذِي الْقُرْبَىٰ",
              translation: "And to parents do good, and to relatives. An informal support network fulfils the Quranic command to care for kin even without a formal fund.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Not every family is ready for a formal fund — and that is perfectly fine. An informal support network can be equally effective. The key insight is that help is not only financial. One relative may have a spare room for someone in transition. Another may be a doctor who can offer free consultations. A third may have connections for job opportunities. Mapping these resources means that when a crisis arises, you know exactly who to call.


**How?**

1. Privately note the skills, resources, and connections of family members: doctors, lawyers, tradespeople, employers, homeowners with spare rooms.
2. When a relative faces a specific challenge, match them to the family member best positioned to help.
3. Always ask permission before connecting two people — "Would you be open to helping [relative] with [specific need]?"
4. Be the connector yourself: you do not need a formal structure to say, "I know someone in the family who can help."
5. Over time, this informal network builds a culture of mutual support that may naturally evolve into a more structured fund.`,
        },
      ],
    },
    {
      title: 'Learn the history of your lineage — document names, stories, and origins at least 3 generations back',
      priority: 'low', tags: ['family', 'heritage'],
      description: '',
      subtasks: [
        {
          title: 'Interview the oldest living relatives — record their stories on audio or video',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:13",
              arabic: "يَا أَيُّهَا النَّاسُ إِنَّا خَلَقْنَاكُم مِّن ذَكَرٍ وَأُنثَىٰ وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا",
              translation: "O mankind, indeed We have created you from male and female and made you peoples and tribes that you may know one another. Interviewing the oldest living relatives and recording their stories honours the divine wisdom in lineage and heritage.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Every elderly relative who passes away takes irreplaceable knowledge with them — names, stories, migration routes, struggles, and moments of divine aid that will never be recovered once they are gone. Recording these stories is an act of preservation that honours your ancestors and provides your descendants with a sense of rootedness.

**How?**

1. Identify the oldest living relatives on both sides of your family — grandparents, great-aunts, great-uncles.
2. Schedule unhurried visits specifically for the purpose of recording their stories. Explain why: "I want to preserve our family history for future generations."
3. Prepare open-ended questions: "What was life like when you were young? How did our family end up here? What hardships did you face? What are you most grateful for?"
4. Record the conversation on your phone (audio or video) with their permission. Back up the recordings immediately.
5. Do not wait — the urgency is real. Every month you delay is a month of fading memory and increasing fragility.`,
        },
        {
          title: 'Document names, dates, and locations for at least 3 generations on each side',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 26:84",
              arabic: "وَاجْعَل لِّي لِسَانَ صِدْقٍ فِي الْآخِرِينَ",
              translation: "give me a good name among later generations; *(Abdel Haleem)* *Ibrahim's supplication is to be remembered well by those who come after him — a du'a for honourable continuity through generations. Documenting your family's names and history is a practical act of preserving that honourable remembrance for your own descendants.*",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Jami' at-Tirmidhi 1979",
              translation: "Abu Huraira (may Allah be pleased with him) reported: The Prophet (peace be upon him) said, \"Learn enough about your lineage to facilitate keeping your ties of kinship. For indeed keeping the ties of kinship encourages affection among the relatives, increases the wealth, and increases the lifespan.\"",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan — Darussalam",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A family without documented history is a family that starts from scratch with each generation. Knowing the names, dates, and locations of your ancestors for at least three generations gives you a skeleton upon which stories, values, and identity can be built. It also has practical Islamic significance: knowing your lineage helps determine inheritance rights, family connections for marriage, and the scope of your kinship obligations.


**How?**

1. Start with what you know: your parents, grandparents, and any great-grandparents you can name.
2. For each person, record: full name, date of birth (approximate if exact is unknown), place of birth, date of death (if applicable), and their relationship to you.
3. Cross-reference with multiple relatives — one person's memory may fill gaps in another's.
4. Check official documents if available: birth certificates, marriage certificates, immigration records, or old passports.
5. Organise the information in a structured format — a spreadsheet, a family tree application, or even a handwritten chart.`,
        },
        {
          title: 'Create a family tree — digital or physical — and share it with the family',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:13",
              arabic: "وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا",
              translation: "And made you peoples and tribes that you may know one another. Creating a family tree -- digital or physical -- and sharing it with the family is a tangible expression of the Quranic call to mutual recognition.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A family tree transforms abstract knowledge into a visual map that everyone can understand and engage with. When children see their name on a tree that stretches back generations, it gives them a sense of belonging. When elders see their parents and grandparents remembered, it brings them joy. A shared family tree becomes a living document that grows with each generation — a tangible expression of your commitment to silat al-rahim across time.


**How?**

1. Choose a format: a digital tool (such as MyHeritage, Gramps, or a simple spreadsheet) or a hand-drawn physical chart.
2. Enter all the data you have collected — names, dates, locations, and relationships.
3. Add photographs where available — even old, low-quality photos bring the tree to life.
4. Share the tree with the family at a gathering or via the family group chat. Invite corrections and additions.
5. Designate someone (yourself or a willing relative) to keep the tree updated as births, marriages, and deaths occur.`,
        },
        {
          title: 'Record migration stories, hardships, and moments of divine provision (tawfiq)',
          done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 1631",
              translation: "The Prophet (peace be upon him) said: \"When a human being dies, his deeds come to an end except for three: ongoing charity, beneficial knowledge, or a righteous child who prays for him.\" Recording migration stories, hardships, and moments of divine provision preserves beneficial knowledge for future generations.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Every family has moments where Allah's provision was unmistakable — a door that opened when all seemed lost, a stranger who helped at the perfect moment, a hardship that later revealed itself as a blessing. Recording these stories serves two purposes: it preserves your family's unique testimony to Allah's qadr (divine decree), and it provides future generations with real, personal evidence of tawakkul (reliance on Allah) in action. These are not abstract theological concepts — they are your family's lived experience.


**How?**

1. During your interviews with elders, specifically ask: "Was there a time when things seemed impossible but Allah opened a way?"
2. Record the full story: the context, the hardship, the turning point, and the outcome.
3. Ask about migration stories: why did the family move, what did they leave behind, what did they find?
4. Write these stories in narrative form — not just bullet points. Future generations should be able to read them like a chapter in a book.
5. Include your own stories of divine provision alongside the family's — you are also part of this legacy.`,
        },
        {
          title: 'Preserve old photographs, letters, and documents in a family archive',
          done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 1631",
              translation: "The Prophet (peace be upon him) said: \"When a human being dies, his deeds come to an end except for three: ongoing charity, beneficial knowledge, or a righteous child who prays for him.\" Preserving old photographs, letters, and documents in a family archive safeguards beneficial knowledge and the legacy of past generations.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Physical artefacts — photographs, handwritten letters, old documents — carry an emotional and historical weight that digital records cannot fully replicate. A grandmother's handwriting, a grandfather's passport photo, a faded wedding invitation — these objects connect future generations to their past in a visceral way. If they are not preserved intentionally, they are lost to water damage, house moves, and the passage of time.


**How?**

1. Ask relatives if they have old family photographs, letters, certificates, or documents. Many elders keep boxes of such items.
2. Digitise everything: scan photos and documents at high resolution, or use a phone scanning app for convenience.
3. Organise digital copies in a cloud folder with clear labelling: "Grandfather_wedding_1962.jpg", "Mother_birth_certificate.jpg."
4. For physical originals, store them in acid-free sleeves or boxes to prevent deterioration.
5. Share the digital archive with the family and invite contributions — other relatives may have items you have never seen.`,
        },
      ],
    },
    {
      title: 'Be proactively generous with in-laws — treat them with the same care as your own parents',
      priority: 'high', tags: ['in-laws', 'adab'],
      description: 'Islam calls for ihsan (excellence) toward all relatives by marriage.',
      subtasks: [
        {
          title: 'Initiate regular contact with in-laws independently — not only through your spouse',
          done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5186",
              translation: "The Prophet (peace be upon him) said: \"The best of you is the one who is best to his wife, and I am the best of you to my wives.\" Initiating regular contact with in-laws independently -- not only through your spouse -- demonstrates genuine care. **II. Quran**",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 4:36",
              arabic: "وَبِالْوَالِدَيْنِ إِحْسَانًا وَبِذِي الْقُرْبَىٰ",
              translation: "And to parents do good, and to relatives. In-laws are kin by marriage and thus included in the command to honour relatives.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

When you only interact with your in-laws through your spouse, the relationship remains indirect and shallow. Initiating contact independently — a phone call, a message, an invitation — signals that you value the relationship for its own sake, not merely as an extension of your marriage. This builds trust, dissolves the "outsider" dynamic, and fulfils the Islamic principle that marriage creates real kinship, not a transactional alliance between families.


**How?**

1. Add your in-laws to your regular contact rotation — the same system you use for your own relatives.
2. Call or message your mother-in-law or father-in-law directly at least once every two weeks — not just when your spouse hands you the phone.
3. Ask about their lives with genuine interest: their health, their projects, their concerns.
4. If there is a language or cultural barrier, make the effort anyway — even a brief, imperfect conversation is better than none.
5. Over time, this independent contact builds a relationship that can withstand the stresses that marriage inevitably brings.`,
        },
        {
          title: 'Give gifts on occasions — Eid, birthdays, or just because — without being asked',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 38:39",
              arabic: "هَٰذَا عَطَاؤُنَا فَامْنُنْ أَوْ أَمْسِكْ بِغَيْرِ حِسَابٍ",
              translation: "‘This is Our gift, so give or withhold as you wish without account.’ *(Abdel Haleem)* *Allah tells Sulayman (peace be upon him) that the gift He granted is his to give freely. Generosity with gifts follows from recognising that all provision is ultimately from Allah — and what is given without account may be shared without hesitation.*",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Al-Adab Al-Mufrad 594",
              translation: "Abu Huraira (may Allah be pleased with him) reported: The Prophet (peace be upon him) said, \"Give gifts and you will love one another.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

 A thoughtful, unprompted gift — especially one that shows you know their tastes — communicates warmth and effort. It transforms the in-law relationship from a duty into a bond.

**How?**

1. Keep a note of your in-laws' preferences: favourite foods, colours, hobbies, or items they have mentioned wanting.
2. Give gifts on natural occasions: Eid, birthdays, Mother's/Father's Day, or the anniversary of a significant event in their lives.
3. Occasionally give gifts for no occasion at all — "I saw this and thought of you" carries more weight than obligatory holiday gifts.
4. The gift does not need to be expensive — a homemade dish, a book they would enjoy, or a framed family photo can be more meaningful than something costly.
5. Involve your children in gift-giving to grandparents — a handmade card from a grandchild is priceless.`,
        },
        {
          title: 'Speak well of your in-laws to your spouse and children — never poison the relationship',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:19",
              arabic: "وَعَاشِرُوهُنَّ بِالْمَعْرُوفِ",
              translation: "And live with them in kindness.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5186",
              translation: "The Prophet (peace be upon him) said: \"The best of you is the one who is best to his wife.\" Speaking well of your in-laws to your spouse and children strengthens the entire family structure.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Words shape perception. If you regularly complain about your in-laws to your spouse, you plant seeds of resentment that grow in both directions — your spouse feels torn between loyalty to you and loyalty to their parents, and your children absorb a negative image of their grandparents. Conversely, speaking well of your in-laws — even when they frustrate you — builds a culture of respect in your home that your children will carry into their own marriages.


**How?**

1. Make a conscious decision: you will not speak negatively about your in-laws in front of your children — ever.
2. When venting to your spouse about an in-law frustration, distinguish between seeking a solution and simply complaining. Limit the latter.
3. Actively highlight your in-laws' good qualities to your children: "Your grandmother is so generous," "Your grandfather worked so hard to provide for his family."
4. If your in-laws have genuinely harmful behaviour, address it privately with your spouse as a problem to solve together — not as an attack on their family.
5. Remember that your children's relationship with their grandparents is theirs to have. Do not let your grievances become their inheritance.`,
        },
        {
          title: 'When conflict arises, address it privately and respectfully — never through your spouse as proxy',
          done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5186",
              translation: "The Prophet (peace be upon him) said: \"The best of you is the one who is best to his wife, and I am the best of you to my wives.\" Being generous with in-laws and addressing conflict directly (not through proxies) follows the Prophetic model.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Using your spouse as a go-between for in-law conflicts puts them in an impossible position and often makes the problem worse. Your spouse is not a messenger — they are a partner who loves both you and their parents. Addressing conflict directly (but privately and respectfully) demonstrates maturity, prevents miscommunication, and models the Islamic principle of speaking to the person you have an issue with rather than about them.


**How?**

1. If a conflict arises with an in-law, do not vent to your spouse and expect them to "fix it." Take responsibility for the relationship.
2. Request a private, calm conversation with the in-law: "I'd like to talk about something that's been on my mind. Can we find a quiet moment?"
3. Use "I" statements rather than "you" accusations: "I felt hurt when..." rather than "You always..."
4. Listen to their perspective with genuine openness — you may discover a misunderstanding that dissolves the conflict entirely.
5. If the conflict is too charged for direct conversation, involve a neutral mediator — but still not your spouse.`,
        },
      ],
    },
  ],

  family_kinship_excellence: [
    {
      title: 'Document your family\'s history, values, and legacy in a written or digital archive',
      priority: 'low', tags: ['heritage', 'legacy'],
      description: 'A family archive is a gift to future generations.',
      subtasks: [
        {
          title: 'Compile all existing family history materials — photos, documents, interview recordings',
          done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 1631",
              translation: "The Prophet (peace be upon him) said: \"When a human being dies, his deeds come to an end except for three: ongoing charity, beneficial knowledge, or a righteous child who prays for him.\" Compiling all existing family history materials is the first step in preserving beneficial knowledge for future generations.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Scattered materials are vulnerable materials. Photographs in one relative's attic, documents in another's drawer, recordings on a phone that may break — all of this knowledge is at risk of being lost permanently. Compiling everything into one place is the essential first step of archival work. It also reveals gaps: once you see what you have, you can identify what you are missing before it is too late to collect.


**How?**

1. Reach out to all relatives and ask: "Do you have any old family photos, documents, letters, or recordings? I'm creating a family archive."
2. Collect physical items carefully — handle old documents and photos with clean, dry hands.
3. Digitise everything: scan photos and documents at high resolution (300 DPI minimum); back up audio and video recordings in multiple formats.
4. Organise digital files into a clear folder structure: by family branch, by generation, or by type (photos, documents, recordings).
5. Store originals safely and keep at least two copies of digital files — one local (external hard drive) and one in the cloud.`,
        },
        {
          title: 'Write a family values statement — the principles your lineage has upheld across generations',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:13",
              arabic: "وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا",
              translation: "And made you peoples and tribes that you may know one another. Writing a family values statement -- the principles your lineage has upheld across generations -- gives concrete form to the Quranic call to mutual recognition.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Every family has implicit values — principles that have guided decisions across generations, even if they were never formally articulated. Writing them down transforms tacit knowledge into an explicit inheritance. A family values statement gives future generations a moral compass: "This is what our family stands for." It also provides a framework for resolving future family disagreements — decisions can be tested against the family's stated principles.


**How?**

1. Reflect on the patterns in your family's history: What values have been consistently practised? Generosity? Hospitality? Education? Faith?
2. Interview elders and ask: "What principles did your parents teach you that you tried to pass on to us?"
3. Draft a concise statement — ideally one page or less — that captures 5–7 core values with brief explanations.
4. Ground the values in Islamic principles where natural: tawakkul, ihsan, silat al-rahim, 'ilm (knowledge), sadaqah.
5. Share the draft with family members for feedback, then finalise and include it prominently in the family archive.`,
        },
        {
          title: 'Create a digital archive — organised folder, website, or shared drive — accessible to all family',
          done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 1631",
              translation: "The Prophet (peace be upon him) said: \"When a human being dies, his deeds come to an end except for three: ongoing charity, beneficial knowledge, or a righteous child who prays for him.\" Creating a digital archive accessible to all family members ensures beneficial knowledge endures across generations.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

An archive that only one person can access is a single point of failure. Making the archive accessible to all family members ensures its survival and its utility. When a grandchild in another country can browse the family tree, read great-grandmother's story, and see photographs from the homeland, the archive is doing its work — connecting generations across time and distance.


**How?**

1. Choose a platform: Google Drive (simple and free), a dedicated family website (more polished), or a tool like Notion or MyHeritage.
2. Organise the archive with clear sections: Family Tree, Photos, Stories, Documents, Values Statement, Migration History.
3. Set appropriate access: read-only for most family members, edit access for designated archivists.
4. Add a brief guide at the top: what the archive contains, how to navigate it, and how to contribute new materials.
5. Announce the archive to the family and demonstrate how to use it — especially for less tech-savvy relatives.`,
        },
        {
          title: 'Include a section on Islamic heritage — how faith shaped your family\'s decisions and migrations',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 8:72",
              arabic: "**Translation:** Surely those who believed and migrated and strove hard in the way of Allah with their possessions and their lives, and those that sheltered and helped them - they alone are the true allies of one another. And those who believed but did not migrate (to Dar-al-Islam), you are under no obligation of alliance unless they migrate. And should they seek help from you in the matter of religion, it is incumbent on you to provide help unless it be against a people with whom you have a pact. Allah is cognizant of all that you do.",
              translation: "Surely those who believed and migrated and strove hard in the way of Allah with their possessions and their lives, and those that sheltered and helped them - they alone are the true allies of one another. And those who believed but did not migrate (to Dar-al-Islam), you are under no obligation of alliance unless they migrate. And should they seek help from you in the matter of religion, it is incumbent on you to provide help unless it be against a people with whom you have a pact. Allah is cognizant of all that you do.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 9:100",
              arabic: "**Translation:** And the foremost to embrace Islâm of the Muhâjirûn (those who migrated from Makkah to Al-Madinah) and the Ansâr (the citizens of Al-Madinah who helped and gave aid to the Muhâjirûn ) and also those who followed them exactly (in Faith). Allâh is well-pleased with them as they are well-pleased with Him. He has prepared for them Gardens under which rivers flow (Paradise), to dwell therein forever. That is the supreme success.",
              translation: "And the foremost to embrace Islâm of the Muhâjirûn (those who migrated from Makkah to Al-Madinah) and the Ansâr (the citizens of Al-Madinah who helped and gave aid to the Muhâjirûn ) and also those who followed them exactly (in Faith). Allâh is well-pleased with them as they are well-pleased with Him. He has prepared for them Gardens under which rivers flow (Paradise), to dwell therein forever. That is the supreme success.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 3",
              translation: "Narrated 'Aisha (the mother of the faithful believers):The commencement of the Divine Inspiration to Allah's Messenger (ﷺ) was in the form of good dreams which came true like bright daylight, and then the love of seclusion was bestowed upon him. He used to go in seclusion in the cave of Hira where he used to worship (Allah alone) continuously for many days before his desire to see his family. He used to take with him the journey food for the stay and then come back to (his wife) Khadija to take his food likewise again till suddenly the Truth descended upon him while he was in the cave of Hira. The angel came to him and asked him to read. The Prophet (ﷺ) replied, \"I do not know how to read.\" The Prophet (ﷺ) added, \"The angel caught me (forcefully) and pressed me so hard that I could not bear it any more. He then released me and again asked me to read and I replied, 'I do not know how to read.' Thereupon he caught me again and pressed me a second time till I could not bear it any more. He then released me and again asked me to read but again I replied, 'I do not know how to read (or what shall I read)?' Thereupon he caught me for the third time and pressed me, and then released me and said, 'Read in the name of your Lord, who has created (all that exists), created man from a clot. Read! And your Lord is the Most Generous.\" (96.1, 96.2, 96.3) Then Allah's Messenger (ﷺ) returned with the Inspiration and with his heart beating severely. Then he went to Khadija bint Khuwailid and said, \"Cover me! Cover me!\" They covered him till his fear was over and after that he told her everything that had happened and said, \"I fear that something may happen to me.\" Khadija replied, \"Never! By Allah, Allah will never disgrace you. You keep good relations with your kith and kin, help the poor and the destitute, serve your guests generously and assist the deserving calamity-afflicted ones.\" Khadija then accompanied him to her cousin Waraqa bin Naufal bin Asad bin 'Abdul 'Uzza, who, during the pre-Islamic Period became a Christian and used to write the writing with Hebrew letters. He would write from the Gospel in Hebrew as much as Allah wished him to write. He was an old man and had lost his eyesight. Khadija said to Waraqa, \"Listen to the story of your nephew, O my cousin!\" Waraqa asked, \"O my nephew! What have you seen?\" Allah's Messenger (ﷺ) described whatever he had seen. Waraqa said, \"This is the same one who keeps the secrets (angel Gabriel) whom Allah had sent to Moses. I wish I were young and could live up to the time when your people would turn you out.\" Allah's Messenger (ﷺ) asked, \"Will they drive me out?\" Waraqa replied in the affirmative and said, \"Anyone (man) who came with something similar to what you have brought was treated with hostility; and if I should remain alive till the day when you will be turned out then I would support you strongly.\" But after a few days Waraqa died and the Divine Inspiration was also paused for a while",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

For Muslim families, faith is not a footnote — it is the central thread that explains why your ancestors made the choices they did. Why did they migrate? Often to preserve their deen. Why did they endure hardship? Because of tawakkul. Why did they value education? Because of the prophetic command to seek knowledge. Documenting this thread ensures that future generations understand their identity as rooted in Islam, not merely in ethnicity or geography.


**How?**

1. In your family archive, create a dedicated section titled "Our Islamic Heritage" or "Faith in Our Family's Journey."
2. Document how Islam influenced major family decisions: migration, education, marriage, community involvement.
3. Record stories of faith under pressure: how relatives maintained their salah during war, how they preserved Islamic identity in non-Muslim countries.
4. Include any scholars, huffadh, or community leaders in your lineage — even if their contributions were local and humble.
5. Write a brief reflection on what Islam means to your family today — this gives future readers both history and a living connection to the present.`,
        },
        {
          title: 'Designate a family historian to maintain and update the archive over time',
          done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 893",
              translation: "The Prophet (peace be upon him) said: \"Each of you is a shepherd, and each of you is responsible for his flock.\" Designating a family historian to maintain and update the archive ensures continuity of stewardship.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

An archive without a custodian is an archive with an expiry date. Someone must take responsibility for updating it with new births, marriages, deaths, stories, and photographs. Designating a family historian ensures continuity and gives a specific person the honourable role of preserving the family's legacy. In time, this role can be passed to a younger family member, creating a chain of stewardship across generations.


**How?**

1. Identify the most suitable person: someone who is organised, interested in family history, and committed to the long term.
2. If you are reading this, it may well be you — accept the role with the intention of sadaqah jariyah.
3. Define the historian's responsibilities: updating the family tree, adding new stories and photos, maintaining the digital archive, and ensuring backups.
4. Set a rhythm: review and update the archive at least twice per year — perhaps around Eid al-Fitr and Eid al-Adha.
5. Plan for succession: identify and mentor a younger family member who can take over the role in the future.`,
        },
      ],
    },
    {
      title: 'Establish a family waqf or ongoing sadaqah jariyah dedicated to the lineage',
      priority: 'low', tags: ['waqf', 'sadaqah-jariyah'],
      description: 'A family waqf is an endowment whose benefits flow perpetually to your descendants and the ummah.',
      subtasks: [
        {
          title: 'Research waqf structures — consult a scholar and a lawyer familiar with Islamic endowments',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:92",
              arabic: "لَن تَنَالُوا الْبِرَّ حَتَّىٰ تُنفِقُوا مِمَّا تُحِبُّونَ ۚ وَمَا تُنفِقُوا مِن شَيْءٍ فَإِنَّ اللَّهَ بِهِ عَلِيمٌ",
              translation: "None of you [believers] will attain true piety unless you give out of what you cherish: whatever you give, God knows about it very well.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 2:261",
              arabic: "مَّثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنبَتَتْ سَبْعَ سَنَابِلَ فِي كُلِّ سُنبُلَةٍ مِّائَةُ حَبَّةٍ",
              translation: "Those who spend their wealth in God's cause are like grains of corn that produce seven ears, each bearing a hundred grains. God gives multiple increase to whoever He wishes.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 1631",
              translation: "The Prophet (peace be upon him) said: \"When a person dies, his deeds come to an end except for three: sadaqah jariyah (ongoing charity), knowledge from which benefit is derived, or a righteous child who prays for him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A waqf is one of the most powerful instruments in Islamic philanthropy — an asset whose principal is preserved and whose returns benefit the designated cause in perpetuity. However, waqf structures vary significantly by jurisdiction and by Islamic school of thought. A poorly structured waqf can fail legally, become mismanaged, or violate Shariah principles. Getting expert guidance at the outset prevents costly mistakes and ensures your endowment achieves its purpose.


**How?**

1. Find a scholar who specialises in Islamic finance or waqf — not just general fiqh. Ask your local mosque for a referral.
2. Simultaneously, find a lawyer experienced in charitable trusts or endowments in your jurisdiction.
3. Ask the scholar: What are the Shariah requirements for a valid waqf? What restrictions apply to the asset and its beneficiaries?
4. Ask the lawyer: What legal structure best approximates a waqf in your country? What are the tax implications?
5. Bring both experts together (or relay between them) to design a structure that is both Shariah-compliant and legally robust.`,
        },
        {
          title: 'Determine the scope — education, healthcare, mosque, or community development',
          done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 1631",
              translation: "The Prophet (peace be upon him) said: \"When a human being dies, his deeds come to an end except for three: ongoing charity (sadaqah jariyah), beneficial knowledge, or a righteous child who prays for him.\" A family waqf is the quintessential sadaqah jariyah.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A waqf without a clear scope is a waqf that drifts. Defining the focus ensures that the endowment's returns are directed where they will have the most impact — and where your family's values and the community's needs intersect. Some families endow scholarships because education defined their journey. Others build wells or clinics because they witnessed the suffering caused by their absence. The scope should reflect both your family's identity and the ummah's needs.


**How?**

1. Gather family members and discuss: "If we could fund one cause in perpetuity, what would it be?"
2. Assess community needs in your area or in your family's country of origin — where is the greatest gap?
3. Consider your family's strengths and passions: education, healthcare, environmental stewardship, mosque services, orphan care.
4. Choose a scope that is specific enough to be actionable but broad enough to remain relevant over decades.
5. Document the chosen scope formally — it will be written into the waqf deed and is difficult to change later.`,
        },
        {
          title: 'Calculate an initial contribution and invite family members to co-invest',
          done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 1631",
              translation: "The Prophet (peace be upon him) said: \"When a human being dies, his deeds come to an end except for three: ongoing charity (sadaqah jariyah), beneficial knowledge, or a righteous child who prays for him.\" Calculating an initial contribution and inviting family members to co-invest in a family waqf is the essence of sadaqah jariyah.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A waqf does not need to start with a large sum — it needs to start. An initial contribution, however modest, establishes the endowment and creates momentum. Inviting family members to co-invest transforms the waqf from an individual act of charity into a collective legacy — everyone who contributes shares in the reward for as long as the waqf produces benefit.

**How?**

1. Determine what you can personally contribute as the initial waqf capital — this sets the floor, not the ceiling.
2. Present the waqf concept to family members at a gathering or via a written proposal: the vision, the scope, and the invitation to contribute.
3. Offer multiple contribution levels so that every family member can participate regardless of financial capacity.
4. Set a target amount for the first year that would allow the waqf to begin generating returns.
5. Celebrate contributions publicly (with permission) to encourage others — "Your uncle has contributed to the family waqf" inspires action.`,
        },
        {
          title: 'Draft a waqf deed that specifies beneficiaries, governance, and succession of trustees',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:282",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا تَدَايَنتُم بِدَيْنٍ إِلَىٰ أَجَلٍ مُّسَمًّى فَاكْتُبُوهُ",
              translation: "O you who have believed, when you contract a debt for a specified term, write it down. Documenting waqf deeds with clear governance follows the Quranic principle of written agreements.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The waqf deed is the governing document that determines how the endowment operates for generations to come. A vague deed leads to disputes, mismanagement, and eventual collapse. A precise deed — one that clearly names the beneficiaries, defines the governance structure, and plans for trustee succession — ensures the waqf outlives its founders. Historically, the greatest awqaf (plural of waqf) endured for centuries precisely because their founding deeds were meticulously drafted.


**How?**

1. Work with your scholar and lawyer to draft the deed. It should include: the asset being endowed, the intended beneficiaries, the scope of permissible use, and any restrictions.
2. Define the governance structure: who are the initial trustees? How are decisions made? What oversight mechanisms exist?
3. Plan for succession: how are new trustees appointed when current ones pass away or step down? Who has the authority to appoint?
4. Include dispute resolution mechanisms: if trustees disagree, who arbitrates?
5. Have the deed reviewed by at least two independent parties (one scholarly, one legal) before finalising.`,
        },
        {
          title: 'Dedicate the waqf to deceased family members so they benefit from the ongoing reward',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 71:28",
              arabic: "رَّبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَلِمَن دَخَلَ بَيْتِيَ مُؤْمِنًا وَلِلْمُؤْمِنِينَ وَالْمُؤْمِنَاتِ",
              translation: "My Lord, forgive me and my parents and whoever enters my house a believer and the believing men and believing women.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 1631",
              translation: "The Prophet (peace be upon him) said: \"When a human being dies, his deeds come to an end except for three: ongoing charity.\" Dedicating the waqf to deceased family members so they benefit from the ongoing reward follows the spirit of Nuh's du'a.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

One of the most beautiful aspects of a family waqf is that its reward can flow to those who have already passed. By dedicating the waqf (or a portion of its reward) to deceased parents, grandparents, and ancestors, you create a conduit of ongoing mercy for them. Every student educated, every patient healed, every person served by the waqf generates reward that reaches your deceased loved ones in their graves — a gift they could never have given themselves.


**How?**

1. In the waqf deed, include a dedication clause: "The reward of this endowment is dedicated to [names of deceased family members] and all deceased members of this lineage."
2. At the waqf's inauguration, make a collective du'a naming the deceased by name and asking Allah to accept the waqf on their behalf.
3. Teach younger family members that this waqf is an ongoing gift to their ancestors — it connects them to people they may never have met.
4. Each year, on the anniversary of the waqf's founding, renew the dedication with a du'a gathering.
5. As more family members pass away, update the dedication to include them — the waqf's reach across time grows with each generation.`,
        },
        {
          title: 'Establish a governance structure to ensure the waqf is maintained beyond your lifetime',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:282",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا تَدَايَنتُم بِدَيْنٍ إِلَىٰ أَجَلٍ مُّسَمًّى فَاكْتُبُوهُ",
              translation: "O you who have believed, when you contract a debt for a specified term, write it down. Establishing a governance structure for the waqf follows the Quranic principle of written documentation for financial obligations.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A waqf is meant to last forever — but its management is handled by mortal humans. Without a governance structure that transcends any single generation, the waqf will eventually fall into neglect or misuse. History is filled with awqaf that thrived under their founders and collapsed under the next generation. Building a robust governance structure from the start is how you protect your family's legacy from the entropy of time.


**How?**

1. Establish a board of trustees with at least 3–5 members from different branches of the family.
2. Define term limits and rotation schedules so that governance is refreshed without losing continuity.
3. Require annual financial reporting and Shariah auditing — transparency prevents both corruption and suspicion.
4. Create a written operations manual: how funds are invested, how beneficiaries are selected, how disputes are resolved.
5. Include a mechanism for external oversight — an independent Islamic institution that can intervene if governance fails.
6. Mentor the next generation of trustees actively — governance skills must be taught, not assumed.`,
        },
      ],
    },
    {
      title: 'Take on the role of family elder or coordinator — be the one who keeps the family united',
      priority: 'medium', tags: ['leadership', 'family'],
      description: 'Every extended family needs someone who takes responsibility for its unity.',
      subtasks: [
        {
          title: 'Accept the responsibility consciously — decide that family unity is your personal mission',
          done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5984",
              translation: "The Prophet (peace be upon him) said: \"The one who maintains ties of kinship is not the one who reciprocates. Rather, the one who maintains ties is the one who, when his relatives cut him off, still maintains ties with them.\" Taking on the role of family unifier is the highest form of silat al-rahim.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
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
          ],
          description: `**Why?**

Most people who end up as the family coordinator do so by accident — they are simply the most responsible or the most available. But there is a profound difference between drifting into a role and consciously choosing it as a mission. When you accept this responsibility with intention — for the sake of Allah, as an act of silat al-rahim — it transforms from a burden into an ibadah (act of worship). Intentionality sustains you when the role becomes thankless.


**How?**

1. Make a private, conscious decision: "I am choosing to be the person who holds this family together, for the sake of Allah."
2. Renew your niyyah (intention) regularly — especially when the role feels exhausting or unappreciated.
3. Write down what family unity means to you: What does a connected, supportive family look like? What are you working toward?
4. Accept that this role will not always be recognised or rewarded by people — your reward is with Allah.
5. Tell one or two trusted family members about your intention — accountability helps sustain commitment.`,
        },
        {
          title: 'Create a system for regular check-ins with all branches of the family',
          done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5984",
              translation: "The Prophet (peace be upon him) said: \"The one who maintains ties of kinship is not the one who reciprocates. Rather, the one who maintains ties is the one who, when his relatives cut him off, still maintains ties with them.\" Creating a system for regular check-ins with all branches of the family is the highest expression of proactive kinship.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A family coordinator without a system is just a well-meaning person who will eventually burn out or lose track. The larger the family, the more essential a system becomes. Regular check-ins ensure that no branch of the family drifts into isolation, that emerging problems are caught early, and that the coordinator has a realistic picture of the family's overall health. Structure is what turns good intentions into sustained action.


**How?**

1. Map all branches of the family: your parents' side, your spouse's side, and each nuclear unit within the extended family.
2. Assign a check-in frequency based on proximity and need: close family weekly, extended family monthly, distant relatives quarterly.
3. Use a simple tracking method: a spreadsheet, a note on your phone, or a recurring task list — record the date of each contact and any important updates.
4. During check-ins, ask open-ended questions: "How is everyone? Any news? Anyone going through a tough time?"
5. Review your tracking monthly: who have you missed? Who seems to need more attention? Adjust your schedule accordingly.`,
        },
        {
          title: 'Mediate conflicts with wisdom, fairness, and patience — never take sides publicly',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 73:10",
              arabic: "وَاصْبِرْ عَلَىٰ مَا يَقُولُونَ وَاهْجُرْهُمْ هَجْرًا جَمِيلًا",
              translation: "patiently endure what they say, ignore them politely, *(Abdel Haleem)* *Allah commands the Prophet to bear with patience and withdraw with grace — not to react, retaliate, or take sides. The family mediator embodies this same quality: they absorb conflict without amplifying it, and they disengage from provocation without abandoning the relationship.*",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2692",
              translation: "Um Kulthum bint Uqba (may Allah be pleased with her) reported: The Prophet (peace be upon him) said, \"He who makes peace between people by inventing good information or saying good things is not a liar.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Family conflicts are inevitable — but they are rarely irresolvable. What turns a disagreement into a permanent rift is the absence of a mediator, or the presence of a biased one. As the family coordinator, your ability to mediate with fairness is your most valuable skill. If family members trust that you will listen to both sides without favouritism, they will come to you before conflicts escalate. If they suspect bias, the conflict will be hidden from you until it is too late.


**How?**

1. When a conflict surfaces, listen to both sides separately before forming any opinion. Do not react to the first account you hear.
2. Acknowledge each person's feelings without agreeing or disagreeing: "I understand why that upset you."
3. Identify the core issue beneath the surface complaint — family conflicts are often about respect, attention, or perceived unfairness rather than the stated grievance.
4. Propose a resolution that both parties can accept, even if neither gets everything they want.
5. Never discuss the details of one party's complaints with the other — confidentiality is essential for trust. If you take sides publicly, you lose the ability to mediate permanently.`,
        },
        {
          title: 'Organise annual family events that bring all branches together',
          done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:103",
              arabic: "وَاعْتَصِمُوا بِحَبْلِ اللَّهِ جَمِيعًا وَلَا تَفَرَّقُوا",
              translation: "And hold firmly to the rope of Allah all together and do not become divided. Organising annual family events that bring all branches together is a practical means of preventing division.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Monthly gatherings maintain close ties, but annual events bring the entire extended family together — including branches that have drifted apart, relatives who live far away, and younger generations who may not know their cousins. A well-organised annual event becomes a family tradition that people plan around and look forward to. Over years, these events create a shared tapestry of memories that binds the family across distance and time.


**How?**

1. Choose a date that maximises attendance: Eid al-Fitr, Eid al-Adha, or a summer weekend when travel is feasible.
2. Start planning 2–3 months in advance: venue, food, transport, and accommodation for out-of-town relatives.
3. Delegate responsibilities: assign food, setup, children's activities, and cleanup to different households.
4. Include activities that cross generational lines: storytelling from elders, games for children, a family photo, and a collective du'a.
5. After each annual event, send a recap with photos and a note of gratitude to everyone who attended — and an open invitation to those who could not make it.`,
        },
        {
          title: 'Mentor younger family members to eventually share or take over this role',
          done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2674",
              translation: "The Prophet (peace be upon him) said: \"Whoever guides someone to goodness will have a reward like that of the one who does it.\" Mentoring younger family members to eventually share or take over the coordination role ensures the legacy of family unity continues.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A family coordinator who does not train a successor is building on sand. You will not always have the energy, health, or proximity to fulfil this role. By mentoring younger family members — teenagers, young adults, or anyone who shows natural relational intelligence — you ensure that family unity does not depend on a single person. You also give them a profound gift: the skills of leadership, empathy, and coordination that will serve them in every area of life.


**How?**

1. Identify 1–2 younger family members who show natural interest in family connection — they call relatives without being asked, they remember birthdays, they mediate sibling disputes.
2. Involve them in your coordination work: let them co-host a gathering, help plan an event, or accompany you on a family visit.
3. Teach them explicitly: "I check in with Aunt [name] every month because she lives alone. Here's why that matters."
4. Gradually hand off specific responsibilities: "Can you organise the next family dinner? I'll support you, but it's your show."
5. Affirm their efforts publicly — when the family recognises their contribution, the role becomes something they own rather than something they inherited.`,
        },
      ],
    },
  ],
  // ── HOME ENVIRONMENT ──
  family_home_core: [
    {
      title: 'Establish the home as a place of prayer — designate a clean prayer space with qibla direction',
      priority: 'urgent', tags: ['home', 'salah'],
      description: '',
      subtasks: [
        { title: 'Identify the qibla direction in your home using a reliable compass or app', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 780",
              translation: "The Prophet (peace be upon him) said: \"Do not turn your houses into graves. Indeed, Shaytan flees from a house in which Surah al-Baqarah is recited.\" Identifying the qibla direction in your home is the foundational step for establishing a prayer space.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Facing the qibla is a condition for the validity of salah — praying in the wrong direction without due diligence invalidates the prayer. Knowing the qibla in your own home is the most basic prerequisite for establishing prayer there. It also orients the household spiritually: every time you face that direction, you are aligning yourself with the millions of Muslims worldwide who turn toward the Ka'bah.


**How?**

1. **Use a trusted qibla app** — download a well-reviewed app such as "Qibla Finder" or use the qibla feature in Muslim Pro. Stand in several rooms and note the direction.
2. **Cross-verify with a physical compass** — apps can be affected by magnetic interference from electronics. Use a traditional compass to confirm the bearing.
3. **Check with your local mosque** — if you live nearby, the mosque's mihrab direction serves as a reliable reference point for your neighbourhood.
4. **Test from your intended prayer spot** — stand exactly where you plan to place your prayer mat and verify the direction from that position, not from another room.
5. **Mark it temporarily** — use a small sticker or piece of tape on the wall so you can confirm it feels right before making a permanent marker.` },
        { title: 'Designate a clean, quiet corner or room as the household prayer area', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 731",
              translation: "The Prophet (peace be upon him) said: \"Prayer in the mosque is twenty-seven times greater in reward than prayer at home, except for the voluntary prayers for which the house is better.\" Designating a clean, quiet corner or room as the household prayer area for voluntary prayers follows the Sunnah.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 424",
              translation: "Found in Sahih al-Bukhari 424 (Volume 1) and 280 (Volume 2), as well as Sahih Muslim 1703 and 1704.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) said: "Make some of your prayers in your houses and do not turn them into graves" (Bukhari and Muslim). A designated prayer space transforms an ordinary home into a place of worship. When a specific area is set aside, it lowers the psychological barrier to praying — you do not need to search for space, clear clutter, or find a mat each time. The space itself becomes an invitation.


**How?**

1. **Choose the quietest area** — ideally away from the kitchen, TV, and main walkways. A spare room corner, a section of the bedroom, or a dedicated nook all work.
2. **Ensure cleanliness** — the area should be free from najasah (impurities). If you have pets, consider a space they cannot access.
3. **Minimise distractions** — remove screens, toys, and clutter from the immediate area. The goal is a zone where the eyes and mind can rest.
4. **Consider the whole family** — the space should be large enough for at least two people to pray side by side, so spouses or children can join.
5. **Make it permanent** — do not treat it as temporary. A permanent designation signals to the family that salah has a fixed, honoured place in the home.` },
        { title: 'Place clean prayer mats, a Quran stand, and a small shelf with du\'a books', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 9:108",
              arabic: "لَا تَقُمْ فِيهِ أَبَدًا ۚ لَّمَسْجِدٌ أُسِّسَ عَلَى التَّقْوَىٰ مِنْ أَوَّلِ يَوْمٍ أَحَقُّ أَن تَقُومَ فِيهِ ۚ فِيهِ رِجَالٌ يُحِبُّونَ أَن يَتَطَهَّرُوا ۚ وَاللَّهُ يُحِبُّ الْمُطَّهِّرِينَ",
              translation: "[Prophet], never pray in that mosque. You should rather pray in a mosque founded from its first day on consciousness of God: in this mosque there are men who desire to grow in purity — God loves those who seek to purify themselves. *(Abdel Haleem)* *The mosque Allah loves is one founded on taqwa and inhabited by those who purify themselves. A dedicated prayer space in the home — clean, intentional, and set apart — embodies these same qualities.*",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 73:2",
              arabic: "قُمِ اللَّيْلَ إِلَّا قَلِيلًا",
              translation: "Stay up throughout the night, all but a small part of it, *(Abdel Haleem)* *The command to rise for night prayer implies having a ready space for worship — a clean mat, uncluttered surroundings — so that when the heart stirs toward Allah, nothing physical stands in the way.*",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 425",
              translation: "Itban ibn Malik (may Allah be pleased with him) said: O Messenger of Allah, my eyesight has weakened and the floods cut me off from the mosque of my people. I wish you would come and pray in my house so that I may take it as a prayer place. The Prophet (peace be upon him) came and said, \"Where do you want me to pray?\" So I pointed to a corner of my house. He prayed there.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Having the tools of worship readily accessible removes friction from the act of praying and supplicating. When a clean prayer mat is already laid out, a Quran is within arm's reach, and du'a books are visible, the environment itself prompts worship. This is intentional environmental design — shaping your surroundings to make obedience to Allah the path of least resistance.


**How?**

1. **Select quality prayer mats** — choose mats that are comfortable for prolonged sujud and easy to keep clean. Have at least one extra for guests.
2. **Set up a Quran stand (rihal)** — a wooden or folding stand at a comfortable reading height encourages longer recitation sessions.
3. **Add a small bookshelf or basket** — stock it with:
   - A du'a book (e.g., *Fortress of the Muslim / Hisn al-Muslim*)
   - A Quran with translation
   - A tasbih (prayer beads) or digital counter
   - A small bottle of 'itr (non-alcohol perfume) — the Prophet loved pleasant scent
4. **Keep it tidy** — fold mats after use if the space is shared, and dust the shelf weekly.
5. **Refresh periodically** — rotate du'a books or add new ones to keep the space engaging, especially for children.` },
        { title: 'Mark the qibla direction visibly so guests and children can pray correctly', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:144",
              arabic: "**Translation:** We see the turning of thy face (for guidance to the heavens: now Shall We turn thee to a Qibla that shall please thee. Turn then Thy face in the direction of the sacred Mosque: Wherever ye are, turn your faces in that direction. The people of the Book know well that that is the truth from their Lord. Nor is Allah unmindful of what they do.",
              translation: "We see the turning of thy face (for guidance to the heavens: now Shall We turn thee to a Qibla that shall please thee. Turn then Thy face in the direction of the sacred Mosque: Wherever ye are, turn your faces in that direction. The people of the Book know well that that is the truth from their Lord. Nor is Allah unmindful of what they do.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 2:145",
              arabic: "**Translation:** Even if thou wert to bring to the people of the Book all the Signs (together), they would not follow Thy Qibla; nor art thou going to follow their Qibla; nor indeed will they follow each other's Qibla. If thou after the knowledge hath reached thee, Wert to follow their (vain) desires,-then wert thou Indeed (clearly) in the wrong.",
              translation: "Even if thou wert to bring to the people of the Book all the Signs (together), they would not follow Thy Qibla; nor art thou going to follow their Qibla; nor indeed will they follow each other's Qibla. If thou after the knowledge hath reached thee, Wert to follow their (vain) desires,-then wert thou Indeed (clearly) in the wrong.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 417",
              translation: "Narrated Anas:The Prophet (ﷺ) saw expectoration (on the wall of the mosque) in the direction of the Qibla and scraped it off with his hand. It seemed that he disliked it and the sign of disgust was apparent from his face. He said, \"If anyone of you stands for the prayer, he is speaking in private to his Lord, (or) his Lord is between him and his Qibla, therefore he should not spit towards his Qibla, but he could spit either on his left or under his foot.\" Then he took the corner of his sheet and spat in it, folded it and said, \"Or do this",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 405",
              translation: "Narrated Anas bin Malik:The Prophet (ﷺ) saw some sputum in the direction of the Qibla (on the wall of the mosque) and he disliked that and the sign of disgust was apparent from his face. So he got up and scraped it off with his hand and said, \"Whenever anyone of you stands for the prayer, he is speaking in private to his Lord or his Lord is between him and his Qibla. So, none of you should spit in the direction of the Qibla but one can spit to the left or under his foot.\" The Prophet (ﷺ) then took the corner of his sheet and spat in it and folded it and said, \"Or you can do this",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Guests and young children should not have to ask or guess which direction to face when praying in your home. A visible qibla marker is an act of ihsan — excellence in facilitating worship for others. It also teaches children spatial awareness of their deen from a young age, embedding the concept that the Ka'bah is the centre of the Muslim world.


**How?**

1. **Use a tasteful wall marker** — this could be a small piece of Islamic calligraphy, a decorative arrow, or a simple label that reads "Qibla" placed at eye level.
2. **Choose something that blends with your decor** — the marker should be visible but not jarring. A framed ayah or a carved wooden arrow works well.
3. **Place it at the correct height** — position it so it is visible both when standing and when seated on the floor.
4. **Add a secondary marker on the floor or baseboard** — for children who may not look up, a small arrow or line on the carpet edge helps.
5. **Inform guests verbally as well** — when showing someone the prayer space, point out the qibla direction. The marker supplements, but does not replace, personal hospitality.` },
        { title: 'Ensure the space stays clean and uncluttered — treat it as a sacred area of the home', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 25:76",
              arabic: "خَالِدِينَ فِيهَا ۚ حَسُنَتْ مُسْتَقَرًّا وَمُقَامًا",
              translation: "There they will stay — a happy home and resting place! *(Abdel Haleem)* *The Quran praises Jannah as a beautiful place to dwell (mustaqarran wa muqaman). By maintaining the prayer space as clean and uncluttered, the home reflects this Quranic ideal — a sanctuary of peace and beauty, not a space of disorder.*",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 223",
              translation: "Abu Malik al-Ash'ari (may Allah be pleased with him) reported: The Prophet (peace be upon him) said, \"Cleanliness is half of faith (al-taharah shatar al-iman), and 'Alhamdulillah' fills the scale, and 'Subhanallah' and 'Alhamdulillah' fill what is between the heavens and the earth, and prayer is a light, and charity is proof, and patience is brightness, and the Quran is a proof for you or against you.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

 Maintaining the space communicates reverence — to yourself, your family, and your children — and ensures the area remains a place your soul is drawn toward, not away from.

**How?**

1. **Establish a daily quick-clean habit** — spend 2 minutes after Fajr or before Maghrib straightening the mats, dusting the shelf, and removing anything that does not belong.
2. **Set a firm rule: nothing is stored in this space** — no laundry baskets, boxes, or random items. If it is not related to worship, it does not belong there.
3. **Vacuum or sweep the area weekly** — dust and crumbs accumulate quickly, especially in carpeted areas.
4. **Involve children** — assign them the honour of caring for the prayer space. Frame it as a responsibility, not a chore: "You are the caretaker of our musalla."
5. **Use a pleasant scent** — burn bakhoor (incense) or use a subtle oil diffuser to keep the area inviting. The Prophet (peace be upon him) loved pleasant fragrances, and scent powerfully anchors memory and mood.` },
      ],
    },
    {
      title: 'Remove all haram objects and content from the home — images of animate beings (on walls), music players, alcohol',
      priority: 'urgent', tags: ['home', 'halal'],
      description: 'The angels do not enter a house that contains images of animate beings, dogs kept without necessity, or haram items.',
      subtasks: [
        { title: 'Walk through every room and identify any haram or doubtful items', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 5:90",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا إِنَّمَا الْخَمْرُ وَالْمَيْسِرُ وَالْأَنصَابُ وَالْأَزْلَامُ رِجْسٌ مِّنْ عَمَلِ الشَّيْطَانِ فَاجْتَنِبُوهُ",
              translation: "O you who have believed, indeed intoxicants, gambling, stone altars, and divining arrows are but defilement from the work of Satan, so avoid them. Walking through every room to identify haram or doubtful items is a comprehensive audit of the home.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

You cannot purify what you have not identified. A systematic audit of your home is the necessary first step — many haram or doubtful items accumulate gradually and become invisible through familiarity.

**How?**

1. **Schedule a dedicated time** — block 1-2 hours when you can walk through the home without rushing. Bring a notebook or use your phone to take notes.
2. **Go room by room** — start from the entrance and move systematically. Check walls, shelves, drawers, cupboards, the fridge, and storage areas.
3. **Categorise what you find:**
   - **Clearly haram** — alcohol, images of animate beings displayed on walls, items associated with shirk
   - **Doubtful** — items you are unsure about (research these or ask a scholar)
   - **Permissible but problematic** — items that are technically halal but lead to haram behaviour (e.g., a TV in the bedroom)
4. **Include digital spaces** — check streaming subscriptions, music playlists, and saved content on shared devices.
5. **Be honest, not performative** — the goal is not to impress anyone but to genuinely purify your home for the sake of Allah.` },
        { title: 'Remove wall art depicting animate beings — replace with calligraphy or nature imagery', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2108",
              translation: "The Prophet (peace be upon him) said: \"The angels do not enter a house in which there is an image.\" Removing wall art depicting animate beings and replacing with calligraphy or nature imagery welcomes angelic presence.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 318",
              translation: "Recorded in Sahih al-Bukhari 318 (Volume 3), stating that angels do not enter a house containing pictures; also mentioned in hadiths 447, 539, and 338.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) instructed that images of animate beings (humans and animals with distinct features) not be hung on walls, as the angels do not enter a house containing such images (Bukhari). This is not about aesthetics alone — it is about ensuring your home remains a place where angels are present and barakah descends. Replacing such art with Quranic calligraphy or nature imagery transforms the walls from spiritually neutral (or harmful) to actively beneficial.


**How?**

1. **Identify all wall art with animate beings** — portraits, family photos displayed on walls, animal paintings, and decorative prints.
2. **For family photos** — store them in albums or digital frames rather than hanging them. This preserves memories without violating the prohibition.
3. **Source Islamic calligraphy** — look for pieces featuring ayat that are meaningful to your family (e.g., Ayat al-Kursi for the living room, du'a for entering the home near the door).
4. **Add nature imagery** — landscapes, botanical prints, geometric Islamic patterns, and abstract art are all permissible and beautiful.
5. **Do this gradually if needed** — if the change feels overwhelming, replace one piece per week. The key is to start and maintain momentum until the home is fully aligned.` },
        { title: 'Dispose of any alcohol, haram food items, or impermissible substances', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 5:90",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا إِنَّمَا الْخَمْرُ وَالْمَيْسِرُ وَالْأَنصَابُ وَالْأَزْلَامُ رِجْسٌ مِّنْ عَمَلِ الشَّيْطَانِ فَاجْتَنِبُوهُ",
              translation: "O you who have believed, indeed intoxicants, gambling, stone altars, and divining arrows are but defilement from the work of Satan, so avoid them.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) cursed ten people in relation to alcohol — including the one who stores it. Keeping haram substances in the home, even if you do not consume them, normalises their presence and removes the spiritual barrier against them. Food that is haram — whether due to its ingredients or how it was obtained — carries no barakah and may carry spiritual harm. Disposing of these items is a decisive act of tawbah and purification.


**How?**

1. **Check all storage areas** — kitchen cupboards, the fridge, the pantry, bathroom cabinets, and any hidden or forgotten storage.
2. **Alcohol** — pour it down the drain. Do not gift it, sell it, or give it to non-Muslim neighbours, as facilitating its consumption is also prohibited.
3. **Haram food** — check ingredient labels for gelatin (non-halal), lard, carmine, and alcohol-based flavourings. Dispose of items that are clearly haram.
4. **Doubtful items** — if you are unsure about an ingredient, research it or set it aside and ask a knowledgeable person. Apply the principle: "Leave that which makes you doubt for that which does not."
5. **Restock with halal alternatives** — identify halal-certified replacements for anything you dispose of so the kitchen feels abundant, not deprived.` },
        { title: 'Audit media subscriptions and devices for haram content — remove access', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2108",
              translation: "The Prophet (peace be upon him) said: \"The angels do not enter a house in which there is an image.\" Auditing media and removing haram content aligns the home with angelic presence.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The eyes and ears are gates to the heart. What enters through screens shapes your family's desires, fears, and moral compass far more than occasional lectures.

**How?**

1. **List every subscription** — Netflix, Spotify, YouTube Premium, gaming services, audiobook platforms, news apps, and social media accounts.
2. **Evaluate each one honestly:**
   - Does it contain content that normalises zina, alcohol, or disbelief?
   - Can it be filtered or restricted to remove problematic content?
   - Is it a net positive or negative for your family's iman?
3. **Cancel what cannot be reformed** — if a platform's primary content is haram and filtering is insufficient, cancel it entirely.
4. **Set up parental controls** — on remaining services, enable the strictest content filters available.
5. **Replace, do not just remove** — subscribe to Islamic content platforms, halal entertainment, or educational services so the family does not feel a void.` },
        { title: 'Replace removed items with halal alternatives so the home feels enriched, not emptied', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 7:31",
              arabic: "يَا بَنِي آدَمَ خُذُوا زِينَتَكُمْ عِندَ كُلِّ مَسْجِدٍ",
              translation: "O children of Adam, take your adornment at every place of prayer. Replacing removed items with halal alternatives ensures the home feels enriched, not emptied -- beauty is encouraged in Islam.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Islam does not seek to create a barren, joyless home. The Prophet's (peace be upon him) home was described as a place of warmth, laughter, and love. When haram items are removed without replacement, family members — especially children — may associate Islam with deprivation. The Sunnah approach is to replace every haram with something halal that fulfils the same human need: beauty, entertainment, comfort, or pleasure.


**How?**

1. **For each removed item, identify the need it was fulfilling:**
   - Wall art → need for beauty → replace with calligraphy or nature prints
   - Music → need for auditory pleasure → replace with nasheeds, Quran recitation, or nature sounds
   - Alcohol → social or relaxation need → replace with premium teas, mocktails, or specialty coffee
   - Haram entertainment → need for relaxation → replace with Islamic films, board games, or outdoor activities
2. **Invest in quality** — the halal alternative should feel like an upgrade, not a downgrade. A beautiful piece of calligraphy should be more striking than the portrait it replaces.
3. **Involve the family** — let each person choose their preferred halal replacement. This builds ownership and enthusiasm.
4. **Introduce new items gradually** — stagger replacements so each one gets appreciated and discussed.
5. **Celebrate the change** — frame this as a home renewal project, not a purge. The tone should be excitement about what is coming in, not grief about what went out.` },
      ],
    },
    {
      title: 'Ensure the home is clean, organised, and maintained as a dignified space',
      priority: 'high', tags: ['home', 'cleanliness'],
      description: 'Islam elevates cleanliness to half of faith (shattr al-iman).',
      subtasks: [
        { title: 'Establish a daily cleaning routine — 15 minutes of tidying, dishes, and surface cleaning', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 223",
              translation: "The Prophet (peace be upon him) said: \"Cleanliness is half of faith (iman).\" Establishing a daily cleaning routine is a direct implementation of this prophetic guidance.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

 Fifteen minutes of consistent daily effort is more effective than sporadic deep cleaning — it maintains the home in a state of dignity and readiness for worship, guests, or unexpected circumstances. A clean home is also a form of shukr (gratitude) for the blessing of shelter.

**How?**

1. **Pick a fixed time** — ideally right after Fajr or right after dinner. Consistency matters more than duration.
2. **Follow a simple sequence:**
   - Clear surfaces (tables, counters, desks)
   - Wash or load dishes
   - Wipe down kitchen and bathroom surfaces
   - Quick sweep or vacuum of high-traffic areas
   - Put stray items back in their designated places
3. **Set a timer** — 15 minutes creates urgency and prevents the task from expanding unnecessarily.
4. **Make it a family activity** — everyone picks one area. Even a 4-year-old can put toys in a basket.
5. **Track it for the first 30 days** — use a simple checklist on the fridge or a habit-tracking app until it becomes automatic.` },
        { title: 'Declutter one room per week until the entire home is simplified', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 223",
              translation: "The Prophet (peace be upon him) said: \"Cleanliness is half of faith.\" Decluttering one room per week until the entire home is simplified is a systematic approach to maintaining a dignified space.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Excess possessions create visual noise, decision fatigue, and attachment to the dunya. The Prophet (peace be upon him) lived with minimal possessions — not out of poverty, but out of principle. Decluttering is a spiritual practice: it forces you to confront attachment, practise detachment, and create space — both physical and psychological — for what truly matters. A simplified home is easier to clean, more peaceful to inhabit, and more welcoming to guests.


**How?**

1. **Create a schedule** — list every room and assign one per week. Start with the easiest room to build momentum.
2. **Use the three-box method:**
   - **Keep** — items you use regularly or that serve a clear purpose
   - **Donate/Give** — items in good condition that others can benefit from (sadaqah)
   - **Dispose** — broken, expired, or useless items
3. **Apply the one-year rule** — if you have not used it in the past year and it has no sentimental or religious value, let it go.
4. **Be ruthless with duplicates** — you do not need five spatulas, twelve mugs, or three sets of bedding for a guest room that is rarely used.
5. **Donate immediately** — do not let the "donate" box sit for weeks. Drop it off within 48 hours or it will migrate back into the home.` },
        { title: 'Assign age-appropriate cleaning tasks to each family member', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 893",
              translation: "The Prophet (peace be upon him) said: \"Each of you is a shepherd, and each of you is responsible for his flock.\" Assigning age-appropriate cleaning tasks to each family member teaches shared responsibility and stewardship.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) served his family in household tasks — mending his shoes, cleaning, and helping with chores. A home where one person bears the entire burden of maintenance breeds resentment and teaches children entitlement. Assigning tasks to each family member builds responsibility, teamwork, and the understanding that maintaining a home is a shared act of worship, not a punishment.


**How?**

1. **List all recurring household tasks** — daily, weekly, and monthly chores including cooking, cleaning, laundry, tidying, rubbish disposal, and garden care.
2. **Match tasks to age and ability:**
   - **Ages 3-5:** Put toys away, place clothes in the hamper, wipe small spills
   - **Ages 6-9:** Make their bed, set and clear the table, sweep floors, water plants
   - **Ages 10-13:** Vacuum, load the dishwasher, help with cooking, take out rubbish
   - **Ages 14+:** Cook simple meals, do laundry, clean bathrooms, manage their own space
3. **Create a visible chore chart** — post it on the fridge or a family noticeboard. Rotate assignments weekly so no one is stuck with the same task forever.
4. **Tie it to Islamic values** — frame chores as following the Sunnah of the Prophet, who helped at home, and as building the quality of itqan (excellence in work).
5. **Praise effort, not perfection** — especially with young children. The habit matters more than the result in the early stages.` },
        { title: 'Deep clean the entire home monthly — bathrooms, kitchen, and storage areas', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 223",
              translation: "The Prophet (peace be upon him) said: \"Cleanliness is half of faith.\" Deep cleaning the entire home monthly -- bathrooms, kitchen, and storage areas -- is a regular renewal of this commitment to purity.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Daily tidying maintains surfaces, but deep cleaning addresses what accumulates beneath — grease in the kitchen, grime in bathrooms, dust in storage areas, and forgotten items that create clutter. A monthly deep clean is the household equivalent of a spiritual audit: going beneath the surface to address what daily routines miss. It also prevents health hazards and keeps the home in a condition worthy of hosting guests at any time.


**How?**

1. **Schedule it on a fixed day** — the first Saturday of each month, for example. Put it in the family calendar.
2. **Create a deep-clean checklist:**
   - **Kitchen:** Degrease the stove and oven, clean behind appliances, wipe cabinet interiors, check pantry for expired items
   - **Bathrooms:** Scrub grout, descale taps, clean behind the toilet, wash bath mats and shower curtains
   - **Bedrooms:** Flip or rotate mattresses, wash pillows and duvets, dust under furniture
   - **Storage areas:** Reorganise, dispose of broken items, ensure nothing is damp or mouldy
3. **Divide and conquer** — assign each family member a room or zone. The entire deep clean should take 2-3 hours with everyone contributing.
4. **Stock cleaning supplies in advance** — keep a dedicated cleaning caddy so you are not searching for products on the day.
5. **End with something pleasant** — burn bakhoor, open the windows for fresh air, or prepare a special family meal as a reward for the collective effort.` },
        { title: 'Maintain an "everything has a place" system so tidying is fast and effortless', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2107",
              translation: "The Prophet (peace be upon him) said: \"Indeed, Allah is beautiful and loves beauty.\" Maintaining an \"everything has a place\" system makes tidying fast and effortless, reflecting an orderly and intentional approach to the home.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Disorder is the enemy of efficiency, peace, and dignity. When every item in the home has a designated place, tidying becomes a 5-minute reset rather than a 30-minute search-and-sort mission. The Islamic principle of itqan (doing things with excellence) applies to home organisation as much as to worship. A well-organised home reduces stress, saves time, and models discipline for children — showing them that Muslims are people of order, not chaos.


**How?**

1. **Start with high-traffic areas** — the entrance, kitchen counter, and living room table are where clutter accumulates fastest.
2. **Assign a home for every category:**
   - Keys → hook by the door
   - Shoes → shoe rack at the entrance
   - Mail and papers → a single tray or folder
   - Children's toys → labelled bins or baskets
   - Electronics and chargers → a designated drawer or station
3. **Label storage** — use labels on shelves, drawers, and bins so every family member (including children) knows where things belong.
4. **Apply the "one in, one out" rule** — when a new item enters the home, an equivalent item must leave. This prevents re-accumulation.
5. **Do a 5-minute reset every evening** — before bed, walk through the main areas and return every displaced item to its home. This ensures each morning starts with a clean slate.` },
      ],
    },
    {
      title: 'Begin and end each day in the home with Islamic adhkar — morning/evening supplications',
      priority: 'high', tags: ['home', 'adhkar'],
      description: 'The morning and evening adhkar are a shield for the household.',
      subtasks: [
        { title: 'Print or display the morning and evening adhkar in a common area of the home', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 33:41-42",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا اذْكُرُوا اللَّهَ ذِكْرًا كَثِيرًا وَسَبِّحُوهُ بُكْرَةً وَأَصِيلًا",
              translation: "O you who have believed, remember Allah with much remembrance and exalt Him morning and afternoon. Printing or displaying the morning and evening adhkar in a common area of the home supports this remembrance.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Visibility drives consistency. When the adhkar are printed and placed where the family gathers — the living room, the dining area, or near the prayer space — they serve as a constant, gentle reminder. Out of sight is out of mind, and many Muslims abandon their adhkar simply because they forget. A prominently displayed set of supplications removes the excuse of forgetfulness and normalises dhikr as a routine part of home life.


**How?**

1. **Source a clear, readable adhkar sheet** — many mosques distribute these, or you can print one from a trusted website (e.g., the Fortress of the Muslim / Hisn al-Muslim collection).
2. **Choose a high-visibility location** — the wall near the dining table, above the prayer space, or on the fridge door.
3. **Frame it beautifully** — a framed adhkar sheet communicates importance. Do not just tape a printout to the wall.
4. **Include transliteration and translation** — especially if children or non-Arabic-speaking family members will use it.
5. **Consider multiple copies** — one in the living room for family gatherings, one in each bedroom for personal use, and a pocket-sized version for travel.` },
        { title: 'Set a consistent time for family adhkar — after Fajr and after Asr or Maghrib', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2691",
              translation: "The Prophet (peace be upon him) said: \"The comparison of the one who remembers Allah and the one who does not is like the comparison of the living and the dead.\" Setting a consistent time for family adhkar -- after Fajr and after Asr or Maghrib -- brings life to the household.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The morning and evening adhkar are described in the Sunnah as a spiritual shield — protecting the one who recites them from harm, anxiety, and the whispers of Shaytan. Their power is in consistency, not sporadic recitation. Setting a fixed time anchors the practice to an existing habit (salah), making it far more likely to persist. When done as a family, it creates a shared spiritual rhythm that strengthens the household's collective iman.


**How?**

1. **Link it to salah** — the morning adhkar are best recited immediately after Fajr, and the evening adhkar after Asr or Maghrib. Choose whichever timing your family can sustain.
2. **Start with a 5-minute commitment** — do not attempt the entire collection on day one. Begin with the essentials and add gradually.
3. **Designate a leader** — one family member leads the recitation each day. Rotate this role weekly so everyone, including children, develops confidence.
4. **Eliminate competing activities** — no phones, no TV, no breakfast prep during adhkar time. These 5-10 minutes are sacred.
5. **Use a timer for the first month** — set a recurring alarm on your phone labelled "Adhkar Time" until the habit is internalised.` },
        { title: 'Start with the essentials — Ayat al-Kursi, Al-Mu\'awwidhat, and the core morning/evening du\'as', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 30:17",
              arabic: "فَسُبْحَانَ اللَّهِ حِينَ تُمْسُونَ وَحِينَ تُصْبِحُونَ",
              translation: "So celebrate God’s glory in the evening, in the morning — *(Abdel Haleem)* *Allah commands glorification (tasbih) morning and evening — the same windows as the core adhkar. The morning and evening du’a collections are a living response to this Quranic instruction.*",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 2:255 — Ayat al-Kursi",
              arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ",
              translation: "God: there is no god but Him, the Ever Living, the Ever Watchful. Neither slumber nor sleep overtakes Him. All that is in the heavens and in the earth belongs to Him. Who is there that can intercede with Him except by His leave? He knows what is before them and what is behind them, but they do not comprehend any of His knowledge except what He wills. His throne extends over the heavens and the earth; it does not weary Him to preserve them both. He is the Most High, the Tremendous. *(Abdel Haleem)*",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5010",
              translation: "Abu Huraira (may Allah be pleased with him) reported: The Prophet (peace be upon him) said about reciting Ayat al-Kursi before sleep: \"When you go to your bed, recite Ayat al-Kursi — ‘Allahu la ilaha illa Huwa, al-Hayyul-Qayyum’ — to the end of the verse. A guardian from Allah will then protect you all night long, and no shaytan will come near you until morning.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (peace be upon him) specifically highlighted certain adhkar as having extraordinary protective and spiritual power. Ayat al-Kursi recited after every obligatory prayer is a means of entering Paradise. The Mu'awwidhat (Surahs Al-Falaq and An-Nas) are a protection from all forms of evil. Starting with these essentials ensures you capture the highest-impact supplications first, even if you do not have time for the full collection.


**How?**

1. **Memorise the core set:**
   - **Ayat al-Kursi** (Surah Al-Baqarah 2:255) — once after each salah
   - **Surah Al-Ikhlas, Al-Falaq, An-Nas** — three times each, morning and evening
   - **Sayyid al-Istighfar** — the master supplication for forgiveness
   - **SubhanAllah, Alhamdulillah, Allahu Akbar** — 33 times each after salah
2. **Learn the meanings** — recite with translation for the first week until the meanings are internalised. Understanding transforms repetition into conversation with Allah.
3. **Use a dhikr app** — apps like "Dhikr & Dua" or "MyDuaa" provide audio recitation, text, and tracking.
4. **Add one new du'a per week** — once the essentials are habitual, expand to include du'as for protection, provision, and guidance.
5. **Teach children through repetition** — recite audibly and slowly so children absorb the words naturally over time.` },
        { title: 'Recite audibly so children hear and learn through repetition', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 20:132",
              arabic: "وَأْمُرْ أَهْلَكَ بِالصَّلَاةِ وَاصْطَبِرْ عَلَيْهَا",
              translation: "And enjoin prayer upon your family and be steadfast therein. Reciting adhkar audibly so children hear and learn through repetition follows the same principle of enjoining worship upon one's household.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Children learn language, tone, and habit through immersion — not instruction. A child who grows up hearing Ayat al-Kursi every morning will memorise it without formal lessons, associate it with safety and routine, and carry it into adulthood as a deeply ingrained practice. The homes of the Sahabah were filled with the sound of Quran and dhikr. Audible recitation also benefits the reciter — it increases focus and engages more of the senses than silent recitation.


**How?**

1. **Recite at a natural, clear volume** — not shouting, but not whispering either. The goal is that anyone in the same room can hear and follow along.
2. **Slow your pace** — rushed recitation is harder for children to absorb. Pause between phrases so the words are distinct.
3. **Invite children to join in** — even if they can only say "Ameen" at the end, they are participating. Gradually they will pick up more words.
4. **Do not correct harshly** — if a child mispronounces something, gently repeat the correct version. Harsh correction creates aversion to worship.
5. **Be consistent above all** — a child who hears adhkar every single morning for a year will have internalised them far more deeply than one who hears perfect recitation sporadically.` },
        { title: 'Use an adhkar app or book to track consistency for the first 40 days', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6464",
              translation: "The Prophet (peace be upon him) said: \"The most beloved deeds to Allah are those that are done consistently, even if they are small.\" Using an adhkar app or book to track consistency for the first 40 days builds the habit of daily remembrance.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Research on habit formation consistently shows that tracking accelerates consistency. Tracking your adhkar for 40 consecutive days builds the neural pathways and family routines needed to make it automatic. After 40 days, the practice should feel natural enough to sustain without external tracking.

**How?**

1. **Choose your tracking method:**
   - **App:** Use an adhkar app with a built-in streak counter (e.g., "Dhikr & Dua", "Muslim Pro", or a simple habit tracker like "Streaks")
   - **Physical:** Print a 40-day checklist and place it next to the adhkar poster. Check off each day after completing the recitation.
2. **Track completion, not perfection** — mark the day as done if you completed the core essentials, even if you did not finish the entire collection.
3. **Make it visible** — if using a physical tracker, place it where the whole family can see progress. Shared accountability strengthens commitment.
4. **Do not break the chain** — if you miss a day, restart the 40-day count. This is not punishment — it is training your nafs to prioritise consistency.
5. **Celebrate day 40** — mark the milestone with a family meal or a small reward. Then continue without the tracker, checking in monthly to ensure the habit persists.` },
      ],
    },
    {
      title: 'Establish household rules — screen time limits, guest etiquette, and shared responsibilities',
      priority: 'medium', tags: ['home', 'discipline'],
      description: 'A well-run household operates on shared agreements, not constant policing.',
      subtasks: [
        { title: 'Draft household rules as a family — involve children in the discussion so they have buy-in', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 42:38",
              arabic: "وَأَمْرُهُمْ شُورَىٰ بَيْنَهُمْ",
              translation: "And whose affair is determined by consultation among themselves. Drafting household rules as a family -- involving children in the discussion so they have buy-in -- is an application of shura in the home.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Rules imposed without consultation breed resentment; rules co-created build ownership. The Quran commands shura (mutual consultation) in family affairs (42:38). When children participate in drafting household rules, they understand the reasoning behind them, feel respected as members of the household, and are far more likely to follow them willingly. This is not democracy — parents retain final authority — but it is the prophetic model of leadership through consultation.


**How?**

1. **Call a family meeting** — set a specific time, make it feel important (perhaps over a meal or snacks), and explain the purpose: "We are creating our household rules together."
2. **Start with values** — ask: "What kind of home do we want to live in?" Let each person share. Write every response on a whiteboard or large paper.
3. **Translate values into rules** — for each value (e.g., "respect"), ask: "What does that look like in practice?" This generates specific, actionable rules.
4. **Limit the list** — aim for 7-10 core rules. Too many rules are impossible to remember and enforce.
5. **Write them clearly** — use simple, positive language. "We speak kindly to each other" is better than "No shouting."
6. **Have everyone sign** — a signed document feels like a commitment, not an imposition.` },
        { title: 'Set specific screen time limits by age and enforce them with device controls', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 66:6",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا قُوا أَنفُسَكُمْ وَأَهْلِيكُمْ نَارًا",
              translation: "O you who have believed, protect yourselves and your families from a Fire. Setting specific screen time limits by age and enforcing them with device controls is a modern means of protecting children from harm.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Unrestricted screen time is linked to attention problems, sleep disruption, behavioural issues, and — most critically for a Muslim home — exposure to haram content. Setting and enforcing screen time limits is not overprotection — it is fulfilling your amanah (trust).

**How?**

1. **Set age-based limits:**
   - **Under 2:** No screen time except video calls with family
   - **Ages 2-5:** Maximum 1 hour per day of supervised, educational content
   - **Ages 6-12:** Maximum 1.5-2 hours per day, including homework screen time
   - **Ages 13+:** A negotiated limit, typically 2-3 hours, with content oversight
2. **Use built-in device controls:**
   - **Apple:** Screen Time in Settings
   - **Android:** Family Link
   - **Windows:** Microsoft Family Safety
   - **Routers:** Many routers allow scheduled internet access per device
3. **Enforce a "screens off" time** — at least 1 hour before bedtime, all screens are off and charging in a common area.
4. **Model the behaviour** — if parents are on their phones constantly, children will not respect screen time limits. Set your own limits visibly.
5. **Provide alternatives** — board games, outdoor play, books, and crafts should be accessible and appealing so screens are not the default.` },
        { title: 'Define guest etiquette — how the family welcomes, hosts, and farewells visitors', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6019",
              translation: "The Prophet (peace be upon him) said: \"Whoever believes in Allah and the Last Day, let him be generous to his guest.\" Defining guest etiquette -- how the family welcomes, hosts, and farewells visitors -- implements this Prophetic guidance.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Hospitality is a distinguishing quality of the believers. Children who grow up in a hospitable home learn generosity, social confidence, and the beauty of serving others for the sake of Allah.

**How?**

1. **Teach the greeting** — every family member, including children, should greet guests at the door with salaam, a smile, and an invitation to enter.
2. **Define hosting standards:**
   - Offer something to drink within 5 minutes of arrival (water, tea, or juice at minimum)
   - Prepare the guest area in advance — clean, comfortable seating, pleasant scent
   - If a meal is involved, serve generously and eat with your guests
3. **Assign roles** — older children can help serve food, younger ones can take coats or offer sweets. Everyone has a part.
4. **Teach farewell etiquette** — walk guests to the door, thank them for coming, and make du'a for them: "May Allah bless your family."
5. **Discuss boundaries** — some guests may stay too long or visit at inconvenient times. Teach the family how to be gracious while also maintaining the household's routine.` },
        { title: 'Assign shared responsibilities — a visible chore chart that rotates weekly', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 893",
              translation: "The Prophet (peace be upon him) said: \"Each of you is a shepherd, and each of you is responsible for his flock.\" Assigning shared household responsibilities teaches accountability and stewardship.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A chore chart is not merely an organisational tool — it is a training programme in accountability, fairness, and service. The Prophet (peace be upon him) participated in household tasks and never considered domestic work beneath him. A rotating chart ensures that no single person bears an unfair burden and that every family member — including fathers and sons — learns to serve the home. Visibility (posting it on the wall) creates social accountability that internal commitments alone cannot provide.


**How?**

1. **List all weekly recurring tasks** — dishes, cooking, vacuuming, taking out rubbish, laundry, bathroom cleaning, tidying common areas, setting the table.
2. **Create a weekly grid** — rows are tasks, columns are family members. Rotate assignments each week so skills are diversified.
3. **Make it physical and visible** — a printed chart on the fridge or a whiteboard in the kitchen works better than a digital app for family-wide accountability.
4. **Include a "check" system** — each person marks their task as done. A weekly review (perhaps at the family meeting) addresses any gaps.
5. **Tie it to Islamic character** — frame shared responsibility as itqan (excellence), amanah (trustworthiness), and following the Sunnah. These are not just chores — they are training grounds for character.` },
        { title: 'Review and update the household rules every 6 months in a family meeting', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6464",
              translation: "The Prophet (peace be upon him) said: \"The most beloved deeds to Allah are those that are done consistently, even if they are small.\" Reviewing and updating household rules every 6 months in a family meeting ensures the framework stays relevant as children grow.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Families evolve — children grow, circumstances change, and rules that were appropriate six months ago may now be too strict, too lenient, or irrelevant. A biannual review keeps the household rules alive and adaptive rather than rigid and ignored. It also reinforces the shura (consultation) model: the family revisits, discusses, and adjusts together, which maintains buy-in and demonstrates that the rules serve the family, not the other way around.


**How?**

1. **Schedule it** — pick a fixed date every 6 months (e.g., the first weekend of Muharram and the first weekend of Rajab, aligning with the Islamic calendar).
2. **Review each rule:**
   - Is this rule still relevant?
   - Is it being followed consistently?
   - Does it need to be adjusted (stricter, more lenient, or reworded)?
   - Should it be removed entirely?
3. **Invite input from everyone** — ask each family member: "What rule is working well? What rule feels unfair or outdated?"
4. **Add new rules as needed** — as children enter new life stages (school, adolescence, driving), new rules will be necessary.
5. **Re-sign the updated document** — this small ritual reinforces commitment and signals that the rules are a living agreement, not a forgotten document.` },
      ],
    },
  ],

  family_home_growth: [
    {
      title: 'Curate the home aesthetic — add calligraphy, remove distracting decor, create a peaceful atmosphere',
      priority: 'medium', tags: ['home', 'environment'],
      description: 'Your home\'s atmosphere shapes your family\'s emotional and spiritual state.',
      subtasks: [
        { title: 'Remove or replace distracting, cluttered, or un-Islamic decor from common areas', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2108",
              translation: "The Prophet (peace be upon him) said: \"The angels do not enter a house in which there is an image.\" Removing or replacing distracting, cluttered, or un-Islamic decor from common areas creates space for angelic presence and spiritual calm.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Your environment shapes your inner state more than you realise. Cluttered, chaotic, or spiritually misaligned decor creates subtle but persistent unease. The Prophet (peace be upon him) valued simplicity and intentionality in his surroundings. Removing distracting decor is not about minimalism as a trend — it is about creating a space where the soul can rest, the mind can focus, and the family can be present with each other and with Allah.


**How?**

1. **Walk through each common area** — living room, dining area, hallways, entrance — and photograph it. Looking at photos often reveals clutter that familiarity has made invisible.
2. **Ask three questions about each item:**
   - Does it serve a clear purpose?
   - Does it contribute to a peaceful atmosphere?
   - Is it aligned with Islamic values?
3. **Remove items that fail all three tests** — store, donate, or dispose of them.
4. **Reduce visual density** — too many items, even individually beautiful ones, create visual noise. Aim for fewer, more intentional pieces.
5. **Replace gradually** — as you remove items, note what the space needs (warmth, colour, meaning) and source Islamic or nature-based alternatives.` },
        { title: 'Add Islamic calligraphy — select ayat that resonate with your family\'s values', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 59:22-24",
              arabic: "هُوَ اللَّهُ الْخَالِقُ الْبَارِئُ الْمُصَوِّرُ لَهُ الْأَسْمَاءُ الْحُسْنَىٰ",
              translation: "He is Allah, the Creator, the Originator, the Fashioner; to Him belong the most beautiful names. Adorning the home with calligraphy of Allah's names and ayat is a reminder of His presence.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 31:17",
              arabic: "يَـٰبُنَىَّ أَقِمِ ٱلصَّلَوٰةَ وَأْمُرْ بِٱلْمَعْرُوفِ وَٱنْهَ عَنِ ٱلْمُنكَرِ وَٱصْبِرْ عَلَىٰ مَآ أَصَابَكَ ۖ إِنَّ ذَٰلِكَ مِنْ عَزْمِ ٱلْأُمُورِ",
              translation: "Keep up the prayer, my son; command what is right; forbid what is wrong; bear anything that happens to you steadfastly: these are things to be aspired to.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Islamic calligraphy does more than decorate — it places the words of Allah in your line of sight, creating a constant, subconscious connection to the Quran. When you walk past Ayat al-Kursi in your hallway or see "Rabbi zidni 'ilma" (My Lord, increase me in knowledge) above a study desk, the ayah imprints itself on your heart. This is environmental tarbiyah — letting your walls teach, remind, and inspire without a single word spoken.


**How?**

1. **Choose ayat with intention** — select verses that reflect your family's current priorities or aspirations:
   - **Living room:** Surah Ar-Ra'd 13:28 — "Verily, in the remembrance of Allah do hearts find rest"
   - **Kitchen/dining:** A du'a for barakah in provision
   - **Children's rooms:** Surah Luqman 31:17 — "O my son, establish prayer..."
   - **Entrance:** Du'a for entering the home
2. **Source quality pieces** — invest in hand-painted, printed canvas, or laser-cut wood calligraphy. Avoid cheap, mass-produced pieces that cheapen the words of Allah.
3. **Match the style to your home** — modern homes suit geometric Kufic script; traditional homes suit flowing Thuluth or Naskh.
4. **Place them at eye level** — calligraphy placed too high is ignored. At eye level, it becomes part of your daily visual field.
5. **Rotate or add pieces over time** — as your family memorises certain ayat, add new ones to keep the environment fresh and the learning continuous.` },
        { title: 'Introduce natural elements — plants, natural light, wood textures — for warmth and calm', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2107",
              translation: "The Prophet (peace be upon him) said: \"Indeed, Allah is beautiful and loves beauty.\" Introducing natural elements -- plants, natural light, wood textures -- for warmth and calm reflects the divine love of beauty.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Quran repeatedly draws attention to the natural world as a source of reflection and tranquillity — gardens, rivers, shade, and greenery are descriptions of both earthly beauty and Paradise. Bringing natural elements into the home aligns your living space with the fitrah (natural disposition) that craves connection with Allah's creation. Studies consistently show that natural light, greenery, and natural textures reduce stress and improve mood — confirming what revelation established centuries ago.


**How?**

1. **Maximise natural light** — open curtains fully during the day, use sheer curtains instead of heavy drapes, and keep windows clean. Natural light regulates mood and sleep.
2. **Add indoor plants** — choose low-maintenance varieties:
   - **Snake plants** — purify air, tolerate low light
   - **Pothos** — trailing plants that add life to shelves
   - **Peace lilies** — beautiful and easy to care for
   - **Herbs (basil, mint)** — practical and fragrant in the kitchen
3. **Incorporate wood and natural textures** — wooden Quran stands, rattan baskets, jute rugs, and bamboo organisers add warmth without clutter.
4. **Reduce synthetic materials** — where possible, replace plastic storage with woven baskets, and synthetic cushions with cotton or linen.
5. **Create a "nature corner"** — a small area with a plant, a natural-scent candle or diffuser, and a comfortable seat for reading or reflection.` },
        { title: 'Minimise visual noise — fewer items, neutral tones, intentional placement', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 80:33",
              arabic: "**Translation:** At length, when there comes the Deafening Noise,-",
              translation: "At length, when there comes the Deafening Noise,-",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Visual noise — too many colours, objects, patterns, and stimuli — exhausts the mind and prevents rest. The Prophet's (peace be upon him) living quarters were famously simple, allowing focus on what truly mattered: worship, family, and reflection. A home with intentional placement and restrained colour palettes does not feel austere — it feels spacious, calm, and dignified. This is particularly important for children, whose developing minds are easily overstimulated by chaotic environments.


**How?**

1. **Adopt a neutral base palette** — whites, creams, soft greys, and warm beiges create a calm foundation. Add colour through a few intentional accents (a teal cushion, a green plant, a piece of calligraphy).
2. **Apply the "less is more" principle** — for every surface (shelf, table, counter), aim for 3 items maximum. Group them in odd numbers for visual balance.
3. **Use closed storage** — open shelves with many items create visual noise. Use cabinets, baskets, and drawers to hide everyday items.
4. **Be intentional with every placement** — ask: "Does this item earn its place in my line of sight?" If not, store it or remove it.
5. **Edit seasonally** — every few months, reassess what is on display. Rotate items to keep the space feeling fresh without adding more.` },
        { title: 'Ask each family member what makes a room feel peaceful and incorporate their input', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 42:38",
              arabic: "وَأَمْرُهُمْ شُورَىٰ بَيْنَهُمْ",
              translation: "And whose affair is determined by consultation among themselves. Asking each family member what makes a room feel peaceful and incorporating their input is shura applied to the home environment.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A home is not one person's project — it is a shared space where every member should feel comfort and belonging. The prophetic model of shura (consultation) applies to home design as much as to governance. When each family member's preferences are heard and incorporated, the home becomes a collective expression of the family rather than a reflection of one person's taste. This also teaches children that their opinions are valued and that beauty is subjective.


**How?**

1. **Hold a family conversation** — ask each person: "When you walk into a room, what makes you feel calm and happy?" Record every response.
2. **Look for common themes** — you may find universal preferences (natural light, quiet, pleasant scent) alongside individual ones (a child who loves blue, a spouse who values open space).
3. **Incorporate at least one element per person** — if a child loves having a reading nook, create one. If a spouse values a clutter-free kitchen, prioritise that.
4. **Give each person ownership of their own space** — bedrooms and personal areas should reflect the individual's preferences within the family's shared values (no haram content, cleanliness maintained).
5. **Revisit annually** — people's preferences change, especially children's. Check in each year and make adjustments.` },
      ],
    },
    {
      title: 'Establish a family media policy — approved content only, devices out of bedrooms at night',
      priority: 'high', tags: ['home', 'protection'],
      description: 'Unrestricted media access is the single greatest threat to a Muslim home\'s spiritual integrity.',
      subtasks: [
        { title: 'Audit all devices in the home — phones, tablets, laptops, smart TVs — and who has access', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 66:6",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا قُوا أَنفُسَكُمْ وَأَهْلِيكُمْ نَارًا",
              translation: "O you who have believed, protect yourselves and your families from a Fire. Auditing all devices in the home and who has access is a foundational step in protecting the family from harmful content.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

You cannot manage what you have not mapped. Many households have devices that parents are only vaguely aware of — an old tablet a child uses, a smart TV with unrestricted apps, or a laptop with no parental controls. Each device is a potential gateway to content that can corrupt aqidah, normalise haram, or expose children to harm. A full audit gives you a clear picture of your household's digital landscape and the vulnerabilities within it.


**How?**

1. **List every internet-connected device** — walk through the home and document each one: smartphones, tablets, laptops, desktops, smart TVs, gaming consoles, smart speakers, and even smartwatches.
2. **Record who uses each device** — note primary and secondary users, especially children.
3. **Check what is installed** — review apps, streaming services, browsers, and social media accounts on each device.
4. **Identify uncontrolled devices** — any device without parental controls, content filters, or adult oversight is a risk.
5. **Create a simple spreadsheet or list** — device name, owner, apps installed, controls active (yes/no). This becomes your baseline for implementing the media policy.` },
        { title: 'Install parental controls and content filters on all children\'s devices', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 66:6",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا قُوا أَنفُسَكُمْ وَأَهْلِيكُمْ نَارًا",
              translation: "O you who have believed, protect yourselves and your families from a Fire. Installing parental controls is a modern expression of protecting children from harm.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Children lack the maturity to self-regulate their media consumption and the knowledge to evaluate whether content is halal or harmful. Parental controls are not a sign of distrust — they are a form of protection that even adults benefit from.

**How?**

1. **Use platform-level controls:**
   - **Apple devices:** Settings → Screen Time → Content & Privacy Restrictions
   - **Android devices:** Google Family Link (install on both parent and child devices)
   - **Windows:** Microsoft Family Safety
   - **Gaming consoles:** Each platform (PlayStation, Xbox, Nintendo) has built-in parental controls
2. **Install a DNS-level filter** — services like CleanBrowsing or OpenDNS Family Shield filter harmful content at the network level, covering all devices on your Wi-Fi.
3. **Set up SafeSearch** — enable SafeSearch on Google, Bing, and YouTube on every device and browser.
4. **Restrict app installations** — require parental approval before any new app can be downloaded.
5. **Test the controls** — after setup, test each device to confirm the filters are working. Children are resourceful, so verify periodically.` },
        { title: 'Establish a device curfew — all screens off and charged outside bedrooms by a set time', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 893",
              translation: "The Prophet (peace be upon him) said: \"Each of you is a shepherd, and each of you is responsible for his flock.\" Establishing a device curfew -- all screens off and charged outside bedrooms by a set time -- is responsible shepherding over the household.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Screens in bedrooms at night are the single most common pathway to haram content consumption, sleep deprivation, and private conversations that erode a child's moral development. The darkness and privacy of a bedroom combined with an unmonitored screen create a perfect environment for temptation. A device curfew is a simple, enforceable boundary that protects sleep, protects innocence, and ensures that bedrooms remain spaces for rest and du'a — not digital consumption.


**How?**

1. **Set a fixed time** — e.g., all devices are surrendered by 9:00 PM on school nights, 10:00 PM on weekends. Adjust by age.
2. **Create a charging station** — a designated spot in a common area (kitchen counter, living room shelf) where all devices charge overnight. This is non-negotiable.
3. **Include all devices** — phones, tablets, laptops, and e-readers. If it has a screen, it goes to the charging station.
4. **Lead by example** — parents must also place their devices at the charging station. If your phone is in your bedroom, your children will resist surrendering theirs.
5. **Replace screen time with better alternatives** — provide books, journals, or audio Quran recitations for the wind-down period. The goal is a peaceful transition to sleep, not boredom.` },
        { title: 'Create a family-approved content list — shows, channels, and apps that are halal and beneficial', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 893",
              translation: "The Prophet (peace be upon him) said: \"Each of you is a shepherd, and each of you is responsible for his flock.\" Curating approved content is an act of responsible shepherding over the family.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Restricting without providing alternatives creates a vacuum that breeds resentment. A curated, family-approved content list gives children and teenagers clear choices within halal boundaries. This is the Islamic approach to media: not total prohibition, but careful curation. The Prophet (peace be upon him) did not forbid all entertainment — he permitted singing without instruments at celebrations and watched the Abyssinians play in the mosque. The principle is moderation, benefit, and the absence of haram.


**How?**

1. **Create categories:**
   - **Islamic content:** Quran recitation channels, Islamic history documentaries, scholars' lectures suitable for the family
   - **Educational:** Nature documentaries, science channels, language learning apps
   - **Entertainment:** Halal animation, family-friendly films, comedy that avoids vulgarity
   - **Creative:** Art tutorials, coding platforms, music-free content creation tools
2. **Research together as a family** — spend an evening browsing options and discussing what is acceptable. Children are more likely to watch approved content they helped select.
3. **Write the list down** — post it on the fridge or save it as a shared document. When someone says "I'm bored," point them to the list.
4. **Review and update quarterly** — new content is released constantly. Remove items that have declined in quality and add new discoveries.
5. **Allow age-appropriate variance** — older children may have access to content that younger siblings do not. The list can have tiers by age.` },
        { title: 'Model the policy yourself — children will not respect rules parents do not follow', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 61:2-3",
              arabic: "لِمَ تَقُولُونَ مَا لَا تَفْعَلُونَ",
              translation: "Why do you say what you do not do? Modelling the media policy yourself is essential -- children will not respect rules parents do not follow.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Hypocrisy is the fastest way to destroy credibility with your children. If you enforce a device curfew but scroll your phone in bed, restrict social media but spend hours on Instagram yourself, or ban haram content but watch it when the children are asleep — they will notice, and they will conclude that the rules are about control, not conviction. Your media policy must start with you.

**How?**

1. **Follow every rule you set** — device curfew, content restrictions, screen time limits. No exceptions for "adults."
2. **Be transparent** — tell your family: "I am also following this policy because it is good for all of us, not just for children."
3. **Share your own struggles** — if you find it hard to put your phone down, say so. Vulnerability builds trust and shows children that discipline is a journey, not a destination.
4. **Replace your own screen time** — find analogue alternatives for your downtime: reading, exercise, conversation, crafts, or dhikr.
5. **Ask your family to hold you accountable** — give children permission to remind you if they see you breaking the policy. This flattens the power dynamic and builds mutual respect.` },
      ],
    },
    {
      title: 'Create a dedicated home learning space — books, Quran, and educational resources accessible to all',
      priority: 'medium', tags: ['home', 'learning'],
      description: 'A home with a visible, accessible learning space sends a powerful message: this family values knowledge.',
      subtasks: [
        { title: 'Designate a corner, shelf, or room as the household learning space', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 96:1-5",
              arabic: "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ",
              translation: "Read in the name of your Lord who created. Designating a corner, shelf, or room as the household learning space honours the first revelation's command to seek knowledge.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The first word revealed to the Prophet (peace be upon him) was "Iqra" — Read. Islam places the pursuit of knowledge at the very foundation of faith. A designated learning space in the home makes knowledge accessible, visible, and habitual. Just as a prayer space invites salah, a learning space invites reading, study, and curiosity. Without a dedicated area, books end up scattered, dusty, and forgotten — and the message to your family is that learning is an afterthought.


**How?**

1. **Choose a location** — ideally in a common area (living room, hallway, family room) rather than hidden away in a bedroom. Visibility is key.
2. **Scale to your space:**
   - **Small home:** A single bookshelf and a comfortable chair
   - **Medium home:** A reading corner with a shelf, desk, and floor cushions
   - **Larger home:** A dedicated study or library room
3. **Ensure comfort** — good lighting (natural light preferred), a comfortable seat, and a flat surface for writing are essential.
4. **Keep it accessible** — lower shelves for children's books, higher shelves for adult texts. Nothing should be locked away or difficult to reach.
5. **Separate it from screens** — the learning space should be a screen-free zone to preserve focus and associate the area with deep reading, not digital browsing.` },
        { title: 'Stock it with Quran copies, tafsir, hadith collections, and Islamic children\'s books', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:138",
              arabic: "**Translation:** [Our Sibghah (religion) is] the Sibghah (Religion) of Allâh (Islâm) and which Sibghah (religion) can be better than Allâh’s? And we are His worshippers. [Tafsir Ibn Kathîr]",
              translation: "[Our Sibghah (religion) is] the Sibghah (Religion) of Allâh (Islâm) and which Sibghah (religion) can be better than Allâh’s? And we are His worshippers. [Tafsir Ibn Kathîr]",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 933",
              translation: "Narrated Anas bin Malik:Once in the lifetime of the Prophet (ﷺ) the people were afflicted with drought (famine). While the Prophet (ﷺ) was delivering the Khutba on a Friday, a Bedouin stood up and said, \"O, Allah's Messenger (ﷺ)! Our possessions are being destroyed and the children are hungry; Please invoke Allah (for rain)\". So the Prophet (ﷺ) raised his hands. At that time there was not a trace of cloud in the sky. By Him in Whose Hands my soul is as soon as he lowered his hands, clouds gathered like mountains, and before he got down from the pulpit, I saw the rain falling on the beard of the Prophet. It rained that day, the next day, the third day, the fourth day till the next Friday. The same Bedouin or another man stood up and said, \"O Allah's Messenger (ﷺ)! The houses have collapsed, our possessions and livestock have been drowned; Please invoke Allah (to protect us)\". So the Prophet (ﷺ) raised both his hands and said, \"O Allah! Round about us and not on us\". So, in whatever direction he pointed with his hands, the clouds dispersed and cleared away, and Medina's (sky) became clear as a hole in between the clouds. The valley of Qanat remained flooded, for one month, none came from outside but talked about the abundant rain",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A Muslim home without Islamic books is like a garden without seeds — nothing will grow. The Quran, its tafsir (explanation), and the hadith collections are the primary sources of guidance, and they must be physically present and accessible in the home. Islamic children's books shape young minds with prophetic stories, moral lessons, and a love for the deen long before formal education begins. Accessibility matters: a book on a shelf is read; a book in a box is forgotten.


**How?**

1. **Start with the essentials:**
   - At least 2-3 Quran copies (one with Arabic only, one with translation, one children's version)
   - A reliable tafsir — e.g., *Tafsir Ibn Kathir* (abridged) or *Ma'ariful Quran*
   - A hadith collection — *Riyad as-Salihin* is an excellent starting point
   - *Fortress of the Muslim* (Hisn al-Muslim) — du'a reference
2. **Build the children's section:**
   - Prophet stories series (e.g., *Goodnight Stories from the Quran/Hadith*)
   - Islamic character-building books
   - Quran activity books for younger children
3. **Add gradually** — budget for 1-2 new books per month. Quality over quantity.
4. **Organise by category** — Quran & Tafsir, Hadith, Seerah, Fiqh, Children's, General Islamic.
5. **Source from reputable publishers** — Dar-us-Salam, Kube Publishing, Learning Roots, and IIPH are well-known Islamic publishers with quality content.` },
        { title: 'Add general educational resources — atlas, dictionary, science books, art supplies', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (peace be upon him) said: \"Whoever takes a path in search of knowledge, Allah will ease for him a path to Paradise.\" Providing diverse educational resources opens paths of learning for the entire family.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Islam does not separate "religious" knowledge from "worldly" knowledge — all beneficial knowledge is valued. The Muslim scholars of the Golden Age excelled in mathematics, astronomy, medicine, and geography precisely because they saw the pursuit of all knowledge as an act of worship. A learning space that includes only Islamic texts sends an incomplete message. Adding an atlas, a dictionary, science books, and art supplies tells your children: "Explore Allah's creation in all its dimensions."


**How?**

1. **Build a well-rounded collection:**
   - **Reference:** A good dictionary, a thesaurus, and a world atlas
   - **Science:** Age-appropriate books on biology, astronomy, chemistry, and the natural world
   - **History:** World history, Islamic civilisation, and biographies of great thinkers
   - **Creative:** Art supplies (coloured pencils, sketchbooks, watercolours), calligraphy sets, craft materials
2. **Match resources to your children's ages and interests** — a 6-year-old needs picture-rich science books; a 14-year-old needs more depth.
3. **Include hands-on materials** — a globe, a magnifying glass, a basic microscope, or a telescope can transform passive reading into active exploration.
4. **Connect secular resources to Islamic worldview** — when reading about the solar system, discuss how the Quran references the orbits of celestial bodies. Knowledge becomes worship when connected to its Source.
5. **Update annually** — children's interests and reading levels change rapidly. Refresh the collection each year.` },
        { title: 'Make it comfortable — good lighting, a small desk or floor cushions, minimal distractions', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (peace be upon him) said: \"Whoever takes a path in search of knowledge, Allah will ease for him a path to Paradise.\" Making the learning space comfortable -- good lighting, a small desk or floor cushions, minimal distractions -- removes barriers to seeking knowledge.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A learning space that is uncomfortable will not be used. If the lighting is poor, the seating is hard, or the area is noisy, family members will gravitate to sofas and screens instead. Comfort is not luxury — it is a practical requirement for sustained reading and study. The scholars of the past sat in circles on cushions for hours because the environment supported focus. Your home learning space should do the same.


**How?**

1. **Prioritise lighting** — position the space near a window for natural light. Add a warm-toned desk lamp or reading light for evening use. Avoid harsh overhead fluorescents.
2. **Choose appropriate seating:**
   - A comfortable chair with back support for desk work
   - Floor cushions or a bean bag for casual reading
   - A small rug or mat to define the space
3. **Provide a flat surface** — a small desk, a lap desk, or even a sturdy tray for writing, colouring, and note-taking.
4. **Eliminate distractions** — no TV in the learning area, no toys scattered nearby, and ideally no direct line of sight to high-traffic areas.
5. **Add personal touches** — let each family member keep a bookmark, a favourite pen, or a personal journal in the space. Ownership encourages use.` },
        { title: 'Rotate featured books monthly and discuss what the family is reading', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 20:114",
              arabic: "وَقُل رَّبِّ زِدْنِي عِلْمًا",
              translation: "And say: My Lord, increase me in knowledge. Rotating books and discussing them as a family cultivates a culture of continuous learning.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A static bookshelf becomes invisible over time — the same spines facing out every day stop catching the eye. Rotating featured books keeps the learning space dynamic and sparks new curiosity. More importantly, discussing what each family member is reading creates a culture of intellectual exchange within the home. The Quran commands reflection (tadabbur), and family book discussions are one of the most natural ways to practise it together.


**How?**

1. **Designate a "Book of the Month" display** — a small stand, a face-out shelf position, or a dedicated spot on the desk where the current featured book is prominently placed.
2. **Rotate by theme or occasion:**
   - Ramadan → a book on fasting or the Quran
   - Start of school year → a book on seeking knowledge
   - A family member's interest → a book they recommend
3. **Hold a monthly family book discussion** — even 15 minutes over dinner: "What are you reading? What did you learn? What surprised you?"
4. **Let children curate** — give a child the responsibility of choosing the featured book one month. This builds ownership and excitement.
5. **Track what the family has read** — keep a simple list or journal of books discussed. Over a year, you will see the breadth of knowledge your family has engaged with — and that is a powerful motivation to continue.` },
      ],
    },
    {
      title: 'Host a monthly gathering for friends, neighbours, or community — practise the Sunnah of hospitality',
      priority: 'medium', tags: ['home', 'hospitality'],
      description: 'Hospitality (diyafah) is a prophetic practice and a right of the neighbour in Islam.',
      subtasks: [
        { title: 'Choose a monthly date and format — dinner, dessert, or tea and conversation', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6019",
              translation: "The Prophet (peace be upon him) said: \"Whoever believes in Allah and the Last Day, let him be generous to his guest.\" Hosting monthly gatherings is a regular practice of the Sunnah of hospitality.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Good intentions without a schedule produce nothing. Many Muslims value hospitality in theory but rarely practise it because they never commit to a specific date and format. By choosing a fixed monthly slot and a consistent format, you transform hospitality from an occasional aspiration into a regular, sustainable practice. The Prophet (peace be upon him) hosted guests frequently — not because he had abundant resources, but because he made it a priority.


**How?**

1. **Pick a fixed day** — e.g., the first Saturday of every month, or every third Friday. Consistency allows guests to plan ahead and builds anticipation.
2. **Choose a sustainable format:**
   - **Full dinner** — if your family enjoys cooking and has the space
   - **Dessert and tea** — lower effort, still warm and generous
   - **Brunch** — a weekend morning gathering, especially good for families with young children
   - **Potluck** — each family brings a dish, reducing the hosting burden
3. **Start small** — invite 1-2 families or 3-4 individuals for the first gathering. You can scale up as the routine develops.
4. **Block the date in your calendar** — treat it as a non-negotiable appointment, not something you schedule "if nothing else comes up."
5. **Communicate early** — send invitations at least 2 weeks in advance so guests can plan.` },
        { title: 'Invite a mix of friends, neighbours, and new community members each time', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6019",
              translation: "The Prophet (peace be upon him) said: \"Whoever believes in Allah and the Last Day, let him be generous to his guest.\" Inviting a mix of friends, neighbours, and new community members each time expands the circle of hospitality. **II. Quran**",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 51:26-27",
              arabic: "فَرَاغَ إِلَىٰ أَهْلِهِ فَجَاءَ بِعِجْلٍ سَمِينٍ فَقَرَّبَهُ إِلَيْهِمْ",
              translation: "Then he went to his family and came with a fat roasted calf and placed it before them. Ibrahim's hospitality to his guests is the Quranic model for generosity.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

 Hospitality that only serves your existing friend circle misses the broader Sunnah of building community, welcoming newcomers, and strengthening the bonds between Muslims who might otherwise remain strangers. A diverse guest list also exposes your family to different perspectives, cultures, and life experiences.

**How?**

1. **Maintain a guest list** — keep a running list of people you want to invite, organised by category: close friends, neighbours, mosque acquaintances, new community members, colleagues.
2. **Mix the categories each month** — invite at least one person or family who is new to your home each time. This prevents the gathering from becoming a closed circle.
3. **Prioritise the isolated** — new Muslims, recent immigrants, single parents, and elderly community members who may not receive many invitations. These are the people for whom your hospitality carries the greatest impact.
4. **Ask your guests to bring a friend** — this naturally diversifies the group and introduces you to people outside your usual network.
5. **Keep a "hosted" log** — track who has been invited and when, so no one is consistently overlooked.` },
        { title: 'Prepare food generously — the Sunnah is to cook extra, not to calculate portions exactly', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2052",
              translation: "The Prophet (peace be upon him) said: \"The food of one person is sufficient for two, and the food of two is sufficient for four, and the food of four is sufficient for eight.\" Cooking generously follows the Prophetic model of abundance in hospitality.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

 Calculating exact portions for your guests communicates scarcity and reluctance; cooking extra communicates abundance and welcome. Leftovers can be shared with neighbours, given as sadaqah, or eaten the next day — food prepared with the intention of generosity is never wasted.

**How?**

1. **Cook more than you think you need** — a good rule is to prepare for 1.5 times the number of guests. This ensures abundance without absurd excess.
2. **Choose dishes that scale well** — biryani, stews, soups, pasta bakes, and rice dishes are easier to make in large quantities than individually plated meals.
3. **Prepare in advance** — cook the main dish the day before if possible, so the day of the gathering is about setting up and welcoming guests, not frantic cooking.
4. **Present food beautifully** — generosity is not just about quantity. A well-presented table with garnishes, fresh bread, and attractive serving dishes honours your guests.
5. **Send guests home with food** — pack leftovers for guests to take home. This is a beloved Sunnah and leaves a lasting impression of your generosity.` },
        { title: 'Include children in hosting duties — greeting guests, serving food, cleaning up', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 893",
              translation: "The Prophet (peace be upon him) said: \"Each of you is a shepherd, and each of you is responsible for his flock.\" Including children in hosting duties -- greeting guests, serving food, cleaning up -- trains them in the Sunnah of hospitality from a young age.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Children who participate in hosting learn generosity, social skills, and service — qualities that no textbook can teach with the same depth as lived experience. When a child greets a guest at the door, serves tea, or helps clear the table, they are practising the Sunnah in real time. This also prevents children from seeing guests as an interruption to their routine and instead frames hospitality as a family activity in which everyone has a role.


**How?**

1. **Assign age-appropriate roles:**
   - **Ages 3-5:** Say salaam to guests, hand out sweets, put shoes in order
   - **Ages 6-9:** Help set the table, pour water, pass dishes, collect plates
   - **Ages 10-13:** Assist with cooking, serve food, help with clean-up, engage in conversation
   - **Ages 14+:** Co-host — help plan the menu, prepare dishes, lead a conversation topic
2. **Brief children before guests arrive** — explain who is coming, what the evening looks like, and what their role is. Preparation reduces anxiety.
3. **Praise publicly** — when a child does well, acknowledge them in front of the guests: "Yusuf prepared the dessert tonight." This builds confidence.
4. **Debrief after** — ask children: "What did you enjoy? What was hard? What would you do differently?" This cements the learning.
5. **Frame it Islamically** — remind them: "The Prophet (peace be upon him) loved generous hosts. Tonight, we are following his Sunnah together."` },
        { title: 'Add a brief beneficial element — a short reminder, a Quran recitation, or a meaningful conversation starter', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 73:4",
              arabic: "**Translation:** Or add to it, and recite the Qur’ān with measured recitation.",
              translation: "Or add to it, and recite the Qur’ān with measured recitation.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 38:1",
              arabic: "**Translation:** Sâd. [These letters (Sâd etc.) are one of the miracles of the Quran and none but Allah (Alone) knows their meanings]. By the Quran full of reminding.",
              translation: "Sâd. [These letters (Sâd etc.) are one of the miracles of the Quran and none but Allah (Alone) knows their meanings]. By the Quran full of reminding.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1047",
              translation: "Narrated Aisha:(the wife of the Prophet) On the day when the sun Khasafat (eclipsed) Allah's Messenger (ﷺ) prayed; he stood up and said Takbir and recited a prolonged recitation, then he performed a prolonged bowing, then he raised his head and said, \"Sami`a l-lahu Lyman Hamidah,\" and then remained standing and recited a prolonged recitation which was shorter than the first. Then he performed a prolonged bowing which was shorter than the first. Then he prostrated and prolonged the prostration and he did the same in the second rak`a as in the first and then finished the prayer with Taslim. By that time the sun (eclipse) had cleared He addressed the people and said, \"The sun and the moon are two of the signs of Allah; they do not eclipse (Yakhsifan) because of the death or the life (i.e. birth) of someone. So when you see them make haste for the prayer",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 3203",
              translation: "Narrated `Aisha:On the day of a solar eclipse, Allah's Messenger (ﷺ) stood up (to offer the eclipse prayer). He recited Takbir, recited a long recitation (of Holy Verses), bowed a long bowing, and then he raised his head saying, \"Allah hears him who sends his praises to Him.\" Then he stayed standing, recited a long recitation again, but shorter than the former, bowed a long bowing, but shorter than the first, performed a long prostration and then performed the second rak`a in the same way as he had done the first. By the time he had finished his prayer with Taslim, the solar eclipse had been over. Then he addressed the people referring to the solar and lunar eclipses saying, \"These are two signs amongst the Signs of Allah, and they do not eclipse because of anyone's death or life. So, if you see them, hasten for the Prayer",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A gathering without any remembrance of Allah is described in hadith as one that the participants will regret on the Day of Judgement. Adding a brief beneficial element — even just 5 minutes — transforms a social evening into an act of worship. It does not need to be a formal lecture or feel forced. A single ayah, a short story from the Seerah, or a meaningful conversation starter can elevate the entire gathering and leave guests feeling spiritually nourished, not just fed.


**How?**

1. **Keep it short and natural** — 5-10 minutes maximum. The gathering is social; the reminder is a seasoning, not the main course.
2. **Choose from a variety of formats:**
   - A brief Quran recitation with translation
   - A 3-minute story from the life of the Prophet or the Sahabah
   - A meaningful conversation starter: "What is one thing you are grateful for this month?"
   - A hadith shared and briefly discussed
3. **Rotate the role** — ask a different guest each month to share something brief. This distributes the responsibility and introduces diverse perspectives.
4. **Time it well** — the best moment is usually after the meal, when everyone is relaxed and seated. Do not open with it or save it for when people are leaving.
5. **End with du'a** — close the beneficial element with a short collective du'a. This seals the gathering with barakah.` },
      ],
    },
  ],

  family_home_excellence: [
    {
      title: 'Transform the home into a community hub — regular halaqah, iftar gatherings, or skills workshops',
      priority: 'low', tags: ['home', 'community'],
      description: 'The homes of the Sahabah were centres of learning, worship, and community support.',
      subtasks: [
        { title: 'Identify a recurring programme — weekly halaqah, monthly iftar, or quarterly workshop', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 780",
              translation: "The Prophet (peace be upon him) said: \"Do not turn your houses into graves.\" Transforming the home into a community hub through halaqahs and gatherings brings life and barakah to the household.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The home of Arqam ibn Abi al-Arqam was the first Islamic learning centre — a private house that became the birthplace of the Muslim community. When your home hosts regular programmes, it transcends its function as a private dwelling and becomes a source of communal benefit. This is sadaqah jariyah — ongoing charity — because every person who learns, prays, or connects in your home carries that benefit forward. Choosing a recurring format ensures sustainability and builds a community rhythm.


**How?**

1. **Assess your capacity honestly:**
   - **Weekly halaqah** — requires consistent availability, a teacher or knowledgeable facilitator, and space for 5-15 people
   - **Monthly iftar** — requires cooking capacity and space, most impactful during Ramadan but valuable year-round
   - **Quarterly workshop** — lower frequency, higher preparation; could be a skills workshop (financial literacy, parenting, first aid) or Islamic course
2. **Start with what matches your strengths** — if you love cooking, start with iftars. If you are knowledgeable, start with a halaqah. If you have professional skills, offer workshops.
3. **Set the schedule for the next 6 months** — commit to specific dates. Vague plans produce vague results.
4. **Test with a pilot** — host the first session as a trial. Gather feedback and adjust before committing long-term.
5. **Build a core group** — identify 3-5 people who will attend consistently. A reliable core group ensures the programme survives occasional low turnout.` },
        { title: 'Partner with a knowledgeable person — imam, teacher, or skilled community member — to lead sessions', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (peace be upon him) said: \"Whoever takes a path in search of knowledge, Allah will ease for him a path to Paradise.\" Partnering with a knowledgeable person -- imam, teacher, or skilled community member -- to lead sessions ensures the programme has substance.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Hosting a programme is an act of service; leading it requires competence. The Quran warns against speaking about the deen without knowledge (7:33). Partnering with a qualified teacher, imam, or skilled professional ensures that the content shared in your home is accurate, beneficial, and authoritative. This also distributes the workload — you manage the logistics and hospitality while the partner delivers the content.


**How?**

1. **Identify potential partners:**
   - Your local imam or mosque scholar
   - A qualified Islamic studies teacher or student of knowledge
   - A community member with professional expertise (for skills workshops — e.g., a financial adviser for halal investing, a doctor for health workshops)
2. **Approach them with a clear proposal** — explain the format, frequency, audience, and your role as host. People are more likely to commit when the ask is specific.
3. **Discuss compensation** — some teachers volunteer; others may appreciate an honorarium, a meal, or a gift. Clarify this upfront to avoid awkwardness.
4. **Plan the curriculum together** — a halaqah benefits from a structured syllabus (e.g., a book to study over 10 sessions) rather than ad hoc topics.
5. **Support them logistically** — ensure they have everything they need: a whiteboard, audio equipment, handouts, or digital projector. Your job is to make their job easy.` },
        { title: 'Set up the space to accommodate groups comfortably — seating, audio, and refreshments', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6019",
              translation: "The Prophet (peace be upon him) said: \"Whoever believes in Allah and the Last Day, let him be generous to his guest.\" Preparing the space comfortably for gatherings is an expression of generous hospitality.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The physical environment determines whether people return. A cramped, uncomfortable, poorly lit space with no refreshments will kill even the best programme after a few sessions. The Prophet (peace be upon him) ensured his gatherings were welcoming — people sat comfortably, water was offered, and the atmosphere was one of ease. Investing effort in the setup is an investment in the programme's longevity and impact.


**How?**

1. **Assess your maximum capacity** — how many people can sit comfortably in your gathering space? Do not exceed this number.
2. **Arrange seating thoughtfully:**
   - Floor cushions in a circle for intimate halaqah settings
   - Chairs arranged in rows for larger gatherings
   - Ensure the speaker/teacher is visible and audible to everyone
3. **Address audio** — if the group exceeds 10 people, consider a simple portable speaker or microphone so the speaker does not have to strain their voice.
4. **Prepare refreshments** — at minimum, water and tea. Light snacks or a full meal elevate the experience. Prepare refreshments in advance so you are present during the session, not in the kitchen.
5. **Consider practical details:**
   - Shoe storage at the entrance
   - Clear directions to the bathroom
   - A clean, welcoming entrance area
   - Temperature control (heating or fans depending on the season)` },
        { title: 'Promote the programme through your mosque, community group, or social circle', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:104",
              arabic: "وَلْتَكُن مِّنكُمْ أُمَّةٌ يَدْعُونَ إِلَى الْخَيْرِ وَيَأْمُرُونَ بِالْمَعْرُوفِ",
              translation: "And let there be from you a nation inviting to good, enjoining what is right. Promoting the programme through your mosque, community group, or social circle fulfils the collective obligation of da'wah.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The best programme in the world serves no one if no one knows about it. Promotion is not self-aggrandisement — it is an extension of da'wah and community building. The Prophet (peace be upon him) actively invited people to gatherings of knowledge. Sharing your programme through the mosque, community networks, and social circles ensures it reaches those who need it most, including people who may be isolated or searching for exactly this kind of spiritual community.


**How?**

1. **Start with your mosque** — ask the imam to announce it after Jumu'ah or include it in the mosque newsletter/WhatsApp group.
2. **Use community WhatsApp groups** — most Muslim communities have active group chats. Post a clear, concise invitation with date, time, location, topic, and RSVP details.
3. **Create a simple flyer** — a well-designed image (use Canva or a similar tool) with all key details. Share digitally and print a few for the mosque noticeboard.
4. **Leverage word of mouth** — personally invite 5-10 people and ask each to bring one friend. Personal invitations are far more effective than broadcast messages.
5. **Be consistent in promotion** — promote every session, not just the first one. People forget, and new community members need to discover the programme over time.` },
        { title: 'Involve your family in planning and hosting so it becomes a shared family mission', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:104",
              arabic: "وَلْتَكُن مِّنكُمْ أُمَّةٌ يَدْعُونَ إِلَى الْخَيْرِ وَيَأْمُرُونَ بِالْمَعْرُوفِ",
              translation: "And let there be from you a nation inviting to good, enjoining what is right. Making community hosting a shared family mission fulfils this collective obligation.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A programme that depends on one person is fragile; a programme that is a family mission is resilient. When your spouse and children are involved in planning, preparing, and hosting, they develop a sense of ownership and pride in the home's role as a community hub. Children who grow up seeing their home serve the ummah internalise generosity and community responsibility as core values. This is legacy-building: your family's identity becomes intertwined with service.


**How?**

1. **Hold a family planning meeting** — before each session, discuss: menu, seating arrangement, who greets guests, who serves, who helps clean up.
2. **Assign roles by strength and age:**
   - Spouse → co-hosts, manages refreshments, or co-facilitates
   - Older children → help set up, serve guests, manage audio/tech
   - Younger children → greet guests, distribute handouts or snacks
3. **Debrief as a family after each event** — what went well? What could improve? What did each person enjoy?
4. **Share the credit** — when guests compliment the gathering, acknowledge your family's contributions publicly: "My daughter prepared the dessert" or "My son set up the seating."
5. **Connect it to purpose** — regularly remind your family: "Our home is a gift from Allah, and sharing it with others is how we show gratitude. This is our family's contribution to the ummah."` },
      ],
    },
    {
      title: 'Design a home environment intentionally — every room serves a purposeful, value-aligned function',
      priority: 'low', tags: ['home', 'design'],
      description: 'An intentionally designed home is not about luxury — it is about alignment.',
      subtasks: [
        { title: 'Walk through each room and define its primary purpose — prayer, study, rest, gathering, etc.', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2107",
              translation: "The Prophet (peace be upon him) said: \"Indeed, Allah is beautiful and loves beauty.\" Walking through each room and defining its primary purpose -- prayer, study, rest, gathering -- is an act of intentional design aligned with Islamic values.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Most homes evolve haphazardly — a room becomes a dumping ground, a study doubles as a storage closet, and no space truly serves its intended purpose well. Intentional design begins with clarity of purpose. When every room has a defined function, the home becomes more efficient, more peaceful, and more aligned with your family's values. This is the Islamic principle of niyyah (intention) applied to physical space — every area of the home exists for a reason.


**How?**

1. **Create a room-by-room inventory** — list every room, including hallways, the entrance, and outdoor spaces.
2. **Define the primary purpose of each:**
   - Living room → family gathering, conversation, and guest hosting
   - Prayer room/corner → salah, Quran recitation, dhikr
   - Study/learning space → reading, homework, Islamic study
   - Kitchen → cooking, family meals, teaching children life skills
   - Bedrooms → rest, personal du'a, and private reflection
   - Entrance → welcoming guests, transition from outside to inside
3. **Identify conflicts** — does any room serve two contradictory purposes? (e.g., a bedroom that is also the TV room, or a prayer space that doubles as storage)
4. **Note what is missing** — is there a purpose your family values (prayer, learning, hospitality) that has no dedicated space?
5. **Write it down** — create a simple "Room Purpose Map" that you can reference when making design decisions.` },
        { title: 'Remove anything that contradicts the room\'s purpose — e.g., no screens in the prayer space', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 780",
              translation: "The Prophet (peace be upon him) said: \"Do not turn your houses into graves.\" Removing anything that contradicts a room's purpose -- e.g., no screens in the prayer space -- ensures each space serves its intended function.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A room filled with items that contradict its purpose creates cognitive dissonance and undermines its function. A prayer space with a television in it subtly competes for your attention. A study with piles of laundry signals that learning is not a priority. Removing contradictions is not about rigid rules — it is about ensuring that each space supports the activity it was designed for. When the environment aligns with the intention, the activity flows naturally.


**How?**

1. **Revisit your Room Purpose Map** — for each room, list every item currently in it.
2. **Evaluate each item against the room's purpose:**
   - Does this item support the room's primary function? → Keep
   - Is it neutral (neither helps nor hinders)? → Consider relocating
   - Does it actively contradict the purpose? → Remove immediately
3. **Common contradictions to address:**
   - **Prayer space:** TV, phone charging station, children's toys
   - **Study/learning area:** Gaming console, snack storage, clutter
   - **Bedroom:** Desk with work materials (if the purpose is rest), screens
   - **Kitchen:** Piles of non-kitchen items, paperwork, electronics
4. **Relocate, do not just remove** — find the right home for displaced items. If there is no right home, it may be time to donate or dispose of them.
5. **Enforce the standard** — once a room is aligned, make it a household rule that items belonging elsewhere are returned immediately, not left to accumulate.` },
        { title: 'Optimise each room for its function — lighting, furniture placement, accessibility', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2107",
              translation: "The Prophet (peace be upon him) said: \"Indeed, Allah is beautiful and loves beauty.\" Optimising each room for its function with intention reflects ihsan in one's living environment.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Defining a room's purpose is the strategy; optimising it is the execution. A prayer room with poor lighting and a hard floor discourages long worship. A study with a desk facing a window full of distractions undermines focus. Optimisation means adjusting the physical elements — lighting, furniture placement, temperature, and accessibility — so the room actively facilitates its intended function. This is itqan (excellence) applied to the home environment.


**How?**

1. **Assess each room against its function:**
   - **Prayer space:** Soft lighting, clean carpet or mat, qibla clearly marked, minimal visual distractions, pleasant scent
   - **Study:** Bright task lighting, desk facing a wall (not a window), bookshelves within arm's reach, no screens unrelated to study
   - **Living/gathering room:** Comfortable seating arranged for conversation (not all facing a TV), warm lighting, accessible refreshment area
   - **Kitchen:** Clear counter space for cooking, organised storage, good ventilation
   - **Bedrooms:** Blackout curtains for rest, minimal electronics, comfortable bedding
2. **Rearrange furniture** — sometimes moving a desk or sofa by a metre transforms the room's functionality. Experiment before investing in new items.
3. **Address lighting** — replace harsh overhead lights with warm-toned bulbs, add task lamps where focused work happens, and maximise natural light during the day.
4. **Improve accessibility** — ensure frequently used items are within easy reach, pathways are clear, and the room is comfortable for all family members.
5. **Test and iterate** — live with the changes for a week, then adjust. Optimisation is an ongoing process, not a one-time project.` },
        { title: 'Create a "home design principles" document — the values each space should embody', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 28:77",
              arabic: "وَأَحْسِن كَمَا أَحْسَنَ اللَّهُ إِلَيْكَ",
              translation: "And do good as Allah has done good to you. Creating a home design principles document -- the values each space should embody -- is an act of ihsan (excellence) in one's living environment.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Without written principles, home design decisions are made ad hoc — driven by sales, trends, or impulse rather than values. A "home design principles" document codifies your family's aesthetic and spiritual standards so that every future purchase, renovation, or rearrangement is guided by a consistent vision. It is the equivalent of a brand style guide for a business — it prevents drift and ensures coherence over time.


**How?**

1. **Start with 3-5 core principles** — these should reflect your family's values and Islamic priorities. Examples:
   - "Every room must support worship, learning, or family connection"
   - "Simplicity over excess — we choose fewer, better items"
   - "Natural materials and light are preferred over synthetic and artificial"
   - "Islamic art and calligraphy are the primary visual elements"
   - "Comfort serves function — we invest in what supports daily life"
2. **Add room-specific guidelines** — under each principle, note how it applies to specific rooms (e.g., "The prayer space embodies simplicity — nothing on the walls except a qibla marker and calligraphy").
3. **Include "do not" rules** — e.g., "No screens in the prayer space," "No brand logos displayed as decor," "No furniture that blocks natural light."
4. **Keep it concise** — one page is ideal. This is a reference, not an essay.
5. **Share it with the family** — discuss it together and get buy-in. Post it inside a cupboard door or keep it in a family shared folder for reference before purchases.` },
        { title: 'Revisit the design annually as your family\'s needs evolve', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 13:11",
              arabic: "إِنَّ اللَّهَ لَا يُغَيِّرُ مَا بِقَوْمٍ حَتَّىٰ يُغَيِّرُوا مَا بِأَنفُسِهِمْ",
              translation: "Indeed, Allah will not change the condition of a people until they change what is in themselves. Revisiting home design annually as needs evolve is an act of intentional self-improvement.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A home that served a couple perfectly will not suit a family of five without adaptation. Children grow, needs change, and what worked last year may create friction this year. An annual design review ensures the home evolves alongside the family rather than becoming a source of frustration. It is also an opportunity to assess whether the home's spiritual and aesthetic standards are being maintained or have slipped over time.


**How?**

1. **Schedule an annual review** — align it with a meaningful date: the start of the Islamic year, the family's anniversary of moving in, or a seasonal change.
2. **Walk through the home together** — as a couple or as a family, revisit each room with fresh eyes. Ask:
   - Is this room still serving its intended purpose?
   - Has clutter crept in?
   - Are there new needs that are not being met (e.g., a toddler needs a play area, a teenager needs a study desk)?
3. **Review the design principles document** — are the principles still relevant? Do any need updating?
4. **Create an action list** — prioritise 3-5 changes for the coming year. Do not attempt to overhaul the entire home at once.
5. **Budget for improvements** — set aside a small annual budget for home optimisation. Even modest investments (a new bookshelf, better lighting, a piece of calligraphy) make a meaningful difference over time.` },
      ],
    },
    {
      title: 'Document a "Home Charter" — written values, routines, and vision for what your household stands for',
      priority: 'low', tags: ['home', 'legacy'],
      description: 'A Home Charter is a written constitution for your household.',
      subtasks: [
        { title: 'Gather the family and discuss: "What do we want our home to be known for?"', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 66:6",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا قُوا أَنفُسَكُمْ وَأَهْلِيكُمْ نَارًا",
              translation: "O you who have believed, protect yourselves and your families from a Fire. Gathering the family to discuss \"What do we want our home to be known for?\" begins the process of intentional household stewardship.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A home without a shared vision drifts — each family member pursues their own priorities, and the household becomes a collection of individuals sharing a roof rather than a united family with a common mission. This conversation is the foundation of the Home Charter. It surfaces what each person values, reveals shared aspirations, and creates the emotional buy-in necessary for a written document to have real authority. The Quran describes the believing household as one built on taqwa — and taqwa requires intentionality.


**How?**

1. **Set aside dedicated time** — this is not a dinner-table aside. Block 1-2 hours on a weekend. Make it feel significant.
2. **Create a welcoming atmosphere** — sit together comfortably, serve snacks or tea, and open with a brief du'a for guidance.
3. **Ask the central question:** "If someone visited our home for a week, what would they say we stand for?"
4. **Let everyone speak** — go around the circle. Write every response on a large piece of paper or whiteboard. No editing or critiquing during this phase.
5. **Look for themes** — after everyone has spoken, group similar ideas together. You will likely see clusters around worship, learning, hospitality, respect, and love.
6. **Summarise the themes** — read them back to the family: "It sounds like our home stands for [theme 1], [theme 2], and [theme 3]. Does that feel right?"
7. **Save the raw notes** — they become the foundation for drafting the charter.` },
        { title: 'Draft sections on core values, daily routines, hospitality standards, and media rules', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 66:6",
              arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا قُوا أَنفُسَكُمْ وَأَهْلِيكُمْ نَارًا",
              translation: "O you who have believed, protect yourselves and your families from a Fire. A Home Charter with documented values and routines is a structured means of protecting the family.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A charter without structure is a wish list. Organising the family's values into clear sections — core values, daily routines, hospitality standards, and media rules — transforms aspirations into a practical governance document. Each section addresses a different dimension of home life, ensuring that the charter covers not just what the family believes but how those beliefs are practised daily. This is the difference between a poster on the wall and a living constitution.


**How?**

1. **Core Values section** — distil the family discussion into 3-5 non-negotiable values. Examples:
   - "We worship Allah together and individually, every day"
   - "We speak to each other with kindness, even in disagreement"
   - "We pursue knowledge as a family obligation"
2. **Daily Routines section** — document the household's key rhythms:
   - Morning adhkar and Fajr routine
   - Screen time boundaries
   - Mealtime expectations (eating together, beginning with Bismillah)
   - Bedtime routine and du'as
3. **Hospitality Standards section** — how guests are welcomed, hosted, and seen off. Include specific expectations (e.g., "We always offer food within 10 minutes of a guest arriving").
4. **Media Rules section** — the family media policy distilled into clear, enforceable statements.
5. **Write in accessible language** — the charter should be understandable by every family member, including children. Use short sentences and clear terms.` },
        { title: 'Include an Islamic mission statement — e.g., "This home is a sanctuary of iman, ilm, and ihsan"', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 98:7",
              arabic: "إِنَّ الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ أُولَٰئِكَ هُمْ خَيْرُ الْبَرِيَّةِ",
              translation: "Those who believe and do good deeds are the best of creation. *(Abdel Haleem)* *The mission statement anchors the household to this Quranic standard — iman expressed through righteous deeds. Naming this aspiration for the home makes it a lived intention, not merely a private hope.*",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1",
              translation: "Umar ibn al-Khattab (may Allah be pleased with him) reported: The Prophet (peace be upon him) said, \"Actions are but by intentions, and every person will have only what they intended.\" *Establishing a household mission statement is an act of collective niyyah (intention). The Prophet's foundational hadith affirms that the outcome of any deed is shaped by the intention behind it — setting an Islamic intention for the home directs all that happens within it.*",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A mission statement crystallises the family's identity into a single, memorable declaration. It is the sentence your children will carry in their hearts when they leave home, the phrase you will return to during difficult seasons, and the standard against which all household decisions can be measured. The best Islamic mission statements are rooted in Quranic or prophetic concepts and express both what the home is and what it aspires to be.


**How?**

1. **Review the core values** — the mission statement should encapsulate them in one or two sentences.
2. **Use Islamic concepts as anchors:**
   - **Iman** (faith) — the spiritual foundation
   - **Ilm** (knowledge) — the intellectual commitment
   - **Ihsan** (excellence/beauty) — the standard of conduct
   - **Amanah** (trust) — the sense of stewardship
   - **Rahmah** (mercy) — the emotional tone
3. **Draft 3-5 options** — write several versions and read them aloud. The right one will resonate immediately.
4. **Test it** — ask: "Does this statement describe the home we are building? Would we be proud if this was inscribed above our door?"
5. **Examples for inspiration:**
   - "This home is a sanctuary of iman, ilm, and ihsan"
   - "We are a household built on taqwa, bound by rahmah, and committed to service"
   - "In this home, we worship Allah, honour each other, and serve the ummah"
6. **Choose one** — the family votes or reaches consensus. This becomes the charter's headline.` },
        { title: 'Have each family member sign or contribute a personal statement to the charter', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 42:38",
              arabic: "وَأَمْرُهُمْ شُورَىٰ بَيْنَهُمْ",
              translation: "And whose affair is determined by consultation among themselves. Having each family member sign or contribute a personal statement to the charter ensures shared ownership through shura.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A charter that is written by one person and presented to the family is a decree. A charter that every family member signs and contributes to is a covenant. The act of signing transforms the document from paper into a personal commitment. Personal statements allow each family member to express what the home means to them individually, creating a beautiful mosaic of perspectives united under shared values. For children, signing a family document is a formative experience of belonging and responsibility.


**How?**

1. **Present the drafted charter** — read it aloud as a family. Allow questions and final adjustments.
2. **Invite personal statements** — ask each family member to write 1-3 sentences about what they personally commit to or what the home means to them. Examples:
   - A child: "I promise to always say salaam when I come home"
   - A teenager: "I will keep my room clean and help with cooking once a week"
   - A parent: "I commit to making this home a place of peace and learning"
3. **Add these statements to the charter** — they can be an appendix or a dedicated section titled "Personal Commitments."
4. **Sign ceremonially** — make it a moment. Use a nice pen, gather around the table, and let each person sign while the family watches.
5. **For very young children** — let them draw a picture or place a handprint. Their "signature" evolves as they grow, and the early ones become cherished memories.` },
        { title: 'Display the charter prominently and revisit it at the start of each Islamic year', done: false,
          sources: [
            {
              kind: "quran",
              ref: "Quran 25:74",
              arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ",
              translation: "Our Lord, grant us from among our wives and offspring comfort to our eyes. Displaying the charter prominently and revisiting it at the start of each Islamic year keeps the family aligned with its shared vision.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A charter stored in a drawer is a dead document. Displaying it prominently keeps it alive — a daily visual reminder of who the family is and what they stand for. Revisiting it annually prevents it from becoming stale and ensures it evolves with the family. The start of the Islamic year (1 Muharram) is a natural moment for renewal, reflection, and recommitment — aligning the charter review with this date gives it spiritual weight and a sense of cyclical purpose.


**How?**

1. **Frame the charter beautifully** — this is a document of honour. Invest in a quality frame, or have it printed in an attractive format. Calligraphy-style fonts add gravitas.
2. **Choose a prominent location** — the living room, the entrance hallway, or near the family dining area. It should be somewhere every family member passes daily.
3. **Schedule the annual review** — add "Home Charter Review" to your calendar on 1 Muharram (or the nearest weekend).
4. **Annual review process:**
   - Read the charter aloud together
   - Discuss: "Did we live up to this? Where did we fall short?"
   - Update any sections that need revision
   - Renew personal commitments (especially as children grow)
   - Re-sign or add a new date of recommitment
5. **Celebrate the renewal** — pair the review with a special family meal or activity. This builds positive associations and makes the charter feel like a living tradition, not an obligation.` },
        { title: 'Update it as children grow and family circumstances change', done: false,
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6464",
              translation: "The Prophet (peace be upon him) said: \"The most beloved deeds to Allah are those that are done consistently, even if they are small.\" Updating the Home Charter as children grow and family circumstances change ensures it remains a living document.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A charter that does not evolve becomes irrelevant. A family with toddlers has different needs, routines, and rules than a family with teenagers. Marriage dynamics shift, financial circumstances change, and children's capacities grow. If the charter remains frozen in the moment it was written, family members will outgrow it and dismiss it. Regular updates keep the charter authoritative and relevant — a living document that grows with the family it serves.


**How?**

1. **Identify triggers for updates:**
   - A child enters a new life stage (starting school, reaching puberty, leaving home)
   - A significant family change (new baby, a move, a career shift, a loss)
   - A rule that is consistently broken or no longer makes sense
   - New challenges emerge (a child starts secondary school, a family member has a health issue)
2. **Hold a focused revision session** — do not rewrite the entire charter each time. Identify the specific sections that need updating and address them.
3. **Preserve the original** — keep previous versions of the charter (dated) as a family archive. Looking back on how the charter evolved over the years becomes a beautiful record of your family's journey.
4. **Involve the relevant family members** — if a change primarily affects teenagers, ensure they are part of the revision process. If it affects the couple, discuss it privately first.
5. **Re-sign and re-display** — after any significant update, go through the signing ritual again. This reinforces the charter's authority and the family's collective commitment to it.` },
      ],
    },
  ],
};
