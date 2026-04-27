/**
 * MILOS â€” Life Module Readiness Ayat Matrix
 * Opening Threshold Â· Pause Protocol Content
 * Attribute pairing: Al-QawÄ« (The Strong) Â· Al-Laá¹­Ä«f (The Subtle, Gentle)
 * Row distribution: 3 rows Al-QawÄ« (Q1â€“Q3) Â· 3 rows Al-Laá¹­Ä«f (L1â€“L3)
 * v1.0 Â· 2026-04-08
 *
 * Key schema: 6-character binary string
 * Positions: Q1 Q2 Q3 L1 L2 L3
 * 1 = YES Â· 0 = NOT YET
 *
 * Row definitions:
 *   Q1: Entering from an attended foundation vs. running on unacknowledged reserves
 *   Q2: Meeting difficulty honestly vs. managing through without attending to it
 *   Q3: Drawing from a replenished source vs. operating on discipline alone
 *   L1: Present enough to notice what is actually needed vs. proceeding on habit
 *   L2: Attending to body/mind/heart signals vs. overriding them for productivity
 *   L3: Holding those in care with full attentiveness vs. giving them what remains
 *
 * Usage: READINESS_AYAT_HEALTH[key]
 * Returns: null (proceed) or ayah object (pause protocol)
 *
 * MAPPING NOTES:
 * - ~38 unique ayat across 63 non-null entries
 * - Dominant themes by row:
 *     Q1=0 â†’ da'f (human weakness), Allah's lightening (4:28, 30:54, 2:286, 8:66, 70:19)
 *     Q2=0 â†’ sabr, musabara, haqq (2:153, 3:200, 16:127, 2:155, 94:5)
 *     Q3=0 â†’ sakan, rahat, tawakkul (28:73, 30:23, 25:47, 33:3)
 *     L1=0 â†’ ghaflah, yaqzah (50:22, 7:205, 59:18, 50:37, 21:1)
 *     L2=0 â†’ self-witness, amanah al-nafs (75:14, 4:29, 7:31, 5:87, 91:7)
 *     L3=0 â†’ haqq, silah, ri'ayah (66:6, 4:36, 4:1, 2:233, 17:26)
 * - Theological poles:
 *     000111 â†’ depletion unacknowledged; attentiveness intact â†’ rest, human limits
 *     111000 â†’ strength sustained; attentiveness absent â†’ Al-Laá¹­Ä«f, subtle perception
 *     100001 â†’ Q1 met, Q2â€“L2 not, L3 met â†’ self and its honest responsibilities
 *     011110 â†’ Q1 not met, Q2â€“L2 met, L3 not â†’ foundational honesty without outer care
 * - All Arabic text sourced from ar-simple-clean via quran.ai MCP
 * - All translations from en-sahih-international via quran.ai MCP
 * - Framing sentences: all â‰¤ 20 words, 1st person, warm muhasabah register
 * - No two adjacent keys (Hamming distance 1) share identical framing
 *
 * Grounded with quran.ai: fetch_quran (38 ayat, ar-simple-clean),
 *   fetch_translation (38 ayat, en-sahih-international),
 *   search_quran (8 queries)
 */

// â”€â”€â”€ Canonical Ayah Data (private) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Each const holds immutable ayah data; matrix entries spread these
// and add a key-specific `framing` field.

const _4_28 = {
  arabic: 'ÙŠÙØ±ÙÙŠØ¯Ù Ø§Ù„Ù„ÙŽÙ‘Ù‡Ù Ø£ÙŽÙ† ÙŠÙØ®ÙŽÙÙÙ‘ÙÙŽ Ø¹ÙŽÙ†ÙƒÙÙ…Ù’ Ûš ÙˆÙŽØ®ÙÙ„ÙÙ‚ÙŽ Ø§Ù„Ù’Ø¥ÙÙ†Ø³ÙŽØ§Ù†Ù Ø¶ÙŽØ¹ÙÙŠÙÙ‹Ø§',
  transliteration: "Yuridullahu an yukhaffifa 'ankum. Wa khuliqal-insanu da'ifa",
  translation: 'And AllÄh wants to lighten for you [your difficulties]; and mankind was created weak.',
  source: 'An-Nisa 4:28',
  edition: 'en-sahih-international',
};

const _30_54 = {
  arabic: 'Ø§Ù„Ù„ÙŽÙ‘Ù‡Ù Ø§Ù„ÙŽÙ‘Ø°ÙÙŠ Ø®ÙŽÙ„ÙŽÙ‚ÙŽÙƒÙÙ… Ù…ÙÙ‘Ù† Ø¶ÙŽØ¹Ù’ÙÙ Ø«ÙÙ…ÙŽÙ‘ Ø¬ÙŽØ¹ÙŽÙ„ÙŽ Ù…ÙÙ† Ø¨ÙŽØ¹Ù’Ø¯Ù Ø¶ÙŽØ¹Ù’ÙÙ Ù‚ÙÙˆÙŽÙ‘Ø©Ù‹ Ø«ÙÙ…ÙŽÙ‘ Ø¬ÙŽØ¹ÙŽÙ„ÙŽ Ù…ÙÙ† Ø¨ÙŽØ¹Ù’Ø¯Ù Ù‚ÙÙˆÙŽÙ‘Ø©Ù Ø¶ÙŽØ¹Ù’ÙÙ‹Ø§ ÙˆÙŽØ´ÙŽÙŠÙ’Ø¨ÙŽØ©Ù‹ Ûš ÙŠÙŽØ®Ù’Ù„ÙÙ‚Ù Ù…ÙŽØ§ ÙŠÙŽØ´ÙŽØ§Ø¡Ù Û– ÙˆÙŽÙ‡ÙÙˆÙŽ Ø§Ù„Ù’Ø¹ÙŽÙ„ÙÙŠÙ…Ù Ø§Ù„Ù’Ù‚ÙŽØ¯ÙÙŠØ±Ù',
  transliteration: "Allahul-ladhi khalaqakum min da'fin thumma ja'ala min ba'di da'fin quwwatan thumma ja'ala min ba'di quwwatin da'fan wa shaybah. Yakhluqu ma yasha'. Wa huwal-'alimul-qadir",
  translation: 'AllÄh is the one who created you from weakness, then made after weakness strength, then made after strength weakness and white hair. He creates what He wills, and He is the Knowing, the Competent.',
  source: 'Ar-Rum 30:54',
  edition: 'en-sahih-international',
};

const _2_286 = {
  arabic: 'Ù„ÙŽØ§ ÙŠÙÙƒÙŽÙ„ÙÙ‘ÙÙ Ø§Ù„Ù„ÙŽÙ‘Ù‡Ù Ù†ÙŽÙÙ’Ø³Ù‹Ø§ Ø¥ÙÙ„ÙŽÙ‘Ø§ ÙˆÙØ³Ù’Ø¹ÙŽÙ‡ÙŽØ§ Ûš Ù„ÙŽÙ‡ÙŽØ§ Ù…ÙŽØ§ ÙƒÙŽØ³ÙŽØ¨ÙŽØªÙ’ ÙˆÙŽØ¹ÙŽÙ„ÙŽÙŠÙ’Ù‡ÙŽØ§ Ù…ÙŽØ§ Ø§ÙƒÙ’ØªÙŽØ³ÙŽØ¨ÙŽØªÙ’ Û— Ø±ÙŽØ¨ÙŽÙ‘Ù†ÙŽØ§ Ù„ÙŽØ§ ØªÙØ¤ÙŽØ§Ø®ÙØ°Ù’Ù†ÙŽØ§ Ø¥ÙÙ† Ù†ÙŽÙ‘Ø³ÙÙŠÙ†ÙŽØ§ Ø£ÙŽÙˆÙ’ Ø£ÙŽØ®Ù’Ø·ÙŽØ£Ù’Ù†ÙŽØ§ Ûš Ø±ÙŽØ¨ÙŽÙ‘Ù†ÙŽØ§ ÙˆÙŽÙ„ÙŽØ§ ØªÙŽØ­Ù’Ù…ÙÙ„Ù’ Ø¹ÙŽÙ„ÙŽÙŠÙ’Ù†ÙŽØ§ Ø¥ÙØµÙ’Ø±Ù‹Ø§ ÙƒÙŽÙ…ÙŽØ§ Ø­ÙŽÙ…ÙŽÙ„Ù’ØªÙŽÙ‡Ù Ø¹ÙŽÙ„ÙŽÙ‰ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠÙ†ÙŽ Ù…ÙÙ† Ù‚ÙŽØ¨Ù’Ù„ÙÙ†ÙŽØ§ Ûš Ø±ÙŽØ¨ÙŽÙ‘Ù†ÙŽØ§ ÙˆÙŽÙ„ÙŽØ§ ØªÙØ­ÙŽÙ…ÙÙ‘Ù„Ù’Ù†ÙŽØ§ Ù…ÙŽØ§ Ù„ÙŽØ§ Ø·ÙŽØ§Ù‚ÙŽØ©ÙŽ Ù„ÙŽÙ†ÙŽØ§ Ø¨ÙÙ‡Ù Û– ÙˆÙŽØ§Ø¹Ù’ÙÙ Ø¹ÙŽÙ†ÙŽÙ‘Ø§ ÙˆÙŽØ§ØºÙ’ÙÙØ±Ù’ Ù„ÙŽÙ†ÙŽØ§ ÙˆÙŽØ§Ø±Ù’Ø­ÙŽÙ…Ù’Ù†ÙŽØ§ Ûš Ø£ÙŽÙ†ØªÙŽ Ù…ÙŽÙˆÙ’Ù„ÙŽØ§Ù†ÙŽØ§ ÙÙŽØ§Ù†ØµÙØ±Ù’Ù†ÙŽØ§ Ø¹ÙŽÙ„ÙŽÙ‰ Ø§Ù„Ù’Ù‚ÙŽÙˆÙ’Ù…Ù Ø§Ù„Ù’ÙƒÙŽØ§ÙÙØ±ÙÙŠÙ†ÙŽ',
  transliteration: "La yukallifullahu nafsan illa wus'aha. Laha ma kasabat wa 'alayha maktasabat. Rabbana la tu'akhidhna in nasina aw akhta'na. Rabbana wa la tahmil 'alayna isran kama hamaltahu 'alal-ladhina min qablina. Rabbana wa la tuhammilna ma la taqata lana bih. Wa'fu 'anna waghfir lana warhamna. Anta mawlana fansurna 'alal-qawmil-kafirin",
  translation: 'AllÄh does not charge a soul except [with that within] its capacity. It will have [the consequence of] what [good] it has gained, and it will bear [the consequence of] what [evil] it has earned. "Our Lord, do not impose blame upon us if we have forgotten or erred. Our Lord, and lay not upon us a burden like that which You laid upon those before us. Our Lord, and burden us not with that which we have no ability to bear. And pardon us; and forgive us; and have mercy upon us. You are our protector, so give us victory over the disbelieving people."',
  source: 'Al-Baqarah 2:286',
  edition: 'en-sahih-international',
};

