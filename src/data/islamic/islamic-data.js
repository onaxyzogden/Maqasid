// Islamic Governance Data — Module-centric adaptation of bbos-v4's stage-centric model
// Each module maps to 2 governing divine attributes, a dua, readiness check, and reflection

export const MODULE_ATTRS = {
  work: {
    attrs: [
      {
        name: 'Al-Muhsin',
        name_ar: 'المحسن',
        title: 'The Excellence-Giver',
        body: 'Excellence in work is worship. Al-Muhsin perfects rather than merely fulfils. Every task completed with ihsan carries a quality that transcends the specification — it is work done as though God sees it, because He does.',
      },
      {
        name: 'Al-Wakil',
        name_ar: 'الوكيل',
        title: 'The Trustee',
        body: 'The outcomes belong to Al-Wakil. You do the work with excellence; He determines what it produces. Trusting God with outcomes is not passivity — it is the freedom to work without anxiety about results.',
      },
    ],
    dua: {
      title: 'Before Beginning Work',
      resumeTitle: 'Before Resuming Work',
      arabic: 'وَتَوَكَّلْ عَلَى اللَّهِ ۚ وَكَفَىٰ بِاللَّهِ وَكِيلًا',
      trans: "Wa tawakkal ʿala Allāh, wa kafā bi-Allāhi wakīlā",
      meaning: 'And rely upon Allah; and sufficient is Allah as Disposer of affairs.',
      source: 'Surah Al-Ahzab 33:3',
    },
    closingDua: {
      title: 'After Completing Work',
      arabic: 'لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ',
      trans: "La-in shakartum la-azīdannakum",
      meaning: 'If you are grateful, I will surely increase you [in favor].',
      source: 'Surah Ibrahim 14:7',
    },
    readiness: {
      frame: 'Al-Muhsin asks: am I bringing ihsan to this work, or just getting it done?',
      yesLabel: 'I am bringing ihsan when',
      notYetLabel: 'I am just getting it done when',
      // Structured rows for interactive readiness check (6-bit binary key: M1 M2 M3 W1 W2 W3)
      rows: [
        {
          id: 'M1', attr: 'Al-Muhsin', attr_ar: 'الْمُحْسِن', attrTitle: 'The Excellence-Giver',
          attrFrame: 'Am I bringing ihsan to this work, or just getting it done?',
          yesLabel: 'I am bringing ihsan when',
          notYetLabel: 'I am just getting it done when',
          governing: 'I approach the next task with the intention of excellence, not just completion.',
          notYet: 'I am rushing through tasks to clear the board rather than doing each one well.',
        },
        {
          id: 'M2', attr: 'Al-Muhsin',
          governing: 'The quality of my work holds my focus — not just whether the task gets done.',
          notYet: 'The work feels like an obligation to discharge rather than an act to offer.',
        },
        {
          id: 'M3', attr: 'Al-Muhsin',
          governing: 'I would redo this if it fell short — from genuine care, not perfectionism.',
          notYet: 'I am doing the minimum that will pass, not the most genuinely possible right now.',
        },
        {
          id: 'W1', attr: 'Al-Wakil', attr_ar: 'الْوَكِيل', attrTitle: 'The Trustee',
          attrFrame: 'Am I at peace with the fact that the outcomes belong to Allah?',
          yesLabel: 'I am at peace with the outcomes when',
          notYetLabel: 'I am still gripping the outcomes when',
          governing: 'I have made my plan and am ready to trust Al-Wakil with the outcome.',
          notYet: 'Anxiety about results is driving my work more than devotion to the craft.',
        },
        {
          id: 'W2', attr: 'Al-Wakil',
          governing: 'The work is being offered as worship — the result is not the measure of the act.',
          notYet: 'I am distracted and have not yet settled into focused presence.',
        },
        {
          id: 'W3', attr: 'Al-Wakil',
          governing: 'I am present in this task, not braced against the outcome of the next.',
          notYet: 'The outcome carries so much weight I cannot yet be fully present to the work.',
        },
      ],
      // Flat arrays for backward compatibility with display-only ReadinessCheck
      governing: [
        'I approach the next task with the intention of excellence, not just completion.',
        'The quality of my work holds my focus — not just whether the task gets done.',
        'I would redo this if it fell short — from genuine care, not perfectionism.',
        'I have made my plan and am ready to trust Al-Wakil with the outcome.',
        'The work is being offered as worship — the result is not the measure of the act.',
        'I am present in this task, not braced against the outcome of the next.',
      ],
      notYet: [
        'I am rushing through tasks to clear the board rather than doing each one well.',
        'The work feels like an obligation to discharge rather than an act to offer.',
        'I am doing the minimum that will pass, not the most genuinely possible right now.',
        'Anxiety about results is driving my work more than devotion to the craft.',
        'I am distracted and have not yet settled into focused presence.',
        'The outcome carries so much weight I cannot yet be fully present to the work.',
      ],
    },
    reflection: {
      frame: 'Al-Muhsin witnessed the quality of today\'s work. Al-Wakil held the outcomes.',
      yesLabel: 'Ihsan was present today when',
      notYetLabel: 'Ihsan was absent today when',
      rows: [
        {
          id: 'RM1', attr: 'Al-Muhsin', attr_ar: '\u0627\u0644\u0652\u0645\u064F\u062D\u0652\u0633\u0650\u0646', attrTitle: 'The Excellence-Giver',
          attrFrame: 'Did ihsan show up in today\'s work?',
          yesLabel: 'Ihsan was present today when',
          notYetLabel: 'Ihsan was absent today when',
          governing: 'I can point to at least one task where I chose quality over speed.',
          notYet: 'I cut corners on something and justified it as efficiency.',
        },
        {
          id: 'RW1', attr: 'Al-Wakil', attr_ar: '\u0627\u0644\u0652\u0648\u064E\u0643\u0650\u064A\u0644', attrTitle: 'The Trustee',
          attrFrame: 'Did I release what belongs to Al-Wakil?',
          yesLabel: 'I released outcomes when',
          notYetLabel: 'I am still holding outcomes when',
          governing: 'I released attachment to an outcome that was not in my control.',
          notYet: 'I am still carrying anxiety about a result that belongs to Al-Wakil.',
        },
      ],
      governing: [
        'I can point to at least one task where I chose quality over speed.',
        'I released attachment to an outcome that was not in my control.',
      ],
      notYet: [
        'I cut corners on something and justified it as efficiency.',
        'I am still carrying anxiety about a result that belongs to Al-Wakil.',
      ],
    },
  },

  money: {
    attrs: [
      {
        name: 'Ar-Razzaq',
        name_ar: 'الرزّاق',
        title: 'The Provider',
        body: 'All provision comes from Ar-Razzaq. Financial stewardship means managing what He has entrusted, not hoarding what you fear losing. The believer earns with effort and trusts that sufficiency is already decreed.',
      },
      {
        name: 'Al-Hasib',
        name_ar: 'الحسيب',
        title: 'The Reckoner',
        body: 'Al-Hasib accounts for every transaction. Honest reckoning in finances is not just good practice — it is an act of worship. Every number must tell the truth, because He already knows the truth.',
      },
    ],
    dua: {
      title: 'Before Financial Decisions',
      resumeTitle: 'Before Resuming Financial Work',
      arabic: 'فَكُلُوا مِمَّا رَزَقَكُمُ اللَّهُ حَلَالًا طَيِّبًا ۚ وَاشْكُرُوا نِعْمَتَ اللَّهِ إِن كُنتُمْ إِيَّاهُ تَعْبُدُونَ',
      trans: "Fa-kulū mimmā razaqakumu Allāhu ḥalālan ṭayyibā, wa-shkurū niʿmata Allāhi in kuntum iyyāhu taʿbudūn",
      meaning: 'Then eat of what Allah has provided for you which is lawful and good. And be grateful for the favor of Allah, if it is indeed Him that you worship.',
      source: 'Surah An-Nahl 16:114',
    },
    closingDua: {
      title: 'After Financial Stewardship',
      arabic: 'وَإِن تَعُدُّوا نِعْمَةَ اللَّهِ لَا تُحْصُوهَا',
      trans: "Wa in ta\u02BFuddū ni\u02BFmata Allāhi lā tuḥṣūhā",
      meaning: 'And if you should count the favors of Allah, you could not enumerate them.',
      source: 'Surah An-Nahl 16:18',
    },
    readiness: {
      frame: 'Ar-Razzaq asks: am I managing His provision with honesty and gratitude?',
      yesLabel: 'I am stewarding with honesty when',
      notYetLabel: 'I am falling short of stewardship when',
      rows: [
        {
          id: 'R1', attr: 'Ar-Razzaq', attr_ar: 'الرزّاق', attrTitle: 'The Provider',
          attrFrame: 'Am I managing His provision with honesty and gratitude?',
          yesLabel: 'I am stewarding with honesty when',
          notYetLabel: 'I am falling short of stewardship when',
          governing: 'My financial records reflect reality — no inflated numbers, no hidden expenses.',
          notYet: 'I am delaying honest accounting because the numbers are uncomfortable.',
        },
        {
          id: 'R2', attr: 'Ar-Razzaq',
          governing: 'I am making decisions from sufficiency, not from scarcity or greed.',
          notYet: 'Financial anxiety is driving decisions that compromise my principles.',
        },
        {
          id: 'H1', attr: 'Al-Hasib', attr_ar: 'الحسيب', attrTitle: 'The Reckoner',
          attrFrame: 'Does every number I record tell the truth?',
          yesLabel: 'Every number tells the truth when',
          notYetLabel: 'The numbers are not yet truthful when',
          governing: 'Every transaction I record serves a purpose beyond just tracking money.',
          notYet: 'I am treating money as mine to keep rather than a trust to steward.',
        },
      ],
      governing: [
        'My financial records reflect reality — no inflated numbers, no hidden expenses.',
        'I am making decisions from sufficiency, not from scarcity or greed.',
        'Every transaction I record serves a purpose beyond just tracking money.',
      ],
      notYet: [
        'I am delaying honest accounting because the numbers are uncomfortable.',
        'Financial anxiety is driving decisions that compromise my principles.',
        'I am treating money as mine to keep rather than a trust to steward.',
      ],
    },
    reflection: {
      frame: 'Ar-Razzaq provided today\'s portion. Al-Hasib witnessed every transaction.',
      yesLabel: 'Honest stewardship was present when',
      notYetLabel: 'Stewardship fell short when',
      rows: [
        {
          id: 'RR1', attr: 'Ar-Razzaq', attr_ar: '\u0627\u0644\u0631\u0632\u0651\u0627\u0642', attrTitle: 'The Provider',
          attrFrame: 'Did I steward His provision with honesty today?',
          yesLabel: 'Honest stewardship was present when',
          notYetLabel: 'Stewardship fell short when',
          governing: 'My financial dealings today were transparent and honest.',
          notYet: 'I avoided looking at a financial reality that needs my attention.',
        },
        {
          id: 'RH1', attr: 'Al-Hasib', attr_ar: '\u0627\u0644\u062D\u0633\u064A\u0628', attrTitle: 'The Reckoner',
          attrFrame: 'Did every number tell the truth today?',
          yesLabel: 'Trust in provision was present when',
          notYetLabel: 'Fear of loss drove me when',
          governing: 'I made at least one decision from trust in provision rather than fear of loss.',
          notYet: 'I prioritized profit over principle in a decision today.',
        },
      ],
      governing: [
        'My financial dealings today were transparent and honest.',
        'I made at least one decision from trust in provision rather than fear of loss.',
      ],
      notYet: [
        'I avoided looking at a financial reality that needs my attention.',
        'I prioritized profit over principle in a decision today.',
      ],
    },
  },

  people: {
    attrs: [
      {
        name: 'Al-Wadud',
        name_ar: 'الودود',
        title: 'The Loving',
        body: 'Al-Wadud loves His creation with a love that precedes merit. Leading people with wadud means caring for their growth before their output, seeing their potential before their performance gaps.',
      },
      {
        name: 'Al-Adl',
        name_ar: 'العدل',
        title: 'The Just',
        body: 'Al-Adl establishes justice without partiality. Fair treatment of every team member — in compensation, recognition, and opportunity — is not generosity; it is the minimum standard of stewardship.',
      },
    ],
    dua: {
      title: 'Before Leading People',
      resumeTitle: 'Before Resuming Leadership',
      arabic: 'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي',
      trans: "Rabbi ishraḥ lī ṣadrī wa yassir lī amrī",
      meaning: 'My Lord, expand my chest and ease my task for me.',
      source: 'Surah Ta-Ha 20:25-26',
    },
    closingDua: {
      title: 'After Serving People',
      arabic: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا',
      trans: "Rabbanā hab lanā min azwājinā wa dhurriyyātinā qurrata aʿyunin wa-jʿalnā lil-muttaqīna imāmā",
      meaning: 'Our Lord, grant us from among our wives and offspring comfort to our eyes and make us a leader for the righteous.',
      source: 'Surah Al-Furqan 25:74',
    },
    readiness: {
      frame: 'Al-Wadud asks: am I leading with genuine care, or managing with control?',
      yesLabel: 'I am leading with genuine care when',
      notYetLabel: 'I am managing with control when',
      rows: [
        {
          id: 'W1', attr: 'Al-Wadud', attr_ar: 'الودود', attrTitle: 'The Loving',
          attrFrame: 'Am I leading with genuine care, or managing with control?',
          yesLabel: 'I am leading with genuine care when',
          notYetLabel: 'I am managing with control when',
          governing: 'I see each team member as a person first, a resource second.',
          notYet: 'I am avoiding a conversation because it is uncomfortable, not because the timing is wrong.',
        },
        {
          id: 'W2', attr: 'Al-Wadud',
          governing: 'I am ready to have a difficult conversation with compassion and honesty.',
          notYet: 'I have not checked in on someone who might be struggling.',
        },
        {
          id: 'A1', attr: 'Al-Adl', attr_ar: 'العدل', attrTitle: 'The Just',
          attrFrame: 'Are my decisions guided by fairness, or by favoritism?',
          yesLabel: 'Fairness guides me when',
          notYetLabel: 'Favoritism is creeping in when',
          governing: 'My decisions about people are guided by fairness, not favoritism.',
          notYet: 'I am treating someone differently based on how much I like them, not their merit.',
        },
      ],
      governing: [
        'I see each team member as a person first, a resource second.',
        'My decisions about people are guided by fairness, not favoritism.',
        'I am ready to have a difficult conversation with compassion and honesty.',
      ],
      notYet: [
        'I am avoiding a conversation because it is uncomfortable, not because the timing is wrong.',
        'I am treating someone differently based on how much I like them, not their merit.',
        'I have not checked in on someone who might be struggling.',
      ],
    },
    reflection: {
      frame: 'Al-Wadud witnessed how I treated His servants today. Al-Adl measured the fairness.',
      yesLabel: 'Genuine care was present when',
      notYetLabel: 'Care was absent when',
      rows: [
        {
          id: 'RW1', attr: 'Al-Wadud', attr_ar: '\u0627\u0644\u0648\u062F\u0648\u062F', attrTitle: 'The Loving',
          attrFrame: 'Did I lead with genuine care today?',
          yesLabel: 'Genuine care was present when',
          notYetLabel: 'Care was absent when',
          governing: 'I invested in someone\'s growth today beyond what their role required.',
          notYet: 'I overlooked someone who deserved recognition or attention.',
        },
        {
          id: 'RA1', attr: 'Al-Adl', attr_ar: '\u0627\u0644\u0639\u062F\u0644', attrTitle: 'The Just',
          attrFrame: 'Were my decisions guided by fairness today?',
          yesLabel: 'Fairness was present when',
          notYetLabel: 'Fairness was absent when',
          governing: 'I made a fair decision even when it was easier to play favorites.',
          notYet: 'I let a power dynamic go unchecked that disadvantages someone.',
        },
      ],
      governing: [
        'I invested in someone\'s growth today beyond what their role required.',
        'I made a fair decision even when it was easier to play favorites.',
      ],
      notYet: [
        'I overlooked someone who deserved recognition or attention.',
        'I let a power dynamic go unchecked that disadvantages someone.',
      ],
    },
  },

  office: {
    attrs: [
      {
        name: 'As-Sami',
        name_ar: 'السميع',
        title: 'The All-Hearing',
        body: 'As-Sami hears every word — spoken and unspoken. True communication begins with listening. Before you speak, write, or decide, have you truly heard what others are saying?',
      },
      {
        name: 'Al-Alim',
        name_ar: 'العليم',
        title: 'The All-Knowing',
        body: 'Al-Alim knows what is hidden and what is manifest. In organizational knowledge, this means documenting the truth, sharing information honestly, and never using knowledge as a tool of power over others.',
      },
    ],
    dua: {
      title: 'Before Communication',
      resumeTitle: 'Before Resuming Communication',
      arabic: 'رَبِّ زِدْنِي عِلْمًا',
      trans: "Rabbi zidnī ʿilmā",
      meaning: 'My Lord, increase me in knowledge.',
      source: 'Surah Ta-Ha 20:114',
    },
    closingDua: {
      title: 'After Communication',
      arabic: 'خَلَقَ الْإِنسَانَ ﴿٣﴾ عَلَّمَهُ الْبَيَانَ',
      trans: "Khalaqa al-insān. ʿAllamahu al-bayān",
      meaning: 'He created man. He taught him eloquence.',
      source: 'Surah Ar-Rahman 55:3-4',
    },
    readiness: {
      frame: 'As-Sami asks: am I truly listening, or just waiting for my turn to speak?',
      yesLabel: 'I am truly listening when',
      notYetLabel: 'I am just waiting to speak when',
      rows: [
        {
          id: 'S1', attr: 'As-Sami', attr_ar: 'السميع', attrTitle: 'The All-Hearing',
          attrFrame: 'Am I truly listening, or just waiting for my turn to speak?',
          yesLabel: 'I am truly listening when',
          notYetLabel: 'I am just waiting to speak when',
          governing: 'I am prepared to listen before responding in my next conversation.',
          notYet: 'I am preparing to speak without first understanding what others need.',
        },
        {
          id: 'S2', attr: 'As-Sami',
          governing: 'My communication today will build trust, not just transfer data.',
          notYet: 'My next message is driven by ego rather than service.',
        },
        {
          id: 'A1', attr: 'Al-Alim', attr_ar: 'العليم', attrTitle: 'The All-Knowing',
          attrFrame: 'Am I sharing knowledge honestly, or using it as a tool of power?',
          yesLabel: 'I am sharing honestly when',
          notYetLabel: 'I am withholding when',
          governing: 'The information I am about to share is accurate and serves others.',
          notYet: 'I am withholding information that others need to do their work.',
        },
      ],
      governing: [
        'I am prepared to listen before responding in my next conversation.',
        'The information I am about to share is accurate and serves others.',
        'My communication today will build trust, not just transfer data.',
      ],
      notYet: [
        'I am preparing to speak without first understanding what others need.',
        'I am withholding information that others need to do their work.',
        'My next message is driven by ego rather than service.',
      ],
    },
    reflection: {
      frame: 'As-Sami heard every word exchanged today. Al-Alim knows every intention behind them.',
      yesLabel: 'True listening was present when',
      notYetLabel: 'Listening was absent when',
      rows: [
        {
          id: 'RS1', attr: 'As-Sami', attr_ar: '\u0627\u0644\u0633\u0645\u064A\u0639', attrTitle: 'The All-Hearing',
          attrFrame: 'Did I truly listen today?',
          yesLabel: 'True listening was present when',
          notYetLabel: 'Listening was absent when',
          governing: 'I listened fully to someone before forming my response.',
          notYet: 'I interrupted or dismissed someone when they needed to be heard.',
        },
        {
          id: 'RA1', attr: 'Al-Alim', attr_ar: '\u0627\u0644\u0639\u0644\u064A\u0645', attrTitle: 'The All-Knowing',
          attrFrame: 'Did I share knowledge as a gift today?',
          yesLabel: 'Knowledge was shared generously when',
          notYetLabel: 'Knowledge was withheld when',
          governing: 'I shared knowledge generously and accurately today.',
          notYet: 'I used information as leverage rather than as a gift.',
        },
      ],
      governing: [
        'I listened fully to someone before forming my response.',
        'I shared knowledge generously and accurately today.',
      ],
      notYet: [
        'I interrupted or dismissed someone when they needed to be heard.',
        'I used information as leverage rather than as a gift.',
      ],
    },
  },

  tech: {
    attrs: [
      {
        name: 'Al-Muhaymin',
        name_ar: 'المهيمن',
        title: 'The Guardian',
        body: 'Al-Muhaymin watches over and protects. Technical stewardship means guarding systems, data, and infrastructure with the same vigilance — every security measure is an act of amanah over what has been entrusted to you.',
      },
      {
        name: 'Al-Hafiz',
        name_ar: 'الحفيظ',
        title: 'The Protector',
        body: 'Al-Hafiz preserves what matters. In technology, this means protecting user data, maintaining system integrity, and building with durability rather than disposability.',
      },
    ],
    dua: {
      title: 'Before Technical Work',
      resumeTitle: 'Before Resuming Technical Work',
      arabic: 'بَلِ اللَّهُ مَوْلَاكُمْ ۖ وَهُوَ خَيْرُ النَّاصِرِينَ',
      trans: "Bal Allāhu mawlākum, wa huwa khayru an-nāṣirīn",
      meaning: 'But Allah is your protector, and He is the best of helpers.',
      source: 'Surah Aal-Imran 3:150',
    },
    closingDua: {
      title: 'After Technical Work',
      arabic: 'هُوَ اللَّهُ الْخَالِقُ الْبَارِئُ الْمُصَوِّرُ',
      trans: "Huwa Allāhu al-Khāliqu al-Bāriʾu al-Muṣawwir",
      meaning: 'He is Allah, the Creator, the Inventor, the Fashioner.',
      source: 'Surah Al-Hashr 59:24',
    },
    readiness: {
      frame: 'Al-Muhaymin asks: am I guarding what has been entrusted, or just building fast?',
      yesLabel: 'I am guarding the trust when',
      notYetLabel: 'I am just building fast when',
      rows: [
        {
          id: 'M1', attr: 'Al-Muhaymin', attr_ar: 'المهيمن', attrTitle: 'The Guardian',
          attrFrame: 'Am I guarding what has been entrusted, or just building fast?',
          yesLabel: 'I am guarding the trust when',
          notYetLabel: 'I am just building fast when',
          governing: 'My systems protect the data and privacy of those who depend on them.',
          notYet: 'I am deploying without adequate testing because of time pressure.',
        },
        {
          id: 'M2', attr: 'Al-Muhaymin',
          governing: 'I have reviewed the security posture before proceeding.',
          notYet: 'Security is an afterthought rather than a design principle.',
        },
        {
          id: 'H1', attr: 'Al-Hafiz', attr_ar: 'الحفيظ', attrTitle: 'The Protector',
          attrFrame: 'Am I building to serve and protect, or to impress?',
          yesLabel: 'I am building to serve when',
          notYetLabel: 'I am building to impress when',
          governing: 'I am building with integrity — choosing durability over shortcuts.',
          notYet: 'I am building to impress rather than to serve and protect.',
        },
      ],
      governing: [
        'My systems protect the data and privacy of those who depend on them.',
        'I am building with integrity — choosing durability over shortcuts.',
        'I have reviewed the security posture before proceeding.',
      ],
      notYet: [
        'I am deploying without adequate testing because of time pressure.',
        'Security is an afterthought rather than a design principle.',
        'I am building to impress rather than to serve and protect.',
      ],
    },
    reflection: {
      frame: 'Al-Muhaymin watched over the systems today. Al-Hafiz preserved what mattered.',
      yesLabel: 'Guardianship was present when',
      notYetLabel: 'Guardianship was absent when',
      rows: [
        {
          id: 'RM1', attr: 'Al-Muhaymin', attr_ar: '\u0627\u0644\u0645\u0647\u064A\u0645\u0646', attrTitle: 'The Guardian',
          attrFrame: 'Did I guard what was entrusted today?',
          yesLabel: 'Guardianship was present when',
          notYetLabel: 'Guardianship was absent when',
          governing: 'I chose a secure approach even when a faster one was available.',
          notYet: 'I introduced technical debt that I know will cost someone later.',
        },
        {
          id: 'RH1', attr: 'Al-Hafiz', attr_ar: '\u0627\u0644\u062D\u0641\u064A\u0638', attrTitle: 'The Protector',
          attrFrame: 'Did I preserve what matters today?',
          yesLabel: 'Protection was present when',
          notYetLabel: 'Protection was absent when',
          governing: 'The systems I touched today are more reliable than when I started.',
          notYet: 'I left a vulnerability unaddressed because fixing it was inconvenient.',
        },
      ],
      governing: [
        'I chose a secure approach even when a faster one was available.',
        'The systems I touched today are more reliable than when I started.',
      ],
      notYet: [
        'I introduced technical debt that I know will cost someone later.',
        'I left a vulnerability unaddressed because fixing it was inconvenient.',
      ],
    },
  },

  crm: {
    attrs: [
      {
        name: 'Ar-Rahman',
        name_ar: '\u0627\u0644\u0631\u062D\u0645\u0646',
        title: 'The Most Merciful',
        body: 'Ar-Rahman extends mercy to all creation without exception. In customer relationships, this means approaching every interaction \u2014 including difficult conversations and lost deals \u2014 with genuine care for the other person\u2019s wellbeing, not just their wallet.',
      },
      {
        name: 'Al-Karim',
        name_ar: '\u0627\u0644\u0643\u0631\u064A\u0645',
        title: 'The Generous',
        body: 'Al-Karim gives without being asked and without expecting return. In business, this means leading with value \u2014 giving before asking, serving before selling, and building relationships on genuine generosity rather than transactional exchange.',
      },
    ],
    dua: {
      title: 'Before Engaging Clients',
      resumeTitle: 'Before Resuming Client Work',
      arabic: 'يُؤْتِي الْحِكْمَةَ مَن يَشَاءُ ۚ وَمَن يُؤْتَ الْحِكْمَةَ فَقَدْ أُوتِيَ خَيْرًا كَثِيرًا ۗ وَمَا يَذَّكَّرُ إِلَّا أُولُو الْأَلْبَابِ',
      trans: "Yuʾtī al-ḥikmata man yashāʾ, wa man yuʾta al-ḥikmata fa-qad ūtiya khayran kathīrā, wa mā yadhdhakkaru illā ulū al-albāb",
      meaning: 'He gives wisdom to whom He wills, and whoever has been given wisdom has certainly been given much good. And none will remember except those of understanding.',
      source: 'Surah Al-Baqarah 2:269',
    },
    closingDua: {
      title: 'After Client Engagement',
      arabic: 'وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا',
      trans: "Wa jaʿalnākum shuʿūban wa qabāʾila li-taʿārafū",
      meaning: 'And We made you into nations and tribes that you may know one another.',
      source: 'Surah Al-Hujurat 49:13',
    },
    readiness: {
      frame: 'Ar-Rahman asks: am I approaching this relationship with genuine care, or with a transaction in mind?',
      yesLabel: 'I am approaching with genuine care when',
      notYetLabel: 'The transaction is driving me when',
      rows: [
        {
          id: 'R1', attr: 'Ar-Rahman', attr_ar: '\u0627\u0644\u0631\u062D\u0645\u0646', attrTitle: 'The Most Merciful',
          attrFrame: 'Am I approaching this relationship with genuine care, or with a transaction in mind?',
          yesLabel: 'I am approaching with genuine care when',
          notYetLabel: 'The transaction is driving me when',
          governing: 'I am prepared to listen to what the client actually needs, not what I want to sell.',
          notYet: 'I am treating a person as a number on my pipeline board.',
        },
        {
          id: 'R2', attr: 'Ar-Rahman',
          governing: 'I would give the same advice even if it meant losing the deal.',
          notYet: 'I am about to promise something I am not certain I can deliver.',
        },
        {
          id: 'K1', attr: 'Al-Karim', attr_ar: '\u0627\u0644\u0643\u0631\u064A\u0645', attrTitle: 'The Generous',
          attrFrame: 'Am I leading with value, or extracting it?',
          yesLabel: 'I am leading with value when',
          notYetLabel: 'I am extracting when',
          governing: 'My follow-up is driven by care, not by quota pressure.',
          notYet: 'My urgency to close is overriding my honesty about fit.',
        },
      ],
      governing: [
        'I am prepared to listen to what the client actually needs, not what I want to sell.',
        'I would give the same advice even if it meant losing the deal.',
        'My follow-up is driven by care, not by quota pressure.',
      ],
      notYet: [
        'I am treating a person as a number on my pipeline board.',
        'I am about to promise something I am not certain I can deliver.',
        'My urgency to close is overriding my honesty about fit.',
      ],
    },
    reflection: {
      frame: 'Ar-Rahman witnessed every client interaction today. Al-Karim measured the generosity.',
      yesLabel: 'Genuine care was present when',
      notYetLabel: 'The transaction took over when',
      rows: [
        {
          id: 'RR1', attr: 'Ar-Rahman', attr_ar: '\u0627\u0644\u0631\u062D\u0645\u0646', attrTitle: 'The Most Merciful',
          attrFrame: 'Did I approach clients with genuine care today?',
          yesLabel: 'Genuine care was present when',
          notYetLabel: 'The transaction took over when',
          governing: 'I prioritized a client\u2019s genuine need over a quick sale.',
          notYet: 'I avoided a hard conversation because it might cost me the deal.',
        },
        {
          id: 'RK1', attr: 'Al-Karim', attr_ar: '\u0627\u0644\u0643\u0631\u064A\u0645', attrTitle: 'The Generous',
          attrFrame: 'Did I lead with value today?',
          yesLabel: 'Generosity was present when',
          notYetLabel: 'Extraction was present when',
          governing: 'I was transparent about limitations or timelines.',
          notYet: 'I overpromised to keep a prospect engaged.',
        },
      ],
      governing: [
        'I prioritized a client\u2019s genuine need over a quick sale.',
        'I was transparent about limitations or timelines.',
      ],
      notYet: [
        'I avoided a hard conversation because it might cost me the deal.',
        'I overpromised to keep a prospect engaged.',
      ],
    },
  },

  collective: {
    attrs: [
      {
        name: 'Al-Khaliq',
        name_ar: 'الخالق',
        title: 'The Creator',
        body: 'Al-Khaliq brought the earth into being with purpose and precision. Every acre of land, every watershed, every soil microbiome exists by His design. To steward land is to participate in the ongoing expression of His creative will — not as owner, but as khalīfah entrusted with what He made.',
      },
      {
        name: 'Ar-Razzaq',
        name_ar: 'الرزّاق',
        title: 'The Provider',
        body: 'Ar-Razzaq provides through the earth itself — rain becomes river, seed becomes harvest, land becomes sustenance. A faith-rooted land project is an act of trust in His provision: plant with effort, tend with care, and know that the yield belongs to Him.',
      },
    ],
    dua: {
      title: 'Before Engaging with the Land',
      resumeTitle: 'Before Returning to the Land',
      arabic: 'رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ وَأَدْخِلْنِي بِرَحْمَتِكَ فِي عِبَادِكَ الصَّالِحِينَ',
      trans: "Rabbi awziʿnī an ashkura niʿmataka allatī anʿamta ʿalayya wa ʿalā wālidayya wa an aʿmala ṣāliḥan tarḍāhu wa adkhilnī bi-raḥmatika fī ʿibādika aṣ-ṣāliḥīn",
      meaning: 'My Lord, enable me to be grateful for Your favor which You have bestowed upon me and upon my parents and to do righteousness of which You approve. And admit me by Your mercy into the ranks of Your righteous servants.',
      source: 'Surah An-Naml 27:19',
    },
    closingDua: {
      title: 'After Stewardship of the Land',
      arabic: 'هُوَ الَّذِي جَعَلَ لَكُمُ الْأَرْضَ ذَلُولًا فَامْشُوا فِي مَنَاكِبِهَا وَكُلُوا مِن رِّزْقِهِ',
      trans: "Huwa alladhī jaʿala lakumu al-arḍa dhalūlan fa-mshū fī manākibihā wa kulū min rizqih",
      meaning: 'It is He who made the earth manageable for you, so walk among its slopes and eat of His provision.',
      source: 'Surah Al-Mulk 67:15',
    },
    readiness: {
      frame: 'Al-Khaliq asks: am I approaching this land as a steward or as an owner?',
      yesLabel: 'I am approaching as a steward when',
      notYetLabel: 'I am approaching as an owner when',
      rows: [
        {
          id: 'K1', attr: 'Al-Khaliq', attr_ar: 'الخالق', attrTitle: 'The Creator',
          attrFrame: 'Am I approaching this land as a steward or as an owner?',
          yesLabel: 'I am approaching as a steward when',
          notYetLabel: 'I am approaching as an owner when',
          governing: 'I see the land as a trust from Allah, not as a personal asset.',
          notYet: 'I am treating this project as a personal brand rather than a collective stewardship.',
        },
        {
          id: 'K2', attr: 'Al-Khaliq',
          governing: 'I am prepared to build slowly, with patience, rather than rush for visible results.',
          notYet: 'Impatience for visible progress is overriding the discipline of doing it right.',
        },
        {
          id: 'R1', attr: 'Ar-Razzaq', attr_ar: 'الرزّاق', attrTitle: 'The Provider',
          attrFrame: 'Am I trusting in His provision, or grasping at outcomes?',
          yesLabel: 'I am trusting in provision when',
          notYetLabel: 'I am grasping at outcomes when',
          governing: 'My intentions for this work serve the community, not just my ambition.',
          notYet: 'I have not yet settled into the reality that this work may outlast me — and that is the point.',
        },
      ],
      governing: [
        'I see the land as a trust from Allah, not as a personal asset.',
        'My intentions for this work serve the community, not just my ambition.',
        'I am prepared to build slowly, with patience, rather than rush for visible results.',
      ],
      notYet: [
        'I am treating this project as a personal brand rather than a collective stewardship.',
        'Impatience for visible progress is overriding the discipline of doing it right.',
        'I have not yet settled into the reality that this work may outlast me — and that is the point.',
      ],
    },
    reflection: {
      frame: 'Al-Khaliq witnessed today\'s stewardship. Ar-Razzaq held the provision.',
      yesLabel: 'Stewardship was present when',
      notYetLabel: 'Ownership crept in when',
      rows: [
        {
          id: 'RK1', attr: 'Al-Khaliq', attr_ar: '\u0627\u0644\u062E\u0627\u0644\u0642', attrTitle: 'The Creator',
          attrFrame: 'Did I steward the land with long-term care today?',
          yesLabel: 'Stewardship was present when',
          notYetLabel: 'Ownership crept in when',
          governing: 'I made a decision today that prioritised the land\'s long-term health over short-term convenience.',
          notYet: 'I cut a corner on quality because no one was watching.',
        },
        {
          id: 'RR1', attr: 'Ar-Razzaq', attr_ar: '\u0627\u0644\u0631\u0632\u0651\u0627\u0642', attrTitle: 'The Provider',
          attrFrame: 'Did I serve the community with genuine care today?',
          yesLabel: 'Community care was present when',
          notYetLabel: 'Self-interest crept in when',
          governing: 'I approached the community\'s needs with the same care I would give my own family.',
          notYet: 'I prioritised speed or cost over what was genuinely right for the land or the people.',
        },
      ],
      governing: [
        'I made a decision today that prioritised the land\'s long-term health over short-term convenience.',
        'I approached the community\'s needs with the same care I would give my own family.',
      ],
      notYet: [
        'I cut a corner on quality because no one was watching.',
        'I prioritised speed or cost over what was genuinely right for the land or the people.',
      ],
    },
  },

  // ─── Pillar-level readiness entries ────────────────────────────────────────
  // Keyed by pillar ID. Used when a sub-module has no own interactive rows.
  // ThresholdModal falls back to these via getPillarForModule(moduleId).

  faith: {
    attrs: [
      {
        name: 'Al-Mutakabbir',
        name_ar: 'الْمُتَكَبِّر',
        title: 'The Supremely Great',
        body: 'Greatness belongs to Allah alone. Al-Mutakabbir dissolves the subtle inflations of pride — performing worship for recognition, measuring devotion against others, approaching knowledge as acquisition rather than gift. Pride corrupts Faith not through dramatic arrogance but through these interior distortions.',
      },
      {
        name: 'Al-Wakīl',
        name_ar: 'الْوَكِيل',
        title: 'The Trustworthy Disposer',
        body: 'Al-Wakīl asks for action taken without the anxiety of needing to control the result. Doubt erodes Faith not primarily through intellectual objection but through the refusal to release outcomes. The operator who acts but cannot release is still holding what should be entrusted.',
      },
    ],
    dua: {
      title: 'Before Faith Engagement',
      resumeTitle: 'Before Resuming Faith Work',
      arabic: 'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي',
      trans: 'Rabbi ishraḥ lī ṣadrī wa yassir lī amrī',
      meaning: 'My Lord, expand for me my breast [with assurance] and ease for me my task.',
      source: 'Surah Ta-Ha 20:25-26',
    },
    closingDua: {
      title: 'After Faith Engagement',
      arabic: 'رَبَّنَا تَقَبَّلْ مِنَّا ۖ إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ',
      trans: "Rabbanā taqabbal minnā, innaka anta as-Samīʿu al-ʿAlīm",
      meaning: 'Our Lord, accept [this] from us. Indeed, You are the Hearing, the Knowing.',
      source: 'Surah Al-Baqarah 2:127',
    },
    readiness: {
      frame: 'Al-Mutakabbir asks: am I approaching this as a servant before Allah, or has self-importance entered the act?',
      yesLabel: 'I am approaching as a servant when',
      notYetLabel: 'Self-importance has entered when',
      rows: [
        {
          id: 'M1', attr: 'Al-Mutakabbir', attr_ar: 'الْمُتَكَبِّر', attrTitle: 'The Supremely Great',
          attrFrame: 'Am I approaching this as a servant before Allah, or has my sense of self-importance entered the act?',
          yesLabel: 'I am approaching as a servant when',
          notYetLabel: 'Self-importance has entered when',
          governing: 'I am entering this practice aware that I am the one in need — He needs nothing from me.',
          notYet: 'I am conscious of how my practice reflects on me, and that consciousness is shaping it.',
        },
        {
          id: 'M2', attr: 'Al-Mutakabbir',
          governing: 'My worship is between me and Allah — I am not seeking witness or validation from anyone.',
          notYet: 'I am comparing my level of practice or knowledge with others, measuring my standing.',
        },
        {
          id: 'M3', attr: 'Al-Mutakabbir',
          governing: 'I am holding my spiritual state honestly — I am not inflating or performing it, even inwardly.',
          notYet: 'I am approaching this with a sense of entitlement — as though my prior devotion obliges a response.',
        },
        {
          id: 'M4', attr: 'Al-Mutakabbir',
          governing: 'I can receive correction in matters of faith without my sense of self being threatened by it.',
          notYet: 'I am holding a position in a matter of faith more tightly than the evidence warrants, because changing it feels like a loss.',
        },
        {
          id: 'W1', attr: 'Al-Wakīl', attr_ar: 'الْوَكِيل', attrTitle: 'The Trustworthy Disposer',
          attrFrame: 'Am I acting and releasing, or am I acting and still holding the outcome?',
          yesLabel: 'I am acting and releasing when',
          notYetLabel: 'I am still holding the outcome when',
          governing: 'I am acting from niyyah and releasing the outcome — the result is not mine to control.',
          notYet: 'I am going through the act but the outcome is still held in my hands rather than entrusted.',
        },
        {
          id: 'W2', attr: 'Al-Wakīl',
          governing: 'I am present enough in this act to actually turn toward Allah — not just to perform the gesture of turning.',
          notYet: 'I am fulfilling the form while my attention is elsewhere — or I am acting to resolve anxiety rather than out of genuine trust.',
        },
      ],
      governing: [
        'I am entering this practice aware that I am the one in need — He needs nothing from me.',
        'My worship is between me and Allah — I am not seeking witness or validation from anyone.',
        'I am holding my spiritual state honestly — I am not inflating or performing it, even inwardly.',
        'I can receive correction in matters of faith without my sense of self being threatened by it.',
        'I am acting from niyyah and releasing the outcome — the result is not mine to control.',
        'I am present enough in this act to actually turn toward Allah — not just to perform the gesture of turning.',
      ],
      notYet: [
        'I am conscious of how my practice reflects on me, and that consciousness is shaping it.',
        'I am comparing my level of practice or knowledge with others, measuring my standing.',
        'I am approaching this with a sense of entitlement — as though my prior devotion obliges a response.',
        'I am holding a position in a matter of faith more tightly than the evidence warrants, because changing it feels like a loss.',
        'I am going through the act but the outcome is still held in my hands rather than entrusted.',
        'I am fulfilling the form while my attention is elsewhere — or I am acting to resolve anxiety rather than out of genuine trust.',
      ],
    },
    reflection: {
      frame: 'Al-Mutakabbir reminded me today that greatness belongs to Him. Al-Wakīl held what I released.',
      yesLabel: 'Servanthood was present when',
      notYetLabel: 'Self-importance was present when',
      rows: [
        {
          id: 'RM1', attr: 'Al-Mutakabbir', attr_ar: '\u0627\u0644\u0652\u0645\u064F\u062A\u064E\u0643\u064E\u0628\u0651\u0650\u0631', attrTitle: 'The Supremely Great',
          attrFrame: 'Did I approach worship as a servant today?',
          yesLabel: 'Servanthood was present when',
          notYetLabel: 'Self-importance was present when',
          governing: 'I entered at least one act of worship with genuine servant-awareness, not self-consciousness.',
          notYet: 'I performed a practice with part of my attention on how it reflected on me.',
        },
        {
          id: 'RW1', attr: 'Al-Wakīl', attr_ar: '\u0627\u0644\u0652\u0648\u064E\u0643\u0650\u064A\u0644', attrTitle: 'The Trustworthy Disposer',
          attrFrame: 'Did I release what belongs to Him today?',
          yesLabel: 'Release was present when',
          notYetLabel: 'Holding was present when',
          governing: 'I released an outcome I was holding rather than entrusting.',
          notYet: 'I am still holding an outcome that belongs to Al-Wakīl.',
        },
      ],
      governing: [
        'I entered at least one act of worship with genuine servant-awareness, not self-consciousness.',
        'I released an outcome I was holding rather than entrusting.',
      ],
      notYet: [
        'I performed a practice with part of my attention on how it reflected on me.',
        'I am still holding an outcome that belongs to Al-Wakīl.',
      ],
    },
  },

  life: {
    attrs: [
      {
        name: 'Al-Qawī',
        name_ar: 'الْقَوِيّ',
        title: 'The All-Strong',
        body: 'Strength that does not break under pressure. Al-Qawī is not rigidity — it is the capacity to meet adversity without being unmade by it. Its absence shows in quiet attrition: the gradual shrinking of the self under accumulated demand. Al-Qawī asks whether you are drawing from a renewable source or depleting what you have not replenished.',
      },
      {
        name: 'Al-Laṭīf',
        name_ar: 'اللَّطِيف',
        title: 'The Subtly Kind',
        body: 'Attentiveness so fine it perceives what is needed before neglect takes hold. Al-Laṭīf is not softness — it is the quality of perception that notices the subtle signal before it becomes a crisis. Its absence shows in the accumulation of small unattended needs: the rest not taken, the conversation not had, the inner state not named.',
      },
    ],
    dua: {
      title: 'Before Life Domain Engagement',
      resumeTitle: 'Before Resuming Life Stewardship',
      arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ وَأَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ',
      trans: "Allāhumma innī aʿūdhu bika min al-hammi wal-ḥazani wa aʿūdhu bika min al-ʿajzi wal-kasali",
      meaning: 'O Allah, I seek refuge in You from anxiety and grief, and I seek refuge in You from incapacity and laziness.',
      source: 'Sahih al-Bukhari 6369',
    },
    closingDua: {
      title: 'After Life Stewardship',
      arabic: 'الْحَمْدُ لِلَّهِ الَّذِي عَافَانِي فِي جَسَدِي وَرَدَّ عَلَيَّ رُوحِي وَأَذِنَ لِي بِذِكْرِهِ',
      trans: "Al-ḥamdu li-Allāhi alladhī ʿāfānī fī jasadī wa radda ʿalayya rūḥī wa adhina lī bi-dhikrih",
      meaning: 'Praise be to Allah who granted me well-being in my body, returned my soul to me, and permitted me to remember Him.',
      source: 'Jami at-Tirmidhi 3401',
    },
    readiness: {
      frame: 'Al-Qawī asks: am I engaging from sustained strength, or from depletion I have not acknowledged?',
      yesLabel: 'I am engaging from sustained strength when',
      notYetLabel: 'I am engaging from unacknowledged depletion when',
      rows: [
        {
          id: 'Q1', attr: 'Al-Qawī', attr_ar: 'الْقَوِيّ', attrTitle: 'The All-Strong',
          attrFrame: 'Am I engaging from a place of sustained strength, or from depletion I have not acknowledged?',
          yesLabel: 'I am engaging from strength when',
          notYetLabel: 'I am engaging from depletion when',
          governing: 'I am entering this from a foundation that has been attended to — I am not running on reserves I have not acknowledged.',
          notYet: 'I am carrying a depletion I have not named, and proceeding as if the deficit does not exist.',
        },
        {
          id: 'Q2', attr: 'Al-Qawī',
          governing: 'I am meeting the demands of this domain without suppressing what is genuinely difficult about them.',
          notYet: 'I am managing through rather than attending to — treating challenge as something to get past rather than something to meet honestly.',
        },
        {
          id: 'Q3', attr: 'Al-Qawī',
          governing: 'I am drawing from a source that is being replenished — rest, connection, surrender — not only expending.',
          notYet: 'I am operating primarily on discipline and willpower without attending to what sustains those capacities.',
        },
        {
          id: 'L1', attr: 'Al-Laṭīf', attr_ar: 'اللَّطِيف', attrTitle: 'The Subtly Kind',
          attrFrame: 'Am I attending to what is actually present in me right now, or have I stopped noticing?',
          yesLabel: 'I am attending to what is present when',
          notYetLabel: 'I have stopped noticing when',
          governing: 'I am present enough to notice what is actually needed right now — not what the schedule requires, but what is true.',
          notYet: 'I am proceeding on habit and routine without checking whether what I am doing is what I actually need.',
        },
        {
          id: 'L2', attr: 'Al-Laṭīf',
          governing: 'I am attending to the signals my body, mind, and heart are giving — I have not overridden them to maintain productivity.',
          notYet: 'I am aware of a signal — fatigue, strain, resistance — and I have chosen to treat it as noise rather than information.',
        },
        {
          id: 'L3', attr: 'Al-Laṭīf',
          governing: 'I am holding the needs of those in my care with the same attentiveness I bring to external demands.',
          notYet: 'I am giving those closest to me what remains after external demands are met, rather than what is genuinely due.',
        },
      ],
      governing: [
        'I am entering this from a foundation that has been attended to — I am not running on reserves I have not acknowledged.',
        'I am meeting the demands of this domain without suppressing what is genuinely difficult about them.',
        'I am drawing from a source that is being replenished — rest, connection, surrender — not only expending.',
        'I am present enough to notice what is actually needed right now — not what the schedule requires, but what is true.',
        'I am attending to the signals my body, mind, and heart are giving — I have not overridden them to maintain productivity.',
        'I am holding the needs of those in my care with the same attentiveness I bring to external demands.',
      ],
      notYet: [
        'I am carrying a depletion I have not named, and proceeding as if the deficit does not exist.',
        'I am managing through rather than attending to — treating challenge as something to get past rather than something to meet honestly.',
        'I am operating primarily on discipline and willpower without attending to what sustains those capacities.',
        'I am proceeding on habit and routine without checking whether what I am doing is what I actually need.',
        'I am aware of a signal — fatigue, strain, resistance — and I have chosen to treat it as noise rather than information.',
        'I am giving those closest to me what remains after external demands are met, rather than what is genuinely due.',
      ],
    },
    reflection: {
      frame: 'Al-Qawī sustained me today. Al-Laṭīf noticed what I almost missed.',
      yesLabel: 'Sustained strength was present when',
      notYetLabel: 'Depletion went unattended when',
      rows: [
        {
          id: 'RQ1', attr: 'Al-Qawī', attr_ar: '\u0627\u0644\u0652\u0642\u064E\u0648\u0650\u064A\u0651', attrTitle: 'The All-Strong',
          attrFrame: 'Did I draw from sustainable strength today?',
          yesLabel: 'Sustained strength was present when',
          notYetLabel: 'Depletion went unattended when',
          governing: 'I attended to at least one genuine need today rather than pushing through it.',
          notYet: 'I suppressed a signal my body or heart was giving and told myself it was strength.',
        },
        {
          id: 'RL1', attr: 'Al-Laṭīf', attr_ar: '\u0627\u0644\u0644\u0651\u064E\u0637\u0650\u064A\u0641', attrTitle: 'The Subtly Kind',
          attrFrame: 'Did I attend to the subtle signals today?',
          yesLabel: 'Attentiveness was present when',
          notYetLabel: 'Inattention was present when',
          governing: 'I gave those in my care something that was actually theirs, not only what remained.',
          notYet: 'I am still carrying unacknowledged depletion into the next day.',
        },
      ],
      governing: [
        'I attended to at least one genuine need today rather than pushing through it.',
        'I gave those in my care something that was actually theirs, not only what remained.',
      ],
      notYet: [
        'I suppressed a signal my body or heart was giving and told myself it was strength.',
        'I am still carrying unacknowledged depletion into the next day.',
      ],
    },
  },

  intellect: {
    attrs: [
      {
        name: 'Al-Fattāḥ',
        name_ar: 'الْفَتَّاح',
        title: 'The Opener',
        body: 'Al-Fattāḥ opens what is closed — including the mind that has settled into its current shape. Its absence is not ignorance but closure: approaching learning already knowing what you will find, engaging with new ideas only to confirm prior positions, mistaking familiarity for mastery. The precondition of all genuine learning is a mind that can actually be changed.',
      },
      {
        name: 'Al-ʿAlīm',
        name_ar: 'الْعَلِيم',
        title: 'The All-Knowing',
        body: 'Knowledge belongs to Allah completely. Al-ʿAlīm orients toward knowledge not as a resource to acquire but as a trust to steward. Its absence corrupts through the wrong relationship with knowing: accumulation without application, sharing without accountability, criticism without humility, and treating the limit of current knowledge as the limit of what is knowable.',
      },
    ],
    dua: {
      title: 'Before Intellectual Engagement',
      resumeTitle: 'Before Resuming Study or Work',
      arabic: 'رَبِّ زِدْنِي عِلْمًا',
      trans: 'Rabbi zidnī ʿilmā',
      meaning: 'My Lord, increase me in knowledge.',
      source: 'Surah Ta-Ha 20:114',
    },
    closingDua: {
      title: 'After Intellectual Engagement',
      arabic: 'هَلْ يَسْتَوِي الَّذِينَ يَعْلَمُونَ وَالَّذِينَ لَا يَعْلَمُونَ',
      trans: "Hal yastawī alladhīna yaʿlamūna wa-lladhīna lā yaʿlamūn",
      meaning: 'Are those who know equal to those who do not know?',
      source: 'Surah Az-Zumar 39:9',
    },
    readiness: {
      frame: 'Al-Fattāḥ asks: am I entering this with a mind that can actually be opened, or have I already decided what I will find?',
      yesLabel: 'My mind can be opened when',
      notYetLabel: 'I have already decided what I will find when',
      rows: [
        {
          id: 'F1', attr: 'Al-Fattāḥ', attr_ar: 'الْفَتَّاح', attrTitle: 'The Opener',
          attrFrame: 'Am I entering this with a mind that can actually be opened, or have I already decided what I will find?',
          yesLabel: 'My mind can be opened when',
          notYetLabel: 'I have already decided what I will find when',
          governing: 'I am entering this willing to be genuinely surprised — what I encounter could change what I currently believe.',
          notYet: 'I am approaching this to confirm what I already know rather than to discover what I do not yet know.',
        },
        {
          id: 'F2', attr: 'Al-Fattāḥ',
          governing: 'I am holding my current understanding as provisional — correct enough to act on, but open to being revised.',
          notYet: 'I am defending a position I have not recently re-examined, treating it as settled because revisiting it feels costly.',
        },
        {
          id: 'A1', attr: 'Al-ʿAlīm', attr_ar: 'الْعَلِيم', attrTitle: 'The All-Knowing',
          attrFrame: 'Am I approaching this as a steward of knowledge — accountable for how I hold and share it — or as an accumulator?',
          yesLabel: 'I am stewarding knowledge when',
          notYetLabel: 'I am accumulating without accountability when',
          governing: 'I am engaging with this to understand and apply — not merely to possess or signal that I have encountered it.',
          notYet: 'I am accumulating without clear intention to use or share — building a store I am not yet accountable for.',
        },
        {
          id: 'A2', attr: 'Al-ʿAlīm',
          governing: 'I am honest about the limits of what I currently know — I am not extending my authority beyond what the evidence supports.',
          notYet: 'I am speaking or acting at the edge of my knowledge without naming that edge, presenting inference as established understanding.',
        },
        {
          id: 'A3', attr: 'Al-ʿAlīm',
          governing: 'I am approaching this with the awareness that I will be accountable for how I share what I learn — I hold it as a trust.',
          notYet: 'I am treating what I know as mine to use as I choose, without attending to the responsibility that comes with knowing.',
        },
        {
          id: 'A4', attr: 'Al-ʿAlīm',
          governing: 'I am applying critical thinking as a tool for reaching truth — not as a performance of sophistication or a means of maintaining distance.',
          notYet: 'I am using critical thinking primarily to establish what I do not accept, rather than to get closer to what is actually true.',
        },
      ],
      governing: [
        'I am entering this willing to be genuinely surprised — what I encounter could change what I currently believe.',
        'I am holding my current understanding as provisional — correct enough to act on, but open to being revised.',
        'I am engaging with this to understand and apply — not merely to possess or signal that I have encountered it.',
        'I am honest about the limits of what I currently know — I am not extending my authority beyond what the evidence supports.',
        'I am approaching this with the awareness that I will be accountable for how I share what I learn — I hold it as a trust.',
        'I am applying critical thinking as a tool for reaching truth — not as a performance of sophistication or a means of maintaining distance.',
      ],
      notYet: [
        'I am approaching this to confirm what I already know rather than to discover what I do not yet know.',
        'I am defending a position I have not recently re-examined, treating it as settled because revisiting it feels costly.',
        'I am accumulating without clear intention to use or share — building a store I am not yet accountable for.',
        'I am speaking or acting at the edge of my knowledge without naming that edge, presenting inference as established understanding.',
        'I am treating what I know as mine to use as I choose, without attending to the responsibility that comes with knowing.',
        'I am using critical thinking primarily to establish what I do not accept, rather than to get closer to what is actually true.',
      ],
    },
    reflection: {
      frame: 'Al-Fattāḥ opened what was closed today. Al-ʿAlīm witnessed how I held what I learned.',
      yesLabel: 'Genuine learning was present when',
      notYetLabel: 'Closure remained when',
      rows: [
        {
          id: 'RF1', attr: 'Al-Fattāḥ', attr_ar: '\u0627\u0644\u0652\u0641\u064E\u062A\u0651\u064E\u0627\u062D', attrTitle: 'The Opener',
          attrFrame: 'Was my mind genuinely opened today?',
          yesLabel: 'Genuine learning was present when',
          notYetLabel: 'Closure remained when',
          governing: 'I encountered something today that genuinely updated or complicated what I previously held.',
          notYet: 'I moved through material primarily to confirm what I already believed.',
        },
        {
          id: 'RA1', attr: 'Al-ʿAlīm', attr_ar: '\u0627\u0644\u0652\u0639\u064E\u0644\u0650\u064A\u0645', attrTitle: 'The All-Knowing',
          attrFrame: 'Did I hold knowledge as a trust today?',
          yesLabel: 'Knowledge stewardship was present when',
          notYetLabel: 'Knowledge was mishandled when',
          governing: 'I named the limit of my knowledge rather than extending beyond it.',
          notYet: 'I shared something as established understanding that was actually still inference.',
        },
      ],
      governing: [
        'I encountered something today that genuinely updated or complicated what I previously held.',
        'I named the limit of my knowledge rather than extending beyond it.',
      ],
      notYet: [
        'I moved through material primarily to confirm what I already believed.',
        'I shared something as established understanding that was actually still inference.',
      ],
    },
  },

  people: {
    attrs: [
      {
        name: 'Al-Raḥīm',
        name_ar: 'الرَّحِيم',
        title: 'The Merciful',
        body: 'Al-Raḥīm is active mercy — mercy that reaches out toward others rather than waiting to be earned. It is not sentiment but attention: the quality of presence that sees others as they are rather than as they function. Its absence corrupts the People domain not through cruelty but through treating people as roles, extracting from relationships rather than contributing, or allowing difference to become distance.',
      },
      {
        name: 'Al-Jāmiʿ',
        name_ar: 'الْجَامِع',
        title: 'The Gatherer',
        body: 'Al-Jāmiʿ draws together what is dispersed. Its absence shows as fragmentation — the gradual erosion of shared centre. Al-Jāmiʿ is not uniformity; it is the orientation toward a shared centre that makes difference generative rather than fragmenting. The operator entering this domain is asked whether their presence here builds or disperses the social fabric.',
      },
    ],
    dua: {
      title: 'Before Relational Engagement',
      resumeTitle: 'Before Resuming People Stewardship',
      arabic: 'رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا الَّذِينَ سَبَقُونَا بِالْإِيمَانِ وَلَا تَجْعَلْ فِي قُلُوبِنَا غِلًّا لِّلَّذِينَ آمَنُوا رَبَّنَا إِنَّكَ رَءُوفٌ رَّحِيمٌ',
      trans: "Rabbanā-ghfir lanā wa li-ikhwāninā alladhīna sabaqūnā bi-l-īmāni wa lā tajʿal fī qulūbinā ghillan li-lladhīna āmanū, rabbanā innaka raʾūfun raḥīm",
      meaning: 'Our Lord, forgive us and our brothers who preceded us in faith and put not in our hearts any resentment toward those who have believed. Our Lord, indeed You are Kind and Merciful.',
      source: 'Surah Al-Hashr 59:10',
    },
    closingDua: {
      title: 'After Relational Engagement',
      arabic: 'وَالَّذِينَ جَاءُوا مِن بَعْدِهِمْ يَقُولُونَ رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا',
      trans: "Wa-lladhīna jāʾū min baʿdihim yaqūlūna rabbanā-ghfir lanā wa li-ikhwāninā",
      meaning: 'And those who came after them say, "Our Lord, forgive us and our brothers."',
      source: 'Surah Al-Hashr 59:10',
    },
    readiness: {
      frame: 'Al-Raḥīm asks: am I present to the actual person before me, or to my role in relation to them?',
      yesLabel: 'I am present to the person when',
      notYetLabel: 'I am responding to the role when',
      rows: [
        {
          id: 'R1', attr: 'Al-Raḥīm', attr_ar: 'الرَّحِيم', attrTitle: 'The Merciful',
          attrFrame: 'Am I present to the actual person before me, or to my role in relation to them?',
          yesLabel: 'I am present to the person when',
          notYetLabel: 'I am responding to the role when',
          governing: 'I am approaching this person aware of what they are carrying — my presence is genuinely attentive, not procedural.',
          notYet: 'I am responding to the role this person occupies rather than to the person themselves.',
        },
        {
          id: 'R2', attr: 'Al-Raḥīm',
          governing: 'I am holding space for what is genuinely different about this person without letting that difference become distance.',
          notYet: 'I am letting what is unfamiliar or difficult about this person produce judgment or withdrawal rather than understanding.',
        },
        {
          id: 'R3', attr: 'Al-Raḥīm',
          governing: 'My presence here adds to this person — I am giving rather than primarily extracting.',
          notYet: 'I am here more for what I can receive than for what I can genuinely offer.',
        },
        {
          id: 'R4', attr: 'Al-Raḥīm',
          governing: 'I can hold the difficulty of this relationship honestly without allowing that difficulty to justify hardness toward the person.',
          notYet: 'I am using the real difficulty of this relationship as permission to withhold the care that is still due.',
        },
        {
          id: 'J1', attr: 'Al-Jāmiʿ', attr_ar: 'الْجَامِع', attrTitle: 'The Gatherer',
          attrFrame: 'Am I oriented toward the shared centre, or am I carrying fragmentation into this space?',
          yesLabel: 'I am oriented toward the shared centre when',
          notYetLabel: 'I am carrying fragmentation when',
          governing: 'I am entering this space oriented toward what holds us together — my private interests are not directing this engagement.',
          notYet: 'My own needs or agenda are driving this engagement more than the well-being of the relationship or community.',
        },
        {
          id: 'J2', attr: 'Al-Jāmiʿ',
          governing: 'I am contributing to cohesion — my words and presence here build rather than fragment.',
          notYet: 'I am carrying unresolved division — consciously or not — into this space, and it is shaping what I bring.',
        },
      ],
      governing: [
        'I am approaching this person aware of what they are carrying — my presence is genuinely attentive, not procedural.',
        'I am holding space for what is genuinely different about this person without letting that difference become distance.',
        'My presence here adds to this person — I am giving rather than primarily extracting.',
        'I can hold the difficulty of this relationship honestly without allowing that difficulty to justify hardness toward the person.',
        'I am entering this space oriented toward what holds us together — my private interests are not directing this engagement.',
        'I am contributing to cohesion — my words and presence here build rather than fragment.',
      ],
      notYet: [
        'I am responding to the role this person occupies rather than to the person themselves.',
        'I am letting what is unfamiliar or difficult about this person produce judgment or withdrawal rather than understanding.',
        'I am here more for what I can receive than for what I can genuinely offer.',
        'I am using the real difficulty of this relationship as permission to withhold the care that is still due.',
        'My own needs or agenda are driving this engagement more than the well-being of the relationship or community.',
        'I am carrying unresolved division — consciously or not — into this space, and it is shaping what I bring.',
      ],
    },
    reflection: {
      frame: 'Al-Raḥīm was present in how I held others today. Al-Jāmiʿ witnessed what my presence built.',
      yesLabel: 'Mercy and cohesion were present when',
      notYetLabel: 'Distance or fragmentation entered when',
      governing: [
        'I was present to at least one person as a person — not a role — and it shaped how I engaged.',
        'My presence in at least one relational space built rather than fragmented.',
      ],
      notYet: [
        'I responded to someone primarily through the function they serve rather than who they are.',
        'I carried unresolved tension into an interaction and it shaped what I brought.',
      ],
    },
  },

  wealth: {
    attrs: [
      {
        name: 'Al-Razzāq',
        name_ar: 'الرَّزَّاق',
        title: 'The Provider',
        body: 'All provision originates with Allah. Al-Razzāq orients toward wealth not as personal achievement to protect or expand but as rizq — provision entrusted for a purpose. Its absence corrupts through accumulation that crowds out generosity, ethical compromise justified by financial pressure, treating wealth as evidence of personal worth, and the anxiety of holding rather than trusting.',
      },
      {
        name: 'Al-Ḥasīb',
        name_ar: 'الْحَسِيب',
        title: 'The Reckoner',
        body: 'Precise accountability for what is held, how it is used, and what it produces. Al-Ḥasīb is not anxiety about outcomes — it is the quality of attention that ensures stewardship is legible, both to the operator and to Allah. Its absence shows in recklessness: decisions made without counting the cost, resources deployed without tracking their effect.',
      },
    ],
    dua: {
      title: 'Before Wealth Stewardship',
      resumeTitle: 'Before Resuming Financial Work',
      arabic: 'قُلْ إِنَّ رَبِّي يَبْسُطُ الرِّزْقَ لِمَن يَشَاءُ مِنْ عِبَادِهِ وَيَقْدِرُ لَهُ ۚ وَمَا أَنفَقْتُم مِّن شَيْءٍ فَهُوَ يُخْلِفُهُ ۖ وَهُوَ خَيْرُ الرَّازِقِينَ',
      trans: "Qul inna rabbī yabsuṭu ar-rizqa li-man yashāʾu min ʿibādihi wa yaqdiru lah, wa mā anfaqtum min shayʾin fa-huwa yukhlifihu, wa huwa khayru ar-rāziqīn",
      meaning: 'Say, "Indeed, my Lord extends provision for whom He wills of His servants and restricts it for him. But whatever thing you spend in His cause — He will compensate it; and He is the best of providers."',
      source: 'Surah Saba 34:39',
    },
    closingDua: {
      title: 'After Wealth Stewardship',
      arabic: 'وَمَا أَنفَقْتُم مِّن شَيْءٍ فَهُوَ يُخْلِفُهُ ۖ وَهُوَ خَيْرُ الرَّازِقِينَ',
      trans: "Wa mā anfaqtum min shayʾin fa-huwa yukhlifihu, wa huwa khayru ar-rāziqīn",
      meaning: 'And whatever thing you spend in His cause — He will compensate it; and He is the best of providers.',
      source: 'Surah Saba 34:39',
    },
    readiness: {
      frame: 'Al-Razzāq asks: am I holding this wealth as a trust from Allah, or as something I have earned and now own?',
      yesLabel: 'I am holding wealth as a trust when',
      notYetLabel: 'I am holding wealth as my own when',
      rows: [
        {
          id: 'Z1', attr: 'Al-Razzāq', attr_ar: 'الرَّزَّاق', attrTitle: 'The Provider',
          attrFrame: 'Am I holding this wealth as a trust from Allah, or as something I have earned and now own?',
          yesLabel: 'I am holding wealth as a trust when',
          notYetLabel: 'I am holding wealth as my own when',
          governing: 'I am approaching this with the awareness that what I hold is provision, not possession — it came from Allah and is accountable to Him.',
          notYet: 'I am treating what I have accumulated as mine by right, without attending to the trust dimension of holding it.',
        },
        {
          id: 'Z2', attr: 'Al-Razzāq',
          governing: 'I am making this decision with the ethical boundary intact — financial pressure is not relocating where that boundary sits.',
          notYet: 'I am allowing the pressure of financial need or opportunity to justify a compromise I would not otherwise accept.',
        },
        {
          id: 'Z3', attr: 'Al-Razzāq',
          governing: 'I am giving from what I hold with genuine freedom — generosity is not contingent on reaching a threshold of security first.',
          notYet: 'I am deferring generosity until conditions I keep receding are met — treating charity as a surplus activity rather than an obligation.',
        },
        {
          id: 'Z4', attr: 'Al-Razzāq',
          governing: 'I can hold an outcome in which I receive less than I expected without it threatening my orientation toward Allah as Provider.',
          notYet: 'I am measuring my standing with Allah or my own worth partly by what I have been given materially.',
        },
        {
          id: 'H1', attr: 'Al-Ḥasīb', attr_ar: 'الْحَسِيب', attrTitle: 'The Reckoner',
          attrFrame: 'Am I operating with the precision this trust deserves, or am I proceeding without full accounting?',
          yesLabel: 'I am operating with precision when',
          notYetLabel: 'I am proceeding without full accounting when',
          governing: 'I am entering this with a clear account of what has been deployed, what has been returned, and what remains outstanding.',
          notYet: 'I am proceeding without a clear reckoning of the current state — moving forward without closing what I opened before.',
        },
        {
          id: 'H2', attr: 'Al-Ḥasīb',
          governing: 'I am making this decision with full sight of its likely consequences — I have counted the cost before I have committed the resource.',
          notYet: 'I am acting with optimism about outcomes that I have not honestly examined, deploying resources before the accounting is complete.',
        },
      ],
      governing: [
        'I am approaching this with the awareness that what I hold is provision, not possession — it came from Allah and is accountable to Him.',
        'I am making this decision with the ethical boundary intact — financial pressure is not relocating where that boundary sits.',
        'I am giving from what I hold with genuine freedom — generosity is not contingent on reaching a threshold of security first.',
        'I can hold an outcome in which I receive less than I expected without it threatening my orientation toward Allah as Provider.',
        'I am entering this with a clear account of what has been deployed, what has been returned, and what remains outstanding.',
        'I am making this decision with full sight of its likely consequences — I have counted the cost before I have committed the resource.',
      ],
      notYet: [
        'I am treating what I have accumulated as mine by right, without attending to the trust dimension of holding it.',
        'I am allowing the pressure of financial need or opportunity to justify a compromise I would not otherwise accept.',
        'I am deferring generosity until conditions I keep receding are met — treating charity as a surplus activity rather than an obligation.',
        'I am measuring my standing with Allah or my own worth partly by what I have been given materially.',
        'I am proceeding without a clear reckoning of the current state — moving forward without closing what I opened before.',
        'I am acting with optimism about outcomes that I have not honestly examined, deploying resources before the accounting is complete.',
      ],
    },
    reflection: {
      frame: 'Al-Razzāq held the provision today. Al-Ḥasīb witnessed the reckoning.',
      yesLabel: 'Trust and precision were present when',
      notYetLabel: 'Ownership or recklessness entered when',
      governing: [
        'I made at least one financial decision with the amanah dimension consciously present.',
        'I counted the cost of a deployment before committing — not after.',
      ],
      notYet: [
        'I treated wealth I hold as mine by right rather than as provision entrusted.',
        'I moved forward without a clear account of what preceded this step.',
      ],
    },
  },

  environment: {
    attrs: [
      {
        name: 'Al-Wakīl',
        name_ar: 'الْوَكِيل',
        title: 'The Trustworthy Disposer',
        body: 'In the Environment domain, Al-Wakīl frames the earth as something entrusted — not owned, not inherited as a right, but held in custody for those who come after. The operator is asked whether they understand that the ground beneath them is a trust, and that a trustee has obligations to the one who entrusted.',
      },
      {
        name: 'Al-Ḥakīm',
        name_ar: 'الْحَكِيم',
        title: 'The All-Wise',
        body: 'Wisdom that perceives consequences across time and scale. Al-Ḥakīm is the antidote to short-sightedness — not merely prudence, but the quality of perception that sees how present choices propagate into future conditions. Its absence corrupts through the accumulated weight of small decisions made without seeing their full arc.',
      },
    ],
    dua: {
      title: 'Before Ecological Stewardship',
      resumeTitle: 'Before Resuming Environmental Work',
      arabic: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ',
      trans: "Subḥāna alladhī sakhkhara lanā hādhā wa mā kunnā lahu muqrinīn",
      meaning: 'Glory be to Him who has subjected this to us, and we could not have [otherwise] subdued it.',
      source: 'Surah Az-Zukhruf 43:13',
    },
    closingDua: {
      title: 'After Environmental Stewardship',
      arabic: 'الَّذِي جَعَلَ لَكُمُ الْأَرْضَ فِرَاشًا وَالسَّمَاءَ بِنَاءً',
      trans: "Alladhī jaʿala lakumu al-arḍa firāshan wa-s-samāʾa bināʾā",
      meaning: '[He] who made for you the earth a resting place and the sky a canopy.',
      source: 'Surah Al-Baqarah 2:22',
    },
    readiness: {
      frame: 'Al-Wakīl asks: am I engaging with this domain as a trustee of what has been entrusted — to me, and through me, to future generations?',
      yesLabel: 'I am engaging as a trustee when',
      notYetLabel: 'I am consuming without trusteeship when',
      rows: [
        {
          id: 'K1', attr: 'Al-Wakīl', attr_ar: 'الْوَكِيل', attrTitle: 'The Trustworthy Disposer',
          attrFrame: 'Am I engaging with this domain as a trustee of what has been entrusted — to me, and through me, to future generations?',
          yesLabel: 'I am engaging as a trustee when',
          notYetLabel: 'I am consuming without trusteeship when',
          governing: 'I am approaching this with the awareness that what I hold, consume, and affect is not mine — it is entrusted for a purpose beyond my own use.',
          notYet: 'I am treating the resources and ecosystems I engage with as available for my use without attending to the trust dimension of that use.',
        },
        {
          id: 'K2', attr: 'Al-Wakīl',
          governing: 'I am acting with the awareness that my choices here have consequences for people who are not present — and that accountability extends to them.',
          notYet: 'I am making this choice based only on its effects on those present and currently visible, without attending to the unseen and the future.',
        },
        {
          id: 'H1', attr: 'Al-Ḥakīm', attr_ar: 'الْحَكِيم', attrTitle: 'The All-Wise',
          attrFrame: 'Am I seeing far enough — across time, across scale, across those affected — to make this choice wisely?',
          yesLabel: 'I am seeing far enough when',
          notYetLabel: 'I am seeing only what is immediate when',
          governing: 'I am seeing the full arc of this choice — its likely effects across time and at a scale beyond my immediate context.',
          notYet: 'I am making this decision based on its immediate and visible effects, without honestly examining its downstream consequences.',
        },
        {
          id: 'H2', attr: 'Al-Ḥakīm',
          governing: 'I am willing to accept a present inconvenience or cost in order to preserve a future condition I will not personally witness.',
          notYet: 'I am prioritising immediate ease or gain in a way that defers a cost I know will fall on others — human or ecological.',
        },
        {
          id: 'H3', attr: 'Al-Ḥakīm',
          governing: 'I am examining my consumption and project choices with honest attention to their full chain of effects — not only their proximate outcomes.',
          notYet: 'I am accepting the framing given to me about what is \'sustainable\' or \'ethical\' without examining whether that framing holds under scrutiny.',
        },
        {
          id: 'H4', attr: 'Al-Ḥakīm',
          governing: 'I am acting from principle rather than from trend — my engagement here is grounded in obligation, not in what currently signals environmental care.',
          notYet: 'I am participating in environmental stewardship primarily in ways that are visible and culturally recognised, while exempting less visible choices from the same standard.',
        },
      ],
      governing: [
        'I am approaching this with the awareness that what I hold, consume, and affect is not mine — it is entrusted for a purpose beyond my own use.',
        'I am acting with the awareness that my choices here have consequences for people who are not present — and that accountability extends to them.',
        'I am seeing the full arc of this choice — its likely effects across time and at a scale beyond my immediate context.',
        'I am willing to accept a present inconvenience or cost in order to preserve a future condition I will not personally witness.',
        'I am examining my consumption and project choices with honest attention to their full chain of effects — not only their proximate outcomes.',
        'I am acting from principle rather than from trend — my engagement here is grounded in obligation, not in what currently signals environmental care.',
      ],
      notYet: [
        'I am treating the resources and ecosystems I engage with as available for my use without attending to the trust dimension of that use.',
        'I am making this choice based only on its effects on those present and currently visible, without attending to the unseen and the future.',
        'I am making this decision based on its immediate and visible effects, without honestly examining its downstream consequences.',
        'I am prioritising immediate ease or gain in a way that defers a cost I know will fall on others — human or ecological.',
        'I am accepting the framing given to me about what is \'sustainable\' or \'ethical\' without examining whether that framing holds under scrutiny.',
        'I am participating in environmental stewardship primarily in ways that are visible and culturally recognised, while exempting less visible choices from the same standard.',
      ],
    },
    reflection: {
      frame: 'Al-Wakīl witnessed what I held as trust today. Al-Ḥakīm saw how far I looked.',
      yesLabel: 'Trusteeship and wisdom were present when',
      notYetLabel: 'Short-sightedness or consumption entered when',
      rows: [
        {
          id: 'RW1', attr: 'Al-Wakīl', attr_ar: '\u0627\u0644\u0652\u0648\u064E\u0643\u0650\u064A\u0644', attrTitle: 'The Trustworthy Disposer',
          attrFrame: 'Did I engage as a trustee of the earth today?',
          yesLabel: 'Trusteeship was present when',
          notYetLabel: 'Consumption entered when',
          governing: 'I made at least one choice today with the unseen and the future consciously present.',
          notYet: 'I treated a resource I engaged with as available for my use without attending to its trust dimension.',
        },
        {
          id: 'RH1', attr: 'Al-Ḥakīm', attr_ar: '\u0627\u0644\u0652\u062D\u064E\u0643\u0650\u064A\u0645', attrTitle: 'The All-Wise',
          attrFrame: 'Did I see far enough today?',
          yesLabel: 'Wisdom was present when',
          notYetLabel: 'Short-sightedness entered when',
          governing: 'I examined rather than accepted a framing about sustainability or ethics.',
          notYet: 'I made a decision based on immediate effects without honestly examining what comes after.',
        },
      ],
      governing: [
        'I made at least one choice today with the unseen and the future consciously present.',
        'I examined rather than accepted a framing about sustainability or ethics.',
      ],
      notYet: [
        'I treated a resource I engaged with as available for my use without attending to its trust dimension.',
        'I made a decision based on immediate effects without honestly examining what comes after.',
      ],
    },
  },
};

