// BBOS Stage Islamic Data — full stage-scoped spiritual framing
// Each entry matches the MODULE_ATTRS shape from islamic-data.js:
//   attrs[], dua{}, readiness{frame, rows[], governing[], notYet[]}, reflection{frame, governing[], notYet[]}
// Consumed by IslamicPanel and ThresholdModal when activeBbosStage is set.
//
// Attributes and du'as follow wiki/decisions/2026-10-17-bbos-stage-grounding-reconciliation.md.
// `dua.source` / `closingDua.source` stay the display string (useCitations keys on it);
// `sources[]` beside it carries the structured grounding (docs/grounding-schema.md).
// A stage without `closingDua` falls back to ONGOING_DUA in CeremonyFlow.

import { hydrateAttrs } from '../islamic/divine-names';

export const BBOS_STAGE_ISLAMIC = {
  IDY: {
    attrs: [
      {
        nameKey: 'al-awwal',
        description: "Every business begins not with your decision but with His permission, and founding a venture in His name anchors it to the only source that cannot be taken away. Al-Awwal is before everything, with nothing before Him — there was no moment in which He was not.",
      },
      {
        nameKey: 'ash-shahid',
        description: "A foundation is laid in the presence of Ash-Shahīd, who witnesses every intention and every act. He sees the venture as it truly is, not as the pitch says it is — so state your niyyah and lay each stone as though it is witnessed, because it is.",
      },
    ],
    dua: {
      title: 'Before Establishing the Foundation',
      resumeTitle: 'Before Returning to Foundation Work',
      arabic: 'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي',
      trans: 'Rabbi ashraḥ lī ṣadrī wa yassir lī amrī',
      meaning: 'My Lord, expand for me my breast and ease for me my task.',
      source: 'Surah Ta-Ha 20:25–26',
      sources: [
        {
          kind: 'quran', ref: 'Quran 20:25-26',
          arabic: 'رَبِّ ٱشْرَحْ لِى صَدْرِى ۝ وَيَسِّرْ لِىٓ أَمْرِى',
          translation: 'My Lord, expand for me my breast [with assurance] and ease for me my task.',
          relevance: 'direct', provenanceTier: 'Bayyinah',
          rationale: "Musa's supplication at the commissioning of his mission — the Qur'anic du'a for beginning a weighty undertaking.",
        },
      ],
    },
    closingDua: {
      title: 'Closing Supplication',
      arabic: 'اللَّهُمَّ أَرِنَا الْحَقَّ حَقًّا وَارْزُقْنَا اتِّبَاعَهُ، وَأَرِنَا الْبَاطِلَ بَاطِلًا وَارْزُقْنَا اجْتِنَابَهُ',
      trans: 'Allāhumma arinā l-ḥaqqa ḥaqqan wa-rzuqnā ttibāʿah, wa arinā l-bāṭila bāṭilan wa-rzuqnā jtinābah',
      meaning: 'O Allah, show us the truth as truth and grant us to follow it, and show us falsehood as falsehood and grant us to avoid it.',
      source: 'Non-prophetic supplication — not a hadith',
    },
    readiness: {
      frame: 'Al-Awwal asks: does this foundation begin with His name or my ambition?',
      yesLabel: 'This foundation begins with His name when',
      notYetLabel: 'This foundation begins with my ambition when',
      rows: [
        {
          id: 'A1', attr: 'Al-Awwal', attr_ar: 'الأوّل', attrTitle: 'The First',
          attrFrame: 'Is this beginning His or mine?',
          yesLabel: 'This beginning is His when',
          notYetLabel: 'This beginning is still mine when',
          governing: 'My niyyah (intention) for this business is clear, halal, and stated before Allah.',
          notYet: 'I have not yet articulated why I am building this — the foundation is on assumption.',
        },
        {
          id: 'A2', attr: 'Al-Awwal',
          governing: 'The mission and values I am establishing would survive scrutiny before Allah.',
          notYet: 'The stated values and the actual plan are not yet aligned.',
        },
        {
          id: 'S1', attr: 'Ash-Shahid', attr_ar: 'الشهيد', attrTitle: 'The Witness',
          attrFrame: 'Would this foundation hold if every part of it were witnessed?',
          yesLabel: 'The foundation holds under witness when',
          notYetLabel: 'The foundation hides something when',
          governing: 'Every element I am establishing — the mission, the model, the money — I am content for Allah to witness.',
          notYet: 'There is a part of this foundation I would rather keep unseen.',
        },
        {
          id: 'S2', attr: 'Ash-Shahid',
          governing: 'What I have written down about this foundation matches what I am actually building.',
          notYet: 'The written foundation describes the business I want others to see, not the one I am building.',
        },
      ],
      governing: [
        'My niyyah for this business is clear, halal, and stated before Allah.',
        'The mission and values I am establishing would survive scrutiny before Allah.',
        'Every element I am establishing — the mission, the model, the money — I am content for Allah to witness.',
        'What I have written down about this foundation matches what I am actually building.',
      ],
      notYet: [
        'I have not yet articulated why I am building this — the foundation is on assumption.',
        'The stated values and the actual plan are not yet aligned.',
        'There is a part of this foundation I would rather keep unseen.',
        'The written foundation describes the business I want others to see, not the one I am building.',
      ],
    },
    reflection: {
      frame: 'Al-Awwal gave this work a beginning. Ash-Shahid witnessed how it was laid.',
      yesLabel: 'Intention and integrity were present when',
      notYetLabel: 'The work was mechanical when',
      governing: [
        'The foundation I established today is something I would not be ashamed to present to Allah.',
        'I laid at least one part of the foundation today exactly as I would want it witnessed.',
      ],
      notYet: [
        'The work today was mechanical rather than intentional.',
        'I built on assumption rather than on verified foundation.',
      ],
    },
  },

  CRD: {
    attrs: [
      {
        nameKey: 'al-haqq',
        description: "Credibility is borrowed from the truth or it is not credibility at all: every claim, testimonial and credential either corresponds to what is real or it is gharar. Al-Ḥaqq is the Truth whose being and word never fail — build trust only on what He would confirm.",
      },
      {
        nameKey: 'al-khabir',
        description: "Trust built on appearances collapses when the inner reality surfaces. Al-Khabīr knows the inner reality of things — the hidden motive, the omitted limitation, the gap between the brochure and the business — so make the inside of your credibility match the outside.",
      },
    ],
    dua: {
      title: 'Before Building Trust and Credibility',
      resumeTitle: 'Before Returning to Truth Work',
      arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا إِن تَتَّقُوا اللَّهَ يَجْعَل لَّكُمْ فُرْقَانًا وَيُكَفِّرْ عَنكُمْ سَيِّئَاتِكُمْ وَيَغْفِرْ لَكُمْ ۗ وَاللَّهُ ذُو الْفَضْلِ الْعَظِيمِ',
      trans: 'Yā ayyuhā alladhīna āmanū in tattaqū Allāha yajʿal lakum furqānā wa yukaffir ʿankum sayyiʾātikum wa yaghfir lakum, wa Allāhu dhū al-faḍli al-ʿaẓīm',
      meaning: 'O you who have believed, if you fear Allah, He will grant you a criterion and will remove from you your misdeeds and forgive you. And Allah is the possessor of great bounty.',
      source: 'Surah Al-Anfal 8:29',
      sources: [
        {
          kind: 'quran', ref: 'Quran 8:29',
          arabic: 'يَـٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوٓا۟ إِن تَتَّقُوا۟ ٱللَّهَ يَجْعَل لَّكُمْ فُرْقَانًا وَيُكَفِّرْ عَنكُمْ سَيِّـَٔاتِكُمْ وَيَغْفِرْ لَكُمْ ۗ وَٱللَّهُ ذُو ٱلْفَضْلِ ٱلْعَظِيمِ',
          translation: 'O you who have believed, if you fear Allah, He will grant you a criterion and will remove from you your misdeeds and forgive you. And Allah is the possessor of great bounty.',
          relevance: 'direct', provenanceTier: 'Bayyinah',
          rationale: 'Taqwa is promised a furqan — the criterion that separates truth from falsehood — which is the faculty credibility work depends on.',
        },
      ],
    },
    readiness: {
      frame: 'Al-Haqq asks: is every claim I am making today verifiable and true?',
      yesLabel: 'My claims are verifiable and true when',
      notYetLabel: 'My claims fall short of truth when',
      rows: [
        {
          id: 'H1', attr: 'Al-Haqq', attr_ar: 'الحق', attrTitle: 'The Absolute Truth',
          attrFrame: 'Can everything I am publishing be authenticated?',
          yesLabel: 'Everything I publish is authenticated when',
          notYetLabel: 'My claims are not yet substantiated when',
          governing: 'Every claim, testimonial, and credential I am presenting can be independently verified.',
          notYet: 'Some of what I am presenting is aspirational rather than substantiated.',
        },
        {
          id: 'H2', attr: 'Al-Haqq',
          governing: 'I have not exaggerated results or omitted relevant limitations.',
          notYet: 'I am shaping the truth to look better than it is — this is gharar.',
        },
        {
          id: 'K1', attr: 'Al-Khabir', attr_ar: 'الخبير', attrTitle: 'The All-Aware',
          attrFrame: 'Does the inside of my credibility match the outside?',
          yesLabel: 'Inside and outside match when',
          notYetLabel: 'The surface is carrying the claim when',
          governing: 'What a client would find behind my claims is the same as what the claims say.',
          notYet: 'There is a gap between what I present and what is actually happening behind it.',
        },
        {
          id: 'K2', attr: 'Al-Khabir',
          governing: 'My amanah (trustworthiness) is more important to me than any short-term conversion.',
          notYet: 'I am tempted to overstate in order to close faster.',
        },
      ],
      governing: [
        'Every claim, testimonial, and credential I am presenting can be independently verified.',
        'I have not exaggerated results or omitted relevant limitations.',
        'What a client would find behind my claims is the same as what the claims say.',
        'My amanah is more important to me than any short-term conversion.',
      ],
      notYet: [
        'Some of what I am presenting is aspirational rather than substantiated.',
        'I am shaping the truth to look better than it is — this is gharar.',
        'There is a gap between what I present and what is actually happening behind it.',
        'I am tempted to overstate in order to close faster.',
      ],
    },
    reflection: {
      frame: 'Al-Haqq anchored my claims in truth. Al-Khabir saw what lay behind them.',
      yesLabel: 'Truth and trust were present when',
      notYetLabel: 'Truth was compromised when',
      governing: [
        'I can point to something today where I chose honesty over advantage.',
        'What I presented today matched what is actually there underneath.',
      ],
      notYet: [
        'I compromised on a claim and told myself it was acceptable.',
        'I let a surface impression stand that the inner reality would not support.',
      ],
    },
  },

  STR: {
    attrs: [
      {
        nameKey: 'al-basir',
        description: "Strategy begins with sight: seeing the market, the capacity and the constraint as they are, not as you wish them to be. Al-Baṣīr sees all things, the evident and the hidden, and nothing escapes His sight — so plan from what is actually there, and ask Him for the knowledge you lack.",
      },
      {
        nameKey: 'al-musawwir',
        description: "Strategy is the act of fashioning form from possibility — defining how things will be arranged — so bring precision to your operational design. Al-Muṣawwir gives each created thing its own shape, face and colour: form is assigned, never accidental.",
      },
    ],
    dua: {
      title: 'Before Strategic Planning',
      resumeTitle: 'Before Returning to Strategy Work',
      arabic: 'وَقُل رَّبِّ زِدْنِي عِلْمًا',
      trans: 'Wa qul rabbi zidnī ʿilmā',
      meaning: 'And say, "My Lord, increase me in knowledge."',
      source: 'Surah Ta-Ha 20:114 (excerpt)',
      sources: [
        {
          kind: 'quran', ref: 'Quran 20:114',
          arabic: 'وَقُل رَّبِّ زِدْنِى عِلْمًا',
          translation: 'And say, "My Lord, increase me in knowledge."',
          relevance: 'direct', provenanceTier: 'Bayyinah',
          rationale: 'The one supplication for increase the Prophet ﷺ is commanded to make; planning starts from asking for the knowledge one lacks. Quoted alone — nothing appended.',
        },
      ],
    },
    readiness: {
      frame: 'Al-Basir asks: does the structure I am building rest on what I actually see, or on what I hope?',
      yesLabel: 'The structure rests on sight when',
      notYetLabel: 'The structure rests on hope when',
      rows: [
        {
          id: 'B1', attr: 'Al-Basir', attr_ar: 'البصير', attrTitle: 'The All-Seeing',
          attrFrame: 'Am I planning from what is actually there?',
          yesLabel: 'I am planning from sight when',
          notYetLabel: 'I am planning from hope when',
          governing: 'I have looked honestly at my capacity, my market and my constraints before committing to the plan.',
          notYet: 'The plan assumes resources, demand or time I have not verified.',
        },
        {
          id: 'B2', attr: 'Al-Basir',
          governing: 'I have planned thoroughly and am at peace that what I cannot see is seen by Him.',
          notYet: 'I am gripping the outcomes of my strategy as though my sight were the only sight.',
        },
        {
          id: 'S1', attr: 'Al-Musawwir', attr_ar: 'المصوّر', attrTitle: 'The Fashioner of Forms',
          attrFrame: 'Is the structure I am designing genuinely purposeful?',
          yesLabel: 'The structure is purposeful when',
          notYetLabel: 'The structure is cosmetic when',
          governing: 'The system or process I am designing serves real needs — not organizational aesthetics.',
          notYet: 'I am building structure that looks organized but does not reduce actual friction.',
        },
        {
          id: 'S2', attr: 'Al-Musawwir',
          governing: 'The team architecture and roles reflect the actual work to be done, not titles desired.',
          notYet: 'Roles are defined around people, not around what the business genuinely needs.',
        },
      ],
      governing: [
        'I have looked honestly at my capacity, my market and my constraints before committing to the plan.',
        'I have planned thoroughly and am at peace that what I cannot see is seen by Him.',
        'The system or process I am designing serves real needs — not organizational aesthetics.',
        'The team architecture and roles reflect the actual work to be done, not titles desired.',
      ],
      notYet: [
        'The plan assumes resources, demand or time I have not verified.',
        'I am gripping the outcomes of my strategy as though my sight were the only sight.',
        'I am building structure that looks organized but does not reduce actual friction.',
        'Roles are defined around people, not around what the business genuinely needs.',
      ],
    },
    reflection: {
      frame: 'Al-Basir saw what my planning could not. Al-Musawwir gave it form.',
      yesLabel: 'Sight and form were present when',
      notYetLabel: 'Urgency or control remained when',
      governing: [
        'The strategy I worked on today is clearer and more executable than when I started.',
        'I planned from what I actually saw — and asked for the knowledge I lacked.',
      ],
      notYet: [
        'The planning session added complexity rather than clarity.',
        'I am still carrying the weight of how the strategy will land rather than trusting the One who sees it whole.',
      ],
    },
  },

  OFR: {
    attrs: [
      {
        nameKey: 'al-adl',
        description: "Pricing is a scale held between you and the client, and only a fair exchange carries barakah. Al-ʿAdl is perfectly just in every decree, wronging no one by an atom's weight — so weigh value and price as though the scale is His, because it is.",
      },
      {
        nameKey: 'al-muqsit',
        description: "Equity goes beyond the letter of the contract: terms both parties read the same way, scope without hidden gaps, nothing that quietly tips the balance. Al-Muqsiṭ establishes equity between all parties and loves those who act with it — so make the offer fair to the one with less power.",
      },
    ],
    dua: {
      title: 'Before Defining and Pricing the Offering',
      resumeTitle: 'Before Returning to Offering Work',
      arabic: 'وَأَقِيمُوا الْوَزْنَ بِالْقِسْطِ وَلَا تُخْسِرُوا الْمِيزَانَ',
      trans: 'Wa aqīmu l-wazna bil-qisṭi wa lā tukhsiru l-mīzān',
      meaning: 'And establish weight in justice and do not make deficient the balance.',
      source: 'Surah Ar-Rahman 55:9',
      sources: [
        {
          kind: 'quran', ref: 'Quran 55:9',
          arabic: 'وَأَقِيمُوا۟ ٱلْوَزْنَ بِٱلْقِسْطِ وَلَا تُخْسِرُوا۟ ٱلْمِيزَانَ',
          translation: 'And establish weight in justice and do not make deficient the balance.',
          relevance: 'direct', provenanceTier: 'Bayyinah',
          rationale: 'A direct command to weigh with qist and never short the balance — the governing rule for setting a price.',
        },
      ],
    },
    closingDua: {
      title: 'Closing Supplication',
      arabic: 'وَأَسْأَلُكَ كَلِمَةَ الْحَقِّ فِي الرِّضَا وَالْغَضَبِ',
      trans: 'Wa asʾaluka kalimata l-ḥaqqi fi r-riḍā wa l-ghaḍab',
      meaning: 'And I ask You [to make me] true in speech in times of pleasure and of anger.',
      source: "Sunan an-Nasa'i 1305 (excerpt)",
      sources: [
        {
          kind: 'hadith', ref: "Sunan an-Nasa'i 1305",
          arabic: 'وَأَسْأَلُكَ كَلِمَةَ الْحَقِّ فِي الرِّضَا وَالْغَضَبِ',
          translation: 'I ask You [to make me] true in speech in times of pleasure and of anger.',
          relevance: 'direct', provenanceTier: 'Bayyinah', hadithGrade: 'Hasan (Darussalam)',
          rationale: "One clause of the prayer ʿAmmar ibn Yasir learned from the Prophet ﷺ (parallel chain at Nasa'i 1306), in its exact wording: truthful terms whether the negotiation pleases or provokes.",
        },
      ],
    },
    readiness: {
      frame: 'Al-Adl asks: is this offer a fair exchange, free from deception?',
      yesLabel: 'The offer is a fair exchange when',
      notYetLabel: 'The offer contains deception when',
      rows: [
        {
          id: 'A1', attr: 'Al-Adl', attr_ar: 'العدل', attrTitle: 'The Utterly Just',
          attrFrame: 'Is the price a just weight for what the client receives?',
          yesLabel: 'The price is a just weight when',
          notYetLabel: 'The price is a short weight when',
          governing: 'The offer is priced based on the real value it delivers — not on what the market will bear through pressure.',
          notYet: 'The pricing reflects extraction rather than fair exchange.',
        },
        {
          id: 'A2', attr: 'Al-Adl',
          governing: 'There is no gharar (ambiguity) in the offer — scope, deliverables, and terms are clear.',
          notYet: 'The offer contains undefined elements that the client cannot accurately evaluate.',
        },
        {
          id: 'Q1', attr: 'Al-Muqsit', attr_ar: 'المقسط', attrTitle: 'The Equitable',
          attrFrame: 'Is this offer equitable to the one with less power?',
          yesLabel: 'The offer is equitable when',
          notYetLabel: 'The offer tips the balance when',
          governing: 'The value the client receives exceeds what I have charged — I would be proud to show this to Allah.',
          notYet: 'The price-to-value ratio advantages me disproportionately over the client.',
        },
        {
          id: 'Q2', attr: 'Al-Muqsit',
          governing: 'The terms read the same way to the client as they do to me — nothing in them quietly favors my side.',
          notYet: 'The terms contain conditions the client is unlikely to notice until they cost them.',
        },
      ],
      governing: [
        'The offer is priced based on the real value it delivers — not on what the market will bear through pressure.',
        'There is no gharar (ambiguity) in the offer — scope, deliverables, and terms are clear.',
        'The value the client receives exceeds what I have charged.',
        'The terms read the same way to the client as they do to me — nothing in them quietly favors my side.',
      ],
      notYet: [
        'The pricing reflects extraction rather than fair exchange.',
        'The offer contains undefined elements that the client cannot accurately evaluate.',
        'The price-to-value ratio advantages me disproportionately over the client.',
        'The terms contain conditions the client is unlikely to notice until they cost them.',
      ],
    },
    reflection: {
      frame: 'Al-Adl held the scale of my pricing. Al-Muqsit weighed the terms between us.',
      yesLabel: 'Justice and equity were present when',
      notYetLabel: 'Extraction or ambiguity entered when',
      governing: [
        'The offer I worked on today is something I would be proud to present to Allah.',
        'I chose the fairer term where I could have chosen the more profitable one.',
      ],
      notYet: [
        'The offer was shaped more by competitive pressure than by genuine value.',
        'I did not make it as clear as it could be — ambiguity remains.',
      ],
    },
  },

  OUT: {
    attrs: [
      {
        nameKey: 'ar-razzaq',
        description: "Outreach is effort, not provision: you put the right thing before the right people, and the response is apportioned by Ar-Razzāq, who provides for every living thing. Scarcity tactics betray a doubt that He is enough — reach out with dignity; the provision was never yours to force.",
      },
      {
        nameKey: 'as-sittir',
        description: "Outreach tempts you to expose — a competitor's weakness, a prospect's pain, a past client's failure — to make your case. As-Sittīr is Modest and Concealing and loves that faults be covered, so reach people without exposing anyone, and trust Him to cover what you leave covered.",
      },
    ],
    dua: {
      title: 'Before Reaching Out',
      resumeTitle: 'Before Resuming Outreach',
      arabic: 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ ۝ نِعْمَ الْمَوْلَىٰ وَنِعْمَ النَّصِيرُ',
      trans: 'Ḥasbunā Allāhu wa niʿma l-wakīl … niʿma l-mawlā wa niʿma n-naṣīr',
      meaning: 'Sufficient for us is Allah, and He is the best Disposer of affairs. … Excellent is the Protector, and excellent is the Helper.',
      source: 'Surah Aal-Imran 3:173 + Surah Al-Anfal 8:40 (excerpts)',
      sources: [
        {
          kind: 'quran', ref: 'Quran 3:173',
          arabic: 'حَسْبُنَا ٱللَّهُ وَنِعْمَ ٱلْوَكِيلُ',
          translation: 'Sufficient for us is Allah, and [He is] the best Disposer of affairs.',
          relevance: 'direct', provenanceTier: 'Bayyinah',
          rationale: 'The believers\' answer when told that people had gathered against them — sufficiency in Allah in place of fear, the opposite of scarcity-driven outreach.',
        },
        {
          kind: 'quran', ref: 'Quran 8:40',
          arabic: 'نِعْمَ ٱلْمَوْلَىٰ وَنِعْمَ ٱلنَّصِيرُ',
          translation: 'Excellent is the protector, and excellent is the helper.',
          relevance: 'direct', provenanceTier: 'Bayyinah',
          rationale: 'Closing clause of the ayah: whoever turns away, Allah remains the believer\'s Protector and Helper — the response is not the measure of the effort.',
        },
      ],
    },
    readiness: {
      frame: 'Ar-Razzaq asks: am I reaching out from trust in His provision, or from scarcity?',
      yesLabel: 'I am reaching out from trust when',
      notYetLabel: 'I am reaching out from scarcity when',
      rows: [
        {
          id: 'R1', attr: 'Ar-Razzaq', attr_ar: 'الرزّاق', attrTitle: 'The Provider',
          attrFrame: 'Am I reaching out from trust or from scarcity?',
          yesLabel: 'I am reaching out from trust when',
          notYetLabel: 'I am reaching out from scarcity when',
          governing: 'The outreach message offers a genuine path forward — it does not exploit fear or scarcity.',
          notYet: 'The message uses urgency, pressure, or scarcity tactics that are not genuinely true.',
        },
        {
          id: 'R2', attr: 'Ar-Razzaq',
          governing: 'I have identified the right people to reach — those who genuinely need what I offer.',
          notYet: 'I am broadcasting broadly because I do not trust that the right people are enough.',
        },
        {
          id: 'C1', attr: 'As-Sittir', attr_ar: 'الستير', attrTitle: 'The Concealer',
          attrFrame: 'Does my outreach cover what should be covered?',
          yesLabel: 'My outreach covers when',
          notYetLabel: 'My outreach exposes when',
          governing: 'My outreach makes its case without exposing a competitor, a prospect, or a past client.',
          notYet: "I am using someone else's fault or failure to make my offer look better.",
        },
        {
          id: 'C2', attr: 'As-Sittir',
          governing: 'Every case study and story I share has consent, and private details stay private.',
          notYet: "I am sharing a client's situation in more detail than they agreed to.",
        },
      ],
      governing: [
        'The outreach message offers a genuine path forward — it does not exploit fear or scarcity.',
        'I have identified the right people to reach — those who genuinely need what I offer.',
        'My outreach makes its case without exposing a competitor, a prospect, or a past client.',
        'Every case study and story I share has consent, and private details stay private.',
      ],
      notYet: [
        'The message uses urgency, pressure, or scarcity tactics that are not genuinely true.',
        'I am broadcasting broadly because I do not trust that the right people are enough.',
        "I am using someone else's fault or failure to make my offer look better.",
        "I am sharing a client's situation in more detail than they agreed to.",
      ],
    },
    reflection: {
      frame: 'Ar-Razzaq apportioned the response. As-Sittir covered what I left covered.',
      yesLabel: 'Trust and discretion were present when',
      notYetLabel: 'Scarcity or exposure entered when',
      governing: [
        'The outreach I executed today was something I would be comfortable presenting to Allah.',
        'I made my case today without exposing anyone.',
      ],
      notYet: [
        'The messaging was shaped more by scarcity than by trust in His provision.',
        'I used a tactic today I would not want on my account.',
      ],
    },
  },

  SLS: {
    attrs: [
      {
        nameKey: 'as-sami',
        description: "Sales is not a performance but a conversation witnessed: every claim, every promise and every silence is on the record. As-Samīʿ receives every sound, whisper and unspoken plea, and nothing is ever mislaid on Him — so sell as though Allah is listening, because He is.",
      },
      {
        nameKey: 'al-latif',
        description: "A sales conversation turns on what is barely said: the hesitation, the constraint they are embarrassed to name, the question behind the question. Al-Laṭīf works through details too fine to notice and is gentle with His servants — so sell gently, and attend to what is not said.",
      },
    ],
    dua: {
      title: 'Before Sales Conversations',
      resumeTitle: 'Before Resuming Sales Work',
      arabic: 'اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا، وَأَنْتَ تَجْعَلُ الْحَزْنَ سَهْلًا إِذَا شِئْتَ',
      trans: 'Allāhumma lā sahla illā mā jaʿaltahu sahlā, wa anta tajʿalu l-ḥazna sahlan idhā shiʾt',
      meaning: 'O Allah, nothing is easy except what You make easy, and You make the difficult easy if You will.',
      source: 'Sahih Ibn Hibban 974',
      sources: [
        {
          kind: 'hadith', ref: 'Sahih Ibn Hibban 974',
          arabic: 'اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا وَأَنْتَ تَجْعَلُ الْحَزْنَ سَهْلًا إِذَا شِئْتَ',
          translation: 'O Allah, nothing is easy except what You make easy, and You make the difficult easy if You will.',
          relevance: 'direct', provenanceTier: 'Bayyinah', hadithGrade: 'Sahih (al-Albani, al-Taʿliqat al-Hisan 970 / al-Sahihah 2643; Ibn Hajar, al-Futuhat al-Rabbaniyya 4/25)',
          rationale: "A prophetic du'a narrated by Anas, also in Ibn al-Sunni 351 and al-Bayhaqi's al-Daʿawat 266. 974 is the al-Ihsan number (ed. al-Arnaʾut, al-Risalah); checked against al-Albani's al-Taʿliqat al-Hisan (no. 970 = 974) and the Dar Ibn Hazm al-Taqasim wa-l-Anwaʿ (no. 6737 = 974). The Arabic follows Ibn Hibban's wording; Ibn al-Sunni's has 'idha shiʾta sahla'.",
        },
      ],
    },
    closingDua: {
      title: 'Closing Reflection',
      arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللَّهَ وَقُولُوا قَوْلًا سَدِيدًا ۝ يُصْلِحْ لَكُمْ أَعْمَالَكُمْ وَيَغْفِرْ لَكُمْ ذُنُوبَكُمْ',
      trans: 'Yā ayyuhā alladhīna āmanū ittaqū Allāha wa qūlū qawlan sadīdā. Yuṣliḥ lakum aʿmālakum wa yaghfir lakum dhunūbakum',
      meaning: 'O you who have believed, fear Allah and speak words of appropriate justice. He will amend for you your deeds and forgive you your sins.',
      source: 'Surah Al-Ahzab 33:70–71',
      sources: [
        {
          kind: 'quran', ref: 'Quran 33:70-71',
          arabic: 'يَـٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوا۟ ٱتَّقُوا۟ ٱللَّهَ وَقُولُوا۟ قَوْلًا سَدِيدًا ۝ يُصْلِحْ لَكُمْ أَعْمَـٰلَكُمْ وَيَغْفِرْ لَكُمْ ذُنُوبَكُمْ',
          translation: 'O you who have believed, fear Allah and speak words of appropriate justice. He will [then] amend for you your deeds and forgive you your sins.',
          relevance: 'direct', provenanceTier: 'Bayyinah',
          rationale: 'Straight speech (qawl sadid) is tied to the setting-right of deeds — the measure for what was said in the sales conversation.',
        },
      ],
    },
    readiness: {
      frame: 'As-Sami asks: am I entering this conversation to listen, or to perform?',
      yesLabel: 'I am entering to listen when',
      notYetLabel: 'I am entering to perform when',
      rows: [
        {
          id: 'S1', attr: 'As-Sami', attr_ar: 'السميع', attrTitle: 'The All-Hearing',
          attrFrame: 'Am I genuinely listening or waiting to speak?',
          yesLabel: 'I am genuinely listening when',
          notYetLabel: 'I am waiting to speak when',
          governing: 'I am entering this conversation with the intention to understand the prospect first.',
          notYet: 'I am entering with a script rather than an open posture of listening.',
        },
        {
          id: 'S2', attr: 'As-Sami',
          governing: 'Every commitment I make in this conversation is one I can keep.',
          notYet: 'I am tempted to promise things I am not sure I can deliver.',
        },
        {
          id: 'L1', attr: 'Al-Latif', attr_ar: 'اللطيف', attrTitle: 'The Subtly Kind',
          attrFrame: 'Am I attending to what is not being said?',
          yesLabel: 'I am attending to the unspoken when',
          notYetLabel: 'I am hearing only the surface when',
          governing: "I can articulate the prospect's actual situation — including what they have not said — and whether my offer genuinely fits.",
          notYet: 'I am trying to sell regardless of fit — the offer is not right for this person right now.',
        },
        {
          id: 'L2', attr: 'Al-Latif',
          governing: 'If this offer is not the right fit, I am willing to say so gently and honestly.',
          notYet: 'I am pushing toward a close even where there is doubt about fit.',
        },
      ],
      governing: [
        'I am entering this conversation with the intention to understand the prospect first.',
        'Every commitment I make in this conversation is one I can keep.',
        "I can articulate the prospect's actual situation — including what they have not said — and whether my offer genuinely fits.",
        'If this offer is not the right fit, I am willing to say so gently and honestly.',
      ],
      notYet: [
        'I am entering with a script rather than an open posture of listening.',
        'I am tempted to promise things I am not sure I can deliver.',
        'I am trying to sell regardless of fit — the offer is not right for this person right now.',
        'I am pushing toward a close even where there is doubt about fit.',
      ],
    },
    reflection: {
      frame: 'As-Sami heard every word of my conversations. Al-Latif attended to what lay beneath them.',
      yesLabel: 'Listening and gentleness were present when',
      notYetLabel: 'Performance or pressure entered when',
      governing: [
        'I listened before speaking in at least one conversation today.',
        'I kept every promise made — or clarified a commitment before it became a breach.',
      ],
      notYet: [
        'A conversation today was more performance than service.',
        'I made a commitment I am not fully confident I can keep.',
      ],
    },
  },

  DEL: {
    attrs: [
      {
        nameKey: 'al-muhsin',
        description: "Delivery with ihsan exceeds the specification not for commercial advantage but because the work deserves to be done well; every deliverable carrying genuine excellence is an act of worship. Al-Muḥsin does everything with perfect care and prescribes the same care of us.",
      },
      {
        nameKey: 'al-wali',
        description: "Delivery is where you stand by the client after the sale and become, in a small way, their ally in the outcome. Al-Walī is the Protecting Friend of those who believe, bringing them out of darkness into light — so stand by those you serve, and take Him as Protector in what you cannot carry.",
      },
    ],
    dua: {
      title: 'Before Delivering Work',
      resumeTitle: 'Before Resuming Delivery',
      arabic: 'رَبَّنَا تَقَبَّلْ مِنَّا ۖ إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ',
      trans: 'Rabbanā taqabbal minnā, innaka anta s-samīʿu l-ʿalīm',
      meaning: 'Our Lord, accept [this] from us. Indeed, You are the Hearing, the Knowing.',
      source: 'Surah Al-Baqarah 2:127 (excerpt)',
      sources: [
        {
          kind: 'quran', ref: 'Quran 2:127',
          arabic: 'رَبَّنَا تَقَبَّلْ مِنَّآ ۖ إِنَّكَ أَنتَ ٱلسَّمِيعُ ٱلْعَلِيمُ',
          translation: 'Our Lord, accept [this] from us. Indeed, You are the Hearing, the Knowing.',
          relevance: 'direct', provenanceTier: 'Bayyinah',
          rationale: "Ibrahim and Ismaʿil's du'a while raising the foundations of the House — delivered work offered for acceptance rather than applause.",
        },
        {
          kind: 'hadith', ref: 'Sahih Muslim 1955',
          arabic: 'إِنَّ اللَّهَ كَتَبَ الإِحْسَانَ عَلَى كُلِّ شَىْءٍ',
          translation: 'Verily Allah has enjoined goodness (ihsan) to everything.',
          relevance: 'contextual', provenanceTier: 'Bayyinah', hadithGrade: 'Sahih',
          rationale: "Narrated by Shaddad ibn Aws: ihsan is prescribed in every act — the stage's anchor for delivering with excellence.",
        },
      ],
    },
    readiness: {
      frame: 'Al-Muhsin asks: am I bringing ihsan to this delivery, or just getting it done?',
      yesLabel: 'I am bringing ihsan to this delivery when',
      notYetLabel: 'I am just getting it done when',
      rows: [
        {
          id: 'M1', attr: 'Al-Muhsin', attr_ar: 'المحسن', attrTitle: 'The Doer of Excellence',
          attrFrame: 'Am I delivering with ihsan or with adequacy?',
          yesLabel: 'I am delivering with ihsan when',
          notYetLabel: 'I am delivering with adequacy when',
          governing: 'I am approaching this deliverable with the intention of excellence, not just completion.',
          notYet: 'I am doing the minimum that will pass, not the most genuinely possible right now.',
        },
        {
          id: 'M2', attr: 'Al-Muhsin',
          governing: 'I would redo this if it fell short — from genuine care, not perfectionism.',
          notYet: 'The work feels like an obligation to discharge rather than an act to offer.',
        },
        {
          id: 'W1', attr: 'Al-Wali', attr_ar: 'الولي', attrTitle: 'The Protecting Friend',
          attrFrame: 'Am I standing by the client, or handing off and walking away?',
          yesLabel: 'I am standing by the client when',
          notYetLabel: 'I am walking away when',
          governing: "I am delivering as the client's ally in the outcome, not only as the supplier of the deliverable.",
          notYet: 'Once the deliverable is handed over, the client is on their own.',
        },
        {
          id: 'W2', attr: 'Al-Wali',
          governing: 'My communication quality during delivery matches my work quality.',
          notYet: 'I am delivering good work but communicating poorly — the client cannot see what they are receiving.',
        },
      ],
      governing: [
        'I am approaching this deliverable with the intention of excellence, not just completion.',
        'I would redo this if it fell short — from genuine care, not perfectionism.',
        "I am delivering as the client's ally in the outcome, not only as the supplier of the deliverable.",
        'My communication quality during delivery matches my work quality.',
      ],
      notYet: [
        'I am doing the minimum that will pass, not the most genuinely possible right now.',
        'The work feels like an obligation to discharge rather than an act to offer.',
        'Once the deliverable is handed over, the client is on their own.',
        'I am delivering good work but communicating poorly — the client cannot see what they are receiving.',
      ],
    },
    reflection: {
      frame: 'Al-Muhsin witnessed the quality of my delivery. Al-Wali stood with those I served.',
      yesLabel: 'Ihsan and loyalty were present when',
      notYetLabel: 'Adequacy or abandonment entered when',
      governing: [
        'I can point to at least one place in the delivery today where I chose quality over speed.',
        'I stood by a client in something beyond the letter of the deliverable.',
      ],
      notYet: [
        'I cut corners on something and justified it as efficiency.',
        'The communication around the delivery fell short of the work itself.',
      ],
    },
  },

  RET: {
    attrs: [
      {
        nameKey: 'ash-shakur',
        description: "Retention begins with gratitude: for the client who stayed, the referral given, the patience extended when you fell short. Ash-Shakūr rewards a small deed with much and lets no good go unacknowledged — so appreciate those who trust you, specifically and visibly, as He appreciates you.",
      },
      {
        nameKey: 'al-wadud',
        description: "Retention rooted in genuine care outlasts retention built on tactics: love the client enough to tell them hard truths, invest in their growth, remember them when there is nothing to sell. Al-Wadūd loves warmly and steadily, never switching off when a person slips.",
      },
    ],
    dua: {
      title: 'Before Client Retention and Relationship Work',
      resumeTitle: 'Before Returning to Retention Work',
      arabic: 'رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ وَأَدْخِلْنِي بِرَحْمَتِكَ فِي عِبَادِكَ الصَّالِحِينَ',
      trans: 'Rabbi awziʿnī an ashkura niʿmataka llatī anʿamta ʿalayya wa ʿalā wālidayya wa an aʿmala ṣāliḥan tarḍāhu wa adkhilnī bi-raḥmatika fī ʿibādika ṣ-ṣāliḥīn',
      meaning: 'My Lord, enable me to be grateful for Your favor which You have bestowed upon me and upon my parents and to do righteousness of which You approve. And admit me by Your mercy into [the ranks of] Your righteous servants.',
      source: 'Surah An-Naml 27:19 (excerpt)',
      sources: [
        {
          kind: 'quran', ref: 'Quran 27:19',
          arabic: 'رَبِّ أَوْزِعْنِىٓ أَنْ أَشْكُرَ نِعْمَتَكَ ٱلَّتِىٓ أَنْعَمْتَ عَلَىَّ وَعَلَىٰ وَٰلِدَىَّ وَأَنْ أَعْمَلَ صَـٰلِحًا تَرْضَىٰهُ وَأَدْخِلْنِى بِرَحْمَتِكَ فِى عِبَادِكَ ٱلصَّـٰلِحِينَ',
          translation: 'My Lord, enable me to be grateful for Your favor which You have bestowed upon me and upon my parents and to do righteousness of which You approve. And admit me by Your mercy into [the ranks of] Your righteous servants.',
          relevance: 'direct', provenanceTier: 'Bayyinah',
          rationale: "Sulayman's du'a of gratitude for what he had been given — retention work begins by thanking Allah for the people He placed in our care.",
        },
      ],
    },
    closingDua: {
      title: 'Closing Reflection',
      arabic: 'وَأَلَّفَ بَيْنَ قُلُوبِهِمْ ۚ لَوْ أَنفَقْتَ مَا فِي الْأَرْضِ جَمِيعًا مَّا أَلَّفْتَ بَيْنَ قُلُوبِهِمْ وَلَٰكِنَّ اللَّهَ أَلَّفَ بَيْنَهُمْ ۚ إِنَّهُ عَزِيزٌ حَكِيمٌ',
      trans: 'Wa allafa bayna qulūbihim. Law anfaqta mā fī al-arḍi jamīʿan mā allafta bayna qulūbihim wa lākinna Allāha allafa baynahum, innahu ʿazīzun ḥakīm',
      meaning: 'And He brought together their hearts. If you had spent all that is in the earth, you could not have brought their hearts together; but Allah brought them together. Indeed, He is Exalted in Might and Wise.',
      source: 'Surah Al-Anfal 8:63',
      sources: [
        {
          kind: 'quran', ref: 'Quran 8:63',
          arabic: 'وَأَلَّفَ بَيْنَ قُلُوبِهِمْ ۚ لَوْ أَنفَقْتَ مَا فِى ٱلْأَرْضِ جَمِيعًا مَّآ أَلَّفْتَ بَيْنَ قُلُوبِهِمْ وَلَـٰكِنَّ ٱللَّهَ أَلَّفَ بَيْنَهُمْ ۚ إِنَّهُۥ عَزِيزٌ حَكِيمٌ',
          translation: 'And He brought together their hearts. If you had spent all that is in the earth, you could not have brought their hearts together; but Allah brought them together. Indeed, He is Exalted in Might and Wise.',
          relevance: 'direct', provenanceTier: 'Bayyinah',
          rationale: 'Bonds between hearts are His gift, not a purchase — the closing frame for relationship work, replacing an unverified closing du\'a.',
        },
      ],
    },
    readiness: {
      frame: 'Ash-Shakur asks: am I grateful for this client, or only counting what they are worth?',
      yesLabel: 'I am grateful for this client when',
      notYetLabel: 'I am only counting their worth when',
      rows: [
        {
          id: 'G1', attr: 'Ash-Shakur', attr_ar: 'الشكور', attrTitle: 'The Appreciative',
          attrFrame: 'Am I appreciating this client, or only measuring them?',
          yesLabel: 'I am appreciating when',
          notYetLabel: 'I am only measuring when',
          governing: 'I have thanked this client specifically for something they did — not as a retention tactic.',
          notYet: 'I notice clients mostly when they are at risk of leaving.',
        },
        {
          id: 'G2', attr: 'Ash-Shakur',
          governing: 'I have kept track of what matters to this client and followed through on commitments made.',
          notYet: 'Commitments made in the early relationship have not been systematically honored.',
        },
        {
          id: 'W1', attr: 'Al-Wadud', attr_ar: 'الودود', attrTitle: 'The Ever-Loving',
          attrFrame: 'Is my investment in this relationship genuine?',
          yesLabel: 'My investment is genuine when',
          notYetLabel: 'My investment is transactional when',
          governing: 'My care for this client would persist even if they stopped paying — it is not purely transactional.',
          notYet: 'My attention to this client is driven entirely by their commercial value.',
        },
        {
          id: 'W2', attr: 'Al-Wadud',
          governing: 'I am willing to tell this client hard truths that serve them even if it risks the relationship.',
          notYet: 'I am managing the relationship rather than genuinely serving the client.',
        },
      ],
      governing: [
        'I have thanked this client specifically for something they did — not as a retention tactic.',
        'I have kept track of what matters to this client and followed through on commitments made.',
        'My care for this client would persist even if they stopped paying — it is not purely transactional.',
        'I am willing to tell this client hard truths that serve them even if it risks the relationship.',
      ],
      notYet: [
        'I notice clients mostly when they are at risk of leaving.',
        'Commitments made in the early relationship have not been systematically honored.',
        'My attention to this client is driven entirely by their commercial value.',
        'I am managing the relationship rather than genuinely serving the client.',
      ],
    },
    reflection: {
      frame: 'Ash-Shakur appreciated the smallest good I did. Al-Wadud loved through my care.',
      yesLabel: 'Gratitude and love were present when',
      notYetLabel: 'Commerce or neglect entered when',
      governing: [
        'I invested in a client relationship today where there was nothing immediate to sell.',
        'I expressed specific gratitude to someone who trusted me.',
      ],
      notYet: [
        'My client interactions today were driven by commercial need, not genuine care.',
        'Something that was promised to a client earlier was not preserved or followed through.',
      ],
    },
  },

  OPT: {
    attrs: [
      {
        nameKey: 'al-hasib',
        description: "Optimization begins with honest reckoning — what worked, what did not, and why — because fudging the numbers only delays an accountability already complete. Al-Ḥasīb keeps the full account of every act: nothing is lost from that record and nothing is added to it.",
      },
      {
        nameKey: 'as-subbuh',
        description: "Optimization is purification: removing what does not belong rather than adding what impresses. As-Subbūḥ is glorified above every flaw — the Prophet ﷺ called on Him by this Name in rukuʿ and sujud — so review the work by asking what must be stripped away.",
      },
      {
        nameKey: 'al-quddus',
        description: "The review turns inward as well as outward: the motive that crept in, the shortcut rationalised, the pride in a good number. Al-Quddūs is utterly pure, free of every defect — so let the Restoration Mandate cleanse the intention as well as the process.",
      },
    ],
    dua: {
      title: 'Before Reviewing and Optimizing',
      resumeTitle: 'Before Returning to Optimization Work',
      arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللَّهَ وَلْتَنظُرْ نَفْسٌ مَّا قَدَّمَتْ لِغَدٍ ۖ وَاتَّقُوا اللَّهَ ۚ إِنَّ اللَّهَ خَبِيرٌ بِمَا تَعْمَلُونَ',
      trans: 'Yā ayyuhā alladhīna āmanū ittaqū Allāha wal-tanẓur nafsun mā qaddamat li-ghad, wa ttaqū Allāh, inna Allāha khabīrun bimā taʿmalūn',
      meaning: 'O you who have believed, fear Allah. And let every soul look to what it has put forth for tomorrow, and fear Allah. Indeed, Allah is Aware of what you do.',
      source: 'Surah Al-Hashr 59:18',
      sources: [
        {
          kind: 'quran', ref: 'Quran 59:18',
          arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللَّهَ وَلْتَنظُرْ نَفْسٌ مَّا قَدَّمَتْ لِغَدٍ ۖ وَاتَّقُوا اللَّهَ ۚ إِنَّ اللَّهَ خَبِيرٌ بِمَا تَعْمَلُونَ',
          translation: 'O you who have believed, fear Allāh. And let every soul look to what it has put forth for tomorrow - and fear Allāh. Indeed, Allāh is Aware of what you do.',
          relevance: 'direct', provenanceTier: 'Bayyinah',
          rationale: "The self-audit ayah: every soul looks at what it has sent ahead before it is reckoned, which is the work of OPT under Al-Hasib. Replaces Musnad Ahmad 24215 ('Allahumma hasibni hisaban yasira'), whose du'a phrase al-Arnaʾut's editors weaken as Ibn Ishaq's solitary addition, though al-Hakim graded it sahih.",
        },
      ],
    },
    closingDua: {
      title: 'Closing Reflection',
      arabic: 'قَدْ جَاءَكُم بَصَائِرُ مِن رَّبِّكُمْ ۖ فَمَنْ أَبْصَرَ فَلِنَفْسِهِ ۖ وَمَنْ عَمِيَ فَعَلَيْهَا',
      trans: 'Qad jāʾakum baṣāʾiru min rabbikum, fa-man abṣara fa-li-nafsih, wa man ʿamiya fa-ʿalayhā',
      meaning: 'There has come to you enlightenment from your Lord. So whoever will see does so for the benefit of his soul, and whoever is blind does harm against it.',
      source: "Surah Al-An'am 6:104 (excerpt)",
      sources: [
        {
          kind: 'quran', ref: 'Quran 6:104',
          arabic: 'قَدْ جَآءَكُم بَصَآئِرُ مِن رَّبِّكُمْ ۖ فَمَنْ أَبْصَرَ فَلِنَفْسِهِۦ ۖ وَمَنْ عَمِىَ فَعَلَيْهَا',
          translation: 'There has come to you enlightenment from your Lord. So whoever will see does so for [the benefit of] his soul, and whoever is blind [does harm] against it.',
          relevance: 'direct', provenanceTier: 'Bayyinah',
          rationale: 'Insight is offered; seeing it is the reviewer\'s own gain and refusing it their own loss — the close of an honest review, replacing an unsourced closing du\'a.',
        },
      ],
    },
    readiness: {
      frame: 'Al-Hasib asks: am I willing to reckon honestly — even where the numbers are uncomfortable?',
      yesLabel: 'I am reckoning honestly when',
      notYetLabel: 'I am reckoning selectively when',
      rows: [
        {
          id: 'H1', attr: 'Al-Hasib', attr_ar: 'الحسيب', attrTitle: 'The Reckoner',
          attrFrame: 'Am I reckoning honestly or selectively?',
          yesLabel: 'I am reckoning honestly when',
          notYetLabel: 'I am reckoning selectively when',
          governing: 'I am looking at the full picture — including what failed and what I do not understand yet.',
          notYet: 'I am emphasizing favorable metrics and avoiding honest engagement with failures.',
        },
        {
          id: 'H2', attr: 'Al-Hasib',
          governing: 'The decisions I make from this review are based on what the data actually says, not what I hoped it would say.',
          notYet: 'I am confirmation-biased — using the review to validate what I already believed.',
        },
        {
          id: 'S1', attr: 'As-Subbuh · Al-Quddus', attr_ar: 'السبوح · القدوس', attrTitle: 'The Glorified · The Absolutely Pure',
          attrFrame: 'Am I willing to purify, not just improve?',
          yesLabel: 'I am purifying when',
          notYetLabel: 'I am only polishing when',
          governing: 'I have named the interior distortion behind at least one result — the motive, not only the method.',
          notYet: 'I am reviewing the process while keeping my own intentions out of the review.',
        },
        {
          id: 'S2', attr: 'As-Subbuh · Al-Quddus',
          governing: 'I am ready to receive the Restoration Mandate as purification — removing what does not belong, not only adding what works.',
          notYet: 'I am treating the review as a chance to add rather than to strip away what distorted the work.',
        },
      ],
      governing: [
        'I am looking at the full picture — including what failed and what I do not understand yet.',
        'The decisions I make from this review are based on what the data actually says, not what I hoped.',
        'I have named the interior distortion behind at least one result — the motive, not only the method.',
        'I am ready to receive the Restoration Mandate as purification — removing what does not belong.',
      ],
      notYet: [
        'I am emphasizing favorable metrics and avoiding honest engagement with failures.',
        'I am confirmation-biased — using the review to validate what I already believed.',
        'I am reviewing the process while keeping my own intentions out of the review.',
        'I am treating the review as a chance to add rather than to strip away what distorted the work.',
      ],
    },
    reflection: {
      frame: 'Al-Hasib completed the account. As-Subbuh and Al-Quddus purified what it revealed.',
      yesLabel: 'Honest reckoning was present when',
      notYetLabel: 'Selective reckoning entered when',
      governing: [
        'I reckoned honestly today — including with what I did not want to see.',
        'I named an interior distortion and let the review cleanse it, not only the process.',
      ],
      notYet: [
        'The review was more comfortable than honest.',
        'The Version Log records the change but leaves out the cost and the learning.',
      ],
    },
  },
};

/** Get Islamic data for a BBOS stage by ID */
export function getBbosStageIslamic(stageId) {
  const data = BBOS_STAGE_ISLAMIC[stageId];
  // See getModuleData — attrs carry `{ nameKey, application }` and are completed
  // from the divine-names registry, which is also what gives these stage
  // attributes their Quran/hadith attestation.
  return data ? { ...data, attrs: hydrateAttrs(data.attrs) } : null;
}