const _8_66 = {
  arabic: 'Ø§Ù„Ù’Ø¢Ù†ÙŽ Ø®ÙŽÙÙŽÙ‘ÙÙŽ Ø§Ù„Ù„ÙŽÙ‘Ù‡Ù Ø¹ÙŽÙ†ÙƒÙÙ…Ù’ ÙˆÙŽØ¹ÙŽÙ„ÙÙ…ÙŽ Ø£ÙŽÙ†ÙŽÙ‘ ÙÙÙŠÙƒÙÙ…Ù’ Ø¶ÙŽØ¹Ù’ÙÙ‹Ø§ Ûš ÙÙŽØ¥ÙÙ† ÙŠÙŽÙƒÙÙ† Ù…ÙÙ‘Ù†ÙƒÙÙ… Ù…ÙÙ‘Ø§Ø¦ÙŽØ©ÙŒ ØµÙŽØ§Ø¨ÙØ±ÙŽØ©ÙŒ ÙŠÙŽØºÙ’Ù„ÙØ¨ÙÙˆØ§ Ù…ÙØ§Ø¦ÙŽØªÙŽÙŠÙ’Ù†Ù Ûš ÙˆÙŽØ¥ÙÙ† ÙŠÙŽÙƒÙÙ† Ù…ÙÙ‘Ù†ÙƒÙÙ…Ù’ Ø£ÙŽÙ„Ù’ÙÙŒ ÙŠÙŽØºÙ’Ù„ÙØ¨ÙÙˆØ§ Ø£ÙŽÙ„Ù’ÙÙŽÙŠÙ’Ù†Ù Ø¨ÙØ¥ÙØ°Ù’Ù†Ù Ø§Ù„Ù„ÙŽÙ‘Ù‡Ù Û— ÙˆÙŽØ§Ù„Ù„ÙŽÙ‘Ù‡Ù Ù…ÙŽØ¹ÙŽ Ø§Ù„ØµÙŽÙ‘Ø§Ø¨ÙØ±ÙÙŠÙ†ÙŽ',
  transliteration: "Al-ana khaffafallahu 'ankum wa 'alima anna fikum da'fa. Fa'in yakun minkum mi'atun sabiratun yaghlibu mi'atayn. Wa'in yakun minkum alfun yaghlibuu alfayni bi'idhnillah. Wallahu ma'as-sabirin",
  translation: 'Now, AllÄh has lightened [the hardship] for you, and He knows that among you is weakness. So if there are from you one hundred [who are] steadfast, they will overcome two hundred. And if there are among you a thousand, they will overcome two thousand by permission of AllÄh. And AllÄh is with the steadfast.',
  source: 'Al-Anfal 8:66',
  edition: 'en-sahih-international',
};

const _70_19 = {
  arabic: 'Ø¥ÙÙ†ÙŽÙ‘ Ø§Ù„Ù’Ø¥ÙÙ†Ø³ÙŽØ§Ù†ÙŽ Ø®ÙÙ„ÙÙ‚ÙŽ Ù‡ÙŽÙ„ÙÙˆØ¹Ù‹Ø§',
  transliteration: "Innal-insana khuliqa halu'a",
  translation: 'Indeed, mankind was created anxious:',
  source: 'Al-Ma\'arij 70:19',
  edition: 'en-sahih-international',
};

const _2_153 = {
  arabic: 'ÙŠÙŽØ§ Ø£ÙŽÙŠÙÙ‘Ù‡ÙŽØ§ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠÙ†ÙŽ Ø¢Ù…ÙŽÙ†ÙÙˆØ§ Ø§Ø³Ù’ØªÙŽØ¹ÙÙŠÙ†ÙÙˆØ§ Ø¨ÙØ§Ù„ØµÙŽÙ‘Ø¨Ù’Ø±Ù ÙˆÙŽØ§Ù„ØµÙŽÙ‘Ù„ÙŽØ§Ø©Ù Ûš Ø¥ÙÙ†ÙŽÙ‘ Ø§Ù„Ù„ÙŽÙ‘Ù‡ÙŽ Ù…ÙŽØ¹ÙŽ Ø§Ù„ØµÙŽÙ‘Ø§Ø¨ÙØ±ÙÙŠÙ†ÙŽ',
  transliteration: "Ya ayyuhal-ladhina amanus-ta'inu bis-sabri was-salah. Innallaha ma'as-sabirin",
  translation: 'O you who have believed, seek help through patience and prayer. Indeed, AllÄh is with the patient.',
  source: 'Al-Baqarah 2:153',
  edition: 'en-sahih-international',
};

const _3_200 = {
  arabic: 'ÙŠÙŽØ§ Ø£ÙŽÙŠÙÙ‘Ù‡ÙŽØ§ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠÙ†ÙŽ Ø¢Ù…ÙŽÙ†ÙÙˆØ§ Ø§ØµÙ’Ø¨ÙØ±ÙÙˆØ§ ÙˆÙŽØµÙŽØ§Ø¨ÙØ±ÙÙˆØ§ ÙˆÙŽØ±ÙŽØ§Ø¨ÙØ·ÙÙˆØ§ ÙˆÙŽØ§ØªÙŽÙ‘Ù‚ÙÙˆØ§ Ø§Ù„Ù„ÙŽÙ‘Ù‡ÙŽ Ù„ÙŽØ¹ÙŽÙ„ÙŽÙ‘ÙƒÙÙ…Ù’ ØªÙÙÙ’Ù„ÙØ­ÙÙˆÙ†ÙŽ',
  transliteration: "Ya ayyuhal-ladhina amanus-biru wa sabiru wa rabitu wattaqullaha la'allakum tuflihun",
  translation: 'O you who have believed, persevere and endure and remain stationed and fear AllÄh that you may be successful.',
  source: 'Ali \'Imran 3:200',
  edition: 'en-sahih-international',
};

const _16_127 = {
  arabic: 'ÙˆÙŽØ§ØµÙ’Ø¨ÙØ±Ù’ ÙˆÙŽÙ…ÙŽØ§ ØµÙŽØ¨Ù’Ø±ÙÙƒÙŽ Ø¥ÙÙ„ÙŽÙ‘Ø§ Ø¨ÙØ§Ù„Ù„ÙŽÙ‘Ù‡Ù Ûš ÙˆÙŽÙ„ÙŽØ§ ØªÙŽØ­Ù’Ø²ÙŽÙ†Ù’ Ø¹ÙŽÙ„ÙŽÙŠÙ’Ù‡ÙÙ…Ù’ ÙˆÙŽÙ„ÙŽØ§ ØªÙŽÙƒÙ ÙÙÙŠ Ø¶ÙŽÙŠÙ’Ù‚Ù Ù…ÙÙ‘Ù…ÙŽÙ‘Ø§ ÙŠÙŽÙ…Ù’ÙƒÙØ±ÙÙˆÙ†ÙŽ',
  transliteration: "Wasbir wa ma sabruka illa billah. Wa la tahzan 'alayhim wa la taku fi dayqin mimma yamkurun",
  translation: 'And be patient, and your patience is not but through AllÄh. And do not grieve over them and do not be in distress over what they conspire.',
  source: 'An-Nahl 16:127',
  edition: 'en-sahih-international',
};