export const ONGOING_DUA = {
  title: 'During Work · Tawakkul',
  arabic: 'حَسْبِيَ اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ',
  trans: "Ḥasbiya Allāhu lā ilāha illā huwa, ʿalayhi tawakkaltu, wa huwa Rabbu al-ʿArshi al-ʿAẓīm",
  meaning: 'Allah is sufficient for me. There is no god but He. In Him I place my trust, and He is the Lord of the Mighty Throne.',
  source: 'Surah At-Tawbah 9:129',
};

export const UNIVERSAL_EQUIV = {
  work: {
    principles: [
      { name: 'Excellence', body: 'Strive for mastery in every task. Excellence means doing work you would be proud to sign your name to — work that serves the recipient, not just the deadline.' },
      { name: 'Trust', body: 'Do your best work and release attachment to outcomes you cannot control. Sustainable productivity comes from focused effort, not anxious overwork.' },
    ],
    mindfulness: 'Take a moment to set your intention. What quality of work do you want to bring to this session?',
    resumeMindfulness: 'Welcome back. Take a breath and reconnect with your intention before continuing.',
    closingMindfulness: 'Take a moment to acknowledge what you accomplished and release what remains. The work you offered today had value.',
    readiness: {
      frame: 'Am I bringing my best to this work, or just getting through it?',
      yesLabel: 'I am bringing my best when',
      notYetLabel: 'I am just getting through it when',
      rows: [
        {
          id: 'M1', attr: 'Excellence', attrTitle: 'Craft & Intention',
          attrFrame: 'Am I bringing my best to this work, or just getting through it?',
          yesLabel: 'I am bringing my best when',
          notYetLabel: 'I am just getting through it when',
          governing: 'I approach the next task with the intention of excellence, not just completion.',
          notYet: 'I am rushing through tasks to clear the board rather than doing each one well.',
        },
        {
          id: 'M2', attr: 'Excellence',
          governing: 'The quality of my work holds my focus — not just whether the task gets done.',
          notYet: 'The work feels like an obligation to discharge rather than something to take pride in.',
        },
        {
          id: 'M3', attr: 'Excellence',
          governing: 'I would redo this if it fell short — from genuine care, not compulsion.',
          notYet: 'I am doing the minimum that will pass, not the most genuinely possible right now.',
        },
        {
          id: 'W1', attr: 'Trust', attrTitle: 'Presence & Release',
          attrFrame: 'Am I at peace with releasing what I cannot control?',
          yesLabel: 'I am at peace when',
          notYetLabel: 'I am still holding on when',
          governing: 'I have a clear plan and am ready to focus without distraction.',
          notYet: 'Anxiety about results is driving my work more than care for the craft.',
        },
        {
          id: 'W2', attr: 'Trust',
          governing: 'The work itself is the goal — not what it might produce.',
          notYet: 'I am distracted and have not yet settled into focused presence.',
        },
        {
          id: 'W3', attr: 'Trust',
          governing: 'I am present in this task, not bracing against the outcome of the next.',
          notYet: 'The outcome carries so much weight I cannot yet be fully present to the work.',
        },
      ],
      governing: [
        'I approach the next task with the intention of excellence, not just completion.',
        'The quality of my work holds my focus — not just whether the task gets done.',
        'I would redo this if it fell short — from genuine care, not compulsion.',
        'I have a clear plan and am ready to focus without distraction.',
        'The work itself is the goal — not what it might produce.',
        'I am present in this task, not bracing against the outcome of the next.',
      ],
      notYet: [
        'I am rushing through tasks to clear the board rather than doing each one well.',
        'The work feels like an obligation to discharge rather than something to take pride in.',
        'I am doing the minimum that will pass, not the most genuinely possible right now.',
        'Anxiety about results is driving my work more than care for the craft.',
        'I am distracted and have not yet settled into focused presence.',
        'The outcome carries so much weight I cannot yet be fully present to the work.',
      ],
    },
    reflection: {
      frame: 'Reflect on the quality and intention behind today\'s work.',
      yesLabel: 'Excellence was present when',
      notYetLabel: 'Excellence was absent when',
      governing: [
        'I can point to at least one task where I chose quality over speed.',
        'I released attachment to an outcome that was not in my control.',
      ],
      notYet: [
        'I cut corners on something and justified it as efficiency.',
        'I am still carrying anxiety about a result beyond my control.',
      ],
    },
  },
  money: {
    principles: [
      { name: 'Stewardship', body: 'Financial resources are entrusted to you for a purpose. Manage them with the same care you would bring to someone else\'s money — because, in a sense, it is.' },
      { name: 'Honest Reckoning', body: 'Every number must tell the truth. Transparent financial records are not just good practice — they are the foundation of trust with everyone who depends on your organization.' },
    ],
    mindfulness: 'Before making financial decisions, pause and ask: is this honest, transparent, and in service of long-term health?',
    resumeMindfulness: 'Welcome back. Reconnect with honest stewardship before continuing.',
    closingMindfulness: 'Reflect on today\'s financial decisions and the sufficiency already present. What you stewarded today was enough.',
    readiness: {
      frame: 'Am I managing resources with honesty and responsibility?',
      yesLabel: 'I am managing with honesty when',
      notYetLabel: 'Honesty is compromised when',
      governing: ['My financial records reflect reality.', 'I am making decisions from sufficiency, not scarcity.', 'Every transaction serves a clear purpose.'],
      notYet: ['I am delaying honest accounting.', 'Financial anxiety is driving compromised decisions.', 'I am treating resources as mine rather than a trust.'],
    },
    reflection: {
      frame: 'Reflect on today\'s financial decisions and their integrity.',
      yesLabel: 'Integrity was present when',
      notYetLabel: 'Integrity was absent when',
      governing: ['My financial dealings were transparent and honest.', 'I made a decision from trust rather than fear.'],
      notYet: ['I avoided a financial reality that needs attention.', 'I prioritized profit over principle.'],
    },
  },
  people: {
    principles: [
      { name: 'Genuine Care', body: 'Leading people means caring for their growth before their output. See potential before performance gaps. Every person on your team is more than their role.' },
      { name: 'Fairness', body: 'Fair treatment in compensation, recognition, and opportunity is not generosity — it is the minimum standard of ethical leadership.' },
    ],
    mindfulness: 'Before engaging with your team, set the intention to listen fully and lead with fairness.',
    resumeMindfulness: 'Welcome back. Reconnect with genuine care before engaging with your team.',
    closingMindfulness: 'Reflect on the people you served today. The care you brought to each interaction mattered, even when it was hard.',
    readiness: {
      frame: 'Am I leading with genuine care, or managing with control?',
      yesLabel: 'I am leading with care when',
      notYetLabel: 'I am managing with control when',
      governing: ['I see each person as a person first.', 'My decisions are guided by fairness.', 'I am ready for difficult conversations with compassion.'],
      notYet: ['I am avoiding a necessary conversation.', 'I am playing favorites.', 'I have not checked in on someone who may be struggling.'],
    },
    reflection: {
      frame: 'Reflect on how I treated people today.',
      yesLabel: 'Genuine care was present when',
      notYetLabel: 'Care was absent when',
      governing: ['I invested in someone\'s growth beyond their role.', 'I made a fair decision even when favoritism was easier.'],
      notYet: ['I overlooked someone deserving recognition.', 'I let a power dynamic go unchecked.'],
    },
  },
  office: {
    principles: [
      { name: 'Deep Listening', body: 'True communication begins with listening. Before you speak, write, or decide, have you truly heard what others are saying — and what they are not saying?' },
      { name: 'Knowledge Sharing', body: 'Information hoarded is knowledge wasted. Share generously, document accurately, and never use information as a tool of power.' },
    ],
    mindfulness: 'Before communicating, pause and listen. What does the other person actually need?',
    resumeMindfulness: 'Welcome back. Center yourself in listening before communicating.',
    closingMindfulness: 'Reflect on the conversations you had today. Where you listened fully, connection was possible. Where you spoke honestly, trust was built.',
    readiness: {
      frame: 'Am I truly listening, or just waiting to speak?',
      yesLabel: 'I am truly listening when',
      notYetLabel: 'I am just waiting to speak when',
      governing: ['I am prepared to listen before responding.', 'The information I share is accurate and serves others.', 'My communication builds trust.'],
      notYet: ['I am preparing to speak without understanding.', 'I am withholding information others need.', 'My next message is driven by ego.'],
    },
    reflection: {
      frame: 'Reflect on the quality of today\'s communication.',
      yesLabel: 'True communication was present when',
      notYetLabel: 'Communication fell short when',
      governing: ['I listened fully before responding.', 'I shared knowledge generously.'],
      notYet: ['I dismissed someone who needed to be heard.', 'I used information as leverage.'],
    },
  },
  tech: {
    principles: [
      { name: 'Vigilant Guardianship', body: 'Technical stewardship means guarding systems, data, and infrastructure with vigilance. Every security measure is an act of responsibility over what has been entrusted to you.' },
      { name: 'Durable Building', body: 'Build with durability rather than disposability. Protect user data, maintain system integrity, and choose the reliable path over the expedient one.' },
    ],
    mindfulness: 'Before technical work, consider: am I building to last, or just building fast?',
    resumeMindfulness: 'Welcome back. Reconnect with careful guardianship before building.',
    closingMindfulness: 'Reflect on what you built today. The systems you touched are more reliable for the care you brought. What you protected matters.',
    readiness: {
      frame: 'Am I guarding what has been entrusted, or just shipping quickly?',
      yesLabel: 'I am guarding the trust when',
      notYetLabel: 'I am just shipping quickly when',
      governing: ['My systems protect data and privacy.', 'I am building with integrity.', 'I have reviewed security before proceeding.'],
      notYet: ['I am deploying without adequate testing.', 'Security is an afterthought.', 'I am building to impress rather than to serve.'],
    },
    reflection: {
      frame: 'Reflect on today\'s technical decisions and their durability.',
      yesLabel: 'Guardianship was present when',
      notYetLabel: 'Guardianship was absent when',
      governing: ['I chose a secure approach over a faster one.', 'Systems I touched are more reliable now.'],
      notYet: ['I introduced technical debt knowingly.', 'I left a vulnerability unaddressed.'],
    },
  },
  crm: {
    principles: [
      { name: 'Genuine Care', body: 'Approach every client relationship with authentic interest in their success, not just your revenue. The best business relationships are built on mutual benefit.' },
      { name: 'Generous Value', body: 'Lead with value before asking for anything in return. Give freely of your expertise and attention. Trust that generosity creates lasting partnerships.' },
    ],
    mindfulness: 'Before engaging with a client or prospect, pause and ask: am I serving their genuine interest, or just pursuing the sale?',
    resumeMindfulness: 'Welcome back. Reconnect with genuine care before engaging with clients.',
    closingMindfulness: 'Reflect on the relationships you engaged with today. Where you led with genuine care, something real was built.',
    readiness: {
      frame: 'Am I approaching this relationship with authentic care?',
      yesLabel: 'I am approaching with authentic care when',
      notYetLabel: 'The transaction is driving me when',
      governing: ['I am prepared to listen to what the client actually needs.', 'I would give honest advice even if it costs me the deal.', 'My follow-up is driven by care, not pressure.'],
      notYet: ['I am treating a person as a number.', 'I am about to overpromise.', 'My urgency to close is overriding honesty.'],
    },
    reflection: {
      frame: 'Reflect on how I treated clients today.',
      yesLabel: 'Authentic care was present when',
      notYetLabel: 'The transaction took over when',
      governing: ['I prioritized a genuine need over a quick sale.', 'I was transparent about limitations.'],
      notYet: ['I avoided a hard conversation to protect the deal.', 'I overpromised to keep a prospect engaged.'],
    },
  },
  family: {
    attrs: [
      {
        name: 'Al-Wadud',
        name_ar: 'الودود',
        title: 'The Loving',
        body: 'Al-Wadud is the source of all love between spouses, parents and children, kin and community. Family life is not sustained by will alone — it is held together by a love that originates with God and flows through those who remember Him. To tend your family is to be a channel of Al-Wadud.',
      },
      {
        name: 'Al-Qayyum',
        name_ar: 'القيوم',
        title: 'The Self-Sustaining Sustainer',
        body: 'Al-Qayyum upholds all things without tiring. The family covenant — nikah, parenting, kinship — is not a private arrangement but one upheld by the One who never sleeps. Enter each role knowing that what you cannot carry, He carries. Your consistency is an act of trust in His.',
      },
    ],
    dua: {
      title: 'Opening Intention — Family',
      resumeTitle: 'Returning to Family',
      arabic: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا',
      trans: 'Rabbanā hab lanā min azwājinā wa dhurriyyātinā qurrata aʿyunin wajʿalnā lil-muttaqīna imāmā',
      meaning: 'Our Lord, grant us from our spouses and offspring comfort to our eyes, and make us a model for the righteous.',
      source: 'Surah Al-Furqan 25:74',
    },
    closingDua: {
      title: 'Closing — Family',
      arabic: 'رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ وَأَصْلِحْ لِي فِي ذُرِّيَّتِي',
      trans: "Rabbi awziʿnī an ashkura niʿmataka allatī anʿamta ʿalayya wa ʿalā wālidayya wa an aʿmala ṣāliḥan tarḍāhu wa aṣliḥ lī fī dhurriyyatī",
      meaning: 'My Lord, enable me to be grateful for Your favour which You have bestowed upon me and upon my parents, and to do righteousness of which You approve, and make righteous for me my offspring.',
      source: 'Surah Al-Ahqaf 46:15',
    },
    readiness: {
      frame: 'Before engaging with family responsibilities, check your state.',
      yesLabel: 'I am ready to enter when',
      notYetLabel: 'I need to pause when',
      rows: [
        'I am emotionally present, not carrying unresolved tension into this space.',
        'I am entering with the intention to give, not only to receive.',
        'I am prepared to listen before I respond.',
      ],
      governing: [
        'My presence here is an act of ibadah.',
        'I am a trustee of the people in my care.',
        'Gentleness is a sign of the mercy Allah has placed in my heart.',
      ],
      notYet: [
        'I am too depleted to be present — I need to rest first.',
        'I am carrying anger that would harm rather than help.',
        'I am approaching this to vent, not to connect.',
      ],
    },
    reflection: {
      frame: 'Reflect on how I showed up for my family today.',
      yesLabel: 'Presence and mercy were alive when',
      notYetLabel: 'I fell short of the covenant when',
      governing: [
        'I was patient when it cost me something.',
        'I listened to understand, not to reply.',
        'I made someone in my family feel seen and valued.',
      ],
      notYet: [
        'I let my stress become their burden.',
        'I was physically present but emotionally absent.',
        'I responded with harshness when softness was what was needed.',
      ],
    },
  },
};

