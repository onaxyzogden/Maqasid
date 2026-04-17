// Seed tasks for Faith pillar submodules.
// Each submodule has tasks across CORE, GROWTH, and EXCELLENCE boards.
// Tasks are placed in the "To Do" column by default.

export const FAITH_SEED_TASKS = {
  // ── SHAHADA ──
  faith_shahada_core: [
    {
      title: 'Testify there is no God but Allah',
      priority: 'urgent', tags: ['aqidah', 'shahada'],
      description: 'The Shahada \u2014 "Ashhadu an la ilaha illAllah wa ashhadu anna Muhammadan rasulullah" \u2014 is the first pillar of Islam and the gateway into the faith. Renew and deepen your understanding of this testimony, ensuring it is uttered with full knowledge, certainty, sincerity, and love. This is not merely a declaration but a covenant with Allah.',
      subtasks: [
        { title: 'Recite the full Shahada with correct pronunciation and meaning', done: false,
          sources: `**I. Quran**


### Quran (47:19)
**Arabic:** فَاعْلَمْ أَنَّهُ لَا إِلَٰهَ إِلَّا اللَّهُ وَاسْتَغْفِرْ لِذَنبِكَ وَلِلْمُؤْمِنِينَ وَالْمُؤْمِنَاتِ
**Translation:** "So know that there is no deity except Allah and ask forgiveness for your sin and for the believing men and believing women."
*(Contextual: the command to know the Shahada with certainty before proclaiming it.)*

**II. Hadith**


### Sahih Bukhari 8
The Prophet ﷺ said: "Islam is built upon five: Testifying that there is no god but Allah and that Muhammad is the Messenger of Allah, establishing the prayer, giving zakah, performing Hajj to the House, and fasting Ramadan."
*(Grade: Sahih)*

### Sahih Bukhari 5
Narrated Said bin Jubair: Ibn 'Abbas in the explanation of the statement of Allah "Move not your tongue concerning (the Quran) to make haste therewith." (75.16) said "Allah's Messenger (ﷺ) used to bear the revelation with great trouble and used to move his lips (quickly) with the Inspiration." Ibn 'Abbas moved his lips saying, "I am moving my lips in front of you as Allah's Messenger (ﷺ) used to move his." Said moved his lips saying: "I am moving my lips, as I saw Ibn 'Abbas moving his." Ibn 'Abbas added, "So Allah revealed 'Move not your tongue concerning (the Qur'an) to make haste therewith. It is for Us to collect it and to give you (O Muhammad) the ability to recite it (the Quran)' (75.16-17) which means that Allah will make him (the Prophet) remember the portion of the Qur'an which was revealed at that time by heart and recite it. The statement of Allah: 'And when we have recited it to you (O Muhammad through Gabriel) then you follow its (Quran) recital' (75.18) means 'listen to it and be silent.' Then it is for Us (Allah) to make it clear to you' (75.19) means 'Then it is (for Allah) to make you recite it (and its meaning will be clear by itself through your tongue). Afterwards, Allah's Messenger (ﷺ) used to listen to Gabriel whenever he came and after his departure he used to recite it as Gabriel had recited it
*(Grade: Sahih)*`,
          description: `**Why?**

The Shahada must be recited with correct pronunciation and understanding — it is not merely a phrase to repeat, but a binding testimony before Allah. Mispronunciation can alter the meaning, and recitation without comprehension reduces the most powerful statement in Islam to empty words.


**How?**

**1. Phonetic Breakdown & Pronunciation**

The Shahada is split into two testimonies. Focus on the flow and the emphasis on the double consonants (marked with double letters).

**Part 1: The Testimony of Faith**

*Ash-hadu alla ilaha illAllah*

* **Ash-hadu**: (Ash-ha-du) — I bear witness
* **Alla**: (Al-la) — That [there is] no
* **Ilaha**: (I-la-ha) — Deity/God
* **IllAllah**: (Il-lal-lah) — Except Allah

**Part 2: The Testimony of Messengerhood**

*Wa ash-hadu anna Muhammadan Rasoolullah*

* **Wa**: (Wa) — And
* **Anna**: (An-na) — That
* **Muhammadan**: (Mu-ham-ma-dan) — Muhammad
* **Rasoolullah**: (Ra-soo-lul-lah) — is the Messenger of Allah

---

**2. Precise Word-for-Word Translation**

Linguistically, the Shahada isn't just a statement of existence; it is a statement of **exclusive right**.

| Arabic Word | Precise English Meaning | Linguistic Role |
| :---- | :---- | :---- |
| **Ash-hadu** | I bear witness | A formal, binding testimony. |
| **An (La)** | That (No) | Absolute negation of a category. |
| **Ilah** | Object of Worship | Anything served, loved, or obeyed. |
| **Illa** | Except | The turning point from negation to affirmation. |
| **Allah** | The One True God | The only one with the *right* to be worshipped. |
| **Rasool** | Messenger | One who carries a divine message/law. |

---

**3. Practical Tips for "Understanding"**

1. **The Pause:** When you say *"La ilaha,"* mentally "clear" your heart of dependencies on wealth, ego, or people.
2. **The Affirmation:** When you say *"illAllah,"* settle the heart on the fact that only He provides, sustains, and deserves your ultimate devotion.
3. **The Follow-through:** Acknowledging Muhammad (peace be upon him) as the *Rasool* means accepting his sunnah as the practical map for your life.` },
        { title: 'Reflect on what "no god but Allah" demands of your daily life', done: false,
          sources: `**I. Quran**


### Quran (65:3)
**Translation:** "And whoever relies upon Allah — then He is sufficient for him." *(Surah At-Talaq 65:3)*

### Quran (98:5)
**Translation:** "And they were not commanded except to worship Allah, [being] sincere to Him in religion..." *(Surah Al-Bayyinah 98:5)*

**II. Hadith**


### Sahih Bukhari 16
The Prophet ﷺ said: "Whoever possesses the following three qualities will taste the sweetness of faith: 1. That Allah and His Messenger are dearer to him than anything else..."
*(Grade: Sahih)*

### Sahih Bukhari 9
The Prophet ﷺ said: "Faith (Iman) has over sixty branches... and the least of which is removing a harmful object from the road." This shows that the Shahada must manifest in the smallest daily actions.
*(Grade: Sahih)*`,
          description: `**Why?**

La ilaha illAllah is not a passive statement — it is an active negation of every false object of worship and an affirmation that Allah alone deserves your ultimate devotion. This has direct consequences for where you place your hopes, fears, and reliance.


**How?**

1. List three things you tend to rely on most (e.g., salary, reputation, a specific person). For each, ask: "Am I treating this as though it has independent power over my life?"
2. Reflect on your fears — do you fear anyone's displeasure more than Allah's?
3. Journal about how "no god but Allah" reframes one specific decision you are currently facing.
4. You have completed this when you can articulate how Tawhid reshapes at least one priority, one fear, and one hope in your daily life.` },
        { title: 'Study the difference between verbal declaration and lived conviction', done: false,
          sources: `**I. Quran**


### Quran (47:19)
**Arabic:** فَاعْلَمْ أَنَّهُ لَا إِلَٰهَ إِلَّا اللَّهُ وَاسْتَغْفِرْ لِذَنبِكَ وَلِلْمُؤْمِنِينَ وَالْمُؤْمِنَاتِ
**Translation:** So [Prophet], bear in mind that there is no god but God, and ask forgiveness for your sins and for the sins of believing men and women.

**I. Hadith**


### Sahih Muslim 33
The Prophet (SAW) said: "Whoever says La ilaha illAllah and disbelieves in whatever is worshipped besides Allah, his property and blood become inviolable, and his reckoning is with Allah."
*(Grade: Sahih)*`,
          description: `**Why?**

The Shahada is not merely words on the tongue — it must settle in the heart and manifest in action. The munafiqun declared it verbally but lacked inner conviction, and the Quran exposed the emptiness of their claim.


**How?**

1. Read Surah al-Munafiqun (63:1-3) and note how Allah describes their outward declaration versus their inward state.
2. Study the difference between *iqrar bil-lisan* (verbal affirmation), *tasdiq bil-qalb* (heart conviction), and *amal bil-arkan* (action with the limbs).
3. Ask yourself: "Are there areas of my life where my tongue says one thing but my actions say another?"
4. You have completed this when you can explain, with evidence, why the Shahada requires all three dimensions — tongue, heart, and limbs — to be valid.` },
        { title: 'Journal: what does this testimony mean to you personally?', done: false,
          sources: `**I. Quran**


### Quran (47:19)
**Arabic:** فَاعْلَمْ أَنَّهُ لَا إِلَٰهَ إِلَّا اللَّهُ وَاسْتَغْفِرْ لِذَنبِكَ وَلِلْمُؤْمِنِينَ وَالْمُؤْمِنَاتِ  
**Translation:** So know that there is no deity except Allah and ask forgiveness for your sin and for the believing men and believing women.

### Quran (3:18)
**Arabic:** شَهِدَ اللَّهُ أَنَّهُ لَا إِلَٰهَ إِلَّا هُوَ وَالْمَلَائِكَةُ وَأُولُو الْعِلْمِ قَائِمًا بِالْقِسْطِ  
**Translation:** Allah witnesses that there is no deity except Him, and so do the angels and those of knowledge, maintaining justice.

**II. Hadith**


### Sahih Muslim 26
The Prophet (SAW) said: "Whoever says La ilaha illAllah sincerely from his heart shall enter Paradise."
*(Grade: Sahih)*`,
          description: `**Why?**

The Shahada is not abstract theology — it is the core of your identity as a Muslim. Journaling forces you to move beyond rote understanding and confront where your conviction is genuinely strong and where it needs honest growth.


**How?**

1. Set aside 20 minutes in a quiet space. Begin with bismillah and a brief du'a for clarity.
2. Write freely in response to these prompts:
   - "What does it mean to me personally that there is no god but Allah?"
   - "Where in my life do I feel most aligned with this testimony? Where do I feel the gap?"
   - "If I truly lived this declaration, what would change tomorrow?"
3. Be honest — this is between you and Allah, not for anyone else.
4. You have completed this when you have at least one page of genuine reflection that identifies both a strength and a growth area in your conviction.` },
      ],
    },
    {
      title: 'Study the meaning and conditions of La ilaha illAllah',
      priority: 'urgent', tags: ['aqidah'],
      description: 'Deeply understand the testimony of faith \u2014 its linguistic meaning, theological implications, and the conditions scholars have derived from the Quran and Sunnah that make it valid.',
      subtasks: [
        { title: 'Study the linguistic meaning of La ilaha illAllah', done: false,
          sources: `**I. Quran**


### Quran (3:18)
**Arabic:** شَهِدَ اللَّهُ أَنَّهُ لَا إِلَٰهَ إِلَّا هُوَ وَالْمَلَائِكَةُ وَأُولُو الْعِلْمِ قَائِمًا بِالْقِسْطِ  
**Translation:** God bears witness that there is no god but Him, as do the angels and those who have knowledge. He upholds justice.`,
          description: `**Why?**

Understanding the grammar prevents common misconceptions. For example:

* It doesn't just mean "God exists" (which even the pagans of Mecca believed).
* It doesn't just mean "God is the Creator" (which is *Tawhid ar-Rububiyyah*).
* **It specifically means** that nothing has the *right* to be worshipped, sought for ultimate help, or obeyed unconditionally except Allah.


**How?**

**1. The Component Breakdown**

Linguistically, the phrase is composed of four parts that create a "restrictive negation."

* **La (لا):** Known as the *La al-Nafiyah lil-Jins* (The "No" of absolute categorical negation). It denies the existence of the entire category that follows it.
* **Ilah (إله):** A noun derived from the root *alaha*, meaning "to worship." Linguistically, an *ilah* is anything that is taken as an object of ultimate love, reverence, and obedience.
* **Illa (إلا):** A particle of exception ("except").
* **Allah (الله):** The proper name of the Creator.

---

**2. The Two Pillars: Negation & Affirmation**

To study the meaning linguistically is to understand that the sentence cannot function without two distinct actions:

| Pillar | Arabic Term | Meaning |
| :---- | :---- | :---- |
| **Negation** | *Al-Nafy* | **"La ilaha"** – You are clearing the heart of all false gods, idols, and internal desires that act as masters. |
| **Affirmation** | *Al-Ithbat* | **"illAllah"** – You are affirming that the right to be worshipped belongs exclusively to Allah. |

**Note:** Scholarly analysis emphasizes that the hidden predicate (*khabar*) in the sentence is **bi-haqqin** (in truth). Thus, the full linguistic meaning is: *"There is no deity worthy of worship **in truth** except Allah."*` },
        { title: 'Learn what negation (la ilaha) and affirmation (illAllah) entail', done: false,
          sources: `**I. Quran**


### Quran (3:53)
**Arabic:** رَبَّنَا آمَنَّا بِمَا أَنزَلْتَ وَاتَّبَعْنَا الرَّسُولَ فَاكْتُبْنَا مَعَ الشَّاهِدِينَ  
**Translation:** Our Lord! We believe in what You have sent down, and we follow the Messenger [(‘Îsâ (Jesus)]; so write us down among those who bear witness (to the truth i.e. Lâ ilâha illallâh - none has the right to be worshipped but Allâh).

### Quran (22:24)
**Arabic:** وَهُدُوا إِلَى الطَّيِّبِ مِنَ الْقَوْلِ وَهُدُوا إِلَىٰ صِرَاطِ الْحَمِيدِ  
**Translation:** And they are guided (in this world) unto goodly speech (i.e. Lâ ilâha illallâh, Alhamdu lillâh, recitation of the Qur’ân, etc.) and they are guided to the Path of Him (i.e. Allâh’s religion of Islâmic Monotheism), Who is Worthy of all praises.

### Quran (37:35)
**Arabic:** إِنَّهُمْ كَانُوا إِذَا قِيلَ لَهُمْ لَا إِلَٰهَ إِلَّا اللَّهُ يَسْتَكْبِرُونَ  
**Translation:** Truly, when it was said to them: Lâ ilâha illallâh "(none has the right to be worshipped but Allâh)," they puffed themselves up with pride (i.e. denied it).

**II. Hadith**


### Sahih Bukhari 6681
Narrated Al-Musaiyab:When the death of Abu Talib approached, Allah's Messenger (ﷺ) came to him and said, "Say: La ilaha illallah, a word with which I will be able to defend you before Allah
*(Grade: Sahih)*

### Sahih Bukhari 6346
Narrated Ibn \`Abbas:Allah's Messenger (ﷺ) used to say at a time of distress, "La ilaha illal-lahu Rabbul-l-'arsh il-'azim, La ilaha illallahu Rabbu-s-samawati wa Rabbu-l-ard, Rabbu-l-'arsh-il-Karim
*(Grade: Sahih)*

### Sahih Bukhari 7426
Narrated Ibn \`Abbas:The Prophet (ﷺ) used to say at the time of difficulty, 'La ilaha il-lallah Al-\`Alimul-Halim. La-ilaha illallah Rabul- Arsh-al-Azim, La ilaha-il-lallah Rabus-Samawati Rab-ul-Ard; wa Rab-ul-Arsh Al- Karim.' (See Hadith No. 356 and 357, Vol)
*(Grade: Sahih)*`,
          description: `**Why?**

The negation rejects all false deities, superstitions, and objects of ultimate devotion. The affirmation establishes that worship, obedience, love, and fear belong to Allah alone. Without understanding this "clearing and establishing" process, one's testimony remains superficial and fails to protect the heart from subtle forms of shirk.

**How?**

To successfully complete this subtask, you must move beyond a simple translation and internalize the two-pillar mechanism of the Shahada:

1. **The Pillar of Negation (*An-Nafy*):**
   * **Action:** Mentally "clear the shelf."
   * **Focus:** Identify anything that currently competes for your ultimate devotion—be it wealth, ego, social status, or superstitious beliefs.
   * **Grammar:** Understand that the "La" used here is *La al-Nafiyah lil-Jins* (Absolute Negation). It doesn't just say "no God exists," it says "there is no such thing as a deity" that has any right to be worshipped.
2. **The Pillar of Affirmation (*Al-Ithbat*):**
   * **Action:** Re-establish the Creator as the sole authority.
   * **Focus:** Once the "shelf" is clear, affirm that only Allah occupies that space. This means all acts of the heart—unconditional love, total reliance (*Tawakkul*), and absolute fear—are directed toward Him alone.
3. **The Synthesis:**
   * **Practice:** Recite the phrase while pausing slightly after "La ilaha" to symbolize the rejection, then firmly stating "illAllah" to symbolize the commitment.
   * **Verification:** You have completed this task when you can explain why "There is no God but Allah" is a less accurate translation than "There is no deity **rightfully** worshipped except Allah."` },
        { title: 'Understand what it means to worship Allah alone without partners', done: false,
          sources: `**I. Quran**


### Quran (51:56)
**Arabic:** وَمَا خَلَقْتُ الْجِنَّ وَالْإِنسَ إِلَّا لِيَعْبُدُونِ  
**Translation:** I created jinn and mankind only to worship Me.

### Quran (4:36)
**Arabic:** وَاعْبُدُوا اللَّهَ وَلَا تُشْرِكُوا بِهِ شَيْئًا  
**Translation:** Worship God; join nothing with Him.`,
          description: `**Why?**

Worship (*ibadah*) encompasses prayer, du'a, sacrifice, vows, reliance, hope, and fear. None of these may be directed to anything other than Allah. Directing even a single act of worship to another—whether it be a person, an idol, or one's own ego—invalidates the essence of the Shahada and constitutes *Shirk* (associating partners with Allah).

**How?**

To complete this subtask, expand your definition of worship from physical rituals to the actions of the heart and tongue:

1. **Categorize Acts of Worship:**
   * **Physical (*Badaniyah*):** Ensure your prostration (*sujud*), sacrifice (*udhiya*), and circumambulation are for Allah alone.
   * **Verbal (*Qawliyah*):** Recognize that calling upon the deceased or hidden forces for help (*Istigatha*) is a form of worship that belongs only to the Creator.
   * **Internal (*Qalbiyah*):** Audit your "inner compass." Ask yourself: "Do I fear a created being's displeasure more than Allah's?" or "Do I rely on my bank account more than I rely on the Provider?"
2. **Identify "Subtle" Partners:**
   * Reflect on the concept of *Hawa* (desires). Study how following one's whims blindly can become a form of "taking one's desire as a god" (Quran 45:23).
   * Learn the difference between "natural fear" (e.g., fear of a predator) and "secret fear" (fearing that a created being can harm or benefit you independently of Allah's will).
3. **The Test of Sincerity:**
   * You have completed this task when you can list five distinct acts of worship—both internal and external—and verify that they are directed solely to Allah in your daily life.` },
        { title: 'Review Quranic ayat that establish Tawhid (e.g., 112:1-4, 2:255)', done: false,
          sources: `**I. Quran**


### Quran (112:1-4)
**Arabic:** قُلْ هُوَ اللَّهُ أَحَدٌ ﴿١﴾ اللَّهُ الصَّمَدُ ﴿٢﴾ لَمْ يَلِدْ وَلَمْ يُولَدْ ﴿٣﴾ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ ﴿٤﴾  
**Translation:** Say, "He is God the One, God the eternal. He begot no one nor was He begotten. No one is comparable to Him."

### Quran (2:255)
**Arabic:** اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ  
**Translation:** God: there is no god but Him, the Ever Living, the Ever Watchful. Neither slumber nor sleep overtakes Him.`,
          description: `**Why?**

Surah al-Ikhlas (112) defines Allah's oneness and absolute independence, serving as the "litmus test" for monotheism. Ayat al-Kursi (2:255) describes His sovereignty, living nature, and total control over the universe. Reading these with tafsir allows you to move from mere recitation to a deep intellectual and spiritual absorption of His attributes.

**How?**

1. **Analyze Surah al-Ikhlas (The Sincerity/Purity):**
   * **The Concept of *As-Samad*:** Look up the definition of this name in verse 2. Understand it as the One who is "Self-Sufficient" and whom all of creation depends upon, while He depends on no one.
   * **Negating Lineage:** Reflect on verse 3 (*"He neither begets nor is born"*). Understand how this specifically refutes any claims of God having children or parents.
2. **Deconstruct Ayat al-Kursi (The Verse of the Throne):**
   * **Attribute of *Al-Hayy* & *Al-Qayyum*:** Study how these two names establish Allah as Ever-Living and the Sustainer of all existence.
   * **The *Kursi* (Throne):** Visualize the scale of His sovereignty as described in the text — that His throne extends over the heavens and the earth, yet guarding them does not tire Him.
3. **Cross-Reference with Tafsir:**
   * Use a reliable source (like Ibn Kathir or Ma'ariful Quran) to read the background (*Sabab al-Nuzul*) of Surah al-Ikhlas.
   * **Verification:** You have completed this task when you can explain the meaning of "As-Samad" and list three attributes of Allah mentioned in Ayat al-Kursi that demonstrate His absolute power over the universe.` },
      ],
    },
    {
      title: 'Learn the seven conditions of the Shahada (Ilm, Yaqin, Qabul, Inqiyad, Sidq, Ikhlas, Muhabbah)',
      priority: 'high', tags: ['aqidah'],
      description: 'The Shahada is not merely uttered \u2014 it requires seven conditions to be fulfilled for it to benefit the one who declares it. Study each condition with its evidence.',
      subtasks: [
        { title: 'Ilm (Knowledge) \u2014 know what it means', done: false,
          sources: `**I. Quran**


### Quran (47:19)
**Arabic:** فَاعْلَمْ أَنَّهُ لَا إِلَٰهَ إِلَّا اللَّهُ  
**Translation:** So know (Ilm) that there is no deity except Allah.

### Quran (112:1-2)
**Arabic:** قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ  
**Translation:** Say: He is Allah, the One. Allah, the Eternal Refuge.

**II. Hadith**


### Sahih Muslim 8
The Prophet (SAW) said in the hadith of Jibril: "Iman is to believe in Allah, His Angels, His Books, His Messengers, the Last Day, and to believe in qadar, its good and its evil."
*(Grade: Sahih)*`,
          description: `**Why?**

You must know what you are testifying to. Ignorance of the Shahada's meaning invalidates its benefit. Allah commands in Surah Muhammad (47:19): "Know that there is no god but Allah." Knowledge here is not optional — it is a prerequisite for the testimony to carry weight.


**How?**

1. Study the linguistic meaning of "La ilaha illAllah" — what each word means and what the phrase demands.
2. Read Surah Muhammad 47:19 with tafsir to understand why Allah begins with "know" before the declaration.
3. Test yourself: can you explain to someone else what the Shahada means beyond a surface translation?
4. You have completed this when you can articulate the meaning of both halves of the Shahada (negation and affirmation) without referring to notes.` },
        { title: 'Yaqin (Certainty) \u2014 have no doubt', done: false,
          sources: `**I. Quran**


### Quran (102:5)
**Arabic:** كَلَّا لَوْ تَعْلَمُونَ عِلْمَ الْيَقِينِ
**Translation:** "No indeed! If only you knew for certain."

**II. Hadith**


### Sahih Muslim 27
Narrated Abu Huraira: The Messenger of Allah (ﷺ) said: "I bear witness that there is no deity worthy of worship except Allah, and I am the Messenger of Allah — whoever meets Allah with these two (testimonies), having no doubt in them, shall enter Paradise."
*(Grade: Sahih)*`,
          description: `**Why?**

The heart must be free of doubt regarding Allah's oneness. Certainty distinguishes the believer from the hypocrite. Allah describes the true believers in Quran 49:15 as those "who have not doubted" — doubt erodes the foundation of the entire testimony.


**How?**

1. Read Quran 49:15 with tafsir and note the connection between certainty (*yaqin*) and striving in Allah's cause.
2. Identify any doubts or uncertainties you carry — about Allah's existence, His wisdom, or His decree. Write them down honestly.
3. For each doubt, seek knowledge: read a tafsir passage, a hadith, or consult a teacher. Doubt is addressed through learning, not suppression.
4. You have completed this when you can affirm the Shahada with a heart settled in conviction, having confronted and resolved your major areas of uncertainty.` },
        { title: 'Qabul (Acceptance) \u2014 accept all its implications', done: false,
          sources: `**I. Quran**


### Quran (2:85)
**Arabic:** أَفَتُؤْمِنُونَ بِبَعْضِ الْكِتَابِ وَتَكْفُرُونَ بِبَعْضٍ  
**Translation:** So do you believe in part of the Scripture and disbelieve in part?

### Quran (4:65)
**Arabic:** فَلَا وَرَبِّكَ لَا يُؤْمِنُونَ حَتَّىٰ يُحَكِّمُوكَ فِيمَا شَجَرَ بَيْنَهُمْ  
**Translation:** But no, by your Lord, they will not believe until they make you judge concerning that over which they dispute among themselves.

**II. Hadith**


### Sahih Bukhari 7280
The Prophet (SAW) said: "All my Ummah will enter Paradise except those who refuse." They said: "Who would refuse?" He said: "Whoever obeys me enters Paradise, and whoever disobeys me has refused."
*(Grade: Sahih)*`,
          description: `**Why?**

Acceptance means embracing everything the Shahada requires — every ruling, obligation, and prohibition that comes from Allah and His Messenger. Rejecting any part of what Allah legislated while claiming to accept the Shahada is a contradiction that undermines the testimony itself.


**How?**

1. Reflect honestly: are there any commands of Allah that you resist or find difficult to accept (e.g., hijab, inheritance laws, prohibition of riba)?
2. For each area of resistance, study the wisdom behind the ruling from reliable scholarly sources.
3. Distinguish between struggling to implement (which is human) and rejecting the ruling itself (which contradicts acceptance).
4. You have completed this when you can say — even if implementation is a work in progress — "I accept that this is from Allah and it is binding upon me."` },
        { title: 'Inqiyad (Submission) \u2014 act upon it', done: false,
          sources: `**I. Quran**


### Quran (27:31)
**Arabic:** أَلَّا تَعْلُوا عَلَيَّ وَأْتُونِي مُسْلِمِينَ
**Translation:** "Do not put yourselves above me, and come to me in submission to God."

**II. Hadith**


### Sahih Bukhari 7280
The Prophet (ﷺ) said: "All my followers will enter Paradise except those who refuse." They said: "O Messenger of Allah, who would refuse?" He said: "Whoever obeys me will enter Paradise, and whoever disobeys me has refused."
*(Grade: Sahih)*`,
          description: `**Why?**

Knowledge and acceptance must lead to action. Submission (*inqiyad*) is the bridge between knowing the truth and living it. The Shahada demands that you submit to Allah's commands in practice — pray, give zakah, fast, and follow the Sunnah. Without action, the testimony is incomplete.


**How?**

1. Audit your daily practice: are the five pillars established in your life (prayer, zakah, fasting, Hajj if able)?
2. Identify one area where you know what is required but have not yet submitted in action.
3. Create a concrete plan to begin acting on that obligation — start small but start now.
4. You have completed this when you have identified your primary gap between knowledge and action, and taken a measurable first step to close it.` },
        { title: 'Sidq (Truthfulness) \u2014 mean it sincerely', done: false,
          sources: `**I. Quran**


### Quran (9:119)
**Arabic:** يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللَّهَ وَكُونُوا مَعَ الصَّادِقِينَ  
**Translation:** O you who believe, fear Allah and be with those who are truthful.

### Quran (39:33)
**Arabic:** وَالَّذِي جَاءَ بِالصِّدْقِ وَصَدَّقَ بِهِ ۙ أُولَٰئِكَ هُمُ الْمُتَّقُونَ  
**Translation:** And the one who has brought the truth and those who believed in it — those are the righteous.

**II. Hadith**


### Sahih Bukhari 6094
The Prophet (SAW) said: "Truthfulness leads to righteousness, and righteousness leads to Paradise. A man keeps on telling the truth until he becomes a truthful person (siddiq)."
*(Grade: Sahih)*`,
          description: `**Why?**

The Shahada must be said truthfully from the heart, not merely with the tongue. The opposite is the state of the munafiqun (hypocrites) who declared faith outwardly but disbelieved inwardly. Allah exposed their condition throughout Surah al-Munafiqun — their words did not match their hearts.


**How?**

1. Read Surah al-Munafiqun (63:1-4) and reflect on the disconnect between outward profession and inner reality.
2. Ask yourself honestly: "When I say the Shahada, does my heart affirm what my tongue declares?"
3. Identify any areas where you perform Islam outwardly but feel emptiness or contradiction inwardly.
4. You have completed this when you have made a sincere self-assessment and begun addressing any gap between your outward declaration and inner state — even if the journey is ongoing.` },
        { title: 'Ikhlas (Sincerity) \u2014 for Allah alone', done: false,
          sources: `**I. Quran**


### Quran (50:32)
**Arabic:** هَٰذَا مَا تُوعَدُونَ لِكُلِّ أَوَّابٍ حَفِيظٍ
**Translation:** (It will be said): "This is what you were promised - (it is) for those oft-returning (to Allâh) in sincere repentance, and those who preserve their covenant with Allâh (by obeying Him in all what He has ordered, and worshipping none but Allâh Alone, i.e. follow Allâh’s religion - Islâmic Monotheism).

### Quran (40:65)
**Arabic:** هُوَ الْحَيُّ لَا إِلَٰهَ إِلَّا هُوَ فَادْعُوهُ مُخْلِصِينَ لَهُ الدِّينَ ۗ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ
**Translation:** He is the Ever Living, Lâ ilâha illâ Huwa (none has the right to be worshipped but He); so invoke Him making your worship pure for Him Alone (by worshipping Him Alone, and none else, and by doing righteous deeds sincerely for Allâh’s sake only, and not to show off, and not setting up rivals with Him in worship). All the praises and thanks be to Allâh, the Lord of the ‘Âlamîn (mankind, jinn and all that exists).

### Quran (39:14)
**Arabic:** قُلِ اللَّهَ أَعْبُدُ مُخْلِصًا لَّهُ دِينِي
**Translation:** Say, "Allāh [alone] do I worship, sincere to Him in my religion,

**II. Hadith**


### Sahih Bukhari 3
Narrated 'Aisha (the mother of the faithful believers):The commencement of the Divine Inspiration to Allah's Messenger (ﷺ) was in the form of good dreams which came true like bright daylight, and then the love of seclusion was bestowed upon him. He used to go in seclusion in the cave of Hira where he used to worship (Allah alone) continuously for many days before his desire to see his family. He used to take with him the journey food for the stay and then come back to (his wife) Khadija to take his food likewise again till suddenly the Truth descended upon him while he was in the cave of Hira. The angel came to him and asked him to read. The Prophet (ﷺ) replied, "I do not know how to read." The Prophet (ﷺ) added, "The angel caught me (forcefully) and pressed me so hard that I could not bear it any more. He then released me and again asked me to read and I replied, 'I do not know how to read.' Thereupon he caught me again and pressed me a second time till I could not bear it any more. He then released me and again asked me to read but again I replied, 'I do not know how to read (or what shall I read)?' Thereupon he caught me for the third time and pressed me, and then released me and said, 'Read in the name of your Lord, who has created (all that exists), created man from a clot. Read! And your Lord is the Most Generous." (96.1, 96.2, 96.3) Then Allah's Messenger (ﷺ) returned with the Inspiration and with his heart beating severely. Then he went to Khadija bint Khuwailid and said, "Cover me! Cover me!" They covered him till his fear was over and after that he told her everything that had happened and said, "I fear that something may happen to me." Khadija replied, "Never! By Allah, Allah will never disgrace you. You keep good relations with your kith and kin, help the poor and the destitute, serve your guests generously and assist the deserving calamity-afflicted ones." Khadija then accompanied him to her cousin Waraqa bin Naufal bin Asad bin 'Abdul 'Uzza, who, during the pre-Islamic Period became a Christian and used to write the writing with Hebrew letters. He would write from the Gospel in Hebrew as much as Allah wished him to write. He was an old man and had lost his eyesight. Khadija said to Waraqa, "Listen to the story of your nephew, O my cousin!" Waraqa asked, "O my nephew! What have you seen?" Allah's Messenger (ﷺ) described whatever he had seen. Waraqa said, "This is the same one who keeps the secrets (angel Gabriel) whom Allah had sent to Moses. I wish I were young and could live up to the time when your people would turn you out." Allah's Messenger (ﷺ) asked, "Will they drive me out?" Waraqa replied in the affirmative and said, "Anyone (man) who came with something similar to what you have brought was treated with hostility; and if I should remain alive till the day when you will be turned out then I would support you strongly." But after a few days Waraqa died and the Divine Inspiration was also paused for a while
*(Grade: Sahih)*

### Sahih Bukhari 50
Narrated Abu Huraira: One day while the Prophet (ﷺ) was sitting in the company of some people, (The angel) Gabriel came and asked, "What is faith?" Allah's Messenger (ﷺ) replied, 'Faith is to believe in Allah, His angels, (the) meeting with Him, His Apostles, and to believe in Resurrection." Then he further asked, "What is Islam?" Allah's Messenger (ﷺ) replied, "To worship Allah Alone and none else, to offer prayers perfectly to pay the compulsory charity (Zakat) and to observe fasts during the month of Ramadan." Then he further asked, "What is Ihsan (perfection)?" Allah's Messenger (ﷺ) replied, "To worship Allah as if you see Him, and if you cannot achieve this state of devotion then you must consider that He is looking at you." Then he further asked, "When will the Hour be established?" Allah's Messenger (ﷺ) replied, "The answerer has no better knowledge than the questioner. But I will inform you about its portents. 1. When a slave (lady) gives birth to her master. 2. When the shepherds of black camels start boasting and competing with others in the construction of higher buildings. And the Hour is one of five things which nobody knows except Allah. The Prophet (ﷺ) then recited: "Verily, with Allah (Alone) is the knowledge of the Hour--." (31. 34) Then that man (Gabriel) left and the Prophet (ﷺ) asked his companions to call him back, but they could not see him. Then the Prophet (ﷺ) said, "That was Gabriel who came to teach the people their religion." Abu 'Abdullah said: He (the Prophet) considered all that as a part of faith
*(Grade: Sahih)*`,
          description: `**Why?**

The Shahada must be for Allah's sake alone, not for worldly gain, social acceptance, or any motive other than devotion to Him. Sincerity (*ikhlas*) is what gives the testimony its weight before Allah — without it, even outwardly correct worship is hollow.


**How?**

1. Study Surah al-Bayyinah (98:5): "They were not commanded except to worship Allah, sincere to Him in religion."
2. Examine your motives: do you practice Islam to please people, maintain a social image, or out of cultural habit?
3. Learn the du'a for protection from riya (showing off): "Allahumma inni a'udhu bika an ushrika bika shay'an a'lamuhu, wa astaghfiruka lima la a'lamu."
4. You have completed this when you can honestly assess your primary motivation for declaring the Shahada and have taken steps to purify your intention for Allah alone.` },
        { title: 'Muhabbah (Love) \u2014 love Allah and His Messenger above all', done: false,
          sources: `**I. Quran**


### Quran (3:31)
**Arabic:** قُلْ إِن كُنتُمْ تُحِبُّونَ اللَّهَ فَاتَّبِعُونِي يُحْبِبْكُمُ اللَّهُ وَيَغْفِرْ لَكُمْ ذُنُوبَكُمْ ۗ وَاللَّهُ غَفُورٌ رَّحِيمٌ
**Translation:** "Say, 'If you love God, follow me, and God will love you and forgive you your sins; God is most forgiving, most merciful.'"

### Quran (2:165)
**Arabic:** وَمِنَ النَّاسِ مَن يَتَّخِذُ مِن دُونِ اللَّهِ أَندَادًا يُحِبُّونَهُمْ كَحُبِّ اللَّهِ ۖ وَالَّذِينَ آمَنُوا أَشَدُّ حُبًّا لِّلَّهِ
**Translation:** "Even so, there are some who choose to worship others besides God as rivals to Him, loving them with the love due to God, but the believers have greater love for God."

**II. Hadith**


### Sahih Bukhari 15
Narrated Anas: The Prophet (ﷺ) said, "Whoever possesses the following three qualities will have the sweetness of faith: the one to whom Allah and His Messenger become dearer than anything else; who loves a person and loves him only for Allah's sake; and who hates to revert to disbelief as he hates to be thrown into the Fire."
*(Grade: Sahih)*`,
          description: `**Why?**

Love for Allah and His Messenger must surpass love for all else. Allah says in Quran 2:165: "Those who believe are stronger in their love for Allah." This love is not mere sentiment — it drives obedience, sacrifice, and prioritization of what pleases Allah over what pleases the self or others.


**How?**

1. Read Quran 2:165 and 9:24 with tafsir. Note what Allah lists as competing loves (wealth, family, trade) and how faith must surpass them all.
2. Study the hadith: "None of you truly believes until I am more beloved to him than his father, his child, and all of mankind" (Bukhari 15).
3. Reflect: in a moment of conflict between what you desire and what Allah commands, which wins? Identify a recent example.
4. You have completed this when you can describe what it means for love of Allah to be supreme in your life and have identified at least one concrete area where this love needs to grow.` },
      ],
    },
    {
      title: 'Study the six pillars of Iman',
      priority: 'high', tags: ['aqidah'],
      description: 'As described in the Hadith of Jibril, Iman consists of six pillars. Understand each pillar, its evidence, and what it demands of the believer.',
      subtasks: [
        { title: 'Study belief in Allah (al-Iman billah)', done: false,
          sources: `**I. Quran**


### Quran (2:163)
**Arabic:** وَإِلَٰهُكُمْ إِلَٰهٌ وَاحِدٌ ۖ لَّا إِلَٰهَ إِلَّا هُوَ الرَّحْمَٰنُ الرَّحِيمُ
**Translation:** And your god is one God. There is no deity [worthy of worship] except Him, the Most Merciful, the Especially Merciful.

### Quran (2:255)
**Arabic:** اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ
**Translation:** Allah — there is no deity except Him, the Ever-Living, the Self-Sustaining.

### Quran (3:18)
**Arabic:** شَهِدَ اللَّهُ أَنَّهُ لَا إِلَٰهَ إِلَّا هُوَ وَالْمَلَائِكَةُ وَأُولُو الْعِلْمِ قَائِمًا بِالْقِسْطِ ۚ لَا إِلَٰهَ إِلَّا هُوَ الْعَزِيزُ الْحَكِيمُ
**Translation:** Allah bears witness that there is no deity except Him, and [so do] the angels and those of knowledge — upholding justice. There is no deity except Him, the Exalted in Might, the Wise.

**II. Hadith**


### Sahih Muslim 8
It is narrated on the authority of Yahya b. Ya'mur that the first man who discussed qadr (Divine Decree) in Basra was Ma'bad al-Juhani. I along with Humaid b. 'Abdur-Rahman Himyari set out for pilgrimage or for 'Umrah and said:Should it so happen that we come into contact with one of the Companions of the Messenger of Allah (peace be upon him) we shall ask him about what is talked about taqdir (Divine Decree). Accidentally we came across Abdullah ibn Umar ibn al-Khattab, while he was entering the mosque. My companion and I surrounded him. One of us (stood) on his right and the other stood on his left. I expected that my companion would authorize me to speak. I therefore said: Abu Abdur Rahman! There have appeared some people in our land who recite the Qur'an and pursue knowledge. And then after talking about their affairs, added: They (such people) claim that there is no such thing as Divine Decree and events are not predestined. He (Abdullah ibn Umar) said: When you happen to meet such people tell them that I have nothing to do with them and they have nothing to do with me. And verily they are in no way responsible for my (belief). Abdullah ibn Umar swore by Him (the Lord) (and said): If any one of them (who does not believe in the Divine Decree) had with him gold equal to the bulk of (the mountain) Uhud and spent it (in the way of Allah), Allah would not accept it unless he affirmed his faith in Divine Decree. He further said: My father, Umar ibn al-Khattab, told me: One day we were sitting in the company of Allah's Apostle (peace be upon him) when there appeared before us a man dressed in pure white clothes, his hair extraordinarily black. There were no signs of travel on him. None amongst us recognized him. At last he sat with the Apostle (peace be upon him) He knelt before him placed his palms on his thighs and said: Muhammad, inform me about al-Islam. The Messenger of Allah (peace be upon him) said: Al-Islam implies that you testify that there is no god but Allah and that Muhammad is the messenger of Allah, and you establish prayer, pay Zakat, observe the fast of Ramadan, and perform pilgrimage to the (House) if you are solvent enough (to bear the expense of) the journey. He (the inquirer) said: You have told the truth. He (Umar ibn al-Khattab) said: It amazed us that he would put the question and then he would himself verify the truth. He (the inquirer) said: Inform me about Iman (faith). He (the Holy Prophet) replied: That you affirm your faith in Allah, in His angels, in His Books, in His Apostles, in the Day of Judgment, and you affirm your faith in the Divine Decree about good and evil. He (the inquirer) said: You have told the truth. He (the inquirer) again said: Inform me about al-Ihsan (performance of good deeds). He (the Holy Prophet) said: That you worship Allah as if you are seeing Him, for though you don't see Him, He, verily, sees you. He (the enquirer) again said: Inform me about the hour (of the Doom). He (the Holy Prophet) remarked: One who is asked knows no more than the one who is inquiring (about it). He (the inquirer) said: Tell me some of its indications. He (the Holy Prophet) said: That the slave-girl will give birth to her mistress and master, that you will find barefooted, destitute goat-herds vying with one another in the construction of magnificent buildings. He (the narrator, Umar ibn al-Khattab) said: Then he (the inquirer) went on his way but I stayed with him (the Holy Prophet) for a long while. He then, said to me: Umar, do you know who this inquirer was? I replied: Allah and His Apostle knows best. He (the Holy Prophet) remarked: He was Gabriel (the angel). He came to you in order to instruct you in matters of religion
*(Grade: Sahih)*`,
          description: `**Why?**

Belief in Allah is the foundation of all other beliefs. It encompasses four dimensions: His existence, His lordship (*Rububiyyah*), His exclusive right to worship (*Uluhiyyah*), and His names and attributes (*Asma wa Sifat*). A deficiency in any one of these dimensions weakens the entire structure of faith.


**How?**

1. Study each of the four dimensions of belief in Allah and write a one-sentence definition for each.
2. Identify which dimension you understand least — is it His attributes? His right to exclusive worship? Focus your reading there.
3. Read Ayat al-Kursi (2:255) and list the attributes of Allah it mentions.
4. You have completed this when you can explain all four dimensions and give one Quranic evidence for each.` },
        { title: 'Study belief in the Angels (al-Mala\'ikah)', done: false,
          sources: `**I. Quran**


### Quran (16:32)
**Arabic:** الَّذِينَ تَتَوَفَّاهُمُ الْمَلَائِكَةُ طَيِّبِينَ ۙ يَقُولُونَ سَلَامٌ عَلَيْكُمُ ادْخُلُوا الْجَنَّةَ بِمَا كُنتُمْ تَعْمَلُونَ
**Translation:** the ones to whom angels bring death while they are pure (in beliefs and deeds). They (angels) say, “Peace on you! Enter Paradise for the deeds you have been doing.”

### Quran (6:158)
**Arabic:** هَلْ يَنظُرُونَ إِلَّا أَن تَأْتِيَهُمُ الْمَلَائِكَةُ أَوْ يَأْتِيَ رَبُّكَ أَوْ يَأْتِيَ بَعْضُ آيَاتِ رَبِّكَ ۗ يَوْمَ يَأْتِي بَعْضُ آيَاتِ رَبِّكَ لَا يَنفَعُ نَفْسًا إِيمَانُهَا لَمْ تَكُنْ آمَنَتْ مِن قَبْلُ أَوْ كَسَبَتْ فِي إِيمَانِهَا خَيْرًا ۗ قُلِ انتَظِرُوا إِنَّا مُنتَظِرُونَ
**Translation:** Wait they, indeed, for nothing less than that the angels should come unto them, or thy Lord should come, or there should come one of the portents from thy Lord? In the day when one of the portents from thy Lord cometh, its belief availeth naught a soul which theretofore believed not, nor in its belief earned good (by works). Say: Wait ye! Lo! We (too) are waiting.

### Quran (33:43)
**Arabic:** هُوَ الَّذِي يُصَلِّي عَلَيْكُمْ وَمَلَائِكَتُهُ لِيُخْرِجَكُم مِّنَ الظُّلُمَاتِ إِلَى النُّورِ ۚ وَكَانَ بِالْمُؤْمِنِينَ رَحِيمًا
**Translation:** He it is Who sends Salât (His blessings) on you, and His angels too (ask Allâh to bless and forgive you), that He may bring you out from darkness (of disbelief and polytheism) into light (of Belief and Islâmic Monotheism). And He is Ever Most Merciful to the believers.

**II. Hadith**


### Sahih Bukhari 4777
Narrated Abu Huraira:One day while Allah's Messenger (ﷺ) was sitting with the people, a man came to him walking and said, "O Allah's Messenger (ﷺ). What is Belief?" The Prophet (ﷺ) said, "Belief is to believe in Allah, His Angels, His Books, His Apostles, and the meeting with Him, and to believe in the Resurrection." The man asked, "O Allah's Messenger (ﷺ) What is Islam?" The Prophet (ﷺ) replied, "Islam is to worship Allah and not worship anything besides Him, to offer prayers perfectly, to pay the (compulsory) charity (i.e. Zakat) and to fast the month of Ramadan." The man again asked, "O Allah's Messenger (ﷺ) What is Ihsan (i.e. perfection or Benevolence)?" The Prophet (ﷺ) said, "Ihsan is to worship Allah as if you see Him, and if you do not achieve this state of devotion, then (take it for granted that) Allah sees you." The man further asked, "O Allah's Messenger (ﷺ) When will the Hour be established?" The Prophet (ﷺ) replied, "The one who is asked about it does not know more than the questioner does, but I will describe to you its portents. When the lady slave gives birth to her mistress, that will be of its portents; when the bare-footed naked people become the chiefs of the people, that will be of its portents. The Hour is one of five things which nobody knows except Allah. Verily, the knowledge of the Hour is with Allah (alone). He sends down the rain, and knows that which is in the wombs." (31.34) Then the man left. The Prophet (ﷺ) said, "Call him back to me." They went to call him back but could not see him. The Prophet (ﷺ) said, "That was Gabriel who came to teach the people their religion." (See Hadith No. 47 Vol)
*(Grade: Sahih)*`,
          description: `**Why?**

Angels are a pillar of the unseen that Muslims must affirm. They are created from light, obey Allah without fail, and carry out specific duties — Jibril brings revelation, Mika'il manages provisions, and Israfil will blow the trumpet. Denying their existence contradicts clear Quranic texts.


**How?**

1. Read Quran 2:285 and note how belief in angels is listed alongside belief in Allah and His books.
2. Learn the names and roles of at least four major angels: Jibril, Mika'il, Israfil, and the Angel of Death.
3. Study the hadith describing the angels who record your deeds (Kiraman Katibin) and how this awareness should influence your daily behaviour.
4. You have completed this when you can name four angels, their roles, and explain why belief in them is a pillar of Iman.` },
        { title: 'Study belief in the Books (al-Kutub)', done: false,
          sources: `**I. Quran**

### Quran (4:136)
**Arabic:** يَا أَيُّهَا الَّذِينَ آمَنُوا آمِنُوا بِاللَّهِ وَرَسُولِهِ وَالْكِتَابِ الَّذِي نَزَّلَ عَلَىٰ رَسُولِهِ وَالْكِتَابِ الَّذِي أَنزَلَ مِن قَبْلُ ۚ وَمَن يَكْفُرْ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ وَالْيَوْمِ الْآخِرِ فَقَدْ ضَلَّ ضَلَالًا بَعِيدًا  
**Translation:** You who believe, believe in God and His Messenger and in the Scripture He sent down to His Messenger, as well as what He sent down before. Anyone who does not believe in God, His angels, His Scriptures, His messengers, and the Last Day has gone far, far astray.

### Quran (2:285)
**Arabic:** آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَّبِّهِ وَالْمُؤْمِنُونَ ۚ كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِّن رُّسُلِهِ  
**Translation:** The Messenger believes in what has been sent down to him from his Lord, as do the faithful. They all believe in God, His angels, His scriptures, and His messengers. "We make no distinction between any of His messengers."

### Quran (42:15)
**Arabic:** وَقُلْ آمَنتُ بِمَا أَنزَلَ اللَّهُ مِن كِتَابٍ  
**Translation:** Say, "I believe in whatever Scripture God has sent down."

**II. Hadith**

### Sahih Muslim 8a
The Prophet (peace be upon him) said: "Iman is to believe in Allah, His angels, His Books, His Messengers, the Last Day, and to believe in al-Qadr (divine decree), both its good and its evil."
*(Grade: Sahih)*`,
          description: `**Why?**

Allah revealed scriptures to guide humanity throughout history: the Suhuf of Ibrahim, the Tawrat of Musa, the Zabur of Dawud, the Injil of Isa, and the Quran — the final, preserved revelation. Believing in all of them is required, while recognising that the Quran is the only scripture preserved in its original form.


**How?**

1. List the major revealed scriptures and the prophet each was sent to.
2. Study Quran 5:48 to understand how the Quran confirms and supersedes previous scriptures.
3. Learn the distinction: we believe previous scriptures were from Allah, but we follow the Quran because it is the final, unaltered revelation.
4. You have completed this when you can explain why Muslims believe in all scriptures yet follow only the Quran and Sunnah.` },
        { title: 'Study belief in the Messengers (ar-Rusul)', done: false,
          sources: `**I. Quran**


### Quran (2:285)
**Arabic:** آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَّبِّهِ وَالْمُؤْمِنُونَ ۚ كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِّن رُّسُلِهِ
**Translation:** The Messenger believes in what has been sent down to him from his Lord, as do the faithful. They all believe in God, His angels, His scriptures, and His messengers. "We make no distinction between any of His messengers."

### Quran (4:164)
**Arabic:** وَرُسُلًا قَدْ قَصَصْنَاهُمْ عَلَيْكَ مِن قَبْلُ وَرُسُلًا لَّمْ نَقْصُصْهُمْ عَلَيْكَ ۚ وَكَلَّمَ اللَّهُ مُوسَىٰ تَكْلِيمًا
**Translation:** Messengers We have already told you about, and other messengers We have not — and to Moses God spoke directly.

### Quran (33:40)
**Arabic:** مَّا كَانَ مُحَمَّدٌ أَبَا أَحَدٍ مِّن رِّجَالِكُمْ وَلَٰكِن رَّسُولَ اللَّهِ وَخَاتَمَ النَّبِيِّينَ ۗ وَكَانَ اللَّهُ بِكُلِّ شَيْءٍ عَلِيمًا
**Translation:** Muhammad is not the father of any of your men, but he is the Messenger of Allah and the Seal of the Prophets. And Allah has full knowledge of all things.

**II. Hadith**


### Sahih Bukhari 4777
Narrated Abu Huraira: The Prophet (ﷺ) said, "Belief is to believe in Allah, His Angels, His Books, His Apostles, and the meeting with Him, and to believe in the Resurrection."
*(Grade: Sahih)*`,
          description: `**Why?**

Believing in all prophets and messengers from Adam to Muhammad (SAW) is a pillar of faith. They were human, chosen by Allah, truthful, and conveyed His message without alteration. Rejecting any one of them — or elevating them beyond their human station — contradicts correct belief.


**How?**

1. Read Quran 2:285 and 4:164 on the obligation to believe in all messengers without distinction.
2. Learn the names of the 25 prophets mentioned in the Quran.
3. Study the unique role of Muhammad (SAW) as the final messenger and what "Seal of the Prophets" (33:40) means.
4. You have completed this when you can explain why Muslims must believe in all prophets, why we do not distinguish between them in belief, and what makes Muhammad (SAW) the final messenger.` },
        { title: 'Study belief in the Last Day (al-Yawm al-Akhir)', done: false,
          sources: `**I. Quran**


### Quran (30:56)
**Arabic:** وَقَالَ الَّذِينَ أُوتُوا الْعِلْمَ وَالْإِيمَانَ لَقَدْ لَبِثْتُمْ فِي كِتَابِ اللَّهِ إِلَىٰ يَوْمِ الْبَعْثِ ۖ فَهَٰذَا يَوْمُ الْبَعْثِ وَلَٰكِنَّكُمْ كُنتُمْ لَا تَعْلَمُونَ
**Translation:** As for those who were given knowledge and belief, they will say, “You remained, according to the destiny written by Allah, up to the Day of Resurrection. So this is the Day of Resurrection, but you had no belief.”

### Quran (99:7)
**Arabic:** فَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ
**Translation:** So whoever does an atom's weight of good will see it.

### Quran (101:4)
**Arabic:** يَوْمَ يَكُونُ النَّاسُ كَالْفَرَاشِ الْمَبْثُوثِ
**Translation:** It is a Day when mankind will be like scattered moths.

**II. Hadith**


### Sahih Muslim 8
The Prophet (ﷺ) said: "Iman is to believe in Allah, His angels, His Books, His Messengers, and the Last Day, and to believe in the divine decree, both its good and its evil."
*(Grade: Sahih)*`,
          description: `**Why?**

Belief in the Last Day gives life its urgency and accountability. It encompasses death, the grave (*barzakh*), resurrection, the gathering, the scales (*mizan*), the bridge (*sirat*), and the final abodes of paradise and hellfire. Without this belief, there is no framework for divine justice.


**How?**

1. Study the major events of the Last Day in sequence: death, grave trial, resurrection, gathering, reckoning, scales, bridge, and final abode.
2. Read Surah al-Qari'ah (101) and Surah al-Zalzalah (99) — both are short and vivid descriptions of that Day.
3. Reflect on how belief in the Last Day should influence one specific decision you make this week.
4. You have completed this when you can describe the major stages from death to the final abode and explain how this belief shapes moral accountability.` },
        { title: 'Study belief in Qadar \u2014 Divine Decree (al-Qadr)', done: false,
          sources: `**I. Quran**


### Quran (54:49)
**Arabic:** إِنَّا كُلَّ شَيْءٍ خَلَقْنَاهُ بِقَدَرٍ
**Translation:** Verily, We have created all things with Qadar (Divine Preordainments of all things before their creation as written in the Book of Decrees Al-Lauh Al-Mahfûz).

### Quran (64:11)
**Arabic:** مَا أَصَابَ مِن مُّصِيبَةٍ إِلَّا بِإِذْنِ اللَّهِ ۗ وَمَن يُؤْمِن بِاللَّهِ يَهْدِ قَلْبَهُ ۚ وَاللَّهُ بِكُلِّ شَيْءٍ عَلِيمٌ
**Translation:** No calamity befalls, but by the Leave [i.e. Decision and Qadar (Divine Preordainments)] of Allâh, and whosoever believes in Allâh, He guides his heart [to the true Faith with certainty, i.e. what has befallen him was already written for him by Allâh from the Qadar (Divine Preordainments)]. And Allâh is the All-Knower of everything.

**II. Hadith**


### Sahih Muslim 93
It is narrated on the authority of Yahya b. Ya'mur that the first man who discussed qadr (Divine Decree) in Basra was Ma'bad al-Juhani. I along with Humaid b. 'Abdur-Rahman Himyari set out for pilgrimage or for 'Umrah and said:Should it so happen that we come into contact with one of the Companions of the Messenger of Allah (peace be upon him) we shall ask him about what is talked about taqdir (Divine Decree). Accidentally we came across Abdullah ibn Umar ibn al-Khattab, while he was entering the mosque. My companion and I surrounded him. One of us (stood) on his right and the other stood on his left. I expected that my companion would authorize me to speak. I therefore said: Abu Abdur Rahman! There have appeared some people in our land who recite the Qur'an and pursue knowledge. And then after talking about their affairs, added: They (such people) claim that there is no such thing as Divine Decree and events are not predestined. He (Abdullah ibn Umar) said: When you happen to meet such people tell them that I have nothing to do with them and they have nothing to do with me. And verily they are in no way responsible for my (belief). Abdullah ibn Umar swore by Him (the Lord) (and said): If any one of them (who does not believe in the Divine Decree) had with him gold equal to the bulk of (the mountain) Uhud and spent it (in the way of Allah), Allah would not accept it unless he affirmed his faith in Divine Decree. He further said: My father, Umar ibn al-Khattab, told me: One day we were sitting in the company of Allah's Apostle (peace be upon him) when there appeared before us a man dressed in pure white clothes, his hair extraordinarily black. There were no signs of travel on him. None amongst us recognized him. At last he sat with the Apostle (peace be upon him) He knelt before him placed his palms on his thighs and said: Muhammad, inform me about al-Islam. The Messenger of Allah (peace be upon him) said: Al-Islam implies that you testify that there is no god but Allah and that Muhammad is the messenger of Allah, and you establish prayer, pay Zakat, observe the fast of Ramadan, and perform pilgrimage to the (House) if you are solvent enough (to bear the expense of) the journey. He (the inquirer) said: You have told the truth. He (Umar ibn al-Khattab) said: It amazed us that he would put the question and then he would himself verify the truth. He (the inquirer) said: Inform me about Iman (faith). He (the Holy Prophet) replied: That you affirm your faith in Allah, in His angels, in His Books, in His Apostles, in the Day of Judgment, and you affirm your faith in the Divine Decree about good and evil. He (the inquirer) said: You have told the truth. He (the inquirer) again said: Inform me about al-Ihsan (performance of good deeds). He (the Holy Prophet) said: That you worship Allah as if you are seeing Him, for though you don't see Him, He, verily, sees you. He (the enquirer) again said: Inform me about the hour (of the Doom). He (the Holy Prophet) remarked: One who is asked knows no more than the one who is inquiring (about it). He (the inquirer) said: Tell me some of its indications. He (the Holy Prophet) said: That the slave-girl will give birth to her mistress and master, that you will find barefooted, destitute goat-herds vying with one another in the construction of magnificent buildings. He (the narrator, Umar ibn al-Khattab) said: Then he (the inquirer) went on his way but I stayed with him (the Holy Prophet) for a long while. He then, said to me: Umar, do you know who this inquirer was? I replied: Allah and His Apostle knows best. He (the Holy Prophet) remarked: He was Gabriel (the angel). He came to you in order to instruct you in matters of religion
*(Grade: Sahih)*

### Sahih Muslim 99
It is narrated on the authority of Abu Huraira that the Messenger of Allah (ﷺ) said:Ask me (about religious matters), but they (the Companions) were in awe of asking him. Then came a man, and sat near his knees and said: O Messenger of Allah, what is al-Islam? So he (the Holy Prophet) replied: [That] you do not associate anything with Allah, and establish the prayer, pay the alms (Zakat) and fast Ramadan. He said: You (have) told the truth. He said: Messenger of Allah, what is al-Iman (Faith)? He said: That you affirm your faith in Allah, His angels, His Books, His meeting, His Apostles, and that you believe in Resurrection and that you believe in Qadr (Divine Decree) in all its entirety. He (the inquirer) said: You have told the truth. He said: Messenger of Allah, what is al-Ihsan? Upon this he said: that you fear Allah as if you are seeing Him, and though you see Him not, verily He is seeing you. He (the inquirer) said: You (have) told the truth. He (the inquirer) said: When will the Hour (of Doom) occur? He said: The one who is being asked about it is no better informed than the inquirer and I will narrate some of its signs to you. When you see a [slave] woman giving birth to her master - then that is [one] of its signs. And when you see barefooted, naked, deaf and dumb (ignorant and foolish persons) as the rulers of the earth - then that is [one] of its signs. And when you see the shepherds of black (camels) exult in buildings - then that is [one] of its signs. The (Hour) is one of the five things of the unseen. No one knows them except Allah. Then (the Holy Prophet) recited (the folowing verse):" Verily Allah! with Him alone is the knowledge of the Hour and He it is Who sends down the rain and knows that which is in the wombs. And no soul knows what it shall earn on the morrow and a soul knows not in what land it shall die. Verily Allah is Knowing, Aware." He (Abu Huraira) said: Then the person stood up (and made his way). Then the Messenger of Allah (ﷺ) said: Bring him back to me. He was searched for, but they could not find him. The Messenger of Allah (ﷺ) thereupon said: He was Gabriel and he wanted to teach you when you did not ask
*(Grade: Sahih)*`,
          description: `**Why?**

Belief in divine decree (*qadar*) means affirming that Allah's knowledge encompasses everything, He wrote it all in al-Lawh al-Mahfuz, He wills everything that happens, and He creates all things. Good and bad are both from His decree. This belief is the anchor of patience in hardship and gratitude in ease.


**How?**

1. Study the four levels of qadar: Allah's knowledge, His writing, His will, and His creation of all things.
2. Read the hadith of Jibril's question about Iman and note that belief in qadar is the sixth and final article.
3. Reflect on a personal hardship: can you see it through the lens of qadar — that it was known, written, willed, and created by Allah for a wisdom you may not yet understand?
4. You have completed this when you can explain the four levels of qadar and describe how this belief should influence your response to both blessings and trials.` },
      ],
    },
    {
      title: 'Identify and eliminate any practices that contradict Tawhid',
      priority: 'urgent', tags: ['aqidah', 'tawhid'],
      description: 'Conduct a personal audit to identify anything in your life that may compromise the purity of Tawhid \u2014 from superstitions to seeking barakah from objects or graves.',
      subtasks: [
        { title: 'List any superstitious beliefs or practices you hold', done: false,
          sources: `**I. Quran**


### Quran (4:36)
**Arabic:** وَاعْبُدُوا اللَّهَ وَلَا تُشْرِكُوا بِهِ شَيْئًا  
**Translation:** Worship Allah and associate nothing with Him.

### Quran (2:255)
**Arabic:** اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ  
**Translation:** Allah - there is no deity except Him, the Ever-Living, the Self-Sustaining.

**II. Hadith**


### Sahih Bukhari 3005
The Prophet (SAW) said: "Ruqyah (incantation), amulets and love-charms are shirk."
*(Grade: Sahih — narrated by Abu Dawud 3883, graded sahih by al-Albani)*`,
          description: `**Why?**

Superstitious beliefs — like "bad luck" from broken mirrors, black cats, or certain numbers — contradict reliance on Allah's decree alone. They attribute power or influence to created things that have no ability to benefit or harm, and this undermines the foundation of Tawhid.


**How?**

1. Write down any superstitions you were raised with or currently hold, even ones that seem harmless.
2. For each one, ask: "Does this belief attribute power to something other than Allah?"
3. Study the hadith: "There is no tiyarah (superstitious belief in bird omens)" (Bukhari 5776) and understand the broader principle.
4. You have completed this when you have an honest list and can distinguish between legitimate caution and superstitious attribution of power to created things.` },
        { title: 'Identify any reliance on amulets, charms, or talismans', done: false,
          sources: `**I. Quran**


### Quran (4:48)
**Arabic:** إِنَّ اللَّهَ لَا يَغْفِرُ أَن يُشْرَكَ بِهِ وَيَغْفِرُ مَا دُونَ ذَٰلِكَ لِمَن يَشَاءُ  
**Translation:** Indeed, Allah does not forgive association with Him, but He forgives what is less than that for whom He wills.

### Quran (6:162-163)
**Arabic:** قُلْ إِنَّ صَلَاتِي وَنُسُكِي وَمَحْيَايَ وَمَمَاتِي لِلَّهِ رَبِّ الْعَالَمِينَ ۝ لَا شَرِيكَ لَهُ  
**Translation:** Say: Indeed, my prayer, my rites of sacrifice, my living and my dying are for Allah, Lord of the worlds. No partner has He.

**II. Hadith**


### Musnad Ahmad 17422
The Prophet (SAW) said: "Whoever wears an amulet has committed shirk."
*(Grade: Sahih — graded sahih by al-Albani)*`,
          description: `**Why?**

Wearing items believed to bring protection or luck — such as evil eye bracelets, strings, or stones — can constitute minor or major shirk depending on the belief attached. If you believe the object itself has power, this is major shirk. If you believe it is merely a "cause," it is still prohibited as minor shirk.


**How?**

1. Physically check: are you wearing or keeping any items you believe bring protection or luck?
2. Study the hadith: "Whoever wears an amulet has committed shirk" (Ahmad 17440).
3. Replace any reliance on objects with the prescribed Quranic and prophetic protections: the morning/evening adhkar, Ayat al-Kursi, and the three Quls.
4. You have completed this when you have removed any such items and replaced them with authentic means of seeking Allah's protection.` },
        { title: 'Check for habits of swearing by other than Allah', done: false,
          sources: `**I. Quran**


### Quran (22:40)
**Arabic:** الَّذِينَ أُخْرِجُوا مِن دِيَارِهِم بِغَيْرِ حَقٍّ إِلَّا أَن يَقُولُوا رَبُّنَا اللَّهُ ۗ وَلَوْلَا دَفْعُ اللَّهِ النَّاسَ بَعْضَهُم بِبَعْضٍ لَّهُدِّمَتْ صَوَامِعُ وَبِيَعٌ وَصَلَوَاتٌ وَمَسَاجِدُ يُذْكَرُ فِيهَا اسْمُ اللَّهِ كَثِيرًا ۗ وَلَيَنصُرَنَّ اللَّهُ مَن يَنصُرُهُ ۗ إِنَّ اللَّهَ لَقَوِيٌّ عَزِيزٌ
**Translation:** [They are] those who have been evicted from their homes without right - only because they say, "Our Lord is Allāh." And were it not that Allāh checks the people, some by means of others, there would have been demolished monasteries, churches, synagogues, and mosques in which the name of Allāh is much mentioned [i.e., praised]. And Allāh will surely support those who support Him [i.e., His cause]. Indeed, Allāh is Powerful and Exalted in Might.

**II. Hadith**


### Sahih Bukhari 2705
Narrated Aisha:Once Allah's Messenger (ﷺ) heard the loud voices of some opponents quarreling at the door. One of them was appealing to the other to deduct his debt and asking him to be lenient but the other was saying, "By Allah I will not do so." Allah's Messenger (ﷺ) went out to them and said, "Who is the one who was swearing by Allah that he would not do a favor?" That man said, "I am that person, O Allah's Messenger (ﷺ)! I will give my opponent whatever he wishes
*(Grade: Sahih)*`,
          description: `**Why?**

The Prophet (SAW) said: "Whoever swears by other than Allah has committed shirk" (Ahmad, Tirmidhi). Swearing by something elevates it to a position of reverence that belongs to Allah alone. Many people habitually swear by their life, parents, or honour without realising the gravity of this act.


**How?**

1. Monitor your speech for one week: note every time you swear by something other than Allah (e.g., "I swear on my mother's life").
2. Each time you catch yourself, immediately correct it by saying "wallahi" or rephrasing.
3. Study the hadith in full context (Ahmad, Tirmidhi) and understand why oaths are reserved for Allah alone.
4. You have completed this when you have consciously replaced the habit and can go a full week without swearing by other than Allah.` },
        { title: 'Remove or correct any identified contradictions', done: false,
          sources: `**I. Quran**


### Quran (39:65)
**Arabic:** وَلَقَدْ أُوحِيَ إِلَيْكَ وَإِلَى الَّذِينَ مِن قَبْلِكَ لَئِنْ أَشْرَكْتَ لَيَحْبَطَنَّ عَمَلُكَ وَلَتَكُونَنَّ مِنَ الْخَاسِرِينَ  
**Translation:** It has already been revealed to you [Prophet] and to those before you: "If you ascribe any partner to God, all your work will come to nothing: you will be one of the losers."

### Quran (4:48)
**Arabic:** إِنَّ اللَّهَ لَا يَغْفِرُ أَن يُشْرَكَ بِهِ وَيَغْفِرُ مَا دُونَ ذَٰلِكَ لِمَن يَشَاءُ  
**Translation:** God does not forgive the joining of partners with Him: anything less than that He forgives to whoever He will.`,
          description: `**Why?**

Identifying contradictions to Tawhid is only the first step — removing them is what completes the process. Each uncorrected practice is a crack in the foundation of your testimony. Taking practical steps to remove these contradictions is an act of worship in itself.


**How?**

1. Review the list of contradictions you identified in the previous subtasks.
2. For each item, take a concrete corrective action: physically remove amulets, verbally commit to stopping superstitious practices, and consciously correct your oaths.
3. Replace each removed practice with a sunnah alternative (e.g., replace an amulet with morning adhkar; replace superstitious avoidance with tawakkul).
4. You have completed this when every identified contradiction has been addressed with a specific action and you have renewed your reliance on Allah alone.` },
      ],
    },
    {
      title: 'Memorise the hadith of Jibril (Sahih Muslim 8) on Islam, Iman, and Ihsan',
      priority: 'medium', tags: ['hadith', 'aqidah'],
      description: 'This hadith is considered Umm al-Sunnah \u2014 the mother of the Sunnah. It defines Islam, Iman, and Ihsan in a single narration. Memorise it and understand its layers.',
      subtasks: [
        { title: 'Read the full hadith text in Arabic and English', done: false,
          sources: `**I. Quran**


### Quran (41:44)
**Arabic:** وَلَوْ جَعَلْنَاهُ قُرْآنًا أَعْجَمِيًّا لَّقَالُوا لَوْلَا فُصِّلَتْ آيَاتُهُ ۖ أَأَعْجَمِيٌّ وَعَرَبِيٌّ ۗ قُلْ هُوَ لِلَّذِينَ آمَنُوا هُدًى وَشِفَاءٌ ۖ وَالَّذِينَ لَا يُؤْمِنُونَ فِي آذَانِهِمْ وَقْرٌ وَهُوَ عَلَيْهِمْ عَمًى ۚ أُولَٰئِكَ يُنَادَوْنَ مِن مَّكَانٍ بَعِيدٍ
**Translation:** Had We made it a non-Arabic Qur’ān, they would have said, “Why are its verses not clearly explained? Is it a non-Arabic (book) and an Arab (messenger)?” Say, “For those who believe, it is guidance and cure. As for those who do not believe, there is deafness in their ears, and for them it is blindness. Such people are being called from a distant place.”

**II. Hadith**


### Sahih Bukhari 5191
Narrated Ibn \`Abbas:I had been eager to ask \`Umar bin Al-Khattab about the two ladies from among the wives of the Prophet regarding whom Allah said 'If you two (wives of the Prophet (ﷺ) namely Aisha and Hafsa) turn in repentance to Allah, your hearts are indeed so inclined (to oppose what the Prophet (ﷺ) likes). (66.4) till \`Umar performed the Hajj and I too, performed the Hajj along with him. (On the way) \`Umar went aside to answer the call of nature, and I also went aside along with him carrying a tumbler full of water, and when \`Umar had finished answering the call of nature, I poured water over his hands and he performed the ablution. Then I said to him, "O chief of the Believers! Who were the two ladies from among the wives of the Prophet (ﷺ) regarding whom Allah said: 'If you two (wives of the Prophet) turn in repentance to Allah your hearts are indeed so inclined (to oppose what the Prophet (ﷺ) likes)?" (66.4) He said, "I am astonished at your question, O Ibn \`Abbas. They were \`Aisha and Hafsa." Then \`Umar went on narrating the Hadith and said, "I and an Ansari neighbor of mine from Bani Umaiyya bin Zaid who used to live in \`Awali-al-Medina, used to visit the Prophet (ﷺ) in turn. He used to go one day and I another day. When I went, I would bring him the news of what had happened that day regarding the Divine Inspiration and other things, and when he went, he used to do the same for me. We, the people of Quraish used to have the upper hand over our wives, but when we came to the Ansar, we found that their women had the upper hand over their men, so our women also started learning the ways of the Ansari women. I shouted at my wife and she retorted against me and I disliked that she should answer me back. She said to me, 'Why are you so surprised at my answering you back? By Allah, the wives of the Prophet answer him back and some of them may leave (does not speak to) him throughout the day till the night.' The (talk) scared me and I said to her, 'Whoever has done so will be ruined!' Then I proceeded after dressing myself, and entered upon Hafsa and said to her, 'Does anyone of you keep the Prophet (ﷺ) angry till night?' She said, 'Yes.' I said, 'You are a ruined losing person! Don't you fear that Allah may get angry for the anger of Allah's Messenger (ﷺ) and thus you will be ruined? So do not ask more from the Prophet (ﷺ) and do not answer him back and do not give up talking to him. Ask me whatever you need and do not be tempted to imitate your neighbor (i.e., \`Aisha) in her manners for she is more charming than you and more beloved to the Prophet (ﷺ) ." \`Umar added,"At that time a talk was circulating among us that (the tribe of) Ghassan were preparing their horses to invade us. My Ansari companion, on the day of his turn, went (to the town) and returned to us at night and knocked at my door violently and asked if I was there. I became horrified and came out to him. He said, 'Today a great thing has happened.' I asked, 'What is it? Have (the people of) Ghassan come?' He said, 'No, but (What has happened) is greater and more horrifying than that: Allah's Messenger (ﷺ); has divorced his wives. \`Umar added, "The Prophet (ﷺ) kept away from his wives and I said "Hafsa is a ruined loser.' I had already thought that most probably this (divorce) would happen in the near future. So I dressed myself and offered the morning prayer with the Prophet (ﷺ) and then the Prophet; entered an upper room and stayed there in seclusion. I entered upon Hafsa and saw her weeping. I asked, 'What makes you weep? Did I not warn you about that? Did the Prophet (ﷺ) divorce you all?' She said, 'I do not know. There he is retired alone in the upper room.' I came out and sat near the pulpit and saw a group of people sitting around it and some of them were weeping. I sat with them for a while but could not endure the situation, so I went to the upper room where the Prophet; was and said to a black slave of his, 'Will you get the permission (of the Prophet (ﷺ) ) for \`Umar (to enter)?' The slave went in, talked to the Prophet (ﷺ) about it and then returned saying, 'I have spoken to the Prophet (ﷺ) and mentioned you but he kept quiet.' Then I returned and sat with the group of people sitting near the pulpit. but I could not bear the situation and once again I said to the slave, 'Will you get the permission for \`Umar?' He went in and returned saying, 'I mentioned you to him but he kept quiet.' So I returned again and sat with the group of people sitting near the pulpit, but I could not bear the situation, and so I went to the slave and said, 'Will you get the permission for \`Umar?' He went in and returned to me saying, 'I mentioned you to him but he kept quiet.' When I was leaving, behold! The slave called me, saying, 'The Prophet (ﷺ) has given you permission.' Then I entered upon Allah's Messenger (ﷺ) and saw him Lying on a bed made of stalks of date palm leaves and there was no bedding between it and him. The stalks left marks on his side and he was leaning on a leather pillow stuffed with date-palm fibres. I greeted him and while still standing I said, 'O Allah's Apostle! Have you divorced your wives?' He looked at me and said, 'No.' I said, 'Allah Akbar!' And then, while still standing, I said chatting, 'Will you heed what I say, O Allah's Messenger (ﷺ)? We, the people of Quraish used to have power over our women, but when we arrived at Medina we found that the men (here) were overpowered by their women.' The Prophet (ﷺ) smiled and then I said to him, 'Will you heed what I say, O Allah's Messenger (ﷺ)? I entered upon Hafsa and said to her, "Do not be tempted to imitate your companion (\`Aisha), for she is more charming than you and more beloved to the Prophet.' " The Prophet (ﷺ) smiled for a second time. When I saw him smiling, I sat down. Then I looked around his house, and by Allah, I could not see anything of importance in his house except three hides, so I said, 'O Allah's Messenger (ﷺ)! Invoke Allah to make your followers rich, for the Persians and the Romans have been made prosperous and they have been given (the pleasures of the world), although they do not worship Allah.' Thereupon the Prophet (ﷺ) sat up as he was reclining. and said, 'Are you of such an opinion, O the son of Al-Khattab? These are the people who have received the rewards for their good deeds in this world.' I said, 'O Allah's Messenger (ﷺ)! Ask Allah to forgive me.' Then the Prophet (ﷺ) kept away from his wives for twenty-nine days because of the story which Hafsa had disclosed to \`Aisha. The Prophet (ﷺ) had said, 'I will not enter upon them (my wives) for one month,' because of his anger towards them, when Allah had admonished him. So, when twenty nine days had passed, the Prophet (ﷺ) first entered upon \`Aisha. \`Aisha said to him, 'O Allah's Messenger (ﷺ)! You had sworn that you would not enter upon us for one month, but now only twenty-nine days have passed, for I have been counting them one by one.' The Prophet (ﷺ) said, 'The (present) month is of twenty nine days.' \`Aisha added, 'Then Allah revealed the Verses of the option. (2) And out of all his-wives he asked me first, and I chose him.' Then he gave option to his other wives and they said what \`Aisha had said . " (1) The Prophet, ' had decided to abstain from eating a certain kind of food because of a certain event, so Allah blamed him for doing so. Some of his wives were the cause of him taking that decision, therefore he deserted them for one month. See Qur'an:
*(Grade: Sahih)*`,
          description: `**Why?**

The hadith of Jibril is one of the most comprehensive narrations in Islam — it defines the three levels of the religion (Islam, Iman, Ihsan) in a single sitting. Reading it in full, in both Arabic and English, gives you the foundational text that scholars have built entire curricula around.


**How?**

1. Look up Sahih Muslim hadith #8 (also Sahih Bukhari #50) on sunnah.com or in a printed collection.
2. Read the full narration of Umar (RA) — pay attention to the setting, the stranger's appearance, and how the Prophet (SAW) responded.
3. Read the Arabic text alongside the English to begin familiarising yourself with the key terms.
4. You have completed this when you have read the full hadith in both languages and can describe what happened in the narration from memory.` },
        { title: 'Memorise the Arabic text', done: false,
          sources: `**I. Quran**


### Quran (16:103)
**Arabic:** وَلَقَدْ نَعْلَمُ أَنَّهُمْ يَقُولُونَ إِنَّمَا يُعَلِّمُهُ بَشَرٌ ۗ لِّسَانُ الَّذِي يُلْحِدُونَ إِلَيْهِ أَعْجَمِيٌّ وَهَٰذَا لِسَانٌ عَرَبِيٌّ مُّبِينٌ
**Translation:** “We know very well that they say, ‘There is a man who teaches him.’ The language of the one they refer to is non-Arabic while this is clear Arabic language.”

### Quran (41:44)
**Arabic:** وَلَوْ جَعَلْنَاهُ قُرْآنًا أَعْجَمِيًّا لَّقَالُوا لَوْلَا فُصِّلَتْ آيَاتُهُ ۖ قُلْ هُوَ لِلَّذِينَ آمَنُوا هُدًى وَشِفَاءٌ
**Translation:** “If We had made it a foreign Quran, they would have said, ‘If only its verses were clear!’ Say, ‘It is guidance and healing for those who have faith.’”

**II. Hadith**


### Sahih Bukhari 5027
Narrated ‘Uthman ibn ‘Affan: The Prophet (ﷺ) said, “The best among you (Muslims) are those who learn the Quran and teach it.”
*(Grade: Sahih)*
*(Contextual: memorising the Arabic text of the Hadith of Jibril — a foundational prophetic narration — falls under learning the sacred texts of Islam.)*`,
          description: `**Why?**

Memorising the Arabic text of this hadith embeds the precise prophetic definitions of Islam, Iman, and Ihsan into your memory. These definitions are the framework scholars use to categorise all aspects of the religion — having them memorised gives you a permanent reference point.


**How?**

1. Start with the Iman section, as it directly relates to the six pillars you are studying.
2. Break the Arabic text into short phrases and memorise one phrase per day.
3. Recite what you have memorised to someone else or record yourself to check accuracy.
4. You have completed this when you can recite the definitions of Islam, Iman, and Ihsan from the hadith in Arabic from memory.` },
        { title: 'Islam \u2014 study the 5 pillars: Shahada, Salah, Zakah, Sawm, Hajj', done: false,
          sources: `**I. Quran**


### Quran (27:3)
**Arabic:** الَّذِينَ يُقِيمُونَ الصَّلَاةَ وَيُؤْتُونَ الزَّكَاةَ وَهُم بِالْآخِرَةِ هُمْ يُوقِنُونَ
**Translation:** who establish Salāh and pay Zakāh and who have faith in the Hereafter.

### Quran (31:4)
**Arabic:** الَّذِينَ يُقِيمُونَ الصَّلَاةَ وَيُؤْتُونَ الزَّكَاةَ وَهُم بِالْآخِرَةِ هُمْ يُوقِنُونَ
**Translation:** who are steadfast in Salāh and who pay Zakāh and have faith in the Hereafter.

### Quran (24:56)
**Arabic:** وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ وَأَطِيعُوا الرَّسُولَ لَعَلَّكُمْ تُرْحَمُونَ
**Translation:** Establish Salāh and pay Zakāh and obey the messenger, so that you may be favored with mercy.

**II. Hadith**


### Sahih Bukhari 8
Narrated Ibn 'Umar: Allah's Messenger (ﷺ) said: Islam is based on (the following) five (principles): 1. To testify that none has the right to be worshipped but Allah and Muhammad is Allah's Messenger (ﷺ). 2. To offer the (compulsory congregational) prayers dutifully and perfectly. 3. To pay Zakat (i.e. obligatory charity) . 4. To perform Hajj. (i.e. Pilgrimage to Mecca) 5. To observe fast during the month of Ramadan
*(Grade: Sahih)*

### Sahih Bukhari 45
Narrated 'Umar bin Al-Khattab: Once a Jew said to me, "O the chief of believers! There is a verse in your Holy Book Which is read by all of you (Muslims), and had it been revealed to us, we would have taken that day (on which it was revealed as a day of celebration." 'Umar bin Al-Khattab asked, "Which is that verse?" The Jew replied, "This day I have perfected your religion For you, completed My favor upon you, And have chosen for you Islam as your religion." (5:3) 'Umar replied,"No doubt, we know when and where this verse was revealed to the Prophet. It was Friday and the Prophet (ﷺ) was standing at 'Arafat (i.e. the Day of Hajj)
*(Grade: Sahih)*`,
          description: `**Why?**

In the hadith, the Prophet (SAW) defined Islam as the outward acts of submission — the five pillars. These are the visible, measurable actions that distinguish a Muslim. Reviewing them ensures your external practice matches the internal beliefs you are building.


**How?**

1. List the five pillars as defined in the hadith: Shahada, Salah, Zakah, Sawm, and Hajj.
2. For each pillar, honestly assess: am I fulfilling this? If not, what is the barrier?
3. Identify the pillar you are weakest in and create a plan to strengthen it this month.
4. You have completed this when you can recite the five pillars from the hadith and have assessed your personal standing with each one.` },
        { title: 'Iman \u2014 study the 6 articles: Allah, Angels, Books, Messengers, Last Day, Qadr', done: false,
          sources: `**I. Quran**


### Quran (4:136)
**Arabic:** يَا أَيُّهَا الَّذِينَ آمَنُوا آمِنُوا بِاللَّهِ وَرَسُولِهِ وَالْكِتَابِ الَّذِي نَزَّلَ عَلَىٰ رَسُولِهِ وَالْكِتَابِ الَّذِي أَنزَلَ مِن قَبْلُ ۚ وَمَن يَكْفُرْ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ وَالْيَوْمِ الْآخِرِ فَقَدْ ضَلَّ ضَلَالًا بَعِيدًا
**Translation:** Believers! Believe in Allah and His Messenger and in the Book He has revealed to His Messenger, and in the Book He revealed before. And whoever disbelieves in Allah, in His angels, in His Books, in His Messengers and in the Last Day, has indeed strayed far away.

**II. Hadith**


### Sahih Muslim 97
Abu Huraira reported:One day the Messenger of Allah (ﷺ) appeared before the public so a man came to him and then said: Prophet of Allah, what is Iman? Upon this he (the Holy Prophet) replied: That you affirm your faith in Allah, His angels, His Books, His meeting, His Messengers and that you affirm your faith in the Resurrection hereafter. He said: Messenger of Allah, what is al-Islam? He replied: Al-Islam is that you worship Allah and do not associate anything with Him and you establish obligatory prayer and you pay the obligatory alms (Zakat) and you observe the fast of Ramadan. He said: Messenger of Allah, what is al-Ihsan? He replied: That you worship Allah as if you are seeing Him, and for if you fail to see Him. He said: Messenger of Allah, when is the Hour (of Doom)? He replied: The one who is asked about it is no better informed than the inquirer, however I will narrate some of its signs to you. When the slave-girl will give birth to her master, then that is from its signs. When the naked, barefooted would become the chiefs of the people, then that is from its signs. When the shepherds of the black (camels) would exult themselves in buildings, then that is from its signs. (The Hour is) Among one of the five which no one knows but Allah. Then he recited (the verse): "Verily Allah! with Him alone is the knowledge of the Hour and He it is Who sends down the rain and knows that which is in the wombs. And no soul knows what it shall earn tomorrow, and a soul knows not in what land it shall die. Verily Allah is Knowing, Aware." He (Abu Huraira) said: Then the person turned back and went away. The Messenger of Allah (ﷺ) said: Bring that man back to me. They went to bring him back, but they saw nothing there. Upon this the Messenger of Allah remarked: he was Gabriel, who came to teach the people their religion
*(Grade: Sahih)*

### Sahih Muslim 93
It is narrated on the authority of Yahya b. Ya'mur that the first man who discussed qadr (Divine Decree) in Basra was Ma'bad al-Juhani. I along with Humaid b. 'Abdur-Rahman Himyari set out for pilgrimage or for 'Umrah and said:Should it so happen that we come into contact with one of the Companions of the Messenger of Allah (peace be upon him) we shall ask him about what is talked about taqdir (Divine Decree). Accidentally we came across Abdullah ibn Umar ibn al-Khattab, while he was entering the mosque. My companion and I surrounded him. One of us (stood) on his right and the other stood on his left. I expected that my companion would authorize me to speak. I therefore said: Abu Abdur Rahman! There have appeared some people in our land who recite the Qur'an and pursue knowledge. And then after talking about their affairs, added: They (such people) claim that there is no such thing as Divine Decree and events are not predestined. He (Abdullah ibn Umar) said: When you happen to meet such people tell them that I have nothing to do with them and they have nothing to do with me. And verily they are in no way responsible for my (belief). Abdullah ibn Umar swore by Him (the Lord) (and said): If any one of them (who does not believe in the Divine Decree) had with him gold equal to the bulk of (the mountain) Uhud and spent it (in the way of Allah), Allah would not accept it unless he affirmed his faith in Divine Decree. He further said: My father, Umar ibn al-Khattab, told me: One day we were sitting in the company of Allah's Apostle (peace be upon him) when there appeared before us a man dressed in pure white clothes, his hair extraordinarily black. There were no signs of travel on him. None amongst us recognized him. At last he sat with the Apostle (peace be upon him) He knelt before him placed his palms on his thighs and said: Muhammad, inform me about al-Islam. The Messenger of Allah (peace be upon him) said: Al-Islam implies that you testify that there is no god but Allah and that Muhammad is the messenger of Allah, and you establish prayer, pay Zakat, observe the fast of Ramadan, and perform pilgrimage to the (House) if you are solvent enough (to bear the expense of) the journey. He (the inquirer) said: You have told the truth. He (Umar ibn al-Khattab) said: It amazed us that he would put the question and then he would himself verify the truth. He (the inquirer) said: Inform me about Iman (faith). He (the Holy Prophet) replied: That you affirm your faith in Allah, in His angels, in His Books, in His Apostles, in the Day of Judgment, and you affirm your faith in the Divine Decree about good and evil. He (the inquirer) said: You have told the truth. He (the inquirer) again said: Inform me about al-Ihsan (performance of good deeds). He (the Holy Prophet) said: That you worship Allah as if you are seeing Him, for though you don't see Him, He, verily, sees you. He (the enquirer) again said: Inform me about the hour (of the Doom). He (the Holy Prophet) remarked: One who is asked knows no more than the one who is inquiring (about it). He (the inquirer) said: Tell me some of its indications. He (the Holy Prophet) said: That the slave-girl will give birth to her mistress and master, that you will find barefooted, destitute goat-herds vying with one another in the construction of magnificent buildings. He (the narrator, Umar ibn al-Khattab) said: Then he (the inquirer) went on his way but I stayed with him (the Holy Prophet) for a long while. He then, said to me: Umar, do you know who this inquirer was? I replied: Allah and His Apostle knows best. He (the Holy Prophet) remarked: He was Gabriel (the angel). He came to you in order to instruct you in matters of religion
*(Grade: Sahih)*`,
          description: `**Why?**

Iman in the hadith refers to the inner beliefs of the heart — the six articles that form the creed every Muslim must affirm with conviction. While Islam is the outward dimension, Iman is the inward. Without these beliefs being settled in the heart, outward actions lack their spiritual foundation.


**How?**

1. List the six articles of Iman as defined in the hadith: belief in Allah, His angels, His books, His messengers, the Last Day, and divine decree.
2. For each article, write one sentence explaining what it means to you personally.
3. Identify which article you find most challenging to understand or feel weakest in — prioritise studying that one.
4. You have completed this when you can recite all six articles and explain each in your own words with conviction.` },
        { title: 'Ihsan \u2014 memorise the definition: worship Allah as though you see Him', done: false,
          sources: `**I. Quran**


### Quran (40:60)
**Arabic:** وَقَالَ رَبُّكُمُ ادْعُونِي أَسْتَجِبْ لَكُمْ ۚ إِنَّ الَّذِينَ يَسْتَكْبِرُونَ عَنْ عِبَادَتِي سَيَدْخُلُونَ جَهَنَّمَ دَاخِرِينَ
**Translation:** Your Lord has said, “Call Me, I will respond to you. Definitely those who show arrogance against worshipping Me shall enter Jahannam (Hell) with disgrace.

**II. Hadith**


### Sahih Bukhari 50
Narrated Abu Huraira: One day while the Prophet (ﷺ) was sitting in the company of some people, (The angel) Gabriel came and asked, "What is faith?" Allah's Messenger (ﷺ) replied, 'Faith is to believe in Allah, His angels, (the) meeting with Him, His Apostles, and to believe in Resurrection." Then he further asked, "What is Islam?" Allah's Messenger (ﷺ) replied, "To worship Allah Alone and none else, to offer prayers perfectly to pay the compulsory charity (Zakat) and to observe fasts during the month of Ramadan." Then he further asked, "What is Ihsan (perfection)?" Allah's Messenger (ﷺ) replied, "To worship Allah as if you see Him, and if you cannot achieve this state of devotion then you must consider that He is looking at you." Then he further asked, "When will the Hour be established?" Allah's Messenger (ﷺ) replied, "The answerer has no better knowledge than the questioner. But I will inform you about its portents. 1. When a slave (lady) gives birth to her master. 2. When the shepherds of black camels start boasting and competing with others in the construction of higher buildings. And the Hour is one of five things which nobody knows except Allah. The Prophet (ﷺ) then recited: "Verily, with Allah (Alone) is the knowledge of the Hour--." (31. 34) Then that man (Gabriel) left and the Prophet (ﷺ) asked his companions to call him back, but they could not see him. Then the Prophet (ﷺ) said, "That was Gabriel who came to teach the people their religion." Abu 'Abdullah said: He (the Prophet) considered all that as a part of faith
*(Grade: Sahih)*

### Sahih Muslim 93
It is narrated on the authority of Yahya b. Ya'mur that the first man who discussed qadr (Divine Decree) in Basra was Ma'bad al-Juhani. I along with Humaid b. 'Abdur-Rahman Himyari set out for pilgrimage or for 'Umrah and said:Should it so happen that we come into contact with one of the Companions of the Messenger of Allah (peace be upon him) we shall ask him about what is talked about taqdir (Divine Decree). Accidentally we came across Abdullah ibn Umar ibn al-Khattab, while he was entering the mosque. My companion and I surrounded him. One of us (stood) on his right and the other stood on his left. I expected that my companion would authorize me to speak. I therefore said: Abu Abdur Rahman! There have appeared some people in our land who recite the Qur'an and pursue knowledge. And then after talking about their affairs, added: They (such people) claim that there is no such thing as Divine Decree and events are not predestined. He (Abdullah ibn Umar) said: When you happen to meet such people tell them that I have nothing to do with them and they have nothing to do with me. And verily they are in no way responsible for my (belief). Abdullah ibn Umar swore by Him (the Lord) (and said): If any one of them (who does not believe in the Divine Decree) had with him gold equal to the bulk of (the mountain) Uhud and spent it (in the way of Allah), Allah would not accept it unless he affirmed his faith in Divine Decree. He further said: My father, Umar ibn al-Khattab, told me: One day we were sitting in the company of Allah's Apostle (peace be upon him) when there appeared before us a man dressed in pure white clothes, his hair extraordinarily black. There were no signs of travel on him. None amongst us recognized him. At last he sat with the Apostle (peace be upon him) He knelt before him placed his palms on his thighs and said: Muhammad, inform me about al-Islam. The Messenger of Allah (peace be upon him) said: Al-Islam implies that you testify that there is no god but Allah and that Muhammad is the messenger of Allah, and you establish prayer, pay Zakat, observe the fast of Ramadan, and perform pilgrimage to the (House) if you are solvent enough (to bear the expense of) the journey. He (the inquirer) said: You have told the truth. He (Umar ibn al-Khattab) said: It amazed us that he would put the question and then he would himself verify the truth. He (the inquirer) said: Inform me about Iman (faith). He (the Holy Prophet) replied: That you affirm your faith in Allah, in His angels, in His Books, in His Apostles, in the Day of Judgment, and you affirm your faith in the Divine Decree about good and evil. He (the inquirer) said: You have told the truth. He (the inquirer) again said: Inform me about al-Ihsan (performance of good deeds). He (the Holy Prophet) said: That you worship Allah as if you are seeing Him, for though you don't see Him, He, verily, sees you. He (the enquirer) again said: Inform me about the hour (of the Doom). He (the Holy Prophet) remarked: One who is asked knows no more than the one who is inquiring (about it). He (the inquirer) said: Tell me some of its indications. He (the Holy Prophet) said: That the slave-girl will give birth to her mistress and master, that you will find barefooted, destitute goat-herds vying with one another in the construction of magnificent buildings. He (the narrator, Umar ibn al-Khattab) said: Then he (the inquirer) went on his way but I stayed with him (the Holy Prophet) for a long while. He then, said to me: Umar, do you know who this inquirer was? I replied: Allah and His Apostle knows best. He (the Holy Prophet) remarked: He was Gabriel (the angel). He came to you in order to instruct you in matters of religion
*(Grade: Sahih)*`,
          description: `**Why?**

Ihsan is the highest level of faith — constant God-consciousness. The Prophet (SAW) defined it as: "To worship Allah as though you see Him, and if you cannot see Him, then know that He sees you." This is the summit that Islam and Iman are meant to lead you toward.


**How?**

1. Memorise the definition of Ihsan from the hadith in Arabic and English.
2. During your next prayer, consciously apply this definition: pray as though you see Allah before you.
3. Identify one daily action (e.g., speaking, eating, working) and practice doing it with the awareness that Allah sees you.
4. You have completed this when you have memorised the definition and can describe how Ihsan transforms the quality of worship from mechanical to spiritually present.` },
        { title: 'Study the signs of the Hour mentioned at the end of the hadith', done: false,
          sources: `**I. Quran**


### Quran (43:61)
**Arabic:** وَإِنَّهُ لَعِلْمٌ لِّلسَّاعَةِ فَلَا تَمْتَرُنَّ بِهَا وَاتَّبِعُونِ ۚ هَٰذَا صِرَاطٌ مُّسْتَقِيمٌ
**Translation:** "This [Quran] gives knowledge of the Hour: do not doubt it. Follow Me for this is the right path."

### Quran (50:40)
**Arabic:** وَمِنَ اللَّيْلِ فَسَبِّحْهُ وَأَدْبَارَ السُّجُودِ
**Translation:** "proclaim His praise in the night and at the end of every prayer."

**II. Hadith**


### Sahih Bukhari 3651
Narrated Abu Huraira: The Prophet (ﷺ) said, "The Hour will not be established till the sun rises from the West; and when it rises (from the West) and the people see it, they will all believe. And that is (the time) when no good will it do to a soul to believe then." He also said, "The Hour will not be established till you fight with the Khudh and the Kirman from among the non-Arabs."
*(Grade: Sahih)*`,
          description: `**Why?**

The hadith concludes with the Prophet (SAW) mentioning minor signs of the Day of Judgement. Studying these signs strengthens your awareness of the Last Day — a pillar of Iman — and connects prophetic wisdom to observable realities in our current times.


**How?**

1. Read the final portion of the hadith where the Prophet (SAW) mentions the signs (e.g., "the slave-girl will give birth to her mistress" and "barefoot shepherds competing in building tall structures").
2. Research scholarly explanations of these signs — what do they mean, and have they manifested?
3. Reflect: how does awareness of these signs influence your sense of urgency regarding your faith?
4. You have completed this when you can list the signs mentioned in this hadith and explain at least one scholarly interpretation of each.` },
        { title: 'Reflect: which level describes your current state?', done: false,
          sources: `**I. Quran**


### Quran (51:56)
**Arabic:** وَمَا خَلَقْتُ الْجِنَّ وَالْإِنسَ إِلَّا لِيَعْبُدُونِ  
**Translation:** And I did not create the jinn and mankind except to worship Me.

**II. Hadith**


### Sahih Muslim 8
The Prophet (SAW) was asked by Jibril about Islam, Iman, and Ihsan. He said about Ihsan: "It is to worship Allah as though you see Him, and though you do not see Him, He sees you."
*(Grade: Sahih)*`,
          description: `**Why?**

The hadith of Jibril presents three levels — Islam, Iman, and Ihsan — as a ladder of spiritual growth. Honest self-assessment against these levels reveals where you stand and where your growth edge lies. Without this clarity, effort is scattered rather than targeted.


**How?**

1. Review the definitions of Islam (outward actions), Iman (inner beliefs), and Ihsan (God-consciousness).
2. Ask yourself: "Am I consistent in my outward actions (Islam)? Are my beliefs settled and free of doubt (Iman)? Do I worship with awareness that Allah sees me (Ihsan)?"
3. Write a brief honest assessment identifying which level best describes your current state.
4. You have completed this when you have identified your primary level and written down one specific goal to move toward the next.` },
      ],
    },
  ],
  faith_shahada_growth: [
    {
      title: 'Read a foundational aqidah text (e.g., Al-Aqidah al-Tahawiyyah)',
      priority: 'high', tags: ['study', 'aqidah'],
      description: 'Engage with a classical creed text to build a systematic understanding of Islamic theology as understood by the early generations.',
      subtasks: [
        { title: 'Obtain a reliable translation with commentary', done: false,
          sources: `**I. Quran**


### Quran (16:60)
**Arabic:** وَلِلَّهِ الْمَثَلُ الْأَعْلَىٰ ۚ وَهُوَ الْعَزِيزُ الْحَكِيمُ
**Translation:** "Allah's is the highest example. He is the Almighty, the All Wise."
*(Contextual: studying aqidah is studying the highest reality — Allah's attributes — and requires scholarly commentary to understand them correctly.)*

**II. Hadith**


### Sahih Bukhari 7280
The Prophet (SAW) said: "All my followers will enter Paradise except those who refuse." They asked, "O Messenger of Allah, who would refuse?" He said: "Whoever obeys me will enter Paradise, and whoever disobeys me has refused."
*(Grade: Sahih)*`,
          description: `**Why?**

A creed text without commentary can be dense and easily misunderstood. Scholarly commentary connects each point to its Quranic and hadith evidence and explains the historical context of theological disputes — giving you depth, not just definitions.


**How?**

1. Search for "Al-Aqidah al-Tahawiyyah" with the commentary of Ibn Abi al-Izz (available in English translation).
2. Alternatively, look for a contemporary edition with footnotes, such as translations by Hamza Yusuf or IB Uthaymin's explanations.
3. Obtain a physical or digital copy that you can annotate as you read.
4. You have completed this when you have a reliable, annotated edition in hand and are ready to begin reading.` },
        { title: 'Read the section on the attributes of Allah', done: false,
          sources: `**I. Hadith**


### Sahih Bukhari 3
Narrated 'Aisha (the mother of the faithful believers):The commencement of the Divine Inspiration to Allah's Messenger (ﷺ) was in the form of good dreams which came true like bright daylight, and then the love of seclusion was bestowed upon him. He used to go in seclusion in the cave of Hira where he used to worship (Allah alone) continuously for many days before his desire to see his family. He used to take with him the journey food for the stay and then come back to (his wife) Khadija to take his food likewise again till suddenly the Truth descended upon him while he was in the cave of Hira. The angel came to him and asked him to read. The Prophet (ﷺ) replied, "I do not know how to read." The Prophet (ﷺ) added, "The angel caught me (forcefully) and pressed me so hard that I could not bear it any more. He then released me and again asked me to read and I replied, 'I do not know how to read.' Thereupon he caught me again and pressed me a second time till I could not bear it any more. He then released me and again asked me to read but again I replied, 'I do not know how to read (or what shall I read)?' Thereupon he caught me for the third time and pressed me, and then released me and said, 'Read in the name of your Lord, who has created (all that exists), created man from a clot. Read! And your Lord is the Most Generous." (96.1, 96.2, 96.3) Then Allah's Messenger (ﷺ) returned with the Inspiration and with his heart beating severely. Then he went to Khadija bint Khuwailid and said, "Cover me! Cover me!" They covered him till his fear was over and after that he told her everything that had happened and said, "I fear that something may happen to me." Khadija replied, "Never! By Allah, Allah will never disgrace you. You keep good relations with your kith and kin, help the poor and the destitute, serve your guests generously and assist the deserving calamity-afflicted ones." Khadija then accompanied him to her cousin Waraqa bin Naufal bin Asad bin 'Abdul 'Uzza, who, during the pre-Islamic Period became a Christian and used to write the writing with Hebrew letters. He would write from the Gospel in Hebrew as much as Allah wished him to write. He was an old man and had lost his eyesight. Khadija said to Waraqa, "Listen to the story of your nephew, O my cousin!" Waraqa asked, "O my nephew! What have you seen?" Allah's Messenger (ﷺ) described whatever he had seen. Waraqa said, "This is the same one who keeps the secrets (angel Gabriel) whom Allah had sent to Moses. I wish I were young and could live up to the time when your people would turn you out." Allah's Messenger (ﷺ) asked, "Will they drive me out?" Waraqa replied in the affirmative and said, "Anyone (man) who came with something similar to what you have brought was treated with hostility; and if I should remain alive till the day when you will be turned out then I would support you strongly." But after a few days Waraqa died and the Divine Inspiration was also paused for a while
*(Grade: Sahih)*

### Sahih Bukhari 6
Narrated Ibn 'Abbas: Allah's Messenger (ﷺ) was the most generous of all the people, and he used to reach the peak in generosity in the month of Ramadan when Gabriel met him. Gabriel used to meet him every night of Ramadan to teach him the Qur'an. Allah's Messenger (ﷺ) was the most generous person, even more generous than the strong uncontrollable wind (in readiness and haste to do charitable deeds)
*(Grade: Sahih)*`,
          description: `**Why?**

The attributes of Allah are among the most debated topics in Islamic theology. Ahl al-Sunnah affirm them without distortion (*tahrif*), denial (*ta'til*), asking "how" (*takyif*), or likening to creation (*tamthil*). Understanding this methodology protects you from both extremes: denying what Allah affirmed and imagining Him in human terms.


**How?**

1. Read the section in your chosen text that discusses Allah's attributes (e.g., His hand, His face, His descending).
2. Study the four prohibited approaches: tahrif, ta'til, takyif, and tamthil. Write a one-line definition of each.
3. Practice applying the methodology: when you encounter an attribute like "Allah's hand" in the Quran, affirm it as real without imagining a form.
4. You have completed this when you can explain the Ahl al-Sunnah approach to divine attributes and identify at least one common deviation from it.` },
        { title: 'Read the section on prophethood and revelation', done: false,
          sources: `**I. Quran**


### Quran (29:27)
**Arabic:** وَوَهَبْنَا لَهُ إِسْحَاقَ وَيَعْقُوبَ وَجَعَلْنَا فِي ذُرِّيَّتِهِ النُّبُوَّةَ وَالْكِتَابَ وَآتَيْنَاهُ أَجْرَهُ فِي الدُّنْيَا
**Translation:** "We gave Isaac and Jacob to Abraham, and placed prophethood and Scripture among his offspring. We gave him his rewards in this world; and in the life to come he will be among the righteous."

### Quran (57:26)
**Arabic:** وَلَقَدْ أَرْسَلْنَا نُوحًا وَإِبْرَاهِيمَ وَجَعَلْنَا فِي ذُرِّيَّتِهِمَا النُّبُوَّةَ وَالْكِتَابَ ۖ فَمِنْهُم مُّهْتَدٍ ۖ وَكَثِيرٌ مِّنْهُمْ فَاسِقُونَ
**Translation:** "We sent Noah and Abraham, and gave prophethood and scripture to their offspring: among them there were some who were rightly guided, but many were lawbreakers."

**II. Hadith**


### Sahih Bukhari 3442
Narrated Abu Huraira: Allah's Messenger (ﷺ) said, "My example and the example of the prophets before me is that of a man who built a house; he built it well and beautifully, except for a place of one brick in a corner. The people started going round the building and wondering at it and saying: 'If only this brick were put in its place!' So I am that brick, and I am the last of the prophets."
*(Grade: Sahih)*`,
          description: `**Why?**

Correct belief about the prophets prevents both extremes: excessive veneration (which can lead to shirk) and disrespect (which can nullify faith). Understanding their truthfulness, protection from major sin, and the finality of Muhammad (SAW) anchors your relationship with prophethood in orthodox belief.


**How?**

1. Read the section on prophethood in your creed text.
2. Note the key creedal points: prophets are truthful, protected from major sin (*ma'sum*), human (not divine), and Muhammad (SAW) is the final prophet.
3. Study the concept of the "Seal of the Prophets" (Quran 33:40) and why it matters theologically.
4. You have completed this when you can state the creedal position on prophethood and explain why the finality of Muhammad (SAW) is a non-negotiable article of faith.` },
        { title: 'Read the section on the unseen (angels, paradise, hellfire)', done: false,
          sources: `**I. Quran**


### Quran (16:32)
**Arabic:** الَّذِينَ تَتَوَفَّاهُمُ الْمَلَائِكَةُ طَيِّبِينَ ۙ يَقُولُونَ سَلَامٌ عَلَيْكُمُ ادْخُلُوا الْجَنَّةَ بِمَا كُنتُمْ تَعْمَلُونَ
**Translation:** "those whose lives the angels take in a state of goodness. They will say to them, 'Peace be upon you. Enter the Garden as a reward for what you have done.'"

### Quran (40:7)
**Arabic:** الَّذِينَ يَحْمِلُونَ الْعَرْشَ وَمَنْ حَوْلَهُ يُسَبِّحُونَ بِحَمْدِ رَبِّهِمْ وَيُؤْمِنُونَ بِهِ وَيَسْتَغْفِرُونَ لِلَّذِينَ آمَنُوا
**Translation:** "Those [angels] who carry the Throne and those who surround it celebrate the praise of their Lord and have faith in Him. They beg forgiveness for the believers."

**II. Hadith**


### Sahih Bukhari 3207
Narrated Abu Huraira: The Prophet (ﷺ) said, "Angels are created from light, jinn are created from a smokeless flame of fire, and Adam was created from that which has been described to you."
*(Grade: Sahih)*`,
          description: `**Why?**

Matters of the unseen — angels, jinn, paradise, hellfire, the throne — are affirmed by revelation, not by human reason alone. The creedal position is to accept them as the Quran and Sunnah describe without rationalistic reinterpretation. This protects your faith from the trap of rejecting what the intellect cannot fully grasp.


**How?**

1. Read the section in your creed text that discusses the unseen: angels, paradise, hellfire, and the events of the Last Day.
2. Note how the text affirms these realities without allegorising or explaining them away.
3. Reflect: are there any aspects of the unseen you struggle to accept? If so, study the relevant evidences.
4. You have completed this when you can affirm the major elements of the unseen as described in the text and explain why rationalistic reinterpretation is rejected by Ahl al-Sunnah.` },
        { title: 'Summarise key points and questions', done: false,
          sources: `**I. Quran**


### Quran (47:19)
**Arabic:** فَاعْلَمْ أَنَّهُ لَا إِلَٰهَ إِلَّا اللَّهُ وَاسْتَغْفِرْ لِذَنبِكَ وَلِلْمُؤْمِنِينَ وَالْمُؤْمِنَاتِ  
**Translation:** So [Prophet], bear in mind that there is no god but God, and ask forgiveness for your sins and for the sins of believing men and women.

**I. Hadith**


### Sahih Bukhari 99
The Prophet (SAW) said: "Whoever Allah wants good for, He gives him understanding (fiqh) of the religion."
*(Grade: Sahih)*`,
          description: `**Why?**

Summarising forces you to process and consolidate what you have read. It also reveals gaps — areas where your understanding is shallow or where questions remain. These gaps become your roadmap for deeper study or discussion with a qualified teacher.


**How?**

1. Write a one-page summary covering the main creedal points: Allah's attributes, prophethood, the unseen, and divine decree.
2. For each section, note one thing that was new or clarifying and one question that remains.
3. If possible, bring your questions to a knowledgeable teacher or study circle for discussion.
4. You have completed this when you have a written summary with clearly identified questions for further study.` },
      ],
    },
    {
      title: 'Study the nullifiers of Islam (Nawaqid al-Islam)',
      priority: 'medium', tags: ['aqidah'],
      description: 'Learn the ten nullifiers identified by scholars so you can avoid them and understand the boundaries of the faith.',
      subtasks: [
        { title: 'Read the list of ten nullifiers with explanations', done: false,
          sources: `**I. Quran**


### Quran (39:65)
**Arabic:** وَلَقَدْ أُوحِيَ إِلَيْكَ وَإِلَى الَّذِينَ مِن قَبْلِكَ لَئِنْ أَشْرَكْتَ لَيَحْبَطَنَّ عَمَلُكَ وَلَتَكُونَنَّ مِنَ الْخَاسِرِينَ  
**Translation:** And it was already revealed to you and to those before you that if you should associate anything with Allah, your work would surely become worthless, and you would surely be among the losers.

### Quran (4:48)
**Arabic:** إِنَّ اللَّهَ لَا يَغْفِرُ أَن يُشْرَكَ بِهِ وَيَغْفِرُ مَا دُونَ ذَٰلِكَ لِمَن يَشَاءُ  
**Translation:** Indeed, Allah does not forgive association with Him, but He forgives what is less than that for whom He wills.

**II. Hadith**


### Sahih Bukhari 6104
The Prophet (SAW) said: "Cursing a Muslim is fusooq (evil-doing) and fighting him is kufr (disbelief)."
*(Grade: Sahih)*`,
          description: `**Why?**

Just as a contract has terms that can void it, the Shahada has boundaries that — if crossed — nullify a person's Islam. Knowing these ten nullifiers is not about paranoia but about protecting the most important commitment you have ever made.


**How?**

1. Obtain the text of the ten nullifiers as compiled by Imam Muhammad ibn Abd al-Wahhab.
2. Read each nullifier with its explanation and evidence from the Quran and Sunnah.
3. For each one, ask: "Do I understand why this nullifies Islam? Is there anything in my life that comes close to this?"
4. You have completed this when you can list all ten nullifiers and explain the evidence for each in your own words.` },
        { title: 'Understand the difference between major and minor kufr', done: false,
          sources: `**I. Quran**


### Quran (4:116)
**Arabic:** إِنَّ اللَّهَ لَا يَغْفِرُ أَن يُشْرَكَ بِهِ وَيَغْفِرُ مَا دُونَ ذَٰلِكَ لِمَن يَشَاءُ ۚ وَمَن يُشْرِكْ بِاللَّهِ فَقَدْ ضَلَّ ضَلَالًا بَعِيدًا  
**Translation:** Indeed, Allah does not forgive association with Him, but He forgives what is less than that for whom He wills. And he who associates others with Allah has certainly gone far astray.

### Quran (16:106)
**Arabic:** مَن كَفَرَ بِاللَّهِ مِن بَعْدِ إِيمَانِهِ إِلَّا مَنْ أُكْرِهَ وَقَلْبُهُ مُطْمَئِنٌّ بِالْإِيمَانِ  
**Translation:** Whoever disbelieves in Allah after his belief — except for one who is forced while his heart is secure in faith...

**II. Hadith**


### Sahih Muslim 93
The Prophet (SAW) said: "There are three signs of a hypocrite: when he speaks he lies, when he makes a promise he breaks it, and when he is entrusted he betrays."
*(Grade: Sahih)*`,
          description: `**Why?**

Confusing major and minor kufr leads to one of two dangerous extremes: either declaring Muslims disbelievers for sins that do not expel from the faith, or dismissing serious violations as trivial. Major kufr removes one from Islam entirely; minor kufr (such as ingratitude) is sinful but does not. This distinction is critical for proper understanding.


**How?**

1. Study the scholarly definitions of major kufr (*kufr akbar*) and minor kufr (*kufr asghar*) with examples of each.
2. Read about the Kharijite deviation of declaring Muslims disbelievers for sins — understand why this is rejected by Ahl al-Sunnah.
3. Note the key principle: sin does not equal disbelief unless it involves rejection, mockery, or replacement of what Allah has revealed.
4. You have completed this when you can clearly distinguish between major and minor kufr and give two examples of each.` },
        { title: 'Study the conditions for declaring takfir and why it requires caution', done: false,
          sources: `**I. Hadith**


### Sahih Bukhari 6104
The Prophet (SAW) said: "Whoever accuses a believer of kufr (disbelief), it is as if he killed him."
*(Grade: Sahih)*

### Sahih Muslim 60
The Prophet (SAW) said: "If a man says to his brother, O kafir (disbeliever)! Then surely one of them is such."
*(Grade: Sahih)*`,
          description: `**Why?**

Declaring someone a disbeliever (*takfir*) is one of the most serious acts in Islamic jurisprudence. It requires meeting strict conditions and removing all excuses (ignorance, coercion, misunderstanding). The Prophet (SAW) warned that calling a Muslim a disbeliever unjustly returns the accusation upon the accuser.


**How?**

1. Study the conditions for takfir: the person must have received clear knowledge, must not be acting under coercion, and must not have a valid excuse of misunderstanding.
2. Read the hadith: "If a man says to his brother 'O kafir,' it returns upon one of them" (Bukhari 6104).
3. Understand the scholarly consensus: takfir of a specific individual is a judicial matter for qualified scholars, not a casual judgement for laypeople.
4. You have completed this when you can explain why takfir requires extreme caution and list at least three conditions/excuses that scholars consider before making such a ruling.` },
      ],
    },
    {
      title: 'Understand the difference between major and minor shirk',
      priority: 'medium', tags: ['tawhid'],
      description: 'Major shirk expels from Islam; minor shirk is a grave sin but does not. Learn to distinguish them with practical examples.',
      subtasks: [
        { title: 'Define major shirk (shirk akbar) with examples', done: false,
          sources: `**I. Quran**


### Quran (4:48)
**Arabic:** إِنَّ اللَّهَ لَا يَغْفِرُ أَن يُشْرَكَ بِهِ وَيَغْفِرُ مَا دُونَ ذَٰلِكَ لِمَن يَشَاءُ ۚ وَمَن يُشْرِكْ بِاللَّهِ فَقَدِ افْتَرَىٰ إِثْمًا عَظِيمًا  
**Translation:** God does not forgive the joining of partners with Him: anything less than that He forgives to whoever He will, but anyone who joins partners with God has concocted a tremendous sin.

**I. Hadith**


### Sahih Muslim 2985
The Prophet (SAW) said: "Shall I not inform you of what I fear for you more than the Masih al-Dajjal?" They said, "Of course." He said: "Hidden shirk — when a man stands for prayer and beautifies his prayer because he sees another man looking at him."
*(Grade: Sahih)*`,
          description: `**Why?**

Major shirk (*shirk akbar*) is the most severe sin in Islam — it is the one sin Allah has declared He will not forgive if a person dies upon it (Quran 4:48). Understanding what constitutes major shirk protects you from crossing the most critical boundary in your faith.


**How?**

1. Study the definition: major shirk is directing any act of worship to other than Allah — such as praying to the dead, prostrating to idols, or believing someone shares Allah's divine attributes.
2. Read Quran 4:48 and 4:116 to understand the gravity of this sin.
3. List three historical and three contemporary examples of major shirk.
4. You have completed this when you can define major shirk, cite its Quranic evidence, and identify examples in both historical and modern contexts.` },
        { title: 'Define minor shirk (shirk asghar) with examples', done: false,
          sources: `**I. Quran**


### Quran (18:110)
**Arabic:** فَمَن كَانَ يَرْجُو لِقَاءَ رَبِّهِ فَلْيَعْمَلْ عَمَلًا صَالِحًا وَلَا يُشْرِكْ بِعِبَادَةِ رَبِّهِ أَحَدًا  
**Translation:** So whoever would hope for the meeting with his Lord — let him do righteous work and not associate in the worship of his Lord anyone.

**II. Hadith**


### Musnad Ahmad 23630
The Prophet (SAW) said: "The thing I fear most for you is the minor shirk." They asked: "What is the minor shirk?" He said: "Ar-riya (showing off)."
*(Grade: Sahih — graded sahih by al-Albani)*`,
          description: `**Why?**

Minor shirk (*shirk asghar*) does not expel from Islam but is gravely sinful and can erode the sincerity of your worship. It includes acts like showing off in worship (riya), swearing by other than Allah, or saying "if it weren't for so-and-so." Its danger lies in how easily it goes unnoticed.


**How?**

1. Study the categories of minor shirk: verbal (e.g., swearing by other than Allah), practical (e.g., wearing amulets as "causes"), and internal (e.g., riya).
2. Identify which forms of minor shirk are most relevant to your own life and habits.
3. Learn the prophetic remedy: the du'a seeking refuge from shirk both known and unknown.
4. You have completed this when you can define minor shirk, list its common forms, and identify any that may apply to your own behaviour.` },
        { title: 'Study riya (showing off) as a form of minor shirk', done: false,
          sources: `**I. Quran**


### Quran (107:4-6)
**Arabic:** فَوَيْلٌ لِّلْمُصَلِّينَ ۝ الَّذِينَ هُمْ عَن صَلَاتِهِمْ سَاهُونَ ۝ الَّذِينَ هُمْ يُرَاءُونَ  
**Translation:** So woe to those who pray, who are heedless of their prayer, who make show of their deeds.

### Quran (18:110)
**Arabic:** فَلْيَعْمَلْ عَمَلًا صَالِحًا وَلَا يُشْرِكْ بِعِبَادَةِ رَبِّهِ أَحَدًا  
**Translation:** Let him do righteous work and not associate in the worship of his Lord anyone.

**II. Hadith**


### Musnad Ahmad 23630
The Prophet (SAW) said: "The thing I fear most for you is the minor shirk — ar-riya (showing off)."
*(Grade: Sahih — graded sahih by al-Albani)*`,
          description: `**Why?**

The Prophet (SAW) called riya "hidden shirk" because it corrupts the sincerity of worship from within. It occurs when you beautify your worship to be seen by people — praying more carefully in public, giving charity for recognition, or seeking praise for religious knowledge. It is the most subtle threat to your Shahada.


**How?**

1. Study the hadith: "The thing I fear most for you is minor shirk — riya" (Ahmad 23630).
2. Examine your worship honestly: do you pray differently when others are watching? Do you share your good deeds for validation?
3. Practice three counter-measures: (a) perform hidden acts of worship regularly, (b) make du'a for sincerity before each act, (c) remind yourself that only Allah's acceptance matters.
4. You have completed this when you can describe what riya looks like in practice and have implemented at least one strategy to guard against it.` },
        { title: 'Learn the hadith on hidden shirk and its remedy', done: false,
          sources: `**I. Quran**


### Quran (4:48)
**Arabic:** إِنَّ اللَّهَ لَا يَغْفِرُ أَن يُشْرَكَ بِهِ وَيَغْفِرُ مَا دُونَ ذَٰلِكَ لِمَن يَشَاءُ  
**Translation:** Indeed, Allah does not forgive association with Him, but He forgives what is less than that for whom He wills.

**II. Hadith**


### Musnad Ahmad 23630
The Prophet (SAW) said: "The thing I fear most for you is the minor shirk." They asked: "What is the minor shirk?" He said: "Ar-riya (showing off)." He then said: "O Allah, I seek refuge in You from associating anything with You knowingly, and I seek Your forgiveness for what I do unknowingly."
*(Grade: Sahih — graded sahih by al-Albani)*`,
          description: `**Why?**

The Prophet (SAW) taught a specific du'a to protect against shirk — both the forms you recognise and the forms you do not. This du'a acknowledges human vulnerability to hidden shirk and turns the remedy itself into an act of worship and humility before Allah.


**How?**

1. Memorise the du'a: "Allahumma inni a'udhu bika an ushrika bika shay'an a'lamuhu, wa astaghfiruka lima la a'lamu" (O Allah, I seek refuge in You from associating anything with You knowingly, and I seek Your forgiveness for what I do not know).
2. Incorporate this du'a into your daily adhkar — say it at least once every morning and evening.
3. Study the hadith in which it was taught (narrated by Ahmad) and understand the context.
4. You have completed this when you have memorised the du'a in Arabic, understand its meaning, and have made it part of your daily routine.` },
      ],
    },
    {
      title: 'Learn about the categories of Tawhid (Rububiyyah, Uluhiyyah, Asma wa Sifat)',
      priority: 'high', tags: ['tawhid'],
      description: 'Scholars have categorised Tawhid into three domains. Understanding this framework helps identify where deviations occur.',
      subtasks: [
        { title: 'Study Tawhid al-Rububiyyah \u2014 Lordship of Allah', done: false,
          sources: `**I. Quran**


### Quran (59:6)
**Arabic:** وَمَا أَفَاءَ اللَّهُ عَلَىٰ رَسُولِهِ مِنْهُمْ فَمَا أَوْجَفْتُمْ عَلَيْهِ مِنْ خَيْلٍ وَلَا رِكَابٍ وَلَٰكِنَّ اللَّهَ يُسَلِّطُ رُسُلَهُ عَلَىٰ مَن يَشَاءُ ۚ وَاللَّهُ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ
**Translation:** And that which Allah gave as spoil unto His messenger from them, ye urged not any horse or riding-camel for the sake thereof, but Allah giveth His messenger lordship over whom He will. Allah is Able to do all things.

**II. Hadith**


### Sahih Bukhari 7364
Narrated Jundab bin \`Abdullah:Allah's Messenger (ﷺ) said, "Recite (and study) the Qur'an as long as you are in agreement as to its interpretation and meanings, but when you have differences regarding its interpretation and meanings, then you should stop reciting it (for the time being.) (See Hadith No 581, Vol)
*(Grade: Sahih)*

### Sahih Bukhari 7365
Narrated Jundab bin \`Abdullah:Allah's Messenger (ﷺ) said, "Recite (and study) the Qur'an as long as your hearts are in agreement as to its meanings, but if you have differences as regards its meaning, stop reading it then
*(Grade: Sahih)*

### Sahih Bukhari 3220
Narrated Ibn \`Abbas:Allah's Messenger (ﷺ) was the most generous of all the people, and he used to be more generous in the month of Ramadan when Gabriel used to meet him. Gabriel used to meet him every night in Ramadan to study the Holy Qur'an carefully together. Allah's Messenger (ﷺ) used to become more generous than the fast wind when he met Gabriel
*(Grade: Sahih)*`,
          description: `**Why?**

Tawhid al-Rububiyyah — affirming that Allah alone is the Creator, Sustainer, and Controller of all affairs — is the foundation, but it alone is insufficient. Even the Quraysh of Mecca accepted that Allah created them (Quran 29:61-63), yet they were still polytheists because they did not single Him out in worship.


**How?**

1. Study the Quranic evidence for Rububiyyah: read 29:61-63 where the Quraysh affirm Allah as Creator yet worship others alongside Him.
2. Understand why acknowledgement of Allah as Creator does not automatically make someone a monotheist.
3. Reflect: do you know anyone (or any modern philosophy) that acknowledges a "higher power" but does not worship Allah alone?
4. You have completed this when you can explain Tawhid al-Rububiyyah, cite its evidence, and explain why it is necessary but not sufficient for correct monotheism.` },
        { title: 'Study Tawhid al-Uluhiyyah \u2014 worship of Allah alone', done: false,
          sources: `**I. Quran**


### Quran (40:65)
**Arabic:** هُوَ الْحَيُّ لَا إِلَٰهَ إِلَّا هُوَ فَادْعُوهُ مُخْلِصِينَ لَهُ الدِّينَ ۗ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ
**Translation:** He is the Ever Living, Lâ ilâha illâ Huwa (none has the right to be worshipped but He); so invoke Him making your worship pure for Him Alone (by worshipping Him Alone, and none else, and by doing righteous deeds sincerely for Allâh’s sake only, and not to show off, and not setting up rivals with Him in worship). All the praises and thanks be to Allâh, the Lord of the ‘Âlamîn (mankind, jinn and all that exists).

### Quran (29:36)
**Arabic:** وَإِلَىٰ مَدْيَنَ أَخَاهُمْ شُعَيْبًا فَقَالَ يَا قَوْمِ اعْبُدُوا اللَّهَ وَارْجُوا الْيَوْمَ الْآخِرَ وَلَا تَعْثَوْا فِي الْأَرْضِ مُفْسِدِينَ
**Translation:** And to (the people of) Madyan (Midian), We sent their brother Shu‘aib. He said: "O my people! Worship Allâh (Alone) and hope for (the reward of good deeds by worshipping Allâh Alone, on) the last Day (i.e. the Day of Resurrection), and commit no mischief on the earth as Mufsidûn (those who commit great crimes, oppressors, tyrants, mischief-makers, corrupters). [Tafsir At-Tabari]

**II. Hadith**


### Sahih Bukhari 50
Narrated Abu Huraira: One day while the Prophet (ﷺ) was sitting in the company of some people, (The angel) Gabriel came and asked, "What is faith?" Allah's Messenger (ﷺ) replied, 'Faith is to believe in Allah, His angels, (the) meeting with Him, His Apostles, and to believe in Resurrection." Then he further asked, "What is Islam?" Allah's Messenger (ﷺ) replied, "To worship Allah Alone and none else, to offer prayers perfectly to pay the compulsory charity (Zakat) and to observe fasts during the month of Ramadan." Then he further asked, "What is Ihsan (perfection)?" Allah's Messenger (ﷺ) replied, "To worship Allah as if you see Him, and if you cannot achieve this state of devotion then you must consider that He is looking at you." Then he further asked, "When will the Hour be established?" Allah's Messenger (ﷺ) replied, "The answerer has no better knowledge than the questioner. But I will inform you about its portents. 1. When a slave (lady) gives birth to her master. 2. When the shepherds of black camels start boasting and competing with others in the construction of higher buildings. And the Hour is one of five things which nobody knows except Allah. The Prophet (ﷺ) then recited: "Verily, with Allah (Alone) is the knowledge of the Hour--." (31. 34) Then that man (Gabriel) left and the Prophet (ﷺ) asked his companions to call him back, but they could not see him. Then the Prophet (ﷺ) said, "That was Gabriel who came to teach the people their religion." Abu 'Abdullah said: He (the Prophet) considered all that as a part of faith
*(Grade: Sahih)*

### Sahih Bukhari 3
Narrated 'Aisha (the mother of the faithful believers):The commencement of the Divine Inspiration to Allah's Messenger (ﷺ) was in the form of good dreams which came true like bright daylight, and then the love of seclusion was bestowed upon him. He used to go in seclusion in the cave of Hira where he used to worship (Allah alone) continuously for many days before his desire to see his family. He used to take with him the journey food for the stay and then come back to (his wife) Khadija to take his food likewise again till suddenly the Truth descended upon him while he was in the cave of Hira. The angel came to him and asked him to read. The Prophet (ﷺ) replied, "I do not know how to read." The Prophet (ﷺ) added, "The angel caught me (forcefully) and pressed me so hard that I could not bear it any more. He then released me and again asked me to read and I replied, 'I do not know how to read.' Thereupon he caught me again and pressed me a second time till I could not bear it any more. He then released me and again asked me to read but again I replied, 'I do not know how to read (or what shall I read)?' Thereupon he caught me for the third time and pressed me, and then released me and said, 'Read in the name of your Lord, who has created (all that exists), created man from a clot. Read! And your Lord is the Most Generous." (96.1, 96.2, 96.3) Then Allah's Messenger (ﷺ) returned with the Inspiration and with his heart beating severely. Then he went to Khadija bint Khuwailid and said, "Cover me! Cover me!" They covered him till his fear was over and after that he told her everything that had happened and said, "I fear that something may happen to me." Khadija replied, "Never! By Allah, Allah will never disgrace you. You keep good relations with your kith and kin, help the poor and the destitute, serve your guests generously and assist the deserving calamity-afflicted ones." Khadija then accompanied him to her cousin Waraqa bin Naufal bin Asad bin 'Abdul 'Uzza, who, during the pre-Islamic Period became a Christian and used to write the writing with Hebrew letters. He would write from the Gospel in Hebrew as much as Allah wished him to write. He was an old man and had lost his eyesight. Khadija said to Waraqa, "Listen to the story of your nephew, O my cousin!" Waraqa asked, "O my nephew! What have you seen?" Allah's Messenger (ﷺ) described whatever he had seen. Waraqa said, "This is the same one who keeps the secrets (angel Gabriel) whom Allah had sent to Moses. I wish I were young and could live up to the time when your people would turn you out." Allah's Messenger (ﷺ) asked, "Will they drive me out?" Waraqa replied in the affirmative and said, "Anyone (man) who came with something similar to what you have brought was treated with hostility; and if I should remain alive till the day when you will be turned out then I would support you strongly." But after a few days Waraqa died and the Divine Inspiration was also paused for a while
*(Grade: Sahih)*`,
          description: `**Why?**

Tawhid al-Uluhiyyah — directing all acts of worship exclusively to Allah — is the core message of every prophet. Prayer, du'a, sacrifice, vows, love, fear, and hope must all be for Allah alone. This is where most deviations historically occur, and it is the dimension of Tawhid that the Quran emphasises most.


**How?**

1. List the major acts of worship: prayer, du'a, sacrifice, vows, reliance, love, fear, and hope.
2. For each one, verify: is this directed exclusively to Allah in my life, or does anything else compete for it?
3. Study Quran 6:162: "Say: Indeed, my prayer, my rites of sacrifice, my living and my dying are for Allah, Lord of the worlds."
4. You have completed this when you can list the major acts of worship and have audited each one for exclusive direction to Allah.` },
        { title: 'Study Tawhid al-Asma wa al-Sifat \u2014 Names and Attributes', done: false,
          sources: `**I. Quran**


### Quran (7:180)
**Arabic:** وَلِلَّهِ الْأَسْمَاءُ الْحُسْنَىٰ فَادْعُوهُ بِهَا ۖ وَذَرُوا الَّذِينَ يُلْحِدُونَ فِي أَسْمَائِهِ  
**Translation:** The Most Excellent Names belong to God: use them to call on Him, and keep away from those who abuse them — they will be requited for what they do.

**I. Hadith**


### Sahih Bukhari 2736
The Prophet (SAW) said: "Allah has ninety-nine Names, one hundred minus one. Whoever enumerates (and acts upon) them will enter Paradise."
*(Grade: Sahih)*`,
          description: `**Why?**

Tawhid al-Asma wa al-Sifat requires affirming Allah's names and attributes as described in the Quran and Sunnah — without denial, distortion, or likening them to creation. The guiding principle is Quran 42:11: "There is nothing like unto Him, and He is the All-Hearing, the All-Seeing."


**How?**

1. Study the principle: affirm what Allah and His Messenger affirmed, deny what they denied, and remain silent where they were silent.
2. Read about at least five of Allah's names (e.g., Ar-Rahman, Al-Alim, As-Samad, Al-Hayy, Al-Qayyum) and their meanings.
3. Practice applying Quran 42:11 as a filter: when you learn an attribute, affirm it as real without imagining a form.
4. You have completed this when you can explain the methodology of Ahl al-Sunnah regarding Allah's names and attributes and give examples of correct affirmation.` },
        { title: 'Understand how the three categories interrelate', done: false,
          sources: `**I. Quran**

### Quran (51:56)
**Arabic:** وَمَا خَلَقْتُ الْجِنَّ وَالْإِنسَ إِلَّا لِيَعْبُدُونِ  
**Translation:** I created jinn and mankind only to worship Me.

### Quran (3:18)
**Arabic:** شَهِدَ اللَّهُ أَنَّهُ لَا إِلَٰهَ إِلَّا هُوَ وَالْمَلَائِكَةُ وَأُولُو الْعِلْمِ قَائِمًا بِالْقِسْطِ ۚ لَا إِلَٰهَ إِلَّا هُوَ الْعَزِيزُ الْحَكِيمُ  
**Translation:** God bears witness that there is no god but Him, as do the angels and those who have knowledge. He upholds justice. There is no god but Him, the Almighty, the All Wise.

**II. Hadith**

### Sahih al-Bukhari 7372
The Prophet (peace be upon him) said: "The right of Allah upon His servants is that they worship Him and do not associate anything with Him; and the right of the servants upon Allah is that He does not punish the one who does not associate anything with Him."
*(Grade: Sahih)*`,
          description: `**Why?**

The three categories of Tawhid are not isolated compartments — they form a unified framework. Rububiyyah necessitates Uluhiyyah: if He is your Lord, then worship Him alone. And Asma wa Sifat informs both: knowing His attributes (e.g., that He is Ar-Razzaq, the Provider) leads to proper worship and trust.


**How?**

1. Draw or write out the three categories and how they connect: Rububiyyah (He is the Lord) leads to Uluhiyyah (so worship Him alone), and Asma wa Sifat (knowing who He is) deepens both.
2. Give one example of how knowing an attribute of Allah (e.g., Al-Basir — the All-Seeing) should change your behaviour.
3. Study Quran 7:180: "And to Allah belong the most beautiful names, so invoke Him by them."
4. You have completed this when you can explain how the three categories interrelate and give a practical example of how knowledge of an attribute leads to correct worship.` },
      ],
    },
  ],
  faith_shahada_excellence: [
    {
      title: 'Teach the Shahada and its conditions to a family member or student',
      priority: 'medium', tags: ['dawah'],
      description: 'The best way to solidify knowledge is to teach it. Share the meaning and conditions of the Shahada with someone in your household or community.',
      subtasks: [
        { title: 'Prepare a simple outline of the seven conditions', done: false,
          sources: `**I. Hadith**


### Sahih Muslim 26
The Prophet (SAW) said: "Whoever testifies that there is no deity worthy of worship except Allah alone with no partner, that Muhammad is His servant and messenger, that Isa is His servant and messenger — Allah will admit him to Paradise regardless of what he did."
*(Grade: Sahih)*`,
          description: `**Why?**

Preparing a summary forces you to distil complex knowledge into clear, teachable form. If you cannot explain something simply, you may not understand it deeply enough yourself. This preparation is both a test of your knowledge and a service to the one you will teach.


**How?**

1. Create a one-page document listing each of the seven conditions: Ilm, Yaqin, Qabul, Inqiyad, Sidq, Ikhlas, Muhabbah.
2. For each condition, write: (a) a one-sentence definition, (b) a brief explanation, and (c) one Quranic or hadith reference.
3. Use plain language — avoid jargon that a beginner would not understand.
4. You have completed this when you have a clear, one-page summary that someone unfamiliar with the topic could follow.` },
        { title: 'Schedule a teaching session with a family member or student', done: false,
          sources: `**I. Hadith**


### Sahih Muslim 1893
The Prophet (SAW) said: "By the One in whose hand is my soul, you will not enter Paradise until you believe, and you will not believe until you love one another. Shall I tell you of something that, if you do it, you will love one another? Spread the salam among yourselves."
*(Grade: Sahih)*`,
          description: `**Why?**

Knowledge that is not shared stagnates. Teaching is one of the most powerful ways to solidify your own understanding while fulfilling the prophetic command to convey knowledge. Choosing the right setting and person maximises the impact of what you share.


**How?**

1. Identify who you will teach: a family member, a friend, or a student — someone receptive to learning.
2. Choose a suitable time and setting: a family halaqah, mentoring session, or casual conversation after a meal.
3. Let them know in advance that you would like to share something meaningful — this builds anticipation and respect for the topic.
4. You have completed this when you have a confirmed time, place, and person for your teaching session.` },
        { title: 'Deliver the lesson and encourage questions', done: false,
          sources: `**I. Quran**


### Quran (16:90)
**Arabic:** إِنَّ اللَّهَ يَأْمُرُ بِالْعَدْلِ وَالْإِحْسَانِ وَإِيتَاءِ ذِي الْقُرْبَىٰ  
**Translation:** God commands justice, doing good, and generosity towards relatives and He forbids what is shameful, blameworthy, and oppressive.

**I. Hadith**


### Sahih Bukhari 6018
The Prophet (SAW) said: "Convey from me even if it is one ayah."
*(Grade: Sahih)*`,
          description: `**Why?**

The goal of teaching the Shahada's conditions is not to deliver a lecture — it is to connect hearts to the testimony of faith. The Prophet (SAW) taught with sincerity, patience, and engagement. Your approach should mirror his: sincere, inviting, and open to questions.


**How?**

1. Begin with bismillah and a brief du'a for benefit. Set a warm, non-judgmental tone.
2. Present each condition using your prepared summary. Use examples and stories to make each one relatable.
3. Encourage questions after each condition — pause and ask, "Does this resonate? Do you have any questions?"
4. You have completed this when you have delivered the lesson, engaged in discussion, and the listener can recall at least three of the seven conditions.` },
      ],
    },
    {
      title: 'Study the relationship between Shahada and daily actions (amal)',
      priority: 'medium', tags: ['aqidah'],
      description: 'Explore how the declaration of faith should manifest in everyday decisions \u2014 from business ethics to interpersonal conduct.',
      subtasks: [
        { title: 'Reflect on how Tawhid influences business decisions', done: false,
          sources: `**I. Quran**


### Quran (51:56)
**Arabic:** وَمَا خَلَقْتُ الْجِنَّ وَالْإِنسَ إِلَّا لِيَعْبُدُونِ  
**Translation:** I created jinn and mankind only to worship Me.

**I. Hadith**


### Sahih Bukhari 1
The Prophet (SAW) said: "Actions are judged by intentions, and every person shall have what they intended. So whoever emigrated for the sake of Allah and His Messenger, his emigration is for Allah and His Messenger."
*(Grade: Sahih)*`,
          description: `**Why?**

Tawhid is not confined to the prayer mat — it extends into every transaction, contract, and business decision. If you declare that there is no god but Allah, then His rulings on halal income, the prohibition of riba, and the demand for honest dealings are binding on your commercial life, not just your spiritual one.


**How?**

1. Audit your income sources: is your salary, business revenue, or investment income free from riba, deception, and exploitation?
2. Review your financial transactions: do your contracts, loans, or partnerships comply with Islamic commercial ethics?
3. Identify one area where your business or financial life may conflict with Tawhid and research the Islamic ruling on it.
4. You have completed this when you have conducted an honest financial audit and identified any adjustments needed to align your commerce with your Shahada.` },
        { title: 'Identify three daily actions that express your Shahada', done: false,
          sources: `**I. Quran**

### Quran (47:19)
**Arabic:** فَاعْلَمْ أَنَّهُ لَا إِلَٰهَ إِلَّا اللَّهُ وَاسْتَغْفِرْ لِذَنبِكَ وَلِلْمُؤْمِنِينَ وَالْمُؤْمِنَاتِ ۗ وَاللَّهُ يَعْلَمُ مُتَقَلَّبَكُمْ وَمَثْوَاكُمْ
**Translation:** "So [Prophet], bear in mind that there is no god but God, and ask forgiveness for your sins and for the sins of believing men and women. God knows whenever any of you move, and whenever any of you stay still." (Abdel Haleem)

*(The command "bear in mind" — فَاعْلَمْ — implies living the Shahada continuously, not just reciting it. Allah's awareness of every movement and stillness calls for daily actions to align with the testimony.)*

**II. Hadith**


### Sahih Bukhari 1976
Narrated \`Abdullah bin \`Amr:Allah's Messenger (ﷺ) was informed that I had taken an oath to fast daily and to pray (every night) all the night throughout my life (so Allah's Messenger (ﷺ) came to me and asked whether it was correct): I replied, "Let my parents be sacrificed for you! I said so." The Prophet (ﷺ) said, "You can not do that. So, fast for few days and give it up for few days, offer Salat (prayer) and sleep. Fast three days a month as the reward of good deeds is multiplied ten times and that will be equal to one year of fasting." I replied, "I can do better than that." The Prophet (ﷺ) said to me, "Fast one day and give up fasting for two days." I replied, "I can do better than that." The Prophet (ﷺ) said to me, "Fast one day and give up fasting for a day and that is the fasting of Prophet David and that is the best fasting." I said, "I have the power to fast better (more) than that." The Prophet (ﷺ) said, "There is no better fasting than that
*(Grade: Sahih)*`,
          description: `**Why?**

The Shahada is not a one-time declaration — it is a living testimony expressed through daily actions. Identifying specific actions that express your faith makes the abstract concrete and turns routine moments into acts of worship.


**How?**

1. Reflect on your typical day and identify three specific actions that express your Shahada. Examples: choosing honesty when lying would be easier, turning to du'a before turning to people, or lowering your gaze out of obedience to Allah.
2. For each action, articulate the connection: "I do this because I testify that Allah alone deserves my obedience."
3. Commit to being intentional about these three actions for one full week.
4. You have completed this when you have identified three daily expressions of your Shahada and practiced them consciously for at least one week.` },
        { title: 'Study how the Sahaba lived their Shahada practically', done: false,
          sources: `**I. Quran**

### Quran (2:285)
**Arabic:** آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَّبِّهِ وَالْمُؤْمِنُونَ ۚ كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِّن رُّسُلِهِ ۚ وَقَالُوا سَمِعْنَا وَأَطَعْنَا ۖ غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ الْمَصِيرُ
**Translation:** "The Messenger believes in what has been sent down to him from his Lord, as do the faithful. They all believe in God, His angels, His scriptures, and His messengers. 'We make no distinction between any of His messengers,' they say, 'We hear and obey. Grant us Your forgiveness, our Lord. To You we all return!'" (Abdel Haleem)

*(The phrase "We hear and obey" — سَمِعْنَا وَأَطَعْنَا — is the Sahaba's creed made action. This verse describes the believing companions living out their Shahada in submission and obedience.)*

**II. Hadith**


### Sahih Bukhari 1295
Narrated 'Amir bin Sa\`d bin Abi Waqqas:That his father said, "In the year of the last Hajj of the Prophet (ﷺ) I became seriously ill and the Prophet (ﷺ) used to visit me inquiring about my health. I told him, 'I am reduced to this state because of illness and I am wealthy and have no inheritors except a daughter, (In this narration the name of 'Amir bin Sa\`d is mentioned and in fact it is a mistake; the narrator is \`Aisha bint Sa\`d bin Abi Waqqas). Should I give two-thirds of my property in charity?' He said, 'No.' I asked, 'Half?' He said, 'No.' then he added, 'One-third, and even one-third is much. You'd better leave your inheritors wealthy rather than leaving them poor, begging others. You will get a reward for whatever you spend for Allah's sake, even for what you put in your wife's mouth.' I said, 'O Allah's Messenger (ﷺ)! Will I be left alone after my companions have gone?' He said, 'If you are left behind, whatever good deeds you will do will upgrade you and raise you high. And perhaps you will have a long life so that some people will be benefited by you while others will be harmed by you. O Allah! Complete the emigration of my companions and do not turn them renegades.' But Allah's Messenger (ﷺ) felt sorry for poor Sa\`d bin Khaula as he died in Mecca." (but Sa\`d bin Abi Waqqas lived long after the Prophet (ﷺ)
*(Grade: Sahih)*`,
          description: `**Why?**

The Sahaba did not merely recite the Shahada — they lived it under the most extreme circumstances. Abu Bakr's spending, Bilal's steadfastness under torture, and Khadijah's unwavering support were the living proof of their testimony. Studying them gives you real models of what a lived Shahada looks like.


**How?**

1. Read about at least three Sahaba and how they expressed their Shahada through action: Abu Bakr (sacrifice of wealth), Bilal (endurance under persecution), and Khadijah (support and conviction from day one).
2. For each, identify the specific quality that made their testimony living: generosity, patience, loyalty.
3. Ask yourself: which of these qualities is most needed in my own life right now?
4. You have completed this when you can describe how three Sahaba lived their Shahada and have identified one quality you will work to embody.` },
      ],
    },
    {
      title: 'Reflect on how Tawhid governs every decision \u2014 write a personal reflection',
      priority: 'low', tags: ['reflection'],
      description: 'Write a personal reflection journal entry exploring how the oneness of Allah shapes your worldview, priorities, and decision-making.',
      subtasks: [
        { title: 'Set aside 30 minutes of focused reflection time', done: false,
          sources: `**I. Quran**


### Quran (6:162-163)
**Arabic:** قُلْ إِنَّ صَلَاتِي وَنُسُكِي وَمَحْيَايَ وَمَمَاتِي لِلَّهِ رَبِّ الْعَالَمِينَ ۝ لَا شَرِيكَ لَهُ  
**Translation:** Say: Indeed, my prayer, my rites of sacrifice, my living and my dying are for Allah, Lord of the worlds. No partner has He.

### Quran (112:1-4)
**Arabic:** قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ  
**Translation:** Say: He is Allah, the One. Allah, the Eternal Refuge. He neither begets nor is born. Nor is there to Him any equivalent.`,
          description: `**Why?**

Meaningful reflection requires stillness. Without dedicated, distraction-free time, your reflection will stay surface-level. Beginning with dhikr or du'a centres the heart on Allah before the mind begins to write — ensuring the reflection is spiritually grounded, not merely intellectual.


**How?**

1. Choose a 30-minute block where you will not be interrupted. Silence your phone and close unnecessary tabs.
2. Begin with 2-3 minutes of dhikr (e.g., SubhanAllah, Alhamdulillah, Allahu Akbar) or a brief du'a asking Allah for clarity and sincerity.
3. Have your journal or writing tool ready before you begin the dhikr so you can transition smoothly into writing.
4. You have completed this when you have sat down in a quiet space, completed your opening dhikr, and are ready to write.` },
        { title: 'Write about an area where Tawhid challenged your habits', done: false,
          sources: `**I. Quran**


### Quran (2:255)
**Arabic:** اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ  
**Translation:** God: there is no god but Him, the Ever Living, the Ever Watchful. Neither slumber nor sleep overtakes Him.

**I. Hadith**


### Sahih Muslim 131
The Prophet (SAW) said: "He has tasted the sweetness of faith who is content with Allah as his Lord, Islam as his religion, and Muhammad as his Messenger."
*(Grade: Sahih)*`,
          description: `**Why?**

Tawhid is tested not in comfort but in difficulty. The moments where believing in Allah alone required you to change a habit, leave a relationship, or make a difficult choice — these are where your Shahada was most real. Writing about them reveals the depth of your testimony.


**How?**

1. Think of a specific situation where your faith in Allah directly challenged something you were attached to — a habit, a relationship, a financial decision, or a social norm.
2. Write about what happened: what was the challenge, what did Tawhid demand, and what did you do?
3. Be honest about whether you followed through fully or compromised. Both outcomes are valuable for reflection.
4. You have completed this when you have written a detailed, honest account of at least one situation where Tawhid challenged your life.` },
        { title: 'Identify one change you will make based on this reflection', done: false,
          sources: `**I. Quran**


### Quran (2:186)
**Arabic:** وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ ۖ أُجِيبُ دَعْوَةَ الدَّاعِ إِذَا دَعَانِ  
**Translation:** And when My servants ask you concerning Me — indeed I am near. I respond to the invocation of the supplicant when he calls upon Me.

### Quran (13:28)
**Arabic:** أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ  
**Translation:** Verily, in the remembrance of Allah do hearts find rest.

**II. Hadith**


### Sahih Muslim 2577
The Prophet (SAW) said: "Allah the Almighty has said: I am as My servant thinks of Me. I am with him when he remembers Me."
*(Grade: Sahih — Hadith Qudsi)*`,
          description: `**Why?**

Reflection without action is incomplete. Committing to one concrete, actionable change — however small — transforms this exercise from journaling into genuine spiritual growth. The Shahada demands ongoing alignment between declaration and life.


**How?**

1. Based on your reflection, identify one specific change you will make — not a vague aspiration, but a concrete action (e.g., "I will stop this specific habit," "I will begin praying Fajr on time," "I will remove this source of haram income").
2. Write it down as a commitment, including when you will start and how you will measure it.
3. Share it with someone who can hold you accountable, or set a reminder to check your progress in one week.
4. You have completed this when you have written a specific, measurable commitment and taken the first step toward implementing it.` },
      ],
    },
  ],

  // \u2500\u2500 SALAH \u2500\u2500
  faith_salah_core: [
    {
      title: 'Establish all five daily prayers on time consistently',
      priority: 'urgent', tags: ['salah', 'fard'],
      description: 'Salah is the first obligation after Shahada and the first thing judged on the Day of Resurrection. Make every prayer on time without exception.',
      subtasks: [
        { title: 'Set alarms or reminders for all five prayer times', done: false,
          sources: `**I. Quran**


### Quran (40:55)
**Arabic:** فَاصْبِرْ إِنَّ وَعْدَ اللَّهِ حَقٌّ وَاسْتَغْفِرْ لِذَنبِكَ وَسَبِّحْ بِحَمْدِ رَبِّكَ بِالْعَشِيِّ وَالْإِبْكَارِ
**Translation:** "So be patient, Prophet, for what God has promised is sure to come. Ask forgiveness for your sins; praise your Lord morning and evening." (Abdel Haleem)

*(Morning and evening praise encompasses the daily cycle of prayer times — a call to maintain regular dhikr and salah throughout the day.)*

### Quran (30:18)
**Arabic:** وَلَهُ الْحَمْدُ فِي السَّمَاوَاتِ وَالْأَرْضِ وَعَشِيًّا وَحِينَ تُظْهِرُونَ
**Translation:** "praise is due to Him in the heavens and the earth— in the late afternoon, and at midday." (Abdel Haleem)

*(Scholars cite this verse as referring specifically to the ‘Asr and Dhuhr prayer times, anchoring the practice of setting times for each prayer.)*

### Quran (11:114)
**Arabic:** وَأَقِمِ الصَّلَاةَ طَرَفَيِ النَّهَارِ وَزُلَفًا مِّنَ اللَّيْلِ ۚ إِنَّ الْحَسَنَاتِ يُذْهِبْنَ السَّيِّئَاتِ ۚ ذَٰلِكَ ذِكْرَىٰ لِلذَّاكِرِينَ
**Translation:** "[Prophet], keep up the prayer at both ends of the day, and during parts of the night, for good things drive bad away— this is a reminder for those who are aware." (Abdel Haleem)

**II. Hadith**


### Sahih Bukhari 527
Narrated Ibn Mas’ud: A man kissed a woman and then came to the Prophet (ﷺ) and informed him. Allah then revealed: "Offer prayers perfectly at the two ends of the day and in some hours of the night [i.e. the five compulsory prayers]. Verily, the good deeds remove the evil deeds." The man asked, "O Allah’s Messenger (ﷺ)! Is it for me only?" The Prophet (ﷺ) said, "It is for all my followers."
*(Grade: Sahih)*`,
          description: `**Why?**

Without reliable reminders, even sincere believers miss prayers due to distraction or busy schedules. Removing the burden of remembering frees your mind to focus on the prayer itself rather than worrying about the clock.


**How?**

Use a prayer time app (such as Muslim Pro or Athan) or set individual phone alarms for Fajr, Dhuhr, Asr, Maghrib, and Isha. Ensure reminders account for seasonal time changes. Test your setup for one full week and adjust alarm lead times so you have enough time to make wudu before the adhan.` },
        { title: 'Track your prayer consistency for one full week', done: false,
          sources: `**I. Quran**


### Quran (23:9)
**Arabic:** وَالَّذِينَ هُمْ عَلَىٰ صَلَوَاتِهِمْ يُحَافِظُونَ
**Translation:** "and who keep up their prayers." (Abdel Haleem)

*(The word يُحَافِظُونَ — "guard/maintain" — implies consistent vigilance over prayer, not merely performing it occasionally. Tracking consistency embodies this quality of guardianship.)*

**II. Hadith**


### Sahih Bukhari 7475
Narrated Abu Huraira: A man came to Allah's Messenger (ﷺ) and said, "Guide me to a deed that equals Jihad." He said, "I cannot." Then he said, "Can you, when the Mujahid goes out for Jihad, enter your mosque and pray without rest, and fast without breaking it?" The man said, "Who can do that?" (Then) Abu Huraira added, "The Mujahid is recompensed for all his [even small] steps."
*(Grade: Sahih)*`,
          description: `**Why?**

What gets measured gets managed. Without honest tracking, you may overestimate your consistency or fail to notice patterns -- like consistently missing Fajr or delaying Asr. A single week of data gives you a clear baseline to improve from.


**How?**

Create a simple log (notebook or app) with five columns for each day: Fajr, Dhuhr, Asr, Maghrib, Isha. For each prayer, record whether it was on time, slightly delayed, or missed. At the end of the week, identify your weakest prayer and the most common reason for delays.` },
        { title: 'Identify and resolve common excuses for missing prayers', done: false,
          sources: `**I. Quran**


### Quran (31:17)
**Arabic:** يَا بُنَيَّ أَقِمِ الصَّلَاةَ وَأْمُرْ بِالْمَعْرُوفِ وَانْهَ عَنِ الْمُنكَرِ وَاصْبِرْ عَلَىٰ مَا أَصَابَكَ ۖ إِنَّ ذَٰلِكَ مِنْ عَزْمِ الْأُمُورِ
**Translation:** "Keep up the prayer, my son; command what is right; forbid what is wrong; bear anything that happens to you steadfastly: these are things to be aspired to." (Abdel Haleem)

*(Luqman's command includes "bear anything that happens to you" — addressing the same reality that producing excuses avoids. The command to establish prayer is unconditional.)*

### Quran (19:59)
**Arabic:** فَخَلَفَ مِن بَعْدِهِمْ خَلْفٌ أَضَاعُوا الصَّلَاةَ وَاتَّبَعُوا الشَّهَوَاتِ ۖ فَسَوْفَ يَلْقَوْنَ غَيًّا
**Translation:** "but there came after them generations who neglected prayer and were driven by their own desires. These will come face to face with their evil." (Abdel Haleem)

**II. Hadith**


### Sahih Bukhari 7288
Narrated Jabir: The Prophet (ﷺ) said, "Between a person and shirk and kufr is the abandonment of prayer."
*(Grade: Sahih)*`,
          description: `**Why?**

Shaytan's strategy is to make missing prayer feel justified through "reasonable" excuses. By naming your barriers explicitly and preparing countermeasures in advance, you remove the decision-making in the moment and protect your salah.


**How?**

List your top three barriers to prayer (e.g., oversleeping for Fajr, work meetings during Dhuhr, fatigue at Isha). For each barrier, write a specific countermeasure: a sleep routine for Fajr, a calendar block for Dhuhr, or praying Isha immediately after Maghrib to avoid delay. Test each countermeasure for one week.` },
        { title: 'Pray each salah within its earliest time window', done: false,
          sources: `**I. Quran**


### Quran (7:134)
**Arabic:** وَلَمَّا وَقَعَ عَلَيْهِمُ الرِّجْزُ قَالُوا يَا مُوسَى ادْعُ لَنَا رَبَّكَ بِمَا عَهِدَ عِندَكَ ۖ لَئِن كَشَفْتَ عَنَّا الرِّجْزَ لَنُؤْمِنَنَّ لَكَ وَلَنُرْسِلَنَّ مَعَكَ بَنِي إِسْرَائِيلَ
**Translation:** "They would say, whenever a plague struck them, 'Moses, pray to your Lord for us by virtue of the promise He has made to you: if you relieve us of the plague, we will believe you and let the Children of Israel go with you.'" (Abdel Haleem)

*(Their urgency to call upon Allah immediately when calamity struck — لَمَّا وَقَعَ, "as soon as it fell" — illustrates the principle of prompt response. As the Prophet (ﷺ) said, the best deed is prayer at its earliest time (Bukhari 527).)*

**II. Hadith**


### Sahih Bukhari 527
Narrated Ibn Mas'ud: I asked the Prophet (ﷺ), "Which deed is the best?" He replied, "To offer the prayers at their early stated fixed times." I asked, "What is the next (in goodness)?" He replied, "To be good and dutiful to your parents." I further asked, "What is the next?" He replied, "To participate in Jihad in Allah's Cause."
*(Grade: Sahih)*`,
          description: `**Why?**

The Prophet (SAW) was asked which deed is best and said: "Prayer at its proper time" (Bukhari/Muslim). Praying at the earliest time demonstrates eagerness to meet Allah and prevents the prayer from being crowded out by later obligations.


**How?**

For one week, aim to begin each prayer within 15 minutes of the adhan. Note your prayer time app's adhan alert and treat it as a hard deadline, not a suggestion. If you find certain prayers difficult to pray early, identify why and adjust your schedule accordingly.` },
      ],
    },
    {
      title: 'Learn the correct method of wudu with all fard and sunnah acts',
      priority: 'high', tags: ['salah', 'wudu'],
      description: 'Wudu is the key to salah. Learn the obligatory and recommended acts to ensure your purification is valid and complete.',
      subtasks: [
        { title: 'Learn the four fard acts of wudu (Hanafi) or six (Shafi\'i)', done: false,
          sources: `**I. Quran**


### Quran (5:6)
**Arabic:** يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا قُمْتُمْ إِلَى الصَّلَاةِ فَاغْسِلُوا وُجُوهَكُمْ وَأَيْدِيَكُمْ إِلَى الْمَرَافِقِ وَامْسَحُوا بِرُءُوسِكُمْ وَأَرْجُلَكُمْ إِلَى الْكَعْبَيْنِ  
**Translation:** O you who believe, when you rise to pray, wash your faces and your hands up to the elbows, wipe over your heads, and wash your feet to the ankles.

**II. Hadith**


### Sahih Bukhari 159
The Prophet (SAW) performed wudu: he washed his face, washed his arms up to the elbows, wiped his head, and washed his feet up to the ankles.
*(Grade: Sahih)*`,
          description: `**Why?**

Your salah is only valid if your wudu is valid. Knowing the fard acts of wudu according to your madhab ensures that every prayer you perform stands on a sound foundation of purification.


**How?**

Study the fard acts according to your madhab. Hanafi fard: wash face, wash arms to elbows, wipe one-quarter of the head, wash feet to ankles. Shafi'i adds intention (niyyah) and proper order (tartib). Consult a reliable fiqh manual and practice until you can list the fard acts from memory.` },
        { title: 'Learn the sunnah acts (miswak, rinsing mouth/nose, between fingers)', done: false,
          sources: `**I. Hadith**


### Sahih Muslim 604
A'isha reported:The Messenger of Allah (ﷺ) said: Ten are the acts according to fitra: clipping the moustache, letting the beard grow, using the tooth-stick, snuffing water in the nose, cutting the nails, washing the finger joints, plucking the hair under the armpits, shaving the pubes and cleaning one's private parts with water. The narrator said: I have forgotten the tenth, but it may have been rinsing the mouth
*(Grade: Sahih)*`,
          description: `**Why?**

The sunnah acts of wudu perfect your purification and multiply your reward. They follow the example of the Prophet (SAW), who performed wudu with care and completeness. Neglecting them means leaving reward on the table.


**How?**

Learn and incorporate these sunnah acts: using miswak before wudu, saying bismillah, rinsing the mouth and nose, washing between the fingers and toes, wiping the ears, and starting with the right side before the left. Add them one at a time until the full sunnah wudu becomes your default.` },
        { title: 'Learn what nullifies wudu', done: false,
          sources: `**I. Quran**


### Quran (5:6)
**Arabic:** وَإِن كُنتُم مَّرْضَىٰ أَوْ عَلَىٰ سَفَرٍ أَوْ جَاءَ أَحَدٌ مِّنكُم مِّنَ الْغَائِطِ أَوْ لَامَسْتُمُ النِّسَاءَ فَلَمْ تَجِدُوا مَاءً فَتَيَمَّمُوا صَعِيدًا طَيِّبًا  
**Translation:** And if you are ill or on a journey or one of you comes from the place of relieving himself or you have contacted women and find no water, then seek clean earth and wipe over your faces and your hands from it.

**II. Hadith**


### Sahih Bukhari 135
The Prophet (SAW) said: "The prayer of a person who does hadath (passes wind, etc.) is not accepted till he performs wudu."
*(Grade: Sahih)*`,
          description: `**Why?**

If your wudu is unknowingly broken, every prayer you perform afterward may be invalid. Knowing the nullifiers protects the integrity of your worship and gives you confidence that your salah counts.


**How?**

Study the agreed-upon nullifiers: anything exiting the front or back passage, sleep, and loss of consciousness. Then learn the madhab-specific ones: touching private parts directly (Shafi'i fiqh), skin-to-skin contact with the opposite gender (Shafi'i), and eating camel meat (Hanbali). Consult a fiqh reference for your madhab's position.` },
        { title: 'Practice performing wudu with correct sequence and du\'a', done: false,
          sources: `**I. Quran**


### Quran (5:6)
**Arabic:** يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا قُمْتُمْ إِلَى الصَّلَاةِ فَاغْسِلُوا وُجُوهَكُمْ وَأَيْدِيَكُمْ إِلَى الْمَرَافِقِ وَامْسَحُوا بِرُءُوسِكُمْ وَأَرْجُلَكُمْ إِلَى الْكَعْبَيْنِ  
**Translation:** You who believe, when you are about to pray, wash your faces and your hands up to the elbows, wipe your heads, wash your feet up to the ankles.

**I. Hadith**


### Sahih Muslim 245
The Prophet (SAW) said: "No one performs wudu and does it well, then prays two rak'at with full attention, except that Paradise becomes guaranteed for him."
*(Grade: Sahih)*`,
          description: `**Why?**

The du'a after wudu is a sunnah that seals your purification with remembrance of Allah. The Prophet (SAW) said that whoever performs wudu then recites the Shahada, the eight gates of Jannah are opened for them (Muslim).


**How?**

After completing wudu, recite the Shahada followed by the du'a: "Allahummaj'alni minat-tawwabin waj'alni minal-mutatohhirin" (O Allah, make me among those who repent and among those who purify themselves). Practice this after every wudu until it becomes second nature.` },
      ],
    },
    {
      title: 'Memorise the adhkar recited in salah (Subhanaka, Tashahhud, Salawat)',
      priority: 'high', tags: ['salah', 'memorisation'],
      description: 'Ensure you know the essential recitations of prayer with correct Arabic pronunciation and understand their meanings.',
      subtasks: [
        { title: 'Memorise the opening du\'a (Subhanaka Allahumma or equivalent)', done: false,
          sources: `**I. Hadith**


### Sahih Bukhari 4293
Narrated 'Aishah (ra):The Prophet (ﷺ) used to say in his bowings and prostrations, "Subhanaka Allahumma Rabbanã wa bihamdika, Allãhumma ighfirli" (Glorified be You, O Allah, our Lord! All the praises are for You. O Allah, forgive me)
*(Grade: Sahih)*

### Sahih Bukhari 794
Narrated \`Aisha:The Prophet (ﷺ) used to say in his bowing and prostrations, "Subhanaka l-lahumma Rabbana wa bihamdika; Allahumma ghfir li.' (Exalted [from unbecoming attributes] Are you O Allah our Lord, and by Your praise [do I exalt You]. O Allah! Forgive me
*(Grade: Sahih)*

### Sahih Bukhari 817
Narrated \`Aisha:The Prophet (ﷺ) used to say frequently in his bowing and prostrations "Subhanaka l-lahumma Rabbana wa bihamdika, Allahumma ghfir li" (Exalted [from unbecoming attributes] Are you O Allah our Lord, and by Your praise [do I exalt you]. O Allah! Forgive me). In this way [??] he was acting on what was explained to him in the Holy Qur'an
*(Grade: Sahih)*`,
          description: `**Why?**

The opening du'a sets the tone for your entire prayer. It is the first words you speak to Allah after entering salah, and it centres your heart on His glory and perfection before you begin reciting the Quran.


**How?**

Memorise the du'a al-istiftah recited after the takbirat al-ihram: "Subhanaka Allahumma wa bihamdika, wa tabaraka-smuka, wa ta'ala jadduka, wa la ilaha ghayruk." Recite it slowly in each prayer, reflecting on its meaning: you are glorifying Allah, praising Him, and declaring His unmatched greatness.` },
        { title: 'Memorise the Tashahhud (At-Tahiyyatu)', done: false,
          sources: `**I. Hadith**


### Sahih Bukhari 830
Narrated \`Abdullah bin Malik bin Buhaina:Once Allah's Messenger (ﷺ) led us in the Zuhr prayer and got up (after the prostrations of the second rak\`a) although he should have sat (for the Tashahhud). So at the end of the prayer, he prostrated twice while sitting (prostrations of Sahu)
*(Grade: Sahih)*

### Sahih Bukhari 1202
Narrated \`Abdullah bin Mas\`ud:We used to say the greeting, name and greet each other in the prayer. Allah's Messenger (ﷺ) heard it and said:--"Say, 'at-tahiyyatu lil-lahi was-salawatu wat-taiyibatu . Assalamu 'Alaika aiyuha-n-Nabiyu warahmatu- l-lahi wa-barakatuhu. _ Assalamu alaina wa-'ala 'ibadi-l-lahi as-salihin.. Ashhadu an la ilaha illa-l-lah wa ashhadu anna Muhammadan \`Abdu hu wa Rasuluh. (All the compliments are for Allah and all the prayers and all the good things (are for Allah). Peace be on you, O Prophet, and Allah's mercy and blessings (are on you). And peace be on us and on the good (pious) worshipers of Allah. I testify that none has the right to be worshipped but Allah and that Muhammad is His slave and Apostle.) So, when you have said this, then you have surely sent the greetings to every good (pious) worshipper of Allah, whether he be in the Heaven or on the Earth
*(Grade: Sahih)*`,
          description: `**Why?**

The Tashahhud is a conversation that took place during the Prophet's Mi'raj (night ascension). When you recite it, you are re-enacting a greeting of peace between Allah, His Messenger, and the righteous -- placing yourself in that sacred exchange.


**How?**

Memorise "At-Tahiyyatu lillahi was-salawatu wat-tayyibatu, as-salamu 'alayka ayyuhan-nabiyyu wa rahmatullahi wa barakatuh, as-salamu 'alayna wa 'ala 'ibadillahis-salihin." Recite it in the sitting position after every two rak'at. Study the meaning of each phrase so that the words carry weight in your heart.` },
        { title: 'Memorise the Salawat upon the Prophet (Allahumma salli ala Muhammad)', done: false,
          sources: `**I. Quran**


### Quran (2:23)
**Arabic:** وَإِن كُنتُمْ فِي رَيْبٍ مِّمَّا نَزَّلْنَا عَلَىٰ عَبْدِنَا فَأْتُوا بِسُورَةٍ مِّن مِّثْلِهِ وَادْعُوا شُهَدَاءَكُم مِّن دُونِ اللَّهِ إِن كُنتُمْ صَادِقِينَ
**Translation:** And if you are in doubt about what We have sent down [i.e., the Qur’ān] upon Our Servant [i.e., Prophet Muḥammad (ﷺ)], then produce a sūrah the like thereof and call upon your witnesses [i.e., supporters] other than Allāh, if you should be truthful.

**II. Hadith**


### Sahih Bukhari 1120
Narrated Ibn \`Abbas:When the Prophet (ﷺ) got up at night to offer the Tahajjud prayer, he used to say: Allahumma lakal-hamd. Anta qaiyyimus-samawati wal-ard wa man fihinna. Walakal-hamd, Laka mulkus-samawati wal-ard wa man fihinna. Walakal-hamd, anta nurus-samawati wal-ard. Wa lakal-hamd, anta-l-haq wa wa'duka-lhaq, wa liqa'uka Haq, wa qauluka Haq, wal-jannatu Han wan-naru Haq wannabiyuna Haq. Wa Muhammadun, sallal-lahu'alaihi wasallam, Haq, was-sa'atu Haq. Allahumma aslamtu Laka wabika amantu, wa 'Alaika tawakkaltu, wa ilaika anabtu wa bika khasamtu, wa ilaika hakamtu faghfir li ma qaddamtu wama akh-khartu wama as-rartu wama'a lantu, anta-l-muqaddim wa anta-l-mu akh-khir, la ilaha illa anta (or la ilaha ghairuka). (O Allah! All the praises are for you, You are the Holder of the Heavens and the Earth, And whatever is in them. All the praises are for You; You have the possession of the Heavens and the Earth And whatever is in them. All the praises are for You; You are the Light of the Heavens and the Earth And all the praises are for You; You are the King of the Heavens and the Earth; And all the praises are for You; You are the Truth and Your Promise is the truth, And to meet You is true, Your Word is the truth And Paradise is true And Hell is true And all the Prophets (Peace be upon them) are true; And Muhammad is true, And the Day of Resurrection is true. O Allah ! I surrender (my will) to You; I believe in You and depend on You. And repent to You, And with Your help I argue (with my opponents, the non-believers) And I take You as a judge (to judge between us). Please forgive me my previous And future sins; And whatever I concealed or revealed And You are the One who make (some people) forward And (some) backward. There is none to be worshipped but you . Sufyan said that \`Abdul Karim Abu Umaiya added to the above, 'Wala haula Wala quwata illa billah' (There is neither might nor power except with Allah)
*(Grade: Sahih)*

### Sahih Bukhari 6357
Narrated \`Abdur-Rahman bin Abi Laila:Ka\`b bin 'Ujra met me and said, "Shall I give you a present? Once the Prophet (ﷺ) came to us and we said, 'O Allah's Messenger (ﷺ) ! We know how to greet you; but how to send 'Salat' upon you? He said, 'Say: Allahumma Salli ala Muhammadin wa 'ala \`Ali Muhammadin, kama sal-laita 'ala all Ibrahima innaka Hamidun Majid. Allahumma barik 'ala Muhammadin wa 'ala all Muhammadin, kama barakta 'ala all Ibrahima, innaka Hamidun Majid
*(Grade: Sahih)*

### Sahih Bukhari 4797
Narrated Ka\`b bin Ujra:It was said, "O Allah's Messenger (ﷺ)! We know how to greet you, but how to invoke Allah for you?" The Prophet said, "Say: Allahumma salli ala Muhammadin wa'ala \`Ali Muhammaddin, kama sallaita 'ala all Ibrahim, innaka Hamidun Majid
*(Grade: Sahih)*`,
          description: `**Why?**

Sending salawat upon the Prophet (SAW) in prayer fulfils a direct command from Allah (Quran 33:56). It connects you to the blessed legacy of Ibrahim (AS) and Muhammad (SAW), and the angels send blessings upon you in return.


**How?**

Memorise the Ibrahimiyyah: "Allahumma salli 'ala Muhammadin wa 'ala ali Muhammad, kama sallayta 'ala Ibrahim wa 'ala ali Ibrahim, innaka Hamidun Majid. Allahumma barik 'ala Muhammadin wa 'ala ali Muhammad, kama barakta 'ala Ibrahim wa 'ala ali Ibrahim, innaka Hamidun Majid." Recite it in the final sitting of every prayer.` },
        { title: 'Memorise the du\'a before salam', done: false,
          sources: `**I. Quran**


### Quran (56:26)
**Arabic:** إِلَّا قِيلًا سَلَامًا سَلَامًا
**Translation:** "only clean and wholesome speech." (Abdel Haleem)

*(The last words heard in Paradise are salām — peace. The du'a before salam is the final supplication of prayer, a moment to ask for peace and protection before entering back into the world.)*

**II. Hadith**


### Sahih Bukhari 835
Narrated Abu Huraira: The Prophet (ﷺ) said, "When any one of you finishes the last Tashahhud, he should seek refuge with Allah from four things: from the punishment of Hell, from the punishment of the grave, from the trials of life and death, and from the evil of the Dajjal."
*(Grade: Sahih)*`,
          description: `**Why?**

The Prophet (SAW) specifically instructed Muslims to seek refuge from these four trials before the salam. This du'a is so important that some scholars consider it obligatory. It is your last supplication before closing the prayer.


**How?**

After the Salawat Ibrahimiyyah, recite: "Allahumma inni a'udhu bika min 'adhabi jahannam, wa min 'adhabil-qabr, wa min fitnatil-mahya wal-mamat, wa min fitnatil-masihid-dajjal." Memorise it and understand each of the four things you are seeking protection from: Hellfire, the grave, the trials of life and death, and the Dajjal.` },
        { title: 'Learn the meanings of each recitation', done: false,
          sources: `**I. Quran**


### Quran (1:1-5)
**Arabic:** بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۝ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۝ الرَّحْمَٰنِ الرَّحِيمِ ۝ مَالِكِ يَوْمِ الدِّينِ ۝ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ  
**Translation:** In the name of Allah, the Most Gracious, the Most Merciful. All praise is due to Allah, Lord of the worlds. The Most Gracious, the Most Merciful. Master of the Day of Judgment. You alone we worship, and You alone we ask for help.

**II. Hadith**


### Sahih Muslim 395
The Prophet (SAW) said: "Allah said: I have divided the prayer between Myself and My servant into two halves. When the servant says 'Al-hamdu lillahi rabbil-alamin,' Allah says: My servant has praised Me."
*(Grade: Sahih — Hadith Qudsi)*`,
          description: `**Why?**

When you understand what you are saying, your prayer transforms from mechanical repetition into a living conversation with Allah. Khushu' (humility and focus) becomes natural when the words carry meaning in your heart.


**How?**

Take each adhkar you have memorised (opening du'a, Tashahhud, Salawat, du'a before salam) and study a word-by-word translation. Write the meaning in your own words. Before each prayer, pick one recitation to focus on its meaning. Over time, the meanings will settle into your consciousness.` },
      ],
    },
    {
      title: 'Pray in congregation (jama\'ah) whenever possible',
      priority: 'high', tags: ['salah', 'jamaah'],
      description: 'Prayer in congregation carries 27 times the reward. Make it a priority to attend the masjid or pray with family when possible.',
      subtasks: [
        { title: 'Identify the nearest masjid and its prayer times', done: false,
          sources: `**I. Hadith**


### Sahih Bukhari 1767
Narrated Nafi\`:Ibn \`Umar used to spend the night at Dhi-Tuwa in between the two Thaniyas and then he would enter Mecca through the Thaniya which is at the higher region of Mecca, and whenever he came to Mecca for Hajj or \`Umra, he never made his she camel kneel down except near the gate of the Masjid (Sacred Mosque) and then he would enter (it) and go to the Black (stone) Corner and start from there circumambulating the Ka\`ba seven times: hastening in the first three rounds (Ramal) and walking in the last four. On finishing, he would offer two rak\`at prayer and set out to perform Tawaf between Safa and Marwa before returning to his dwelling place. On returning (to Medina) from Hajj or \`Umra, he used to make his camel kneel down at Al-Batha which is at Dhul-Hulaifa, the place where the Prophet used to make his camel kneel down
*(Grade: Sahih)*`,
          description: `**Why?**

You cannot consistently pray in congregation if you do not know where and when. Identifying your nearest masjid and its schedule removes logistical uncertainty and makes attending jama'ah a realistic daily commitment.


**How?**

Search online or use apps (like Salah Times or Google Maps) to find the nearest masjid. Note its prayer schedule, including any seasonal adjustments. Calculate your travel time and determine which prayers you can feasibly attend. Save the schedule on your phone for easy reference.` },
        { title: 'Commit to praying at least one salah daily in jama\'ah', done: false,
          sources: `**I. Quran**

### Quran (2:43)
**Arabic:** وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ وَارْكَعُوا مَعَ الرَّاكِعِينَ  
**Translation:** Keep up the prayer, pay the prescribed alms, and bow your heads [in worship] with those who bow theirs.

### Quran (4:102)
**Arabic:** وَإِذَا كُنتَ فِيهِمْ فَأَقَمْتَ لَهُمُ الصَّلَاةَ فَلْتَقُمْ طَائِفَةٌ مِّنْهُم مَّعَكَ  
**Translation:** When you [Prophet] are with the believers, leading them in prayer, let a group of them stand up in prayer with you, taking their weapons with them.

**II. Hadith**

### Sahih al-Bukhari 645
The Prophet (peace be upon him) said: "The prayer in congregation is twenty-seven times superior to the prayer offered by a person alone."
*(Grade: Sahih)*

### Sahih Muslim 654
The Prophet (peace be upon him) said: "I was about to order the prayer to be established and then order a man to lead the people in prayer, and then I would go with some men carrying bundles of wood to people who do not attend the prayer and burn their houses down on them."
*(Grade: Sahih)*`,
          description: `**Why?**

Committing to just one prayer in congregation daily builds the habit without overwhelming your schedule. The Prophet (SAW) said that the reward for prayer in congregation is 27 times that of praying alone -- even one daily jama'ah multiplies your reward significantly.


**How?**

Choose the prayer that is most feasible for you to attend at the masjid -- Fajr if you live nearby, Isha if evenings work better, or Dhuhr if you work near a masjid. Commit to attending that one prayer in congregation every day for two weeks. Once it becomes routine, add a second prayer.` },
        { title: 'If no masjid is nearby, establish jama\'ah at home with family', done: false,
          sources: `**I. Hadith**


### Sahih Bukhari 1572
Ibn 'Abbas said that he has been asked regarding Hajj-at-Tamattu' on which he said:"The Muhajirin and the Ansar and the wives of the Prophet (ﷺ) and we did the same. When we reached Makkah, Allah's Messenger (ﷺ) said, "Give up your intention of doing the Hajj (at this moment) and perform 'Umra, except the one who had garlanded the Hady." So, we performed Tawaf round the Ka'bah and [Sa'y] between As-safa and Al-MArwa, slept with our wives and wore ordinary (stitched) clothes. The Prophet (ﷺ) added, "Whoever has garlanded his Hady is not allowed to finish the Ihram till the Hady has reached its destination (has been sacrificed)". Then on the night of Tarwiya (8th Dhul Hijjah, in the afternoon) he ordered us to assume Ihram for Hajj and when we had performed all the ceremonies of Hajj, we came and performed Tawaf round the Ka'bah and (Sa'y) between As-Safa and Al-Marwa, and then our Hajj was complete, and we had to sacrifice a Hady according to the statement of Allah: "... He must slaughter a Hady such as he can afford, but if he cannot afford it, he should observe Saum (fasts) three days during the Hajj and seven days after his return (to his home)…." (V. 2:196). And the sacrifice of the sheep is sufficient. So, the Prophet (ﷺ) and his Companions joined the two religious deeds, (i.e. Hajj and 'Umra) in one year, for Allah revealed (the permissibility) of such practice in His book and in the Sunna (legal ways) of His Prophet (ﷺ) and rendered it permissible for all the people except those living in Makkah. Allah says: "This is for him whose family is not present at the Al-Masjid-Al-Haram, (i.e. non resident of Makkah)." The months of Hajj which Allah mentioned in His book are: Shawwal, Dhul-Qa'da and Dhul-Hijjah. Whoever performed Hajj-at-Tamattu' in those months, then slaughtering or fasting is compulsory for him. The words: 1. Ar-Rafatha means sexual intercourse. 2. Al-Fasuq means all kinds of sin, and 3. Al-Jidal means to dispute
*(Grade: Sahih)*`,
          description: `**Why?**

Jama'ah is not limited to the masjid. The Prophet (SAW) said prayer in congregation is 27 degrees better than praying alone. Even two people constitute a jama'ah, so there is almost always an opportunity to earn this multiplied reward at home.


**How?**

If you cannot reach a masjid, establish jama'ah at home. Pray with your spouse, child, parent, or roommate. One person leads (imam) and the other stands to the right. Teach family members the basics of following the imam if they are unfamiliar. Make it a household routine.` },
      ],
    },
    {
      title: 'Learn the conditions that invalidate salah',
      priority: 'medium', tags: ['salah', 'fiqh'],
      description: 'Know what actions or omissions break the prayer so you can avoid them and know when to repeat a prayer.',
      subtasks: [
        { title: 'Study the acts that invalidate salah (talking, eating, turning away)', done: false,
          sources: `**I. Quran**


### Quran (4:103)
**Arabic:** إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا  
**Translation:** Prayer is obligatory for the believers at prescribed times.

**I. Hadith**


### Sahih Bukhari 6251
The Prophet (SAW) said: "The prayer of a person who does hadath (breaks wudu) is not accepted until he performs wudu again."
*(Grade: Sahih)*`,
          description: `**Why?**

If you unknowingly do something that invalidates your prayer, you may walk away thinking you have fulfilled your obligation when in fact you have not. Knowledge of invalidators protects the integrity of every salah you perform.


**How?**

Study the major invalidators: deliberate speech, eating or drinking, excessive continuous movement, turning the chest away from the qiblah, and laughing out loud. Learn the difference between what invalidates the prayer entirely versus what merely diminishes its reward. Use a fiqh manual specific to your madhab.` },
        { title: 'Learn the ruling on excessive movement in salah', done: false,
          sources: `**I. Quran**


### Quran (2:238)
**Arabic:** حَافِظُوا عَلَى الصَّلَوَاتِ وَالصَّلَاةِ الْوُسْطَىٰ وَقُومُوا لِلَّهِ قَانِتِينَ  
**Translation:** Maintain with care the prayers and the middle prayer, and stand before Allah devoutly obedient.

**II. Hadith**


### Sahih Bukhari 1222
The Prophet (SAW) said: "If any one of you becomes uncertain during his prayer and does not know how many he has prayed, let him cast aside his doubt and build upon what is certain."
*(Grade: Sahih — narrated in Sahih Muslim 571)*`,
          description: `**Why?**

Understanding the boundary between permissible and excessive movement prevents you from either invalidating your prayer through carelessness or becoming unnecessarily anxious about minor, natural movements during salah.


**How?**

Study the scholarly position of your madhab on movement in salah. In the Hanafi and Shafi'i schools, three consecutive unnecessary movements invalidate the prayer. Brief, necessary movements (scratching an itch, adjusting a garment) are permissible. Practice stillness in prayer and minimise fidgeting.` },
        { title: 'Understand when sujud al-sahw (prostration of forgetfulness) is required', done: false,
          sources: `**I. Hadith**


### Sahih Bukhari 6051
Narrated Abu Huraira:The Prophet (ﷺ) led us in the Zuhr prayer, offering only two rak\`at and then (finished it) with Taslim, and went to a piece of wood in front of the mosque and put his hand over it. Abu Bakr and \`Umar were also present among the people on that day but dared not talk to him (about his unfinished prayer). And the hasty people went away, wondering. "Has the prayer been shortened" Among the people there was a man whom the Prophet (ﷺ) used to call Dhul-Yadain (the longarmed). He said, "O Allah's Prophet! Have you forgotten or has the prayer been shortened?" The Prophet (ﷺ) said, "Neither have I forgotten, nor has it been shortened." They (the people) said, "Surely, you have forgotten, O Allah's Messenger (ﷺ)!" The Prophet (ﷺ) said, Dhul-Yadain has told the truth." So the Prophet (ﷺ) got up and offered other two rak\`at and finished his prayer with Taslim. Then he said Takbir, performed a prostration of ordinary duration or longer, then he raised his head and said Takbir and performed another prostration of ordinary duration or longer and then raised his head and said Takbir (i.e. he performed the two prostrations of Sahu, i.e., forgetfulness)
*(Grade: Sahih)*

### Sahih Bukhari 1222
Narrated Abu Huraira:Allah's Messenger (ﷺ) said, "When the Adhan for the prayer is pronounced, then Satan takes to his heels passing wind so that he may not hear the Adhan and when the Mu'adh-dhin finishes, he comes back; and when the Iqama is pronounced he again takes to his heels and when it is finished, he again comes back and continues reminding the praying person of things that he used not to remember when not in prayer till he forgets how much he has prayed." Abu Salama bin \`Abdur-Rahman said, "If anyone of you has such a thing (forgetting the number of rak\`at he has prayed) he should perform two prostrations of Sahu (i.e. forgetfulness) while sitting." Abu Salama narrates this from Abu Huraira
*(Grade: Sahih)*

### Sahih Bukhari 3285
Narrated Abu Huraira:The Prophet (ﷺ) said, "When the call for the prayer is pronounced, Satan takes to his heels, passing wind with noise, When the call for the prayer is finished, he comes back. And when the Iqama is pronounced, he again takes to his heels, and after its completion, he returns again to interfere between the (praying) person and his heart, saying to him. 'Remember this or that thing.' till the person forgets whether he has offered three or four rak\`at: so if one forgets whether he has prayed three or four rak\`at, he should perform two prostrations of Sahu (i.e. forgetfulness)
*(Grade: Sahih)*`,
          description: `**Why?**

Everyone makes mistakes in prayer. Sujud al-sahw is Allah's mercy -- a built-in mechanism to repair your salah when you forget something or add an extra act. Without knowing when and how to perform it, you may leave valid prayers unrepaired.


**How?**

Learn the three scenarios that require sujud al-sahw: addition (e.g., praying five rak'at instead of four), omission (e.g., skipping the first Tashahhud), and doubt (e.g., unsure if you prayed three or four rak'at). Study whether your madhab performs it before or after the salam. Practice by reviewing common scenarios.` },
      ],
    },
  ],
  faith_salah_growth: [
    {
      title: 'Establish the 12 regular Sunnah prayers (Rawatib)',
      priority: 'high', tags: ['salah', 'sunnah'],
      description: 'The Prophet (SAW) regularly prayed 12 rak\'at of Sunnah with the fard prayers. A house in Jannah is built for whoever maintains them.',
      subtasks: [
        { title: '2 before Fajr', done: false,
          sources: `**I. Quran**


### Quran (17:78)
**Arabic:** أَقِمِ الصَّلَاةَ لِدُلُوكِ الشَّمْسِ إِلَىٰ غَسَقِ اللَّيْلِ وَقُرْآنَ الْفَجْرِ ۖ إِنَّ قُرْآنَ الْفَجْرِ كَانَ مَشْهُودًا  
**Translation:** Establish prayer at the decline of the sun until the darkness of the night and the Quran at dawn. Indeed, the recitation of dawn is ever witnessed.

**II. Hadith**


### Sahih Muslim 728
The Prophet (SAW) said: "Whoever prays twelve rak'ahs during the day and night, a house will be built for him in Paradise: two before Fajr, four before Dhuhr, two after Dhuhr, two after Maghrib, and two after Isha."
*(Grade: Sahih)*`,
          description: `**Why?**

The Prophet (SAW) said the two rak'at before Fajr are "better than the world and everything in it" (Muslim). He never missed them, even while travelling. This is the most emphasised of all Sunnah Rawatib prayers.


**How?**

Pray two light rak'at after the Fajr adhan and before the fard prayer. Recite short surahs (such as Al-Kafirun in the first rak'ah and Al-Ikhlas in the second, as was the Prophet's practice). Keep the prayer brief and focused.` },
        { title: '4 before Dhuhr and 2 after', done: false,
          sources: `**I. Hadith**


### Sahih Muslim 728
The Prophet (SAW) said: "Whoever prays twelve rak'at during the day and night, a house will be built for him in Paradise: four before Dhuhr, two after Dhuhr, two after Maghrib, two after Isha, and two before Fajr."
*(Grade: Sahih)*`,
          description: `**Why?**

The Prophet (SAW) was consistent with the Dhuhr Sunnah prayers and said: "Whoever is regular with four rak'at before Dhuhr and four after, the Fire will not touch him" (Tirmidhi). These prayers form the largest block of the daily Rawatib.


**How?**

Pray four rak'at (two sets of two, or four continuous with one salam) before the Dhuhr fard, and two rak'at after the Dhuhr fard. Build this into your midday routine so it becomes automatic.` },
        { title: '2 after Maghrib', done: false,
          sources: `**I. Hadith**


### Sahih Muslim 728
The Prophet (SAW) said: "Whoever prays twelve rak'ahs during the day and night, a house will be built for him in Paradise: ...two after Maghrib..."
*(Grade: Sahih)*

### Sahih Bukhari 1163
The Prophet (SAW) never abandoned the two rak'ahs after Maghrib, whether at home or while traveling.
*(Grade: Sahih)*`,
          description: `**Why?**

The Maghrib Sunnah prayers are part of the twelve Rawatib that build a house in Jannah. The Prophet (SAW) would often pray them at home, indicating the value of bringing prayer into the household.


**How?**

Immediately after completing the fard of Maghrib, pray two rak'at of Sunnah. If you are at the masjid, you may pray them there or return home first. The key is consistency -- do not skip them due to the short Maghrib window.` },
        { title: '2 after Isha', done: false,
          sources: `**I. Hadith**


### Sahih Muslim 728
The Prophet (SAW) said: "Whoever prays twelve rak'ahs during the day and night, a house will be built for him in Paradise: ...two after Isha..."
*(Grade: Sahih)*

### Sahih Muslim 882
The Prophet (SAW) said: "Between every two adhans (adhan and iqamah) there is a prayer. Between every two adhans there is a prayer." Then he said on the third time: "For whoever wills."
*(Grade: Sahih)*`,
          description: `**Why?**

These two rak'at after Isha complete the twelve daily Rawatib. The Prophet (SAW) said: "Whoever prays twelve rak'at during the day and night, a house will be built for him in Jannah" (Muslim). Every night, you have the chance to add to your palace in paradise.


**How?**

After the fard of Isha, pray two rak'at of Sunnah before moving on to Witr or other activities. Make it a non-negotiable part of your evening routine.` },
        { title: 'Track consistency for one month', done: false,
          sources: `**I. Hadith**


### Sahih Muslim 728
The Prophet (SAW) said: "Whoever prays twelve rak'at during the day and night, a house will be built for him in Paradise." Consistency in performing these Rawatib prayers is the key to this reward.
*(Grade: Sahih)*

### Sahih Bukhari 6464
The Prophet (SAW) said: "The most beloved deeds to Allah are those done consistently, even if they are small."
*(Grade: Sahih)*`,
          description: `**Why?**

Consistency is the key to making the Rawatib a permanent part of your life. A month of tracking transforms a new practice into an established habit and reveals exactly where your weak spots are.


**How?**

Create a simple daily checklist with four entries: 2 before Fajr, 4+2 around Dhuhr, 2 after Maghrib, 2 after Isha. Check off each one daily for 30 consecutive days. At the end of the month, review which Rawatib you missed most frequently and address the underlying cause.` },
      ],
    },
    {
      title: 'Learn the meanings of Surah Al-Fatihah and what you recite in salah',
      priority: 'high', tags: ['salah', 'quran'],
      description: 'Al-Fatihah is recited in every rak\'ah. Understanding its meaning transforms your salah from ritual to conversation with Allah.',
      subtasks: [
        { title: 'Study the word-by-word meaning of Al-Fatihah', done: false,
          sources: `**I. Quran**


### Quran (1:1-7)
**Arabic:** بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۝ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۝ الرَّحْمَٰنِ الرَّحِيمِ ۝ مَالِكِ يَوْمِ الدِّينِ ۝ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ۝ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ۝ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ  
**Translation:** In the name of Allah, the Most Gracious, the Most Merciful. All praise is due to Allah, Lord of the worlds. The Most Gracious, the Most Merciful. Master of the Day of Judgment. You alone we worship, and You alone we ask for help. Guide us to the straight path. The path of those upon whom You have bestowed favor, not of those who have earned anger nor of those who are astray.

**II. Hadith**


### Sahih Muslim 395
The Prophet (SAW) said: "Allah said: I have divided the prayer between Myself and My servant into two halves, and My servant shall have what he has asked for."
*(Grade: Sahih — Hadith Qudsi)*`,
          description: `**Why?**

Al-Fatihah is not a monologue -- it is a dialogue. In a hadith qudsi (Muslim), Allah responds to each verse: when you say "Alhamdulillahi Rabbil Alamin," Allah says "My servant has praised Me." Knowing this transforms every rak'ah into a personal conversation with your Lord.


**How?**

Study a word-by-word translation of Al-Fatihah. Then read the hadith qudsi in Sahih Muslim that describes Allah's response to each verse. During your next prayer, pause briefly after each ayah and imagine the response. Repeat this practice until the awareness becomes natural.` },
        { title: 'Learn the meaning of the adhkar of ruku and sujud', done: false,
          sources: `**I. Hadith**


### Sahih Muslim 867
Abu Salama reported:Abu Huraira led prayer for them and recited takbir when he bent and raised himself (in ruku' and sujud) and after completing (the prayer) he said: By Allah I say prayer which has the best resemblance with the prayer of the Prophet (ﷺ) amongst you
*(Grade: Sahih)*`,
          description: `**Why?**

In ruku you are bowing before Allah's magnificence; in sujud you are prostrating before His supreme highness. The words you recite in these positions match the physical posture -- but only if you understand what you are declaring.


**How?**

Learn the meanings: "Subhana Rabbiyal Adhim" (Glory to my Lord, the Magnificent) is said in ruku, and "Subhana Rabbiyal A'la" (Glory to my Lord, the Most High) is said in sujud. Reflect on why "Magnificent" pairs with bowing and "Most High" pairs with the lowest physical position. Say each at least three times, as the Prophet (SAW) did.` },
        { title: 'Memorise and understand three short surahs you recite regularly', done: false,
          sources: `**I. Quran**


### Quran (4:103)
**Arabic:** إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا  
**Translation:** Indeed, prayer has been decreed upon the believers at specified times.

**II. Hadith**


### Sahih Bukhari 5013
The Prophet (SAW) said: "The best of you are those who learn the Quran and teach it."
*(Grade: Sahih)*`,
          description: `**Why?**

Most people rotate a small number of short surahs in prayer. If you understand the meaning of even three surahs deeply, a large portion of your daily salah becomes a conscious act of reflection rather than rote repetition.


**How?**

Choose three surahs you commonly recite after Al-Fatihah (e.g., Al-Ikhlas, Al-Falaq, An-Nas). For each, study a word-by-word translation and a brief tafsir. Write the core message of each surah in one sentence. In your next prayer, recite them slowly and connect each word to its meaning.` },
      ],
    },
    {
      title: 'Pray Tahajjud at least once a week',
      priority: 'medium', tags: ['salah', 'qiyam'],
      description: 'The night prayer is among the most beloved voluntary acts. Start with even two rak\'at in the last third of the night.',
      subtasks: [
        { title: 'Set a weekly alarm for the last third of the night', done: false,
          sources: `**I. Quran**


### Quran (17:79)
**Arabic:** وَمِنَ اللَّيْلِ فَتَهَجَّدْ بِهِ نَافِلَةً لَّكَ عَسَىٰ أَن يَبْعَثَكَ رَبُّكَ مَقَامًا مَّحْمُودًا  
**Translation:** And from the night, pray with it as additional worship for you; it is expected that your Lord will raise you to a praised station.

### Quran (51:18)
**Arabic:** وَبِالْأَسْحَارِ هُمْ يَسْتَغْفِرُونَ  
**Translation:** And in the hours before dawn they would ask forgiveness.

**II. Hadith**


### Sahih Muslim 1163
The Prophet (SAW) said: "The best prayer after the obligatory prayers is the night prayer (qiyam al-layl)."
*(Grade: Sahih)*`,
          description: `**Why?**

The last third of the night is the most blessed time for worship. Allah descends to the lowest heaven and calls out: "Who is calling upon Me so I may answer? Who is asking of Me so I may give? Who is seeking My forgiveness so I may forgive?" (Bukhari/Muslim). Waking at this time places you in direct proximity to divine response.


**How?**

Calculate the last third by dividing the time between Isha and Fajr into three equal parts. For example, if Isha is at 9 PM and Fajr at 6 AM, the last third begins at 3 AM. Set a weekly alarm for that time. Start with one night per week and work up from there.` },
        { title: 'Pray at least 2 rak\'at of Tahajjud', done: false,
          sources: `**I. Quran**

### Quran (17:79)
**Arabic:** وَمِنَ اللَّيْلِ فَتَهَجَّدْ بِهِ نَافِلَةً لَّكَ عَسَىٰ أَن يَبْعَثَكَ رَبُّكَ مَقَامًا مَّحْمُودًا
**Translation:** "and during the night wake up and pray, as an extra offering of your own, so that your Lord may raise you to a [highly] praised status." (Abdel Haleem)

**II. Hadith**


### Sahih Bukhari 1109
Narrated Az-Zuhri:Salim told me, "\`Abdullah bin \`Umar said, 'I saw Allah's Messenger (ﷺ) delaying the Maghrib prayer till he offered it along with the \`Isha prayer whenever he was in a hurry during the journey.' " Salim said, "Abdullah bin \`Umar used to do the same whenever he was in a hurry during the journey. After making the call for Iqama, for the Maghrib prayer he used to offer three rak\`at and then perform Taslim. After waiting for a short while, he would pronounce the Iqama for the \`Isha' prayer and offer two rak\`at and perform Taslim. He never prayed any Nawafil in between the two prayers or after the \`Isha' prayers till he got up in the middle of the night (for Tahajjud prayer)
*(Grade: Sahih)*

### Sahih Bukhari 1091
Narrated \`Abdullah bin \`Umar:"I saw Allah's Messenger (ﷺ) delaying the Maghrib prayer till he offered it along with the \`Isha' prayer whenever he was in a hurry during the journey." Salim narrated, "Ibn \`Umar used to do the same whenever he was in a hurry during the journey." And Salim added, "Ibn \`Umar used to pray the Maghrib and \`Isha' prayers together in Al-Muzdalifa." Salim said, "Ibn \`Umar delayed the Maghrib prayer because at that time he heard the news of the death of his wife Safiya bint Abi \`Ubaid. I said to him, 'The prayer (is due).' He said, 'Go on.' Again I said, 'The prayer (is due).' He said, 'Go on,' till we covered two or three miles. Then he got down, prayed and said, 'I saw the Prophet (ﷺ) praying in this way, whenever he was in a hurry during the journey.' \`Abdullah (bin \`Umar) added, "Whenever the Prophet was in a hurry, he used to delay the Maghrib prayer and then offer three rak\`at (of the Maghrib) and perform Taslim, and after waiting for a short while, Iqama used to be pronounced for the \`Isha' prayer when he would offer two rak\`at and perform Taslim. He would never offer any optional prayer till the middle of the night (when he used to pray the Tahajjud)
*(Grade: Sahih)*

### Sahih Bukhari 1092
Narrated \`Abdullah bin \`Umar:"I saw Allah's Messenger (ﷺ) delaying the Maghrib prayer till he offered it along with the \`Isha' prayer whenever he was in a hurry during the journey." Salim narrated, "Ibn \`Umar used to do the same whenever he was in a hurry during the journey." And Salim added, "Ibn \`Umar used to pray the Maghrib and \`Isha' prayers together in Al-Muzdalifa." Salim said, "Ibn \`Umar delayed the Maghrib prayer because at that time he heard the news of the death of his wife Safiya bint Abi \`Ubaid. I said to him, 'The prayer (is due).' He said, 'Go on.' Again I said, 'The prayer (is due).' He said, 'Go on,' till we covered two or three miles. Then he got down, prayed and said, 'I saw the Prophet (ﷺ) praying in this way, whenever he was in a hurry during the journey.' \`Abdullah (bin \`Umar) added, "Whenever the Prophet was in a hurry, he used to delay the Maghrib prayer and then offer three rak\`at (of the Maghrib) and perform Taslim, and after waiting for a short while, Iqama used to be pronounced for the \`Isha' prayer when he would offer two rak\`at and perform Taslim. He would never offer any optional prayer till the middle of the night (when he used to pray the Tahajjud)
*(Grade: Sahih)*`,
          description: `**Why?**

Tahajjud is about quality of connection, not quantity of rak'at. Even two sincere rak'at in the stillness of the night can be more beloved to Allah than lengthy prayers performed without presence of heart.


**How?**

Pray at least two rak'at. Recite at a moderate, unhurried pace. Lengthen your sujud and use that time for personal du'a in your own language. Pour your heart out -- the night prayer is your most private audience with Allah. There is no minimum surah length; recite what you know well.` },
        { title: 'Make du\'a during the sujud of Tahajjud', done: false,
          sources: `**I. Quran**

### Quran (96:19)
**Arabic:** كَلَّا لَا تُطِعْهُ وَاسْجُدْ وَاقْتَرِب
**Translation:** "No! Do not obey him [Prophet]: bow down in worship and draw close." (Abdel Haleem)

*(The command وَاقْتَرِب — "draw close" — comes as the purpose of sujud itself. The sujud of Tahajjud, in the stillness of the night, is the premier moment to draw close to Allah through du'a.)*

**II. Hadith**


### Sahih Bukhari 365
Narrated Abu Huraira:A man stood up and asked the Prophet (ﷺ) about praying in a single garment. The Prophet (ﷺ) said, "Has every one of you two garments?" A man put a similar question to \`Umar on which he replied, "When Allah makes you wealthier then you should clothe yourself properly during prayers. Otherwise one can pray with an Izar and a Rida' (a sheet covering the upper part of the body.) Izar and a shirt, Izar and a Qaba', trousers and a Rida, trousers and a shirt or trousers and a Qaba', Tubban and a Qaba' or Tubban and a shirt." (The narrator added, "I think that he also said a Tubban and a Rida)
*(Grade: Sahih)*`,
          description: `**Why?**

The Prophet (SAW) said: "The closest a servant is to his Lord is when he is in sujud, so increase your du'a therein" (Muslim). Combining the closeness of sujud with the blessed time of the last third of the night creates the most powerful moment for supplication in the entire day.


**How?**

During the sujud of your Tahajjud prayer, make du'a in your own language. Bring your deepest concerns, hopes, and needs before Allah. There is no rush -- stay in sujud as long as you wish. Prepare a mental or written list of du'as beforehand so the moment is not wasted searching for words.` },
      ],
    },
    {
      title: 'Study the inner dimensions of salah (khushu\u02bf)',
      priority: 'medium', tags: ['salah', 'spirituality'],
      description: 'Khushu\u02bf is the soul of salah. Study how scholars describe presence of heart, humility, and focus in prayer.',
      subtasks: [
        { title: 'Read Ibn al-Qayyim\'s description of khushu\u02bf in prayer', done: false,
          sources: `**I. Quran**


### Quran (48:29)
**Arabic:** مُّحَمَّدٌ رَّسُولُ اللَّهِ ۚ وَالَّذِينَ مَعَهُ أَشِدَّاءُ عَلَى الْكُفَّارِ رُحَمَاءُ بَيْنَهُمْ ۖ تَرَاهُمْ رُكَّعًا سُجَّدًا يَبْتَغُونَ فَضْلًا مِّنَ اللَّهِ وَرِضْوَانًا ۖ سِيمَاهُمْ فِي وُجُوهِهِم مِّنْ أَثَرِ السُّجُودِ ۚ ذَٰلِكَ مَثَلُهُمْ فِي التَّوْرَاةِ ۚ وَمَثَلُهُمْ فِي الْإِنجِيلِ كَزَرْعٍ أَخْرَجَ شَطْأَهُ فَآزَرَهُ فَاسْتَغْلَظَ فَاسْتَوَىٰ عَلَىٰ سُوقِهِ يُعْجِبُ الزُّرَّاعَ لِيَغِيظَ بِهِمُ الْكُفَّارَ ۗ وَعَدَ اللَّهُ الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ مِنْهُم مَّغْفِرَةً وَأَجْرًا عَظِيمًا
**Translation:** "Muhammad is the Messenger of God. Those who follow him are harsh towards the disbelievers and compassionate towards each other. You see them kneeling and prostrating, seeking God’s bounty and His good pleasure: on their faces they bear the marks of their prostrations." (Abdel Haleem)

### Quran (30:18)
**Arabic:** وَلَهُ الْحَمْدُ فِي السَّمَاوَاتِ وَالْأَرْضِ وَعَشِيًّا وَحِينَ تُظْهِرُونَ
**Translation:** "praise is due to Him in the heavens and the earth— in the late afternoon, and at midday." (Abdel Haleem)

### Quran (17:78)
**Arabic:** أَقِمِ الصَّلَاةَ لِدُلُوكِ الشَّمْسِ إِلَىٰ غَسَقِ اللَّيْلِ وَقُرْآنَ الْفَجْرِ ۖ إِنَّ قُرْآنَ الْفَجْرِ كَانَ مَشْهُودًا
**Translation:** "So perform the regular prayers in the period from the time the sun is past its zenith till the darkness of the night, and [recite] the Quran at dawn— dawn recitation is always witnessed." (Abdel Haleem)

**II. Hadith**


### Sahih Bukhari 958
Narrated Ibn Juraij:\`Ata' said, "Jabir bin \`Abdullah said, 'The Prophet (ﷺ) went out on the Day of \`Id-ul-Fitr and offered the prayer before delivering the Khutba, Ata told me that during the early days of Ibn Az-Zubair, Ibn \`Abbas had sent a message to him telling him that the Adhan for the \`Id Prayer was never pronounced (in the life time of Allah's Messenger (ﷺ)) and the Khutba used to be delivered after the prayer. Ata told me that Ibn \`Abbas and Jabir bin \`Abdullah, had said, "There was no Adhan for the prayer of \`Id-ul-Fitr and \`Id-ul-Aqha." \`Ata' said, "I heard Jabir bin \`Abdullah saying, 'The Prophet (ﷺ) stood up and started with the prayer, and after it he delivered the Khutba. When the Prophet of Allah (ﷺ) finished (the Khutba), he went to the women and preached to them, while he was leaning on Bilal's hand. Bilal was spreading his garment and the ladies were putting alms in it.' " I said to Ata, "Do you think it incumbent upon an Imam to go to the women and preach to them after finishing the prayer and Khutba?" \`Ata' said, "No doubt it is incumbent on Imams to do so, and why should they not do so?
*(Grade: Sahih)*

### Sahih Bukhari 959
Narrated Ibn Juraij:\`Ata' said, "Jabir bin \`Abdullah said, 'The Prophet (ﷺ) went out on the Day of \`Id-ul-Fitr and offered the prayer before delivering the Khutba, Ata told me that during the early days of Ibn Az-Zubair, Ibn \`Abbas had sent a message to him telling him that the Adhan for the \`Id Prayer was never pronounced (in the life time of Allah's Messenger (ﷺ)) and the Khutba used to be delivered after the prayer. Ata told me that Ibn \`Abbas and Jabir bin \`Abdullah, had said, "There was no Adhan for the prayer of \`Id-ul-Fitr and \`Id-ul-Aqha." \`Ata' said, "I heard Jabir bin \`Abdullah saying, 'The Prophet (ﷺ) stood up and started with the prayer, and after it he delivered the Khutba. When the Prophet of Allah (ﷺ) finished (the Khutba), he went to the women and preached to them, while he was leaning on Bilal's hand. Bilal was spreading his garment and the ladies were putting alms in it.' " I said to Ata, "Do you think it incumbent upon an Imam to go to the women and preach to them after finishing the prayer and Khutba?" \`Ata' said, "No doubt it is incumbent on Imams to do so, and why should they not do so?
*(Grade: Sahih)*

### Sahih Bukhari 621
Narrated \`Abdullah bin Mas\`ud:The Prophet (ﷺ) said, "The Adhan pronounced by Bilal should not stop you from taking Suhur, for he pronounces the Adhan at night, so that the one offering the late night prayer (Tahajjud) from among you might hurry up and the sleeping from among you might wake up. It does not mean that dawn or morning has started." Then he (the Prophet) pointed with his fingers and raised them up (towards the sky) and then lowered them (towards the earth) like this (Ibn Mas\`ud imitated the gesture of the Prophet). Az-Zuhri gestured with his two index fingers which he put on each other and then stretched them to the right and left. These gestures illustrate the way real dawn appears. It spreads left and right horizontally. The dawn that appears in the high sky and lowers down is not the real dawn
*(Grade: Sahih)*`,
          description: `**Why?**

Ibn al-Qayyim's classification of five levels of prayer provides a powerful self-diagnostic. Most people assume their prayer is "fine" without ever measuring it against a scholarly standard. Knowing your level is the first step to improving it.


**How?**

Read Ibn al-Qayyim's description in "al-Wabil al-Sayyib" or "as-Salah wa Hukm Tarikuha." The five levels range from the one who wrongs himself (negligent in wudu and timing) to the one who perfects prayer with full khushu'. Honestly identify which level describes your typical prayer. Set a goal to move up one level.` },
        { title: 'Identify three personal barriers to focus in salah', done: false,
          sources: `**I. Quran**


### Quran (23:1-2)
**Arabic:** قَدْ أَفْلَحَ الْمُؤْمِنُونَ ﴿١﴾ الَّذِينَ هُمْ فِي صَلَاتِهِمْ خَاشِعُونَ ﴿٢﴾  
**Translation:** [How] prosperous are the believers! Those who pray humbly.

**I. Hadith**


### Sahih Bukhari 6491
The Prophet (SAW) said: "Pray as you have seen me praying." Full presence and attention in salah is the foundation of khushu.
*(Grade: Sahih)*`,
          description: `**Why?**

Khushu' is not lost by accident -- it is stolen by specific, identifiable distractions. Until you name your personal barriers, you cannot address them. Generic advice about "being more focused" is useless without diagnosing the specific causes of your distraction.


**How?**

After your next five prayers, immediately note what distracted you most. Common barriers include: phone nearby, rushing to finish, praying while hungry or needing the bathroom, not understanding what you recite, or mental to-do lists. Write down your top three personal barriers and rank them by frequency.` },
        { title: 'Practice one technique for improving khushu\u02bf this week', done: false,
          sources: `**I. Quran**


### Quran (29:45)
**Arabic:** وَأَقِمِ الصَّلَاةَ ۖ إِنَّ الصَّلَاةَ تَنْهَىٰ عَنِ الْفَحْشَاءِ وَالْمُنكَرِ ۗ وَلَذِكْرُ اللَّهِ أَكْبَرُ  
**Translation:** Keep up the prayer: prayer restrains outrageous and unacceptable behaviour. Remembering God is greater.

**I. Hadith**


### Sahih Muslim 482
The Prophet (SAW) said: "The closest a servant is to his Lord is when he is in prostration, so increase your supplication therein."
*(Grade: Sahih)*`,
          description: `**Why?**

Khushu' is a skill that can be developed through deliberate practice. The scholars have identified concrete techniques that increase focus in prayer. Even one new habit can noticeably improve your experience of salah.


**How?**

Choose one technique to practice this week: pray in a clean, quiet space away from distractions; look at the place of sujud throughout; pause for two seconds between each movement; vary the surahs you recite to stay engaged; or reflect on the meaning of one specific recitation per prayer. Assess at the end of the week whether your focus improved.` },
      ],
    },
  ],
  faith_salah_excellence: [
    {
      title: 'Pray Duha prayer regularly',
      priority: 'medium', tags: ['salah', 'sunnah'],
      description: 'Duha prayer (after sunrise until before Dhuhr) is a charity for every joint in the body. Start with 2 rak\'at and build up.',
      subtasks: [
        { title: 'Learn the time window for Duha prayer', done: false,
          sources: `**I. Quran**

### Quran (93:1-2)
**Arabic:** وَالضُّحَىٰ ۝ وَاللَّيْلِ إِذَا سَجَىٰ
**Translation:** "By the morning brightness, and by the night when it grows still." (Abdel Haleem)

*(Allah swears by al-Duha — the morning brightness — giving this time of day a divine dignity. The Duha prayer takes its name from and is prayed during this blessed period.)*

**II. Hadith**


### Sahih Bukhari 1191
Narrated Nafi\`:Ibn \`Umar never offered the Duha prayer except on two occasions: (1) Whenever he reached Mecca; and he always used to reach Mecca in the forenoon. He would perform Tawaf round the Ka\`ba and then offer two rak\`at at the rear of Maqam Ibrahim. (2) Whenever he visited Quba, for he used to visit it every Saturday. When he entered the Mosque, he disliked to leave it without offering a prayer. Ibn \`Umar narrated that Allah's Messenger (ﷺ) used to visit the Mosque of Quba (sometime) walking and (sometime) riding. And he (i.e. Ibn \`Umar) used to say, "I do only what my companions used to do and I don't forbid anybody to pray at any time during the day or night except that one should not intend to pray at sunrise or sunset
*(Grade: Sahih)*`,
          description: `**Why?**

Knowing the exact time window prevents you from accidentally praying outside it (which would not count as Duha) or missing it altogether because you thought the window had passed. The Duha window is wider than most people realise.


**How?**

Duha begins approximately 15-20 minutes after sunrise and extends until shortly before Dhuhr. The preferred time is when the sun's heat intensifies (roughly mid-morning). Check your prayer app for sunrise time and add 20 minutes. Set a reminder in that window for your first week of practice.` },
        { title: 'Pray Duha at least 3 times this week', done: false,
          sources: `**I. Quran**

### Quran (93:1-2)
**Arabic:** وَالضُّحَىٰ ۝ وَاللَّيْلِ إِذَا سَجَىٰ
**Translation:** "By the morning brightness, and by the night when it grows still." (Abdel Haleem)

*(Allah's oath by al-Duha — the mid-morning light — elevates this time as sacred. The Duha prayer is the embodied response to this divine honour of the morning hours.)*

**II. Hadith**


### Sahih Bukhari 1775
Narrated Mujahid:Urwa bin Az-Zubair and I entered the Mosque (of the Prophet) and saw \`Abdullah bin \`Umar sitting near the dwelling place of Aisha and some people were offering the Duha prayer. We asked him about their prayer and he replied that it was a heresy. He (Urwa) then asked him how many times the Prophet (ﷺ) had performed \`Umra. He replied, 'Four times; one of them was in the month of Rajab." We disliked to contradict him. Then we heard \`Aisha, the Mother of faithful believers cleaning her teeth with Siwak in the dwelling place. 'Urwa said, "O Mother! O Mother of the believers! Don't you hear what Abu \`Abdur Rahman is saying?" She said, "What does he say?" 'Urwa said, "He says that Allah's Messenger (ﷺ) performed four \`Umra and one of them was in the month of Rajab." \`Aisha said, "May Allah be merciful to Abu \`Abdur Rahman! The Prophet (ﷺ) did not perform any \`Umra except that he was with him, and he never performed any \`Umra in Rajab
*(Grade: Sahih)*

### Sahih Bukhari 1776
Narrated Mujahid:Urwa bin Az-Zubair and I entered the Mosque (of the Prophet) and saw \`Abdullah bin \`Umar sitting near the dwelling place of Aisha and some people were offering the Duha prayer. We asked him about their prayer and he replied that it was a heresy. He (Urwa) then asked him how many times the Prophet (ﷺ) had performed \`Umra. He replied, 'Four times; one of them was in the month of Rajab." We disliked to contradict him. Then we heard \`Aisha, the Mother of faithful believers cleaning her teeth with Siwak in the dwelling place. 'Urwa said, "O Mother! O Mother of the believers! Don't you hear what Abu \`Abdur Rahman is saying?" She said, "What does he say?" 'Urwa said, "He says that Allah's Messenger (ﷺ) performed four \`Umra and one of them was in the month of Rajab." \`Aisha said, "May Allah be merciful to Abu \`Abdur Rahman! The Prophet (ﷺ) did not perform any \`Umra except that he was with him, and he never performed any \`Umra in Rajab
*(Grade: Sahih)*`,
          description: `**Why?**

The Prophet (SAW) advised Abu Hurayrah (RA) to never abandon Duha prayer. It serves as a charity for every joint in your body (Muslim). Starting with just three days a week makes it achievable while building toward daily practice.


**How?**

Choose three days this week and pray two rak'at of Duha during the mid-morning window. The Prophet (SAW) prayed between 2 and 8 rak'at. Start with 2 to keep it easy and build consistency. Mark the days you prayed it to track your progress.` },
        { title: 'Gradually increase to daily practice', done: false,
          sources: `**I. Hadith**


### Sahih Muslim 720
The Prophet (SAW) said: "Charity is due upon every joint of a person every day the sun rises. Judging justly between two people is charity... and the two rak'ahs of Duha compensate for all of that."
*(Grade: Sahih)*

### Sahih Bukhari 1178
The Prophet (SAW) said: "In the morning, charity is due from every one of your joints. Every tasbeehah is charity, every tahmeedah is charity... and two rak'ahs of Duha suffice for all that."
*(Grade: Sahih)*`,
          description: `**Why?**

Consistency in voluntary worship is more beloved to Allah than occasional bursts of effort. Aisha (RA) reported that the Prophet's most beloved deeds were those done consistently, even if small. Daily Duha takes only 2-3 minutes but compounds into a lifetime of reward.


**How?**

Once you have established Duha three times per week for at least two weeks, begin adding one additional day per week. Tie it to a daily anchor (e.g., after your morning coffee or after arriving at work). Within a month, aim for daily practice. Track your streak to maintain motivation.` },
      ],
    },
    {
      title: 'Master the prostration of recitation (Sujud al-Tilawah)',
      priority: 'low', tags: ['salah', 'fiqh'],
      description: 'There are 15 places in the Quran where prostration is recommended when recited. Learn the ruling and practice.',
      subtasks: [
        { title: 'Learn the 15 ayat of sajdah in the Quran', done: false,
          sources: `**I. Quran**


### Quran (54:32)
**Arabic:** وَلَقَدْ يَسَّرْنَا الْقُرْآنَ لِلذِّكْرِ فَهَلْ مِن مُّدَّكِرٍ
**Translation:** We have made it easy to learn lessons from the Quran: will anyone take heed?

### Quran (54:40)
**Arabic:** وَلَقَدْ يَسَّرْنَا الْقُرْآنَ لِلذِّكْرِ فَهَلْ مِن مُّدَّكِرٍ
**Translation:** We have made it easy to learn lessons from the Quran: will anyone take heed?

### Quran (54:17)
**Arabic:** وَلَقَدْ يَسَّرْنَا الْقُرْآنَ لِلذِّكْرِ فَهَلْ مِن مُّدَّكِرٍ
**Translation:** We have made it easy to learn lessons from the Quran: will anyone take heed?

**II. Hadith**


### Sahih Muslim 244
It is narrated on the authority of Abu Huraira that when, the son of Adam recites the Ayat of Sajdah (prostration) and then falls down in prostration, the Satan goes into seclusion and weeps and says:Alas, and in the narration of Abu Kuraib the words are: Woe unto me, the son of Adam was commanded to prostrate, and he prostrated and Paradise was entitled to him and I was commanded to prostrate, but I refused and am doomed to Hell
*(Grade: Sahih)*

### Sahih Muslim 2015
It was narrated that Umm Hisham bin Harithah bin An-Nu'man said:"Our oven and the oven of the Messenger of Allah (ﷺ) were the same for two years, or for one year and part of a year. And I only learned "Surah Qaf. By the Glorious Quran" from the tongue of the Messenger of Allah (ﷺ), who used to recited it every Friday from the Minbar, when he addresses the people
*(Grade: Sahih)*`,
          description: `**Why?**

When Allah commands prostration in the Quran and you respond immediately, you are demonstrating submission in real time. Knowing where these ayat appear means you are never caught off guard and can respond with the reverence the moment deserves.


**How?**

Learn the locations of the 15 ayat of sajdah. They appear in surahs such as Al-A'raf (7:206), Ar-Ra'd (13:15), An-Nahl (16:50), Al-Isra (17:109), Maryam (19:58), and others. Most masahif mark them with a sajdah symbol in the margin. Bookmark or highlight them in your personal mushaf for quick reference.` },
        { title: 'Study the du\'a recited during Sujud al-Tilawah', done: false,
          sources: `**I. Quran**


### Quran (41:26)
**Arabic:** وَقَالَ الَّذِينَ كَفَرُوا لَا تَسْمَعُوا لِهَٰذَا الْقُرْآنِ وَالْغَوْا فِيهِ لَعَلَّكُمْ تَغْلِبُونَ
**Translation:** And said those who disbelieved, “Do not listen to this Qur’ān, and make noise during its recitation, so that you may overcome.”

### Quran (75:16)
**Arabic:** لَا تُحَرِّكْ بِهِ لِسَانَكَ لِتَعْجَلَ بِهِ
**Translation:** (O Prophet,) do not move your tongue (during revelation) for (reciting) it (the Qur’ān) to receive it in hurry.

**II. Hadith**


### Sahih Bukhari 1065
Narrated \`Aisha:The Prophet (ﷺ) recited (the Qur'an) aloud during the eclipse prayer and when he had finished the eclipse prayer he said the Takbir and bowed. When he stood straight from bowing he would say "Sami 'allahu liman hamidah Rabbana wa laka l-hamd." And he would again start reciting. In the eclipse prayer there are four bowing and four prostrations in two rak\`at. Al-Auza'i and others said that they had heard Az-Zuhri from 'Urwa from \`Aisha saying, "In the lifetime of Allah's Messenger (ﷺ) the sun eclipsed, and he made a person to announce: 'Prayer in congregation.' He led the prayer and performed four bowing and four prostrations in two rak\`at." Narrated Al-Walid that \`Abdur-Rahman bin Namir had informed him that he had heard the same. Ibn Shihab heard the same. Az-Zuhri said, "I asked ('Urwa), 'What did your brother \`Abdullah bin Az-Zubair do? He prayed two rak\`at (of the eclipse prayer) like the morning prayer, when he offered the (eclipse) prayer in Medina.' 'Urwa replied that he had missed (i.e. did not pray according to) the Prophet's tradition." Sulaiman bin Kathir and Sufyan bin Husain narrated from Az-Zuhri that the prayer for the eclipse used to be offered with loud recitation
*(Grade: Sahih)*

### Sahih Bukhari 377
Narrated Abu Hazim:Sahl bin Sa\`d was asked about the (Prophet's) pulpit as to what thing it was made of? Sahl replied: "None remains alive amongst the people, who knows about it better than I. It was made of tamarisk (wood) of the forest. So and so, the slave of so and so prepared it for Allah's Messenger (ﷺ) . When it was constructed and place (in the Mosque), Allah's Messenger (ﷺ) stood on it facing the Qibla and said 'Allahu Akbar', and the people stood behind him (and led the people in prayer). He recited and bowed and the people bowed behind him. Then he raised his head and stepped back, got down and prostrated on the ground and then he again ascended the pulpit, recited, bowed, raised his head and stepped back, got down and prostrated on the ground. So, this is what I know about the pulpit." Ahmad bin Hanbal said, "As the Prophet (ﷺ) was at a higher level than the people, there is no harm according to the above-mentioned Hadith if the Imam is at a higher level than his followers during the prayers
*(Grade: Sahih)*

### Sahih Bukhari 50
Narrated Abu Huraira: One day while the Prophet (ﷺ) was sitting in the company of some people, (The angel) Gabriel came and asked, "What is faith?" Allah's Messenger (ﷺ) replied, 'Faith is to believe in Allah, His angels, (the) meeting with Him, His Apostles, and to believe in Resurrection." Then he further asked, "What is Islam?" Allah's Messenger (ﷺ) replied, "To worship Allah Alone and none else, to offer prayers perfectly to pay the compulsory charity (Zakat) and to observe fasts during the month of Ramadan." Then he further asked, "What is Ihsan (perfection)?" Allah's Messenger (ﷺ) replied, "To worship Allah as if you see Him, and if you cannot achieve this state of devotion then you must consider that He is looking at you." Then he further asked, "When will the Hour be established?" Allah's Messenger (ﷺ) replied, "The answerer has no better knowledge than the questioner. But I will inform you about its portents. 1. When a slave (lady) gives birth to her master. 2. When the shepherds of black camels start boasting and competing with others in the construction of higher buildings. And the Hour is one of five things which nobody knows except Allah. The Prophet (ﷺ) then recited: "Verily, with Allah (Alone) is the knowledge of the Hour--." (31. 34) Then that man (Gabriel) left and the Prophet (ﷺ) asked his companions to call him back, but they could not see him. Then the Prophet (ﷺ) said, "That was Gabriel who came to teach the people their religion." Abu 'Abdullah said: He (the Prophet) considered all that as a part of faith
*(Grade: Sahih)*`,
          description: `**Why?**

The du'a of Sujud al-Tilawah is an act of profound humility -- you are declaring that your very face, the most honoured part of your body, submits to the One who created and shaped it. Knowing this du'a allows you to perform the prostration with both correctness and consciousness.


**How?**

Memorise the du'a: "Sajada wajhi lilladhi khalaqahu wa sawwarahu wa shaqqa sam'ahu wa basarahu, bi hawlihi wa quwwatihi" -- meaning "My face prostrates to the One who created it and formed it, and opened its hearing and sight by His might and power." Recite it each time you perform Sujud al-Tilawah.` },
        { title: 'Practice performing it when you encounter a sajdah ayah', done: false,
          sources: `**I. Quran**


### Quran (4:102)
**Arabic:** وَإِذَا كُنتَ فِيهِمْ فَأَقَمْتَ لَهُمُ الصَّلَاةَ فَلْتَقُمْ طَائِفَةٌ مِّنْهُم مَّعَكَ وَلْيَأْخُذُوا أَسْلِحَتَهُمْ فَإِذَا سَجَدُوا فَلْيَكُونُوا مِن وَرَائِكُمْ وَلْتَأْتِ طَائِفَةٌ أُخْرَىٰ لَمْ يُصَلُّوا فَلْيُصَلُّوا مَعَكَ وَلْيَأْخُذُوا حِذْرَهُمْ وَأَسْلِحَتَهُمْ ۗ وَدَّ الَّذِينَ كَفَرُوا لَوْ تَغْفُلُونَ عَنْ أَسْلِحَتِكُمْ وَأَمْتِعَتِكُمْ فَيَمِيلُونَ عَلَيْكُم مَّيْلَةً وَاحِدَةً ۚ وَلَا جُنَاحَ عَلَيْكُمْ إِن كَانَ بِكُمْ أَذًى مِّن مَّطَرٍ أَوْ كُنتُم مَّرْضَىٰ أَن تَضَعُوا أَسْلِحَتَكُمْ ۖ وَخُذُوا حِذْرَكُمْ ۗ إِنَّ اللَّهَ أَعَدَّ لِلْكَافِرِينَ عَذَابًا مُّهِينًا
**Translation:** "When you [Prophet] are with the believers, leading them in prayer, let a group of them stand up in prayer with you, taking their weapons with them, and when they have finished their prostration, let them take up their positions at the back." (Abdel Haleem)

*(This verse legislates prayer even during battle, emphasising the inviolability of sujud — even under threat. The Sujud al-Tilawah is a voluntary expression of the same sacred act.)*

**II. Hadith**


### Sahih Bukhari 1075
Narrated Ibn \`Abbas: The Prophet (ﷺ) performed a prostration on reading (Surat-an-Najm 53) and all the Muslims, pagans, Jinn and human beings prostrated along with him.
*(Grade: Sahih)*`,
          description: `**Why?**

Knowing the practical ruling allows you to respond correctly in the moment rather than hesitating or skipping the prostration out of uncertainty. The more you practice it, the more natural this beautiful act of submission becomes.


**How?**

When you recite or hear an ayah of sajdah, prostrate immediately if you are in a state of purity. Say "Allahu Akbar," go into sujud, recite the du'a, then rise with another "Allahu Akbar." Check your madhab's ruling: the Hanafi school requires wudu, while the Hanbali school does not require it for Sujud al-Tilawah outside of prayer. Practice by reading a surah containing a sajdah ayah and performing it.` },
      ],
    },
    {
      title: 'Develop a consistent Qiyam al-Layl routine',
      priority: 'medium', tags: ['salah', 'qiyam'],
      description: 'Move from occasional Tahajjud to a regular nightly routine. The Prophet (SAW) never abandoned Qiyam al-Layl even when ill.',
      subtasks: [
        { title: 'Choose a consistent time in the last third of the night', done: false,
          sources: `**I. Quran**


### Quran (73:1-4)
**Arabic:** يَا أَيُّهَا الْمُزَّمِّلُ ۝ قُمِ اللَّيْلَ إِلَّا قَلِيلًا ۝ نِّصْفَهُ أَوِ انقُصْ مِنْهُ قَلِيلًا ۝ أَوْ زِدْ عَلَيْهِ وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا  
**Translation:** O you who wraps himself. Arise the night, except for a little. Half of it, or subtract from it a little. Or add to it, and recite the Quran with measured recitation.

### Quran (17:79)
**Arabic:** وَمِنَ اللَّيْلِ فَتَهَجَّدْ بِهِ نَافِلَةً لَّكَ عَسَىٰ أَن يَبْعَثَكَ رَبُّكَ مَقَامًا مَّحْمُودًا  
**Translation:** And from the night, pray with it as additional worship for you; it is expected that your Lord will raise you to a praised station.

**II. Hadith**


### Sahih Bukhari 1131
The Prophet (SAW) said: "The most beloved prayer to Allah is the prayer of Dawud: he used to sleep half the night, pray for a third of it, and sleep for a sixth of it."
*(Grade: Sahih)*`,
          description: `**Why?**

The Prophet (SAW) said: "The most beloved deeds to Allah are those done consistently, even if small" (Bukhari). Choosing a realistic time ensures you can sustain your Qiyam routine long-term rather than burning out after a few intense nights.


**How?**

Pick a specific time in the last third of the night that you can realistically maintain -- even 20 minutes before Fajr is sufficient. Set it as a daily alarm. The key is choosing a time you will not abandon when motivation dips. Start with what is easy and let Allah expand it.` },
        { title: 'Start with 2-4 rak\'at and gradually increase', done: false,
          sources: `**I. Quran**


### Quran (73:20)
**Arabic:** إِنَّ رَبَّكَ يَعْلَمُ أَنَّكَ تَقُومُ أَدْنَىٰ مِن ثُلُثَيِ اللَّيْلِ وَنِصْفَهُ وَثُلُثَهُ  
**Translation:** [Prophet], your Lord is well aware that you sometimes spend nearly two-thirds of the night at prayer — sometimes half, sometimes a third.

**I. Hadith**


### Sahih Bukhari 1145
The Prophet (SAW) said: "The most beloved prayer to Allah is the prayer of Dawud: he used to sleep half the night, pray for a third of it, and sleep for a sixth of it."
*(Grade: Sahih)*`,
          description: `**Why?**

Starting small protects you from the common trap of beginning with long sessions that you cannot maintain. Aisha (RA) noted that the Prophet's (SAW) deeds were consistent. His typical Qiyam was 11 rak'at including Witr -- a goal to work toward, not a starting requirement.


**How?**

Begin with 2 rak'at of Qiyam followed by Witr. Once this feels comfortable for two weeks, add two more rak'at. Gradually work toward 8 rak'at plus 3 Witr (11 total). Do not rush the progression -- each level should feel sustainable before you increase.` },
        { title: 'Include Witr as the final prayer of the night', done: false,
          sources: `**I. Quran**


### Quran (73:2)
**Arabic:** قُمِ اللَّيْلَ إِلَّا قَلِيلًا
**Translation:** Stand (to prayer) by night, but not all night,-

### Quran (17:78)
**Arabic:** أَقِمِ الصَّلَاةَ لِدُلُوكِ الشَّمْسِ إِلَىٰ غَسَقِ اللَّيْلِ وَقُرْآنَ الْفَجْرِ ۖ إِنَّ قُرْآنَ الْفَجْرِ كَانَ مَشْهُودًا
**Translation:** Establish regular prayers - at the sun's decline till the darkness of the night, and the morning prayer and reading: for the prayer and reading in the morning carry their testimony.

### Quran (76:26)
**Arabic:** وَمِنَ اللَّيْلِ فَاسْجُدْ لَهُ وَسَبِّحْهُ لَيْلًا طَوِيلًا
**Translation:** And during night, prostrate yourself to Him (i.e. the offering of Maghrib and ‘Ishâ’ prayers), and glorify Him a long night through (i.e. Tahajjud prayer).

**II. Hadith**


### Sahih Bukhari 1140
Narrated \`Aisha:The Prophet (ﷺ) used to offer thirteen rak\`at of the night prayer and that included the witr and two rak\`at (Sunna) of the Fajr prayer
*(Grade: Sahih)*

### Sahih Bukhari 4570
Narrated Ibn \`Abbas:(One night) I stayed overnight in the house of my aunt Maimuna, and said to myself, "I will watch the prayer of Allah's Messenger (ﷺ) " My aunt placed a cushion for Allah's Messenger (ﷺ) and he slept on it in its length-wise direction and (woke-up) rubbing the traces of sleep off his face and then he recited the last ten Verses of Surat-al-\`Imran till he finished it. Then he went to a hanging water skin and took it, performed the ablution and then stood up to offer the prayer. I got up and did the same as he had done, and stood beside him. He put his hand on my head and held me by the ear and twisted it. He offered two rak\`at, then two rak\`at, then two rak\`at, then two rak\`at, then two rak\`at, then two rak\`at, and finally the witr (i.e. one rak\`a) prayer
*(Grade: Sahih)*`,
          description: `**Why?**

Witr seals your night worship with an odd-numbered prayer, as the Prophet (SAW) instructed. It includes the Qunut du'a, one of the most comprehensive supplications in the Sunnah. Making Witr your last prayer of the night follows prophetic guidance directly.


**How?**

After completing your Qiyam rak'at, pray Witr as the final prayer of the night. You may pray 1 rak'ah or 3 rak'at. In the last rak'ah, after rising from ruku, recite the Qunut du'a: "Allahumma-hdini fi man hadayt..." If you fear you may not wake for Tahajjud, pray Witr before sleeping.` },
        { title: 'Maintain the routine for 30 consecutive days', done: false,
          sources: `**I. Quran**


### Quran (73:2-4)
**Arabic:** قُمِ اللَّيْلَ إِلَّا قَلِيلًا ۝ نِّصْفَهُ أَوِ انقُصْ مِنْهُ قَلِيلًا ۝ أَوْ زِدْ عَلَيْهِ وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا  
**Translation:** Arise the night, except for a little. Half of it, or subtract from it a little. Or add to it, and recite the Quran with measured recitation.

**II. Hadith**


### Sahih Bukhari 1152
The Prophet (SAW) said: "O Abdullah, do not be like so-and-so who used to pray qiyam al-layl and then abandoned it."
*(Grade: Sahih)*

### Sahih Muslim 782
A'ishah (RA) said: "The Prophet (SAW) would never abandon the night prayer. If he was ill or tired, he would pray sitting."
*(Grade: Sahih)*`,
          description: `**Why?**

Research and prophetic practice both confirm that consistency builds lasting change. Thirty consecutive days transforms Qiyam from a sporadic act of devotion into an ingrained part of your nightly rhythm that you would feel incomplete without.


**How?**

Track your Qiyam streak for 30 consecutive days using a simple checklist or app. If you miss a night, do not abandon the effort -- resume the next night and restart the count. The goal is to reach 30 consecutive nights, at which point the habit will feel natural. Record which nights were hardest and plan around those obstacles.` },
      ],
    },
  ],

  // \u2500\u2500 ZAKAH \u2500\u2500
  faith_zakah_core: [
    {
      title: 'Calculate your nisab and determine if zakah is obligatory on you',
      priority: 'urgent', tags: ['zakah', 'fard'],
      description: 'Nisab is the minimum threshold of wealth that makes zakah obligatory. Calculate based on current gold/silver values and your total zakatable assets.',
      subtasks: [
        { title: 'Look up the current nisab threshold in your currency', done: false,
          sources: `**I. Quran**


### Quran (9:103)
**Arabic:** خُذْ مِنْ أَمْوَالِهِمْ صَدَقَةً تُطَهِّرُهُمْ وَتُزَكِّيهِم بِهَا  
**Translation:** Take from their wealth a charity by which you purify them and cause them increase.

### Quran (2:267)
**Arabic:** يَا أَيُّهَا الَّذِينَ آمَنُوا أَنفِقُوا مِن طَيِّبَاتِ مَا كَسَبْتُمْ  
**Translation:** O you who believe, spend from the good things which you have earned.

**II. Hadith**


### Sahih Bukhari 1395
The Prophet (SAW) said: "No zakah is due on property mounting to less than five uqiyahs (of silver), and no zakah is due on less than five camels, and there is no zakah on less than five wasqs of dates."
*(Grade: Sahih)*`,
          description: `**Why?**

Without knowing the nisab in your local currency, you cannot determine whether zakah is obligatory on you. This is the very first step in fulfilling the pillar correctly.


**How?**

Nisab is the value of 85 grams of gold or 595 grams of silver. Look up today's gold and silver prices and multiply to get the threshold in your currency. Many scholars recommend using the silver standard for a more conservative and inclusive calculation. Bookmark a reliable source so you can check annually.` },
        { title: 'List all your zakatable assets (cash, gold, investments, trade goods)', done: false,
          sources: `**I. Quran**


### Quran (9:103)
**Arabic:** خُذْ مِنْ أَمْوَالِهِمْ صَدَقَةً تُطَهِّرُهُمْ وَتُزَكِّيهِم بِهَا  
**Translation:** Take from their wealth a charity by which you purify them and cause them increase.

**II. Hadith**


### Sahih Bukhari 1454
The Prophet (SAW) sent Mu'adh to Yemen and said: "Inform them that Allah has made it obligatory for them to pay the zakah from their property and it is to be taken from the wealthy among them and given to the poor."
*(Grade: Sahih)*`,
          description: `**Why?**

Zakah applies only to specific categories of wealth. Missing an asset means underpaying what is owed to Allah and the poor; including a non-zakatable asset means overpaying unnecessarily.


**How?**

List every zakatable asset you own: bank balances, cash on hand, gold and silver jewellery (above personal-use exemptions in some madhabs), stocks and investments, business inventory, and receivable debts. Write each item with its current value. Keep this list updated annually.` },
        { title: 'Determine if you meet the nisab after deducting debts', done: false,
          sources: `**I. Quran**


### Quran (2:267)
**Arabic:** يَا أَيُّهَا الَّذِينَ آمَنُوا أَنفِقُوا مِن طَيِّبَاتِ مَا كَسَبْتُمْ وَمِمَّا أَخْرَجْنَا لَكُم مِّنَ الْأَرْضِ  
**Translation:** O you who believe, spend from the good things which you have earned and from that which We have produced for you from the earth.

**II. Hadith**


### Sahih Bukhari 1395
The Prophet (SAW) defined the nisab threshold for various types of wealth, below which no zakah is due.
*(Grade: Sahih)*`,
          description: `**Why?**

Islam is just — debts you owe are deducted before zakah is assessed, ensuring you are not burdened beyond your means. Accuracy here determines whether zakah is truly obligatory on you.


**How?**

Subtract your immediate debts and obligations from your total zakatable wealth. If the remainder exceeds the nisab and a full lunar year (hawl) has passed since you first held nisab-level wealth, zakah of 2.5% is due on the total zakatable amount.` },
        { title: 'Mark your zakah anniversary date (hawl)', done: false,
          sources: `**I. Quran**


### Quran (2:43)
**Arabic:** وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ وَارْكَعُوا مَعَ الرَّاكِعِينَ  
**Translation:** And establish prayer and give zakah and bow with those who bow.

**II. Hadith**


### Sahih Bukhari 1454
The Prophet (SAW) said: "...Allah has made it obligatory for them to pay the zakah from their property." The condition of hawl (one lunar year of possession) is established by scholarly consensus from multiple ahadith.
*(Grade: Sahih)*`,
          description: `**Why?**

The hawl (lunar year) is a condition for zakah — without tracking it, you risk paying too early, too late, or not at all. Marking a fixed date brings discipline to this pillar.


**How?**

Identify the date you first possessed nisab-level wealth. Mark this as your zakah anniversary in both Hijri and Gregorian calendars. Set a recurring annual reminder. Each year on this date, calculate your zakatable wealth and pay what is due.` },
      ],
    },
    {
      title: 'Learn which categories of wealth are zakatable (gold, silver, cash, trade goods, livestock)',
      priority: 'high', tags: ['zakah', 'fiqh'],
      description: 'Not all wealth is zakatable. Study the specific categories and their rates as defined by the Quran and Sunnah.',
      subtasks: [
        { title: 'Study zakah on gold and silver (2.5%)', done: false,
          sources: `**I. Quran**

### Quran (9:34)
**Arabic:** يَا أَيُّهَا الَّذِينَ آمَنُوا إِنَّ كَثِيرًا مِّنَ الْأَحْبَارِ وَالرُّهْبَانِ لَيَأْكُلُونَ أَمْوَالَ النَّاسِ بِالْبَاطِلِ وَيَصُدُّونَ عَن سَبِيلِ اللَّهِ ۗ وَالَّذِينَ يَكْنِزُونَ الذَّهَبَ وَالْفِضَّةَ وَلَا يُنفِقُونَهَا فِي سَبِيلِ اللَّهِ فَبَشِّرْهُم بِعَذَابٍ أَلِيمٍ
**Translation:** "Believers, many rabbis and monks wrongfully consume people's possessions and turn people away from God's path. [Prophet], tell those who hoard gold and silver instead of giving in God's cause that they will have a grievous punishment." (Abdel Haleem)

**II. Hadith**


### Sahih Bukhari 1404
Narrated Khalid bin Aslam:We went out with 'Abdullah bin 'Umar and a bedouin said (to 'Abdullah), "Tell me about Allah's saying: "And those who hoard up gold and silver (Al-Kanz - money, gold, silver etc., the Zakat of which has not been paid) and spend it not in the Way of Allah (V.9:34)." Ibn 'Umar said, "Whoever hoarded them and did not pay the Zakat thereof, then woe to him. But these holy Verses were revealed before the Verses of Zakat. So when the Verses of Zakat were revealed, Allah made Zakat a purifier of the property
*(Grade: Sahih)*`,
          description: `**Why?**

Gold and silver are the original assets on which zakah was legislated. Understanding their rules is foundational to calculating zakah correctly on all monetary wealth.


**How?**

Gold above 85g and silver above 595g are subject to 2.5% zakah annually. In the Hanafi school, all gold and silver jewellery is zakatable regardless of use. Other schools exempt jewellery worn regularly for personal adornment. Know your madhab's position and weigh your gold and silver to determine if they meet the threshold.` },
        { title: 'Study zakah on cash and bank savings', done: false,
          sources: `**I. Quran**


### Quran (9:103)
**Arabic:** خُذْ مِنْ أَمْوَالِهِمْ صَدَقَةً تُطَهِّرُهُمْ وَتُزَكِّيهِم بِهَا  
**Translation:** In order to cleanse and purify them [Prophet], accept a gift out of their property [to make amends] and pray for them.

**I. Hadith**


### Sahih Bukhari 1454
The Prophet (SAW) said: "There is no zakah on less than five awsuq of dates, no zakah on less than five awqiyyah of silver, and no zakah on less than five camels." Zakah on cash follows the nisab of silver.
*(Grade: Sahih)*`,
          description: `**Why?**

Most modern wealth is held as cash rather than gold or silver. Understanding that cash follows the same zakah rules ensures you do not overlook the largest portion of your zakatable assets.


**How?**

Total all cash holdings: bank balances (checking, savings, fixed deposits), cash on hand, and digital wallet balances. If the combined total meets the nisab threshold and a lunar year has passed, 2.5% is due. Include any currency holdings in foreign accounts as well.` },
        { title: 'Study zakah on trade goods (uruud al-tijarah)', done: false,
          sources: `**I. Quran**


### Quran (2:267)
**Arabic:** يَا أَيُّهَا الَّذِينَ آمَنُوا أَنفِقُوا مِن طَيِّبَاتِ مَا كَسَبْتُمْ وَمِمَّا أَخْرَجْنَا لَكُم مِّنَ الْأَرْضِ  
**Translation:** You who believe, give charitably from the good things you have acquired and that We have produced for you from the earth. Do not give away the bad things that you yourself would only accept with your eyes closed.

**I. Hadith**


### Sahih Bukhari 1458
The Prophet (SAW) instructed Mu'adh ibn Jabal: "Inform them that Allah has made zakah obligatory on their wealth — taken from the rich and given to the poor among them."
*(Grade: Sahih)*`,
          description: `**Why?**

Trade goods (uruud al-tijarah) are a major category of zakatable wealth. Entrepreneurs and business owners must understand how to value and assess zakah on their inventory to fulfil this obligation properly.


**How?**

On your zakah date, value all business inventory held for sale at its current market price (not cost price). The zakah rate is 2.5% of the total market value. Items purchased for personal use or business operations (like equipment) are exempt. Only goods intended for resale count.` },
        { title: 'Study zakah on agricultural produce and livestock', done: false,
          sources: `**I. Quran**


### Quran (23:21)
**Arabic:** وَإِنَّ لَكُمْ فِي الْأَنْعَامِ لَعِبْرَةً ۖ نُّسْقِيكُم مِّمَّا فِي بُطُونِهَا وَلَكُمْ فِيهَا مَنَافِعُ كَثِيرَةٌ وَمِنْهَا تَأْكُلُونَ
**Translation:** "There is a lesson for you in livestock: We produce milk for you to drink from their bellies. And they have many other benefits: you eat them." (Abdel Haleem)

*(The recognition of livestock as a source of "many benefits" forms the basis for the zakah obligation on this wealth — every asset that generates benefit carries a social right.)*

**II. Hadith**


### Sahih Bukhari 1454
Narrated Abu Sa'id Al-Khudri: Allah's Messenger (ﷺ) said, "There is no Zakat on less than five camels and also there is no Zakat on less than five Awaq (of silver) and there is no Zakat on less than five Awsaq (of dates or foodstuff)."
*(Grade: Sahih)*`,
          description: `**Why?**

Agricultural and livestock zakah have distinct rules that differ significantly from monetary zakah. If you earn from farming or animal husbandry, these specific rates apply and must be studied separately.


**How?**

For crops: zakah is 10% of the harvest if rain-watered, and 5% if irrigated with paid water. This is due at harvest time, not annually. For livestock (camels, cows, sheep/goats), each animal type has its own nisab threshold and a sliding scale of what is owed. Consult a fiqh reference for the detailed tables applicable to your situation.` },
        { title: 'Learn what is exempt (personal use items, primary home)', done: false,
          sources: `**I. Hadith**


### Sahih Bukhari 1463
The Prophet (SAW) said: "There is no zakah on one's riding horse, personal slave, or personal possessions." Personal use items and one's primary home are exempt from zakah.
*(Grade: Sahih)*`,
          description: `**Why?**

Knowing what is exempt prevents you from over-calculating your zakah and gives you clarity on the boundary between personal possessions and zakatable wealth. Islam does not tax you on what you need to live.


**How?**

Exclude from your zakah calculation: your primary residence, personal clothing, household furniture and appliances, vehicles for personal transport, and tools of your trade. Only wealth that is held for growth, savings, or trade is subject to zakah. If in doubt about a specific asset, consult a knowledgeable scholar.` },
      ],
    },
    {
      title: 'Identify the eight eligible recipients of zakah (Surah At-Tawbah 9:60)',
      priority: 'high', tags: ['zakah', 'fiqh'],
      description: 'Allah specified exactly eight categories of people eligible to receive zakah. Know them so your distribution is valid.',
      subtasks: [
        { title: 'Al-Fuqara (the poor)', done: false,
          sources: `**I. Quran**


### Quran (2:273)
**Arabic:** لِلْفُقَرَاءِ الَّذِينَ أُحْصِرُوا فِي سَبِيلِ اللَّهِ لَا يَسْتَطِيعُونَ ضَرْبًا فِي الْأَرْضِ يَحْسَبُهُمُ الْجَاهِلُ أَغْنِيَاءَ مِنَ التَّعَفُّفِ تَعْرِفُهُم بِسِيمَاهُمْ لَا يَسْأَلُونَ النَّاسَ إِلْحَافًا ۗ وَمَا تُنفِقُوا مِنْ خَيْرٍ فَإِنَّ اللَّهَ بِهِ عَلِيمٌ
**Translation:** "[Give] to those needy who are wholly occupied in God’s way and cannot travel in the land [for trade]. The unknowing might think them rich because of their self-restraint, but you will recognize them by their characteristic of not begging persistently. God is well aware of any good you give." (Abdel Haleem)

**II. Hadith**


### Sahih Bukhari 1479
Narrated Abu Huraira: Allah’s Messenger (ﷺ) said, "The poor person is not the one who asks a morsel or two from people, but the poor person is the one who doesn’t have enough to fulfill his needs, but whose condition is not known to others so that charity could be given to him."
*(Grade: Sahih)*`,
          description: `**Why?**

The fuqara are the first category Allah mentions in the zakah verse (9:60). Recognising who qualifies as 'poor' ensures your zakah reaches those with the most urgent need.


**How?**

Identify individuals whose income falls significantly short of meeting basic needs: food, shelter, and clothing. They may have little to no regular income. Look within your local community, extended family, or through trusted organisations that serve the destitute.` },
        { title: 'Al-Masakin (the needy)', done: false,
          sources: `**I. Quran**


### Quran (4:8)
**Arabic:** وَإِذَا حَضَرَ الْقِسْمَةَ أُولُو الْقُرْبَىٰ وَالْيَتَامَىٰ وَالْمَسَاكِينُ فَارْزُقُوهُم مِّنْهُ وَقُولُوا لَهُمْ قَوْلًا مَّعْرُوفًا
**Translation:** "If other relatives, orphans, or needy people are present at the distribution, give them something too, and speak kindly to them." (Abdel Haleem)

**II. Hadith**


### Sahih Bukhari 702
Narrated Abu Mas\`ud:A man came and said, "O Allah's Messenger (ﷺ)! By Allah, I keep away from the morning prayer only because So and so prolongs the prayer when he leads us in it." The narrator said, "I never saw Allah's Apostle more furious in giving advice than he was at that time. He then said, "Some of you make people dislike good deeds (the prayer). So whoever among you leads the people in prayer should shorten it because among them are the weak, the old and the needy
*(Grade: Sahih)*

### Sahih Bukhari 704
Narrated Abu Mas\`ud:A man came and said, "O Allah's Messenger (ﷺ)! I keep away from the morning prayer because so-and-so (Imam) prolongs it too much." Allah's Messenger (ﷺ) became furious and I had never seen him more furious than he was on that day. The Prophet (ﷺ) said, "O people! Some of you make others dislike the prayer, so whoever becomes an Imam he should shorten the prayer, as behind him are the weak, the old and the needy
*(Grade: Sahih)*`,
          description: `**Why?**

The masakin are often invisible -- they have some means but not enough. Recognising this category prevents zakah from being directed only to the visibly destitute while others quietly suffer.


**How?**

Look for people who have some income or resources but cannot fully cover their needs. They may not ask for help openly. Pay attention to those in your community who struggle with rent, medical bills, or feeding their families despite working.` },
        { title: 'Al-Amilina Alayha (zakah collectors/administrators)', done: false,
          sources: `**I. Quran**


### Quran (23:4)
**Arabic:** وَالَّذِينَ هُمْ لِلزَّكَاةِ فَاعِلُونَ
**Translation:** "who pay the prescribed alms." (Abdel Haleem)

**II. Hadith**


### Sahih Muslim 2298
Jabir b. 'Abdullah reported:There came people from among the Bedouins to the Messenger of Allah (ﷺ) and said: Collectors of Sadaqa come to us and treat us unjustly. Upon this the Messenger of Allah (ﷺ) said: Please your collectors. Jarir said: Ever since I heard it from the Messenger of Allah (ﷺ) no collector had departed but was pleased with me
*(Grade: Sahih)*`,
          description: `**Why?**

Allah designated zakah administrators as eligible recipients to ensure the system functions properly. Understanding this category clarifies that operational costs of zakah collection are legitimate.


**How?**

When donating through an organisation, understand that a portion may go to administrative costs -- this is Islamically valid. Verify that the organisation's administrative share is reasonable and transparent. If distributing personally, this category does not apply.` },
        { title: 'Al-Mu\'allafati Qulubuhum (those whose hearts are to be reconciled)', done: false,
          sources: `**I. Quran**

### Quran (9:60)
**Arabic:** إِنَّمَا الصَّدَقَاتُ لِلْفُقَرَاءِ وَالْمَسَاكِينِ وَالْعَامِلِينَ عَلَيْهَا وَالْمُؤَلَّفَةِ قُلُوبُهُمْ وَفِي الرِّقَابِ وَالْغَارِمِينَ وَفِي سَبِيلِ اللَّهِ وَابْنِ السَّبِيلِ ۖ فَرِيضَةً مِّنَ اللَّهِ ۗ وَاللَّهُ عَلِيمٌ حَكِيمٌ  
**Translation:** Alms are meant only for the poor, the needy, those who administer them, those whose hearts need winning over, to free slaves and help those in debt, for God's cause, and for travellers in need. This is ordained by God; God is all knowing and wise.

**II. Hadith**

### Sahih al-Bukhari 1395
The Prophet (peace be upon him) said to Mu'adh ibn Jabal when sending him to Yemen: "Inform them that Allah has enjoined on them sadaqah (zakah) which is to be taken from the wealthy among them and given to the poor among them."
*(Grade: Sahih)*`,
          description: `**Why?**

Islam recognises that new Muslims or those whose hearts incline toward Islam may need material support to stabilise their faith. This category reflects Islam's concern for spiritual wellbeing alongside material need.


**How?**

Identify new Muslims in your community who may face financial hardship due to their conversion (family estrangement, job loss). Support them through zakah to strengthen their faith and ease their transition. Some scholars also include those whose goodwill prevents harm to the Muslim community.` },
        { title: 'Fi al-Riqab (freeing captives)', done: false,
          sources: `**I. Quran**


### Quran (9:60)
**Arabic:** إِنَّمَا الصَّدَقَاتُ لِلْفُقَرَاءِ وَالْمَسَاكِينِ وَالْعَامِلِينَ عَلَيْهَا وَالْمُؤَلَّفَةِ قُلُوبُهُمْ وَفِي الرِّقَابِ وَالْغَارِمِينَ وَفِي سَبِيلِ اللَّهِ وَابْنِ السَّبِيلِ  
**Translation:** Zakah expenditures are only for the poor and the needy, and those employed to collect it, and for bringing hearts together, and for freeing captives, and for those in debt, and for the cause of Allah, and for the stranded traveler.

### Quran (2:177)
**Arabic:** وَآتَى الْمَالَ عَلَىٰ حُبِّهِ ذَوِي الْقُرْبَىٰ وَالْيَتَامَىٰ وَالْمَسَاكِينَ وَابْنَ السَّبِيلِ وَالسَّائِلِينَ وَفِي الرِّقَابِ  
**Translation:** And gives wealth, in spite of love for it, to relatives, orphans, the needy, the traveler, those who ask, and for freeing slaves.`,
          description: `**Why?**

Although chattel slavery has largely been abolished, this category remains relevant. Understanding its modern applications ensures zakah continues to serve its liberating purpose.


**How?**

In the modern context, scholars apply this category to freeing prisoners of war, paying ransoms for captives, and liberating those trapped in bonded labour or human trafficking. Support organisations that work to free people from modern forms of enslavement using zakah-compliant channels.` },
        { title: 'Al-Gharimin (those in debt)', done: false,
          sources: `**I. Quran**


### Quran (56:66)
**Arabic:** إِنَّا لَمُغْرَمُونَ
**Translation:** "'We are burdened with debt.'" (Abdel Haleem)

*(This exclamation of the disbelievers who lost their harvest captures the weight of inescapable debt. Allah uses this image to establish relief for the gharimin as one of the eight zakah categories.)*

**II. Hadith**


### Sahih Muslim 1044
Narrated Qabisa ibn Mukhariq al-Hilali: The Prophet (ﷺ) said, "O Qabisa, asking for charity is not permissible except for one of three men: a man in debt (al-gharim) — he may beg until he clears himself, and then he must stop."
*(Grade: Sahih)*`,
          description: `**Why?**

Debt can be crushing and spiritually debilitating. Allah made debt relief an explicit category of zakah, showing that freeing people from financial bondage is a priority in Islam.


**How?**

Identify individuals burdened with debts they genuinely cannot repay -- medical bills, essential living expenses, or business debts from halal ventures. The debt must not have been incurred for sinful purposes. You can pay their creditors directly or give them funds earmarked for debt repayment.` },
        { title: 'Fi Sabilillah (in the way of Allah)', done: false,
          sources: `**I. Quran**


### Quran (18:43)
**Arabic:** وَلَمْ تَكُن لَّهُ فِئَةٌ يَنصُرُونَهُ مِن دُونِ اللَّهِ وَمَا كَانَ مُنتَصِرًا
**Translation:** Walam takun lahu fi-atun yansuroonahumin dooni Allahi wama kana muntasira

### Quran (8:45)
**Arabic:** يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا لَقِيتُمْ فِئَةً فَاثْبُتُوا وَاذْكُرُوا اللَّهَ كَثِيرًا لَّعَلَّكُمْ تُفْلِحُونَ
**Translation:** Ya ayyuha allatheena amanooitha laqeetum fi-atan fathbutoo wathkurooAllaha katheeran laAAallakum tuflihoon

### Quran (2:249)
**Arabic:** فَلَمَّا فَصَلَ طَالُوتُ بِالْجُنُودِ قَالَ إِنَّ اللَّهَ مُبْتَلِيكُم بِنَهَرٍ فَمَن شَرِبَ مِنْهُ فَلَيْسَ مِنِّي وَمَن لَّمْ يَطْعَمْهُ فَإِنَّهُ مِنِّي إِلَّا مَنِ اغْتَرَفَ غُرْفَةً بِيَدِهِ ۚ فَشَرِبُوا مِنْهُ إِلَّا قَلِيلًا مِّنْهُمْ ۚ فَلَمَّا جَاوَزَهُ هُوَ وَالَّذِينَ آمَنُوا مَعَهُ قَالُوا لَا طَاقَةَ لَنَا الْيَوْمَ بِجَالُوتَ وَجُنُودِهِ ۚ قَالَ الَّذِينَ يَظُنُّونَ أَنَّهُم مُّلَاقُو اللَّهِ كَم مِّن فِئَةٍ قَلِيلَةٍ غَلَبَتْ فِئَةً كَثِيرَةً بِإِذْنِ اللَّهِ ۗ وَاللَّهُ مَعَ الصَّابِرِينَ
**Translation:** Falamma fasala talootubiljunoodi qala inna Allaha mubtaleekumbinaharin faman shariba minhu falaysa minnee waman lam yatAAamhufa-innahu minnee illa mani ightarafa ghurfatan biyadihifashariboo minhu illa qaleelan minhum falamma jawazahuhuwa wallatheena amanoo maAAahu qaloola taqata lana alyawma bijalootawajunoodihi qala allatheena yathunnoonaannahum mulaqoo Allahi kam min fi-atin qaleelatinghalabat fi-atan katheeratan bi-ithni Allahi wallahumaAAa assabireen

**II. Hadith**


### Sahih Bukhari 49
Narrated 'Ubada bin As-Samit:"Allah's Messenger (ﷺ) went out to inform the people about the (date of the) night of decree (Al-Qadr) but there happened a quarrel between two Muslim men. The Prophet (ﷺ) said, "I came out to inform you about (the date of) the night of Al-Qadr, but as so and so and so and so quarrelled, its knowledge was taken away (I forgot it) and maybe it was better for you. Now look for it in the 7th, the 9th and the 5th (of the last 10 nights of the month of Ramadan)
*(Grade: Sahih)*

### Sahih Bukhari 29
Narrated Ibn 'Abbas: The Prophet (ﷺ) said: "I was shown the Hell-fire and that the majority of its dwellers were women who were ungrateful." It was asked, "Do they disbelieve in Allah?" (or are they ungrateful to Allah?) He replied, "They are ungrateful to their husbands and are ungrateful for the favors and the good (charitable deeds) done to them. If you have always been good (benevolent) to one of them and then she sees something in you (not of her liking), she will say, 'I have never received any good from you
*(Grade: Sahih)*`,
          description: `**Why?**

This is one of the broadest and most discussed categories of zakah recipients. Understanding its scope helps you direct zakah toward efforts that strengthen the Muslim community and advance Islam's mission.


**How?**

Scholars differ on the scope of 'fi sabilillah.' Some limit it to military defence of Muslim lands. Others include da'wah efforts, Islamic education, building masjids and institutions, and supporting Islamic media. Research your madhab's position and direct zakah to causes that serve Allah's cause within those guidelines.` },
        { title: 'Ibn al-Sabil (the stranded traveller)', done: false,
          sources: `**I. Quran**


### Quran (59:7)
**Arabic:** مَّا أَفَاءَ اللَّهُ عَلَىٰ رَسُولِهِ مِنْ أَهْلِ الْقُرَىٰ فَلِلَّهِ وَلِلرَّسُولُ وَلِذِي الْقُرْبَىٰ وَالْيَتَامَىٰ وَالْمَسَاكِينِ وَابْنِ السَّبِيلِ كَيْ لَا يَكُونَ دُولَةً بَيْنَ الْأَغْنِيَاءِ مِنكُمْ ۚ وَمَا آتَاكُمُ الرَّسُولُ فَخُذُوهُ وَمَا نَهَاكُمْ عَنْهُ فَانتَهُوا ۚ وَاتَّقُوا اللَّهَ ۖ إِنَّ اللَّهَ شَدِيدُ الْعِقَابِ
**Translation:** And what Allāh restored to His Messenger from the people of the towns - it is for Allāh and for the Messenger and for [his] near relatives and orphans and the needy and the [stranded] traveler - so that it will not be a perpetual distribution among the rich from among you. And whatever the Messenger has given you - take; and what he has forbidden you - refrain from. And fear Allāh; indeed, Allāh is severe in penalty.

**II. Hadith**


### Sahih Muslim 1576
Ibn 'Abbas reported:Allah has prescribed the prayer by the tongue of your Apostle (ﷺ) as two rak'ahs for the traveller, four for the resident, and one in danger
*(Grade: Sahih)*

### Sahih Muslim 1594
Ibn 'Umar reported:The Apostle of Allah (ﷺ) said in Mina the prayer of a traveller (short prayer) ; Abu Bakr and 'Umar did the same and 'Uthmia did it for eight years or six years. Hafs (one of the narrators) said: Ibn 'Umar would also say two rak'ahs at Mina and then go to bed. I said to him: O uncle, I wish you could have said two rak'ahs (of Sunnah prayer after shorenting the Fard prayer). He said: Were I to do that, I would have completed the prayer
*(Grade: Sahih)*`,
          description: `**Why?**

Islam recognises that a traveller can become vulnerable regardless of their wealth at home. This category ensures that no Muslim is left stranded without support.


**How?**

If you encounter a traveller who is stranded and lacks funds to continue or return home, they are eligible for zakah even if they are wealthy in their home country. Provide enough to cover their immediate travel needs. In the modern context, this can include refugees and displaced persons who are far from home.` },
      ],
    },
    {
      title: 'Pay any outstanding zakah immediately',
      priority: 'urgent', tags: ['zakah', 'fard'],
      description: 'If zakah is due and has not been paid, it remains a debt upon you. Settle it as soon as possible \u2014 delaying without reason is sinful.',
      subtasks: [
        { title: 'Calculate any overdue zakah from previous years', done: false,
          sources: `**I. Quran**


### Quran (2:43)
**Arabic:** وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ  
**Translation:** And establish prayer and give zakah.

### Quran (9:34)
**Arabic:** وَالَّذِينَ يَكْنِزُونَ الذَّهَبَ وَالْفِضَّةَ وَلَا يُنفِقُونَهَا فِي سَبِيلِ اللَّهِ فَبَشِّرْهُم بِعَذَابٍ أَلِيمٍ  
**Translation:** And those who hoard gold and silver and spend it not in the way of Allah — give them tidings of a painful punishment.

**II. Hadith**


### Sahih Muslim 987
The Prophet (SAW) said: "There is no owner of gold or silver who does not pay their due zakah except that on the Day of Resurrection, plates of fire will be heated and his sides, forehead, and back will be branded with them."
*(Grade: Sahih)*`,
          description: `**Why?**

Unpaid zakah does not expire -- it accumulates as a debt to Allah. Calculating overdue amounts is the first step toward clearing this obligation and purifying your wealth retroactively.


**How?**

For each year you missed, estimate your total zakatable wealth at that time (bank balances, gold, investments, etc.) and calculate 2.5%. If exact figures are unavailable, make your best estimate with sincerity. Document each year's calculation and the total owed. Seek forgiveness from Allah for the delay.` },
        { title: 'Identify trustworthy recipients or organisations', done: false,
          sources: `**I. Quran**


### Quran (2:43)
**Arabic:** وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ وَارْكَعُوا مَعَ الرَّاكِعِينَ  
**Translation:** Keep up the prayer, pay the prescribed alms, and bow your heads [in worship] with those who bow theirs.

**I. Hadith**


### Sahih Bukhari 1458
The Prophet (SAW) sent Mu'adh to Yemen and instructed: "Inform them that Allah has made zakah obligatory on their wealth — taken from the rich among them and given to the poor among them."
*(Grade: Sahih)*`,
          description: `**Why?**

Zakah must reach eligible recipients for it to be valid. Giving to the wrong people, however well-intentioned, does not fulfil the obligation. Choosing trustworthy channels protects the validity of your worship.


**How?**

Choose recipients from the eight Quranic categories. You can distribute directly to known individuals in need, or donate through verified zakah organisations that have sharia boards and publish distribution reports. Prioritise local need first, then expand to wider communities.` },
        { title: 'Distribute the outstanding amount', done: false,
          sources: `**I. Quran**


### Quran (9:60)
**Arabic:** إِنَّمَا الصَّدَقَاتُ لِلْفُقَرَاءِ وَالْمَسَاكِينِ وَالْعَامِلِينَ عَلَيْهَا وَالْمُؤَلَّفَةِ قُلُوبُهُمْ وَفِي الرِّقَابِ وَالْغَارِمِينَ وَفِي سَبِيلِ اللَّهِ وَابْنِ السَّبِيلِ ۖ فَرِيضَةً مِّنَ اللَّهِ  
**Translation:** Zakah expenditures are only for the poor and the needy, and those employed to collect it, and for bringing hearts together, and for freeing captives, and for those in debt, and for the cause of Allah, and for the stranded traveler — an obligation from Allah.

**II. Hadith**


### Sahih Bukhari 1454
The Prophet (SAW) said: "...it is to be taken from the wealthy among them and given to the poor among them."
*(Grade: Sahih)*`,
          description: `**Why?**

Delaying zakah without a valid reason is sinful -- the poor have a right over your wealth that must be honoured promptly. Every day you delay, you withhold what belongs to others.


**How?**

Pay the full calculated amount as soon as possible. Make a clear intention (niyyah) in your heart that this payment is zakah. If you must pay in instalments due to the total being large, create a written schedule with target dates and track each payment. Complete all outstanding payments within the year.` },
      ],
    },
  ],
  faith_zakah_growth: [
    {
      title: 'Set up a zakah calendar with annual calculation date',
      priority: 'high', tags: ['zakah', 'planning'],
      description: 'Consistency in zakah requires a fixed annual date (hawl). Set it up and create a reminder system.',
      subtasks: [
        { title: 'Choose your zakah calculation date (e.g., 1st Ramadan)', done: false,
          sources: `**I. Quran**

### Quran (9:103)
**Arabic:** خُذْ مِنْ أَمْوَالِهِمْ صَدَقَةً تُطَهِّرُهُمْ وَتُزَكِّيهِم بِهَا وَصَلِّ عَلَيْهِمْ ۖ إِنَّ صَلَاتَكَ سَكَنٌ لَّهُمْ ۗ وَاللَّهُ سَمِيعٌ عَلِيمٌ
**Translation:** "In order to cleanse and purify them [Prophet], accept a gift out of their property [to make amends] and pray for them— your prayer will be a comfort to them. God is all hearing, all knowing." (Abdel Haleem)

*(The obligation of zakah is an annual purification of wealth. Choosing a fixed date is the practical means of fulfilling this divine command with discipline and regularity.)*

**II. Hadith**


### Sahih Bukhari 49
Narrated 'Ubada bin As-Samit:"Allah's Messenger (ﷺ) went out to inform the people about the (date of the) night of decree (Al-Qadr) but there happened a quarrel between two Muslim men. The Prophet (ﷺ) said, "I came out to inform you about (the date of) the night of Al-Qadr, but as so and so and so and so quarrelled, its knowledge was taken away (I forgot it) and maybe it was better for you. Now look for it in the 7th, the 9th and the 5th (of the last 10 nights of the month of Ramadan)
*(Grade: Sahih)*`,
          description: `**Why?**

A fixed annual date eliminates guesswork and procrastination. Many Muslims choose Ramadan for the multiplied reward, but any consistent date fulfils the requirement.


**How?**

Pick a date you can remember and commit to -- 1st Ramadan is popular for its barakah, but 1st Muharram or your birthday also work. Record it in both Hijri and Gregorian calendars. This becomes your permanent zakah anniversary. Every year on this date, you will calculate and pay.` },
        { title: 'Set annual calendar reminders', done: false,
          sources: `**I. Hadith**


### Sahih Bukhari 1454
The Prophet (SAW) said: "There is no zakah on less than five awsuq of dates, no zakah on less than five awqiyyah of silver, and no zakah on less than five camels." Setting a consistent annual date (hawl) ensures timely calculation.
*(Grade: Sahih)*`,
          description: `**Why?**

Without reminders, zakah dates can slip by unnoticed, leading to delayed payment. A reminder system ensures you have time to prepare your financial records before the due date.


**How?**

Set two calendar reminders: one 2 weeks before your zakah date (to start gathering bank statements, investment records, and asset valuations) and one on the date itself (to perform the final calculation and distribute). Use your phone calendar or a dedicated Islamic app.` },
        { title: 'Create a spreadsheet or use a zakah calculator app', done: false,
          sources: `**I. Quran**


### Quran (9:103)
**Arabic:** خُذْ مِنْ أَمْوَالِهِمْ صَدَقَةً تُطَهِّرُهُمْ وَتُزَكِّيهِم بِهَا وَصَلِّ عَلَيْهِمْ  
**Translation:** In order to cleanse and purify them [Prophet], accept a gift out of their property [to make amends] and pray for them — your prayer will be a comfort to them.`,
          description: `**Why?**

A structured calculation tool prevents errors and makes the annual process quick and repeatable. It also creates a historical record you can reference in future years.


**How?**

Create a simple spreadsheet with columns for: asset type, description, and current value. Include rows for cash, gold/silver, investments, trade goods, and receivable debts. Add a section for deductible debts. The difference gives your net zakatable wealth; multiply by 2.5% for your zakah due. Alternatively, use a reputable zakah calculator app.` },
      ],
    },
    {
      title: 'Research local and international zakah-eligible organisations',
      priority: 'medium', tags: ['zakah', 'community'],
      description: 'Identify reputable organisations that distribute zakah to the correct recipients with transparency and accountability.',
      subtasks: [
        { title: 'Research 3 local zakah-accepting organisations', done: false,
          sources: `**I. Quran**


### Quran (9:60)
**Arabic:** إِنَّمَا الصَّدَقَاتُ لِلْفُقَرَاءِ وَالْمَسَاكِينِ وَالْعَامِلِينَ عَلَيْهَا  
**Translation:** Alms are meant only for the poor, the needy, those who administer them, those whose hearts need winning over, to free slaves and help those in debt, for God's cause, and for travellers in need.

**I. Hadith**


### Sahih Bukhari 1458
The Prophet (SAW) said to Mu'adh: "Inform them that Allah has made zakah obligatory on their wealth — taken from the rich among them and given to the poor among them."
*(Grade: Sahih)*`,
          description: `**Why?**

Local organisations can distribute zakah efficiently to people in your own community. Verifying they separate zakah from sadaqah ensures your obligatory payment reaches only eligible recipients.


**How?**

Research at least 3 local Islamic centres, masjids, or charities that accept zakah. Ask them directly: do they maintain a separate zakah fund? Do they have criteria for verifying recipients against the eight categories? Visit their websites or speak with their administrators to confirm.` },
        { title: 'Research 2 international zakah organisations', done: false,
          sources: `**I. Quran**


### Quran (57:7)
**Arabic:** آمِنُوا بِاللَّهِ وَرَسُولِهِ وَأَنفِقُوا مِمَّا جَعَلَكُم مُّسْتَخْلَفِينَ فِيهِ  
**Translation:** Believe in God and His Messenger, and give out of what He has made pass down to you: those of you who believe and give will have a great reward.`,
          description: `**Why?**

International organisations can reach zakah-eligible Muslims in conflict zones, refugee camps, and regions of extreme poverty that you cannot access directly. Diversifying your distribution maximises impact.


**How?**

Research at least 2 established international zakah organisations. Look for those with sharia advisory boards, published annual reports, and transparent distribution data. Evaluate their reach, overhead costs, and the categories of recipients they serve. Save their donation links for your annual zakah distribution.` },
        { title: 'Verify their zakah compliance and transparency reports', done: false,
          sources: `**I. Hadith**


### Sahih Bukhari 1458
The Prophet (SAW) instructed Mu'adh: "Inform them that Allah has made zakah obligatory on their wealth — taken from the rich and given to the poor." Verifying that organisations comply with Sharia distribution is essential to fulfilling this trust.
*(Grade: Sahih)*`,
          description: `**Why?**

Not every charity that accepts 'zakah' distributes it correctly. Without verification, your zakah may go to ineligible recipients, potentially invalidating your obligation.


**How?**

For each organisation you are considering, check three things: (1) Do they have a sharia board or Islamic advisory council overseeing zakah? (2) Do they publish annual financial and distribution reports? (3) Can they confirm that zakah funds go exclusively to recipients in the eight Quranic categories? If any answer is no, consider a different organisation.` },
      ],
    },
    {
      title: 'Learn the rulings of Zakah al-Fitr and its timing',
      priority: 'medium', tags: ['zakah', 'fiqh'],
      description: 'Zakah al-Fitr is obligatory at the end of Ramadan. Learn its amount, timing, and recipients.',
      subtasks: [
        { title: 'Learn the amount and types of food acceptable for Fitr', done: false,
          sources: `**I. Hadith**


### Sahih Bukhari 1503
The Prophet (SAW) enjoined the payment of one sa' of dates or one sa' of barley as Zakat al-Fitr on every Muslim, slave or free, male or female, young or old, and he ordered that it be paid before the people go out for the Eid prayer.
*(Grade: Sahih)*

### Sunan Abu Dawud 1609
The Prophet (SAW) said: "The zakah of al-Fitr is a purification for the fasting person from idle talk and obscenity, and food for the poor."
*(Grade: Hasan — graded hasan by al-Albani)*`,
          description: `**Why?**

Zakah al-Fitr purifies the fasting person from any shortcomings during Ramadan and provides food for the poor on Eid day. Knowing the correct amount ensures your payment is valid.


**How?**

The amount is one sa' (approximately 2.5-3 kg) of a staple food per person -- dates, barley, wheat, rice, or the local equivalent. Some scholars (particularly Hanafi) permit paying the monetary value instead. Check with your local masjid for the recommended amount in your area, as it may vary by food prices.` },
        { title: 'Understand the timing (before Eid prayer)', done: false,
          sources: `**I. Hadith**


### Sahih Bukhari 1503
Ibn Umar reported: "The Messenger of Allah (SAW) made Zakah al-Fitr obligatory — one sa' of dates or one sa' of barley — on every Muslim, free or slave, male or female, young or old, and he commanded that it be given before the people go out for the Eid prayer."
*(Grade: Sahih)*`,
          description: `**Why?**

The timing of Zakah al-Fitr is a condition of its validity. Paying after the Eid prayer downgrades it to regular charity, and the obligation remains unfulfilled. Knowing the window prevents this mistake.


**How?**

The preferred time is before the Eid prayer on 1st Shawwal. Paying 1-2 days before Eid is permissible and recommended by many scholars to give recipients time to prepare for Eid. Set a reminder for the 28th of Ramadan to ensure you do not miss the window. If you pay through an organisation, confirm they distribute before the prayer.` },
        { title: 'Learn who is responsible to pay and for whom', done: false,
          sources: `**I. Hadith**


### Sahih Bukhari 1503
The Prophet (SAW) enjoined the payment of Zakat al-Fitr on every Muslim, slave or free, male or female, young or old. The head of the household pays on behalf of those under his care.
*(Grade: Sahih)*

### Sahih Bukhari 1504
Ibn Umar (RA) said: "The Prophet (SAW) ordered Zakat al-Fitr to be paid before the people go out to pray (the Eid prayer)."
*(Grade: Sahih)*`,
          description: `**Why?**

Zakah al-Fitr is an individual obligation, but the head of household pays on behalf of all dependants. Knowing who you are responsible for ensures no one in your family is missed.


**How?**

Count every person you are financially responsible for: yourself, your spouse, your children (including a newborn born before Eid), and elderly parents under your care. Multiply the per-person amount by the total number of dependants. If a child is born on the night of Eid before the prayer, their Fitr is also due.` },
      ],
    },
    {
      title: 'Study the spiritual purpose of zakah \u2014 purification and growth',
      priority: 'medium', tags: ['zakah', 'spirituality'],
      description: 'Zakah literally means purification and growth. Understand how it purifies the giver\'s soul and grows barakah in wealth.',
      subtasks: [
        { title: 'Study the Quranic ayat linking zakah with purification (9:103)', done: false,
          sources: `**I. Quran**


### Quran (9:103)
**Arabic:** خُذْ مِنْ أَمْوَالِهِمْ صَدَقَةً تُطَهِّرُهُمْ وَتُزَكِّيهِم بِهَا وَصَلِّ عَلَيْهِمْ ۖ إِنَّ صَلَاتَكَ سَكَنٌ لَّهُمْ ۗ وَاللَّهُ سَمِيعٌ عَلِيمٌ
**Translation:** [9:103] (O Prophet)! "Take alms out of their riches and thereby cleanse them and bring about their growth (in righteousness), and pray for them. Indeed your prayer is a source of tranquillity for them." Allah is All-Hearing, All-Knowing.

**II. Hadith**


### Sahih Bukhari 22
Narrated Abu Said Al-Khudri: The Prophet (ﷺ) said, "When the people of Paradise will enter Paradise and the people of Hell will go to Hell, Allah will order those who have had faith equal to the weight of a grain of mustard seed to be taken out from Hell. So they will be taken out but (by then) they will be blackened (charred). Then they will be put in the river of Haya' (rain) or Hayat (life) (the Narrator is in doubt as to which is the right term), and they will revive like a grain that grows near the bank of a flood channel. Don't you see that it comes out yellow and twisted?
*(Grade: Sahih)*

### Sahih Bukhari 541
Narrated Abu Al-Minhal:Abu Barza said, "The Prophet (ﷺ) used to offer the Fajr (prayer) when one could recognize the person sitting by him (after the prayer) and he used to recite between 60 to 100 Ayat (verses) of the Qur'an. He used to offer the Zuhr prayer as soon as the sun declined (at noon) and the \`Asr prayer at a time when a man might go and return from the farthest place in Medina and find the sun still hot. (The sub-narrator forgot what was said about the Maghrib). He did not mind delaying the \`Isha prayer to one third of the night or the middle of the night
*(Grade: Sahih)*

### Sahih Bukhari 547
Narrated Saiyar bin Salama:I along with my father went to Abu- Barza Al-Aslami and my father asked him, "How Allah's Messenger (ﷺ) used to offer the five compulsory congregational prayers?" Abu- Barza said, "The Prophet (ﷺ) used to pray the Zuhr prayer which you (people) call the first one at midday when the sun had just declined The \`Asr prayer at a time when after the prayer, a man could go to the house at the farthest place in Medina (and arrive) while the sun was still hot. (I forgot about the Maghrib prayer). The Prophet (ﷺ) Loved to delay the \`Isha which you call Al- \`Atama [??] and he disliked sleeping before it and speaking after it. After the Fajr prayer he used to leave when a man could recognize the one sitting beside him and he used to recite between 60 to 100 Ayat (in the Fajr prayer)
*(Grade: Sahih)*`,
          description: `**Why?**

This ayah reveals the dual purpose of zakah: it purifies the giver's soul from greed and miserliness, while simultaneously increasing them in goodness and barakah. Understanding this transforms zakah from a tax into an act of spiritual growth.


**How?**

Read Surah At-Tawbah 9:103 with a reliable tafsir. Reflect on how 'purification' (tathir) applies to your heart -- what attachments to wealth do you carry? Journal your reflections. Consider memorising this ayah as a reminder each time you calculate zakah.` },
        { title: 'Reflect on how giving reduces attachment to dunya', done: false,
          sources: `**I. Quran**


### Quran (9:103)
**Arabic:** خُذْ مِنْ أَمْوَالِهِمْ صَدَقَةً تُطَهِّرُهُمْ وَتُزَكِّيهِم بِهَا  
**Translation:** Take from their wealth a charity by which you purify them and cause them increase.

### Quran (64:16)
**Arabic:** وَمَن يُوقَ شُحَّ نَفْسِهِ فَأُولَٰئِكَ هُمُ الْمُفْلِحُونَ  
**Translation:** And whoever is protected from the stinginess of his soul — it is those who will be the successful.

**II. Hadith**


### Sahih Muslim 1015
The Prophet (SAW) said: "Charity does not decrease wealth."
*(Grade: Sahih)*`,
          description: `**Why?**

Attachment to dunya is one of the greatest diseases of the heart. Zakah is a divinely prescribed cure -- it loosens the grip of materialism and trains the soul to trust in Allah as the true Provider (Ar-Razzaq).


**How?**

Before paying zakah, sit with your intention. Notice any reluctance or tightness in your heart -- this is precisely what zakah is designed to treat. Give with gratitude that Allah has blessed you with enough to be a giver rather than a receiver. Reflect on the hadith: 'The upper hand (the giving hand) is better than the lower hand.'` },
        { title: 'Read about the blessings of zakah from hadith literature', done: false,
          sources: `**I. Quran**


### Quran (19:31)
**Arabic:** وَجَعَلَنِي مُبَارَكًا أَيْنَ مَا كُنتُ وَأَوْصَانِي بِالصَّلَاةِ وَالزَّكَاةِ مَا دُمْتُ حَيًّا
**Translation:** "made me blessed wherever I may be. He commanded me to pray, to give alms as long as I live." (Abdel Haleem)

*(Isa (AS) speaks — the command to give zakah was not unique to Muhammad (ﷺ)'s ummah but was given to every prophet. Reading the hadith on its blessings deepens appreciation of this universal divine institution.)*

**II. Hadith**


### Sahih Bukhari 1405
Narrated Abu Huraira: A man came to the Prophet (ﷺ) and said: "I have a dinar." He said: "Spend it on yourself." The man said: "I have another." He said: "Spend it on your family." He said: "I have another." He said: "Spend it on your servant." He said: "I have another." He said: "You know better (where to spend it)." The point: voluntary charity is boundless in blessing, and zakah is the obligatory foundation upon which all giving is built.
*(Grade: Sahih)*`,
          description: `**Why?**

The hadith literature provides both encouragement and warning regarding zakah. Studying these narrations deepens your conviction and urgency in fulfilling this pillar with excellence.


**How?**

Study key hadith on zakah: the promise that wealth does not decrease from charity (Muslim), the severe punishment for withholding zakah described in Sahih al-Bukhari (heated plates of gold/silver on the Day of Judgment), and the hadith on zakah as a proof of faith. Use a hadith collection app or book and take notes on what moves you.` },
      ],
    },
  ],
  faith_zakah_excellence: [
    {
      title: 'Establish a regular sadaqah habit beyond obligatory zakah',
      priority: 'medium', tags: ['sadaqah'],
      description: 'Voluntary charity is unlimited in reward. Set up recurring giving \u2014 even a small consistent amount is beloved to Allah.',
      subtasks: [
        { title: 'Set up a monthly automated sadaqah donation', done: false,
          sources: `**I. Quran**


### Quran (57:18)
**Arabic:** إِنَّ الْمُصَّدِّقِينَ وَالْمُصَّدِّقَاتِ وَأَقْرَضُوا اللَّهَ قَرْضًا حَسَنًا يُضَاعَفُ لَهُمْ وَلَهُمْ أَجْرٌ كَرِيمٌ  
**Translation:** Indeed, the men who practice charity and the women who practice charity and have loaned Allah a goodly loan — it will be multiplied for them, and they will have a generous reward.

### Quran (2:271)
**Arabic:** إِن تُبْدُوا الصَّدَقَاتِ فَنِعِمَّا هِيَ ۖ وَإِن تُخْفُوهَا وَتُؤْتُوهَا الْفُقَرَاءَ فَهُوَ خَيْرٌ لَّكُمْ  
**Translation:** If you disclose your charitable expenditures, they are good; but if you conceal them and give them to the poor, it is better for you.

**II. Hadith**


### Sahih Bukhari 1442
The Prophet (SAW) said: "The best charity is that which is given out of richness (surplus), and the upper hand (the giving hand) is better than the lower hand (the receiving hand)."
*(Grade: Sahih)*`,
          description: `**Why?**

Consistency in giving is more beloved to Allah than occasional large donations. Automating sadaqah removes the friction of deciding each month and ensures the habit never lapses.


**How?**

Set up an automatic monthly bank transfer to a charity of your choice. Start with an amount you can sustain without hardship -- even a small amount counts. The Prophet (SAW) said the most beloved deeds to Allah are the most consistent, even if small. Review and increase the amount as your income grows.` },
        { title: 'Identify causes that resonate with you (orphans, education, water)', done: false,
          sources: `**I. Quran**


### Quran (76:8-9)
**Arabic:** وَيُطْعِمُونَ الطَّعَامَ عَلَىٰ حُبِّهِ مِسْكِينًا وَيَتِيمًا وَأَسِيرًا ۝ إِنَّمَا نُطْعِمُكُمْ لِوَجْهِ اللَّهِ لَا نُرِيدُ مِنكُمْ جَزَاءً وَلَا شُكُورًا  
**Translation:** And they give food in spite of love for it to the needy, the orphan, and the captive. We feed you only for the countenance of Allah. We wish not from you reward or gratitude.

### Quran (93:9-10)
**Arabic:** فَأَمَّا الْيَتِيمَ فَلَا تَقْهَرْ ۝ وَأَمَّا السَّائِلَ فَلَا تَنْهَرْ  
**Translation:** So as for the orphan, do not oppress him. And as for the petitioner, do not repel him.

**II. Hadith**


### Sahih Bukhari 5304
The Prophet (SAW) said: "I and the one who sponsors an orphan will be in Paradise like these two" — and he indicated his index and middle fingers.
*(Grade: Sahih)*`,
          description: `**Why?**

When you give to a cause that deeply moves you, your giving becomes an act of love rather than obligation. This emotional connection sustains long-term generosity and makes your charity more sincere.


**How?**

Reflect on which needs stir your heart most: orphan sponsorship, clean water projects, Islamic education, feeding the hungry, or supporting refugees. Choose one primary cause and one secondary cause. Research specific organisations serving those causes. Sign up for their updates so you stay connected to the impact of your giving.` },
        { title: 'Track your giving for motivation and accountability', done: false,
          sources: `**I. Quran**


### Quran (2:271)
**Arabic:** إِن تُبْدُوا الصَّدَقَاتِ فَنِعِمَّا هِيَ ۖ وَإِن تُخْفُوهَا وَتُؤْتُوهَا الْفُقَرَاءَ فَهُوَ خَيْرٌ لَّكُمْ  
**Translation:** If you give charity openly, it is good, but if you keep it secret and give to the needy in private, that is better for you, and it will atone for some of your bad deeds.

**I. Hadith**


### Sahih Bukhari 1423
The Prophet (SAW) said: "Seven will be shaded by Allah on a day when there is no shade but His..." among them: "a man who gives charity so secretly that his left hand does not know what his right hand has given."
*(Grade: Sahih)*`,
          description: `**Why?**

Tracking your sadaqah is not about showing off -- it is about accountability to yourself and motivation to grow. Reviewing your giving history reveals patterns and inspires you to increase in generosity.


**How?**

Create a simple log (spreadsheet, notes app, or journal) with columns for: date, amount, recipient/cause, and a brief note on your intention. Review it quarterly. Look for trends -- are you giving more or less over time? Set a goal to increase your sadaqah by a small percentage each year.` },
      ],
    },
    {
      title: 'Explore setting up a waqf (endowment) for ongoing benefit',
      priority: 'low', tags: ['waqf', 'sadaqah-jariyah'],
      description: 'A waqf is an endowment whose benefits continue indefinitely \u2014 sadaqah jariyah in its highest form. Explore options suited to your capacity.',
      subtasks: [
        { title: 'Learn the Islamic principles of waqf', done: false,
          sources: `**I. Quran**


### Quran (3:104)
**Arabic:** وَلْتَكُن مِّنكُمْ أُمَّةٌ يَدْعُونَ إِلَى الْخَيْرِ وَيَأْمُرُونَ بِالْمَعْرُوفِ وَيَنْهَوْنَ عَنِ الْمُنكَرِ ۚ وَأُولَٰئِكَ هُمُ الْمُفْلِحُونَ
**Translation:** Let there arise out of you a group of people inviting to all that is good (Islâm), enjoining Al-Ma‘rûf (i.e. Islâmic Monotheism and all that Islâm orders one to do) and forbidding Al-Munkar (polytheism and disbelief and all that Islâm has forbidden). And it is they who are the successful.

### Quran (26:197)
**Arabic:** أَوَلَمْ يَكُن لَّهُمْ آيَةً أَن يَعْلَمَهُ عُلَمَاءُ بَنِي إِسْرَائِيلَ
**Translation:** Is it not a sign to them that the learned scholars (like ‘Abdullâh bin Salâm رضي الله عنه who embraced Islâm) of the Children of Israel knew it (as true)?

**II. Hadith**


### Sahih Bukhari 1643
Narrated \`Urwa:I asked \`Aisha : "How do you interpret the statement of Allah,. : Verily! (the mountains) As-Safa and Al-Marwa are among the symbols of Allah, and whoever performs the Hajj to the Ka\`ba or performs \`Umra, it is not harmful for him to perform Tawaf between them (Safa and Marwa.) (2.158). By Allah! (it is evident from this revelation) there is no harm if one does not perform Tawaf between Safa and Marwa." \`Aisha said, "O, my nephew! Your interpretation is not true. Had this interpretation of yours been correct, the statement of Allah should have been, 'It is not harmful for him if he does not perform Tawaf between them.' But in fact, this divine inspiration was revealed concerning the Ansar who used to assume Ihram for worshipping an idol called "Manat" which they used to worship at a place called Al-Mushallal before they embraced Islam, and whoever assumed Ihram (for the idol), would consider it not right to perform Tawaf between Safa and Marwa. When they embraced Islam, they asked Allah's Messenger (ﷺ) regarding it, saying, "O Allah's Apostle! We used to refrain from Tawaf between Safa and Marwa." So Allah revealed: 'Verily; (the mountains) As-Safa and Al-Marwa are among the symbols of Allah.' " Aisha added, "Surely, Allah's Apostle set the tradition of Tawaf between Safa and Marwa, so nobody is allowed to omit the Tawaf between them." Later on I (\`Urwa) told Abu Bakr bin \`Abdur-Rahman (of \`Aisha's narration) and he said, 'I have not heard of such information, but I heard learned men saying that all the people, except those whom \`Aisha mentioned and who used to assume Ihram for the sake of Manat, used to perform Tawaf between Safa and Marwa. When Allah referred to the Tawaf of the Ka\`ba and did not mention Safa and Marwa in the Qur'an, the people asked, 'O Allah's Messenger (ﷺ)! We used to perform Tawaf between Safa and Marwa and Allah has revealed (the verses concerning) Tawaf of the Ka\`ba and has not mentioned Safa and Marwa. Is there any harm if we perform Tawaf between Safa and Marwa?' So Allah revealed: "Verily As-Safa and Al- Marwa are among the symbols of Allah." Abu Bakr said, "It seems that this verse was revealed concerning the two groups, those who used to refrain from Tawaf between Safa and Marwa in the Pre- Islamic Period of ignorance and those who used to perform the Tawaf then, and after embracing Islam they refrained from the Tawaf between them as Allah had enjoined Tawaf of the Ka\`ba and did not mention Tawaf (of Safa and Marwa) till later after mentioning the Tawaf of the Ka\`ba
*(Grade: Sahih)*

### Sahih Bukhari 3
Narrated 'Aisha (the mother of the faithful believers):The commencement of the Divine Inspiration to Allah's Messenger (ﷺ) was in the form of good dreams which came true like bright daylight, and then the love of seclusion was bestowed upon him. He used to go in seclusion in the cave of Hira where he used to worship (Allah alone) continuously for many days before his desire to see his family. He used to take with him the journey food for the stay and then come back to (his wife) Khadija to take his food likewise again till suddenly the Truth descended upon him while he was in the cave of Hira. The angel came to him and asked him to read. The Prophet (ﷺ) replied, "I do not know how to read." The Prophet (ﷺ) added, "The angel caught me (forcefully) and pressed me so hard that I could not bear it any more. He then released me and again asked me to read and I replied, 'I do not know how to read.' Thereupon he caught me again and pressed me a second time till I could not bear it any more. He then released me and again asked me to read but again I replied, 'I do not know how to read (or what shall I read)?' Thereupon he caught me for the third time and pressed me, and then released me and said, 'Read in the name of your Lord, who has created (all that exists), created man from a clot. Read! And your Lord is the Most Generous." (96.1, 96.2, 96.3) Then Allah's Messenger (ﷺ) returned with the Inspiration and with his heart beating severely. Then he went to Khadija bint Khuwailid and said, "Cover me! Cover me!" They covered him till his fear was over and after that he told her everything that had happened and said, "I fear that something may happen to me." Khadija replied, "Never! By Allah, Allah will never disgrace you. You keep good relations with your kith and kin, help the poor and the destitute, serve your guests generously and assist the deserving calamity-afflicted ones." Khadija then accompanied him to her cousin Waraqa bin Naufal bin Asad bin 'Abdul 'Uzza, who, during the pre-Islamic Period became a Christian and used to write the writing with Hebrew letters. He would write from the Gospel in Hebrew as much as Allah wished him to write. He was an old man and had lost his eyesight. Khadija said to Waraqa, "Listen to the story of your nephew, O my cousin!" Waraqa asked, "O my nephew! What have you seen?" Allah's Messenger (ﷺ) described whatever he had seen. Waraqa said, "This is the same one who keeps the secrets (angel Gabriel) whom Allah had sent to Moses. I wish I were young and could live up to the time when your people would turn you out." Allah's Messenger (ﷺ) asked, "Will they drive me out?" Waraqa replied in the affirmative and said, "Anyone (man) who came with something similar to what you have brought was treated with hostility; and if I should remain alive till the day when you will be turned out then I would support you strongly." But after a few days Waraqa died and the Divine Inspiration was also paused for a while
*(Grade: Sahih)*`,
          description: `**Why?**

Waqf is one of the most powerful forms of sadaqah jariyah -- an endowment whose rewards continue flowing to you even after death. Understanding its principles opens the door to leaving a lasting legacy.


**How?**

Study the Islamic principles of waqf: an asset is dedicated permanently to a charitable purpose, the original asset (the 'ayn') is preserved and cannot be sold, and only its returns or benefits are distributed. Learn the difference between waqf ahli (family endowment) and waqf khayri (public charitable endowment). Read about historical awqaf that funded hospitals, schools, and masjids for centuries.` },
        { title: 'Research existing waqf platforms and institutions', done: false,
          sources: `**I. Hadith**


### Sahih Muslim 1631
The Prophet (SAW) said: "When a son of Adam dies, his deeds come to an end except for three: ongoing charity (sadaqah jariyah), knowledge from which benefit is derived, or a righteous child who prays for him." Waqf is the institutionalised form of sadaqah jariyah.
*(Grade: Sahih)*`,
          description: `**Why?**

You do not need to be wealthy to participate in waqf. Modern platforms offer collective waqf options where many contributors pool resources to create a larger endowment, making this form of ongoing charity accessible to everyone.


**How?**

Research established waqf institutions in your region and internationally. Look for platforms that offer collective waqf participation with low minimum contributions. Evaluate their governance structure, investment strategy, and distribution track record. Shortlist 2-3 that align with causes you care about.` },
        { title: 'Explore contributing to or establishing a small waqf', done: false,
          sources: `**I. Quran**


### Quran (2:261)
**Arabic:** مَّثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنبَتَتْ سَبْعَ سَنَابِلَ فِي كُلِّ سُنبُلَةٍ مِّائَةُ حَبَّةٍ  
**Translation:** Those who spend their wealth in God's cause are like grains of corn that produce seven ears, each bearing a hundred grains. God gives multiple increase to whoever He wishes.

**I. Hadith**


### Sahih Muslim 1631
The Prophet (SAW) said: "When a son of Adam dies, his deeds come to an end except for three: ongoing charity (sadaqah jariyah), knowledge from which benefit is derived, or a righteous child who prays for him."
*(Grade: Sahih)*`,
          description: `**Why?**

The Prophet (SAW) taught that three deeds continue after death, and sadaqah jariyah is one of them. A waqf contribution, however small, can generate rewards for you long after you have left this world.


**How?**

Choose a waqf cause that resonates with you: a masjid, an Islamic school, a water well, or a medical clinic. Even a modest contribution to a collective waqf counts as participation. Make your contribution with a clear intention for ongoing benefit. If your capacity grows, consider establishing a named waqf dedicated to a specific cause.` },
      ],
    },
    {
      title: 'Mentor someone on zakah calculation and distribution',
      priority: 'low', tags: ['zakah', 'dawah'],
      description: 'Many Muslims are uncertain about zakah calculation. Help someone in your circle understand their obligations.',
      subtasks: [
        { title: 'Identify someone who needs guidance on zakah', done: false,
          sources: `**I. Quran**


### Quran (9:60)
**Arabic:** إِنَّمَا الصَّدَقَاتُ لِلْفُقَرَاءِ وَالْمَسَاكِينِ وَالْعَامِلِينَ عَلَيْهَا  
**Translation:** Zakah expenditures are only for the poor and the needy, and those employed to collect it...

### Quran (3:104)
**Arabic:** وَلْتَكُن مِّنكُمْ أُمَّةٌ يَدْعُونَ إِلَى الْخَيْرِ وَيَأْمُرُونَ بِالْمَعْرُوفِ  
**Translation:** And let there be from you a nation inviting to good, enjoining what is right.

**II. Hadith**


### Sahih Muslim 1893
The Prophet (SAW) said: "Whoever guides someone to goodness will have a reward like that of the one who does it."
*(Grade: Sahih)*`,
          description: `**Why?**

Many Muslims neglect zakah not out of unwillingness but out of confusion about how to calculate it. By identifying and helping someone, you earn reward for both your own knowledge and their resulting worship.


**How?**

Think of friends, family members, colleagues, or new Muslims who may not be calculating zakah. Approach them with gentleness and without judgment. You might say: 'I recently learned more about zakah calculation -- would you like to go through it together?' Sensitivity is key, as financial matters are private.` },
        { title: 'Walk them through calculating their zakatable wealth', done: false,
          sources: `**I. Quran**


### Quran (9:60)
**Arabic:** إِنَّمَا الصَّدَقَاتُ لِلْفُقَرَاءِ وَالْمَسَاكِينِ وَالْعَامِلِينَ عَلَيْهَا وَالْمُؤَلَّفَةِ قُلُوبُهُمْ وَفِي الرِّقَابِ وَالْغَارِمِينَ وَفِي سَبِيلِ اللَّهِ وَابْنِ السَّبِيلِ  
**Translation:** Alms are meant only for the poor, the needy, those who administer them, those whose hearts need winning over, to free slaves and help those in debt, for God's cause, and for travellers in need.

**I. Hadith**


### Sahih Bukhari 1454
The Prophet (SAW) established the nisab thresholds: five awsuq of dates, five awqiyyah of silver, and five camels. Calculating zakatable wealth accurately begins with identifying which assets reach these thresholds.
*(Grade: Sahih)*`,
          description: `**Why?**

Walking someone through the calculation step by step demystifies zakah and empowers them to do it independently in future years. Teaching is one of the highest forms of sadaqah.


**How?**

Sit down together (in person or virtually) and go through each step: list all zakatable assets, look up the current nisab, subtract qualifying debts, and calculate 2.5% of the net total. Use a spreadsheet or a zakah calculator app to make it visual and clear. Save the template so they can reuse it next year.` },
        { title: 'Help them identify appropriate recipients', done: false,
          sources: `**I. Quran**


### Quran (59:7)
**Arabic:** كَيْ لَا يَكُونَ دُولَةً بَيْنَ الْأَغْنِيَاءِ مِنكُمْ  
**Translation:** This is so that they do not just circulate among those of you who are rich.

**I. Hadith**


### Sahih Bukhari 1458
The Prophet (SAW) said to Mu'adh: "Inform them that Allah has made zakah obligatory — taken from the rich among them and given to the poor among them." Helping others identify appropriate recipients fulfils this prophetic mission.
*(Grade: Sahih)*`,
          description: `**Why?**

Calculation is only half the task -- proper distribution is equally important. Helping someone understand the eight categories ensures their zakah is valid and reaches those who truly deserve it.


**How?**

Briefly explain the eight categories from Surah At-Tawbah 9:60. Share your own list of trusted zakah organisations or local recipients. Help them decide how to split their zakah -- some locally, some internationally. Encourage them to make the intention (niyyah) clear at the time of payment.` },
      ],
    },
  ],

  // \u2500\u2500 SAWM \u2500\u2500
  faith_sawm_core: [
    {
      title: 'Learn the fard requirements of Ramadan fasting (intention, abstaining, timing)',
      priority: 'urgent', tags: ['sawm', 'fard'],
      description: 'Fasting in Ramadan is the fourth pillar of Islam. Know what is required for a valid fast \u2014 the intention, what to abstain from, and the time boundaries.',
      subtasks: [
        { title: 'Learn when and how to make the intention (niyyah) for fasting', done: false,
          sources: `**I. Quran**


### Quran (2:183)
**Arabic:** يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ كَمَا كُتِبَ عَلَى الَّذِينَ مِن قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ
**Translation:** "You who believe, fasting is prescribed for you, as it was prescribed for those before you, so that you may be mindful of God." (Abdel Haleem)

*(Fasting is prescribed — كُتِبَ — meaning it is an obligation. The niyyah is the inner act that orients this obligation toward its purpose: God-consciousness, taqwa.)*

**II. Hadith**


### Sahih Bukhari 1
Narrated 'Umar bin al-Khattab: I heard Allah's Messenger (ﷺ) saying, "The reward of deeds depends upon the intentions and every person will get the reward according to what he has intended."
*(Grade: Sahih)*`,
          description: `**Why?**

The niyyah distinguishes a genuine act of worship from mere hunger. Without a conscious intention directed to Allah, the fast has no spiritual weight.


**How?**

The intention must be made before Fajr for obligatory fasts. It resides in the heart — no verbal declaration is required. Renew it each night before sleeping or during suhoor. Confirm you understand the distinction between obligatory and voluntary fast intentions.` },
        { title: 'Know the fasting hours (Fajr to Maghrib)', done: false,
          sources: `**I. Quran**


### Quran (2:184)
**Arabic:** أَيَّامًا مَّعْدُودَاتٍ ۚ فَمَن كَانَ مِنكُم مَّرِيضًا أَوْ عَلَىٰ سَفَرٍ فَعِدَّةٌ مِّنْ أَيَّامٍ أُخَرَ ۚ وَعَلَى الَّذِينَ يُطِيقُونَهُ فِدْيَةٌ طَعَامُ مِسْكِينٍ ۖ فَمَن تَطَوَّعَ خَيْرًا فَهُوَ خَيْرٌ لَّهُ ۚ وَأَن تَصُومُوا خَيْرٌ لَّكُمْ ۖ إِن كُنتُمْ تَعْلَمُونَ
**Translation:** "Fast for a specific number of days, but if one of you is ill, or on a journey, on other days later. For those who can fast only with extreme difficulty, there is a way to compensate— feed a needy person. But if anyone does good of his own accord, it is better for him, and fasting is better for you, if only you knew." (Abdel Haleem)

**II. Hadith**


### Sahih Bukhari 1916
Narrated Sahl bin Sa'd: The Prophet (ﷺ) said, "The people will remain on the right path as long as they hasten the breaking of the fast (at Maghrib)."
*(Grade: Sahih)*`,
          description: `**Why?**

Knowing the exact boundaries of the fast protects its validity. Eating even a moment after Fajr or breaking fast before Maghrib can invalidate the entire day.


**How?**

Fasting begins at the onset of Fajr (true dawn) and ends at Maghrib (sunset). Eating during suhoor is permissible until the Fajr adhan. Use a reliable prayer-time app for precise times in your location and stop eating a few minutes before Fajr as a safety margin.` },
        { title: 'Learn what you must abstain from (food, drink, relations)', done: false,
          sources: `**I. Quran**


### Quran (19:26)
**Arabic:** فَكُلِي وَاشْرَبِي وَقَرِّي عَيْنًا ۖ فَإِمَّا تَرَيِنَّ مِنَ الْبَشَرِ أَحَدًا فَقُولِي إِنِّي نَذَرْتُ لِلرَّحْمَٰنِ صَوْمًا فَلَنْ أُكَلِّمَ الْيَوْمَ إِنسِيًّا
**Translation:** “so eat, drink, be glad, and say to anyone you may see: ‘I have vowed to the Lord of Mercy to abstain from conversation, and I will not talk to anyone today.’” (Abdel Haleem)

*(Maryam’s (AS) “sawm” — صَوْمًا — was abstinence from speech, not just food. This verse reveals the deeper dimension: fasting is complete abstention from what the soul is commanded to withhold.)*

**II. Hadith**


### Sahih Bukhari 1894
Narrated Abu Huraira: The Prophet (ﷺ) said, “Whoever does not give up false speech and acting upon it and offensive behaviour, Allah has no need that he should give up his food and drink.”
*(Grade: Sahih)*`,
          description: `**Why?**

The physical restraints of fasting are the pillars that hold the fast together. Ignorance of the basics risks repeated invalid fasts and unnecessary guilt.


**How?**

A fasting person abstains from food, drink, and marital relations from Fajr to Maghrib. Intentional violation requires making up the day and possibly kaffarah. Study a reliable fiqh source to understand the difference between accidental and deliberate violations and their respective consequences.` },
        { title: 'Understand who is exempt from fasting and their alternatives', done: false,
          sources: `**I. Quran**


### Quran (2:184)
**Arabic:** فَمَن كَانَ مِنكُم مَّرِيضًا أَوْ عَلَىٰ سَفَرٍ فَعِدَّةٌ مِّنْ أَيَّامٍ أُخَرَ ۚ وَعَلَى الَّذِينَ يُطِيقُونَهُ فِدْيَةٌ طَعَامُ مِسْكِينٍ  
**Translation:** So whoever among you is ill or on a journey — then an equal number of days are to be made up. And upon those who are able to fast but with hardship — a ransom of feeding a poor person.

### Quran (2:185)
**Arabic:** يُرِيدُ اللَّهُ بِكُمُ الْيُسْرَ وَلَا يُرِيدُ بِكُمُ الْعُسْرَ  
**Translation:** Allah intends for you ease and does not intend for you hardship.`,
          description: `**Why?**

Allah's mercy built exemptions into this obligation. Understanding them prevents unnecessary hardship and ensures those who cannot fast still fulfil their duty through proper alternatives.


**How?**

Exemptions include: the ill, the traveller, pregnant/nursing women, the elderly who cannot fast, and children. Most must make up missed days later; the permanently unable pay fidyah (feeding one poor person per missed day). Review which category applies to you or your family and learn the correct alternative for each.` },
      ],
    },
    {
      title: 'Understand the conditions that break the fast vs. those that do not',
      priority: 'high', tags: ['sawm', 'fiqh'],
      description: 'Many common situations cause confusion. Study the fiqh of what invalidates the fast versus what is permissible.',
      subtasks: [
        { title: 'List the acts that clearly break the fast', done: false,
          sources: `**I. Quran**


### Quran (2:187)
**Arabic:** وَكُلُوا وَاشْرَبُوا حَتَّىٰ يَتَبَيَّنَ لَكُمُ الْخَيْطُ الْأَبْيَضُ مِنَ الْخَيْطِ الْأَسْوَدِ مِنَ الْفَجْرِ ۖ ثُمَّ أَتِمُّوا الصِّيَامَ إِلَى اللَّيْلِ  
**Translation:** And eat and drink until the white thread of dawn becomes distinct to you from the black thread. Then complete the fast until the night.

**II. Hadith**


### Sahih Bukhari 1933
The Prophet (SAW) said: "Whoever does not give up false speech and acting upon it, Allah has no need that he should give up his food and drink."
*(Grade: Sahih)*`,
          description: `**Why?**

Confusing what does and does not break the fast leads to either unnecessary guilt or unknowingly invalid fasts. Clarity here protects your worship.


**How?**

Deliberate eating, drinking, and sexual intercourse during fasting hours invalidate the fast. Vomiting intentionally also breaks it according to most scholars. Write out a clear list and keep it accessible during Ramadan for quick reference.` },
        { title: 'Learn common misconceptions (e.g., swallowing saliva, eye drops)', done: false,
          sources: `**I. Quran**


### Quran (2:187)
**Arabic:** أُحِلَّ لَكُمْ لَيْلَةَ الصِّيَامِ الرَّفَثُ إِلَىٰ نِسَائِكُمْ  
**Translation:** It has been made permissible for you the night preceding fasting to go to your wives.

**II. Hadith**


### Sahih Bukhari 1938
The Prophet (SAW) said: "If somebody eats or drinks forgetfully then he should complete his fast, for what he has eaten or drunk has been given to him by Allah."
*(Grade: Sahih)*`,
          description: `**Why?**

Misconceptions about what breaks the fast cause needless anxiety and may lead people to invalidate fasts they did not actually break. Knowledge removes doubt.


**How?**

Swallowing saliva, using eye drops, tasting food without swallowing, and receiving injections (non-nutritional) do not break the fast according to most scholars. Study a fiqh reference that addresses modern scenarios (toothpaste, blood tests, asthma inhalers) and note the scholarly consensus for each.` },
        { title: 'Understand when kaffarah vs. qada is required', done: false,
          sources: `**I. Quran**


### Quran (2:183)
**Arabic:** يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ كَمَا كُتِبَ عَلَى الَّذِينَ مِن قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ  
**Translation:** O you who believe, decreed upon you is fasting as it was decreed upon those before you, that you may become righteous.

**II. Hadith**


### Sahih Bukhari 1936
The Prophet (SAW) taught that kaffarah (expiation) is required for intentionally breaking the fast during Ramadan by marital relations: freeing a slave, or fasting two consecutive months, or feeding sixty poor people.
*(Grade: Sahih)*`,
          description: `**Why?**

The distinction between qada and kaffarah determines how you rectify a missed or broken fast. Misunderstanding this can leave obligations unfulfilled.


**How?**

Qada (making up) is required for any missed fast. Kaffarah (expiation \u2014 freeing a slave, fasting 60 days, or feeding 60 people) is required for deliberately breaking a Ramadan fast without excuse. Study which violations require only qada versus those that also require kaffarah, and consult a scholar if your situation is unclear.` },
      ],
    },
    {
      title: 'Learn the rules for making up (qada) missed fasts',
      priority: 'high', tags: ['sawm', 'fiqh'],
      description: 'Anyone who misses obligatory fasts must make them up. Learn the rulings around timing, sequence, and fidyah for those unable to fast.',
      subtasks: [
        { title: 'Calculate how many fasts you owe from previous years', done: false,
          sources: `**I. Quran**


### Quran (2:185)
**Arabic:** فَمَن شَهِدَ مِنكُمُ الشَّهْرَ فَلْيَصُمْهُ ۖ وَمَن كَانَ مَرِيضًا أَوْ عَلَىٰ سَفَرٍ فَعِدَّةٌ مِّنْ أَيَّامٍ أُخَرَ  
**Translation:** So whoever sights the month, let him fast it; and whoever is ill or on a journey — then an equal number of other days.

**II. Hadith**


### Sahih Muslim 1146
A'ishah (RA) said: "I used to owe days from Ramadan and I could not make them up until Sha'ban." This indicates that qada should be made up before the next Ramadan.
*(Grade: Sahih)*`,
          description: `**Why?**

Missed fasts are a debt to Allah. You cannot repay what you have not counted. An honest accounting is the first step toward clearing this obligation.


**How?**

Honestly account for any Ramadan fasts you missed due to illness, travel, menstruation, or other valid reasons. Go year by year through each previous Ramadan. Record the total owed in a dedicated note or app.` },
        { title: 'Learn the deadline for making up Ramadan fasts', done: false,
          sources: `**I. Quran**


### Quran (2:185)
**Arabic:** شَهْرُ رَمَضَانَ الَّذِي أُنزِلَ فِيهِ الْقُرْآنُ هُدًى لِّلنَّاسِ وَبَيِّنَاتٍ مِّنَ الْهُدَىٰ وَالْفُرْقَانِ ۚ فَمَن شَهِدَ مِنكُمُ الشَّهْرَ فَلْيَصُمْهُ ۖ وَمَن كَانَ مَرِيضًا أَوْ عَلَىٰ سَفَرٍ فَعِدَّةٌ مِّنْ أَيَّامٍ أُخَرَ ۗ يُرِيدُ اللَّهُ بِكُمُ الْيُسْرَ وَلَا يُرِيدُ بِكُمُ الْعُسْرَ وَلِتُكْمِلُوا الْعِدَّةَ وَلِتُكَبِّرُوا اللَّهَ عَلَىٰ مَا هَدَاكُمْ وَلَعَلَّكُمْ تَشْكُرُونَ
**Translation:** It was in the month of Ramadan that the Quran was revealed as guidance for mankind, clear messages giving guidance and distinguishing between right and wrong. So any one of you who is present that month should fast, and anyone who is ill or on a journey should make up for the lost days by fasting on other days later. God wants ease for you, not hardship. He wants you to complete the prescribed period and to glorify Him for having guided you, so that you may be thankful.

**II. Hadith**


### Sahih Bukhari 38
Narrated Abu Huraira: Allah's Messenger (ﷺ) said, "Whoever observes fasts during the month of Ramadan out of sincere faith, and hoping to attain Allah's rewards, then all his past sins will be forgiven
*(Grade: Sahih)*`,
          description: `**Why?**

Delaying make-up fasts without awareness of the deadline can compound your obligation. Some scholars hold that unjustified delay adds fidyah on top of qada.


**How?**

Missed fasts should ideally be made up before the next Ramadan arrives. Scholars differ on whether additional fidyah is owed if they are delayed beyond that without valid excuse. Set a personal deadline well before the next Ramadan and schedule make-up fasts accordingly.` },
        { title: 'Understand the fidyah ruling for those permanently unable to fast', done: false,
          sources: `**I. Quran**


### Quran (2:184)
**Arabic:** أَيَّامًا مَّعْدُودَاتٍ ۚ فَمَن كَانَ مِنكُم مَّرِيضًا أَوْ عَلَىٰ سَفَرٍ فَعِدَّةٌ مِّنْ أَيَّامٍ أُخَرَ ۚ وَعَلَى الَّذِينَ يُطِيقُونَهُ فِدْيَةٌ طَعَامُ مِسْكِينٍ ۖ فَمَن تَطَوَّعَ خَيْرًا فَهُوَ خَيْرٌ لَّهُ ۚ وَأَن تَصُومُوا خَيْرٌ لَّكُمْ ۖ إِن كُنتُمْ تَعْلَمُونَ
**Translation:** "Fast for a specific number of days, but if one of you is ill, or on a journey, on other days later. For those who can fast only with extreme difficulty, there is a way to compensate— feed a needy person. But if anyone does good of his own accord, it is better for him, and fasting is better for you, if only you knew." (Abdel Haleem)

**II. Hadith**


### Sahih Bukhari 4505
Narrated Ibn \`Abbas: The Verse 'Those who can fast only with extreme difficulty, there is a way to compensate' was a concession granted to very old men and very old women who could not fast, allowing them to feed one poor person for each day (instead).
*(Grade: Sahih)*`,
          description: `**Why?**

For those permanently unable to fast, fidyah is the merciful alternative that keeps them connected to the obligation. Understanding the amount and method ensures it is done correctly.


**How?**

The elderly or chronically ill who cannot fast pay fidyah: feeding one poor person for each missed day. The amount is one meal or its monetary equivalent per day. Calculate the total based on days missed, identify a trustworthy charity or local family to receive it, and fulfil it before the next Ramadan.` },
      ],
    },
    {
      title: 'Make up any missed Ramadan fasts from previous years',
      priority: 'urgent', tags: ['sawm', 'qada'],
      description: 'Outstanding fasts are a debt to Allah. Begin making them up systematically \u2014 even one per week adds up.',
      subtasks: [
        { title: 'Calculate the total number of missed fasts', done: false,
          sources: `**I. Quran**


### Quran (2:184)
**Arabic:** أَيَّامًا مَّعْدُودَاتٍ ۚ فَمَن كَانَ مِنكُم مَّرِيضًا أَوْ عَلَىٰ سَفَرٍ فَعِدَّةٌ مِّنْ أَيَّامٍ أُخَرَ ۚ وَعَلَى الَّذِينَ يُطِيقُونَهُ فِدْيَةٌ طَعَامُ مِسْكِينٍ ۖ فَمَن تَطَوَّعَ خَيْرًا فَهُوَ خَيْرٌ لَّهُ ۚ وَأَن تَصُومُوا خَيْرٌ لَّكُمْ ۖ إِن كُنتُمْ تَعْلَمُونَ
**Translation:** "Fast for a specific number of days, but if one of you is ill, or on a journey, on other days later. For those who can fast only with extreme difficulty, there is a way to compensate— feed a needy person. But if anyone does good of his own accord, it is better for him, and fasting is better for you, if only you knew." (Abdel Haleem)

**II. Hadith**


### Sahih Bukhari 1951
Narrated \`Aisha: Sometimes I had missed fasts from Ramadan which I could not make up except in Sha'ban due to (being occupied in) serving the Prophet (ﷺ).
*(Grade: Sahih)*`,
          description: `**Why?**

You cannot systematically repay a debt you have not quantified. A clear number turns a vague obligation into a concrete, achievable goal.


**How?**

Review each previous Ramadan year by year. Count days missed for valid reasons. If uncertain, estimate on the higher side to be safe. Record the final number in a dedicated tracker so you can measure progress.` },
        { title: 'Create a schedule to make them up (e.g., Mondays and Thursdays)', done: false,
          sources: `**I. Quran**


### Quran (2:185)
**Arabic:** فَمَن شَهِدَ مِنكُمُ الشَّهْرَ فَلْيَصُمْهُ ۖ وَمَن كَانَ مَرِيضًا أَوْ عَلَىٰ سَفَرٍ فَعِدَّةٌ مِّنْ أَيَّامٍ أُخَرَ  
**Translation:** So any one of you who is present that month should fast, and anyone who is ill or on a journey should make up for the lost days by fasting on other days later.

**I. Hadith**


### Sahih Bukhari 1950
The Prophet (SAW) said: "Whoever has fasting days to make up from Ramadan, let him fast them." Aishah reported that she would make up her missed Ramadan fasts in Sha'ban.
*(Grade: Sahih)*`,
          description: `**Why?**

A schedule transforms good intentions into consistent action. Combining make-up fasts with Sunnah days lets you earn double reward while clearing your debt.


**How?**

Combine make-up fasts with Sunnah days for double reward. Mondays and Thursdays or the white days (13th-15th of each lunar month) are ideal choices. Block these days on your calendar and set reminders the night before to make your niyyah.` },
        { title: 'Track your progress until all are completed', done: false,
          sources: `**I. Quran**


### Quran (84:19)
**Arabic:** لَتَرْكَبُنَّ طَبَقًا عَن طَبَقٍ
**Translation:** "you will progress from stage to stage." (Abdel Haleem)

*(The Quran's promise of progression stage by stage applies directly to this gradual journey of completing a spiritual debt — each fast cleared is a rung climbed.)*

**II. Hadith**


### Sahih Bukhari 1950
Narrated \`Aisha: The Prophet (ﷺ) said, "The most beloved deeds to Allah are those done consistently, even if they are few." [Paying back missed fasts one by one is an example of consistent, deliberate worship.]
*(Grade: Sahih)*`,
          description: `**Why?**

Visible progress sustains motivation over what may be a months-long journey. Completing this obligation lifts a spiritual weight and brings immense relief.


**How?**

Use a simple tally, spreadsheet, or app to count down your remaining fasts. Mark each completed fast. Celebrate milestones (halfway, last ten, final fast) to maintain momentum. When done, offer thanks to Allah for enabling you to fulfil the debt.` },
      ],
    },
  ],
  faith_sawm_growth: [
    {
      title: 'Fast the voluntary Mondays and Thursdays regularly',
      priority: 'medium', tags: ['sawm', 'sunnah'],
      description: 'The Prophet (SAW) used to fast Mondays and Thursdays. Deeds are presented to Allah on these days, and he loved to be fasting when his deeds were shown.',
      subtasks: [
        { title: 'Start with one day per week (Monday or Thursday)', done: false,
          sources: `**I. Hadith**


### Sahih Muslim 1162
The Prophet (SAW) said: "Deeds are presented (to Allah) on Mondays and Thursdays, and I like my deeds to be presented while I am fasting."
*(Grade: Sahih)*

### Sahih Muslim 1161
The Prophet (SAW) used to fast Mondays and Thursdays. When asked why he fasted on Mondays, he said: "That is the day on which I was born and the day on which I was sent (as a Prophet)."
*(Grade: Sahih)*`,
          description: `**Why?**

The Prophet (SAW) said deeds are shown to Allah on Mondays and Thursdays, and he preferred to be fasting when his deeds were presented. Starting with one day builds the habit gently.


**How?**

Choose whichever day fits your schedule better — Monday or Thursday. Set a recurring reminder the night before to make your niyyah and prepare suhoor. Fast consistently for at least four weeks before adding the second day.` },
        { title: 'Build up to both days consistently', done: false,
          sources: `**I. Hadith**


### Sahih Muslim 1162
The Prophet (SAW) said: "Deeds are presented (to Allah) on Mondays and Thursdays, and I like my deeds to be presented while I am fasting."
*(Grade: Sahih)*

### Sahih Bukhari 1975
The Prophet (SAW) said: "The most beloved fasting to Allah is the fasting of Dawud: he used to fast one day and not fast the next."
*(Grade: Sahih)*`,
          description: `**Why?**

Two voluntary fasts per week creates a sustainable rhythm of weekly spiritual renewal, training the nafs in discipline and drawing you closer to the Prophetic practice.


**How?**

Once one day feels natural (typically after 4-6 weeks), add the second. Prepare meals in advance to reduce friction. If you miss a week, resume without guilt — consistency over perfection is the Prophetic way.` },
        { title: 'Track your voluntary fasting for one month', done: false,
          sources: `**I. Hadith**


### Sahih Muslim 1162
The Prophet (SAW) said: "Deeds are presented (to Allah) on Mondays and Thursdays, and I like my deeds to be presented while I am fasting."
*(Grade: Sahih)*

### Sahih Bukhari 6464
The Prophet (SAW) said: "The most beloved deeds to Allah are the most consistent ones, even if they are small."
*(Grade: Sahih)*`,
          description: `**Why?**

Tracking reveals patterns you would otherwise miss — how fasting affects your energy, worship quality, and relationship with food. Data turns a spiritual practice into a feedback loop.


**How?**

Log each voluntary fast in a journal or app. After one month, review: How did fasting days compare to non-fasting days in terms of focus, ibadah quality, and mood? Use these insights to adjust your routine (e.g., lighter suhoor, earlier sleep).` },
      ],
    },
    {
      title: 'Fast the three white days (13th, 14th, 15th of each lunar month)',
      priority: 'medium', tags: ['sawm', 'sunnah'],
      description: 'The Prophet (SAW) encouraged fasting the Ayyam al-Bid (white days). It is like fasting the entire month due to the ten-fold reward.',
      subtasks: [
        { title: 'Download a Hijri calendar to track the white days', done: false,
          sources: `**I. Hadith**


### Sahih Muslim 1162
The Prophet (SAW) said: "Fasting three days of each month is fasting for a lifetime." He was asked about the white days and said they are the 13th, 14th, and 15th of the lunar month.
*(Grade: Sahih)*`,
          description: `**Why?**

The white days follow the lunar calendar, which shifts relative to the Gregorian calendar each month. Without a Hijri reference, you will miss them.


**How?**

Download an Islamic calendar app that displays Hijri dates alongside the Gregorian calendar. The 13th, 14th, and 15th of each lunar month are the target days. Set monthly reminders a day before the 13th so you can prepare suhoor and make your niyyah.` },
        { title: 'Fast the white days for one lunar month as a trial', done: false,
          sources: `**I. Hadith**


### Sunan al-Nasa'i 2420
The Prophet (SAW) said: "Fasting three days of every month is fasting for a lifetime." This refers to the three white days (al-ayyam al-bid): the 13th, 14th, and 15th of each lunar month.
*(Grade: Sahih)*

### Sahih Muslim 1162
Abu Dharr (RA) reported: "The Messenger of Allah commanded us to fast three days of each month: the 13th, 14th, and 15th."
*(Grade: Sahih)*`,
          description: `**Why?**

Three fasts per month equals 36 per year, which with the ten-fold multiplier equals fasting the entire year in reward. A single trial month proves to yourself that this is achievable.


**How?**

Identify the 13th, 14th, and 15th of the upcoming lunar month on your Hijri calendar. Fast all three days consecutively. Note how you feel physically and spiritually. If one month works, you have the evidence to commit long-term.` },
        { title: 'Make it a consistent monthly practice', done: false,
          sources: `**I. Hadith**


### Sunan al-Nasa'i 2420
The Prophet (SAW) said: "Fasting three days of every month is fasting for a lifetime."
*(Grade: Sahih)*

### Sahih Bukhari 6464
The Prophet (SAW) said: "The most beloved deeds to Allah are the most consistent ones, even if they are small."
*(Grade: Sahih)*`,
          description: `**Why?**

Abu Hurayrah (RA) reported that the Prophet (SAW) advised him to fast three days of every month (Bukhari/Muslim). Making this a lifelong habit earns the reward of fasting an entire year, every year.


**How?**

Add the white days to your calendar as a recurring monthly event. Prepare by eating a balanced suhoor the night before the 13th. After several months, this rhythm will feel as natural as your weekly routine.` },
      ],
    },
    {
      title: 'Study the inner dimensions of fasting \u2014 taqwa, patience, gratitude',
      priority: 'medium', tags: ['sawm', 'spirituality'],
      description: 'Fasting is not merely abstaining from food \u2014 it is training the nafs in taqwa, sabr, and shukr. Study these spiritual dimensions.',
      subtasks: [
        { title: 'Study the ayah linking fasting to taqwa (2:183)', done: false,
          sources: `**I. Quran**


### Quran (2:183)
**Arabic:** يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ كَمَا كُتِبَ عَلَى الَّذِينَ مِن قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ  
**Translation:** You who believe, fasting is prescribed for you, as it was prescribed for those before you, so that you may be mindful of God.

**I. Hadith**


### Sahih Bukhari 1904
The Prophet (SAW) said: "Whoever fasts Ramadan out of faith and seeking reward, his previous sins will be forgiven."
*(Grade: Sahih)*`,
          description: `**Why?**

Allah explicitly states the purpose of fasting in Surah al-Baqarah 2:183 — that you may attain taqwa. Understanding this transforms fasting from physical endurance into spiritual cultivation.


**How?**

Read the ayah in Arabic and a trusted translation. Reflect on how physical restraint develops God-consciousness: when you choose to obey Allah over your hunger, you are training your will to choose His guidance in every domain. Journal your reflections.` },
        { title: 'Reflect on how fasting develops patience with hunger and anger', done: false,
          sources: `**I. Quran**


### Quran (2:183)
**Arabic:** يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ كَمَا كُتِبَ عَلَى الَّذِينَ مِن قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ  
**Translation:** O you who believe, fasting is prescribed for you as it was prescribed for those before you, that you may attain taqwa (God-consciousness).

**II. Hadith**


### Sahih Bukhari 1904
The Prophet (SAW) said: "Fasting is a shield. When any one of you is fasting, let him not speak indecently or act ignorantly. If someone fights or insults him, let him say: I am fasting, I am fasting."
*(Grade: Sahih)*`,
          description: `**Why?**

The Prophet (SAW) called fasting a shield (Bukhari). It is not merely about hunger — it trains you to govern your tongue and temper, which are far harder to control than appetite.


**How?**

During your next fast, pay deliberate attention to moments of irritation or impatience. When they arise, recall the hadith and consciously choose restraint. At the end of the day, journal which moments tested you and how you responded.` },
        { title: 'Journal about gratitude for provisions after breaking fast', done: false,
          sources: `**I. Quran**


### Quran (2:185)
**Arabic:** يُرِيدُ اللَّهُ بِكُمُ الْيُسْرَ وَلَا يُرِيدُ بِكُمُ الْعُسْرَ وَلِتُكْمِلُوا الْعِدَّةَ وَلِتُكَبِّرُوا اللَّهَ عَلَىٰ مَا هَدَاكُمْ وَلَعَلَّكُمْ تَشْكُرُونَ  
**Translation:** Allah intends for you ease and does not intend for you hardship, and wants for you to complete the period and to glorify Allah for having guided you, and perhaps you will be grateful.

**II. Hadith**


### Sunan al-Tirmidhi 3598
The Prophet (SAW) said: "There are three whose supplication is not rejected: the fasting person when he breaks his fast, the just ruler, and the supplication of the oppressed."
*(Grade: Hasan)*`,
          description: `**Why?**

The moment of iftar reveals how much we take water, dates, and bread for granted. Gratitude (shukr) is a core fruit of fasting — journaling captures and deepens it.


**How?**

Keep a small notebook or phone note dedicated to fasting reflections. After breaking your fast, write 2-3 sentences about what you are most grateful for today. Over time, review your entries to see how fasting reshapes your relationship with Allah's provisions.` },
      ],
    },
    {
      title: 'Learn the Sunnah of iftar and suhoor',
      priority: 'low', tags: ['sawm', 'sunnah'],
      description: 'There is great barakah in suhoor and prescribed etiquette for breaking the fast. Follow the Prophetic way.',
      subtasks: [
        { title: 'Learn the du\'a for breaking the fast', done: false,
          sources: `**I. Quran**


### Quran (2:183)
**Arabic:** يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ كَمَا كُتِبَ عَلَى الَّذِينَ مِن قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ
**Translation:** "You who believe, fasting is prescribed for you, as it was prescribed for those before you, so that you may be mindful of God." (Abdel Haleem)

*(The taqwa that fasting builds finds its culmination in the du'a of iftar — an act of gratitude and hope marking the transition back from abstinence to sustenance.)*

**II. Hadith**


### Sahih Abu Dawud 2357
Narrated 'Abdullah ibn 'Umar: The Prophet (ﷺ) used to say when breaking his fast: "Dhahaba al-zama', wa-btallat al-'uruq, wa-thabat al-ajr in sha'a Allah" (The thirst has gone, the veins are refreshed, and the reward is confirmed, if Allah wills).
*(Grade: Hasan)*`,
          description: `**Why?**

The moment of iftar is one of the times when du'a is most accepted. Learning the Prophetic du'a connects your fast's end to gratitude and hope in Allah's reward.


**How?**

Memorize the du'a: "Dhahaba al-dhama', wabtallat al-uruq, wa thabata al-ajr in sha Allah" \u2014 meaning the thirst has gone, the veins are moistened, and the reward is confirmed, if Allah wills. Say it each time you break your fast until it becomes second nature.` },
        { title: 'Study what the Prophet (SAW) ate for suhoor and iftar', done: false,
          sources: `**I. Hadith**


### Sahih Bukhari 1915
Narrated Al-Bara:It was the custom among the companions of Muhammad that if any of them was fasting and the food was presented (for breaking his fast), but he slept before eating, he would not eat that night and the following day till sunset. Qais bin Sirma-al-Ansari was fasting and came to his wife at the time of Iftar (breaking one's fast) and asked her whether she had anything to eat. She replied, "No, but I would go and bring some for you." He used to do hard work during the day, so he was overwhelmed by sleep and slept. When his wife came and saw him, she said, "Disappointment for you." When it was midday on the following day, he fainted and the Prophet (ﷺ) was informed about the whole matter and the following verses were revealed: "You are permitted To go to your wives (for sexual relation) At the night of fasting." So, they were overjoyed by it. And then Allah also revealed: "And eat and drink Until the white thread Of dawn appears to you Distinct from the black thread (of the night)
*(Grade: Sahih)*`,
          description: `**Why?**

Following the Prophetic example in suhoor and iftar connects your daily meals to his Sunnah and brings barakah to the simplest food.


**How?**

The Prophet (SAW) would break his fast with fresh dates; if not available, then dried dates; if not, then water. He encouraged suhoor even if with just a sip of water. Keep dates and water ready before Maghrib. For suhoor, eat something nourishing close to Fajr time.` },
        { title: 'Practice delaying suhoor and hastening iftar as Sunnah', done: false,
          sources: `**I. Hadith**


### Sahih Bukhari 1957
The Prophet (SAW) said: "Hasten to break the fast (iftar), for that is the practice of goodness."
*(Grade: Sahih)*

### Sahih Muslim 1095
The Prophet (SAW) said: "My Ummah will continue to be upon goodness so long as they hasten to break the fast."
*(Grade: Sahih)*

### Sahih Muslim 1096
The Prophet (SAW) said: "Eat suhoor, for in suhoor there is blessing (barakah)."
*(Grade: Sahih)*`,
          description: `**Why?**

The Prophet (SAW) said his ummah will remain upon goodness as long as they hasten the iftar and delay the suhoor (Ahmad). These timings are markers of adherence to the Sunnah.


**How?**

Set an alarm for suhoor 20-30 minutes before Fajr so you eat close to the deadline. At Maghrib, break your fast promptly — do not delay. Have dates and water prepared before the adhan so you can break immediately when the time enters.` },
      ],
    },
  ],
  faith_sawm_excellence: [
    {
      title: 'Fast the day of Arafah (9th Dhul Hijjah) and Ashura (10th Muharram)',
      priority: 'medium', tags: ['sawm', 'sunnah'],
      description: 'The day of Arafah expiates sins of two years; Ashura expiates sins of one year. These are among the most rewarding voluntary fasts.',
      subtasks: [
        { title: 'Mark the dates of Arafah and Ashura on your calendar', done: false,
          sources: `**I. Quran**


### Quran (55:11)
**Arabic:** فِيهَا فَاكِهَةٌ وَالنَّخْلُ ذَاتُ الْأَكْمَامِ
**Translation:** "with its fruits, its palm trees with sheathed clusters." (Abdel Haleem)

*(Surah al-Rahman describes the blessings of creation and time. Marking sacred days of the Islamic calendar — Arafah and Ashura — is an act of consciousness of Allah's gifts woven into time itself.)*

**II. Hadith**


### Sahih Muslim 1162
Abu Qatadah al-Ansari reported that the Messenger of Allah (ﷺ) was asked about fasting on the day of Arafah, whereupon he said: "It expiates the sins of the preceding year and the coming year."
*(Grade: Sahih)*`,
          description: `**Why?**

These are among the most rewarding voluntary fasts in the entire year. Missing them because you did not check the Hijri calendar means missing enormous expiation of sins.


**How?**

Arafah is the 9th of Dhul Hijjah; Ashura is the 10th of Muharram. At the start of each Hijri year, look up both dates on your Hijri calendar app and add them to your Gregorian calendar with reminders one week and one day before each.` },
        { title: 'Fast the day of Arafah (for non-pilgrims)', done: false,
          sources: `**I. Hadith**


### Sahih Bukhari 4521
Narrated Ibn \`Abbas:A man who wants to perform the Hajj (from Mecca) can perform the Tawaf around the Ka\`ba as long as he is not in the state of Ihram till he assumes the Ihram for Hajj. Then, if he rides and proceeds to \`Arafat, he should take a Hadi (i.e. animal for sacrifice), either a camel or a cow or a sheep, whatever he can afford; but if he cannot afford it, he should fast for three days during the Hajj before the day of \`Arafat, but if the third day of his fasting happens to be the day of \`Arafat (i.e. 9th of Dhul-Hijja) then it is no sin for him (to fast on it). Then he should proceed to \`Arafat and stay there from the time of the \`Asr prayer till darkness falls. Then the pilgrims should proceed from \`Arafat, and when they have departed from it, they reach Jam' (i.e. Al-Muzdalifa) where they ask Allah to help them to be righteous and dutiful to Him, and there they remember Allah greatly or say Takbir (i.e. Allah is Greater) and Tahlil (i.e. None has the right to be worshipped but Allah) repeatedly before dawn breaks. Then, after offering the morning (Fajr) prayer you should pass on (to Mina) for the people used to do so and Allah said:-- "Then depart from the place whence all the people depart. And ask for Allah's Forgiveness. Truly! Allah is Oft-Forgiving, Most Merciful." (2.199) Then you should go on doing so till you throw pebbles over the Jamra
*(Grade: Sahih)*`,
          description: `**Why?**

The Prophet (SAW) said fasting the day of Arafah expiates the sins of the previous year and the coming year (Muslim). No other single voluntary fast carries this weight of reward.


**How?**

Confirm the Gregorian date of 9th Dhul Hijjah using your Hijri calendar. Make your niyyah the night before and fast the day. Note: pilgrims performing Hajj do not fast on Arafah. If you are not on Hajj, seize this opportunity every year without fail.` },
        { title: 'Fast the 9th and 10th of Muharram (or 10th and 11th)', done: false,
          sources: `**I. Hadith**


### Sahih Bukhari 1892
Narrated Ibn \`Umar:The Prophet (ﷺ) observed the fast on the 10th of Muharram ('Ashura), and ordered (Muslims) to fast on that day, but when the fasting of the month of Ramadan was prescribed, the fasting of the 'Ashura' was abandoned. \`Abdullah did not use to fast on that day unless it coincided with his routine fasting by chance
*(Grade: Sahih)*

### Sahih Bukhari 1592
Narrated \`Aisha:The people used to fast on 'Ashura (the tenth day of the month of Muharram) before the fasting of Ramadan was made obligatory. And on that day the Ka\`ba used to be covered with a cover. When Allah made the fasting of the month of Ramadan compulsory, Allah's Messenger (ﷺ) said, "Whoever wishes to fast (on the day of 'Ashura') may do so; and whoever wishes to leave it can do so
*(Grade: Sahih)*`,
          description: `**Why?**

The Prophet (SAW) fasted Ashura and expressed the intention to add the 9th to distinguish the Muslim practice. Fasting the 10th of Muharram expiates the sins of the previous year.


**How?**

Identify the 9th and 10th of Muharram on your Hijri calendar. Fast both days if possible; if not, fasting the 10th alone is still rewarded. Some scholars recommend the 10th and 11th as an alternative pairing. Set reminders well in advance.` },
      ],
    },
    {
      title: 'Fast the six days of Shawwal after Ramadan',
      priority: 'medium', tags: ['sawm', 'sunnah'],
      description: 'Whoever fasts Ramadan and follows it with six days of Shawwal, it is as if they fasted the entire year.',
      subtasks: [
        { title: 'Plan when to fast the six days (consecutively or spread out)', done: false,
          sources: `**I. Quran**


### Quran (2:184)
**Arabic:** أَيَّامًا مَّعْدُودَاتٍ ۚ فَمَن كَانَ مِنكُم مَّرِيضًا أَوْ عَلَىٰ سَفَرٍ فَعِدَّةٌ مِّنْ أَيَّامٍ أُخَرَ ۚ وَعَلَى الَّذِينَ يُطِيقُونَهُ فِدْيَةٌ طَعَامُ مِسْكِينٍ ۖ فَمَن تَطَوَّعَ خَيْرًا فَهُوَ خَيْرٌ لَّهُ ۚ وَأَن تَصُومُوا خَيْرٌ لَّكُمْ ۖ إِن كُنتُمْ تَعْلَمُونَ
**Translation:** "Fast for a specific number of days... But if anyone does good of his own accord, it is better for him, and fasting is better for you, if only you knew." (Abdel Haleem)

*("And fasting is better for you" — the Quran's encouragement of voluntary fasting beyond the obligatory points to the Sunnah of the six Shawwal fasts.)*

**II. Hadith**


### Sahih Muslim 2758
Narrated Abu Ayyub al-Ansari: The Messenger of Allah (ﷺ) said, "He who fasts during Ramadan and follows it up with six (fasts) of Shawwal, it is as if he fasted perpetually."
*(Grade: Sahih)*`,
          description: `**Why?**

Planning ahead ensures you complete all six fasts within Shawwal. Without a plan, the month slips by and the opportunity is lost.


**How?**

You can fast the six days consecutively starting from 2nd Shawwal, or spread them throughout the month. Both approaches are valid. Choose dates that fit your schedule, mark them on your calendar before Eid, and prepare suhoor supplies in advance.` },
        { title: 'Complete the six fasts within Shawwal', done: false,
          sources: `**I. Hadith**


### Sahih Muslim 2758
Abu Ayyub al-Ansari (Allah be pleased with him) reported Allah's Messenger (ﷺ) as saying:He who observed the fast of Ramadan and then followed it with six (fasts) of Shawwal. it would be as if he fasted perpetually
*(Grade: Sahih)*`,
          description: `**Why?**

The reward — equivalent to fasting the entire year — is tied specifically to Shawwal. Delaying past the month forfeits this particular reward.


**How?**

The hadith specifies Shawwal (the month after Ramadan). If you owe make-up fasts from Ramadan, consult your school of thought — some scholars require qada first, others allow combining intentions. Track each completed day and aim to finish all six well before the month ends.` },
        { title: 'Make a habit of fasting them every year', done: false,
          sources: `**I. Quran**


### Quran (2:184)
**Arabic:** أَيَّامًا مَّعْدُودَاتٍ ۚ فَمَن كَانَ مِنكُم مَّرِيضًا أَوْ عَلَىٰ سَفَرٍ فَعِدَّةٌ مِّنْ أَيَّامٍ أُخَرَ ۚ وَعَلَى الَّذِينَ يُطِيقُونَهُ فِدْيَةٌ طَعَامُ مِسْكِينٍ ۖ فَمَن تَطَوَّعَ خَيْرًا فَهُوَ خَيْرٌ لَّهُ ۚ وَأَن تَصُومُوا خَيْرٌ لَّكُمْ ۖ إِن كُنتُمْ تَعْلَمُونَ
**Translation:** "Fast for a specific number of days... and fasting is better for you, if only you knew." (Abdel Haleem)

**II. Hadith**


### Sahih Bukhari 43
Narrated \`Aisha: The Prophet (ﷺ) said, "Do good deeds properly, sincerely and moderately and know that your deeds will not make you enter Paradise, and that the most beloved deed to Allah is the most regular and constant even though it were little."
*(Grade: Sahih)*`,
          description: `**Why?**

Ramadan (30 days) + 6 of Shawwal = 36 days. With the ten-fold multiplier, that equals 360 days — like fasting the entire year. Making this annual locks in a massive, compounding reward.


**How?**

After completing the six fasts this year, immediately add a reminder for next Shawwal. Reflect on what made it easier or harder this time and adjust your approach. Over the years, this will become a natural extension of your Ramadan rhythm.` },
      ],
    },
    {
      title: 'Organise a community iftar for neighbours and those in need',
      priority: 'low', tags: ['sawm', 'community'],
      description: 'Feeding a fasting person earns the reward of their fast without diminishing it. Organise a shared iftar for your community.',
      subtasks: [
        { title: 'Plan the logistics (venue, menu, invitations)', done: false,
          sources: `**I. Hadith**


### Sahih Bukhari 1957
The Prophet (SAW) said: "Whoever provides iftar for a fasting person will have a reward like his, without diminishing the fasting person's reward in any way."
*(Grade: Sahih)*`,
          description: `**Why?**

Feeding a fasting person earns you the reward of their fast without diminishing theirs. Good logistics ensure the event actually happens rather than remaining a good intention.


**How?**

Choose a venue (masjid, community hall, or your home). Plan a simple, nutritious menu that can be prepared in bulk. Send invitations through local networks, WhatsApp groups, or masjid announcements at least one week in advance. Delegate tasks — cooking, setup, cleanup — to willing volunteers.` },
        { title: 'Invite neighbours, new Muslims, and those in need', done: false,
          sources: `**I. Quran**


### Quran (4:36)
**Arabic:** وَاعْبُدُوا اللَّهَ وَلَا تُشْرِكُوا بِهِ شَيْئًا ۖ وَبِالْوَالِدَيْنِ إِحْسَانًا وَبِذِي الْقُرْبَىٰ وَالْيَتَامَىٰ وَالْمَسَاكِينِ وَالْجَارِ ذِي الْقُرْبَىٰ وَالْجَارِ الْجُنُبِ وَالصَّاحِبِ بِالْجَنبِ وَابْنِ السَّبِيلِ وَمَا مَلَكَتْ أَيْمَانُكُمْ ۗ إِنَّ اللَّهَ لَا يُحِبُّ مَن كَانَ مُخْتَالًا فَخُورًا
**Translation:** "Worship God; join nothing with Him. Be good to your parents, to relatives, to orphans, to the needy, to neighbours near and far, to travellers in need, and to your slaves. God does not like arrogant, boastful people." (Abdel Haleem)

### Quran (41:33)
**Arabic:** وَمَنْ أَحْسَنُ قَوْلًا مِّمَّن دَعَا إِلَى اللَّهِ وَعَمِلَ صَالِحًا وَقَالَ إِنَّنِي مِنَ الْمُسْلِمِينَ
**Translation:** "Who speaks better than someone who calls people to God, does what is right, and says, 'I am one of those devoted to God'?" (Abdel Haleem)

**II. Hadith**


### Sahih Bukhari 5185
Narrated Abu Huraira: The Prophet (ﷺ) said, "He who believes in Allah and the Last Day should not hurt (trouble) his neighbour. And I advise you to take care of women, for they are created from a rib and the most crooked portion of the rib is its upper part; if you try to straighten it, it will break, and if you leave it, it will remain crooked, so I urge you to take care of women."
*(Grade: Sahih)*`,
          description: `**Why?**

The greatest impact of a community iftar comes from reaching those who would otherwise break their fast alone. These are the people most in need of belonging.


**How?**

Prioritise those who may not have community connections \u2014 new Muslims, international students, elderly living alone, and low-income families. Ask your local masjid, Islamic centre, or university MSA for names. Personal invitations are more effective than general announcements.` },
        { title: 'Host the iftar and foster community bonds', done: false,
          sources: `**I. Quran**


### Quran (49:13)
**Arabic:** يَا أَيُّهَا النَّاسُ إِنَّا خَلَقْنَاكُم مِّن ذَكَرٍ وَأُنثَىٰ وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا  
**Translation:** People, We created you all from a single man and a single woman, and made you into races and tribes so that you should recognize one another.

**I. Hadith**


### Sahih Muslim 2586
The Prophet (SAW) said: "None of you truly believes until he loves for his brother what he loves for himself." Sharing iftar strengthens bonds of brotherhood.
*(Grade: Sahih)*`,
          description: `**Why?**

Community bonds built over shared food last long beyond Ramadan. A single welcoming iftar can transform a stranger into a lifelong brother or sister in faith.


**How?**

Create a welcoming atmosphere with simple decorations and warm greetings. Begin with the du'a of iftar together, share food family-style, and facilitate introductions between guests who do not know each other. Follow up with attendees after Ramadan to maintain the connections.` },
      ],
    },
  ],

  // \u2500\u2500 HAJJ \u2500\u2500
  faith_hajj_core: [
    {
      title: 'Learn the conditions that make Hajj obligatory (Islam, sanity, maturity, ability, provision)',
      priority: 'high', tags: ['hajj', 'fard'],
      description: 'Hajj is obligatory once in a lifetime for those who meet specific conditions. Understand each condition to determine your obligation.',
      subtasks: [
        { title: 'Study the five conditions of obligation', done: false,
          sources: `**I. Quran**


### Quran (3:97)
**Arabic:** وَلِلَّهِ عَلَى النَّاسِ حِجُّ الْبَيْتِ مَنِ اسْتَطَاعَ إِلَيْهِ سَبِيلًا  
**Translation:** And due to Allah from the people is a pilgrimage to the House — for whoever is able to find thereto a way.

**II. Hadith**


### Sahih Bukhari 1513
The Prophet (SAW) was asked: "What makes Hajj obligatory?" He said: "Provision and a means of transport."
*(Grade: Sahih)*

### Sahih Muslim 1337
The Prophet (SAW) said: "O people, Allah has made Hajj obligatory upon you, so perform Hajj." A man asked: "Every year, O Messenger of Allah?" He said: "If I said yes, it would become obligatory every year."
*(Grade: Sahih)*`,
          description: `**Why?**

Hajj is one of Islam's five pillars, but it is only obligatory when specific conditions are met. Knowing these conditions prevents you from either neglecting a duty or burdening yourself beyond what Allah requires.


**How?**

Study the five conditions: being Muslim, sane, having reached puberty, being physically able to travel, and having sufficient financial means beyond one's dependants' needs. Use a reliable fiqh reference to understand each condition in detail and note any scholarly differences of opinion.` },
        { title: 'Assess your current financial and physical ability', done: false,
          sources: `**I. Quran**


### Quran (3:97)
**Arabic:** وَلِلَّهِ عَلَى النَّاسِ حِجُّ الْبَيْتِ مَنِ اسْتَطَاعَ إِلَيْهِ سَبِيلًا  
**Translation:** Pilgrimage to the House is a duty owed to God by people who are able to undertake it. Those who reject this [should know that] God has no need of anyone.

**I. Hadith**


### Sahih Bukhari 1513
The Prophet (SAW) said: "Islam is built upon five pillars..." among them: "pilgrimage to the House for whoever is able to find a way."
*(Grade: Sahih)*`,
          description: `**Why?**

Hajj requires both financial and physical capacity. An honest self-assessment ensures you fulfil the obligation at the right time without harming yourself or your dependants.


**How?**

Ask yourself: can you afford the trip without going into debt or depriving your family of necessities? Are you physically healthy enough for the demanding journey? Consult a doctor if needed, and review your finances honestly against the estimated costs of Hajj from your country.` },
        { title: 'Determine if Hajj is currently fard upon you', done: false,
          sources: `**I. Quran**


### Quran (2:197)
**Arabic:** الْحَجُّ أَشْهُرٌ مَّعْلُومَاتٌ ۚ فَمَن فَرَضَ فِيهِنَّ الْحَجَّ فَلَا رَفَثَ وَلَا فُسُوقَ وَلَا جِدَالَ فِي الْحَجِّ ۗ وَمَا تَفْعَلُوا مِنْ خَيْرٍ يَعْلَمْهُ اللَّهُ ۗ وَتَزَوَّدُوا فَإِنَّ خَيْرَ الزَّادِ التَّقْوَىٰ ۚ وَاتَّقُونِ يَا أُولِي الْأَلْبَابِ
**Translation:** "The pilgrimage takes place during the prescribed months. There should be no indecent speech, misbehaviour, or quarrelling for anyone undertaking the pilgrimage— whatever good you do, God is well aware of it. Provide well for yourselves: the best provision is to be mindful of God— always be mindful of Me, you who have understanding." (Abdel Haleem)

### Quran (22:27)
**Arabic:** وَأَذِّن فِي النَّاسِ بِالْحَجِّ يَأْتُوكَ رِجَالًا وَعَلَىٰ كُلِّ ضَامِرٍ يَأْتِينَ مِن كُلِّ فَجٍّ عَمِيقٍ
**Translation:** "Proclaim the Pilgrimage to all people. They will come to you on foot and on every kind of swift mount, emerging from every deep mountain pass." (Abdel Haleem)

**II. Hadith**


### Sahih Muslim 1337
Narrated Abu Huraira: The Messenger of Allah (ﷺ) addressed us and said: "O people, Allah has made Hajj obligatory for you, so perform Hajj." A man asked: "Every year, O Messenger of Allah?" He kept silent until the man asked three times, then he said: "If I had said yes, it would have become obligatory (every year)."
*(Grade: Sahih)*`,
          description: `**Why?**

If all five conditions are met, Hajj becomes immediately obligatory -- delaying without a valid reason is sinful according to the majority of scholars. Clarity on your obligation status drives urgency or patience as appropriate.


**How?**

Review the five conditions against your current situation. If all are met, begin planning your Hajj without delay. If conditions are not yet met, identify which ones are lacking and begin working toward them so you are ready when the obligation falls upon you.` },
      ],
    },
    {
      title: 'Study the pillars (arkan) and obligatory acts (wajibat) of Hajj',
      priority: 'high', tags: ['hajj', 'fiqh'],
      description: 'Hajj has pillars without which it is invalid, and obligations whose omission requires a penalty. Know the difference.',
      subtasks: [
        { title: 'Learn the four arkan: Ihram, Arafah, Tawaf al-Ifadah, Sa\'i', done: false,
          sources: `**I. Hadith**


### Sahih Bukhari 5851
Narrated Sa\`id Al-Maqburi:'Ubai bin Juraij said to \`Abdullah Ben \`Umar, "I see you doing four things which are not done by your friends." Ibn \`Umar said, "What are they, O Ibn Juraij?" He said, "I see that you do not touch except the two Yemenite corners of the Ka\`ba (while performing the Tawaf): and I see you wearing the Sabtiyya shoes; and I see you dyeing (your hair) with Sufra; and I see that when you are in Mecca, the people assume the state of Ihram on seeing the crescent (on the first day of Dhul-Hijja) while you do not assume the state of Ihram till the Day of Tarwiya (8th Dhul Hijja)." \`Abdullah bin \`Umar said to him, "As for the corners of the Ka\`ba, I have not seen Allah's Messenger (ﷺ) touching except the two Yemenite corners, As for the Sabtiyya shoes, I saw Allah's Messenger (ﷺ) wearing leather shoes that had no hair, and he used to perform the ablution while wearing them. Therefore, I like to wear such shoes. As regards dyeing with Sufra, I saw Allah's Messenger (ﷺ) dyeing his hair with it, so I like to dye (my hair) with it. As regards the crescent (of Dhul-Hijja), I have not seen Allah's Messenger (ﷺ) assuming the state of Ihram till his she-camel set out (on the 8th of Dhul-Hijja)
*(Grade: Sahih)*

### Sahih Bukhari 1643
Narrated \`Urwa:I asked \`Aisha : "How do you interpret the statement of Allah,. : Verily! (the mountains) As-Safa and Al-Marwa are among the symbols of Allah, and whoever performs the Hajj to the Ka\`ba or performs \`Umra, it is not harmful for him to perform Tawaf between them (Safa and Marwa.) (2.158). By Allah! (it is evident from this revelation) there is no harm if one does not perform Tawaf between Safa and Marwa." \`Aisha said, "O, my nephew! Your interpretation is not true. Had this interpretation of yours been correct, the statement of Allah should have been, 'It is not harmful for him if he does not perform Tawaf between them.' But in fact, this divine inspiration was revealed concerning the Ansar who used to assume Ihram for worshipping an idol called "Manat" which they used to worship at a place called Al-Mushallal before they embraced Islam, and whoever assumed Ihram (for the idol), would consider it not right to perform Tawaf between Safa and Marwa. When they embraced Islam, they asked Allah's Messenger (ﷺ) regarding it, saying, "O Allah's Apostle! We used to refrain from Tawaf between Safa and Marwa." So Allah revealed: 'Verily; (the mountains) As-Safa and Al-Marwa are among the symbols of Allah.' " Aisha added, "Surely, Allah's Apostle set the tradition of Tawaf between Safa and Marwa, so nobody is allowed to omit the Tawaf between them." Later on I (\`Urwa) told Abu Bakr bin \`Abdur-Rahman (of \`Aisha's narration) and he said, 'I have not heard of such information, but I heard learned men saying that all the people, except those whom \`Aisha mentioned and who used to assume Ihram for the sake of Manat, used to perform Tawaf between Safa and Marwa. When Allah referred to the Tawaf of the Ka\`ba and did not mention Safa and Marwa in the Qur'an, the people asked, 'O Allah's Messenger (ﷺ)! We used to perform Tawaf between Safa and Marwa and Allah has revealed (the verses concerning) Tawaf of the Ka\`ba and has not mentioned Safa and Marwa. Is there any harm if we perform Tawaf between Safa and Marwa?' So Allah revealed: "Verily As-Safa and Al- Marwa are among the symbols of Allah." Abu Bakr said, "It seems that this verse was revealed concerning the two groups, those who used to refrain from Tawaf between Safa and Marwa in the Pre- Islamic Period of ignorance and those who used to perform the Tawaf then, and after embracing Islam they refrained from the Tawaf between them as Allah had enjoined Tawaf of the Ka\`ba and did not mention Tawaf (of Safa and Marwa) till later after mentioning the Tawaf of the Ka\`ba
*(Grade: Sahih)*

### Sahih Bukhari 1691
Narrated Ibn \`Umar:During the last Hajj (Hajj-al-Wada\`) of Allah's Messenger (ﷺ) he performed \`Umra and Hajj. He drove a Hadi along with him from Dhul-Hulaifa. Allah's Messenger (ﷺ) started by assuming Ihram for \`Umra and Hajj. And the people, too, performed the \`Umra and Hajj along with the Prophet. Some of them brought the Hadi and drove it along with them, while the others did not. So, when the Prophet (ﷺ) arrived at Mecca. he said to the people, "Whoever among you has driven the Hadi, should not finish his Ihram till he completes his Hajj. And whoever among you has not (driven) the Hadi with him, should perform Tawaf of the Ka\`ba and the Tawaf between Safa and Marwa, then cut short his hair and finish his Ihram, and should later assume Ihram for Hajj; but he must offer a Hadi (sacrifice); and if anyone cannot afford a Hadi, he should fast for three days during the Hajj and seven days when he returns home. The Prophet (ﷺ) performed Tawaf of the Ka\`ba on his arrival (at Mecca); he touched the (Black Stone) corner first of all and then did Ramal (fast walking with moving of the shoulders) during the first three rounds round the Ka\`ba, and during the last four rounds he walked. After finishing Tawaf of the Ka\`ba, he offered a two rak\`at prayer at Maqam Ibrahim, and after finishing the prayer he went to Safa and Marwa and performed seven rounds of Tawaf between them and did not do any deed forbidden because of Ihram, till he finished all the ceremonies of his Hajj and sacrificed his Hadi on the day of Nahr (10th day of Dhul-Hijja). He then hastened onwards (to Mecca) and performed Tawaf of the Ka\`ba and then everything that was forbidden because of Ihram became permissible. Those who took and drove the Hadi with them did the same as Allah's Messenger (ﷺ) did
*(Grade: Sahih)*`,
          description: `**Why?**

The arkan (pillars) are the non-negotiable core of Hajj. Missing even one of them invalidates the entire pilgrimage, so you must know them thoroughly before you go.


**How?**

Study the four pillars: entering the state of Ihram, standing at Arafah, performing Tawaf al-Ifadah, and performing Sa'i between Safa and Marwah. For each, learn its timing, conditions, and what constitutes valid performance. Use a detailed Hajj manual from your madhab as your primary reference.` },
        { title: 'Learn the wajibat: Muzdalifah, stoning, shaving, Tawaf al-Wada', done: false,
          sources: `**I. Quran**


### Quran (2:125)
**Arabic:** وَإِذْ جَعَلْنَا الْبَيْتَ مَثَابَةً لِّلنَّاسِ وَأَمْنًا وَاتَّخِذُوا مِن مَّقَامِ إِبْرَاهِيمَ مُصَلًّى ۖ وَعَهِدْنَا إِلَىٰ إِبْرَاهِيمَ وَإِسْمَاعِيلَ أَن طَهِّرَا بَيْتِيَ لِلطَّائِفِينَ وَالْعَاكِفِينَ وَالرُّكَّعِ السُّجُودِ
**Translation:** "We made the House a resort and a sanctuary for people, saying, ‘Take the spot where Abraham stood as your place of prayer.’ We commanded Abraham and Ishmael: ‘Purify My House for those who walk round it, those who stay there, and those who bow and prostrate themselves in worship.’" (Abdel Haleem)

**II. Hadith**


### Sahih Bukhari 1643
Narrated \`Urwa:I asked \`Aisha : "How do you interpret the statement of Allah,. : Verily! (the mountains) As-Safa and Al-Marwa are among the symbols of Allah, and whoever performs the Hajj to the Ka\`ba or performs \`Umra, it is not harmful for him to perform Tawaf between them (Safa and Marwa.) (2.158). By Allah! (it is evident from this revelation) there is no harm if one does not perform Tawaf between Safa and Marwa." \`Aisha said, "O, my nephew! Your interpretation is not true. Had this interpretation of yours been correct, the statement of Allah should have been, 'It is not harmful for him if he does not perform Tawaf between them.' But in fact, this divine inspiration was revealed concerning the Ansar who used to assume Ihram for worshipping an idol called "Manat" which they used to worship at a place called Al-Mushallal before they embraced Islam, and whoever assumed Ihram (for the idol), would consider it not right to perform Tawaf between Safa and Marwa. When they embraced Islam, they asked Allah's Messenger (ﷺ) regarding it, saying, "O Allah's Apostle! We used to refrain from Tawaf between Safa and Marwa." So Allah revealed: 'Verily; (the mountains) As-Safa and Al-Marwa are among the symbols of Allah.' " Aisha added, "Surely, Allah's Apostle set the tradition of Tawaf between Safa and Marwa, so nobody is allowed to omit the Tawaf between them." Later on I (\`Urwa) told Abu Bakr bin \`Abdur-Rahman (of \`Aisha's narration) and he said, 'I have not heard of such information, but I heard learned men saying that all the people, except those whom \`Aisha mentioned and who used to assume Ihram for the sake of Manat, used to perform Tawaf between Safa and Marwa. When Allah referred to the Tawaf of the Ka\`ba and did not mention Safa and Marwa in the Qur'an, the people asked, 'O Allah's Messenger (ﷺ)! We used to perform Tawaf between Safa and Marwa and Allah has revealed (the verses concerning) Tawaf of the Ka\`ba and has not mentioned Safa and Marwa. Is there any harm if we perform Tawaf between Safa and Marwa?' So Allah revealed: "Verily As-Safa and Al- Marwa are among the symbols of Allah." Abu Bakr said, "It seems that this verse was revealed concerning the two groups, those who used to refrain from Tawaf between Safa and Marwa in the Pre- Islamic Period of ignorance and those who used to perform the Tawaf then, and after embracing Islam they refrained from the Tawaf between them as Allah had enjoined Tawaf of the Ka\`ba and did not mention Tawaf (of Safa and Marwa) till later after mentioning the Tawaf of the Ka\`ba
*(Grade: Sahih)*

### Sahih Bukhari 1755
Narrated Ibn \`Abbas:The people were ordered to perform the Tawaf of the Ka\`ba (Tawaf-al-Wada\`) as the lastly thing, before leaving (Mecca), except the menstruating women who were excused
*(Grade: Sahih)*`,
          description: `**Why?**

The wajibat (obligatory acts) are a tier below the pillars -- missing one does not invalidate your Hajj, but it does incur a penalty sacrifice. Knowing the distinction prevents costly mistakes.


**How?**

Study the obligatory acts: staying at Muzdalifah, stoning the Jamarat, shaving or trimming hair, and performing the farewell Tawaf (Tawaf al-Wada'). Learn the timing and conditions for each, and understand that missing any wajib requires sacrificing an animal as a penalty.` },
        { title: 'Understand the penalties for missing a wajib act', done: false,
          sources: `**I. Quran**


### Quran (2:196)
**Arabic:** وَأَتِمُّوا الْحَجَّ وَالْعُمْرَةَ لِلَّهِ ۚ فَإِنْ أُحْصِرْتُمْ فَمَا اسْتَيْسَرَ مِنَ الْهَدْيِ  
**Translation:** And complete the Hajj and Umrah for Allah. But if you are prevented, then offer whatever sacrifice is easily available.

**II. Hadith**


### Sahih Bukhari 1810
The Prophet (SAW) said: "Whoever leaves a wajib act of Hajj must offer a sacrifice (dam) in compensation."
*(Grade: Sahih)*`,
          description: `**Why?**

Understanding the penalty system gives you clarity on the consequences of mistakes during Hajj and helps you prioritise correctly under pressure. It also provides reassurance that an error does not void your entire pilgrimage.


**How?**

Learn that if you miss a wajib act, you must sacrifice a sheep or goat in Makkah and distribute its meat to the poor there. This does not invalidate your Hajj but incurs a financial penalty. Study which specific acts carry this ruling so you can be extra vigilant about them during the rites.` },
      ],
    },
    {
      title: 'Learn the rites of Umrah and their sequence',
      priority: 'high', tags: ['umrah', 'fiqh'],
      description: 'Umrah is the lesser pilgrimage and excellent preparation for Hajj. Learn its rites in the correct order.',
      subtasks: [
        { title: 'Ihram from the miqat with niyyah', done: false,
          sources: `**I. Hadith**


### Sahih Bukhari 1522
Narrated Zaid bin Jubair:I went to visit \`Abdullah bin \`Umar at his house which contained many tents made of cotton cloth and these were encircled with Suradik (part of the tent). I asked him from where, should one assume Ihram for Umra. He said, "Allah's Messenger (ﷺ) had fixed as Miqat (singular of Mawaqit) Qarn for the people of Najd, Dhul-Hulaifa for the people of Medina, and Al-Juhfa for the people of Sham
*(Grade: Sahih)*

### Sahih Bukhari 1524
Narrated Ibn \`Abbas:Allah's Messenger (ﷺ) made Dhul-Hulaifa as the Miqat for the people of Medina; Al-Juhfa for the people of Sham; Qarn-al-Manazil for the people of Najd; and Yalamlam for the people of Yemen; and these Mawaqit are for the people at those very places, and besides them for those who come through those places with the intention of performing Hajj and \`Umra; and whoever is living within these boundaries can assume Ihram from the place he starts, and the people of Mecca can assume Ihram from Mecca
*(Grade: Sahih)*

### Sahih Bukhari 1526
Narrated Ibn \`Abbas:Allah's Messenger (ﷺ) had fixed Dhul Hulaifa as the Miqat for the people of Medina; Al-Juhfa for the people of Sham; and Qarn Ul-Manazil for the people of Najd; and Yalamlam for the people of Yemen. So, these (above mentioned) are the Mawaqit for all those living at those places, and besides them for those who come through those places with the intention of performing Hajj and \`Umra and whoever lives within these places should assume Ihram from his dwelling place, and similarly the people of Mecca can assume Ihram from Mecca
*(Grade: Sahih)*`,
          description: `**Why?**

Ihram is the first pillar of Umrah -- without it your rites are invalid. Entering Ihram at the correct miqat with a sincere intention marks the spiritual transition from ordinary life into sacred worship.


**How?**

Identify the designated miqat point for your travel route. Perform ghusl, put on the Ihram garments, make the intention for Umrah, and begin reciting the Talbiyah. Learn the prohibitions of Ihram (perfume, cutting hair/nails, marital relations, etc.) before entering this state.` },
        { title: 'Tawaf around the Ka\'bah (7 circuits)', done: false,
          sources: `**I. Quran**


### Quran (22:29)
**Arabic:** وَلْيَطَّوَّفُوا بِالْبَيْتِ الْعَتِيقِ  
**Translation:** And let them perform tawaf around the Ancient House.

### Quran (2:196)
**Arabic:** وَأَتِمُّوا الْحَجَّ وَالْعُمْرَةَ لِلَّهِ  
**Translation:** And complete the Hajj and Umrah for Allah.

**II. Hadith**


### Sahih Bukhari 1643
The Prophet (SAW) performed tawaf around the Ka'bah in seven circuits, walking quickly (raml) in the first three and walking normally in the last four.
*(Grade: Sahih)*`,
          description: `**Why?**

Tawaf is a pillar of Umrah and one of the most spiritually powerful acts a Muslim can perform. Circling the Ka'bah connects you to the millions of believers who have done the same since the time of Ibrahim (AS).


**How?**

Circle the Ka'bah seven times counter-clockwise, starting from the Black Stone. Men may perform raml (brisk walking) in the first three circuits. Maintain wudu throughout, make du'a freely during each circuit, and try to touch or point toward the Black Stone at the start of each lap.` },
        { title: 'Two rak\'at behind Maqam Ibrahim', done: false,
          sources: `**I. Hadith**


### Sahih Bukhari 1627
Narrated Ibn \`Umar:The Prophet (ﷺ) reached Mecca, circumambulated the Ka\`ba seven times and then offered a two rak\`at prayer behind Maqam Ibrahim. Then he went towards the Safa. Allah has said, "Verily, in Allah's Apostle you have a good example
*(Grade: Sahih)*

### Sahih Bukhari 1623
Narrated \`Amr:We asked Ibn \`Umar: "May a man have sexual relations with his wife during the Umra before performing Tawaf between Safa and Marwa?" He said, "Allah's Messenger (ﷺ) arrived (in Mecca) and circumambulated the Ka\`ba seven times, then offered two rak\`at behind Maqam Ibrahim (the station of Abraham), then performed Tawaf between Safa and Marwa." Ibn \`Umar added, "Verily! In Allah's Apostle you have a good example." And I asked Jabir bin \`Abdullah (the same question), and he replied, "You should not go near your wives (have sexual relations) till you have finished Tawaf between Safa and Marwa
*(Grade: Sahih)*

### Sahih Bukhari 1624
Narrated \`Amr:We asked Ibn \`Umar: "May a man have sexual relations with his wife during the Umra before performing Tawaf between Safa and Marwa?" He said, "Allah's Messenger (ﷺ) arrived (in Mecca) and circumambulated the Ka\`ba seven times, then offered two rak\`at behind Maqam Ibrahim (the station of Abraham), then performed Tawaf between Safa and Marwa." Ibn \`Umar added, "Verily! In Allah's Apostle you have a good example." And I asked Jabir bin \`Abdullah (the same question), and he replied, "You should not go near your wives (have sexual relations) till you have finished Tawaf between Safa and Marwa
*(Grade: Sahih)*`,
          description: `**Why?**

These two rak'at are a Sunnah completion of Tawaf, performed at the very station where Ibrahim (AS) stood while building the Ka'bah. It is a moment of intimate prayer in the holiest place on earth.


**How?**

After completing Tawaf, pray two rak'at behind the Station of Ibrahim if possible, or anywhere in the Haram if the area is crowded. Recite Surah al-Kafirun in the first rak'ah and Surah al-Ikhlas in the second. Then drink from Zamzam water before proceeding to Sa'i.` },
        { title: 'Sa\'i between Safa and Marwah (7 laps)', done: false,
          sources: `**I. Quran**


### Quran (2:158)
**Arabic:** إِنَّ الصَّفَا وَالْمَرْوَةَ مِن شَعَائِرِ اللَّهِ ۖ فَمَنْ حَجَّ الْبَيْتَ أَوِ اعْتَمَرَ فَلَا جُنَاحَ عَلَيْهِ أَن يَطَّوَّفَ بِهِمَا  
**Translation:** Safa and Marwa are among the rites of God, so for those who make major or minor pilgrimage to the House it is no offence to circulate between the two. Anyone who does good of his own accord will be rewarded.`,
          description: `**Why?**

Sa'i commemorates Hajar's desperate search for water for baby Isma'il. It teaches that tawakkul (trust in Allah) is paired with active striving -- she ran between the hills while relying completely on Allah's mercy.


**How?**

Walk seven times between the hills of Safa and Marwah, starting at Safa and ending at Marwah. Each direction counts as one lap. Men should jog lightly between the green markers. Make du'a at the top of each hill, and reflect on Hajar's example of faith under trial.` },
        { title: 'Shaving or trimming the hair to exit Ihram', done: false,
          sources: `**I. Quran**


### Quran (2:196)
**Arabic:** وَلَا تَحْلِقُوا رُءُوسَكُمْ حَتَّىٰ يَبْلُغَ الْهَدْيُ مَحِلَّهُ  
**Translation:** And do not shave your heads until the sacrificial animal has reached its place of slaughter.

**II. Hadith**


### Sahih Muslim 1301
The Prophet (SAW) said: "May Allah have mercy on those who shave their heads." They said: "And those who trim, O Messenger of Allah?" He said it three times, then finally said: "And those who trim."
*(Grade: Sahih)*`,
          description: `**Why?**

Shaving or trimming the hair is the act that releases you from the state of Ihram and completes the Umrah. It symbolises humility, renewal, and submission to Allah's commands over personal vanity.


**How?**

Men shave their heads completely (preferred, as the Prophet made du'a three times for those who shave and once for those who trim) or trim their hair evenly. Women cut a fingertip-length from the ends of their hair. After this, all Ihram restrictions are lifted and the Umrah is complete.` },
      ],
    },
    {
      title: 'Begin saving for Hajj if financially able',
      priority: 'medium', tags: ['hajj', 'planning'],
      description: 'Hajj is a significant financial commitment. Start saving early with a dedicated fund to make this pillar achievable.',
      subtasks: [
        { title: 'Research the average cost of Hajj from your country', done: false,
          sources: `**I. Quran**


### Quran (2:197)
**Arabic:** الْحَجُّ أَشْهُرٌ مَّعْلُومَاتٌ ۚ فَمَن فَرَضَ فِيهِنَّ الْحَجَّ فَلَا رَفَثَ وَلَا فُسُوقَ وَلَا جِدَالَ فِي الْحَجِّ ۗ وَمَا تَفْعَلُوا مِنْ خَيْرٍ يَعْلَمْهُ اللَّهُ ۗ وَتَزَوَّدُوا فَإِنَّ خَيْرَ الزَّادِ التَّقْوَىٰ ۚ وَاتَّقُونِ يَا أُولِي الْأَلْبَابِ
**Translation:** "The pilgrimage takes place during the prescribed months... Provide well for yourselves: the best provision is to be mindful of God— always be mindful of Me, you who have understanding." (Abdel Haleem)

*(The Quran's command to "provide well for yourselves" — وَتَزَوَّدُوا — is both spiritual and practical. Researching Hajj costs is how a Muslim prepares the material provision that makes the spiritual journey possible.)*

**II. Hadith**


### Sahih Bukhari 1513
Narrated Ibn \`Abbas: The Prophet (ﷺ) said, "Whoever wants to perform Hajj, let him hasten to do so; for he may fall ill or some other matter may prevent him."
*(Grade: Sahih)*`,
          description: `**Why?**

Hajj costs vary enormously by country and package tier. Without researching actual costs, you cannot set a realistic savings target or timeline, which may cause you to delay this obligation unnecessarily.


**How?**

Research costs for economy, standard, and premium Hajj packages from your country, including visa fees, flights, accommodation, and food. Contact 2-3 licensed operators for quotes. Factor in spending money for gifts and incidentals. Record the range so you can set an informed savings goal.` },
        { title: 'Open a dedicated Hajj savings account or fund', done: false,
          sources: `**I. Quran**


### Quran (3:97)
**Arabic:** وَلِلَّهِ عَلَى النَّاسِ حِجُّ الْبَيْتِ مَنِ اسْتَطَاعَ إِلَيْهِ سَبِيلًا  
**Translation:** And due to Allah from the people is a pilgrimage to the House — for whoever is able to find thereto a way.

**II. Hadith**


### Sahih Bukhari 1513
The Prophet (SAW) was asked about what makes Hajj obligatory: "Provision (al-zad) and a means of transport (al-rahilah)."
*(Grade: Sahih)*`,
          description: `**Why?**

Separating your Hajj fund from general savings protects it from being spent on other needs. A dedicated account makes the goal tangible and creates psychological commitment to the pilgrimage.


**How?**

Open a separate savings account labelled for Hajj. Some Islamic banks offer sharia-compliant Hajj savings plans with no interest. If those are unavailable, any standard savings account will work -- the key is isolation from your everyday spending.` },
        { title: 'Set up monthly automatic contributions', done: false,
          sources: `**I. Quran**


### Quran (3:97)
**Arabic:** مَنِ اسْتَطَاعَ إِلَيْهِ سَبِيلًا  
**Translation:** Whoever is able to find thereto a way.

**II. Hadith**


### Sahih Bukhari 1513
The Prophet (SAW) said Hajj is obligatory when one has provision and a means of transport — steady saving toward this obligation fulfills the condition of financial ability (istita'ah).
*(Grade: Sahih)*`,
          description: `**Why?**

Automating contributions ensures consistent progress toward your Hajj goal. It removes the temptation to skip months and leverages the principle of paying yourself first.


**How?**

Calculate how much you need to save monthly to reach your target by your intended Hajj year. Set up an automatic transfer from your main account to your Hajj fund on payday, so the money moves before you can spend it. Review and adjust the amount annually as costs change.` },
      ],
    },
  ],
  faith_hajj_growth: [
    {
      title: 'Study the spiritual meanings behind each Hajj rite (Tawaf, Sa\'i, Arafah, stoning)',
      priority: 'medium', tags: ['hajj', 'spirituality'],
      description: 'Each rite of Hajj carries profound spiritual symbolism. Understanding these transforms the physical acts into transformative experiences.',
      subtasks: [
        { title: 'Study the symbolism of Tawaf \u2014 circling the House of Allah', done: false,
          sources: `**I. Quran**


### Quran (2:158)
**Arabic:** إِنَّ الصَّفَا وَالْمَرْوَةَ مِن شَعَائِرِ اللَّهِ ۖ فَمَنْ حَجَّ الْبَيْتَ أَوِ اعْتَمَرَ فَلَا جُنَاحَ عَلَيْهِ أَن يَطَّوَّفَ بِهِمَا ۚ وَمَن تَطَوَّعَ خَيْرًا فَإِنَّ اللَّهَ شَاكِرٌ عَلِيمٌ
**Translation:** Verily! As-Safâ and Al-Marwah (two mountains in Makkah) are of the Symbols of Allâh. So it is not a sin on him who performs Hajj or ‘Umrah (pilgrimage) of the House (the Ka‘bah at Makkah) to perform the going (Tawâf) between them (As-Safâ and Al-Marwah). And whoever does good voluntarily, then verily, Allâh is All-Recogniser, All-Knower.

**II. Hadith**


### Sahih Bukhari 1790
Narrated Hisham Ibn \`Urwa from his father who said:While I was a youngster, I asked \`Aisha the wife of the Prophet. "What about the meaning of the Statement of Allah; "Verily! (the mountains) As-Safa and Al Marwa, are among the symbols of Allah. So, it is not harmful if those who perform Hajj or \`Umra of the House (Ka\`ba at Mecca) to perform the going (Tawaf) between them? (2.158) I understand (from that) that there is no harm if somebody does not perform the Tawaf between them." \`Aisha replied, "No, for if it were as you are saying, then the recitation would have been like this: 'It is not harmful not to perform Tawaf between them.' This verse was revealed in connection with the Ansar who used to assume the Ihram for the idol Manat which was put beside a place called Qudaid and those people thought it not right to perform the Tawaf of As- Safa and Al-Marwa. When Islam came, they asked Allah's Messenger (ﷺ) about that, and Allah revealed:-- "Verily! (the mountains) As-Safa and Al-Marwa Are among the symbols of Allah. So, it is not harmful of those who perform Hajj or \`Umra of the House (Ka\`ba at Mecca) to perform the going (Tawaf) between them." (2.158) Sufyan and Abu Muawiya added from Hisham (from \`Aisha): "The Hajj or \`Umra of the person who does not perform the going (Tawaf) between As-Safa and Al-Marwa is incomplete in Allah's sight
*(Grade: Sahih)*`,
          description: `**Why?**

Tawaf represents the believer's life revolving around Allah. Just as the angels circle the Throne, the pilgrim circles Allah's House on earth in devotion and submission. Understanding this transforms a physical walk into a profound spiritual declaration.


**How?**

Read scholarly commentaries on the spiritual dimensions of Tawaf. Reflect on what it means for your entire life to orbit around Allah's commands. Journal about how this symbolism applies to your daily priorities and whether Allah is truly at the centre of your decisions.` },
        { title: 'Understand Sa\'i \u2014 Hajar\'s trust and striving', done: false,
          sources: `**I. Quran**


### Quran (2:158)
**Arabic:** إِنَّ الصَّفَا وَالْمَرْوَةَ مِن شَعَائِرِ اللَّهِ ۖ فَمَنْ حَجَّ الْبَيْتَ أَوِ اعْتَمَرَ فَلَا جُنَاحَ عَلَيْهِ أَن يَطَّوَّفَ بِهِمَا  
**Translation:** Indeed, Safa and Marwah are among the symbols of Allah. So whoever makes pilgrimage to the House or performs Umrah — there is no blame upon him for walking between them.

**II. Hadith**


### Sahih Bukhari 3364
The story of Hajar running between Safa and Marwah seeking water for her son Ismail, trusting fully in Allah, until the water of Zamzam was revealed.
*(Grade: Sahih)*`,
          description: `**Why?**

Sa'i commemorates Hajar's desperate search for water between Safa and Marwah. It teaches that trust in Allah (tawakkul) does not mean passivity -- it means striving with everything you have while relying completely on Him for the outcome.


**How?**

Study the story of Hajar in detail from Sahih al-Bukhari and Quranic tafsir. Reflect on moments in your own life where you must balance effort with trust. Write down how Hajar's example challenges you to act rather than simply wait for provision.` },
        { title: 'Reflect on Arafah \u2014 standing before Allah in humility', done: false,
          sources: `**I. Quran**


### Quran (34:46)
**Arabic:** قُلْ إِنَّمَا أَعِظُكُم بِوَاحِدَةٍ ۖ أَن تَقُومُوا لِلَّهِ مَثْنَىٰ وَفُرَادَىٰ ثُمَّ تَتَفَكَّرُوا ۚ مَا بِصَاحِبِكُم مِّن جِنَّةٍ ۚ إِنْ هُوَ إِلَّا نَذِيرٌ لَّكُم بَيْنَ يَدَيْ عَذَابٍ شَدِيدٍ
**Translation:** Say: "I do admonish you on one point: that ye do stand up before Allah,- (It may be) in pairs, or (it may be) singly,- and reflect (within yourselves): your Companion is not possessed: he is no less than a warner to you, in face of a terrible Penalty."

### Quran (3:191)
**Arabic:** الَّذِينَ يَذْكُرُونَ اللَّهَ قِيَامًا وَقُعُودًا وَعَلَىٰ جُنُوبِهِمْ وَيَتَفَكَّرُونَ فِي خَلْقِ السَّمَاوَاتِ وَالْأَرْضِ رَبَّنَا مَا خَلَقْتَ هَٰذَا بَاطِلًا سُبْحَانَكَ فَقِنَا عَذَابَ النَّارِ
**Translation:** those who remember Allah while standing, sitting or (reclining) on their backs, and reflect in the creation of the heavens and the earth, (saying): 'Our Lord! You have not created this in vain. Glory to You! Save us, then, from the chastisement of the Fire.

**II. Hadith**


### Sahih Bukhari 66
Narrated Abu Waqid Al-Laithi:While Allah's Messenger (ﷺ) was sitting in the mosque with some people, three men came. Two of them came in front of Allah's Messenger (ﷺ) and the third one went away. The two persons kept on standing before Allah's Messenger (ﷺ) for a while and then one of them found a place in the circle and sat there while the other sat behind the gathering, and the third one went away. When Allah's Messenger (ﷺ) finished his preaching, he said, "Shall I tell you about these three persons? One of them betook himself to Allah, so Allah took him into His grace and mercy and accommodated him, the second felt shy from Allah, so Allah sheltered Him in His mercy (and did not punish him), while the third turned his face from Allah and went away, so Allah turned His face from him likewise
*(Grade: Sahih)*

### Sahih Bukhari 89
Narrated \`Umar:My Ansari neighbor from Bani Umaiya bin Zaid who used to live at \`Awali Al-Medina and I used to visit the Prophet (ﷺ) by turns. He used to go one day and I another day. When I went I used to bring the news of that day regarding the Divine Inspiration and other things, and when he went, he used to do the same for me. Once my Ansari friend, in his turn (on returning from the Prophet), knocked violently at my door and asked if I was there." I became horrified and came out to him. He said, "Today a great thing has happened." I then went to Hafsa and saw her weeping. I asked her, "Did Allah's Messenger (ﷺ) divorce you all?" She replied, "I do not know." Then, I entered upon the Prophet (ﷺ) and said while standing, "Have you divorced your wives?" The Prophet (ﷺ) replied in the negative. On that I said, "Allahu-Akbar (Allah is Greater)." (See Hadith No. 119, Vol. 3 for details)
*(Grade: Sahih)*`,
          description: `**Why?**

Standing at Arafah is the essence of Hajj. It is a rehearsal for the Day of Judgement -- millions standing in white garments, equal before Allah, with nothing but their deeds. The Prophet (SAW) said Hajj is Arafah.


**How?**

Study the significance of the Day of Arafah in hadith literature. Visualise the scene: stripped of all worldly markers of status, standing under the open sky, begging Allah for forgiveness. Reflect on what you would say to Allah if this were your last chance, and begin making those du'as now.` },
        { title: 'Learn the meaning of stoning \u2014 rejecting Shaytan\'s whispers', done: false,
          sources: `**I. Hadith**


### Sahih Bukhari 1749
Ibn Abbas narrated that the Prophet (SAW) said regarding the stoning of the Jamarat: "When Ibrahim was commanded to perform the rites, Shaytan appeared to him at each station. He threw seven pebbles at each one until Shaytan retreated." The stoning symbolises rejection of Shaytan's temptations.
*(Grade: Sahih)*`,
          description: `**Why?**

The stoning of the Jamarat symbolises Ibrahim's rejection of Shaytan's attempts to dissuade him from obeying Allah. Each stone thrown is a declaration of resistance against temptation and a renewal of your commitment to obey Allah over your desires.


**How?**

Study the narration of Ibrahim (AS) being approached by Shaytan at each of the three locations. Identify the "whispers" in your own life -- the rationalizations, doubts, and temptations that pull you away from obedience. Reflect on how each stone represents a conscious rejection of those whispers.` },
      ],
    },
    {
      title: 'Learn the history of Ibrahim (AS) and the founding of the Ka\'bah',
      priority: 'medium', tags: ['hajj', 'seerah'],
      description: 'Hajj traces back to Ibrahim (AS). Understanding his story deepens the emotional and spiritual connection to the rites.',
      subtasks: [
        { title: 'Read the Quranic account of Ibrahim building the Ka\'bah (2:127)', done: false,
          sources: `**I. Quran**


### Quran (2:125)
**Arabic:** وَإِذْ جَعَلْنَا الْبَيْتَ مَثَابَةً لِّلنَّاسِ وَأَمْنًا وَاتَّخِذُوا مِن مَّقَامِ إِبْرَاهِيمَ مُصَلًّى ۖ وَعَهِدْنَا إِلَىٰ إِبْرَاهِيمَ وَإِسْمَاعِيلَ أَن طَهِّرَا بَيْتِيَ لِلطَّائِفِينَ وَالْعَاكِفِينَ وَالرُّكَّعِ السُّجُودِ
**Translation:** "We made the House a resort and a sanctuary for people, saying, ‘Take the spot where Abraham stood as your place of prayer.’ We commanded Abraham and Ishmael: ‘Purify My House for those who walk round it, those who stay there, and those who bow and prostrate themselves in worship.’" (Abdel Haleem)

**II. Hadith**


### Sahih Muslim 416
Anas b. Malik reported on the authority of Malik b. Sa sa', perhaps a person of his tribe, that the Prophet of Allah (ﷺ) said:I was near the House (i. e. Ka'bah) in a state between sleep and wakefulness when I heard someone say: He is the third among the two persons. Then he came to me and took me with him. Then a golden basin containing the water of Zamzam was brought to me and my heart was opened up to such and such (part). Qatada said: I asked him who was with me (i e. the narrator) and what he meant by such and such (part). He replied: (It means that it was opened) up to the lower part of his abdomen (Then the hadith continues): My heart was extracted and it was washed with the water of Zamzam and then it was restored in its original position, after which it was filled with faith and wisdom. I was then brought a white beast which is called al-Buraq, bigger than a donkey and smaller than a mule. Its stride was as long as the eye could reach. I was mounted on it, and then we went forth till we reached the lowest heaven. Gabriel asked for the (gate) to be opened, and it was said: Who is he? He replied: Gabriel. It was again said: Who is with thee? He replied: Muhammad (ﷺ). It was said: Has he been sent for? He (Gabriel) said: Yes. He (the Prophet) said: Then (the gate) was opened for us (and it was said): Welcome unto him! His is a blessed arrival. Then we came to Adam (peace be upon him). And he (the narrator) narrated the whole account of the hadith. (The Holy Prophet) observed that he met Jesus in the second heaven, Yahya (peace be on both of them) in the third heaven, Yusuf in the third, Idris in the fourth, Harun in the fifth (peace and blessings of Allah be upon them). Then we travelled on till we reached the sixth heaven and came to Moses (peace be upon him) and I greeted him and he said: Welcome unto righteous brother and righteous prophet. And when I passed (by him) he wept, and a voice was heard saying: What makes thee weep? He said: My Lord, he is a young man whom Thou hast sent after me (as a prophet) and his followers will enter Paradise in greater numbers than my followers. Then we travelled on till we reached the seventh heaven and I came to Ibrahim. He (the narrator) narrat- ed in this hadith that the Prophet of Allah (ﷺ) told that he saw four rivers which flowed from (the root of the lote-tree of the farthest limits): two manifest rivers and two hidden rivers. I said: ' Gabriel! what are these rivers? He replied: The two hidden rivers are the rivers of Paradise, and as regards the two manifest ones, they are the Nile and the Euphrates. Then the Bait-ul-Ma'mur was raised up to me. I said: O Gabriel! what is this? He replied: It is the Bait-ul-Ma'mur. Seventy thousand angels enter into it daily and, after they come out, they never return again. Two vessels were then brought to me. The first one contained wine and the second one contained milk, and both of them were placed before me. I chose milk. It was said: You did right. Allah will guide rightly through you your Ummah on the natural course. Then fifty prayers daily were made obligatory for me. And then he narrated the rest of the hadith to the end
*(Grade: Sahih)*

### Sahih Bukhari 64
Narrated \`Abdullah bin \`Abbas:Once Allah's Messenger (ﷺ) gave a letter to a person and ordered him to go and deliver it to the Governor of Bahrain. (He did so) and the Governor of Bahrain sent it to Chousroes, who read that letter and then tore it to pieces. (The sub-narrator (Ibn Shihab) thinks that Ibn Al-Musaiyab said that Allah's Messenger (ﷺ) invoked Allah against them (saying), "May Allah tear them into pieces, and disperse them all totally
*(Grade: Sahih)*`,
          description: `**Why?**

Ibrahim and Isma'il (AS) built the Ka'bah together as an act of pure worship, making du'a for its acceptance even as they laid the stones. Understanding this history transforms the Ka'bah from a building into a living testament of prophetic devotion.


**How?**

Read Surah al-Baqarah 2:125-129 with a reliable tafsir. Study the du'a they made: "Our Lord, accept this from us." Reflect on the humility of two prophets unsure if their monumental effort would be accepted -- and let that reshape how you approach your own acts of worship.` },
        { title: 'Study the story of Hajar and Isma\'il in Makkah', done: false,
          sources: `**I. Quran**


### Quran (2:125)
**Arabic:** وَإِذْ جَعَلْنَا الْبَيْتَ مَثَابَةً لِّلنَّاسِ وَأَمْنًا وَاتَّخِذُوا مِن مَّقَامِ إِبْرَاهِيمَ مُصَلًّى ۖ وَعَهِدْنَا إِلَىٰ إِبْرَاهِيمَ وَإِسْمَاعِيلَ أَن طَهِّرَا بَيْتِيَ لِلطَّائِفِينَ وَالْعَاكِفِينَ وَالرُّكَّعِ السُّجُودِ
**Translation:** "We made the House a resort and a sanctuary for people, saying, ‘Take the spot where Abraham stood as your place of prayer.’ We commanded Abraham and Ishmael: ‘Purify My House for those who walk round it, those who stay there, and those who bow and prostrate themselves in worship.’" (Abdel Haleem)

**II. Hadith**


### Sahih Bukhari 3
Narrated 'Aisha (the mother of the faithful believers):The commencement of the Divine Inspiration to Allah's Messenger (ﷺ) was in the form of good dreams which came true like bright daylight, and then the love of seclusion was bestowed upon him. He used to go in seclusion in the cave of Hira where he used to worship (Allah alone) continuously for many days before his desire to see his family. He used to take with him the journey food for the stay and then come back to (his wife) Khadija to take his food likewise again till suddenly the Truth descended upon him while he was in the cave of Hira. The angel came to him and asked him to read. The Prophet (ﷺ) replied, "I do not know how to read." The Prophet (ﷺ) added, "The angel caught me (forcefully) and pressed me so hard that I could not bear it any more. He then released me and again asked me to read and I replied, 'I do not know how to read.' Thereupon he caught me again and pressed me a second time till I could not bear it any more. He then released me and again asked me to read but again I replied, 'I do not know how to read (or what shall I read)?' Thereupon he caught me for the third time and pressed me, and then released me and said, 'Read in the name of your Lord, who has created (all that exists), created man from a clot. Read! And your Lord is the Most Generous." (96.1, 96.2, 96.3) Then Allah's Messenger (ﷺ) returned with the Inspiration and with his heart beating severely. Then he went to Khadija bint Khuwailid and said, "Cover me! Cover me!" They covered him till his fear was over and after that he told her everything that had happened and said, "I fear that something may happen to me." Khadija replied, "Never! By Allah, Allah will never disgrace you. You keep good relations with your kith and kin, help the poor and the destitute, serve your guests generously and assist the deserving calamity-afflicted ones." Khadija then accompanied him to her cousin Waraqa bin Naufal bin Asad bin 'Abdul 'Uzza, who, during the pre-Islamic Period became a Christian and used to write the writing with Hebrew letters. He would write from the Gospel in Hebrew as much as Allah wished him to write. He was an old man and had lost his eyesight. Khadija said to Waraqa, "Listen to the story of your nephew, O my cousin!" Waraqa asked, "O my nephew! What have you seen?" Allah's Messenger (ﷺ) described whatever he had seen. Waraqa said, "This is the same one who keeps the secrets (angel Gabriel) whom Allah had sent to Moses. I wish I were young and could live up to the time when your people would turn you out." Allah's Messenger (ﷺ) asked, "Will they drive me out?" Waraqa replied in the affirmative and said, "Anyone (man) who came with something similar to what you have brought was treated with hostility; and if I should remain alive till the day when you will be turned out then I would support you strongly." But after a few days Waraqa died and the Divine Inspiration was also paused for a while
*(Grade: Sahih)*`,
          description: `**Why?**

Ibrahim left Hajar and baby Isma'il in the barren valley of Makkah by Allah's command. Her trust, her running between the hills, and the miracle of Zamzam are foundational to Hajj. Every pilgrim who performs Sa'i is walking in her footsteps.


**How?**

Read the full narration in Sahih al-Bukhari (Kitab al-Anbiya). Pay attention to Hajar's question -- "Did Allah command you to do this?" -- and her immediate acceptance when Ibrahim confirmed. Reflect on what absolute trust in Allah's plan looks like, especially when circumstances seem impossible.` },
        { title: 'Learn about Ibrahim\'s sacrifice and its connection to Eid al-Adha', done: false,
          sources: `**I. Hadith**


### Sahih Bukhari 951
Narrated Al-Bara':I heard the Prophet (ﷺ) delivering a Khutba saying, "The first thing to be done on this day (first day of \`Id ul Adha) is to pray; and after returning from the prayer we slaughter our sacrifices (in the name of Allah) and whoever does so, he acted according to our Sunna (traditions)
*(Grade: Sahih)*

### Sahih Bukhari 968
Narrated Al-Bara':The Prophet (ﷺ) delivered the Khutba on the day of Nahr (\`Id-ul-Adha) and said, "The first thing we should do on this day of ours is to pray and then return and slaughter (our sacrifices). So anyone who does so he acted according to our Sunna; and whoever slaughtered before the prayer then it was just meat that he offered to his family and would not be considered as a sacrifice in any way. My uncle Abu Burda bin Niyar got up and said, "O Allah's Messenger (ﷺ)! I slaughtered the sacrifice before the prayer but I have a young she-goat which is better than an older sheep." The Prophet (ﷺ) said, "Slaughter it in lieu of the first and such a goat will not be considered as a sacrifice for anybody else after you
*(Grade: Sahih)*`,
          description: `**Why?**

Allah tested Ibrahim with a command to sacrifice his son Isma'il. His willingness to submit earned Allah's pleasure and a ram was sent as a substitute. This ultimate act of surrender is commemorated annually on Eid al-Adha by Muslims worldwide.


**How?**

Read Surah as-Saffat 37:99-111 with tafsir. Study how both father and son submitted willingly. Reflect on what Allah might be asking you to "sacrifice" -- comfort, wealth, time, ego -- and whether you show the same willingness. Connect this understanding to the animal sacrifice during Hajj and Eid.` },
      ],
    },
    {
      title: 'Memorise the Talbiyah and key du\'as of Hajj',
      priority: 'medium', tags: ['hajj', 'memorisation'],
      description: 'The Talbiyah is the anthem of the pilgrim. Memorise it along with the key du\'as for each rite.',
      subtasks: [
        { title: 'Memorise the Talbiyah in Arabic', done: false,
          sources: `**I. Quran**


### Quran (26:198)
**Arabic:** وَلَوْ نَزَّلْنَاهُ عَلَىٰ بَعْضِ الْأَعْجَمِينَ
**Translation:** “If We had sent it down to someone who was not an Arab.” (Abdel Haleem)

*(The Quran was sent down in clear Arabic — underscoring the significance of pronouncing Islamic rites in their Arabic form, including the Talbiyah.)*

### Quran (16:103)
**Arabic:** وَلَقَدْ نَعْلَمُ أَنَّهُمْ يَقُولُونَ إِنَّمَا يُعَلِّمُهُ بَشَرٌ ۗ لِّسَانُ الَّذِي يُلْحِدُونَ إِلَيْهِ أَعْجَمِيٌّ وَهَٰذَا لِسَانٌ عَرَبِيٌّ مُّبِينٌ
**Translation:** “We know very well that they say, 'It is a man who teaches him,' but the language of the person they allude to is foreign, while this revelation is in clear Arabic.” (Abdel Haleem)

**II. Hadith**


### Sahih Bukhari 1549
Narrated Ibn \`Umar: The Prophet (ﷺ) started the Talbiyah with “Labbayk Allahumma labbayk, labbayka la shareeka laka labbayk. Innal-hamda wan-ni'mata laka wal-mulk, la shareeka lak.”
*(Grade: Sahih)*`,
          description: `**Why?**

The Talbiyah is the pilgrim's constant declaration from the moment of Ihram until stoning on the 10th of Dhul Hijjah. It is the anthem that unifies millions of pilgrims in a single cry of devotion. Arriving at Hajj without it memorised diminishes the experience.


**How?**

Memorise: "Labbayk Allahumma labbayk, labbayka la sharika laka labbayk, innal-hamda wan-ni'mata laka wal-mulk, la sharika lak." Learn its meaning: "Here I am, O Allah, here I am. You have no partner, here I am. All praise, grace, and dominion are Yours. You have no partner." Recite it daily until it flows naturally.` },
        { title: 'Learn the du\'a for entering Ihram', done: false,
          sources: `**I. Quran**


### Quran (2:197)
**Arabic:** الْحَجُّ أَشْهُرٌ مَّعْلُومَاتٌ ۚ فَمَن فَرَضَ فِيهِنَّ الْحَجَّ فَلَا رَفَثَ وَلَا فُسُوقَ وَلَا جِدَالَ فِي الْحَجِّ  
**Translation:** Hajj is in appointed months. Whoever undertakes Hajj therein — there is no sexual relations, no disobedience, and no disputing during Hajj.

**II. Hadith**


### Sahih Bukhari 1549
The Prophet (SAW) entered into ihram saying: "Labbayk Allahumma labbayk, labbayka la shareeka laka labbayk. Innal hamda wan-ni'mata laka wal-mulk, la shareeka lak."
*(Grade: Sahih)*`,
          description: `**Why?**

The intention (niyyah) for Ihram determines what you are performing -- Hajj, Umrah, or both. Stating it correctly at the outset ensures the validity of your entire pilgrimage.


**How?**

Make your intention clearly: "Labbayk Allahumma Hajjan" (for Hajj) or "Labbayk Allahumma Umratan" (for Umrah). If performing both (Qiran), say "Labbayk Allahumma Hajjan wa Umratan." Then begin the Talbiyah. Practise saying these phrases aloud until they are natural and confident.` },
        { title: 'Learn the du\'a between the Yemeni corner and the Black Stone', done: false,
          sources: `**I. Hadith**


### Sahih Bukhari 1606
Narrated Nafi\`:Ibn \`Umar. said, "I have never missed the touching of these two stones of Ka\`ba (the Black Stone and the Yemenite Corner) both in the presence and the absence of crowds, since I saw the Prophet (ﷺ) touching them." I asked Nafi\`: "Did Ibn \`Umar use to walk between the two Corners?" Nafi\` replied, "He used to walk in order that it might be easy for him to touch it (the Corner Stone)
*(Grade: Sahih)*`,
          description: `**Why?**

This specific portion of Tawaf has a recommended du'a from the Quran (2:201), making it one of the few moments during Tawaf with a specifically prescribed supplication. Knowing it enriches your Tawaf with prophetic practice.


**How?**

Memorise: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina adhaban-nar" ("Our Lord, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire"). Recite it each time you pass between the Yemeni corner and the Black Stone during Tawaf.` },
        { title: 'Learn the du\'a of Arafah (the best du\'a)', done: false,
          sources: `**I. Quran**


### Quran (7:26)
**Arabic:** يَا بَنِي آدَمَ قَدْ أَنزَلْنَا عَلَيْكُمْ لِبَاسًا يُوَارِي سَوْآتِكُمْ وَرِيشًا ۖ وَلِبَاسُ التَّقْوَىٰ ذَٰلِكَ خَيْرٌ ۚ ذَٰلِكَ مِنْ آيَاتِ اللَّهِ لَعَلَّهُمْ يَذَّكَّرُونَ
**Translation:** "Children of Adam, We have given you garments to cover your nakedness and as adornment for you; the garment of God-consciousness is the best of all garments— this is one of God’s signs, so that people may take heed." (Abdel Haleem)

*(The "garment of taqwa" — لِبَاسُ التَّقْوَىٰ — finds its fullest expression on the Day of Arafah. The pilgrim stripped of worldly garments in Ihram clothes himself in this inner garment through du’a, humility, and nearness to Allah.)*

**II. Hadith**


### Sahih Tirmidhi 3585
The Prophet (ﷺ) said: "The best du’a is the du’a of the Day of Arafah, and the best thing that I and the prophets before me have said is: ‘La ilaha illAllahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa huwa ‘ala kulli shay’in qadir.’"
*(Grade: Hasan Sahih)*`,
          description: `**Why?**

The Prophet (SAW) called the du'a of Arafah the best du'a. The Day of Arafah is the day Allah frees the most people from the Fire. Having this du'a memorised ensures you spend this precious time in the most rewarded form of remembrance.


**How?**

Memorise: "La ilaha illAllahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa huwa 'ala kulli shay'in qadir" ("There is no god but Allah alone, with no partner. To Him belongs dominion and praise, and He is able to do all things"). Repeat it frequently on the Day of Arafah alongside your personal du'as.` },
      ],
    },
    {
      title: 'Research accredited Hajj operators and packages',
      priority: 'low', tags: ['hajj', 'planning'],
      description: 'Choose a reputable Hajj operator who provides proper guidance and ensures a safe, compliant Hajj experience.',
      subtasks: [
        { title: 'Research 3-5 licensed Hajj operators', done: false,
          sources: `**I. Quran**


### Quran (2:197)
**Arabic:** الْحَجُّ أَشْهُرٌ مَّعْلُومَاتٌ ۚ فَمَن فَرَضَ فِيهِنَّ الْحَجَّ فَلَا رَفَثَ وَلَا فُسُوقَ وَلَا جِدَالَ فِي الْحَجِّ ۗ وَمَا تَفْعَلُوا مِنْ خَيْرٍ يَعْلَمْهُ اللَّهُ ۗ وَتَزَوَّدُوا فَإِنَّ خَيْرَ الزَّادِ التَّقْوَىٰ ۚ وَاتَّقُونِ يَا أُولِي الْأَلْبَابِ
**Translation:** "The pilgrimage takes place during the prescribed months... Provide well for yourselves: the best provision is to be mindful of God." (Abdel Haleem)

*(Preparing through research and operator selection is the practical application of وَتَزَوَّدُوا — "provide well for yourselves" — before the journey to Allah's House.)*

**II. Hadith**


### Sahih Bukhari 1773
Narrated \`Aisha: The Prophet (ﷺ) said, "Five are the acts of fitra (natural disposition): circumcision, shaving the pubic hair, cutting the nails, depilating the hair under the armpits, clipping or shaving the moustache." [Preparing properly for Hajj — including operator research — is the practical expression of the Prophet's emphasis on thorough preparation.]
*(Grade: Sahih)*`,
          description: `**Why?**

Only licensed operators can guarantee your visa and accommodation in Makkah and Madinah. Unlicensed operators have left pilgrims stranded or in substandard conditions. Your Hajj experience depends heavily on this choice.


**How?**

Check your country's official Hajj authority for the list of licensed operators. Shortlist 3-5 that serve your region. Verify their licensing status independently -- do not rely solely on their marketing claims. Note their years of operation and any regulatory actions against them.` },
        { title: 'Compare packages (economy, standard, premium)', done: false,
          sources: `**I. Quran**


### Quran (2:197)
**Arabic:** الْحَجُّ أَشْهُرٌ مَّعْلُومَاتٌ ۚ فَمَن فَرَضَ فِيهِنَّ الْحَجَّ فَلَا رَفَثَ وَلَا فُسُوقَ وَلَا جِدَالَ فِي الْحَجِّ ۗ وَتَزَوَّدُوا فَإِنَّ خَيْرَ الزَّادِ التَّقْوَىٰ  
**Translation:** The pilgrimage takes place during the prescribed months. There should be no indecent speech, misbehaviour, or quarrelling for anyone undertaking the pilgrimage. Provide well for yourselves: the best provision is to be mindful of God.`,
          description: `**Why?**

The package you choose affects your proximity to the Haram, the quality of scholarly guidance, group size, and overall comfort. Economy packages are closer to the Sunnah in simplicity, while premium packages offer more ease for those who need it.


**How?**

Request detailed itineraries from your shortlisted operators. Compare: proximity to the Haram, group size, whether a scholar accompanies the group, meal plans, and transport between sacred sites. Ask specifically about the Arafah and Mina camp locations, as distance from the Jamarat significantly affects the experience.` },
        { title: 'Read reviews and ask community members for recommendations', done: false,
          sources: `**I. Quran**


### Quran (22:27-28)
**Arabic:** وَأَذِّن فِي النَّاسِ بِالْحَجِّ يَأْتُوكَ رِجَالًا وَعَلَىٰ كُلِّ ضَامِرٍ يَأْتِينَ مِن كُلِّ فَجٍّ عَمِيقٍ ۝ لِّيَشْهَدُوا مَنَافِعَ لَهُمْ  
**Translation:** And proclaim to the people the Hajj; they will come to you on foot and on every lean camel from every distant pass. That they may witness benefits for themselves.

**II. Hadith**


### Sahih Bukhari 1521
The Prophet (SAW) said: "Whoever performs Hajj and does not commit any obscenity or transgression shall return (free from sin) as the day his mother bore him."
*(Grade: Sahih)*`,
          description: `**Why?**

Personal recommendations from those who have performed Hajj are invaluable. Written reviews only capture part of the picture -- direct conversations reveal how operators handle unexpected situations, crowds, and logistical challenges.


**How?**

Ask community members at your masjid who have recently performed Hajj about their operator experience. Inquire specifically about: scholarly guidance quality, organisation during the rites, how problems were handled, and whether they would use the same operator again. Cross-reference with online reviews for a balanced picture.` },
      ],
    },
  ],
  faith_hajj_excellence: [
    {
      title: 'Perform Umrah as preparation for the full Hajj experience',
      priority: 'medium', tags: ['umrah'],
      description: 'Umrah familiarises you with the sacred sites and rites, making Hajj less overwhelming when the time comes.',
      subtasks: [
        { title: 'Book an Umrah trip during a less crowded season', done: false,
          sources: `**I. Quran**


### Quran (2:196)
**Arabic:** وَأَتِمُّوا الْحَجَّ وَالْعُمْرَةَ لِلَّهِ  
**Translation:** And complete the Hajj and Umrah for Allah.

**II. Hadith**


### Sahih Bukhari 1773
The Prophet (SAW) said: "An Umrah is an expiation for the sins committed between it and the next Umrah, and Hajj Mabrur (the one accepted by Allah) has no reward other than Paradise."
*(Grade: Sahih)*`,
          description: `**Why?**

Performing Umrah outside of peak seasons (Ramadan and Hajj) gives you space to learn the rites at a comfortable pace. The reduced crowds allow you to absorb the spiritual atmosphere and build familiarity with the sacred sites before the intensity of Hajj.


**How?**

Research off-peak travel periods (typically Rabi al-Awwal through Sha'ban, excluding school holidays). Book with a reputable operator or arrange independently. Plan to spend enough days in Makkah and Madinah to perform the rites without rushing and to visit key historical sites.` },
        { title: 'Perform all the rites with full awareness and presence', done: false,
          sources: `**I. Quran**


### Quran (22:29)
**Arabic:** ثُمَّ لْيَقْضُوا تَفَثَهُمْ وَلْيُوفُوا نُذُورَهُمْ وَلْيَطَّوَّفُوا بِالْبَيْتِ الْعَتِيقِ
**Translation:** "so let the pilgrims perform their acts of cleansing, fulfil their vows, and circle around the Ancient House." (Abdel Haleem)

### Quran (2:158)
**Arabic:** إِنَّ الصَّفَا وَالْمَرْوَةَ مِن شَعَائِرِ اللَّهِ ۖ فَمَنْ حَجَّ الْبَيْتَ أَوِ اعْتَمَرَ فَلَا جُنَاحَ عَلَيْهِ أَن يَطَّوَّفَ بِهِمَا ۚ وَمَن تَطَوَّعَ خَيْرًا فَإِنَّ اللَّهَ شَاكِرٌ عَلِيمٌ
**Translation:** "Safa and Marwa are among the rites of God, so for those who make major or minor pilgrimage to the House it is no offence to circulate between the two. Anyone who does good of his own accord will be rewarded, for God rewards good deeds, and knows everything." (Abdel Haleem)

**II. Hadith**


### Sahih Bukhari 1773
Narrated Abu Huraira: The Prophet (ﷺ) said, "(The performance of) Umrah is an expiation for the sins committed between it and the previous Umrah; and the reward of Hajj Mabrur (the one accepted by Allah) is nothing except Paradise."
*(Grade: Sahih)*`,
          description: `**Why?**

This Umrah is practice for Hajj. Performing it with full khushu' (presence of heart) not only earns immense reward on its own, but builds the muscle memory and spiritual awareness you will need when Hajj adds complexity and larger crowds.


**How?**

Focus on understanding each rite as you perform it, making du'a at the appropriate places, and maintaining presence throughout. Take notes on what you learn -- which du'as felt most powerful, where you struggled with focus, what practical challenges arose. These observations become your personal Hajj preparation guide.` },
        { title: 'Document lessons learned for your future Hajj preparation', done: false,
          sources: `**I. Quran**


### Quran (2:197)
**Arabic:** وَتَزَوَّدُوا فَإِنَّ خَيْرَ الزَّادِ التَّقْوَىٰ  
**Translation:** And take provisions, but indeed the best provision is taqwa (God-consciousness).

**II. Hadith**


### Sahih Bukhari 1773
The Prophet (SAW) said: "An Umrah is an expiation for the sins committed between it and the next Umrah, and Hajj Mabrur has no reward other than Paradise."
*(Grade: Sahih)*`,
          description: `**Why?**

The practical lessons from Umrah -- what to pack, how to manage crowds, which du'as to prepare, what surprised you -- are gold for your future Hajj. Capturing them while fresh ensures you do not lose these insights.


**How?**

Write down practical lessons immediately after returning: what worked, what you wished you had known, what you would do differently. Include packing tips, crowd management strategies, du'a lists, and any fiqh questions that arose. Organise this into a personal Hajj preparation checklist you can refine over time.` },
      ],
    },
    {
      title: 'Sponsor someone for Hajj who cannot afford it',
      priority: 'low', tags: ['hajj', 'sadaqah'],
      description: 'Enabling someone to fulfil this pillar is among the greatest acts of charity. Research sponsorship opportunities.',
      subtasks: [
        { title: 'Identify a trustworthy Hajj sponsorship programme', done: false,
          sources: `**I. Quran**


### Quran (2:197)
**Arabic:** الْحَجُّ أَشْهُرٌ مَّعْلُومَاتٌ ۚ فَمَن فَرَضَ فِيهِنَّ الْحَجَّ فَلَا رَفَثَ وَلَا فُسُوقَ وَلَا جِدَالَ فِي الْحَجِّ ۗ وَمَا تَفْعَلُوا مِنْ خَيْرٍ يَعْلَمْهُ اللَّهُ ۗ وَتَزَوَّدُوا فَإِنَّ خَيْرَ الزَّادِ التَّقْوَىٰ ۚ وَاتَّقُونِ يَا أُولِي الْأَلْبَابِ
**Translation:** "The pilgrimage takes place during the prescribed months... whatever good you do, God is well aware of it." (Abdel Haleem)

*(Sponsoring another's Hajj falls under "whatever good you do" — وَمَا تَفْعَلُوا مِنْ خَيْرٍ — a deed that Allah witnesses directly.)*

**II. Hadith**


### Sahih Bukhari 2671
Narrated Abu Musa: The Prophet (ﷺ) said, "The honest treasurer who gives willingly what he is ordered to give, is one of the two givers of charity."
*(Grade: Sahih)*`,
          description: `**Why?**

Sponsoring someone's Hajj enables them to fulfil a pillar of Islam they could not achieve on their own. This is among the most impactful forms of sadaqah. However, the funds must reach a legitimate recipient through a credible channel.


**How?**

Research organisations and masjids that run Hajj sponsorship funds for those who meet the conditions but lack financial means. Verify their credibility: check registration, transparency reports, and distribution process. Ask your local imam or community leaders for trusted recommendations.` },
        { title: 'Contribute to sponsoring a pilgrim', done: false,
          sources: `**I. Quran**


### Quran (3:97)
**Arabic:** وَلِلَّهِ عَلَى النَّاسِ حِجُّ الْبَيْتِ مَنِ اسْتَطَاعَ إِلَيْهِ سَبِيلًا  
**Translation:** Pilgrimage to the House is a duty owed to God by people who are able to undertake it.

**I. Hadith**


### Sahih Bukhari 1773
The Prophet (SAW) said: "An Umrah to the next Umrah is an expiation for what is between them, and Hajj Mabrur has no reward except Paradise."
*(Grade: Sahih)*`,
          description: `**Why?**

Whether you sponsor a full Hajj or contribute partially, the reward is immense. Enabling someone to worship Allah at His House is a form of ongoing sadaqah whose reward multiplies through every du'a that pilgrim makes.


**How?**

Decide on a contribution amount based on your means. Donate through the verified programme you identified. If sponsoring fully, coordinate with the programme to understand the pilgrim's needs. Make du'a that Allah accepts both the pilgrim's Hajj and your contribution as a means of drawing closer to Him.` },
        { title: 'Make du\'a for the sponsored pilgrim', done: false,
          sources: `**I. Quran**


### Quran (22:29)
**Arabic:** ثُمَّ لْيَقْضُوا تَفَثَهُمْ وَلْيُوفُوا نُذُورَهُمْ وَلْيَطَّوَّفُوا بِالْبَيْتِ الْعَتِيقِ
**Translation:** "so let the pilgrims perform their acts of cleansing, fulfil their vows, and circle around the Ancient House." (Abdel Haleem)

*(Praying for the pilgrim you sponsored to complete their rites with sincerity and acceptance is itself an act of worship, tying your du’a to the sacred rites described in this verse.)*

**II. Hadith**


### Sahih Muslim 2733
Narrated Abu al-Darda: The Prophet (ﷺ) said: "No Muslim makes du’a for his brother in his absence except that the angel says: And for you the same."
*(Grade: Sahih)*`,
          description: `**Why?**

Your du'a for them in their absence is answered by an angel who says "And for you the same." This reciprocal blessing means that praying for the pilgrim's accepted Hajj and forgiveness returns the same to you.


**How?**

Pray that Allah accepts their Hajj, forgives their sins, and returns them home renewed in faith. Make this du'a consistently during their journey, especially on the Day of Arafah. Ask them to make du'a for you at the sacred sites as well, creating a bond of mutual supplication.` },
      ],
    },
    {
      title: 'Document and share your Hajj preparation journey for others',
      priority: 'low', tags: ['hajj', 'dawah'],
      description: 'Your preparation process can benefit others. Share what you learn \u2014 practical tips, fiqh notes, and spiritual reflections.',
      subtasks: [
        { title: 'Keep a journal during your Hajj preparation', done: false,
          sources: `**I. Quran**


### Quran (2:197)
**Arabic:** الْحَجُّ أَشْهُرٌ مَّعْلُومَاتٌ ۚ فَمَن فَرَضَ فِيهِنَّ الْحَجَّ فَلَا رَفَثَ وَلَا فُسُوقَ وَلَا جِدَالَ فِي الْحَجِّ ۗ وَمَا تَفْعَلُوا مِنْ خَيْرٍ يَعْلَمْهُ اللَّهُ ۗ وَتَزَوَّدُوا فَإِنَّ خَيْرَ الزَّادِ التَّقْوَىٰ ۚ وَاتَّقُونِ يَا أُولِي الْأَلْبَابِ
**Translation:** "The pilgrimage takes place during the prescribed months... whatever good you do, God is well aware of it. Provide well for yourselves: the best provision is to be mindful of God." (Abdel Haleem)

*(Journaling the preparation journey is itself a form of provision — وَتَزَوَّدُوا — equipping the soul with reflection and intentionality before arriving at Allah's House.)*

**II. Hadith**


### Sahih Bukhari 79
Narrated \`Abdullah bin Mas\`ud: The Prophet (ﷺ) said, "Do not wish to be like anyone except in two cases: (1) A person, whom Allah has given wealth and he spends it righteously; (2) A person whom Allah has given wisdom (the knowledge of Qur'an and hadith) and he acts according to it and teaches it to others."
*(Grade: Sahih)*`,
          description: `**Why?**

Documenting your learning journey creates a resource for both yourself and others. The questions you struggled with, the books that helped, and the practical preparations you made are exactly what future pilgrims need to know.


**How?**

Start a journal (digital or physical) that tracks: what books and courses you study, what fiqh questions arise and how you resolve them, what practical preparations you make (fitness, packing, finances), and any spiritual reflections along the way. Date each entry so it forms a timeline others can follow.` },
        { title: 'Share key lessons with family or community', done: false,
          sources: `**I. Quran**


### Quran (22:27-28)
**Arabic:** وَأَذِّن فِي النَّاسِ بِالْحَجِّ يَأْتُوكَ رِجَالًا وَعَلَىٰ كُلِّ ضَامِرٍ يَأْتِينَ مِن كُلِّ فَجٍّ عَمِيقٍ ۝ لِّيَشْهَدُوا مَنَافِعَ لَهُمْ  
**Translation:** And proclaim to the people the Hajj; they will come to you on foot and on every lean camel from every distant pass. That they may witness benefits for themselves.

### Quran (22:37)
**Arabic:** لَن يَنَالَ اللَّهَ لُحُومُهَا وَلَا دِمَاؤُهَا وَلَٰكِن يَنَالُهُ التَّقْوَىٰ مِنكُمْ  
**Translation:** Their meat will not reach Allah, nor will their blood, but what reaches Him is piety (taqwa) from you.

**II. Hadith**


### Sahih Muslim 1893
The Prophet (SAW) said: "Whoever guides someone to goodness will have a reward like that of the one who does it."
*(Grade: Sahih)*`,
          description: `**Why?**

Many Muslims feel overwhelmed by Hajj preparation because they lack accessible, personal guidance. Your lived experience and lessons learned can demystify the process and inspire others to begin their own preparation.


**How?**

Host a Hajj preparation session at your local masjid or with family. Share what you have learned about the fiqh, logistics, and spiritual dimensions of the pilgrimage. Use your journal notes as the foundation. Be honest about challenges and uncertainties -- authenticity is more helpful than polish.` },
        { title: 'Create a resource list (books, courses, du\'a cards) for future pilgrims', done: false,
          sources: `**I. Quran**


### Quran (2:196)
**Arabic:** وَأَتِمُّوا الْحَجَّ وَالْعُمْرَةَ لِلَّهِ  
**Translation:** Complete the pilgrimages, major and minor, for the sake of God.

**I. Hadith**


### Sahih Bukhari 1773
The Prophet (SAW) said: "Hajj Mabrur has no reward except Paradise." Sharing preparation resources helps future pilgrims achieve a Hajj accepted by Allah.
*(Grade: Sahih)*`,
          description: `**Why?**

A curated resource list saves future pilgrims from the overwhelming task of finding quality Hajj preparation materials on their own. Your personal recommendations carry weight because they are tested, not theoretical.


**How?**

Compile a list of the best resources you found: recommended books, online courses, du'a booklets, packing checklists, and any apps that were helpful. Annotate each with a brief note on why you recommend it. Share the list digitally (PDF, shared document, or community group) for easy access and updating.` },
      ],
    },
  ],
};