const _2_155 = {
  arabic: 'ÙˆÙŽÙ„ÙŽÙ†ÙŽØ¨Ù’Ù„ÙÙˆÙŽÙ†ÙŽÙ‘ÙƒÙÙ… Ø¨ÙØ´ÙŽÙŠÙ’Ø¡Ù Ù…ÙÙ‘Ù†ÙŽ Ø§Ù„Ù’Ø®ÙŽÙˆÙ’ÙÙ ÙˆÙŽØ§Ù„Ù’Ø¬ÙÙˆØ¹Ù ÙˆÙŽÙ†ÙŽÙ‚Ù’ØµÙ Ù…ÙÙ‘Ù†ÙŽ Ø§Ù„Ù’Ø£ÙŽÙ…Ù’ÙˆÙŽØ§Ù„Ù ÙˆÙŽØ§Ù„Ù’Ø£ÙŽÙ†ÙÙØ³Ù ÙˆÙŽØ§Ù„Ø«ÙŽÙ‘Ù…ÙŽØ±ÙŽØ§ØªÙ Û— ÙˆÙŽØ¨ÙŽØ´ÙÙ‘Ø±Ù Ø§Ù„ØµÙŽÙ‘Ø§Ø¨ÙØ±ÙÙŠÙ†ÙŽ',
  transliteration: "Wa lanabluwannakum bishay'in minal-khawfi wal-ju'i wa naqsin minal-amwali wal-anfusi wath-thamarat. Wa bashshiris-sabirin",
  translation: 'And We will surely test you with something of fear and hunger and a loss of wealth and lives and fruits, but give good tidings to the patient,',
  source: 'Al-Baqarah 2:155',
  edition: 'en-sahih-international',
};

const _2_156 = {
  arabic: 'Ø§Ù„ÙŽÙ‘Ø°ÙÙŠÙ†ÙŽ Ø¥ÙØ°ÙŽØ§ Ø£ÙŽØµÙŽØ§Ø¨ÙŽØªÙ’Ù‡ÙÙ… Ù…ÙÙ‘ØµÙÙŠØ¨ÙŽØ©ÙŒ Ù‚ÙŽØ§Ù„ÙÙˆØ§ Ø¥ÙÙ†ÙŽÙ‘Ø§ Ù„ÙÙ„ÙŽÙ‘Ù‡Ù ÙˆÙŽØ¥ÙÙ†ÙŽÙ‘Ø§ Ø¥ÙÙ„ÙŽÙŠÙ’Ù‡Ù Ø±ÙŽØ§Ø¬ÙØ¹ÙÙˆÙ†ÙŽ',
  transliteration: "Alladhina idha asabathum musibatun qalu inna lillahi wa inna ilayhi raji'un",
  translation: 'Who, when disaster strikes them, say, "Indeed we belong to AllÄh, and indeed to Him we will return."',
  source: 'Al-Baqarah 2:156',
  edition: 'en-sahih-international',
};

const _94_5 = {
  arabic: 'ÙÙŽØ¥ÙÙ†ÙŽÙ‘ Ù…ÙŽØ¹ÙŽ Ø§Ù„Ù’Ø¹ÙØ³Ù’Ø±Ù ÙŠÙØ³Ù’Ø±Ù‹Ø§',
  transliteration: "Fa inna ma'al-'usri yusra",
  translation: 'For indeed, with hardship [will be] ease.',
  source: 'Ash-Sharh 94:5',
  edition: 'en-sahih-international',
};

const _28_73 = {
  arabic: 'ÙˆÙŽÙ…ÙÙ† Ø±ÙŽÙ‘Ø­Ù’Ù…ÙŽØªÙÙ‡Ù Ø¬ÙŽØ¹ÙŽÙ„ÙŽ Ù„ÙŽÙƒÙÙ…Ù Ø§Ù„Ù„ÙŽÙ‘ÙŠÙ’Ù„ÙŽ ÙˆÙŽØ§Ù„Ù†ÙŽÙ‘Ù‡ÙŽØ§Ø±ÙŽ Ù„ÙØªÙŽØ³Ù’ÙƒÙÙ†ÙÙˆØ§ ÙÙÙŠÙ‡Ù ÙˆÙŽÙ„ÙØªÙŽØ¨Ù’ØªÙŽØºÙÙˆØ§ Ù…ÙÙ† ÙÙŽØ¶Ù’Ù„ÙÙ‡Ù ÙˆÙŽÙ„ÙŽØ¹ÙŽÙ„ÙŽÙ‘ÙƒÙÙ…Ù’ ØªÙŽØ´Ù’ÙƒÙØ±ÙÙˆÙ†ÙŽ',
  transliteration: "Wa min rahmatihi ja'ala lakumul-layla wan-nahara litaskunu fihi wa litabtaghu min fadlihi wa la'allakum tashkurun",
  translation: 'And out of His mercy He made for you the night and the day that you may rest therein and [by day] seek from His bounty and [that] perhaps you will be grateful.',
  source: 'Al-Qasas 28:73',
  edition: 'en-sahih-international',
};

const _30_23 = {
  arabic: 'ÙˆÙŽÙ…ÙÙ†Ù’ Ø¢ÙŠÙŽØ§ØªÙÙ‡Ù Ù…ÙŽÙ†ÙŽØ§Ù…ÙÙƒÙÙ… Ø¨ÙØ§Ù„Ù„ÙŽÙ‘ÙŠÙ’Ù„Ù ÙˆÙŽØ§Ù„Ù†ÙŽÙ‘Ù‡ÙŽØ§Ø±Ù ÙˆÙŽØ§Ø¨Ù’ØªÙØºÙŽØ§Ø¤ÙÙƒÙÙ… Ù…ÙÙ‘Ù† ÙÙŽØ¶Ù’Ù„ÙÙ‡Ù Ûš Ø¥ÙÙ†ÙŽÙ‘ ÙÙÙŠ Ø°ÙŽÙ°Ù„ÙÙƒÙŽ Ù„ÙŽØ¢ÙŠÙŽØ§ØªÙ Ù„ÙÙ‘Ù‚ÙŽÙˆÙ’Ù…Ù ÙŠÙŽØ³Ù’Ù…ÙŽØ¹ÙÙˆÙ†ÙŽ',
  transliteration: "Wa min ayatihi namaukukum bil-layli wan-nahari wabtighau'ukum min fadlih. Inna fi dhalika la'ayatin liqawmin yasma'un",
  translation: 'And of His signs is your sleep by night and day and your seeking of His bounty. Indeed in that are signs for a people who listen.',
  source: 'Ar-Rum 30:23',
  edition: 'en-sahih-international',
};

const _25_47 = {
  arabic: 'ÙˆÙŽÙ‡ÙÙˆÙŽ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠ Ø¬ÙŽØ¹ÙŽÙ„ÙŽ Ù„ÙŽÙƒÙÙ…Ù Ø§Ù„Ù„ÙŽÙ‘ÙŠÙ’Ù„ÙŽ Ù„ÙØ¨ÙŽØ§Ø³Ù‹Ø§ ÙˆÙŽØ§Ù„Ù†ÙŽÙ‘ÙˆÙ’Ù…ÙŽ Ø³ÙØ¨ÙŽØ§ØªÙ‹Ø§ ÙˆÙŽØ¬ÙŽØ¹ÙŽÙ„ÙŽ Ø§Ù„Ù†ÙŽÙ‘Ù‡ÙŽØ§Ø±ÙŽ Ù†ÙØ´ÙÙˆØ±Ù‹Ø§',
  transliteration: "Wa huwal-ladhi ja'ala lakumul-layla libasan wan-nawma subatan wa ja'alan-nahara nushura",
  translation: 'And it is He who has made the night for you as clothing and sleep [a means for] rest and has made the day a resurrection.',
  source: 'Al-Furqan 25:47',
  edition: 'en-sahih-international',
};

const _33_3 = {
  arabic: 'ÙˆÙŽØªÙŽÙˆÙŽÙƒÙŽÙ‘Ù„Ù’ Ø¹ÙŽÙ„ÙŽÙ‰ Ø§Ù„Ù„ÙŽÙ‘Ù‡Ù Ûš ÙˆÙŽÙƒÙŽÙÙŽÙ‰Ù° Ø¨ÙØ§Ù„Ù„ÙŽÙ‘Ù‡Ù ÙˆÙŽÙƒÙÙŠÙ„Ù‹Ø§',
  transliteration: "Wa tawakkal 'alallah. Wa kafa billahi wakila",
  translation: 'And rely upon AllÄh; and sufficient is AllÄh as Disposer of affairs.',
  source: 'Al-Ahzab 33:3',
  edition: 'en-sahih-international',
};

