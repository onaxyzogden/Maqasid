// Seed tasks for Life pillar submodules (Hifz al-Nafs).
// Each submodule has tasks across CORE, GROWTH, and EXCELLENCE boards.
// Tasks are placed in the "To Do" column by default.

export const HEALTH_SEED_TASKS = {
  // â”€â”€ PHYSICAL HEALTH â”€â”€
  health_physical_core: [
    {
      title: 'Audit your diet â€” eliminate haram and doubtful (mashbuh) consumables',
      priority: 'urgent', tags: ['diet', 'halal'],
      description: 'Conduct a thorough review of everything you consume â€” food, drink, supplements, and medications â€” to ensure nothing haram or doubtful enters your body.',
      subtasks: [
        { title: 'List all regularly consumed foods, drinks, and supplements', done: false,
          tier: 'T2',
          amanahRationale: 'While the provided text explicitly commands mankind to eat only what is lawful and good, it omits specific modern practical steps like taking an inventory of pantry items or using spreadsheets, providing a clear logical inference to systematically list and audit consumed foods to ensure they meet this divine standard.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:168",
              arabic: "ÙŠÙŽØ§ Ø£ÙŽÙŠÙÙ‘Ù‡ÙŽØ§ Ø§Ù„Ù†ÙŽÙ‘Ø§Ø³Ù ÙƒÙÙ„ÙÙˆØ§ Ù…ÙÙ…ÙŽÙ‘Ø§ ÙÙÙŠ Ø§Ù„Ù’Ø£ÙŽØ±Ù’Ø¶Ù Ø­ÙŽÙ„ÙŽØ§Ù„Ù‹Ø§ Ø·ÙŽÙŠÙÙ‘Ø¨Ù‹Ø§ ÙˆÙŽÙ„ÙŽØ§ ØªÙŽØªÙŽÙ‘Ø¨ÙØ¹ÙÙˆØ§ Ø®ÙØ·ÙÙˆÙŽØ§ØªÙ Ø§Ù„Ø´ÙŽÙ‘ÙŠÙ’Ø·ÙŽØ§Ù†Ù",
              translation: "O mankind, eat from whatever is on earth that is lawful and good and do not follow the footsteps of Satan.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Taking inventory is the essential first step â€” you cannot purify what you have not examined.

**How?**

Open your pantry, fridge, and supplement shelf. Write down every item you regularly consume â€” food, drinks, snacks, vitamins, and medications. Include brand names so you can research their halal certification status in the next step. A simple spreadsheet or notes app works well for this.` },
        { title: 'Research halal certification status of each brand and product', done: false,
          tier: 'T2',
          amanahRationale: 'Although the verse explicitly commands believers to consume only what is lawful (halal) and good, it does not mention modern practices like checking certification logos or using apps, making the subtask a clear logical inference to practically fulfill this divine injunction.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 5:88",
              arabic: "ÙˆÙŽÙƒÙÙ„ÙÙˆØ§ Ù…ÙÙ…ÙŽÙ‘Ø§ Ø±ÙŽØ²ÙŽÙ‚ÙŽÙƒÙÙ…Ù Ø§Ù„Ù„ÙŽÙ‘Ù‡Ù Ø­ÙŽÙ„ÙŽØ§Ù„Ù‹Ø§ Ø·ÙŽÙŠÙÙ‘Ø¨Ù‹Ø§ ÙˆÙŽØ§ØªÙŽÙ‘Ù‚ÙÙˆØ§ Ø§Ù„Ù„ÙŽÙ‘Ù‡ÙŽ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠ Ø£ÙŽÙ†ØªÙÙ… Ø¨ÙÙ‡Ù Ù…ÙØ¤Ù’Ù…ÙÙ†ÙÙˆÙ†ÙŽ",
              translation: "And eat of what Allah has provided for you which is lawful and good. And fear Allah, in whom you are believers.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Not all products labelled "halal" meet rigorous certification standards, and many everyday items contain hidden haram ingredients like gelatin, alcohol-based flavourings, or animal-derived additives. Verifying each product protects your body and your deen.


**How?**

Go through your inventory list one item at a time. Check packaging for recognised halal certification logos (IFANCA, HFA, MUI, etc.). For unlabelled items, search the manufacturer's website or contact them directly. Use apps like Halal Check or ScanHalal to speed up the process. Mark each item as halal, haram, or mashbuh (doubtful).` },
        { title: 'Identify and flag mashbuh (doubtful) items for further investigation', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources explicitly command believers to consume only what is lawful and good, they omit explicit mention of doubtful (mashbuh) items, making the subtask\'s directive to flag and investigate such items a clear logical inference necessary to ensure compliance with the divine injunction.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:168",
              arabic: "ÙŠÙŽØ§ Ø£ÙŽÙŠÙÙ‘Ù‡ÙŽØ§ Ø§Ù„Ù†ÙŽÙ‘Ø§Ø³Ù ÙƒÙÙ„ÙÙˆØ§ Ù…ÙÙ…ÙŽÙ‘Ø§ ÙÙÙŠ Ø§Ù„Ù’Ø£ÙŽØ±Ù’Ø¶Ù Ø­ÙŽÙ„ÙŽØ§Ù„Ù‹Ø§ Ø·ÙŽÙŠÙÙ‘Ø¨Ù‹Ø§ ÙˆÙŽÙ„ÙŽØ§ ØªÙŽØªÙŽÙ‘Ø¨ÙØ¹ÙÙˆØ§ Ø®ÙØ·ÙÙˆÙŽØ§ØªÙ Ø§Ù„Ø´ÙŽÙ‘ÙŠÙ’Ø·ÙŽØ§Ù†Ù",
              translation: "O mankind, eat from whatever is on earth that is lawful and good, and do not follow the footsteps of Satan.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 5:87",
              arabic: "ÙŠÙŽØ§ Ø£ÙŽÙŠÙÙ‘Ù‡ÙŽØ§ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠÙ†ÙŽ Ø¢Ù…ÙŽÙ†ÙÙˆØ§ Ù„ÙŽØ§ ØªÙØ­ÙŽØ±ÙÙ‘Ù…ÙÙˆØ§ Ø·ÙŽÙŠÙÙ‘Ø¨ÙŽØ§ØªÙ Ù…ÙŽØ§ Ø£ÙŽØ­ÙŽÙ„ÙŽÙ‘ Ø§Ù„Ù„ÙŽÙ‘Ù‡Ù Ù„ÙŽÙƒÙÙ…Ù’ ÙˆÙŽÙ„ÙŽØ§ ØªÙŽØ¹Ù’ØªÙŽØ¯ÙÙˆØ§",
              translation: "O you who have believed, do not prohibit the good things which Allah has made lawful to you and do not transgress.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 1015",
              translation: "The Prophet (SAW) said: \"O people, Allah is Good and accepts only that which is good. Allah has commanded the believers as He commanded the Messengers.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

**How?**

Review every item you marked as mashbuh in the previous step. Research the specific doubtful ingredient â€” is it plant-derived or animal-derived? Contact the manufacturer for clarification. Consult a knowledgeable scholar or halal certification body if the answer remains unclear. Until resolved, treat the item as avoidable.` },
        { title: 'Find halal-certified alternatives for any haram or doubtful items', done: false,
          tier: 'T2',
          amanahRationale: 'While the Quranic verses explicitly command believers to eat only what is lawful and good, they omit specific practical steps like finding halal-certified replacements at grocery stores or online, making the subtask a clear logical inference necessary to fulfill this divine injunction in modern daily life.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:168",
              arabic: "ÙŠÙŽØ§ Ø£ÙŽÙŠÙÙ‘Ù‡ÙŽØ§ Ø§Ù„Ù†ÙŽÙ‘Ø§Ø³Ù ÙƒÙÙ„ÙÙˆØ§ Ù…ÙÙ…ÙŽÙ‘Ø§ ÙÙÙŠ Ø§Ù„Ù’Ø£ÙŽØ±Ù’Ø¶Ù Ø­ÙŽÙ„ÙŽØ§Ù„Ù‹Ø§ Ø·ÙŽÙŠÙÙ‘Ø¨Ù‹Ø§",
              translation: "O mankind, eat from whatever is on earth that is lawful and good.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 5:88",
              arabic: "ÙˆÙŽÙƒÙÙ„ÙÙˆØ§ Ù…ÙÙ…ÙŽÙ‘Ø§ Ø±ÙŽØ²ÙŽÙ‚ÙŽÙƒÙÙ…Ù Ø§Ù„Ù„ÙŽÙ‘Ù‡Ù Ø­ÙŽÙ„ÙŽØ§Ù„Ù‹Ø§ Ø·ÙŽÙŠÙÙ‘Ø¨Ù‹Ø§ ÙˆÙŽØ§ØªÙŽÙ‘Ù‚ÙÙˆØ§ Ø§Ù„Ù„ÙŽÙ‘Ù‡ÙŽ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠ Ø£ÙŽÙ†ØªÙÙ… Ø¨ÙÙ‡Ù Ù…ÙØ¤Ù’Ù…ÙÙ†ÙÙˆÙ†ÙŽ",
              translation: "And eat of what Allah has provided for you, lawful and good, and fear Allah in whom you are believers.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Removing haram items without replacing them leads to gaps that tempt you back to old habits. Having a halal-certified alternative ready for every removed item makes the transition sustainable and enjoyable rather than restrictive.


**How?**

For each item flagged as haram or unresolved mashbuh, search for a halal-certified equivalent at your local grocery store or online halal retailers. Read reviews to find options that match your taste preferences. Stock up on the replacements before discarding the originals so there is no gap in your routine.` },
        { title: 'Update your grocery list and meal plan to reflect the audit results', done: false,
          tier: 'T3',
          amanahRationale: 'Because the provided sources focus exclusively on moderation and avoiding excess in food consumption, they offer neither clear proof nor logical inference for the subtask\'s specific qualitative directive to update grocery lists with halal alternatives, making the alignment aspirational.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 7:31",
              arabic: "ÙŠÙŽØ§ Ø¨ÙŽÙ†ÙÙŠ Ø¢Ø¯ÙŽÙ…ÙŽ Ø®ÙØ°ÙÙˆØ§ Ø²ÙÙŠÙ†ÙŽØªÙŽÙƒÙÙ…Ù’ Ø¹ÙÙ†Ø¯ÙŽ ÙƒÙÙ„ÙÙ‘ Ù…ÙŽØ³Ù’Ø¬ÙØ¯Ù ÙˆÙŽÙƒÙÙ„ÙÙˆØ§ ÙˆÙŽØ§Ø´Ù’Ø±ÙŽØ¨ÙÙˆØ§ ÙˆÙŽÙ„ÙŽØ§ ØªÙØ³Ù’Ø±ÙÙÙÙˆØ§",
              translation: "O children of Adam, take your adornment at every mosque, and eat and drink, but be not excessive.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Ibn Majah 3349",
              translation: "The Prophet (SAW) said: \"The son of Adam does not fill any vessel worse than his stomach. It is sufficient for the son of Adam to eat a few mouthfuls to keep him going.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

An audit is only as valuable as the lasting change it produces. Updating your grocery list and meal plan locks in the results of your research so that every future shopping trip automatically reinforces your commitment to tayyib living.


**How?**

Rewrite your standard grocery list, replacing any removed items with their halal alternatives. Adjust your weekly meal plan to incorporate the new ingredients. Save this as your default shopping template â€” digital lists in a notes app or grocery app make it easy to reuse each week. Review and update quarterly as new products become available.` },
      ],
    },
    {
      title: 'Establish a consistent sleep schedule of 7â€“8 hours aligned with Fajr',
      priority: 'high', tags: ['sleep', 'sunnah'],
      description: 'Design your sleep rhythm around the Prophetic pattern â€” early to bed after Isha, rising before Fajr. Consistent sleep is the single most impactful health habit, affecting mood, cognitive function, immune strength, and spiritual energy for ibadah.',
      subtasks: [
        { title: 'Calculate your ideal bedtime based on local Fajr time and 7-8 hour target', done: false,
          tier: 'T2',
          amanahRationale: 'While the provided Hadith explicitly highlights the Prophet\'s practice of sleeping early after Isha to ensure waking for Fajr, it does not mandate specific modern methods like calculating a 7-8 hour sleep target backward from Fajr, making the subtask a practical logical inference to implement this Sunnah.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 18:12",
              arabic: "Ø«ÙÙ…ÙŽÙ‘ Ø¨ÙŽØ¹ÙŽØ«Ù’Ù†ÙŽØ§Ù‡ÙÙ…Ù’ Ù„ÙÙ†ÙŽØ¹Ù’Ù„ÙŽÙ…ÙŽ Ø£ÙŽÙŠÙÙ‘ Ø§Ù„Ù’Ø­ÙØ²Ù’Ø¨ÙŽÙŠÙ’Ù†Ù Ø£ÙŽØ­Ù’ØµÙŽÙ‰Ù° Ù„ÙÙ…ÙŽØ§ Ù„ÙŽØ¨ÙØ«ÙÙˆØ§ Ø£ÙŽÙ…ÙŽØ¯Ù‹Ø§",
              translation: "Then We woke them so that We could make clear which of the two parties was better able to work out how long they had been there.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 574",
              translation: "The Prophet (SAW) disliked sleeping before Isha prayer and disliked talk after it, indicating his practice of sleeping early to rise for the night and Fajr prayers.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Without a calculated bedtime, sleep becomes reactive rather than intentional. Working backwards from Fajr ensures you wake rested for the most blessed part of the day, rather than dragging through prayer in a fog of sleep deprivation.


**How?**

Look up your local Fajr time (it shifts seasonally). Subtract 7.5 to 8 hours â€” that is your target bedtime. For example, if Fajr is at 5:30 AM, you should be asleep by 9:30-10:00 PM. Write this bedtime down and set it as a daily alarm on your phone.` },
        { title: 'Set a consistent wind-down alarm 30 minutes before bedtime', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources emphasize sleep as a divine means of rest and highlight the importance of consistency in night worship, they omit specific modern practices like setting a wind-down alarm, making the subtask a practical logical inference to achieve this intended restful consistency.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 78:9",
              arabic: "ÙˆÙŽØ¬ÙŽØ¹ÙŽÙ„Ù’Ù†ÙŽØ§ Ù†ÙŽÙˆÙ’Ù…ÙŽÙƒÙÙ…Ù’ Ø³ÙØ¨ÙŽØ§ØªÙ‹Ø§",
              translation: "And We made your sleep a means of rest.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 25:47",
              arabic: "ÙˆÙŽÙ‡ÙÙˆÙŽ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠ Ø¬ÙŽØ¹ÙŽÙ„ÙŽ Ù„ÙŽÙƒÙÙ…Ù Ø§Ù„Ù„ÙŽÙ‘ÙŠÙ’Ù„ÙŽ Ù„ÙØ¨ÙŽØ§Ø³Ù‹Ø§ ÙˆÙŽØ§Ù„Ù†ÙŽÙ‘ÙˆÙ’Ù…ÙŽ Ø³ÙØ¨ÙŽØ§ØªÙ‹Ø§ ÙˆÙŽØ¬ÙŽØ¹ÙŽÙ„ÙŽ Ø§Ù„Ù†ÙŽÙ‘Ù‡ÙŽØ§Ø±ÙŽ Ù†ÙØ´ÙÙˆØ±Ù‹Ø§",
              translation: "And He is the One Who made the night a garment for you, and sleep a rest, and made the day for rising.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1154",
              translation: "The Prophet (SAW) said to Abdullah ibn Amr: \"O Abdullah, do not be like so-and-so who used to pray at night and then stopped praying at night.\" (Emphasising consistency in sleep and worship.)",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Your body cannot switch from stimulation to sleep instantly. A wind-down buffer signals your nervous system to begin producing melatonin, making it dramatically easier to fall asleep at your target time rather than lying awake.


**How?**

Set a recurring alarm 30 minutes before your calculated bedtime. When it goes off, stop all work and stimulating activity. Use this window for calm activities â€” wudu, reading Quran, light stretching, or quiet conversation. Consistency is key: keep this alarm even on weekends.` },
        { title: 'Remove screens and blue light from the bedroom after Isha', done: false,
          tier: 'T2',
          amanahRationale: 'Although the sources establish the night as a divine means for rest and highlight the Sunnah of sleeping early, they omit mention of modern technology, making the subtask\'s directive to remove screens a practical logical inference to protect this intended restful sleep.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 25:47",
              arabic: "ÙˆÙŽÙ‡ÙÙˆÙŽ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠ Ø¬ÙŽØ¹ÙŽÙ„ÙŽ Ù„ÙŽÙƒÙÙ…Ù Ø§Ù„Ù„ÙŽÙ‘ÙŠÙ’Ù„ÙŽ Ù„ÙØ¨ÙŽØ§Ø³Ù‹Ø§ ÙˆÙŽØ§Ù„Ù†ÙŽÙ‘ÙˆÙ’Ù…ÙŽ Ø³ÙØ¨ÙŽØ§ØªÙ‹Ø§ ÙˆÙŽØ¬ÙŽØ¹ÙŽÙ„ÙŽ Ø§Ù„Ù†ÙŽÙ‘Ù‡ÙŽØ§Ø±ÙŽ Ù†ÙØ´ÙÙˆØ±Ù‹Ø§",
              translation: "And He is the One Who made the night a garment for you, and sleep a rest, and made the day for rising.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5862",
              translation: "The Prophet (SAW) used to sleep in the early part of the night and rise in the last third to pray, following a disciplined sleep pattern.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Blue light from phones, tablets, and screens suppresses melatonin production by up to 50%, delaying sleep onset and reducing sleep quality. The bedroom should be a sanctuary for rest, not a second office or entertainment centre.


**How?**

After Isha prayer, place your phone on a charger outside the bedroom or across the room. If you use your phone as an alarm, switch to a simple alarm clock instead. Remove or cover any screens in the bedroom. If you must use a device, enable night mode and keep brightness at minimum. Replace screen time with a physical book or dhikr.` },
        { title: "Practise the Sunnah sleep etiquettes â€” wudu, right side, sleeping duas", done: false,
          tier: 'T1',
          amanahRationale: 'The provided Hadith from Sahih al-Bukhari explicitly instructs believers to perform wudu, lie on their right side, and recite a supplication before going to sleep, providing clear and direct proof for the core actions of the subtask.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 78:9",
              arabic: "ÙˆÙŽØ¬ÙŽØ¹ÙŽÙ„Ù’Ù†ÙŽØ§ Ù†ÙŽÙˆÙ’Ù…ÙŽÙƒÙÙ…Ù’ Ø³ÙØ¨ÙŽØ§ØªÙ‹Ø§",
              translation: "and made your sleep a source of rest,",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 51:17",
              arabic: "ÙƒÙŽØ§Ù†ÙÙˆØ§ Ù‚ÙŽÙ„ÙÙŠÙ„Ù‹Ø§ Ù…ÙÙ‘Ù†ÙŽ Ø§Ù„Ù„ÙŽÙ‘ÙŠÙ’Ù„Ù Ù…ÙŽØ§ ÙŠÙŽÙ‡Ù’Ø¬ÙŽØ¹ÙÙˆÙ†ÙŽ",
              translation: "sleeping only a little at night,",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 25:47",
              arabic: "ÙˆÙŽÙ‡ÙÙˆÙŽ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠ Ø¬ÙŽØ¹ÙŽÙ„ÙŽ Ù„ÙŽÙƒÙÙ…Ù Ø§Ù„Ù„ÙŽÙ‘ÙŠÙ’Ù„ÙŽ Ù„ÙØ¨ÙŽØ§Ø³Ù‹Ø§ ÙˆÙŽØ§Ù„Ù†ÙŽÙ‘ÙˆÙ’Ù…ÙŽ Ø³ÙØ¨ÙŽØ§ØªÙ‹Ø§ ÙˆÙŽØ¬ÙŽØ¹ÙŽÙ„ÙŽ Ø§Ù„Ù†ÙŽÙ‘Ù‡ÙŽØ§Ø±ÙŽ Ù†ÙØ´ÙÙˆØ±Ù‹Ø§",
              translation: "It is He who made the night a garment for you, and sleep for rest, and made the day a resurrection.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 247",
              translation: "The Prophet (SAW) said: \"If any one of you goes to sleep, he should perform wudu as he does for prayer, then lie down on his right side, then say: â€˜O Allah, I submit myself to You...â€™\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The Prophet (SAW) had a complete bedtime routine that combines spiritual protection with physical relaxation. Sleeping in wudu, on the right side, and with the prescribed duas turns every night into an act of worship and improves sleep posture.

**How?**

Make wudu before getting into bed. Recite the sleeping duas â€” blow into your palms and recite the three Quls, then wipe over your body. Recite Ayat al-Kursi and the dua "Bismika Allahumma amutu wa ahya." Keep a small card with these duas by your bed until they are memorised.` },
        { title: 'Track your sleep consistency for 14 days and adjust as needed', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources emphasize sleep as a divine rest and highlight the Prophet\'s consistent bedtime routine, they omit specific modern practices like maintaining a 14-day sleep log, making the subtask a practical logical inference to achieve this intended consistency.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 78:9-11",
              arabic: "ÙˆÙŽØ¬ÙŽØ¹ÙŽÙ„Ù’Ù†ÙŽØ§ Ù†ÙŽÙˆÙ’Ù…ÙŽÙƒÙÙ…Ù’ Ø³ÙØ¨ÙŽØ§ØªÙ‹Ø§ ÙˆÙŽØ¬ÙŽØ¹ÙŽÙ„Ù’Ù†ÙŽØ§ Ø§Ù„Ù„ÙŽÙ‘ÙŠÙ’Ù„ÙŽ Ù„ÙØ¨ÙŽØ§Ø³Ù‹Ø§ ÙˆÙŽØ¬ÙŽØ¹ÙŽÙ„Ù’Ù†ÙŽØ§ Ø§Ù„Ù†ÙŽÙ‘Ù‡ÙŽØ§Ø±ÙŽ Ù…ÙŽØ¹ÙŽØ§Ø´Ù‹Ø§",
              translation: "And We made your sleep a rest, and made the night a covering, and made the day for livelihood.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6312",
              translation: "The Prophet (SAW) used to sleep on his right side and would recite supplications before sleeping, establishing a consistent bedtime routine.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

What gets measured gets managed. Two weeks of data reveals your actual sleep patterns versus your intended ones, exposing the specific nights or habits that disrupt your rhythm so you can address them directly.


**How?**

Use a simple sleep log â€” note your bedtime, wake time, and how rested you feel (1-10 scale) each morning. A notebook or basic spreadsheet works fine; a sleep tracking app adds detail. After 14 days, review the data: identify your worst nights, look for patterns (late screen use, caffeine, stress), and adjust your routine to address the weakest links.` },
      ],
    },
    {
      title: 'Begin a daily walk after Fajr or Asr (minimum 20 minutes)',
      priority: 'high', tags: ['exercise', 'sunnah'],
      description: 'Walking is the most accessible form of movement and carries immense physical and mental benefit. Scheduling it after Fajr or Asr ties it to an existing anchor, builds consistency, and provides time for reflection, dhikr, or beneficial audio content.',
      subtasks: [
        { title: 'Choose a safe and pleasant walking route near your home or mosque', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources commend the strong believer and instruct dispersing in the land after prayer, they do not explicitly prescribe scouting a safe walking route, making the subtask a practical logical inference to cultivate the physical strength beloved by Allah.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 62:10",
              arabic: "ÙÙŽØ¥ÙØ°ÙŽØ§ Ù‚ÙØ¶ÙÙŠÙŽØªÙ Ø§Ù„ØµÙŽÙ‘Ù„ÙŽØ§Ø©Ù ÙÙŽØ§Ù†ØªÙŽØ´ÙØ±ÙÙˆØ§ ÙÙÙŠ Ø§Ù„Ù’Ø£ÙŽØ±Ù’Ø¶Ù ÙˆÙŽØ§Ø¨Ù’ØªÙŽØºÙÙˆØ§ Ù…ÙÙ† ÙÙŽØ¶Ù’Ù„Ù Ø§Ù„Ù„ÙŽÙ‘Ù‡Ù",
              translation: "And when the prayer has been concluded, disperse within the land and seek from the bounty of Allah.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2664",
              translation: "The Prophet (SAW) said: \"The strong believer is better and more beloved to Allah than the weak believer, and in each there is good.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A pre-selected route removes the daily decision of "where should I go?" which is one of the top reasons people skip walks. A pleasant environment also makes the habit intrinsically rewarding, increasing the likelihood you will stick with it.


**How?**

Scout 2-3 routes near your home or mosque that are safe, well-lit, and enjoyable. Aim for a loop that takes 20-30 minutes at a comfortable pace. Consider parks, quiet neighbourhood streets, or paths near your masjid. Walk each candidate route once to test it, then pick your favourite as your default. Having a backup route prevents weather or construction from becoming an excuse.` },
        { title: 'Set a daily reminder tied to your Fajr or Asr prayer time', done: false,
          tier: 'T3',
          amanahRationale: 'While the provided sources emphasize the importance of observing and glorifying Allah during the morning and afternoon times of Fajr and Asr, they offer no textual proof or logical inference for the specific practice of habit-stacking a daily walk to these prayers via a phone reminder.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 40:55",
              arabic: "**Translation:** So be patient (O Muhammad ØµÙ„Ù‰ Ø§Ù„Ù„Ù‡ Ø¹Ù„ÙŠÙ‡ ÙˆØ³Ù„Ù…). Verily, the Promise of AllÃ¢h is true, and ask forgiveness for your fault and glorify the praises of your Lord in the â€˜AshÃ® (i.e. the time period after the midnoon till sunset) and in the IbkÃ¢r (i.e. the time period from early morning or sunrise till before midnoon) [it is said that, that means the five compulsory congregational SalÃ¢t (prayers) or the â€˜Asr and Fajr prayers].",
              translation: "So be patient (O Muhammad ØµÙ„Ù‰ Ø§Ù„Ù„Ù‡ Ø¹Ù„ÙŠÙ‡ ÙˆØ³Ù„Ù…). Verily, the Promise of AllÃ¢h is true, and ask forgiveness for your fault and glorify the praises of your Lord in the â€˜AshÃ® (i.e. the time period after the midnoon till sunset) and in the IbkÃ¢r (i.e. the time period from early morning or sunrise till before midnoon) [it is said that, that means the five compulsory congregational SalÃ¢t (prayers) or the â€˜Asr and Fajr prayers].",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 76:25",
              arabic: "**Translation:** And remember the Name of your Lord every morning and afternoon [i.e. offering of the Morning (Fajr), Zuhr, and â€˜Asr prayers].",
              translation: "And remember the Name of your Lord every morning and afternoon [i.e. offering of the Morning (Fajr), Zuhr, and â€˜Asr prayers].",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 33:42",
              arabic: "**Translation:** And glorify His Praises morning and afternoon [the early morning (Fajr) and â€˜Asr prayers].",
              translation: "And glorify His Praises morning and afternoon [the early morning (Fajr) and â€˜Asr prayers].",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 560",
              translation: "Narrated Jabir bin `Abdullah:The Prophet (ï·º) used to pray the Zuhr at midday, and the `Asr at a time when the sun was still bright, the Maghrib after sunset (at its stated time) and the `Isha at a variable time. Whenever he saw the people assembled (for `Isha' prayer) he would pray earlier and if the people delayed, he would delay the prayer. And they or the Prophet (ï·º) used to offer the Fajr Prayers when it was still dark",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Habit stacking â€” attaching a new behaviour to an existing one â€” is the most reliable way to build consistency. Since you already pray Fajr or Asr daily, anchoring your walk to that prayer creates an automatic trigger that requires no willpower.


**How?**

Set a phone reminder for 5-10 minutes after your chosen prayer time (e.g., "Walk now" at Fajr + 10 min). Lay out your walking shoes and clothes the night before if walking after Fajr. The key is removing friction â€” when the reminder fires, you should be able to walk out the door within two minutes.` },
        { title: 'Prepare a playlist of Quran recitation, lectures, or dhikr for the walk', done: false,
          tier: 'T2',
          amanahRationale: 'Fallback assignment â€” NotebookLM returned stale conversation (empty answer, turn_number:0); subtask has sources so Qarina is the conservative assignment.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 7:204",
              arabic: "**Translation:** so pay attention and listen quietly when the Quran is recited, so that you may be given mercy.â€™",
              translation: "so pay attention and listen quietly when the Quran is recited, so that you may be given mercy.â€™",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 17:78",
              arabic: "**Translation:** So perform the regular prayers in the period from the time the sun is past its zenith till the darkness of the night, and [recite] the Quran at dawn- dawn recitation is always witnessedâ€“â€“",
              translation: "So perform the regular prayers in the period from the time the sun is past its zenith till the darkness of the night, and [recite] the Quran at dawn- dawn recitation is always witnessedâ€“â€“",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 37:3",
              arabic: "**Translation:** then by those who recite the dhikr,",
              translation: "then by those who recite the dhikr,",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1553",
              translation: "Narrated Nafi', 'Whenever Ibn 'Umar finished his morning Salat at Dhul-Hulaifa he would get his Rahila (mount) prepared. Then, he would ride on it, and after it had stood up straight (ready to set out), he would face Al-Qiblah (the Ka'bah at Makkah) while sitting (on his mount) and recite Talbiya. When he had reached the boundaries of the Haram (or Makkah), he would stop recitation of Talbiya till he reached Dhi-Tuwa (near Makkah) where he would pass the night till it was dawn. After offering the morning Salat, he would take a bath. He claimed that Allah's Messenger (ï·º) had done the same",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2276",
              translation: "Narrated Abu Sa`id:Some of the companions of the Prophet (ï·º) went on a journey till they reached some of the 'Arab tribes (at night). They asked the latter to treat them as their guests but they refused. The chief of that tribe was then bitten by a snake (or stung by a scorpion) and they tried their best to cure him but in vain. Some of them said (to the others), \"Nothing has benefited him, will you go to the people who resided here at night, it may be that some of them might possess something (as treatment),\" They went to the group of the companions (of the Prophet (ï·º) ) and said, \"Our chief has been bitten by a snake (or stung by a scorpion) and we have tried everything but he has not benefited. Have you got anything (useful)?\" One of them replied, \"Yes, by Allah! I can recite a Ruqya, but as you have refused to accept us as your guests, I will not recite the Ruqya for you unless you fix for us some wages for it.\" They agreed to pay them a flock of sheep. One of them then went and recited (Surat-ul-Fatiha): 'All the praises are for the Lord of the Worlds' and puffed over the chief who became all right as if he was released from a chain, and got up and started walking, showing no signs of sickness. They paid them what they agreed to pay. Some of them (i.e. the companions) then suggested to divide their earnings among themselves, but the one who performed the recitation said, \"Do not divide them till we go to the Prophet (ï·º) and narrate the whole story to him, and wait for his order.\" So, they went to Allah's Messenger (ï·º) and narrated the story. Allah's Messenger (ï·º) asked, \"How did you come to know that Surat-ul-Fatiha was recited as Ruqya?\" Then he added, \"You have done the right thing. Divide (what you have earned) and assign a share for me as well.\" The Prophet (ï·º) smiled thereupon",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Pairing physical movement with beneficial audio transforms a simple walk into a multi-layered act of self-improvement. Quran recitation nourishes the soul, lectures build knowledge, and dhikr keeps your tongue moist with the remembrance of Allah â€” all while your body gets the exercise it needs.


**How?**

Download 3-5 episodes of your favourite Islamic lecture series or Quran recitation to your phone for offline access. Organise them into a dedicated "Walk" playlist. Rotate between Quran days and lecture days to keep it fresh. Wireless earbuds make this seamless. Alternatively, some days walk in silence and use the time for personal dua and reflection.` },
        { title: 'Track your daily walks for the first 21 days to build the habit', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources commend the strong believer and encourage physical movement as part of daily worship, they omit specific modern practices like maintaining a 21-day habit tracker, making the subtask a practical logical inference to establish this intended daily walking routine.',
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2664",
              translation: "The Prophet (SAW) said: \"The strong believer is better and more beloved to Allah than the weak believer, and in each there is good. Be keen on what benefits you and seek help from Allah.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 5059",
              translation: "The Prophet (SAW) used to walk to the mosque and encouraged physical movement as part of daily worship.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Research shows it takes an average of 21-66 days to form a new habit. Tracking creates accountability and a visible streak that motivates you to maintain consistency during the critical early period when the habit is most fragile.


**How?**

Use a simple habit tracker â€” a checkbox on your calendar, a streak app, or a tally in your journal. Record whether you walked each day, the duration, and a brief note on how you felt. After 21 days, review your streak: if you hit 18+ days, the habit is forming well. If you missed several days, identify the pattern (which days, what interfered) and adjust your schedule accordingly.` },
      ],
    },
    {
      title: 'Book an annual comprehensive health screening',
      priority: 'high', tags: ['health', 'prevention'],
      description: 'The body is an amanah (trust) from Allah. Preventive health screenings catch issues early when they are most treatable. A comprehensive check-up covers blood work, cardiovascular markers, vision, dental health, and age-appropriate screenings.',
      subtasks: [
        { title: 'Research clinics or doctors that offer comprehensive health panels', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Hadith explicitly advises believers to take advantage of their health before illness, it omits specific modern preventive measures like researching clinics for comprehensive health panels, making the subtask a practical logical inference to implement this prophetic guidance.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 17:70",
              arabic: "ÙˆÙŽÙ„ÙŽÙ‚ÙŽØ¯Ù’ ÙƒÙŽØ±ÙŽÙ‘Ù…Ù’Ù†ÙŽØ§ Ø¨ÙŽÙ†ÙÙŠ Ø¢Ø¯ÙŽÙ…ÙŽ",
              translation: "And We have certainly honoured the children of Adam.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5671",
              translation: "The Prophet (SAW) said: \"Take advantage of five before five: your youth before your old age, your health before your illness, your wealth before your poverty, your free time before your busyness, and your life before your death.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih â€” reported by Ibn Abbas",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Not all clinics offer the same depth of screening. A comprehensive panel covering blood work, cardiovascular markers, metabolic health, and age-appropriate tests gives you a complete picture rather than a superficial snapshot that misses early warning signs.


**How?**

Search for clinics near you that offer "executive health panels" or "comprehensive wellness screenings." Compare what is included â€” at minimum, look for complete blood count, lipid panel, metabolic panel, thyroid, vitamin D, and HbA1c. Check reviews, insurance coverage, and whether the doctor spends time explaining results. Ask your community for recommendations as well.` },
        { title: 'Schedule the appointment and note any fasting requirements for blood work', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Hadiths explicitly advise believers to take advantage of their health before illness, they omit specific modern medical logistics like scheduling clinic appointments or noting fasting requirements for blood work, making the subtask a practical logical inference to fulfill this prophetic guidance.',
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5671",
              translation: "The Prophet (SAW) said: \"Take advantage of five before five: your youth before your old age, your health before your illness...\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 2346",
              translation: "The Prophet (SAW) said: \"There are two blessings which many people are deceived about: health and free time.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Many blood tests require 8-12 hours of fasting for accurate results. Scheduling without knowing this can lead to wasted appointments, inaccurate readings, and the need to return â€” costing time and delaying your health insights.


**How?**

Call the clinic and confirm which tests require fasting and for how long. Schedule a morning appointment so the fasting period overlaps with sleep. Mark the appointment on your calendar with a note: "No food or drink (except water) after [time]." If you are already fasting for Sunnah Mondays/Thursdays, consider scheduling the screening on one of those days.` },
        { title: 'Prepare a list of current symptoms, medications, and family health history', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Hadith emphasizes health as a profound blessing that people often neglect, it omits specific modern medical preparations like listing symptoms and family history, making the subtask a practical logical inference to actively safeguard this divine gift.',
          sources: [
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 2346",
              translation: "The Prophet (SAW) said: \"There are two blessings which many people are deceived about: health and free time.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Doctors make better diagnostic decisions when they have complete context. Walking in prepared with your health history prevents the common problem of forgetting to mention something important during the brief appointment window.


**How?**

Create a one-page document listing: (1) any current symptoms or concerns, no matter how minor, (2) all medications, supplements, and vitamins you take with dosages, (3) family health history â€” conditions in parents, siblings, and grandparents such as diabetes, heart disease, cancer, or hypertension. Bring a printed copy or have it on your phone to hand to the doctor.` },
        { title: 'Attend the screening and obtain a copy of all results', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Hadith explicitly advises believers to take advantage of their health before sickness, it omits specific modern medical practices like attending health screenings and obtaining copies of results, making the subtask a practical logical inference to implement this prophetic guidance.',
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2664",
              translation: "The Prophet (peace be upon him) said: \"Take advantage of five before five: your youth before your old age, your health before your sickness, your wealth before your poverty, your free time before your being busy, and your life before your death.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Having your own copy of results empowers you to track changes over time, seek second opinions, and take ownership of your health data. Relying solely on the doctor to hold your records leaves you passive in your own healthcare.


**How?**

Attend the appointment on time with your prepared health summary. Ask the clinic if results will be available through an online patient portal or if you need to request a printed copy. Ensure you receive the full lab report with reference ranges, not just a verbal summary. Save a digital copy in a dedicated "Health Records" folder you can reference annually.` },
        { title: 'Review results with the doctor and create an action plan for any flagged areas', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources explicitly encourage making use of medical treatment and affirm Allah as the ultimate curer, they omit specific modern medical logistics like reviewing lab results or creating action plans with a doctor, making the subtask a practical logical inference to fulfill this prophetic command.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 26:80",
              arabic: "ÙˆÙŽØ¥ÙØ°ÙŽØ§ Ù…ÙŽØ±ÙØ¶Ù’ØªÙ ÙÙŽÙ‡ÙÙˆÙŽ ÙŠÙŽØ´Ù’ÙÙÙŠÙ†Ù",
              translation: "And when I am ill, it is He who cures me.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 2038",
              translation: "The Prophet (SAW) said: \"Make use of medical treatment, for Allah has not made a disease without appointing a remedy for it.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Raw lab numbers are meaningless without interpretation. A doctor can explain what is normal, what is borderline, and what requires immediate action â€” turning data into a concrete plan that actually improves your health outcomes.


**How?**

Schedule a follow-up consultation (in-person or phone) to review the results with your doctor. Prepare questions for any values outside the normal range. Ask: "What lifestyle changes would improve this?" and "When should I retest?" Write down the action items during the appointment. For any flagged areas, create specific tasks with deadlines â€” for example, "Retest vitamin D in 3 months after supplementation."` },
      ],
    },
    {
      title: 'Identify and remove harmful substances â€” tobacco, alcohol, processed foods',
      priority: 'urgent', tags: ['diet', 'tayyib'],
      description: 'Allah commands us to consume what is tayyib (pure and wholesome) and forbids what harms. Tobacco, alcohol, and heavily processed foods damage the body and dull the mind. Removing them is both a health imperative and an act of obedience.',
      subtasks: [
        { title: 'Honestly inventory all harmful substances you currently consume', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Quranic verses explicitly forbid self-harm and throwing oneself into destruction, they omit specific methods like taking a personal inventory of harmful substances, making the subtask a practical logical inference to identify and eliminate habits that lead to such destruction.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:195",
              arabic: "ÙˆÙŽÙ„ÙŽØ§ ØªÙÙ„Ù’Ù‚ÙÙˆØ§ Ø¨ÙØ£ÙŽÙŠÙ’Ø¯ÙÙŠÙƒÙÙ…Ù’ Ø¥ÙÙ„ÙŽÙ‰ Ø§Ù„ØªÙŽÙ‘Ù‡Ù’Ù„ÙÙƒÙŽØ©Ù",
              translation: "And do not throw yourselves into destruction with your own hands.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 4:29",
              arabic: "ÙˆÙŽÙ„ÙŽØ§ ØªÙŽÙ‚Ù’ØªÙÙ„ÙÙˆØ§ Ø£ÙŽÙ†ÙÙØ³ÙŽÙƒÙÙ…Ù’ Ø¥ÙÙ†ÙŽÙ‘ Ø§Ù„Ù„ÙŽÙ‘Ù‡ÙŽ ÙƒÙŽØ§Ù†ÙŽ Ø¨ÙÙƒÙÙ…Ù’ Ø±ÙŽØ­ÙÙŠÙ…Ù‹Ø§",
              translation: "And do not kill yourselves. Indeed, Allah is ever Merciful to you.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Honesty with yourself is the prerequisite for change. Many people underestimate how much harm they consume because they avoid looking closely. A frank inventory â€” without judgement â€” gives you a clear baseline to work from.


**How?**

Sit down privately and list every substance you consume that you know is harmful or suspect might be. Include tobacco, vaping, alcohol, energy drinks, excessive caffeine, heavily processed snacks, fast food frequency, and any recreational substances. Note how often you consume each one (daily, weekly, occasionally). Be honest â€” this list is for you, not for anyone else.` },
        { title: 'Set a firm quit date for any addictive substances (tobacco, vaping, etc.)', done: false,
          tier: 'T2',
          amanahRationale: 'While the provided sources strictly forbid self-harm and the consumption of intoxicants, they omit specific modern psychological strategies like setting a firm quit date, making the subtask a practical logical inference to successfully abandon these prohibited substances.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:195",
              arabic: "ÙˆÙŽÙ„ÙŽØ§ ØªÙÙ„Ù’Ù‚ÙÙˆØ§ Ø¨ÙØ£ÙŽÙŠÙ’Ø¯ÙÙŠÙƒÙÙ…Ù’ Ø¥ÙÙ„ÙŽÙ‰ Ø§Ù„ØªÙŽÙ‘Ù‡Ù’Ù„ÙÙƒÙŽØ©Ù",
              translation: "And do not throw yourselves into destruction with your own hands.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2003",
              translation: "The Prophet (SAW) said: \"Every intoxicant is khamr, and every khamr is haram.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A quit date transforms a vague intention into a commitment. Research shows that people who set a specific date are significantly more likely to follow through than those who say "someday." It also gives you time to prepare mentally and practically.


**How?**

Choose a date within the next 2-4 weeks â€” close enough to maintain urgency but far enough to prepare. Write it down and tell at least one person. Mark it on your calendar. Use the days before to gradually reduce intake if possible, research cessation methods, and remove triggers from your environment. Make dua for strength and renew your intention that this is an act of obedience to Allah.` },
        { title: 'Identify processed foods in your pantry and find whole-food replacements', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources explicitly warn against excessive eating and overfilling the stomach, they omit specific modern nutritional concepts like identifying and replacing processed foods, making the subtask a practical logical inference to avoid the very overconsumption these texts condemn.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 7:31",
              arabic: "ÙƒÙÙ„ÙÙˆØ§ ÙˆÙŽØ§Ø´Ù’Ø±ÙŽØ¨ÙÙˆØ§ ÙˆÙŽÙ„ÙŽØ§ ØªÙØ³Ù’Ø±ÙÙÙÙˆØ§ Ø¥ÙÙ†ÙŽÙ‘Ù‡Ù Ù„ÙŽØ§ ÙŠÙØ­ÙØ¨ÙÙ‘ Ø§Ù„Ù’Ù…ÙØ³Ù’Ø±ÙÙÙÙŠÙ†ÙŽ",
              translation: "Eat and drink, but be not excessive. Indeed, He does not like those who commit excess.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Ibn Majah 3349",
              translation: "The Prophet (SAW) said: \"The son of Adam does not fill any vessel worse than his stomach.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Ultra-processed foods are engineered to be addictive, containing excessive sugar, seed oils, and artificial additives that cause inflammation, weight gain, and chronic disease. Replacing them with whole foods is one of the highest-impact health changes you can make.


**How?**

Go through your pantry and fridge. Any item with more than 5 ingredients or ingredients you cannot pronounce is likely ultra-processed. Common culprits: sugary cereals, packaged snacks, instant noodles, soft drinks, and ready meals. For each one, find a whole-food alternative â€” for example, replace packaged granola bars with dates and nuts, replace soft drinks with water infused with fruit. Make the swap gradual if needed, one category per week.` },
        { title: 'Seek support â€” accountability partner, counsellor, or cessation programme', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources explicitly command believers to cooperate in righteousness and relieve each other\'s hardships, they omit specific modern support systems like accountability partners, professional counsellors, or cessation programmes, making the subtask a practical logical inference to implement this divine and prophetic directive.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 5:2",
              arabic: "ÙˆÙŽØªÙŽØ¹ÙŽØ§ÙˆÙŽÙ†ÙÙˆØ§ Ø¹ÙŽÙ„ÙŽÙ‰ Ø§Ù„Ù’Ø¨ÙØ±ÙÙ‘ ÙˆÙŽØ§Ù„ØªÙŽÙ‘Ù‚Ù’ÙˆÙŽÙ‰Ù° ÙˆÙŽÙ„ÙŽØ§ ØªÙŽØ¹ÙŽØ§ÙˆÙŽÙ†ÙÙˆØ§ Ø¹ÙŽÙ„ÙŽÙ‰ Ø§Ù„Ù’Ø¥ÙØ«Ù’Ù…Ù ÙˆÙŽØ§Ù„Ù’Ø¹ÙØ¯Ù’ÙˆÙŽØ§Ù†Ù",
              translation: "And cooperate in righteousness and piety, but do not cooperate in sin and aggression.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (SAW) said: \"Whoever relieves a believer of a hardship in this world, Allah will relieve him of a hardship on the Day of Resurrection.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Overcoming harmful habits alone is significantly harder than with support. The Prophet (SAW) emphasised the importance of good companionship, and an accountability partner or professional can provide the encouragement, structure, and expertise you need during difficult moments.


**How?**

Choose at least one form of support: (1) an accountability partner â€” a trusted friend or family member you check in with weekly, (2) a professional counsellor or therapist experienced in habit change or addiction, or (3) a structured programme like a smoking cessation clinic. For Islamic-specific support, look for Muslim counsellors or community programmes. Be upfront about your goals and ask them to check on your progress regularly.` },
        { title: 'Remove harmful items from your home environment entirely', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources explicitly forbid self-harm and the infliction of harm, they omit specific practical strategies like removing harmful items from one\'s home environment, making the subtask a practical logical inference to effectively eliminate these sources of destruction.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:195",
              arabic: "ÙˆÙŽÙ„ÙŽØ§ ØªÙÙ„Ù’Ù‚ÙÙˆØ§ Ø¨ÙØ£ÙŽÙŠÙ’Ø¯ÙÙŠÙƒÙÙ…Ù’ Ø¥ÙÙ„ÙŽÙ‰ Ø§Ù„ØªÙŽÙ‘Ù‡Ù’Ù„ÙÙƒÙŽØ©Ù ÙˆÙŽØ£ÙŽØ­Ù’Ø³ÙÙ†ÙÙˆØ§ Ø¥ÙÙ†ÙŽÙ‘ Ø§Ù„Ù„ÙŽÙ‘Ù‡ÙŽ ÙŠÙØ­ÙØ¨ÙÙ‘ Ø§Ù„Ù’Ù…ÙØ­Ù’Ø³ÙÙ†ÙÙŠÙ†ÙŽ",
              translation: "And do not throw yourselves into destruction with your own hands, and do good. Indeed, Allah loves the doers of good.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Ibn Majah 3340",
              translation: "The Prophet (SAW) said: \"There is no harm and no reciprocal harm.\" (La darar wa la dirar.)",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Willpower is a finite resource, but environment design is permanent. If harmful items are physically present in your home, you will eventually consume them during a moment of weakness. Removing them eliminates the option entirely.


**How?**

Go through your home â€” kitchen, bedroom, car, desk, and any hidden stashes. Collect every harmful item you committed to eliminating: cigarettes, vaping devices, alcohol, junk food, and anything else on your inventory. Dispose of them completely â€” do not "save them for guests" or hide them "just in case." Inform household members of your decision and ask for their support in keeping the home free of these items.` },
      ],
    },
  ],
  health_physical_growth: [
    {
      title: 'Establish 3Ã—/week strength or resistance training routine',
      priority: 'high', tags: ['exercise', 'fitness'],
      description: 'The strong believer is better and more beloved to Allah than the weak believer. Strength training preserves muscle mass, strengthens bones, boosts metabolism, and builds the physical resilience needed to serve your family, community, and deen actively.',
      subtasks: [
        { title: 'Choose a programme suited to your level (bodyweight, gym, or home equipment)', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Hadiths encourage physical training and praise the strong believer, they omit specific modern exercise methodologies like choosing a tailored fitness program, making the subtask a practical logical inference to build the physical strength praised by the Prophet.',
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2664",
              translation: "The Prophet (SAW) said: \"The strong believer is better and more beloved to Allah than the weak believer, and in each there is good.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 2578",
              translation: "The Prophet (SAW) said: \"Teach your children swimming, archery, and horse riding.\" (Encouraging physical training.)",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Starting with a programme matched to your current fitness level prevents injury and builds confidence. A programme too advanced leads to burnout; one too easy yields no results. The right starting point ensures sustainable progress.


**How?**

Honestly assess your current level: Can you do 10 push-ups? Have you trained before? Based on your answer, choose one path: (1) Complete beginner â€” start with a bodyweight programme, (2) Some experience â€” a basic gym programme like StrongLifts 5x5 or GZCLP, (3) Home equipment â€” a dumbbell or resistance band programme. Pick one and commit for at least 8 weeks before switching.` },
        { title: 'Schedule three specific days and times per week for training', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Hadith encourages believers to be strong and to actively pursue what benefits them, it omits specific modern fitness strategies like scheduling three days a week for training, making the subtask a practical logical inference to systematically build the strength praised by the Prophet.',
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2664",
              translation: "The Prophet (SAW) said: \"The strong believer is better and more beloved to Allah than the weak believer, and in each there is good. Be keen on what benefits you.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Vague intentions like "I will train this week" almost never materialise. Specific, time-blocked sessions treat training as a non-negotiable appointment â€” the same way you would never skip a prayer time.


**How?**

Open your weekly calendar and identify three days with at least a 60-minute window. Common splits: Monday/Wednesday/Friday or Saturday/Tuesday/Thursday. Block these times as recurring appointments. Choose times that do not conflict with prayer, work, or family obligations. Lay out your training clothes the night before and treat the session as immovable.` },
        { title: 'Learn proper form for foundational movements (squat, push, pull, hinge)', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Hadiths encourage the mastery of physical skills and praise the strong believer, they omit specific modern exercise techniques like learning proper form for foundational movements, making the subtask a practical logical inference to safely and effectively build the physical strength praised by the Prophet.',
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2664",
              translation: "The Prophet (SAW) said: \"The strong believer is better and more beloved to Allah than the weak believer.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2908",
              translation: "The Prophet (SAW) said: \"Practise archery and practise riding.\" (Encouraging mastery of physical skills.)",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Proper form prevents injury and ensures the target muscles are actually doing the work. Training with poor form builds bad patterns that become harder to correct over time and can lead to chronic joint or back problems.


**How?**

Focus on four foundational patterns: squat (goblet squat or bodyweight squat), push (push-up or bench press), pull (row or pull-up), and hinge (deadlift or hip hinge). Watch 2-3 reputable tutorial videos for each movement. Film yourself performing the movement and compare to the tutorials. If possible, book one session with a qualified trainer for in-person feedback on your form.` },
        { title: 'Track workouts and progressive overload in a training log', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Hadith generally praises the strong believer, it omits specific modern fitness practices like tracking workouts or progressive overload, making the subtask a practical logical inference to systematically build the physical strength beloved by Allah.',
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (peace be upon him) said: \"A strong believer is better and more beloved to Allah than a weak believer, while there is good in both.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Progressive overload â€” gradually increasing weight, reps, or sets â€” is the fundamental driver of strength gains. Without tracking, you cannot ensure you are actually progressing rather than repeating the same effort week after week.


**How?**

Use a simple training log â€” a notebook, spreadsheet, or app like Strong or JEFIT. For every session, record the exercise, sets, reps, and weight used. Each week, aim to add a small increment â€” 1-2 extra reps, or 1-2 kg more weight. Review your log weekly to confirm you are progressing. If a lift stalls for more than two weeks, adjust your approach.` },
        { title: 'Evaluate progress and adjust the programme every 4-6 weeks', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Hadith encourages believers to strive for what benefits them and praises the strong believer, it omits specific modern fitness practices like evaluating progress and adjusting a training program every 4-6 weeks, making the subtask a practical logical inference to systematically build the physical strength beloved by Allah.',
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (peace be upon him) said: \"A strong believer is better and more beloved to Allah than a weak believer, while there is good in both. Strive for that which will benefit you, seek the help of Allah, and do not be helpless.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Your body adapts to training stimuli over time. What challenged you in week one becomes routine by week six. Regular evaluation ensures you continue making progress rather than plateauing, and catches any exercises causing discomfort.


**How?**

Every 4-6 weeks, review your training log and ask: Am I still progressing on key lifts? Am I recovering well between sessions? Do I have any persistent aches? Based on your answers, make targeted adjustments â€” swap a stale exercise, increase training volume slightly, or add a deload week if fatigued. Small, intentional tweaks are more effective than a completely new programme.` },
      ],
    },
    {
      title: 'Track daily water intake (target 2â€“3 litres)',
      priority: 'medium', tags: ['hydration', 'health'],
      description: 'Proper hydration is essential for cognitive function, digestion, joint health, and energy levels. Building a hydration habit supports every other health goal.',
      subtasks: [
        { title: 'Get a reusable water bottle with volume markings', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources advise allocating a specific proportion of the stomach for drink to maintain health, they omit specific modern tools like a volume-marked water bottle, making the subtask a practical logical inference to accurately measure and manage one\'s liquid intake.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 16:69",
              arabic: "ÙŠÙŽØ®Ù’Ø±ÙØ¬Ù Ù…ÙÙ† Ø¨ÙØ·ÙÙˆÙ†ÙÙ‡ÙŽØ§ Ø´ÙŽØ±ÙŽØ§Ø¨ÙŒ Ù…ÙÙ‘Ø®Ù’ØªÙŽÙ„ÙÙÙŒ Ø£ÙŽÙ„Ù’ÙˆÙŽØ§Ù†ÙÙ‡Ù ÙÙÙŠÙ‡Ù Ø´ÙÙÙŽØ§Ø¡ÙŒ Ù„ÙÙ‘Ù„Ù†ÙŽÙ‘Ø§Ø³Ù",
              translation: "There emerges from their bellies a drink of varying colours, in which there is healing for people.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Ibn Majah 3349",
              translation: "The Prophet (SAW) said: \"The son of Adam does not fill any vessel worse than his stomach. It is sufficient for the son of Adam to eat a few mouthfuls to keep him going. If he must do that, then one-third for food, one-third for drink, and one-third for air.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

You cannot manage what you cannot measure. A bottle with volume markings gives you instant visual feedback on how much you have consumed, removing the guesswork that leads most people to chronically under-hydrate.


**How?**

Purchase a 1-litre reusable water bottle with clear volume markings on the side. Stainless steel or BPA-free plastic both work well. Aim to finish the bottle 2-3 times per day. Keep it visible on your desk or counter as a constant reminder. If you prefer, add time markers to the bottle with tape to pace your intake throughout the day.` },
        { title: 'Set hydration reminders at key intervals throughout the day', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources establish general prophetic etiquette for proportioning and pacing liquid intake, they omit specific modern strategies like setting daily hydration reminders, making the subtask a practical logical inference to ensure one drinks proactively and consistently.',
          sources: [
            {
              kind: "hadith",
              ref: "Sunan Ibn Majah 3349",
              translation: "The Prophet (SAW) said: \"...one-third for food, one-third for drink, and one-third for air.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5376",
              translation: "The Prophet (SAW) instructed on proper eating and drinking etiquette, including drinking in three sips.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Thirst is a lagging indicator â€” by the time you feel thirsty, you are already mildly dehydrated. Regular reminders ensure you drink proactively and consistently rather than playing catch-up in the evening.


**How?**

Set phone reminders at natural anchor points: after Fajr, mid-morning, after Dhuhr, mid-afternoon, and after Maghrib. Each reminder is a cue to drink a full glass (250ml). Alternatively, use a hydration app that sends periodic notifications. After two weeks, the habit typically becomes automatic and you can reduce the reminders.` },
        { title: 'Track daily intake using a simple app or tally method for two weeks', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Hadith establishes the general prophetic principle of intentionally proportioning one\'s liquid intake, it omits specific modern methods like using an app or tally to track daily consumption, making the subtask a practical logical inference to accurately measure and manage one\'s hydration.',
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5376",
              translation: "The Prophet (peace be upon him) said: \"The son of Adam does not fill any vessel worse than his stomach. It is sufficient for the son of Adam to eat a few mouthfuls to keep him alive. If he must fill it, then one-third for food, one-third for drink, and one-third for air.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Two weeks of tracking reveals your actual hydration pattern â€” most people discover they drink far less than they assumed. The data also shows which times of day you consistently miss, allowing you to target those gaps specifically.


**How?**

Choose a tracking method: a tally on a sticky note (one mark per glass), a free hydration app, or a simple note in your phone. Record every glass or bottle you finish throughout the day. At the end of two weeks, calculate your daily average. If it is below 2 litres, identify the low-intake periods and add a reminder or routine to address them.` },
        { title: 'Adjust intake based on activity level, climate, and fasting days', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources explicitly establish the divine principle of modifying religious practices based on changing physical circumstances like illness or travel, they omit specific modern guidelines like adjusting daily hydration levels according to climate or activity, making the subtask a practical logical inference to safely accommodate the body\'s shifting needs.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:184",
              arabic: "Ø£ÙŽÙŠÙŽÙ‘Ø§Ù…Ù‹Ø§ Ù…ÙŽÙ‘Ø¹Ù’Ø¯ÙÙˆØ¯ÙŽØ§ØªÙ Ûš ÙÙŽÙ…ÙŽÙ† ÙƒÙŽØ§Ù†ÙŽ Ù…ÙÙ†ÙƒÙÙ… Ù…ÙŽÙ‘Ø±ÙÙŠØ¶Ù‹Ø§ Ø£ÙŽÙˆÙ’ Ø¹ÙŽÙ„ÙŽÙ‰Ù° Ø³ÙŽÙÙŽØ±Ù ÙÙŽØ¹ÙØ¯ÙŽÙ‘Ø©ÙŒ Ù…ÙÙ‘Ù†Ù’ Ø£ÙŽÙŠÙŽÙ‘Ø§Ù…Ù Ø£ÙØ®ÙŽØ±ÙŽ Ûš ÙˆÙŽØ¹ÙŽÙ„ÙŽÙ‰ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠÙ†ÙŽ ÙŠÙØ·ÙÙŠÙ‚ÙÙˆÙ†ÙŽÙ‡Ù ÙÙØ¯Ù’ÙŠÙŽØ©ÙŒ Ø·ÙŽØ¹ÙŽØ§Ù…Ù Ù…ÙØ³Ù’ÙƒÙÙŠÙ†Ù Û– ÙÙŽÙ…ÙŽÙ† ØªÙŽØ·ÙŽÙˆÙŽÙ‘Ø¹ÙŽ Ø®ÙŽÙŠÙ’Ø±Ù‹Ø§ ÙÙŽÙ‡ÙÙˆÙŽ Ø®ÙŽÙŠÙ’Ø±ÙŒ Ù„ÙŽÙ‘Ù‡Ù Ûš ÙˆÙŽØ£ÙŽÙ† ØªÙŽØµÙÙˆÙ…ÙÙˆØ§ Ø®ÙŽÙŠÙ’Ø±ÙŒ Ù„ÙŽÙ‘ÙƒÙÙ…Ù’ Û– Ø¥ÙÙ† ÙƒÙÙ†ØªÙÙ…Ù’ ØªÙŽØ¹Ù’Ù„ÙŽÙ…ÙÙˆÙ†ÙŽ",
              translation: "Fast for a specific number of days, but if one of you is ill, or on a journey, on other days later. For those who can fast only with extreme difficulty, there is a way to compensate â€” feed a needy person. But if anyone does good of his own accord, it is better for him, and fasting is better for you, if only you knew.",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              rationale: "the divine permission to modify fasting due to illness or travel implies attending to the body's changing needs, including hydration and nutrition levels.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1922",
              translation: "The Prophet (SAW) said: \"Allah has relieved the traveller of fasting and half of the prayer.\" (Indicating that adjusting practices according to physical circumstances is commanded by Allah.)",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A flat 2-litre target ignores the reality that your body needs more water on hot days, training days, and when you are breaking a fast. Adjusting intake to your actual circumstances prevents both dehydration and the false confidence of hitting a static number.


**How?**

On training days, add 500ml-1L extra around your workout. In hot weather, increase your baseline by 500ml. On fasting days, front-load hydration at suhoor and rehydrate generously at iftar â€” aim for 1.5L between iftar and sleep. Monitor your urine colour as a simple gauge: pale yellow means well-hydrated, dark yellow means you need more.` },
      ],
    },
    {
      title: 'Explore the Sunnah of intermittent fasting (Monday/Thursday) as a health practice',
      priority: 'medium', tags: ['fasting', 'sunnah'],
      description: 'Fasting on Mondays and Thursdays is a confirmed Sunnah with extraordinary health benefits â€” improved insulin sensitivity, cellular repair (autophagy), mental clarity, and weight management. It combines spiritual reward with measurable physical benefit.',
      subtasks: [
        { title: 'Research the health science behind intermittent fasting and autophagy', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources state that fasting is beneficial and encourage the pursuit of medical remedies, they omit specific modern scientific concepts like researching autophagy, making the subtask a practical logical inference to uncover the physical health benefits hinted at by the Quranic phrase "if only you knew."',
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:184",
              arabic: "Ø£ÙŽÙŠÙŽÙ‘Ø§Ù…Ù‹Ø§ Ù…ÙŽÙ‘Ø¹Ù’Ø¯ÙÙˆØ¯ÙŽØ§ØªÙ Ûš ÙÙŽÙ…ÙŽÙ† ÙƒÙŽØ§Ù†ÙŽ Ù…ÙÙ†ÙƒÙÙ… Ù…ÙŽÙ‘Ø±ÙÙŠØ¶Ù‹Ø§ Ø£ÙŽÙˆÙ’ Ø¹ÙŽÙ„ÙŽÙ‰Ù° Ø³ÙŽÙÙŽØ±Ù ÙÙŽØ¹ÙØ¯ÙŽÙ‘Ø©ÙŒ Ù…ÙÙ‘Ù†Ù’ Ø£ÙŽÙŠÙŽÙ‘Ø§Ù…Ù Ø£ÙØ®ÙŽØ±ÙŽ Ûš ÙˆÙŽØ¹ÙŽÙ„ÙŽÙ‰ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠÙ†ÙŽ ÙŠÙØ·ÙÙŠÙ‚ÙÙˆÙ†ÙŽÙ‡Ù ÙÙØ¯Ù’ÙŠÙŽØ©ÙŒ Ø·ÙŽØ¹ÙŽØ§Ù…Ù Ù…ÙØ³Ù’ÙƒÙÙŠÙ†Ù Û– ÙÙŽÙ…ÙŽÙ† ØªÙŽØ·ÙŽÙˆÙŽÙ‘Ø¹ÙŽ Ø®ÙŽÙŠÙ’Ø±Ù‹Ø§ ÙÙŽÙ‡ÙÙˆÙŽ Ø®ÙŽÙŠÙ’Ø±ÙŒ Ù„ÙŽÙ‘Ù‡Ù Ûš ÙˆÙŽØ£ÙŽÙ† ØªÙŽØµÙÙˆÙ…ÙÙˆØ§ Ø®ÙŽÙŠÙ’Ø±ÙŒ Ù„ÙŽÙ‘ÙƒÙÙ…Ù’ Û– Ø¥ÙÙ† ÙƒÙÙ†ØªÙÙ…Ù’ ØªÙŽØ¹Ù’Ù„ÙŽÙ…ÙÙˆÙ†ÙŽ",
              translation: "Fast for a specific number of days, but if one of you is ill, or on a journey, on other days later. For those who can fast only with extreme difficulty, there is a way to compensate â€” feed a needy person. But if anyone does good of his own accord, it is better for him, and fasting is better for you, if only you knew.",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              rationale: "\"fasting is better for you, if only you knew\" â€” a direct invitation to understand the full benefit of fasting, including its physical dimensions such as autophagy and metabolic renewal.",
            },
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 2038",
              translation: "The Prophet (SAW) said: \"Make use of medical treatment, for Allah has not made a disease without appointing a remedy for it, except for one disease â€” old age.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Understanding the science strengthens your motivation and helps you optimise your fasting practice. When you know that autophagy (cellular cleanup) peaks during extended fasts and that insulin sensitivity improves measurably, fasting shifts from pure willpower to informed strategy.


**How?**

Read or watch 2-3 reputable sources on intermittent fasting science. Focus on understanding: what happens to your body at 12, 16, and 24 hours of fasting, how autophagy works, and the metabolic benefits of regular fasting cycles. Take notes on the key benefits to revisit when motivation dips.` },
        { title: 'Start with one day per week (Monday or Thursday) and build up', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Hadiths establish the Prophetic practice of fasting on Mondays and Thursdays, they omit specific habit-building strategies like starting with one day a week, making the subtask a practical logical inference to sustainably adopt this Sunnah without burnout.',
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 1162",
              translation: "The Prophet (peace be upon him) was asked about fasting on Mondays, and he said: \"That is the day on which I was born, and the day on which I received revelation.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1975",
              translation: "The Prophet (peace be upon him) used to fast on Mondays and Thursdays.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Jumping straight to two fasting days per week often leads to burnout, especially if you are not accustomed to fasting outside Ramadan. Starting with one day builds your tolerance gradually and lets you work out the practical logistics before doubling the commitment.


**How?**

Pick either Monday or Thursday â€” whichever fits your schedule better. Make the niyyah (intention) the night before. For your first few fasts, keep your schedule light and avoid intense training. Eat a balanced suhoor with protein, healthy fats, and complex carbs to sustain you. After 4 consistent weeks of one day, you are ready to add the second day.` },
        { title: 'Plan suhoor and iftar meals that are nutritionally balanced', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources state that fasting is highly beneficial and praise the consistent fasting of Dawud, they omit specific modern dietary strategies like planning nutritionally balanced suhoor and iftar meals, making the subtask a practical logical inference to physically sustain the fasts and maximize their benefits.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:184",
              arabic: "ÙˆÙŽØ£ÙŽÙ† ØªÙŽØµÙÙˆÙ…ÙÙˆØ§ Ø®ÙŽÙŠÙ’Ø±ÙŒ Ù„ÙŽÙ‘ÙƒÙÙ…Ù’ Ø¥ÙÙ† ÙƒÙÙ†ØªÙÙ…Ù’ ØªÙŽØ¹Ù’Ù„ÙŽÙ…ÙÙˆÙ†ÙŽ",
              translation: "But to fast is best for you, if you only knew.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 1162",
              translation: "The Prophet (SAW) said: \"The fast of Dawud is the most beloved fast to Allah: he used to fast one day and break his fast the next.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Poor meal choices at suhoor and iftar can negate the health benefits of fasting. A sugary suhoor causes an energy crash by mid-morning, while an iftar of fried foods and sweets spikes blood sugar and leaves you sluggish. Strategic nutrition amplifies every benefit of the fast.


**How?**

For suhoor: include slow-digesting protein (eggs, Greek yoghurt), complex carbs (oats, whole grain bread), healthy fats (avocado, nuts), and plenty of water. For iftar: break with dates and water as per the Sunnah, then eat a balanced meal with protein, vegetables, and whole grains. Prepare these meals in advance so you are not making poor choices when hungry.` },
        { title: 'Track energy levels, mood, and focus on fasting vs. non-fasting days', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources emphasize the underlying benefits of fasting and the value of consistent small deeds, they omit specific modern practices like tracking energy, mood, and focus in a daily log, making the subtask a practical logical inference to fulfill the Quranic invitation to consciously "know" the benefits of fasting.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:184",
              arabic: "Ø£ÙŽÙŠÙŽÙ‘Ø§Ù…Ù‹Ø§ Ù…ÙŽÙ‘Ø¹Ù’Ø¯ÙÙˆØ¯ÙŽØ§ØªÙ Ûš ÙÙŽÙ…ÙŽÙ† ÙƒÙŽØ§Ù†ÙŽ Ù…ÙÙ†ÙƒÙÙ… Ù…ÙŽÙ‘Ø±ÙÙŠØ¶Ù‹Ø§ Ø£ÙŽÙˆÙ’ Ø¹ÙŽÙ„ÙŽÙ‰Ù° Ø³ÙŽÙÙŽØ±Ù ÙÙŽØ¹ÙØ¯ÙŽÙ‘Ø©ÙŒ Ù…ÙÙ‘Ù†Ù’ Ø£ÙŽÙŠÙŽÙ‘Ø§Ù…Ù Ø£ÙØ®ÙŽØ±ÙŽ Ûš ÙˆÙŽØ¹ÙŽÙ„ÙŽÙ‰ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠÙ†ÙŽ ÙŠÙØ·ÙÙŠÙ‚ÙÙˆÙ†ÙŽÙ‡Ù ÙÙØ¯Ù’ÙŠÙŽØ©ÙŒ Ø·ÙŽØ¹ÙŽØ§Ù…Ù Ù…ÙØ³Ù’ÙƒÙÙŠÙ†Ù Û– ÙÙŽÙ…ÙŽÙ† ØªÙŽØ·ÙŽÙˆÙŽÙ‘Ø¹ÙŽ Ø®ÙŽÙŠÙ’Ø±Ù‹Ø§ ÙÙŽÙ‡ÙÙˆÙŽ Ø®ÙŽÙŠÙ’Ø±ÙŒ Ù„ÙŽÙ‘Ù‡Ù Ûš ÙˆÙŽØ£ÙŽÙ† ØªÙŽØµÙÙˆÙ…ÙÙˆØ§ Ø®ÙŽÙŠÙ’Ø±ÙŒ Ù„ÙŽÙ‘ÙƒÙÙ…Ù’ Û– Ø¥ÙÙ† ÙƒÙÙ†ØªÙÙ…Ù’ ØªÙŽØ¹Ù’Ù„ÙŽÙ…ÙÙˆÙ†ÙŽ",
              translation: "Fast for a specific number of days, but if one of you is ill, or on a journey, on other days later. For those who can fast only with extreme difficulty, there is a way to compensate â€” feed a needy person. But if anyone does good of his own accord, it is better for him, and fasting is better for you, if only you knew.",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              rationale: "tracking your experience fulfils the Quranic invitation to \"know\" the benefit of fasting through lived, self-aware observation.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6464",
              translation: "The Prophet (SAW) said: \"The most beloved deeds to Allah are those done consistently, even if they are small.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Subjective tracking reveals how fasting actually affects your daily performance. Many people discover that their focus and energy are better on fasting days once adapted â€” data that reinforces the habit and helps you schedule demanding work strategically.


**How?**

Create a simple daily log with three ratings (1-10): energy, mood, and focus. Fill it in at the same time each day â€” mid-afternoon works well. After 4 weeks, compare your fasting-day averages to your non-fasting-day averages. Look for patterns: do you crash in the afternoon on fasting days? Is your morning focus sharper? Use these insights to adjust meal timing and activity scheduling.` },
        { title: 'Gradually add the second day once the first is consistent', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Hadith establishes the Sunnah of fasting on both Mondays and Thursdays, it omits specific habit-building strategies like gradually adding the second day once the first is consistent, making the subtask a practical logical inference to sustainably complete this Prophetic practice.',
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 1162",
              translation: "The Prophet (SAW) was asked about fasting on Mondays and Thursdays. He said: \"Those are two days on which deeds are presented to the Lord of the worlds, and I like my deeds to be presented whilst I am fasting.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Adding the second fasting day completes the Sunnah practice and doubles the health benefits. Doing so only after the first day is established ensures the habit is sustainable rather than a burst of enthusiasm that fades within weeks.


**How?**

Once you have fasted consistently on your chosen day for at least 4 weeks with manageable energy levels, add the second day (Monday if you started with Thursday, or vice versa). Keep your suhoor and iftar templates the same. Monitor your energy and recovery â€” if two days feels too demanding initially, alternate weeks (both days one week, one day the next) until your body fully adapts.` },
      ],
    },
    {
      title: 'Prepare a home emergency medical kit (first aid, medications, contacts)',
      priority: 'medium', tags: ['safety', 'preparation'],
      description: 'Being prepared for medical emergencies is part of responsible stewardship over your household. A well-stocked, accessible first aid kit can prevent minor injuries from becoming serious and buy critical time in emergencies.',
      subtasks: [
        { title: 'Purchase a comprehensive first aid kit or assemble one from a checklist', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources establish the general principles of taking precautions and coupling trust in Allah with practical preparation, they omit specific modern methods like purchasing or assembling a first aid kit, making the subtask a practical logical inference to ensure readiness for medical emergencies.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:71",
              arabic: "ÙŠÙŽØ§ Ø£ÙŽÙŠÙÙ‘Ù‡ÙŽØ§ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠÙ†ÙŽ Ø¢Ù…ÙŽÙ†ÙÙˆØ§ Ø®ÙØ°ÙÙˆØ§ Ø­ÙØ°Ù’Ø±ÙŽÙƒÙÙ…Ù’",
              translation: "O you who have believed, take your precaution.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 2517",
              translation: "The Prophet (SAW) said: \"Tie your camel and then put your trust in Allah.\" (Emphasising preparation alongside tawakkul.)",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

In a medical emergency, every second counts. Having a pre-stocked kit means you are not scrambling to find bandages or antiseptic while someone is bleeding. A comprehensive kit covers the most common household injuries and stabilises situations until professional help arrives.


**How?**

Either purchase a pre-assembled first aid kit rated for household use (available at pharmacies and online) or assemble one using a Red Cross checklist. At minimum, include: adhesive bandages, sterile gauze, medical tape, antiseptic wipes, antibiotic ointment, scissors, tweezers, disposable gloves, a thermometer, and an instant cold pack. Store everything in a clearly labelled, waterproof container.` },
        { title: 'Add household-specific medications (prescriptions, allergy meds, pain relief)', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided source establishes a general divine command to take precautions, it omits specific modern practices like adding household-specific medications to a first aid kit, making the subtask a practical logical inference to ensure one\'s family is adequately prepared for medical emergencies.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:71",
              arabic: "ÙŠÙŽØ§ Ø£ÙŽÙŠÙÙ‘Ù‡ÙŽØ§ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠÙ†ÙŽ Ø¢Ù…ÙŽÙ†ÙÙˆØ§ Ø®ÙØ°ÙÙˆØ§ Ø­ÙØ°Ù’Ø±ÙŽÙƒÙÙ…Ù’",
              translation: "O you who have believed, take your precaution.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A generic first aid kit does not account for your family's specific needs. If someone in your household has allergies, asthma, diabetes, or takes daily prescriptions, having those medications accessible in an emergency could be life-saving.


**How?**

Review the medical needs of every household member. Add a backup supply of critical prescriptions (with doctor approval), antihistamines for allergic reactions, an EpiPen if prescribed, pain relievers (paracetamol, ibuprofen), anti-diarrhoeal medication, and any other household-specific needs. Label each medication clearly with the name, dosage, and expiration date.` },
        { title: 'Include an emergency contacts card (doctor, hospital, poison control, family)', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources establish the broad divine principles of taking precautions and relieving others\' hardships, they omit specific modern methods like creating an emergency contacts card, making the subtask a practical logical inference to ensure a swift medical response during a crisis.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:71",
              arabic: "ÙŠÙŽØ§ Ø£ÙŽÙŠÙÙ‘Ù‡ÙŽØ§ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠÙ†ÙŽ Ø¢Ù…ÙŽÙ†ÙÙˆØ§ Ø®ÙØ°ÙÙˆØ§ Ø­ÙØ°Ù’Ø±ÙŽÙƒÙÙ…Ù’",
              translation: "O you who have believed, take your precaution.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (SAW) said: \"Whoever relieves a believer of a hardship in this world, Allah will relieve him of a hardship on the Day of Resurrection.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

In a crisis, stress impairs memory. Even phone numbers you know by heart can vanish under pressure. A physical emergency contacts card inside the kit ensures anyone â€” including babysitters, guests, or older children â€” can quickly reach the right people.


**How?**

Write or print a card with: your family doctor's phone number, the nearest hospital emergency department, poison control hotline, local ambulance number, and 2-3 emergency family contacts. Laminate it if possible for durability. Place one copy inside the first aid kit and tape another to the inside of a kitchen cabinet. Update it whenever a number changes.` },
        { title: 'Store the kit in an accessible, known location and inform all household members', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources establish the general principles of taking precautions and coupling trust in Allah with practical preparation, they omit specific modern instructions like storing a first aid kit in an accessible location, making the subtask a practical logical inference to ensure the emergency equipment is actually useful in a crisis.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:71",
              arabic: "ÙŠÙŽØ§ Ø£ÙŽÙŠÙÙ‘Ù‡ÙŽØ§ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠÙ†ÙŽ Ø¢Ù…ÙŽÙ†ÙÙˆØ§ Ø®ÙØ°ÙÙˆØ§ Ø­ÙØ°Ù’Ø±ÙŽÙƒÙÙ…Ù’",
              translation: "O you who have believed, take your precaution.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 2517",
              translation: "The Prophet (SAW) said: \"Tie your camel and then put your trust in Allah.\"",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A first aid kit hidden in a closet nobody can find is useless in an emergency. Accessibility and awareness are just as important as the contents â€” every household member should be able to locate and open the kit within 30 seconds.


**How?**

Choose a central, accessible location â€” a kitchen cabinet, hallway closet, or bathroom shelf at an easy-to-reach height. Avoid locations that are locked, high up, or in a room that is frequently occupied. Walk every household member to the kit and show them where it is and what is inside. For children, teach them how to find it and call for help.` },
        { title: 'Set a 6-month reminder to check expiration dates and restock supplies', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Hadith explicitly commands believers to make use of medical treatments and remedies, it omits specific modern administrative steps like setting a 6-month reminder to check expiration dates, making the subtask a practical logical inference to ensure those medical supplies remain safe and effective when needed.',
          sources: [
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 2038",
              translation: "The Prophet (SAW) said: \"Make use of medical treatment, for Allah has not made a disease without appointing a remedy for it, except for one disease â€” old age.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Medications expire, bandages degrade, and supplies get used without being replaced. A kit that has not been checked in years may fail you when it matters most. Regular maintenance keeps the kit reliable and ready.


**How?**

Set a recurring calendar reminder every six months â€” a good anchor is the start of Ramadan and six months after. When the reminder fires, open the kit and check every item: discard expired medications and replace them, restock any used bandages or supplies, and verify the emergency contacts card is current. The entire check takes less than 15 minutes.` },
      ],
    },
    {
      title: "Qaylulah â€” implement the prophetic midday rest",
      priority: "medium", tags: ["rest", "sleep", "sunnah", "transition:qaylulah"],
      description: "Qaylulah is the brief midday rest the Prophet (SAW) and his companions practised before Dhuhr. Allah names sleep among His signs, and a short midday pause restores afternoon alertness and offsets the sleep debt that night-prayer practice accumulates. The companions treated qaylulah as fuel for ibadah, not an alternative to it.",
      subtasks: [
        { title: "Schedule a 15-30 minute midday rest 5 days this week", done: false,
          tier: "T1",
          amanahRationale: "The Quranic ayah identifies daytime sleep as among Allah's signs, and the cited hasan hadith from al-Tabarani's al-Mu'jam al-Awsat directly recommends qaylulah; together they ground the core establishment subtask.",
          sources: [
            {
              kind: "quran",
              ref: "Quran 30:23",
              arabic: "ÙˆÙŽÙ…ÙÙ†Ù’ Ø¢ÙŠÙŽØ§ØªÙÙ‡Ù Ù…ÙŽÙ†ÙŽØ§Ù…ÙÙƒÙÙ… Ø¨ÙØ§Ù„Ù„ÙŽÙ‘ÙŠÙ’Ù„Ù ÙˆÙŽØ§Ù„Ù†ÙŽÙ‘Ù‡ÙŽØ§Ø±Ù ÙˆÙŽØ§Ø¨Ù’ØªÙØºÙŽØ§Ø¤ÙÙƒÙÙ… Ù…ÙÙ‘Ù† ÙÙŽØ¶Ù’Ù„ÙÙ‡Ù Ûš Ø¥ÙÙ†ÙŽÙ‘ ÙÙÙŠ Ø°ÙŽÙ°Ù„ÙÙƒÙŽ Ù„ÙŽØ¢ÙŠÙŽØ§ØªÙ Ù„ÙÙ‘Ù‚ÙŽÙˆÙ’Ù…Ù ÙŠÙŽØ³Ù’Ù…ÙŽØ¹ÙÙˆÙ†ÙŽ",
              translation: "Among His signs are your sleep, by night and by day, and your seeking His bounty. There truly are signs in this for those who can hear.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Allah explicitly names daytime sleep among His signs alongside night-sleep â€” direct Quranic affirmation of qaylulah as a designed-into-creation pattern.",
            },
            {
              kind: "hadith",
              ref: "al-Tabarani al-Mu'jam al-Awsat 5662",
              translation: "The Prophet (SAW) said: \"Take a midday nap, for the shayateen do not take a midday nap.\"",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              ratNote: "Verified 2026-04-26 â€” al-Tabarani al-Mu'jam al-Awsat 5662 is not indexed on sunnah.com (sunnah.com hosts Adab al-Mufrad 1239â€“1240 on qaylulah but not Tabarani's Awsat collection); the qaylulah hadith 'qilu fa-inna al-shayatina la taqilu' is graded hasan by al-Albani in Sahih al-Jami al-Saghir 4431, which is the standard secondary canonical anchor.",
              rationale: "Direct prophetic recommendation of qaylulah, framed as a sunnah that distinguishes the believer's rhythm from shaytan's â€” the operative ground for establishing the practice.",
            },
          ],
          description: `**Why?**

Qaylulah is one of the rare practices where prophetic guidance and modern sleep science converge entirely. The Prophet (SAW) recommended it; nap research consistently shows 15-30 minute midday naps improve cognitive performance, mood, and afternoon alertness without disrupting nighttime sleep.

**How?**

1. Block 15-30 minutes between 12:00 and 13:30 in your calendar â€” title it "Qaylulah".
2. The window must close before Dhuhr so qaylulah does not eat into prayer time.
3. Use a sleep mask or dim the room. Set an alarm. Lie on your right side.
4. If you cannot sleep, lie quietly with eyes closed â€” the rest itself is the sunnah.
5. Benchmark: 5 of 7 days for two consecutive weeks.` },
        { title: "Use qaylulah strategically to enable qiyam al-layl", done: false,
          tier: "T2",
          amanahRationale: "The cited ayah praises those who remember Allah lying down across day and night; qaylulah's classical function is to offset the sleep debt that night prayer creates â€” contextual, not direct, application.",
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:190-191",
              arabic: "Ø¥ÙÙ†ÙŽÙ‘ ÙÙÙŠ Ø®ÙŽÙ„Ù’Ù‚Ù Ø§Ù„Ø³ÙŽÙ‘Ù…ÙŽØ§ÙˆÙŽØ§ØªÙ ÙˆÙŽØ§Ù„Ù’Ø£ÙŽØ±Ù’Ø¶Ù ÙˆÙŽØ§Ø®Ù’ØªÙÙ„ÙŽØ§ÙÙ Ø§Ù„Ù„ÙŽÙ‘ÙŠÙ’Ù„Ù ÙˆÙŽØ§Ù„Ù†ÙŽÙ‘Ù‡ÙŽØ§Ø±Ù Ù„ÙŽØ¢ÙŠÙŽØ§ØªÙ Ù„ÙÙ‘Ø£ÙÙˆÙ„ÙÙŠ Ø§Ù„Ù’Ø£ÙŽÙ„Ù’Ø¨ÙŽØ§Ø¨Ù Û Ø§Ù„ÙŽÙ‘Ø°ÙÙŠÙ†ÙŽ ÙŠÙŽØ°Ù’ÙƒÙØ±ÙÙˆÙ†ÙŽ Ø§Ù„Ù„ÙŽÙ‘Ù‡ÙŽ Ù‚ÙÙŠÙŽØ§Ù…Ù‹Ø§ ÙˆÙŽÙ‚ÙØ¹ÙÙˆØ¯Ù‹Ø§ ÙˆÙŽØ¹ÙŽÙ„ÙŽÙ‰Ù° Ø¬ÙÙ†ÙÙˆØ¨ÙÙ‡ÙÙ…Ù’",
              translation: "There truly are signs in the creation of the heavens and earth, and in the alternation of night and day, for those with understanding, who remember God standing, sitting, and lying down.",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              rationale: "The Quran praises those whose dhikr spans every posture across day and night â€” qaylulah is the sleep that makes lying-down dhikr in the last third of the night sustainable.",
            },
          ],
          description: `**Why?**

Tahajjud is biologically expensive. The classical scholars treated qaylulah as the engine that funds it: a 20-minute midday rest offsets enough sleep debt to make 2-3am wakings sustainable for years rather than weeks. If you have ever started qiyam strong and burnt out by month 2, the missing piece was almost certainly the daytime nap.

**How?**

1. If you currently pray tahajjud, log your wake-time and energy on days you nap vs. days you do not.
2. If you do not yet pray tahajjud, install qaylulah first for one month, then start tahajjud â€” you will compound the habit much more reliably.
3. Treat qaylulah as a fixed input, not a luxury you cut on busy days. Busy days are when you need it most.
4. Benchmark: tahajjud sustained 4+ nights/week with qaylulah on the same days, for one full month.` },
        { title: "Optimise the qaylulah environment â€” dark, quiet, brief", done: false,
          tier: "T2",
          amanahRationale: "Sleep-quality optimisation is contextual application of the broader Quranic framing of sleep as a sign and mercy; the specific environmental controls do not appear in revelation but follow from treating the rest as ibadah.",
          sources: [
            {
              kind: "quran",
              ref: "Quran 25:47",
              arabic: "ÙˆÙŽÙ‡ÙÙˆÙŽ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠ Ø¬ÙŽØ¹ÙŽÙ„ÙŽ Ù„ÙŽÙƒÙÙ…Ù Ø§Ù„Ù„ÙŽÙ‘ÙŠÙ’Ù„ÙŽ Ù„ÙØ¨ÙŽØ§Ø³Ù‹Ø§ ÙˆÙŽØ§Ù„Ù†ÙŽÙ‘ÙˆÙ’Ù…ÙŽ Ø³ÙØ¨ÙŽØ§ØªÙ‹Ø§ ÙˆÙŽØ¬ÙŽØ¹ÙŽÙ„ÙŽ Ø§Ù„Ù†ÙŽÙ‘Ù‡ÙŽØ§Ø±ÙŽ Ù†ÙØ´ÙÙˆØ±Ù‹Ø§",
              translation: "It is He who made the night a garment for you, and sleep a rest, and made the day like a resurrection.",
              relevance: "thematic",
              provenanceTier: "Bayyinah",
              rationale: "The Quran identifies sleep as a designed mercy of rest â€” environmental controls are contextual application that honours the design.",
            },
          ],
          description: `**Why?**

A 20-minute nap in a noisy, bright room delivers maybe 5 minutes of actual restorative rest. The same 20 minutes in a dark, cool, quiet space delivers near the full benefit. The cost of optimising the environment once is paid back every day for the rest of your career.

**How?**

1. Choose the same location every day â€” a couch, a bedroom, even a parked car at lunch.
2. Block light: blackout curtains, sleep mask, or a hoodie pulled over your eyes.
3. Block sound: foam earplugs cost $5 and remove the highest disruptor.
4. Cap duration at 30 minutes â€” beyond that you enter deep sleep and wake groggy.
5. Benchmark: you wake refreshed without needing the alarm 4 of 5 nap days.` },
        { title: "Set the niyyah â€” qaylulah as ibadah, not laziness", done: false,
          tier: "T2",
          amanahRationale: "The foundational hadith of niyyah governs every action â€” naming qaylulah as a sunnah enacted in obedience is direct application of the universal rule.",
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1",
              translation: "Umar ibn al-Khattab (RA) reported: The Messenger of Allah (SAW) said: \"Actions are but by intentions, and every man shall have only that which he intended.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "The foundational hadith of niyyah governs every action â€” qaylulah without intention is rest; with intention it becomes a sunnah enacted in obedience.",
            },
          ],
          description: `**Why?**

The hadith of niyyah is the universal lever â€” it transforms the same 20 minutes of horizontal stillness into either nothing or worship. Without the intention, qaylulah is a habit you may eventually feel guilty about. With it, qaylulah is a daily act of obedience to a sunnah of the Prophet (SAW).

**How?**

Before lying down, silently say: "Ya Allah, I take this rest as a sunnah of Your Messenger (SAW), and to fuel my qiyam tonight." Keep the formula short so it survives drowsiness. After two weeks the niyyah becomes automatic.` },
      ],
    },
  ],
  health_physical_excellence: [
    {
      title: 'Implement a nutrient-timing protocol (pre/post workout, suhoor/iftar optimisation)',
      priority: 'medium', tags: ['nutrition', 'performance'],
      description: 'Nutrient timing optimises when you eat specific macronutrients to maximise energy, recovery, and body composition. For Muslims, this also means strategically planning suhoor and iftar nutrition during Ramadan and voluntary fasts for sustained performance.',
      subtasks: [
        { title: 'Learn the basics of macronutrient timing (protein, carbs, fats) around training', done: false,
          tier: 'T3',
          amanahRationale: 'While the provided sources emphasize the general spiritual and physical principles of moderation and portion control in eating, they offer neither explicit proof nor contextual indication for the highly specific modern practice of macronutrient timing around physical training.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 7:31",
              arabic: "ÙƒÙÙ„ÙÙˆØ§ ÙˆÙŽØ§Ø´Ù’Ø±ÙŽØ¨ÙÙˆØ§ ÙˆÙŽÙ„ÙŽØ§ ØªÙØ³Ù’Ø±ÙÙÙÙˆØ§",
              translation: "Eat and drink, but be not excessive.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Ibn Majah 3349",
              translation: "The Prophet (SAW) said: \"The son of Adam does not fill any vessel worse than his stomach. It is sufficient for the son of Adam to eat a few mouthfuls to keep him going. If he must do that, then one-third for food, one-third for drink, and one-third for air.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Eating the right macronutrient at the right time can significantly improve workout performance and recovery. Carbohydrates before training fuel intensity; protein after training accelerates muscle repair. Without this knowledge, your nutrition may be working against your training efforts.


**How?**

Study the three key windows: (1) Pre-workout (1-2 hours before) â€” focus on easily digestible carbs and moderate protein, (2) Post-workout (within 1 hour after) â€” prioritise protein with some carbs for recovery, (3) General meals â€” balanced macros spread throughout the day. Read 2-3 articles from reputable sports nutrition sources to understand the principles before designing your own templates.` },
        { title: 'Design a pre-workout and post-workout meal template', done: false,
          tier: 'T3',
          amanahRationale: 'While the provided source emphasizes the general Islamic principle of moderation in eating and portion control, it offers neither explicit proof nor contextual indication for the highly specific modern fitness practice of designing pre-workout and post-workout meal templates.',
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5376",
              translation: "The Prophet (peace be upon him) said: \"The son of Adam does not fill any vessel worse than his stomach. It is sufficient for the son of Adam to eat a few mouthfuls to keep him alive. If he must fill it, then one-third for food, one-third for drink, and one-third for air.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Having a meal template eliminates daily decision-making about what to eat around training. When the template is dialled in, you show up to every workout properly fuelled and recover optimally afterward â€” consistency that compounds into visible results over months.


**How?**

Create two simple templates. Pre-workout (1-2 hours before): pick 2-3 go-to meals â€” for example, oats with banana and honey, or rice with chicken. Post-workout (within 60 minutes): pick 2-3 protein-rich options â€” for example, a protein shake with fruit, or eggs with toast. Write these on a card and keep it on your fridge. Rotate between options to prevent boredom while maintaining nutritional consistency.` },
        { title: 'Create an optimised suhoor meal plan for fasting days (slow-digesting, hydrating)', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources explicitly command taking suhoor and highlight its inherent blessings, they omit specific modern nutritional guidelines, making the subtask a practical logical inference to physically sustain the fast and maximize the benefits of this Prophetic practice.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:184",
              arabic: "Ø£ÙŽÙŠÙŽÙ‘Ø§Ù…Ù‹Ø§ Ù…ÙŽÙ‘Ø¹Ù’Ø¯ÙÙˆØ¯ÙŽØ§ØªÙ Ûš ÙÙŽÙ…ÙŽÙ† ÙƒÙŽØ§Ù†ÙŽ Ù…ÙÙ†ÙƒÙÙ… Ù…ÙŽÙ‘Ø±ÙÙŠØ¶Ù‹Ø§ Ø£ÙŽÙˆÙ’ Ø¹ÙŽÙ„ÙŽÙ‰Ù° Ø³ÙŽÙÙŽØ±Ù ÙÙŽØ¹ÙØ¯ÙŽÙ‘Ø©ÙŒ Ù…ÙÙ‘Ù†Ù’ Ø£ÙŽÙŠÙŽÙ‘Ø§Ù…Ù Ø£ÙØ®ÙŽØ±ÙŽ Ûš ÙˆÙŽØ¹ÙŽÙ„ÙŽÙ‰ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠÙ†ÙŽ ÙŠÙØ·ÙÙŠÙ‚ÙÙˆÙ†ÙŽÙ‡Ù ÙÙØ¯Ù’ÙŠÙŽØ©ÙŒ Ø·ÙŽØ¹ÙŽØ§Ù…Ù Ù…ÙØ³Ù’ÙƒÙÙŠÙ†Ù Û– ÙÙŽÙ…ÙŽÙ† ØªÙŽØ·ÙŽÙˆÙŽÙ‘Ø¹ÙŽ Ø®ÙŽÙŠÙ’Ø±Ù‹Ø§ ÙÙŽÙ‡ÙÙˆÙŽ Ø®ÙŽÙŠÙ’Ø±ÙŒ Ù„ÙŽÙ‘Ù‡Ù Ûš ÙˆÙŽØ£ÙŽÙ† ØªÙŽØµÙÙˆÙ…ÙÙˆØ§ Ø®ÙŽÙŠÙ’Ø±ÙŒ Ù„ÙŽÙ‘ÙƒÙÙ…Ù’ Û– Ø¥ÙÙ† ÙƒÙÙ†ØªÙÙ…Ù’ ØªÙŽØ¹Ù’Ù„ÙŽÙ…ÙÙˆÙ†ÙŽ",
              translation: "Fast for a specific number of days, but if one of you is ill, or on a journey, on other days later. For those who can fast only with extreme difficulty, there is a way to compensate â€” feed a needy person. But if anyone does good of his own accord, it is better for him, and fasting is better for you, if only you knew.",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              rationale: "the command to fast implies preparing the body well for it, including nourishing suhoor planning.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1923",
              translation: "The Prophet (SAW) said: \"Take suhoor, for in suhoor there is barakah (blessing).\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Suhoor is your fuel tank for the entire fasting day. A poorly planned suhoor â€” or skipping it entirely â€” leads to energy crashes, poor focus, and unnecessary suffering. The Prophet (SAW) emphasised the barakah of suhoor, and optimising it honours both the spiritual and physical dimensions of fasting.


**How?**

Design 3-4 rotating suhoor meals built around slow-digesting foods: complex carbs (oats, whole grain bread), protein (eggs, Greek yoghurt, cheese), healthy fats (avocado, nuts, olive oil), and hydrating foods (cucumber, watermelon). Drink at least 500ml of water at suhoor. Avoid high-sugar and high-salt foods that spike thirst. Prep ingredients the night before so suhoor takes under 10 minutes.` },
        { title: 'Create an optimised iftar meal plan (quick energy, then balanced nutrition)', done: false,
          tier: 'T3',
          amanahRationale: 'While the provided source establishes the timeframe for permissible eating and drinking until dawn, it offers neither explicit proof nor contextual indication for the highly specific modern practice of designing a two-phase, nutritionally optimized iftar meal plan.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:187",
              arabic: "ÙˆÙŽÙƒÙÙ„ÙÙˆØ§ ÙˆÙŽØ§Ø´Ù’Ø±ÙŽØ¨ÙÙˆØ§ Ø­ÙŽØªÙŽÙ‘Ù‰Ù° ÙŠÙŽØªÙŽØ¨ÙŽÙŠÙŽÙ‘Ù†ÙŽ Ù„ÙŽÙƒÙÙ…Ù Ø§Ù„Ù’Ø®ÙŽÙŠÙ’Ø·Ù Ø§Ù„Ù’Ø£ÙŽØ¨Ù’ÙŠÙŽØ¶Ù Ù…ÙÙ†ÙŽ Ø§Ù„Ù’Ø®ÙŽÙŠÙ’Ø·Ù Ø§Ù„Ù’Ø£ÙŽØ³Ù’ÙˆÙŽØ¯Ù Ù…ÙÙ†ÙŽ Ø§Ù„Ù’ÙÙŽØ¬Ù’Ø±Ù",
              translation: "And eat and drink until the white thread of dawn becomes distinct to you from the black thread of night.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The way you break your fast determines how quickly your body recovers and how well you perform for Maghrib and Isha prayers. Overeating heavy, fried food at iftar causes sluggishness, bloating, and defeats the health benefits of the fast.


**How?**

Follow the Sunnah two-phase approach: Phase 1 â€” break with dates and water to restore blood sugar gently. Phase 2 â€” after Maghrib prayer, eat a balanced meal with protein, vegetables, and complex carbs. Design 5-7 rotating iftar menus to cover the week. Keep portions moderate â€” you can eat again before bed if needed. Prep meals in advance to avoid the temptation of ordering takeaway when hungry.` },
        { title: 'Test and refine the protocol over 30 days, tracking energy and recovery', done: false,
          tier: 'T3',
          amanahRationale: 'While the provided Hadith encourages the broad, general principle of striving for what is beneficial, it offers neither explicit proof nor contextual indication for the highly specific modern practice of tracking and refining a nutrition protocol over a 30-day period.',
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (peace be upon him) said: \"Strive for that which will benefit you, seek the help of Allah, and do not be helpless.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Nutrition science provides general principles, but your body is unique. A 30-day test period reveals what actually works for you â€” which meal timing gives you peak energy, which foods sit well before training, and how your recovery responds to post-workout nutrition changes.


**How?**

Follow your nutrient-timing templates consistently for 30 days. Each day, rate your workout energy (1-10), recovery quality (1-10), and any digestive comfort issues. At day 15 and day 30, review your data and make adjustments: swap foods that cause discomfort, shift meal timing if energy dips at certain points, and fine-tune portion sizes. The goal is a personalised protocol you can sustain long-term.` },
      ],
    },
    {
      title: 'Learn and practise an active Sunnah sport (swimming, archery, or horse riding)',
      priority: 'low', tags: ['sunnah', 'fitness'],
      description: 'Umar (RA) said: "Teach your children swimming, archery, and horse riding." These sports build confidence, discipline, and physical capability. Pursuing them honours the Sunnah and develops skills that connect you to a tradition of strength and readiness.',
      subtasks: [
        { title: 'Research local facilities or clubs offering swimming, archery, or horse riding', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Hadiths explicitly encourage the practices of archery, swimming, and horse riding, they omit specific modern instructions on how to locate facilities, making the subtask a practical logical inference to facilitate learning and engaging in these Prophetic sports.',
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 1918",
              translation: "The Prophet (SAW) said: \"Practise archery and horse riding.\" And he said: \"Everything in which there is no remembrance of Allah is idle play, except four: a man training his horse, a man walking between two targets (archery), a man learning to swim, and a man teaching his family.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 2574",
              translation: "The Prophet (SAW) encouraged physical activities that build strength and skill, particularly archery, swimming, and horse riding.",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Knowing what is available locally turns an aspiration into a concrete plan. Many people assume these sports are inaccessible, but most cities have swimming pools, archery ranges, and equestrian centres within reasonable distance â€” you just need to find them.


**How?**

Search online for swimming pools, archery clubs, and horse riding stables within 30 minutes of your home. Check community centres, university facilities, and parks departments â€” they often offer affordable options. Read reviews, compare prices, and note beginner-friendly options. If Muslim-specific facilities exist (women-only swimming sessions, for example), prioritise those.` },
        { title: 'Enrol in a beginner course or find an experienced instructor', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Hadith explicitly encourages learning and practicing the skills of archery, swimming, and horse training, it omits specific modern methods of acquiring them, making the subtask a practical logical inference to safely and effectively master these Prophetic sports through proper instruction.',
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 1918",
              translation: "The Prophet (SAW) said: \"Everything in which there is no remembrance of Allah is idle play, except four: a man training his horse, a man walking between two targets (archery), a man learning to swim, and a man teaching his family.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Proper instruction from the start prevents bad habits, reduces injury risk, and accelerates your learning curve dramatically. Self-teaching swimming, archery, or horse riding is not only slower but potentially dangerous.


**How?**

Contact the facility you identified and ask about beginner courses â€” most offer structured multi-week programmes. If group classes are unavailable, book private lessons with a certified instructor. For swimming, look for adult beginner classes if you are not yet confident in water. Commit to at least 8 sessions before evaluating whether to continue or switch to a different sport.` },
        { title: 'Commit to a regular practice schedule (weekly minimum)', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Hadith establishes the broad principle of striving for strength and actively pursuing what is beneficial, it omits specific administrative instructions like committing to a weekly practice schedule, making the subtask a practical logical inference to systematically achieve that Prophetic ideal.',
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2664",
              translation: "The Prophet (SAW) said: \"The strong believer is better and more beloved to Allah than the weak believer, and in each there is good. Be keen on what benefits you.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Skill development requires consistent repetition. Practising once a month yields almost no improvement, while weekly sessions create a compounding learning curve. A fixed schedule also signals to yourself and your family that this is a priority, not a hobby you will drop.


**How?**

Block one specific day and time per week for your chosen sport â€” treat it like an appointment you cannot cancel. If possible, find a training partner for mutual accountability. Start with one session per week; add a second session once the first is firmly established. Keep your gear ready to go so logistics never become an excuse to skip.` },
        { title: 'Set a 90-day proficiency goal for your chosen sport', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Hadith establishes the broad principles of gradual mastery and consistent training in Prophetic sports, it omits specific modern frameworks like setting a 90-day proficiency goal, making the subtask a practical logical inference to systematically achieve that ideal.',
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2908",
              translation: "The Prophet (SAW) said: \"Practise archery and practise riding.\" He would encourage gradual mastery and consistent training.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A specific proficiency goal gives your practice direction and a measurable finish line. Without it, you risk drifting through sessions without clear progress, which erodes motivation over time.


**How?**

Define a concrete, testable goal for 90 days out. For swimming: "Swim 500 metres continuously without stopping." For archery: "Consistently hit the target ring at 18 metres." For horse riding: "Confidently walk, trot, and canter independently." Write your goal down, share it with your instructor, and review progress monthly. Adjust if needed at the 45-day mark.` },
        { title: 'Consider involving family members to make it a shared Sunnah practice', done: false,
          tier: 'T1',
          amanahRationale: 'The provided source explicitly includes "a man teaching his family" among praiseworthy physical activities, offering direct and clear proof for the core directive of the subtask to involve family members.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 66:6",
              arabic: "ÙŠÙŽØ§ Ø£ÙŽÙŠÙÙ‘Ù‡ÙŽØ§ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠÙ†ÙŽ Ø¢Ù…ÙŽÙ†ÙÙˆØ§ Ù‚ÙÙˆØ§ Ø£ÙŽÙ†ÙÙØ³ÙŽÙƒÙÙ…Ù’ ÙˆÙŽØ£ÙŽÙ‡Ù’Ù„ÙÙŠÙƒÙÙ…Ù’ Ù†ÙŽØ§Ø±Ù‹Ø§",
              translation: "O you who have believed, protect yourselves and your families from a Fire.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 1918",
              translation: "The Prophet (SAW) included \"a man teaching his family\" among the praiseworthy physical activities, encouraging family participation in beneficial pursuits.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The hadith about teaching children swimming, archery, and horse riding is fundamentally about family development. Practising together builds bonds, creates shared memories, and fulfils the Prophetic instruction to raise physically capable, confident children.


**How?**

Invite your spouse or children to join you for a session. Many facilities offer family packages or parent-child classes. Start with the most accessible option â€” a family swim session is easier to arrange than horse riding for young children. If family members are hesitant, let them watch you first, then invite them to try. Even if they choose a different sport, the culture of physical activity in your household grows.` },
      ],
    },
    {
      title: 'Develop a peak-performance body composition target and 90-day plan',
      priority: 'low', tags: ['fitness', 'planning'],
      description: 'Moving beyond basic health to peak physical performance is a form of ihsan (excellence) in stewardship of the body. Setting a clear body composition target with a structured plan brings intentionality and measurement to your physical development.',
      subtasks: [
        { title: 'Measure current body composition (weight, body fat %, key measurements)', done: false,
          tier: 'T3',
          amanahRationale: 'While the provided Hadiths emphasize the general Islamic principles of valuing strength and health, they offer neither explicit proof nor contextual indication for the highly specific modern fitness practice of measuring and tracking detailed body composition metrics.',
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2664",
              translation: "The Prophet (SAW) said: \"The strong believer is better and more beloved to Allah than the weak believer, and in each there is good.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 2346",
              translation: "The Prophet (SAW) said: \"There are two blessings which many people are deceived about: health and free time.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

You need a precise starting point to set a realistic target and track meaningful progress. Scale weight alone is misleading â€” two people at the same weight can look completely different based on muscle-to-fat ratio. Body composition measurement gives you the full picture.


**How?**

Weigh yourself first thing in the morning after using the bathroom. Measure body fat percentage using a skinfold caliper, bioimpedance scale, or DEXA scan (most accurate). Take key body measurements with a tape measure: chest, waist, hips, arms, and thighs. Record everything in a spreadsheet or journal. Take front, side, and back photos in consistent lighting â€” these are often more telling than numbers.` },
        { title: 'Set a realistic 90-day target based on your goals and starting point', done: false,
          tier: 'T3',
          amanahRationale: 'While the provided Hadith emphasizes the broad, general Islamic principles of valuing strength and striving for what is beneficial, it offers neither explicit proof nor contextual indication for the highly specific modern fitness practice of setting a realistic 90-day target based on physiological benchmarks.',
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2664",
              translation: "The Prophet (SAW) said: \"The strong believer is better and more beloved to Allah than the weak believer, and in each there is good. Be keen on what benefits you, seek help from Allah, and do not give up.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Unrealistic targets lead to extreme measures (crash diets, overtraining) that are unsustainable and often harmful. A realistic target based on your actual starting point keeps you motivated with achievable milestones while protecting your health.


**How?**

Use evidence-based benchmarks: healthy fat loss is 0.5-1 kg per week; muscle gain for beginners is roughly 1-2 kg per month. Based on your starting measurements and goal (fat loss, muscle gain, or recomposition), calculate what is achievable in 90 days. Write your target as a specific number: "Reach 18% body fat" or "Add 3 kg of lean mass." Share the target with your training partner or coach for accountability.` },
        { title: 'Design or select a training programme aligned with the target', done: false,
          tier: 'T3',
          amanahRationale: 'While the provided Hadith emphasizes the broad, general Islamic principles of valuing strength and striving for what is beneficial, it offers neither explicit proof nor contextual indication for the highly specific modern fitness practice of designing a targeted, multi-day training program based on body composition goals.',
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (peace be upon him) said: \"A strong believer is better and more beloved to Allah than a weak believer, while there is good in both. Strive for that which will benefit you.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Different body composition goals require different training approaches. A fat-loss goal benefits from a combination of resistance training and moderate cardio, while a muscle-gain goal prioritises progressive overload with adequate volume. Mismatching your programme to your goal wastes time and effort.


**How?**

If your goal is fat loss: choose a 3-4 day resistance programme with 2 days of moderate cardio (walking, cycling). If your goal is muscle gain: choose a 4-day upper/lower or push/pull/legs split focused on compound lifts with progressive overload. Search for reputable programmes online or consult a certified trainer. Ensure the programme fits your schedule and equipment access.` },
        { title: 'Create a nutrition plan with caloric and macronutrient targets', done: false,
          tier: 'T3',
          amanahRationale: 'While the provided Quranic verse establishes the broad principle of avoiding excess in eating and drinking, it offers neither explicit proof nor contextual indication for the highly specific modern fitness practice of creating a nutrition plan based on precise caloric and macronutrient targets.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 7:31",
              arabic: "ÙˆÙŽÙƒÙÙ„ÙÙˆØ§ ÙˆÙŽØ§Ø´Ù’Ø±ÙŽØ¨ÙÙˆØ§ ÙˆÙŽÙ„ÙŽØ§ ØªÙØ³Ù’Ø±ÙÙÙÙˆØ§ Ø¥ÙÙ†ÙŽÙ‘Ù‡Ù Ù„ÙŽØ§ ÙŠÙØ­ÙØ¨ÙÙ‘ Ø§Ù„Ù’Ù…ÙØ³Ù’Ø±ÙÙÙÙŠÙ†ÙŽ",
              translation: "And eat and drink, but be not excessive. Indeed, He likes not those who commit excess.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Training without a nutrition plan is like building without blueprints. Your caloric balance determines whether you gain or lose weight, and your macronutrient split determines what that weight is made of â€” muscle or fat. Precision here accelerates results dramatically.


**How?**

Calculate your Total Daily Energy Expenditure (TDEE) using an online calculator. For fat loss, subtract 300-500 calories; for muscle gain, add 200-300 calories. Set macros: protein at 1.6-2.2g per kg of bodyweight, fats at 0.8-1g per kg, and fill remaining calories with carbs. Plan your meals around these targets using a food tracking app for the first 2-3 weeks until you can estimate portions intuitively.` },
        { title: 'Schedule bi-weekly progress check-ins with measurements and photos', done: false,
          tier: 'T3',
          amanahRationale: 'While the provided Hadith emphasizes the general Islamic principle of taking advantage of one\'s health and youth, it offers neither explicit proof nor contextual indication for the highly specific modern fitness practice of scheduling bi-weekly progress check-ins with measurements and photos.',
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2664",
              translation: "The Prophet (peace be upon him) said: \"Take advantage of five before five: your youth before your old age, your health before your sickness.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Body composition changes happen gradually and are hard to notice in the mirror day-to-day. Bi-weekly measurements and photos create objective data points that reveal trends your eyes might miss, keeping you motivated and informed.


**How?**

Set a recurring bi-weekly reminder (every other Sunday morning works well). Each check-in: weigh yourself under the same conditions, retake body measurements, and take comparison photos in the same lighting and clothing. Log everything alongside your previous entries. Look for trends over 4+ weeks rather than reacting to any single data point â€” fluctuations are normal.` },
        { title: 'Review and adjust the plan at the 45-day midpoint', done: false,
          tier: 'T3',
          amanahRationale: 'While the provided Quranic verses offer a general spiritual reassurance that ease accompanies hardship, they provide neither explicit proof nor contextual indication for the highly specific modern fitness practice of reviewing and adjusting a 90-day training and nutrition plan at a 45-day midpoint.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 94:5-6",
              arabic: "ÙÙŽØ¥ÙÙ†ÙŽÙ‘ Ù…ÙŽØ¹ÙŽ Ø§Ù„Ù’Ø¹ÙØ³Ù’Ø±Ù ÙŠÙØ³Ù’Ø±Ù‹Ø§ Ø¥ÙÙ†ÙŽÙ‘ Ù…ÙŽØ¹ÙŽ Ø§Ù„Ù’Ø¹ÙØ³Ù’Ø±Ù ÙŠÙØ³Ù’Ø±Ù‹Ø§",
              translation: "For indeed, with hardship will be ease. Indeed, with hardship will be ease.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The 45-day mark is the natural inflection point of a 90-day plan. By this point, you have enough data to see whether your approach is working, stalling, or needs correction. Adjusting at the midpoint prevents wasting the second half of the plan on a strategy that is not delivering results.


**How?**

At day 45, review all your data: compare your current measurements and photos to your starting point and your target. Ask: Am I on track to hit my 90-day goal? If yes, continue with the current plan. If progress has stalled: increase training volume slightly, tighten nutrition adherence, or adjust caloric targets by 100-200 calories. If you are ahead of schedule, consider whether to maintain the pace or set a more ambitious target.` },
      ],
    },
  ],

  // â”€â”€ MENTAL WELL-BEING â”€â”€
  health_mental_core: [
    {
      title: 'Establish a morning routine: Fajr â†’ Quran (minimum 1 page) â†’ morning adhkar â†’ journal',
      priority: 'urgent', tags: ['routine', 'adhkar'],
      description: 'How you start your morning determines the quality of your entire day. This Prophetic morning sequence â€” prayer, Quran, remembrance of Allah, and self-reflection â€” anchors your mind in purpose and protects against anxiety and aimlessness.',
      subtasks: [
        { title: 'Write out the exact sequence and estimated time for each element', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources establish the core spiritual elements of the morning routineâ€”prayer, Quran recitation, and adhkarâ€”and introduce the general concept of allocating specific portions of time for worship, they omit specific modern administrative methods like writing down an exact sequence with estimated minutes, making the subtask a practical logical inference to systematically implement these practices.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 73:1-4",
              arabic: "ÙŠÙŽØ§ Ø£ÙŽÙŠÙÙ‘Ù‡ÙŽØ§ Ø§Ù„Ù’Ù…ÙØ²ÙŽÙ‘Ù…ÙÙ‘Ù„Ù Ù‚ÙÙ…Ù Ø§Ù„Ù„ÙŽÙ‘ÙŠÙ’Ù„ÙŽ Ø¥ÙÙ„ÙŽÙ‘Ø§ Ù‚ÙŽÙ„ÙÙŠÙ„Ù‹Ø§",
              translation: "O you who wraps himself, arise the night, except for a little â€” half of it, or subtract from it a little, or add to it, and recite the Quran with measured recitation.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 17:78",
              arabic: "Ø£ÙŽÙ‚ÙÙ…Ù Ø§Ù„ØµÙŽÙ‘Ù„ÙŽØ§Ø©ÙŽ Ù„ÙØ¯ÙÙ„ÙÙˆÙƒÙ Ø§Ù„Ø´ÙŽÙ‘Ù…Ù’Ø³Ù Ø¥ÙÙ„ÙŽÙ‰Ù° ØºÙŽØ³ÙŽÙ‚Ù Ø§Ù„Ù„ÙŽÙ‘ÙŠÙ’Ù„Ù ÙˆÙŽÙ‚ÙØ±Ù’Ø¢Ù†ÙŽ Ø§Ù„Ù’ÙÙŽØ¬Ù’Ø±Ù Ø¥ÙÙ†ÙŽÙ‘ Ù‚ÙØ±Ù’Ø¢Ù†ÙŽ Ø§Ù„Ù’ÙÙŽØ¬Ù’Ø±Ù ÙƒÙŽØ§Ù†ÙŽ Ù…ÙŽØ´Ù’Ù‡ÙÙˆØ¯Ù‹Ø§",
              translation: "Establish prayer at the decline of the sun until the darkness of the night, and the Quran at dawn. Indeed, the recitation of dawn is witnessed.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2676",
              translation: "The Prophet (SAW) said: \"The morning adhkar protect the servant until evening, and the evening adhkar protect until morning.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Without a written plan, your morning routine stays vague and easy to skip. Mapping the exact sequence and time for each element turns an aspiration into a concrete commitment your mind can follow on autopilot.


**How?**

List each element in order: Fajr salah, Quran reading, morning adhkar, journaling. Estimate realistic minutes for each (e.g., Fajr 10 min, Quran 10 min, adhkar 5 min, journal 5 min). Write the total and your target wake-up time. Post it where you will see it every morning.` },
        { title: 'Prepare your Quran and journal in a designated morning spot the night before', done: false,
          tier: 'T2',
          amanahRationale: 'While the provided sources establish the general principle of the Prophet utilizing the night to prepare himself spiritually for the following day, they omit specific administrative instructions like setting out a Quran and journal, making the subtask a practical logical inference to minimize friction and systematically implement this nightly preparation.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 35:13",
              arabic: "ÙŠÙÙˆÙ„ÙØ¬Ù Ø§Ù„Ù„ÙŽÙ‘ÙŠÙ’Ù„ÙŽ ÙÙÙŠ Ø§Ù„Ù†ÙŽÙ‘Ù‡ÙŽØ§Ø±Ù ÙˆÙŽÙŠÙÙˆÙ„ÙØ¬Ù Ø§Ù„Ù†ÙŽÙ‘Ù‡ÙŽØ§Ø±ÙŽ ÙÙÙŠ Ø§Ù„Ù„ÙŽÙ‘ÙŠÙ’Ù„Ù ÙˆÙŽØ³ÙŽØ®ÙŽÙ‘Ø±ÙŽ Ø§Ù„Ø´ÙŽÙ‘Ù…Ù’Ø³ÙŽ ÙˆÙŽØ§Ù„Ù’Ù‚ÙŽÙ…ÙŽØ±ÙŽ ÙƒÙÙ„ÙŒÙ‘ ÙŠÙŽØ¬Ù’Ø±ÙÙŠ Ù„ÙØ£ÙŽØ¬ÙŽÙ„Ù Ù…ÙÙ‘Ø³ÙŽÙ…Ù‹Ù‘Ù‰ Ûš Ø°ÙŽÙ°Ù„ÙÙƒÙÙ…Ù Ø§Ù„Ù„ÙŽÙ‘Ù‡Ù Ø±ÙŽØ¨ÙÙ‘ÙƒÙÙ…Ù’ Ù„ÙŽÙ‡Ù Ø§Ù„Ù’Ù…ÙÙ„Ù’ÙƒÙ",
              translation: "He makes the night merge into the day and the day into the night; He has subjected the sun and the moon â€” each runs for an appointed term. Such is God your Lord: all control belongs to Him.",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              rationale: "Allah's ordering of night into day is the very architecture around which the morning routine is built; preparing the night before aligns with this divinely ordered rhythm.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6311",
              translation: "The Prophet (SAW) had a consistent nightly routine of recitation and supplication before sleep, preparing himself spiritually for the following day.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Friction kills habits. If you have to search for your Quran or journal half-asleep after Fajr, you are far more likely to skip the routine. Preparing the night before removes every barrier between you and your morning worship.


**How?**

Choose a specific spot in your home â€” a prayer corner, desk, or reading chair. Each night before bed, place your Quran open to where you left off, your journal with a pen, and your adhkar card or phone (on airplane mode). Make this nightly preparation part of your evening wind-down.` },
        { title: 'Memorise or print the morning adhkar (Hisn al-Muslim or equivalent)', done: false,
          tier: 'T3',
          amanahRationale: 'While the provided sources reference the morning in the context of congregational prayer and parables of faith, they offer neither explicit proof nor contextual indication for the highly specific practice of memorizing or printing morning adhkar.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:72",
              arabic: "**Translation:** And a party of the people of the Scripture say: \"Believe in the morning in that which is revealed to the believers (Muslims), and reject it at the end of the day, so that they may turn back.",
              translation: "And a party of the people of the Scripture say: \"Believe in the morning in that which is revealed to the believers (Muslims), and reject it at the end of the day, so that they may turn back.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1205",
              translation: "Narrated Anas bin Malik: While Abu Bakr was leading the people in the morning prayer on a Monday, the Prophet (ï·º) came towards them suddenly having lifted the curtain of 'Aisha's house, and looked at them as they were standing in rows and smiled. Abu Bakr tried to come back thinking that Allah's Apostle wanted to come out for the prayer. The attention of the Muslims was diverted from the prayer because they were delighted to see the Prophet. The Prophet (ï·º) waved his hand to them to complete their prayer, then he went back into the room and let down the curtain. The Prophet expired on that very day",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 558",
              translation: "Narrated Abu Musa:The Prophet (ï·º) said, \"The example of Muslims, Jews and Christians is like the example of a man who employed laborers to work for him from morning till night. They worked till midday and they said, 'We are not in need of your reward.' So the man employed another batch and said to them, 'Complete the rest of the day and yours will be the wages I had fixed (for the first batch). They worked until the time of the `Asr prayer and said, 'Whatever we have done is for you.' He employed another batch. They worked for the rest of the day till sunset, and they received the wages of the two former batches",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The morning adhkar are a spiritual shield prescribed by the Prophet (SAW). Having them memorised or readily available ensures you never skip them due to not knowing the words or not having a reference handy.


**How?**

Get a copy of Hisn al-Muslim (Fortress of the Muslim) in print or use a reliable app. Start with the 5-7 most essential morning supplications. Read them daily from the text for two weeks, then begin reciting from memory. Test yourself weekly until all core adhkar are memorised.` },
        { title: 'Start with a minimal version (5-10 min total) and expand gradually', done: false,
          tier: 'T2',
          amanahRationale: 'While the provided Quranic verse specifically addresses only the recitation of the Quran, its core directive to do "what is easy for you" provides a strong logical inference for the subtask\'s practical advice to begin with a minimal, manageable morning routine to avoid burnout.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 73:20",
              arabic: "ÙÙŽØ§Ù‚Ù’Ø±ÙŽØ¡ÙÙˆØ§ Ù…ÙŽØ§ ØªÙŽÙŠÙŽØ³ÙŽÙ‘Ø±ÙŽ Ù…ÙÙ†ÙŽ Ø§Ù„Ù’Ù‚ÙØ±Ù’Ø¢Ù†Ù",
              translation: "So recite what is easy for you of the Quran.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Attempting a 45-minute morning routine from day one almost guarantees burnout. Starting small builds the neural pathway of consistency first â€” once the habit is locked in, expanding it becomes natural rather than forced.


**How?**

Begin with the absolute minimum: pray Fajr, read half a page of Quran, say 3 adhkar, write 1 sentence in your journal. Do this for 7-10 days. Once it feels automatic, add one more element or extend the time slightly. Increase by no more than 5 minutes per week.` },
        { title: 'Track completion daily for 30 days to solidify the habit', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources establish the general spiritual principle that consistent deeds are most beloved to Allah, they omit specific modern administrative methods like using a daily habit tracker for 30 days, making the subtask a practical logical inference to systematically build that praised consistency.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 29:45",
              arabic: "Ø¥ÙÙ†ÙŽÙ‘ Ø§Ù„ØµÙŽÙ‘Ù„ÙŽØ§Ø©ÙŽ ØªÙŽÙ†Ù’Ù‡ÙŽÙ‰Ù° Ø¹ÙŽÙ†Ù Ø§Ù„Ù’ÙÙŽØ­Ù’Ø´ÙŽØ§Ø¡Ù ÙˆÙŽØ§Ù„Ù’Ù…ÙÙ†ÙƒÙŽØ±Ù",
              translation: "Indeed, prayer prohibits immorality and wrongdoing.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6464",
              translation: "The Prophet (SAW) said: \"The most beloved deeds to Allah are those done consistently, even if they are small.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

What gets tracked gets done. A visible streak of completed mornings creates positive momentum and makes you reluctant to break the chain. Research shows habits become automatic after consistent repetition over several weeks.


**How?**

Use a simple habit tracker â€” a printed calendar on the wall, a checklist in your journal, or an app like Habitica or Streaks. Each morning, mark whether you completed the routine. Review your tracker weekly. If you miss a day, never miss two in a row.` },
      ],
    },
    {
      title: 'Identify sources of haram media (music, content) and set firm boundaries',
      priority: 'high', tags: ['media', 'protection'],
      description: 'The eyes, ears, and heart are all accountable before Allah. Haram media â€” whether explicit content, idle entertainment that wastes time, or music that hardens the heart â€” erodes spiritual sensitivity and mental clarity. Setting boundaries is an act of self-preservation.',
      subtasks: [
        { title: 'Audit your subscriptions, apps, and social media follows for harmful content', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources establish the core spiritual principles of lowering the gaze and avoiding apparent or concealed immoralities, they omit specific modern digital methods like auditing apps and social media subscriptions, making the subtask a practical logical inference to systematically guard one\'s eyes and digital environment from harmful content.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 24:30",
              arabic: "Ù‚ÙÙ„ Ù„ÙÙ‘Ù„Ù’Ù…ÙØ¤Ù’Ù…ÙÙ†ÙÙŠÙ†ÙŽ ÙŠÙŽØºÙØ¶ÙÙ‘ÙˆØ§ Ù…ÙÙ†Ù’ Ø£ÙŽØ¨Ù’ØµÙŽØ§Ø±ÙÙ‡ÙÙ…Ù’ ÙˆÙŽÙŠÙŽØ­Ù’ÙÙŽØ¸ÙÙˆØ§ ÙÙØ±ÙÙˆØ¬ÙŽÙ‡ÙÙ…Ù’",
              translation: "Tell the believing men to lower their gaze and guard their private parts.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 7:33",
              arabic: "Ù‚ÙÙ„Ù’ Ø¥ÙÙ†ÙŽÙ‘Ù…ÙŽØ§ Ø­ÙŽØ±ÙŽÙ‘Ù…ÙŽ Ø±ÙŽØ¨ÙÙ‘ÙŠÙŽ Ø§Ù„Ù’ÙÙŽÙˆÙŽØ§Ø­ÙØ´ÙŽ Ù…ÙŽØ§ Ø¸ÙŽÙ‡ÙŽØ±ÙŽ Ù…ÙÙ†Ù’Ù‡ÙŽØ§ ÙˆÙŽÙ…ÙŽØ§ Ø¨ÙŽØ·ÙŽÙ†ÙŽ",
              translation: "Say: My Lord has only forbidden immoralities â€” what is apparent of them and what is concealed.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6243",
              translation: "The Prophet (SAW) said: \"The eyes commit zina and their zina is looking.\" (Emphasising the importance of guarding what one consumes through the senses.)",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

You cannot set boundaries on what you have not identified. An honest audit reveals how much haram or wasteful media has quietly accumulated in your digital life â€” subscriptions you forgot, accounts that add no value, and apps designed to steal your time.


**How?**

Set aside 30 minutes. Go through every app on your phone, every subscription service, and every social media follow list. For each one, ask: does this bring me closer to Allah, benefit my dunya, or waste my time? Make a list of everything that needs to go.` },
        { title: 'Unsubscribe, unfollow, or delete sources of haram or time-wasting media', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources establish the broad spiritual principles of lowering the gaze and removing harm from pathways, they omit specific modern digital actions like unsubscribing from or deleting media sources, making the subtask a practical logical inference to apply these protective measures to one\'s digital environment.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 24:30",
              arabic: "Ù‚ÙÙ„ Ù„ÙÙ‘Ù„Ù’Ù…ÙØ¤Ù’Ù…ÙÙ†ÙÙŠÙ†ÙŽ ÙŠÙŽØºÙØ¶ÙÙ‘ÙˆØ§ Ù…ÙÙ†Ù’ Ø£ÙŽØ¨Ù’ØµÙŽØ§Ø±ÙÙ‡ÙÙ…Ù’",
              translation: "Tell the believing men to lower their gaze.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2588",
              translation: "The Prophet (SAW) said: \"Beware of sitting in the pathways.\" The companions asked about necessity. He said: \"Then give the road its rights: lowering the gaze, removing harm, returning the greeting.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Identification without action is just awareness. The real protection comes from removing the sources entirely. Every haram or time-wasting account you unfollow is a door of fitna you close for yourself and your household.


**How?**

Work through your audit list systematically. Unsubscribe from streaming services you do not need. Unfollow social media accounts that post haram or idle content. Delete apps that are pure time-wasters. Do it in one focused session so you do not lose momentum.` },
        { title: 'Replace haram entertainment with beneficial alternatives (podcasts, lectures, nasheeds)', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Quranic verse establishes the broad spiritual principle of accountability for what one subjects their hearing and sight to, it omits specific modern practices like substituting harmful entertainment with podcasts or nasheeds, making the subtask a practical logical inference to systematically safeguard these vulnerable senses.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 17:36",
              arabic: "Ø¥ÙÙ†ÙŽÙ‘ Ø§Ù„Ø³ÙŽÙ‘Ù…Ù’Ø¹ÙŽ ÙˆÙŽØ§Ù„Ù’Ø¨ÙŽØµÙŽØ±ÙŽ ÙˆÙŽØ§Ù„Ù’ÙÙØ¤ÙŽØ§Ø¯ÙŽ ÙƒÙÙ„ÙÙ‘ Ø£ÙÙˆÙ„ÙŽÙ°Ø¦ÙÙƒÙŽ ÙƒÙŽØ§Ù†ÙŽ Ø¹ÙŽÙ†Ù’Ù‡Ù Ù…ÙŽØ³Ù’Ø¦ÙÙˆÙ„Ù‹Ø§",
              translation: "Indeed, the hearing, the sight, and the heart â€” about all those one will be questioned.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Simply removing entertainment creates a vacuum that your nafs will rush to fill. Replacing haram with halal alternatives satisfies the human need for relaxation and stimulation while actually nourishing your iman and intellect.


**How?**

Subscribe to 3-5 Islamic podcasts or lecture series that genuinely interest you. Download a nasheed playlist for commutes. Bookmark beneficial YouTube channels. Keep a book or audiobook ready for downtime. The key is having the alternative already prepared before the craving hits.` },
        { title: 'Install content filters or screen time controls on your devices', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources establish the broad spiritual principles of protecting one\'s family from the Fire and being a responsible shepherd over one\'s flock, they omit specific modern digital methods like installing content filters or screen time controls, making the subtask a practical logical inference to systematically apply these protective measures to one\'s digital environment.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 66:6",
              arabic: "ÙŠÙŽØ§ Ø£ÙŽÙŠÙÙ‘Ù‡ÙŽØ§ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠÙ†ÙŽ Ø¢Ù…ÙŽÙ†ÙÙˆØ§ Ù‚ÙÙˆØ§ Ø£ÙŽÙ†ÙÙØ³ÙŽÙƒÙÙ…Ù’ ÙˆÙŽØ£ÙŽÙ‡Ù’Ù„ÙÙŠÙƒÙÙ…Ù’ Ù†ÙŽØ§Ø±Ù‹Ø§",
              translation: "O you who have believed, protect yourselves and your families from a Fire.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 7138",
              translation: "The Prophet (SAW) said: \"Each of you is a shepherd and each of you is responsible for his flock.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Willpower alone is unreliable â€” the tech industry spends billions engineering addiction. Content filters and screen time controls add a structural barrier between you and harmful content, protecting you in moments of weakness when your resolve is low.


**How?**

Enable built-in parental controls or screen time settings on your phone and computer. Install a DNS-level content filter like CleanBrowsing or OpenDNS on your home network. Set daily app time limits for social media. Use browser extensions that block distracting sites during work hours.` },
        { title: 'Establish a household media policy if you have children or dependents', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources establish the broad spiritual principles of protecting one\'s family from the Fire and being a responsible shepherd over one\'s flock, they omit specific modern practices like establishing a household media policy, making the subtask a practical logical inference to systematically apply these protective measures to one\'s children in a contemporary digital environment.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 66:6",
              arabic: "ÙŠÙŽØ§ Ø£ÙŽÙŠÙÙ‘Ù‡ÙŽØ§ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠÙ†ÙŽ Ø¢Ù…ÙŽÙ†ÙÙˆØ§ Ù‚ÙÙˆØ§ Ø£ÙŽÙ†ÙÙØ³ÙŽÙƒÙÙ…Ù’ ÙˆÙŽØ£ÙŽÙ‡Ù’Ù„ÙÙŠÙƒÙÙ…Ù’ Ù†ÙŽØ§Ø±Ù‹Ø§",
              translation: "O you who have believed, protect yourselves and your families from a Fire whose fuel is people and stones.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 7138",
              translation: "The Prophet (SAW) said: \"Each of you is a shepherd and each of you is responsible for his flock.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Children absorb media without the filters of adult judgement. A clear household media policy protects your family from harmful content and teaches children to be intentional consumers of media â€” a skill that will serve them for life.


**How?**

Sit down with your spouse and agree on clear rules: what devices are allowed, where screens can be used, what content is off-limits, and how much screen time per day. Write it down. Discuss it with your children in age-appropriate terms. Review and update the policy every 6 months.` },
      ],
    },
    {
      title: 'Practise daily dhikr for anxiety â€” recite Ayat al-Kursi, last two ayat of Al-Baqarah',
      priority: 'high', tags: ['dhikr', 'mental-health'],
      description: 'Allah says: "Verily, in the remembrance of Allah do hearts find rest" (13:28). Specific adhkar have been prescribed by the Prophet (SAW) for protection and tranquillity. Making these a non-negotiable daily practice builds a spiritual shield against anxiety and intrusive thoughts.',
      subtasks: [
        { title: 'Memorise Ayat al-Kursi (2:255) if not already memorised', done: false,
          tier: 'T3',
          amanahRationale: 'While the provided sources emphasize the general importance of the Quran\'s clear verses and the necessity of maintaining one\'s memorization of the Quran, they offer neither explicit proof nor contextual indication for the highly specific directive and distinct virtues of memorizing Ayat al-Kursi.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 24:34",
              arabic: "**Translation:** And indeed We have sent down for you AyÃ¢t (proofs, evidence, verses, lessons, signs, revelations, etc.) that make things plain, and the example of those who passed away before you, and an admonition for those who are Al-MuttaqÃ»n (the pious - See V.2:2).",
              translation: "And indeed We have sent down for you AyÃ¢t (proofs, evidence, verses, lessons, signs, revelations, etc.) that make things plain, and the example of those who passed away before you, and an admonition for those who are Al-MuttaqÃ»n (the pious - See V.2:2).",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 1839",
              translation: "Abdullah b. 'Umar reported Allah's Messenger (ï·º) as saying:The example of a man who has memorised the Qur'an is like that of a hobbled camel. If he remained vigilant, he would be able to retain it (with him), and if he loosened the hobbled camel it would escape",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Ayat al-Kursi is the greatest ayah in the Quran. Memorising it ensures you can recite it anywhere, anytime â€” in moments of anxiety, before sleep, and after every salah.

**How?**

If you do not already know it, break it into 3-4 segments. Learn one segment per day by reading it 10 times, then reciting from memory 10 times. By the end of the week, connect all segments. Recite it after every fardh prayer for reinforcement.` },
        { title: 'Memorise the last two ayat of Surah Al-Baqarah (2:285-286)', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided source explicitly establishes the immense spiritual benefit and sufficiency of reciting the last two verses of Surah Al-Baqarah at night, it does not explicitly command their memorization, making the subtask a practical logical inference to systematically ensure this nightly Prophetic practice.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 24:1",
              arabic: "**Translation:** (This is) a SÃ»rah (chapter of the Qurâ€™Ã¢n) which We have sent down and which We have enjoined, (ordained its laws); and in it We have revealed manifest AyÃ¢t (proofs, evidence, verses, lessons, signs, revelations - lawful and unlawful things, and set boundaries of IslÃ¢mic Religion), that you may remember.",
              translation: "(This is) a SÃ»rah (chapter of the Qurâ€™Ã¢n) which We have sent down and which We have enjoined, (ordained its laws); and in it We have revealed manifest AyÃ¢t (proofs, evidence, verses, lessons, signs, revelations - lawful and unlawful things, and set boundaries of IslÃ¢mic Religion), that you may remember.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 9:44",
              arabic: "**Translation:** Those who believe in AllÃ¢h and the Last Day would not ask your leave to be exempted from fighting with their properties and their lives; and AllÃ¢h is the All-Knower of Al-MuttaqÃ»n (the pious - See V.2:2).",
              translation: "Those who believe in AllÃ¢h and the Last Day would not ask your leave to be exempted from fighting with their properties and their lives; and AllÃ¢h is the All-Knower of Al-MuttaqÃ»n (the pious - See V.2:2).",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 24:34",
              arabic: "**Translation:** And indeed We have sent down for you AyÃ¢t (proofs, evidence, verses, lessons, signs, revelations, etc.) that make things plain, and the example of those who passed away before you, and an admonition for those who are Al-MuttaqÃ»n (the pious - See V.2:2).",
              translation: "And indeed We have sent down for you AyÃ¢t (proofs, evidence, verses, lessons, signs, revelations, etc.) that make things plain, and the example of those who passed away before you, and an admonition for those who are Al-MuttaqÃ»n (the pious - See V.2:2).",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5040",
              translation: "Narrated Abu Mas`ud al-Ansari:The Prophet (ï·º) said, \"If one recites the last two verses of Surat al-Baqarah at night, it is sufficient for him (for that night)",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 1013",
              translation: "Abu Qatada reported it on the authority of his father:The Messenger of Allah (ï·º) would recite in the first two rak'ahs of the noon and afternoon prayers the opening chapter of the Book and another surah. He would sometimes recite loud enough to make audible to us the verse and would recite in the last two rak'ahs Surat al-Faitiha (only)",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 4439",
              translation: "Narrated Aisha:Whenever Allah's Messenger (ï·º) became ill, he used to recite the Muawidhatan (i.e. the last two surahs of the Qur'an) and blow his breath over himself (after their recitation ) and rubbed his hands over his body. So when he was afflicted with his fatal illness. I started reciting the Muawidhatan and blowing my breath over him as he used to do and then I rubbed the hand of the Prophet (ï·º) over his body",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

 These verses are a powerful nightly shield against anxiety and harm.

**How?**

These two verses are moderate in length. Break each verse into two halves. Learn one half per day using the same method: read 10 times, recite from memory 10 times. Within 4-5 days you should have both memorised. Recite them every night before sleep to lock them in.` },
        { title: "Recite both after every fardh salah as a consistent practice", done: false,
          tier: 'T3',
          amanahRationale: 'While the provided Hadith explicitly establishes the immense spiritual reward of reciting Ayat al-Kursi after every obligatory prayer, the sources offer neither explicit proof nor contextual indication for the subtask\'s specific directive to additionally recite the last two verses of Surah Al-Baqarah at this time.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 33:62",
              arabic: "Ø³ÙÙ†ÙŽÙ‘Ø©ÙŽ Ø§Ù„Ù„ÙŽÙ‘Ù‡Ù ÙÙÙŠ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠÙ†ÙŽ Ø®ÙŽÙ„ÙŽÙˆÙ’Ø§ Ù…ÙÙ† Ù‚ÙŽØ¨Ù’Ù„Ù Û– ÙˆÙŽÙ„ÙŽÙ† ØªÙŽØ¬ÙØ¯ÙŽ Ù„ÙØ³ÙÙ†ÙŽÙ‘Ø©Ù Ø§Ù„Ù„ÙŽÙ‘Ù‡Ù ØªÙŽØ¨Ù’Ø¯ÙÙŠÙ„Ù‹Ø§",
              translation: "This has been Godâ€™s practice with those who went before. You will find no change in Godâ€™s practices.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 48:23",
              arabic: "Ø³ÙÙ†ÙŽÙ‘Ø©ÙŽ Ø§Ù„Ù„ÙŽÙ‘Ù‡Ù Ø§Ù„ÙŽÙ‘ØªÙÙŠ Ù‚ÙŽØ¯Ù’ Ø®ÙŽÙ„ÙŽØªÙ’ Ù…ÙÙ† Ù‚ÙŽØ¨Ù’Ù„Ù Û– ÙˆÙŽÙ„ÙŽÙ† ØªÙŽØ¬ÙØ¯ÙŽ Ù„ÙØ³ÙÙ†ÙŽÙ‘Ø©Ù Ø§Ù„Ù„ÙŽÙ‘Ù‡Ù ØªÙŽØ¨Ù’Ø¯ÙÙŠÙ„Ù‹Ø§",
              translation: "such was Godâ€™s practice in the past and you will find no change in Godâ€™s practices.",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              rationale: "the unchanging sunnah of Allah grounds the call to establish consistent, unvarying personal sunnah practices after every prayer.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 4723",
              translation: "The Prophet (SAW) said: \"Whoever recites Ayat al-Kursi after every obligatory prayer, nothing will prevent him from entering Paradise except death.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Sporadic dhikr provides sporadic benefit. Making these recitations a non-negotiable part of every obligatory prayer embeds them into the rhythm of your day, creating five daily anchors of spiritual protection and mental tranquillity.


**How?**

After each fardh prayer, before you get up from your place, recite Ayat al-Kursi followed by the last two ayat of Al-Baqarah. Pair this with your existing post-salah adhkar (tasbeeh, tahmeed, takbeer). It adds less than two minutes but creates a powerful protective habit.` },
        { title: 'Add evening adhkar including the three Quls and Ayat al-Kursi before sleep', done: false,
          tier: 'T3',
          amanahRationale: 'While the provided sources establish the general spiritual practices of evening glorification and the Prophet\'s night prayer, they offer neither explicit proof nor contextual indication for the specific directive to recite the three Quls and Ayat al-Kursi before sleep.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 17:111",
              arabic: "ÙˆÙŽÙ‚ÙÙ„Ù Ø§Ù„Ù’Ø­ÙŽÙ…Ù’Ø¯Ù Ù„ÙÙ„ÙŽÙ‘Ù‡Ù Ø§Ù„ÙŽÙ‘Ø°ÙÙŠ Ù„ÙŽÙ…Ù’ ÙŠÙŽØªÙŽÙ‘Ø®ÙØ°Ù’ ÙˆÙŽÙ„ÙŽØ¯Ù‹Ø§ ÙˆÙŽÙ„ÙŽÙ…Ù’ ÙŠÙŽÙƒÙÙ† Ù„ÙŽÙ‘Ù‡Ù Ø´ÙŽØ±ÙÙŠÙƒÙŒ ÙÙÙŠ Ø§Ù„Ù’Ù…ÙÙ„Ù’ÙƒÙ ÙˆÙŽÙ„ÙŽÙ…Ù’ ÙŠÙŽÙƒÙÙ† Ù„ÙŽÙ‘Ù‡Ù ÙˆÙŽÙ„ÙÙŠÙŒÙ‘ Ù…ÙÙ‘Ù†ÙŽ Ø§Ù„Ø°ÙÙ‘Ù„ÙÙ‘ Û– ÙˆÙŽÙƒÙŽØ¨ÙÙ‘Ø±Ù’Ù‡Ù ØªÙŽÙƒÙ’Ø¨ÙÙŠØ±Ù‹Ø§",
              translation: "And say: \"Praise be to God who has never had a child, who has no partner in His rule, who needs no one to protect Him from humiliation.\" Proclaim His greatness.",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              rationale: "the Quran repeatedly commands glorification morning and evening; the evening adhkar fulfil this command before sleep.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2013",
              translation: "Narrated Abu Salama bin `Abdur Rahman:that he asked `Aisha \"How was the prayer of Allah's Messenger (ï·º) in Ramadan?\" She replied, \"He did not pray more than eleven rak`at in Ramadan or in any other month. He used to pray four rak`at ---- let alone their beauty and length----and then he would pray four ----let alone their beauty and length ---- and then he would pray three rak`at (witr).\" She added, \"I asked, 'O Allah's Messenger (ï·º)! Do you sleep before praying the witr?' He replied, 'O `Aisha! My eyes sleep but my heart does not sleep",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The evening adhkar are the complement to the morning shield. The Prophet (SAW) would recite the three Quls into his hands and wipe over his body before sleep. Combined with Ayat al-Kursi, this practice creates a complete spiritual protection for the night â€” reducing nighttime anxiety and disturbed sleep.


**How?**

Set a reminder 10 minutes before your bedtime. Sit in bed and recite: Ayat al-Kursi, Surah Al-Ikhlas, Surah Al-Falaq, and Surah An-Nas (the three Quls three times each, blowing into your hands and wiping over your body as the Sunnah teaches). Add any other evening adhkar you know.` },
        { title: 'Notice and journal any changes in anxiety levels over 21 days', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources acknowledge the reality of anxious hearts and establish the spiritual value of consistent deeds, they omit specific modern psychological methods like journaling anxiety levels daily for 21 days, making the subtask a practical logical inference to systematically build consistency and observe its calming effects.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 79:8",
              arabic: "Ù‚ÙÙ„ÙÙˆØ¨ÙŒ ÙŠÙŽÙˆÙ’Ù…ÙŽØ¦ÙØ°Ù ÙˆÙŽØ§Ø¬ÙÙÙŽØ©ÙŒ",
              translation: "hearts will tremble on that Day.",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              rationale: "awareness of the anxious heart â€” and its contrast with the tranquillity that dhikr brings â€” is the very insight this journaling practice is designed to cultivate.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6464",
              translation: "The Prophet (SAW) said: \"The most beloved deeds to Allah are those done consistently, even if they are small.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Tracking the impact of your dhikr practice turns faith into lived experience. When you can look back and see a measurable reduction in anxiety correlated with consistent remembrance of Allah, it deepens your conviction and motivates you to continue.


**How?**

Each evening, rate your anxiety on a simple 1-10 scale in your journal. Note whether you completed your dhikr that day. After 21 days, review the pattern. Most people notice a clear correlation between consistent dhikr and lower anxiety scores. Share your findings with someone you trust for accountability.` },
      ],
    },
    {
      title: 'Limit social media use to defined time windows â€” set screen-time limits',
      priority: 'high', tags: ['digital-detox', 'focus'],
      description: 'Uncontrolled social media use fragments attention, feeds comparison, and steals hours that could be spent in worship, learning, or meaningful connection. Setting firm time windows turns a passive habit into a controlled, intentional tool.',
      subtasks: [
        { title: 'Check your current daily screen time and identify the worst offending apps', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources establish the foundational spiritual principles of valuing time and warning against being deceived about free time, they omit specific modern digital methods like checking screen time and identifying offending apps, making the subtask a practical logical inference to systematically safeguard one\'s time from contemporary distractions.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 103:1-3",
              arabic: "ÙˆÙŽØ§Ù„Ù’Ø¹ÙŽØµÙ’Ø±Ù Ø¥ÙÙ†ÙŽÙ‘ Ø§Ù„Ù’Ø¥ÙÙ†Ø³ÙŽØ§Ù†ÙŽ Ù„ÙŽÙÙÙŠ Ø®ÙØ³Ù’Ø±Ù Ø¥ÙÙ„ÙŽÙ‘Ø§ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠÙ†ÙŽ Ø¢Ù…ÙŽÙ†ÙÙˆØ§ ÙˆÙŽØ¹ÙŽÙ…ÙÙ„ÙÙˆØ§ Ø§Ù„ØµÙŽÙ‘Ø§Ù„ÙØ­ÙŽØ§ØªÙ",
              translation: "By time, indeed mankind is in loss, except for those who have believed and done righteous deeds.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 2346",
              translation: "The Prophet (SAW) said: \"There are two blessings which many people are deceived about: health and free time.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

You cannot fix what you have not measured. Most people drastically underestimate their screen time. Seeing the actual numbers â€” often 4-6 hours daily on social media alone â€” creates the shock of awareness needed to motivate real change.


**How?**

Open your phone's screen time or digital wellbeing settings right now. Look at your daily average and which apps consume the most time. Write down the top 3 offenders and their daily averages. This data becomes your baseline for measuring improvement.` },
        { title: 'Define two specific time windows per day for social media (e.g., 12-12:30, 8-8:30)', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Quranic verse establishes the broad spiritual principle of self-accountability and evaluating what one prepares for the Hereafter, it omits specific modern practices like defining time windows for social media, making the subtask a practical logical inference to systematically safeguard one\'s time from contemporary distractions.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 59:18",
              arabic: "ÙŠÙŽØ§ Ø£ÙŽÙŠÙÙ‘Ù‡ÙŽØ§ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠÙ†ÙŽ Ø¢Ù…ÙŽÙ†ÙÙˆØ§ Ø§ØªÙŽÙ‘Ù‚ÙÙˆØ§ Ø§Ù„Ù„ÙŽÙ‘Ù‡ÙŽ ÙˆÙŽÙ„Ù’ØªÙŽÙ†Ø¸ÙØ±Ù’ Ù†ÙŽÙÙ’Ø³ÙŒ Ù…ÙŽÙ‘Ø§ Ù‚ÙŽØ¯ÙŽÙ‘Ù…ÙŽØªÙ’ Ù„ÙØºÙŽØ¯Ù",
              translation: "O you who have believed, fear Allah. And let every soul look to what it has put forth for tomorrow.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Open-ended access to social media means it bleeds into every idle moment â€” eroding focus, fragmenting attention, and stealing time from worship and productive work. Defined time windows transform social media from a compulsion into a controlled, intentional activity.


**How?**

Choose two 30-minute windows that do not conflict with prayer times or deep work. Write them down (e.g., 12:00-12:30 PM and 8:00-8:30 PM). Outside these windows, social media is off-limits. Set phone reminders for the start and end of each window. Commit to this for 14 days before adjusting.` },
        { title: 'Enable built-in screen time limits on your phone and computer', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources establish the foundational spiritual principles of valuing time and warning against being deceived about free time, they omit specific modern digital methods like enabling screen time limits, making the subtask a practical logical inference to systematically safeguard one\'s time from contemporary distractions.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 103:1-3",
              arabic: "ÙˆÙŽØ§Ù„Ù’Ø¹ÙŽØµÙ’Ø±Ù Ø¥ÙÙ†ÙŽÙ‘ Ø§Ù„Ù’Ø¥ÙÙ†Ø³ÙŽØ§Ù†ÙŽ Ù„ÙŽÙÙÙŠ Ø®ÙØ³Ù’Ø±Ù",
              translation: "By time, indeed mankind is in loss.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 2346",
              translation: "The Prophet (SAW) said: \"There are two blessings which many people are deceived about: health and free time.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Relying on willpower alone to resist apps engineered for addiction is a losing strategy. Screen time limits create a structural barrier â€” when the app locks you out, the decision is made for you, protecting you from your own weakness in moments of temptation.


**How?**

On iPhone, go to Settings > Screen Time > App Limits. On Android, use Digital Wellbeing > App Timers. Set daily limits for each social media app (e.g., 30 minutes each). On your computer, use a browser extension like LeechBlock or Cold Turkey to block social sites during work hours.` },
        { title: 'Move social media apps off your home screen or into a folder', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Hadith establishes the broad spiritual principle of living in this world with the detachment of a stranger or a traveler, it omits specific modern digital methods like moving social media apps off a home screen, making the subtask a practical logical inference to systematically cultivate this transient mindset against contemporary worldly distractions.',
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2654",
              translation: "The Prophet (peace be upon him) said: \"Be in this world as if you were a stranger or a traveller along a path.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Visual cues trigger habits. When social media icons sit on your home screen, every phone unlock is an invitation to scroll. Moving them out of sight adds a small but powerful friction that breaks the automatic reach-and-tap pattern.


**How?**

Move all social media apps into a folder on your second or third home screen page. Better yet, delete the apps entirely and only access social media through the browser â€” the worse experience acts as a natural deterrent. Replace home screen slots with beneficial apps: Quran, adhkar, or a habit tracker.` },
        { title: 'Replace idle scrolling moments with dhikr, reading, or a beneficial app', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources establish the spiritual reassurance found in dhikr and the transient mindset of a traveler avoiding worldly attachments, they omit specific modern concepts like idle scrolling, making the subtask a practical logical inference to systematically utilize contemporary free time for remembrance and beneficial activities.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 13:28",
              arabic: "Ø£ÙŽÙ„ÙŽØ§ Ø¨ÙØ°ÙÙƒÙ’Ø±Ù Ø§Ù„Ù„ÙŽÙ‘Ù‡Ù ØªÙŽØ·Ù’Ù…ÙŽØ¦ÙÙ†ÙÙ‘ Ø§Ù„Ù’Ù‚ÙÙ„ÙÙˆØ¨Ù",
              translation: "Unquestionably, by the remembrance of Allah hearts are assured.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2654",
              translation: "Ibn Umar said: The Prophet (peace be upon him) took hold of my shoulder and said: \"Be in this world as if you were a stranger or a traveller along a path.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The moments you used to fill with scrolling â€” waiting in line, sitting in the car, before bed â€” are actually precious pockets of time. Filling them with dhikr or reading transforms dead time into spiritual and intellectual growth, compounding over months into significant personal development.


**How?**

Identify your top 3 idle scrolling triggers (e.g., waiting for food, riding the elevator, lying in bed). For each trigger, assign a replacement: tasbeeh beads in your pocket, a book on your phone, or a specific dhikr phrase. Practice the replacement for one trigger at a time until it becomes automatic.` },
      ],
    },
    {
      title: 'Seek Islamic counselling or therapy if experiencing persistent anxiety or depression',
      priority: 'medium', tags: ['mental-health', 'help'],
      description: 'Seeking help is a sign of strength, not weakness.',
      subtasks: [
        { title: 'Honestly assess whether you are experiencing persistent low mood, anxiety, or emotional distress', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources validate the reality of human sorrow, sadness, and distress and establish their spiritual expiation, they omit specific modern psychological methods like self-assessing for persistent low mood or anxiety, making the subtask a practical logical inference to properly identify and seek appropriate care for these very real afflictions.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 94:5-6",
              arabic: "ÙÙŽØ¥ÙÙ†ÙŽÙ‘ Ù…ÙŽØ¹ÙŽ Ø§Ù„Ù’Ø¹ÙØ³Ù’Ø±Ù ÙŠÙØ³Ù’Ø±Ù‹Ø§ Ø¥ÙÙ†ÙŽÙ‘ Ù…ÙŽØ¹ÙŽ Ø§Ù„Ù’Ø¹ÙØ³Ù’Ø±Ù ÙŠÙØ³Ù’Ø±Ù‹Ø§",
              translation: "For indeed, with hardship will be ease. Indeed, with hardship will be ease.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5675",
              translation: "The Prophet (peace be upon him) said: \"No fatigue, nor disease, nor sorrow, nor sadness, nor hurt, nor distress befalls a Muslim, even if it were the prick of a thorn, but Allah expiates some of his sins for that.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Many Muslims push through emotional suffering silently, mistaking it for sabr or assuming that more ibadah alone will fix it. Honest self-assessment is the first step â€” you cannot seek a cure for what you refuse to diagnose. Persistent distress lasting more than two weeks deserves professional attention.


**How?**

Set aside 15 quiet minutes. Ask yourself: Have I felt persistently sad, anxious, or hopeless for more than two weeks? Has my sleep, appetite, or concentration changed significantly? Am I withdrawing from people or activities I used to enjoy? If yes to two or more, this is a signal to seek professional support.` },
        { title: 'Research Muslim therapists or Islamic counselling services in your area or online', done: false,
          tier: 'T3',
          amanahRationale: 'While the provided Hadith establishes the spiritual principle of maintaining patience during hardship, it offers neither explicit proof nor contextual indication for the specific modern directive to research Muslim therapists or Islamic counseling services.',
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2999",
              translation: "The Prophet (peace be upon him) said: \"How wonderful is the affair of the believer, for his affairs are all good. If something good happens to him, he is thankful, and that is good for him. If something bad happens to him, he is patient, and that is good for him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A therapist who understands your faith can integrate Islamic principles into the healing process â€” they will not dismiss your spiritual life or suggest solutions that conflict with your values. Finding the right fit makes the difference between therapy that feels foreign and therapy that feels like home.


**How?**

Search directories like Khalil Center, Noor Human Consulting, or the Muslim Mental Health directory. Ask your local imam or community for referrals. Check if your insurance covers Muslim therapists. If in-person options are limited, online platforms offer Muslim therapists worldwide. Shortlist 2-3 options.` },
        { title: 'Schedule an initial consultation or intake session', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided source establishes the broad principle of seeking professional help alongside spiritual means, it omits specific logistical steps like scheduling an initial consultation or intake session, making the subtask a practical logical inference to initiate that professional care.',
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2999",
              translation: "The Prophet (peace be upon him) said: \"How wonderful is the affair of the believer, for his affairs are all good.\" The believer is encouraged to seek help from both spiritual and professional means.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The hardest step is the first one. Scheduling the appointment turns intention into action. Many therapists offer a free 15-minute consultation call â€” this low-commitment first step lets you gauge fit without a full commitment.


**How?**

Pick your top choice from your shortlist and call or email to schedule. Most practices have online booking. Request an initial consultation or intake session. If the first therapist is not available soon, book with your second choice â€” do not let a waitlist become an excuse to delay.` },
        { title: 'Discuss your spiritual practices as part of the therapeutic conversation', done: false,
          tier: 'T3',
          amanahRationale: 'While the provided sources affirm the comforting power of Allah\'s remembrance and the spiritual virtues of patience and gratitude during hardships, they offer neither explicit proof nor contextual indication for the specific modern directive to discuss one\'s spiritual practices within a therapeutic setting.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 94:5-6",
              arabic: "ÙÙŽØ¥ÙÙ†ÙŽÙ‘ Ù…ÙŽØ¹ÙŽ Ø§Ù„Ù’Ø¹ÙØ³Ù’Ø±Ù ÙŠÙØ³Ù’Ø±Ù‹Ø§ Ø¥ÙÙ†ÙŽÙ‘ Ù…ÙŽØ¹ÙŽ Ø§Ù„Ù’Ø¹ÙØ³Ù’Ø±Ù ÙŠÙØ³Ù’Ø±Ù‹Ø§",
              translation: "For indeed, with hardship comes ease. Indeed, with hardship comes ease.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 13:28",
              arabic: "Ø£ÙŽÙ„ÙŽØ§ Ø¨ÙØ°ÙÙƒÙ’Ø±Ù Ø§Ù„Ù„ÙŽÙ‘Ù‡Ù ØªÙŽØ·Ù’Ù…ÙŽØ¦ÙÙ†ÙÙ‘ Ø§Ù„Ù’Ù‚ÙÙ„ÙÙˆØ¨Ù",
              translation: "Verily, in the remembrance of Allah do hearts find rest.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2999",
              translation: "The Prophet (SAW) said: \"Amazing is the affair of the believer, for all his affairs are good. If something good happens to him, he is grateful, and that is good for him. If something bad happens, he is patient, and that is good for him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Your relationship with Allah, your prayer life, and your spiritual struggles are not separate from your mental health â€” they are deeply intertwined. A therapist who knows about your spiritual practices can offer more holistic and effective guidance than one working with only half the picture.


**How?**

In your first session, mention that your Islamic faith is central to your life and that you want it integrated into therapy. Share your daily spiritual practices (salah, Quran, dhikr). Be honest about spiritual struggles too â€” doubts, guilt, or feeling disconnected from Allah are important therapeutic material.` },
        { title: 'Commit to at least 4-6 sessions before evaluating whether to continue', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources establish the spiritual principles of trusting that ease follows hardship and valuing consistent deeds, they omit specific modern clinical methods like committing to 4-6 therapy sessions, making the subtask a practical logical inference to systematically apply patience and consistency to mental health treatment.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 94:5-6",
              arabic: "ÙÙŽØ¥ÙÙ†ÙŽÙ‘ Ù…ÙŽØ¹ÙŽ Ø§Ù„Ù’Ø¹ÙØ³Ù’Ø±Ù ÙŠÙØ³Ù’Ø±Ù‹Ø§ Ø¥ÙÙ†ÙŽÙ‘ Ù…ÙŽØ¹ÙŽ Ø§Ù„Ù’Ø¹ÙØ³Ù’Ø±Ù ÙŠÙØ³Ù’Ø±Ù‹Ø§",
              translation: "For indeed, with hardship comes ease. Indeed, with hardship comes ease.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6464",
              translation: "The Prophet (SAW) said: \"The most beloved deeds to Allah are those done consistently, even if they are small.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Therapy is not a one-session fix. The first 1-2 sessions are primarily assessment and rapport-building. Real therapeutic work begins around session 3-4. Quitting too early means you never experience the actual benefits, reinforcing the false belief that therapy does not work.


**How?**

Make a commitment to yourself: attend at least 6 sessions before making any judgement about effectiveness. Schedule them in advance (weekly or bi-weekly). After session 6, evaluate honestly: do you feel heard, are you gaining insight, is your distress reducing? If not, switch therapists rather than abandoning therapy entirely.` },
      ],
    },
  ],
  health_mental_growth: [
    {
      title: 'Start a daily muhasaba (self-accounting) journal â€” 5 minutes before sleep',
      priority: 'high', tags: ['muhasaba', 'reflection'],
      description: 'Umar (RA) said: "Take account of yourselves before you are taken to account." Muhasaba is the practice of reviewing your day â€” what you did well, where you fell short, and what you intend for tomorrow. Five minutes of honest self-reflection accelerates personal growth dramatically.',
      subtasks: [
        { title: 'Get a dedicated journal or notebook for nightly muhasaba', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Quranic verse establishes the foundational spiritual principle of self-accountability and evaluating what one has prepared for the Hereafter, it omits specific methods like keeping a dedicated journal, making the subtask a practical logical inference to systematically engage in this reflective practice.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 59:18",
              arabic: "ÙŠÙŽØ§ Ø£ÙŽÙŠÙÙ‘Ù‡ÙŽØ§ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠÙ†ÙŽ Ø¢Ù…ÙŽÙ†ÙÙˆØ§ Ø§ØªÙŽÙ‘Ù‚ÙÙˆØ§ Ø§Ù„Ù„ÙŽÙ‘Ù‡ÙŽ ÙˆÙŽÙ„Ù’ØªÙŽÙ†Ø¸ÙØ±Ù’ Ù†ÙŽÙÙ’Ø³ÙŒ Ù…ÙŽÙ‘Ø§ Ù‚ÙŽØ¯ÙŽÙ‘Ù…ÙŽØªÙ’ Ù„ÙØºÙŽØ¯Ù",
              translation: "O you who have believed, fear Allah. And let every soul look to what it has put forth for tomorrow.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A dedicated journal signals to your mind that muhasaba is a serious, sacred practice â€” not an afterthought scribbled on random paper. Having a single place for all your reflections also allows you to review patterns over time, which is where the deepest insights emerge.


**How?**

Choose a simple notebook that feels pleasant to write in â€” nothing fancy that makes you afraid to use it. Keep it with a pen on your nightstand or beside your bed. Label the first page with your start date and the intention: "Muhasaba â€” taking account of my soul before Allah takes account of me." ` },
        { title: 'Create a simple template: 3 blessings, 1 shortcoming, 1 intention for tomorrow', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources establish the foundational spiritual principles of self-accountability and prioritizing obligatory duties, they omit specific modern journaling methods like a structured template for blessings, shortcomings, and intentions, making the subtask a practical logical inference to systematically fulfill the command to reflect on what one prepares for tomorrow.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 59:18",
              arabic: "ÙˆÙŽÙ„Ù’ØªÙŽÙ†Ø¸ÙØ±Ù’ Ù†ÙŽÙÙ’Ø³ÙŒ Ù…ÙŽÙ‘Ø§ Ù‚ÙŽØ¯ÙŽÙ‘Ù…ÙŽØªÙ’ Ù„ÙØºÙŽØ¯Ù",
              translation: "And let every soul look to what it has put forth for tomorrow.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6502",
              translation: "The Prophet (peace be upon him) said: \"Allah said: My servant does not draw near to Me with anything more beloved to Me than the duties I have enjoined upon him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A template removes the paralysis of the blank page. By structuring your reflection around gratitude (3 blessings), humility (1 shortcoming), and intention (1goal for tomorrow), you cover the essential elements of muhasaba without overthinking or turning it into a chore.


**How?**

Write this template on the inside cover of your journal: (1) Three blessings I noticed today â€” things to thank Allah for, (2) One area where I fell short â€” missed salah, harsh words, wasted time, (3) One intention for tomorrow â€” something specific I will do better. Each entry should take no more than 5 minutes.` },
        { title: 'Set a recurring alarm 15 minutes before your target bedtime', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Hadith establishes the prophetic practice of maintaining a consistent nightly routine of remembrance and supplication before sleeping, it omits specific modern digital tools like setting a recurring phone alarm, making the subtask a practical logical inference to systematically trigger and establish this reflective habit.',
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6311",
              translation: "The Prophet (peace be upon him) would remember Allah before sleeping and had a consistent nightly routine of recitation and supplication.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Without a trigger, muhasaba will be forgotten in the rush of nightly routines. An alarm 15 minutes before bed creates a consistent cue that says "it is time to reflect" â€” giving you enough runway to write before sleep pulls you under.


**How?**

Set a daily recurring alarm on your phone for 15 minutes before your target bedtime. Label it "Muhasaba time." When it goes off, stop whatever you are doing, pick up your journal, and write. Treat this alarm with the same seriousness as your Fajr alarm.` },
        { title: 'Write consistently for 21 days without judging the quality of entries', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided source establishes the broad spiritual principle of valuing regular, constant deeds even if they are small, it omits specific modern practices like journaling for 21 days without judging quality, making the subtask a practical logical inference to systematically build a consistent habit.',
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6464",
              translation: "The Prophet (peace be upon him) said: \"The most beloved deed to Allah is the most regular and constant even if it were little.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Perfectionism kills journaling habits faster than laziness does. If you judge every entry ("this is shallow," "I wrote the same thing yesterday"), you will dread the practice and eventually quit. The goal for the first 21 days is consistency, not quality â€” quality comes naturally once the habit is established.


**How?**

Write something every night for 21 days straight, even if it is one sentence. Do not reread old entries during this period. Do not compare yourself to anyone. If you miss a night, write the next night without guilt. Mark each completed day on a calendar to visualize your streak.` },
        { title: 'Review weekly patterns to identify recurring strengths and weaknesses', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Quranic verse establishes the foundational spiritual necessity of purifying the soul to achieve success, it omits specific methods like reviewing weekly journal patterns, making the subtask a practical logical inference to systematically identify the strengths and weaknesses needed to fulfill this purification.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 91:9-10",
              arabic: "Ù‚ÙŽØ¯Ù’ Ø£ÙŽÙÙ’Ù„ÙŽØ­ÙŽ Ù…ÙŽÙ† Ø²ÙŽÙƒÙŽÙ‘Ø§Ù‡ÙŽØ§ ÙˆÙŽÙ‚ÙŽØ¯Ù’ Ø®ÙŽØ§Ø¨ÙŽ Ù…ÙŽÙ† Ø¯ÙŽØ³ÙŽÙ‘Ø§Ù‡ÙŽØ§",
              translation: "He has succeeded who purifies it, and he has failed who instills it with corruption.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Individual entries reveal daily fluctuations, but weekly review reveals patterns â€” the recurring sins you keep falling into, the blessings you keep overlooking, and the areas where you are actually growing. Pattern recognition is where muhasaba transforms from diary-keeping into genuine self-knowledge.


**How?**

Every Friday (or another consistent day), read through your past week of entries. Note: Which blessings appear repeatedly? Which shortcomings keep returning? Are your intentions translating into action? Write a brief weekly summary highlighting one pattern to address and one strength to build on.` },
      ],
    },
    {
      title: 'Designate one day per week as a digital-free unplugged day',
      priority: 'medium', tags: ['digital-detox', 'rest'],
      description: 'The mind needs genuine rest â€” not just sleep, but freedom from the constant stimulation of screens and notifications. An unplugged day restores mental clarity, deepens family bonds, and creates space for worship, nature, and unhurried thought.',
      subtasks: [
        { title: 'Choose a consistent day of the week for your digital detox', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Hadith establishes the broad spiritual principle of valuing and not squandering the blessings of health and free time, it omits specific modern practices like scheduling a weekly digital detox, making the subtask a practical logical inference to intentionally preserve these blessings in the digital age.',
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6412",
              translation: "Ibn Abbas reported that the Prophet (peace be upon him) said: \"There are two blessings which many people are deceived about: health and free time.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Consistency makes the unplugged day a ritual rather than a random experiment. When the same day is always screen-free, your mind and family begin to anticipate and prepare for it, and the benefits compound week over week.


**How?**

Pick a day that works with your schedule â€” many people choose Saturday or Sunday. Consider choosing Friday to align with Jummah and family time. Avoid choosing a workday if your job requires digital communication. Commit to the same day every week for at least one month before reassessing.` },
        { title: 'Inform key contacts and set an auto-reply for that day', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources establish the broad spiritual principles of valuing the natural rhythms of rest and the blessings of health and free time, they omit specific modern logistical practices like setting a digital auto-reply, making the subtask a practical logical inference to systematically protect one\'s time and peace of mind from interruption.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 25:47",
              arabic: "ÙˆÙŽÙ‡ÙÙˆÙŽ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠ Ø¬ÙŽØ¹ÙŽÙ„ÙŽ Ù„ÙŽÙƒÙÙ…Ù Ø§Ù„Ù„ÙŽÙ‘ÙŠÙ’Ù„ÙŽ Ù„ÙØ¨ÙŽØ§Ø³Ù‹Ø§ ÙˆÙŽØ§Ù„Ù†ÙŽÙ‘ÙˆÙ’Ù…ÙŽ Ø³ÙØ¨ÙŽØ§ØªÙ‹Ø§ ÙˆÙŽØ¬ÙŽØ¹ÙŽÙ„ÙŽ Ø§Ù„Ù†ÙŽÙ‘Ù‡ÙŽØ§Ø±ÙŽ Ù†ÙØ´ÙÙˆØ±Ù‹Ø§",
              translation: "And He is the One Who made the night a garment for you, and sleep a rest, and made the day for rising.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 2346",
              translation: "The Prophet (SAW) said: \"There are two blessings which many people are deceived about: health and free time.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Fear of missing something urgent is the number one reason people break their digital detox. Informing key contacts in advance and setting an auto-reply eliminates this anxiety â€” you know that anyone who truly needs you can reach you through a phone call.


**How?**

Tell your family, close friends, and work colleagues which day you will be offline. Set an auto-reply on email and messaging apps: "I am offline today for a weekly digital detox. For urgent matters, please call me directly." This sets expectations and frees you from the compulsion to check.` },
        { title: 'Plan alternative activities: reading, family time, nature walks, mosque visits', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Quranic verse establishes the broad spiritual directive to disperse in the land and actively seek Allah\'s bounty after worship, it omits specific modern practices like planning alternative activities for a digital detox, making the subtask a practical logical inference to systematically engage in wholesome pursuits instead of remaining idle.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 62:10",
              arabic: "ÙÙŽØ¥ÙØ°ÙŽØ§ Ù‚ÙØ¶ÙÙŠÙŽØªÙ Ø§Ù„ØµÙŽÙ‘Ù„ÙŽØ§Ø©Ù ÙÙŽØ§Ù†ØªÙŽØ´ÙØ±ÙÙˆØ§ ÙÙÙŠ Ø§Ù„Ù’Ø£ÙŽØ±Ù’Ø¶Ù ÙˆÙŽØ§Ø¨Ù’ØªÙŽØºÙÙˆØ§ Ù…ÙÙ† ÙÙŽØ¶Ù’Ù„Ù Ø§Ù„Ù„ÙŽÙ‘Ù‡Ù",
              translation: "And when the prayer has been concluded, disperse within the land and seek from the bounty of Allah.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

An unplugged day without a plan quickly becomes a boring day â€” and boredom drives you straight back to your phone. Planning enjoyable, meaningful activities in advance ensures the day feels like a gift rather than a deprivation.


**How?**

The night before your unplugged day, write a loose plan: morning Quran and breakfast with family, a nature walk or park visit, an afternoon reading session, visiting the mosque for a prayer, cooking a meal together. You do not need to schedule every hour â€” just have enough options that you never feel idle and tempted.` },
        { title: 'Put devices in a drawer or designated storage for the full day', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Quranic verse establishes the spiritual directive to remember Allah inwardly with humility during the mornings and evenings, it omits specific modern practices like physically storing digital devices, making the subtask a practical logical inference to systematically eliminate distractions and foster a conducive environment for this remembrance.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 7:205",
              arabic: "ÙˆÙŽØ§Ø°Ù’ÙƒÙØ± Ø±ÙŽÙ‘Ø¨ÙŽÙ‘ÙƒÙŽ ÙÙÙŠ Ù†ÙŽÙÙ’Ø³ÙÙƒÙŽ ØªÙŽØ¶ÙŽØ±ÙÙ‘Ø¹Ù‹Ø§ ÙˆÙŽØ®ÙÙŠÙÙŽØ©Ù‹ ÙˆÙŽØ¯ÙÙˆÙ†ÙŽ Ø§Ù„Ù’Ø¬ÙŽÙ‡Ù’Ø±Ù Ù…ÙÙ†ÙŽ Ø§Ù„Ù’Ù‚ÙŽÙˆÙ’Ù„Ù Ø¨ÙØ§Ù„Ù’ØºÙØ¯ÙÙˆÙÙ‘ ÙˆÙŽØ§Ù„Ù’Ø¢ØµÙŽØ§Ù„Ù",
              translation: "And remember your Lord within yourself in humility and in fear, without being apparent in speech, in the mornings and the evenings.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Out of sight, out of mind. If your phone is on the kitchen counter, you will pick it up reflexively dozens of times. Physically storing devices in a drawer creates a real barrier between you and the screen, making the detox dramatically easier to maintain.


**How?**

Choose a drawer, box, or cabinet as your "device parking spot." The night before, charge all devices and place them there. In the morning, leave them. If you need a phone for emergency calls, put it on Do Not Disturb in another room â€” accessible but not convenient. Resist the urge to "just check one thing." ` },
        { title: 'Journal your experience after the first three unplugged days to notice the impact', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources establish the foundational spiritual principles of self-accountability and taking account of one\'s deeds, they omit specific modern practices like journaling after a digital detox, making the subtask a practical logical inference to systematically apply reflection to one\'s habits and well-being.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 59:18",
              arabic: "ÙŠÙŽØ§ Ø£ÙŽÙŠÙÙ‘Ù‡ÙŽØ§ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠÙ†ÙŽ Ø¢Ù…ÙŽÙ†ÙÙˆØ§ Ø§ØªÙŽÙ‘Ù‚ÙÙˆØ§ Ø§Ù„Ù„ÙŽÙ‘Ù‡ÙŽ ÙˆÙŽÙ„Ù’ØªÙŽÙ†Ø¸ÙØ±Ù’ Ù†ÙŽÙÙ’Ø³ÙŒ Ù…ÙŽÙ‘Ø§ Ù‚ÙŽØ¯ÙŽÙ‘Ù…ÙŽØªÙ’ Ù„ÙØºÙŽØ¯Ù",
              translation: "O you who have believed, fear Allah. And let every soul look to what it has put forth for tomorrow.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2577",
              translation: "The Prophet (SAW) said: \"Take account of yourselves before you are taken to account.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih â€” attributed to Umar ibn al-Khattab, widely narrated",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Without reflection, the benefits of an unplugged day fade into vague feelings. Journaling your experience creates a record you can revisit when motivation dips â€” concrete evidence that disconnecting makes you calmer, more present, and more connected to what matters.


**How?**

After each of your first three unplugged days, write a short journal entry answering: How did I feel during the day? What did I notice about my attention and mood? What did I do with the extra time? What was hardest? After three entries, compare them â€” most people notice significant positive shifts by the third week.` },
      ],
    },
    {
      title: 'Study and practise Sunnah grounding techniques: wudu for anger, salah for stress, istighfar for guilt',
      priority: 'medium', tags: ['sunnah', 'mental-health'],
      description: 'The Prophet (SAW) prescribed specific spiritual actions for specific emotional states â€” wudu to cool anger, prayer to find relief in distress, and istighfar to release guilt. These are divinely guided coping mechanisms that address both the spiritual and psychological root of difficult emotions.',
      subtasks: [
        { title: 'Study the hadith sources for each technique (angerâ†’wudu, distressâ†’salah, guiltâ†’istighfar)', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Hadiths establish the prophetic prescription of making wudu to extinguish anger and the virtue of self-control, they omit the other mentioned techniques and specific modern practices like writing references on a card, making the subtask a practical logical inference to systematically study and internalize these spiritual coping strategies.',
          sources: [
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 4782",
              translation: "The Prophet (SAW) said: \"If any of you becomes angry, let him keep silent.\" And he said: \"Anger comes from Shaytan, and Shaytan was created from fire, and fire is extinguished by water. So if any of you becomes angry, let him make wudu.\"",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6116",
              translation: "The Prophet (SAW) said: \"The strong man is not the one who can wrestle, but the strong man is the one who controls himself when angry.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Knowing the Prophetic source behind each technique transforms it from a generic coping strategy into an act of worship. When you understand that the Prophet (SAW) specifically prescribed wudu for anger, you approach the sink not just to calm down but to follow a Sunnah â€” and that intention multiplies the benefit.


**How?**

Look up the relevant hadith for each technique: the hadith about wudu extinguishing anger (Abu Dawud), the Prophet (SAW) turning to prayer when distressed, and the virtues of istighfar for relieving worry (Ahmad). Write each hadith on a card or in your phone for quick reference.` },
        { title: 'Create a personal cue card: "When I feel X, I will do Y"', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Hadith establishes the psychological principle of adopting specific, pre-planned physical responses to manage anger, it omits modern methods like creating a written cue card, making the subtask a practical logical inference to systematically apply this prophetic strategy of emotional regulation.',
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6116",
              translation: "The Prophet (peace be upon him) said: \"If any one of you becomes angry, let him keep silent.\" In another narration: \"If one of you becomes angry while standing, let him sit down. If the anger does not leave, let him lie down.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

In the heat of a strong emotion, your rational mind goes offline. A pre-written cue card bypasses the need to think â€” you have already decided what to do when anger, stress, or guilt strikes. This is the essence of emotional preparedness in Islam: planning your response before the test arrives.


**How?**

Write three simple if-then statements: "When I feel anger rising, I will make wudu." "When I feel overwhelmed or stressed, I will pray two rakaat." "When I feel guilt or shame, I will say istighfar 100 times." Keep this card in your wallet, on your desk, or as your phone lock screen.` },
        { title: 'Practise immediately the next time you experience anger, stress, or guilt', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources establish the spiritual virtue of restraining anger and the specific Prophetic prescription to make wudu when angry, they omit explicit directives to practice this immediately for a broader range of emotions like stress or guilt, making the subtask a practical logical inference to systematically build emotional regulation habits.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:134",
              arabic: "ÙˆÙŽØ§Ù„Ù’ÙƒÙŽØ§Ø¸ÙÙ…ÙÙŠÙ†ÙŽ Ø§Ù„Ù’ØºÙŽÙŠÙ’Ø¸ÙŽ ÙˆÙŽØ§Ù„Ù’Ø¹ÙŽØ§ÙÙÙŠÙ†ÙŽ Ø¹ÙŽÙ†Ù Ø§Ù„Ù†ÙŽÙ‘Ø§Ø³Ù",
              translation: "And those who restrain anger and who pardon the people â€” and Allah loves the doers of good.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 4782",
              translation: "The Prophet (SAW) said: \"If any of you becomes angry, let him make wudu, for anger comes from fire and fire is extinguished with water.\"",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Knowledge without practice is like medicine that stays in the bottle. The first time you actually get up and make wudu when angry â€” or pray when stressed â€” you experience firsthand the power of these Prophetic prescriptions. That lived experience is what transforms theory into lifelong habit.


**How?**

Commit right now: the very next time you feel a strong negative emotion, you will use the corresponding technique. Do not wait for a "big" moment â€” practice with mild irritation or minor stress first. The more you practice in small moments, the more automatic it becomes for the big ones.` },
        { title: 'Reflect on effectiveness in your muhasaba journal after each use', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Quranic verse establishes the spiritual virtue of restraining anger, it omits specific modern practices like maintaining a muhasaba journal, making the subtask a practical logical inference to systematically track and improve one\'s emotional regulation over time.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:134",
              arabic: "ÙˆÙŽØ§Ù„Ù’ÙƒÙŽØ§Ø¸ÙÙ…ÙÙŠÙ†ÙŽ Ø§Ù„Ù’ØºÙŽÙŠÙ’Ø¸ÙŽ ÙˆÙŽØ§Ù„Ù’Ø¹ÙŽØ§ÙÙÙŠÙ†ÙŽ Ø¹ÙŽÙ†Ù Ø§Ù„Ù†ÙŽÙ‘Ø§Ø³Ù ÙˆÙŽØ§Ù„Ù„ÙŽÙ‘Ù‡Ù ÙŠÙØ­ÙØ¨ÙÙ‘ Ø§Ù„Ù’Ù…ÙØ­Ù’Ø³ÙÙ†ÙÙŠÙ†ÙŽ",
              translation: "Who restrain anger and who pardon the people â€” and Allah loves the doers of good.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Documenting when you used a Sunnah grounding technique and how it affected you creates a personal evidence base. Over time, you will see clear patterns proving that these divinely guided methods actually work â€” strengthening both your practice and your iman.


**How?**

After each time you use wudu for anger, salah for stress, or istighfar for guilt, note it in your muhasaba journal that evening. Record: what triggered the emotion, which technique you used, and how you felt afterward. Review these entries monthly to see your emotional growth.` },
      ],
    },
    {
      title: 'Read one book on Islamic psychology or tazkiyah al-nafs per month',
      priority: 'medium', tags: ['study', 'tazkiyah'],
      description: 'Islamic tradition has a rich body of knowledge on the purification of the soul and the diseases of the heart. Reading works by scholars like Imam al-Ghazali, Ibn al-Qayyim, and contemporary Muslim psychologists deepens self-understanding and provides tools for genuine inner transformation.',
      subtasks: [
        { title: 'Build a reading list â€” start with Ihya Ulum al-Din (abridged), Purification of the Heart, or Reclaim Your Heart', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Quranic verses establish the foundational divine command to read, learn, and seek knowledge, they omit specific practices like curating a reading list with specific contemporary and classical titles, making the subtask a practical logical inference to systematically fulfill this directive.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 96:1-5",
              arabic: "Ø§Ù‚Ù’Ø±ÙŽØ£Ù’ Ø¨ÙØ§Ø³Ù’Ù…Ù Ø±ÙŽØ¨ÙÙ‘ÙƒÙŽ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠ Ø®ÙŽÙ„ÙŽÙ‚ÙŽ Ø®ÙŽÙ„ÙŽÙ‚ÙŽ Ø§Ù„Ù’Ø¥ÙÙ†Ø³ÙŽØ§Ù†ÙŽ Ù…ÙÙ†Ù’ Ø¹ÙŽÙ„ÙŽÙ‚Ù Ø§Ù‚Ù’Ø±ÙŽØ£Ù’ ÙˆÙŽØ±ÙŽØ¨ÙÙ‘ÙƒÙŽ Ø§Ù„Ù’Ø£ÙŽÙƒÙ’Ø±ÙŽÙ…Ù Ø§Ù„ÙŽÙ‘Ø°ÙÙŠ Ø¹ÙŽÙ„ÙŽÙ‘Ù…ÙŽ Ø¨ÙØ§Ù„Ù’Ù‚ÙŽÙ„ÙŽÙ…Ù Ø¹ÙŽÙ„ÙŽÙ‘Ù…ÙŽ Ø§Ù„Ù’Ø¥ÙÙ†Ø³ÙŽØ§Ù†ÙŽ Ù…ÙŽØ§ Ù„ÙŽÙ…Ù’ ÙŠÙŽØ¹Ù’Ù„ÙŽÙ…Ù’",
              translation: "Recite in the name of your Lord who created â€” created man from a clinging substance. Recite, and your Lord is the most Generous â€” Who taught by the pen â€” taught man that which he knew not.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Without a curated reading list, you either never start or waste time on low-quality material. These three books represent different entry points into Islamic psychology â€” classical scholarship (Ghazali), poetic wisdom (Hamza Yusuf), and contemporary reflection (Yasmin Mogahed) â€” ensuring you find a voice that resonates with you.


**How?**

Order or download at least two of these books today. If you prefer classical depth, start with Ihya Ulum al-Din (use an abridged English translation). If you prefer accessible modern writing, start with Reclaim Your Heart. Add 2-3 more titles recommended by scholars or friends you trust. Keep the list in your journal or phone.` },
        { title: 'Schedule 20-30 minutes of daily reading time', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources establish the foundational divine command to read and the general obligation to seek knowledge, they omit specific logistical practices like scheduling 20-30 minutes of daily reading time, making the subtask a practical logical inference to systematically fulfill this overarching spiritual duty.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 96:1",
              arabic: "Ø§Ù‚Ù’Ø±ÙŽØ£Ù’ Ø¨ÙØ§Ø³Ù’Ù…Ù Ø±ÙŽØ¨ÙÙ‘ÙƒÙŽ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠ Ø®ÙŽÙ„ÙŽÙ‚ÙŽ",
              translation: "Read in the name of your Lord who created.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 2687",
              translation: "The Prophet (SAW) said: \"Seeking knowledge is an obligation upon every Muslim.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Reading about tazkiyah in scattered, random moments means you never build momentum or depth. A scheduled daily window â€” even just 20 minutes â€” ensures consistent progress. One book per month at this pace equals twelve transformative works in a year.


**How?**

Choose a time that naturally fits your routine â€” after Fajr, during lunch, or before bed. Block it on your calendar and treat it as an appointment with your soul. Keep your current book in your designated reading spot. Set a phone timer for 20 minutes so you do not have to watch the clock.` },
        { title: 'Take notes on key concepts and how they apply to your own nafs', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Quranic verses establish the foundational spiritual necessity of purifying the soul (nafs) to achieve success, they omit specific practices like taking written notes on key concepts, making the subtask a practical logical inference to systematically engage in this process of self-purification.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 91:7-10",
              arabic: "ÙˆÙŽÙ†ÙŽÙÙ’Ø³Ù ÙˆÙŽÙ…ÙŽØ§ Ø³ÙŽÙˆÙŽÙ‘Ø§Ù‡ÙŽØ§ ÙÙŽØ£ÙŽÙ„Ù’Ù‡ÙŽÙ…ÙŽÙ‡ÙŽØ§ ÙÙØ¬ÙÙˆØ±ÙŽÙ‡ÙŽØ§ ÙˆÙŽØªÙŽÙ‚Ù’ÙˆÙŽØ§Ù‡ÙŽØ§ Ù‚ÙŽØ¯Ù’ Ø£ÙŽÙÙ’Ù„ÙŽØ­ÙŽ Ù…ÙŽÙ† Ø²ÙŽÙƒÙŽÙ‘Ø§Ù‡ÙŽØ§ ÙˆÙŽÙ‚ÙŽØ¯Ù’ Ø®ÙŽØ§Ø¨ÙŽ Ù…ÙŽÙ† Ø¯ÙŽØ³ÙŽÙ‘Ø§Ù‡ÙŽØ§",
              translation: "And by the soul and He who proportioned it, and inspired it with its wickedness and its righteousness. He has succeeded who purifies it, and he has failed who corrupts it.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Passive reading entertains the mind but does not transform it. Writing notes forces you to process what you read, connect it to your own life, and identify which diseases of the heart or patterns of the nafs apply to you specifically. This active engagement is where real tazkiyah begins.


**How?**

Keep a small notebook or digital note file dedicated to your tazkiyah reading. After each session, write: one key concept from today's reading, how it applies to my own nafs, and one action I can take based on this insight. Review your notes before starting each new reading session.` },
        { title: 'Discuss insights with a friend, spouse, or study circle for deeper understanding', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Hadith establishes the broad spiritual virtue and reward of pursuing knowledge, it omits specific modern social methods like discussing insights with a friend, spouse, or study circle, making the subtask a practical logical inference to systematically deepen one\'s understanding.',
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (peace be upon him) said: \"Whoever follows a path in pursuit of knowledge, Allah will make easy for him a path to Paradise.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The companions of the Prophet (SAW) learned in community, not isolation. Discussing what you read with someone you trust deepens your understanding, reveals blind spots in your interpretation, and creates mutual accountability for applying what you learn.


**How?**

Invite one or two people to read the same book as you, or simply share interesting insights over a weekly coffee or phone call. If you have a study circle or halaqa, propose discussing a tazkiyah book together. Even sharing one insight per week with your spouse over dinner counts as meaningful discussion.` },
        { title: 'Apply at least one practical lesson from each book to your daily life', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources establish the foundational spiritual principles of purifying the soul and consistently performing small good deeds, they omit specific modern practices like applying lessons from a book or tracking them daily, making the subtask a practical logical inference to systematically fulfill these overarching directives.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 91:9",
              arabic: "Ù‚ÙŽØ¯Ù’ Ø£ÙŽÙÙ’Ù„ÙŽØ­ÙŽ Ù…ÙŽÙ† Ø²ÙŽÙƒÙŽÙ‘Ø§Ù‡ÙŽØ§",
              translation: "He has succeeded who purifies it (the soul).",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6464",
              translation: "The Prophet (SAW) said: \"The most beloved deeds to Allah are those done consistently, even if they are small.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Knowledge of Islamic psychology without application is hujjah (evidence) against you, not for you. The scholars of tazkiyah wrote their works to be lived, not merely admired. Applying even one lesson per book means you are actively purifying your nafs rather than just studying purification.


**How?**

At the end of each book, review your notes and choose the single most impactful lesson. Write it as a concrete commitment: "For the next 30 days, I will..." (e.g., "check my intention before every action," "respond to anger with silence for 10 seconds," "make istighfar before complaining"). Track your adherence daily.` },
      ],
    },
  ],
  health_mental_excellence: [
    {
      title: 'Begin a cognitive training programme â€” Quran memorisation or language learning',
      priority: 'medium', tags: ['memorisation', 'cognitive'],
      description: 'The brain, like any muscle, grows stronger with consistent challenge. Quran memorisation is the pinnacle of cognitive training for a Muslim â€” it strengthens memory, builds discipline, and earns immense reward. Language learning (Arabic especially) opens doors to understanding the deen directly.',
      subtasks: [
        { title: "Choose your track: Quran memorisation (hifz) or Arabic/language learning", done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources establish the spiritual virtue of learning the Quran and highlight its revelation in the clear Arabic language, they omit specific pedagogical strategies like choosing a single track to avoid diffusing energy, making the subtask a practical logical inference to systematically and effectively achieve these learning goals.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 41:44",
              arabic: "ÙˆÙŽÙ„ÙŽÙˆÙ’ Ø¬ÙŽØ¹ÙŽÙ„Ù’Ù†ÙŽØ§Ù‡Ù Ù‚ÙØ±Ù’Ø¢Ù†Ù‹Ø§ Ø£ÙŽØ¹Ù’Ø¬ÙŽÙ…ÙÙŠÙ‹Ù‘Ø§ Ù„ÙŽÙ‘Ù‚ÙŽØ§Ù„ÙÙˆØ§ Ù„ÙŽÙˆÙ’Ù„ÙŽØ§ ÙÙØµÙÙ‘Ù„ÙŽØªÙ’ Ø¢ÙŠÙŽØ§ØªÙÙ‡Ù Û– Ø£ÙŽØ£ÙŽØ¹Ù’Ø¬ÙŽÙ…ÙÙŠÙŒÙ‘ ÙˆÙŽØ¹ÙŽØ±ÙŽØ¨ÙÙŠÙŒÙ‘ Û— Ù‚ÙÙ„Ù’ Ù‡ÙÙˆÙŽ Ù„ÙÙ„ÙŽÙ‘Ø°ÙÙŠÙ†ÙŽ Ø¢Ù…ÙŽÙ†ÙÙˆØ§ Ù‡ÙØ¯Ù‹Ù‰ ÙˆÙŽØ´ÙÙÙŽØ§Ø¡ÙŒ",
              translation: "If We had made it a foreign Quran, they would have said, â€œIf only its verses were clear!â€ Say, â€œIt is guidance and healing for those who have faith.â€",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 13:37",
              arabic: "ÙˆÙŽÙƒÙŽØ°ÙŽÙ°Ù„ÙÙƒÙŽ Ø£ÙŽÙ†Ø²ÙŽÙ„Ù’Ù†ÙŽØ§Ù‡Ù Ø­ÙÙƒÙ’Ù…Ù‹Ø§ Ø¹ÙŽØ±ÙŽØ¨ÙÙŠÙ‹Ù‘Ø§ Ûš ÙˆÙŽÙ„ÙŽØ¦ÙÙ†Ù Ø§ØªÙŽÙ‘Ø¨ÙŽØ¹Ù’ØªÙŽ Ø£ÙŽÙ‡Ù’ÙˆÙŽØ§Ø¡ÙŽÙ‡ÙÙ… Ø¨ÙŽØ¹Ù’Ø¯ÙŽÙ…ÙŽØ§ Ø¬ÙŽØ§Ø¡ÙŽÙƒÙŽ Ù…ÙÙ†ÙŽ Ø§Ù„Ù’Ø¹ÙÙ„Ù’Ù…Ù Ù…ÙŽØ§ Ù„ÙŽÙƒÙŽ Ù…ÙÙ†ÙŽ Ø§Ù„Ù„ÙŽÙ‘Ù‡Ù Ù…ÙÙ† ÙˆÙŽÙ„ÙÙŠÙÙ‘ ÙˆÙŽÙ„ÙŽØ§ ÙˆÙŽØ§Ù‚Ù",
              translation: "So We have sent down the Quran to give judgement in the Arabic language. If you were to follow their desires, after the knowledge that has come to you, you would have no one to guard or protect you from God.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 16:103",
              arabic: "ÙˆÙŽÙ„ÙŽÙ‚ÙŽØ¯Ù’ Ù†ÙŽØ¹Ù’Ù„ÙŽÙ…Ù Ø£ÙŽÙ†ÙŽÙ‘Ù‡ÙÙ…Ù’ ÙŠÙŽÙ‚ÙÙˆÙ„ÙÙˆÙ†ÙŽ Ø¥ÙÙ†ÙŽÙ‘Ù…ÙŽØ§ ÙŠÙØ¹ÙŽÙ„ÙÙ‘Ù…ÙÙ‡Ù Ø¨ÙŽØ´ÙŽØ±ÙŒ Û— Ù„ÙÙ‘Ø³ÙŽØ§Ù†Ù Ø§Ù„ÙŽÙ‘Ø°ÙÙŠ ÙŠÙÙ„Ù’Ø­ÙØ¯ÙÙˆÙ†ÙŽ Ø¥ÙÙ„ÙŽÙŠÙ’Ù‡Ù Ø£ÙŽØ¹Ù’Ø¬ÙŽÙ…ÙÙŠÙŒÙ‘ ÙˆÙŽÙ‡ÙŽÙ°Ø°ÙŽØ§ Ù„ÙØ³ÙŽØ§Ù†ÙŒ Ø¹ÙŽØ±ÙŽØ¨ÙÙŠÙŒÙ‘ Ù…ÙÙ‘Ø¨ÙÙŠÙ†ÙŒ",
              translation: "We know very well that they say, â€œIt is a man who teaches him,â€ but the language of the person they allude to is foreign, while this revelation is in clear Arabic.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5027",
              translation: "The Prophet (SAW) said: â€œThe best of you are those who learn the Quran and teach it.â€",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Trying to do everything at once diffuses your energy and leads to abandoning both. Choosing one track â€” hifz or language â€” allows you to channel your full cognitive effort into deep, sustained practice. You can always add the second track later once the first is established.


**How?**

Ask yourself: what would benefit me more right now? If you already read Arabic but want a deeper connection to the Quran, choose hifz. If you cannot understand Arabic at all, learning the language first may be more foundational. Make your choice, commit for at least 6 months, and do not second-guess it.` },
        { title: 'Find a qualified teacher, programme, or structured app', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources establish the foundational virtues of seeking knowledge and the superiority of those who learn and teach the Quran, they omit specific modern methods like finding a structured app or program, making the subtask a practical logical inference to systematically facilitate guided learning.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 20:114",
              arabic: "ÙˆÙŽÙ‚ÙÙ„ Ø±ÙŽÙ‘Ø¨ÙÙ‘ Ø²ÙØ¯Ù’Ù†ÙÙŠ Ø¹ÙÙ„Ù’Ù…Ù‹Ø§",
              translation: "And say: My Lord, increase me in knowledge.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5027",
              translation: "The Prophet (peace be upon him) said: \"The best of you are those who learn the Quran and teach it.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Self-teaching Quran memorisation or Arabic is possible but dramatically slower and more error-prone than guided learning. A qualified teacher corrects your tajweed, holds you accountable, and adapts the pace to your ability â€” all of which accelerate progress and prevent bad habits from forming.


**How?**

For hifz: ask your local mosque about memorisation circles, or search for online hifz programmes with one-on-one recitation sessions. For Arabic: consider structured programmes like Bayyinah TV, Arabic With Husna, or a local institute. Prioritise programmes that include regular assessment and teacher feedback.` },
        { title: 'Set a daily practice window of 20-30 minutes minimum', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Hadith establishes the foundational spiritual principle that regular, consistent deeds are beloved to Allah even if small, it omits specific logistical details like setting a 20-30 minute daily practice window, making the subtask a practical logical inference to systematically apply this virtue.',
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6464",
              translation: "The Prophet (peace be upon him) said: \"The most beloved deed to Allah is the most regular and constant even if it were little.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Cognitive training requires daily repetition to build neural pathways. Sporadic practice â€” memorising on Monday, skipping until Thursday â€” means you spend most of your time re-learning what you forgot. A daily window of at least 20 minutes ensures forward momentum and retention.


**How?**

Choose a time when your mind is freshest â€” for most people, this is after Fajr or in the early morning. Block 20-30 minutes on your daily schedule. Start your session the same way each time (e.g., recite what you know, then learn new material, then review). Protect this time as non-negotiable.` },
        { title: 'Establish a review system to retain what you have already learned', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources explicitly emphasize that the Quran has been made easy for remembrance and highly praise those who learn it, they omit specific modern study techniques like using spaced repetition or flashcard apps, making the subtask a practical logical inference to systematically retain and preserve this sacred knowledge.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 54:17",
              arabic: "ÙˆÙŽÙ„ÙŽÙ‚ÙŽØ¯Ù’ ÙŠÙŽØ³ÙŽÙ‘Ø±Ù’Ù†ÙŽØ§ Ø§Ù„Ù’Ù‚ÙØ±Ù’Ø¢Ù†ÙŽ Ù„ÙÙ„Ø°ÙÙ‘ÙƒÙ’Ø±Ù ÙÙŽÙ‡ÙŽÙ„Ù’ Ù…ÙÙ† Ù…ÙÙ‘Ø¯ÙŽÙ‘ÙƒÙØ±Ù",
              translation: "And We have certainly made the Quran easy for remembrance, so is there any who will remember?",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5027",
              translation: "The Prophet (SAW) said: \"The best of you are those who learn the Quran and teach it.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Memorisation without review is like filling a bucket with holes. The brain naturally forgets over time, and Quran or language knowledge is no exception. A structured review system ensures that what you learned last month is still solid while you continue learning new material.


**How?**

Use a spaced repetition approach: review today's new material tomorrow, then again in 3 days, then weekly, then monthly. For hifz, recite previously memorised portions daily in your prayers. For language, use flashcard apps like Anki with spaced repetition built in. Dedicate at least half your practice time to review, not just new material.` },
        { title: 'Set monthly milestones (e.g., 1 page/week for hifz, 1 lesson/day for language)', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources explicitly emphasize that the Quran is made easy for remembrance and highlight the eternal rewards tied to the extent of one\'s memorization, they omit specific modern goal-setting practices like establishing monthly milestones, making the subtask a practical logical inference to systematically track progress and achieve these spiritual aspirations.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 54:17",
              arabic: "ÙˆÙŽÙ„ÙŽÙ‚ÙŽØ¯Ù’ ÙŠÙŽØ³ÙŽÙ‘Ø±Ù’Ù†ÙŽØ§ Ø§Ù„Ù’Ù‚ÙØ±Ù’Ø¢Ù†ÙŽ Ù„ÙÙ„Ø°ÙÙ‘ÙƒÙ’Ø±Ù ÙÙŽÙ‡ÙŽÙ„Ù’ Ù…ÙÙ† Ù…ÙÙ‘Ø¯ÙŽÙ‘ÙƒÙØ±Ù",
              translation: "And We have certainly made the Quran easy for remembrance, so is there any who will remember?",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 798",
              translation: "The Prophet (SAW) said: \"It will be said to the companion of the Quran: Read, ascend, and recite as you used to recite in the world, for your rank will be at the last verse you recite.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Without milestones, long-term goals feel abstract and motivation fades. Monthly targets break an enormous goal (memorising the entire Quran, becoming fluent in Arabic) into measurable checkpoints that give you regular wins and early warning if you are falling behind.


**How?**

Set a realistic monthly target based on your current pace. For hifz: 1 page per week means roughly 4 pages per month â€” at that pace, a full juz every 5-6 months. For language: completing one lesson per day in your programme. Write your milestones in your journal and review progress on the 1st of each month. Adjust targets based on actual performance, not wishful thinking.` },
      ],
    },
    {
      title: 'Engage a mentor, coach, or therapist for deep personal development',
      priority: 'medium', tags: ['mentorship', 'growth'],
      description: 'Every great companion had a mentor. Working with someone who can see your blind spots, challenge your assumptions, and hold you accountable accelerates growth in ways self-study alone cannot. This could be a shaykh, a professional coach, or a therapist depending on your needs.',
      subtasks: [
        { title: 'Identify what you most need right now: spiritual guidance, life coaching, or therapeutic support', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources establish the foundational command to ask people of knowledge when in need, they omit specific modern distinctions between spiritual, life, and therapeutic support, making the subtask a practical logical inference to systematically identify and seek the appropriate expertise.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 16:43",
              arabic: "ÙÙŽØ§Ø³Ù’Ø£ÙŽÙ„ÙÙˆØ§ Ø£ÙŽÙ‡Ù’Ù„ÙŽ Ø§Ù„Ø°ÙÙ‘ÙƒÙ’Ø±Ù Ø¥ÙÙ† ÙƒÙÙ†ØªÙÙ…Ù’ Ù„ÙŽØ§ ØªÙŽØ¹Ù’Ù„ÙŽÙ…ÙÙˆÙ†ÙŽ",
              translation: "So ask the people of knowledge if you do not know.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 4607",
              translation: "The Prophet (SAW) said: \"You must follow my Sunnah and the Sunnah of the rightly-guided caliphs after me. Hold fast to it.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A shaykh, a coach, and a therapist serve different functions. Seeking spiritual guidance for a clinical issue, or therapy for a strategic career question, means you get the wrong type of help. Clarity about your actual need ensures you invest time and money in the right kind of support.


**How?**

Reflect honestly: Are you struggling with iman, connection to Allah, or understanding your deen? You need a shaykh or spiritual mentor. Are you stuck on life direction, career, or productivity? You need a coach. Are you dealing with trauma, anxiety, depression, or emotional pain? You need a therapist. It is also okay to need more than one.` },
        { title: 'Research and shortlist 3-5 potential mentors, coaches, or therapists', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Hadith establishes the broad spiritual virtue and reward of pursuing knowledge, it omits specific modern logistical steps like researching and shortlisting a set number of mentors, coaches, or therapists, making the subtask a practical logical inference to systematically seek proper guidance and learning.',
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (peace be upon him) said: \"Whoever follows a path in pursuit of knowledge, Allah will make easy for him a path to Paradise.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The quality of the mentoring relationship depends heavily on fit â€” credentials, personality, communication style, and shared values all matter. Shortlisting multiple options gives you the ability to compare and choose wisely rather than committing to the first name you find.


**How?**

Ask trusted community members, imams, or friends for recommendations. Search professional directories for Muslim coaches or therapists. Check credentials, read reviews or testimonials, and look for someone whose approach resonates with you. Narrow your list to 3-5 strong candidates.` },
        { title: 'Reach out and schedule an introductory conversation with your top choice', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Hadith establishes the Prophet\'s welcoming and advising nature toward those seeking guidance, it omits specific modern logistical steps like scheduling an introductory call with a mentor or therapist, making the subtask a practical logical inference to actively initiate the process of seeking advice.',
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6167",
              translation: "Anas reported: The Prophet (peace be upon him) was not one who was harsh or rude. He would advise and listen, and he welcomed those who sought his guidance.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Research without action is procrastination in disguise. The introductory conversation is low-risk â€” most mentors and therapists offer a brief initial call to assess fit. Taking this step moves you from thinking about growth to actually investing in it.


**How?**

Send an email or make a call to your top choice today. Briefly introduce yourself, explain what you are looking for, and ask for a 15-20 minute introductory conversation. If they are unavailable or the fit does not feel right, move to the next person on your list. Do not let one rejection stop the process.` },
        { title: 'Commit to a regular cadence of sessions (weekly or bi-weekly)', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Hadith establishes the foundational spiritual principle that regular and constant deeds are most beloved to Allah, it omits specific logistical details like committing to a weekly or bi-weekly cadence for mentoring or therapy sessions, making the subtask a practical logical inference to systematically apply this virtue to personal development.',
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6464",
              translation: "The Prophet (peace be upon him) said: \"The most beloved deed to Allah is the most regular and constant even if it were little.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Sporadic sessions prevent the depth and momentum that mentoring, coaching, or therapy requires. A regular cadence â€” weekly for intensive work, bi-weekly for maintenance â€” ensures continuity. Your mentor or therapist can build on previous sessions rather than starting fresh each time.


**How?**

Agree on a frequency with your mentor or therapist during the introductory conversation. Block the recurring time on your calendar and treat it as unmovable. Budget for the cost if applicable. Commit to the cadence for at least 3 months before evaluating whether to adjust.` },
        { title: 'Prepare for each session with specific questions, challenges, or reflections', done: false,
          tier: 'T2',
          amanahRationale: 'Fallback assignment â€” NotebookLM returned stale conversation (empty answer, turn_number:0); subtask has sources so Qarina is the conservative assignment.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 29:69",
              arabic: "ÙˆÙŽØ§Ù„ÙŽÙ‘Ø°ÙÙŠÙ†ÙŽ Ø¬ÙŽØ§Ù‡ÙŽØ¯ÙÙˆØ§ ÙÙÙŠÙ†ÙŽØ§ Ù„ÙŽÙ†ÙŽÙ‡Ù’Ø¯ÙÙŠÙŽÙ†ÙŽÙ‘Ù‡ÙÙ…Ù’ Ø³ÙØ¨ÙÙ„ÙŽÙ†ÙŽØ§",
              translation: "And those who strive for Us â€” We will surely guide them to Our ways.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Showing up unprepared to a mentoring or therapy session wastes both your time and your guide's. Coming with specific questions, challenges you faced since the last session, or reflections from your journal ensures every session is focused, productive, and directly relevant to your growth.


**How?**

Keep a running note on your phone or in your journal labeled "For next session." Throughout the week, jot down questions, situations that challenged you, insights, or things you want to discuss. Review this note 15 minutes before each session and prioritise the top 2-3 items to cover.` },
      ],
    },
    {
      title: 'Write a personal soul-map: your psychological autobiography, values, wounds, and aspirations',
      priority: 'low', tags: ['reflection', 'tazkiyah'],
      description: 'A soul-map is a deep, honest written exploration of who you are â€” your formative experiences, core values, emotional wounds, recurring patterns, and highest aspirations. This exercise brings unconscious drivers into conscious awareness, enabling intentional change and genuine self-knowledge.',
      subtasks: [
        { title: 'Write your life story in 3-5 pages, focusing on pivotal moments that shaped you', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Quranic verses establish the foundational command to reflect on the soul and evaluate what one has put forth for the future, they omit specific modern practices like writing a 3-5 page life story, making the subtask a practical logical inference to systematically fulfill this duty of self-reflection.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 59:18",
              arabic: "ÙŠÙŽØ§ Ø£ÙŽÙŠÙÙ‘Ù‡ÙŽØ§ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠÙ†ÙŽ Ø¢Ù…ÙŽÙ†ÙÙˆØ§ Ø§ØªÙŽÙ‘Ù‚ÙÙˆØ§ Ø§Ù„Ù„ÙŽÙ‘Ù‡ÙŽ ÙˆÙŽÙ„Ù’ØªÙŽÙ†Ø¸ÙØ±Ù’ Ù†ÙŽÙÙ’Ø³ÙŒ Ù…ÙŽÙ‘Ø§ Ù‚ÙŽØ¯ÙŽÙ‘Ù…ÙŽØªÙ’ Ù„ÙØºÙŽØ¯Ù",
              translation: "O you who have believed, fear Allah. And let every soul look to what it has put forth for tomorrow.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 91:7-10",
              arabic: "ÙˆÙŽÙ†ÙŽÙÙ’Ø³Ù ÙˆÙŽÙ…ÙŽØ§ Ø³ÙŽÙˆÙŽÙ‘Ø§Ù‡ÙŽØ§ ÙÙŽØ£ÙŽÙ„Ù’Ù‡ÙŽÙ…ÙŽÙ‡ÙŽØ§ ÙÙØ¬ÙÙˆØ±ÙŽÙ‡ÙŽØ§ ÙˆÙŽØªÙŽÙ‚Ù’ÙˆÙŽØ§Ù‡ÙŽØ§",
              translation: "And by the soul and He who proportioned it, and inspired it with its wickedness and its righteousness.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Most of us have never sat down to write our own story. Pivotal moments â€” the loss that changed you, the teacher who believed in you, the failure that redirected your path â€” are scattered across memory without coherence. Writing them down reveals the narrative thread of your life and the qadr of Allah within it.


**How?**

Set aside 2-3 hours in a quiet place. Write chronologically from childhood to now, focusing on turning points: moments of joy, pain, decision, loss, and growth. Do not edit as you write â€” let the story flow. You can always revise later. Aim for 3-5 handwritten or typed pages.` },
        { title: 'List your top 5 non-negotiable values and test whether your life reflects them', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Quranic verses establish the foundational spiritual imperative to purify the soul by discerning between its inherent righteousness and wickedness, they omit specific modern practices like listing five core values to audit one\'s life, making the subtask a practical logical inference to systematically engage in this required self-purification.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 91:7-10",
              arabic: "ÙˆÙŽÙ†ÙŽÙÙ’Ø³Ù ÙˆÙŽÙ…ÙŽØ§ Ø³ÙŽÙˆÙŽÙ‘Ø§Ù‡ÙŽØ§ ÙÙŽØ£ÙŽÙ„Ù’Ù‡ÙŽÙ…ÙŽÙ‡ÙŽØ§ ÙÙØ¬ÙÙˆØ±ÙŽÙ‡ÙŽØ§ ÙˆÙŽØªÙŽÙ‚Ù’ÙˆÙŽØ§Ù‡ÙŽØ§ Ù‚ÙŽØ¯Ù’ Ø£ÙŽÙÙ’Ù„ÙŽØ­ÙŽ Ù…ÙŽÙ† Ø²ÙŽÙƒÙŽÙ‘Ø§Ù‡ÙŽØ§ ÙˆÙŽÙ‚ÙŽØ¯Ù’ Ø®ÙŽØ§Ø¨ÙŽ Ù…ÙŽÙ† Ø¯ÙŽØ³ÙŽÙ‘Ø§Ù‡ÙŽØ§",
              translation: "And by the soul and He who proportioned it, and inspired it with discernment of its wickedness and its righteousness. He has succeeded who purifies it, and he has failed who instills it with corruption.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Many people live with a disconnect between what they say they value and how they actually spend their time and energy. Listing your core values and honestly testing them against your real life reveals where you are aligned and where you are living in contradiction â€” which is a source of deep inner tension.


**How?**

Write down the 5 values most important to you (e.g., tawakkul, family, honesty, justice, knowledge). For each one, ask: "In the last month, what evidence shows I actually lived this value?" and "Where did I contradict it?" Be ruthlessly honest. The gaps you find are your highest-priority areas for growth.` },
        { title: 'Identify your deepest emotional wounds and how they influence your behaviour today', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources describe the ideal state of a reassured soul and establish that sorrow and emotional hurt serve to expiate sins, they omit specific psychological practices like identifying deep emotional wounds and tracing their origins, making the subtask a practical logical inference to systematically achieve inner healing and peace.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 89:27-30",
              arabic: "ÙŠÙŽØ§ Ø£ÙŽÙŠÙŽÙ‘ØªÙÙ‡ÙŽØ§ Ø§Ù„Ù†ÙŽÙ‘ÙÙ’Ø³Ù Ø§Ù„Ù’Ù…ÙØ·Ù’Ù…ÙŽØ¦ÙÙ†ÙŽÙ‘Ø©Ù Ø§Ø±Ù’Ø¬ÙØ¹ÙÙŠ Ø¥ÙÙ„ÙŽÙ‰Ù° Ø±ÙŽØ¨ÙÙ‘ÙƒÙ Ø±ÙŽØ§Ø¶ÙÙŠÙŽØ©Ù‹ Ù…ÙŽÙ‘Ø±Ù’Ø¶ÙÙŠÙŽÙ‘Ø©Ù‹",
              translation: "O reassured soul, return to your Lord, well-pleased and pleasing to Him.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5675",
              translation: "The Prophet (peace be upon him) said: \"No fatigue, nor disease, nor sorrow, nor sadness, nor hurt befalls a Muslim, even if it were the prick of a thorn, but Allah expiates some of his sins for that.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Unexamined emotional wounds do not heal â€” they drive behaviour from the shadows. The anger you cannot explain, the relationships you sabotage, the validation you endlessly seek often trace back to specific wounds from childhood, family, or past experiences. Naming them is the first step toward healing.


**How?**

Reflect on recurring emotional patterns in your life: what consistently triggers disproportionate anger, sadness, or fear? Trace each pattern back to its earliest memory. Write down what happened, how it made you feel, and how it still shows up in your behaviour today. This exercise may bring up strong emotions â€” be gentle with yourself, and consider sharing what you find with a therapist.` },
        { title: 'Describe the person you aspire to become in 5 years â€” spiritually, mentally, socially', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources establish the foundational spiritual commands to evaluate one\'s deeds and look toward the future, they omit specific modern practices like writing a detailed 5-year vision of oneself, making the subtask a practical logical inference to systematically fulfill this duty of self-accountability.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 59:18",
              arabic: "ÙˆÙŽÙ„Ù’ØªÙŽÙ†Ø¸ÙØ±Ù’ Ù†ÙŽÙÙ’Ø³ÙŒ Ù…ÙŽÙ‘Ø§ Ù‚ÙŽØ¯ÙŽÙ‘Ù…ÙŽØªÙ’ Ù„ÙØºÙŽØ¯Ù",
              translation: "And let every soul look to what it has put forth for tomorrow.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2577",
              translation: "Umar (RA) said: \"Take account of yourselves before you are taken to account, and weigh your deeds before they are weighed for you.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih â€” athar of Umar",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A clear vision of your future self creates a magnetic pull toward growth. Without it, you drift â€” reacting to life rather than intentionally building the character and capabilities you want. The soul-map is incomplete without a destination: who is the person Allah is shaping you to become?


**How?**

Write a detailed portrait of yourself 5 years from now across three dimensions. Spiritually: what is your relationship with Allah like? What is your Quran practice? Mentally: how do you handle stress, make decisions, and think? Socially: what are your relationships like, how do you serve your community? Be specific and vivid â€” this is not a wish list but a blueprint.` },
        { title: 'Share relevant portions with a trusted mentor or spouse for external reflection', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources establish the foundational principle of mutual reflection by describing a believer as a mirror to their brother, they omit specific modern practices like sharing a personal "soul-map" with a mentor or spouse, making the subtask a practical logical inference to systematically seek an external perspective for self-improvement.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:58",
              arabic: "Ø¥ÙÙ†ÙŽÙ‘ Ø§Ù„Ù„ÙŽÙ‘Ù‡ÙŽ ÙŠÙŽØ£Ù’Ù…ÙØ±ÙÙƒÙÙ…Ù’ Ø£ÙŽÙ† ØªÙØ¤ÙŽØ¯ÙÙ‘ÙˆØ§ Ø§Ù„Ù’Ø£ÙŽÙ…ÙŽØ§Ù†ÙŽØ§ØªÙ Ø¥ÙÙ„ÙŽÙ‰Ù° Ø£ÙŽÙ‡Ù’Ù„ÙÙ‡ÙŽØ§",
              translation: "Indeed, Allah commands you to render trusts to whom they are due.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 1956",
              translation: "The Prophet (SAW) said: \"The believer is a mirror to his brother.\" (Encouraging honest mutual reflection.)",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Self-knowledge has a ceiling when pursued alone. A trusted outside perspective â€” someone who knows you well and cares about your growth â€” can see patterns, blind spots, and strengths that you cannot see in yourself. Sharing your soul-map is an act of vulnerability that deepens both self-understanding and relational trust.


**How?**

Choose someone you deeply trust â€” your spouse, a close friend, a mentor, or a therapist. Share the portions of your soul-map that you are comfortable with. Ask them: "Does this match what you see in me? What am I missing? What patterns do you notice that I might not?" Listen without defending. Their perspective is a gift, not a judgement.` },
      ],
    },
  ],

  // â”€â”€ SAFETY & SECURITY â”€â”€
  health_safety_core: [
    {
      title: 'Confirm stable, secure, and dignified housing for your household',
      priority: 'urgent', tags: ['housing', 'security'],
      description: 'Shelter is one of the most fundamental human needs and a prerequisite for stability in every other area of life. Dignified housing means a space that is safe, clean, adequately sized, and free from threats â€” a foundation upon which spiritual and professional life can be built.',
      subtasks: [
        { title: 'Assess your current housing for safety issues (locks, lighting, structural integrity)', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources highlight the profound value of having a secure dwelling and a safe place of return, they omit specific modern practices like checking locks, lighting, and structural integrity, making the subtask a practical logical inference to systematically ensure this physical security.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:125",
              arabic: "ÙˆÙŽØ¥ÙØ°Ù’ Ø¬ÙŽØ¹ÙŽÙ„Ù’Ù†ÙŽØ§ Ø§Ù„Ù’Ø¨ÙŽÙŠÙ’ØªÙŽ Ù…ÙŽØ«ÙŽØ§Ø¨ÙŽØ©Ù‹ Ù„ÙÙ‘Ù„Ù†ÙŽÙ‘Ø§Ø³Ù ÙˆÙŽØ£ÙŽÙ…Ù’Ù†Ù‹Ø§",
              translation: "And when We made the House a place of return for the people and a place of security.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2965",
              translation: "The Prophet (peace be upon him) said: \"Whoever among you wakes up in the morning secure in his dwelling, healthy in his body, having his food for the day, it is as if the whole world has been gathered for him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A home that is physically unsafe undermines every other pursuit â€” you cannot focus on ibadah, work, or family when basic security is compromised. Identifying hazards is the first step toward fulfilling your amanah as protector of your household.


**How?**

Walk through your home room by room. Check that all exterior doors have functioning deadbolts and that windows lock securely. Test outdoor and hallway lighting â€” replace any burned-out bulbs. Look for structural concerns: cracks in walls, water damage, loose railings, or tripping hazards. Write down every issue you find and rank them by urgency.` },
        { title: 'Verify that your lease or mortgage terms are halal and sustainable', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Quranic verse establishes the foundational financial principle that trade is permitted and interest (riba) is forbidden, it omits specific modern applications like verifying lease or mortgage terms, making the subtask a practical logical inference to systematically ensure one\'s housing arrangements are halal.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:275",
              arabic: "Ø£ÙŽØ­ÙŽÙ„ÙŽÙ‘ Ø§Ù„Ù„ÙŽÙ‘Ù‡Ù Ø§Ù„Ù’Ø¨ÙŽÙŠÙ’Ø¹ÙŽ ÙˆÙŽØ­ÙŽØ±ÙŽÙ‘Ù…ÙŽ Ø§Ù„Ø±ÙÙ‘Ø¨ÙŽØ§",
              translation: "Allah has permitted trade and has forbidden interest (riba).",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Riba-based housing arrangements are among the most common haram financial entanglements Muslims face. Verifying that your lease or mortgage is halal ensures your shelter â€” one of your most fundamental needs â€” is not built on a prohibited foundation.


**How?**

Review your current lease or mortgage agreement. If you have a conventional mortgage, research Islamic home financing alternatives (murabaha, ijara, diminishing musharaka) available in your area. For renters, confirm your lease terms are transparent and fair. Consult a knowledgeable scholar or Islamic finance advisor if you are unsure about any terms.` },
        { title: 'Ensure the home provides adequate privacy and space for salah and family life', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Quranic verses establish the foundational concepts of the home as a place of rest and the importance of respecting external boundaries for privacy, they omit specific logistical details like evaluating personal space and designating a specific area for salah, making the subtask a practical logical inference to systematically ensure domestic tranquility and internal privacy.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 16:80",
              arabic: "ÙˆÙŽØ§Ù„Ù„ÙŽÙ‘Ù‡Ù Ø¬ÙŽØ¹ÙŽÙ„ÙŽ Ù„ÙŽÙƒÙÙ… Ù…ÙÙ‘Ù† Ø¨ÙÙŠÙÙˆØªÙÙƒÙÙ…Ù’ Ø³ÙŽÙƒÙŽÙ†Ù‹Ø§",
              translation: "And Allah has made for you from your homes a place of rest.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 24:27",
              arabic: "ÙŠÙŽØ§ Ø£ÙŽÙŠÙÙ‘Ù‡ÙŽØ§ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠÙ†ÙŽ Ø¢Ù…ÙŽÙ†ÙÙˆØ§ Ù„ÙŽØ§ ØªÙŽØ¯Ù’Ø®ÙÙ„ÙÙˆØ§ Ø¨ÙÙŠÙÙˆØªÙ‹Ø§ ØºÙŽÙŠÙ’Ø±ÙŽ Ø¨ÙÙŠÙÙˆØªÙÙƒÙÙ…Ù’ Ø­ÙŽØªÙŽÙ‘Ù‰Ù° ØªÙŽØ³Ù’ØªÙŽØ£Ù’Ù†ÙØ³ÙÙˆØ§ ÙˆÙŽØªÙØ³ÙŽÙ„ÙÙ‘Ù…ÙÙˆØ§ Ø¹ÙŽÙ„ÙŽÙ‰Ù° Ø£ÙŽÙ‡Ù’Ù„ÙÙ‡ÙŽØ§",
              translation: "O you who have believed, do not enter houses other than your own until you ascertain welcome and greet their inhabitants.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Privacy (sitr) is a core Islamic value, and your home should be a sanctuary where your family can pray, rest, and live without intrusion. A home that lacks adequate space or privacy creates stress and makes consistent ibadah difficult.


**How?**

Evaluate whether each family member has reasonable personal space. Designate a clean, quiet area for salah that can be kept free of distractions. Ensure bathrooms and bedrooms provide genuine privacy. If space is tight, use curtains, room dividers, or schedule coordination to create functional zones. Address any sight-line issues from windows or shared walls.` },
        { title: 'Address any urgent maintenance or safety concerns immediately', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Hadith highlights the immense spiritual and worldly blessing of waking up secure in one\'s dwelling, it omits specific modern actions like repairing broken locks or exposed wiring, making the subtask a practical logical inference to systematically ensure this praised physical security.',
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2965",
              translation: "The Prophet (peace be upon him) said: \"Whoever among you wakes up in the morning secure in his dwelling, healthy in his body, having his food for the day, it is as if the whole world has been gathered for him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Delaying urgent repairs â€” a broken lock, exposed wiring, a gas leak, mould â€” puts your family at real physical risk. Acting immediately on safety hazards is part of taking by the means (al-akhdh bil-asbab) while trusting in Allah.


**How?**

From your housing assessment, identify any issues that pose an immediate safety threat. Fix what you can yourself today â€” replace a broken lock, cover exposed wires, install a smoke detector. For issues beyond your skill, contact your landlord or hire a qualified professional. Do not wait for a convenient time; urgency means acting now.` },
        { title: 'If housing is unstable, create a plan with timeline and budget for improvement', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Quranic verse establishes the broad spiritual promise that Allah will provide a way out of hardships for those who fear Him, it omits specific modern logistical details like creating a timeline and budget for unstable housing, making the subtask a practical logical inference to systematically seek this promised relief.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 65:2-3",
              arabic: "ÙˆÙŽÙ…ÙŽÙ† ÙŠÙŽØªÙŽÙ‘Ù‚Ù Ø§Ù„Ù„ÙŽÙ‘Ù‡ÙŽ ÙŠÙŽØ¬Ù’Ø¹ÙŽÙ„ Ù„ÙŽÙ‘Ù‡Ù Ù…ÙŽØ®Ù’Ø±ÙŽØ¬Ù‹Ø§ ÙˆÙŽÙŠÙŽØ±Ù’Ø²ÙÙ‚Ù’Ù‡Ù Ù…ÙÙ†Ù’ Ø­ÙŽÙŠÙ’Ø«Ù Ù„ÙŽØ§ ÙŠÙŽØ­Ù’ØªÙŽØ³ÙØ¨Ù",
              translation: "And whoever fears Allah â€” He will make for him a way out and will provide for him from where he does not expect.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

If your current housing is genuinely unstable â€” unsafe neighbourhood, unaffordable rent, or uninhabitable conditions â€” you need a concrete plan, not just worry. A written plan with a timeline transforms anxiety into action and brings you closer to dignified shelter.


**How?**

Define what "stable housing" looks like for your family â€” location, size, cost, and safety criteria. Research options: moving, renegotiating your lease, applying for assistance, or saving for a halal mortgage. Set a realistic timeline with monthly milestones and a budget. Share the plan with your spouse or a trusted advisor for accountability.` },
      ],
    },
    {
      title: 'Verify that all basic needs (food, clothing, shelter) are covered by halal income',
      priority: 'urgent', tags: ['provision', 'halal'],
      description: ' Ensuring these essentials are covered by halal income is both a spiritual obligation and the foundation of financial peace. Any haram source taints everything built upon it.',
      subtasks: [
        { title: 'List all current income sources and verify each is halal', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources establish the foundational principles of not consuming wealth unjustly and ensuring that one\'s sustenance is pure to have supplications accepted, they omit specific accounting practices like listing all current income sources to verify they are halal, making the subtask a practical logical inference to systematically ensure this commanded financial purity.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:188",
              arabic: "ÙˆÙŽÙ„ÙŽØ§ ØªÙŽØ£Ù’ÙƒÙÙ„ÙÙˆØ§ Ø£ÙŽÙ…Ù’ÙˆÙŽØ§Ù„ÙŽÙƒÙÙ… Ø¨ÙŽÙŠÙ’Ù†ÙŽÙƒÙÙ… Ø¨ÙØ§Ù„Ù’Ø¨ÙŽØ§Ø·ÙÙ„Ù",
              translation: "And do not consume one another's wealth unjustly.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 1015",
              translation: "The Prophet (peace be upon him) said: \"Allah is Pure and He accepts only that which is pure.\" He then mentioned a man who makes du'a while his food, drink, and clothing are all from haram sources.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Every dirham that enters your household either carries barakah or strips it away. If even one income source involves riba, gambling, deception, or haram industries, it contaminates the provision your family depends on. Clarity here is non-negotiable.


**How?**

Write down every source of income: salary, side work, investments, rental income, government benefits, and gifts. For each one, assess whether the industry, the contract terms, and the way you earn it are halal. If you are unsure about any source, consult a knowledgeable scholar. Be honest â€” this exercise only works if you are willing to face uncomfortable truths.` },
        { title: 'Calculate your monthly essential expenses (food, clothing, shelter, utilities)', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources establish the fundamental obligation to spend according to one\'s means and to provide for dependents, they omit specific modern financial practices like calculating monthly essential expenses using a spreadsheet, making the subtask a practical logical inference to systematically ensure this duty is fulfilled without withholding necessary support.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 65:7",
              arabic: "Ù„ÙÙŠÙÙ†ÙÙÙ‚Ù’ Ø°ÙÙˆ Ø³ÙŽØ¹ÙŽØ©Ù Ù…ÙÙ‘Ù† Ø³ÙŽØ¹ÙŽØªÙÙ‡Ù ÙˆÙŽÙ…ÙŽÙ† Ù‚ÙØ¯ÙØ±ÙŽ Ø¹ÙŽÙ„ÙŽÙŠÙ’Ù‡Ù Ø±ÙØ²Ù’Ù‚ÙÙ‡Ù ÙÙŽÙ„Ù’ÙŠÙÙ†ÙÙÙ‚Ù’ Ù…ÙÙ…ÙŽÙ‘Ø§ Ø¢ØªÙŽØ§Ù‡Ù Ø§Ù„Ù„ÙŽÙ‘Ù‡Ù",
              translation: "Let a man of wealth spend from his wealth, and he whose provision is restricted â€” let him spend from what Allah has given him.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5355",
              translation: "The Prophet (SAW) said: \"It is sufficient sin for a man to withhold provision from those he is obliged to support.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

You cannot know whether your halal income is sufficient unless you know exactly what your essential costs are. This number is the baseline â€” the minimum your household needs to survive with dignity each month.


**How?**

Review the last three months of spending. Categorise expenses into essentials (rent/mortgage, food, utilities, clothing, transport, medical) and non-essentials. Total the essentials to get your monthly baseline. Use a spreadsheet or budgeting app to keep it precise. This number becomes the benchmark for your emergency fund and income planning.` },
        { title: 'Confirm that halal income fully covers these essentials with no shortfall', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Quranic verse establishes the broad spiritual promise that Allah will provide a way out and provide for those who fear Him, it omits specific modern financial practices like comparing halal income against monthly expenses to confirm coverage, making the subtask a practical logical inference to systematically ensure one\'s reliance on halal provision.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 65:2-3",
              arabic: "ÙˆÙŽÙ…ÙŽÙ† ÙŠÙŽØªÙŽÙ‘Ù‚Ù Ø§Ù„Ù„ÙŽÙ‘Ù‡ÙŽ ÙŠÙŽØ¬Ù’Ø¹ÙŽÙ„ Ù„ÙŽÙ‘Ù‡Ù Ù…ÙŽØ®Ù’Ø±ÙŽØ¬Ù‹Ø§ ÙˆÙŽÙŠÙŽØ±Ù’Ø²ÙÙ‚Ù’Ù‡Ù Ù…ÙÙ†Ù’ Ø­ÙŽÙŠÙ’Ø«Ù Ù„ÙŽØ§ ÙŠÙŽØ­Ù’ØªÙŽØ³ÙØ¨Ù",
              translation: "And whoever fears Allah â€” He will make for him a way out and will provide for him from where he does not expect.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

If your halal income does not cover your essential expenses, you are vulnerable â€” to debt, to compromise, and to the temptation of haram alternatives. Confirming coverage gives you the peace of mind that your foundation is sound.


**How?**

Compare your total verified halal income against your monthly essential expenses. If halal income exceeds essentials, you have a surplus to build on. If there is a shortfall, quantify it exactly â€” this is the gap you need to close. Be precise; rounding or estimating can hide real problems.` },
        { title: 'If there is a gap, identify halal income opportunities to close it', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Quranic verse establishes the foundational spiritual truth that Allah is the provider for all creatures, it omits specific modern financial practices like brainstorming halal income opportunities to close a budget gap, making the subtask a practical logical inference to systematically seek the provision promised by Him.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 11:6",
              arabic: "ÙˆÙŽÙ…ÙŽØ§ Ù…ÙÙ† Ø¯ÙŽØ§Ø¨ÙŽÙ‘Ø©Ù ÙÙÙŠ Ø§Ù„Ù’Ø£ÙŽØ±Ù’Ø¶Ù Ø¥ÙÙ„ÙŽÙ‘Ø§ Ø¹ÙŽÙ„ÙŽÙ‰ Ø§Ù„Ù„ÙŽÙ‘Ù‡Ù Ø±ÙØ²Ù’Ù‚ÙÙ‡ÙŽØ§",
              translation: "And there is no creature on earth but that upon Allah is its provision.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A shortfall between halal income and essential expenses is an urgent problem that will not resolve itself. Without a plan, the gap tends to be filled by debt or compromise. Proactively identifying halal alternatives is both practical wisdom and an act of tawakkul.


**How?**

Brainstorm halal income opportunities: freelance skills, a side business, a better-paying halal job, selling unused assets, or reducing non-essential expenses. Prioritise options by speed to revenue and alignment with your skills. Set a target date for closing the gap and track weekly progress. Ask Allah for barakah and then take concrete action.` },
        { title: 'Eliminate any haram income sources and replace them with halal alternatives', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Quranic verse explicitly commands believers to give up interest (riba), it omits specific modern logistical steps like creating an exit plan to eliminate and replace all haram income sources with halal alternatives, making the subtask a practical logical inference to systematically fulfill this divine prohibition.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:278-279",
              arabic: "ÙŠÙŽØ§ Ø£ÙŽÙŠÙÙ‘Ù‡ÙŽØ§ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠÙ†ÙŽ Ø¢Ù…ÙŽÙ†ÙÙˆØ§ Ø§ØªÙŽÙ‘Ù‚ÙÙˆØ§ Ø§Ù„Ù„ÙŽÙ‘Ù‡ÙŽ ÙˆÙŽØ°ÙŽØ±ÙÙˆØ§ Ù…ÙŽØ§ Ø¨ÙŽÙ‚ÙÙŠÙŽ Ù…ÙÙ†ÙŽ Ø§Ù„Ø±ÙÙ‘Ø¨ÙŽØ§ Ø¥ÙÙ† ÙƒÙÙ†ØªÙÙ… Ù…ÙÙ‘Ø¤Ù’Ù…ÙÙ†ÙÙŠÙ†ÙŽ",
              translation: "O you who have believed, fear Allah and give up what remains of interest, if you should be believers.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Continuing to earn from haram sources while knowing they are haram is a serious spiritual matter. Elimination is not optional once you have identified the problem.

**How?**

For each haram income source identified, create an exit plan with a timeline. If it is employment in a haram industry, begin job searching immediately. If it is an investment, liquidate and reinvest in halal vehicles. If it is a side hustle with haram elements, restructure or shut it down. Replace each eliminated source with a halal alternative before or as you exit.` },
      ],
    },
    {
      title: 'Build a 3-month emergency fund in a halal savings vehicle',
      priority: 'high', tags: ['finance', 'emergency'],
      description: 'An emergency fund provides a buffer against unexpected job loss, medical expenses, or urgent needs â€” reducing the temptation to take on riba-based debt in a crisis. Three months of essential expenses, held in a halal account, is the minimum safety net every Muslim household should have.',
      subtasks: [
        { title: 'Calculate your total monthly essential expenses to determine the 3-month target', done: false,
          tier: 'T3',
          amanahRationale: 'The provided Hadith addresses the intentions and spiritual consequences associated with borrowing money, offering neither clear proof nor contextual indication to support the distinct financial subtask of calculating a three-month emergency fund target.',
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1427",
              translation: "The Prophet (peace be upon him) said: \"Whoever takes the money of the people with the intention of repaying it, Allah will repay it on his behalf; and whoever takes it with the intention of wasting it, then Allah will waste him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Your emergency fund target must be based on real numbers, not guesses. An undersized fund gives false confidence, while an oversized target feels unreachable and delays action. Precision here sets you up for success.


**How?**

Use your monthly essential expenses calculation (food, shelter, utilities, transport, medical). Multiply by three to get your emergency fund target. Write this number down prominently â€” it is your goal. If you have not yet calculated your essentials, complete that subtask first.` },
        { title: 'Open a halal savings account (Islamic bank or halal investment vehicle)', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources establish the foundational principles of saving for future needs and taking practical precautions while trusting in Allah, they omit specific modern financial methods like opening a halal savings account, making the subtask a practical logical inference to systematically implement this required preparation.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 12:47-48",
              arabic: "Ù‚ÙŽØ§Ù„ÙŽ ØªÙŽØ²Ù’Ø±ÙŽØ¹ÙÙˆÙ†ÙŽ Ø³ÙŽØ¨Ù’Ø¹ÙŽ Ø³ÙÙ†ÙÙŠÙ†ÙŽ Ø¯ÙŽØ£ÙŽØ¨Ù‹Ø§ ÙÙŽÙ…ÙŽØ§ Ø­ÙŽØµÙŽØ¯ØªÙÙ‘Ù…Ù’ ÙÙŽØ°ÙŽØ±ÙÙˆÙ‡Ù ÙÙÙŠ Ø³ÙÙ†Ø¨ÙÙ„ÙÙ‡Ù Ø¥ÙÙ„ÙŽÙ‘Ø§ Ù‚ÙŽÙ„ÙÙŠÙ„Ù‹Ø§ Ù…ÙÙ‘Ù…ÙŽÙ‘Ø§ ØªÙŽØ£Ù’ÙƒÙÙ„ÙÙˆÙ†ÙŽ",
              translation: "Yusuf (AS) said: You will plant for seven years consecutively; and what you harvest, leave in its spears, except a little from which you will eat. (The Quranic model of saving for future need.)",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 2517",
              translation: "The Prophet (SAW) said: \"Tie your camel and then put your trust in Allah.\"",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Storing your emergency fund in a conventional interest-bearing account means your safety net is built on riba. A halal savings vehicle keeps your fund clean and ensures the barakah of your preparation is not undermined by the means you use to hold it.


**How?**

Research Islamic banks or credit unions in your area that offer savings accounts. If none are local, look into online Islamic banking options or halal money market funds. Compare fees, accessibility (you need quick access in emergencies), and any minimum balance requirements. Open the account and set it up for electronic transfers from your primary account.` },
        { title: 'Set up an automatic monthly transfer toward the emergency fund', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Quranic verse establishes the foundational financial principle of moderation in spending to avoid insolvency, it omits specific modern practices like setting up an automatic monthly transfer to an emergency fund, making the subtask a practical logical inference to systematically ensure this commanded financial balance.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 17:29",
              arabic: "ÙˆÙŽÙ„ÙŽØ§ ØªÙŽØ¬Ù’Ø¹ÙŽÙ„Ù’ ÙŠÙŽØ¯ÙŽÙƒÙŽ Ù…ÙŽØºÙ’Ù„ÙÙˆÙ„ÙŽØ©Ù‹ Ø¥ÙÙ„ÙŽÙ‰Ù° Ø¹ÙÙ†ÙÙ‚ÙÙƒÙŽ ÙˆÙŽÙ„ÙŽØ§ ØªÙŽØ¨Ù’Ø³ÙØ·Ù’Ù‡ÙŽØ§ ÙƒÙÙ„ÙŽÙ‘ Ø§Ù„Ù’Ø¨ÙŽØ³Ù’Ø·Ù",
              translation: "And do not make your hand as chained to your neck or extend it completely, lest you sit blamed and insolvent.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Automation removes willpower from the equation. If you rely on manually transferring money each month, life will get in the way. An automatic transfer treats your emergency fund like a non-negotiable bill â€” because it is.


**How?**

Log into your primary bank account and set up a recurring automatic transfer to your halal savings account. Schedule it for the day after your paycheck arrives. Start with whatever amount you can afford â€” even a small amount builds momentum. Increase the transfer amount whenever your income grows or expenses decrease.` },
        { title: 'Avoid touching the fund for non-emergencies â€” define what qualifies as an emergency', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Quranic verses establish the foundational principles of avoiding wastefulness and practicing moderation in spending, they omit specific modern financial rules like defining and restricting the use of an emergency fund, making the subtask a practical logical inference to systematically ensure this commanded financial discipline.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 17:27",
              arabic: "Ø¥ÙÙ†ÙŽÙ‘ Ø§Ù„Ù’Ù…ÙØ¨ÙŽØ°ÙÙ‘Ø±ÙÙŠÙ†ÙŽ ÙƒÙŽØ§Ù†ÙÙˆØ§ Ø¥ÙØ®Ù’ÙˆÙŽØ§Ù†ÙŽ Ø§Ù„Ø´ÙŽÙ‘ÙŠÙŽØ§Ø·ÙÙŠÙ†Ù",
              translation: "Indeed, the wasteful are brothers of the devils.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 25:67",
              arabic: "ÙˆÙŽØ§Ù„ÙŽÙ‘Ø°ÙÙŠÙ†ÙŽ Ø¥ÙØ°ÙŽØ§ Ø£ÙŽÙ†ÙÙŽÙ‚ÙÙˆØ§ Ù„ÙŽÙ…Ù’ ÙŠÙØ³Ù’Ø±ÙÙÙÙˆØ§ ÙˆÙŽÙ„ÙŽÙ…Ù’ ÙŠÙŽÙ‚Ù’ØªÙØ±ÙÙˆØ§ ÙˆÙŽÙƒÙŽØ§Ù†ÙŽ Ø¨ÙŽÙŠÙ’Ù†ÙŽ Ø°ÙŽÙ°Ù„ÙÙƒÙŽ Ù‚ÙŽÙˆÙŽØ§Ù…Ù‹Ø§",
              translation: "And those who, when they spend, do so not excessively nor sparingly but are ever, between that, moderate.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

An emergency fund that gets raided for vacations, gadgets, or "just this once" situations is not an emergency fund â€” it is a slush fund. Clear boundaries protect the fund from your own nafs and ensure it is there when you truly need it.


**How?**

Write a short list of what counts as an emergency: job loss, medical emergency, urgent home or car repair, or a family crisis. Post this list where you will see it. Anything not on the list requires you to find another funding source. If you do use the fund for a real emergency, prioritise replenishing it immediately afterward.` },
        { title: 'Track progress monthly until the 3-month target is reached', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources establish the overarching principles of disciplined, long-term saving and the mindful utilization of time, they omit specific modern financial practices like tracking a savings target monthly on a spreadsheet, making the subtask a practical logical inference to systematically achieve the commanded financial preparedness.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 12:47-48",
              arabic: "ØªÙŽØ²Ù’Ø±ÙŽØ¹ÙÙˆÙ†ÙŽ Ø³ÙŽØ¨Ù’Ø¹ÙŽ Ø³ÙÙ†ÙÙŠÙ†ÙŽ Ø¯ÙŽØ£ÙŽØ¨Ù‹Ø§",
              translation: "You will plant for seven years consecutively... (Yusuf's model of disciplined saving.)",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 2346",
              translation: "The Prophet (SAW) said: \"There are two blessings which many people are deceived about: health and free time.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Tracking progress keeps you motivated and accountable. Seeing your fund grow month by month reinforces the habit and helps you catch any missed transfers early. Without tracking, the goal stays abstract.


**How?**

Set a monthly reminder to check your emergency fund balance. Record the balance in a simple spreadsheet or notebook alongside your target. Calculate the percentage complete and estimated months to reach the goal. Celebrate milestones â€” reaching 25%, 50%, and 75% of your target are real achievements. Adjust your transfer amount if progress is too slow.` },
      ],
    },
    {
      title: 'Obtain basic first aid and CPR certification',
      priority: 'high', tags: ['first-aid', 'preparation'],
      description: 'Knowing how to respond in a medical emergency can save a life â€” a family member, a colleague, or a stranger. First aid and CPR certification equips you with practical skills that fulfil the Islamic duty of preserving life (hifz al-nafs) in its most direct form.',
      subtasks: [
        { title: 'Find a certified first aid and CPR course in your area or online', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources establish the profound spiritual merit of saving a life and the imperative to use medical treatment, they omit specific modern methods like taking a certified first aid or CPR course, making the subtask a practical logical inference to systematically acquire the skills needed to fulfill this divine mandate.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 5:32",
              arabic: "ÙˆÙŽÙ…ÙŽÙ†Ù’ Ø£ÙŽØ­Ù’ÙŠÙŽØ§Ù‡ÙŽØ§ ÙÙŽÙƒÙŽØ£ÙŽÙ†ÙŽÙ‘Ù…ÙŽØ§ Ø£ÙŽØ­Ù’ÙŠÙŽØ§ Ø§Ù„Ù†ÙŽÙ‘Ø§Ø³ÙŽ Ø¬ÙŽÙ…ÙÙŠØ¹Ù‹Ø§",
              translation: "And whoever saves a life, it is as if he has saved all of mankind.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 2038",
              translation: "The Prophet (SAW) said: \"Make use of medical treatment, for Allah has not made a disease without appointing a remedy for it.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

You cannot learn these skills from a YouTube video alone â€” proper certification involves hands-on practice with feedback from qualified instructors. Finding the right course is the first step toward being prepared to save a life.


**How?**

Search for Red Cross, Red Crescent, St John Ambulance, or equivalent certified courses in your area. Check local community centres, mosques, or hospitals for scheduled classes. Online-only courses work for theory but ensure you also get in-person practice. Compare cost, schedule, and certification validity before enrolling.` },
        { title: 'Register and complete the course (typically 4-8 hours)', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Quranic verse establishes the profound spiritual merit of saving a life, it omits specific modern logistical steps like registering for and completing a first aid or CPR course, making the subtask a practical logical inference to systematically acquire the skills necessary to fulfill this noble action.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 5:32",
              arabic: "ÙˆÙŽÙ…ÙŽÙ†Ù’ Ø£ÙŽØ­Ù’ÙŠÙŽØ§Ù‡ÙŽØ§ ÙÙŽÙƒÙŽØ£ÙŽÙ†ÙŽÙ‘Ù…ÙŽØ§ Ø£ÙŽØ­Ù’ÙŠÙŽØ§ Ø§Ù„Ù†ÙŽÙ‘Ø§Ø³ÙŽ Ø¬ÙŽÙ…ÙÙŠØ¹Ù‹Ø§",
              translation: "And whoever saves a life, it is as if he has saved all of mankind.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Knowledge without action is worth nothing. Registering locks you into a commitment, and completing the course transforms theoretical awareness into muscle memory that works under pressure.


**How?**

Register for the course you identified â€” pay the fee and block the time on your calendar. Attend the full session and participate actively in all practical exercises. Ask questions about scenarios you find confusing. Take the written and practical assessments seriously. Keep your certification card in a safe, accessible place.` },
        { title: 'Practise key skills: recovery position, CPR compressions, choking response', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Hadith establishes the general medical principle that every disease has a matching medicine through which Allah grants recovery, it omits specific modern first-aid techniques like practicing CPR compressions and the choking response, making the subtask a practical logical inference to systematically prepare and apply these life-saving treatments.',
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2199",
              translation: "The Prophet (peace be upon him) said: \"For every disease there is a medicine. If the medicine matches the disease, the person recovers by the permission of Allah.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Skills fade quickly without reinforcement. In a real emergency, you will not have time to recall what you learned six months ago â€” your body needs to remember through repeated practice.


**How?**

After the course, practise the recovery position with a family member. Review the CPR compression technique monthly â€” 30 compressions to 2 breaths, 5-6 cm depth, 100-120 beats per minute. Walk through the choking response (back blows and abdominal thrusts) so the sequence is automatic. Consider purchasing a practice mannequin or attending refresher workshops.` },
        { title: 'Keep your certification current with renewal before expiry', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Hadith establishes the general obligation to make use of medical treatment since Allah has appointed a remedy for every disease, it omits specific modern administrative steps like renewing a first-aid certification before its expiry, making the subtask a practical logical inference to systematically ensure one\'s medical knowledge and readiness remain effective.',
          sources: [
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 2038",
              translation: "The Prophet (SAW) said: \"Make use of medical treatment, for Allah has not made a disease without appointing a remedy for it, except for one disease â€” old age.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

First aid guidelines evolve as medical research advances. An expired certification means your knowledge may be outdated and you may not be covered legally if you intervene. Staying current is part of being genuinely prepared.


**How?**

Note your certification expiry date and set a calendar reminder two months before it lapses. Most certifications are valid for 2-3 years. Book a renewal course in advance so you do not lapse. Renewal courses are usually shorter than the initial certification and serve as valuable refreshers on updated protocols.` },
      ],
    },
    {
      title: 'Document an emergency contact plan â€” phone numbers, meeting point, exit routes',
      priority: 'medium', tags: ['emergency', 'planning'],
      description: 'In an emergency â€” fire, natural disaster, or security threat â€” panic is the enemy. A pre-documented plan with clear contacts, meeting points, and exit routes ensures your family can act quickly and reunite safely. Tawakkul in Allah does not negate taking practical precautions.',
      subtasks: [
        { title: 'List emergency contacts: family, neighbours, local emergency services, mosque', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources establish the broad principles of taking general precautions and coupling practical action with trust in Allah, they omit specific modern methods like creating a list of emergency contacts, making the subtask a practical logical inference to systematically fulfill this mandate.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:71",
              arabic: "ÙŠÙŽØ§ Ø£ÙŽÙŠÙÙ‘Ù‡ÙŽØ§ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠÙ†ÙŽ Ø¢Ù…ÙŽÙ†ÙÙˆØ§ Ø®ÙØ°ÙÙˆØ§ Ø­ÙØ°Ù’Ø±ÙŽÙƒÙÙ…Ù’",
              translation: "O you who have believed, take your precaution.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 2517",
              translation: "The Prophet (SAW) said: \"Tie your camel and then put your trust in Allah.\"",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

In an emergency, you should not have to search for phone numbers. Having every critical contact pre-listed means any family member â€” including children â€” can reach help immediately, even if the primary adult is incapacitated.


**How?**

Create a contact list that includes: local emergency services (police, fire, ambulance), your nearest hospital, your family doctor, trusted neighbours, close relatives, your mosque or imam, and poison control. Include full names, phone numbers, and addresses where relevant. Format it clearly so even a child could use it.` },
        { title: 'Identify two exit routes from your home and a family meeting point outside', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources establish the broad principles of taking precautions and being responsible for the safety of one\'s family, they omit specific modern emergency procedures like identifying two exit routes and a family meeting point, making the subtask a practical logical inference to systematically fulfill this mandate.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:71",
              arabic: "ÙŠÙŽØ§ Ø£ÙŽÙŠÙÙ‘Ù‡ÙŽØ§ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠÙ†ÙŽ Ø¢Ù…ÙŽÙ†ÙÙˆØ§ Ø®ÙØ°ÙÙˆØ§ Ø­ÙØ°Ù’Ø±ÙŽÙƒÙÙ…Ù’",
              translation: "O you who have believed, take your precaution.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 7138",
              translation: "The Prophet (SAW) said: \"Each of you is a shepherd and each of you is responsible for his flock.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

If the primary exit is blocked by fire or debris, a second route can save your life. A predetermined meeting point outside eliminates the deadly mistake of going back into a burning building to search for someone who is already safely outside.


**How?**

Walk through your home and identify two ways out of every room â€” typically a door and a window. Ensure windows designated as exits can actually be opened quickly. Choose a meeting point outside that is far enough from the building to be safe but close enough to be obvious â€” a specific tree, lamppost, or neighbour's front yard. Make sure every family member knows both routes and the meeting point.` },
        { title: 'Print the plan and post it in a visible location (kitchen or hallway)', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Quranic verse establishes the broad mandate to take general precautions, it omits specific modern emergency procedures like printing a physical emergency plan and posting it in a visible location, making the subtask a practical logical inference to systematically fulfill this divine command.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:71",
              arabic: "ÙŠÙŽØ§ Ø£ÙŽÙŠÙÙ‘Ù‡ÙŽØ§ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠÙ†ÙŽ Ø¢Ù…ÙŽÙ†ÙÙˆØ§ Ø®ÙØ°ÙÙˆØ§ Ø­ÙØ°Ù’Ø±ÙŽÙƒÙÙ…Ù’",
              translation: "O you who have believed, take your precaution.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A plan that only exists in your head or buried in a phone is useless during a crisis. A printed, visible copy ensures the information is accessible when screens are dark, hands are shaking, and time is critical.


**How?**

Format your emergency plan clearly on a single page: contacts at the top, exit routes in the middle, meeting point at the bottom. Use large, readable font. Print it and laminate it if possible. Post it on the inside of a kitchen cabinet door, on the fridge, or in the main hallway â€” somewhere every family member passes daily. Keep a backup copy in your car or go-bag.` },
        { title: 'Save all emergency numbers in every family member\'s phone', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources establish the broad principles of taking precautions and being responsible for the safety of one\'s family, they omit specific modern emergency procedures like saving all emergency numbers in every family member\'s phone, making the subtask a practical logical inference to systematically fulfill this mandate.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:71",
              arabic: "ÙŠÙŽØ§ Ø£ÙŽÙŠÙÙ‘Ù‡ÙŽØ§ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠÙ†ÙŽ Ø¢Ù…ÙŽÙ†ÙÙˆØ§ Ø®ÙØ°ÙÙˆØ§ Ø­ÙØ°Ù’Ø±ÙŽÙƒÙÙ…Ù’",
              translation: "O you who have believed, take your precaution.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 7138",
              translation: "The Prophet (SAW) said: \"Each of you is a shepherd and each of you is responsible for his flock.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Your printed plan covers the home, but emergencies happen everywhere. Having critical numbers saved in every phone means your family can reach help whether they are at school, at work, or travelling.


**How?**

Go through each family member's phone and add all emergency contacts with clear labels (e.g., "ICE - Dad", "Doctor - Dr. Ahmad", "Poison Control"). Use the ICE (In Case of Emergency) prefix so first responders can identify key contacts. For children without phones, ensure their school and caretakers have the full contact list. Test that every number is correct by calling each one.` },
        { title: 'Conduct a family walkthrough of the plan so everyone knows what to do', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources establish the broad principles of taking general precautions and bearing responsibility for the safety of one\'s household, they omit specific modern emergency preparedness procedures like conducting a family walkthrough of an evacuation plan, making the subtask a practical logical inference to systematically fulfill this mandate.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:71",
              arabic: "ÙŠÙŽØ§ Ø£ÙŽÙŠÙÙ‘Ù‡ÙŽØ§ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠÙ†ÙŽ Ø¢Ù…ÙŽÙ†ÙÙˆØ§ Ø®ÙØ°ÙÙˆØ§ Ø­ÙØ°Ù’Ø±ÙŽÙƒÙÙ…Ù’",
              translation: "O you who have believed, take your precaution.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 7138",
              translation: "The Prophet (SAW) said: \"Each of you is a shepherd and each of you is responsible for his flock.\" A man is a shepherd over his household and responsible for them.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A plan on paper is only as good as the people who know how to follow it. A walkthrough turns abstract instructions into physical memory â€” your children will know which window to open, which direction to run, and where to gather.


**How?**

Gather your entire household and walk through the emergency plan step by step. Physically practise both exit routes. Have everyone walk to the meeting point. Let each person practise calling an emergency contact. Make it calm and informative, not frightening â€” frame it as being smart and prepared. Repeat the walkthrough every six months or whenever a new family member moves in.` },
      ],
    },
  ],
  health_safety_growth: [
    {
      title: 'Improve living conditions â€” reduce overcrowding, noise, and environmental stressors',
      priority: 'high', tags: ['housing', 'well-being'],
      description: 'Your environment shapes your mental state. Overcrowding, excessive noise, clutter, and poor lighting create chronic stress that erodes well-being and makes ibadah, study, and family life harder. Improving your living conditions is an investment in every dimension of your life.',
      subtasks: [
        { title: 'Identify the top 3 environmental stressors in your home (noise, clutter, lighting, space)', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Hadith highlights the profound blessings of physical health and feeling secure in one\'s dwelling, it omits specific modern practices like identifying environmental stressors in the home, making the subtask a practical logical inference to systematically cultivate this promised domestic well-being.',
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2965",
              translation: "The Prophet (peace be upon him) said: \"Whoever among you wakes up in the morning secure in his dwelling, healthy in his body, having his food for the day, it is as if the whole world has been gathered for him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

You cannot fix what you have not identified. Most people adapt to chronic environmental stress without realising how much it drains them. Naming your top stressors is the first step toward a home that supports rather than sabotages your well-being.


**How?**

Spend a day paying deliberate attention to what bothers you in your home. Notice noise levels, clutter hotspots, dark corners, cramped spaces, temperature issues, or unpleasant smells. Ask family members what stresses them most. Rank everything and pick the top three that have the greatest daily impact on your mood and productivity.` },
        { title: 'Declutter one room at a time â€” remove what you do not need or use', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources establish the foundational principles of making the home a place of rest and maintaining cleanliness, they omit specific modern practices like decluttering one room at a time, making the subtask a practical logical inference to systematically achieve this commanded domestic peace and order.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 16:80",
              arabic: "ÙˆÙŽØ§Ù„Ù„ÙŽÙ‘Ù‡Ù Ø¬ÙŽØ¹ÙŽÙ„ÙŽ Ù„ÙŽÙƒÙÙ… Ù…ÙÙ‘Ù† Ø¨ÙÙŠÙÙˆØªÙÙƒÙÙ…Ù’ Ø³ÙŽÙƒÙŽÙ†Ù‹Ø§",
              translation: "And Allah has made for you from your homes a place of rest.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 443",
              translation: "The Prophet (SAW) said: \"Cleanliness is half of faith.\" (Emphasising the importance of a clean, orderly environment.)",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih â€” narrated in Sahih Muslim 223",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Clutter is not just an aesthetic problem â€” it creates visual noise that taxes your brain, makes cleaning harder, and subtly communicates disorder. The Prophet (SAW) valued cleanliness and order; a decluttered home is easier to maintain and more conducive to peace.


**How?**

Pick one room to start with â€” ideally the one you spend the most time in. Go through every item and decide: keep, donate, or discard. Be honest about what you actually use versus what you are keeping "just in case." Box up donations immediately and remove them from the house. Organise what remains with clear storage. Move to the next room only after the first is complete.` },
        { title: 'Address noise issues with practical solutions (rugs, curtains, white noise, conversation)', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources highlight the disruptive nature of overwhelming sound and the profound blessing of feeling secure and peaceful in one\'s dwelling, they omit specific modern acoustic solutions like using heavy curtains or white noise machines, making the subtask a practical logical inference to systematically cultivate this desired domestic tranquility and spiritual focus.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 80:33",
              arabic: "ÙÙŽØ¥ÙØ°ÙŽØ§ Ø¬ÙŽØ§Ø¡ÙŽØªÙ Ø§Ù„ØµÙŽÙ‘Ø§Ø®ÙŽÙ‘Ø©Ù",
              translation: "When the Deafening Blast comesâ€”",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              rationale: "the Quran's vivid depiction of overwhelming sound underscores how noise disrupts the heart's ability to focus; reducing worldly noise is a prerequisite for spiritual presence.",
            },
            {
              kind: "quran",
              ref: "Quran 101:2",
              arabic: "Ù…ÙŽØ§ Ø§Ù„Ù’Ù‚ÙŽØ§Ø±ÙØ¹ÙŽØ©Ù",
              translation: "What is the Crashing Blow?",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2965",
              translation: "The Prophet (SAW) said: \"Whoever among you wakes up secure in his dwelling, healthy in his body, having his food for the day â€” it is as if the whole world has been gathered for him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Chronic noise â€” traffic, neighbours, appliances, or even family activity â€” elevates cortisol, disrupts sleep, and makes concentration during salah or study nearly impossible. Reducing noise is one of the highest-impact improvements you can make.


**How?**

Identify your primary noise sources. For external noise, add heavy curtains, seal window gaps, or use a white noise machine. For hard-floor echo, lay down rugs or carpet. For internal noise conflicts (children playing while someone studies), establish quiet hours or use room dividers. If a neighbour is the source, have a respectful conversation â€” many people are unaware of the impact.` },
        { title: 'Improve lighting â€” maximise natural light and add warm task lighting where needed', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Quranic verse establishes the foundational concept of the home as a place of rest, it omits specific modern interior design practices like maximizing natural light or adding warm task lighting, making the subtask a practical logical inference to systematically cultivate this promised domestic tranquility.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 16:80",
              arabic: "ÙˆÙŽØ§Ù„Ù„ÙŽÙ‘Ù‡Ù Ø¬ÙŽØ¹ÙŽÙ„ÙŽ Ù„ÙŽÙƒÙÙ… Ù…ÙÙ‘Ù† Ø¨ÙÙŠÙÙˆØªÙÙƒÙÙ…Ù’ Ø³ÙŽÙƒÙŽÙ†Ù‹Ø§",
              translation: "And Allah has made for you from your homes a place of rest.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Poor lighting affects your mood, energy, eyesight, and circadian rhythm. Dark, dim spaces feel oppressive and make productive work harder. Good lighting is one of the simplest and most affordable upgrades you can make to transform how your home feels.


**How?**

Start by maximising natural light: clean windows, open curtains during the day, and trim any outdoor vegetation blocking light. For rooms with limited natural light, add warm-toned LED lamps at desk, reading, and kitchen work areas. Avoid harsh overhead fluorescents in living spaces. Use dimmer switches in bedrooms to support healthy sleep. Replace any flickering or burned-out bulbs immediately.` },
        { title: 'Create a dedicated quiet space for salah, reading, and reflection', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Quranic verses establish the foundational principles of the home as a place of rest and the command to remember Allah internally with humility, they omit specific modern logistical steps like creating a dedicated quiet space for worship, making the subtask a practical logical inference to systematically facilitate this commanded spiritual focus and domestic tranquility.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 16:80",
              arabic: "ÙˆÙŽØ§Ù„Ù„ÙŽÙ‘Ù‡Ù Ø¬ÙŽØ¹ÙŽÙ„ÙŽ Ù„ÙŽÙƒÙÙ… Ù…ÙÙ‘Ù† Ø¨ÙÙŠÙÙˆØªÙÙƒÙÙ…Ù’ Ø³ÙŽÙƒÙŽÙ†Ù‹Ø§",
              translation: "And Allah has made for you from your homes a place of rest.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 7:205",
              arabic: "ÙˆÙŽØ§Ø°Ù’ÙƒÙØ± Ø±ÙŽÙ‘Ø¨ÙŽÙ‘ÙƒÙŽ ÙÙÙŠ Ù†ÙŽÙÙ’Ø³ÙÙƒÙŽ ØªÙŽØ¶ÙŽØ±ÙÙ‘Ø¹Ù‹Ø§ ÙˆÙŽØ®ÙÙŠÙÙŽØ©Ù‹",
              translation: "And remember your Lord within yourself in humility and in fear.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Having a designated space for worship and reflection signals to your nafs and your family that these activities are a priority, not an afterthought. A quiet corner with a prayer mat, good lighting, and minimal distractions can transform your daily ibadah.


**How?**

Choose a clean, quiet corner of your home â€” it does not need to be an entire room. Lay a dedicated prayer mat and keep a Quran or mushaf nearby. Ensure the space faces the qiblah. Remove screens and distractions from the area. Add a small shelf for Islamic books. If space is limited, a foldable screen or curtain can partition a corner of a bedroom or living room.` },
      ],
    },
    {
      title: 'Research and obtain relevant Takaful (Islamic insurance) for health and property',
      priority: 'medium', tags: ['takaful', 'protection'],
      description: 'Takaful is the Islamic alternative to conventional insurance, based on mutual cooperation rather than riba and gharar. Securing takaful coverage for health and property protects your family from catastrophic financial loss while remaining within halal boundaries.',
      subtasks: [
        { title: 'Learn the difference between takaful and conventional insurance', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Quranic verse establishes the foundational mandate to cooperate in righteousness and avoid cooperating in sin, it omits specific modern financial concepts like takaful and conventional insurance, making the subtask a practical logical inference to systematically ensure one\'s financial practices align with this divine principle.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 5:2",
              arabic: "ÙˆÙŽØªÙŽØ¹ÙŽØ§ÙˆÙŽÙ†ÙÙˆØ§ Ø¹ÙŽÙ„ÙŽÙ‰ Ø§Ù„Ù’Ø¨ÙØ±ÙÙ‘ ÙˆÙŽØ§Ù„ØªÙŽÙ‘Ù‚Ù’ÙˆÙŽÙ‰Ù° ÙˆÙŽÙ„ÙŽØ§ ØªÙŽØ¹ÙŽØ§ÙˆÙŽÙ†ÙÙˆØ§ Ø¹ÙŽÙ„ÙŽÙ‰ Ø§Ù„Ù’Ø¥ÙØ«Ù’Ù…Ù ÙˆÙŽØ§Ù„Ù’Ø¹ÙØ¯Ù’ÙˆÙŽØ§Ù†Ù",
              translation: "And cooperate in righteousness and piety, but do not cooperate in sin and aggression.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Conventional insurance involves riba (interest), gharar (excessive uncertainty), and maysir (gambling-like risk transfer) â€” all prohibited in Islam. Understanding why takaful is different helps you make an informed choice and explain it to your family.


**How?**

Read a clear comparison article or watch a short lecture on takaful vs. conventional insurance. Key differences: takaful is based on mutual cooperation (tabarru) where participants contribute to a shared pool, while conventional insurance is a for-profit risk-transfer contract. In takaful, surplus is returned to participants; in conventional insurance, it becomes company profit. Take notes so you can explain it to your spouse.` },
        { title: 'Identify takaful providers available in your country or region', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Hadith establishes the profound spiritual rewards for truthful and trustworthy commerce, it omits specific modern financial steps like identifying regional takaful providers, making the subtask a practical logical inference to systematically ensure one\'s financial dealings align with this ethical standard.',
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2076",
              translation: "The Prophet (peace be upon him) said: \"The truthful and trustworthy merchant is with the prophets, the truthful, and the martyrs.\" Choosing ethical and Islamic financial providers follows this spirit of halal commerce.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Takaful availability varies widely by region. In some countries, multiple providers compete; in others, options are limited or nonexistent. Knowing what is available locally determines whether you can go fully halal or need to explore alternatives.


**How?**

Search online for "takaful providers in [your country/state]." Check Islamic finance directories and ask your local mosque or Muslim community for recommendations. If no takaful is available locally, research whether any providers offer online or cross-border coverage. Note each provider's product range, reputation, and Shariah board credentials.` },
        { title: 'Compare plans for health coverage â€” premiums, coverage limits, exclusions', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Quranic verse establishes the foundational financial principle of engaging in lawful trade by mutual consent and avoiding the unjust consumption of wealth, it omits specific modern steps like comparing health coverage plans and their details, making the subtask a practical logical inference to systematically ensure informed consent and fair financial dealings.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:29",
              arabic: "ÙŠÙŽØ§ Ø£ÙŽÙŠÙÙ‘Ù‡ÙŽØ§ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠÙ†ÙŽ Ø¢Ù…ÙŽÙ†ÙÙˆØ§ Ù„ÙŽØ§ ØªÙŽØ£Ù’ÙƒÙÙ„ÙÙˆØ§ Ø£ÙŽÙ…Ù’ÙˆÙŽØ§Ù„ÙŽÙƒÙÙ… Ø¨ÙŽÙŠÙ’Ù†ÙŽÙƒÙÙ… Ø¨ÙØ§Ù„Ù’Ø¨ÙŽØ§Ø·ÙÙ„Ù Ø¥ÙÙ„ÙŽÙ‘Ø§ Ø£ÙŽÙ† ØªÙŽÙƒÙÙˆÙ†ÙŽ ØªÙØ¬ÙŽØ§Ø±ÙŽØ©Ù‹ Ø¹ÙŽÙ† ØªÙŽØ±ÙŽØ§Ø¶Ù Ù…ÙÙ‘Ù†ÙƒÙÙ…Ù’",
              translation: "O you who have believed, do not consume one another's wealth unjustly but only in lawful trade by mutual consent.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Not all takaful plans are equal. A plan with low premiums but severe exclusions or low coverage limits can leave you exposed to the very catastrophic costs you are trying to protect against. Informed comparison prevents regret.


**How?**

Request quotes from at least two takaful providers. For each plan, compare: monthly contribution amount, annual coverage limit, out-of-pocket maximum, covered services (hospitalisation, outpatient, dental, maternity), and any exclusions or waiting periods. Check whether your preferred doctors and hospitals are in-network. Create a simple comparison table to make the decision clear.` },
        { title: 'Evaluate property/home takaful options for your dwelling and valuables', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources establish the foundational principles of cooperating in righteousness and relieving others of hardship, they omit specific modern financial practices like evaluating property or home takaful options, making the subtask a practical logical inference to systematically apply these concepts of mutual protection and risk mitigation.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 5:2",
              arabic: "ÙˆÙŽØªÙŽØ¹ÙŽØ§ÙˆÙŽÙ†ÙÙˆØ§ Ø¹ÙŽÙ„ÙŽÙ‰ Ø§Ù„Ù’Ø¨ÙØ±ÙÙ‘ ÙˆÙŽØ§Ù„ØªÙŽÙ‘Ù‚Ù’ÙˆÙŽÙ‰Ù°",
              translation: "And cooperate in righteousness and piety.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (SAW) said: \"Whoever relieves a believer of a hardship in this world, Allah will relieve him of a hardship on the Day of Resurrection.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A fire, flood, or theft could wipe out years of savings in a single event. Property takaful protects your physical assets â€” your home, furniture, electronics, and valuables â€” so that a disaster does not become a financial catastrophe on top of an emotional one.


**How?**

Estimate the replacement value of your home contents and any property you own. Request property takaful quotes and compare coverage for fire, theft, water damage, and natural disasters. Check whether the plan covers full replacement cost or depreciated value. Read the exclusions carefully â€” flood and earthquake coverage is often separate. Choose a plan that covers your most likely risks.` },
        { title: 'Select and enrol in the most suitable plans for your household', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Hadith emphasizes the profound blessings of feeling secure in one\'s dwelling and maintaining physical health, it omits specific modern financial mechanisms like enrolling in health and property takaful plans, making the subtask a practical logical inference to systematically safeguard these recognized blessings.',
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2965",
              translation: "The Prophet (peace be upon him) said: \"Whoever among you wakes up in the morning secure in his dwelling, healthy in his body, having his food for the day, it is as if the whole world has been gathered for him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Research without action leaves your family unprotected. Choosing and enrolling closes the loop â€” turning knowledge into actual coverage that will be there when crisis strikes.


**How?**

Based on your comparison, select the health and property takaful plans that offer the best balance of coverage, cost, and accessibility. Complete the application process, provide any required documentation, and set up payment. Keep copies of your policy documents in a secure, accessible location. Set a calendar reminder to review your coverage annually and update it after major life changes.` },
      ],
    },
    {
      title: 'Create a written home safety protocol (fire plan, emergency procedures)',
      priority: 'medium', tags: ['safety', 'planning'],
      description: 'A written safety protocol transforms vague intentions into clear, rehearsed actions. Covering fire escape, gas leaks, medical emergencies, and severe weather ensures your household is prepared for the most common domestic risks.',
      subtasks: [
        { title: 'Install or test smoke detectors and carbon monoxide alarms in your home', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Quranic verse establishes the broad mandate to take general precautions, it omits specific modern safety measures like installing smoke detectors and carbon monoxide alarms, making the subtask a practical logical inference to systematically fulfill this divine command.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:71",
              arabic: "ÙŠÙŽØ§ Ø£ÙŽÙŠÙÙ‘Ù‡ÙŽØ§ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠÙ†ÙŽ Ø¢Ù…ÙŽÙ†ÙÙˆØ§ Ø®ÙØ°ÙÙˆØ§ Ø­ÙØ°Ù’Ø±ÙŽÙƒÙÙ…Ù’",
              translation: "O you who have believed, take your precaution.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Smoke detectors and carbon monoxide alarms are your first line of defence against two of the deadliest household threats. They buy you the minutes you need to escape. A detector with a dead battery is as useless as no detector at all.


**How?**

Check every level of your home for smoke detectors â€” there should be one in every bedroom, outside each sleeping area, and on every floor including the basement. Test each detector by pressing the test button. Replace batteries immediately if the alarm is weak or chirping. If you have no carbon monoxide alarm, purchase and install one near sleeping areas. Replace any detector older than 10 years.` },
        { title: 'Write a fire escape plan with two exits per room and a meeting point', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources establish the broad principles of taking general precautions and bearing responsibility for the safety of one\'s family, they omit specific modern emergency procedures like writing a fire escape plan, making the subtask a practical logical inference to systematically fulfill this mandate.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:71",
              arabic: "ÙŠÙŽØ§ Ø£ÙŽÙŠÙÙ‘Ù‡ÙŽØ§ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠÙ†ÙŽ Ø¢Ù…ÙŽÙ†ÙÙˆØ§ Ø®ÙØ°ÙÙˆØ§ Ø­ÙØ°Ù’Ø±ÙŽÙƒÙÙ…Ù’",
              translation: "O you who have believed, take your precaution.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 7138",
              translation: "The Prophet (SAW) said: \"Each of you is a shepherd and each of you is responsible for his flock.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A documented fire escape plan removes the need to think during a crisis. When smoke fills a room, you have seconds â€” not minutes â€” to act. A written plan ensures every family member has a pre-decided path to safety.


**How?**

Draw a simple floor plan of your home. For each room, mark two exit routes (typically a door and a window). Indicate the location of smoke detectors and fire extinguishers. Mark the outdoor meeting point clearly. Write step-by-step instructions: hear alarm, get low, follow route, close doors behind you, meet outside, call emergency services. Keep the plan to one page.` },
        { title: 'Document procedures for gas leak, water leak, and power outage', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources establish the broad principles of taking general precautions and coupling practical action with trust in Allah, they omit specific modern emergency preparedness procedures like documenting responses for gas leaks, water leaks, and power outages, making the subtask a practical logical inference to systematically fulfill this mandate.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:71",
              arabic: "ÙŠÙŽØ§ Ø£ÙŽÙŠÙÙ‘Ù‡ÙŽØ§ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠÙ†ÙŽ Ø¢Ù…ÙŽÙ†ÙÙˆØ§ Ø®ÙØ°ÙÙˆØ§ Ø­ÙØ°Ù’Ø±ÙŽÙƒÙÙ…Ù’",
              translation: "O you who have believed, take your precaution.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 2517",
              translation: "The Prophet (SAW) said: \"Tie your camel and then put your trust in Allah.\"",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

These three emergencies are common yet often mishandled because people do not know the correct immediate response. A gas leak mishandled can cause an explosion; a water leak ignored can cause structural damage; a power outage can compromise food safety and medical equipment.


**How?**

For gas leaks: write down to not use any electrical switches, open windows, evacuate, and call the gas company from outside. For water leaks: document where your main water shutoff valve is and how to turn it off. For power outages: note the location of your fuse box, torches, and how to safely use backup power. Print these procedures and keep them with your fire escape plan.` },
        { title: 'Store a fire extinguisher in the kitchen and learn how to use it', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources establish the reality of fire and the broad principle of coupling practical precaution with trust in Allah, they omit specific modern safety measures like storing a fire extinguisher in the kitchen and learning its proper usage, making the subtask a practical logical inference to systematically fulfill this mandate.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 73:12",
              arabic: "Ø¥ÙÙ†ÙŽÙ‘ Ù„ÙŽØ¯ÙŽÙŠÙ’Ù†ÙŽØ§ Ø£ÙŽÙ†ÙƒÙŽØ§Ù„Ù‹Ø§ ÙˆÙŽØ¬ÙŽØ­ÙÙŠÙ…Ù‹Ø§",
              translation: "We have fetters, a blazing fire,",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              rationale: "the Quranic description of fire as a grave reality grounds the duty to protect one's household from its worldly danger.",
            },
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 2517",
              translation: "The Prophet (SAW) said: \"Tie your camel and then put your trust in Allah.\" (Emphasising that practical precaution and tawakkul go together.)",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Most home fires start in the kitchen. A fire extinguisher within reach can stop a small fire before it becomes a deadly blaze â€” but only if you know how to use it. An unused extinguisher during a kitchen fire is a tragic missed opportunity.


**How?**

Purchase an ABC-rated fire extinguisher (effective against ordinary, liquid, and electrical fires). Mount it on the wall near your kitchen exit â€” not next to the stove, where a fire would block access. Learn the PASS technique: Pull the pin, Aim at the base of the fire, Squeeze the handle, Sweep side to side. Check the pressure gauge monthly and replace the unit before its expiry date.` },
        { title: 'Rehearse the fire escape plan with all household members quarterly', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources establish the broad principles of taking general precautions and bearing responsibility for the safety of one\'s family, they omit specific modern emergency preparedness procedures like rehearsing a fire escape plan quarterly, making the subtask a practical logical inference to systematically fulfill this mandate.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:71",
              arabic: "ÙŠÙŽØ§ Ø£ÙŽÙŠÙÙ‘Ù‡ÙŽØ§ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠÙ†ÙŽ Ø¢Ù…ÙŽÙ†ÙÙˆØ§ Ø®ÙØ°ÙÙˆØ§ Ø­ÙØ°Ù’Ø±ÙŽÙƒÙÙ…Ù’",
              translation: "O you who have believed, take your precaution.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 7138",
              translation: "The Prophet (SAW) said: \"Each of you is a shepherd and each of you is responsible for his flock.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A plan that has never been practised will fail under pressure. Regular rehearsal builds muscle memory so that your family reacts automatically when the alarm sounds â€” no hesitation, no confusion, no wasted seconds.


**How?**

Set a quarterly calendar reminder for a family fire drill. Sound the alarm (or shout "fire drill"), start a timer, and have everyone follow the escape routes to the outdoor meeting point. Time the drill and discuss what went well and what was slow. Practise at different times â€” including at night â€” so the plan works regardless of when an emergency strikes. Make it a family routine, not a one-off exercise.` },
      ],
    },
    {
      title: 'Understand your legal rights as a Muslim in your jurisdiction (employment, religious accommodation)',
      priority: 'medium', tags: ['rights', 'knowledge'],
      description: 'Knowing your legal rights regarding religious practice â€” prayer breaks, hijab, dietary accommodation, holiday observance â€” empowers you to advocate for yourself professionally and protects you from unlawful discrimination. Knowledge here is both practical wisdom and a form of self-preservation.',
      subtasks: [
        { title: 'Research anti-discrimination laws regarding religion in your jurisdiction', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Quranic verses establish the foundational principles of standing firm in justice and recognizing human diversity, they omit specific modern legal actions like researching anti-discrimination laws, making the subtask a practical logical inference to systematically uphold and protect this mandated justice.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:135",
              arabic: "ÙŠÙŽØ§ Ø£ÙŽÙŠÙÙ‘Ù‡ÙŽØ§ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠÙ†ÙŽ Ø¢Ù…ÙŽÙ†ÙÙˆØ§ ÙƒÙÙˆÙ†ÙÙˆØ§ Ù‚ÙŽÙˆÙŽÙ‘Ø§Ù…ÙÙŠÙ†ÙŽ Ø¨ÙØ§Ù„Ù’Ù‚ÙØ³Ù’Ø·Ù",
              translation: "O you who have believed, be persistently standing firm in justice.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 49:13",
              arabic: "ÙŠÙŽØ§ Ø£ÙŽÙŠÙÙ‘Ù‡ÙŽØ§ Ø§Ù„Ù†ÙŽÙ‘Ø§Ø³Ù Ø¥ÙÙ†ÙŽÙ‘Ø§ Ø®ÙŽÙ„ÙŽÙ‚Ù’Ù†ÙŽØ§ÙƒÙÙ… Ù…ÙÙ‘Ù† Ø°ÙŽÙƒÙŽØ±Ù ÙˆÙŽØ£ÙÙ†Ø«ÙŽÙ‰Ù° ÙˆÙŽØ¬ÙŽØ¹ÙŽÙ„Ù’Ù†ÙŽØ§ÙƒÙÙ…Ù’ Ø´ÙØ¹ÙÙˆØ¨Ù‹Ø§ ÙˆÙŽÙ‚ÙŽØ¨ÙŽØ§Ø¦ÙÙ„ÙŽ Ù„ÙØªÙŽØ¹ÙŽØ§Ø±ÙŽÙÙÙˆØ§",
              translation: "O mankind, indeed We have created you from male and female and made you peoples and tribes that you may know one another.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

You cannot assert rights you do not know you have. Many Muslims face workplace discrimination or public harassment without realising that the law protects them. Knowledge of your legal protections is a form of self-defence.


**How?**

Search for your country or state's anti-discrimination legislation regarding religion. Read the sections on religious discrimination specifically. Note what is protected: hiring, firing, harassment, dress code, prayer breaks. Look for any recent case law involving Muslim employees. Save or bookmark the key legal references for future use.` },
        { title: "Understand your rights to religious accommodation at work (prayer, fasting, dress)", done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources establish the obligations to attend Friday prayers, gain religious understanding, and prevent oppression, they omit specific modern legal concepts like understanding one\'s rights to religious accommodation at work, making the subtask a practical logical inference to systematically secure the ability to fulfill these religious duties.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 62:9",
              arabic: "ÙŠÙŽØ§ Ø£ÙŽÙŠÙÙ‘Ù‡ÙŽØ§ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠÙ†ÙŽ Ø¢Ù…ÙŽÙ†ÙÙˆØ§ Ø¥ÙØ°ÙŽØ§ Ù†ÙÙˆØ¯ÙÙŠÙŽ Ù„ÙÙ„ØµÙŽÙ‘Ù„ÙŽØ§Ø©Ù Ù…ÙÙ† ÙŠÙŽÙˆÙ’Ù…Ù Ø§Ù„Ù’Ø¬ÙÙ…ÙØ¹ÙŽØ©Ù ÙÙŽØ§Ø³Ù’Ø¹ÙŽÙˆÙ’Ø§ Ø¥ÙÙ„ÙŽÙ‰Ù° Ø°ÙÙƒÙ’Ø±Ù Ø§Ù„Ù„ÙŽÙ‘Ù‡Ù ÙˆÙŽØ°ÙŽØ±ÙÙˆØ§ Ø§Ù„Ù’Ø¨ÙŽÙŠÙ’Ø¹ÙŽ Ûš Ø°ÙŽÙ°Ù„ÙÙƒÙÙ…Ù’ Ø®ÙŽÙŠÙ’Ø±ÙŒ Ù„ÙŽÙ‘ÙƒÙÙ…Ù’ Ø¥ÙÙ† ÙƒÙÙ†ØªÙÙ…Ù’ ØªÙŽØ¹Ù’Ù„ÙŽÙ…ÙÙˆÙ†ÙŽ",
              translation: "Believers! When the call to prayer is made on the day of congregation, hurry towards the reminder of God and leave off your trading â€” that is better for you, if only you knew.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 9:122",
              arabic: "ÙˆÙŽÙ…ÙŽØ§ ÙƒÙŽØ§Ù†ÙŽ Ø§Ù„Ù’Ù…ÙØ¤Ù’Ù…ÙÙ†ÙÙˆÙ†ÙŽ Ù„ÙÙŠÙŽÙ†ÙÙØ±ÙÙˆØ§ ÙƒÙŽØ§ÙÙŽÙ‘Ø©Ù‹ Ûš ÙÙŽÙ„ÙŽÙˆÙ’Ù„ÙŽØ§ Ù†ÙŽÙÙŽØ±ÙŽ Ù…ÙÙ† ÙƒÙÙ„ÙÙ‘ ÙÙØ±Ù’Ù‚ÙŽØ©Ù Ù…ÙÙ‘Ù†Ù’Ù‡ÙÙ…Ù’ Ø·ÙŽØ§Ø¦ÙÙÙŽØ©ÙŒ Ù„ÙÙ‘ÙŠÙŽØªÙŽÙÙŽÙ‚ÙŽÙ‘Ù‡ÙÙˆØ§ ÙÙÙŠ Ø§Ù„Ø¯ÙÙ‘ÙŠÙ†Ù ÙˆÙŽÙ„ÙÙŠÙÙ†Ø°ÙØ±ÙÙˆØ§ Ù‚ÙŽÙˆÙ’Ù…ÙŽÙ‡ÙÙ…Ù’ Ø¥ÙØ°ÙŽØ§ Ø±ÙŽØ¬ÙŽØ¹ÙÙˆØ§ Ø¥ÙÙ„ÙŽÙŠÙ’Ù‡ÙÙ…Ù’ Ù„ÙŽØ¹ÙŽÙ„ÙŽÙ‘Ù‡ÙÙ…Ù’ ÙŠÙŽØ­Ù’Ø°ÙŽØ±ÙÙˆÙ†ÙŽ",
              translation: "Yet it is not right for all the believers to go out together: out of each community, a group should go out to gain understanding of the religion, so that they can teach their people when they return and so that they can guard themselves against evil.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 1844",
              translation: "The Prophet (SAW) said: \"Help your brother, whether he is an oppressor or is being oppressed.\" They asked: \"How do we help him if he is an oppressor?\" He said: \"By stopping him from oppressing.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Many employers are legally required to accommodate sincere religious practices unless it causes undue hardship. Knowing this empowers you to request prayer breaks, Ramadan adjustments, or hijab accommodation with confidence rather than apology.


**How?**

Research the concept of "reasonable religious accommodation" in your jurisdiction. Understand what your employer is required to provide: a space for prayer, schedule flexibility for Jumu'ah, exceptions to dress codes for religious garments. Know the difference between a request and a demand â€” frame accommodation requests professionally, in writing, citing your legal rights. Keep copies of all correspondence.` },
        { title: 'Identify legal resources and Muslim advocacy organisations in your area', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Quranic verse establishes the foundational principle of human equality and the purpose of diversity as mutual understanding, it omits specific modern defensive strategies like identifying legal resources and Muslim advocacy organizations, making the subtask a practical logical inference to systematically protect this divine standard of respectful coexistence from being violated.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:13",
              arabic: "ÙŠÙŽØ§ Ø£ÙŽÙŠÙÙ‘Ù‡ÙŽØ§ Ø§Ù„Ù†ÙŽÙ‘Ø§Ø³Ù Ø¥ÙÙ†ÙŽÙ‘Ø§ Ø®ÙŽÙ„ÙŽÙ‚Ù’Ù†ÙŽØ§ÙƒÙÙ… Ù…ÙÙ‘Ù† Ø°ÙŽÙƒÙŽØ±Ù ÙˆÙŽØ£ÙÙ†Ø«ÙŽÙ‰Ù° ÙˆÙŽØ¬ÙŽØ¹ÙŽÙ„Ù’Ù†ÙŽØ§ÙƒÙÙ…Ù’ Ø´ÙØ¹ÙÙˆØ¨Ù‹Ø§ ÙˆÙŽÙ‚ÙŽØ¨ÙŽØ§Ø¦ÙÙ„ÙŽ Ù„ÙØªÙŽØ¹ÙŽØ§Ø±ÙŽÙÙÙˆØ§",
              translation: "O mankind, indeed We have created you from male and female and made you peoples and tribes that you may know one another.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

If your rights are ever violated, you need to know who to call before the crisis happens. Muslim advocacy organisations have experience navigating religious discrimination cases and can provide guidance, legal referrals, and support.


**How?**

Search for Muslim civil rights organisations active in your country (e.g., CAIR in the US, MEND in the UK, NCCM in Canada). Save their hotline numbers and websites. Identify local legal aid societies that handle discrimination cases. Ask your mosque if they have a legal committee or partnerships with Muslim lawyers. Keep this information accessible â€” you may need it on short notice.` },
        { title: 'Document any current or past accommodation requests and their outcomes', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Quranic verse establishes the foundational duty to enjoin what is right and forbid what is wrong, it omits specific modern administrative actions like documenting accommodation requests and their outcomes, making the subtask a practical logical inference to systematically create accountability and oppose workplace injustice.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:110",
              arabic: "ÙƒÙÙ†ØªÙÙ…Ù’ Ø®ÙŽÙŠÙ’Ø±ÙŽ Ø£ÙÙ…ÙŽÙ‘Ø©Ù Ø£ÙØ®Ù’Ø±ÙØ¬ÙŽØªÙ’ Ù„ÙÙ„Ù†ÙŽÙ‘Ø§Ø³Ù ØªÙŽØ£Ù’Ù…ÙØ±ÙÙˆÙ†ÙŽ Ø¨ÙØ§Ù„Ù’Ù…ÙŽØ¹Ù’Ø±ÙÙˆÙÙ ÙˆÙŽØªÙŽÙ†Ù’Ù‡ÙŽÙˆÙ’Ù†ÙŽ Ø¹ÙŽÙ†Ù Ø§Ù„Ù’Ù…ÙÙ†ÙƒÙŽØ±Ù",
              translation: "You are the best nation produced for mankind. You enjoin what is right and forbid what is wrong.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A paper trail is essential if a situation ever escalates to a formal complaint or legal action. Undocumented verbal requests are nearly impossible to prove. Documenting from the start protects you and creates accountability.


**How?**

Write down every accommodation request you have made at work: the date, what you asked for, who you asked, and what the response was. Include any follow-up conversations. If you made verbal requests in the past, send a follow-up email summarising the conversation to create a written record. Store these documents in a secure personal folder â€” not on your work computer.` },
        { title: 'Know the process for filing a complaint if your rights are violated', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources establish the foundational mandates to stand persistently firm in justice and actively prevent oppression, they omit specific modern legal procedures like knowing the process for filing a formal discrimination complaint, making the subtask a practical logical inference to systematically empower believers to combat injustice and fulfill this divine obligation.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:135",
              arabic: "ÙŠÙŽØ§ Ø£ÙŽÙŠÙÙ‘Ù‡ÙŽØ§ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠÙ†ÙŽ Ø¢Ù…ÙŽÙ†ÙÙˆØ§ ÙƒÙÙˆÙ†ÙÙˆØ§ Ù‚ÙŽÙˆÙŽÙ‘Ø§Ù…ÙÙŠÙ†ÙŽ Ø¨ÙØ§Ù„Ù’Ù‚ÙØ³Ù’Ø·Ù Ø´ÙÙ‡ÙŽØ¯ÙŽØ§Ø¡ÙŽ Ù„ÙÙ„ÙŽÙ‘Ù‡Ù",
              translation: "O you who have believed, be persistently standing firm in justice, witnesses for Allah.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 1844",
              translation: "The Prophet (SAW) said: \"Help your brother, whether he is an oppressor or is being oppressed.\" They asked: \"How do we help him if he is an oppressor?\" He said: \"By stopping him from oppressing.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Knowing the complaint process before you need it removes a major barrier to action. Many people suffer discrimination in silence because they do not know how or where to file a complaint. Preparation is empowerment.


**How?**

Research the formal complaint process for religious discrimination in your jurisdiction â€” this is often through a government agency (e.g., EEOC in the US, Equality and Human Rights Commission in the UK). Note the filing deadlines, required documentation, and steps involved. Identify whether your employer has an internal grievance procedure and understand that process as well. Consult with a Muslim advocacy organisation if you are unsure how to proceed.` },
      ],
    },
  ],
  health_safety_excellence: [
    {
      title: 'Contribute to a community safety initiative â€” neighbourhood watch, emergency response training',
      priority: 'low', tags: ['community', 'safety'],
      description: 'Extending safety beyond your own household to your community is a manifestation of the Prophetic principle that the best of people are those most beneficial to others. Community safety initiatives build social cohesion, deter harm, and create networks of mutual support.',
      subtasks: [
        { title: 'Research existing community safety programmes in your neighbourhood or mosque', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources establish the foundational principles of cooperating in righteousness and relieving others of hardship, they omit specific modern practices like researching existing community safety programmes, making the subtask a practical logical inference to systematically fulfill these mandates of mutual protection.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 5:2",
              arabic: "ÙˆÙŽØªÙŽØ¹ÙŽØ§ÙˆÙŽÙ†ÙÙˆØ§ Ø¹ÙŽÙ„ÙŽÙ‰ Ø§Ù„Ù’Ø¨ÙØ±ÙÙ‘ ÙˆÙŽØ§Ù„ØªÙŽÙ‘Ù‚Ù’ÙˆÙŽÙ‰Ù° ÙˆÙŽÙ„ÙŽØ§ ØªÙŽØ¹ÙŽØ§ÙˆÙŽÙ†ÙÙˆØ§ Ø¹ÙŽÙ„ÙŽÙ‰ Ø§Ù„Ù’Ø¥ÙØ«Ù’Ù…Ù ÙˆÙŽØ§Ù„Ù’Ø¹ÙØ¯Ù’ÙˆÙŽØ§Ù†Ù",
              translation: "And cooperate in righteousness and piety, but do not cooperate in sin and aggression.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (SAW) said: \"Whoever relieves a believer of a hardship in this world, Allah will relieve him of a hardship on the Day of Resurrection.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Before starting something new, find out what already exists. Joining an established programme multiplies your impact immediately, while reinventing the wheel wastes energy. Many mosques and neighbourhoods already have safety initiatives that need volunteers.


**How?**

Ask your mosque board, local council, or neighbourhood association whether any safety programmes exist â€” neighbourhood watch, community emergency response teams, or disaster preparedness committees. Check local government websites for community safety initiatives. Attend a community meeting to learn about active efforts and unmet needs.` },
        { title: 'Attend an introductory meeting or training session', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Hadith establishes the foundational duty to actively combat and change evil through direct action, it omits specific modern organizational steps like attending an introductory meeting or training session, making the subtask a practical logical inference to systematically prepare to fulfill this mandate.',
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 49",
              translation: "The Prophet (peace be upon him) said: \"Whoever among you sees an evil, let him change it with his hand; if he cannot, then with his tongue; if he cannot, then with his heart â€” and that is the weakest of faith.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Showing up is the transition from intention to commitment. An introductory meeting lets you meet the team, understand the scope of the initiative, and assess where your skills can best contribute â€” all before making a long-term commitment.


**How?**

Contact the programme coordinator and ask when the next meeting or training session is. Put it on your calendar and attend with an open mind. Listen more than you speak â€” learn the current structure, challenges, and how volunteers are deployed. Take notes on where you see opportunities to help. Introduce yourself and express your interest in contributing.` },
        { title: 'Volunteer for a specific role (coordinator, trainer, communications)', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Quranic verse establishes the foundational mandate to cooperate in righteousness and piety, it omits specific modern organizational actions like volunteering for defined roles, making the subtask a practical logical inference to systematically fulfill this divine command of mutual assistance.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 5:2",
              arabic: "ÙˆÙŽØªÙŽØ¹ÙŽØ§ÙˆÙŽÙ†ÙÙˆØ§ Ø¹ÙŽÙ„ÙŽÙ‰ Ø§Ù„Ù’Ø¨ÙØ±ÙÙ‘ ÙˆÙŽØ§Ù„ØªÙŽÙ‘Ù‚Ù’ÙˆÙŽÙ‰Ù°",
              translation: "And cooperate in righteousness and piety.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Vague involvement fades quickly. Committing to a specific role gives you accountability, a clear contribution, and makes you a reliable part of the team rather than an occasional drop-in. Defined roles are what make volunteer organisations actually function.


**How?**

After attending a meeting, identify which role aligns with your skills and availability. If you are organised, coordinate schedules and logistics. If you are a good communicator, handle outreach and social media. If you have relevant professional skills (medical, legal, technical), offer to lead training. Tell the coordinator which role you want and commit to a specific time commitment per week or month.` },
        { title: 'Complete any required training (community emergency response, de-escalation)', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources establish the foundational principles of cooperating in righteousness and responding to the hardships of fellow believers like a single body, they omit specific modern preparedness steps like completing community emergency response training, making the subtask a practical logical inference to systematically fulfill these mandates of mutual care and protection.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 5:2",
              arabic: "ÙˆÙŽØªÙŽØ¹ÙŽØ§ÙˆÙŽÙ†ÙÙˆØ§ Ø¹ÙŽÙ„ÙŽÙ‰ Ø§Ù„Ù’Ø¨ÙØ±ÙÙ‘ ÙˆÙŽØ§Ù„ØªÙŽÙ‘Ù‚Ù’ÙˆÙŽÙ‰Ù°",
              translation: "And cooperate in righteousness and piety.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6011",
              translation: "The Prophet (SAW) said: \"The believers in their mutual mercy, love, and compassion are like one body; if one part of it complains, the rest of the body responds with sleeplessness and fever.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Good intentions without training can cause more harm than good. Community emergency response and de-escalation training equip you with protocols that work under pressure, protecting both you and those you are trying to help.


**How?**

Ask the programme coordinator what training is required or recommended. Common options include CERT (Community Emergency Response Team) training, basic de-escalation and conflict resolution, first aid refreshers, and active threat response. Register for and complete the training within a set timeframe. Apply what you learn in practice scenarios and share key takeaways with your household.` },
        { title: 'Recruit at least two other community members to participate', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources establish the foundational mandate to form a group that invites to good and to act as a unified body, they omit specific modern organizational steps like recruiting community members to participate, making the subtask a practical logical inference to systematically build this collective capacity.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:104",
              arabic: "ÙˆÙŽÙ„Ù’ØªÙŽÙƒÙÙ† Ù…ÙÙ‘Ù†ÙƒÙÙ…Ù’ Ø£ÙÙ…ÙŽÙ‘Ø©ÙŒ ÙŠÙŽØ¯Ù’Ø¹ÙÙˆÙ†ÙŽ Ø¥ÙÙ„ÙŽÙ‰ Ø§Ù„Ù’Ø®ÙŽÙŠÙ’Ø±Ù ÙˆÙŽÙŠÙŽØ£Ù’Ù…ÙØ±ÙÙˆÙ†ÙŽ Ø¨ÙØ§Ù„Ù’Ù…ÙŽØ¹Ù’Ø±ÙÙˆÙÙ ÙˆÙŽÙŠÙŽÙ†Ù’Ù‡ÙŽÙˆÙ’Ù†ÙŽ Ø¹ÙŽÙ†Ù Ø§Ù„Ù’Ù…ÙÙ†ÙƒÙŽØ±Ù",
              translation: "And let there be among you a group inviting to good, enjoining what is right and forbidding what is wrong.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6011",
              translation: "The Prophet (SAW) said: \"The believers in their mutual mercy, love, and compassion are like one body.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Community safety is only as strong as the number of people involved. Recruiting others ensures the initiative is sustainable beyond any single person and builds the critical mass needed to make a real difference in your neighbourhood.


**How?**

Think of two or three people in your community who are reliable and community-minded â€” fellow mosque-goers, neighbours, or friends. Have a personal conversation about what the programme does and why it matters. Invite them to the next meeting or training session. People are more likely to join when personally invited by someone they trust than when they see a flyer.` },
      ],
    },
    {
      title: 'Develop a family continuity plan â€” wills, guardianship, Islamic estate planning',
      priority: 'medium', tags: ['planning', 'family'],
      description: 'Islamic estate planning (mirath) is a fardh obligation, yet most Muslims die without a valid Islamic will. A family continuity plan ensures your assets are distributed according to Shariah, your children have designated guardians, and your family is not left in legal limbo during their most vulnerable moment.',
      subtasks: [
        { title: 'Learn the Islamic rules of inheritance (mirath) and obligatory shares', done: false,
          tier: 'T2',
          amanahRationale: 'Fallback assignment â€” NotebookLM returned stale conversation (empty answer, turn_number:0); subtask has sources so Qarina is the conservative assignment.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:176",
              arabic: "**Translation:** They ask you [Prophet] for a ruling. Say, â€˜God gives you a ruling about inheritance from someone who dies childless with no surviving parents. If a man leaves a sister, she is entitled to half of the inheritance; if she has no child her brother is her sole heir; if there are two sisters, they are entitled to two-thirds of the inheritance between them, but if there are surviving brothers and sisters, the male is entitled to twice the share of the female. God makes this clear to you so that you do not make mistakes: He has full knowledge of everything.â€™",
              translation: "They ask you [Prophet] for a ruling. Say, â€˜God gives you a ruling about inheritance from someone who dies childless with no surviving parents. If a man leaves a sister, she is entitled to half of the inheritance; if she has no child her brother is her sole heir; if there are two sisters, they are entitled to two-thirds of the inheritance between them, but if there are surviving brothers and sisters, the male is entitled to twice the share of the female. God makes this clear to you so that you do not make mistakes: He has full knowledge of everything.â€™",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 4:127",
              arabic: "**Translation:** They ask you [Prophet] for a ruling about women. Say, â€˜God Himself gives you a ruling about them. You already have what has been recited to you in the Scripture about orphan girls [in your charge] from whom you withhold the prescribed shares [of their inheritance] and whom you wish to marry, and also about helpless children- God instructs you to treat orphans fairly: He is well aware of whatever good you do.â€™",
              translation: "They ask you [Prophet] for a ruling about women. Say, â€˜God Himself gives you a ruling about them. You already have what has been recited to you in the Scripture about orphan girls [in your charge] from whom you withhold the prescribed shares [of their inheritance] and whom you wish to marry, and also about helpless children- God instructs you to treat orphans fairly: He is well aware of whatever good you do.â€™",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6736",
              translation: "Narrated Huzail bin Shirahbil:Abu Musa was asked regarding (the inheritance of) a daughter, a son's daughter, and a sister. He said, \"The daughter will take one-half and the sister will take one-half. If you go to Ibn Mas`ud, he will tell you the same.\" Ibn Mas`ud was asked and was told of Abu Musa's verdict. Ibn Mas`ud then said, \"If I give the same verdict, I would stray and would not be of the rightly-guided. The verdict I will give in this case, will be the same as the Prophet (ï·º) did, i.e. one-half is for daughter, and one-sixth for the son's daughter, i.e. both shares make two-thirds of the total property; and the rest is for the sister.\" Afterwards we cams to Abu Musa and informed him of Ibn Mas`ud's verdict, whereupon he said, \"So, do not ask me for verdicts, as long as this learned man is among you",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1643",
              translation: "Narrated `Urwa:I asked `Aisha : \"How do you interpret the statement of Allah,. : Verily! (the mountains) As-Safa and Al-Marwa are among the symbols of Allah, and whoever performs the Hajj to the Ka`ba or performs `Umra, it is not harmful for him to perform Tawaf between them (Safa and Marwa.) (2.158). By Allah! (it is evident from this revelation) there is no harm if one does not perform Tawaf between Safa and Marwa.\" `Aisha said, \"O, my nephew! Your interpretation is not true. Had this interpretation of yours been correct, the statement of Allah should have been, 'It is not harmful for him if he does not perform Tawaf between them.' But in fact, this divine inspiration was revealed concerning the Ansar who used to assume Ihram for worshipping an idol called \"Manat\" which they used to worship at a place called Al-Mushallal before they embraced Islam, and whoever assumed Ihram (for the idol), would consider it not right to perform Tawaf between Safa and Marwa. When they embraced Islam, they asked Allah's Messenger (ï·º) regarding it, saying, \"O Allah's Apostle! We used to refrain from Tawaf between Safa and Marwa.\" So Allah revealed: 'Verily; (the mountains) As-Safa and Al-Marwa are among the symbols of Allah.' \" Aisha added, \"Surely, Allah's Apostle set the tradition of Tawaf between Safa and Marwa, so nobody is allowed to omit the Tawaf between them.\" Later on I (`Urwa) told Abu Bakr bin `Abdur-Rahman (of `Aisha's narration) and he said, 'I have not heard of such information, but I heard learned men saying that all the people, except those whom `Aisha mentioned and who used to assume Ihram for the sake of Manat, used to perform Tawaf between Safa and Marwa. When Allah referred to the Tawaf of the Ka`ba and did not mention Safa and Marwa in the Qur'an, the people asked, 'O Allah's Messenger (ï·º)! We used to perform Tawaf between Safa and Marwa and Allah has revealed (the verses concerning) Tawaf of the Ka`ba and has not mentioned Safa and Marwa. Is there any harm if we perform Tawaf between Safa and Marwa?' So Allah revealed: \"Verily As-Safa and Al- Marwa are among the symbols of Allah.\" Abu Bakr said, \"It seems that this verse was revealed concerning the two groups, those who used to refrain from Tawaf between Safa and Marwa in the Pre- Islamic Period of ignorance and those who used to perform the Tawaf then, and after embracing Islam they refrained from the Tawaf between them as Allah had enjoined Tawaf of the Ka`ba and did not mention Tawaf (of Safa and Marwa) till later after mentioning the Tawaf of the Ka`ba",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Islamic inheritance law is not optional â€” it is a divine command with specific shares prescribed in the Quran. Not knowing these rules means risking a distribution that violates what Allah has ordained, which wrongs both the deceased and the heirs.


**How?**

Study the Quranic verses on inheritance (primarily Surah An-Nisa, verses 11-12 and 176). Take a class or read a clear guidebook on Islamic inheritance. Understand the fixed shares (fard) for spouses, parents, children, and siblings. Learn when shares adjust based on the presence or absence of other heirs. Use an online mirath calculator to see how your own estate would be divided.` },
        { title: 'Draft an Islamic will (wasiyyah) with the help of a knowledgeable scholar or solicitor', done: false,
          tier: 'T2',
          amanahRationale: 'Fallback assignment â€” NotebookLM returned stale conversation (empty answer, turn_number:0); subtask has sources so Qarina is the conservative assignment.',
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
              kind: "hadith",
              ref: "Sahih al-Bukhari 3",
              translation: "Narrated 'Aisha (the mother of the faithful believers):The commencement of the Divine Inspiration to Allah's Messenger (ï·º) was in the form of good dreams which came true like bright daylight, and then the love of seclusion was bestowed upon him. He used to go in seclusion in the cave of Hira where he used to worship (Allah alone) continuously for many days before his desire to see his family. He used to take with him the journey food for the stay and then come back to (his wife) Khadija to take his food likewise again till suddenly the Truth descended upon him while he was in the cave of Hira. The angel came to him and asked him to read. The Prophet (ï·º) replied, \"I do not know how to read.\" The Prophet (ï·º) added, \"The angel caught me (forcefully) and pressed me so hard that I could not bear it any more. He then released me and again asked me to read and I replied, 'I do not know how to read.' Thereupon he caught me again and pressed me a second time till I could not bear it any more. He then released me and again asked me to read but again I replied, 'I do not know how to read (or what shall I read)?' Thereupon he caught me for the third time and pressed me, and then released me and said, 'Read in the name of your Lord, who has created (all that exists), created man from a clot. Read! And your Lord is the Most Generous.\" (96.1, 96.2, 96.3) Then Allah's Messenger (ï·º) returned with the Inspiration and with his heart beating severely. Then he went to Khadija bint Khuwailid and said, \"Cover me! Cover me!\" They covered him till his fear was over and after that he told her everything that had happened and said, \"I fear that something may happen to me.\" Khadija replied, \"Never! By Allah, Allah will never disgrace you. You keep good relations with your kith and kin, help the poor and the destitute, serve your guests generously and assist the deserving calamity-afflicted ones.\" Khadija then accompanied him to her cousin Waraqa bin Naufal bin Asad bin 'Abdul 'Uzza, who, during the pre-Islamic Period became a Christian and used to write the writing with Hebrew letters. He would write from the Gospel in Hebrew as much as Allah wished him to write. He was an old man and had lost his eyesight. Khadija said to Waraqa, \"Listen to the story of your nephew, O my cousin!\" Waraqa asked, \"O my nephew! What have you seen?\" Allah's Messenger (ï·º) described whatever he had seen. Waraqa said, \"This is the same one who keeps the secrets (angel Gabriel) whom Allah had sent to Moses. I wish I were young and could live up to the time when your people would turn you out.\" Allah's Messenger (ï·º) asked, \"Will they drive me out?\" Waraqa replied in the affirmative and said, \"Anyone (man) who came with something similar to what you have brought was treated with hostility; and if I should remain alive till the day when you will be turned out then I would support you strongly.\" But after a few days Waraqa died and the Divine Inspiration was also paused for a while",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Without a valid will, your estate will be distributed according to local secular law â€” which almost certainly does not match Islamic inheritance rules. A properly drafted Islamic will ensures your wealth is divided as Allah commands and can include your wasiyyah (bequest of up to one-third for charitable or non-heir purposes).


**How?**

Find a solicitor or lawyer experienced with Islamic wills in your jurisdiction. Many Muslim organisations offer will-drafting services or templates. Work with a scholar to determine the correct shares for your heirs. Ensure the will is legally valid in your jurisdiction â€” it must meet local legal requirements to be enforceable. Sign it with witnesses as required by law.` },
        { title: 'Designate guardians for minor children in consultation with your spouse and family', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources emphasize the importance of protecting vulnerable offspring and leaving heirs financially secure, they omit specific legal steps like designating guardians, making the subtask a practical logical inference to systematically ensure the children\'s well-being and Islamic upbringing after their parents\' passing.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:9",
              arabic: "ÙˆÙŽÙ„Ù’ÙŠÙŽØ®Ù’Ø´ÙŽ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠÙ†ÙŽ Ù„ÙŽÙˆÙ’ ØªÙŽØ±ÙŽÙƒÙÙˆØ§ Ù…ÙÙ†Ù’ Ø®ÙŽÙ„Ù’ÙÙÙ‡ÙÙ…Ù’ Ø°ÙØ±ÙÙ‘ÙŠÙŽÙ‘Ø©Ù‹ Ø¶ÙØ¹ÙŽØ§ÙÙ‹Ø§ Ø®ÙŽØ§ÙÙÙˆØ§ Ø¹ÙŽÙ„ÙŽÙŠÙ’Ù‡ÙÙ…Ù’",
              translation: "And let those fear who, if they left behind them weak offspring, would fear for them.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1295",
              translation: "The Prophet (SAW) said: \"It is better for you to leave your heirs wealthy than to leave them poor, begging from others.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

If both parents pass away without designated guardians, the court decides who raises your children â€” and the court may not choose someone who will raise them upon Islam. This is one of the most important decisions you will ever make as a parent.


**How?**

Discuss with your spouse who you would trust to raise your children with Islamic values, love, and stability. Consider the candidates' deen, character, financial stability, and willingness. Have an honest conversation with your chosen guardians to confirm they accept. Document the guardianship designation in your will and ensure it is legally binding in your jurisdiction.` },
        { title: 'Document all assets, debts, accounts, and insurance policies in one secure location', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources establish the foundational principles of leaving heirs financially secure and protecting vulnerable offspring, they omit specific modern administrative steps like documenting all assets and debts, making the subtask a practical logical inference to systematically ensure the heirs receive their rightful wealth.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:9",
              arabic: "ÙˆÙŽÙ„Ù’ÙŠÙŽØ®Ù’Ø´ÙŽ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠÙ†ÙŽ Ù„ÙŽÙˆÙ’ ØªÙŽØ±ÙŽÙƒÙÙˆØ§ Ù…ÙÙ†Ù’ Ø®ÙŽÙ„Ù’ÙÙÙ‡ÙÙ…Ù’ Ø°ÙØ±ÙÙ‘ÙŠÙŽÙ‘Ø©Ù‹ Ø¶ÙØ¹ÙŽØ§ÙÙ‹Ø§ Ø®ÙŽØ§ÙÙÙˆØ§ Ø¹ÙŽÙ„ÙŽÙŠÙ’Ù‡ÙÙ…Ù’ ÙÙŽÙ„Ù’ÙŠÙŽØªÙŽÙ‘Ù‚ÙÙˆØ§ Ø§Ù„Ù„ÙŽÙ‘Ù‡ÙŽ ÙˆÙŽÙ„Ù’ÙŠÙŽÙ‚ÙÙˆÙ„ÙÙˆØ§ Ù‚ÙŽÙˆÙ’Ù„Ù‹Ø§ Ø³ÙŽØ¯ÙÙŠØ¯Ù‹Ø§",
              translation: "And let those fear who, if they left behind them weak offspring, would fear for them. So let them fear Allah and speak words of appropriate justice.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1295",
              translation: "The Prophet (SAW) said: \"It is better for you to leave your heirs wealthy than to leave them poor, begging from others.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

When someone passes away, their family often has no idea what assets, debts, or accounts exist. Undiscovered accounts go unclaimed, unknown debts surface at the worst time, and the estate settlement drags on for months or years. A single document prevents all of this.


**How?**

Create a master document listing: all bank accounts (with account numbers and institutions), investments, property deeds, vehicles, valuables, life insurance or takaful policies, debts owed and debts owing, pension or retirement accounts, and digital accounts with passwords. Store this document in a fireproof safe or a secure digital vault. Tell your spouse and executor where to find it.` },
        { title: 'Review and update the will annually or after any major life event', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Hadith establishes the urgent foundational duty for a Muslim to have a written will prepared without delay, it omits specific modern administrative steps like reviewing and updating the document annually or after major life events, making the subtask a practical logical inference to systematically ensure this continuous obligation remains accurately fulfilled as circumstances change.',
          sources: [
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 2878",
              translation: "The Prophet (SAW) said: \"It is the duty of a Muslim who has something to bequest not to let two nights pass without writing a will.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Life changes â€” births, deaths, marriages, divorces, significant financial changes â€” can make a will outdated or even legally invalid. An annual review ensures your will reflects your current reality, not a snapshot from years ago.


**How?**

Set an annual calendar reminder to review your will â€” a good time is during Ramadan, when reflection on mortality is natural. After any major life event (new child, death of an heir, marriage, divorce, major purchase), review immediately. Check that guardian designations, asset lists, and heir shares are still accurate. Update and re-sign the will with witnesses if any changes are needed.` },
        { title: 'Inform your executor and family members where the will and key documents are stored', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Hadiths establish the urgent duty to write a will and the importance of leaving heirs financially secure, they omit specific modern administrative steps like informing executors and family members where key documents are stored, making the subtask a practical logical inference to systematically ensure the written will is actually executed and its purpose fulfilled.',
          sources: [
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 2878",
              translation: "The Prophet (SAW) said: \"It is the duty of a Muslim who has something to bequest not to let two nights pass without writing a will.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1295",
              translation: "The Prophet (SAW) said: \"It is better for you to leave your heirs wealthy than to leave them poor.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A perfectly drafted will that nobody can find is worthless. Your executor needs to know where the will is, who the witnesses are, and how to access the master asset document â€” ideally before they need it, not after you are gone.


**How?**

Have a direct conversation with your designated executor about their role and responsibilities. Tell them exactly where your will and asset documents are stored â€” safe, lawyer's office, or secure digital vault. Give them the access information they need (safe combination, lawyer's contact, vault password). Inform your spouse and at least one other trusted family member as a backup.` },
      ],
    },
    {
      title: 'Pursue a leadership role in your neighbourhood or mosque safety committee',
      priority: 'low', tags: ['leadership', 'community'],
      description: 'Taking a leadership role in safety infrastructure â€” whether at the mosque, school, or neighbourhood level â€” multiplies your impact and ensures that safety planning is proactive rather than reactive. It is a form of khidmah (service) that protects the most vulnerable.',
      subtasks: [
        { title: 'Express your interest to the mosque board or community organisation leadership', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources establish the foundational mandate to form an organized group for good and demonstrate the value of taking initiative to structure mosque activities, they omit specific modern administrative steps like expressing interest to a mosque board, making the subtask a practical logical inference to systematically build collective capacity and leadership.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:104",
              arabic: "ÙˆÙŽÙ„Ù’ØªÙŽÙƒÙÙ† Ù…ÙÙ‘Ù†ÙƒÙÙ…Ù’ Ø£ÙÙ…ÙŽÙ‘Ø©ÙŒ ÙŠÙŽØ¯Ù’Ø¹ÙÙˆÙ†ÙŽ Ø¥ÙÙ„ÙŽÙ‰ Ø§Ù„Ù’Ø®ÙŽÙŠÙ’Ø±Ù ÙˆÙŽÙŠÙŽØ£Ù’Ù…ÙØ±ÙÙˆÙ†ÙŽ Ø¨ÙØ§Ù„Ù’Ù…ÙŽØ¹Ù’Ø±ÙÙˆÙÙ ÙˆÙŽÙŠÙŽÙ†Ù’Ù‡ÙŽÙˆÙ’Ù†ÙŽ Ø¹ÙŽÙ†Ù Ø§Ù„Ù’Ù…ÙÙ†ÙƒÙŽØ±Ù Ûš ÙˆÙŽØ£ÙÙˆÙ„ÙŽÙ°Ø¦ÙÙƒÙŽ Ù‡ÙÙ…Ù Ø§Ù„Ù’Ù…ÙÙÙ’Ù„ÙØ­ÙÙˆÙ†ÙŽ",
              translation: "Let there be a group among you who call others to good, and enjoin what is right, and forbid what is wrong: those who do this are the successful ones.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2010",
              translation: "Abdur Rahman bin 'Abdul Qari said, \"I went out in the company of 'Umar bin Al-Khattab one night in Ramadan to the mosque and found the people praying in different groups. A man praying alone or a man praying with a little group behind him. So, 'Umar said, 'In my opinion I would better collect these (people) under the leadership of one Qari (Reciter) (i.e. let them pray in congregation!)'. So, he made up his mind to congregate them behind Ubai bin Ka'b. Then on another night I went again in his company and the people were praying behind their reciter. On that, 'Umar remarked, 'What an excellent Bid'a (i.e. innovation in religion) this is; but the prayer which they do not perform, but sleep at its time is better than the one they are offering.' He meant the prayer in the last part of the night. (In those days) people used to pray in the early part of the night",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Leadership positions are rarely handed out â€” they go to those who step forward. Expressing interest signals that you are serious, and it opens a conversation about how your skills and experience can serve the community's safety needs.


**How?**

Request a meeting or send a message to the mosque board chairperson or community organisation leader. Explain your background, your interest in safety and emergency preparedness, and what specific experience or skills you bring. Ask what the current safety structure looks like and where they see the biggest need. Be specific about what you are offering â€” vague offers to "help out" get forgotten.` },
        { title: 'Assess the current state of safety protocols and identify the biggest gaps', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Quranic verse establishes the foundational mandate to form a group that invites to good, enjoins what is right, and forbids what is wrong, it omits specific modern administrative actions like assessing the current state of safety protocols and identifying gaps, making the subtask a practical logical inference to systematically ensure the community\'s well-being and fulfill this divine command.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:104",
              arabic: "ÙˆÙŽÙ„Ù’ØªÙŽÙƒÙÙ† Ù…ÙÙ‘Ù†ÙƒÙÙ…Ù’ Ø£ÙÙ…ÙŽÙ‘Ø©ÙŒ ÙŠÙŽØ¯Ù’Ø¹ÙÙˆÙ†ÙŽ Ø¥ÙÙ„ÙŽÙ‰ Ø§Ù„Ù’Ø®ÙŽÙŠÙ’Ø±Ù ÙˆÙŽÙŠÙŽØ£Ù’Ù…ÙØ±ÙÙˆÙ†ÙŽ Ø¨ÙØ§Ù„Ù’Ù…ÙŽØ¹Ù’Ø±ÙÙˆÙÙ ÙˆÙŽÙŠÙŽÙ†Ù’Ù‡ÙŽÙˆÙ’Ù†ÙŽ Ø¹ÙŽÙ†Ù Ø§Ù„Ù’Ù…ÙÙ†ÙƒÙŽØ±Ù",
              translation: "And let there be arising from you a nation inviting to all that is good, enjoining what is right and forbidding what is wrong.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Effective leadership starts with an honest assessment of the current state. Many mosques and community spaces have no formal safety protocols at all, or have outdated plans that have never been tested. You cannot fix what you have not measured.


**How?**

Conduct a walkthrough of the community space with a safety checklist: fire exits (clear and marked?), fire extinguishers (present and inspected?), first aid kits (stocked?), emergency lighting, AED availability, security camera coverage, and written emergency procedures. Interview staff and regular attendees about their awareness of safety protocols. Document everything and rank gaps by severity and likelihood.` },
        { title: 'Propose a structured safety improvement plan with priorities and timelines', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Quranic verse establishes the foundational mandate to form a group that invites to good, enjoins what is right, and forbids what is wrong, it omits specific modern administrative actions like proposing a structured safety improvement plan with priorities and timelines, making the subtask a practical logical inference to systematically organize and fulfill this divine command.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:104",
              arabic: "ÙˆÙŽÙ„Ù’ØªÙŽÙƒÙÙ† Ù…ÙÙ‘Ù†ÙƒÙÙ…Ù’ Ø£ÙÙ…ÙŽÙ‘Ø©ÙŒ ÙŠÙŽØ¯Ù’Ø¹ÙÙˆÙ†ÙŽ Ø¥ÙÙ„ÙŽÙ‰ Ø§Ù„Ù’Ø®ÙŽÙŠÙ’Ø±Ù ÙˆÙŽÙŠÙŽØ£Ù’Ù…ÙØ±ÙÙˆÙ†ÙŽ Ø¨ÙØ§Ù„Ù’Ù…ÙŽØ¹Ù’Ø±ÙÙˆÙÙ ÙˆÙŽÙŠÙŽÙ†Ù’Ù‡ÙŽÙˆÙ’Ù†ÙŽ Ø¹ÙŽÙ†Ù Ø§Ù„Ù’Ù…ÙÙ†ÙƒÙŽØ±Ù",
              translation: "And let there be among you a group inviting to good, enjoining what is right and forbidding what is wrong.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A list of problems without a plan is just a complaint. A structured improvement plan with priorities and timelines shows leadership, earns buy-in from the board, and creates accountability for actually getting things done.


**How?**

Based on your assessment, create a document with three priority tiers: immediate (fire safety, first aid), short-term (training, signage, protocols), and long-term (security systems, AED installation). For each item, include the action, responsible person, estimated cost, and target completion date. Present it to the board in a clear, professional format. Start with quick wins to build momentum and credibility.` },
        { title: 'Organise a safety training or awareness event for the community', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Hadith establishes the foundational principle of leadership and being responsible for the well-being of one\'s community, it omits specific modern organizational actions like organizing a safety training or awareness event, making the subtask a practical logical inference to systematically fulfill this mandate of care and protection.',
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 7138",
              translation: "The Prophet (peace be upon him) said: \"Each of you is a shepherd and each of you is responsible for his flock.\" The leader of a community is a shepherd over them and is responsible for his flock.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Safety infrastructure is only effective if the community knows it exists and knows how to use it. A training event educates, builds awareness, and creates a culture where safety is everyone's responsibility â€” not just the committee's.


**How?**

Plan a community event: a first aid workshop, a fire safety demonstration, or an emergency preparedness seminar. Partner with local fire departments, ambulance services, or qualified trainers who may offer free community sessions. Promote the event through the mosque announcement, social media, and word of mouth. Make it family-friendly and practical â€” people remember what they physically practise, not what they hear in a lecture.` },
        { title: 'Build a team of committed volunteers to sustain the initiative beyond you', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources establish the foundational mandates to form a dedicated group for good and to function collectively as a unified body, they omit specific modern organizational steps like building a team of committed volunteers with defined roles and succession plans, making the subtask a practical logical inference to systematically ensure the sustainability of this collective obligation.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:104",
              arabic: "ÙˆÙŽÙ„Ù’ØªÙŽÙƒÙÙ† Ù…ÙÙ‘Ù†ÙƒÙÙ…Ù’ Ø£ÙÙ…ÙŽÙ‘Ø©ÙŒ ÙŠÙŽØ¯Ù’Ø¹ÙÙˆÙ†ÙŽ Ø¥ÙÙ„ÙŽÙ‰ Ø§Ù„Ù’Ø®ÙŽÙŠÙ’Ø±Ù",
              translation: "And let there be among you a group inviting to good.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6011",
              translation: "The Prophet (SAW) said: \"The believers in their mutual mercy, love, and compassion are like one body.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A safety initiative that depends on one person will die when that person burns out or moves on. Building a team ensures sustainability and distributes the workload. True leadership creates systems that outlast the leader.


**How?**

Identify 3-5 community members who showed interest during events or training. Invite them to join a formal safety committee with defined roles: coordinator, trainer, communications lead, supply manager. Hold regular meetings (monthly or quarterly) to maintain momentum. Document all procedures so that any committee member can step into any role. Develop a succession plan so the committee survives leadership transitions.` },
      ],
    },
  ],

  // â”€â”€ SOCIAL CHARACTER â”€â”€
  health_social_core: [
    {
      title: 'Master the Islamic greeting â€” give salam freely and respond completely',
      priority: 'high', tags: ['adab', 'sunnah'],
      description: ' Shall I not tell you of something that if you do it, you will love one another? Spread the salam amongst yourselves." The greeting of peace is the simplest, most powerful tool for building Muslim brotherhood.',
      subtasks: [
        { title: "Make it a habit to initiate salam with every Muslim you encounter", done: false,
          tier: 'T1',
          amanahRationale: 'The provided Hadith explicitly commands believers to "spread the salam amongst yourselves," providing direct and clear proof for the core action of the subtask to habitually initiate peace greetings with fellow Muslims.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 28:53",
              arabic: "ÙˆÙŽØ¥ÙØ°ÙŽØ§ ÙŠÙØªÙ’Ù„ÙŽÙ‰Ù° Ø¹ÙŽÙ„ÙŽÙŠÙ’Ù‡ÙÙ…Ù’ Ù‚ÙŽØ§Ù„ÙÙˆØ§ Ø¢Ù…ÙŽÙ†ÙŽÙ‘Ø§ Ø¨ÙÙ‡Ù Ø¥ÙÙ†ÙŽÙ‘Ù‡Ù Ø§Ù„Ù’Ø­ÙŽÙ‚ÙÙ‘ Ù…ÙÙ† Ø±ÙŽÙ‘Ø¨ÙÙ‘Ù†ÙŽØ§ Ø¥ÙÙ†ÙŽÙ‘Ø§ ÙƒÙÙ†ÙŽÙ‘Ø§ Ù…ÙÙ† Ù‚ÙŽØ¨Ù’Ù„ÙÙ‡Ù Ù…ÙØ³Ù’Ù„ÙÙ…ÙÙŠÙ†ÙŽ",
              translation: "and, when it is recited to them, say, \"We believe in it, it is the truth from our Lord. Before it came we had already devoted ourselves to Him.",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              rationale: "those who submit to Allah naturally express peace â€” initiating salam is the outward expression of inner Islam.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 54",
              translation: "The Prophet (SAW) said: \"You will not enter Paradise until you believe, and you will not (fully) believe until you love one another. Shall I not tell you of something which, if you do it, you will love one another? Spread the salam amongst yourselves.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The one who initiates the greeting earns greater reward. By making salam your default, you break social barriers, soften hearts, and plant seeds of brotherhood with every encounter.


**How?**

Set a personal rule: you will be the first to say "As-salamu alaykum" in every interaction with a Muslim â€” at the store, the parking lot, the hallway. Do not wait for eye contact or familiarity. Track yourself for one week and notice how many new connections open up.` },
        { title: 'Learn and use the full response: "Wa alaykum as-salam wa rahmatullahi wa barakatuh"', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources explicitly command responding to a greeting with a better one and demonstrate the use of "mercy and blessings" within the context of prayer, they omit the exact everyday phrase "Wa alaykum as-salam wa rahmatullahi wa barakatuh," making the subtask to learn and use this specific full reply a logical inference to fulfill the Quranic injunction.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:86",
              arabic: "ÙˆÙŽØ¥ÙØ°ÙŽØ§ Ø­ÙÙŠÙÙ‘ÙŠØªÙÙ… Ø¨ÙØªÙŽØ­ÙÙŠÙŽÙ‘Ø©Ù ÙÙŽØ­ÙŽÙŠÙÙ‘ÙˆØ§ Ø¨ÙØ£ÙŽØ­Ù’Ø³ÙŽÙ†ÙŽ Ù…ÙÙ†Ù’Ù‡ÙŽØ§ Ø£ÙŽÙˆÙ’ Ø±ÙØ¯ÙÙ‘ÙˆÙ‡ÙŽØ§ Û— Ø¥ÙÙ†ÙŽÙ‘ Ø§Ù„Ù„ÙŽÙ‘Ù‡ÙŽ ÙƒÙŽØ§Ù†ÙŽ Ø¹ÙŽÙ„ÙŽÙ‰Ù° ÙƒÙÙ„ÙÙ‘ Ø´ÙŽÙŠÙ’Ø¡Ù Ø­ÙŽØ³ÙÙŠØ¨Ù‹Ø§",
              translation: "When you are greeted with a greeting, respond with a better one, or at least return it: God keeps account of everything.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 831",
              translation: "Narrated Shaqiq bin Salama:`Abdullah said, \"Whenever we prayed behind the Prophet (ï·º) we used to recite (in sitting) 'Peace be on Gabriel, Michael, peace be on so and so. Once Allah's Messenger (ï·º) looked back at us and said, 'Allah Himself is As-Salam (Peace), and if anyone of you prays then he should say, at-Tahiyatu li l-lahi wa ssalawatu wa t-taiyibat. As-salamu `alalika aiyuha n-Nabiyu wa rahmatu l-lahi wa barakatuh. Assalamu `alaina wa `ala `ibadi l-lahi s-salihin. (All the compliments, prayers and good things are due to Allah; peace be on you, O Prophet, and Allah's mercy and blessings [be on you]. Peace be on us an on the pious subjects of Allah). (If you say that, it will reach all the subjects in the heaven and the earth). Ash-hadu al-la ilaha illa l-lah, wa ash-hadu anna Muhammadan `Abduhu wa Rasuluh. (I testify that there is no Deity [worthy of worship] but Allah, and I testify that Muhammad is His slave and His Apostle",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Responding with the complete greeting maximises the reward and honours the one who greeted you. Each additional phrase adds mercy and blessings to the exchange, turning a simple hello into a powerful dua.


**How?**

Memorise the full response and practise it until it flows naturally. When someone gives you salam, pause for a beat and deliver the complete reply. Correct yourself out loud if you cut it short â€” this builds the habit quickly.` },
        { title: 'Greet strangers at the mosque, workplace, and in your neighbourhood', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources establish the obligation to return greetings and demonstrate the practice of greeting within the mosque, they omit explicit instructions to initiate greetings with strangers in broader settings like the workplace or neighbourhood, making the subtask a practical logical inference to systematically spread peace and build community.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:86",
              arabic: "**Translation:** When ye are greeted with a greeting, greet ye with a better than it or return it. Lo! Allah taketh count of all things.",
              translation: "When ye are greeted with a greeting, greet ye with a better than it or return it. Lo! Allah taketh count of all things.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 757",
              translation: "Narrated Abu Huraira:Allah's Messenger (ï·º) entered the mosque and a person followed him. The man prayed and went to the Prophet and greeted him. The Prophet (ï·º) returned the greeting and said to him, \"Go back and pray, for you have not prayed.\" The man went back prayed in the same way as before, returned and greeted the Prophet who said, \"Go back and pray, for you have not prayed.\" This happened thrice. The man said, \"By Him Who sent you with the Truth, I cannot offer the prayer in a better way than this. Please, teach me how to pray.\" The Prophet (ï·º) said, \"When you stand for Prayer say Takbir and then recite from the Holy Qur'an (of what you know by heart) and then bow till you feel at ease. Then raise your head and stand up straight, then prostrate till you feel at ease during your prostration, then sit with calmness till you feel at ease (do not hurry) and do the same in all your prayers",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Salam is most impactful when given to those you do not know. It transforms a room of strangers into a community of believers and fulfils the prophetic command to spread peace among yourselves.


**How?**

Choose one setting each week â€” the mosque, your office, or your neighbourhood â€” and deliberately greet every Muslim you see, including those you have never spoken to. Smile, make eye contact, and say it clearly. Notice how quickly walls come down.` },
        { title: 'Teach children the etiquette of giving and responding to salam', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Hadiths explicitly establish the commands to spread peace and detail the specific etiquette of the younger greeting the older, they omit the direct instruction to teach this to children, making the subtask a practical logical inference to systematically ensure the next generation learns and applies this prophetic tradition.',
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6236",
              translation: "The Prophet (SAW) said: \"You will not enter Paradise until you believe, and you will not believe until you love one another. Shall I not tell you of something which, if you do it, you will love one another? Spread the salam amongst yourselves.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih â€” narrated in Sahih Muslim 54",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6231",
              translation: "The Prophet (SAW) said: \"The younger should greet the older, the passer-by should greet the one sitting, and the small group should greet the larger group.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Children who learn the salam early internalise that every human interaction begins with peace. This shapes their social character from the foundation and ensures the sunnah passes to the next generation.


**How?**

Model the behaviour â€” greet everyone with salam in front of your children and prompt them to do the same. Teach them who greets first (the young greets the elder, the walker greets the seated) and praise them when they initiate salam on their own.` },
      ],
    },
    {
      title: 'Fulfil social obligations consistently â€” attend weddings, funerals, and visit the sick',
      priority: 'high', tags: ['adab', 'community'],
      description: 'The Prophet (SAW) outlined five rights of a Muslim upon another Muslim, including visiting the sick, attending funerals, and accepting invitations. These are not optional courtesies â€” they are obligations that maintain the social fabric of the ummah and earn immense reward.',
      subtasks: [
        { title: 'Keep a calendar or list of upcoming social obligations (weddings, births, illnesses)', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Hadiths explicitly establish the foundational social obligations and rights Muslims owe one another, such as visiting the sick and accepting invitations, they omit specific modern organizational tools like keeping a calendar or list, making the subtask a practical logical inference to systematically track and fulfill these duties.',
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1240",
              translation: "The Prophet (SAW) said: \"The rights of a Muslim over another Muslim are five: returning the greeting, visiting the sick, following the funeral, accepting the invitation, and saying yarhamuk-Allah when he sneezes.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2162",
              translation: "The Prophet (SAW) said: \"The rights of a Muslim over another Muslim are six.\" He added to the above: \"If he asks your advice, advise him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Social obligations in Islam are not optional â€” they are rights that others hold over you. Without a system to track them, you will inevitably miss weddings, forget to visit the sick, and lose the reward and connection that come from showing up.


**How?**

Create a dedicated section in your calendar or notes app for social obligations. When you hear of a wedding, birth, illness, or death, add it immediately with a reminder. Review this list weekly so nothing falls through the cracks.` },
        { title: 'Prioritise attending janazah prayers whenever you are notified of a death', done: false,
          tier: 'T2',
          amanahRationale: 'Fallback assignment â€” NotebookLM returned stale conversation (empty answer, turn_number:0); subtask has sources so Qarina is the conservative assignment.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:185",
              arabic: "ÙƒÙÙ„ÙÙ‘ Ù†ÙŽÙÙ’Ø³Ù Ø°ÙŽØ§Ø¦ÙÙ‚ÙŽØ©Ù Ø§Ù„Ù’Ù…ÙŽÙˆÙ’ØªÙ Û— ÙˆÙŽØ¥ÙÙ†ÙŽÙ‘Ù…ÙŽØ§ ØªÙÙˆÙŽÙÙŽÙ‘ÙˆÙ’Ù†ÙŽ Ø£ÙØ¬ÙÙˆØ±ÙŽÙƒÙÙ…Ù’ ÙŠÙŽÙˆÙ’Ù…ÙŽ Ø§Ù„Ù’Ù‚ÙÙŠÙŽØ§Ù…ÙŽØ©Ù Û– ÙÙŽÙ…ÙŽÙ† Ø²ÙØ­Ù’Ø²ÙØ­ÙŽ Ø¹ÙŽÙ†Ù Ø§Ù„Ù†ÙŽÙ‘Ø§Ø±Ù ÙˆÙŽØ£ÙØ¯Ù’Ø®ÙÙ„ÙŽ Ø§Ù„Ù’Ø¬ÙŽÙ†ÙŽÙ‘Ø©ÙŽ ÙÙŽÙ‚ÙŽØ¯Ù’ ÙÙŽØ§Ø²ÙŽ Û— ÙˆÙŽÙ…ÙŽØ§ Ø§Ù„Ù’Ø­ÙŽÙŠÙŽØ§Ø©Ù Ø§Ù„Ø¯ÙÙ‘Ù†Ù’ÙŠÙŽØ§ Ø¥ÙÙ„ÙŽÙ‘Ø§ Ù…ÙŽØªÙŽØ§Ø¹Ù Ø§Ù„Ù’ØºÙØ±ÙÙˆØ±Ù",
              translation: "Every soul will taste death, and you will only be given your full reward on the Day of Resurrection. Whoever is kept away from the Fire and admitted to the Garden will have triumphed. The present world is only an illusory pleasure.",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              rationale: "attending the janazah is the believer's response to this universal reality â€” honouring the deceased and reminding oneself of the return to Allah.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1091",
              translation: "Narrated `Abdullah bin `Umar:\"I saw Allah's Messenger (ï·º) delaying the Maghrib prayer till he offered it along with the `Isha' prayer whenever he was in a hurry during the journey.\" Salim narrated, \"Ibn `Umar used to do the same whenever he was in a hurry during the journey.\" And Salim added, \"Ibn `Umar used to pray the Maghrib and `Isha' prayers together in Al-Muzdalifa.\" Salim said, \"Ibn `Umar delayed the Maghrib prayer because at that time he heard the news of the death of his wife Safiya bint Abi `Ubaid. I said to him, 'The prayer (is due).' He said, 'Go on.' Again I said, 'The prayer (is due).' He said, 'Go on,' till we covered two or three miles. Then he got down, prayed and said, 'I saw the Prophet (ï·º) praying in this way, whenever he was in a hurry during the journey.' `Abdullah (bin `Umar) added, \"Whenever the Prophet was in a hurry, he used to delay the Maghrib prayer and then offer three rak`at (of the Maghrib) and perform Taslim, and after waiting for a short while, Iqama used to be pronounced for the `Isha' prayer when he would offer two rak`at and perform Taslim. He would never offer any optional prayer till the middle of the night (when he used to pray the Tahajjud)",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1092",
              translation: "Narrated `Abdullah bin `Umar:\"I saw Allah's Messenger (ï·º) delaying the Maghrib prayer till he offered it along with the `Isha' prayer whenever he was in a hurry during the journey.\" Salim narrated, \"Ibn `Umar used to do the same whenever he was in a hurry during the journey.\" And Salim added, \"Ibn `Umar used to pray the Maghrib and `Isha' prayers together in Al-Muzdalifa.\" Salim said, \"Ibn `Umar delayed the Maghrib prayer because at that time he heard the news of the death of his wife Safiya bint Abi `Ubaid. I said to him, 'The prayer (is due).' He said, 'Go on.' Again I said, 'The prayer (is due).' He said, 'Go on,' till we covered two or three miles. Then he got down, prayed and said, 'I saw the Prophet (ï·º) praying in this way, whenever he was in a hurry during the journey.' `Abdullah (bin `Umar) added, \"Whenever the Prophet was in a hurry, he used to delay the Maghrib prayer and then offer three rak`at (of the Maghrib) and perform Taslim, and after waiting for a short while, Iqama used to be pronounced for the `Isha' prayer when he would offer two rak`at and perform Taslim. He would never offer any optional prayer till the middle of the night (when he used to pray the Tahajjud)",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Attending the janazah prayer is a communal obligation (fardh kifayah) and carries the reward of a qirat â€” a mountain of good deeds. It also comforts the bereaved family and reminds you of your own mortality, softening your heart.


**How?**

Sign up for your local mosque notification list or community WhatsApp group that announces deaths. When a janazah is announced, treat it as a priority â€” rearrange your schedule if possible. Even if you did not know the deceased, your presence fulfils a right and earns immense reward.` },
        { title: 'Visit at least one sick person per month â€” bring food, dua, and companionship', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Hadith explicitly commands believers to "visit the sick" and "feed the hungry," it omits specific modern parameters like visiting at least one sick person per month, making the subtask a practical logical inference to systematically fulfill this prophetic obligation of care and companionship.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:184",
              arabic: "Ø£ÙŽÙŠÙŽÙ‘Ø§Ù…Ù‹Ø§ Ù…ÙŽÙ‘Ø¹Ù’Ø¯ÙÙˆØ¯ÙŽØ§ØªÙ Ûš ÙÙŽÙ…ÙŽÙ† ÙƒÙŽØ§Ù†ÙŽ Ù…ÙÙ†ÙƒÙÙ… Ù…ÙŽÙ‘Ø±ÙÙŠØ¶Ù‹Ø§ Ø£ÙŽÙˆÙ’ Ø¹ÙŽÙ„ÙŽÙ‰Ù° Ø³ÙŽÙÙŽØ±Ù ÙÙŽØ¹ÙØ¯ÙŽÙ‘Ø©ÙŒ Ù…ÙÙ‘Ù†Ù’ Ø£ÙŽÙŠÙŽÙ‘Ø§Ù…Ù Ø£ÙØ®ÙŽØ±ÙŽ Ûš ÙˆÙŽØ¹ÙŽÙ„ÙŽÙ‰ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠÙ†ÙŽ ÙŠÙØ·ÙÙŠÙ‚ÙÙˆÙ†ÙŽÙ‡Ù ÙÙØ¯Ù’ÙŠÙŽØ©ÙŒ Ø·ÙŽØ¹ÙŽØ§Ù…Ù Ù…ÙØ³Ù’ÙƒÙÙŠÙ†Ù Û– ÙÙŽÙ…ÙŽÙ† ØªÙŽØ·ÙŽÙˆÙŽÙ‘Ø¹ÙŽ Ø®ÙŽÙŠÙ’Ø±Ù‹Ø§ ÙÙŽÙ‡ÙÙˆÙŽ Ø®ÙŽÙŠÙ’Ø±ÙŒ Ù„ÙŽÙ‘Ù‡Ù Ûš ÙˆÙŽØ£ÙŽÙ† ØªÙŽØµÙÙˆÙ…ÙÙˆØ§ Ø®ÙŽÙŠÙ’Ø±ÙŒ Ù„ÙŽÙ‘ÙƒÙÙ…Ù’ Û– Ø¥ÙÙ† ÙƒÙÙ†ØªÙÙ…Ù’ ØªÙŽØ¹Ù’Ù„ÙŽÙ…ÙÙˆÙ†ÙŽ",
              translation: "Fast for a specific number of days, but if one of you is ill, or on a journey, on other days later. For those who can fast only with extreme difficulty, there is a way to compensate â€” feed a needy person. But if anyone does good of his own accord, it is better for him, and fasting is better for you, if only you knew.",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              rationale: "the Quran's acknowledgement of illness as a condition requiring communal accommodation grounds the broader obligation to care for the sick.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5649",
              translation: "The Prophet (SAW) said: \"Visit the sick, feed the hungry, and free the captive.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Visiting the sick is one of the five rights of a Muslim upon another Muslim. It strengthens the bond of community and reminds you of the blessing of health.

**How?**

Ask around your circle each week â€” who is unwell, recovering from surgery, or housebound? Schedule a visit, bring a home-cooked meal or fruit, sit with them, make dua for their recovery, and keep the visit brief unless they want company. Consistency matters more than grand gestures.` },
        { title: 'Accept invitations to walimah and other gatherings unless there is a valid Islamic reason not to', done: false,
          tier: 'T1',
          amanahRationale: 'The provided Hadith from Sahih al-Bukhari explicitly states that failing to accept a walimah invitation constitutes disobedience to Allah and His Messenger, providing direct and clear proof for the core action of the subtask.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:221",
              arabic: "ÙˆÙŽÙ„ÙŽØ§ ØªÙŽÙ†ÙƒÙØ­ÙÙˆØ§ Ø§Ù„Ù’Ù…ÙØ´Ù’Ø±ÙÙƒÙŽØ§ØªÙ Ø­ÙŽØªÙŽÙ‘Ù‰Ù° ÙŠÙØ¤Ù’Ù…ÙÙ†ÙŽÙ‘ Ûš ÙˆÙŽÙ„ÙŽØ£ÙŽÙ…ÙŽØ©ÙŒ Ù…ÙÙ‘Ø¤Ù’Ù…ÙÙ†ÙŽØ©ÙŒ Ø®ÙŽÙŠÙ’Ø±ÙŒ Ù…ÙÙ‘Ù† Ù…ÙÙ‘Ø´Ù’Ø±ÙÙƒÙŽØ©Ù ÙˆÙŽÙ„ÙŽÙˆÙ’ Ø£ÙŽØ¹Ù’Ø¬ÙŽØ¨ÙŽØªÙ’ÙƒÙÙ…Ù’ Û— ÙˆÙŽÙ„ÙŽØ§ ØªÙÙ†ÙƒÙØ­ÙÙˆØ§ Ø§Ù„Ù’Ù…ÙØ´Ù’Ø±ÙÙƒÙÙŠÙ†ÙŽ Ø­ÙŽØªÙŽÙ‘Ù‰Ù° ÙŠÙØ¤Ù’Ù…ÙÙ†ÙÙˆØ§ Ûš ÙˆÙŽÙ„ÙŽØ¹ÙŽØ¨Ù’Ø¯ÙŒ Ù…ÙÙ‘Ø¤Ù’Ù…ÙÙ†ÙŒ Ø®ÙŽÙŠÙ’Ø±ÙŒ Ù…ÙÙ‘Ù† Ù…ÙÙ‘Ø´Ù’Ø±ÙÙƒÙ ÙˆÙŽÙ„ÙŽÙˆÙ’ Ø£ÙŽØ¹Ù’Ø¬ÙŽØ¨ÙŽÙƒÙÙ…Ù’",
              translation: "Do not marry idolatresses until they believe: a believing slave woman is certainly better than an idolatress, even though she may please you. And do not give your women in marriage to idolaters until they believe: a believing slave is certainly better than an idolater, even though he may please you.",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              rationale: "this verse affirms the sanctity of Islamic marriage â€” the walimah is its public celebration, which believers are commanded to honour by attending.",
            },
            {
              kind: "quran",
              ref: "Quran 3:85",
              arabic: "ÙˆÙŽÙ…ÙŽÙ† ÙŠÙŽØ¨Ù’ØªÙŽØºÙ ØºÙŽÙŠÙ’Ø±ÙŽ Ø§Ù„Ù’Ø¥ÙØ³Ù’Ù„ÙŽØ§Ù…Ù Ø¯ÙÙŠÙ†Ù‹Ø§ ÙÙŽÙ„ÙŽÙ† ÙŠÙÙ‚Ù’Ø¨ÙŽÙ„ÙŽ Ù…ÙÙ†Ù’Ù‡Ù ÙˆÙŽÙ‡ÙÙˆÙŽ ÙÙÙŠ Ø§Ù„Ù’Ø¢Ø®ÙØ±ÙŽØ©Ù Ù…ÙÙ†ÙŽ Ø§Ù„Ù’Ø®ÙŽØ§Ø³ÙØ±ÙÙŠÙ†ÙŽ",
              translation: "If anyone seeks a religion other than complete devotion to God, it will not be accepted from him: he will be one of the losers in the Hereafter.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 5173",
              translation: "The Prophet (SAW) said: \"Whoever does not accept the invitation to a walimah has disobeyed Allah and His Messenger.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

 Accepting invitations strengthens social bonds, honours the host, and keeps you connected to your community rather than isolated.

**How?**

When invited to a walimah, aqeeqah, or community gathering, accept as your default response. Only decline if there is a legitimate Islamic reason (haram activity at the event, genuine hardship). If you cannot attend, send a gift or a warm message explaining your absence.` },
        { title: 'Follow up after visits with a message, call, or continued support', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Hadiths explicitly establish the foundational duties to maintain brotherhood, visit the sick, and attend funerals, they omit specific modern communication steps like following up with a message or call, making the subtask a practical logical inference to systematically sustain these relationships and fulfill the mandate of not severing ties.',
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2569",
              translation: "The Prophet (SAW) said: \"Do not sever relations, do not turn your backs on each other, do not hate one another, and do not envy one another. Be, O servants of Allah, brothers.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 1240",
              translation: "The Prophet (SAW) said: \"The rights of a Muslim over another Muslim are five: returning the greeting, visiting the sick, following the funeral...\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A single visit or attendance is good, but follow-up transforms a social obligation into a genuine relationship. The people who remember to check in after the crowd has moved on are the ones who earn lasting love and trust.


**How?**

After visiting the sick, attending a funeral, or going to a wedding, send a brief follow-up message within 48 hours. For the bereaved, check in again after one week and one month when the support often dries up. For the sick, ask about their recovery periodically.` },
      ],
    },
    {
      title: 'Audit your speech â€” eliminate backbiting (gheebah), slander (buhtan), and lying',
      priority: 'urgent', tags: ['adab', 'character'],
      description: 'Allah compares backbiting to eating the flesh of your dead brother (49:12). The tongue is the most dangerous limb â€” it can destroy relationships, reputations, and your own akhirah. An honest audit of your speech habits is the starting point for purifying your social character.',
      subtasks: [
        { title: 'For one week, actively monitor every conversation for gheebah, buhtan, or exaggeration', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Quranic verses explicitly forbid backbiting, suspicion, and mocking, they omit specific modern behavioral interventions like monitoring and tallying conversations for a week, making the subtask a practical logical inference to systematically eliminate these sins and fulfill the divine command.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:12",
              arabic: "ÙŠÙŽØ§ Ø£ÙŽÙŠÙÙ‘Ù‡ÙŽØ§ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠÙ†ÙŽ Ø¢Ù…ÙŽÙ†ÙÙˆØ§ Ø§Ø¬Ù’ØªÙŽÙ†ÙØ¨ÙÙˆØ§ ÙƒÙŽØ«ÙÙŠØ±Ù‹Ø§ Ù…ÙÙ‘Ù†ÙŽ Ø§Ù„Ø¸ÙŽÙ‘Ù†ÙÙ‘ Ø¥ÙÙ†ÙŽÙ‘ Ø¨ÙŽØ¹Ù’Ø¶ÙŽ Ø§Ù„Ø¸ÙŽÙ‘Ù†ÙÙ‘ Ø¥ÙØ«Ù’Ù…ÙŒ ÙˆÙŽÙ„ÙŽØ§ ØªÙŽØ¬ÙŽØ³ÙŽÙ‘Ø³ÙÙˆØ§ ÙˆÙŽÙ„ÙŽØ§ ÙŠÙŽØºÙ’ØªÙŽØ¨ Ø¨ÙŽÙ‘Ø¹Ù’Ø¶ÙÙƒÙÙ… Ø¨ÙŽØ¹Ù’Ø¶Ù‹Ø§",
              translation: "O you who have believed, avoid much suspicion. Indeed, some suspicion is sin. And do not spy or backbite each other.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 104:1",
              arabic: "ÙˆÙŽÙŠÙ’Ù„ÙŒ Ù„ÙÙ‘ÙƒÙÙ„ÙÙ‘ Ù‡ÙÙ…ÙŽØ²ÙŽØ©Ù Ù„ÙÙ‘Ù…ÙŽØ²ÙŽØ©Ù",
              translation: "Woe to every scorner and mocker.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

You cannot fix what you do not see. Most people backbite so habitually that they do not even recognise it. A deliberate week-long audit forces you to confront the reality of your speech and creates the awareness needed for change.


**How?**

For seven days, carry a small notebook or use your phone to tally every instance where you speak negatively about someone who is not present â€” even if what you said is true. Note what you said, about whom, and in what context. Review the tally at the end of each day.` },
        { title: 'Identify your triggers â€” who, what, and when do you most often slip into harmful speech', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources explicitly forbid backbiting and clearly define its nature, they omit specific modern self-reflection techniques like identifying personal triggers, making the subtask a practical logical inference to systematically avoid this prohibited behavior and fulfill the divine command.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:12",
              arabic: "ÙˆÙŽÙ„ÙŽØ§ ÙŠÙŽØºÙ’ØªÙŽØ¨ Ø¨ÙŽÙ‘Ø¹Ù’Ø¶ÙÙƒÙÙ… Ø¨ÙŽØ¹Ù’Ø¶Ù‹Ø§ Ø£ÙŽÙŠÙØ­ÙØ¨ÙÙ‘ Ø£ÙŽØ­ÙŽØ¯ÙÙƒÙÙ…Ù’ Ø£ÙŽÙ† ÙŠÙŽØ£Ù’ÙƒÙÙ„ÙŽ Ù„ÙŽØ­Ù’Ù…ÙŽ Ø£ÙŽØ®ÙÙŠÙ‡Ù Ù…ÙŽÙŠÙ’ØªÙ‹Ø§ ÙÙŽÙƒÙŽØ±ÙÙ‡Ù’ØªÙÙ…ÙÙˆÙ‡Ù",
              translation: "And do not backbite each other. Would one of you like to eat the flesh of his brother when dead? You would detest it.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2589",
              translation: "The Prophet (SAW) said: \"Do you know what gheebah (backbiting) is?\" They said: \"Allah and His Messenger know best.\" He said: \"Mentioning your brother with something he dislikes.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Harmful speech is rarely random â€” it follows patterns. Certain people, topics, or emotional states trigger it. Identifying your triggers is the key to interrupting the cycle before it starts.


**How?**

Review your week-long audit and look for patterns. Do you backbite most with a particular friend? About a specific colleague? When you are stressed or bored? Write down your top three triggers and develop a plan for each â€” whether that means changing the subject, excusing yourself, or avoiding the trigger environment.` },
        { title: 'Establish a personal rule: speak about someone only as you would in their presence', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources explicitly forbid backbiting and clearly define it as mentioning a brother with something he dislikes, they omit specific modern behavioral techniques like establishing a personal rule or writing it on a reminder card, making the subtask a practical logical inference to systematically avoid this prohibited speech and fulfill the divine command.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:12",
              arabic: "ÙˆÙŽÙ„ÙŽØ§ ÙŠÙŽØºÙ’ØªÙŽØ¨ Ø¨ÙŽÙ‘Ø¹Ù’Ø¶ÙÙƒÙÙ… Ø¨ÙŽØ¹Ù’Ø¶Ù‹Ø§",
              translation: "And do not backbite each other.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2589",
              translation: "The Prophet (SAW) said: \"Do you know what gheebah is? Mentioning your brother with something he dislikes.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

This single rule, if followed consistently, eliminates the vast majority of harmful speech. It forces you to filter every comment through a test of honesty, courage, and respect before it leaves your mouth.


**How?**

Before you say anything about someone who is not present, pause and ask: "Would I say this exactly the same way if they were sitting here?" If the answer is no, do not say it. Write this rule on a card and keep it visible â€” in your wallet, on your desk, or as a phone reminder â€” until it becomes second nature.` },
        { title: 'When you catch yourself backbiting, make istighfar and say something positive about the person', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources explicitly forbid backbiting and emphasize the importance of guarding one\'s tongue, they omit specific behavioral correction steps like making istighfar and saying something positive upon slipping, making the subtask a practical logical inference to systematically repent and rectify the prohibited speech.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:12",
              arabic: "ÙˆÙŽÙ„ÙŽØ§ ÙŠÙŽØºÙ’ØªÙŽØ¨ Ø¨ÙŽÙ‘Ø¹Ù’Ø¶ÙÙƒÙÙ… Ø¨ÙŽØ¹Ù’Ø¶Ù‹Ø§",
              translation: "And do not backbite each other.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 4880",
              translation: "The Prophet (SAW) said: \"Whoever guards his tongue, Allah will cover his faults.\"",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Catching yourself mid-slip and correcting it trains your nafs to associate backbiting with immediate repentance rather than casual acceptance. Over time, the discomfort of having to stop and make istighfar becomes a powerful deterrent.


**How?**

The moment you realise you have said something that qualifies as gheebah, stop mid-conversation if necessary. Say "Astaghfirullah" and then immediately mention something genuinely positive about that person. This practice also signals to those around you that you are serious about guarding your tongue.` },
        { title: 'Find an accountability partner who will gently remind you when you slip', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources establish the foundational principle that believers act as mirrors to gently correct one another, they omit specific modern methods like formally designating an accountability partner with weekly check-ins, making the subtask a practical logical inference to systematically fulfill this mutual obligation.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:10",
              arabic: "Ø¥ÙÙ†ÙŽÙ‘Ù…ÙŽØ§ Ø§Ù„Ù’Ù…ÙØ¤Ù’Ù…ÙÙ†ÙÙˆÙ†ÙŽ Ø¥ÙØ®Ù’ÙˆÙŽØ©ÙŒ ÙÙŽØ£ÙŽØµÙ’Ù„ÙØ­ÙÙˆØ§ Ø¨ÙŽÙŠÙ’Ù†ÙŽ Ø£ÙŽØ®ÙŽÙˆÙŽÙŠÙ’ÙƒÙÙ…Ù’",
              translation: "The believers are but brothers, so make settlement between your brothers.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 1956",
              translation: "The Prophet (SAW) said: \"The believer is a mirror to his brother.\" (One who gently corrects and holds accountable.)",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Self-monitoring has limits â€” you will have blind spots. An accountability partner provides an external check and makes the commitment social, which dramatically increases follow-through.


**How?**

Choose a trusted friend, spouse, or colleague and explain your goal. Ask them to gently signal you â€” a tap on the arm, a code word, a look â€” whenever they hear you slip into gheebah. Agree that neither of you will take offence at being corrected. Check in with each other weekly on progress.` },
      ],
    },
    {
      title: 'Practise positive body language â€” eye contact, open posture, and full presence in conversations',
      priority: 'medium', tags: ['adab', 'communication'],
      description: ' Positive body language â€” eye contact, leaning in, putting down your phone â€” communicates respect and builds trust in every interaction.',
      subtasks: [
        { title: 'Put your phone away (face down or in pocket) during all face-to-face conversations', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Hadiths establish the prophetic standard of giving full, undivided attention to a speaker and emphasizing excellent manners, they omit specific modern interventions like putting a mobile phone away, making the subtask a practical logical inference to systematically eliminate distractions and fulfill this standard of respect.',
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6250",
              translation: "The Prophet (SAW) would face the person he was speaking to completely and give them his full attention.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 2641",
              translation: "The Prophet (SAW) said: \"The most beloved of you to me and the closest to me on the Day of Resurrection will be those who have the best manners.\"",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A visible phone â€” even face-up on the table â€” signals divided attention. Research shows that the mere presence of a phone reduces the quality of conversation and makes the other person feel less valued. Removing it is the simplest way to show someone they matter.


**How?**

Make it a non-negotiable habit: when a conversation begins, your phone goes face-down on the table or into your pocket. Turn off vibration if you are easily distracted. Start with one-on-one conversations and expand to group settings. Notice how the quality of your interactions changes within a week.` },
        { title: 'Practise making comfortable eye contact â€” aim for 60-70% of the conversation', done: false,
          tier: 'T3',
          amanahRationale: 'Although the provided Hadith gives clear ethical guidance on verbal communication by commanding believers to either speak good or remain silent, it offers neither explicit proof nor a logical inference supporting the specific non-verbal practice of maintaining comfortable eye contact.',
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6077",
              translation: "The Prophet (peace be upon him) said: \"He who believes in Allah and the Last Day should speak good or keep silent.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Eye contact communicates engagement, confidence, and sincerity. Too little makes you seem disinterested or untrustworthy; too much can feel aggressive. The 60-70% range is the sweet spot that builds connection without discomfort.


**How?**

During your next few conversations, consciously maintain eye contact while the other person is speaking, and allow natural breaks when you are thinking or responding. If sustained eye contact feels difficult, focus on the triangle between the person's eyes and nose. Practise with trusted friends first and gradually extend to new people.` },
        { title: 'Face the speaker with open posture (uncrossed arms, slight lean forward)', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Hadith broadly emphasizes the spiritual and interpersonal importance of having the "best manners," it omits specific physical communication techniques like maintaining an open posture, making the subtask a practical logical inference to systematically embody this prophetic standard of respect during conversations.',
          sources: [
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 2641",
              translation: "The Prophet (SAW) said: \"The most beloved of you to me and the closest to me on the Day of Resurrection will be those who have the best manners.\"",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Your body communicates before your words do. Crossed arms, turned shoulders, or leaning away signal defensiveness or disinterest â€” even if you are genuinely listening. Open posture invites trust and makes the speaker feel safe to share.


**How?**

When someone speaks to you, turn your full body toward them â€” not just your head. Uncross your arms and let your hands rest naturally. Lean forward slightly to show engagement. This mirrors the sunnah of the Prophet (SAW), who would turn his entire body to face whoever addressed him.` },
        { title: 'Observe how others respond when you give them full, undivided attention', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources establish the overarching principles of giving full measure and exhibiting the best manners, they omit specific psychological techniques like observing others\' responses and journaling them, making the subtask a practical logical inference to systematically reinforce this prophetic standard of social interaction.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 26:181",
              arabic: "Ø£ÙŽÙˆÙ’ÙÙÙˆØ§ Ø§Ù„Ù’ÙƒÙŽÙŠÙ’Ù„ÙŽ ÙˆÙŽÙ„ÙŽØ§ ØªÙŽÙƒÙÙˆÙ†ÙÙˆØ§ Ù…ÙÙ†ÙŽ Ø§Ù„Ù’Ù…ÙØ®Ù’Ø³ÙØ±ÙÙŠÙ†ÙŽ",
              translation: "Give full measure: do not sell others short.",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              rationale: "giving full attention in conversation is the social expression of this Quranic command â€” giving people the full measure of your presence, not a diminished, distracted version.",
            },
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 2641",
              translation: "The Prophet (SAW) said: \"The most beloved of you to me and the closest to me on the Day of Resurrection will be those who have the best manners.\"",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Noticing the impact of your improved presence reinforces the habit. When you see people open up, share more deeply, or thank you for listening, it proves that full attention is one of the greatest gifts you can give another human being.


**How?**

After practising the previous subtasks for two weeks, start paying attention to how people react. Do they share more? Do conversations go deeper? Do people seek you out for advice? Journal your observations â€” this positive feedback loop will cement the habit permanently.` },
      ],
    },
    {
      title: 'Respond to wrongdoing with patience (hilm) â€” implement a 24-hour rule before reacting',
      priority: 'medium', tags: ['character', 'patience'],
      description: '',
      subtasks: [
        { title: 'Commit to the rule: when wronged or angered, wait 24 hours before responding', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources explicitly command believers to suppress anger and repel evil with good, they omit a specific modern timeframe like waiting 24 hours, making the subtask a practical logical inference to systematically control impulsive reactions and fulfill these divine and prophetic instructions.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 41:34",
              arabic: "ÙˆÙŽÙ„ÙŽØ§ ØªÙŽØ³Ù’ØªÙŽÙˆÙÙŠ Ø§Ù„Ù’Ø­ÙŽØ³ÙŽÙ†ÙŽØ©Ù ÙˆÙŽÙ„ÙŽØ§ Ø§Ù„Ø³ÙŽÙ‘ÙŠÙÙ‘Ø¦ÙŽØ©Ù Ø§Ø¯Ù’ÙÙŽØ¹Ù’ Ø¨ÙØ§Ù„ÙŽÙ‘ØªÙÙŠ Ù‡ÙÙŠÙŽ Ø£ÙŽØ­Ù’Ø³ÙŽÙ†Ù ÙÙŽØ¥ÙØ°ÙŽØ§ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠ Ø¨ÙŽÙŠÙ’Ù†ÙŽÙƒÙŽ ÙˆÙŽØ¨ÙŽÙŠÙ’Ù†ÙŽÙ‡Ù Ø¹ÙŽØ¯ÙŽØ§ÙˆÙŽØ©ÙŒ ÙƒÙŽØ£ÙŽÙ†ÙŽÙ‘Ù‡Ù ÙˆÙŽÙ„ÙÙŠÙŒÙ‘ Ø­ÙŽÙ…ÙÙŠÙ…ÙŒ",
              translation: "And not equal are the good deed and the bad. Repel evil by that which is better; and thereupon the one whom between you and him is enmity will become as though he was a devoted friend.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6116",
              translation: "The Prophet (peace be upon him) said: \"Do not be angry, do not be angry, do not be angry.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Most regrettable words and actions happen in the heat of the moment. A 24-hour buffer allows the initial emotional surge to subside, giving your rational mind and your faith time to guide your response. This single rule can prevent years of relational damage.


**How?**

Write the rule down and place it where you will see it daily. When you feel the urge to fire back â€” via text, email, or in person â€” tell yourself "24 hours." If someone is in front of you, excuse yourself politely. Do not type, send, or say anything until the time has passed.` },
        { title: 'During the waiting period, make wudu, pray two rakaat, and seek counsel from Allah', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources explicitly command believers to restrain their anger and control themselves, they omit specific spiritual interventions like making wudu, praying two rakaat, and seeking counsel from Allah, making the subtask a practical logical inference to systematically manage anger and fulfill these divine and prophetic instructions.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:134",
              arabic: "ÙˆÙŽØ§Ù„Ù’ÙƒÙŽØ§Ø¸ÙÙ…ÙÙŠÙ†ÙŽ Ø§Ù„Ù’ØºÙŽÙŠÙ’Ø¸ÙŽ ÙˆÙŽØ§Ù„Ù’Ø¹ÙŽØ§ÙÙÙŠÙ†ÙŽ Ø¹ÙŽÙ†Ù Ø§Ù„Ù†ÙŽÙ‘Ø§Ø³Ù ÙˆÙŽØ§Ù„Ù„ÙŽÙ‘Ù‡Ù ÙŠÙØ­ÙØ¨ÙÙ‘ Ø§Ù„Ù’Ù…ÙØ­Ù’Ø³ÙÙ†ÙÙŠÙ†ÙŽ",
              translation: "And those who restrain anger and who pardon the people â€” and Allah loves the doers of good.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 41:34",
              arabic: "Ø§Ø¯Ù’ÙÙŽØ¹Ù’ Ø¨ÙØ§Ù„ÙŽÙ‘ØªÙÙŠ Ù‡ÙÙŠÙŽ Ø£ÙŽØ­Ù’Ø³ÙŽÙ†Ù ÙÙŽØ¥ÙØ°ÙŽØ§ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠ Ø¨ÙŽÙŠÙ’Ù†ÙŽÙƒÙŽ ÙˆÙŽØ¨ÙŽÙŠÙ’Ù†ÙŽÙ‡Ù Ø¹ÙŽØ¯ÙŽØ§ÙˆÙŽØ©ÙŒ ÙƒÙŽØ£ÙŽÙ†ÙŽÙ‘Ù‡Ù ÙˆÙŽÙ„ÙÙŠÙŒÙ‘ Ø­ÙŽÙ…ÙÙŠÙ…ÙŒ",
              translation: "Repel evil by that which is better, and thereupon the one between whom and you there was enmity will become like a devoted friend.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6116",
              translation: "The Prophet (SAW) said: \"The strong man is not the one who can wrestle, but the strong man is the one who controls himself when angry.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The 24-hour window is not just about waiting â€” it is about redirecting your energy toward Allah. Wudu cools the body, salah centres the heart, and dua opens the door to guidance. The Prophet (SAW) prescribed these exact remedies for anger.

**How?**

As soon as you step away from the triggering situation, go make wudu. Then pray two voluntary rakaat and make a sincere dua asking Allah for patience, clarity, and the best response.` },
        { title: 'Write down what happened and how you feel before deciding on a response', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources explicitly command believers to control their anger, exercise patience, and forgive, they omit specific modern psychological techniques like writing down the incident and one\'s feelings, making the subtask a practical logical inference to systematically achieve emotional regulation and fulfill these divine and prophetic instructions.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 42:43",
              arabic: "ÙˆÙŽÙ„ÙŽÙ…ÙŽÙ† ØµÙŽØ¨ÙŽØ±ÙŽ ÙˆÙŽØºÙŽÙÙŽØ±ÙŽ Ø¥ÙÙ†ÙŽÙ‘ Ø°ÙŽÙ°Ù„ÙÙƒÙŽ Ù„ÙŽÙ…ÙÙ†Ù’ Ø¹ÙŽØ²Ù’Ù…Ù Ø§Ù„Ù’Ø£ÙÙ…ÙÙˆØ±Ù",
              translation: "And whoever is patient and forgives â€” indeed, that is of the matters requiring resolve.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6116",
              translation: "The Prophet (SAW) said: \"The strong man is not the one who can wrestle, but the strong man is the one who controls himself when angry.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Writing forces clarity. When you put the incident on paper, you often discover that the situation is less severe than it felt, or that your own assumptions contributed to the hurt. This process separates facts from emotions and prepares you for a measured response.


**How?**

Within the first few hours of the 24-hour period, write a brief account: What happened? What exactly was said or done? How did it make you feel? What assumptions are you making about the other person's intent? Review what you wrote before deciding how to respond. Often, the act of writing itself brings peace.` },
        { title: 'After 24 hours, choose the response that is most just and most likely to preserve the relationship', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Quranic verse establishes the foundational principles of proportional justice, pardoning, and reconciliation, it omits a specific modern timeframe like waiting 24 hours, making the subtask a practical logical inference to systematically choose a response that fulfills this divine guidance.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 42:40",
              arabic: "ÙˆÙŽØ¬ÙŽØ²ÙŽØ§Ø¡Ù Ø³ÙŽÙŠÙÙ‘Ø¦ÙŽØ©Ù Ø³ÙŽÙŠÙÙ‘Ø¦ÙŽØ©ÙŒ Ù…ÙÙ‘Ø«Ù’Ù„ÙÙ‡ÙŽØ§ ÙÙŽÙ…ÙŽÙ†Ù’ Ø¹ÙŽÙÙŽØ§ ÙˆÙŽØ£ÙŽØµÙ’Ù„ÙŽØ­ÙŽ ÙÙŽØ£ÙŽØ¬Ù’Ø±ÙÙ‡Ù Ø¹ÙŽÙ„ÙŽÙ‰ Ø§Ù„Ù„ÙŽÙ‘Ù‡Ù",
              translation: "The retribution for an evil act is an evil one like it, but whoever pardons and makes reconciliation â€” his reward is due from Allah.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The goal of the 24-hour rule is not to suppress your response but to refine it. After the waiting period, you are in a position to choose a response that is just (not vengeful), merciful (not cruel), and strategic (preserving the relationship wherever possible).


**How?**

After 24 hours, review your written notes and ask: What is the most just response? What would the Prophet (SAW) do? Will this response preserve or destroy the relationship? Choose the path that balances your rights with mercy. If direct conversation is needed, approach the person calmly, state what happened, how it affected you, and what you need going forward.` },
        { title: 'Track incidents where the 24-hour rule prevented a regrettable reaction', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources explicitly command believers to restrain their anger and remain silent, they omit specific modern psychological tools like keeping a log to track successful interventions, making the subtask a practical logical inference to systematically reinforce emotional regulation and fulfill these divine and prophetic instructions.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:134",
              arabic: "ÙˆÙŽØ§Ù„Ù’ÙƒÙŽØ§Ø¸ÙÙ…ÙÙŠÙ†ÙŽ Ø§Ù„Ù’ØºÙŽÙŠÙ’Ø¸ÙŽ ÙˆÙŽØ§Ù„Ù’Ø¹ÙŽØ§ÙÙÙŠÙ†ÙŽ Ø¹ÙŽÙ†Ù Ø§Ù„Ù†ÙŽÙ‘Ø§Ø³Ù",
              translation: "And those who restrain anger and who pardon the people.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 4782",
              translation: "The Prophet (SAW) said: \"If any of you becomes angry, let him keep silent.\"",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Tracking your wins builds confidence in the system. Every time you look back and realise the 24-hour rule saved you from a regrettable text, a harsh word, or a burned bridge, your commitment to the practice deepens.


**How?**

Keep a simple log â€” date, what triggered you, what you would have said or done immediately, and what you actually did after 24 hours. Over time, this log becomes powerful evidence of your growth in hilm and a motivator to continue.` },
      ],
    },
  ],
  health_social_growth: [
    {
      title: 'Build a reputation for honesty and reliability in your professional and social circles',
      priority: 'high', tags: ['trust', 'character'],
      description: 'The Prophet (SAW) was known as al-Amin (the trustworthy) even before revelation. A reputation for honesty and reliability is built through consistent small actions â€” keeping promises, meeting deadlines, telling the truth even when it is inconvenient, and never overpromising.',
      subtasks: [
        { title: 'Audit your current commitments â€” are there any unfulfilled promises or overdue obligations?', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources explicitly command believers to fulfill their contracts and warn against breaking promises, they omit specific modern organizational practices like conducting an audit or listing commitments, making the subtask a practical logical inference to systematically track and fulfill these religious obligations.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 5:1",
              arabic: "ÙŠÙŽØ§ Ø£ÙŽÙŠÙÙ‘Ù‡ÙŽØ§ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠÙ†ÙŽ Ø¢Ù…ÙŽÙ†ÙÙˆØ§ Ø£ÙŽÙˆÙ’ÙÙÙˆØ§ Ø¨ÙØ§Ù„Ù’Ø¹ÙÙ‚ÙÙˆØ¯Ù",
              translation: "O you who have believed, fulfil all contracts.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 33",
              translation: "The Prophet (peace be upon him) said: \"The signs of a hypocrite are three: when he speaks, he lies; when he makes a promise, he breaks it; and when he is entrusted, he betrays.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

You cannot build a reputation for reliability while carrying a backlog of broken promises. An honest audit reveals where your credibility has slipped and gives you a clear starting point for restoration.


**How?**

Set aside 30 minutes and list every commitment you have made recently â€” to family, friends, colleagues, and community. For each one, mark whether it is fulfilled, in progress, or overdue. For anything overdue, either complete it this week or communicate honestly about the delay. This single exercise rebuilds trust faster than any grand gesture.` },
        { title: 'Adopt a policy of under-promising and over-delivering in all commitments', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Hadith explicitly warns against breaking promises by classifying it as a sign of hypocrisy, it omits specific behavioral strategies like adopting a policy of under-promising and over-delivering, making the subtask a practical logical inference to systematically safeguard against this prohibited behavior.',
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 33",
              translation: "The Prophet (peace be upon him) said: \"The signs of a hypocrite are three: when he speaks, he lies; when he makes a promise, he breaks it; and when he is entrusted, he betrays.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Over-promising feels generous in the moment but erodes trust when you cannot follow through. Under-promising creates a buffer that allows you to consistently exceed expectations â€” and people remember those who deliver more than they promised.


**How?**

Before making any commitment, pause and ask: "Can I realistically deliver this, plus a little more, without stress?" If not, scale back what you promise. When someone asks for a favour, add extra time to your estimate. When you deliver early or beyond expectations, your reputation compounds.` },
        { title: 'Follow through on every small commitment (returning calls, showing up on time, completing favours)', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources explicitly command believers to be attentive to their trusts and promises and warn against breaking them, they omit specific modern examples like returning calls or showing up on time, making the subtask a practical logical inference to systematically uphold these foundational religious obligations.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 23:8",
              arabic: "ÙˆÙŽØ§Ù„ÙŽÙ‘Ø°ÙÙŠÙ†ÙŽ Ù‡ÙÙ…Ù’ Ù„ÙØ£ÙŽÙ…ÙŽØ§Ù†ÙŽØ§ØªÙÙ‡ÙÙ…Ù’ ÙˆÙŽØ¹ÙŽÙ‡Ù’Ø¯ÙÙ‡ÙÙ…Ù’ Ø±ÙŽØ§Ø¹ÙÙˆÙ†ÙŽ",
              translation: "And those who are to their trusts and their promises attentive.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 33",
              translation: "The Prophet (SAW) said: \"The signs of a hypocrite are three: when he speaks he lies, when he makes a promise he breaks it, and when he is entrusted he betrays.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Trust is built in the small things. Returning a call when you said you would, showing up five minutes early, and completing a small favour without being reminded â€” these micro-actions signal that you are someone who keeps their word at every level.


**How?**

Treat every small commitment with the same seriousness as a major deadline. When you tell someone "I will call you back," add it to your task list immediately. Set a personal standard of arriving five minutes early to everything. If you offer to do something, do it within 24 hours. These small wins accumulate into an unshakeable reputation.` },
        { title: 'When you cannot fulfil a commitment, communicate proactively and honestly', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources explicitly command believers to honor their pledges and warn against breaking promises as a sign of hypocrisy, they omit specific communication strategies like proactively informing others when a commitment cannot be met, making the subtask a practical logical inference to systematically uphold trust and avoid deceit.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 17:34",
              arabic: "ÙˆÙŽÙ„ÙŽØ§ ØªÙŽÙ‚Ù’Ø±ÙŽØ¨ÙÙˆØ§ Ù…ÙŽØ§Ù„ÙŽ Ø§Ù„Ù’ÙŠÙŽØªÙÙŠÙ…Ù Ø¥ÙÙ„ÙŽÙ‘Ø§ Ø¨ÙØ§Ù„ÙŽÙ‘ØªÙÙŠ Ù‡ÙÙŠÙŽ Ø£ÙŽØ­Ù’Ø³ÙŽÙ†Ù Ø­ÙŽØªÙŽÙ‘Ù‰Ù° ÙŠÙŽØ¨Ù’Ù„ÙØºÙŽ Ø£ÙŽØ´ÙØ¯ÙŽÙ‘Ù‡Ù Ûš ÙˆÙŽØ£ÙŽÙˆÙ’ÙÙÙˆØ§ Ø¨ÙØ§Ù„Ù’Ø¹ÙŽÙ‡Ù’Ø¯Ù Û– Ø¥ÙÙ†ÙŽÙ‘ Ø§Ù„Ù’Ø¹ÙŽÙ‡Ù’Ø¯ÙŽ ÙƒÙŽØ§Ù†ÙŽ Ù…ÙŽØ³Ù’Ø¦ÙÙˆÙ„Ù‹Ø§",
              translation: "Do not go near the orphan's property, except with the best intentions, until he reaches the age of maturity. Honour your pledges: you will be questioned about your pledges.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 33",
              translation: "The Prophet (SAW) said: \"The signs of a hypocrite are three: when he speaks, he lies; when he makes a promise, he breaks it; and when he is entrusted, he betrays.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Everyone occasionally falls short â€” what separates trustworthy people from unreliable ones is how they handle it. Proactive, honest communication when you cannot deliver preserves trust because it shows respect for the other person's time and expectations.


**How?**

The moment you realise you will miss a deadline or cannot fulfil a promise, reach out immediately â€” do not wait until the last minute. Explain the situation honestly (no excuses), apologise sincerely, and offer a concrete alternative or revised timeline. People forgive delays far more readily than silence.` },
        { title: 'Ask a trusted friend or colleague for honest feedback on your reliability', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources explicitly command believers to be attentive to their trusts and warn against betraying promises as a sign of hypocrisy, they omit specific modern self-assessment methods like seeking honest feedback from a friend, making the subtask a practical logical inference to systematically ensure one\'s reliability and fulfill these religious obligations.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 23:8",
              arabic: "ÙˆÙŽØ§Ù„ÙŽÙ‘Ø°ÙÙŠÙ†ÙŽ Ù‡ÙÙ…Ù’ Ù„ÙØ£ÙŽÙ…ÙŽØ§Ù†ÙŽØ§ØªÙÙ‡ÙÙ…Ù’ ÙˆÙŽØ¹ÙŽÙ‡Ù’Ø¯ÙÙ‡ÙÙ…Ù’ Ø±ÙŽØ§Ø¹ÙÙˆÙ†ÙŽ",
              translation: "And those who are to their trusts and their promises attentive.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 33",
              translation: "The Prophet (SAW) said: \"The signs of a hypocrite are three: when he speaks he lies, when he makes a promise he breaks it, and when he is entrusted he betrays.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Self-assessment has blind spots. You may believe you are reliable, but the people around you experience the reality. Honest feedback from someone you trust reveals the gap between your self-image and your actual reputation.


**How?**

Choose one or two people who know you well in different contexts (work and personal). Ask them directly: "On a scale of 1-10, how reliable would you say I am? Where do I fall short?" Listen without defending yourself, thank them genuinely, and act on the feedback. Revisit the conversation in three months to check your progress.` },
      ],
    },
    {
      title: 'Perform a regular act of service (khidmah) â€” volunteer, help a neighbour, or assist at the mosque',
      priority: 'medium', tags: ['khidmah', 'community'],
      description: '',
      subtasks: [
        { title: 'Identify a cause or organisation aligned with your skills and values', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Hadith explicitly encourages aiding one\'s brother to earn Allah\'s help, it omits specific modern organizational strategies like identifying a charitable cause aligned with personal skills, making the subtask a practical logical inference to systematically and sustainably fulfill this prophetic principle.',
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (peace be upon him) said: \"Allah is in the aid of His servant as long as the servant is in the aid of his brother.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Service is most sustainable and impactful when it aligns with what you are good at and what you care about. Random acts of service are beautiful, but strategic alignment turns occasional help into lasting impact.


**How?**

List your top three skills (organising, teaching, cooking, driving, technology, etc.) and your top three values (education, hunger relief, youth development, etc.). Search for local organisations or mosque programmes that sit at the intersection. Reach out to one this week and ask how you can contribute.` },
        { title: 'Commit to a regular schedule â€” even 2-4 hours per month makes a difference', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources explicitly praise charitable acts like feeding the vulnerable and relieving the hardships of believers, they omit specific modern organizational strategies like committing to a regular monthly schedule, making the subtask a practical logical inference to systematically and consistently fulfill these divine and prophetic exhortations.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 76:8-9",
              arabic: "ÙˆÙŽÙŠÙØ·Ù’Ø¹ÙÙ…ÙÙˆÙ†ÙŽ Ø§Ù„Ø·ÙŽÙ‘Ø¹ÙŽØ§Ù…ÙŽ Ø¹ÙŽÙ„ÙŽÙ‰Ù° Ø­ÙØ¨ÙÙ‘Ù‡Ù Ù…ÙØ³Ù’ÙƒÙÙŠÙ†Ù‹Ø§ ÙˆÙŽÙŠÙŽØªÙÙŠÙ…Ù‹Ø§ ÙˆÙŽØ£ÙŽØ³ÙÙŠØ±Ù‹Ø§ Ø¥ÙÙ†ÙŽÙ‘Ù…ÙŽØ§ Ù†ÙØ·Ù’Ø¹ÙÙ…ÙÙƒÙÙ…Ù’ Ù„ÙÙˆÙŽØ¬Ù’Ù‡Ù Ø§Ù„Ù„ÙŽÙ‘Ù‡Ù",
              translation: "And they give food in spite of love for it to the needy, the orphan, and the captive, saying: We feed you only for the sake of Allah.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (SAW) said: \"Whoever relieves a believer of a hardship in this world, Allah will relieve him of a hardship on the Day of Resurrection.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Sporadic service is better than none, but consistent service creates real change â€” both in the community and in your own character. A regular schedule turns khidmah from an occasional impulse into a pillar of your life.


**How?**

Block a specific time on your calendar â€” the first Saturday morning of each month, every other Friday afternoon, whatever works. Treat it like a non-negotiable appointment. Start with just 2-4 hours per month and increase only when you can sustain it without resentment or burnout.` },
        { title: 'Look for daily micro-opportunities: carrying groceries, giving rides, checking on elderly neighbours', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Hadith explicitly warns against neglecting a hungry neighbor, it omits specific daily micro-services like carrying groceries or giving rides, making the subtask a practical logical inference to systematically cultivate a servant mindset and fulfill this prophetic principle of neighborhood care.',
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6019",
              translation: "The Prophet (peace be upon him) said: \"He is not a believer whose stomach is filled while his neighbour goes hungry beside him.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Structured volunteering is valuable, but the majority of service opportunities appear in your daily routine. Noticing and acting on these micro-moments builds a servant mindset that becomes second nature.


**How?**

Train your eye to notice needs around you: the elderly person struggling with bags, the neighbour whose bins are still out, the colleague who looks overwhelmed. Act immediately without overthinking â€” carry the bags, bring the bins in, offer to help. Keep a mental count of daily micro-services for one week to build awareness.` },
        { title: 'Involve your family in service activities to build a culture of giving', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources explicitly encourage feeding the vulnerable and establish the principle that individuals are responsible for guiding their families, they omit specific modern methods like choosing a monthly family-friendly service activity, making the subtask a practical logical inference to systematically instill these divine and prophetic values of charity within the household.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 76:8-9",
              arabic: "ÙˆÙŽÙŠÙØ·Ù’Ø¹ÙÙ…ÙÙˆÙ†ÙŽ Ø§Ù„Ø·ÙŽÙ‘Ø¹ÙŽØ§Ù…ÙŽ Ø¹ÙŽÙ„ÙŽÙ‰Ù° Ø­ÙØ¨ÙÙ‘Ù‡Ù Ù…ÙØ³Ù’ÙƒÙÙŠÙ†Ù‹Ø§ ÙˆÙŽÙŠÙŽØªÙÙŠÙ…Ù‹Ø§ ÙˆÙŽØ£ÙŽØ³ÙÙŠØ±Ù‹Ø§",
              translation: "And they give food in spite of love for it to the needy, the orphan, and the captive.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 893",
              translation: "The Prophet (SAW) said: \"Each of you is a shepherd and each of you is responsible for his flock.\" (Including cultivating service values within the family.)",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

When service is a family activity, it multiplies the impact and instils generosity in your children from an early age. It also creates shared experiences and memories rooted in purpose rather than consumption.


**How?**

Choose one family-friendly service activity per month: cooking meals for a shelter together, cleaning the mosque grounds, visiting an elderly neighbour as a family, or assembling care packages. Let your children take ownership of age-appropriate tasks. Discuss the experience afterwards â€” why it matters and how it felt.` },
      ],
    },
    {
      title: 'Develop active listening skills â€” practise full presence and ask thoughtful follow-up questions',
      priority: 'medium', tags: ['communication', 'character'],
      description: 'Most people listen to respond, not to understand. Active listening â€” being fully present, reflecting back what you hear, and asking genuine follow-up questions â€” is one of the most powerful ways to honour another human being and build deep, trusting relationships.',
      subtasks: [
        { title: 'In your next 5 conversations, focus entirely on listening without planning your response', done: false,
          tier: 'T3',
          amanahRationale: 'Although the provided Quranic verse explicitly commands believers to investigate and verify information brought by an untrustworthy source, it offers neither explicit proof nor a logical inference supporting the general interpersonal habit of listening without planning a response.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:6",
              arabic: "ÙŠÙŽØ§ Ø£ÙŽÙŠÙÙ‘Ù‡ÙŽØ§ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠÙ†ÙŽ Ø¢Ù…ÙŽÙ†ÙÙˆØ§ Ø¥ÙÙ† Ø¬ÙŽØ§Ø¡ÙŽÙƒÙÙ…Ù’ ÙÙŽØ§Ø³ÙÙ‚ÙŒ Ø¨ÙÙ†ÙŽØ¨ÙŽØ¥Ù ÙÙŽØªÙŽØ¨ÙŽÙŠÙŽÙ‘Ù†ÙÙˆØ§",
              translation: "O you who have believed, if there comes to you a disobedient one with information, investigate.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The habit of mentally composing your reply while someone is still speaking means you are not truly hearing them. Deliberately silencing your inner response-planner, even for five conversations, rewires how you engage with others.


**How?**

In your next five meaningful conversations, give yourself one instruction: do not think about what you will say next. When you notice your mind drifting to your response, gently bring your attention back to the speaker's words, tone, and body language. Allow a pause after they finish before you respond â€” the pause proves you were listening, not just waiting.` },
        { title: 'Practise paraphrasing: "So what I hear you saying is..." before responding', done: false,
          tier: 'T3',
          amanahRationale: 'Although the provided sources broadly commend those who listen to speech and encourage believers to embody the best manners, they offer neither explicit proof nor a logical inference supporting the specific active listening technique of paraphrasing someone\'s words to confirm understanding.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 39:18",
              arabic: "Ø§Ù„ÙŽÙ‘Ø°ÙÙŠÙ†ÙŽ ÙŠÙŽØ³Ù’ØªÙŽÙ…ÙØ¹ÙÙˆÙ†ÙŽ Ø§Ù„Ù’Ù‚ÙŽÙˆÙ’Ù„ÙŽ ÙÙŽÙŠÙŽØªÙŽÙ‘Ø¨ÙØ¹ÙÙˆÙ†ÙŽ Ø£ÙŽØ­Ù’Ø³ÙŽÙ†ÙŽÙ‡Ù",
              translation: "Those who listen to speech and follow the best of it.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 2641",
              translation: "The Prophet (SAW) said: \"The most beloved of you to me and the closest to me on the Day of Resurrection will be those who have the best manners.\"",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Paraphrasing confirms to the speaker that they have been understood â€” and it often reveals misunderstandings before they cause conflict. It is one of the most effective tools for preventing miscommunication and showing genuine care.


**How?**

After someone shares something important, resist the urge to immediately give your opinion. Instead, say: "So what I hear you saying is..." and summarise their point in your own words. Then ask: "Did I get that right?" This takes practice and may feel awkward at first, but the impact on your relationships will be immediate.` },
        { title: 'Ask at least one thoughtful follow-up question in every meaningful conversation', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources establish the overarching principles of giving a speaker full attention and engaging in patient inquiry, they omit a specific metric like asking at least one thoughtful follow-up question, making the subtask a practical logical inference to systematically cultivate an engaged presence and fulfill this prophetic standard of communication.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 18:70",
              arabic: "Ù‚ÙŽØ§Ù„ÙŽ ÙÙŽØ¥ÙÙ†Ù Ø§ØªÙŽÙ‘Ø¨ÙŽØ¹Ù’ØªÙŽÙ†ÙÙŠ ÙÙŽÙ„ÙŽØ§ ØªÙŽØ³Ù’Ø£ÙŽÙ„Ù’Ù†ÙÙŠ Ø¹ÙŽÙ† Ø´ÙŽÙŠÙ’Ø¡Ù Ø­ÙŽØªÙŽÙ‘Ù‰Ù° Ø£ÙØ­Ù’Ø¯ÙØ«ÙŽ Ù„ÙŽÙƒÙŽ Ù…ÙÙ†Ù’Ù‡Ù Ø°ÙÙƒÙ’Ø±Ù‹Ø§",
              translation: "The man said, \"If you follow me then, do not query anything I do before I mention it to you myself.",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              rationale: "the deliberate, patient inquiry modelled between Musa and al-Khidr illustrates how thoughtful questions deepen understanding â€” the opposite of hasty, surface-level conversation.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6250",
              translation: "The Prophet (SAW) used to face the person he was speaking to completely and give them his full attention â€” a model of engaged, curious presence in every conversation.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A thoughtful follow-up question tells the speaker: "I am genuinely interested in what you are sharing." It deepens the conversation beyond surface-level exchanges and often leads to insights neither person expected.


**How?**

After someone shares, ask a question that goes deeper: "What was that like for you?" "What do you think you will do next?" "How did that change your perspective?" Avoid questions that shift the topic to yourself. Make this a personal challenge â€” one genuine follow-up question per meaningful conversation, every day.` },
        { title: 'Notice the difference in connection quality when you listen deeply vs. superficially', done: false,
          tier: 'T3',
          amanahRationale: 'Although the provided Quranic verse broadly praises those who listen to speech and follow the best of it, it offers neither explicit proof nor a logical inference supporting the specific interpersonal exercise of rating and comparing the connection quality of deep versus superficial listening.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 39:18",
              arabic: "Ø§Ù„ÙŽÙ‘Ø°ÙÙŠÙ†ÙŽ ÙŠÙŽØ³Ù’ØªÙŽÙ…ÙØ¹ÙÙˆÙ†ÙŽ Ø§Ù„Ù’Ù‚ÙŽÙˆÙ’Ù„ÙŽ ÙÙŽÙŠÙŽØªÙŽÙ‘Ø¨ÙØ¹ÙÙˆÙ†ÙŽ Ø£ÙŽØ­Ù’Ø³ÙŽÙ†ÙŽÙ‡Ù",
              translation: "Those who listen to speech and follow the best of it. Those are the ones Allah has guided.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Awareness of the difference is what transforms active listening from a technique into a permanent character trait. When you feel the contrast between a shallow exchange and a deeply connected conversation, you will never want to go back.


**How?**

After each conversation this week, rate the connection quality on a scale of 1-5. Note whether you were fully present or distracted. Compare the ratings â€” you will see a clear pattern. Conversations where you truly listened will consistently score higher, reinforcing the habit with real evidence.` },
        { title: 'Read or watch one resource on active listening techniques this month', done: false,
          tier: 'T2',
          amanahRationale: 'Fallback assignment â€” NotebookLM returned stale conversation (empty answer, turn_number:0); subtask has sources so Qarina is the conservative assignment.',
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6077",
              translation: "The Prophet (peace be upon him) said: \"He who believes in Allah and the Last Day should speak good or keep silent.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Learning from experts accelerates your growth. There are techniques â€” mirroring, labelling emotions, strategic silence â€” that you may not discover through practice alone. Even one good resource can give you tools that transform your conversations.


**How?**

Search for a highly-rated book, podcast episode, or video on active listening. Good starting points include resources on motivational interviewing, counselling fundamentals, or negotiation communication. Dedicate one hour this month to learning, then immediately practise one new technique in your next conversation.` },
      ],
    },
    {
      title: 'Identify and reconcile at least one broken or strained relationship this month',
      priority: 'high', tags: ['reconciliation', 'sulh'],
      description: ' Reconciliation â€” even when you were wronged â€” is one of the highest acts of character in Islam.',
      subtasks: [
        { title: 'List relationships that are currently strained, broken, or distant', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources explicitly command believers to make settlement between brothers and forbid forsaking them, they omit specific modern organizational practices like listing strained relationships, making the subtask a practical logical inference to systematically identify and reconcile broken ties in fulfillment of these divine and prophetic instructions.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:10",
              arabic: "Ø¥ÙÙ†ÙŽÙ‘Ù…ÙŽØ§ Ø§Ù„Ù’Ù…ÙØ¤Ù’Ù…ÙÙ†ÙÙˆÙ†ÙŽ Ø¥ÙØ®Ù’ÙˆÙŽØ©ÙŒ ÙÙŽØ£ÙŽØµÙ’Ù„ÙØ­ÙÙˆØ§ Ø¨ÙŽÙŠÙ’Ù†ÙŽ Ø£ÙŽØ®ÙŽÙˆÙŽÙŠÙ’ÙƒÙÙ…Ù’",
              translation: "The believers are but brothers, so make settlement between your brothers.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2707",
              translation: "The Prophet (peace be upon him) said: \"It is not lawful for a Muslim to forsake his brother for more than three days.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

You cannot reconcile what you have not acknowledged. Writing down strained relationships forces you to confront the reality of disconnection and moves reconciliation from a vague intention to a concrete action item.


**How?**

Sit quietly and think through your family, friends, colleagues, and community members. Write the name of every person with whom things are not right â€” whether through conflict, neglect, or slow drift. Be honest; include relationships you have been avoiding thinking about. This list is your starting point.` },
        { title: "Choose one relationship to prioritise for reconciliation this month", done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources explicitly command believers to reconcile conflicts and forbid forsaking a brother for more than three days, they omit specific modern organizational strategies like prioritizing a single relationship for a month, making the subtask a practical logical inference to systematically fulfill these divine and prophetic instructions.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:9",
              arabic: "ÙˆÙŽØ¥ÙÙ† Ø·ÙŽØ§Ø¦ÙÙÙŽØªÙŽØ§Ù†Ù Ù…ÙÙ†ÙŽ Ø§Ù„Ù’Ù…ÙØ¤Ù’Ù…ÙÙ†ÙÙŠÙ†ÙŽ Ø§Ù‚Ù’ØªÙŽØªÙŽÙ„ÙÙˆØ§ ÙÙŽØ£ÙŽØµÙ’Ù„ÙØ­ÙÙˆØ§ Ø¨ÙŽÙŠÙ’Ù†ÙŽÙ‡ÙÙ…ÙŽØ§ Û– ÙÙŽØ¥ÙÙ† Ø¨ÙŽØºÙŽØªÙ’ Ø¥ÙØ­Ù’Ø¯ÙŽØ§Ù‡ÙÙ…ÙŽØ§ Ø¹ÙŽÙ„ÙŽÙ‰ Ø§Ù„Ù’Ø£ÙØ®Ù’Ø±ÙŽÙ‰Ù° ÙÙŽÙ‚ÙŽØ§ØªÙÙ„ÙÙˆØ§ Ø§Ù„ÙŽÙ‘ØªÙÙŠ ØªÙŽØ¨Ù’ØºÙÙŠ Ø­ÙŽØªÙŽÙ‘Ù‰Ù° ØªÙŽÙÙÙŠØ¡ÙŽ Ø¥ÙÙ„ÙŽÙ‰Ù° Ø£ÙŽÙ…Ù’Ø±Ù Ø§Ù„Ù„ÙŽÙ‘Ù‡Ù Ûš ÙÙŽØ¥ÙÙ† ÙÙŽØ§Ø¡ÙŽØªÙ’ ÙÙŽØ£ÙŽØµÙ’Ù„ÙØ­ÙÙˆØ§ Ø¨ÙŽÙŠÙ’Ù†ÙŽÙ‡ÙÙ…ÙŽØ§ Ø¨ÙØ§Ù„Ù’Ø¹ÙŽØ¯Ù’Ù„Ù ÙˆÙŽØ£ÙŽÙ‚Ù’Ø³ÙØ·ÙÙˆØ§ Û– Ø¥ÙÙ†ÙŽÙ‘ Ø§Ù„Ù„ÙŽÙ‘Ù‡ÙŽ ÙŠÙØ­ÙØ¨ÙÙ‘ Ø§Ù„Ù’Ù…ÙÙ‚Ù’Ø³ÙØ·ÙÙŠÙ†ÙŽ",
              translation: "If two groups of the believers fight, you should try to reconcile them; if one of them is clearly oppressing the other, fight the oppressors until they submit to Godâ€™s command, then make a just and even-handed reconciliation between the two of them: God loves those who are even-handed.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2707",
              translation: "The Prophet (SAW) said: \"It is not permissible for a Muslim to forsake his brother for more than three days, both of them turning away from each other when they meet. The better of them is the one who initiates the greeting of salam.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Trying to fix everything at once leads to paralysis. Choosing one relationship focuses your energy and increases the likelihood of meaningful progress. One successful reconciliation also builds the confidence and skill to tackle others.


**How?**

Review your list and select the relationship that weighs most heavily on your heart, or the one where reconciliation is most achievable. Consider factors like proximity, the severity of the rift, and whether the other person might be receptive. Commit to this one relationship for the next 30 days.` },
        { title: 'Reflect honestly on your role in the breakdown â€” make istighfar if needed', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources explicitly command believers to make settlement between brothers and forbid shunning them for more than three days, they omit specific internal steps like honest self-reflection and making istighfar, making the subtask a practical logical inference to systematically prepare the heart for genuine reconciliation.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:10",
              arabic: "Ø¥ÙÙ†ÙŽÙ‘Ù…ÙŽØ§ Ø§Ù„Ù’Ù…ÙØ¤Ù’Ù…ÙÙ†ÙÙˆÙ†ÙŽ Ø¥ÙØ®Ù’ÙˆÙŽØ©ÙŒ ÙÙŽØ£ÙŽØµÙ’Ù„ÙØ­ÙÙˆØ§ Ø¨ÙŽÙŠÙ’Ù†ÙŽ Ø£ÙŽØ®ÙŽÙˆÙŽÙŠÙ’ÙƒÙÙ…Ù’ ÙˆÙŽØ§ØªÙŽÙ‘Ù‚ÙÙˆØ§ Ø§Ù„Ù„ÙŽÙ‘Ù‡ÙŽ Ù„ÙŽØ¹ÙŽÙ„ÙŽÙ‘ÙƒÙÙ…Ù’ ØªÙØ±Ù’Ø­ÙŽÙ…ÙÙˆÙ†ÙŽ",
              translation: "The believers are but brothers, so make settlement between your brothers. And fear Allah that you may receive mercy.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6077",
              translation: "The Prophet (SAW) said: \"It is not permissible for a Muslim to shun his brother for more than three days.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

It is human nature to see yourself as the victim in every conflict. Honest self-reflection often reveals that you contributed to the breakdown â€” through words, neglect, pride, or misunderstanding. Acknowledging your role is the foundation of genuine reconciliation.


**How?**

Before reaching out, spend time in honest self-examination. Ask yourself: What did I do or fail to do? Did I listen, or did I dismiss? Was I fair, or was I harsh? If you find fault in yourself, make sincere istighfar and be prepared to acknowledge your part when you reach out. This is not weakness â€” it is the strength of prophetic character.` },
        { title: 'Reach out with humility â€” a call, visit, or sincere message', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources explicitly emphasize the duty of conveying the message and highly praise the act of reconciling between people, they omit specific modern communication methods like making a call or sending a message, making the subtask a practical logical inference to systematically initiate reconciliation and fulfill these religious injunctions.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 13:40",
              arabic: "ÙˆÙŽØ¥ÙÙ† Ù…ÙŽÙ‘Ø§ Ù†ÙØ±ÙÙŠÙŽÙ†ÙŽÙ‘ÙƒÙŽ Ø¨ÙŽØ¹Ù’Ø¶ÙŽ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠ Ù†ÙŽØ¹ÙØ¯ÙÙ‡ÙÙ…Ù’ Ø£ÙŽÙˆÙ’ Ù†ÙŽØªÙŽÙˆÙŽÙÙŽÙ‘ÙŠÙŽÙ†ÙŽÙ‘ÙƒÙŽ ÙÙŽØ¥ÙÙ†ÙŽÙ‘Ù…ÙŽØ§ Ø¹ÙŽÙ„ÙŽÙŠÙ’ÙƒÙŽ Ø§Ù„Ù’Ø¨ÙŽÙ„ÙŽØ§ØºÙ ÙˆÙŽØ¹ÙŽÙ„ÙŽÙŠÙ’Ù†ÙŽØ§ Ø§Ù„Ù’Ø­ÙØ³ÙŽØ§Ø¨Ù",
              translation: "Whether We let you see part of what We threaten them with, or cause you to die before that, your duty is only to deliver the message: the Reckoning is Ours.",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              rationale: "your duty is to make the sincere outreach â€” the outcome belongs to Allah. Reach out; do not wait for guaranteed results.",
            },
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 4919",
              translation: "The Prophet (SAW) said: \"Shall I not tell you of something better in degree than fasting, prayer, and charity?\" They said: \"Yes.\" He said: \"Reconciling between people â€” for discord among people is the destroyer.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The first move is always the hardest, and the one who initiates reconciliation earns the greater reward regardless of who was at fault. A humble, sincere outreach can melt years of resentment and reopen doors you thought were permanently closed.


**How?**

Choose the medium that feels most personal â€” a face-to-face visit is best, followed by a phone call, then a heartfelt message. Keep it simple: express that you value the relationship, acknowledge any wrongdoing on your part, and express your desire to move forward. Do not demand an apology or relitigate the past. Your job is to open the door; let Allah handle the rest.` },
        { title: 'Focus on restoring basic goodwill, not necessarily resolving every issue at once', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources explicitly encourage and highly praise the act of reconciling between people, they omit specific conflict-resolution strategies like focusing initially on restoring basic goodwill rather than resolving every issue at once, making the subtask a practical logical inference to systematically achieve this religious objective.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 4:114",
              arabic: "Ù„ÙŽÙ‘Ø§ Ø®ÙŽÙŠÙ’Ø±ÙŽ ÙÙÙŠ ÙƒÙŽØ«ÙÙŠØ±Ù Ù…ÙÙ‘Ù† Ù†ÙŽÙ‘Ø¬Ù’ÙˆÙŽØ§Ù‡ÙÙ…Ù’ Ø¥ÙÙ„ÙŽÙ‘Ø§ Ù…ÙŽÙ†Ù’ Ø£ÙŽÙ…ÙŽØ±ÙŽ Ø¨ÙØµÙŽØ¯ÙŽÙ‚ÙŽØ©Ù Ø£ÙŽÙˆÙ’ Ù…ÙŽØ¹Ù’Ø±ÙÙˆÙÙ Ø£ÙŽÙˆÙ’ Ø¥ÙØµÙ’Ù„ÙŽØ§Ø­Ù Ø¨ÙŽÙŠÙ’Ù†ÙŽ Ø§Ù„Ù†ÙŽÙ‘Ø§Ø³Ù",
              translation: "No good is there in much of their private conversation, except for those who enjoin charity or that which is right or reconciliation between people.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 4919",
              translation: "The Prophet (SAW) said: \"Shall I not tell you of something better in degree than fasting, prayer, and charity?\" They said: \"Yes.\" He said: \"Reconciling between people.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Reconciliation does not mean resolving every disagreement â€” it means restoring basic goodwill, respect, and willingness to engage. Trying to solve everything in one conversation often reignites conflict. Small, steady steps rebuild trust more effectively than grand resolutions.


**How?**

Set realistic expectations: your goal is to move from hostility or silence to basic warmth and communication. Start with simple gestures â€” a greeting, a shared meal, a brief check-in. Let the relationship rebuild naturally over time. If deeper issues need addressing, schedule those conversations once the foundation of goodwill is restored.` },
      ],
    },
  ],
  health_social_excellence: [
    {
      title: 'Mentor a younger Muslim in character development and professional or spiritual growth',
      priority: 'medium', tags: ['mentorship', 'dawah'],
      description: 'The Prophet (SAW) invested deeply in individual mentorship â€” his companionship with Abu Bakr, his guidance of Ali, his nurturing of Anas. Mentoring a younger Muslim passes on hard-won wisdom, multiplies your impact, and fulfils the obligation of mutual enjoining of good (amr bil maruf).',
      subtasks: [
        { title: 'Identify a younger Muslim in your community, workplace, or family who could benefit from mentorship', done: false,
          tier: 'T3',
          amanahRationale: 'Although the provided Hadith illustrates Abu Bakr\'s overarching dedication to serving the Muslim nation upon becoming Caliph, it offers neither explicit proof nor a logical inference supporting the specific personal initiative of identifying and mentoring a younger Muslim.',
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 2070",
              translation: "Narrated `Aisha:When Abu Bakr As-Siddiq was chosen Caliph, he said, \"My people know that my profession was not incapable of providing substance to my family. And as I will be busy serving the Muslim nation, my family will eat from the National Treasury of Muslims, and I will practice the profession of serving the Muslims",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Every generation needs guides who have walked the path before them. Without mentorship, younger Muslims navigate career, character, and spiritual challenges alone â€” often making avoidable mistakes. Your experience, even if imperfect, is exactly what someone needs right now.


**How?**

Look around your immediate circles: the mosque, your workplace, your extended family, or community programmes. Notice who is at a transition point â€” starting university, entering the workforce, newly married, or struggling with direction. Approach them naturally, not with a formal "I want to mentor you" speech, but with genuine interest in their life and a willingness to be available.` },
        { title: 'Initiate the relationship naturally â€” regular check-ins over coffee, walks, or shared activities', done: false,
          tier: 'T3',
          amanahRationale: 'Although the provided Hadith beautifully illustrates the general principle of mutual love and empathy among believers, it offers neither explicit proof nor a logical inference supporting the specific social mechanics of initiating a mentorship relationship naturally through shared activities like coffee or walks.',
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6005",
              translation: "The Prophet (peace be upon him) said: \"The example of the believers in their mutual love, mercy, and compassion is like one body; when one limb complains, the rest of the body responds with wakefulness and fever.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Forced mentorship feels like a lecture. The most transformative mentoring relationships are built on natural, relaxed interactions where wisdom is exchanged through conversation, shared experience, and genuine companionship â€” just as the Sahaba learned from the Prophet (SAW) by being with him.


**How?**

Suggest a low-pressure activity: coffee, a walk after Jumuah, helping them with a project, or attending a community event together. Let conversations flow naturally rather than following a curriculum. Be consistent with your invitations â€” showing up regularly communicates that you genuinely care, not that you are fulfilling an obligation.` },
        { title: 'Listen first to understand their challenges, goals, and aspirations', done: false,
          tier: 'T3',
          amanahRationale: 'Although the provided sources explicitly command believers to invite others to the way of the Lord with wisdom and to convey knowledge, they offer neither explicit proof nor a logical inference supporting the specific mentoring technique of listening first to understand a person\'s challenges and goals.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 16:125",
              arabic: "Ø§Ø¯Ù’Ø¹Ù Ø¥ÙÙ„ÙŽÙ‰Ù° Ø³ÙŽØ¨ÙÙŠÙ„Ù Ø±ÙŽØ¨ÙÙ‘ÙƒÙŽ Ø¨ÙØ§Ù„Ù’Ø­ÙÙƒÙ’Ù…ÙŽØ©Ù ÙˆÙŽØ§Ù„Ù’Ù…ÙŽÙˆÙ’Ø¹ÙØ¸ÙŽØ©Ù Ø§Ù„Ù’Ø­ÙŽØ³ÙŽÙ†ÙŽØ©Ù",
              translation: "Invite to the way of your Lord with wisdom and good instruction.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 4607",
              translation: "The Prophet (SAW) said: \"Convey from me, even if it is one verse.\" (Emphasising the responsibility to share knowledge.)",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih â€” narrated in Sahih al-Bukhari 3461",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Effective mentorship starts with understanding, not advice. If you jump straight to sharing your wisdom without understanding their world, your guidance will miss the mark. Listening first earns trust and ensures your input is relevant and welcome.


**How?**

In your early conversations, ask open-ended questions: "What are you working toward right now?" "What is your biggest challenge?" "What do you wish someone had told you a year ago?" Listen fully before responding. Take mental notes of recurring themes. Only offer advice when asked, or when you see a clear connection between their challenge and your experience.` },
        { title: 'Share relevant experiences, lessons, and resources without being preachy', done: false,
          tier: 'T3',
          amanahRationale: 'Although the provided source explicitly encourages the pursuit of knowledge and broadly commends sharing experiences with others, it offers neither explicit proof nor a logical inference supporting the specific mentoring communication style of sharing personal lessons and resources without being preachy.',
          sources: [
            {
              kind: "hadith",
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (peace be upon him) said: \"Whoever follows a path in pursuit of knowledge, Allah will make easy for him a path to Paradise.\" Sharing knowledge and experience with others is among the most valuable paths.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Young people tune out lectures but absorb stories. Sharing your own mistakes, failures, and hard-won lessons in a vulnerable, relatable way is far more impactful than dispensing advice from a position of authority. Authenticity builds trust; preachiness destroys it.


**How?**

When a topic arises where you have relevant experience, share it as a story, not a directive: "I went through something similar and here is what I learned..." Include your mistakes and what you wish you had done differently. Recommend books, podcasts, or people who helped you â€” but limit to one or two suggestions at a time. Let them ask for more rather than overwhelming them.` },
        { title: 'Meet consistently â€” at least monthly â€” and follow up on previous conversations', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources explicitly praise deeds done consistently and the embodiment of the best manners, they omit specific mentoring practices like meeting on a monthly basis and following up on previous conversations, making the subtask a practical logical inference to systematically apply these prophetic principles to a mentorship relationship.',
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6464",
              translation: "The Prophet (SAW) said: \"The most beloved deeds to Allah are those done consistently, even if they are small.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 2641",
              translation: "The Prophet (SAW) said: \"The most beloved of you to me and the closest to me on the Day of Resurrection will be those who have the best manners.\"",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Consistency is what separates mentorship from a one-off conversation. Meeting regularly shows that you are invested in their growth, and following up on previous topics demonstrates that you actually listen and remember â€” which deepens the trust exponentially.


**How?**

Set a recurring date â€” the first Sunday of each month, every other Friday after Maghrib, whatever works for both of you. At each meeting, reference something from the last conversation: "Last time you mentioned you were applying for that role â€” how did it go?" This continuity transforms casual catch-ups into a meaningful mentoring journey.` },
      ],
    },
    {
      title: 'Represent Islam publicly through excellence in conduct â€” let your character be your dawah',
      priority: 'medium', tags: ['dawah', 'character'],
      description: 'The greatest dawah is not a speech or a pamphlet â€” it is your character. When non-Muslims see a Muslim who is honest, generous, patient, and excellent in their work, it speaks louder than any argument. This task is about being intentionally excellent in public-facing interactions as an act of worship.',
      subtasks: [
        { title: 'Identify 3 public-facing contexts where you interact with non-Muslims regularly', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Quranic verses explicitly command believers to invite others to the way of Allah with wisdom and righteous deeds, they omit specific modern organizational steps like identifying three public-facing contexts for interaction, making the subtask a practical logical inference to systematically integrate these divine injunctions into daily life.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 16:125",
              arabic: "Ø§Ø¯Ù’Ø¹Ù Ø¥ÙÙ„ÙŽÙ‰Ù° Ø³ÙŽØ¨ÙÙŠÙ„Ù Ø±ÙŽØ¨ÙÙ‘ÙƒÙŽ Ø¨ÙØ§Ù„Ù’Ø­ÙÙƒÙ’Ù…ÙŽØ©Ù ÙˆÙŽØ§Ù„Ù’Ù…ÙŽÙˆÙ’Ø¹ÙØ¸ÙŽØ©Ù Ø§Ù„Ù’Ø­ÙŽØ³ÙŽÙ†ÙŽØ©Ù",
              translation: "Invite to the way of your Lord with wisdom and good instruction.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 41:33",
              arabic: "ÙˆÙŽÙ…ÙŽÙ†Ù’ Ø£ÙŽØ­Ù’Ø³ÙŽÙ†Ù Ù‚ÙŽÙˆÙ’Ù„Ù‹Ø§ Ù…ÙÙ‘Ù…ÙŽÙ‘Ù† Ø¯ÙŽØ¹ÙŽØ§ Ø¥ÙÙ„ÙŽÙ‰ Ø§Ù„Ù„ÙŽÙ‘Ù‡Ù ÙˆÙŽØ¹ÙŽÙ…ÙÙ„ÙŽ ØµÙŽØ§Ù„ÙØ­Ù‹Ø§ ÙˆÙŽÙ‚ÙŽØ§Ù„ÙŽ Ø¥ÙÙ†ÙŽÙ‘Ù†ÙÙŠ Ù…ÙÙ†ÙŽ Ø§Ù„Ù’Ù…ÙØ³Ù’Ù„ÙÙ…ÙÙŠÙ†ÙŽ",
              translation: "And who is better in speech than one who invites to Allah and does righteousness and says: Indeed, I am of the Muslims.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

You cannot be intentional about something you have not identified. Mapping the contexts where you regularly interact with non-Muslims allows you to turn everyday interactions into deliberate acts of dawah through excellence.


**How?**

Think through your weekly routine: your workplace, your neighbourhood, the school gate, local shops, the gym, community events. Write down three specific contexts where you interact with non-Muslims regularly. For each, note what impression you currently leave and what excellence would look like in that setting.` },
        { title: 'In each context, aim for measurably excellent conduct â€” extra courtesy, reliability, generosity', done: false,
          tier: 'T2',
          amanahRationale: 'Fallback assignment â€” NotebookLM returned stale conversation (empty answer, turn_number:0); subtask has sources so Qarina is the conservative assignment.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:110",
              arabic: "ÙƒÙÙ†ØªÙÙ…Ù’ Ø®ÙŽÙŠÙ’Ø±ÙŽ Ø£ÙÙ…ÙŽÙ‘Ø©Ù Ø£ÙØ®Ù’Ø±ÙØ¬ÙŽØªÙ’ Ù„ÙÙ„Ù†ÙŽÙ‘Ø§Ø³Ù ØªÙŽØ£Ù’Ù…ÙØ±ÙÙˆÙ†ÙŽ Ø¨ÙØ§Ù„Ù’Ù…ÙŽØ¹Ù’Ø±ÙÙˆÙÙ ÙˆÙŽØªÙŽÙ†Ù’Ù‡ÙŽÙˆÙ’Ù†ÙŽ Ø¹ÙŽÙ†Ù Ø§Ù„Ù’Ù…ÙÙ†ÙƒÙŽØ±Ù",
              translation: "You are the best nation produced for mankind. You enjoin what is right and forbid what is wrong.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 2641",
              translation: "The Prophet (SAW) said: \"The most beloved of you to me and the closest to me on the Day of Resurrection will be those who have the best manners.\"",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Vague intentions to "be a good Muslim in public" rarely translate into action. Measurable excellence â€” going above and beyond what is expected â€” creates memorable impressions that people associate with your faith.


**How?**

For each of your three contexts, set one specific excellence target this month. At work: deliver every project ahead of deadline. In your neighbourhood: be the first to offer help when someone is moving, shovelling, or struggling. At the school gate: greet every parent warmly and remember their names. Track your follow-through and raise the bar each month.` },
        { title: "Handle complaints, conflicts, or rudeness with prophetic composure and grace", done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources explicitly praise controlling oneself in moments of anger and highlight the Prophet\'s composure under attack, they omit specific modern conflict-resolution steps like taking a breath, lowering one\'s voice, or reflecting afterward, making the subtask a practical logical inference to systematically emulate this prophetic grace in daily interactions.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 68:2",
              arabic: "Ù…ÙŽØ§ Ø£ÙŽÙ†ØªÙŽ Ø¨ÙÙ†ÙØ¹Ù’Ù…ÙŽØ©Ù Ø±ÙŽØ¨ÙÙ‘ÙƒÙŽ Ø¨ÙÙ…ÙŽØ¬Ù’Ù†ÙÙˆÙ†Ù",
              translation: "Your Lordâ€™s grace does not make you [Prophet] a madman.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 52:29",
              arabic: "ÙÙŽØ°ÙŽÙƒÙÙ‘Ø±Ù’ ÙÙŽÙ…ÙŽØ§ Ø£ÙŽÙ†ØªÙŽ Ø¨ÙÙ†ÙØ¹Ù’Ù…ÙŽØªÙ Ø±ÙŽØ¨ÙÙ‘ÙƒÙŽ Ø¨ÙÙƒÙŽØ§Ù‡ÙÙ†Ù ÙˆÙŽÙ„ÙŽØ§ Ù…ÙŽØ¬Ù’Ù†ÙÙˆÙ†Ù",
              translation: "So [Prophet] remind [people]. By the grace of your Lord [Prophet], you are neither oracle nor madman.",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              rationale: "the prophetic model is to continue with composure and clarity regardless of how others respond.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6114",
              translation: "The Prophet (SAW) said: \"The strong man is not the one who overcomes people by his strength, but the strong man is the one who controls himself while in anger.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Anyone can be pleasant when things are going well. The true test of character â€” and the most powerful dawah â€” is how you respond when someone is rude, unfair, or hostile. The Prophet (SAW) met hostility with dignity, and many hearts were opened through his composure.


**How?**

When faced with rudeness or conflict in a public setting, take a breath before responding. Speak calmly, lower your voice rather than raising it, and seek resolution rather than victory. If someone is rude to you because of your faith, respond with warmth and facts rather than defensiveness. Afterwards, reflect on how you handled it and what you would improve.` },
        { title: 'Be willing to explain Islamic practices when asked, with warmth and confidence', done: false,
          tier: 'T2',
          amanahRationale: 'Fallback assignment â€” NotebookLM returned stale conversation (empty answer, turn_number:0); subtask has sources so Qarina is the conservative assignment.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 6:125",
              arabic: "**Translation:** So, whomsoever Allah wills to guide, He makes his heart wide open for Islam, and whomsoever He wills to let go astray, He makes his heart strait and constricted, (and he feels embracing Islam as difficult) as if he were climbing to the sky. In this way, Allah lays abomination on those who do not believe.",
              translation: "So, whomsoever Allah wills to guide, He makes his heart wide open for Islam, and whomsoever He wills to let go astray, He makes his heart strait and constricted, (and he feels embracing Islam as difficult) as if he were climbing to the sky. In this way, Allah lays abomination on those who do not believe.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "quran",
              ref: "Quran 42:13",
              arabic: "**Translation:** He (AllÃ¢h) has ordained for you the same religion (IslÃ¢mic Monotheism) which He ordained for NÃ»h (Noah), and that which We have revealed to you (O Muhammad ØµÙ„Ù‰ Ø§Ù„Ù„Ù‡ Ø¹Ù„ÙŠÙ‡ Ùˆ Ø³Ù„Ù…), and that which We ordained for IbrÃ¢hÃ®m (Abraham), MÃ»sÃ¢ (Moses) and â€˜ÃŽsÃ¢ (Jesus) saying you should establish religion (i.e. to do what it orders you to do practically), and make no divisions in it (religion) (i.e. various sects in religion). Intolerable for the MushrikÃ»n, is that (Islamic Monotheism) to which you (O Muhammad ØµÙ„Ù‰ Ø§Ù„Ù„Ù‡ Ø¹Ù„ÙŠÙ‡ Ùˆ Ø³Ù„Ù…) call them. AllÃ¢h chooses for Himself whom He wills, and guides unto Himself who turns to Him in repentance and in obedience.",
              translation: "He (AllÃ¢h) has ordained for you the same religion (IslÃ¢mic Monotheism) which He ordained for NÃ»h (Noah), and that which We have revealed to you (O Muhammad ØµÙ„Ù‰ Ø§Ù„Ù„Ù‡ Ø¹Ù„ÙŠÙ‡ Ùˆ Ø³Ù„Ù…), and that which We ordained for IbrÃ¢hÃ®m (Abraham), MÃ»sÃ¢ (Moses) and â€˜ÃŽsÃ¢ (Jesus) saying you should establish religion (i.e. to do what it orders you to do practically), and make no divisions in it (religion) (i.e. various sects in religion). Intolerable for the MushrikÃ»n, is that (Islamic Monotheism) to which you (O Muhammad ØµÙ„Ù‰ Ø§Ù„Ù„Ù‡ Ø¹Ù„ÙŠÙ‡ Ùˆ Ø³Ù„Ù…) call them. AllÃ¢h chooses for Himself whom He wills, and guides unto Himself who turns to Him in repentance and in obedience.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 3",
              translation: "Narrated 'Aisha (the mother of the faithful believers):The commencement of the Divine Inspiration to Allah's Messenger (ï·º) was in the form of good dreams which came true like bright daylight, and then the love of seclusion was bestowed upon him. He used to go in seclusion in the cave of Hira where he used to worship (Allah alone) continuously for many days before his desire to see his family. He used to take with him the journey food for the stay and then come back to (his wife) Khadija to take his food likewise again till suddenly the Truth descended upon him while he was in the cave of Hira. The angel came to him and asked him to read. The Prophet (ï·º) replied, \"I do not know how to read.\" The Prophet (ï·º) added, \"The angel caught me (forcefully) and pressed me so hard that I could not bear it any more. He then released me and again asked me to read and I replied, 'I do not know how to read.' Thereupon he caught me again and pressed me a second time till I could not bear it any more. He then released me and again asked me to read but again I replied, 'I do not know how to read (or what shall I read)?' Thereupon he caught me for the third time and pressed me, and then released me and said, 'Read in the name of your Lord, who has created (all that exists), created man from a clot. Read! And your Lord is the Most Generous.\" (96.1, 96.2, 96.3) Then Allah's Messenger (ï·º) returned with the Inspiration and with his heart beating severely. Then he went to Khadija bint Khuwailid and said, \"Cover me! Cover me!\" They covered him till his fear was over and after that he told her everything that had happened and said, \"I fear that something may happen to me.\" Khadija replied, \"Never! By Allah, Allah will never disgrace you. You keep good relations with your kith and kin, help the poor and the destitute, serve your guests generously and assist the deserving calamity-afflicted ones.\" Khadija then accompanied him to her cousin Waraqa bin Naufal bin Asad bin 'Abdul 'Uzza, who, during the pre-Islamic Period became a Christian and used to write the writing with Hebrew letters. He would write from the Gospel in Hebrew as much as Allah wished him to write. He was an old man and had lost his eyesight. Khadija said to Waraqa, \"Listen to the story of your nephew, O my cousin!\" Waraqa asked, \"O my nephew! What have you seen?\" Allah's Messenger (ï·º) described whatever he had seen. Waraqa said, \"This is the same one who keeps the secrets (angel Gabriel) whom Allah had sent to Moses. I wish I were young and could live up to the time when your people would turn you out.\" Allah's Messenger (ï·º) asked, \"Will they drive me out?\" Waraqa replied in the affirmative and said, \"Anyone (man) who came with something similar to what you have brought was treated with hostility; and if I should remain alive till the day when you will be turned out then I would support you strongly.\" But after a few days Waraqa died and the Divine Inspiration was also paused for a while",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

When your excellent conduct sparks curiosity, people will ask about your faith. Being able to explain your practices â€” fasting, prayer, hijab, dietary choices â€” with warmth and confidence turns a casual question into a moment of genuine connection and understanding.


**How?**

Prepare simple, warm explanations for the practices people most commonly ask about: "I pray five times a day â€” it is like a reset button that keeps me grounded." "Ramadan is our month of fasting â€” it teaches gratitude and self-discipline." Practise saying these out loud so they feel natural. Welcome questions with a smile rather than treating them as intrusions.` },
        { title: 'Reflect monthly on whether your public conduct would make the Prophet (SAW) proud', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources explicitly establish the Prophet as an excellent pattern and emphasize the perfection of good character, they omit specific modern self-assessment practices like conducting a monthly 15-minute reflection, making the subtask a practical logical inference to systematically evaluate and align one\'s conduct with this prophetic standard.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 33:21",
              arabic: "Ù„ÙŽÙ‘Ù‚ÙŽØ¯Ù’ ÙƒÙŽØ§Ù†ÙŽ Ù„ÙŽÙƒÙÙ…Ù’ ÙÙÙŠ Ø±ÙŽØ³ÙÙˆÙ„Ù Ø§Ù„Ù„ÙŽÙ‘Ù‡Ù Ø£ÙØ³Ù’ÙˆÙŽØ©ÙŒ Ø­ÙŽØ³ÙŽÙ†ÙŽØ©ÙŒ",
              translation: "There has certainly been for you in the Messenger of Allah an excellent pattern.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2553",
              translation: "The Prophet (SAW) said: \"I was sent to perfect good character.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Without regular reflection, even the best intentions fade into routine. Asking whether your conduct would make the Prophet (SAW) proud is the highest standard of self-assessment â€” it keeps your niyyah (intention) aligned and your actions sharp.


**How?**

At the end of each month, set aside 15 minutes for honest reflection. Review your three public-facing contexts: Did you show excellence? How did you handle conflict? Were you generous, patient, and truthful? Write down one thing you did well and one thing to improve. Make dua for consistency and sincerity in your public witness.` },
      ],
    },
    {
      title: 'Establish or join a circle of accountability (muhasaba group) with trusted peers',
      priority: 'low', tags: ['muhasaba', 'community'],
      description: 'Iron sharpens iron. A muhasaba circle is a small group of trusted Muslim peers who meet regularly to hold each other accountable in deen, character, and goals. This practice was modelled by the Sahaba and remains one of the most effective tools for sustained spiritual and personal growth.',
      subtasks: [
        { title: 'Identify 2-4 trusted, like-minded Muslim peers who share your commitment to growth', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources explicitly advise believers to carefully choose their friends and companions based on their religious commitment, they omit specific organizational practices like forming a small mutual accountability (muhasaba) circle of 2-4 peers, making the subtask a practical logical inference to systematically apply this prophetic guidance on companionship.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 2:165",
              arabic: "ÙˆÙŽÙ…ÙÙ†ÙŽ Ø§Ù„Ù†ÙŽÙ‘Ø§Ø³Ù Ù…ÙŽÙ† ÙŠÙŽØªÙŽÙ‘Ø®ÙØ°Ù Ù…ÙÙ† Ø¯ÙÙˆÙ†Ù Ø§Ù„Ù„ÙŽÙ‘Ù‡Ù Ø£ÙŽÙ†Ø¯ÙŽØ§Ø¯Ù‹Ø§ ÙŠÙØ­ÙØ¨ÙÙ‘ÙˆÙ†ÙŽÙ‡ÙÙ…Ù’ ÙƒÙŽØ­ÙØ¨ÙÙ‘ Ø§Ù„Ù„ÙŽÙ‘Ù‡Ù Û– ÙˆÙŽØ§Ù„ÙŽÙ‘Ø°ÙÙŠÙ†ÙŽ Ø¢Ù…ÙŽÙ†ÙÙˆØ§ Ø£ÙŽØ´ÙŽØ¯ÙÙ‘ Ø­ÙØ¨Ù‹Ù‘Ø§ Ù„ÙÙ‘Ù„ÙŽÙ‘Ù‡Ù Û— ÙˆÙŽÙ„ÙŽÙˆÙ’ ÙŠÙŽØ±ÙŽÙ‰ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠÙ†ÙŽ Ø¸ÙŽÙ„ÙŽÙ…ÙÙˆØ§ Ø¥ÙØ°Ù’ ÙŠÙŽØ±ÙŽÙˆÙ’Ù†ÙŽ Ø§Ù„Ù’Ø¹ÙŽØ°ÙŽØ§Ø¨ÙŽ Ø£ÙŽÙ†ÙŽÙ‘ Ø§Ù„Ù’Ù‚ÙÙˆÙŽÙ‘Ø©ÙŽ Ù„ÙÙ„ÙŽÙ‘Ù‡Ù Ø¬ÙŽÙ…ÙÙŠØ¹Ù‹Ø§ ÙˆÙŽØ£ÙŽÙ†ÙŽÙ‘ Ø§Ù„Ù„ÙŽÙ‘Ù‡ÙŽ Ø´ÙŽØ¯ÙÙŠØ¯Ù Ø§Ù„Ù’Ø¹ÙŽØ°ÙŽØ§Ø¨Ù",
              translation: "Even so, there are some who choose to worship others besides God as rivals to Him, loving them with the love due to God, but the believers have greater love for God.",
              relevance: "contextual",
              provenanceTier: "Bayyinah",
              rationale: "those who choose companions based on shared love of Allah â€” not merely comfort or convenience â€” are following the believers' way described here.",
            },
            {
              kind: "hadith",
              ref: "Sunan Abi Dawud 4833",
              translation: "The Prophet (SAW) said: \"A man follows the religion of his friend; so each of you should consider whom he makes his friend.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Hasan Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

The quality of your muhasaba circle determines its effectiveness. You need peers who are serious about their own growth, trustworthy with sensitive information, and willing to both give and receive honest feedback. The wrong group becomes a social gathering; the right group becomes a lifeline.


**How?**

Think of Muslim brothers or sisters who consistently demonstrate commitment to their deen and personal development. They should be people you respect, feel safe with, and who challenge you. Approach them individually, share your vision for a muhasaba circle, and gauge their interest and commitment before forming the group.` },
        { title: 'Propose the concept and agree on a format: weekly or bi-weekly, in person or virtual', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Quranic verse explicitly commands believers to advise one another to truth and patience, it omits specific organizational logistics like agreeing on a weekly or bi-weekly meeting format, making the subtask a practical logical inference to systematically facilitate this mutual exhortation.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 103:1-3",
              arabic: "ÙˆÙŽØ§Ù„Ù’Ø¹ÙŽØµÙ’Ø±Ù Ø¥ÙÙ†ÙŽÙ‘ Ø§Ù„Ù’Ø¥ÙÙ†Ø³ÙŽØ§Ù†ÙŽ Ù„ÙŽÙÙÙŠ Ø®ÙØ³Ù’Ø±Ù Ø¥ÙÙ„ÙŽÙ‘Ø§ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠÙ†ÙŽ Ø¢Ù…ÙŽÙ†ÙÙˆØ§ ÙˆÙŽØ¹ÙŽÙ…ÙÙ„ÙÙˆØ§ Ø§Ù„ØµÙŽÙ‘Ø§Ù„ÙØ­ÙŽØ§ØªÙ ÙˆÙŽØªÙŽÙˆÙŽØ§ØµÙŽÙˆÙ’Ø§ Ø¨ÙØ§Ù„Ù’Ø­ÙŽÙ‚ÙÙ‘ ÙˆÙŽØªÙŽÙˆÙŽØ§ØµÙŽÙˆÙ’Ø§ Ø¨ÙØ§Ù„ØµÙŽÙ‘Ø¨Ù’Ø±Ù",
              translation: "By time, indeed mankind is in loss, except for those who have believed and done righteous deeds and advised each other to truth and advised each other to patience.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Without a clear format agreed upon upfront, groups quickly lose momentum. Defining the logistics â€” frequency, duration, location, and structure â€” before the first session sets expectations and prevents the drift that kills most informal groups within weeks.


**How?**

Draft a simple one-page proposal: purpose of the group, suggested frequency (bi-weekly is often sustainable), duration (60-90 minutes), and whether meetings will be in person, virtual, or a mix. Share it with your potential members and invite feedback. Agree on a format that works for everyone and set the first three meeting dates immediately.` },
        { title: 'Establish ground rules: confidentiality, honesty, no judgement, constructive feedback only', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources establish the overarching principles of Islamic brotherhood and describe a believer as a mirror to his brother, they omit specific organizational practices like establishing ground rules for confidentiality and constructive feedback, making the subtask a practical logical inference to systematically cultivate a safe environment that embodies this prophetic ideal.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 49:10",
              arabic: "Ø¥ÙÙ†ÙŽÙ‘Ù…ÙŽØ§ Ø§Ù„Ù’Ù…ÙØ¤Ù’Ù…ÙÙ†ÙÙˆÙ†ÙŽ Ø¥ÙØ®Ù’ÙˆÙŽØ©ÙŒ",
              translation: "The believers are but brothers.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Jami at-Tirmidhi 1956",
              translation: "The Prophet (SAW) said: \"The believer is a mirror to his brother.\"",
              relevance: "direct",
              provenanceTier: "Qarina",
              hadithGrade: "Hasan",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

Trust is the currency of accountability. Without explicit ground rules, people hold back out of fear of judgement or gossip. Clear agreements on confidentiality and constructive feedback create the psychological safety needed for genuine vulnerability and growth.


**How?**

At your first session, discuss and agree on ground rules together. Essential ones include: everything shared stays in the group; we speak with honesty and compassion; we do not judge or lecture; feedback is constructive and requested, not imposed. Write these down and revisit them if anyone feels they are being violated. The group is only as strong as its trust.` },
        { title: 'Structure each session: check-in on goals, share struggles, make dua for each other', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources explicitly command believers to make room in gatherings and encourage structured learning circles, they omit specific facilitation methods like a three-part session agenda, making the subtask a practical logical inference to systematically allocate equal conversational space and maintain group focus.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 58:11",
              arabic: "ÙŠÙŽØ§ Ø£ÙŽÙŠÙÙ‘Ù‡ÙŽØ§ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠÙ†ÙŽ Ø¢Ù…ÙŽÙ†ÙÙˆØ§ Ø¥ÙØ°ÙŽØ§ Ù‚ÙÙŠÙ„ÙŽ Ù„ÙŽÙƒÙÙ…Ù’ ØªÙŽÙÙŽØ³ÙŽÙ‘Ø­ÙÙˆØ§ ÙÙÙŠ Ø§Ù„Ù’Ù…ÙŽØ¬ÙŽØ§Ù„ÙØ³Ù ÙÙŽØ§ÙÙ’Ø³ÙŽØ­ÙÙˆØ§ ÙŠÙŽÙÙ’Ø³ÙŽØ­Ù Ø§Ù„Ù„ÙŽÙ‘Ù‡Ù Ù„ÙŽÙƒÙÙ…Ù’",
              translation: "O you who have believed, when you are told to make room in gatherings, then make room â€” Allah will make room for you.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih Muslim 2699",
              translation: "The Prophet (SAW) said: \"Whoever treads a path seeking knowledge, Allah will make easy for him a path to Paradise.\" (Encouraging structured learning circles.)",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

A structured session ensures the group stays focused and everyone gets equal time. Without structure, meetings tend to be dominated by one or two voices, or they wander into casual conversation and lose their transformative potential.


**How?**

Use a simple three-part structure: (1) Each member shares a brief update on goals set at the previous session â€” what went well, what did not. (2) Open floor for sharing current struggles, seeking advice, or requesting accountability on a specific area. (3) Close with each member making dua for the person next to them. Keep time so everyone gets equal space.` },
        { title: 'Rotate facilitation so no single person carries the burden of leading every session', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided Hadith establishes the overarching principle of believers acting as one body in mutual mercy and compassion, it omits specific organizational practices like rotating facilitation, making the subtask a practical logical inference to systematically distribute the burden of leading every session and embody this prophetic empathy within a group setting.',
          sources: [
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6011",
              translation: "The Prophet (SAW) said: \"The believers in their mutual mercy, love, and compassion are like one body.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

When one person always leads, they carry a disproportionate burden and the group becomes dependent on them. Rotating facilitation distributes ownership, develops leadership in every member, and ensures the group survives if any one person is unavailable.


**How?**

Assign facilitation on a rotating schedule â€” each member leads one session in turn. The facilitator is responsible for opening the session, keeping time, ensuring everyone speaks, and closing with dua. Create a simple facilitation guide so every member feels confident when their turn comes. Review the rotation quarterly and adjust as needed.` },
        { title: 'Evaluate the group dynamic after 3 months and adjust format as needed', done: false,
          tier: 'T2',
          amanahRationale: 'Although the provided sources explicitly command believers to consult one another and praise consistent deeds, they omit specific modern organizational practices like evaluating a group dynamic after three months, making the subtask a practical logical inference to systematically apply these divine and prophetic principles to maintain group health and longevity.',
          sources: [
            {
              kind: "quran",
              ref: "Quran 3:159",
              arabic: "ÙˆÙŽØ´ÙŽØ§ÙˆÙØ±Ù’Ù‡ÙÙ…Ù’ ÙÙÙŠ Ø§Ù„Ù’Ø£ÙŽÙ…Ù’Ø±Ù",
              translation: "And consult them in the matter.",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              rationale: "Quranic basis cited as evidence for this subtask.",
            },
            {
              kind: "hadith",
              ref: "Sahih al-Bukhari 6464",
              translation: "The Prophet (SAW) said: \"The most beloved deeds to Allah are those done consistently, even if they are small.\"",
              relevance: "direct",
              provenanceTier: "Bayyinah",
              hadithGrade: "Sahih",
              rationale: "Prophetic narration cited as evidence for this subtask.",
            },
          ],
          description: `**Why?**

No format is perfect from the start. A three-month evaluation gives the group enough time to find its rhythm, but catches problems before they become entrenched. Groups that never evaluate stagnate; groups that evaluate and adapt become long-lasting sources of growth.


**How?**

At the three-month mark, dedicate an entire session to evaluation. Ask each member: What is working well? What is not? Are you growing? Do you feel safe? Is the format sustainable? Collect honest feedback, discuss openly, and make concrete changes â€” whether that means adjusting frequency, structure, communication style, or even membership. Then set the next evaluation date.` },
      ],
    },
  ],
};