export const ONGOING_UNIVERSAL = {
  title: 'During Work · Presence',
  meaning: 'I am present. I bring my full attention and care to this moment. The quality of my work reflects the quality of my intention.',
};

export function getModuleData(moduleId, valuesLayer) {
  if (valuesLayer === 'islamic') return MODULE_ATTRS[moduleId] || null;
  return UNIVERSAL_EQUIV[moduleId] || null;
}

// ── Pause Protocol ──
// The Istirja' is not an exit prayer — it is a return gesture.
// Using it here signals that the operator is returning this moment
// to Allah rather than forcing entry. The system honors the honesty.

export const ISTIRJA = {
  arabic: '\u0625\u0650\u0646\u0651\u064E\u0627 \u0644\u0650\u0644\u0651\u064E\u0670\u0647\u0650 \u0648\u064E\u0625\u0650\u0646\u0651\u064E\u0627 \u0625\u0650\u0644\u064E\u064A\u0652\u0647\u0650 \u0631\u064E\u0627\u062C\u0650\u0639\u064F\u0648\u0646\u064E',
  trans: "Inn\u0101 lill\u0101hi wa inn\u0101 ilayhi r\u0101ji\u02BF\u016Bn",
  meaning: 'Indeed, we belong to Allah, and indeed to Him we shall return.',
  source: 'Al-Baqarah 2:156',
  note: 'This \u0101yah is recited at moments of loss and interruption \u2014 returning what cannot yet be carried back to the One who holds it.',
};