const _50_22 = {
  arabic: 'Ù„ÙŽÙ‘Ù‚ÙŽØ¯Ù’ ÙƒÙÙ†ØªÙŽ ÙÙÙŠ ØºÙŽÙÙ’Ù„ÙŽØ©Ù Ù…ÙÙ‘Ù†Ù’ Ù‡ÙŽÙ°Ø°ÙŽØ§ ÙÙŽÙƒÙŽØ´ÙŽÙÙ’Ù†ÙŽØ§ Ø¹ÙŽÙ†ÙƒÙŽ ØºÙØ·ÙŽØ§Ø¡ÙŽÙƒÙŽ ÙÙŽØ¨ÙŽØµÙŽØ±ÙÙƒÙŽ Ø§Ù„Ù’ÙŠÙŽÙˆÙ’Ù…ÙŽ Ø­ÙŽØ¯ÙÙŠØ¯ÙŒ',
  transliteration: "Laqad kunta fi ghflatin min hadha fakashafna 'anka ghita'aka fabasarukal-yawma hadid",
  translation: '[It will be said], "You were certainly in unmindfulness of this, and We have removed from you your cover, so your sight, this Day, is sharp."',
  source: 'Qaf 50:22',
  edition: 'en-sahih-international',
};

const _7_205 = {
  arabic: 'ÙˆÙŽØ§Ø°Ù’ÙƒÙØ± Ø±ÙŽÙ‘Ø¨ÙŽÙ‘ÙƒÙŽ ÙÙÙŠ Ù†ÙŽÙÙ’Ø³ÙÙƒÙŽ ØªÙŽØ¶ÙŽØ±ÙÙ‘Ø¹Ù‹Ø§ ÙˆÙŽØ®ÙÙŠÙÙŽØ©Ù‹ ÙˆÙŽØ¯ÙÙˆÙ†ÙŽ Ø§Ù„Ù’Ø¬ÙŽÙ‡Ù’Ø±Ù Ù…ÙÙ†ÙŽ Ø§Ù„Ù’Ù‚ÙŽÙˆÙ’Ù„Ù Ø¨ÙØ§Ù„Ù’ØºÙØ¯ÙÙˆÙÙ‘ ÙˆÙŽØ§Ù„Ù’Ø¢ØµÙŽØ§Ù„Ù ÙˆÙŽÙ„ÙŽØ§ ØªÙŽÙƒÙÙ† Ù…ÙÙ‘Ù†ÙŽ Ø§Ù„Ù’ØºÙŽØ§ÙÙÙ„ÙÙŠÙ†ÙŽ',
  transliteration: "Wadhkur rabbaka fi nafsika tadarru'an wa khifatan wa dunal-jahri minal-qawli bil-ghuduwwi wal-asal. Wa la takun minal-ghafilin",
  translation: 'And remember your Lord within yourself in humility and in fear without being apparent in speech - in the mornings and the evenings. And do not be among the heedless.',
  source: "Al-A'raf 7:205",
  edition: 'en-sahih-international',
};

const _59_18 = {
  arabic: 'ÙŠÙŽØ§ Ø£ÙŽÙŠÙÙ‘Ù‡ÙŽØ§ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠÙ†ÙŽ Ø¢Ù…ÙŽÙ†ÙÙˆØ§ Ø§ØªÙŽÙ‘Ù‚ÙÙˆØ§ Ø§Ù„Ù„ÙŽÙ‘Ù‡ÙŽ ÙˆÙŽÙ„Ù’ØªÙŽÙ†Ø¸ÙØ±Ù’ Ù†ÙŽÙÙ’Ø³ÙŒ Ù…ÙŽÙ‘Ø§ Ù‚ÙŽØ¯ÙŽÙ‘Ù…ÙŽØªÙ’ Ù„ÙØºÙŽØ¯Ù Û– ÙˆÙŽØ§ØªÙŽÙ‘Ù‚ÙÙˆØ§ Ø§Ù„Ù„ÙŽÙ‘Ù‡ÙŽ Ûš Ø¥ÙÙ†ÙŽÙ‘ Ø§Ù„Ù„ÙŽÙ‘Ù‡ÙŽ Ø®ÙŽØ¨ÙÙŠØ±ÙŒ Ø¨ÙÙ…ÙŽØ§ ØªÙŽØ¹Ù’Ù…ÙŽÙ„ÙÙˆÙ†ÙŽ',
  transliteration: "Ya ayyuhal-ladhina amanuttaqullaha waltandhur nafsun ma qaddamat lighad. Wattaqullaha. Innallaha khabirun bima ta'malun",
  translation: 'O you who have believed, fear AllÄh. And let every soul look to what it has put forth for tomorrow - and fear AllÄh. Indeed, AllÄh is Aware of what you do.',
  source: 'Al-Hashr 59:18',
  edition: 'en-sahih-international',
};

const _50_37 = {
  arabic: 'Ø¥ÙÙ†ÙŽÙ‘ ÙÙÙŠ Ø°ÙŽÙ°Ù„ÙÙƒÙŽ Ù„ÙŽØ°ÙÙƒÙ’Ø±ÙŽÙ‰Ù° Ù„ÙÙ…ÙŽÙ† ÙƒÙŽØ§Ù†ÙŽ Ù„ÙŽÙ‡Ù Ù‚ÙŽÙ„Ù’Ø¨ÙŒ Ø£ÙŽÙˆÙ’ Ø£ÙŽÙ„Ù’Ù‚ÙŽÙ‰ Ø§Ù„Ø³ÙŽÙ‘Ù…Ù’Ø¹ÙŽ ÙˆÙŽÙ‡ÙÙˆÙŽ Ø´ÙŽÙ‡ÙÙŠØ¯ÙŒ',
  transliteration: "Inna fi dhalika ladhikra liman kana lahu qalbun aw alqas-sam'a wa huwa shahid",
  translation: 'Indeed in that is a reminder for whoever has a heart or who listens while he is present [in mind].',
  source: 'Qaf 50:37',
  edition: 'en-sahih-international',
};

const _21_1 = {
  arabic: 'Ø§Ù‚Ù’ØªÙŽØ±ÙŽØ¨ÙŽ Ù„ÙÙ„Ù†ÙŽÙ‘Ø§Ø³Ù Ø­ÙØ³ÙŽØ§Ø¨ÙÙ‡ÙÙ…Ù’ ÙˆÙŽÙ‡ÙÙ…Ù’ ÙÙÙŠ ØºÙŽÙÙ’Ù„ÙŽØ©Ù Ù…ÙÙ‘Ø¹Ù’Ø±ÙØ¶ÙÙˆÙ†ÙŽ',
  transliteration: "Iqtaraba lin-nasi hisabuhum wa hum fi ghflatin mu'ridun",
  translation: '[The time of] their account has approached for the people, while they are in heedlessness turning away.',
  source: 'Al-Anbya 21:1',
  edition: 'en-sahih-international',
};

const _75_14 = {
  arabic: 'Ø¨ÙŽÙ„Ù Ø§Ù„Ù’Ø¥ÙÙ†Ø³ÙŽØ§Ù†Ù Ø¹ÙŽÙ„ÙŽÙ‰Ù° Ù†ÙŽÙÙ’Ø³ÙÙ‡Ù Ø¨ÙŽØµÙÙŠØ±ÙŽØ©ÙŒ',
  transliteration: "Balil-insanu 'ala nafsihi basira",
  translation: 'Rather, man, against himself, will be a witness,',
  source: 'Al-Qiyamah 75:14',
  edition: 'en-sahih-international',
};

const _4_29 = {
  arabic: 'ÙŠÙŽØ§ Ø£ÙŽÙŠÙÙ‘Ù‡ÙŽØ§ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠÙ†ÙŽ Ø¢Ù…ÙŽÙ†ÙÙˆØ§ Ù„ÙŽØ§ ØªÙŽØ£Ù’ÙƒÙÙ„ÙÙˆØ§ Ø£ÙŽÙ…Ù’ÙˆÙŽØ§Ù„ÙŽÙƒÙÙ… Ø¨ÙŽÙŠÙ’Ù†ÙŽÙƒÙÙ… Ø¨ÙØ§Ù„Ù’Ø¨ÙŽØ§Ø·ÙÙ„Ù Ø¥ÙÙ„ÙŽÙ‘Ø§ Ø£ÙŽÙ† ØªÙŽÙƒÙÙˆÙ†ÙŽ ØªÙØ¬ÙŽØ§Ø±ÙŽØ©Ù‹ Ø¹ÙŽÙ† ØªÙŽØ±ÙŽØ§Ø¶Ù Ù…ÙÙ‘Ù†ÙƒÙÙ…Ù’ Ûš ÙˆÙŽÙ„ÙŽØ§ ØªÙŽÙ‚Ù’ØªÙÙ„ÙÙˆØ§ Ø£ÙŽÙ†ÙÙØ³ÙŽÙƒÙÙ…Ù’ Ûš Ø¥ÙÙ†ÙŽÙ‘ Ø§Ù„Ù„ÙŽÙ‘Ù‡ÙŽ ÙƒÙŽØ§Ù†ÙŽ Ø¨ÙÙƒÙÙ…Ù’ Ø±ÙŽØ­ÙÙŠÙ…Ù‹Ø§',
  transliteration: "Ya ayyuhal-ladhina amanu la ta'kulu amwalakum baynakum bil-batili illa an takuna tijaratan 'an taradinminkum. Wa la taqtulu anfusakum. Innallaha kana bikum rahima",
  translation: 'O you who have believed, do not consume one another\'s wealth unjustly but only [in lawful] business by mutual consent. And do not kill yourselves [or one another]. Indeed, AllÄh is to you ever Merciful.',
  source: 'An-Nisa 4:29',
  edition: 'en-sahih-international',
};

