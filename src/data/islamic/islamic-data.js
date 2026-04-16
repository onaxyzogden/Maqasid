// Islamic Governance Data — Module-centric adaptation of bbos-v4's stage-centric model
// Each module maps to 2 governing divine attributes, a dua, readiness check, and reflection

import { getPillarForModule } from '../maqasid';

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

  'faith-shahada': {
    attrs: [
      {
        name: 'Al-Ahad',
        name_ar: 'الأحد',
        title: 'The One',
        body: 'Al-Ahad is oneness that permits no division. The Shahada is not the addition of one belief to a set of beliefs — it is the collapse of every rival claim on the heart. Wherever something else carries the weight only Allah should carry, Al-Ahad exposes it.',
      },
      {
        name: 'As-Samad',
        name_ar: 'الصمد',
        title: 'The Self-Sufficient Absolute',
        body: 'As-Samad is the One to whom all turn in need and who turns to no one. To say the Shahada from As-Samad is to acknowledge that every dependency you carry — on wealth, reputation, people, outcomes — terminates, properly, in Him alone.',
      },
    ],
    dua: {
      title: 'Before Renewing the Shahada',
      resumeTitle: 'Before Returning to the Shahada',
      arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ ۞ اللَّهُ الصَّمَدُ',
      trans: "Qul huwa-llāhu aḥad, allāhu-ṣ-ṣamad",
      meaning: 'Say: He is Allah, the One. Allah, the Self-Sufficient.',
      source: 'Surah Al-Ikhlas 112:1-2',
    },
    closingDua: {
      title: 'After the Shahada',
      arabic: 'وَإِلَٰهُكُمْ إِلَٰهٌ وَاحِدٌ ۖ لَّا إِلَٰهَ إِلَّا هُوَ الرَّحْمَٰنُ الرَّحِيمُ',
      trans: "Wa ilāhukum ilāhun wāḥid, lā ilāha illā huwa-r-raḥmānu-r-raḥīm",
      meaning: 'And your god is one God. There is no deity except Him, the Most Merciful, the Especially Merciful.',
      source: 'Surah Al-Baqarah 2:163',
    },
    readiness: {
      frame: 'Al-Ahad asks: what else is sharing the throne?',
      yesLabel: 'The throne is undivided when',
      notYetLabel: 'The throne is shared when',
      rows: [
        {
          id: 'A1', attr: 'Al-Ahad', attr_ar: 'الأحد', attrTitle: 'The One',
          attrFrame: 'Is my tawhid operational, or only verbal?',
          yesLabel: 'Tawhid is operational when',
          notYetLabel: 'Tawhid is verbal only when',
          governing: 'I can name what I am tempted to rely on before I rely on Allah — and I refuse it.',
          notYet: 'I affirm tawhid with my tongue while functionally depending on something that is not Him.',
        },
        {
          id: 'A2', attr: 'Al-Ahad',
          governing: 'The fears I carry today are fears of Allah and the fears He permits — not an invented panel of rival authorities.',
          notYet: 'I fear the opinion of a person, a market, or a system in a way that rivals my fear of Allah.',
        },
        {
          id: 'S1', attr: 'As-Samad', attr_ar: 'الصمد', attrTitle: 'The Self-Sufficient Absolute',
          attrFrame: 'Is my ultimate dependency on Him — or am I stopping short of Him?',
          yesLabel: 'Dependency terminates in Him when',
          notYetLabel: 'Dependency stops short when',
          governing: 'When I trace what I am leaning on, the trail ends at As-Samad and not before.',
          notYet: 'My sense of safety terminates in a resource, a relationship, or an outcome — not in Him.',
        },
        {
          id: 'S2', attr: 'As-Samad',
          governing: 'I am not negotiating with Allah as though He needs what I am offering — He is as-Samad, I am the faqir.',
          notYet: 'I am approaching my worship as though I am doing Him a favor that obliges Him in return.',
        },
      ],
      governing: [
        'I can name what I am tempted to rely on before I rely on Allah — and I refuse it.',
        'The fears I carry today are fears of Allah and the fears He permits — not an invented panel of rival authorities.',
        'When I trace what I am leaning on, the trail ends at As-Samad and not before.',
        'I am not negotiating with Allah as though He needs what I am offering — He is as-Samad, I am the faqir.',
      ],
      notYet: [
        'I affirm tawhid with my tongue while functionally depending on something that is not Him.',
        'I fear the opinion of a person, a market, or a system in a way that rivals my fear of Allah.',
        'My sense of safety terminates in a resource, a relationship, or an outcome — not in Him.',
        'I am approaching my worship as though I am doing Him a favor that obliges Him in return.',
      ],
    },
    reflection: {
      frame: 'Al-Ahad tested the throne today. As-Samad tested the direction of my reliance.',
      yesLabel: 'Tawhid was operational when',
      notYetLabel: 'Tawhid was decorative when',
      rows: [
        {
          id: 'RA1', attr: 'Al-Ahad', attr_ar: 'الأحد', attrTitle: 'The One',
          attrFrame: 'Did I live the Shahada, or just recite it?',
          yesLabel: 'I lived the Shahada when',
          notYetLabel: 'I only recited it when',
          governing: 'I caught a moment today where a rival was approaching the throne, and I refused it.',
          notYet: 'I let a fear or hope rise to a station only Allah should occupy.',
        },
        {
          id: 'RS1', attr: 'As-Samad', attr_ar: 'الصمد', attrTitle: 'The Self-Sufficient Absolute',
          attrFrame: 'Did my reliance terminate in Him today?',
          yesLabel: 'Reliance reached Him when',
          notYetLabel: 'Reliance stopped short when',
          governing: 'I stopped leaning on a secondary cause as though it were a primary one.',
          notYet: 'I treated a means as though it were the source, and a source as though it were optional.',
        },
      ],
      governing: [
        'I caught a moment today where a rival was approaching the throne, and I refused it.',
        'I stopped leaning on a secondary cause as though it were a primary one.',
      ],
      notYet: [
        'I let a fear or hope rise to a station only Allah should occupy.',
        'I treated a means as though it were the source, and a source as though it were optional.',
      ],
    },
  },

  'faith-salah': {
    attrs: [
      {
        name: 'Al-Qarib',
        name_ar: 'القريب',
        title: 'The Near',
        body: 'Al-Qarib is closer than the jugular vein. Salah does not transport you to Him — it corrects your posture toward a nearness that was never suspended. The forgetting is ours; the nearness is His.',
      },
      {
        name: 'Al-Mujib',
        name_ar: 'المجيب',
        title: 'The Responsive',
        body: 'Al-Mujib answers the one who calls. Salah is not a monologue — it is framed supplication inside a conversation Allah promises to enter. To pray from Al-Mujib is to believe that the answer is already on its way.',
      },
    ],
    dua: {
      title: 'Before Standing in Salah',
      resumeTitle: 'Before Returning to Salah',
      arabic: 'وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ ۖ أُجِيبُ دَعْوَةَ الدَّاعِ إِذَا دَعَانِ',
      trans: "Wa idhā saʾalaka ʿibādī ʿannī fa-innī qarīb, ujību daʿwata-d-dāʿi idhā daʿān",
      meaning: 'And when My servants ask you concerning Me, indeed I am near. I respond to the invocation of the supplicant when he calls upon Me.',
      source: 'Surah Al-Baqarah 2:186',
    },
    closingDua: {
      title: 'After Salah',
      arabic: 'وَأَقِمِ الصَّلَاةَ لِذِكْرِي',
      trans: "Wa aqimi-ṣ-ṣalāta li-dhikrī",
      meaning: 'And establish prayer for My remembrance.',
      source: 'Surah Ta-Ha 20:14',
    },
    readiness: {
      frame: 'Al-Qarib asks: am I turning toward what is already near, or performing a turn for its own sake?',
      yesLabel: 'I am turning toward Him when',
      notYetLabel: 'I am going through motions when',
      rows: [
        {
          id: 'Q1', attr: 'Al-Qarib', attr_ar: 'القريب', attrTitle: 'The Near',
          attrFrame: 'Am I entering the prayer aware of who it is I am about to stand before?',
          yesLabel: 'I am aware of His nearness when',
          notYetLabel: 'I have forgotten His nearness when',
          governing: 'I am pausing before takbir long enough to remember I am about to stand before Al-Qarib.',
          notYet: 'I am rushing into the niyyah with my mind still on the task I left behind.',
        },
        {
          id: 'Q2', attr: 'Al-Qarib',
          governing: 'I can set this prayer down from the other concerns of the day for its duration.',
          notYet: 'My body is in the prayer and my mind is still solving the problem I left at the desk.',
        },
        {
          id: 'M1', attr: 'Al-Mujib', attr_ar: 'المجيب', attrTitle: 'The Responsive',
          attrFrame: 'Am I praying as a supplicant expecting an answer, or as a task-completer?',
          yesLabel: 'I am supplicating when',
          notYetLabel: 'I am task-completing when',
          governing: 'I am coming to this prayer with something I am actually asking for, not just something to finish.',
          notYet: 'I am treating salah as a slot on the calendar to be checked off and returned to work.',
        },
        {
          id: 'M2', attr: 'Al-Mujib',
          governing: 'I believe He hears this and I am praying accordingly — in wording, in tone, in attention.',
          notYet: 'I am praying as though the line might be dead — mouthing the words without expecting a response.',
        },
      ],
      governing: [
        'I am pausing before takbir long enough to remember I am about to stand before Al-Qarib.',
        'I can set this prayer down from the other concerns of the day for its duration.',
        'I am coming to this prayer with something I am actually asking for, not just something to finish.',
        'I believe He hears this and I am praying accordingly — in wording, in tone, in attention.',
      ],
      notYet: [
        'I am rushing into the niyyah with my mind still on the task I left behind.',
        'My body is in the prayer and my mind is still solving the problem I left at the desk.',
        'I am treating salah as a slot on the calendar to be checked off and returned to work.',
        'I am praying as though the line might be dead — mouthing the words without expecting a response.',
      ],
    },
    reflection: {
      frame: 'Al-Qarib was near through every prayer today. Al-Mujib received what was actually offered.',
      yesLabel: 'Salah was presence when',
      notYetLabel: 'Salah was motion when',
      rows: [
        {
          id: 'RQ1', attr: 'Al-Qarib', attr_ar: 'القريب', attrTitle: 'The Near',
          attrFrame: 'Did I stand before Him today, or just near the rug?',
          yesLabel: 'I stood before Him when',
          notYetLabel: 'I stood near the rug when',
          governing: 'At least one of today\'s prayers had a moment of genuine presence in it.',
          notYet: 'I completed every prayer and cannot recall being present in any of them.',
        },
        {
          id: 'RM1', attr: 'Al-Mujib', attr_ar: 'المجيب', attrTitle: 'The Responsive',
          attrFrame: 'Did I actually ask, or only recite?',
          yesLabel: 'I actually asked when',
          notYetLabel: 'I only recited when',
          governing: 'I made a du\'a in salah today with my full weight behind it.',
          notYet: 'I finished the prayer without having asked Him for anything that mattered to me.',
        },
      ],
      governing: [
        'At least one of today\'s prayers had a moment of genuine presence in it.',
        'I made a du\'a in salah today with my full weight behind it.',
      ],
      notYet: [
        'I completed every prayer and cannot recall being present in any of them.',
        'I finished the prayer without having asked Him for anything that mattered to me.',
      ],
    },
  },

  'faith-zakah': {
    attrs: [
      {
        name: 'Ar-Razzaq',
        name_ar: 'الرزّاق',
        title: 'The Provider',
        body: 'Ar-Razzaq is the source of every dirham in your account. Zakah is not a tax on what you earned — it is a return of what He circulated through you to the chambers He designated. To give zakah is to admit it was never wholly yours.',
      },
      {
        name: 'Al-Karim',
        name_ar: 'الكريم',
        title: 'The Generous',
        body: 'Al-Karim gives without calculation. Giving zakah with Al-Karim in mind means giving as He gives — without keeping score, without reminding the recipient, without using the gift as leverage. The minimum fulfills the fard; the adab perfects it.',
      },
    ],
    dua: {
      title: 'Before Paying Zakah',
      resumeTitle: 'Before Returning to Zakah',
      arabic: 'مَّثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنبَتَتْ سَبْعَ سَنَابِلَ فِي كُلِّ سُنبُلَةٍ مِّائَةُ حَبَّةٍ',
      trans: "Mathalu alladhīna yunfiqūna amwālahum fī sabīli-llāhi ka-mathali ḥabbatin anbatat sabʿa sanābila fī kulli sunbulatin miʾatu ḥabbah",
      meaning: 'The example of those who spend their wealth in the way of Allah is like a seed which grows seven spikes; in each spike is a hundred grains.',
      source: 'Surah Al-Baqarah 2:261',
    },
    closingDua: {
      title: 'After Paying Zakah',
      arabic: 'خُذْ مِنْ أَمْوَالِهِمْ صَدَقَةً تُطَهِّرُهُمْ وَتُزَكِّيهِم بِهَا وَصَلِّ عَلَيْهِمْ ۖ إِنَّ صَلَاتَكَ سَكَنٌ لَّهُمْ',
      trans: "Khudh min amwālihim ṣadaqatan tuṭahhiruhum wa tuzakkīhim bihā, wa ṣalli ʿalayhim inna ṣalātaka sakanun lahum",
      meaning: 'Take from their wealth a charity by which you purify them and cause them to increase, and pray for them — indeed, your prayers are a reassurance for them.',
      source: 'Surah At-Tawbah 9:103',
    },
    readiness: {
      frame: 'Ar-Razzaq asks: are you returning what He circulated through you, or releasing what you felt you owned?',
      yesLabel: 'I am returning His circulation when',
      notYetLabel: 'I am releasing my ownership when',
      rows: [
        {
          id: 'R1', attr: 'Ar-Razzaq', attr_ar: 'الرزّاق', attrTitle: 'The Provider',
          attrFrame: 'Am I approaching zakah as return, or as transfer?',
          yesLabel: 'I see it as return when',
          notYetLabel: 'I see it as transfer when',
          governing: 'I am calculating the full amount honestly — not looking for categories that technically exempt me.',
          notYet: 'I am reading the fiqh with one eye on what reduces my liability rather than what fulfills the haqq.',
        },
        {
          id: 'R2', attr: 'Ar-Razzaq',
          governing: 'I am paying zakah from a posture of gratitude for what remains, not resentment for what leaves.',
          notYet: 'I am quietly tallying what zakah "costs" me as though it were mine to lose.',
        },
        {
          id: 'K1', attr: 'Al-Karim', attr_ar: 'الكريم', attrTitle: 'The Generous',
          attrFrame: 'Am I giving the way Al-Karim gives?',
          yesLabel: 'I give as Al-Karim gives when',
          notYetLabel: 'I give with conditions when',
          governing: 'I am giving without following the gift into the recipient\'s hand to audit how they spend it.',
          notYet: 'I am mentally supervising how the mustahiq will use what I paid.',
        },
        {
          id: 'K2', attr: 'Al-Karim',
          governing: 'This giving protects the dignity of the one receiving — private where possible, silent where preferable.',
          notYet: 'I am letting it be known that I gave, in a way that erodes the dignity of the recipient or inflates my own standing.',
        },
      ],
      governing: [
        'I am calculating the full amount honestly — not looking for categories that technically exempt me.',
        'I am paying zakah from a posture of gratitude for what remains, not resentment for what leaves.',
        'I am giving without following the gift into the recipient\'s hand to audit how they spend it.',
        'This giving protects the dignity of the one receiving — private where possible, silent where preferable.',
      ],
      notYet: [
        'I am reading the fiqh with one eye on what reduces my liability rather than what fulfills the haqq.',
        'I am quietly tallying what zakah "costs" me as though it were mine to lose.',
        'I am mentally supervising how the mustahiq will use what I paid.',
        'I am letting it be known that I gave, in a way that erodes the dignity of the recipient or inflates my own standing.',
      ],
    },
    reflection: {
      frame: 'Ar-Razzaq watched the calculation. Al-Karim watched the manner.',
      yesLabel: 'Zakah was an offering when',
      notYetLabel: 'Zakah was a transfer when',
      rows: [
        {
          id: 'RR1', attr: 'Ar-Razzaq', attr_ar: 'الرزّاق', attrTitle: 'The Provider',
          attrFrame: 'Did I return honestly?',
          yesLabel: 'I returned honestly when',
          notYetLabel: 'I withheld when',
          governing: 'I paid the full amount due without hunting for technical shelters.',
          notYet: 'I took a position on my zakah liability that I know I would not take in front of a scholar.',
        },
        {
          id: 'RK1', attr: 'Al-Karim', attr_ar: 'الكريم', attrTitle: 'The Generous',
          attrFrame: 'Did I give the way He gives?',
          yesLabel: 'I gave like Al-Karim when',
          notYetLabel: 'I gave with strings when',
          governing: 'I protected the dignity of the one receiving, as Al-Karim protects mine.',
          notYet: 'I reminded someone of what I gave them, or let the giving inflate me.',
        },
      ],
      governing: [
        'I paid the full amount due without hunting for technical shelters.',
        'I protected the dignity of the one receiving, as Al-Karim protects mine.',
      ],
      notYet: [
        'I took a position on my zakah liability that I know I would not take in front of a scholar.',
        'I reminded someone of what I gave them, or let the giving inflate me.',
      ],
    },
  },

  'faith-sawm': {
    attrs: [
      {
        name: 'As-Sabur',
        name_ar: 'الصبور',
        title: 'The Patient',
        body: 'As-Sabur does not rush. Sawm is not primarily about food — it is an apprenticeship in the sabr of waiting. The fast trains you to sit with hunger, with lowered expectation, with delayed reward, and to do so without dropping your adab.',
      },
      {
        name: 'Ash-Shakur',
        name_ar: 'الشكور',
        title: 'The Appreciative',
        body: 'Ash-Shakur notices the smallest exertion. Ramadan exhausts, and Ash-Shakur catches each restrained tongue, each held patience, each night of qiyam. The fast offered sincerely is multiplied without measure — that is the shape of His shukr toward His servants.',
      },
    ],
    dua: {
      title: 'Before the Fast',
      resumeTitle: 'Before Returning to the Fast',
      arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ كَمَا كُتِبَ عَلَى الَّذِينَ مِن قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ',
      trans: "Yā ayyuhā alladhīna āmanū kutiba ʿalaykumu-ṣ-ṣiyāmu kamā kutiba ʿalā alladhīna min qablikum laʿallakum tattaqūn",
      meaning: 'O you who have believed, fasting is prescribed upon you as it was prescribed upon those before you, that you may become God-conscious.',
      source: 'Surah Al-Baqarah 2:183',
    },
    closingDua: {
      title: 'After the Fast',
      arabic: 'وَلِتُكْمِلُوا الْعِدَّةَ وَلِتُكَبِّرُوا اللَّهَ عَلَىٰ مَا هَدَاكُمْ وَلَعَلَّكُمْ تَشْكُرُونَ',
      trans: "Wa litukmilū-l-ʿiddata wa litukabbirū-llāha ʿalā mā hadākum wa laʿallakum tashkurūn",
      meaning: 'That you may complete the period and magnify Allah for that to which He has guided you, and perhaps you will be grateful.',
      source: 'Surah Al-Baqarah 2:185',
    },
    readiness: {
      frame: 'As-Sabur asks: is the fast changing my character, or just my schedule?',
      yesLabel: 'The fast is teaching me when',
      notYetLabel: 'The fast is only shifting my clock when',
      rows: [
        {
          id: 'SB1', attr: 'As-Sabur', attr_ar: 'الصبور', attrTitle: 'The Patient',
          attrFrame: 'Am I keeping sabr alongside the fast, or irritability in place of eating?',
          yesLabel: 'Sabr is present when',
          notYetLabel: 'Irritability is present when',
          governing: 'My hunger today is not becoming a license to be short with the people around me.',
          notYet: 'I am using the fast as cover for a shortness of temper I would not otherwise accept.',
        },
        {
          id: 'SB2', attr: 'As-Sabur',
          governing: 'I am holding tongue, eye, and limb — not just stomach.',
          notYet: 'I am abstaining from food but indulging the eye, tongue, or phone exactly as before.',
        },
        {
          id: 'SH1', attr: 'Ash-Shakur', attr_ar: 'الشكور', attrTitle: 'The Appreciative',
          attrFrame: 'Am I fasting as worship to be offered — or as a hardship to be endured?',
          yesLabel: 'The fast is an offering when',
          notYetLabel: 'The fast is a grievance when',
          governing: 'I am treating the hunger as an opening for du\'a, not a grievance to get through.',
          notYet: 'I am counting down the minutes to maghrib as though the fast were the enemy.',
        },
        {
          id: 'SH2', attr: 'Ash-Shakur',
          governing: 'I am entering iftar remembering who fed me and with what restraint I should receive it.',
          notYet: 'I am about to break the fast with a posture that undoes everything the fast was teaching.',
        },
      ],
      governing: [
        'My hunger today is not becoming a license to be short with the people around me.',
        'I am holding tongue, eye, and limb — not just stomach.',
        'I am treating the hunger as an opening for du\'a, not a grievance to get through.',
        'I am entering iftar remembering who fed me and with what restraint I should receive it.',
      ],
      notYet: [
        'I am using the fast as cover for a shortness of temper I would not otherwise accept.',
        'I am abstaining from food but indulging the eye, tongue, or phone exactly as before.',
        'I am counting down the minutes to maghrib as though the fast were the enemy.',
        'I am about to break the fast with a posture that undoes everything the fast was teaching.',
      ],
    },
    reflection: {
      frame: 'As-Sabur watched what I held. Ash-Shakur counted what I offered.',
      yesLabel: 'The fast shaped me when',
      notYetLabel: 'The fast skimmed off me when',
      rows: [
        {
          id: 'RSB1', attr: 'As-Sabur', attr_ar: 'الصبور', attrTitle: 'The Patient',
          attrFrame: 'Did I fast the tongue and eye, or only the stomach?',
          yesLabel: 'I fasted the whole self when',
          notYetLabel: 'I fasted only food when',
          governing: 'I held my tongue or my gaze today in a moment where the fast made the restraint possible.',
          notYet: 'I fasted from food and spent the hunger indulging the eye and the phone.',
        },
        {
          id: 'RSH1', attr: 'Ash-Shakur', attr_ar: 'الشكور', attrTitle: 'The Appreciative',
          attrFrame: 'Did I receive the iftar with shukr, or tear into it?',
          yesLabel: 'I received iftar with shukr when',
          notYetLabel: 'I rushed iftar when',
          governing: 'I paused at iftar long enough to remember who provided it.',
          notYet: 'I broke the fast as though breaking a restriction, not ending an offering.',
        },
      ],
      governing: [
        'I held my tongue or my gaze today in a moment where the fast made the restraint possible.',
        'I paused at iftar long enough to remember who provided it.',
      ],
      notYet: [
        'I fasted from food and spent the hunger indulging the eye and the phone.',
        'I broke the fast as though breaking a restriction, not ending an offering.',
      ],
    },
  },

  'faith-hajj': {
    attrs: [
      {
        name: 'Al-Malik',
        name_ar: 'الملك',
        title: 'The Sovereign',
        body: 'Al-Malik owns every place and permits the pilgrim to approach one. Hajj strips the wealth, the title, the clothing that distinguished you — returning you to the two white cloths of a pauper before the Sovereign. What sovereignty you thought you held is recalled at the miqat.',
      },
      {
        name: 'Al-Quddus',
        name_ar: 'القدوس',
        title: 'The Pure',
        body: 'Al-Quddus demands that the pilgrim come purified — from shirk, from grudges, from unlawful wealth. Hajj is the one worship where the form is the purification: the tawaf, the sa\'y, the wuquf are not symbolic; they are the scrubbing.',
      },
    ],
    dua: {
      title: 'Before Hajj / Umrah Work',
      resumeTitle: 'Before Returning to Hajj Work',
      arabic: 'الْحَجُّ أَشْهُرٌ مَّعْلُومَاتٌ ۚ فَمَن فَرَضَ فِيهِنَّ الْحَجَّ فَلَا رَفَثَ وَلَا فُسُوقَ وَلَا جِدَالَ فِي الْحَجِّ',
      trans: "Al-ḥajju ashhurun maʿlūmāt, faman faraḍa fīhinna-l-ḥajja fa-lā rafatha wa lā fusūqa wa lā jidāla fī-l-ḥajj",
      meaning: 'Hajj is in well-known months. Whoever undertakes the pilgrimage therein, there is no sexual relations, no wrongdoing, and no quarrelling during Hajj.',
      source: 'Surah Al-Baqarah 2:197',
    },
    closingDua: {
      title: 'After Hajj Work',
      arabic: 'فَإِذَا قَضَيْتُم مَّنَاسِكَكُمْ فَاذْكُرُوا اللَّهَ كَذِكْرِكُمْ آبَاءَكُمْ أَوْ أَشَدَّ ذِكْرًا',
      trans: "Fa-idhā qaḍaytum manāsikakum fa-dhkurū-llāha ka-dhikrikum ābāʾakum aw ashadda dhikrā",
      meaning: 'When you have completed your rites, remember Allah as you remember your forefathers, or with much greater remembrance.',
      source: 'Surah Al-Baqarah 2:200',
    },
    readiness: {
      frame: 'Al-Malik asks: have you come as a servant, or as someone who is used to being served?',
      yesLabel: 'I am approaching as a servant when',
      notYetLabel: 'I am approaching as a VIP when',
      rows: [
        {
          id: 'MK1', attr: 'Al-Malik', attr_ar: 'الملك', attrTitle: 'The Sovereign',
          attrFrame: 'Am I approaching His House as a pauper, or still carrying my status?',
          yesLabel: 'I am approaching as a pauper when',
          notYetLabel: 'I am still carrying rank when',
          governing: 'I am willing to be inconvenienced, crowded, and unrecognized here — the status I left at the miqat stays left.',
          notYet: 'I am expecting a tier of service in His House that would betray what the ihram took off.',
        },
        {
          id: 'MK2', attr: 'Al-Malik',
          governing: 'My planning serves the ibadah, not the opposite — comfort is a tool, not the point.',
          notYet: 'I am letting logistics, photos, or status drive decisions that should be driven by the manasik.',
        },
        {
          id: 'QD1', attr: 'Al-Quddus', attr_ar: 'القدوس', attrTitle: 'The Pure',
          attrFrame: 'Am I arriving purified — from grievance, from haram wealth, from lingering shirk?',
          yesLabel: 'I am arriving purified when',
          notYetLabel: 'I am carrying unsettled burdens when',
          governing: 'I have settled debts, forgiven what I can, asked forgiveness where I owe it — before standing in His House.',
          notYet: 'I am bringing an unresolved injustice, debt, or grudge to a pilgrimage that requires none of them.',
        },
        {
          id: 'QD2', attr: 'Al-Quddus',
          governing: 'The wealth funding this Hajj has been examined — it is halal in origin and purified in its means.',
          notYet: 'I have not looked honestly at where this Hajj is being paid for from.',
        },
      ],
      governing: [
        'I am willing to be inconvenienced, crowded, and unrecognized here — the status I left at the miqat stays left.',
        'My planning serves the ibadah, not the opposite — comfort is a tool, not the point.',
        'I have settled debts, forgiven what I can, asked forgiveness where I owe it — before standing in His House.',
        'The wealth funding this Hajj has been examined — it is halal in origin and purified in its means.',
      ],
      notYet: [
        'I am expecting a tier of service in His House that would betray what the ihram took off.',
        'I am letting logistics, photos, or status drive decisions that should be driven by the manasik.',
        'I am bringing an unresolved injustice, debt, or grudge to a pilgrimage that requires none of them.',
        'I have not looked honestly at where this Hajj is being paid for from.',
      ],
    },
    reflection: {
      frame: 'Al-Malik witnessed my approach. Al-Quddus witnessed the state I brought.',
      yesLabel: 'The pilgrimage shaped me when',
      notYetLabel: 'The pilgrimage passed over me when',
      rows: [
        {
          id: 'RMK1', attr: 'Al-Malik', attr_ar: 'الملك', attrTitle: 'The Sovereign',
          attrFrame: 'Did I leave my status at the miqat today?',
          yesLabel: 'I left my status when',
          notYetLabel: 'I carried status in when',
          governing: 'I let a moment of inconvenience pass without demanding the treatment I am used to.',
          notYet: 'I asserted rank or comfort at the expense of another pilgrim today.',
        },
        {
          id: 'RQD1', attr: 'Al-Quddus', attr_ar: 'القدوس', attrTitle: 'The Pure',
          attrFrame: 'Did I keep the ihram of the heart, not just the body?',
          yesLabel: 'The heart\'s ihram held when',
          notYetLabel: 'The heart\'s ihram slipped when',
          governing: 'I avoided rafath, fusuq, and jidal today in both speech and inner posture.',
          notYet: 'I entered a quarrel or coarse word that the prohibition was meant to prevent.',
        },
      ],
      governing: [
        'I let a moment of inconvenience pass without demanding the treatment I am used to.',
        'I avoided rafath, fusuq, and jidal today in both speech and inner posture.',
      ],
      notYet: [
        'I asserted rank or comfort at the expense of another pilgrim today.',
        'I entered a quarrel or coarse word that the prohibition was meant to prevent.',
      ],
    },
  },

  sources: {
    attrs: [
      {
        name: 'Al-Hadi',
        name_ar: 'الهادي',
        title: 'The Guide',
        body: 'Al-Hadi guides the one who asks to be guided. The sources — Qur\'an, Sunnah, the transmitted tradition — do not disclose themselves to the careless reader. Al-Hadi meets the adab you bring. Come as a student; leave as a student.',
      },
      {
        name: 'Al-Alim',
        name_ar: 'العليم',
        title: 'The All-Knowing',
        body: 'Al-Alim knows what you do not and what you pretend to. To open the sources under Al-Alim is to come without the pose of knowing — neither inflating what you understand nor denying what you do not.',
      },
    ],
    dua: {
      title: 'Before Studying the Sources',
      resumeTitle: 'Before Returning to the Sources',
      arabic: 'وَقُل رَّبِّ زِدْنِي عِلْمًا',
      trans: "Wa qul rabbi zidnī ʿilmā",
      meaning: 'And say: My Lord, increase me in knowledge.',
      source: 'Surah Ta-Ha 20:114',
    },
    closingDua: {
      title: 'After Studying the Sources',
      arabic: 'إِنَّمَا يَخْشَى اللَّهَ مِنْ عِبَادِهِ الْعُلَمَاءُ',
      trans: "Innamā yakhshā-llāha min ʿibādihi-l-ʿulamāʾ",
      meaning: 'It is only those who have knowledge among His servants that fear Allah.',
      source: 'Surah Fatir 35:28',
    },
    readiness: {
      frame: 'Al-Hadi asks: are you here to be guided, or to collect confirmation?',
      yesLabel: 'I am here to be guided when',
      notYetLabel: 'I am here to confirm myself when',
      rows: [
        {
          id: 'H1', attr: 'Al-Hadi', attr_ar: 'الهادي', attrTitle: 'The Guide',
          attrFrame: 'Am I reading to be corrected, or to be confirmed?',
          yesLabel: 'I am reading to be corrected when',
          notYetLabel: 'I am reading for confirmation when',
          governing: 'I am willing for this study to move me from a position I am currently holding.',
          notYet: 'I am scanning the text for the quote that proves the position I already have.',
        },
        {
          id: 'H2', attr: 'Al-Hadi',
          governing: 'I am reading within the interpretive tradition, not plucking ayat or ahadith out of their context.',
          notYet: 'I am reading a verse without its tafsir and drawing a ruling from the translation alone.',
        },
        {
          id: 'I1', attr: 'Al-Alim', attr_ar: 'العليم', attrTitle: 'The All-Knowing',
          attrFrame: 'Am I holding my level of knowledge honestly?',
          yesLabel: 'I am holding my level honestly when',
          notYetLabel: 'I am inflating my level when',
          governing: 'I can say "I do not know" in this subject without my identity being threatened by saying so.',
          notYet: 'I am stating as established what I only half-remember from a lecture.',
        },
        {
          id: 'I2', attr: 'Al-Alim',
          governing: 'If I am about to issue a position, I know which scholar or text I am standing on.',
          notYet: 'I am about to declare a ruling without being able to name where I learned it.',
        },
      ],
      governing: [
        'I am willing for this study to move me from a position I am currently holding.',
        'I am reading within the interpretive tradition, not plucking ayat or ahadith out of their context.',
        'I can say "I do not know" in this subject without my identity being threatened by saying so.',
        'If I am about to issue a position, I know which scholar or text I am standing on.',
      ],
      notYet: [
        'I am scanning the text for the quote that proves the position I already have.',
        'I am reading a verse without its tafsir and drawing a ruling from the translation alone.',
        'I am stating as established what I only half-remember from a lecture.',
        'I am about to declare a ruling without being able to name where I learned it.',
      ],
    },
    reflection: {
      frame: 'Al-Hadi guides the honest reader. Al-Alim sees what the reader pretends to know.',
      yesLabel: 'The study formed me when',
      notYetLabel: 'The study confirmed me when',
      rows: [
        {
          id: 'RH1', attr: 'Al-Hadi', attr_ar: 'الهادي', attrTitle: 'The Guide',
          attrFrame: 'Did I let the text move me today?',
          yesLabel: 'The text moved me when',
          notYetLabel: 'I moved the text when',
          governing: 'The study shifted a position I walked in with — and I let it.',
          notYet: 'I walked out with the same position I walked in with, only with more quotes.',
        },
        {
          id: 'RI1', attr: 'Al-Alim', attr_ar: 'العليم', attrTitle: 'The All-Knowing',
          attrFrame: 'Did I hold my level of knowledge honestly today?',
          yesLabel: 'I held my level honestly when',
          notYetLabel: 'I overstated when',
          governing: 'I said "I do not know" where it was true, and I meant it.',
          notYet: 'I represented inference as established knowledge because the audience was listening.',
        },
      ],
      governing: [
        'The study shifted a position I walked in with — and I let it.',
        'I said "I do not know" where it was true, and I meant it.',
      ],
      notYet: [
        'I walked out with the same position I walked in with, only with more quotes.',
        'I represented inference as established knowledge because the audience was listening.',
      ],
    },
  },

  'faith-core': {
    attrs: [
      {
        name: 'Al-Muhyi',
        name_ar: 'المحيي',
        title: 'The Giver of Life',
        body: 'Al-Muhyi gives life to what would otherwise be inert. The Daruriyyat are not optional; they are the life-support of the deen. To miss the fard is not to miss an embellishment — it is to let something die that Al-Muhyi meant to keep alive in you.',
      },
      {
        name: 'Al-Qayyum',
        name_ar: 'القيوم',
        title: 'The Self-Subsisting Sustainer',
        body: 'Al-Qayyum is the One upon whom everything stands. The Daruriyyat are the minimum load-bearing members of the deen\'s structure. Remove them and the rest gives way. The Core board is not about doing more — it is about not letting the load-bearing walls fail.',
      },
    ],
    dua: {
      title: 'Before the Core (Daruriyyat)',
      resumeTitle: 'Before Returning to the Core',
      arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ',
      trans: "Allāhu lā ilāha illā huwa-l-ḥayyu-l-qayyūm",
      meaning: 'Allah — there is no deity except Him, the Ever-Living, the Sustainer of existence.',
      source: 'Surah Al-Baqarah 2:255 (Ayat al-Kursi)',
    },
    closingDua: {
      title: 'After Tending the Core',
      arabic: 'رَبَّنَا مَا خَلَقْتَ هَٰذَا بَاطِلًا سُبْحَانَكَ فَقِنَا عَذَابَ النَّارِ',
      trans: "Rabbanā mā khalaqta hādhā bāṭilan subḥānaka fa-qinā ʿadhāba-n-nār",
      meaning: 'Our Lord, You have not created this in vain — exalted are You; protect us from the punishment of the Fire.',
      source: 'Surah Ali Imran 3:191',
    },
    readiness: {
      frame: 'Al-Muhyi asks: are the fard still alive in me, or has something begun to die?',
      yesLabel: 'The fard are alive when',
      notYetLabel: 'Something is quietly dying when',
      rows: [
        {
          id: 'MH1', attr: 'Al-Muhyi', attr_ar: 'المحيي', attrTitle: 'The Giver of Life',
          attrFrame: 'Is a fard quietly slipping — and have I been pretending otherwise?',
          yesLabel: 'I am honest about the fard when',
          notYetLabel: 'I am dodging a slip when',
          governing: 'I am looking directly at whichever fard has been most at risk this week — not avoiding it.',
          notYet: 'I know which obligation has been slipping and I am not willing to name it yet.',
        },
        {
          id: 'MH2', attr: 'Al-Muhyi',
          governing: 'I am treating the Core board as the floor — the non-negotiable baseline — not as an optional tier.',
          notYet: 'I am moving Core items around the board the way I would move excellence items.',
        },
        {
          id: 'QY1', attr: 'Al-Qayyum', attr_ar: 'القيوم', attrTitle: 'The Self-Subsisting Sustainer',
          attrFrame: 'Are the load-bearing walls sound before I add rooms?',
          yesLabel: 'The load-bearing walls are sound when',
          notYetLabel: 'I am adding rooms on a cracked foundation when',
          governing: 'I am not investing in Hajiyyat or Tahsiniyyat while a Daruriyyat fard is not yet stable.',
          notYet: 'I am building outward on a structure whose fard walls I have not yet repaired.',
        },
      ],
      governing: [
        'I am looking directly at whichever fard has been most at risk this week — not avoiding it.',
        'I am treating the Core board as the floor — the non-negotiable baseline — not as an optional tier.',
        'I am not investing in Hajiyyat or Tahsiniyyat while a Daruriyyat fard is not yet stable.',
      ],
      notYet: [
        'I know which obligation has been slipping and I am not willing to name it yet.',
        'I am moving Core items around the board the way I would move excellence items.',
        'I am building outward on a structure whose fard walls I have not yet repaired.',
      ],
    },
    reflection: {
      frame: 'Al-Muhyi kept the fard alive today. Al-Qayyum held the load.',
      yesLabel: 'The floor held when',
      notYetLabel: 'The floor gave when',
      rows: [
        {
          id: 'RMH1', attr: 'Al-Muhyi', attr_ar: 'المحيي', attrTitle: 'The Giver of Life',
          attrFrame: 'Did I keep the fard today, or let one slip?',
          yesLabel: 'The fard was kept when',
          notYetLabel: 'The fard slipped when',
          governing: 'Every fard I owed today was discharged, and any missed one has a concrete plan to be made up.',
          notYet: 'A fard slipped today and I did not catch it or plan to repair it.',
        },
        {
          id: 'RQY1', attr: 'Al-Qayyum', attr_ar: 'القيوم', attrTitle: 'The Self-Subsisting Sustainer',
          attrFrame: 'Did I honor the floor, or build past it?',
          yesLabel: 'I honored the floor when',
          notYetLabel: 'I built past a broken floor when',
          governing: 'I declined an "excellence" item today because a Core item was unfinished.',
          notYet: 'I chose a growth or excellence item today while a Core item was unattended.',
        },
      ],
      governing: [
        'Every fard I owed today was discharged, and any missed one has a concrete plan to be made up.',
        'I declined an "excellence" item today because a Core item was unfinished.',
      ],
      notYet: [
        'A fard slipped today and I did not catch it or plan to repair it.',
        'I chose a growth or excellence item today while a Core item was unattended.',
      ],
    },
  },

  'faith-growth': {
    attrs: [
      {
        name: 'Ar-Rafi',
        name_ar: 'الرافع',
        title: 'The Exalter',
        body: 'Ar-Rafi raises in station the one who reaches beyond the floor. The Hajiyyat are not fard, but they are the difference between a deen that survives and one that grows. To neglect them is not kufr — it is a refusal of the ascent Ar-Rafi is offering.',
      },
      {
        name: 'Al-Fattah',
        name_ar: 'الفتاح',
        title: 'The Opener',
        body: 'Al-Fattah opens what was closed. Growth in the deen is not linear — it moves through openings: a suddenly-held adhkar, a newly-kept night, an understanding finally received. To walk Hajiyyat with Al-Fattah is to keep knocking.',
      },
    ],
    dua: {
      title: 'Before Growth Work (Hajiyyat)',
      resumeTitle: 'Before Returning to Growth',
      arabic: 'يَرْفَعِ اللَّهُ الَّذِينَ آمَنُوا مِنكُمْ وَالَّذِينَ أُوتُوا الْعِلْمَ دَرَجَاتٍ',
      trans: "Yarfaʿi-llāhu alladhīna āmanū minkum wa-alladhīna ūtū-l-ʿilma darajāt",
      meaning: 'Allah will raise in rank those who have believed among you and those who were given knowledge.',
      source: 'Surah Al-Mujadila 58:11',
    },
    closingDua: {
      title: 'After Growth Work',
      arabic: 'رَبَّنَا افْتَحْ بَيْنَنَا وَبَيْنَ قَوْمِنَا بِالْحَقِّ وَأَنتَ خَيْرُ الْفَاتِحِينَ',
      trans: "Rabbanā-ftaḥ baynanā wa bayna qawminā bi-l-ḥaqqi wa anta khayru-l-fātiḥīn",
      meaning: 'Our Lord, decide between us and our people in truth — and You are the best of those who give decision.',
      source: 'Surah Al-Araf 7:89',
    },
    readiness: {
      frame: 'Ar-Rafi asks: are you actually reaching, or merely maintaining?',
      yesLabel: 'I am reaching when',
      notYetLabel: 'I am only maintaining when',
      rows: [
        {
          id: 'RF1', attr: 'Ar-Rafi', attr_ar: 'الرافع', attrTitle: 'The Exalter',
          attrFrame: 'Am I reaching past the fard, or coasting on it?',
          yesLabel: 'I am reaching when',
          notYetLabel: 'I am coasting when',
          governing: 'I am adding one nafilah, one dhikr, or one act of birr that I did not owe — and intending it for Him.',
          notYet: 'I am relabelling the fard I already do as "growth" so I do not have to add anything.',
        },
        {
          id: 'RF2', attr: 'Ar-Rafi',
          governing: 'I am willing for the growth to be small — the niyyah is what Ar-Rafi raises, not the size.',
          notYet: 'I am postponing growth until I can "do it properly" — and the postponement has become the pattern.',
        },
        {
          id: 'FT1', attr: 'Al-Fattah', attr_ar: 'الفتاح', attrTitle: 'The Opener',
          attrFrame: 'Am I knocking, or waiting for the door to open on its own?',
          yesLabel: 'I am knocking when',
          notYetLabel: 'I am waiting passively when',
          governing: 'I have asked Allah today for an opening in a specific area of my deen — and I am working toward what I asked for.',
          notYet: 'I am asking for growth in du\'a and taking no step toward the door I am asking to be opened.',
        },
        {
          id: 'FT2', attr: 'Al-Fattah',
          governing: 'When an opening arrives, I walk through it — even if the timing is inconvenient.',
          notYet: 'An opening came and I declined it because it interrupted my schedule.',
        },
      ],
      governing: [
        'I am adding one nafilah, one dhikr, or one act of birr that I did not owe — and intending it for Him.',
        'I am willing for the growth to be small — the niyyah is what Ar-Rafi raises, not the size.',
        'I have asked Allah today for an opening in a specific area of my deen — and I am working toward what I asked for.',
        'When an opening arrives, I walk through it — even if the timing is inconvenient.',
      ],
      notYet: [
        'I am relabelling the fard I already do as "growth" so I do not have to add anything.',
        'I am postponing growth until I can "do it properly" — and the postponement has become the pattern.',
        'I am asking for growth in du\'a and taking no step toward the door I am asking to be opened.',
        'An opening came and I declined it because it interrupted my schedule.',
      ],
    },
    reflection: {
      frame: 'Ar-Rafi noted what I reached for. Al-Fattah noted which doors I walked through.',
      yesLabel: 'Growth was real when',
      notYetLabel: 'Growth was rhetorical when',
      rows: [
        {
          id: 'RRF1', attr: 'Ar-Rafi', attr_ar: 'الرافع', attrTitle: 'The Exalter',
          attrFrame: 'Did I reach past the floor today?',
          yesLabel: 'I reached when',
          notYetLabel: 'I coasted when',
          governing: 'I added at least one small act today that I did not owe — for His sake.',
          notYet: 'I did only what I had to, and labelled it as enough.',
        },
        {
          id: 'RFT1', attr: 'Al-Fattah', attr_ar: 'الفتاح', attrTitle: 'The Opener',
          attrFrame: 'Did I walk through the doors He opened today?',
          yesLabel: 'I walked through when',
          notYetLabel: 'I walked past when',
          governing: 'An opening appeared and I stepped through it rather than past it.',
          notYet: 'I noticed an opening and kept walking because it did not fit my plan.',
        },
      ],
      governing: [
        'I added at least one small act today that I did not owe — for His sake.',
        'An opening appeared and I stepped through it rather than past it.',
      ],
      notYet: [
        'I did only what I had to, and labelled it as enough.',
        'I noticed an opening and kept walking because it did not fit my plan.',
      ],
    },
  },

  'faith-excellence': {
    attrs: [
      {
        name: 'Al-Muhsin',
        name_ar: 'المحسن',
        title: 'The Excellence-Giver',
        body: 'Al-Muhsin is the source of every act of ihsan you perform — it is His excellence operating through you when you let it. The Tahsiniyyat are the ornaments, yes, but ihsan itself is the soul of the deen. "Worship Allah as though you see Him" (Hadith Jibril) is the aim of this board.',
      },
      {
        name: 'Al-Jamil',
        name_ar: 'الجميل',
        title: 'The Beautiful',
        body: 'Al-Jamil loves beauty — not the beauty of display, but the beauty of manner. The Tahsiniyyat are the refinements that beautify a deen already structurally sound: the adab in the greeting, the care in the wording, the quality in what is offered to guests and to worship.',
      },
    ],
    dua: {
      title: 'Before Excellence Work (Tahsiniyyat)',
      resumeTitle: 'Before Returning to Excellence',
      arabic: 'وَأَحْسِنُوا ۛ إِنَّ اللَّهَ يُحِبُّ الْمُحْسِنِينَ',
      trans: "Wa aḥsinū, inna-llāha yuḥibbu-l-muḥsinīn",
      meaning: 'And do good — indeed, Allah loves those who do good.',
      source: 'Surah Al-Baqarah 2:195',
    },
    closingDua: {
      title: 'After Excellence Work',
      arabic: 'هَلْ جَزَاءُ الْإِحْسَانِ إِلَّا الْإِحْسَانُ',
      trans: "Hal jazāʾu-l-iḥsāni illā-l-iḥsān",
      meaning: 'Is the reward for good anything but good?',
      source: 'Surah Ar-Rahman 55:60',
    },
    readiness: {
      frame: 'Al-Muhsin asks: am I worshipping as though I see Him — or performing a version He would not recognize?',
      yesLabel: 'Ihsan is operating when',
      notYetLabel: 'Ihsan is performed-of when',
      rows: [
        {
          id: 'MN1', attr: 'Al-Muhsin', attr_ar: 'المحسن', attrTitle: 'The Excellence-Giver',
          attrFrame: 'Am I offering this act to Him with the quality I would offer in front of Him?',
          yesLabel: 'I am offering with ihsan when',
          notYetLabel: 'I am performing for a gaze when',
          governing: 'The quality of this act is what it would be if I could see Him watching — not what it would be if a person were.',
          notYet: 'This act improves when someone is watching and relaxes when they look away.',
        },
        {
          id: 'MN2', attr: 'Al-Muhsin',
          governing: 'I am not adding excellence on top of a shaky core — my fard is intact first.',
          notYet: 'I am chasing ornamentation while a fard is being treated as optional.',
        },
        {
          id: 'JM1', attr: 'Al-Jamil', attr_ar: 'الجميل', attrTitle: 'The Beautiful',
          attrFrame: 'Am I attending to the adab — the manner, not just the act?',
          yesLabel: 'I am attending to adab when',
          notYetLabel: 'I am skipping adab when',
          governing: 'I am paying attention to how this is offered — the tone, the timing, the words around it.',
          notYet: 'I am delivering the right act with a manner that contradicts the act.',
        },
        {
          id: 'JM2', attr: 'Al-Jamil',
          governing: 'Beauty here means restraint — I am not mistaking ornament for extravagance.',
          notYet: 'I am calling waste "beauty" — crossing from Tahsiniyyat into israf.',
        },
      ],
      governing: [
        'The quality of this act is what it would be if I could see Him watching — not what it would be if a person were.',
        'I am not adding excellence on top of a shaky core — my fard is intact first.',
        'I am paying attention to how this is offered — the tone, the timing, the words around it.',
        'Beauty here means restraint — I am not mistaking ornament for extravagance.',
      ],
      notYet: [
        'This act improves when someone is watching and relaxes when they look away.',
        'I am chasing ornamentation while a fard is being treated as optional.',
        'I am delivering the right act with a manner that contradicts the act.',
        'I am calling waste "beauty" — crossing from Tahsiniyyat into israf.',
      ],
    },
    reflection: {
      frame: 'Al-Muhsin witnessed the quality of the act. Al-Jamil witnessed the quality of the manner.',
      yesLabel: 'Ihsan was genuine when',
      notYetLabel: 'Ihsan was decorative when',
      rows: [
        {
          id: 'RMN1', attr: 'Al-Muhsin', attr_ar: 'المحسن', attrTitle: 'The Excellence-Giver',
          attrFrame: 'Did I worship today as though I saw Him?',
          yesLabel: 'I worshipped as though I saw Him when',
          notYetLabel: 'I worshipped for others when',
          governing: 'At least one act of worship today was shaped by the awareness that He sees, not that they do.',
          notYet: 'An act I performed today was being tuned to who was watching.',
        },
        {
          id: 'RJM1', attr: 'Al-Jamil', attr_ar: 'الجميل', attrTitle: 'The Beautiful',
          attrFrame: 'Did I pair the act with the adab, or strip one from the other?',
          yesLabel: 'Act and adab were paired when',
          notYetLabel: 'Act and adab were stripped apart when',
          governing: 'I offered the right act today with the manner the act deserved.',
          notYet: 'I did the right thing today with a manner that undid most of it.',
        },
      ],
      governing: [
        'At least one act of worship today was shaped by the awareness that He sees, not that they do.',
        'I offered the right act today with the manner the act deserved.',
      ],
      notYet: [
        'An act I performed today was being tuned to who was watching.',
        'I did the right thing today with a manner that undid most of it.',
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
      arabic: 'الَّذِي خَلَقَنِي فَهُوَ يَهْدِينِ وَالَّذِي هُوَ يُطْعِمُنِي وَيَسْقِينِ وَإِذَا مَرِضْتُ فَهُوَ يَشْفِينِ',
      trans: "Alladhī khalaqanī fa-huwa yahdīn, walladhī huwa yuṭʿimunī wa yasqīn, wa idhā mariḍtu fa-huwa yashfīn",
      meaning: 'Who created me, and He guides me; and He is the One who feeds me and gives me drink; and when I am ill, it is He who cures me.',
      source: 'Quran 26:78\u201380',
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

  'life-physical': {
    attrs: [
      {
        name: 'Al-Muhyi',
        name_ar: 'المحيي',
        title: 'The Giver of Life',
        body: 'Al-Muhyi is the one who gives life — breath, heartbeat, the quiet reanimation of tired limbs after rest. The body is not yours to drive into the ground; it is an amanah that Al-Muhyi placed in your care. To neglect it is to treat a trust as disposable. To tend to it is to cooperate with the One who keeps you alive.',
      },
      {
        name: 'Ash-Shafi',
        name_ar: 'الشافي',
        title: 'The Healer',
        body: 'Ash-Shafi is the only healer; means are only means. A meal, a walk, a night of sleep — none of these heal on their own. They are causes that Ash-Shafi either permits to reach their effect or does not. Approaching physical health as self-optimization forgets Him; approaching it as cooperation with the Healer keeps the heart oriented while the body is tended.',
      },
    ],
    dua: {
      title: 'Before Tending to the Body',
      resumeTitle: 'Before Returning to Physical Care',
      arabic: 'اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي',
      trans: "Allāhumma ʿāfinī fī badanī, Allāhumma ʿāfinī fī samʿī, Allāhumma ʿāfinī fī baṣarī",
      meaning: 'O Allah, grant me well-being in my body; O Allah, grant me well-being in my hearing; O Allah, grant me well-being in my sight.',
      source: 'Sunan Abi Dawud 5090',
    },
    closingDua: {
      title: 'After Tending to the Body',
      arabic: 'وَإِذَا مَرِضْتُ فَهُوَ يَشْفِينِ',
      trans: "Wa idhā mariḍtu fa-huwa yashfīn",
      meaning: 'And when I am ill, it is He who cures me.',
      source: 'Surah Ash-Shuʿara 26:80',
    },
    readiness: {
      frame: 'Al-Muhyi asks: am I treating this body as a trust, or as a machine to extract output from?',
      yesLabel: 'I am stewarding the body when',
      notYetLabel: 'I am extracting from the body when',
      rows: [
        {
          id: 'M1', attr: 'Al-Muhyi', attr_ar: 'المحيي', attrTitle: 'The Giver of Life',
          attrFrame: 'Am I treating my body as an amanah or as a disposable instrument?',
          yesLabel: 'I am treating it as a trust when',
          notYetLabel: 'I am treating it as disposable when',
          governing: 'I am approaching this meal, this rest, this movement as worship — care for a body that was given to me.',
          notYet: 'I am skipping what my body is owed so I can extract more output from it today.',
        },
        {
          id: 'M2', attr: 'Al-Muhyi',
          governing: 'I have given this body what it needs to carry me through the day — sleep, food, water, movement — rather than running a deficit.',
          notYet: 'I have compounded last night\'s sleep debt, skipped the meal I know I needed, and told myself I will catch up later.',
        },
        {
          id: 'M3', attr: 'Al-Muhyi',
          governing: 'I am grateful for the breath and function that is working today — I am not only noticing the body when it hurts.',
          notYet: 'I only remember this body when it fails; I have not thanked Him for what is still functioning.',
        },
        {
          id: 'S1', attr: 'Ash-Shafi', attr_ar: 'الشافي', attrTitle: 'The Healer',
          attrFrame: 'Am I leaning into means while trusting the Healer, or am I leaning only on myself?',
          yesLabel: 'I am cooperating with the Healer when',
          notYetLabel: 'I am acting as my own healer when',
          governing: 'I am taking the sabab — the means He prescribed — without believing the means themselves are what heal.',
          notYet: 'I am either neglecting the means entirely, or gripping them so tightly I have forgotten that Ash-Shafi is the one who cures.',
        },
        {
          id: 'S2', attr: 'Ash-Shafi',
          governing: 'I am naming what is actually hurting — not masking it, not dramatizing it — so the right care can reach it.',
          notYet: 'I am medicating past a signal rather than listening to what it is trying to tell me.',
        },
      ],
      governing: [
        'I am approaching this meal, this rest, this movement as worship — care for a body that was given to me.',
        'I have given this body what it needs to carry me through the day — sleep, food, water, movement — rather than running a deficit.',
        'I am grateful for the breath and function that is working today — I am not only noticing the body when it hurts.',
        'I am taking the sabab — the means He prescribed — without believing the means themselves are what heal.',
        'I am naming what is actually hurting — not masking it, not dramatizing it — so the right care can reach it.',
      ],
      notYet: [
        'I am skipping what my body is owed so I can extract more output from it today.',
        'I have compounded last night\'s sleep debt, skipped the meal I know I needed, and told myself I will catch up later.',
        'I only remember this body when it fails; I have not thanked Him for what is still functioning.',
        'I am either neglecting the means entirely, or gripping them so tightly I have forgotten that Ash-Shafi is the one who cures.',
        'I am medicating past a signal rather than listening to what it is trying to tell me.',
      ],
    },
    reflection: {
      frame: 'Al-Muhyi kept me alive today. Ash-Shafi is the only one who healed what improved.',
      yesLabel: 'The body was tended when',
      notYetLabel: 'The body was exploited when',
      rows: [
        {
          id: 'RM1', attr: 'Al-Muhyi', attr_ar: 'المحيي', attrTitle: 'The Giver of Life',
          attrFrame: 'Did I treat my body as a trust today?',
          yesLabel: 'I tended the trust when',
          notYetLabel: 'I spent the trust when',
          governing: 'I gave my body at least one thing it was genuinely owed today — rest, nourishment, or movement.',
          notYet: 'I ran down what little reserve I had and called it productivity.',
        },
        {
          id: 'RS1', attr: 'Ash-Shafi', attr_ar: 'الشافي', attrTitle: 'The Healer',
          attrFrame: 'Did I remember the Healer while using the means?',
          yesLabel: 'I remembered the Healer when',
          notYetLabel: 'I forgot the Healer when',
          governing: 'I took care of something in this body today while keeping my heart turned toward the One who actually heals.',
          notYet: 'I treated the protocol, the supplement, or the routine as if it were the cure itself.',
        },
      ],
      governing: [
        'I gave my body at least one thing it was genuinely owed today — rest, nourishment, or movement.',
        'I took care of something in this body today while keeping my heart turned toward the One who actually heals.',
      ],
      notYet: [
        'I ran down what little reserve I had and called it productivity.',
        'I treated the protocol, the supplement, or the routine as if it were the cure itself.',
      ],
    },
  },

  'life-mental': {
    attrs: [
      {
        name: 'As-Salam',
        name_ar: 'السلام',
        title: 'The Source of Peace',
        body: 'As-Salam is peace itself — not the absence of difficulty, but the wholeness that holds through it. A mind aligned with As-Salam is not one that never encounters anxiety; it is one that returns to tranquility by remembrance rather than by distraction. Its absence shows as perpetual low-grade alarm, a mind that cannot settle because it has forgotten where settling comes from.',
      },
      {
        name: 'Al-Latif',
        name_ar: 'اللطيف',
        title: 'The Subtly Kind',
        body: 'Al-Latif perceives the finest movements of the heart — the tremor before the tear, the tension before the thought becomes conscious. To tend to mental well-being under Al-Latif is to extend that same subtlety to yourself: to notice the small signals before they become crises, and to treat your inner state with the gentleness He already brings to it.',
      },
    ],
    dua: {
      title: 'Before Tending to the Heart and Mind',
      resumeTitle: 'Before Returning to Inner Work',
      arabic: 'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ',
      trans: "Alā bi-dhikrillāhi taṭma\u02beinnul-qulūb",
      meaning: 'Verily, in the remembrance of Allah do hearts find rest.',
      source: 'Surah Ar-Raʿd 13:28',
    },
    closingDua: {
      title: 'After Tending to the Heart and Mind',
      arabic: 'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي وَاحْلُلْ عُقْدَةً مِّن لِّسَانِي',
      trans: "Rabbi-shraḥ lī ṣadrī wa yassir lī amrī wa-ḥlul ʿuqdatan min lisānī",
      meaning: 'My Lord, expand for me my chest, and ease for me my task, and untie the knot from my tongue.',
      source: 'Surah Ta-Ha 20:25\u201327',
    },
    readiness: {
      frame: 'As-Salam asks: am I seeking tranquility in His remembrance, or in distraction?',
      yesLabel: 'Tranquility is sought in Him when',
      notYetLabel: 'Tranquility is outsourced when',
      rows: [
        {
          id: 'S1', attr: 'As-Salam', attr_ar: 'السلام', attrTitle: 'The Source of Peace',
          attrFrame: 'Am I turning to dhikr for peace, or to a screen?',
          yesLabel: 'I am turning to dhikr when',
          notYetLabel: 'I am turning to distraction when',
          governing: 'When the restlessness rises, I am turning first toward His remembrance rather than toward the feed.',
          notYet: 'I am reaching for the phone, the scroll, the tab — anything to quiet the inner noise without actually facing it.',
        },
        {
          id: 'S2', attr: 'As-Salam',
          governing: 'I am allowing difficult feelings to be present without treating every discomfort as an emergency to escape.',
          notYet: 'I am pathologizing a normal human response and catastrophizing what is actually bearable.',
        },
        {
          id: 'S3', attr: 'As-Salam',
          governing: 'I am naming what I am feeling honestly — not performing serenity I do not have, and not rehearsing anxiety I could set down.',
          notYet: 'I am either suppressing what is real or amplifying what would settle on its own if I stopped feeding it.',
        },
        {
          id: 'L1', attr: 'Al-Latif', attr_ar: 'اللطيف', attrTitle: 'The Subtly Kind',
          attrFrame: 'Am I being as gentle with myself as Al-Latif is?',
          yesLabel: 'I am gentle with the inner state when',
          notYetLabel: 'I am harsh with the inner state when',
          governing: 'I am speaking to myself in a way I would allow a beloved friend to speak to a struggling child.',
          notYet: 'I am berating myself for feeling what I feel, layering shame on top of the original difficulty.',
        },
        {
          id: 'L2', attr: 'Al-Latif',
          governing: 'I am noticing the early signals — the tightness, the withdrawal, the irritability — before they compound into something larger.',
          notYet: 'I have been ignoring smaller warnings for long enough that what is present now is no longer small.',
        },
      ],
      governing: [
        'When the restlessness rises, I am turning first toward His remembrance rather than toward the feed.',
        'I am allowing difficult feelings to be present without treating every discomfort as an emergency to escape.',
        'I am naming what I am feeling honestly — not performing serenity I do not have, and not rehearsing anxiety I could set down.',
        'I am speaking to myself in a way I would allow a beloved friend to speak to a struggling child.',
        'I am noticing the early signals — the tightness, the withdrawal, the irritability — before they compound into something larger.',
      ],
      notYet: [
        'I am reaching for the phone, the scroll, the tab — anything to quiet the inner noise without actually facing it.',
        'I am pathologizing a normal human response and catastrophizing what is actually bearable.',
        'I am either suppressing what is real or amplifying what would settle on its own if I stopped feeding it.',
        'I am berating myself for feeling what I feel, layering shame on top of the original difficulty.',
        'I have been ignoring smaller warnings for long enough that what is present now is no longer small.',
      ],
    },
    reflection: {
      frame: 'As-Salam was the source of whatever peace I found. Al-Latif saw what I almost missed.',
      yesLabel: 'Peace was sought rightly when',
      notYetLabel: 'Peace was outsourced when',
      rows: [
        {
          id: 'RS1', attr: 'As-Salam', attr_ar: 'السلام', attrTitle: 'The Source of Peace',
          attrFrame: 'Where did I seek peace today?',
          yesLabel: 'I sought peace in Him when',
          notYetLabel: 'I sought peace elsewhere when',
          governing: 'When the anxiety rose today, I returned to dhikr at least once before reaching for a distraction.',
          notYet: 'I buried a difficult feeling under hours of scrolling and called it rest.',
        },
        {
          id: 'RL1', attr: 'Al-Latif', attr_ar: 'اللطيف', attrTitle: 'The Subtly Kind',
          attrFrame: 'Was I gentle with myself today?',
          yesLabel: 'Gentleness was present when',
          notYetLabel: 'Harshness was present when',
          governing: 'I caught a small inner signal today and attended to it before it became a crisis.',
          notYet: 'I spoke to myself today in a voice I would not permit anyone else to use on me.',
        },
      ],
      governing: [
        'When the anxiety rose today, I returned to dhikr at least once before reaching for a distraction.',
        'I caught a small inner signal today and attended to it before it became a crisis.',
      ],
      notYet: [
        'I buried a difficult feeling under hours of scrolling and called it rest.',
        'I spoke to myself today in a voice I would not permit anyone else to use on me.',
      ],
    },
  },

  'life-safety': {
    attrs: [
      {
        name: 'Al-Muhaymin',
        name_ar: 'المهيمن',
        title: 'The Guardian Overseer',
        body: 'Al-Muhaymin watches over all things — no harm reaches anyone without His knowledge, and no protection arrives without His permission. To tend to safety under Al-Muhaymin is to act with full diligence while trusting that the outcome is already witnessed. It is neither paranoia nor recklessness; it is prudent action held inside tawakkul.',
      },
      {
        name: 'Al-Hafiz',
        name_ar: 'الحفيظ',
        title: 'The Preserver',
        body: 'Al-Hafiz preserves — the body, the home, the lineage, the deen. Human diligence is a cause, not the cause. A locked door, a seatbelt, a careful word — these are asbab placed in your hand so that you participate in preservation. Al-Hafiz is the one who makes them effective. Forget Him and the checklist becomes anxiety; remember Him and the checklist becomes worship.',
      },
    ],
    dua: {
      title: 'Before Taking Up the Duty of Protection',
      resumeTitle: 'Before Returning to the Duty of Protection',
      arabic: 'فَاللَّهُ خَيْرٌ حَافِظًا ۖ وَهُوَ أَرْحَمُ الرَّاحِمِينَ',
      trans: "Fa-llāhu khayrun ḥāfiẓan, wa huwa arḥamur-rāḥimīn",
      meaning: 'But Allah is the best Guardian, and He is the Most Merciful of the merciful.',
      source: 'Surah Yusuf 12:64',
    },
    closingDua: {
      title: 'After Discharging the Duty of Protection',
      arabic: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ',
      trans: "Bismillāhilladhī lā yaḍurru maʿa-smihi shayʾun fil-arḍi wa lā fi-s-samāʾ",
      meaning: 'In the name of Allah, with whose name nothing on earth or in the heavens can cause harm.',
      source: 'Sunan Abi Dawud 5088',
    },
    readiness: {
      frame: 'Al-Muhaymin asks: am I taking the means seriously while trusting the Overseer, or am I pretending the outcome depends on me?',
      yesLabel: 'I am acting inside tawakkul when',
      notYetLabel: 'I am acting outside tawakkul when',
      rows: [
        {
          id: 'MH1', attr: 'Al-Muhaymin', attr_ar: 'المهيمن', attrTitle: 'The Guardian Overseer',
          attrFrame: 'Am I diligent without being anxious, or anxious without being diligent?',
          yesLabel: 'I am diligent inside trust when',
          notYetLabel: 'I have collapsed one side when',
          governing: 'I am taking reasonable precautions — the lock, the check, the verification — while my heart remains settled on His watch.',
          notYet: 'I am either catastrophizing every scenario, or dismissing real risk because thinking about it is uncomfortable.',
        },
        {
          id: 'MH2', attr: 'Al-Muhaymin',
          governing: 'I am protecting those in my care by anticipating the real hazards, not the theatrical ones.',
          notYet: 'I am performing vigilance toward unlikely dangers while neglecting the actual risks closer to home.',
        },
        {
          id: 'MH3', attr: 'Al-Muhaymin',
          governing: 'I am guarding against harm that I could cause — my words, my driving, my negligence — not only harm that could come from outside.',
          notYet: 'I am looking outward for threats while the harm I am capable of causing is uninspected.',
        },
        {
          id: 'H1', attr: 'Al-Hafiz', attr_ar: 'الحفيظ', attrTitle: 'The Preserver',
          attrFrame: 'Am I taking the means seriously as worship, or skipping them out of laziness or bravado?',
          yesLabel: 'I am taking means as worship when',
          notYetLabel: 'I am skipping means when',
          governing: 'I am locking what should be locked, checking what should be checked, wearing what should be worn — because taking the sabab is part of remembering Al-Hafiz.',
          notYet: 'I am telling myself "it will be fine" as a substitute for doing the small thing that would make it fine.',
        },
        {
          id: 'H2', attr: 'Al-Hafiz',
          governing: 'I am saying the morning/evening adhkar as actual protection, not as reflex.',
          notYet: 'I am rushing through the adhkar as a formality while my heart is already elsewhere.',
        },
      ],
      governing: [
        'I am taking reasonable precautions — the lock, the check, the verification — while my heart remains settled on His watch.',
        'I am protecting those in my care by anticipating the real hazards, not the theatrical ones.',
        'I am guarding against harm that I could cause — my words, my driving, my negligence — not only harm that could come from outside.',
        'I am locking what should be locked, checking what should be checked, wearing what should be worn — because taking the sabab is part of remembering Al-Hafiz.',
        'I am saying the morning/evening adhkar as actual protection, not as reflex.',
      ],
      notYet: [
        'I am either catastrophizing every scenario, or dismissing real risk because thinking about it is uncomfortable.',
        'I am performing vigilance toward unlikely dangers while neglecting the actual risks closer to home.',
        'I am looking outward for threats while the harm I am capable of causing is uninspected.',
        'I am telling myself "it will be fine" as a substitute for doing the small thing that would make it fine.',
        'I am rushing through the adhkar as a formality while my heart is already elsewhere.',
      ],
    },
    reflection: {
      frame: 'Al-Muhaymin watched every door today. Al-Hafiz is the one who actually preserved what was kept.',
      yesLabel: 'Protection was taken seriously when',
      notYetLabel: 'Protection was neglected when',
      rows: [
        {
          id: 'RMH1', attr: 'Al-Muhaymin', attr_ar: 'المهيمن', attrTitle: 'The Guardian Overseer',
          attrFrame: 'Was I vigilant inside trust today?',
          yesLabel: 'Vigilance was grounded when',
          notYetLabel: 'Vigilance was unbalanced when',
          governing: 'I addressed a real risk today with a real action rather than leaving it unattended.',
          notYet: 'I spent today either numb to danger or consumed by it — neither posture was sober.',
        },
        {
          id: 'RH1', attr: 'Al-Hafiz', attr_ar: 'الحفيظ', attrTitle: 'The Preserver',
          attrFrame: 'Did I take the means seriously as worship?',
          yesLabel: 'Means were taken as worship when',
          notYetLabel: 'Means were skipped when',
          governing: 'I did a small protective thing today — a lock, a check, a dhikr — and remembered Al-Hafiz while doing it.',
          notYet: 'I skipped a small safeguard I know I am supposed to keep, trusting luck instead of taking the sabab.',
        },
      ],
      governing: [
        'I addressed a real risk today with a real action rather than leaving it unattended.',
        'I did a small protective thing today — a lock, a check, a dhikr — and remembered Al-Hafiz while doing it.',
      ],
      notYet: [
        'I spent today either numb to danger or consumed by it — neither posture was sober.',
        'I skipped a small safeguard I know I am supposed to keep, trusting luck instead of taking the sabab.',
      ],
    },
  },

  'life-social': {
    attrs: [
      {
        name: 'Al-Wadud',
        name_ar: 'الودود',
        title: 'The Ever-Loving',
        body: 'Al-Wadud loves in a way that does not wait for the other to be lovable first. In social life this is the warmth extended to the stranger, the patience kept with the difficult colleague, the smile given to someone who has not yet earned it. Its absence turns every interaction into a transaction and every relationship into a ledger.',
      },
      {
        name: 'Al-Muhsin',
        name_ar: 'المحسن',
        title: 'The Doer of Good',
        body: 'Al-Muhsin brings ihsan — goodness beyond what was required or deserved. "Ahsin kama ahsana-llahu ilayk" — do good as Allah has done good to you. Social presence under Al-Muhsin is the refusal to meet a rude person rudely, the refusal to give exactly what was given, the refusal to carry grudges at interest. It is excellence of conduct that makes you recognizable even to those who do not know you.',
      },
    ],
    dua: {
      title: 'Before Entering Social Space',
      resumeTitle: 'Before Returning to Social Space',
      arabic: 'وَأَحْسِن كَمَا أَحْسَنَ اللَّهُ إِلَيْكَ',
      trans: "Wa aḥsin kamā aḥsana-llāhu ilayk",
      meaning: 'And do good as Allah has done good to you.',
      source: 'Surah Al-Qasas 28:77',
    },
    closingDua: {
      title: 'After Social Engagement',
      arabic: 'ادْفَعْ بِالَّتِي هِيَ أَحْسَنُ فَإِذَا الَّذِي بَيْنَكَ وَبَيْنَهُ عَدَاوَةٌ كَأَنَّهُ وَلِيٌّ حَمِيمٌ',
      trans: "Idfaʿ billatī hiya aḥsan, fa-idhā-lladhī baynaka wa baynahu ʿadāwatun ka-annahu waliyyun ḥamīm",
      meaning: 'Repel evil with what is better, and then the one between whom and you was enmity will become as though he were a devoted friend.',
      source: 'Surah Fussilat 41:34',
    },
    readiness: {
      frame: 'Al-Wadud asks: am I entering this room to represent Him, or to be seen by them?',
      yesLabel: 'I am representing Him when',
      notYetLabel: 'I am performing for them when',
      rows: [
        {
          id: 'W1', attr: 'Al-Wadud', attr_ar: 'الودود', attrTitle: 'The Ever-Loving',
          attrFrame: 'Am I bringing warmth, or managing image?',
          yesLabel: 'I am bringing warmth when',
          notYetLabel: 'I am managing image when',
          governing: 'I am entering ready to give what is needed of me here — attention, kindness, patience — before thinking about what I will take.',
          notYet: 'I am walking in calculating what this room owes me, what I need from it, and who in it can serve my purposes.',
        },
        {
          id: 'W2', attr: 'Al-Wadud',
          governing: 'I am willing to be kind to someone who has not earned my kindness today — because that is what wadud actually is.',
          notYet: 'I am rationing my warmth based on who has recently deserved it.',
        },
        {
          id: 'W3', attr: 'Al-Wadud',
          governing: 'I am keeping my tongue — no backbiting, no gossip, no cutting humor at someone\'s expense — as a condition of being in company.',
          notYet: 'I am about to relieve social tension with a joke at someone\'s expense, or join a conversation that is shredding an absent person.',
        },
        {
          id: 'MS1', attr: 'Al-Muhsin', attr_ar: 'المحسن', attrTitle: 'The Doer of Good',
          attrFrame: 'Am I bringing ihsan, or just bringing what the situation requires?',
          yesLabel: 'I am bringing ihsan when',
          notYetLabel: 'I am bringing only the minimum when',
          governing: 'I am committed to going beyond the minimum in how I treat people in this room — not because they deserve it, but because He does.',
          notYet: 'I am doing exactly what social protocol requires and nothing more, because giving more feels uncompensated.',
        },
        {
          id: 'MS2', attr: 'Al-Muhsin',
          governing: 'I am ready to repel harshness with something better — sabr, silence, or a soft word — rather than returning what was given.',
          notYet: 'I am rehearsing how to match rudeness with rudeness if it arrives, as if dignity required revenge.',
        },
      ],
      governing: [
        'I am entering ready to give what is needed of me here — attention, kindness, patience — before thinking about what I will take.',
        'I am willing to be kind to someone who has not earned my kindness today — because that is what wadud actually is.',
        'I am keeping my tongue — no backbiting, no gossip, no cutting humor at someone\'s expense — as a condition of being in company.',
        'I am committed to going beyond the minimum in how I treat people in this room — not because they deserve it, but because He does.',
        'I am ready to repel harshness with something better — sabr, silence, or a soft word — rather than returning what was given.',
      ],
      notYet: [
        'I am walking in calculating what this room owes me, what I need from it, and who in it can serve my purposes.',
        'I am rationing my warmth based on who has recently deserved it.',
        'I am about to relieve social tension with a joke at someone\'s expense, or join a conversation that is shredding an absent person.',
        'I am doing exactly what social protocol requires and nothing more, because giving more feels uncompensated.',
        'I am rehearsing how to match rudeness with rudeness if it arrives, as if dignity required revenge.',
      ],
    },
    reflection: {
      frame: 'Al-Wadud witnessed the warmth I gave. Al-Muhsin witnessed whether I rose above what was given to me.',
      yesLabel: 'Ihsan was present when',
      notYetLabel: 'Only the minimum was given when',
      rows: [
        {
          id: 'RW1', attr: 'Al-Wadud', attr_ar: 'الودود', attrTitle: 'The Ever-Loving',
          attrFrame: 'Did I lead with warmth today?',
          yesLabel: 'Warmth led when',
          notYetLabel: 'Warmth was rationed when',
          governing: 'I extended kindness today to someone who had no claim on my kindness.',
          notYet: 'I withheld basic warmth from someone because they had not recently earned it.',
        },
        {
          id: 'RMS1', attr: 'Al-Muhsin', attr_ar: 'المحسن', attrTitle: 'The Doer of Good',
          attrFrame: 'Did I repel evil with what is better today?',
          yesLabel: 'I repelled with better when',
          notYetLabel: 'I matched like for like when',
          governing: 'I refused to return harshness today in at least one moment where returning it would have been easy and justified.',
          notYet: 'I matched someone\'s rudeness exactly, and called it standing up for myself.',
        },
      ],
      governing: [
        'I extended kindness today to someone who had no claim on my kindness.',
        'I refused to return harshness today in at least one moment where returning it would have been easy and justified.',
      ],
      notYet: [
        'I withheld basic warmth from someone because they had not recently earned it.',
        'I matched someone\'s rudeness exactly, and called it standing up for myself.',
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

  family: {
    attrs: [
      {
        name: 'Al-Wadud',
        name_ar: 'الودود',
        title: 'The Ever-Loving',
        body: 'Al-Wadud loves with a love that does not depend on performance. In the family, this is the love that precedes approval — the parent who loves the child before the child earns it, the spouse who loves the spouse before the spouse deserves it. Its absence turns the home into a place where belonging must be bought and where mistakes become unforgivable.',
      },
      {
        name: 'Ar-Rahman',
        name_ar: 'الرحمن',
        title: 'The Most Merciful',
        body: 'Ar-Rahman is the mercy that precedes creation itself — the atmosphere in which families either flourish or suffocate. To lead a household in rahmah is to default to compassion before correction, to assume the best before demanding proof, and to make the home a place where weakness is not weaponized.',
      },
    ],
    dua: {
      title: 'Before Tending to Family',
      resumeTitle: 'Before Returning to Family',
      arabic: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً',
      trans: "Wa min āyātihi an khalaqa lakum min anfusikum azwājan litaskunū ilayhā wa jaʿala baynakum mawaddatan wa raḥmah",
      meaning: 'And of His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy.',
      source: 'Surah Ar-Rum 30:21',
    },
    closingDua: {
      title: 'After Serving Family',
      arabic: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا',
      trans: "Rabbanā hab lanā min azwājinā wa dhurriyyātinā qurrata aʿyunin wa-jʿalnā lil-muttaqīna imāmā",
      meaning: 'Our Lord, grant us from among our spouses and offspring comfort to our eyes, and make us a leader for the righteous.',
      source: 'Surah Al-Furqan 25:74',
    },
    readiness: {
      frame: 'Al-Wadud asks: am I loving my family the way He loves me — before they have earned it?',
      yesLabel: 'I am loving without condition when',
      notYetLabel: 'Love is being rationed when',
      rows: [
        {
          id: 'W1', attr: 'Al-Wadud', attr_ar: 'الودود', attrTitle: 'The Ever-Loving',
          attrFrame: 'Am I loving my family before they earn it, or after?',
          yesLabel: 'I am loving without condition when',
          notYetLabel: 'Love is being rationed when',
          governing: 'I can bring warmth to this interaction without waiting for them to meet my standard first.',
          notYet: 'My affection is being withheld as leverage until their behavior improves.',
        },
        {
          id: 'W2', attr: 'Al-Wadud',
          governing: 'I am seeing this person as they are right now, not as the sum of their recent disappointments.',
          notYet: 'An old grievance is filtering how I receive them today.',
        },
        {
          id: 'W3', attr: 'Al-Wadud',
          governing: 'The posture I carry into this home is one of welcome, not audit.',
          notYet: 'I am walking in ready to correct rather than ready to be present.',
        },
        {
          id: 'R1', attr: 'Ar-Rahman', attr_ar: 'الرحمن', attrTitle: 'The Most Merciful',
          attrFrame: 'Is my default posture mercy, or is it measurement?',
          yesLabel: 'Mercy is the default when',
          notYetLabel: 'Measurement is the default when',
          governing: 'I default to compassion before correction when a family member falls short.',
          notYet: 'I am leading with a verdict before I have extended any mercy.',
        },
        {
          id: 'R2', attr: 'Ar-Rahman',
          governing: 'I am making space for weakness in this home without using it as proof.',
          notYet: 'I am cataloging failures to deploy in a later argument.',
        },
      ],
      governing: [
        'I can bring warmth to this interaction without waiting for them to meet my standard first.',
        'I am seeing this person as they are right now, not as the sum of their recent disappointments.',
        'The posture I carry into this home is one of welcome, not audit.',
        'I default to compassion before correction when a family member falls short.',
        'I am making space for weakness in this home without using it as proof.',
      ],
      notYet: [
        'My affection is being withheld as leverage until their behavior improves.',
        'An old grievance is filtering how I receive them today.',
        'I am walking in ready to correct rather than ready to be present.',
        'I am leading with a verdict before I have extended any mercy.',
        'I am cataloging failures to deploy in a later argument.',
      ],
    },
    reflection: {
      frame: 'Al-Wadud witnessed how I loved today. Ar-Rahman witnessed what I made room for.',
      yesLabel: 'Love showed up today when',
      notYetLabel: 'Love fell short today when',
      rows: [
        {
          id: 'RW1', attr: 'Al-Wadud', attr_ar: 'الودود', attrTitle: 'The Ever-Loving',
          attrFrame: 'Did I love them today before they earned it?',
          yesLabel: 'Unconditional love was present when',
          notYetLabel: 'Love was conditional when',
          governing: 'I offered warmth today to someone who had not done anything to deserve it.',
          notYet: 'I withheld affection from a family member because they had not met my expectation.',
        },
        {
          id: 'RR1', attr: 'Ar-Rahman', attr_ar: 'الرحمن', attrTitle: 'The Most Merciful',
          attrFrame: 'Did mercy precede correction today?',
          yesLabel: 'Mercy led the way when',
          notYetLabel: 'Correction outran mercy when',
          governing: 'I chose compassion over commentary in at least one moment that called for both.',
          notYet: 'I corrected first and comforted later — or never got to the comfort.',
        },
      ],
      governing: [
        'I offered warmth today to someone who had not done anything to deserve it.',
        'I chose compassion over commentary in at least one moment that called for both.',
      ],
      notYet: [
        'I withheld affection from a family member because they had not met my expectation.',
        'I corrected first and comforted later — or never got to the comfort.',
      ],
    },
  },

  'family-marriage': {
    attrs: [
      {
        name: 'Al-Wadud',
        name_ar: 'الودود',
        title: 'The Ever-Loving',
        body: 'Marriage is the most public school of wadud. Al-Wadud loves through the days that earn love and the days that do not. The nikah binds the covenant; wadud is what makes it habitable. Its absence turns a marriage into a contract where both parties audit the other.',
      },
      {
        name: 'As-Salam',
        name_ar: 'السلام',
        title: 'The Source of Peace',
        body: 'As-Salam is the peace that is itself a Name — not merely calm, but wholeness. A marriage aligned with As-Salam is one where neither spouse fears the other, where tongues are kept, and where silence is not punishment. "Litaskunū ilayhā" — that you may find tranquility in her — is not a wish; it is the aim.',
      },
    ],
    dua: {
      title: 'Before Tending to Marriage',
      resumeTitle: 'Before Returning to Marriage',
      arabic: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا',
      trans: "Wa min āyātihi an khalaqa lakum min anfusikum azwājan litaskunū ilayhā",
      meaning: 'And of His signs is that He created for you from yourselves mates that you may find tranquility in them.',
      source: 'Surah Ar-Rum 30:21',
    },
    closingDua: {
      title: 'After Tending to Marriage',
      arabic: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا قُرَّةَ أَعْيُنٍ',
      trans: "Rabbanā hab lanā min azwājinā qurrata aʿyun",
      meaning: 'Our Lord, grant us from among our spouses comfort to our eyes.',
      source: 'Surah Al-Furqan 25:74',
    },
    readiness: {
      frame: 'Al-Wadud asks: am I choosing this spouse today the way I chose them at the nikah?',
      yesLabel: 'I am choosing them again when',
      notYetLabel: 'I am merely cohabiting when',
      rows: [
        {
          id: 'W1', attr: 'Al-Wadud', attr_ar: 'الودود', attrTitle: 'The Ever-Loving',
          attrFrame: 'Am I choosing them again, or just tolerating them?',
          yesLabel: 'I am choosing them again when',
          notYetLabel: 'I am merely cohabiting when',
          governing: 'I am approaching my spouse as a beloved to meet, not a roommate to manage.',
          notYet: 'I am moving through the house like we are running parallel logistics, not sharing a life.',
        },
        {
          id: 'W2', attr: 'Al-Wadud',
          governing: 'I am willing to lead with affection before they have done anything to earn it today.',
          notYet: 'I am waiting for them to initiate warmth so I know it is "safe" to return.',
        },
        {
          id: 'S1', attr: 'As-Salam', attr_ar: 'السلام', attrTitle: 'The Source of Peace',
          attrFrame: 'Is the atmosphere between us peaceful, or is there a lingering edge?',
          yesLabel: 'Peace is held between us when',
          notYetLabel: 'An edge is carried between us when',
          governing: 'There is no unresolved harshness from the last interaction still sitting in the room.',
          notYet: 'I am carrying residue from our last disagreement that I have not addressed or released.',
        },
        {
          id: 'S2', attr: 'As-Salam',
          governing: 'My tongue is in keeping — I am not about to say something I will need to apologize for.',
          notYet: 'I am rehearsing a grievance in my head that I am ready to launch at them.',
        },
      ],
      governing: [
        'I am approaching my spouse as a beloved to meet, not a roommate to manage.',
        'I am willing to lead with affection before they have done anything to earn it today.',
        'There is no unresolved harshness from the last interaction still sitting in the room.',
        'My tongue is in keeping — I am not about to say something I will need to apologize for.',
      ],
      notYet: [
        'I am moving through the house like we are running parallel logistics, not sharing a life.',
        'I am waiting for them to initiate warmth so I know it is "safe" to return.',
        'I am carrying residue from our last disagreement that I have not addressed or released.',
        'I am rehearsing a grievance in my head that I am ready to launch at them.',
      ],
    },
    reflection: {
      frame: 'Al-Wadud witnessed the marriage today. As-Salam witnessed the atmosphere.',
      yesLabel: 'Love was active when',
      notYetLabel: 'Love went dormant when',
      rows: [
        {
          id: 'RW1', attr: 'Al-Wadud', attr_ar: 'الودود', attrTitle: 'The Ever-Loving',
          attrFrame: 'Did I choose them actively today?',
          yesLabel: 'I chose them actively when',
          notYetLabel: 'I coasted when',
          governing: 'I did at least one small thing today that said, without words, "I am still choosing you."',
          notYet: 'I treated the marriage as autopilot and did nothing to tend it.',
        },
        {
          id: 'RS1', attr: 'As-Salam', attr_ar: 'السلام', attrTitle: 'The Source of Peace',
          attrFrame: 'Was the home peaceful because of me, or in spite of me?',
          yesLabel: 'I contributed to peace when',
          notYetLabel: 'I contributed to tension when',
          governing: 'I held my tongue in a moment where a sharper word would have been easier.',
          notYet: 'I said something I knew would land like a blade and watched it land.',
        },
      ],
      governing: [
        'I did at least one small thing today that said, without words, "I am still choosing you."',
        'I held my tongue in a moment where a sharper word would have been easier.',
      ],
      notYet: [
        'I treated the marriage as autopilot and did nothing to tend it.',
        'I said something I knew would land like a blade and watched it land.',
      ],
    },
  },

  'family-parenting': {
    attrs: [
      {
        name: 'Ar-Rabb',
        name_ar: 'الرب',
        title: 'The Nurturer',
        body: 'Ar-Rabb is the One who raises a thing from one state to the next with patience proportionate to its nature. To parent in the likeness of Ar-Rabb is to grow a soul, not shape a product — accepting that tarbiyah unfolds in seasons that will not match the calendar of your convenience.',
      },
      {
        name: 'Al-Hafiz',
        name_ar: 'الحفيظ',
        title: 'The Preserver',
        body: 'Al-Hafiz preserves what is entrusted. Your children are an amanah before they are yours. To parent under Al-Hafiz is to guard them from what would harm them without suffocating what must grow — including harm that wears your own face when you are tired or short.',
      },
    ],
    dua: {
      title: 'Before Parenting',
      resumeTitle: 'Before Returning to Parenting',
      arabic: 'رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِن ذُرِّيَّتِي ۚ رَبَّنَا وَتَقَبَّلْ دُعَاءِ',
      trans: "Rabbi-jʿalnī muqīma-ṣ-ṣalāti wa min dhurriyyatī, rabbanā wa taqabbal duʿāʾ",
      meaning: 'My Lord, make me an establisher of prayer, and from my descendants. Our Lord, and accept my supplication.',
      source: 'Surah Ibrahim 14:40',
    },
    closingDua: {
      title: 'After Parenting',
      arabic: 'رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ وَأَصْلِحْ لِي فِي ذُرِّيَّتِي',
      trans: "Rabbi awziʿnī an ashkura niʿmataka allatī anʿamta ʿalayya wa ʿalā wālidayya wa an aʿmala ṣāliḥan tarḍāhu wa aṣliḥ lī fī dhurriyyatī",
      meaning: 'My Lord, enable me to be grateful for Your favor which You have bestowed upon me and upon my parents, and to do righteousness of which You approve, and make righteous for me my offspring.',
      source: 'Surah Al-Ahqaf 46:15',
    },
    readiness: {
      frame: 'Ar-Rabb asks: am I growing this child at his pace, or mine?',
      yesLabel: 'I am parenting at their pace when',
      notYetLabel: 'I am parenting at my pace when',
      rows: [
        {
          id: 'RB1', attr: 'Ar-Rabb', attr_ar: 'الرب', attrTitle: 'The Nurturer',
          attrFrame: 'Am I parenting the child in front of me, or the one I wish I had?',
          yesLabel: 'I am parenting the real child when',
          notYetLabel: 'I am parenting a fantasy when',
          governing: 'I am meeting this child where they are developmentally, not where I need them to be.',
          notYet: 'I am frustrated because they are not performing at a standard their soul has not yet grown into.',
        },
        {
          id: 'RB2', attr: 'Ar-Rabb',
          governing: 'I am willing for this lesson to take the number of repetitions it actually takes.',
          notYet: 'I am escalating because I am tired of repeating myself, not because the moment calls for it.',
        },
        {
          id: 'RB3', attr: 'Ar-Rabb',
          governing: 'The correction I am about to offer is aimed at their growth, not at my relief.',
          notYet: 'I am about to discipline to discharge my own frustration rather than shape their character.',
        },
        {
          id: 'H1', attr: 'Al-Hafiz', attr_ar: 'الحفيظ', attrTitle: 'The Preserver',
          attrFrame: 'Am I guarding them — including from my own fatigue?',
          yesLabel: 'I am guarding them faithfully when',
          notYetLabel: 'I am the one they need guarding from when',
          governing: 'I am aware of my own state and will not discipline while depleted past my threshold.',
          notYet: 'I know I am too empty to parent well right now, and I am pressing forward anyway.',
        },
        {
          id: 'H2', attr: 'Al-Hafiz',
          governing: 'I am protecting their self-worth even while correcting their behavior.',
          notYet: 'I am about to say something that corrects the behavior by wounding the person.',
        },
      ],
      governing: [
        'I am meeting this child where they are developmentally, not where I need them to be.',
        'I am willing for this lesson to take the number of repetitions it actually takes.',
        'The correction I am about to offer is aimed at their growth, not at my relief.',
        'I am aware of my own state and will not discipline while depleted past my threshold.',
        'I am protecting their self-worth even while correcting their behavior.',
      ],
      notYet: [
        'I am frustrated because they are not performing at a standard their soul has not yet grown into.',
        'I am escalating because I am tired of repeating myself, not because the moment calls for it.',
        'I am about to discipline to discharge my own frustration rather than shape their character.',
        'I know I am too empty to parent well right now, and I am pressing forward anyway.',
        'I am about to say something that corrects the behavior by wounding the person.',
      ],
    },
    reflection: {
      frame: 'Ar-Rabb watched the tarbiyah today. Al-Hafiz watched what I guarded and what I did not.',
      yesLabel: 'Tarbiyah was present when',
      notYetLabel: 'Tarbiyah was absent when',
      rows: [
        {
          id: 'RRB1', attr: 'Ar-Rabb', attr_ar: 'الرب', attrTitle: 'The Nurturer',
          attrFrame: 'Did I grow them today, or just manage them?',
          yesLabel: 'I grew them when',
          notYetLabel: 'I only managed them when',
          governing: 'I took the slower path with a correction at least once today because the slower path was the right one.',
          notYet: 'I chose the fastest path to compliance over the path that would have shaped character.',
        },
        {
          id: 'RH1', attr: 'Al-Hafiz', attr_ar: 'الحفيظ', attrTitle: 'The Preserver',
          attrFrame: 'Were they safer with me today, or less safe?',
          yesLabel: 'They were safer with me when',
          notYetLabel: 'They were less safe with me when',
          governing: 'I caught myself before harshness landed and chose a gentler instrument.',
          notYet: 'I let fatigue come out through my tone, and a child carried the cost.',
        },
      ],
      governing: [
        'I took the slower path with a correction at least once today because the slower path was the right one.',
        'I caught myself before harshness landed and chose a gentler instrument.',
      ],
      notYet: [
        'I chose the fastest path to compliance over the path that would have shaped character.',
        'I let fatigue come out through my tone, and a child carried the cost.',
      ],
    },
  },

  'family-kinship': {
    attrs: [
      {
        name: 'Al-Wakil',
        name_ar: 'الوكيل',
        title: 'The Trustee',
        body: 'Silat al-rahim is a trust placed in you that no contract names. Al-Wakil holds outcomes you cannot — whether a reconciled aunt, a returned phone call, a softened cousin. Your role is to maintain the tie; the result of that maintenance is returned to Him.',
      },
      {
        name: 'Ash-Shakur',
        name_ar: 'الشكور',
        title: 'The Appreciative',
        body: 'Ash-Shakur magnifies the small act. A check-in call, a remembered birthday, a visit to the elder who cannot leave the house — these are not small to Him. To walk kinship under Ash-Shakur is to believe the five-minute call matters and to make it anyway.',
      },
    ],
    dua: {
      title: 'Before Tending to Extended Family',
      resumeTitle: 'Before Returning to Kinship',
      arabic: 'وَاتَّقُوا اللَّهَ الَّذِي تَسَاءَلُونَ بِهِ وَالْأَرْحَامَ',
      trans: "Wa-ttaqū Allāha alladhī tasāʾalūna bihi wal-arḥām",
      meaning: 'And fear Allah, through whom you ask one another, and the wombs (kinship).',
      source: 'Surah An-Nisa 4:1',
    },
    closingDua: {
      title: 'After Tending to Kinship',
      arabic: 'رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ',
      trans: "Rabbanā-ghfir lī wa li-wālidayya wa lil-muʾminīna yawma yaqūmu-l-ḥisāb",
      meaning: 'Our Lord, forgive me and my parents and the believers on the Day the account is established.',
      source: 'Surah Ibrahim 14:41',
    },
    readiness: {
      frame: 'Al-Wakil asks: am I maintaining the tie, and leaving the outcome with Him?',
      yesLabel: 'I am maintaining the tie when',
      notYetLabel: 'I am cutting the tie when',
      rows: [
        {
          id: 'K1', attr: 'Al-Wakil', attr_ar: 'الوكيل', attrTitle: 'The Trustee',
          attrFrame: 'Am I keeping the tie, whatever the other end does with it?',
          yesLabel: 'I am keeping the tie when',
          notYetLabel: 'I am conditioning the tie when',
          governing: 'I am willing to reach out without needing it reciprocated to feel "worth it."',
          notYet: 'I am keeping score on who called last and using the count as a reason not to reach.',
        },
        {
          id: 'K2', attr: 'Al-Wakil',
          governing: 'I have released the outcome of this outreach to Al-Wakil — my job is to maintain, not to fix.',
          notYet: 'I am delaying contact until I can guarantee the interaction goes the way I want it to.',
        },
        {
          id: 'K3', attr: 'Al-Wakil',
          governing: 'I am not letting an old injury become permission to sever what Allah commanded joined.',
          notYet: 'An old wound is being used as justification for a silence the shari\'ah does not permit.',
        },
        {
          id: 'S1', attr: 'Ash-Shakur', attr_ar: 'الشكور', attrTitle: 'The Appreciative',
          attrFrame: 'Am I treating the small acts of kinship as though they matter — because He does?',
          yesLabel: 'Small acts are honored when',
          notYetLabel: 'Small acts are dismissed when',
          governing: 'I am making the short call, sending the brief message, showing up briefly — and trusting it counts.',
          notYet: 'I am waiting for a "real" visit before I do anything, and the waiting has become the avoidance.',
        },
      ],
      governing: [
        'I am willing to reach out without needing it reciprocated to feel "worth it."',
        'I have released the outcome of this outreach to Al-Wakil — my job is to maintain, not to fix.',
        'I am not letting an old injury become permission to sever what Allah commanded joined.',
        'I am making the short call, sending the brief message, showing up briefly — and trusting it counts.',
      ],
      notYet: [
        'I am keeping score on who called last and using the count as a reason not to reach.',
        'I am delaying contact until I can guarantee the interaction goes the way I want it to.',
        'An old wound is being used as justification for a silence the shari\'ah does not permit.',
        'I am waiting for a "real" visit before I do anything, and the waiting has become the avoidance.',
      ],
    },
    reflection: {
      frame: 'Al-Wakil held what I could not. Ash-Shakur witnessed the small acts.',
      yesLabel: 'The tie was kept when',
      notYetLabel: 'The tie was frayed when',
      rows: [
        {
          id: 'RK1', attr: 'Al-Wakil', attr_ar: 'الوكيل', attrTitle: 'The Trustee',
          attrFrame: 'Did I keep the tie today, whatever came back?',
          yesLabel: 'I kept the tie when',
          notYetLabel: 'I cut or conditioned the tie when',
          governing: 'I reached out to someone in kinship today without needing a particular response to justify the reach.',
          notYet: 'I withheld a call, message, or visit because I was still waiting for the other side to move first.',
        },
        {
          id: 'RS1', attr: 'Ash-Shakur', attr_ar: 'الشكور', attrTitle: 'The Appreciative',
          attrFrame: 'Did I honor the small gesture, or dismiss it as not-enough?',
          yesLabel: 'The small act was honored when',
          notYetLabel: 'The small act was dismissed when',
          governing: 'I did a small thing today in kinship and did not discount it as "nothing."',
          notYet: 'I skipped a small outreach because it felt too small to count.',
        },
      ],
      governing: [
        'I reached out to someone in kinship today without needing a particular response to justify the reach.',
        'I did a small thing today in kinship and did not discount it as "nothing."',
      ],
      notYet: [
        'I withheld a call, message, or visit because I was still waiting for the other side to move first.',
        'I skipped a small outreach because it felt too small to count.',
      ],
    },
  },

  'family-home': {
    attrs: [
      {
        name: 'As-Salam',
        name_ar: 'السلام',
        title: 'The Source of Peace',
        body: 'As-Salam makes the home a place where the nervous system can rest. A Muslim home should feel different from the street outside it — quieter in its conflicts, gentler in its rhythms, safer in its tongues. When As-Salam departs a home, everyone learns to brace as they walk through the door.',
      },
      {
        name: 'Al-Quddus',
        name_ar: 'القدوس',
        title: 'The Pure',
        body: 'Al-Quddus is purity that resists contamination. A home aligned with Al-Quddus is attentive to what crosses its threshold — what is watched, what is spoken, what is consumed — not to become sterile, but to remain a place where hearts stay soft and revelation still reaches them.',
      },
    ],
    dua: {
      title: 'Before Tending to the Home',
      resumeTitle: 'Before Returning to the Home',
      arabic: 'رَّبِّ أَنزِلْنِي مُنزَلًا مُّبَارَكًا وَأَنتَ خَيْرُ الْمُنزِلِينَ',
      trans: "Rabbi anzilnī munzalan mubārakan wa anta khayru-l-munzilīn",
      meaning: 'My Lord, settle me in a blessed landing-place, for You are the best of those who settle.',
      source: 'Surah Al-Muminun 23:29',
    },
    closingDua: {
      title: 'After Tending to the Home',
      arabic: 'رَّبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَلِمَن دَخَلَ بَيْتِيَ مُؤْمِنًا',
      trans: "Rabbi-ghfir lī wa li-wālidayya wa li-man dakhala baytiya muʾminā",
      meaning: 'My Lord, forgive me, my parents, and whoever enters my home as a believer.',
      source: 'Surah Nuh 71:28',
    },
    readiness: {
      frame: 'As-Salam asks: does this home feel safer than the world outside it?',
      yesLabel: 'The home holds peace when',
      notYetLabel: 'The home loses peace when',
      rows: [
        {
          id: 'S1', attr: 'As-Salam', attr_ar: 'السلام', attrTitle: 'The Source of Peace',
          attrFrame: 'Is this home a softer place than the street, or a harder one?',
          yesLabel: 'It is a softer place when',
          notYetLabel: 'It is a harder place when',
          governing: 'I am bringing a softer voice into this home than I would use outside it.',
          notYet: 'My voice at home is sharper than the voice I use with strangers.',
        },
        {
          id: 'S2', attr: 'As-Salam',
          governing: 'The disagreements in this home are handled at a volume the children can witness without harm.',
          notYet: 'Tension in the home is being carried at a pitch the children should not be inheriting.',
        },
        {
          id: 'S3', attr: 'As-Salam',
          governing: 'Guests in this home are met with a hospitality that is not dependent on my mood.',
          notYet: 'I am greeting the door with the mood I had before the knock, not the character Islam asks of the host.',
        },
        {
          id: 'Q1', attr: 'Al-Quddus', attr_ar: 'القدوس', attrTitle: 'The Pure',
          attrFrame: 'Am I paying attention to what crosses this threshold?',
          yesLabel: 'The threshold is kept when',
          notYetLabel: 'The threshold is undefended when',
          governing: 'I am paying attention to what gets watched, said, and consumed under this roof.',
          notYet: 'I have stopped noticing what is normalized in this home because it happens every day.',
        },
        {
          id: 'Q2', attr: 'Al-Quddus',
          governing: 'There is at least one space in this home set apart for remembrance and salah.',
          notYet: 'Every corner of the home is consumed by screens, and nothing is set apart for Allah.',
        },
      ],
      governing: [
        'I am bringing a softer voice into this home than I would use outside it.',
        'The disagreements in this home are handled at a volume the children can witness without harm.',
        'Guests in this home are met with a hospitality that is not dependent on my mood.',
        'I am paying attention to what gets watched, said, and consumed under this roof.',
        'There is at least one space in this home set apart for remembrance and salah.',
      ],
      notYet: [
        'My voice at home is sharper than the voice I use with strangers.',
        'Tension in the home is being carried at a pitch the children should not be inheriting.',
        'I am greeting the door with the mood I had before the knock, not the character Islam asks of the host.',
        'I have stopped noticing what is normalized in this home because it happens every day.',
        'Every corner of the home is consumed by screens, and nothing is set apart for Allah.',
      ],
    },
    reflection: {
      frame: 'As-Salam was the atmosphere of this home today. Al-Quddus watched its threshold.',
      yesLabel: 'The home was a sanctuary when',
      notYetLabel: 'The home was a street when',
      rows: [
        {
          id: 'RS1', attr: 'As-Salam', attr_ar: 'السلام', attrTitle: 'The Source of Peace',
          attrFrame: 'Was this home a softer place today because of me?',
          yesLabel: 'I softened the home when',
          notYetLabel: 'I hardened the home when',
          governing: 'My tone lowered the temperature of the room at least once today.',
          notYet: 'I raised the temperature of the room and did not bring it back down.',
        },
        {
          id: 'RQ1', attr: 'Al-Quddus', attr_ar: 'القدوس', attrTitle: 'The Pure',
          attrFrame: 'Did I guard the threshold today?',
          yesLabel: 'The threshold was kept when',
          notYetLabel: 'The threshold was left open when',
          governing: 'I noticed something that did not belong in this home and addressed it with wisdom.',
          notYet: 'I looked past something I should have addressed because addressing it was inconvenient.',
        },
      ],
      governing: [
        'My tone lowered the temperature of the room at least once today.',
        'I noticed something that did not belong in this home and addressed it with wisdom.',
      ],
      notYet: [
        'I raised the temperature of the room and did not bring it back down.',
        'I looked past something I should have addressed because addressing it was inconvenient.',
      ],
    },
  },

  'family-office': {
    attrs: [
      {
        name: 'Al-Jami',
        name_ar: 'الجامع',
        title: 'The Gatherer',
        body: 'Al-Jami gathers what belongs together. The Family Office is the mechanism through which a household is gathered — its calendar, its announcements, its shared documents. To steward it is to make it easy for your people to find each other, not one more place they get lost.',
      },
      {
        name: 'Al-Hafiz',
        name_ar: 'الحفيظ',
        title: 'The Preserver',
        body: 'Al-Hafiz preserves what is entrusted. The Family Office holds things that matter: decisions made, agreements reached, documents the family will need again. To run it under Al-Hafiz is to treat the record as an amanah, not an inbox.',
      },
    ],
    dua: {
      title: 'Before Running Family Operations',
      resumeTitle: 'Before Returning to Family Operations',
      arabic: 'رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً ۚ إِنَّكَ أَنتَ الْوَهَّابُ',
      trans: "Rabbanā lā tuzigh qulūbanā baʿda idh hadaytanā wa hab lanā min ladunka raḥmah, innaka anta-l-wahhāb",
      meaning: 'Our Lord, let not our hearts deviate after You have guided us, and grant us from Yourself mercy. Indeed, You are the Bestower.',
      source: 'Surah Ali Imran 3:8',
    },
    closingDua: {
      title: 'After Family Operations',
      arabic: 'رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِن قَبْلِنَا',
      trans: "Rabbanā wa lā taḥmil ʿalaynā iṣran kamā ḥamaltahu ʿalā alladhīna min qablinā",
      meaning: 'Our Lord, do not place upon us a burden like You placed upon those before us.',
      source: 'Surah Al-Baqarah 2:286',
    },
    readiness: {
      frame: 'Al-Jami asks: is this hub making the family easier to find — or just adding one more surface?',
      yesLabel: 'The hub gathers well when',
      notYetLabel: 'The hub adds noise when',
      rows: [
        {
          id: 'J1', attr: 'Al-Jami', attr_ar: 'الجامع', attrTitle: 'The Gatherer',
          attrFrame: 'Is the hub making coordination easier, or just more elaborate?',
          yesLabel: 'The hub clarifies when',
          notYetLabel: 'The hub complicates when',
          governing: 'What I am about to post here will actually reach the family member who needs it.',
          notYet: 'I am about to post into a channel my family does not actually read.',
        },
        {
          id: 'J2', attr: 'Al-Jami',
          governing: 'I am using the right surface for this — chat for chat, document for decision, calendar for time.',
          notYet: 'I am about to bury a decision inside a chat thread where it will never be found again.',
        },
        {
          id: 'H1', attr: 'Al-Hafiz', attr_ar: 'الحفيظ', attrTitle: 'The Preserver',
          attrFrame: 'Am I preserving what the family will need to find later?',
          yesLabel: 'The record is preserved when',
          notYetLabel: 'The record is lost when',
          governing: 'I am writing this down in a form the future family can use, not just processing it in my head.',
          notYet: 'I am trusting memory for something the family will dispute the details of in six months.',
        },
        {
          id: 'H2', attr: 'Al-Hafiz',
          governing: 'I am keeping the trust of what is shared here — not gossiping what was said in confidence.',
          notYet: 'I am about to forward something that was said to me in trust.',
        },
      ],
      governing: [
        'What I am about to post here will actually reach the family member who needs it.',
        'I am using the right surface for this — chat for chat, document for decision, calendar for time.',
        'I am writing this down in a form the future family can use, not just processing it in my head.',
        'I am keeping the trust of what is shared here — not gossiping what was said in confidence.',
      ],
      notYet: [
        'I am about to post into a channel my family does not actually read.',
        'I am about to bury a decision inside a chat thread where it will never be found again.',
        'I am trusting memory for something the family will dispute the details of in six months.',
        'I am about to forward something that was said to me in trust.',
      ],
    },
    reflection: {
      frame: 'Al-Jami witnessed what got gathered. Al-Hafiz witnessed what got kept.',
      yesLabel: 'The hub served when',
      notYetLabel: 'The hub failed the family when',
      rows: [
        {
          id: 'RJ1', attr: 'Al-Jami', attr_ar: 'الجامع', attrTitle: 'The Gatherer',
          attrFrame: 'Did the hub gather the family today, or scatter their attention?',
          yesLabel: 'It gathered when',
          notYetLabel: 'It scattered when',
          governing: 'Something I posted today actually helped a family member find what they needed.',
          notYet: 'I added surface without adding clarity today.',
        },
        {
          id: 'RH1', attr: 'Al-Hafiz', attr_ar: 'الحفيظ', attrTitle: 'The Preserver',
          attrFrame: 'Did I preserve what was entrusted to me here?',
          yesLabel: 'I preserved the trust when',
          notYetLabel: 'I failed the trust when',
          governing: 'I captured a decision or document today in a place the family can return to.',
          notYet: 'I let something important pass through chat that should have been filed.',
        },
      ],
      governing: [
        'Something I posted today actually helped a family member find what they needed.',
        'I captured a decision or document today in a place the family can return to.',
      ],
      notYet: [
        'I added surface without adding clarity today.',
        'I let something important pass through chat that should have been filed.',
      ],
    },
  },

  ummah: {
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
  faith: 'Which part of your practice are you performing without presence right now \u2014 and would naming the absence be more honest than continuing the form?',
  family: 'Which family member have you been emotionally absent from \u2014 and is the distance preserving peace, or deferring a conversation they need you to have?',
  life: 'Which signal from your body, heart, or household have you been overriding \u2014 and is continuing to push past it stewardship, or extraction?',
  office: 'What are you about to say that you have not yet fully listened to \u2014 and what would change if you heard it first?',
  tech: 'What shortcut are you about to take \u2014 and who will bear the cost of it later?',
};

// Universal equivalents for the pause protocol
export const PAUSE_UNIVERSAL = {
  acknowledgment: 'Recognizing this pause is itself an act of honest self-assessment. The work will hold.',
  reflection: 'Take a moment of stillness. What needs your attention before you can be fully present here?',
  questions: {
    work: 'What is pulling your attention away from the craft right now \u2014 and can it be set down, or does it need to be addressed first?',
    money: 'What financial reality are you avoiding \u2014 and what would it cost to face it honestly?',
    people: 'Who have you been avoiding, and is the avoidance protecting them or protecting you?',
    faith: 'Which part of your practice are you going through without presence right now \u2014 and would naming the absence be more honest than continuing the form?',
    family: 'Which family member have you been emotionally absent from \u2014 and is the distance keeping peace, or avoiding a conversation they need you to have?',
    life: 'Which signal from your body, mind, or relationships have you been overriding \u2014 and is continuing to push past it sustainable, or depleting?',
    office: 'What are you about to say that you have not yet fully listened to?',
    tech: 'What shortcut are you about to take \u2014 and who will bear the cost of it later?',
  },
};

// Pillar-fallback pause question lookups.
// Try exact moduleId first, then the parent pillar's id, then the work default.
export function getPauseQuestion(moduleId) {
  if (PAUSE_QUESTIONS[moduleId]) return PAUSE_QUESTIONS[moduleId];
  const pillar = getPillarForModule(moduleId);
  if (pillar && PAUSE_QUESTIONS[pillar.id]) return PAUSE_QUESTIONS[pillar.id];
  return PAUSE_QUESTIONS.work;
}

export function getPauseQuestionUniversal(moduleId) {
  const q = PAUSE_UNIVERSAL.questions;
  if (q[moduleId]) return q[moduleId];
  const pillar = getPillarForModule(moduleId);
  if (pillar && q[pillar.id]) return q[pillar.id];
  return q.work;
}

// ── Compassionate Defer ──
// The defer is an act of integrity, not failure.
// The system values the person, not just their output.

export const DEFER_CONTENT = {
  acknowledgment: 'Recognizing you are not yet ready is itself an act of integrity. This is not failure \u2014 it is mu\u1E25\u0101sabah.',
  holdingMessage: 'This module will hold. You can return whenever you are ready.',
  getGuidanceQuestion: (moduleId) => getPauseQuestion(moduleId),
};

export const DEFER_UNIVERSAL = {
  acknowledgment: 'Recognizing you are not yet ready is an honest act of self-awareness. This is not failure.',
  holdingMessage: 'This module will hold. You can return whenever you are ready.',
  reflection: 'Trust the timing. What needs your attention will still be here \u2014 and so will this work, when you are ready for it.',
  getGuidanceQuestion: (moduleId) => getPauseQuestionUniversal(moduleId),
};

// ── Presence Awareness Config ──
export const PRESENCE_CONFIG = {
  INACTIVITY_TIMEOUT_MS: 20 * 60 * 1000,  // 20 minutes
  PRAYER_LEAD_MS: 5 * 60 * 1000,          // 5 minutes before prayer
  PRAYER_TRAIL_MS: 10 * 60 * 1000,        // 10 minutes after prayer
  PRAYER_WARNING_LEAD_MS: 15 * 60 * 1000, // 15 minutes before prayer (warning notification)
};