export const PAUSE_ACKNOWLEDGMENT = 'Recognizing this is itself an act of mu\u1E25\u0101sabah. The stage will hold.';

// Module-specific pause reflection questions — drawn from the "not yet rested in" column
export const PAUSE_QUESTIONS = {
  work: 'What is pulling your attention away from the craft right now \u2014 and can it be set down, or does it need to be addressed first?',
  money: 'What financial truth are you avoiding right now \u2014 and what would it cost to face it honestly before proceeding?',
  people: 'Who have you been avoiding, and is the avoidance protecting them or protecting you?',
  office: 'What are you about to say that you have not yet fully listened to \u2014 and what would change if you heard it first?',
  tech: 'What shortcut are you about to take \u2014 and who will bear the cost of it later?',
  crm: 'Are you approaching this relationship with genuine care \u2014 or is the transaction driving the interaction?',
};

// Universal equivalents for the pause protocol
export const PAUSE_UNIVERSAL = {
  acknowledgment: 'Recognizing this pause is itself an act of honest self-assessment. The work will hold.',
  reflection: 'Take a moment of stillness. What needs your attention before you can be fully present here?',
  questions: {
    work: 'What is pulling your attention away from the craft right now \u2014 and can it be set down, or does it need to be addressed first?',
    money: 'What financial reality are you avoiding \u2014 and what would it cost to face it honestly?',
    people: 'Who have you been avoiding, and is the avoidance protecting them or protecting you?',
    office: 'What are you about to say that you have not yet fully listened to?',
    tech: 'What shortcut are you about to take \u2014 and who will bear the cost of it later?',
    crm: 'Are you approaching this relationship with genuine care \u2014 or is the transaction driving the interaction?',
  },
};