const _7_31 = {
  arabic: 'ÙŠÙŽØ§ Ø¨ÙŽÙ†ÙÙŠ Ø¢Ø¯ÙŽÙ…ÙŽ Ø®ÙØ°ÙÙˆØ§ Ø²ÙÙŠÙ†ÙŽØªÙŽÙƒÙÙ…Ù’ Ø¹ÙÙ†Ø¯ÙŽ ÙƒÙÙ„ÙÙ‘ Ù…ÙŽØ³Ù’Ø¬ÙØ¯Ù ÙˆÙŽÙƒÙÙ„ÙÙˆØ§ ÙˆÙŽØ§Ø´Ù’Ø±ÙŽØ¨ÙÙˆØ§ ÙˆÙŽÙ„ÙŽØ§ ØªÙØ³Ù’Ø±ÙÙÙÙˆØ§ Ûš Ø¥ÙÙ†ÙŽÙ‘Ù‡Ù Ù„ÙŽØ§ ÙŠÙØ­ÙØ¨ÙÙ‘ Ø§Ù„Ù’Ù…ÙØ³Ù’Ø±ÙÙÙÙŠÙ†ÙŽ',
  transliteration: "Ya bani adama khudhu zinatakum 'inda kulli masjidin wa kulu washrabu wa la tusrifu. Innahu la yuhibbul-musrifin",
  translation: 'O children of Adam, take your adornment at every masjid, and eat and drink, but be not excessive. Indeed, He likes not those who commit excess.',
  source: "Al-A'raf 7:31",
  edition: 'en-sahih-international',
};

const _5_87 = {
  arabic: 'ÙŠÙŽØ§ Ø£ÙŽÙŠÙÙ‘Ù‡ÙŽØ§ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠÙ†ÙŽ Ø¢Ù…ÙŽÙ†ÙÙˆØ§ Ù„ÙŽØ§ ØªÙØ­ÙŽØ±ÙÙ‘Ù…ÙÙˆØ§ Ø·ÙŽÙŠÙÙ‘Ø¨ÙŽØ§ØªÙ Ù…ÙŽØ§ Ø£ÙŽØ­ÙŽÙ„ÙŽÙ‘ Ø§Ù„Ù„ÙŽÙ‘Ù‡Ù Ù„ÙŽÙƒÙÙ…Ù’ ÙˆÙŽÙ„ÙŽØ§ ØªÙŽØ¹Ù’ØªÙŽØ¯ÙÙˆØ§ Ûš Ø¥ÙÙ†ÙŽÙ‘ Ø§Ù„Ù„ÙŽÙ‘Ù‡ÙŽ Ù„ÙŽØ§ ÙŠÙØ­ÙØ¨ÙÙ‘ Ø§Ù„Ù’Ù…ÙØ¹Ù’ØªÙŽØ¯ÙÙŠÙ†ÙŽ',
  transliteration: "Ya ayyuhal-ladhina amanu la tuharrimu tayyibati ma ahallallahu lakum wa la ta'tadu. Innallaha la yuhibbul-mu'tadin",
  translation: 'O you who have believed, do not prohibit the good things which AllÄh has made lawful to you and do not transgress. Indeed, AllÄh does not like transgressors.',
  source: "Al-Ma'idah 5:87",
  edition: 'en-sahih-international',
};

const _91_7 = {
  arabic: 'ÙˆÙŽÙ†ÙŽÙÙ’Ø³Ù ÙˆÙŽÙ…ÙŽØ§ Ø³ÙŽÙˆÙŽÙ‘Ø§Ù‡ÙŽØ§',
  transliteration: "Wa nafsin wa ma sawwaha",
  translation: 'And [by] the soul and He who proportioned it',
  source: 'Ash-Shams 91:7',
  edition: 'en-sahih-international',
};

const _66_6 = {
  arabic: 'ÙŠÙŽØ§ Ø£ÙŽÙŠÙÙ‘Ù‡ÙŽØ§ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠÙ†ÙŽ Ø¢Ù…ÙŽÙ†ÙÙˆØ§ Ù‚ÙÙˆØ§ Ø£ÙŽÙ†ÙÙØ³ÙŽÙƒÙÙ…Ù’ ÙˆÙŽØ£ÙŽÙ‡Ù’Ù„ÙÙŠÙƒÙÙ…Ù’ Ù†ÙŽØ§Ø±Ù‹Ø§ ÙˆÙŽÙ‚ÙÙˆØ¯ÙÙ‡ÙŽØ§ Ø§Ù„Ù†ÙŽÙ‘Ø§Ø³Ù ÙˆÙŽØ§Ù„Ù’Ø­ÙØ¬ÙŽØ§Ø±ÙŽØ©Ù Ø¹ÙŽÙ„ÙŽÙŠÙ’Ù‡ÙŽØ§ Ù…ÙŽÙ„ÙŽØ§Ø¦ÙÙƒÙŽØ©ÙŒ ØºÙÙ„ÙŽØ§Ø¸ÙŒ Ø´ÙØ¯ÙŽØ§Ø¯ÙŒ Ù„ÙŽÙ‘Ø§ ÙŠÙŽØ¹Ù’ØµÙÙˆÙ†ÙŽ Ø§Ù„Ù„ÙŽÙ‘Ù‡ÙŽ Ù…ÙŽØ§ Ø£ÙŽÙ…ÙŽØ±ÙŽÙ‡ÙÙ…Ù’ ÙˆÙŽÙŠÙŽÙÙ’Ø¹ÙŽÙ„ÙÙˆÙ†ÙŽ Ù…ÙŽØ§ ÙŠÙØ¤Ù’Ù…ÙŽØ±ÙÙˆÙ†ÙŽ',
  transliteration: "Ya ayyuhal-ladhina amanu qu anfusakum wa ahlikum naran waquduha an-nasu wal-hijarah 'alayha mala'ikatun ghilathun shidadun la ya'sunallaha ma amarahum wa yaf'aluna ma yu'marun",
  translation: 'O you who have believed, protect yourselves and your families from a Fire whose fuel is people and stones, over which are [appointed] angels, harsh and severe; they do not disobey AllÄh in what He commands them but do what they are commanded.',
  source: 'At-Tahrim 66:6',
  edition: 'en-sahih-international',
};

const _4_36 = {
  arabic: 'ÙˆÙŽØ§Ø¹Ù’Ø¨ÙØ¯ÙÙˆØ§ Ø§Ù„Ù„ÙŽÙ‘Ù‡ÙŽ ÙˆÙŽÙ„ÙŽØ§ ØªÙØ´Ù’Ø±ÙÙƒÙÙˆØ§ Ø¨ÙÙ‡Ù Ø´ÙŽÙŠÙ’Ø¦Ù‹Ø§ Û– ÙˆÙŽØ¨ÙØ§Ù„Ù’ÙˆÙŽØ§Ù„ÙØ¯ÙŽÙŠÙ’Ù†Ù Ø¥ÙØ­Ù’Ø³ÙŽØ§Ù†Ù‹Ø§ ÙˆÙŽØ¨ÙØ°ÙÙŠ Ø§Ù„Ù’Ù‚ÙØ±Ù’Ø¨ÙŽÙ‰Ù° ÙˆÙŽØ§Ù„Ù’ÙŠÙŽØªÙŽØ§Ù…ÙŽÙ‰Ù° ÙˆÙŽØ§Ù„Ù’Ù…ÙŽØ³ÙŽØ§ÙƒÙÙŠÙ†Ù ÙˆÙŽØ§Ù„Ù’Ø¬ÙŽØ§Ø±Ù Ø°ÙÙŠ Ø§Ù„Ù’Ù‚ÙØ±Ù’Ø¨ÙŽÙ‰Ù° ÙˆÙŽØ§Ù„Ù’Ø¬ÙŽØ§Ø±Ù Ø§Ù„Ù’Ø¬ÙÙ†ÙØ¨Ù ÙˆÙŽØ§Ù„ØµÙŽÙ‘Ø§Ø­ÙØ¨Ù Ø¨ÙØ§Ù„Ù’Ø¬ÙŽÙ†Ø¨Ù ÙˆÙŽØ§Ø¨Ù’Ù†Ù Ø§Ù„Ø³ÙŽÙ‘Ø¨ÙÙŠÙ„Ù ÙˆÙŽÙ…ÙŽØ§ Ù…ÙŽÙ„ÙŽÙƒÙŽØªÙ’ Ø£ÙŽÙŠÙ’Ù…ÙŽØ§Ù†ÙÙƒÙÙ…Ù’ Û— Ø¥ÙÙ†ÙŽÙ‘ Ø§Ù„Ù„ÙŽÙ‘Ù‡ÙŽ Ù„ÙŽØ§ ÙŠÙØ­ÙØ¨ÙÙ‘ Ù…ÙŽÙ† ÙƒÙŽØ§Ù†ÙŽ Ù…ÙØ®Ù’ØªÙŽØ§Ù„Ù‹Ø§ ÙÙŽØ®ÙÙˆØ±Ù‹Ø§',
  transliteration: "Wa'budullaha wa la tushrikuu bihi shay'an. Wa bil-walidayni ihsanan wa bidhil-qurba wal-yatama wal-masakini wal-jari dhil-qurba wal-jaril-junubi was-sahibi bil-janbi wabnis-sabili wa ma malakat aymanukum. Innallaha la yuhibbu man kana mukhtalan fakhura",
  translation: 'Worship AllÄh and associate nothing with Him, and to parents do good, and to relatives, orphans, the needy, the near neighbor, the neighbor farther away, the companion at your side, the traveler, and those whom your right hands possess. Indeed, AllÄh does not like those who are self-deluding and boastful,',
  source: 'An-Nisa 4:36',
  edition: 'en-sahih-international',
};

const _4_1 = {
  arabic: 'ÙŠÙŽØ§ Ø£ÙŽÙŠÙÙ‘Ù‡ÙŽØ§ Ø§Ù„Ù†ÙŽÙ‘Ø§Ø³Ù Ø§ØªÙŽÙ‘Ù‚ÙÙˆØ§ Ø±ÙŽØ¨ÙŽÙ‘ÙƒÙÙ…Ù Ø§Ù„ÙŽÙ‘Ø°ÙÙŠ Ø®ÙŽÙ„ÙŽÙ‚ÙŽÙƒÙÙ… Ù…ÙÙ‘Ù† Ù†ÙŽÙ‘ÙÙ’Ø³Ù ÙˆÙŽØ§Ø­ÙØ¯ÙŽØ©Ù ÙˆÙŽØ®ÙŽÙ„ÙŽÙ‚ÙŽ Ù…ÙÙ†Ù’Ù‡ÙŽØ§ Ø²ÙŽÙˆÙ’Ø¬ÙŽÙ‡ÙŽØ§ ÙˆÙŽØ¨ÙŽØ«ÙŽÙ‘ Ù…ÙÙ†Ù’Ù‡ÙÙ…ÙŽØ§ Ø±ÙØ¬ÙŽØ§Ù„Ù‹Ø§ ÙƒÙŽØ«ÙÙŠØ±Ù‹Ø§ ÙˆÙŽÙ†ÙØ³ÙŽØ§Ø¡Ù‹ Ûš ÙˆÙŽØ§ØªÙŽÙ‘Ù‚ÙÙˆØ§ Ø§Ù„Ù„ÙŽÙ‘Ù‡ÙŽ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠ ØªÙŽØ³ÙŽØ§Ø¡ÙŽÙ„ÙÙˆÙ†ÙŽ Ø¨ÙÙ‡Ù ÙˆÙŽØ§Ù„Ù’Ø£ÙŽØ±Ù’Ø­ÙŽØ§Ù…ÙŽ Ûš Ø¥ÙÙ†ÙŽÙ‘ Ø§Ù„Ù„ÙŽÙ‘Ù‡ÙŽ ÙƒÙŽØ§Ù†ÙŽ Ø¹ÙŽÙ„ÙŽÙŠÙ’ÙƒÙÙ…Ù’ Ø±ÙŽÙ‚ÙÙŠØ¨Ù‹Ø§',
  transliteration: "Ya ayyuhan-nasu ittaqu rabbakumul-ladhi khalaqakum min nafsin wahidatin wa khalaqa minha zawjaha wa baththa minhuma rijalan kathiran wa nisa'. Wattaqullahul-ladhi tasa'aluna bihi wal-arham. Innallaha kana 'alaykum raqiba",
  translation: 'O mankind, fear your Lord, who created you from one soul and created from it its mate and dispersed from both of them many men and women. And fear AllÄh, through whom you ask one another, and the wombs. Indeed AllÄh is ever, over you, an Observer.',
  source: 'An-Nisa 4:1',
  edition: 'en-sahih-international',
};

const _2_233 = {
  arabic: 'ÙˆÙŽØ§Ù„Ù’ÙˆÙŽØ§Ù„ÙØ¯ÙŽØ§ØªÙ ÙŠÙØ±Ù’Ø¶ÙØ¹Ù’Ù†ÙŽ Ø£ÙŽÙˆÙ’Ù„ÙŽØ§Ø¯ÙŽÙ‡ÙÙ†ÙŽÙ‘ Ø­ÙŽÙˆÙ’Ù„ÙŽÙŠÙ’Ù†Ù ÙƒÙŽØ§Ù…ÙÙ„ÙŽÙŠÙ’Ù†Ù Û– Ù„ÙÙ…ÙŽÙ†Ù’ Ø£ÙŽØ±ÙŽØ§Ø¯ÙŽ Ø£ÙŽÙ† ÙŠÙØªÙÙ…ÙŽÙ‘ Ø§Ù„Ø±ÙŽÙ‘Ø¶ÙŽØ§Ø¹ÙŽØ©ÙŽ Ûš ÙˆÙŽØ¹ÙŽÙ„ÙŽÙ‰ Ø§Ù„Ù’Ù…ÙŽÙˆÙ’Ù„ÙÙˆØ¯Ù Ù„ÙŽÙ‡Ù Ø±ÙØ²Ù’Ù‚ÙÙ‡ÙÙ†ÙŽÙ‘ ÙˆÙŽÙƒÙØ³Ù’ÙˆÙŽØªÙÙ‡ÙÙ†ÙŽÙ‘ Ø¨ÙØ§Ù„Ù’Ù…ÙŽØ¹Ù’Ø±ÙÙˆÙÙ Ûš Ù„ÙŽØ§ ØªÙÙƒÙŽÙ„ÙŽÙ‘ÙÙ Ù†ÙŽÙÙ’Ø³ÙŒ Ø¥ÙÙ„ÙŽÙ‘Ø§ ÙˆÙØ³Ù’Ø¹ÙŽÙ‡ÙŽØ§ Ûš Ù„ÙŽØ§ ØªÙØ¶ÙŽØ§Ø±ÙŽÙ‘ ÙˆÙŽØ§Ù„ÙØ¯ÙŽØ©ÙŒ Ø¨ÙÙˆÙŽÙ„ÙŽØ¯ÙÙ‡ÙŽØ§ ÙˆÙŽÙ„ÙŽØ§ Ù…ÙŽÙˆÙ’Ù„ÙÙˆØ¯ÙŒ Ù„ÙŽÙ‘Ù‡Ù Ø¨ÙÙˆÙŽÙ„ÙŽØ¯ÙÙ‡Ù Ûš ÙˆÙŽØ¹ÙŽÙ„ÙŽÙ‰ Ø§Ù„Ù’ÙˆÙŽØ§Ø±ÙØ«Ù Ù…ÙØ«Ù’Ù„Ù Ø°ÙŽÙ°Ù„ÙÙƒÙŽ',
  transliteration: "Wal-walidatu yurdi'na awladahunna hawlayni kamilayni liman arada an yutimmar-rada'ah. Wa 'alal-mawludi lahu rizquhunna wa kiswatuhunna bil-ma'ruf. La tukallafu nafsun illa wus'aha. La tudarra walidatun biwaladihaa wa la mawludun lahu biwaladih. Wa 'alal-warithi mithl dhalik",
  translation: 'Mothers may nurse their children two complete years for whoever wishes to complete the nursing period. Upon the father is their provision and their clothing according to what is acceptable. No person is charged with more than his capacity. No mother should be harmed through her child, and no father through his child. And upon the [father\'s] heir is [a duty] like that [of the father].',
  source: 'Al-Baqarah 2:233',
  edition: 'en-sahih-international',
};

const _17_26 = {
  arabic: 'ÙˆÙŽØ¢ØªÙ Ø°ÙŽØ§ Ø§Ù„Ù’Ù‚ÙØ±Ù’Ø¨ÙŽÙ‰Ù° Ø­ÙŽÙ‚ÙŽÙ‘Ù‡Ù ÙˆÙŽØ§Ù„Ù’Ù…ÙØ³Ù’ÙƒÙÙŠÙ†ÙŽ ÙˆÙŽØ§Ø¨Ù’Ù†ÙŽ Ø§Ù„Ø³ÙŽÙ‘Ø¨ÙÙŠÙ„Ù ÙˆÙŽÙ„ÙŽØ§ ØªÙØ¨ÙŽØ°ÙÙ‘Ø±Ù’ ØªÙŽØ¨Ù’Ø°ÙÙŠØ±Ù‹Ø§',
  transliteration: "Wa'ati dhal-qurba haqqahu wal-miskina wabnas-sabili wa la tubadhhir tabdhira",
  translation: 'And give the relative his right, and [also] the poor and the traveler, and do not spend wastefully.',
  source: 'Al-Isra 17:26',
  edition: 'en-sahih-international',
};