// ── Compassionate Defer ──
// The defer is an act of integrity, not failure.
// The system values the person, not just their output.

export const DEFER_CONTENT = {
  acknowledgment: 'Recognizing you are not yet ready is itself an act of integrity. This is not failure \u2014 it is mu\u1E25\u0101sabah.',
  holdingMessage: 'This module will hold. You can return whenever you are ready.',
  getGuidanceQuestion: (moduleId) => {
    return PAUSE_QUESTIONS[moduleId] || PAUSE_QUESTIONS.work;
  },
};

export const DEFER_UNIVERSAL = {
  acknowledgment: 'Recognizing you are not yet ready is an honest act of self-awareness. This is not failure.',
  holdingMessage: 'This module will hold. You can return whenever you are ready.',
  reflection: 'Trust the timing. What needs your attention will still be here \u2014 and so will this work, when you are ready for it.',
  getGuidanceQuestion: (moduleId) => {
    return PAUSE_UNIVERSAL.questions[moduleId] || PAUSE_UNIVERSAL.questions.work;
  },
};

// ── Presence Awareness Config ──
export const PRESENCE_CONFIG = {
  INACTIVITY_TIMEOUT_MS: 20 * 60 * 1000,  // 20 minutes
  PRAYER_LEAD_MS: 5 * 60 * 1000,          // 5 minutes before prayer
  PRAYER_TRAIL_MS: 10 * 60 * 1000,        // 10 minutes after prayer
  PRAYER_WARNING_LEAD_MS: 15 * 60 * 1000, // 15 minutes before prayer (warning notification)
};