const _6_103 = {
  arabic: 'Ù„ÙŽÙ‘Ø§ ØªÙØ¯Ù’Ø±ÙÙƒÙÙ‡Ù Ø§Ù„Ù’Ø£ÙŽØ¨Ù’ØµÙŽØ§Ø±Ù ÙˆÙŽÙ‡ÙÙˆÙŽ ÙŠÙØ¯Ù’Ø±ÙÙƒÙ Ø§Ù„Ù’Ø£ÙŽØ¨Ù’ØµÙŽØ§Ø±ÙŽ Û– ÙˆÙŽÙ‡ÙÙˆÙŽ Ø§Ù„Ù„ÙŽÙ‘Ø·ÙÙŠÙÙ Ø§Ù„Ù’Ø®ÙŽØ¨ÙÙŠØ±Ù',
  transliteration: "La tudrikuhul-absaru wa huwa yudrikul-absar. Wa huwal-latiful-khabir",
  translation: 'Vision perceives Him not, but He perceives [all] vision; and He is the Subtle, the Aware.',
  source: "Al-An'am 6:103",
  edition: 'en-sahih-international',
};

const _67_14 = {
  arabic: 'Ø£ÙŽÙ„ÙŽØ§ ÙŠÙŽØ¹Ù’Ù„ÙŽÙ…Ù Ù…ÙŽÙ†Ù’ Ø®ÙŽÙ„ÙŽÙ‚ÙŽ ÙˆÙŽÙ‡ÙÙˆÙŽ Ø§Ù„Ù„ÙŽÙ‘Ø·ÙÙŠÙÙ Ø§Ù„Ù’Ø®ÙŽØ¨ÙÙŠØ±Ù',
  transliteration: "Ala ya'lamu man khalaqa wa huwal-latiful-khabir",
  translation: 'Does He who created not know, while He is the Subtle, the Aware?',
  source: 'Al-Mulk 67:14',
  edition: 'en-sahih-international',
};

const _31_16 = {
  arabic: 'ÙŠÙŽØ§ Ø¨ÙÙ†ÙŽÙŠÙŽÙ‘ Ø¥ÙÙ†ÙŽÙ‘Ù‡ÙŽØ§ Ø¥ÙÙ† ØªÙŽÙƒÙ Ù…ÙØ«Ù’Ù‚ÙŽØ§Ù„ÙŽ Ø­ÙŽØ¨ÙŽÙ‘Ø©Ù Ù…ÙÙ‘Ù†Ù’ Ø®ÙŽØ±Ù’Ø¯ÙŽÙ„Ù ÙÙŽØªÙŽÙƒÙÙ† ÙÙÙŠ ØµÙŽØ®Ù’Ø±ÙŽØ©Ù Ø£ÙŽÙˆÙ’ ÙÙÙŠ Ø§Ù„Ø³ÙŽÙ‘Ù…ÙŽØ§ÙˆÙŽØ§ØªÙ Ø£ÙŽÙˆÙ’ ÙÙÙŠ Ø§Ù„Ù’Ø£ÙŽØ±Ù’Ø¶Ù ÙŠÙŽØ£Ù’ØªÙ Ø¨ÙÙ‡ÙŽØ§ Ø§Ù„Ù„ÙŽÙ‘Ù‡Ù Ûš Ø¥ÙÙ†ÙŽÙ‘ Ø§Ù„Ù„ÙŽÙ‘Ù‡ÙŽ Ù„ÙŽØ·ÙÙŠÙÙŒ Ø®ÙŽØ¨ÙÙŠØ±ÙŒ',
  transliteration: "Ya bunayya innaha in taku mithqala habbatin min khardalin fatakun fi sakhrating aw fis-samawati aw fil-ardi ya'ti bihallah. Innallaha latifun khabir",
  translation: '[And LuqmÄn said], "O my son, indeed if it should be the weight of a mustard seed and should be within a rock or [anywhere] in the heavens or in the earth, AllÄh will bring it forth. Indeed, AllÄh is Subtle and Aware."',
  source: 'Luqman 31:16',
  edition: 'en-sahih-international',
};

const _12_100 = {
  arabic: 'Ø¥ÙÙ†ÙŽÙ‘ Ø±ÙŽØ¨ÙÙ‘ÙŠ Ù„ÙŽØ·ÙÙŠÙÙŒ Ù„ÙÙ‘Ù…ÙŽØ§ ÙŠÙŽØ´ÙŽØ§Ø¡Ù Ûš Ø¥ÙÙ†ÙŽÙ‘Ù‡Ù Ù‡ÙÙˆÙŽ Ø§Ù„Ù’Ø¹ÙŽÙ„ÙÙŠÙ…Ù Ø§Ù„Ù’Ø­ÙŽÙƒÙÙŠÙ…Ù',
  transliteration: "Inna rabbi latifun lima yasha'. Innahu huwal-'alimul-hakim",
  translation: 'Indeed, my Lord is Subtle in what He wills. Indeed, it is He who is the Knowing, the Wise.',
  source: 'Yusuf 12:100',
  edition: 'en-sahih-international',
};

const _39_9 = {
  arabic: 'Ø£ÙŽÙ…ÙŽÙ‘Ù†Ù’ Ù‡ÙÙˆÙŽ Ù‚ÙŽØ§Ù†ÙØªÙŒ Ø¢Ù†ÙŽØ§Ø¡ÙŽ Ø§Ù„Ù„ÙŽÙ‘ÙŠÙ’Ù„Ù Ø³ÙŽØ§Ø¬ÙØ¯Ù‹Ø§ ÙˆÙŽÙ‚ÙŽØ§Ø¦ÙÙ…Ù‹Ø§ ÙŠÙŽØ­Ù’Ø°ÙŽØ±Ù Ø§Ù„Ù’Ø¢Ø®ÙØ±ÙŽØ©ÙŽ ÙˆÙŽÙŠÙŽØ±Ù’Ø¬ÙÙˆ Ø±ÙŽØ­Ù’Ù…ÙŽØ©ÙŽ Ø±ÙŽØ¨ÙÙ‘Ù‡Ù Û— Ù‚ÙÙ„Ù’ Ù‡ÙŽÙ„Ù’ ÙŠÙŽØ³Ù’ØªÙŽÙˆÙÙŠ Ø§Ù„ÙŽÙ‘Ø°ÙÙŠÙ†ÙŽ ÙŠÙŽØ¹Ù’Ù„ÙŽÙ…ÙÙˆÙ†ÙŽ ÙˆÙŽØ§Ù„ÙŽÙ‘Ø°ÙÙŠÙ†ÙŽ Ù„ÙŽØ§ ÙŠÙŽØ¹Ù’Ù„ÙŽÙ…ÙÙˆÙ†ÙŽ Û— Ø¥ÙÙ†ÙŽÙ‘Ù…ÙŽØ§ ÙŠÙŽØªÙŽØ°ÙŽÙƒÙŽÙ‘Ø±Ù Ø£ÙÙˆÙ„ÙÙˆ Ø§Ù„Ù’Ø£ÙŽÙ„Ù’Ø¨ÙŽØ§Ø¨Ù',
  transliteration: "Amman huwa qanitun ana'al-layli sajidan wa qa'iman yadharul-akhirata wa yarju rahmata rabbih. Qul hal yastawi alladhina ya'lamuna walladhina la ya'lamun. Innama yatadhakkaru ulul-albab",
  translation: 'Is one who is devoutly obedient during periods of the night, prostrating and standing [in prayer], fearing the Hereafter and hoping for the mercy of his Lord, [like one who does not]? Say, "Are those who know equal to those who do not know?" Only they will remember [who are] people of understanding.',
  source: 'Az-Zumar 39:9',
  edition: 'en-sahih-international',
};

// â”€â”€â”€ Readiness Ayat Matrix â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export const READINESS_AYAT_HEALTH = {

  // â•â•â• ALL YES â€” proceed â•â•â•
  '111111': null,

  // â•â•â• ONE NOT YET (1 zero) â€” single gap â•â•â•

  // Q1=0 only: depletion not named, all else present
  '011111': { ..._4_28,
    framing: 'I am carrying reserves I have not acknowledged â€” He already knows, and lightens.' },

  // Q2=0 only: managing through difficulty without meeting it honestly
  '101111': { ..._16_127,
    framing: 'I am getting past difficulty rather than meeting it â€” patience itself is only through Him.' },

  // Q3=0 only: running on discipline, not drawing from replenishment
  '110111': { ..._28_73,
    framing: 'I am expending without resting â€” He built the night itself as a mercy for restoration.' },

  // L1=0 only: attentiveness absent, habit leading instead of presence
  '111011': { ..._50_37,
    framing: 'I am proceeding without checking what I actually need â€” a present heart can still hear.' },

  // L2=0 only: overriding body/heart signals for productivity
  '111101': { ..._75_14,
    framing: 'I am overriding the signal â€” I am my own witness, and I already know what is true.' },

  // L3=0 only: those in my care getting what remains, not what is due
  '111110': { ..._66_6,
    framing: 'I am giving those I love what is left â€” they are my first trust, not my last.' },

  // â•â•â• TWO NOT YET (2 zeros) â€” paired gaps â•â•â•

  // Qâ€“Q pairs (both gaps within Al-Qawi)

  '001111': { ..._30_54,
    framing: 'I have not named my depletion or met what is hard â€” He created both weakness and strength.' },

  '010111': { ..._2_153,
    framing: 'I am managing through and drawing from an empty source â€” He is with the patient.' },

  '011011': { ..._4_28,
    framing: 'I carry unnamed exhaustion while proceeding on habit â€” He wants to lighten for me.' },

  '011101': { ..._2_286,
    framing: 'My foundation is unattended and I am overriding signals â€” He charges no soul beyond its capacity.' },

  '011110': { ..._2_155,
    framing: 'I am unaware of my depletion yet the hardship is real â€” good tidings await the patient.' },

  '100111': { ..._3_200,
    framing: 'I am not meeting the difficulty honestly nor replenishing â€” persevere, endure, and fear Allah.' },

  '101011': { ..._94_5,
    framing: 'I am managing through and proceeding on habit â€” with every hardship, ease is already present.' },

  '101101': { ..._75_14,
    framing: 'I manage through difficulty and override the signal â€” I am already a witness against myself.' },

  '101110': { ..._16_127,
    framing: 'I am managing through and giving those close to me what remains â€” patience is only through Allah.' },

  '110011': { ..._28_73,
    framing: 'I am not replenishing and proceed on habit â€” He made rest a mercy, not a luxury.' },

  '110101': { ..._5_87,
    framing: 'I am running on empty and overriding what I feel â€” do not make unlawful what He has allowed.' },

  '110110': { ..._4_36,
    framing: 'I am depleted and giving close ones only what remains â€” ihsan begins closest to home.' },

  '111001': { ..._50_22,
    framing: 'I am proceeding on habit without checking signals â€” one day the cover will be removed.' },

  '111010': { ..._7_31,
    framing: 'I am heedless of need and overriding what I feel â€” eat, drink, and do not be excessive.' },

  '111100': { ..._66_6,
    framing: 'I am present for everything except those I love most â€” they are the first trust to protect.' },

  // â•â•â• THREE NOT YET (3 zeros) â€” deeper gaps â•â•â•

  // 0Q + 3L (all Al-Latif gaps, all Al-Qawi present) â€” CORNER
  // Theological pole: strength sustained; attentiveness entirely absent â†’ Al-Laá¹­Ä«f
  '111000': { ..._67_14,
    framing: 'My outer conditions are strong but I am absent within â€” does He who created not know?' },

  // 3Q + 0L (all Al-Qawi gaps, all Al-Latif present)
  '000111': { ..._30_54,
    framing: 'My foundation, honesty about hardship, and replenishment are all absent â€” I was made from weakness.' },

  '001011': { ..._2_286,
    framing: 'I name no depletion, manage through difficulty, and proceed on habit â€” He charges no soul beyond capacity.' },

  '001101': { ..._4_28,
    framing: 'I run on unnamed reserves, bypass difficulty, and override signals â€” He wants to lighten for me.' },

  '001110': { ..._2_155,
    framing: 'I carry unacknowledged depletion, bypass difficulty, and neglect those close â€” give tidings to the patient.' },

  '010011': { ..._3_200,
    framing: 'I bypass difficulty, run on empty, and proceed on habit â€” persevere, endure, remain stationed.' },

  '010101': { ..._94_5,
    framing: 'I bypass difficulty, run on empty, and override signals â€” with hardship, ease is already alongside.' },

  '010110': { ..._2_153,
    framing: 'I manage through difficulty, draw nothing, and give those close what remains â€” seek help through patience.' },

  '011001': { ..._59_18,
    framing: 'My foundation is unattended and I proceed heedlessly â€” let every soul look to what it has sent forward.' },

  '011010': { ..._7_31,
    framing: 'I carry unnamed depletion, proceed on habit, and override signals â€” eat, drink, do not be excessive.' },

  '011100': { ..._4_1,
    framing: 'My reserves are unnamed and I give close ones only the remains â€” the wombs have a claim upon you.' },

  '100011': { ..._8_66,
    framing: 'I manage through hardship, run on nothing, and proceed on habit â€” He already knows the weakness.' },

  '100101': { ..._75_14,
    framing: 'I meet no hardship directly, rest nothing, and ignore my signals â€” I am already a witness against myself.' },

  '100110': { ..._17_26,
    framing: 'I bypass hardship, draw from nothing, and give kin only what is left â€” give the relative his right.' },

  '101001': { ..._50_22,
    framing: 'I manage through difficulty and proceed on habit â€” the cover will be removed; see now while there is time.' },

  '101010': { ..._7_205,
    framing: 'I manage through, draw nothing, and override signals â€” do not be among the heedless.' },

  '101100': { ..._66_6,
    framing: 'I manage through, draw from nothing, and give close ones the remainder â€” protect your family as a trust.' },

  '110001': { ..._50_37,
    framing: 'I am depleted, proceed on habit, and give close ones what remains â€” a present heart can still listen.' },

  '110010': { ..._5_87,
    framing: 'I run on discipline, not replenishment, and override the signal â€” do not forbid what He has permitted.' },

  '110100': { ..._2_233,
    framing: 'I am depleted, overriding signals, and giving family only what is left â€” no person is charged beyond capacity.' },

  // â•â•â• FOUR NOT YET (4 zeros) â•â•â•

  '000011': { ..._30_54,
    framing: 'Three foundations of vitality are absent yet I am still attending â€” He cycles from weakness to strength.' },

  '000101': { ..._2_286,
    framing: 'My three Al-Qawi conditions are absent and I override the signal â€” burden no soul beyond its capacity.' },

  '000110': { ..._4_36,
    framing: 'My three Al-Qawi conditions are absent and I neglect those nearest â€” ihsan is owed to those closest first.' },

  '001001': { ..._59_18,
    framing: 'I carry unnamed depletion, bypass difficulty, and proceed heedlessly â€” look to what the soul has sent forward.' },

  '001010': { ..._4_29,
    framing: 'I carry unnamed depletion, bypass difficulty, and override the signal â€” do not wrong your own soul.' },

  '001100': { ..._4_1,
    framing: 'I carry unnamed depletion, bypass difficulty, and neglect those I love â€” the wombs have a right upon you.' },

  '010001': { ..._21_1,
    framing: 'I bypass honesty, draw nothing, and proceed unaware â€” accounts approach while we remain in heedlessness.' },

  '010010': { ..._3_200,
    framing: 'I manage through, draw nothing, and override signals â€” persevere, endure, remain stationed, fear Allah.' },

  '010100': { ..._2_233,
    framing: 'I bypass difficulty, draw nothing, and give family what remains â€” no soul is charged beyond its capacity.' },

  '011000': { ..._8_66,
    framing: 'My foundation is unattended, I give close ones the remains, and I proceed on habit â€” He knows the weakness.' },

  '100001': { ..._33_3,
    framing: 'I meet no hardship, rest nothing, and proceed, yet close ones receive me â€” rely upon Allah; He is sufficient.' },

  '100010': { ..._91_7,
    framing: 'I bypass hardship, draw nothing, and override my signal â€” He proportioned the soul and knows what it carries.' },

  '100100': { ..._17_26,
    framing: 'I bypass hardship, draw nothing, and give kin only leftovers â€” give the relative his right.' },

  '101000': { ..._12_100,
    framing: 'I manage through, give close ones what remains, and ignore signals â€” He is Subtle in what He wills.' },

  '110000': { ..._25_47,
    framing: 'I am depleted, absent, and giving close ones what is left â€” He made sleep rest and day a resurrection.' },

  // â•â•â• FIVE NOT YET (5 zeros) â•â•â•

  '000001': { ..._66_6,
    framing: 'Five conditions are absent â€” those in my care are still held; that one trust is the start.' },

  '000010': { ..._75_14,
    framing: 'Five conditions are absent â€” one signal still reaches me; I am my own witness.' },

  '000100': { ..._2_233,
    framing: 'Five conditions are absent â€” give what those in your care are due; that one right is already owed.' },

  '001000': { ..._30_23,
    framing: 'Five conditions are absent â€” He made sleep a sign; I need to become one who hears.' },

  '010000': { ..._94_5,
    framing: 'Five conditions are absent â€” even here, with this hardship, ease has already been placed alongside.' },

  '100000': { ..._2_155,
    framing: 'Five conditions are absent â€” hardship is the test; He has given good tidings to those who remain patient.' },

  // â•â•â• ALL NOT YET (0 zeros) â€” full depletion â•â•â•

  '000000': { ..._4_28,
    framing: 'Every condition is absent â€” He created me weak, and He wants to lighten; I need not pretend otherwise.' },

};

// â”€â”€â”€ Lookup Helper â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export function lookupReadinessAyah(key) {
  return READINESS_AYAT_HEALTH[key] || null;
}
